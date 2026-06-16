import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  images: {
    // Cloudflare Workers does not support the /_next/image optimization API,
    // so we route requests through Cloudflare's edge Image Transformations
    // (/cdn-cgi/image/...) via a custom loader. In dev the loader passes
    // through unchanged so it works locally without the edge.
    loader: "custom",
    loaderFile: "./src/lib/cloudflareImageLoader.ts",
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    // Next.js 16 requires every quality value used in code to be registered
    // here, otherwise it silently refuses to optimize. 75 = default, 80 = hero,
    // 82 = service tiles.
    qualities: [75, 80, 82],
  },
  async rewrites() {
    return [
      {
        source: "/g4tr/:path*",
        destination: "https://www.google-analytics.com/:path*",
      },
    ];
  },
};

initOpenNextCloudflareForDev();

export default bundleAnalyzer(nextConfig);
