// One-shot script — resizes oversized brand logos in src/components/brands/
// down to a sensible width for their display size (max ~208px @ 2x = 416px).
//
// Run once: `node scripts/shrink-brand-logos.mjs`
// Then commit the smaller source files. Re-running on already-small files is
// a no-op.

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Directories whose imported PNG/JPG assets bypass our /public/_opt/ pipeline
// because Next.js processes them via /_next/static/media/. Each entry sets a
// reasonable max width based on the largest display dimension that asset is
// ever rendered at.
const TARGETS = [
  { dir: join(__dirname, "..", "src", "components", "brands"), width: 480 },
  // Navbar logo renders ≤ 270 px wide → 540 covers retina. The same file is
  // imported at high priority, so shrinking it has direct LCP impact.
  { dir: join(__dirname, "..", "src", "app"), width: 720 },
];

// Anything already under this byte threshold is considered small enough.
const SKIP_BELOW_BYTES = 100 * 1024; // 100 KB

async function processDir(DIR, TARGET_WIDTH) {
  const entries = await readdir(DIR, { withFileTypes: true });
  let processed = 0;
  let skipped = 0;

  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = extname(e.name).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const path = join(DIR, e.name);
    const { size } = await stat(path);

    if (size < SKIP_BELOW_BYTES) {
      skipped++;
      continue;
    }

    const meta = await sharp(path).metadata();
    if ((meta.width ?? 0) <= TARGET_WIDTH) {
      skipped++;
      continue;
    }

    // Process to a temporary buffer first so we don't truncate the original
    // mid-write if sharp throws.
    const pipeline = sharp(path).resize({
      width: TARGET_WIDTH,
      withoutEnlargement: true,
    });

    let buffer;
    if (ext === ".png") {
      buffer = await pipeline
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }

    const { writeFile } = await import("node:fs/promises");
    await writeFile(path, buffer);

    const newSize = buffer.length;
    const saved = (((size - newSize) / size) * 100).toFixed(1);
    console.log(
      `✓ ${e.name}: ${(size / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (-${saved}%)`,
    );
    processed++;
  }

  return { processed, skipped };
}

async function main() {
  let totalProcessed = 0;
  let totalSkipped = 0;
  for (const { dir, width } of TARGETS) {
    const rel = dir.replace(/^.*src/, "src");
    console.log(`\n[${rel}] target width ${width}px`);
    const { processed, skipped } = await processDir(dir, width);
    totalProcessed += processed;
    totalSkipped += skipped;
  }
  console.log(
    `\nDone — ${totalProcessed} resized, ${totalSkipped} already small.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
