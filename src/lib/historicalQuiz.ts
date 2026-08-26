/**
 * The two historical decks whose answer is NOT a country.
 *
 * The National-symbols data carries 526 dated historical flags, and roughly half
 * of them are PRE-INDEPENDENCE flags flown by a ruling power (`sovereign`). Those
 * cannot be asked as "which country flew this?" — the Union Flag is bundled under
 * six countries, the Cross of Burgundy under nineteen, so the question would have
 * many correct answers (see `quizSymbols.ts`, rule 1). Asked the other way round
 * they are excellent questions with exactly one answer:
 *
 *   • "Under whose rule?"  — the prompt is a colonial-era flag, the answer is the
 *     POWER that flew it. Shared images are an asset here, not a hazard.
 *   • "Date the flag"      — the prompt is any dated flag, the answer is the
 *     period it was FIRST flown in. Here a shared image IS a hazard (the same
 *     Spanish ensign has a different window under each country), so this deck
 *     takes unambiguous images only.
 *
 * Both decks are entry-keyed rather than country-keyed, so this module builds its
 * own questions instead of reusing `useGame`'s country pool.
 *
 * Node-safe: no browser globals and no `import.meta`, so the check script can
 * import it and validate the decks the app will actually build.
 */

import { NATIONAL_FLAGS, type NationalFlag } from "../data/nationalFlags.ts";
import { UN_MEMBER_CODES } from "./unMemberStates.ts";
import { imageIsAmbiguous, symbolCaption } from "./quizSymbols.ts";

export type HistoricalAsk = "ruler" | "era";

export const HISTORICAL_ASK_LABELS: Record<HistoricalAsk, string> = {
  ruler: "Under whose rule?",
  era: "Date the flag",
};

export const HISTORICAL_ASK_PROMPTS: Record<HistoricalAsk, string> = {
  ruler: "Which power flew this flag over its territories?",
  era: "When was this flag first flown?",
};

export const HISTORICAL_ASK_HINTS: Record<HistoricalAsk, string> = {
  ruler:
    "Colonial-era flags from across the world. Name the power that flew them — not the modern country.",
  era: "Every flag is dated. Place it in the right period.",
};

export type HistoricalQuestion = {
  /** The entry's own id — unique across the whole manifest, so it is the key. */
  readonly id: string;
  readonly countryCode: string;
  readonly entry: NationalFlag;
  /** BASE-relative image path (always present — an entry with none is dropped). */
  readonly path: string;
  /** The correct answer's label. */
  readonly answer: string;
  /** The teaching line shown on reveal. */
  readonly caption: string;
};

// ── "Under whose rule?" ─────────────────────────────────────────────────────

/**
 * The UK alone accounts for 74 of the 254 pre-independence entries, and Spain for
 * 40. Left uncapped the deck degrades into "guess the United Kingdom", so each
 * power contributes at most this many questions. The cap is applied to a shuffled
 * list, so a replay draws a different sample of the same power's flags.
 */
export const MAX_QUESTIONS_PER_POWER = 5;

function shuffle<T>(list: T[], random: () => number): T[] {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Every ruling power named in the data, with how many entries it holds. */
export function rulingPowers(): Array<{ power: string; count: number }> {
  const counts = new Map<string, number>();
  for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
    if (!UN_MEMBER_CODES.has(code)) continue;
    for (const f of flags) {
      if (!f.path || !f.sovereign) continue;
      counts.set(f.sovereign, (counts.get(f.sovereign) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([power, count]) => ({ power, count }))
    .sort((a, b) => b.count - a.count || a.power.localeCompare(b.power));
}

/**
 * Powers a question can be asked about. A power holding a single entry would make
 * that one flag the only evidence for it — fine as a distractor, thin as a
 * question — so the deck asks about powers with at least two.
 */
export const MIN_ENTRIES_PER_ASKABLE_POWER = 2;

export function askablePowers(): string[] {
  return rulingPowers()
    .filter((p) => p.count >= MIN_ENTRIES_PER_ASKABLE_POWER)
    .map((p) => p.power);
}

export function buildRulerDeck(random: () => number = Math.random): HistoricalQuestion[] {
  const askable = new Set(askablePowers());
  const byPower = new Map<string, HistoricalQuestion[]>();
  for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
    if (!UN_MEMBER_CODES.has(code)) continue;
    for (const entry of flags) {
      if (!entry.path || !entry.sovereign) continue;
      if (!askable.has(entry.sovereign)) continue;
      const list = byPower.get(entry.sovereign) ?? [];
      list.push({
        id: entry.id,
        countryCode: code,
        entry,
        path: entry.path,
        answer: entry.sovereign,
        // The sovereign is the ANSWER here, so the caption omits it and gives
        // the flag's own name and years instead; the page adds the country it
        // flew over, which is the other half of the teaching.
        caption: symbolCaption(entry, false),
      });
      byPower.set(entry.sovereign, list);
    }
  }
  const deck: HistoricalQuestion[] = [];
  for (const [, list] of byPower) {
    deck.push(...shuffle(list, random).slice(0, MAX_QUESTIONS_PER_POWER));
  }
  return shuffle(deck, random);
}

// ── "Date the flag" ─────────────────────────────────────────────────────────

/**
 * Period buckets. Wider the further back you go, because a flag's first year is
 * known to the year in the modern era and to the decade or worse before it — the
 * buckets should not ask for precision the sources do not carry.
 */
export const ERA_BUCKETS: ReadonlyArray<{ label: string; from: number; to: number }> = [
  { label: "Before 1600", from: -4000, to: 1599 },
  { label: "1600–1749", from: 1600, to: 1749 },
  { label: "1750–1849", from: 1750, to: 1849 },
  { label: "1850–1899", from: 1850, to: 1899 },
  { label: "1900–1919", from: 1900, to: 1919 },
  { label: "1920–1944", from: 1920, to: 1944 },
  { label: "1945–1969", from: 1945, to: 1969 },
  { label: "1970–1989", from: 1970, to: 1989 },
  { label: "1990 or later", from: 1990, to: 9998 },
];

export function bucketFor(year: number): string | null {
  return ERA_BUCKETS.find((b) => year >= b.from && year <= b.to)?.label ?? null;
}

export function buildEraDeck(random: () => number = Math.random): HistoricalQuestion[] {
  const deck: HistoricalQuestion[] = [];
  for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
    if (!UN_MEMBER_CODES.has(code)) continue;
    for (const entry of flags) {
      if (!entry.path || entry.category !== "historical") continue;
      if (entry.from == null) continue;
      // A shared image carries a different window under each country, so it has
      // no single correct period — the one place this deck must be stricter than
      // the ruler deck.
      if (imageIsAmbiguous(entry.path)) continue;
      const answer = bucketFor(entry.from);
      if (!answer) continue;
      deck.push({
        id: entry.id,
        countryCode: code,
        entry,
        path: entry.path,
        answer,
        caption: symbolCaption(entry),
      });
    }
  }
  return shuffle(deck, random);
}

// ── Shared ──────────────────────────────────────────────────────────────────

export function buildHistoricalDeck(
  ask: HistoricalAsk,
  random: () => number = Math.random,
): HistoricalQuestion[] {
  return ask === "ruler" ? buildRulerDeck(random) : buildEraDeck(random);
}

/** The full answer space for a deck — the dropdown/option universe. */
export function answerSpace(ask: HistoricalAsk): string[] {
  if (ask === "era") return ERA_BUCKETS.map((b) => b.label);
  return rulingPowers()
    .map((p) => p.power)
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

/**
 * Options for one question: the correct answer plus distractors.
 *
 * Era options keep the buckets in chronological order and prefer NEIGHBOURING
 * periods, so the question tests dating rather than the ability to spot the one
 * plausible century among three absurd ones. Ruler options are drawn from the
 * powers actually present in the data.
 */
export function optionsFor(
  ask: HistoricalAsk,
  question: HistoricalQuestion,
  optionCount = 4,
  random: () => number = Math.random,
): string[] {
  if (ask === "era") {
    const labels = ERA_BUCKETS.map((b) => b.label);
    const idx = labels.indexOf(question.answer);
    const picked = new Set<string>([question.answer]);
    for (let offset = 1; picked.size < optionCount && offset < labels.length; offset++) {
      for (const cand of [labels[idx - offset], labels[idx + offset]]) {
        if (cand && picked.size < optionCount) picked.add(cand);
      }
    }
    return labels.filter((l) => picked.has(l));
  }
  const powers = rulingPowers().map((p) => p.power).filter((p) => p !== question.answer);
  const picked = shuffle(powers, random).slice(0, Math.max(0, optionCount - 1));
  return [question.answer, ...picked].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  );
}
