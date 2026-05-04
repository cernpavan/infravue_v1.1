"use client";

import { motion } from "framer-motion";
import { UserPlus, Presentation, FileCheck, Wrench, PackageCheck } from "lucide-react";
import BookButton from "@/components/ui/BookButton";

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    title: "Project Signup",
    description: "Start your journey by signing up and sharing your vision with us.",
  },
  {
    number: "02",
    icon: Presentation,
    title: "Design Presentation",
    description: "We present tailored concepts and 3D visualizations for your space.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Design Sign-Off",
    description: "Finalize layouts and materials to move into the execution phase.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Final Installation",
    description: "Our experts handle everything with precision and high-quality finishes.",
  },
  {
    number: "05",
    icon: PackageCheck,
    title: "Handover",
    description: "Your dream space is ready! We handover a perfectly crafted home.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-cream py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* ── Header ── */}
        <div className="text-center mb-24">
          <p className="text-terracotta text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Our Journey
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy tracking-tight">
            How It Works
          </h2>
        </div>

        {/* ── Process Container ── */}
        <div className="relative">
          
          {/* ── Desktop Horizontal Line ── */}
          <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-sand/30 to-transparent z-0" />

          {/* ── Steps Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circle Icon Container */}
                  <div className="relative mb-8">
                    {/* Outer Glow / Ring */}
                    <div className="absolute -inset-4 bg-terracotta/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    
                    {/* Main Circle */}
                    <div className="w-[100px] h-[100px] rounded-full bg-white border border-sand/30 shadow-[0_10px_30px_rgba(30,58,106,0.06)] flex items-center justify-center relative z-10 group-hover:border-terracotta/40 group-hover:shadow-[0_15px_45px_rgba(161,98,44,0.12)] transition-all duration-500">
                      <Icon 
                        size={36} 
                        strokeWidth={1.2} 
                        className="text-terracotta group-hover:scale-110 transition-transform duration-500" 
                      />
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-4">
                    <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-terracotta transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[#1E3A6A]/50 text-sm leading-relaxed max-w-[180px] mx-auto">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile-only connector line */}
                  {index < STEPS.length - 1 && (
                    <div className="lg:hidden w-[2px] h-12 bg-gradient-to-b from-sand/40 to-transparent mt-8" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <BookButton className="inline-flex items-center justify-center px-10 py-5 bg-terracotta text-white font-bold rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-xl shadow-terracotta/20 hover:shadow-terracotta/30 hover:-translate-y-1 active:scale-95">
            Book Free Consultation
          </BookButton>
        </motion.div>

      </div>
    </section>
  );
}
