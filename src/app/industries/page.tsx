import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Programmes } from "@/components/sections/home/programmes";
import { RegistrationProvider } from "@/components/sections/home/registration-dialog";
import {
  IndustriesHero,
  SectorEnquiry,
  Specialisations,
  WhoWeServe,
} from "@/components/sections/industries/industries-sections";
import { Sectors } from "@/components/sections/industries/sector-sections";
import {
  industriesClosingCta,
  industriesMeta,
  industriesProgrammes,
} from "@/content/industries";
import { trainingOverlayDetails } from "@/content/training-programs";

export const metadata: Metadata = {
  title: industriesMeta.title,
  description: industriesMeta.description,
};

/**
 * Industries — Figma `C · Industries — Desktop` (`57:502`), sections in frame
 * order. Header (`Grouped Dropdown`) and Footer (`Original`) come from
 * `MainLayout`, matching the frame's own instances.
 *
 * The frame's hidden layers (the dark `01b · Specialisations` marquee and the
 * superseded `Sector index`) are not built: the visible Light marquee is the
 * approved visual reference; the dark variant is available as
 * `<IndustryMarquee tone="dark">` pending open decision #1.
 *
 * The Training Programs block is the frame's newer variant (dates "to be
 * announced"), so its registration overlay uses the same "dates to be
 * announced" details line as the Training Programs page.
 */
export default function IndustriesPage() {
  return (
    <RegistrationProvider details={trainingOverlayDetails}>
      <IndustriesHero />
      <Specialisations />
      <WhoWeServe />
      <Sectors />
      <SectorEnquiry />
      <Programmes content={industriesProgrammes} />
      <ClosingCta content={industriesClosingCta} />
    </RegistrationProvider>
  );
}
