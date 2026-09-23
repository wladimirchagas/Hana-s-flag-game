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

  // Q7-Q17 "Important child qualities" family: the PDF's bare "Important"
  // answer token was once silently dropped by the label extractor (not in
  // its known-token dictionary), shifting every label one column and
  // relabelling "Important: 84.2%" as "Not mentioned: 84.2%" for every
  // country. Regression guard for that exact defect class.
  const q7 = data.questions.find((q) => q.id === "Q7");
  if (!q7) {
    fail("Q7 missing from wvsResults.json");
  } else {
    if (q7.answers[0] !== "Important") {
      fail(`Q7 answers[0] should be "Important", got ${JSON.stringify(q7.answers[0])}`);
    }
    const au7 = q7.values?.AU;
    if (!au7 || au7[0] !== 84.2) {
      fail(`Q7 AU[0] should be 84.2 (Important), got ${JSON.stringify(au7)}`);
    }
  }

  // Q27-Q29 agree/disagree batteries: "Disagree strongly" was a phantom
  // KNOWN_ANSWERS entry that never occurs as a genuine PDF label — it only
  // ever matched a real "Disagree" column immediately followed by the START
  // of a real "Strongly disagree" column ("...Disagree Strongly\ndisagree
  // ..." is how pypdf renders the wrapped header), consuming both as one
  // token and silently shifting "Strongly disagree"'s value onto the
  // "Disagree" slot for every country. Regression guard for that defect.
  const q27 = data.questions.find((q) => q.id === "Q27");
  if (!q27) {
    fail("Q27 missing from wvsResults.json");
  } else {
    if (q27.answers[2] !== "Disagree") {
      fail(`Q27 answers[2] should be "Disagree", got ${JSON.stringify(q27.answers[2])}`);
    }
    const au27 = q27.values?.AU;
    if (!au27 || au27[2] !== 19) {
      fail(`Q27 AU[2] should be 19 (Disagree), got ${JSON.stringify(au27)}`);
    }
    if (!au27 || au27[3] !== 3.9) {
      fail(`Q27 AU[3] should be 3.9 (Strongly disagree), got ${JSON.stringify(au27)}`);
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

// Joint EVS/WVS merge guard. The EVS-only European countries (France, Italy,
// Spain, …) come from the Joint PDF, matched to Wave 7 questions by data. The
// earlier title-key match collapsed Q177–Q195 (all titled just "Justifiable")
// onto one table, giving France identical numbers for different questions.
if (data?.questions) {
  for (const iso of ["FR", "IT", "ES", "PL", "SE", "CH", "PT", "AT"]) {
    const s = data.societies?.[iso];
    const n = data.questions.filter((q) => Array.isArray(q.values?.[iso])).length;
    if (!s || s.source !== "joint-evs-wvs-2017-2022") {
      fail(`${iso} must be a Joint EVS/WVS society (got ${JSON.stringify(s?.source)})`);
    }
    if (n < 120) fail(`${iso} has Joint EVS/WVS data for only ${n} questions (need ≥120)`);
  }
  const fr1 = data.questions.find((q) => q.id === "Q1")?.values?.FR;
  if (!fr1 || fr1[0] !== 85.4 || fr1[1] !== 11.6) {
    fail(`Q1 FR must start [85.4, 11.6] (Joint A001), got ${JSON.stringify(fr1)}`);
  }
  const it49 = data.questions.find((q) => q.id === "Q49")?.values?.IT;
  // Joint A170 Italy row: "1.3 1.0 … 10.0 12.0" (dissatisfied → satisfied);
  // Wave 7 Q49 runs satisfied → dissatisfied, so it must start [12, 10].
  if (!it49 || it49[0] !== 12 || it49[1] !== 10 || it49[9] !== 1.3) {
    fail(`Q49 IT must start [12, 10] and end the scale at 1.3 (Joint A170 reversed), got ${JSON.stringify(it49)}`);
  }
  const seen = new Map();
  for (const q of data.questions) {
    const v = q.values?.FR;
    if (!v) continue;
    const key = JSON.stringify(v);
    if (seen.has(key)) fail(`FR has identical values for ${seen.get(key)} and ${q.id} — Joint tables collided`);
    else seen.set(key, q.id);
  }
}

// Continuation-page regression guard. Most tables span two PDF pages and the
// countries after the break (Tunisia … United States … Venezuela, Northern
// Ireland) live on the second one. A footer-stripping regex once deleted every
// continuation page, leaving the US with data for 4 of 307 questions.
if (data?.questions) {
  const q65 = data.questions.find((q) => q.id === "Q65");
  const us = q65?.values?.US;
  if (!us || us[0] !== 32.8 || us[1] !== 47.5) {
    fail(`Q65 US must start [32.8, 47.5] (continuation page), got ${JSON.stringify(us)}`);
  }
  for (const iso of ["US", "GB", "UY", "VE", "UA", "TR", "TN"]) {
    const n = data.questions.filter(
      (q) => Array.isArray(q.values?.[iso]) && q.values[iso].some((v) => v != null),
    ).length;
    if (n < 200) {
      fail(`${iso} has data for only ${n} questions (need ≥200) — continuation pages dropped?`);
    }
  }
}

// Wave 6 guard. South Africa's latest WVS survey is Wave 6 (2013). It is
// paired to Wave 7 questions through the Common EVS/WVS Dictionary and by
// answer label, so a reversed scale or a changed scale can never slip in —
// and because it is older, every surface must date it.
if (data?.questions) {
  const za = data.societies?.ZA;
  if (!za || za.wave !== 6 || za.year !== 2013 || za.source !== "wvs-wave6") {
    fail(`ZA must be the 2013 Wave 6 society (got ${JSON.stringify(za)})`);
  } else if (!String(za.note || "").includes("2013")) {
    fail("ZA note must say its figures are from 2013");
  }
  const val = (id) => data.questions.find((q) => q.id === id)?.values?.ZA;
  const expect = (id, idx, want, why) => {
    const v = val(id);
    if (!v || v[idx] !== want) fail(`${id} ZA[${idx}] must be ${want} (${why}), got ${JSON.stringify(v)}`);
  };
  expect("Q1", 0, 92.5, "V4 Family: Very important");
  // V23 runs dissatisfied → satisfied; Wave 7 Q49 runs satisfied → dissatisfied.
  expect("Q49", 0, 10.4, "V23 Completely satisfied");
  expect("Q49", 9, 4.1, "V23 Completely dissatisfied");
  expect("Q8", 0, 63.5, "V12 Independence: Mentioned");
  expect("Q94", 0, 18.5, "V25 Church: Not a member");
  // Wave 7 code absent in Wave 6 stays empty, never zero.
  expect("Q241", 0, null, "no 'against democracy (spontaneous)' code in Wave 6");
  expect("Q241", 1, 6.1, "V131 Not an essential characteristic");
  // Scale changed between waves (4-point → 5-point health) — must stay out.
  if (val("Q47")) fail("Q47 must have no ZA row: Wave 6 V11 is a 4-point scale, Wave 7 Q47 is 5-point");
  const n = data.questions.filter((q) => Array.isArray(q.values?.ZA)).length;
  if (n < 150) fail(`ZA has Wave 6 data for only ${n} questions (need ≥150)`);
}
for (const [rel, token] of [
  ["src/components/EntitySummary.tsx", "society.wave < 7"],
  ["src/components/DemocracyMapLegend.tsx", "olderWvsSocietiesIn"],
  ["src/components/WvsSelectionPicker.tsx", "getOlderWvsSocieties"],
  ["src/components/DemocracyIndexChart.tsx", "wvsOlderSurveyLabel"],
]) {
  const p = resolve(ROOT, rel);
  if (existsSync(p) && !readFileSync(p, "utf8").includes(token)) {
    fail(`${rel} must date older-survey societies (${token})`);
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
