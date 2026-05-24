import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * XML sitemap. Includes:
 *   • every indexable static route (home, services, about, contact, gallery, book, legal)
 *   • every project deep page
 *   • per-project image entries (Google Image sitemap extension) so the
 *     portfolio gallery surfaces in Google Images search
 *
 * /thank-you, /admin/*, and /api/* are intentionally excluded — they are
 * gated by robots.txt and per-page robots metadata respectively.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    // Google Image sitemap extension — boosts visibility in Google Images.
    // Cover image is listed first; gallery images follow so each project
    // page enumerates every photo Google should know about.
    images: [
      absoluteUrl(project.image),
      ...(project.gallery ?? []).map((src) => absoluteUrl(src)),
    ],
  }));

  return [...staticRoutes, ...projectRoutes];
}
