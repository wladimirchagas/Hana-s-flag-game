import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LeaveGameDialog } from "../components/LeaveGameDialog";
import { useNavigationGuard } from "../context/NavigationGuardContext";
import { useSubdivisionGame } from "../hooks/useSubdivisionGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { useProfile } from "../context/ProfileContext";
import { profileEntryFields } from "../lib/profileLeaderboard";
import { SubdivisionMap } from "../components/SubdivisionMap";
import { SubdivisionDropdown } from "../components/SubdivisionDropdown";
import { SubdivisionResultsFlags } from "../components/SubdivisionResultsFlags";
import { capitalFlagSrc } from "../lib/capitalInfo";
import { subnationalDivisionFlag } from "../lib/subnationalDivisionFlag";
import { subdivisionCityMarkers } from "../lib/cityRoles";
import { gameAudio } from "../lib/gameAudio";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameClock } from "../components/GameClock";
import { ScoreBoard } from "../components/ScoreBoard";
import type { NewLeaderboardEntry } from "../lib/leaderboardStorage";
import "../App.css";

type Props = {
  countryCode: string;
  countryName: string;
  /** Quiz the divisions' own flags. Default true (the original game). */
  includeDivisions?: boolean;
  /** Quiz the divisions' capital-city flags. Default false. */
  includeCapitals?: boolean;
};

/** Inline flag card for subdivision flags — click to enlarge, same UX as FlagCard. */
function SubdivisionFlagCard({
  flagUrl,
  typeLabel,
}: {
  flagUrl: string;
  typeLabel: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  useEffect(() => {
    setImgError(false);
  }, [flagUrl]);

  if (imgError) {
    return (
      <div className="flag-card flag-card--placeholder">
        <p style={{ color: "var(--ink-soft)", fontStyle: "italic", fontSize: "0.9rem" }}>
          Flag image unavailable
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="flag-card flag-card--content"
        onClick={() => setZoomed(true)}
        aria-label={`Enlarge ${typeLabel} flag`}
      >
        <img
          src={flagUrl}
          alt=""
          className="flag-image"
          draggable={false}
          onError={() => setImgError(true)}
        />
        <span className="flag-card__zoom-hint" aria-hidden="true">⤢ Click to enlarge</span>
      </button>
      {zoomed && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${typeLabel} flag`}
          onClick={() => setZoomed(false)}
        >
          <img
            src={flagUrl}
            alt=""
            className="flag-zoom__img"
            draggable={false}
          />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            aria-label="Close enlarged flag"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export function SubnationalGamePage({
  countryCode,
  countryName,
  includeDivisions = true,
  includeCapitals = false,
}: Props) {
  const game = useSubdivisionGame(countryCode, countryName, {
    includeDivisions,
    includeCapitals,
  });
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const { activeProfile } = useProfile();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

  // Pre-fill the leaderboard name from the active profile (only while empty, so
  // a Guest's typed name is never overwritten).
  useEffect(() => {
    if (activeProfile && !playerName) setPlayerName(activeProfile.displayName);
  }, [activeProfile, playerName]);

  const gameIsActive = game.phase === "guessing" || game.phase === "revealed";

  const { setGuard } = useNavigationGuard();
  const [pendingNavigate, setPendingNavigate] = useState<(() => void) | null>(null);

  const guardFn = useCallback((proceed: () => void) => {
    setPendingNavigate(() => proceed);
  }, []);

  useEffect(() => {
    if (gameIsActive) {
      setGuard(guardFn);
    } else {
      setGuard(null);
    }
    return () => setGuard(null);
  }, [gameIsActive, setGuard, guardFn]);

  useEffect(() => {
    if (!gameIsActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [gameIsActive]);

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

  const currentCode = game.current?.code;
  useEffect(() => {
    if (currentCode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentCode]);

  // The include-configuration is part of the game mode so a divisions-only run
  // is never ranked against a capitals or mixed run as if they were the same
  // game. Divisions-only keeps the historical mode string.
  const gameMode = `sub-${countryCode.toUpperCase()}${
    includeCapitals ? (includeDivisions ? "-mixed" : "-caps") : ""
  }`;
  const deckLabel = includeCapitals
    ? includeDivisions
      ? "divisions + capitals"
      : "capital cities"
    : "divisions";

  const saveRun = useCallback(
    (name: string) => {
      const elapsedMs =
        game.gameStartedAtMs != null && game.gameEndedAtMs != null
          ? Math.max(0, game.gameEndedAtMs - game.gameStartedAtMs)
          : 0;
      const entry: NewLeaderboardEntry = {
        playerName: name.trim().slice(0, 48),
        score: game.score,
        correctCount: game.correctCount,
        wrongCount: game.wrongCount,
        totalAnswered: game.totalAnswered,
        totalFlags: game.totalQuestions,
        elapsedMs,
        meanAnswerMs: game.meanAnswerMs,
        // mapResults (not a raw divisionResults+capitalResults merge) — a
        // division and its own capital can both be quizzed in the same deck,
        // and a flat merge would let one result silently overwrite the other
        // for that code. mapResults already resolves this the same way the
        // live map does (division owns the polygon, capital fills only when
        // the code has no division question).
        countryResults: { ...game.mapResults },
        countriesPlayed: [],
        continentBreakdown: [],
        gameMode,
        subdivisionGame: {
          countryCode: countryCode.toUpperCase(),
          countryName,
          divisions: game.divisions,
          divisionResults: { ...game.divisionResults },
          capitalDivisions: game.capitalDivisions,
          capitalResults: { ...game.capitalResults },
        },
        ...profileEntryFields(activeProfile),
      };
      saveGameToLeaderboard(entry);
      // Reflect the name actually saved so the "Saved as …" message always
      // shows it — the auto-save path saves under the profile name before the
      // prefill effect populates playerName, which otherwise left it blank.
      setPlayerName(name.trim().slice(0, 48));
      setSaveHint("saved");
    },
    [game, gameMode, activeProfile, saveGameToLeaderboard],
  );

  function handleSave() {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveRun(playerName);
  }

  // Auto-save a profile player's finished run (once per game). Guests save
  // manually via the name field.
  const autoSavedRef = useRef(false);
  useEffect(() => {
    if (game.phase !== "finished") {
      autoSavedRef.current = false;
      return;
    }
    if (autoSavedRef.current || !activeProfile) return;
    autoSavedRef.current = true;
    saveRun(activeProfile.displayName);
  }, [game.phase, activeProfile, saveRun]);

  const leaderboardFilter = useMemo(() => ({
    gameMode,
    totalFlags: game.totalQuestions,
    label: `Sub-national — ${countryName} · ${game.totalQuestions} flags · ${deckLabel}`,
  }), [gameMode, game.totalQuestions, countryName, deckLabel]);

  // Capital ★ overlay — a USER choice via the same ⭐ layer toggle as the Learn
  // map, OFF by default, and never switched automatically by the game (an
  // auto-toggle would leak whether the current flag is a division's or a
  // capital's). Markers cover the whole country (like Learn) and are decorative
  // only (pointer-events: none per the hard rule), so taps always land on the
  // division polygons.
  const [showCities, setShowCities] = useState(false);
  const toggleCities = useCallback(() => setShowCities((v) => !v), []);
  const capitalMarkers = useMemo(() => {
    if (!showCities) return null;
    const meta = SUBDIVISION_META[countryCode.toUpperCase()];
    const codes = meta?.divisions.map((d) => d.code) ?? [];
    return subdivisionCityMarkers(countryCode.toUpperCase(), codes);
  }, [showCities, countryCode]);
  const mapExtraControls = useMemo(
    () => (
      <>
        <hr className="world-map__zoom-divider" />
        <button
          type="button"
          className={`world-map__zoom-btn world-map__zoom-btn--layer${showCities ? " world-map__zoom-btn--active" : ""}`}
          onClick={toggleCities}
          aria-pressed={showCities}
          aria-label={showCities ? "Hide capitals on map" : "Show capitals on map"}
          title={showCities ? "Hide capitals" : "Show capitals"}
        >
          <span className="world-map__zoom-icon" aria-hidden="true">⭐</span>
        </button>
      </>
    ),
    [showCities, toggleCities],
  );

  const isCapitalQuestion = game.currentKind === "capital";

  // Map answer pool: a tap resolves to the entity the current question asks
  // for (division, or that division's capital).
  const answerOptions = isCapitalQuestion ? game.capitalAnswerOptions : game.divisions;

  // Dropdown answer pool: when BOTH sets are in the deck the dropdown offers
  // divisions and capitals TOGETHER (owner rule, 2026-07) — the combined pool
  // makes randomly guessing the answer harder. Single-set decks keep their
  // single-category list. When a capital shares its EXACT name with a division
  // (São Paulo, Rio de Janeiro, …) both rows carry their type in parentheses —
  // "São Paulo (State)" / "São Paulo (Capital City)" — so the player always
  // knows which entity they are picking.
  const dropdownOptions = useMemo(() => {
    if (!(includeDivisions && includeCapitals)) return answerOptions;
    const divNames = new Set(game.divisions.map((d) => d.name.toLowerCase()));
    const capNames = new Set(game.capitalAnswerOptions.map((d) => d.name.toLowerCase()));
    return [
      ...game.divisions.map((d) =>
        capNames.has(d.name.toLowerCase()) ? { ...d, name: `${d.name} (${d.typeLabel})` } : d,
      ),
      ...game.capitalAnswerOptions.map((d) =>
        divNames.has(d.name.toLowerCase()) ? { ...d, name: `${d.name} (Capital City)` } : d,
      ),
    ];
  }, [includeDivisions, includeCapitals, answerOptions, game.divisions, game.capitalAnswerOptions]);

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
  const isRevealed = game.phase === "revealed";

  const currentFlagUrl = game.current
    ? isCapitalQuestion
      ? capitalFlagSrc(game.current.code)
      : subnationalDivisionFlag(game.current.code)
    : null;

  const deckDescription = includeCapitals
    ? includeDivisions
      ? "flags"
      : "capital-city flags"
    : game.pluralLabel.toLowerCase();

  return (
    <div className="app">
      {pendingNavigate && (
        <LeaveGameDialog
          onConfirm={() => { pendingNavigate(); setPendingNavigate(null); }}
          onCancel={() => setPendingNavigate(null)}
        />
      )}
      {/* The burst is position:fixed/centered, so on a wrong guess the
          correct answer always appears in the viewport — the inline strip
          below the map can sit below the fold on small screens. */}
      <AnswerBurst
        nonce={game.attemptNonce}
        wasCorrect={game.wasCorrect}
        active={!isFinished}
        correctCountry={
          game.current
            ? {
                name: game.currentAnswerName ?? game.current.name,
                flagSvg: currentFlagUrl,
              }
            : undefined
        }
      />
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
        totalAnswered={game.totalAnswered}
        totalFlags={game.totalQuestions}
      />

      <main className="card">
        <header className="card-header">
          <h1>
            {countryName}{" "}
            <span className="card-header__chip">Sub-national</span>
          </h1>
          <p className="tagline">
            {isFinished
              ? `Game complete — ${game.totalAnswered} of ${game.totalQuestions} ${deckDescription}.`
              : `Identify all ${game.totalQuestions} ${deckDescription} · one guess each.`}
          </p>
        </header>

        {/* Flag display — shown during active game. In a deck that includes
            capital-city flags, every card carries a category badge so a city
            question is never mistaken for a division question. */}
        {!isFinished && game.phase !== "loading" && game.current && currentFlagUrl && (
          <>
            {includeCapitals && (
              <div className="subdiv-game__kind-row">
                <span
                  className={`subdiv-game__kind-badge subdiv-game__kind-badge--${game.currentKind}`}
                >
                  {isCapitalQuestion ? "🏙️ Capital city" : `🗺️ ${game.current.typeLabel}`}
                </span>
              </div>
            )}
            <SubdivisionFlagCard
              flagUrl={currentFlagUrl}
              typeLabel={isCapitalQuestion ? "capital city" : game.current.typeLabel}
            />
          </>
        )}
        {game.phase === "loading" && (
          <div className="flag-card flag-card--placeholder" aria-busy="true">
            <div className="flag-skeleton" />
          </div>
        )}

        {/* Answer row: dropdown + confirm */}
        {!isFinished && (
          <div className="answer-row">
            <SubdivisionDropdown
              divisions={dropdownOptions}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || game.phase === "loading"}
              label="Your answer"
              countryCode={countryCode}
            />
            {!isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={!game.selected || !isGuessing}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        )}

        {/* Subdivision Map */}
        {game.phase !== "loading" && (
          <SubdivisionMap
            geoData={game.geoData}
            loading={false}
            selectedCode={game.selected?.code ?? null}
            countryCode={countryCode}
            cityOverlay={capitalMarkers}
            extraControls={mapExtraControls}
            onSelect={
              isGuessing
                ? (code) => {
                    // Tapping a division answers with it — or, on a capital
                    // question, with that division's capital (each division has
                    // exactly one quizzed capital, so the tap is unambiguous).
                    const div = answerOptions.find((d) => d.code === code);
                    if (div) game.setSelected(div);
                  }
                : undefined
            }
            onConfirm={isGuessing ? game.confirm : undefined}
            displayNameForCode={
              isCapitalQuestion
                ? (code) => answerOptions.find((d) => d.code === code)?.name ?? null
                : undefined
            }
            disabled={!isGuessing}
            countryResults={game.mapResults}
          />
        )}

        {/* Reveal feedback */}
        {(isRevealed || isFinished) && game.current && game.wasCorrect !== null && (
          <div className={`subdiv-game__feedback subdiv-game__feedback--${game.wasCorrect ? "correct" : "wrong"}`}>
            {game.wasCorrect
              ? `Correct! ${game.currentAnswerName ?? game.current.name}`
              : `Not quite — the correct answer was ${game.currentAnswerName ?? game.current.name}`}
            {game.revealNote && (
              <span className="subdiv-game__feedback-note"> — {game.revealNote}</span>
            )}
          </div>
        )}

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalQuestions}
          continentBreakdown={[]}
        />

        {isFinished && !celebrationDismissed && (
          <div className="game-complete">
            <p className="game-complete__title">Game over!</p>
            <p className="game-complete__text">
              You identified {game.correctCount} of {game.totalQuestions}{" "}
              {deckDescription} of {countryName}.
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

        {isFinished && (
          <SubdivisionResultsFlags
            divisions={game.divisions}
            divisionResults={game.divisionResults}
            capitalDivisions={game.capitalDivisions}
            capitalResults={game.capitalResults}
            countryCode={countryCode}
          />
        )}
      </main>
    </div>
  );
}
