/**
 * Sourced flag-meaning explanations for the Learn-mode flag widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` as a progressive-disclosure
 * ("What this flag means") expander below the flag image, for BOTH national
 * flags (keyed by ISO 3166-1 alpha-2, e.g. "BR") and subnational flags (keyed
 * by ISO 3166-2 subdivision code, e.g. "GB-SCT").
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * `scripts/check-flag-meanings.mjs` (run by `npm run flags:check` + CI) fails
 * the build if an entry has no description, no source, a source without a valid
 * http(s) URL, or a malformed myth. The check is a safety net, not a substitute
 * for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set (same philosophy as the city
 * overlay's test set) — a flag with no entry simply renders no disclosure.
 */

export interface FlagMeaningSource {
  /** Human-readable citation title, e.g. "Flag of Brazil — Wikipedia". */
  title: string;
  /** Authoritative URL. Must be a real http(s) link. */
  url: string;
  /** Optional publisher, e.g. "Government of South Africa". */
  publisher?: string;
}

export interface FlagMyth {
  /** The widely-believed but false, unproven, or retro-fitted claim. */
  claim: string;
  /** What the cited record actually says. */
  reality: string;
}

export interface FlagMeaning {
  /** Factual description of the design and its documented symbolism. */
  description: string;
  /** Myth-vs-fact notes. Optional, but where a well-known myth exists it MUST live here. */
  myths?: FlagMyth[];
  /** At least one authoritative citation (enforced non-empty). */
  sources: FlagMeaningSource[];
}

export const FLAG_MEANINGS: Record<string, FlagMeaning> = {
  // ── National flags ──────────────────────────────────────────────────────
  BR: {
    description:
      "A blue disc depicting a starry sky (which includes the Southern Cross) spanned by a " +
      "curved white band bearing the national motto “Ordem e Progresso” (“Order and " +
      "Progress”), set within a yellow rhombus on a green field. When the republic was " +
      "proclaimed in 1889 the green field and yellow rhombus were kept from the previous imperial " +
      "flag (slightly modified in hue and shape); a blue circle of white five-pointed stars " +
      "replaced the arms of the Empire. The star pattern reflects the sky over Rio de Janeiro on " +
      "the morning of 15 November 1889, each star stands for a Brazilian federal unit, and each is " +
      "sized by the apparent magnitude of the real star it represents. The motto derives from " +
      "Auguste Comte’s positivist maxim, “L’amour pour principe et l’ordre pour " +
      "base; le progrès pour but” (“Love as a principle and order as the basis; " +
      "progress as the goal”).",
    myths: [
      {
        claim: "The green stands for Brazil’s forests and the yellow for its gold.",
        reality:
          "A nationalist reinterpretation deliberately popularised in 1889 to erase the flag’s " +
          "monarchical origin. The colours were inherited from the imperial flag, where the green " +
          "represented the House of Braganza of Emperor Pedro I and the yellow the House of Habsburg " +
          "of his wife, Empress Maria Leopoldina.",
      },
    ],
    sources: [
      { title: "Flag of Brazil — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brazil" },
    ],
  },

  JP: {
    description:
      "The Nisshōki (“sun-mark flag”), popularly called the Hinomaru (“circle of " +
      "the sun”): a white field bearing a single crimson-red disc in the centre. The disc " +
      "represents the sun, echoing Japan’s name Nihon/Nippon, “origin of the sun” or " +
      "“Land of the Rising Sun,” and its long association with the sun goddess Amaterasu. " +
      "The design has been used on banners for centuries and was designated the national merchant " +
      "flag in 1870; it was given statutory status as the national flag in 1999.",
    sources: [
      { title: "Flag of Japan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Japan" },
    ],
  },

  FR: {
    description:
      "A vertical tricolour of blue, white and red. Blue and red are the traditional colours of " +
      "Paris; white was the colour of the House of Bourbon and the king. The flag arose from the " +
      "revolutionary cockade of 1789, which combined the blue and red of the Paris militia with the " +
      "royal white, and was fixed in its modern vertical form during the French Revolution.",
    myths: [
      {
        claim:
          "The three colours stand for the revolutionary ideals liberté (blue), égalité " +
          "(white) and fraternité (red).",
        reality:
          "A popular later association, not the flag’s documented origin: the colours come from " +
          "the Paris cockade (blue and red) combined with the royal/Bourbon white.",
      },
    ],
    sources: [
      { title: "Flag of France — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_France" },
    ],
  },

  US: {
    description:
      "Thirteen horizontal red-and-white stripes for the thirteen original colonies, and a blue " +
      "canton (the “union”) bearing fifty white five-pointed stars, one for each state. As " +
      "states were admitted the number of stars grew, while the stripe count returned to thirteen in " +
      "1818 to honour the founding colonies.",
    myths: [
      {
        claim:
          "The red officially means valour, the white purity, and the blue vigilance/justice on the " +
          "flag.",
        reality:
          "Those meanings were assigned by Charles Thomson to the colours of the Great Seal in 1782, " +
          "not to the flag. No symbolic meaning for the flag’s colours was recorded when it was " +
          "adopted in 1777.",
      },
    ],
    sources: [
      {
        title: "Flag of the United States — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_States",
      },
    ],
  },

  CA: {
    description:
      "The Maple Leaf flag: a red field with a white square (a “Canadian pale”) at its " +
      "centre bearing a single red eleven-pointed maple leaf. Red and white had been proclaimed " +
      "Canada’s official colours by King George V in 1921, and the maple leaf is a long-standing " +
      "national emblem. The flag was adopted in 1965.",
    myths: [
      {
        claim: "The maple leaf’s eleven points stand for provinces, territories, or other entities.",
        reality:
          "The number of points has no symbolic meaning. An eleven-point leaf was chosen because it " +
          "stayed clearest and least blurred in wind-tunnel tests of the design.",
      },
    ],
    sources: [
      { title: "Flag of Canada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Canada" },
    ],
  },

  IN: {
    description:
      "The Tiranga (“tricolour”): horizontal bands of saffron (top), white (middle) and " +
      "India green (bottom), with a navy-blue 24-spoke Ashoka Chakra (wheel of dharma) at the " +
      "centre. In the interpretation given to the Constituent Assembly by S. Radhakrishnan, the " +
      "saffron denotes courage and sacrifice, the white peace and truth, and the green faith and " +
      "growth, while the chakra represents law, righteousness and ceaseless motion.",
    myths: [
      {
        claim: "The saffron band represents Hindus and the green band represents Muslims.",
        reality:
          "The Constituent Assembly explicitly rejected any communal or religious reading of the " +
          "colours, stressing that the flag has no such meaning.",
      },
    ],
    sources: [
      { title: "Flag of India — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_India" },
    ],
  },

  ZA: {
    description:
      "A horizontal bicolour of red (top) and blue (bottom) separated by a central green " +
      "horizontal Y (a “pall”) bordered in white, with a black triangle bordered in gold " +
      "at the hoist. Adopted in 1994, its converging Y-shape is officially described as symbolising " +
      "the coming together of the country’s diverse peoples and their shared road ahead.",
    myths: [
      {
        claim: "Each colour of the South African flag has a specific official meaning.",
        reality:
          "The South African government states that no universal symbolism is attached to the " +
          "individual colours; only the converging design carries an official meaning.",
      },
    ],
    sources: [
      {
        title: "National flag — Government of South Africa",
        url: "https://www.gov.za/about-sa/national-symbols/national-flag",
        publisher: "Government of South Africa",
      },
      { title: "Flag of South Africa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Africa" },
    ],
  },

  IE: {
    description:
      "A vertical tricolour of green, white and orange. In the flag’s official symbolism the " +
      "green represents the Gaelic and Roman Catholic tradition of Ireland, the orange represents " +
      "the followers of William of Orange (Irish Protestants and unionists), and the white between " +
      "them signifies a lasting peace and truce between the two traditions. It was introduced by " +
      "Thomas Francis Meagher in 1848.",
    sources: [
      { title: "Flag of Ireland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ireland" },
    ],
  },

  // ── Subnational flags (keyed by ISO 3166-2 code) ────────────────────────
  "GB-SCT": {
    description:
      "The Saltire, or Saint Andrew’s Cross: a white diagonal cross on a blue field. Saint " +
      "Andrew, Scotland’s patron saint, is traditionally said to have been martyred on an " +
      "X-shaped cross, which the flag depicts. It is one of the oldest national flags still in use.",
    myths: [
      {
        claim:
          "The flag originates from a white saltire appearing in the sky before the Battle of " +
          "Athelstaneford in 832.",
        reality:
          "This is a founding legend, not verified history: King Óengus is said to have seen " +
          "white saltire-shaped clouds against the blue sky and taken them as Saint Andrew’s " +
          "blessing before victory. The story is recorded only in much later sources.",
      },
    ],
    sources: [
      { title: "Flag of Scotland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Scotland" },
    ],
  },

  "GB-WLS": {
    description:
      "Y Ddraig Goch (“the Red Dragon”): a red dragon passant on a field divided white " +
      "over green. The red dragon is an ancient emblem of Wales, linked in medieval legend to the " +
      "tale of the fighting red and white dragons and to the kings of Gwynedd; the white-and-green " +
      "field are the livery colours of the Tudor dynasty. It was granted official status in 1959.",
    sources: [
      { title: "Flag of Wales — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wales" },
    ],
  },

  "US-TX": {
    description:
      "The Lone Star Flag: a blue vertical band at the hoist bearing a single white five-pointed " +
      "star, beside two horizontal bars, white over red. The single star gives Texas its nickname, " +
      "the “Lone Star State.” The design was adopted by the Republic of Texas in 1839.",
    myths: [
      {
        claim: "The colours officially mean loyalty (blue), purity (white) and bravery (red).",
        reality:
          "This interpretation is popular but was not part of the 1839 law that adopted the flag; " +
          "the statute assigned no meaning to the colours. The meanings were attached later by " +
          "custom.",
      },
    ],
    sources: [
      { title: "Flag of Texas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Texas" },
    ],
  },
};

/** True when a sourced flag-meaning explanation exists for the given code. */
export function hasFlagMeaning(code: string | null | undefined): boolean {
  return !!code && code in FLAG_MEANINGS;
}
