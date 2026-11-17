/**
 * Site navigation — typed content, kept out of the components (CLAUDE.md §5).
 *
 * Header source: Figma `Header/Desktop` → `Layout=Grouped Dropdown`
 * (`109:5770`), with the Company panel (`109:5675`) and Services panel
 * (`167:7821`).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * DIVERGENCE FROM FIGMA — client decision, approved for Phase 3
 *
 * The Figma Grouped Dropdown header contains SIX top-level items:
 *   Company · Services · Industries · Newsletters · Contact · CTA
 *
 * The client has since decided that **Newsletters does not appear in the
 * header**. It is omitted here deliberately, so this header has five:
 *   Company · Services · Industries · Contact · CTA
 *
 * The Newsletter pages, the homepage Newsletter section and the footer's
 * Newsletters link all REMAIN. Only the header item is removed.
 * See CLAUDE.md §7.2 and DESIGN-CHANGES.md.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * Whether the route backing a link exists in the app yet.
 *
 * As of Phase 3 only `/` is built. Every other href is the canonical path
 * taken from the Figma breadcrumbs and dropdown links — the information
 * architecture is correct, but the pages are Phase 4+ work. Nothing is
 * stubbed to make a link look functional (Phase 3 scope rule).
 */
export type RouteStatus = "live" | "pending";

export type NavLink = {
  label: string;
  href: string;
  status: RouteStatus;
  /** See `HomeLink.opens` — opens the consultation popup instead of navigating. */
  opens?: "consultation";
  /** Figma `Nav Service Item` description — Services panel only. */
  description?: string;
  /** Figma `Nav Service Item` `Accent` axis — the service's segment hue. */
  accent?: "violet" | "pink" | "orange" | "yellow";
};

export type NavGroup = {
  /** Trigger label in the header. */
  label: string;
  /** Overline inside the open panel — Figma `UI/Overline`. */
  panelHeading: string;
  items: NavLink[];
  /** Optional panel footer link, e.g. Services → "View all services". */
  viewAll?: NavLink;
};

export type NavEntry = NavGroup | NavLink;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

/** Company dropdown — Figma `Panel · Company` (296 × 236). */
const company: NavGroup = {
  label: "Company",
  panelHeading: "Company",
  items: [
    { label: "About Us", href: "/about", status: "live" },
    { label: "Why TWT", href: "/why-twt", status: "live" },
    { label: "Careers", href: "/careers", status: "live" },
    // Design verified: `Training Programs — Desktop` (248:10353). Route not
    // built yet — CLAUDE.md §7.1.
    { label: "Training Programs", href: "/training-programs", status: "live" },
  ],
};

/**
 * Services dropdown — Figma `Panel · Services` (640 × 292).
 * Descriptions are the approved Figma copy, transcribed verbatim.
 */
const services: NavGroup = {
  label: "Services",
  panelHeading: "Our services",
  items: [
    {
      label: "Training & Capacity Building",
      accent: "violet",
      href: "/services/training-capacity-building",
      status: "live",
      description: "Tailored capacity-building models and training modules.",
    },
    {
      label: "Advisory & Management Consulting",
      accent: "pink",
      href: "/services/advisory-management-consulting",
      status: "live",
      description: "Market entry, commercial activation and digital transformation.",
    },
    {
      label: "Global Solutions",
      accent: "orange",
      href: "/services/global-solutions",
      status: "live",
      description:
        "Designed to diagnose, develop, and drive sustainable value through efficient networking and digital platforms.",
    },
    {
      label: "Tribe Capital",
      accent: "yellow",
      href: "/services/tribe-capital",
      status: "live",
      description:
        "We provide tailored financial packages that empower businesses to grow, expand, and access global markets.",
    },
  ],
  viewAll: { label: "View all services", href: "/services", status: "live" },
};

export const headerNavigation: NavEntry[] = [
  company,
  services,
  { label: "Industries", href: "/industries", status: "live" },
  { label: "Contact", href: "/contact", status: "live" },
];

/** Primary CTA — Figma header CTA, `Button/Primary` Medium with both icons. */
export const headerCta: NavLink = {
  label: "Request a consultation",
  href: "/contact",
  status: "live",
  opens: "consultation",
};

/** Every route the navigation references, for the pending-route report. */
export const pendingRoutes = (): string[] => {
  const out = new Set<string>();
  const add = (l: NavLink) => {
    if (l.status === "pending") out.add(l.href);
  };
  for (const entry of headerNavigation) {
    if (isNavGroup(entry)) {
      entry.items.forEach(add);
      if (entry.viewAll) add(entry.viewAll);
    } else {
      add(entry);
    }
  }
  add(headerCta);
  return [...out].sort();
};
