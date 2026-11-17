/**
 * Tribe Capital enquiry transport — DELIBERATELY NOT IMPLEMENTED.
 *
 * The form backend is an open decision (CLAUDE.md §9, §10 #5). Until it is
 * chosen this sends nothing and reports `not-configured`, so the form shows an
 * honest "not sent" notice and never Figma's `State=Acknowledgement`
 * (`Form/Tribe Capital Enquiry`, `111:7297`). Replace the body with the real
 * request and return `{ ok: true }` only after it has succeeded.
 *
 * NOTE: this carries a package selection. The three packages and their KYC
 * timelines are PROVISIONAL (CLAUDE.md §6.5) — whatever backend is wired up
 * must not treat a selection as an agreed commitment.
 */

import { runMockSubmission } from "./submit/mock-submission";

export type CapitalEnquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  /** One of the provisional package names. */
  packageName: string;
  message: string;
  consent: true;
};

export type CapitalEnquiryResult =
  { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

export async function submitCapitalEnquiry(
  payload: CapitalEnquiryPayload,
): Promise<CapitalEnquiryResult> {
  void payload;
  // Development-only. `runMockSubmission` returns null in production, so the
  // line below is what the live site always does (CLAUDE.md §9).
  const mocked = await runMockSubmission();
  if (mocked) return mocked;
  return { ok: false, reason: "not-configured" };
}
