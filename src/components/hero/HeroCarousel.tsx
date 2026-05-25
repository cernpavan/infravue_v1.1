"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookButton from "@/components/ui/BookButton";

const SLIDES = [
  {
    id: 1,
    image: "/images/hero/hero_image_1.webp",
    fallback: "/images/hero/hero_image_1.png",
    alt: "Luxury corporate office interior designed by Infravue Interiors, Hyderabad — turnkey workspace solution",
  },
  {
    id: 2,
    image: "/images/hero/hero_image_2.webp",
    fallback: "/images/hero/hero_image_2.png",
    alt: "Modern residential interior with premium finishes crafted by Infravue Interiors, Hyderabad",
  },
  {
    id: 3,
    image: "/images/hero/hero-3.webp",
    fallback: "/images/hero/hero-3.jpg",
    alt: "Contemporary commercial space interior design in Hyderabad by Infravue Interiors — refined and functional",
  },
  {
    id: 4,
    image: "/images/hero/hero_image_4.webp",
    fallback: "/images/hero/hero_image_4.png",
    alt: "Premium turnkey corporate workspace interior by Infravue Interiors — modern office design in Hyderabad",
  },
];

const AUTO_ROTATE_INTERVAL = 4000; // 8 seconds
const CUBIC_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Material Design easing
const CUBIC_EASE_OUT: [number, number, number, number] = [0.4, 0, 1, 1]; // Fast exit easing

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [imgError, setImgError] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [autoRotate]);

  // Pause auto-rotate on manual interaction, with proper cleanup
  const pauseAndResume = (newIndex?: number) => {
    setAutoRotate(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (newIndex !== undefined) setCurrent(newIndex);
    resumeTimer.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  const handleNext = () => {
    setImgError(false);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    pauseAndResume();
  };

  const handlePrev = () => {
    setImgError(false);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    pauseAndResume();
  };

  const handleDot = (index: number) => {
    setImgError(false);
    pauseAndResume(index);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden pt-24">
      {/* ── Image carousel with crossfade + Ken Burns ──
          `initial={false}` on AnimatePresence makes the FIRST slide paint
          immediately (no opacity fade-in), so the browser records LCP as
          soon as the bytes arrive — instead of waiting 1.4s for the
          framer-motion tween to complete. Subsequent slide changes keep
          the full crossfade + Ken Burns animation. */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{
            opacity: 1,
            scale: 1.0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: CUBIC_EASE },
            scale: { duration: 10, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={imgError ? SLIDES[current].fallback : SLIDES[current].image}
            alt={SLIDES[current].alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
            onError={() => setImgError(true)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Static Content Overlay ── */}
      <div className="relative h-full z-10 flex flex-col items-center justify-center px-6 lg:px-20 text-center">
        {/*
          max-w-5xl (1024 px) gives the headline enough horizontal room to
          sit in exactly 2 lines on desktop.  The sub-headline and CTAs are
          already self-constrained with their own max-width, so widening this
          wrapper has zero visual effect on them.
        */}
        <div className="w-full max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: CUBIC_EASE }}
            className="text-sand text-xs font-semibold tracking-[0.18em] uppercase mb-6"
          >
            Premium Interior Designers in Hyderabad
          </motion.p>

          {/* Headline — 2-line layout on md+ screens
              Line 1: "Transforming Corporate Spaces,"
              Line 2: "Commercial Environments & Homes"
              The <br> is hidden on mobile so it wraps naturally at small sizes.
          */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: CUBIC_EASE }}
            className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Transforming Corporate Spaces,
            <br className="hidden md:block" />
            {" "}Commercial Environments &amp; Homes
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: CUBIC_EASE }}
            className="text-white/85 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Modern interior design and turnkey solutions for corporate, commercial, and residential spaces.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: CUBIC_EASE }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <BookButton
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white font-semibold text-sm rounded-[4px] hover:bg-terracotta-dark transition-colors duration-200 cursor-pointer"
            >
              Book Free Consultation
              <ChevronRight size={16} />
            </BookButton>
            <Link
              href="/#projects"
              scroll={false}
              onClick={(e) => {
                // Hero is on the homepage — scroll smoothly in-page rather than
                // doing a hash navigation that re-runs route logic.
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.pushState(null, "", "#projects");
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold text-sm rounded-[4px] hover:border-white/70 hover:bg-white/5 transition-colors duration-200"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Navigation dots with layout animation + progress bar ── */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
        {SLIDES.map((_, index) => (
          <div key={index} className="relative">
            <motion.button
              layout
              onClick={() => handleDot(index)}
              aria-label={`Go to slide ${index + 1}`}
              animate={{
                width: current === index ? 32 : 10,
                backgroundColor:
                  current === index ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
              }}
              transition={{ duration: 0.35, ease: CUBIC_EASE }}
              className="h-2.5 rounded-full cursor-pointer transition-colors"
              whileHover={{
                backgroundColor:
                  current === index ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
              }}
              whileTap={{ scale: 0.92 }}
            />

            {/* Progress bar under active dot */}
            {current === index && (
              <motion.div
                key={`progress-${current}`}
                className="absolute -bottom-2 left-0 h-0.5 bg-terracotta rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: AUTO_ROTATE_INTERVAL / 1000,
                  ease: "linear",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Navigation arrows (desktop only) ── */}
      <div className="hidden lg:flex absolute left-8 right-8 top-1/2 transform -translate-y-1/2 justify-between z-20 pointer-events-none">
        <motion.button
          onClick={handlePrev}
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} className="rotate-180" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* ── Slide counter (desktop) ── */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-20 items-center gap-3 text-white text-sm font-medium">
        <span className="text-white/70">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
