import localFont from "next/font/local";
import type { CSSProperties } from "react";

/**
 * Sofia Sans Semi Condensed — the project's brand typeface (Figma
 * `font/family/brand`).
 *
 * Files: the official Fontsource variable WOFF2 subsets, taken unmodified from
 * `src/fonts/sofia-sans-semi-condensed.zip` (`variable/`):
 *
 *   sofia-sans-semi-condensed-latin-wght-normal.woff2      41.5 KB  preloaded
 *   sofia-sans-semi-condensed-latin-ext-wght-normal.woff2  18.7 KB  on demand
 *
 * Name table: "Sofia Sans Semi Condensed", Version 4.101, one `wght` axis
 * 1–1000 (default 400) — so Light 300, Regular 400 and Bold 700 are real
 * instances, never synthesised.
 *
 * Licence: SIL Open Font License 1.1 — `src/fonts/OFL.txt`.
 * Copyright 2019 The Sofia Sans Project Authors.
 *
 * Subsets. Every character the site renders today (checked on /, /about and
 * /why-twt plus every string in `src/content/`) is in the Latin subset, so
 * only Latin is preloaded. Latin Extended carries the same `unicode-range`
 * Fontsource ships, so the browser downloads it only when a page actually
 * contains such a character (a future name, say). Greek and Cyrillic are not
 * used and are not shipped. Italic is not shipped: no Figma text style uses
 * it (CLAUDE.md §12).
 *
 * Antipasto Pro must NOT be used — the only files available are desktop-trial
 * and are unlicensed for web embedding (CLAUDE.md §12).
 */

/*
 * The two `unicode-range` values are Fontsource’s `latin` and `latin-ext`
 * ranges. next/font requires its options as inline literals, so they are
 * written out in place rather than shared as constants.
 */

const brandLatin = localFont({
  src: [
    {
      path: "../fonts/sofia-sans-semi-condensed-latin-wght-normal.woff2",
      weight: "1 1000",
      style: "normal",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  display: "swap",
  preload: true,
  // Next measures this file and emits a size-adjusted local Arial face, so
  // the swap from fallback to Sofia Sans does not shift the layout.
  adjustFontFallback: "Arial",
  fallback: [],
});

const brandLatinExt = localFont({
  src: [
    {
      path: "../fonts/sofia-sans-semi-condensed-latin-ext-wght-normal.woff2",
      weight: "1 1000",
      style: "normal",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});

/** next/font returns `'<family>', '<family> Fallback'` — split it apart. */
const faces = (font: { style: { fontFamily: string } }) =>
  font.style.fontFamily.split(",").map((name) => name.trim());

const [latinFace, latinFallback] = faces(brandLatin);
const [latinExtFace] = faces(brandLatinExt);

/**
 * The single brand stack. Order matters:
 *
 *   1. Sofia Sans, Latin subset
 *   2. Sofia Sans, Latin Extended subset
 *   3. Next's metric-matched fallback — painted only while the font loads
 *   4. `sans-serif` — only if all of the above are unavailable
 *
 * Both Sofia faces sit before the fallback: a fallback without a
 * `unicode-range` placed between them would claim every accented character
 * and paint it in Arial. `system-ui` / `ui-sans-serif` are deliberately
 * absent — on Windows `system-ui` is Segoe UI.
 */
export const brandFontFamily = [latinFace, latinExtFace, latinFallback, "sans-serif"]
  .filter(Boolean)
  .join(", ");

/**
 * Applied to `<html>` (the `:root` element), where `tokens.css` resolves
 * `--font-sans: var(--font-brand)`.
 */
export const brandFontStyle = { "--font-brand": brandFontFamily } as CSSProperties;
