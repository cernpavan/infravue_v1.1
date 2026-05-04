import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Building2, Palette, Layout } from "lucide-react";

const SERVICES = [
  {
    icon: Layout,
    title: "Design & Planning Services",
    description:
      "Expert solutions for planning, detailing, and flawless execution.",
    image: "/images/services/design.jpeg",
    href: "/services#design",
    items: [
      "Furniture & Space Planning",
      "Lighting Design",
      "Flooring Solutions",
      "Electrical Planning",
      "2D & 3D Renderings",
      "Structural Planning",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Interiors",
    description:
      "Professional spaces designed for productivity and aesthetics.",
    image: "/images/services/commercial.jpeg",
    href: "/services#commercial",
    items: [
      "Office Interiors",
      "F&B Commercial Interiors",
      "PEB Constructions",
      "Corporate Spaces",
      "Retail Interiors",
      "Hospitality Design",
      "Workspace Planning",
    ],
  },
  {
    icon: Palette,
    title: "Finishing & Decor",
    description:
      "High-end finishing and custom decor solutions for a refined look.",
    image: "/images/services/finishing.png",
    href: "/services#finishing",
    items: [
      "Finishing & Decor",
      "Wallpaper Design",
      "Custom Decor Solutions",
      "Color Consultation",
      "Material Selection & Sourcing",
      "Art & Curated Styling",
    ],
  },
  {
    icon: Home,
    title: "Residential Interiors",
    description:
      "Complete home interior solutions tailored to your lifestyle.",
    image: "/images/services/residential.jpeg",
    href: "/services#residential",
    items: [
      "2BHK / 3BHK / 4BHK Homes",
      "Villa Interiors",
      "Living Room Interiors",
      "Bedroom Interiors",
      "Modular Kitchen",
      "Storage & Wardrobes",
      "Dining Room",
    ],
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  const Icon = service.icon;
  return (
    <div className="group bg-white rounded-2xl border border-sand/40 shadow-[0_2px_12px_rgba(30,58,106,0.04)] hover:shadow-[0_12px_40px_rgba(30,58,106,0.10)] hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col">
      {/* ── Card Image ── */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Floating icon badge */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Icon strokeWidth={1.5} size={20} className="text-[#1E3A6A]" />
        </div>

        {/* Title overlaid on image */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {service.title}
          </h3>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-[#1E3A6A]/60 text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Service items */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-[#1E3A6A]/80"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A1622C] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={service.href}
          className="inline-flex items-center gap-1.5 text-[#A1622C] text-sm font-semibold group-hover:gap-2.5 transition-all duration-300"
        >
          Explore
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#A1622C] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A6A] mb-4">
            Spaces That Tell Your Story
          </h2>
          <p className="text-[#1E3A6A]/60 text-base lg:text-lg leading-relaxed">
            Three verticals, one promise — premium design executed with
            precision.
          </p>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-14">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A6A] text-white font-semibold text-sm rounded-[6px] hover:bg-[#152B52] transition-colors duration-200"
          >
            View All Services
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
