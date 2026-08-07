// Per-era, per-polity audit worksheet for the Learn-mode historical eras.
//
// The three things each era must get right (see the "Borders between polities change
// between eras" and "Historical eras must never show an anachronistic flag" rules):
//   1. the natural world map is the SAME in every era  → guarded by
//      restore-era-geometry.mjs / check-era-landmass.mjs, not by this script;
//   2. each polity is the polity that existed at that date, under the name it bore
//      → this script's NAME / EXISTS columns;
//   3. each polity shows a flag that existed at that date → the FLAG column.
//
// Usage:
//   node scripts/audit-era-polities.mjs ad1900              → every polity, largest first
//   node scripts/audit-era-polities.mjs ad1900 --gaps       → only rows needing work
//   node scripts/audit-era-polities.mjs --summary           → one line per era
//
// FLAG column values:
//   curated:<file>   a period-legal curated image
//   modern:<CC>      the modern country's flag, allowed by FLAG_ADOPTION_YEAR
//   ruler:<name>     inherited from the era's SUBJECTO ruler, era-gated
//   OUT-OF-PERIOD    a curated image exists but its design postdates/predates the era
//   TOO-NEW:<year>   the modern flag exists but was adopted after the era
//   reason           withheld with a sourced noFlagReason (the honest outcome)
//   NONE             nothing at all — the causeless fallback line
//
// A tracking aid, not a build gate. The gates are check-historical-flag-validity.mjs,
// check-historical-flag-anachronism.mjs, check-era-anachronism.mjs and
// check-era-flag-explanations.mjs.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const {
  ERAS,
  eraYear,
  polityInfo,
  polityDisplayName,
  polityModernName,
  eraAllowsModernFlagFallback,
  noFlagIsEraSpecific,
  curatedFlagValidInEra,
  flagExistedInEra,
  eraRuler,
} = await import(R("../src/lib/historicalEras.ts"));
const { POLITY_EXISTENCE, ERA_EXTENT_CAVEATS } = await import(R("../src/data/polityExistence.ts"));
const { FLAG_ADOPTION_YEAR } = await import(R("../src/data/flagAdoptionYears.ts"));

const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const CODE_BY_NAME = new Map(
  [...selectionSrc.matchAll(/code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g)].map((m) => [
    m[2].toLowerCase(),
    m[1],
  ]),
);

/** Mirrors LearnPage's resolution order, reporting which layer answered. */
function resolveFlag(name, eraId, rulers) {
  const info = polityInfo(name, eraId);
  const allow = eraAllowsModernFlagFallback(eraId);
  let refusal = null;

  const curated = (path) => {
    if (!path) return null;
    const v = curatedFlagValidInEra(path, eraId);
    if (v.ok) return `curated:${path.replace("historical-flags/", "")}`;
    if (v.reason === "out-of-period") {
      refusal = `OUT-OF-PERIOD:${path.replace("historical-flags/", "")}(${v.window.from}–${v.window.to})`;
    } else {
      refusal = `NO-WINDOW:${path.replace("historical-flags/", "")}`;
    }
    return null;
  };
  const modern = (countryName, via) => {
    const code = CODE_BY_NAME.get(countryName.toLowerCase());
    if (!code) return null;
    if (flagExistedInEra(code, eraId)) return `${via}:${code}`;
    const year = FLAG_ADOPTION_YEAR[code];
    if (year != null) refusal = refusal ?? `TOO-NEW:${code}=${year}`;
    return null;
  };

  const own = curated(info.flag);
  if (own) return own;

  const suppressed = info.noFlag === true && (!allow || noFlagIsEraSpecific(name, eraId));
  if (!suppressed) {
    // A curated `ruler` means the polity had no flag of its own — skip the modern layer,
    // exactly as LearnPage does, so the ruler's captioned flag is what answers.
    const mn = info.ruler
      ? null
      : polityModernName(name, eraId) ?? (allow && CODE_BY_NAME.has(name.toLowerCase()) ? name : null);
    if (mn) {
      const aliasCurated = curated(polityInfo(mn, eraId).flag);
      if (aliasCurated) return aliasCurated;
      const m = modern(mn, "modern");
      if (m) return m;
    }
    const ruler = eraRuler(name, eraId, rulers.get(name));
    if (ruler) {
      const rulerCurated = curated(polityInfo(ruler, eraId).flag);
      if (rulerCurated) return `ruler:${ruler} (${rulerCurated})`;
      const m = modern(polityModernName(ruler, eraId) ?? ruler, "ruler-modern");
      if (m) return `ruler:${ruler} (${m})`;
    }
  }
  if (info.noFlagReason) return "reason";
  return refusal ?? "NONE";
}

/** Existence verdict against the sourced POLITY_EXISTENCE windows. */
function existenceVerdict(rawName, eraId) {
  const year = eraYear(eraId);
  const shown = polityDisplayName(rawName, eraId);
  const win = POLITY_EXISTENCE.get(shown) ?? POLITY_EXISTENCE.get(rawName);
  if (!win) return "unchecked";
  if (year < win.from) return `ANACHRONISM: ${shown} from ${win.from}`;
  if (year > win.to) return `ANACHRONISM: ${shown} ended ${win.to}`;
  return "ok";
}

const args = process.argv.slice(2);
const gapsOnly = args.includes("--gaps");
const summary = args.includes("--summary");
const onlyEra = args.find((a) => !a.startsWith("--"));

const summaryRows = [];

for (const era of ERAS) {
  if (!era.dataUrl) continue;
  if (onlyEra && era.id !== onlyEra) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));

  const byName = new Map();
  const rulers = new Map();
  let unnamedArea = 0;
  for (const f of geo.features) {
    const name = f.properties?.NAME;
    const ruler = f.properties?.SUBJECTO;
    let area = 0;
    try { area = geoArea(f); } catch { area = 0; }
    if (!name || !name.trim()) { unnamedArea += area; continue; }
    if (ruler && ruler !== name) rulers.set(name, ruler);
    byName.set(name, (byName.get(name) ?? 0) + area);
  }

  const total = [...byName.values()].reduce((s, v) => s + v, 0) + unnamedArea;
  const rows = [];
  for (const [raw, area] of byName) {
    const shown = polityDisplayName(raw, era.id);
    const info = polityInfo(raw, era.id);
    rows.push({
      pct: total ? (100 * area) / total : 0,
      raw,
      shown,
      flag: resolveFlag(raw, era.id, rulers),
      exists: existenceVerdict(raw, era.id),
      note: info.note ? "y" : "-",
      pop: typeof info.population === "number" ? "y" : "-",
      caveat: ERA_EXTENT_CAVEATS.get(`${era.id}|${raw}`) ? "disclosed" : "-",
    });
  }
  rows.sort((a, b) => b.pct - a.pct);

  const bad = rows.filter(
    (r) =>
      r.flag.startsWith("OUT-OF-PERIOD") ||
      r.flag.startsWith("NO-WINDOW") ||
      r.exists.startsWith("ANACHRONISM"),
  );
  const flagless = rows.filter((r) => r.flag === "NONE" || r.flag.startsWith("TOO-NEW"));

  summaryRows.push({
    era: era.id,
    year: eraYear(era.id),
    polities: rows.length,
    "wrong flag/date": bad.length,
    "no flag, no reason": rows.filter((r) => r.flag === "NONE").length,
    "flag refused, dated": rows.filter((r) => r.flag.startsWith("TOO-NEW")).length,
    "withheld w/ reason": rows.filter((r) => r.flag === "reason").length,
    "unmapped area %": total ? `${((100 * unnamedArea) / total).toFixed(0)}%` : "—",
  });

  if (summary) continue;

  const show = gapsOnly ? [...bad, ...flagless] : rows;
  console.log(`\n=== ${era.id} (${eraYear(era.id)}) — ${rows.length} polities, ${bad.length} wrong, ${flagless.length} flagless ===`);
  console.log("  area%  name                                  flag                                       existence            note pop");
  for (const r of show) {
    const nm = r.shown === r.raw ? r.shown : `${r.shown} [${r.raw}]`;
    console.log(
      `  ${r.pct.toFixed(2).padStart(5)}  ${nm.slice(0, 37).padEnd(37)} ${r.flag.slice(0, 42).padEnd(42)} ${r.exists.slice(0, 20).padEnd(20)} ${r.note}    ${r.pop}`,
    );
  }
}

if (summary || !onlyEra) {
  console.log("");
  console.table(summaryRows);
}
