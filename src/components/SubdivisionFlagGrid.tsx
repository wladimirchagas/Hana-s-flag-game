import { useMemo, useState } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import type { SubdivisionMeta } from "../types/subdivision";

type GroupMode = "none" | "alpha";

const GROUP_LABELS: Record<GroupMode, string> = {
  none: "No grouping",
  alpha: "A–Z",
};

type Props = {
  divisions: SubdivisionMeta[];
  pluralLabel: string;
  countryName: string;
  selectedCode: string | null;
  onSelect: (code: string) => void;
};

export function SubdivisionFlagGrid({
  divisions,
  pluralLabel,
  countryName,
  selectedCode,
  onSelect,
}: Props) {
  const [groupMode, setGroupMode] = useState<GroupMode>("none");

  const sorted = useMemo(
    () => [...divisions].sort((a, b) => a.name.localeCompare(b.name, "en")),
    [divisions],
  );

  const groups = useMemo(() => {
    if (groupMode === "none") return [{ heading: null, items: sorted }];
    const buckets = new Map<string, SubdivisionMeta[]>();
    for (const d of sorted) {
      const letter = (d.name[0] ?? "").toUpperCase();
      const key = /[A-Z]/.test(letter) ? letter : "#";
      const arr = buckets.get(key) ?? [];
      arr.push(d);
      buckets.set(key, arr);
    }
    const list = [...buckets.entries()].sort(([a], [b]) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b, "en");
    });
    return list.map(([heading, items]) => ({ heading, items }));
  }, [sorted, groupMode]);

  if (divisions.length === 0) return null;

  return (
    <section className="flag-grid" aria-labelledby="subdiv-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="subdiv-grid-heading">
          {countryName} — {pluralLabel}
          <span className="flag-grid__count">{divisions.length}</span>
        </h2>
        <label className="flag-grid__group-select">
          <span className="flag-grid__group-select-label">Group by:</span>
          <select
            value={groupMode}
            onChange={(e) => setGroupMode(e.target.value as GroupMode)}
            className="flag-grid__select"
          >
            {(Object.keys(GROUP_LABELS) as GroupMode[]).map((m) => (
              <option key={m} value={m}>{GROUP_LABELS[m]}</option>
            ))}
          </select>
        </label>
      </header>

      {groups.map((g) => (
        <div key={g.heading ?? "_all"} className="flag-grid__group">
          {g.heading && (
            <h3 className="flag-grid__group-heading">
              <span className="flag-grid__group-name">{g.heading}</span>
              <span className="flag-grid__group-count">({g.items.length})</span>
            </h3>
          )}
          <ul className="flag-grid__list">
            {g.items.map((div) => {
              const active = div.code === selectedCode;
              const flagUrl = subdivisionFlagUrl(div.code);
              return (
                <li key={div.code} className="flag-grid__item">
                  <button
                    type="button"
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                    onClick={() => onSelect(div.code)}
                    aria-pressed={active}
                    aria-label={`Select ${div.name}`}
                  >
                    <span className="flag-grid__thumb">
                      {flagUrl ? (
                        <img
                          src={flagUrl}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="flag-grid__thumb-img"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
                      )}
                    </span>
                    <span className="flag-grid__name">{div.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
