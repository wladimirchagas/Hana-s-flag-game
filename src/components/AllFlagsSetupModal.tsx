import { useEffect, useRef, useState } from "react";
import {
  FLAG_SIMILARITY_LABELS,
  FLAG_SIMILARITY_ORDER,
  FLAG_SIMILARITIES,
  type FlagSimilarity,
} from "../lib/flagSimilarity";

// Derive group → country codes from the per-country similarity map
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

export type AllFlagsStart =
  | { type: "all195" }
  | {
      type: "similarity";
      groupCodes: string[];
      groupLabel: string;
      hardcore: boolean;
    };

export type AllFlagsSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (start: AllFlagsStart) => void;
};

type ModalStep = "modes" | "groups" | "submode";

export function AllFlagsSetupModal({
  open,
  onClose,
  onStart,
}: AllFlagsSetupModalProps) {
  const [step, setStep] = useState<ModalStep>("modes");
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
      setStep("modes");
      setSelectedGroup(null);
    }
  }, [open]);

  if (!open) return null;

  const handleBack = () => {
    if (step === "submode") setStep("groups");
    else if (step === "groups") setStep("modes");
  };

  const handleGroupSelect = (group: FlagSimilarity) => {
    setSelectedGroup(group);
    setStep("submode");
  };

  const handleSubmode = (hardcore: boolean) => {
    if (!selectedGroup) return;
    const codes = GROUP_CODES[selectedGroup] ?? [];
    const label = FLAG_SIMILARITY_LABELS[selectedGroup];
    onStart({ type: "similarity", groupCodes: codes, groupLabel: label, hardcore });
  };

  const groupCodes = selectedGroup ? (GROUP_CODES[selectedGroup] ?? []) : [];
  const groupLabel = selectedGroup ? FLAG_SIMILARITY_LABELS[selectedGroup] : "";

  const titleText =
    step === "modes"
      ? "Ultimate Challenge"
      : step === "groups"
        ? "By Similarity"
        : groupLabel;

  const hintText =
    step === "modes"
      ? "Choose your hard mode."
      : step === "groups"
        ? "Pick a group to test yourself on."
        : `${groupCodes.length} flag${groupCodes.length === 1 ? "" : "s"} — pick your challenge level.`;

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
            {step !== "modes" && (
              <button
                type="button"
                className="all195__back"
                onClick={handleBack}
                aria-label="Back"
              >
                ←
              </button>
            )}
            <div>
              <h2 id="all195-title" className="all195__title">
                {titleText}
              </h2>
              <p className="all195__hint">{hintText}</p>
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

        {step === "modes" && (
          <div className="all195__body">
            <button
              type="button"
              className="all195__option"
              onClick={() => onStart({ type: "all195" })}
            >
              <span className="all195__option-emoji" aria-hidden="true">
                🌍
              </span>
              <span className="all195__option-text">
                <span className="all195__option-title">All 195 Flags</span>
                <span className="all195__option-desc">
                  The full set in random order. One guess per flag — no
                  retries, no mercy.
                </span>
              </span>
              <span
                className="all195__option-cta all195__option-cta--lime"
                aria-hidden="true"
              >
                PLAY →
              </span>
            </button>

            <button
              type="button"
              className="all195__option"
              onClick={() => setStep("groups")}
            >
              <span className="all195__option-emoji" aria-hidden="true">
                🔍
              </span>
              <span className="all195__option-text">
                <span className="all195__option-title">By Similarity</span>
                <span className="all195__option-desc">
                  Pick a group of visually similar flags and see if you can
                  tell them apart.
                </span>
              </span>
              <span
                className="all195__option-cta all195__option-cta--sky"
                aria-hidden="true"
              >
                CHOOSE →
              </span>
            </button>
          </div>
        )}

        {step === "groups" && (
          <div className="all195__body all195__body--groups">
            {FLAG_SIMILARITY_ORDER.map((group) => {
              const codes = GROUP_CODES[group] ?? [];
              if (codes.length === 0) return null;
              return (
                <button
                  key={group}
                  type="button"
                  className="all195__group-row"
                  onClick={() => handleGroupSelect(group)}
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
        )}

        {step === "submode" && selectedGroup && (
          <div className="all195__body">
            <button
              type="button"
              className="all195__option"
              onClick={() => handleSubmode(false)}
            >
              <span className="all195__option-emoji" aria-hidden="true">
                🎯
              </span>
              <span className="all195__option-text">
                <span className="all195__option-title">Decoy Buttons</span>
                <span className="all195__option-desc">
                  Your choices are only the {groupCodes.length} flags in this
                  group — spot the differences.
                </span>
              </span>
              <span
                className="all195__option-cta all195__option-cta--mustard"
                aria-hidden="true"
              >
                PLAY →
              </span>
            </button>

            <button
              type="button"
              className="all195__option"
              onClick={() => handleSubmode(true)}
            >
              <span className="all195__option-emoji" aria-hidden="true">
                💀
              </span>
              <span className="all195__option-text">
                <span className="all195__option-title">Hardcore</span>
                <span className="all195__option-desc">
                  Same {groupCodes.length} flags to guess, but picked from a
                  dropdown of all 195. No hints.
                </span>
              </span>
              <span
                className="all195__option-cta all195__option-cta--coral"
                aria-hidden="true"
              >
                PLAY →
              </span>
            </button>
          </div>
        )}

        <footer className="all195__footer">
          <button type="button" className="all195__cancel" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
