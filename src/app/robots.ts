import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt
 *
 * Defense-in-depth: pages that should not appear in search are already
 * `noindex`-ed via per-page robots metadata. This file additionally
 * disallows them at the crawler level so they're never even fetched.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/thank-you",
        ],
      },
    ],
    // `host` field omitted on purpose: Google deprecated it years ago and
    // Lighthouse flags it as an invalid directive. Yandex was the only major
    // consumer and we don't optimise for it. Canonicalisation is handled by
    // <link rel="canonical"> + the redirect chain on infravueinteriors.com.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
