/**
 * Shareable-link serialisation.
 *
 * The game previously carried every selection (game mode, group, country …)
 * only in react-router's in-memory `location.state`, so the URL never changed
 * as the user navigated and a copied link always landed on the bare route.
 *
 * This module is the single source of truth for translating a navigation
 * "intent" to and from URL query parameters, so a link can be copied and
 * shared and the recipient lands on the exact same view.
 *
 * URL scheme (all on existing routes, query-param based):
 *
 *   /game?mode=all195
 *   /game?mode=hana&codes=AR,BR,FR        (Hana's custom list)
 *   /game?mode=quiz&n=10                  (Quick Quiz, 10 flags)
 *   /game?mode=continent&group=Africa
 *   /game?mode=subregion&group=South%20America
 *   /game?mode=similarity&group=nordic-cross[&hardcore=1]
 *   /game?mode=subnational&country=AR
 *   /game?mode=disputed
 *
 *   /learn?era=ad1945                     (historical world map)
 *   /learn?country=FR                     (France selected, modern era)
 *   /learn?country=FR&view=subdivisions   (France subnational divisions)
 */

import type { Continent } from "../api/countries";
import { CONTINENT_GROUPS, SUBREGION_GROUPS } from "./continentGroups";
import {
  FLAG_SIMILARITIES,
  FLAG_SIMILARITY_LABELS,
  type FlagSimilarity,
} from "./flagSimilarity";
import { ALL_COUNTRY_OPTIONS } from "./countrySelection";
import { ERAS } from "./historicalEras";

/**
 * The navigation state consumed by FlagGamePage / FlagGameInner. Mirrors the
 * shapes written into `location.state` by LandingPage so a state object and a
 * decoded URL are interchangeable.
 */
export type GameNavState = {
  codes?: string[];
  quiz?: { flagCount: number };
  groupGame?: {
    groupCodes: string[];
    groupLabel: string;
    hardcore: boolean;
    modeLabel: string;
  };
  subnational?: { countryCode: string; countryName: string };
  disputedTerritories?: true;
} | null;

/** Short labels used in the header chip — kept in sync with LandingPage. */
const MODE_LABEL_CONTINENT = "By Continent";
const MODE_LABEL_SUBREGION = "By Sub-Continent";
const MODE_LABEL_SIMILARITY = "By Similarity";

function countryNameFor(code: string): string {
  return ALL_COUNTRY_OPTIONS.find((c) => c.code === code)?.name ?? code;
}

/** All UN member codes that belong to a given similarity group. */
function similarityGroupCodes(group: FlagSimilarity): string[] {
  const out: string[] = [];
  for (const [code, groups] of Object.entries(FLAG_SIMILARITIES)) {
    if (groups.includes(group)) out.push(code);
  }
  return out;
}

/** Reverse-lookup a similarity group key from its human label. */
function similarityKeyFromLabel(label: string): FlagSimilarity | null {
  for (const [key, value] of Object.entries(FLAG_SIMILARITY_LABELS)) {
    if (value === label) return key as FlagSimilarity;
  }
  return null;
}

/**
 * Encode a game navigation state into a query string (including the leading
 * "?", or "" for the default all-195 game which needs no parameters).
 */
export function gameStateToSearch(state: GameNavState): string {
  const p = new URLSearchParams();
  if (state) {
    if (state.subnational) {
      p.set("mode", "subnational");
      p.set("country", state.subnational.countryCode);
    } else if (state.disputedTerritories) {
      p.set("mode", "disputed");
    } else if (state.quiz) {
      p.set("mode", "quiz");
      p.set("n", String(state.quiz.flagCount));
    } else if (state.groupGame) {
      const g = state.groupGame;
      if (g.modeLabel === MODE_LABEL_CONTINENT) {
        p.set("mode", "continent");
        p.set("group", g.groupLabel);
      } else if (g.modeLabel === MODE_LABEL_SUBREGION) {
        p.set("mode", "subregion");
        p.set("group", g.groupLabel);
      } else {
        p.set("mode", "similarity");
        p.set("group", similarityKeyFromLabel(g.groupLabel) ?? g.groupLabel);
        if (g.hardcore) p.set("hardcore", "1");
      }
    } else if (state.codes && state.codes.length > 0) {
      p.set("mode", "hana");
      p.set("codes", state.codes.join(","));
    }
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}

/**
 * Decode a query string back into a game navigation state. Returns null for
 * the bare/all-195 game (no params needed) or when the params are invalid —
 * callers then fall through to the default all-195 game.
 */
export function searchToGameState(params: URLSearchParams): GameNavState {
  const mode = params.get("mode");

  // Legacy / bare `?codes=` support (e.g. an older shared Hana's-Game link).
  if (!mode) {
    const codes = params.get("codes");
    if (codes) {
      const list = codes.split(",").filter(Boolean);
      return list.length > 0 ? { codes: list } : null;
    }
    return null;
  }

  switch (mode) {
    case "subnational": {
      const code = params.get("country");
      if (!code) return null;
      return {
        subnational: { countryCode: code, countryName: countryNameFor(code) },
      };
    }
    case "disputed":
      return { disputedTerritories: true };
    case "quiz": {
      const n = Number.parseInt(params.get("n") ?? "", 10);
      if (!Number.isFinite(n) || n <= 0) return null;
      return { quiz: { flagCount: n } };
    }
    case "continent": {
      const c = params.get("group") as Continent | null;
      const codes = c ? CONTINENT_GROUPS[c] : undefined;
      if (!c || !codes) return null;
      return {
        groupGame: {
          groupCodes: [...codes],
          groupLabel: c,
          hardcore: false,
          modeLabel: MODE_LABEL_CONTINENT,
        },
      };
    }
    case "subregion": {
      const label = params.get("group");
      const sg = SUBREGION_GROUPS.find((g) => g.label === label);
      if (!sg) return null;
      return {
        groupGame: {
          groupCodes: [...sg.codes],
          groupLabel: sg.label,
          hardcore: false,
          modeLabel: MODE_LABEL_SUBREGION,
        },
      };
    }
    case "similarity": {
      const raw = params.get("group") ?? "";
      const key =
        (FLAG_SIMILARITY_LABELS as Record<string, string>)[raw]
          ? (raw as FlagSimilarity)
          : similarityKeyFromLabel(raw);
      if (!key) return null;
      const codes = similarityGroupCodes(key);
      if (codes.length === 0) return null;
      return {
        groupGame: {
          groupCodes: codes,
          groupLabel: FLAG_SIMILARITY_LABELS[key],
          hardcore: params.get("hardcore") === "1",
          modeLabel: MODE_LABEL_SIMILARITY,
        },
      };
    }
    case "hana": {
      const list = (params.get("codes") ?? "").split(",").filter(Boolean);
      return list.length > 0 ? { codes: list } : null;
    }
    case "all195":
    default:
      // Bare all-195 game — no state needed.
      return null;
  }
}

/** True when a game state carries selections worth restoring/serialising. */
export function hasGameSelection(state: GameNavState): boolean {
  return Boolean(
    state &&
      (state.codes?.length ||
        state.quiz ||
        state.groupGame ||
        state.subnational ||
        state.disputedTerritories),
  );
}

// ── Learn page ────────────────────────────────────────────────────────────

/**
 * Resolve an `era` URL param to a canonical era id. Accepts the era id
 * (`ad1945`), the bare year (`1945`), or a `bc####` form, so hand-typed and
 * generated links both work. Returns null for unknown / today.
 */
export function eraIdFromParam(raw: string | null): string | null {
  if (!raw) return null;
  const era = ERAS.find(
    (e) =>
      e.id === raw ||
      e.year === raw ||
      e.id === `ad${raw}` ||
      e.id === `bc${raw}`,
  );
  return era ? era.id : null;
}
