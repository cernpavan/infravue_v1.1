"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle2, Sparkles, Clock3, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useConsultationModal } from "@/context/ModalContext";
import BookingForm from "@/app/book/BookingForm";

const VALUE_PROPS = [
  {
    icon: Sparkles,
    title: "Complimentary Consultation",
    desc: "No cost, no commitment — just expert guidance.",
  },
  {
    icon: CheckCircle2,
    title: "3D Visualisation Included",
    desc: "See your space before a single nail is hammered.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    desc: "Milestone-driven execution on every project.",
  },
  {
    icon: ShieldCheck,
    title: "100+ Happy Clients",
    desc: "Trusted across Hyderabad and pan-India.",
  },
];

const EASE_IN: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.4, 0, 1, 1];

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultationModal();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  // Focus trap — move focus into panel when opened
  useEffect(() => {
    if (isOpen && panelRef.current) panelRef.current.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book a free interior design consultation with Infravue"
        >
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-[6px] cursor-pointer"
          />

          {/* ── Modal Panel ── */}
          <motion.div
            key="panel"
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: EASE_IN } }}
            exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.22, ease: EASE_OUT } }}
            className="relative z-10 w-full max-w-[900px] max-h-[92dvh] bg-white rounded-2xl shadow-[0_40px_100px_-20px_rgba(30,58,106,0.35)] overflow-hidden flex flex-col md:flex-row focus:outline-none"
          >
            {/* ── Close button ──
                Mobile: sits on the dark navy header → white
                Desktop: sits over the white form panel → navy  */}
            <button
              onClick={closeModal}
              aria-label="Close consultation modal"
              className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full
                         bg-white/20 text-white hover:bg-white/30
                         md:bg-[#1E3A6A]/8 md:text-[#1E3A6A]/50 md:hover:bg-[#1E3A6A]/15 md:hover:text-[#1E3A6A]
                         transition-all duration-200"
            >
              <X size={15} strokeWidth={2.5} />
            </button>

            {/* ══════════════════════════════════════════
                Left value panel — desktop only
            ══════════════════════════════════════════ */}
            <div className="hidden md:flex md:w-[42%] shrink-0 flex-col justify-between bg-[#1E3A6A] px-10 py-12 text-white">
              <div>
                {/* Brand label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D8C4AD] mb-10">
                  Infravue Interiors
                </p>

                {/* Headline */}
                <h2 className="text-[1.75rem] font-bold leading-[1.2] mb-4">
                  Transform Your Space<br />
                  Into Something{" "}
                  <span className="italic font-light text-[#D8C4AD]">Extraordinary</span>
                </h2>
                <p className="text-sm text-white/55 leading-relaxed mb-10">
                  One free conversation with our senior designers can save months of guesswork — and give your project the start it deserves.
                </p>

                {/* Value props */}
                <ul className="space-y-5">
                  {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-[#A1622C]/20 flex items-center justify-center">
                        <Icon size={14} className="text-[#A1622C]" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-snug">{title}</p>
                        <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer tag */}
              <div className="mt-10 pt-7 border-t border-white/10">
                <p className="text-[10px] text-white/35 uppercase tracking-[0.22em]">
                  Serving Hyderabad &amp; Pan-India
                </p>
              </div>
            </div>

            {/* ══════════════════════════════════════════
                Right form panel
            ══════════════════════════════════════════ */}
            <div className="flex-1 overflow-y-auto">
              {/* Mobile-only compact header */}
              <div className="md:hidden bg-[#1E3A6A] px-6 pt-10 pb-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D8C4AD] mb-2">
                  Infravue Interiors
                </p>
                <h2 className="text-xl font-bold leading-snug">
                  Book Your Free Consultation
                </h2>
                <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                  No cost, no commitment. Just great ideas for your space.
                </p>
              </div>

              {/* Form */}
              <div className="md:pt-2">
                <BookingForm />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
