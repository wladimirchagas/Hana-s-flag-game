# Hana's Flag Game — development guide

## Flag aspect ratios — hard rule, do not override without approval

Every national and territory flag SVG in `public/flags/` is sourced from
[hampusborgos/country-flags](https://github.com/hampusborgos/country-flags)
and encodes the **real-world aspect ratio** in its `viewBox`:

| Flag | viewBox | Ratio |
|------|---------|-------|
| France, most of Africa/Americas | `0 0 3 2` | 3:2 |
| Germany, Austria, Belgium | `0 0 5 3` | 5:3 |
| UK, Australia, New Zealand, Fiji | `0 0 60 30` | 2:1 |
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

3. **Never** download national/territory flags from `flagcdn.com` or the
   `flag-icons` npm package. These standardise every flag to `640×480` (4:3),
   destroying the real-world proportions. The correct source is
   `https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/{code}.svg`.

4. **Afghanistan exception**: `public/flags/af.svg` uses the Taliban / Islamic
   Emirate flag from Wikimedia Commons (pinned in `NATIONAL_SOURCE_OVERRIDES`
   in `scripts/download-flags.mjs`). Do not replace it with the hampusborgos
   file — that repo carries the pre-2021 Republic flag for `AF`.

### Enforcement

`npm run flags:check` (and the `flag-integrity` CI workflow) fail if any
bundled SVG has a forbidden standardised viewBox. Any PR that touches
`public/flags/` must pass this check.

To re-download all flags correctly:
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
