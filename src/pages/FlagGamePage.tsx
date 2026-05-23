import { useEffect, useMemo, useState } from "react";
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
import { DIFFICULTY_CONFIG } from "../lib/flagDifficulty";
import "../App.css";

type QuizState = {
  difficulty: "easy" | "moderate" | "hard";
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
  // Look up the difficulty config to know dropdown size + max attempts.
  // Imported lazily here to keep this file's imports tidy.
  const quizCfg = quiz
    ? DIFFICULTY_CONFIG[quiz.difficulty]
    : null;
  const game = useGame({
    filterCodes,
    // Custom Game and Quick Quiz allow retries; similarity and All-195 do not.
    allowRetry: isCustomGame || isQuickQuiz,
    difficulty: quiz?.difficulty ?? null,
    flagCount: quiz?.flagCount ?? null,
    optionCount: quizCfg?.optionCount ?? null,
    maxAttemptsPerFlag: quizCfg?.maxAttempts ?? Infinity,
    // Hardcore similarity mode: guess group flags from the full 195 dropdown.
    useFullAlternatives: isGroupGame && groupGame.hardcore,
  });
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");

  // Derive a stable game mode string used for leaderboard filtering.
  const gameMode = useMemo((): string => {
    if (isQuickQuiz && quiz) return `quiz-${quiz.difficulty}`;
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
    if (isQuickQuiz && quiz && quizCfg) {
      label = `Quick Quiz — ${quizCfg.shortLabel} · ${game.totalFlags} flags`;
    } else if (isCustomGame) {
      label = `Custom Game · ${game.totalFlags} flags`;
    } else if (isGroupGame && groupGame) {
      label = `${groupGame.hardcore ? "Hardcore" : groupGame.modeLabel} — ${groupGame.groupLabel} · ${game.totalFlags} flags`;
    } else {
      label = "Pro Quiz";
    }
    return { gameMode, totalFlags: game.totalFlags, label };
  }, [gameMode, game.totalFlags, isQuickQuiz, isCustomGame, isGroupGame, quiz, quizCfg, groupGame]);

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
      {isFinished && !celebrationDismissed && (
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
            {isQuickQuiz && quizCfg && (
              <span className="card-header__chip">{quizCfg.shortLabel}</span>
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
              : isQuickQuiz && quizCfg
              ? (() => {
                  const remaining = quizCfg.maxAttempts - game.retryAttempts;
                  if (game.retryAttempts === 0) {
                    return `${quizCfg.optionCount} choices · ${quizCfg.maxAttempts} ${
                      quizCfg.maxAttempts === 1 ? "try" : "tries"
                    } per flag.`;
                  }
                  return `${remaining} ${
                    remaining === 1 ? "try" : "tries"
                  } left on this flag.`;
                })()
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
