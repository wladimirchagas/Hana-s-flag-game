#!/usr/bin/env node
/**
 * sync-youtube-captions.mjs
 *
 * Extracts lyric timing from YouTube caption tracks for every anthem that has
 * a youtubeId, then writes a calibration JSON that can be fed into
 * apply-calibration.mjs to update both youtubeIntroOffset and line start times.
 *
 * Usage:
 *   node scripts/sync-youtube-captions.mjs [--out anthem-yt-calibration.json] [CC CC ...]
 *
 *   CC CC ...   Optional ISO-3166-1 alpha-2 codes to process (default: all)
 *   --out FILE  Output JSON path (default: anthem-yt-calibration.json)
 *   --dry-run   Print results without writing
 *
 * Then apply:
 *   node scripts/apply-calibration.mjs anthem-yt-calibration.json
 *
 * Requires network access to YouTube (run on a developer machine, not in CI).
 *
 * How it works
 * ─────────────
 * For each anthem with a youtubeId the script:
 *   1. Calls the YouTube InnerTube /player endpoint (no API key needed for
 *      public videos) to obtain the list of caption track URLs.
 *   2. Picks the best track: the anthem's own language first, auto-generated
 *      English second, any track last.
 *   3. Fetches the track in JSON3 format and filters to substantive cues
 *      (discards [Music] / [Applause] / blank events).
 *   4. Matches each lyric line to its best caption cue via Jaccard word-set
 *      similarity — works across scripts (Arabic, CJK, Cyrillic, Latin) because
 *      it operates on space-split tokens after stripping non-letter/number chars.
 *   5. Sets introOffset = start time of the first matched cue.
 *      Sets line.start[i] = matched_cue.start − introOffset (0-relative).
 *   6. Falls back to keeping existing data when captions are absent or no cue
 *      achieves at least 25% word overlap.
 *
 * Output format (also accepted by the updated apply-calibration.mjs):
 *   {
 *     "AU": { "introOffset": 5.2, "starts": [0.0, 6.8, 12.5, …] },
 *     "US": { "introOffset": 8.1, "starts": [0.0, 7.0, …] },
 *     …
 *   }
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dir, "../src/data/nationalAnthems.ts");

// ── CLI ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let outFile = "anthem-yt-calibration.json";
let dryRun = false;
const targetCodes = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out" && args[i + 1]) { outFile = args[++i]; }
  else if (args[i] === "--dry-run") { dryRun = true; }
  else if (/^[A-Z]{2,3}$/.test(args[i])) { targetCodes.push(args[i]); }
}

// ── Parse nationalAnthems.ts ───────────────────────────────────────────────
// Extracts each country's youtubeId, language, and lyric line texts.
function parseAnthemsTs(src) {
  const results = {};

  // Match each top-level entry block: "  XX: { … },"
  // We find all code positions first, then slice between them.
  const headerRe = /^  ([A-Z]{2,3}): \{/gm;
  const starts = [];
  let m;
  while ((m = headerRe.exec(src)) !== null) {
    starts.push({ code: m[1], pos: m.index });
  }

  for (let i = 0; i < starts.length; i++) {
    const { code, pos } = starts[i];
    const nextPos = i + 1 < starts.length ? starts[i + 1].pos : src.length;
    const block = src.slice(pos, nextPos);

    const youtubeId = block.match(/youtubeId:\s*"([^"]+)"/)?.[1];
    if (!youtubeId) continue;

    const language = block.match(/language:\s*"([^"]+)"/)?.[1] ?? "en";

    // Extract all lyric line texts
    const lineTexts = [...block.matchAll(/\{\s*text:\s*"((?:[^"\\]|\\.)*)"/g)]
      .map(lm => lm[1].replace(/\\"/g, '"'));

    results[code] = { youtubeId, language, lineTexts };
  }

  return results;
}

// ── YouTube InnerTube API ──────────────────────────────────────────────────
// Public API call — no key required for public videos.
async function fetchYouTubePlayerData(videoId) {
  const resp = await fetch("https://www.youtube.com/youtubei/v1/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; AnthemSyncBot/1.0)",
      "X-YouTube-Client-Name": "1",
      "X-YouTube-Client-Version": "2.20240101.00.00",
    },
    body: JSON.stringify({
      videoId,
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20240101.00.00",
          hl: "en",
        },
      },
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!resp.ok) throw new Error(`InnerTube HTTP ${resp.status}`);
  return resp.json();
}

async function getCaptionTracks(videoId) {
  const data = await fetchYouTubePlayerData(videoId);
  return (
    data?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []
  );
}

// Pick the best caption track: exact language match > auto-generated ('a.xx') > any
function chooseBestTrack(tracks, language) {
  if (!tracks.length) return null;

  // Normalise: "zh-Hans" → "zh", "pt-BR" → "pt", etc.
  const baseLang = language.split(/[-_]/)[0].toLowerCase();

  const exact = tracks.filter(t => t.languageCode?.toLowerCase() === language.toLowerCase());
  if (exact.length) return exact[0];

  const base = tracks.filter(t =>
    t.languageCode?.toLowerCase().split(/[-_]/)[0] === baseLang,
  );
  if (base.length) return base[0];

  // Auto-generated English ("asr" / vssId starts with "a.")
  const autoEn = tracks.filter(t =>
    t.vssId?.startsWith("a.") || t.kind === "asr",
  );
  if (autoEn.length) return autoEn[0];

  // Any English track
  const en = tracks.filter(t => t.languageCode?.toLowerCase() === "en");
  if (en.length) return en[0];

  return tracks[0];
}

async function fetchCaptionCues(baseUrl) {
  const url = baseUrl.includes("fmt=") ? baseUrl : `${baseUrl}&fmt=json3`;
  const resp = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AnthemSyncBot/1.0)" },
    signal: AbortSignal.timeout(12000),
  });
  if (!resp.ok) throw new Error(`Caption fetch HTTP ${resp.status}`);
  const json = await resp.json();
  return parseCaptionJson(json);
}

function parseCaptionJson(json) {
  const NOISE = /^\s*\[/; // [Music], [Applause], etc.
  return (json.events ?? [])
    .filter(e => Array.isArray(e.segs) && e.tStartMs !== undefined)
    .map(e => ({
      start: e.tStartMs / 1000,
      dur: (e.dDurationMs ?? 0) / 1000,
      text: e.segs.map(s => s.utf8 ?? "").join("").trim(),
    }))
    .filter(e => e.text && !NOISE.test(e.text) && e.text !== "\n");
}

// Fallback: the public timedtext endpoint does not need InnerTube.
// Works server-side (no CORS restriction). Tries the anthem's own
// language first, then English auto-generated captions.
async function fetchCaptionCuesViaTimedtext(videoId, language) {
  const langCodes = language !== "en" ? [language, "en"] : ["en"];
  for (const lang of langCodes) {
    try {
      const url =
        `https://www.youtube.com/api/timedtext` +
        `?v=${encodeURIComponent(videoId)}&lang=${encodeURIComponent(lang)}&fmt=json3`;
      const resp = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; AnthemSyncBot/1.0)" },
        signal: AbortSignal.timeout(12000),
      });
      if (!resp.ok) continue;
      const json = await resp.json();
      const cues = parseCaptionJson(json);
      if (cues.length) return cues;
    } catch { /* try next lang */ }
  }
  return null;
}

// ── Text similarity ────────────────────────────────────────────────────────
// Unicode-aware normalise: strip everything that isn't a letter, digit, or space.
const KEEP = /[^\p{L}\p{N}\s]/gu;

function normalise(s) {
  return s.toLowerCase().replace(KEEP, " ").replace(/\s+/g, " ").trim();
}

function jaccardWords(a, b) {
  const setA = new Set(normalise(a).split(" ").filter(Boolean));
  const setB = new Set(normalise(b).split(" ").filter(Boolean));
  if (!setA.size || !setB.size) return 0;
  let inter = 0;
  for (const w of setA) { if (setB.has(w)) inter++; }
  return inter / (setA.size + setB.size - inter);
}

// ── Core calibration ───────────────────────────────────────────────────────
function deriveCalibration(lineTexts, cues) {
  if (!cues.length || !lineTexts.length) return null;
  const THRESHOLD = 0.25;

  // Forward-pass: advance the search window after each match so repeated
  // lyric lines don't both match the same early cue (temporal order preserved).
  let cueSearchStart = 0;
  const matches = lineTexts.map(text => {
    let best = null;
    let bestScore = THRESHOLD;
    let bestIdx = cueSearchStart;
    const windowEnd = Math.min(cues.length, cueSearchStart + 30);
    for (let j = cueSearchStart; j < windowEnd; j++) {
      const score = jaccardWords(text, cues[j].text);
      if (score > bestScore) { bestScore = score; best = cues[j]; bestIdx = j; }
    }
    if (best) cueSearchStart = bestIdx + 1;
    return best ? { cue: best, score: bestScore } : null;
  });

  // Need at least the first line matched to establish introOffset
  if (!matches[0]) {
    // Try: use the very first cue as introOffset anyway
    // (some anthems start with a line that differs slightly from stored text)
    const firstMatch = matches.find(Boolean);
    if (!firstMatch) return null;
  }

  // introOffset = start time of the first cue that matches any line
  const firstMatchIdx = matches.findIndex(Boolean);
  const introOffset = matches[firstMatchIdx]
    ? matches[firstMatchIdx].cue.start
    : cues[0].start;

  // If the first line wasn't matched, fill it from cue[0] for interpolation
  const anchoredMatches = [...matches];
  if (!anchoredMatches[0] && cues.length) {
    anchoredMatches[0] = { cue: { start: introOffset }, score: 0 };
  }

  // Build starts[], interpolating gaps between matched lines
  const starts = new Array(lineTexts.length).fill(null);
  for (let i = 0; i < anchoredMatches.length; i++) {
    if (anchoredMatches[i]) {
      starts[i] = Math.max(
        0,
        Math.round((anchoredMatches[i].cue.start - introOffset) * 10) / 10,
      );
    }
  }

  // Interpolate nulls linearly between known anchors
  let prevKnown = 0;
  for (let i = 1; i < starts.length; i++) {
    if (starts[i] !== null) {
      // Fill gap between prevKnown and i
      const gapStart = starts[prevKnown];
      const gapEnd = starts[i];
      const gapLen = i - prevKnown;
      for (let j = prevKnown + 1; j < i; j++) {
        starts[j] = Math.round(
          (gapStart + ((gapEnd - gapStart) * (j - prevKnown)) / gapLen) * 10,
        ) / 10;
      }
      prevKnown = i;
    }
  }
  // Fill trailing nulls by extrapolating the average gap
  if (prevKnown < starts.length - 1 && prevKnown > 0) {
    const avgGap = starts[prevKnown] / prevKnown;
    for (let i = prevKnown + 1; i < starts.length; i++) {
      starts[i] = Math.round((starts[i - 1] + avgGap) * 10) / 10;
    }
  }

  const matchedCount = matches.filter(Boolean).length;
  return {
    introOffset: Math.round(introOffset * 100) / 100,
    starts: starts.map(s => s ?? 0),
    matchedLines: matchedCount,
    totalLines: lineTexts.length,
  };
}

// ── Main ───────────────────────────────────────────────────────────────────
const src = readFileSync(dataPath, "utf8");
const anthems = parseAnthemsTs(src);

const codes = targetCodes.length
  ? targetCodes.filter(c => anthems[c])
  : Object.keys(anthems);

console.log(`Processing ${codes.length} YouTube anthems…\n`);

const calibration = {};
let okCount = 0;
let skipCount = 0;
let failCount = 0;

for (const code of codes) {
  const { youtubeId, language, lineTexts } = anthems[code];

  process.stdout.write(`  ${code} (${youtubeId})… `);

  try {
    let cues = null;

    // Strategy 1: InnerTube API → signed caption track URL
    try {
      const tracks = await getCaptionTracks(youtubeId);
      const track = chooseBestTrack(tracks, language);
      if (track?.baseUrl) {
        const fetched = await fetchCaptionCues(track.baseUrl);
        if (fetched.length) cues = fetched;
      }
    } catch { /* InnerTube blocked or unavailable — try fallback */ }

    // Strategy 2: direct timedtext API (no InnerTube needed, works from CI)
    if (!cues?.length) {
      cues = await fetchCaptionCuesViaTimedtext(youtubeId, language);
    }

    if (!cues?.length) {
      console.log("⏭  no captions available");
      skipCount++;
      continue;
    }

    const result = deriveCalibration(lineTexts, cues);

    if (!result) {
      console.log("⚠  no line matches found");
      skipCount++;
      continue;
    }

    const matchPct = Math.round((result.matchedLines / result.totalLines) * 100);
    console.log(
      `✅  introOffset=${result.introOffset}s  ` +
      `lines=${result.matchedLines}/${result.totalLines} (${matchPct}%)  ` +
      `first→last: ${result.starts[0]}s → ${result.starts[result.starts.length - 1]}s`,
    );

    calibration[code] = {
      introOffset: result.introOffset,
      starts: result.starts,
    };
    okCount++;
  } catch (e) {
    console.log(`❌  ${e.message}`);
    failCount++;
  }
}

console.log(
  `\n── Summary ────────────────────────────────────────\n` +
  `  Calibrated : ${okCount}\n` +
  `  Skipped    : ${skipCount} (no captions)\n` +
  `  Failed     : ${failCount} (network / parse errors)\n`,
);

if (okCount === 0) {
  console.log("Nothing to write.");
  process.exit(0);
}

const json = JSON.stringify(calibration, null, 2);

if (dryRun) {
  console.log("── Dry run — output preview ────────────────────────\n");
  console.log(json.slice(0, 800) + (json.length > 800 ? "\n…" : ""));
} else {
  writeFileSync(outFile, json, "utf8");
  console.log(`Written → ${outFile}`);
  console.log(`\nApply with:\n  node scripts/apply-calibration.mjs ${outFile}\n`);
}
