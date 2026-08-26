// Guard: every question a SYMBOL PACK can ask must have exactly one correct
// answer, a picture (or sourced text) to show, and an answer space the game can
// actually offer.
//
// WHY THIS EXISTS:
// Flag Master can now quiz a country's coat of arms, passport cover, football
// crest, former flags and service flags — 1,838 sourced entries that Learn mode
// accumulated for DISPLAY, where several properties that are harmless on a
// reference page are fatal in a quiz:
//
//   1. ONE IMAGE, ONE ANSWER. Learn mode may legitimately list the SAME image
//      under many countries — the Union Flag is bundled under six, the Cross of
//      Burgundy under nineteen — because there it is captioned with the country
//      whose page you are on. As a quiz prompt that image has many correct
//      answers, so it can never be asked as "which country is this?". (It is a
//      fine question the other way round, which is what the "Under whose rule?"
//      deck is for.)
//   2. THE `primary` FLAG IS NOT A SYMBOL. Every country's current national
//      flag is an `official` entry pointing at flags/{cc}.svg. Letting it into
//      another pack would silently re-ask the All-195 game under a new name.
//   3. NO IMAGE, NO QUESTION. An entry with `noImageReason` exists precisely so
//      an unpicturable symbol stays VISIBLE in Learn mode. A quiz card cannot
//      render one.
//   4. THE CREST ANSWER SPACE IS THE 195. The crest data covers ~211 FIFA
//      associations, including non-UN entities and the four UK home nations.
//      The UK has NO single national crest, so it must never be an answer.
//   5. A CLUE MUST NOT CONTAIN ITS OWN ANSWER. The text pack's explainers are
//      written for a page that already names the country, so the redaction in
//      quizSymbols.ts is load-bearing: a leak turns a question into a giveaway.
//
// Every rule is checked against the DATA the app actually plays, by importing
// the app's own deck builders — not a second copy of the rules that could drift
// from them. It also asserts the deck builders are still WIRED UP, because a
// rule enforced by a module nothing calls is not enforced at all.
//
// Run: node scripts/check-quiz-symbol-decks.mjs   (npm run quiz:check-decks)
// Needs Node 22.18+ — it imports .ts modules directly.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const {
  QUIZ_SYMBOL_ORDER,
  QUIZ_SYMBOL_LABELS,
  codesForSymbol,
  symbolEntriesFor,
  ambiguousImages,
  imageIsAmbiguous,
  symbolClueFor,
} = await import("../src/lib/quizSymbols.ts");
const { NATIONAL_FLAGS } = await import("../src/data/nationalFlags.ts");
const { UN_MEMBER_CODES } = await import("../src/lib/unMemberStates.ts");
const {
  buildRulerDeck,
  buildEraDeck,
  askablePowers,
  optionsFor,
  ERA_BUCKETS,
} = await import("../src/lib/historicalQuiz.ts");

const errors = [];
const notes = [];

/** A deck this thin is not a game — it is a bug that has not been noticed. */
const MIN_DECK = 20;

// ── Rules 1–4: every question in every pack ─────────────────────────────────
for (const pack of QUIZ_SYMBOL_ORDER) {
  if (pack === "flag") continue;
  const codes = codesForSymbol(pack);
  if (codes.length < MIN_DECK) {
    errors.push(
      `${pack}: only ${codes.length} countries playable (minimum ${MIN_DECK}) — ` +
        `the pack would open onto an unplayably small deck.`,
    );
  }
  for (const code of codes) {
    if (!UN_MEMBER_CODES.has(code)) {
      errors.push(`${pack}: ${code} is not one of the 195 — it cannot be an answer.`);
    }
    for (const entry of symbolEntriesFor(code, pack)) {
      if (!entry.path) {
        errors.push(`${pack}/${code}: entry ${entry.id} has no image (rule 3).`);
      } else if (imageIsAmbiguous(entry.path)) {
        errors.push(
          `${pack}/${code}: ${entry.id} uses ${entry.path}, which is bundled under ` +
            `several countries — the question would have more than one correct ` +
            `answer (rule 1).`,
        );
      }
      if (entry.primary) {
        errors.push(
          `${pack}/${code}: ${entry.id} is the country's CURRENT national flag — ` +
            `quizzing it here re-asks the All-195 game (rule 2).`,
        );
      }
      if (pack === "footballcrest" && entry.id !== `${code.toLowerCase()}-football-crest`) {
        errors.push(
          `footballcrest/${code}: ${entry.id} is not the country's own crest (rule 4).`,
        );
      }
      if (pack === "historical" && entry.sovereign) {
        errors.push(
          `historical/${code}: ${entry.id} is ${entry.sovereign}'s flag, not the ` +
            `country's — it belongs to the "Under whose rule?" deck (rule 5).`,
        );
      }
    }
  }
  notes.push(`${QUIZ_SYMBOL_LABELS[pack].padEnd(20)} ${String(codes.length).padStart(3)} countries`);
}

// The UK plays as four home nations and has no single crest — it must not be an
// answer in the crest deck however the manifest grows.
if (codesForSymbol("footballcrest").includes("GB")) {
  errors.push(
    `footballcrest: the United Kingdom is in the deck, but it has no single ` +
      `national crest — it plays as four home nations (rule 4).`,
  );
}

// ── Rule 5: no clue may contain its own answer ──────────────────────────────
let clueCount = 0;
for (const code of codesForSymbol("meaning")) {
  for (const entry of symbolEntriesFor(code, "meaning")) {
    const clue = symbolClueFor(entry, code);
    if (!clue) {
      errors.push(`meaning/${code}: ${entry.id} is in the deck but has no usable clue.`);
      continue;
    }
    clueCount++;
    if (!clue.sourceUrl.startsWith("http")) {
      errors.push(`meaning/${code}: ${entry.id}'s clue cites a non-http source.`);
    }
  }
}
notes.push(`Clues that survive redaction   ${clueCount}`);

// ── The two historical decks ────────────────────────────────────────────────
const ruler = buildRulerDeck();
const era = buildEraDeck();

if (ruler.length < MIN_DECK) {
  errors.push(`ruler deck: only ${ruler.length} questions (minimum ${MIN_DECK}).`);
}
if (era.length < MIN_DECK) {
  errors.push(`era deck: only ${era.length} questions (minimum ${MIN_DECK}).`);
}

for (const q of ruler) {
  if (!q.entry.sovereign) {
    errors.push(`ruler: ${q.id} has no sovereign — it cannot answer "under whose rule?".`);
  }
  if (!q.path) errors.push(`ruler: ${q.id} has no image.`);
  const opts = optionsFor("ruler", q);
  if (!opts.includes(q.answer)) {
    errors.push(`ruler: ${q.id}'s options do not include its own answer.`);
  }
  if (new Set(opts).size !== opts.length) {
    errors.push(`ruler: ${q.id} offers a duplicated option.`);
  }
}

// The era deck is the one place a shared image is fatal rather than useful: the
// same Spanish ensign carries a different window under each country, so it has
// no single correct period.
for (const q of era) {
  if (imageIsAmbiguous(q.path)) {
    errors.push(
      `era: ${q.id} uses ${q.path}, shared across countries with different ` +
        `windows — it has no single correct period.`,
    );
  }
  if (q.entry.from == null) errors.push(`era: ${q.id} is undated.`);
  const opts = optionsFor("era", q);
  if (!opts.includes(q.answer)) {
    errors.push(`era: ${q.id}'s options do not include its own answer.`);
  }
  if (opts.length < 2) errors.push(`era: ${q.id} offers fewer than two periods.`);
}

// A power that appears as a distractor but can never be the answer teaches the
// player something false about the data; one asked about only once is a
// coin-flip. Both are caught by the askable floor.
const powersAsked = new Set(ruler.map((q) => q.answer));
for (const p of askablePowers()) {
  if (!powersAsked.has(p)) {
    errors.push(`ruler: ${p} is askable but appears in no question.`);
  }
}

// Every era bucket must be reachable, or the option builder can offer a period
// no flag ever falls in.
const bucketsUsed = new Set(era.map((q) => q.answer));
for (const b of ERA_BUCKETS) {
  if (!bucketsUsed.has(b.label)) {
    notes.push(`(no flag falls in "${b.label}")`);
  }
}

notes.push(`Under whose rule?              ${ruler.length} questions, ${powersAsked.size} powers`);
notes.push(`Date the flag                  ${era.length} questions`);

// ── The rules must stay WIRED UP ────────────────────────────────────────────
// A deck builder nothing calls enforces nothing, so the guard also checks the
// call sites — the same discipline as check-image-element-keys.mjs asserting
// that GridImage keeps its observer.
const wiring = [
  ["src/hooks/useGame.ts", "pickSymbolEntry", "the flag card would keep showing the national flag"],
  ["src/hooks/useGame.ts", "packCountries", "the symbol pack would never reach the deck"],
  ["src/pages/FlagGamePage.tsx", "config.symbol", "every game would fall back to flags"],
  ["src/pages/FlagGamePage.tsx", "QUIZ_SYMBOL_SLUGS", "symbol runs would share the flag leaderboard"],
  ["src/components/FlagCard.tsx", "symbolClue", "the text pack would render a blank card"],
  ["src/components/Feedback.tsx", "symbolCaption", "a colonial-era flag would be revealed with no attribution"],
  ["src/components/AllFlagsSetupModal.tsx", "QUIZ_SYMBOL_ORDER", "the Show axis would disappear"],
  ["src/lib/gameShareUrl.ts", "symbolFromSlug", "a shared symbol link would cold-load as flags"],
  ["src/pages/HistoricalFlagGamePage.tsx", "caption", "the historical reveal would lose its attribution"],
];
for (const [file, needle, consequence] of wiring) {
  const src = readFileSync(join(root, file), "utf8");
  if (!src.includes(needle)) {
    errors.push(`${file} no longer references \`${needle}\` — ${consequence}.`);
  }
}

// ── Report ─────────────────────────────────────────────────────────────────
const shared = ambiguousImages();
console.log("Quiz symbol decks\n");
for (const n of notes) console.log("  " + n);
console.log(
  `\n  ${shared.length} image(s) are bundled under more than one country and are ` +
    `therefore excluded from every "which country?" deck:`,
);
for (const { path, codes } of shared) {
  console.log(`    ${path} — ${codes.length}: ${codes.join(", ")}`);
}
console.log(
  `\n  ${Object.keys(NATIONAL_FLAGS).length} countries carry national-symbol data.`,
);

if (errors.length > 0) {
  console.error(`\n✗ ${errors.length} problem(s):\n`);
  for (const e of errors) console.error("  • " + e);
  process.exit(1);
}
console.log("\n✓ Every symbol deck has one answer per question, and is wired up.");
