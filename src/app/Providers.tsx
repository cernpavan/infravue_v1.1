"use client";

import { ConsultationModalProvider } from "@/context/ModalContext";
import ConsultationModal from "@/components/ui/ConsultationModal";
import { type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsultationModalProvider>
      {children}
      <ConsultationModal />
    </ConsultationModalProvider>
  );
}
