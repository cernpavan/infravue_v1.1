import type { ImageLoaderProps } from "next/image";

// Build-time responsive image strategy:
//
// `scripts/optimize-images.mjs` runs as part of `npm run build` and writes
// resized WebP variants for every image under /public/images/ to
// /public/_opt/<same-path>/<basename>-<width>.webp. In production we rewrite
// `/images/foo.webp` → `/_opt/foo-<nearestWidth>.webp` so phones only
// download phone-sized bytes.
//
// In dev we pass the source through untouched so changing /public/images/
// files works without re-running the script. This is intentional: dev
// renders the full-resolution source (slower but accurate to source) while
// production gets responsive bytes.

// Must stay in sync with WIDTHS in scripts/optimize-images.mjs.
const WIDTHS = [360, 640, 828, 1080, 1280, 1920] as const;
const MAX_WIDTH = WIDTHS[WIDTHS.length - 1];

const USE_PREGENERATED = process.env.NODE_ENV === "production";

function nearestWidth(requested: number): number {
  for (const w of WIDTHS) {
    if (w >= requested) return w;
  }
  return MAX_WIDTH;
}

export default function cloudflareImageLoader({
  src,
  width,
}: ImageLoaderProps): string {
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;

  // Pre-generated variants only exist for /public/images/* sources. Imported
  // images (which Next emits to /_next/static/media/) and any external URL
  // pass through unchanged.
  if (USE_PREGENERATED && src.startsWith("/images/")) {
    const w = nearestWidth(width);
    const withoutPrefix = src.slice("/images/".length);
    const dot = withoutPrefix.lastIndexOf(".");
    const base = dot >= 0 ? withoutPrefix.slice(0, dot) : withoutPrefix;
    return `/_opt/${base}-${w}.webp`;
  }

  return src;
}
