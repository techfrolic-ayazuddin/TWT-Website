import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { WhyApproach, WhyExpertise } from "@/components/sections/why-twt/approach";
import { WhyHero, WhyPhilosophy } from "@/components/sections/why-twt/page-hero";
import { WhyChoose } from "@/components/sections/why-twt/why-choose";
import { whyClosingCta, whyMeta } from "@/content/why-twt";

export const metadata: Metadata = {
  title: whyMeta.title,
  description: whyMeta.description,
};

/**
 * Why TWT — Figma `I · Why TWT — Desktop` (`108:5091`), sections in frame
 * order. Header (`Grouped Dropdown`) and Footer (`Original`) come from
 * `MainLayout`, matching the frame's own instances.
 */
export default function WhyTwtPage() {
  return (
    <>
      <WhyHero />
      <WhyPhilosophy />
      <WhyChoose />
      <WhyApproach />
      <WhyExpertise />
      <ClosingCta content={whyClosingCta} />
    </>
  );
}
