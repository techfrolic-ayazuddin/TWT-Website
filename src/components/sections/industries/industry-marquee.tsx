import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";

/**
 * Industries marquee — Figma `Industry Marquee — Light Variation` (`185:11530`,
 * placed in the frame as `185:11636`) and `Marquee / Industries` (`180:10249`).
 *
 * Mechanics, from the component documentation (CLAUDE.md §7.3):
 *
 *  - The track holds THREE identical sets. It slides exactly ONE set width,
 *    linearly, then snaps back; `End` is pixel-identical to `Start`, so the
 *    loop is seamless. 45 s per set (Light) / 40 s (dark).
 *  - Done as a CSS transform of the track by −1/3 of its own width: that is
 *    one set at any label size, so it stays seamless when the type scales
 *    down on tablet and mobile. (Figma's note says one Light set is 2531px
 *    but the set measures 2337px — sizing from the real width sidesteps it.)
 *  - A clipped viewport with 200px edge fades.
 *  - `Motion=Reduced` is the designed static alternative: the full, legible
 *    set in one wrapping row — not a frozen mid-scroll frame, not an empty
 *    track. It is shown under `prefers-reduced-motion: reduce`; the animated
 *    track is then removed from the page entirely.
 *
 * Accessibility. The three repeated sets are `aria-hidden`; assistive tech
 * gets the list once (the static row in reduced motion, otherwise a single
 * screen-reader sentence). Hovering the strip pauses it (WCAG 2.2.2).
 *
 * Edge-fade width, scroll speed and bar geometry are one-off values read from
 * Figma — legitimate token exceptions (CLAUDE.md §3.1).
 */

export type MarqueeTone = "light" | "dark";

type ToneStyle = {
  viewport: string;
  fade: string;
  index: string;
  label: string;
  /** Pause between a label and its separator, and after the separator. */
  duration: string;
  staticLabel: string;
  staticIndex: string;
};

const TONES: Record<MarqueeTone, ToneStyle> = {
  // Navy display type on white between hairline rules, violet index numerals.
  light: {
    viewport: "bg-surface-default border-border-subtle border-y py-9",
    fade: "from-surface-default to-surface-default/0",
    index: "text-ui-overline text-text-brand",
    label: cn(type.h1, "text-text-heading"),
    duration: "45s",
    staticLabel: cn(type.h3, "text-text-heading"),
    staticIndex: "text-ui-overline text-text-brand",
  },
  // White display type on violet, yellow index numerals, brand dots.
  dark: {
    viewport: "bg-background-brand py-11",
    fade: "from-background-brand to-background-brand/0",
    index: "text-ui-label-large text-accent-yellow",
    label: cn(type.hero, "text-text-inverse"),
    duration: "40s",
    staticLabel: cn(type.h3, "text-text-inverse"),
    // Figma `Motion=Reduced` (dark) draws the labels without index numerals.
    staticIndex: "hidden",
  },
};

/** Figma `Separator · figure bars` (Light) / `Separator · brand dots` (dark). */
function Separator({ tone, compact }: { tone: MarqueeTone; compact?: boolean }) {
  const light = tone === "light";
  const mark = light
    ? compact
      ? "h-[3px] w-3 rounded-[2px]"
      : "h-1 w-[18px] rounded-[2px]"
    : compact
      ? "size-2 rounded-full"
      : "size-3 rounded-full";
  return (
    <span
      aria-hidden="true"
      className={cn("flex shrink-0 items-center", compact ? "gap-[3px]" : "gap-1.5")}
    >
      <span className={cn("bg-secondary-default", mark)} />
      <span className={cn("bg-accent-orange", mark)} />
      <span className={cn("bg-accent-yellow", mark)} />
    </span>
  );
}

const index = (i: number) => String(i + 1).padStart(2, "0");

export function IndustryMarquee({
  items,
  summary,
  tone = "light",
  className,
}: {
  items: string[];
  /** Spoken once to assistive tech, e.g. "Our specialisations". */
  summary: string;
  tone?: MarqueeTone;
  className?: string;
}) {
  const t = TONES[tone];

  return (
    <div className={cn("relative overflow-hidden", t.viewport, className)}>
      <p className="sr-only motion-reduce:hidden">
        {summary}: {items.join(", ")}.
      </p>

      {/* Animated track — three identical sets, hidden entirely under
          reduced motion. */}
      {/* Figma: the track is 72px inside a 64px set — 4px of air above and below. */}
      <div aria-hidden="true" className="py-1 motion-reduce:hidden">
        <div
          className="marquee-track flex w-max"
          style={{ "--marquee-duration": t.duration } as CSSProperties}
        >
          {[0, 1, 2].map((set) => (
            <div key={set} className="flex shrink-0">
              {items.map((label, i) => (
                <div
                  key={label}
                  className="tablet:gap-10 tablet:pr-10 flex shrink-0 items-center gap-6 pr-6"
                >
                  <div className="flex items-start gap-3">
                    <span className={cn("pt-1", t.index)}>{index(i)}</span>
                    <span className={cn("whitespace-nowrap", t.label)}>{label}</span>
                  </div>
                  <Separator tone={tone} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades — 200px in Figma, narrower on phones. */}
        <span
          className={cn(
            "tablet:w-50 pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r",
            t.fade,
          )}
        />
        <span
          className={cn(
            "tablet:w-50 pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l",
            t.fade,
          )}
        />
      </div>

      {/* `Motion=Reduced` — the complete static row. */}
      {/* Figma `Motion=Reduced`: one centred row inside 40px of padding (1360px at 1440). */}
      <ul className="desktop:px-10 mx-auto hidden max-w-(--canvas-desktop) flex-wrap items-center justify-center gap-y-3 px-(--page-margin) motion-reduce:flex">
        {items.map((label, i) => (
          <li key={label} className="flex items-center gap-6 pr-6 last:pr-0">
            <span className="flex items-start gap-2">
              <span className={cn("pt-1", t.staticIndex)}>{index(i)}</span>
              <span className={t.staticLabel}>{label}</span>
            </span>
            {i < items.length - 1 ? <Separator tone={tone} compact /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
