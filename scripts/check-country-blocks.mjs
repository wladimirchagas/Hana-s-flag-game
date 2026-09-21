#!/usr/bin/env node
/**
 * Validates `src/data/countryBlocks.ts` and the chart filter wiring:
 * - every block has id/label/group/source/note/codes
 * - every code is a UN member (or permanent observer) in this game
 * - no duplicate block ids
 * - DemocracyIndexChart nests Continents, adds Blocks, and ORs filters
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
  const group = chunk.match(/group:\s*"([^"]+)"/)?.[1];
  const source = chunk.match(/source:\s*"([^"]+)"/)?.[1];
  const note = chunk.match(/note:\s*"([^"]+)"/)?.[1];
  const codesBlock = chunk.match(/codes:\s*\[([\s\S]*?)\],/);
  const codes = codesBlock
    ? [...codesBlock[1].matchAll(/"([A-Z]{2})"/g)].map((m) => m[1])
    : [];

  if (!label) fail(`${id}: missing label`);
  if (!REQUIRED_GROUPS.has(group)) fail(`${id}: unknown group ${group}`);
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
  }
  membershipCount += codes.length;

  // Lightweight membership probes for the product-named blocks.
  if (id === "asean" && !seen.has("MY")) fail("asean: expected MY");
  if (id === "asean" && !seen.has("TL")) fail("asean: expected TL (11th member)");
  if (id === "mercosur" && !seen.has("BR")) fail("mercosur: expected BR");
  if (id === "mercosur" && seen.has("VE")) {
    fail("mercosur: Venezuela is suspended — omit from full members");
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
  'label="Blocks"',
  "countryMatchesBlocks",
  "countryMatchesContinentFilter",
  "matchContinent || matchBlock || matchIndex",
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
// Old AND filter shape must not return.
if (
  chartSrc.includes("continentFilter.size > 0 && !continentFilter.has") ||
  chartSrc.includes("subcontinentFilter.size > 0 &&")
) {
  fail("DemocracyIndexChart.tsx still uses AND filter semantics");
}

if (failures.length) {
  console.error("check-country-blocks FAILED:");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log(
  `check-country-blocks OK — ${ids.size} blocks, ${membershipCount} memberships`,
);
