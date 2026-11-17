"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "../badge";
import { Icon } from "../icon";

/**
 * Form acknowledgement — Figma `Form/Consultation` → `State=Acknowledgement`
 * (`111:6601`) and `Form/Tribe Capital Enquiry` → `State=Acknowledgement`
 * (`111:7297`). Both draw the identical panel, so it lives here once.
 *
 * Figma geometry: `background/subtle`, radius 24, padding 40, gap 16, items
 * centred. A 72px `feedback/success/soft` circle holding a 36px
 * `check-circle` in `icon/success`, a `text/success` overline, a 32/40
 * heading, an 18/28 message, and the placeholder badge Figma itself puts on
 * this copy.
 *
 * ⚠️ **This renders only after a submission resolves `{ ok: true }`**
 * (CLAUDE.md §9). No form may mount it optimistically. Since every transport
 * returns `not-configured` on the live site, it is currently unreachable in
 * production and appears only under the development mock adapter.
 *
 * The heading is focusable (`tabIndex={-1}`) so the owning form can move
 * focus here when the acknowledgement replaces the fields.
 */

export type AcknowledgementProps = {
  /** `text/success` overline — e.g. "Request received". */
  overline: string;
  title: string;
  message: string;
  /**
   * Figma marks this copy `DRAFT WORDING — PENDING CLIENT APPROVAL` with a
   * `Badge/Tone=Placeholder`. Pass that label through until the client signs
   * the wording off; omit it only once they have.
   */
  draftBadge?: string;
  /** Usually a "Done" button that closes the dialog. */
  actions?: ReactNode;
  className?: string;
};

export const Acknowledgement = forwardRef<HTMLHeadingElement, AcknowledgementProps>(
  function Acknowledgement(
    { overline, title, message, draftBadge, actions, className },
    ref,
  ) {
    return (
      <div className="flex flex-col gap-6">
        <div
          // `status` announces the acknowledgement without stealing focus;
          // the owning form moves focus to the heading separately.
          role="status"
          aria-live="polite"
          className={cn(
            "bg-background-subtle flex flex-col items-center gap-4 rounded-xl",
            "tablet:p-10 p-6 text-center",
            className,
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "bg-feedback-success-soft text-icon-success",
              "flex size-18 items-center justify-center rounded-full",
            )}
          >
            <Icon name="check-circle" size={36} />
          </span>

          <p className="text-ui-overline text-text-success">{overline}</p>

          <h3
            ref={ref}
            tabIndex={-1}
            className="text-desktop-heading-h3 text-text-heading focus-visible:shadow-focus-ring rounded-sm focus-visible:outline-none"
          >
            {title}
          </h3>

          <p className="text-desktop-body-regular text-text-body">{message}</p>

          {draftBadge ? <Badge tone="placeholder">{draftBadge}</Badge> : null}
        </div>

        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    );
  },
);
