import type { UseGameResult } from "../hooks/useGame";
import type { NewLeaderboardEntry } from "./leaderboardStorage";

export function buildLeaderboardEntryFromGame(
  game: UseGameResult,
  playerName: string
): NewLeaderboardEntry {
  const name = playerName.trim().slice(0, 48);
  const countriesPlayed = game.countries
    .filter((c) => game.countryResults[c.code])
    .map((c) => ({
      name: c.name,
      code: c.code,
      flagSvg: c.flagSvg,
      continent: c.continent,
    }));

  const elapsedMs =
    game.gameStartedAtMs != null && game.gameEndedAtMs != null
      ? Math.max(0, game.gameEndedAtMs - game.gameStartedAtMs)
      : 0;

  return {
    playerName: name,
    score: game.score,
    correctCount: game.correctCount,
    wrongCount: game.wrongCount,
    totalAnswered: game.totalAnswered,
    totalFlags: game.totalFlags,
    elapsedMs,
    meanAnswerMs: game.meanAnswerMs,
    countryResults: { ...game.countryResults },
    countriesPlayed,
    continentBreakdown: game.continentBreakdown.map((row) => ({ ...row })),
  };
}
