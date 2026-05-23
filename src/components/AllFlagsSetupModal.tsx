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

export type AllFlagsStart =
  | { type: "all195" }
  | { type: "similarity"; groupCodes: string[]; groupLabel: string; hardcore: boolean }
  | { type: "continent"; groupCodes: string[]; groupLabel: string }
  | { type: "subregion"; groupCodes: string[]; groupLabel: string };

export type AllFlagsSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (start: AllFlagsStart) => void;
};

type FlagMasterMode = "all195" | "continent" | "subregion" | "similarity";

const MODE_LABELS: Record<FlagMasterMode, string> = {
  all195:     "All 195 World Flags",
  continent:  "Flags by continent",
  subregion:  "Flags by sub-continent",
  similarity: "Similar flags only",
};

const MODE_ORDER: readonly FlagMasterMode[] = ["all195", "continent", "subregion", "similarity"];

export function AllFlagsSetupModal({
  open,
  onClose,
  onStart,
}: AllFlagsSetupModalProps) {
  const [mode, setMode] = useState<FlagMasterMode>("all195");
  const [simStep, setSimStep] = useState<"groups" | "submode">("groups");
  const [selectedGroup, setSelectedGroup] = useState<FlagSimilarity | null>(null);

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
      setSimStep("groups");
      setSelectedGroup(null);
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
      : simStep === "groups"
      ? "Pick a group of visually similar flags to test yourself on."
      : selectedGroup
      ? `${SIM_GROUP_CODES[selectedGroup]?.length ?? 0} flags — pick your challenge level.`
      : "";

  const groupCodes = selectedGroup ? (SIM_GROUP_CODES[selectedGroup] ?? []) : [];
  const groupLabel = selectedGroup ? FLAG_SIMILARITY_LABELS[selectedGroup] : "";

  const showBack = mode === "similarity" && simStep === "submode";

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
            {showBack && (
              <button
                type="button"
                className="all195__back"
                onClick={() => setSimStep("groups")}
                aria-label="Back"
              >
                ←
              </button>
            )}
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

        {/* Mode selector dropdown */}
        <div className="qquiz__mode-wrap">
          <select
            className="qquiz__mode-select"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as FlagMasterMode);
              setSimStep("groups");
              setSelectedGroup(null);
            }}
            aria-label="Game mode"
          >
            {MODE_ORDER.map((m) => (
              <option key={m} value={m}>
                {MODE_LABELS[m]}
              </option>
            ))}
          </select>
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

        {/* ── Similar flags only — group picker ── */}
        {mode === "similarity" && simStep === "groups" && (
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
                      onClick={() => {
                        setSelectedGroup(group);
                        setSimStep("submode");
                      }}
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

        {/* ── Similar flags only — Decoy / Hardcore submode ── */}
        {mode === "similarity" && simStep === "submode" && selectedGroup && (
          <>
            <div className="all195__body">
              <button
                type="button"
                className="all195__option"
                onClick={() =>
                  onStart({
                    type: "similarity",
                    groupCodes: [...groupCodes],
                    groupLabel,
                    hardcore: false,
                  })
                }
              >
                <span className="all195__option-emoji" aria-hidden="true">🎯</span>
                <span className="all195__option-text">
                  <span className="all195__option-title">Decoy Buttons</span>
                  <span className="all195__option-desc">
                    Your choices are only the {groupCodes.length} flags in this
                    group — spot the differences.
                  </span>
                </span>
                <span className="all195__option-cta all195__option-cta--mustard" aria-hidden="true">
                  PLAY →
                </span>
              </button>
              <button
                type="button"
                className="all195__option"
                onClick={() =>
                  onStart({
                    type: "similarity",
                    groupCodes: [...groupCodes],
                    groupLabel,
                    hardcore: true,
                  })
                }
              >
                <span className="all195__option-emoji" aria-hidden="true">💀</span>
                <span className="all195__option-text">
                  <span className="all195__option-title">Hardcore</span>
                  <span className="all195__option-desc">
                    Same {groupCodes.length} flags to guess, but picked from a
                    dropdown of all 195. No hints.
                  </span>
                </span>
                <span className="all195__option-cta all195__option-cta--coral" aria-hidden="true">
                  PLAY →
                </span>
              </button>
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
