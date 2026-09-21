/**
 * Build gate: every football-association crest shown in the Learn panel carries
 * sourced FIFA World Cup appearance + title rows, and the UI cannot drop them.
 *
 * HARD RULE (CLAUDE.md "Football association World Cup records"):
 *   1. WORLD_CUP_RECORDS has an entry for every footballcrest id.
 *   2. Title counts match worldCupTitles.ts (single source of truth for wins).
 *   3. LearnPage + NationalFlagDetails call withFootballCrestStats.
 *   4. The four FOOTBALL_CREST_STAT_LABELS stay named and rendered.
 *
 * Run: node scripts/check-football-crest-stats.mjs
 * Pure text parse — no .ts imports — so it runs on any Node the CI jobs use.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const REQUIRED_LABELS = [
  "Men's World Cups participated",
  "Men's World Cup titles",
  "Women's World Cups participated",
  "Women's World Cup titles",
];

const sources = JSON.parse(
  fs.readFileSync(path.join(root, "scripts/data/national-flag-sources.json"), "utf8"),
);
const crestIds = [];
for (const c of Object.values(sources.countries)) {
  for (const f of c.flags ?? []) {
    if (f.category === "footballcrest") crestIds.push(f.id);
  }
}
assert.ok(crestIds.length >= 200, `expected ~212 football crests, got ${crestIds.length}`);

const recordsSrc = fs.readFileSync(
  path.join(root, "src/data/worldCupRecords.ts"),
  "utf8",
);
const titlesSrc = fs.readFileSync(
  path.join(root, "src/data/worldCupTitles.ts"),
  "utf8",
);
const helperSrc = fs.readFileSync(
  path.join(root, "src/lib/footballCrestStats.ts"),
  "utf8",
);
const learnPage = fs.readFileSync(path.join(root, "src/pages/LearnPage.tsx"), "utf8");
const details = fs.readFileSync(
  path.join(root, "src/components/NationalFlagDetails.tsx"),
  "utf8",
);

/** Parse `WORLD_CUP_RECORDS` object literal. */
function parseRecords(src) {
  const out = {};
  const re =
    /"([^"]+)":\s*\{\s*mensAppearances:\s*(\d+),\s*mensTitles:\s*(\d+),\s*womensAppearances:\s*(\d+),\s*womensTitles:\s*(\d+)\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    out[m[1]] = {
      mensAppearances: Number(m[2]),
      mensTitles: Number(m[3]),
      womensAppearances: Number(m[4]),
      womensTitles: Number(m[5]),
    };
  }
  return out;
}

function parseTitlesBlock(src, constName) {
  const block = src.match(
    new RegExp(`${constName}[^=]*=\\s*\\{([^}]+)\\}`, "s"),
  );
  assert.ok(block, `could not parse ${constName}`);
  const out = {};
  for (const m of block[1].matchAll(/(?:([A-Z]{2})|"([^"]+)"):\s*(\d+)/g)) {
    const key = m[1] || m[2];
    out[key] = Number(m[3]);
  }
  return out;
}

const records = parseRecords(recordsSrc);
const mensTitles = parseTitlesBlock(titlesSrc, "MENS_WORLD_CUP_TITLES");
const womensTitles = parseTitlesBlock(titlesSrc, "WOMENS_WORLD_CUP_TITLES");

assert.ok(
  helperSrc.includes("FOOTBALL_CREST_STAT_LABELS"),
  "footballCrestStats.ts must export FOOTBALL_CREST_STAT_LABELS",
);
for (const label of REQUIRED_LABELS) {
  assert.ok(
    helperSrc.includes(`"${label}"`) || helperSrc.includes(`'${label}'`),
    `FOOTBALL_CREST_STAT_LABELS missing "${label}"`,
  );
  assert.ok(
    helperSrc.includes(label),
    `footballCrestStats() must emit label "${label}"`,
  );
}
assert.ok(
  helperSrc.includes("export function withFootballCrestStats"),
  "withFootballCrestStats must remain exported",
);
assert.ok(
  helperSrc.includes("export function footballCrestStats"),
  "footballCrestStats must remain exported",
);

let missing = 0;
for (const id of crestIds) {
  const rec = records[id];
  if (!rec) {
    console.error(`missing WORLD_CUP_RECORDS entry for ${id}`);
    missing++;
    continue;
  }
  const cc = id.replace(/-football-crest$/, "").toUpperCase();
  const expectedMens = mensTitles[id] ?? mensTitles[cc] ?? 0;
  const expectedWomens = womensTitles[id] ?? womensTitles[cc] ?? 0;
  assert.equal(
    rec.mensTitles,
    expectedMens,
    `${id}: mensTitles ${rec.mensTitles} ≠ worldCupTitles ${expectedMens}`,
  );
  assert.equal(
    rec.womensTitles,
    expectedWomens,
    `${id}: womensTitles ${rec.womensTitles} ≠ worldCupTitles ${expectedWomens}`,
  );
  assert.ok(
    rec.womensAppearances <= 9,
    `${id}: womensAppearances ${rec.womensAppearances} > 9 — future tournament counted?`,
  );
}
assert.equal(missing, 0, `${missing} football crests lack WORLD_CUP_RECORDS entries`);

assert.equal(records["br-football-crest"]?.mensAppearances, 23);
assert.equal(records["br-football-crest"]?.mensTitles, 5);
assert.equal(records["us-football-crest"]?.womensTitles, 4);
assert.equal(records["us-football-crest"]?.womensAppearances, 9);
assert.equal(records["gb-eng-football-crest"]?.mensTitles, 1);
assert.equal(records["de-football-crest"]?.womensAppearances, 9);
assert.equal(records["au-football-crest"]?.womensAppearances, 8);

assert.ok(
  learnPage.includes("withFootballCrestStats"),
  "LearnPage must call withFootballCrestStats so the world-map panel shows World Cup rows",
);
assert.ok(
  details.includes("withFootballCrestStats"),
  "NationalFlagDetails must call withFootballCrestStats so the National symbols widget shows World Cup rows",
);
assert.ok(
  details.includes("flag.stats?.map") || details.includes("flag.stats.map"),
  "NationalFlagDetails must still render flag.stats — removing the map suppresses World Cup rows",
);
assert.ok(
  learnPage.includes("panelSymbol.stats"),
  "LearnPage must still render panelSymbol.stats for the world-map crest path",
);

console.log(
  `check-football-crest-stats: ${crestIds.length} crests, 4 World Cup rows each — ok`,
);
