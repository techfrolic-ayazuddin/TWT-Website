/**
 * ──────────────────────────────────────────────────────────────────────────
 * DEVELOPMENT-ONLY mock submission adapter.
 *
 * THIS NEVER RUNS ON THE LIVE SITE. Every entry point is gated on
 * `process.env.NODE_ENV !== "production"`, which Next replaces statically at
 * build time, so in a production build the guard is `false` and the body is
 * dead code.
 *
 * Why it exists: the form backend is still an open decision (CLAUDE.md §9,
 * §10 #5), so all four transports return `not-configured` and no form can
 * reach its Loading or Acknowledgement state. That makes those designed
 * states impossible to review. This adapter simulates an asynchronous
 * success or failure so they can be exercised in Storybook and in `next dev`
 * — and nowhere else.
 *
 * Two ways to arm it, both development-only:
 *
 *   1. Storybook / tests — `setMockSubmission({ outcome: "success" })`.
 *   2. `npm run dev` — add `?mock=success`, `?mock=failure` or
 *      `?mock=not-configured` to any page URL carrying a form. Handy for
 *      checking the states at 1440 / 768 / 375 in a real browser.
 *
 * When nothing is armed it returns `null` and the caller falls through to its
 * real (unimplemented) transport, so the default behaviour is unchanged.
 *
 * Replacing this with a real backend means editing the four `submit-*.ts`
 * transports, NOT this file. Delete it once a backend exists.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** Marker used by the production-bundle check in `scripts/check-no-mock.mjs`. */
export const MOCK_SUBMISSION_MARKER = "TWT_DEV_ONLY_MOCK_SUBMISSION";

export type MockOutcome = "success" | "failure" | "not-configured";

export type MockSubmissionConfig = {
  outcome: MockOutcome;
  /** Simulated round-trip, so the Loading state is observable. */
  delayMs?: number;
};

/** A transport result shared by every form. */
export type MockResult =
  { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

/** True only outside a production build. */
export const mockingAllowed = process.env.NODE_ENV !== "production";

let armed: MockSubmissionConfig | null = null;

/**
 * Arms (or with `null`, disarms) the mock. No-ops in production.
 * Storybook stories call this; application code must not.
 */
export function setMockSubmission(config: MockSubmissionConfig | null): void {
  if (!mockingAllowed) return;
  armed = config;
}

export function getMockSubmission(): MockSubmissionConfig | null {
  return mockingAllowed ? armed : null;
}

/** Reads `?mock=…` in the browser during development only. */
function outcomeFromUrl(): MockOutcome | null {
  if (!mockingAllowed || typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("mock");
  return value === "success" || value === "failure" || value === "not-configured"
    ? value
    : null;
}

/**
 * Returns a simulated result, or `null` when no mock is armed — in which case
 * the caller falls through to its real transport. Always `null` in production.
 */
export async function runMockSubmission(): Promise<MockResult | null> {
  if (!mockingAllowed) return null;

  const fromUrl = outcomeFromUrl();
  const config = fromUrl ? { outcome: fromUrl, delayMs: 700 } : armed;
  if (!config) return null;

  const delay = config.delayMs ?? 700;
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

  switch (config.outcome) {
    case "success":
      return { ok: true };
    case "failure":
      return { ok: false, reason: "network" };
    case "not-configured":
      return { ok: false, reason: "not-configured" };
  }
}
