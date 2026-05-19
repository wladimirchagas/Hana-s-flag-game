import { useMemo, useRef, useState } from "react";
import {
  continentOrder,
  type FlagListEntry,
} from "../lib/flagList";
import {
  FLAG_SHAPE_LABELS,
  FLAG_SHAPE_ORDER,
  type FlagShape,
} from "../lib/flagShapes";
import {
  FLAG_FAMILY_LABELS,
  FLAG_FAMILY_ORDER,
  type FlagFamily,
} from "../lib/flagFamilies";
import {
  FLAG_COLOR_LABELS,
  FLAG_COLOR_ORDER,
  type FlagColor,
} from "../lib/flagColors";

/**
 * Flag-grid section rendered under the Learn map.
 *
 * Shows every selectable entity in the current era as a flag tile.
 * The user can:
 *   - Group the list in several ways via the "Group by" dropdown
 *     (default: no grouping). Options: A–Z, by continent, by
 *     sub-region, or by visual motif ("By shape" — flags can appear
 *     in multiple shape groups since most carry several motifs).
 *   - Click any tile to scroll the page up to the map with that
 *     entity selected (handled by the parent via onSelect).
 *
 * When the parent's selection changes (from the map click or from the
 * search dropdown), the matching tile is highlighted via the
 * `--active` class. No automatic scrolling — per product spec.
 */
export type FlagGridProps = {
  entries: readonly FlagListEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Optional resolver to prepend the BASE_URL to relative flag paths so
   *  the grid can render flags identically to the panel. */
  resolveFlag: (raw: string) => string;
};

type GroupMode =
  | "none"
  | "alpha"
  | "continent"
  | "subcontinent"
  | "shape"
  | "family"
  | "color";

const GROUP_MODE_LABELS: Record<GroupMode, string> = {
  none: "No grouping",
  alpha: "A–Z",
  continent: "By continent",
  subcontinent: "By sub-continent",
  shape: "By characteristics",
  family: "By family",
  color: "By colour",
};

export function FlagGrid({
  entries,
  selectedId,
  onSelect,
  resolveFlag,
}: FlagGridProps) {
  const [groupMode, setGroupMode] = useState<GroupMode>("none");
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Build the (heading → entries) groups for the current mode. We always
  // alphabetise within a group; the headings themselves are ordered by
  // a per-mode comparator below.
  const groups = useMemo(() => {
    const sorted = [...entries].sort((a, b) =>
      a.name.localeCompare(b.name, "en"),
    );

    if (groupMode === "none") {
      return [{ heading: null, items: sorted }];
    }

    const buckets = new Map<string, FlagListEntry[]>();
    const push = (key: string, e: FlagListEntry) => {
      const arr = buckets.get(key) ?? [];
      arr.push(e);
      buckets.set(key, arr);
    };

    if (groupMode === "alpha") {
      for (const e of sorted) {
        const first = e.name[0] ?? "";
        const letter = first.toUpperCase();
        // Numbers / non-letters bucket together under "#" so we never
        // get hundreds of tiny stubs.
        const key = /[A-Z]/.test(letter) ? letter : "#";
        push(key, e);
      }
    } else if (groupMode === "continent") {
      for (const e of sorted) push(e.continent, e);
    } else if (groupMode === "subcontinent") {
      for (const e of sorted) push(e.subcontinent, e);
    } else if (groupMode === "shape") {
      for (const e of sorted) {
        const tags = e.shapes ?? [];
        if (tags.length === 0) {
          push("Other", e);
          continue;
        }
        for (const t of tags) {
          const label = FLAG_SHAPE_LABELS[t as FlagShape] ?? t;
          push(label, e);
        }
      }
    } else if (groupMode === "family") {
      for (const e of sorted) {
        const tags = e.families ?? [];
        if (tags.length === 0) {
          push("Other", e);
          continue;
        }
        for (const t of tags) {
          const label = FLAG_FAMILY_LABELS[t as FlagFamily] ?? t;
          push(label, e);
        }
      }
    } else if (groupMode === "color") {
      for (const e of sorted) {
        const tags = e.colors ?? [];
        if (tags.length === 0) {
          push("Other", e);
          continue;
        }
        for (const t of tags) {
          const label = FLAG_COLOR_LABELS[t as FlagColor] ?? t;
          push(label, e);
        }
      }
    }

    // Sort the bucket list.
    const list = [...buckets.entries()];
    list.sort(([a], [b]) => {
      if (groupMode === "continent") {
        const oa = continentOrder(a);
        const ob = continentOrder(b);
        if (oa !== ob) return oa - ob;
      }
      if (groupMode === "shape") {
        // Use the canonical shape order for headings; "Other" last.
        const oa = shapeHeadingOrder(a);
        const ob = shapeHeadingOrder(b);
        if (oa !== ob) return oa - ob;
      }
      if (groupMode === "family") {
        // Canonical family order; "Other" last.
        const oa = familyHeadingOrder(a);
        const ob = familyHeadingOrder(b);
        if (oa !== ob) return oa - ob;
      }
      if (groupMode === "color") {
        // Canonical colour order; "Other" last.
        const oa = colorHeadingOrder(a);
        const ob = colorHeadingOrder(b);
        if (oa !== ob) return oa - ob;
      }
      if (groupMode === "alpha") {
        // Keep "#" at the end.
        if (a === "#" && b !== "#") return 1;
        if (b === "#" && a !== "#") return -1;
      }
      return a.localeCompare(b, "en");
    });

    return list.map(([heading, items]) => ({ heading, items }));
  }, [entries, groupMode]);

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
        <label className="flag-grid__group-select">
          <span className="flag-grid__group-select-label">Group by:</span>
          <select
            value={groupMode}
            onChange={(e) => setGroupMode(e.target.value as GroupMode)}
            className="flag-grid__select"
          >
            {(Object.keys(GROUP_MODE_LABELS) as GroupMode[]).map((m) => (
              <option key={m} value={m}>
                {GROUP_MODE_LABELS[m]}
              </option>
            ))}
          </select>
        </label>
      </header>

      {groups.map((g) => (
        <div key={g.heading ?? "_all"} className="flag-grid__group">
          {g.heading && (
            <h3 className="flag-grid__group-heading">
              <span className="flag-grid__group-name">{g.heading}</span>
              <span className="flag-grid__group-count">
                ({g.items.length})
              </span>
            </h3>
          )}
          <ul className="flag-grid__list">
            {g.items.map((item) => {
              const active = item.id === selectedId;
              const url = item.flag ? resolveFlag(item.flag) : null;
              // In shape mode, the same id can appear in multiple
              // groups. Make the React key + ref key unique per
              // (group, id) pair to avoid duplicate-ref clobbering.
              const refKey = `${g.heading ?? "_all"}:${item.id}`;
              return (
                <li key={refKey} className="flag-grid__item">
                  <button
                    type="button"
                    ref={(el) => {
                      if (el) cardRefs.current.set(refKey, el);
                      else cardRefs.current.delete(refKey);
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

function shapeHeadingOrder(heading: string): number {
  if (heading === "Other") return 999;
  for (let i = 0; i < FLAG_SHAPE_ORDER.length; i++) {
    if (FLAG_SHAPE_LABELS[FLAG_SHAPE_ORDER[i]] === heading) return i;
  }
  return 100;
}

function familyHeadingOrder(heading: string): number {
  if (heading === "Other") return 999;
  for (let i = 0; i < FLAG_FAMILY_ORDER.length; i++) {
    if (FLAG_FAMILY_LABELS[FLAG_FAMILY_ORDER[i]] === heading) return i;
  }
  return 100;
}

function colorHeadingOrder(heading: string): number {
  if (heading === "Other") return 999;
  for (let i = 0; i < FLAG_COLOR_ORDER.length; i++) {
    if (FLAG_COLOR_LABELS[FLAG_COLOR_ORDER[i]] === heading) return i;
  }
  return 100;
}
