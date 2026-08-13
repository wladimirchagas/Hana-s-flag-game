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
import { NATIONAL_FLAGS } from "../data/nationalFlags";

const coatOfArmsByCode = new Map<string, string>();
const passportByCode = new Map<string, string>();

for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
  const arms = flags.find((f) => f.category === "coatofarms" && f.path);
  if (arms?.path) coatOfArmsByCode.set(code, arms.path);
  const passport = flags.find((f) => f.category === "passport" && f.path);
  if (passport?.path) passportByCode.set(code, passport.path);
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
