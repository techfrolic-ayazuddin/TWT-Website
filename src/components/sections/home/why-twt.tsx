import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { whyTwt } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/** 05 · Why TWT — Figma `48:263` (1440 × 1030, `background/inverse`). */
export function WhyTwt() {
  return (
    <section
      aria-labelledby="why-twt-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="contour-dark" x={-40} y={-60} w={1520} h={1150} opacity={0.9} />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <SectionHeading
          id="why-twt-title"
          tone="dark"
          eyebrow={whyTwt.eyebrow}
          title={whyTwt.title}
          description={whyTwt.description}
          className="max-w-180"
        />

        <ol className="tablet:grid-cols-2 tablet:gap-x-12 tablet:gap-y-14 grid grid-cols-1 gap-10">
          {whyTwt.anchors.map((anchor, i) => (
            <li
              key={anchor.title}
              className="border-border-inverse flex flex-col gap-4 border-t pt-8"
            >
              <h3 className={cn(type.h3, "flex gap-6")}>
                <span aria-hidden="true" className="text-accent-yellow shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-text-inverse">{anchor.title}</span>
              </h3>
              <p className={cn(type.body, "text-text-inverse-muted")}>{anchor.text}</p>
            </li>
          ))}
        </ol>

        <div className="bg-inverse-ghost-hover tablet:flex-row tablet:items-center tablet:px-8 flex flex-col gap-6 rounded-xl p-6">
          <p className="text-ui-overline text-text-inverse shrink-0">
            {whyTwt.valuesLabel}
          </p>
          <ul className="flex flex-wrap gap-3">
            {whyTwt.values.map((value) => (
              <li key={value} className="flex">
                <Badge tone="inverse">{value}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
