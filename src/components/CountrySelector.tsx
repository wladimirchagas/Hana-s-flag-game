import { useMemo } from "react";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";

export type CountrySelectorProps = {
  selectedCodes: string[];
  onToggle: (code: string) => void;
};

export function CountrySelector({
  selectedCodes,
  onToggle,
}: CountrySelectorProps) {
  const selectedCount = selectedCodes.length;
  const unselectedCount = ALL_COUNTRY_OPTIONS.length - selectedCount;

  // ALL_COUNTRY_OPTIONS is already alphabetically sorted, so filtering it
  // (rather than sorting selectedCodes' own order) keeps both groups
  // alphabetical while still splitting selected from unselected.
  const { selected, unselected } = useMemo(() => {
    const selectedSet = new Set(selectedCodes);
    const selected = ALL_COUNTRY_OPTIONS.filter((o) => selectedSet.has(o.code));
    const unselected = ALL_COUNTRY_OPTIONS.filter((o) => !selectedSet.has(o.code));
    return { selected, unselected };
  }, [selectedCodes]);

  return (
    <div className="country-selector">
      <p className="country-selector__hint">
        <span className="country-selector__count">
          {selectedCount} selected, {unselectedCount} unselected
        </span>{" "}
        (of {ALL_COUNTRY_OPTIONS.length}). Selected countries are grouped at
        the top; each group is alphabetical.
      </p>
      <ul className="country-selector__list" role="group" aria-label="Countries">
        {[...selected, ...unselected].map((opt) => {
          const checked = selectedCodes.includes(opt.code);
          return (
            <li key={opt.code} className="country-selector__item">
              <label className="country-selector__label">
                <input
                  type="checkbox"
                  className="country-selector__checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt.code)}
                />
                <span className="country-selector__name">{opt.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
