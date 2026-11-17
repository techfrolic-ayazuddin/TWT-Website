import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section decor — Figma `Decor/Pattern/*`, `Decor/Glow`, `Decor/Symbol
 * Watermark`.
 *
 * The pattern artwork is exported from the Figma components as SVG (read-only)
 * into `public/decor/`. Figma instances stretch the component to the box they
 * are given, so the files carry `preserveAspectRatio="none"` and the image
 * simply fills its box.
 *
 * Positions and sizes are the instance coordinates from the 1440 artboard —
 * decorative one-offs, i.e. legitimate token exceptions (CLAUDE.md §3.1).
 */

const PATTERNS = {
  "fine-grid-light": "/decor/fine-grid-light.svg",
  "dot-field-light": "/decor/dot-field-light.svg",
  "flow-lines-light": "/decor/flow-lines-light.svg",
  "flow-lines-dark": "/decor/flow-lines-dark.svg",
  "contour-dark": "/decor/contour-dark.svg",
  "orbit-arcs-dark": "/decor/orbit-arcs-dark.svg",
  "symbol-watermark-light": "/decor/symbol-watermark-light.svg",
  /*
   * `-1px` variants carry `vector-effect="non-scaling-stroke"`. Figma keeps a
   * pattern stroke at 1px when the instance is stretched; a plain SVG scales
   * the stroke with the box, so a 720-wide pattern drawn 1520 wide came out
   * about twice as heavy as the design. Used by the inner pages.
   */
  "fine-grid-light-1px": "/decor/fine-grid-light-1px.svg",
  "flow-lines-light-1px": "/decor/flow-lines-light-1px.svg",
  "flow-lines-dark-1px": "/decor/flow-lines-dark-1px.svg",
  "contour-dark-1px": "/decor/contour-dark-1px.svg",
  "contour-light-1px": "/decor/contour-light-1px.svg",
  /*
   * `Decor/Pattern/Light → Type=Orbit arcs, Tone=Light` as the Services
   * Overview places it: the Global Solutions instance (`91:3567`) overrides
   * the component's violet stroke to `orange/500` at 16%.
   */
  "orbit-arcs-light-1px": "/decor/orbit-arcs-light-1px.svg",
} as const;

export type PatternName = keyof typeof PATTERNS;

type Box = { x: number; y: number; w: number; h: number; opacity?: number };

/**
 * A 1440-wide stage centred in the section, so artboard coordinates land
 * exactly at desktop and stay centred at every other width. Clipped by the
 * section, hidden from assistive tech.
 */
export function DecorLayer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-y-0 left-1/2 w-(--canvas-desktop) -translate-x-1/2">
        {children}
      </div>
    </div>
  );
}

const boxStyle = ({ x, y, w, h, opacity }: Box): CSSProperties => ({
  left: x,
  top: y,
  width: w,
  height: h,
  opacity,
});

export function Pattern({
  name,
  className,
  ...box
}: Box & { name: PatternName; className?: string }) {
  return (
    <Image
      src={PATTERNS[name]}
      alt=""
      width={box.w}
      height={box.h}
      unoptimized
      className={cn("absolute max-w-none", className)}
      style={boxStyle(box)}
    />
  );
}

/** Figma `Decor/Glow` — a radial gradient from 32% of the hue to transparent. */
const GLOW = {
  violet: "var(--violet-500)",
  yellow: "var(--yellow-500)",
} as const;

export function Glow({
  tone = "violet",
  className,
  ...box
}: Box & { tone?: keyof typeof GLOW; className?: string }) {
  return (
    <div
      className={cn("absolute rounded-full", className)}
      style={{
        ...boxStyle(box),
        backgroundImage: `radial-gradient(closest-side, color-mix(in srgb, ${GLOW[tone]} 32%, transparent), transparent)`,
      }}
    />
  );
}
