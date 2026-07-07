// Guard: every subdivision that the map can RENDER must also exist in
// SUBDIVISION_META, or clicking it silently fails to select (LearnPage's
// onSelect looks the clicked geo code up in SUBDIVISION_META and no-ops when it
// is missing). See the CLAUDE.md hard rule "Every rendered subdivision must be
// selectable — geo and meta must not drift".
//
// This shipped (2026-07): the meta generator dropped every ISO 3166-2 code that
// merely *starts* with X (Xinjiang CN-XJ, Xorazm UZ-XO, Laos LA-XA/XI/XE,
// Azerbaijan AZ-XAC…) by matching `includes('-X')` when it only meant to skip the
// `-X#` placeholder island codes — so those provinces were unselectable on the
// map. This check fails the build if any renderable geo subdivision code is
// absent from SUBDIVISION_META.
//
// Run: node scripts/check-subdivision-meta-coverage.mjs   (part of `npm run flags:check`)

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const GEO_DIR = join(root, "public", "subdivisions");
const META = join(root, "src", "lib", "subdivisionMeta.ts");

// A geo code is EXPECTED to be absent from the meta when it is:
//   • a disputed/claimed hierarchy child or custom code (ends with "~"), or
//   • a custom PLACEHOLDER island code: "-X" followed by a digit (CN-X01~,
//     AU-X03~, AI-X00). Legitimate ISO codes that start with X (a LETTER after
//     the X — CN-XJ, UZ-XO, LA-XA) are NOT placeholders and MUST be present.
const isPlaceholder = (code) => code.endsWith("~") || /-X\d/.test(code);

// Parse SUBDIVISION_META into { CC: Set(codes) }.
const metaText = readFileSync(META, "utf8");
const meta = {};
for (const block of metaText.matchAll(/"([A-Z]{2})":\s*\{[\s\S]*?\n {2}\},/g)) {
  const cc = block[1];
  meta[cc] = new Set(
    [...block[0].matchAll(/code:\s*"([^"]+)"/g)].map((m) => m[1].trim().toUpperCase()),
  );
}

let missing = 0;
const report = [];
for (const file of readdirSync(GEO_DIR)) {
  const m = /^([A-Z]{2})\.json$/.exec(file);
  if (!m) continue;
  const cc = m[1];
  const fc = JSON.parse(readFileSync(join(GEO_DIR, file), "utf8"));
  const metaCodes = meta[cc] ?? new Set();
  const gaps = [];
  for (const feat of fc.features) {
    const code = (feat.properties?.iso_3166_2 || "").trim().toUpperCase();
    if (!code || isPlaceholder(code)) continue;
    if (!metaCodes.has(code)) {
      const name = feat.properties?.name_en || feat.properties?.name || "?";
      gaps.push(`${code} (${name})`);
    }
  }
  if (gaps.length) {
    missing += gaps.length;
    report.push(`  ${cc}: ${gaps.join(", ")}`);
  }
}

if (missing > 0) {
  console.error(
    `✗ ${missing} renderable subdivision(s) are missing from SUBDIVISION_META — clicking them on the map will silently fail to select:`,
  );
  console.error(report.join("\n"));
  console.error(
    "\nFix: re-run `node scripts/build-subdivision-meta.mjs` (and check its filters aren't dropping a legitimate code), or add the entry. Never leave a rendered geo subdivision without a meta entry.",
  );
  process.exit(1);
}

console.log("✓ Subdivision meta coverage OK — every renderable geo subdivision has a SUBDIVISION_META entry.");
