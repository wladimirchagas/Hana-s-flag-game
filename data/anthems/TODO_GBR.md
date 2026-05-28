# TODO: United Kingdom of Great Britain and Northern Ireland (GBR / GB)

**Gap category:** `instrumental_audio_only`
**Official language(s):** en
**Wikipedia anthem slug (guess):** `God_Save_the_King`

## Status
Lyrics are present (7 lines), but the existing
`wikiFile` is an instrumental rendition:

> `God Save the King - Instrumental.ogg`

Karaoke needs a vocal recording so word timings can be aligned to
actual sung audio.

## What to do
1. Search Wikimedia Commons for a vocal/choral/sung version of
   this anthem. Suggested search terms:

- `God Save the King`
- `God save king queen national anthem United Kingdom instrumental`
- `United Kingdom of Great Britain and Northern Ireland national anthem`
- `God Save the King - Instrumental`

2. Verify vocal presence by ear *or* (when the Demucs pipeline lands)
   by running `scripts/anthems/03_vocal_check.mjs`.
3. Replace the `wikiFile` value in `src/data/nationalAnthems.ts`.
4. If no vocal version exists in a free-licence catalogue, add
   `instrumental: true` and reclassify as a documented exception.

## Search seeds
Wikimedia Commons keyword candidates:

- `God Save the King`
- `God save king queen national anthem United Kingdom instrumental`
- `United Kingdom of Great Britain and Northern Ireland national anthem`
- `God Save the King - Instrumental`

## Acceptance criteria
- [ ] Lyrics in native script committed
- [ ] English translation with provenance tag
- [ ] Vocal audio source with explicit free licence
- [ ] Line-level (or better, word-level) timings
- [ ] License + source URL recorded in `data/anthems/manifest.json`
