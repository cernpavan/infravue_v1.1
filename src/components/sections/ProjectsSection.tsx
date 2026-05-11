"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type ProjectWithSlug } from "@/data/projects";

function ProjectCard({
  project,
  index,
}: {
  project: ProjectWithSlug;
  index: number;
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
        aria-label={`Open ${project.name} showcase`}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-50 cursor-pointer text-left"
      >
        {/* ── Image ── */}
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
        />

        {/* ── Overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* ── Always-visible bottom badge ── */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-sand text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.category}
            </p>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-light text-white drop-shadow-md">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 text-white text-xs font-medium opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="tracking-[0.2em] uppercase">View</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-white group-hover:text-navy">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-white py-20 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy leading-tight mb-6">
            Our Projects
          </h2>
          <p className="text-[#1E3A6A]/60 text-lg leading-relaxed">
            Explore our portfolio of corporate interior designers, commercial interior design, and modern home interiors featuring turnkey interior solutions, customized interior solutions, luxury interiors, and office interior design.
          </p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}

          {/* Final CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border-2 border-dashed border-gray-100"
          >
            <h3 className="text-xl font-bold text-navy text-center mb-4">
              Your Project Next?
            </h3>
            <p className="text-navy/50 text-sm text-center mb-8">
              Let&apos;s create something extraordinary together.
            </p>
            <Link
              href="/book"
              className="px-8 py-4 bg-terracotta text-white font-bold rounded-[4px] hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
