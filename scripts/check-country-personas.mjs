#!/usr/bin/env node
// Country Personas v2 — build gate (CLAUDE.md "Country Personas" hard rule).
//
//   node scripts/check-country-personas.mjs
//
// Fails the build when:
//   • a UN member or observer state has no persona entry, or an entry is malformed;
//   • the structure leaves the owner's brief: one level of 10–30 personas, each of at least 3
//     countries, sizes matching the assignments;
//   • the shipped copy differs from the frozen copy file, or a persona name, line or description
//     uses a banned judgement word, a place name, a religion outside a sourced-share sentence,
//     an ISO-code-looking token, a Wikidata id, a URL or pipeline jargon (the shared lint in
//     scripts/lib/personaLint.mjs);
//   • a key fact is missing, or two personas share a name or a colour;
//   • a persona colour is not a valid categorical colour, or reuses the index green→red palette;
//   • a UI surface stops wiring the personas: the Group-by mode, the map colour mode and legend,
//     the fact-sheet row, the persona map, or the shared hover + tap tooltip.
// Every FIGURE in the copy (medians, member ranges, the 1-SD rule, the boundary) is re-derived
// from the snapshot by `node scripts/build-country-personas.mjs --check`, which also fails when
// src/data/countryPersonas.ts has drifted from the frozen model.
//
// Needs Node 22.18+ (imports .ts modules directly).
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { findUserFacingLeaks } from "./lib/userFacingCopy.mjs";
import { lintCopy } from "./lib/personaLint.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => readFileSync(resolve(ROOT, p), "utf8");
const { COUNTRY_PERSONAS, PERSONAS, PERSONA_MAP } = await import("../src/data/countryPersonas.ts");
const { PERSONA_COLORS } = await import("../src/lib/countryPersonas.ts");
const { INDEX_MAP_PALETTE } = await import("../src/lib/democracyColors.ts");
const { UN_MEMBER_CODES } = await import("../src/lib/unMemberStates.ts");
const SNAP = JSON.parse(src("scripts/data/country-persona-inputs.json"));
const COPY = JSON.parse(src("scripts/data/country-persona-portraits.json"));

const errors = [];
const err = (m) => errors.push(m);

// ── 1. Coverage and structure ────────────────────────────────────────────────
const codes = new Set(PERSONAS.map((p) => p.code));
if (PERSONAS.length < 10 || PERSONAS.length > 30) err(`${PERSONAS.length} personas — the owner's range is 10 to 30, one level`);
for (const code of UN_MEMBER_CODES) {
  const p = COUNTRY_PERSONAS[code];
  if (!p) {
    err(`${code}: no persona entry (every UN member/observer needs one, even if "unclassified")`);
    continue;
  }
  if (!["built", "provisional", "unclassified"].includes(p.status)) err(`${code}: unknown status "${p.status}"`);
  if (p.status === "unclassified") continue;
  if (!codes.has(p.persona)) err(`${code}: unknown persona "${p.persona}"`);
  if (!codes.has(p.secondPersona) || p.secondPersona === p.persona) err(`${code}: missing or invalid next-closest persona`);
  if (typeof p.confidence !== "number" || p.confidence < 0 || p.confidence > 1) err(`${code}: missing or invalid confidence`);
  if (!PERSONA_MAP.countries[code]) err(`${code}: not on the persona map`);
}
for (const code of Object.keys(COUNTRY_PERSONAS)) if (!UN_MEMBER_CODES.has(code)) err(`${code}: persona entry for a code outside the app's 195 states`);
for (const p of PERSONAS) {
  const n = Object.values(COUNTRY_PERSONAS).filter((c) => c.status !== "unclassified" && c.persona === p.code).length;
  if (n < 3) err(`persona ${p.code}: ${n} countries (minimum 3)`);
  if (n !== p.size) err(`persona ${p.code}: size ${p.size} but ${n} countries are assigned`);
  if (!PERSONA_MAP.personas[p.code]) err(`persona ${p.code}: not on the persona map`);
  if (!/^\d{2}$/.test(p.code)) err(`persona ${p.code}: codes are two-digit labels`);
}

// ── 2. Copy: frozen, linted, complete ────────────────────────────────────────
if (!String(COPY.status).startsWith("FROZEN")) err("scripts/data/country-persona-portraits.json is not frozen");
const names = new Set();
for (const p of PERSONAS) {
  const frozen = COPY.personas?.[p.code];
  if (!frozen || frozen.name !== p.name) err(`${p.code}: shipped name differs from the frozen copy`);
  if (frozen) for (const e of lintCopy(p.code, frozen.name, frozen.line, frozen.portrait, Object.values(SNAP.names))) err(e);
  for (const leak of findUserFacingLeaks(`${p.name} ${p.line} ${p.portrait} ${p.facts.map((f) => `${f.label} ${f.value}`).join(" ")}`)) err(`${p.code}: ${leak.label}`);
  if (/\{[^}]*\}/.test(`${p.line} ${p.portrait}`)) err(`${p.code}: an unrendered token reached the shipped copy`);
  if (p.facts.length !== 4 || p.facts.some((f) => !f.label || !f.value)) err(`${p.code}: needs four key facts, each with a value`);
  if (p.portrait.split(/\s+/).length > 90) err(`${p.code}: description is longer than 90 words`);
  if (!p.examples.length) err(`${p.code}: no example countries`);
  const lower = p.name.toLowerCase();
  if (names.has(lower)) err(`${p.code}: another persona is also called "${p.name}"`);
  names.add(lower);
}
for (const axis of PERSONA_MAP.axes) for (const e of lintCopy("map axis", "", axis, "", Object.values(SNAP.names))) err(e);

// ── 3. Colours: categorical, distinct, never the index scale ─────────────────
const colors = PERSONAS.map((p) => PERSONA_COLORS[p.code]);
if (Object.keys(PERSONA_COLORS).length !== PERSONAS.length) err(`PERSONA_COLORS has ${Object.keys(PERSONA_COLORS).length} entries for ${PERSONAS.length} personas`);
colors.forEach((c, i) => {
  if (!/^#[0-9A-F]{6}$/i.test(c ?? "")) err(`${PERSONAS[i].code}: missing or invalid colour "${c}"`);
});
if (new Set(colors.map((c) => c?.toUpperCase())).size !== colors.length) err("two personas share a colour");
const indexHexes = new Set(INDEX_MAP_PALETTE.map((c) => c.toUpperCase()));
for (const [code, c] of Object.entries(PERSONA_COLORS)) if (indexHexes.has(c.toUpperCase())) err(`${code}: colour ${c} is from the index green→red palette — personas are not ranked`);

// ── 4. UI wiring (a rule nothing calls enforces nothing) ─────────────────────
const wiring = [
  ["src/components/FlagGrid.tsx", ["persona: \"By country persona\"", "PersonaInfoTip", "personaHeading("]],
  ["src/components/EntitySummary.tsx", ["PersonaBadge", "\"Country persona\""]],
  ["src/components/PersonaBadge.tsx", ["COUNTRY_PERSONAS", "PersonaInfoTip", "isBorderline", "\"unclassified\""]],
  ["src/components/DemocracyMapControl.tsx", ["isPersonaMapMode", "PERSONA_MAP_MODE"]],
  ["src/components/DemocracyMapLegend.tsx", ["isPersonaMapMode", "PersonaInfoTip", "personaColor"]],
  ["src/pages/LearnPage.tsx", ["getPersonaColorOverlay", "PersonaMapChart"]],
  ["src/lib/mapDataTooltip.ts", ["isPersonaMapMode", "COUNTRY_PERSONAS"]],
  ["src/components/PersonaMapChart.tsx", ["PERSONA_MAP", "PersonaInfoTip", "PERSONA_AVERAGES_NOTE"]],
  ["src/components/PersonaTip.tsx", ["role=\"tooltip\"", "aria-describedby", "PERSONA_AVERAGES_NOTE", "PERSONA_FIGURES_NOTE", "keepInViewport"]],
  ["src/pages/LearnPage.css", [".persona-tip-anchor:hover .persona-tip", ".persona-tip-anchor:focus-within .persona-tip"]],
];
for (const [file, needles] of wiring) {
  let text = "";
  try {
    text = src(file);
  } catch {
    err(`${file} is missing — the personas UI wiring was removed`);
    continue;
  }
  for (const n of needles) if (!text.includes(n)) err(`${file} no longer references ${n}`);
}

if (errors.length) {
  console.error(`✗ Country Personas check failed (${errors.length}):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
const placed = Object.values(COUNTRY_PERSONAS).filter((c) => c.status !== "unclassified").length;
console.log(`✓ Country Personas: ${UN_MEMBER_CODES.size} states covered (${placed} placed), ${PERSONAS.length} personas, copy frozen and lint clean, ${colors.length} distinct colours, UI wired`);
