/**
 * Services Overview content — Figma `B0 · Services Overview — Desktop`
 * (`85:923`), transcribed verbatim. Typed and kept out of the components
 * (CLAUDE.md §5).
 *
 * The four service pillars, their titles, descriptions and module NAMES are
 * the approved content already held in `home.ts`. This frame adds a short
 * description to each module, plus the overview-only copy (the connection
 * diagram, the benefit badges, the anchors and the sector map). Nothing here
 * is invented: no statistics, client names, case studies or claims beyond
 * what the frame states.
 *
 * `moduleOf()` reads each module name out of `services.pillars`, so a rename
 * in the approved portfolio fails the build here instead of letting the two
 * pages drift apart.
 */

import type { IconName } from "@/components/ui/icon";
import type { Hue } from "./about";
import { services, type ClosingCtaContent, type HomeLink } from "./home";

export const servicesMeta = {
  title: "Services",
  description:
    "We advise leaders on where to go, and we build the capability to get there — embedding the change through the people who must deliver it.",
};

type PillarId = "training" | "advisory" | "global" | "capital";

/** Index into the approved portfolio — the four pillars, in frame order. */
const PILLAR_INDEX: Record<PillarId, number> = {
  training: 0,
  advisory: 1,
  global: 2,
  capital: 3,
};

export const pillarOf = (id: PillarId) => services.pillars[PILLAR_INDEX[id]];

/**
 * Returns a module name, having checked it is one of that pillar's approved
 * modules. Throws at build time otherwise, so this page can never show a
 * module the service portfolio does not list.
 */
const moduleOf = (id: PillarId, name: string): string => {
  const pillar = pillarOf(id);
  if (!(pillar.modules as string[]).includes(name)) {
    throw new Error(`Unknown ${pillar.title} module: ${name}`);
  }
  return name;
};

/* ------------------------------------------------------------ 01 Page hero */

export const servicesHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Services" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "Our services",
  title: "Advice and capability, delivered as one.",
  intro:
    "We advise leaders on where to go, and we build the capability to get there — embedding the change through the people who must deliver it.",
  primaryCta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  } as HomeLink,
  secondaryCta: {
    label: "Explore industries",
    href: "/industries",
    status: "live",
  } as HomeLink,
  indexLabel: "Service index",
  /** Figma `Approach chip` — the three-step approach, drawn over the image. */
  approach: ["Advise", "Build capability", "Adopt & sustain"],
  /**
   * The photograph placed in the Figma frame (`87:1494`, hash `9fe45a3bc7`,
   * 1205 × 808), exported unmodified. Replaced in the 2026-11-18 Figma image
   * sync. Figma sets the fill to `CROP` with imageTransform
   * [[1, 0, 0.0004], [0, 0.466, 0.1732]] — a full-width, 400 px-tall window
   * starting 17.32% down, i.e. `object-position` y = 0.1732 / (1 − 0.466) =
   * 32.4% (verified against Figma's render: MAD 9.0/255 at the plateau,
   * versus 63.4 for a centred cover). No attribution is carried in Figma —
   * credit record still owed (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/services-hero-presentation.jpg",
    alt: "A presenter in a boardroom speaking to a team seated around a table, beside a screen of charts",
    position: "50% 32.4%",
  },
};

/** The four pillars, as the hero's `Service index` card lists them. */
export const serviceIndex: { id: PillarId; number: string; hue: Hue }[] = [
  { id: "training", number: "01", hue: "violet" },
  { id: "advisory", number: "02", hue: "pink" },
  { id: "global", number: "03", hue: "orange" },
  { id: "capital", number: "04", hue: "yellow" },
];

/* ------------------------------------------- 02 How our services connect */

export const connection = {
  eyebrow: "One integrated approach",
  title: "Where to go — and the capability to get there.",
  description:
    "Most firms advise and leave, and the change leaves with them. Our two practices work as one, so strategy is carried through by the people who must deliver it.",
  /** Figma draws the two practices either side of the Kaizen node. */
  practices: [
    {
      id: "advisory" as PillarId,
      hue: "pink" as Hue,
      role: "Where to go",
      title: "Advisory & Management Consulting",
      description:
        "Market entry, regulatory landscapes, commercial activation and digital transformation — clarity on direction.",
    },
    {
      id: "training" as PillarId,
      hue: "violet" as Hue,
      role: "The capability to get there",
      title: "Training & Capacity Building",
      description:
        "Tailored capacity-building that bridges performance gaps, elevates service standards and cultivates succession.",
    },
  ],
  connector: {
    icon: "refresh" as IconName,
    caption: "Embedded through your people · Kaizen",
  },
};

/* ----------------------------------------------------- 03–06 The pillars */

export type ServiceModule = { name: string; description?: string };

/**
 * Figma marks the two practices `SERVICE · CONFIRMED` and the other two
 * `SERVICE`. Transcribed as drawn — it is a status the designs state, not a
 * judgement made here.
 */
export type ServiceStatusLabel = "Service · Confirmed" | "Service";

/* 03 · Training & Capacity Building — image left, modules as a numbered list */

export const trainingService = {
  id: "training" as PillarId,
  number: "01",
  hue: "violet" as Hue,
  statusLabel: "Service · Confirmed" as ServiceStatusLabel,
  /** Figma numbers these modules i–iv rather than 01–04. */
  modules: [
    {
      numeral: "i",
      name: moduleOf("training", "Hospitality Excellence Training"),
      description:
        "A five-star service culture across front-of-house, guest relations and luxury management teams.",
    },
    {
      numeral: "ii",
      name: moduleOf(
        "training",
        "Functional Sectors (Manufacturing & Healthcare) Training",
      ),
      description:
        "Productivity, operational safety and regulatory compliance in high-stakes environments.",
    },
    {
      numeral: "iii",
      name: moduleOf("training", "New-Hire & Onboarding Frameworks"),
      description:
        "Faster time-to-productivity through structured, immersive functional skill pathing.",
    },
    {
      numeral: "iv",
      name: moduleOf("training", "Leadership Development & Succession Planning"),
      description:
        "Preparing high-potential professionals for business-critical executive roles.",
    },
  ],
  benefits: [
    "Bridge performance gaps",
    "Elevate service standards",
    "Cultivate succession planning",
  ],
  /** Figma `Button/Outline` — a plain link to Contact; there is no training form. */
  enquire: {
    label: "Enquire about training",
    href: "/contact",
    status: "live",
  } as HomeLink,
  /**
   * The photograph placed in the Figma frame (`85:1077`, hash `787927efd3`,
   * 803 × 805), exported unmodified. Replaced in the 2026-11-18 Figma image
   * sync; a plain `FILL`, so a centred `object-cover`. The same file is used
   * by the Why TWT hero arch and by the "Training" related-service card on
   * the other three detail pages. Credit record still owed (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/training-workshop.jpg",
    alt: "A workshop in progress around a long table, with facilitators at a whiteboard of sticky notes",
  },
};

/* 04 · Advisory & Management Consulting — soft panel, modules in two columns */

export const advisoryService = {
  id: "advisory" as PillarId,
  number: "02",
  hue: "pink" as Hue,
  statusLabel: "Service · Confirmed" as ServiceStatusLabel,
  modules: [
    {
      name: moduleOf("advisory", "Market Intelligence & Strategic Focus"),
      description:
        "Data, demographic forecasts and regulatory clarity for sustainable market entry.",
    },
    {
      name: moduleOf("advisory", "Commercial & Marketing Activation"),
      description:
        "High-converting sales funnels and tech-driven marketing that build brand equity.",
    },
    {
      name: moduleOf("advisory", "Technology Platforms & IT Governance"),
      description: "Secure, resilient, corporate-aligned technology environments.",
    },
    {
      name: moduleOf(
        "advisory",
        "Integrated Product Development & Digital Transformation",
      ),
      description: "Legacy infrastructure modernised into agile, integrated ecosystems.",
    },
  ] satisfies ServiceModule[],
  benefits: ["Market entry", "Regulatory clarity", "Digital transformation"],
  /**
   * The photograph placed in the Figma frame (`85:1156`, hash `1368bdf91c`,
   * 1038 × 800), exported unmodified. Replaced in the 2026-11-18 Figma image
   * sync. Figma sets the fill to `CROP` with imageTransform
   * [[0.5766, 0, 0.2115], [0, 1, 0]] — a 520 × 695 window onto the full-height
   * photograph, starting 21.15% in. That is `object-position` x =
   * 0.2115 / (1 − 0.5766) = 49.95%, i.e. centred (verified against Figma's
   * render: MAD 1.06/255).
   *
   * The file carries no C2PA/attribution metadata and Figma names no
   * photographer, so there is no credit to record.
   *
   * @placeholder Imagery supplied through Figma — confirm with the client
   * that it is final (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/services-advisory-laptop.jpg",
    alt: "Three colleagues in discussion around a laptop at a meeting table",
    position: "50% 50%",
  },
};

/* 05 · Global Solutions — copy left, an abstract visual right */

export const globalService = {
  id: "global" as PillarId,
  number: "03",
  hue: "orange" as Hue,
  statusLabel: "Service" as ServiceStatusLabel,
  modulesLabel: "Modules",
  modules: [
    { number: "01", name: moduleOf("global", "Leading Innovation") },
    { number: "02", name: moduleOf("global", "AI and Next-Generation Ideas") },
    { number: "03", name: moduleOf("global", "Projects") },
  ],
  visual: {
    icon: "globe" as IconName,
    chips: ["Networking", "Digital platforms", "Sustainable value"],
  },
};

/* 06 · Tribe Capital — provisional throughout */

export const capitalService = {
  id: "capital" as PillarId,
  number: "04",
  hue: "yellow" as Hue,
  statusLabel: "Service" as ServiceStatusLabel,
  /** Figma `Badge/Tone=Placeholder` on the index row. */
  badge: "Provisional",
  packagesLabel: "Financing packages",
  /**
   * @placeholder Package definitions, eligibility and KYC timelines are
   * PROVISIONAL and await client confirmation (CLAUDE.md §6.5). The caption
   * and the per-package badges are drawn in Figma and are kept deliberately.
   */
  provisionalNote:
    "Package definitions, eligibility and KYC-based timelines are provisional and subject to confirmation.",
  packageBadge: "To confirm",
  packages: [
    { step: "1", name: "SOS Call", timeline: "Within one week of KYC." },
    { step: "2", name: "Watering Package", timeline: "Within 90 days." },
    {
      step: "3",
      name: "A Journey Through",
      timeline: "Continuous financing within 12 months of KYC.",
    },
  ],
};

/* ------------------------------------------------------ 07 Why work with us */

export const whyWorkWithUs = {
  eyebrow: "Why The Working Tribe",
  title: "From strategy to capability — without the handoff gap.",
  description:
    "Most firms advise and leave, and the change leaves with them. We stay through the handoff into capability and execution.",
  kaizen: {
    icon: "refresh" as IconName,
    title: "Kaizen, in our DNA",
    body: "Every program we run carries forward the lessons of the last — we measure progress, refine relentlessly and raise the standard.",
  },
  anchors: [
    {
      number: "01",
      title: "Continuity from strategy to people",
      body: "We stay through the handoff into capability and execution, so the work holds after we are gone.",
    },
    {
      number: "02",
      title: "Capability, not dependency",
      body: "We build the client’s own people, so the advantage is owned in-house, not rented from us. Our success is measured by what a client can do without us.",
    },
    {
      number: "03",
      title: "The human side of change, at a strategy-house standard",
      body: "We resolve transformation as a problem of people, and bring the rigor of a genuine consultancy to the part of change that usually gets the least of it.",
    },
    {
      number: "04",
      title: "Depth in demanding sectors",
      body: "We concentrate on capability-intensive, high-standard environments, with real fluency in growth markets.",
    },
  ],
};

/* ------------------------------------------------- 08 Services across sectors */

export type SectorRow = {
  title: string;
  icon: IconName;
  training: string[];
  advisory: string[];
};

export const sectorMap = {
  eyebrow: "Services × Sectors",
  title: "Where each practice makes the difference.",
  description: "How our modules typically apply across the five sector groups we serve.",
  cta: { label: "Explore industries", href: "/industries", status: "live" } as HomeLink,
  columns: {
    sector: "Sector",
    training: pillarOf("training").title,
    advisory: pillarOf("advisory").title,
  },
  rows: [
    {
      title: "Hospitality & Services",
      icon: "building",
      training: [
        moduleOf("training", "Hospitality Excellence Training"),
        moduleOf("training", "New-Hire & Onboarding Frameworks"),
      ],
      advisory: [moduleOf("advisory", "Commercial & Marketing Activation")],
    },
    {
      title: "Consumer Markets, Manufacturing & Industry",
      icon: "factory",
      training: [
        moduleOf("training", "Functional Sectors (Manufacturing & Healthcare) Training"),
      ],
      advisory: [
        moduleOf("advisory", "Technology Platforms & IT Governance"),
        moduleOf("advisory", "Market Intelligence & Strategic Focus"),
      ],
    },
    {
      title: "Healthcare",
      icon: "heart-pulse",
      training: [
        moduleOf("training", "Functional Sectors (Manufacturing & Healthcare) Training"),
        moduleOf("training", "Leadership Development & Succession Planning"),
      ],
      advisory: [
        moduleOf("advisory", "Integrated Product Development & Digital Transformation"),
      ],
    },
    {
      title: "Public Sector, Sustainability & Technology-led Firms",
      icon: "landmark",
      training: [moduleOf("training", "Leadership Development & Succession Planning")],
      advisory: [
        moduleOf("advisory", "Market Intelligence & Strategic Focus"),
        moduleOf("advisory", "Technology Platforms & IT Governance"),
      ],
    },
    {
      title: "Conglomerates & Family Enterprises",
      icon: "briefcase",
      training: [moduleOf("training", "Leadership Development & Succession Planning")],
      advisory: [
        moduleOf("advisory", "Market Intelligence & Strategic Focus"),
        moduleOf("advisory", "Commercial & Marketing Activation"),
      ],
    },
  ] satisfies SectorRow[],
};

/* ------------------------------------------------------------ 09 Closing CTA */

export const servicesClosingCta: ClosingCtaContent = {
  eyebrow: "Not sure where to start?",
  title: "Let’s find the right mix for you.",
  description:
    "Tell us where you want to go. We will recommend the right blend of advisory and capability-building — then help your people own it.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  } as HomeLink,
  /** Figma draws `hello@theworkingtribe.com` on this frame. */
  email: "hello@theworkingtribe.com",
};
