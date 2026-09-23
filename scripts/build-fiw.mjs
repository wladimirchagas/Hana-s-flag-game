#!/usr/bin/env node
/**
 * Build Freedom House "Freedom in the World 2026" data from the committed
 * extract (scripts/data/fiw-2026.csv).
 *
 * Source: Freedom House, Freedom in the World 2026 (covers calendar year 2025),
 * official country scores table — https://freedomhouse.org/country/scores
 * (fetched 2026-09-23; page sha256
 * 432cc11b45ff4c85b3383a3768e5224b7d813e36aa2bdb526fc912476275fdef).
 * Freedom House no longer publishes a public spreadsheet download, so the CSV is
 * a verbatim transcription of that table: total score, status, Political
 * Rights and Civil Liberties sub-scores for 195 countries + 12 territories.
 * Status totals match the report (88 Free, 48 Partly Free, 59 Not Free).
 *
 * rank = competition rank by total score across all 195 rated COUNTRIES
 *   (territories excluded; ties share a rank). Freedom House publishes no rank;
 *   this is derived for charts, exactly as the 2024 bundle was.
 * rankChange is omitted: the previous bundle was labelled 2024, so a change
 *   figure against it would not be an edition-to-edition comparison.
 *
 * Writes:
 *   - scripts/data/fiw2026Data.mjs
 *   - replaces `freedomHouse` in scripts/data/democracyData.mjs
 *   - replaces `democracy.freedomHouse` in src/data/countryFacts.ts
 *
 * Usage: node scripts/build-fiw.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/fiw-2026.csv");
const DATA_OUT = resolve(__dirname, "data/fiw2026Data.mjs");
const DEMO = resolve(__dirname, "data/democracyData.mjs");
const FACTS = resolve(__dirname, "../src/data/countryFacts.ts");

export const FIW_YEAR = 2026;

/** Parse the FIW CSV (quoted country names allowed). */
export function parseFiwCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = "country,iso,kind,score,status,political_rights,civil_liberties";
  if (lines[0] !== header) throw new Error(`Unexpected CSV header: ${lines[0]}`);
  return lines.slice(1).map((line) => {
    const m = line.match(
      /^("[^"]*"|[^,]*),([A-Z]{2})?,(country|territory),(\d+),(Free|Partly Free|Not Free),(-?\d+),(-?\d+)$/,
    );
    if (!m) throw new Error(`Bad CSV row: ${line}`);
    return {
      country: m[1].replace(/^"|"$/g, ""),
      iso: m[2] ?? "",
      kind: m[3],
      score: Number(m[4]),
      status: m[5],
      pr: Number(m[6]),
      cl: Number(m[7]),
    };
  });
}

/** Expected `freedomHouse` entries keyed by ISO, for every rated country. */
export function fiwEntries(rows) {
  const countries = rows.filter((r) => r.kind === "country");
  /** @type {Record<string, { year: number, rating: string, rank: number, score: number }>} */
  const out = {};
  for (const r of countries) {
    const rank = 1 + countries.filter((o) => o.score > r.score).length;
    out[r.iso] = { year: FIW_YEAR, rating: r.status, rank, score: r.score };
  }
  return out;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const rows = parseFiwCsv(readFileSync(CSV, "utf8"));
  const countries = rows.filter((r) => r.kind === "country");
  if (countries.length !== 195) throw new Error(`Expected 195 countries, got ${countries.length}`);
  for (const r of rows) {
    if (r.pr + r.cl !== r.score) throw new Error(`${r.country}: PR+CL ≠ total`);
  }
  const all = fiwEntries(rows);

  // Game members only: rewrite the codes that already carry a freedomHouse entry.
  let demo = readFileSync(DEMO, "utf8");
  const bundled = new Set();
  demo = demo.replace(
    /^  "([A-Z]{2})": \{\n((?:    "[^\n]*\n)*?)    "freedomHouse": \{[^\n]*?\}(,?)$/gm,
    (whole, code, before, comma) => {
      const e = all[code];
      if (!e) throw new Error(`${code}: in democracyData but not rated by FIW 2026`);
      bundled.add(code);
      return `  "${code}": {\n${before}    "freedomHouse": ${JSON.stringify(e)}${comma}`;
    },
  );
  demo = demo.replace(
    /^(\/\/ Includes Freedom House, V-Dem,[^\n]*\n)(?!\/\/ - Freedom House: Freedom in the World 2026)/m,
    "$1// - Freedom House: Freedom in the World 2026 (scripts/data/fiw-2026.csv, built by scripts/build-fiw.mjs)\n",
  );
  writeFileSync(DEMO, demo, "utf8");

  let facts = readFileSync(FACTS, "utf8");
  let factsCount = 0;
  facts = facts.replace(/^  ([A-Z]{2}): (\{.*\}),$/gm, (whole, code, json) => {
    const obj = JSON.parse(json);
    if (!obj.democracy?.freedomHouse) return whole;
    if (!bundled.has(code)) throw new Error(`${code}: countryFacts has FH but democracyData does not`);
    obj.democracy.freedomHouse = all[code];
    factsCount++;
    return `  ${code}: ${JSON.stringify(obj)},`;
  });
  writeFileSync(FACTS, facts, "utf8");

  const codes = [...bundled].sort();
  const nameByIso = Object.fromEntries(countries.map((r) => [r.iso, r.country]));
  const body = codes
    .map((c) => `  "${c}": ${JSON.stringify(all[c])}, // ${nameByIso[c]}`)
    .join("\n");
  writeFileSync(
    DATA_OUT,
    `// Freedom House — Freedom in the World 2026 (covers 2025). GENERATED by
// scripts/build-fiw.mjs from scripts/data/fiw-2026.csv — do not hand-edit.
// Source: https://freedomhouse.org/country/scores
// rank = competition rank by total score across all 195 rated countries.
// Not bundled: Kosovo, Taiwan (rated, but not game members) and the 12 territories.

/** @type {Record<string, { year: number, rating: string, rank: number, score: number }>} */
export const FIW_2026_DATA = {
${body}
};
`,
    "utf8",
  );
  console.log(
    `FIW 2026: ${codes.length} game members written (democracyData + ${factsCount} countryFacts rows); ${countries.length} countries ranked.`,
  );
}
