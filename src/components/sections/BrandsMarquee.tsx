import Image, { type StaticImageData } from "next/image";
import RevealOnView from "@/components/ui/RevealOnView";

import BRC from "@/components/brands/BRC.png";
import FS from "@/components/brands/FS.jpg";
import Liquidnitro from "@/components/brands/Liquidnitro.jpg";
import NIAT from "@/components/brands/NIAT.png";
import NXTWave from "@/components/brands/NXT Wave.jpg";
import Optim from "@/components/brands/Optim.jpg";
import Rockwell from "@/components/brands/Rockwell.jpg";
import Sesola from "@/components/brands/Sesola.jpg";
import SRIAS from "@/components/brands/SRIAS.png";
import ST from "@/components/brands/ST.jpg";
import Wavity from "@/components/brands/Wavity.jpg";

type Brand = { src: StaticImageData; alt: string };

const BRANDS: Brand[] = [
  { src: BRC, alt: "BRC — trusted client of Infravue Interiors for commercial interior design" },
  { src: FS, alt: "First Source — commercial interior design project completed by Infravue Interiors" },
  { src: Liquidnitro, alt: "Liquid Nitro — Infravue Interiors client, corporate workspace design" },
  { src: NIAT, alt: "NIAT — corporate office interior designed by Infravue Interiors, Hyderabad" },
  { src: NXTWave, alt: "NXT Wave — modern tech office interior designed by Infravue Interiors" },
  { src: Optim, alt: "Optim — commercial space interior client of Infravue Interiors" },
  { src: Rockwell, alt: "Rockwell — trusted brand partner of Infravue Interiors for workspace design" },
  { src: Sesola, alt: "Sesola — luxury residential interior project by Infravue Interiors, Bengaluru" },
  { src: SRIAS, alt: "SRIAS Lifespaces — residential interior design client of Infravue Interiors, Hyderabad" },
  { src: ST, alt: "ST — corporate interior design partner of Infravue Interiors" },
  { src: Wavity, alt: "Wavity — tech workspace interior designed by Infravue Interiors, Pune" },
];

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="shrink-0 pr-6 md:pr-8">
      <div
        className="group/card relative flex h-28 w-48 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)] md:h-32 md:w-60"
      >
        <div className="relative flex h-20 w-40 items-center justify-center md:h-24 md:w-52">
          <Image
            src={brand.src}
            alt={brand.alt}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 160px, 208px"
            className="object-contain transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
          />
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ brands }: { brands: Brand[] }) {
  // Doubled list — `marquee-x` translates exactly -50% so the second copy
  // lands precisely where the first started.
  const track = [...brands, ...brands];

  return (
    <RevealOnView className="group relative flex overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-40 lg:w-56" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-40 lg:w-56" />

      <div className="flex w-max animate-marquee-x will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((b, i) => (
          <BrandCard key={`${b.alt}-${i}`} brand={b} />
        ))}
      </div>
    </RevealOnView>
  );
}

export default function BrandsMarquee() {
  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-10">
      {/* ── Header ── */}
      <div className="relative mx-auto mb-8 max-w-7xl px-6 text-center lg:mb-10 lg:px-20">
        <RevealOnView className="mx-auto mb-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-terracotta to-transparent" />

        <RevealOnView
          delayMs={50}
          className="mb-5"
        >
          <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-terracotta">
            Trusted Partners
          </p>
        </RevealOnView>

        <RevealOnView delayMs={120}>
          <h2
            className="font-bold text-navy"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Trusted by Visionary Brands
          </h2>
        </RevealOnView>

        <RevealOnView delayMs={220}>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-navy/55 lg:text-lg">
            A select group of partners who chose Infravue to design spaces that
            reflect the standards their teams and clients expect.
          </p>
        </RevealOnView>
      </div>

      {/* ── Single-row marquee ── */}
      <div className="relative">
        <MarqueeRow brands={BRANDS} />
      </div>
    </section>
  );
}
