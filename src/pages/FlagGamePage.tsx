import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import type { LeaderboardFilter } from "../context/LeaderboardContext";
import { buildLeaderboardEntryFromGame } from "../lib/buildLeaderboardEntryFromGame";
import { FlagCard } from "../components/FlagCard";
import { CountryDropdown } from "../components/CountryDropdown";
import { AnswerOptions, shouldUseButtons } from "../components/AnswerOptions";
import { ScoreBoard } from "../components/ScoreBoard";
import { Feedback } from "../components/Feedback";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { GameClock } from "../components/GameClock";
import { GameResultsFlags } from "../components/GameResultsFlags";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameFinishCelebration } from "../components/GameFinishCelebration";
import { FlagUnlockModal } from "../components/FlagUnlockModal";
import {
  PERFECT_STREAK_THRESHOLD,
  addLearnedCode,
  loadPerfectStreak,
  pickNextUnlockCode,
  savePerfectStreak,
} from "../lib/learnedFlags";
import { addCodeToStoredSelection } from "../lib/countrySelection";
import { fetchCountries, type Country } from "../api/countries";
import "../App.css";

type QuizState = {
  flagCount: number;
};

type GroupGameState = {
  groupCodes: string[];
  groupLabel: string;
  hardcore: boolean;
  /** Short label shown in the header chip, e.g. "By Continent". */
  modeLabel: string;
};

export default function FlagGamePage() {
  // Bumping this remounts FlagGameInner, which re-runs useGame with the same
  // router state — the cleanest reset for the "Play again" CTA in Hana's Game.
  const [playAgainNonce, setPlayAgainNonce] = useState(0);
  return (
    <FlagGameInner
      key={playAgainNonce}
      onPlayAgain={() => setPlayAgainNonce((n) => n + 1)}
    />
  );
}

function FlagGameInner({ onPlayAgain }: { onPlayAgain: () => void }) {
  const location = useLocation();
  const navState = location.state as
    | { codes?: string[]; quiz?: QuizState; groupGame?: GroupGameState }
    | null;
  const filterCodes =
    Array.isArray(navState?.codes) && navState!.codes!.length > 0
      ? navState!.codes!
      : navState?.groupGame?.groupCodes && navState.groupGame.groupCodes.length > 0
        ? navState.groupGame.groupCodes
        : null;
  const quiz = navState?.quiz ?? null;
  const groupGame = navState?.groupGame ?? null;
  const isCustomGame = filterCodes !== null && quiz === null && groupGame === null;
  const isQuickQuiz = quiz !== null;
  const isGroupGame = groupGame !== null;
  const game = useGame({
    filterCodes,
    allowRetry: isCustomGame || isQuickQuiz,
    flagCount: quiz?.flagCount ?? null,
    // optionCount matches flagCount so the answer choices scale with the quiz size.
    optionCount: quiz?.flagCount ?? null,
    maxAttemptsPerFlag: isQuickQuiz ? 1 : Infinity,
    useFullAlternatives: isGroupGame && groupGame.hardcore,
  });
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");

  // Derive a stable game mode string used for leaderboard filtering.
  const gameMode = useMemo((): string => {
    if (isQuickQuiz && quiz) return `quiz-${quiz.flagCount}`;
    if (isCustomGame) return "custom";
    if (isGroupGame && groupGame) {
      const slug = groupGame.groupLabel
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return `group${groupGame.hardcore ? "-hardcore" : ""}-${slug}`;
    }
    return "all-195";
  }, [isQuickQuiz, isCustomGame, isGroupGame, quiz, groupGame]);

  const leaderboardFilter = useMemo((): LeaderboardFilter => {
    let label: string;
    if (isQuickQuiz && quiz) {
      label = `Quick Quiz · ${game.totalFlags} flags`;
    } else if (isCustomGame) {
      label = `Custom Game · ${game.totalFlags} flags`;
    } else if (isGroupGame && groupGame) {
      label = `${groupGame.hardcore ? "Hardcore" : groupGame.modeLabel} — ${groupGame.groupLabel} · ${game.totalFlags} flags`;
    } else {
      label = "Flag Master";
    }
    return { gameMode, totalFlags: game.totalFlags, label };
  }, [gameMode, game.totalFlags, isQuickQuiz, isCustomGame, isGroupGame, quiz, groupGame]);

  // Show the big finish celebration overlay when the game ends, until the
  // player dismisses it. Reset if the player somehow ends up back in the
  // guessing phase (defensive — current code paths don't do that).
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);
  useEffect(() => {
    if (game.phase !== "finished") {
      setCelebrationDismissed(false);
      setSaveHint("idle");
      setPlayerName("");
    }
  }, [game.phase]);

  // --- Perfect-streak reward (Hana's Game only) ---
  // Track consecutive 100%-perfect completions so the celebration can offer
  // the player a new flag to learn every PERFECT_STREAK_THRESHOLD wins. Only
  // Hana's Game (the custom-codes mode) counts — Quick Quiz and Flag Master
  // have their own pacing and would muddy the signal.
  //
  // `displayedStreak` is what the celebration reads; we re-read the
  // authoritative value from localStorage inside the effect so the streak
  // logic doesn't form a render → state → render loop.
  const [displayedStreak, setDisplayedStreak] = useState<number>(0);
  const [unlockTarget, setUnlockTarget] = useState<Country | null>(null);
  // Full 195-country UN list, fetched once so the unlock flow can resolve a
  // freshly-picked code to a Country (flag URL, name, continent) even when
  // that country isn't in the active game pool.
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchCountries()
      .then((list) => {
        if (!cancelled) setAllCountries(list);
      })
      .catch(() => {
        // Non-blocking — the unlock CTA falls back to a flagcdn-only Country
        // shell if this list isn't available when the player clicks.
      });
    return () => {
      cancelled = true;
    };
  }, []);
  // Guard so the streak only ticks once per finished game, even if React
  // re-runs the effect (Strict Mode in development).
  const streakAppliedRef = useRef(false);

  // Detect a 100%-perfect run: every flag answered, score equals total flags
  // (every confirm() that doesn't add to score is a wrong guess via the retry
  // path, which decrements score by 1, so score === totalFlags <=> zero wrong
  // attempts across the whole game).
  const isPerfectRun =
    game.phase === "finished" &&
    game.totalAnswered >= game.totalFlags &&
    game.score === game.totalFlags &&
    game.totalFlags > 0;

  useEffect(() => {
    if (game.phase !== "finished") {
      streakAppliedRef.current = false;
      return;
    }
    if (streakAppliedRef.current) return;
    streakAppliedRef.current = true;
    // Only Hana's Game (custom codes mode) counts toward the unlock streak.
    if (!isCustomGame) {
      setDisplayedStreak(0);
      return;
    }
    const prev = loadPerfectStreak();
    if (isPerfectRun) {
      const next = prev + 1;
      savePerfectStreak(next);
      setDisplayedStreak(next);
    } else {
      if (prev !== 0) savePerfectStreak(0);
      setDisplayedStreak(0);
    }
  }, [game.phase, isPerfectRun, isCustomGame]);

  const handleUnlockFlag = () => {
    if (!isCustomGame || displayedStreak < PERFECT_STREAK_THRESHOLD) return;
    // Pick from a country pool that already excludes anything the player
    // is currently practising — the next unlock should always be a flag
    // they haven't been quizzed on.
    const playingCodes = (filterCodes ?? game.countries.map((c) => c.code)).map(
      (c) => c.toUpperCase(),
    );
    const code = pickNextUnlockCode(playingCodes);
    if (!code) return;
    // Resolve to a Country object from the in-memory pool; if the unlock
    // target isn't in the current game's countries (the usual case), fall
    // back to fetching from the leaderboard's full UN list — but the
    // useGame hook already loaded the full list internally. We approximate
    // by reusing whatever the game has plus a synthesised entry pulled from
    // the REST Countries fetch shape via flagcdn for the missing fields.
    const fromAll = allCountries.find((c) => c.code === code);
    if (fromAll) {
      setUnlockTarget(fromAll);
      return;
    }
    // Fallback shell — REST Countries hasn't returned yet (or failed). The
    // flag image and map highlight still work from the static code alone;
    // the name + continent will populate on subsequent unlocks.
    setUnlockTarget({
      code,
      name: code,
      flagSvg: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      continent: "Africa",
    });
  };

  const handleFlagLearned = () => {
    if (!unlockTarget) return;
    addLearnedCode(unlockTarget.code);
    addCodeToStoredSelection(unlockTarget.code);
    // Cash in the streak — the user has to earn another three wins to
    // unlock the next flag.
    savePerfectStreak(0);
    setDisplayedStreak(0);
    setUnlockTarget(null);
  };

  const handleSave = () => {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveGameToLeaderboard(buildLeaderboardEntryFromGame(game, playerName, gameMode));
    setSaveHint("saved");
  };

  const handleSaveFromPage = () => {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveGameToLeaderboard(buildLeaderboardEntryFromGame(game, playerName, gameMode));
    setSaveHint("saved");
  };

  // Reset scroll to the top whenever a new flag is shown — both on initial
  // landing (current goes null → flag) and after a correct guess advances
  // the game to the next round (current.code changes). Keeps the flag image
  // and dropdown in view without the user having to scroll up manually.
  const currentCode = game.current?.code;
  useEffect(() => {
    if (currentCode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentCode]);

  // The dropdown and map work off the per-question alternatives. For
  // All-Flags and Custom Game modes this is the full pool (questionAlternatives
  // falls back to countries). For Quick Quiz it's the per-question subset.
  const alternatives = game.questionAlternatives;
  const countryCodes = useMemo(
    () => new Set(alternatives.map((c) => c.code)),
    [alternatives],
  );
  const countryNames = useMemo(
    () => new Map(alternatives.map((c) => [c.code, c.name])),
    [alternatives],
  );
  const codeToCountry = useMemo(
    () => new Map(alternatives.map((c) => [c.code, c])),
    [alternatives],
  );

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />
        <main className="card card--error">
          <h1>Guess the Flag</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isRevealed = game.phase === "revealed";
  const isFinished = game.phase === "finished";
  const playedAllFlags =
    isFinished && game.totalAnswered >= game.totalFlags;
  const feedbackPhase: "guessing" | "revealed" =
    game.phase === "guessing" ? "guessing" : "revealed";
  const primaryDisabled =
    game.phase === "loading" ||
    game.phase === "finished" ||
    (game.phase === "guessing" && !game.selected);

  const elapsedMs =
    game.gameStartedAtMs != null && game.gameEndedAtMs != null
      ? game.gameEndedAtMs - game.gameStartedAtMs
      : null;

  const alreadySaved = saveHint === "saved";

  return (
    <div className="app">
      {isFinished && !celebrationDismissed && !unlockTarget && (
        <GameFinishCelebration
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          playedAllFlags={playedAllFlags}
          elapsedMs={elapsedMs}
          playerName={playerName}
          onPlayerNameChange={(name) => {
            setPlayerName(name);
            setSaveHint("idle");
          }}
          saveHint={saveHint}
          onSave={handleSave}
          onContinue={() => setCelebrationDismissed(true)}
          perfectStreak={displayedStreak}
          perfectStreakThreshold={PERFECT_STREAK_THRESHOLD}
          onUnlockFlag={isCustomGame ? handleUnlockFlag : undefined}
          onPlayAgain={isCustomGame ? onPlayAgain : undefined}
        />
      )}
      {unlockTarget && (
        <FlagUnlockModal
          country={unlockTarget}
          onLearned={handleFlagLearned}
          onClose={() => setUnlockTarget(null)}
        />
      )}
      {/* The burst is position:fixed/centered, so it always appears in the
          user's viewport — even when they're scrolled down at the score
          board or world map. Active in every game mode (was previously
          gated to Hana's Game only). */}
      <AnswerBurst
        nonce={game.attemptNonce}
        wasCorrect={game.wasCorrect}
        active={!isFinished}
      />
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
        totalAnswered={game.totalAnswered}
        totalFlags={game.totalFlags}
      />
      <main className="card">
        <header className="card-header">
          <h1>
            Guess the Flag{" "}
            {isCustomGame && <span className="card-header__chip">Custom</span>}
            {isQuickQuiz && (
              <span className="card-header__chip">Quick Quiz</span>
            )}
            {isGroupGame && (
              <span className="card-header__chip">
                {groupGame.hardcore ? "Hardcore" : groupGame.modeLabel}
              </span>
            )}
          </h1>
          <p className="tagline">
            {isFinished
              ? playedAllFlags
                ? "All flags played. Game complete."
                : "Game ended early."
              : isQuickQuiz && quiz
              ? `${game.totalFlags} choices · 1 try per flag.`
              : isGroupGame
              ? groupGame.hardcore
                ? `${groupGame.groupLabel} · all 195 in dropdown · one guess per flag.`
                : `${groupGame.groupLabel} · ${game.totalFlags} flags · one guess per flag.`
              : isCustomGame
              ? game.retryAttempts > 0
                ? `Try again — keep going until you get it right!`
                : "Pick the country, then confirm. You can keep trying until you nail it."
              : "Pick the country, then confirm your answer."}
          </p>
        </header>

        <FlagCard country={game.current} phase={game.phase} />

        {/* When the per-question pool is small enough that ALL choices
            fit on screen, render them as clickable buttons instead of a
            search dropdown — easier UX for kids and faster on touch.
            For larger pools (e.g. All-Flags, big Custom Games) we keep
            the dropdown. The Confirm button stays in both layouts so
            the wrong-guess / retry flow is unchanged. */}
        {shouldUseButtons(alternatives.length) ? (
          <div className="answer-row answer-row--buttons">
            <AnswerOptions
              countries={alternatives}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || isFinished || game.phase === "loading"}
              label="Your answer"
            />
            {!isFinished && !isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={primaryDisabled}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        ) : (
          <div className="answer-row">
            <CountryDropdown
              countries={alternatives}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || isFinished || game.phase === "loading"}
              label="Your answer"
            />
            {!isFinished && !isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={primaryDisabled}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        )}

        {game.phase !== "loading" && (
          <Feedback
            phase={feedbackPhase}
            current={game.current}
            wasCorrect={game.wasCorrect}
          />
        )}

        <WorldProgressMap
          countryResults={game.countryResults}
          selectedCode={game.selected?.code ?? null}
          disabled={game.phase !== "guessing"}
          selectable={{
            codes: countryCodes,
            names: countryNames,
            onSelect: (code) => {
              const country = codeToCountry.get(code);
              if (country) game.setSelected(country);
            },
            onConfirm: game.confirm,
          }}
        />

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />

        {isFinished && (
          <div className="game-complete">
            <p className="game-complete__title">Game over</p>
            <p className="game-complete__text">
              {playedAllFlags
                ? `You answered all ${game.totalFlags} flags in this run.`
                : `You ended the game after ${game.totalAnswered} of ${game.totalFlags} flags.`}
            </p>
          </div>
        )}

        {isFinished && (
          <div className="post-game-leaderboard">
            {alreadySaved ? (
              <>
                <p className="post-game-leaderboard__feedback" role="status">
                  ✓ Saved to the leaderboard as <strong>{playerName}</strong>.
                </p>
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    View leaderboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="post-game-leaderboard__prompt">
                  Enter your name to save this run to the leaderboard.
                </p>
                <div className="post-game-leaderboard__row">
                  <label className="visually-hidden" htmlFor="leaderboard-name">
                    Your name
                  </label>
                  <input
                    id="leaderboard-name"
                    type="text"
                    className="post-game-leaderboard__input"
                    placeholder="Your name"
                    maxLength={48}
                    value={playerName}
                    autoComplete="nickname"
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      setSaveHint("idle");
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary post-game-leaderboard__save"
                    disabled={!playerName.trim()}
                    onClick={handleSaveFromPage}
                  >
                    Save to leaderboard
                  </button>
                </div>
                {saveHint === "need-name" && (
                  <p className="post-game-leaderboard__feedback post-game-leaderboard__feedback--warn">
                    Please enter a name before saving.
                  </p>
                )}
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    Leaderboard
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {isFinished && (
          <GameResultsFlags
            countries={game.countries}
            countryResults={game.countryResults}
          />
        )}

        {!isFinished && game.phase !== "loading" && (
          <div className="end-game">
            <button
              type="button"
              className="btn btn-end-game"
              onClick={game.endGameEarly}
            >
              End game
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
