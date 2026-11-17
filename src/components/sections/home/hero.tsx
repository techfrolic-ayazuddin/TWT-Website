import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { CtaButton } from "@/components/consultation/cta-button";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow } from "../section-heading";

/**
 * 01 · Hero — Figma `46:140` (1440 × 864, padding 64/80/120/80).
 *
 * Headline: Figma `Hero/Animated Headline`, a six-step Smart Animate chain.
 * Each block fades in while rising inside its own clipping mask, with
 * `cubic-bezier(0.16, 1, 0.3, 1)`:
 *
 *   step  block       starts   duration  rise
 *   0→1   line 1       300ms    500ms    56px
 *   1→2   line 2       850ms    500ms    56px   (prev end + 50ms)
 *   2→3   line 3      1400ms    500ms    56px   (prev end + 50ms)
 *   3→4   statement   2250ms    600ms    28px   (prev end + 350ms)
 *   4→5   support     3200ms    600ms    20px   (prev end + 350ms)
 *
 * Pure CSS (`.hero-rise` in globals.css) — no client JS, so this stays a
 * Server Component. Under `prefers-reduced-motion` the animation is removed
 * and the complete Step 5 state shows immediately.
 */

const rise = (delay: number, duration: number, y: number) =>
  ({
    "--hero-delay": `${delay}ms`,
    "--hero-dur": `${duration}ms`,
    "--hero-y": `${y}px`,
  }) as CSSProperties;

const LINE_STARTS = [300, 850, 1400];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light" x={520} y={-120} w={1040} h={1000} />
        <Glow x={760} y={-60} w={760} h={760} opacity={0.6} />
        <Pattern
          name="symbol-watermark-light"
          x={640}
          y={260}
          w={1010}
          h={597}
          opacity={0.9}
          className="desktop:block hidden"
        />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-14 px-(--page-margin) pt-10 pb-16",
          "tablet:pt-14 tablet:pb-24",
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-10 desktop:pt-16 desktop:pb-30",
        )}
      >
        {/* ------------------------------------------------ Hero copy */}
        <div className="desktop:w-150 desktop:shrink-0 flex flex-col gap-8">
          <Eyebrow size="lg">{hero.eyebrow}</Eyebrow>

          <div>
            <h1
              id="hero-title"
              // Client instruction (Phase 5.2): this heading alone is capped at
              // 64px on desktop — 64/72, keeping the Display/Hero tracking and
              // weight from the tablet step. The global `Desktop/Display/Hero`
              // token stays at Figma’s 72/80 for every other page.
              className="text-mobile-heading-h1 tablet:text-tablet-display-hero text-text-heading desktop:text-[4rem]/[4.5rem]"
            >
              {hero.headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <span className="hero-rise block" style={rise(LINE_STARTS[i], 500, 56)}>
                    {line}{" "}
                  </span>
                </span>
              ))}
            </h1>

            <p className={cn(type.h4, "text-text-brand mt-6 overflow-hidden pb-1")}>
              <span className="hero-rise block" style={rise(2250, 600, 28)}>
                {hero.statement}
              </span>
            </p>

            <p
              className={cn(
                type.bodyLargeStrong,
                "text-text-body mt-5 overflow-hidden pb-2",
              )}
            >
              <span className="hero-rise block" style={rise(3200, 600, 20)}>
                {hero.support}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <CtaButton link={hero.primaryCta} size="large" trailingIcon="arrow-right" />
            <Button asChild size="large" variant="outline">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>

          <div className="border-border-subtle flex flex-col gap-2.5 border-t pt-6">
            <p className="text-ui-overline text-text-muted">{hero.sectorProof.label}</p>
            {/* Client instruction: the sector list is capped at 14px. Uses the
                14/22 `Body/Small` step at every width rather than the 15px
                tablet/desktop steps, so tablet never exceeds desktop. */}
            <ul className="text-mobile-body-small text-text-heading flex flex-wrap gap-x-2">
              {hero.sectorProof.sectors.map((sector, i) => (
                <li key={sector} className="flex gap-x-2">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------- Hero visual */}
        <div className="desktop:mx-0 relative mx-auto aspect-[600/680] w-full max-w-150 min-w-0 flex-1">
          {/* Figma `Image · arch 13:16` — 520 × 680 inside the 600 stage,
              radius 260/260/32/32. Percentages keep the arch true when the
              stage scales below 600. */}
          <div className="absolute inset-y-0 right-0 w-[86.667%] overflow-hidden rounded-t-[999px] rounded-b-2xl">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              priority
              sizes="(min-width: 1280px) 520px, 90vw"
              className="size-full object-cover"
            />
          </div>

          {/* Figma `Kaizen card` — 320 wide at (0, 456) of the 680 stage. Below
              tablet the stage is too short for that offset (the card would run
              past the section), so it anchors to the stage's bottom edge. */}
          <div className="bg-surface-default shadow-elevation-3 tablet:top-[67%] tablet:bottom-auto absolute -bottom-6 left-0 flex w-[min(20rem,78%)] flex-col gap-3 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary-default text-text-on-primary grid size-10 shrink-0 place-items-center rounded-full">
                <Icon name={hero.card.icon} size={20} />
              </span>
              <p className="text-ui-label-large text-text-heading">{hero.card.title}</p>
            </div>
            <p className="text-desktop-body-small text-text-body">{hero.card.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
