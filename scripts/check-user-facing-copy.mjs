#!/usr/bin/env node
/**
 * Build gate: user-facing gap copy must never leak research diagnostics.
 *
 * Scans Learn-mode data under src/data/ for fields listed in
 * USER_FACING_GAP_FIELDS (noImageReason, noFlagReason, …) and fails if any
 * contain Wikidata Q-ids / P-codes, raw URLs, or agent/pipeline jargon.
 *
 * This is the mechanical half of the "no technical leakage in Learn UI" hard
 * rule — it covers every category that ships a gap reason today and any future
 * file that adds the same field names.
 *
 * Run: node scripts/check-user-facing-copy.mjs
 * Also: npm run flags:check / the flag-integrity CI workflow.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  USER_FACING_GAP_FIELDS,
  findUserFacingLeaks,
} from "./lib/userFacingCopy.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_DIR = resolve(ROOT, "src", "data");

/** Recursively list .ts files under src/data. */
function listDataFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) out.push(...listDataFiles(abs));
    else if (name.endsWith(".ts")) out.push(abs);
  }
  return out;
}

/**
 * Extract `"field": "…"` / `field: "…"` string values for the gap fields.
 * Handles common JSON-in-TS and simple escaped quotes; does not need a full
 * TS parser because reasons are plain double-quoted strings in this repo.
 *
 * @param {string} src
 * @returns {{ field: string, value: string, index: number }[]}
 */
function extractGapStrings(src) {
  const fieldAlt = [...USER_FACING_GAP_FIELDS].map(reEscape).join("|");
  const re = new RegExp(
    `(?:"(${fieldAlt})"|(${fieldAlt}))\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`,
    "g",
  );
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const field = m[1] || m[2];
    const raw = m[3];
    const value = raw.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
    out.push({ field, value, index: m.index });
  }
  return out;
}

function reEscape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lineOf(src, index) {
  return src.slice(0, index).split("\n").length;
}

const failures = [];
let scanned = 0;

for (const file of listDataFiles(DATA_DIR)) {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  for (const { field, value, index } of extractGapStrings(src)) {
    scanned++;
    const leaks = findUserFacingLeaks(value);
    if (leaks.length === 0) continue;
    const preview = value.length > 120 ? `${value.slice(0, 117)}…` : value;
    for (const leak of leaks) {
      failures.push(
        `${rel}:${lineOf(src, index)} ${field} — ${leak.label} (matched ${JSON.stringify(leak.match)}): ${JSON.stringify(preview)}`,
      );
    }
  }
}

// Structural guard: details components that show noImageReason must keep the
 // "No … shown." framing — if they stop referencing noImageReason, gaps vanish
 // silently (sibling of the national-flags UI guard).
const UI_MUST_REFERENCE = [
  "src/components/CentralBankDetails.tsx",
  "src/components/PoliticalPartyDetails.tsx",
  "src/components/NationalFlagDetails.tsx",
  "src/components/TourismLogoDetails.tsx",
  "src/components/NewspaperDetails.tsx",
  "src/components/NewsAgencyDetails.tsx",
];
for (const rel of UI_MUST_REFERENCE) {
  const abs = resolve(ROOT, rel);
  try {
    const body = readFileSync(abs, "utf8");
    if (!body.includes("noImageReason")) {
      failures.push(
        `${rel} no longer references noImageReason — a missing-image gap would vanish from the panel`,
      );
    }
  } catch {
    // Optional components (renamed) — skip if absent.
  }
}

// Hardcoded fallbacks in details components must also stay clean.
const UI_FALLBACK_FILES = [
  "src/components/NewspaperDetails.tsx",
  "src/components/NewsAgencyDetails.tsx",
  "src/components/CentralBankDetails.tsx",
  "src/components/PoliticalPartyDetails.tsx",
  "src/components/TourismLogoDetails.tsx",
  "src/components/NationalFlagDetails.tsx",
];
for (const rel of UI_FALLBACK_FILES) {
  const abs = resolve(ROOT, rel);
  try {
    const body = readFileSync(abs, "utf8");
    for (const m of body.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g)) {
      const lit = (m[1] ?? m[2] ?? "").replace(/\\"/g, '"');
      if (!/(no (?:logo|image|masthead|flag)|not (?:shown|available)|missing)/i.test(lit)) continue;
      if (lit.length < 40) continue;
      const leaks = findUserFacingLeaks(lit);
      for (const leak of leaks) {
        failures.push(
          `${rel} fallback string leaks ${leak.label} (matched ${JSON.stringify(leak.match)}): ${JSON.stringify(lit.slice(0, 120))}`,
        );
      }
    }
  } catch {
    // optional
  }
}

if (failures.length > 0) {
  console.error(`✗ user-facing copy check FAILED (${failures.length} leak(s) across ${scanned} gap string(s))\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error(
    `\nnoImageReason (and siblings) are READ by learners. Put Wikidata Q/P codes, raw URLs, and ` +
      `pipeline jargon in sources[] / licenceNote / a non-rendered research note — never in the gap copy. ` +
      `Rewrite the reason in plain language (name Wikidata / Commons / the official site without codes).`,
  );
  process.exit(1);
}

console.log(
  `User-facing copy check OK — scanned ${scanned} gap string(s) under src/data/; no technical leakage.`,
);
