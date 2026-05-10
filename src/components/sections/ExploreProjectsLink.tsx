"use client";

import { ArrowRight } from "lucide-react";

export default function ExploreProjectsLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") return;

    const target = document.getElementById("projects");
    if (!target) return; // fall through to native anchor navigation

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", "#projects");
  };

  return (
    <a
      href="/#projects"
      onClick={handleClick}
      aria-label="Scroll to Our Projects"
      className="inline-flex items-center gap-1.5 text-[#A1622C] text-sm font-semibold group-hover:gap-2.5 transition-all duration-300"
    >
      Explore
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}
