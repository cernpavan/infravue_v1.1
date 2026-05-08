import type { Project } from "@/components/sections/ProjectShowcase";

export type ProjectWithSlug = Project & { slug: string };

export const PROJECTS: ProjectWithSlug[] = [
  {
    slug: "sesola",
    name: "Sesola",
    category: "Luxury Residential",
    image: "/images/projects/sesola.png",
    gallery: ["/images/projects/sesola.png"],
    year: "2024",
    location: "Bengaluru, IN",
    area: "3,200 sqft",
    scope: "Full Interior",
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
  {
    slug: "socrates",
    name: "Socrates",
    category: "Modern Office",
    image: "/images/projects/socrates.png",
    gallery: ["/images/projects/socrates.png"],
    year: "2024",
    location: "Hyderabad, IN",
    area: "5,800 sqft",
    scope: "Workplace Design",
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
  {
    slug: "uncode",
    name: "Uncode",
    category: "Creative Studio",
    image: "/images/projects/uncode.png",
    gallery: ["/images/projects/uncode.png"],
    year: "2023",
    location: "Mumbai, IN",
    area: "2,400 sqft",
    scope: "Studio Build-out",
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
  {
    slug: "unisoft",
    name: "Unisoft",
    category: "Corporate HQ",
    image: "/images/projects/unisoft.png",
    gallery: ["/images/projects/unisoft.png"],
    year: "2024",
    location: "Bengaluru, IN",
    area: "12,000 sqft",
    scope: "Headquarters",
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
  {
    slug: "wavity",
    name: "Wavity",
    category: "Tech Workspace",
    image: "/images/projects/wavity.png",
    gallery: ["/images/projects/wavity.png"],
    year: "2023",
    location: "Pune, IN",
    area: "4,400 sqft",
    scope: "Tech Office",
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
  {
    slug: "dental-speciality",
    name: "Dental Speciality",
    category: "Premium Clinic",
    image: "/images/projects/dental.png",
    gallery: ["/images/projects/dental.png"],
    year: "2024",
    location: "Bengaluru, IN",
    area: "1,800 sqft",
    scope: "Medical Interior",
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
  {
    slug: "first-source",
    name: "First Source",
    category: "Commercial Space",
    image: "/images/projects/firstsource.png",
    gallery: ["/images/projects/firstsource.png"],
    year: "2023",
    location: "Chennai, IN",
    area: "9,200 sqft",
    scope: "Commercial Interior",
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
