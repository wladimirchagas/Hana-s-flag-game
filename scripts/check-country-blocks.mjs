#!/usr/bin/env node
/**
 * Validates `src/data/countryBlocks.ts` and the chart filter wiring:
 * - every block has id/label/fullName/abbreviation/group/founded/summary/joined/source/note/codes
 * - every code is a UN member (or permanent observer) in this game
 * - every code has a joined year ≥ founded
 * - no duplicate block ids
 * - DemocracyIndexChart nests Continents, adds Membership, and ORs filters
 * - EntitySummary surfaces membership badges with hover/focus tooltips
 *
 * Run: node scripts/check-country-blocks.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const failures = [];

function fail(msg) {
  failures.push(msg);
}

const unSrc = readFileSync(join(root, "src/lib/unMemberStates.ts"), "utf8");
const UN_MEMBER_CODES = new Set(
  [...unSrc.matchAll(/"([A-Z]{2})"/g)].map((m) => m[1]),
);
if (UN_MEMBER_CODES.size < 195) {
  fail(`expected ≥195 UN codes, got ${UN_MEMBER_CODES.size}`);
}

const blocksSrc = readFileSync(join(root, "src/data/countryBlocks.ts"), "utf8");

// Split on block object starts that carry `id: "..."` at the top of each entry.
const blockChunks = blocksSrc.split(/\n\s*\{\s*\n\s*id:\s*"/).slice(1);
if (blockChunks.length < 10) {
  fail(`expected ≥10 country blocks, got ${blockChunks.length}`);
}

const REQUIRED_GROUPS = new Set([
  "Military & security",
  "Economic & trade",
  "Regional organisations",
  "Political forums",
]);

const ids = new Set();
let membershipCount = 0;

for (const chunk of blockChunks) {
  const idMatch = chunk.match(/^([^"]+)"/);
  const id = idMatch?.[1];
  if (!id) {
    fail("block missing id");
    continue;
  }
  const label = chunk.match(/label:\s*"([^"]+)"/)?.[1];
  const fullName = chunk.match(/fullName:\s*"([^"]+)"/)?.[1];
  const abbreviation = chunk.match(/abbreviation:\s*"([^"]+)"/)?.[1];
  const group = chunk.match(/group:\s*"([^"]+)"/)?.[1];
  const foundedRaw = chunk.match(/founded:\s*(\d{4})/)?.[1];
  const founded = foundedRaw ? Number(foundedRaw) : NaN;
  const summary = chunk.match(/summary:\s*"([^"]+)"/)?.[1];
  const source = chunk.match(/source:\s*"([^"]+)"/)?.[1];
  const note = chunk.match(/note:\s*"([^"]+)"/)?.[1];
  const codesBlock = chunk.match(/codes:\s*\[([\s\S]*?)\],/);
  const codes = codesBlock
    ? [...codesBlock[1].matchAll(/"([A-Z]{2})"/g)].map((m) => m[1])
    : [];
  const joinedBlock = chunk.match(/joined:\s*\{([\s\S]*?)\},/);
  const joinedEntries = joinedBlock
    ? [...joinedBlock[1].matchAll(/\b([A-Z]{2})\s*:\s*(\d{4})\b/g)].map((m) => [
        m[1],
        Number(m[2]),
      ])
    : [];
  const joined = Object.fromEntries(joinedEntries);

  if (!label) fail(`${id}: missing label`);
  if (!fullName || fullName.length < 3) fail(`${id}: missing fullName`);
  if (!abbreviation || abbreviation.length < 2) {
    fail(`${id}: missing abbreviation`);
  }
  if (!REQUIRED_GROUPS.has(group)) fail(`${id}: unknown group ${group}`);
  if (!Number.isFinite(founded) || founded < 1800 || founded > 2100) {
    fail(`${id}: founded must be a plausible year`);
  }
  if (!summary || summary.length < 40) {
    fail(`${id}: summary too short / missing (need a real explainer)`);
  }
  if (!source || !/^https?:\/\//.test(source)) {
    fail(`${id}: source must be http(s) URL`);
  }
  if (!note || note.length < 20) fail(`${id}: note too short / missing`);
  if (codes.length === 0) fail(`${id}: codes must be a non-empty array`);
  if (ids.has(id)) fail(`duplicate block id: ${id}`);
  ids.add(id);

  const seen = new Set();
  for (const code of codes) {
    if (!UN_MEMBER_CODES.has(code)) {
      fail(`${id}: ${code} is not a UN member/observer in this game`);
    }
    if (seen.has(code)) fail(`${id}: duplicate code ${code}`);
    seen.add(code);
    const year = joined[code];
    if (!Number.isFinite(year)) {
      fail(`${id}: missing joined year for ${code}`);
    } else if (year < founded) {
      fail(
        `${id}: ${code} joined ${year} before organisation founded ${founded}`,
      );
    } else if (year > 2100) {
      fail(`${id}: ${code} joined year ${year} looks implausible`);
    }
  }
  for (const code of Object.keys(joined)) {
    if (!seen.has(code)) {
      fail(`${id}: joined has ${code} which is not in codes`);
    }
  }
  membershipCount += codes.length;

  // Lightweight membership probes for the product-named blocks.
  if (id === "asean" && !seen.has("MY")) fail("asean: expected MY");
  if (id === "asean" && !seen.has("TL")) fail("asean: expected TL (11th member)");
  if (id === "mercosur" && !seen.has("BR")) fail("mercosur: expected BR");
  if (id === "mercosur" && seen.has("VE")) {
    fail("mercosur: Venezuela is suspended — omit from full members");
  }
  if (id === "mercosur") {
    if (joined.BR !== 1991) fail("mercosur: Brazil must be a 1991 founding member");
    if (joined.BO !== 2024) fail("mercosur: Bolivia full member year must be 2024");
  }
  if (id === "nato") {
    if (joined.US !== 1949) fail("nato: US must be a 1949 founding member");
    if (joined.FI !== 2023) fail("nato: Finland accession year must be 2023");
    if (joined.SE !== 2024) fail("nato: Sweden accession year must be 2024");
  }
  if (id === "eu" && seen.has("GB")) fail("eu: UK left — omit GB");
  if (id === "nato" && seen.size !== 32) {
    fail(`nato: expected 32 Allies, got ${seen.size}`);
  }
  if (id === "oecd" && seen.size !== 38) {
    fail(`oecd: expected 38 members, got ${seen.size}`);
  }
}

for (const required of [
  "mercosur",
  "eu",
  "anzus",
  "aukus",
  "asean",
  "brics",
  "oecd",
  "nato",
]) {
  if (!ids.has(required)) fail(`missing required block id: ${required}`);
}

const chartSrc = readFileSync(
  join(root, "src/components/DemocracyIndexChart.tsx"),
  "utf8",
);
for (const needle of [
  'label="Continents"',
  'label="Membership"',
  "countryMatchesBlocks",
  "countryMatchesContinentFilter",
  "matchContinent || matchMembership || matchIndex",
  "Highlight any of",
  "CONTINENT_ID_PREFIX",
  "SUBCONTINENT_ID_PREFIX",
]) {
  if (!chartSrc.includes(needle)) {
    fail(`DemocracyIndexChart.tsx missing expected wiring: ${needle}`);
  }
}
if (chartSrc.includes('label="Sub-continents"')) {
  fail(
    "DemocracyIndexChart.tsx still has a separate Sub-continents filter — nest under Continents",
  );
}
if (chartSrc.includes('label="Blocks"')) {
  fail('DemocracyIndexChart.tsx still labels the filter "Blocks" — rename to Membership');
}
// Old AND filter shape must not return.
if (
  chartSrc.includes("continentFilter.size > 0 && !continentFilter.has") ||
  chartSrc.includes("subcontinentFilter.size > 0 &&")
) {
  fail("DemocracyIndexChart.tsx still uses AND filter semantics");
}

const summarySrc = readFileSync(
  join(root, "src/components/EntitySummary.tsx"),
  "utf8",
);
for (const needle of [
  "membershipsForCountry",
  'label: "Membership"',
  "entity-summary__membership",
  "MembershipBadge",
]) {
  if (!summarySrc.includes(needle)) {
    fail(`EntitySummary.tsx missing expected Membership row wiring: ${needle}`);
  }
}
// Membership must sit in the rows list (above footer/Anthem), not only in a comment.
if (!/membershipsForCountry[\s\S]*SummaryList/.test(summarySrc)) {
  fail("EntitySummary.tsx must push Membership into rows before SummaryList/footer");
}

const badgeSrc = readFileSync(
  join(root, "src/components/MembershipBadge.tsx"),
  "utf8",
);
for (const needle of [
  "membershipDisplayName",
  "membershipExplainer",
  'role="tooltip"',
  "entity-summary__membership-tip",
]) {
  if (!badgeSrc.includes(needle)) {
    fail(`MembershipBadge.tsx missing tooltip wiring: ${needle}`);
  }
}

for (const needle of [
  "export function membershipDisplayName",
  "export function membershipExplainer",
  "fullName",
  "abbreviation",
  "founded",
  "summary",
  "joined",
]) {
  if (!blocksSrc.includes(needle)) {
    fail(`countryBlocks.ts missing membership tooltip field/helper: ${needle}`);
  }
}

const cssSrc = readFileSync(join(root, "src/pages/LearnPage.css"), "utf8");
for (const needle of [
  "entity-summary__membership-tip",
  ":focus-within .entity-summary__membership-tip",
  ":hover .entity-summary__membership-tip",
]) {
  if (!cssSrc.includes(needle)) {
    fail(`LearnPage.css missing membership tooltip style: ${needle}`);
  }
}

if (failures.length) {
  console.error("check-country-blocks FAILED:");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log(
  `check-country-blocks OK — ${ids.size} blocks, ${membershipCount} memberships`,
);
