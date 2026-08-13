import { useEffect, useMemo, useRef, useState } from "react";
import {
  continentOrder,
  type FlagListEntry,
} from "../lib/flagList";
import { AutoFitName } from "./AutoFitName";
import { loadLearnedCodes } from "../lib/learnedFlags";
import { FLAG_DATA_EVENT } from "../lib/profileSync";
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
import {
  FLAG_SIMILARITY_LABELS,
  FLAG_SIMILARITY_MEMBER_ORDER,
  FLAG_SIMILARITY_ORDER,
  type FlagSimilarity,
} from "../lib/flagSimilarity";
import {
  FLAG_ASPECT_RATIO_LABELS,
  FLAG_ASPECT_RATIO_ORDER,
  type FlagAspectRatio,
} from "../lib/flagAspectRatio";
import { normalizeForSearch } from "../lib/searchNormalize";

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
  /** True only when the "today" era is selected (modern world map).
   *  TODAY_ONLY_MODES are hidden from the dropdown for historical eras. */
  isModernEra?: boolean;
};

type GroupMode =
  | "none"
  | "alpha"
  | "continent"
  | "subcontinent"
  | "shape"
  | "family"
  | "color"
  | "similarity"
  | "drive-side"
  | "aspect-ratio";

// What image each tile shows. "flag" is the original behaviour; the other two
// swap in the country's coat of arms / passport cover (same sourced images the
// "National symbols" tab uses). Only offered on the modern world map — historical
// polities carry no coat-of-arms or passport data.
type ContentType = "flag" | "coatofarms" | "passport";

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  flag: "National flags",
  coatofarms: "Coats of arms",
  passport: "Passports",
};

const CONTENT_TYPE_ORDER: readonly ContentType[] = [
  "flag",
  "coatofarms",
  "passport",
];

const CONTENT_TYPE_STORAGE_KEY = "flagGame.learn.contentType";

function loadStoredContentType(): ContentType {
  try {
    const s = localStorage.getItem(CONTENT_TYPE_STORAGE_KEY);
    if (s && s in CONTENT_TYPE_LABELS) return s as ContentType;
  } catch {
    /* localStorage unavailable — fall through to the default */
  }
  return "flag";
}

const GROUP_MODE_LABELS: Record<GroupMode, string> = {
  none: "No grouping",
  alpha: "A–Z",
  continent: "By continent",
  subcontinent: "By sub-continent",
  shape: "By characteristics",
  family: "By family",
  color: "By colour",
  similarity: "By similarity",
  "drive-side": "By driving side",
  "aspect-ratio": "By aspect ratio",
};

// The chosen grouping is remembered across visits (per the UX revision: the
// grid used to reset to "No grouping" every time). Only persisted on an
// explicit user choice, so the historical-era auto-fallback below never
// clobbers a stored preference.
const GROUP_MODE_STORAGE_KEY = "flagGame.learn.groupMode";

function loadStoredGroupMode(): GroupMode {
  try {
    const s = localStorage.getItem(GROUP_MODE_STORAGE_KEY);
    if (s && s in GROUP_MODE_LABELS) return s as GroupMode;
  } catch {
    /* localStorage unavailable — fall through to the default */
  }
  return "none";
}

// Modes that only make sense for today's world map (modern era). They rely on
// data (shapes, families, colours, similarity groups, driving side) that is not
// available for historical polities.
//
// ⚠️  RULE: Before adding a new GroupMode, always ask whether it should be
// restricted to today only (listed here) or also available for historical
// periods. Never silently add it to one list without confirming the other.
const TODAY_ONLY_MODES = new Set<GroupMode>([
  "shape",
  "family",
  "color",
  "similarity",
  "drive-side",
  "aspect-ratio",
]);

export function FlagGrid({
  entries,
  selectedId,
  onSelect,
  resolveFlag,
  isModernEra = false,
}: FlagGridProps) {
  const [groupMode, setGroupMode] = useState<GroupMode>(loadStoredGroupMode);
  // Which image the tiles show: national flag (default), coat of arms, or
  // passport cover. Modern era only — reset to "flag" for historical eras below.
  const [contentType, setContentType] = useState<ContentType>(
    loadStoredContentType,
  );
  // Free-text filter typed by the user — narrows the grid by country/polity
  // name so you don't have to scroll ~195 tiles or leave the grid to use the
  // map search. Composes with the grouping above.
  const [filter, setFilter] = useState("");
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Persist an explicit grouping choice (not the historical auto-fallback).
  const chooseGroupMode = (mode: GroupMode) => {
    setGroupMode(mode);
    try {
      localStorage.setItem(GROUP_MODE_STORAGE_KEY, mode);
    } catch {
      /* ignore — persistence is best-effort */
    }
  };

  const chooseContentType = (type: ContentType) => {
    setContentType(type);
    try {
      localStorage.setItem(CONTENT_TYPE_STORAGE_KEY, type);
    } catch {
      /* ignore — persistence is best-effort */
    }
    // The flag-appearance groupings (shape/family/colour/similarity/aspect
    // ratio) and driving side describe a FLAG (or a car), not a coat of arms or
    // a passport, so leaving one active would group symbols by an attribute they
    // don't have. Fall back to "No grouping" when switching to those views.
    if (type !== "flag" && TODAY_ONLY_MODES.has(groupMode)) {
      setGroupMode("none");
    }
  };

  // Coat of arms / passport data only exists for the modern world map. Force the
  // flag view for any historical era, and reset a stored symbol preference so a
  // returning visitor doesn't land on an empty symbol grid.
  const effectiveContentType: ContentType = isModernEra ? contentType : "flag";
  // Codes the player has unlocked via the Hana's Game streak reward, shown as a
  // "Learned" badge. Held in state and re-read whenever the flag data changes —
  // including when it syncs DOWN from the active profile on another device — so
  // the badges update live, not just on mount. Only meaningful for the modern
  // era (historical-era ids are polity names, not alpha-2 codes).
  const [learnedCodes, setLearnedCodes] = useState<Set<string>>(() =>
    isModernEra ? new Set(loadLearnedCodes()) : new Set<string>(),
  );
  useEffect(() => {
    if (!isModernEra) {
      setLearnedCodes(new Set<string>());
      return;
    }
    const reread = () => setLearnedCodes(new Set(loadLearnedCodes()));
    reread();
    window.addEventListener(FLAG_DATA_EVENT, reread);
    return () => window.removeEventListener(FLAG_DATA_EVENT, reread);
  }, [isModernEra]);

  // When the era switches away from today, fall back to "none" if the active
  // mode is not available for historical eras.
  useEffect(() => {
    if (!isModernEra && TODAY_ONLY_MODES.has(groupMode)) {
      setGroupMode("none");
    }
  }, [isModernEra, groupMode]);

  // Guard the load-time combination too: a returning visitor could have both a
  // stored symbol content type AND a stored flag-appearance grouping, which
  // chooseContentType only reconciles on an explicit switch. Keep them
  // consistent so the active grouping is always one the dropdown still offers.
  useEffect(() => {
    if (effectiveContentType !== "flag" && TODAY_ONLY_MODES.has(groupMode)) {
      setGroupMode("none");
    }
  }, [effectiveContentType, groupMode]);

  // Apply the free-text name filter before grouping. A trimmed, case- and
  // accent-insensitive substring match against the entry name ("sao" matches
  // "São Paulo") — non-matches are hidden, so the grid shrinks to what you're
  // looking for.
  const filteredEntries = useMemo(() => {
    const q = normalizeForSearch(filter.trim());
    if (!q) return entries;
    return entries.filter((e) => normalizeForSearch(e.name).includes(q));
  }, [entries, filter]);

  // Build the (heading → entries) groups for the current mode. We always
  // alphabetise within a group; the headings themselves are ordered by
  // a per-mode comparator below.
  const groups = useMemo(() => {
    const sorted = [...filteredEntries].sort((a, b) =>
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
    } else if (groupMode === "similarity") {
      for (const e of sorted) {
        const tags = e.similarities ?? [];
        if (tags.length === 0) {
          push("Other", e);
          continue;
        }
        for (const t of tags) {
          const label = FLAG_SIMILARITY_LABELS[t as FlagSimilarity] ?? t;
          push(label, e);
        }
      }
      // Apply custom within-group ordering where defined, replacing the
      // default alphabetical sort for those specific buckets.
      for (const [label, items] of buckets) {
        const groupKey = (Object.keys(FLAG_SIMILARITY_LABELS) as FlagSimilarity[]).find(
          (k) => FLAG_SIMILARITY_LABELS[k] === label,
        );
        const order = groupKey ? FLAG_SIMILARITY_MEMBER_ORDER[groupKey] : undefined;
        if (order) {
          items.sort((a, b) => {
            const ia = order.indexOf(a.id);
            const ib = order.indexOf(b.id);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.name.localeCompare(b.name, "en");
          });
        }
      }
    } else if (groupMode === "drive-side") {
      for (const e of sorted) {
        const side = e.driveSide;
        if (side === "left") push("Drives on the left", e);
        else push("Drives on the right", e);
      }
    } else if (groupMode === "aspect-ratio") {
      for (const e of sorted) {
        // Entries without an explicit ratio default to the standard 2:3 bucket.
        const ratio = (e.aspectRatio ?? "ratio-2-3") as FlagAspectRatio;
        const label = FLAG_ASPECT_RATIO_LABELS[ratio] ?? ratio;
        push(label, e);
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
      if (groupMode === "similarity") {
        // Canonical similarity order; "Other" last.
        const oa = similarityHeadingOrder(a);
        const ob = similarityHeadingOrder(b);
        if (oa !== ob) return oa - ob;
      }
      if (groupMode === "drive-side") {
        // "Drives on the left" before "Drives on the right".
        if (a === "Drives on the left") return -1;
        if (b === "Drives on the left") return 1;
      }
      if (groupMode === "aspect-ratio") {
        const oa = aspectRatioHeadingOrder(a);
        const ob = aspectRatioHeadingOrder(b);
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
  }, [filteredEntries, groupMode]);

  // The flag-appearance groupings (shape/family/colour/similarity/aspect ratio)
  // and driving side describe a FLAG or a car — never a coat of arms or a
  // passport — so they are offered only in the modern flag view. Everything else
  // (A–Z, continent, sub-continent) applies to any country-level item.
  const groupModeAvailable = (m: GroupMode): boolean =>
    TODAY_ONLY_MODES.has(m)
      ? isModernEra && effectiveContentType === "flag"
      : true;

  const sectionTitle =
    effectiveContentType === "flag"
      ? "Flags of this era"
      : CONTENT_TYPE_LABELS[effectiveContentType];

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="flag-grid" aria-labelledby="flag-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="flag-grid-heading">
          {sectionTitle}
          <span className="flag-grid__count">
            {filter.trim() && filteredEntries.length !== entries.length
              ? `${filteredEntries.length} / ${entries.length}`
              : entries.length}
          </span>
        </h2>
        <div className="flag-grid__controls">
          <div className="flag-grid__filter">
            <span className="flag-grid__filter-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="flag-grid__filter-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter…"
              aria-label="Filter by name"
            />
            {filter && (
              <button
                type="button"
                className="flag-grid__filter-clear"
                onClick={() => setFilter("")}
                aria-label="Clear filter"
              >
                ×
              </button>
            )}
          </div>
          {isModernEra && (
            <label className="flag-grid__group-select">
              <span className="flag-grid__group-select-label">Show:</span>
              <select
                value={contentType}
                onChange={(e) =>
                  chooseContentType(e.target.value as ContentType)
                }
                className="flag-grid__select"
              >
                {CONTENT_TYPE_ORDER.map((t) => (
                  <option key={t} value={t}>
                    {CONTENT_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="flag-grid__group-select">
            <span className="flag-grid__group-select-label">Group by:</span>
            <select
              value={groupMode}
              onChange={(e) => chooseGroupMode(e.target.value as GroupMode)}
              className="flag-grid__select"
            >
              {(Object.keys(GROUP_MODE_LABELS) as GroupMode[])
                .filter(groupModeAvailable)
                .map((m) => (
                  <option key={m} value={m}>
                    {GROUP_MODE_LABELS[m]}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </header>

      {filteredEntries.length === 0 && (
        <p className="flag-grid__no-match">
          No matches for “{filter.trim()}”.{" "}
          <button
            type="button"
            className="flag-grid__no-match-clear"
            onClick={() => setFilter("")}
          >
            Clear filter
          </button>
        </p>
      )}

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
              // Which image this tile shows depends on the "Show" dropdown.
              // A country with no coat of arms / passport bundled renders the
              // empty placeholder for that view (never an invented image).
              const rawImage =
                effectiveContentType === "coatofarms"
                  ? item.coatOfArms ?? null
                  : effectiveContentType === "passport"
                    ? item.passport ?? null
                    : item.flag;
              const url = rawImage ? resolveFlag(rawImage) : null;
              const isLearned = learnedCodes.has(item.id);
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
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}${isLearned ? " flag-grid__card--learned" : ""}`}
                    onClick={() => onSelect(item.id)}
                    aria-pressed={active}
                    aria-label={
                      isLearned
                        ? `Select ${item.name} (learned)`
                        : `Select ${item.name}`
                    }
                  >
                    <span className="flag-grid__thumb">
                      {url ? (
                        <>
                          <img
                            src={url}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            className="flag-grid__thumb-img"
                            onError={(e) => {
                              const img = e.currentTarget;
                              // First, retry the LOCAL flag once. The bundled SVG
                              // is the correct source; a single failure is usually
                              // a transient network/VPN drop (or a load before the
                              // service worker is controlling the page), not a
                              // missing file. Re-assigning src forces a re-fetch,
                              // which the SW then serves from cache.
                              if (url && !img.dataset.localRetry) {
                                img.dataset.localRetry = "1";
                                img.src = url;
                                return;
                              }
                              // Safety net: if the bundled local flag is genuinely
                              // missing, fall back once to flagcdn.com — except for
                              // codes where flagcdn serves a politically incorrect
                              // flag (AF: pre-2021 Republic flag). Those show the
                              // empty placeholder rather than the wrong flag.
                              // flagcdn only serves FLAGS, so this fallback is
                              // skipped for the coat-of-arms / passport views —
                              // there it would show the national flag, which is the
                              // wrong image for the tile.
                              const code = item.id.toLowerCase();
                              const png = `https://flagcdn.com/${code}.png`;
                              if (
                                effectiveContentType === "flag" &&
                                item.id.toUpperCase() !== "AF" &&
                                !img.dataset.fellBack &&
                                img.src !== png
                              ) {
                                img.dataset.fellBack = "1";
                                img.src = png;
                                return;
                              }
                              img.hidden = true;
                              const sib = img.nextElementSibling as HTMLElement | null;
                              if (sib) sib.hidden = false;
                            }}
                          />
                          <span className="flag-grid__thumb-empty" aria-hidden="true" hidden>
                            —
                          </span>
                        </>
                      ) : (
                        <span className="flag-grid__thumb-empty" aria-hidden="true">
                          —
                        </span>
                      )}
                      {isLearned && (
                        <span
                          className="flag-grid__learned-badge"
                          title="You unlocked this flag in Hana's Game"
                          aria-hidden="true"
                        >
                          ⭐
                        </span>
                      )}
                    </span>
                    <span className="flag-grid__name">
                      <AutoFitName className="flag-grid__name-text" text={item.name} />
                      {/* The capital is country context that belongs beside the
                          flag, but reads as noise under a coat of arms or a
                          passport cover — show it only in the flag view. */}
                      {item.capital && effectiveContentType === "flag" && (
                        <span className="flag-grid__city-sub">
                          Capital: {item.capital}
                        </span>
                      )}
                    </span>
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

function similarityHeadingOrder(heading: string): number {
  if (heading === "Other") return 999;
  for (let i = 0; i < FLAG_SIMILARITY_ORDER.length; i++) {
    if (FLAG_SIMILARITY_LABELS[FLAG_SIMILARITY_ORDER[i]] === heading) return i;
  }
  return 100;
}

function aspectRatioHeadingOrder(heading: string): number {
  for (let i = 0; i < FLAG_ASPECT_RATIO_ORDER.length; i++) {
    if (FLAG_ASPECT_RATIO_LABELS[FLAG_ASPECT_RATIO_ORDER[i]] === heading) return i;
  }
  return 100;
}
