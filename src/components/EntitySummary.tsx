import { GOVERNMENT_TYPES } from "../lib/governmentTypes";
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
 * partially-known entity still looks tidy.
 */

export type ModernSummaryProps = {
  kind: "modern";
  country: Country;
};

export type HistoricalSummaryProps = {
  kind: "historical";
  region?: string;
  note?: string;
  population?: number;
};

export type EntitySummaryProps = ModernSummaryProps | HistoricalSummaryProps;

function formatModernPop(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const rounded = m >= 10 ? Math.round(m) : Math.round(m * 10) / 10;
    return `~${rounded} M`;
  }
  if (n >= 1_000) return `~${Math.round(n / 1_000)} k`;
  return n.toLocaleString();
}

function formatHistoricalPop(n: number): string {
  return `${formatModernPop(n)} (peak)`;
}

function formatCurrency(c: { code: string; name: string; symbol?: string }) {
  return c.symbol ? `${c.name} (${c.symbol})` : c.name;
}

export function EntitySummary(props: EntitySummaryProps) {
  if (props.kind === "modern") {
    const c = props.country;
    const government = GOVERNMENT_TYPES[c.code];
    const rows: { label: string; value: React.ReactNode }[] = [];
    if (c.subregion) rows.push({ label: "Region", value: c.subregion });
    if (c.nameOfficial && c.nameOfficial !== c.name)
      rows.push({ label: "Official name", value: c.nameOfficial });
    if (c.capital) rows.push({ label: "Capital", value: c.capital });
    if (typeof c.population === "number")
      rows.push({ label: "Population", value: formatModernPop(c.population) });
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
    return <SummaryList rows={rows} />;
  }

  // Historical — sparser, with the curated note shown above the fact list.
  const h = props;
  const rows: { label: string; value: React.ReactNode }[] = [];
  if (h.region) rows.push({ label: "Region", value: h.region });
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
}: {
  rows: { label: string; value: React.ReactNode }[];
}) {
  if (rows.length === 0) return null;
  return (
    <dl className="entity-summary">
      {rows.map((r) => (
        <div className="entity-summary__row" key={r.label}>
          <dt className="entity-summary__label">{r.label}</dt>
          <dd className="entity-summary__value">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
