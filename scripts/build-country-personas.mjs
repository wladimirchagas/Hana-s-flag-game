#!/usr/bin/env node
// Country Personas — deterministic scorer and generator (playbook step 15).
//
//   node scripts/build-country-personas.mjs           writes src/data/countryPersonas.ts
//   node scripts/build-country-personas.mjs --check   fails if that file is stale
//
// Reads only committed, reviewed inputs:
//   scripts/data/country-personas-model.json       the FROZEN model (owner-approved edition)
//   scripts/data/country-persona-portraits.json     the FROZEN names, lines and pen portraits
//   scripts/data/country-persona-inputs.json        the dated, sourced input snapshot
//   scripts/data/country-personas-grand-index.json  group/type sizes, population shares, examples
//
// It RE-SCORES every country from the snapshot using the model's stored constants (transforms,
// medians, inter-decile ranges, domain means/SDs, the age-structure residual, weights and
// centroids): nearest group centroid, then nearest type centroid inside that group, with a
// partial distance over observed domains for a provisional country. Because the research build
// verified that this rule reproduces every built assignment, the scorer must agree with the
// frozen model exactly: it FAILS on any group, type or status that differs. When the snapshot is
// refreshed (new index editions), the same run re-scores every country against the frozen
// model, which is the playbook's "re-score often, rebuild rarely".
//
// No numeric dependencies; plain Node. Never hand-edit the generated file.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), "utf8"));
const MODEL = read("scripts/data/country-personas-model.json");
const PORTRAITS = read("scripts/data/country-persona-portraits.json");
const SNAP = read("scripts/data/country-persona-inputs.json");
const GRAND = read("scripts/data/country-personas-grand-index.json");
const OUT = resolve(ROOT, "src/data/countryPersonas.ts");
const CHECK = process.argv.includes("--check");

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

// ── Scoring, mirroring scripts/country-personas/build.py exactly ─────────────
const raw = (code, v) => {
  const x = SNAP.values[code]?.[v]?.v;
  return typeof x === "number" && Number.isFinite(x) ? x : NaN;
};
const transform = (x, how) => (how === "log" ? (x > 0 ? Math.log(x) : NaN) : how === "asinh" ? Math.asinh(x) : x);
function yeoJohnson(x, l) {
  if (Number.isNaN(x)) return NaN;
  if (x >= 0) return l === 0 ? Math.log1p(x) : ((x + 1) ** l - 1) / l;
  return l === 2 ? -Math.log1p(-x) : -(((1 - x) ** (2 - l) - 1) / (2 - l));
}
function indicatorZ(code, ind) {
  let x = transform(raw(code, ind.var), ind.transform);
  if (ind.yeoJohnsonLambda !== undefined) x = yeoJohnson(x, ind.yeoJohnsonLambda);
  let z = (ind.sign * (x - ind.median)) / ind.interDecileRange;
  if (Number.isNaN(z) && ind.fallback) z = indicatorZ(code, { ...ind.fallback, sign: ind.sign });
  return z;
}
const mean = (xs) => {
  const ok = xs.filter((x) => !Number.isNaN(x));
  return ok.length ? ok.reduce((a, b) => a + b, 0) / ok.length : NaN;
};
function domainScores(code) {
  const rawScores = Object.fromEntries(MODEL.domains.map((d) => [d.key, mean(d.indicators.map((i) => indicatorZ(code, i)))]));
  for (const d of MODEL.domains) {
    if (d.residual) {
      const y = rawScores[d.key];
      const x = rawScores[d.residualOn];
      rawScores[d.key] = Number.isNaN(y) || Number.isNaN(x) ? NaN : y - (d.residual.intercept + d.residual.slope * x);
    }
  }
  return MODEL.domains.map((d) => (rawScores[d.key] - d.mean) / d.sd);
}

const W = MODEL.domains.map((d) => d.weight);
const W2SUM = W.reduce((a, w) => a + w * w, 0);
const GROUPS = Object.keys(MODEL.structure.groupCentroidsWeighted).sort();
const TYPES = Object.keys(MODEL.structure.typeCentroidsWeighted).sort();
const C_G = MODEL.structure.groupCentroidsWeighted;
const C_T = MODEL.structure.typeCentroidsWeighted;
const TYPE_GROUP = MODEL.structure.typeGroup;

function nearestTwo(dist) {
  const order = Object.entries(dist).sort((a, b) => a[1] - b[1]);
  return [order[0], order[1] ?? null];
}
function classify(z) {
  const ok = z.map((v) => !Number.isNaN(v));
  const scale = W2SUM / W.reduce((a, w, j) => a + (ok[j] ? w * w : 0), 0);
  const dist = (c) => Math.sqrt(z.reduce((a, v, j) => (ok[j] ? a + (c[j] - v * W[j]) ** 2 : a), 0) * scale);
  const [[g, dg], second] = nearestTwo(Object.fromEntries(GROUPS.map((k) => [k, dist(C_G[k])])));
  const out = { group: g, confidence: +(1 - dg / second[1]).toFixed(3), secondGroup: second[0] };
  const inGroup = TYPES.filter((t) => TYPE_GROUP[t] === g);
  const [[t, dt], t2] = nearestTwo(Object.fromEntries(inGroup.map((k) => [k, dist(C_T[k])])));
  out.type = t;
  if (t2) out.typeConfidence = +(1 - dt / t2[1]).toFixed(3);
  return out;
}

const personas = {};
const mismatches = [];
for (const code of SNAP.universe) {
  const z = domainScores(code);
  const share = W.reduce((a, w, j) => a + (Number.isNaN(z[j]) ? 0 : w), 0) / W.reduce((a, w) => a + w, 0);
  const status = share < MODEL.rules.unclassifiedShare ? "unclassified" : share < MODEL.rules.buildShare ? "provisional" : "built";
  const p = status === "unclassified" ? { status } : { status, ...classify(z) };
  personas[code] = p;
  const frozen = MODEL.assignments[code];
  if (!frozen) mismatches.push(`${code}: not in the frozen model`);
  else if (frozen.status !== p.status || frozen.group !== p.group || frozen.type !== p.type) {
    mismatches.push(`${code}: scorer ${p.status}/${p.group}/${p.type} vs frozen ${frozen.status}/${frozen.group}/${frozen.type}`);
  } else if (p.confidence !== undefined && Math.abs(p.confidence - frozen.confidence) > 0.002) {
    mismatches.push(`${code}: confidence ${p.confidence} vs frozen ${frozen.confidence}`);
  }
}
if (mismatches.length) fail(`the scorer disagrees with the frozen model for ${mismatches.length} countr${mismatches.length === 1 ? "y" : "ies"}:\n  ${mismatches.join("\n  ")}`);

// ── Generated module ─────────────────────────────────────────────────────────
const NAMES = SNAP.names;
const examples = (codes, n) => codes.slice(0, n).map((c) => NAMES[c]);
const groups = GROUPS.map((g) => {
  const p = PORTRAITS.groups[g];
  const gi = GRAND.groups[g];
  if (!p || !gi) fail(`group ${g} has no portrait or Grand Index entry`);
  return {
    code: g, name: p.name, line: p.line, portrait: p.portrait, size: gi.size,
    worldPopulationShare: gi.worldPopulationShare, examples: examples(gi.typicalMembers, 4),
    typeCodes: TYPES.filter((t) => TYPE_GROUP[t] === g),
  };
});
const types = TYPES.map((t) => {
  const p = PORTRAITS.types[t];
  const ti = GRAND.types[t];
  if (!p || !ti) fail(`type ${t} has no portrait or Grand Index entry`);
  return { code: t, group: TYPE_GROUP[t], name: p.name, line: p.line, portrait: p.portrait, size: ti.size, examples: examples(ti.typicalMembers, 3) };
});
const tree = MODEL.familyTree;
const js = (v) => JSON.stringify(v);
const body = `// AUTO-GENERATED by scripts/build-country-personas.mjs — do not edit by hand.
// Re-run: node scripts/build-country-personas.mjs
//
// Country Personas, edition ${MODEL.edition}: every UN member and observer state grouped by what its
// sourced national data looks like (development, governance, age structure relative to development,
// and scale). Built by the research build (scripts/country-personas/build.py) from the dated snapshot
// scripts/data/country-persona-inputs.json, reviewed and approved by the owner (${MODEL.approved.date}),
// then re-scored here from the frozen model. Method: docs/COUNTRY_PERSONAS_PLAYBOOK.md; decisions and
// evidence: docs/COUNTRY_PERSONAS_LEDGER.md.
//
// A persona describes a country's national averages, never the people who live there.

export type PersonaStatus = "built" | "provisional" | "unclassified";

export type PersonaGroup = {
  /** Letter code — a label, not a rank. */
  readonly code: string;
  readonly name: string;
  /** One-line plain description. */
  readonly line: string;
  /** Short sourced pen portrait (every figure is a Grand Index persona mean). */
  readonly portrait: string;
  readonly size: number;
  readonly worldPopulationShare: number;
  /** Countries nearest the group's centre. */
  readonly examples: readonly string[];
  readonly typeCodes: readonly string[];
};

export type PersonaType = {
  readonly code: string;
  readonly group: string;
  readonly name: string;
  readonly line: string;
  readonly portrait: string;
  readonly size: number;
  readonly examples: readonly string[];
};

export type CountryPersona = {
  readonly status: PersonaStatus;
  readonly group?: string;
  readonly type?: string;
  /** 1 − (distance to own group centre ÷ distance to the next); below 0.1 = borderline. */
  readonly confidence?: number;
  readonly secondGroup?: string;
  readonly typeConfidence?: number;
};

export const PERSONA_EDITION = ${js(MODEL.edition)};

export const PERSONA_GROUPS: readonly PersonaGroup[] = [
${groups.map((g) => `  ${js(g)},`).join("\n")}
];

export const PERSONA_TYPES: readonly PersonaType[] = [
${types.map((t) => `  ${js(t)},`).join("\n")}
];

export const COUNTRY_PERSONAS: Readonly<Record<string, CountryPersona>> = {
${SNAP.universe.map((c) => `  ${c}: ${js(personas[c])},`).join("\n")}
};

/** The "family tree": each built country on the two main axes of the persona space
 *  (a principal-component projection of the four weighted domain scores). */
export const PERSONA_FAMILY_TREE = {
  explainedVariance: ${js(tree.explainedVariance)},
  loadings: ${js(tree.loadings)},
  countries: ${js(tree.countries)} as Readonly<Record<string, readonly [number, number]>>,
  types: ${js(tree.types)} as Readonly<Record<string, readonly [number, number]>>,
} as const;
`;

if (CHECK) {
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {
    fail("src/data/countryPersonas.ts is missing — run node scripts/build-country-personas.mjs");
  }
  if (current !== body) fail("src/data/countryPersonas.ts is stale — run node scripts/build-country-personas.mjs (never hand-edit it)");
  console.log(`✓ countryPersonas.ts matches the frozen model; the scorer reproduces all ${SNAP.universe.length} assignments`);
} else {
  writeFileSync(OUT, body);
  console.log(`✓ src/data/countryPersonas.ts — ${groups.length} groups, ${types.length} types, ${SNAP.universe.length} countries (scorer agrees with the frozen model)`);
}
