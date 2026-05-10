"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Reddy & Family",
    location: "Hyderabad",
    review:
      "The transformation exceeded our expectations. The team created a perfect balance of functionality and aesthetics. Highly professional and detail-oriented.",
  },
  {
    name: "FirstSource Management",
    location: "Hyderabad",
    review:
      "Outstanding office interiors. The design is modern, efficient, and truly reflects our brand. A noticeable boost in team productivity.",
  },
  {
    name: "Wavity Tech Team",
    location: "Hyderabad",
    review:
      "A perfect workspace transformation for our startup. Creative, practical, and delivered on time. Great experience working with the team.",
  },
  {
    name: "Suresh Kumar & Family",
    location: "Hyderabad",
    review:
      "Our home interiors turned out exactly as we imagined. The quality, finishing, and execution were exceptional. Truly satisfied.",
  },
  {
    name: "Lakshmi Priya",
    location: "Hyderabad",
    review:
      "Beautifully designed living space with great attention to detail. The team was responsive and ensured everything was perfect.",
  },
  {
    name: "Ramesh Naidu",
    location: "Hyderabad",
    review:
      "From design to execution, everything was smooth and professional. The final outcome was elegant and well within budget.",
  },
];

// Double the array for seamless looping
const LOOP_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-16 text-center">
        <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-4">
          Social Proof
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight">
          Happy Customers in Hyderabad
        </h2>
      </div>

      <div className="relative">
        {/* Gradients to fade out edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-4"
          animate={{
            x: [0, -1920], // Adjusted based on card width + gap
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "max-content" }}
        >
          {LOOP_TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl border border-sand/30 shadow-sm relative group hover:shadow-md transition-shadow duration-300"
            >
              <Quote
                className="absolute top-6 right-8 text-sand/20 group-hover:text-sand/40 transition-colors"
                size={40}
              />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy leading-tight">{t.name}</h4>
                  <p className="text-[#A1622C] text-xs font-medium uppercase tracking-wider">
                    {t.location}
                  </p>
                </div>
              </div>
              <p className="text-[#1E3A6A]/80 text-sm md:text-base leading-relaxed italic">
                "{t.review}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
