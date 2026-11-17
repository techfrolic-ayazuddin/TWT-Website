import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Form/Label — Figma `Form/Label` (87:2131).
 *
 * Figma: 4px gap, `UI/Label/Regular` in `text/heading`, a `*` required marker
 * in `text/secondary`, and an optional `(optional)` hint in `UI/Caption` /
 * `text/muted` that is hidden by default. The Disabled variant greys the
 * label and the marker.
 *
 * The required marker is `aria-hidden` — screen readers get `required` from
 * the input itself, so announcing "star" as well is just noise.
 */

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  /** Figma `Required` boolean. */
  required?: boolean;
  /** Figma `Show optional` boolean. */
  showOptional?: boolean;
  /** Figma `State=Disabled`. */
  disabled?: boolean;
  children: ReactNode;
};

export function FormLabel({
  required,
  showOptional,
  disabled,
  className,
  children,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-ui-label-regular inline-flex items-center gap-1",
        disabled ? "text-text-disabled" : "text-text-heading",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span
          aria-hidden="true"
          className={disabled ? "text-text-disabled" : "text-text-secondary"}
        >
          *
        </span>
      ) : null}
      {showOptional ? (
        <span className="text-ui-caption text-text-muted">(optional)</span>
      ) : null}
    </label>
  );
}
