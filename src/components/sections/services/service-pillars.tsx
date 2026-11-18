import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Hue } from "@/content/about";
import {
  advisoryService,
  capitalService,
  globalService,
  pillarOf,
  trainingService,
} from "@/content/services";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { sectionFrame } from "../section-heading";
import { HUE_BADGE, SERVICE_HUE } from "./service-hues";

/**
 * Sections 03–06 — the four approved service pillars, each drawn differently
 * in `B0 · Services Overview — Desktop` (`85:923`):
 *
 *   03 Training & Capacity Building  `85:1076`  image left, numbered modules
 *   04 Advisory & Management …       `85:1123`  soft panel, two-column modules
 *   05 Global Solutions              `91:3543`  copy left, abstract visual
 *   06 Tribe Capital                 `91:3583`  soft panel, package journey
 *
 * Each section stays monochromatic in its own segment hue (Brand Guidelines
 * rule, CLAUDE.md §3), driven from `SERVICE_HUE` — never hand-picked.
 */

/** Figma `Index` — the big numeral, the 48 × 4 figure bar and the status label. */
function ServiceIndex({
  number,
  hue,
  statusLabel,
  badge,
}: {
  number: string;
  hue: Hue;
  statusLabel: string;
  badge?: string;
}) {
  const tone = SERVICE_HUE[hue];
  return (
    <p className="flex flex-wrap items-center gap-3">
      <span className={cn(type.h3, tone.accent)} aria-hidden="true">
        {number}
      </span>
      <span className={cn("h-1 w-12 rounded-[2px]", tone.accentBg)} aria-hidden="true" />
      <span className={cn("text-ui-overline", tone.label)}>{statusLabel}</span>
      {badge ? <Badge tone="placeholder">{badge}</Badge> : null}
    </p>
  );
}

/** Figma `Benefits` — a wrapping row of `Badge` chips in the segment tone. */
function Benefits({ items, hue }: { items: string[]; hue: Hue }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge tone={HUE_BADGE[hue]}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

/**
 * Figma `Link · detail page to be built` — the `Text Link` treatment in the
 * section's own segment hue. `TextLink` is hard-bound to the violet brand
 * colour in both its rest and hover states, and this frame is monochromatic
 * per service, so the same geometry is rebuilt here with the segment token.
 */
function ServiceLink({ hue, href, label }: { hue: Hue; href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-ui-label-large group inline-flex items-center gap-1.5 self-start",
        "rounded-[6px] px-1 py-0.5 transition-opacity duration-150",
        "focus-visible:shadow-focus-ring hover:opacity-80 focus-visible:outline-none",
        SERVICE_HUE[hue].label,
      )}
    >
      {label}
      <Icon
        name="arrow-right"
        size={20}
        className="transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transform-none"
      />
    </Link>
  );
}

/* ----------------------------------- 03 · Training & Capacity Building */

export function TrainingService() {
  const pillar = pillarOf(trainingService.id);
  const tone = SERVICE_HUE[trainingService.hue];

  return (
    <section
      aria-labelledby="service-training-title"
      className="relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="dot-field-light" x={-300} y={380} w={960} h={760} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-12",
        )}
      >
        {/* Figma `Image · 4:5` — 560 × 700, radius 32. */}
        <div className="desktop:w-140 desktop:shrink-0 relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src={trainingService.image.src}
            alt={trainingService.image.alt}
            fill
            sizes="(min-width: 1280px) 560px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <ServiceIndex
            number={trainingService.number}
            hue={trainingService.hue}
            statusLabel={trainingService.statusLabel}
          />
          <h2 id="service-training-title" className={cn(type.h2, "text-text-heading")}>
            {pillar.title}
          </h2>
          <p className={cn(type.bodyLarge, "text-text-body")}>{pillar.description}</p>

          <ul>
            {trainingService.modules.map((module) => (
              <li
                key={module.name}
                className="border-border-subtle flex gap-5 border-t py-4"
              >
                <span
                  className={cn("text-ui-label-large w-8 shrink-0", tone.label)}
                  aria-hidden="true"
                >
                  {module.numeral}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-ui-label-large text-text-heading">{module.name}</h3>
                  <p className={cn(type.bodySmall, "text-text-body")}>
                    {module.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Benefits items={trainingService.benefits} hue={trainingService.hue} />

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="medium" trailingIcon="arrow-right">
              <Link href={pillar.link.href}>Explore {pillar.title}</Link>
            </Button>
            <Button asChild variant="outline" size="medium" trailingIcon="arrow-right">
              <Link href={trainingService.enquire.href}>
                {trainingService.enquire.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 04 · Advisory & Management Consulting */

export function AdvisoryService() {
  const pillar = pillarOf(advisoryService.id);
  const tone = SERVICE_HUE[advisoryService.hue];

  return (
    <section aria-labelledby="service-advisory-title">
      <div className={sectionFrame}>
        {/* Figma `Advisory panel` — 1280 × 695, `segment/pink/soft`, radius 32,
            copy 760 + image 520. */}
        <div
          className={cn(
            "desktop:flex-row flex flex-col overflow-hidden rounded-2xl",
            tone.soft,
          )}
        >
          {/* Figma `Service copy` — 760 wide, padding 64/56/64/64, so the
              text column is exactly 640 and the title holds one line. */}
          <div className="desktop:w-190 desktop:shrink-0 desktop:py-16 desktop:pr-14 desktop:pl-16 tablet:p-10 flex flex-col gap-6 p-6">
            <ServiceIndex
              number={advisoryService.number}
              hue={advisoryService.hue}
              statusLabel={advisoryService.statusLabel}
            />
            <h2 id="service-advisory-title" className={cn(type.h2, "text-text-heading")}>
              {pillar.title}
            </h2>
            <p className={cn(type.bodyLarge, "text-text-body")}>{pillar.description}</p>

            <ul className="tablet:grid-cols-2 grid gap-6">
              {advisoryService.modules.map((module) => (
                <li
                  key={module.name}
                  className={cn("flex flex-col gap-1.5 border-t pt-4", tone.border)}
                >
                  <h3 className="text-ui-label-large text-text-heading">{module.name}</h3>
                  <p className={cn(type.bodySmall, "text-text-body")}>
                    {module.description}
                  </p>
                </li>
              ))}
            </ul>

            <Benefits items={advisoryService.benefits} hue={advisoryService.hue} />

            <ServiceLink
              hue={advisoryService.hue}
              href={pillar.link.href}
              label={`Explore ${pillar.title}`}
            />
          </div>

          <div className="desktop:w-130 desktop:shrink-0 desktop:aspect-auto relative aspect-[4/3] w-full">
            <Image
              src={advisoryService.image.src}
              alt={advisoryService.image.alt}
              fill
              sizes="(min-width: 1280px) 520px, 100vw"
              className="object-cover"
              // Figma `CROP` window onto the photograph (`85:1156`).
              style={{ objectPosition: advisoryService.image.position }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- 05 · Global Solutions */

export function GlobalService() {
  const pillar = pillarOf(globalService.id);
  const tone = SERVICE_HUE[globalService.hue];

  return (
    <section
      aria-labelledby="service-global-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <div
        className={cn(
          sectionFrame,
          "desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-12",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <ServiceIndex
            number={globalService.number}
            hue={globalService.hue}
            statusLabel={globalService.statusLabel}
          />
          <h2 id="service-global-title" className={cn(type.h2, "text-text-heading")}>
            {pillar.title}
          </h2>
          <p className={cn(type.bodyLarge, "text-text-body")}>{pillar.description}</p>

          <p className="text-ui-overline text-text-muted">{globalService.modulesLabel}</p>
          <ul className="tablet:grid-cols-3 grid gap-5">
            {globalService.modules.map((module) => (
              <li
                key={module.name}
                className={cn(
                  "border-t-segment-orange-accent flex flex-col gap-2 pt-4.5",
                  "border-t-(length:--stroke-default)",
                )}
              >
                <span className={cn("text-ui-overline", tone.label)} aria-hidden="true">
                  {module.number}
                </span>
                <h3 className="text-ui-label-large text-text-heading">{module.name}</h3>
              </li>
            ))}
          </ul>

          <ServiceLink
            hue={globalService.hue}
            href={pillar.link.href}
            label={`Explore ${pillar.title}`}
          />
        </div>

        {/* Figma `Abstract visual` — 520 × 520, `segment/orange/soft`, radius
            32, with the Orbit arcs pattern behind a filled globe tile. */}
        <div
          className={cn(
            "desktop:size-130 desktop:shrink-0 relative flex aspect-square w-full",
            "flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl",
            tone.soft,
          )}
        >
          {/* The arcs are placed against the 520 box itself, not the 1440
              artboard, so `DecorLayer`'s centred stage is not used here. */}
          <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Pattern name="orbit-arcs-light-1px" x={-560} y={-90} w={1040} h={700} />
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "relative flex size-28 items-center justify-center rounded-full",
              tone.solid,
              tone.onSolid,
            )}
          >
            <Icon name={globalService.visual.icon} size={48} />
          </span>
          <ul className="relative flex flex-wrap justify-center gap-2 px-4">
            {globalService.visual.chips.map((chip) => (
              <li key={chip}>
                <Badge tone={HUE_BADGE[globalService.hue]}>{chip}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- 06 · Tribe Capital */

export function CapitalService() {
  const pillar = pillarOf(capitalService.id);
  const tone = SERVICE_HUE[capitalService.hue];

  return (
    <section aria-labelledby="service-capital-title">
      <div className={sectionFrame}>
        {/* Figma `Tribe Capital panel` — 1280 × 712, `segment/yellow/soft`,
            1px `segment/yellow/border`, radius 32, padding 64, gap 48. */}
        <div
          className={cn(
            "relative flex flex-col gap-12 overflow-hidden rounded-2xl border",
            "tablet:p-10 desktop:p-16 p-6",
            tone.soft,
            tone.border,
          )}
        >
          {/* Figma places the contour against the 1280 panel, not the 1440
              artboard, so it is positioned on the panel itself. */}
          <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Pattern name="contour-light-1px" x={120} y={-160} w={1400} h={900} />
          </span>

          <div className="desktop:flex-row desktop:items-end desktop:justify-between relative flex flex-col gap-8">
            <div className="desktop:max-w-175 flex flex-col gap-5">
              <ServiceIndex
                number={capitalService.number}
                hue={capitalService.hue}
                statusLabel={capitalService.statusLabel}
                badge={capitalService.badge}
              />
              <h2 id="service-capital-title" className={cn(type.h2, "text-text-heading")}>
                {pillar.title}
              </h2>
              <p className={cn(type.bodyLarge, "text-text-body")}>{pillar.description}</p>
            </div>

            <div className="desktop:items-end flex flex-col items-start gap-4">
              {/* Figma `CTA · Enquire` — the approved Tribe Capital CTA from
                  the service portfolio. The enquiry overlay (`111:7432`) is
                  not built, so it links to Contact as elsewhere on the site. */}
              <Button asChild size="large" trailingIcon="arrow-right">
                <Link href={pillar.enquire?.href ?? "/contact"}>
                  {pillar.enquire?.label ?? "Enquire"}
                </Link>
              </Button>
              <ServiceLink
                hue={capitalService.hue}
                href={pillar.link.href}
                label={`Explore ${pillar.title}`}
              />
            </div>
          </div>

          <div className="relative flex flex-col gap-12">
            <div className="flex flex-col gap-1.5">
              <h3 className={cn("text-ui-overline", tone.label)}>
                {capitalService.packagesLabel}
              </h3>
              {/* @placeholder Provisional — kept visible as Figma draws it. */}
              <p className={cn("text-ui-caption", tone.label)}>
                {capitalService.provisionalNote}
              </p>
            </div>

            {/* Figma `Package journey` — three 346 cards joined by arrows. */}
            {/* Figma draws all three packages 250 tall, so the cards stretch
                to the tallest and only the arrows are centred. */}
            <ol className="desktop:flex-row desktop:items-stretch flex flex-col gap-4">
              {capitalService.packages.map((pkg, i) => (
                <li
                  key={pkg.name}
                  className="desktop:flex-1 desktop:flex-row flex flex-col items-stretch gap-4"
                >
                  {i > 0 ? (
                    <Icon
                      name="arrow-right"
                      size={24}
                      aria-hidden="true"
                      className={cn(
                        "desktop:rotate-0 desktop:self-center shrink-0 rotate-90 self-center",
                        tone.label,
                      )}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "bg-surface-default flex flex-1 flex-col gap-3 rounded-xl border p-7",
                      tone.border,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-ui-label-large flex size-10 items-center justify-center rounded-full",
                        tone.accentBg,
                        tone.onSolid,
                      )}
                    >
                      {pkg.step}
                    </span>
                    <h4 className={cn(type.h4, "text-text-heading")}>{pkg.name}</h4>
                    <p className={cn(type.body, "text-text-body")}>{pkg.timeline}</p>
                    <Badge tone="placeholder" className="self-start">
                      {capitalService.packageBadge}
                    </Badge>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
