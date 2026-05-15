"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, GraduationCap, Award } from "lucide-react";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export default function FounderSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-white py-12 lg:py-20 overflow-hidden">
      {/* Ambient backdrop tints */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(216,196,173,0.22),transparent)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.05, 1, 1.05], opacity: [0.35, 0.6, 0.35] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(161,98,44,0.07),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-terracotta/60 to-transparent" />
          <p className="text-terracotta text-[11px] font-bold tracking-[0.32em] uppercase mb-5">
            About the Founder
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.015em] text-navy font-light">
            The vision behind{" "}
            <span className="text-terracotta italic font-normal">Infravue.</span>
          </h2>
        </motion.div>

        {/* ── Founder Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left: Portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: CINEMATIC_EASE }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative back-card */}
              <div
                aria-hidden
                className="absolute -inset-5 rounded-[28px] bg-gradient-to-br from-sand/45 via-sand/20 to-transparent -z-10 transform rotate-[-1.5deg]"
              />

              {/*
                Founder portrait area.
                REPLACE: drop a real portrait at /public/images/team/founder.jpg
                and swap this block for a <next/image> Image component.
              */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] shadow-[0_30px_70px_-30px_rgba(30,58,106,0.4)] bg-sand/10">
                <Image
                  src="/images/team/founder.png"
                  alt="A.N. Dinesh Chandra - Founder & CEO of Infravue"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
                
                {/* Subtle overlay for depth */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-60"
                />

                {/* Corner mark */}
                <div className="absolute top-5 left-5 flex items-center gap-2 text-white/80 text-[10px] tracking-[0.28em] uppercase font-semibold drop-shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  Infravue
                </div>
              </div>

              {/* Identity card — overlapping the portrait */}
              <div className="relative mt-[-44px] mx-4 lg:mx-6 bg-white rounded-2xl border border-sand/40 px-7 py-6 shadow-[0_20px_50px_-20px_rgba(30,58,106,0.3)]">
                <p className="font-heading text-[1.4rem] lg:text-[1.55rem] leading-tight text-navy font-medium tracking-tight">
                  A.N. Dinesh Chandra
                </p>
                <div className="mt-1 flex items-center gap-2.5">
                  <span className="h-px w-5 bg-terracotta" />
                  <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-terracotta">
                    Founder &amp; CEO
                  </p>
                </div>

                {/* Credential chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 text-[10.5px] font-semibold tracking-wide text-navy/80">
                    <GraduationCap size={12} className="text-terracotta" strokeWidth={2} />
                    IIT Kharagpur
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/[0.04] px-3 py-1.5 text-[10.5px] font-semibold tracking-wide text-navy/80">
                    <Award size={12} className="text-terracotta" strokeWidth={2} />
                    Design &amp; Execution
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Story ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: CINEMATIC_EASE, delay: 0.15 }}
            className="lg:col-span-7 lg:pt-2"
          >
            {/* Pull quote */}
            <div className="relative mb-12">
              <Quote
                aria-hidden
                size={44}
                strokeWidth={1.3}
                className="text-terracotta/35 mb-4"
              />
              <p className="font-heading text-2xl md:text-[1.65rem] lg:text-[1.85rem] leading-[1.4] tracking-tight text-navy font-light italic max-w-2xl">
                &ldquo;Good interiors should not only look refined, but improve
                the way people experience a space.&rdquo;
              </p>
            </div>

            {/* Body */}
            <div className="space-y-6 text-navy/70 text-[1.0625rem] lg:text-lg leading-[1.85] max-w-2xl">
              <p>
                For Dinesh Chandra, Infravue Interiors began with a simple
                vision — to create spaces that feel thoughtful, functional,
                and timeless.
              </p>
              <p>
                With a background from{" "}
                <span className="text-navy font-semibold">IIT Kharagpur</span>{" "}
                and a strong passion for design and execution, he started
                building the company with a focus on quality, creativity, and
                attention to detail rather than simply following trends.
              </p>
              <p>
                Over time, that vision has continued to shape the way Infravue
                approaches every project — from corporate spaces and commercial
                environments to modern homes.
              </p>
              <p>
                With a practical mindset and a strong eye for design, he
                continues to lead the company toward creating interiors that
                are{" "}
                <span className="text-terracotta font-medium">
                  elegant, purposeful, and built to last.
                </span>
              </p>
            </div>

            {/* Signature row */}
            <div className="mt-12 flex items-center gap-5">
              <span aria-hidden className="h-px flex-1 max-w-[80px] bg-navy/15" />
              <div>
                <p className="font-heading text-lg text-navy font-medium tracking-tight italic">
                  Dinesh Chandra
                </p>
                <p className="text-[10px] tracking-[0.28em] uppercase text-navy/45 font-semibold mt-0.5">
                  Founder, Infravue Interiors
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
