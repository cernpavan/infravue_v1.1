import type { Project } from "@/components/sections/ProjectShowcase";

export type ProjectWithSlug = Project & { slug: string };

export const PROJECTS: ProjectWithSlug[] = [
  // ── 1. Niat ────────────────────────────────────────────────────────────────
  {
    slug: "niat",
    name: "NIAT",
    category: "Corporate Office",
    image: "/images/projects/niat.png",
    gallery: [
      "/images/projects/niat/niat-01.jpg",
      "/images/projects/niat/niat-02.jpg",
      "/images/projects/niat/niat-03.jpg",
      "/images/projects/niat/niat-04.jpg",
      "/images/projects/niat/niat-05.jpg",
      "/images/projects/niat/niat-06.png",
      "/images/projects/niat/niat-07.png",
      "/images/projects/niat/niat-08.png",
      "/images/projects/niat/niat-09.png",
      "/images/projects/niat/niat-10.png",
    ],
    year: "2025",
    location: "Pune, IN",
    area: "15,000 sq ft",
    scope: "Edtech Institute",
    style: "Modern Corporate",
    intro:
      "A purposeful corporate environment where clean geometry and warm detailing create a workspace that motivates from the moment you walk in.",
    description:
      "Niat is a modern office interior built around clarity — every element intentional, every space calibrated for the people who work there.",
    philosophy:
      "We designed around purpose, not decoration. The result is a workplace that feels confident, efficient, and genuinely comfortable for long working days.",
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Scope", value: "Office Interior" },
      { label: "Style", value: "Modern Corporate" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Pearl White", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
  },
  // ── 2. Sesola ──────────────────────────────────────────────────────────────
  {
    slug: "sesola",
    name: "Sesola",
    category: "Luxury Residential",
    image: "/images/projects/sesola.png",
    gallery: [
      "/images/projects/sesola/sesola-01.jpg",
      "/images/projects/sesola/sesola-02.jpg",
      "/images/projects/sesola/sesola-03.jpg",
      "/images/projects/sesola/sesola-04.jpg",
      "/images/projects/sesola/sesola-05.jpg",
      "/images/projects/sesola/sesola-06.jpg",
      "/images/projects/sesola/sesola-07.jpg",
      "/images/projects/sesola/sesola-08.jpg",
    ],
    year: "2025",
    location: "Hyderabad, IN",
    area: "3,200 sq ft",
    scope: "Office Interiors",
    style: "Contemporary Luxe",
    intro:
      "A residence composed of soft daylight, layered textures, and quiet luxury — designed to feel grounded yet unmistakably elevated.",
    description:
      "Sesola is a study in restrained richness — a home where every surface, line and shadow has been considered, and nothing is louder than it needs to be.",
    philosophy:
      "We approached Sesola as a series of atmospheres rather than rooms. Light became the architecture; materials became the storyteller. The result is a residence that ages beautifully and lives quietly, every day.",
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Total Area", value: "3,200 sqft" },
      { label: "Spaces", value: "12" },
      { label: "Timeline", value: "6 months" },
    ],
    palette: [
      { name: "Warm Ivory", hex: "#EDE3D6" },
      { name: "Brushed Oak", hex: "#A1622C" },
      { name: "Deep Navy", hex: "#1E3A6A" },
      { name: "Soft Sand", hex: "#D8C4AD" },
    ],
  },
  // ── 3. First Source ────────────────────────────────────────────────────────
  {
    slug: "first-source",
    name: "First Source",
    category: "Commercial Space",
    image: "/images/projects/firstsource.png",
    gallery: [
      "/images/projects/first-source/first-source-01.jpg",
      "/images/projects/first-source/first-source-02.jpg",
      "/images/projects/first-source/first-source-03.jpg",
      "/images/projects/first-source/first-source-04.jpg",
      "/images/projects/first-source/first-source-05.jpg",
      "/images/projects/first-source/first-source-06.jpg",
      "/images/projects/first-source/first-source-07.jpg",
      "/images/projects/first-source/first-source-08.jpg",
    ],
    year: "2024",
    location: "Hyderabad, IN",
    area: "35,000 sq ft",
    scope: "Office Interiors",
    style: "Refined Commercial",
    intro:
      "A commercial floor that treats every visitor like a guest — measured spatial flow, premium finishes, and details engineered to last.",
    description:
      "First Source pairs durable, high-spec finishes with a residential warmth, blurring the line between commercial efficiency and considered hospitality.",
    philosophy:
      "Commercial doesn't have to mean cold. We mapped the entire visitor journey, treated every threshold as a design moment, and built surfaces that wear in rather than wear out.",
    stats: [
      { label: "Visitor Capacity", value: "240" },
      { label: "Total Area", value: "9,200 sqft" },
      { label: "Zones", value: "11" },
      { label: "Timeline", value: "7 months" },
    ],
    palette: [
      { name: "Ivory", hex: "#EDE3D6" },
      { name: "Walnut", hex: "#7A4A20" },
      { name: "Slate Navy", hex: "#1E3A6A" },
      { name: "Brass", hex: "#A1622C" },
    ],
  },
  // ── 4. SRIAS Lifespaces ────────────────────────────────────────────────────
  {
    slug: "srias-lifespaces",
    name: "SRIAS Lifespaces",
    category: "Residential",
    image: "/images/projects/srias.png",
    gallery: [
      "/images/projects/srias-lifespaces/srias-lifespaces-01.jpg",
      "/images/projects/srias-lifespaces/srias-lifespaces-02.jpg",
      "/images/projects/srias-lifespaces/srias-lifespaces-03.jpg",
      "/images/projects/srias-lifespaces/srias-lifespaces-04.jpg",
      "/images/projects/srias-lifespaces/srias-lifespaces-05.jpg",
      "/images/projects/srias-lifespaces/srias-lifespaces-06.jpg",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "5,500 sq ft",
    scope: "Office Interiors",
    style: "Contemporary Living",
    intro:
      "A residential interior crafted around lifestyle — where every room transitions naturally into the next, and comfort is built into the architecture.",
    description:
      "SRIAS Lifespaces is a home interior that balances modern aesthetics with everyday functionality, tailored precisely to the family's rhythm and vision.",
    philosophy:
      "We started with how the family lives, not how the space looks. The design emerged from those conversations — practical, personal, and quietly beautiful.",
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Scope", value: "Home Interior" },
      { label: "Style", value: "Contemporary" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Warm Ivory", hex: "#EDE3D6" },
      { name: "Brushed Oak", hex: "#A1622C" },
      { name: "Deep Navy", hex: "#1E3A6A" },
      { name: "Soft Sand", hex: "#D8C4AD" },
    ],
  },
  // ── 5. Uncode ──────────────────────────────────────────────────────────────
  {
    slug: "uncode",
    name: "Uncode",
    category: "Creative Studio",
    image: "/images/projects/uncode.png",
    gallery: [
      "/images/projects/uncode/uncode-01.jpg",
      "/images/projects/uncode/uncode-02.jpg",
      "/images/projects/uncode/uncode-03.jpg",
      "/images/projects/uncode/uncode-04.jpg",
      "/images/projects/uncode/uncode-05.jpg",
      "/images/projects/uncode/uncode-06.jpg",
      "/images/projects/uncode/uncode-07.jpg",
      "/images/projects/uncode/uncode-08.jpg",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "3,300 sq ft",
    scope: "Office Interiors",
    style: "Industrial Warmth",
    intro:
      "A studio with a heartbeat — where exposed structure meets considered detail, and creativity has room to be a little messy.",
    description:
      "Uncode embraces honest materials and unfinished textures, balanced by warm lighting and tactile finishes that make long studio days feel inviting.",
    philosophy:
      "Creative work doesn't happen in sterile rooms. We left the bones visible, brought in real wood and woven fabrics, and let the space age with the team that lives in it.",
    stats: [
      { label: "Workspaces", value: "32" },
      { label: "Total Area", value: "2,400 sqft" },
      { label: "Zones", value: "7" },
      { label: "Timeline", value: "3 months" },
    ],
    palette: [
      { name: "Raw Concrete", hex: "#9C9A95" },
      { name: "Burnt Sienna", hex: "#A1622C" },
      { name: "Charcoal", hex: "#2D2A26" },
      { name: "Linen", hex: "#EDE3D6" },
    ],
  },
  // ── 6. Wavity ──────────────────────────────────────────────────────────────
  {
    slug: "wavity",
    name: "Wavity",
    category: "Tech Workspace",
    image: "/images/projects/wavity.png",
    gallery: [
      "/images/projects/wavity/wavity-01.jpg",
      "/images/projects/wavity/wavity-02.jpg",
      "/images/projects/wavity/wavity-03.jpg",
      "/images/projects/wavity/wavity-04.jpg",
      "/images/projects/wavity/wavity-05.jpg",
      "/images/projects/wavity/wavity-06.jpg",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,500 sq ft",
    scope: "Office Interiors",
    style: "Soft Modern",
    intro:
      "A tech workspace tuned for focus and flow — quiet zones, soft acoustics, and small architectural surprises that keep the day interesting.",
    description:
      "Wavity blends modern lines with organic warmth — curved corners, fluted wood, and pools of light that change how each space feels at different times of day.",
    philosophy:
      "Engineering teams need both stillness and serendipity. We mapped the day — heads-down hours, sync-ups, breaks — and shaped a floor plan that supports each mode without compromise.",
    stats: [
      { label: "Workstations", value: "62" },
      { label: "Total Area", value: "4,400 sqft" },
      { label: "Pods", value: "8" },
      { label: "Timeline", value: "5 months" },
    ],
    palette: [
      { name: "Soft White", hex: "#F4F1EC" },
      { name: "Forest Slate", hex: "#3F4A4A" },
      { name: "Terracotta", hex: "#A1622C" },
      { name: "Cream", hex: "#EDE3D6" },
    ],
  },
  // ── 7. Observant ───────────────────────────────────────────────────────────
  {
    slug: "observant",
    name: "Observant",
    category: "Commercial Office",
    image: "/images/projects/observant.png",
    gallery: [
      "/images/projects/observant/observant-01.png",
      "/images/projects/observant/observant-02.png",
      "/images/projects/observant/observant-03.png",
      "/images/projects/observant/observant-04.png",
      "/images/projects/observant/observant-05.png",
      "/images/projects/observant/observant-06.png",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "3,000 sq ft",
    scope: "Office Interiors",
    style: "Refined Modern",
    intro:
      "A commercial office interior where attention to detail defines every surface — precise, calm, and built for teams that value both form and function.",
    description:
      "Observant is a thoughtfully layered workspace where material choices and spatial planning work in harmony to elevate the daily working experience.",
    philosophy:
      "We believe great workplaces reward attention. Every corner of Observant was designed to be noticed — quietly, on the second look, the way quality always reveals itself.",
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Scope", value: "Office Interior" },
      { label: "Style", value: "Refined Modern" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Cloud White", hex: "#F4F2EE" },
      { name: "Graphite", hex: "#2A2D34" },
      { name: "Brass", hex: "#A08259" },
      { name: "Indigo", hex: "#1E3A6A" },
    ],
  },
  // ── 8. NETS ────────────────────────────────────────────────────────────────
  {
    slug: "nets",
    name: "NETS",
    category: "Corporate Office",
    image: "/images/projects/nets.png",
    gallery: [
      "/images/projects/nets/nets-01.jpg",
      "/images/projects/nets/nets-02.jpg",
      "/images/projects/nets/nets-03.jpg",
      "/images/projects/nets/nets-04.jpg",
      "/images/projects/nets/nets-05.jpg",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,000 sq ft",
    scope: "Office Interiors",
    style: "Modern Corporate",
    intro:
      "A corporate environment designed for clarity and efficiency — where clean lines and purposeful layout support focused, high-performance work.",
    description:
      "NETS is a modern office interior where spatial logic and refined detailing come together to create a workplace that feels confident and considered.",
    philosophy:
      "We built around the work, not around the aesthetic. Every zone was mapped to how the team actually operates — with the result speaking through precision, not decoration.",
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Scope", value: "Office Interior" },
      { label: "Style", value: "Modern Corporate" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Pearl White", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
  },
  // ── 9. Unisoft ─────────────────────────────────────────────────────────────
  {
    slug: "unisoft",
    name: "Unisoft",
    category: "Corporate HQ",
    image: "/images/projects/unisoft.png",
    gallery: [
      "/images/projects/unisoft/unisoft-01.jpg",
      "/images/projects/unisoft/unisoft-02.jpg",
      "/images/projects/unisoft/unisoft-03.jpg",
      "/images/projects/unisoft/unisoft-04.jpg",
      "/images/projects/unisoft/unisoft-05.jpg",
      "/images/projects/unisoft/unisoft-06.jpg",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,000 sq ft",
    scope: "Office Interiors",
    style: "Quiet Corporate",
    intro:
      "A headquarters that feels less like a corporate floor and more like a thoughtfully composed campus — calm, confident, and built for the long view.",
    description:
      "Unisoft's HQ uses generous proportions and a restrained palette to project authority without rigidity, creating a space that scales with the company.",
    philosophy:
      "We resisted the temptation to perform. Instead, we built clarity into the plan, used premium materials sparingly, and let the architecture itself do the brand work.",
    stats: [
      { label: "Workstations", value: "180" },
      { label: "Total Area", value: "12,000 sqft" },
      { label: "Floors", value: "3" },
      { label: "Timeline", value: "9 months" },
    ],
    palette: [
      { name: "Pearl", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
  },
  // ── 10. Socrates ───────────────────────────────────────────────────────────
  {
    slug: "socrates",
    name: "Socrates",
    category: "Modern Office",
    image: "/images/projects/socrates.png",
    gallery: [
      "/images/projects/socrates/socrates-01.png",
      "/images/projects/socrates/socrates-02.png",
      "/images/projects/socrates/socrates-03.png",
      "/images/projects/socrates/socrates-04.png",
      "/images/projects/socrates/socrates-05.png",
      "/images/projects/socrates/socrates-06.png",
    ],
    year: "2024",
    location: "Hyderabad, IN",
    area: "3,500 sq ft",
    scope: "Office Interiors",
    style: "Refined Minimal",
    intro:
      "A workplace that thinks clearly. Socrates pairs disciplined geometry with warm, human-scale moments to create a space teams genuinely love returning to.",
    description:
      "Socrates was designed around focus — long sightlines, calm surfaces, and the right amount of softness to keep an analytical environment from feeling clinical.",
    philosophy:
      "The brief asked for clarity. We answered with rhythm — open work zones balanced with intimate pockets for thinking, conversation, and quiet. A workplace as a tool for better thought.",
    stats: [
      { label: "Workstations", value: "84" },
      { label: "Total Area", value: "5,800 sqft" },
      { label: "Meeting Rooms", value: "9" },
      { label: "Timeline", value: "4 months" },
    ],
    palette: [
      { name: "Cloud White", hex: "#F4F2EE" },
      { name: "Graphite", hex: "#2A2D34" },
      { name: "Brass", hex: "#A08259" },
      { name: "Indigo", hex: "#1E3A6A" },
    ],
  },
  // ── 11. Dental Speciality ──────────────────────────────────────────────────
  {
    slug: "dental-speciality",
    name: "Dental Speciality",
    category: "Premium Clinic",
    image: "/images/projects/dental.png",
    gallery: [
      "/images/projects/dental-speciality/dental-speciality-01.jpg",
      "/images/projects/dental-speciality/dental-speciality-02.jpg",
      "/images/projects/dental-speciality/dental-speciality-03.jpg",
      "/images/projects/dental-speciality/dental-speciality-04.jpg",
      "/images/projects/dental-speciality/dental-speciality-05.jpg",
      "/images/projects/dental-speciality/dental-speciality-06.jpg",
      "/images/projects/dental-speciality/dental-speciality-07.jpg",
    ],
    year: "2025",
    location: "Hyderabad, IN",
    area: "1,800 sq ft",
    scope: "Hospital",
    style: "Calm Clinical",
    intro:
      "A clinic designed to lower the heartbeat the moment you walk in — a hospitality-grade interior wrapped around medical-grade rigour.",
    description:
      "Every surface in this dental speciality is selected for both calm and cleanliness — soft light, rounded forms, and a palette that feels far closer to a boutique hotel than a clinic.",
    philosophy:
      "Patients arrive anxious. We designed the journey from doorway to chair as a sequence of gentle reassurances — colour, scent, scale, sound. The clinical excellence is felt, not announced.",
    stats: [
      { label: "Treatment Rooms", value: "5" },
      { label: "Total Area", value: "1,800 sqft" },
      { label: "Lounge Capacity", value: "12" },
      { label: "Timeline", value: "3 months" },
    ],
    palette: [
      { name: "Bone", hex: "#EFEAE1" },
      { name: "Sage", hex: "#A6B0A0" },
      { name: "Soft Navy", hex: "#2D5099" },
      { name: "Warm Sand", hex: "#D8C4AD" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectWithSlug | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return PROJECTS.findIndex((p) => p.slug === slug);
}

export function getNeighbours(slug: string) {
  const i = getProjectIndex(slug);
  if (i === -1) return null;
  const total = PROJECTS.length;
  return {
    index: i,
    total,
    prev: PROJECTS[(i - 1 + total) % total],
    next: PROJECTS[(i + 1) % total],
  };
}
