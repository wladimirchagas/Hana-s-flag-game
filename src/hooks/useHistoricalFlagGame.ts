import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildHistoricalDeck,
  optionsFor,
  type HistoricalAsk,
  type HistoricalQuestion,
} from "../lib/historicalQuiz";

/**
 * The two historical decks whose answer is not a country: "Under whose rule?"
 * (answer = the ruling power) and "Date the flag" (answer = the period it was
 * first flown).
 *
 * Deliberately its own hook rather than an option on `useGame`: those decks are
 * keyed by FLAG ENTRY, not by country — one country contributes several
 * questions and one flag can belong to several countries — so the country-keyed
 * pool, distractor and results machinery in `useGame` does not apply. Scoring,
 * timing and the one-guess rule are the same, so a finished run produces the
 * same leaderboard entry shape as every other mode.
 */

export type HistoricalGamePhase =
  | "loading"
  | "error"
  | "guessing"
  | "revealed"
  | "finished";

export type UseHistoricalFlagGameResult = {
  phase: HistoricalGamePhase;
  error: string | null;
  current: HistoricalQuestion | null;
  /** The answer choices for the current question, correct answer included. */
  options: string[];
  selected: string | null;
  setSelected: (a: string | null) => void;
  confirm: () => void;
  wasCorrect: boolean | null;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalQuestions: number;
  attemptNonce: number;
  /** Per-question outcomes, keyed by entry id — feeds the results list. */
  results: Record<string, "correct" | "wrong">;
  /** The deck, in the order it was drawn, so results can show every question. */
  deck: HistoricalQuestion[];
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};

/** Choices offered per question. Four keeps a period question honest without
 *  making a 22-power ruler question a lottery. */
const OPTIONS_PER_QUESTION = 4;

export function useHistoricalFlagGame(
  ask: HistoricalAsk,
  questionCount: number,
): UseHistoricalFlagGameResult {
  const [phase, setPhase] = useState<HistoricalGamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [deck, setDeck] = useState<HistoricalQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [results, setResults] = useState<Record<string, "correct" | "wrong">>({});
  const [attemptNonce, setAttemptNonce] = useState(0);
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  const roundStartedAtRef = useRef<number>(0);

  useEffect(() => {
    try {
      const full = buildHistoricalDeck(ask);
      if (full.length === 0) {
        setError("No historical flags are available for this deck.");
        setPhase("error");
        return;
      }
      const drawn = full.slice(0, Math.max(1, Math.min(questionCount, full.length)));
      setDeck(drawn);
      setIndex(0);
      setSelected(null);
      setWasCorrect(null);
      setScore(0);
      setCorrectCount(0);
      setWrongCount(0);
      setResults({});
      setAnswerDurationsMs([]);
      const now = Date.now();
      roundStartedAtRef.current = now;
      setGameStartedAtMs(now);
      setGameEndedAtMs(null);
      setPhase("guessing");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setPhase("error");
    }
  }, [ask, questionCount]);

  const current = deck[index] ?? null;

  // Options are derived from the question, so they are stable for as long as
  // that question is on screen and are rebuilt exactly once per advance.
  const options = useMemo(
    () => (current ? optionsFor(ask, current, OPTIONS_PER_QUESTION) : []),
    [ask, current],
  );

  const confirm = useCallback(() => {
    if (phase !== "guessing" || !current || selected === null) return;
    const correct = selected === current.answer;
    setWasCorrect(correct);
    setAttemptNonce((n) => n + 1);
    setScore((s) => (correct ? s + 1 : s - 1));
    if (correct) setCorrectCount((c) => c + 1);
    else setWrongCount((c) => c + 1);
    setResults((prev) => ({ ...prev, [current.id]: correct ? "correct" : "wrong" }));
    setAnswerDurationsMs((prev) => [...prev, Date.now() - roundStartedAtRef.current]);
    if (index + 1 >= deck.length) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
    } else {
      setPhase("revealed");
    }
  }, [phase, current, selected, index, deck.length]);

  const next = useCallback(() => {
    if (phase !== "revealed") return;
    setIndex((i) => i + 1);
    setSelected(null);
    setWasCorrect(null);
    roundStartedAtRef.current = Date.now();
    setPhase("guessing");
  }, [phase]);

  // Advancing is automatic after the reveal, exactly like the flag game: the
  // reveal is a beat, not a screen the player has to dismiss.
  useEffect(() => {
    if (phase !== "revealed") return;
    const t = window.setTimeout(next, 1600);
    return () => window.clearTimeout(t);
  }, [phase, next]);

  const endGameEarly = useCallback(() => {
    setGameEndedAtMs(Date.now());
    setPhase("finished");
  }, []);

  const totalAnswered = correctCount + wrongCount;
  const meanAnswerMs =
    answerDurationsMs.length > 0
      ? answerDurationsMs.reduce((a, b) => a + b, 0) / answerDurationsMs.length
      : null;

  return {
    phase,
    error,
    current,
    options,
    selected,
    setSelected,
    confirm,
    wasCorrect,
    score,
    correctCount,
    wrongCount,
    totalAnswered,
    totalQuestions: deck.length,
    attemptNonce,
    results,
    deck,
    endGameEarly,
    gameStartedAtMs,
    gameEndedAtMs,
    meanAnswerMs,
  };
}
