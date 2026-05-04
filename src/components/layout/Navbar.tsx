"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import BookButton from "@/components/ui/BookButton";
import logo from "@/app/logo.jpg";

const NAV_LINKS = [
  { name: "About Us", href: "/#about" },
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
          ? "bg-cream/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-cream py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-32 h-12 overflow-hidden">
              <img
                src={logo.src}
                alt="Infravue Interiors"
                className="absolute top-1/2 left-0 -translate-y-1/2 w-auto h-10 object-contain"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-bold text-navy/60 hover:text-navy uppercase tracking-widest transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <BookButton className="px-6 py-2.5 bg-navy text-white text-[13px] font-bold rounded-[4px] hover:bg-navy-dark transition-all duration-300 shadow-lg shadow-navy/10 active:scale-[0.98]">
              Free Consultation
            </BookButton>
          </div>

          {/* ── Mobile Menu Trigger ── */}
          <button
            className="lg:hidden text-navy p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream border-t border-sand/10 transition-all duration-300 overflow-hidden ${
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
