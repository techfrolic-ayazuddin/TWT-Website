import type { Metadata } from "next";
import { CareersApplication } from "@/components/sections/careers/application-form";
import { CareersHero, CareersSide } from "@/components/sections/careers/careers-sections";
import { careersMeta } from "@/content/careers";

export const metadata: Metadata = {
  title: careersMeta.title,
  description: careersMeta.description,
};

/**
 * Careers — Figma `G · Careers — Desktop` (`95:4335`), sections in frame
 * order. Header (`Grouped Dropdown`) and Footer (`Original`) come from
 * `MainLayout`, matching the frame's own instances.
 */
export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersApplication side={<CareersSide />} />
    </>
  );
}
