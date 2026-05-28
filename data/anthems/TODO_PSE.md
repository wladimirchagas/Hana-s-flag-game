# TODO: State of Palestine (PSE / PS)

**Gap category:** `missing_entry`
**Official language(s):** ar
**Wikipedia anthem slug (guess):** `State_of_Palestine_national_anthem`

## Status
No entry exists in `src/data/nationalAnthems.ts` for this country.
Both lyrics *and* an audio source must be sourced before this
country can join the karaoke player.

## What to do
1. Find the official native-language lyrics on Wikipedia (preferred)
   or the relevant government site. Capture an English translation
   with provenance (`official_translation` / `wikipedia_translation`).
2. Find a freely licensed vocal recording on Wikimedia Commons.
   Acceptable licences: Public Domain, CC0, CC-BY, CC-BY-SA.
3. Add a `wikiFile` + `lines[]` block to `src/data/nationalAnthems.ts`.
4. Re-run `npm run anthems:catalog` to confirm the gap closes.

## Search seeds
Wikimedia Commons keyword candidates:

- `State of Palestine national anthem`

## Acceptance criteria
- [ ] Lyrics in native script committed
- [ ] English translation with provenance tag
- [ ] Vocal audio source with explicit free licence
- [ ] Line-level (or better, word-level) timings
- [ ] License + source URL recorded in `data/anthems/manifest.json`
