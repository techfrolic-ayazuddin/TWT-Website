import { CapitalEnquiryForm } from "@/components/capital/capital-enquiry-form";
import { Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { enquiry } from "@/content/service-capital";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { sectionFrame } from "../section-heading";
import { SERVICE_HUE } from "./service-hues";

/**
 * Tribe Capital enquiry — Figma `03 · Tribe Capital enquiry` (`104:5829`),
 * 1440 × 1529: a `segment/yellow/soft` panel (1280, radius 32, 1px
 * `segment/yellow/border`, padding 56, gap 56) with the packages on the left
 * (440) and the inline enquiry form on the right (670).
 *
 * Every package carries a visible "to confirm" badge and the panel repeats
 * the provisional caveat — package definitions, eligibility and KYC timelines
 * are not confirmed (CLAUDE.md §6.5) and must never read as commitments.
 */
export function CapitalEnquirySection() {
  const tone = SERVICE_HUE.yellow;

  return (
    <section
      id={enquiry.id}
      aria-labelledby="capital-enquiry-title"
      // Lands the panel below the sticky header when the hero CTA jumps here.
      className="scroll-mt-[calc(1.5rem_-_var(--section-y))]"
    >
      <div className={sectionFrame}>
        <div
          className={cn(
            "relative flex flex-col gap-10 overflow-hidden rounded-2xl border",
            "tablet:p-10 desktop:flex-row desktop:gap-14 desktop:p-14 p-6",
            tone.soft,
            tone.border,
          )}
        >
          {/* Figma places the contour against the 1280 panel, not the
              artboard, so it is positioned on the panel itself. */}
          <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Pattern name="contour-light-1px" x={-300} y={120} w={1400} h={900} />
          </span>

          {/* ------------------------------------------------ Packages */}
          <div className="desktop:w-110 desktop:shrink-0 relative flex flex-col gap-5">
            <p className="flex flex-wrap items-center gap-3">
              <span className={cn(type.h3, tone.label)} aria-hidden="true">
                {enquiry.index}
              </span>
              <span
                aria-hidden="true"
                className={cn("h-1 w-10 rounded-[2px]", tone.accentBg)}
              />
              <span className={cn("text-ui-overline", tone.label)}>
                {enquiry.overline}
              </span>
              <Badge tone="placeholder">{enquiry.badge}</Badge>
            </p>

            <h2 id="capital-enquiry-title" className={cn(type.h2, "text-text-heading")}>
              {enquiry.title}
            </h2>
            <p className={cn(type.bodyLarge, "text-text-body")}>{enquiry.description}</p>

            <h3 className={cn("text-ui-overline mt-3", tone.label)}>
              {enquiry.packagesLabel}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {enquiry.packages.map((pkg) => (
                <li
                  key={pkg.name}
                  className="bg-surface-default flex flex-wrap items-center gap-3.5 rounded-md px-4.5 py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-ui-label-large flex size-8 shrink-0 items-center justify-center rounded-full",
                      tone.accentBg,
                      tone.onSolid,
                    )}
                  >
                    {pkg.step}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-ui-label-large text-text-heading">
                      {pkg.name}
                    </span>
                    <span className={cn("text-ui-caption", tone.label)}>
                      {pkg.timeline}
                    </span>
                  </span>
                  {/* Provisional marker on every package, as Figma draws it. */}
                  <Badge tone="placeholder">{enquiry.packageBadge}</Badge>
                </li>
              ))}
            </ul>

            {/* @placeholder Provisional — kept visible exactly as drawn. */}
            <p className={cn("text-ui-caption", tone.label)}>{enquiry.provisionalNote}</p>
          </div>

          {/* ---------------------------------------------------- Form */}
          <div className="relative min-w-0 flex-1">
            <CapitalEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
