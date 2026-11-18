/**
 * Contact Us content — Figma `E · Contact Us — Desktop` (`90:4009`),
 * transcribed verbatim. Typed and kept out of the components (CLAUDE.md §5).
 *
 * Contact details are NOT duplicated here: the email, website, phone numbers
 * and office addresses all come from `site.ts`, so the page and the footer
 * (which appears on this very page) can never disagree. The disputed numbers
 * are rendered exactly as stored and never made dialable (CLAUDE.md §6.3).
 */

import type { ClosingCtaContent, HomeLink } from "./home";

export const contactMeta = {
  title: "Contact us",
  description:
    "Tell us where you want to go. We will help you find the right starting point — advisory, capability-building, or both.",
};

/* ------------------------------------------------------------ 01 Page hero */

export const contactHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Contact us" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "Contact us",
  title: "Let’s talk about the change that must last.",
  intro:
    "Tell us where you want to go. We will help you find the right starting point — advisory, capability-building, or both.",
  /** Figma prototypes this to the enquiry section — it scrolls, it does not navigate. */
  primaryCta: { label: "Start your enquiry", href: "#enquiry" },
  secondaryCta: { label: "Email us" },
  /**
   * Figma links this to `03 · Tribe Capital enquiry` (`104:5829`), a frame
   * that is NOT part of this page and is not built (its packages are
   * provisional — CLAUDE.md §6.5). It points at the Tribe Capital service
   * page, the destination this project already uses for that pillar.
   */
  tribeCapital: {
    label: "Enquiring about Tribe Capital?",
    href: "/services/tribe-capital",
    status: "live",
  } as HomeLink,
  /**
   * The photograph placed in the Figma frame (`90:4092`), exported unmodified
   * (1071 × 802). Figma sets the fill to `CROP` with imageTransform
   * [[0.59, 0, 0.2198], [0, 1, 0]] — a 520 × 660 window onto the full-height
   * photograph, i.e. `object-position` x = 0.2198 / (1 − 0.59) = 53.6%
   * (verified against Figma's render: MAD 0.44/255, versus 30.3 for a centred
   * cover).
   *
   * No provenance metadata is embedded and Figma records no source or
   * photographer for it, so no credit is recorded (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/contact-hero-conversation.jpg",
    alt: "A man in a navy blazer listening and smiling during a conversation across a desk with a laptop",
    position: "53.6% 50%",
  },
  promise: "Your confidential, lasting transformation partner.",
};

/* -------------------------------------------------------------- 02 Enquiry */

export const contactEnquiry = {
  /** Heading above the "other ways to reach us" list. */
  directOverline: "Other ways to reach us",
  directTitle: "Talk to us directly.",
  labels: {
    email: "Email",
    website: "Website",
    /** `PHONE · USA` etc. — the region is appended. */
    phone: "Phone",
  },
  actions: {
    email: "Email us",
    call: "Call",
    visit: "Visit",
    /**
     * Announced to assistive tech on the two office rows, never drawn — the
     * address is the visible text and Figma's action slot stays empty there.
     * It states both the destination and that the tab is new, which a sighted
     * user infers from the external-link behaviour.
     */
    directions: "View on Google Maps, opens in a new tab",
  },
  map: {
    title: "Accra · Shanghai",
    note: "Maps to be embedded once office addresses are confirmed.",
  },
};

/* ---------------------------------------------------------- 05 Closing CTA */

export const contactClosingCta: ClosingCtaContent = {
  eyebrow: "Prefer a conversation?",
  title: "We’re ready when you are.",
  description:
    "Whether you know exactly what must change or are still defining it, we will help you find the right starting point.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  email: "hello@theworkingtribe.com",
};
