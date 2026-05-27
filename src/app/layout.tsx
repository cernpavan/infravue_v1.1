import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LeadSessionInit } from "@/components/LeadSessionInit";
import JsonLd from "@/components/seo/JsonLd";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PRIMARY_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
} from "@/lib/seo";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/jsonld";
import Providers from "./Providers";
import { RootLayoutWrapper } from "./RootLayoutWrapper";
import "./globals.css";

// Self-hosted via next/font/google. Weight `800` was requested previously
// but is never used in the codebase (no `font-extrabold` / `font-black`
// usages found). Dropping it removes one font file from the critical path
// without any visual change. `display: swap` keeps text visible during the
// fallback render.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: PRIMARY_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Interior Design",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  // Drop your verification tokens here when issued.
  // verification: {
  //   google: "GSC_VERIFICATION_TOKEN",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">
        {/* GTM noscript — must be the FIRST child of <body> per Google's spec. */}
        <GoogleTagManagerNoScript />

        {/* Global structured data — Organization, LocalBusiness, WebSite. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />

        <Providers>
          <LeadSessionInit />
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <WhatsAppButton />
        </Providers>

        {/* GTM loader — `beforeInteractive` hoists this snippet into <head>.
            Fires `page_view` dataLayer pushes on every App Router navigation. */}
        <GoogleTagManager />
      </body>
    </html>
  );
}
