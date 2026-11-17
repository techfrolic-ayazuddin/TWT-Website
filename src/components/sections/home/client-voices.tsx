import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Icon } from "@/components/ui/icon";
import { attributedQuote } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow, sectionFrame } from "../section-heading";

/**
 * 08 · Testimonials & trust — Figma `48:379` (1440 × 670, `background/subtle`).
 *
 * An attributed third-party quotation, NOT a client testimonial
 * (CLAUDE.md §6.2): no client name, logo, role or endorsement framing beyond
 * the eyebrow Figma supplies.
 */
export function ClientVoices() {
  return (
    <section
      aria-label={attributedQuote.eyebrow}
      className="bg-background-subtle relative overflow-hidden"
    >
      <DecorLayer>
        <Glow x={270} y={-320} w={900} h={900} opacity={0.4} />
        <Pattern
          name="symbol-watermark-light"
          x={980}
          y={140}
          w={854}
          h={505}
          className="desktop:block hidden"
        />
      </DecorLayer>

      <div className={sectionFrame}>
        <figure
          className={cn(
            "bg-surface-default border-border-subtle shadow-elevation-1 mx-auto flex max-w-220 flex-col items-center gap-6 rounded-2xl border px-6 py-12 text-center",
            "tablet:px-24 tablet:py-18",
          )}
        >
          <span
            aria-hidden="true"
            className="bg-primary-soft text-text-brand grid size-16 place-items-center rounded-full"
          >
            <Icon name="quote" size={28} />
          </span>
          <Eyebrow size="lg" className="justify-center">
            {attributedQuote.eyebrow}
          </Eyebrow>
          <blockquote className={cn(type.h2, "text-text-heading max-w-135")}>
            {/* Figma sets the quotation without quote marks. */}
            <p>{attributedQuote.quote}</p>
          </blockquote>
          {/* Figma: Bold 18/28 `text/heading` at 70% opacity — the
              `Mobile/Body/Large Strong` step, used at every width. */}
          <figcaption className="text-mobile-body-large-strong text-text-heading opacity-70">
            — {attributedQuote.attribution}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
