"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const STORAGE_KEY = "infravue_lead_just_submitted";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Push an event onto the GTM dataLayer. Module-scope to keep the window
 * mutation outside the component (satisfies eslint react-hooks/immutability).
 */
function pushDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: unknown[] };
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push(event);
}

const TRUST_ITEMS = [
  { Icon: Clock3, label: "Response within 24 hours" },
  { Icon: MapPin, label: "Serving Hyderabad & Pan-India" },
  { Icon: ShieldCheck, label: "Trusted by 100+ clients" },
] as const;

/**
 * Premium "Thank You" confirmation. Designed to be:
 *  - SEO-safe (page-level robots: noindex set in the server component)
 *  - GTM-friendly: emits a `lead_thank_you_view` event *only* when the visit
 *    originates from a real submission (sessionStorage handshake), so direct
 *    visits or shared links don't inflate conversion counts. The form already
 *    pushes the primary `generate_lead` event — this event is a redundant,
 *    page-scoped signal that ad-platform admins can use as an alternative
 *    trigger (e.g., Meta Pixel "Lead" event from the thank-you page).
 *  - Accessible: live region announces success, focus moves to the heading,
 *    all interactive elements are keyboard-reachable.
 */
export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firedRef = useRef(false);

  // ── Conversion event push (StrictMode-safe via firedRef) ─────────────────
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    if (typeof window === "undefined") return;

    let justSubmitted = false;
    try {
      justSubmitted = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (justSubmitted) sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // sessionStorage can throw in Safari private mode — treat as direct visit.
    }

    if (!justSubmitted) return;

    const source = searchParams?.get("source") ?? "consultation";

    pushDataLayer({
      event: "lead_thank_you_view",
      form_id: source,
      lead_source: source,
      conversion: true,
      // Provided so GTM admins can map this into Google Ads / Meta CAPI
      // conversion-value fields if desired. Default 1 = a single lead.
      value: 1,
      currency: "INR",
    });
  }, [searchParams]);

  // Move focus to the heading on mount so screen readers announce arrival.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: false });
  }, []);

  return (
    <main
      className="relative min-h-[100svh] overflow-hidden bg-[#FAFAF9] flex items-center"
      aria-labelledby="thank-you-title"
    >
      {/* ─── Premium ambient background ──────────────────────────────────── */}
      {/* Layered radial gradients (navy + sand) for a soft luxury feel,
          plus a faint dotted micro-grid for texture without weight. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(30,58,106,0.12),transparent_62%),radial-gradient(ellipse_55%_40%_at_50%_115%,rgba(161,98,44,0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(30,58,106,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_30%,transparent_75%)]"
      />

      {/* Subtle floating accent orbs (purely decorative) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#1E3A6A]/[0.06] blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#A1622C]/[0.06] blur-3xl"
      />

      {/* ─── Confirmation card ───────────────────────────────────────────── */}
      <section className="relative mx-auto w-full max-w-[640px] px-5 sm:px-6 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative rounded-[28px] bg-white/85 backdrop-blur-xl ring-1 ring-[#1E3A6A]/8 shadow-[0_30px_80px_-30px_rgba(30,58,106,0.22),0_8px_24px_-12px_rgba(30,58,106,0.10)] overflow-hidden"
        >
          {/* Sand accent top hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A1622C]/55 to-transparent"
          />

          <div className="px-6 sm:px-10 md:px-12 pt-11 sm:pt-12 md:pt-14 pb-10 sm:pb-11 md:pb-12 text-center">
            {/* ── Brand mark ── */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.34em] text-[#1E3A6A]/45"
            >
              Infravue Interiors
            </motion.p>

            {/* ── Success badge with halo + soft float ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: 0.2,
              }}
              className="relative mx-auto mt-7 sm:mt-8 flex h-[92px] w-[92px] sm:h-[104px] sm:w-[104px] items-center justify-center"
            >
              {/* Outer pulsing halo */}
              <motion.span
                aria-hidden
                initial={{ scale: 0.85, opacity: 0.5 }}
                animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#1E3A6A]/14"
              />
              <motion.span
                aria-hidden
                initial={{ scale: 0.9, opacity: 0.3 }}
                animate={{ scale: [0.9, 1.18, 0.9], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute inset-1.5 rounded-full bg-[#A1622C]/14"
              />

              {/* Floating solid badge */}
              <motion.div
                animate={{ y: [0, -3.5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex h-[76px] w-[76px] sm:h-[86px] sm:w-[86px] items-center justify-center rounded-full bg-gradient-to-b from-[#26467E] to-[#142852] ring-1 ring-white/15 shadow-[0_22px_55px_-14px_rgba(30,58,106,0.55),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-10px_18px_-10px_rgba(0,0,0,0.35)]"
              >
                {/* Animated check draw */}
                <motion.svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                  aria-hidden
                >
                  <motion.path
                    d="M4 12.5l5 5L20 6.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
                  />
                </motion.svg>

                {/* Decorative inner gloss */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-2.5 top-1.5 h-1/2 rounded-full bg-gradient-to-b from-white/20 to-transparent blur-[2px]"
                />
              </motion.div>
            </motion.div>

            {/* ── Eyebrow ── */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="mt-7 sm:mt-8 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.36em] text-[#A1622C]"
            >
              Consultation Confirmed
            </motion.p>

            {/* ── Headline ── */}
            <motion.h1
              ref={headingRef}
              tabIndex={-1}
              id="thank-you-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="mt-3 sm:mt-3.5 font-bold tracking-[-0.022em] leading-[1.02] text-[#1E3A6A] focus:outline-none"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 3.75rem)" }}
            >
              Thank <span className="italic font-light text-[#A1622C]">You</span>!
            </motion.h1>

            {/* Decorative hairline */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
              className="mx-auto mt-5 sm:mt-6 h-px w-16 origin-center bg-gradient-to-r from-transparent via-[#A1622C]/55 to-transparent"
            />

            {/* Screen-reader announcement */}
            <div role="status" aria-live="polite" className="sr-only">
              Your consultation request has been submitted successfully. Our team
              will get back to you within 24 hours.
            </div>

            {/* ── Body copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="mx-auto mt-6 sm:mt-7 max-w-[44ch] space-y-3"
            >
              <p className="text-[16.5px] sm:text-[18px] font-light leading-[1.55] text-[#1E3A6A]">
                Your consultation request has been submitted successfully.
              </p>
              <p className="text-[14.5px] sm:text-[15.5px] font-light leading-[1.6] text-[#1E3A6A]/65">
                Our team will get back to you within{" "}
                <span className="font-medium text-[#1E3A6A]/85">24 hours</span>. We&apos;re excited to help transform your space.
              </p>
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
            >
              <WhatsAppLink
                source="thank-you"
                message="Hi! I just submitted a consultation request on Infravue Interiors."
                ariaLabel="Continue the conversation on WhatsApp"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#26467E] to-[#152B52] px-7 py-[14px] text-[12.5px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_36px_-14px_rgba(30,58,106,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_22px_48px_-14px_rgba(30,58,106,0.75),inset_0_1px_0_rgba(255,255,255,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] transition-[transform,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E3A6A]/25 min-w-[200px]"
              >
                {/* Sheen highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
                />
                <MessageCircle size={15} strokeWidth={2} />
                <span>Continue on WhatsApp</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </WhatsAppLink>

              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#1E3A6A]/18 bg-white px-7 py-[14px] text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#1E3A6A]/80 shadow-[0_2px_6px_rgba(30,58,106,0.04)] hover:border-[#1E3A6A]/40 hover:text-[#1E3A6A] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(30,58,106,0.18)] active:translate-y-0 transition-[transform,border-color,color,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E3A6A]/15 min-w-[200px]"
              >
                <Home size={14} strokeWidth={2} />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>

          {/* ─── Trust strip footer ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
            className="relative border-t border-[#1E3A6A]/8 bg-gradient-to-b from-[#FAFAF9]/40 to-[#F5F2EC]/60 px-6 sm:px-10 md:px-12 py-5 sm:py-5"
          >
            <ul className="flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 text-center">
              {TRUST_ITEMS.map(({ Icon, label }, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 flex-1 justify-center min-w-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E3A6A]/[0.06] text-[#1E3A6A]/70 ring-1 ring-[#1E3A6A]/8">
                    <Icon size={13} strokeWidth={1.8} />
                  </span>
                  <span className="text-[11.5px] sm:text-[11.5px] font-semibold tracking-[0.02em] text-[#1E3A6A]/75 leading-tight">
                    {label}
                  </span>
                  {i < TRUST_ITEMS.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden sm:inline-block h-3 w-px bg-[#1E3A6A]/12 ml-2"
                    />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ─── Tiny reassurance line under the card ───────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
          className="mt-6 sm:mt-7 text-center text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#1E3A6A]/35"
        >
          <span className="inline-flex items-center gap-2">
            <Check size={11} strokeWidth={2.4} className="text-[#A1622C]" />
            Trusted by corporate &amp; residential clients across India
          </span>
        </motion.p>
      </section>
    </main>
  );
}
