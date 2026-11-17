import Link from "next/link";
import { forwardRef } from "react";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { applicationReceived } from "@/content/careers";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";

/**
 * Acknowledgement — Figma `G2 · Careers — Application received (state)`
 * (`95:4887` → `01 · Acknowledgement`, 1440 × 1092; padding 120/80/160/80).
 *
 * Rendered ONLY after `submitApplication` resolves `{ ok: true }` — never
 * optimistically (CLAUDE.md §9). With no backend yet, that cannot happen on
 * the site; the state is reviewable in Storybook.
 *
 * The summary repeats what the applicant actually submitted. Figma's
 * "· SAMPLE" suffix and its sample values are design annotations, not copy.
 */

export type ApplicationSummary = {
  name: string;
  region: string;
  areaOfInterest: string;
  cvName: string;
};

export const ApplicationReceived = forwardRef<
  HTMLHeadingElement,
  { summary: ApplicationSummary }
>(function ApplicationReceived({ summary }, headingRef) {
  const c = applicationReceived;
  const rows = [
    [c.rows.name, summary.name],
    [c.rows.region, summary.region],
    [c.rows.areaOfInterest, summary.areaOfInterest],
    [c.rows.cv, summary.cvName],
  ];

  return (
    <section
      aria-labelledby="application-received-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="contour-light-1px" x={-80} y={-60} w={1600} h={1000} />
      </DecorLayer>

      <div className="tablet:pt-30 tablet:pb-40 relative mx-auto w-full max-w-(--canvas-desktop) px-(--page-margin) pt-16 pb-24">
        <div
          className={cn(
            "bg-surface-default shadow-elevation-2 mx-auto flex max-w-190 flex-col items-center gap-6 rounded-2xl px-6 py-10 text-center",
            "tablet:p-16",
          )}
        >
          <span
            aria-hidden="true"
            className="bg-feedback-success-soft text-icon-success grid size-20 place-items-center rounded-full"
          >
            <Icon name="check-circle" size={40} />
          </span>
          <p className="text-ui-overline text-text-success">{c.overline}</p>
          <h2
            ref={headingRef}
            id="application-received-title"
            tabIndex={-1}
            className={cn(type.h2, "text-text-heading focus-visible:outline-none")}
          >
            {c.title}
          </h2>
          <p className={cn(type.bodyLarge, "text-text-body")}>{c.body}</p>

          <div className="bg-background-subtle w-full rounded-lg px-7 py-5 text-left">
            <p className="text-ui-overline text-text-muted pb-2">{c.summaryLabel}</p>
            <dl>
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="border-border-subtle flex items-baseline justify-between gap-4 border-t py-2.5"
                >
                  <dt className={cn(type.bodySmall, "text-text-muted")}>{label}</dt>
                  <dd className="text-ui-label-large text-text-heading min-w-0 text-right break-words">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="large" trailingIcon="arrow-right">
              <Link href={c.back.href}>{c.back.label}</Link>
            </Button>
            <Button asChild size="large" variant="outline">
              <Link href={c.explore.href}>{c.explore.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
