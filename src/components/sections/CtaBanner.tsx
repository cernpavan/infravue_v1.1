"use client";

import { ArrowRight, Phone } from "lucide-react";
import BookButton from "@/components/ui/BookButton";

export default function CtaBanner() {
  return (
    <section className="relative bg-white pt-20 pb-24 lg:pt-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <div
            aria-hidden
            className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-[#A1622C]/40 to-transparent"
          />
          <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase mb-5">
            Let&apos;s Begin
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A6A] mb-4 leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-[#1E3A6A]/55 text-base lg:text-lg leading-relaxed mb-10">
            Book a free consultation — no obligation, just great ideas crafted
            around your vision and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookButton className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#A1622C] text-white font-semibold text-sm rounded-[6px] hover:bg-[#7A4A20] shadow-[0_4px_16px_rgba(161,98,44,0.25)] hover:shadow-[0_8px_24px_rgba(161,98,44,0.35)] transition-all duration-300 cursor-pointer">
              Book Free Consultation
              <ArrowRight size={16} />
            </BookButton>

            <a
              href="tel:+919010709994"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#1E3A6A]/25 text-[#1E3A6A] font-semibold text-sm rounded-[6px] hover:bg-[#1E3A6A] hover:text-white hover:border-[#1E3A6A] transition-all duration-300"
            >
              <Phone size={16} />
              Call Now
            </a>

            <a
              href="https://wa.me/919010709994"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#25D366]/40 text-[#128C7E] font-semibold text-sm rounded-[6px] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Closing hairline — signals the end of the body content before the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px max-w-[80%] bg-gradient-to-r from-transparent via-[#1E3A6A]/12 to-transparent"
      />
    </section>
  );
}
