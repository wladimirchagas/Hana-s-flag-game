// Guard: the hierarchy table's per-type badge colour palette
// (TYPE_COLOR_PALETTE in src/components/SubdivisionHierarchyTable.tsx) must
// always have AT LEAST as many colours as the largest number of DISTINCT
// subdivision type labels any single country's hierarchy view shows at once.
//
// WHY THIS EXISTS:
// The badge colour used to be picked by hashing each type label independently
// into a small fixed palette (`hashString(label) % palette.length`). With
// ~100 distinct type labels used across ~195 countries and a palette of only
// 5 colours, two UNRELATED labels landing on the same colour was not a rare
// edge case — it was inevitable, and it shipped: Argentina's "Autonomous
// City" and "National Territory" both hashed to the same colour (reported
// 2026-07). A per-label hash can never guarantee distinctness because it has
// no visibility into which OTHER labels appear in the same country's view.
//
// The fix (`assignTypeColors()` in SubdivisionHierarchyTable.tsx) assigns
// colours for a whole country's view at once, guaranteeing no two distinct
// labels shown together ever collide — PROVIDED the palette has enough
// colours for the country that needs the most. This script is the guard on
// that proviso: it computes, from SUBDIVISION_META, the largest number of
// distinct type labels any single country's divisions carry, and fails the
// build if that ever exceeds the palette's length. Add another accent colour
// to BOTH TYPE_COLOR_PALETTE and src/index.css (light + dark) before adding a
// country/subdivision change that would trip this — never shrink the check
// or the palette to "make do".
//
// Run: node scripts/check-hierarchy-type-colors.mjs   (part of `npm run flags:check`)

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const META = join(root, "src", "lib", "subdivisionMeta.ts");
const TABLE = join(root, "src", "components", "SubdivisionHierarchyTable.tsx");

function parsePaletteLength(src) {
  const m = src.match(/const TYPE_COLOR_PALETTE\s*=\s*\[([^\]]*)\]/s);
  if (!m) throw new Error("Could not find TYPE_COLOR_PALETTE in SubdivisionHierarchyTable.tsx");
  const entries = m[1].match(/"var\(--[a-z-]+\)"/g) ?? [];
  return entries.length;
}

/** Distinct type labels per country, parsed straight from SUBDIVISION_META. */
function parseTypesByCountry(src) {
  const countryBlockRe = /"([A-Z]{2})":\s*\{\s*countryCode:[^]*?divisions:\s*\[([^]*?)\n\s*\],\s*\},/g;
  const entryRe = /\{\s*code:\s*"[^"]+",\s*name:\s*"(?:[^"\\]|\\.)*",\s*typeLabel:\s*"((?:[^"\\]|\\.)*)"/g;
  const byCountry = new Map();
  let m;
  while ((m = countryBlockRe.exec(src))) {
    const [, cc, body] = m;
    const types = new Set();
    let e;
    entryRe.lastIndex = 0;
    while ((e = entryRe.exec(body))) types.add(e[1]);
    byCountry.set(cc, types);
  }
  return byCountry;
}

function main() {
  const paletteLength = parsePaletteLength(readFileSync(TABLE, "utf8"));
  const byCountry = parseTypesByCountry(readFileSync(META, "utf8"));

  let worstCC = null;
  let worstCount = 0;
  const offenders = [];
  for (const [cc, types] of byCountry) {
    if (types.size > worstCount) {
      worstCount = types.size;
      worstCC = cc;
    }
    if (types.size > paletteLength) {
      offenders.push([cc, [...types]]);
    }
  }

  if (offenders.length > 0) {
    const detail = offenders
      .map(([cc, types]) => `  ${cc}: ${types.length} distinct types — ${types.join(", ")}`)
      .join("\n");
    console.error(
      `✗ TYPE_COLOR_PALETTE has only ${paletteLength} colour(s), but the following ` +
        `countr${offenders.length === 1 ? "y needs" : "ies need"} more (so at least two of its types ` +
        `would be forced to share a colour):\n${detail}\n\n` +
        `Fix: add another accent colour to TYPE_COLOR_PALETTE in ` +
        `src/components/SubdivisionHierarchyTable.tsx AND to src/index.css (both the light ":root" block ` +
        `and the dark "[data-theme=\\"dark\\"]" block) — never remove or weaken this check to let a ` +
        `collision through.`,
    );
    process.exit(1);
  }

  console.log(
    `✓ hierarchy type-colour palette has ${paletteLength} colour(s); the largest country (${worstCC}) ` +
      `needs only ${worstCount} — no two types in any single country's hierarchy view can collide.`,
  );
}

main();
