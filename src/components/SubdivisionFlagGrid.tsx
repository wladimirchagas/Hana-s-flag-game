import { useMemo, useState } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import type { SubdivisionMeta } from "../types/subdivision";
import { getSubdivisionDisputeLabel, DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";

type GroupMode = "none" | "alpha" | "type";

const GROUP_LABELS: Record<GroupMode, string> = {
  none: "No grouping",
  alpha: "A–Z",
  type: "By type",
};

type Props = {
  divisions: SubdivisionMeta[];
  pluralLabel: string;
  countryName: string;
  selectedCode: string | null;
  onSelect: (code: string) => void;
  countryCode?: string;
  /** When true, render just the controls + grid (no <section>/title) so a
   *  parent (e.g. the tabbed drill-down) can own the section shell + header. */
  embedded?: boolean;
};

export function SubdivisionFlagGrid({
  divisions,
  pluralLabel,
  countryName,
  selectedCode,
  onSelect,
  countryCode,
  embedded = false,
}: Props) {
  const distinctTypeCount = useMemo(
    () => new Set(divisions.map((d) => d.typeLabel)).size,
    [divisions],
  );

  const [groupMode, setGroupMode] = useState<GroupMode>(() =>
    distinctTypeCount > 1 ? "type" : "none",
  );

  const sorted = useMemo(
    () =>
      divisions
        // Hierarchy children are absorbed into their parent subdivision and must
        // not appear as standalone cards (see CLAUDE.md "Disputed territory neutrality").
        .filter((d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY))
        .sort((a, b) => {
          // Disputed/claimed territories must always be listed last
          if (a.isDisputed && !b.isDisputed) return 1;
          if (!a.isDisputed && b.isDisputed) return -1;
          return a.name.localeCompare(b.name, "en");
        }),
    [divisions],
  );

  const groups = useMemo(() => {
    if (groupMode === "none") return [{ heading: null, items: sorted }];

    if (groupMode === "alpha") {
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
    }

    // "type" grouping — constituent subdivisions first, external territories
    // second, disputed/claimed territories always last.
    //
    // RULE (hard-coded, see CLAUDE.md): within a parent nation's flag grid,
    // groups representing primary subdivisions (countries, states, provinces,
    // etc.) must appear before groups representing external/dependent
    // territories (crown dependencies, overseas territories, associated states,
    // etc.). Groups consisting entirely of disputed/claimed items are always
    // shown last regardless of size.
    //
    // Tier 0 — primary subdivisions (anything not in tier 1 or 2)
    // Tier 1 — dependency / external territory types
    // Tier 2 — disputed/claimed (isDisputed flag on every item)
    const DEPENDENCY_TYPES: ReadonlySet<string> = new Set([
      "Crown Dependency",
      "Overseas Territory",
      "Overseas Collectivity",
      "Sui generis collectivity",
      "Autonomous Territory",
      "Special Administrative Region",
      "Constituent Country",
      "Associated State",
      "External Territory",
      "Unincorporated Territory",
    ]);

    function groupTier(typeLabel: string, allDisputed: boolean): number {
      if (allDisputed) return 2;
      if (DEPENDENCY_TYPES.has(typeLabel)) return 1;
      return 0;
    }

    const buckets = new Map<string, SubdivisionMeta[]>();
    for (const d of sorted) {
      const arr = buckets.get(d.typeLabel) ?? [];
      arr.push(d);
      buckets.set(d.typeLabel, arr);
    }
    const list = [...buckets.entries()].sort(([labelA, itemsA], [labelB, itemsB]) => {
      const tierA = groupTier(labelA, itemsA.every(item => item.isDisputed));
      const tierB = groupTier(labelB, itemsB.every(item => item.isDisputed));
      if (tierA !== tierB) return tierA - tierB;

      // Within the same tier: larger groups first, then alphabetical
      const diff = itemsB.length - itemsA.length;
      if (diff !== 0) return diff;
      return labelA.localeCompare(labelB, "en");
    });
    return list.map(([heading, items]) => ({ heading, items }));
  }, [sorted, groupMode]);

  if (divisions.length === 0) return null;

  const groupSelect = (
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
  );

  const body = groups.map((g) => (
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
                    aria-label={`Select ${div.name}${div.isDisputed ? " (Disputed/Claimed)" : ""}`}
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
                    <span className="flag-grid__name">
                      {div.name}
                      {(() => {
                        const dispute = getSubdivisionDisputeLabel(div.code, div.typeLabel, countryCode);
                        if (!dispute) return null;
                        return (
                          <span className={dispute.isUnofficial ? "flag-grid__unofficial-tag" : "flag-grid__disputed-tag"}>
                            ({dispute.text})
                          </span>
                        );
                      })()}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
  ));

  if (embedded) {
    return (
      <>
        <div className="flag-grid__controls flag-grid__controls--tab">
          {groupSelect}
        </div>
        {body}
      </>
    );
  }

  return (
    <section className="flag-grid" aria-labelledby="subdiv-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="subdiv-grid-heading">
          {countryName} — {pluralLabel}
          <span className="flag-grid__count">{divisions.length}</span>
        </h2>
        {groupSelect}
      </header>
      {body}
    </section>
  );
}
