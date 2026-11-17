import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Icon } from "@/components/ui/icon";
import { sectors, sectorUi, type Sector } from "@/content/industries";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { HUE } from "../hues";
import { sectionFrame } from "../section-heading";

/**
 * 03 · Sectors — Figma `03.1`–`03.5` (`57:593`, `57:622`, `57:651`, `57:680`,
 * `57:709`). Five sections in one repeating layout: a 600 × 450 photograph
 * (radius 32) beside 584 of copy, 96 apart, alternating sides.
 *
 *   01 Hospitality           white   photo left
 *   02 Consumer Markets…     subtle  photo right, light flow lines
 *   03 Healthcare            white   full-bleed photo (22% navy scrim) with
 *                                    the copy on a floating card, right
 *   04 Public Sector…        subtle  photo right, light flow lines
 *   05 Conglomerates…        white   photo left
 *
 * Figma draws every "How we help" link row with its service pillar's hue: a
 * 10px dot, the pillar name in the hue's text colour and an arrow. The links
 * go to the service pages, which are not built yet (pending routes).
 */

function Index({ sector }: { sector: Sector }) {
  return (
    <p className="flex items-center gap-3">
      <span className="text-ui-overline text-text-brand">{sector.index}</span>
      {/* Figma `Rectangle` 40 × 2, violet-300. */}
      <span
        aria-hidden="true"
        className="bg-border-brand-soft h-0.5 w-10 rounded-[2px]"
      />
      <span className="text-ui-overline text-text-muted">{sectorUi.indexLabel}</span>
    </p>
  );
}

function HowWeHelp({ sector }: { sector: Sector }) {
  return (
    <div className="pt-2">
      <h3 className="text-ui-overline text-text-muted">{sectorUi.helpLabel}</h3>
      <ul>
        {sector.services.map((service) => {
          const hue = HUE[service.hue];
          return (
            <li key={service.title}>
              <Link
                href={service.href}
                className={cn(
                  "group border-border-default flex items-center gap-4 border-b py-4",
                  "focus-visible:shadow-focus-ring rounded-xs focus-visible:outline-none",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("size-2.5 shrink-0 rounded-full", hue.bar)}
                />
                <span className="text-ui-label-large text-text-heading group-hover:text-text-brand min-w-0 flex-1 transition-colors duration-150">
                  {service.title}
                </span>
                <span
                  className={cn(
                    "text-ui-caption tablet:block hidden shrink-0",
                    hue.label,
                  )}
                >
                  {service.pillar}
                </span>
                <Icon
                  name="arrow-right"
                  size={20}
                  className={cn(
                    "shrink-0 transition-transform duration-150 group-hover:translate-x-1",
                    hue.label,
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

function Copy({ sector, id }: { sector: Sector; id: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Index sector={sector} />
      <h2 id={id} className={cn(type.h2, "text-text-heading")}>
        {sector.title}
      </h2>
      <p className={cn(type.bodyLarge, "text-text-body")}>{sector.description}</p>
      <HowWeHelp sector={sector} />
    </div>
  );
}

/** Figma `Image · 4:3` — 600 × 450, radius 32. */
function Photo({ sector, priority }: { sector: Sector; priority?: boolean }) {
  return (
    <div className="desktop:w-150 desktop:shrink-0 relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={sector.image.src}
        alt={sector.image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 600px, 92vw"
        className="object-cover"
      />
    </div>
  );
}

function SplitSector({
  sector,
  reverse,
  subtle,
}: {
  sector: Sector;
  reverse: boolean;
  subtle: boolean;
}) {
  const id = `sector-${sector.index}`;
  return (
    <section
      id={`sector-${sector.index}-section`}
      aria-labelledby={id}
      className={cn(
        "relative overflow-hidden",
        subtle ? "bg-background-subtle" : "bg-background-page",
      )}
    >
      {subtle ? (
        <DecorLayer>
          <Pattern
            name="flow-lines-light-1px"
            x={-220}
            y={-60}
            w={920}
            h={440}
            opacity={0.9}
          />
        </DecorLayer>
      ) : null}
      <div
        className={cn(
          sectionFrame,
          "tablet:gap-14 desktop:items-center desktop:gap-24 flex flex-col gap-10",
          reverse ? "desktop:flex-row-reverse" : "desktop:flex-row",
        )}
      >
        <Photo sector={sector} />
        <div className="min-w-0 flex-1">
          <Copy sector={sector} id={id} />
        </div>
      </div>
    </section>
  );
}

/**
 * 03.3 · Healthcare — Figma `57:651` (1440 × 919, padding 160/80): the photo
 * is a full-bleed background (1880 × 1200 at (−440, −140), clipped) under a
 * 22% navy scrim, and the copy sits on a 620-wide white card (padding 48,
 * radius 32, `Elevation/3`) at the right. Below `desktop` there is no room to
 * float a card over a photo without hiding it, so the photo stacks above the
 * card instead.
 */
function HealthcareSector({ sector }: { sector: Sector }) {
  const id = `sector-${sector.index}`;
  return (
    <section
      id={`sector-${sector.index}-section`}
      aria-labelledby={id}
      className="bg-background-page relative overflow-hidden"
    >
      {/* Background photograph — desktop only. Percentages are Figma's
          (−440, −140, 1880 × 1200) over the 1440 × 919 frame (one-off crop
          values, CLAUDE.md §3.1). */}
      <div aria-hidden="true" className="desktop:block absolute inset-0 hidden">
        <div
          className="absolute"
          style={{ left: "-30.56%", top: "-15.23%", width: "130.56%", height: "130.58%" }}
        >
          <Image
            src={sector.image.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="bg-background-inverse-strong/22 absolute inset-0" />
      </div>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-10 px-(--page-margin) py-(--section-y)",
          "tablet:gap-14 desktop:flex-row desktop:justify-end desktop:py-40",
        )}
      >
        <div className="desktop:hidden">
          <Photo sector={sector} />
        </div>
        <div className="desktop:w-155 desktop:shrink-0 desktop:bg-surface-default desktop:shadow-elevation-3 desktop:rounded-2xl desktop:p-12">
          <Copy sector={sector} id={id} />
        </div>
      </div>
    </section>
  );
}

export function Sectors() {
  return (
    <>
      {sectors.map((sector, i) =>
        sector.index === "03" ? (
          <HealthcareSector key={sector.index} sector={sector} />
        ) : (
          <SplitSector
            key={sector.index}
            sector={sector}
            // 01 and 05 put the photo left, 02 and 04 right.
            reverse={i % 2 === 1}
            subtle={i % 2 === 1}
          />
        ),
      )}
    </>
  );
}
