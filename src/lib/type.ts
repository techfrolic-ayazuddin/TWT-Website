/**
 * Responsive type steps.
 *
 * Each Figma text role exists at three fixed sizes (Mobile / Tablet /
 * Desktop). A component picks the role; these strings switch the step at the
 * `tablet` and `desktop` breakpoints — no interpolation (CLAUDE.md §3).
 *
 * Written out in full so Tailwind's scanner can see every class.
 */
export const type = {
  hero: "text-mobile-display-hero tablet:text-tablet-display-hero desktop:text-desktop-display-hero",
  h1: "text-mobile-heading-h1 tablet:text-tablet-heading-h1 desktop:text-desktop-heading-h1",
  h2: "text-mobile-heading-h2 tablet:text-tablet-heading-h2 desktop:text-desktop-heading-h2",
  h3: "text-mobile-heading-h3 tablet:text-tablet-heading-h3 desktop:text-desktop-heading-h3",
  h4: "text-mobile-heading-h4 tablet:text-tablet-heading-h4 desktop:text-desktop-heading-h4",
  bodyLarge:
    "text-mobile-body-large tablet:text-tablet-body-large desktop:text-desktop-body-large",
  bodyLargeStrong:
    "text-mobile-body-large-strong tablet:text-tablet-body-large-strong desktop:text-desktop-body-large-strong",
  body: "text-mobile-body-regular tablet:text-tablet-body-regular desktop:text-desktop-body-regular",
  bodySmall:
    "text-mobile-body-small tablet:text-tablet-body-small desktop:text-desktop-body-small",
  quote:
    "text-mobile-quote-large tablet:text-tablet-quote-large desktop:text-desktop-quote-large",
  stat: "text-mobile-stat-number tablet:text-tablet-stat-number desktop:text-desktop-stat-number",
} as const;
