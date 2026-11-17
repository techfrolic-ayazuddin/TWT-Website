import Image from "next/image";
import { CtaButton } from "@/components/consultation/cta-button";
import { Icon } from "@/components/ui/icon";
import type { ClosingCtaContent } from "@/content/home";
import { phoneNumbers } from "@/content/site";
import { cn } from "@/lib/cn";
import { SectionHeading } from "../section-heading";

/**
 * Closing CTA — Figma `48:427` on the homepage and `54:382` on About
 * (1440 × 572; padding 0/80/120/80). Same panel, different copy.
 * Panel 1280 × 452, radius 32, `Gradient/Violet deep`, padding 96/80, with the
 * `Orbit arcs` pattern stretched across it.
 */

const contactLink = cn(
  "rounded-[6px] hover:underline focus-visible:underline",
  "focus-visible:shadow-focus-ring-on-dark focus-visible:outline-none",
);

export function ClosingCta({ content: closingCta }: { content: ClosingCtaContent }) {
  // Only the USA number is drawn here in Figma, and it is the only confirmed,
  // dialable one (CLAUDE.md §6.3). Display and `tel` stay separate fields.
  const usa = phoneNumbers.find((phone) => phone.region === "USA");

  return (
    <section aria-labelledby="closing-cta-title" className="bg-background-page">
      <div className="mx-auto w-full max-w-(--canvas-desktop) px-(--page-margin) pb-(--section-y)">
        <div
          className="tablet:px-12 tablet:py-16 desktop:px-20 desktop:py-24 relative overflow-hidden rounded-2xl px-6 py-12"
          style={{ backgroundImage: "var(--gradient-violet-deep)" }}
        >
          <Image
            src="/decor/orbit-arcs-dark.svg"
            alt=""
            fill
            unoptimized
            aria-hidden="true"
            className="pointer-events-none object-fill"
          />

          <div className="relative flex max-w-170 flex-col items-start gap-8">
            <SectionHeading
              id="closing-cta-title"
              tone="dark"
              eyebrow={closingCta.eyebrow}
              title={closingCta.title}
              description={closingCta.description}
            />

            <div className="tablet:flex-row tablet:items-center flex flex-col items-start gap-8">
              <CtaButton
                link={closingCta.cta}
                variant="inverse"
                size="large"
                trailingIcon="arrow-right"
              />

              <ul className="text-ui-label-large text-text-inverse flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Icon name="mail" size={18} className="shrink-0" />
                  <a href={`mailto:${closingCta.email}`} className={contactLink}>
                    {closingCta.email}
                  </a>
                </li>
                {usa ? (
                  <li className="flex items-center gap-2">
                    <Icon name="phone" size={18} className="shrink-0" />
                    <span className="text-ui-overline text-text-inverse-muted">
                      {usa.region}
                    </span>
                    {usa.tel ? (
                      <a href={`tel:${usa.tel}`} className={contactLink}>
                        {usa.display}
                      </a>
                    ) : (
                      <span>{usa.display}</span>
                    )}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
