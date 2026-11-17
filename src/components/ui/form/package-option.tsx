"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Form/Package Option — Figma `Form/Package Option` (111:5945).
 *
 * Used by the Tribe Capital enquiry to pick one package. Because exactly one
 * may be chosen, this is a real `<input type="radio">` with the card as its
 * label — so arrow keys move between options and the group is announced as a
 * radio group, which a styled `<div>` would not do.
 *
 * Figma geometry: HORIZONTAL — a 20px radio, 12px gap, then the text column
 * (name 16/24, timeline 13/18 in `segment/yellow/text`) — padding 16,
 * `radius/lg`. The radio was missing until Phase 5.10; Figma has always drawn
 * it (`111:7432` → `Package / …` → `Radio`).
 *   Default   surface/default    + border/default @1.5
 *   Hover     background/subtle  + border/strong @1.5
 *   Selected  segment/yellow/soft + segment/yellow/accent @2
 *   Focus     surface/default    + border/focus @2 + Focus/Ring
 *   Error     surface/default    + border/error @1.5
 *   Disabled  disabled/background + border/disabled @1.5
 *
 * NOTE (CLAUDE.md §6.5): Tribe Capital package names and KYC timelines are
 * PROVISIONAL. This component renders whatever it is given; it must not be
 * shipped with invented package copy.
 */

export type PackageOptionProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  /** Figma `Package` text property. */
  packageName: string;
  /** Figma `Timeline` + `Show timeline`. */
  timeline?: string;
  /** Figma `State=Error`. */
  error?: boolean;
};

export const PackageOption = forwardRef<HTMLInputElement, PackageOptionProps>(
  function PackageOption(
    { packageName, timeline, error, disabled, className, id, ...props },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={cn("relative", className)}>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          disabled={disabled}
          // No `aria-invalid` here: it is not a supported attribute on
          // role="radio". Validity belongs to the whole group, so the owning
          // fieldset/radiogroup carries the error message.
          // Visually hidden but still focusable, so the native radio keeps
          // its keyboard behaviour and the card below reflects its state.
          className="peer sr-only"
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-lg p-4",
            "border-(length:--stroke-default) transition-[background-color,border-color,box-shadow] duration-150",
            "bg-surface-default border-border-default",
            !disabled && "hover:bg-background-subtle hover:border-border-strong",
            error && "border-border-error hover:border-border-error",
            // Selected. The radio dot lives inside this label, so it cannot
            // be a `peer-*` sibling of the input — it is reached from here.
            "peer-checked:bg-segment-yellow-soft peer-checked:border-segment-yellow-accent peer-checked:border-(length:--stroke-strong)",
            "peer-checked:[&_[data-radio]]:border-segment-yellow-accent",
            "peer-checked:[&_[data-dot]]:opacity-100",
            // Focus ring follows the hidden input
            "peer-focus-visible:border-border-focus peer-focus-visible:shadow-focus-ring peer-focus-visible:border-(length:--stroke-strong)",
            disabled &&
              "bg-disabled-background border-border-disabled cursor-not-allowed",
          )}
        >
          {/* Figma `Radio` — 20px, `border/strong`; filled in the segment
              accent once chosen. Decorative: the real `<input type="radio">`
              above carries the state and the keyboard behaviour. */}
          <span
            aria-hidden="true"
            data-radio=""
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              "border-(length:--stroke-default) transition-colors duration-150",
              disabled
                ? "border-border-disabled bg-disabled-background"
                : "bg-surface-default border-border-strong",
              error && "border-border-error",
            )}
          >
            <span
              data-dot=""
              className={cn(
                "bg-segment-yellow-accent size-2.5 rounded-full",
                "opacity-0 transition-opacity duration-150",
              )}
            />
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span
              className={cn(
                "text-ui-label-large",
                disabled ? "text-text-disabled" : "text-text-heading",
              )}
            >
              {packageName}
            </span>
            {timeline ? (
              <span
                className={cn(
                  "text-ui-caption",
                  disabled ? "text-text-disabled" : "text-segment-yellow-text",
                )}
              >
                {timeline}
              </span>
            ) : null}
          </span>
        </label>
      </div>
    );
  },
);
