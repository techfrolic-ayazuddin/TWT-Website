/**
 * Global Solutions — service detail content.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SCOPE NOTE — read before extending this file.
 *
 * As with Advisory and Tribe Capital, Figma has **no Global Solutions
 * service-detail frame**. The approved Global Solutions sources are:
 *
 *   · `B2 · Service template — four segment variants` (`56:761`) — the
 *     `Service Hero / Segment=Orange` instance: breadcrumb, `SERVICE 03`,
 *     title, intro, CTA label, `segment/orange/solid` (#BE4B2C, white text)
 *     and photograph.
 *   · `B0 · Services Overview` → `05 · Global Solutions` (`91:3543`) — the
 *     `MODULES` overline and the three module NAMES.
 *   · `F · FAQ — Desktop` → `Topic 04 · Global Solutions` — the approved
 *     topic line used here as the modules heading.
 *   · The approved service portfolio in `home.ts`.
 *
 * **The three modules have no descriptions anywhere in the file.** The
 * Services Overview draws them as name-only cards, and a document-wide search
 * found no longer Global Solutions copy. They are therefore rendered as
 * name-only cards here too, not given invented blurbs (CLAUDE.md §6).
 *
 * The template's Overview statement with value propositions, the outcomes
 * list with its collage, and the four methodology steps have **no Global
 * Solutions copy** and are not built. Each section component takes its
 * content as a prop, so they drop in unchanged once the client supplies:
 *
 *   02 · Overview — an H2 statement, a lead paragraph, and three value
 *        propositions (icon, title, one-line body).
 *   03 · Modules — a one-line description for each of the three modules.
 *   04 · Outcomes — four outcome statements and two photographs.
 *   05 · Methodology — four step titles and bodies.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { services, type ClosingCtaContent, type HomeLink } from "./home";
import { globalService } from "./services";
import type {
  RelatedService,
  ServiceDetailHero,
  ServiceDetailModule,
} from "./service-training";

/** The approved service portfolio entry this page documents. */
export const globalPillar = services.pillars[2];

export const serviceGlobalMeta = {
  title: globalPillar.title,
  description: globalPillar.description,
};

/* ----------------------------------------------------- 01 · Service hero */

/** Figma `Service Hero / Segment=Orange` (`56:761`) — white on #BE4B2C. */
export const hero: ServiceDetailHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: globalPillar.title },
  ],
  overline: "Service 03",
  title: globalPillar.title,
  intro: globalPillar.description,
  /**
   * As on the Training and Advisory pages: Figma gives this button no
   * prototype reaction, so it goes to Contact, where the enquiry form is
   * rendered inline. Only Tribe Capital has its own approved enquiry design.
   */
  cta: { label: "Enquire about this service", href: "/contact", status: "live" },
  /**
   * The photograph Figma places in this variant's hero (`B2` → Orange, hash
   * `4500ddf357`, 1442 × 803), exported unmodified — the same asset the
   * Training template's Global Solutions related-service card uses. Replaced
   * in the 2026-11-18 Figma image sync. Figma now sets this fill to a plain
   * `FILL` (it was a right-hand `CROP` of the previous photograph), so it is
   * a centred `object-cover` (verified against Figma's render: MAD 6.2/255,
   * versus 70.8 for a right-aligned crop). Credit record still owed
   * (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/service-global-strategy.jpg",
    alt: "A presenter at a screen in a city-view boardroom, with colleagues seated at a long table",
  },
};

/* ---------------------------------------------------------- 03 · Modules */

/**
 * The three approved modules. Names are read from `services.ts`, which
 * transcribed them from `91:3543`, so this page and the Services Overview
 * cannot drift apart. Figma numbers them 01–03 there, not i–iii.
 *
 * No module carries a description — see the scope note above.
 */
export const modules = {
  /** The `MODULES` overline on `91:3543`. */
  eyebrow: "Modules",
  /**
   * The approved Global Solutions line from `F · FAQ — Desktop`
   * → `Topic 04 · Global Solutions` → `Topic header`. Used here as the
   * section heading rather than writing a new one.
   */
  title: "Networking and digital platforms that sustain value.",
  items: globalService.modules.map((module) => ({
    numeral: module.number,
    name: module.name,
  })) satisfies ServiceDetailModule[],
  /**
   * The three `Badge/Tone=Orange` chips drawn beside the Global Solutions
   * visual on the Services Overview (`91:3543`).
   */
  chips: globalService.visual.chips,
};

/* -------------------------------------------------- 06 · Related services */

/** The other three pillars, in portfolio order, with their approved copy. */
export const related = {
  eyebrow: "Related services",
  title: "Explore our other services.",
  linkLabel: "Explore service",
  items: [
    {
      hue: "violet",
      title: services.pillars[0].title,
      description: services.pillars[0].description,
      href: services.pillars[0].link.href,
      image: {
        src: "/images/training-workshop.jpg",
        alt: "A workshop in progress around a long table, with facilitators at a whiteboard of sticky notes",
      },
    },
    {
      hue: "pink",
      title: services.pillars[1].title,
      description: services.pillars[1].description,
      href: services.pillars[1].link.href,
      image: {
        src: "/images/service-card-advisory.jpg",
        alt: "Colleagues reviewing printed charts around a dark boardroom table",
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

/**
 * Figma draws no Global Solutions enquiry panel. As on the Advisory page,
 * this reuses the approved, service-neutral closing CTA from
 * `B0 · Services Overview` (`85:1370`) rather than writing new copy.
 *
 * @placeholder Awaiting a Global Solutions enquiry panel, if the client wants
 * one; the Training page has its own ("Discuss your training needs.").
 */
export const enquiryCta: ClosingCtaContent = {
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
  email: "hello@theworkingtribe.com",
};
