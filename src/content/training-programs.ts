/**
 * Training Programs content — Figma `Training Programs — Desktop`
 * (`248:10353`) and its registration overlays (`249:10847` Spring,
 * `249:10927` Summer, `249:11007` Autumn, `249:11087` Winter Forum).
 *
 * Programme names, topics, months, audiences and the Virtual Meeting format
 * are CLIENT-CONFIRMED (CLAUDE.md §6.1; source `../Spring Training.docx`,
 * cross-checked 2026-11-12). They are read from `programmes` in `home.ts` so
 * the homepage and this page cannot drift apart. Descriptions and supporting
 * copy are the Figma frame's.
 *
 * Deliberately absent: dates, session times, venues, fees, speakers,
 * certifications. Every programme shows "To be announced" for dates & times.
 */

import type { Hue } from "./about";
import { programmes, type ClosingCtaContent, type Programme } from "./home";

export const trainingMeta = {
  title: "Training Programs",
  description:
    "Four focused programmes across the year — in leadership, innovation, AI and mentorship. Every programme is delivered as a virtual meeting.",
};

/** Shared fact labels and values. */
export const trainingFacts = {
  period: "Programme period",
  delivery: "Delivery",
  deliveryValue: "Virtual meeting",
  dates: "Dates & times",
  datesValue: "To be announced",
  audience: "Who it’s for",
};

/* ------------------------------------------------------------ 01 Page hero */

export const trainingHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    // "Company" is the dropdown group, not a page — rendered as plain text.
    { label: "Company" },
    { label: "Training Programs" },
  ] as { label: string; href?: string }[],
  eyebrow: "Training programs",
  title: "Capability, built season by season.",
  lead: "Four focused programmes across the year — in leadership, innovation, AI and mentorship — for the people who carry organisations forward. Every programme is delivered as a virtual meeting.",
  cta: { label: "Explore the programmes", href: "#programmes" },
  /** Stock photograph placed in the Figma frame. Credit still owed (CLAUDE.md §6.4). */
  image: {
    src: "/images/training-hero.jpg",
    alt: "A participant joining a virtual training session on a laptop",
  },
  facts: [
    { value: "04", label: "Seasonal programmes", accent: true },
    { value: "Virtual", label: "Every programme" },
    { value: "TBA", label: "Dates to be announced" },
  ],
};

/* ------------------------------------------------------ 02 The training year */

export const trainingYear = {
  eyebrow: "The training year",
  title: "Four seasons. Four focused programmes.",
  description:
    "Each season carries its own theme, and every programme runs as a virtual meeting. Exact dates and session times will be announced for each programme.",
  badge: "Dates & times to be announced",
};

/* ------------------------------------------------------------ 03 Programmes */

export type TrainingProgramme = {
  id: Programme["id"];
  index: string;
  hue: Hue;
  name: string;
  topic: string;
  /** "MAR" "APR" "MAY" — the season rail. */
  monthsShort: string[];
  /** "March, April, May". */
  period: string;
  /** "March – May". */
  range: string;
  description: string;
  audience: string[];
  image: { src: string; alt: string };
};

const SHORT = (m: string) => m.slice(0, 3).toUpperCase();

/** Page-specific copy, keyed by programme id. */
const PAGE: Record<
  Programme["id"],
  Pick<TrainingProgramme, "index" | "hue" | "description" | "audience" | "image">
> = {
  spring: {
    index: "01",
    hue: "violet",
    description:
      "A programme on the skills behind effective leadership — for people who lead teams today and those preparing to lead them tomorrow.",
    audience: ["Line Managers", "SME Owners", "Management Trainees", "Undergraduates"],
    image: {
      src: "/images/training-spring.jpg",
      alt: "Business leaders in conversation over a document",
    },
  },
  summer: {
    index: "02",
    hue: "pink",
    description:
      "Explores how organisations create the conditions for new ideas to take hold — for the leaders and future leaders who shape how their businesses grow.",
    audience: [
      "Non-Executives",
      "Enterprise Business Owners",
      "Undergraduates",
      "Management Trainees",
    ],
    image: {
      src: "/images/training-summer.jpg",
      alt: "A team sharing ideas around a meeting table",
    },
  },
  autumn: {
    index: "03",
    hue: "orange",
    description:
      "Focuses on how artificial intelligence can support business growth — for entrepreneurs and emerging professionals ready to put it to work.",
    audience: ["Entrepreneurs", "Management Trainees", "Undergraduates"],
    image: {
      src: "/images/training-autumn.jpg",
      alt: "A professional presenting data on a screen",
    },
  },
  winter: {
    index: "04",
    hue: "yellow",
    description:
      "A mentorship forum built around conversation. A panel drawn from diverse industries leads highly interactive discussions, working through open case scenarios with participants.",
    audience: ["Open to all"],
    image: {
      src: "/images/training-winter.jpg",
      alt: "Women in discussion around a conference table",
    },
  },
};

export const trainingProgrammes: TrainingProgramme[] = programmes.map((p) => ({
  id: p.id,
  name: p.name,
  topic: p.topic,
  monthsShort: p.months.map(SHORT),
  period: p.months.join(", "),
  range: `${p.months[0]} – ${p.months[p.months.length - 1]}`,
  ...PAGE[p.id],
}));

export const programmesSection = {
  title: "The programmes",
  registerLabel: "Register your interest",
};

/** Figma `Programme · Winter Forum (featured)` — the forum format tiles. */
export const winterFormat = [
  { icon: "users", label: "Panel", value: "Diverse industries" },
  { icon: "sparkle", label: "Format", value: "Highly interactive discussions" },
  { icon: "target", label: "Case work", value: "Open case scenarios for discussion" },
] as const;

/* -------------------------------------------------- 04 How registration works */

export const registrationSteps = {
  eyebrow: "Registration",
  title: "Registering your interest is simple.",
  description:
    "Every programme has its own registration form, so you always know which programme you are signing up for.",
  steps: [
    {
      title: "Choose a programme",
      text: "Pick the season and topic that fits you or your team.",
    },
    {
      title: "Register your interest",
      text: "Complete the short form. Your selected programme is shown at the top, so there is no doubt which one you have chosen.",
    },
    {
      title: "Hear from us",
      text: "We will be in touch as dates, times and joining details for the virtual meeting are confirmed.",
    },
  ],
};

/**
 * Registration overlay details line — Figma `249:10847`… (`Selected topic`).
 * Unlike the homepage overlays, these carry no sample dates.
 */
export const trainingOverlayDetails = Object.fromEntries(
  trainingProgrammes.map((p) => [
    p.id,
    [
      p.period,
      trainingFacts.deliveryValue,
      ...(p.id === "winter" ? ["Open to all"] : []),
      "Dates and times to be announced",
    ].join(" · "),
  ]),
) as Record<Programme["id"], string>;

/* ----------------------------------------------------------- 05 Closing CTA */

export const trainingClosingCta: ClosingCtaContent = {
  eyebrow: "Training with TWT",
  title: "Build capability that lasts — one season at a time.",
  description:
    "Register your interest in a seasonal programme, or talk to us about training shaped around your organisation.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  email: "hello@theworkingtribe.com",
};
