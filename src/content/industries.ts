/**
 * Industries content — Figma `C · Industries — Desktop` (`57:502`),
 * transcribed verbatim. Typed and kept out of the components (CLAUDE.md §5).
 *
 * Industry terminology is the approved client wording (it matches the five
 * sector groups on the homepage). Nothing here is invented: no statistics,
 * client names, case studies or claims beyond what the frame states.
 */

import type { Hue } from "./about";
import {
  services,
  type ClosingCtaContent,
  type HomeLink,
  type ProgrammesSectionContent,
} from "./home";

export const industriesMeta = {
  title: "Industries",
  description:
    "We concentrate on capability-intensive, high-standard environments, with real fluency in growth markets.",
};

type Photo = { src: string; alt: string };

/* ------------------------------------------------------------ 01 Page hero */

export const industriesHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Industries" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "Industries we serve",
  title: "Depth in demanding sectors.",
  intro:
    "We concentrate on capability-intensive, high-standard environments, with real fluency in growth markets.",
  cta: { label: "Discuss your sector", href: "/contact", status: "pending" } as HomeLink,
  /**
   * Stock photographs placed in the Figma frame (`57:571`–`57:573`), exported
   * unmodified. Credit records are still owed in `credits.ts` (CLAUDE.md
   * §6.4, open decision #11) — the same applies to every photograph below.
   */
  tiles: {
    leader: {
      src: "/images/ind-hero-leader.jpg",
      alt: "A business leader in a blue suit, arms folded",
    } as Photo,
    manufacturing: {
      src: "/images/ind-hero-manufacturing.jpg",
      alt: "Engineers working around machinery in a manufacturing facility",
    } as Photo,
    session: {
      // The same photograph as the Training Programs "Summer" image.
      src: "/images/training-summer.jpg",
      alt: "A team sharing ideas around a meeting table",
    } as Photo,
  },
  stat: { value: "5", label: "Five sector groups. One standard of excellence." },
};

/* ------------------------------------------------------ 01b Specialisations */

/**
 * Figma `01b · Industry Marquee — Light Variation` (`185:11636`) — the variant
 * placed in the approved frame. The dark/violet variant (`180:10249`) is built
 * too (`tone="dark"`); which one ships is open decision #1 (CLAUDE.md §10).
 *
 * @placeholder Heading wording is pending (open decision #2).
 */
export const specialisations = {
  eyebrow: "Our specialisations",
  title: "Sector expertise. Transformation that lasts.",
  count: "05",
  countLabel: "Specialist sectors",
  /** Spoken once to assistive tech and shown as the reduced-motion static row. */
  summary: "Our specialisations",
  /**
   * @placeholder These five labels are the marquee's own; they do not map
   * 1:1 to the five sector groups below ("Consumer Goods" and "Technology"
   * are not group titles). Client to confirm the list.
   */
  items: ["Healthcare", "Manufacturing", "Consumer Goods", "Hospitality", "Technology"],
};

/* ---------------------------------------------------------- 02 Who we serve */

export const whoWeServe = {
  eyebrow: "Our client",
  title:
    "The leader who has chosen a direction — and now has to make an organization deliver it.",
  description:
    "Chief executives, chief operating officers, human-capital and transformation leaders in the private sector, and permanent secretaries and agency heads in the public sector.",
  momentsLabel: "The trigger is usually a moment of consequence",
  moments: [
    "A growth push",
    "A turnaround",
    "A new market",
    "A new operating model",
    "A service standard that has to rise",
  ],
};

/* ------------------------------------------------------------ 03 Sectors */

export type SectorService = {
  title: string;
  /** Pillar name, e.g. "Training & Capacity Building". */
  pillar: string;
  hue: Hue;
  href: string;
  status: "pending";
};

export type Sector = {
  index: string;
  title: string;
  description: string;
  services: SectorService[];
  image: Photo;
};

/**
 * "How we help" links are the approved service modules from `home.ts`; the
 * pillar and hue are looked up there, so a renamed module fails the build
 * rather than silently drifting.
 */
const serviceFor = (module: string): SectorService => {
  for (const pillar of services.pillars) {
    if ((pillar.modules as string[]).includes(module)) {
      return {
        title: module,
        pillar: pillar.title,
        hue: pillar.segment === "pink" ? "pink" : "violet",
        href: pillar.link.href,
        status: "pending",
      };
    }
  }
  throw new Error(`Unknown service module: ${module}`);
};

export const sectors: Sector[] = [
  {
    index: "01",
    title: "Hospitality & Services",
    description:
      "Five-star service cultures across front-of-house, guest relations and luxury management teams — so every guest experience feels seamless.",
    services: [
      "Hospitality Excellence Training",
      "New-Hire & Onboarding Frameworks",
      "Commercial & Marketing Activation",
    ].map(serviceFor),
    image: {
      src: "/images/ind-hospitality-concierge.jpg",
      alt: "A concierge in a dark suit showing a tablet to a guest with luggage at a marble reception desk",
    },
  },
  {
    index: "02",
    title: "Consumer Markets, Manufacturing & Industry",
    description:
      "Multinationals such as FMCG, consumables and telecommunications, and African industrial groups or holdings — where productivity, safety and compliance are non-negotiable.",
    services: [
      "Functional Sectors (Manufacturing & Healthcare) Training",
      "Technology Platforms & IT Governance",
      "Market Intelligence & Strategic Focus",
    ].map(serviceFor),
    image: {
      src: "/images/ind-consumer.jpg",
      alt: "A worker in a safety helmet operating industrial machinery",
    },
  },
  {
    index: "03",
    title: "Healthcare",
    description:
      "Hospital groups, health systems, pharmaceuticals and training — high-stakes environments where clinical and administrative teams must work as one.",
    services: [
      "Functional Sectors (Manufacturing & Healthcare) Training",
      "Leadership Development & Succession Planning",
      "Integrated Product Development & Digital Transformation",
    ].map(serviceFor),
    image: {
      src: "/images/ind-healthcare-team.jpg",
      alt: "A team of healthcare professionals in scrubs and white coats discussing a case around a laptop",
    },
  },
  {
    index: "04",
    title: "Public Sector, Sustainability & Technology-led Firms",
    description:
      "Think tanks, legislative and executive instruments, agencies, public institutions and high-level one-on-one partners.",
    services: [
      "Market Intelligence & Strategic Focus",
      "Technology Platforms & IT Governance",
      "Leadership Development & Succession Planning",
    ].map(serviceFor),
    image: {
      src: "/images/ind-public.png",
      alt: "Business leaders in a working meeting around a table of plans and a laptop",
    },
  },
  {
    index: "05",
    title: "Conglomerates & Family Enterprises",
    description:
      "Groups, holdings and incorporations, established family enterprises, and ambitious organizations moving into a new stage of growth.",
    services: [
      "Leadership Development & Succession Planning",
      "Market Intelligence & Strategic Focus",
      "Commercial & Marketing Activation",
    ].map(serviceFor),
    image: {
      src: "/images/ind-conglomerates-applause.jpg",
      alt: "A group of colleagues applauding together in a bright office",
    },
  },
];

export const sectorUi = {
  indexLabel: "Sector",
  helpLabel: "How we help — relevant services",
};

/* --------------------------------------------------------- 04 Sector enquiry */

export const sectorEnquiry = {
  overline: "Not listed?",
  title: "Working in a sector not listed here?",
  text: "Our people-first approach applies wherever a standard has to rise. Tell us about your organization and the change you need to make last.",
  cta: { label: "Talk to us", href: "/contact", status: "pending" } as HomeLink,
};

/* ----------------------------------------------------- 05 Training Programs */

/**
 * Figma `05 · Training Programs` (`264:12250`) — a newer variant of the
 * homepage block: no Venue row, dates shown as "To be announced", no
 * "Browse all editions" link, and a link to the full Training Programs page.
 */
export const industriesProgrammes: ProgrammesSectionContent = {
  eyebrow: "Seasonal training programmes",
  title: "Training Programs",
  masthead: "The Working Tribe",
  detailsLabel: "Programme details",
  detailLabels: {
    season: "Season",
    months: "Months",
    format: "Format",
    venue: "Venue",
    dateTime: "Date & time",
    dates: "Dates & times",
  },
  detailRows: ["season", "months", "format", "dates"],
  datesValue: "To be announced",
  registerLabel: "Register your interest",
  browse: null,
  moreLabel: "The full training year",
  archive: {
    label: "View all Training Programs",
    href: "/training-programs",
    status: "live",
  },
  cardLogistics: "Dates and times to be announced",
  coverNameplate: "season",
};

/* ----------------------------------------------------------- 06 Enquiry CTA */

export const industriesClosingCta: ClosingCtaContent = {
  eyebrow: "Your sector",
  title: "Tell us about your sector.",
  description:
    "Share the moment of consequence you are facing — we will show you how capability, built in your people, carries the change.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  email: "hello@theworkingtribe.com",
};
