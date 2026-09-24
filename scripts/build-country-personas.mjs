#!/usr/bin/env node
// Country Personas v2 — verifier and generator (CLAUDE.md "Country Personas" hard rule).
//
//   node scripts/build-country-personas.mjs           writes src/data/countryPersonas.ts
//   node scripts/build-country-personas.mjs --check   fails if that file is stale
//
// Reads only committed, reviewed inputs:
//   scripts/data/country-personas-model.json      the FROZEN model (edition 2026, version 2)
//   scripts/data/country-persona-portraits.json   the FROZEN names, lines and description templates
//   scripts/data/country-persona-inputs.json      the dated, sourced input snapshot
//
// Personas are a frozen PARTITION found by the research build's constrained search
// (scripts/country-personas/build.py), so this script does not re-cluster. It re-derives, from the
// snapshot alone, everything the app shows and every rule the owner set, and FAILS on any
// disagreement:
//   1. every country's four core values (development, demography, governance, values) are
//      recomputed with the model's stored constants and must match the model;
//   2. THE BOUNDARY: every member lies within `tau` (1 world SD) of its persona's median on every
//      core dimension it is observed on (the owner's rule, 2026-09-24);
//   3. every figure in a description is re-rendered from the snapshot (median and member range)
//      and is allowed only if every observed member lies within 1 world SD of the median; every
//      plain-text claim carries a token that checks it against the data; the copy lint passes.
//
// No numeric dependencies; plain Node. Never hand-edit the generated file.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderTemplate, formatRange, worldPercentiles } from "./lib/personaText.mjs";
import { lintCopy, incomeClaimErrors } from "./lib/personaLint.mjs";
import { findUserFacingLeaks } from "./lib/userFacingCopy.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), "utf8"));
const MODEL = read("scripts/data/country-personas-model.json");
const COPY = read("scripts/data/country-persona-portraits.json");
const SNAP = read("scripts/data/country-persona-inputs.json");
const OUT = resolve(ROOT, "src/data/countryPersonas.ts");
const CHECK = process.argv.includes("--check");
const errors = [];
const fail = (msg) => errors.push(msg);

for (const [file, doc] of [["country-personas-model.json", MODEL], ["country-persona-portraits.json", COPY]]) {
  if (!String(doc.status).startsWith("FROZEN") || !doc.frozenFrom?.sha256) {
    console.error(`✗ scripts/data/${file} is not a frozen edition (status FROZEN with the sha256 it was frozen from)`);
    process.exit(1);
  }
}
if (MODEL.version !== 2) {
  console.error("✗ scripts/data/country-personas-model.json is not a version 2 model");
  process.exit(1);
}

// ── Snapshot access and transforms (mirror scripts/country-personas/build.py) ──
const U = SNAP.universe;
const raw = (code, v) => {
  if (v === "tourism_per_person") return raw(code, "wb_tourist_arrivals") / raw(code, "wb_population");
  if (v.endsWith("_hellinger")) return Math.sqrt(Math.max(0, raw(code, v.slice(0, -"_hellinger".length))) / 100);
  const x = SNAP.values[code]?.[v]?.v;
  return typeof x === "number" && Number.isFinite(x) ? x : NaN;
};
const transform = (x, how) => {
  if (Number.isNaN(x)) return NaN;
  if (how === "log") return x > 0 ? Math.log(x) : NaN;
  if (how === "log1p") return Math.log1p(Math.max(0, x));
  if (how === "asinh") return Math.asinh(x);
  return x;
};
function yeoJohnson(x, l) {
  if (Number.isNaN(x)) return NaN;
  if (x >= 0) return Math.abs(l) < 1e-12 ? Math.log1p(x) : ((x + 1) ** l - 1) / l;
  return Math.abs(l - 2) < 1e-12 ? -Math.log1p(-x) : -(((1 - x) ** (2 - l) - 1) / (2 - l));
}
function indicatorZ(code, meta) {
  let x = transform(raw(code, meta.var), meta.transform);
  if (Number.isNaN(x) && meta.fallback) {
    const fb = transform(raw(code, meta.fallback.var), meta.transform);
    if (!Number.isNaN(fb)) x = meta.fallback.slope * fb + meta.fallback.intercept;
  }
  if (Number.isNaN(x)) return NaN;
  if (meta.yeoJohnsonLambda !== undefined) x = yeoJohnson(x, meta.yeoJohnsonLambda);
  const z = (meta.sign * (x - meta.median)) / meta.sd;
  return Math.max(-4, Math.min(4, z));
}
const DOMAIN_META = Object.fromEntries(MODEL.pillars.flatMap((p) => p.domains.map((d) => [d.key, d])));
function domainMean(code, d, minObs) {
  const zs = DOMAIN_META[d].indicators.map((m) => indicatorZ(code, m)).filter((z) => !Number.isNaN(z));
  return zs.length >= minObs ? zs.reduce((a, b) => a + b, 0) / zs.length : NaN;
}
function coreValue(code, c) {
  let s;
  if (c.kind === "mean") s = domainMean(code, c.from[0], c.minObserved);
  else {
    const parts = c.parts.map((p) => (domainMean(code, p.domain, c.kind === "mean_of_domains" ? 1 : c.minObserved) - p.median) / p.sd);
    if (c.kind === "mean_of_domains_all" && parts.some(Number.isNaN)) s = NaN;
    else {
      const ok = parts.filter((x) => !Number.isNaN(x));
      s = ok.length ? ok.reduce((a, b) => a + b, 0) / ok.length : NaN;
    }
  }
  return Number.isNaN(s) ? NaN : (s - c.median) / c.sd;
}
const median = (xs) => {
  const v = [...xs].sort((a, b) => a - b);
  const n = v.length;
  return n ? (v[(n - 1) >> 1] + v[n >> 1]) / 2 : NaN;
};

// ── 1. Core values match the model; 2. the boundary holds ────────────────────
const TAU = MODEL.rules.tau;
const personaOf = {};
for (const p of MODEL.personas) for (const c of p.members) personaOf[c] = p.code;
for (const c of U) {
  const a = MODEL.assignments[c];
  if (!a) fail(`${c}: no assignment in the model`);
  else if (a.status !== "unclassified") {
    if (personaOf[c] !== a.persona) fail(`${c}: assignment ${a.persona} disagrees with persona membership ${personaOf[c]}`);
    for (const core of MODEL.core) {
      const v = coreValue(c, core);
      const stored = a.core?.[core.key];
      if ((stored === null) !== Number.isNaN(v) || (stored !== null && Math.abs(v - stored) > 1e-5)) {
        fail(`${c}: core ${core.key} recomputes to ${Number.isNaN(v) ? "missing" : v.toFixed(6)} but the model says ${stored}`);
      }
    }
    if (!MODEL.familyMap.countries[c]) fail(`${c}: no position on the persona map`);
  } else if (personaOf[c]) fail(`${c}: unclassified but listed as a member of ${personaOf[c]}`);
}
for (const p of MODEL.personas) {
  for (const core of MODEL.core) {
    const vals = p.members.map((c) => [c, MODEL.assignments[c].core[core.key]]).filter(([, v]) => v !== null);
    const med = median(vals.map(([, v]) => v));
    for (const [c, v] of vals) {
      const outside = Math.abs(v - med) > TAU + 1e-9;
      const declared = MODEL.assignments[c].exceptions?.includes(core.key);
      if (outside && !declared) fail(`${p.code}: ${SNAP.names[c]} is ${(v - med).toFixed(2)} SD from the persona median on ${core.key} (limit ${TAU}) — the boundary is broken`);
      if (!outside && declared) fail(`${p.code}: ${SNAP.names[c]} is recorded as an exception on ${core.key} but sits inside the boundary`);
    }
  }
  if (p.size !== p.members.length) fail(`${p.code}: size ${p.size} but ${p.members.length} members`);
  if (p.size < MODEL.rules.minSize) fail(`${p.code}: ${p.size} countries (minimum ${MODEL.rules.minSize})`);
  if (!MODEL.familyMap.personas[p.code]) fail(`${p.code}: no position on the persona map`);
}
const K = MODEL.personas.length;
if (K < 10 || K > 30) fail(`${K} personas — the owner's range is 10 to 30`);

// ── 3. Descriptions: re-derive every figure from the snapshot ────────────────
const PLACED = U.filter((c) => MODEL.assignments[c]?.status !== "unclassified");
function skewness(xs) {
  const n = xs.length;
  const m = xs.reduce((a, b) => a + b, 0) / n;
  const m2 = xs.reduce((a, x) => a + (x - m) ** 2, 0) / n;
  const m3 = xs.reduce((a, x) => a + (x - m) ** 3, 0) / n;
  return m3 / m2 ** 1.5;
}
const sdOf = (xs) => {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
};
const SCALE = {};
function scaleOf(v) {
  if (SCALE[v]) return SCALE[v];
  const w = PLACED.map((c) => raw(c, v)).filter((x) => !Number.isNaN(x));
  // asinh for a heavily right-skewed non-negative variable, exactly as build.py decides it
  const asinh = w.length > 5 && Math.min(...w) >= 0 && skewness(w) > 1.5;
  const f = asinh ? Math.asinh : (x) => x;
  return (SCALE[v] = { f, sd: sdOf(w.map(f)), n: w.length });
}
function personaProfile(members, vars) {
  const prof = {};
  for (const v of vars) {
    const meta = SNAP.variables[v];
    if (!meta) continue;
    if (meta.kind === "category") {
      const xs = members.map((c) => SNAP.values[c]?.[v]?.v).filter((x) => x !== undefined && x !== null);
      const levels = {};
      for (const x of xs) levels[x] = (levels[x] ?? 0) + 1;
      prof[v] = { n: xs.length, levels };
      continue;
    }
    const xs = members.map((c) => raw(c, v)).filter((x) => !Number.isNaN(x));
    if (!xs.length) continue;
    if (meta.kind === "binary") {
      prof[v] = { n: xs.length, share: xs.reduce((a, b) => a + b, 0) / xs.length };
      continue;
    }
    const { f, sd, n } = scaleOf(v);
    if (n < 20 || !(sd > 0)) continue;
    const fx = xs.map(f);
    const mf = median(fx);
    const homogeneous = fx.every((x) => Math.abs(x - mf) <= TAU * sd + 1e-12);
    prof[v] = { n: xs.length, median: median(xs), min: Math.min(...xs), max: Math.max(...xs), quotable: homogeneous && (xs.length === members.length || xs.length >= 3) };
  }
  return prof;
}
// every variable any token names — {op:var}, {op:a|b}, {every:var=…}, {under:var=…}, {world:var>…}
const TOKEN_VARS = /\{(?:range|between|median|min|max|n|all|none|every|under|over|world):([a-zA-Z0-9_|]+)/g;
const worldPct = worldPercentiles(SNAP.values);
const popTotal = U.reduce((a, c) => a + (raw(c, "wb_population") || 0), 0);
const personas = MODEL.personas.map((p) => {
  const copy = COPY.personas?.[p.code];
  if (!copy) {
    fail(`${p.code}: no name and description in the frozen copy`);
    return null;
  }
  const vars = new Set([...`${copy.line} ${copy.portrait}`.matchAll(TOKEN_VARS)].flatMap((m) => m[1].split("|")));
  for (const f of copy.facts ?? []) vars.add(f.var);
  const prof = personaProfile(p.members, vars);
  const ctx = {
    size: p.size, surveyed: p.members.filter((c) => MODEL.assignments[c].surveyed).length,
    worldPct, members: p.members, values: SNAP.values,
  };
  const line = renderTemplate(copy.line, prof, SNAP.variables, ctx);
  const portrait = renderTemplate(copy.portrait, prof, SNAP.variables, ctx);
  for (const e of [...line.errors, ...portrait.errors]) fail(`${p.code}: ${e}`);
  for (const e of lintCopy(p.code, copy.name, copy.line, copy.portrait, Object.values(SNAP.names))) fail(e);
  for (const leak of findUserFacingLeaks(`${copy.name} ${line.text} ${portrait.text}`)) fail(`${p.code}: ${leak.label}`);
  for (const e of incomeClaimErrors(p.code, `${copy.name}. ${line.text} ${portrait.text}`, p.members.map((c) => SNAP.values[c]?.wb_income_group?.v))) fail(e);
  const facts = (copy.facts ?? []).map((f) => {
    const r = prof[f.var];
    if (!r?.quotable) fail(`${p.code}: key fact ${f.var} is not quotable (a member lies more than ${TAU} SD from the median)`);
    else if (r.n !== p.size) fail(`${p.code}: key fact ${f.var} covers ${r.n} of ${p.size} members — a key fact must cover every member`);
    return { label: f.label, value: r ? formatRange(f.var, SNAP.variables[f.var], r.min, r.max) : "" };
  });
  if (facts.length !== 4) fail(`${p.code}: ${facts.length} key facts (4 expected)`);
  const pop = p.members.reduce((a, c) => a + (raw(c, "wb_population") || 0), 0);
  return {
    code: p.code, name: copy.name, line: line.text, portrait: portrait.text, size: p.size,
    worldPopulationShare: Math.round((pop / popTotal) * 10000) / 10000,
    examples: p.typical.map((c) => SNAP.names[c]), facts,
  };
});
const names = personas.filter(Boolean).map((p) => p.name.toLowerCase());
if (new Set(names).size !== names.length) fail("two personas share a name");
for (const axis of COPY.mapAxes ?? []) {
  for (const e of lintCopy("map axis", "", axis, "", Object.values(SNAP.names))) fail(e);
}
if ((COPY.mapAxes ?? []).length !== 2) fail("the frozen copy needs two map-axis labels");
if (errors.length) {
  console.error(`✗ Country Personas v2: ${errors.length} problem(s)\n  ${errors.slice(0, 40).join("\n  ")}`);
  process.exit(1);
}

// ── Write ────────────────────────────────────────────────────────────────────
const js = (v) => JSON.stringify(v);
const countryRows = U.map((c) => {
  const a = MODEL.assignments[c];
  if (a.status === "unclassified") return `  ${c}: { status: "unclassified" },`;
  const bits = [`status: ${js(a.status)}`, `persona: ${js(a.persona)}`, `secondPersona: ${js(a.secondPersona)}`, `confidence: ${a.confidence}`];
  if (a.exceptions?.length) bits.push(`exceptions: ${js(a.exceptions)}`);
  return `  ${c}: { ${bits.join(", ")} },`;
});
const map = MODEL.familyMap;
const body = `// AUTO-GENERATED by scripts/build-country-personas.mjs — do not edit by hand.
// Re-run: node scripts/build-country-personas.mjs
//
// Country Personas, edition ${COPY.edition} (version 2): the UN member and observer states in ${K}
// personas, one level. The partition was found by the research build
// (scripts/country-personas/build.py) and is frozen in scripts/data/country-personas-model.json;
// names and descriptions are frozen in scripts/data/country-persona-portraits.json.
//
// Every member sits within ${TAU} world standard deviation of its persona's median on the four core
// dimensions (development, demography, governance, values). Every figure in a description is the
// persona's median or member range, re-derived here from the snapshot, and appears only where
// every member lies within ${TAU} world SD of the median.
// Method: docs/COUNTRY_PERSONAS_PLAYBOOK.md; decisions: docs/COUNTRY_PERSONAS_LEDGER.md.
//
// A persona describes a country's national averages, never the people who live there.

export type PersonaStatus = "built" | "provisional" | "unclassified";

export type Persona = {
  /** Two-digit code — a label, not a rank. */
  readonly code: string;
  readonly name: string;
  /** One neutral sentence. */
  readonly line: string;
  /** Description; every figure is a median or a member range. */
  readonly portrait: string;
  readonly size: number;
  /** Share of the world's population living in this persona's countries (0–1). */
  readonly worldPopulationShare: number;
  /** The persona's most typical members. */
  readonly examples: readonly string[];
  /** Key facts, each a range every member falls within. */
  readonly facts: readonly { readonly label: string; readonly value: string }[];
};

export type CountryPersona = {
  readonly status: PersonaStatus;
  readonly persona?: string;
  /** The next-closest persona. */
  readonly secondPersona?: string;
  /** 0–1: 1 − (mean distance to its own persona ÷ mean distance to the next); near 0 = between two. */
  readonly confidence?: number;
  /** Core dimensions on which this member sits outside the 1-SD boundary (normally none). */
  readonly exceptions?: readonly string[];
};

export const PERSONA_EDITION = ${js(COPY.edition)};

export const PERSONAS: readonly Persona[] = [
${personas.map((p) => `  ${js(p)},`).join("\n")}
];

export const COUNTRY_PERSONAS: Readonly<Record<string, CountryPersona>> = {
${countryRows.join("\n")}
};

/** The persona map: countries placed so that similar ones sit close together (classical
 *  multidimensional scaling of the persona similarity). */
export const PERSONA_MAP: {
  readonly explainedVariance: readonly [number, number];
  readonly axes: readonly [string, string];
  readonly countries: Readonly<Record<string, readonly [number, number]>>;
  readonly personas: Readonly<Record<string, readonly [number, number]>>;
} = {
  explainedVariance: ${js(map.explainedVariance)},
  axes: ${js(COPY.mapAxes)},
  countries: ${js(map.countries)},
  personas: ${js(map.personas)},
};
`;
if (CHECK) {
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {}
  if (current !== body) {
    console.error("✗ src/data/countryPersonas.ts is stale or hand-edited — run node scripts/build-country-personas.mjs");
    process.exit(1);
  }
  console.log(`✓ countryPersonas.ts matches the frozen model: ${PLACED.length} countries' core values recomputed, the ${TAU}-SD boundary holds for all ${K} personas, every quoted figure re-derived`);
} else {
  writeFileSync(OUT, body);
  console.log(`✓ wrote src/data/countryPersonas.ts — ${K} personas, ${PLACED.length} countries placed`);
}
