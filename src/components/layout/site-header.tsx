import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ConsultationTrigger } from "@/components/consultation/consultation-trigger";
import { headerCta } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/**
 * SiteHeader — Figma `Header/Desktop` → `Layout=Grouped Dropdown` (`109:5770`).
 *
 * Server Component. Only the two navigation surfaces are client components,
 * because only they hold open/closed state.
 *
 * Figma geometry: 1440 × 128, padding 0/80 (so the inner row is exactly
 * `container/desktop` 1280), `background/page`, 1px bottom border in
 * `border/subtle`, logo 240 wide, nav gap 40, CTA `Button/Primary` Medium
 * with a trailing arrow only (the leading icon slot is hidden in Figma).
 *
 * Below `desktop` (1280px) the horizontal nav is replaced by the drawer, so
 * nothing is ever squeezed and the row cannot overflow.
 */
export type SiteHeaderProps = {
  className?: string;
  /** Review-only: opens a dropdown on mount. See `DesktopNav.defaultOpen`. */
  defaultOpenMenu?: string;
};

export function SiteHeader({ className, defaultOpenMenu }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background-page border-border-subtle sticky top-0 z-40 w-full border-b",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-(--canvas-desktop) items-center justify-between gap-6",
          "desktop:h-32 desktop:py-0 px-(--page-margin) py-4",
        )}
      >
        <Link
          href="/"
          aria-label="The Working Tribe — home"
          className="focus-visible:shadow-focus-ring shrink-0 rounded-md focus-visible:outline-none"
        >
          <Logo width={240} title="" className="desktop:w-60 h-auto w-[180px]" />
        </Link>

        {/* Horizontal navigation — desktop only. */}
        <DesktopNav className="desktop:block hidden" defaultOpen={defaultOpenMenu} />

        <div className="flex items-center gap-2">
          {/* Opens the consultation popup (Figma `Form/Consultation`). */}
          <ConsultationTrigger
            size="medium"
            trailingIcon="arrow-right"
            className="desktop:inline-flex hidden"
          >
            {headerCta.label}
          </ConsultationTrigger>

          {/* Drawer trigger — everything below desktop. */}
          <MobileNav className="desktop:hidden" />
        </div>
      </div>
    </header>
  );
}
