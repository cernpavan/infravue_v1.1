import {
  ADDRESS,
  CONTACT,
  DEFAULT_DESCRIPTION,
  LEGAL_NAME,
  OG_IMAGE,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
} from "./seo";

const ORG_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* ─── Organization ──────────────────────────────────────────────────────── */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: OG_IMAGE,
      width: 600,
      height: 600,
    },
    image: OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: postalAddress(),
    sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        contactType: "customer service",
        email: CONTACT.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
    ],
  } as const;
}

/* ─── LocalBusiness (InteriorDesigner subtype) ─────────────────────────── */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: OG_IMAGE,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "₹₹₹",
    address: postalAddress(),
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    knowsAbout: [
      "Residential Interior Design",
      "Commercial Interior Design",
      "Hospitality Interior Design",
      "Modular Kitchen Design",
      "Office Interior Design",
      "Luxury Home Interiors",
    ],
  } as const;
}

/* ─── WebSite (with sitelinks search action) ───────────────────────────── */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  } as const;
}

/* ─── FAQPage ───────────────────────────────────────────────────────────── */
export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } as const;
}

/* ─── BreadcrumbList ────────────────────────────────────────────────────── */
export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  } as const;
}

/* ─── CreativeWork (used per-project for richer indexing) ─────────────── */
export function projectCreativeWorkSchema(project: {
  slug: string;
  name: string;
  category: string;
  intro?: string;
  description?: string;
  image: string;
  year?: string;
  location?: string;
  area?: string;
}) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.name,
    headline: `${project.name} — ${project.category}`,
    description:
      project.intro ?? project.description ?? `${project.name} by ${SITE_NAME}.`,
    image: absoluteUrl(project.image),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
  } as const;
}

/* ─── Helper ────────────────────────────────────────────────────────────── */
function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.streetAddress,
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.addressCountry,
  } as const;
}
