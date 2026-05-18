import { useMemo, useRef, useState } from "react";
import {
  continentOrder,
  type FlagListEntry,
} from "../lib/flagList";

/**
 * Flag-grid section rendered under the Learn map.
 *
 * Shows every selectable entity in the current era as a flag tile.
 * The user can:
 *   - Sort A–Z, or group by continent, or group by sub-region.
 *   - Click any tile to scroll the page up to the map with that
 *     entity selected (handled by the parent via onSelect).
 *   - Hit the small "⤢" badge on a tile to open the flag full-screen
 *     without scrolling (handled by the parent via onZoomFlag).
 *
 * When the parent's selection changes (from the map click or from the
 * search dropdown), the matching tile is highlighted and — if it's
 * offscreen within the grid — scrolled into view.
 */
export type FlagGridProps = {
  entries: readonly FlagListEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Optional resolver to prepend the BASE_URL to relative flag paths so
   *  the grid can render flags identically to the panel. */
  resolveFlag: (raw: string) => string;
};

type SortMode = "alpha" | "continent" | "subcontinent";

export function FlagGrid({
  entries,
  selectedId,
  onSelect,
  resolveFlag,
}: FlagGridProps) {
  const [sortMode, setSortMode] = useState<SortMode>("alpha");
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Sort + group based on the active mode. We always alphabetise WITHIN
  // a group; group headings are themselves ordered by continentOrder for
  // the top-level grouping or alphabetically for sub-region grouping.
  const groups = useMemo(() => {
    const sorted = [...entries].sort((a, b) =>
      a.name.localeCompare(b.name, "en"),
    );
    if (sortMode === "alpha") {
      return [{ heading: null, items: sorted }];
    }
    const buckets = new Map<string, FlagListEntry[]>();
    for (const e of sorted) {
      const key = sortMode === "continent" ? e.continent : e.subcontinent;
      const arr = buckets.get(key) ?? [];
      arr.push(e);
      buckets.set(key, arr);
    }
    const entriesList = [...buckets.entries()];
    entriesList.sort(([a], [b]) => {
      if (sortMode === "continent") {
        const oa = continentOrder(a);
        const ob = continentOrder(b);
        if (oa !== ob) return oa - ob;
      }
      return a.localeCompare(b, "en");
    });
    return entriesList.map(([heading, items]) => ({ heading, items }));
  }, [entries, sortMode]);

  // When the parent's selection lands on an entry that's offscreen in
  // the grid, scroll the matching tile into view.
  // Intentionally NO scroll-into-view here. Selecting an entity from
  // the map or the search dropdown updates the highlighted tile, but
  // we do NOT move the user's viewport. They only get scrolled when
  // they explicitly click a flag tile (handled by the parent).

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="flag-grid" aria-labelledby="flag-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="flag-grid-heading">
          Flags of this era
          <span className="flag-grid__count">{entries.length}</span>
        </h2>
        <div className="flag-grid__sort" role="tablist" aria-label="Sort flags">
          <button
            type="button"
            role="tab"
            aria-selected={sortMode === "alpha"}
            className={`flag-grid__sort-btn${sortMode === "alpha" ? " flag-grid__sort-btn--active" : ""}`}
            onClick={() => setSortMode("alpha")}
          >
            A–Z
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sortMode === "continent"}
            className={`flag-grid__sort-btn${sortMode === "continent" ? " flag-grid__sort-btn--active" : ""}`}
            onClick={() => setSortMode("continent")}
          >
            By continent
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sortMode === "subcontinent"}
            className={`flag-grid__sort-btn${sortMode === "subcontinent" ? " flag-grid__sort-btn--active" : ""}`}
            onClick={() => setSortMode("subcontinent")}
          >
            By region
          </button>
        </div>
      </header>

      {groups.map((g) => (
        <div key={g.heading ?? "_all"} className="flag-grid__group">
          {g.heading && (
            <h3 className="flag-grid__group-heading">
              {g.heading}
              <span className="flag-grid__group-count">{g.items.length}</span>
            </h3>
          )}
          <ul className="flag-grid__list">
            {g.items.map((item) => {
              const active = item.id === selectedId;
              const url = item.flag ? resolveFlag(item.flag) : null;
              return (
                <li key={item.id} className="flag-grid__item">
                  <button
                    type="button"
                    ref={(el) => {
                      if (el) cardRefs.current.set(item.id, el);
                      else cardRefs.current.delete(item.id);
                    }}
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                    onClick={() => onSelect(item.id)}
                    aria-pressed={active}
                    aria-label={`Select ${item.name}`}
                  >
                    <span className="flag-grid__thumb">
                      {url ? (
                        <img
                          src={url}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="flag-grid__thumb-img"
                        />
                      ) : (
                        <span className="flag-grid__thumb-empty" aria-hidden="true">
                          —
                        </span>
                      )}
                    </span>
                    <span className="flag-grid__name">{item.name}</span>
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
