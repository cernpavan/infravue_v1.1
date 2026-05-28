import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  images: {
    // Cloudflare Workers does not support the /_next/image optimization API.
    // Serving images unoptimized bypasses that endpoint and lets Cloudflare's
    // ASSETS binding serve them directly from the public/ directory.
    unoptimized: true,
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

export default nextConfig;
