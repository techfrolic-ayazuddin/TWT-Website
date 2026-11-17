import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { positioning, visionMission } from "@/content/about";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/** 02 · Positioning — Figma `54:163` (1440 × 622, `background/subtle`). */
export function Positioning() {
  return (
    <section
      aria-labelledby="positioning-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="flow-lines-light-1px" x={-240} y={260} w={1100} h={520} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "tablet:gap-14 desktop:flex-row desktop:gap-24 flex flex-col gap-10",
        )}
      >
        <SectionHeading
          id="positioning-title"
          eyebrow={positioning.eyebrow}
          title={positioning.title}
          className="desktop:w-110 desktop:shrink-0"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <p className={cn(type.bodyLarge, "text-text-heading")}>{positioning.lead}</p>
          {positioning.paragraphs.map((paragraph) => (
            <p key={paragraph} className={cn(type.body, "text-text-body")}>
              {paragraph}
            </p>
          ))}
          {/* Figma `Pull quote` — 4px `primary/default` bar, `Quote/Large`. */}
          <p className="flex gap-6 pt-4">
            <span
              aria-hidden="true"
              className="bg-primary-default w-1 shrink-0 rounded-[2px]"
            />
            <span className={cn(type.quote, "text-text-brand")}>
              {positioning.pullQuote}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** 03 · Vision & mission — Figma `54:181` (1440 × 533, `background/inverse`). */
export function VisionMission() {
  const { vision, mission } = visionMission;
  const block = "border-border-inverse flex flex-1 flex-col gap-5 border-t pt-8";

  return (
    <section
      aria-label={visionMission.sectionLabel}
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern
          name="flow-lines-dark-1px"
          x={-40}
          y={-80}
          w={1520}
          h={693}
          opacity={0.7}
        />
        <Glow x={820} y={-300} w={900} h={900} opacity={0.8} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "tablet:gap-14 desktop:flex-row desktop:items-start desktop:gap-20 flex flex-col gap-12",
        )}
      >
        <div className={block}>
          <h2 className="text-ui-overline text-accent-yellow">{vision.label}</h2>
          <p className={cn(type.h3, "text-text-inverse")}>{vision.statement}</p>
        </div>
        <div className={block}>
          <h2 className="text-ui-overline text-accent-yellow">{mission.label}</h2>
          <p className={cn(type.h3, "text-text-inverse")}>{mission.statement}</p>
          <p className={cn(type.body, "text-text-inverse-muted")}>{mission.detail}</p>
        </div>
      </div>
    </section>
  );
}
