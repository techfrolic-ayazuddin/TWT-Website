import { cva } from "class-variance-authority";

/**
 * Shared field geometry — Figma `Form/Text Input` (87:2305),
 * `Form/Textarea` (87:2431) and `Form/Dropdown` (88:2580) all use the same
 * control shell:
 *
 *   fill    surface/default        (disabled → disabled/background)
 *   radius  radius/lg (16)
 *   border  border/default @1.5    hover → border/strong
 *                                  focus → border/focus @2 + Focus/Ring
 *                                  error → border/error @1.5
 *                                  success → border/success @1.5
 *                                  disabled → border/disabled @1.5
 *   text    Desktop/Body/Regular
 *   height  48 (input, dropdown) · 152 (textarea)
 *   padding 0/16 (input, dropdown) · 14/16/12/16 (textarea)
 *
 * The Figma `State` axis mixes interaction states (Hover, Focus, Filled) with
 * semantic ones (Error, Success, Disabled). Only the semantic ones become
 * props; the rest are CSS states. `Filled` is not a prop either — it is just
 * a field that has a value.
 */

/** Semantic field states. `Filled`, `Hover` and `Focus` are not props. */
export type FieldStatus = "default" | "error" | "success";

export const fieldControl = cva(
  [
    "text-desktop-body-regular w-full rounded-lg",
    "bg-surface-default text-text-heading",
    "placeholder:text-text-muted",
    "border-(length:--stroke-default) border-border-default",
    "transition-[border-color,box-shadow,background-color] duration-150",
    "hover:border-border-strong",
    "focus-visible:border-(length:--stroke-strong) focus-visible:border-border-focus",
    "focus-visible:shadow-focus-ring focus-visible:outline-none",
    "disabled:bg-disabled-background disabled:border-border-disabled",
    "disabled:text-text-disabled disabled:cursor-not-allowed",
    "disabled:placeholder:text-text-disabled",
  ],
  {
    variants: {
      status: {
        default: "",
        // Semantic borders must survive :hover, hence the hover: override.
        // Figma `Focus/Ring · Error`: an invalid field keeps its error
        // colour while focused (validation moves focus into it).
        error:
          "border-border-error hover:border-border-error focus-visible:border-border-error focus-visible:shadow-focus-ring-error",
        success: "border-border-success hover:border-border-success",
      },
      control: {
        input: "h-12 px-4",
        textarea: "min-h-38 px-4 pt-3.5 pb-3",
        select: "h-12 px-4",
      },
    },
    defaultVariants: { status: "default", control: "input" },
  },
);

/**
 * Build the `aria-describedby` value for a field.
 *
 * Only the message actually on screen is referenced: an error replaces the
 * hint rather than stacking with it, which is how the Figma states behave.
 */
export function describedBy(ids: {
  helperId?: string;
  hasHelper?: boolean;
}): string | undefined {
  return ids.hasHelper ? ids.helperId : undefined;
}
