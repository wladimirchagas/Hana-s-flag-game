import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSubdivisionGame, type SubdivGameDirection } from "../hooks/useSubdivisionGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { SubdivisionMap } from "../components/SubdivisionMap";
import { subdivisionFlagUrl, subdivisionFlagPngUrl } from "../api/subdivisions";
import { gameAudio } from "../lib/gameAudio";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameClock } from "../components/GameClock";
import { ScoreBoard } from "../components/ScoreBoard";
import type { NewLeaderboardEntry } from "../lib/leaderboardStorage";
import "../App.css";

type Props = {
  countryCode: string;
  countryName: string;
};

export function SubnationalGamePage({ countryCode, countryName }: Props) {
  const game = useSubdivisionGame(countryCode, countryName);
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

  // Build flag overlay map for subdivision map
  const flagOverlay = useMemo(() => {
    if (!game.geoData) return null;
    const m = new Map<string, string>();
    for (const f of game.geoData.features) {
      const code = f.properties.iso_3166_2;
      if (code) m.set(code, subdivisionFlagPngUrl(code));
    }
    return m;
  }, [game.geoData]);

  // Sound effects
  useEffect(() => {
    if (game.attemptNonce === 0 || game.wasCorrect === null) return;
    if (game.wasCorrect) gameAudio.playCorrect();
    else gameAudio.playWrong();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.attemptNonce]);

  const prevPhaseRef = useRef(game.phase);
  useEffect(() => {
    if (game.phase === "finished" && prevPhaseRef.current !== "finished") {
      gameAudio.playGameComplete();
    }
    prevPhaseRef.current = game.phase;
  }, [game.phase]);

  useEffect(() => {
    if (game.phase !== "finished") {
      setCelebrationDismissed(false);
      setSaveHint("idle");
      setPlayerName("");
    }
  }, [game.phase]);

  function handleSave() {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    const elapsedMs =
      game.gameStartedAtMs != null && game.gameEndedAtMs != null
        ? Math.max(0, game.gameEndedAtMs - game.gameStartedAtMs)
        : 0;
    const entry: NewLeaderboardEntry = {
      playerName: playerName.trim().slice(0, 48),
      score: game.score,
      correctCount: game.correctCount,
      wrongCount: game.wrongCount,
      totalAnswered: game.totalAnswered,
      totalFlags: game.totalDivisions,
      elapsedMs,
      meanAnswerMs: game.meanAnswerMs,
      countryResults: { ...game.divisionResults },
      countriesPlayed: [],
      continentBreakdown: [],
      gameMode: `sub-${countryCode.toUpperCase()}`,
    };
    saveGameToLeaderboard(entry);
    setSaveHint("saved");
  }

  const gameMode = `sub-${countryCode.toUpperCase()}`;
  const leaderboardFilter = useMemo(() => ({
    gameMode,
    totalFlags: game.totalDivisions,
    label: `Sub-national — ${countryName} · ${game.totalDivisions} divisions`,
  }), [gameMode, game.totalDivisions, countryName]);

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>{countryName} — Sub-national Flags</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isFinished = game.phase === "finished";
  const isGuessing = game.phase === "guessing";

  const directionLabel: Record<SubdivGameDirection, string> = {
    "flag-to-map": "Flag → click on map",
    "map-to-flag": "Highlighted → pick flag",
  };

  return (
    <div className="app">
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
        totalFlags={game.totalDivisions}
      />

      <main className="card">
        <header className="card-header">
          <h1>
            {countryName}{" "}
            <span className="card-header__chip">Sub-national</span>
          </h1>
          <p className="tagline">
            {isFinished
              ? `Game complete — ${game.totalAnswered} of ${game.totalDivisions} ${game.pluralLabel.toLowerCase()}.`
              : `Identify all ${game.totalDivisions} ${game.pluralLabel.toLowerCase()} · one guess each.`}
          </p>
        </header>

        {/* Direction toggle */}
        {!isFinished && (
          <div className="subdiv-game__direction-row">
            {(["flag-to-map", "map-to-flag"] as SubdivGameDirection[]).map((d) => (
              <button
                key={d}
                type="button"
                className={`subdiv-game__direction-btn${game.direction === d ? " subdiv-game__direction-btn--active" : ""}`}
                onClick={() => game.setDirection(d)}
                aria-pressed={game.direction === d}
              >
                {directionLabel[d]}
              </button>
            ))}
          </div>
        )}

        {/* Flag-to-map: show flag, player clicks on map */}
        {!isFinished && game.direction === "flag-to-map" && game.current && (
          <div className="subdiv-game__flag-card">
            <p className="subdiv-game__flag-label">Which {game.current.typeLabel.toLowerCase()} has this flag?</p>
            <img
              src={subdivisionFlagUrl(game.current.code)}
              alt=""
              className="subdiv-game__flag-img"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        )}

        {/* Map-to-flag: highlight division, player picks from dropdown */}
        {!isFinished && game.direction === "map-to-flag" && game.current && (
          <div className="subdiv-game__map-prompt">
            <p className="subdiv-game__flag-label">
              Find the flag for: <strong>{game.current.name}</strong>
            </p>
          </div>
        )}

        {/* Subdivision Map */}
        {game.phase !== "loading" && (
          <SubdivisionMap
            geoData={game.geoData}
            loading={false}
            flagOverlay={game.direction === "map-to-flag" ? flagOverlay : null}
            selectedCode={
              game.direction === "flag-to-map"
                ? (game.selected?.code ?? null)
                : (game.current?.code ?? null)
            }
            onSelect={
              game.direction === "flag-to-map" && isGuessing
                ? (code) => {
                    const div = game.divisions.find((d) => d.code === code);
                    if (div) game.setSelected(div);
                  }
                : undefined
            }
            onConfirm={
              game.direction === "flag-to-map" && isGuessing
                ? game.confirm
                : undefined
            }
            disabled={!isGuessing || game.direction === "map-to-flag"}
            countryResults={game.divisionResults}
          />
        )}

        {/* Map-to-flag: flag grid for picking */}
        {!isFinished && game.direction === "map-to-flag" && isGuessing && (
          <div className="subdiv-game__flag-picker">
            <p className="subdiv-game__picker-label">Pick the correct flag:</p>
            <div className="subdiv-game__flag-options">
              {game.questionAlternatives.map((alt) => (
                <button
                  key={alt.code}
                  type="button"
                  className={`subdiv-game__flag-option${game.selected?.code === alt.code ? " subdiv-game__flag-option--selected" : ""}`}
                  onClick={() => game.setSelected(alt)}
                >
                  <img
                    src={subdivisionFlagUrl(alt.code)}
                    alt={alt.name}
                    className="subdiv-game__option-img"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="subdiv-game__option-name">{alt.name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!game.selected}
              onClick={game.confirm}
            >
              Confirm
            </button>
          </div>
        )}

        {/* Reveal feedback */}
        {game.phase === "revealed" && game.current && (
          <div className={`subdiv-game__feedback subdiv-game__feedback--${game.wasCorrect ? "correct" : "wrong"}`}>
            {game.wasCorrect
              ? `Correct! ${game.current.name}`
              : `Wrong — it was ${game.current.name}`}
          </div>
        )}

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalDivisions}
          continentBreakdown={[]}
        />

        {isFinished && !celebrationDismissed && (
          <div className="game-complete">
            <p className="game-complete__title">Game over!</p>
            <p className="game-complete__text">
              You identified {game.correctCount} of {game.totalDivisions}{" "}
              {game.pluralLabel.toLowerCase()} of {countryName}.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCelebrationDismissed(true)}
            >
              Continue
            </button>
          </div>
        )}

        {isFinished && celebrationDismissed && (
          <div className="post-game-leaderboard">
            {saveHint === "saved" ? (
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
                  <label className="visually-hidden" htmlFor="subdiv-leaderboard-name">
                    Your name
                  </label>
                  <input
                    id="subdiv-leaderboard-name"
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
                    onClick={handleSave}
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
