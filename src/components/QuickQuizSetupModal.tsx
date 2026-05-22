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

const GROUP_CODES = buildGroupCodesMap();

export type QuickQuizConfig =
  | { type: "standard"; flagCount: number; difficulty: Difficulty }
  | {
      type: "similarity";
      groupCodes: string[];
      groupLabel: string;
      hardcore: boolean;
    };

export type QuickQuizSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (config: QuickQuizConfig) => void;
};

const COUNT_OPTIONS: readonly number[] = [10, 20, 30];
const DIFFICULTY_OPTIONS: readonly Difficulty[] = ["easy", "moderate", "hard"];

type QuizTab = "standard" | "similarity";
type SimilarityStep = "groups" | "submode";

export function QuickQuizSetupModal({
  open,
  onClose,
  onStart,
}: QuickQuizSetupModalProps) {
  const [tab, setTab] = useState<QuizTab>("standard");
  const [count, setCount] = useState<number>(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
  const [simStep, setSimStep] = useState<SimilarityStep>("groups");
  const [selectedGroup, setSelectedGroup] = useState<FlagSimilarity | null>(
    null,
  );
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
      setTab("standard");
      setSimStep("groups");
      setSelectedGroup(null);
    }
  }, [open]);

  // Reset similarity sub-steps when switching tabs
  useEffect(() => {
    setSimStep("groups");
    setSelectedGroup(null);
  }, [tab]);

  if (!open) return null;

  const bucketSize = codesForDifficulty(difficulty).length;
  const effectiveCount = Math.min(count, bucketSize);
  const cfg = DIFFICULTY_CONFIG[difficulty];

  const handleGroupSelect = (group: FlagSimilarity) => {
    setSelectedGroup(group);
    setSimStep("submode");
  };

  const handleSubmode = (hardcore: boolean) => {
    if (!selectedGroup) return;
    const codes = GROUP_CODES[selectedGroup] ?? [];
    const label = FLAG_SIMILARITY_LABELS[selectedGroup];
    onStart({ type: "similarity", groupCodes: codes, groupLabel: label, hardcore });
  };

  const groupCodes = selectedGroup ? (GROUP_CODES[selectedGroup] ?? []) : [];
  const groupLabel = selectedGroup ? FLAG_SIMILARITY_LABELS[selectedGroup] : "";

  const hint =
    tab === "standard"
      ? "Pick how many flags you want, and how hard you want it."
      : simStep === "groups"
        ? "Pick a group of similar flags to test yourself on."
        : `${groupLabel} · ${groupCodes.length} flag${groupCodes.length === 1 ? "" : "s"} — pick your challenge level.`;

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

        <div className="qquiz__tabs" role="tablist">
          <button
            role="tab"
            type="button"
            className={`qquiz__tab ${tab === "standard" ? "qquiz__tab--active" : ""}`}
            aria-selected={tab === "standard"}
            onClick={() => setTab("standard")}
          >
            Standard
          </button>
          <button
            role="tab"
            type="button"
            className={`qquiz__tab ${tab === "similarity" ? "qquiz__tab--active" : ""}`}
            aria-selected={tab === "similarity"}
            onClick={() => setTab("similarity")}
          >
            By Similarity
          </button>
        </div>

        {/* ── Standard tab ── */}
        {tab === "standard" && (
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
                <legend className="qquiz__legend">How hard?</legend>
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
                  Only {bucketSize} flags are classified as{" "}
                  {cfg.label.toLowerCase()}; the game will use all {bucketSize}.
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
                  onStart({
                    type: "standard",
                    flagCount: effectiveCount,
                    difficulty,
                  })
                }
              >
                Play {effectiveCount} {cfg.label} flag
                {effectiveCount === 1 ? "" : "s"}
              </button>
            </footer>
          </>
        )}

        {/* ── By Similarity — group picker ── */}
        {tab === "similarity" && simStep === "groups" && (
          <>
            <div className="qquiz__body qquiz__body--groups">
              {FLAG_SIMILARITY_ORDER.map((group) => {
                const codes = GROUP_CODES[group] ?? [];
                if (codes.length === 0) return null;
                return (
                  <button
                    key={group}
                    type="button"
                    className="qquiz__group-row"
                    onClick={() => handleGroupSelect(group)}
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

        {/* ── By Similarity — sub-mode picker ── */}
        {tab === "similarity" && simStep === "submode" && selectedGroup && (
          <>
            <div className="qquiz__body qquiz__body--submode">
              <button
                type="button"
                className="qquiz__submode"
                onClick={() => handleSubmode(false)}
              >
                <span className="qquiz__submode-emoji" aria-hidden="true">
                  🎯
                </span>
                <span className="qquiz__submode-text">
                  <span className="qquiz__submode-title">Decoy Buttons</span>
                  <span className="qquiz__submode-desc">
                    Choices are only the {groupCodes.length} flags in this
                    group — spot the differences.
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="qquiz__submode"
                onClick={() => handleSubmode(true)}
              >
                <span className="qquiz__submode-emoji" aria-hidden="true">
                  💀
                </span>
                <span className="qquiz__submode-text">
                  <span className="qquiz__submode-title">Hardcore</span>
                  <span className="qquiz__submode-desc">
                    Same {groupCodes.length} flags to guess, but from a
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
      </div>
    </div>
  );
}
