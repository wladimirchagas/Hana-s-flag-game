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

function stripFooter(text) {
  return text
    .replace(
      /World Values Survey Wave 7[\s\S]*?Page \d+ of \d+\s*$/g,
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
    // Drop trailing "Base mean" / Mean pair: "(978) 5.80" or bare mean.
    pctRest = pctRest.replace(/\s*\([\d,]+\)\s+[\d.]+$/, "").trim();
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
  "Disagree strongly",
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

function extractAnswerLabels(block, colCount, shortTitle) {
  // Heuristic: text between short title and first country row, joined and
  // split into colCount labels when possible; otherwise generate Answer 1..N.
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  const totalIdx = lines.findIndex((l) => l === "TOTAL");
  if (totalIdx < 0) {
    return Array.from({ length: colCount }, (_, i) => `Answer ${i + 1}`);
  }

  const firstCountry = lines.findIndex(
    (l, i) => i > totalIdx && isCountryRow(l),
  );
  if (firstCountry < 0) {
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
        rest = rest.slice(next).trim();
        continue;
      }
      break;
    }
    if (labels.length >= colCount) return labels.slice(0, colCount);
    if (labels.length >= Math.max(2, colCount - 2)) {
      while (labels.length < colCount) {
        labels.push(`Answer ${labels.length + 1}`);
      }
      return labels;
    }
  }

  return Array.from({ length: colCount }, (_, i) => `Answer ${i + 1}`);
}

function parseQuestionBlock(id, prompt, block) {
  const clean = stripFooter(block);
  const shortTitle = extractShortTitle(clean) || id;
  const rows = [];
  for (const line of clean.split("\n")) {
    const t = line.trim();
    if (!isCountryRow(t)) continue;
    const row = parseCountryDataRow(t);
    if (row) rows.push(row);
  }
  if (!rows.length) return null;

  // Column count = mode of pct lengths (ignore truncated rows).
  const counts = new Map();
  for (const r of rows) {
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

  const answers = extractAnswerLabels(clean, colCount, shortTitle);
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

  const questions = [];
  for (let s = 0; s < starts.length; s++) {
    const cur = starts[s];
    const endPage =
      s + 1 < starts.length ? starts[s + 1].page : Math.min(cur.page + 3, pages.length);
    const block = pages.slice(cur.page, endPage).join("\n");
    const q = parseQuestionBlock(cur.id, cur.prompt, block);
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
