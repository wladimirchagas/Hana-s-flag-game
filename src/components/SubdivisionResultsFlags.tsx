import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import type { SubdivisionMeta } from "../types/subdivision";

type Props = {
  divisions: SubdivisionMeta[];
  divisionResults: Record<string, "correct" | "wrong">;
};

function FlagColumn({
  title,
  variant,
  items,
}: {
  title: string;
  variant: "correct" | "wrong";
  items: SubdivisionMeta[];
}) {
  return (
    <div
      className={`results-flags__column results-flags__column--${variant}`}
      aria-label={title}
    >
      <h3 className="results-flags__column-title">{title}</h3>
      {items.length === 0 ? (
        <p className="results-flags__empty">None</p>
      ) : (
        <ul className="results-flags__list">
          {items.map((d) => {
            const flagUrl = subdivisionFlagUrl(d.code);
            return (
              <li key={d.code} className="results-flags__item">
                {flagUrl && (
                  <div className="results-flags__flag-wrap">
                    <img
                      src={flagUrl}
                      alt=""
                      className="results-flags__flag"
                      draggable={false}
                    />
                  </div>
                )}
                <span className="results-flags__name">
                  {d.name}
                  {d.isDisputed && (
                    <span className="results-flags__name-disputed" style={{ fontSize: "0.85em", color: "var(--ink-soft)", marginLeft: "5px" }}>
                      (Disputed/Claimed)
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function SubdivisionResultsFlags({ divisions, divisionResults }: Props) {
  const correct = useMemo(
    () =>
      [...divisions]
        .filter((d) => divisionResults[d.code] === "correct")
        .sort((a, b) => a.name.localeCompare(b.name, "en")),
    [divisions, divisionResults],
  );
  const wrong = useMemo(
    () =>
      [...divisions]
        .filter((d) => divisionResults[d.code] === "wrong")
        .sort((a, b) => a.name.localeCompare(b.name, "en")),
    [divisions, divisionResults],
  );

  return (
    <section className="results-flags" aria-labelledby="results-flags-heading">
      <h2 id="results-flags-heading" className="results-flags__heading">
        Flags from this game
      </h2>
      <div className="results-flags__grid">
        <FlagColumn title="Correct" variant="correct" items={correct} />
        <FlagColumn title="Wrong" variant="wrong" items={wrong} />
      </div>
    </section>
  );
}
