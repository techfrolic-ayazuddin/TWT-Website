/**
 * Google Maps links.
 *
 * Built with the documented **Maps URL API** (`/maps/search/?api=1&query=…`),
 * which is a plain link: no API key, no script, no iframe and no third-party
 * code on our page. Nothing is requested from Google until the visitor
 * actually clicks, so the Contact page stays free of embedded trackers.
 *
 * The address is passed through **verbatim** — percent-encoded, never
 * reformatted, reordered or trimmed. Office addresses are client data and the
 * Asia one is still unconfirmed (CLAUDE.md §6.5), so this must not "tidy" it;
 * the search string is exactly the string we display.
 */

const MAPS_SEARCH = "https://www.google.com/maps/search/?api=1&query=";

/** A Google Maps search link for `address`, exactly as supplied. */
export function googleMapsSearchHref(address: string): string {
  return `${MAPS_SEARCH}${encodeURIComponent(address)}`;
}
