// Build gate: the Learn-mode world-map grid's Show dropdown must keep every
// shipped classification, including Political parties.
//
// Regression this guards against: PR #1268 moved Political parties out of
// `GRID_CONTENT_TYPE_ORDER` into country drill-down only. The country tab is
// allowed to keep a per-country party grid, but the world-map Show menu must
// still list "Political parties" and FlagGrid/LearnPage must still render it.
//
// Run: node scripts/check-grid-content-types.mjs

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const REQUIRED_TYPES = [
  "flag",
  "coatofarms",
  "passport",
  "footballcrest",
  "olympiccommittee",
  "airline",
  "broadcaster",
  "tourismlogo",
  "newsagency",
  "newspaper",
  "party",
];

const contentTypeSrc = fs.readFileSync(
  path.join(root, "src/lib/gridContentType.ts"),
  "utf8",
);
const flagGridSrc = fs.readFileSync(
  path.join(root, "src/components/FlagGrid.tsx"),
  "utf8",
);
const learnPageSrc = fs.readFileSync(
  path.join(root, "src/pages/LearnPage.tsx"),
  "utf8",
);

const orderMatch = contentTypeSrc.match(
  /export const GRID_CONTENT_TYPE_ORDER: readonly GridContentType\[] = \[([\s\S]*?)\];/,
);
assert.ok(orderMatch, "Could not parse GRID_CONTENT_TYPE_ORDER");
const order = [...orderMatch[1].matchAll(/"([a-z]+)"/g)].map((m) => m[1]);

for (const t of REQUIRED_TYPES) {
  assert.ok(
    order.includes(t),
    `GRID_CONTENT_TYPE_ORDER is missing "${t}" — do not drop a Show-dropdown classification`,
  );
}

assert.ok(
  /party:\s*"Political parties"/.test(contentTypeSrc),
  'GRID_CONTENT_TYPE_LABELS must map party → "Political parties"',
);

assert.ok(
  flagGridSrc.includes("GRID_CONTENT_TYPE_ORDER.map"),
  "FlagGrid must render the Show dropdown from GRID_CONTENT_TYPE_ORDER (not a hand-copied subset)",
);

assert.ok(
  flagGridSrc.includes('effectiveContentType === "party"'),
  "FlagGrid must expand political-party cards when Show is Political parties",
);

assert.ok(
  /selectedPartyId/.test(flagGridSrc) && /selectedPartyId/.test(learnPageSrc),
  "FlagGrid and LearnPage must keep a selectedPartyId so a party card can stay highlighted",
);

assert.ok(
  learnPageSrc.includes('effectiveGridContentType === "party"'),
  "LearnPage must swap the world-map panel to PoliticalPartyDetails in the party Show view",
);

assert.ok(
  learnPageSrc.includes("<PoliticalPartyDetails"),
  "LearnPage must still mount PoliticalPartyDetails for the world-map party view",
);

assert.ok(
  flagGridSrc.includes("partyCardName("),
  "FlagGrid party cards must use partyCardName(), never a chamber abbreviation like LIB as the tile title",
);
assert.ok(
  /groupMode !== "none"/.test(flagGridSrc) &&
    flagGridSrc.includes('effectiveContentType === "party"'),
  "FlagGrid must not ideology-sort the party view when Group by is No grouping",
);

const partyGridSrc = fs.readFileSync(
  path.join(root, "src/components/PoliticalPartyGrid.tsx"),
  "utf8",
);
assert.ok(
  partyGridSrc.includes("partyCardName("),
  "PoliticalPartyGrid cards must use partyCardName(), never a chamber abbreviation as the tile title",
);
assert.ok(
  partyGridSrc.includes('none: "No grouping"'),
  'PoliticalPartyGrid must offer a "No grouping" mode that lists parties alphabetically',
);

console.log(
  `PASS: Show dropdown keeps ${order.length} classifications (${order.join(", ")}).`,
);
