#!/usr/bin/env node
// Phase 1, stage 01 — build the enriched per-nation catalog.
//
// Reads:    data/anthems/nations.json   (canonical 195-nation seed)
//           src/data/nationalAnthems.ts (existing in-app anthem table)
// Writes:   data/anthems/catalog.json
//           data/anthems/manifest.json   (initialised or merged in-place)
//
// The catalog is the single source of truth that downstream stages
// (02_fetch_audio, 03_vocal_check, …) consume. It is regeneratable:
// re-running this script with no inputs changed produces byte-identical
// output, and merging back into manifest.json never overwrites fields
// set by a later stage.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseAnthems } from "./lib/parseAnthems.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const NATIONS_PATH = path.join(REPO_ROOT, "data", "anthems", "nations.json");
const CATALOG_PATH = path.join(REPO_ROOT, "data", "anthems", "catalog.json");
const MANIFEST_PATH = path.join(REPO_ROOT, "data", "anthems", "manifest.json");

const WIKI_FILE_VOCAL_HINT = /vocal|sung|voice|choral|choir|singing|with[-_ ]?lyrics|coral|cantad|\bcoro\b|polifón|polifon/i;
const WIKI_FILE_INSTR_HINT = /instrumental|instr[._-]|orchestra(?:[-_ ]only)?|without[-_ ]?vocal|karaok|backing[-_ ]?track|band|brass/i;

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function deriveWikipediaAnthemSlug(existing, nation) {
  // We don't fetch from Wikipedia at runtime here — Phase 2 (fetch_lyrics) does
  // that. We only emit a best-guess slug for downstream stages to verify.
  // Preference: existing titleEn → existing title (transliterated separately) →
  // "<name_en> national anthem".
  if (existing?.titleEn) return existing.titleEn.replace(/\s+/g, "_");
  if (existing?.title) return existing.title.replace(/\s+/g, "_");
  return `${nation.name_en.replace(/\s+/g, "_")}_national_anthem`;
}

function deriveSearchTerms(existing, nation) {
  const terms = new Set();
  if (existing?.title) terms.add(existing.title);
  if (existing?.titleEn) terms.add(existing.titleEn);
  if (existing?.wikiSearch) terms.add(existing.wikiSearch);
  terms.add(`${nation.name_en} national anthem`);
  if (existing?.wikiFile) {
    const stem = existing.wikiFile.replace(/\.(ogg|oga|mp3|wav|webm|flac)$/i, "");
    terms.add(stem);
  }
  return Array.from(terms);
}

function classifyAudioStatus(existing) {
  if (!existing) return "no_entry";
  if (existing.instrumental) return "instrumental_marked";
  const wiki = existing.wikiFile || "";
  const vocal = WIKI_FILE_VOCAL_HINT.test(wiki);
  const instr = WIKI_FILE_INSTR_HINT.test(wiki);
  if (instr && !vocal) return "instrumental_inferred";
  if (vocal) return "vocal_likely";
  return "vocal_uncertain";
}

function classifyLyricsStatus(existing) {
  if (!existing) return "no_entry";
  if (existing.lineCount === 0) return "no_lines";
  if (existing.hasWordTimestamps) return "word_aligned";
  return "line_aligned";
}

function mergeManifestEntry(prev, next) {
  // Preserve any downstream-stage fields (audio.*, alignment.*, license.*) that
  // were populated by later runs; refresh only the Phase 1 fields.
  const merged = { ...prev };
  merged.iso3 = next.iso3;
  merged.iso2 = next.iso2;
  merged.name_en = next.name_en;
  merged.official_languages = next.official_languages;
  merged.wikipedia_anthem_slug = next.wikipedia_anthem_slug;
  merged.wikimedia_search_terms = next.wikimedia_search_terms;
  merged.existing_anthem = next.existing_anthem;
  merged.status = next.status;
  if (!merged.audio) merged.audio = { stage: "not_started" };
  if (!merged.alignment) merged.alignment = { stage: "not_started" };
  if (!merged.license) merged.license = { audio: null, lyrics_source: next.lyrics_license_source };
  return merged;
}

function main() {
  const seed = loadJson(NATIONS_PATH);
  if (!Array.isArray(seed.countries) || seed.countries.length !== 195) {
    throw new Error(`expected exactly 195 nations, got ${seed.countries?.length}`);
  }
  const existing = parseAnthems();

  const catalog = {
    version: 1,
    generated_at: new Date().toISOString().slice(0, 10),
    source_seed: "data/anthems/nations.json",
    source_existing_anthems: "src/data/nationalAnthems.ts",
    nation_count: seed.countries.length,
    existing_anthem_count: Object.keys(existing).length,
    entries: [],
  };

  let prevManifest = { version: 1, phase: 1, entries: {} };
  if (fs.existsSync(MANIFEST_PATH)) {
    try { prevManifest = loadJson(MANIFEST_PATH); } catch { /* ignore corrupt */ }
  }
  const nextManifest = { version: 1, phase: 1, generated_at: catalog.generated_at, entries: {} };

  for (const nation of seed.countries) {
    const ex = existing[nation.iso2];
    const audio_status = classifyAudioStatus(ex);
    const lyrics_status = classifyLyricsStatus(ex);
    const entry = {
      iso3: nation.iso3,
      iso2: nation.iso2,
      name_en: nation.name_en,
      official_languages: nation.official_languages,
      wikipedia_anthem_slug: deriveWikipediaAnthemSlug(ex, nation),
      wikimedia_search_terms: deriveSearchTerms(ex, nation),
      note: nation.note,
      existing_anthem: ex ? {
        title: ex.title,
        title_en: ex.titleEn,
        wiki_file: ex.wikiFile,
        wiki_search: ex.wikiSearch,
        language: ex.language,
        instrumental_marked: !!ex.instrumental,
        line_count: ex.lineCount,
        lines_with_word_timings: ex.linesWithWordTimings,
        has_word_timestamps: ex.hasWordTimestamps,
      } : null,
      status: {
        audio: audio_status,
        lyrics: lyrics_status,
      },
      lyrics_license_source: ex ? "wikipedia_cc-by-sa-4.0" : null,
    };
    catalog.entries.push(entry);
    nextManifest.entries[nation.iso3] = mergeManifestEntry(prevManifest.entries?.[nation.iso3], entry);
  }

  writeJson(CATALOG_PATH, catalog);
  writeJson(MANIFEST_PATH, nextManifest);

  const audioTally = {};
  const lyricsTally = {};
  for (const e of catalog.entries) {
    audioTally[e.status.audio] = (audioTally[e.status.audio] || 0) + 1;
    lyricsTally[e.status.lyrics] = (lyricsTally[e.status.lyrics] || 0) + 1;
  }

  console.log(`catalog: ${catalog.entries.length} nations → ${path.relative(REPO_ROOT, CATALOG_PATH)}`);
  console.log(`manifest: ${Object.keys(nextManifest.entries).length} entries → ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);
  console.log("audio status:", audioTally);
  console.log("lyrics status:", lyricsTally);
}

main();
