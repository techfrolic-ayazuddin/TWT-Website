/**
 * Advisory & Management Consulting — service detail content.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SCOPE NOTE — read before extending this file.
 *
 * Figma has **no Advisory service-detail frame**. The only approved Advisory
 * sources in the file are:
 *
 *   · `B2 · Service template — four segment variants` (`56:761`) — the
 *     `Service Hero / Segment=Pink` instance: breadcrumb, `SERVICE 02`,
 *     title, intro, CTA label, hue and photograph.
 *   · `B0 · Services Overview — Desktop` → `04 · Advisory & Management
 *     Consulting` (`85:1123`) — the four module names and descriptions.
 *   · The approved service portfolio in `home.ts`.
 *
 * The shared Service Detail template also has an Overview statement with
 * three value propositions, a `SCOPE` line per module, an outcomes list with
 * a two-image collage, and four methodology steps. **None of those exist for
 * Advisory** — the Training frame's versions are training-specific copy and
 * are not transferable.
 *
 * Those sections are therefore NOT built, rather than filled with invented
 * copy (CLAUDE.md §6). The section components already take their content as
 * props, so each one drops in unchanged once the client supplies:
 *
 *   02 · Overview — an H2 statement, a lead paragraph, and three value
 *        propositions (icon, title, one-line body).
 *   03 · Modules — a `SCOPE` line for each of the four modules.
 *   04 · Outcomes — four outcome statements and two photographs.
 *   05 · Methodology — four step titles and bodies for advisory engagements.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { services, type ClosingCtaContent, type HomeLink } from "./home";
import { advisoryService } from "./services";
import type {
  RelatedService,
  ServiceDetailHero,
  ServiceDetailModule,
} from "./service-training";

/** The approved service portfolio entry this page documents. */
export const advisoryPillar = services.pillars[1];

export const serviceAdvisoryMeta = {
  title: advisoryPillar.title,
  description: advisoryPillar.description,
};

/* ----------------------------------------------------- 01 · Service hero */

/** Figma `Service Hero / Segment=Pink` (`56:761`) — `segment/pink/solid`. */
export const hero: ServiceDetailHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: advisoryPillar.title },
  ],
  overline: "Service 02",
  title: advisoryPillar.title,
  intro: advisoryPillar.description,
  /** As on the Training page: no prototype reaction, so it goes to Contact. */
  cta: { label: "Enquire about this service", href: "/contact", status: "live" },
  /**
   * The photograph Figma places in this variant's hero (`B2` → Pink, hash
   * `1368bdf91c`, 1038 × 800), exported unmodified — the same asset the
   * Services Overview panel uses. Replaced in the 2026-11-18 Figma image
   * sync. B2 sets the fill to `CROP` with imageTransform
   * [[0.8671, 0, 0.0326], …]: a 360 × 320 window starting 3.26% in, i.e.
   * `object-position` x = 0.0326 / (1 − 0.8671) = 24.5% (verified against
   * Figma's render: MAD 5.4/255, versus 47.6 for a centred cover). No
   * attribution exists in Figma — credit record still owed (§6.4).
   */
  image: {
    src: "/images/services-advisory-laptop.jpg",
    alt: "Three colleagues in discussion around a laptop at a meeting table",
    position: "24.5% 50%",
  },
};

/* ---------------------------------------------------------- 03 · Modules */

/**
 * The four approved modules. Names and descriptions are read straight from
 * `services.ts`, which transcribed them from `85:1123` — so this page and the
 * Services Overview cannot drift apart. Figma numbers the template's modules
 * i–iv.
 */
const NUMERALS = ["i", "ii", "iii", "iv"];

export const modules = {
  /**
   * @placeholder The section heading is NOT drawn for Advisory anywhere in
   * Figma. These three strings are the Training frame's heading
   * ("TRAINING MODULES" / "Four modules, tailored to your organization." /
   * "Each module is shaped around your vision, your sector and your people.")
   * re-pointed at advisory work, so the section is not headless. They are
   * working copy and need client approval — the module names and descriptions
   * below them ARE approved (CLAUDE.md §6).
   */
  eyebrow: "Advisory modules",
  title: "Four modules, tailored to your market.",
  description: "Each module is shaped around your market, your sector and your people.",
  items: advisoryService.modules.map((module, i) => ({
    numeral: NUMERALS[i],
    name: module.name,
    description: module.description,
  })) satisfies ServiceDetailModule[],
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
      hue: "orange",
      title: services.pillars[2].title,
      description: services.pillars[2].description,
      href: services.pillars[2].link.href,
      image: {
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

/**
 * Figma draws no Advisory enquiry panel. Rather than write new copy, this
 * reuses the approved closing CTA from `B0 · Services Overview` (`85:1370`),
 * which is deliberately service-neutral — the same panel component, the same
 * words already signed off for the Services Overview.
 *
 * @placeholder Awaiting an Advisory-specific enquiry panel, if the client
 * wants one; the Training page has its own ("Discuss your training needs.").
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
