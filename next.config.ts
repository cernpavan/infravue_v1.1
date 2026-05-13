import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers does not support the /_next/image optimization API.
    // Serving images unoptimized bypasses that endpoint and lets Cloudflare's
    // ASSETS binding serve them directly from the public/ directory.
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
