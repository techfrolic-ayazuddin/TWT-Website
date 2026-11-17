import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import {
  ContactEnquiry,
  ContactHero,
} from "@/components/sections/contact/contact-sections";
import { contactClosingCta, contactMeta } from "@/content/contact";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
};

/**
 * Contact us — Figma `E · Contact Us — Desktop` (`90:4009`), in frame order.
 *
 * The frame has three content sections: `01 · Page hero`, `02 · Enquiry` and
 * `05 · Closing CTA`. (`03 · Tribe Capital enquiry` and `04` are separate
 * frames, not sections of this page.) Header and footer come from
 * `MainLayout`, in the approved variants.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactEnquiry />
      <ClosingCta content={contactClosingCta} />
    </>
  );
}
