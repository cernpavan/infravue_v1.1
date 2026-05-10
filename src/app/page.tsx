import type { Metadata } from "next";
import HeroCarousel from "@/components/hero/HeroCarousel";
import TrustBanner from "@/components/sections/TrustBanner";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ServiceIconsSection from "@/components/sections/ServiceIconsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BrandsMarquee from "@/components/sections/BrandsMarquee";
import ProcessSection from "@/components/sections/ProcessSection";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";
import { faqPageSchema } from "@/lib/jsonld";
import { DEFAULT_DESCRIPTION, SITE_NAME, TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — ${TAGLINE}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
  },
};

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
      <section className="bg-white py-20 lg:py-28 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <p className="text-center text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-16">
            Our Impact
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "8+ Yrs", label: "Experience" },
              { value: "4.9 ★", label: "Client Rating" },
              { value: "3 Cities", label: "Service Areas" },
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
