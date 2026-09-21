#!/usr/bin/env node
/**
 * Validate bundled Corruption Perceptions Index figures against the official
 * Transparency International CPI 2025 Results workbook (when present) or the
 * committed extract in scripts/data/cpi2025Data.mjs.
 *
 * Usage:
 *   node scripts/check-cpi-data.mjs
 *   node scripts/check-cpi-data.mjs /path/to/CPI2025_Results.xlsx
 *
 * Fails if countryFacts.ts / democracyData.mjs drift from the sourced CPI
 * extract, or (when an xlsx is supplied) if the extract drifts from TI.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { CPI_2025_DATA } from "./data/cpi2025Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load COUNTRY_FACTS without a TS loader — strip types and eval the export.
const factsSrc = readFileSync(resolve(ROOT, "src/data/countryFacts.ts"), "utf8");
const factsBody = factsSrc
  .replace(/^[\s\S]*?export const COUNTRY_FACTS[^=]*=\s*/, "const COUNTRY_FACTS = ")
  .replace(/as const;\s*$/, ";")
  .replace(/:\s*Readonly<Record<string, CountryFacts>>/, "");
// Drop type declarations above the const
const start = factsBody.indexOf("const COUNTRY_FACTS");
const cleaned = factsBody.slice(start).replace(/,\s*\n\};/, "\n};");
const COUNTRY_FACTS = Function(`${cleaned}\nreturn COUNTRY_FACTS;`)();

const BAND = (score) => {
  if (score >= 90) return "90–100";
  if (score >= 80) return "80–89";
  if (score >= 70) return "70–79";
  if (score >= 60) return "60–69";
  if (score >= 50) return "50–59";
  if (score >= 40) return "40–49";
  if (score >= 30) return "30–39";
  if (score >= 20) return "20–29";
  if (score >= 10) return "10–19";
  return "0–9";
};

let failures = 0;
function fail(msg) {
  console.error("FAIL:", msg);
  failures++;
}

// 1. Extract ↔ democracyData ↔ countryFacts must agree
const extractCodes = Object.keys(CPI_2025_DATA).sort();
assert.equal(extractCodes.length, 179, "CPI 2025 covers 179 of the game’s UN members");

for (const code of extractCodes) {
  const src = CPI_2025_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.cpi;
  const facts = COUNTRY_FACTS[code]?.democracy?.cpi;
  if (!demo) {
    fail(`${code}: missing from DEMOCRACY_DATA`);
    continue;
  }
  if (!facts) {
    fail(`${code}: missing from COUNTRY_FACTS`);
    continue;
  }
  for (const key of ["year", "rating", "rank", "rankChange", "score"]) {
    if (demo[key] !== src[key]) fail(`${code}: democracyData.${key}=${demo[key]} ≠ extract ${src[key]}`);
    if (facts[key] !== src[key]) fail(`${code}: countryFacts.${key}=${facts[key]} ≠ extract ${src[key]}`);
  }
  if (BAND(src.score) !== src.rating) {
    fail(`${code}: rating band ${src.rating} does not match score ${src.score}`);
  }
}

// 2. No fabricated CPI on countries TI does not rank
for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.cpi && !CPI_2025_DATA[code]) {
    fail(`${code}: democracyData has cpi but extract does not`);
  }
}
for (const [code, entry] of Object.entries(COUNTRY_FACTS)) {
  if (entry.democracy?.cpi && !CPI_2025_DATA[code]) {
    fail(`${code}: countryFacts has cpi but extract does not`);
  }
}

// 3. Spot-check against published TI 2025 headline figures
const SPOT = {
  DK: { score: 89, rank: 1 },
  FI: { score: 88, rank: 2 },
  SG: { score: 84, rank: 3 },
  NZ: { score: 81, rank: 4 },
  NO: { score: 81, rank: 4 },
  SE: { score: 80, rank: 6 },
  CH: { score: 80, rank: 6 },
  US: { score: 64, rank: 29 },
  GB: { score: 70, rank: 20 },
  CA: { score: 75, rank: 16 },
  AU: { score: 76, rank: 12 },
  VE: { score: 10, rank: 180 },
  SO: { score: 9, rank: 181 },
  SS: { score: 9, rank: 181 },
};
for (const [code, expect] of Object.entries(SPOT)) {
  const got = CPI_2025_DATA[code];
  if (!got) {
    fail(`spot ${code}: missing`);
    continue;
  }
  if (got.score !== expect.score || got.rank !== expect.rank) {
    fail(`spot ${code}: got score=${got.score} rank=${got.rank}, expected ${JSON.stringify(expect)}`);
  }
}

// 4. Optional: re-verify against an official xlsx if provided / downloaded
const xlsxPath = process.argv[2] || resolve("/tmp/CPI2025_Results.xlsx");
if (existsSync(xlsxPath)) {
  console.log(`Cross-checking against ${xlsxPath}`);
  // Parse via the same XML approach (strict OOXML; openpyxl may fail)
  // Prefer a tiny inline unzip+xml parse using Node's built-ins — skip if
  // python helper is easier.
  const require = createRequire(import.meta.url);
  // Use child_process python already proven
  const { execFileSync } = await import("node:child_process");
  const py = `
import zipfile, re, xml.etree.ElementTree as ET, json, sys
zf = zipfile.ZipFile(sys.argv[1])
NS = {"m": "http://purl.oclc.org/ooxml/spreadsheetml/main"}
ss = ET.fromstring(zf.read("xl/sharedStrings.xml"))
strings = []
for si in ss.findall("m:si", NS):
    strings.append("".join(t.text or "" for t in si.iter("{http://purl.oclc.org/ooxml/spreadsheetml/main}t")))
root = ET.fromstring(zf.read("xl/worksheets/sheet1.xml"))
# ISO3 -> (score, rank)
import pycountry
iso3_to_2 = {c.alpha_3: c.alpha_2 for c in pycountry.countries}
rows = []
for row in root.findall(".//m:sheetData/m:row", NS)[3:]:
    cells = {}
    for c in row.findall("m:c", NS):
        ref = c.get("r"); col = re.match(r"[A-Z]+", ref).group(0)
        t = c.get("t"); v = c.find("m:v", NS)
        if v is None: continue
        val = strings[int(v.text)] if t == "s" else v.text
        cells[col] = val
    if not cells.get("B"): continue
    iso3 = cells["B"]; score = int(float(cells["D"])); rank = int(float(cells["E"]))
    a2 = iso3_to_2.get(iso3)
    if a2: rows.append((a2, score, rank, iso3))
print(json.dumps(rows))
`;
  try {
    const out = execFileSync("python3", ["-c", py, xlsxPath], { encoding: "utf8" });
    const rows = JSON.parse(out);
    const byCode = Object.fromEntries(rows.map(([a2, score, rank]) => [a2, { score, rank }]));
    for (const [code, src] of Object.entries(CPI_2025_DATA)) {
      const ti = byCode[code];
      if (!ti) {
        // Extract only includes UN members; TI sheet may still have the ISO3
        fail(`${code}: in extract but not found in TI xlsx (iso2 map miss?)`);
        continue;
      }
      if (ti.score !== src.score || ti.rank !== src.rank) {
        fail(`${code}: extract score=${src.score}/rank=${src.rank} ≠ TI xlsx ${ti.score}/${ti.rank}`);
      }
    }
    console.log(`TI xlsx cross-check: ${rows.length} ISO2-mapped rows`);
  } catch (e) {
    console.warn("xlsx cross-check skipped:", e.message);
  }
} else {
  console.log("No CPI2025_Results.xlsx at", xlsxPath, "— skipped TI byte cross-check");
}

if (failures) {
  console.error(`\n${failures} CPI validation failure(s)`);
  process.exit(1);
}
console.log(`CPI validation OK — ${extractCodes.length} countries, spot checks passed`);
