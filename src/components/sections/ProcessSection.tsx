"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  UserPlus,
  Presentation,
  FileCheck,
  Wrench,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import BookButton from "@/components/ui/BookButton";

// Cinematic settle — slower than easeOut, no snap. Premium-UI signature.
const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    icon: UserPlus,
    title: "Project Signup",
    description: "Start your journey by signing up and sharing your vision with us.",
  },
  {
    number: "02",
    icon: Presentation,
    title: "Design Presentation",
    description: "We present tailored concepts and 3D visualizations for your space.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Design Sign-Off",
    description: "Finalize layouts and materials to move into the execution phase.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Final Installation",
    description: "Our experts handle everything with precision and high-quality finishes.",
  },
  {
    number: "05",
    icon: PackageCheck,
    title: "Handover",
    description: "Your dream space is ready! We handover a perfectly crafted home.",
  },
];

// Per-step desync so idle motion never reads as synchronized.
const FLOAT_DURATIONS = [4.2, 3.8, 4.4, 3.6, 4.0];
const FLOAT_DELAYS = [0, 0.6, 0.3, 0.9, 0.45];

// ─── Variants ───────────────────────────────────────────────────────────────

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Each step lifts in, then cascades its inner content (circle → title → text).
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: CINEMATIC_EASE,
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const innerVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: CINEMATIC_EASE },
  },
};

// ─── Step ───────────────────────────────────────────────────────────────────

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = step.icon;

  const floatY = reduceMotion
    ? undefined
    : {
        y: [0, -3, 0, -1.5, 0],
        transition: {
          duration: FLOAT_DURATIONS[index % FLOAT_DURATIONS.length],
          delay: FLOAT_DELAYS[index % FLOAT_DELAYS.length],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <motion.div
      variants={stepVariants}
      className="group relative flex flex-col items-center text-center"
    >
      {/* ── Circle stack ── */}
      <motion.div variants={innerVariants} className="relative mb-8">
        {/* Diffused warm halo — invisible at rest, blooms on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-full bg-terracotta/15 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Idle ambient ring — gentle breathing scale + opacity, desynced per step */}
        <motion.span
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [0.96, 1.06, 0.96],
                  opacity: [0.4, 0.7, 0.4],
                }
          }
          transition={{
            duration: 4 + (index % 3) * 0.6,
            delay: FLOAT_DELAYS[index % FLOAT_DELAYS.length],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -inset-3 rounded-full border border-sand/45"
        />

        {/* Hover ring — appears on top of the idle ring with terracotta accent */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-full border border-terracotta/35 scale-90 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
        />

        {/* Main circle — soft elevation on hover */}
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -4 }}
          transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
          className="relative z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full border border-sand/40 bg-white shadow-[0_10px_30px_-10px_rgba(30,58,106,0.18)] transition-[border-color,box-shadow] duration-500 group-hover:border-terracotta/50 group-hover:shadow-[0_24px_50px_-18px_rgba(161,98,44,0.35)]"
        >
          {/* Icon — continuous gentle float + micro tilt on hover */}
          <motion.div
            animate={floatY}
            whileHover={
              reduceMotion
                ? undefined
                : { rotate: [0, -6, 6, 0], scale: 1.1 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-terracotta"
          >
            <Icon size={36} strokeWidth={1.3} />
          </motion.div>

          {/* Step Number Badge — pulse ring on idle */}
          <div className="absolute -top-1.5 -right-1.5 z-20">
            <motion.span
              aria-hidden
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.65, 1],
                      opacity: [0.45, 0, 0.45],
                    }
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.5,
              }}
              className="absolute inset-0 rounded-full bg-navy/35"
            />
            <motion.span
              whileHover={reduceMotion ? undefined : { scale: 1.15 }}
              transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-navy text-[10px] font-bold text-white shadow-sm"
            >
              {step.number}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Title ── */}
      <motion.h3
        variants={innerVariants}
        className="mb-3 px-4 text-lg font-bold text-navy transition-colors duration-500 group-hover:text-terracotta"
      >
        {step.title}
      </motion.h3>

      {/* ── Description ── */}
      <motion.p
        variants={innerVariants}
        className="mx-auto max-w-[200px] px-4 text-sm leading-relaxed text-navy/50"
      >
        {step.description}
      </motion.p>

      {/* ── Mobile connector ── animates in with the step's stagger */}
      {!isLast && (
        <motion.div
          variants={innerVariants}
          aria-hidden
          className="mt-8 h-12 w-[2px] origin-top bg-gradient-to-b from-sand/60 via-sand/30 to-transparent lg:hidden"
        />
      )}
    </motion.div>
  );
}

// ─── Ambient backdrop ──────────────────────────────────────────────────────

function AmbientBackdrop() {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }
        }
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-12 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(161,98,44,0.07),transparent)] blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.05, 1, 1.05], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-16 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(216,196,173,0.18),transparent)] blur-3xl"
      />
    </>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-driven journey line. As the user scrolls through the steps, the
  // terracotta progress fills left → right across the desktop track.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-24">
      <AmbientBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: CINEMATIC_EASE }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.28em] text-terracotta">
            Our Journey
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-navy/55 md:text-base">
            A guided five-step path — from first conversation to final handover — designed to feel effortless.
          </p>
        </motion.div>

        {/* ── Process Container ── */}
        <div ref={trackRef} className="relative">
          {/* Desktop journey line */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[50px] z-0 hidden lg:block">
            {/* Static track — gentle dotted spine */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 [background:repeating-linear-gradient(to_right,rgba(30,58,106,0.18)_0_6px,transparent_6px_14px)]"
            />
            {/* Animated terracotta fill */}
            <motion.div
              aria-hidden
              style={{ scaleX: reduceMotion ? 1 : lineScaleX }}
              className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 bg-gradient-to-r from-terracotta-light via-terracotta to-terracotta-light"
            />
            {/* Soft glow trailing the fill */}
            <motion.div
              aria-hidden
              style={{ scaleX: reduceMotion ? 1 : lineScaleX }}
              className="absolute inset-x-0 top-1/2 h-[10px] origin-left -translate-y-1/2 bg-gradient-to-r from-terracotta/0 via-terracotta/55 to-terracotta/0 blur-md"
            />
          </div>

          {/* ── Steps Grid ── parent owns step-level stagger; each step
              owns its own inner stagger for circle → title → description. */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-4"
          >
            {STEPS.map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: CINEMATIC_EASE, delay: 0.15 }}
          className="mt-14 text-center"
        >
          <BookButton className="inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-5 font-bold text-white shadow-xl shadow-terracotta/20 transition-all duration-300 hover:-translate-y-1 hover:bg-terracotta-dark hover:shadow-terracotta/30 active:scale-95">
            Book Free Consultation
          </BookButton>
        </motion.div>
      </div>
    </section>
  );
}
