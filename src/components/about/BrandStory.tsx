"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

export default function BrandStory() {
  return (
    <section className="relative bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* ── Left: Editorial image stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: CINEMATIC_EASE }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative">
              {/* Decorative back-card */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-sand/40 via-sand/15 to-transparent -z-10 transform rotate-[-1.5deg]"
              />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] shadow-[0_30px_70px_-30px_rgba(30,58,106,0.35)]">
                <Image
                  src="/images/services/residential.jpeg"
                  alt="A refined residential interior crafted by Infravue Interiors"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                {/* Subtle gradient wash for depth */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent"
                />
              </div>

              {/* Location chip */}
              <div className="absolute -bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-sand/50 bg-white px-5 py-2.5 shadow-[0_12px_28px_-12px_rgba(30,58,106,0.25)]">
                <MapPin size={14} className="text-terracotta" strokeWidth={2.2} />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-navy">
                  Based in Hyderabad
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Narrative ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: CINEMATIC_EASE, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-7">
              <span aria-hidden className="h-px w-10 bg-terracotta/60" />
              <p className="text-terracotta text-[11px] font-bold tracking-[0.32em] uppercase">
                Our Studio
              </p>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.015em] text-navy font-light mb-10">
              Every space should feel{" "}
              <span className="text-terracotta italic font-normal">
                functional, refined,
              </span>{" "}
              and thoughtfully designed.
            </h2>

            <div className="space-y-7 text-navy/70 text-[1.0625rem] lg:text-lg leading-[1.85] max-w-2xl">
              <p>
                At Infravue Interiors, we believe every space should feel
                functional, refined, and thoughtfully designed. Based in
                Hyderabad, we specialize in transforming corporate spaces,
                commercial environments, and homes through modern interior
                design and turnkey execution solutions tailored to each
                client&apos;s vision and lifestyle.
              </p>
              <p>
                Backed by a dedicated team of designers and execution
                professionals, we focus on creating spaces that balance
                aesthetics, comfort, and practicality — while ensuring quality
                workmanship and smooth project delivery.
              </p>
              <p>
                From concept planning and 3D designs to complete execution, we
                handle every stage with attention to detail and a client-first
                approach.
              </p>
            </div>

            {/* PAN India callout */}
            <div className="mt-12 relative pl-7 border-l-2 border-terracotta/70">
              <p className="font-heading text-xl lg:text-2xl text-navy leading-snug font-light italic">
                Rooted in Hyderabad. Trusted across India.
              </p>
              <p className="mt-3 text-navy/55 text-sm lg:text-base leading-relaxed max-w-md">
                We bring the same design commitment and execution standards to
                projects nationwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
