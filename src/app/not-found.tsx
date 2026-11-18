import type { Metadata } from "next";
import { NotFoundSection } from "@/components/sections/not-found/not-found-section";
import { notFoundMeta } from "@/content/not-found";

export const metadata: Metadata = notFoundMeta;

/**
 * Custom 404. It lives at the app root, so it is rendered INSIDE the root
 * layout — the shared Header and Original Footer wrap it with no extra work —
 * and Next sets `noindex` and the 404 status itself.
 *
 * With `output: "export"` (`npm run build:static`) Next emits it as
 * `out/404.html` (plus `out/404/index.html` under `trailingSlash`), which is
 * the file static hosts serve for an unknown URL.
 */
export default function NotFound() {
  return <NotFoundSection />;
}
