import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Container — the horizontal page frame.
 *
 * The max-width is the Figma ARTBOARD width (`--canvas-desktop`, 1440) and
 * the gutter is `--page-margin`, which `tokens.css` resolves per breakpoint.
 * That combination reproduces all three Figma container tokens exactly:
 *
 *   1440 viewport − 2×80 margin = 1280  → `container/desktop`
 *    768 viewport − 2×32 margin =  704  → `container/tablet`
 *    375 viewport − 2×16 margin =  343  → `container/mobile`
 *
 * Capping the OUTER box at 1280 instead would leave only 1120 of content at
 * desktop, which is 160px narrower than every Figma frame.
 *
 * Server Component — no interactivity.
 */

export type ContainerProps = {
  /** `narrow` is Figma `container/narrow` (880) for long-form reading. */
  size?: "default" | "narrow" | "full";
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const SIZE: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-(--canvas-desktop)",
  narrow: "max-w-[calc(880px+2*var(--page-margin))]",
  full: "",
};

export function Container({
  size = "default",
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-(--page-margin)", SIZE[size], className)}>
      {children}
    </Tag>
  );
}
