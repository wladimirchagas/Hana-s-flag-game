// Guard: every disputed/claimed territory that is MERGED into the map of the
// nation claiming it must be a first-class subdivision of that nation — present
// in SUBDIVISION_META (so it is a selectable flag-grid card that can show its
// flag and its disputed-nature note) AND carry a capital (so the capital overlay
// names it). See the CLAUDE.md hard rule "A merged disputed territory must be a
// complete subdivision of the nation that claims it".
//
// This shipped repeatedly (2026-07): a disputed territory's geometry was merged
// into the claiming country via TERRITORY_GEO_FOR_PARENT (tagged with its
// subdivCode, e.g. RS-KM~ Kosovo under Serbia, SO-SL~ Somaliland under Somalia,
// CY-NC~ Northern Cyprus under Cyprus, MA-EH~ Western Sahara under Morocco) but
// that subdivCode was NEVER added to the claiming nation's SUBDIVISION_META. The
// polygon rendered, but it had no card, no capital and no disputed-note — because
// the meta (which the flag grid and the capital overlay both iterate) never
// listed it. This check fails the build if any such territory is incomplete.
//
// Run: node scripts/check-disputed-territory-coverage.mjs   (part of `npm run flags:check`)

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

// 1) Merged territory mappings: parent country -> [{ geoCode, subdivCode }].
const tpm = read("src/lib/territoryParentMap.ts");
const mapBlock = tpm.slice(tpm.indexOf("TERRITORY_GEO_FOR_PARENT"));
const mappings = [];
let parent = null;
for (const line of mapBlock.split("\n")) {
  const pm = line.match(/^\s*([A-Z]{2}):\s*\[/);
  if (pm) parent = pm[1];
  const gm = line.match(/geoCode:\s*"([^"]+)",\s*subdivCode:\s*"([^"]+)"/);
  if (gm && parent) mappings.push({ parent, subdivCode: gm[2] });
}

// 2) SUBDIVISION_META: parent -> Set(codes).
const meta = read("src/lib/subdivisionMeta.ts");
const metaByCC = {};
for (const b of meta.matchAll(/"([A-Z]{2})":\s*\{[\s\S]*?\n {2}\},/g)) {
  metaByCC[b[1]] = new Set([...b[0].matchAll(/code:\s*"([^"]+)"/g)].map((m) => m[1]));
}

// 3) Capitals present, and hierarchy children (intentionally hidden — no card).
const caps = new Set(
  [...read("src/data/subdivisionCapitals.ts").matchAll(/"([^"]+)":\s*\{/g)].map((m) => m[1]),
);
const ds = read("src/lib/disputedSubdivisions.ts");
const hierBlock = ds.slice(ds.indexOf("DISPUTED_TERRITORY_HIERARCHY"));
const hierarchyChildren = new Set(
  [...hierBlock.matchAll(/"([A-Z0-9~-]+)":\s*"/g)].map((m) => m[1]),
);

// A subdivCode is a DISPUTED territory when it carries the "~" custom suffix or is
// the one hyphenated disputed code (CN-TW). Hierarchy children are replaced by a
// parent subdivision and never rendered as their own card, so they are exempt.
const isDisputed = (code) => code.endsWith("~") || code === "CN-TW";

const problems = [];
for (const { parent, subdivCode } of mappings) {
  if (!isDisputed(subdivCode) || hierarchyChildren.has(subdivCode)) continue;
  const inMeta = (metaByCC[parent] ?? new Set()).has(subdivCode);
  if (!inMeta) {
    problems.push(
      `${subdivCode}: merged into ${parent}'s map but MISSING from ${parent}'s SUBDIVISION_META ` +
        `(add it to TERRITORIES_TO_APPEND["${parent}"] in scripts/build-subdivision-meta.mjs and re-run it).`,
    );
  }
  if (!caps.has(subdivCode)) {
    problems.push(
      `${subdivCode}: has no capital in src/data/subdivisionCapitals.ts ` +
        `(add it to DISPUTED_CAPITAL_QIDS or DISPUTED_CAPITAL_CITY_QIDS in ` +
        `scripts/build-subdivision-capitals.mjs and re-run it).`,
    );
  }
}

if (problems.length) {
  console.error(
    `✗ ${problems.length} disputed-territory coverage problem(s) — a territory shown under the nation that claims it is incomplete:`,
  );
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(
  "✓ Disputed-territory coverage OK — every merged disputed territory is a complete subdivision (meta + capital) of the nation claiming it.",
);
