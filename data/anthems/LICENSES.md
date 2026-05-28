# National Anthem Source Licenses

This manifest records the provenance and license of every anthem asset
shipped by the karaoke pipeline. It is rebuilt by the pipeline stages
(`scripts/anthems/*`); do not edit by hand.

| Field | Meaning |
|---|---|
| `iso3` | ISO 3166-1 alpha-3 code |
| `lyrics_source` | Where the native + English lyrics came from |
| `lyrics_license` | SPDX identifier for the lyrics text |
| `audio_source` | Where the vocal audio came from (Phase 2) |
| `audio_license` | SPDX identifier for the audio recording (Phase 2) |
| `notes` | Documented exceptions, partial coverage, etc. |

## Status (Phase 1)

Phase 1 only catalogs and audits; no audio has been downloaded into the
repository yet. Audio remains resolved at runtime by
`src/components/NationalAnthemPlayer.tsx` from Wikimedia Commons via the
existing imageinfo API, using the per-country `wikiFile` reference in
`src/data/nationalAnthems.ts`.

- Lyrics for the 191 covered countries were sourced from Wikipedia anthem
  articles and committed to `src/data/nationalAnthems.ts` via PR #139
  (commit `c1e103f`). The default lyrics license inherited from Wikipedia
  is **CC-BY-SA-4.0** unless a country-specific note overrides it.
- Audio playback uses Wikimedia Commons recordings selected at runtime;
  per-recording licenses are inspected by the in-app resolver but not yet
  pinned in this file. Phase 2 will pin each `iso3` to a single
  permanently-licensed download with the SPDX id recorded here.

## Documented instrumental exceptions

| iso3 | name | reason |
|---|---|---|
| ESP | Spain | *Marcha Real* has no official lyrics — see `data/anthems/TODO_ESP.md` |
| SMR | San Marino | *Inno Nazionale della Repubblica* has no official lyrics — see `data/anthems/TODO_SMR.md` |
| VAT | Holy See (Vatican) | Seed-listed as instrumental; the in-app entry under ISO 2 `VA` does carry Antonio Allegra's 1991 Latin lyrics, so the karaoke entry exists and is treated as vocal |

## Phase 2+ contract

When the audio-fetch / vocal-check / normalize stages land, this file
will gain one row per `iso3` recording, populated by
`scripts/anthems/02_fetch_audio.mjs` (and successors). Until then, the
runtime resolver remains authoritative for audio license attribution.
