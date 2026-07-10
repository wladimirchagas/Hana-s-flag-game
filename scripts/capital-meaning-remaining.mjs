// Progress tracker for the capital-city flag-meaning sweep.
//
// A bundled capital-city flag (a key of CAPITAL_FLAGS in src/data/capitalFlags.ts)
// is "done" when it is EITHER present in CITY_FLAG_MEANINGS (src/data/cityFlagMeanings.ts)
// OR listed in scripts/data/capital-meaning-omitted.txt (a genuine, source-verified omission).
//
// Usage:
//   node scripts/capital-meaning-remaining.mjs            → overall counts + per-country remaining
//   node scripts/capital-meaning-remaining.mjs XX         → list the remaining codes for country XX
//
// This is a tracking aid for the sweep, NOT a build gate.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const flagsSrc = readFileSync(R("../src/data/capitalFlags.ts"), "utf8");
const meaningsSrc = readFileSync(R("../src/data/cityFlagMeanings.ts"), "utf8");
let omitted = "";
try { omitted = readFileSync(R("data/capital-meaning-omitted.txt"), "utf8"); } catch {}

const flagCodes = [...flagsSrc.matchAll(/"([A-Z]{2}-[A-Z0-9~]+)":\s*"capital-flags\//g)].map((m) => m[1]);
// meaning keys: only the object-literal keys (2-letter-dash-code strings before a colon+brace)
const meaningKeys = new Set(
  [...meaningsSrc.matchAll(/"([A-Z]{2}-[A-Z0-9~]+)":\s*\{/g)].map((m) => m[1]),
);
const omittedKeys = new Set(
  omitted.split("\n").map((l) => l.split("#")[0].trim()).filter(Boolean),
);

const arg = process.argv[2];
const remaining = flagCodes.filter((c) => !meaningKeys.has(c) && !omittedKeys.has(c));

if (arg) {
  const cc = arg.toUpperCase();
  const list = remaining.filter((c) => c.startsWith(cc + "-"));
  console.log(`${cc}: ${list.length} remaining`);
  console.log(list.join(" "));
} else {
  const byCC = {};
  for (const c of remaining) { const cc = c.slice(0, 2); byCC[cc] = (byCC[cc] || 0) + 1; }
  const rows = Object.entries(byCC).sort((a, b) => a[0].localeCompare(b[0]));
  console.log(`total bundled capital flags: ${flagCodes.length}`);
  console.log(`done (sourced ${meaningKeys.size} + omitted ${omittedKeys.size}): ${flagCodes.length - remaining.length}`);
  console.log(`remaining:${remaining.length}`);
  console.log("\nremaining by country:");
  console.log(rows.map(([cc, n]) => `${cc}:${n}`).join("  "));
}
