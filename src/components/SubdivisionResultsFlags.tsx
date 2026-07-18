import { useMemo } from "react";
import { capitalFlagSrc } from "../lib/capitalInfo";
import { subnationalDivisionFlag } from "../lib/subnationalDivisionFlag";
import { playableCapitalName } from "../lib/playableSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";
import { getSubdivisionDisputeLabel } from "../lib/disputedSubdivisions";

type Props = {
  divisions: SubdivisionMeta[];
  divisionResults: Record<string, "correct" | "wrong">;
  /** Divisions whose CAPITAL's flag was quizzed (mixed / capitals-only decks). */
  capitalDivisions?: SubdivisionMeta[];
  capitalResults?: Record<string, "correct" | "wrong">;
  countryCode?: string;
};

type ResultItem = {
  key: string;
  name: string;
  detail?: string;
  flagUrl: string | null;
  disputeCode: string;
  typeLabel: string;
};

function FlagColumn({
  title,
  variant,
  items,
  countryCode,
}: {
  title: string;
  variant: "correct" | "wrong";
  items: ResultItem[];
  countryCode?: string;
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
          {items.map((item) => (
            <li key={item.key} className="results-flags__item">
              {item.flagUrl && (
                <div className="results-flags__flag-wrap">
                  <img
                    src={item.flagUrl}
                    alt=""
                    className="results-flags__flag"
                    draggable={false}
                  />
                </div>
              )}
              <span className="results-flags__name">
                {item.name}
                {item.detail && (
                  <span className="results-flags__detail"> — {item.detail}</span>
                )}
                {(() => {
                  const dispute = getSubdivisionDisputeLabel(
                    item.disputeCode,
                    item.typeLabel,
                    countryCode,
                  );
                  if (!dispute) return null;
                  return (
                    <span
                      className={dispute.isUnofficial ? "flag-grid__unofficial-tag" : "flag-grid__disputed-tag"}
                      style={{ display: "inline-block", marginLeft: "5px" }}
                    >
                      ({dispute.text})
                    </span>
                  );
                })()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SubdivisionResultsFlags({
  divisions,
  divisionResults,
  capitalDivisions = [],
  capitalResults = {},
  countryCode,
}: Props) {
  const items = useMemo<ResultItem[]>(() => {
    const divisionItems = divisions.map((d): ResultItem & { result?: string } => ({
      key: `division:${d.code}`,
      name: d.name,
      flagUrl: subnationalDivisionFlag(d.code),
      disputeCode: d.code,
      typeLabel: d.typeLabel,
      result: divisionResults[d.code],
    }));
    const capitalItems = capitalDivisions.map((d): ResultItem & { result?: string } => ({
      key: `capital:${d.code}`,
      name: playableCapitalName(d.code) ?? d.name,
      detail: `capital of ${d.name}`,
      flagUrl: capitalFlagSrc(d.code),
      disputeCode: d.code,
      typeLabel: d.typeLabel,
      result: capitalResults[d.code],
    }));
    return [...divisionItems, ...capitalItems].sort((a, b) =>
      a.name.localeCompare(b.name, "en"),
    );
  }, [divisions, divisionResults, capitalDivisions, capitalResults]);

  const correct = useMemo(
    () => items.filter((i) => (i as ResultItem & { result?: string }).result === "correct"),
    [items],
  );
  const wrong = useMemo(
    () => items.filter((i) => (i as ResultItem & { result?: string }).result === "wrong"),
    [items],
  );

  return (
    <section className="results-flags" aria-labelledby="results-flags-heading">
      <h2 id="results-flags-heading" className="results-flags__heading">
        Flags from this game
      </h2>
      <div className="results-flags__grid">
        <FlagColumn title="Correct" variant="correct" items={correct} countryCode={countryCode} />
        <FlagColumn title="Wrong" variant="wrong" items={wrong} countryCode={countryCode} />
      </div>
    </section>
  );
}
