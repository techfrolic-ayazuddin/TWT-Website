import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { FlowLines } from "@/components/decor/flow-lines";
import { CtaButton } from "@/components/consultation/cta-button";
import { Icon, type IconName } from "@/components/ui/icon";
import { headerCta } from "@/content/navigation";
import {
  brand,
  contact,
  copyright,
  footerCompany,
  footerServices,
  legalLinks,
  offices,
  phoneNumbers,
  type FooterLink,
} from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * SiteFooter — Figma `Footer/Desktop` → `Layout=Original` (`44:176`).
 *
 * Server Component; nothing here is interactive beyond links.
 *
 * Measured from Figma (1440 × 760, `background/inverse`):
 *   padding 96 / 80 / 40 / 80, 64px between the four stacked blocks
 *   Brand band   4px, pinned to the TOP edge — pink / orange / yellow thirds
 *   Flow lines   absolute, 120px above the top edge, 55% opacity
 *   Top row      Brand 400 · Services 300 · Company 160 · Contact 300,
 *                space-between; every column stacks at a 16px gap
 *   Contact rows 18px `icon/inverse` icon, 10px gap; phone rows add a 52px
 *                region label (Bold 13, 12% tracking, uppercase, muted)
 *   Offices      1px `border/inverse` top rule + 40px padding; 400px label
 *                column, then two 392px offices 48px apart; 40px round tile
 *   Divider      1px `border/inverse`
 *   Bottom       copyright left, legal links right (32px apart), Body/Small
 *
 * Newsletters stays in the Company column — the client decision removed it
 * from the HEADER only (CLAUDE.md §7.2).
 *
 * No QR code: none exists in Figma. See `footerQrCode` in `content/site.ts`.
 */

/**
 * Footer link interaction.
 *
 * Figma models the footer links as plain text nodes — there is no hover
 * variant to copy. The nearest precedent in the design system is `Text Link`
 * (32:102), whose hover strengthens the colour and adds no underline. On the
 * inverse surface the default is already `text/inverse` (pure white), so
 * "stronger" is not available as a colour move; an underline is the honest
 * analogue and the conventional affordance.
 *
 * Chosen treatment, restrained and token-only:
 *   rest   `text/inverse`, no underline
 *   hover  underline in `white/a72`, 1px, 4px offset — colour unchanged
 *   focus  the same underline plus `Focus/Ring · On dark`
 *
 * `text-decoration` does not affect layout, so nothing shifts. Tailwind v4
 * compiles `hover:` inside `@media (hover: hover)`, so touch devices never
 * latch the hover state.
 */
/**
 * The resting and hover half of the footer link treatment, on its own so a
 * non-link row can share it. Used by the Asia and Africa phone numbers, which
 * hover like every other contact row but are not links (CLAUDE.md §6.3).
 */
const hoverOnDark = cn(
  "rounded-xs underline decoration-transparent decoration-1 underline-offset-4",
  "transition-[text-decoration-color,color] duration-150",
  "hover:decoration-(--white-a72)",
);

const linkOnDark = cn(
  hoverOnDark,
  "focus-visible:decoration-(--white-a72) focus-visible:shadow-focus-ring-on-dark",
  "focus-visible:outline-none",
);

/** Legal row — muted at rest, so hover can brighten as well as underline. */
const linkOnDarkMuted = cn(
  "inline-block text-text-inverse-muted hover:text-text-inverse focus-visible:text-text-inverse",
  linkOnDark,
);

function ColumnHeading({ children }: { children: ReactNode }) {
  return <p className="text-ui-overline text-text-inverse-muted">{children}</p>;
}

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-4">
      <ColumnHeading>{title}</ColumnHeading>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn(
                "text-desktop-body-regular text-text-inverse inline-block",
                linkOnDark,
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactRow({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <li className="text-desktop-body-regular text-text-inverse flex items-start gap-2.5">
      {/* Figma: 18px icon, 4px down so it centres on the 28px text line. */}
      <Icon name={icon} size={18} className="text-icon-inverse mt-[5px]" />
      {children}
    </li>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "bg-background-inverse text-text-inverse-muted relative overflow-hidden",
        className,
      )}
    >
      {/* Figma `BG · Flow lines` — offsets are a decorative token exception
          (CLAUDE.md §3.1), taken from the instance's position in the frame. */}
      <FlowLines className="absolute -top-[120px] left-0 max-w-none" />

      {/* Figma `Brand band` — absolutely pinned to the top edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
        <span className="bg-secondary-default flex-1" />
        <span className="bg-accent-orange flex-1" />
        <span className="bg-accent-yellow flex-1" />
      </div>

      <div className="tablet:pt-20 desktop:pt-24 relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-16 px-(--page-margin) pt-16 pb-10">
        {/* -------------------------------------------------------- Top */}
        <div className="tablet:grid-cols-2 desktop:grid-cols-[400px_300px_160px_300px] desktop:justify-between desktop:gap-0 grid gap-x-10 gap-y-12">
          <div className="flex max-w-[400px] flex-col items-start gap-6">
            <Logo width={240} colour="white" />
            <p className="text-desktop-body-regular text-text-inverse-muted">
              {brand.statement}
            </p>
            <CtaButton
              link={headerCta}
              variant="inverse"
              size="small"
              trailingIcon="arrow-right"
            />
          </div>

          <LinkColumn title="Services" links={footerServices} />
          <LinkColumn title="Company" links={footerCompany} />

          <div className="flex flex-col gap-4">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="flex flex-col gap-4">
              <ContactRow icon="mail">
                <a href={`mailto:${contact.email}`} className={linkOnDark}>
                  {contact.email}
                </a>
              </ContactRow>

              {phoneNumbers.map((phone) => (
                <ContactRow key={phone.region} icon="phone">
                  <span className="text-ui-overline text-text-inverse-muted w-13 shrink-0 leading-7">
                    {phone.region}
                  </span>
                  {/*
                    All three rows take the same hover treatment, to match the
                    Contact page. CLAUDE.md §6.3 — a number only becomes a
                    link once its international form is confirmed, so Asia and
                    Africa are not links: not focusable, not dialable, and
                    never derived from `display`.
                  */}
                  {phone.tel ? (
                    <a href={`tel:${phone.tel}`} className={linkOnDark}>
                      {phone.display}
                    </a>
                  ) : (
                    <span className={hoverOnDark}>{phone.display}</span>
                  )}
                </ContactRow>
              ))}

              <ContactRow icon="globe">
                <a href={contact.website.href} className={linkOnDark}>
                  {contact.website.display}
                </a>
              </ContactRow>

              <ContactRow icon="instagram">
                <a
                  href={contact.instagram.href}
                  className={linkOnDark}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {contact.instagram.handle}
                </a>
              </ContactRow>
            </ul>
          </div>
        </div>

        {/* ---------------------------------------------------- Offices */}
        <div className="border-border-inverse tablet:grid-cols-2 desktop:grid-cols-[400px_392px_392px] grid gap-x-12 gap-y-8 border-t pt-10">
          <div className="tablet:col-span-2 desktop:col-span-1">
            <ColumnHeading>Our offices</ColumnHeading>
          </div>
          {offices.map((office) => (
            <div key={office.name} className="flex items-start gap-4">
              <span className="bg-inverse-ghost-hover text-icon-inverse grid size-10 shrink-0 place-items-center rounded-full">
                <Icon name="map-pin" size={20} />
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-ui-label-large text-text-inverse">{office.name}</p>
                <p className="text-desktop-body-regular text-text-inverse-muted">
                  {office.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Figma `Divider` */}
        <div aria-hidden="true" className="bg-border-inverse h-px w-full" />

        {/* ----------------------------------------------------- Bottom */}
        <div className="tablet:flex-row tablet:items-center tablet:justify-between flex flex-col gap-4">
          <p className="text-desktop-body-small text-text-inverse-muted">{copyright()}</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn("text-desktop-body-small", linkOnDarkMuted)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
