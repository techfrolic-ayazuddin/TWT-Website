import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "../icon";

/**
 * Form/Validation Message — Figma `Form/Validation Message` (87:2183).
 *
 * Figma: padding 16/20, `radius/lg`, a 4px LEFT border only (top/right/bottom
 * are 0), a soft feedback fill, 12px gap, a 20px icon, and a two-line text
 * stack — title in `UI/Label/Large` / `text/heading`, message below.
 *
 * Four types: Error, Success, Warning, Info.
 */

export type ValidationType = "error" | "success" | "warning" | "info";

const TONE: Record<
  ValidationType,
  { bg: string; border: string; icon: IconName; iconColor: string }
> = {
  error: {
    bg: "bg-feedback-error-soft",
    border: "border-l-border-error",
    icon: "alert",
    iconColor: "text-icon-error",
  },
  success: {
    bg: "bg-feedback-success-soft",
    border: "border-l-border-success",
    icon: "check-circle",
    iconColor: "text-icon-success",
  },
  warning: {
    bg: "bg-feedback-warning-soft",
    border: "border-l-accent-yellow",
    icon: "alert",
    iconColor: "text-text-warning",
  },
  info: {
    bg: "bg-feedback-info-soft",
    border: "border-l-border-brand",
    icon: "info",
    iconColor: "text-icon-brand",
  },
};

export type ValidationMessageProps = HTMLAttributes<HTMLDivElement> & {
  /** Figma `Type` axis. */
  type?: ValidationType;
  /** Figma `Title` text property. */
  title: ReactNode;
  /** Figma `Message` + `Show message` — omit to render the title alone. */
  message?: ReactNode;
};

export function ValidationMessage({
  type = "error",
  title,
  message,
  className,
  ...props
}: ValidationMessageProps) {
  const tone = TONE[type];
  return (
    <div
      // Errors interrupt; the rest are polite.
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-lg border-l-4 px-5 py-4",
        tone.bg,
        tone.border,
        className,
      )}
      {...props}
    >
      <Icon name={tone.icon} size={20} className={cn("mt-0.5", tone.iconColor)} />
      <div className="flex flex-col gap-0.5">
        <p className="text-ui-label-large text-text-heading">{title}</p>
        {message ? (
          <p className="text-desktop-body-small text-text-body">{message}</p>
        ) : null}
      </div>
    </div>
  );
}
