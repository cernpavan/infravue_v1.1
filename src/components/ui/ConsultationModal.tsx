"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useConsultationModal } from "@/context/ModalContext";
import BookingForm from "@/app/book/BookingForm";

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultationModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── Lock body scroll when modal is open ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Close on Escape key ──
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeModal]);

  // ── Focus trap: focus panel when opened ──
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  // ── Close when clicking the dark overlay (not the panel) ──
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book Free Consultation"
    >
      {/* ── Backdrop ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* ── Modal Panel ── */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md bg-[#FCF9F4] rounded-3xl shadow-[0_24px_80px_rgba(30,58,106,0.25)] animate-in zoom-in-95 fade-in duration-300 overflow-hidden"
      >
        {/* Floating Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-navy/5 text-navy/40 hover:bg-navy/10 hover:text-navy transition-all duration-200"
        >
          <X size={16} />
        </button>

        {/* ── Form Body ── */}
        <div className="p-2 sm:p-4">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
