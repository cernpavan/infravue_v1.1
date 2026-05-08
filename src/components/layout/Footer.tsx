"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/app/logo_part1.png";
import BookButton from "@/components/ui/BookButton";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

const SERVICES = [
  { label: "Residential Design", href: "/services#residential" },
  { label: "Commercial Design", href: "/services#commercial" },
  { label: "Hospitality Design", href: "/services#hospitality" },
  { label: "Book Consultation", href: "/book" },
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Our Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white text-[#1E3A6A]">
      {/* ── Premium hairline divider — soft gradient, dissolves at the edges ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1E3A6A]/15 to-transparent"
      />

      {/* ── Centered terracotta accent on the divider — minimal luxury mark ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#A1622C]/45 to-transparent"
      />

      {/* ── Soft ambient shadow falling into the footer — creates depth without color ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1E3A6A]/[0.035] via-[#1E3A6A]/[0.012] to-transparent"
      />

      {/* ── Main Grid ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="Infravue — Home"
              className="-ml-1 mb-8 inline-flex items-center group transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative h-[68px] w-[240px] lg:h-[76px] lg:w-[270px]">
                <img
                  src={logo.src}
                  alt="Infravue Interiors"
                  className="h-full w-auto object-contain object-left"
                  draggable={false}
                />
              </div>
            </Link>
            <p className="text-[#1E3A6A]/60 text-sm leading-relaxed mb-7">
              Premium interior design for homes, offices, and hospitality spaces — crafted with purpose and precision.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1E3A6A]/10 text-[#1E3A6A]/50 hover:text-[#1E3A6A] hover:border-[#1E3A6A]/30 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A1622C] mb-6">
              Services
            </h3>
            <ul className="space-y-3.5">
              {SERVICES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#1E3A6A]/60 hover:text-[#1E3A6A] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A1622C] mb-6">
              Company
            </h3>
            <ul className="space-y-3.5">
              {COMPANY.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#1E3A6A]/60 hover:text-[#1E3A6A] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A1622C] mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-[#A1622C]/70" />
                <span className="text-sm text-[#1E3A6A]/60">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-[#A1622C]/70" />
                <span className="text-sm text-[#1E3A6A]/60">hello@infravue.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#A1622C]/70" />
                <span className="text-sm text-[#1E3A6A]/60 leading-relaxed">
                  Mumbai · Pune · Bangalore
                </span>
              </li>
            </ul>

            {/* Inline CTA */}
            <BookButton
              className="mt-7 inline-flex items-center px-5 py-2.5 bg-[#1E3A6A] text-white text-sm font-semibold rounded-[4px] hover:bg-[#1E3A6A]/90 transition-colors duration-200 cursor-pointer"
            >
              Book Free Consultation
            </BookButton>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative border-t border-[#1E3A6A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#1E3A6A]/40">
            © {new Date().getFullYear()} Infravue. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-[#1E3A6A]/40 hover:text-[#1E3A6A]/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#1E3A6A]/40 hover:text-[#1E3A6A]/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
