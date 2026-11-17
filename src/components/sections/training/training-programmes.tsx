import Image from "next/image";
import { Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { Icon, type IconName } from "@/components/ui/icon";
import {
  programmesSection,
  registrationSteps,
  trainingFacts,
  trainingProgrammes,
  winterFormat,
  type TrainingProgramme,
} from "@/content/training-programs";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { RegisterButton } from "../home/registration-dialog";
import { HUE } from "../hues";
import { SectionHeading, sectionFrame } from "../section-heading";

/**
 * 03 · Programmes — Figma `03 · Programmes` (1440 × 2816,
 * `background/subtle`; padding 120/80, gap 120).
 *
 * Spring, Summer and Autumn share one layout — a 560 × 480 photograph beside
 * 624 of copy, 96 apart, alternating sides. Winter Forum is the featured dark
 * card. Each "Register your interest" opens the shared registration overlay
 * with its programme preselected.
 *
 * Figma values off the token scale, mapped to the nearest step (reported):
 * fact labels Bold 12/16 → `UI/Overline`; fact values Bold 16/22 →
 * `UI/Label/Large`; Winter topic Bold 52/60 → `Heading/H1`; Winter card
 * radius 40 and image radius 28 → `radius/2xl`.
 */

/** Spring's photograph is cropped to its upper band in Figma (fill transform). */
const IMAGE_POSITION: Partial<Record<TrainingProgramme["id"], string>> = {
  spring: "object-[50%_24%]",
};

function Index({ p, dark = false }: { p: TrainingProgramme; dark?: boolean }) {
  return (
    <p className="flex items-center gap-3">
      <span aria-hidden="true" className={cn("h-1 w-6 rounded-[2px]", HUE[p.hue].bar)} />
      <span
        className={cn("text-ui-overline", dark ? "text-accent-yellow" : HUE[p.hue].label)}
      >
        {p.index} · {p.name} · {p.range}
      </span>
    </p>
  );
}

type Fact = { icon?: IconName; label: string; value: string; highlight?: boolean };

function Facts({
  facts,
  p,
  dark = false,
}: {
  facts: Fact[];
  p: TrainingProgramme;
  dark?: boolean;
}) {
  return (
    <dl
      className={cn(
        "tablet:flex-row tablet:gap-0 flex flex-col gap-4 border-y py-5",
        dark ? "border-border-inverse" : "border-border-subtle",
      )}
    >
      {facts.map((fact, i) => (
        // A <dl> may contain only ONE level of <div> around its <dt>/<dd>
        // pairs. The icon therefore sits in a grid column beside them rather
        // than in a second wrapper, which keeps the Figma layout (icon left,
        // label above value) and the list valid. Phase 7 fix.
        <div
          key={fact.label}
          className={cn(
            "grid flex-1 grid-cols-[auto_1fr] items-start gap-x-2.5 gap-y-1",
            i > 0 && "tablet:px-5",
            i === 0 && "tablet:pr-5",
          )}
        >
          {fact.icon ? (
            <Icon
              name={fact.icon}
              size={18}
              aria-hidden="true"
              className={cn("col-start-1 row-span-2 mt-px shrink-0", HUE[p.hue].label)}
            />
          ) : null}
          <dt
            className={cn(
              "text-ui-overline col-start-2",
              dark ? "text-text-inverse-muted" : "text-text-muted",
            )}
          >
            {fact.label}
          </dt>
          <dd
            className={cn(
              "text-ui-label-large col-start-2",
              fact.highlight
                ? "text-accent-yellow"
                : dark
                  ? "text-text-inverse"
                  : "text-text-heading",
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ProgrammeRow({ p, reverse }: { p: TrainingProgramme; reverse: boolean }) {
  const facts: Fact[] = [
    { icon: "calendar", label: trainingFacts.period, value: p.period },
    { icon: "globe", label: trainingFacts.delivery, value: trainingFacts.deliveryValue },
    { icon: "info", label: trainingFacts.dates, value: trainingFacts.datesValue },
  ];

  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className={cn(
        "tablet:gap-14 desktop:items-center desktop:gap-24 flex scroll-mt-6 flex-col gap-8",
        reverse ? "desktop:flex-row-reverse" : "desktop:flex-row",
      )}
    >
      <div className="desktop:w-140 desktop:shrink-0 aspect-[560/480] w-full overflow-hidden rounded-2xl">
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={1120}
          height={960}
          sizes="(min-width: 1280px) 560px, 92vw"
          className={cn("size-full object-cover", IMAGE_POSITION[p.id])}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <Index p={p} />
        <h3 id={`${p.id}-title`} className={cn(type.h2, "text-text-heading")}>
          {p.topic}
        </h3>
        <p className={cn(type.bodyLarge, "text-text-body")}>{p.description}</p>
        <Facts facts={facts} p={p} />
        <div className="flex flex-col gap-3">
          <p className="text-ui-overline text-text-muted">{trainingFacts.audience}</p>
          <ul className="flex flex-wrap gap-2">
            {p.audience.map((a) => (
              <li key={a} className="flex">
                <Badge tone={HUE[p.hue].badge}>{a}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-2">
          <RegisterButton
            appearance="button"
            programmeId={p.id}
            programmeName={p.name}
            showArrow={false}
          >
            {programmesSection.registerLabel}
          </RegisterButton>
        </div>
      </div>
    </article>
  );
}

/** Figma `Programme · Winter Forum (featured)` — 1280 × 764, padding 64, gap 64. */
function WinterForum({ p }: { p: TrainingProgramme }) {
  const facts: Fact[] = [
    { label: trainingFacts.period, value: p.period },
    { label: trainingFacts.delivery, value: trainingFacts.deliveryValue },
    { label: trainingFacts.dates, value: trainingFacts.datesValue },
    { label: trainingFacts.audience, value: p.audience.join(", "), highlight: true },
  ];

  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className={cn(
        "bg-background-inverse relative flex scroll-mt-6 flex-col gap-10 overflow-hidden rounded-2xl p-6",
        "tablet:p-12 desktop:flex-row desktop:items-stretch desktop:gap-16 desktop:p-16",
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Pattern
          name="contour-dark-1px"
          x={-200}
          y={-100}
          w={1520}
          h={856}
          opacity={0.85}
        />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col gap-6">
        <Index p={p} dark />
        <h3 id={`${p.id}-title`} className={cn(type.h1, "text-text-inverse")}>
          {p.topic}
        </h3>
        <p className={cn(type.bodyLarge, "text-text-inverse-muted")}>{p.description}</p>

        <ul className="tablet:grid-cols-3 grid grid-cols-1 gap-4">
          {winterFormat.map((item) => (
            <li
              key={item.label}
              className="bg-inverse-ghost-hover border-border-inverse flex flex-col gap-3.5 rounded-lg border p-5"
            >
              <span
                aria-hidden="true"
                className="bg-accent-yellow text-text-on-yellow grid size-10 place-items-center rounded-full"
              >
                <Icon name={item.icon} size={18} />
              </span>
              <span className="flex flex-col gap-3.5">
                <span className="text-ui-overline text-text-inverse-muted">
                  {item.label}
                </span>
                <span className="text-ui-button-large text-text-inverse">
                  {item.value}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Facts facts={facts} p={p} dark />

        <div className="pt-2">
          <RegisterButton
            appearance="button"
            tone="inverse"
            showArrow={false}
            programmeId={p.id}
            programmeName={p.name}
          >
            {programmesSection.registerLabel}
          </RegisterButton>
        </div>
      </div>

      <div className="desktop:aspect-auto desktop:w-110 desktop:shrink-0 relative aspect-[440/400] w-full overflow-hidden rounded-2xl">
        <Image
          src={p.image.src}
          alt={p.image.alt}
          fill
          sizes="(min-width: 1280px) 440px, 92vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}

export function TrainingProgrammes() {
  const regular = trainingProgrammes.filter((p) => p.id !== "winter");
  const winter = trainingProgrammes.find((p) => p.id === "winter");

  return (
    <section
      id="programmes"
      aria-label={programmesSection.title}
      className="bg-background-subtle relative scroll-mt-[calc(1.5rem_-_var(--section-y))]"
    >
      <div
        className={cn(sectionFrame, "tablet:gap-24 desktop:gap-30 flex flex-col gap-16")}
      >
        {regular.map((p, i) => (
          <ProgrammeRow key={p.id} p={p} reverse={i % 2 === 1} />
        ))}
        {winter ? <WinterForum p={winter} /> : null}
      </div>
    </section>
  );
}

/**
 * 04 · How registration works — Figma `04 · How registration works`
 * (1440 × 712, `background/page`). Step titles are Bold 22/28 in Figma
 * (`Tablet/Heading/H4` 22/30 is the nearest step).
 */
export function TrainingRegistrationSteps() {
  return (
    <section
      aria-labelledby="training-steps-title"
      className="bg-background-page relative"
    >
      <div className={cn(sectionFrame, "tablet:gap-14 flex flex-col gap-10")}>
        <SectionHeading
          id="training-steps-title"
          align="center"
          eyebrow={registrationSteps.eyebrow}
          title={registrationSteps.title}
          description={registrationSteps.description}
          className="mx-auto max-w-190"
        />
        <ol className="desktop:grid-cols-3 grid grid-cols-1 gap-6">
          {registrationSteps.steps.map((step, i) => (
            <li
              key={step.title}
              className="bg-background-subtle border-border-subtle flex flex-col gap-3.5 rounded-xl border p-8"
            >
              <span
                aria-hidden="true"
                className="text-mobile-stat-number text-text-brand"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-tablet-heading-h4 text-text-heading">{step.title}</h3>
              <p className="text-mobile-body-regular text-text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
