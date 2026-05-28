"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// App Router client-side navigations don't trigger a fresh GTM load, so GTM's
// built-in "Page View" trigger never fires on SPA route changes. Push an
// explicit `page_view` event on every pathname/search-params change. Inside
// GTM, use a Custom Event trigger on event = `page_view` (or History Change).
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

// useSearchParams must be inside a Suspense boundary in App Router.
export function GoogleTagManagerRouteTracker() {
  return (
    <Suspense fallback={null}>
      <RouteChangeTracker />
    </Suspense>
  );
}
