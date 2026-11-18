/**
 * 404 page content — `src/app/not-found.tsx`.
 *
 * Figma has NO 404 frame (searched every page 2026-11-18), so this page is
 * built from the existing tokens and components rather than transcribed. The
 * heading and button label are the client's words ("Page Not Found",
 * "Back to Home"); the supporting line is a short working line.
 *
 * @placeholder The supporting line is not client-approved copy — it was
 * written to fill the "short supporting line" the brief asks for. Swap it for
 * approved wording when there is any.
 */

export const notFoundMeta = {
  /** Rendered through the root title template: "Page not found — The Working Tribe". */
  title: "Page not found",
};

export const notFound = {
  eyebrow: "Error 404",
  title: "Page not found",
  message:
    "The page you are looking for may have moved or no longer exists. Let’s take you back to the start.",
  cta: { label: "Back to Home", href: "/" },
};
