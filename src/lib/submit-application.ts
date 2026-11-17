/**
 * Careers application transport — DELIBERATELY NOT IMPLEMENTED.
 *
 * The form backend is an open decision (CLAUDE.md §9, §10 #5): Google Forms,
 * Sheets, Apps Script or something else. Until it is chosen, this function
 * sends nothing and reports `not-configured`, so the form shows an honest
 * "not sent" notice and never the acknowledgement (CLAUDE.md §9: no success
 * state before a real successful submission).
 *
 * When a backend exists, replace the body with the real request and return
 * `{ ok: true }` only after it has succeeded. The automatic acknowledgement
 * email is also deferred to that point.
 */

import { runMockSubmission } from "./submit/mock-submission";

export type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  areaOfInterest: string;
  message: string;
  cv: File;
  consent: true;
};

export type SubmitResult =
  { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

export async function submitApplication(
  payload: ApplicationPayload,
): Promise<SubmitResult> {
  void payload;
  // Development-only. `runMockSubmission` returns null in production, so the
  // line below is what the live site always does (CLAUDE.md §9).
  const mocked = await runMockSubmission();
  if (mocked) return mocked;
  return { ok: false, reason: "not-configured" };
}
