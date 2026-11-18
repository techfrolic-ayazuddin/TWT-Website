/**
 * Training & Capacity Building — service detail content.
 *
 * Figma `B · Service Detail Template — Training & Capacity Building`
 * (`56:329`), transcribed verbatim. Typed and kept out of the components
 * (CLAUDE.md §5).
 *
 * The frame is the shared **Service Detail template**: its hero is an instance
 * of `Service Hero` and its module cards are instances of `Service Module`,
 * both of which carry a `Segment` axis. The types here are therefore written
 * for any of the four services, but only Training & Capacity Building is
 * instantiated — the other three are later phases and must not be invented.
 *
 * The service title, description and module NAMES are the approved portfolio
 * from `home.ts`; `moduleOf()` reads each name out of it and throws at build if
 * one is renamed. Everything else (module descriptions and scopes, the value
 * propositions, outcomes and methodology) is copy this frame carries.
 */

import type { IconName } from "@/components/ui/icon";
import type { Hue } from "./about";
import { services, type ClosingCtaContent, type HomeLink } from "./home";

/** The approved service portfolio entry this page documents. */
const PILLAR_INDEX = 0;
export const trainingPillar = services.pillars[PILLAR_INDEX];

const moduleOf = (name: string): string => {
  if (!(trainingPillar.modules as string[]).includes(name)) {
    throw new Error(`Unknown ${trainingPillar.title} module: ${name}`);
  }
  return name;
};

export const serviceTrainingMeta = {
  title: trainingPillar.title,
  description: trainingPillar.description,
};

/* ------------------------------------------------------------ Shared types */

export type ServiceDetailHero = {
  breadcrumb: { label: string; href?: string }[];
  overline: string;
  title: string;
  intro: string;
  cta: HomeLink;
  /**
   * `position` is a CSS `object-position` for heroes whose Figma fill is a
   * `CROP` rather than a centred `FILL` (Advisory). Omitted = centred.
   */
  image: { src: string; alt: string; position?: string };
};

export type ValueProposition = {
  icon: IconName;
  title: string;
  body: string;
};

export type ServiceDetailModule = {
  numeral: string;
  name: string;
  /**
   * Figma gives a description to the Training and Advisory modules only.
   * Global Solutions draws its three modules as name-only cards (`91:3543`),
   * so this is optional and the card simply omits the paragraph — never
   * filled with invented text (CLAUDE.md §6).
   */
  description?: string;
  /**
   * Figma `Service Module` draws a SCOPE block under a hairline. Only the
   * Training variant has approved scope copy, so both fields are optional and
   * the block is omitted when they are absent — never filled with invented
   * text (CLAUDE.md §6).
   */
  scopeLabel?: string;
  scope?: string;
};

export type MethodologyStep = {
  number: string;
  title: string;
  body: string;
};

export type RelatedService = {
  hue: Hue;
  title: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
  /** Tribe Capital only — Figma `Badge/Tone=Placeholder`. */
  badge?: string;
};

/* ----------------------------------------------------- 01 · Service hero */

/** Figma `Service Hero / Segment=Violet` — 1440 × 640, split 720 / 720. */
export const hero: ServiceDetailHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: trainingPillar.title },
  ],
  overline: "Service 01",
  title: trainingPillar.title,
  intro: trainingPillar.description,
  /**
   * Figma draws `Button/Inverse` "Enquire about this service" with no
   * prototype reaction, so its destination is not specified by the design.
   * It goes to Contact, where the same enquiry form lives inline — matching
   * the "Enquire about training" CTA on the Services Overview. It is
   * deliberately NOT wired to the consultation popup, which the designs
   * reserve for "Request a consultation".
   */
  cta: { label: "Enquire about this service", href: "/contact", status: "live" },
  /**
   * The photograph placed in the Figma frame (`01 · Service hero`, hash
   * `7d31a8b80e`, 1207 × 806), exported unmodified. Replaced in the
   * 2026-11-18 Figma image sync. Figma sets the fill to `CROP` with
   * imageTransform [[0.7512, 0, 0.0825], …]: a 720 × 640 window starting
   * 8.25% in, i.e. `object-position` x = 0.0825 / (1 − 0.7512) = 33.2%
   * (verified against Figma's render: MAD 1.57/255, versus 43.6 for a
   * centred cover). The `B2` variants board draws a slightly different pan
   * (38.9%); the template frame is the one this page is built from. Credit
   * record still owed in `credits.ts` (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/service-training-hero-seminar.jpg",
    alt: "A presenter standing before an engaged, seated audience in a bright room",
    position: "33.2% 50%",
  },
};

/* --------------------------------------- 02 · Overview & value proposition */

export const overview = {
  eyebrow: "Overview",
  title: "Close performance gaps. Raise the standard. Build your successors.",
  lead: "Our training is market-led and tailored — white-labelled on your firm’s vision and operational objectives, with sectorial local content for demanding environments such as manufacturing and healthcare.",
  values: [
    {
      icon: "target",
      title: "Bridge performance gaps",
      body: "Baseline where teams are, then build the skills to close the distance.",
    },
    {
      icon: "sparkle",
      title: "Elevate service standards",
      body: "One standard, applied everywhere — from the front desk to the factory floor.",
    },
    {
      icon: "users",
      title: "Cultivate succession planning",
      body: "Prepare high-potential people to step into business-critical roles.",
    },
  ] satisfies ValueProposition[],
};

/* ---------------------------------------------------------- 03 · Modules */

export const modules = {
  eyebrow: "Training modules",
  title: "Four modules, tailored to your organization.",
  description: "Each module is shaped around your vision, your sector and your people.",
  scopeLabel: "Scope",
  items: [
    {
      numeral: "i",
      name: moduleOf("Hospitality Excellence Training"),
      description:
        "Cultivating a five-star service culture across front-of-house, guest relations, and luxury management teams to ensure seamless consumer experiences.",
      scopeLabel: "Scope",
      scope:
        "Standard operating procedures (SOPs) development, premium guest-relations certification, communication etiquette, conflict resolution, and luxury hospitality brand alignment.",
    },
    {
      numeral: "ii",
      name: moduleOf("Functional Sectors (Manufacturing & Healthcare) Training"),
      description:
        "Maximizing workforce productivity, operational safety, and regulatory compliance within high-stakes, specialized industrial environments.",
      scopeLabel: "Scope",
      scope:
        "Technical on-the-job workflows, safety culture enhancement, clinical/administrative coordination, error-reduction strategies, and equipment-utilization frameworks.",
    },
    {
      numeral: "iii",
      name: moduleOf("New-Hire & Onboarding Frameworks"),
      description:
        "Accelerating the time-to-productivity for incoming talent through highly structured, immersive functional skill pathing.",
      scopeLabel: "Scope",
      scope:
        "Cultural integration modules, customized functional skills training, role-play simulators, performance baselining, and departmental compliance pathing.",
    },
    {
      numeral: "iv",
      name: moduleOf("Leadership Development & Succession Planning"),
      description:
        "Identifying, mentoring, and preparing high-potential professionals to confidently step into business-critical executive positions.",
      scopeLabel: "Scope",
      scope:
        "Strategic mentorship design, cross-functional executive coaching, strategic talent alliance consulting, leadership capability tracking, and organizational continuity planning.",
    },
  ] satisfies ServiceDetailModule[],
};

/* ---------------------------------------------- 04 · Imagery & outcomes */

export const outcomes = {
  eyebrow: "Outcomes",
  title: "What changes for your organization.",
  /**
   * Stock photographs placed in the Figma frame, exported unmodified. Credit
   * records still owed (CLAUDE.md §6.4). The circle sits over the lower-right
   * corner of the portrait, with an 8px page-coloured ring, as Figma draws it.
   */
  collage: {
    portrait: {
      src: "/images/service-training-collage-a.jpg",
      alt: "Three colleagues reviewing work together at a desk",
    },
    circle: {
      src: "/images/service-training-collage-b.jpg",
      alt: "A trainee making notes during a session",
    },
  },
  items: [
    "A five-star service culture that guests feel — consistently.",
    "Safer, compliant and more productive operations in high-stakes environments.",
    "New hires productive sooner, with culture and compliance built in.",
    "A ready bench of leaders for business-critical roles.",
  ],
};

/* ------------------------------------------------------ 05 · Methodology */

export const methodology = {
  eyebrow: "How we work",
  title: "From diagnosis to lasting capability.",
  description:
    "A four-stage approach drawn from our Brand Profile: advise, build capability, and help you adopt and sustain change.",
  steps: [
    {
      number: "01",
      title: "Diagnose",
      body: "Baseline performance and capability gaps against your vision and operational objectives.",
    },
    {
      number: "02",
      title: "Design",
      body: "Tailor and white-label modules to your context, sector and local content.",
    },
    {
      number: "03",
      title: "Deliver & coach",
      body: "Immersive, role-play and on-the-job training that builds confidence, never dependency.",
    },
    {
      number: "04",
      title: "Embed & improve",
      body: "Measure progress, refine relentlessly and raise the standard — Kaizen.",
    },
  ] satisfies MethodologyStep[],
};

/* -------------------------------------------------- 06 · Related services */

/** The other three pillars, in portfolio order, with this frame's card copy. */
export const related = {
  eyebrow: "Related services",
  title: "Explore our other services.",
  linkLabel: "Explore service",
  items: [
    {
      hue: "pink",
      title: services.pillars[1].title,
      /**
       * Shorter than the portfolio description in `home.ts` — the card in this
       * frame carries its own copy, transcribed as drawn.
       */
      description:
        "Market entry, regulatory landscapes and digital transformation for international and local brands.",
      href: services.pillars[1].link.href,
      image: {
        // Template card `56:543` (hash `122c501971`) — a different photograph
        // from the Advisory hero/panel (`1368bdf91c`). 2026-11-18 image sync.
        src: "/images/service-card-advisory.jpg",
        alt: "Colleagues reviewing printed charts around a dark boardroom table",
      },
    },
    {
      hue: "orange",
      title: services.pillars[2].title,
      description: services.pillars[2].description,
      href: services.pillars[2].link.href,
      image: {
        // Template card `56:553` (hash `4500ddf357`) — also the Global hero.
        src: "/images/service-global-strategy.jpg",
        alt: "A presenter at a screen in a city-view boardroom, with colleagues seated at a long table",
      },
    },
    {
      hue: "yellow",
      title: services.pillars[3].title,
      description: services.pillars[3].description,
      href: services.pillars[3].link.href,
      image: {
        src: "/images/service-card-capital.jpg",
        alt: "A team gathered around a desk looking at a trading dashboard",
      },
      /** Figma `Badge/Tone=Placeholder` — packages are provisional (§6.5). */
      badge: "Provisional",
    },
  ] satisfies RelatedService[],
};

/* -------------------------------------------------------- 07 · Enquiry CTA */

export const enquiryCta: ClosingCtaContent = {
  eyebrow: "Enquire",
  title: "Discuss your training needs.",
  description:
    "Tell us about your teams, your standard and your timeline — we will tailor a program around your vision.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  /** Figma draws `hello@theworkingtribe.com` on this frame. */
  email: "hello@theworkingtribe.com",
};
