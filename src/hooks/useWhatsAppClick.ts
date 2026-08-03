"use client";

import { useCallback } from "react";
import { ensureRequestId } from "@/store/leadStore";

export const WHATSAPP_PHONE = "919346245082";

export type WhatsAppSource =
  | "floating-button"
  | "cta-banner"
  | "contact-page"
  | "thank-you"
  | "hero"
  | "footer";

interface UseWhatsAppClickOptions {
  source: WhatsAppSource;
  // Pre-filled message body. The request id is always appended so the team can
  // tie an inbound WhatsApp message back to a session.
  message?: string;
  // Override phone number if a campaign uses a different one.
  phone?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Single source of truth for tracking + opening WhatsApp from anywhere in the
 * app. Centralizing here fixes a class of bugs we had on the legacy plain
 * anchors:
 *
 *   1. They fired zero tracking.
 *   2. They fired no GTM `whatsapp_click` event, so GA/Meta Pixel never knew.
 *   3. The previous floating button raced sessionStorage seeding and would
 *      silently drop the very first click of a session.
 *   4. The previous floating button used a non-keepalive fetch which was
 *      cancelled by the tab switch on mobile.
 *
 * This hook:
 *   - ensures a requestId exists synchronously (no race)
 *   - pushes `whatsapp_click` to dataLayer FIRST (survives the tab switch)
 *   - POSTs to /api/leads/whatsapp with `keepalive: true` (survives the tab
 *     switch even on mobile)
 *   - opens https://wa.me/<phone>?text=<message>
 */
export function useWhatsAppClick({
  source,
  message,
  phone = WHATSAPP_PHONE,
}: UseWhatsAppClickOptions) {
  return useCallback(() => {
    const requestId = ensureRequestId();

    // 1. GTM / GA / Meta Pixel hook. Push BEFORE the navigation so the event is
    //    in dataLayer even if the page is frozen by the tab switch.
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        whatsapp_source: source,
        request_id: requestId,
      });
    }

    // 2. Server-side recording. `keepalive: true` keeps the request alive
    //    through the tab switch / page navigation that's about to happen.
    try {
      fetch("/api/leads/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, source }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Swallow — tracking failure must never block the actual WhatsApp open.
    }

    // 3. Open WhatsApp.
    const baseMessage =
      message ?? "Hi! I'm interested in Infravue interior design services.";
    const fullMessage = `${baseMessage}\nRequest ID: ${requestId}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [source, message, phone]);
}
