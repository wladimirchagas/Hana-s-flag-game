// Shareable-link serialisation for the /game route.
//
// The game's mode is normally carried in React Router's `location.state`
// (set by the setup modals on the landing page). That state never reaches
// the address bar, so a copied URL could not reproduce the game. These
// helpers translate the same config to/from query-string params so that a
// link like `/game?mode=continent&group=Europe` cold-loads the right game.
//
// Group games (continent / sub-continent / similarity) are NOT serialised as
// raw code lists — only the group key/label is stored and the code list is
// recomputed on load. This keeps links short and stable even if a group's
// membership is later corrected.

import type { Continent } from "../api/countries";
import { CONTINENT_GROUPS, SUBREGION_GROUPS } from "./continentGroups";
import {
  FLAG_SIMILARITIES,
  FLAG_SIMILARITY_LABELS,
  type FlagSimilarity,
} from "./flagSimilarity";
import { ALL_COUNTRY_OPTIONS } from "./countrySelection";

export type GroupGameConfig = {
  groupCodes: string[];
  groupLabel: string;
  hardcore: boolean;
  /** Short label shown in the header chip, e.g. "By Continent". */
  modeLabel: string;
};

/** The resolved game configuration, matching FlagGamePage's router state. */
export type GameConfig = {
  codes?: string[];
  quiz?: { flagCount: number };
  groupGame?: GroupGameConfig;
  subnational?: {
    countryCode: string;
    countryName: string;
    /** Include the divisions' own flags. Absent = true (the pre-capitals game). */
    includeDivisions?: boolean;
    /** Include the divisions' capital-city flags. Absent = false. */
    includeCapitals?: boolean;
  };
  disputedTerritories?: boolean;
};

// similarity group key -> member country codes (same derivation as the modal).
const SIM_GROUP_CODES: Partial<Record<FlagSimilarity, string[]>> = (() => {
  const map: Partial<Record<FlagSimilarity, string[]>> = {};
  for (const [code, groups] of Object.entries(FLAG_SIMILARITIES)) {
    for (const group of groups) {
      (map[group] ??= []).push(code);
    }
  }
  return map;
})();

// human label -> similarity group key, so a groupGame state (which only
// carries the label) can be serialised back to its stable key.
const SIM_LABEL_TO_KEY = new Map<string, FlagSimilarity>(
  Object.entries(FLAG_SIMILARITY_LABELS).map(
    ([key, label]) => [label, key as FlagSimilarity],
  ),
);

/** True when a router-state config carries an actual game mode. */
export function hasGameMode(c: GameConfig | null | undefined): c is GameConfig {
  return !!c && !!(
    (c.codes && c.codes.length > 0) ||
    c.quiz ||
    c.groupGame ||
    c.subnational ||
    c.disputedTerritories
  );
}

/** Serialise a game config to query-string params for a shareable link. */
export function gameConfigToParams(c: GameConfig): URLSearchParams {
  const p = new URLSearchParams();
  if (c.disputedTerritories) {
    p.set("mode", "disputed");
  } else if (c.subnational) {
    p.set("mode", "subnational");
    p.set("country", c.subnational.countryCode);
    // Which flag sets the deck contains. Omitted for the divisions-only default
    // so pre-existing shared links keep their exact meaning.
    const sets = [
      ...(c.subnational.includeDivisions !== false ? ["divisions"] : []),
      ...(c.subnational.includeCapitals ? ["capitals"] : []),
    ];
    if (sets.join(",") !== "divisions") p.set("sets", sets.join(","));
  } else if (c.quiz) {
    p.set("mode", "quiz");
    p.set("count", String(c.quiz.flagCount));
  } else if (c.groupGame) {
    const g = c.groupGame;
    if (g.modeLabel === "By Continent") {
      p.set("mode", "continent");
      p.set("group", g.groupLabel);
    } else if (g.modeLabel === "By Sub-Continent") {
      p.set("mode", "subregion");
      p.set("group", g.groupLabel);
    } else {
      p.set("mode", "similarity");
      p.set("group", SIM_LABEL_TO_KEY.get(g.groupLabel) ?? g.groupLabel);
      if (g.hardcore) p.set("hardcore", "1");
    }
  } else if (c.codes && c.codes.length > 0) {
    p.set("mode", "hana");
    p.set("codes", c.codes.join(","));
  } else {
    p.set("mode", "all195");
  }
  return p;
}

/**
 * Rebuild a game config from query-string params (shared-link cold load).
 * Returns an empty object for the plain all-195 game, or `null` when the
 * params don't describe a recognisable mode (caller falls back to all-195).
 */
export function paramsToGameConfig(p: URLSearchParams): GameConfig | null {
  const mode = p.get("mode");
  if (!mode) return null;

  switch (mode) {
    case "all195":
      return {};
    case "disputed":
      return { disputedTerritories: true };
    case "quiz": {
      const n = Number(p.get("count"));
      return Number.isFinite(n) && n > 0 ? { quiz: { flagCount: n } } : {};
    }
    case "hana": {
      const codes = (p.get("codes") ?? "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      return codes.length > 0 ? { codes } : null;
    }
    case "subnational": {
      const code = (p.get("country") ?? "").toUpperCase();
      if (!code) return null;
      const match = ALL_COUNTRY_OPTIONS.find((o) => o.code === code);
      const sets = (p.get("sets") ?? "divisions")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const includeDivisions = sets.includes("divisions");
      const includeCapitals = sets.includes("capitals");
      return {
        subnational: {
          countryCode: code,
          countryName: match?.name ?? code,
          // A link with an unrecognisable sets value falls back to the default
          // divisions-only game rather than an empty one.
          includeDivisions: includeDivisions || !includeCapitals,
          includeCapitals,
        },
      };
    }
    case "continent": {
      const label = p.get("group") ?? "";
      const codes = CONTINENT_GROUPS[label as Continent];
      return codes
        ? {
            groupGame: {
              groupCodes: [...codes],
              groupLabel: label,
              hardcore: false,
              modeLabel: "By Continent",
            },
          }
        : null;
    }
    case "subregion": {
      const label = p.get("group") ?? "";
      const sg = SUBREGION_GROUPS.find((s) => s.label === label);
      return sg
        ? {
            groupGame: {
              groupCodes: [...sg.codes],
              groupLabel: label,
              hardcore: false,
              modeLabel: "By Sub-Continent",
            },
          }
        : null;
    }
    case "similarity": {
      const key = (p.get("group") ?? "") as FlagSimilarity;
      const codes = SIM_GROUP_CODES[key];
      const label = FLAG_SIMILARITY_LABELS[key];
      if (!codes || !label) return null;
      return {
        groupGame: {
          groupCodes: [...codes],
          groupLabel: label,
          hardcore: p.get("hardcore") === "1",
          modeLabel: "By Similarity",
        },
      };
    }
    default:
      return null;
  }
}
