import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  industriesHero,
  sectorEnquiry,
  specialisations,
  whoWeServe,
} from "@/content/industries";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { Eyebrow, sectionFrame } from "../section-heading";
import { IndustryMarquee } from "./industry-marquee";

/**
 * 01 · Page hero — Figma `C · Industries — Desktop` → `01 · Page hero`
 * (1440 × 776, `background/inverse`; padding 96/80/120/80, gap 80).
 */
export function IndustriesHero() {
  const { tiles, stat } = industriesHero;
  const tile = "relative overflow-hidden rounded-xl";

  return (
    <section
      aria-labelledby="industries-title"
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
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-20 desktop:pt-24 desktop:pb-30",
        )}
      >
        <div className="desktop:w-140 desktop:shrink-0 flex flex-col items-start gap-7">
          <Breadcrumb items={industriesHero.breadcrumb} tone="dark" />
          <Eyebrow size="lg" tone="dark">
            {industriesHero.eyebrow}
          </Eyebrow>
          <h1
            id="industries-title"
            className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-inverse"
          >
            {industriesHero.title}
          </h1>
          <p className={cn(type.bodyLarge, "text-text-inverse-muted")}>
            {industriesHero.intro}
          </p>
          <Button asChild variant="inverse" size="large" trailingIcon="arrow-right">
            <Link href={industriesHero.cta.href}>{industriesHero.cta.label}</Link>
          </Button>
        </div>

        {/* Figma `Image mosaic` — 640 × 560: two columns (300 / 320) 20 apart;
            left = portrait 300 + stat tile 240, right = 200 + 340. Tile
            heights are `fr` tracks, so the mosaic scales as one piece. */}
        <div className="desktop:mx-0 mx-auto grid aspect-[640/560] w-full max-w-160 min-w-0 flex-1 grid-cols-[minmax(0,300fr)_minmax(0,320fr)] gap-5">
          <div className="grid grid-rows-[minmax(0,300fr)_minmax(0,240fr)] gap-5">
            <div className={tile}>
              <Image
                src={tiles.leader.src}
                alt={tiles.leader.alt}
                fill
                priority
                sizes="(min-width: 1280px) 300px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="bg-background-brand tablet:p-7 flex flex-col justify-end gap-1 rounded-xl p-4">
              <span className="text-mobile-heading-h1 tablet:text-desktop-stat-number text-text-inverse">
                {stat.value}
              </span>
              <span className="text-ui-label-large text-text-inverse">{stat.label}</span>
            </div>
          </div>
          <div className="grid grid-rows-[minmax(0,200fr)_minmax(0,340fr)] gap-5">
            <div className={tile}>
              <Image
                src={tiles.manufacturing.src}
                alt={tiles.manufacturing.alt}
                fill
                priority
                sizes="(min-width: 1280px) 320px, 45vw"
                className="object-cover"
              />
            </div>
            <div className={tile}>
              <Image
                src={tiles.session.src}
                alt={tiles.session.alt}
                fill
                priority
                sizes="(min-width: 1280px) 320px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 01b · Specialisations — Figma `01b · Industry Marquee — Light Variation`
 * (`185:11636`, 1440 × 406, `background/subtle`; padding-top 88, gap 56): an
 * intro row (statement + count) above the full-bleed marquee.
 *
 * The count's 96/96 display size is not a type step; the nearest,
 * `Display/Hero` (72/80), is used and reported (CLAUDE.md §3.1).
 */
export function Specialisations() {
  return (
    <section
      aria-labelledby="specialisations-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <div className="tablet:pt-18 desktop:pt-22 tablet:gap-14 flex flex-col gap-10 pt-12 pb-0">
        {/* Figma intro row is 116px (the count is 96px there); keep that rhythm. */}
        <div className="desktop:min-h-29 tablet:flex-row tablet:items-end tablet:justify-between mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-6 px-(--page-margin)">
          <div className="flex max-w-220 flex-col gap-5">
            <Eyebrow>{specialisations.eyebrow}</Eyebrow>
            <h2 id="specialisations-title" className={cn(type.h2, "text-text-heading")}>
              {specialisations.title}
            </h2>
          </div>
          <p className="tablet:flex-col tablet:items-end tablet:gap-1 flex items-end gap-4">
            <span aria-hidden="true" className={cn(type.hero, "text-text-brand")}>
              {specialisations.count}
            </span>
            <span className="text-ui-overline text-text-muted tablet:pb-0 pb-3">
              {specialisations.countLabel}
            </span>
          </p>
        </div>

        <IndustryMarquee
          items={specialisations.items}
          summary={specialisations.summary}
        />
      </div>
    </section>
  );
}

/**
 * 02 · Who we serve — Figma `02 · Who we serve` (1440 × 596,
 * `background/page`; padding 120/80, gap 64): a centred statement and a row
 * of "moments of consequence" chips.
 */
export function WhoWeServe() {
  return (
    <section
      aria-labelledby="who-we-serve-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light-1px" x={200} y={-180} w={1040} h={900} />
      </DecorLayer>

      <div
        className={cn(sectionFrame, "tablet:gap-16 flex flex-col items-center gap-10")}
      >
        <div className="flex max-w-240 flex-col items-center gap-6 text-center">
          <p className="text-ui-overline text-text-brand">{whoWeServe.eyebrow}</p>
          <h2 id="who-we-serve-title" className={cn(type.h2, "text-text-heading")}>
            {whoWeServe.title}
          </h2>
          <p className={cn(type.bodyLarge, "text-text-body")}>{whoWeServe.description}</p>
        </div>

        <div className="flex max-w-240 flex-col items-center gap-4 text-center">
          <h3 className="text-ui-overline text-text-muted">{whoWeServe.momentsLabel}</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {whoWeServe.moments.map((moment) => (
              <li key={moment} className="flex">
                <Badge tone="brand">{moment}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * 04 · Sector enquiry — Figma `04 · Sector enquiry` (1440 × 308): a
 * `primary/soft` panel (1280 × 228, radius 32, padding 48/56) with a fine
 * grid, a short message and a primary CTA.
 */
export function SectorEnquiry() {
  return (
    <section aria-labelledby="sector-enquiry-title" className="bg-background-page">
      <div className="mx-auto w-full max-w-(--canvas-desktop) px-(--page-margin) pb-(--section-y-compact)">
        <div
          className={cn(
            "bg-primary-soft relative flex flex-col gap-8 overflow-hidden rounded-2xl p-6",
            "tablet:p-10 desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-12 desktop:px-14 desktop:py-12",
          )}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Pattern name="fine-grid-light-1px" x={620} y={-300} w={1000} h={800} />
          </div>
          <div className="relative flex max-w-190 flex-col gap-2.5">
            <p className="text-ui-overline text-text-brand">{sectorEnquiry.overline}</p>
            <h2 id="sector-enquiry-title" className={cn(type.h3, "text-text-heading")}>
              {sectorEnquiry.title}
            </h2>
            <p className={cn(type.body, "text-text-body")}>{sectorEnquiry.text}</p>
          </div>
          <Button
            asChild
            size="large"
            className="relative self-start"
            trailingIcon="arrow-right"
          >
            <Link href={sectorEnquiry.cta.href}>{sectorEnquiry.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
