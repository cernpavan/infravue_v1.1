"use client";

import { useConsultationModal } from "@/context/ModalContext";
import { type ReactNode } from "react";

interface BookButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * A drop-in replacement for <Link href="/book">.
 * Opens the consultation modal instead of navigating.
 */
export default function BookButton({ children, className }: BookButtonProps) {
  const { openModal } = useConsultationModal();

  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  );
}
