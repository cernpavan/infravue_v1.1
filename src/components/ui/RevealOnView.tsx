"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnViewProps {
  children?: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  rootMargin?: string;
}

// Lightweight scroll-reveal: a single IntersectionObserver per element toggles
// a `data-reveal` attribute. Reuse this instead of Framer Motion `whileInView`
// for simple fade-up reveals — saves ~80 KB gzipped off any route that no
// longer needs framer-motion.
export default function RevealOnView({
  children,
  className = "",
  delayMs = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] data-[reveal=hidden]:opacity-0 data-[reveal=hidden]:translate-y-4 data-[reveal=visible]:opacity-100 data-[reveal=visible]:translate-y-0 ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
