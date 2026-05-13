"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";

type LightboxState = { projectIdx: number; imgIdx: number } | null;

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const openLightbox = (projectIdx: number, imgIdx: number) =>
    setLightbox({ projectIdx, imgIdx });
  const closeLightbox = () => setLightbox(null);

  const lbProject = lightbox !== null ? filtered[lightbox.projectIdx] : null;
  const lbGallery = lbProject
    ? lbProject.gallery && lbProject.gallery.length > 0
      ? lbProject.gallery
      : [lbProject.image]
    : [];

  const lbNext = () => {
    if (!lightbox) return;
    const nextImg = (lightbox.imgIdx + 1) % lbGallery.length;
    setLightbox({ ...lightbox, imgIdx: nextImg });
  };
  const lbPrev = () => {
    if (!lightbox) return;
    const prevImg = (lightbox.imgIdx - 1 + lbGallery.length) % lbGallery.length;
    setLightbox({ ...lightbox, imgIdx: prevImg });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#0B0F19] pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(161,98,44,0.15),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-20 text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.38em] text-[#A1622C]">
            Our Portfolio
          </p>
          <h1
            className="font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Every Space,{" "}
            <span className="italic font-light text-[#D8C4AD]">a Story</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/55 lg:text-lg">
            Explore our portfolio of residential, commercial, and hospitality projects
            delivered across India.
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-[69px] z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-20">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                  filter === cat
                    ? "bg-[#1E3A6A] text-white"
                    : "bg-gray-100 text-[#1E3A6A]/60 hover:bg-gray-200 hover:text-[#1E3A6A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-20 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, pIdx) => {
            const gallery =
              project.gallery && project.gallery.length > 0
                ? project.gallery
                : [project.image];
            return (
              <div key={project.slug} className="group flex flex-col">
                {/* Main thumbnail */}
                <button
                  onClick={() => openLightbox(pIdx, 0)}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl cursor-zoom-in"
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.category} interior design by Infravue Interiors${project.location ? `, ${project.location}` : ""}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 p-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                      View Gallery <ArrowRight size={12} />
                    </span>
                  </div>
                </button>

                {/* Project info */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A1622C] mb-1">
                      {project.category}
                    </p>
                    <h2 className="text-lg font-bold text-[#1E3A6A]">{project.name}</h2>
                    {project.location && (
                      <p className="mt-0.5 text-xs text-[#1E3A6A]/45">{project.location}</p>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="shrink-0 mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A6A]/50 hover:text-[#1E3A6A] transition-colors"
                  >
                    Details <ArrowRight size={11} />
                  </Link>
                </div>

                {/* Thumbnail strip */}
                {gallery.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none pb-1">
                    {gallery.slice(0, 6).map((img, iIdx) => (
                      <button
                        key={iIdx}
                        onClick={() => openLightbox(pIdx, iIdx)}
                        className="relative shrink-0 h-14 w-14 overflow-hidden rounded-lg cursor-zoom-in"
                      >
                        <Image
                          src={img}
                          alt={`${project.name} interior view ${iIdx + 1} — ${project.category} project by Infravue Interiors`}
                          fill
                          sizes="56px"
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    ))}
                    {gallery.length > 6 && (
                      <button
                        onClick={() => openLightbox(pIdx, 6)}
                        className="shrink-0 h-14 w-14 rounded-lg bg-[#1E3A6A]/8 border border-[#1E3A6A]/10 flex items-center justify-center text-xs font-bold text-[#1E3A6A]/50 hover:bg-[#1E3A6A]/15 transition-colors"
                      >
                        +{gallery.length - 6}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-gray-100 bg-white py-20 text-center">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#A1622C]">
          Start Your Project
        </p>
        <h2 className="mb-6 text-3xl font-bold text-[#1E3A6A] lg:text-4xl">
          Love What You See?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-base font-light text-[#1E3A6A]/55">
          Let&apos;s create a space that&apos;s uniquely yours — built with the same
          care and precision you see in every project here.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 rounded-full bg-[#1E3A6A] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#152B52]"
        >
          Book Free Consultation
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && lbProject && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <div
            className="relative z-10 flex h-full w-full max-w-6xl items-center justify-center p-4 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full max-h-[85vh]">
              <Image
                src={lbGallery[lightbox.imgIdx]}
                alt={`${lbProject.name} — image ${lightbox.imgIdx + 1} of ${lbGallery.length}, ${lbProject.category} interior by Infravue Interiors`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:right-8 sm:top-8"
          >
            <X size={16} />
          </button>

          {/* Nav */}
          {lbGallery.length > 1 && (
            <>
              <button
                onClick={lbPrev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15 sm:left-6"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={lbNext}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15 sm:right-6"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute inset-x-0 bottom-6 z-20 text-center text-xs tracking-[0.3em] uppercase text-white/50">
                {String(lightbox.imgIdx + 1).padStart(2, "0")} /{" "}
                {String(lbGallery.length).padStart(2, "0")}
              </div>
            </>
          )}

          {/* Project label */}
          <div className="absolute inset-x-0 top-4 z-20 text-center sm:top-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A1622C]">
              {lbProject.category}
            </p>
            <p className="text-sm font-semibold text-white">{lbProject.name}</p>
          </div>
        </div>
      )}
    </main>
  );
}
