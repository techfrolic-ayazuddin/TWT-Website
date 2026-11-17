import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { services, type Segment, type ServicePillar } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/**
 * 03 · Services — Figma `46:210` (1440 × 1831, `background/inverse`).
 *
 * This is the services design drawn in the canonical `Home — Desktop` frame.
 * The separate Design System `Service Portfolio` Variation 01 / 02 choice is
 * still an open client decision (CLAUDE.md §10 #9) and is not made here.
 *
 * Each pillar is monochromatic in its own segment hue, driven by the
 * `segment/{hue}/accent` tokens through the typed `segment` field.
 */

const ACCENT_TEXT: Record<Segment, string> = {
  violet: "text-segment-violet-accent",
  pink: "text-segment-pink-accent",
  orange: "text-segment-orange-accent",
  yellow: "text-segment-yellow-accent",
};

const ACCENT_BG: Record<Segment, string> = {
  violet: "bg-segment-violet-accent",
  pink: "bg-segment-pink-accent",
  orange: "bg-segment-orange-accent",
  yellow: "bg-segment-yellow-accent",
};

const pillarLink = cn(
  "text-ui-label-large text-text-inverse group/link inline-flex items-center gap-2 rounded-[6px]",
  "hover:underline focus-visible:shadow-focus-ring-on-dark focus-visible:underline focus-visible:outline-none",
);

function Pillar({ pillar }: { pillar: ServicePillar }) {
  const provisional = Boolean(pillar.badge);
  const titleId = `service-${pillar.number}`;

  return (
    <li
      className={cn(
        "bg-background-inverse-strong relative flex flex-col gap-7 overflow-hidden rounded-2xl p-6",
        "tablet:p-10",
        provisional
          ? "border-accent-yellow border-(length:--stroke-default)"
          : "border-border-inverse border",
      )}
    >
      {provisional ? (
        <>
          {/* Figma `Decor/Glow` — yellow, at (300, 280) of the 628-wide card. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Glow tone="yellow" x={300} y={280} w={520} h={520} opacity={0.4} />
          </div>
          <Badge
            tone="placeholder"
            className="tablet:top-10 tablet:right-10 absolute top-6 right-6"
          >
            {pillar.badge}
          </Badge>
        </>
      ) : null}

      <div className="relative flex flex-col gap-7">
        <p aria-hidden="true" className={cn(type.stat, ACCENT_TEXT[pillar.segment])}>
          {pillar.number}
        </p>
        <span
          aria-hidden="true"
          className={cn("h-1 w-12 rounded-[2px]", ACCENT_BG[pillar.segment])}
        />
        <h3 id={titleId} className={cn(type.h3, "text-text-inverse")}>
          {pillar.title}
        </h3>
        <p className={cn(type.body, "text-text-inverse-muted")}>{pillar.description}</p>
      </div>

      <div className="border-border-inverse relative flex flex-col gap-3.5 border-t pt-6">
        <p className="text-ui-overline text-text-inverse-muted">{pillar.modulesLabel}</p>
        <ul className="flex flex-col gap-3.5">
          {pillar.modules.map((module) => (
            <li key={module} className="flex items-start gap-3">
              <Icon
                name="check"
                size={20}
                className={cn("mt-0.5 shrink-0", ACCENT_TEXT[pillar.segment])}
              />
              <span className={cn(type.body, "text-text-inverse")}>{module}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Figma `Spacer` — fills the card, and is 17px in the tallest card of a row. */}
      <div aria-hidden="true" className="min-h-4.25 flex-1" />

      <div className="relative flex flex-wrap items-center gap-6">
        {pillar.enquire ? (
          <Button asChild variant="inverse" size="medium" trailingIcon="arrow-right">
            <Link href={pillar.enquire.href}>{pillar.enquire.label}</Link>
          </Button>
        ) : null}
        <Link href={pillar.link.href} className={pillarLink} aria-describedby={titleId}>
          {pillar.link.label}
          <Icon
            name="arrow-right"
            size={20}
            className={cn(
              "transition-transform duration-150 group-hover/link:translate-x-1",
              ACCENT_TEXT[pillar.segment],
            )}
          />
        </Link>
      </div>
    </li>
  );
}

export function Services() {
  return (
    <section
      aria-labelledby="services-title"
      className="bg-background-inverse relative overflow-hidden"
    >
      <DecorLayer>
        <Glow x={-320} y={-360} w={1000} h={1000} opacity={0.9} />
        <Pattern name="flow-lines-dark" x={-40} y={40} w={1520} h={820} opacity={0.9} />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <div className="desktop:flex-row desktop:items-center desktop:justify-between flex flex-col items-start gap-8">
          <SectionHeading
            id="services-title"
            tone="dark"
            eyebrow={services.eyebrow}
            title={services.title}
            description={services.description}
            className="max-w-180"
          />
          <Button asChild variant="inverse" size="medium" trailingIcon="arrow-right">
            <Link href={services.viewAll.href}>{services.viewAll.label}</Link>
          </Button>
        </div>

        <ul className="desktop:grid-cols-2 grid grid-cols-1 gap-6">
          {services.pillars.map((pillar) => (
            <Pillar key={pillar.number} pillar={pillar} />
          ))}
        </ul>
      </div>
    </section>
  );
}
