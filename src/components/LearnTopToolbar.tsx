import { CountryDropdown } from "./CountryDropdown";
import type { Country } from "../api/countries";

/**
 * Top-of-page toolbar for the Learn map — now just the country search.
 *
 * The historical-period selector used to live here too, but it was moved into
 * the map-controls toolbar above the map (see EraPicker, rendered as one of the
 * map's extra controls) to save a row of vertical space.
 *
 * The search column renders a hint instead of the dropdown on historical eras /
 * subdivision mode (the dropdown only makes sense for the modern 195-country
 * set), signalled by a null `search` prop.
 */
export type LearnTopToolbarProps = {
  /** Search props — null in historical eras / subdivision mode to hide the search. */
  search: {
    countries: readonly Country[];
    value: Country | null;
    onChange: (c: Country | null) => void;
    disabled: boolean;
  } | null;
};

export function LearnTopToolbar({ search }: LearnTopToolbarProps) {
  return (
    <div className="learn-toolbar">
      <div className="learn-toolbar__search">
        {search ? (
          <CountryDropdown
            countries={search.countries as Country[]}
            value={search.value}
            onChange={search.onChange}
            disabled={search.disabled}
            label="Find a country"
            listPlacement="down"
          />
        ) : (
          <p className="learn-toolbar__search-hint">
            Click any polity on the map to explore this era.
          </p>
        )}
      </div>
    </div>
  );
}
