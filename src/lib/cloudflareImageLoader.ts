import type { ImageLoaderProps } from "next/image";

// Cloudflare Image Transformations is opt-in per zone (Speed → Optimization).
// If the zone doesn't have it enabled, every `/cdn-cgi/image/...` request
// returns 404 and the logo / hero / brand images silently break. So we
// passthrough by default and ONLY enable the rewrite when the env var is
// explicitly set in production. Set NEXT_PUBLIC_CF_IMAGE_TRANSFORM=true once
// you've confirmed the feature is on in your Cloudflare dashboard.
const TRANSFORMS_ENABLED =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_CF_IMAGE_TRANSFORM === "true";

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!TRANSFORMS_ENABLED || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  const params = [`width=${width}`, `quality=${quality ?? 75}`, "format=auto"];

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `/cdn-cgi/image/${params.join(",")}/${src}`;
  }

  const normalized = src.startsWith("/") ? src.slice(1) : src;
  return `/cdn-cgi/image/${params.join(",")}/${normalized}`;
}
