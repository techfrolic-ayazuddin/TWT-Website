import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import {
  RelatedServices,
  ServiceDetailHeroSection,
  ServiceMethodology,
  ServiceModules,
  ServiceOutcomes,
  ServiceOverview,
} from "@/components/sections/services/service-detail-sections";
import {
  enquiryCta,
  hero,
  methodology,
  modules,
  outcomes,
  overview,
  related,
  serviceTrainingMeta,
} from "@/content/service-training";

export const metadata: Metadata = {
  title: serviceTrainingMeta.title,
  description: serviceTrainingMeta.description,
};

/**
 * Training & Capacity Building — Figma
 * `B · Service Detail Template — Training & Capacity Building` (`56:329`),
 * seven sections in frame order. Header (`Grouped Dropdown`) and Footer
 * (`Original`) come from `MainLayout`, matching the frame's own instances.
 *
 * The template's `Service Hero` and `Service Module` components carry a
 * `Segment` axis; this service is Violet, passed once as `hue` and threaded
 * through every section so the page stays monochromatic (CLAUDE.md §3).
 *
 * `07 · Enquiry CTA` is the same panel as the homepage closing CTA, so it
 * reuses `ClosingCta` with this page's copy.
 */
export default function TrainingCapacityBuildingPage() {
  return (
    <>
      <ServiceDetailHeroSection hue="violet" content={hero} />
      <ServiceOverview hue="violet" content={overview} />
      <ServiceModules hue="violet" content={modules} />
      <ServiceOutcomes hue="violet" content={outcomes} />
      <ServiceMethodology hue="violet" content={methodology} />
      <RelatedServices content={related} />
      <ClosingCta content={enquiryCta} />
    </>
  );
}
