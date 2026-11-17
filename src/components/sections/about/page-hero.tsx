import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { aboutHero } from "@/content/about";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow } from "../section-heading";

/**
 * 01 · Page hero — Figma `54:146` (1440 × 1074; padding 64/80/120/80, gap 56).
 */
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light-1px" x={520} y={-200} w={1040} h={820} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-10 px-(--page-margin) pt-10 pb-16",
          "tablet:gap-14 tablet:pt-14 tablet:pb-24 desktop:pt-16 desktop:pb-30",
        )}
      >
        <nav aria-label="Breadcrumb">
          <ol className="text-ui-caption text-text-muted flex items-center gap-2">
            {aboutHero.breadcrumb.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-text-brand focus-visible:shadow-focus-ring rounded-xs transition-colors duration-150 focus-visible:outline-none"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Figma `Headline row` — headline 820 wide, intro 380 wide, bottom-aligned. */}
        <div className="desktop:flex-row desktop:items-end desktop:justify-between flex flex-col gap-8">
          <div className="desktop:w-205 desktop:shrink-0 flex flex-col gap-6">
            <Eyebrow size="lg">{aboutHero.eyebrow}</Eyebrow>
            <h1
              id="about-title"
              className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-heading"
            >
              {aboutHero.title}
            </h1>
          </div>
          <p
            className={cn(type.bodyLarge, "text-text-body desktop:w-95 desktop:shrink-0")}
          >
            {aboutHero.intro}
          </p>
        </div>

        {/* Figma `Image · 16:7 team portrait` — 1280 × 560, radius 32, with the
            caption card 400 wide, 32px from the right and 18px from the bottom.
            Below tablet the card would cover most of the photograph, so it
            sits under the image and overlaps its lower edge instead. */}
        <div className="relative">
          <div className="tablet:aspect-[1280/560] aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={aboutHero.image.src}
              alt={aboutHero.image.alt}
              width={aboutHero.image.width}
              height={aboutHero.image.height}
              priority
              sizes="(min-width: 1440px) 1280px, 92vw"
              className="size-full object-cover"
            />
          </div>
          <div
            className={cn(
              "bg-background-inverse relative mx-4 -mt-12 flex flex-col gap-2 rounded-xl p-7",
              "tablet:absolute tablet:right-8 tablet:bottom-4.5 tablet:mx-0 tablet:mt-0 tablet:w-100",
            )}
          >
            <p className="text-ui-overline text-accent-yellow">
              {aboutHero.caption.label}
            </p>
            <p className={cn(type.body, "text-text-inverse")}>{aboutHero.caption.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
