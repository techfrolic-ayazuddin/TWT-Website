import Image from "next/image";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  trainingFacts,
  trainingHero,
  trainingProgrammes,
  trainingYear,
} from "@/content/training-programs";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { HUE } from "../hues";
import { Eyebrow, SectionHeading, sectionFrame } from "../section-heading";

/**
 * 01 · Page hero — Figma `Training Programs — Desktop` → `01 · Page hero`
 * (1440 × 808, `background/inverse`; padding 88/80/120/80, gap 80).
 *
 * Figma sets the status-card values at Bold 28/34 and their labels at Bold
 * 12/16 — neither is a text style. The nearest steps are used
 * (`Tablet/Heading/H3` 28/36 and `UI/Overline` 13/16); reported as a gap.
 */
export function TrainingHero() {
  return (
    <section
      aria-labelledby="training-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="contour-dark-1px"
          x={-40}
          y={-40}
          w={1520}
          h={856}
          opacity={0.85}
        />
        <Glow x={760} y={-160} w={900} h={900} opacity={0.8} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-14 px-(--page-margin) pt-12 pb-16",
          "tablet:pt-16 tablet:pb-24",
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-20 desktop:pt-22 desktop:pb-30",
        )}
      >
        <div className="desktop:w-150 desktop:shrink-0 flex flex-col items-start gap-7">
          <Breadcrumb items={trainingHero.breadcrumb} tone="dark" />
          <Eyebrow size="lg" tone="dark">
            {trainingHero.eyebrow}
          </Eyebrow>
          <h1
            id="training-title"
            className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-inverse"
          >
            {trainingHero.title}
          </h1>
          <p className={cn(type.bodyLarge, "text-text-inverse-muted")}>
            {trainingHero.lead}
          </p>
          <Button asChild variant="inverse" size="large" trailingIcon="arrow-right">
            <a href={trainingHero.cta.href}>{trainingHero.cta.label}</a>
          </Button>
        </div>

        {/* Figma `Hero visual` — 600 × 600 image (radius 32) with the
            `Status card` 576 wide at (-48, 462), overhanging to the left. */}
        <div className="desktop:mx-0 relative mx-auto w-full max-w-150 min-w-0 flex-1">
          <div className="aspect-square overflow-hidden rounded-2xl">
            <Image
              src={trainingHero.image.src}
              alt={trainingHero.image.alt}
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 768px) 600px, 92vw"
              className="size-full object-cover"
            />
          </div>
          <dl
            className={cn(
              "bg-surface-default shadow-elevation-3 tablet:py-5.5 relative mx-4 -mt-16 flex flex-col rounded-xl px-2 py-2",
              "tablet:absolute tablet:top-[77%] tablet:mx-0 tablet:mt-0 tablet:flex-row tablet:w-[96%]",
              // Figma: content-sized columns, card hugging them (576 wide).
              "desktop:-left-12 desktop:w-auto",
            )}
          >
            {trainingHero.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={cn(
                  // Phones: stacked rows. Tablet up: Figma's side-by-side columns.
                  "tablet:px-5 tablet:py-0 desktop:whitespace-nowrap flex flex-col-reverse gap-1 px-3 py-3",
                  i > 0 &&
                    "border-border-subtle tablet:border-t-0 tablet:border-l border-t",
                )}
              >
                <dt className="text-ui-overline text-text-muted">{fact.label}</dt>
                <dd
                  className={cn(
                    "text-mobile-heading-h4 tablet:text-tablet-heading-h3",
                    fact.accent ? "text-text-brand" : "text-text-heading",
                  )}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/**
 * 02 · The training year — Figma `02 · The training year` (1440 × 654,
 * `background/page`): heading row + a four-season rail.
 */
export function TrainingYear() {
  return (
    <section
      aria-labelledby="training-year-title"
      className="bg-background-page relative"
    >
      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <div className="desktop:flex-row desktop:items-end desktop:justify-between flex flex-col items-start gap-6">
          <SectionHeading
            id="training-year-title"
            eyebrow={trainingYear.eyebrow}
            title={trainingYear.title}
            description={trainingYear.description}
            className="max-w-190"
          />
          <Badge tone="placeholder" className="whitespace-normal">
            {trainingYear.badge}
          </Badge>
        </div>

        <ol className="tablet:grid-cols-2 desktop:grid-cols-4 grid grid-cols-1 gap-x-4 gap-y-10">
          {trainingProgrammes.map((p) => (
            <li key={p.id} className="flex flex-col gap-4">
              <div
                aria-hidden="true"
                className="text-ui-overline text-text-muted flex justify-between px-0.5"
              >
                {p.monthsShort.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <span aria-hidden="true" className={cn("h-2 rounded-xs", HUE[p.hue].bar)} />
              <div className="flex flex-col gap-2 pt-2">
                <p className={cn("text-ui-overline", HUE[p.hue].label)}>
                  {p.index} · {p.name}
                </p>
                <h3 className={cn(type.h4, "text-text-heading")}>
                  <a
                    href={`#${p.id}`}
                    className="hover:text-text-brand focus-visible:shadow-focus-ring rounded-xs transition-colors duration-150 focus-visible:outline-none"
                  >
                    {p.topic}
                  </a>
                </h3>
                <p className={cn(type.bodySmall, "text-text-body")}>
                  {p.range} · {trainingFacts.deliveryValue}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
