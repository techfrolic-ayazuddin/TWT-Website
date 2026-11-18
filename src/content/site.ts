/**
 * Site-wide content — footer, contact details, offices, legal.
 * Typed and kept out of the components (CLAUDE.md §5).
 *
 * Source: Figma `Footer/Desktop` → `Layout=Original` (`44:176`), transcribed
 * verbatim. Nothing here is invented; anything unconfirmed is marked.
 */

import type { RouteStatus } from "./navigation";

export type FooterLink = {
  label: string;
  href: string;
  status: RouteStatus;
};

/**
 * A phone number, with the rendered text and the dialable value kept apart.
 *
 * CLAUDE.md §6.3 is firm about this: display exactly as supplied, never
 * normalise, and never derive `tel` by stripping characters from `display`.
 * When `tel` is null the number renders as plain text, not a link.
 */
export type PhoneNumber = {
  region: "USA" | "Asia" | "Africa";
  /** Rendered verbatim. */
  display: string;
  /** E.164 for `tel:`, or null while the international form is unconfirmed. */
  tel: string | null;
  /** Why `tel` is null — surfaced in review, never to the visitor. */
  note?: string;
};

export type Office = {
  name: string;
  address: string;
  /**
   * The Google Maps link the client supplied for this office, used verbatim by
   * the Contact page's location cards (opened in a new tab). Never built from
   * `address` — the short link is the client's choice of exact pin.
   */
  mapUrl: string;
  /**
   * @placeholder true when the address itself awaits confirmation.
   *
   * No longer surfaced to visitors: the "TO CONFIRM" badge Figma draws on the
   * Asia Region row was removed on client instruction (Phase 5.5
   * refinements). The flag stays because the address is still unconfirmed
   * (CLAUDE.md §6.5) — it is review metadata now, not display state.
   */
  unconfirmed?: boolean;
};

export const brand = {
  name: "The Working Tribe",
  /** Figma footer brand statement — `Desktop/Body/Regular`. */
  statement:
    "A people-first transformation firm. We advise leaders on where to go — and build the capability to get there.",
} as const;

export const contact = {
  email: "hello@theworkingtribe.com",
  website: {
    display: "www.theworkingtribe.com",
    href: "https://www.theworkingtribe.com",
  },
  instagram: {
    handle: "@theworkingtribe",
    href: "https://www.instagram.com/theworkingtribe",
  },
} as const;

/**
 * Phone numbers exactly as they appear in Figma.
 *
 * Only the USA number is stable across every version of the brief, so it is
 * the only one with a `tel:` link. The other two are disputed (CLAUDE.md §6.3,
 * open decisions #3 and #4) and therefore render as plain text — guessing a
 * country code to make them clickable would be inventing client data.
 */
export const phoneNumbers: PhoneNumber[] = [
  {
    region: "USA",
    display: "+1 315 832 0551",
    tel: "+13158320551",
  },
  {
    region: "Asia",
    display: "+1 33 7024 0773",
    tel: null,
    note: "Country code unconfirmed — reads as two dialling prefixes concatenated. CLAUDE.md §10 #3.",
  },
  {
    region: "Africa",
    display: "+233 598 277 323",
    tel: null,
    note: "Digits conflict with the previously approved +233 59 822 7323. CLAUDE.md §10 #4.",
  },
];

/** Figma `Offices` row. */
export const offices: Office[] = [
  {
    name: "African Region",
    address: "Airport Residential, off Patrice Lumumba Street, Airport, Accra, Ghana.",
    /** Client-supplied link, "Accra Office" (2026-11-18). Resolves to Airport Residential Area, Accra. */
    mapUrl: "https://maps.app.goo.gl/7hQzpkS2upNyhho88",
  },
  {
    name: "Asia Region",
    address:
      "Zhongjun Plaza, Lane 1588, Shengchan Road, Minhang District, Shanghai, China.",
    /** Client-supplied link, "China Office" (2026-11-18). Resolves to Zhongjun Plaza, Minhang, Shanghai. */
    mapUrl: "https://maps.app.goo.gl/rGe85iydRNUBq2jD9",
    /** @placeholder Spelling and mailing accuracy awaiting confirmation — CLAUDE.md §6.5. */
    unconfirmed: true,
  },
];

/** Figma footer `Column / Services`. Note it ends with FAQ, not a service. */
export const footerServices: FooterLink[] = [
  {
    label: "Training & Capacity Building",
    href: "/services/training-capacity-building",
    status: "live",
  },
  {
    label: "Advisory & Management Consulting",
    href: "/services/advisory-management-consulting",
    status: "live",
  },
  { label: "Global Solutions", href: "/services/global-solutions", status: "live" },
  { label: "Tribe Capital", href: "/services/tribe-capital", status: "live" },
  { label: "FAQ", href: "/faq", status: "pending" },
];

/**
 * Figma footer `Column / Company`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * DIVERGENCE FROM FIGMA — client instruction, 2026-11-13
 *
 * Figma's `Layout=Original` Company column lists Newsletters in fourth
 * position. The client has replaced it with **Training Programs**, pointing at
 * the built `/training-programs` route.
 *
 * Newsletters now appears NOWHERE in the site chrome — it was removed from the
 * header in Phase 3 (CLAUDE.md §7.2) and from this column now. The newsletter
 * pages and the homepage newsletter section are unaffected, and Newsletters is
 * NOT to be re-added to the header.
 *
 * `Footer/Desktop → Layout=Modern` already lists Training Programs in its own
 * Company column (`179:9683`), so this matches the other footer variant.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const footerCompany: FooterLink[] = [
  { label: "About us", href: "/about", status: "live" },
  { label: "Who we serve", href: "/industries", status: "live" },
  { label: "Why TWT", href: "/why-twt", status: "live" },
  { label: "Training Programs", href: "/training-programs", status: "live" },
  { label: "Careers", href: "/careers", status: "live" },
  { label: "Contact", href: "/contact", status: "live" },
];

/**
 * Figma footer legal row.
 *
 * ⚠️ No destination URLs were supplied for any of these (CLAUDE.md §7.4 and
 * the Figma review note "Privacy, Terms and Cookie pages … were not supplied").
 * `href` is the canonical path we would use; all three are `pending`, and
 * none has an approved page.
 */
export const legalLinks: FooterLink[] = [
  { label: "Privacy policy", href: "/privacy-policy", status: "pending" },
  { label: "Terms of use", href: "/terms-of-use", status: "pending" },
  { label: "Cookie settings", href: "/cookie-settings", status: "pending" },
];

/**
 * Figma `Footer/Desktop` → `Bottom` (`44:229`): "© MMXXVI The Working Tribe.
 * All rights reserved." The year is written in Roman numerals, exactly as
 * drawn (client instruction, 2026-11-18) — it is a string, not a number, so
 * nobody "fixes" it back to 2026. The Footer is one shared component, so this
 * is the only place the year lives.
 */
export const copyright = (year: string = "MMXXVI") =>
  `© ${year} ${brand.name}. All rights reserved.`;

/**
 * Footer QR code — NOT IMPLEMENTED.
 *
 * The brief asks for a QR code to be reused in the footer. Verified twice
 * against Figma (2026-11-11): there is no QR node, no QR-related text and no
 * destination URL anywhere in the file. Artwork and target must be supplied
 * before this can be built. CLAUDE.md §7.4, open decision #10.
 */
export const footerQrCode = null;
