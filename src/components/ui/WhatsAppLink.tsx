"use client";

import { type ReactNode } from "react";
import {
  useWhatsAppClick,
  type WhatsAppSource,
} from "@/hooks/useWhatsAppClick";

interface WhatsAppLinkProps {
  source: WhatsAppSource;
  // Pre-filled WhatsApp message (request ID is auto-appended by the hook).
  message?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Client-only WhatsApp button that fires tracking through `useWhatsAppClick`
 * and then opens the wa.me URL. Designed as a drop-in replacement for plain
 * `<a href="https://wa.me/...">` anchors so we can use it inside otherwise
 * server-rendered sections without converting the whole tree to a client
 * component.
 */
export default function WhatsAppLink({
  source,
  message,
  className,
  children,
  ariaLabel,
}: WhatsAppLinkProps) {
  const handleClick = useWhatsAppClick({ source, message });

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel ?? "Chat on WhatsApp"}
      className={className}
    >
      {children}
    </button>
  );
}
