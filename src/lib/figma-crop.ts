import type { CSSProperties } from "react";

/**
 * A Figma `CROP` image fill: `imageTransform` is `[[a, 0, tx], [0, d, ty]]`.
 * It maps the node's own box onto the photograph, so the photograph is the
 * `[tx, tx + a] × [ty, ty + d]` window of itself (fractions of its width and
 * height) shown inside the node.
 */
export type FigmaCrop = { a: number; d: number; tx: number; ty: number };

const pct = (value: number) => `${+(value * 100).toFixed(3)}%`;

/**
 * CSS for an `<img>` that reproduces a `CROP` fill EXACTLY, inside a
 * `position: relative; overflow: hidden` box shaped like the Figma node.
 *
 * `object-fit: cover` + `object-position` cannot: it always scales the photo to
 * just cover the box, while Figma's window can be slightly tighter (the Home
 * hero zooms in a further 0.56 %, which moves detail by 2–4 px) and need not be
 * centred. Everything here is a percentage of the box, so the crop stays true
 * whatever size the box is scaled to — the same behaviour Figma's constraints
 * give. The photograph keeps its own aspect ratio; do not add `object-fit`.
 *
 * Values are Figma's own, kept as drawn (CLAUDE.md §3.1: image crop offsets are
 * a legitimate token exception) — never rounded by hand.
 */
export function figmaCropStyle({ a, d, tx, ty }: FigmaCrop): CSSProperties {
  return {
    position: "absolute",
    maxWidth: "none",
    width: pct(1 / a),
    height: pct(1 / d),
    left: pct(-tx / a),
    top: pct(-ty / d),
  };
}
