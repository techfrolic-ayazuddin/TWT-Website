/**
 * Static export build — `npm run build:static`.
 *
 * Sets TWT_OUTPUT=export and runs `next build`. next.config.ts reads that
 * variable and only then adds `output: "export"`, `images.unoptimized` and
 * `trailingSlash`. The normal `npm run build` / `npm run dev` workflow is
 * unaffected.
 *
 * Written as a Node script rather than an inline env assignment so it works
 * the same on Windows (cmd and PowerShell), macOS and Linux without adding a
 * cross-env dependency.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

// A stale `out/` would otherwise keep files for routes that no longer exist.
await rm(outDir, { recursive: true, force: true });

const child = spawn(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, TWT_OUTPUT: "export" },
  },
);

child.on("exit", (code) => {
  if (code) process.exit(code);
  const n = flattenRscPayloads(outDir);
  console.log(`\n✓ static export complete → out/`);
  console.log(`  ${n} RSC payload alias(es) written (see note below)`);
  process.exit(0);
});

/**
 * Workaround for a Next.js 16.4.5 static-export bug.
 *
 * The export writes each route's React Server Component payload into a
 * DIRECTORY whose segments are real folders:
 *
 *     out/about/__next.about/__PAGE__.txt
 *
 * ...but the client runtime requests it as a single FILE with the segments
 * joined by dots:
 *
 *     /about/__next.about.__PAGE__.txt
 *
 * Nothing serves that path, so every prefetch 404s and the App Router falls
 * back to a full page load on every internal link — navigation still works,
 * it is just slower and noisy in the console.
 *
 * This copies each payload to the name the runtime asks for. It ADDS files;
 * it deletes nothing and changes no application code. Remove this function
 * once Next.js emits the flat name itself, and re-check the console.
 */
function flattenRscPayloads(dir) {
  let written = 0;

  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const abs = path.join(current, entry.name);
      if (!entry.isDirectory()) continue;

      if (entry.name.startsWith("__next.")) {
        // Every file under here becomes `<dirname>.<sub.path>` beside it.
        const collect = (sub, trail) => {
          for (const e of fs.readdirSync(sub, { withFileTypes: true })) {
            const p = path.join(sub, e.name);
            if (e.isDirectory()) collect(p, [...trail, e.name]);
            else {
              const flat = [entry.name, ...trail, e.name].join(".");
              fs.copyFileSync(p, path.join(current, flat));
              written++;
            }
          }
        };
        collect(abs, []);
      } else {
        walk(abs);
      }
    }
  };

  walk(dir);
  return written;
}
