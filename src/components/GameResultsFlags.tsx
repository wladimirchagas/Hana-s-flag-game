import { useMemo } from "react";
import type { Continent, Country } from "../api/countries";

export type CountryLike = Pick<
  Country,
  "name" | "code" | "flagSvg" | "continent"
>;

type Props = {
  countries: CountryLike[];
  countryResults: Record<string, "correct" | "wrong">;
};

const CONTINENT_ORDER: Continent[] = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

function groupByContinent(
  countries: CountryLike[],
  countryResults: Record<string, "correct" | "wrong">,
  outcome: "correct" | "wrong"
): Array<{ continent: Continent; countries: CountryLike[] }> {
  const filtered = countries.filter((c) => countryResults[c.code] === outcome);
  const byContinent = new Map<Continent, Country[]>();
  for (const cont of CONTINENT_ORDER) {
    byContinent.set(cont, []);
  }
  for (const c of filtered) {
    byContinent.get(c.continent)!.push(c);
  }
  for (const list of byContinent.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "en"));
  }
  return CONTINENT_ORDER.filter(
    (cont) => (byContinent.get(cont)!.length ?? 0) > 0
  ).map((continent) => ({
    continent,
    countries: byContinent.get(continent)!,
  }));
}

function FlagColumn({
  title,
  variant,
  groups,
}: {
  title: string;
  variant: "correct" | "wrong";
  groups: Array<{ continent: Continent; countries: CountryLike[] }>;
}) {
  return (
    <div
      className={`results-flags__column results-flags__column--${variant}`}
      aria-label={title}
    >
      <h3 className="results-flags__column-title">{title}</h3>
      {groups.length === 0 ? (
        <p className="results-flags__empty">None</p>
      ) : (
        groups.map(({ continent, countries }) => (
          <div key={continent} className="results-flags__group">
            <h4 className="results-flags__continent">{continent}</h4>
            <ul className="results-flags__list">
              {countries.map((c) => (
                <li key={c.code} className="results-flags__item">
                  <div className="results-flags__flag-wrap">
                    <img
                      src={c.flagSvg}
                      alt=""
                      className="results-flags__flag"
                      draggable={false}
                    />
                  </div>
                  <span className="results-flags__name">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export function GameResultsFlags({ countries, countryResults }: Props) {
  const correctGroups = useMemo(
    () => groupByContinent(countries, countryResults, "correct"),
    [countries, countryResults]
  );
  const wrongGroups = useMemo(
    () => groupByContinent(countries, countryResults, "wrong"),
    [countries, countryResults]
  );

  return (
    <section
      className="results-flags"
      aria-labelledby="results-flags-heading"
    >
      <h2 id="results-flags-heading" className="results-flags__heading">
        Flags from this game
      </h2>
      <div className="results-flags__grid">
        <FlagColumn title="Correct" variant="correct" groups={correctGroups} />
        <FlagColumn title="Wrong" variant="wrong" groups={wrongGroups} />
      </div>
    </section>
  );
}
