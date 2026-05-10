"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * GA4 measurement ID. Override per-environment via the
 * NEXT_PUBLIC_GA_MEASUREMENT_ID env var (e.g., a separate property for
 * staging). Falls back to the production property if unset.
 */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-ZT4GJEG43D";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 for the Next.js App Router.
 *
 * Loads gtag.js with `afterInteractive` so it never blocks LCP, and disables
 * the script's automatic `page_view` (`send_page_view: false`). We then fire
 * `page_view` manually on every client-side route change via `usePathname` +
 * `useSearchParams` — without that, only the initial hard navigation would
 * register and SPA-style navigations between pages would be silently dropped.
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            transport_type: 'beacon'
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

/**
 * Fires a GA4 `page_view` whenever the App Router pathname or search params
 * change. Must be wrapped in <Suspense> because `useSearchParams` opts the
 * subtree into deferred rendering.
 */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      !pathname ||
      typeof window === "undefined" ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname, searchParams]);

  return null;
}
