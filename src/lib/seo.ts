/**
 * Single source of truth for site identity used by metadata + JSON-LD.
 * Update domain / contact / social here and the rest of the SEO surface
 * propagates automatically.
 */

export const SITE_URL = "https://infravueinteriors.com";
export const SITE_LOCALE = "en_IN";

export const SITE_NAME = "Infravue Interiors";
export const LEGAL_NAME =
  "Infravue Interiors and Constructions Private Limited";

export const TAGLINE =
  "Premium Interior Designers in Hyderabad — Residential, Commercial & Hospitality";

export const DEFAULT_DESCRIPTION =
  "Infravue Interiors is a premium interior design studio based in Hyderabad — crafting bespoke residential, commercial, and hospitality spaces across India with timeless, considered design.";

export const PRIMARY_KEYWORDS = [
  "interior designers in Hyderabad",
  "best interior designers in Hyderabad",
  "luxury interior designers Hyderabad",
  "premium interior designers Hyderabad",
  "residential interior designers Hyderabad",
  "commercial interior designers Hyderabad",
  "modular kitchen designers Hyderabad",
  "office interior designers Hyderabad",
  "interior design company Hyderabad",
  "home interiors Hyderabad",
  "Infravue Interiors",
  "interior design Hyderabad",
];

export const CONTACT = {
  phone: "+91-9010709994",
  phoneDisplay: "+91 90107 09994",
  email: "info@infravueinteriors.com",
} as const;

export const ADDRESS = {
  streetAddress:
    "Abhyudaya nagar colony, Bandlaguda Jagir",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500086",
  addressCountry: "IN",
} as const;

export const SERVICE_AREAS = [
  "Hyderabad",
  "Secunderabad",
  "Telangana",
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Chennai",
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/infravue_interiors/",
  linkedin: "https://www.linkedin.com/company/infravueinteriors",
  facebook: "https://www.facebook.com/people/Infravueinteriors/61575375477723/",
} as const;

export const OG_IMAGE = `${SITE_URL}/logo.jpg`;
// Actual on-disk dimensions of /public/logo.jpg (1.905:1 — essentially the
// OG-recommended 1.91:1 aspect). Reporting accurate dimensions lets crawlers
// render previews without re-fetching to probe the image.
export const OG_IMAGE_WIDTH = 1685;
export const OG_IMAGE_HEIGHT = 885;
export const OG_IMAGE_ALT = `${SITE_NAME} — Premium Interior Design Studio in Hyderabad`;

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

/**
 * Build a complete `Metadata` object for a page.
 *
 * Why this exists: Next.js does NOT deep-merge metadata. If a child page
 * exports `openGraph: { title, description }`, it REPLACES the layout's
 * full openGraph block — silently dropping the og:image. This helper
 * guarantees every page emits a full openGraph + twitter block with the
 * site default image, so social previews never break.
 */
import type { Metadata } from "next";

export type PageMetaInput = {
  /** Page <title> — runs through the layout title template ("%s · Infravue Interiors"). */
  title?: string;
  /** Exact <title>, bypassing the template. Use for the home page. */
  titleAbsolute?: string;
  /** Page <meta name="description">. Defaults to DEFAULT_DESCRIPTION. */
  description?: string;
  /** Canonical path, default "/". Becomes both alternates.canonical and og:url. */
  path?: string;
  /** Override OG/Twitter title (else falls back to titleAbsolute / title). */
  ogTitle?: string;
  /** Override OG/Twitter description (else falls back to description). */
  ogDescription?: string;
  /** Image path (root-relative or absolute). Defaults to OG_IMAGE. */
  image?: string;
  /** Image alt text. */
  imageAlt?: string;
  /** Image width — required for correct rendering on FB/LinkedIn. */
  imageWidth?: number;
  /** Image height. */
  imageHeight?: number;
  /** og:type. "website" for index/landing, "article" for project/blog pages. */
  type?: "website" | "article";
};

export function pageMetadata(input: PageMetaInput = {}): Metadata {
  const {
    title,
    titleAbsolute,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    ogTitle,
    ogDescription,
    image,
    imageAlt = OG_IMAGE_ALT,
    type = "website",
  } = input;

  // OG/Twitter title: explicit override > absolute > templated > site default.
  const socialTitle =
    ogTitle ?? titleAbsolute ?? (title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — ${TAGLINE}`);
  const socialDescription = ogDescription ?? description;
  // Crawlers (especially WhatsApp/Telegram) sometimes fail to follow
  // metadataBase resolution. Emit absolute URLs explicitly.
  const finalImage = image ?? OG_IMAGE;
  const absImage = finalImage.startsWith("http") ? finalImage : absoluteUrl(finalImage);
  const absUrl = absoluteUrl(path);

  // Only attach width/height when we know them. When a page overrides the
  // image without supplying dimensions we omit the fields so crawlers probe
  // the file rather than being told an inaccurate size.
  const usingSiteDefaultImage = !image;
  const ogImageEntry: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  } = { url: absImage, alt: imageAlt };
  if (usingSiteDefaultImage) {
    ogImageEntry.width = OG_IMAGE_WIDTH;
    ogImageEntry.height = OG_IMAGE_HEIGHT;
  } else {
    if (input.imageWidth !== undefined) ogImageEntry.width = input.imageWidth;
    if (input.imageHeight !== undefined) ogImageEntry.height = input.imageHeight;
  }

  return {
    title: titleAbsolute ? { absolute: titleAbsolute } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url: absUrl,
      siteName: SITE_NAME,
      title: socialTitle,
      description: socialDescription,
      images: [ogImageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [absImage],
    },
  };
}
