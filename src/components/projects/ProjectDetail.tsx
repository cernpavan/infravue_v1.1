"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  ShowcaseContent,
  Lightbox,
  type Project,
} from "@/components/sections/ProjectShowcase";

type Props = {
  project: Project;
  index: number;
  total: number;
  prevSlug: string;
  nextSlug: string;
};

/**
 * Route-mode renderer for a single project.
 *
 * Mirrors the rich layout of the legacy modal showcase, but driven by
 * window scroll (instead of a locked container) so browser back/forward
 * and scroll restoration behave naturally.
 */
export default function ProjectDetail({
  project,
  index,
  total,
  prevSlug,
  nextSlug,
}: Props) {
  const router = useRouter();
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Parallax derived from window scroll — replaces the modal's container scroll.
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.55]);
  const titleY = useTransform(scrollY, [0, 400], [0, -40]);

  const goToProjects = useCallback(() => {
    router.push("/#projects");
  }, [router]);

  const goNext = useCallback(() => {
    router.push(`/projects/${nextSlug}`);
  }, [router, nextSlug]);

  const goPrev = useCallback(() => {
    router.push(`/projects/${prevSlug}`);
  }, [router, prevSlug]);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="relative bg-[#0B0F19]">
      {/* ── Floating "Back to projects" pill ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed left-4 top-24 z-40 sm:left-8 sm:top-28"
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-medium tracking-[0.32em] uppercase text-white/85 backdrop-blur-md transition hover:border-white/40 hover:bg-black/55"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Projects
        </Link>
      </motion.div>

      {/* ── Project pagination indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="pointer-events-none fixed right-4 top-24 z-40 hidden items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/55 sm:right-8 sm:top-28 sm:flex"
      >
        <span className="text-white/85">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-white/30" />
        <span>{String(total).padStart(2, "0")}</span>
      </motion.div>

      <ShowcaseContent
        project={project}
        heroY={heroY}
        heroScale={heroScale}
        heroFade={heroFade}
        titleY={titleY}
        onOpenImage={openLightbox}
        onClose={goToProjects}
        onNext={goNext}
        onPrev={goPrev}
        index={index}
        total={total}
      />

      <Lightbox
        project={project}
        activeIndex={lightbox}
        onClose={closeLightbox}
        onSet={setLightbox}
      />
    </div>
  );
}
