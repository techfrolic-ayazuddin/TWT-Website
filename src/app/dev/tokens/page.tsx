import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

/**
 * Design-token specimen — DEVELOPMENT ONLY.
 *
 * Renders every extracted Figma token so values can be compared side by side
 * with the `🎨 Design System` page in Figma. Labels are the Figma variable /
 * style paths so each row is directly greppable against the source.
 *
 * This route 404s in production (see the guard below) and must never become a
 * public page.
 */

export const metadata = {
  title: "Design tokens — dev",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ layout */

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-border-subtle scroll-mt-8 border-t pt-10">
      <h2 className="text-desktop-heading-h3 text-text-heading">{title}</h2>
      {note ? (
        <p className="text-desktop-body-small max-w-narrow text-text-muted mt-2">
          {note}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="text-ui-caption bg-background-muted text-text-body rounded-xs px-1.5 py-0.5">
      {children}
    </code>
  );
}

/* ------------------------------------------------------------------ colours */

type Swatch = { figma: string; cssVar: string; utility?: string; hex: string };

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <ul className="tablet:grid-cols-3 desktop:grid-cols-4 grid grid-cols-2 gap-4">
      {items.map((s) => (
        <li
          key={s.cssVar}
          className="border-border-subtle overflow-hidden rounded-md border"
        >
          <div
            className="border-border-subtle h-16 w-full border-b"
            style={{ backgroundColor: `var(${s.cssVar})` }}
          />
          <div className="space-y-1 p-3">
            <p className="text-ui-label-regular text-text-heading">{s.figma}</p>
            <p className="text-ui-caption text-text-muted">{s.hex}</p>
            {s.utility ? (
              <p className="text-ui-caption text-text-muted">
                <Mono>{s.utility}</Mono>
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

const PRIMITIVES: Swatch[] = [
  { figma: "violet/100", cssVar: "--violet-100", hex: "#a18efd" },
  { figma: "violet/300", cssVar: "--violet-300", hex: "#8168fc" },
  { figma: "violet/500", cssVar: "--violet-500", hex: "#6242fb" },
  { figma: "violet/700", cssVar: "--violet-700", hex: "#4a32bc" },
  { figma: "violet/900", cssVar: "--violet-900", hex: "#31217e" },
  { figma: "pink/100", cssVar: "--pink-100", hex: "#fd9ad5" },
  { figma: "pink/300", cssVar: "--pink-300", hex: "#fc67c1" },
  { figma: "pink/500", cssVar: "--pink-500", hex: "#fa0297" },
  { figma: "pink/700", cssVar: "--pink-700", hex: "#bb0271" },
  { figma: "pink/900", cssVar: "--pink-900", hex: "#7d014c" },
  { figma: "orange/100", cssVar: "--orange-100", hex: "#fec1b0" },
  { figma: "orange/300", cssVar: "--orange-300", hex: "#fd8361" },
  { figma: "orange/500", cssVar: "--orange-500", hex: "#fd643a" },
  { figma: "orange/700", cssVar: "--orange-700", hex: "#be4b2c" },
  { figma: "orange/900", cssVar: "--orange-900", hex: "#7f321d" },
  { figma: "yellow/100", cssVar: "--yellow-100", hex: "#ffd880" },
  { figma: "yellow/300", cssVar: "--yellow-300", hex: "#ffcb56" },
  { figma: "yellow/500", cssVar: "--yellow-500", hex: "#ffbe2c" },
  { figma: "yellow/700", cssVar: "--yellow-700", hex: "#bf8f21" },
  { figma: "yellow/900", cssVar: "--yellow-900", hex: "#805f16" },
  { figma: "navy/900", cssVar: "--navy-900", hex: "#070052" },
  { figma: "navy/800", cssVar: "--navy-800", hex: "#170d49" },
  { figma: "neutral/0", cssVar: "--neutral-0", hex: "#ffffff" },
  { figma: "neutral/25", cssVar: "--neutral-25", hex: "#fbfaff" },
  { figma: "neutral/50", cssVar: "--neutral-50", hex: "#f5f4fa" },
  { figma: "neutral/100", cssVar: "--neutral-100", hex: "#edebf5" },
  { figma: "neutral/200", cssVar: "--neutral-200", hex: "#dedbea" },
  { figma: "neutral/300", cssVar: "--neutral-300", hex: "#c5c1d6" },
  { figma: "neutral/400", cssVar: "--neutral-400", hex: "#9a95b0" },
  { figma: "neutral/500", cssVar: "--neutral-500", hex: "#736e8a" },
  { figma: "neutral/600", cssVar: "--neutral-600", hex: "#57536b" },
  { figma: "neutral/700", cssVar: "--neutral-700", hex: "#3f3b52" },
  { figma: "neutral/800", cssVar: "--neutral-800", hex: "#29263a" },
  { figma: "neutral/900", cssVar: "--neutral-900", hex: "#161424" },
  { figma: "green/50", cssVar: "--green-50", hex: "#e8f6ef" },
  { figma: "green/600", cssVar: "--green-600", hex: "#12805c" },
  { figma: "green/700", cssVar: "--green-700", hex: "#0e6849" },
  { figma: "red/50", cssVar: "--red-50", hex: "#fdecee" },
  { figma: "red/600", cssVar: "--red-600", hex: "#d42a3c" },
  { figma: "red/700", cssVar: "--red-700", hex: "#a81f2e" },
];

const PRIMITIVE_ALPHAS: Swatch[] = [
  { figma: "violet/a04", cssVar: "--violet-a04", hex: "#6242fb @ 4%" },
  { figma: "violet/a08", cssVar: "--violet-a08", hex: "#6242fb @ 8%" },
  { figma: "violet/a12", cssVar: "--violet-a12", hex: "#6242fb @ 12%" },
  { figma: "violet/a16", cssVar: "--violet-a16", hex: "#6242fb @ 16%" },
  { figma: "violet/a24", cssVar: "--violet-a24", hex: "#6242fb @ 24%" },
  { figma: "violet/a40", cssVar: "--violet-a40", hex: "#6242fb @ 40%" },
  { figma: "pink/a08", cssVar: "--pink-a08", hex: "#fa0297 @ 8%" },
  { figma: "pink/a16", cssVar: "--pink-a16", hex: "#fa0297 @ 16%" },
  { figma: "orange/a08", cssVar: "--orange-a08", hex: "#fd643a @ 8%" },
  { figma: "orange/a16", cssVar: "--orange-a16", hex: "#fd643a @ 16%" },
  { figma: "yellow/a08", cssVar: "--yellow-a08", hex: "#ffbe2c @ 8%" },
  { figma: "yellow/a16", cssVar: "--yellow-a16", hex: "#ffbe2c @ 16%" },
  { figma: "yellow/a24", cssVar: "--yellow-a24", hex: "#ffbe2c @ 24%" },
  { figma: "white/a12", cssVar: "--white-a12", hex: "#ffffff @ 12%" },
  { figma: "white/a24", cssVar: "--white-a24", hex: "#ffffff @ 24%" },
  { figma: "white/a72", cssVar: "--white-a72", hex: "#ffffff @ 72%" },
];

const sem = (figma: string, hex: string): Swatch => {
  const slug = figma.replaceAll("/", "-");
  return {
    figma,
    cssVar: `--color-${slug}`,
    utility: `bg-${slug}`,
    hex,
  };
};

const SEMANTIC: Record<string, Swatch[]> = {
  "background/*": [
    sem("background/page", "neutral/0"),
    sem("background/subtle", "neutral/25"),
    sem("background/muted", "neutral/50"),
    sem("background/brand", "violet/500"),
    sem("background/brand-soft", "violet/a08"),
    sem("background/brand-strong", "violet/900"),
    sem("background/inverse", "navy/800"),
    sem("background/inverse-strong", "navy/900"),
  ],
  "surface/*": [
    sem("surface/default", "neutral/0"),
    sem("surface/sunken", "neutral/50"),
    sem("surface/inverse", "navy/800"),
  ],
  "primary/* · secondary/* · accent/*": [
    sem("primary/default", "violet/500"),
    sem("primary/hover", "violet/700"),
    sem("primary/pressed", "violet/900"),
    sem("primary/soft", "violet/a08"),
    sem("primary/soft-hover", "violet/a16"),
    sem("primary/soft-pressed", "violet/a24"),
    sem("secondary/default", "pink/500"),
    sem("secondary/strong", "pink/700"),
    sem("secondary/soft", "pink/a08"),
    sem("accent/orange", "orange/500"),
    sem("accent/orange-strong", "orange/700"),
    sem("accent/orange-soft", "orange/a08"),
    sem("accent/yellow", "yellow/500"),
    sem("accent/yellow-soft", "yellow/a16"),
  ],
  "inverse/* · disabled/* · feedback/*": [
    sem("inverse/default", "neutral/0"),
    sem("inverse/hover", "neutral/50"),
    sem("inverse/pressed", "neutral/100"),
    sem("inverse/ghost-hover", "white/a12"),
    sem("disabled/background", "neutral/100"),
    sem("feedback/error-soft", "red/50"),
    sem("feedback/success-soft", "green/50"),
    sem("feedback/warning-soft", "yellow/a16"),
    sem("feedback/info-soft", "violet/a08"),
  ],
  "text/*": [
    sem("text/heading", "navy/900"),
    sem("text/body", "neutral/600"),
    sem("text/muted", "neutral/500"),
    sem("text/disabled", "neutral/400"),
    sem("text/inverse", "neutral/0"),
    sem("text/inverse-muted", "white/a72"),
    sem("text/brand", "violet/500"),
    sem("text/brand-strong", "violet/700"),
    sem("text/secondary", "pink/700"),
    sem("text/on-primary", "neutral/0"),
    sem("text/on-yellow", "navy/900"),
    sem("text/error", "red/600"),
    sem("text/success", "green/700"),
    sem("text/warning", "yellow/900"),
  ],
  "icon/*": [
    sem("icon/default", "navy/900"),
    sem("icon/muted", "neutral/500"),
    sem("icon/brand", "violet/500"),
    sem("icon/inverse", "neutral/0"),
    sem("icon/disabled", "neutral/400"),
    sem("icon/error", "red/600"),
    sem("icon/success", "green/600"),
  ],
  "border/*": [
    sem("border/default", "neutral/200"),
    sem("border/strong", "neutral/300"),
    sem("border/subtle", "neutral/100"),
    sem("border/brand", "violet/500"),
    sem("border/brand-soft", "violet/100"),
    sem("border/focus", "violet/500"),
    sem("border/error", "red/600"),
    sem("border/success", "green/600"),
    sem("border/inverse", "white/a24"),
    sem("border/disabled", "neutral/200"),
  ],
};

const SEGMENTS = ["violet", "pink", "orange", "yellow"] as const;
const SEGMENT_ROLES = [
  "solid",
  "solid-hover",
  "solid-pressed",
  "on-solid",
  "accent",
  "soft",
  "subtle",
  "border",
  "text",
] as const;

/* --------------------------------------------------------------- typography */

type TypeSpec = {
  figma: string;
  utility: string;
  spec: string;
  className: string;
};

const DESKTOP_TYPE: TypeSpec[] = [
  {
    figma: "Desktop/Display/Hero",
    utility: "text-desktop-display-hero",
    spec: "72 / 80 · −2% · Bold",
    className: "text-desktop-display-hero",
  },
  {
    figma: "Desktop/Heading/H1",
    utility: "text-desktop-heading-h1",
    spec: "56 / 64 · −1.5% · Bold",
    className: "text-desktop-heading-h1",
  },
  {
    figma: "Desktop/Heading/H2",
    utility: "text-desktop-heading-h2",
    spec: "44 / 52 · −1% · Bold",
    className: "text-desktop-heading-h2",
  },
  {
    figma: "Desktop/Heading/H3",
    utility: "text-desktop-heading-h3",
    spec: "32 / 40 · −0.5% · Bold",
    className: "text-desktop-heading-h3",
  },
  {
    figma: "Desktop/Heading/H4",
    utility: "text-desktop-heading-h4",
    spec: "24 / 32 · 0% · Bold",
    className: "text-desktop-heading-h4",
  },
  {
    figma: "Desktop/Body/Large",
    utility: "text-desktop-body-large",
    spec: "20 / 32 · 0% · Light",
    className: "text-desktop-body-large",
  },
  {
    figma: "Desktop/Body/Large Strong",
    utility: "text-desktop-body-large-strong",
    spec: "20 / 32 · 0% · Bold",
    className: "text-desktop-body-large-strong",
  },
  {
    figma: "Desktop/Body/Regular",
    utility: "text-desktop-body-regular",
    spec: "18 / 28 · 0% · Regular",
    className: "text-desktop-body-regular",
  },
  {
    figma: "Desktop/Body/Small",
    utility: "text-desktop-body-small",
    spec: "15 / 24 · 0.5% · Regular",
    className: "text-desktop-body-small",
  },
  {
    figma: "Desktop/Quote/Large",
    utility: "text-desktop-quote-large",
    spec: "30 / 42 · −0.5% · Light",
    className: "text-desktop-quote-large",
  },
  {
    figma: "Desktop/Stat/Number",
    utility: "text-desktop-stat-number",
    spec: "56 / 60 · −2% · Bold",
    className: "text-desktop-stat-number",
  },
];

const TABLET_TYPE: TypeSpec[] = [
  {
    figma: "Tablet/Display/Hero",
    utility: "text-tablet-display-hero",
    spec: "56 / 64 · −2% · Bold",
    className: "text-tablet-display-hero",
  },
  {
    figma: "Tablet/Heading/H1",
    utility: "text-tablet-heading-h1",
    spec: "48 / 56 · −1.5% · Bold",
    className: "text-tablet-heading-h1",
  },
  {
    figma: "Tablet/Heading/H2",
    utility: "text-tablet-heading-h2",
    spec: "38 / 46 · −1% · Bold",
    className: "text-tablet-heading-h2",
  },
  {
    figma: "Tablet/Heading/H3",
    utility: "text-tablet-heading-h3",
    spec: "28 / 36 · −0.5% · Bold",
    className: "text-tablet-heading-h3",
  },
  {
    figma: "Tablet/Heading/H4",
    utility: "text-tablet-heading-h4",
    spec: "22 / 30 · 0% · Bold",
    className: "text-tablet-heading-h4",
  },
  {
    figma: "Tablet/Body/Large",
    utility: "text-tablet-body-large",
    spec: "19 / 30 · 0% · Light",
    className: "text-tablet-body-large",
  },
  {
    figma: "Tablet/Body/Large Strong",
    utility: "text-tablet-body-large-strong",
    spec: "19 / 30 · 0% · Bold",
    className: "text-tablet-body-large-strong",
  },
  {
    figma: "Tablet/Body/Regular",
    utility: "text-tablet-body-regular",
    spec: "17 / 28 · 0% · Regular",
    className: "text-tablet-body-regular",
  },
  {
    figma: "Tablet/Body/Small",
    utility: "text-tablet-body-small",
    spec: "15 / 24 · 0.5% · Regular",
    className: "text-tablet-body-small",
  },
  {
    figma: "Tablet/Quote/Large",
    utility: "text-tablet-quote-large",
    spec: "26 / 38 · −0.5% · Light",
    className: "text-tablet-quote-large",
  },
  {
    figma: "Tablet/Stat/Number",
    utility: "text-tablet-stat-number",
    spec: "48 / 52 · −2% · Bold",
    className: "text-tablet-stat-number",
  },
];

const MOBILE_TYPE: TypeSpec[] = [
  {
    figma: "Mobile/Display/Hero",
    utility: "text-mobile-display-hero",
    spec: "44 / 52 · −2% · Bold",
    className: "text-mobile-display-hero",
  },
  {
    figma: "Mobile/Heading/H1",
    utility: "text-mobile-heading-h1",
    spec: "36 / 44 · −1.5% · Bold",
    className: "text-mobile-heading-h1",
  },
  {
    figma: "Mobile/Heading/H2",
    utility: "text-mobile-heading-h2",
    spec: "32 / 40 · −1% · Bold",
    className: "text-mobile-heading-h2",
  },
  {
    figma: "Mobile/Heading/H3",
    utility: "text-mobile-heading-h3",
    spec: "24 / 32 · −0.5% · Bold",
    className: "text-mobile-heading-h3",
  },
  {
    figma: "Mobile/Heading/H4",
    utility: "text-mobile-heading-h4",
    spec: "20 / 28 · 0% · Bold",
    className: "text-mobile-heading-h4",
  },
  {
    figma: "Mobile/Body/Large",
    utility: "text-mobile-body-large",
    spec: "18 / 28 · 0% · Light",
    className: "text-mobile-body-large",
  },
  {
    figma: "Mobile/Body/Large Strong",
    utility: "text-mobile-body-large-strong",
    spec: "18 / 28 · 0% · Bold",
    className: "text-mobile-body-large-strong",
  },
  {
    figma: "Mobile/Body/Regular",
    utility: "text-mobile-body-regular",
    spec: "16 / 26 · 0% · Regular",
    className: "text-mobile-body-regular",
  },
  {
    figma: "Mobile/Body/Small",
    utility: "text-mobile-body-small",
    spec: "14 / 22 · 0.5% · Regular",
    className: "text-mobile-body-small",
  },
  {
    figma: "Mobile/Quote/Large",
    utility: "text-mobile-quote-large",
    spec: "22 / 32 · −0.5% · Light",
    className: "text-mobile-quote-large",
  },
  {
    figma: "Mobile/Stat/Number",
    utility: "text-mobile-stat-number",
    spec: "40 / 44 · −2% · Bold",
    className: "text-mobile-stat-number",
  },
];

const UI_TYPE: TypeSpec[] = [
  {
    figma: "UI/Caption",
    utility: "text-ui-caption",
    spec: "13 / 18 · 1% · Regular",
    className: "text-ui-caption",
  },
  {
    figma: "UI/Overline",
    utility: "text-ui-overline",
    spec: "13 / 16 · 12% · Bold · UPPER",
    className: "text-ui-overline",
  },
  {
    figma: "UI/Label/Large",
    utility: "text-ui-label-large",
    spec: "16 / 24 · 0.5% · Bold",
    className: "text-ui-label-large",
  },
  {
    figma: "UI/Label/Regular",
    utility: "text-ui-label-regular",
    spec: "14 / 20 · 1% · Bold",
    className: "text-ui-label-regular",
  },
  {
    figma: "UI/Button/Large",
    utility: "text-ui-button-large",
    spec: "18 / 24 · 1% · Bold",
    className: "text-ui-button-large",
  },
  {
    figma: "UI/Button/Medium",
    utility: "text-ui-button-medium",
    spec: "16 / 20 · 1% · Bold",
    className: "text-ui-button-medium",
  },
  {
    figma: "UI/Button/Small",
    utility: "text-ui-button-small",
    spec: "14 / 18 · 1.5% · Bold",
    className: "text-ui-button-small",
  },
  {
    figma: "UI/Navigation/Link",
    utility: "text-ui-navigation-link",
    spec: "17 / 24 · 1% · Regular",
    className: "text-ui-navigation-link",
  },
  {
    figma: "UI/Navigation/Link Active",
    utility: "text-ui-navigation-link-active",
    spec: "17 / 24 · 1% · Bold",
    className: "text-ui-navigation-link-active",
  },
];

const SAMPLE = "Transformation that lasts";

function TypeTable({ items }: { items: TypeSpec[] }) {
  return (
    <ul className="space-y-6">
      {items.map((t) => (
        <li
          key={t.figma}
          className="border-border-subtle desktop:grid-cols-[18rem_1fr] desktop:gap-6 grid gap-2 border-b pb-6 last:border-0"
        >
          <div className="space-y-1">
            <p className="text-ui-label-regular text-text-heading">{t.figma}</p>
            <p className="text-ui-caption text-text-muted">{t.spec}</p>
            <p>
              <Mono>{t.utility}</Mono>
            </p>
          </div>
          <p className={`${t.className} text-text-heading overflow-hidden`} lang="en">
            {SAMPLE}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------- scales & misc */

const SPACING = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 160];

const TW_SPACING_EQUIV: Record<number, string> = {
  0: "p-0",
  2: "p-0.5",
  4: "p-1",
  8: "p-2",
  12: "p-3",
  16: "p-4",
  20: "p-5",
  24: "p-6",
  32: "p-8",
  40: "p-10",
  48: "p-12",
  56: "p-14",
  64: "p-16",
  80: "p-20",
  96: "p-24",
  120: "p-30",
  160: "p-40",
};

const RADII = [
  { figma: "radius/none", utility: "rounded-none", px: "0px" },
  { figma: "radius/xs", utility: "rounded-xs", px: "4px" },
  { figma: "radius/sm", utility: "rounded-sm", px: "8px" },
  { figma: "radius/md", utility: "rounded-md", px: "12px" },
  { figma: "radius/lg", utility: "rounded-lg", px: "16px" },
  { figma: "radius/xl", utility: "rounded-xl", px: "24px" },
  { figma: "radius/2xl", utility: "rounded-2xl", px: "32px" },
  { figma: "radius/full", utility: "rounded-full", px: "999px" },
];

const SHADOWS = [
  {
    figma: "Elevation/1 · Card rest",
    utility: "shadow-elevation-1",
    cssVar: "--shadow-elevation-1",
  },
  {
    figma: "Elevation/2 · Card hover",
    utility: "shadow-elevation-2",
    cssVar: "--shadow-elevation-2",
  },
  {
    figma: "Elevation/3 · Menu & dropdown",
    utility: "shadow-elevation-3",
    cssVar: "--shadow-elevation-3",
  },
  {
    figma: "Elevation/4 · Overlay & sticky header",
    utility: "shadow-elevation-4",
    cssVar: "--shadow-elevation-4",
  },
  {
    figma: "Elevation/Brand glow · CTA hover",
    utility: "shadow-brand-glow",
    cssVar: "--shadow-brand-glow",
  },
  {
    figma: "Focus/Ring",
    utility: "shadow-focus-ring",
    cssVar: "--shadow-focus-ring",
  },
  {
    figma: "Focus/Ring · Error",
    utility: "shadow-focus-ring-error",
    cssVar: "--shadow-focus-ring-error",
  },
];

const LAYOUT_ROWS = [
  ["breakpoint/desktop", "--canvas-desktop", "1440px", "artboard width"],
  ["breakpoint/tablet", "--canvas-tablet", "768px", "artboard width"],
  ["breakpoint/mobile", "--canvas-mobile", "375px", "artboard width"],
  ["— (text styles)", "--breakpoint-desktop", "1280px", "desktop: variant"],
  ["— (text styles)", "--breakpoint-tablet", "768px", "tablet: variant"],
  ["container/desktop", "--container-desktop", "1280px", "max-w-desktop"],
  ["container/tablet", "--container-tablet", "704px", "max-w-tablet"],
  ["container/mobile", "--container-mobile", "343px", "max-w-mobile"],
  ["container/narrow", "--container-narrow", "880px", "max-w-narrow"],
  ["margin/desktop", "--margin-desktop", "80px", "page gutter"],
  ["margin/tablet", "--margin-tablet", "32px", "page gutter"],
  ["margin/mobile", "--margin-mobile", "16px", "page gutter"],
  ["gutter/desktop", "--gutter-desktop", "24px", "grid gutter"],
  ["gutter/tablet", "--gutter-tablet", "20px", "grid gutter"],
  ["gutter/mobile", "--gutter-mobile", "16px", "grid gutter"],
  ["columns/desktop", "--columns-desktop", "12", "grid columns"],
  ["columns/tablet", "--columns-tablet", "8", "grid columns"],
  ["columns/mobile", "--columns-mobile", "4", "grid columns"],
  ["section-y/desktop", "--section-y-desktop", "120px", "section rhythm"],
  ["section-y/tablet", "--section-y-tablet", "96px", "section rhythm"],
  ["section-y/mobile", "--section-y-mobile", "64px", "section rhythm"],
  ["section-y-compact/desktop", "--section-y-compact-desktop", "80px", ""],
  ["section-y-compact/tablet", "--section-y-compact-tablet", "64px", ""],
  ["section-y-compact/mobile", "--section-y-compact-mobile", "48px", ""],
  ["stack/heading-to-content", "--stack-heading-to-content", "64px", ""],
  ["stack/heading-to-content-mobile", "--stack-heading-to-content-mobile", "40px", ""],
];

const GRADIENTS = [
  { figma: "Gradient/Violet · App icon", cssVar: "--gradient-violet-app-icon" },
  { figma: "Gradient/Violet deep", cssVar: "--gradient-violet-deep" },
  { figma: "Overlay/Navy scrim · Text on photo", cssVar: "--overlay-navy-scrim" },
];

/* --------------------------------------------------------------------- page */

export default function TokensPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="max-w-desktop tablet:px-8 mx-auto w-full px-5 py-12">
      <header className="mb-10">
        <p className="text-ui-overline text-text-brand">
          The Working Tribe · Development only
        </p>
        <h1 className="text-desktop-heading-h1 text-text-heading mt-3">Design tokens</h1>
        <p className="text-desktop-body-regular max-w-narrow text-text-body mt-4">
          299 Figma variables across 6 collections, 42 text styles, 9 effect styles and 4
          paint styles — extracted read-only from <Mono>fvvCEIlOGqFy33Tdw3eUSI</Mono>.
          Labels are the Figma paths, so every row can be compared directly with the{" "}
          <strong className="text-text-heading">🎨 Design System</strong> page.
        </p>
        <p className="text-desktop-body-small text-text-muted mt-3">
          This route 404s in production.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          id="font"
          title="Font"
          note="Sofia Sans Semi Condensed — variable (wght 1–1000), v4.101, SIL OFL 1.1. Self-hosted via next/font/local; no runtime external request."
        >
          <div className="space-y-4">
            {[
              { label: "Light · font/weight/light · 300", w: 300 },
              { label: "Regular · font/weight/regular · 400", w: 400 },
              { label: "Bold · font/weight/bold · 700", w: 700 },
            ].map((f) => (
              <div key={f.w}>
                <p className="text-ui-caption text-text-muted mb-1">{f.label}</p>
                <p
                  className="text-desktop-heading-h3 text-text-heading"
                  style={{ fontWeight: f.w }}
                >
                  ABCDEFGHIJKLM abcdefghijklm 0123456789
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="primitives"
          title="Primitive colours"
          note="Figma collection `Primitives` (56). These deliberately generate NO Tailwind utilities — components must use the semantic layer below."
        >
          <SwatchGrid items={PRIMITIVES} />
          <h3 className="text-desktop-heading-h4 text-text-heading mt-10 mb-4">
            Alpha primitives
          </h3>
          <div
            className="rounded-md p-4"
            style={{ backgroundColor: "var(--neutral-700)" }}
          >
            <SwatchGrid items={PRIMITIVE_ALPHAS} />
          </div>
        </Section>

        <Section
          id="semantic"
          title="Semantic colours"
          note="Figma collection `Color` (65). Declared with @theme inline, so `bg-background-brand` resolves straight to `--violet-500`."
        >
          <div className="space-y-10">
            {Object.entries(SEMANTIC).map(([group, items]) => (
              <div key={group}>
                <h3 className="text-desktop-heading-h4 text-text-heading mb-4">
                  {group}
                </h3>
                <SwatchGrid items={items} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="segments"
          title="Service segment colours"
          note="Figma collection `Segment` (36). Every service page stays monochromatic in its own hue — drive this from a typed `segment` prop, never by hand-picking colours."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse">
              <thead>
                <tr>
                  <th className="text-ui-label-regular border-border-default text-text-heading border-b p-2 text-left">
                    role
                  </th>
                  {SEGMENTS.map((s) => (
                    <th
                      key={s}
                      className="text-ui-label-regular border-border-default text-text-heading border-b p-2 text-left"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEGMENT_ROLES.map((role) => (
                  <tr key={role}>
                    <td className="text-ui-caption border-border-subtle text-text-body border-b p-2">
                      segment/*/{role}
                    </td>
                    {SEGMENTS.map((s) => (
                      <td
                        key={s}
                        className="border-border-subtle border-b p-2 align-middle"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="border-border-subtle inline-block h-8 w-12 shrink-0 rounded-xs border"
                            style={{
                              backgroundColor: `var(--color-segment-${s}-${role})`,
                            }}
                          />
                          <Mono>{`segment-${s}-${role}`}</Mono>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="type-desktop"
          title="Typography — Desktop (≥1280)"
          note="All 42 Figma text styles are implemented as fixed utilities. They do not change with the viewport: that is deliberate, so each can be verified against its Figma spec at any window size."
        >
          <TypeTable items={DESKTOP_TYPE} />
        </Section>

        <Section id="type-tablet" title="Typography — Tablet (768–1279)">
          <TypeTable items={TABLET_TYPE} />
        </Section>

        <Section id="type-mobile" title="Typography — Mobile (<768)">
          <TypeTable items={MOBILE_TYPE} />
        </Section>

        <Section
          id="type-ui"
          title="Typography — UI (all breakpoints)"
          note="UI/Overline carries UPPERCASE in Figma; the `.text-ui-overline` class adds the text-transform the --text-* namespace cannot express."
        >
          <TypeTable items={UI_TYPE} />
        </Section>

        <Section
          id="spacing"
          title="Spacing scale"
          note="Figma `space/*` (4/8-point). Tailwind's default 0.25rem scale already reproduces every value, so it was left intact rather than overridden — the utility column is the one to type."
        >
          <ul className="space-y-2">
            {SPACING.map((n) => (
              <li key={n} className="flex items-center gap-4">
                <span className="text-ui-caption text-text-body w-24 shrink-0">
                  space/{n}
                </span>
                <span className="text-ui-caption text-text-muted w-14 shrink-0">
                  {n}px
                </span>
                <span className="w-20 shrink-0">
                  <Mono>{TW_SPACING_EQUIV[n]}</Mono>
                </span>
                <span
                  className="h-4 rounded-xs"
                  style={{
                    width: `var(--space-${n})`,
                    backgroundColor: "var(--color-primary-default)",
                    minWidth: n === 0 ? "1px" : undefined,
                  }}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="radius"
          title="Border radius"
          note="Figma `radius/*`. Tailwind's stock radius scale is cleared, so these names carry the brand values."
        >
          <ul className="tablet:grid-cols-4 grid grid-cols-2 gap-4">
            {RADII.map((r) => (
              <li key={r.figma} className="space-y-2">
                <div
                  className="border-border-brand h-20 w-full border"
                  style={{
                    borderRadius: `var(--radius-${r.figma.split("/")[1]})`,
                    backgroundColor: "var(--color-primary-soft)",
                  }}
                />
                <p className="text-ui-label-regular text-text-heading">{r.figma}</p>
                <p className="text-ui-caption text-text-muted">{r.px}</p>
                <Mono>{r.utility}</Mono>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="shadows"
          title="Shadows & effects"
          note="Figma effect styles (9). Blur/Header glass is a 24px background blur, exposed as --blur-header-glass."
        >
          <ul className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-8">
            {SHADOWS.map((s) => (
              <li key={s.figma} className="space-y-3">
                <div
                  className="bg-surface-default flex h-24 items-center justify-center rounded-md"
                  style={{ boxShadow: `var(${s.cssVar})` }}
                >
                  <span className="text-ui-caption text-text-muted">
                    {s.figma.split("·")[0].trim()}
                  </span>
                </div>
                <p className="text-ui-label-regular text-text-heading">{s.figma}</p>
                <Mono>{s.utility}</Mono>
              </li>
            ))}
            <li className="space-y-3">
              <div
                className="flex h-24 items-center justify-center rounded-md"
                style={{ backgroundColor: "var(--navy-800)" }}
              >
                <span
                  className="rounded-sm px-4 py-2"
                  style={{
                    boxShadow: "var(--shadow-focus-ring-on-dark)",
                    backgroundColor: "var(--navy-900)",
                    color: "var(--neutral-0)",
                  }}
                >
                  <span className="text-ui-caption">On dark</span>
                </span>
              </div>
              <p className="text-ui-label-regular text-text-heading">
                Focus/Ring · On dark
              </p>
              <Mono>shadow-focus-ring-on-dark</Mono>
            </li>
          </ul>
        </Section>

        <Section
          id="gradients"
          title="Gradients & overlays"
          note="Figma paint styles (4). Not a Tailwind namespace — use via bg-(image:--gradient-violet-deep)."
        >
          <ul className="tablet:grid-cols-3 grid grid-cols-1 gap-4">
            {GRADIENTS.map((g) => (
              <li key={g.cssVar} className="space-y-2">
                <div
                  className="border-border-subtle h-28 rounded-md border"
                  style={
                    {
                      backgroundImage: `var(${g.cssVar})`,
                      backgroundColor: "var(--neutral-200)",
                    } as CSSProperties
                  }
                />
                <p className="text-ui-label-regular text-text-heading">{g.figma}</p>
                <Mono>{g.cssVar}</Mono>
              </li>
            ))}
            <li className="space-y-2">
              <div
                className="border-border-subtle h-28 rounded-md border"
                style={{ backgroundColor: "var(--overlay-violet-wash)" }}
              />
              <p className="text-ui-label-regular text-text-heading">
                Overlay/Violet wash · Photo duotone
              </p>
              <Mono>--overlay-violet-wash</Mono>
            </li>
          </ul>
        </Section>

        <Section
          id="layout"
          title="Layout & breakpoints"
          note="Figma `Layout` (24) plus the two CSS breakpoints derived from the text-style thresholds. The Figma breakpoint/* values are ARTBOARD widths and are exposed as --canvas-*; they are not CSS media-query boundaries."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse">
              <thead>
                <tr>
                  {["Figma", "CSS variable", "Value", "Use"].map((h) => (
                    <th
                      key={h}
                      className="text-ui-label-regular border-border-default text-text-heading border-b p-2 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LAYOUT_ROWS.map(([figma, cssVar, value, use]) => (
                  <tr key={cssVar}>
                    <td className="text-ui-caption border-border-subtle text-text-body border-b p-2">
                      {figma}
                    </td>
                    <td className="border-border-subtle border-b p-2">
                      <Mono>{cssVar}</Mono>
                    </td>
                    <td className="text-ui-caption border-border-subtle text-text-heading border-b p-2">
                      {value}
                    </td>
                    <td className="text-ui-caption border-border-subtle text-text-muted border-b p-2">
                      {use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}
