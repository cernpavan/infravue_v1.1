import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import BrandStory from "@/components/about/BrandStory";
import DesignPhilosophy from "@/components/about/DesignPhilosophy";
import FounderSection from "@/components/about/FounderSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { SITE_NAME, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Discover the story behind Infravue Interiors — a Hyderabad-based studio led by founder A.N. Dinesh Chandra (IIT Kharagpur), crafting refined, functional interiors for homes, workplaces, and commercial spaces across India.",
  path: "/about",
  ogTitle: `About · ${SITE_NAME}`,
  ogDescription:
    "The vision, philosophy, and people behind Infravue Interiors — premium interior design rooted in Hyderabad, delivered PAN India.",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <AboutHero />
      <BrandStory />
      <DesignPhilosophy />
      <FounderSection />
      <CtaBanner />
    </>
  );
}
