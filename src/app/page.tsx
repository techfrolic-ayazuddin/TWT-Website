import { BrandIntro } from "@/components/sections/home/brand-intro";
import { ClientVoices } from "@/components/sections/home/client-voices";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Hero } from "@/components/sections/home/hero";
import { Industries } from "@/components/sections/home/industries";
import { Programmes } from "@/components/sections/home/programmes";
import { RegistrationProvider } from "@/components/sections/home/registration-dialog";
import { Services } from "@/components/sections/home/services";
import { closingCta } from "@/content/home";
import { WhyTwt } from "@/components/sections/home/why-twt";

/**
 * Homepage — Figma `Home — Desktop` (`46:95`), sections in frame order.
 *
 * The frame's own Header and Footer instances are not used: the approved
 * `Grouped Dropdown` header and `Original` footer come from `MainLayout`
 * (CLAUDE.md §10).
 */
export default function Page() {
  return (
    <RegistrationProvider>
      <Hero />
      <BrandIntro />
      <Services />
      <Industries />
      <WhyTwt />
      <Programmes />
      <ClientVoices />
      <ClosingCta content={closingCta} />
    </RegistrationProvider>
  );
}
