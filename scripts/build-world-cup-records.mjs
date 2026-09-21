/**
 * Rebuild `src/data/worldCupRecords.ts` from Wikipedia appearance tables +
 * `worldCupTitles.ts` title counts.
 *
 * Men: https://en.wikipedia.org/wiki/National_team_appearances_in_the_FIFA_World_Cup
 * Women: https://en.wikipedia.org/wiki/National_team_appearances_in_the_FIFA_Women%27s_World_Cup
 *   (women's counts come from the results matrix, years ≤ latest completed WC —
 *   Wikipedia's "Total"/"Part" columns sometimes count future qualifications.)
 *
 * Run: node scripts/build-world-cup-records.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const MEN_URL =
  "https://en.wikipedia.org/api/rest_v1/page/html/National_team_appearances_in_the_FIFA_World_Cup";
const WOMEN_URL =
  "https://en.wikipedia.org/api/rest_v1/page/html/National_team_appearances_in_the_FIFA_Women%27s_World_Cup";
/** Latest completed women's World Cup year — bump after each tournament. */
const WOMEN_THROUGH_YEAR = 2023;

const sources = JSON.parse(
  fs.readFileSync(path.join(root, "scripts/data/national-flag-sources.json"), "utf8"),
);
const crestIds = new Set();
for (const c of Object.values(sources.countries)) {
  for (const f of c.flags ?? []) {
    if (f.category === "footballcrest") crestIds.add(f.id);
  }
}

const countrySelection = fs.readFileSync(
  path.join(root, "src/lib/countrySelection.ts"),
  "utf8",
);
const members = Object.fromEntries(
  [...countrySelection.matchAll(/code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g)].map(
    (m) => [m[1], m[2]],
  ),
);

const nameToCrest = new Map();
for (const [code, name] of Object.entries(members)) {
  const id = `${code.toLowerCase()}-football-crest`;
  if (!crestIds.has(id)) continue;
  nameToCrest.set(name.toLowerCase(), id);
  nameToCrest.set(name.toLowerCase().replace(/’/g, "'"), id);
}

const ALIASES = {
  "united states": "us-football-crest",
  usa: "us-football-crest",
  "south korea": "kr-football-crest",
  "korea republic": "kr-football-crest",
  "north korea": "kp-football-crest",
  "korea dpr": "kp-football-crest",
  "ivory coast": "ci-football-crest",
  "côte d'ivoire": "ci-football-crest",
  "cote d'ivoire": "ci-football-crest",
  "republic of ireland": "ie-football-crest",
  ireland: "ie-football-crest",
  "czech republic": "cz-football-crest",
  czechia: "cz-football-crest",
  russia: "ru-football-crest",
  iran: "ir-football-crest",
  china: "cn-football-crest",
  "china pr": "cn-football-crest",
  "chinese taipei": "tw-football-crest",
  taiwan: "tw-football-crest",
  "hong kong": "hk-football-crest",
  macau: "mo-football-crest",
  macao: "mo-football-crest",
  "faroe islands": "fo-football-crest",
  gibraltar: "gi-football-crest",
  kosovo: "xk-football-crest",
  england: "gb-eng-football-crest",
  scotland: "gb-sct-football-crest",
  wales: "gb-wls-football-crest",
  "northern ireland": "gb-nir-football-crest",
  "bosnia and herzegovina": "ba-football-crest",
  "north macedonia": "mk-football-crest",
  "congo dr": "cd-football-crest",
  "dr congo": "cd-football-crest",
  "democratic republic of the congo": "cd-football-crest",
  "congo (drc)": "cd-football-crest",
  congo: "cg-football-crest",
  "republic of the congo": "cg-football-crest",
  "cape verde": "cv-football-crest",
  "cabo verde": "cv-football-crest",
  tanzania: "tz-football-crest",
  vietnam: "vn-football-crest",
  syria: "sy-football-crest",
  venezuela: "ve-football-crest",
  bolivia: "bo-football-crest",
  brunei: "bn-football-crest",
  laos: "la-football-crest",
  moldova: "md-football-crest",
  eswatini: "sz-football-crest",
  "timor-leste": "tl-football-crest",
  "east timor": "tl-football-crest",
  zaire: "cd-football-crest",
  tahiti: "pf-football-crest",
  "new caledonia": "nc-football-crest",
  "american samoa": "as-football-crest",
  guam: "gu-football-crest",
  "puerto rico": "pr-football-crest",
  "u.s. virgin islands": "vi-football-crest",
  "us virgin islands": "vi-football-crest",
  "united states virgin islands": "vi-football-crest",
  "british virgin islands": "vg-football-crest",
  "cayman islands": "ky-football-crest",
  "turks and caicos islands": "tc-football-crest",
  anguilla: "ai-football-crest",
  montserrat: "ms-football-crest",
  bermuda: "bm-football-crest",
  aruba: "aw-football-crest",
  curaçao: "cw-football-crest",
  curacao: "cw-football-crest",
  "cook islands": "ck-football-crest",
  türkiye: "tr-football-crest",
  turkey: "tr-football-crest",
  slovakia: "sk-football-crest",
  sweden: "se-football-crest",
  australia: "au-football-crest",
  canada: "ca-football-crest",
  "new zealand": "nz-football-crest",
  "sao tome and principe": "st-football-crest",
  "são tomé and príncipe": "st-football-crest",
};
for (const [k, v] of Object.entries(ALIASES)) nameToCrest.set(k, v);

function teamShort(name) {
  let n = name.replace(/\s*\(page does not exist\)\s*$/, "").trim();
  const pats = [
    /^(.+?) men's national (?:soccer|football) team$/i,
    /^(.+?) women's national (?:soccer|football) team$/i,
    /^(.+?) national men's (?:soccer|football) team$/i,
    /^(.+?) national women's (?:soccer|football) team$/i,
    /^(.+?) national (?:soccer|football) team$/i,
  ];
  for (const p of pats) {
    const m = n.match(p);
    if (m) return m[1].trim();
  }
  n = n.replace(/\s+men's$/i, "").replace(/\s+women's$/i, "");
  return n.trim();
}

function resolve(team) {
  const key = team.toLowerCase().trim().replace(/’/g, "'");
  return nameToCrest.get(key) ?? nameToCrest.get(key.replace(/^the\s+/, ""));
}

/** Minimal HTML table extractor for MediaWiki REST HTML. */
function extractTables(html) {
  const tables = [];
  const re = /<table\b[^>]*class="[^"]*wikitable[^"]*"[^>]*>([\s\S]*?)<\/table>/gi;
  let m;
  while ((m = re.exec(html))) {
    const body = m[1];
    const rows = [];
    const trRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
    let tr;
    while ((tr = trRe.exec(body))) {
      const cells = [];
      const cellRe = /<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi;
      let cell;
      while ((cell = cellRe.exec(tr[1]))) {
        const inner = cell[2];
        const links = [...inner.matchAll(/title="([^"]+)"/g)].map((x) => x[1]);
        const text = inner
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/\s+/g, " ")
          .trim();
        cells.push({ text, links });
      }
      if (cells.length) rows.push(cells);
    }
    if (rows.length) tables.push(rows);
  }
  return tables;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "HanasFlagGame/1.0 (world-cup-records build)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function parseMen(html) {
  const out = new Map();
  for (const t of extractTables(html)) {
    const hdr = t[0].map((c) => c.text.toLowerCase());
    if (hdr[0] !== "team" || !hdr[1]?.includes("appear")) continue;
    for (const row of t.slice(1)) {
      const link = row[0].links[0] || row[0].text;
      const short = teamShort(link);
      const n = parseInt(row[1].text, 10);
      if (!Number.isFinite(n)) continue;
      const id = resolve(short);
      if (id) out.set(id, n);
      else if (short.toLowerCase() !== "east germany") {
        console.warn(`men: unmatched team ${short}`);
      }
    }
    break;
  }
  return out;
}

function parseWomen(html) {
  const out = new Map();
  for (const t of extractTables(html)) {
    const hdr = t[0].map((c) => c.text);
    if (hdr[0] !== "Team") continue;
    const yearIdxs = hdr
      .map((h, i) => {
        const m = /^(\d{4})/.exec(h);
        return m && Number(m[1]) <= WOMEN_THROUGH_YEAR ? i : -1;
      })
      .filter((i) => i >= 0);
    if (yearIdxs.length < 5) continue;
    for (const row of t.slice(1)) {
      const link = row[0].links[0] || row[0].text;
      const short = teamShort(link);
      if (short === "Team") continue;
      let n = 0;
      for (const i of yearIdxs) {
        if (i >= row.length) continue;
        const cell = row[i].text.trim();
        if (["×", "•", "—", "–", "", "TBD", "q"].includes(cell)) continue;
        if (cell) n++;
      }
      if (n === 0) continue;
      const id = resolve(short);
      if (id) out.set(id, n);
      else console.warn(`women: unmatched team ${short}`);
    }
    break;
  }
  return out;
}

const { MENS_WORLD_CUP_TITLES, WOMENS_WORLD_CUP_TITLES } = await import(
  pathToFileURL(path.join(root, "src/data/worldCupTitles.ts")).href
);

function titleFor(map, crestId) {
  if (crestId in map) return map[crestId];
  const cc = crestId.replace(/-football-crest$/, "").toUpperCase();
  return map[cc] ?? 0;
}

const menHtml = await fetchHtml(MEN_URL);
const womenHtml = await fetchHtml(WOMEN_URL);
const men = parseMen(menHtml);
const women = parseWomen(womenHtml);

const records = {};
for (const id of [...crestIds].sort()) {
  records[id] = {
    mensAppearances: men.get(id) ?? 0,
    mensTitles: titleFor(MENS_WORLD_CUP_TITLES, id),
    womensAppearances: women.get(id) ?? 0,
    womensTitles: titleFor(WOMENS_WORLD_CUP_TITLES, id),
  };
}

if (records["br-football-crest"].mensAppearances !== 23) {
  throw new Error(
    `sanity: Brazil mens appearances = ${records["br-football-crest"].mensAppearances}, expected 23`,
  );
}
if (records["us-football-crest"].womensAppearances !== 9) {
  throw new Error(
    `sanity: US womens appearances = ${records["us-football-crest"].womensAppearances}, expected 9`,
  );
}

const lines = Object.entries(records).map(
  ([id, r]) =>
    `  "${id}": { mensAppearances: ${r.mensAppearances}, mensTitles: ${r.mensTitles}, womensAppearances: ${r.womensAppearances}, womensTitles: ${r.womensTitles} },`,
);

const out = `/**
 * FIFA World Cup appearances (participations) and titles per football-
 * association crest id — shown in the Learn-mode information panel whenever
 * a football-association crest is displayed.
 *
 * HARD RULE (CLAUDE.md "Football association World Cup records"): these rows
 * MUST render next to the crest. Never drop them from the panel, and never
 * ship a crest without a record (zeros are honest for associations that have
 * not yet qualified or won).
 *
 * Appearances — sourced from Wikipedia's national-team appearance tables
 * (men through the 2026 tournament; women through the ${WOMEN_THROUGH_YEAR} tournament —
 * future/qualified-only cells are NOT counted):
 *   https://en.wikipedia.org/wiki/National_team_appearances_in_the_FIFA_World_Cup
 *   https://en.wikipedia.org/wiki/National_team_appearances_in_the_FIFA_Women%27s_World_Cup
 * Titles — from \`worldCupTitles.ts\` (same sourced counts the Football-crests
 * grid groupings use).
 *
 * Re-generate: \`node scripts/build-world-cup-records.mjs\`
 * Keyed by crest id (\`br-football-crest\`, \`gb-eng-football-crest\`, …).
 */

export type WorldCupRecord = {
  readonly mensAppearances: number;
  readonly mensTitles: number;
  readonly womensAppearances: number;
  readonly womensTitles: number;
};

/** Auto-generated body — do not hand-edit; re-run the build script. */
export const WORLD_CUP_RECORDS: Readonly<Record<string, WorldCupRecord>> = {
${lines.join("\n")}
};
`;

fs.writeFileSync(path.join(root, "src/data/worldCupRecords.ts"), out);
console.log(
  `wrote ${crestIds.size} records (men with apps: ${men.size}, women with apps: ${women.size})`,
);
