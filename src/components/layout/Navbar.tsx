"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import BookButton from "@/components/ui/BookButton";
import logo from "@/app/logo_part1.png";

const NAV_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md py-1 shadow-md"
          : "bg-white py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              // If we're already on the home page, Link won't re-navigate,
              // so smooth-scroll to top manually. Other routes will be
              // handled by Next.js's default scroll-to-top on navigation.
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center group transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative h-[70px] w-[220px] lg:w-[260px]">
              <Image
                src={logo}
                alt="Infravue Interiors — Premium Interior Designers in Hyderabad"
                priority
                fill
                sizes="(min-width: 1024px) 260px, 220px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold text-navy hover:text-terracotta uppercase tracking-[0.15em] transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-terracotta after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
            <BookButton className="px-7 py-2.5 bg-navy text-white text-[12px] font-bold rounded-[4px] hover:bg-navy-dark transition-all duration-300 shadow-lg shadow-navy/20 active:scale-[0.95]">
              Free Consultation
            </BookButton>
          </div>

          {/* ── Mobile Menu Trigger ── */}
          <button
            className="lg:hidden text-navy p-2 hover:bg-navy/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-navy flex items-center justify-between group"
            >
              {link.name}
              <ChevronRight size={16} className="text-sand group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
          <BookButton className="w-full py-4 bg-navy text-white font-bold rounded-[4px] text-center">
            Free Consultation
          </BookButton>
        </div>
      </div>
    </header>
  );
}
