"use client";

import { forwardRef, useId, useState, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldControl, type FieldStatus } from "./field";
import { HelperText } from "./helper-text";
import { FormLabel } from "./label";

/**
 * Form/Textarea — Figma `Form/Textarea` (87:2431).
 *
 * Same control shell as Text Input, with Figma's 152px minimum height and
 * 14/16/12/16 padding. Resizes vertically only, so a user can grow it
 * without breaking the column width.
 *
 * Setting `maxLength` adds Figma’s `Counter row` ("0 / 500") inside the
 * field, bottom-right, and enforces the limit natively.
 */

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  required?: boolean;
  showOptional?: boolean;
  helperText?: string;
  error?: string;
  success?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    required,
    showOptional,
    helperText,
    error,
    success,
    className,
    id,
    disabled,
    rows = 5,
    maxLength,
    onChange,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const counterId = `${fieldId}-counter`;
  // Uncontrolled use (e.g. react-hook-form `register`) is tracked locally;
  // a controlled `value` is read directly.
  const [count, setCount] = useState(
    String(props.value ?? props.defaultValue ?? "").length,
  );

  const status: FieldStatus = error ? "error" : success ? "success" : "default";
  const message = error ?? success ?? helperText;
  const messageType = error ? "error" : success ? "success" : "hint";

  return (
    <div className="flex w-full flex-col gap-2">
      <FormLabel
        htmlFor={fieldId}
        required={required}
        showOptional={showOptional}
        disabled={disabled}
      >
        {label}
      </FormLabel>

      <div className="relative">
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [message ? messageId : null, maxLength ? counterId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={cn(
            fieldControl({ status, control: "textarea" }),
            // `block`: inside the counter wrapper an inline textarea would add
            // a line-box gap below the field.
            "block resize-y",
            // Room for the counter row inside the field.
            maxLength && "pb-10",
            className,
          )}
          {...props}
          onChange={(event) => {
            setCount(event.target.value.length);
            onChange?.(event);
          }}
        />
        {/* Figma `Counter row` — `UI/Caption` `text/muted`, bottom-right
            inside the field. Shown only when the field has a limit. */}
        {maxLength ? (
          <span
            id={counterId}
            className="text-ui-caption text-text-muted pointer-events-none absolute right-4.5 bottom-3.5"
          >
            {props.value !== undefined ? String(props.value).length : count} / {maxLength}
          </span>
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
