"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  headerNavigation,
  isNavGroup,
  type NavGroup,
  type NavLink,
} from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Desktop navigation — Figma `Header/Desktop` → `Layout=Grouped Dropdown`
 * (`109:5770`), `Panel · Company` (`109:5675`), `Panel · Services`
 * (`167:7821`).
 *
 * Radix NavigationMenu supplies the menubar behaviour: pointer and keyboard
 * both open, Escape closes and restores focus, open state is announced.
 *
 * Measured from Figma:
 *   Nav Link      `UI/Navigation/Link` (17 Regular) in `text/heading`;
 *                 hover `text/brand`; active `UI/Navigation/Link Active`
 *                 (Bold) + a 20×3 `primary/default` indicator 6px below;
 *                 focus adds a `primary/soft` fill. Chevron 16px, 4px gap.
 *   Nav gap       40
 *   Panels        `surface/default`, 1px `border/subtle`, `Elevation/3`,
 *                 offset −16px left / 14px below the trigger
 *   Company       296 wide, pad 18/10/10/10, `radius/xl`; rows 44 high,
 *                 pad 10/16/10/12, `radius/md`, 2px apart, `UI/Label/Large`;
 *                 hover `primary/soft` + `text/brand`
 *   Services      640 wide, pad 20/20/16/20, `radius/2xl`; header row with
 *                 "View all services" right-aligned; 2 × 2 grid (8px / 12px
 *                 gaps) of items — pad 16, `radius/lg`, 4px segment accent
 *                 bar, title + caption; hover `segment/{hue}/soft` fill and
 *                 `segment/{hue}/text` title
 *
 * NOTE: Newsletters is intentionally absent — see `content/navigation.ts`.
 */

/** Static class strings so Tailwind can see every segment utility. */
const ACCENT = {
  violet: {
    bar: "bg-segment-violet-accent",
    hover: "hover:bg-segment-violet-soft",
    title: "group-hover/item:text-segment-violet-text",
  },
  pink: {
    bar: "bg-segment-pink-accent",
    hover: "hover:bg-segment-pink-soft",
    title: "group-hover/item:text-segment-pink-text",
  },
  orange: {
    bar: "bg-segment-orange-accent",
    hover: "hover:bg-segment-orange-soft",
    title: "group-hover/item:text-segment-orange-text",
  },
  yellow: {
    bar: "bg-segment-yellow-accent",
    hover: "hover:bg-segment-yellow-soft",
    title: "group-hover/item:text-segment-yellow-text",
  },
} as const;

const navLinkClasses = (active: boolean) =>
  cn(
    "group flex flex-col items-center gap-1.5 rounded-sm pt-2.5",
    "transition-colors duration-150 focus-visible:outline-none",
    "focus-visible:bg-primary-soft focus-visible:shadow-focus-ring",
    active
      ? "text-ui-navigation-link-active text-text-brand"
      : "text-ui-navigation-link text-text-heading hover:text-text-brand data-[state=open]:text-text-brand",
  );

/** Figma `Indicator` — always laid out, visible only on the active item. */
function Indicator({ show }: { show: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-primary-default block h-[3px] w-5 rounded-[2px]",
        show ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

const panelBase =
  "bg-surface-default border-border-subtle shadow-elevation-3 absolute top-full -left-4 z-50 mt-3.5 border";

function CompanyPanel({ group, onNavigate }: PanelProps) {
  return (
    <NavigationMenu.Content
      className={cn(panelBase, "w-74 rounded-xl px-2.5 pt-4.5 pb-2.5")}
    >
      <p className="text-ui-overline text-text-muted px-3 pb-1.5">{group.panelHeading}</p>
      <ul className="mt-0.5 flex flex-col gap-0.5">
        {group.items.map((item) => (
          <li key={item.href}>
            <NavigationMenu.Link asChild onSelect={onNavigate}>
              <Link
                href={item.href}
                className={cn(
                  "group/row text-ui-label-large text-text-heading flex h-11 items-center gap-3.5 rounded-md pr-4 pl-3",
                  "hover:bg-primary-soft hover:text-text-brand transition-colors duration-150",
                  "focus-visible:shadow-focus-ring focus-visible:outline-none",
                )}
              >
                <span className="min-w-0 flex-1">{item.label}</span>
                {/* Figma `Nav Menu Item` → `State=Hover`: a 16px
                    `Icon/arrow-right` in `icon/brand`, flush with the 16px
                    right padding. Always laid out and only faded in, so
                    showing it never shifts the label. */}
                <Icon
                  name="arrow-right"
                  size={16}
                  className={cn(
                    "text-icon-brand shrink-0 opacity-0 transition-opacity duration-150",
                    "group-hover/row:opacity-100 group-focus-visible/row:opacity-100",
                  )}
                />
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </NavigationMenu.Content>
  );
}

function ServicesPanel({ group, onNavigate }: PanelProps) {
  return (
    <NavigationMenu.Content className={cn(panelBase, "w-160 rounded-2xl px-5 pt-5 pb-4")}>
      <div className="flex items-center justify-between px-4">
        <p className="text-ui-overline text-text-muted">{group.panelHeading}</p>
        {group.viewAll ? (
          <NavigationMenu.Link asChild onSelect={onNavigate}>
            <Link
              href={group.viewAll.href}
              className={cn(
                "text-ui-label-regular text-text-brand hover:text-text-brand-strong",
                "inline-flex items-center gap-1.5 rounded-xs transition-colors duration-150",
                "focus-visible:shadow-focus-ring focus-visible:outline-none",
              )}
            >
              {group.viewAll.label}
              <Icon name="arrow-right" size={16} />
            </Link>
          </NavigationMenu.Link>
        ) : null}
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-3">
        {group.items.map((item) => {
          const accent = ACCENT[item.accent ?? "violet"];
          return (
            <li key={item.href} className="flex">
              <NavigationMenu.Link asChild onSelect={onNavigate}>
                <Link
                  href={item.href}
                  className={cn(
                    "group/item flex w-full gap-3.5 rounded-lg p-4 transition-colors duration-150",
                    "focus-visible:shadow-focus-ring focus-visible:outline-none",
                    accent.hover,
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("w-1 shrink-0 rounded-[2px]", accent.bar)}
                  />
                  <span className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-ui-label-large text-text-heading transition-colors duration-150",
                        accent.title,
                      )}
                    >
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-ui-caption text-text-muted">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </NavigationMenu.Link>
            </li>
          );
        })}
      </ul>
    </NavigationMenu.Content>
  );
}

type PanelProps = { group: NavGroup; onNavigate: () => void };

function GroupItem({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const active = group.items.some((i) => pathname.startsWith(i.href));
  // The Services group carries descriptions, so it gets the wide panel.
  const Panel = group.items[0]?.description ? ServicesPanel : CompanyPanel;

  // Radix closes the menu when a NavigationMenu.Link is selected; blurring
  // stops the trigger re-opening under a pointer that has not moved yet.
  const close = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <NavigationMenu.Item value={group.label} className="relative">
      <NavigationMenu.Trigger className={navLinkClasses(active)}>
        <span className="flex items-center gap-1">
          {group.label}
          <Icon
            name="chevron-down"
            size={16}
            className="transition-transform duration-150 group-data-[state=open]:-rotate-180"
          />
        </span>
        <Indicator show={active} />
      </NavigationMenu.Trigger>
      <Panel group={group} onNavigate={close} />
    </NavigationMenu.Item>
  );
}

function PlainItem({ item }: { item: NavLink }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild active={active}>
        <Link
          href={item.href}
          className={navLinkClasses(active)}
          aria-current={active ? "page" : undefined}
        >
          <span>{item.label}</span>
          <Indicator show={active} />
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

export type DesktopNavProps = {
  className?: string;
  /**
   * Opens a dropdown on mount, by its trigger label ("Company" / "Services").
   * Exists so the open panels can be reviewed in Storybook and screenshots
   * without scripting a hover. Not used by the site itself.
   */
  defaultOpen?: string;
};

export function DesktopNav({ className, defaultOpen }: DesktopNavProps) {
  return (
    <NavigationMenu.Root
      delayDuration={120}
      defaultValue={defaultOpen}
      className={className}
    >
      <NavigationMenu.List className="flex items-start gap-10">
        {headerNavigation.map((entry) =>
          isNavGroup(entry) ? (
            <GroupItem key={entry.label} group={entry} />
          ) : (
            <PlainItem key={entry.href} item={entry} />
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
