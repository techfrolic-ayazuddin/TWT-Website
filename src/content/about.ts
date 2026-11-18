/**
 * About Us content — Figma `A · About Us — Desktop` (`54:95`), transcribed
 * verbatim. Typed and kept out of the components (CLAUDE.md §5).
 *
 * Nothing here is invented.
 */

import type { ClosingCtaContent } from "./home";

/** The four brand hues, in the order Figma cycles them. */
export type Hue = "violet" | "pink" | "orange" | "yellow";

export const aboutMeta = {
  title: "About us",
  description:
    "Transformation that lasts because the people own it — built hand in hand with the leaders and teams who must deliver it.",
};

/* ------------------------------------------------------------ 01 Page hero */

export const aboutHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "About us" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "About The Working Tribe",
  title: "A people-first transformation firm.",
  intro:
    "Transformation that lasts because the people own it — built hand in hand with the leaders and teams who must deliver it.",
  /**
   * Stock photograph placed in Figma (`54:159`). Its credit record is not yet
   * in `credits.ts` — the in-scope image set is still being reconciled with
   * the client (CLAUDE.md §6.4, open decision #11).
   */
  image: {
    src: "/images/about-hero.jpg",
    alt: "Colleagues working together around a table in a bright office",
    width: 1500,
    height: 1001,
  },
  /**
   * Figma `Caption card` (`54:161` / `54:162`). The copy was rewritten in
   * Figma and is transcribed verbatim, Oxford comma included. The label is
   * drawn `UI/Overline` (UPPER), so it is stored in sentence case and the
   * style upper-cases it.
   */
  caption: {
    label: "Working globally",
    text: "Delivering expertise across hospitality, manufacturing, healthcare, technology, and the public sector to drive sustainable growth and lasting transformation.",
  },
};

/* ---------------------------------------------------------- 02 Positioning */

export const positioning = {
  eyebrow: "Our positioning",
  title: "We don’t hand over words as strategies.",
  lead: "TWT is a people-first transformation firm. Equipped with industry experts and multi-sector research and development data, we have found that most businesses lack the can-do to carry their transformation through — so we build that will inside the business, in the very people who will unfold the change.",
  paragraphs: [
    "One conviction at a time, until the entire business becomes the act. Strategy only results through the people who carry it, so lasting change transforms structure into the culture of the organization.",
    "We advise leaders on where to go, and we build the capability to get there. Rather than leave a report behind, we stick and stay to move the business to growth and readiness for expansion.",
  ],
  pullQuote: "TWT is your confidential, lasting transformation partner.",
};

/* ----------------------------------------------------- 03 Vision & mission */

export const visionMission = {
  sectionLabel: "Vision and mission",
  vision: {
    label: "Our vision",
    statement:
      "To become the global standard for people-led transformation — a firm organizations trust when the change must last.",
  },
  mission: {
    label: "Our mission",
    statement:
      "We help leaders turn ambition into lasting results by developing the people who deliver it.",
    detail:
      "We advise, we build capability, and we help organizations adopt and sustain change, holding ourselves to continuous improvement so that every engagement leaves a client stronger than we found them.",
  },
};

/* ---------------------------------------------------------- 04 Core values */

export type CoreValue = { title: string; text: string; hue: Hue };

export const coreValues = {
  eyebrow: "Core values",
  title: "What we hold ourselves to.",
  values: [
    {
      title: "Service",
      hue: "violet",
      text: "We approach work as service, leading with humility, respect, and integrity. We measure ourselves by what a client can do after we leave.",
    },
    {
      title: "People before process",
      hue: "pink",
      text: "Organizations rise or fall on their people, so we build capability and confidence, never dependency. We hand the advantage to the client rather than rent it to them.",
    },
    {
      title: "Excellence as standard",
      hue: "orange",
      text: "We hold one standard and apply it everywhere, from a factory floor to a government ministry. Good enough is not a category we recognize.",
    },
    {
      title: "Commitment",
      hue: "yellow",
      text: "We stay the course, standing with clients through the difficult parts until the change is real and owned, not just recommended.",
    },
    {
      title: "Adaptability",
      hue: "violet",
      text: "We adjust quickly as needs and conditions shift, and we do it without lowering the standard.",
    },
  ] satisfies CoreValue[],
};

/* ------------------------------------------- 05 People-first philosophy */

export const philosophy = {
  eyebrow: "Our philosophy",
  title: "People first. Kaizen always.",
  description:
    "Embedded in TWT’s DNA is the Japanese philosophy of Kaizen — continuous and deliberate improvement. Every program we run carries forward the lessons of the last, so our methods sharpen and our clients gain more over time.",
  steps: [
    { title: "Advise", text: "We advise leaders on where to go." },
    {
      title: "Build capability",
      text: "We build the capability to get there — through the people who must deliver it.",
    },
    {
      title: "Adopt & sustain",
      text: "We help organizations adopt and sustain change, measuring, refining and raising the standard.",
    },
  ],
  /** Stock photograph placed in Figma (`54:221`). Credit pending — see `aboutHero.image`. */
  image: {
    src: "/images/about-philosophy.jpg",
    alt: "Two colleagues reviewing work together at a laptop",
    width: 1500,
    height: 1001,
  },
};

/* ------------------------------------------------------ 06 Differentiators */

export type Anchor = { title: string; text: string; hue: Hue };

export const differentiators = {
  eyebrow: "What sets us apart",
  title: "Four anchors. One standard.",
  description: "The strategic anchors that make change hold after we are gone.",
  anchors: [
    {
      hue: "pink",
      title: "Continuity from strategy to people",
      text: "Most firms advise and leave, and the change leaves with them. We stay through the handoff into capability and execution.",
    },
    {
      hue: "orange",
      title: "Capability, not dependency",
      text: "We build the client’s own people, so the advantage is owned in-house. Success is measured by what a client can do without us.",
    },
    {
      hue: "yellow",
      title: "The human side of change",
      text: "We resolve transformation as a problem of people, with the rigor of a genuine strategy house.",
    },
    {
      hue: "violet",
      title: "Depth in demanding sectors",
      text: "Capability-intensive, high-standard environments, with real fluency in growth markets.",
    },
  ] satisfies Anchor[],
  note: {
    label: "An honest note",
    text: "We are not the right firm for a client who wants a strategy on paper, left behind and nothing more, or a one-off training course with no strategic anchor. Our value shows up when the change must last and be owned.",
  },
};

/* ----------------------------------------------------------- 07 Closing CTA */

export const aboutClosingCta: ClosingCtaContent = {
  eyebrow: "Work with us",
  title: "Let’s build change your people own.",
  description:
    "Tell us where you want to go — we will build the capability to get there, together with the people who must deliver it.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  email: "hello@theworkingtribe.com",
};
