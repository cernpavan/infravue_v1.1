import Image, { type StaticImageData } from "next/image";

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
  { src: BRC, alt: "BRC" },
  { src: FS, alt: "FS" },
  { src: Liquidnitro, alt: "Liquid Nitro" },
  { src: NIAT, alt: "NIAT" },
  { src: NXTWave, alt: "NXT Wave" },
  { src: Optim, alt: "Optim" },
  { src: Rockwell, alt: "Rockwell" },
  { src: Sesola, alt: "Sesola" },
  { src: SRIAS, alt: "SRIAS" },
  { src: ST, alt: "ST" },
  { src: Wavity, alt: "Wavity" },
];

// Triple the list so the marquee always has more than one viewport of content
// in flight; matches the proven TrustBanner pattern that keeps the loop seam
// hidden behind the edge-fade gradients.
const TRACK = [...BRANDS, ...BRANDS, ...BRANDS];

export default function BrandsMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-cream-muted py-20 lg:py-28">
      {/* ── Header ── */}
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center lg:mb-16 lg:px-20">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">
          Trusted Partners
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-navy lg:text-4xl">
          Clients We&rsquo;ve Worked With
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-navy/55 md:text-base">
          Partnering with leading brands to craft spaces that inspire trust and elevate experience.
        </p>
      </div>

      {/* ── Marquee ── */}
      <div className="group relative flex overflow-hidden">
        {/* Edge fades — match section bg so the loop seam dissolves cleanly */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-cream-muted to-transparent lg:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-cream-muted to-transparent lg:w-32" />

        <div className="flex w-max animate-marquee items-center gap-4 px-3 [animation-duration:55s] hover:[animation-play-state:paused] md:gap-6">
          {TRACK.map((brand, i) => (
            <div
              key={`${brand.alt}-${i}`}
              className="group/card flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl border border-sand/30 bg-white px-5 shadow-[0_2px_12px_rgba(30,58,106,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-terracotta/30 hover:shadow-[0_18px_40px_-15px_rgba(30,58,106,0.18)] md:h-28 md:w-52 md:px-7"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                placeholder="blur"
                sizes="(max-width: 768px) 130px, 200px"
                className="h-10 w-auto object-contain opacity-80 transition-opacity duration-300 group-hover/card:opacity-100 md:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
