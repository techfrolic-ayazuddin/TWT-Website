import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Badge — Figma `Badge`.
 *
 * Single `Tone` axis, seven options, no interaction states. Geometry from
 * Figma: height 28, padding 6/12, `radius/full`, `UI/Overline` type (which
 * carries the uppercase transform via the `.text-ui-overline` utility).
 *
 * `Tone=Placeholder` is the solid-yellow badge the designs use to flag
 * unconfirmed content — pair it with a `@placeholder` marker in the content
 * layer (CLAUDE.md §6).
 */

const badge = cva(
  [
    "text-ui-overline inline-flex items-center justify-center rounded-full",
    "px-3 py-1.5 whitespace-nowrap",
  ],
  {
    variants: {
      tone: {
        brand: "bg-primary-soft text-text-brand",
        magenta: "bg-secondary-soft text-text-secondary",
        orange: "bg-accent-orange-soft text-segment-orange-text",
        yellow: "bg-accent-yellow-soft text-text-warning",
        neutral: "bg-background-muted text-text-body",
        inverse: "bg-inverse-ghost-hover text-text-inverse",
        placeholder: "bg-accent-yellow text-text-on-yellow",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)} {...props} />;
}

export { badge as badgeVariants };
