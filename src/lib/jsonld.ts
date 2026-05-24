import {
  ADDRESS,
  AGGREGATE_RATING,
  CONTACT,
  DEFAULT_DESCRIPTION,
  GEO_COORDINATES,
  LEGAL_NAME,
  MAPS_URL,
  OG_IMAGE,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  TAGLINE,
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
    sameAs: [SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.facebook],
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
    "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
    "@id": LOCAL_BUSINESS_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    slogan: TAGLINE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: OG_IMAGE,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    hasMap: MAPS_URL,
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.facebook],
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
      "Turnkey Interior Execution",
      "Edtech Institute Interiors",
      "Healthcare Clinic Interiors",
      "Brewery & Hospitality Interiors",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue,
      ratingCount: AGGREGATE_RATING.ratingCount,
      bestRating: AGGREGATE_RATING.bestRating,
      worstRating: AGGREGATE_RATING.worstRating,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Interior Design",
            serviceType: "Residential Interior Design",
            areaServed: { "@type": "Country", name: "India" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial & Office Interior Design",
            serviceType: "Commercial Interior Design",
            areaServed: { "@type": "Country", name: "India" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hospitality Interior Design",
            serviceType: "Hospitality Interior Design",
            areaServed: { "@type": "Country", name: "India" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Turnkey Interior Execution",
            serviceType: "Turnkey Interior Execution",
            areaServed: { "@type": "Country", name: "India" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Modular Kitchen Design",
            serviceType: "Modular Kitchen Design",
            areaServed: { "@type": "Country", name: "India" },
          },
        },
      ],
    },
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
    headline: `${project.name} · ${project.category}`,
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

/* ─── Service (per service page) ────────────────────────────────────────── */
export function serviceSchema(service: {
  name: string;
  description: string;
  slug?: string;
  serviceType?: string;
}) {
  const url = service.slug ? absoluteUrl(`/services#${service.slug}`) : absoluteUrl("/services");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType ?? service.name,
    url,
    provider: { "@id": ORG_ID },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
    audience: { "@type": "Audience", audienceType: "Homeowners, Businesses, Hospitality Brands" },
  } as const;
}

/* ─── ItemList of Services (used on /services page) ────────────────────── */
export function servicesItemList(
  items: ReadonlyArray<{ name: string; description: string; slug?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Interior Design Services by ${SITE_NAME}`,
    url: absoluteUrl("/services"),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        ...(item.slug ? { url: absoluteUrl(`/services#${item.slug}`) } : {}),
        provider: { "@id": ORG_ID },
      },
    })),
  } as const;
}

/* ─── ContactPage ───────────────────────────────────────────────────────── */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#contactpage`,
    url: absoluteUrl("/contact"),
    name: `Contact ${SITE_NAME}`,
    description: `Get in touch with ${SITE_NAME}, premium interior designers in Hyderabad. Call, email, or visit our studio.`,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": LOCAL_BUSINESS_ID },
  } as const;
}

/* ─── CollectionPage (used on /gallery) ────────────────────────────────── */
export function collectionPageSchema(input: {
  path: string;
  name: string;
  description: string;
  numberOfItems?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.path)}#collection`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(input.numberOfItems !== undefined ? { numberOfItems: input.numberOfItems } : {}),
  } as const;
}

/* ─── ImageGallery (used per project for image-search visibility) ──────── */
export function imageGallerySchema(input: {
  projectSlug: string;
  projectName: string;
  images: ReadonlyArray<string>;
  description?: string;
}) {
  const url = absoluteUrl(`/projects/${input.projectSlug}`);
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${url}#gallery`,
    name: `${input.projectName} · Interior Design Gallery`,
    description:
      input.description ?? `Photo gallery from the ${input.projectName} interior design project by ${SITE_NAME}.`,
    url,
    associatedMedia: input.images.map((image, i) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image),
      url: absoluteUrl(image),
      caption: `${input.projectName}, image ${i + 1} of ${input.images.length}`,
      creditText: SITE_NAME,
      creator: { "@id": ORG_ID },
      copyrightHolder: { "@id": ORG_ID },
    })),
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
