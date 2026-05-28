# TODO: Guatemala (GTM / GT)

**Gap category:** `instrumental_audio_only`
**Official language(s):** es
**Wikipedia anthem slug (guess):** `National_Anthem_of_Guatemala`

## Status
Lyrics are present (8 lines), but the existing
`wikiFile` is an instrumental rendition:

> `National anthem of Guatemala, by the U.S. Navy Band.oga`

Karaoke needs a vocal recording so word timings can be aligned to
actual sung audio.

## What to do
1. Search Wikimedia Commons for a vocal/choral/sung version of
   this anthem. Suggested search terms:

- `Himno Nacional de Guatemala`
- `National Anthem of Guatemala`
- `Guatemala national anthem`
- `National anthem of Guatemala, by the U.S. Navy Band`

2. Verify vocal presence by ear *or* (when the Demucs pipeline lands)
   by running `scripts/anthems/03_vocal_check.mjs`.
3. Replace the `wikiFile` value in `src/data/nationalAnthems.ts`.
4. If no vocal version exists in a free-licence catalogue, add
   `instrumental: true` and reclassify as a documented exception.

## Search seeds
Wikimedia Commons keyword candidates:

- `Himno Nacional de Guatemala`
- `National Anthem of Guatemala`
- `Guatemala national anthem`
- `National anthem of Guatemala, by the U.S. Navy Band`

## Acceptance criteria
- [ ] Lyrics in native script committed
- [ ] English translation with provenance tag
- [ ] Vocal audio source with explicit free licence
- [ ] Line-level (or better, word-level) timings
- [ ] License + source URL recorded in `data/anthems/manifest.json`
