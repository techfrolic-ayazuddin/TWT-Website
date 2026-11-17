import type { Hue } from "@/content/about";

/**
 * The segment palette as the Services Overview frame uses it
 * (`B0 · Services Overview — Desktop`, `85:923`).
 *
 * `sections/hues.ts` covers the inner pages' numerals, rules and badges; this
 * frame also needs the soft panel fills, the segment borders and the big index
 * numerals, so those live here rather than being bolted onto the shared map.
 * Every value is a `Segment` token — the per-service hue is never hand-picked
 * (CLAUDE.md §3).
 *
 *   accent   the 48 × 4 figure bar and the big index numeral   {hue}/accent
 *   numeral  the big module numeral on a service DETAIL page. Same as
 *            `accent` except for orange: `orange/500` on `background/subtle`
 *            is 2.86:1, below the 3:1 WCAG AA needs for large text. Figma's
 *            own Global Solutions module numbers use `orange/700`
 *            (`91:3543`), so this follows the design rather than diverging.
 *   label    overlines, links and arrows                       {hue}/text
 *   soft     panel and chip fills                              {hue}/soft
 *   border   panel and module hairlines                        {hue}/border
 *   solid    filled icon tiles                                 {hue}/solid
 *   onSolid  text and icons on a filled tile                   {hue}/on-solid
 *
 * Written out in full so Tailwind's scanner can see every utility.
 */
export const SERVICE_HUE: Record<
  Hue,
  {
    accent: string;
    numeral: string;
    accentBg: string;
    label: string;
    soft: string;
    border: string;
    solid: string;
    onSolid: string;
    surface: "dark" | "light";
  }
> = {
  violet: {
    accent: "text-segment-violet-accent",
    numeral: "text-segment-violet-accent",
    accentBg: "bg-segment-violet-accent",
    label: "text-segment-violet-text",
    soft: "bg-segment-violet-soft",
    border: "border-segment-violet-border",
    solid: "bg-segment-violet-solid",
    onSolid: "text-segment-violet-on-solid",
    surface: "dark",
  },
  pink: {
    accent: "text-segment-pink-accent",
    numeral: "text-segment-pink-accent",
    accentBg: "bg-segment-pink-accent",
    label: "text-segment-pink-text",
    soft: "bg-segment-pink-soft",
    border: "border-segment-pink-border",
    solid: "bg-segment-pink-solid",
    onSolid: "text-segment-pink-on-solid",
    surface: "dark",
  },
  orange: {
    accent: "text-segment-orange-accent",
    // Contrast — see the note above.
    numeral: "text-segment-orange-text",
    accentBg: "bg-segment-orange-accent",
    label: "text-segment-orange-text",
    soft: "bg-segment-orange-soft",
    border: "border-segment-orange-border",
    solid: "bg-segment-orange-solid",
    onSolid: "text-segment-orange-on-solid",
    surface: "dark",
  },
  yellow: {
    // Figma draws the yellow index numeral in yellow/900, not yellow/500 —
    // yellow/500 on white does not meet contrast (CLAUDE.md §8).
    accent: "text-segment-yellow-text",
    numeral: "text-segment-yellow-text",
    accentBg: "bg-segment-yellow-accent",
    label: "text-segment-yellow-text",
    soft: "bg-segment-yellow-soft",
    border: "border-segment-yellow-border",
    solid: "bg-segment-yellow-accent",
    onSolid: "text-segment-yellow-on-solid",
    surface: "light",
  },
};

/** Figma `Badge` tone per segment — the shared `Badge` component's `tone`. */
export const HUE_BADGE: Record<Hue, "brand" | "magenta" | "orange" | "yellow"> = {
  violet: "brand",
  pink: "magenta",
  orange: "orange",
  yellow: "yellow",
};
