/**
 * Careers content — Figma `G · Careers — Desktop` (`95:4335`), the upload &
 * validation states reference (`95:4605`) and the acknowledgement state
 * (`G2 · Careers — Application received`, `95:4887`). Transcribed verbatim.
 * Typed and kept out of the components (CLAUDE.md §5).
 *
 * Nothing here is invented. Copy Figma does not supply is marked
 * `@placeholder`.
 */

import type { HomeLink } from "./home";
import { services } from "./home";
import { offices } from "./site";

export const careersMeta = {
  title: "Careers",
  description:
    "We are always glad to hear from people who share our commitment to service, excellence and lasting, people-first change.",
};

/* ------------------------------------------------------------ 01 Page hero */

export const careersHero = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Careers" }] as {
    label: string;
    href?: string;
  }[],
  eyebrow: "Careers",
  title: "Join The Working Tribe.",
  intro:
    "We are always glad to hear from people who share our commitment to service, excellence and lasting, people-first change. Share your CV and tell us where you would like to contribute.",
  /** Scrolls to the application form on this page. */
  cta: { label: "Apply now", href: "#application" },
  /**
   * Figma `Image · arch` (`95:4415`) — a 1122 × 1402 original exported
   * unmodified. The fill is a plain centred `FILL` in a 460 × 600 window, which
   * is exactly CSS `object-cover` (verified against Figma's render: MAD
   * 1.08/255). Replaced in the 2026-11-18 sync; the previous photograph is
   * gone.
   *
   * The file carries OpenAI/ChatGPT C2PA provenance (AI-generated), so there
   * is no photographer credit to record.
   *
   * @placeholder AI-generated imagery supplied through Figma — confirm with
   * the client that it is final (CLAUDE.md §6.4).
   */
  image: {
    src: "/images/careers-hero-team.jpg",
    alt: "Three colleagues smiling together over a laptop at a meeting table",
  },
  valuesCard: {
    label: "What we value",
    values: ["Service", "People before process", "Excellence as standard"],
  },
};

/* ------------------------------------------------------- 02 Application */

export type SelectOption = { value: string; label: string };

export const applicationForm = {
  overline: "Application form",
  title: "Submit your application",
  requiredNote: "Fields marked * are required.",
  fields: {
    fullName: { label: "Full name", placeholder: "Your full name" },
    email: { label: "Email address", placeholder: "name@example.com" },
    phone: { label: "Phone number", placeholder: "Include your country code" },
    region: {
      label: "Region",
      placeholder: "Select your region",
      /**
       * @placeholder Figma supplies no option list for this dropdown. These
       * are the two office regions in the approved footer content (the
       * acknowledgement sample reads "African Region"). Client to confirm
       * the list — e.g. whether applicants outside these regions need an
       * option.
       */
      options: offices.map((office) => ({
        value: office.name,
        label: office.name,
      })) as SelectOption[],
    },
    areaOfInterest: {
      label: "Area of interest",
      placeholder: "Select an area of interest",
      /**
       * @placeholder Figma supplies no option list (the acknowledgement shows
       * "[Selected area of interest]"). The four approved service pillars are
       * used until the client confirms the list.
       */
      options: services.pillars.map((pillar) => ({
        value: pillar.title,
        label: pillar.title,
      })) as SelectOption[],
    },
    message: {
      label: "Message (optional)",
      placeholder:
        "Tell us a little about yourself and the kind of work you would like to do…",
      maxLength: 500,
    },
    cv: {
      label: "CV upload",
      prompt: "Drag and drop your CV here, or browse files",
      dropPrompt: "Drop your CV to upload",
      /** @placeholder Accepted formats and maximum size await client confirmation. */
      formats: "Accepted formats and maximum size to be confirmed",
      helper: "Upload your CV in an accepted format.",
      success: "CV ready to submit.",
      errorCaption: "File could not be uploaded",
    },
    consent: {
      label: "I agree to my details being used to assess my application",
      description: "Read our privacy policy.",
    },
  },
  errors: {
    fullName: "Please enter your full name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
    region: "Please choose your region.",
    areaOfInterest: "Please choose an area of interest.",
    cvRejected:
      "This file couldn’t be accepted. Check the format and size, then try again.",
    /** @placeholder Not in Figma — no designed message for a missing CV. */
    cvMissing: "Please upload your CV.",
    /** @placeholder Not in Figma — no designed message for the consent box. */
    consent: "Please confirm we may use your details to assess your application.",
  },
  submit: "Submit application",
  /**
   * @placeholder Not in Figma. There is no form backend yet (CLAUDE.md §9,
   * open decision #5), so nothing is sent and the acknowledgement never
   * renders. This notice says so honestly; replace it when a backend exists.
   */
  notSent: {
    title: "Applications are not open online yet",
    message:
      "Your details and CV have not been sent. Online applications are still being set up — please email your CV to us in the meantime.",
  },
};

/**
 * CV rules. @placeholder Figma: "Accepted formats and maximum size to be
 * confirmed". Until the client confirms them, any file type and size is
 * accepted; only an empty (0-byte) file is rejected, since it cannot be a CV.
 * Set these once confirmed and the designed Error state follows automatically.
 */
export const cvRules: { accept?: string; maxBytes?: number } = {};

export const careersSide = {
  include: {
    overline: "Before you apply",
    title: "What to include",
    items: [
      "Your up-to-date CV",
      "The region you are based in",
      "The area you would like to contribute to",
      "Anything else you would like us to know (optional)",
    ],
  },
  values: {
    overline: "Our core values",
    title: "The standard we hold ourselves to.",
    chips: [
      "Service",
      "People before process",
      "Excellence as standard",
      "Commitment",
      "Adaptability",
    ],
  },
  questions: {
    lead: "Questions?",
    email: "hello@theworkingtribe.com",
  },
};

/* --------------------------------- Acknowledgement (G2, after real success) */

export const applicationReceived = {
  overline: "Application received",
  title: "Thank you — your application has been received.",
  body: "Thank you for your interest in The Working Tribe. Our team will review your application, and a confirmation email will be sent to the address you provided.",
  summaryLabel: "Application summary",
  rows: {
    name: "Name",
    region: "Region",
    areaOfInterest: "Area of interest",
    cv: "CV",
  },
  back: { label: "Back to Careers", href: "/careers", status: "live" } as HomeLink,
  explore: {
    label: "Explore our services",
    href: "/services",
    status: "live",
  } as HomeLink,
};
