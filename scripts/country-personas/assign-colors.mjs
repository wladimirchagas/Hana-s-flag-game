#!/usr/bin/env node
// Country Personas v2 — give each persona a map colour so that personas which BORDER each other on
// the world map (or sit next to each other on the persona map) get clearly different colours.
//
//   node scripts/country-personas/assign-colors.mjs [model.json]
//
// Palette: 30 categorical colours from scripts/country-personas/palette.py (greedy farthest-point
// in CIEDE2000, mid lightness, seeded with Okabe–Ito; min pairwise ΔE 13.4). Personas are not
// ordered, so they must never borrow the index green→red scale. The palette is fixed; only WHICH
// persona gets which colour is optimised here: a deterministic pairwise-swap search that maximises
// colour difference across borders (weighted by how many country pairs share a border) and between
// persona-map neighbours. Prints the TypeScript map to paste into src/lib/countryPersonas.ts.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import countries from "i18n-iso-countries";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), "utf8"));
const MODEL = read(process.argv[2] ?? "scripts/data/country-personas-model.json");
const TOPO = read("public/countries-50m.json");

export const PALETTE = ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#D55E00", "#56B4E9", "#707000", "#98C038",
  "#8058C8", "#C83048", "#C0B8F8", "#F89888", "#00D0D0", "#088890", "#108008", "#C02890", "#7088F8", "#A08050",
  "#30D880", "#C8B880", "#B07060", "#C078F0", "#789058", "#A89800", "#F85878", "#F8A0F0", "#F8B078", "#207860",
  "#9070A0", "#A06000"];

// ── CIEDE2000 ────────────────────────────────────────────────────────────────
function lab(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const x = (0.4124564 * c[0] + 0.3575761 * c[1] + 0.1804375 * c[2]) / 0.95047;
  const y = 0.2126729 * c[0] + 0.7151522 * c[1] + 0.072175 * c[2];
  const z = (0.0193339 * c[0] + 0.119192 * c[1] + 0.9503041 * c[2]) / 1.08883;
  const f = (t) => (t > (6 / 29) ** 3 ? Math.cbrt(t) : t / (3 * (6 / 29) ** 2) + 4 / 29);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}
export function deltaE([L1, a1, b1], [L2, a2, b2]) {
  const rad = Math.PI / 180;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1, a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
  const h1p = ((Math.atan2(b1, a1p) / rad) + 360) % 360, h2p = ((Math.atan2(b2, a2p) / rad) + 360) % 360;
  const dLp = L2 - L1, dCp = C2p - C1p;
  let dhp = h2p - h1p;
  if (dhp > 180) dhp -= 360;
  if (dhp < -180) dhp += 360;
  if (C1p * C2p === 0) dhp = 0;
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * rad);
  const Lbp = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2;
  let hbp = Math.abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
  if (C1p * C2p === 0) hbp = h1p + h2p;
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad) + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
  const dTheta = 30 * Math.exp(-(((hbp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2), Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * dTheta * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

// ── Which personas touch? ────────────────────────────────────────────────────
const personaOf = {};
for (const p of MODEL.personas) for (const c of p.members) personaOf[c] = p.code;
const codes = MODEL.personas.map((p) => p.code);
const idx = Object.fromEntries(codes.map((c, i) => [c, i]));
const K = codes.length;
const W = Array.from({ length: K }, () => new Array(K).fill(0));
const arcsOf = new Map();
for (const g of TOPO.objects.countries.geometries) {
  const a2 = countries.numericToAlpha2(String(g.id).padStart(3, "0"));
  if (!a2 || !personaOf[a2]) continue;
  const set = arcsOf.get(a2) ?? new Set();
  const walk = (x) => (Array.isArray(x) ? x.forEach(walk) : set.add(x < 0 ? ~x : x));
  walk(g.arcs);
  arcsOf.set(a2, set);
}
const owners = new Map();
for (const [c, set] of arcsOf) for (const a of set) owners.set(a, [...(owners.get(a) ?? []), c]);
const borders = new Set();
for (const list of owners.values()) {
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) borders.add([list[i], list[j]].sort().join("-"));
}
for (const pair of borders) {
  const [a, b] = pair.split("-").map((c) => idx[personaOf[c]]);
  if (a !== b) {
    W[a][b] += 1;
    W[b][a] += 1;
  }
}
// persona-map neighbours: each persona's 3 nearest others on the family map
const P = MODEL.familyMap.personas;
for (const c of codes) {
  const near = codes.filter((d) => d !== c).sort((x, y) => Math.hypot(P[x][0] - P[c][0], P[x][1] - P[c][1]) - Math.hypot(P[y][0] - P[c][0], P[y][1] - P[c][1])).slice(0, 3);
  for (const d of near) {
    W[idx[c]][idx[d]] += 1;
    W[idx[d]][idx[c]] += 1;
  }
}

// ── Assign: deterministic pairwise-swap search ───────────────────────────────
const LAB = PALETTE.map(lab);
const DE = LAB.map((x) => LAB.map((y) => deltaE(x, y)));
const penalty = (d) => Math.max(0, 40 - d) ** 2;
let assign = codes.map((_, i) => i);
const cost = (as) => {
  let s = 0;
  for (let i = 0; i < K; i++) for (let j = i + 1; j < K; j++) if (W[i][j]) s += W[i][j] * penalty(DE[as[i]][as[j]]);
  return s;
};
let best = cost(assign);
for (let improved = true; improved; ) {
  improved = false;
  for (let i = 0; i < K; i++) {
    for (let j = i + 1; j < K; j++) {
      [assign[i], assign[j]] = [assign[j], assign[i]];
      const c = cost(assign);
      if (c < best - 1e-9) {
        best = c;
        improved = true;
      } else [assign[i], assign[j]] = [assign[j], assign[i]];
    }
  }
}
let minBorder = Infinity, worst = "";
for (let i = 0; i < K; i++) {
  for (let j = i + 1; j < K; j++) {
    if (W[i][j] && DE[assign[i]][assign[j]] < minBorder) {
      minBorder = DE[assign[i]][assign[j]];
      worst = `${codes[i]}/${codes[j]}`;
    }
  }
}
console.log(`// ${borders.size} land borders; smallest colour difference between touching personas: ΔE2000 ${minBorder.toFixed(1)} (${worst})`);
console.log("export const PERSONA_COLORS: Readonly<Record<string, string>> = {");
for (let i = 0; i < K; i++) console.log(`  "${codes[i]}": "${PALETTE[assign[i]]}",`);
console.log("};");
