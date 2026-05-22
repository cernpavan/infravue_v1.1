"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS, type ProjectWithSlug } from "@/data/projects";
import ProjectGalleryModal from "@/components/projects/ProjectGalleryModal";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectWithSlug;
  index: number;
  onOpen: (project: ProjectWithSlug) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        prefetch
        aria-label={`Open ${project.name} gallery`}
        onClick={(e) => {
          // Let modifier-clicks (Ctrl/Cmd/Shift/middle-click) fall through to the deep page
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          onOpen(project);
        }}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-50 cursor-pointer text-left"
      >
        {/* ── Image ── */}
        <Image
          src={project.image}
          alt={`${project.name} — ${project.category} interior design project by Infravue Interiors${project.location ? `, ${project.location}` : ""}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
        />

        {/* ── Permanent bottom gradient for text legibility ── */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

        {/* ── Project name ── */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <h3 className="text-xl font-light text-white drop-shadow-sm">
            {project.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<ProjectWithSlug | null>(null);

  return (
    <section id="projects" className="bg-white py-8 lg:py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* ── Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy leading-tight mb-6">
            Our Projects
          </h2>
          <p className="text-[#1E3A6A]/60 text-lg leading-relaxed max-w-[860px] mx-auto">
            Explore our portfolio of corporate, commercial, and residential interiors — crafted with turnkey precision, luxury finishes, and customized solutions delivered across India.
          </p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      {/* ── Project Gallery Modal ── */}
      <ProjectGalleryModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
