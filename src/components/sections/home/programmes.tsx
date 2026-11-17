import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Badge } from "@/components/ui/badge";
import { TextLink } from "@/components/ui/text-link";
import {
  programmes,
  programmesSection as homeProgrammesSection,
  type Programme,
  type ProgrammesSectionContent,
} from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow, sectionFrame } from "../section-heading";
import { RegisterButton } from "./registration-dialog";

/**
 * 06 · Training Programs — Figma `48:312` (1440 × 1426, `background/page`).
 * The Figma layer is still named "06 · Newsletters"; its content is the four
 * client-confirmed seasonal programmes (CLAUDE.md §6.1).
 *
 * Cover rotations, offsets and the pattern placement inside the covers are
 * one-off artwork values read from Figma — legitimate token exceptions
 * (CLAUDE.md §3.1), expressed as percentages of the 520 × 660 stage and the
 * 420 × 560 cover so the composition scales intact below desktop.
 */

const gradient = { backgroundImage: "var(--gradient-violet-deep)" };

function Bars({ className, gap = "gap-1" }: { className: string; gap?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex", gap)}>
      <span className={cn("bg-secondary-default", className)} />
      <span className={cn("bg-accent-orange", className)} />
      <span className={cn("bg-accent-yellow", className)} />
    </span>
  );
}

/**
 * Figma `BG · Pattern` inside a cover: at (-189, 140), 798 × 443 on the
 * 420 × 560 cover and (-67, 50), 285 × 158 on the 150 × 200 one — the same
 * proportions, so one set of percentages serves both. The covers hide the
 * pattern's three figure dots, hence the `-plain` orbit-arcs file.
 */
function CoverPattern({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={798}
      height={443}
      unoptimized
      className="absolute max-w-none"
      style={{ left: "-45%", top: "25%", width: "190%", height: "79.1%" }}
    />
  );
}

/** The cover’s nameplate text — see `coverNameplate` in the content type. */
const nameplateOf = (programme: Programme, content: ProgrammesSectionContent) =>
  content.coverNameplate === "season" ? programme.season : programme.nameplate;

/** Figma `Cover / Large` — 420 × 560, radius 24, padding 32. */
function LargeCover({
  content,
  programme,
  nameplateClass,
  className,
  style,
}: {
  content: ProgrammesSectionContent;
  programme: Programme;
  nameplateClass: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "tablet:p-8 absolute flex aspect-[420/560] w-[80.77%] origin-top-left flex-col justify-between overflow-hidden rounded-xl p-5",
        className,
      )}
      style={{ ...gradient, ...style }}
    >
      <CoverPattern src="/decor/orbit-arcs-dark-plain.svg" />
      <div className="relative flex flex-col items-start gap-2.5">
        <Bars className="h-[5px] w-5.5 rounded-[3px]" />
        <span className="text-ui-overline text-text-inverse-muted">
          {content.masthead}
        </span>
        <span className={cn(nameplateClass, "text-text-inverse")}>
          {nameplateOf(programme, content)}
        </span>
        <span className="text-ui-label-large text-accent-yellow">{programme.kind}</span>
      </div>
      <div className="relative flex flex-col gap-3">
        <span className={cn(type.h3, "text-text-inverse")}>{programme.topic}</span>
        <span className="text-ui-overline text-text-inverse-muted">
          {programme.months.join(" · ")}
        </span>
      </div>
    </div>
  );
}

/** Figma `Cover / Small` — 150 × 200, radius 12, padding 14. */
function SmallCover({
  content,
  programme,
}: {
  content: ProgrammesSectionContent;
  programme: Programme;
}) {
  return (
    <div
      aria-hidden="true"
      className="tablet:w-37.5 relative flex aspect-[150/200] w-30 shrink-0 flex-col justify-between self-start overflow-hidden rounded-md p-3.5"
      style={gradient}
    >
      <CoverPattern src="/decor/contour-dark.svg" />
      <div className="relative flex flex-col items-start gap-1">
        <Bars className="h-[3px] w-2.5 rounded-[2px]" gap="gap-0.5" />
        <span
          className={cn(
            "text-text-inverse whitespace-nowrap",
            // The homepage string is unchanged. The season-only nameplate is
            // Figma’s Bold 20/28 (`Mobile/Heading/H4`) at every width.
            content.coverNameplate === "season"
              ? "text-mobile-heading-h4"
              : "text-ui-label-large tablet:text-mobile-heading-h5",
          )}
        >
          {nameplateOf(programme, content)}
        </span>
        <span className="text-ui-caption text-accent-yellow">{programme.kind}</span>
      </div>
      <span className="text-ui-label-regular text-text-inverse relative">
        {programme.topic}
      </span>
    </div>
  );
}

function ProgrammeCard({
  content,
  programme,
}: {
  content: ProgrammesSectionContent;
  programme: Programme;
}) {
  return (
    <li className="flex gap-5">
      <SmallCover content={content} programme={programme} />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <p className="text-ui-overline text-text-brand">
          {programme.name} · {programme.months.join(" · ")}
        </p>
        <h4 className={cn(type.h4, "text-text-heading")}>{programme.topic}</h4>
        {programme.panel ? (
          <p className={cn(type.bodySmall, "text-text-body")}>{programme.panel}</p>
        ) : null}
        <p className={cn(type.bodySmall, "text-text-body")}>{programme.audience}</p>
        <Badge tone="brand">{programme.format}</Badge>
        <p className="text-ui-caption text-text-warning">
          {content.cardLogistics === "programme"
            ? programme.logistics
            : content.cardLogistics}
        </p>
        <RegisterButton
          appearance="link"
          programmeId={programme.id}
          programmeName={programme.name}
        >
          {content.registerLabel}
        </RegisterButton>
      </div>
    </li>
  );
}

export function Programmes({
  content = homeProgrammesSection,
}: {
  /** Defaults to the homepage copy; the Industries page passes its own. */
  content?: ProgrammesSectionContent;
}) {
  const programmesSection = content;
  const [featured, next, ...rest] = programmes;
  const labels = programmesSection.detailLabels;

  const rowData = {
    season: { value: featured.season, sample: false },
    months: { value: featured.months.join(", "), sample: false },
    format: { value: featured.format, sample: false },
    // Venue and Date & time are sample details (CLAUDE.md §6.1) — Figma sets
    // them in `text/body` rather than `text/heading`, with room for a
    // (currently undrawn) sample badge.
    venue: { value: featured.venue, sample: true },
    dateTime: { value: featured.dateTime, sample: true },
    // "To be announced" — in `text/body`, but no badge slot is reserved.
    dates: { value: programmesSection.datesValue, sample: false, muted: true },
  };
  const details = programmesSection.detailRows.map((key) => ({
    label: labels[key],
    ...rowData[key],
  }));

  return (
    <section
      aria-labelledby="programmes-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light" x={640} y={-40} w={900} h={760} />
        <Glow x={-180} y={0} w={820} h={820} opacity={0.6} />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-12")}>
        <div className="tablet:gap-14 desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-10">
          {/* Cover stage — decorative; every fact on it is repeated in the copy. */}
          <div
            aria-hidden="true"
            className="desktop:mx-0 desktop:w-130 desktop:shrink-0 relative mx-auto aspect-[520/660] w-full max-w-130"
          >
            <LargeCover
              programme={next}
              content={programmesSection}
              nameplateClass={type.hero}
              className="shadow-elevation-3 top-[5.15%] left-[21.15%]"
              style={{ transform: "rotate(6deg)" }}
            />
            <LargeCover
              programme={featured}
              content={programmesSection}
              nameplateClass={type.h1}
              className="shadow-elevation-4 top-[10.6%] left-[3.85%]"
              style={{ transform: "rotate(-2.5deg)" }}
            />
            <Badge
              tone="placeholder"
              className="tablet:right-auto tablet:left-[63.46%] absolute top-[11.97%] right-0 origin-top-left"
              style={{ transform: "rotate(0deg)" }}
            >
              {featured.format}
            </Badge>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-5.5">
            <Eyebrow size="lg">{programmesSection.eyebrow}</Eyebrow>
            <h2 id="programmes-title" className={cn(type.hero, "text-text-heading")}>
              {programmesSection.title}
            </h2>
            <span aria-hidden="true" className="bg-text-heading h-0.5 w-full" />
            <p className="text-ui-overline text-text-brand">
              {featured.name} · {featured.months.join(" · ")} · {featured.format}
            </p>
            <h3 className={cn(type.h2, "text-text-heading")}>{featured.topic}</h3>
            <p className={cn(type.bodyLarge, "text-text-body")}>{featured.audience}</p>

            <div className="w-full">
              <p className="text-ui-overline text-text-muted pb-2">
                {programmesSection.detailsLabel}
              </p>
              <dl>
                {details.map((row) => (
                  <div
                    key={row.label}
                    className={cn(
                      "border-border-default flex items-center gap-4 border-t py-3",
                      // Figma reserves a 28px `Sample badge` slot (currently
                      // not drawn) in these rows, making them 53px minimum.
                      row.sample && "min-h-13.25",
                    )}
                  >
                    <dt className="text-ui-overline text-text-brand w-27.5 shrink-0">
                      {row.label}
                    </dt>
                    <dd
                      className={cn(
                        "text-ui-label-large min-w-0 flex-1",
                        // 302px: the value column Figma leaves beside that slot.
                        row.sample
                          ? "text-text-body desktop:max-w-75.5"
                          : "muted" in row && row.muted
                            ? "text-text-body"
                            : "text-text-heading",
                      )}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <RegisterButton
                appearance="button"
                programmeId={featured.id}
                programmeName={featured.name}
              >
                {programmesSection.registerLabel}
              </RegisterButton>
              {programmesSection.browse ? (
                <TextLink asChild icon="arrow-right" className="-mx-1">
                  <Link href={programmesSection.browse.href}>
                    {programmesSection.browse.label}
                  </Link>
                </TextLink>
              ) : null}
            </div>
          </div>
        </div>

        <div className="border-border-default flex flex-col gap-6 border-t pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-ui-overline text-text-muted">
              {programmesSection.moreLabel}
            </p>
            <TextLink asChild icon="arrow-right" className="-mx-1 -my-0.5">
              <Link href={programmesSection.archive.href}>
                {programmesSection.archive.label}
              </Link>
            </TextLink>
          </div>
          <ul className="desktop:grid-cols-3 grid grid-cols-1 gap-8">
            {[next, ...rest].map((programme) => (
              <ProgrammeCard
                key={programme.id}
                content={programmesSection}
                programme={programme}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
