/**
 * Proves the development-only mock submission adapter cannot reach production.
 *
 * Run after `npm run build`. Two independent checks:
 *
 *   1. STATIC   — the production client bundles contain none of the mock's
 *                 identifiers. `process.env.NODE_ENV !== "production"` is
 *                 replaced at build time, so the adapter is dead code and is
 *                 dropped.
 *   2. CONTRACT — `src/lib/submit-*.ts` still fall through to
 *                 `{ ok: false, reason: "not-configured" }`, which is what the
 *                 live site returns for every form (CLAUDE.md §9).
 *
 * A behavioural check — serving the production build and submitting with
 * `?mock=success` — lives in the Phase 6.0 verification harness; this script
 * is the one that can run in CI.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, ".next");

/** Strings that must never appear in a production bundle. */
const FORBIDDEN = [
  "TWT_DEV_ONLY_MOCK_SUBMISSION",
  "setMockSubmission",
  "runMockSubmission",
  "mockingAllowed",
];

if (!fs.existsSync(buildDir)) {
  console.error("✗ no .next directory — run `npm run build` first");
  process.exit(1);
}

/**
 * Only `static/` (served to browsers) and `server/` (executed on the server)
 * are shipped production output.
 *
 * Deliberately NOT scanned:
 *   · `.next/dev`   — the `next dev` server's own chunks. If a dev server has
 *                     run in this checkout they sit beside the build and do
 *                     contain the adapter, which is exactly as intended.
 *   · `.next/cache` — Turbopack's intermediate modules, never shipped.
 *   · `*.map`       — source maps embed original source text, including
 *                     comments. They are build artefacts, are not executed,
 *                     and are not served in production.
 */
const scanRoots = ["static", "server"]
  .map((d) => path.join(buildDir, d))
  .filter((d) => fs.existsSync(d));

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs);
    else if (/\.(js|mjs|cjs)$/.test(entry.name)) files.push(abs);
  }
};
scanRoots.forEach(walk);

const hits = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const needle of FORBIDDEN) {
    if (text.includes(needle)) {
      hits.push(`${path.relative(root, file)} :: ${needle}`);
    }
  }
}

console.log(
  `scanned ${files.length} executable files in .next/{static,server} (dev chunks and source maps excluded by design)`,
);

if (hits.length) {
  console.error("\n✗ mock adapter identifiers found in the production build:");
  hits.slice(0, 20).forEach((h) => console.error("   " + h));
  process.exit(1);
}
console.log("✓ STATIC: no mock adapter identifiers in the production build");

/* --------------------------------------------------- 2. transport contract */

const transports = [
  "src/lib/submit-consultation.ts",
  "src/lib/submit-registration.ts",
  "src/lib/submit-application.ts",
  "src/lib/submit-capital-enquiry.ts",
];

let contractOk = true;
for (const rel of transports) {
  const text = fs.readFileSync(path.join(root, rel), "utf8");
  const fallsThrough = /return \{ ok: false, reason: "not-configured" \};\s*\n\}/.test(
    text,
  );
  // Nothing may return ok:true outside the mock indirection.
  const returnsTrue = /return \{ ok: true \}/.test(text);
  if (!fallsThrough || returnsTrue) {
    contractOk = false;
    console.error(
      `✗ ${rel}: ${!fallsThrough ? "no not-configured fallthrough" : "returns ok:true directly"}`,
    );
  }
}
if (!contractOk) process.exit(1);
console.log(
  `✓ CONTRACT: all ${transports.length} transports fall through to not-configured`,
);
