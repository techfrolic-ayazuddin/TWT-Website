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
  serviceAdvisoryMeta,
} from "@/content/service-advisory";

export const metadata: Metadata = {
  title: serviceAdvisoryMeta.title,
  description: serviceAdvisoryMeta.description,
};

/**
 * Advisory & Management Consulting — the shared Service Detail template in
 * its `Segment=Pink` variant (Figma `B2`, `56:761`).
 *
 * Every section component is reused from the Training build; nothing is
 * duplicated. The hue is passed once.
 *
 * **Only the sections with approved Advisory content are rendered.** Figma
 * has no Advisory service-detail frame, so the template's Overview,
 * Outcomes and Methodology sections — and the per-module `SCOPE` lines —
 * have no copy, and are left out rather than invented (CLAUDE.md §6). See
 * the scope note at the top of `src/content/service-advisory.ts` for exactly
 * what each one needs.
 */
export default function AdvisoryManagementConsultingPage() {
  return (
    <>
      <ServiceDetailHeroSection hue="pink" content={hero} />
      <ServiceModules hue="pink" content={modules} />
      <RelatedServices content={related} />
      <ClosingCta content={enquiryCta} />
    </>
  );
}
