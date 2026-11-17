"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

/**
 * Modal — the shell shared by every TWT popup (Figma `Modal/Registration`
 * `95:5568` and `Form/Consultation` `111:6601`).
 *
 * Geometry from Figma: `surface/default`, 1px `border/subtle`, `radius/2xl`,
 * `Elevation/4`, padding 40 (24 on phones), a header row with an overline,
 * a heading and a 40px round `background/muted` close button.
 *
 * Scrolling. The dialog is capped at `100dvh − 2rem` and is a flex column:
 * the header is fixed at the top and ONLY the body scrolls
 * (`overscroll-contain`, so a scroll that reaches the end never chains to the
 * page). Radix's scroll lock freezes the page behind it. The scroll container
 * sits inside `Dialog.Content` on purpose: Radix only lets wheel/touch scrolls
 * through for elements inside the content, so a scroller outside it makes
 * the page move instead.
 *
 * Focus is trapped, `Esc` closes, and focus returns to `returnFocusTo` (or the
 * element that was active when the dialog opened) on close.
 */

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Figma `UI/Overline` above the title. */
  overline: string;
  title: string;
  closeLabel: string;
  /** `md` = 560 (registration), `lg` = 640 (consultation). */
  size?: "md" | "lg";
  /** Element to focus when the modal closes; falls back to Radix's default. */
  returnFocusTo?: RefObject<HTMLElement | null>;
  /** Small line under the title (e.g. "Fields marked * are required."). */
  note?: string;
  children: ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  overline,
  title,
  closeLabel,
  size = "md",
  returnFocusTo,
  note,
  children,
}: ModalProps) {
  // The header gets a hairline once the body has scrolled under it.
  const [scrolled, setScrolled] = useState(false);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setScrolled(false);
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        {/* Same scrim as the mobile navigation drawer. */}
        <Dialog.Overlay className="bg-background-inverse-strong/60 fixed inset-0 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            const target = returnFocusTo?.current;
            if (target?.isConnected) {
              event.preventDefault();
              target.focus();
            }
          }}
          className={cn(
            "bg-surface-default border-border-subtle shadow-elevation-4 fixed top-1/2 left-1/2 z-50",
            "flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col",
            "overflow-hidden rounded-2xl border focus-visible:outline-none",
            size === "lg" ? "max-w-160" : "max-w-140",
          )}
        >
          <div
            className={cn(
              "tablet:px-10 tablet:pt-10 tablet:pb-5 flex shrink-0 items-start justify-between gap-4 border-b px-6 pt-6 pb-4",
              "transition-colors duration-150",
              scrolled ? "border-border-subtle" : "border-transparent",
            )}
          >
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-ui-overline text-text-brand">{overline}</p>
              <Dialog.Title className="text-mobile-heading-h3 tablet:text-tablet-heading-h3 desktop:text-desktop-heading-h3 text-text-heading">
                {title}
              </Dialog.Title>
              {note ? <p className="text-ui-caption text-text-muted">{note}</p> : null}
            </div>
            <Dialog.Close
              aria-label={closeLabel}
              className={cn(
                "bg-background-muted text-text-heading grid size-10 shrink-0 place-items-center rounded-full",
                "hover:bg-primary-soft transition-colors duration-150",
                "focus-visible:shadow-focus-ring focus-visible:outline-none",
              )}
            >
              <Icon name="close" size={20} />
            </Dialog.Close>
          </div>

          <div
            onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}
            className="tablet:px-10 tablet:pt-5 tablet:pb-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-5 pb-6"
          >
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
