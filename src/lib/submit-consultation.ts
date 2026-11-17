/**
 * Consultation request transport — DELIBERATELY NOT IMPLEMENTED.
 *
 * The form backend is an open decision (CLAUDE.md §9, §10 #5). Until it is
 * chosen this sends nothing and reports `not-configured`, so the popup shows
 * an honest "not sent" notice and never the acknowledgement. Replace the body
 * with the real request and return `{ ok: true }` only after it has succeeded.
 */

import { runMockSubmission } from "./submit/mock-submission";

export type ConsultationPayload = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  area: string;
  message: string;
  consent: true;
};

export type ConsultationResult =
  { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

export async function submitConsultation(
  payload: ConsultationPayload,
): Promise<ConsultationResult> {
  void payload;
  // Development-only. `runMockSubmission` returns null in production, so the
  // line below is what the live site always does (CLAUDE.md §9).
  const mocked = await runMockSubmission();
  if (mocked) return mocked;
  return { ok: false, reason: "not-configured" };
}
