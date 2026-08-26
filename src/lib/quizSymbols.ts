/**
 * Quiz "symbol packs" — the axis that lets Flag Master ask "which country is
 * this?" about something OTHER than the national flag.
 *
 * Learn mode's National-symbols tab already carries, sourced and bundled, every
 * country's coat of arms, passport cover, football-association crest, historical
 * flags, service/maritime/standard flags and their explainers (see CLAUDE.md,
 * "National-symbols tab"). All of it answers with a COUNTRY, which is exactly
 * the question `useGame` already asks — so a pack changes only two things: the
 * image the card shows, and which countries are eligible for the deck.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FIVE RULES THIS MODULE ENFORCES (checked by scripts/check-quiz-symbol-decks.mjs)
 *
 * 1. ONE IMAGE, ONE ANSWER. An image bundled under more than one country cannot
 *    be a "which country?" question — it has several correct answers. Measured
 *    on the current data: arms, passports and crests share nothing, but SIX
 *    historical images cover 50 country-entries (the Cross of Burgundy under 19
 *    countries, the Union Flag under 5, the Dannebrog under 3 …). Those are
 *    dropped here and become the "Under whose rule?" deck instead, where the
 *    shared image has exactly ONE correct answer.
 * 2. NEVER QUIZ THE `primary` FLAG INSIDE ANOTHER PACK. The current national
 *    flag is an `official` entry pointing at `flags/{cc}.svg`; letting it leak
 *    into another pack would silently re-ask the All-195 game.
 * 3. NO IMAGE, NO QUESTION. An entry carrying `noImageReason` is listed in Learn
 *    precisely so the gap stays visible — but a quiz card cannot render it.
 * 4. THE CREST ANSWER SPACE IS THE 195. The crest data covers ~211 FIFA
 *    associations including non-UN entities and the four UK home nations; the
 *    UK has NO single national crest, so it must never be an answer in a crest
 *    deck. Only a country's OWN `{cc}-football-crest` counts.
 * 5. A PRE-INDEPENDENCE FLAG IS NEVER SHOWN BARE. A `sovereign` entry is a
 *    RULER's flag, not the country's; it is excluded from "which country?" and
 *    every reveal caption renders the sourced attribution
 *    (`sovereign` / `occupier` / `priorPolity`) exactly as the Learn tab does.
 *
 * Paths returned here are BASE-relative (as the data stores them); the app
 * prefixes `import.meta.env.BASE_URL`, so this module stays importable from a
 * plain Node check script.
 */

import {
  NATIONAL_FLAGS,
  NATIONAL_FLAG_MEANINGS,
  type NationalFlag,
} from "../data/nationalFlags.ts";
import { UN_MEMBER_CODES } from "./unMemberStates.ts";

/** A pack: what the card shows. `flag` is the game that already ships. */
export type QuizSymbol =
  | "flag"
  | "coatofarms"
  | "passport"
  | "footballcrest"
  | "historical"
  | "service"
  | "meaning"
  | "matchpair";

export const QUIZ_SYMBOL_ORDER: readonly QuizSymbol[] = [
  "flag",
  "coatofarms",
  "passport",
  "footballcrest",
  "historical",
  "service",
  "meaning",
  "matchpair",
];

/** Chip label in the setup modal. */
export const QUIZ_SYMBOL_LABELS: Record<QuizSymbol, string> = {
  flag: "National flags",
  coatofarms: "Coats of arms",
  passport: "Passports",
  footballcrest: "Football crests",
  historical: "Former flags",
  service: "Service & sea flags",
  meaning: "What does it mean?",
  matchpair: "Match the pair",
};

/** The question the card asks. Nouns follow the category — a passport is never
 *  called a flag (CLAUDE.md rule 8a, "never call something a flag that is not one"). */
export const QUIZ_SYMBOL_PROMPTS: Record<QuizSymbol, string> = {
  flag: "Pick the country, then confirm your answer.",
  coatofarms: "Whose coat of arms is this?",
  passport: "Whose passport is this?",
  footballcrest: "Whose football crest is this?",
  historical: "Which country used to fly this flag?",
  service: "Whose service flag is this?",
  meaning: "Which country's coat of arms is described here?",
  matchpair: "Match the coat of arms to its national flag.",
};

/** One-line hint under the modal title. */
export const QUIZ_SYMBOL_HINTS: Record<QuizSymbol, string> = {
  flag: "The flag each country flies today.",
  coatofarms: "The arms, emblem or seal each country bears.",
  passport: "The cover of each country's ordinary passport.",
  footballcrest: "The crest each national football team wears.",
  historical: "A flag the country itself flew before its current one.",
  service: "Army, navy, air-force, ensign and head-of-state flags.",
  meaning: "Read the sourced explainer — no picture — and name the country.",
  matchpair: "The arms are shown; the answers are flags.",
};

/** The word for the thing being shown, for reveal captions and aria labels. */
export const QUIZ_SYMBOL_NOUNS: Record<QuizSymbol, string> = {
  flag: "flag",
  coatofarms: "coat of arms",
  passport: "passport",
  footballcrest: "crest",
  historical: "former flag",
  service: "service flag",
  meaning: "coat of arms",
  matchpair: "coat of arms",
};

/** The plural, which is NOT the singular plus "s" — "coat of armss" is how a
 *  naive pluralisation reads in the end-of-game copy. */
export const QUIZ_SYMBOL_NOUNS_PLURAL: Record<QuizSymbol, string> = {
  flag: "flags",
  coatofarms: "coats of arms",
  passport: "passports",
  footballcrest: "crests",
  historical: "former flags",
  service: "service flags",
  meaning: "coats of arms",
  matchpair: "coats of arms",
};

/** Packs whose deck is a country's own national flag (the shipped game). */
export function isFlagPack(pack: QuizSymbol): boolean {
  return pack === "flag";
}

/** Packs that show no image at all — the card renders sourced text instead. */
export function isTextPack(pack: QuizSymbol): boolean {
  return pack === "meaning";
}

/** Packs whose answer buttons render national flags rather than names. */
export function answersAreFlags(pack: QuizSymbol): boolean {
  return pack === "matchpair";
}

// ── Ambiguity index ─────────────────────────────────────────────────────────
// Every bundled image, mapped to the countries that carry it. Built once at
// module load, from the data itself — never a hand-maintained list, so a future
// re-generation of the manifest cannot silently reintroduce an ambiguous deck.
const countriesByImage = new Map<string, Set<string>>();
for (const [code, flags] of Object.entries(NATIONAL_FLAGS)) {
  for (const f of flags) {
    if (!f.path) continue;
    const set = countriesByImage.get(f.path) ?? new Set<string>();
    set.add(code);
    countriesByImage.set(f.path, set);
  }
}

/** True when this image is bundled under more than one country — so it cannot
 *  be the prompt of a "which country?" question (rule 1). */
export function imageIsAmbiguous(path: string): boolean {
  return (countriesByImage.get(path)?.size ?? 0) > 1;
}

/** Every image shared by two or more countries, for the check script's report. */
export function ambiguousImages(): Array<{ path: string; codes: string[] }> {
  const out: Array<{ path: string; codes: string[] }> = [];
  for (const [path, codes] of countriesByImage) {
    if (codes.size > 1) out.push({ path, codes: [...codes].sort() });
  }
  return out.sort((a, b) => b.codes.length - a.codes.length);
}

// ── Per-pack eligibility ────────────────────────────────────────────────────

const SERVICE_CATEGORIES = new Set<NationalFlag["category"]>([
  "military",
  "maritime",
  "standard",
  "civilstate",
  "indigenous",
]);

/**
 * Is this entry usable as a "which country?" prompt for this pack?
 * Rules 1–5 all land here, so no caller can forget one.
 */
function entryQualifies(entry: NationalFlag, pack: QuizSymbol, code: string): boolean {
  if (!entry.path) return false; // rule 3 — nothing to render
  if (entry.primary) return false; // rule 2 — that is the All-195 game
  if (imageIsAmbiguous(entry.path)) return false; // rule 1
  switch (pack) {
    case "coatofarms":
    case "matchpair":
    case "meaning":
      return entry.category === "coatofarms";
    case "passport":
      return entry.category === "passport";
    case "footballcrest":
      // rule 4 — a country's OWN crest only, never a home nation's or an
      // entity's crest that happens to sit in the same country's list.
      return (
        entry.category === "footballcrest" &&
        entry.id === `${code.toLowerCase()}-football-crest`
      );
    case "historical":
      // rule 5 — a `sovereign` entry is the RULING POWER's flag, not this
      // country's. It belongs to the "Under whose rule?" deck instead.
      return entry.category === "historical" && !entry.sovereign;
    case "service":
      return SERVICE_CATEGORIES.has(entry.category);
    case "flag":
      return false; // the national flag comes from the countries API, not here
  }
}

/** Every qualifying entry a country has for this pack (may be several). */
export function symbolEntriesFor(code: string, pack: QuizSymbol): NationalFlag[] {
  const list = NATIONAL_FLAGS[code.toUpperCase()];
  if (!list) return [];
  const qualified = list.filter((e) => entryQualifies(e, pack, code.toUpperCase()));
  if (pack !== "meaning") return qualified;
  // The text pack additionally needs a sourced explainer that survives redaction.
  return qualified.filter((e) => symbolClueFor(e, code) !== null);
}

/** The country codes a pack can actually quiz — UN members only, since that is
 *  the answer space every country-answer mode uses. */
export function codesForSymbol(pack: QuizSymbol): string[] {
  if (pack === "flag") return [...UN_MEMBER_CODES].sort();
  return Object.keys(NATIONAL_FLAGS)
    .filter((code) => UN_MEMBER_CODES.has(code))
    .filter((code) => symbolEntriesFor(code, pack).length > 0)
    .sort();
}

/** How many countries a pack can quiz. Shown as the deck count in the modal. */
export function symbolDeckSize(pack: QuizSymbol): number {
  return codesForSymbol(pack).length;
}

/**
 * Pick the entry this deck will show for a country. Several entries qualify for
 * the historical and service packs, so one is chosen at deck-build time and
 * then carried on the question — the card, the reveal and the results grid all
 * read the same choice, so they can never disagree about what was asked.
 */
export function pickSymbolEntry(
  code: string,
  pack: QuizSymbol,
  random: () => number = Math.random,
): NationalFlag | null {
  const entries = symbolEntriesFor(code, pack);
  if (entries.length === 0) return null;
  return entries[Math.floor(random() * entries.length)] ?? entries[0]!;
}

// ── Reveal captions ─────────────────────────────────────────────────────────

/**
 * The teaching line shown when the answer is revealed: the symbol's own name,
 * its dates where it has them, and — mandatory — the sourced attribution of a
 * flag the country did not choose. `occupier` reads "imposed by", never "under"
 * (CLAUDE.md: naming the occupier a sovereign asserts the very claim the
 * occupied country denies).
 */
export function symbolCaption(
  entry: NationalFlag,
  /**
   * Set false where the attribution IS the answer — the "Under whose rule?"
   * deck, whose reveal would otherwise read "Flag of Australia · under
   * Australia" straight after the player answered "Australia". Every other
   * caller keeps it: a colonial-era flag must never be shown unattributed.
   */
  includeAttribution = true,
): string {
  const bits: string[] = [entry.name];
  if (entry.from != null) {
    const to = entry.to == null || entry.to >= 9999 ? "present" : String(entry.to);
    bits.push(`${entry.from}–${to}`);
  }
  if (includeAttribution) {
    if (entry.occupier) bits.push(`imposed by ${entry.occupier}`);
    else if (entry.sovereign) bits.push(`under ${entry.sovereign}`);
    else if (entry.priorPolity) bits.push(`flown by ${entry.priorPolity}`);
  }
  return bits.join(" · ");
}

// ── The text pack ───────────────────────────────────────────────────────────

/**
 * Turn a sourced explainer into a clue that does not give its own answer away.
 *
 * `NATIONAL_FLAG_MEANINGS` prose names the country constantly ("the arms of
 * Andorra …"), so the country's name — and any word built on it (Brazil →
 * Brazilian) — is masked. A clue is REJECTED, not shipped half-masked, when
 * the answer still appears in it: the check script re-runs this and fails the
 * build on a leak, so a future data refresh cannot quietly ship a giveaway.
 */
const MASK = "———";

/** Country display names, needed for redaction. Derived from the manifest's own
 *  entry names so this module needs no second name source. */
function countryNamesFor(code: string): string[] {
  const list = NATIONAL_FLAGS[code.toUpperCase()] ?? [];
  const names = new Set<string>();
  for (const e of list) {
    // "Coat of arms of X", "Flag of X", "Passport of X" — the tail is the country.
    const m = e.name.match(/\b(?:of|de)\s+(.+)$/i);
    if (m?.[1]) names.add(m[1].trim());
  }
  return [...names];
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Words the clue must not contain: the country's names, plus any word sharing
 *  their first four letters (catches demonyms and adjectival forms). */
function redact(text: string, code: string): string {
  let out = text;
  const names = countryNamesFor(code);
  for (const name of names) {
    out = out.replace(new RegExp(escapeRe(name), "gi"), MASK);
    for (const word of name.split(/[\s-]+/)) {
      if (word.length < 5) continue;
      const stem = word.slice(0, 4);
      out = out.replace(new RegExp(`\\b${escapeRe(stem)}\\w*`, "gi"), MASK);
    }
  }
  return out;
}

export type SymbolClue = {
  /** The redacted explainer, rendered verbatim on the card. */
  readonly text: string;
  /** Where the explainer came from — shown so the clue stays checkable. */
  readonly sourceTitle: string;
  readonly sourceUrl: string;
};

/** A playable clue for this entry, or null when it has no sourced meaning, is
 *  too short to be a question, or still names its own answer after redaction. */
export function symbolClueFor(entry: NationalFlag, code: string): SymbolClue | null {
  const meaning = NATIONAL_FLAG_MEANINGS[entry.id];
  if (!meaning?.description) return null;
  const text = redact(meaning.description, code);
  if (text.length < 120) return null;
  // A clue that still contains its answer is dropped, never patched.
  for (const name of countryNamesFor(code)) {
    if (text.toLowerCase().includes(name.toLowerCase())) return null;
  }
  const source = meaning.sources[0];
  if (!source) return null;
  return { text, sourceTitle: source.title, sourceUrl: source.url };
}

// ── Serialisation ───────────────────────────────────────────────────────────

/** Short, stable token for share links and leaderboard slugs. */
export const QUIZ_SYMBOL_SLUGS: Record<QuizSymbol, string> = {
  flag: "flag",
  coatofarms: "arms",
  passport: "passport",
  footballcrest: "crest",
  historical: "former",
  service: "service",
  meaning: "meaning",
  matchpair: "match",
};

const SLUG_TO_SYMBOL = new Map<string, QuizSymbol>(
  QUIZ_SYMBOL_ORDER.map((s) => [QUIZ_SYMBOL_SLUGS[s], s]),
);

export function symbolFromSlug(slug: string | null | undefined): QuizSymbol | null {
  if (!slug) return null;
  return SLUG_TO_SYMBOL.get(slug) ?? null;
}
