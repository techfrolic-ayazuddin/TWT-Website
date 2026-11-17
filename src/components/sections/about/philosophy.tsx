import Image from "next/image";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { philosophy } from "@/content/about";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/**
 * 05 · People-first philosophy — Figma `54:220` (1440 × 880,
 * `background/brand`).
 */
export function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="bg-background-brand relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="contour-dark-1px"
          x={-40}
          y={-60}
          w={1520}
          h={1000}
          opacity={0.9}
        />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "tablet:gap-14 desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-10",
        )}
      >
        {/* Figma `Image · arch` — 520 × 640, radius 260/260/32/32. The crop is
            the Figma fill transform: 54.2% of the photo's width, starting
            15.1% in, matched by eye against the Figma render (one-off crop value,
            CLAUDE.md §3.1). */}
        <div className="desktop:mx-0 desktop:w-130 desktop:shrink-0 mx-auto aspect-[520/640] w-full max-w-130 overflow-hidden rounded-t-[999px] rounded-b-2xl">
          <Image
            src={philosophy.image.src}
            alt={philosophy.image.alt}
            width={philosophy.image.width}
            height={philosophy.image.height}
            sizes="(min-width: 768px) 520px, 92vw"
            className="size-full object-cover object-[52%_50%]"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <SectionHeading
            id="philosophy-title"
            tone="dark"
            eyebrow={philosophy.eyebrow}
            title={philosophy.title}
            description={philosophy.description}
          />

          <ol className="flex flex-col gap-6">
            {philosophy.steps.map((step, i) => (
              <li key={step.title} className="flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className="bg-surface-default text-text-brand text-ui-label-large grid size-12 shrink-0 place-items-center rounded-full"
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-0.5">
                  <h3 className={cn(type.h4, "text-text-inverse")}>{step.title}</h3>
                  <p className={cn(type.body, "text-text-inverse-muted")}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
