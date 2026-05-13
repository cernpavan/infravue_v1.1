import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Clock } from "lucide-react";
import { CONTACT, ADDRESS, SOCIAL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Infravue Interiors — premium interior designers in Hyderabad. Call, email, or book a free consultation today.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#0B0F19] pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(161,98,44,0.15),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-20 text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.38em] text-[#A1622C]">
            Get In Touch
          </p>
          <h1
            className="font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Let&apos;s Build{" "}
            <span className="italic font-light text-[#D8C4AD]">Something Together</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/55 lg:text-lg">
            Whether you have a project in mind or just want to explore what&apos;s possible,
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Contact Info ── */}
          <div>
            <h2 className="mb-10 text-2xl font-bold text-[#1E3A6A] lg:text-3xl">
              Contact Information
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A6A]/5">
                  <Phone size={17} className="text-[#A1622C]" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E3A6A]/40">
                    Phone
                  </p>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="text-base font-semibold text-[#1E3A6A] hover:text-[#A1622C] transition-colors"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A6A]/5">
                  <Mail size={17} className="text-[#A1622C]" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E3A6A]/40">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-base font-semibold text-[#1E3A6A] hover:text-[#A1622C] transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A6A]/5">
                  <MapPin size={17} className="text-[#A1622C]" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E3A6A]/40">
                    Studio
                  </p>
                  <p className="text-base font-semibold text-[#1E3A6A] leading-relaxed">
                    {ADDRESS.streetAddress},<br />
                    {ADDRESS.addressLocality}, {ADDRESS.addressRegion} — {ADDRESS.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A6A]/5">
                  <Clock size={17} className="text-[#A1622C]" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E3A6A]/40">
                    Working Hours
                  </p>
                  <p className="text-base font-semibold text-[#1E3A6A]">
                    Monday – Saturday
                  </p>
                  <p className="text-sm text-[#1E3A6A]/55">9:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1E3A6A]/40">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-[#1E3A6A]/60 hover:border-[#1E3A6A]/20 hover:text-[#1E3A6A] transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-[#1E3A6A]/60 hover:border-[#1E3A6A]/20 hover:text-[#1E3A6A] transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ── CTA Card ── */}
          <div>
            <div className="rounded-3xl bg-[#0B0F19] p-8 lg:p-10">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#A1622C]">
                Ready to Start?
              </p>
              <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl leading-tight">
                Book a Free<br />Consultation
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-white/50">
                Tell us about your space — size, style, budget, and vision. We&apos;ll
                schedule a no-obligation discovery call and map out a plan that fits
                your goals perfectly.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "Free 30-minute discovery call",
                  "Site visit & space measurement",
                  "Initial concept & mood board",
                  "Transparent pricing, no hidden fees",
                ].map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A1622C] shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#A1622C] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#8B5225] shadow-[0_12px_40px_-8px_rgba(161,98,44,0.5)]"
              >
                Book Free Consultation
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 py-4 text-sm font-semibold text-[#1E3A6A] transition-all hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Map placeholder / Address strip ── */}
      <section className="border-t border-gray-100 bg-[#F8F6F2] py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A1622C] mb-1">
                {SITE_NAME}
              </p>
              <p className="text-sm text-[#1E3A6A]/60">
                {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=Infravue+Interiors+Hyderabad`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A6A] hover:text-[#A1622C] transition-colors"
            >
              <MapPin size={14} />
              Open in Google Maps
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
