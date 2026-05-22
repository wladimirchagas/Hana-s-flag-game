import { useEffect, useRef, useState } from "react";
import {
  DIFFICULTY_CONFIG,
  codesForDifficulty,
  type Difficulty,
} from "../lib/flagDifficulty";
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

export type QuickQuizConfig =
  | { type: "difficulty"; flagCount: number; difficulty: Difficulty }
  | {
      type: "similarity";
      groupCodes: string[];
      groupLabel: string;
      hardcore: boolean;
    }
  | { type: "continent"; groupCodes: string[]; groupLabel: string }
  | { type: "subregion"; groupCodes: string[]; groupLabel: string };

export type QuickQuizSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (config: QuickQuizConfig) => void;
};

type QuizMode = "difficulty" | "similarity" | "continent" | "subregion";
type SimilarityStep = "groups" | "submode";

const COUNT_OPTIONS: readonly number[] = [10, 20, 30];
const DIFFICULTY_OPTIONS: readonly Difficulty[] = ["easy", "moderate", "hard"];

const MODE_LABELS: Record<QuizMode, string> = {
  difficulty: "Play by flag difficulty level",
  similarity: "Play by Flag Similarity",
  continent:  "Play by Continent",
  subregion:  "Play by Sub-Continent",
};

export function QuickQuizSetupModal({
  open,
  onClose,
  onStart,
}: QuickQuizSetupModalProps) {
  const [mode, setMode] = useState<QuizMode>("difficulty");
  const [count, setCount] = useState<number>(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
  const [simStep, setSimStep] = useState<SimilarityStep>("groups");
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
      setMode("difficulty");
      setSimStep("groups");
      setSelectedGroup(null);
    }
  }, [open]);

  useEffect(() => {
    setSimStep("groups");
    setSelectedGroup(null);
  }, [mode]);

  if (!open) return null;

  const bucketSize = codesForDifficulty(difficulty).length;
  const effectiveCount = Math.min(count, bucketSize);

  const handleSimGroupSelect = (group: FlagSimilarity) => {
    setSelectedGroup(group);
    setSimStep("submode");
  };

  const handleSubmode = (hardcore: boolean) => {
    if (!selectedGroup) return;
    const codes = SIM_GROUP_CODES[selectedGroup] ?? [];
    const label = FLAG_SIMILARITY_LABELS[selectedGroup];
    onStart({ type: "similarity", groupCodes: codes, groupLabel: label, hardcore });
  };

  const simGroupCodes = selectedGroup ? (SIM_GROUP_CODES[selectedGroup] ?? []) : [];
  const simGroupLabel = selectedGroup ? FLAG_SIMILARITY_LABELS[selectedGroup] : "";

  const hint =
    mode === "difficulty"
      ? "Pick how many flags and how hard you want it."
      : mode === "similarity" && simStep === "submode"
        ? `${simGroupLabel} · ${simGroupCodes.length} flag${simGroupCodes.length === 1 ? "" : "s"} — pick your challenge level.`
        : mode === "similarity"
          ? "Pick a group of similar flags to test yourself on."
          : mode === "continent"
            ? "Pick a continent — you'll guess every flag from it."
            : "Pick a sub-continent — you'll guess every flag from it.";

  return (
    <div
      className="qquiz-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qquiz-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="qquiz">
        <header className="qquiz__header">
          <div>
            <h2 id="qquiz-title" className="qquiz__title">
              Quick Quiz
            </h2>
            <p className="qquiz__hint">{hint}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="qquiz__close"
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
            onChange={(e) => setMode(e.target.value as QuizMode)}
            aria-label="Quiz mode"
          >
            {(Object.keys(MODE_LABELS) as QuizMode[]).map((m) => (
              <option key={m} value={m}>
                {MODE_LABELS[m]}
              </option>
            ))}
          </select>
        </div>

        {/* ── Play by flag difficulty level ── */}
        {mode === "difficulty" && (
          <>
            <div className="qquiz__body">
              <fieldset className="qquiz__group">
                <legend className="qquiz__legend">How many flags?</legend>
                <div className="qquiz__choices">
                  {COUNT_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`qquiz__chip ${n === count ? "qquiz__chip--active" : ""}`}
                      onClick={() => setCount(n)}
                      aria-pressed={n === count}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="qquiz__group">
                <legend className="qquiz__legend">Which flags?</legend>
                <div className="qquiz__choices qquiz__choices--difficulty">
                  {DIFFICULTY_OPTIONS.map((d) => {
                    const dcfg = DIFFICULTY_CONFIG[d];
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`qquiz__diff qquiz__diff--${d} ${
                          d === difficulty ? "qquiz__diff--active" : ""
                        }`}
                        onClick={() => setDifficulty(d)}
                        aria-pressed={d === difficulty}
                      >
                        <span className="qquiz__diff-label">{dcfg.label}</span>
                        <span className="qquiz__diff-tagline">
                          {dcfg.tagline}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {effectiveCount < count && (
                <p className="qquiz__warning">
                  Only {bucketSize} flags are available at this difficulty; the
                  game will use all {bucketSize}.
                </p>
              )}
            </div>

            <footer className="qquiz__footer">
              <button type="button" className="qquiz__cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="qquiz__play"
                onClick={() =>
                  onStart({ type: "difficulty", flagCount: effectiveCount, difficulty })
                }
              >
                Play {effectiveCount} flag{effectiveCount === 1 ? "" : "s"}
              </button>
            </footer>
          </>
        )}

        {/* ── Play by Flag Similarity — group picker ── */}
        {mode === "similarity" && simStep === "groups" && (
          <>
            <div className="qquiz__body qquiz__body--groups">
              {FLAG_SIMILARITY_ORDER.map((group) => {
                const codes = SIM_GROUP_CODES[group] ?? [];
                if (codes.length === 0) return null;
                return (
                  <button
                    key={group}
                    type="button"
                    className="qquiz__group-row"
                    onClick={() => handleSimGroupSelect(group)}
                  >
                    <span className="qquiz__group-label">
                      {FLAG_SIMILARITY_LABELS[group]}
                    </span>
                    <span className="qquiz__group-count">
                      {codes.length} flag{codes.length === 1 ? "" : "s"}
                    </span>
                  </button>
                );
              })}
            </div>
            <footer className="qquiz__footer">
              <button type="button" className="qquiz__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}

        {/* ── Play by Flag Similarity — sub-mode picker ── */}
        {mode === "similarity" && simStep === "submode" && selectedGroup && (
          <>
            <div className="qquiz__body qquiz__body--submode">
              <button
                type="button"
                className="qquiz__submode"
                onClick={() => handleSubmode(false)}
              >
                <span className="qquiz__submode-emoji" aria-hidden="true">🎯</span>
                <span className="qquiz__submode-text">
                  <span className="qquiz__submode-title">Decoy Buttons</span>
                  <span className="qquiz__submode-desc">
                    Choices are only the {simGroupCodes.length} flags in this
                    group — spot the differences.
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="qquiz__submode"
                onClick={() => handleSubmode(true)}
              >
                <span className="qquiz__submode-emoji" aria-hidden="true">💀</span>
                <span className="qquiz__submode-text">
                  <span className="qquiz__submode-title">Hardcore</span>
                  <span className="qquiz__submode-desc">
                    Same {simGroupCodes.length} flags to guess, but from a
                    dropdown of all 195. No hints.
                  </span>
                </span>
              </button>
            </div>
            <footer className="qquiz__footer">
              <button
                type="button"
                className="qquiz__cancel"
                onClick={() => setSimStep("groups")}
              >
                ← Back
              </button>
            </footer>
          </>
        )}

        {/* ── Play by Continent ── */}
        {mode === "continent" && (
          <>
            <div className="qquiz__body qquiz__body--groups">
              {CONTINENT_ORDER.map((c) => {
                const codes = CONTINENT_GROUPS[c];
                return (
                  <button
                    key={c}
                    type="button"
                    className="qquiz__group-row"
                    onClick={() =>
                      onStart({ type: "continent", groupCodes: [...codes], groupLabel: c })
                    }
                  >
                    <span className="qquiz__group-label">{c}</span>
                    <span className="qquiz__group-count">
                      {codes.length} flag{codes.length === 1 ? "" : "s"}
                    </span>
                  </button>
                );
              })}
            </div>
            <footer className="qquiz__footer">
              <button type="button" className="qquiz__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}

        {/* ── Play by Sub-Continent ── */}
        {mode === "subregion" && (
          <>
            <div className="qquiz__body qquiz__body--groups">
              {SUBREGION_GROUPS.map((sg, i) => {
                const prevContinent =
                  i > 0 ? SUBREGION_GROUPS[i - 1].continent : null;
                const showHeader = sg.continent !== prevContinent;
                return (
                  <div key={sg.label}>
                    {showHeader && (
                      <div className="qquiz__region-header">{sg.continent}</div>
                    )}
                    <button
                      type="button"
                      className="qquiz__group-row"
                      onClick={() =>
                        onStart({
                          type: "subregion",
                          groupCodes: [...sg.codes],
                          groupLabel: sg.label,
                        })
                      }
                    >
                      <span className="qquiz__group-label">{sg.label}</span>
                      <span className="qquiz__group-count">
                        {sg.codes.length} flag{sg.codes.length === 1 ? "" : "s"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
            <footer className="qquiz__footer">
              <button type="button" className="qquiz__cancel" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
