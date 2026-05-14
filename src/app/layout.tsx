import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LeadSessionInit } from "@/components/LeadSessionInit";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
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
    title: `${SITE_NAME} — ${TAGLINE}`,
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
    title: `${SITE_NAME} — ${TAGLINE}`,
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
        {/* ── Global structured data — Organization, LocalBusiness, WebSite ── */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />

        <Providers>
          <LeadSessionInit />
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <WhatsAppButton />
        </Providers>

        {/* ── Google Analytics 4 — loads after interactive, tracks SPA route changes ── */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
