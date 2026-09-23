#!/usr/bin/env node
/**
 * Extract the WVS Wave 6 → Wave 7 variable crosswalk from the official
 * Common EVS/WVS Dictionary (Integrated Values Surveys 1981-2022), so the
 * Learn-mode build can pair a Wave 6 table with the Wave 7 question it
 * continues without guessing from question wording.
 *
 * Source: data/wvs/ivs/F00011424-Common_EVS_WVS_Dictionary_IVS.xlsx
 *   (WVS Data Archive DOID 11424, https://www.worldvaluessurvey.org/WVSEVStrend.jsp)
 * Output: scripts/data/wvs-wave6-wave7-crosswalk.json
 *
 * Only rows where the dictionary names BOTH a Wave 6 variable (V…) and a
 * Wave 7 variable (Q…) are kept; nothing is inferred. Needs python3 +
 * openpyxl (`python3 -m pip install openpyxl`).
 *
 * Usage: node scripts/build-wvs-wave-crosswalk.mjs
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const XLSX = "data/wvs/ivs/F00011424-Common_EVS_WVS_Dictionary_IVS.xlsx";
const OUT = resolve(ROOT, "scripts/data/wvs-wave6-wave7-crosswalk.json");

const py = `
import json, re, sys, openpyxl
ws = openpyxl.load_workbook(sys.argv[1], read_only=True)["IVS_EVS_and_WVS_Variables"]
header = None
rows = []
for row in ws.iter_rows(values_only=True):
    if header is None:
        header = [str(c or "").strip() for c in row]
        continue
    rows.append(row)
col = {h.split("\\n")[0].strip(): i for i, h in enumerate(header)}
iv, lab = col["Common Dictionary: Variable name"], col["Common Dictionary: Variable label"]
w6, w7 = col["WVS 6: Variable name"], col["WVS 7: Variable name"]
out = []
for r in rows:
    a, b = r[w6], r[w7]
    if not (isinstance(a, str) and isinstance(b, str)):
        continue
    a, b = a.strip(), b.strip()
    if re.fullmatch(r"V\\d+[A-Z_]*", a) and re.fullmatch(r"Q\\d+[A-Z_]*", b):
        out.append({"ivs": str(r[iv]).strip(), "label": str(r[lab]).strip(), "w6": a, "w7": b})
print(json.dumps(out))
`;

const pairs = JSON.parse(
  execFileSync("python3", ["-c", py, resolve(ROOT, XLSX)], { encoding: "utf8" }),
);
const w6Seen = new Set();
const w7Seen = new Set();
for (const p of pairs) {
  if (w6Seen.has(p.w6) || w7Seen.has(p.w7)) {
    throw new Error(`crosswalk is not one-to-one at ${p.w6} → ${p.w7}`);
  }
  w6Seen.add(p.w6);
  w7Seen.add(p.w7);
}

writeFileSync(
  OUT,
  `${JSON.stringify(
    {
      source: {
        path: XLSX,
        sha256: createHash("sha256").update(readFileSync(resolve(ROOT, XLSX))).digest("hex"),
        doid: "11424",
        documentation_url: "https://www.worldvaluessurvey.org/WVSEVStrend.jsp",
        note: "Common EVS/WVS Dictionary (IVS 1981-2022), sheet IVS_EVS_and_WVS_Variables: columns 'WVS 6: Variable name' and 'WVS 7: Variable name'.",
      },
      pairs,
    },
    null,
    1,
  )}\n`,
);
console.log(`Wrote ${OUT} (${pairs.length} Wave 6 → Wave 7 pairs)`);
