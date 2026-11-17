import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DecorLayer, Glow, Pattern } from "@/components/decor/decor";
import { ConsultationForm } from "@/components/consultation/consultation-dialog";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { consultation } from "@/content/consultation";
import { contactEnquiry, contactHero } from "@/content/contact";
import { contact, offices, phoneNumbers } from "@/content/site";
import { cn } from "@/lib/cn";
import { googleMapsSearchHref } from "@/lib/maps";
import { type } from "@/lib/type";
import { Breadcrumb } from "../breadcrumb";
import { Eyebrow, sectionFrame } from "../section-heading";

/**
 * 01 · Page hero — Figma `E · Contact Us — Desktop` → `01 · Page hero`
 * (1440 × 812, padding 72/80/120/80, gap 96).
 */
export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-title"
      className="bg-background-page relative overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="fine-grid-light-1px" x={560} y={-140} w={1000} h={900} />
        <Glow x={820} y={-160} w={760} h={760} opacity={0.5} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-14 px-(--page-margin) pt-10 pb-16",
          "tablet:pt-14 tablet:pb-24",
          "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-24 desktop:pt-18 desktop:pb-30",
        )}
      >
        <div className="desktop:w-161 desktop:shrink-0 flex flex-col items-start gap-7">
          <Breadcrumb items={contactHero.breadcrumb} />
          <Eyebrow size="lg">{contactHero.eyebrow}</Eyebrow>
          <h1
            id="contact-title"
            className="text-mobile-heading-h1 tablet:text-tablet-display-hero desktop:text-desktop-display-hero text-text-heading"
          >
            {contactHero.title}
          </h1>
          <p className={cn(type.bodyLarge, "text-text-body")}>{contactHero.intro}</p>

          <div className="flex flex-wrap gap-4">
            {/* Figma prototypes this to `02 · Enquiry` — it scrolls down the page. */}
            <Button asChild size="large" trailingIcon="arrow-right">
              <a href={contactHero.primaryCta.href}>{contactHero.primaryCta.label}</a>
            </Button>
            <Button asChild size="large" variant="outline">
              <a href={`mailto:${contact.email}`}>{contactHero.secondaryCta.label}</a>
            </Button>
          </div>

          <Link
            href={contactHero.tribeCapital.href}
            className={cn(
              "text-ui-label-large text-text-warning inline-flex items-center gap-2 rounded-xs",
              "focus-visible:shadow-focus-ring hover:underline focus-visible:outline-none",
            )}
          >
            {contactHero.tribeCapital.label}
            <Icon name="chevron-down" size={20} className="shrink-0" />
          </Link>
        </div>

        {/* Figma `Hero visual` — 540 × 620 stage: arch 460 × 620 at x 80
            (radius 230/230/32/32); `Promise card` 300 wide at (0, 440). */}
        <div className="desktop:mx-0 relative mx-auto aspect-[540/620] w-full max-w-135 min-w-0 flex-1">
          <div className="absolute inset-y-0 right-0 w-[85.19%] overflow-hidden rounded-t-[999px] rounded-b-2xl">
            <Image
              src={contactHero.image.src}
              alt={contactHero.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 460px, 85vw"
              className="object-cover"
            />
          </div>
          <div className="bg-surface-default shadow-elevation-3 tablet:top-[70.97%] tablet:bottom-auto absolute -bottom-6 left-0 flex w-[min(18.75rem,80%)] flex-col gap-3 rounded-xl p-6">
            <Icon name="quote" size={28} className="text-icon-brand" />
            <p className="text-ui-label-large text-text-heading">{contactHero.promise}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Figma `Contact Option` (`90:4008`) — 440 × 82, padding 18/20, gap 16,
 * `radius/xl`, 1px `border/subtle`; 44px `radius/lg` `primary/soft` icon tile.
 *
 * `State=Hover` fills the card `primary/soft`, moves the border to
 * `violet/100` and makes the tile solid. Every row takes that state, link or
 * not, so the three phone rows are visually identical — Figma sets
 * `Show action = true` on all three, and the client asked for that to hold
 * (Phase 5.5 refinements).
 *
 * What a row CANNOT fake is activation. `href` is what makes a row a link:
 * it is focusable, takes `State=Focus`, and its action is announced. A row
 * with no destination — an address, or a phone whose international form is
 * still disputed (CLAUDE.md §6.3) — keeps the same look but is not a link,
 * is not focusable, and its action label is hidden from assistive tech, so
 * nothing promises a call that cannot be placed.
 */
const optionShell = cn(
  "border-border-subtle flex items-center gap-4 rounded-xl border px-5 py-4.5",
  "bg-surface-default transition-colors duration-150",
  // `State=Hover` — on every row.
  "hover:bg-primary-soft hover:border-border-brand-soft",
);

function ContactOption({
  icon,
  label,
  value,
  href,
  action,
  srAction,
  external,
}: {
  icon: IconName;
  label: string;
  value: string;
  /** Omitted when the row has no destination — it is then not a link. */
  href?: string;
  action?: string;
  /**
   * An action announced to assistive tech but not drawn, for a row whose
   * destination is not obvious from its visible text — the office rows, whose
   * address alone does not say "this opens a map in a new tab".
   *
   * It is deliberately part of the link's own CONTENT rather than an
   * `aria-label`. A label that replaced the name could drift from the visible
   * address and break WCAG 2.5.3 Label in Name; appending to the content
   * cannot (Phase 7 fix, CLAUDE.md §9.4).
   */
  srAction?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "bg-primary-soft text-icon-brand grid size-11 shrink-0 place-items-center rounded-lg transition-colors duration-150",
          "group-hover:bg-primary-default group-hover:text-icon-inverse",
        )}
      >
        <Icon name={icon} size={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-ui-overline text-text-muted">{label}</span>
        <span className="text-ui-label-large text-text-heading">
          {value}
          {srAction ? <span className="sr-only"> — {srAction}</span> : null}
        </span>
      </span>
      {action ? (
        <span
          // Drawn for every row that has one, but only announced when it
          // actually goes somewhere.
          aria-hidden={href ? undefined : "true"}
          className="text-ui-label-regular text-text-brand tablet:flex hidden shrink-0 items-center gap-1.5"
        >
          {action}
          <Icon name="arrow-right" size={16} />
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <li className={cn(optionShell, "group cursor-default")}>{inner}</li>;
  }

  return (
    <li className="flex">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          optionShell,
          "group w-full",
          // `State=Focus`: white, a 2px brand border and `Focus/Ring`.
          "focus-visible:border-border-focus focus-visible:border-(length:--stroke-strong)",
          "focus-visible:bg-surface-default focus-visible:shadow-focus-ring focus-visible:outline-none",
        )}
      >
        {inner}
      </a>
    </li>
  );
}

/**
 * 02 · Enquiry — Figma `02 · Enquiry` (1440 × 1266, `background/subtle`;
 * padding 120/80, gap 48): the consultation form (792 wide, padding 48,
 * `radius/2xl`, `Elevation/4`) beside the 440-wide contact list.
 *
 * The form is the SAME `Form/Consultation` component as the header popup, so
 * it is the same React component too — one form, one validation, one stubbed
 * transport (CLAUDE.md §9: it never fakes a success).
 */
export function ContactEnquiry() {
  const { labels, actions } = contactEnquiry;

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-title"
      className="bg-background-subtle relative scroll-mt-[calc(1.5rem_-_var(--section-y))] overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="flow-lines-light-1px" x={520} y={-80} w={1000} h={460} />
      </DecorLayer>

      <div
        className={cn(
          sectionFrame,
          "tablet:gap-12 desktop:flex-row desktop:items-start flex flex-col gap-10",
        )}
      >
        <div
          className={cn(
            "bg-surface-default border-border-subtle shadow-elevation-4 flex min-w-0 flex-1 flex-col gap-6 rounded-2xl border p-6",
            "tablet:p-12",
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="text-ui-overline text-text-brand">{consultation.overline}</p>
            <h2 id="enquiry-title" className={cn(type.h3, "text-text-heading")}>
              {consultation.title}
            </h2>
            <p className="text-ui-caption text-text-muted">{consultation.requiredNote}</p>
          </div>
          <ConsultationForm />
        </div>

        <aside
          aria-labelledby="direct-title"
          className="desktop:w-110 desktop:shrink-0 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 pb-2">
            <p className="text-ui-overline text-text-brand">
              {contactEnquiry.directOverline}
            </p>
            {/* Figma binds this to `Desktop/Heading/H3` (32/40). */}
            <h2 id="direct-title" className={cn(type.h3, "text-text-heading")}>
              {contactEnquiry.directTitle}
            </h2>
          </div>

          <ul className="flex flex-col gap-4">
            <ContactOption
              icon="mail"
              label={labels.email}
              value={contact.email}
              href={`mailto:${contact.email}`}
              action={actions.email}
            />
            {phoneNumbers.map((phone) => (
              <ContactOption
                key={phone.region}
                icon="phone"
                label={`${labels.phone} · ${phone.region}`}
                value={phone.display}
                // Every phone row shows "Call →", as Figma draws it. Only a
                // number whose international form is confirmed gets a `tel:`;
                // Asia and Africa are disputed, so their row is not a link
                // and nothing is guessed from `display` (CLAUDE.md §6.3).
                href={phone.tel ? `tel:${phone.tel}` : undefined}
                action={actions.call}
              />
            ))}
            <ContactOption
              icon="globe"
              label={labels.website}
              value={contact.website.display}
              href={contact.website.href}
              action={actions.visit}
              external
            />
            {/*
              Figma sets `Show badge = true` ("TO CONFIRM") on the Asia Region
              row. Removed on client instruction (Phase 5.5 refinements); the
              address is still flagged `unconfirmed` in `site.ts`, it is just
              no longer called out to the visitor.

              Both rows open Google Maps in a new tab on the complete address
              (client instruction, 2026-11-17). They are now links, so they
              take the same `State=Hover` as before PLUS `State=Focus` and a
              pointer cursor — the clickability cues the instruction asks for,
              without altering the drawn card. No visible "action" label is
              added: Figma's action slot would reflow these two-line addresses,
              and the instruction is to preserve the displayed address text.
              Screen readers get the destination from `srAction` instead.

              The Asia address being unconfirmed does not block this — unlike a
              phone number, a map search cannot "misdial": it searches the exact
              string we display, and a wrong address is visible on arrival.
            */}
            {offices.map((office) => (
              <ContactOption
                key={office.name}
                icon="map-pin"
                label={office.name}
                value={office.address}
                href={googleMapsSearchHref(office.address)}
                srAction={actions.directions}
                external
              />
            ))}
          </ul>

          {/* Figma `Location card` — a placeholder until the addresses are
              confirmed; it draws no map and embeds no third-party script. */}
          <div className="bg-primary-soft relative flex hidden flex-col items-center gap-2.5 overflow-hidden rounded-2xl p-8 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <Pattern name="contour-light-1px" x={-200} y={-120} w={840} h={560} />
            </div>
            <span
              aria-hidden="true"
              className="bg-primary-default text-icon-inverse relative grid size-13 place-items-center rounded-full"
            >
              <Icon name="map-pin" size={26} />
            </span>
            <p className={cn(type.h4, "text-text-heading relative")}>
              {contactEnquiry.map.title}
            </p>
            <p className={cn(type.bodySmall, "text-text-muted relative")}>
              {contactEnquiry.map.note}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export type { ReactNode };
