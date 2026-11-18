/**
 * Tribe Capital — service detail content.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * PROVISIONAL CONTENT WARNING — read before changing anything here.
 *
 * Tribe Capital package definitions, eligibility and KYC-based timelines are
 * **provisional** (CLAUDE.md §6.5). Every package below carries a visible
 * "to confirm" marker, and the enquiry form repeats the caveat beside the
 * selector. None of it may be presented as a guaranteed commitment.
 *
 * There are **no** approved eligibility criteria, interest rates, returns,
 * financing conditions or client outcomes anywhere in Figma. Do not add any.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * SCOPE NOTE — as with Advisory, Figma has no Tribe Capital service-detail
 * frame. The approved Tribe Capital sources are:
 *
 *   · `B2 · Service template — four segment variants` (`56:761`) — the
 *     `Service Hero / Segment=Yellow` instance.
 *   · `03 · Tribe Capital enquiry` (`104:5829`) — the packages panel and the
 *     inline `Form/Tribe Capital Enquiry` (`111:7297`).
 *   · `B0 · Services Overview` → `06 · Tribe Capital` (`91:3583`).
 *
 * The template's Overview statement with value propositions, the outcomes
 * list with its collage, and the four methodology steps have **no Tribe
 * Capital copy** and are therefore not built (§6).
 */

import { services, type HomeLink } from "./home";
import { capitalService } from "./services";
import type { RelatedService, ServiceDetailHero } from "./service-training";

/** The approved service portfolio entry this page documents. */
export const capitalPillar = services.pillars[3];

export const serviceCapitalMeta = {
  title: capitalPillar.title,
  description: capitalPillar.description,
};

/* ----------------------------------------------------- 01 · Service hero */

/**
 * Figma `Service Hero / Segment=Yellow` (`56:761`) — `segment/yellow/solid`
 * (#FFBE2C) with **navy** text, not white (CLAUDE.md §8).
 */
export const hero: ServiceDetailHero = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: capitalPillar.title },
  ],
  overline: "Service 04",
  title: capitalPillar.title,
  intro: capitalPillar.description,
  /**
   * Unlike Training and Advisory, Tribe Capital HAS an approved enquiry
   * design, so this CTA scrolls to the enquiry section on this page rather
   * than leaving for `/contact`.
   */
  cta: { label: "Enquire about this service", href: "#enquiry", status: "live" },
  /**
   * The photograph Figma places in this variant's hero (image `e67d7a92`),
   * exported unmodified. Credit record still owed (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/service-capital-hero.jpg",
    alt: "A business owner reviewing financing paperwork and a phone at a desk",
  },
};

/* ------------------------------------------- 02 · Tribe Capital enquiry */

/**
 * Figma `03 · Tribe Capital enquiry` (`104:5829`): a yellow panel with the
 * packages on the left and the enquiry form on the right.
 *
 * The package names and timelines are read from `services.ts`, which
 * transcribed them from `91:3583` — so this page, the Services Overview and
 * the form selector cannot drift apart.
 */
export const enquiry = {
  /** Anchor target for the hero CTA. */
  id: "enquiry",
  index: capitalService.number,
  overline: "Tribe Capital",
  badge: capitalService.badge,
  title: "Tribe Capital enquiry",
  description: capitalPillar.description,
  packagesLabel: capitalService.packagesLabel,
  /** @placeholder Provisional — kept visible exactly as Figma draws it. */
  provisionalNote: capitalService.provisionalNote,
  packageBadge: capitalService.packageBadge,
  packages: capitalService.packages,
};

/**
 * `Form/Tribe Capital Enquiry` (`111:7297`), transcribed verbatim.
 * Copy Figma does not supply is marked `@placeholder`.
 */
export const enquiryForm = {
  overline: "Tribe Capital enquiry",
  title: "Start a Tribe Capital conversation",
  description: capitalPillar.description,
  requiredNote: "Fields marked * are required.",
  fields: {
    fullName: { label: "Full name", placeholder: "Your full name" },
    email: { label: "Work email", placeholder: "name@company.com" },
    phone: { label: "Phone number", placeholder: "Include your country code" },
    organisation: {
      label: "Company / Organisation",
      placeholder: "Your company or organisation",
    },
    packageChoice: {
      label: "Package of interest",
      /** Figma appends "· provisional" to every timeline in the selector. */
      provisionalSuffix: "provisional",
      helper: "Package timelines are provisional and subject to confirmation.",
    },
    message: {
      label: "Enquiry / message",
      placeholder: "Tell us about your business and what you would like to discuss…",
      maxLength: 500,
    },
    consent: {
      label: "I agree to be contacted about my enquiry",
      description: "Read our privacy policy.",
    },
  },
  submit: "Send enquiry",
  emailAlternative: { lead: "Prefer email?", email: "hello@theworkingtribe.com" },
  /**
   * @placeholder Not in Figma. The form draws no validation copy, so these
   * messages are working copy and need client approval.
   */
  errors: {
    fullName: "Please enter your full name.",
    email: "Please enter a valid work email address.",
    phone: "Please enter a valid phone number, including the country code.",
    organisation: "Please enter your company or organisation.",
    packageChoice: "Please choose the package you are interested in.",
    message: "Please keep your message under 500 characters.",
    consent: "Please confirm that we may contact you about this enquiry.",
  },
  /**
   * @placeholder Not in Figma. There is no form backend yet (CLAUDE.md §9,
   * open decision #5), so a valid submission is NOT sent and Figma's
   * `State=Acknowledgement` is never rendered.
   */
  notSent: {
    title: "Your enquiry has not been sent",
    message:
      "Tribe Capital enquiries cannot be submitted online yet. Nothing has been sent — please email us in the meantime.",
  },
  /**
   * Figma `Form/Tribe Capital Enquiry` → `State=Acknowledgement`
   * (`111:7297`), transcribed verbatim — including the placeholder badge
   * Figma puts on this copy. Rendered ONLY after a submission resolves
   * `{ ok: true }` (CLAUDE.md §9), which the live site never does.
   *
   * @placeholder Marked DRAFT in Figma; needs client approval. Note it
   * promises a confirmation email that has no sender or wording yet (§9),
   * and it must not imply any financing commitment (§6.5).
   */
  acknowledgement: {
    overline: "Enquiry received",
    title: "Thank you — we've received your Tribe Capital enquiry.",
    message:
      "A member of our team will be in touch about your enquiry. A confirmation has been sent to your email address.",
    draftBadge: "Draft wording — pending client approval",
    done: "Done",
  },
};

/* -------------------------------------------------- 03 · Related services */

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
      hue: "orange",
      title: services.pillars[2].title,
      description: services.pillars[2].description,
      href: services.pillars[2].link.href,
      image: {
        src: "/images/service-global-strategy.jpg",
        alt: "A presenter at a screen in a city-view boardroom, with colleagues seated at a long table",
      },
    },
  ] satisfies RelatedService[],
};

/** The hero CTA target, exported so the section and the link cannot drift. */
export const enquiryAnchor: HomeLink = {
  label: hero.cta.label,
  href: `#${enquiry.id}`,
  status: "live",
};
