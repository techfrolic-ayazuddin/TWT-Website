"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";

/**
 * Form/Checkbox — Figma `Form/Checkbox` (88:2688).
 *
 * Two Figma axes: `Checked` (False | True | Indeterminate) and `State`
 * (Default | Hover | Focus | Error | Disabled). `Checked` is real component
 * state so it is a prop; `State` is interaction except for Error and
 * Disabled, which are semantic.
 *
 * Figma box geometry: 22×22 at `radius/xs`, 12px gap to the label,
 * `Desktop/Body/Regular` label in `text/heading` (→ `text/error` when the
 * field is in error, `text/disabled` when disabled).
 *
 * Built on Radix Checkbox so indeterminate is exposed as `aria-checked="mixed"`
 * rather than only being a visual state.
 */

export type CheckboxProps = {
  label: ReactNode;
  /** Figma `Description` + `Show description`. */
  description?: ReactNode;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** Figma `State=Error`. Pair with a message from the owning form. */
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  "aria-describedby"?: string;
};

export function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  error,
  disabled,
  required,
  name,
  value,
  id,
  className,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;
  const descId = description ? `${boxId}-description` : undefined;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <RadixCheckbox.Root
        id={boxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={descId ?? props["aria-describedby"]}
        className={cn(
          "mt-0.5 grid size-5.5 shrink-0 place-items-center rounded-xs",
          "border-(length:--stroke-default) transition-[background-color,border-color,box-shadow] duration-150",
          "focus-visible:shadow-focus-ring focus-visible:outline-none",
          "disabled:cursor-not-allowed",
          // Unchecked
          "bg-surface-default border-border-strong",
          !disabled && !error && "hover:bg-primary-soft hover:border-border-brand",
          "focus-visible:border-border-focus focus-visible:border-(length:--stroke-strong)",
          // Checked / indeterminate — Figma drops the border entirely
          "data-[state=checked]:bg-primary-default data-[state=checked]:border-transparent",
          "data-[state=indeterminate]:bg-primary-default data-[state=indeterminate]:border-transparent",
          !disabled && [
            "data-[state=checked]:hover:bg-primary-hover",
            "data-[state=indeterminate]:hover:bg-primary-hover",
          ],
          // Error
          error && [
            "bg-feedback-error-soft border-border-error",
            "hover:border-border-error",
            "data-[state=checked]:bg-primary-default data-[state=checked]:border-border-error data-[state=checked]:border-(length:--stroke-strong)",
            "data-[state=indeterminate]:bg-primary-default data-[state=indeterminate]:border-border-error data-[state=indeterminate]:border-(length:--stroke-strong)",
          ],
          // Disabled wins over everything
          disabled && [
            "bg-disabled-background border-border-disabled",
            "data-[state=checked]:bg-border-strong data-[state=checked]:border-transparent",
            "data-[state=indeterminate]:bg-border-strong data-[state=indeterminate]:border-transparent",
          ],
        )}
      >
        <RadixCheckbox.Indicator className="text-text-on-primary grid place-items-center">
          {checked === "indeterminate" ? (
            <Icon name="minus" size={16} />
          ) : (
            <Icon name="check" size={16} />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={boxId}
          className={cn(
            "text-desktop-body-regular cursor-pointer",
            disabled && "text-text-disabled cursor-not-allowed",
            !disabled && error && "text-text-error",
            !disabled && !error && "text-text-heading",
          )}
        >
          {label}
        </label>
        {description ? (
          <p
            id={descId}
            className={cn(
              "text-desktop-body-small",
              disabled ? "text-text-disabled" : "text-text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
