import {
  SUBDIVISION_POPULATION,
  NATIONAL_REFERENCE_POPULATION,
} from "../data/subdivisionPopulation";
import { formatPopulationShort } from "../lib/formatPopulation";

/**
 * Population fact-line for the Learn-mode subdivision panel.
 *
 * Renders the selected subdivision's total resident population, its share of
 * the national population, and the year/basis of the figure — e.g.
 *
 *   Population: 6.8 million (~26% of Australia's population, 2023 estimate)
 *
 * Renders nothing when no curated figure exists for the code, exactly like the
 * country fact-sheet rows that only appear when their data is present. The
 * national share is computed against the live national population passed in
 * (the same figure the country widget shows), and is omitted if that is absent.
 */

/** Possessive form of a country name ("Australia" → "Australia's"). */
function possessive(name: string): string {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`;
}

export function SubdivisionPopulation({
  code,
  countryCode,
  countryName,
  nationalPopulation,
}: {
  code: string;
  countryCode: string;
  countryName: string;
  nationalPopulation?: number;
}) {
  const entry = SUBDIVISION_POPULATION[code];
  if (!entry) return null;

  // Prefer the live national figure (kept current by the country widget); fall
  // back to the same-vintage bundled reference so the share still renders when
  // the live source is blocked or down.
  const denominator =
    nationalPopulation && nationalPopulation > 0
      ? nationalPopulation
      : NATIONAL_REFERENCE_POPULATION[countryCode];
  const share =
    denominator && denominator > 0 ? (entry.population / denominator) * 100 : null;
  const shareStr =
    share == null
      ? null
      : share >= 10
        ? Math.round(share)
        : share >= 1
          ? Math.round(share * 10) / 10
          : Math.round(share * 100) / 100;

  const detail = [
    shareStr != null ? `~${shareStr}% of ${possessive(countryName)} population` : null,
    `${entry.year} ${entry.basis}`,
  ]
    .filter(Boolean)
    .join(", ");

  // Rendered as an entity-summary row so the subdivision fact-sheet shares the
  // exact font + label-column alignment of the national country fact-sheet.
  return (
    <div className="entity-summary__row">
      <dt className="entity-summary__label">Population</dt>
      <dd className="entity-summary__value">
        {formatPopulationShort(entry.population)} ({detail})
      </dd>
    </div>
  );
}
