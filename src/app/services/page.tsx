import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Building2, Palette, Layout, CheckCircle2 } from "lucide-react";
import { SITE_NAME, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, servicesItemList } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design Services",
  description:
    "Premium residential, commercial, hospitality, and turnkey interior design services by Infravue Interiors, from concept to execution across Hyderabad and pan-India. Modular kitchens, office interiors, brewery & lounge fit-outs.",
  path: "/services",
  ogTitle: `Interior Design Services · ${SITE_NAME}`,
  ogDescription:
    "Residential, commercial, hospitality & turnkey interior design with premium finishes, end-to-end execution, and pan-India delivery.",
});

const SERVICES = [
  {
    id: "residential",
    icon: Home,
    tag: "For Homes",
    title: "Residential Interiors",
    alt: "Luxury residential living room with marble TV wall and warm walnut joinery by Infravue Interiors, Hyderabad — full-home turnkey execution with modular kitchens, bedrooms, and living spaces",
    description:
      "Complete home interior solutions tailored to your lifestyle, from a single room to full-home turnkey execution. Every space designed around how you actually live.",
    image: "/images/services/commercial.jpeg",
    items: [
      "2BHK / 3BHK / 4BHK Homes",
      "Villa & Bungalow Interiors",
      "Living Room & Dining Room",
      "Master & Kids Bedrooms",
      "Modular Kitchen Design",
      "Custom Storage & Wardrobes",
    ],
  },
  {
    id: "commercial",
    icon: Building2,
    tag: "For Businesses",
    title: "Commercial Interiors",
    alt: "Modern corporate office breakout lounge with engineered ceiling by Infravue Interiors, Hyderabad — co-working spaces, retail fit-outs, and F&B restaurant interiors",
    description:
      "Professional environments designed for productivity, brand identity, and lasting impressions. From startup offices to large corporate headquarters.",
    image: "/images/projects/first-source/first-source-01.jpg",
    items: [
      "Corporate Office Fit-Outs",
      "Tech & Co-working Spaces",
      "Retail & Showroom Design",
      "F&B & Restaurant Interiors",
      "Clinic & Healthcare Spaces",
      "PEB & Industrial Interiors",
    ],
  },
  {
    id: "hospitality",
    icon: Palette,
    tag: "Hospitality & Luxury",
    title: "Finishing & Decor",
    alt: "Premium interior finishing and luxury decor services by Infravue Interiors — custom wallpaper, art curation, bespoke furniture sourcing, and lighting design in Hyderabad",
    description:
      "High-end finishing touches and custom décor that elevate any space to a truly refined experience. Every material and detail chosen with intention.",
    image: "/images/services/finishing.png",
    items: [
      "Premium Finishing & Cladding",
      "Custom Wallpaper & Murals",
      "Art Curation & Styling",
      "Color & Material Consultation",
      "Bespoke Furniture Sourcing",
      "Lighting Design & Specification",
    ],
  },
  {
    id: "design",
    icon: Layout,
    tag: "Design & Planning",
    title: "Design & Planning Services",
    alt: "End-to-end interior design planning services by Infravue Interiors, Hyderabad — 2D floor plans, 3D renders, electrical layouts, and complete project management",
    description:
      "Expert solutions covering the full design process, from initial space planning and detailed drawings through to flawless on-site execution.",
    image: "/images/services/design.jpeg",
    items: [
      "Furniture & Space Planning",
      "2D Floor Plans & 3D Renders",
      "Electrical & Lighting Plans",
      "Structural & Civil Detailing",
      "Flooring & Ceiling Design",
      "Project Management",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* ── JSON-LD: Breadcrumb + Service ItemList ── */}
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          servicesItemList(
            SERVICES.map((s) => ({
              name: s.title,
              description: s.description,
              slug: s.id,
            })),
          ),
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#0B0F19] pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(161,98,44,0.18),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-20 text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.38em] text-[#A1622C]">
            What We Do
          </p>
          <h1 className="font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Spaces That Tell<br />
            <span className="italic font-light text-[#D8C4AD]">Your Story</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-white/60 lg:text-lg">
            Three verticals, one promise: premium design executed with precision,
            from concept to completed key handover.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[#A1622C] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8B5225]"
            >
              Book Free Consultation
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Sections ── */}
      {SERVICES.map((service, i) => {
        const Icon = service.icon;
        const reversed = i % 2 !== 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-24 py-20 lg:py-28 border-b border-gray-100 last:border-0"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-20">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_60px_-12px_rgba(30,58,106,0.18)]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/30 to-transparent" />
                </div>

                {/* Copy */}
                <div>
                  <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#A1622C]/20 bg-[#A1622C]/5 px-4 py-1.5">
                    <Icon size={14} className="text-[#A1622C]" strokeWidth={2} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A1622C]">
                      {service.tag}
                    </span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-[#1E3A6A] lg:text-4xl leading-tight">
                    {service.title}
                  </h2>
                  <p className="mb-8 text-base leading-relaxed text-[#1E3A6A]/60 lg:text-lg">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#1E3A6A]/80">
                        <CheckCircle2 size={15} className="shrink-0 text-[#A1622C]" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 rounded-[4px] bg-[#1E3A6A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#152B52]"
                  >
                    Start a Project
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="bg-[#0B0F19] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-20">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.38em] text-[#A1622C]">
            Let&apos;s Begin
          </p>
          <h2 className="mb-6 font-bold text-white leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-white/55">
            Every Infravue project begins with a conversation.
            Tell us about your space and vision.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-[#A1622C] px-9 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#8B5225] shadow-[0_16px_48px_-8px_rgba(161,98,44,0.5)]"
          >
            Book Free Consultation
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
