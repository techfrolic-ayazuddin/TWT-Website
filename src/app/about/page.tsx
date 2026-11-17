import type { Metadata } from "next";
import { CoreValues, Differentiators } from "@/components/sections/about/core-values";
import { AboutHero } from "@/components/sections/about/page-hero";
import { Philosophy } from "@/components/sections/about/philosophy";
import { Positioning, VisionMission } from "@/components/sections/about/positioning";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { aboutClosingCta, aboutMeta } from "@/content/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

/**
 * About Us — Figma `A · About Us — Desktop` (`54:95`), sections in frame
 * order. Header (`Grouped Dropdown`) and Footer (`Original`) come from
 * `MainLayout`, matching the frame's own instances.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Positioning />
      <VisionMission />
      <CoreValues />
      <Philosophy />
      <Differentiators />
      <ClosingCta content={aboutClosingCta} />
    </>
  );
}
