import { useEffect, useRef, useState } from "react";
import {
  FLAG_SIMILARITY_LABELS,
  FLAG_SIMILARITY_ORDER,
  FLAG_SIMILARITIES,
  type FlagSimilarity,
} from "../lib/flagSimilarity";
import {
  CONTINENT_GROUPS,
  CONTINENT_ORDER,
  SUBREGION_GROUPS,
} from "../lib/continentGroups";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import {
  getPlayableCapitalSubdivisions,
  playableCapitalFlagCount,
  playableCapitalName,
  playableSubdivisionFlagCount,
  sharedFlagCodes,
} from "../lib/playableSubdivisions";

function buildGroupCodesMap(): Partial<Record<FlagSimilarity, string[]>> {
  const map: Partial<Record<FlagSimilarity, string[]>> = {};
  for (const [code, groups] of Object.entries(FLAG_SIMILARITIES)) {
    for (const group of groups) {
      if (!map[group]) map[group] = [];
      map[group]!.push(code);
    }
  }
  return map;
}

const SIM_GROUP_CODES = buildGroupCodesMap();

// Countries that actually have playable flags in EITHER set — sub-national
// division flags or capital-city flags — sorted by name. We filter on the
// playable counts (not just the presence of SUBDIVISION_META) so a country with
// nothing to quiz never appears as an option that would lead to an empty game.
// A country whose divisions have no flags but whose capitals do (e.g. India)
// IS listed: its capital-city toggle carries the whole game.
const SUBNATIONAL_COUNTRIES = ALL_COUNTRY_OPTIONS
  .filter(
    (c) =>
      SUBDIVISION_META[c.code] != null &&
      (playableSubdivisionFlagCount(c.code) > 0 || playableCapitalFlagCount(c.code) > 0),
  )
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

// Per-device memory of the last-used Include toggles (proposal: "the player's
// last choice is remembered per device"). Defaults preserve the pre-feature
// game exactly: divisions ON, capitals OFF.
const INCLUDE_PREF_KEY = "flagGame.flagMaster.include";

function loadIncludePref(): { divisions: boolean; capitals: boolean } {
  try {
    const raw = localStorage.getItem(INCLUDE_PREF_KEY);
    if (raw) {
      const p: unknown = JSON.parse(raw);
      if (
        typeof p === "object" && p !== null &&
        typeof (p as Record<string, unknown>).divisions === "boolean" &&
        typeof (p as Record<string, unknown>).capitals === "boolean"
      ) {
        return p as { divisions: boolean; capitals: boolean };
      }
    }
  } catch {
    // Unreadable storage — fall through to the defaults.
  }
  return { divisions: true, capitals: false };
}

function saveIncludePref(pref: { divisions: boolean; capitals: boolean }) {
  try {
    localStorage.setItem(INCLUDE_PREF_KEY, JSON.stringify(pref));
  } catch {
    // Storage unavailable (private mode) — the preference just isn't remembered.
  }
}

export type AllFlagsStart =
  | { type: "all195" }
  | { type: "similarity"; groupCodes: string[]; groupLabel: string; hardcore: boolean }
  | { type: "continent"; groupCodes: string[]; groupLabel: string }
  | { type: "subregion"; groupCodes: string[]; groupLabel: string }
  | {
      type: "subnational";
      countryCode: string;
      countryName: string;
      includeDivisions: boolean;
      includeCapitals: boolean;
    }
  | { type: "disputed" };

export type AllFlagsSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (start: AllFlagsStart) => void;
};

type FlagMasterMode = "all195" | "continent" | "subregion" | "similarity" | "subnational" | "disputed";

const MODE_LABELS: Record<FlagMasterMode, string> = {
  all195:      "All 195 World Flags",
  continent:   "Flags by continent",
  subregion:   "Flags by sub-continent",
  similarity:  "Similar flags only",
  subnational: "Sub-national flags",
  disputed:    "Disputed & Claimed Territories",
};

const MODE_ORDER: readonly FlagMasterMode[] = ["all195", "continent", "subregion", "similarity", "subnational", "disputed"];

export function AllFlagsSetupModal({
  open,
  onClose,
  onStart,
}: AllFlagsSetupModalProps) {
  const [mode, setMode] = useState<FlagMasterMode>("all195");
  const [subnationalCountry, setSubnationalCountry] = useState(
    SUBNATIONAL_COUNTRIES[0]?.code ?? ""
  );
  const [includePref] = useState(loadIncludePref);
  const [includeDivisions, setIncludeDivisions] = useState(includePref.divisions);
  const [includeCapitals, setIncludeCapitals] = useState(includePref.capitals);

  // When the chosen country has flags in only one set, that set must carry the
  // game — auto-enable it (and disable the empty one) so a listed country can
  // never open onto an empty deck (proposal Frame F: India defaults capitals ON).
  useEffect(() => {
    if (!subnationalCountry) return;
    const divCount = playableSubdivisionFlagCount(subnationalCountry);
    const capCount = playableCapitalFlagCount(subnationalCountry);
    if (divCount === 0 && capCount > 0) {
      setIncludeDivisions(false);
      setIncludeCapitals(true);
    } else if (capCount === 0 && divCount > 0) {
      setIncludeCapitals(false);
      setIncludeDivisions(true);
    }
  }, [subnationalCountry]);

  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setMode("all195");
      setSubnationalCountry(SUBNATIONAL_COUNTRIES[0]?.code ?? "");
      const pref = loadIncludePref();
      setIncludeDivisions(pref.divisions);
      setIncludeCapitals(pref.capitals);
    }
  }, [open]);

  if (!open) return null;

  const hint =
    mode === "all195"
      ? "Every UN member flag in random order. One guess each — no retries."
      : mode === "continent"
      ? "Pick a continent — you'll guess every flag from it."
      : mode === "subregion"
      ? "Pick a sub-continent — you'll guess every flag from it."
      : mode === "subnational"
      ? "Pick a country — choose which of its flags to play."
      : mode === "disputed"
      ? "Every disputed & claimed territory flag across all nations. One guess each — no retries."
      : "Pick a group of visually similar flags to test yourself on.";

  return (
    <div
      className="all195-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all195-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="all195">
        <header className="all195__header">
          <div className="all195__header-left">
            <div>
              <h2 id="all195-title" className="all195__title">
                Flag Master
              </h2>
              <p className="all195__hint">{hint}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="all195__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {/* Mode selector buttons */}
        <div className="qquiz__body">
          <div className="qquiz__choices qquiz__choices--modes">
            {MODE_ORDER.map((m) => (
              <button
                key={m}
                type="button"
                className={`qquiz__chip ${m === mode ? "qquiz__chip--active" : ""}`}
                onClick={() => setMode(m)}
                aria-pressed={m === mode}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* ── All 195 World Flags ── */}
        {mode === "all195" && (
          <footer className="all195__footer">
            <button type="button" className="all195__cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="qquiz__play"
              onClick={() => onStart({ type: "all195" })}
            >
              Play all 195
            </button>
          </footer>
        )}

        {/* ── Flags by continent ── */}
        {mode === "continent" && (
          <>
            <div className="all195__body all195__body--groups">
              {CONTINENT_ORDER.map((c) => {
                const codes = CONTINENT_GROUPS[c];
                return (
                  <button
                    key={c}
                    type="button"
                    className="all195__group-row"
                    onClick={() =>
                      onStart({ type: "continent", groupCodes: [...codes], groupLabel: c })
                    }
                  >
                    <span className="all195__group-label">{c}</span>
                    <span className="all195__group-count">
                      {codes.length} flag{codes.length === 1 ? "" : "s"}
                    </span>
                  </button>
                );
              })}
            </div>
            <footer className="all195__footer">
              <button type="button" className="all195__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}

        {/* ── Flags by sub-continent ── */}
        {mode === "subregion" && (
          <>
            <div className="all195__body all195__body--groups">
              {SUBREGION_GROUPS.map((sg, i) => {
                const prevContinent = i > 0 ? SUBREGION_GROUPS[i - 1].continent : null;
                const showHeader = sg.continent !== prevContinent;
                return (
                  <div key={sg.label}>
                    {showHeader && (
                      <div className="qquiz__region-header">{sg.continent}</div>
                    )}
                    <button
                      type="button"
                      className="all195__group-row"
                      onClick={() =>
                        onStart({ type: "subregion", groupCodes: [...sg.codes], groupLabel: sg.label })
                      }
                    >
                      <span className="all195__group-label">{sg.label}</span>
                      <span className="all195__group-count">
                        {sg.codes.length} flag{sg.codes.length === 1 ? "" : "s"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
            <footer className="all195__footer">
              <button type="button" className="all195__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}

        {/* ── Similar flags only — click a group to play immediately ── */}
        {mode === "similarity" && (
          <>
            <div className="all195__body all195__body--groups">
              {[...FLAG_SIMILARITY_ORDER]
                .sort((a, b) => (SIM_GROUP_CODES[b]?.length ?? 0) - (SIM_GROUP_CODES[a]?.length ?? 0))
                .map((group) => {
                  const codes = SIM_GROUP_CODES[group] ?? [];
                  if (codes.length === 0) return null;
                  return (
                    <button
                      key={group}
                      type="button"
                      className="all195__group-row"
                      onClick={() =>
                        onStart({
                          type: "similarity",
                          groupCodes: [...codes],
                          groupLabel: FLAG_SIMILARITY_LABELS[group],
                          hardcore: false,
                        })
                      }
                    >
                      <span className="all195__group-label">
                        {FLAG_SIMILARITY_LABELS[group]}
                      </span>
                      <span className="all195__group-count">
                        {codes.length} flag{codes.length === 1 ? "" : "s"}
                      </span>
                    </button>
                  );
                })}
            </div>
            <footer className="all195__footer">
              <button type="button" className="all195__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}

        {/* ── Disputed & Claimed Territories ── */}
        {mode === "disputed" && (
          <footer className="all195__footer">
            <button type="button" className="all195__cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="qquiz__play"
              onClick={() => onStart({ type: "disputed" })}
            >
              Play
            </button>
          </footer>
        )}

        {/* ── Sub-national flags — pick a country, then choose which flag sets
            to include (division flags and/or capital-city flags) ── */}
        {mode === "subnational" && (() => {
          const selected = SUBNATIONAL_COUNTRIES.find((c) => c.code === subnationalCountry);
          // Count the flags the game will actually quiz, not the raw division
          // total — they differ whenever some divisions have no distinct flag.
          const divCount = selected ? playableSubdivisionFlagCount(selected.code) : 0;
          const capCount = selected ? playableCapitalFlagCount(selected.code) : 0;
          const effDivisions = includeDivisions && divCount > 0;
          const effCapitals = includeCapitals && capCount > 0;
          // A flag shared by a division and its capital (e.g. Kuala Lumpur) is
          // asked once in a mixed deck, so it counts once here too.
          const sharedCount =
            selected && effDivisions && effCapitals ? sharedFlagCodes(selected.code).size : 0;
          const total =
            (effDivisions ? divCount : 0) + (effCapitals ? capCount : 0) - sharedCount;
          const capitalPreview = selected
            ? getPlayableCapitalSubdivisions(selected.code)
                .slice(0, 3)
                .map((d) => playableCapitalName(d.code))
                .filter(Boolean)
                .join(", ")
            : "";
          const totalLine = !selected || total === 0
            ? null
            : effDivisions && effCapitals
            ? `${total} flags — ${divCount} sub-national + ${capCount} capital cities` +
              (sharedCount > 0
                ? ` − ${sharedCount} shared flag${sharedCount === 1 ? "" : "s"}`
                : "") +
              ", shuffled together"
            : effDivisions
            ? `${divCount} flag${divCount === 1 ? "" : "s"} — sub-national divisions`
            : `${capCount} flag${capCount === 1 ? "" : "s"} — capital cities`;
          return (
            <>
              <div className="all195__body all195__body--subnational">
                <div className="all195__subnational-select-row">
                  <label className="all195__subnational-label" htmlFor="subnational-country-select">
                    Country
                  </label>
                  <select
                    id="subnational-country-select"
                    className="all195__subnational-select"
                    value={subnationalCountry}
                    onChange={(e) => setSubnationalCountry(e.target.value)}
                  >
                    {SUBNATIONAL_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <span className="all195__subnational-label">Include</span>
                <div className="all195__include">
                  <div
                    className={`all195__include-row${divCount === 0 ? " all195__include-row--disabled" : ""}`}
                  >
                    <span className="all195__include-ico" aria-hidden="true">🗺️</span>
                    <span className="all195__include-txt">
                      <b>Sub-national flags</b>
                      {selected && divCount === 0 && (
                        <small>No sub-national flags for {selected.name}</small>
                      )}
                    </span>
                    <span className="all195__include-count">{divCount}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={effDivisions}
                      aria-label="Include sub-national flags"
                      className={`all195__switch${effDivisions ? " all195__switch--on" : ""}`}
                      disabled={divCount === 0}
                      onClick={() => setIncludeDivisions((v) => !v)}
                    />
                  </div>
                  <div
                    className={`all195__include-row${capCount === 0 ? " all195__include-row--disabled" : ""}`}
                  >
                    <span className="all195__include-ico" aria-hidden="true">🏙️</span>
                    <span className="all195__include-txt">
                      <b>Capital-city flags</b>
                      {selected && capCount === 0 ? (
                        <small>No capital-city flags for {selected.name} yet</small>
                      ) : (
                        capitalPreview && <small>{capitalPreview}…</small>
                      )}
                    </span>
                    <span className="all195__include-count">{capCount}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={effCapitals}
                      aria-label="Include capital-city flags"
                      className={`all195__switch${effCapitals ? " all195__switch--on" : ""}`}
                      disabled={capCount === 0}
                      onClick={() => setIncludeCapitals((v) => !v)}
                    />
                  </div>
                </div>

                {totalLine && (
                  <p className="all195__subnational-count">{totalLine}</p>
                )}
                {selected && total === 0 && (
                  <p className="all195__include-warn" role="status">
                    ⚠️ Turn on at least one flag set to play.
                  </p>
                )}
              </div>
              <footer className="all195__footer">
                <button type="button" className="all195__cancel" onClick={onClose}>
                  Cancel
                </button>
                {selected && (
                  <button
                    type="button"
                    className="qquiz__play"
                    disabled={total === 0}
                    onClick={() => {
                      saveIncludePref({ divisions: effDivisions, capitals: effCapitals });
                      onStart({
                        type: "subnational",
                        countryCode: selected.code,
                        countryName: selected.name,
                        includeDivisions: effDivisions,
                        includeCapitals: effCapitals,
                      });
                    }}
                  >
                    Play
                  </button>
                )}
              </footer>
            </>
          );
        })()}
      </div>
    </div>
  );
}
