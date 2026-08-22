import { capitalDetail, distinctCapitalFlagPath } from "../lib/capitalInfo";
import { CAPITAL_ENDONYMS } from "../data/capitalEndonyms";
import { NATIONAL_REFERENCE_POPULATION } from "../data/subdivisionPopulation";
import { formatPopulation } from "../lib/formatPopulation";
import { FlagMeaning } from "./FlagMeaning";
import { CITY_FLAG_MEANINGS } from "../data/cityFlagMeanings";

/**
 * "View capital" drill-down body for the Learn-mode sub-national panel.
 *
 * Shows the selected subdivision's capital city: its name, a city-proper
 * population estimate with the share it represents of the NATIONAL population
 * (in parentheses, per the owner request), and — where bundled — the city's own
 * flag. Every figure and flag is authoritative (Wikidata / Wikimedia Commons)
 * and is only shown when confirmed to belong to the displayed capital (see
 * src/lib/capitalInfo.ts). Rows render only when their data exists, exactly like
 * the country and subdivision fact-sheets.
 */

/** Possessive form of a country name ("Australia" → "Australia's"). */
function possessive(name: string): string {
  return /s$/i.test(name) ? `${name}'` : `${name}'s`;
}

function shareLabel(part: number, whole: number | undefined): string | null {
  if (!whole || whole <= 0) return null;
  const share = (part / whole) * 100;
  const rounded =
    share >= 10
      ? Math.round(share)
      : share >= 1
        ? Math.round(share * 10) / 10
        : Math.round(share * 100) / 100;
  return `~${rounded}%`;
}

export function CapitalDetails({
  code,
  capitalName,
  countryCode,
  countryName,
  nationalPopulation,
  baseUrl,
  onEnlarge,
}: {
  code: string;
  capitalName: string;
  countryCode: string;
  countryName: string;
  nationalPopulation?: number;
  baseUrl: string;
  onEnlarge: (url: string) => void;
}) {
  const detail = capitalDetail(code, capitalName);
  // Show the capital's flag ONLY when it is DISTINCT from the subdivision's own
  // flag. A city-territory (Kuala Lumpur, Canberra ≡ ACT) or a shared coat-of-arms
  // capital (Brasília ≡ Distrito Federal) flies the same image as its subdivision,
  // which the panel above already shows — repeating it here is the duplication the
  // hierarchy chart avoids with a "—". So those render with no flag box.
  const flagRel = distinctCapitalFlagPath(code, capitalName);
  const flagUrl = flagRel ? `${baseUrl}${flagRel}` : null;

  // Prefer the live national figure (kept current by the country widget); fall
  // back to the same bundled reference the subdivision panel uses so the share
  // still renders when the live source is blocked.
  const denominator =
    nationalPopulation && nationalPopulation > 0
      ? nationalPopulation
      : NATIONAL_REFERENCE_POPULATION[countryCode];

  const popDetail =
    detail?.population != null
      ? [
          shareLabel(detail.population, denominator)
            ? `${shareLabel(detail.population, denominator)} of ${possessive(countryName)} population`
            : null,
          detail.year != null ? `${detail.year} ${detail.basis ?? "estimate"}` : null,
        ]
          .filter(Boolean)
          .join(", ")
      : null;

  return (
    <>
      <dl className="entity-summary">
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Capital</dt>
          <dd className="entity-summary__value">{capitalName}</dd>
        </div>
        {CAPITAL_ENDONYMS[code] && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Local name</dt>
            <dd className="entity-summary__value">{CAPITAL_ENDONYMS[code]}</dd>
          </div>
        )}
        {detail?.population != null && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Population</dt>
            <dd className="entity-summary__value">
              {formatPopulation(detail.population)}
              {popDetail ? ` (${popDetail})` : ""}
            </dd>
          </div>
        )}
      </dl>
      {flagUrl && (
        <div className="learn-fs__flag-box">
          <div className="learn-fs__flag-head">
            <span className="entity-summary__label learn-fs__flag-label">Flag</span>
            <button
              type="button"
              className="learn-fs__flag"
              onClick={() => onEnlarge(flagUrl)}
              aria-label={`Enlarge ${capitalName} flag`}
            >
              <img
                key={flagUrl}
                src={flagUrl}
                alt=""
                className="learn-fs__flag-img"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.closest("button")?.remove();
                }}
              />
              <span className="learn-fs__flag-hint" aria-hidden="true">
                ⤢ Click to enlarge
              </span>
            </button>
          </div>
          {/* City-flag explainer — same progressive-disclosure component, look
              and feel as the national/subnational "What this flag means" panel,
              keyed by the subdivision code whose capital flag is shown. */}
          <FlagMeaning code={code} meanings={CITY_FLAG_MEANINGS} />
        </div>
      )}
      {detail?.population == null && !flagUrl && (
        <p className="learn-fs__subdiv-prompt">
          No further sourced data is available for this capital yet.
        </p>
      )}
    </>
  );
}
