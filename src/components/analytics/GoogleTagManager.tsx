"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Production container managed at https://tagmanager.google.com.
// Override per-environment via NEXT_PUBLIC_GTM_ID.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-WMQWB9ZW";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// `strategy="beforeInteractive"` causes next/script to inline this snippet
// into the SSR-rendered <head> regardless of where the component sits in
// the tree (Next 16 docs: api-reference/components/script.md). That matches
// Google's "as high in <head> as possible" install requirement. The loader
// itself is async (j.async=true), so it never blocks parsing.
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-init" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

// Noscript iframe fallback. Must be the FIRST child of <body> per Google's
// install spec — captures users with JS disabled and noscript-respecting bots.
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

// App Router client-side navigations don't trigger a fresh GTM load, so the
// GTM "Page View" trigger never fires on SPA route changes. Push an explicit
// page_view event on every pathname/search-params change. GTM's built-in
// History Change trigger can pick this up, or you can use a Custom Event
// trigger on `event = page_view` inside the container UI.
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
