import { useMemo, useState } from "react";
import {
  formatWvsSelectionLabel,
  getWvsQuestionsByTheme,
  getOlderWvsSocieties,
  getWvsThemes,
  type WvsSelection,
} from "../lib/wvsResults";

export type WvsSelectionPickerProps = {
  value: WvsSelection | null;
  onChange: (next: WvsSelection | null) => void;
  /** Optional heading above the theme list. */
  heading?: string;
};

/**
 * Thematic accordion for picking one WVS question and one or more answer
 * columns to sum. Used by the Indexes map popover and the chart axis pickers.
 * No default selection — the parent must start with `value: null`.
 */
export function WvsSelectionPicker({
  value,
  onChange,
  heading = "World Values Survey",
}: WvsSelectionPickerProps) {
  const themes = useMemo(() => getWvsThemes(), []);
  const olderSurveys = useMemo(() => getOlderWvsSocieties(), []);
  const [openTheme, setOpenTheme] = useState<string | null>(
    value ? themeOf(value.questionId) : null,
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    value?.questionId ?? null,
  );

  const selectedLabel = formatWvsSelectionLabel(value);

  const toggleAnswer = (questionId: string, answerIndex: number) => {
    const sameQ = value?.questionId === questionId;
    const prev = sameQ ? value.answerIndexes : [];
    const next = prev.includes(answerIndex)
      ? prev.filter((i) => i !== answerIndex)
      : [...prev, answerIndex].sort((a, b) => a - b);
    if (next.length === 0) {
      onChange(null);
      return;
    }
    onChange({ questionId, answerIndexes: next });
  };

  return (
    <div className="wvs-picker">
      <p className="democracy-map-control__group-label">{heading}</p>
      <p className="wvs-picker__note">
        Wave 7, 2017–2022 (World Values Survey Association). Pick a question,
        then tick one or more answers to sum. Countries without data keep the
        default map colour.
        {olderSurveys.length > 0 &&
          ` Older survey shown: ${olderSurveys.map((o) => `${o.name}, ${o.label}`).join("; ")}.`}
      </p>
      {selectedLabel && (
        <div className="wvs-picker__active">
          <span className="wvs-picker__active-label">{selectedLabel}</span>
          <button
            type="button"
            className="wvs-picker__clear"
            onClick={() => {
              onChange(null);
              setOpenQuestion(null);
            }}
          >
            Clear
          </button>
        </div>
      )}
      <div className="wvs-picker__themes">
        {themes.map((theme) => {
          const questions = getWvsQuestionsByTheme(theme.id);
          if (questions.length === 0) return null;
          const themeOpen = openTheme === theme.id;
          return (
            <div key={theme.id} className="wvs-picker__theme">
              <button
                type="button"
                className={`wvs-picker__theme-btn${themeOpen ? " wvs-picker__theme-btn--open" : ""}`}
                aria-expanded={themeOpen}
                onClick={() =>
                  setOpenTheme((cur) => (cur === theme.id ? null : theme.id))
                }
              >
                <span>{theme.label}</span>
                <span className="wvs-picker__count">{questions.length}</span>
              </button>
              {themeOpen && (
                <ul className="wvs-picker__questions">
                  {questions.map((q) => {
                    const qOpen = openQuestion === q.id;
                    const isActive = value?.questionId === q.id;
                    return (
                      <li key={q.id} className="wvs-picker__question">
                        <button
                          type="button"
                          className={`wvs-picker__question-btn${isActive ? " wvs-picker__question-btn--active" : ""}${qOpen ? " wvs-picker__question-btn--open" : ""}`}
                          aria-expanded={qOpen}
                          onClick={() =>
                            setOpenQuestion((cur) => (cur === q.id ? null : q.id))
                          }
                        >
                          <span className="wvs-picker__qid">{q.id}</span>
                          <span className="wvs-picker__qtitle">{q.title}</span>
                        </button>
                        {qOpen && (
                          <fieldset className="wvs-picker__answers">
                            <legend className="visually-hidden">
                              Answers for {q.title}
                            </legend>
                            {q.answers.map((answer, i) => {
                              const checked =
                                value?.questionId === q.id &&
                                value.answerIndexes.includes(i);
                              return (
                                <label key={`${q.id}-${i}`} className="wvs-picker__answer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleAnswer(q.id, i)}
                                  />
                                  <span>{answer}</span>
                                </label>
                              );
                            })}
                          </fieldset>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function themeOf(questionId: string): string | null {
  for (const theme of getWvsThemes()) {
    if (getWvsQuestionsByTheme(theme.id).some((q) => q.id === questionId)) {
      return theme.id;
    }
  }
  return null;
}
