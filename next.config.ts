import type { NextConfig } from "next";

/**
 * `npm run build:static` sets this, via `scripts/build-static.mjs`, so the
 * export configuration is applied ONLY to that build. `npm run dev`,
 * `npm run build` and `npm start` are untouched and keep the Next.js image
 * optimizer.
 */
const isStaticExport = process.env.TWT_OUTPUT === "export";

const nextConfig: NextConfig = {
  // Cache Components / partial prefetching are intentionally left OFF for now.
  // The site is static-first marketing content, so the explicit `"use cache"`
  // model adds friction without a payoff yet. Revisit if we add live data
  // (e.g. a CMS-backed newsletter archive).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /**
   * Next 16 only serves the qualities listed here (default `[75]`) and rounds
   * any other `quality` prop to the nearest entry. 75 stays the default for
   * every image on the site; 90 is added so the two Home photographs, which are
   * big, smooth, AI-generated gradients that band and go "dull" at WebP q75,
   * can ask for it (`quality={90}` in `hero.tsx` / `brand-intro.tsx`).
   * Overridden by the static-export branch below, which serves the originals.
   */
  images: { qualities: [75, 90] },

  ...(isStaticExport
    ? {
        /** Emits plain HTML/CSS/JS to `out/` — no Node server required. */
        output: "export" as const,

        /**
         * A static host has no `/_next/image` endpoint, so the optimizer
         * cannot run. Every `<Image>` keeps its layout, `sizes` and `fill`
         * behaviour and serves the original file from `public/`.
         *
         * Consequence to hand on: the source JPEGs ship at full weight
         * (~17 MB across the site). Pre-compressing them, or putting a CDN
         * in front, is the first optimisation for whoever takes this on.
         */
        images: { unoptimized: true },

        /**
         * Emits `about/index.html` rather than `about.html`, so every clean
         * URL resolves on any static host with no rewrite rules at all.
         * See DEPLOYMENT-README.md.
         */
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
