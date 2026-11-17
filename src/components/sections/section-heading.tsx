import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";

/**
 * Eyebrow — the three brand "figure bars" plus an overline.
 * Figma draws it at two sizes: bars 16×4 (section headings) and 24×5 (hero,
 * programmes, client voices). Bar gap 4, bar-to-text gap 12.
 */
export function Eyebrow({
  children,
  size = "sm",
  tone = "light",
  className,
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  tone?: "light" | "dark";
  className?: string;
}) {
  const bar = size === "lg" ? "h-[5px] w-6 rounded-[3px]" : "h-1 w-4 rounded-[2px]";
  return (
    <p className={cn("flex items-center gap-3", className)}>
      <span aria-hidden="true" className="flex gap-1">
        <span className={cn("bg-secondary-default", bar)} />
        <span className={cn("bg-accent-orange", bar)} />
        <span className={cn("bg-accent-yellow", bar)} />
      </span>
      <span
        className={cn(
          "text-ui-overline",
          tone === "dark" ? "text-text-inverse-muted" : "text-text-brand",
        )}
      >
        {children}
      </span>
    </p>
  );
}

/**
 * Section Heading — Figma `Section Heading/Light` and `Section Heading/Dark`
 * (`Align=Left`): eyebrow, H2 title, optional Body/Large description, 20px
 * apart. Figma `Show description` maps to the optional `description` prop.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  /** Figma `Align` axis. */
  align?: "left" | "center";
  className?: string;
  /** id for the <h2>, so the section can use aria-labelledby. */
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(type.h2, dark ? "text-text-inverse" : "text-text-heading")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            type.bodyLarge,
            dark ? "text-text-inverse-muted" : "text-text-body",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Shared section frame: Figma sections pad 120 / 80 with `--section-y`. */
export const sectionFrame =
  "relative mx-auto w-full max-w-(--canvas-desktop) px-(--page-margin) py-(--section-y)";
