import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import ThankYouClient from "./ThankYouClient";

// SEO-safe: keep this URL out of the public index but allow link-following so
// tracking pixels/redirects continue to function normally.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank You",
    description:
      "Your consultation request has been submitted successfully. Our team will get back to you within 24 hours.",
    path: "/thank-you",
    ogTitle: "Thank You · Infravue Interiors",
    ogDescription:
      "Your consultation request has been submitted successfully. We'll get back to you within 24 hours.",
  }),
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ThankYouPage() {
  // Suspense boundary required because ThankYouClient calls useSearchParams,
  // which Next.js needs to render lazily during static prerender.
  return (
    <Suspense fallback={null}>
      <ThankYouClient />
    </Suspense>
  );
}
