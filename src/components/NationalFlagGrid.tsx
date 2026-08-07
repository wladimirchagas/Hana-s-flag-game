import { useMemo } from "react";
import { AutoFitName } from "./AutoFitName";
import { NATIONAL_FLAGS, type NationalFlag, type NationalFlagCategory } from "../data/nationalFlags";
import { flagYearLabel } from "../lib/nationalFlags";

/**
 * "National flags" tab of the country drill-down grid.
 *
 * Shows every flag the country itself flies, beyond its sub-national ones —
 * grouped into sourced categories, each hidden when the country has none:
 *
 *   Historical flags   every national flag it has flown, newest first, the current
 *                      one included; the label carries the year each was introduced.
 *                      This section reaches back BEFORE independence, so it also holds
 *                      colonial-era flags — Portugal's royal banners over Brazil, the
 *                      Union Flag over Australia. Every one of those carries a
 *                      "Under {power}" badge (`flag.sovereign`), because a colonial
 *                      flag shown bare would read as a flag of the independent country.
 *   Official flags     additional flags with official national status (Australia's
 *                      Aboriginal and Torres Strait Islander flags).
 *   Military flags     service flags — army, navy, air force, marine corps.
 *   Maritime flags     ensigns and jacks.
 *   Standards          head-of-state / head-of-government standards.
 *   Civil & state      where the flag the public flies differs from the state flag.
 *   Indigenous flags   officially recognised indigenous flags that are not national
 *                      flags in their own right.
 *
 * Sub-national flags are deliberately NOT here — that is the "Sub-national
 * divisions" tab.
 *
 * Selecting a card opens the flag's own widget below the country fact-sheet and
 * changes nothing on the map: these flags belong to the whole country, so there is
 * no territory for the map to highlight (owner request — "nothing should be
 * selected in the map though").
 */
const CATEGORY_HEADINGS: Record<NationalFlagCategory, string> = {
  historical: "Historical flags",
  official: "Official flags",
  military: "Military flags",
  maritime: "Maritime flags",
  standard: "Standards",
  civilstate: "Civil & state flags",
  indigenous: "Indigenous flags",
};

/** The order the sections appear in — matches the generator's own ordering. */
const CATEGORY_ORDER: NationalFlagCategory[] = [
  "historical",
  "official",
  "military",
  "maritime",
  "standard",
  "civilstate",
  "indigenous",
];

type Props = {
  countryCode: string;
  countryName: string;
  /** id of the flag whose widget is open (if any). */
  selectedFlagId: string | null;
  baseUrl: string;
  onSelect: (flag: NationalFlag) => void;
};

export function NationalFlagGrid({
  countryCode,
  countryName,
  selectedFlagId,
  baseUrl,
  onSelect,
}: Props) {
  const groups = useMemo(() => {
    const flags = NATIONAL_FLAGS[countryCode] ?? [];
    return CATEGORY_ORDER.map((category) => ({
      category,
      heading: CATEGORY_HEADINGS[category],
      items: flags.filter((f) => f.category === category),
    })).filter((g) => g.items.length > 0);
  }, [countryCode]);

  if (groups.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced national flags are available for {countryName} yet.
      </p>
    );
  }

  return (
    <div className="flag-grid__groups">
      {groups.map((group) => (
        <div key={group.category} className="flag-grid__group">
          <h3 className="flag-grid__group-heading">
            <span className="flag-grid__group-name">{group.heading}</span>
            <span className="flag-grid__group-count">({group.items.length})</span>
          </h3>
          <ul className="flag-grid__list">
            {group.items.map((flag) => {
              const active = flag.id === selectedFlagId;
              const years = flagYearLabel(flag);
              return (
                <li key={flag.id} className="flag-grid__item">
                  <button
                    type="button"
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                    onClick={() => onSelect(flag)}
                    aria-pressed={active}
                    aria-label={
                      flag.sovereign
                        ? `Show ${flag.name} — flown under ${flag.sovereign}, before independence`
                        : `Show ${flag.name}`
                    }
                  >
                    <span className="flag-grid__thumb">
                      <img
                        src={`${baseUrl}${flag.path}`}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="flag-grid__thumb-img"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </span>
                    <span className="flag-grid__name">
                      <AutoFitName className="flag-grid__name-text" text={flag.name} />
                      {years && <span className="flag-grid__flag-sub">{years}</span>}
                      {flag.sovereign && (
                        <span className="flag-grid__sovereign-badge">
                          Under {flag.sovereign}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
