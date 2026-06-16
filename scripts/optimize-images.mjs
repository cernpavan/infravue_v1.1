// Build-time responsive image generator.
//
// Reads every {webp,jpg,jpeg,png} under /public/images and writes resized
// WebP variants to /public/_opt/<same-path>/<basename>-<width>.webp at the
// widths Next.js will request via `sizes`. The custom Cloudflare loader
// (src/lib/cloudflareImageLoader.ts) maps requests to these pre-generated
// files in production, giving us responsive AVIF/WebP-quality delivery
// without any runtime image-transform service (no Cloudflare Image
// Transformations subscription required).
//
// Re-runs are near-instant: each output's mtime is compared against the
// source and skipped if up-to-date.

import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "public", "images");
const OUT_DIR = join(ROOT, "public", "_opt");

// Widths must stay in sync with WIDTHS in src/lib/cloudflareImageLoader.ts.
const WIDTHS = [360, 640, 828, 1080, 1280, 1920];
const QUALITY = 75;
const EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function isUpToDate(src, out) {
  try {
    const [s, o] = await Promise.all([stat(src), stat(out)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function processOne(srcPath) {
  const rel = relative(SRC_DIR, srcPath);
  const { dir: relDir, name } = parse(rel);
  const outDir = join(OUT_DIR, relDir);
  await mkdir(outDir, { recursive: true });

  let written = 0;
  let skipped = 0;

  // Always emit a file at every width slot, even if the source is smaller.
  // `withoutEnlargement: true` tells sharp to clamp to the source's intrinsic
  // size — so a 1500px source asked for 1920 silently outputs at 1500px.
  // This guarantees the loader never produces a 404 for a slot it picks.
  for (const w of WIDTHS) {
    const outPath = join(outDir, `${name}-${w}.webp`);
    if (await isUpToDate(srcPath, outPath)) {
      skipped++;
      continue;
    }
    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(outPath);
    written++;
  }
  return { rel, written, skipped };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const sources = [];
  for await (const path of walk(SRC_DIR)) {
    const ext = parse(path).ext.toLowerCase();
    if (EXTENSIONS.has(ext)) sources.push(path);
  }

  if (sources.length === 0) {
    console.log("[optimize-images] no sources found under /public/images");
    return;
  }

  console.log(
    `[optimize-images] processing ${sources.length} sources → /public/_opt/`,
  );

  const start = Date.now();
  let totalWritten = 0;
  let totalSkipped = 0;

  // Sequential to keep memory predictable on small CI runners. Sharp is
  // already multithreaded internally so this is rarely a throughput win
  // anyway.
  for (const src of sources) {
    const { rel, written, skipped } = await processOne(src);
    totalWritten += written;
    totalSkipped += skipped;
    if (written > 0) {
      console.log(`  ✓ ${rel} (${written} new, ${skipped} cached)`);
    }
  }

  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `[optimize-images] done in ${secs}s — ${totalWritten} written, ${totalSkipped} cached`,
  );
}

main().catch((err) => {
  console.error("[optimize-images] failed:", err);
  process.exit(1);
});
