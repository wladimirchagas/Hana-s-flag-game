import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchCountries, type Continent, type Country } from "../api/countries";
import {
  difficultyOf,
  codesForDifficulty,
  type Difficulty,
} from "../lib/flagDifficulty";
import {
  pickSymbolEntry,
  symbolCaption,
  symbolClueFor,
  type QuizSymbol,
} from "../lib/quizSymbols";

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
  /**
   * In quiz mode, the valid country choices for the CURRENT flag — the correct
   * answer plus N-1 same-difficulty distractors. In non-quiz modes this equals
   * `countries`, so callers can always show `questionAlternatives` in the
   * dropdown/map without branching.
   */
  questionAlternatives: Country[];
  /** Max wrong attempts allowed on a single flag, or Infinity for unlimited. */
  maxAttemptsPerFlag: number;
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
   * the same flag until they get it right (or until they hit maxAttemptsPerFlag).
   * Each wrong attempt still costs a point.
   */
  allowRetry?: boolean;
  /**
   * Cap on wrong attempts per flag. When the player hits the cap, the flag is
   * marked wrong and the game advances. Defaults to Infinity (unlimited).
   */
  maxAttemptsPerFlag?: number;
  /**
   * "Quick Quiz" mode: take a random sample of `flagCount` flags from the
   * chosen `difficulty` bucket as the game pool. `optionCount` then controls
   * how many countries appear in the dropdown / are clickable on the map per
   * question (correct + N-1 same-difficulty distractors).
   */
  difficulty?: Difficulty | null;
  flagCount?: number | null;
  optionCount?: number | null;
  /**
   * When true, questionAlternatives uses the full 195-country pool instead of
   * the filtered game pool. Used in similarity-hardcore mode: the game only
   * asks flags from the selected group, but the player must identify them from
   * the full world dropdown.
   */
  useFullAlternatives?: boolean;
  /**
   * Which symbol the card shows. `flag` (the default) is the game that has
   * always shipped; every other pack quizzes a national symbol from the
   * Learn-mode data instead — the question, the answer space and the scoring
   * are identical, only the picture changes. Countries with no such symbol are
   * dropped from the deck (see `codesForSymbol`).
   */
  symbol?: QuizSymbol;
};


/**
 * Re-point a country list at a symbol pack's images.
 *
 * `flagSvg` becomes the symbol's image, so the flag card, the answer burst and
 * the results grid all render the thing that was asked with no knowledge of
 * packs; the country's real flag is kept in `nationalFlagSvg` so "Match the
 * pair" can offer it as an ANSWER while the arms are the question. A country
 * whose symbol is missing, imageless or ambiguous is dropped by
 * `pickSymbolEntry`, never shown blank.
 */
function packCountries(list: Country[], symbol: QuizSymbol): Country[] {
  const base = import.meta.env.BASE_URL;
  const out: Country[] = [];
  for (const c of list) {
    const entry = pickSymbolEntry(c.code, symbol);
    if (!entry?.path) continue;
    const clue = symbol === "meaning" ? symbolClueFor(entry, c.code) : null;
    if (symbol === "meaning" && !clue) continue;
    out.push({
      ...c,
      nationalFlagSvg: c.flagSvg,
      flagSvg: `${base}${entry.path}`,
      symbolPack: symbol,
      symbolCaption: symbolCaption(entry),
      ...(clue ? { symbolClue: clue } : {}),
    });
  }
  return out;
}

export function useGame(options: UseGameOptions = {}): UseGameResult {
  const {
    filterCodes,
    allowRetry = false,
    maxAttemptsPerFlag = Infinity,
    difficulty = null,
    flagCount = null,
    optionCount = null,
    useFullAlternatives = false,
    symbol = "flag",
  } = options;
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
  const [questionAlternatives, setQuestionAlternatives] = useState<Country[]>(
    [],
  );
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  const askedRef = useRef<Set<string>>(new Set());
  const usedDistractorsRef = useRef<Set<string>>(new Set());
  const allCountriesRef = useRef<Country[]>([]);
  const gameStartedAtRef = useRef<number | null>(null);
  const roundStartedAtRef = useRef<number>(0);
  const startRoundRef = useRef<(list: Country[]) => void>(() => {});

  // Per-question alternative builder. `correct` always appears; the rest are
  // random same-difficulty countries from the FULL UN list (not just the game
  // pool), so distractors come from a meaningful set. Falls back to the game
  // pool when difficulty info is missing or the bucket is too small.
  const buildAlternatives = useCallback(
    (correct: Country, gamePool: Country[]): Country[] => {
      if (optionCount == null || optionCount <= 0) {
        return useFullAlternatives && allCountriesRef.current.length > 0
          ? allCountriesRef.current
          : gamePool;
      }
      const correctDifficulty = difficultyOf(correct.code);
      const all = allCountriesRef.current;
      let candidates: Country[] = [];
      if (correctDifficulty && all.length > 0) {
        const sameBucket = new Set(codesForDifficulty(correctDifficulty));
        candidates = all.filter(
          (c) => c.code !== correct.code && sameBucket.has(c.code),
        );
      }
      // Fallback if the difficulty bucket couldn't supply enough distractors.
      if (candidates.length < optionCount - 1) {
        const fallback = (all.length > 0 ? all : gamePool).filter(
          (c) => c.code !== correct.code,
        );
        // Merge while keeping uniqueness.
        const seen = new Set(candidates.map((c) => c.code));
        for (const c of fallback) {
          if (!seen.has(c.code)) {
            candidates.push(c);
            seen.add(c.code);
          }
        }
      }
      // Prefer candidates not yet used as distractors in this game session.
      // If there aren't enough fresh ones, fall back to the full candidate pool.
      const fresh = candidates.filter((c) => !usedDistractorsRef.current.has(c.code));
      const pickFrom = fresh.length >= optionCount - 1 ? fresh : candidates;

      // Shuffle so the N-1 we pick are random, but return in alphabetical order.
      for (let i = pickFrom.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pickFrom[i], pickFrom[j]] = [pickFrom[j]!, pickFrom[i]!];
      }
      const distractors = pickFrom.slice(0, Math.max(0, optionCount - 1));
      distractors.forEach((c) => usedDistractorsRef.current.add(c.code));
      const result = [correct, ...distractors];
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
      );
      return result;
    },
    [optionCount, useFullAlternatives],
  );

  const startRound = useCallback(
    (list: Country[]) => {
      if (list.length === 0) return;
      if (gameStartedAtRef.current === null) {
        const t = Date.now();
        gameStartedAtRef.current = t;
        setGameStartedAtMs(t);
      }
      if (askedRef.current.size >= list.length) {
        askedRef.current.clear();
        usedDistractorsRef.current.clear();
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
      setQuestionAlternatives(buildAlternatives(next, list));
    },
    [buildAlternatives],
  );

  startRoundRef.current = startRound;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fullList = await fetchCountries();
        if (cancelled) return;
        allCountriesRef.current = fullList;
        // Symbol packs replace the image on the card. Applied FIRST, so every
        // later step (code filter, Quick-Quiz sampling, the "empty deck" error)
        // sees the deck the player will actually get.
        const packed = symbol === "flag" ? fullList : packCountries(fullList, symbol);
        let list = packed;
        if (filterCodes && filterCodes.length > 0) {
          const allow = new Set(filterCodes.map((c) => c.toUpperCase()));
          list = packed.filter((c) => allow.has(c.code));
        }
        // Quick Quiz mode: random sample of `flagCount` countries from the
        // full 195-country pool. Difficulty only controls optionCount (number
        // of answer choices), not which flags appear in the game.
        if (flagCount && flagCount > 0) {
          const shuffled = packed.slice();
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
          }
          list = shuffled.slice(0, Math.min(flagCount, shuffled.length));
        }
        if (list.length === 0) {
          setError(
            symbol !== "flag"
              ? "No countries in this group have that symbol bundled yet."
              : filterCodes && filterCodes.length > 0
              ? "None of the selected countries are available."
              : difficulty
              ? `No countries found for difficulty: ${difficulty}.`
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
      const nextAttempts = retryAttempts + 1;
      // Stay on the same flag IF we still have attempts left. When the cap is
      // hit, fall through and mark the flag as wrong / advance the game.
      if (nextAttempts < maxAttemptsPerFlag) {
        setRetryAttempts(nextAttempts);
        setSelected(null);
        return;
      }
      // Cap hit: continue past the early-return so this counts as a wrong
      // flag and we move on. retryAttempts is reset by the next startRound.
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
  }, [
    phase,
    current,
    selected,
    countries.length,
    allowRetry,
    retryAttempts,
    maxAttemptsPerFlag,
  ]);

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
    // Correct answers: retry modes (Hana's Game / Quick Quiz) hold for the
    // kid-readable celebration burst (3.2s); other modes advance quickly
    // (1.5s). Wrong answers only reach "revealed" outside unlimited-retry
    // play (a wrong guess in Hana's Game stays in "guessing"), and always
    // hold for 6s so the fixed answer-reveal burst (5.6s) can be read.
    const advanceDelayMs = wasCorrect ? (allowRetry ? 3200 : 1500) : 6000;
    const timer = window.setTimeout(() => {
      startRound(countries);
    }, advanceDelayMs);
    return () => window.clearTimeout(timer);
  }, [phase, countries, startRound, allowRetry, wasCorrect]);

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
      questionAlternatives:
        questionAlternatives.length > 0 ? questionAlternatives : countries,
      maxAttemptsPerFlag,
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
      questionAlternatives,
      maxAttemptsPerFlag,
      confirm,
      next,
      endGameEarly,
      gameStartedAtMs,
      gameEndedAtMs,
      meanAnswerMs,
    ]
  );
}
