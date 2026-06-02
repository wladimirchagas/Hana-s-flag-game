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

// Countries that have subdivision data, sorted by name
const SUBNATIONAL_COUNTRIES = ALL_COUNTRY_OPTIONS
  .filter((c) => SUBDIVISION_META[c.code] != null)
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export type AllFlagsStart =
  | { type: "all195" }
  | { type: "similarity"; groupCodes: string[]; groupLabel: string; hardcore: boolean }
  | { type: "continent"; groupCodes: string[]; groupLabel: string }
  | { type: "subregion"; groupCodes: string[]; groupLabel: string }
  | { type: "subnational"; countryCode: string; countryName: string };

export type AllFlagsSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (start: AllFlagsStart) => void;
};

type FlagMasterMode = "all195" | "continent" | "subregion" | "similarity" | "subnational";

const MODE_LABELS: Record<FlagMasterMode, string> = {
  all195:      "All 195 World Flags",
  continent:   "Flags by continent",
  subregion:   "Flags by sub-continent",
  similarity:  "Similar flags only",
  subnational: "Sub-national flags",
};

const MODE_ORDER: readonly FlagMasterMode[] = ["all195", "continent", "subregion", "similarity", "subnational"];

export function AllFlagsSetupModal({
  open,
  onClose,
  onStart,
}: AllFlagsSetupModalProps) {
  const [mode, setMode] = useState<FlagMasterMode>("all195");
  const [subnationalSearch, setSubnationalSearch] = useState("");

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
      setSubnationalSearch("");
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
      ? "Pick a country — you'll guess all its sub-national division flags."
      : "Pick a group of visually similar flags to test yourself on.";

  const filteredCountries = subnationalSearch.trim()
    ? SUBNATIONAL_COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(subnationalSearch.toLowerCase())
      )
    : SUBNATIONAL_COUNTRIES;

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

        {/* ── Sub-national flags — pick a country ── */}
        {mode === "subnational" && (
          <>
            <div className="all195__body">
              <div className="all195__subnational-search">
                <input
                  type="search"
                  className="all195__subnational-input"
                  placeholder="Search countries…"
                  value={subnationalSearch}
                  onChange={(e) => setSubnationalSearch(e.target.value)}
                  aria-label="Search countries for sub-national game"
                />
              </div>
              <div className="all195__body--groups">
                {filteredCountries.map((c) => {
                  const meta = SUBDIVISION_META[c.code];
                  const count = meta?.divisions.length ?? 0;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      className="all195__group-row"
                      onClick={() =>
                        onStart({ type: "subnational", countryCode: c.code, countryName: c.name })
                      }
                    >
                      <span className="all195__group-label">{c.name}</span>
                      <span className="all195__group-count">
                        {count} {meta?.pluralLabel?.toLowerCase() ?? "division"}
                        {count === 1 ? "" : "s"}
                      </span>
                    </button>
                  );
                })}
                {filteredCountries.length === 0 && (
                  <p style={{ padding: "1rem", color: "var(--ink-soft)", fontStyle: "italic" }}>
                    No countries found.
                  </p>
                )}
              </div>
            </div>
            <footer className="all195__footer">
              <button type="button" className="all195__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
