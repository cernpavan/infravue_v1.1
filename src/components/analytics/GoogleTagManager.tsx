"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * GTM container ID. Override per-environment via NEXT_PUBLIC_GTM_ID.
 * Production container managed at https://tagmanager.google.com.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KQWTD3HG";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * GTM bootstrap (head). `strategy="beforeInteractive"` makes Next.js
 * inline this snippet directly into the SSR-rendered `<head>` — matching
 * Google's official install requirement of "as high in `<head>` as
 * possible". The snippet itself is async (`j.async = true`), so it won't
 * block parsing even though it's placed early.
 *
 * Pushes a `page_view` event on every App Router route change; events
 * queued before GTM bootstraps are replayed once the container loads
 * (GTM reads the existing `dataLayer` queue on init).
 *
 * All GA4 / Ads / pixel tags should be configured *inside GTM*. The site
 * itself ships only the GTM container.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-init" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

/**
 * GTM noscript fallback iframe. Must be the first thing inside <body>
 * (per Google's install instructions) so it captures users with JS
 * disabled and bot crawlers that respect noscript.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
