import type { FlagMeaning } from "./flagMeanings";
import type { NationalFlag } from "./nationalFlags";

/**
 * Collective flags that belong to a WHOLE subdivision-type group rather than to
 * any one subdivision or to the country as a whole — a flag flown only when the
 * members of that group are represented together.
 *
 * The reference case is Malaysia's "Flag of the Federal Territories": it is NOT
 * a national flag (it never flies for Malaysia — the Jalur Gemilang does that),
 * and it is NOT the flag of Kuala Lumpur, Labuan or Putrajaya individually (each
 * keeps its own). It is the flag of the three Federal Territories *as a group*,
 * carrying three stars for the three of them. So it does not belong in the
 * National-symbols tab; it belongs in the hierarchy, sitting above the three
 * territory cards it represents (owner request, 2026-08).
 *
 * Keyed by ISO 3166-1 alpha-2, then matched to a group by its `typeLabel` (the
 * SAME label `SUBDIVISION_META` gives those subdivisions, so the hierarchy can
 * attach the flag to the right group without any per-country special-casing).
 *
 * Sourcing is identical to every other flag/meaning here: the image is bundled
 * (`public/subdivision-group-flags/…`, moved verbatim from the national-flags
 * pipeline), the years and design come from an authoritative source, and the
 * `meaning` is the sourced explainer — never fabricated. The flag reuses the
 * `NationalFlag` shape so the SAME `NationalFlagDetails` widget renders it when
 * it is selected in the hierarchy.
 */
export type SubdivisionGroupFlag = {
  /** The subdivision `typeLabel` whose group this collective flag heads. */
  readonly typeLabel: string;
  /** The flag itself, widget-ready (opens `NationalFlagDetails`). */
  readonly flag: NationalFlag;
  /** Sourced "What this flag means" explainer, shown in the flag's widget. */
  readonly meaning?: FlagMeaning;
};

export const SUBDIVISION_GROUP_FLAGS: Record<string, readonly SubdivisionGroupFlag[]> = {
  MY: [
    {
      typeLabel: "Federal Territory",
      flag: {
        id: "my-federal-territories",
        category: "official",
        name: "Flag of the Federal Territories",
        from: 2006,
        to: 9999,
        path: "subdivision-group-flags/my-federal-territories.svg",
        design:
          "Three horizontal bands of yellow, blue and red bearing the coat of arms of Malaysia " +
          "with three stars below it — flown for Kuala Lumpur, Labuan and Putrajaya together, " +
          "not for the country.",
        source: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_Territories",
      },
      meaning: {
        description:
          "The three territories are governed directly by the federal government rather than by " +
          "any state, which is why the flag carries Malaysia's own coat of arms rather than a " +
          "state crest. The three stars below the arms are the three territories themselves — " +
          "Kuala Lumpur, Labuan and Putrajaya — and stand for their shared mission to be " +
          "administrative and business centres. Of the colours, yellow carries respect, " +
          "sovereignty and honour (yellow being the royal colour of the Malay rulers), red " +
          "carries strength, and blue carries unity, sincerity and harmony. The flag exists " +
          "because until 2006 the three territories had no flag of their own and flew the flag " +
          "of Kuala Lumpur between them, which the Minister of Federal Territories judged " +
          "inappropriate precisely because it did not show that there were three; the Cabinet " +
          "adopted this design, by a team from Universiti Teknologi MARA, on 26 April 2006. It " +
          "is flown only when the three are represented collectively — each territory keeps its " +
          "own flag otherwise.",
        sources: [
          {
            title: "Flag & Song — Ministry of Federal Territories",
            url: "https://www.kwp.gov.my/index.php/en/about-kwp/lagu-bendera",
          },
          {
            title: "Flag of the Federal Territories — Wikipedia",
            url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_Territories",
          },
        ],
      },
    },
  ],
};

/** The collective flag for a subdivision-type group, or null when none exists. */
export function subdivisionGroupFlag(
  countryCode: string,
  typeLabel: string,
): SubdivisionGroupFlag | null {
  const list = SUBDIVISION_GROUP_FLAGS[countryCode];
  if (!list) return null;
  return list.find((g) => g.typeLabel === typeLabel) ?? null;
}
