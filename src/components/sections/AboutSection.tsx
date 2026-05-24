"use client";

import { Download, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-8 lg:py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Brand Storytelling (Left) ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-terracotta text-sm font-bold tracking-[0.2em] uppercase mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy leading-tight mb-5">
                Designing spaces that seamlessly blend comfort, functionality, and modern aesthetics.
              </h2>

              <div className="space-y-4 text-[#1E3A6A] text-base lg:text-lg leading-relaxed">
                <p>
                  At Infravue Interiors, we design and transform corporate spaces, commercial environments, and homes into refined, functional, and inspiring spaces with customized interior solutions, modern home interiors, and luxury interiors.
                </p>

                <div className="pt-2">
                  <h3 className="text-xl font-bold text-navy mb-2">Interior Designers in Hyderabad</h3>
                  <p className="mb-3">
                    Based in Hyderabad, we offer end-to-end interior design and turnkey interior solutions, from concept planning to final execution. As interior designers in Hyderabad, our approach combines:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      "Thoughtful Design",
                      "Precise Planning",
                      "High-Quality Materials",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold text-navy">
                        <CheckCircle2 size={16} className="text-terracotta shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="pt-1">
                  Every project is crafted to reflect your style, purpose, and budget while maintaining a strong focus on quality, timely delivery, and affordable interiors.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Lead Magnet / Visual (Right) ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Background Decoration */}
              <div className="absolute -inset-3 bg-gray-50 rounded-3xl -z-10 transform rotate-2" />

              <div className="bg-white rounded-2xl border border-sand/30 p-6 shadow-[0_20px_50px_rgba(30,58,106,0.1)]">
                <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/design.webp"
                    alt="Infravue Interiors premium interior design guide — curated inspiration for residential and corporate spaces in Hyderabad"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>

                <h4 className="text-lg font-bold text-navy mb-2">
                  Download Our Premium Design Guide
                </h4>
                <p className="text-[#1E3A6A]/60 text-sm mb-5">
                  Discover curated interior inspirations, smart space planning insights, and luxury design trends, crafted for discerning clients.
                </p>

                <a
                  href="https://drive.google.com/file/d/1i8C_bSArLumj8GFkWzT-I8oFzqR_fDtT/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-navy text-white font-bold rounded-[6px] hover:bg-navy-dark transition-all duration-300 group"
                >
                  <Download size={17} className="group-hover:translate-y-0.5 transition-transform" />
                  Download Brochure (PDF)
                </a>

                <a
                  href="https://drive.google.com/file/d/1i8C_bSArLumj8GFkWzT-I8oFzqR_fDtT/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[10px] text-center text-navy/40 mt-3 uppercase tracking-widest hover:text-navy/60 transition-colors"
                >
                  Instant Access via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
