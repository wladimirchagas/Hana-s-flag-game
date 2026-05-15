import { useMemo } from "react";
import {
  ALL_COUNTRY_OPTIONS,
  type CountryOption,
} from "../lib/countrySelection";

export type CountrySelectorProps = {
  selectedCodes: string[]; // ordered: most-recently selected first
  onToggle: (code: string) => void;
};

export function CountrySelector({
  selectedCodes,
  onToggle,
}: CountrySelectorProps) {
  const orderedOptions = useMemo<CountryOption[]>(() => {
    const byCode = new Map(ALL_COUNTRY_OPTIONS.map((o) => [o.code, o]));
    const selectedSet = new Set(selectedCodes);
    const top: CountryOption[] = [];
    for (const code of selectedCodes) {
      const opt = byCode.get(code);
      if (opt) top.push(opt);
    }
    const rest = ALL_COUNTRY_OPTIONS.filter((o) => !selectedSet.has(o.code));
    return [...top, ...rest];
  }, [selectedCodes]);

  const selectedCount = selectedCodes.length;

  return (
    <div className="country-selector">
      <p className="country-selector__hint">
        {selectedCount} of {ALL_COUNTRY_OPTIONS.length} countries selected.
        Newly checked countries move to the top.
      </p>
      <ul className="country-selector__list" role="group" aria-label="Countries">
        {orderedOptions.map((opt) => {
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
