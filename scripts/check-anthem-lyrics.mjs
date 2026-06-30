// Audits the bundled anthem lyrics in src/data/nationalAnthems.ts for the
// per-line-alignment / consistency defects found in the Brazilian anthem
// (2026-06): two consecutive lines had their English translations swapped, so
// each Portuguese line sat above a translation that belonged to its neighbour;
// and a whole refrain stanza (sung twice in the real anthem) was carried only
// once.
//
// IMPORTANT — what this can and cannot do. Neither of those defects is fully
// machine-detectable: confirming a translation really means its own line, and
// that every officially-sung stanza is present, requires the authoritative
// lyrics and a human. (The Brazil swap kept the proper noun "Brasil"/"Brazil"
// on the same line, so no language-agnostic check flags it.) This script
// therefore enforces only the *consistency invariants* a correct lyric set must
// satisfy — which catch the copy/paste fingerprints of these bugs — and is a
// SAFETY NET, not a substitute for the source check mandated by the
// "Anthem lyrics must be complete and per-line aligned" hard rule in CLAUDE.md.
//
// Checks (each FAILS the build):
//   A. Empty/whitespace `text` on a line.
//   C. Refrain-translation mismatch: the same `text` appears more than once but
//      with translations that differ by more than capitalisation/punctuation —
//      a repeated line must mean the same thing every time it appears.
//   D. Cross-wired translation: one `textEn` is attached to two *substantially
//      different* original lines (token overlap < 0.34) — the fingerprint of a
//      translation copied/swapped onto the wrong line. Near-identical repeats
//      (e.g. a refrain with a one-word variation) are intentionally exempt.
//   E. Untranslated line: on a non-English anthem a `textEn` is byte-identical
//      to its `text` (a translation that was never filled in).
//
// Run: node scripts/check-anthem-lyrics.mjs   (also `npm run anthems:check-lyrics`)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "nationalAnthems.ts");

// ── Load NATIONAL_ANTHEMS without invoking tsc ──────────────────────────────
// The object literal after `= ` is pure data (strings/numbers/arrays/objects/
// comments) — no TS-specific syntax inside — so brace-matching the literal and
// evaluating it yields the real runtime value.
function loadAnthems() {
  const src = readFileSync(DATA_PATH, "utf8");
  const eq = src.indexOf("= {", src.indexOf("export const NATIONAL_ANTHEMS"));
  if (eq < 0) throw new Error("Could not locate NATIONAL_ANTHEMS literal");
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(open, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const normalize = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
const tokens = (s) => new Set(normalize(s).split(" ").filter(Boolean));
function jaccard(a, b) {
  const A = tokens(a), B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

// Anthems whose `textEn` is the official *singable* English version (mapped by
// verse position, not a literal line translation) rather than a per-line gloss.
// For these, check D's "one translation on two unlike lines" signal is expected
// and not a defect. Keep this list tiny and documented — it is NOT a place to
// silence a genuine misalignment.
//   TV: the Tuvaluan anthem's English is the singable lyric; the motto
//       "Tuvalu for the Almighty" appears both as line 0's literal sense and as
//       the quoted refrain at line 10.
const SINGABLE_TRANSLATION_EXEMPT = new Set(["TV"]);

const anthems = loadAnthems();
const problems = [];
const record = (code, check, detail) => problems.push({ code, check, detail });

for (const [code, a] of Object.entries(anthems)) {
  const lines = a.lines;
  if (!Array.isArray(lines) || lines.length === 0) continue;
  const isEnglish = (a.language || "").toLowerCase().split(/[-_]/)[0] === "en";

  // A. empty text
  lines.forEach((l, i) => {
    if (typeof l.text !== "string" || l.text.trim() === "") {
      record(code, "A:empty-text", `line ${i} has empty text`);
    }
  });

  // C. inconsistent translation for a repeated original line (ignoring case/punct)
  const byText = new Map();
  lines.forEach((l, i) => {
    if (!l.textEn) return;
    if (!byText.has(l.text)) byText.set(l.text, []);
    byText.get(l.text).push({ i, en: l.textEn });
  });
  for (const [text, occ] of byText) {
    if (occ.length < 2) continue;
    const distinct = new Set(occ.map((o) => normalize(o.en)));
    if (distinct.size > 1) {
      record(code, "C:refrain-translation-mismatch",
        `repeated line ${JSON.stringify(text.slice(0, 40))} has ${distinct.size} materially different translations (lines ${occ.map((o) => o.i).join(", ")})`);
    }
  }

  // D. one translation cross-wired onto substantially different originals
  if (!SINGABLE_TRANSLATION_EXEMPT.has(code)) {
  const byEn = new Map();
  lines.forEach((l, i) => {
    if (!l.textEn || !l.textEn.trim()) return;
    const key = normalize(l.textEn);
    if (!byEn.has(key)) byEn.set(key, []);
    byEn.get(key).push({ i, text: l.text });
  });
  for (const occ of byEn.values()) {
    const distinctText = [...new Map(occ.map((o) => [o.text, o])).values()];
    if (distinctText.length < 2) continue;
    // Flag only if SOME pair of originals is substantially different.
    let suspicious = false;
    for (let x = 0; x < distinctText.length; x++)
      for (let y = x + 1; y < distinctText.length; y++)
        if (jaccard(distinctText[x].text, distinctText[y].text) < 0.34) suspicious = true;
    if (suspicious) {
      record(code, "D:cross-wired-translation",
        `one translation ${JSON.stringify(occ[0] && lines[occ[0].i].textEn.slice(0, 40))} is shared by unrelated lines ${distinctText.map((o) => o.i).join(", ")}`);
    }
  }
  }

  // E. untranslated (textEn === text) on a non-English anthem
  if (!isEnglish) {
    lines.forEach((l, i) => {
      if (l.textEn && l.textEn.trim() && l.textEn.trim() === l.text.trim()) {
        record(code, "E:untranslated", `line ${i} textEn is identical to the original text`);
      }
    });
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (problems.length === 0) {
  console.log(`✓ anthem lyrics: ${Object.keys(anthems).length} anthems passed all structural checks`);
  process.exit(0);
}
const byCheck = new Map();
for (const p of problems) {
  if (!byCheck.has(p.check)) byCheck.set(p.check, []);
  byCheck.get(p.check).push(p);
}
console.error(`✗ anthem lyrics: ${problems.length} issue(s) across ${new Set(problems.map((p) => p.code)).size} anthem(s)\n`);
for (const [check, items] of [...byCheck].sort()) {
  console.error(`── ${check} (${items.length}) ──`);
  for (const it of items) console.error(`   ${it.code}: ${it.detail}`);
  console.error("");
}
process.exit(1);
