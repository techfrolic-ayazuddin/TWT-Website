import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import {
  RelatedServices,
  ServiceDetailHeroSection,
  ServiceModules,
} from "@/components/sections/services/service-detail-sections";
import {
  enquiryCta,
  hero,
  modules,
  related,
  serviceGlobalMeta,
} from "@/content/service-global";

export const metadata: Metadata = {
  title: serviceGlobalMeta.title,
  description: serviceGlobalMeta.description,
};

/**
 * Global Solutions — the shared Service Detail template in its
 * `Segment=Orange` variant (Figma `B2`, `56:761`).
 *
 * Every section component is reused from the Training build; nothing is
 * duplicated and the hue is passed once.
 *
 * **Only the sections with approved Global Solutions content are rendered.**
 * Figma has no Global Solutions service-detail frame, so the template's
 * Overview, Outcomes and Methodology sections have no copy, and the three
 * modules have no descriptions — all left out rather than invented
 * (CLAUDE.md §6). See the scope note in `src/content/service-global.ts`.
 */
export default function GlobalSolutionsPage() {
  return (
    <>
      <ServiceDetailHeroSection hue="orange" content={hero} />
      <ServiceModules hue="orange" content={modules} />
      <RelatedServices content={related} />
      <ClosingCta content={enquiryCta} />
    </>
  );
}
