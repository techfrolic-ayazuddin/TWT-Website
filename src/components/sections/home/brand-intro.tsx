import Image from "next/image";
import Link from "next/link";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { TextLink } from "@/components/ui/text-link";
import { brandIntro } from "@/content/home";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { SectionHeading, sectionFrame } from "../section-heading";

/** 02 · Brand introduction — Figma `46:184` (1440 × 1084, `background/subtle`). */
export function BrandIntro() {
  const statements = [brandIntro.vision, brandIntro.mission];

  return (
    <section
      aria-labelledby="brand-intro-title"
      className="bg-background-subtle relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="flow-lines-light" x={480} y={-60} w={1080} h={520} />
      </DecorLayer>

      <div className={cn(sectionFrame, "tablet:gap-16 flex flex-col gap-10")}>
        <SectionHeading
          id="brand-intro-title"
          eyebrow={brandIntro.eyebrow}
          title={brandIntro.title}
          className="max-w-220"
        />

        <div className="tablet:gap-14 desktop:flex-row desktop:items-center desktop:gap-24 flex flex-col gap-10">
          {/* Figma `Image` — 520 × 640, radius 32. */}
          <div className="desktop:w-130 desktop:shrink-0 aspect-[520/640] w-full max-w-130 overflow-hidden rounded-2xl">
            <Image
              src={brandIntro.image.src}
              alt={brandIntro.image.alt}
              width={brandIntro.image.width}
              height={brandIntro.image.height}
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 520px, 100vw"
              className="size-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-10">
            <p className={cn(type.h4, "text-text-brand")}>{brandIntro.lead}</p>
            <p className={cn(type.bodyLarge, "text-text-body")}>{brandIntro.body}</p>

            <dl className="border-border-default tablet:flex-row tablet:gap-10 flex w-full flex-col gap-8 border-t pt-8">
              {statements.map((item) => (
                <div key={item.label} className="flex flex-1 flex-col gap-3">
                  <dt className="text-ui-overline text-text-brand">{item.label}</dt>
                  <dd className={cn(type.body, "text-text-heading")}>{item.text}</dd>
                </div>
              ))}
            </dl>

            <TextLink asChild icon="arrow-right" className="-ml-1">
              <Link href={brandIntro.link.href}>{brandIntro.link.label}</Link>
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
