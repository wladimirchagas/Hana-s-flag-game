#!/usr/bin/env node
/**
 * Parse the Wave 7 cross-national "Results By Country" PDF into a compact
 * JSON dataset the Learn-mode map/chart can query.
 *
 * Source of truth: data/wvs/wave7/wave-results/*Results_By_Country*.pdf
 * (auto-picked as the newest matching file in the manifest / directory).
 * Re-run after new wave PDFs land — the UI reads only the generated JSON.
 *
 * Usage: node scripts/build-wvs-results.mjs
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WAVE_DIR = resolve(ROOT, "data/wvs/wave7/wave-results");
const JOINT_DIR = resolve(ROOT, "data/wvs/joint-evs-wvs-2017-2022");
const INVENTORY = resolve(ROOT, "scripts/data/wvs-wave7-inventory.json");
const OUT_JSON = resolve(ROOT, "src/data/wvsResults.json");
const OUT_META = resolve(ROOT, "src/data/wvsResultsMeta.ts");

function findJointResultsPdf() {
  if (!existsSync(JOINT_DIR)) return null;
  const files = readdirSync(JOINT_DIR)
    .filter((f) => /Results_by_Country/i.test(f) && f.endsWith(".pdf"))
    .sort();
  return files.length ? resolve(JOINT_DIR, files[files.length - 1]) : null;
}

/**
 * France never fielded WVS Wave 7. Latest comparable percentages live in the
 * Joint EVS/WVS 2017–2022 Results-by-Country PDF (variable codes A### / …),
 * matched to Wave 7 questions by shared short title (e.g. both say
 * "Important in life: Family"). Wave 5 France PDF is superseded — do not use.
 */
function mergeFranceFromJoint(questions, societies) {
  const jointPath = findJointResultsPdf();
  if (!jointPath) {
    console.warn("No Joint EVS/WVS Results_by_Country PDF — France not merged");
    return { merged: 0, jointPath: null };
  }
  console.log(`Merging France from ${jointPath} …`);
  const pages = extractAllPages(jointPath);
  const byTitle = new Map();
  for (let i = 0; i < pages.length; i++) {
    const t = pages[i] || "";
    // Joint variables: A001-, A002-, … also some Q-coded shared items
    const m = t.match(
      /^([A-Z]\d+[A-Z]?)\s*[-–]\s*([\s\S]+?)(?=\nTOTAL\b)/,
    );
    if (!m) continue;
    const end = Math.min(i + 3, pages.length);
    const block = stripFooter(pages.slice(i, end).join("\n"));
    const title = extractShortTitle(block);
    if (!title) continue;
    let franceLine = null;
    for (const line of block.split("\n")) {
      const trimmed = line.trim();
      // Prefer bare "France" over "France EVS" if both appear; Joint uses "France".
      if (/^France\s+[\d,(]/.test(trimmed) && !/^France\s+(EVS|WVS)/i.test(trimmed)) {
        franceLine = trimmed;
        break;
      }
    }
    if (!franceLine) continue;
    // Reuse country-row parser with France aliased
    const fake = franceLine; // "France 1,880 85.4 …"
    const parsed = (() => {
      const rest = fake.replace(/^France\s+/, "").trim();
      const parenN = rest.match(/^\(([\d,]+)\)\s+(.*)$/);
      const bareN = rest.match(/^([\d,]+)\s+(.*)$/);
      let pctRest;
      if (parenN) pctRest = parenN[2];
      else if (bareN) pctRest = bareN[2];
      else return null;
      pctRest = pctRest.replace(/\s*\([\d,]+\)\s+[\d.]+$/, "").trim();
      return pctRest.split(/\s+/).filter(Boolean).map(parsePctCell);
    })();
    if (!parsed || parsed.length < 2) continue;
    const key = titleMatchKey(title);
    byTitle.set(key, parsed);
  }

  let merged = 0;
  for (const q of questions) {
    const key = titleMatchKey(q.title);
    const pcts = byTitle.get(key);
    if (!pcts) continue;
    // Align length to this question's answer columns
    const aligned = pcts.slice(0, q.answers.length);
    while (aligned.length < q.answers.length) aligned.push(null);
    q.values.FR = aligned;
    merged += 1;
  }

  societies.FR = {
    name: "France",
    year: 2018,
    wave: 7,
    source: "joint-evs-wvs-2017-2022",
    note: "France did not field WVS Wave 7; figures from Joint EVS/WVS 2017–2022 (EVS fieldwork 2018).",
  };
  console.log(`France merged into ${merged} / ${questions.length} questions`);
  return { merged, jointPath };
}

const COUNTRY_NAME_TO_ISO = {
  Andorra: "AD",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Bangladesh: "BD",
  Bolivia: "BO",
  Brazil: "BR",
  Myanmar: "MM",
  Canada: "CA",
  Chile: "CL",
  China: "CN",
  "Taiwan ROC": "TW",
  Colombia: "CO",
  Cyprus: "CY",
  Czechia: "CZ",
  Ecuador: "EC",
  Ethiopia: "ET",
  Germany: "DE",
  Greece: "GR",
  Guatemala: "GT",
  "Hong Kong SAR": "HK",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Japan: "JP",
  Kazakhstan: "KZ",
  Jordan: "JO",
  Kenya: "KE",
  "South Korea": "KR",
  Kyrgyzstan: "KG",
  Lebanon: "LB",
  Libya: "LY",
  "Macau SAR": "MO",
  Malaysia: "MY",
  Maldives: "MV",
  Mexico: "MX",
  Mongolia: "MN",
  Morocco: "MA",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Nigeria: "NG",
  Pakistan: "PK",
  Peru: "PE",
  Philippines: "PH",
  "Puerto Rico": "PR",
  Romania: "RO",
  Russia: "RU",
  "Russian Federation": "RU",
  Serbia: "RS",
  Singapore: "SG",
  Slovakia: "SK",
  Vietnam: "VN",
  Zimbabwe: "ZW",
  Tajikistan: "TJ",
  Thailand: "TH",
  Tunisia: "TN",
  Turkey: "TR",
  Ukraine: "UA",
  "Great Britain": "GB",
  "United Kingdom - Great Britain": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Venezuela: "VE",
  // Northern Ireland is surveyed separately; world-map UN tile is GB.
  // Keep under a distinct key so it does not overwrite Great Britain.
  "Northern Ireland": "GB-NIR",
  Egypt: "EG",
};

/**
 * Theme buckets derived from the PDF's short titles (e.g. "Confidence: Courts").
 * Prefix match order matters — longer / more specific first. New questions with
 * an already-known prefix land in the right group automatically.
 */
const THEME_DEFS = [
  { id: "important-in-life", label: "Important in life", prefixes: ["Important in life:"] },
  { id: "child-qualities", label: "Child qualities", prefixes: ["Child qualities:", "Important child qualities:"] },
  { id: "neighbors", label: "Neighbors & social distance", prefixes: ["Neighbors:", "Neighbour:"] },
  { id: "trust", label: "Interpersonal trust", prefixes: ["Trust:", "Most people can be trusted"] },
  { id: "confidence", label: "Confidence in institutions", prefixes: ["Confidence:"] },
  {
    id: "democracy",
    label: "Democracy & regimes",
    prefixes: [
      "Democracy:",
      "Democracy ",
      "Political system:",
      "Having a democratic",
      "Importance of democracy",
      "How democratically",
      "Respect for individual human rights",
      "Honest election",
      "Left-right political",
    ],
  },
  {
    id: "politics",
    label: "Political interest & action",
    prefixes: [
      "Political action:",
      "Interest in politics",
      "Active membership:",
      "Inactive membership:",
      "Vote",
      "Social activism",
      "How often discusses political",
      "How often in country's elections",
      "Political system",
      "Willingness to fight",
      "Aims of country",
      "Aims of respondent",
      "Most important:",
      "Government has the right",
      "Freedom and Equality",
      "Freedom and security",
      "believe most politicians",
      "trusting politicians",
      "politicians are open",
      "government usually does the right",
      "Information provided by the government",
      "cautious about trusting the government",
      "chief wage earner",
      "Social class",
    ],
  },
  {
    id: "religion",
    label: "Religion & beliefs",
    prefixes: [
      "Religious",
      "Religion:",
      "Believe in:",
      "How often pray",
      "How often do you pray",
      "How often attend",
      "Importance of God",
      "The only acceptable religion",
      "Belong to a religion",
    ],
  },
  {
    id: "morals",
    label: "Morals & justifiability",
    prefixes: [
      "Justifiable:",
      "Justifiable",
      "Homosexuality",
      "Abortion",
      "Divorce",
      "Homosexual couples",
      "Duty towards society to have children",
      "It is children duty",
    ],
  },
  {
    id: "security",
    label: "Security & safety",
    prefixes: [
      "Secure in neighborhood",
      "Frequency in your neighborhood:",
      "Worries:",
      "Things done for reasons of security",
      "Respondent was victim of a crime",
    ],
  },
  {
    id: "migration",
    label: "Migration & national identity",
    prefixes: [
      "Immigration",
      "Immigrant",
      "Impact of immigrants",
      "National pride",
      "Citizen",
      "Explore your ancestry",
      "Feel close to",
      "Jobs scarce: Employers should give priority",
      "Respondent immigrant",
    ],
  },
  {
    id: "economy",
    label: "Economy & work",
    prefixes: [
      "Economy:",
      "Work:",
      "Work ",
      "Income",
      "Competition",
      "Private vs state",
      "Jobs scarce:",
      "People who don't work",
      "Work is a duty",
      "Work should always come first",
      "Government's vs individual's responsibility",
      "Success In the long run",
      "Protecting environment vs",
      "Standard of living comparing",
      "Future changes:",
      "Basic kinds of attitudes concerning society",
      "Employment status",
      "Occupational group",
      "How many children",
      "Do you live with your parents",
      "Number of people in household",
      "Highest educational level",
    ],
  },
  { id: "science", label: "Science & technology", prefixes: ["Science", "Technology"] },
  {
    id: "corruption",
    label: "Corruption & governance",
    prefixes: [
      "Perceptions of corruption",
      "Bribe",
      "Corruption",
      "women are less corrupt",
      "International organizations",
      "UN Security Council",
      "International Monetary Fund",
      "Amnesty International",
    ],
  },
  {
    id: "happiness",
    label: "Happiness & wellbeing",
    prefixes: [
      "Feeling of happiness",
      "Satisfaction",
      "State of health",
      "Freedom of choice",
      "Satisfaction with your life",
    ],
  },
  {
    id: "gender",
    label: "Gender & family",
    prefixes: [
      "Gender",
      "Men make better",
      "Wife",
      "Mother",
      "Father",
      "Family",
      "University is more important for a boy",
      "Jobs scarce: Men should have more right",
      "One of main goals in life has been to make my parents proud",
      "Sex Male",
      "Sex",
      "Year of birth",
      "Age Up to",
    ],
  },
  { id: "media", label: "Media & information", prefixes: ["Information source:", "Fake news", "Social media"] },
];

const THEME_FALLBACK = { id: "other", label: "Other questions" };

function themeForTitle(title, prompt) {
  const hay = `${title}\n${prompt}`;
  for (const t of THEME_DEFS) {
    for (const p of t.prefixes) {
      if (hay.toLowerCase().includes(p.toLowerCase())) return t.id;
    }
  }
  return THEME_FALLBACK.id;
}

function findWaveResultsPdf() {
  if (!existsSync(WAVE_DIR)) {
    throw new Error(`Missing ${WAVE_DIR}`);
  }
  const files = readdirSync(WAVE_DIR)
    .filter((f) => /Results_By_Country/i.test(f) && f.endsWith(".pdf"))
    .sort();
  if (!files.length) {
    throw new Error("No Results_By_Country PDF under data/wvs/wave7/wave-results/");
  }
  // Prefer the highest version token in the filename when several exist.
  return resolve(WAVE_DIR, files[files.length - 1]);
}

function extractAllPages(pdfPath) {
  const py = `
from pypdf import PdfReader
import json, sys
r = PdfReader(sys.argv[1])
pages = []
for i, p in enumerate(r.pages):
    pages.append(p.extract_text() or "")
print(json.dumps(pages))
`;
  const out = execFileSync("python3", ["-c", py, pdfPath], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(out);
}

/**
 * Same PDF, extracted with pypdf's "layout" mode, which preserves each
 * column's x-position as whitespace padding instead of flattening to plain
 * reading order. Used only for reconstructing answer-column HEADER labels
 * (see extractAnswerLabelsLayout) — row values still come from the plain
 * extraction above, which is already proven correct.
 */
function extractAllPagesLayout(pdfPath) {
  const py = `
from pypdf import PdfReader
import json, sys
r = PdfReader(sys.argv[1])
pages = []
for i, p in enumerate(r.pages):
    pages.append(p.extract_text(extraction_mode="layout") or "")
print(json.dumps(pages))
`;
  const out = execFileSync("python3", ["-c", py, pdfPath], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(out);
}

/**
 * Remove every per-page footer ("World Values Survey Wave 7 (2017-2022)" …
 * "Page N of 969") individually.
 *
 * The old pattern ended in `\s*$` with no `m` flag, so `$` meant END OF
 * STRING: the lazy match ran from the FIRST page's footer all the way to the
 * LAST, deleting every continuation page of a multi-page table. Most tables
 * span two pages, so every country after the page break (Tunisia … United
 * States … Venezuela, Northern Ireland) silently lost its data — the US had
 * values for only 4 of 307 questions.
 */
function stripFooter(text) {
  return text
    .replace(
      /World Values Survey Wave 7 \(2017-2022\)\s*\n[\s\S]*?Page \d+ of \d+[ \t]*/g,
      "",
    )
    .trimEnd();
}

function parseSurveyYears(pages) {
  // Pages 2–3: country × year matrix. Each country row has N then year % columns.
  const years = {};
  const yearCols = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const blob = `${pages[1] || ""}\n${pages[2] || ""}`;
  for (const line of blob.split("\n")) {
    const m = line.match(
      /^([A-Za-z][A-Za-z .'-]+?)\s+([\d,]+)\s+((?:[\d.]+|-)\s*)+$/,
    );
    if (!m) continue;
    const name = m[1].trim();
    if (name === "TOTAL" || name.startsWith("TOTAL")) continue;
    const iso = COUNTRY_NAME_TO_ISO[name];
    if (!iso) continue;
    const rest = line.slice(m[0].indexOf(m[2]) + m[2].length).trim();
    const cells = rest.split(/\s+/).filter(Boolean);
    for (let i = 0; i < yearCols.length && i < cells.length; i++) {
      const v = cells[i];
      if (v !== "-" && Number(v) > 0) {
        years[iso] = yearCols[i];
        break;
      }
    }
  }
  return years;
}

const META_SKIP = new Set([
  "TOTAL",
  "Very",
  "Rather",
  "Not",
  "Don't",
  "No",
  "Other",
  "Multiple",
  "Mail",
  "A",
  "Quite",
  "None",
  "Mentioned",
  "important",
  "deal",
  "lot",
  "much",
  "all",
  "know",
  "answer",
  "missing",
  "answers",
  "(EVS)",
  "EVS)",
]);

function isCountryRow(line) {
  if (!line || line.startsWith("TOTAL")) return false;
  // Country rows end with numbers / dashes
  if (!/[\d.]/.test(line)) return false;
  // Must start with a letter (country name)
  if (!/^[A-Za-z]/.test(line)) return false;
  // Exclude pure header fragments
  const first = line.split(/\s+/)[0];
  if (META_SKIP.has(first) && !COUNTRY_NAME_TO_ISO[first]) {
    // "Netherlands", "New Zealand" etc. are countries
    if (!Object.keys(COUNTRY_NAME_TO_ISO).some((n) => line.startsWith(n))) {
      return false;
    }
  }
  return Object.keys(COUNTRY_NAME_TO_ISO).some((n) => line.startsWith(n));
}

function parsePctCell(tok) {
  if (tok === "-" || tok === "" || tok == null) return null;
  const n = Number(String(tok).replace(/%/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseCountryDataRow(line) {
  for (const name of Object.keys(COUNTRY_NAME_TO_ISO).sort(
    (a, b) => b.length - a.length,
  )) {
    if (!line.startsWith(name)) continue;
    const rest = line.slice(name.length).trim();
    // Categorical tables: "Andorra 1,004 89.5 9.7 …"
    // Scale tables:      "Andorra (1,004) 17.2 16.6 … (1,004) 7.52"
    let n = null;
    let pctRest = rest;
    const parenN = rest.match(/^\(([\d,]+)\)\s+(.*)$/);
    const bareN = rest.match(/^([\d,]+)\s+(.*)$/);
    if (parenN) {
      n = Number(parenN[1].replace(/,/g, ""));
      pctRest = parenN[2];
    } else if (bareN) {
      n = Number(bareN[1].replace(/,/g, ""));
      pctRest = bareN[2];
    } else {
      return null;
    }
    // Drop a trailing "Base mean" / "Mean" [/ "Std Dev."] group: "(978) 5.80",
    // "(1,004) 46.83 16.15" (some scale variables — e.g. Q262 Age, Q270
    // household size — report Base, Mean AND Std Dev.), or a bare "(995)"
    // with no mean value at all (e.g. Q241-249 "essential characteristic of
    // democracy" battery). Every one of these was previously left attached
    // and silently counted as an extra "answer" percentage column.
    pctRest = pctRest
      .replace(/\s*\([\d,]+\)(?:\s+[\d.]+(?:\s+[\d.]+)?)?$/, "")
      .trim();
    const cells = pctRest.trim().split(/\s+/).filter(Boolean).map(parsePctCell);
    return {
      name,
      iso: COUNTRY_NAME_TO_ISO[name],
      n,
      pcts: cells,
    };
  }
  return null;
}

const COUNTRY_NAMES_BY_LEN = Object.keys(COUNTRY_NAME_TO_ISO).sort(
  (a, b) => b.length - a.length,
);

/** Locate a country row's numeric/dash token spans in a LAYOUT-mode line. */
function findCountryTokenSpans(line) {
  for (const name of COUNTRY_NAMES_BY_LEN) {
    if (!line.startsWith(name)) continue;
    const restStart = name.length;
    const rest = line.slice(restStart);
    const spans = [];
    const re = /\(([\d,]+)\)|(-)(?!\w)|(\d[\d,]*\.?\d*)/g;
    let m;
    while ((m = re.exec(rest))) {
      spans.push({
        start: restStart + m.index,
        end: restStart + m.index + m[0].length,
        text: m[0],
      });
    }
    if (spans.length) return { name, spans };
  }
  return null;
}

const HOUSEKEEPING_HEADER_WORDS = new Set(["base", "mean"]);

/**
 * Reconstruct answer-column labels by slicing the PDF's LAYOUT-mode text
 * (extraction_mode="layout", which preserves each column's x-position as
 * whitespace padding) into per-column word groups, using the first parsed
 * country data row's own numeric-token x-positions as column anchors, then
 * assigning each header word to whichever column's anchor is nearest its own
 * x-position.
 *
 * This recovers free-text / scale-endpoint labels the old KNOWN_ANSWERS
 * dictionary approach (extractAnswerLabels, kept below as a fallback) could
 * never see, because they are unique per question ("Incomes should be made
 * more equal", the three "Basic kinds of attitudes" options, …). That
 * dictionary approach also silently mislabelled recurring short tokens that
 * were never added to it — e.g. bare "Important" (Q7-Q17 "child qualities")
 * was skipped as junk, shifting every label one column short. See the WVS
 * label-alignment audit (2026-09) for the full defect catalogue.
 */
function extractAnswerLabelsLayout({ layoutLines, colCount, shortTitle, firstRowName }) {
  let dataIdx = -1;
  let spans = null;
  for (let i = 0; i < layoutLines.length; i++) {
    const ln = layoutLines[i];
    if (!ln.startsWith(firstRowName)) continue;
    const found = findCountryTokenSpans(ln);
    if (found && found.spans.length >= colCount + 1) {
      dataIdx = i;
      spans = found.spans;
      break;
    }
  }
  if (dataIdx < 0 || !spans) return null;

  const answerSpans = spans.slice(1, 1 + colCount);
  if (answerSpans.length < colCount) return null;
  const centers = answerSpans.map((s) => (s.start + s.end) / 2);
  // The right edge of the LAST content column must not swallow a trailing
  // "(base_n) mean" pair's header text ("Base" / "mean" / "Mean").
  const trailingBound = spans.length > 1 + colCount ? spans[1 + colCount].start : null;

  const normTitle = shortTitle
    ? shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, "")
    : null;
  const colWords = Array.from({ length: colCount }, () => []);
  let lineSeq = 0;
  for (let i = 0; i < dataIdx; i++) {
    const ln = layoutLines[i];
    const stripped = ln.trim();
    if (!stripped) continue;
    if (ln.includes("World Values Survey Wave 7") || ln.includes("Results in % by country")) {
      continue;
    }
    const lead = ln.length - ln.replace(/^ +/, "").length;
    if (lead === 0) continue; // flush-left prompt paragraph text, not column headers
    if (normTitle) {
      const normLine = stripped.toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (normLine) {
        if (normLine === normTitle) continue;
        if (normLine.includes(normTitle) && normLine.length - normTitle.length <= 6) continue;
        if (normTitle.includes(normLine) && normTitle.length - normLine.length <= 6) continue;
      }
    }
    lineSeq += 1;
    const wordRe = /\S+/g;
    let wm;
    while ((wm = wordRe.exec(ln))) {
      const word = wm[0];
      if (word === "TOTAL") continue;
      if (HOUSEKEEPING_HEADER_WORDS.has(word.toLowerCase())) continue;
      const wStart = wm.index;
      const wEnd = wm.index + word.length;
      if (trailingBound != null && wStart >= trailingBound) continue;
      const wCenter = (wStart + wEnd) / 2;
      let bestI = 0;
      let bestD = Infinity;
      for (let ci = 0; ci < centers.length; ci++) {
        const d = Math.abs(wCenter - centers[ci]);
        if (d < bestD) {
          bestD = d;
          bestI = ci;
        }
      }
      colWords[bestI].push([lineSeq, wStart, word]);
    }
  }

  const labels = colWords.map((words) => {
    words.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return words
      .map((w) => w[2])
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  });
  const emptyCount = labels.filter((l) => !l).length;
  // Reject only when extraction made little real progress. A single empty
  // column (its header word landed just past a neighbour's boundary — the
  // remaining columns are still trustworthy) is filled with a positional
  // placeholder rather than discarding everything already recovered
  // correctly; that is strictly better than the caller's own full-question
  // "Answer 1..N" fallback, which would also blank out the columns this DID
  // get right.
  if (emptyCount > Math.max(1, Math.ceil(colCount * 0.2))) return null;
  return labels.map((l, i) => l || `Answer ${i + 1}`);
}

/** Answer-header fragments that must never be absorbed into the short title. */
const ANSWER_TOKEN_START =
  /^(Very|Rather|Not very|Not at all|Don't|Don´t|No answer|No\b|Mentioned|Important\b|A great|Quite a|None at|Strongly|Completely|Complete|Agree|Disagree|Yes\b|Missing|Other missing|Multiple|Mail|Better|Worse|Or about|Good thing|Don't mind|Bad thing|Hard to say|Never|Always|Left\b|Right\b|Male\b|Female\b|Full time|Part time|\d+\b)/i;

function extractShortTitle(block) {
  // After first TOTAL line, the next non-empty line(s) before answer headers /
  // country rows form the short title ("Important in life: Family").
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  const totalIdx = lines.findIndex((l) => l === "TOTAL");
  if (totalIdx < 0) return null;
  const parts = [];
  for (let i = totalIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (isCountryRow(l) || l.startsWith("TOTAL (")) break;
    // Lines that start with an answer token BUT contain ":" are titles
    // ("Important child qualities: independence"), not answer headers.
    if (ANSWER_TOKEN_START.test(l) && !l.includes(":")) break;
    parts.push(l);
    const joined = parts.join(" ").replace(/\s+/g, " ").trim();
    if (joined.includes(":") && joined.length >= 12) break;
    if (joined.length > 90) break;
  }
  let title = parts.join(" ").replace(/\s+/g, " ").trim();
  // Strip answer tokens that leaked onto the same line after the title body.
  for (const stop of [
    " Important ",
    " Mentioned ",
    " Not mentioned ",
    " Very ",
    " Rather ",
    " Agree ",
    " Don't ",
    " Don´t ",
    " No answer ",
    " A great ",
  ]) {
    const colon = title.indexOf(":");
    const idx = title.indexOf(stop);
    if (colon >= 0 && idx > colon) {
      title = title.slice(0, idx).trim();
      break;
    }
  }
  return title || null;
}

function titleMatchKey(title) {
  return title
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/^important child qualities:/, "child qualities:");
}

/** Known multi-word answer tokens (longer first). */
const KNOWN_ANSWERS = [
  "Other missing",
  "Multiple answers",
  "Mail (EVS)",
  "Don't know",
  "Don´t know",
  "No answer",
  "Not available",
  "Not asked",
  "Not mentioned",
  "Missing",
  "Very important",
  "Rather important",
  "Not very important",
  "Not at all important",
  "Not at all frequently",
  "Not very much",
  "None at all",
  "A great deal",
  "Quite a lot",
  "Quite frequently",
  "Very frequently",
  "Not frequently",
  "Agree strongly",
  "Strongly agree",
  "Strongly disagree",
  // NOT "Disagree strongly" — the WVS agree/disagree batteries always word
  // the negative extreme as "Strongly disagree", never "Disagree strongly".
  // That string used to appear in this list anyway, and matched a genuine
  // "Disagree" column immediately followed by the START of a genuine
  // "Strongly disagree" column ("...Disagree Strongly\ndisagree..." is how
  // pypdf renders the wrapped header) as if it were ONE label — which
  // silently swallowed the true "Disagree" column and shifted "Strongly
  // disagree"'s value onto the "Disagree" slot for every 4-point
  // agree/disagree question (Q27-Q29 and others) in every country. See the
  // WVS label-alignment audit (2026-09).
  "Neither agree nor disagree",
  "Neither agree or disagree",
  "Completely agree",
  "Completely disagree",
  "Complete ly agree",
  "Complete ly disagree",
  "Complete ly satisfied",
  "Complete ly dissatisfi ed",
  "Completely satisfied",
  "Completely dissatisfied",
  "Agree",
  "Disagree",
  "Mentioned",
  "Important",
  "Better off",
  "Worse off",
  "Or about the same",
  "Good thing",
  "Don't mind",
  "Bad thing",
  "Hard to say",
  "Never justifiable",
  "Always justifiable",
  "Base mean",
  "Mean",
  "Yes",
  "No",
];

function normaliseAnswerLabel(raw) {
  if (raw === "Don´t know") return "Don't know";
  return raw
    .replace(/^Complete ly /i, "Completely ")
    .replace(/dissatisfi ed$/i, "dissatisfied");
}

/**
 * Dictionary-based answer-label extraction. When `strict` is true, this
 * NEVER guesses: it returns a label set only when the KNOWN_ANSWERS
 * vocabulary explains the ENTIRE header text with nothing skipped as
 * "junk" and produces EXACTLY colCount labels — i.e. a proof, not a
 * plausible-looking approximation. That strict mode is what the caller
 * trusts over the layout-based extraction (extractAnswerLabelsLayout) for
 * questions built entirely from short recurring phrases (e.g. "Very
 * important" / "Rather important" / …), where it reproduces the exact
 * column order and phrase grouping the layout heuristic sometimes garbles
 * for closely-spaced short columns.
 *
 * In non-strict mode (the pre-existing behaviour, used only as a last-resort
 * fallback when neither strict dictionary matching nor layout extraction
 * succeeds) it silently skips unrecognised text and pads short results with
 * "Answer N" placeholders — this is why an unrecognised token like bare
 * "Important" was once silently dropped instead of surfacing as a defect.
 */
function extractAnswerLabels(block, colCount, shortTitle, strict = false) {
  // Heuristic: text between short title and first country row, joined and
  // split into colCount labels when possible; otherwise generate Answer 1..N.
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  const totalIdx = lines.findIndex((l) => l === "TOTAL");
  if (totalIdx < 0) {
    if (strict) return null;
    return Array.from({ length: colCount }, (_, i) => `Answer ${i + 1}`);
  }

  const firstCountry = lines.findIndex(
    (l, i) => i > totalIdx && isCountryRow(l),
  );
  if (firstCountry < 0) {
    if (strict) return null;
    return Array.from({ length: colCount }, (_, i) => `Answer ${i + 1}`);
  }

  // Skip every short-title line (often contains ":") before answer headers.
  let start = totalIdx + 1;
  while (start < firstCountry) {
    const l = lines[start];
    if (ANSWER_TOKEN_START.test(l) || /^\d+$/.test(l)) break;
    start += 1;
    if (start - totalIdx > 6) break;
  }

  let joined = lines
    .slice(start, firstCountry)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  // Belt-and-braces: never let the short title leak into answer labels.
  if (shortTitle) {
    const t = shortTitle.replace(/\s+/g, " ").trim();
    if (t && joined.toLowerCase().startsWith(t.toLowerCase())) {
      joined = joined.slice(t.length).trim();
    }
  }

  if (joined) {
    const labels = [];
    let rest = joined;
    let skippedAnyText = false;
    // Parse recognisable tokens; SKIP junk instead of promoting it to a label
    // (that is how short titles used to become answer column 1).
    while (rest && labels.length < colCount + 4) {
      let src = null;
      for (const k of KNOWN_ANSWERS) {
        if (rest.toLowerCase().startsWith(k.toLowerCase())) {
          src = k;
          break;
        }
      }
      if (src) {
        const label = normaliseAnswerLabel(src);
        if (label !== "Base mean" && label !== "Mean") labels.push(label);
        rest = rest.slice(src.length).trim();
        continue;
      }
      const num = rest.match(/^(\d+)\b/);
      if (num) {
        labels.push(num[1]);
        rest = rest.slice(num[1].length).trim();
        continue;
      }
      // Skip unknown prefix until next known token / digit.
      const lower = rest.toLowerCase();
      let next = Infinity;
      for (const k of KNOWN_ANSWERS) {
        const idx = lower.indexOf(k.toLowerCase());
        if (idx >= 0 && idx < next) next = idx;
      }
      const nextNum = rest.search(/\d/);
      if (nextNum >= 0 && nextNum < next) next = nextNum;
      if (next < Infinity && next > 0) {
        skippedAnyText = true;
        rest = rest.slice(next).trim();
        continue;
      }
      break;
    }
    if (strict) {
      // A proof: nothing skipped, no leftover unmatched text, and at least
      // colCount labels recovered (trailing recognised footer categories
      // beyond colCount — e.g. "Multiple answers"/"Mail (EVS)" after the
      // real data columns end — are truncated, exactly as the relaxed path
      // below already does; that never hides anything, since every token up
      // to and including colCount was still proven, not guessed).
      return !skippedAnyText && !rest && labels.length >= colCount
        ? labels.slice(0, colCount)
        : null;
    }
    if (labels.length >= colCount) return labels.slice(0, colCount);
    if (labels.length >= Math.max(2, colCount - 2)) {
      while (labels.length < colCount) {
        labels.push(`Answer ${labels.length + 1}`);
      }
      return labels;
    }
  }

  if (strict) return null;
  return Array.from({ length: colCount }, (_, i) => `Answer ${i + 1}`);
}

/**
 * `blockPages` is the question's table pages in order. Header, short title,
 * answer labels and the column-count mode come from the FIRST page only (as
 * before the continuation-page fix, so labels do not drift); country rows are
 * read from EVERY page, first occurrence of an ISO winning.
 */
function parseQuestionBlock(id, prompt, blockPages, layoutBlockLines) {
  const cleanPages = blockPages.map((p) => stripFooter(p || ""));
  const clean = cleanPages[0] || "";
  const shortTitle = extractShortTitle(clean) || id;
  const parseRows = (text) => {
    const out = [];
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!isCountryRow(t)) continue;
      const row = parseCountryDataRow(t);
      if (row) out.push(row);
    }
    return out;
  };
  const firstPageRows = parseRows(clean);
  const rows = [];
  const seen = new Set();
  for (const r of [firstPageRows, ...cleanPages.slice(1).map(parseRows)].flat()) {
    if (seen.has(r.iso)) continue;
    seen.add(r.iso);
    rows.push(r);
  }
  if (!firstPageRows.length) return null;

  // Column count = mode of pct lengths (ignore truncated rows), first page only.
  const counts = new Map();
  for (const r of firstPageRows) {
    counts.set(r.pcts.length, (counts.get(r.pcts.length) || 0) + 1);
  }
  let colCount = 0;
  let best = 0;
  for (const [c, n] of counts) {
    if (n > best) {
      best = n;
      colCount = c;
    }
  }
  if (colCount < 2) return null;

  // Prefer a STRICT dictionary match first: when every column is one of the
  // short, widely-recurring phrases (KNOWN_ANSWERS) with nothing skipped, it
  // reproduces the exact phrase text and grouping more reliably than the
  // layout heuristic does for tightly-packed short columns. Only fall back
  // to layout-based extraction (which alone can recover free-text /
  // scale-endpoint labels no dictionary could ever list) when the strict
  // dictionary match can't prove itself; and only fall back further to the
  // relaxed dictionary match (which may silently drop unrecognised text) as
  // a last resort.
  let answers = extractAnswerLabels(clean, colCount, shortTitle, true);
  if (!answers && layoutBlockLines) {
    try {
      answers = extractAnswerLabelsLayout({
        layoutLines: layoutBlockLines,
        colCount,
        shortTitle,
        firstRowName: firstPageRows[0].name,
      });
    } catch {
      answers = null;
    }
  }
  if (!answers || answers.length !== colCount) {
    answers = extractAnswerLabels(clean, colCount, shortTitle);
  }
  const byCode = {};
  for (const r of rows) {
    if (r.pcts.length !== colCount) {
      // Pad / trim to colCount
      const pcts = r.pcts.slice(0, colCount);
      while (pcts.length < colCount) pcts.push(null);
      byCode[r.iso] = pcts;
    } else {
      byCode[r.iso] = r.pcts;
    }
  }

  return {
    id,
    prompt: prompt.replace(/\s+/g, " ").trim(),
    title: shortTitle.replace(/\s+/g, " ").trim(),
    theme: themeForTitle(shortTitle, prompt),
    answers,
    values: byCode,
  };
}

function main() {
  const pdfPath = findWaveResultsPdf();
  console.log(`Parsing ${pdfPath} …`);
  const pages = extractAllPages(pdfPath);
  console.log(`Pages: ${pages.length}`);
  console.log("Extracting layout-mode text for answer-column labels …");
  const layoutPages = extractAllPagesLayout(pdfPath);

  const surveyYears = parseSurveyYears(pages);
  console.log(`Survey years for ${Object.keys(surveyYears).length} societies`);

  // Locate question starts
  const starts = [];
  for (let i = 0; i < pages.length; i++) {
    const t = pages[i] || "";
    const m = t.match(/^(Q\d+[A-Z]?)\s*[-–]\s*([\s\S]+?)(?=\nTOTAL\b)/);
    if (m) {
      starts.push({
        page: i,
        id: m[1],
        prompt: m[2].replace(/\n/g, " ").trim(),
      });
    }
  }
  console.log(`Question starts: ${starts.length}`);

  // Every page that opens ANY table (including variants such as "Q33_3-",
  // which the question-start regex above deliberately does not import). A
  // question's block must end at the next one, or — now that continuation
  // pages are kept — a variant table's rows would bleed into the question
  // before it and overwrite its values.
  const tableStarts = [];
  for (let i = 0; i < pages.length; i++) {
    if (/^[A-Z]+\d+[A-Za-z0-9_]*\s*[-–]/.test(pages[i] || "")) tableStarts.push(i);
  }

  const questions = [];
  for (let s = 0; s < starts.length; s++) {
    const cur = starts[s];
    const nextTable = tableStarts.find((p) => p > cur.page) ?? pages.length;
    const nextQuestion = s + 1 < starts.length ? starts[s + 1].page : pages.length;
    const endPage = Math.min(nextTable, nextQuestion, cur.page + 3, pages.length);
    const blockPages = pages.slice(cur.page, endPage);
    const layoutBlockLines = (layoutPages[cur.page] || "").split("\n");
    const q = parseQuestionBlock(cur.id, cur.prompt, blockPages, layoutBlockLines);
    if (q) questions.push(q);
    else console.warn(`  skip ${cur.id} (parse failed)`);
  }
  console.log(`Parsed questions: ${questions.length}`);

  // Society list from inventory + years
  const inventory = JSON.parse(readFileSync(INVENTORY, "utf8"));
  const societies = {};
  for (const doc of inventory.documents) {
    if (!doc.iso2 || !doc.doid) continue;
    const iso = doc.iso2 === "GB" && doc.society_key === "GB-NIR" ? "GB-NIR" : doc.iso2;
    // Prefer Great Britain over Northern Ireland for GB year when both exist
    if (iso === "GB-NIR") {
      societies["GB-NIR"] = {
        name: doc.country,
        year: surveyYears["GB-NIR"] ?? null,
        wave: 7,
      };
      continue;
    }
    if (iso === "GB" || !societies[iso]) {
      societies[iso] = {
        name: doc.country.replace(/^United Kingdom - /, ""),
        year: surveyYears[iso] ?? null,
        wave: 7,
      };
    }
  }
  // India / Uzbekistan appear in the wave PDF even without country-results files
  for (const iso of ["IN", "UZ"]) {
    if (surveyYears[iso] && !societies[iso]) {
      societies[iso] = {
        name: iso === "IN" ? "India" : "Uzbekistan",
        year: surveyYears[iso],
        wave: 7,
      };
    }
  }
  for (const [iso, year] of Object.entries(surveyYears)) {
    if (!societies[iso]) {
      societies[iso] = { name: iso, year, wave: 7 };
    } else if (societies[iso].year == null) {
      societies[iso].year = year;
    }
  }

  const { merged: franceMerged, jointPath } = mergeFranceFromJoint(
    questions,
    societies,
  );

  const pdfBuf = readFileSync(pdfPath);
  const payload = {
    source: {
      path: pdfPath.replace(ROOT + "/", ""),
      sha256: createHash("sha256").update(pdfBuf).digest("hex"),
      bytes: pdfBuf.length,
      wave: 7,
      wave_years_label: "2017-2022",
      publisher: "World Values Survey Association",
      documentation_url:
        "https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp",
      joint_evs_wvs_path: jointPath
        ? jointPath.replace(ROOT + "/", "")
        : null,
      france_questions_merged: franceMerged,
      retrieved_note:
        "Wave 7 percentages from the official Results By Country PDF (weighted by w_weight). France never fielded WVS Wave 7 — its figures are merged from the Joint EVS/WVS 2017–2022 Results by Country PDF, matched by shared short title, fieldwork year 2018. Wave 5 France is superseded and not used.",
    },
    themes: [...THEME_DEFS.map(({ id, label }) => ({ id, label })), THEME_FALLBACK],
    societies,
    questions: questions.map((q) => ({
      id: q.id,
      title: q.title,
      prompt: q.prompt,
      theme: q.theme,
      answers: q.answers,
      values: q.values,
    })),
  };

  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(payload));
  const sizeMb = (Buffer.byteLength(JSON.stringify(payload)) / 1024 / 1024).toFixed(2);
  console.log(`Wrote ${OUT_JSON} (${sizeMb} MiB, ${questions.length} questions)`);

  const themeIds = payload.themes.map((t) => t.id);
  writeFileSync(
    OUT_META,
    `/* Auto-generated by scripts/build-wvs-results.mjs — do not edit. */
export const WVS_RESULTS_SOURCE = ${JSON.stringify(payload.source, null, 2)} as const;

export const WVS_THEME_ORDER = ${JSON.stringify(themeIds, null, 2)} as const;

export type WvsThemeId = (typeof WVS_THEME_ORDER)[number];
`,
  );
  console.log(`Wrote ${OUT_META}`);
}

main();
