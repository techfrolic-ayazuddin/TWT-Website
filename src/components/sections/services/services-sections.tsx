import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/consultation/cta-button";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  connection,
  pillarOf,
  sectorMap,
  serviceIndex,
  servicesHero,
  whyWorkWithUs,
} from "@/content/services";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { Eyebrow, SectionHeading, sectionFrame } from "../section-heading";
import { SERVICE_HUE } from "./service-hues";

/**
 * 01 · Page hero — Figma `01 · Page hero` (`85:986`), 1440 × 1082, padding
 * 72/80/120/80, gap 64. Hero row 664 copy + 96 + 520 index card; below it the
 * 16:5 image with the approach chip.
 */
export function ServicesHero() {
  return (
    <section aria-labelledby="services-title" className="relative overflow-hidden">
      <DecorLayer>
        <Pattern name="fine-grid-light-1px" x={560} y={-160} w={1000} h={900} />
        {/* Figma instance opacity: 0.5 on the hero, 0.85 on 07. */}
        <Glow x={800} y={-200} w={800} h={800} opacity={0.5} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "flex flex-col gap-10 pt-10",
          "tablet:gap-14 tablet:pt-14",
          "desktop:gap-16 desktop:pt-18",
        )}
      >
        <div className="desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-10">
          <div className="desktop:w-166 desktop:shrink-0 flex flex-col items-start gap-7">
            <Breadcrumb items={servicesHero.breadcrumb} />
            <Eyebrow size="lg">{servicesHero.eyebrow}</Eyebrow>
            <h1
              id="services-title"
              // Client instruction (Phase 5.7): THIS heading alone is capped at
              // 64px on desktop — 64/72, matching the homepage hero and keeping
              // the Display/Hero tracking and weight from the tablet step.
              // Mobile (44/52) and tablet (56/64) are unchanged, and the global
              // `Desktop/Display/Hero` token stays at Figma's 72/80 everywhere
              // else. See also `sections/home/hero.tsx`.
              className={cn(
                "text-mobile-display-hero tablet:text-tablet-display-hero",
                "desktop:text-[4rem]/[4.5rem] text-text-heading",
              )}
            >
              {servicesHero.title}
            </h1>
            <p className={cn(type.bodyLarge, "text-text-body")}>{servicesHero.intro}</p>
            <div className="flex flex-wrap items-center gap-4">
              <CtaButton
                link={servicesHero.primaryCta}
                size="large"
                trailingIcon="arrow-right"
              />
              <Button asChild variant="outline" size="large" trailingIcon="arrow-right">
                <Link href={servicesHero.secondaryCta.href}>
                  {servicesHero.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>

          <ServiceIndexCard />
        </div>

        {/* Figma `Image · 16:5` — 1280 × 400, radius 32, chip inset 32. */}
        <div className="tablet:aspect-[16/7] desktop:aspect-[16/5] relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={servicesHero.image.src}
            alt={servicesHero.image.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            // Figma `CROP` window onto the photograph (`87:1494`).
            style={{ objectPosition: servicesHero.image.position }}
          />
          <p
            className={cn(
              "text-ui-overline bg-background-inverse text-text-inverse",
              "absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-full px-6 py-3.5",
              "tablet:bottom-8 tablet:left-8",
            )}
          >
            {servicesHero.approach.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true">·</span> : null}
                {step}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Figma `Service index` — 520 × 326 card, padding 32/36, rows 61 high split by
 * `border/subtle`. Each row links to its service detail page. Those routes are
 * the approved information architecture and are built in a later phase, so
 * they carry `status: "pending"` in the content layer and are rendered exactly
 * as the header's Services dropdown renders them — no page is stubbed to make
 * them resolve.
 */
function ServiceIndexCard() {
  return (
    <div
      className={cn(
        "bg-surface-default border-border-subtle w-full rounded-2xl border",
        "tablet:px-9 px-6 py-8",
        "desktop:w-130 desktop:shrink-0",
      )}
    >
      <p className="text-ui-overline text-text-muted">{servicesHero.indexLabel}</p>
      <ul>
        {serviceIndex.map(({ id, number, hue }) => {
          const pillar = pillarOf(id);
          const tone = SERVICE_HUE[hue];
          return (
            <li key={id} className="border-border-subtle border-b last:border-b-0">
              <Link
                href={pillar.link.href}
                className={cn(
                  "group flex items-center gap-4 rounded-sm py-4.5",
                  "transition-colors duration-150 focus-visible:outline-none",
                  "focus-visible:shadow-focus-ring",
                )}
              >
                <span className={cn("text-ui-overline", tone.label)} aria-hidden="true">
                  {number}
                </span>
                <span
                  className={cn(
                    "text-ui-label-large text-text-heading flex-1",
                    "group-hover:text-text-brand transition-colors duration-150",
                  )}
                >
                  {pillar.title}
                </span>
                <Icon
                  name="arrow-right"
                  size={20}
                  className={cn(
                    "shrink-0 transition-transform duration-150",
                    "group-hover:translate-x-1 motion-reduce:transform-none",
                    tone.label,
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * 02 · How our services connect — Figma `85:1050` (1440 × 837,
 * `background/subtle`). Two practice cards 508 wide either side of the
 * 200-wide Kaizen connector.
 */
export function ServicesConnection() {
  return (
    <section aria-labelledby="services-connection-title" className="bg-background-subtle">
      <div className={cn(sectionFrame, "flex flex-col items-center gap-16")}>
        <SectionHeading
          id="services-connection-title"
          align="center"
          className="desktop:max-w-180"
          eyebrow={connection.eyebrow}
          title={connection.title}
          description={connection.description}
        />

        {/* Figma `Connection diagram` — 508 + 32 + 200 + 32 + 508. The two
            cards are equal height (both 309); only the connector is centred. */}
        <div className="desktop:flex-row flex w-full flex-col items-stretch gap-8">
          <PracticeCard practice={connection.practices[0]} />

          {/* Figma `Connector` — the Kaizen node and its caption. */}
          <div className="desktop:w-50 desktop:shrink-0 desktop:self-center flex flex-col items-center gap-3">
            <span
              className={cn(
                "flex size-20 items-center justify-center rounded-full",
                SERVICE_HUE.violet.accentBg,
                SERVICE_HUE.violet.onSolid,
              )}
            >
              <Icon name={connection.connector.icon} size={32} />
            </span>
            <p className="text-ui-caption text-text-brand text-center">
              {connection.connector.caption}
            </p>
          </div>

          <PracticeCard practice={connection.practices[1]} />
        </div>
      </div>
    </section>
  );
}

function PracticeCard({ practice }: { practice: (typeof connection.practices)[number] }) {
  const tone = SERVICE_HUE[practice.hue];
  return (
    <div
      className={cn(
        "bg-surface-default flex flex-1 flex-col gap-3.5 rounded-2xl",
        "tablet:p-10 border-(length:--stroke-default) p-8",
        tone.border,
      )}
    >
      <span className={cn("h-1 w-12 rounded-[2px]", tone.accentBg)} aria-hidden="true" />
      <p className={cn("text-ui-overline", tone.label)}>{practice.role}</p>
      <h3 className={cn(type.h3, "text-text-heading")}>{practice.title}</h3>
      <p className={cn(type.body, "text-text-body")}>{practice.description}</p>
    </div>
  );
}

/**
 * 07 · Why work with us — Figma `87:1499` (1440 × 852, `background/inverse`).
 * 440 intro column + 96 gap + 744 anchor list.
 */
export function WhyWorkWithUs() {
  return (
    <section
      aria-labelledby="services-why-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Glow x={-360} y={-380} w={1000} h={1000} opacity={0.85} />
        <Pattern
          name="flow-lines-dark-1px"
          x={-40}
          y={-40}
          w={1520}
          h={932}
          opacity={0.75}
        />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "desktop:flex-row desktop:gap-24 flex flex-col gap-14",
        )}
      >
        <div className="desktop:w-110 desktop:shrink-0 flex flex-col gap-8">
          <SectionHeading
            id="services-why-title"
            tone="dark"
            eyebrow={whyWorkWithUs.eyebrow}
            title={whyWorkWithUs.title}
            description={whyWorkWithUs.description}
          />

          {/* Figma `Kaizen panel` — 440 × 180, `white/a12`, radius 24. */}
          <div className="bg-inverse-ghost-hover flex flex-col gap-3 rounded-xl p-7">
            <p className="flex items-center gap-3">
              <span className="bg-inverse-default text-text-brand flex size-10 shrink-0 items-center justify-center rounded-full">
                <Icon name={whyWorkWithUs.kaizen.icon} size={20} />
              </span>
              <span className="text-ui-label-large text-text-inverse">
                {whyWorkWithUs.kaizen.title}
              </span>
            </p>
            <p className={cn(type.bodySmall, "text-text-inverse-muted")}>
              {whyWorkWithUs.kaizen.body}
            </p>
          </div>
        </div>

        <ol className="flex min-w-0 flex-1 flex-col">
          {whyWorkWithUs.anchors.map((anchor) => (
            <li
              key={anchor.number}
              className={cn(
                // Figma gives every anchor a top hairline, including the
                // first — each row measures 153 incl. its own 1px rule.
                "border-border-inverse flex gap-6 border-t py-7",
                "tablet:gap-8",
              )}
            >
              <span
                className={cn(type.h3, "text-accent-yellow tablet:w-14 w-10 shrink-0")}
                aria-hidden="true"
              >
                {anchor.number}
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className={cn(type.h4, "text-text-inverse")}>{anchor.title}</h3>
                <p className={cn(type.body, "text-text-inverse-muted")}>{anchor.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * 08 · Services across sectors — Figma `87:1542` (1440 × 1129). A 1280-wide
 * map: 380 sector column + two 377 practice columns, 40 apart.
 *
 * Built as a list rather than a `<table>` so it can stack below desktop. Each
 * cell keeps its own column label in the DOM at every width — visible when
 * stacked, `sr-only` at desktop where the header row takes over — so assistive
 * technology never depends on the viewport.
 */
export function SectorMap() {
  const grid = "desktop:grid desktop:grid-cols-[380fr_377fr_377fr] desktop:gap-10";

  return (
    <section aria-labelledby="services-sectors-title">
      <div className={cn(sectionFrame, "flex flex-col gap-16")}>
        <div className="desktop:flex-row desktop:items-end desktop:justify-between flex flex-col gap-8">
          <SectionHeading
            id="services-sectors-title"
            className="desktop:max-w-180"
            eyebrow={sectorMap.eyebrow}
            title={sectorMap.title}
            description={sectorMap.description}
          />
          <Button
            asChild
            variant="outline"
            size="medium"
            trailingIcon="arrow-right"
            className="self-start"
          >
            <Link href={sectorMap.cta.href}>{sectorMap.cta.label}</Link>
          </Button>
        </div>

        <div className="border-border-default overflow-hidden rounded-2xl border">
          <div
            aria-hidden="true"
            className={cn(grid, "bg-background-muted text-ui-overline hidden px-8 py-5")}
          >
            <span className="text-text-muted">{sectorMap.columns.sector}</span>
            <span className={SERVICE_HUE.violet.label}>{sectorMap.columns.training}</span>
            <span className={SERVICE_HUE.pink.label}>{sectorMap.columns.advisory}</span>
          </div>

          <ul>
            {sectorMap.rows.map((row) => (
              <li
                key={row.title}
                className={cn(
                  grid,
                  "border-border-subtle flex flex-col gap-6 border-t p-6",
                  // Figma starts all three cells at the same y — top-aligned,
                  // not centred against the tallest.
                  "tablet:px-8 tablet:py-7 desktop:items-start desktop:gap-10",
                )}
              >
                <h3 className="flex items-center gap-4">
                  <span className="bg-primary-soft text-icon-brand flex size-12 shrink-0 items-center justify-center rounded-md">
                    <Icon name={row.icon} size={24} />
                  </span>
                  <span className="text-ui-label-large text-text-heading">
                    {row.title}
                  </span>
                </h3>
                <ModuleCell
                  label={sectorMap.columns.training}
                  modules={row.training}
                  dot={SERVICE_HUE.violet.accentBg}
                />
                <ModuleCell
                  label={sectorMap.columns.advisory}
                  modules={row.advisory}
                  dot={SERVICE_HUE.pink.accentBg}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ModuleCell({
  label,
  modules,
  dot,
}: {
  label: string;
  modules: string[];
  dot: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-ui-overline text-text-muted desktop:sr-only">{label}</p>
      <ul className="flex flex-col gap-2.5">
        {modules.map((module) => (
          <li key={module} className="flex items-start gap-2.5">
            {/* Centred on the FIRST line (24px line-height), so a wrapped
                module at narrow widths keeps its dot beside the text. */}
            <span
              className={cn("mt-2 size-2 shrink-0 rounded-full", dot)}
              aria-hidden="true"
            />
            <span className={cn(type.bodySmall, "text-text-body")}>{module}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
