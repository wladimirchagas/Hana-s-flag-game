#!/usr/bin/env node
// Country Personas v2 — owner-review tooling.
//
//   node scripts/country-personas/review.mjs --worksheet   writer's worksheet (per persona: its
//                                                          distinctive features that EVERY member
//                                                          shares within 1 world SD, rendered)
//   node scripts/country-personas/review.mjs               renders the draft names/descriptions,
//                                                          lints them, writes the owner-review doc
//
// Reads the research build's draft outputs (scripts/data/country-personas-model.draft.json,
// scripts/data/country-personas-profile.json) and the draft copy
// (scripts/data/country-persona-portraits.draft.json). Every figure in a description is a token
// rendered by scripts/lib/personaText.mjs — the same renderer the app's generator uses.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderTemplate, formatRange, formatValue } from "../lib/personaText.mjs";
import { findUserFacingLeaks } from "../lib/userFacingCopy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), "utf8"));
const MODEL = read("scripts/data/country-personas-model.draft.json");
const PROFILE = read("scripts/data/country-personas-profile.json");
const SNAP = read("scripts/data/country-persona-inputs.json");
const VARS = SNAP.variables;
const NAMES = SNAP.names;
const COPY_FILE = "scripts/data/country-persona-portraits.draft.json";

// Names and one-line descriptions: no value judgements, no places, no religions or ethnicities.
export const BANNED = ["poor", "developing", "developed", "third world", "backward", "failed", "failing", "rogue", "elite",
  "primitive", "civilised", "civilized", "corrupt", "dictatorship", "fragile", "western", "eastern", "northern",
  "southern", "christian", "muslim", "islamic", "catholic", "hindu", "buddhist", "jewish", "arab", "african", "asian",
  "european", "latin", "anglo", "slavic", "nordic", "gulf", "caribbean", "pacific", "island", "tribal", "emerging"];
const PLACES = ["africa", "asia", "europe", "america", "americas", "oceania", "middle east", "balkan", "sahel",
  ...Object.values(NAMES).map((n) => n.toLowerCase())];
const has = (text, word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text);
const RELIGION_WORDS = ["christian", "christians", "muslim", "muslims", "hindu", "hindus", "buddhist", "buddhists", "jewish", "jews"];

export function lintCopy(code, name, line, portrait) {
  const errs = [];
  for (const w of BANNED) if (has(`${name} ${line}`, w)) errs.push(`${code}: banned term "${w}" in its name or line`);
  for (const w of PLACES) if (has(`${name} ${line}`, w)) errs.push(`${code}: place name "${w}" in its name or line`);
  for (const w of BANNED.filter((b) => !RELIGION_WORDS.includes(b))) if (has(portrait, w)) errs.push(`${code}: banned term "${w}" in its description`);
  // a religion may be named in a description only in a sentence that quotes its Pew share
  for (const sentence of portrait.split(/(?<=[.!?])\s+/)) {
    if (RELIGION_WORDS.some((w) => has(sentence, w)) && !/\{(range|median|min|max):rel_/.test(sentence)) {
      errs.push(`${code}: a religion is named without its sourced share ("${sentence.slice(0, 60)}…")`);
    }
  }
  const all = `${name} ${line} ${portrait}`.replace(/\{[^}]+\}/g, "");
  if (/\b[A-Z]{2}\b/.test(all)) errs.push(`${code}: ISO-code-looking token "${all.match(/\b[A-Z]{2}\b/)[0]}"`);
  for (const leak of findUserFacingLeaks(all)) errs.push(`${code}: ${leak.label}`);
  if (name.split(/\s+/).length > 6) errs.push(`${code}: name longer than 6 words`);
  return errs;
}

const personas = MODEL.personas;
const surveyed = (p) => p.members.filter((c) => MODEL.assignments[c]?.surveyed).length;

if (process.argv.includes("--worksheet")) {
  const out = ["# Writer's worksheet — distinctive features every member shares (within 1 world SD)", ""];
  for (const p of personas) {
    const prof = PROFILE.personas[p.code];
    out.push(`## ${p.code} (${p.size}; surveyed ${surveyed(p)}; stability ${p.stability})`, "", p.members.map((c) => NAMES[c]).join(", "), "");
    const rows = Object.entries(prof).filter(([v, r]) => r.claimable && "z" in r && !v.startsWith("core:") && !v.startsWith("count_"))
      .sort((a, b) => Math.abs(b[1].z) - Math.abs(a[1].z)).slice(0, 18);
    for (const [v, r] of rows) {
      out.push(`- ${r.z > 0 ? "▲" : "▼"} ${v} (${VARS[v]?.label ?? v}): ${formatRange(v, VARS[v], r.min, r.max)}, median ${formatValue(v, VARS[v], r.median)} [z ${r.z}, n ${r.n}]`);
    }
    const bins = Object.entries(prof).filter(([, r]) => r.claimable && "share" in r).map(([v, r]) => `${r.share === 1 ? "all" : "none"}: ${v}`);
    if (bins.length) out.push(`- binary: ${bins.join("; ")}`);
    const cats = Object.entries(prof).filter(([, r]) => r.allShare).map(([v, r]) => `${v}=${r.allShare}`);
    if (cats.length) out.push(`- every member: ${cats.join("; ")}`);
    const core = Object.fromEntries(Object.entries(prof).filter(([v]) => v.startsWith("core:")).map(([v, r]) => [v.slice(5), `${r.median.toFixed(2)} [${r.min.toFixed(2)}, ${r.max.toFixed(2)}]`]));
    out.push(`- core (world SD units): ${JSON.stringify(core)}`, "");
  }
  const path = resolve(ROOT, "docs/country-personas/WORKSHEET.md");
  writeFileSync(path, out.join("\n") + "\n");
  console.log(`✓ wrote docs/country-personas/WORKSHEET.md (${personas.length} personas)`);
  process.exit(0);
}

if (!existsSync(resolve(ROOT, COPY_FILE))) {
  console.error(`✗ ${COPY_FILE} not found — write the draft names and descriptions first`);
  process.exit(1);
}
const COPY = read(COPY_FILE);
const errors = [];
const doc = ["# Country Personas v2 — draft for owner review", "",
  `_Generated by \`scripts/country-personas/review.mjs\` from the research build (${MODEL.snapshot.generated}). ` +
  "Every figure is the persona's median or the range across its members, and is shown only when EVERY member sits within 1 world standard deviation of the median._", ""];
for (const p of personas) {
  const c = COPY.personas?.[p.code];
  if (!c) {
    errors.push(`${p.code}: no draft copy`);
    continue;
  }
  const ctx = { size: p.size, surveyed: surveyed(p) };
  const prof = PROFILE.personas[p.code];
  const r1 = renderTemplate(c.line, prof, VARS, ctx);
  const r2 = renderTemplate(c.portrait, prof, VARS, ctx);
  errors.push(...r1.errors.map((e) => `${p.code} line: ${e}`), ...r2.errors.map((e) => `${p.code} description: ${e}`));
  errors.push(...lintCopy(p.code, c.name, c.line, c.portrait));
  const exceptions = p.members.filter((m) => MODEL.assignments[m].exceptions?.length);
  doc.push(`## ${p.code} · ${c.name}`, "", `*${r1.text}*`, "", r2.text, "",
    `**${p.size} countries:** ${p.members.map((m) => NAMES[m]).join(", ")}`, "",
    `Stability ${p.stability.toFixed(2)} · surveyed by the World Values Survey: ${ctx.surveyed} of ${p.size}` +
    (exceptions.length ? ` · exceptions: ${exceptions.map((m) => NAMES[m]).join(", ")}` : ""), "");
}
writeFileSync(resolve(ROOT, "docs/country-personas/PERSONAS_DRAFT.md"), doc.join("\n") + "\n");
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ docs/country-personas/PERSONAS_DRAFT.md — ${personas.length} personas; every figure quotable, copy lint clean`);
