#!/usr/bin/env node
/**
 * A Sub-national flags question must have exactly one correct answer. Where two
 * divisions of one country really do fly the same flag (Ajman and Dubai), the
 * game accepts both, and src/data/identicalSubdivisionFlags.ts is the list that
 * tells it so. This check keeps that list complete and honest.
 *
 * It rasterises every division flag the game can show, compares every pair in
 * each country, and fails when:
 *   - two flags are near-identical but are neither in one declared group nor in
 *     REVIEWED_DISTINCT below (a question the game would mark wrong for a right
 *     answer);
 *   - a declared group's flags no longer look identical (a replaced file would
 *     otherwise keep accepting a wrong answer);
 *   - a declared code has no flag, or a group spans two countries;
 *   - the game stops reading the list.
 *
 * Found 2026-09 while bundling Balzers and Gamprin, whose flags are identical
 * (FOTW li-ba.html). Four such pairs were already in the game and a player who
 * named the twin was marked wrong.
 *
 * Measured 2026-09 on a 48×32 raster, where a pixel counts as different when
 * any channel moves by more than 48:
 *   declared identical pairs ..... 0.0% of pixels differ (all five)
 *   closest distinct pair ........ 0.1% (EE-44/EE-59, only the roof colour differs)
 *   other reviewed pairs ......... 1.6% to 2.7%
 *   closest pair not reviewed .... 4.4%
 * NEAR (3%) sits in the gap above the reviewed pairs, so every pair under it
 * gets a human decision. TWIN_MAX bounds a declared group more tightly.
 *
 * Never raise NEAR or TWIN_MAX to make a pair pass, and never add a pair to
 * REVIEWED_DISTINCT without a side-by-side look at the two flags. If this fires,
 * either declare the twins (sourced) or record why the flags differ.
 */
import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 48, H = 32, CHANNEL = 48;
const NEAR = 0.03;
const TWIN_MAX = 0.005;

/** Near-identical pairs checked by eye and found to be different flags. */
const REVIEWED_DISTINCT = new Map([
  ["EE-44|EE-59", "Ida-Viru's tower roof is red, Lääne-Viru's gold; the arms are otherwise alike."],
  ["EE-49|EE-78", "Jõgeva's arms carry a clover leaf and ears of grain, Tartu's a star and an oak branch."],
  ["EE-65|EE-67", "Põlva's arms show three beavers, Pärnu's a bear."],
  ["FR-73|FR-74", "Haute-Savoie's version writes the department's name on the cross; Savoie's is plain."],
  ["CO-ANT|CO-VAU", "Vaupés adds a rubber-tree leaf to the white-over-green; Antioquia's is plain."],
]);

const read = (rel) => readFileSync(join(root, rel), "utf8");
const pairKey = (a, b) => [a, b].sort().join("|");

/** Every division of every country deck, from the generated meta. */
function metaDecks() {
  const src = read("src/lib/subdivisionMeta.ts");
  const decks = new Map();
  const blockRe = /^ {2}"([A-Z]{2})": \{\n {4}countryCode: "[A-Z]{2}",[\s\S]*?\n {4}\],\n {2}\},/gm;
  let m;
  while ((m = blockRe.exec(src))) {
    decks.set(m[1], [...m[0].matchAll(/\{ code: "([^"]+)", name: "([^"]+)"/g)].map((x) => ({ code: x[1], name: x[2] })));
  }
  return decks;
}

function codeSet(rel, exportName) {
  const src = read(rel);
  const start = src.indexOf(exportName);
  const end = src.indexOf("]);", start);
  return new Set([...src.slice(start, end).matchAll(/"([A-Z0-9~_-]+)"/g)].map((x) => x[1]));
}

function hierarchyChildren() {
  const src = read("src/lib/disputedSubdivisions.ts");
  const start = src.indexOf("export const DISPUTED_TERRITORY_HIERARCHY");
  const body = src.slice(start, src.indexOf("};", start));
  return new Set([...body.matchAll(/^\s*"([^"]+)":\s*"[^"]+",/gm)].map((x) => x[1]));
}

/** code -> absolute path of the flag the game shows for that division, as subdivisionFlagUrl resolves it. */
function divisionFlags() {
  const overrides = new Map();
  for (const m of read("src/api/subdivisions.ts").matchAll(/"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g)) {
    overrides.set(m[1], join(root, "public", "flags", m[2]));
  }
  const bundled = new Map();
  const subDir = join(root, "public", "flags", "sub");
  for (const cc of readdirSync(subDir)) {
    for (const f of readdirSync(join(subDir, cc))) {
      const code = f.replace(/\.(svg|png|jpe?g|webp)$/i, "");
      if (code !== f) bundled.set(code, join(subDir, cc, f));
    }
  }
  const capitals = new Map();
  for (const m of read("src/data/capitalFlags.ts").matchAll(/"([A-Z0-9~_-]+)":\s*"(capital-flags\/[^"]+)"/g)) {
    capitals.set(m[1], join(root, "public", m[2]));
  }
  const cityTerritories = codeSet("src/data/cityTerritories.ts", "CITY_TERRITORY_CODES");
  const suppressed = codeSet("src/api/subdivisions.ts", "SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet");
  return (code) => {
    if (suppressed.has(code)) return null;
    const own = overrides.get(code) ?? bundled.get(code) ?? null;
    if (own) return own;
    return cityTerritories.has(code) ? capitals.get(code) ?? null : null;
  };
}

function declaredGroups() {
  const src = read("src/data/identicalSubdivisionFlags.ts");
  return [...src.matchAll(/codes:\s*\[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
}

async function raster(path) {
  return sharp(path, { density: 72, limitInputPixels: false })
    .flatten({ background: "#808080" })
    .resize(W, H, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
}

function differingFraction(a, b) {
  let diff = 0;
  for (let k = 0; k < W * H; k++) {
    const d = Math.max(Math.abs(a[3 * k] - b[3 * k]), Math.abs(a[3 * k + 1] - b[3 * k + 1]), Math.abs(a[3 * k + 2] - b[3 * k + 2]));
    if (d > CHANNEL) diff++;
  }
  return diff / (W * H);
}

const errors = [];

// The game must read the list, or the list protects nothing.
const hook = read("src/hooks/useSubdivisionGame.ts");
if (!/identicalFlagTwins\(current\.division\.code\)\.includes\(selected\.code\)/.test(hook)) {
  errors.push("useSubdivisionGame.ts no longer checks identicalFlagTwins() when marking an answer.");
}

const decks = metaDecks();
const flagOf = divisionFlags();
const skip = hierarchyChildren();
const groups = declaredGroups();
const groupOf = new Map();
groups.forEach((g, i) => g.forEach((c) => groupOf.set(c, i)));

const deckOf = new Map();
for (const [cc, divs] of decks) for (const d of divs) deckOf.set(d.code, cc);
for (const g of groups) {
  if (g.length < 2) errors.push(`A declared group has fewer than two codes: ${g.join(", ")}`);
  const ccs = new Set(g.map((c) => deckOf.get(c)));
  if (ccs.size !== 1 || ccs.has(undefined)) errors.push(`Declared group ${g.join(", ")} is not one country's divisions.`);
  for (const c of g) if (!flagOf(c)) errors.push(`Declared group member ${c} has no flag in the game.`);
}

let compared = 0;
const cache = new Map();
const rasterOf = async (path) => {
  if (!cache.has(path)) cache.set(path, await raster(path));
  return cache.get(path);
};
for (const [cc, divs] of decks) {
  const items = [];
  const seen = new Set();
  for (const d of divs) {
    if (skip.has(d.code) || seen.has(d.code)) continue;
    seen.add(d.code);
    const path = flagOf(d.code);
    if (path && existsSync(path)) items.push({ code: d.code, img: await rasterOf(path) });
  }
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      compared++;
      const frac = differingFraction(a.img, b.img);
      const pct = `${(frac * 100).toFixed(1)}%`;
      const sameGroup = groupOf.has(a.code) && groupOf.get(a.code) === groupOf.get(b.code);
      if (sameGroup) {
        if (frac >= TWIN_MAX) errors.push(`${a.code} and ${b.code} are declared identical but ${pct} of their pixels differ.`);
        continue;
      }
      if (frac < NEAR && !REVIEWED_DISTINCT.has(pairKey(a.code, b.code))) {
        errors.push(
          `${cc}: ${a.code} and ${b.code} are near-identical (${pct} of pixels differ) but are neither ` +
            `declared identical nor reviewed as distinct.`,
        );
      }
    }
  }
}

if (errors.length) {
  console.error(`✗ Identical sub-national flags check failed:\n  ${errors.join("\n  ")}\n`);
  console.error(
    "If the two flags are the same design, add them as a sourced group to\n" +
      "src/data/identicalSubdivisionFlags.ts so the game accepts either answer. If they\n" +
      "differ, add the pair to REVIEWED_DISTINCT with a reason, after comparing them by eye.",
  );
  process.exit(1);
}
console.log(
  `✓ Identical sub-national flags check passed: ${compared} same-country pairs compared, ` +
    `${groups.length} declared identical groups, ${REVIEWED_DISTINCT.size} reviewed near-identical pairs.`,
);
