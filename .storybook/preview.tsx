import type { Preview } from "@storybook/nextjs-vite";
import { useLayoutEffect } from "react";
import { ConsultationProvider } from "../src/components/consultation/consultation-dialog";
import { brandFontFamily } from "../src/lib/fonts";
import "../src/app/globals.css";

/**
 * `--font-sans` is declared in `@theme` as `var(--font-brand), …`, and a
 * custom property that references an undefined one computes to the
 * guaranteed-invalid value *at the element where it is declared* — `:root`.
 * Defining `--font-brand` further down the tree cannot repair it.
 *
 * In the Next app that is a non-issue: the root layout sets `--font-brand` on
 * `<html>`, which is `:root`. Storybook renders stories into a div, so the
 * property has to be set on the document element explicitly or every story
 * falls back to the browser's default serif.
 */
const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      options: {
        page: { name: "background/page", value: "#ffffff" },
        subtle: { name: "background/subtle", value: "#fbfaff" },
        muted: { name: "background/muted", value: "#f5f4fa" },
        inverse: { name: "background/inverse", value: "#170d49" },
        brand: { name: "background/brand", value: "#6242fb" },
      },
    },
    a11y: { test: "todo" },
  },
  initialGlobals: {
    backgrounds: { value: "page" },
  },
  decorators: [
    function BrandFontScope(Story) {
      useLayoutEffect(() => {
        const el = document.documentElement;
        el.style.setProperty("--font-brand", brandFontFamily);
        return () => el.style.removeProperty("--font-brand");
      }, []);

      return (
        <ConsultationProvider>
          <div className="text-text-body font-sans">
            <Story />
          </div>
        </ConsultationProvider>
      );
    },
  ],
};

export default preview;
