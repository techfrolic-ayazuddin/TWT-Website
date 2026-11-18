/**
 * Homepage content — Figma `Home — Desktop` (`46:95`), transcribed verbatim.
 * Typed and kept out of the components (CLAUDE.md §5).
 *
 * Nothing here is invented. Unconfirmed items carry an `@placeholder` marker.
 */

import type { IconName } from "@/components/ui/icon";
import type { FigmaCrop } from "@/lib/figma-crop";
import type { RouteStatus } from "./navigation";

export type Segment = "violet" | "pink" | "orange" | "yellow";
export type HomeLink = {
  label: string;
  href: string;
  status: RouteStatus;
  /**
   * `"consultation"` makes this CTA open the shared consultation popup
   * (Figma `Form/Consultation`) instead of navigating. `href` stays as the
   * no-JavaScript / right-click destination.
   */
  opens?: "consultation";
};

/* ------------------------------------------------------------------ 01 Hero */

export const hero = {
  eyebrow: "People-first transformation",
  /** Figma `Hero/Animated Headline` — three masked lines, revealed in order. */
  headlineLines: ["Transformation that", "lasts — because the", "people own it."],
  statement: "We are an enterprise consultancy.",
  support:
    "We help leaders turn ambition into lasting results by developing the people who deliver it.",
  primaryCta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  },
  secondaryCta: { label: "Explore our services", href: "/services", status: "live" },
  sectorProof: {
    label: "Working globally, with depth in",
    sectors: [
      "Hospitality & Services",
      "Manufacturing & Industry",
      "Healthcare",
      "Technology & Public Sector",
    ],
  },
  /**
   * Figma `Image · arch 13:16` (`417:10991`, hash `4c6066000c`) — a
   * 1536 × 864 original, exported unmodified and never resized (replaced for
   * the third time on 2026-11-18, now the higher-quality version). Figma sets
   * the fill to `CROP` with imageTransform [[0.4277, 0, 0.3051], [0, 0.9944,
   * 0.0004]] — a 520 × 680 window that is slightly TIGHTER than a cover fit
   * (a 0.56% extra zoom, anchored to the top). `object-fit: cover` measured
   * 13.4/255 off Figma's render; reproducing the window itself with
   * `figmaCropStyle()` measures 3.3 (`crop` below holds Figma's own numbers).
   *
   * The file is AI-generated (OpenAI `gpt-image` C2PA Content Credentials), so
   * there is no photographer credit to record. Stored as a q95 / 4:4:4 JPEG.
   *
   * @placeholder AI-generated imagery supplied through Figma — confirm with
   * the client that it is final before launch (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/home-hero-meeting-room.jpg",
    alt: "Five colleagues around a wooden meeting table in a bright, sunlit office, reviewing documents and a laptop",
    width: 1536,
    height: 864,
    /** Figma `imageTransform`, verbatim — see `figmaCropStyle`. */
    crop: {
      a: 0.4276956021785736,
      d: 0.9944174885749817,
      tx: 0.30505943298339844,
      ty: 0.00039607298094779253,
    } satisfies FigmaCrop,
  },
  card: {
    icon: "refresh" as IconName,
    title: "Kaizen, in our DNA",
    body: "Continuous and deliberate improvement — every engagement carries forward the lessons of the last.",
  },
} satisfies Record<string, unknown> & {
  primaryCta: HomeLink;
  secondaryCta: HomeLink;
};

/* ------------------------------------------------------ 02 Brand introduction */

export const brandIntro = {
  eyebrow: "Who we are",
  title: "Most firms advise and leave, and the change leaves with them. We stay.",
  lead: "A people first transformation — transformation that lasts because the people own it.",
  body: "TWT is a people-first transformation firm. We advise leaders on where to go, and we build the capability to get there, embedding the change through the people who must deliver it. We work globally, with depth in hospitality and services, manufacturing and industry, healthcare, and technology and public sector.",
  vision: {
    label: "Our vision",
    text: "To become the global standard for people-led transformation, a firm organizations trust when the change must last.",
  },
  mission: {
    label: "Our mission",
    text: "We advise, we build capability, and we help organizations adopt and sustain change, so that every engagement leaves a client stronger than we found them.",
  },
  link: {
    label: "About The Working Tribe",
    href: "/about",
    status: "pending",
  } as HomeLink,
  /**
   * Figma `Image · 4:5` (`417:10993`, hash `927f76f4bc`) — a 1536 × 1024
   * original, exported unmodified and never resized (replaced for the third
   * time on 2026-11-18, now the higher-quality version). Figma now sets the
   * fill to a plain `FILL`, so it is a centred `object-cover` — the earlier
   * `CROP` window is gone.
   *
   * The file is AI-generated (OpenAI `gpt-image` C2PA Content Credentials), so
   * there is no photographer credit to record. Stored as a q95 / 4:4:4 JPEG.
   *
   * @placeholder AI-generated imagery supplied through Figma — confirm with
   * the client that it is final before launch (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/home-intro-digital-workspace.jpg",
    alt: "Five colleagues gathered around an illuminated digital table in a modern workspace",
    width: 1536,
    height: 1024,
    position: "50% 50%",
  },
};

/* ---------------------------------------------------------------- 03 Services */

export type ServicePillar = {
  number: string;
  segment: Segment;
  title: string;
  description: string;
  modulesLabel: string;
  modules: string[];
  link: HomeLink;
  /** Tribe Capital only — Figma `Badge/Tone=Placeholder`. */
  badge?: string;
  /** Tribe Capital only — Figma `CTA · Enquire`. */
  enquire?: HomeLink;
};

export const services = {
  eyebrow: "Service portfolio",
  title: "Advice and capability, delivered as one.",
  description:
    "We advise leaders on where to go, and we build the capability to get there — so strategy and people move together.",
  viewAll: {
    label: "View all services",
    href: "/services",
    status: "live",
  } as HomeLink,
  pillars: [
    {
      number: "01",
      segment: "violet",
      title: "Training & Capacity Building",
      description:
        "Tailored capacity-building models designed to bridge performance gaps, elevate service standards, and cultivate institutional succession planning.",
      modulesLabel: "Training modules",
      modules: [
        "Hospitality Excellence Training",
        "Functional Sectors (Manufacturing & Healthcare) Training",
        "New-Hire & Onboarding Frameworks",
        "Leadership Development & Succession Planning",
      ],
      link: {
        label: "Explore training",
        href: "/services/training-capacity-building",
        status: "live",
      },
    },
    {
      number: "02",
      segment: "pink",
      title: "Advisory & Management Consulting",
      description:
        "An executive consulting division guiding international and local brands through seamless market entry, regulatory landscapes, and digital transformation.",
      modulesLabel: "Modules",
      modules: [
        "Market Intelligence & Strategic Focus",
        "Commercial & Marketing Activation",
        "Technology Platforms & IT Governance",
        "Integrated Product Development & Digital Transformation",
      ],
      link: {
        label: "Explore advisory",
        href: "/services/advisory-management-consulting",
        status: "live",
      },
    },
    {
      number: "03",
      segment: "orange",
      title: "Global Solutions",
      description:
        "Designed to diagnose, develop, and drive sustainable value through efficient networking and digital platforms.",
      modulesLabel: "Modules",
      modules: ["Leading Innovation", "AI and Next-Generation Ideas", "Projects"],
      link: {
        label: "Explore global solutions",
        href: "/services/global-solutions",
        status: "live",
      },
    },
    {
      number: "04",
      segment: "yellow",
      title: "Tribe Capital",
      description:
        "We provide tailored financial packages that empower businesses to grow, expand, and access global markets.",
      modulesLabel: "Modules",
      /** @placeholder Package definitions and KYC timelines are PROVISIONAL (CLAUDE.md §6.5). */
      modules: [
        "SOS Call — within one week of KYC.",
        "Watering Package — within 90 days.",
        "A Journey Through — continuous financing within 12 months of KYC.",
      ],
      link: {
        label: "Explore Tribe Capital",
        href: "/services/tribe-capital",
        status: "live",
      },
      badge: "Provisional",
      enquire: { label: "Enquire", href: "/contact", status: "pending" },
    },
  ] satisfies ServicePillar[],
};

/* -------------------------------------------------------------- 04 Industries */

export type IndustryRow = { title: string; description: string; icon: IconName };

export const industries = {
  eyebrow: "Who we serve",
  title: "Built for demanding, high-standard sectors.",
  description:
    "We work with large corporates and conglomerates, government bodies and agencies, established family enterprises, and ambitious organizations moving into a new stage of growth.",
  callout: {
    label: "When clients call us",
    text: "The trigger is usually a moment of consequence: a growth push, a turnaround, a new market, a new operating model, or a service standard that has to rise.",
  },
  href: "/industries",
  rows: [
    {
      title: "Hospitality & Services",
      description:
        "Five-star service cultures across front-of-house, guest relations and luxury management teams.",
      icon: "building",
    },
    {
      title: "Consumer Markets, Manufacturing & Industry",
      description:
        "Multinationals such as FMCG, consumables and telecommunications, and African industrial groups or holdings.",
      icon: "factory",
    },
    {
      title: "Healthcare",
      description: "Hospital groups, health systems, pharmaceuticals and training.",
      icon: "heart-pulse",
    },
    {
      title: "Public Sector, Sustainability & Technology-led Firms",
      description:
        "Think tanks, legislative and executive instruments, agencies, public institutions and high-level one-on-one partners.",
      icon: "landmark",
    },
    {
      title: "Conglomerates & Family Enterprises",
      description:
        "Groups, holdings and incorporations — and established family enterprises.",
      icon: "briefcase",
    },
  ] satisfies IndustryRow[],
};

/* ----------------------------------------------------------------- 05 Why TWT */

export const whyTwt = {
  eyebrow: "Why The Working Tribe",
  title: "What sets us apart.",
  description:
    "Strategic anchors that shape every engagement — and one standard we apply everywhere, from a factory floor to a government ministry.",
  anchors: [
    {
      title: "Continuity from strategy to people.",
      text: "Most firms advise and leave. We stay through the handoff into capability and execution, so the work holds after we are gone.",
    },
    {
      title: "Capability, not dependency.",
      text: "We build the client’s own people, so the advantage is owned in-house, not rented from us. Our success is measured by what a client can do without us.",
    },
    {
      title: "The human side of change, at a strategy-house standard.",
      text: "Many firms treat transformation as a process problem. We resolve it as a problem of people, and bring the rigor of a genuine consultancy to the part of change that usually gets the least of it.",
    },
    {
      title: "Depth in demanding sectors.",
      text: "We concentrate on capability-intensive, high-standard environments, with real fluency in growth markets.",
    },
  ],
  valuesLabel: "Our core values",
  values: [
    "Service",
    "People before process",
    "Excellence as standard",
    "Commitment",
    "Adaptability",
  ],
};

/* ------------------------------------------- 06 Training programmes (Figma: Newsletters) */

export type Programme = {
  id: "spring" | "summer" | "autumn" | "winter";
  /** e.g. "Spring Training" */
  name: string;
  /** Cover nameplate, exactly as drawn in Figma. */
  nameplate: string;
  /** Cover edition line: "Training" / "Forum". */
  kind: string;
  season: string;
  topic: string;
  months: string[];
  /** e.g. "March–May" — used in the registration overlay. */
  monthRange: string;
  audience: string;
  panel?: string;
  format: string;
  /** @placeholder Sample — venue awaits client confirmation (CLAUDE.md §6.1). */
  venue: string;
  /** @placeholder Sample — date & time await client confirmation (CLAUDE.md §6.1). */
  dateTime: string;
  /** @placeholder Sample logistics line shown on the small cards. */
  logistics: string;
  /** @placeholder Sample logistics line shown in the registration overlay. */
  overlayDetails: string;
};

const VENUE = "Online — joining link shared after registration";

export const programmes: Programme[] = [
  {
    id: "spring",
    name: "Spring Training",
    nameplate: "Spring - 2027",
    kind: "Training",
    season: "Spring",
    topic: "Executive Leadership Skills",
    months: ["March", "April", "May"],
    monthRange: "March–May",
    audience:
      "Audience: Line Managers, SME Owners, Management Trainees and Undergraduates.",
    format: "Virtual Meeting",
    venue: VENUE,
    dateTime: "Thursday 18 March 2027 · 10:00–12:00 GMT",
    logistics: "Thursday 18 March 2027 · 10:00–12:00 GMT · Online — to be confirmed",
    overlayDetails:
      "March–May · Virtual Meeting · Venue: Online — joining link shared after registration · Thursday 18 March 2027, 10:00–12:00 GMT — Sample, to be confirmed",
  },
  {
    id: "summer",
    name: "Summer Training",
    nameplate: "Summer - 2027",
    kind: "Training",
    season: "Summer",
    topic: "Building a Culture of Innovation",
    months: ["June", "July", "August"],
    monthRange: "June–August",
    audience:
      "Audience: Non-Executives, Enterprise Business Owners, Undergraduates and Management Trainees.",
    format: "Virtual Meeting",
    venue: VENUE,
    dateTime: "Thursday 17 June 2027 · 10:00–12:00 GMT",
    logistics: "Thursday 17 June 2027 · 10:00–12:00 GMT · Online — to be confirmed",
    overlayDetails:
      "June–August · Virtual Meeting · Venue: Online — joining link shared after registration · Thursday 17 June 2027, 10:00–12:00 GMT — Sample, to be confirmed",
  },
  {
    id: "autumn",
    name: "Autumn Training",
    nameplate: "Autumn - 2027",
    kind: "Training",
    season: "Autumn",
    topic: "Embracing AI to Scale Up Business",
    months: ["September", "October", "November"],
    monthRange: "September–November",
    audience: "Audience: Entrepreneurs, Management Trainees and Undergraduates.",
    format: "Virtual Meeting",
    venue: VENUE,
    dateTime: "Thursday 16 September 2027 · 10:00–12:00 GMT",
    logistics: "Thursday 16 September 2027 · 10:00–12:00 GMT · Online — to be confirmed",
    overlayDetails:
      "September–November · Virtual Meeting · Venue: Online — joining link shared after registration · Thursday 16 September 2027, 10:00–12:00 GMT — Sample, to be confirmed",
  },
  {
    id: "winter",
    name: "Winter Forum",
    nameplate: "Winter -2027",
    kind: "Forum",
    season: "Winter",
    topic: "The Woman Mentorship Forum",
    months: ["December", "January", "February"],
    monthRange: "December–February",
    panel: "Panel: Diverse industries, interactive discussions and open case scenarios.",
    audience: "Audience: Open to All.",
    format: "Virtual Meeting",
    venue: VENUE,
    dateTime: "Thursday 9 December 2027 · 10:00–12:00 GMT",
    logistics: "Thursday 9 December 2027 · 10:00–12:00 GMT · Online — to be confirmed",
    overlayDetails:
      "December–February · Virtual Meeting · Venue: Online — joining link shared after registration · Thursday 9 December 2027, 10:00–12:00 GMT — Sample, to be confirmed",
  },
];

/** Which rows the featured programme’s "Programme details" list shows. */
export type ProgrammeDetailRow =
  "season" | "months" | "format" | "venue" | "dateTime" | "dates";

/**
 * Copy for the Training Programs block. The homepage (`48:312`) and the
 * newer variant placed on the Industries page (`264:12250`) share one
 * component and differ only in this content.
 */
export type ProgrammesSectionContent = {
  eyebrow: string;
  title: string;
  masthead: string;
  detailsLabel: string;
  detailLabels: Record<ProgrammeDetailRow, string>;
  /** Rows shown, in order. */
  detailRows: ProgrammeDetailRow[];
  /** Value of the `dates` row — never an invented date. */
  datesValue: string;
  registerLabel: string;
  /** Featured-programme secondary link; `null` omits it. */
  browse: HomeLink | null;
  moreLabel: string;
  archive: HomeLink;
  /**
   * Cover nameplate: `"edition"` is the full edition line (homepage:
   * "Spring - 2027"); `"season"` is just the season word (Industries
   * variant: "Spring").
   */
  coverNameplate: "edition" | "season";
  /**
   * Small-card logistics line: `"programme"` shows each programme’s own
   * sample line (homepage); a string is shown on every card instead.
   */
  cardLogistics: "programme" | string;
};

export const programmesSection: ProgrammesSectionContent = {
  eyebrow: "The Working Tribe newsletter",
  title: "Training Programs",
  masthead: "The Working Tribe",
  detailsLabel: "Programme details",
  detailLabels: {
    season: "Season",
    months: "Months",
    format: "Format",
    venue: "Venue",
    dateTime: "Date & time",
    dates: "Dates & times",
  },
  detailRows: ["season", "months", "format", "venue", "dateTime"],
  datesValue: "To be announced",
  cardLogistics: "programme",
  coverNameplate: "edition",
  registerLabel: "Click to Register",
  /**
   * Client instruction (2026-11-18): "Browse all editions" is removed from the
   * homepage. Figma's `Home — Desktop` (`111:5752`) still draws it, so this
   * is a deliberate divergence. `ProgrammesSection` omits the link when this
   * is `null`, exactly as the Industries variant does.
   */
  browse: null,
  moreLabel: "More training programmes",
  /**
   * Client instruction (2026-11-18): the remaining link reads "View all
   * Training Programs" and goes to the built `/training-programs` route.
   * Figma (`111:5759`) still draws "View the archive" → newsletters, which are
   * not built and are on hold — so that destination is gone too.
   */
  archive: {
    label: "View all Training Programs",
    href: "/training-programs",
    status: "live",
  } as HomeLink,
};

/** Figma `Modal/Registration` (`95:5568`) — overlay copy. */
export const registration = {
  overline: "Training registration",
  title: "Register your interest",
  selectedLabel: "Selected programme",
  fields: {
    fullName: { label: "Full name", placeholder: "Your full name" },
    email: {
      label: "Email address",
      placeholder: "name@example.com",
      invalid: "Please enter a valid email address.",
    },
    organization: { label: "Organization", placeholder: "Your organization (optional)" },
    consent: "I agree to be contacted about this training",
  },
  submit: "Register",
  cancel: "Cancel",
  close: "Close registration",
  /**
   * @placeholder Not in Figma. Figma supplies only the invalid-email message;
   * these required-field messages are working copy and need client approval.
   */
  required: {
    fullName: "Please enter your full name.",
    email: "Please enter your email address.",
    consent: "Please confirm that we may contact you about this training.",
  },
  /**
   * @placeholder Not in Figma. There is no form backend yet (CLAUDE.md §9,
   * open decision #5), so a valid submission is NOT sent and no success state
   * is shown. This notice says so honestly; replace it when a backend exists.
   */
  notSent: {
    title: "Registration is not open yet",
    message:
      "Your details have not been sent. Online registration for this programme is still being set up.",
  },
};

/* ------------------------------------------------------------ 08 Client voices */

/**
 * An attributed third-party quotation — NOT a client testimonial
 * (CLAUDE.md §6.2). Kept as its own type so a real testimonial can never be
 * slotted into it.
 */
export const attributedQuote = {
  eyebrow: "Client voices",
  quote: "If you haven't found it yet, keep looking.",
  attribution: "Steve Jobs",
};

/* -------------------------------------------------------------- 09 Closing CTA */

export type ClosingCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: HomeLink;
  email: string;
};

export const closingCta: ClosingCtaContent = {
  eyebrow: "Let’s talk",
  title: "Ready to make change that lasts?",
  description:
    "TWT is your confidential, lasting transformation partner. Tell us where you want to go — we will build the capability to get there.",
  cta: {
    label: "Request a consultation",
    href: "/contact",
    status: "live",
    opens: "consultation",
  } as HomeLink,
  /**
   * DIVERGENCE FROM FIGMA — client instruction, 2026-11-18. The Figma Home
   * frame (`48:458`) still draws `info@theworkingtribe.com` here; the client
   * confirmed the correct address is `hello@theworkingtribe.com`, which is
   * also what the footer and every other page carry. The rendered `mailto:`
   * is built from this field, so the link and its visible text cannot drift.
   */
  email: "hello@theworkingtribe.com",
};
