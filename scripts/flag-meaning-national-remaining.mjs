// Progress tracker for the NATIONAL-flag meaning sweep.
//
// The game shows a national flag for every top-level country in SUBDIVISION_META.
// A national flag is "done" when its ISO alpha-2 code is a key in FLAG_MEANINGS
// (src/data/flagMeanings.ts) — the "What this flag means" explainer the country
// widget renders via <FlagMeaning code={country.code} />.
//
// Usage:
//   node scripts/flag-meaning-national-remaining.mjs        → counts + remaining list
//   node scripts/flag-meaning-national-remaining.mjs XX ..  → mark-check specific codes
//
// Tracking aid for the sweep, NOT a build gate.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const meta = readFileSync(R("../src/lib/subdivisionMeta.ts"), "utf8");
const fm = readFileSync(R("../src/data/flagMeanings.ts"), "utf8");

const countries = [...meta.matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
const natKeys = new Set(
  [...fm.matchAll(/"([A-Z]{2})":\s*\{/g)].map((m) => m[1]),
);

const remaining = countries.filter((c) => !natKeys.has(c));

console.log(`country flags: ${countries.length}`);
console.log(`have explainer: ${countries.length - remaining.length}`);
console.log(`remaining:${remaining.length}`);
console.log(remaining.join(" "));
