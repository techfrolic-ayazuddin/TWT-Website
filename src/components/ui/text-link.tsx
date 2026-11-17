import { Slot, Slottable } from "@radix-ui/react-slot";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

/**
 * Text Link — Figma `Text Link` (32:102).
 *
 * Figma geometry: padding 2/4, 6px gap, 6px radius (focus ring target),
 * `UI/Label/Large` type, no underline in any state. Colour carries the state:
 * Default `text/brand` → Hover `text/brand-strong` → Disabled `text/disabled`.
 *
 * Figma shows no underline, but a link inside running prose needs one to be
 * distinguishable without colour. Use `underlineOnHover` for inline links;
 * standalone call-to-action links can keep the Figma treatment.
 */

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Figma `Show icon` + `Icon`. */
  icon?: IconName;
  /** Figma has no disabled anchor; this renders a non-interactive span. */
  disabled?: boolean;
  underlineOnHover?: boolean;
  /** Render as the single child element (e.g. a Next `<Link>`). */
  asChild?: boolean;
  children?: ReactNode;
};

export function TextLink({
  icon,
  disabled,
  underlineOnHover,
  asChild,
  className,
  children,
  ...props
}: TextLinkProps) {
  const classes = cn(
    "text-ui-label-large inline-flex items-center gap-1.5 rounded-[6px] px-1 py-0.5",
    "transition-colors duration-150 focus-visible:outline-none",
    disabled
      ? "text-text-disabled pointer-events-none"
      : [
          "text-text-brand hover:text-text-brand-strong",
          "focus-visible:shadow-focus-ring",
          underlineOnHover && "hover:underline focus-visible:underline",
        ],
    className,
  );

  const trailing = icon ? <Icon name={icon} size={20} /> : null;

  // A disabled link is not a link. Render inert, non-focusable markup
  // rather than an anchor that looks clickable and is not.
  if (disabled) {
    return (
      <span aria-disabled="true" className={classes}>
        {children}
        {trailing}
      </span>
    );
  }

  // `Slottable` marks which child the Slot merges into, so `asChild` works
  // when a trailing icon is present. It must be a DIRECT child of the Slot:
  // wrapped in a fragment, Slot sees one Fragment child, merges the classes
  // into that and the anchor renders unstyled.
  const Comp = asChild ? Slot : "a";
  return (
    <Comp className={classes} {...props}>
      <Slottable>{children}</Slottable>
      {trailing}
    </Comp>
  );
}
