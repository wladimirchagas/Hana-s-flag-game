#!/usr/bin/env node
/**
 * Lightweight gate for World Values Survey Learn-mode data + wiring.
 *
 * Fails when:
 *   - wvsResults.json is missing / empty / structurally broken
 *   - Q1 answers still include the short title (the known alignment bug)
 *   - AU Q1 "Very important" is not 90.2 (PDF-sourced sanity check)
 *   - Learn-mode surfaces stop importing the WVS helpers
 *
 * Usage: node scripts/check-wvs-results.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = resolve(ROOT, "src/data/wvsResults.json");
const META_PATH = resolve(ROOT, "src/data/wvsResultsMeta.ts");
const LIB_PATH = resolve(ROOT, "src/lib/wvsResults.ts");

const errors = [];

function fail(msg) {
  errors.push(msg);
}

if (!existsSync(JSON_PATH)) fail("missing src/data/wvsResults.json — run node scripts/build-wvs-results.mjs");
if (!existsSync(META_PATH)) fail("missing src/data/wvsResultsMeta.ts");
if (!existsSync(LIB_PATH)) fail("missing src/lib/wvsResults.ts");

let data = null;
if (existsSync(JSON_PATH)) {
  data = JSON.parse(readFileSync(JSON_PATH, "utf8"));
  if (!Array.isArray(data.questions) || data.questions.length < 100) {
    fail(`expected ≥100 questions, got ${data.questions?.length}`);
  }
  if (!data.societies || Object.keys(data.societies).length < 50) {
    fail(`expected ≥50 societies, got ${Object.keys(data.societies || {}).length}`);
  }
  const q1 = data.questions.find((q) => q.id === "Q1");
  if (!q1) {
    fail("Q1 missing from wvsResults.json");
  } else {
    if (q1.answers[0] === q1.title || (q1.answers[0] && q1.answers[0].includes(":"))) {
      fail(`Q1 first answer leaked short title: ${JSON.stringify(q1.answers[0])}`);
    }
    if (q1.answers[0] !== "Very important") {
      fail(`Q1 answers[0] should be "Very important", got ${JSON.stringify(q1.answers[0])}`);
    }
    const au = q1.values?.AU;
    if (!au || au[0] !== 90.2) {
      fail(`Q1 AU[0] should be 90.2 (Very important), got ${JSON.stringify(au)}`);
    }
    if (au.length !== q1.answers.length) {
      fail(`Q1 AU values length ${au.length} ≠ answers ${q1.answers.length}`);
    }
  }
  // No question may list its own title as answer 0
  let titleLeaks = 0;
  for (const q of data.questions) {
    if (q.answers?.[0] === q.title) titleLeaks += 1;
  }
  if (titleLeaks > 0) fail(`${titleLeaks} questions still have title as answers[0]`);

  // France never fielded Wave 7 — figures come from Joint EVS/WVS 2017–2022.
  if (!data.societies?.FR) {
    fail("France (FR) missing from societies — must merge Joint EVS/WVS");
  } else {
    const fr = data.societies.FR;
    if (fr.source !== "joint-evs-wvs-2017-2022") {
      fail(`FR.source must be joint-evs-wvs-2017-2022 (got ${JSON.stringify(fr.source)})`);
    }
    if (fr.year !== 2018) {
      fail(`FR.year must be 2018 Joint EVS fieldwork (got ${JSON.stringify(fr.year)})`);
    }
  }
  const withFr = data.questions.filter((q) => q.values && q.values.FR != null).length;
  if (withFr < 20) {
    fail(`France merged into too few questions (${withFr}); Joint title match may have broken`);
  }
  if (data.source && !String(data.source.retrieved_note || "").includes("France never fielded")) {
    fail("source.retrieved_note must document that France never fielded Wave 7");
  }
}

const libSrc = existsSync(LIB_PATH) ? readFileSync(LIB_PATH, "utf8") : "";
for (const name of [
  "getWvsColorOverlay",
  "sumWvsAnswers",
  "formatWvsSelectionLabel",
  "indexMapPaletteContinuous",
  "INDEX_MAP_PALETTE",
]) {
  if (!libSrc.includes(name)) fail(`wvsResults.ts must reference ${name}`);
}

const surfaces = [
  ["src/components/DemocracyMapControl.tsx", ["WvsSelectionPicker", "isWvsMapMode"]],
  ["src/components/DemocracyMapLegend.tsx", ["getWvsLegendStops", "isWvsMapMode"]],
  ["src/components/DemocracyIndexChart.tsx", ["encodeWvsAxisKey", "getWvsThemes"]],
  ["src/components/EntitySummary.tsx", ["WvsCountrySection", "getWvsSociety"]],
  ["src/pages/LearnPage.tsx", ["getWvsColorOverlay", "isWvsMapMode"]],
  ["src/lib/chartAxes.ts", ["isWvsAxisKey", "sumWvsAnswers"]],
  ["src/lib/democracyColors.ts", ["WvsMapMode", "isWvsMapMode"]],
];
for (const [rel, tokens] of surfaces) {
  const p = resolve(ROOT, rel);
  if (!existsSync(p)) {
    fail(`missing ${rel}`);
    continue;
  }
  const src = readFileSync(p, "utf8");
  for (const t of tokens) {
    if (!src.includes(t)) fail(`${rel} must reference ${t}`);
  }
}

if (errors.length) {
  console.error("WVS results check failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `WVS results check OK — ${data.questions.length} questions, ${Object.keys(data.societies).length} societies.`,
);
