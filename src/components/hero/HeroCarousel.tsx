"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

const AUTO_ROTATE_INTERVAL = 6000;

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
    <div className="relative w-full h-screen overflow-hidden pt-24 bg-navy">
      {/* ── Slide 0 (Always in DOM to ensure zero LCP delay) ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
          current === 0 ? "opacity-100 z-0" : "opacity-0 z-[-1] pointer-events-none"
        }`}
      >
        <Image
          src={imgError && current === 0 ? SLIDES[0].fallback : SLIDES[0].image}
          alt={SLIDES[0].alt}
          fill
          sizes="100vw"
          className={`object-cover transition-transform duration-[10000ms] ease-out ${
            current === 0 ? "scale-100" : "scale-106"
          }`}
          priority
          fetchPriority="high"
          quality={75}
          onError={() => setImgError(true)}
        />
      </div>

      {/* ── Subsequent slides (mounted/transitioned on demand) ── */}
      {current !== 0 && (
        <div
          key={current}
          className="absolute inset-0 animate-fade-in"
        >
          <Image
            src={imgError ? SLIDES[current].fallback : SLIDES[current].image}
            alt={SLIDES[current].alt}
            fill
            sizes="100vw"
            className="object-cover animate-ken-burns"
            quality={75}
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ── Static Content Overlay ── */}
      <div className="relative h-full z-10 flex flex-col items-center justify-center px-6 lg:px-20 text-center">
        {/*
          max-w-5xl (1024 px) gives the headline enough horizontal room to
          sit in exactly 2 lines on desktop. The sub-headline and CTAs are
          already self-constrained with their own max-width, so widening this
          wrapper has zero visual effect on them.
        */}
        <div className="w-full max-w-5xl">
          {/* Eyebrow */}
          <p className="text-sand text-xs font-semibold tracking-[0.18em] uppercase mb-6 animate-fade-in-up">
            Premium Interior Designers in Hyderabad
          </p>

          {/* Headline — 2-line layout on md+ screens */}
          <h1 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-white leading-[1.1] tracking-tight mb-6 animate-[fade-in-up_0.8s_ease-out_0.1s_both]">
            Transforming Corporate Spaces,
            <br className="hidden md:block" />
            {" "}Commercial Environments &amp; Homes
          </h1>

          {/* Subheadline */}
          <p className="text-white/85 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
            Modern interior design and turnkey solutions for corporate, commercial, and residential spaces.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-[fade-in-up_0.8s_ease-out_0.3s_both]">
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
          </div>
        </div>
      </div>

      {/* ── Navigation dots with progress bar ── */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
        {SLIDES.map((_, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleDot(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-350 ease-out active:scale-95 hover:bg-white/70 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40"
              }`}
            />

            {/* Progress bar under active dot */}
            {current === index && (
              <div
                key={`progress-${current}`}
                className="absolute -bottom-2 left-0 h-0.5 bg-terracotta rounded-full animate-progress"
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Navigation arrows (desktop only) ── */}
      <div className="hidden lg:flex absolute left-8 right-8 top-1/2 transform -translate-y-1/2 justify-between z-20 pointer-events-none">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm cursor-pointer active:scale-95"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm cursor-pointer active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
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
