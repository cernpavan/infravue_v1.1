import { Users, Briefcase, Tag, Truck, Award, Maximize } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Award, label: "8+ Years of Experience" },
  { icon: Briefcase, label: "100+ Projects Delivered" },
  { icon: Maximize, label: "2M+ Sq. Ft. Delivered" },
  { icon: Users, label: "Top Expert Designers" },
  { icon: Tag, label: "Transparent Pricing" },
  { icon: Truck, label: "Fast & On-Time Delivery" },
];

export default function TrustBanner() {
  return (
    <section className="bg-[#FAFAF9] overflow-hidden py-10 border-y border-[#F0EDE9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-8 text-center">
        <h2 className="text-sm md:text-base font-bold text-terracotta tracking-[0.15em] uppercase">
          why choose infravue interiors
        </h2>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Fading edges matching the white background */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 lg:w-28 bg-gradient-to-r from-[#F7F5F2] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 lg:w-28 bg-gradient-to-l from-[#F7F5F2] to-transparent" />

        {/* Marquee container */}
        <div className="flex gap-4 px-4 w-max animate-marquee hover:[animation-play-state:paused] pb-4">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3 bg-white px-4 py-6 rounded-xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(30,58,106,0.06)] hover:border-sand/50 transition-all duration-300 group/card shrink-0 w-[180px] md:w-[220px]"
              >
                <div className="text-navy/40 group-hover/card:text-terracotta transition-colors duration-300">
                  <Icon strokeWidth={1.5} size={32} />
                </div>
                <p className="text-navy font-bold text-[13px] md:text-sm leading-snug text-center">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
