/**
 * Per-country coat-of-arms and passport image lookups for the Learn-map flag
 * grid's "Show" dropdown (national flags → coats of arms → passports).
 *
 * The images are the SAME sourced files the "National symbols" tab shows
 * (`src/data/nationalFlags.ts`, generated from the curated, cited manifest — see
 * CLAUDE.md "National-symbols tab"). We never invent an image: a country whose
 * manifest has no coat of arms / passport with a bundled `path` simply has no
 * entry here, and the grid renders its empty placeholder for that view.
 *
 * We take the FIRST entry of each category that carries an image `path`:
 *   - coat of arms: the country's arms/emblem/seal (the manifest lists one);
 *   - passport: the ordinary passport, which leads the passport section (rule 4a).
 * A `noImageReason` entry (no `path`) is skipped — there is no picture to show.
 */
import { NATIONAL_FLAGS, type NationalFlag } from "../data/nationalFlags";

const coatOfArmsByCode = new Map<string, string>();
const passportByCode = new Map<string, string>();
const footballCrestByCode = new Map<string, string>();
const coatOfArmsEntryByCode = new Map<string, NationalFlag>();
const passportEntryByCode = new Map<string, NationalFlag>();
const footballCrestEntryByCode = new Map<string, NationalFlag>();

for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
  const arms = flags.find((f) => f.category === "coatofarms" && f.path);
  if (arms?.path) {
    coatOfArmsByCode.set(code, arms.path);
    coatOfArmsEntryByCode.set(code, arms);
  }
  const passport = flags.find((f) => f.category === "passport" && f.path);
  if (passport?.path) {
    passportByCode.set(code, passport.path);
    passportEntryByCode.set(code, passport);
  }
  // The world-map grid and the detail panel show ONE crest per country — the
  // country's OWN national-team crest, whose id is `{cc}-football-crest`. A
  // country can also carry SUBNATIONAL crests (the UK's England/Scotland/Wales/
  // Northern Ireland home-nation FAs), which have other ids: those appear only in
  // the National symbols tab's Football-crest section, never as the country's
  // single grid tile. So the UK — which plays as four teams and has no single
  // crest — correctly shows no crest in the grid while listing all four in the tab.
  const ownCrest = flags.find(
    (f) => f.category === "footballcrest" && f.path && f.id === `${code.toLowerCase()}-football-crest`,
  );
  if (ownCrest?.path) {
    footballCrestByCode.set(code, ownCrest.path);
    footballCrestEntryByCode.set(code, ownCrest);
  }
}

/** Relative image path (BASE-prefixed by the grid's resolver) for a country's
 *  coat of arms, or null when the country has none bundled. */
export function coatOfArmsPath(code: string): string | null {
  return coatOfArmsByCode.get(code) ?? null;
}

/** Relative image path for a country's ordinary passport cover, or null. */
export function passportPath(code: string): string | null {
  return passportByCode.get(code) ?? null;
}

/** Relative image path for a country's national football-association crest, or
 *  null when none is bundled (the curated set grows per country). */
export function footballCrestPath(code: string): string | null {
  return footballCrestByCode.get(code) ?? null;
}

// Every football crest, keyed by its own entry id — so the world-map grid can
// show the SPECIFIC crest that was clicked (a UK home nation, or a FIFA-member
// entity) in the detail panel, rather than resolving one by country code (which
// returns nothing for the UK and the parent's crest for an entity).
const footballCrestEntryById = new Map<string, NationalFlag>();
for (const flags of Object.values(NATIONAL_FLAGS)) {
  for (const f of flags) {
    if (f.category === "footballcrest" && f.path) footballCrestEntryById.set(f.id, f);
  }
}

/** A football crest entry looked up by its own id, or null. */
export function footballCrestById(id: string): NationalFlag | null {
  return footballCrestEntryById.get(id) ?? null;
}

/**
 * A country's SUB-NATIONAL football crests — the ones the world-map grid does NOT
 * treat as the country's single crest (id ≠ `{cc}-football-crest`). This is the
 * UK, whose football is the four home nations and which therefore has no single
 * `gb-football-crest`. Each is returned with a short division name ("England",
 * "Scotland", …) taken from the part of the entry name before the em dash
 * ("England — The Football Association crest"), plus its bundled image path.
 * Empty for every country that has a single national crest (its subnationals, if
 * any, are not modelled here).
 */
export function subnationalFootballCrests(
  code: string,
): { id: string; name: string; path: string }[] {
  const own = `${code.toLowerCase()}-football-crest`;
  return (NATIONAL_FLAGS[code] ?? [])
    .filter((f) => f.category === "footballcrest" && f.path && f.id !== own)
    .map((f) => ({
      id: f.id,
      name: f.name.split("—")[0].trim() || f.name,
      path: f.path as string,
    }));
}

/**
 * The full national-symbol entry (name, design line, meaning id) for a country's
 * coat of arms / passport / football crest — the SAME entry the matching
 * `*Path()` helper takes its image from, so the grid tile and the detail panel
 * can never show one image with another's caption. null when the country has no
 * such symbol bundled.
 */
export function nationalSymbolEntry(
  code: string,
  type: "coatofarms" | "passport" | "footballcrest",
): NationalFlag | null {
  const map =
    type === "coatofarms"
      ? coatOfArmsEntryByCode
      : type === "passport"
        ? passportEntryByCode
        : footballCrestEntryByCode;
  return map.get(code) ?? null;
}
