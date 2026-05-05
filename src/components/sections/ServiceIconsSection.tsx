"use client";

import { motion } from "framer-motion";

const SERVICES = [
  { name: "Modular Kitchen", icon: "kitchen" },
  { name: "Storage and Wardrobe", icon: "wardrobe" },
  { name: "Crockery Unit", icon: "crockery" },
  { name: "Space Saving Furniture", icon: "space-saving" },
  { name: "TV Unit", icon: "tv" },
  { name: "Study Table", icon: "study" },
  { name: "False Ceiling", icon: "ceiling" },
  { name: "Lights", icon: "lights" },
  { name: "Wallpaper", icon: "wallpaper" },
  { name: "Paints", icon: "paints" },
  { name: "Bathroom", icon: "bathroom" },
  { name: "Pooja Unit", icon: "pooja" },
  { name: "Foyer", icon: "foyer" },
  { name: "Movable Furniture", icon: "movable" },
  { name: "Kids Bedroom", icon: "kids" },
];

function ServiceIcon({ name, type }: { name: string; type: string }) {
  // Custom SVG Icons reflecting the reference images but with brand colors
  const renderIcon = () => {
    const primary = "#1E3A6A"; // Navy
    const accent = "#A1622C";  // Terracotta

    switch (type) {
      case "kitchen":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="10" y="10" width="44" height="44" rx="2" stroke={primary} strokeWidth="2"/>
            <line x1="10" y1="28" x2="54" y2="28" stroke={primary} strokeWidth="2"/>
            <line x1="32" y1="28" x2="32" y2="54" stroke={primary} strokeWidth="2"/>
            <circle cx="21" cy="41" r="2" fill={accent}/>
            <circle cx="43" cy="41" r="2" fill={accent}/>
            <path d="M18 18h8v2h-8z" fill={primary}/>
            <path d="M38 18h8v2h-8z" fill={primary}/>
          </svg>
        );
      case "wardrobe":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="12" y="8" width="40" height="48" rx="2" stroke={primary} strokeWidth="2"/>
            <line x1="32" y1="8" x2="32" y2="56" stroke={primary} strokeWidth="2"/>
            <rect x="24" y="24" width="2" height="8" rx="1" fill={accent}/>
            <rect x="38" y="24" width="2" height="8" rx="1" fill={accent}/>
          </svg>
        );
      case "crockery":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="14" y="10" width="36" height="44" rx="2" stroke={primary} strokeWidth="2"/>
            <line x1="14" y1="24" x2="50" y2="24" stroke={primary} strokeWidth="2"/>
            <line x1="14" y1="38" x2="50" y2="38" stroke={primary} strokeWidth="2"/>
            <circle cx="25" cy="17" r="2" stroke={accent} strokeWidth="1.5"/>
            <circle cx="39" cy="17" r="2" stroke={accent} strokeWidth="1.5"/>
            <path d="M20 31h24M20 45h24" stroke={primary} strokeWidth="1.5"/>
          </svg>
        );
      case "space-saving":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M12 44h40v6H12z" stroke={primary} strokeWidth="2"/>
            <path d="M16 20h32v24H16z" stroke={primary} strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" stroke={accent} strokeWidth="2"/>
            <path d="M10 50l4 4M54 50l-4 4" stroke={primary} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case "tv":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="8" y="14" width="48" height="28" rx="2" stroke={primary} strokeWidth="2"/>
            <rect x="22" y="20" width="20" height="12" rx="1" stroke={accent} strokeWidth="1.5"/>
            <line x1="8" y1="48" x2="56" y2="48" stroke={primary} strokeWidth="2"/>
            <line x1="16" y1="42" x2="16" y2="54" stroke={primary} strokeWidth="2"/>
            <line x1="48" y1="42" x2="48" y2="54" stroke={primary} strokeWidth="2"/>
          </svg>
        );
      case "study":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M10 24h44v4H10z" fill={primary}/>
            <path d="M14 28h36v20H14z" stroke={primary} strokeWidth="2"/>
            <line x1="18" y1="20" x2="30" y2="20" stroke={accent} strokeWidth="2"/>
            <circle cx="32" cy="38" r="3" stroke={accent} strokeWidth="1.5"/>
          </svg>
        );
      case "ceiling":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M10 16l22-8 22 8v8H10v-8z" stroke={primary} strokeWidth="2"/>
            <circle cx="32" cy="24" r="3" fill={accent}/>
            <path d="M32 27v10" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2"/>
            <circle cx="32" cy="40" r="2" stroke={accent} strokeWidth="1"/>
          </svg>
        );
      case "lights":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M32 10v10" stroke={primary} strokeWidth="2"/>
            <path d="M18 36c0-7.7 6.3-14 14-14s14 6.3 14 14H18z" stroke={primary} strokeWidth="2"/>
            <circle cx="32" cy="42" r="3" fill={accent}/>
          </svg>
        );
      case "wallpaper":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="14" y="10" width="36" height="44" rx="2" stroke={primary} strokeWidth="2"/>
            <path d="M20 18h4v4h-4zM30 18h4v4h-4zM40 18h4v4h-4z" fill={accent}/>
            <path d="M20 28h4v4h-4zM30 28h4v4h-4zM40 28h4v4h-4z" fill={primary} fillOpacity="0.3"/>
            <path d="M14 44h36" stroke={primary} strokeWidth="2"/>
          </svg>
        );
      case "paints":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="24" y="10" width="16" height="30" rx="2" stroke={primary} strokeWidth="2"/>
            <path d="M28 40v10a2 2 0 002 2h4a2 2 0 002-2V40" stroke={primary} strokeWidth="2"/>
            <path d="M24 20h16" stroke={accent} strokeWidth="4"/>
          </svg>
        );
      case "bathroom":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M10 32c0 8.8 7.2 16 16 16h12c8.8 0 16-7.2 16-16H10z" stroke={primary} strokeWidth="2"/>
            <path d="M46 14v18M42 14h8" stroke={primary} strokeWidth="2"/>
            <circle cx="46" cy="18" r="2" fill={accent}/>
          </svg>
        );
      case "pooja":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="16" y="16" width="32" height="40" rx="2" stroke={primary} strokeWidth="2"/>
            <path d="M16 16l16-10 16 10" stroke={primary} strokeWidth="2"/>
            <circle cx="32" cy="32" r="4" stroke={accent} strokeWidth="2"/>
            <path d="M32 28v-2" stroke={accent} strokeWidth="1.5"/>
          </svg>
        );
      case "foyer":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M12 52h40" stroke={primary} strokeWidth="2"/>
            <rect x="18" y="16" width="28" height="36" stroke={primary} strokeWidth="2"/>
            <circle cx="40" cy="34" r="2" fill={accent}/>
            <rect x="22" y="22" width="20" height="2" fill={primary} fillOpacity="0.2"/>
          </svg>
        );
      case "movable":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M14 40h36v8H14z" stroke={primary} strokeWidth="2"/>
            <path d="M18 20c0-4 3-7 7-7h18a7 7 0 017 7v20H18V20z" stroke={primary} strokeWidth="2"/>
            <circle cx="28" cy="44" r="2" fill={accent}/>
            <circle cx="40" cy="44" r="2" fill={accent}/>
          </svg>
        );
      case "kids":
        return (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <path d="M12 40h40v8H12z" stroke={primary} strokeWidth="2"/>
            <path d="M16 20h12v20H16zM36 24h12v16H36z" stroke={primary} strokeWidth="2"/>
            <circle cx="22" cy="28" r="2" fill={accent}/>
            <circle cx="42" cy="30" r="2" fill={accent}/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-sand/20 hover:border-sand/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group"
    >
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {renderIcon()}
      </div>
      <p className="text-navy font-bold text-xs text-center uppercase tracking-wider leading-tight">
        {name}
      </p>
    </motion.div>
  );
}

export default function ServiceIconsSection() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="text-terracotta text-xs font-bold tracking-[0.2em] uppercase mb-4">
            End-to-End Solutions
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy tracking-tight max-w-3xl mx-auto">
            Our Interior Design Services
          </h2>
        </div>

        {/* ── Icons Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ServiceIcon name={service.name} type={service.icon} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
