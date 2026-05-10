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
  phone: "+91-7478075444",
  phoneDisplay: "+91 7478075444",
  email: "infravueinteriorsmarketing@gmail.com",
} as const;

export const ADDRESS = {
  streetAddress:
    "10-3-347, Abhyudaya Nagar Colony, Gandipet Mandal, Ranga Reddy District",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500075",
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
} as const;

export const OG_IMAGE = `${SITE_URL}/logo.jpg`;

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}
