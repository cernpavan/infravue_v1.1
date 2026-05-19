"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  MapPin,
  Maximize2,
  Layers,
} from "lucide-react";
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

  // ── Lock body scroll while modal is open (preserves page scroll position) ──
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
      // Scroll the modal body back to top when a new project is opened
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
          setLightboxIdx((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
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
          className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project gallery`}
        >
          {/* ── Backdrop (click to close) ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-[8px] cursor-pointer"
          />

          {/* ── Modal Panel ── */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.42, ease: EASE } }}
            exit={{ opacity: 0, scale: 0.96, y: 24, transition: { duration: 0.25 } }}
            className="relative z-10 w-full h-full sm:h-[92dvh] max-w-6xl bg-white sm:rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col focus:outline-none"
          >
            {/* ── Header — minimal, project name only ── */}
            <header className="relative shrink-0 z-20 px-5 sm:px-8 py-5 sm:py-7 bg-white/95 backdrop-blur-md border-b border-[#1E3A6A]/8">
              <h2 className="px-12 sm:px-14 text-center text-xl sm:text-2xl md:text-[28px] font-light tracking-[0.02em] text-[#1E3A6A] leading-tight truncate">
                {project.name}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close project gallery"
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#1E3A6A]/5 text-[#1E3A6A]/60 hover:bg-[#1E3A6A]/12 hover:text-[#1E3A6A] active:scale-95 transition-all duration-200"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </header>

            {/* ── Project Metadata — premium info grid ── */}
            <ProjectMetaBand project={project} />

            {/* ── Scrollable Gallery Body ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain bg-[#FAFAF9]"
            >
              <div className="px-3 sm:px-6 md:px-8 py-6 md:py-10">
                {/* Image grid — first image is a full-width hero */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {gallery.map((src, idx) => {
                    const isHero = idx === 0;
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxIdx(idx)}
                        aria-label={`Open image ${idx + 1} of ${gallery.length}`}
                        className={`group relative block overflow-hidden rounded-xl bg-[#1E3A6A]/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1622C]/60 focus-visible:ring-offset-2 ${
                          isHero ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${project.name} — view ${idx + 1} of ${gallery.length}, ${project.category} interior by Infravue Interiors${project.location ? `, ${project.location}` : ""}`}
                          fill
                          sizes={
                            isHero
                              ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
                              : "(max-width: 768px) 100vw, 540px"
                          }
                          loading={idx < 2 ? "eager" : "lazy"}
                          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                        {/* Subtle hover veil */}
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Footer CTA — deep link still works for sharing & SEO */}
                <div className="mt-10 sm:mt-14 pt-6 border-t border-[#1E3A6A]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-[#1E3A6A]/50 leading-relaxed max-w-sm">
                    {gallery.length} image{gallery.length === 1 ? "" : "s"} from this project · Click any image to expand
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A6A] text-white text-xs sm:text-sm font-semibold hover:bg-[#152B52] active:scale-[0.97] transition-all duration-200"
                  >
                    View Full Case Study
                    <ArrowRight size={14} strokeWidth={2.2} />
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
                      alt={`${project.name} — image ${lightboxIdx + 1} of ${gallery.length}, ${project.category} interior by Infravue Interiors`}
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
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-200"
                >
                  <X size={18} />
                </button>

                {/* Prev/Next */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
                      }}
                      aria-label="Previous image"
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-200"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIdx((i) => (i === null ? null : (i + 1) % gallery.length));
                      }}
                      aria-label="Next image"
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-200"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <p className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/55">
                      {String(lightboxIdx + 1).padStart(2, "0")}
                      <span className="mx-2 text-white/25">/</span>
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

/* ──────────────────────────────────────────────────────────────────────── */
/*  Project Metadata Band — premium info grid                              */
/*  Sits between the title and the gallery; always visible.                */
/* ──────────────────────────────────────────────────────────────────────── */

type MetaIcon = React.ComponentType<{ size?: number; strokeWidth?: number }>;

function ProjectMetaBand({ project }: { project: ProjectWithSlug }) {
  const items: { label: string; value?: string; Icon: MetaIcon }[] = [
    { label: "Year", value: project.year, Icon: Calendar },
    { label: "Location", value: project.location, Icon: MapPin },
    { label: "Area", value: project.area, Icon: Maximize2 },
    { label: "Scope", value: project.scope, Icon: Layers },
  ];

  return (
    <section
      aria-label={`${project.name} project details`}
      className="shrink-0 bg-white border-b border-[#1E3A6A]/10"
    >
      <dl className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <MetaCell key={item.label} {...item} pos={i} />
        ))}
      </dl>
    </section>
  );
}

function MetaCell({
  label,
  value,
  Icon,
  pos,
}: {
  label: string;
  value?: string;
  Icon: MetaIcon;
  pos: number;
}) {
  return (
    <div
      className={[
        "px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7",
        // Mobile (2-col): odd cells get a left rule, second row gets a top rule
        pos % 2 === 1 ? "border-l border-[#1E3A6A]/10" : "",
        pos >= 2 ? "border-t border-[#1E3A6A]/10" : "",
        // Desktop (4-col): no top rule; left rule on every cell except the first
        "md:border-t-0",
        pos === 0 ? "md:border-l-0" : "md:border-l md:border-[#1E3A6A]/10",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <dt className="flex items-center gap-2 mb-2 sm:mb-2.5 text-[#A1622C]">
        <Icon size={13} strokeWidth={1.75} />
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium">
          {label}
        </span>
      </dt>
      <dd className="text-base md:text-lg font-light text-[#1E3A6A] leading-snug break-words">
        {value || "—"}
      </dd>
    </div>
  );
}
