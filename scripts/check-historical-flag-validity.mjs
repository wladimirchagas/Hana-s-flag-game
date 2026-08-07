// Build gate: every CURATED historical flag the era maps show must be period-legal.
//
// `check-historical-flag-anachronism.mjs` guards the MODERN-flag borrows (layers 2–5 of
// LearnPage's resolution). This script guards layer 1 — the curated
// `PolityInfo.flag` image — which was ungated until 2026-08 and therefore showed one
// image in EVERY era whose GeoJSON carried the polity's NAME. See
// src/data/historicalFlagValidity.ts for the measured damage that caused.
//
// It fails the build on any of:
//   1. a `flag:` path in historicalEras.ts with NO file on disk (a dangling reference
//      renders a broken image; four shipped this way — Milan, Belgium, the German
//      colonies and Poland 1919);
//   2. a referenced flag path with no window in HISTORICAL_FLAG_VALIDITY (unwindowed is
//      unchecked, and unchecked is how the anachronisms shipped);
//   3. any (era, polity) pair whose curated flag would render outside its window;
//   4. a colony carrying its RULER's flag on its own entry, which loses the caption;
//   5. the gate no longer being called from LearnPage / historicalEras.
//
// Run: node scripts/check-historical-flag-validity.mjs   (npm run eras:check-validity)

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const {
  ERAS,
  eraYear,
  polityInfo,
  polityModernName,
  polityDisplayName,
  eraAllowsModernFlagFallback,
  noFlagIsEraSpecific,
  curatedFlagValidInEra,
  eraRuler,
  curatedRulerFor,
} = await import(R("../src/lib/historicalEras.ts"));
const { HISTORICAL_FLAG_VALIDITY } = await import(R("../src/data/historicalFlagValidity.ts"));

const failures = [];
const warnings = [];

/* ------------------------------------------------------------------ 1 + 2 */
const erasSrc = readFileSync(R("../src/lib/historicalEras.ts"), "utf8");
const referenced = [...new Set([...erasSrc.matchAll(/flag:\s*"([^"]+)"/g)].map((m) => m[1]))];

for (const path of referenced) {
  if (!existsSync(R(`../public/${path}`))) {
    failures.push(
      `DANGLING: flag "${path}" is referenced in historicalEras.ts but no file exists at public/${path} — it renders as a broken image.`,
    );
    continue;
  }
  if (!HISTORICAL_FLAG_VALIDITY.has(path)) {
    failures.push(
      `NO WINDOW: flag "${path}" has no entry in HISTORICAL_FLAG_VALIDITY — add a sourced from/to window (an unwindowed curated flag is refused in every era, so the panel silently loses it).`,
    );
  }
}

for (const path of HISTORICAL_FLAG_VALIDITY.keys()) {
  if (!existsSync(R(`../public/${path}`))) {
    failures.push(`MISSING FILE: HISTORICAL_FLAG_VALIDITY names "${path}", which is not bundled.`);
  }
}

/* ---------------------------------------------------------------------- 3 */
// Mirrors the curated-flag half of LearnPage's resolution: layer 1 (own entry), then
// layer 2/3's curated alias, then layer 5's curated ruler flag.
const violations = [];
const accepted = [];

for (const era of ERAS) {
  if (!era.dataUrl) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));
  const rulers = new Map();
  const names = new Set();
  for (const f of geo.features) {
    const name = f.properties?.NAME;
    if (!name || !name.trim()) continue;
    names.add(name);
    const ruler = f.properties?.SUBJECTO;
    if (ruler && ruler !== name) rulers.set(name, ruler);
  }

  for (const name of names) {
    const info = polityInfo(name, era.id);
    const allow = eraAllowsModernFlagFallback(era.id);
    const suppressed = info.noFlag === true && (!allow || noFlagIsEraSpecific(name, era.id));

    /** Candidate curated paths, in the order LearnPage would try them. */
    const candidates = [];
    if (info.flag) candidates.push([info.flag, "own entry"]);
    if (!info.flag && !suppressed) {
      const modern = curatedRulerFor(name, era.id) ? null : polityModernName(name, era.id);
      if (modern) {
        const aliasFlag = polityInfo(modern, era.id).flag;
        if (aliasFlag) candidates.push([aliasFlag, `alias → ${modern}`]);
      }
      // eraRuler() applies the curated `ruler` and refuses a SUBJECTO the dataset gets
      // wrong for this date — reading rulers.get() raw would report a flag the app never
      // shows (1920 Georgia/Azerbaijan are recorded as USSR subjects two years early).
      const ruler = eraRuler(name, era.id, rulers.get(name));
      if (ruler) {
        const rulerFlag = polityInfo(ruler, era.id).flag;
        if (rulerFlag) candidates.push([rulerFlag, `ruler → ${ruler}`]);
      }
    }

    for (const [path, via] of candidates) {
      const verdict = curatedFlagValidInEra(path, era.id);
      const shown = polityDisplayName(name, era.id);
      if (verdict.ok) {
        accepted.push(`${era.id}  ${shown}  ${path}${via === "own entry" ? "" : `  (${via})`}`);
      } else if (verdict.reason === "out-of-period") {
        violations.push({
          era: era.id,
          eraYear: eraYear(era.id),
          name: shown,
          raw: name,
          path,
          via,
          window: verdict.window,
        });
      }
      // A "no-window" candidate is already reported by check 2 above.
    }
  }
}

/* ------------------------------------------------------------------- 3b */
// A colony must never carry its RULER's flag on its own entry. The flag is then resolved by
// layer 1, so `flagIsRulers` is never set and the panel shows it with NO caption — which
// says the flag was the colony's own. That is what PolityInfo.ruler / ERA_RULER exist to
// prevent, and the 2026-08-07 name pass found eight entries still doing it (New France,
// the Viceroyalty of Peru, 1880 Mozambique, Italian Libya, Somaliland and Ethiopia).
for (const era of ERAS) {
  if (!era.dataUrl) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));
  const rulers = new Map();
  const names = new Set();
  for (const f of geo.features) {
    const name = f.properties?.NAME;
    if (!name || !name.trim()) continue;
    names.add(name);
    const ruler = f.properties?.SUBJECTO;
    if (ruler && ruler !== name) rulers.set(name, ruler);
  }
  for (const name of names) {
    const info = polityInfo(name, era.id);
    if (!info.flag || !curatedFlagValidInEra(info.flag, era.id).ok) continue;
    const ruler = eraRuler(name, era.id, rulers.get(name));
    if (!ruler || ruler === name) continue;
    if (polityInfo(ruler, era.id).flag !== info.flag) continue;
    failures.push(
      `UNCAPTIONED INHERITED FLAG: ${era.id} "${polityDisplayName(name, era.id)}" carries ` +
        `${info.flag} on its OWN entry, which is ${ruler}'s flag. Drop the flag from the entry and ` +
        `let the ruler layer supply it, so the panel captions it "Flew the flag of ${ruler}".`,
    );
  }
}

/* ---------------------------------------------------------------------- 4 */
const learnSrc = readFileSync(R("../src/pages/LearnPage.tsx"), "utf8");
if (!learnSrc.includes("curatedFlagValidInEra")) {
  failures.push(
    "GATE REMOVED: LearnPage.tsx no longer calls curatedFlagValidInEra() — layer 1 of the flag resolution is ungated again.",
  );
}
if (!learnSrc.includes("flagOutOfPeriod")) {
  failures.push(
    "EXPLANATION REMOVED: LearnPage.tsx no longer renders flagOutOfPeriod — a refused curated flag would fall back to the causeless line.",
  );
}
if (!erasSrc.includes("curatedFlagVerdict")) {
  failures.push(
    "GATE REMOVED: historicalEras.ts no longer delegates to curatedFlagVerdict() from historicalFlagValidity.ts.",
  );
}

/* ------------------------------------------------------------------ report */
const unusedWindows = [...HISTORICAL_FLAG_VALIDITY.keys()].filter(
  (p) => !referenced.includes(p),
);
if (unusedWindows.length > 0) {
  warnings.push(
    `${unusedWindows.length} windowed flag(s) are not referenced by any registry entry: ${unusedWindows.join(", ")}`,
  );
}

console.log(
  `Curated historical-flag validity: ${referenced.length} referenced flag file(s), ` +
    `${HISTORICAL_FLAG_VALIDITY.size} sourced window(s), ${accepted.length} period-legal (era, polity) pair(s).`,
);

if (violations.length > 0) {
  console.log(`\n${violations.length} anachronistic curated flag(s):`);
  violations.sort((a, b) => a.eraYear - b.eraYear || a.name.localeCompare(b.name));
  for (const v of violations) {
    console.log(
      `  ✗ ${v.era} (${v.eraYear}): "${v.name}" would show ${v.path} — flown ${v.window.from}–${v.window.to}` +
        `${v.via === "own entry" ? "" : ` [${v.via}]`}`,
    );
  }
}
for (const w of warnings) console.log(`\nnote: ${w}`);

if (violations.length > 0) {
  failures.push(
    `${violations.length} (era, polity) pair(s) would render a curated flag outside its sourced window. ` +
      `Fix the DATA — bundle the polity's own period flag, or withhold it with a sourced noFlagReason in ERA_OVERRIDES. ` +
      `Never widen a window to make this pass.`,
  );
}

if (failures.length > 0) {
  console.error(`\n✗ curated historical-flag validity check FAILED\n`);
  for (const f of failures) console.error(`  • ${f}`);
  process.exit(1);
}

console.log("\n✓ every curated historical flag is period-legal in every era that shows it.");
