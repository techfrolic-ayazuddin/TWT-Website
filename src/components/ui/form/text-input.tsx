"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "../icon";
import { fieldControl, type FieldStatus } from "./field";
import { HelperText } from "./helper-text";
import { FormLabel } from "./label";

/**
 * Form/Text Input — Figma `Form/Text Input` (87:2305).
 *
 * Composes Label + control + Helper Text at the 8px gap Figma specifies
 * (20 + 8 + 48 + 8 + 24 = 108, which is the component's height in Figma).
 *
 * Forwards its ref and spreads the rest of its props onto the `<input>`, so
 * it drops straight into React Hook Form's `register()`.
 */

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  /** Figma `Required` boolean — sets both the marker and the input state. */
  required?: boolean;
  showOptional?: boolean;
  /** Figma `Show leading icon` + `Leading icon`. */
  leadingIcon?: IconName;
  /** Figma `Helper text`. Replaced by `error` / `success` when those are set. */
  helperText?: string;
  /** Figma `State=Error` + `Error text`. */
  error?: string;
  /** Figma `State=Success` + `Success text`. */
  success?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    required,
    showOptional,
    leadingIcon,
    helperText,
    error,
    success,
    className,
    id,
    disabled,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;

  const status: FieldStatus = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? helperText;
  const messageType = error ? "error" : success ? "success" : "hint";

  return (
    <div className="flex w-full flex-col gap-2">
      <FormLabel
        htmlFor={inputId}
        required={required}
        showOptional={showOptional}
        disabled={disabled}
      >
        {label}
      </FormLabel>

      <div className="relative">
        {leadingIcon ? (
          <Icon
            name={leadingIcon}
            size={20}
            className={cn(
              "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2",
              disabled ? "text-icon-disabled" : "text-icon-muted",
            )}
          />
        ) : null}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            fieldControl({ status, control: "input" }),
            leadingIcon && "pl-11",
            status !== "default" && "pr-11",
            className,
          )}
          {...props}
        />
        {/* Figma `Status icon` (20px) — shown in the Error and Success
            variants only. Decorative: the message below carries the meaning. */}
        {status !== "default" ? (
          <Icon
            name={status === "error" ? "alert" : "check-circle"}
            size={20}
            className={cn(
              "pointer-events-none absolute top-1/2 right-4 -translate-y-1/2",
              status === "error" ? "text-icon-error" : "text-icon-success",
            )}
          />
        ) : null}
      </div>

      {message ? (
        <HelperText id={messageId} type={messageType}>
          {message}
        </HelperText>
      ) : null}
    </div>
  );
});
