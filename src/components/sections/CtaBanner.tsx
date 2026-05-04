"use client";

import { ArrowRight } from "lucide-react";
import BookButton from "@/components/ui/BookButton";

export default function CtaBanner() {
  return (
    <section className="bg-[#FCF9F4] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#A1622C] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A6A] mb-4 leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-[#1E3A6A]/55 text-base lg:text-lg leading-relaxed mb-10">
            Book a free consultation — no obligation, just great ideas crafted
            around your vision and budget.
          </p>
          <BookButton className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#A1622C] text-white font-semibold text-sm rounded-[6px] hover:bg-[#7A4A20] shadow-[0_4px_16px_rgba(161,98,44,0.25)] hover:shadow-[0_8px_24px_rgba(161,98,44,0.35)] transition-all duration-300 cursor-pointer">
            Book Free Consultation
            <ArrowRight size={16} />
          </BookButton>
        </div>
      </div>
    </section>
  );
}
