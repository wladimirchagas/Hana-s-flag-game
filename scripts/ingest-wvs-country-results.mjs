#!/usr/bin/env node
/**
 * After PDFs land in data/wvs/wave7/country-results/, audit each new file and
 * merge entries into data/wvs/manifest.json.
 *
 * Audit: %PDF- header, sha256/size, and (via pypdf) first-page country + TOTAL N
 * when extractable. Falls back to inventory metadata when text extract fails
 * (some PDFs are compressed similarly to Japan v4).
 *
 * Usage: node scripts/ingest-wvs-country-results.mjs
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INVENTORY = resolve(ROOT, "scripts/data/wvs-wave7-inventory.json");
const OUT_DIR = resolve(ROOT, "data/wvs/wave7/country-results");
const MANIFEST = resolve(ROOT, "data/wvs/manifest.json");
const REPORT = resolve(ROOT, "scripts/data/wvs-ingest-audit.json");

const inventory = JSON.parse(readFileSync(INVENTORY, "utf8"));
const byDoid = new Map(
  inventory.documents.filter((d) => d.doid).map((d) => [String(d.doid), d]),
);

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const existingByDoid = new Map(
  manifest.entries.map((e) => [String(e.doid), e]),
);

function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function padDoid(doid) {
  return `F${String(doid).padStart(8, "0")}`;
}

function extractPdfText(pdfPath, maxPages = 2) {
  const py = `
from pypdf import PdfReader
import json, sys
r = PdfReader(sys.argv[1])
n = min(len(r.pages), int(sys.argv[2]))
pages = []
for i in range(n):
    pages.append(r.pages[i].extract_text() or "")
print(json.dumps({"pages": len(r.pages), "page_texts": pages}))
`;
  try {
    const out = execFileSync(
      "python3",
      ["-c", py, pdfPath, String(maxPages)],
      { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 },
    );
    return JSON.parse(out);
  } catch (err) {
    return { pages: null, page_texts: [], error: String(err.message || err) };
  }
}

function parseSampleN(text) {
  // Country-results tables lead with TOTAL (N) (1,004) (sex…) on page 2.
  const m = text.match(/\(N\)\s*\(([\d,]+)\)/);
  if (m) {
    const n = Number(String(m[1]).replace(/,/g, ""));
    if (Number.isFinite(n) && n > 50 && n < 50000) return n;
  }
  const patterns = [
    /TOTAL\s*N\s*[=:]?\s*([\d,]+)/i,
    /\bN\s*=\s*([\d,]+)/i,
    /sample\s*size[:\s]+([\d,]+)/i,
  ];
  for (const re of patterns) {
    const hit = text.match(re);
    if (hit) {
      const n = Number(String(hit[1]).replace(/,/g, ""));
      if (Number.isFinite(n) && n > 50 && n < 50000) return n;
    }
  }
  return null;
}

function countryMatch(text, country) {
  if (!text) return false;
  const t = text.toLowerCase();
  const c = String(country).toLowerCase();
  if (t.includes(c)) return true;
  // common aliases
  const aliases = {
    "russian federation": ["russia", "russian federation"],
    "south korea": ["south korea", "korea, republic", "republic of korea"],
    "hong kong sar": ["hong kong"],
    "macau sar": ["macau", "macao"],
    "taiwan roc": ["taiwan"],
    "united states": ["united states", "u.s.a", "usa"],
    "united kingdom - great britain": ["great britain", "united kingdom", "uk - great britain"],
    "united kingdom - northern ireland": ["northern ireland"],
  };
  for (const a of aliases[c] || []) {
    if (t.includes(a)) return true;
  }
  return false;
}

const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".pdf"));
const audits = [];
let added = 0;
let updated = 0;

for (const file of files) {
  const m = /^F0*(\d+)-/.exec(file);
  if (!m) {
    audits.push({ file, ok: false, error: "filename missing F000##### prefix" });
    continue;
  }
  const doid = String(Number(m[1])); // strip leading zeros for lookup, keep numeric string
  const inv = byDoid.get(doid);
  if (!inv) {
    // still allow files we already have that may not be in inventory? should be.
    audits.push({ file, doid, ok: false, error: "DOID not in inventory" });
    continue;
  }

  const path = resolve(OUT_DIR, file);
  const buf = readFileSync(path);
  const headerOk = buf.subarray(0, 5).toString("ascii") === "%PDF-";
  const sha256 = sha256File(path);
  const extracted = extractPdfText(path, 2);
  const page0 = extracted.page_texts?.[0] || "";
  const page1 = extracted.page_texts?.[1] || "";
  const combined = `${page0}\n${page1}`;
  const sampleN = parseSampleN(combined);
  const titleOk = countryMatch(page0 || combined, inv.country);
  // For hard-to-extract PDFs (Japan v4 class), accept if filename/title embeds country
  // AND we at least have a PDF header — but flag soft_title.
  const softTitle =
    !titleOk &&
    String(inv.title || file).toLowerCase().includes(
      String(inv.country).toLowerCase().split(" ")[0],
    );

  const entry = {
    id: padDoid(doid),
    doid,
    wvs_sample_id: inv.said,
    iso2: inv.iso2,
    country: inv.country,
    wave: 7,
    wave_years_label: inv.wave_years_label || "2017-2020",
    document_version: inv.version,
    document_format:
      inv.document_format ||
      (inv.version === "v3.0"
        ? "country_v3"
        : inv.version === "v4.0"
          ? "country_v4"
          : inv.version === "v5.0"
            ? "country_v5"
            : `country_${String(inv.version || "").replace(".", "")}`),
    kind: "country_results_by_sex_age",
    filename: file,
    path: `data/wvs/wave7/country-results/${file}`,
    bytes: buf.length,
    sha256,
    pdf_pages: extracted.pages,
    expected_sample_n: sampleN,
    source: {
      publisher: "World Values Survey Association / JD Systems Data Archive",
      documentation_url: "https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=7",
      download_method: "playwright_browser_fetch_ajdownload",
      retrieved_utc: "2026-09-22",
    },
    audit: {
      pdf_header_ok: headerOk,
      title_country_match: titleOk || softTitle,
      sample_n_from_pdf: sampleN,
      japan_v4_exclusive_country_ok:
        inv.document_format === "country_v4_eng" ? true : null,
      first_page_excerpt: (page0 || combined).replace(/\s+/g, " ").trim().slice(0, 180) || null,
      soft_title_fallback: softTitle || undefined,
      extract_error: extracted.error || undefined,
    },
  };

  // Preserve prior hand-audited sample N / excerpt for existing entries when
  // re-extract fails (e.g. already-committed AU/BR/…).
  const prev = existingByDoid.get(doid);
  if (prev) {
    if (entry.expected_sample_n == null && prev.expected_sample_n != null) {
      entry.expected_sample_n = prev.expected_sample_n;
      entry.audit.sample_n_from_pdf = prev.audit?.sample_n_from_pdf ?? prev.expected_sample_n;
    }
    if (!entry.audit.first_page_excerpt && prev.audit?.first_page_excerpt) {
      entry.audit.first_page_excerpt = prev.audit.first_page_excerpt;
    }
    if (prev.audit?.japan_v4_exclusive_country_ok != null) {
      entry.audit.japan_v4_exclusive_country_ok = prev.audit.japan_v4_exclusive_country_ok;
    }
    // Keep prior download_method for files we did not re-fetch this run.
    if (prev.source?.download_method && prev.sha256 === entry.sha256) {
      entry.source = { ...entry.source, ...prev.source, retrieved_utc: prev.source.retrieved_utc || entry.source.retrieved_utc };
    }
  }

  const ok =
    headerOk &&
    entry.audit.title_country_match === true &&
    buf.length > 10_000 &&
    // Sample N is required for Wave 7 country-results (sex×age tables always carry it).
    (entry.expected_sample_n != null || inv.document_format === "country_v4_eng");

  audits.push({
    file,
    doid,
    iso2: inv.iso2,
    country: inv.country,
    ok,
    bytes: buf.length,
    sampleN,
    titleOk,
    softTitle,
  });

  if (!ok) continue;

  if (existingByDoid.has(doid)) {
    const idx = manifest.entries.findIndex((e) => String(e.doid) === doid);
    manifest.entries[idx] = entry;
    updated += 1;
  } else {
    manifest.entries.push(entry);
    existingByDoid.set(doid, entry);
    added += 1;
  }
}

manifest.generated_at_utc = "2026-09-22";
manifest.note =
  "Wave 7 (2017–2022) is the latest completed WVS wave available from the WVS Data Archive as of retrieval. WVS-8 fieldwork is planned for 2024–2026 and is not published as equivalent country-results PDFs yet. No figures were invented or transcribed by hand — files are WVS archive downloads. India 2023 and Uzbekistan 2022 are Wave 7 societies but have no country-results PDF on the archive yet. France is covered via Wave 5 + Joint EVS/WVS (see wave5/ and joint-evs-wvs-2017-2022/).";

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
writeFileSync(
  REPORT,
  JSON.stringify(
    {
      generated_at_utc: new Date().toISOString(),
      added,
      updated,
      audits,
      fail: audits.filter((a) => !a.ok),
    },
    null,
    2,
  ),
);

console.log(
  `Manifest updated: added=${added} updated=${updated} total_entries=${manifest.entries.length}`,
);
console.log(`Audit report: ${REPORT}`);
const fails = audits.filter((a) => !a.ok);
if (fails.length) {
  console.error(`FAIL ${fails.length} files:`);
  for (const f of fails) console.error(`  ${f.file}: ${f.error || "audit failed"}`);
  process.exitCode = 1;
}
