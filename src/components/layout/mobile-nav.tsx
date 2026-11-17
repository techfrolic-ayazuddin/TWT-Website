"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { useConsultation } from "@/components/consultation/consultation-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { headerCta, headerNavigation, isNavGroup } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Mobile / tablet navigation drawer.
 *
 * Figma designs the header at desktop only, so the drawer is a responsive
 * adaptation rather than a copy of a frame — built entirely from approved
 * tokens and the same content, with no new colours or type steps.
 *
 * It takes over below `desktop` (1280px, Figma's typography threshold), which
 * is where the 240px logo, five nav items and the CTA stop fitting on one
 * line. No new breakpoint is introduced.
 *
 * Radix Dialog supplies the focus trap, Escape handling, scroll lock and
 * `aria-modal`; Radix Accordion supplies the expandable Company and Services
 * groups with correct `aria-expanded` / `aria-controls` wiring.
 */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation. Done on click rather than in an effect watching the
  // pathname: the drawer closes in the same commit as the navigation, so
  // there is no frame where it sits open over the new page.
  const closeDrawer = () => setOpen(false);

  // The CTA opens the consultation popup, not a page. The drawer closes first
  // (its focus return runs on unmount), then the popup opens a frame later so
  // it keeps focus; closing the popup returns focus to this menu button.
  const openConsultation = useConsultation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const requestConsultation = () => {
    closeDrawer();
    requestAnimationFrame(() => openConsultation(menuButtonRef.current));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          className={cn(
            "text-icon-default inline-flex size-12 items-center justify-center rounded-full",
            "hover:bg-primary-soft transition-colors duration-150",
            "focus-visible:shadow-focus-ring focus-visible:outline-none",
            className,
          )}
        >
          <Icon name="menu" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-background-inverse-strong/60 fixed inset-0 z-50" />
        <Dialog.Content
          aria-label="Site navigation"
          className={cn(
            "bg-surface-default fixed inset-y-0 right-0 z-50 flex w-full flex-col",
            "shadow-elevation-4 tablet:max-w-105",
          )}
        >
          <div className="border-border-subtle flex items-center justify-between border-b px-(--page-margin) py-4">
            <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
            <Logo width={180} title="" />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className={cn(
                  "text-icon-default inline-flex size-12 items-center justify-center rounded-full",
                  "hover:bg-primary-soft transition-colors duration-150",
                  "focus-visible:shadow-focus-ring focus-visible:outline-none",
                )}
              >
                <Icon name="close" size={24} />
              </button>
            </Dialog.Close>
          </div>

          <nav
            aria-label="Main"
            className="flex-1 overflow-y-auto px-(--page-margin) py-6"
          >
            <Accordion.Root type="multiple" className="flex flex-col gap-1">
              {headerNavigation.map((entry) =>
                isNavGroup(entry) ? (
                  <Accordion.Item
                    key={entry.label}
                    value={entry.label}
                    className="border-border-subtle border-b last:border-0"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          "text-ui-label-large text-text-heading group flex w-full items-center justify-between",
                          "rounded-md py-4 transition-colors duration-150",
                          "hover:text-text-brand focus-visible:shadow-focus-ring focus-visible:outline-none",
                        )}
                      >
                        {entry.label}
                        <Icon
                          name="chevron-down"
                          size={20}
                          className="transition-transform duration-150 group-data-[state=open]:-rotate-180"
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden">
                      <ul className="flex flex-col gap-0.5 pb-3">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              onClick={closeDrawer}
                              href={item.href}
                              className={cn(
                                "text-desktop-body-regular text-text-body block rounded-md px-3 py-2.5",
                                "hover:bg-primary-soft hover:text-text-brand transition-colors duration-150",
                                "focus-visible:shadow-focus-ring focus-visible:outline-none",
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {entry.viewAll ? (
                          <li>
                            <Link
                              onClick={closeDrawer}
                              href={entry.viewAll.href}
                              className={cn(
                                "text-ui-label-regular text-text-brand inline-flex items-center gap-1.5",
                                "rounded-md px-3 py-2.5",
                                "focus-visible:shadow-focus-ring focus-visible:outline-none",
                              )}
                            >
                              {entry.viewAll.label}
                              <Icon name="arrow-right" size={20} />
                            </Link>
                          </li>
                        ) : null}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ) : (
                  <div
                    key={entry.href}
                    className="border-border-subtle border-b last:border-0"
                  >
                    <Link
                      onClick={closeDrawer}
                      href={entry.href}
                      aria-current={pathname === entry.href ? "page" : undefined}
                      className={cn(
                        "text-ui-label-large text-text-heading block rounded-md py-4",
                        "hover:text-text-brand transition-colors duration-150",
                        "focus-visible:shadow-focus-ring focus-visible:outline-none",
                      )}
                    >
                      {entry.label}
                    </Link>
                  </div>
                ),
              )}
            </Accordion.Root>
          </nav>

          <div className="border-border-subtle border-t px-(--page-margin) py-5">
            <Button
              size="medium"
              trailingIcon="arrow-right"
              className="w-full"
              aria-haspopup="dialog"
              onClick={requestConsultation}
            >
              {headerCta.label}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
