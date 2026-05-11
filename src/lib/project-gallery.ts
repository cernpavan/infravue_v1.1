import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ProjectDetailFrame } from "@/components/sections/ProjectShowcase";

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads all image files from public/images/projects/{slug}/ at build time.
 * Returns sorted URL paths. Returns [] if the folder doesn't exist.
 * Safe for Cloudflare deployment: runs only during `next build`.
 */
export function readProjectGallery(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "projects", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMG_RE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((f) => `/images/projects/${slug}/${f}`);
}

// ── Layout constants ────────────────────────────────────────────────────────
// Pattern produces visually balanced rows in a 12-col grid:
//   wide  = col-span-12  (full row)
//   tall  = col-span-5   }  5 + 7 = 12 → one paired row
//   square = col-span-7  }
const SPAN_PATTERN: Array<"wide" | "tall" | "square"> = [
  "wide",   // img N+0 — full-width hero frame
  "tall",   // img N+1 ─┐ paired row
  "square", // img N+2 ─┘
  "square", // img N+3 ─┐ paired row (reversed rhythm)
  "tall",   // img N+4 ─┘
];

const FRAME_TITLES = [
  "Form & Light",
  "Composition",
  "Volume",
  "Material Story",
  "Detail",
  "Perspective",
  "Atmosphere",
  "Texture",
  "Scale",
  "Space",
  "Contrast",
  "Rhythm",
  "Surface",
  "Depth",
  "Environment",
];

/**
 * Generates detailFrames for N images using a repeating editorial layout.
 * The pattern creates full-width hero shots alternating with paired portrait/landscape rows.
 */
export function buildDetailFrames(count: number): ProjectDetailFrame[] {
  return Array.from({ length: count }, (_, i) => ({
    title: FRAME_TITLES[i % FRAME_TITLES.length],
    span: SPAN_PATTERN[i % SPAN_PATTERN.length],
  }));
}
