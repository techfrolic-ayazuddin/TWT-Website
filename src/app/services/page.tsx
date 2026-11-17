import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import {
  AdvisoryService,
  CapitalService,
  GlobalService,
  TrainingService,
} from "@/components/sections/services/service-pillars";
import {
  SectorMap,
  ServicesConnection,
  ServicesHero,
  WhyWorkWithUs,
} from "@/components/sections/services/services-sections";
import { servicesClosingCta, servicesMeta } from "@/content/services";

export const metadata: Metadata = {
  title: servicesMeta.title,
  description: servicesMeta.description,
};

/**
 * Services Overview — Figma `B0 · Services Overview — Desktop` (`85:923`),
 * nine sections in frame order. Header (`Grouped Dropdown`) and Footer
 * (`Original`) come from `MainLayout`, matching the frame's own instances.
 *
 * The four pillars are the approved service portfolio from `home.ts`; this
 * page adds only the overview copy the frame carries. The service detail
 * routes the sections link to are a later phase and are not stubbed.
 */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesConnection />
      <TrainingService />
      <AdvisoryService />
      <GlobalService />
      <CapitalService />
      <WhyWorkWithUs />
      <SectorMap />
      <ClosingCta content={servicesClosingCta} />
    </>
  );
}
