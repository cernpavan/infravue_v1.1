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
  { name: "Modular Kitchen", icon: "kitchen" },
  { name: "Storage and Wardrobe", icon: "wardrobe" },
  { name: "Crockery Unit", icon: "crockery" },
  { name: "Space Saving Furniture", icon: "space-saving" },
  { name: "TV Unit", icon: "tv" },
  { name: "Study Table", icon: "study" },
  { name: "False Ceiling", icon: "ceiling" },
  { name: "Lights", icon: "lights" },
  { name: "Wallpaper", icon: "wallpaper" },
  { name: "Paints", icon: "paints" },
  { name: "Bathroom", icon: "bathroom" },
  { name: "Pooja Unit", icon: "pooja" },
  { name: "Foyer", icon: "foyer" },
  { name: "Movable Furniture", icon: "movable" },
  { name: "Kids Bedroom", icon: "kids" },
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
    case "kitchen":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="10" y="10" width="44" height="44" rx="2" strokeWidth="2" />
          <line x1="10" y1="28" x2="54" y2="28" strokeWidth="2" />
          <line x1="32" y1="28" x2="32" y2="54" strokeWidth="2" />
          <circle cx="21" cy="41" r="2" fill={accent} stroke="none" />
          <circle cx="43" cy="41" r="2" fill={accent} stroke="none" />
          <path d="M18 18h8v2h-8z" fill="currentColor" stroke="none" />
          <path d="M38 18h8v2h-8z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "wardrobe":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="12" y="8" width="40" height="48" rx="2" strokeWidth="2" />
          <line x1="32" y1="8" x2="32" y2="56" strokeWidth="2" />
          <rect x="24" y="24" width="2" height="8" rx="1" fill={accent} stroke="none" />
          <rect x="38" y="24" width="2" height="8" rx="1" fill={accent} stroke="none" />
        </svg>
      );
    case "crockery":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="14" y="10" width="36" height="44" rx="2" strokeWidth="2" />
          <line x1="14" y1="24" x2="50" y2="24" strokeWidth="2" />
          <line x1="14" y1="38" x2="50" y2="38" strokeWidth="2" />
          <circle cx="25" cy="17" r="2" stroke={accent} strokeWidth="1.5" />
          <circle cx="39" cy="17" r="2" stroke={accent} strokeWidth="1.5" />
          <path d="M20 31h24M20 45h24" strokeWidth="1.5" />
        </svg>
      );
    case "space-saving":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M12 44h40v6H12z" strokeWidth="2" />
          <path d="M16 20h32v24H16z" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" stroke={accent} strokeWidth="2" />
          <path d="M10 50l4 4M54 50l-4 4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="8" y="14" width="48" height="28" rx="2" strokeWidth="2" />
          <rect x="22" y="20" width="20" height="12" rx="1" stroke={accent} strokeWidth="1.5" />
          <line x1="8" y1="48" x2="56" y2="48" strokeWidth="2" />
          <line x1="16" y1="42" x2="16" y2="54" strokeWidth="2" />
          <line x1="48" y1="42" x2="48" y2="54" strokeWidth="2" />
        </svg>
      );
    case "study":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M10 24h44v4H10z" fill="currentColor" stroke="none" />
          <path d="M14 28h36v20H14z" strokeWidth="2" />
          <line x1="18" y1="20" x2="30" y2="20" stroke={accent} strokeWidth="2" />
          <circle cx="32" cy="38" r="3" stroke={accent} strokeWidth="1.5" />
        </svg>
      );
    case "ceiling":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M10 16l22-8 22 8v8H10v-8z" strokeWidth="2" />
          <circle cx="32" cy="24" r="3" fill={accent} stroke="none" />
          <path d="M32 27v10" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="32" cy="40" r="2" stroke={accent} strokeWidth="1" />
        </svg>
      );
    case "lights":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M32 10v10" strokeWidth="2" />
          <path d="M18 36c0-7.7 6.3-14 14-14s14 6.3 14 14H18z" strokeWidth="2" />
          <circle cx="32" cy="42" r="3" fill={accent} stroke="none" />
        </svg>
      );
    case "wallpaper":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="14" y="10" width="36" height="44" rx="2" strokeWidth="2" />
          <path d="M20 18h4v4h-4zM30 18h4v4h-4zM40 18h4v4h-4z" fill={accent} stroke="none" />
          <path d="M20 28h4v4h-4zM30 28h4v4h-4zM40 28h4v4h-4z" fill="currentColor" fillOpacity="0.3" stroke="none" />
          <path d="M14 44h36" strokeWidth="2" />
        </svg>
      );
    case "paints":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="24" y="10" width="16" height="30" rx="2" strokeWidth="2" />
          <path d="M28 40v10a2 2 0 002 2h4a2 2 0 002-2V40" strokeWidth="2" />
          <path d="M24 20h16" stroke={accent} strokeWidth="4" />
        </svg>
      );
    case "bathroom":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M10 32c0 8.8 7.2 16 16 16h12c8.8 0 16-7.2 16-16H10z" strokeWidth="2" />
          <path d="M46 14v18M42 14h8" strokeWidth="2" />
          <circle cx="46" cy="18" r="2" fill={accent} stroke="none" />
        </svg>
      );
    case "pooja":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <rect x="16" y="16" width="32" height="40" rx="2" strokeWidth="2" />
          <path d="M16 16l16-10 16 10" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" stroke={accent} strokeWidth="2" />
          <path d="M32 28v-2" stroke={accent} strokeWidth="1.5" />
        </svg>
      );
    case "foyer":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M12 52h40" strokeWidth="2" />
          <rect x="18" y="16" width="28" height="36" strokeWidth="2" />
          <circle cx="40" cy="34" r="2" fill={accent} stroke="none" />
          <rect x="22" y="22" width="20" height="2" fill="currentColor" fillOpacity="0.2" stroke="none" />
        </svg>
      );
    case "movable":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M14 40h36v8H14z" strokeWidth="2" />
          <path d="M18 20c0-4 3-7 7-7h18a7 7 0 017 7v20H18V20z" strokeWidth="2" />
          <circle cx="28" cy="44" r="2" fill={accent} stroke="none" />
          <circle cx="40" cy="44" r="2" fill={accent} stroke="none" />
        </svg>
      );
    case "kids":
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" stroke="currentColor">
          <path d="M12 40h40v8H12z" strokeWidth="2" />
          <path d="M16 20h12v20H16zM36 24h12v16H36z" strokeWidth="2" />
          <circle cx="22" cy="28" r="2" fill={accent} stroke="none" />
          <circle cx="42" cy="30" r="2" fill={accent} stroke="none" />
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
    <section className="relative overflow-hidden bg-white py-12 lg:py-20">
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
