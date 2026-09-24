#!/usr/bin/env node
// Country Personas — build gate (CLAUDE.md "Country Personas" hard rule).
//
//   node scripts/check-country-personas.mjs
//
// Fails the build when:
//   • a UN member or observer state has no persona entry, or an entry is malformed;
//   • a group falls outside 10–45 countries or a built type below 4 (the approved structure);
//   • a persona name, line or portrait uses a banned judgement word, a place name (names and
//     lines), an ISO-code-looking token, a Wikidata id, a URL or pipeline jargon;
//   • a portrait claim contradicts the data (the direction of the persona-vs-reference difference
//     in the snapshot) — every sentence must stay traceable to the Grand Index;
//   • a UI surface stops wiring the personas: the Group-by modes, the map colour mode and legend,
//     the fact-sheet row, the family-tree chart, or the shared hover + tap tooltip.
// Staleness of src/data/countryPersonas.ts against the frozen model is checked separately by
// `node scripts/build-country-personas.mjs --check`.
//
// Needs Node 22.18+ (imports .ts modules directly).
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { findUserFacingLeaks } from "./lib/userFacingCopy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => readFileSync(resolve(ROOT, p), "utf8");
const { COUNTRY_PERSONAS, PERSONA_GROUPS, PERSONA_TYPES } = await import("../src/data/countryPersonas.ts");
const { UN_MEMBER_CODES } = await import("../src/lib/unMemberStates.ts");
const SNAP = JSON.parse(src("scripts/data/country-persona-inputs.json"));
const PORTRAITS = JSON.parse(src("scripts/data/country-persona-portraits.json"));

const errors = [];
const err = (m) => errors.push(m);

// ── 1. Coverage and structure ────────────────────────────────────────────────
const groupCodes = new Set(PERSONA_GROUPS.map((g) => g.code));
const typeByCode = new Map(PERSONA_TYPES.map((t) => [t.code, t]));
for (const code of UN_MEMBER_CODES) {
  const p = COUNTRY_PERSONAS[code];
  if (!p) {
    err(`${code}: no persona entry (every UN member/observer needs one, even if "unclassified")`);
    continue;
  }
  if (!["built", "provisional", "unclassified"].includes(p.status)) err(`${code}: unknown status "${p.status}"`);
  if (p.status === "unclassified") continue;
  if (!groupCodes.has(p.group)) err(`${code}: unknown group "${p.group}"`);
  const t = typeByCode.get(p.type);
  if (!t) err(`${code}: unknown type "${p.type}"`);
  else if (t.group !== p.group) err(`${code}: type ${p.type} belongs to group ${t.group}, not ${p.group}`);
  if (typeof p.confidence !== "number" || p.confidence > 1) err(`${code}: missing or invalid confidence`);
}
for (const code of Object.keys(COUNTRY_PERSONAS)) if (!UN_MEMBER_CODES.has(code)) err(`${code}: persona entry for a code outside the app's 195 states`);
const count = (field, value, statuses) =>
  Object.values(COUNTRY_PERSONAS).filter((p) => statuses.includes(p.status) && p[field] === value).length;
for (const g of PERSONA_GROUPS) {
  const n = count("group", g.code, ["built", "provisional"]);
  if (n < 10 || n > 45) err(`group ${g.code}: ${n} countries (the approved structure keeps every group within 10–45)`);
  if (n !== g.size) err(`group ${g.code}: size ${g.size} but ${n} countries are assigned`);
}
for (const t of PERSONA_TYPES) {
  const n = count("type", t.code, ["built"]);
  if (n < 4) err(`type ${t.code}: ${n} built countries (minimum 4)`);
}

// ── 2. Copy lint (learner-facing names, lines and portraits) ─────────────────
const BANNED = ["poor", "developing", "developed", "third world", "backward", "failed", "failing", "rogue", "elite",
  "primitive", "civilised", "civilized", "corrupt", "dictatorship", "fragile", "western", "eastern", "northern",
  "southern", "christian", "muslim", "islamic", "catholic", "hindu", "buddhist", "arab", "african", "asian",
  "european", "latin", "anglo", "slavic", "nordic", "gulf", "caribbean", "pacific", "island", "tribal", "emerging"];
const PLACES = ["africa", "asia", "europe", "america", "americas", "oceania", "middle east", "balkan", "sahel",
  ...Object.values(SNAP.names).map((n) => n.toLowerCase())];
const has = (text, word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text);
for (const p of [...PERSONA_GROUPS, ...PERSONA_TYPES]) {
  const all = `${p.name} ${p.line} ${p.portrait}`;
  for (const w of BANNED) if (has(all, w)) err(`${p.code}: banned term "${w}" in its name, line or portrait`);
  for (const w of PLACES) if (has(`${p.name} ${p.line}`, w)) err(`${p.code}: place name "${w}" in its name or line`);
  if (/\b[A-Z]{2}\b/.test(all)) err(`${p.code}: ISO-code-looking token in "${all.match(/\b[A-Z]{2}\b/)[0]}"`);
  for (const leak of findUserFacingLeaks(all)) err(`${p.code}: ${leak.label}`);
  if (p.name.split(/\s+/).length > 6) err(`${p.code}: name "${p.name}" is longer than 6 words`);
  if (p.portrait.split(/\s+/).length > 120) err(`${p.code}: portrait is longer than 120 words`);
}

// ── 3. Portrait claims match the data ────────────────────────────────────────
const vals = (v, codes) => codes.map((c) => SNAP.values[c]?.[v]?.v).filter((x) => typeof x === "number" && Number.isFinite(x));
function zDiff(v, members, reference) {
  let ref = vals(v, reference);
  let mem = vals(v, members);
  if (ref.length < 5 || !mem.length) return NaN;
  const m = ref.reduce((a, b) => a + b, 0) / ref.length;
  const sd0 = Math.sqrt(ref.reduce((a, x) => a + (x - m) ** 2, 0) / ref.length) || 1;
  const skew = ref.reduce((a, x) => a + ((x - m) / sd0) ** 3, 0) / ref.length;
  if (Math.min(...ref) >= 0 && skew > 2) {
    ref = ref.map(Math.asinh);
    mem = mem.map(Math.asinh);
  }
  const rm = ref.reduce((a, b) => a + b, 0) / ref.length;
  const sd = Math.sqrt(ref.reduce((a, x) => a + (x - rm) ** 2, 0) / (ref.length - 1)) || 1;
  return (mem.reduce((a, b) => a + b, 0) / mem.length - rm) / sd;
}
const assigned = Object.keys(COUNTRY_PERSONAS).filter((c) => COUNTRY_PERSONAS[c].status !== "unclassified");
const membersOf = (field, code) => assigned.filter((c) => COUNTRY_PERSONAS[c][field] === code);
let claims = 0;
for (const [kind, field] of [["groups", "group"], ["types", "type"]]) {
  for (const [code, p] of Object.entries(PORTRAITS[kind])) {
    const members = membersOf(field, code);
    const parent = kind === "types" ? membersOf("group", code[0]) : assigned;
    for (const [v, sign] of p.claims) {
      claims++;
      let z = zDiff(v, members, parent);
      // A type's superlative ("lowest in the classification") is judged against the world.
      if (kind === "types" && (Number.isNaN(z) || z > 0 !== (sign === "+"))) z = zDiff(v, members, assigned);
      if (Number.isNaN(z) || z > 0 !== (sign === "+")) err(`${code}: portrait claims ${v} ${sign} but the data says z = ${z.toFixed(2)}`);
    }
    const shipped = (kind === "groups" ? PERSONA_GROUPS : PERSONA_TYPES).find((x) => x.code === code);
    if (!shipped || shipped.name !== p.name || shipped.portrait !== p.portrait) err(`${code}: shipped copy differs from the frozen portraits file`);
  }
}

// ── 4. UI wiring (a rule nothing calls enforces nothing) ─────────────────────
const wiring = [
  ["src/components/FlagGrid.tsx", ["\"persona-group\"", "\"persona-type\"", "PersonaGroupTip", "PersonaTypeTip", "personaHeading("]],
  ["src/components/EntitySummary.tsx", ["PersonaBadge"]],
  ["src/components/PersonaBadge.tsx", ["COUNTRY_PERSONAS", "PersonaTip"]],
  ["src/components/DemocracyMapControl.tsx", ["isPersonaMapMode", "PERSONA_MAP_MODE"]],
  ["src/components/DemocracyMapLegend.tsx", ["isPersonaMapMode", "PersonaTip"]],
  ["src/pages/LearnPage.tsx", ["getPersonaColorOverlay", "PersonaFamilyTree"]],
  ["src/lib/mapDataTooltip.ts", ["isPersonaMapMode"]],
  ["src/components/PersonaFamilyTree.tsx", ["PERSONA_FAMILY_TREE", "PersonaTip"]],
  ["src/components/PersonaTip.tsx", ["role=\"tooltip\"", "aria-describedby", "PERSONA_AVERAGES_NOTE"]],
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
console.log(`✓ Country Personas: ${UN_MEMBER_CODES.size} states covered, ${PERSONA_GROUPS.length} groups, ${PERSONA_TYPES.length} types, ${claims} portrait claims match the data, copy lint clean, UI wired`);
