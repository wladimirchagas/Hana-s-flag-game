#!/usr/bin/env node
/**
 * Enforce universal Learn-mode index / ranking labelling.
 *
 * Every democracy / governance index label across the app MUST come from
 * DEMOCRACY_INDEX_META via getDemocracyIndexLabel() / formatDemocracyIndexLabel():
 *   `{name}, {year} ({publisher})`
 *
 * Fails when:
 *   - a DEMOCRACY_INDEX_KEYS entry lacks meta (or vice versa)
 *   - `name` contains "Global" (coverage is already global)
 *   - year / publisher / theme are missing or malformed
 *   - the label format drifts from `{name}, {year} ({publisher})`
 *   - meta.year disagrees with the bundled COUNTRY_FACTS edition year
 *   - menu groups do not cover every key, or within-group order is not A–Z by name
 *   - UI surfaces stop calling getDemocracyIndexLabel / getDemocracyIndexMenuGroups
 *   - hand-written "Global … Index" strings reappear in src/
 *
 * Run: node scripts/check-index-labels.mjs
 * Needs Node 22.18+ — imports democracyColors.ts / countryFacts.ts directly.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const COLORS_TS = resolve(ROOT, "src/lib/democracyColors.ts");

const {
  COUNTRY_FACTS,
} = await import("../src/data/countryFacts.ts");
const {
  DEMOCRACY_INDEX_KEYS,
  DEMOCRACY_INDEX_META,
  DEMOCRACY_INDEX_THEME_GROUPS,
  formatDemocracyIndexLabel,
  getDemocracyIndexLabel,
  getDemocracyIndexMenuGroups,
} = await import("../src/lib/democracyColors.ts");

const errors = [];

const FACT_FIELD = {
  "freedom-house": "freedomHouse",
  "v-dem": "vDem",
  economist: "economist",
  cpi: "cpi",
  perception: "perception",
  "rsf-press": "rsfPress",
  hdi: "hdi",
  "gender-gap": "genderGap",
  gpi: "gpi",
  happiness: "happiness",
  "soft-power": "softPower",
  gdi: "gdi",
  "wjp-rule-of-law": "wjpRuleOfLaw",
  "imd-competitiveness": "imdCompetitiveness",
  etr: "etr",
  "digital-news": "digitalNews",
  gti: "gti",
};

function factsYearFor(key) {
  const field = FACT_FIELD[key];
  const counts = new Map();
  for (const facts of Object.values(COUNTRY_FACTS)) {
    const y = facts.democracy?.[field]?.year;
    if (typeof y === "number") counts.set(y, (counts.get(y) || 0) + 1);
  }
  let best = null;
  let bestN = 0;
  for (const [y, n] of counts) {
    if (n > bestN) {
      best = y;
      bestN = n;
    }
  }
  return best;
}

// Coverage: keys ↔ meta
for (const key of DEMOCRACY_INDEX_KEYS) {
  if (!DEMOCRACY_INDEX_META[key]) {
    errors.push(`DEMOCRACY_INDEX_KEYS has "${key}" with no DEMOCRACY_INDEX_META row`);
  }
}
for (const key of Object.keys(DEMOCRACY_INDEX_META)) {
  if (!DEMOCRACY_INDEX_KEYS.includes(key)) {
    errors.push(`DEMOCRACY_INDEX_META has "${key}" which is not in DEMOCRACY_INDEX_KEYS`);
  }
}

const themeIds = new Set(DEMOCRACY_INDEX_THEME_GROUPS.map((g) => g.id));
if (DEMOCRACY_INDEX_THEME_GROUPS.length < 2) {
  errors.push("DEMOCRACY_INDEX_THEME_GROUPS must define at least two thematic groups");
}

for (const key of DEMOCRACY_INDEX_KEYS) {
  const meta = DEMOCRACY_INDEX_META[key];
  if (!meta) continue;

  if (meta.key !== key) {
    errors.push(`${key}: meta.key must equal the record key (got "${meta.key}")`);
  }
  if (!meta.name || typeof meta.name !== "string") {
    errors.push(`${key}: name is required`);
  } else {
    if (/\bglobal\b/i.test(meta.name)) {
      errors.push(
        `${key}: name "${meta.name}" must not contain "Global" — drop it; coverage is already global`,
      );
    }
    if (meta.name !== meta.name.trim() || /\s{2,}/.test(meta.name)) {
      errors.push(`${key}: name has stray whitespace`);
    }
  }
  if (!Number.isInteger(meta.year) || meta.year < 1990 || meta.year > 2100) {
    errors.push(`${key}: year must be a plausible edition year (got ${meta.year})`);
  }
  if (!meta.publisher || meta.publisher.length < 2) {
    errors.push(`${key}: publisher is required`);
  }
  if (!themeIds.has(meta.theme)) {
    errors.push(`${key}: theme "${meta.theme}" is not in DEMOCRACY_INDEX_THEME_GROUPS`);
  }

  const expected = formatDemocracyIndexLabel(meta);
  const got = getDemocracyIndexLabel(key);
  if (got !== expected) {
    errors.push(`${key}: getDemocracyIndexLabel drifted (got "${got}", expected "${expected}")`);
  }
  const formatOk = new RegExp(
    `^${escapeRe(meta.name)}, ${meta.year} \\(${escapeRe(meta.publisher)}\\)$`,
  ).test(got);
  if (!formatOk) {
    errors.push(
      `${key}: label must be "{name}, {year} ({publisher})" — got "${got}"`,
    );
  }

  const factsYear = factsYearFor(key);
  if (factsYear == null) {
    errors.push(`${key}: no COUNTRY_FACTS rows carry a year for this index`);
  } else if (factsYear !== meta.year) {
    errors.push(
      `${key}: meta.year is ${meta.year} but COUNTRY_FACTS edition year is ${factsYear} — update the registry when refreshing data`,
    );
  }
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Menu groups: cover every key, A–Z within each theme
const menuGroups = getDemocracyIndexMenuGroups();
const seenInMenu = new Set();
for (const group of menuGroups) {
  const names = group.indexes.map((m) => m.name);
  const sorted = [...names].sort((a, b) => a.localeCompare(b, "en"));
  if (names.join("\0") !== sorted.join("\0")) {
    errors.push(
      `theme "${group.theme.id}" is not sorted alphabetically by name (got ${names.join(", ")})`,
    );
  }
  for (const m of group.indexes) {
    if (seenInMenu.has(m.key)) {
      errors.push(`index "${m.key}" appears in more than one menu group`);
    }
    seenInMenu.add(m.key);
    if (m.theme !== group.theme.id) {
      errors.push(`index "${m.key}" listed under "${group.theme.id}" but meta.theme is "${m.theme}"`);
    }
  }
}
for (const key of DEMOCRACY_INDEX_KEYS) {
  if (!seenInMenu.has(key)) {
    errors.push(`index "${key}" is missing from getDemocracyIndexMenuGroups()`);
  }
}

// UI wiring — components must call the shared helpers, not hand-roll labels
const UI_REQUIRE = [
  ["src/components/DemocracyMapControl.tsx", ["getDemocracyIndexLabel", "getDemocracyIndexMenuGroups"]],
  ["src/components/DemocracyIndexChart.tsx", ["getDemocracyIndexLabel", "getDemocracyIndexMenuGroups"]],
  ["src/components/DemocracyMapLegend.tsx", ["getDemocracyLegendTitle"]],
  ["src/components/EntitySummary.tsx", ["getDemocracyIndexLabel", "getDemocracyIndexMenuGroups"]],
  ["src/components/FlagGrid.tsx", ["getDemocracyIndexLabel", "getDemocracyIndexMenuGroups"]],
  ["src/lib/chartAxes.ts", ["getDemocracyIndexLabel"]],
];

for (const [rel, needles] of UI_REQUIRE) {
  const src = readFileSync(resolve(ROOT, rel), "utf8");
  for (const needle of needles) {
    if (!src.includes(needle)) {
      errors.push(`${rel} must call ${needle} — index labels are centralised`);
    }
  }
}

// democracyColors must keep the label builder wired through the meta table
const colorsSrc = readFileSync(COLORS_TS, "utf8");
for (const needle of [
  "DEMOCRACY_INDEX_META",
  "formatDemocracyIndexLabel",
  "getDemocracyIndexMenuGroups",
  "DEMOCRACY_INDEX_THEME_GROUPS",
]) {
  if (!colorsSrc.includes(`export ${needle.includes("function") ? "function" : ""}`.trim()) &&
      !colorsSrc.includes(needle)) {
    errors.push(`democracyColors.ts is missing ${needle}`);
  }
}
if (!/export function getDemocracyIndexLabel[\s\S]*formatDemocracyIndexLabel\(DEMOCRACY_INDEX_META/.test(colorsSrc)) {
  errors.push(
    "getDemocracyIndexLabel must return formatDemocracyIndexLabel(DEMOCRACY_INDEX_META[key])",
  );
}

// Forbid hand-written "Global … Index" user-facing strings outside comments in src/
const FORBIDDEN = [
  /Global Peace Index/,
  /Global Gender Gap Index/,
  /Global Soft Power Index/,
  /Global Diplomacy Index/,
  /Global Terrorism Index/,
];

function walkTsx(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === "dist") continue;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkTsx(p, out);
    else if (/\.(tsx?|jsx?)$/.test(ent.name)) out.push(p);
  }
  return out;
}

for (const file of walkTsx(resolve(ROOT, "src"))) {
  // Meta table itself may mention "Global" only in comments describing the
  // dropped word — the name field is checked above. Skip the registry file's
  // comment blocks by scanning only string literals that look like labels.
  if (file.endsWith("democracyColors.ts")) continue;
  const text = readFileSync(file, "utf8");
  // Strip line + block comments so comment mentions of the old names don't fail.
  const code = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  for (const re of FORBIDDEN) {
    if (re.test(code)) {
      errors.push(
        `${file.replace(ROOT + "/", "")}: still contains "${re.source}" — use getDemocracyIndexLabel()`,
      );
    }
  }
}

if (errors.length) {
  console.error("✗ Index label check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log(
  `Index label check OK — ${DEMOCRACY_INDEX_KEYS.length} indexes, ${menuGroups.length} theme groups, format "{name}, {year} ({publisher})".`,
);
