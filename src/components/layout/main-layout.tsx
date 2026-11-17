import type { ReactNode } from "react";
import { ConsultationProvider } from "@/components/consultation/consultation-dialog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * MainLayout — the global page shell: skip link, header, main, footer.
 *
 * Server Component. Pages compose their own sections inside `children`;
 * this only owns the chrome that is identical on every page.
 */
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        Skip link — the header holds a logo, five nav targets and a CTA, so a
        keyboard user needs a way past it. Visually hidden until focused.
      */}
      <a
        href="#main-content"
        className="bg-surface-default text-text-brand shadow-elevation-3 focus-visible:shadow-focus-ring sr-only rounded-md px-4 py-2.5 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus-visible:outline-none"
      >
        Skip to content
      </a>

      {/* One consultation popup for the whole site, opened by the header CTA. */}
      <ConsultationProvider>
        <SiteHeader />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </ConsultationProvider>
    </>
  );
}
