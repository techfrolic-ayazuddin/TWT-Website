import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

/**
 * Web app manifest — Figma Design System `10 · Favicon & Site Icon`
 * (`309:10928`), "Export specification":
 *
 *   icon-192.png · icon-512.png — 192 × 192 · 512 × 512 — Web app manifest
 *   (Android) — theme_color: #6242FB · background_color: #FFFFFF
 *
 * Both icons are rendered from the approved `Favicon / Colourway=Primary`
 * master and live in `public/`. The colours are the spec's, written here as
 * literals because a manifest is JSON served to the browser — it cannot read
 * CSS custom properties. They are `background/brand` and `background/page`.
 */
/**
 * The manifest is a route handler, so `output: "export"` requires it to
 * declare that it is static. It always was — nothing here reads a request —
 * but the declaration has to be explicit or the export build refuses to
 * collect it. Harmless to the normal `next build`, which already treated it
 * as static.
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description:
      "A people-first transformation firm. We advise leaders on where to go — and build the capability to get there.",
    start_url: "/",
    display: "standalone",
    theme_color: "#6242FB",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
