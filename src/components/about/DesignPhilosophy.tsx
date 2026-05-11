"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, Layers, Sparkles, type LucideIcon } from "lucide-react";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

type Pillar = {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    icon: Compass,
    title: "Considered Design",
    body: "Every layout, material, and finish is thoughtfully selected to create functional, modern home interiors, office interiors, and commercial interior design spaces that balance aesthetics, comfort, and long-term practicality.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Turnkey Craftsmanship",
    body: "From concept planning and 3D visualization to procurement and turnkey interior solutions, we handle every stage with complete accountability from start to handover.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Client-First Approach",
    body: "Your lifestyle, vision, and budget shape every customized interior solution we create. We listen first, then we translate it into spaces that feel functional, personal, and uniquely yours.",
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: CINEMATIC_EASE },
  },
};

export default function DesignPhilosophy() {
  return (
    <section className="relative bg-[#FBF9F5] py-24 lg:py-36 overflow-hidden">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(216,196,173,0.18),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="max-w-3xl mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-7">
            <span aria-hidden className="h-px w-10 bg-terracotta/60" />
            <p className="text-terracotta text-[11px] font-bold tracking-[0.32em] uppercase">
              Our Philosophy
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.015em] text-navy font-light">
            Three principles that shape{" "}
            <span className="text-terracotta italic font-normal">
              every project
            </span>{" "}
            we deliver.
          </h2>
        </motion.div>

        {/* ── Pillars Grid ── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/[0.08] rounded-[20px] overflow-hidden border border-navy/[0.08] shadow-[0_30px_70px_-40px_rgba(30,58,106,0.25)]"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.number}
                variants={cardVariants}
                className="group relative bg-white px-8 lg:px-10 py-12 lg:py-16 transition-colors duration-500 hover:bg-[#FCFAF6]"
              >
                {/* Top accent bar — animates in on hover */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[2px] w-0 bg-terracotta transition-all duration-700 ease-out group-hover:w-full"
                />

                {/* Number watermark */}
                <span
                  aria-hidden
                  className="absolute top-6 right-8 font-heading text-[3.5rem] leading-none font-light text-navy/[0.06] select-none transition-colors duration-500 group-hover:text-terracotta/15"
                >
                  {pillar.number}
                </span>

                {/* Icon */}
                <div className="relative mb-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-sand/60 bg-white text-terracotta transition-all duration-500 group-hover:border-terracotta/50 group-hover:shadow-[0_12px_28px_-12px_rgba(161,98,44,0.4)]">
                    <Icon size={24} strokeWidth={1.4} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl lg:text-2xl font-medium text-navy mb-4 tracking-tight transition-colors duration-500 group-hover:text-terracotta">
                  {pillar.title}
                </h3>

                {/* Body */}
                <p className="text-navy/60 text-[0.95rem] lg:text-base leading-[1.8]">
                  {pillar.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
