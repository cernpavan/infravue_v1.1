"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Maximize2,
  Ruler,
  Sparkles,
} from "lucide-react";

export type ProjectPalette = { name: string; hex: string };
export type ProjectStat = { label: string; value: string };
export type ProjectDetailFrame = {
  title: string;
  caption?: string;
  position?: string;
  span?: "wide" | "tall" | "square";
};

export type Project = {
  name: string;
  category: string;
  image: string;
  gallery?: string[];
  year?: string;
  location?: string;
  area?: string;
  scope?: string;
  style?: string;
  intro?: string;
  description?: string;
  philosophy?: string;
  stats?: ProjectStat[];
  palette?: ProjectPalette[];
  detailFrames?: ProjectDetailFrame[];
};

type Props = {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const easeLuxury = [0.22, 1, 0.36, 1] as const;

export default function ProjectShowcase({
  project,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: Props) {
  return (
    <AnimatePresence>
      {project && (
        <ShowcaseModal
          key="showcase-modal"
          project={project}
          index={index}
          total={total}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Modal — only mounted when a project is active, so refs and scroll      */
/*  hooks always run against a hydrated container.                         */
/* ──────────────────────────────────────────────────────────────────────── */

type ModalProps = {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

function ShowcaseModal({
  project,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: ModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { scrollY } = useScroll({ container: scrollRef });
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.55]);
  const titleY = useTransform(scrollY, [0, 400], [0, -40]);

  // Lock body scroll while modal is mounted.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Reset internal scroll & close lightbox when switching projects.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    setLightbox(null);
  }, [project.name]);

  // Keyboard navigation.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      } else if (lightbox === null) {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      } else {
        const gallery = project.gallery ?? [project.image];
        if (e.key === "ArrowRight")
          setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));
        if (e.key === "ArrowLeft")
          setLightbox((i) =>
            i === null ? null : (i - 1 + gallery.length) % gallery.length
          );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, lightbox, onClose, onNext, onPrev]);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-[#0B0F19]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeLuxury }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} project showcase`}
    >
      {/* ── Cinematic curtain reveal ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[125] h-full bg-[#0B0F19] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease: easeLuxury }}
      />

      {/* ── Top floating control bar ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[140] flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7">
        <motion.div
          className="pointer-events-auto flex items-center gap-3 text-white/80"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.32em] uppercase">
            Infravue · Portfolio
          </span>
        </motion.div>

        <motion.div
          className="pointer-events-auto flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/55">
            <span className="text-white/85">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-white/30" />
            <span>{String(total).padStart(2, "0")}</span>
          </span>

          <button
            onClick={onPrev}
            aria-label="Previous project"
            className="group hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={onNext}
            aria-label="Next project"
            className="group hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
          >
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close project showcase"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20"
          >
            <X size={16} />
          </button>
        </motion.div>
      </div>

      {/* ── Scrollable showcase body ── */}
      <div
        ref={scrollRef}
        className="absolute inset-0 z-[130] overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <ShowcaseContent
          project={project}
          heroY={heroY}
          heroScale={heroScale}
          heroFade={heroFade}
          titleY={titleY}
          onOpenImage={openLightbox}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
          index={index}
          total={total}
        />
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        project={project}
        activeIndex={lightbox}
        onClose={closeLightbox}
        onSet={setLightbox}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Showcase Content                                                        */
/* ──────────────────────────────────────────────────────────────────────── */

export function ShowcaseContent({
  project,
  heroY,
  heroScale,
  heroFade,
  titleY,
  onOpenImage,
  onClose,
  onNext,
  onPrev,
  index,
  total,
}: {
  project: Project;
  heroY: MotionValue<number>;
  heroScale: MotionValue<number>;
  heroFade: MotionValue<number>;
  titleY: MotionValue<number>;
  onOpenImage: (i: number) => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
}) {
  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];
  const detailFrames = project.detailFrames ?? defaultDetailFrames;

  return (
    <motion.div
      key={project.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeLuxury }}
    >
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale, opacity: heroFade }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
        </motion.div>

        {/* Vignette + bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-[#0B0F19]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(11,15,25,0.75)_100%)]" />

        {/* Hero copy */}
        <motion.div
          style={{ y: titleY }}
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-14 sm:px-12 sm:pb-20 lg:px-20 lg:pb-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7, ease: easeLuxury }}
              className="mb-5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.42em] text-sand"
            >
              {project.category}
              {project.location ? (
                <span className="ml-3 text-white/40">
                  · {project.location}
                </span>
              ) : null}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.85, ease: easeLuxury }}
              className="font-light leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl lg:text-[8.5rem]"
            >
              {project.name}
            </motion.h1>

            {project.intro ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.7, ease: easeLuxury }}
                className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed font-light text-white/75"
              >
                {project.intro}
              </motion.p>
            ) : null}

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-12 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/55"
            >
              <span>Scroll to explore</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block h-8 w-px bg-gradient-to-b from-white/60 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Metadata strip ────────────────────────────────────────────── */}
      <section className="relative bg-[#0B0F19] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-12 sm:py-14 lg:px-20">
          <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-t border-white/10 pt-10 sm:grid-cols-4">
            <MetaItem
              icon={<Calendar size={14} />}
              label="Year"
              value={project.year ?? "—"}
            />
            <MetaItem
              icon={<MapPin size={14} />}
              label="Location"
              value={project.location ?? "—"}
            />
            <MetaItem
              icon={<Ruler size={14} />}
              label="Area"
              value={project.area ?? "—"}
            />
            <MetaItem
              icon={<Sparkles size={14} />}
              label="Scope"
              value={project.scope ?? "—"}
            />
          </div>
        </div>
      </section>

      {/* ─── Narrative ─────────────────────────────────────────────────── */}
      {project.description ? (
        <section className="relative bg-[#0B0F19] text-white">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-12 lg:py-32 lg:px-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, ease: easeLuxury }}
                className="lg:col-span-3 text-[10px] tracking-[0.42em] uppercase text-sand pt-2"
              >
                The Story
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.95, ease: easeLuxury }}
                className="lg:col-span-9"
              >
                <p className="text-2xl leading-[1.45] font-light text-white/90 sm:text-3xl">
                  {project.description}
                </p>
                {project.philosophy ? (
                  <p className="mt-10 max-w-2xl text-base leading-relaxed font-light text-white/55">
                    {project.philosophy}
                  </p>
                ) : null}
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ─── Detail Frames (cinematic crops of the hero or gallery) ─── */}
      <section className="relative bg-[#0B0F19] pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: easeLuxury }}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-[10px] tracking-[0.42em] uppercase text-sand mb-3">
                Inside the project
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-white">
                Moments & Details
              </h2>
            </div>
            <p className="hidden sm:block max-w-xs text-sm font-light text-white/45 leading-relaxed">
              Curated frames from the space. Click any image to enter full view.
            </p>
          </motion.div>

          <DetailGallery
            images={gallery}
            frames={detailFrames}
            onOpen={onOpenImage}
          />
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      {project.stats && project.stats.length > 0 ? (
        <section className="relative bg-[#0B0F19] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 lg:grid-cols-4">
              {project.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: easeLuxury }}
                  className="bg-[#0B0F19] p-8 sm:p-10"
                >
                  <p className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[10px] tracking-[0.32em] uppercase text-sand">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ─── Palette ───────────────────────────────────────────────────── */}
      {project.palette && project.palette.length > 0 ? (
        <section className="relative bg-[#0B0F19] py-24 sm:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="text-[10px] tracking-[0.42em] uppercase text-sand mb-4">
                  Material Palette
                </p>
                <h3 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                  Tones that carry the space.
                </h3>
                <p className="mt-6 text-sm font-light text-white/55 leading-relaxed max-w-md">
                  Every surface, finish, and accent is selected to compose a
                  quiet, consistent atmosphere.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                  {project.palette.map((swatch, i) => (
                    <motion.div
                      key={swatch.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.6,
                        ease: easeLuxury,
                      }}
                      className="bg-[#0B0F19]"
                    >
                      <div
                        className="aspect-square w-full"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="px-4 py-4 sm:px-5 sm:py-5">
                        <p className="text-sm font-light text-white">
                          {swatch.name}
                        </p>
                        <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-white/40">
                          {swatch.hex}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ─── CTA + footer ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#0B0F19] to-navy-dark py-24 sm:py-32 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-12 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeLuxury }}
            className="text-[10px] tracking-[0.42em] uppercase text-sand mb-6"
          >
            Begin your project
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeLuxury }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05]"
          >
            Imagine your space, <span className="italic text-sand">elevated.</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeLuxury }}
            className="mt-6 max-w-xl mx-auto text-base sm:text-lg font-light text-white/65 leading-relaxed"
          >
            Every Infravue project begins with a conversation. Let&apos;s craft the
            interior you&apos;ve been picturing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeLuxury }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <a
              href="/book"
              className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-9 py-4 text-sm font-medium text-white transition-all hover:bg-terracotta-light shadow-[0_18px_60px_-12px_rgba(161,98,44,0.6)]"
            >
              Start your journey
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-9 py-4 text-sm font-medium text-white/85 transition-all hover:border-white/50 hover:text-white"
            >
              View next project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Project pagination footer */}
        <div className="mx-auto max-w-7xl mt-24 sm:mt-32 px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between border-t border-white/10 pt-8 text-[10px] tracking-[0.32em] uppercase text-white/45">
            <button
              onClick={onPrev}
              className="group flex items-center gap-3 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Previous
            </button>
            <span className="font-light">
              <span className="text-white/85">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-white/30">/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </span>
            <button
              onClick={onNext}
              className="group flex items-center gap-3 transition-colors hover:text-white"
            >
              Next
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Building blocks                                                          */
/* ──────────────────────────────────────────────────────────────────────── */

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sand mb-3">
        <span className="opacity-80">{icon}</span>
        <span className="text-[10px] tracking-[0.32em] uppercase">{label}</span>
      </div>
      <p className="text-base sm:text-lg font-light text-white/90">{value}</p>
    </div>
  );
}

function DetailGallery({
  images,
  frames,
  onOpen,
}: {
  images: string[];
  frames: ProjectDetailFrame[];
  onOpen: (i: number) => void;
}) {
  // Pair each frame with an image. If gallery is shorter than frames,
  // we cycle through the gallery so each frame gets a backing image.
  const items = frames.map((frame, i) => ({
    frame,
    image: images[i % images.length],
    galleryIndex: i % images.length,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
      {items.map((item, i) => {
        const span = item.frame.span ?? "square";
        const colSpan =
          span === "wide"
            ? "sm:col-span-12"
            : span === "tall"
            ? "sm:col-span-5"
            : "sm:col-span-7";
        const aspect =
          span === "wide"
            ? "aspect-[16/9]"
            : span === "tall"
            ? "aspect-[3/4]"
            : "aspect-[4/3]";

        return (
          <motion.button
            key={`${item.frame.title}-${i}`}
            type="button"
            onClick={() => onOpen(item.galleryIndex)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.85,
              delay: i * 0.06,
              ease: easeLuxury,
            }}
            className={`group relative ${colSpan} ${aspect} overflow-hidden rounded-xl bg-white/5 cursor-zoom-in`}
          >
            <Image
              src={item.image}
              alt={item.frame.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              style={{ objectPosition: item.frame.position ?? "center" }}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />

            {/* Gradient overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-90" />

            {/* Hover label */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="text-left">
                <p className="text-[10px] tracking-[0.32em] uppercase text-sand mb-1.5 opacity-90">
                  Detail · {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-lg sm:text-xl font-light text-white">
                  {item.frame.title}
                </p>
                {item.frame.caption ? (
                  <p className="mt-1 text-xs font-light text-white/55 max-w-xs">
                    {item.frame.caption}
                  </p>
                ) : null}
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white/90 backdrop-blur-md transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-navy">
                <Maximize2 size={14} />
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Lightbox                                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

export function Lightbox({
  project,
  activeIndex,
  onClose,
  onSet,
}: {
  project: Project;
  activeIndex: number | null;
  onClose: () => void;
  onSet: (i: number | null) => void;
}) {
  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  const next = () =>
    onSet(activeIndex === null ? null : (activeIndex + 1) % gallery.length);
  const prev = () =>
    onSet(
      activeIndex === null
        ? null
        : (activeIndex - 1 + gallery.length) % gallery.length
    );

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[160] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easeLuxury }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          <motion.div
            key={`light-${activeIndex}-${project.name}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: easeLuxury }}
            drag={gallery.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next();
              if (info.offset.x > 80) prev();
            }}
            className="relative z-10 flex h-full w-full max-w-[1400px] items-center justify-center px-4 py-16 sm:px-12 sm:py-20"
          >
            <div className="relative h-full w-full">
              <Image
                src={gallery[activeIndex]}
                alt={`${project.name} ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Controls */}
          <button
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/15 sm:right-8 sm:top-8"
          >
            <X size={16} />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/45 hover:bg-white/15 sm:left-8 sm:h-14 sm:w-14"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/45 hover:bg-white/15 sm:right-8 sm:h-14 sm:w-14"
              >
                <ArrowRight size={18} />
              </button>

              <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-2 text-[10px] tracking-[0.4em] uppercase text-white/65 sm:bottom-10">
                <span className="text-white">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-white/30" />
                <span>{String(gallery.length).padStart(2, "0")}</span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Defaults                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

const defaultDetailFrames: ProjectDetailFrame[] = [
  {
    title: "Form & Light",
    caption: "Where natural daylight shapes the architecture.",
    position: "center top",
    span: "wide",
  },
  {
    title: "Material Story",
    caption: "Stone, wood, and tone in conversation.",
    position: "center",
    span: "tall",
  },
  {
    title: "Atmosphere",
    caption: "The quiet textures that make a space feel like home.",
    position: "center bottom",
    span: "square",
  },
];
