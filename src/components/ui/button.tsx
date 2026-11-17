import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

/**
 * Button — Figma `Button/Primary` (31:96), `Button/Secondary` (31:199),
 * `Button/Outline` (31:302) and `Button/Inverse` (31:405).
 *
 * The Figma `Size` axis becomes the `size` prop. The Figma `State` axis is
 * NOT a prop: Default / Hover / Focus / Pressed / Disabled are interaction
 * states, expressed here as `:hover`, `:focus-visible`, `:active` and
 * `:disabled` (CLAUDE.md §4).
 *
 * Geometry read from Figma:
 *   Large   h 56  px 32  gap 12  UI/Button/Large   icon 20
 *   Medium  h 48  px 24  gap  8  UI/Button/Medium  icon 20
 *   Small   h 40  px 20  gap  8  UI/Button/Small   icon 16
 * All sizes use `radius/full`.
 */

const button = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "whitespace-nowrap select-none",
    "transition-[background-color,box-shadow,border-color,color] duration-150",
    // Figma expresses focus as the `Focus/Ring` effect, not an outline.
    // globals.css restores a real outline under forced-colors.
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
          "hover:bg-primary-soft-hover hover:text-text-brand-strong",
          "active:bg-primary-soft-pressed active:text-text-brand-strong",
          "focus-visible:shadow-focus-ring",
          "disabled:bg-disabled-background disabled:text-text-disabled",
        ],
        outline: [
          "border-(length:--stroke-default) border-border-brand text-text-brand bg-transparent",
          "hover:bg-primary-soft hover:text-text-brand-strong",
          "active:bg-primary-soft-hover active:text-text-brand-strong",
          "focus-visible:border-(length:--stroke-strong) focus-visible:border-border-focus focus-visible:shadow-focus-ring",
          "disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent",
        ],
        inverse: [
          "bg-inverse-default text-text-brand",
          "hover:bg-inverse-hover hover:text-text-brand-strong hover:shadow-elevation-2",
          "active:bg-inverse-pressed active:text-text-brand-strong active:shadow-none",
          "focus-visible:shadow-focus-ring-on-dark",
          "disabled:bg-inverse-ghost-hover disabled:text-text-inverse-muted disabled:shadow-none",
        ],
      },
      size: {
        large: "text-ui-button-large h-14 gap-3 px-8",
        medium: "text-ui-button-medium h-12 gap-2 px-6",
        small: "text-ui-button-small h-10 gap-2 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "medium" },
  },
);

/** Figma pairs Large/Medium with 20px icons and Small with 16px. */
const ICON_SIZE = { large: 20, medium: 20, small: 16 } as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    /** Figma `Show leading icon` + `Leading icon`. */
    leadingIcon?: IconName;
    /** Figma `Show trailing icon` + `Trailing icon`. */
    trailingIcon?: IconName;
    /** Render as the single child element (e.g. a Next `<Link>`). */
    asChild?: boolean;
    children?: ReactNode;
  };

export function Button({
  variant,
  size,
  leadingIcon,
  trailingIcon,
  asChild,
  className,
  children,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const iconSize = ICON_SIZE[size ?? "medium"];

  return (
    <Comp
      // A <button> inside a <form> defaults to type="submit", which submits
      // by accident far more often than anyone intends.
      type={asChild ? undefined : (type ?? "button")}
      className={cn(button({ variant, size }), className)}
      {...props}
    >
      {leadingIcon ? <Icon name={leadingIcon} size={iconSize} /> : null}
      {/*
        `Slottable` marks which child the Slot should merge into. Without it,
        `asChild` + an icon gives Slot three children and it throws
        "Expected a single React element child".
      */}
      <Slottable>{children}</Slottable>
      {trailingIcon ? <Icon name={trailingIcon} size={iconSize} /> : null}
    </Comp>
  );
}

export { button as buttonVariants };
