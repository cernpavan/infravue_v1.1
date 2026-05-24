import type { Project } from "@/components/sections/ProjectShowcase";

export type ProjectWithSlug = Project & { slug: string };

/**
 * Single source of truth for every project.
 *
 * Field → surface mapping:
 *   • intro        → hero subhead under the project name (route page)
 *   • description  → "The Story" lead paragraph (route page)
 *   • philosophy   → secondary paragraph below the story (route page)
 *   • overview     → preserved 2-paragraph version (used by JSON-LD / future surfaces)
 *   • year / location / area / scope → meta strip (route page)
 *   • category     → eyebrow above the hero title (route page) + JSON-LD label
 *   • image        → homepage card thumbnail + hero background
 *   • gallery      → modal grid + lightbox + detail frames
 */
export const PROJECTS: ProjectWithSlug[] = [
  // ── 1. NIAT ──────────────────────────────────────────────────────────────
  {
    slug: "niat",
    name: "NIAT",
    category: "Edtech Institute",
    image: "/images/projects/niat.webp",
    gallery: [
      "/images/projects/niat/niat-01.webp",
      "/images/projects/niat/niat-02.webp",
      "/images/projects/niat/niat-03.webp",
      "/images/projects/niat/niat-04.webp",
      "/images/projects/niat/niat-05.webp",
      "/images/projects/niat/niat-06.webp",
      "/images/projects/niat/niat-07.webp",
      "/images/projects/niat/niat-08.webp",
      "/images/projects/niat/niat-09.webp",
      "/images/projects/niat/niat-10.webp",
    ],
    year: "2025",
    location: "Pune, IN",
    area: "15,000 sq ft",
    scope: "Edtech Institute",
    style: "Educational Interiors",
    intro:
      "NIAT is a modern upskilling and training institute interior design project created to deliver a focused, collaborative, and engaging learning environment.",
    description:
      "Designed with contemporary educational interiors, functional classroom planning, and clean architectural aesthetics, the space supports learning, student interaction, and everyday functionality.",
    philosophy:
      "The project features spacious training classrooms, collaborative learning areas, faculty workspaces, modern seating layouts, and organized circulation spaces designed to enhance comfort, productivity, and seamless movement within the institute. Through customized interior solutions and turnkey interior execution, Infravue Interiors delivered a smart educational space tailored to the institute's operational and learning requirements.",
    overview: [
      "Designed with contemporary educational interiors, functional classroom planning, and clean architectural aesthetics, the space supports learning, student interaction, and everyday functionality.",
      "The project features spacious training classrooms, collaborative learning areas, faculty workspaces, modern seating layouts, and organized circulation spaces, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2025" },
      { label: "Total Area", value: "15,000 sq ft" },
      { label: "Scope", value: "Edtech Institute" },
      { label: "Location", value: "Pune" },
    ],
    palette: [
      { name: "Pearl White", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "NIAT educational institute interior design project by Infravue Interiors Pune",
    galleryAlts: [
      "NIAT modern classroom interior with modular desks and ergonomic seating",
      "Educational training room design with spacious seating arrangement at NIAT",
      "Contemporary learning space featuring modern desks and digital display screen",
      "Professional institute classroom interior with functional furniture layout",
      "Modern educational workspace designed for student learning and collaboration",
      "Minimalist faculty cabin interior with workstation and contemporary office furniture",
      "NIAT meeting room with glass wall graphics and collaborative workspace design",
      "NIAT reception area interior with branded feature wall and modern seating",
      "Administrative office corridor with glass partitions and clean contemporary design",
      "Training auditorium interior with digital presentation screen and modern seating arrangement",
    ],
  },
  // ── 2. Sesola ────────────────────────────────────────────────────────────
  {
    slug: "sesola",
    name: "Sesola",
    category: "Commercial Workspace",
    image: "/images/projects/sesola.webp",
    gallery: [
      "/images/projects/sesola/sesola-01.webp",
      "/images/projects/sesola/sesola-02.webp",
      "/images/projects/sesola/sesola-03.webp",
      "/images/projects/sesola/sesola-04.webp",
      "/images/projects/sesola/sesola-05.webp",
      "/images/projects/sesola/sesola-06.webp",
      "/images/projects/sesola/sesola-07.webp",
      "/images/projects/sesola/sesola-08.webp",
    ],
    year: "2025",
    location: "Hyderabad, IN",
    area: "3,200 sq ft",
    scope: "Office Interiors",
    style: "Luxury Commercial",
    intro:
      "Sesola is a luxury commercial interior design project developed with a modern, minimalist, and functional design approach to create a refined workplace environment.",
    description:
      "The space combines premium textures, warm lighting, contemporary workspace planning, and customized furniture to deliver a sophisticated and welcoming office experience.",
    philosophy:
      "The project features elegant reception interiors, thoughtfully designed office interiors, glass partition systems, and seamless architectural detailing that enhance functionality, professionalism, and visual balance. Through customized interior solutions and turnkey interior execution, Infravue Interiors delivered a modern commercial workspace tailored to the client's brand identity and operational requirements.",
    overview: [
      "The space combines premium textures, warm lighting, contemporary workspace planning, and customized furniture to deliver a sophisticated and welcoming office experience.",
      "Elegant reception interiors, glass partition systems, and refined architectural detailing, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2025" },
      { label: "Total Area", value: "3,200 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Warm Ivory", hex: "#EDE3D6" },
      { name: "Brushed Oak", hex: "#A1622C" },
      { name: "Deep Navy", hex: "#1E3A6A" },
      { name: "Soft Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "Sesola office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Sesola office reception area with branded feature wall and modern reception desk",
      "Contemporary office lobby design with custom reception counter at Sesola Hyderabad",
      "Modern executive office cabin with premium furniture and collaborative seating",
      "Sophisticated manager cabin interior with illuminated branding wall and workspace design",
      "Premium office reception space with glass partitions and elegant waiting area",
      "Custom-designed wooden reception desk with integrated lighting in Sesola office",
      "Modern office entrance lobby featuring frosted glass partitions and contemporary interiors",
      "Corporate meeting room interior with conference table and glass partition walls",
      "Professional office conference space designed for collaboration and client meetings",
    ],
  },
  // ── 3. First Source ─────────────────────────────────────────────────────
  {
    slug: "first-source",
    name: "First Source",
    category: "Corporate Office",
    image: "/images/projects/firstsource.webp",
    gallery: [
      "/images/projects/first-source/first-source-01.webp",
      "/images/projects/first-source/first-source-02.webp",
      "/images/projects/first-source/first-source-03.webp",
      "/images/projects/first-source/first-source-04.webp",
      "/images/projects/first-source/first-source-05.webp",
      "/images/projects/first-source/first-source-06.webp",
      "/images/projects/first-source/first-source-07.webp",
      "/images/projects/first-source/first-source-08.webp",
    ],
    year: "2024",
    location: "Hyderabad, IN",
    area: "35,000 sq ft",
    scope: "Office Interiors",
    style: "Modern Commercial",
    intro:
      "First Source is a modern commercial interior design project created to deliver a collaborative, functional, and experience-driven workplace environment.",
    description:
      "Designed with contemporary office interiors, smart workspace planning, and hospitality-inspired spaces, the project enhances employee comfort, productivity, and workplace efficiency through practical and modern design.",
    philosophy:
      "The space features premium reception interiors, spacious cafeteria seating, collaborative meeting spaces, breakout zones, lounge areas, and clean architectural detailing that create a balanced and engaging office atmosphere. Through customized interior solutions, modern lighting concepts, premium finishes, and turnkey interior execution, Infravue Interiors delivered a refined commercial workspace tailored to the client's operational and brand requirements.",
    overview: [
      "Designed with contemporary office interiors, smart workspace planning, and hospitality-inspired spaces, the project enhances employee comfort, productivity, and workplace efficiency.",
      "Premium reception interiors, cafeteria seating, collaborative meeting spaces, breakout zones, and lounge areas, crafted with modern lighting, premium finishes, and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Total Area", value: "35,000 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Ivory", hex: "#EDE3D6" },
      { name: "Walnut", hex: "#7A4A20" },
      { name: "Slate Navy", hex: "#1E3A6A" },
      { name: "Brass", hex: "#A1622C" },
    ],
    heroAlt:
      "FirstSource office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "FirstSource employee lounge area with modern seating and contemporary office interiors",
      "Office breakout zone with collaborative seating and modern workspace design at FirstSource",
      "FirstSource corporate reception desk with branded feature wall and premium office interiors",
      "Modern collaboration space with bar-height seating and panoramic office views",
      "Spacious corporate office lobby with contemporary seating and elegant interior design",
      "FirstSource employee cafeteria with communal dining tables and industrial-style office interiors",
      "Modern office corridor featuring acoustic ceiling panels and innovative workspace design",
      "Contemporary corporate hallway with glass partitions and functional circulation space",
    ],
  },
  // ── 4. SRIAS Lifespaces ─────────────────────────────────────────────────
  {
    slug: "srias-lifespaces",
    name: "SRIAS Lifespaces",
    category: "Commercial Workspace",
    image: "/images/projects/srias.webp",
    gallery: [
      "/images/projects/srias-lifespaces/srias-lifespaces-01.webp",
      "/images/projects/srias-lifespaces/srias-lifespaces-02.webp",
      "/images/projects/srias-lifespaces/srias-lifespaces-03.webp",
      "/images/projects/srias-lifespaces/srias-lifespaces-04.webp",
      "/images/projects/srias-lifespaces/srias-lifespaces-05.webp",
      "/images/projects/srias-lifespaces/srias-lifespaces-06.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "5,500 sq ft",
    scope: "Office Interiors",
    style: "Refined Commercial",
    intro:
      "SRIAS Lifespaces is a modern commercial interior design project that combines architectural elegance with functional workspace interiors.",
    description:
      "Designed with contemporary aesthetics, premium finishes, and spacious layouts, the project creates a sophisticated and welcoming commercial environment tailored for modern business spaces.",
    philosophy:
      "The project features a grand entrance lobby, modern glass partitions, refined seating areas, high ceilings, elegant lighting concepts, and textured wall finishes that enhance openness, functionality, and visual appeal. Through customized interior solutions and turnkey interior execution, Infravue Interiors delivered a refined commercial space designed for long-term functionality, seamless workplace experience, and modern design standards.",
    overview: [
      "Designed with contemporary aesthetics, premium finishes, and spacious layouts, the project creates a sophisticated and welcoming commercial environment tailored for modern business spaces.",
      "A grand entrance lobby, glass partitions, refined seating areas, and textured wall finishes, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "5,500 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Warm Ivory", hex: "#EDE3D6" },
      { name: "Brushed Oak", hex: "#A1622C" },
      { name: "Deep Navy", hex: "#1E3A6A" },
      { name: "Soft Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "SRIAS Lifespaces commercial office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "SRIAS Lifespaces commercial building exterior with modern glass façade architecture",
      "SRIAS Lifespaces reception lobby featuring premium finishes and contemporary interior design",
      "Modern commercial office building exterior with geometric façade design at SRIAS Lifespaces",
      "Spacious commercial office atrium with decorative feature wall and premium interior finishes",
      "Corporate office entrance with frameless glass partitions and modern workspace interiors",
      "Executive waiting lounge with floor-to-ceiling windows and contemporary seating design",
    ],
  },
  // ── 5. Uncode ────────────────────────────────────────────────────────────
  {
    slug: "uncode",
    name: "Uncode",
    category: "Creative Workspace",
    image: "/images/projects/uncode.webp",
    gallery: [
      "/images/projects/uncode/uncode-01.webp",
      "/images/projects/uncode/uncode-02.webp",
      "/images/projects/uncode/uncode-03.webp",
      "/images/projects/uncode/uncode-04.webp",
      "/images/projects/uncode/uncode-05.webp",
      "/images/projects/uncode/uncode-06.webp",
      "/images/projects/uncode/uncode-07.webp",
      "/images/projects/uncode/uncode-08.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "3,300 sq ft",
    scope: "Office Interiors",
    style: "Industrial Modern",
    intro:
      "Uncode is a modern creative workspace and commercial interior design project developed to create a collaborative, energetic, and visually engaging office environment.",
    description:
      "Designed with contemporary office interiors, industrial-style elements, and open workspace planning, the project balances functionality, creativity, and workplace flexibility.",
    philosophy:
      "The interiors feature collaborative workstation layouts, modern meeting spaces, exposed ceiling concepts, premium lighting, creative wall graphics, and customized furniture solutions designed to enhance productivity and team interaction. Through customized interior solutions and turnkey interior execution, Infravue Interiors delivered a modern commercial workspace tailored to the client's creative culture, operational requirements, and brand identity.",
    overview: [
      "Designed with contemporary office interiors, industrial-style elements, and open workspace planning, the project balances functionality, creativity, and workplace flexibility.",
      "Collaborative workstation layouts, exposed ceiling concepts, premium lighting, and creative wall graphics, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "3,300 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Raw Concrete", hex: "#9C9A95" },
      { name: "Burnt Sienna", hex: "#A1622C" },
      { name: "Charcoal", hex: "#2D2A26" },
      { name: "Linen", hex: "#EDE3D6" },
    ],
    heroAlt:
      "Uncode office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Uncode open office workspace with collaborative desk layout and industrial-style interiors",
      "Modern open-plan office with ergonomic workstations and exposed ceiling design at Uncode",
      "Contemporary office workspace featuring modular desks and creative branding elements",
      "Collaborative workplace environment with team seating and modern office interiors",
      "Creative meeting room interior with geometric feature wall and collaborative workspace design",
      "Uncode reception desk with modern waiting lounge and contemporary office interiors",
      "Open office floor with flexible workstation layout and industrial-inspired ceiling design",
      "Creative office breakout area featuring world map wall graphics and informal seating",
      "Modern technology office interior designed for productivity and team collaboration",
    ],
  },
  // ── 6. Wavity ────────────────────────────────────────────────────────────
  {
    slug: "wavity",
    name: "Wavity",
    category: "Tech Workspace",
    image: "/images/projects/wavity.webp",
    gallery: [
      "/images/projects/wavity/wavity-01.webp",
      "/images/projects/wavity/wavity-02.webp",
      "/images/projects/wavity/wavity-03.webp",
      "/images/projects/wavity/wavity-04.webp",
      "/images/projects/wavity/wavity-05.webp",
      "/images/projects/wavity/wavity-06.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,500 sq ft",
    scope: "Office Interiors",
    style: "Modern Tech",
    intro:
      "Wavity is a modern tech office interior design project created to build a productive, collaborative, and employee-focused workspace environment.",
    description:
      "Designed with contemporary office interiors, smart workspace planning, and functional layouts, the project supports modern work culture, team interaction, and operational efficiency.",
    philosophy:
      "The space features glass meeting cabins, collaborative workstation layouts, modern conference rooms, breakout areas, minimal reception interiors, and open office planning designed to enhance comfort, flexibility, and productivity. Through customized interior solutions, premium finishes, modern lighting concepts, and turnkey interior solutions, Infravue Interiors delivered a refined workspace tailored to the client's operational requirements, workplace culture, and brand environment.",
    overview: [
      "Designed with contemporary office interiors, smart workspace planning, and functional layouts, the project supports modern work culture, team interaction, and operational efficiency.",
      "Glass meeting cabins, collaborative workstations, conference rooms, breakout areas, and minimal reception interiors, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "2,500 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Soft White", hex: "#F4F1EC" },
      { name: "Forest Slate", hex: "#3F4A4A" },
      { name: "Terracotta", hex: "#A1622C" },
      { name: "Cream", hex: "#EDE3D6" },
    ],
    heroAlt:
      "Wavity office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Wavity glass-enclosed meeting room with modern office furniture and contemporary interiors",
      "Wavity office reception desk with branded feature wall and modern workspace design",
      "Modern conference room with ergonomic seating and collaborative meeting space at Wavity",
      "Open-plan office workspace with modular desks and employee collaboration zones",
      "Contemporary office workstations designed for productivity and team collaboration",
      "Modern office cafeteria with casual seating and employee breakout area at Wavity",
    ],
  },
  // ── 7. Observant ─────────────────────────────────────────────────────────
  {
    slug: "observant",
    name: "Observant",
    category: "Corporate Office",
    image: "/images/projects/observant.webp",
    gallery: [
      "/images/projects/observant/observant-01.webp",
      "/images/projects/observant/observant-02.webp",
      "/images/projects/observant/observant-03.webp",
      "/images/projects/observant/observant-04.webp",
      "/images/projects/observant/observant-05.webp",
      "/images/projects/observant/observant-06.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "3,000 sq ft",
    scope: "Office Interiors",
    style: "Refined Modern",
    intro:
      "Observant is a modern office interior design project created to deliver a calm, professional, and visually refined workspace environment.",
    description:
      "Designed with contemporary office interiors, premium materials, warm lighting concepts, and smart workspace planning, the project balances functionality, comfort, and modern corporate aesthetics.",
    philosophy:
      "The project features elegant reception interiors, executive workspaces, collaborative office areas, contemporary meeting rooms, and customized furniture solutions designed to enhance productivity and workplace efficiency. Through customized interior solutions, premium finishes, and turnkey interior solutions, Infravue Interiors delivered a sophisticated office space tailored to the client's operational needs, workplace culture, and brand identity.",
    overview: [
      "Designed with contemporary office interiors, premium materials, warm lighting concepts, and smart workspace planning, the project balances functionality, comfort, and modern corporate aesthetics.",
      "Elegant reception interiors, executive workspaces, collaborative office areas, and contemporary meeting rooms, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "3,000 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Cloud White", hex: "#F4F2EE" },
      { name: "Graphite", hex: "#2A2D34" },
      { name: "Brass", hex: "#A08259" },
      { name: "Indigo", hex: "#1E3A6A" },
    ],
    heroAlt:
      "Observant office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Observant office reception area featuring custom world map wall art and premium interior finishes",
      "Modern office waiting lounge with comfortable seating and contemporary workspace interiors",
      "Executive reception desk with illuminated feature wall and elegant office interior design",
      "Contemporary conference room with collaborative meeting table and ergonomic office seating",
      "Executive office cabin with modern workstation furniture and premium storage solutions",
    ],
  },
  // ── 8. NETS ──────────────────────────────────────────────────────────────
  {
    slug: "nets",
    name: "NETS",
    category: "Corporate Office",
    image: "/images/projects/nets.webp",
    gallery: [
      "/images/projects/nets/nets-01.webp",
      "/images/projects/nets/nets-02.webp",
      "/images/projects/nets/nets-03.webp",
      "/images/projects/nets/nets-04.webp",
      "/images/projects/nets/nets-05.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,000 sq ft",
    scope: "Office Interiors",
    style: "Modern Corporate",
    intro:
      "NETS is a modern corporate office interior design project developed to create a professional, efficient, and visually balanced workspace environment.",
    description:
      "Designed with contemporary office interiors, clean architectural lines, premium textures, and smart workspace planning, the project supports productivity, functionality, and modern workplace efficiency.",
    philosophy:
      "The project features executive cabins, modern meeting rooms, collaborative office layouts, glass partition systems, and customized workspace solutions designed to enhance employee comfort and operational performance. Through premium office interiors, customized interior solutions, and turnkey interior solutions, Infravue Interiors delivered a refined corporate workspace tailored to the client's operational requirements and brand identity.",
    overview: [
      "Designed with contemporary office interiors, clean architectural lines, premium textures, and smart workspace planning, the project supports productivity, functionality, and modern workplace efficiency.",
      "Executive cabins, modern meeting rooms, collaborative office layouts, and glass partition systems, delivered through premium office interiors and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "2,000 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Pearl White", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "NETS office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Modern corporate office featuring glass-walled cabins and contemporary interior design",
      "Professional meeting room designed with transparent partitions and ergonomic furniture",
      "Premium office workspace with architectural glass partitions and functional layouts",
      "Corporate office interior balancing privacy and collaboration through modern design",
      "Executive workspace with custom furniture and sophisticated office aesthetics",
    ],
  },
  // ── 9. Unisoft ───────────────────────────────────────────────────────────
  {
    slug: "unisoft",
    name: "Unisoft",
    category: "Corporate Headquarters",
    image: "/images/projects/unisoft.webp",
    gallery: [
      "/images/projects/unisoft/unisoft-01.webp",
      "/images/projects/unisoft/unisoft-02.webp",
      "/images/projects/unisoft/unisoft-03.webp",
      "/images/projects/unisoft/unisoft-04.webp",
      "/images/projects/unisoft/unisoft-05.webp",
      "/images/projects/unisoft/unisoft-06.webp",
    ],
    year: "2023",
    location: "Hyderabad, IN",
    area: "2,000 sq ft",
    scope: "Office Interiors",
    style: "Quiet Corporate",
    intro:
      "Unisoft is a modern headquarters office interior design project created to deliver a clean, functional, and professional corporate workspace environment.",
    description:
      "Designed with contemporary office interiors, minimal aesthetics, and efficient workspace planning, the project supports productivity, collaboration, and seamless business operations.",
    philosophy:
      "The project features a modern reception area, executive cabins, collaborative meeting rooms, focused workspaces, and functional office layouts designed with simplicity, comfort, and practicality. Through customized interior solutions, premium office interiors, and turnkey interior solutions, Infravue Interiors delivered a refined corporate workspace tailored to the client's operational requirements, workplace culture, and brand identity.",
    overview: [
      "Designed with contemporary office interiors, minimal aesthetics, and efficient workspace planning, the project supports productivity, collaboration, and seamless business operations.",
      "A modern reception area, executive cabins, collaborative meeting rooms, and functional office layouts, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2023" },
      { label: "Total Area", value: "2,000 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Pearl", hex: "#F2EFE9" },
      { name: "Navy", hex: "#1E3A6A" },
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "Unisoft office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Modern reception lobby featuring Unisoft branding and contemporary office interiors",
      "Collaborative discussion room designed for meetings and workplace productivity",
      "Private office workstation with clean architectural lines and modern furniture",
      "Functional office cabin interior with exposed ceiling elements and workspace efficiency",
      "Professional boardroom designed for team meetings and business collaboration",
      "Minimalist executive workspace with ergonomic furniture and premium finishes",
    ],
  },
  // ── 10. Socrates ─────────────────────────────────────────────────────────
  {
    slug: "socrates",
    name: "Socrates",
    category: "Corporate Workspace",
    image: "/images/projects/socrates.webp",
    gallery: [
      "/images/projects/socrates/socrates-01.webp",
      "/images/projects/socrates/socrates-02.webp",
      "/images/projects/socrates/socrates-03.webp",
      "/images/projects/socrates/socrates-04.webp",
      "/images/projects/socrates/socrates-05.webp",
      "/images/projects/socrates/socrates-06.webp",
    ],
    year: "2024",
    location: "Hyderabad, IN",
    area: "3,500 sq ft",
    scope: "Office Interiors",
    style: "Refined Minimal",
    intro:
      "Socrates is a modern workspace and office interior design project created to deliver a focused, collaborative, and visually refined corporate environment.",
    description:
      "Designed with contemporary office interiors, clean architectural lines, smart workspace planning, and warm lighting concepts, the project supports productivity, functionality, and employee comfort.",
    philosophy:
      "The project features contemporary meeting rooms, executive cabins, collaborative workstations, open office layouts, and premium interior detailing designed to balance professionalism and workplace efficiency. Through customized interior solutions, premium office interiors, and turnkey interior solutions, Infravue Interiors delivered a modern corporate workspace tailored to the client's operational requirements and workplace culture.",
    overview: [
      "Designed with contemporary office interiors, clean architectural lines, smart workspace planning, and warm lighting concepts, the project supports productivity, functionality, and employee comfort.",
      "Contemporary meeting rooms, executive cabins, collaborative workstations, and open office layouts, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2024" },
      { label: "Total Area", value: "3,500 sq ft" },
      { label: "Scope", value: "Office Interiors" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Cloud White", hex: "#F4F2EE" },
      { name: "Graphite", hex: "#2A2D34" },
      { name: "Brass", hex: "#A08259" },
      { name: "Indigo", hex: "#1E3A6A" },
    ],
    heroAlt:
      "Socrates office interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Socrates office reception entrance with glass partitions and contemporary lighting design",
      "Modern executive workspace with ergonomic furniture and minimalist office interiors",
      "Professional conference room with collaborative meeting table and ergonomic office chairs",
      "Contemporary office cabin featuring custom shelving and premium workspace design",
      "Open-plan office workspace with modular desks and modern corporate interiors",
      "Socrates corporate office featuring curved workstation layout and employee collaboration zones",
    ],
  },
  // ── 11. Dental Speciality ────────────────────────────────────────────────
  {
    slug: "dental-speciality",
    name: "Dental Speciality",
    category: "Healthcare Interior",
    image: "/images/projects/dental.webp",
    gallery: [
      "/images/projects/dental-speciality/dental-speciality-01.webp",
      "/images/projects/dental-speciality/dental-speciality-02.webp",
      "/images/projects/dental-speciality/dental-speciality-03.webp",
      "/images/projects/dental-speciality/dental-speciality-04.webp",
      "/images/projects/dental-speciality/dental-speciality-05.webp",
      "/images/projects/dental-speciality/dental-speciality-06.webp",
      "/images/projects/dental-speciality/dental-speciality-07.webp",
    ],
    year: "2025",
    location: "Hyderabad, IN",
    area: "1,800 sq ft",
    scope: "Hospital",
    style: "Calm Clinical",
    intro:
      "Dental Speciality is a modern healthcare and clinic interior design project created to deliver a calm, hygienic, and patient-friendly environment.",
    description:
      "Designed with contemporary medical interiors, clean architectural aesthetics, and functional space planning, the project enhances patient comfort, clinical efficiency, and everyday functionality.",
    philosophy:
      "The project features premium treatment rooms, modern dental workspaces, elegant reception interiors, comfortable waiting lounges, and customized clinic layouts designed to maintain cleanliness, openness, and professional healthcare standards. Through customized interior solutions and turnkey interior solutions, Infravue Interiors delivered a modern healthcare space tailored to the clinic's operational requirements and patient experience.",
    overview: [
      "Designed with contemporary medical interiors, clean architectural aesthetics, and functional space planning, the project enhances patient comfort, clinical efficiency, and everyday functionality.",
      "Premium treatment rooms, modern dental workspaces, elegant reception interiors, and comfortable waiting lounges, delivered through customized interior solutions and turnkey interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2025" },
      { label: "Total Area", value: "1,800 sq ft" },
      { label: "Scope", value: "Hospital" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Bone", hex: "#EFEAE1" },
      { name: "Sage", hex: "#A6B0A0" },
      { name: "Soft Navy", hex: "#2D5099" },
      { name: "Warm Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "Dental Speciality clinic interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Modern dental clinic entrance with decorative lighting and premium healthcare interiors",
      "Modern dental treatment room with advanced equipment and patient-focused interior design",
      "Dental clinic operatory featuring treatment chair and functional healthcare workspace layout",
      "Contemporary dental clinic reception with elegant seating and welcoming patient environment",
      "Comfortable patient waiting area with modern sofas and clean healthcare interiors",
      "Advanced dental treatment area with ergonomic equipment and clinical workspace design",
    ],
  },
  // ── 12. Float Brewery ────────────────────────────────────────────────────
  // Slug retained (`float-cover`) so prior URLs / sitemap entries do not break.
  {
    slug: "float-cover",
    name: "Float Brewery",
    category: "Brewery & Hospitality",
    image: "/images/projects/float-cover.webp",
    gallery: [
      "/images/projects/Float-Cover/float-cover-01.webp",
      "/images/projects/Float-Cover/float-cover-02.webp",
      "/images/projects/Float-Cover/float-cover-03.webp",
      "/images/projects/Float-Cover/float-cover-04.webp",
      "/images/projects/Float-Cover/float-cover-05.webp",
      "/images/projects/Float-Cover/float-cover-06.webp",
      "/images/projects/Float-Cover/float-cover-07.webp",
      "/images/projects/Float-Cover/float-cover-08.webp",
      "/images/projects/Float-Cover/float-cover-09.webp",
      "/images/projects/Float-Cover/float-cover-10.webp",
      "/images/projects/Float-Cover/float-cover-11.webp",
    ],
    year: "2025",
    location: "Hyderabad, IN",
    area: "4,200 sq ft",
    scope: "Brewery & Hospitality",
    style: "Premium Hospitality",
    intro:
      "Float Brewery is a contemporary brewery and hospitality interior design project created to deliver a premium and immersive guest experience through modern commercial interior design, warm ambience, and refined aesthetics.",
    description:
      "Designed with earthy textures, ambient lighting concepts, sculptural architectural elements, and thoughtfully planned seating layouts, the space balances luxury, comfort, and functionality for modern F&B environments.",
    philosophy:
      "The project features customized bar counters, textured feature walls, designer ceilings, lounge seating zones, and premium hospitality interiors designed to enhance customer engagement and overall visual appeal. Through customized interior solutions and turnkey commercial interior execution, Infravue Interiors delivered a modern brewery interior tailored to the brand identity, guest experience, and operational requirements of the space.",
    overview: [
      "Designed with earthy textures, ambient lighting concepts, sculptural architectural elements, and thoughtfully planned seating layouts, the space balances luxury, comfort, and functionality for modern F&B environments.",
      "Customized bar counters, textured feature walls, designer ceilings, and lounge seating zones, delivered through customized interior solutions and turnkey commercial interior execution by Infravue Interiors.",
    ],
    stats: [
      { label: "Completed", value: "2025" },
      { label: "Total Area", value: "4,200 sq ft" },
      { label: "Scope", value: "Brewery & Hospitality" },
      { label: "Location", value: "Hyderabad" },
    ],
    palette: [
      { name: "Warm Walnut", hex: "#7A4A20" },
      { name: "Brass", hex: "#A08259" },
      { name: "Deep Navy", hex: "#1E3A6A" },
      { name: "Soft Sand", hex: "#D8C4AD" },
    ],
    heroAlt:
      "Float Brewery restaurant and brewery interior design project by Infravue Interiors Hyderabad",
    galleryAlts: [
      "Float Brewery entrance lounge featuring rustic textures and ambient restaurant lighting",
      "Restaurant interior with sculptural tree-inspired design element and contemporary seating",
      "Float Brewery dining space with custom lighting and premium hospitality interiors",
      "Modern brewery bar area with high seating and warm ambient lighting design",
      "Contemporary restaurant seating area with decorative illuminated wall features",
      "Float Brewery dining hall with elegant furniture and modern hospitality interiors",
      "Spacious restaurant interior with contemporary dining tables and ambient ceiling lighting",
      "Brewery reception counter with textured stone finishes and premium interior aesthetics",
      "Modern restaurant dining space designed for guest comfort and social gatherings",
      "Float Brewery entrance featuring decorative glass doors and welcoming hospitality design",
      "Float Brewery premium restaurant interior showcasing elegant dining layouts and warm lighting",
    ],
  },
];

/**
 * Returns the SEO-friendly hero/cover alt text for a project.
 * Falls back to a descriptive auto-generated string if `heroAlt` is missing,
 * so every image always has a meaningful, unique alt value.
 */
export function getProjectHeroAlt(project: Project): string {
  if (project.heroAlt && project.heroAlt.trim().length > 0) {
    return project.heroAlt;
  }
  return `${project.name} ${project.category} interior design project by Infravue Interiors${
    project.location ? `, ${project.location}` : ""
  }`;
}

/**
 * Returns the SEO-friendly alt text for an individual gallery image.
 * Indexed against `galleryAlts`; falls back to a descriptive, unique
 * auto-generated string for any image without an explicit mapping
 * (e.g. images discovered dynamically from `public/images/projects/{slug}/`).
 */
export function getProjectGalleryAlt(
  project: Project,
  index: number,
  total?: number
): string {
  const explicit = project.galleryAlts?.[index];
  if (explicit && explicit.trim().length > 0) return explicit;
  const position = total ? ` ${index + 1} of ${total}` : ` ${index + 1}`;
  return `${project.name} interior detail${position}, ${project.category} design by Infravue Interiors${
    project.location ? `, ${project.location}` : ""
  }`;
}

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
