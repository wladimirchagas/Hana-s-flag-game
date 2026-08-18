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

  return (
    <div className="country-selector">
      <p className="country-selector__hint">
        <span className="country-selector__count">
          {selectedCount} of {ALL_COUNTRY_OPTIONS.length} countries selected.
        </span>{" "}
        Countries are listed alphabetically.
      </p>
      <ul className="country-selector__list" role="group" aria-label="Countries">
        {ALL_COUNTRY_OPTIONS.map((opt) => {
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
