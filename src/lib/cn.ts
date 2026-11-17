import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Our 42 Figma type steps are generated from Tailwind's `--text-*` namespace,
 * so they come out as `text-desktop-heading-h1`, `text-ui-button-large` and
 * so on. tailwind-merge does not know them, and its default `text-color`
 * group matches any `text-*` value — so it treated a type step and a colour
 * as the same group and silently dropped one of them:
 *
 *   cn("text-text-on-primary", "text-ui-button-large")
 *     → "text-ui-button-large"   (the colour vanished)
 *
 * Registering the type steps under `font-size` puts them in their own group,
 * so a type step and a colour can coexist. Our colour tokens never begin with
 * `desktop-`, `tablet-`, `mobile-` or `ui-`, so the two sets cannot overlap.
 */
const isTypeStep = (value: string) => /^(desktop|tablet|mobile|ui)-/.test(value);

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [isTypeStep] }],
    },
  },
});

/** Merge Tailwind class names, letting later classes win over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
