/**
 * Sourced city-flag-meaning explanations for the Learn-mode capital-city widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` (the SAME progressive-disclosure
 * "What this flag means" component the national/subnational flags use, so the
 * look, font, spacing and behaviour are identical) below the capital city's flag
 * in `src/components/CapitalDetails.tsx`.
 *
 * Keyed by the ISO 3166-2 subdivision code whose CAPITAL city the flag belongs
 * to — the same key `CAPITAL_FLAGS` / `CAPITAL_DETAILS` use — because the widget
 * shows a subdivision's capital-city flag. City flags are a distinct category
 * from national/subnational flags (exactly like the capital-flag files), so they
 * live in their own dataset rather than in `flagMeanings.ts`.
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * An entry MUST only describe the flag the widget actually shows for that code
 * (the bundled `public/capital-flags/*` file); never describe a variant the app
 * does not display.
 *
 * `scripts/check-city-flag-meanings.mjs` (run by `npm run flags:check` + CI)
 * fails the build if an entry has no description, no source, a source without a
 * valid http(s) URL, or a malformed myth. The check is a safety net, not a
 * substitute for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set — a capital whose code has no
 * entry simply renders no disclosure.
 */

import type { FlagMeaning as FlagMeaningData } from "./flagMeanings";

export const CITY_FLAG_MEANINGS: Record<string, FlagMeaningData> = {
  // ── Lisbon — capital of Portugal and of the Lisbon region ───────────────────
  "PT-11": {
    description:
      "A field divided into eight alternating black and white triangles (gyronny), bearing in the " +
      "centre the coat of arms of the city of Lisbon: a golden ship (nau) sailing on green-and-white " +
      "waves, flanked by two black ravens, beneath a golden mural crown, on a scroll reading “Muito " +
      "Nobre e Sempre Leal Cidade de Lisboa” (“Most Noble and Ever Loyal City of Lisbon”). The ship " +
      "and the two ravens commemorate Saint Vincent of Saragossa, the city’s patron: in 1173 King " +
      "Afonso I had the saint’s relics carried by ship to Lisbon Cathedral, and by legend ravens had " +
      "guarded his body since his martyrdom and accompanied the vessel — so the arms depict the ship " +
      "that brought the relics, with a raven at prow and stern.",
    sources: [
      {
        title: "Saint Vincent of Saragossa — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Saint_Vincent_of_Saragossa",
      },
      {
        title: "Lisbon — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lisbon",
      },
    ],
  },

  // ── Madrid — capital of the Community of Madrid and of Spain ─────────────────
  "ES-M": {
    description:
      "A crimson (carmesí) field bearing the coat of arms of the city of Madrid: a black bear standing " +
      "on its hind legs to eat from a green strawberry tree (madroño), on a silver field within a blue " +
      "border charged with seven silver stars, the whole ensigned with an open royal crown. The bear " +
      "and the tree descend from a medieval dispute (around 1222) between the town council and the " +
      "clergy over rights to Madrid’s woodland and pasture: the council took the bear reaching up the " +
      "tree, associating itself with the trees and the timber. The seven stars represent the stars of " +
      "the constellation Ursa Major (the Great Bear / Big Dipper) and appear in the earliest designs; " +
      "the crown was added after 1544, when Charles I (Emperor Charles V) granted Madrid the titles " +
      "“Imperial and Crowned”. The crimson of the flag is the traditional colour of the old Crown of " +
      "Castile.",
    sources: [
      {
        title: "Coat of arms of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Madrid",
      },
      {
        title: "Flag of the City of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Madrid",
      },
    ],
  },
};
