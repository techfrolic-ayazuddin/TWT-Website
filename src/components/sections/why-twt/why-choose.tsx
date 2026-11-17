import Image from "next/image";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { whyChoose } from "@/content/why-twt";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow, sectionFrame } from "../section-heading";

/**
 * 03 · Why organisations choose TWT — Figma `108:5213` (1440 × 1764,
 * `background/subtle`, gap 56).
 *
 * `Anchor mosaic`: two rows of two cards, 24px apart — 760 + 496 (540 high)
 * then 496 + 760 (480 high). Every card: radius 32, padding 44.
 */

const card = "relative flex flex-col overflow-hidden rounded-2xl p-7 tablet:p-11";
const numeral = cn(type.hero, "block");

/**
 * Photo card — the photograph under Figma's two paint styles:
 * `Overlay/Violet wash` (solid violet at 72%) then `Overlay/Navy scrim`.
 */
function PhotoCard({
  image,
  className,
  children,
}: {
  image: { src: string; alt: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={cn(card, "justify-end gap-3.5", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 760px, 92vw"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: "var(--overlay-violet-wash)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "var(--overlay-navy-scrim)" }}
      />
      {children}
    </li>
  );
}

export function WhyChoose() {
  const { continuity, capability, human, sectors, note } = whyChoose;

  return (
    <section
      aria-labelledby="why-choose-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <div className={cn(sectionFrame, "tablet:gap-14 flex flex-col gap-10")}>
        {/* Two-tone statement: a muted context line, then the commitment. */}
        {/* Figma `Statement`: 820 + 360, spread apart. The statement column is
            816 rather than 820 so the context line breaks after "and the", as
            in Figma — sub-pixel text-width rounding otherwise keeps "change" on
            the first line. */}
        <div className="desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-20 flex flex-col gap-8">
          <div className="desktop:w-204 desktop:shrink-0 flex flex-col gap-4">
            <Eyebrow size="lg">{whyChoose.eyebrow}</Eyebrow>
            <h2 id="why-choose-title" className="flex flex-col gap-4">
              <span className={cn(type.h2, "text-text-muted")}>
                {whyChoose.contextLine}
              </span>
              <span className={cn(type.h1, "text-text-heading")}>
                {whyChoose.commitmentLine}
              </span>
            </h2>
          </div>
          <p
            className={cn(type.bodyLarge, "text-text-body desktop:w-90 desktop:shrink-0")}
          >
            {whyChoose.intro}
          </p>
        </div>

        <ol className="flex flex-col gap-6">
          <li className="contents">
            <ol className="desktop:grid-cols-[760fr_496fr] grid grid-cols-1 gap-6">
              <PhotoCard image={continuity.image} className="desktop:min-h-135 min-h-100">
                <span
                  aria-hidden="true"
                  className={cn(numeral, "text-accent-yellow relative")}
                >
                  01
                </span>
                <h3 className={cn(type.h3, "text-text-inverse relative max-w-140")}>
                  {continuity.title}
                </h3>
                <p
                  className={cn(
                    type.body,
                    "text-text-inverse relative max-w-135 opacity-90",
                  )}
                >
                  {continuity.text}
                </p>
              </PhotoCard>

              <li
                className={cn(
                  card,
                  "bg-background-brand desktop:min-h-135 justify-between gap-10",
                )}
              >
                {/* Figma `Decor/Symbol Watermark` (Tone=On brand) at (140, 300);
                    exported already clipped to the card, with its 35% opacity. */}
                <Image
                  src="/decor/symbol-watermark-on-brand.svg"
                  alt=""
                  width={356}
                  height={240}
                  unoptimized
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 max-w-none"
                />
                <div className="relative flex flex-col gap-3">
                  <span aria-hidden="true" className={cn(numeral, "text-accent-yellow")}>
                    02
                  </span>
                  <p className={cn(type.h2, "text-text-inverse")}>{capability.pull}</p>
                </div>
                <div className="relative flex flex-col gap-2.5">
                  <h3 className="text-ui-overline text-text-inverse-muted">
                    {capability.label}
                  </h3>
                  <p className={cn(type.body, "text-text-inverse")}>{capability.text}</p>
                </div>
              </li>
            </ol>
          </li>

          <li className="contents">
            <ol className="desktop:grid-cols-[496fr_760fr] grid grid-cols-1 gap-6">
              <li
                className={cn(
                  card,
                  "bg-surface-default border-border-subtle desktop:min-h-120 justify-between gap-10 border",
                )}
              >
                <div className="flex items-start justify-between">
                  <span aria-hidden="true" className={cn(numeral, "text-text-brand")}>
                    03
                  </span>
                  <span className="border-primary-soft relative size-33 shrink-0 overflow-hidden rounded-full border-6">
                    {/* Crop: the subject's face sits ~30% across this landscape
                        photo, so a centred crop pushed him to the circle's
                        left edge. Anchoring the crop left puts the face at
                        ~45% — centred (one-off crop value, CLAUDE.md §3.1). */}
                    <Image
                      src={human.portrait.src}
                      alt={human.portrait.alt}
                      fill
                      sizes="132px"
                      className="object-cover object-[0%_50%]"
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className={cn(type.h3, "text-text-heading")}>{human.title}</h3>
                  <p className={cn(type.body, "text-text-body")}>{human.text}</p>
                </div>
              </li>

              <PhotoCard image={sectors.image} className="desktop:min-h-120 min-h-100">
                <span
                  aria-hidden="true"
                  className={cn(numeral, "text-accent-yellow relative")}
                >
                  04
                </span>
                <h3 className={cn(type.h3, "text-text-inverse relative max-w-140")}>
                  {sectors.title}
                </h3>
                <p
                  className={cn(
                    type.body,
                    "text-text-inverse relative max-w-135 opacity-90",
                  )}
                >
                  {sectors.text}
                </p>
                <ul className="relative flex max-w-155 flex-wrap gap-2">
                  {sectors.badges.map((badge) => (
                    <li key={badge} className="flex">
                      <Badge tone="inverse">{badge}</Badge>
                    </li>
                  ))}
                </ul>
              </PhotoCard>
            </ol>
          </li>
        </ol>

        <div
          className={cn(
            "bg-surface-default border-l-primary-default flex flex-col gap-3 rounded-xl border-l-4 py-7 pr-10 pl-9",
            "tablet:flex-row tablet:items-center tablet:gap-8",
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
