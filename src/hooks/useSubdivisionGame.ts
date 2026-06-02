import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchSubdivisionGeo } from "../api/subdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import type { SubdivisionMeta } from "../types/subdivision";
import type { SubdivisionFeatureCollection } from "../types/subdivision";

export type SubdivGamePhase = "loading" | "error" | "guessing" | "revealed" | "finished";
export type SubdivGameDirection = "flag-to-map" | "map-to-flag";

export type UseSubdivisionGameResult = {
  phase: SubdivGamePhase;
  error: string | null;
  direction: SubdivGameDirection;
  setDirection: (d: SubdivGameDirection) => void;
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
  questionAlternatives: SubdivisionMeta[];
  geoData: SubdivisionFeatureCollection | null;
  countryCode: string;
  countryName: string;
  pluralLabel: string;
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function buildAlternatives(
  correct: SubdivisionMeta,
  all: SubdivisionMeta[],
  count = 6,
): SubdivisionMeta[] {
  const others = all.filter((d) => d.code !== correct.code);
  const shuffled = shuffle(others).slice(0, Math.max(0, count - 1));
  return shuffle([correct, ...shuffled]);
}

export function useSubdivisionGame(
  countryCode: string,
  countryName: string,
): UseSubdivisionGameResult {
  const [phase, setPhase] = useState<SubdivGamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirectionState] = useState<SubdivGameDirection>("flag-to-map");
  const [geoData, setGeoData] = useState<SubdivisionFeatureCollection | null>(null);
  const [divisions, setDivisions] = useState<SubdivisionMeta[]>([]);
  const [current, setCurrent] = useState<SubdivisionMeta | null>(null);
  const [selected, setSelected] = useState<SubdivisionMeta | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [divisionResults, setDivisionResults] = useState<Record<string, "correct" | "wrong">>({});
  const [attemptNonce, setAttemptNonce] = useState(0);
  const [questionAlternatives, setQuestionAlternatives] = useState<SubdivisionMeta[]>([]);
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  // Refs for stable callbacks
  const askedRef = useRef<Set<string>>(new Set());
  const gameStartedAtRef = useRef<number | null>(null);
  const roundStartedAtRef = useRef<number>(0);
  const divisionsRef = useRef<SubdivisionMeta[]>([]);
  const startRoundRef = useRef<(list: SubdivisionMeta[]) => void>(() => {});

  const meta = SUBDIVISION_META[countryCode.toUpperCase()];
  const pluralLabel = meta?.pluralLabel ?? "Divisions";

  const startRound = useCallback((list: SubdivisionMeta[]) => {
    if (list.length === 0) return;
    if (gameStartedAtRef.current === null) {
      const t = Date.now();
      gameStartedAtRef.current = t;
      setGameStartedAtMs(t);
    }
    if (askedRef.current.size >= list.length) {
      // All asked: game is complete
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pool = list.filter((d) => !askedRef.current.has(d.code));
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    askedRef.current.add(pick.code);
    roundStartedAtRef.current = Date.now();
    setCurrent(pick);
    setSelected(null);
    setPhase("guessing");
    setWasCorrect(null);
    setQuestionAlternatives(buildAlternatives(pick, list));
  }, []);

  startRoundRef.current = startRound;

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    setPhase("loading");
    setError(null);

    (async () => {
      try {
        const geo = await fetchSubdivisionGeo(countryCode);
        if (cancelled) return;

        const metaEntry = SUBDIVISION_META[countryCode.toUpperCase()];
        if (!metaEntry || metaEntry.divisions.length === 0) {
          setError(`No sub-national data available for ${countryName}.`);
          setPhase("error");
          return;
        }

        setGeoData(geo);
        const divs = metaEntry.divisions;
        setDivisions(divs);
        divisionsRef.current = divs;

        // Reset game state
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
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load subdivision data.");
        setPhase("error");
      }
    })();

    return () => { cancelled = true; };
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

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

  // Auto-advance after 1500ms in "revealed" phase
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

  const setDirection = useCallback((d: SubdivGameDirection) => {
    setDirectionState(d);
    // Reset game when direction changes
    const list = divisionsRef.current;
    if (list.length === 0) return;
    askedRef.current = new Set();
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setDivisionResults({});
    setAnswerDurationsMs([]);
    gameStartedAtRef.current = null;
    setGameStartedAtMs(null);
    setGameEndedAtMs(null);
    startRoundRef.current(list);
  }, []);

  const meanAnswerMs = useMemo(() => {
    if (answerDurationsMs.length === 0) return null;
    const sum = answerDurationsMs.reduce((a, b) => a + b, 0);
    return sum / answerDurationsMs.length;
  }, [answerDurationsMs]);

  return useMemo(() => ({
    phase,
    error,
    direction,
    setDirection,
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
    questionAlternatives: questionAlternatives.length > 0 ? questionAlternatives : divisions,
    geoData,
    countryCode,
    countryName,
    pluralLabel,
    endGameEarly,
    gameStartedAtMs,
    gameEndedAtMs,
    meanAnswerMs,
  }), [
    phase, error, direction, setDirection, current, selected, confirm,
    wasCorrect, score, correctCount, wrongCount, divisions, attemptNonce,
    divisionResults, questionAlternatives, geoData, countryCode, countryName,
    pluralLabel, endGameEarly, gameStartedAtMs, gameEndedAtMs, meanAnswerMs,
  ]);
}
