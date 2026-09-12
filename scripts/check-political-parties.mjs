#!/usr/bin/env node
/**
 * Build gate for the Learn-mode "Political parties" grid view.
 *
 * Mirrors the sourcing/bundling discipline `check-national-flags.mjs` and
 * `check-flag-meanings.mjs` apply to every other symbol in this game — see
 * CLAUDE.md-style rules documented at the top of `src/data/politicalParties.ts`.
 *
 * Checks (each FAILS the build):
 *   A. Every party has a non-empty name, ideology data, a chamber name, and
 *      seats <= seatsTotal (both non-negative). `founded` and `logo` are
 *      SHOULDs, not MUSTs — see the notes on each below.
 *   B. At least one authoritative `sources` citation with a real http(s) URL.
 *   C. A bundled logo file exists on disk and its sha256 matches the recorded
 *      one; a logo not sourced from commons.wikimedia.org carries a
 *      `licenceNote` of at least 40 characters (same threshold as the
 *      football-crest / national-flag non-free-image rule). A party with no
 *      `logo` must carry a `noImageReason` instead — never both, never neither —
 *      and that reason must name at least two of the source families it swept.
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

// A party SHOULD have a bundled logo, but a logo is not a hard requirement for
// the entry to exist (owner direction, 2026-09-12). The rule that was here
// before — "any party added after 2026-09-08 must have a bundled logo" — was
// keeping REAL, SEATED parties out of the dataset entirely whenever no
// freely-licensable image could be found: Chile's FREVS, Venezuela's Vamos
// Vamos Cojedes, Guyana's Forward Guyana Movement and a dozen others. A party
// the reader cannot see at all is a worse outcome than a party shown without
// its emblem, so the requirement is now on the RESEARCH, not on the image.
//
// `noImageReason` is therefore allowed on any party — but it must record what
// was actually searched, so "not found" can be audited and re-tried later. The
// reason must be at least MIN_NO_IMAGE_REASON_CHARS long and must name at
// least MIN_NO_IMAGE_SOURCES of the source families below. That list is the
// search surface this repository expects to have been swept, and it is wider
// than Wikimedia: the regional *Elects* network (EuropeElects, AsiaElects,
// AfricaElects, OceaniaElects, LatamElects, …) and the parties' own websites
// carry emblems for small and new parties that Commons has never held.
const NO_IMAGE_SOURCE_FAMILIES = [
  { name: "Wikimedia Commons", re: /\bcommons\b/i },
  { name: "Wikipedia (any language)", re: /\bwikipedi|\bwikidata\b/i },
  { name: "the party's own website", re: /\bparty (?:web)?site|\bofficial (?:web)?site|\bparty['’]s own|\bparty sources?\b|\bwebsite\b/i },
  { name: "the Elects network (EuropeElects / AsiaElects / AfricaElects / OceaniaElects / LatamElects)", re: /\belects\b/i },
  { name: "an electoral commission or government register", re: /\belectoral\b|\bcommission\b|\bgovernment\b|\bregistr/i },
  { name: "Flags of the World / a vexillological or heraldic reference", re: /\bfotw\b|flags of the world|\bheraldic\b|\bvexill/i },
  { name: "news archives / the Wayback Machine", re: /\barchive|\bwayback\b|\bnews\b|\bpress\b/i },
  { name: "social media accounts the party itself runs", re: /\bsocial media\b|\bfacebook\b|\binstagram\b|\bx\.com\b|\btwitter\b/i },
];
const MIN_NO_IMAGE_REASON_CHARS = 60;
const MIN_NO_IMAGE_SOURCES = 2;

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
    // `founded` is a SHOULD, not a MUST, for the same reason `logo` is: requiring
    // it kept real, seated parties out of the dataset entirely (Thailand's New
    // Dimension and Thai Sub Thawee, Colombia's Partido Demócrata, Bolivia's Bia
    // Yuqui) purely because no source dates them. A party with no sourceable
    // founding year is shown without one; a party shown not at all is a hole.
    // When it IS present it must still be plausible.
    if (p.founded !== undefined && (!Number.isInteger(p.founded) || p.founded < 1700 || p.founded > new Date().getFullYear())) {
      fail(id, `implausible founded year ${JSON.stringify(p.founded)}`);
    }
    if (!nonEmpty(p.chamberName)) fail(id, "empty/missing chamberName");
    if (!Number.isInteger(p.seats) || p.seats < 0) fail(id, `invalid seats ${JSON.stringify(p.seats)}`);
    if (!Number.isInteger(p.seatsTotal) || p.seatsTotal <= 0) fail(id, `invalid seatsTotal ${JSON.stringify(p.seatsTotal)}`);
    if (Number.isInteger(p.seats) && Number.isInteger(p.seatsTotal) && p.seats > p.seatsTotal) {
      fail(id, `seats (${p.seats}) exceeds seatsTotal (${p.seatsTotal})`);
    }
    if (typeof p.inPower !== "boolean") fail(id, "inPower must be a boolean");
    if (p.inExecutive !== undefined && typeof p.inExecutive !== "boolean") {
      fail(id, "inExecutive must be a boolean when present");
    }

    // B. sources
    checkSources(id, p.sources, "party");

    // C. logo bundling
    const hasLogo = p.logo !== undefined;
    const hasReason = nonEmpty(p.noImageReason);

    if (hasLogo && hasReason) fail(id, "has both a logo and a noImageReason — pick one");
    if (!hasLogo && !hasReason) fail(id, "has neither a logo nor a noImageReason");

    // A logo is a SHOULD, not a MUST. What is required instead is that the
    // omission record the search that failed, so it can be audited and re-tried.
    if (hasReason) {
      const reason = p.noImageReason.trim();
      if (reason.length < MIN_NO_IMAGE_REASON_CHARS) {
        fail(id, `noImageReason is only ${reason.length} characters — it must record what was searched (min ${MIN_NO_IMAGE_REASON_CHARS})`);
      }
      const matched = NO_IMAGE_SOURCE_FAMILIES.filter((f) => f.re.test(reason));
      if (matched.length < MIN_NO_IMAGE_SOURCES) {
        fail(
          id,
          `noImageReason names ${matched.length} searched source(s); at least ${MIN_NO_IMAGE_SOURCES} are required. ` +
            `Sweep and then name them, e.g.: ${NO_IMAGE_SOURCE_FAMILIES.map((f) => f.name).join("; ")}`,
        );
      }
    }

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
      // A Commons file is referenced either via its wiki page (commons.wikimedia.org)
      // or via the shared media CDN's /wikipedia/commons/ path; anything else —
      // notably /wikipedia/en/ (or any other single-project code) — is that
      // project's own LOCAL, non-free upload and needs a licenceNote.
      const fromCommons =
        typeof p.logoSourceUrl === "string" &&
        (p.logoSourceUrl.includes("commons.wikimedia.org") ||
          p.logoSourceUrl.includes("/wikipedia/commons/"));
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
