import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMergedSubdivisionGeo, hasSubdivisionFlag } from "../api/subdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";
import type { SubdivisionFeatureCollection } from "../types/subdivision";

export type SubdivGamePhase = "loading" | "error" | "guessing" | "revealed" | "finished";

export type UseSubdivisionGameResult = {
  phase: SubdivGamePhase;
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
  geoData: SubdivisionFeatureCollection | null;
  countryCode: string;
  countryName: string;
  pluralLabel: string;
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};


export function useSubdivisionGame(
  countryCode: string,
  countryName: string,
): UseSubdivisionGameResult {
  const [phase, setPhase] = useState<SubdivGamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
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
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pool = list.filter((d) => !askedRef.current.has(d.code));
    if (pool.length === 0) {
      // Safety net: all unique codes already asked, end the game.
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

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    setPhase("loading");
    setError(null);

    (async () => {
      try {
        const geo = await fetchMergedSubdivisionGeo(countryCode);
        if (cancelled) return;

        const metaEntry = SUBDIVISION_META[countryCode.toUpperCase()];
        if (!metaEntry || metaEntry.divisions.length === 0) {
          setError(`No sub-national data available for ${countryName}.`);
          setPhase("error");
          return;
        }

        setGeoData(geo);
        // Only include divisions that have a flag; deduplicate by ISO code
        // (SUBDIVISION_META source data sometimes has the same code twice).
        // Hierarchy children (e.g. AR-ML~, ES-GIB~, IN-AK~, IN-GB~) are excluded:
        // their landmass redirects to the parent subdivision on the map, so asking
        // about them as standalone game targets would be incorrect.
        const seen = new Set<string>();
        const divs = metaEntry.divisions.filter((d) => {
          if (d.code in DISPUTED_TERRITORY_HIERARCHY) return false;
          if (!hasSubdivisionFlag(d.code) || seen.has(d.code)) return false;
          seen.add(d.code);
          return true;
        });
        if (divs.length === 0) {
          setError(`No sub-national flags available for ${countryName}.`);
          setPhase("error");
          return;
        }
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
    geoData,
    countryCode,
    countryName,
    pluralLabel,
    endGameEarly,
    gameStartedAtMs,
    gameEndedAtMs,
    meanAnswerMs,
  }), [
    phase, error, current, selected, confirm,
    wasCorrect, score, correctCount, wrongCount, divisions, attemptNonce,
    divisionResults, geoData, countryCode, countryName,
    pluralLabel, endGameEarly, gameStartedAtMs, gameEndedAtMs, meanAnswerMs,
  ]);
}
