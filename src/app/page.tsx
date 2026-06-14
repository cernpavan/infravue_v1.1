import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageMetadata } from "@/lib/seo";
import HeroCarousel from "@/components/hero/HeroCarousel";
import TrustBanner from "@/components/sections/TrustBanner";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ServiceIconsSection from "@/components/sections/ServiceIconsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";
import { faqPageSchema } from "@/lib/jsonld";

// Below-the-fold sections — dynamically imported so their JS (and Framer
// Motion footprint) is split out of the initial bundle. `ssr: true` keeps
// SEO/crawler content intact via streaming.
const BrandsMarquee = dynamic(() => import("@/components/sections/BrandsMarquee"));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"));
const HOME_TITLE = "Interior Designers in Hyderabad | Infravue Interiors";
const HOME_DESCRIPTION =
  "Infravue Interiors offers modern residential, commercial, and corporate interior design solutions in Hyderabad with customized designs, premium finishes, and turnkey execution. Get luxury, affordable, and customized interiors for your dream space.";

export const metadata: Metadata = pageMetadata({
  titleAbsolute: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS)} />
      {/* ── Hero Carousel ──────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── Trust Banner (Credibility Strip) ───────────────────────── */}
      <TrustBanner />

      {/* ── About Us Section ────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Services Section ───────────────────────────────────────── */}
      <ServicesSection />

      {/* ── End-to-End Solutions (Granular Icons) ───────────────────── */}
      <ServiceIconsSection />

      {/* ── Projects Showcase ───────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── Trusted Partners (Brand Marquee) ────────────────────────── */}
      <BrandsMarquee />

      {/* ── How It Works Section ────────────────────────────────────── */}
      <ProcessSection />

      {/* ── Testimonials Section ──────────────────────────────────────── */}
      <Testimonials />

      {/* ── Stats Strip ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <p className="text-center text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-10">
            Our Impact
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "8+ Yrs", label: "Experience" },
              { value: "4.9 ★", label: "Client Rating" },
              { value: "4 States", label: "Pan-India Presence" },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`text-center px-4 ${
                  i < 3 ? "md:border-r md:border-gray-200" : ""
                }`}
              >
                <p className="text-3xl lg:text-[2.75rem] font-bold text-[#1E3A6A] leading-none mb-2 tracking-tight">
                  {value}
                </p>
                <p className="text-[#1E3A6A]/45 text-xs lg:text-sm font-medium tracking-wide uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <CtaBanner />
    </>
  );
}
