"use client";

import { motion, useReducedMotion } from "framer-motion";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] pt-28 pb-12 lg:pt-32 lg:pb-16">
      {/* ── Ambient backdrop ── */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.05, 1], opacity: [0.55, 0.85, 0.55] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(161,98,44,0.08),transparent)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.05, 1, 1.05], opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(216,196,173,0.22),transparent)] blur-3xl"
      />

      {/* ── Subtle grid pattern ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#1E3A6A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A6A_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* ── Left: Eyebrow + Headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <span aria-hidden className="h-px w-12 bg-terracotta/60" />
              <p className="text-terracotta text-[12px] font-bold tracking-[0.32em] uppercase">
                About Infravue
              </p>
            </div>

            <h1 className="font-heading text-[2.5rem] sm:text-5xl lg:text-[5.25rem] leading-[1.05] tracking-[-0.02em] text-navy font-light">
              Spaces designed with{" "}
              <span className="italic font-normal text-terracotta">
                intention,
              </span>
              <br className="hidden sm:block" />
              built to{" "}
              <span className="italic font-normal text-terracotta">
                endure.
              </span>
            </h1>
          </motion.div>

          {/* ── Right: Intro paragraph ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.2 }}
            className="lg:col-span-4 mt-8 lg:mt-4 lg:pt-4"
          >
            <p className="text-navy/65 text-base lg:text-lg leading-[1.85] max-w-md">
              A Hyderabad-rooted interior design studio crafting refined and
              functional environments for workplaces, commercial spaces, and
              homes, delivered across India.
            </p>
            <div className="mt-6 flex items-center gap-6 text-[11px] tracking-[0.28em] uppercase text-navy/50 font-semibold">
              <span>Est. Hyderabad</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-terracotta/70" />
              <span>PAN India</span>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll cue ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 lg:mt-16 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-navy/40 font-semibold">
            <span aria-hidden className="h-px w-8 bg-navy/30" />
            Our Story
          </div>
          <motion.div
            aria-hidden
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block text-navy/30 text-xs font-medium tracking-widest"
          >
            ↓ scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
