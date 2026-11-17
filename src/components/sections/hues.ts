import type { Hue } from "@/content/about";

/**
 * The four brand hues as the inner pages use them (Why TWT, Training
 * Programs). Static class strings so Tailwind can see every utility.
 *
 *   label  small numerals / overlines  violet/700 · pink/700 · orange/700 · yellow/900
 *   word   display words               violet/500 · pink/700 · orange/700 · yellow/900
 *   node   journey markers             violet/500 · pink/700 · orange/700 · yellow/500
 *   rule   4px top borders             violet/500 · pink/500 · orange/500 · yellow/500
 *   bar    solid accent bars           violet/500 · pink/500 · orange/500 · yellow/500
 *   badge  `Badge` tone                Brand · Magenta · Orange · Yellow
 */
export const HUE: Record<
  Hue,
  {
    label: string;
    word: string;
    node: string;
    rule: string;
    bar: string;
    badge: "brand" | "magenta" | "orange" | "yellow";
  }
> = {
  violet: {
    label: "text-text-brand-strong",
    word: "text-text-brand",
    node: "bg-primary-default text-text-on-primary",
    rule: "border-t-primary-default",
    bar: "bg-primary-default",
    badge: "brand",
  },
  pink: {
    label: "text-text-secondary",
    word: "text-text-secondary",
    node: "bg-secondary-strong text-text-on-primary",
    rule: "border-t-secondary-default",
    bar: "bg-secondary-default",
    badge: "magenta",
  },
  orange: {
    label: "text-segment-orange-text",
    word: "text-segment-orange-text",
    node: "bg-accent-orange-strong text-text-on-primary",
    rule: "border-t-accent-orange",
    bar: "bg-accent-orange",
    badge: "orange",
  },
  yellow: {
    label: "text-text-warning",
    word: "text-text-warning",
    node: "bg-accent-yellow text-text-on-yellow",
    rule: "border-t-accent-yellow",
    bar: "bg-accent-yellow",
    badge: "yellow",
  },
};
