import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchCountries, type Continent, type Country } from "../api/countries";

export type GamePhase =
  | "loading"
  | "error"
  | "guessing"
  | "revealed"
  | "finished";

export type UseGameResult = {
  countries: Country[];
  current: Country | null;
  selected: Country | null;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalFlags: number;
  continentBreakdown: Array<{
    continent: Continent;
    countriesInContinent: number;
    correct: number;
    wrong: number;
    total: number;
    correctPct: number;
    wrongPct: number;
  }>;
  countryResults: Record<string, "correct" | "wrong">;
  phase: GamePhase;
  error: string | null;
  wasCorrect: boolean | null;
  /** Increments on every confirm() call. Use as a React key to retrigger animations. */
  attemptNonce: number;
  /** Number of wrong guesses on the *current* flag in retry mode (0 when not retrying). */
  retryAttempts: number;
  setSelected: (c: Country | null) => void;
  confirm: () => void;
  next: () => void;
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};

export type UseGameOptions = {
  /** If provided, only quiz on countries whose ISO code is in this list. */
  filterCodes?: string[] | null;
  /**
   * If true, a wrong guess does not end the round — the player can keep guessing
   * the same flag until they get it right. Each wrong attempt still costs a point.
   */
  allowRetry?: boolean;
};

export function useGame(options: UseGameOptions = {}): UseGameResult {
  const { filterCodes, allowRetry = false } = options;
  const [countries, setCountries] = useState<Country[]>([]);
  const [current, setCurrent] = useState<Country | null>(null);
  const [selected, setSelected] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [countryResults, setCountryResults] = useState<
    Record<string, "correct" | "wrong">
  >({});
  const [phase, setPhase] = useState<GamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [attemptNonce, setAttemptNonce] = useState(0);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  const askedRef = useRef<Set<string>>(new Set());
  const gameStartedAtRef = useRef<number | null>(null);
  const roundStartedAtRef = useRef<number>(0);
  const startRoundRef = useRef<(list: Country[]) => void>(() => {});

  const startRound = useCallback((list: Country[]) => {
    if (list.length === 0) return;
    if (gameStartedAtRef.current === null) {
      const t = Date.now();
      gameStartedAtRef.current = t;
      setGameStartedAtMs(t);
    }
    if (askedRef.current.size >= list.length) {
      askedRef.current.clear();
    }
    const pool = list.filter((c) => !askedRef.current.has(c.code));
    const pickFrom = pool.length > 0 ? pool : list;
    const idx = Math.floor(Math.random() * pickFrom.length);
    const next = pickFrom[idx]!;
    askedRef.current.add(next.code);
    roundStartedAtRef.current = Date.now();
    setCurrent(next);
    setSelected(null);
    setPhase("guessing");
    setWasCorrect(null);
    setRetryAttempts(0);
  }, []);

  startRoundRef.current = startRound;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fullList = await fetchCountries();
        if (cancelled) return;
        let list = fullList;
        if (filterCodes && filterCodes.length > 0) {
          const allow = new Set(filterCodes.map((c) => c.toUpperCase()));
          list = fullList.filter((c) => allow.has(c.code));
        }
        if (list.length === 0) {
          setError(
            filterCodes && filterCodes.length > 0
              ? "None of the selected countries are available."
              : "No countries returned from API.",
          );
          setPhase("error");
          return;
        }
        setCountries(list);
        askedRef.current = new Set();
        setScore(0);
        setCorrectCount(0);
        setWrongCount(0);
        setCountryResults({});
        setAnswerDurationsMs([]);
        gameStartedAtRef.current = null;
        setGameStartedAtMs(null);
        setGameEndedAtMs(null);
        startRoundRef.current(list);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Unknown error");
        setPhase("error");
      }
    })();
    return () => {
      cancelled = true;
    };
    // Intentionally mount-only: refetching replaces `countries` and resets progress; `startRound`
    // is read via ref so this effect does not re-run when that callback identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = useCallback(() => {
    if (phase !== "guessing" || !current || !selected) return;
    const correct = selected.code === current.code;
    setWasCorrect(correct);
    setAttemptNonce((n) => n + 1);
    setScore((s) => (correct ? s + 1 : s - 1));

    if (!correct && allowRetry) {
      // Retry mode: stay on the same flag, clear selection, count the attempt.
      setRetryAttempts((n) => n + 1);
      setSelected(null);
      return;
    }

    if (correct) {
      setCorrectCount((count) => count + 1);
    } else {
      setWrongCount((count) => count + 1);
    }
    setCountryResults((prev) => ({
      ...prev,
      [current.code]: correct ? "correct" : "wrong",
    }));
    const answerMs = Date.now() - roundStartedAtRef.current;
    setAnswerDurationsMs((prev) => [...prev, answerMs]);
    const gameComplete = askedRef.current.size >= countries.length;
    if (gameComplete) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
    } else {
      setPhase("revealed");
    }
  }, [phase, current, selected, countries.length, allowRetry]);

  const endGameEarly = useCallback(() => {
    if (phase === "loading" || phase === "error" || phase === "finished") {
      return;
    }
    setGameEndedAtMs((prev) => (prev != null ? prev : Date.now()));
    setPhase("finished");
  }, [phase]);

  const next = useCallback(() => {
    if (phase !== "revealed" || countries.length === 0) return;
    startRound(countries);
  }, [phase, countries, startRound]);

  useEffect(() => {
    if (phase !== "revealed" || countries.length === 0) return;
    const timer = window.setTimeout(() => {
      startRound(countries);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [phase, countries, startRound]);

  const totalAnswered = correctCount + wrongCount;
  const totalFlags = countries.length;
  const meanAnswerMs = useMemo(() => {
    if (answerDurationsMs.length === 0) return null;
    const sum = answerDurationsMs.reduce((a, b) => a + b, 0);
    return sum / answerDurationsMs.length;
  }, [answerDurationsMs]);
  const continentBreakdown = useMemo(() => {
    const continents: Continent[] = [
      "Africa",
      "Americas",
      "Asia",
      "Europe",
      "Oceania",
    ];
    const stats: Record<Continent, { correct: number; wrong: number }> = {
      Africa: { correct: 0, wrong: 0 },
      Americas: { correct: 0, wrong: 0 },
      Asia: { correct: 0, wrong: 0 },
      Europe: { correct: 0, wrong: 0 },
      Oceania: { correct: 0, wrong: 0 },
    };

    const countriesInContinent: Record<Continent, number> = {
      Africa: 0,
      Americas: 0,
      Asia: 0,
      Europe: 0,
      Oceania: 0,
    };

    const codeToContinent = new Map<string, Continent>();
    for (const country of countries) {
      codeToContinent.set(country.code, country.continent);
      countriesInContinent[country.continent] += 1;
    }

    for (const [code, result] of Object.entries(countryResults)) {
      const continent = codeToContinent.get(code);
      if (!continent) continue;
      if (result === "correct") {
        stats[continent].correct += 1;
      } else {
        stats[continent].wrong += 1;
      }
    }

    return continents.map((continent) => {
      const correct = stats[continent].correct;
      const wrong = stats[continent].wrong;
      const total = correct + wrong;
      const correctPct = total > 0 ? (correct / total) * 100 : 0;
      const wrongPct = total > 0 ? (wrong / total) * 100 : 0;
      return {
        continent,
        countriesInContinent: countriesInContinent[continent],
        correct,
        wrong,
        total,
        correctPct,
        wrongPct,
      };
    });
  }, [countries, countryResults]);

  return useMemo(
    () => ({
      countries,
      current,
      selected,
      score,
      correctCount,
      wrongCount,
      totalAnswered,
      totalFlags,
      continentBreakdown,
      countryResults,
      phase,
      error,
      wasCorrect,
      attemptNonce,
      retryAttempts,
      setSelected,
      confirm,
      next,
      endGameEarly,
      gameStartedAtMs,
      gameEndedAtMs,
      meanAnswerMs,
    }),
    [
      countries,
      current,
      selected,
      score,
      correctCount,
      wrongCount,
      totalAnswered,
      totalFlags,
      continentBreakdown,
      countryResults,
      phase,
      error,
      wasCorrect,
      attemptNonce,
      retryAttempts,
      confirm,
      next,
      endGameEarly,
      gameStartedAtMs,
      gameEndedAtMs,
      meanAnswerMs,
    ]
  );
}
