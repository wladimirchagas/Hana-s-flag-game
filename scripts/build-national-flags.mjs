// Generate src/data/nationalFlags.ts from scripts/data/national-flag-sources.json.
//
// The manifest is the curated, sourced record (see its own _comment block); this
// script only re-formats it into typed data the app can import — it never invents a
// flag, a date or a meaning, exactly like build-country-facts.mjs and
// build-capital-details.mjs.
//
//   node scripts/build-national-flags.mjs
//
// Ordering baked in here so the UI cannot get it wrong:
//   • `historical` is emitted newest-first (the current flag at the top), which is
//     the order the tab shows it in.
//   • every other category keeps the manifest's own order, so a country can put its
//     principal flag first (Australia's national flag before the two other official
//     flags).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const MANIFEST = R("data/national-flag-sources.json");
const OUT = R("../src/data/nationalFlags.ts");

const CATEGORY_ORDER = [
  // "official" leads: the country's flags-in-force, headed by the one it actually
  // flies. Owner request 2026-08 — Bolivia's official section showed only the
  // Wiphala, so the section that should answer "what is this country's flag?"
  // omitted the tricolour.
  "official",
  "historical",
  "military",
  "maritime",
  "standard",
  "civilstate",
  "indigenous",
  // Not flags, but the country's other national symbols — kept last so the flag
  // sections always lead.
  "coatofarms",
  "passport",
];

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const q = (s) => JSON.stringify(s);

const flagLines = [];
const meaningLines = [];
const independenceLines = [];
let flagCount = 0;
let meaningCount = 0;
const countries = Object.keys(manifest.countries).sort();

for (const cc of countries) {
  const entries = manifest.countries[cc].flags;
  const ordered = [];
  for (const category of CATEGORY_ORDER) {
    const inCat = entries.filter((e) => e.category === category);
    if (category === "official") {
      // The flag the country actually flies leads its own section, whatever order
      // the manifest happens to list the others in.
      const own = `flags/${cc.toLowerCase()}.svg`;
      inCat.sort((a, b) => Number(b.reuse === own) - Number(a.reuse === own));
    }
    if (category === "passport") {
      // The ordinary passport leads its section — it is the one almost every reader
      // holds; the special types (diplomatic, official, service, emergency) follow.
      inCat.sort((a, b) => Number(b.id.endsWith("-passport")) - Number(a.id.endsWith("-passport")));
    }
    if (category === "historical") {
      // Newest first; a flag flown for a single year sorts by its own year.
      inCat.sort((a, b) => b.from - a.from || b.to - a.to);
    }
    ordered.push(...inCat);
  }
  const unknown = entries.filter((e) => !CATEGORY_ORDER.includes(e.category));
  if (unknown.length > 0) {
    console.error(`✗ ${cc}: unknown category on ${unknown.map((e) => e.id).join(", ")}`);
    process.exit(1);
  }

  flagLines.push(`  ${q(cc)}: [`);
  for (const e of ordered) {
    // An entry with NO image is still listed: some symbols have no freely-licensed
    // file (Australia's Torres Strait Islander Flag is under copyright until 2063),
    // and silently dropping one leaves the country's set looking complete when it
    // is not. It renders as a card carrying the reason instead of a picture.
    const path = e.reuse ?? (e.file ? `national-flags/${e.file}` : null);
    const pathField = path ? `path: ${q(path)}, ` : "";
    const noImage = e.noImageReason ? `noImageReason: ${q(e.noImageReason)}, ` : "";
    const years =
      e.from == null ? "" : `from: ${e.from}, ${e.to == null ? "" : `to: ${e.to}, `}`;
    // A pre-independence flag carries the power that held sovereignty at the time,
    // so the UI can badge it instead of presenting it as the country's own flag.
    const sovereign = e.sovereign ? `sovereign: ${q(e.sovereign)}, ` : "";
    // The third state a pre-modern flag can be in: neither the modern country's own
    // flag nor a ruling power's, but an EARLIER POLITY on the same territory that
    // answered to nobody.
    const prior = e.priorPolity ? `priorPolity: ${q(e.priorPolity)}, ` : "";
    // The third state, and the mirror of `sovereign`: a flag an occupying power
    // imposed on a country that was ALREADY independent. "Under X" would be wrong
    // (it implies X held sovereignty, which the occupied country denies) and no
    // attribution at all would be worse.
    const occupier = e.occupier ? `occupier: ${q(e.occupier)}, ` : "";
    // PRIMARY is derived, never hand-set: it is exactly the entry that reuses the
    // country's own current flag file, so a country cannot be given two primaries
    // or forget to mark one. The same flag is listed in BOTH the official and the
    // historical section, and both cards carry the badge.
    const primary = path === `flags/${cc.toLowerCase()}.svg` ? "primary: true, " : "";
    flagLines.push(
      `    { id: ${q(e.id)}, category: ${q(e.category)}, name: ${q(e.name)}, ${years}${sovereign}${prior}${occupier}${primary}${pathField}${noImage}design: ${q(e.design)}, source: ${q(e.source)} },`,
    );
    flagCount++;

    if (e.meaning) {
      const m = e.meaning;
      meaningLines.push(`  ${q(e.id)}: {`);
      meaningLines.push(`    description: ${q(m.description)},`);
      if (m.myths?.length) {
        meaningLines.push(`    myths: [`);
        for (const myth of m.myths) {
          meaningLines.push(`      { claim: ${q(myth.claim)}, reality: ${q(myth.reality)} },`);
        }
        meaningLines.push(`    ],`);
      }
      meaningLines.push(`    sources: [`);
      for (const s of m.sources) {
        meaningLines.push(`      { title: ${q(s.title)}, url: ${q(s.url)} },`);
      }
      meaningLines.push(`    ],`);
      meaningLines.push(`  },`);
      meaningCount++;
    }
  }
  flagLines.push(`  ],`);

  const ind = manifest.countries[cc].independence;
  if (ind) {
    independenceLines.push(
      `  ${q(cc)}: { year: ${ind.year}, event: ${q(ind.event)},${ind.note ? ` note: ${q(ind.note)},` : ""} source: ${q(ind.source)} },`,
    );
  }
}

const out = `// GENERATED by scripts/build-national-flags.mjs — DO NOT EDIT BY HAND.
// Source of truth: scripts/data/national-flag-sources.json (curated + sourced).
// Re-run: node scripts/build-national-flags.mjs
//
// The Learn-mode "National flags" tab: every flag a country flies beyond its
// sub-national ones — its historical national flags (newest first, including the
// current one), any additional flags with official national status, its military
// service flags, maritime ensigns and jacks, head-of-state standards, civil/state
// variants and officially recognised indigenous flags.
//
// LINK TO THE HISTORICAL ERAS — a flag whose \`path\` starts with "historical-flags/"
// is the SAME image file the era maps show, carrying the same sourced from/to window
// (checked against src/data/historicalFlagValidity.ts by
// scripts/check-national-flags.mjs), so the two views can never disagree about what
// a country flew at a given date. The tab is NOT limited to the eras' 21 fixed
// dates: a flag flown between two era snapshots is listed here with its own window.

import type { FlagMeaning } from "./flagMeanings";

export type NationalFlagCategory =
  | "historical"
  | "official"
  | "military"
  | "maritime"
  | "standard"
  | "civilstate"
  | "indigenous"
  | "coatofarms"
  | "passport";

export type NationalFlag = {
  /** Stable slug — React key, and the key into NATIONAL_FLAG_MEANINGS. */
  readonly id: string;
  readonly category: NationalFlagCategory;
  /** The flag's own name, as its cited source gives it. */
  readonly name: string;
  /**
   * First year the design was in official use. ABSENT when the source does not
   * date the flag — a service or ensign whose adoption year no authoritative
   * source gives is listed with no years rather than an invented one, and the
   * card simply shows its name. Always present on a "historical" flag, whose
   * whole point is the date (enforced by check-national-flags.mjs).
   */
  readonly from?: number;
  /** Last year it was in use (9999 = still current). */
  readonly to?: number;
  /**
   * Image path relative to BASE_URL — ABSENT when no freely-licensed file exists.
   * The entry is still listed (with \`noImageReason\`) rather than dropped: an
   * omission the user cannot see makes an incomplete set look complete, which is
   * how Australia's Torres Strait Islander Flag went missing from a tab that
   * showed its two companion flags.
   */
  readonly path?: string;
  /** Why no image is shown. Present exactly when \`path\` is absent. */
  readonly noImageReason?: string;
  /** What the image is — the card's sub-label. */
  readonly design: string;
  /**
   * The power that held sovereignty over the territory when this flag flew — set ONLY
   * on a pre-independence flag, whether it is the ruling power's own flag (Portugal's
   * royal banner over colonial Brazil) or a flag of the territory under that rule (the
   * Federated Malay States). The UI MUST badge it, so a user can never mistake a
   * colonial-era flag for a flag of the independent country. Absent on every flag of
   * the independent state.
   */
  readonly sovereign?: string;
  /**
   * The EARLIER POLITY that flew this flag on the same territory, when that polity
   * was not ruled by anyone — New Zealand's Confederation of United Tribes, whose
   * 1834 flag predates British rule entirely. Without this, such a flag could only
   * be described by naming a sovereign power it never had, which would be false, so
   * it would have to be dropped instead. Mutually exclusive with "sovereign".
   */
  readonly priorPolity?: string;
  /**
   * The power that IMPOSED this flag on the country AFTER it was already
   * independent — the Estonian and Latvian SSR flags, flown under a Soviet
   * annexation that both countries (and most other states) hold was never lawful.
   * "sovereign" would be wrong for these: it says the power HELD sovereignty,
   * which is the very claim the occupied country denies, and the check forbids it
   * on any flag flown from independence onward. Showing such a flag with no
   * attribution at all would be worse still — it would read as one of the
   * country's own. Mutually exclusive with "sovereign" and "priorPolity".
   */
  readonly occupier?: string;
  /**
   * True for the country's CURRENT national flag — the one the fact-sheet above the
   * grid already shows. Derived by the generator from the image path, so it cannot
   * drift. The grid badges it wherever it is listed, and selecting it opens no
   * second widget: the panel above is already showing that exact flag, and a
   * duplicate of it is noise.
   */
  readonly primary?: boolean;
  /** Authoritative source for the name and dates. */
  readonly source: string;
};

/** Keyed by ISO 3166-1 alpha-2. Countries with no curated flags are absent. */
export const NATIONAL_FLAGS: Readonly<Record<string, readonly NationalFlag[]>> = {
${flagLines.join("\n")}
};

/**
 * When each country became independent, and of whom — sourced, and used by the UI to
 * caption a pre-independence flag ("Flown before independence, when X was under Y
 * rule"). Only countries that HAVE a pre-independence flag in the tab appear here.
 * check-national-flags.mjs fails the build if a historical flag whose window ends at
 * or before this year does not declare the power that held sovereignty — that is the
 * anachronism guard: a colonial-era flag can never be shown as the country's own.
 */
export type NationalIndependence = {
  readonly year: number;
  /** What happened that year, in the source's own terms. */
  readonly event: string;
  /** Any nuance the year alone would misstate. */
  readonly note?: string;
  readonly source: string;
};

export const NATIONAL_INDEPENDENCE: Readonly<Record<string, NationalIndependence>> = {
${independenceLines.join("\n")}
};

/**
 * Sourced "What this flag means" explainers, keyed by NationalFlag.id, passed to
 * the shared \`FlagMeaning\` component via its \`meanings\` prop — the same discipline
 * and shape as FLAG_MEANINGS / CITY_FLAG_MEANINGS. Coverage grows incrementally: a
 * flag with no entry simply renders no disclosure rather than a guessed one.
 */
export const NATIONAL_FLAG_MEANINGS: Record<string, FlagMeaning> = {
${meaningLines.join("\n")}
};
`;

writeFileSync(OUT, out);
console.log(
  `✓ src/data/nationalFlags.ts — ${flagCount} flags across ${countries.length} countries, ${meaningCount} meanings.`,
);
