#!/usr/bin/env node
/**
 * Build gate for the Learn-mode "Political parties" grid view.
 *
 * Mirrors the sourcing/bundling discipline `check-national-flags.mjs` and
 * `check-flag-meanings.mjs` apply to every other symbol in this game — see
 * CLAUDE.md-style rules documented at the top of `src/data/politicalParties.ts`.
 *
 * Checks (each FAILS the build):
 *   A. Every party has a non-empty name, ideology data, a founded year, a
 *      chamber name, and seats <= seatsTotal (both non-negative).
 *   B. At least one authoritative `sources` citation with a real http(s) URL.
 *   C. A bundled logo file exists on disk and its sha256 matches the recorded
 *      one; a logo not sourced from commons.wikimedia.org carries a
 *      `licenceNote` of at least 40 characters (same threshold as the
 *      football-crest / national-flag non-free-image rule). A party with no
 *      `logo` must carry a `noImageReason` instead — never both, never neither.
 *   D. `id` is "{country}-{...}" matching the party's own `country` field, and
 *      no two parties share an id.
 *   E. `coalitionId`, when present, resolves to a real `POLITICAL_COALITIONS`
 *      entry; every coalition's `memberPartyIds` all resolve to real parties
 *      and its own `source` is well-formed.
 *   F. `logoMeaning`, when present, is structurally sound (non-empty
 *      description, ≥1 valid source, well-formed myths) — the same floor
 *      `check-flag-meanings.mjs` applies to every other symbol meaning.
 *
 * This is a SAFETY NET, not a substitute for verifying each claim against its
 * cited source by hand — it cannot tell a sourced fact from a fabrication.
 *
 * Run: node scripts/check-political-parties.mjs   (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "politicalParties.ts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

// ── Load the two exported data objects without invoking tsc ────────────────
// Same brace-matching-then-eval technique as check-flag-meanings.mjs: the
// object literal after `= {` is pure data, no TS-specific syntax inside.
function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  if (eq < 0) throw new Error(`Could not locate literal for ${marker}`);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(open, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const src = readFileSync(DATA_PATH, "utf8");
const coalitions = loadConst(src, "export const POLITICAL_COALITIONS");
const partiesByCountry = loadConst(src, "export const POLITICAL_PARTIES");

const isHttpUrl = (u) => {
  if (typeof u !== "string") return false;
  try {
    const p = new URL(u);
    return p.protocol === "http:" || p.protocol === "https:";
  } catch {
    return false;
  }
};
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const VALID_POSITIONS = new Set([
  "far-left", "left", "centre-left", "centre", "centre-right", "right", "far-right", "other",
]);

const problems = [];
const fail = (id, msg) => problems.push(`[${id}] ${msg}`);

function checkSources(id, sources, where) {
  if (!Array.isArray(sources) || sources.length === 0) {
    fail(id, `${where}: no sources — every fact here must cite ≥1 authoritative source`);
    return;
  }
  sources.forEach((s, i) => {
    if (!s || !nonEmpty(s.title)) fail(id, `${where}: source ${i} has an empty title`);
    if (!s || !isHttpUrl(s.url)) fail(id, `${where}: source ${i} has an invalid url ${JSON.stringify(s?.url)}`);
  });
}

function checkMeaning(id, m, where) {
  if (m === undefined) return;
  if (!nonEmpty(m.description)) fail(id, `${where}: logoMeaning has an empty description`);
  checkSources(id, m.sources, `${where}.logoMeaning`);
  if (m.myths !== undefined) {
    if (!Array.isArray(m.myths)) {
      fail(id, `${where}: logoMeaning.myths must be an array when present`);
    } else {
      m.myths.forEach((myth, i) => {
        if (!myth || !nonEmpty(myth.claim)) fail(id, `${where}: myth ${i} has an empty claim`);
        if (!myth || !nonEmpty(myth.reality)) fail(id, `${where}: myth ${i} has an empty reality`);
      });
    }
  }
}

const allPartyIds = new Set();
let partyCount = 0;

for (const [country, parties] of Object.entries(partiesByCountry)) {
  if (!Array.isArray(parties)) {
    fail(country, "POLITICAL_PARTIES entry is not an array");
    continue;
  }
  for (const p of parties) {
    partyCount++;
    const id = p?.id ?? `${country}:<unnamed>`;

    // D. id shape + uniqueness
    if (!nonEmpty(p.id) || !p.id.startsWith(`${country}-`)) {
      fail(id, `id must start with "${country}-" (its own country field)`);
    }
    if (allPartyIds.has(p.id)) fail(id, "duplicate party id");
    allPartyIds.add(p.id);
    if (p.country !== country) fail(id, `country field "${p.country}" does not match its POLITICAL_PARTIES key "${country}"`);

    // A. core facts
    if (!nonEmpty(p.name)) fail(id, "empty/missing name");
    if (!nonEmpty(p.shortName)) fail(id, "empty/missing shortName");
    if (!Array.isArray(p.ideology)) fail(id, "ideology must be an array (may be empty only if positionRaw/ideologyPosition still given)");
    if (!VALID_POSITIONS.has(p.ideologyPosition)) fail(id, `invalid ideologyPosition ${JSON.stringify(p.ideologyPosition)}`);
    if (!Number.isInteger(p.founded) || p.founded < 1700 || p.founded > new Date().getFullYear()) {
      fail(id, `implausible or missing founded year ${JSON.stringify(p.founded)}`);
    }
    if (!nonEmpty(p.chamberName)) fail(id, "empty/missing chamberName");
    if (!Number.isInteger(p.seats) || p.seats < 0) fail(id, `invalid seats ${JSON.stringify(p.seats)}`);
    if (!Number.isInteger(p.seatsTotal) || p.seatsTotal <= 0) fail(id, `invalid seatsTotal ${JSON.stringify(p.seatsTotal)}`);
    if (Number.isInteger(p.seats) && Number.isInteger(p.seatsTotal) && p.seats > p.seatsTotal) {
      fail(id, `seats (${p.seats}) exceeds seatsTotal (${p.seatsTotal})`);
    }
    if (typeof p.inPower !== "boolean") fail(id, "inPower must be a boolean");

    // B. sources
    checkSources(id, p.sources, "party");

    // C. logo bundling
    const hasLogo = p.logo !== undefined;
    const hasReason = nonEmpty(p.noImageReason);
    if (hasLogo && hasReason) fail(id, "has both a logo and a noImageReason — pick one");
    if (!hasLogo && !hasReason) fail(id, "has neither a logo nor a noImageReason");
    if (hasLogo) {
      const abs = resolve(PUBLIC_DIR, p.logo);
      if (!existsSync(abs)) {
        fail(id, `logo "${p.logo}" is not bundled under public/`);
      } else {
        if (!nonEmpty(p.sha256)) {
          fail(id, "logo is bundled but no sha256 was recorded");
        } else {
          const digest = createHash("sha256").update(readFileSync(abs)).digest("hex");
          if (digest !== p.sha256) fail(id, `logo "${p.logo}" does not match its recorded sha256 (file changed after fetch)`);
        }
      }
      const fromCommons = typeof p.logoSourceUrl === "string" && p.logoSourceUrl.includes("commons.wikimedia.org");
      if (!fromCommons && (p.licenceNote ?? "").trim().length < 40) {
        fail(id, "logo is not from commons.wikimedia.org and has no (or too short a) licenceNote stating its copyright position");
      }
    }

    // E. coalition reference
    if (p.coalitionId !== undefined) {
      if (!coalitions[p.coalitionId]) fail(id, `coalitionId "${p.coalitionId}" has no matching POLITICAL_COALITIONS entry`);
    }

    // F. logo meaning
    checkMeaning(id, p.logoMeaning, "party");
  }
}

for (const [cid, c] of Object.entries(coalitions)) {
  if (!nonEmpty(c.name)) fail(cid, "coalition has an empty/missing name");
  if (!Array.isArray(c.memberPartyIds) || c.memberPartyIds.length === 0) {
    fail(cid, "coalition has no memberPartyIds");
  } else {
    for (const mid of c.memberPartyIds) {
      if (!allPartyIds.has(mid)) fail(cid, `memberPartyIds references unknown party id "${mid}"`);
    }
  }
  checkSources(cid, [c.source].filter(Boolean), "coalition");
}

if (problems.length > 0) {
  console.error(`\n❌ Political-parties check failed — ${problems.length} problem(s) across ${partyCount} part${partyCount === 1 ? "y" : "ies"}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error("\nSee src/data/politicalParties.ts and the sourcing discipline it documents.\n");
  process.exit(1);
}

console.log(
  `✓ Political-parties check passed — ${partyCount} part${partyCount === 1 ? "y" : "ies"} across ${Object.keys(partiesByCountry).length} countr${Object.keys(partiesByCountry).length === 1 ? "y" : "ies"}, ${Object.keys(coalitions).length} coalition(s), all sourced and well-formed.`,
);
