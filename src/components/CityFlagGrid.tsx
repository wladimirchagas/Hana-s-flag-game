import { useMemo } from "react";
import { AutoFitName } from "./AutoFitName";
import { countryCityFlags } from "../lib/cityFlags";

/**
 * "Capital cities" tab of the sub-national drill-down grid.
 *
 * Shows every available capital-city flag for the country (see
 * `countryCityFlags` — authoritative, name-confirmed capital-flag data only).
 * Two kinds of entry, routed to two different selection callbacks:
 *  - "subdivision": this capital IS a subdivision's own capital. Selecting it
 *    drills into that subdivision AND reveals the capital, exactly like
 *    picking the subdivision then tapping "View capital".
 *  - "national": a NATIONAL capital that heads no subdivision (Ottawa,
 *    Pretoria, Amsterdam …) and isn't already any subdivision's own capital.
 *    Selecting it opens the same standalone national-capital panel the
 *    hierarchy chart's "National capital" leaf opens — there is no
 *    subdivision to drill into.
 */
type Props = {
  countryCode: string;
  countryName: string;
  /** The subdivision code whose capital is currently shown (if any). */
  selectedCode: string | null;
  /** True when the "View capital" drill-down is open for the selected code. */
  capitalActive: boolean;
  /** Name of the selected standalone national capital (if any). */
  activeNationalCapital?: string | null;
  baseUrl: string;
  onSelect: (code: string) => void;
  onSelectNational: (cap: { name: string; note: string | null; flagPath: string | null }) => void;
};

export function CityFlagGrid({
  countryCode,
  countryName,
  selectedCode,
  capitalActive,
  activeNationalCapital,
  baseUrl,
  onSelect,
  onSelectNational,
}: Props) {
  const entries = useMemo(() => countryCityFlags(countryCode), [countryCode]);

  if (entries.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced city flags are available for {countryName} yet.
      </p>
    );
  }

  return (
    <ul className="flag-grid__list">
      {entries.map((entry) => {
        const active =
          entry.kind === "national"
            ? activeNationalCapital === entry.capitalName
            : capitalActive && entry.code === selectedCode;
        const handleClick =
          entry.kind === "national"
            ? () =>
                onSelectNational({
                  name: entry.capitalName,
                  note: entry.note ?? null,
                  flagPath: entry.flagPath,
                })
            : () => onSelect(entry.code);
        const label =
          entry.kind === "national"
            ? `Select ${entry.capitalName}, national capital of ${countryName}`
            : `Select ${entry.capitalName}, capital of ${entry.subdivisionName}`;
        return (
          <li key={entry.code} className="flag-grid__item">
            <button
              type="button"
              className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
              onClick={handleClick}
              aria-pressed={active}
              aria-label={label}
            >
              <span className="flag-grid__thumb">
                <img
                  src={`${baseUrl}${entry.flagPath}`}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="flag-grid__thumb-img"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </span>
              <span className="flag-grid__name">
                <AutoFitName className="flag-grid__name-text" text={entry.capitalName} />
                <span className="flag-grid__city-sub">{entry.subdivisionName}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
