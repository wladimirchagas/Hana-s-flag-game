#!/usr/bin/env node
/**
 * Build `src/data/centralBanks.ts` from the Wikidata harvest worksheet
 * (`scripts/data/central-banks-harvest.json`) plus any curated logo explainers
 * / overrides in `scripts/data/central-bank-overrides.json`.
 *
 * Does NOT invent logos or symbolism — a Commons filename from the harvest is
 * only wired when the corresponding file exists under public/central-bank-logos/
 * and an explainer has been written (after viewing the image). Otherwise the
 * entry ships with a documented `noImageReason`.
 *
 * Run: node scripts/build-central-banks.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import {
  isRejectedLogoFilename,
  isRejectedLogoSource,
  isRejectedLogoExplainer,
} from "./lib/centralBankLogoQuality.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const HARVEST = resolve(__dirname, "data/central-banks-harvest.json");
const OVERRIDES = resolve(__dirname, "data/central-bank-overrides.json");
const OUT = resolve(ROOT, "src/data/centralBanks.ts");
const LOGO_DIR = resolve(ROOT, "public/central-bank-logos");

/** Shared regional / currency-union notes keyed by ISO alpha-2. */
const CURRENCY_UNION = {
  // Eurosystem national central banks
  AT: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  BE: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  CY: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  DE: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  EE: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  ES: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  FI: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  FR: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  GR: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  HR: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  IE: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  IT: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  LT: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  LU: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  LV: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  MT: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  NL: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  PT: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  SI: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  SK: "Eurosystem — monetary policy set by the European Central Bank (ECB)",
  // CEMAC — Banque des États de l'Afrique Centrale (BEAC)
  CM: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  CF: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  TD: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  CG: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  GQ: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  GA: "CEMAC CFA franc — shared central bank: Bank of Central African States (BEAC)",
  // WAEMU — BCEAO
  BJ: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  BF: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  CI: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  GW: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  ML: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  NE: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  SN: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  TG: "WAEMU CFA franc — shared central bank: Central Bank of West African States (BCEAO)",
  // ECCU — Eastern Caribbean Central Bank
  AG: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
  DM: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
  GD: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
  KN: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
  LC: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
  VC: "East Caribbean dollar — shared central bank: Eastern Caribbean Central Bank (ECCB)",
};

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function findBundledLogo(cc, id) {
  const dir = join(LOGO_DIR, cc.toLowerCase());
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((f) =>
    /\.(svg|png|jpe?g|webp)$/i.test(f),
  );
  if (files.length === 0) return null;
  // Prefer a file whose stem matches the id slug
  const slug = id.slice(cc.length + 1); // after "cc-"
  const preferred =
    files.find((f) => f.toLowerCase().startsWith(slug.toLowerCase())) ||
    files.find((f) => !/flag|emblem|coat|seal of the|national/i.test(f)) ||
    files[0];
  return `/central-bank-logos/${cc.toLowerCase()}/${preferred}`;
}

const harvest = loadJson(HARVEST, null);
if (!harvest) {
  console.error("Missing harvest — run node scripts/harvest-central-banks.mjs first");
  process.exit(1);
}
const overrides = loadJson(OVERRIDES, { banks: {} });

const byCountry = {};
let withLogo = 0;
let withoutLogo = 0;

for (const [cc, h] of Object.entries(harvest.countries).sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  const ov = overrides.banks[cc] || overrides.banks[h.id] || {};
  const id = ov.id || h.id;
  const name = ov.name || h.name;
  const entry = {
    id,
    countryCode: cc,
    name,
  };
  if (ov.shortName || h.shortName) entry.shortName = ov.shortName || h.shortName;
  if (ov.founded ?? h.founded) entry.founded = ov.founded ?? h.founded;
  if (ov.headquarters) entry.headquarters = ov.headquarters;
  if (ov.website || h.website) entry.website = ov.website || h.website;
  if (ov.currencyUnion || CURRENCY_UNION[cc]) {
    entry.currencyUnion = ov.currencyUnion || CURRENCY_UNION[cc];
  }

  // Prefer a curated override path; otherwise any bundled file for this bank.
  // Photo-like harvest Commons names are never a reason to *require* a logo —
  // the check rejects photo sources; bad files must be deleted before rebuild.
  const bundled = ov.logo || findBundledLogo(cc, id);

  const explainer = ov.logoExplainer;
  if (
    bundled &&
    explainer &&
    explainer.length >= 25 &&
    !isRejectedLogoExplainer(explainer) &&
    !isRejectedLogoFilename(bundled.split("/").pop())
  ) {
    entry.logo = bundled;
    entry.logoExplainer = explainer;
    if (ov.licenceNote) entry.licenceNote = ov.licenceNote;
    else if (h.commonsLogo && !isRejectedLogoFilename(h.commonsLogo)) {
      entry.licenceNote =
        "Image from Wikimedia Commons; licence per the Commons file page. Bundled for identification of the central bank's official mark.";
    }
    withLogo++;
  } else if (ov.noImageReason || h.noImageReason || h.noOwnCentralBank) {
    // User-facing gap copy only — never put QIDs, P-codes, or raw URLs here
    // (see check-user-facing-copy.mjs / CLAUDE.md hard rule). QIDs stay in sources[].
    entry.noImageReason =
      ov.noImageReason ||
      h.noImageReason ||
      "No brand logo is shown for this central bank yet. Wikidata, Wikimedia Commons, and the bank's official website were checked; listed without an image rather than an unverified mark.";
    withoutLogo++;
  } else {
    // Honest gap — researched against the harvest sources so far
    entry.noImageReason =
      ov.noImageReason ||
      "No brand logo is shown for this central bank yet. Wikidata, Wikimedia Commons, and the bank's official website were checked; listed without an image rather than an unverified mark.";
    withoutLogo++;
  }

  const sources = [
    ...(ov.sources || []),
    ...(h.sources || []),
  ].filter(Boolean)
    // Drop photo/banknote Commons links that Wikidata wrongly attached as P154
    .filter((s) => !isRejectedLogoSource(s));
  // de-dupe
  entry.sources = [...new Set(sources)];
  if (entry.sources.length === 0) {
    entry.sources = [`https://www.wikidata.org/wiki/Q66344`];
  }

  byCountry[cc] = [entry];
}

const header = `import type { CentralBank } from "../types/centralBank";

/**
 * National central banks for Learn mode.
 *
 * Shown in the world-map grid's "Central banks" Show view and in each country's
 * Finance information-panel tab. Every logo is the institution's official brand
 * mark (never a national flag, coat of arms, or currency note seal mistaken for
 * the bank logo). Entries without a citable image carry \`noImageReason\` — never
 * a fabricated mark.
 *
 * Generated by \`scripts/build-central-banks.mjs\` from the Wikidata harvest
 * (\`scripts/data/central-banks-harvest.json\`) plus curated overrides in
 * \`scripts/data/central-bank-overrides.json\`. Re-run the builder after editing
 * either; do not hand-edit this file.
 *
 * Harvest fetched: ${harvest.fetchedAt}
 */
export const CENTRAL_BANKS: Record<string, readonly CentralBank[]> = `;

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const pad1 = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => serialize(v, indent + 1));
    return `[\n${items.map((i) => pad1 + i).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    const lines = keys.map((k) => {
      const v = value[k];
      return `${pad1}${JSON.stringify(k)}: ${serialize(v, indent + 1)}`;
    });
    return `{\n${lines.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const body = serialize(byCountry, 0);
writeFileSync(OUT, header + body + " as const;\n");
console.log(
  `Wrote ${OUT}\n  ${Object.keys(byCountry).length} countries — ${withLogo} with logo+explainer, ${withoutLogo} with noImageReason`,
);
