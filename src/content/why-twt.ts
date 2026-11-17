/**
 * Why TWT content — Figma `I · Why TWT — Desktop` (`108:5091`), transcribed
 * verbatim. Typed and kept out of the components (CLAUDE.md §5).
 *
 * Nothing here is invented.
 */

import type { Hue } from "./about";
import { services, type ClosingCtaContent, type HomeLink } from "./home";

export const whyMeta = {
  title: "Why TWT",
  description:
    "We help leaders turn ambition into lasting results by developing the people who deliver it.",
};

type Photo = { src: string; alt: string };

/* ------------------------------------------------------------ 01 Page hero */

export const whyHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Why TWT" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "Why The Working Tribe",
  title: "Transformation that lasts — because the people own it.",
  statement: "We are an enterprise consultancy.",
  support:
    "We help leaders turn ambition into lasting results by developing the people who deliver it.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  } as HomeLink,
  /**
   * Photographs placed in the Figma frame (`108:5174`, `108:5175`), exported
   * unmodified. Credit records are still owed in `credits.ts` (CLAUDE.md
   * §6.4, open decision #11) — the same applies to every image in this file.
   */
  arch: {
    src: "/images/why-hero-arch.jpg",
    alt: "A professional standing in a modern office",
  } as Photo,
  circle: {
    src: "/images/why-hero-circle.jpg",
    alt: "Colleagues in discussion around a table",
  } as Photo,
};

/* ------------------------------------------- 02 People-first philosophy */

export const whyPhilosophy = {
  eyebrow: "Our people-first philosophy",
  title: "Strategy only results through the people who carry it.",
  intro:
    "We build capability and confidence in your own teams — never dependency — so the change is owned in-house and lasts after we leave.",
  stages: [
    {
      hue: "violet",
      word: "Understand.",
      text: "The people responsible for delivering the change understand where the organization is going — and why.",
    },
    {
      hue: "pink",
      word: "Develop.",
      text: "They develop the capability to get there, built inside your own teams rather than rented from outside.",
    },
    {
      hue: "orange",
      word: "Own.",
      text: "They own the change — so it holds after the engagement ends and keeps improving.",
    },
  ] satisfies { hue: Hue; word: string; text: string }[],
  kaizen: {
    title: "Kaizen, in our DNA",
    text: "Every program we run carries forward the lessons of the last — we measure progress, refine relentlessly and treat the standard as something to raise.",
  },
};

/* --------------------------------------- 03 Why organisations choose TWT */

export const whyChoose = {
  eyebrow: "Why organisations choose TWT",
  contextLine: "Most firms advise and leave — and the change leaves with them.",
  commitmentLine: "We stay through the handoff, until the change is owned in-house.",
  intro:
    "Four strategic anchors shape how we work — and why the change holds after we leave.",
  continuity: {
    title: "Continuity from strategy to people",
    text: "We stay through the handoff into capability and execution, so the work holds after we are gone.",
    image: {
      src: "/images/why-anchor-continuity.jpg",
      alt: "A team working through plans together at a table",
    } as Photo,
  },
  capability: {
    pull: "“Owned in-house, not rented.”",
    label: "Capability, not dependency",
    text: "We build the client’s own people, so the advantage is owned in-house, not rented from us. Our success is measured by what a client can do without us.",
  },
  human: {
    title: "The human side of change, at a strategy-house standard",
    text: "We resolve transformation as a problem of people, and bring the rigor of a genuine consultancy to the part of change that usually gets the least of it.",
    portrait: {
      src: "/images/why-anchor-portrait.jpg",
      alt: "Portrait of a professional at work",
    } as Photo,
  },
  sectors: {
    title: "Depth in demanding sectors",
    text: "We concentrate on capability-intensive, high-standard environments, with real fluency in growth markets.",
    badges: [
      "Hospitality",
      "Manufacturing",
      "Healthcare",
      "Public sector",
      "Conglomerates",
    ],
    image: {
      src: "/images/why-anchor-sectors.jpg",
      alt: "A modern workplace interior",
    } as Photo,
  },
  note: {
    label: "An honest note",
    text: "We are not the right firm for a strategy on paper with nothing more, or a one-off training course with no strategic anchor.",
  },
};

/* ------------------------------------ 04 How we approach transformation */

export const whyApproach = {
  eyebrow: "How we approach transformation",
  title: "From direction to lasting ownership.",
  description: "How our work connects strategy, people and execution.",
  stages: [
    { hue: "violet", title: "Advise", text: "We advise leaders on where to go." },
    {
      hue: "pink",
      title: "Build capability",
      text: "We build the capability to get there.",
    },
    {
      hue: "orange",
      title: "Embed",
      text: "We embed the change through the people who must deliver it.",
    },
    {
      hue: "yellow",
      title: "Stay & raise the standard",
      text: "We stay through the handoff into capability and execution — and, in the spirit of Kaizen, keep raising the standard.",
    },
  ] satisfies { hue: Hue; title: string; text: string }[],
};

/* ---------------------------------------------- 05 Areas of expertise */

/**
 * Extra lines Figma sets under two of the four services. Titles and
 * descriptions come from the approved service copy in `home.ts`, so the two
 * pages cannot drift apart.
 */
const EXPERTISE_NOTES: Record<string, string[]> = {
  "03": ["Leading Innovation · AI and Next-Generation Ideas · Projects"],
  /** @placeholder Tribe Capital packages and timelines are PROVISIONAL (CLAUDE.md §6.5). */
  "04": [
    "SOS Call · Watering Package · A Journey Through",
    "Package timelines are provisional.",
  ],
};

export const whyExpertise = {
  eyebrow: "Our areas of expertise",
  title: "Where this approach comes to life.",
  cta: {
    label: "Explore our services",
    href: "/services",
    status: "live",
  } as HomeLink,
  services: services.pillars.map((pillar) => ({
    number: pillar.number,
    segment: pillar.segment,
    title: pillar.title,
    description: pillar.description,
    notes: EXPERTISE_NOTES[pillar.number] ?? [],
  })),
};

/* ----------------------------------------------------------- 06 Closing CTA */

export const whyClosingCta: ClosingCtaContent = {
  eyebrow: "Why The Working Tribe",
  title: "Let’s make transformation last.",
  description:
    "We help leaders turn ambition into lasting results by developing the people who deliver it.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  email: "hello@theworkingtribe.com",
};
