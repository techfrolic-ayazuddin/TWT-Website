/**
 * Consultation popup content — Figma `Form/Consultation` (`111:6601`) as
 * instantiated in `Overlay · Request a consultation` (`111:7317`).
 * Transcribed verbatim; typed and kept out of the components (CLAUDE.md §5).
 *
 * Copy Figma does not supply is marked `@placeholder`.
 */

import { services } from "./home";

export const consultation = {
  overline: "Request a consultation",
  title: "Tell us where you want to go.",
  requiredNote: "Fields marked * are required.",
  close: "Close consultation request",
  fields: {
    fullName: { label: "Full name", placeholder: "Your full name" },
    email: { label: "Work email", placeholder: "name@company.com" },
    phone: { label: "Phone number", placeholder: "Include your country code" },
    organisation: {
      label: "Company / Organisation",
      placeholder: "Your company or organisation",
    },
    area: {
      label: "Area of interest",
      placeholder: "Select an area of interest",
      /**
       * @placeholder Figma supplies no option list (its example value is
       * "Training & Capacity Building"). The four approved service pillars
       * are used until the client confirms the list.
       */
      options: services.pillars.map((pillar) => ({
        value: pillar.title,
        label: pillar.title,
      })),
    },
    message: {
      label: "Message",
      placeholder: "Tell us where you want to go and what must change…",
      maxLength: 500,
      minLength: 20,
    },
    consent: {
      label: "I agree to be contacted about my request",
      description: "Read our privacy policy.",
    },
  },
  errors: {
    fullName: "Please enter your full name.",
    email: "Please enter a valid work email address.",
    /** @placeholder Figma reuses the full-name text here; this is the Careers wording. */
    phone: "Please enter a valid phone number.",
    /** @placeholder Not in Figma. */
    organisation: "Please enter your company or organisation.",
    area: "Please choose an area of interest.",
    message: "Please tell us a little more (at least 20 characters).",
    /** @placeholder Not in Figma. */
    consent: "Please confirm we may contact you about your request.",
  },
  submit: "Send request",
  emailAlternative: { lead: "Prefer email?", email: "hello@theworkingtribe.com" },
  /**
   * @placeholder Not in Figma. There is no form backend yet (CLAUDE.md §9,
   * open decision #5), so nothing is sent and the acknowledgement state
   * (`State=Acknowledgement`) is never shown. This notice says so honestly;
   * replace it when a backend exists.
   */
  notSent: {
    title: "Requests are not open online yet",
    message:
      "Your details have not been sent. Online requests are still being set up — please email us in the meantime.",
  },
  /**
   * Figma `Form/Consultation` → `State=Acknowledgement` (`111:6601`),
   * transcribed verbatim — including the `Badge/Tone=Placeholder` Figma puts
   * on this copy. Rendered ONLY after a submission resolves `{ ok: true }`
   * (CLAUDE.md §9), which the live site never does.
   *
   * @placeholder The wording is marked DRAFT in Figma and needs client
   * approval. The automatic-reply it promises is also unspecified (§9).
   */
  acknowledgement: {
    overline: "Request received",
    title: "Thank you — we've received your request.",
    message:
      "A member of our team will be in touch to arrange an initial conversation. A confirmation has been sent to your email address.",
    draftBadge: "Draft wording — pending client approval",
    done: "Done",
  },
};
