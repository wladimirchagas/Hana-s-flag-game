// Audit tool for the CAPITAL-city flag-meaning sweep's OMISSION list
// (scripts/data/capital-meaning-omitted.txt).
//
// WHY THIS EXISTS — hard rule (see CLAUDE.md "Capital-flag-meaning omissions must
// exhaust authoritative sources in every relevant language"): a capital flag may be
// omitted ONLY after its symbolism has been sought in ALL reachable authoritative
// sources, INCLUDING languages other than English. "Image-only / not documented on
// en.wikipedia" is NEVER a sufficient basis to omit — Flags of the World (FOTW),
// the local-language Wikipedia (bg/ms/pt/de/… .wikipedia), official city-council or
// government pages, heraldic references (heraldika, heraldry-wiki) and Wikimedia
// Commons routinely carry symbolism en.wikipedia omits (this is exactly how Ipoh,
// Kuala Terengganu and Kota Kinabalu were recovered from the Malaysian omission list).
//
// This tool FAILS (exit 1) if any "no symbolism found" omission cites only English
// Wikipedia / a bare "search" and does NOT show it checked at least one deeper
// authoritative source. Structural omissions (the flag can't render or isn't heraldic
// content) are exempt: capital-name / data mismatches, council wordmark/logo flags,
// plain colour flags whose arms are not on the flag, and designs that could not be
// confirmed to match the bundled file.
//
// Run: npm run capitals:audit-omissions   (NOT part of build-gating flags:check; it
// is the sweep's own tripwire — a "capitals sweep complete/thorough" claim is gated
// on a clean run of this.)

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "scripts", "data", "capital-meaning-omitted.txt");
const lines = readFileSync(file, "utf8").split("\n");

// Inline format: "CODE  # reason".
const entries = [];
for (const raw of lines) {
  const line = raw.replace(/\r$/, "");
  if (!line.trim() || line.trim().startsWith("#") && !/^[A-Z]{2}-/.test(line.trim())) continue;
  const m = line.match(/^([A-Z]{2}-[A-Z0-9~]+)\s+#\s*(.+)$/);
  if (m) entries.push({ code: m[1], reason: m[2].trim() });
}

// A structural omission needs no source-exhaustion: the flag can't display, or it
// carries no heraldic content to explain.
const STRUCTURAL =
  /name.?guard|capital-name guard|name mismatch|\bmismatch\b|unreachable|wordmark|\blogo\b|district-council logo|data (inconsistency|mismatch)|blocks the flag|could(?:n't| not) be confirmed to match|not confirmed to match|risk a wrong|risk the wrong|plain .*(tricolour|bicolour)|arms are not on it|not on the (bundled )?flag|mislabel/i;

// A deep (beyond-bare-English) authoritative source that satisfies exhaustion.
const DEEP_SOURCE =
  /\bfotw\b|crwflags|flags of the world|heraldika|heraldry-wiki|wikimedia commons|\bcommons\b|official|government|council (site|page|logo)|\b[a-z]{2}\.wikipedia\b|local[- ]language|\bmalay\b|corporate[- ]image manual|gov\.my|gov\.bg/i;

const problems = [];
for (const e of entries) {
  if (STRUCTURAL.test(e.reason)) continue; // exempt
  if (DEEP_SOURCE.test(e.reason)) continue; // exhausted at least one deep source
  problems.push(e); // mentions only English wikipedia / bare search, or gives no trail
}

if (problems.length > 0) {
  console.error(
    `\n❌ Capital-omission audit failed — ${problems.length} omission(s) do not show ` +
      `authoritative multi-language source-checking (only en.wikipedia / bare search):\n`,
  );
  for (const p of problems) console.error(`  [${p.code}] ${p.reason}`);
  console.error(
    "\nEach must be re-checked against FOTW + the local-language Wikipedia + official/" +
      "heraldic sources before it can be omitted. See the CLAUDE.md hard rule.\n",
  );
  process.exit(1);
}

// ── Live-link check ──────────────────────────────────────────────────────────
// The Saint Helier bug (2026-07-29): an omission cited "je-sh.html — no page" as
// proof no FOTW page documents the flag, when the real page (linked from the
// Jersey parish index) is je-xhe.html and DOES document the symbolism. A dead
// citation can never have actually been read, so any FOTW URL an omission cites
// MUST resolve. This fetches every cited crwflags/fotw.info URL and fails the
// audit on a confirmed 404 — a network error (no egress here) is reported as a
// warning, never a failure, since it is inconclusive rather than proof of a dead
// link.
const FOTW_URL_RE = /((?:crwflags\.com\/fotw|fotw\.info)\/flags\/[a-zA-Z0-9_.\-]+\.html)/g;
// A reason describing a whole FAMILY of pages uses N/X/0 as placeholder digits,
// not a real filename (e.g. mt-NN, ad-N00, tw-XXX) — skip, never meant to be
// fetched literally.
const isPlaceholderUrl = (bare) => /-[nx0]+\.html$/i.test(bare);
const urlToEntries = new Map(); // bare "domain/path" -> [{code, reason}]
for (const e of entries) {
  for (const m of e.reason.matchAll(FOTW_URL_RE)) {
    const bare = m[1];
    if (isPlaceholderUrl(bare)) continue;
    if (!urlToEntries.has(bare)) urlToEntries.set(bare, []);
    urlToEntries.get(bare).push(e);
  }
}

async function checkUrl(bare) {
  const url = `https://${bare}`;
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000) });
    if (res.status === 404) return { bare, dead: true, detail: "HTTP 404" };
    return { bare, dead: false };
  } catch (err) {
    return { bare, dead: false, network: true, detail: err.message };
  }
}

const urlList = [...urlToEntries.keys()];
const results = [];
const CONCURRENCY = 5;
for (let i = 0; i < urlList.length; i += CONCURRENCY) {
  const batch = await Promise.all(urlList.slice(i, i + CONCURRENCY).map(checkUrl));
  results.push(...batch);
}

const deadLinks = results.filter((r) => r.dead);
const networkSkipped = results.filter((r) => r.network);

if (networkSkipped.length > 0) {
  console.log(
    `  (${networkSkipped.length} cited FOTW URL(s) could not be reached — no egress? — skipped, not failed)`,
  );
}

if (deadLinks.length > 0) {
  console.error(
    `\n❌ Capital-omission audit failed — ${deadLinks.length} cited FOTW URL(s) return 404 ` +
      `(a dead citation can't have actually been read):\n`,
  );
  for (const d of deadLinks) {
    for (const e of urlToEntries.get(d.bare)) {
      console.error(`  [${e.code}] cites https://${d.bare} — ${d.detail}`);
    }
  }
  console.error(
    "\nCheck that country/territory's FOTW INDEX page (e.g. crwflags.com/fotw/flags/je-.html) for the\n" +
      "correct link before concluding no page exists — a 404 on a guessed URL is never proof of\n" +
      "absence. Re-source the flag if the correct page documents symbolism, or fix the citation.\n",
  );
  process.exit(1);
}

console.log(
  `✓ Capital-omission audit passed — ${entries.length} omission(s), each either ` +
    `structural or backed by a deep (beyond-English) authoritative source check ` +
    `(${urlList.length - networkSkipped.length} cited FOTW link(s) verified live).`,
);
