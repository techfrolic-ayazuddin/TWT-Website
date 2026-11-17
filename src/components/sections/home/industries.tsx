import Link from "next/link";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Icon } from "@/components/ui/icon";
import { industries } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/**
 * 04 · Industries — Figma `48:186` (1440 × 998, `background/page`).
 *
 * Figma draws row 02 in its hover state as a static illustration; here hover
 * and keyboard focus are real states on every row (CLAUDE.md §4 — `State` is
 * interaction, not a prop).
 */
export function Industries() {
  return (
    <section
      aria-labelledby="industries-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="dot-field-light" x={-260} y={360} w={960} h={760} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "tablet:gap-14 desktop:flex-row desktop:gap-24 flex flex-col gap-10",
        )}
      >
        <div className="desktop:w-110 desktop:shrink-0 flex flex-col gap-10">
          <SectionHeading
            id="industries-title"
            eyebrow={industries.eyebrow}
            title={industries.title}
            description={industries.description}
          />

          <div className="bg-accent-yellow-soft flex gap-5 rounded-xl p-7">
            <span
              aria-hidden="true"
              className="bg-accent-yellow w-1 shrink-0 self-stretch rounded-[2px]"
            />
            <div className="flex flex-col gap-2">
              <p className="text-ui-overline text-text-warning">
                {industries.callout.label}
              </p>
              <p className={cn(type.body, "text-text-heading")}>
                {industries.callout.text}
              </p>
            </div>
          </div>
        </div>

        <ol className="divide-border-subtle min-w-0 flex-1 divide-y">
          {industries.rows.map((row, i) => (
            <li key={row.title}>
              <Link
                href={industries.href}
                className={cn(
                  "group tablet:gap-6 tablet:px-6 flex items-center gap-4 rounded-lg px-3 py-7",
                  "transition-colors duration-150",
                  "hover:bg-primary-soft focus-visible:bg-primary-soft",
                  "focus-visible:shadow-focus-ring focus-visible:outline-none",
                )}
              >
                <span
                  aria-hidden="true"
                  className="text-ui-overline text-text-muted tablet:block hidden w-7 shrink-0"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "bg-primary-soft text-text-brand grid size-14 shrink-0 place-items-center rounded-lg",
                    "transition-colors duration-150",
                    "group-hover:bg-primary-default group-hover:text-text-on-primary",
                    "group-focus-visible:bg-primary-default group-focus-visible:text-text-on-primary",
                  )}
                >
                  <Icon name={row.icon} size={24} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span
                    className={cn(
                      type.h4,
                      "text-text-heading transition-colors duration-150",
                      "group-hover:text-text-brand group-focus-visible:text-text-brand",
                    )}
                  >
                    {row.title}
                  </span>
                  <span className={cn(type.body, "text-text-body")}>
                    {row.description}
                  </span>
                </span>
                <Icon
                  name="arrow-right"
                  size={24}
                  className={cn(
                    "text-text-muted shrink-0 transition-[color,transform] duration-150",
                    "group-hover:text-text-brand group-hover:translate-x-1",
                    "group-focus-visible:text-text-brand",
                  )}
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
