// Production container managed at https://tagmanager.google.com.
// Override per-environment via NEXT_PUBLIC_GTM_ID.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-WMQWB9ZW";

// Standard Google GTM bootstrap. Rendered as a real inline <script> in <head>
// via dangerouslySetInnerHTML — NOT wrapped in next/script. The next/script
// `beforeInteractive` strategy queues inline children inside Next 16's
// self.__next_s bootloader, which executes too late for Google Tag Assistant
// to detect the container. A raw inline script is what Google's install
// snippet does and is what Tag Assistant scans for.
const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

// Mount inside <head> of the root layout (server component, SSR-rendered).
export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: GTM_HEAD_SCRIPT }}
    />
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
