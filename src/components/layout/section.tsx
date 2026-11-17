import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

/**
 * Section — vertical rhythm plus a surface.
 *
 * Figma `Layout` collection: `section-y` 120 / 96 / 64 and
 * `section-y-compact` 80 / 64 / 48. `tokens.css` resolves `--section-y` and
 * `--section-y-compact` per breakpoint, so this reads one variable.
 *
 * Server Component — no interactivity.
 */

export type SectionProps = {
  /** `compact` uses Figma's `section-y-compact` scale. */
  spacing?: "default" | "compact" | "none";
  /** Background surface, from the semantic colour tokens. */
  surface?: "page" | "subtle" | "muted" | "inverse" | "brand" | "none";
  /** Set false to render the children without the Container frame. */
  contained?: boolean;
  containerSize?: "default" | "narrow" | "full";
  id?: string;
  className?: string;
  children: ReactNode;
};

const SURFACE: Record<NonNullable<SectionProps["surface"]>, string> = {
  page: "bg-background-page text-text-body",
  subtle: "bg-background-subtle text-text-body",
  muted: "bg-background-muted text-text-body",
  inverse: "bg-background-inverse text-text-inverse-muted",
  brand: "bg-background-brand text-text-on-primary",
  none: "",
};

export function Section({
  spacing = "default",
  surface = "page",
  contained = true,
  containerSize = "default",
  id,
  className,
  children,
}: SectionProps) {
  const body = contained ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={cn(
        SURFACE[surface],
        spacing === "default" && "py-(--section-y)",
        spacing === "compact" && "py-(--section-y-compact)",
        className,
      )}
    >
      {body}
    </section>
  );
}
