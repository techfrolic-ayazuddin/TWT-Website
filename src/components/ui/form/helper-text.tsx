import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "../icon";

/**
 * Form/Helper Text — Figma `Form/Helper Text` (87:2150).
 *
 * Figma: 6px gap, 16px icon, `Desktop/Body/Small`. Three types only —
 * Hint (`text/muted`), Error (`text/error`), Success (`text/success`).
 * No warning type exists on this component; warnings live on
 * `Form/Validation Message`.
 *
 * Error messages render in an `aria-live` region so a change announces
 * without the user having to go looking for it.
 */

export type HelperTextType = "hint" | "error" | "success";

const TONE: Record<HelperTextType, { cls: string; icon: IconName }> = {
  hint: { cls: "text-text-muted", icon: "info" },
  error: { cls: "text-text-error", icon: "alert" },
  success: { cls: "text-text-success", icon: "check-circle" },
};

export type HelperTextProps = HTMLAttributes<HTMLParagraphElement> & {
  /** Figma `Type` axis. */
  type?: HelperTextType;
  /** Figma `Show icon` boolean. */
  showIcon?: boolean;
};

export function HelperText({
  type = "hint",
  showIcon = true,
  className,
  children,
  ...props
}: HelperTextProps) {
  const tone = TONE[type];
  return (
    <p
      className={cn(
        "text-desktop-body-small flex items-start gap-1.5",
        tone.cls,
        className,
      )}
      // Errors must be announced when they appear; hints must not nag.
      role={type === "error" ? "alert" : undefined}
      {...props}
    >
      {showIcon ? <Icon name={tone.icon} size={16} className="mt-0.5" /> : null}
      <span>{children}</span>
    </p>
  );
}
