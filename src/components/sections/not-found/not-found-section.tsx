import Link from "next/link";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { Button } from "@/components/ui/button";
import { notFound } from "@/content/not-found";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { Eyebrow, sectionFrame } from "../section-heading";

/**
 * 404 — a single centred panel on `background/page`, with the same fine grid
 * and violet glow the Contact and Careers heroes use, so it reads as part of
 * the site. There is no Figma frame for it (see `content/not-found.ts`).
 *
 * It renders inside `MainLayout`, so the Header and the Original Footer come
 * with it, and the heading is the page's only `<h1>`.
 */
export function NotFoundSection() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light-1px" x={220} y={-140} w={1000} h={900} />
        <Glow x={340} y={-200} w={760} h={760} opacity={0.5} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "flex flex-col items-center gap-6 text-center",
          "tablet:py-28 desktop:py-40",
        )}
      >
        <Eyebrow size="lg">{notFound.eyebrow}</Eyebrow>
        <h1 id="not-found-title" className={cn(type.h1, "text-text-heading")}>
          {notFound.title}
        </h1>
        <p className={cn(type.bodyLarge, "text-text-body max-w-xl")}>
          {notFound.message}
        </p>
        <Button asChild size="large" trailingIcon="arrow-right" className="mt-4">
          <Link href={notFound.cta.href}>{notFound.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
