"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";
import { fieldControl, type FieldStatus } from "./field";
import { HelperText } from "./helper-text";
import { FormLabel } from "./label";

/**
 * Form/Dropdown — Figma `Form/Dropdown` (88:2580) and
 * `Form/Dropdown Option` (88:2460).
 *
 * Built on Radix Select so the listbox is fully keyboard operable (arrows,
 * Home/End, type-ahead, Esc) and correctly announced. A native `<select>`
 * cannot carry Figma's option styling, and a hand-rolled listbox is where
 * keyboard support usually goes wrong.
 *
 * Figma option geometry: height 48, padding 10/12, `radius/md`, hover fill
 * `primary/soft`, selected switches to `UI/Label/Large` in `text/brand`.
 * The open panel uses the `Elevation/3 · Menu & dropdown` effect.
 *
 * Note the Figma dropdown has no Success state — only Error. That asymmetry
 * is preserved rather than invented away.
 */

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Figma `Placeholder`. */
  placeholder?: string;
  required?: boolean;
  showOptional?: boolean;
  helperText?: string;
  /** Figma `State=Error` + `Error text`. */
  error?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

export function Select({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  required,
  showOptional,
  helperText,
  error,
  disabled,
  name,
  id,
  className,
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;

  const status: FieldStatus = error ? "error" : "default";
  const message = error ?? helperText;

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

      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <RadixSelect.Trigger
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            fieldControl({ status, control: "select" }),
            "flex items-center justify-between gap-2 text-left",
            // Radix sets data-placeholder on the trigger while empty.
            "data-[placeholder]:text-text-muted",
            "data-[state=open]:border-border-focus data-[state=open]:border-(length:--stroke-strong)",
            className,
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          {/* Figma `Status icon` — Error variant only, before the chevron. */}
          {error ? (
            <Icon name="alert" size={20} className="text-icon-error ml-auto shrink-0" />
          ) : null}
          <RadixSelect.Icon asChild>
            <Icon
              name="chevron-down"
              size={20}
              className={cn(
                "transition-transform duration-150",
                disabled ? "text-icon-disabled" : "text-icon-muted",
              )}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={8}
            className={cn(
              "bg-surface-default border-border-subtle shadow-elevation-3 z-50 overflow-hidden rounded-lg border",
              "max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width)",
            )}
          >
            <RadixSelect.Viewport className="p-2">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "text-desktop-body-regular text-text-heading relative flex cursor-pointer items-center justify-between gap-2.5",
                    "rounded-md px-3 py-2.5 outline-none select-none",
                    "data-highlighted:bg-primary-soft",
                    "data-[state=checked]:text-ui-label-large data-[state=checked]:text-text-brand",
                    "data-disabled:text-text-disabled data-disabled:pointer-events-none",
                  )}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <Icon name="check" size={20} />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {message ? (
        <HelperText id={messageId} type={error ? "error" : "hint"}>
          {message}
        </HelperText>
      ) : null}
    </div>
  );
}
