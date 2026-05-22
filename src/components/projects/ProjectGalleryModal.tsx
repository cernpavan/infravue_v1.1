"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { ProjectWithSlug } from "@/data/projects";

interface Props {
  project: ProjectWithSlug | null;
  onClose: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectGalleryModal({ project, onClose }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = !!project;
  const gallery = project?.gallery ?? [];

  // ── Lock body scroll while modal is open ──
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // ── Reset internal state when modal opens (so each project starts fresh) ──
  useEffect(() => {
    if (isOpen) {
      setLightboxIdx(null);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }));
    }
  }, [isOpen, project?.slug]);

  // ── Keyboard handling: ESC, arrows for lightbox ──
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIdx !== null) {
          setLightboxIdx(null);
        } else {
          onClose();
        }
        return;
      }
      if (lightboxIdx !== null && gallery.length > 1) {
        if (e.key === "ArrowLeft") {
          setLightboxIdx((i) =>
            i === null ? null : (i - 1 + gallery.length) % gallery.length
          );
        }
        if (e.key === "ArrowRight") {
          setLightboxIdx((i) => (i === null ? null : (i + 1) % gallery.length));
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, lightboxIdx, gallery.length, onClose]);

  // ── Move focus into the panel when opened ──
  useEffect(() => {
    if (isOpen && panelRef.current) panelRef.current.focus();
  }, [isOpen, project?.slug]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project gallery`}
        >
          {/* ── Backdrop (click to close) ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0F19]/65 backdrop-blur-[14px] cursor-pointer"
          />

          {/* ── Modal Panel ── */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.45, ease: EASE },
            }}
            exit={{ opacity: 0, scale: 0.97, y: 18, transition: { duration: 0.25 } }}
            className="relative z-10 w-full h-full sm:h-[92dvh] max-w-6xl bg-white sm:rounded-[28px] shadow-[0_24px_80px_-24px_rgba(11,15,25,0.45),0_8px_24px_-12px_rgba(11,15,25,0.18)] ring-1 ring-[#1E3A6A]/5 overflow-hidden focus:outline-none"
          >
            {/* ── Floating Close Button — stays accessible during scroll ── */}
            <button
              onClick={onClose}
              aria-label="Close project gallery"
              className="absolute right-2.5 sm:right-4 top-2.5 sm:top-3.5 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-md text-[#1E3A6A]/65 hover:text-[#1E3A6A] hover:bg-white active:scale-95 transition-all duration-200 shadow-[0_2px_10px_-2px_rgba(11,15,25,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1622C]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <X size={17} strokeWidth={1.75} />
            </button>

            {/* ── Unified Scroll Container ── */}
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto overscroll-contain bg-[#FAFAF9] scroll-smooth [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1E3A6A]/15 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#1E3A6A]/25"
            >
              {/* ── Header — project name only, centered, elegant ── */}
              <header className="relative bg-white px-6 sm:px-10 pt-6 sm:pt-7 pb-5 sm:pb-6">
                <div className="px-10 sm:px-14 flex flex-col items-center text-center">
                  {/* Eyebrow flourish (purely decorative — no metadata) */}
                  <span
                    aria-hidden
                    className="mb-3 inline-flex items-center gap-2"
                  >
                    <span className="h-px w-5 bg-[#A1622C]/55" />
                    <span className="h-1 w-1 rounded-full bg-[#A1622C]/55" />
                    <span className="h-px w-5 bg-[#A1622C]/55" />
                  </span>

                  <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-light tracking-[-0.012em] text-[#1E3A6A] leading-[1.1] truncate max-w-full">
                    {project.name}
                  </h2>
                </div>

                {/* hairline that fades to nothing at the edges */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-6 right-6 sm:left-12 sm:right-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1E3A6A]/10 to-transparent"
                />
              </header>

              {/* ── Gallery + Footer ── */}
              <div className="px-5 sm:px-8 md:px-12 pt-7 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14">
                {/* Image grid — first image is a full-width hero */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-5 md:gap-6">
                  {gallery.map((src, idx) => {
                    const isHero = idx === 0;
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxIdx(idx)}
                        aria-label={`Open image ${idx + 1} of ${gallery.length}`}
                        className={`group relative block overflow-hidden rounded-2xl bg-[#1E3A6A]/[0.04] cursor-zoom-in shadow-[0_1px_2px_rgba(11,15,25,0.04)] hover:shadow-[0_18px_40px_-18px_rgba(11,15,25,0.28)] transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1622C]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9] ${
                          isHero ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${project.name} — view ${idx + 1} of ${gallery.length}, interior by Infravue Interiors`}
                          fill
                          sizes={
                            isHero
                              ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                              : "(max-width: 768px) 100vw, 540px"
                          }
                          loading={idx < 2 ? "eager" : "lazy"}
                          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                        />
                        {/* Subtle hover veil */}
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Footer CTA — image count + View Full Case Study (preserved) */}
                <div className="mt-14 sm:mt-16 md:mt-20 pt-8 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left relative">
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1E3A6A]/12 to-transparent"
                  />
                  <p className="text-xs sm:text-[13px] tracking-[0.02em] text-[#1E3A6A]/55 leading-relaxed max-w-sm">
                    {gallery.length} image{gallery.length === 1 ? "" : "s"} from this project · Click any image to expand
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A6A] text-white text-[12px] sm:text-[13px] font-medium tracking-[0.02em] hover:bg-[#152B52] active:scale-[0.97] transition-all duration-200 shadow-[0_8px_24px_-12px_rgba(30,58,106,0.55)]"
                  >
                    View Full Case Study
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Nested Lightbox ── */}
          <AnimatePresence>
            {lightboxIdx !== null && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.22 } }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/95"
                onClick={() => setLightboxIdx(null)}
                role="dialog"
                aria-modal="true"
                aria-label={`${project.name} image ${lightboxIdx + 1} of ${gallery.length}`}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1, transition: { duration: 0.3, ease: EASE } }}
                  exit={{ scale: 0.95, transition: { duration: 0.2 } }}
                  className="relative w-full h-full flex items-center justify-center p-4 sm:p-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-h-[82vh]">
                    <Image
                      src={gallery[lightboxIdx]}
                      alt={`${project.name} — image ${lightboxIdx + 1} of ${gallery.length}, interior by Infravue Interiors`}
                      fill
                      sizes="100vw"
                      priority
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* Close */}
                <button
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Close image"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white/85 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>

                {/* Prev/Next */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx((i) =>
                          i === null ? null : (i - 1 + gallery.length) % gallery.length
                        );
                      }}
                      aria-label="Previous image"
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white/85 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200"
                    >
                      <ChevronLeft size={20} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx((i) =>
                          i === null ? null : (i + 1) % gallery.length
                        );
                      }}
                      aria-label="Next image"
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white/85 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200"
                    >
                      <ChevronRight size={20} strokeWidth={1.5} />
                    </button>
                    <p className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-medium text-white/60">
                      {String(lightboxIdx + 1).padStart(2, "0")}
                      <span className="mx-2 text-white/30">/</span>
                      {String(gallery.length).padStart(2, "0")}
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
