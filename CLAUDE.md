# Hana's Flag Game — development guide

## City overlay data must be sourced, never fabricated — hard rule, do not override without approval

**The Learn-mode map city overlay (the 📍 toggle next to the 🚩 flag toggle; markers rendered by
`src/components/CityMarkers.tsx`) shows CAPITALS ONLY — national capital(s) on the world map, and
national capital(s) + each subdivision's capital on the subdivision map. Every city, coordinate and
capital classification MUST come from an authoritative source — exactly like the flag and
subdivision-population rules. Never hand-write a capital or a coordinate from memory.**

Simplified to capitals-only per owner request (2026-07): largest-city markers were removed from the
UI. The largest-city data still exists in `src/data/cities.ts` (and its sourcing rules below still
apply if it is ever shown again) but `cityRoles.ts` no longer emits largest-city markers, and the
name of each capital is hidden by default and revealed on hover / tap (see `CityMarkers.tsx`).

The dataset (`src/data/cities.ts`) is **auto-generated** by `scripts/build-cities.mjs` (re-run:
`node scripts/build-cities.mjs`). Sourcing:

Coverage is **all UN member states** (national capitals) **plus every country with a bundled
subdivision polygon file** (subdivision capitals) — 194 national + ~2,700 subdivision capitals.

1. **Geography** — which cities exist, capital classification (national vs subnational), and
   coordinates — comes from **Natural Earth 10m populated places** (the same data lineage as the
   bundled basemap), via the committed all-country extract `scripts/data/ne_places.geojson`. Cities
   are assigned to subdivisions by **point-in-polygon** against the app's own
   `public/subdivisions/*.json` (geography decides — NE's `adm1name` is encoding-corrupted and must
   NOT be trusted for mapping).
2. **National-capital reconciliation** — NE's `adm0cap` tag is stale or ambiguous for a number of
   countries (it tags **Dar es Salaam** for Tanzania, whose capital is **Dodoma**; the former seat
   for Benin/Burundi; the pre-2022 name **"Nur-Sultan"** for Kazakhstan's **Astana**). So each
   national capital is **reconciled against the authoritative `COUNTRY_FACTS.capital`** (from
   `mledoze/countries`, the same source the country widget trusts): where NE's `adm0cap` city
   disagrees with the authoritative capital, `COUNTRY_FACTS` wins and only the **coordinates** are
   taken from NE. Where NE genuinely tags several national capitals **and** the authoritative one is
   among them, every capital is kept (multi-capital nations are shown honestly). A tiny cited layer
   handles the residue: `NATIONAL_CAPITAL_OVERRIDE` (Eswatini's Mbabane + Lobamba) and
   `NE_NAME_ALIAS` (Kazakhstan Nur-Sultan → Astana).
3. **Largest-city corrections** — Natural Earth's `pop_max` is an urban-agglomeration figure and
   mis-ranks "largest city" in some countries (e.g. it ranks George Town above Kuala Lumpur, and
   Geneva above Zürich). These are corrected in the generator's `LARGEST_OVERRIDE` table, each with
   a cited reason. (Largest cities are not currently displayed — capitals-only — but the data is
   kept correct.) Historical/false-positive capital tags (e.g. NE labels Kyoto an "Admin-0 capital
   alt") are excluded (all such tags carry `adm0cap=0`; `HISTORICAL_CAPITAL_BLOCK` is belt-and-braces).
4. **Multi-capital / de-facto roles** — a country with several capitals (Bolivia: Sucre +
   La Paz; South Africa: Pretoria/Cape Town/Bloemfontein; Côte d'Ivoire: Yamoussoukro + Abidjan) or a
   de-facto capital (Switzerland: Bern) carries a **sourced** role note from `CAPITAL_ROLES`. The
   national capital is a **list** (`NationalCities.capitals`), never a single value, so these are
   represented honestly.
5. **Subdivision-capital Wikidata fallback layer** — Natural Earth only tags a capital for the
   subdivisions it happens to carry a capital *point* for, leaving ~1,800 of the app's ~4,170
   subdivisions (Slovenia's & Latvia's municipalities, Italy's provinces, external territories such
   as Norfolk Island → Kingston, …) with **no** capital marker. These gaps are filled from
   **Wikidata** (`capital` P36 + its coordinates `P625`, keyed by ISO 3166-2 `P300`; a few code-less
   external territories fetched by QID), auto-generated into `src/data/subdivisionCapitals.ts` by
   `scripts/build-subdivision-capitals.mjs` (re-run: `node scripts/build-subdivision-capitals.mjs`,
   needs egress to `query.wikidata.org`). This is a **FALLBACK, never an override**: `cityRoles.ts`
   uses it **only** where `cities.ts` has no NE capital for a code — NE (already reconciled against
   `COUNTRY_FACTS`) always wins where it has data. The generator only re-formats authoritative
   Wikidata data — it never invents a capital or coordinate; a subdivision Wikidata has no
   `P36`+`P625` for is simply left absent. The Wikidata→app code remap (`CODE_ALIASES`) is shared
   with the population generator via `scripts/data/wikidata-subdivision-code-aliases.mjs` so the two
   can never drift.

### Rules

1. **Never invent or approximate** a city, coordinate, capital, or population (same spirit as the
   "never generate flag content" rule). If the source has no figure, omit it — the markers render
   only the data that exists.
2. **Never trust NE `pop_max` blindly** for "largest city". When a country's largest city looks
   wrong, verify against an authoritative city-proper population and add a cited `LARGEST_OVERRIDE`.
3. The overlay covers **all UN member states + every country with a bundled subdivision file**.
   Changing coverage means regenerating from the authoritative sources (`node scripts/build-cities.mjs`),
   not hand-adding rows. To refresh the NE extract, re-download `ne_10m_populated_places.geojson` and
   re-run the filter that produced `scripts/data/ne_places.geojson`.
4. **The city overlay MUST NEVER block territory selection — it is purely decorative.**
   The marker layer renders on top of the interactive subdivision/country paths. If a marker
   captures pointer events, its hit-area sits above the map and **swallows selection clicks** — and
   because the markers are a constant pixel size, a small subdivision can be **entirely covered** by
   its own (or a neighbour's) capital marker and become impossible to select. This shipped and was
   reported (2026-07): with 📍 on, Beijing, Shanghai, Tianjin and other small city-provinces (and the
   click-spot of larger ones like Xinjiang) could not be selected because the capital markers ate the
   clicks. **Hard rule:** every element the overlay renders — the group, the star, the ring, the
   label, and any hit/backdrop shape — MUST carry `pointer-events: none` (`CityMarkers.tsx` sets it on
   the container and each marker group). The overlay must **never** attach `onClick` / `onPointer*`
   handlers, `stopPropagation`, or a transparent hit-area that intercepts a tap meant for the map.
   A capital's name is revealed NOT by interacting with the marker but by the parent map passing the
   hovered/selected territory's code as `activeCode` (matched against each marker's `ownerCode`), so
   clicks always flow through to select the subdivision/country. **Never** re-introduce an interactive
   marker to get hover/tap-to-reveal — reveal via `activeCode` instead.
5. **Verify in the running app** (the mandatory visual-verification rule applies): toggle 📍 on the
   world map and confirm national capitals show as a large ★ (and multi-capital nations show every
   capital); drill into a country and confirm national (large ★) + subdivision (small ★) capitals,
   the dual-level ring where a city is both (e.g. a state capital that is also the national capital),
   that hovering/selecting a territory reveals its capital's name, and — critically — that **every
   subdivision (including tiny city-provinces like Beijing/Shanghai) is still selectable with 📍 on**.

## National-symbols tab: a country's own flags, arms and passports are dated images — source them, and share them with the eras — hard rule, do not override without approval

**The Learn-mode "National symbols" tab (`src/components/NationalFlagGrid.tsx`, data
`src/data/nationalFlags.ts`, generated by `scripts/build-national-flags.mjs` from the curated manifest
`scripts/data/national-flag-sources.json`, images fetched by `scripts/download-national-flags.mjs` into
`public/national-flags/`) shows a country's OWN symbols: its historical national flags newest-first with the
current one at the top (reaching back before independence — see rule 4), plus any additional officially
recognised flags, military service flags, maritime ensigns/jacks, head-of-state standards, civil/state
variants, indigenous flags, the **coat of arms** and the **passport** covers (ordinary and special —
diplomatic, official, service; covers only, never interior pages). A category a country has none of is
hidden entirely. Selecting a card opens the flag's own widget below the country fact-sheet and
highlights NOTHING on the map — the flag belongs to the whole country, so there is no territory to select.**

### Rules

0. **The "official" section comes FIRST, and it always contains the flag the country
   actually flies.** It is the section that answers "what is this country's flag?", so it leads the tab
   and its first card is the current national flag, marked with a **"Current national flag"** badge
   wherever it is listed (it appears in the historical section too). This shipped wrong and was reported
   (2026-08): Bolivia's official section held only the Wiphala, so the tricolour — the country's own flag
   — appeared nowhere in the first section a reader sees. `primary` is DERIVED by the generator from the
   image path (the entry reusing `flags/{cc}.svg`), never hand-set, so a country cannot have two primaries
   or forget to mark one; `check-national-flags.mjs` fails the build if a country's official section is
   missing it. **Selecting the primary flag opens NO second widget** — the fact-sheet above is already
   showing that exact image and its explainer, and a duplicate below is noise; the click scrolls there
   instead. The tab itself is also **first in the tab strip** and the default for a new visitor, ahead of
   the sub-national grid.
1. **Every flag is an image with a DATE and a SOURCE.** Each manifest entry carries a name, a design line
   and an authoritative `source` URL; a `historical` entry additionally carries the years it flew. Nothing
   is written from memory — same discipline as `era-flag-sources.json` and `capital-flag-sources.json`.
2. **Never invent a date to fill the label.** Where no authoritative source dates a service flag or ensign,
   the entry carries NO years and the card shows its name alone. An undated flag is honest; a guessed
   adoption year is the flag-adoption-year bug in a new place.
3. **THE LINK TO THE HISTORICAL ERAS IS ONE FILE, ONE WINDOW, TWO CONSUMERS.** A historical flag the era
   maps already bundle is `reuse`d from `historical-flags/` — never re-downloaded — and its from/to window
   MUST equal the window in `src/data/historicalFlagValidity.ts`. The tab is NOT limited to the eras' 21
   fixed dates: a flag flown between two era snapshots (Brazil 1968–1992, the 45-star US flag) is listed
   here with its own window, and bundled under `public/national-flags/`.
4. **`historical` reaches back BEFORE independence, and every pre-independence flag MUST name the power
   that held sovereignty.** The section covers this state, the predecessor states centred on the same
   territory (the Empire of Brazil, the Ottoman Empire, the Qing) **and** the colonial era — the ruling
   power's own flag (Portugal's royal banners over Brazil, the Union Flag over Australia and British
   India) as well as a colony's own flag under that rule (the Federated Malay States). Owner request,
   2026-08: these are part of a country's flag history and users want to see them.
   **What makes that safe is the attribution, and it is mandatory.** Such an entry carries `sovereign`
   (the ruling power), the country carries a sourced `independence` record, and the UI renders BOTH an
   "Under {power}" badge on the card AND a "Before independence … so this is not a flag of the
   independent country" statement in the widget. A colonial flag shown bare is an anachronism trap: the
   British East India Company's striped ensign looks like an early US flag, and Portugal's royal banner
   looks like a flag of Brazil. Never add a pre-independence flag without `sovereign`, and never remove
   the badge or the caption — `check-national-flags.mjs` fails the build on both.
   The era maps remain the place a *ruler's* flag is captioned per-era; this tab is the country's own
   timeline, and the two share their images and windows (rule 3).
4a. **A passport cover is a DRAWN image, never a photograph, and a country's types are listed in full.**
   Owner report (2026-08): Brazil's photographed booklet next to Malaysia's drawn cover — a photo carries
   its own lighting, perspective and wear, so it reads as *someone's document* rather than as the country's
   design. Only `.svg` covers are bundled (`check-national-flags.mjs` fails on anything else in the
   `passport` category), the ordinary passport leads its section, and every special type the country
   issues — diplomatic, official, service, emergency — is listed beside it. Where Commons holds only
   photographs (Brazil, Australia, Bolivia, Japan, South Africa), the cover is a **drawn raster from
   outside Commons** — the narrow exception, and it must declare itself. Those five are `.webp` drawings
   fetched from a site with no reuse licence, bundled at the owner's explicit direction after the
   copyright position was put to them: each entry carries `drawnRaster` (why this raster is a drawing,
   not a photo) and `licenceNote` (the copyright position, verbatim), and the check fails on any
   non-Commons `url` source that lacks the latter or any non-vector cover that lacks the former. Never
   add one silently, and replace it the moment a freely-licensed cover exists. A type with no image at
   all is still listed under rule 6 — never with a photo, and never dropped.
5. **`military` is service-level flags only** — army, navy, air force, marine corps — never the hundreds of
   rank, command and appointment flags these sources also list.
6. **A symbol that cannot be freely licensed is STILL LISTED — with `noImageReason` instead of an image,
   never dropped.** This shipped wrong and was reported (2026-08): Australia has THREE flags proclaimed
   under the Flags Act, and the tab showed two. The Torres Strait Islander Flag had been silently omitted
   because its design is under copyright until the 2060s and no free file exists — a correct decision about
   the IMAGE, applied wrongly to the ENTRY. **An omission the user cannot see makes an incomplete set look
   complete**, which is worse than an acknowledged gap: nobody can report what they cannot see. The entry
   renders as a card reading "No free image", and its widget states the reason and the full sourced meaning.
   Never approximate a symbol, and never delete the entry.
   **Apply this to every country, not just Australia**: when a country has a symbol you cannot picture, add
   it with a `noImageReason`.
   **But an `official` flag may NEVER be a no-image card — `check-national-flags.mjs` fails the build on
   one.** That is the second half of the Torres Strait lesson: a country's proclaimed national flags are
   exactly what a reader opens the tab to see, and "described but not shown" is still a hole in the set.
   When no freely-licensed file exists, source a DRAWN image (the Torres Strait Islander Flag is the SVG
   en.wikipedia carries under fair use, vectorised from the Australian Government's own symbols artwork)
   and record its copyright position in `licenceNote`, which the check also requires for any non-Commons
   `url` source. A non-free image is a decision for the repository owner, taken explicitly and written
   down — never taken silently, and never taken to save the work of looking for a free one first.
7. **Every meaning is sourced, and EXPLANATORY — not merely descriptive.** `NATIONAL_FLAG_MEANINGS` feeds
   the SAME `FlagMeaning` component the national/subnational/city flags use, under the same rule
   ("Flag-meaning explanations must be sourced and must separate myth from fact"). Owner requirement,
   2026-08: an explainer must say **what the symbols MEAN and why they are there**, not just what is drawn.
   "Three green stripes and a white star" is the `design` line's job; the explainer's job is that the green
   stripes are two landmasses and the star's five points are the island groups. A flag with no sourced
   symbolism ships with no explainer — but a coat of arms always has one, because arms are a stack of
   charges that each mean something and every national one is documented (enforced by the check).
8. **Never hand-edit `src/data/nationalFlags.ts`** — it is generated; edit the manifest and re-run the
   generator.
8a. **Never call something a flag that is not one.** The tab is "**National symbols**" — it holds a coat of
   arms and passports as well as flags — so every label that NAMES the item takes its noun from the
   category (`symbolNoun`/`meaningLabel` in `src/lib/nationalFlags.ts`): the widget's row reads "Coat of
   arms" or "Passport", and the disclosure reads "What this coat of arms means" / "What this passport
   shows". `FlagMeaning` takes that wording through its `label` prop, defaulting to the flag wording for
   its original callers. Adding a category means adding its noun in the same change.
9. **Verify in the running app** (the mandatory visual-verification rule applies): open a country's
   National symbols tab, confirm the sections present are only the ones it has, that the current flag heads
   the historical section, that picking a card opens its widget below the fact-sheet with the name, years
   and explainer — and that the MAP highlight does not change.

### Coverage — every UN member has the tab; depth grows per country

`scripts/seed-national-symbols.mjs` gives EVERY UN member the baseline it owes: its current
national flag, in the official section (badged as the flag in force) and heading the historical
section. It is the one generated part of this manifest, and it is safe to generate because every
field is copied from data the repo already sources — the bundled `public/flags/{cc}.svg`, the
sourced `FLAG_ADOPTION_YEAR`, the `UN_MEMBERS` name, and a Wikipedia URL it verifies exists before
writing. It writes **no visual description and no symbolism**: `design` states only that this is the
flag the country flies and the year it was adopted, and `meaning` is left for a human to source. It
never touches a country already in the manifest.

Everything beyond that baseline — historical flags, pre-independence flags, military and maritime
flags, standards, civil/state variants, indigenous flags, the coat of arms and the passports — is
added per country BY HAND, sourced entry by entry, as the first thirteen were (Brazil, Australia,
Malaysia, the United States, the United Kingdom, France, Spain, Bolivia, South Africa, Japan,
Türkiye, India, China). Treat deepening the remaining countries as a standing sweep in the same
spirit as the flag-meaning sweep: pick the next country, source it properly, never pad it.

### Enforcement

`scripts/check-national-flags.mjs` (`npm run flags:check:national`, in `npm run flags:check` and the
`check-era-maps` CI job — it imports `historicalFlagValidity.ts`, so it needs Node 22.18+) **fails the
build** on: a missing name/design/source; a historical entry with no years; an image that is not bundled or
whose bytes no longer match the recorded sha256; a runtime `https://` path; a standardised 640×480/512×512
viewBox; a reused era flag whose window disagrees with `historicalFlagValidity.ts`; a country whose
historical section omits the current flag; a country whose OFFICIAL section omits it, or lists it twice;
an undocumented omission; a malformed meaning; and
`src/data/nationalFlags.ts` having drifted from the manifest; an entry with neither an image nor a usable
`noImageReason`, or with both; a `coatofarms` entry with no sourced `meaning`; and either UI component
dropping its reference to `noImageReason` (which would make an unpicturable symbol vanish again). It ALSO
fails on any historical flag whose
window ends wholly before the country's sourced independence year but names no `sovereign` power (the
anachronism guard), on a `sovereign` set on a flag from after independence, and on `NationalFlagGrid.tsx`
or `NationalFlagDetails.tsx` no longer referencing `sovereign` — because the data is only half the
protection; the badge and the caption are the other half. The era-window comparison is CONTAINMENT, not
equality: a colonial usage is legitimately narrower than the design's own life (Spain's Cross of Burgundy
dates from 1506 but flew over Bolivia only from the conquest), while reaching OUTSIDE the era window is
the anachronism and fails. Never weaken it — fix the flag or its sourcing.

## Capital-city flags: never blindly trust P41, missing ≠ nonexistent — hard rule, do not override without approval

**The Learn-mode "View capital" drill-down (`CapitalDetails.tsx`, wired in `LearnPage.tsx`) shows the
selected subdivision's capital-city flag from `src/data/capitalFlags.ts` — files under
`public/capital-flags/`, generated by `scripts/build-capital-details.mjs` (source manifest
`scripts/data/capital-flag-sources.json`) + `scripts/download-capital-flags.mjs`. These are CITY flags,
a distinct category from national/subdivision flags, and the same "never fabricate / never show the
wrong flag" discipline applies.**

The pipeline sources a capital's flag from the capital city's Wikidata `P41`. An audit (2026-07,
prompted by owner reports of a wrong Johor Bahru flag and missing Porto/Sydney flags) established that
`P41`-only sourcing has **two** systematic failure modes, both of which this rule guards against:

1. **WRONG — the capital's `P41` is the national (or parent) flag.** Porto's city item (Q45) records
   `P41 = "Flag of Portugal (official).svg"`; blindly bundling it would show Portugal's national flag as
   "Porto's flag" — the capital-tree version of the parent-flag-collision bug. **A capital-city flag
   must NEVER be the national flag.** The generator drops any `P41`/override whose filename is the
   country's national flag, and `scripts/check-capital-flags.mjs` (in `npm run flags:check` and the
   `flag-integrity` CI workflow) **fails the build** if any bundled `public/capital-flags/*` file is
   perceptually the country's national flag (mean-colour distance < 10; a verbatim copy scores ~0, the
   nearest legitimate city flag — Gifu's red emblem on white, JP-21 — scores 13).

2. **MISS — a real municipal flag exists but the capital item has no `P41`.** Sydney's flag belongs to
   the *City of Sydney* LGA item, not the "Sydney" metro item, so `P41` is absent though the city plainly
   has a flag; Porto's real municipal flag ("Flag of Porto.svg") is likewise not the city item's `P41`.
   **"No `P41`" must NEVER be read as "no flag exists."** Before concluding a capital has no flag, verify
   against Commons / the city's own Wikipedia infobox. Two mechanisms correct misses, both surviving a
   regen (see `loadExistingFlagSources` in `build-capital-details.mjs`):
   - the curated `CAPITAL_FLAG_SOURCE_OVERRIDES` table in `build-capital-details.mjs` (app code →
     authoritative Commons filename), for hand-verified special cases (Porto, Sydney, Perth, Darwin, and
     the **Johor Bahru** correction — the owner-confirmed Johor Bahru City Council flag
     `Flag of Johor Bahru.svg` (red/white/blue tricolour with a yellow crescent and star, per FOTW
     `my-j-jbc`) is pinned here; an earlier pin used `Flag of Johor Bahru, Johor.svg`, which is the Johor
     STATE flag, not the city's); guarded by the national-flag check and the
     dangling-override check (an override naming an unbundled file fails the build).
   - the systematic **`scripts/backfill-capital-flags.mjs`** sweep, which fills every remaining flagless
     capital from the **collision-safe** source — the capital city's OWN en.wikipedia infobox flag,
     resolved via the Wikidata sitelink of the exact capital item (so "Liberia, Costa Rica" can never pull
     the country Liberia's flag). It rejects national flags, hypothetical/proposed/fictional designs,
     "flag absent" placeholders (e.g. "Vlag ontbreekt …"), SVGs with no `xmlns` (which render blank), and
     640×480 CDN placeholders; it falls back to the en.wikipedia file host for flags Commons doesn't hold.
     **Every batch it produces MUST be visually montage-scanned** before committing — that pass is what
     caught the Latvian "Vlag ontbreekt" placeholders, the Kärdla no-`xmlns` blank, and the Santiago de
     Cuba caption-baked image (all removed). A caption/annotation baked into the image, a placeholder, or
     a blank is NOT a flag — omit it.

### Rules

1. **Every capital-flag override must be an authoritative Commons file VISUALLY VERIFIED to be that
   city's OWN municipal flag** — not the national/parent flag, and **never** a hypothetical, proposed,
   or fictional design (Commons carries files like "Hypothetical flag of Andorra la Vella.svg"; these are
   forbidden, exactly like the "never invent flag content" rule). A missing capital flag always beats a
   wrong or invented one.
2. **Beware name collisions when sourcing a capital flag.** A bare "Flag of {CapitalName}.svg" lookup is
   unsafe: Guanacaste's capital *Liberia* (Costa Rica) is not the country Liberia; Saramacca's capital
   *Groningen* (Suriname) is not the Dutch province; a Latvian *Loja* is not Ecuador's. Source only from
   a signal tied to the EXACT city (the capital item's own Wikidata `P41`, or its own Wikipedia article's
   infobox flag) — never a name string.
3. **Never weaken or raise the `check-capital-flags.mjs` threshold, or delete the national-flag guard in
   the generator, to force a flag through.** If a capital flag trips the check it IS the national flag —
   fix the flag, not the check.
4. **Verify in the running app** (the mandatory visual-verification rule applies): open a subdivision
   whose capital has a flag (e.g. Portugal → Porto district, Australia → New South Wales), tap
   "View capital", and confirm the correct municipal flag renders (Porto's white/green arms; the City of
   Sydney banner) — not the national flag and not a blank.

## A capital-city flag must never duplicate its own subdivision's flag — hard rule, do not override without approval

**When a subdivision's bundled capital-city flag is visually the SAME image as the subdivision's own
flag, the capital flag MUST be suppressed — never shown a second time.** Showing the department flag as
the "department" node AND again as the "capital city" leaf displays two near-identical flags for one
place, which is misleading (the city-flag category must be a DISTINCT flag, exactly like the "never show
the parent nation's flag for a subdivision" rule). This is the capital↔subdivision sibling of the
parent-flag-collision rule.

### Why this rule exists

This shipped and was reported (2026-07): **La Paz** (`BO-L`) showed the department's red-over-green flag
on the department node AND an identical red-over-green flag on the "La Paz city" capital leaf. The
mechanism that suppresses such duplicates — `distinctCapitalFlagPath()` returns `null` when
`capitalFlagDuplicatesSubdivision(code)` is true, i.e. the code is in `CITY_TERRITORY_CODES` or
**`SHARED_CAPITAL_FLAGS`** (`src/data/sharedCapitalFlags.ts`) — was in place, but `BO-L` was missing from
it: the two files' shade difference put their perceptual distance (dHash **27**) above the generator's
strict auto-share threshold (`< 12`), and the manual curation that catches such far-apart duplicates
(`EFFECTIVELY_SHARED` in `scripts/build-shared-capital-flags.mjs`) had never added it. The list is
*generated*; nothing *failed the build* when a duplicate was omitted.

### Rules

1. **`SHARED_CAPITAL_FLAGS` is the single source of truth** for capital flags that duplicate their
   subdivision flag; it is generated by `scripts/build-shared-capital-flags.mjs` (byte-identical /
   dHash `< 12`, plus the curated `EFFECTIVELY_SHARED` map for same-design pairs whose shades render
   farther apart). A confirmed duplicate the perceptual pass misses is added to `EFFECTIVELY_SHARED`
   (with a one-line reason), then the file is regenerated — **never** hand-edit `sharedCapitalFlags.ts`.
2. **Only add a pair to `EFFECTIVELY_SHARED` after a side-by-side montage confirms the two flags are the
   SAME design** (La Paz: red-over-green ≡ red-over-green). Genuinely-different arms on a similar field
   (Cesar → Valledupar, Baja California → Mexicali, Zakarpattia → Uzhhorod) are DISTINCT — keep both,
   never suppress a real city flag.
3. **Never weaken or raise the collision-check threshold to force a flag through.** If a capital flag
   trips the check it IS its subdivision's flag — suppress it (or fix the wrong file), not the check.
4. **Verify in the running app** (the mandatory visual-verification rule applies): open the country's
   hierarchy chart and confirm no subdivision shows the same flag on its node and on its capital leaf
   (La Paz now shows the red/green flag once, on the department node marked "★ Seat of government").

### Enforcement

`scripts/check-capital-subdivision-collision.mjs` (in `npm run flags:check` and the `flag-integrity` CI
workflow) rasterises every bundled capital flag together with its subdivision flag and **fails the build**
if a pair is byte-identical or within perceptual distance **< 40** yet is not declared shared (in
`SHARED_CAPITAL_FLAGS` / `CITY_TERRITORY_CODES`). The threshold sits between the closest known duplicate
(La Paz, 27) and the closest genuinely-distinct pair (Cesar/Valledupar, 51). A future distinct pair that
scores below it goes in the check's `REVIEWED_DISTINCT` allowlist **only** after a montage confirms it is
different — never to silence a real duplicate.

## Hierarchy chart/table: capital attribution, no duplicate flags, distinct type colours — hard rule, do not override without approval

**The Learn-mode "Hierarchy chart" tab (`SubdivisionHierarchyChart.tsx` and its Table twin
`SubdivisionHierarchyTable.tsx`, both built from the single shared `useHierarchyData()` hook in
`src/lib/hierarchyData.ts`) has FOUR correctness properties that have each shipped broken and been
reported separately (all 2026-07, all on the same feature within days of each other). Fixing one is
not licence to leave the others — audit and fix all four together whenever any is touched.**

### 1. National-capital badge attribution must use the authoritative geographic host — never a name-only scan

**Why this rule exists.** `useHierarchyData` decides which subdivision "is" or "hosts" a national
capital. The original implementation did this by **scanning subdivisions by NAME** (`nodes.find(n =>
n.div.name === capitalName)`, and a similar scan over each node's own capital-city leaf). Whenever a
country has an EXACT DUPLICATE-NAME pair — a capital-city subdivision and a same-named surrounding
province/oblast/governorate — a name-only scan cannot tell them apart and arbitrarily picks whichever
sorts first. This shipped: Argentina's **Buenos Aires Province** (AR-B) was badged "★ National capital"
instead of the **Autonomous City of Buenos Aires** (AR-C, Argentina's real federal capital under Const.
art. 129); auditing the same class of bug found it ALSO affected Bulgaria (Sofia city-district vs. Sofia
Province), Croatia (Zagreb City vs. Zagreb County), Russia (Moscow federal city vs. Moscow Oblast),
Ukraine (Kyiv City vs. Kyiv Oblast), Uzbekistan (Tashkent City vs. Tashkent Region), and Yemen (Sanaa
City vs. Sanaa Governorate) — every country with an identically-named capital/region pair.

**The fix, and the rule going forward:** `useHierarchyData` MUST resolve a national capital's host by
looking up `NATIONAL_CAPITAL_SUBDIVISION[country|capitalName]` (the SAME point-in-polygon geography the
city overlay trusts — see the "City overlay data must be sourced" rule) **first**, and check ONLY that
one resolved node (its own shown capital-city leaf, or the node itself when it tautologically IS the
capital). A blind scan across ALL nodes by name is permitted **only** as a last-resort fallback when no
host record exists at all. Never reintroduce a bare `nodes.find(name-match)` / `leaves.find(name-match)`
as the FIRST resolution step — that is exactly the bug.

### 2. A capital that IS its own subdivision must never have its flag rendered a second time

**Why this rule exists.** When a subdivision tautologically IS the national capital (a city-territory —
Kuala Lumpur, Tokyo, Buenos Aires' Autonomous City), there is no distinct capital-city entity, so the
hierarchy TABLE self-references the same subdivision in the adjacent "Capital city flag" column so the
national-capital designation isn't lost. This shipped wrong: the self-reference re-rendered the
subdivision's OWN flag image a second time in that column — the identical eagle-crest flag appeared
TWICE in Argentina's "Buenos Aires" row, once per column. This is the exact same defect the "a
capital-city flag must never duplicate its own subdivision's flag" rule (above) forbids for two
DIFFERENT entities sharing a coincidentally-identical flag — here it is the SAME entity's flag reused a
second time, which is just as misleading. Brazil's Distrito Federal row was never affected because
Brasília is a *distinctly-named* leaf whose flag is already suppressed via `SHARED_CAPITAL_FLAGS`
(rendering blank there), which is what exposed the inconsistency: two logically-identical "this
subdivision is the capital" cases rendered differently.

**The rule:** a self-capital reference (in the table's `selfCapital` fallback, or ANY future rendering
of a tautological self-capital) MUST render with **no flag image** in the capital-city cell — name and
badge only — exactly like a suppressed duplicate-flag leaf renders. Never set a self-capital's
`flagPath` to the subdivision's own `subFlag`; that is always a duplicate.

### 3. Subdivision-type badge colours shown together must be GUARANTEED distinct — never assigned by hashing into a small fixed palette

**Why this rule exists.** The table's per-type colour badge (`TYPE_COLOR_PALETTE` /
`assignTypeColors()` in `SubdivisionHierarchyTable.tsx`) used to pick a colour by hashing each type
label **independently** into a small fixed palette (`hashString(label) % palette.length`). Across ~195
countries there are around 100 distinct type labels (Province, State, Autonomous City, National
Territory, Governorate, Oblast, Prefecture, Emirate, …) sharing a palette of only 5 colours — two
UNRELATED labels landing on the same colour was not a rare edge case, it was inevitable, and it
shipped: Argentina's "Autonomous City" and "National Territory" badges both rendered the same blue,
reported by the owner as looking like the same type.

**The fix, and the rule going forward:**
1. Colours are assigned for a WHOLE country's view at once (`assignTypeColors(typeLabels)`, called with
   every distinct type label `groups` produces for that one country), not per-label in isolation. A
   curated `TYPE_COLOR_PREFERENCE` map gives common labels (State, Province, Region, …) a consistent,
   recognisable colour across different countries, but that preference is honoured **only** when it
   does not collide with another type already claimed in the SAME view — distinctness within one view
   always wins over cross-country consistency.
2. `TYPE_COLOR_PALETTE` MUST always have **at least as many colours as the largest number of distinct
   type labels any single country's hierarchy view shows at once** (Russia needs the most: 6, as of
   2026-07). Adding a country/subdivision change that pushes any country's distinct-type count past the
   palette's length requires adding another accent colour to `TYPE_COLOR_PALETTE` **and** to
   `src/index.css` (both the light `:root` block and the dark `[data-theme="dark"]` block, matching the
   existing colours' contrast — check ≥5.7:1 against `--ink-fixed`) in the SAME change, never merely
   widening the check or hoping the hash "probably" won't collide.
3. Never revert to a per-label hash as the primary mechanism — it can never see which OTHER labels
   share the same view, so it can never guarantee distinctness, no matter how large the palette gets.

### 4. A subdivision hosting more than one capital-city row must visually GROUP them — sticky span, never an orphaned row

**Why this rule exists.** A subdivision can host TWO capital-city rows at once: its own provincial/state
capital, PLUS a national capital that geographically sits inside it but heads no subdivision of its own
(case (c) in `useHierarchyData` — Ottawa sits inside Ontario, which keeps its own capital Toronto; the
same pattern recurs for the Netherlands' North Holland → Haarlem + Amsterdam, and South Africa's Gauteng
→ Johannesburg + Pretoria). The table renders the extra national capital as a SEPARATE row directly below
the subdivision's own row. This shipped confusing: that extra row's "Sub-national flag" column rendered a
bare blank dash with no visual link back to Ontario, so Ottawa looked like an orphaned, disconnected
entry instead of clearly belonging to Ontario (reported 2026-07, with Ottawa/Ontario/Toronto as the
example).

**The fix, and the rule going forward:** a subdivision's own column-2 card (flag + name + type badge)
MUST span and visually group EVERY capital-city row it owns — its own row plus any directly-following
"extra" national-capital row(s) — using the SAME sticky treatment as the national-flag column
(`.hierarchy-table__cell--sticky`): it stays visible while the user scrolls through all of its own
capital-city rows, and only scrolls away once they scroll past the LAST one. Implementation
requirements, both required together (a bare sticky grid item spanning multiple rows does not reliably
bound its own release point):
1. The spanning cell's `gridRow` MUST cover its own row through the last contiguous "national-extra" row
   that belongs to it (rows are constructed so these are always directly adjacent — see the `rows`
   loop in `SubdivisionHierarchyTable.tsx`).
2. The spanning cell MUST be nested inside a `.hierarchy-table__sticky-bounds` wrapper — a real
   block-level box (never `display:contents`) carrying that same multi-row `gridRow` span — so
   `position: sticky` has a correctly-bounded containing block to release against. Never apply `sticky`
   to a cell placed directly as a grid item without this wrapper; verify by scrolling past the span in
   the running app and confirming the card's box releases (stops floating) at exactly the point its own
   last row ends, not later.
3. A "national-extra" row's own column-2 cell is never rendered (no placeholder, no dash) — it is always
   covered by the owning subdivision's spanning card from the row above.
4. This applies to EVERY country with this pattern, not just Canada — never hardcode the grouping/span
   logic per-country; it must fall out of the generic row-adjacency rule above.

### Verification

**Verify in the running app** (the mandatory visual-verification rule applies) whenever any of
`hierarchyData.ts`, `SubdivisionHierarchyChart.tsx`, or `SubdivisionHierarchyTable.tsx` changes: open a
country with a duplicate-name capital/region pair (Argentina, Bulgaria, Croatia, Russia, Ukraine,
Uzbekistan, or Yemen) in BOTH the Chart and Table views and confirm (a) the "★ National capital" badge
is on the capital-city subdivision, never the same-named region; (b) a self-capital row/node shows its
flag exactly once, never twice; (c) open a country with several distinct subdivision types (Russia,
China, New Zealand, Argentina) and confirm every type badge shown together has a visibly different
colour; and (d) open Canada's Table view, confirm Ontario's card visually spans and stays pinned across
BOTH its Toronto row and the Ottawa row beneath it while scrolling, then releases immediately after
Ottawa's row ends (repeat for the Netherlands' North Holland → Haarlem/Amsterdam and South Africa's
Gauteng → Johannesburg/Pretoria).

### Enforcement

`scripts/check-hierarchy-type-colors.mjs` (run by `npm run flags:check` and the `flag-integrity` CI
workflow) parses `SUBDIVISION_META` and **fails the build** if any single country's distinct type-label
count exceeds `TYPE_COLOR_PALETTE`'s length — the capacity precondition `assignTypeColors()` relies on to
guarantee no collision. There is no automated check for rules 1, 2, and 4 (they require rendering the
actual capital-attribution/flag/scroll data, which the existing checks don't model) — the guard is this
rule plus the visual verification above; when reviewing any change to `hierarchyData.ts` or the two
hierarchy components, confirm neither the name-only-scan pattern, a duplicated self-capital flag, nor an
orphaned/ungrouped extra capital-city row has crept back in.

## A newly added or newly surfaced entity must be COMPLETE — hard rule, do not override without approval

**Whenever you add a new entity — or change data so that a *different* entity becomes the one the app
surfaces (a subdivision, a state/province, a capital city, a country, a disputed territory) — that
entity MUST carry EVERY field its siblings carry and for which an authoritative source exists. Filling
only the one field that prompted the change, and leaving the rest blank, is a bug.**

### Why this rule exists

This shipped and was reported (2026-07): fixing Selangor's capital to **Shah Alam** (its `cities.ts`
marker had been wrongly showing Klang) surfaced Shah Alam in the "View capital" panel — but Shah Alam
was left **incomplete**: it had **no capital-flag "What this flag means" explainer**
(`cityFlagMeanings.ts`) and **no population** (`capitalDetails.ts` held only `{"name":"Shah Alam"}`,
while every sibling capital — Johor Bahru, George Town, Ipoh … — carried `population`, `year`, `basis`).
The panel therefore rendered a capital with a name and a flag but no population row and no flag
explanation, while the states around it were complete. The lesson: **when an entity becomes visible,
complete ALL of it, not just the field you came to fix.**

### The completeness contract — fill every field an authoritative source supports

| Entity surfaced | Fields that MUST be present when a source exists |
|-----------------|--------------------------------------------------|
| **Capital city** (`capitalDetails.ts` + `capitalFlags.ts` + `cityFlagMeanings.ts`) | `name`; **`population` + `year` + `basis`** (dated, authoritative); the city's own **flag**; the **flag-meaning explainer** (`CITY_FLAG_MEANINGS`) |
| **Subdivision / state** (`subdivisionMeta.ts` + friends) | `name`; `typeLabel`/tier; **capital** (+ its capital marker in `cities.ts`/`subdivisionCapitals.ts`); **population** (`subdivisionPopulation.ts`); **flag** (or a documented suppression); **flag-meaning** (`flagMeanings.ts`) where sourced; disputed note + flag if disputed |
| **Country** | every `EntitySummary` row (see the country-widget rule): Region, Official name, Capital, Population, Languages, Currencies, Government |
| **Disputed territory** (see the merged-disputed rule) | meta entry + capital + disputed note + flag — all in the same change |

### Rules

1. **Complete the whole entity in the same change.** Before finishing, walk the surfaced entity's fields
   against a *complete* sibling and fill every one that has an authoritative source. "I only came to fix
   the capital name" is not a licence to leave population/flag/explainer blank.
2. **A field is omitted ONLY when genuinely unsourceable** — the same "missing ≠ wrong, never fabricate"
   discipline as every flag/anthem/meaning rule. Never invent or approximate a population, coordinate,
   capital, flag or meaning to satisfy this rule; an honestly-absent field always beats a fabricated one.
3. **When a generator's discipline drops a real, sourceable figure, use the curated override — don't
   leave the gap.** The capital-population generator keeps only *dated* Wikidata figures (so each cites a
   year); when a capital's authoritative figure is undated on Wikidata it lands in
   **`CAPITAL_POPULATION_OVERRIDES`** in `scripts/build-capital-details.mjs` with a cited, dated source
   (as Shah Alam's DOSM-2020 figure now is), exactly as a missed capital flag lands in
   `CAPITAL_FLAG_SOURCE_OVERRIDES`. The override survives every regen — never hand-edit only the
   generated file and let the generator re-blank it.
4. **Verify in the running app** (the mandatory visual-verification rule applies): open the surfaced
   entity and confirm **every** row its complete siblings show is present — for a capital: the name,
   the **Population** row (with year/basis + national share), the flag, and the expanded "What this flag
   means" — not just the one field you changed.

### Enforcement

There is no single build-gating check (many small subdivisions legitimately have no dated population, so
a blanket "must have population" check would false-positive on correct omissions). The guard is this
rule plus the visual check in rule 4: when reviewing any PR that adds a subdivision/capital or changes
which entity is surfaced, confirm the new/changed entity is as complete as its siblings, and that any
blank field is a genuine unsourceable gap (documented) rather than an overlooked one.

## Population figures must use the latest authoritative enumeration — hard rule, do not override without approval

**Every population the app shows — a subdivision's total (`src/data/subdivisionPopulation.ts`), a
capital city's (`src/data/capitalDetails.ts`), a country's (live, World Bank → REST Countries) — MUST
be the LATEST authoritative figure available for that exact entity. A newer census or official estimate
always supersedes an older one. Shipping a figure from a superseded enumeration when a newer
authoritative one exists is a bug, in the same family as the "never fabricate a population" rule.**

### Why this rule exists

This was reported (2026-07): several Malaysian states were still on **2010-census / 2017-estimate**
figures (Selangor, Johor, Terengganu, Negeri Sembilan, Perlis) even though the authoritative **DOSM
2020 Census (MyCensus 2020)** had long superseded them; two states (Pahang, Perak) carried non-census
figures **mislabelled `basis: "census"`**; and — worst — the **Kuala Lumpur** federal territory carried
a **~9,000,000 Greater-KL *metropolitan* figure** instead of its true **2020 census 1,982,112**. The
root cause was the population generator keeping "the most recent *dated* Wikidata statement", which
(a) silently leaves a stale figure when Wikidata never got the newer census as a dated statement, and
(b) can attach a **metro-area** figure to an **administrative** subdivision that shares the item.

### Rules

1. **Latest wins.** When two authoritative figures exist for the same entity, use the one from the most
   recent enumeration (a 2020 census beats a 2010 census; a 2024 official estimate beats a 2020 one only
   if it is genuinely more recent *and* authoritative — a census is preferred to a same-or-older-year
   estimate). Never leave a subdivision on an older figure once a newer authoritative one is known.
2. **Never confuse the metropolitan area with the administrative subdivision.** A subdivision's
   population is the population of THAT administrative unit, not of its surrounding conurbation/urban
   agglomeration. A federal-territory/city-province figure (Kuala Lumpur, Beijing, Jakarta, …) must be
   the territory's own count, never the metro region's. When a figure looks implausibly large for the
   unit, this is the first thing to suspect.
3. **Keep the unit consistent within a dataset.** Capital-city figures follow the existing unit
   (the city/municipal **local-authority** total — e.g. George Town/MBPP 794,313, Shah Alam/MBSA
   812,327, Kota Kinabalu/DBKK 500,425), never a district or urban-agglomeration figure silently swapped
   in. A coterminous city-territory (Kuala Lumpur, Putrajaya) legitimately uses its territory's census
   total because the city *is* the territory.
4. **Fix at the source of truth, then the generated file.** A stale/wrong figure the generator would
   re-emit is corrected in the generator's curated override table
   (`MANUAL_VERIFIED_POPULATION` in `scripts/build-subdivision-population.mjs`;
   `CAPITAL_POPULATION_OVERRIDES` in `scripts/build-capital-details.mjs`) — each entry dated and cited —
   so the correction survives every regen, exactly like a capital-flag override. Applying the same value
   to the generated `.ts` keeps the shipped artifact correct until the next full network regen.
5. **Never fabricate to satisfy freshness.** If the latest authoritative figure cannot be sourced, keep
   the older *sourced* one (dated honestly) rather than invent or approximate a newer number — the
   "never invent a population" discipline is absolute and outranks freshness. Prefer a checksum-verified
   set (the DOSM 2020 figures sum exactly to the published national total 32,447,385).

### Enforcement

`scripts/check-population-freshness.mjs` (`npm run pop:check`, and part of `npm run flags:check` + the
`flag-integrity` CI workflow) **fails the build** on: (1) any subdivision figure that predates its
country's latest enumeration listed in the curated, sourced `LATEST_ENUMERATION_YEAR` table (seeded with
`MY: 2020`; grows as audits establish a newer enumeration for more countries — **this is the hard-coded
rule**); (2) any subdivision whose population exceeds its own national total (a wrong-entity signal);
and (3) for countries in `SUM_CHECK`, a subdivision sum that exceeds the national total beyond tolerance
(the metropolitan-confusion signal that caught the KL bug). The `year` freshness floor is the mechanism
that hard-codes "2020, not 2010" — add a country to `LATEST_ENUMERATION_YEAR` **only** after refreshing
all its subdivisions to that enumeration. Never weaken a floor or remove a country to make the build
pass; fix the figure instead.

## What the historical eras are FOR — the three goals every era must satisfy — hard rule, do not override without approval

**The Learn-mode time slider exists to answer one question per era: "what did the world look like
then?" That breaks into exactly three promises, and every era owes all three. The rules that follow
this section are the machinery for each; this section is what they are FOR, so a future change can be
judged against the goal and not only against the letter of a check.**

| # | Goal | What it means | Guarded by |
|---|------|---------------|-----------|
| **1** | **The natural world is the SAME in every era** | Coastlines, islands and landmasses are physical geography, not history. They must be byte-identical across all 21 eras, and land no polity claims must still LOOK like land. | `restore-era-geometry.mjs --check`, `check-era-landmass.mjs`, and the basemap layer in `HistoricalMap.tsx` |
| **2** | **The polity is the one that was there, under the name it actually bore — and its borders are the ones accepted for THAT date** | **Confirm the NAME first**, then the extent. Which polity held which ground, called what it was called at that date. Modern borders are not the default and a modern name is not a safe label. | `check-era-anachronism.mjs` + `POLITY_EXISTENCE` / `POLITY_NAME_FOR_ERA` / `ERA_EXTENT_CAVEATS`, and sourced upstream adoption for geometry |
| **3** | **The flag is the one that flew at THAT date** | Every flag a polity's card shows must be a design that existed at the era's year — whether it comes from a curated image, a modern country's flag, or a ruler's flag. | `check-historical-flag-anachronism.mjs` (modern borrows) + `check-historical-flag-validity.mjs` (curated images) + `check-era-flag-explanations.mjs` |

### Work them in order — 1, then 2, then 3. Each answer is the input to the next.

**This order is not a preference, it is a dependency chain.** The land is the canvas; the polity is
what sits on it; the flag is what that polity flew. Answer them out of order and you will investigate
the wrong question with real diligence and get a confidently wrong result.

1. **Goal 1 first — settle the land.** Until the coastline is the imported one and land no polity
   claims still reads as land, nothing drawn on top can be judged: a polity that appears to end at
   the sea may simply be missing its neighbour. Goal 1 also **outranks goals 2 and 3 absolutely** —
   no amount of historical sourcing licenses moving a coastline. A wrong border is a claim someone
   can check; an invented coastline is invisible.
2. **Goal 2 second, and within it THE NAME COMES FIRST.** Before asking where a polity's borders ran
   or which flag it flew, establish **what polity this actually was at this date, and what it was
   correctly and commonly called then**. The name is not a caption — it is the identity that decides
   both remaining questions: *whose* borders you are checking, and *which* flag is even a candidate.
   Only once the name is confirmed does the extent question make sense (and where the extent is wrong
   and unsourceable, disclose it — never redraw).
3. **Goal 3 last — the flag follows from the identity.** Ask "what did *this* polity, at *this* date,
   fly?" A flag can only be judged once steps 1 and 2 have said which polity it belongs to. Goal 3
   also fails the most silently: a plausible flag decades out of period looks completely fine to
   everyone, including whoever shipped it. Both flag gates are therefore *deny-by-default* — an
   undated flag is refused, never allowed.

**A missing thing beats a wrong thing, at every step.** An unmapped region rendered as hatched land,
a polity with no flag and a dated explanation, and a disclosed "Dating" caveat are all correct
outcomes. Fabricating to fill a gap is not.

#### Why the name has to come first — every one of these was a name error before it was anything else

The 2026-08 audit found the pivot was almost always the label, and fixing the name changed what the
right answer to the flag question even was:

| era | dataset NAME | what it actually was | what the name error did downstream |
|---|---|---|---|
| 1700 | Austrian Empire | the **Habsburg Monarchy** (the empire was proclaimed 1804) | invited the Austrian Empire's flag question a century early |
| 1900 | Kingdom of Brazil | the **Old Republic** (the empire fell 1889) | made the imperial flag look like the right answer; the republican flag was correct |
| 1914 | Armenia, Azerbaijan, Georgia | **Russian governorates** | implied three states that could have flags; in truth the Russian flag flew |
| 1920 | Iraq | **Mandatory Mesopotamia** (the kingdom came 1921) | implied an Iraqi flag existed; the Union Jack flew |
| 1938 | Jordan | **Transjordan** (renamed 1949) | the name was wrong but the 1928 flag survived the correction — proof the two questions are separate |
| 1920–60 | Rwanda, Burundi | one territory, **Ruanda-Urundi** | two independent states implied where one Belgian territory existed |
| 1900 | Kingdom of Hawaii | the **Territory of Hawaii** (annexed 1898) | same flag, different polity — only the name was wrong |

So: confirm the name, and the border and flag investigations start from the right polity. Skip it,
and both inherit the error.

**Goal 2 is a LABELLING problem before it is a geometry problem.** Nearly every "this era is wrong"
finding is fixed by a display-name remap or a disclosed caveat, never by redrawing.

### Auditing an era

**Start with the names.** `node scripts/audit-era-names.mjs [eraId]` is the goal-2 step-one
worksheet: it prints what the panel SHOWS for every polity and flags the ones that need a
decision — mojibake, dataset typos, a leaked ruler tag ("Algeria (France)"), a dated exonym
("Manchu Empire" for the Qing), inconsistent capitalisation of one polity across eras, and any
present-day country name in a pre-1880 era. `NAME_CONFIRMED` inside it is a LEDGER, not an
exemption list: each row records a name checked against a source and found period-correct, with
the polity it refers to, so the next pass inherits the verification instead of repeating it.
Adding a row means "I checked this"; anything uncertain stays flagged.

Then `node scripts/audit-era-polities.mjs <eraId>` prints every polity in one era with its display name,
its existence verdict, and which layer resolved its flag — the worksheet for checking all three goals
on a single era, in that order: the name column first, then existence, then the flag. `--gaps`
narrows it to rows that still need work; `--summary` gives one line per era.

### Rules

1. **Work 1 → 2 → 3, and confirm the polity's name before its border or its flag.** A flag or border
   verified against the wrong identity is worse than an unverified one, because it looks checked.
2. **Never satisfy one goal by breaking another.** In particular: never fill a goal-2 coverage gap by
   inventing a polity, and never fix a goal-3 blank by showing a flag from the wrong date.
3. **Every fix must be checkable by someone who was not there.** That means a source URL in the data
   (`POLITY_EXISTENCE.source`, `HISTORICAL_FLAG_VALIDITY.source`, `era-flag-sources.json`,
   `era-gap-fill.json`), not a note in a PR description.
4. **When you fix one polity, sweep the class.** Every finding in this feature has turned out to be
   systematic — one ungated flag image meant 68 wrong renders, one name-only scan meant seven wrong
   capital badges. After any era fix, re-run the audit across ALL eras before calling it done.
5. **Verify in the running app** (the mandatory visual-verification rule applies), in the same order:
   open the era you changed and confirm the coastline is intact (goal 1), then that the polity's NAME
   and note are right for the date (goal 2), then that the flag or its dated explanation follows from
   that identity (goal 3).

## A curated historical flag is an image with a DATE — gate it, or it will fly in the wrong century — hard rule, do not override without approval

**Every curated flag image an era map can show — `PolityInfo.flag`, whether reached from the polity's
own registry entry, an alias, or a ruler — MUST carry a sourced from/to window in
`src/data/historicalFlagValidity.ts`, and MUST pass `curatedFlagValidInEra()` for the era it is shown
in. A file under `public/historical-flags/` is not safer than a modern flag; it is an image with a
date, and without a gate it will be shown in every era whose GeoJSON happens to carry that polity's
NAME.**

### Why this rule exists

`flagExistedInEra()` had gated the four resolution layers that borrow a MODERN country's flag since
the 1914-South-Africa bug. Layer 1 — the curated image — was never gated at all, because a
hand-picked historical file *felt* safe. Measured on 2026-08, that shipped **68 anachronistic flag
renders across 13 eras**, including:

* the **1889 Qing yellow dragon banner over the 1700 map** — imperial China had no national flag at
  all until the triangular banner of 1862;
* the **1816 arms of the United Kingdom of Portugal, Brazil and the Algarves on Angola in 1900,
  1914, 1920, 1960 AND 1994**;
* **ten Malay state flags on the 1815 map** (Johor 1871, Kedah 1912, Kelantan 1923, Negeri Sembilan
  1895, Pahang 1903, Perak 1879, Perlis 1870, Selangor 1965, Terengganu 1953) — bundled on the
  reasoning, written into the download script, that a modern state flag "directly descends from the
  historical sultanate standard". That is precisely the reasoning this repo rejects everywhere else;
* Brunei's pre-1906 plain yellow flag from **1500 through 1994**; the 1855 Siamese white-elephant
  flag in **1815** and in **1920**; the double-headed imperial eagle in **1200**; St George's Cross
  over England in **1000**; the 1785 Spanish royal ensign on the **1994** map.

Four more entries pointed at files that **were never bundled at all** (`milan.png`, `belgium.png`,
`germany-imperial.png`, `poland-1919.svg`), so seven polities rendered a broken image while the
coverage tracker counted them as covered.

### Rules

1. **A flag path with no window is REFUSED in every era.** Deny-by-default, exactly like a country
   with no `FLAG_ADOPTION_YEAR`. Never "temporarily" exempt a path.
2. **Never widen a window to make the check pass.** If a flag trips the gate, the flag is from the
   wrong century: bundle the polity's own period flag, or withhold it with a sourced
   `noFlagReason`. Widening is the flag-validity equivalent of moving `BASELINE_REF`.
3. **Every window carries a `source` and a `design` line.** `design` says what the image actually is,
   including any gap inside the window (the Bourbon white flag: 1590–1790 and 1814–1830) — the panel
   renders it verbatim when it refuses a flag, so it must read as an explanation, not a label.
4. **Prefer the later start and the earlier end** when a date is disputed. Over-blocking loses a flag
   and says why; under-blocking ships a wrong flag silently.
5. **A new era flag is bundled through `scripts/download-era-flags.mjs`**, with its Commons filename,
   fetch date and sha256 recorded in `scripts/data/era-flag-sources.json`. Never hand-drop a file into
   `public/historical-flags/`, and never generate or approximate one — the "never invent flag content"
   rule is absolute here too.
6. **A colony that flew its ruler's flag uses `PolityInfo.ruler`, never a bare alias.** `ruler` makes
   the panel caption it ("Flew the flag of Portugal — it had no national flag of its own at this
   date") and fills the "Ruled by" row. Routing a colony through `MODERN_NAME_ALIASES` to its ruling
   power instead shows the ruler's flag with NO caption, which implies the colony had that flag as its
   own — the thing the historical-era flag rule forbids. Set `ruler` when the dataset's `SUBJECTO` is
   silent or self-referential (1920 and 1960 Angola and Mozambique are their own `SUBJECTO` though
   both were Portuguese provinces).
7. **A colony must never carry its RULER's flag on its own entry.** Put the flag there and
   layer 1 resolves it, so `flagIsRulers` is never set and the panel shows it with NO caption —
   which tells the user the flag was the colony's own. Use `PolityInfo.ruler` or `ERA_RULER`
   instead and the panel captions it. `check-historical-flag-validity.mjs` fails the build on
   any entry whose own flag is identical to its era ruler's; the 2026-08-07 name pass found
   eight (New France, the Viceroyalty of Peru, 1880 Mozambique, Italian Libya, Italian
   Somaliland in two eras, Italian Ethiopia).
8. **A curated ruler outranks the modern-name layer.** `curatedRulerFor()` is checked BEFORE
   the modern-country fallback, because a declared ruler is a statement that the polity had no
   flag of its own — otherwise the modern layer answers first and hands it a successor's flag,
   uncaptioned. That is not hypothetical: the 1945 occupation zones resolved to Germany's
   black-red-gold, which the Allies had **not** restored (abolished 1935, readopted 1949), so
   the 1949 West German flag flew over the 1945 map.
9. **`ERA_OVERRIDES` must have no duplicate key within one era's map.** It is built from an array of
   pairs, so a repeated key silently keeps only the LAST — the same shadowing bug the registry rule
   already forbids. The 2026-08 audit found **24** shadowed entries this way (ad800, ad1500, ad1600,
   ad1700, ad1945), including one labelled "duplicate entry for emphasis", and a corrected ad1500
   France entry that had no effect because a later duplicate re-asserted the wrong flag.
10. **Verify in the running app** (the mandatory visual-verification rule applies): open 1700 and
   confirm the Qing Empire explains that China had no flag yet rather than flying the 1889 banner;
   open 1900 Angola and confirm Portugal's 1830 monarchy flag with the "Flew the flag of Portugal"
   caption; open 1994 and confirm Spain shows its present flag.

### Enforcement

`scripts/check-historical-flag-validity.mjs` (`npm run eras:check-validity`, in `npm run flags:check`
and the `check-era-maps` CI job) **fails the build** on: a referenced flag file that is not bundled; a
referenced flag with no window; any (era, polity) pair that would render a curated flag outside its
window; and the gate being removed from `LearnPage`/`historicalEras`. `node scripts/download-era-flags.mjs
--check` re-verifies every bundled SVG against its recorded sha256, so a silently swapped file fails
too. The duplicate-key guard for `ERA_OVERRIDES` lives in `check-era-flag-explanations.mjs` alongside
the registry one.

## Borders between polities change between eras; a landmass's outline does not — hard rule, do not override without approval

> **Borders between polities change between eras; a landmass's outline does not.**

**The Learn-mode historical era maps (`public/historical-maps/world_*.geojson`) are an IMPORTED
dataset, not an editable one. Where one polity ends and the next begins is a historical question and
legitimately differs from era to era. Where the LAND ends and the OCEAN begins is not a historical
question, and must be byte-for-byte identical in every era, forever. No task, instruction, ticket,
review comment, or apparent inaccuracy is a licence to move a coastline coordinate.**

This is the geographic form of "never generate flag SVG content" and "never fabricate a population."
An invented coastline is worse than a missing polity, because nobody can tell it is wrong by looking
at it — it just quietly ships.

### Why this rule exists

Reported by the owner with a screenshot, 2026-08 (PRs #894–#902). A task to make era borders
period-accurate — a legitimate goal, prompted by the Iberian Union being drawn as nothing more than
modern Spain plus modern Portugal — was carried out by **editing the geometry**:

* **`world_1600` "Spain" and "Portugal" were replaced by hand-drawn boxes** — an 8-vertex octagon and
  a 6-vertex hexagon in place of the imported 175- and 72-vertex outlines, **66% and 81% too large**
  (815,863 km² vs 490,444; 169,000 vs 93,135), spilling across the Pyrenees into France and out into
  the Bay of Biscay.
* **`world_1600` "Sicily", "Sardinia" and "Đại Việt" were deleted outright** — both islands and the
  whole of Vietnam rendered as open ocean. The Vietnam deletion (276,091 km²) was never noticed.
* **A "merge fragmented territories" pass rewrote coordinates wholesale** by unioning parts through a
  boolean-geometry library instead of re-grouping the features, **resampling 104 rings across 12 of
  the 21 era files** — Korea's main peninsula lost 61% of its detail (765 → 296 points), along with
  rings of Tsardom of Muscovy, Denmark-Norway, Sweden, the Russian Empire, Italy and the United States.

Every one of those passed the checks that existed: rings were closed, in range, and smaller than half
the sphere. Three separate follow-up PRs tried to patch the symptom and made it worse.

### Geometry vs labelling — where the line is

Most "this era is historically wrong" tasks are **labelling** tasks, and labelling is always the
correct place to fix them.

| Change | Kind | Allowed? |
|---|---|---|
| A polity's name, note, population, continent, flag, era registry entry | labelling | **Yes** — this is where historical corrections belong |
| Two polities in personal/dynastic union shown as separate polygons with notes explaining the union | labelling | **Yes** — this is how the Iberian Union (1580–1640) is correctly modelled: two crowns, two administrations, two colonial empires, one monarch |
| Which polity a polygon is attributed to | labelling | **Yes**, if sourced |
| Moving, adding, deleting or resampling any coordinate | **geometry** | **No** — see the allowlist below |
| Deleting a polity's polygon to say it "didn't exist yet" | **geometry** | **No** — leave the land unclaimed instead; the coast must stay |

**A task phrased as "make the borders accurate" is NEVER self-authorising for geometry edits.** If a
border genuinely needs to move, that requires a re-import (see the escape hatch), not an edit.

### The allowlist — the ONLY permitted operations on era geometry

This is an **allowlist, not a denylist**: an operation that is not on this list is forbidden, whether
or not it is named below.

1. **Re-grouping features without touching rings** — folding a polity's several features into one
   MultiPolygon, or splitting one into several, where every ring is carried across **unchanged,
   coordinate for coordinate**.
2. **Dropping a ring that is an exact duplicate** of another ring already present (these
   double-count area — the Qatar, Trucial Oman and Guanches cases).
3. **Dropping a ring that encloses nothing** — fewer than 4 positions, fewer than 3 distinct
   positions, or zero planar area (see `repair-historical-maps.mjs`; a wrongly-wound zero-width
   sliver is read by d3-geo as covering the entire globe).
4. **Restoring geometry from the authoritative import** via `scripts/restore-era-geometry.mjs`.
5. **Adopting a SOURCED polity polygon VERBATIM** — see "Sourced polity-border changes" below.
   Every coordinate must come from the source unmodified; the moment you adjust one, this
   stops being an adoption and becomes a redraw.

Everything else is forbidden. Named explicitly, because each has been tried or is tempting:
hand-writing or eyeballing coordinates; boolean union/intersection/difference (`polygon-clipping`,
turf, JTS, mapshaper, …); simplification of any kind (Douglas-Peucker, Visvalingam, `toposimplify`);
smoothing, snapping or re-projecting; changing coordinate precision; deleting a landmass; "fixing" a
polygon by redrawing it; generating a polygon from a bounding box, a buffer, a convex hull, or a
description of a country's shape; copying a modern country's outline onto a historical polity; and
asking a model to output coordinates.

**Coordinate precision is already settled and must not be revisited:** the maps are stored at 4 dp
(~11 m, ~3,750× finer than a pixel at max zoom) by `optimize-historical-maps.mjs`, which is already
applied — `node scripts/optimize-historical-maps.mjs --check` is a no-op and must stay one. Re-running
it must never change a file. If it wants to, something has gone wrong upstream; investigate, do not
commit the result.

### The coastline must be RENDERED, not merely stored — unmapped land is land, never ocean

**Restoring the data is only half of this rule. The era files carry POLITIES, not land — so a
region that was genuinely unclaimed at a given date has no feature at all, and a renderer that
draws only the era's features paints it with nothing. Against an ocean-coloured sphere, that
reads to the user as SEA. The coastline must therefore be DRAWN from a basemap underneath every
era, so that land no polity covers is still visibly land.**

This shipped and was reported (2026-08), immediately after the data restore above: on the 500 BC
map the Balkans north of the Greek city-states carried no polity, so the sea appeared to run from
the Adriatic to the Aegean and **Greece looked like an island**. Italy was severed below the Po
and Jutland was open water. Nothing was wrong with the data — `world_bc500.geojson` matched the
import exactly, and both era checks passed. The map was lying anyway. The same hole put the Indus
basin (600), interior India (bc500), Chukotka (1938) and Novaya Zemlya (1815) out to sea.

**The rule:** `HistoricalMap.tsx` renders `public/countries-50m.json` — merged to a single land
geometry, so no modern internal border shows through — as a base layer beneath the era's
polities, hatched with the existing "no data" pattern that already marks unmapped polities. Every
era draws on that same one object, which makes the invariant **structural rather than merely
checked**: the coastline cannot vary by period however the era files change, and it is the same
topology `WorldProgressMap` draws, so the two maps can never disagree about where the coast is.

1. **Never remove the base land layer**, and never make it conditional on the era, the theme, the
   zoom level, or a feature flag. If it fails to load the polities must still render — but land
   must never be silently reduced to the ocean fill.
2. **Unmapped land must stay visually DISTINCT from both ocean and from a real polity.** Painting
   it like a country implies data we do not have (17–34% of the land in the older eras is
   unmapped); painting it like sea is the bug above. The hatch does both jobs — keep it.
3. **The layer is decorative and MUST carry `pointerEvents="none"`**, exactly like the city-marker
   overlay: it sits under the interactive polity paths and must never swallow a click meant for
   one.
4. **This is why `check-era-landmass.mjs` only flags land-claiming-sea and not sea-claiming-land.**
   Unclaimed land is a legitimate DATA state; it is the RENDERER's job to keep it looking like
   land. Do not "fix" a gap by inventing a polity to fill it — that would fabricate history to
   patch a display bug.
5. **Verify in the running app** (the mandatory visual-verification rule applies): open **500 BC**
   and confirm Greece is a peninsula continuous with the Balkans, not an island; open **600** and
   confirm the Indus basin and interior Asia read as land.

### …but the coastline layer must never paint a SHADOW along a polity's own coast

**The base land layer and the era polygons draw the same coast at different resolutions, so the
land layer shows through as a hatched sliver wherever the era's outline cuts a corner. That sliver
is the "no polity here" fill, so a polity ends up wearing a ragged shadow of unclaimed land along
its own coastline — and because the base layer is `pointerEvents="none"`, that shadow cannot be
clicked either. It must be reconciled away, without moving one coordinate of either dataset.**

This shipped and was reported (2026-08), with the 1945 Philippines: every island had a dark fringe
hugging one side of it, which the owner read as "wrong, unselectable territories that look like a
shadow". It is a rendering artifact, not missing data: the era file draws the archipelago in 279
points where Natural Earth 50m uses 1,238. Measured at the projection's own scale, ~1.7% of land
pixels are covered by no feature in any era, ~75% of that within ONE map unit of a polity and 84%
within two, while land the era file genuinely does not carry sits far outside that.

**The rule:** `HistoricalMap.tsx` grows each era polygon by `COASTLINE_MATCH_TOLERANCE` map units
(`growProjectedPath`) and paints that band in the polity's own fill, UNDER the polities and
**clipped to the basemap's land**. Land within the tolerance of a polity therefore reads as that
polity; land beyond it keeps the hatch.

1. **The band is a RENDERING reconciliation and must never become a data one.** It runs on the
   projected path string, is never stored, hit-tested, exported or drawn as a border, and the
   polity paths that are rendered, selected and measured still come from untouched coordinates.
   Growing, simplifying or snapping anything in `public/historical-maps/**` to make coasts line up
   is the fabrication the rule above forbids — `restore-era-geometry.mjs --check` will fail, and
   it is right to.
2. **The band MUST stay clipped to the land layer.** Unclipped, growing a polity paints sea, which
   is the one thing `check-era-landmass.mjs` exists to prevent. The clip makes that structural.
3. **The tolerance is in USER space, never screen pixels.** The mismatch it hides is a fixed
   distance on the ground; a screen-space fix (a `vectorEffect="non-scaling-stroke"`) unravels the
   moment the user zooms in, which is exactly how the bug was reported. Keep it small — it is a
   coastline tolerance, not a licence to swallow a neighbouring island the era leaves unclaimed.
4. **Never implement the band as a stroke, and never as stamped `<use>` copies.** Both were
   measured on the heaviest era (500 BC): a fat stroke cost 1.88 s of main-thread time over five
   zoom steps against 0.37 s without the band, and nine `<use>` stamps cost 4.9 s to drag-pan a
   route that costs 0.67 s without it (`shape-rendering` made no difference). Pre-growing once per
   era leaves a single ordinary fill, which is what the current code does.
5. **Unmapped land must still be unmapped.** Confirm the reconciliation only ate slivers: the
   hatched area of every era must be essentially unchanged (measured across all 21 eras it moves
   by ≤0.6%, except 1945/1960 where the entire residue WAS mismatch), and 500 BC must still show
   its large hatched regions.
6. **Verify in the running app** (the mandatory visual-verification rule applies): open **1945**,
   select the **Philippines** and zoom in — the islands fill their true coastlines with no dark
   fringe, while the islets the era file omits stay hatched — then open **500 BC** and confirm
   Greece is still a peninsula and the unmapped regions are still hatched.

### Sourced polity-border changes ARE allowed — redrawing them by hand is not

**Where a polity's border sits, and which polity holds a piece of land, are HISTORICAL
questions with real answers. Changing them is legitimate when the change comes from an
authoritative source. What is forbidden is not "changing a border" — it is producing a
border from nothing.** A change qualifies only if every one of these holds:

1. **The geometry is adopted VERBATIM from a named source.** Copy the source's coordinates
   unmodified. No clipping, no unioning, no simplification, no smoothing, no interpolation,
   no "adjusting to fit" — the instant you edit a coordinate, the result is your drawing,
   not the source's, and Rule 1 of this section is broken. If a source's polygon does not
   fit the shape of the gap you wanted to fill, adopt it anyway and let paint order sort it
   out, or leave the gap.
2. **The source is authoritative and citable** — the upstream historical-basemaps release,
   a published historical atlas with georeferenced boundaries, or an equivalent scholarly
   dataset. A model's output is NEVER a source. Neither is "it looks about right", another
   era's file, or a modern country's outline.
3. **Provenance is recorded in the repository**, not just in a PR description: the source
   URL, a content hash of the exact file adopted from, and the fetch date, so any adopted
   polygon can be traced back and re-verified later. `scripts/data/era-gap-fill.json` is
   that record for the upstream-adoption pass.
4. **It is generated, never hand-edited.** The adoption runs through a script
   (`scripts/build-era-gap-fill.mjs`) so it is reproducible and reviewable as a diff of
   inputs rather than of 4,000 coordinates. Never hand-edit an era GeoJSON.
5. **A sourced estimate is acceptable where it is honestly labelled as one.** Ancient
   borders are frontiers and spheres of influence, not surveyed lines; an authoritative
   dataset's best estimate is the right thing to show. What is never acceptable is OUR
   estimate.
6. **It must not change the coastline.** This is the absolute constraint and it outranks
   everything in this section: a sourced polity change may reattribute land between
   polities, but the outline where land meets sea is fixed. `check-era-landmass.mjs` still
   gates it, and an adopted polygon that reaches past the coast is rejected — adopt a
   different source or leave the gap. **No amount of sourcing licenses moving a coastline.**
7. **Adopted polygons must never steal attribution from a finer existing polity.** Our
   import names more polities than the current upstream release does in some eras (bc500
   has Athens, Thebes, Sparta + Corinth where upstream has one "Greek city-states"). An
   adopted polygon is tagged `GAPFILL: 1` and always painted UNDERNEATH the era's own
   features, so it can only ever fill space nothing else claims. Never let a coarse
   adoption overwrite a specific one.

**Filling a coverage gap by inventing a polity remains forbidden.** If no source attributes
a piece of land, it stays unattributed and renders as hatched unmapped land — which is what
it honestly is. An unattributed region is not a bug; a fabricated one is.

### Wholesale re-import — the heavier escape hatch, and its hard gates

Replacing an era file wholesale — as opposed to adopting individual sourced polygons per the
section above — resets the baseline every other guard is measured against, so it carries heavier
gates. It requires **all** of the following, in the same change:

1. **Explicit owner approval, obtained beforehand** — this is not a judgement call an agent makes.
2. The new data comes from a **named, authoritative, dated source**, recorded in the PR.
3. `BASELINE_REF` in `restore-era-geometry.mjs` is moved to the re-import commit, **and** the PR says
   which polities changed and why.
4. **Every affected era is visually verified in the running app** before the move (the mandatory
   visual-verification rule applies), coastline by coastline.

**Moving `BASELINE_REF` for any other reason — to make a red check green, to "adopt" an edit already
made, to unblock unrelated work — is itself a violation of this rule**, and is the single loophole
most likely to be reached for. The baseline records what was imported; it is not a checkpoint to be
advanced when the data drifts.

### Verification

**Verify in the running app** (the mandatory visual-verification rule applies) whenever any era file
changes: open the affected era and confirm the coastline is intact. For 1600 specifically — the era
that shipped broken — confirm Iberia is peninsula-shaped with **no straight edges**, that **Sicily and
Sardinia are present**, and that **Vietnam is land**.

### Enforcement

Two checks, both in the `check-era-maps` job of the `flag-integrity` workflow. That job runs on
**Node 24** — `check-historical-maps.mjs` imports `historicalEras.ts` directly and needs native
TypeScript type-stripping (22.18+); on Node 20 it dies with `ERR_UNKNOWN_FILE_EXTENSION` before
running a single assertion. `restore-era-geometry.mjs --check` is also in `npm run flags:check`;
the landmass raster is **CI-only**, because it takes minutes and would make the local gate
unusable — that split is deliberate and is listed by `check-ci-coverage.mjs` on every run.

* **`scripts/restore-era-geometry.mjs --check` (`npm run maps:check-geometry`) — the primary guard.**
  It pins every era map to `BASELINE_REF` and **fails the build** on any drift, catching deletion,
  fabrication, resampling and precision changes alike, exactly and cheaply (~9 s). Rings are compared
  canonically (rotation-, direction- and serialisation-independent), so a pure re-serialisation is
  correctly seen as no change. It needs git history, so its CI job checks out with `fetch-depth: 0`.
  Run without `--check` it restores the imported geometry.
* **`scripts/check-era-landmass.mjs` (`npm run maps:check-landmass`) — the backstop** for geometry
  with no baseline to compare against (a newly added era file, or an approved re-import). It
  rasterises every era at 0.5° against the app's own Natural Earth basemap and **fails the build** if
  a polygon claims a cluster of open sea. It is deliberately asymmetric — it never flags *unclaimed
  land*, because large regions genuinely had no polity at many dates, and burying a real finding under
  hundreds of false ones would kill the check. Thresholds were **measured against both cases, not
  guessed**: re-injecting the fabricated Iberian boxes yields a 27-cell cluster; correct geometry never
  exceeds 1 cell in any era, anywhere. `MIN_CLUSTER` sits at 8, in the middle of that gap.

**None of the following is ever an acceptable response to one of these checks failing:** raising
`MIN_CLUSTER`; coarsening `GRID_DEG` (1° is NOT enough — at that size the fabricated boxes hid inside
the coastal tolerance and passed); adding an `ALLOWED_CLAIMS` / `ALLOWED_GAPS` entry to silence a real
redraw; moving `BASELINE_REF`; removing either check from `flags:check` or the workflow (including
"it's slow" — the landmass pass takes minutes by design); deleting or renaming the scripts; or marking
the era file generated/ignored. **If a check fails, the geometry is wrong. Fix the geometry.**

### Composite states and personal unions — one polity may span several polygons

**A polity that held several territories under one crown must be shown as ONE polity covering
all of them.** The dataset's own convention is a single feature per union — Kalmar Union,
Poland-Lithuania, Denmark-Norway, Sweden–Norway, Austro-Hungarian Empire are each one feature.
Where the import instead splits a union across features, group them at DISPLAY time; never merge
the polygons.

The Iberian Union (1580–1640) is the case that shipped wrong: 1600's Spain and Portugal are two
features, so the union appeared nowhere and selecting Iberia highlighted only half of it. The fix
maps both NAMEs to "Iberian Union" in `POLITY_NAME_FOR_ERA` and highlights by that shared key
(`groupKeyOf` in `HistoricalMap`), so the whole peninsula lights up as one polity while the two
polygons — and the internal border, which is historically right, since the Statute of Tomar left
Portugal its own laws, Cortes and colonial administration — stay exactly as imported.

1. **Group by display name, never by editing geometry or the dataset NAME.** The raw NAME stays
   the selection key; only what the user SEES is grouped.
2. **The flag grid must key on the shown name**, or a grouped union occupies one card per member.
3. **`polityInfo` resolves the REMAPPED name first**, so a union's own note and population win
   over an entry filed under a member's name.
4. **Only group a genuine composite state**, sourced. Two neighbours sharing a ruler's *name* are
   not a union; a personal union with separate administrations is (and the note must say so).

### A blank NAME is not an absent polity

Some upstream features carry a NAME of pure whitespace while their own `ABBREVN` / `SUBJECTO` /
`PARTOF` hold the real name — 1815's Netherlands is `NAME: "       "` with `ABBREVN: "Netherlands"`
and `SUBJECTO: "United Kingdom of Netherlands"`. Read literally, that polity renders as anonymous
"no data" hatch and cannot be selected at all, though the dataset plainly knows what it is.
`polityFeatureName()` in `HistoricalMap.tsx` falls back to those fields, recovering 13 such
polities across the eras without inventing anything.

Never extend that fallback to a name from outside the feature, and keep `NOT_A_POLITY` excluding
"Antarctica" — the Antarctic hard rule forbids the continent becoming a territory in the data
model, however it is labelled upstream.

### Temporal accuracy — a polity must belong to the date it is shown on

**Fidelity to the import is not accuracy. The import can be wrong for its own date, and it is:
the upstream dataset labels the 1945 subcontinent "India", "Pakistan" and "Bangladesh" though
partition was 1947 and Bangladesh 1971, draws one undivided "Vietnam" in 1960 though the country
was split at the 17th parallel from 1954, and puts "USSR" on the 1920 map two years before the
union was founded. A polity on the wrong map is the temporal twin of an anachronistic flag.**

`src/data/polityExistence.ts` is the authority: sourced existence windows (`POLITY_EXISTENCE`),
each with an authoritative citation, plus `ERA_EXTENT_CAVEATS` for anachronisms we cannot fix.

### The two remedies, in order of preference

1. **Relabel — the free fix.** When the territory is roughly right and only the NAME is wrong for
   the date, add an era-specific display remap to `POLITY_NAME_FOR_ERA` in `historicalEras.ts`.
   This changes what the panel SHOWS, never the dataset NAME (which stays the selection and
   registry key) and never the geometry. 1920's "Iran" shows as **Persia** (renamed 1935), 1945's
   "Zaire" as **Belgian Congo** (Zaire only 1971–97), 800's "Ghana" as the **Ghana Empire** (an
   entirely different polity from the modern state that took the name in 1957). Prefer this
   always: it costs nothing and removes the falsehood outright.
2. **Disclose — when the borders are wrong too.** When the EXTENT is also anachronistic,
   relabelling is not enough and the correct boundary cannot be sourced. Add an
   `ERA_EXTENT_CAVEATS` entry; the panel then shows a **Dating** row saying exactly what is wrong
   and what was actually there. **This is the honest outcome, not a failure** — the same
   discipline as "a missing flag beats a wrong one".

### Rules

1. **Never redraw a border to fix a date.** Inventing the 1945 British India boundary to remove
   the partition line would be fabricated geography — worse than the disclosed inaccuracy. This is
   the landmass rule's sibling and is equally absolute.
2. **Never add or edit a `POLITY_EXISTENCE` window without an authoritative source**, and never
   delete or widen one to silence a failure. If the check fires, the map is wrong, not the table.
3. **A polity absent from the table is UNCHECKED, never assumed correct.** Coverage is a curated,
   growing set focused on modern-era states, whose names are unambiguous and whose errors are
   glaring. Ancient polities have contested dates and obscure names a name-keyed table cannot
   resolve safely — guessing at them would produce false failures and get the check weakened.
   Growing the table is how coverage grows; padding it with guesses is not.
4. **A place name that outlived a state is not automatically an error.** "Ghana" in 800 is the
   Ghana Empire; "Congo" in 1600 is the Kingdom of Kongo; "Yemen" long predates the 1990
   unification. Resolve these by remapping the display name for that era, never by assuming the
   modern state's dates apply.
5. **A RENAME is an anachronism too — not just a state that did not exist yet.** The table was
   seeded with statehood cases (Bangladesh 1971, the USSR 1922), so every country that merely
   changed its NAME sailed straight through: the 1945 and 1960 maps read "Burkina Faso" (Upper
   Volta until 1984), "Benin" (Dahomey until 1975), "Türkiye" (the English name dates from the
   2022 UN request), "Mali" (French Sudan), "Central African Republic" (Ubangi-Shari); "Tanzania,
   United Republic of" ran from 1920, and Botswana/Lesotho/Malawi/Zambia/Guyana/Belize/Equatorial
   Guinea/Guinea-Bissau/Djibouti/UAE/Western Sahara/Papua New Guinea across up to six eras each.
   Every one is fixed by a `POLITY_NAME_FOR_ERA` remap plus a sourced `POLITY_EXISTENCE` window;
   when you touch an era file or add a country, ask "did this name exist at this date?", not only
   "did this state exist?".
6. **Only key `POLITY_EXISTENCE` on a name ONE polity has ever borne.** The table is keyed by raw
   dataset NAME, so a name two polities shared cannot be windowed safely: "Mali" is the medieval
   empire and the 1960 republic, "Belize" the 1700 logwood settlement and the modern state, "Samoa"
   the 19th-century kingdom and the post-1997 name. Either remap the older era's display name so
   the two are distinguishable (as `Benin` → **Kingdom of Benin** and `Somalia` → **Somali
   sultanates** now do), or leave the name out of the table — never add a window that would flag
   the older, legitimate polity.
7. **A remapped display name needs its own entry, or the panel describes the wrong thing.**
   `polityInfo` resolves the SHOWN name before the raw NAME, so a relabelled polity inherits
   whatever the shown name means elsewhere. Remapping 1945 `Benin` → "Dahomey" without an entry
   showed the **Kingdom of Benin**'s note under the French colony; `Türkiye` → "Turkey" hit the
   registry's Ottoman `Turkey` entry, which is `noFlag` and would have **removed the Turkish flag
   from the 1945 and 1960 maps**. Period names shared across every era that uses them live in
   `POLITY_REGISTRY` (British Honduras, Basutoland, Spanish Guinea, …); ones that differ by era
   (Upper Volta 1945 vs 1960) go in `ERA_OVERRIDES`. After adding any remap, check what the panel
   actually resolves — name, note AND flag.
8. **Verify in the running app** (the mandatory visual-verification rule applies): open 1945 and
   confirm India/Pakistan/Bangladesh each show a **Dating** row explaining the partition, that
   Turkey still shows its flag, and that Upper Volta / Dahomey / Netherlands New Guinea carry
   period notes; open 1920 and confirm Iran shows as **Persia**.

### Enforcement

`scripts/check-era-anachronism.mjs` (`npm run maps:check-anachronism`, in `npm run flags:check`
and the `check-era-maps` CI job) applies the era display remap to every polity NAME in every era
file and **fails the build** on any polity outside its sourced window that is not disclosed in
`ERA_EXTENT_CAVEATS`. It prints the disclosed ones on every run, so known inaccuracies stay
visible rather than fading into the background. Never weaken it; fix the label or add the
disclosure.

## A polity's continent is where its LAND is — and "Other" is banned — hard rule, do not override without approval

**The Learn-mode flag grid groups an era's polities by continent. That continent is a fact about
where the polity's own land sits, and NOTHING else. It must never be inherited from whichever
country the polity borrows a FLAG from, and no polity may ever be filed under "Other".**

### Why this rule exists

Both halves shipped and were reported by the owner with screenshots, 2026-08:

1. **The ruler's continent, not the polity's.** `selectionFromPolityName` resolved the continent
   through the same layers that resolve the FLAG: registry entry, then the alias/modern-country the
   flag was borrowed from. `MODERN_NAME_ALIASES` routes a colony to its **ruling power** so it flies
   the right flag — "Togoland" → German Empire, "British East Africa" → United Kingdom — so the
   colony inherited **Europe**. The 1914 grid's EUROPE group held **Togoland, Kamerun, German
   South-West Africa, German East Africa, Anglo-Egyptian Sudan, British East Africa, Southern
   Rhodesia and Spanish Morocco** ("togoland is not in europe. that's a massive issue!"). The same
   path put 1700's Virginia, Massachusetts Bay, South Carolina, Florida, Cayenne, Surinam, Essequibo
   and Dutch Brazil in Europe, and 1945's Tonkin, Cyrenaica, Tripolitania and Fezzan.
2. **"Other".** A polity with no region label, or one whose label `topLevelContinent()` did not
   recognise ("Australia", "Pacific", "Arctic", "Sahara", "Russia", "Southern Hemisphere"), fell into
   an **"OTHER (27)"** heading holding Lagos, Accra, Calabar, Zululand, Dahomey, Natal, Queensland,
   New South Wales, Victoria, Fiji, Tonga, Greenland and British Guiana. Measured across all eras,
   **518 polity/era rows** had no continent at all. **Every territory is on a continent — "Other" is
   a classification failure, not a category.**

Auditing the same class against the geometry found a third seam: **curated labels that name the
wrong place entirely**, almost always a NAME COLLISION (the Misiones bug, in region form). The
dataset's `Jukun` is the Djugun of Broome, not the Jukun of the Nigerian Benue; `Maya` is the Maia of
the Gascoyne coast, not the Mesoamerican Maya; `Minang` is the Noongar Minang of King George Sound,
not the Minangkabau of Sumatra; `Saba` is the Sabaean kingdom of Yemen, not the Dutch island;
`Peshemegs` is the Pechenegs of the Pontic steppe, not a Canadian woodland people; `Islamic
city-states` is the Swahili coast, not the Deccan. Each carried a note describing the wrong people.

### Rules

1. **`polityContinent()` in `historicalEras.ts` is the ONLY way to resolve a polity's continent**, and
   it must never consult a flag-resolution layer. Never reintroduce `continent = aliasInfo.continent`
   or `continent = country.continent` into `selectionFromPolityName`. A flag is borrowed; a continent
   is not.
2. **The fallback is MEASURED, never written.** `src/data/polityContinents.ts` is generated by
   `scripts/build-polity-continents.mjs`, which reads each polity's own polygons out of
   `public/historical-maps/*.geojson` and classifies them against the app's own bundled Natural Earth
   basemap (`public/countries-50m.json`). Re-run it — never hand-edit the file — whenever an era file
   or a curated label changes. The generator only fills gaps: a curated `continent` always wins,
   because those labels are finer-grained ("Eurasian Steppe", "Mesoamerica", "Levant") and drive the
   detail panel's Region row.
3. **"Other" is banned outright.** A new region label added to `POLITY_REGISTRY` / `ERA_OVERRIDES`
   must be given a home in `classifyRegion()` (`src/lib/flagList.ts`) in the SAME change. A composite
   label lists its regions **primary first** ("Western Asia / SE Europe / North Africa") and the
   heading comes from the first segment that names a continent — never widen a match so a trailing
   region wins, which is what filed the Ottoman Empire, Alexander's empire and the Iberian Union
   under Africa.
4. **A region label must name where the polity IS, not who ruled it or what era it belongs to.**
   "Russia", "Arctic" and "Southern Hemisphere" are not regions this grid can group by. When a
   curated label disagrees with the land, the LABEL is wrong — suspect a name collision first, and
   check the note describes the same people the polygons do.
5. **Never move a coordinate to satisfy a continent.** This is the landmass rule's sibling and it is
   equally absolute: the geometry is the evidence, not the thing being fixed.
6. **The generator and the check must resolve a feature's name the way the APP does** — through
   `polityFeatureName()`'s NAME → SUBJECTO/PARTOF/ABBREVN fallback, not the raw `NAME`. Reading the
   raw field skipped the blank-NAME polities the app recovers (1815's `NAME: "       "` is the United
   Kingdom of the Netherlands) and let one of them reach the grid with no continent at all. If the two
   name resolutions drift, the check stops describing what the user sees.
7. **`NOT_A_POLITY` applies to a feature's direct NAME, not only to its fallback fields.** The 1945
   and 1960 files carry a feature literally named "Antarctica"; a fallback-only guard let it through
   and put an **Antarctica card in the flag grid** — the continent entering the territory data model,
   which the Antarctic hard rule forbids outright. It must render as unclaimed, neutral landmass.
8. **Verify in the running app** (the mandatory visual-verification rule applies): open **1914**,
   group the flag grid by continent, and confirm Togoland, Kamerun, German South-West Africa, German
   East Africa, Anglo-Egyptian Sudan, British East Africa, Southern Rhodesia and Spanish Morocco are
   all under **Africa** and none under Europe; then confirm **no "Other" heading exists in any era**
   (1945 and 1815 were the last two to have one, and a green check did not catch either — the check
   was reading raw NAMEs while the grid was showing resolved ones).

### Enforcement

`scripts/check-era-continents.mjs` (`npm run eras:check-continents`, in `npm run flags:check` and the
`check-era-maps` CI job — Node 24, because it loads `historicalEras.ts` directly) measures every
polity's land in every era and **fails the build** on either failure mode: a polity filed on a
continent it has **no land on at all**, or one that resolves to **"Other"** / no label. The
wrong-continent bar is deliberately "no land there at all" rather than "most of its land", so a
composite state that genuinely spans continents (the Russian Empire, Denmark with Greenland, the
Ottomans) may be filed under any continent it actually reaches; `acceptableContinents()` additionally
lets a genuinely transcontinental LABEL ("Eurasian Steppe", "Mediterranean") be satisfied by any of
the continents it spans. That list is for transcontinental regions only — never add a label to it to
silence a real mismatch, and never lower either bar. If the check fires, the label is wrong.

## A flagless polity must never be given a reason we invented — hard rule, do not override without approval

**When a Learn-mode historical polity shows no flag, the panel must say WHY only when the reason is
CURATED and SOURCED. Its fallback line may state only what is certainly true — that no period flag is
bundled — and must never assert a historical cause.** An invented explanation is the prose form of an
invented flag: it looks authoritative, it is wrong, and nobody can tell by looking.

### Why this rule exists

Reported by the owner with screenshots (2026-08). Selecting **Germany on the 1938 map** showed

> *No flag image — this polity predates modern flag design or none survives.*

directly beneath a note describing the flag Germany flew. Nazi Germany plainly HAD a national flag —
the app declines to display it, which is a fact about US, not about 1938. Selecting **Brazil on the
1900 map** showed the same line under a bare name with no note at all. The cause was structural, not a
typo: `PolityInfo.noFlag` is a boolean recording only THAT a flag is withheld, so `LearnPage` had one
hard-coded sentence for every flagless polity and asserted the antiquity reason for all of them —
1938's Netherlands and Belgium (whose present-day flags flew), the Kingdom of Hawaii (whose own note
described its flag), the Orange Free State, Nazi Germany. Auditing every era found the same line on
**over 2,700 polity slots**, 94 of them in 20th-century eras where it is plainly false.

### Rules

1. **`PolityInfo.noFlagReason` is the ONLY place a reason may come from.** It is one sourced sentence,
   rendered verbatim. Say what actually flew and why it is not shown ("the swastika banner, which this
   game does not display"; "a plain red flag — the green pentagram was added only in 1915"). Same
   sourcing discipline as every flag, anthem and population rule here: never invent, never guess.
2. **The fallback line must stay causeless.** It reads "No flag shown — no period-accurate flag for
   {polity} in {era} is bundled." Never reintroduce "predates modern flag design", "none survives", or
   any other phrasing that explains a blank the app cannot actually explain. A polity with no registry
   entry is missing DATA, not a claim about history — the causeless line is the honest output for it.
3. **Every deliberate suppression (`noFlag: true`) in an era from 1880 on MUST carry a
   `noFlagReason`.** From 1880 on essentially every polity on these maps is a state with a documented
   flag history, so "no flag" always has a specific, checkable reason. `noFlag` without a reason in
   those eras fails the build.
4. **Do not reach for `noFlag` when the flag is genuinely period-correct.** `noFlag` predates the
   `flagExistedInEra()` adoption-year gate and was used as a blunt instrument, withholding flags that
   unquestionably flew: the 1938 Netherlands, Belgium and Romania (their present-day tricolours),
   1900 Bulgaria (1879) and Tunisia (1831), 1938 Czechoslovakia and 1900 Ethiopia (whose period flags
   were already bundled for neighbouring eras). Check whether a bundled or era-legal flag exists
   BEFORE suppressing, and let the adoption-year gate do the refusing — its dated message
   ("adopted in 1959") is a real explanation and needs no `noFlagReason`.
5. **`POLITY_REGISTRY` must never have a duplicate key.** It is built from an array of pairs, so a
   repeated key silently keeps only the LAST one. This had happened 23 times: a second "Tibet" written
   for the medieval period shadowed the 20th-century entry, so the 1914 map described de-facto-
   independent Tibet as the Phagmodrupa dynasty, and bulk "Variant/alternate listing of …" stubs
   shadowed better-written notes. Era-specific text belongs in `ERA_OVERRIDES`, never in a second
   registry entry.
6. **A dataset SUBJECTO the upstream file gets wrong for the era must be refused, not displayed.**
   The panel trusts SUBJECTO for the "Ruled by" row and for letting a colony inherit its ruler's flag,
   and a wrong ruler puts a foreign flag on an independent country's card: the 1900 file records
   **Portugal** as Brazil's sovereign (independent since 1822), the 1920 file makes Armenia, Azerbaijan
   and Georgia subjects of a **USSR** that would not exist until 1922, and the 1938 file makes Cambodia
   and Cochin China subjects of **Japan**, whose occupation began in 1940. Each is listed with its
   sourced reason in `FALSE_SUBJECTO` and resolved through `eraRuler()`; never read `SUBJECTO`
   directly, and never "fix" one by inventing a replacement ruler.
7. **Verify in the running app** (the mandatory visual-verification rule applies): open **1938** and
   confirm Germany explains the swastika banner rather than claiming it predates flags, that the
   Netherlands, Belgium, Romania and Czechoslovakia now show flags, and open **1900** and confirm
   Brazil is labelled Brazil (not "Kingdom of Brazil"), carries a note and population, and explains
   its own blank.

### Enforcement

`scripts/check-era-flag-explanations.mjs` (`npm run eras:check-explanations`, in `npm run flags:check`
and the `check-era-maps` CI job) **fails the build** when: `LearnPage` stops rendering `noFlagReason`
or reintroduces a cause-asserting fallback line; a `noFlag: true` polity in an era from 1880 on renders
blank with no `noFlagReason`; a reason is too short to explain anything; or `POLITY_REGISTRY` contains
a duplicate key. It prints every curated suppression on each run, so the set stays visible. Never
weaken it, and never silence it by deleting a `noFlag` while leaving the flag genuinely unexplained —
write the reason, or show the flag.

## Historical eras must never show an anachronistic flag — hard rule, do not override without approval

**A polity on a Learn-mode historical era map may only be shown a flag that already
existed at that era's date.** The eras let a polity whose NAME matches a modern country
borrow that country's flag (`eraAllowsModernFlagFallback`, 1914 onwards, plus curated
`modernName` entries in any era). Every one of those borrows MUST pass
`flagExistedInEra(code, eraId)` in `src/lib/historicalEras.ts`, which compares the era's
year against `FLAG_ADOPTION_YEAR` (`src/data/flagAdoptionYears.ts`).

### Why this rule exists

This shipped and was measured (2026-08-01): **99 polities in 1914, 140 in 1945 and 115 in
1960** were handed today's flag regardless of when it was adopted. South Africa's flag —
first flown **27 April 1994** — appeared on the 1914, 1945 AND 1960 maps; Uganda's 1962
flag appeared in 1960; the 1945 map flew the 1949 black-red-gold over occupied Germany and
gave Bangladesh (1971) a flag two decades before the country existed. A *plausible* flag
that is decades out of period is worse than no flag — exactly the reasoning behind "never
show the parent nation's flag for a subdivision".

### Rules

1. **Never bypass the gate.** Any new path that resolves a flag for a historical polity
   must go through `flagExistedInEra()`. A code with NO adoption year is BLOCKED, never
   allowed — a missing flag is honest, an out-of-period flag is not.
2. **`FLAG_ADOPTION_YEAR` is generated, never hand-edited.** Re-run
   `node scripts/build-flag-adoption-years.mjs` (Wikidata: flag `P163` → inception `P571`,
   keyed by ISO `P297`). A year Wikidata gets wrong is corrected in the generator's
   `ADOPTION_OVERRIDES`, **with a cited reason**, so the fix survives every regen — the
   same discipline as `CAPITAL_FLAG_SOURCE_OVERRIDES` and `MANUAL_VERIFIED_POPULATION`.
3. **Know which direction each override errs in.** P571 is sometimes a later
   standardisation of an unchanged design (Denmark 1748, Sweden 1906, the Netherlands
   1937) — correcting those to the design's own documented year restores a flag that
   really did fly. It is sometimes an ANCESTOR design (Ethiopia 1778, Russia 1696) —
   those MUST be corrected upward to the current design's adoption, because leaving them
   lets a modern flag fly in an era that never saw it. When unsure, prefer the later year:
   over-blocking loses a flag, under-blocking ships a wrong one.
4. **A refused flag must be explained, not left blank.** The panel says which flag was
   refused and when it was adopted ("No flag for 1960 — Uganda's modern flag was only
   adopted in 1962"). Never revert to the generic "this polity predates modern flag
   design" line for a 20th-century colony.
5. **Prefer the ruler's flag to no flag, and label it.** Where the era GeoJSON's own
   `SUBJECTO` names a ruling power, a colony inherits that ruler's era-legal flag and the
   panel says so ("Flew the flag of Belgium — it had no national flag of its own at this
   date") plus a "Ruled by" row. Never show an inherited flag without that caption; a
   colony's card must never imply it had a national flag of its own.
6. **Verify in the running app** (the mandatory visual-verification rule applies): open
   1914 and confirm South Africa shows the Union Jack with the "Ruled by" caption, 1960
   Uganda shows the dated explanation and no flag, and a country whose flag DID predate
   the era (Brazil 1889 in 1914) still shows it.

### Enforcement

`scripts/check-historical-flag-anachronism.mjs` (`npm run eras:check-flags`, in
`npm run flags:check` and the `flag-integrity` workflow) **fails the build** if the gate is
no longer called from `LearnPage`/`historicalEras.ts`, if `FLAG_ADOPTION_YEAR` loses a
country or gains an implausible year, or if a curated `modernName` points at a country with
no adoption year (which would silently refuse the flag the author intended). It also prints
every borrow the gate refused, so the curation stays visible. Never weaken it; fix the data.

## Country widget information must never be reduced — hard rule, do not override without approval

**The Learn-mode country widget (`EntitySummary`, rendered in `src/pages/LearnPage.tsx`) is a
fact-sheet. Its rows are important information and must never be removed, and the data behind them
must always be available — including when `restcountries.com` is blocked or down.**

The widget shows, for a modern country, these rows (each rendered only when its data is present):

| Row | Source |
|-----|--------|
| Region | `country.subregion` (REST Countries / bundled `SUBREGION_GROUPS`) |
| Official name | `country.nameOfficial` |
| Capital | `country.capital` |
| Population | World Bank live → REST Countries (live, not bundled — figures go stale) |
| Languages | `country.languages` |
| Currencies | `country.currencies` |
| Government | `GOVERNMENT_TYPES[code]` (curated local map) |

### Why this rule exists

`restcountries.com` has a long history of outages and is blocked on some networks (it returns HTTP
403 from the build/CI environment used here). A past change (#245) added an offline fallback
(`buildFallbackCountries` in `src/api/countries.ts`) that, to fix a blank-page crash, built the
country list with only name/code/flag/region/population — silently dropping **Capital, Official
name, Languages and Currencies**. So whenever the API was unavailable, the widget lost those rows.
That is the "removed important information from the country widget" regression this rule prevents
from ever recurring.

### Rules

1. **The four extra fields are bundled locally** in `src/data/countryFacts.ts` (auto-generated by
   `scripts/build-country-facts.mjs` from `mledoze/countries` — the authoritative dataset
   restcountries.com is itself generated from). `buildFallbackCountries` **must** populate
   `nameOfficial`, `capital`, `languages` and `currencies` from `COUNTRY_FACTS`, and the live
   (REST Countries) path **must** backfill any of those fields the API omits from `COUNTRY_FACTS`.
   The bundled widget data must always be complete, exactly like the "all flag files must be
   bundled" rule.

2. **Never delete or reduce `COUNTRY_FACTS`**, and never shrink the field set it carries, without
   approval. To refresh it, re-run `node scripts/build-country-facts.mjs` (needs egress to
   `raw.githubusercontent.com`). The generator only re-formats authoritative source data — it must
   never invent capitals, languages or currencies (same spirit as the "never generate flag content"
   rule).

3. **Never remove a row from `EntitySummary`**, and never remove the `EntitySummary`/anthem/flag
   block from the Learn panel, to "simplify" the widget. Adding rows is fine; removing the existing
   ones is a regression.

4. **Verify in the running app** (the mandatory visual-verification rule below applies): with
   `restcountries.com` blocked, open a country in Learn mode and confirm Region, Official name,
   Capital, Languages, Currencies and Government all still render.

## All flag files must be bundled in the repository — hard rule, do not override without approval

**Every flag image used by the game must be committed to the repository as a local file.**
External runtime URLs (Wikimedia Commons, CDNs, any third-party host) are **forbidden** in
`LOCAL_FLAG_OVERRIDES`. Network availability, URL stability, and CORS policy are all outside
our control — a remote URL that works today may be blocked, moved, or rate-limited tomorrow.

### Where to store flag files

| Flag type | Local path |
|-----------|-----------|
| National / territory flags | `public/flags/{code}.svg` (e.g. `public/flags/fo.svg`) |
| Subdivision flags (unofficial, e.g. Ulster Banner) | `public/flags/sub/{CC}/{CC-code}.svg` (e.g. `public/flags/sub/GB/GB-NIR.svg`) |

### How to add a new flag

1. Download the SVG from an authoritative source (see **Flag aspect ratios** section)
2. Verify the `viewBox` is a real-world ratio (not `0 0 640 480` or `0 0 512 512`)
3. Commit the file to the correct path above
4. In `LOCAL_FLAG_OVERRIDES`, use `` `${BASE}flags/...` `` — never a raw `https://` URL

### Formerly-outstanding files — now bundled (2026-07-28: Wikimedia egress confirmed working)

All of the following were previously blocked on Wikimedia egress (either left as a raw `https://`
URL in `LOCAL_FLAG_OVERRIDES`, or fully suppressed). Egress to `upload.wikimedia.org` and
`commons.wikimedia.org` was re-verified working 2026-07-28 and every one was downloaded and
bundled locally; none of these should ever be reverted to a raw Wikimedia URL or re-suppressed
without first re-checking egress with `node scripts/download-unofficial-flags.mjs`.

`FR-GP` (`public/flags/gp.svg`) is bundled from fonttools/region-flags (the Wikimedia source file
is `commons/e/e7/Unofficial_flag_of_Guadeloupe_(local).svg`; the download script will re-download
it if the local copy needs refreshing).

`FR-RE` (`public/flags/re.png`) is bundled as a 1280×854 PNG (3:2), provided directly by the owner
— the Wikimedia SVG (`commons/f/f8/Flag_of_Réunion_(Local).svg`) 404s. Shows the correct
Lö Mahavéli design (blue field, yellow rays, red triangle).

| Code | Local target | Wikimedia source |
|------|-------------|-----------------|
| `GB-NIR` | `public/flags/sub/GB/GB-NIR.svg` | `flag-icons`-sourced Ulster Banner (the `commons/d/d0/Ulster_Banner.svg` filename has since moved/been retitled on Commons — the bundled file was unaffected and verified still correct) |
| `SO-SL~` | `public/flags/so-sl.svg` | `commons/4/4d/Flag_of_Somaliland.svg` |
| `FR-YT` | `public/flags/yt-local.svg` | `commons/4/4a/Flag_of_Mayotte_(local).svg` |
| `FR-BL` | `public/flags/bl.svg` | `commons/b/b4/Flag_of_Saint_Barthélemy_(local).svg` |
| `FR-PM` | `public/flags/pm.svg` | `commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg` |
| `FR-WF` | `public/flags/wf.svg` | `commons/d/d2/Flag_of_Wallis_and_Futuna.svg` |
| `GB-SH` | `public/flags/sh.svg` | `commons/0/00/Flag_of_Saint_Helena.svg` (the blue ensign defaced with the Saint Helena coat of arms — rocks, sea, wirebird badge in the fly; hampusborgos/lipis `sh` is the bare Union Jack, wrong. The `commons/4/4c/...` filename previously logged here 404s; the current Commons file lives at `0/00/`.) |

`FR-MF` (`public/flags/mf.png`) is **bundled and shown** — the Saint Martin flag: a white
field bearing the collectivity's emblem (a brown pelican in flight over a hibiscus, with a sunrise
and a "Saint-Martin" banner), provided directly by the owner as a 1280×854 PNG (3:2). It scores a
perceptual distance of **334** from the French Tricolour (`fr.svg`) — far above the 30 threshold —
versus the old mislabelled Tricolour, which scored 18. **Never** revert `FR-MF` to the lipis or
hampusborgos `mf` file (both are the French Tricolour) and **never** re-suppress it without owner
approval. It carries the "Flag not officially recognised by France" label, which is correct: France
recognises no regional flags, exactly as for Réunion and Mayotte.

**Enforcement:** `LOCAL_FLAG_OVERRIDES` must never contain a string that starts with `https://`
or `http://`. When reviewing any PR that modifies `src/api/subdivisions.ts`, check that every
value in `LOCAL_FLAG_OVERRIDES` uses the `` `${BASE}flags/...` `` template literal pattern.

## Mandatory visual verification before every push — hard rule, do not override without approval

**Every task that touches flags, maps, or any other visible UI must be verified in the running app
before the branch is pushed and the PR is created.** Skipping this step is what caused Northern
Ireland to ship with the Union Jack (PR #284/286 — the parent nation's flag was served by the
authoritative source for `gb-nir`, which is a violation of the subdivision flag rule).

### What to verify

| Change type | What to check in the running app |
|-------------|----------------------------------|
| Any flag added or changed | Open every affected subdivision or country card; confirm the correct flag image is displayed, NOT the parent nation's flag |
| Any subdivision removed/replaced | Open the parent country's flag grid; confirm the grid shows the correct divisions and none are blank or duplicated |
| Any GeoJSON replaced | Open the parent country's subdivision map; confirm the map renders mainland regions visibly (not blank/zoomed-out) |
| Any territory added/removed | Open the parent country's flag grid and map; confirm tier ordering (primary → external → disputed) is correct |

### Mandatory checklist — complete before every push

1. `npm run dev` — start the dev server
2. Navigate to the affected country/subdivision page in a browser
3. Visually confirm every affected flag shows the **correct** image
4. Confirm **no subdivision displays the parent nation's flag** (this is always wrong)
5. Confirm the **subdivision map renders** (is not blank)
6. Confirm **flag labels** are correct: `(unofficial flag)` where expected, absent where not
7. Run `npm run flags:check` — it must pass

**There are no exceptions to this checklist.** If the dev server is not available in the current
environment, explicitly state that in the PR description and do not mark the task as complete.

### When no browser is available — precedence over the merge rule

This repository ships a SessionStart hook (`.claude/hooks/session-start.sh`) that installs a
headless Chromium so the checklist above can actually be performed. **Use it** — drive the running
app with Playwright and attach/screenshot the result.

If, and only if, a browser genuinely cannot run in the environment (the Chromium download is blocked
by the network policy and no system browser is installed), then:

1. Complete every non-visual check that *is* possible (`tsc`, `npm run build`, `npm run flags:check`,
   the dev server transforms the changed modules without error).
2. State the visual-verification gap **explicitly in the PR description**.
3. **Still merge** per the PR-workflow rule below — an unavailable browser is a documented caveat,
   **not** a reason to pause the merge or to ask the user whether to merge. Do not silently resolve
   the tension between this rule and the merge rule; surface the caveat and proceed.

The "do not mark the task as complete" line above applies when the **dev server itself** can't run
(the build is broken / deps won't install), not when only the *browser* is missing.

## Flag aspect ratios — hard rule, do not override without approval

**This rule applies to every flag in the repository** — national flags, territory
flags, and subdivision flags (e.g. England, Scotland, Åland, Puerto Rico).
Every flag SVG must encode the **real-world official aspect ratio** in its `viewBox`.

### Authoritative sources

| Flag type | Authoritative source |
|-----------|----------------------|
| National/territory flags (`public/flags/*.svg`) | [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags): `https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/{code}.svg` |
| Constituent-country subdivision flags (`public/flags/sub/{CC}/`) | [hampusborgos/country-flags](https://github.com/hampusborgos/country-flags): `https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/{lowercase-code}.svg` (e.g. `gb-eng`, `gb-sct`, `gb-wls`, `gb-nir`) |
| Other subdivision flags | [amckenna41/iso3166-flags](https://github.com/amckenna41/iso3166-flags) via jsDelivr CDN — **only** if the file has a real-world viewBox. If the CDN file is 640×480, suppress the code in `SUPPRESSED_SUBDIVISION_FLAGS` and document why. |
| Exceptions requiring Wikimedia Commons | Individual entries in `NATIONAL_SOURCE_OVERRIDES` or `LOCAL_FLAG_OVERRIDES` — document each one explicitly. |

Known viewBox values for common real-world proportions:

| Flag | viewBox | Ratio |
|------|---------|-------|
| France, most of Africa/Americas | `0 0 3 2` | 3:2 |
| Germany, Austria, Belgium | `0 0 5 3` | 5:3 |
| UK, Australia, New Zealand, Fiji | `0 0 60 30` | 2:1 |
| England, Scotland, Wales (GB subdivisions) | `0 0 25 15` / `0 0 5 3` / `0 0 830 498` | 5:3 |
| Northern Ireland (GB subdivision) | `0 0 60 30` | 2:1 |
| Switzerland, Vatican City | `0 0 32 32` | 1:1 |
| Qatar | `0 0 1400 550` | ~28:11 |
| Nepal | negative-origin viewBox | pentagon |
| Afghanistan | `0 0 1000 500` | 2:1 (Wikimedia override) |

### Rules — apply to all code changes, CSS, and flag downloads

1. **Never** add `aspect-ratio` to `.flag-card`, `.flag-grid__thumb`,
   `.flag-image`, or any other element that wraps a flag, in a way that
   overrides the SVG's natural proportions.

2. **Never** use `object-fit: cover` on flag `<img>` elements — it crops
   flags. Always use `object-fit: contain`.

3. **Never** download any flag (national, territory, or subdivision) from
   `flagcdn.com` or the `flag-icons` npm package. These standardise every
   flag to `640×480` (4:3), destroying the real-world proportions.

4. **Never** use a subdivision flag file from `amckenna41/iso3166-flags` that
   has a forbidden standardised viewBox (`640×480`, `512×512`). If no
   correctly-proportioned source exists, add the code to
   `SUPPRESSED_SUBDIVISION_FLAGS` in `src/api/subdivisions.ts` with a comment
   explaining the reason, rather than serving a wrong-ratio flag.

4a. **`EXEMPT_UNOFFICIAL_FLAGS` in `check-flag-proportions.mjs` is for flags
    with genuinely NO official real-world aspect ratio** — i.e. local/unofficial
    designs that no government authority has ever specified proportions for
    (e.g. Martinique's serpent banner, New Caledonia's FLNKS flag). Do **not**
    add a flag to this exempt list just because a correctly-proportioned source
    could not be found. If a flag has known real-world proportions (even for an
    unofficial flag — e.g. the Ulster Banner follows Crown heraldic banner
    proportions at 2:1), you must source or produce a correctly-proportioned
    version. Technique allowed when no authoritative 2:1 source exists:
    wrap the 640×480 SVG body in `<g transform="scale(1, H/480)">` and change
    the viewBox to `0 0 640 H` (where H = 640 / aspect_ratio), but only after
    verifying that all content coordinates fit within the new height. This is a
    coordinate-system rescale, not invented content — it is the only permitted
    exception to the "never modify flag SVG content" rule.

5. **Afghanistan exception**: `public/flags/af.svg` uses the Taliban / Islamic
   Emirate flag from Wikimedia Commons (pinned in `NATIONAL_SOURCE_OVERRIDES`
   in `scripts/download-flags.mjs`). Do not replace it with the hampusborgos
   file — that repo carries the pre-2021 Republic flag for `AF`.

6. **HARD RULE — never generate, invent, or approximate flag SVG content.** Every
   flag must come from an authoritative source (hampusborgos/country-flags, lipis/flag-icons,
   or Wikimedia Commons). If no accessible source is found:
   - **Do not** write SVG polygons/paths/shapes that attempt to approximate the flag's appearance.
   - **Do not** describe a flag's colours and programmatically compute a "close enough" version.
   - **Do** leave the flag absent (remove or omit the `LOCAL_FLAG_OVERRIDES` entry) and document
     the missing source in a code comment and in the PR description.
   - **Do** search harder: try alternate Wikimedia filenames, check the raw GitHub URL, or ask.
   A subdivision card with no flag is always better than a card showing an invented flag.
   This rule has been violated before (Tibet 2024, Guadeloupe/Réunion 2026) — do not repeat it.

### Enforcement

`npm run flags:check` (and the `flag-integrity` CI workflow) fail if any
bundled SVG under `public/flags/` **or `public/flags/sub/`** has a forbidden
standardised viewBox. The check is recursive. Any PR that touches any flag
file must pass this check.

To re-download all national/territory flags correctly:
```
node scripts/download-flags.mjs --force --national-only
```

## Never trust a bulk-imported subdivision flag as correct by default — hard rule, do not override without approval

**A subdivision flag must never ship as a generic placeholder.** Paraguay's Misiones Department
(`PY-8`) shipped for an extended period with a flag that was NOT the real Misiones flag: a generic
red/navy/white horizontal-tricolour. The root cause was traced (2026-06): the bulk flag dataset this
project originally imported from (`amckenna41/iso3166-flags`) appears to have confused Paraguay's
Misiones Department with **Argentina's Misiones Province** (`AR-N`) — a real flag that is *also*
red/blue/white horizontal bands in the same order and near-identical proportions — almost certainly
because both subdivisions share the English name "Misiones". The bad flag passed every other check
(it has a real-world-looking viewBox, and it isn't byte-identical to Paraguay's own national flag,
so the parent-flag-collision check did not catch it) because the bug is specific to a **third-party
data error**, not a local mistake.

**Lesson: do not assume a flag bundled from a bulk third-party source (the amckenna41 CDN, or any
future bulk import) is correct just because it loads and passes the proportions/parent-collision
checks.** Bulk sources can and do mix up two unrelated subdivisions that happen to share a name
across different countries.

### Rules

1. Whenever a subdivision's flag looks suspicious, generic, or you cannot find it described that
   way by an authoritative source for **that country specifically**, verify it independently —
   do not assume the bulk-imported file is right by default.
2. If a subdivision shares its name with a subdivision in a **different** country (e.g. Paraguay's
   "Misiones" vs. Argentina's "Misiones"; "Córdoba" in Argentina/Colombia/Spain; "Amazonas" in
   Brazil/Colombia/Peru/Venezuela), treat that as a specific risk factor for this exact bug and
   double check both flags come from sources specific to their own country, not a shared/confused
   asset.
3. When in doubt, leave the flag absent (suppress it) rather than ship a placeholder that merely
   "looks plausible" — same as the broader "never invent flag content" rule above.

### Enforcement

`scripts/check-subdivision-name-collisions.mjs` (run by `npm run flags:check` and the
`flag-integrity` CI workflow) finds every subdivision name shared by two or more countries in
`SUBDIVISION_META`, and for every cross-country pair that both have a bundled local flag
(`LOCAL_FLAG_OVERRIDES` or `public/flags/sub/**`), computes the same 576-bit perceptual difference
hash used by the parent-flag-collision check. It **fails the build** if a same-name pair's
flags are suspiciously similar (Hamming distance < 130) — the historical Misiones bug scored 87;
every legitimate same-name-different-country pair currently bundled scores >= 171, so the
threshold sits at a wide margin from both. This check only covers bundled **local** flags — it
cannot fetch CDN-only flags over the network — so it is a safety net, not a substitute for manual
verification per the rules above.

## Disputed territory neutrality — hard rule, do not override without approval

When two or more nations claim or dispute a subnational territory, the game takes no side.
The rules below are **hard-coded** and must be preserved in all future changes.

### World map view

Clicking on a disputed/claimed territory on the world map **must never select or highlight any nation**.
The mechanism: `DISPUTED_TERRITORY_CODES` (auto-derived in `src/lib/territoryParentMap.ts`) lists all
disputed geo codes. `UNDISPUTED_TERRITORY_PARENT` excludes them. The world map receives only
`UNDISPUTED_TERRITORY_PARENT`, making disputed polygons non-clickable.
**Always pass `UNDISPUTED_TERRITORY_PARENT`, never the full `TERRITORY_PARENT`, to the world map.**

### World map view — disputed landmass colour (hard rule)

Any landmass that is **not** one of the 195 UN states **and** is claimed or disputed by one
or more nations **must** render in `palette.disputedLand` (a neutral grey), never the regular
`land`/`poolLand` colour. Painting a contested territory as ordinary sovereign land would imply
a political position the game must not take.

This is enforced in `src/components/WorldProgressMap.tsx` by **three** matchers plus the Crimea id:

1. **`DISPUTED_TERRITORY_CODES`** (auto-derived) — territories disputed between two or more UN
   members. This is the SAME set that makes them non-clickable on the world map, so colour and
   click-neutrality never drift apart. Catches e.g. the Falkland Islands (`FK`, claimed by
   Argentina) and Gibraltar (`GI`, claimed by Spain).
2. **`WORLD_MAP_DISPUTED_ALPHA2`** — ISO-coded non-UN entities claimed by a SINGLE UN member,
   which the 2+-claimants rule above does not catch (`EH`, `TW`).
3. **`WORLD_MAP_DISPUTED_NAMES`** — code-less polygons matched by Natural Earth feature name,
   which would otherwise fall through to the neutral `unknown` colour.

| Match key | Territory | Status |
|-----------|-----------|--------|
| `FK` (DISPUTED_TERRITORY_CODES) | Falkland Islands | Administered by the UK; claimed by Argentina |
| `EH` (alpha-2) | Western Sahara | Claimed/administered by Morocco; SADR/Polisario dispute it |
| `TW` (alpha-2) | Taiwan | Governed by the ROC; claimed by the PRC; not a UN member |
| `DISPUTED_CRIMEA` (id) | Crimea | Administered by Russia; claimed by Ukraine |
| `Kosovo` (name) | Kosovo | Declared independence 2008; claimed by Serbia; not a UN member |
| `Somaliland` (name) | Somaliland | Self-declared 1991; claimed by Somalia; unrecognised |
| `N. Cyprus` (name) | Northern Cyprus | TRNC; claimed by the Republic of Cyprus; recognised only by Türkiye |
| `Siachen Glacier` (name) | Siachen Glacier | Disputed between India and Pakistan |

`Indian Ocean Ter.` is deliberately excluded — it is undisputed Australian territory, not claimed
by another nation. **Any** future contested non-UN landmass that renders as its own polygon must
be added to the matching set and to this table. Do not give a disputed landmass the regular
country colour.

**Disputed territories absent from the topology — represent at TRUE scale, never enlarge.**
Some disputed territories are too small to exist as a polygon in the 50m topology (sub-pixel at
world scale) and would render nowhere. These are injected at runtime as a **true-scale polygon**
at their real coordinates (in the `WorldProgressMap` `useEffect`, like the Crimea extraction), so
the territory is represented but its size is never distorted — it is a tiny speck at world zoom and
becomes legible only when the user zooms in (max zoom is 24×).

| Injected polygon | Territory | True area |
|------------------|-----------|-----------|
| id `GIBRALTAR` (name "Gibraltar") | Gibraltar | ~6 km² (real ≈ 6.7 km²); UK territory claimed by Spain |

**HARD RULE — never misrepresent size.** A disputed territory must never be silently missing from
the world map, but it must NEVER be drawn larger than its real footprint (no fixed-size markers,
no enlarged dots, no minimum sizes). If it is too small to see, the answer is zoom, not enlargement.
The same rule applies to every nation, subdivision and landmass on every map.

### Nation subnational view — flag grid

#### Hard rule — never show the parent nation's flag for a subdivision

If a subdivision has **no distinct official flag** (i.e. its flag is the same as the parent nation's
flag, or no flag file exists), **always** show the most widely-used local/unofficial flag instead, and
label it **"Flag not officially recognised by [Country]"**. Showing the parent nation's flag as if it
were a subdivision flag gives no useful information and is misleading.

This rule applies to:
- French overseas departments/collectivities (Réunion, Martinique, New Caledonia, Saint Martin, etc.)
- Any other subdivision where the only "official" flag is the parent nation's tricolour/ensign

Concretely: if adding a flag URL to `LOCAL_FLAG_OVERRIDES` in `src/api/subdivisions.ts`, verify the
SVG is **not** the parent nation's national flag. If the CDN or local file returns the parent flag,
find and use the local unofficial alternative.

**If no authoritative source for the subdivision's OWN flag is accessible, you MUST suppress the flag**
(remove the `LOCAL_FLAG_OVERRIDES` entry and add the code to `SUPPRESSED_SUBDIVISION_FLAGS`) so that
**no** flag and **no** "(unofficial flag)" label is shown. A blank flag is always correct; the parent
nation's flag is always wrong. Never bundle the parent flag as a stop-gap.

##### Automated enforcement (`scripts/check-parent-flag-collision.mjs`) — hard rule

This bug has shipped **repeatedly** (Northern Ireland Union Jack #284/286; Saint Martin French
Tricolour and Saint Helena Union Jack, 2026-06-16) because the bad file comes from an *authoritative
national-flag source* (lipis/flag-icons serves the French Tricolour for `mf`; hampusborgos serves the
bare Union Jack for `gb`/`sh`), so it passes the proportions check and every text/lint check. A byte
comparison does **not** catch it — the subdivision file and the parent file come from different sources
with different viewBoxes and hex shades. **Saint Martin recurred a second time** (2026-06-16): after the
Tricolour was suppressed it was re-bundled correctly as the white emblem flag (`mf.png`, distance 334).
The lesson is permanent: the parent flag will keep arriving from these "trusted" sources, so the
perceptual guard below is the only thing standing between it and the live site — never weaken it.

`scripts/check-parent-flag-collision.mjs` (run by `npm run flags:check` and the `flag-integrity` CI
workflow) rasterises **every** bundled subdivision flag — both the `${BASE}flags/...` files in
`LOCAL_FLAG_OVERRIDES` **and** every file under `public/flags/sub/**`, in **any** format (`.svg`,
`.png`, `.jpg`) — together with its parent nation's flag, reduces each to a 576-bit perceptual
difference hash (grayscale + R/G/B planes, horizontal **and** vertical gradients), and **fails the
build** if a subdivision flag's Hamming distance to its parent is below the threshold for its set.
It also **prints the distance for every curated override** (so drift toward the parent flag is visible
as an early warning long before it crosses the threshold) and **fails if any curated override names a
file that is not bundled** (a dangling override must never go unchecked). Thresholds:

- **Curated overrides** are checked at distance **< 30**. Known-bad flags scored 0 (GB-SH = Union Jack)
  and 18 (FR-MF = French Tricolour); the nearest legitimate flag scored 125, and the now-correct
  Saint Martin emblem flag scores 334 — the bad and good cases are separated by a wide margin.
- **Bulk `sub/**` files** are checked at the stricter distance **< 12** (near-identical duplicates
  only). The verbatim national-flag duplicates found (Bosnia flag for Brčko `BA-BRC`; Nigeria flag for
  `NG-IM`/`NG-TA`; plus dead Tricolour/US-flag files) scored 0; the nearest *legitimate* sub flag — the
  Opole voivodeship `PL-16`, a yellow/blue bicolour that merely shares a light-over-dark layout with
  Poland's flag — scored 18. The two sets need different thresholds because a legitimate bulk flag can
  score as low as a different-shade national-flag copy; they are distinguishable only by treating the
  curated list (where the design is intentional) more strictly than the bulk import.

**Rules:**
1. **Never** delete, weaken, or raise either threshold to make a flag pass. If a flag trips the check,
   the flag is the parent's flag — fix the flag, not the check.
2. **Never** add a flag to `EXEMPT_UNOFFICIAL_FLAGS` (in `check-flag-proportions.mjs`) to dodge this —
   that list is **only** for aspect ratios and does not exempt anything from the collision check.
3. Any new bundled subdivision flag (an override `${BASE}flags/...` file or a `public/flags/sub/**`
   file) is checked automatically; run `npm run flags:check` before pushing any flag change.
4. If a flag is correctly flagged but no authoritative replacement is accessible, delete the file and
   add the code to `SUPPRESSED_SUBDIVISION_FLAGS` (so no flag and no "(unofficial flag)" label render),
   then document it in the suppressed-flags table above.
5. **Never** silence the guard by deleting an override's bundled file while leaving the override entry,
   or by pointing an override at a missing file — the check now **fails** on any curated override whose
   file is absent. To stop showing a flag you must remove the override **and** suppress the code.
6. The guard covers `.png` and `.jpg` flags (e.g. `mf.png`, `re.png`), not just `.svg` — an
   owner-provided raster flag is checked against the parent exactly like an SVG. Bundling a flag in a
   raster format does **not** exempt it from the collision check.
7. A user/owner who provides a flag image directly is an **authoritative source** (like the Réunion and
   Saint Martin PNGs); bundle it as-is. This is never licence to invent/approximate flag content
   yourself — see the "never generate flag SVG content" hard rule.

#### Hard rule — never embed "(unofficial flag)" in a subdivision name

The `name` field in every `SUBDIVISION_META` entry in `src/lib/subdivisionMeta.ts` is the plain
geographic name only (e.g. `"Guadeloupe"`, not `"Guadeloupe (unofficial flag)"`). The status label
is rendered separately by `getSubdivisionDisputeLabel()` in `src/lib/disputedSubdivisions.ts`.
Putting the label in the name causes it to appear twice on the card. Never suffix a name with
`(unofficial flag)`, `(disputed)`, `(claimed)`, `(unofficial)`, or any similar qualifier.

When browsing a nation's subnational divisions, disputed/claimed territories **are** shown with the
territory's own flag labelled **"Flag not officially recognised by [Country]"** — the same treatment as
subdivisions that lack a distinct official flag (e.g. French overseas departments Réunion and Mayotte,
which show their local unofficial flags). The claiming nation not recognising the flag is not a reason
to hide it; it IS the reason the label reads "not officially recognised".

| Territory | Under administering nation | Under claiming nation |
|-----------|---------------------------|----------------------|
| Falkland Islands / Malvinas | Shown with FK flag (official) ✓ | Shown with FK flag as "(unofficial flag)" — AR-ML~ is hidden via hierarchy (Tierra del Fuego) |
| Taiwan | Shown as its own country | Shown with ROC flag as "(unofficial flag)" under China |
| Kosovo | Shown as its own country | Shown with Kosovo flag as "(unofficial flag)" under Serbia |
| Western Sahara | N/A — SADR not a UN member | Shown with SADR flag as "(unofficial flag)" under Morocco |
| Somaliland | N/A — not recognised | Shown with Somaliland flag as "(unofficial flag)" under Somalia |
| Northern Cyprus | Shown with TRNC flag (Türkiye recognises it) | Shown with TRNC flag as "(unofficial flag)" under Cyprus |
| Abkhazia | Shown with Abkhazia flag (CDN) | Shown as "(unofficial flag)" under Georgia |

**Exception — hierarchy entries**: `AR-ML~` and `ES-GIB~` are hidden from their claimants' grids via
`DISPUTED_TERRITORY_HIERARCHY` (replaced by Tierra del Fuego and Cádiz respectively). No flag override
is needed for them. `IN-AK~` and `IN-GB~` are likewise hidden from India's grid via hierarchy.

### Hierarchy rule — most important

A claimed/disputed territory **must respect the political hierarchy of its parent nation**.
If the claiming nation groups the territory as part of an existing administrative division,
the territory **must not appear as a standalone entity in the flag grid**.
Instead, clicking its landmass on the subdivision map must redirect to the parent subdivision.

This is implemented via `DISPUTED_TERRITORY_HIERARCHY` in `src/lib/disputedSubdivisions.ts`:

| Claimed code | Hierarchy parent | Rationale |
|--------------|-----------------|-----------|
| `AR-ML~` | `AR-V` (Tierra del Fuego) | Argentine constitution places Malvinas inside the Province of Tierra del Fuego |
| `ES-GIB~` | `ES-CA` (Cádiz) | Spanish administrative law places Gibraltar in the Province of Cádiz |
| `IN-AK~` | `IN-JK` (Jammu & Kashmir UT) | India's Instrument of Accession covers all of J&K, including Azad Kashmir |
| `IN-GB~` | `IN-LA` (Ladakh UT) | India's 2019 reorganisation places this border area in Ladakh |

Any new disputed entry must declare a `DISPUTED_TERRITORY_HIERARCHY` parent **unless** the claiming nation
treats the territory as a standalone entity (e.g. Turkey → TRNC, Cyprus → Northern Cyprus, Ukraine → Crimea,
Serbia → Kosovo, Somalia → Somaliland).

The **administering** nation (e.g. UK for Falklands and Gibraltar) always shows the territory as its own
standalone division with its recognised flag.

**Claimant-only de-facto states.** Where the entity that administers a territory is itself not a UN member
(Taiwan, Kosovo, Somaliland, Western Sahara), the territory is shown **only** under the claiming UN member,
as a single standalone disputed entity with its own flag shown as **(unofficial flag)**:

| Claimed code | Claiming nation | Geometry source | Flag shown |
|--------------|-----------------|-----------------|------------|
| `CN-TW` | China | `TW.json` | ROC (Taiwan) flag — `tw.svg` |
| `MA-EH~` | Morocco | `EH.json` | SADR flag — `eh.svg` |
| `RS-KM~` | Serbia (Kosovo and Metohija) | `XK.json` | Kosovo flag — `xk.svg` |
| `SO-SL~` | Somalia (Somaliland) | `XS.json` (extracted from world topology) | Somaliland flag — Wikimedia |

### Enforcement

`src/lib/disputedSubdivisions.ts` contains `DISPUTED_TERRITORY_HIERARCHY` and `DISPUTED_HIERARCHY_CHILDREN_OF`.
`SubdivisionFlagGrid` filters out hierarchy children from the visible grid.
`SubdivisionMap` redirects clicks on hierarchy children to their parent subdivision code, and highlights
child polygons when their parent is selected.
`useSubdivisionGame` excludes hierarchy children from game questions.

## A merged disputed territory must be a COMPLETE subdivision of the nation claiming it — hard rule, do not override without approval

**When a disputed/claimed territory's geometry is merged into the map of the nation that claims it (via
`TERRITORY_GEO_FOR_PARENT` in `src/lib/territoryParentMap.ts`), the territory's `subdivCode` MUST also be a
first-class entry in that nation's `SUBDIVISION_META`, MUST carry a capital, and (being disputed) MUST have a
disputed-nature note and its own flag.** Merging only the geometry is not enough — the polygon renders, but with
no card, no capital and no note.

### Why this rule exists

This shipped **repeatedly** (2026-07): a disputed territory's geometry was merged into the claiming country and
re-tagged with its `subdivCode` (e.g. **Kosovo `RS-KM~` under Serbia**, **Somaliland `SO-SL~` under Somalia**,
**Northern Cyprus `CY-NC~` under Cyprus**, **Western Sahara `MA-EH~` under Morocco**), but that code was **never
added to the claiming nation's `SUBDIVISION_META`**. Because the flag grid and the capital overlay both iterate the
meta divisions, the territory rendered as a bare polygon: **no flag-grid card, no capital marker, and no
disputed-nature explanation** under the flag. Cyprus was worse — the whole of Northern Cyprus was mislabelled as the
single "Kyrenia" district (`CY-06~`) it happened to carry. Each was reported one at a time.

### Rules

1. **Every disputed `subdivCode` in `TERRITORY_GEO_FOR_PARENT` (any code ending `~`, plus `CN-TW`) that is not a
   `DISPUTED_TERRITORY_HIERARCHY` child MUST be appended to its parent nation's `TERRITORIES_TO_APPEND` in
   `scripts/build-subdivision-meta.mjs`** with `typeLabel: "Disputed Territory"`, then the meta regenerated. The geo
   `subdivCode`, the `SUBDIVISION_META` code, the `LOCAL_FLAG_OVERRIDES` key and the `DISPUTED_SUBDIV_NOTES` key must
   all be the **same** string — never let them drift (that is what left Kosovo/Somaliland/Cyprus broken).
2. **It MUST carry a capital**, sourced authoritatively into `src/data/subdivisionCapitals.ts` via the generator's
   `DISPUTED_CAPITAL_QIDS` (territory QID → its `P36` capital) or, when the territory's Wikidata item has no `P36`
   (Western Sahara Q6250 has none), `DISPUTED_CAPITAL_CITY_QIDS` (the capital CITY's own QID → its `P625`). Same
   "never fabricate a capital or coordinate" discipline as every other capital.
3. **Its internal subdivisions are dissolved away** — `fetchMergedSubdivisionGeo` unions a merged territory's features
   into one, so it shows as a single unit (see the disputed-territory dissolve). Do not reintroduce its internal
   borders.
4. Adding a *new* merged disputed territory means doing **all** of the above (meta + capital + note + flag) in the
   same change — never merge geometry alone.

### Enforcement

`scripts/check-disputed-territory-coverage.mjs` (run by `npm run flags:check` and the `flag-integrity` CI workflow)
cross-references `TERRITORY_GEO_FOR_PARENT` against `SUBDIVISION_META` and `subdivisionCapitals.ts` and **fails the
build** if any merged disputed territory (a `~`/`CN-TW` code that is not a hierarchy child) is missing from its
claiming nation's meta or has no capital. Never weaken or bypass it; if it fails, add the meta entry and the capital
rather than the check.

## No Antarctic territorial claim may ever be represented — hard rule, do not override without approval

**No portion of the Antarctic continent may ever be added to the game as a country, subdivision, dependency, or
"overseas territory" entity, under ANY claimant nation, regardless of source authority.** This is a full exclusion,
not a neutral-display case like the disputed-territory rule above.

The exclusion boundary is **60°S latitude — the Antarctic Treaty area** (the zone the 1959 Antarctic Treaty, Article
IV, covers). Everything south of it is excluded, including but not limited to:

| Claimant | Excluded claim |
|----------|-----------------|
| United Kingdom | British Antarctic Territory |
| Chile | Territorio Chileno Antártico (Chilean Antarctic Territory) |
| Argentina | Antártida Argentina (Argentine Antarctica) |
| Australia | Australian Antarctic Territory |
| New Zealand | Ross Dependency |
| Norway | Queen Maud Land; Peter I Island (lies at ~68–69°S, inside the Treaty area) |
| France | Adélie Land / Terre Adélie (the Antarctic district of the French Southern and Antarctic Lands — the
  territory's other four districts, all north of 60°S, are NOT covered by this exclusion; see the rule on completing
  a newly surfaced entity for how TAAF's non-Antarctic islands are handled) |

### Why this rule exists

Seven nations maintain territorial claims to parts of Antarctica, three of which (UK, Chile, Argentina) physically
**overlap the same land**, and none of which is recognised by the other claimants or by most of the rest of the
world. The Antarctic Treaty does not settle these claims — it freezes them: Article IV explicitly preserves each
party's position without asserting, denying, or enlarging any claim, and prohibits new claims. Unlike the disputed
territories this game DOES show neutrally (Kosovo, Taiwan, Western Sahara, the Falklands, Northern Cyprus, …),
Antarctic claims cannot be shown even neutrally: there is no single "the territory" to display once three
overlapping claims exist, none of the claims has a permanent civilian population or a capital in the ordinary sense
(only rotating research-station personnel), and picking any one claimant's boundary to draw would itself take a
side. Total exclusion, not neutral display, is the only position that takes none.

### Rules

1. **Never add any Antarctic claim** (a code representing territory south of 60°S) as a `TERRITORIES_TO_APPEND`
   entry, a `TERRITORY_GEO_FOR_PARENT`/`territoryParentMap.ts` entry, a `SUBDIVISION_META` entry, or a standalone
   country/territory anywhere in the game — present or future, and regardless of how authoritative the source.
2. **Apply this uniformly to every claimant.** Do not add one nation's Antarctic claim while omitting another's for
   "consistency" — the correct treatment for ALL seven claims is identical total exclusion.
3. **This does not extend to non-Antarctic dependencies** that happen to be administered by the same claimant or
   share an administrative structure with an Antarctic claim (e.g. TAAF's Crozet/Kerguelen/Saint-Paul & Amsterdam/
   Scattered Islands districts, all north of 60°S; Norway's Bouvet Island at ~54°S). Only the literal claim area
   south of 60°S is excluded — a nearby but distinct northern-hemisphere-of-the-Southern-Ocean territory is judged
   on the normal territory-inclusion rules, not swept in by association.
4. **The continent itself remains visible on the world map** as unclaimed, neutral landmass (it already renders
   there via the base topology) — this rule is about the game's subdivision/territory data model (flag grids,
   capitals, playable questions), not about hiding Antarctica's geography entirely.

## Subdivision research — hard rule, do not override without approval

**Before introducing, removing, reclassifying, or changing the tier of any subdivision, you MUST
verify its official status using authoritative sources.** Assumptions based on names, geography,
or analogy to other countries are not acceptable — every entry must be grounded in the actual
legal/administrative framework of the country concerned.

### What to verify

| Action | What to research |
|--------|-----------------|
| Add a new subdivision | Does it exist as a distinct administrative division under the country's own law? What tier is it? |
| Remove a subdivision | Is it truly part of a larger entity (same ISO code, governed under parent's law)? |
| Change type label / tier | What is the subdivision's actual legal status (state, territory, external territory, dependency, etc.)? |
| Add an external territory | Is it governed under national law or the parent state/province's law? (e.g. Lord Howe Island → NSW law, not Commonwealth law) |

### Authoritative sources

- **ISO 3166-2** (iso.org or Wikipedia's per-country ISO 3166-2 article) — official codes and type labels
- **The country's own constitution or territorial legislation** — definitive for status and tier
- **UN LOCODE / UNSD M49** — for statistical groupings
- **Wikipedia's "Administrative divisions of [Country]"** article — good starting point, but cross-check against primary sources

### Hard rules

1. **Never assume** a geographic island or enclave is a distinct administrative subdivision just because
   Natural Earth gives it a separate polygon. Always check the `iso_3166_2` field: if it shares a code
   with a larger entity (e.g. Lord Howe Island → `AU-NSW`), it is part of that entity and must NOT
   appear as a standalone entry in the flag grid.

2. **Never assume** that two subdivisions with the same type label have the same tier. "Territory" can
   mean a self-governing internal territory (e.g. AU-NT), an external territory (e.g. AU-CX), or a
   wholly different concept in another country's framework. Always verify the governing legislation.

3. **Document your source** in a code comment whenever you add or change a type label or tier —
   e.g. `// Governed under Lord Howe Island Act 1953 (NSW), not Commonwealth law`.

## A map's "data loaded" callback must never be able to close a render loop — hard rule, do not override without approval

**A callback prop that hands the parent freshly-built objects, and whose identity is also a
dependency of the effect that calls it, is an infinite render loop.** The parent stores the new
objects in state → re-renders → creates a new callback identity → the effect re-runs → hands the
parent new objects again, forever. React caps it and throws "Maximum update depth exceeded"; before
that it holds the main thread at 100%.

### Why this rule exists

This shipped and was reported (2026-08) as **"selecting a polity in the Learn-mode world map makes
the screen go blank."** `HistoricalMap`'s `onDataLoaded` effect depended on `[data, onDataLoaded]`,
and `LearnPage` passed an **inline arrow** — a new function every render — that called three
setters (`setAvailableHistoricalNames`, `setPolityRulers`, `setDerivedBoundaryNames`) with a Set,
a Map and a Set built fresh on every call. The loop ran on **every historical era, from page load,
with no interaction at all**: measured in the production build, an idle 1945 map burned **5.97 s of
CPU in a 6 s window** (the modern map: 0.10 s). Selecting a polity made it heavier still, because
the cross-era selection-validation effect (which depends on `availableHistoricalNames`) then also
re-ran each iteration and rebuilt `selected` — re-rendering the panel, the ~200 polity paths and
the flag overlay on every pass. `LearnPage` had memoised `onSelect` and `onHover` for exactly this
reason and `onDataLoaded` was left inline.

### Rules

1. **A notify-the-parent effect must depend on the DATA, never on the callback's identity.** Hold
   the callback in a ref (`onDataLoadedRef`, updated in its own effect) and call
   `ref.current(...)` from an effect keyed only on the data. This makes "fires once per data load"
   **structural** — no future caller can reopen the loop by forgetting to memoise. Never move a
   callback prop back into such an effect's dependency array.
2. **Memoise every callback prop passed to a `memo()`'d map component** (`useCallback`, stable
   deps) — `HistoricalMap` and `WorldProgressMap` are both `memo()`'d precisely so unrelated
   `LearnPage` state changes don't re-render a 200-path SVG. An inline arrow silently defeats that.
3. **Never "fix" a loop like this by weakening what the callback sends** (e.g. caching the Set
   identity in the child, or comparing contents in the parent's setters). Those are band-aids over
   a dependency bug; fix the dependency.
4. **Verify with a CPU measurement, not by eye — an idle page that looks fine can still be
   looping.** Open a historical era in the built app, leave it untouched, and confirm the main
   thread is idle (CDP `Performance.getMetrics` → `TaskDuration` growth over a quiet window should
   be a fraction of a second, matching the `today` era; anything approaching wall-clock time is a
   loop). In dev, the console must show **no** "Maximum update depth exceeded".
5. **A blank page must never be the failure mode — keep the top-level `ErrorBoundary`.** The app
   had no error boundary, so React unmounted the WHOLE tree on any uncaught render error and the
   user got the page background, with no message to read and nothing to report. `ErrorBoundary`
   (wrapping everything in `src/main.tsx`, outside the providers so a crash in one is caught too)
   turns that into a card showing the error's own message plus a Reload button — which is also the
   only evidence available when a crash reproduces on a user's device and not ours. Never remove
   it, never move it below the providers, and never replace the message with a generic string: the
   text IS the bug report.

### Enforcement

There is no automated check — the loop needs a running browser and a CPU measurement to see, and it
produces no build, type or lint error (an inline arrow prop is perfectly valid TypeScript). The
guard is this rule plus rule 4's measurement: when reviewing any change to `HistoricalMap`,
`WorldProgressMap` or the props `LearnPage` passes them, confirm no callback prop is inline and no
notify effect lists a callback in its dependency array.

### …and a memoised map handler must list the era data it reads — a stale dep is a wrong answer, not a slow one

**The same dependency lists that keep these callbacks stable will happily serve them the PREVIOUS
era's data. A handler that resolves a click against era-loaded state MUST list that state in its
deps.**

`selectionFromPolityName` reads `polityRulers` and `derivedBoundaryNames`, which are filled in by
`onDataLoaded` — i.e. AFTER the render in which `eraId` changed. With deps of `[eraId,
countryByName]`, `handleHistoricalSelect` kept the closure built during that earlier render, so
every click after an era switch resolved the ruler against the era the user had just left. This
shipped (2026-08, found while fixing the highlight bug below): switching 1938 → 1945 and clicking
**Cambodia** showed "Ruled by **Empire of Japan**" and flew the **Japanese flag** on the 1945 map,
and Annam/Tonkin lost their "Ruled by France" row entirely. Across the era sequence, **253**
polity/transition pairs resolved against the wrong era's ruler.

1. **List every piece of era-loaded state the handler reads** (`polityRulers`,
   `derivedBoundaryNames`, …) in the `useCallback`/`useMemo` deps — or read it through a ref that
   is always current. Cheap: those values change once per era load, when the map re-renders anyway.
2. **Never trade correctness for a stable identity.** `memo()` exists to skip renders, not to serve
   last era's answer. If a dep genuinely must stay out of the list, the value it feeds has to come
   from a ref instead — silently reading a stale closure is not an option.
3. **An inherited flag is the dangerous failure here, not a missing row.** A ruler resolved from
   the wrong era hands a polity a flag from the wrong era — the exact anachronism the historical-era
   flag rule forbids, arriving through a path `flagExistedInEra()` cannot see.
4. **Verify in the running app**: switch era **through the picker** (not by loading the URL
   directly — a fresh load hides this bug), then click a colony and confirm the "Ruled by" row and
   the flag match the NEW era. 1938 → 1945 → Cambodia must say France.

## The map's highlight and the detail panel must always be the same entity — hard rule, do not override without approval

**Whatever the Learn-mode panel and flag grid describe is what the map highlights. A map component
must take ONE highlight input, so the two can never name different polities.**

### Why this rule exists

This shipped and was reported (2026-08) with a screenshot: the panel and the selected flag card both
said **Annam** (with the French tricolour) while the map painted the **Philippines** in the selection
colour. Two resolutions of the same pair of states disagreed —

| Consumer | Resolution |
|---|---|
| `LearnPage` panel + flag grid | `const display = selected ?? hovered` — **selection wins** |
| `HistoricalMap` (old) | `hoveredName ?? selectedName` — **hover wins** |

— so hovering one polity while another was selected recoloured the map without touching the panel.
On touch it was permanent: a tap fires `mouseenter`, nothing ever fires the matching `mouseleave`,
so the stale hover simply stayed. `WorldProgressMap` never had the bug: it highlights `selectedCode`
alone and leaves hover to the CSS `:hover` brightness on
`.world-map__country--selectable`.

### Rules

1. **A map component takes exactly one highlight input.** `HistoricalMap` has `selectedName` and no
   `hoveredName`; the parent passes `display.name`, the same value the panel renders from. Never
   add a second highlight prop that can outrank it — that is the bug, and a comment saying "hover is
   transient" is not a defence, because on touch it isn't.
2. **Hover feedback must not use the selection's own treatment.** The shared CSS brightness is the
   hover affordance on both maps. Anything stronger has to be visibly a different thing.
3. **Hover-to-preview still works, and stays consistent, for free**: with nothing selected,
   `display` IS the hovered entity, so the map highlights exactly what the panel is previewing.
4. **This applies to every map** — world, historical, subdivision — and to any future one: derive
   the highlight from the single value the panel shows, never from a second source of truth.
5. **Verify in the running app** (the mandatory visual-verification rule applies): select a polity
   from the flag grid, then hover a different one on the map, and confirm the map still highlights
   the selected one and the panel still describes it.

### Enforcement

No automated check — it needs a rendered map and a synthesised hover. The guard is the structure
(one prop) plus rule 5. When reviewing any change to `HistoricalMap`, `WorldProgressMap`,
`SubdivisionMap` or the props `LearnPage` passes them, confirm no second highlight input has been
reintroduced and no consumer resolves `hovered`/`selected` in the opposite order to the panel.

## Every rendered subdivision must be selectable — geo and meta must not drift — hard rule, do not override without approval

**If a subdivision is drawn on the subdivision map (it has a polygon in
`public/subdivisions/{CC}.json`), clicking it MUST select it.** Selection resolves the clicked
GeoJSON code against `SUBDIVISION_META[CC].divisions` (see `LearnPage`'s subdivision `onSelect`); if
the code is absent from the meta, the click silently no-ops — the area doesn't highlight and the
panel doesn't update, so the subdivision looks broken/unselectable.

### Why this rule exists

This shipped and was reported (2026-07): **Xinjiang (`CN-XJ`) and other provinces were unselectable**
even though they rendered. Root cause: the meta generator (`scripts/build-subdivision-meta.mjs`)
skipped custom placeholder island codes by matching `divCode.includes('-X')` — which **also matched
every legitimate ISO 3166-2 code that merely starts with X** (Xinjiang `CN-XJ`, Xorazm `UZ-XO`, Laos
`LA-XA/XI/XE`, Azerbaijan `AZ-XAC/XIZ/XCI/XVD/XA`), dropping them from `SUBDIVISION_META`. Real
placeholder codes are `-X` **followed by a digit** (`CN-X01~`, `AU-X03~`, `AI-X00`); legitimate ones
are `-X` **followed by a letter**. The generator now uses `/-X\d/` and must never revert to a broad
`-X` match.

### Rules

1. **Never filter subdivisions by a broad `-X` / `X`-prefix match.** Only `-X` + a **digit** (or a
   trailing `~`) is a custom placeholder/disputed code. An ISO 3166-2 code whose subdivision part
   starts with `X` + a **letter** is a real subdivision and MUST appear in `SUBDIVISION_META`.
2. **Geo and meta must stay in sync.** Every non-placeholder subdivision code in
   `public/subdivisions/**` MUST have a matching `SUBDIVISION_META` entry. This is enforced by
   `scripts/check-subdivision-meta-coverage.mjs` (run by `npm run flags:check` and the
   `flag-integrity` CI workflow on any change to the geo files, the meta, or the generator). Never
   weaken or bypass it; if it fails, re-run `node scripts/build-subdivision-meta.mjs` and fix the
   generator rather than the check.
3. **Selection must degrade gracefully, never silently.** `LearnPage`'s subdivision `onSelect` falls
   back to synthesizing a minimal entry from the GeoJSON feature when the meta lacks the code, so a
   rendered subdivision is always selectable even under drift. Never remove that fallback or gate
   selection solely on a meta lookup that can silently miss.
4. **Verify in the running app** (the mandatory visual-verification rule applies): with a country's
   subdivisions shown, click a subdivision whose code starts with X (e.g. China → Xinjiang) and
   confirm it highlights and the panel updates — not just that a name popover appears.

## Flag grid ordering — hard rule, do not override without approval

When a country's subdivision flag grid is grouped **by type** (the default when multiple
types exist), the groups **must** appear in this fixed tier order:

| Tier | What goes here | Examples |
|------|---------------|---------|
| **0 — primary subdivisions** | The country's core administrative divisions | Countries (England, Scotland…), States, Provinces, Regions, Departments, Prefectures |
| **1 — external/dependent territories** | Dependencies or territories outside the mainland | Crown Dependencies, Overseas Territories, Overseas Collectivities, Autonomous Territories, Special Administrative Regions, Constituent Countries, Associated States |
| **2 — disputed/claimed territories** | Subdivisions whose `isDisputed` flag is set | Falkland Islands (from UK), Gibraltar (from UK), Malvinas (from Argentina) |

**Hard rules:**

1. Tier 0 groups (primary subdivisions) must **always** appear above tier 1 groups (external territories), regardless of how many items are in each group. This prevents a large number of overseas territories from visually displacing the main constituent divisions.
2. Disputed/claimed territory groups must **always** appear last (tier 2), also regardless of count.
3. Within each tier, groups are sorted largest first (by item count), then alphabetically by type label.

**Enforcement:** `DEPENDENCY_TYPES` in `src/components/SubdivisionFlagGrid.tsx` lists the
known tier-1 type labels. Any new external-territory type added to `TERRITORIES_TO_APPEND`
in `scripts/build-subdivision-meta.mjs` must also be added to `DEPENDENCY_TYPES` if it
should appear below primary subdivisions.

### Administering-nation rule — disputed territories always use typeLabel "Disputed Territory"

A disputed/claimed territory **must always** use `typeLabel: "Disputed Territory"` in
`subdivisionMeta.ts`, regardless of whether it is shown under the **administering/recognising**
nation or the **claiming** nation. This is what places the territory in the tier-2 "Disputed
Territory" group in the flag grid and causes the card to show the "(disputed territory)" label.

**Never** invent a different typeLabel (e.g. `"Recognised State"`, `"Claimed State"`,
`"Administered Territory"`) to reflect a nation's political relationship with the territory.
Those details belong in `DISPUTED_SUBDIV_NOTES` (the detail-panel note), not in `typeLabel`.

The card-level label text (e.g. "disputed territory" vs "unofficial flag") is controlled
entirely by `getSubdivisionDisputeLabel()` via the `isUnofficial` list and the
`parentCountryCode` argument — **not** by `typeLabel`. Do not change `typeLabel` to fix
a card label; change the label logic instead.

| Nation | Territory | typeLabel | Card label | Group heading |
|--------|-----------|-----------|------------|---------------|
| UK (administers) | Falkland Islands `GB-FK` | `Disputed Territory` | (disputed territory) | Disputed Territory |
| UK (administers) | Gibraltar `GB-GI` | `Disputed Territory` | (disputed territory) | Disputed Territory |
| Türkiye (recognises) | N. Cyprus `TR-NC~` | `Disputed Territory` | (disputed territory) | Disputed Territory |
| Cyprus (claims) | N. Cyprus `CY-NC~` | `Disputed Territory` | Flag not officially recognised by Cyprus | Disputed Territory |
| Argentina (claims) | Malvinas `AR-ML~` | `Claimed Territory` | (hidden via hierarchy — no card shown) | — |

`AR-ML~` and `ES-GIB~` are the only exceptions to `"Disputed Territory"` — they use
`"Claimed Territory"` because they are **hidden** from their claimant's flag grid entirely
via `DISPUTED_TERRITORY_HIERARCHY` and are never rendered as visible cards.

## Subdivision map default view — hard rule, do not override without approval

**When the user first lands on a country's subdivision map, EVERY subdivision the country
has must be inside the viewport — including all distant overseas departments and territories.**
The user sees specific parts of the country **only** by choosing to zoom/pan. The default
(unzoomed) view must never crop out any subdivision.

### Rule

`SubdivisionMap.tsx` fits the Equal Earth projection (`fitExtent`) to **all** features in
`geoData.features`. **Never** filter the feature set passed to `fitExtent` down to a
"main-country-only" subset (e.g. by excluding `_isTerritory` features). Doing so hides a
country's overseas subdivisions on landing.

```ts
// CORRECT — fit to every feature so all subdivisions are visible on landing
const fitFeatures = geoData.features;

// WRONG — hides France's overseas departments (French Guiana, Guadeloupe,
// Martinique, Réunion, Mayotte), New Caledonia, French Polynesia, etc.
const mainFeatures = geoData.features.filter(f => !f.properties._isTerritory);
const fitFeatures = mainFeatures.length > 0 ? mainFeatures : geoData.features;
```

### Why this keeps getting reverted (do not repeat)

This was implemented in #228 (commit `c151303`, "show all subdivisions including distant
territories"), then **wrongly reverted** in commit `65337d9` which re-added an `_isTerritory`
filter to avoid a "tiny mainland speck" for the UK. That revert broke France: only metropolitan
France rendered and all five overseas departments disappeared. The trade-off is intentional —
**a small-but-complete view always beats a large-but-incomplete one.** Features too small to
see at the fitted scale are kept discoverable by the constant-size dot indicators
(`smallSubdivCodes`), so nothing is ever truly invisible.

### Verification

When changing anything in `SubdivisionMap.tsx`'s projection/`fitExtent` logic, open France's
subdivision map in the running app and confirm all five overseas departments (French Guiana,
Guadeloupe, Martinique, Réunion, Mayotte) plus the overseas collectivities are visible (as
polygons or dots) on the default, unzoomed view — not just metropolitan France.

## Natural Earth topology and projection — hard rule, do not override without approval

The world map uses the Natural Earth 50m topology bundled at `public/countries-50m.json`
and renders it with the Equal Earth projection (`geoEqualEarth()` from `d3-geo`).

### Rules

1. **Never** replace `public/countries-50m.json` with a different topology file or resolution
   without explicit approval. The 50m resolution was chosen over 110m for better border accuracy,
   and specific polygon adjacency in this file is relied on by the disputed-territory rendering
   (e.g. Morocco and Western Sahara share exact boundary arcs; Crimea is extracted at runtime).

2. **Never** change the map projection from Equal Earth (`geoEqualEarth()`). This is the
   canonical projection for the entire game — it must be used on every map view, present and future.

3. **Never** clip, simplify, or alter country polygon geometries in the topology file or at
   runtime, **except** for the two documented runtime adjustments in `WorldProgressMap.tsx`:
   - **Crimea extraction**: extracted from Russia's MultiPolygon into a separate `DISPUTED_CRIMEA` feature.
   - **Western Sahara / Morocco border fix**: Natural Earth 50m puts the Moroccan-controlled Southern
     Provinces inside Morocco's polygon (MA) and only gives EH the Polisario Free Zone. At runtime
     the component clips MA at ~27.657°N (the internationally recognised Morocco-WS border) and unions
     the clipped area with EH so that the full Western Sahara territory renders as EH.
   Any additional runtime geometry adjustment must be documented here AND inline in the code.

4. Morocco (id=504) and Western Sahara (id=732): Natural Earth 50m assigns the Moroccan-controlled
   Southern Provinces to MA and only the Polisario Free Zone to EH. A runtime clip at 27.657°N
   corrects this so MA = Morocco proper and EH = full WS territory. EH renders with
   `palette.disputedLand` (not `palette.land`) to remain visually distinct from both ocean and
   regular country fills, and is excluded from `UNDISPUTED_TERRITORY_PARENT` so it is non-clickable.

## No ISO code abbreviations in user-facing text — hard rule, do not override without approval

**Never use bare ISO country codes (e.g. `GB`, `FR`, `US`, `AU`) in any string that is
displayed to the user.** This applies to: flag labels, subdivision labels, tooltip text,
heading text, aria-labels, and any other visible or screen-reader-accessible string.

### Where this matters most

The `COUNTRY_NAME` map in `src/lib/disputedSubdivisions.ts` drives the label
**"Flag not officially recognised by X"**. Every country that has unofficial or
disputed subdivision flags shown in its grid **must** have a full English name entry
in that map. The key must be the ISO 3166-1 alpha-2 code (`GB`, not `UK`), but the
**value** must be the full name (`"the United Kingdom"`, never `"GB"`).

### Rules

1. `COUNTRY_NAME` must be keyed by ISO alpha-2 (`GB`, `FR`, `US`, …) — **not** by the
   colloquial two-letter abbreviation (`UK`) which is not a valid ISO 3166-1 code.
2. Whenever a new unofficial or disputed flag is added to `UNOFFICIAL_SUBDIV_NOTES`
   or `DISPUTED_SUBDIV_NOTES` in `src/lib/disputedSubdivisions.ts`, add the parent
   country to `COUNTRY_NAME` with its full English name at the same time.
3. Audit the rendered label in the browser before pushing: open the parent country's
   flag grid, select the unofficial/disputed subdivision card, and confirm the label
   reads "Flag not officially recognised by [full name]", not a bare code.

### Enforcement

If `COUNTRY_NAME` is missing an entry for a parent country, `getSubdivisionDisputeLabel`
silently falls back to the raw ISO code (`parentName = parent ?? ""`). The only way to
catch this is the visual verification step — there is no automated check. Add the
visual check to every PR that touches `disputedSubdivisions.ts` or `unofficialSubdivFlags.ts`.

## Sub-national flags menu must match the game exactly — hard rule, do not override without approval

**The Flag Master "Sub-national flags" picker must only offer countries that have at least one
playable flag, and the count it shows must equal the number of flags the game will actually quiz.**

A country only belongs in the picker if it contributes **playable** subdivision flags. A
subdivision is *playable* when **all** of the following hold (this is the single source of truth,
implemented in `getPlayableSubdivisions()` in `src/lib/playableSubdivisions.ts`):

1. it has a distinct flag — `hasSubdivisionFlag(code)` is `true`;
2. it is **not** a disputed-territory hierarchy child (`code in DISPUTED_TERRITORY_HIERARCHY`) —
   those redirect to a parent subdivision and are never standalone questions; and
3. its ISO code has not already been counted (the source data occasionally lists a code twice).

### Rules

1. **Never list a country with zero playable flags** in the `SUBNATIONAL_COUNTRIES` dropdown in
   `src/components/AllFlagsSetupModal.tsx`. Filtering on `SUBDIVISION_META[code] != null` alone is
   **wrong** — it let flagless countries (e.g. Afghanistan, whose 34 provinces have no flags)
   appear and drop the player into an empty "No sub-national flags available" game. Always also
   require `playableSubdivisionFlagCount(code) > 0`.

2. **Never display the raw `divisions.length`** as the menu count. Show
   `playableSubdivisionFlagCount(code)` — the count of flags the game will actually ask about.
   The label reads `N flag(s)`; do not append an extra plural "s" to the already-plural
   `pluralLabel` (that produced the "provincess" bug).

3. **Never duplicate the playable-flag filter inline.** Both the menu and the game
   (`useSubdivisionGame` in `src/hooks/useSubdivisionGame.ts`) **must** call
   `getPlayableSubdivisions()` / `playableSubdivisionFlagCount()`. If the filter logic ever needs
   to change, change it in `src/lib/playableSubdivisions.ts` only, so the menu and the game can
   never drift apart.

### Enforcement

There is no automated check. When reviewing any PR that touches `AllFlagsSetupModal.tsx`,
`useSubdivisionGame.ts`, or `playableSubdivisions.ts`, confirm the dropdown is filtered by
`playableSubdivisionFlagCount(code) > 0` and that both the menu and the game derive their
division set from `getPlayableSubdivisions()`. Verify in the running app that a known flagless
country (Afghanistan) is absent from the picker and that a listed country's "N flags" count
matches the number of questions the game then asks.

## Card labels must never break a word mid-letter — hard rule, do not override without approval

**No text label on a fixed-width card may wrap a single word across lines mid-letter** (e.g.
"Johannes" / "burg"). A word must always stay intact on one line; only spaces (and an existing
hyphen in a compound name like "KwaZulu-Natal") are break opportunities. This shipped and was
reported (2026-07): "Johannesburg" wrapped to "Johannesbur" / "g" on a narrow phone card in the
Learn-mode hierarchy chart.

### Why it happened

`.hierarchy__name` used `overflow-wrap: anywhere`, which lets the browser break a word between any
two characters when it is wider than the fixed-width card (96px on phones). The right behaviour is
to keep the word whole and shrink it to fit, not to split it.

### This applies to EVERY card label, not just the hierarchy — not a one-off

This is a **general** rule for **every** fixed-width card that shows a place/country/subdivision/city
name, present and future — the flag grid, the sub-national flag grid, the city-flags grid, the
hierarchy chart, and any new one. It is **not** a per-screen patch: fixing only the screen where a
wrap was reported is a violation. When you touch or add any such label, apply the shared solution.

### Rules

1. **Never** use `overflow-wrap: anywhere` / `overflow-wrap: break-word` / `word-break: break-all`
   (or `hyphens: auto`) on a card name label. Every such label MUST keep
   `overflow-wrap: normal; word-break: normal; hyphens: none;` so a word is never split mid-letter.
   (`.hierarchy__name`, `.flag-grid__name`, `.flag-grid__name-text` all follow this.)
2. **A single word too wide for its card is kept whole and SHRUNK to fit**, never truncated or
   wrapped. This is the SHARED **`AutoFitName`** component (`src/components/AutoFitName.tsx`): it caps
   the label at the card width (`max-width: 100%`) and steps the font size down (to a ~0.56× floor)
   only while a single word overflows horizontally (`scrollWidth > clientWidth`); multi-word names
   still wrap at spaces and keep the base size. **Every** card grid that can receive a long
   single-word name renders its name through `AutoFitName` — the flag grids (`FlagGrid`,
   `SubdivisionFlagGrid`, `CityFlagGrid`) and the hierarchy chart do. Any NEW card label that can
   receive a long single word MUST use `AutoFitName` too (wrap only the name text; keep any
   sub-label/tag as a sibling so it is measured separately).
3. **Verify in the running app at phone width** (the mandatory visual-verification rule applies):
   the longest single-word names — Johannesburg, Pietermaritzburg, Antananarivo, Liechtenstein —
   render whole on one line in the flag grid AND the hierarchy chart, neither wrapped mid-word nor
   clipped.

### Enforcement

There is no automated check (it needs layout measurement in a real browser). The guard is this rule
plus rule 3's visual check: when reviewing any change to a card name label, confirm it does not
reintroduce `overflow-wrap: anywhere`/`break-word`, that the name renders through `AutoFitName`, and
that long single words still fit whole in every affected grid.

## Modals with a text input must blur it before closing — hard rule, do not override without approval

**On mobile WebKit/Chrome, a stuck "keyboard accessory toolbar" (autofill field-navigation
chevrons, voice input, hide-keyboard) can float over the page, overlapping whatever is scrolled
underneath — including our own fixed `.bottom-nav` — if a focused text input is removed from the
DOM (a modal closing/unmounting) before the browser has processed a blur.** This is what a user
reported as "the bottom keeps showing a bug when users scroll": after using the country search
(`CountryDropdown`) or the profile picker (`ProfilePickerModal`), the OS's leftover keyboard
toolbar appeared stacked above the app's bottom-nav while scrolling the flag grid.

### The fix — `blurActiveElementThenRun` in `src/lib/dismissKeyboard.ts`

Calling `.blur()` on the focused input **synchronously, before** the React state update that
unmounts it, gives the browser a clean signal to dismiss the toolbar; deferring the actual state
update by one tick (`setTimeout(fn, 0)`) gives it time to do so. `document.activeElement` being
implicitly blurred by node removal (the old behaviour) is too late — by then the toolbar has
already detached from a live input.

### Rules

1. **Every modal/overlay that contains a `text`/`search` input MUST close exclusively through a
   handler that calls `blurActiveElementThenRun(...)`** — never call the modal's `setOpen`/
   `setModalOpen`/`onClose` directly from a click handler, backdrop click, Escape-key handler, or
   "select an option" handler while that input could still be focused. This applies today to
   `CountryDropdown.tsx`, `SubdivisionDropdown.tsx` (their mobile search modal) and
   `ProfilePickerModal.tsx` (the profile name field in the add/edit views) — see their `closeModal`
   / `closeAndBlur` helpers for the pattern to copy.
2. **Any new component that opens a modal/sheet/overlay containing a `text` or `search` input**
   (now or in the future) must follow the same pattern: wrap every path that can close the modal
   or navigate away from the view holding the focused input in `blurActiveElementThenRun`.
3. **Never** revert to calling the raw state setter (`setModalOpen(false)`, `onClose()`,
   `setView(...)`) from a closing path once it has been wrapped — that reintroduces the exact bug.

### Why this isn't caught by an automated check

The stuck toolbar is an OS/browser-level rendering artifact — headless Chromium (used for the
mandatory visual-verification checklist) cannot reproduce it, so there is no automated test for
it. The verification that **is** possible: confirm the modal's input is the focused element while
open, then confirm focus has moved off it (not just "the modal is gone") immediately after every
closing action, in the running app or via the dev tools / Playwright `document.activeElement`
check.

## A listed profile must always be selectable — hard rule, do not override without approval

**Every profile shown in the "Who's playing?" picker (`ProfilePickerModal`) MUST be selectable.
Tapping a visible profile must never dead-end with "That profile could not be loaded."** Showing a
profile the user cannot actually pick is the profile-feature equivalent of the "never show the parent
nation's flag" bug — the UI advertises something it can't deliver.

### Why this rule exists

The picker gets its list from `subscribeToAllProfiles()` in `src/lib/profileStore.ts` — a live
Firestore collection query that reads **every profile's full document**. Selecting a profile,
however, goes through `activateProfileByCode()` → `fetchProfile()`, which issues a **separate,
single-document `getDoc` time-boxed to 4 s with no retry**, then falls back to this device's local
cache. For a profile created on **another device** (the whole point of the "☁️ Synced across
devices" model), that document is **not** in this device's local cache, so if the one `getDoc` is
slow/flaky or transiently fails, `fetchProfile` returns `null` and the user gets **"That profile
could not be loaded."** for a profile sitting right there in the list. This shipped and was reported
via screenshots (2026-07): "Hana", created on another device, appeared in the picker but could not be
loaded.

### Rules

1. **The list source and the load source must never be able to disagree about what's loadable.**
   Because `subscribeToAllProfiles()` already reads each profile's full document, it **MUST**
   `cacheProfileLocally()` every profile it lists. That guarantees `fetchProfile()`'s local-cache
   fallback can always resolve any profile the picker shows — even offline, even cross-device, even
   when the per-profile `getDoc` fails. Do **not** reduce that subscription back to mapping only
   `{id, displayName, avatarId}` without caching the full doc (`fromRemote(...)` → `cacheProfileLocally(...)`);
   that reintroduces this exact dead-end.
2. **Never make a profile appear in the picker from a data path that the loader cannot also
   resolve.** If you add a new way to list profiles, ensure the corresponding load path (or the
   local cache) can always return that profile's full data. A profile the user can see but cannot
   pick is always a bug.
3. **A load failure must degrade honestly, not silently.** `fetchProfile` returning `null` for a
   listed profile indicates a broken invariant (rule 1) — fix the invariant, do not paper over it by
   hiding the error or by activating a hollow profile with empty flag lists (that would silently lose
   the user's saved/learned flags).

### Verification

Open the picker in the running app with at least one profile that exists in Firestore but is **not**
in this device's local cache (simulate by clearing `localStorage` keys prefixed
`flagGame.profile.` while leaving the Firestore doc intact, then reloading). Confirm the profile
still appears **and** selecting it activates successfully with its saved/learned flags — no "That
profile could not be loaded." message. There is no automated check for this (it needs a live
Firestore + a second device); the invariant in rule 1 is the guard, and this manual check confirms it.

## National anthems must autoplay at the best resolution — hard rule, do not override without approval

**When the user opens the National Anthem player (`NationalAnthemPlayer`, used in
`src/pages/LearnPage.tsx`), the anthem MUST start playing automatically, and YouTube-backed
anthems MUST request the highest resolution available.** Both behaviours have been implemented and
have silently regressed before — this rule locks them in.

### Why this rule exists

- **Autoplay:** the player mounts and a YouTube player is created asynchronously. If the user taps
  "Play" before `onReady` fires, the imperative `play()` call hits a `null` player and the tap is
  lost; the later `onReady` then runs *outside the user gesture*, where browsers block
  autoplay-with-sound, so nothing plays. The fix records the intent (`pendingPlayRef`) and replays
  it in `onReady`.
- **Resolution:** `setPlaybackQuality('highres')` on its own is a **no-op** on the modern YouTube
  IFrame API — it was called but never actually forced HD. The player auto-selects quality, so we
  must request the highest level the player reports.
- **YouTube failure must never dead-end:** a YouTube embed can fail at runtime — the video was
  removed (error 100), the owner disabled embedding (101/150), or it is region/VPN-blocked. The
  player used to show a terminal "YouTube video could not be loaded" message and play nothing. Since
  194/195 anthems also carry a Wikimedia `wikiFile` (and the resolver can search by name), the player
  MUST fall back to the Wikimedia audio source instead of dead-ending.

### Rules — in `src/components/NationalAnthemPlayer.tsx`

1. **Autoplay must survive the load race.** The YouTube `onReady` handler MUST call `playVideo()`
   when **either** `visibleRef.current` **or** `pendingPlayRef.current` is set, and the imperative
   `play()` MUST set `pendingPlayRef.current = true` when the player isn't ready yet. Never reduce
   this back to a plain `if (ytp) ytp.playVideo()` that drops the tap. Keep `autoplay: 1` in
   `playerVars`.
2. **Always request the best resolution.** Use the `forceHighestQuality()` helper — which reads
   `getAvailableQualityLevels()` (ordered highest → lowest) and pins the top level via
   `setPlaybackQualityRange` + `setPlaybackQuality` — in `onReady`, on the `PLAYING` state change,
   and in `onPlaybackQualityChange`. Keep `vq: "hd1080"` in `playerVars`. **Never** delete these or
   revert to a bare `setPlaybackQuality('highres')` call (it does nothing on its own).
3. **YouTube errors must fall back, not dead-end.** The YouTube `onError` handler MUST set the
   `youtubeFailed` state (which flips `isYoutube` to `false` and re-runs the Wikimedia fetch effect),
   NOT set a terminal `audioError`. Reset `youtubeFailed` whenever the anthem changes so each new
   country re-attempts its YouTube embed first. Never revert `onError` to a bare
   `setAudioError("YouTube video could not be loaded.")` that plays nothing.
4. **Verify in the running app** (the mandatory visual-verification rule applies): open a country in
   Learn mode, tap Play, and confirm the anthem starts on its own and the YouTube gear/quality shows
   the highest level the video offers.

## Anthem lyrics must be complete and per-line aligned — hard rule, do not override without approval

**The lyrics shown under the anthem player (`lines` in `src/data/nationalAnthems.ts`) are a static
fact-sheet of the anthem's text. They MUST be the complete official lyrics, and every line's `textEn`
translation MUST correspond to that exact line.** Two real defects motivated this rule (2026-06):

- **Brazil (`BR`):** the refrain that closes Part I ("Terra adorada, Entre outras mil… Pátria amada,
  Brasil!") — sung twice in the anthem — was carried only once, and two consecutive lines
  ("Brasil, de amor eterno seja símbolo" / "O lábaro que ostentas estrelado,") had their English
  translations **swapped**, so each line sat above a translation belonging to its neighbour.
- **Japan (`JP`):** from line 2 the English translations were **shifted by one line** (each line
  carried the next line's meaning), ending with "lush with moss" duplicated.

### Rules

1. **Complete text.** Include every officially-sung stanza and refrain, in order — including refrains
   that repeat to close more than one part of the anthem. Do not drop a stanza because a particular
   recording abbreviates it; the lyrics are the reference text, not a transcript of one video.
2. **Per-line translation alignment.** `textEn[i]` must be the translation of `text[i]` — never the
   previous/next line's translation, never two original lines merged into one line's translation with
   the rest shifted. A repeated original line must carry the *same* translation everywhere it appears.
3. **Authoritative source only.** Anthem lyrics and their translations are public-domain text or
   established published translations — never invent, paraphrase to fill a gap, or machine-translate a
   missing line (same spirit as the "never generate flag content" rule). If a faithful translation for
   a line is unavailable, leave `textEn` off that line rather than guess.
4. **Singable-version anthems** (where `textEn` is the official singable English mapped by verse, not a
   literal per-line gloss — e.g. Tuvalu) are listed in `SINGABLE_TRANSLATION_EXEMPT` in the check
   script. Keep that list tiny and documented; it is **not** a place to silence a genuine misalignment.

### Enforcement

`scripts/check-anthem-lyrics.mjs` (`npm run anthems:check-lyrics`, and the `anthem-lyrics` CI
workflow on any PR touching `nationalAnthems.ts`) loads all 195 anthems and **fails the build** on:
empty line text; a repeated line whose translations differ by more than case/punctuation; one
translation cross-wired onto two substantially-different original lines (the swap/shift fingerprint —
this is what caught the Japan bug); and an untranslated line (`textEn` identical to `text`) on a
non-English anthem. **This check cannot detect a swap that keeps proper nouns aligned (it did not
catch Brazil) nor a missing stanza** — so it is a safety net, NOT a substitute for verifying
completeness and alignment against the authoritative lyrics whenever anthem `lines` are added or
edited. Never weaken a threshold or add an anthem to the exempt list to make a real misalignment pass.

## Flag-meaning explanations must be sourced and must separate myth from fact — hard rule, do not override without approval

**The Learn-mode flag-meaning disclosure — the "What this flag means" progressive-disclosure expander
rendered below the flag image in the country/subdivision widget (`src/components/FlagMeaning.tsx`,
data in `src/data/flagMeanings.ts`) — explains flag symbolism for BOTH national and subnational
flags. Every explanation MUST come from an authoritative source and MUST distinguish myth from fact.**

### Why this rule exists

Flag "meanings" are a magnet for folk-etymology: colours are routinely given patriotic meanings that
were invented long after the flag, or retro-fitted to erase an inconvenient origin. The reference case
is Brazil — the near-universal belief that its green means "forests" and yellow means "gold" is a myth
deliberately popularised in 1889 to erase the flag's monarchical (Braganza/Habsburg) origin. Presenting
such a claim as fact would be the same class of error as inventing flag SVG content or fabricating
anthem lyrics. This feature must teach the difference, never launder the myth.

### Rules

1. **Never fabricate, guess, paraphrase-to-fill, or machine-generate** a flag meaning — same spirit as
   the "never generate flag content" and "anthem lyrics must be authoritative" hard rules. If a meaning
   cannot be sourced, omit the entry entirely; a flag with no explanation is always better than an
   invented one.
2. **Every entry MUST carry at least one authoritative `sources` citation** (an official government /
   vexillological authority, or the flag's referenced encyclopaedia article — never a blog, forum, or
   AI output), each with a real `http(s)` URL.
3. **Myth vs fact must be explicit.** Any widely-believed symbolism that is folk-etymology,
   retro-fitted, or disputed MUST go in the entry's `myths` array (each a `claim` plus a sourced
   `reality`) and be rendered as myth — never mixed into `description` as established fact. The Brazil
   "green = forests, yellow = gold" case is the canonical example.
4. **Data lives only in `src/data/flagMeanings.ts`**, keyed by ISO 3166-1 alpha-2 (nations) or ISO
   3166-2 subdivision code (subnationals) — never inlined into a component. Coverage is an
   incrementally-growing curated set; expanding it means adding sourced rows, not lowering the bar.
5. **Verify in the running app** (the mandatory visual-verification rule applies): open a country and a
   subdivision that have entries, expand the disclosure, and confirm the description, the myth/fact
   separation, and the working source links all render.

### Enforcement

`scripts/check-flag-meanings.mjs` (run by `npm run flags:check` and the `flag-integrity` CI workflow on
any PR touching `flagMeanings.ts` or the script) **fails the build** if any entry has an empty
`description`, no `sources`, a source with an empty title or a non-`http(s)` URL, or a malformed myth
(missing `claim`/`reality`). Like the anthem-lyrics check it is a **safety net** — it cannot tell a
sourced fact from a plausible fabrication, so it never replaces verifying each claim against its cited
source by hand. **Never** weaken the check, and never add an entry whose claims you have not confirmed
against the cited source.

## Every newly bundled flag MUST get a flag-meaning search in the SAME change — hard rule, do not override without approval

**Whenever a flag file is newly bundled, un-suppressed, or replaced in the game — national, subdivision,
or capital-city — you MUST search for its sourced symbolism and add a `flagMeanings.ts` /
`cityFlagMeanings.ts` entry (or record why one is genuinely unsourceable) in that SAME change. Shipping
the flag image without doing this search is a bug, not a follow-up task.**

### Why this rule exists

This shipped and was reported (2026-07-28): the PR that fixed Saint Helena's missing flag (bundling
`GB-SH`, plus `FR-YT` Mayotte and `SO-SL~` Somaliland, all previously blocked on Wikimedia egress) made
all three flags render — but shipped with no "What this flag means" entry for any of them, because
bundling the image and sourcing its meaning were treated as two separate tasks. The owner had to report
"Flag explainer is missing" as a second bug before the omission was noticed and fixed in a follow-up PR.
This is the flag-meaning sibling of the "newly surfaced entity must be COMPLETE" rule — a flag that
renders with no explainer is an incomplete entity, exactly like a capital with no population row.

### Rules

1. **The flag-meaning search is part of "adding a flag," not a separate task.** Any change that adds a
   new `LOCAL_FLAG_OVERRIDES` entry, removes a code from `SUPPRESSED_SUBDIVISION_FLAGS`, bundles a new
   `public/flags/**` file, or adds/refreshes a capital-city flag in `capitalFlags.ts`, MUST in the same
   change check whether `flagMeanings.ts` (national/subnational) or `cityFlagMeanings.ts` (capital
   cities) already has an entry for that code — and if not, search for one before ending the task.
2. **Search authoritative sources before concluding a meaning is unsourceable** — at minimum the flag's
   own Wikipedia article (`Flag of X`) and, for a coat-of-arms-based flag, the arms' own article
   (`Coat of arms of X`); for capital-city flags follow the deeper-source discipline (FOTW, local-language
   Wikipedia, Commons blazon) already mandated by the flag-meaning-coverage and capital-meaning-sweep
   rules above. Do not stop at "no meaning" after a single English-Wikipedia glance.
3. **A genuinely unsourceable flag is fine to ship without an entry** — same "missing is honest, invented
   is not" discipline as every other sourcing rule here. What is never fine is *not looking*.
4. **This applies retroactively to gaps found in already-bundled flags too**: if you notice an existing
   bundled flag has no `flagMeanings.ts`/`cityFlagMeanings.ts` entry while touching related code, treat
   closing that gap as part of the completeness contract, not out of scope.
5. **A 404 on a guessed URL is never proof a source doesn't exist — hard sub-rule.** This shipped wrong
   (2026-07-29): PR #810 omitted Saint Helier's (`GB-JE`) capital flag citing FOTW page `je-sh.html` as
   evidence "no page" documents it — but `je-sh.html` was a guessed filename that 404s; the REAL page,
   linked from the Jersey parish index (`je-.html`), is `je-xhe.html`, and it documents the flag's
   symbolism in full. Before citing a dead/guessed FOTW URL as proof of absence, you MUST find that
   country/subdivision's FOTW **index page** (e.g. `je-.html`, `gg-.html`) and follow its actual link —
   never conclude "no page" from a URL you typed from memory or pattern-guessed.
6. **Read the FULL source article, not just its lead/summary — hard sub-rule.** The same audit found
   `GB-BM` (Hamilton, Bermuda) wrongly omitted with the reason "en.wikipedia's Hamilton, Bermuda article
   does not describe the arms" — but the article's own "Coat of arms and flag" section (below the lead)
   documents the ship, cinquefoils, supporters and motto in detail. A short API "extract"/summary fetch
   is not the full article; before concluding a Wikipedia article has no symbolism section, read past the
   lead for a "Coat of arms" / "Flag" / "Symbols" / "Heraldry" heading.
7. **Verify in the running app** (the mandatory visual-verification rule applies): open the newly
   bundled flag's card and confirm the "What this flag means" expander is present and renders the sourced
   description — not just that the flag image itself is correct.

### Enforcement

There is no automated check that a *newly bundled* flag has a matching meaning entry (the existing
`check-flag-meanings.mjs` only validates entries that exist; it cannot detect one that's silently
missing) — that half of this rule is still guarded by rule 7's visual check plus PR review, not a script.
**Rules 5 and 6 (a citation must actually resolve/actually have been read) DO have a mechanical guard,
because a dead-URL citation is objectively checkable:** `scripts/audit-omitted-capital-reasons.mjs`
(`npm run capitals:audit-omissions`) and `scripts/audit-omitted-flag-reasons.mjs`
(`npm run subdiv:audit-omissions`) each extract every `crwflags.com/fotw/…` or `fotw.info/…` URL cited in
an omission reason and fetch it — **fails if any cited URL returns 404** (this is exactly the check that
would have caught the `je-sh.html` citation). A network error (no egress in the running environment) is
reported as a skipped warning, never a failure, since it's inconclusive rather than proof of a dead link.
This cannot verify a citation was read *correctly* (only that the URL resolves), so it is a floor, not a
substitute for the deeper-source discipline in rules 5–6 — never weaken it, and never omit a flag citing
a URL you have not actually opened.

## Capital-city flag-meaning explainer — exhaust every language before omitting — hard rule, do not override without approval

**The Learn-mode capital-city flag also carries a "What this flag means" explainer** — the same
`FlagMeaning.tsx` progressive-disclosure component reused via its `meanings` prop, rendered under the
capital flag in `CapitalDetails.tsx`, with data in `src/data/cityFlagMeanings.ts` (`CITY_FLAG_MEANINGS`,
keyed by the subdivision's ISO 3166-2 code, the same key as `CAPITAL_FLAGS`). Sourcing discipline is
identical to the national/subnational flag-meaning rule above: every entry needs an authoritative
`sources` citation with a real `http(s)` URL, myth is separated from fact, and nothing is fabricated.
Structure is validated by `scripts/check-city-flag-meanings.mjs` (in `npm run flags:check`).

Expanding `CITY_FLAG_MEANINGS` to cover every bundled capital flag is a **standing sweep**, run under
the same "keep going, don't ask" mandate as the subdivision sweep below. Progress:
`node scripts/capital-meaning-remaining.mjs [CC]`; omissions logged inline (`CODE  # reason`) in
`scripts/data/capital-meaning-omitted.txt`.

### The hard rule — omission requires multi-language source exhaustion

**A capital flag may be omitted (logged in `capital-meaning-omitted.txt`) ONLY after its symbolism has
been sought in EVERY reachable authoritative source, INCLUDING languages other than English.**
"Image-only / not documented on en.wikipedia" is NEVER a sufficient basis to omit. Before omitting any
capital flag as unsourceable you MUST check, at minimum:

1. **Flags of the World (FOTW, `crwflags.com/fotw` / `fotw.info`)** — check FIRST; it carries per-city
   flag pages with symbolism en.wikipedia omits. This is how Boa Vista (`BR-RR`) and Macapá (`BR-AP`)
   were recovered from the omission list, and how Ipoh / Kuala Terengganu / Kota Kinabalu were recovered
   for Malaysia.
2. **the capital's own article on the LOCAL-language Wikipedia** (bg/ms/pt/de/fr/… .wikipedia), in its
   heraldry/flag section, and any dedicated arms/flag article;
3. **official city-council / government pages** (in the local language);
4. **heraldic references** (heraldika, heraldry-wiki) and the **Wikimedia Commons** file page (its
   `blasonatura`/description often carries the blazon).

Only a flag that comes up empty in ALL of the above — or one that is structural (the capital-name guard
blocks it, or it is a plain-colour flag / council wordmark with no heraldic content) — may be omitted,
and its logged reason MUST name the deeper sources checked (cite the FOTW page), never just
"en.wikipedia / search checked".

### Enforcement

`scripts/audit-omitted-capital-reasons.mjs` (`npm run capitals:audit-omissions`) **fails** if any
non-structural omission cites only English Wikipedia / a bare search without showing a deeper
(FOTW / local-language / official / heraldic / Commons) source was checked, **and separately fetches
every `crwflags.com/fotw`/`fotw.info` URL cited in a reason, failing if any returns 404** (a dead
citation can't have actually been read — see the "404 is never proof of absence" sub-rule above; this is
the exact class of bug that let Saint Helier's real symbolism go undiscovered). A network error is a
skipped warning, not a failure. Like the subdivision omission audit it is deliberately NOT in
build-gating `flags:check` — it is the capital sweep's own tripwire, and **any "capitals sweep complete /
thorough" claim is gated on a clean run of it.** Never weaken the audit or omit a flag to dodge it; if it
flags an omission, re-check FOTW (via the country's INDEX page, not a guessed filename) + the
local-language sources and either recover the flag as a sourced entry or fix the reason to cite what was
actually checked.

## Flag-meaning coverage sweep is a standing mandate — finish it without asking — hard rule, do not override without approval

**Expanding `flagMeanings.ts` to cover every subdivision that has a bundled/playable flag is an
ongoing, standing task. Once asked to continue the sweep, an agent MUST keep going until the job is
done — sourcing every remaining subdivision from authoritative sources — and MUST NOT stop to ask the
user whether to proceed, whether to do "one more set", or which country to do next.** The owner has
made clear (repeatedly) that pausing to ask "should I continue?" is unwanted; treat "continue the
subdivision sweep" as durable authorization that persists across every merge, branch reset, and
context window until the sweep is complete or the user explicitly says stop.

### What "keep going" means concretely

1. **Do not ask for permission to continue.** After merging a milestone and resetting the branch,
   immediately pick the next set and start sourcing it. Never end a turn with "want me to continue?",
   "say the word", "shall I proceed?", or a status report that waits for a go-ahead. The only
   acceptable reasons to stop and surface to the user are: (a) the user said stop; (b) a genuine
   blocker you cannot resolve (build broken, network/egress down, a real ambiguity that changes the
   work); or (c) **every** remaining subdivision has been either sourced or investigated-and-omitted
   (i.e. `node scripts/subdiv-remaining.mjs` prints `remaining:0`).
   **A "documentation wall" is NOT a blocker and NOT a stopping condition.** Discovering that a
   country's flags are image-only (no reachable per-element symbolism) does not license you to stop,
   summarise progress, or ask the user to "point you at a harder target" — it is the ordinary,
   expected outcome for many countries, and the mandated response is to **investigate that country's
   codes and log them as omitted** (rule 3), which *closes* them and drives `remaining` down. Reaching
   a "frontier" of image-only countries is therefore never a reason to end the sweep; you keep going,
   converting each wall country into logged omissions, until `remaining:0`. Ending a turn with a
   status report, a recap of what's done, or any variant of "say the word / let me know / want me to
   continue" while `remaining` is still above 0 is a violation of this rule, **even if every remaining
   country looks like a wall.**
2. **Pick the next set yourself.** Use `node scripts/subdiv-remaining.mjs [CC]` to see what's left and
   choose the next country by documentation strength (prefer local-language Wikipedia coverage). You
   do not need the user to name a country — choosing is your job, not theirs.
3. **The quality bar never drops to hit the mandate.** Every entry is still fetched-then-written from
   an authoritative source (the "never fabricate a flag meaning" rule is absolute). A set whose flags
   have **no reachable per-element symbolism** (only "the colours of the arms") is handled by
   **investigating each code and logging genuine omissions** in `scripts/data/subdiv-meaning-omitted.txt`
   — not by padding with invented meaning, and not by silently skipping the country. Omitting an
   unsourceable flag *is* finishing that flag; moving on to the next country *is* continuing.

   **3a. Before omitting ANY set as "image-only / unsourceable" you MUST exhaust the dedicated
   local-language sources, not just the main article or en.wikipedia — this is a hard sub-rule.**
   The reference failure: a session batch-omitted all 81 Italian provinces as unsourceable because it
   only looked at the province's *main* article; in fact every one is documented in that article's
   **Stemma/Simboli** section and in a **Wikimedia Commons** blason file (`blasonatura`). The same
   error then turned out to be widespread — Lithuania (`X apskrities herbas`), Estonia (`X maakonna
   vapp`), Latvia (`X ģerbonis`), North Macedonia (`Грб на X`) and Argentina (`Bandera de la provincia
   de X`) subdivisions were all wrongly omitted the same way: each has a **dedicated** arms/flag
   article, or a section within the subdivision article, carrying the blazon and symbolism. So a set is
   **only** a genuine wall after ALL of these come up empty:
   - **Flags of the World (FOTW, `crwflags.com/fotw` / `fotw.info`) — the FIRST and most important
     source to check, and the one most often skipped.** FOTW carries a per-subdivision flag page for
     most of the world (e.g. `lr-ni.html`, `za-nc.html`, `pg-en.html`, `et-am.html`) with the design AND
     documented symbolism that en.wikipedia usually omits. **"Image-only on en.wikipedia" is NEVER a
     sufficient basis to omit a flag — you MUST check FOTW first.** The reference failures this caused:
     **Liberia's 15 county flags** (heraldic, quilt-tradition designs, every one on FOTW with symbolism)
     and **South Africa's provincial arms** (registered with the SA Bureau of Heraldry, all on FOTW)
     were BOTH batch-omitted as "image-only on Wikipedia" by agents who never opened FOTW — and a later
     audit *repeated the miss by trusting those Wikipedia-only reasons instead of re-checking FOTW*.
   - the subdivision's own article on the **local-language** Wikipedia, in its heraldry/flag section
     (`Stemma`/`Simboli`/`Wappen`/`Vaakuna`/`Герб`/`Grb`/`Escudo`/`Bandera`/`Blason`/`Héraldique`/…);
   - the **dedicated** arms/flag article (`Coat of arms of X`, `Escudo de X`, `Bandera de X`,
     `X vapp`, `X herbas`, `X ģerbonis`, `Грб на X`, `Wappen X`, …) — the main article often only shows
     the image while a *separate* page carries the blazon;
   - the **Wikimedia Commons** file page for the flag/arms (its description frequently contains the full
     `blasonatura`/blazon even when every Wikipedia article is image-only).
   Only when a coat of arms genuinely has no textual blazon anywhere (e.g. Romanian counties, whose
   blazon lives only in an un-fetchable government gazette) is it a real wall. **Coats of arms are
   almost always sourceable via one of the above; treat any heraldic subdivision omitted without these
   checks as a bug to reverse.**

   **3b. RE-VERIFY existing omissions — never trust a prior omission reason.** On every audit you MUST
   independently re-check each already-omitted set against FOTW (3a), because past omissions were made
   on the Wikipedia-only basis this rule now forbids. A reason that says only "image-only on
   en.wikipedia" (no FOTW check) is presumed WRONG until re-verified. Every omission logged in
   `scripts/data/subdiv-meaning-omitted.txt` MUST carry a reason that cites the FOTW re-verification
   (name the `crwflags`/`fotw` page checked); a genuine wall is documented as "re-verified against FOTW:
   still no reachable symbolism", never as "image-only on Wikipedia".
4. **Checkpoint by merging, don't wait.** Accumulate a country (or a few) on the branch, run the
   checks, commit, push, open the PR, squash-merge it, reset the branch from `main`, and go straight to
   the next set — all without a confirmation round-trip, exactly as the PR-workflow rule already
   requires.
5. **This does not override the safety rules.** Sourcing discipline, `npm run flags:check`, `tsc`, the
   visual-verification rule, and the merge workflow all still apply on every push. "Keep going" means
   never stalling on a *permission* question — it never means skipping a mandated check.

6. **Walls get closed, not reported.** For every remaining country that is a documentation wall,
   confirm the image-only pattern across a representative sample of its codes **after checking FOTW
   (3a)**, then append **all** of that country's remaining codes to
   `scripts/data/subdiv-meaning-omitted.txt` with a reason that **names the FOTW page(s) re-verified**,
   and move straight to the next country in the same turn. Batch several wall-countries per PR.

7. **`remaining:0` does NOT mean the sweep is complete — the omission backlog must be clean too.**
   `node scripts/subdiv-remaining.mjs` counts an omitted code as "done", so it reads `remaining:0` even
   when omissions are unverified Wikipedia-only guesses. **The sweep is complete only when BOTH
   `subdiv-remaining.mjs` shows `remaining:0` AND `npm run subdiv:audit-omissions` exits clean** (every
   omission re-verified against FOTW). **NEVER tell the user the sweep is "complete"/"done" while
   `npm run subdiv:audit-omissions` still reports Wikipedia-only or reasonless omissions.** Claiming
   completion on `remaining:0` alone is exactly the over-claim that hid Liberia and South Africa.

**Enforcement:** `scripts/audit-omitted-flag-reasons.mjs` (`npm run subdiv:audit-omissions`) fails while
any omission was checked only against Wikipedia (or has no logged reason), listing each, **and separately
fetches every `crwflags.com/fotw`/`fotw.info` URL cited in a reason, failing if any returns 404** — a
dead citation can't have actually been read (see the "404 is never proof of absence" sub-rule in the
"newly bundled flag" rule above); a network error is a skipped warning, not a failure. It is the gate
on any "sweep complete" claim; it is deliberately NOT in the build-gating `flags:check` (the pre-existing
backlog would block unrelated work) — it is the audit's own tripwire. Beyond it this remains a
behavioural mandate: a turn that ended by asking whether to continue the sweep, or with a progress
recap while `subdiv-remaining` was above 0, **or that declared the sweep "complete" while
`subdiv:audit-omissions` was still dirty**, is a violation of this rule.

## A check that does not RUN in CI is not a gate — hard rule, do not override without approval

**Every check in `npm run flags:check` MUST be invoked by a `run:` step in the `flag-integrity`
workflow, in a job on a Node version that can load it. A check named only in the workflow's
`paths:` filter, or only in a comment, gates nothing — and a check that crashes on the job's Node
before it asserts anything gates nothing either.**

### Why this rule exists

Reported by the owner (2026-08-07) with a screenshot of a red `check-era-maps` job dying on
`ERR_UNKNOWN_FILE_EXTENSION`. That particular run was stale, but auditing the workflow found the
two failure modes this rule now forbids, and one of them had shipped a live bug:

1. **Named but never run.** `check-historical-flag-anachronism.mjs` — the gate this file says
   "**fails the build**", the one that stops South Africa's 1994 flag flying on the 1914 map —
   appeared in the `paths:` filter and in a comment, and **no step had ever invoked it**. Four more
   were in the same state: `check-population-freshness.mjs`,
   `check-disputed-territory-coverage.mjs`, `trim-flag-transparency.mjs --check` and
   `build-flag-aspect-ratios.mjs --check`. **A `paths:` entry is a trigger, not a gate** — it
   decides *when* the workflow runs, never *what* it checks.
2. **The one that was already red.** `build-flag-aspect-ratios.mjs --check` was failing: 34 era
   flags bundled during the era audit were missing from `flagOverlayAspectRatios.ts`, so Nepal's
   and Mongolia's pennants (0.8182), Qatar 1936 (2.6776) and the 3:1 Persia 1933 / Montenegro 1993
   flags all rendered at the **default** ratio — a direct breach of the flag-aspect-ratio hard
   rule, live on the site, because nothing in CI ran the check that would have caught it.
3. **Too old a Node to load the check.** Nine scripts `await import()` a `.ts` module directly and
   need native type-stripping (**22.18+**). On Node 20 they die with `ERR_UNKNOWN_FILE_EXTENSION`
   *before the first assertion* — the job goes red for a reason unrelated to the data, which is
   worse than no check, because it trains everyone to ignore a red mark.

### Rules

1. **Adding a check to `flags:check` means adding a `run:` step for it in the same change.** The
   two lists are one gate; a check in only one of them is a check nobody enforces.
2. **A `.ts`-importing script goes in a job pinned to Node 22.18+** (today: `check-era-maps`, Node
   24). Never place one in a Node 20 job, and never leave `node-version` unset for such a job.
3. **Never satisfy the guard by REMOVING a check from `flags:check`.** If it reports a check
   ungated, wire the step up. Deleting the check to make the guard green is the failure this rule
   exists to prevent.
4. **CI-only checks are legitimate and must stay deliberate.** The landmass raster
   (`check-era-landmass.mjs`, minutes) and the era-flag sha256 re-verification
   (`download-era-flags.mjs --check`) run in CI but not in the local gate. The guard prints that
   split on every run so it stays a decision rather than an accident.
5. **Never trust this file's own "in the `flag-integrity` workflow" claims without checking.** They
   drifted for months. `check-ci-coverage.mjs` is now the authority; the prose is documentation.

### Enforcement

`scripts/check-ci-coverage.mjs` (`npm run ci:check-coverage`, in `npm run flags:check` and the
`check-proportions` CI job) parses `flags:check` and the workflow and **fails the build** when a
gate script is never invoked by a `run:` step (distinguishing "absent entirely" from the more
deceptive "named in `paths:`/a comment"), or when a `.ts`-importing script sits in a job whose
`node-version` is below 22.18 or unset. It deliberately parses the YAML as text so the gate itself
needs no installed dependency. Both branches are exercised: re-adding the ungated checks and
planting an era check in the Node 20 job each make it fail.

## Token-efficient work — hard rule, do not override without approval

**Every agent working in this repo MUST minimise token usage on every task. Efficiency is a
requirement, not a nicety — but it must NEVER come at the cost of output quality, correctness, or
any of the hard rules above (sourcing, visual verification, the collision/proportions/anthem/lyric
checks, the merge workflow).** If saving tokens would mean skipping a mandated check, sourcing step,
or verification, spend the tokens — quality always wins. This rule is about eliminating *waste*, not
cutting *work*.

### Why this rule exists

This is a large repo with a very long `CLAUDE.md` and big generated data files (`src/data/cities.ts`,
`src/data/countryFacts.ts`, `src/data/nationalAnthems.ts`, `src/data/flagMeanings.ts`, the flag
SVGs). Blindly reading whole files, re-reading unchanged files, dumping large command output, or
fanning out redundant searches burns tokens (and money/latency) without improving the result. Past
sessions have wasted large context budgets re-reading data files they had already seen.

### Rules

1. **Read narrowly, not wholesale.** Prefer `Grep`/`Glob` to locate the exact lines, then `Read`
   with `offset`/`limit` around them. Do NOT read an entire multi-thousand-line generated data file
   (e.g. `src/data/*.ts`) when you need one entry — search for the key and read the surrounding
   window. Never re-read a file you just edited to "confirm" the edit — the tool already reports
   success.

2. **Search once, precisely.** Craft a targeted `Grep` regex/`glob` rather than several broad sweeps.
   Do not spawn a sub-agent for a search you can do directly in one or two calls; sub-agents start
   cold and re-derive context you already have. Reserve `Agent`/sub-agents for genuinely large
   fan-out work the user asked for.

3. **Keep command output small.** Add `-n`, `head_limit`, path filters, `--quiet`, `| head`, or
   `--name-only` so a command returns what you need, not a screenful. Avoid `cat`/`find`/`grep` via
   Bash when a dedicated tool (`Read`/`Grep`/`Glob`) does it with less noise.

4. **Batch independent calls.** Issue independent tool calls in a single message so they run in
   parallel and you don't pay for extra round-trips of narration.

5. **Say less, do more.** Keep chat prose tight and skip restating what the diff or tool output
   already shows. Don't re-explain the codebase or re-list options you won't pursue. (This does not
   apply to PR descriptions, code comments, or the sourced data the hard rules require — those stay
   as complete as mandated.)

6. **Reuse what's already in context.** Don't re-establish facts, re-open files, or re-run checks
   whose results you already have this session unless something changed them.

**Enforcement:** there is no automated check — this is a discipline every agent applies to its own
tool use. When reviewing a PR, wasteful patterns (whole-file reads of generated data for a one-line
change, redundant sub-agent fan-out, huge unfiltered command dumps) are legitimate review feedback.
Never cite this rule to justify skipping a mandated sourcing, verification, or check step.

## PR workflow — hard rule for all agents

After pushing a branch and creating a pull request, an agent **MUST**:

1. **Immediately merge** the PR (squash merge) — do not leave it open waiting for manual action unless the user has explicitly asked to review first.
2. **Confirm the merge succeeded** by checking the merge response.
3. **Confirm the work is LIVE — that users can actually see it.** Merged is not shipped. Run
   **`node scripts/check-live-build.mjs`** (`npm run live:check`) and report what it says. This is a
   mandatory step, not a courtesy check, and it is not satisfied by a green Deploy run — see the
   subsection below for what to do when it says the site is behind.
4. **Report back** with:
   - Merge status (success/failure)
   - **Whether users can see it** — the live build's commit and timestamp from step 3
   - Current time in **AEST** (Australian Eastern Standard Time, UTC+10; or AEDT UTC+11 during daylight saving, which runs October–April)
   - The merge commit SHA (this is the build code/number)

Example confirmation message format:
> Merged ✓ — commit `b05323a` — live ✓ — 9:56 PM AEST

Do not report the time in UTC or any other timezone unless asked.

**This merge step is unconditional.** Inability to perform the in-app visual verification because no
browser is available is **not** a reason to pause, hold the PR open, or ask the user whether to merge
— see "When no browser is available — precedence over the merge rule" above. Document the caveat in
the PR body and merge.

### "Merged ✓" is not "users can see it" — the live check is mandatory and a stalled deploy is YOUR problem

**Why this rule exists.** Reported by the owner (2026-08-07): "confirm merge worked and users can
see the latest version". Two PRs had been merged with every CI check green and reported as
"Merged ✓", while the live site was still serving a build from the previous afternoon. Both merges
were invisible to every user for over 15 hours. The cause was a stalled deploy — and the reason it
went unreported is that the old wording of item 3 let a green *build* stand in for a live *site*,
and offered "egress may be blocked" as a pre-authorised excuse for not looking. Egress to
`github.io` was never blocked; nobody tried. **A user cannot see a workflow conclusion. They see
the page.**

1. **Fetch the live site and compare its build commit — never infer liveness from a workflow
   status.** `scripts/check-live-build.mjs` does exactly this: it reads the entry bundle and the
   `__BUILD_COMMIT__` / `__BUILD_ISO__` constants `vite.config.ts` injects, then checks that the
   merge commit is that build or an ancestor of it. Run it after every merge.
2. **A network failure is INCONCLUSIVE (exit 2), never a pass.** Say the check could not run. "I
   could not check" must never be reported as, or allowed to read like, "it is live".
3. **If the site is behind, DRIVE THE DEPLOY — it is part of the task, not a footnote.** The Deploy
   workflow runs in a `concurrency: pages` group with `cancel-in-progress: false` (correctly — see
   `deploy.yml`), so **one stuck run blocks every later deploy indefinitely**. Find the Deploy run
   for the merge commit; if it is `pending` or `queued`, list the recent runs and find the older one
   holding the group. A run whose `build` job succeeded but whose `deploy` job sits in `waiting` is
   parked on the `github-pages` environment's protection rule and will never clear on its own.
   Cancel it, approve it, or re-run the queued deploy.
4. **When the agent's token cannot clear it, that is the HEADLINE of the report.** Cancelling a run
   or approving a deployment needs `actions: write` / deployment-review rights the integration token
   does not have (`403 Resource not accessible by integration`). When that happens the report leads
   with **"users cannot see this yet"**, plus the blocking run's URL and the exact click-path for
   the owner (Actions → the run → Approve or Cancel). Never bury it under a green merge line, and
   never report "Merged ✓" alone when you know the live site does not have it.
5. **Never weaken the check to make a report look clean** — not by skipping it, not by treating a
   green Deploy run as equivalent, not by reinstating an "egress may be blocked, so the workflow
   conclusion is the source of truth" escape hatch. That escape hatch is what caused this bug.

**Enforcement.** `scripts/check-live-build.mjs` (`npm run live:check`) is the mechanical step; it
exits 0 only when the live bundle contains the commit. It is deliberately NOT in `flags:check` — it
describes the deployed site, not the working tree, so it would fail on every branch by design. The
guard is this rule: a turn that reported a merge without running it, or that reported "live" on an
exit-2 inconclusive result, is a violation.
