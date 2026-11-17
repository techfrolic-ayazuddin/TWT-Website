import Image from "next/image";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { CtaButton } from "@/components/consultation/cta-button";
import { Icon } from "@/components/ui/icon";
import { whyHero, whyPhilosophy } from "@/content/why-twt";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { Eyebrow, sectionFrame } from "../section-heading";
import { HUE } from "../hues";

/**
 * 01 · Page hero — Figma `108:5153` (1440 × 816, `background/inverse`;
 * padding 96/80/120/80, gap 80).
 */
export function WhyHero() {
  return (
    <section
      aria-labelledby="why-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="contour-dark-1px" x={-40} y={-40} w={1520} h={900} opacity={0.8} />
        <Glow x={760} y={-260} w={900} h={900} opacity={0.9} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-14 px-(--page-margin) pt-12 pb-16",
          "tablet:pt-16 tablet:pb-24",
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-20 desktop:pt-24 desktop:pb-30",
        )}
      >
        <div className="desktop:w-170 desktop:shrink-0 flex flex-col items-start gap-6">
          <Breadcrumb items={whyHero.breadcrumb} tone="dark" />
          <Eyebrow size="lg" tone="dark">
            {whyHero.eyebrow}
          </Eyebrow>
          <h1
            id="why-title"
            className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-inverse"
          >
            {whyHero.title}
          </h1>
          <p className={cn(type.h3, "text-accent-yellow")}>{whyHero.statement}</p>
          <p className={cn(type.bodyLargeStrong, "text-text-inverse")}>
            {whyHero.support}
          </p>
          <CtaButton
            link={whyHero.cta}
            variant="inverse"
            size="large"
            trailingIcon="arrow-right"
          />
        </div>

        {/* Figma `Hero visual` — 520 × 600 stage: arch 440 × 580 at x 80
            (radius 220/220/32/32), circle 190 at (0, 390) with an 8px ring in
            the section colour. Percentages keep it intact below desktop. */}
        <div className="desktop:mx-0 relative mx-auto aspect-[520/600] w-full max-w-130 min-w-0 flex-1">
          <div className="absolute top-0 right-0 h-[96.67%] w-[84.62%] overflow-hidden rounded-t-[999px] rounded-b-2xl">
            <Image
              src={whyHero.arch.src}
              alt={whyHero.arch.alt}
              fill
              priority
              sizes="(min-width: 768px) 440px, 80vw"
              className="object-cover"
            />
          </div>
          <div className="border-background-inverse absolute top-[64.33%] -left-[0.77%] aspect-square w-[38.08%] overflow-hidden rounded-full border-8">
            <Image
              src={whyHero.circle.src}
              alt={whyHero.circle.alt}
              fill
              sizes="190px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 02 · People-first philosophy — Figma `108:5180` (1440 × 946,
 * `background/page`).
 */
export function WhyPhilosophy() {
  const { kaizen } = whyPhilosophy;

  return (
    <section
      aria-labelledby="why-philosophy-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="flow-lines-light-1px"
          x={520}
          y={-60}
          w={1000}
          h={460}
          opacity={0.8}
        />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <div className="desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-24 flex flex-col gap-8">
          {/* 740 rather than Figma's 744: at 744 sub-pixel rounding keeps "the"
              on the first line, where Figma breaks after "through". */}
          <div className="desktop:w-185 desktop:shrink-0 flex flex-col gap-5">
            <Eyebrow size="lg">{whyPhilosophy.eyebrow}</Eyebrow>
            <h2 id="why-philosophy-title" className={cn(type.h1, "text-text-heading")}>
              {whyPhilosophy.title}
            </h2>
          </div>
          <p
            className={cn(
              type.bodyLarge,
              "text-text-body desktop:w-110 desktop:shrink-0",
            )}
          >
            {whyPhilosophy.intro}
          </p>
        </div>

        {/* Figma `Understand · Develop · Own` — hairline top and bottom, with
            hairline dividers between the three stages. */}
        <ol className="border-border-default desktop:grid-cols-[399fr_440fr_440fr] grid grid-cols-1 border-y">
          {whyPhilosophy.stages.map((stage, i) => (
            <li
              key={stage.word}
              className={cn(
                "border-border-default desktop:self-start flex flex-col gap-4 py-8",
                "tablet:py-12 desktop:pr-10",
                i > 0 && "desktop:border-t-0 desktop:border-l desktop:pl-10 border-t",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("text-ui-overline", HUE[stage.hue].label)}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={cn(type.hero, HUE[stage.hue].word)}>{stage.word}</h3>
              <p className={cn(type.body, "text-text-body")}>{stage.text}</p>
            </li>
          ))}
        </ol>

        <div className="bg-primary-soft tablet:items-center tablet:px-8 flex items-start gap-5 rounded-xl p-6">
          <span
            aria-hidden="true"
            className="bg-primary-default text-text-on-primary grid size-12 shrink-0 place-items-center rounded-full"
          >
            <Icon name="refresh" size={22} />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-ui-label-large text-text-heading">{kaizen.title}</p>
            <p className={cn(type.body, "text-text-body")}>{kaizen.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
