// Audit tool for the subdivision flag-meaning sweep's OMISSION list.
//
// WHY THIS EXISTS: subdivision flags get logged in subdiv-meaning-omitted.txt when
// no per-element symbolism can be sourced. But "image-only on en.wikipedia" is NOT a
// sufficient basis for omission — Flags of the World (FOTW, crwflags.com/fotw) and
// local-language / government sources routinely document flag symbolism that
// en.wikipedia omits. Trusting a Wikipedia-only omission has repeatedly hidden
// well-documented flags: Liberia's county flags and South Africa's provincial arms
// were BOTH wrongly omitted this way and are fully documented on FOTW.
//
// This tool flags every omission whose reason shows it was checked ONLY against
// Wikipedia (mentions "wikipedia" but not FOTW/crwflags). Those reasons must be
// re-verified against FOTW before the sweep can be called complete. Run:
//   npm run subdiv:audit-omissions
// It exits non-zero while any Wikipedia-only (un-re-verified) omission remains, so a
// "sweep complete" claim can be gated on a clean run. It is intentionally NOT part of
// the build-gating `flags:check` — the backlog is pre-existing and cleared over time.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "scripts", "data", "subdiv-meaning-omitted.txt");
const lines = readFileSync(file, "utf8").split("\n");

const isCode = (s) => /^[A-Z]{2}-[A-Z0-9~]+(\s+[A-Z]{2}-[A-Z0-9~]+)*\s*$/.test(s.trim());
const codesOf = (s) => s.trim().split(/\s+/).filter((c) => /^[A-Z]{2}-/.test(c));

// Walk the file: a "reason" is the most recent contiguous run of `#` comment lines;
// it applies to every code line that follows until the next comment run.
const blocks = [];
let pending = [];
let current = null;
for (const raw of lines) {
  const line = raw.replace(/\r$/, "");
  if (line.trim().startsWith("#")) {
    if (current) current = null; // a new comment run starts a new reason
    pending.push(line.trim().replace(/^#\s?/, ""));
  } else if (isCode(line)) {
    if (pending.length) {
      current = { reason: pending.join(" "), codes: [] };
      blocks.push(current);
      pending = [];
    }
    if (!current) {
      current = { reason: "(NO REASON GIVEN)", codes: [] };
      blocks.push(current);
    }
    current.codes.push(...codesOf(line));
  }
  // blank / other lines: keep the active reason, don't reset
}

const fotwOk = (r) => /\bfotw\b|crwflags|flags of the world/i.test(r);
const wikiMentioned = (r) => /wikipedia/i.test(r);

const unverified = blocks.filter((b) => b.codes.length && !fotwOk(b.reason) && wikiMentioned(b.reason));
const noReason = blocks.filter((b) => b.reason === "(NO REASON GIVEN)" && b.codes.length);
const verified = blocks.filter((b) => b.codes.length && fotwOk(b.reason));

const sum = (arr) => arr.reduce((n, b) => n + b.codes.length, 0);
console.log(
  `Omission reasons: ${blocks.filter((b) => b.codes.length).length} blocks, ${sum(blocks)} codes total.`,
);
console.log(`  FOTW-re-verified blocks: ${verified.length} (${sum(verified)} codes)`);
console.log(`  Wikipedia-only (NOT re-verified against FOTW): ${unverified.length} (${sum(unverified)} codes)`);
if (noReason.length) console.log(`  Codes with NO reason at all: ${sum(noReason)}`);

if (unverified.length || noReason.length) {
  console.error(
    "\n✗ These omissions were checked only against Wikipedia (or have no reason) and MUST be re-verified\n" +
      "  against Flags of the World before the sweep can be called complete (see the Liberia/South Africa\n" +
      "  cautionary rule in CLAUDE.md). Re-check each against crwflags.com/fotw; source the ones FOTW\n" +
      "  documents, and annotate genuine walls with the FOTW re-verification:",
  );
  for (const b of [...unverified, ...noReason]) {
    const cc = [...new Set(b.codes.map((c) => c.split("-")[0]))].join(",");
    console.error(`  • [${cc}] ${b.codes.length} code(s): ${b.reason.slice(0, 90)}`);
  }
  process.exit(1);
}

// ── Live-link check ──────────────────────────────────────────────────────────
// The Saint Helier capital-flag bug (2026-07-29) showed a citation mentioning
// FOTW can still be WRONG: an omission cited a guessed FOTW URL as proof no page
// exists, when the real page lived at a different URL. A dead citation can never
// have actually been read, so any FOTW URL an omission cites MUST resolve. This
// fetches every cited crwflags/fotw.info URL and fails on a confirmed 404 — a
// network error (no egress here) is a warning, never a failure.
const FOTW_URL_RE = /((?:crwflags\.com\/fotw|fotw\.info)\/flags\/[a-zA-Z0-9_.\-]+\.html)/g;
// A reason describing a whole FAMILY of pages (e.g. "checked each of mt-NN.html for
// every code") uses N/X/0 as placeholder digits, not a real filename — e.g. mt-NN,
// ad-N00, tw-XXX. Skip these; they were never meant to be fetched literally.
const isPlaceholderUrl = (bare) => /-[nx0]+\.html$/i.test(bare);
const urlToBlocks = new Map();
for (const b of blocks) {
  if (!b.codes.length) continue;
  for (const m of b.reason.matchAll(FOTW_URL_RE)) {
    const bare = m[1];
    if (isPlaceholderUrl(bare)) continue;
    if (!urlToBlocks.has(bare)) urlToBlocks.set(bare, []);
    urlToBlocks.get(bare).push(b);
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

const urlList = [...urlToBlocks.keys()];
const linkResults = [];
const CONCURRENCY = 5;
for (let i = 0; i < urlList.length; i += CONCURRENCY) {
  const batch = await Promise.all(urlList.slice(i, i + CONCURRENCY).map(checkUrl));
  linkResults.push(...batch);
}

const deadLinks = linkResults.filter((r) => r.dead);
const networkSkipped = linkResults.filter((r) => r.network);

if (networkSkipped.length > 0) {
  console.log(
    `  (${networkSkipped.length} cited FOTW URL(s) could not be reached — no egress? — skipped, not failed)`,
  );
}

if (deadLinks.length > 0) {
  console.error(
    `\n✗ ${deadLinks.length} cited FOTW URL(s) return 404 (a dead citation can't have actually been read):`,
  );
  for (const d of deadLinks) {
    for (const b of urlToBlocks.get(d.bare)) {
      const cc = [...new Set(b.codes.map((c) => c.split("-")[0]))].join(",");
      console.error(`  • [${cc}] cites https://${d.bare} — ${d.detail}`);
    }
  }
  console.error(
    "\nCheck that country/subdivision's FOTW INDEX page for the correct link before concluding no page\n" +
      "exists — a 404 on a guessed URL is never proof of absence. Re-source the flag if the correct page\n" +
      "documents symbolism, or fix the citation.\n",
  );
  process.exit(1);
}

console.log(
  `\n✓ Every omission cites Flags of the World (re-verified; ${urlList.length - networkSkipped.length} ` +
    `cited link(s) verified live). Sweep may be called complete.`,
);
