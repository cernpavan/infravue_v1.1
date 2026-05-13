"use client";

import { Download, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 lg:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── Brand Storytelling (Left) ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-terracotta text-sm font-bold tracking-[0.2em] uppercase mb-6">
                Who We Are
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy leading-tight mb-8">
                Designing spaces that seamlessly blend comfort, functionality, and modern aesthetics.
              </h2>
              
              <div className="space-y-6 text-[#1E3A6A]/70 text-base lg:text-lg leading-relaxed">
                <p>
                  At Infravue Interiors, we design and transform corporate spaces, commercial environments, and homes into refined, functional, and inspiring spaces with customized interior solutions, modern home interiors, and luxury interiors.
                </p>

                <div className="pt-4">
                  <h3 className="text-xl font-bold text-navy mb-4">Interior Designers in Hyderabad</h3>
                  <p className="mb-6">
                    Based in Hyderabad, we offer end-to-end interior design and turnkey interior solutions — from concept planning to final execution. As interior designers in Hyderabad, our approach combines:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      "Thoughtful Design",
                      "Precise Planning",
                      "High-Quality Materials",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold text-navy">
                        <CheckCircle2 size={18} className="text-terracotta" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="pt-4">
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
              <div className="absolute -inset-4 bg-gray-50 rounded-3xl -z-10 transform rotate-2" />
              
              <div className="bg-white rounded-2xl border border-sand/30 p-8 shadow-[0_20px_50px_rgba(30,58,106,0.1)]">
                <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
                  <Image 
                    src="/images/services/design.jpeg" 
                    alt="Interior Design Brochure" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>
                
                <h4 className="text-xl font-bold text-navy mb-3">
                  Download Our Premium Design Guide
                </h4>
                <p className="text-[#1E3A6A]/60 text-sm mb-8">
                  Discover curated interior inspirations, smart space planning insights, and luxury design trends — crafted for discerning clients.
                </p>
                
                <a
                  href="https://drive.google.com/file/d/1i8C_bSArLumj8GFkWzT-I8oFzqR_fDtT/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-navy text-white font-bold rounded-[6px] hover:bg-navy-dark transition-all duration-300 group"
                >
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  Download Brochure (PDF)
                </a>

                <a
                  href="https://drive.google.com/file/d/1i8C_bSArLumj8GFkWzT-I8oFzqR_fDtT/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[10px] text-center text-navy/40 mt-4 uppercase tracking-widest hover:text-navy/60 transition-colors"
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
