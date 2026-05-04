"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    name: "Sesola",
    category: "Luxury Residential",
    image: "/images/projects/sesola.png",
  },
  {
    name: "Socrates",
    category: "Modern Office",
    image: "/images/projects/socrates.png",
  },
  {
    name: "Uncode",
    category: "Creative Studio",
    image: "/images/projects/uncode.png",
  },
  {
    name: "Unisoft",
    category: "Corporate HQ",
    image: "/images/projects/unisoft.png",
  },
  {
    name: "Wavity",
    category: "Tech Workspace",
    image: "/images/projects/wavity.png",
  },
  {
    name: "Dental Speciality",
    category: "Premium Clinic",
    image: "/images/projects/dental.png",
  },
  {
    name: "First Source",
    category: "Commercial Space",
    image: "/images/projects/firstsource.png",
  },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream cursor-pointer"
    >
      {/* ── Image ── */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* ── Overlay ── */}
      <div className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/60" />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-10px]">
        <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-2">
          {project.category}
        </p>
        <h3 className="text-2xl font-bold text-white mb-6">
          {project.name}
        </h3>
        
        <div className="flex items-center gap-2 text-white text-sm font-medium">
          <span>View Project</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="bg-[#FCF9F4] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* ── Header ── */}
        <div className="max-w-2xl mb-16">
          <p className="text-sand text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Our Portfolio
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy leading-tight mb-6">
            Our Projects
          </h2>
          <p className="text-[#1E3A6A]/60 text-lg leading-relaxed">
            Explore our portfolio of stunning interior transformations across residential and commercial spaces.
          </p>
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} />
          ))}
          
          {/* Optional: Final CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-12 bg-[#FCF9F4] rounded-2xl border-2 border-dashed border-sand/30"
          >
            <h3 className="text-xl font-bold text-navy text-center mb-4">
              Your Project Next?
            </h3>
            <p className="text-navy/50 text-sm text-center mb-8">
              Let's create something extraordinary together.
            </p>
            <button 
              className="px-8 py-4 bg-terracotta text-white font-bold rounded-[4px] hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20"
              onClick={() => window.location.href = '/book'}
            >
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
