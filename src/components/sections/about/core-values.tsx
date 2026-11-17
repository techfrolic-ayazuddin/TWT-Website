import { DecorLayer, Pattern } from "@/components/decor/decor";
import { coreValues, differentiators, type Hue } from "@/content/about";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/** Static class strings so Tailwind can see every hue utility. */
const HUE_TEXT: Record<Hue, string> = {
  violet: "text-text-brand",
  pink: "text-secondary-default",
  orange: "text-accent-orange",
  yellow: "text-accent-yellow",
};

const HUE_BG: Record<Hue, string> = {
  violet: "bg-primary-default",
  pink: "bg-secondary-default",
  orange: "bg-accent-orange",
  yellow: "bg-accent-yellow",
};

const index = (i: number) => String(i + 1).padStart(2, "0");

/** 04 · Core values — Figma `54:189` (1440 × 1077, `background/page`). */
export function CoreValues() {
  return (
    <section aria-labelledby="core-values-title" className="bg-background-page relative">
      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <SectionHeading
          id="core-values-title"
          eyebrow={coreValues.eyebrow}
          title={coreValues.title}
          className="max-w-180"
        />

        <ol>
          {coreValues.values.map((value, i) => (
            <li
              key={value.title}
              className={cn(
                "border-border-default flex flex-col gap-3 border-t py-7",
                "tablet:py-9 desktop:flex-row desktop:gap-10",
              )}
            >
              <div className="desktop:contents flex items-baseline gap-5">
                <span
                  aria-hidden="true"
                  className={cn(type.h3, HUE_TEXT[value.hue], "desktop:w-20 shrink-0")}
                >
                  {index(i)}
                </span>
                <h3
                  className={cn(
                    type.h3,
                    "text-text-heading desktop:w-100 desktop:shrink-0",
                  )}
                >
                  {value.title}
                </h3>
              </div>
              <p className={cn(type.bodyLarge, "text-text-body min-w-0 flex-1")}>
                {value.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 06 · Differentiators — Figma `54:251` (1440 × 898, `background/page`). */
export function Differentiators() {
  const { note } = differentiators;

  return (
    <section
      aria-labelledby="differentiators-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="fine-grid-light-1px"
          x={200}
          y={-320}
          w={1040}
          h={820}
          opacity={0.9}
        />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <SectionHeading
          id="differentiators-title"
          align="center"
          eyebrow={differentiators.eyebrow}
          title={differentiators.title}
          description={differentiators.description}
          className="mx-auto max-w-180"
        />

        <ol className="tablet:grid-cols-2 tablet:gap-x-8 tablet:gap-y-12 desktop:grid-cols-4 grid grid-cols-1 gap-10">
          {differentiators.anchors.map((anchor, i) => (
            <li key={anchor.title} className="flex flex-col gap-4">
              <span
                aria-hidden="true"
                className={cn("h-1.5 w-14 rounded-[3px]", HUE_BG[anchor.hue])}
              />
              <span aria-hidden="true" className="text-ui-overline text-text-muted">
                {index(i)}
              </span>
              <h3 className={cn(type.h4, "text-text-heading")}>{anchor.title}</h3>
              <p className={cn(type.body, "text-text-body")}>{anchor.text}</p>
            </li>
          ))}
        </ol>

        <div
          className={cn(
            "bg-primary-soft flex flex-col gap-4 rounded-2xl p-6",
            "tablet:flex-row tablet:items-center tablet:gap-10 tablet:px-12 tablet:py-10",
          )}
        >
          <p className="text-ui-overline text-text-brand tablet:w-40 shrink-0">
            {note.label}
          </p>
          <p className={cn(type.bodyLarge, "text-text-heading")}>{note.text}</p>
        </div>
      </div>
    </section>
  );
}
