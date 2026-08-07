// Guards the Learn-mode historical eras against a MISLEADING "why there is no flag"
// explanation.
//
// Reported 2026-08 with a screenshot: selecting Germany on the 1938 map showed
//
//     "No flag image — this polity predates modern flag design or none survives."
//
// under a note that itself described the flag Germany flew. Nazi Germany plainly HAD
// a national flag; the app declines to display it, which is a decision about US, not a
// fact about 1938. The panel had exactly ONE line for every flagless polity, so it
// asserted the antiquity reason for all of them — the 1938 Netherlands, the Kingdom of
// Hawaii ("its flag combined the Union Jack with eight stripes"), the Orange Free
// State, Nazi Germany. `PolityInfo.noFlag` records only THAT a flag is withheld, never
// why, so the panel had to guess.
//
// The fix has two halves, and this check protects both:
//
//   A. The generic fallback must state ONLY what is certainly true — that no period
//      flag is bundled — and must never assert a historical cause. If the old
//      "predates modern flag design" phrasing (or any variant naming a cause) comes
//      back as the default, that is a regression.
//   B. Any DELIBERATE suppression (`noFlag: true`) that actually withholds a flag in
//      an era from 1880 on must carry a curated `noFlagReason`. 1880 is the floor
//      because from then on essentially every polity on these maps is a state with a
//      documented flag history, so "no flag" always has a specific, checkable reason —
//      it flew something we do not bundle, or it flew its ruler's, or the design we
//      have postdates the era.
//
// It does NOT require a reason for a polity that simply has no registry entry: that is
// missing data, not a claim, and the neutral fallback line covers it honestly.
//
// Run: node scripts/check-era-flag-explanations.mjs   (part of npm run flags:check)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const mod = await import(R("../src/lib/historicalEras.ts"));
const {
  ERAS,
  POLITY_REGISTRY,
  polityInfo,
  polityModernName,
  eraAllowsModernFlagFallback,
  flagExistedInEra,
  noFlagIsEraSpecific,
  eraYear,
} = mod;
const { FLAG_ADOPTION_YEAR } = await import(R("../src/data/flagAdoptionYears.ts"));

/** Eras from this year on must explain every deliberate suppression. */
const EXPLANATION_FLOOR_YEAR = 1880;

const failures = [];

// ── A. the panel's fallback line must not assert a cause ────────────────────
const learnPage = readFileSync(R("../src/pages/LearnPage.tsx"), "utf8");
if (!learnPage.includes("noFlagReason")) {
  failures.push(
    "src/pages/LearnPage.tsx no longer renders noFlagReason — every flagless polity " +
      "would fall back to the generic line again",
  );
}
// The phrases below each assert a REASON. They are fine inside a curated
// noFlagReason (historicalEras.ts) — and in the comments that explain this rule —
// never as text the component renders. Comments are stripped before scanning.
const learnPageCode = learnPage
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .split("\n")
  .map((l) => l.replace(/(^|\s)\/\/.*$/, "$1"))
  .join("\n");
for (const phrase of ["predates modern flag design", "none survives"]) {
  if (learnPageCode.includes(phrase)) {
    failures.push(
      `src/pages/LearnPage.tsx contains "${phrase}" — the no-flag fallback must state ` +
        "only that no period flag is bundled, never why. Put the reason in " +
        "PolityInfo.noFlagReason instead.",
    );
  }
}

// ── B. every deliberate suppression from 1880 on needs a reason ─────────────
const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const modernNames = new Set(
  [...selectionSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()),
);
const codeByName = new Map(
  [...selectionSrc.matchAll(/code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g)].map((m) => [
    m[2].toLowerCase(),
    m[1],
  ]),
);

/**
 * Mirrors LearnPage's flag resolution closely enough to know what the panel shows:
 * "flag" (an image renders), "dated" (no flag, but the adoption-year gate refused a
 * modern one and the panel prints the dated explanation), or "blank".
 */
function panelOutcome(name, eraId, rulers) {
  const info = polityInfo(name, eraId);
  if (info.flag) return "flag";
  let refusedAsTooNew = false;
  const allow = eraAllowsModernFlagFallback(eraId);
  const eraLegal = (modernName) => {
    const code = codeByName.get(modernName.toLowerCase());
    if (code == null) return false;
    if (flagExistedInEra(code, eraId)) return true;
    if (FLAG_ADOPTION_YEAR[code] != null) refusedAsTooNew = true;
    return false;
  };
  const suppressed = info.noFlag === true && (!allow || noFlagIsEraSpecific(name, eraId));
  if (!suppressed) {
    const modernName =
      polityModernName(name, eraId) ?? (allow && modernNames.has(name.toLowerCase()) ? name : null);
    if (modernName) {
      if (polityInfo(modernName, eraId).flag) return "flag";
      if (eraLegal(modernName)) return "flag";
    }
    const ruler = rulers.get(name);
    if (ruler && ruler !== name) {
      if (polityInfo(ruler, eraId).flag) return "flag";
      if (eraLegal(polityModernName(ruler, eraId) ?? ruler)) return "flag";
    }
  }
  return refusedAsTooNew ? "dated" : "blank";
}

const explained = [];
for (const era of ERAS) {
  if (!era.dataUrl) continue;
  if (eraYear(era.id) < EXPLANATION_FLOOR_YEAR) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));
  const names = new Set();
  const rulers = new Map();
  for (const f of geo.features) {
    const name = f.properties?.NAME;
    const ruler = f.properties?.SUBJECTO;
    if (!name) continue;
    names.add(name);
    if (ruler && ruler !== name) rulers.set(name, ruler);
  }
  for (const name of [...names].sort()) {
    const info = polityInfo(name, era.id);
    if (info.noFlag !== true) continue;
    // "dated" already explains itself ("X's modern flag was only adopted in YYYY").
    if (panelOutcome(name, era.id, rulers) !== "blank") continue;
    if (info.noFlagReason) {
      explained.push(`${era.id}  ${name}`);
      continue;
    }
    failures.push(
      `${era.id} "${name}" withholds its flag (noFlag: true) with no noFlagReason — ` +
        "the panel would fall back to the generic line. Say what actually flew, and why " +
        "it is not shown, in historicalEras.ts.",
    );
  }
}

// ── C. a reason must be a real sentence, not a placeholder ──────────────────
const seenReasons = new Set();
for (const [name, info] of POLITY_REGISTRY) {
  if (info.noFlagReason) seenReasons.add(`registry|${name}|${info.noFlagReason}`);
}
for (const era of ERAS) {
  for (const [name, info] of mod.ERA_OVERRIDES?.get?.(era.id) ?? []) {
    if (info.noFlagReason) seenReasons.add(`${era.id}|${name}|${info.noFlagReason}`);
  }
}
for (const entry of seenReasons) {
  const reason = entry.slice(entry.indexOf("|", entry.indexOf("|") + 1) + 1);
  if (reason.trim().length < 30) {
    failures.push(`noFlagReason for ${entry.split("|").slice(0, 2).join(" ")} is too short to explain anything`);
  }
}

// ── D. no duplicate registry keys ───────────────────────────────────────────
// POLITY_REGISTRY is built from an array of pairs, so a repeated key silently keeps
// only the LAST one and the other entry becomes dead code. This is not cosmetic: a
// second "Tibet" written for the medieval period shadowed the 20th-century entry, so
// the 1914 map described de-facto-independent Tibet as the Phagmodrupa dynasty, and
// bulk "Variant/alternate listing of …" stubs shadowed better-written notes. A
// duplicate can never be intentional — era-specific text belongs in ERA_OVERRIDES.
const registrySrc = readFileSync(R("../src/lib/historicalEras.ts"), "utf8").split("\n");
const regStart = registrySrc.findIndex((l) => l.includes("export const POLITY_REGISTRY"));
const regEnd = registrySrc.findIndex((l, i) => i > regStart && l.startsWith("]);"));
const keyLines = new Map();
for (let i = regStart; i < regEnd; i++) {
  const m = registrySrc[i].match(/^\s*\["([^"]+)",\s*\{/);
  if (!m) continue;
  const lines = keyLines.get(m[1]) ?? [];
  lines.push(i + 1);
  keyLines.set(m[1], lines);
}
for (const [key, lines] of keyLines) {
  if (lines.length > 1) {
    failures.push(
      `POLITY_REGISTRY has ${lines.length} entries for "${key}" (lines ${lines.join(", ")}) — ` +
        "only the last survives and the rest are dead. Merge them, or move the " +
        "era-specific one into ERA_OVERRIDES.",
    );
  }
}

// ── D2. no duplicate keys inside one ERA_OVERRIDES era map ──────────────────
// Each era's overrides are built from an array of pairs too, so the same shadowing bug
// applies WITHIN an era: a second ["France", …] in the ad1500 map silently wins and the
// first becomes dead code. Found during the 2026-08 era audit, when a corrected ad1500
// France entry had no effect because a later duplicate re-asserted the wrong flag.
{
  const eraStart = registrySrc.findIndex((l) => l.includes("const ERA_OVERRIDES"));
  const eraEnd = registrySrc.findIndex((l, i) => i > eraStart && l.startsWith("]);"));
  let currentEra = null;
  let seen = new Map();
  const flush = () => {
    if (!currentEra) return;
    for (const [key, lines] of seen) {
      if (lines.length > 1) {
        failures.push(
          `ERA_OVERRIDES["${currentEra}"] has ${lines.length} entries for "${key}" (lines ${lines.join(", ")}) — ` +
            "only the last survives, so the others are dead code. Merge them into one entry.",
        );
      }
    }
  };
  for (let i = eraStart; i < eraEnd; i++) {
    const eraLine = registrySrc[i].match(/^\s*\["(\w+)",\s*new Map<string, PolityInfo>\(\[/);
    if (eraLine) {
      flush();
      currentEra = eraLine[1];
      seen = new Map();
      continue;
    }
    const m = registrySrc[i].match(/^\s*\["([^"]+)",\s*\{/);
    if (!m || !currentEra) continue;
    const lines = seen.get(m[1]) ?? [];
    lines.push(i + 1);
    seen.set(m[1], lines);
  }
  flush();
}

console.log(
  `Era flag explanations — ${explained.length} deliberate suppressions from ` +
    `${EXPLANATION_FLOOR_YEAR} on, each with a curated reason:`,
);
for (const line of explained) console.log(`  ${line}`);

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n✓ every withheld flag from 1880 on explains itself");
