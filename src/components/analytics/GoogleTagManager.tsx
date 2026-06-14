import Script from "next/script";

// Production container managed at https://tagmanager.google.com.
// Override per-environment via NEXT_PUBLIC_GTM_ID.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-K97NQKDT";

// Standard Google GTM bootstrap, scheduled via next/script with
// `afterInteractive` so the gtm.js fetch and tag waterfall no longer block
// First Contentful Paint or compete with hydration on mobile. Tag Assistant
// still detects the container — it polls for window.google_tag_manager after
// load.
const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <Script id="gtm-bootstrap" strategy="afterInteractive">
      {GTM_HEAD_SCRIPT}
    </Script>
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

// Re-exported wrapper kept for the App Router page-view tracker. Lives in a
// separate client-component file so this module stays a server component.
export { GoogleTagManagerRouteTracker } from "./GoogleTagManagerRouteTracker";
