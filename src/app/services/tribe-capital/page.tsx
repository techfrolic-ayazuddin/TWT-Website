import type { Metadata } from "next";
import { CapitalEnquirySection } from "@/components/sections/services/capital-enquiry-section";
import {
  RelatedServices,
  ServiceDetailHeroSection,
} from "@/components/sections/services/service-detail-sections";
import { hero, related, serviceCapitalMeta } from "@/content/service-capital";

export const metadata: Metadata = {
  title: serviceCapitalMeta.title,
  description: serviceCapitalMeta.description,
};

/**
 * Tribe Capital — the shared Service Detail template in its `Segment=Yellow`
 * variant (Figma `B2`, `56:761`), with the approved Tribe Capital enquiry
 * section (`104:5829`) in place of the template's generic `07 · Enquiry CTA`.
 *
 * Yellow is the one segment whose solid fill is a LIGHT surface: the hero
 * draws navy on it, driven by `segment/yellow/on-solid` (CLAUDE.md §8).
 *
 * **Only the sections with approved Tribe Capital content are rendered.**
 * Figma has no Tribe Capital service-detail frame, so the template's
 * Overview, Modules, Outcomes and Methodology sections have no copy and are
 * left out rather than invented (§6). All package definitions and KYC
 * timelines stay visibly provisional (§6.5).
 */
export default function TribeCapitalPage() {
  return (
    <>
      <ServiceDetailHeroSection hue="yellow" content={hero} />
      <CapitalEnquirySection />
      <RelatedServices content={related} />
    </>
  );
}
