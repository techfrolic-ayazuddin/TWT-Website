import Image from "next/image";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { careersHero, careersSide } from "@/content/careers";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { Eyebrow } from "../section-heading";

/**
 * 01 · Page hero — Figma `G · Careers — Desktop` → `01 · Page hero`
 * (1440 × 816, `background/inverse`; padding 96/80/120/80, gap 96).
 */
export function CareersHero() {
  const { valuesCard } = careersHero;

  return (
    <section
      aria-labelledby="careers-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="flow-lines-dark-1px"
          x={-40}
          y={40}
          w={1520}
          h={760}
          opacity={0.8}
        />
        <Glow x={820} y={-200} w={820} h={820} opacity={0.8} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-14 px-(--page-margin) pt-12 pb-16",
          "tablet:pt-16 tablet:pb-24",
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-24 desktop:pt-24 desktop:pb-30",
        )}
      >
        <div className="desktop:w-161 desktop:shrink-0 flex flex-col items-start gap-7">
          <Breadcrumb items={careersHero.breadcrumb} tone="dark" />
          <Eyebrow size="lg" tone="dark">
            {careersHero.eyebrow}
          </Eyebrow>
          <h1
            id="careers-title"
            className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-inverse"
          >
            {careersHero.title}
          </h1>
          <p className={cn(type.bodyLarge, "text-text-inverse-muted")}>
            {careersHero.intro}
          </p>
          <Button asChild variant="inverse" size="large" trailingIcon="arrow-right">
            <a href={careersHero.cta.href}>{careersHero.cta.label}</a>
          </Button>
        </div>

        {/* Figma `Hero visual` — 540 × 600 stage: arch 460 × 600 at x 80
            (radius 230/230/32/32); `Values card` 300 wide at (0, 400). */}
        <div className="desktop:mx-0 relative mx-auto aspect-[540/600] w-full max-w-135 min-w-0 flex-1">
          <div className="absolute inset-y-0 right-0 w-[85.19%] overflow-hidden rounded-t-[999px] rounded-b-2xl">
            <Image
              src={careersHero.image.src}
              alt={careersHero.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 460px, 80vw"
              className="object-cover"
            />
          </div>
          <div className="bg-surface-default shadow-elevation-3 tablet:top-[66.67%] tablet:bottom-auto absolute -bottom-6 left-0 flex w-[min(18.75rem,80%)] flex-col gap-3 rounded-xl p-6">
            <p className="text-ui-overline text-text-brand">{valuesCard.label}</p>
            <ul className="flex flex-col gap-3">
              {valuesCard.values.map((value) => (
                <li key={value} className="flex items-center gap-2.5">
                  <Icon name="check" size={18} className="text-icon-brand shrink-0" />
                  <span className="text-ui-label-large text-text-heading">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figma `Side column` — 400 wide, gap 24. */
export function CareersSide() {
  const { include, values, questions } = careersSide;

  return (
    <aside
      aria-label={include.title}
      className="desktop:w-100 desktop:shrink-0 flex flex-col gap-6"
    >
      <div className="bg-surface-default border-border-subtle flex flex-col gap-3.5 rounded-2xl border p-8">
        <p className="text-ui-overline text-text-brand">{include.overline}</p>
        <h2 className={cn(type.h4, "text-text-heading")}>{include.title}</h2>
        <ul className="flex flex-col gap-3.5">
          {include.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Icon name="check" size={20} className="text-icon-brand mt-1 shrink-0" />
              <span className={cn(type.body, "text-text-body")}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-background-inverse relative flex flex-col gap-3.5 overflow-hidden rounded-2xl p-8">
        {/* Figma `BG · Flow lines` at (-200, -40), 840 × 420, 80%. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Pattern
            name="flow-lines-dark-1px"
            x={-200}
            y={-40}
            w={840}
            h={420}
            opacity={0.8}
          />
        </div>
        <p className="text-ui-overline text-accent-yellow relative">{values.overline}</p>
        <h2 className={cn(type.h4, "text-text-inverse relative")}>{values.title}</h2>
        <ul className="relative flex flex-wrap gap-2">
          {values.chips.map((chip) => (
            <li key={chip} className="flex">
              <Badge tone="inverse">{chip}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-ui-label-regular text-text-brand flex items-center gap-2">
        <Icon name="mail" size={18} className="text-icon-brand shrink-0" />
        <span>
          {questions.lead}{" "}
          <a
            href={`mailto:${questions.email}`}
            className="hover:text-text-brand-strong focus-visible:shadow-focus-ring rounded-xs hover:underline focus-visible:outline-none"
          >
            {questions.email}
          </a>
        </span>
      </p>
    </aside>
  );
}
