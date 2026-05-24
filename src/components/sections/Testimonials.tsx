"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Testimonials are tied to real projects from our portfolio so the section
// reads as a continuation of the work shown in /#projects rather than a
// disconnected social-proof strip. Two residential voices anchor positions
// 2 and 5; the remaining four span corporate, luxury workspace, education,
// and hospitality sectors — mirroring the breadth of work in the projects grid.
const TESTIMONIALS = [
  {
    name: "First Source",
    location: "Hyderabad",
    review:
      "Across a 35,000 sq ft floor plate, Infravue held the same standard of finish and discipline from reception through to the cafeteria. Their turnkey approach removed the usual friction of a project this size. We moved in on schedule, and the space is performing beautifully.",
  },
  {
    name: "Dr. Reddy & Family",
    location: "Hyderabad",
    review:
      "Our home feels properly thought-through. Every storage detail, lighting layer, and finish choice belongs. Infravue worked with the way we actually live, and the result has only grown on us through the first year.",
  },
  {
    name: "Sesola Studio",
    location: "Hyderabad",
    review:
      "The brief was simple: a quiet, premium workspace that doesn't shout. Infravue delivered exactly that, with restrained materials, considered lighting, and glass partitions that feel architectural rather than added. The kind of office our team is genuinely proud to walk into.",
  },
  {
    name: "NIAT Institute",
    location: "Pune",
    review:
      "We needed an interior that supported focused learning and easy collaboration in equal measure. Infravue's planning across 15,000 sq ft of classrooms, faculty zones, and circulation is exceptional. Students respond to the space, and the day-to-day operations run noticeably smoother.",
  },
  {
    name: "Lakshmi Priya",
    location: "Hyderabad",
    review:
      "Modular kitchen, wardrobes, false ceilings, finishes, all handled by one team with care and consistency. The styling is timeless without ever feeling staged. Genuinely the smoothest project we could have asked for.",
  },
  {
    name: "Float Brewery",
    location: "Hyderabad",
    review:
      "Hospitality interiors live or die on first impressions, and Infravue understood that from day one. The textured walls, sculptural ceiling, customized bar counters and lounge zones come together into a single, immersive guest experience. Brilliant execution end to end.",
  },
];

// Double the array for seamless looping
const LOOP_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  return (
    <section className="bg-white py-8 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-10 text-center">
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
                &ldquo;{t.review}&rdquo;
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
