import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { RegistrationProvider } from "@/components/sections/home/registration-dialog";
import {
  TrainingHero,
  TrainingYear,
} from "@/components/sections/training/training-intro";
import {
  TrainingProgrammes,
  TrainingRegistrationSteps,
} from "@/components/sections/training/training-programmes";
import {
  trainingClosingCta,
  trainingMeta,
  trainingOverlayDetails,
} from "@/content/training-programs";

export const metadata: Metadata = {
  title: trainingMeta.title,
  description: trainingMeta.description,
};

/**
 * Training Programs — Figma `Training Programs — Desktop` (`248:10353`),
 * sections in frame order. Header (`Grouped Dropdown`) and Footer
 * (`Original`) come from `MainLayout`.
 *
 * One registration overlay serves all four programmes (the homepage's
 * `RegistrationProvider`), with this page's "dates to be announced" details
 * line in place of the homepage's sample logistics.
 */
export default function TrainingProgramsPage() {
  return (
    <RegistrationProvider details={trainingOverlayDetails}>
      <TrainingHero />
      <TrainingYear />
      <TrainingProgrammes />
      <TrainingRegistrationSteps />
      <ClosingCta content={trainingClosingCta} />
    </RegistrationProvider>
  );
}
