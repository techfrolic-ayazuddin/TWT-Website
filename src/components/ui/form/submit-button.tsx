import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";

/**
 * Form/Submit Button — Figma `Form/Submit Button` (111:5964).
 *
 * Figma geometry: height 56, padding 0/24/0/28, 10px gap, `radius/full`,
 * `UI/Button/Large` label in `text/inverse`, trailing arrow.
 *
 * Three states, and note what is NOT among them: there is no success state.
 * The acknowledgement is a separate surface that renders only after a
 * submission resolves (CLAUDE.md §7). This button never signals success.
 *
 *   Default   primary/default
 *   Loading   primary/hover + spinner, label stays visible
 *   Disabled  disabled/background + text/disabled
 */

export type SubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  /** Figma `State=Loading`. Disables the button for the duration. */
  loading?: boolean;
  children?: ReactNode;
};

export function SubmitButton({
  loading,
  disabled,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      // Keeps the control in the tab order while in flight, so focus is not
      // thrown to the top of the document mid-submission.
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      disabled={disabled && !loading}
      onClick={(event) => {
        if (loading) event.preventDefault();
        props.onClick?.(event);
      }}
      className={cn(
        "text-ui-button-large inline-flex h-14 items-center justify-center gap-2.5",
        "rounded-full pr-6 pl-7 transition-colors duration-150",
        "focus-visible:shadow-focus-ring focus-visible:outline-none",
        loading
          ? "bg-primary-hover text-text-inverse cursor-wait"
          : disabled
            ? "bg-disabled-background text-text-disabled cursor-not-allowed"
            : "bg-primary-default text-text-inverse hover:bg-primary-hover active:bg-primary-pressed",
        className,
      )}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className={cn(
            "size-4.5 shrink-0 rounded-full border-[2.5px] border-current",
            "border-t-transparent motion-safe:animate-spin",
          )}
        />
      ) : null}
      {children}
      {loading ? null : <Icon name="arrow-right" size={20} />}
    </button>
  );
}
