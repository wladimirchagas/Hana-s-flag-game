// Build gate: the Learn-mode world-map grid's Show dropdown must keep every
// shipped classification, including Political parties.
//
// Regression this guards against: PR #1268 moved Political parties out of
// `GRID_CONTENT_TYPE_ORDER` into country drill-down only. The country tab is
// allowed to keep a per-country party grid, but the world-map Show menu must
// still list "Political parties" and FlagGrid/LearnPage must still render it.
//
// It also locks PR #1478: party tiles use partyCardName() (Liberal, not LIB)
// and the ungrouped / A–Z views sort alphabetically, not by ideology.
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

const partyLibSrc = fs.readFileSync(
  path.join(root, "src/lib/politicalParties.ts"),
  "utf8",
);
assert.ok(
  /export function partyCardName\(/.test(partyLibSrc) &&
    /export function isPartyNameAbbreviation\(/.test(partyLibSrc),
  "src/lib/politicalParties.ts must export partyCardName() and isPartyNameAbbreviation()",
);

assert.ok(
  flagGridSrc.includes("partyCardName("),
  "FlagGrid party cards must use partyCardName(), never a chamber abbreviation like LIB as the tile title",
);
assert.ok(
  /groupMode !== "none"/.test(flagGridSrc) &&
    /groupMode !== "alpha"/.test(flagGridSrc) &&
    flagGridSrc.includes('effectiveContentType === "party"'),
  "FlagGrid must not ideology-sort the party view when Group by is No grouping or A–Z",
);

const partyGridSrc = fs.readFileSync(
  path.join(root, "src/components/PoliticalPartyGrid.tsx"),
  "utf8",
);
assert.ok(
  flagGridSrc.includes("PartyCardName") &&
    partyGridSrc.includes("PartyCardName") &&
    fs.readFileSync(path.join(root, "src/pages/LearnPage.css"), "utf8").includes("flag-grid__name-translation"),
  "Both party grids must render PartyCardName so the English gloss is a grey span, not the same ink as the official name",
);
assert.ok(
  partyGridSrc.includes('none: "No grouping"') &&
    /sortMode === "none"/.test(partyGridSrc) &&
    partyGridSrc.includes("byCardName"),
  'PoliticalPartyGrid must offer a "No grouping" mode that lists parties alphabetically by partyCardName()',
);

assert.ok(
  partyLibSrc.includes('label: "Exec power"') &&
    partyLibSrc.includes('label: "Leg power"') &&
    partyLibSrc.includes('label: "In-power"'),
  'partyPowerBadges must label presidential/semi-presidential offices "Exec power" / "Leg power", and keep "In-power" for Westminster fusion',
);
assert.ok(
  /party\.headOfGovernment/.test(partyLibSrc) &&
    !/if \(party\.inExecutive\)/.test(partyLibSrc),
  'Exec power must key off headOfGovernment (the HoG party), never inExecutive (cabinet partners)',
);
assert.ok(
  partyLibSrc.includes("PARTY_LEGISLATURES") &&
    partyLibSrc.includes("splitLegislature") &&
    partyLibSrc.includes("chamberMajorityBadges") &&
    partyLibSrc.includes("countryHasChamberMajority"),
  "Leg power uses per-chamber majority when a party holds a house, and falls back to inPower when none does",
);
assert.ok(
  partyLibSrc.includes("export function partyCardNameParts") &&
    /const native = party\.name\.trim\(\)/.test(partyLibSrc) &&
    partyLibSrc.includes("party.nameEn") &&
    partyLibSrc.includes("(${translation})"),
  "partyCardName must show the official local name, with nameEn in parentheses when it differs",
);
assert.ok(
  !partyLibSrc.includes("Hold executive power") &&
    !partyLibSrc.includes("Hold legislative power"),
  'partyPowerBadges must not use the long "Hold executive/legislative power" labels on grid cards',
);

assert.ok(
  flagGridSrc.includes("flag-grid__country-sub") &&
    flagGridSrc.includes("({item.countryName})") &&
    fs.readFileSync(path.join(root, "src/pages/LearnPage.css"), "utf8").includes(
      "flag-grid__country-sub",
    ),
  "FlagGrid multi-item Show cards (newspapers / agencies / tourism / airlines / broadcasters / parties) must show the country as a separate grey \"(Country)\" line under the title",
);
assert.ok(
  !/name:\s*`\$\{tagline\} \(\$\{countryName\}\)`/.test(flagGridSrc),
  "Tourism-logo tiles must not bake the country into the title string — country goes on the grey subtitle line",
);

const agencyLibSrc = fs.readFileSync(
  path.join(root, "src/lib/nationalNewsAgencies.ts"),
  "utf8",
);
const agencyDetailsSrc = fs.readFileSync(
  path.join(root, "src/components/NewsAgencyDetails.tsx"),
  "utf8",
);
assert.ok(
  /export function agencyOwnershipBadge\(/.test(agencyLibSrc),
  "nationalNewsAgencies.ts must export agencyOwnershipBadge() for State/Private/… card badges",
);
assert.ok(
  flagGridSrc.includes("agencyOwnershipBadge") &&
    flagGridSrc.includes("flag-grid__agency-badge"),
  "FlagGrid news-agency cards must render ownership badges via agencyOwnershipBadge()",
);
assert.ok(
  agencyDetailsSrc.includes("agencyOwnershipBadge") &&
    agencyDetailsSrc.includes("flag-grid__agency-badge"),
  "NewsAgencyDetails must show the ownership badge next to the Ownership type",
);

console.log(
  `PASS: Show dropdown keeps ${order.length} classifications (${order.join(", ")}).`,
);
