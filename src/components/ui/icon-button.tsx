import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

/**
 * Icon Button — Figma `Icon Button` (32:66).
 *
 * Figma `Style` axis → `variant` prop. `State` is interaction, so it maps to
 * CSS pseudo-classes rather than a prop.
 *
 * Geometry from Figma: a single 48×48 square at `radius/full`. There is no
 * size axis in the design, so none is invented here.
 *
 * The Inverse style carries a 1px `border/default` stroke in every state,
 * which the other styles do not.
 */

const iconButton = cva(
  [
    "inline-flex size-12 shrink-0 items-center justify-center rounded-full",
    "transition-[background-color,box-shadow,border-color] duration-150",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-background-brand text-text-on-primary",
          "hover:bg-primary-hover hover:shadow-brand-glow",
          "active:bg-primary-pressed active:shadow-none",
          "focus-visible:shadow-focus-ring",
          "disabled:bg-disabled-background disabled:text-text-disabled disabled:shadow-none",
        ],
        secondary: [
          "bg-primary-soft text-text-brand",
          "hover:bg-primary-soft-hover",
          "active:bg-primary-soft-pressed",
          "focus-visible:shadow-focus-ring",
          "disabled:bg-disabled-background disabled:text-text-disabled",
        ],
        outline: [
          "border-(length:--stroke-default) border-border-brand text-text-brand bg-transparent",
          "hover:bg-primary-soft",
          "active:bg-primary-soft-hover",
          "focus-visible:border-(length:--stroke-strong) focus-visible:border-border-focus focus-visible:shadow-focus-ring",
          "disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent",
        ],
        inverse: [
          "border-(length:--stroke-hairline) border-border-default bg-inverse-default text-text-brand",
          "hover:bg-inverse-hover",
          "active:bg-inverse-pressed",
          "focus-visible:shadow-focus-ring-on-dark",
          "disabled:bg-inverse-ghost-hover disabled:text-text-inverse-muted",
        ],
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButton> & {
    icon: IconName;
    /**
     * Required: an icon-only control has no visible text, so it needs an
     * accessible name. There is no sensible default for this.
     */
    label: string;
  };

export function IconButton({
  variant,
  icon,
  label,
  className,
  type,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type ?? "button"}
      aria-label={label}
      className={cn(iconButton({ variant }), className)}
      {...props}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}

export { iconButton as iconButtonVariants };
