import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type {
  MethodologyStep,
  RelatedService,
  ServiceDetailHero,
  ServiceDetailModule,
  ValueProposition,
} from "@/content/service-training";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { SectionHeading, sectionFrame } from "../section-heading";
import { HUE_BADGE, SERVICE_HUE } from "./service-hues";

/**
 * The shared **Service Detail template** — Figma
 * `B · Service Detail Template` (`56:329`), seven sections in frame order.
 *
 * The template's `Service Hero` and `Service Module` components both carry a
 * `Segment` axis, so every section here takes a `hue` prop and stays
 * monochromatic in that service's colour (CLAUDE.md §3, §4). Phase 5.7 ships
 * the Violet (Training & Capacity Building) instance; the other three services
 * are later phases.
 */

type Hued = { hue: keyof typeof SERVICE_HUE };

/* ----------------------------------------------------- 01 · Service hero */

/**
 * Figma `Service Hero` — 1440 × 640, split 720 content / 720 image. The
 * content half is the segment's solid fill, padding 64/72/64/80, gap 28,
 * vertically centred.
 */
export function ServiceDetailHeroSection({
  hue,
  content,
}: Hued & { content: ServiceDetailHero }) {
  const tone = SERVICE_HUE[hue];
  return (
    <section
      aria-labelledby="service-title"
      className="desktop:flex-row relative flex flex-col"
    >
      <div
        className={cn(
          // Figma `Service Hero` is a fixed 640 tall with its content
          // vertically centred, so the copy half carries the min-height and
          // the image half stretches to match it.
          "desktop:min-h-160 desktop:w-1/2 desktop:px-20 desktop:py-16 relative overflow-hidden",
          "tablet:px-12 tablet:py-14 flex flex-col justify-center gap-7 px-6 py-12",
          tone.solid,
        )}
      >
        <DecorLayer>
          <Pattern
            name="flow-lines-dark-1px"
            x={-120}
            y={40}
            w={900}
            h={640}
            opacity={0.7}
          />
        </DecorLayer>

        {/* Text colour follows the segment's `on-solid` token, not a fixed
            white: `segment/yellow/solid` is a LIGHT surface and Figma draws
            navy on it (CLAUDE.md §8 — yellow never takes `text/inverse`). */}
        <div className="desktop:max-w-142 relative flex flex-col gap-7">
          {/* Figma `Service Hero` → `Breadcrumb` is filled with
              `segment/{hue}/on-solid`. On the light (yellow) surface that is
              navy `#070052`, not the generic `text/muted` grey this fell back
              to — Tribe Capital only; the three dark heroes are untouched. */}
          <Breadcrumb
            items={content.breadcrumb}
            tone={tone.surface}
            className={tone.surface === "light" ? tone.onSolid : undefined}
          />
          <p className={cn("text-ui-overline", tone.onSolid)}>{content.overline}</p>
          <h1 id="service-title" className={cn(type.hero, tone.onSolid)}>
            {content.title}
          </h1>
          <p className={cn(type.bodyLarge, tone.onSolid)}>{content.intro}</p>
          <Button
            asChild
            variant="inverse"
            size="large"
            trailingIcon="arrow-right"
            className="self-start"
          >
            <Link href={content.cta.href}>{content.cta.label}</Link>
          </Button>
        </div>
      </div>

      <div className="desktop:aspect-auto desktop:w-1/2 relative aspect-[4/3] w-full">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          priority
          sizes="(min-width: 1280px) 720px, 100vw"
          className="object-cover"
          // Figma `CROP` fills (Advisory) are a window, not a centred fit.
          style={
            content.image.position
              ? { objectPosition: content.image.position }
              : undefined
          }
        />
      </div>
    </section>
  );
}

/* --------------------------------------- 02 · Overview & value proposition */

/** Figma `02 · Overview & value proposition` — 624 statement + 96 + 560. */
export function ServiceOverview({
  hue,
  content,
}: Hued & {
  content: { eyebrow: string; title: string; lead: string; values: ValueProposition[] };
}) {
  const tone = SERVICE_HUE[hue];
  return (
    <section
      aria-labelledby="service-overview-title"
      className="relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="fine-grid-light-1px"
          x={-240}
          y={-260}
          w={1000}
          h={800}
          opacity={0.9}
        />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "desktop:flex-row desktop:gap-24 flex flex-col gap-12",
        )}
      >
        {/* Figma `Statement` — 624 wide. The lead paragraph sits here, under
            the heading (design update 2026-11-13); it used to open the value
            column on the right. */}
        <div className="desktop:w-156 desktop:shrink-0 flex flex-col gap-6">
          <p className={cn("text-ui-overline", tone.label)}>{content.eyebrow}</p>
          <h2 id="service-overview-title" className={cn(type.h2, "text-text-heading")}>
            {content.title}
          </h2>
          <p className={cn(type.bodyLarge, "text-text-body")}>{content.lead}</p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <ul className="flex flex-col gap-8">
            {content.values.map((value) => (
              <li key={value.title} className="flex gap-5">
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-md",
                    tone.soft,
                    tone.label,
                  )}
                >
                  <Icon name={value.icon} size={24} />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-ui-label-large text-text-heading">{value.title}</h3>
                  <p className={cn(type.body, "text-text-body")}>{value.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 03 · Modules */

/**
 * Figma `03 · Modules` — a wrapping 2-column grid of `Service Module` cards
 * (616 wide, 48 apart, radius 32, 1.5px segment border, padding 40, gap 16).
 */
export function ServiceModules({
  hue,
  content,
}: Hued & {
  content: {
    eyebrow: string;
    title: string;
    /** Optional — Figma gives no modules description for Global Solutions. */
    description?: string;
    items: ServiceDetailModule[];
    /** Optional `Badge` chips — Global Solutions draws three on `91:3543`. */
    chips?: string[];
  };
}) {
  const tone = SERVICE_HUE[hue];
  // Figma lays the four Training/Advisory modules out two-up and the three
  // Global Solutions modules in a single row, so the track follows the count.
  const columns =
    content.items.length % 3 === 0 ? "desktop:grid-cols-3" : "desktop:grid-cols-2";
  return (
    <section
      aria-labelledby="service-modules-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="dot-field-light" x={720} y={760} w={960} h={760} />
      </DecorLayer>

      <div className={cn(sectionFrame, "flex flex-col gap-16")}>
        <SectionHeading
          id="service-modules-title"
          className="desktop:max-w-180"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <ul className={cn("desktop:gap-12 grid items-start gap-8", columns)}>
          {content.items.map((module) => (
            <li
              key={module.name}
              className={cn(
                "bg-surface-default flex flex-col gap-4 rounded-2xl",
                "tablet:p-10 border-(length:--stroke-default) p-6",
                tone.border,
              )}
            >
              <span className={cn(type.h2, tone.numeral)} aria-hidden="true">
                {module.numeral}
              </span>
              <h3 className={cn(type.h4, "text-text-heading")}>{module.name}</h3>
              {module.description ? (
                <p className={cn(type.body, "text-text-body")}>{module.description}</p>
              ) : null}
              {module.scope ? (
                <>
                  <hr className="border-border-subtle" />
                  <p className={cn("text-ui-overline", tone.label)}>
                    {module.scopeLabel}
                  </p>
                  <p className={cn(type.bodySmall, "text-text-body")}>{module.scope}</p>
                </>
              ) : null}
            </li>
          ))}
        </ul>

        {/* Figma `Chips` — the segment-toned badges drawn beside the Global
            Solutions visual on the Services Overview (`91:3543`). */}
        {content.chips?.length ? (
          <ul className="flex flex-wrap gap-2">
            {content.chips.map((chip) => (
              <li key={chip}>
                <Badge tone={HUE_BADGE[hue]}>{chip}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------------------------------------- 04 · Imagery & outcomes */

/**
 * Figma `04 · Imagery & outcomes` — a 600 × 620 collage (a 400 × 500 portrait
 * with a 280 circle overlapping its lower-right) beside a 584 outcome list.
 */
export function ServiceOutcomes({
  hue,
  content,
}: Hued & {
  content: {
    eyebrow: string;
    title: string;
    collage: {
      portrait: { src: string; alt: string };
      circle: { src: string; alt: string };
    };
    items: string[];
  };
}) {
  const tone = SERVICE_HUE[hue];
  return (
    <section aria-labelledby="service-outcomes-title">
      <div
        className={cn(
          sectionFrame,
          "desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-12",
        )}
      >
        {/* Figma `Image collage` — 600 × 620. Both images are placed as
            percentages of that box, so the overlap is identical at any size. */}
        <div className="desktop:w-150 desktop:shrink-0 relative aspect-[600/620] w-full max-w-150">
          {/* Figma `Image · 4:5` — 400 × 500 at the collage origin. */}
          <div className="absolute top-0 left-0 h-[80.6%] w-[66.7%] overflow-hidden rounded-2xl">
            <Image
              src={content.collage.portrait.src}
              alt={content.collage.portrait.alt}
              fill
              sizes="(min-width: 1280px) 400px, 60vw"
              className="object-cover"
            />
          </div>
          {/* Figma `Image · 1:1` — a 280 circle at (320, 340) of the 600 × 620
              collage, ringed in the page colour. Percentages keep the overlap
              identical as the collage scales. */}
          <div
            className={cn(
              "absolute top-[54.8%] left-[53.3%] aspect-square w-[46.7%]",
              "ring-background-page overflow-hidden rounded-full ring-8",
            )}
          >
            <Image
              src={content.collage.circle.src}
              alt={content.collage.circle.alt}
              fill
              sizes="(min-width: 1280px) 280px, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <SectionHeading
            id="service-outcomes-title"
            eyebrow={content.eyebrow}
            title={content.title}
          />
          <ul className="flex flex-col gap-8">
            {content.items.map((item) => (
              <li
                key={item}
                className="border-border-subtle flex gap-4 border-t pt-4.5 pb-4.5"
              >
                <Icon
                  name="check"
                  size={24}
                  aria-hidden="true"
                  className={cn("mt-1 shrink-0", tone.label)}
                />
                <p className={cn(type.bodyLarge, "text-text-heading")}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ 05 · Methodology */

/** Figma `05 · Methodology` — four 296 steps on `background/inverse`. */
export function ServiceMethodology({
  hue,
  content,
}: Hued & {
  content: {
    eyebrow: string;
    title: string;
    description: string;
    steps: MethodologyStep[];
  };
}) {
  const tone = SERVICE_HUE[hue];
  return (
    <section
      aria-labelledby="service-method-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="flow-lines-dark-1px"
          x={-40}
          y={40}
          w={1520}
          h={760}
          opacity={0.75}
        />
        <Glow x={270} y={-420} w={900} h={900} opacity={0.8} />
      </DecorLayer>

      <div className={cn(sectionFrame, "flex flex-col items-center gap-16")}>
        <SectionHeading
          id="service-method-title"
          tone="dark"
          align="center"
          className="desktop:max-w-180"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <ol className="desktop:grid-cols-4 grid w-full gap-8">
          {content.steps.map((step) => (
            <li key={step.number} className="flex flex-col gap-5">
              {/* Node row — every step carries a connector, including the
                  last, which runs on past step 04 to the content edge
                  (design update 2026-11-13). */}
              <p className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-ui-label-large flex size-14 shrink-0 items-center justify-center rounded-full",
                    tone.accentBg,
                    tone.onSolid,
                  )}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="bg-border-inverse desktop:block hidden h-0.5 flex-1"
                />
              </p>
              <h3 className={cn(type.h4, "text-text-inverse")}>{step.title}</h3>
              <p className={cn(type.body, "text-text-inverse-muted")}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------- 06 · Related services */

/** Figma `06 · Related services` — three 405 cards, 32 apart. */
export function RelatedServices({
  content,
}: {
  content: {
    eyebrow: string;
    title: string;
    linkLabel: string;
    items: RelatedService[];
  };
}) {
  return (
    <section aria-labelledby="service-related-title">
      <div className={cn(sectionFrame, "flex flex-col gap-16")}>
        <SectionHeading
          id="service-related-title"
          className="desktop:max-w-180"
          eyebrow={content.eyebrow}
          title={content.title}
        />

        <ul className="tablet:grid-cols-2 desktop:grid-cols-3 grid items-start gap-8">
          {content.items.map((item) => {
            const tone = SERVICE_HUE[item.hue];
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex flex-col gap-4 rounded-xl",
                    "focus-visible:shadow-focus-ring focus-visible:outline-none",
                  )}
                >
                  <span className="relative block aspect-[405/250] w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1280px) 405px, (min-width: 768px) 45vw, 100vw"
                      className={cn(
                        "object-cover transition-transform duration-300",
                        "group-hover:scale-105 motion-reduce:transform-none",
                      )}
                    />
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn("h-1 w-10 rounded-[2px]", tone.accentBg)}
                    />
                    {item.badge ? <Badge tone="placeholder">{item.badge}</Badge> : null}
                  </span>
                  <h3
                    className={cn(
                      type.h4,
                      "text-text-heading transition-colors duration-150",
                      "group-hover:text-text-brand",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className={cn(type.body, "text-text-body")}>{item.description}</p>
                  <span className="text-ui-label-large text-text-heading flex items-center gap-2">
                    {content.linkLabel}
                    <Icon
                      name="arrow-right"
                      size={20}
                      className={cn(
                        "transition-transform duration-150",
                        "group-hover:translate-x-1 motion-reduce:transform-none",
                        tone.label,
                      )}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
