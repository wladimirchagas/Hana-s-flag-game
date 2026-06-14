import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hasSubdivisionFlag } from "../api/subdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { DISPUTED_SUBDIV_NOTES, DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";

export type DisputedGamePhase = "loading" | "error" | "guessing" | "revealed" | "finished";

export type UseDisputedTerritoriesGameResult = {
  phase: DisputedGamePhase;
  error: string | null;
  current: SubdivisionMeta | null;
  selected: SubdivisionMeta | null;
  setSelected: (d: SubdivisionMeta | null) => void;
  confirm: () => void;
  wasCorrect: boolean | null;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalDivisions: number;
  attemptNonce: number;
  divisionResults: Record<string, "correct" | "wrong">;
  divisions: SubdivisionMeta[];
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};

/** Collects all disputed/claimed subnational divisions across every country in
 *  SUBDIVISION_META that have an actual flag. A division qualifies when it has
 *  `isDisputed: true` OR its code appears in DISPUTED_SUBDIV_NOTES (the
 *  documented list of politically contested territories). Excludes hierarchy
 *  children (e.g. AR-ML~, ES-GIB~, IN-AK~, IN-GB~) and deduplicates by code
 *  so the same territory appearing under multiple claimants is only asked once. */
function buildDisputedDivisions(): SubdivisionMeta[] {
  const disputedCodes = new Set(Object.keys(DISPUTED_SUBDIV_NOTES));
  const seen = new Set<string>();
  const result: SubdivisionMeta[] = [];

  for (const meta of Object.values(SUBDIVISION_META)) {
    for (const d of meta.divisions) {
      if (seen.has(d.code)) continue;
      if (d.code in DISPUTED_TERRITORY_HIERARCHY) continue;
      if (!d.isDisputed && !disputedCodes.has(d.code)) continue;
      if (!hasSubdivisionFlag(d.code)) continue;
      seen.add(d.code);
      result.push(d);
    }
  }

  return result;
}

export function useDisputedTerritoriesGame(): UseDisputedTerritoriesGameResult {
  const [phase, setPhase] = useState<DisputedGamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [divisions, setDivisions] = useState<SubdivisionMeta[]>([]);
  const [current, setCurrent] = useState<SubdivisionMeta | null>(null);
  const [selected, setSelected] = useState<SubdivisionMeta | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [divisionResults, setDivisionResults] = useState<Record<string, "correct" | "wrong">>({});
  const [attemptNonce, setAttemptNonce] = useState(0);
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  const askedRef = useRef<Set<string>>(new Set());
  const gameStartedAtRef = useRef<number | null>(null);
  const roundStartedAtRef = useRef<number>(0);
  const divisionsRef = useRef<SubdivisionMeta[]>([]);
  const startRoundRef = useRef<(list: SubdivisionMeta[]) => void>(() => {});

  const startRound = useCallback((list: SubdivisionMeta[]) => {
    if (list.length === 0) return;
    if (gameStartedAtRef.current === null) {
      const t = Date.now();
      gameStartedAtRef.current = t;
      setGameStartedAtMs(t);
    }
    if (askedRef.current.size >= list.length) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pool = list.filter((d) => !askedRef.current.has(d.code));
    if (pool.length === 0) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    askedRef.current.add(pick.code);
    roundStartedAtRef.current = Date.now();
    setCurrent(pick);
    setSelected(null);
    setPhase("guessing");
    setWasCorrect(null);
  }, []);

  startRoundRef.current = startRound;

  useEffect(() => {
    const divs = buildDisputedDivisions();
    if (divs.length === 0) {
      setError("No disputed/claimed territory flags are currently available.");
      setPhase("error");
      return;
    }
    setDivisions(divs);
    divisionsRef.current = divs;
    askedRef.current = new Set();
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setDivisionResults({});
    setAnswerDurationsMs([]);
    gameStartedAtRef.current = null;
    setGameStartedAtMs(null);
    setGameEndedAtMs(null);
    startRoundRef.current(divs);
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = useCallback(() => {
    if (phase !== "guessing" || !current || !selected) return;
    const correct = selected.code === current.code;
    setWasCorrect(correct);
    setAttemptNonce((n) => n + 1);
    setScore((s) => (correct ? s + 1 : s - 1));
    if (correct) setCorrectCount((c) => c + 1);
    else setWrongCount((c) => c + 1);

    setDivisionResults((prev) => ({
      ...prev,
      [current.code]: correct ? "correct" : "wrong",
    }));

    const answerMs = Date.now() - roundStartedAtRef.current;
    setAnswerDurationsMs((prev) => [...prev, answerMs]);

    const list = divisionsRef.current;
    const allAsked = askedRef.current.size >= list.length;
    if (allAsked) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
    } else {
      setPhase("revealed");
    }
  }, [phase, current, selected]);

  useEffect(() => {
    if (phase !== "revealed" || divisionsRef.current.length === 0) return;
    const timer = window.setTimeout(() => {
      startRound(divisionsRef.current);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [phase, startRound]);

  const endGameEarly = useCallback(() => {
    if (phase === "loading" || phase === "error" || phase === "finished") return;
    setGameEndedAtMs((prev) => (prev != null ? prev : Date.now()));
    setPhase("finished");
  }, [phase]);

  const meanAnswerMs = useMemo(() => {
    if (answerDurationsMs.length === 0) return null;
    const sum = answerDurationsMs.reduce((a, b) => a + b, 0);
    return sum / answerDurationsMs.length;
  }, [answerDurationsMs]);

  return useMemo(() => ({
    phase,
    error,
    current,
    selected,
    setSelected,
    confirm,
    wasCorrect,
    score,
    correctCount,
    wrongCount,
    totalAnswered: correctCount + wrongCount,
    totalDivisions: divisions.length,
    attemptNonce,
    divisionResults,
    divisions,
    endGameEarly,
    gameStartedAtMs,
    gameEndedAtMs,
    meanAnswerMs,
  }), [
    phase, error, current, selected, confirm,
    wasCorrect, score, correctCount, wrongCount, divisions, attemptNonce,
    divisionResults, endGameEarly, gameStartedAtMs, gameEndedAtMs, meanAnswerMs,
  ]);
}
