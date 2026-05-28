# TODO: Colombia (COL / CO)

**Gap category:** `instrumental_audio_only`
**Official language(s):** es
**Wikipedia anthem slug (guess):** `National_Anthem_of_Colombia`

## Status
Lyrics are present (13 lines), but the existing
`wikiFile` is an instrumental rendition:

> `United States Navy Band - ¡Oh, gloria inmarcesible!.ogg`

Karaoke needs a vocal recording so word timings can be aligned to
actual sung audio.

## What to do
1. Search Wikimedia Commons for a vocal/choral/sung version of
   this anthem. Suggested search terms:

- `Himno Nacional de Colombia`
- `National Anthem of Colombia`
- `Oh gloria inmarcesible Colombia vocal national anthem`
- `Colombia national anthem`
- `United States Navy Band - ¡Oh, gloria inmarcesible!`

2. Verify vocal presence by ear *or* (when the Demucs pipeline lands)
   by running `scripts/anthems/03_vocal_check.mjs`.
3. Replace the `wikiFile` value in `src/data/nationalAnthems.ts`.
4. If no vocal version exists in a free-licence catalogue, add
   `instrumental: true` and reclassify as a documented exception.

## Search seeds
Wikimedia Commons keyword candidates:

- `Himno Nacional de Colombia`
- `National Anthem of Colombia`
- `Oh gloria inmarcesible Colombia vocal national anthem`
- `Colombia national anthem`
- `United States Navy Band - ¡Oh, gloria inmarcesible!`

## Acceptance criteria
- [ ] Lyrics in native script committed
- [ ] English translation with provenance tag
- [ ] Vocal audio source with explicit free licence
- [ ] Line-level (or better, word-level) timings
- [ ] License + source URL recorded in `data/anthems/manifest.json`
