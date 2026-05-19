"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";

const SERVICES = [
  { name: "Civil Works", icon: "civil" },
  { name: "Painting", icon: "painting" },
  { name: "Ceiling Solutions", icon: "ceiling" },
  { name: "Flooring", icon: "flooring" },
  { name: "Partitions", icon: "partitions" },
  { name: "Modular Furniture", icon: "modular" },
  { name: "Electrical & HVAC", icon: "electrical" },
  { name: "Glass & Glazing", icon: "glass" },
  { name: "Interior Design", icon: "design" },
  { name: "3D Visualization", icon: "viz" },
  { name: "MEP Services", icon: "mep" },
  { name: "Turnkey Execution", icon: "turnkey" },
  { name: "Restaurant Interiors", icon: "restaurant" },
  { name: "Bar & Lounge Fit-Outs", icon: "bar" },
  { name: "Home Interiors", icon: "home" },
];

// Cinematic easing — a slower, more "settling" curve than the default.
// This is the signature of premium UI motion (closer to easeOutExpo).
const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

// Spring physics for cursor-driven tilt. Soft, slightly under-damped — the
// card glides toward the cursor rather than snapping.
const TILT_SPRING = { stiffness: 130, damping: 18, mass: 0.5 };

// Prime-ish per-card timings so the grid breathes asynchronously, never in
// lockstep. Avoids the "UI library" feel of synchronized loops.
const FLOAT_DURATIONS = [3.6, 4.2, 3.9, 4.5, 3.3, 4.1, 3.7];
const FLOAT_DELAYS = [0, 0.4, 0.7, 1.1, 0.2, 0.9, 0.5, 0.3, 0.8, 1.0, 0.15, 0.55, 0.95, 0.35, 0.65];

function renderIcon(type: string) {
  // Strokes/fills use currentColor so the wrapper's text-color transition
  // cascades through the whole icon. Accent marks stay terracotta for rhythm.
  const accent = "#A1622C";

  switch (type) {
    case "civil":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="10" y="14" width="44" height="36" rx="1" strokeWidth="2" />
          <line x1="10" y1="26" x2="54" y2="26" strokeWidth="1.5" />
          <line x1="10" y1="38" x2="54" y2="38" strokeWidth="1.5" />
          <line x1="22" y1="14" x2="22" y2="26" strokeWidth="1.5" />
          <line x1="42" y1="14" x2="42" y2="26" strokeWidth="1.5" />
          <line x1="16" y1="26" x2="16" y2="38" strokeWidth="1.5" />
          <line x1="32" y1="26" x2="32" y2="38" strokeWidth="1.5" />
          <line x1="48" y1="26" x2="48" y2="38" strokeWidth="1.5" />
          <line x1="22" y1="38" x2="22" y2="50" strokeWidth="1.5" />
          <line x1="42" y1="38" x2="42" y2="50" strokeWidth="1.5" />
          <rect x="26" y="29" width="4" height="6" fill={accent} stroke="none" />
        </svg>
      );
    case "painting":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="16" y="12" width="32" height="10" rx="2" strokeWidth="2" />
          <line x1="20" y1="17" x2="44" y2="17" stroke={accent} strokeWidth="2" />
          <path d="M32 22v6" strokeWidth="2" />
          <path d="M24 28h16" strokeWidth="2" />
          <path d="M32 28v22" strokeWidth="2" />
          <rect x="28" y="50" width="8" height="6" rx="1" strokeWidth="2" />
        </svg>
      );
    case "ceiling":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M8 14h48" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 14v6h48v-6" strokeWidth="2" strokeLinejoin="round" />
          <line x1="32" y1="20" x2="32" y2="34" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M22 34h20l-3 12H25z" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="32" cy="44" r="2" fill={accent} stroke="none" />
        </svg>
      );
    case "flooring":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="10" y="14" width="44" height="36" strokeWidth="2" />
          <line x1="10" y1="26" x2="54" y2="26" strokeWidth="1.5" />
          <line x1="10" y1="38" x2="54" y2="38" strokeWidth="1.5" />
          <line x1="25" y1="14" x2="25" y2="50" strokeWidth="1.5" />
          <line x1="39" y1="14" x2="39" y2="50" strokeWidth="1.5" />
          <rect x="25" y="26" width="14" height="12" fill={accent} fillOpacity="0.25" stroke="none" />
        </svg>
      );
    case "partitions":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="10" y="14" width="14" height="36" strokeWidth="2" />
          <rect x="26" y="14" width="14" height="36" strokeWidth="2" />
          <rect x="42" y="14" width="14" height="36" strokeWidth="2" />
          <circle cx="17" cy="32" r="1.5" fill={accent} stroke="none" />
          <circle cx="33" cy="32" r="1.5" fill={accent} stroke="none" />
          <circle cx="49" cy="32" r="1.5" fill={accent} stroke="none" />
          <line x1="6" y1="52" x2="58" y2="52" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "modular":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M8 30h12v18H8z" strokeWidth="2" />
          <path d="M22 30h20v18H22z" strokeWidth="2" />
          <path d="M44 30h12v18H44z" strokeWidth="2" />
          <path d="M6 48h52v6H6z" strokeWidth="2" />
          <rect x="12" y="34" width="4" height="10" rx="1" fill={accent} fillOpacity="0.6" stroke="none" />
          <rect x="48" y="34" width="4" height="10" rx="1" fill={accent} fillOpacity="0.6" stroke="none" />
        </svg>
      );
    case "electrical":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M22 8 L10 32 L20 32 L14 56 L34 30 L24 30 L28 8 Z" strokeWidth="2" strokeLinejoin="round" />
          <path d="M40 18h16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M42 28h14" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M40 38h16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M42 48h14" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "glass":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="14" y="10" width="36" height="44" rx="2" strokeWidth="2" />
          <line x1="32" y1="10" x2="32" y2="54" strokeWidth="1.5" />
          <line x1="14" y1="32" x2="50" y2="32" strokeWidth="1.5" />
          <path d="M18 14l4 8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M36 36l4 8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="10" y="10" width="44" height="44" rx="2" strokeWidth="2" />
          <line x1="10" y1="22" x2="54" y2="22" strokeWidth="1.5" />
          <line x1="22" y1="22" x2="22" y2="54" strokeWidth="1.5" />
          <rect x="28" y="28" width="18" height="12" stroke={accent} strokeWidth="1.5" />
          <circle cx="44" cy="46" r="2" fill={accent} stroke="none" />
        </svg>
      );
    case "viz":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M32 8l20 12-20 12-20-12z" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 20v22l20 12v-22" strokeWidth="2" strokeLinejoin="round" />
          <path d="M52 20v22l-20 12" strokeWidth="2" strokeLinejoin="round" />
          <line x1="32" y1="32" x2="32" y2="54" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="32" cy="20" r="2.5" fill={accent} stroke="none" />
        </svg>
      );
    case "mep":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="4" y="32" width="22" height="10" strokeWidth="2" />
          <rect x="38" y="32" width="22" height="10" strokeWidth="2" />
          <rect x="26" y="28" width="12" height="18" strokeWidth="2" />
          <line x1="32" y1="28" x2="32" y2="18" strokeWidth="2" />
          <circle cx="32" cy="14" r="4" stroke={accent} strokeWidth="2" />
          <line x1="28" y1="14" x2="36" y2="14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="10" x2="32" y2="18" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "turnkey":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <circle cx="20" cy="32" r="10" strokeWidth="2" />
          <circle cx="20" cy="32" r="3" stroke={accent} strokeWidth="1.5" />
          <path d="M30 32h22" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 32v6" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 32v8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "restaurant":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <line x1="18" y1="8" x2="18" y2="22" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="8" x2="22" y2="22" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="8" x2="26" y2="22" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 22h12v4a4 4 0 01-4 4h-4a4 4 0 01-4-4z" strokeWidth="2" strokeLinejoin="round" />
          <line x1="22" y1="30" x2="22" y2="56" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 8c-3 0-5 4-5 12s2 12 5 12" strokeWidth="2" strokeLinejoin="round" />
          <line x1="44" y1="8" x2="44" y2="56" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="48" r="1.5" fill={accent} stroke="none" />
          <circle cx="44" cy="48" r="1.5" fill={accent} stroke="none" />
        </svg>
      );
    case "bar":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M14 12h36L32 36z" strokeWidth="2" strokeLinejoin="round" />
          <line x1="32" y1="36" x2="32" y2="52" strokeWidth="2" />
          <line x1="22" y1="52" x2="42" y2="52" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="14" x2="40" y2="22" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="22" r="2.5" fill={accent} stroke="none" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M10 30L32 12l22 18v22H10z" strokeWidth="2" strokeLinejoin="round" />
          <rect x="26" y="36" width="12" height="16" strokeWidth="2" />
          <rect x="14" y="34" width="8" height="6" stroke={accent} strokeWidth="1.5" />
          <rect x="42" y="34" width="8" height="6" stroke={accent} strokeWidth="1.5" />
          <circle cx="34" cy="44" r="1.2" fill={accent} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function ServiceCard({
  name,
  icon,
  index,
}: {
  name: string;
  icon: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Raw normalized cursor position (-0.5 .. 0.5). Springs smooth it for inertia.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, TILT_SPRING);
  const sy = useSpring(py, TILT_SPRING);

  // 3D tilt — rotateY follows X, rotateX inverts Y so the surface "tracks" cursor.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  // Counter-parallax for the icon — shifts opposite to tilt for true depth feel.
  const iconX = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const iconY = useTransform(sy, [-0.5, 0.5], [-7, 7]);
  const iconTilt = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  // Cursor-following warm bloom.
  const lightX = useTransform(sx, [-0.5, 0.5], ["18%", "82%"]);
  const lightY = useTransform(sy, [-0.5, 0.5], ["18%", "82%"]);
  const lightBg = useMotionTemplate`radial-gradient(240px circle at ${lightX} ${lightY}, rgba(161,98,44,0.18), transparent 65%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    // Skip tilt for touch/pen — fingers obscure the surface and the motion
    // feels jittery without a true cursor anchor.
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  // Organic float — combined Y drift + sub-degree wobble. Per-card desync
  // via prime-ish duration/delay tables avoids any synchronized look.
  const floatY = reduceMotion
    ? undefined
    : {
        y: [0, -5, 0, -3, 0],
        transition: {
          duration: FLOAT_DURATIONS[index % FLOAT_DURATIONS.length],
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: FLOAT_DELAYS[index % FLOAT_DELAYS.length],
        },
      };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: index * 0.06, ease: CINEMATIC_EASE }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className="group relative flex h-full flex-col items-center justify-center rounded-2xl border border-sand/30 bg-white/80 p-6 backdrop-blur-[2px] transition-[border-color,box-shadow] duration-700 ease-out hover:border-terracotta/40 hover:shadow-[0_30px_60px_-25px_rgba(161,98,44,0.32),0_10px_30px_-18px_rgba(30,58,106,0.15)] motion-reduce:transition-none"
    >
      {/* Cursor-tracking warm bloom (FlowInterio-style spotlight) */}
      <motion.div
        aria-hidden
        style={{ background: lightBg }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
      />

      {/* Static accent wash that fades in beneath the bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-terracotta/[0.04] via-transparent to-sand/[0.10] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
      />

      {/* Top-edge highlight — catches the eye as the card tilts forward */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Icon stack: cursor parallax → continuous float → color shift → SVG.
          Translated forward in Z so it visibly floats above the card surface. */}
      <motion.div
        style={{
          x: reduceMotion ? 0 : iconX,
          y: reduceMotion ? 0 : iconY,
          rotate: reduceMotion ? 0 : iconTilt,
          z: 30,
        }}
        className="relative mb-4"
      >
        {/* Diffused halo — terracotta ambient glow that blooms on hover */}
        <motion.span
          aria-hidden
          initial={false}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{
            duration: 5 + (index % 3) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* Continuous organic float */}
        <motion.div animate={floatY} className="relative">
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
            className="text-navy transition-colors duration-700 ease-out group-hover:text-terracotta"
          >
            {renderIcon(icon)}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.p
        style={{ z: 20 }}
        className="relative text-center text-xs font-bold uppercase leading-tight tracking-wider text-navy transition-colors duration-500 ease-out group-hover:text-terracotta"
      >
        {name}
      </motion.p>
    </motion.div>
  );
}

function AmbientBackdrop() {
  const reduceMotion = useReducedMotion();
  return (
    <>
      {/* Soft warm ambient — never opaque, never moving fast. Just breathes. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(161,98,44,0.07),transparent)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(216,196,173,0.18),transparent)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1.05, 1, 1.05], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export default function ServiceIconsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-12">
      <AmbientBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
          className="mb-10 text-center"
        >
          <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.28em] text-terracotta">
            End-to-End Solutions
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-navy lg:text-4xl">
            Our Interior Design Services
          </h2>
        </motion.div>

        {/* ── Icons Grid ── perspective on the parent so all card 3D tilts share the same vanishing point. */}
        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5"
          style={{ perspective: 1200 }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
