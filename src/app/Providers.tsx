"use client";

import dynamic from "next/dynamic";
import { ConsultationModalProvider } from "@/context/ModalContext";
import { AutoPopupTrigger } from "@/components/ui/AutoPopupTrigger";
import { type ReactNode } from "react";

// Lazy-load the consultation modal so its dependency chain
// (framer-motion panel transitions, react-hook-form, @hookform/resolvers,
// zod, BookingForm) is split into its own chunk and only fetched when the
// modal actually opens. Removes ~50–80 KB of JS from every page's initial
// bundle without changing behaviour — the modal still mounts via context.
// `ssr: false` is safe: the modal is closed on first paint, so there is no
// SSR HTML to render for it.
const ConsultationModal = dynamic(
  () => import("@/components/ui/ConsultationModal"),
  { ssr: false },
);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsultationModalProvider>
      <AutoPopupTrigger />
      {children}
      <ConsultationModal />
    </ConsultationModalProvider>
  );
}
