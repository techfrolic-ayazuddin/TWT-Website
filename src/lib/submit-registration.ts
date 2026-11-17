/**
 * Training registration transport — DELIBERATELY NOT IMPLEMENTED.
 *
 * The form backend is an open decision (CLAUDE.md §9, §10 #5). Until it is
 * chosen this sends nothing and reports `not-configured`, so the popup shows
 * an honest "not sent" notice. Replace the body with the real request and
 * return `{ ok: true }` only after it has succeeded.
 *
 * Added in Phase 6.0. Before that the registration popup had no transport at
 * all: a valid submit set a local flag and showed the notice directly, so it
 * could never reach a Loading state. It now matches the other three forms.
 *
 * NOTE: `Modal/Registration` (`95:5568`) has only `State=Default` and
 * `State=Validation` in Figma — there is **no designed acknowledgement** for
 * this form (see `registration.acknowledgement` in `content/home.ts`).
 */

import { runMockSubmission } from "./submit/mock-submission";

export type RegistrationPayload = {
  /** Which seasonal programme the visitor is registering for. */
  programme: string;
  fullName: string;
  email: string;
  organization: string;
  consent: true;
};

export type RegistrationResult =
  { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

export async function submitRegistration(
  payload: RegistrationPayload,
): Promise<RegistrationResult> {
  void payload;
  // Development-only. `runMockSubmission` returns null in production, so the
  // line below is what the live site always does (CLAUDE.md §9).
  const mocked = await runMockSubmission();
  if (mocked) return mocked;
  return { ok: false, reason: "not-configured" };
}
