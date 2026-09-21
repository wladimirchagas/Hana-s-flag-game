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
  /** True when the polity's borders are a modern administrative stand-in rather
   *  than a boundary sourced for the period. */
  approximateExtent?: boolean;
  /** Set when the upstream dataset draws this polity for the WRONG DATE — the borders
   *  or the very existence of the entity are anachronistic for this era. We do not
   *  redraw them (that would mean inventing a boundary), so the panel says so instead.
   *  Sourced in src/data/polityExistence.ts; enforced by check-era-anachronism.mjs. */
  datingCaveat?: { issue: string; actual: string };
};

export type EntitySummaryProps = ModernSummaryProps | HistoricalSummaryProps;

function formatHistoricalPop(n: number): string {
  return `${formatPopulation(n)} (peak)`;
}

function formatCurrency(c: { code: string; name: string; symbol?: string }) {
  return c.symbol ? `${c.name} (${c.symbol})` : c.name;
}

function formatGdpScale(num: number): string {
  if (num >= 1e12) {
    const val = num / 1e12;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} trillion`;
  }
  if (num >= 1e9) {
    const val = num / 1e9;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} billion`;
  }
  if (num >= 1e6) {
    const val = num / 1e6;
    return `${val >= 10 ? val.toFixed(1) : val.toFixed(2)} million`;
  }
  return num.toLocaleString("en-US");
}

function formatGdpRow(c: Country): string | null {
  if (!c.gdpUsd && !c.gdpLcu) return null;
  const curr = c.currencies?.[0];
  const symbol = curr?.symbol || "";
  const code = curr?.code || "";

  const formattedUsd = c.gdpUsd ? `$${formatGdpScale(c.gdpUsd)}` : null;
  const isUsdCurrency = code === "USD" || (symbol === "$" && (c.code === "US" || c.code === "EC" || c.code === "SV" || c.code === "PA" || c.code === "PW" || c.code === "FM" || c.code === "MH" || c.code === "TL"));

  if (!c.gdpLcu || isUsdCurrency || Math.abs(c.gdpLcu - (c.gdpUsd || 0)) / (c.gdpUsd || 1) < 0.001) {
    return formattedUsd ? `${formattedUsd} USD` : null;
  }

  const lcuScale = formatGdpScale(c.gdpLcu);
  const formattedLcu = symbol ? `${symbol}${lcuScale}` : `${lcuScale} ${code}`;

  if (formattedUsd) {
    return `${formattedLcu} (${formattedUsd} USD)`;
  }
  return formattedLcu;
}

function formatGdpPerCapitaRow(c: Country): string | null {
  if (!c.gdpPerCapitaUsd && !c.gdpPerCapitaLcu) return null;
  const curr = c.currencies?.[0];
  const symbol = curr?.symbol || "";
  const code = curr?.code || "";

  const usdNum = c.gdpPerCapitaUsd ? Math.round(c.gdpPerCapitaUsd).toLocaleString("en-US") : null;
  const formattedUsd = usdNum ? `$${usdNum}` : null;
  const isUsdCurrency = code === "USD" || (symbol === "$" && (c.code === "US" || c.code === "EC" || c.code === "SV" || c.code === "PA" || c.code === "PW" || c.code === "FM" || c.code === "MH" || c.code === "TL"));

  if (!c.gdpPerCapitaLcu || isUsdCurrency || Math.abs(c.gdpPerCapitaLcu - (c.gdpPerCapitaUsd || 0)) / (c.gdpPerCapitaUsd || 1) < 0.001) {
    return formattedUsd ? `${formattedUsd} USD` : null;
  }

  const lcuNum = Math.round(c.gdpPerCapitaLcu).toLocaleString("en-US");
  const formattedLcu = symbol ? `${symbol}${lcuNum}` : `${lcuNum} ${code}`;

  if (formattedUsd) {
    return `${formattedLcu} (${formattedUsd} USD)`;
  }
  return formattedLcu;
}

function formatRankChange(rc?: number): string {
  if (rc === undefined) return "";
  if (rc > 0) return ` (+${rc})`;
  if (rc < 0) return ` (${rc})`;
  return " (=)";
}

function formatDemocracyIndex(idx?: { year: number; rating: string; rank: number; rankChange?: number }): string | null {
  if (!idx) return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} (${idx.year})`;
}

/** CPI shows the 0–100 score (the index’s primary figure), not the map score-band. */
function formatCpiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score} (${idx.year})`;
}

/** DPI shows tier + Index Score (net % positive − % negative). */
function formatPerceptionIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  const scoreStr = idx.score > 0 ? `+${idx.score}` : `${idx.score}`;
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${scoreStr} (${idx.year})`;
}

/** WJP shows the 0–1 overall score (the index’s primary figure), not the map band. */
function formatWjpIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(2)} (${idx.year})`;
}

/** HDI shows the 0–1 score (the index’s primary figure) plus the UNDP category. */
function formatHdiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)} (${idx.year})`;
}

/** WEF Global Gender Gap Index — published 0–1 parity score. */
function formatGenderGapIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(3)} (${idx.year})`;
}

/** GPI shows State of Peace band + overall score (lower = more peaceful). */
function formatGpiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.rating} · ${idx.score.toFixed(3)} (${idx.year})`;
}


/** WHR shows the Cantril ladder score (0–10), the index’s primary figure. */
function formatHappinessIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · Score ${idx.score.toFixed(3)} (${idx.year})`;
}

/** Lowy Global Diplomacy Index — total diplomatic posts abroad. */
function formatGdiIndex(idx?: {
  year: number;
  rating: string;
  rank: number;
  rankChange?: number;
  score?: number;
}): string | null {
  if (!idx || typeof idx.score !== "number") return null;
  const changeStr = formatRankChange(idx.rankChange);
  return `Rank ${idx.rank}${changeStr} · ${idx.score} posts (${idx.year})`;
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
    if (c.callingCode) rows.push({ label: "Calling code", value: c.callingCode });
    if (c.tld && c.tld.length > 0)
      rows.push({
        label: c.tld.length === 1 ? "Internet domain" : "Internet domains",
        value: c.tld.join(", "),
      });

    const gdpVal = formatGdpRow(c);
    if (gdpVal) rows.push({ label: "GDP", value: gdpVal });

    const gdpCapVal = formatGdpPerCapitaRow(c);
    if (gdpCapVal) rows.push({ label: "GDP per capita", value: gdpCapVal });

    if (c.democracy) {
      const fh = formatDemocracyIndex(c.democracy.freedomHouse);
      if (fh) rows.push({ label: "Freedom House", value: fh });

      const vdem = formatDemocracyIndex(c.democracy.vDem);
      if (vdem) rows.push({ label: "V-Dem", value: vdem });

      const econ = formatDemocracyIndex(c.democracy.economist);
      if (econ) rows.push({ label: "The Economist", value: econ });

      const cpi = formatCpiIndex(c.democracy.cpi);
      if (cpi) rows.push({ label: "Corruption Perceptions Index", value: cpi });

      const dpi = formatPerceptionIndex(c.democracy.perception);
      if (dpi) rows.push({ label: "Democracy Perception Index", value: dpi });

      const rsf = formatDemocracyIndex(c.democracy.rsfPress);
      if (rsf) rows.push({ label: "RSF Press Freedom", value: rsf });

      const wjp = formatWjpIndex(c.democracy.wjpRuleOfLaw);
      if (wjp) rows.push({ label: "WJP Rule of Law Index", value: wjp });

      const hdi = formatHdiIndex(c.democracy.hdi);
      if (hdi) rows.push({ label: "Human Development Index", value: hdi });

      const gggi = formatGenderGapIndex(c.democracy.genderGap);
      if (gggi) rows.push({ label: "Global Gender Gap Index", value: gggi });

      const gpi = formatGpiIndex(c.democracy.gpi);
      if (gpi) rows.push({ label: "Global Peace Index", value: gpi });

      const whr = formatHappinessIndex(c.democracy.happiness);
      if (whr) rows.push({ label: "World Happiness Report", value: whr });

      const gdi = formatGdiIndex(c.democracy.gdi);
      if (gdi) rows.push({ label: "Global Diplomacy Index", value: gdi });
    }

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
  // Never present a schematic boundary as if it were sourced — the map draws these
  // dashed, and the fact sheet says why.
  if (h.approximateExtent)
    rows.push({
      label: "Borders",
      value: "Approximate — drawn along modern administrative boundaries",
    });
  // A known anachronism in the source data. Disclosing it is the honest alternative to
  // inventing the correct borders — the same discipline as "a missing flag beats a wrong one".
  if (h.datingCaveat)
    rows.push({
      label: "Dating",
      value: `${h.datingCaveat.issue} ${h.datingCaveat.actual}`,
    });
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
