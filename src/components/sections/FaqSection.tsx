"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/data/faqs";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-32 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-4">
            Got Questions?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-sand/30 rounded-lg overflow-hidden bg-white/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white"
              >
                <span className="text-base lg:text-lg font-semibold text-navy pr-8">
                  {faq.question}
                </span>
                <span className="shrink-0 text-sand">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-6 pb-6 text-[#1E3A6A]/70 text-sm lg:text-base leading-relaxed">
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
