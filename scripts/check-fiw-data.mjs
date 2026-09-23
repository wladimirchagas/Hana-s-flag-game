#!/usr/bin/env node
/**
 * Validate bundled Freedom House "Freedom in the World 2026" data against the
 * committed official extract (scripts/data/fiw-2026.csv, built by
 * scripts/build-fiw.mjs from https://freedomhouse.org/country/scores).
 *
 * Fails on: any score/status/rank drift between the extract, fiw2026Data.mjs,
 * democracyData.mjs and countryFacts.ts; a stale edition year; a stray
 * rankChange; status totals disagreeing with the report; a PR+CL sub-score sum
 * that does not equal the total; fabricated entries for unrated codes; or the
 * index label no longer reading 2026.
 *
 * Run: node scripts/check-fiw-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { FIW_2026_DATA } from "./data/fiw2026Data.mjs";
import { parseFiwCsv, fiwEntries, FIW_YEAR } from "./build-fiw.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rows = parseFiwCsv(readFileSync(resolve(__dirname, "data/fiw-2026.csv"), "utf8"));
const expected = fiwEntries(rows);
const errors = [];

const countries = rows.filter((r) => r.kind === "country");
const territories = rows.filter((r) => r.kind === "territory");
if (countries.length !== 195) errors.push(`expected 195 countries, got ${countries.length}`);
if (territories.length !== 12) errors.push(`expected 12 territories, got ${territories.length}`);
const tally = { Free: 0, "Partly Free": 0, "Not Free": 0 };
for (const r of countries) tally[r.status]++;
// Published FIW 2026 totals (countries only).
if (tally.Free !== 88 || tally["Partly Free"] !== 48 || tally["Not Free"] !== 59) {
  errors.push(`status totals ${JSON.stringify(tally)} ≠ published 88/48/59`);
}
for (const r of rows) {
  if (r.pr + r.cl !== r.score) errors.push(`${r.country}: PR ${r.pr} + CL ${r.cl} ≠ ${r.score}`);
}

const factsSrc = readFileSync(resolve(__dirname, "../src/data/countryFacts.ts"), "utf8");
const facts = new Map();
for (const m of factsSrc.matchAll(/^  ([A-Z]{2}): (\{.*\}),$/gm)) {
  const fh = JSON.parse(m[2]).democracy?.freedomHouse;
  if (fh) facts.set(m[1], fh);
}

const demoCodes = Object.keys(DEMOCRACY_DATA).filter((c) => DEMOCRACY_DATA[c].freedomHouse);
if (demoCodes.length !== 193) errors.push(`expected 193 bundled members, got ${demoCodes.length}`);
for (const code of new Set([...demoCodes, ...facts.keys(), ...Object.keys(FIW_2026_DATA)])) {
  const exp = expected[code];
  if (!exp) {
    errors.push(`${code}: freedomHouse bundled but not rated in FIW 2026`);
    continue;
  }
  const want = JSON.stringify(exp);
  for (const [label, got] of [
    ["fiw2026Data", FIW_2026_DATA[code]],
    ["democracyData", DEMOCRACY_DATA[code]?.freedomHouse],
    ["countryFacts", facts.get(code)],
  ]) {
    if (JSON.stringify(got) !== want) {
      errors.push(`${code}: ${label} mismatch\n  got ${JSON.stringify(got)}\n  exp ${want}`);
    }
  }
}
for (const code of ["TW", "XK", "PS", "VA"]) {
  if (DEMOCRACY_DATA[code]?.freedomHouse || facts.has(code)) {
    errors.push(`${code}: must not carry a freedomHouse entry`);
  }
}

// Spot-checks against freedomhouse.org/country/scores (FIW 2026).
for (const [code, score, rating] of [
  ["FI", 100, "Free"],
  ["US", 81, "Free"],
  ["SY", 10, "Not Free"],
  ["BO", 69, "Free"],
  ["FJ", 72, "Free"],
  ["MW", 68, "Free"],
  ["TZ", 28, "Not Free"],
  ["AD", 93, "Free"],
]) {
  const e = expected[code];
  if (e?.score !== score || e?.rating !== rating || e?.year !== FIW_YEAR) {
    errors.push(`spot-check ${code}: ${JSON.stringify(e)}`);
  }
}

const colors = readFileSync(resolve(__dirname, "../src/lib/democracyColors.ts"), "utf8");
if (!/"freedom-house": \{[^}]*year: 2026,/.test(colors)) {
  errors.push("democracyColors.ts: freedom-house meta year is not 2026");
}

if (errors.length) {
  console.error(`FIW check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  process.exit(1);
}
console.log(`FIW check OK — ${demoCodes.length} members match Freedom in the World 2026 (88/48/59).`);
