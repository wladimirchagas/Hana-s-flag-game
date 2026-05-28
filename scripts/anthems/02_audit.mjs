#!/usr/bin/env node
// Phase 1, stage 02 — produce a gap report and per-country TODO markdown files.
//
// Reads:    data/anthems/catalog.json
// Writes:   data/anthems/gaps.json
//           data/anthems/TODO_<iso3>.md   (one per actionable gap)
//
// Gap categories (in priority order):
//   missing_entry           — no row in src/data/nationalAnthems.ts at all
//   instrumental_audio_only — wikiFile clearly an instrumental rendition; a
//                             vocal source must be substituted before karaoke
//                             will work
//   no_lyrics_documented    — anthem genuinely has no official lyrics (Spain,
//                             San Marino, etc.); kept as a documented exception
//   advisory_vocal_unknown  — wikiFile lacks vocal/instrumental keywords; not
//                             wrong, but worth manual verification (no TODO
//                             emitted to keep the queue actionable)
//
// Idempotent: stale TODO files for countries no longer in the gap list are
// removed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CATALOG_PATH = path.join(REPO_ROOT, "data", "anthems", "catalog.json");
const GAPS_PATH = path.join(REPO_ROOT, "data", "anthems", "gaps.json");
const TODO_DIR = path.join(REPO_ROOT, "data", "anthems");

function loadJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function classifyGap(entry) {
  // Returns null if not a gap, else { category, blocker, manual_only_reason }.
  const a = entry.status.audio;
  const l = entry.status.lyrics;

  if (a === "no_entry") {
    return { category: "missing_entry", blocker: true, manual_only_reason: false };
  }
  if (a === "instrumental_marked" || l === "no_lines") {
    // Spain & San Marino: documented no-lyrics exceptions, mirroring the
    // Vatican carve-out the user pre-approved in Phase 0.
    return { category: "no_lyrics_documented", blocker: false, manual_only_reason: true };
  }
  if (a === "instrumental_inferred") {
    return { category: "instrumental_audio_only", blocker: true, manual_only_reason: false };
  }
  return null;
}

function searchTermsLines(terms) {
  return terms.map(t => `- \`${t}\``).join("\n");
}

function renderTodoMarkdown(entry, gap) {
  const ex = entry.existing_anthem;
  const langs = entry.official_languages.join(", ");
  const search = searchTermsLines(entry.wikimedia_search_terms);

  const blocks = [];
  blocks.push(`# TODO: ${entry.name_en} (${entry.iso3} / ${entry.iso2})`);
  blocks.push("");
  blocks.push(`**Gap category:** \`${gap.category}\``);
  blocks.push(`**Official language(s):** ${langs}`);
  blocks.push(`**Wikipedia anthem slug (guess):** \`${entry.wikipedia_anthem_slug}\``);
  if (entry.note) blocks.push(`**Seed note:** ${entry.note}`);
  blocks.push("");

  if (gap.category === "missing_entry") {
    blocks.push("## Status");
    blocks.push(`No entry exists in \`src/data/nationalAnthems.ts\` for this country.`);
    blocks.push("Both lyrics *and* an audio source must be sourced before this");
    blocks.push("country can join the karaoke player.");
    blocks.push("");
    blocks.push("## What to do");
    blocks.push("1. Find the official native-language lyrics on Wikipedia (preferred)");
    blocks.push("   or the relevant government site. Capture an English translation");
    blocks.push("   with provenance (`official_translation` / `wikipedia_translation`).");
    blocks.push("2. Find a freely licensed vocal recording on Wikimedia Commons.");
    blocks.push("   Acceptable licences: Public Domain, CC0, CC-BY, CC-BY-SA.");
    blocks.push("3. Add a `wikiFile` + `lines[]` block to `src/data/nationalAnthems.ts`.");
    blocks.push("4. Re-run `npm run anthems:catalog` to confirm the gap closes.");
  } else if (gap.category === "instrumental_audio_only") {
    blocks.push("## Status");
    blocks.push(`Lyrics are present (${ex?.line_count ?? 0} lines), but the existing`);
    blocks.push(`\`wikiFile\` is an instrumental rendition:`);
    blocks.push("");
    blocks.push(`> \`${ex?.wiki_file}\``);
    blocks.push("");
    blocks.push("Karaoke needs a vocal recording so word timings can be aligned to");
    blocks.push("actual sung audio.");
    blocks.push("");
    blocks.push("## What to do");
    blocks.push("1. Search Wikimedia Commons for a vocal/choral/sung version of");
    blocks.push("   this anthem. Suggested search terms:");
    blocks.push("");
    blocks.push(search);
    blocks.push("");
    blocks.push("2. Verify vocal presence by ear *or* (when the Demucs pipeline lands)");
    blocks.push("   by running `scripts/anthems/03_vocal_check.mjs`.");
    blocks.push("3. Replace the `wikiFile` value in `src/data/nationalAnthems.ts`.");
    blocks.push("4. If no vocal version exists in a free-licence catalogue, add");
    blocks.push("   `instrumental: true` and reclassify as a documented exception.");
  } else if (gap.category === "no_lyrics_documented") {
    blocks.push("## Status");
    blocks.push(`This anthem has no official lyrics. The existing entry is marked`);
    blocks.push("instrumental and is kept as a documented exception alongside Vatican");
    blocks.push("(Holy See).");
    blocks.push("");
    blocks.push("## What to do");
    blocks.push("No action required for the karaoke build. The player should fall");
    blocks.push("back to a non-karaoke instrumental playback view for this country.");
    blocks.push("Confirm the documented-exception list is rendered in the UI");
    blocks.push("(e.g. an \"instrumental only — no lyrics\" badge).");
  }

  blocks.push("");
  blocks.push("## Search seeds");
  blocks.push("Wikimedia Commons keyword candidates:");
  blocks.push("");
  blocks.push(search);
  blocks.push("");
  blocks.push("## Acceptance criteria");
  blocks.push("- [ ] Lyrics in native script committed");
  blocks.push("- [ ] English translation with provenance tag");
  blocks.push("- [ ] Vocal audio source with explicit free licence");
  blocks.push("- [ ] Line-level (or better, word-level) timings");
  blocks.push("- [ ] License + source URL recorded in `data/anthems/manifest.json`");
  blocks.push("");
  return blocks.join("\n");
}

function pruneStaleTodos(currentIso3Set) {
  const dirents = fs.readdirSync(TODO_DIR, { withFileTypes: true });
  const removed = [];
  for (const d of dirents) {
    if (!d.isFile()) continue;
    const m = d.name.match(/^TODO_([A-Z]{3})\.md$/);
    if (!m) continue;
    if (!currentIso3Set.has(m[1])) {
      fs.unlinkSync(path.join(TODO_DIR, d.name));
      removed.push(m[1]);
    }
  }
  return removed;
}

function main() {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error("catalog.json missing — run scripts/anthems/01_catalog.mjs first");
  }
  const catalog = loadJson(CATALOG_PATH);

  const gaps = [];
  const advisories = [];

  for (const entry of catalog.entries) {
    const gap = classifyGap(entry);
    const advisory_vocal_unknown = entry.status.audio === "vocal_uncertain";
    if (gap) {
      gaps.push({
        iso3: entry.iso3,
        iso2: entry.iso2,
        name_en: entry.name_en,
        category: gap.category,
        blocker: gap.blocker,
        existing_wiki_file: entry.existing_anthem?.wiki_file ?? null,
        line_count: entry.existing_anthem?.line_count ?? 0,
      });
    } else if (advisory_vocal_unknown) {
      advisories.push({
        iso3: entry.iso3,
        iso2: entry.iso2,
        name_en: entry.name_en,
        category: "advisory_vocal_unknown",
        existing_wiki_file: entry.existing_anthem?.wiki_file ?? null,
      });
    }
  }

  const summary = {
    version: 1,
    generated_at: new Date().toISOString().slice(0, 10),
    counts: {
      total_nations: catalog.entries.length,
      gaps: gaps.length,
      blockers: gaps.filter(g => g.blocker).length,
      documented_exceptions: gaps.filter(g => g.category === "no_lyrics_documented").length,
      advisories: advisories.length,
    },
    by_category: gaps.reduce((m, g) => { m[g.category] = (m[g.category] || 0) + 1; return m; }, {}),
    gaps,
    advisories,
  };

  writeJson(GAPS_PATH, summary);

  const todoIso3 = new Set();
  for (const g of gaps) {
    const entry = catalog.entries.find(e => e.iso3 === g.iso3);
    const md = renderTodoMarkdown(entry, { category: g.category, blocker: g.blocker });
    const p = path.join(TODO_DIR, `TODO_${g.iso3}.md`);
    fs.writeFileSync(p, md, "utf8");
    todoIso3.add(g.iso3);
  }
  const removed = pruneStaleTodos(todoIso3);

  console.log(`gaps: ${gaps.length} (${summary.counts.blockers} blockers, ${summary.counts.documented_exceptions} documented exceptions)`);
  console.log(`advisories: ${advisories.length} (vocal-uncertain wikiFile names — not necessarily wrong)`);
  console.log(`by_category:`, summary.by_category);
  console.log(`TODO files written: ${todoIso3.size}`);
  if (removed.length) console.log(`stale TODO files removed: ${removed.join(", ")}`);
  console.log(`→ ${path.relative(REPO_ROOT, GAPS_PATH)}`);
}

main();
