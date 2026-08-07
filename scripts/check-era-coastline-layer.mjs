// Build gate for GOAL 1: the natural world must be the same in every era, AND it must be
// RENDERED, not merely stored.
//
// restore-era-geometry.mjs pins the era polygons to the authoritative import, and
// check-era-landmass.mjs catches a polygon drawn out to sea. Neither can see the other half
// of goal 1: the era files carry POLITIES, not land, so a region no polity covered has no
// feature at all — and a renderer that draws only the era's features paints it with nothing.
// Against an ocean-coloured sphere that reads as SEA. That shipped (2026-08): on the 500 BC
// map Greece looked like an island, Italy was severed below the Po, Jutland was open water.
//
// The fix was structural — HistoricalMap draws public/countries-50m.json as a hatched base
// layer under every era — but nothing stopped a later change from removing it, because it
// produces no build, type or lint error. This script is that guard. It checks the render
// path, not the data:
//
//   1. the base land layer is still drawn from the shared topology (countries-50m.json);
//   2. it is unconditional — not gated on the era, a theme, a zoom level or a flag;
//   3. it carries pointerEvents="none", so it can never swallow a click meant for a polity;
//   4. the coastline reconciliation band is still clipped to that land layer (unclipped, it
//      would paint sea — the one thing check-era-landmass.mjs exists to prevent);
//   5. the band is still pre-grown once per era, never a stroke and never stamped <use>
//      copies (both were measured 5–7× slower on the heaviest era);
//   6. the era topology file itself is present and is the same one WorldProgressMap draws,
//      so the two maps can never disagree about where the coast is.
//
// Run: node scripts/check-era-coastline-layer.mjs   (npm run maps:check-coastline)

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const failures = [];
const src = readFileSync(R("../src/components/HistoricalMap.tsx"), "utf8");
const worldSrc = readFileSync(R("../src/components/WorldProgressMap.tsx"), "utf8");

/* 1 — the layer exists and comes from the shared topology ------------------- */
const landUrl = src.match(/const LAND_URL = `\$\{import\.meta\.env\.BASE_URL\}([^`]+)`/);
if (!landUrl) {
  failures.push(
    "HistoricalMap.tsx no longer defines LAND_URL from BASE_URL — the base land layer is the only thing keeping unmapped land from reading as ocean (the \"Greece looked like an island\" bug).",
  );
} else {
  const file = landUrl[1];
  if (!existsSync(R(`../public/${file}`))) {
    failures.push(`LAND_URL points at public/${file}, which is not bundled.`);
  }
  if (!worldSrc.includes(file)) {
    failures.push(
      `HistoricalMap draws "${file}" but WorldProgressMap does not — both maps must draw the SAME topology, or they will disagree about where the coastline is.`,
    );
  }
}

/* 2 — the land <path> is rendered, hatched, and not era-conditional --------- */
// Anchored on the hatch pattern's own id, not just `{landPath && (` — several sibling
// blocks are gated on landPath (the reconciliation bands), and matching the first one
// reported a false failure.
const landPathBlock = src.match(/\{landPath && \([\s\S]{0,900}?url\(#hm-nodata\)[\s\S]{0,600}?\)\}/);
if (!landPathBlock) {
  failures.push(
    "Could not find the `{landPath && (…)}` base-layer render block in HistoricalMap.tsx. If the layer moved, update this check — do not delete the layer.",
  );
} else {
  const block = landPathBlock[0];
  if (!/pointerEvents="none"/.test(block)) {
    failures.push(
      "The base land layer no longer carries pointerEvents=\"none\" — it sits over the interactive polity paths and would swallow selection clicks.",
    );
  }
  if (!/#hm-nodata/.test(block)) {
    failures.push(
      "The base land layer no longer uses the \"no data\" hatch fill. Unmapped land must stay visually distinct from BOTH ocean and a real polity — painting it like a country implies data we do not have.",
    );
  }
  if (/eraId\s*===|era\.id\s*===|isEra|\?\s*landPath\s*:/.test(block)) {
    failures.push(
      "The base land layer looks conditional on the era. It must render under EVERY era, unconditionally.",
    );
  }
}

/* 3 — the reconciliation band stays clipped to the land ---------------------- */
if (!/COASTLINE_MATCH_TOLERANCE/.test(src)) {
  failures.push(
    "COASTLINE_MATCH_TOLERANCE is gone — the coastline reconciliation band is what stops each polity wearing a hatched shadow along its own coast (the 1945 Philippines report).",
  );
}
if (!/clipPath|clip-path/.test(src)) {
  failures.push(
    "The reconciliation band is no longer clipped. Unclipped, growing a polity paints open SEA — exactly what check-era-landmass.mjs exists to prevent.",
  );
}
if (/growProjectedPath\(/.test(src) === false) {
  failures.push(
    "growProjectedPath() is gone. The band must be pre-grown once per era: a fat stroke cost 1.88 s of main-thread time over five zoom steps against 0.37 s without it, and stamped <use> copies cost 4.9 s to drag-pan a route that costs 0.67 s.",
  );
}
if (/vectorEffect="non-scaling-stroke"[^]]{0,200}(band|grow)/i.test(src)) {
  failures.push(
    "The reconciliation band appears to use a screen-space stroke. The mismatch it hides is a fixed distance on the ground, so a screen-space fix unravels the moment the user zooms in.",
  );
}

/* 4 — every era file still exists (a missing one renders an empty world) ----- */
const { ERAS } = await import(R("../src/lib/historicalEras.ts"));
for (const era of ERAS) {
  if (!era.dataUrl) continue;
  if (!existsSync(R(`../public/${era.dataUrl}`))) {
    failures.push(`Era "${era.id}" points at public/${era.dataUrl}, which is missing.`);
  }
}

const eraCount = ERAS.filter((e) => e.dataUrl).length;
console.log(
  `Era coastline layer: base land drawn from ${landUrl?.[1] ?? "?"} under all ${eraCount} era maps, ` +
    `hatched, pointer-transparent, with the reconciliation band clipped to it.`,
);

if (failures.length > 0) {
  console.error(`\n✗ era coastline-layer check FAILED\n`);
  for (const f of failures) console.error(`  • ${f}`);
  process.exit(1);
}

console.log("\n✓ goal 1 render path intact — unmapped land still reads as land in every era.");
