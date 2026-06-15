# Hana's Flag Game — development guide

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

### Outstanding files (currently still using Wikimedia URLs — must be fixed)

The following entries in `LOCAL_FLAG_OVERRIDES` still use remote URLs because Wikimedia is
blocked by the current server network policy. They must be downloaded and bundled before the
next release. Use `node scripts/download-unofficial-flags.mjs` once network egress to
`upload.wikimedia.org` is enabled.

`FR-GP` (`public/flags/gp.svg`) is already bundled from fonttools/region-flags (the Wikimedia
source file is `commons/e/e7/Unofficial_flag_of_Guadeloupe_(local).svg`; the download script
will re-download it if the local copy needs refreshing).

| Code | Local target | Wikimedia source |
|------|-------------|-----------------|
| `GB-NIR` | `public/flags/sub/GB/GB-NIR.svg` | `commons/d/d0/Ulster_Banner.svg` |
| `SO-SL~` | `public/flags/so-sl.svg` | `commons/4/4d/Flag_of_Somaliland.svg` |
| `FR-RE` | `public/flags/re.svg` | `commons/f/f8/Flag_of_Réunion_(Local).svg` |
| `FR-YT` | `public/flags/yt-local.svg` | `commons/4/4a/Flag_of_Mayotte_(local).svg` |
| `FR-BL` | `public/flags/bl.svg` | `commons/b/b4/Flag_of_Saint_Barthélemy_(local).svg` |
| `FR-PM` | `public/flags/pm.svg` | `commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg` |
| `FR-WF` | `public/flags/wf.svg` | `commons/d/d2/Flag_of_Wallis_and_Futuna.svg` |

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

## PR workflow — hard rule for all agents

After pushing a branch and creating a pull request, an agent **MUST**:

1. **Immediately merge** the PR (squash merge) — do not leave it open waiting for manual action unless the user has explicitly asked to review first.
2. **Confirm the merge succeeded** by checking the merge response.
3. **Report back** with:
   - Merge status (success/failure)
   - Current time in **AEST** (Australian Eastern Standard Time, UTC+10; or AEDT UTC+11 during daylight saving, which runs October–April)
   - The merge commit SHA (this is the build code/number)

Example confirmation message format:
> Merged ✓ — commit `b05323a` — 9:56 PM AEST

Do not report the time in UTC or any other timezone unless asked.
