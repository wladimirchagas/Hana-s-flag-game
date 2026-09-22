#!/usr/bin/env node
/**
 * Verify committed World Values Survey Wave 7 source PDFs against
 * data/wvs/manifest.json — existence, size, sha256, PDF header, and that
 * the ingest-time audit record still matches the expected sample N.
 *
 * Content identity (country title / N) was audited with a PDF text extractor
 * when the files were ingested; those results are frozen under entry.audit.
 * Re-running a full text extract is optional and not required in CI.
 *
 * Usage: node scripts/check-wvs-sources.mjs
 */
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = resolve(ROOT, "data/wvs/manifest.json");

function sha256File(path) {
  const h = createHash("sha256");
  h.update(readFileSync(path));
  return h.digest("hex");
}

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

if (!existsSync(MANIFEST_PATH)) {
  fail(`missing manifest ${MANIFEST_PATH}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
if (!Array.isArray(manifest.entries) || manifest.entries.length === 0) {
  fail("manifest.entries is empty");
  process.exit(1);
}

const requiredCountryIsos = new Set(["JP", "NZ", "SG", "AU", "BR", "ID", "MY", "FR"]);
const seenIsos = new Set();

for (const entry of manifest.entries) {
  const path = resolve(ROOT, entry.path);
  const label = `${entry.id} (${entry.country} ${entry.document_version})`;

  if (!existsSync(path)) {
    fail(`${label}: missing file ${entry.path}`);
    continue;
  }

  const buf = readFileSync(path);
  if (buf.length !== entry.bytes) {
    fail(`${label}: size ${buf.length} != manifest ${entry.bytes}`);
  }

  const isPdf = entry.filename.toLowerCase().endsWith(".pdf");
  const isXlsx = entry.filename.toLowerCase().endsWith(".xlsx");
  if (isPdf) {
    if (buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
      fail(`${label}: not a PDF (bad header)`);
    } else {
      ok(`${label}: PDF header`);
    }
  } else if (isXlsx) {
    // .xlsx is a zip archive; a genuine one starts with the local file header signature "PK\x03\x04".
    if (buf.subarray(0, 4).toString("hex") !== "504b0304") {
      fail(`${label}: not a valid xlsx (bad zip header)`);
    } else {
      ok(`${label}: xlsx (zip) header`);
    }
  } else {
    fail(`${label}: unrecognised file extension for ${entry.filename}`);
  }

  const hash = sha256File(path);
  if (hash !== entry.sha256) {
    fail(`${label}: sha256 drift\n  got  ${hash}\n  want ${entry.sha256}`);
  } else {
    ok(`${label}: sha256`);
  }

  if (!entry.source?.documentation_url?.includes("worldvaluessurvey.org")) {
    fail(`${label}: source.documentation_url must point at worldvaluessurvey.org`);
  }

  if (!entry.audit) {
    fail(`${label}: missing ingest audit`);
  } else if (isPdf && entry.audit.pdf_header_ok !== true) {
    fail(`${label}: missing ingest audit.pdf_header_ok`);
  }
  if (entry.kind === "country_results_by_sex_age") {
    if (entry.audit.title_country_match !== true) {
      fail(`${label}: ingest audit title_country_match is not true`);
    }
    if (entry.expected_sample_n != null) {
      if (entry.audit.sample_n_from_pdf !== entry.expected_sample_n) {
        fail(
          `${label}: audit sample_n_from_pdf ${entry.audit.sample_n_from_pdf} != expected ${entry.expected_sample_n}`,
        );
      } else {
        ok(`${label}: audited sample N ${entry.expected_sample_n}`);
      }
    }
    if (entry.iso2) seenIsos.add(entry.iso2);
  }
  if (entry.kind === "participating_countries_list" && entry.iso2) {
    seenIsos.add(entry.iso2);
  }

  if (entry.document_format === "country_v4_eng" && entry.audit.japan_v4_exclusive_country_ok !== true) {
    fail(`${label}: Japan v4 exclusivity audit failed`);
  }
}

for (const iso of requiredCountryIsos) {
  if (!seenIsos.has(iso)) fail(`manifest missing country-results entry for ${iso}`);
}
for (const iso of ["JP", "NZ", "SG", "FR"]) {
  if (seenIsos.has(iso)) ok(`coverage includes newly fetched ${iso}`);
}

if (process.exitCode) {
  console.error("\nWVS source check failed.");
  process.exit(process.exitCode);
}
console.log(`\nAll ${manifest.entries.length} WVS source entries verified.`);
