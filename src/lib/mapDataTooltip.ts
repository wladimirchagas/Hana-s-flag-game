import { COUNTRY_FACTS } from "../data/countryFacts.ts";
import {
  type DemocracyMapMode,
  DEMOCRACY_INDEX_META,
  formatDemocracyScoreValue,
  getDemocracyIndexFor,
  isWvsMapMode,
} from "./democracyColors.ts";
import {
  formatWvsSelectionShort,
  getWvsSociety,
  sumWvsAnswers,
} from "./wvsResults.ts";

/**
 * What the Learn-mode world map's hover / tap tooltip shows for one country
 * while the map is coloured by an index or a World Values Survey question.
 * Every field comes from the same bundled data the colour layer reads, so the
 * tooltip can never describe a different figure than the fill it sits on.
 */
export type MapDataTooltip = {
  /** Short name of what the map is coloured by ("Freedom in the World"). */
  measure: string;
  /** The country's own figure, formatted as the source reports it. Null when
   *  the source has no figure for this country. */
  value: string | null;
  /** The source's rating category, when it publishes one (indexes do; WVS
   *  percentages do not, so this stays null and only the value is shown). */
  category: string | null;
  /** The fill colour this country is painted with — the legend swatch. */
  color: string | null;
  /** The year of THIS country's figure. Indexes and WVS both vary by country
   *  (a WVS society may have been surveyed in 2018 or 2022). */
  year: number | null;
};

function formatPct(n: number): string {
  return `${Number.isInteger(n) ? n : n.toFixed(1)}%`;
}

/**
 * Tooltip data for `code` under the active map colour `mode`. Returns null only
 * when no data layer is active; a country the source does not cover still gets
 * an entry (value null) so the tooltip can say so honestly rather than vanish.
 */
export function getMapDataTooltip(
  mode: DemocracyMapMode,
  code: string,
  overlay: ReadonlyMap<string, string> | null,
): MapDataTooltip | null {
  if (!mode) return null;
  const color = overlay?.get(code) ?? null;

  if (isWvsMapMode(mode)) {
    const measure = formatWvsSelectionShort(mode);
    const sum = sumWvsAnswers(code, mode);
    if (sum == null) {
      return { measure, value: null, category: null, color: null, year: null };
    }
    return {
      measure,
      value: formatPct(sum),
      category: null,
      color,
      year: getWvsSociety(code)?.year ?? null,
    };
  }

  const measure = DEMOCRACY_INDEX_META[mode].name;
  const idx = getDemocracyIndexFor(COUNTRY_FACTS[code]?.democracy, mode);
  if (!idx) {
    return { measure, value: null, category: null, color: null, year: null };
  }
  return {
    measure,
    value: formatDemocracyScoreValue(mode, idx),
    category: idx.rating || null,
    color,
    year: idx.year ?? null,
  };
}
