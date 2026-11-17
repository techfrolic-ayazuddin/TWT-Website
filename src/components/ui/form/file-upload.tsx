"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";
import { HelperText } from "./helper-text";
import { FormLabel } from "./label";

/**
 * Form/File Upload — Figma `Form/File Upload` (95:4327).
 *
 * SELECTION ONLY. This component never uploads anything: there is no network
 * call, no storage, no progress polling (CLAUDE.md §9 — the backend is
 * undecided). The `uploading` prop exists so the designed in-flight state can
 * be rendered and reviewed; the owning form drives it once a real transport
 * exists.
 *
 * Figma states, two shells:
 *
 *   Dropzone (Default / Drag over / Disabled)
 *     pad 32/24, gap 10, `radius/lg`, DASHED border 8/6
 *     Default    `surface/default`, 1.5px `border/strong`; 52px round
 *                `primary/soft` tile, `icon/brand` upload icon 24;
 *                prompt `UI/Label/Large` `text/heading`
 *     Drag over  `primary/soft`, 2px `border/brand`; tile `primary/default`
 *                with an inverse icon; prompt in `text/brand`
 *
 *   File row (Uploading / Selected / Error)
 *     pad 16/18, gap 14, `radius/lg`, 1.5px border; 44px `radius/md` file
 *     tile; name `UI/Label/Large`; meta `UI/Caption`; 36px round
 *     `background/muted` remove button
 *     Uploading  `border/default`, meta "Uploading… n%" + 4px progress bar
 *     Selected   `border/success`, success check icon 22, success helper
 *     Error      `feedback/error-soft` + `border/error`, white file tile with
 *                an error icon, meta in `text/error`, alert icon 22
 *
 * The helper row stays visible in every state and switches type with it:
 * hint → success (Selected) → error (Error).
 */

export type FileUploadProps = {
  label: string;
  required?: boolean;
  /** Figma `Prompt` — Default state. */
  prompt?: string;
  /** Figma `Prompt` — Drag over state. */
  dropPrompt?: string;
  /** Figma `Formats` — e.g. "PDF or DOCX · max 5 MB". */
  formats?: string;
  helperText?: string;
  /** Helper shown once a file is selected (Figma `State=Selected`). */
  successText?: string;
  /** Figma `State=Error` + `Error text` — shown in the helper row. */
  error?: string;
  /** File-row caption for the Error state (Figma `File meta`). */
  errorCaption?: string;
  disabled?: boolean;
  /** Figma `State=Uploading`. Driven by the owning form, never by this component. */
  uploading?: boolean;
  /** Progress 0–100, shown only while `uploading`. */
  progress?: number;
  /** The currently selected file, if any. Figma `State=Selected`. */
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  accept?: string;
  name?: string;
  id?: string;
  className?: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/** "CV_Name.pdf" → "PDF". Falls back to the MIME subtype. */
const fileKind = (file: File) =>
  (file.name.includes(".") ? file.name.split(".").pop() : file.type.split("/").pop())
    ?.toUpperCase()
    .slice(0, 6) ?? "FILE";

export function FileUpload({
  label,
  required,
  prompt = "Drag and drop your file here, or browse files",
  dropPrompt = "Drop your file to upload",
  formats,
  helperText,
  successText,
  error,
  errorCaption = "File could not be uploaded",
  disabled,
  uploading,
  progress,
  file,
  onFileChange,
  accept,
  name,
  id,
  className,
}: FileUploadProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-message`;
  const labelId = `${fieldId}-label`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const showRow = Boolean(file) || uploading;
  const selected = Boolean(file) && !uploading && !error;

  const message = error ?? (selected ? (successText ?? helperText) : helperText);
  const messageType = error ? "error" : selected && successText ? "success" : "hint";

  const pick = (next: File | null) => {
    if (disabled) return;
    onFileChange?.(next);
  };

  const clear = () => {
    pick(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) pick(dropped);
  };

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <FormLabel id={labelId} htmlFor={fieldId} required={required} disabled={disabled}>
        {label}
      </FormLabel>

      <input
        ref={inputRef}
        id={fieldId}
        name={name}
        type="file"
        accept={accept}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        // Visually hidden and out of the tab order: the dropzone button below
        // is the keyboard and pointer target, and opens this picker.
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => pick(event.target.files?.[0] ?? null)}
      />

      {showRow ? (
        /* --- File row: Uploading / Selected / Error ------------------- */
        <div
          className={cn(
            "flex items-center gap-3.5 rounded-lg px-4.5 py-4",
            "border-(length:--stroke-default)",
            error
              ? "bg-feedback-error-soft border-border-error"
              : uploading
                ? "bg-surface-default border-border-default"
                : "bg-surface-default border-border-success",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-md",
              error
                ? "bg-surface-default text-icon-error"
                : "bg-primary-soft text-icon-brand",
            )}
          >
            <Icon name="file" size={22} />
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-ui-label-large text-text-heading truncate">
              {file?.name ?? "—"}
            </span>
            <span
              className={cn(
                "text-ui-caption",
                error ? "text-text-error" : "text-text-muted",
              )}
            >
              {error
                ? errorCaption
                : uploading
                  ? `Uploading…${typeof progress === "number" ? ` ${progress}%` : ""}`
                  : file
                    ? `${fileKind(file)} · ${formatSize(file.size)}`
                    : null}
            </span>
            {uploading ? (
              <span
                role="progressbar"
                aria-label={`Uploading ${file?.name ?? "file"}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={typeof progress === "number" ? progress : undefined}
                className="bg-disabled-background h-1 w-full overflow-hidden rounded-[2px]"
              >
                <span
                  className="bg-primary-default block h-full rounded-[2px] transition-[width] duration-150"
                  style={{ width: `${Math.max(0, Math.min(100, progress ?? 0))}%` }}
                />
              </span>
            ) : null}
          </div>

          {!uploading ? (
            <Icon
              name={error ? "alert" : "check-circle"}
              size={22}
              className={cn("shrink-0", error ? "text-icon-error" : "text-icon-success")}
            />
          ) : null}

          {!disabled ? (
            <button
              type="button"
              onClick={clear}
              aria-label={`Remove ${file?.name ?? "file"}`}
              className={cn(
                "bg-background-muted text-icon-muted grid size-9 shrink-0 place-items-center rounded-full",
                "hover:text-icon-default transition-colors duration-150",
                "focus-visible:shadow-focus-ring focus-visible:outline-none",
              )}
            >
              <Icon name="close" size={18} />
            </button>
          ) : null}
        </div>
      ) : (
        /* --- Dropzone: Default / Drag over / Disabled ----------------- */
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          // No `aria-label` here on purpose. The dropzone names itself from
          // its own visible content, so the accessible name and the on-screen
          // text can never drift apart (WCAG 2.5.3 Label in Name). The field
          // label is a real visible <label> above, associated by description
          // so it is still announced. Phase 7 fix.
          aria-describedby={[labelId, message ? messageId : null]
            .filter(Boolean)
            .join(" ")}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg px-6 py-8 text-center",
            "border-dashed transition-colors duration-150",
            "focus-visible:shadow-focus-ring focus-visible:outline-none",
            disabled
              ? "bg-disabled-background border-border-disabled cursor-not-allowed border-(length:--stroke-default)"
              : dragOver
                ? "bg-primary-soft border-border-brand border-(length:--stroke-strong)"
                : error
                  ? "bg-surface-default border-border-error border-(length:--stroke-default)"
                  : "bg-surface-default border-border-strong hover:border-border-brand border-(length:--stroke-default)",
          )}
          // Figma's dash is 8 on / 6 off; CSS `dashed` is the closest a border
          // can express — the browser picks the dash length.
        >
          <span
            aria-hidden="true"
            className={cn(
              "grid size-13 place-items-center rounded-full transition-colors duration-150",
              disabled
                ? "bg-background-muted text-icon-disabled"
                : dragOver
                  ? "bg-primary-default text-icon-inverse"
                  : "bg-primary-soft text-icon-brand",
            )}
          >
            <Icon name="upload" size={24} />
          </span>
          <span
            className={cn(
              "text-ui-label-large",
              disabled
                ? "text-text-disabled"
                : dragOver
                  ? "text-text-brand"
                  : "text-text-heading",
            )}
          >
            {dragOver ? dropPrompt : prompt}
          </span>
          {formats ? (
            <span
              className={cn(
                "text-ui-caption",
                disabled ? "text-text-disabled" : "text-text-muted",
              )}
            >
              {formats}
            </span>
          ) : null}
        </button>
      )}

      {message ? (
        <HelperText id={messageId} type={messageType}>
          {message}
        </HelperText>
      ) : null}
    </div>
  );
}
