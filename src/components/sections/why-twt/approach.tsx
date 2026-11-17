import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Button } from "@/components/ui/button";
import { whyApproach, whyExpertise } from "@/content/why-twt";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";
import { HUE } from "../hues";

/**
 * 04 · How we approach transformation — Figma `108:5245` (1440 × 680,
 * `background/inverse`).
 */
export function WhyApproach() {
  return (
    <section
      aria-labelledby="why-approach-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Glow x={900} y={-300} w={800} h={800} opacity={0.7} />
        <Pattern
          name="flow-lines-dark-1px"
          x={-40}
          y={-40}
          w={1520}
          h={760}
          opacity={0.8}
        />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <SectionHeading
          id="why-approach-title"
          tone="dark"
          eyebrow={whyApproach.eyebrow}
          title={whyApproach.title}
          description={whyApproach.description}
          className="max-w-180"
        />

        {/* Figma `Journey` — four 320-wide stages; each marker is a 56px node
            followed by a 2px connector that runs to the next stage. */}
        <ol className="tablet:grid-cols-2 tablet:gap-y-12 desktop:grid-cols-4 grid grid-cols-1 gap-y-10">
          {whyApproach.stages.map((stage, i) => (
            <li key={stage.title} className="flex flex-col gap-4.5 pr-8">
              <div aria-hidden="true" className="flex items-center">
                <span
                  className={cn(
                    "text-ui-label-large grid size-14 shrink-0 place-items-center rounded-full",
                    HUE[stage.hue].node,
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="bg-border-inverse h-0.5 flex-1" />
              </div>
              <h3 className={cn(type.h4, "text-text-inverse")}>{stage.title}</h3>
              <p className={cn(type.body, "text-text-inverse-muted")}>{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 05 · Areas of expertise — Figma `108:5287` (1440 × 644, `background/page`). */
export function WhyExpertise() {
  return (
    <section
      aria-labelledby="why-expertise-title"
      className="bg-background-page relative"
    >
      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <div className="tablet:flex-row tablet:items-end tablet:justify-between flex flex-col items-start gap-8">
          <SectionHeading
            id="why-expertise-title"
            eyebrow={whyExpertise.eyebrow}
            title={whyExpertise.title}
            className="max-w-180"
          />
          <Button asChild variant="outline" size="medium" trailingIcon="arrow-right">
            <Link href={whyExpertise.cta.href}>{whyExpertise.cta.label}</Link>
          </Button>
        </div>

        <ol className="tablet:grid-cols-2 desktop:grid-cols-4 grid grid-cols-1 gap-x-6 gap-y-10">
          {whyExpertise.services.map((service) => (
            <li
              key={service.number}
              className={cn(
                "flex flex-col gap-3.5 border-t-4 pt-6",
                HUE[service.segment].rule,
              )}
            >
              {/* Tribe Capital's overline row is 28px in Figma: it reserves
                  the slot of a `Provisional` badge that is not drawn. */}
              <span
                aria-hidden="true"
                className={cn(
                  "text-ui-overline flex items-center",
                  HUE[service.segment].label,
                  service.segment === "yellow" && "min-h-7",
                )}
              >
                {service.number}
              </span>
              <h3 className={cn(type.h4, "text-text-heading")}>{service.title}</h3>
              <p className={cn(type.bodySmall, "text-text-body")}>
                {service.description}
              </p>
              {service.notes.map((line) => (
                <p
                  key={line}
                  className={cn("text-ui-caption", HUE[service.segment].label)}
                >
                  {line}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
