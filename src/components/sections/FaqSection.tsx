"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/data/faqs";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-8 lg:py-12 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-10">
          <p className="text-terracotta text-[13px] font-bold tracking-[0.3em] uppercase mb-5">
            FAQs
          </p>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold text-navy tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 h-1 w-20 bg-terracotta/20 mx-auto rounded-full" />
        </div>

        <div className="space-y-5">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`group border transition-all duration-300 rounded-2xl overflow-hidden ${
                openIndex === index 
                  ? "border-[#1E3A6A]/15 bg-[#1E3A6A]/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                  : "border-gray-100 bg-white hover:border-[#1E3A6A]/10 hover:shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left transition-colors"
              >
                <span className={`text-base lg:text-[17px] font-semibold transition-colors duration-300 pr-8 ${
                  openIndex === index ? "text-navy" : "text-navy/80 group-hover:text-navy"
                }`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  openIndex === index ? "bg-navy text-white rotate-180" : "bg-gray-50 text-navy/40 group-hover:bg-gray-100"
                }`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-7 pb-8 text-[#1E3A6A]/65 text-[15px] lg:text-[16px] leading-[1.7] font-light max-w-[90%]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
