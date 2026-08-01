import { GOVERNMENT_TYPES } from "../lib/governmentTypes";
import { formatPopulation } from "../lib/formatPopulation";
import { NATIONAL_REFERENCE_POPULATION } from "../data/subdivisionPopulation";
import { COUNTRY_ENDONYMS } from "../data/countryEndonyms";
import type { Country } from "../api/countries";

/**
 * Structured "fact-sheet" view of an entity for the Learn-mode panel.
 *
 * For modern countries we pull the rich REST Countries fields (capital,
 * official name, currencies, languages, …) plus a curated government
 * type. For historical polities the fields are sparser — just region,
 * note, peak-population — but the same `<dl>` layout is reused for
 * visual consistency.
 *
 * Each row only renders when the underlying data is present, so a
 * partially-known entity still looks tidy. The rows are ALWAYS visible —
 * there is no collapse/disclosure (a hard rule: the fact-sheet is a
 * reference, not something the user should have to expand).
 */

export type ModernSummaryProps = {
  kind: "modern";
  country: Country;
  /** Extra content rendered at the bottom of the fact list — e.g. the
   *  National Anthem row. */
  footer?: React.ReactNode;
};

export type HistoricalSummaryProps = {
  kind: "historical";
  region?: string;
  note?: string;
  population?: number;
  /** Ruling power, from the era GeoJSON's own SUBJECTO field. */
  ruledBy?: string;
};

export type EntitySummaryProps = ModernSummaryProps | HistoricalSummaryProps;

function formatHistoricalPop(n: number): string {
  return `${formatPopulation(n)} (peak)`;
}

function formatCurrency(c: { code: string; name: string; symbol?: string }) {
  return c.symbol ? `${c.name} (${c.symbol})` : c.name;
}

export function EntitySummary(props: EntitySummaryProps) {
  if (props.kind === "modern") {
    const c = props.country;
    const government = GOVERNMENT_TYPES[c.code];
    const rows: { label: string; value: React.ReactNode }[] = [];
    if (c.nameOfficial && c.nameOfficial !== c.name)
      rows.push({ label: "Name", value: c.nameOfficial });
    // Local (native-language) name, shown above the population where it differs
    // from the English exonym the app uses (e.g. Germany → Deutschland).
    const endonym = COUNTRY_ENDONYMS[c.code];
    if (endonym) rows.push({ label: "Local name", value: endonym });
    // Population sits ABOVE Capital and is ALWAYS shown: the live World Bank /
    // REST figure wins, but a bundled reference (NATIONAL_REFERENCE_POPULATION,
    // latest dated country-level P1082) fills in when the live source is blocked
    // or slow, so the row never disappears.
    const pop =
      typeof c.population === "number"
        ? c.population
        : NATIONAL_REFERENCE_POPULATION[c.code];
    if (typeof pop === "number")
      rows.push({ label: "Population", value: formatPopulation(pop) });
    if (c.capital) rows.push({ label: "Capital", value: c.capital });
    if (c.languages && c.languages.length > 0)
      rows.push({
        label: c.languages.length === 1 ? "Language" : "Languages",
        value: c.languages.slice(0, 4).join(", "),
      });
    if (c.currencies && c.currencies.length > 0)
      rows.push({
        label: c.currencies.length === 1 ? "Currency" : "Currencies",
        value: c.currencies.map(formatCurrency).join(", "),
      });
    if (government) rows.push({ label: "Government", value: government });
    // Continent + Region shown last (the country name now lives in the search
    // bar at the top of the widget, and its continent/region moved here).
    if (c.continent) rows.push({ label: "Continent", value: c.continent });
    if (c.subregion) rows.push({ label: "Region", value: c.subregion });
    return <SummaryList rows={rows} footer={props.footer} />;
  }

  // Historical — sparser, with the curated note shown above the fact list.
  const h = props;
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (h.region) rows.push({ label: "Region", value: h.region });
  // Who governed this territory at the era's date — real information the dataset
  // carries on every feature and the app used to discard.
  if (h.ruledBy) rows.push({ label: "Ruled by", value: h.ruledBy });
  if (typeof h.population === "number")
    rows.push({ label: "Population", value: formatHistoricalPop(h.population) });

  return (
    <>
      {h.note && <p className="entity-summary__note">{h.note}</p>}
      <SummaryList rows={rows} />
    </>
  );
}

function SummaryList({
  rows,
  footer,
}: {
  rows: { label: string; value: React.ReactNode }[];
  footer?: React.ReactNode;
}) {
  if (rows.length === 0 && !footer) return null;

  // The footer (e.g. the Anthem row) renders INSIDE the same <dl> so it aligns
  // with the fact rows — same label column + value column, no separate box.
  return (
    <dl className="entity-summary">
      {rows.map((r) => (
        <div className="entity-summary__row" key={r.label}>
          <dt className="entity-summary__label">{r.label}</dt>
          <dd className="entity-summary__value">{r.value}</dd>
        </div>
      ))}
      {footer}
    </dl>
  );
}
