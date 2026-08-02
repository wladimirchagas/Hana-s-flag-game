# Historical Eras Completeness — Phase 4 Implementation Roadmap

**Status:** Phase 4a Complete | Phase 4b Tier 1 Complete | Phase 4b Infrastructure Blocked | Phase 4c–4e Pending  
**Last Updated:** 2026-08-02 (Session 3: Iran flag display fixes + Egypt duplicate removal)  
**Branch:** `claude/historical-eras-completeness-yhtfl7`

---

## Session 3 Summary (2026-08-02, continued)

### Completed ✓

**Phase 4b Tier 1+: Iran Flag Display Fixes (ad1920, ad1938, ad1945, ad1960)**
- Identified inconsistency: Iran entries (post-1933 name) in ad1920–ad1960 were marked noFlag: true despite notes correctly describing the Lion and Sun flag as the national symbol
- Root cause: Persia → Iran naming transition confused the data entry logic
- Fix applied: Changed all four eras from noFlag: true to `flag: "historical-flags/persia-1907.svg"`
- Wired to historical eras:
  - **ad1920:** "Persia (Iran after 1933) — the Lion and Sun banner, official national flag from Qajar through Pahlavi eras..."
  - **ad1938:** "Iran (Persia renamed 1933) under Reza Shah Pahlavi — the Lion and Sun flag, official national flag from 1933 to 1979..."
  - **ad1945:** "Iran under Mohammad Reza Shah Pahlavi — occupied by Britain and the USSR during the war. The Lion and Sun flag (1933–1979) was the national symbol."
  - **ad1960:** "Imperial Iran under the Shah — the Lion and Sun flag, replaced by the Islamic Republic's in 1980."
- All flag checks passed; no anachronisms or parent-flag collisions
- Commits: `a53981c` (Iran flags) + `0472985` (Egypt fix)

**Phase 4b Data Integrity: ad1945 Egypt Duplicate Removal**
- Identified bug: ad1945 had two Egypt entries; the second (noFlag: true) overwrote the first (with egypt-kingdom.svg flag)
- Root cause: Prior session added egypt-kingdom.svg but did not remove the redundant noFlag override comment
- Fix applied: Removed the duplicate noFlag entry to restore Kingdom flag display for 1945–1952 period
- Verified: egypt-kingdom.svg exists and contains the correct green-crescent-and-stars design

**Phase 4b Tier 2 Verification: Ottoman + Arabia + Persia Coverage Audit**
- Ottoman Empire (ad1815, ad1920): Correctly marked noFlag (crescent-and-star not until 1844) ✓
- Persia/Iran (ad1500, ad1600, ad1815, ad1880, ad1920, ad1938, ad1945, ad1960): All now display Lion and Sun flag ✓
- Arabia/Nejd entries: No era-specific overrides needed; rely on global registry or modernName fallback ✓
- Subdivision flag sweep: Confirmed 0 remaining (1712 universe complete) ✓

### Blocked (No Change from Session 2) ❌

Same blockers as Session 2 remain:
- Phase 4b Infrastructure: Overpass API 403 Forbidden (Yemen/Vietnam splits)
- Phase 4c: aourednik missing Yugoslavia, Poland, Germany occupation zones

---

## Session 2 Summary (2026-08-02)

### Completed ✓

**Phase 4b Tier 1: Yemen Flag Sourcing**
- Downloaded Mutawakkilite Kingdom of Yemen flag (red field, white sword + 5 stars, 1918–1962)
- Source: Wikimedia Commons (`Flag_of_the_Mutawakkilite_Kingdom_of_Yemen.svg`)
- Bundled with correct viewBox aspect ratio (2:1 = `viewBox="0 0 600 300"`)
- Wired to historical eras:
  - **ad1920:** "Mutawakkilite Kingdom of Yemen, established 1918. The red flag with white sword and five stars became the national flag of the independent kingdom after the Ottoman withdrawal."
  - **ad1938:** "Mutawakkilite Kingdom of Yemen — the red flag with white sword and five stars represented the kingdom from its establishment in 1918 until the 1962 revolution."
  - **ad1945:** "Mutawakkilite Kingdom of Yemen — the red flag with white sword and five stars was the national flag from 1918 to 1962."
  - **ad1960:** "The Mutawakkilite Kingdom in the north (1918–1962) flew the red flag with white sword and stars; the south was under British rule as the Aden Protectorate."
- Pre-1918 eras (ad1815) remain noFlag: true with explanatory notes
- **PR #864 merged** at commit `a3a1a77` — all CI checks passed

### Blocked ❌

**Phase 4b Infrastructure: Yemen/Vietnam Territory Splits**
- Blocker: Overpass API returns 403 Forbidden (network proxy policy blocks OpenHistoricalMap)
- Scripts prepared but cannot execute:
  - `scripts/query-ohm-splits.mjs` — Overpass query template for North/South Vietnam (1954–1975) and North/South Yemen (1962–1990)
- Workaround required: Manual download via unrestricted network or network policy change
- Impact: Unified Yemen/Vietnam cannot be split on 1960 map

**Phase 4c: Historical Context Notes (ad1945)**
- Blocker: Key post-WWII polities (Yugoslavia, Poland, Germany occupation zones) not present in aourednik GeoJSON
- Status: Existing notes for Korea, India, Egypt, etc. are adequate; expansion blocked on dataset availability
- Recommendation: Await GeoJSON expansion or source alternative historical dataset

### Observations

1. **Ottoman flags correctly configured:** Pre-1844 eras (ad1300, ad1500, ad1700, ad1815) correctly marked noFlag because crescent-and-star wasn't standardized until 1844. Post-1844 eras (ad1880+) show the flag. No action needed.

2. **Persia/Iran naming inconsistency identified:** Entries for ad1920, ad1938, ad1945, ad1960 are labeled "Iran" (post-1933 name) but dated to pre-1933 period. Notes correctly reference "Lion and Sun flag" but entries are marked noFlag: true. Potential fix: rename to "Persia" and use flag directly or via modernName fallback (added in Session 1).

3. **Subdivision flags sweep complete:** `node scripts/subdiv-remaining.mjs` reports 0 remaining (1712 universe: 1136 sourced, 576 omitted). Modern subdivision flag coverage is comprehensive.

---

## What's Been Completed (Phase 4a)

### ✅ Border Corrections (Commits e330cd1 + earlier)
- Removed anachronistic Israel from 1938 (didn't exist until 1948)
- Removed Hejaz from 1938+ (ceased May 1925)
- Renamed Mesopotamia → Iraq across 5 eras (1920, 1938, 1945, 1960, 1992)
- Standardized 1994 naming: Burma → Myanmar, Byelarus → Belarus
- Documented unfixable issues: Yemen/Vietnam splits unavailable in aourednik dataset

**Reference:** `docs/HISTORICAL_BORDERS_AUDIT.md`

### ✅ Historical Flag Recovery (Commits from previous session)
- Afghanistan interwar flag (black-red-green, 1929–1973): wired across ad1815, ad1920, ad1938, ad1945, ad1960
- Mongolia independence flag (1921, 1945)
- Tibet (pre-1951 snow lions & sun)
- Egypt Kingdom flag (1945)
- Saudi Arabia flags (1938)
- Iraq Kingdom flag (1924, from Hashemite period)

### ✅ Modernname Fallback for Early Eras (Commit f0ce86d)
- Added **Persia → Iran** to `MODERN_NAME_ALIASES` for eras before 1933 name change
- Ensures 1500/1700 Persian history can fallback to Iran's Lion and Sun flag when no era-specific override exists

---

## What's Blocked (Requires External APIs or Manual Work)

### 🔴 Yemen/Vietnam Territory Splits
**Why blocked:** Alternative GeoJSON sources require:
1. **Network egress** to OpenHistoricalMap/Overpass Turbo API (proxy blocked)
2. **Complex geometry transformation:** OSM XML → GeoJSON, property mapping, merge with world_1960.geojson

**Current status:**
- ✅ Agent research completed: identified OpenHistoricalMap as the best source
- ✅ Overpass query template created: `scripts/query-ohm-splits.mjs`
- ❌ Cannot execute queries due to network proxy restrictions

**How to unblock:**
1. **Option A (Recommended):** Enable HTTPS egress to `query.wikidata.org`, `overpass-turbo.openhistoricalmap.org`, or set up a local Overpass server
2. **Option B:** Download historical GeoJSON manually from https://www.openhistoricalmap.org/, export via Overpass API through a local VPN/unrestricted network, then commit the files
3. **Data needed:**
   - North Vietnam (DRV, ~1954–1975, north of 17th parallel)
   - South Vietnam (RVN, ~1954–1975, south of 17th parallel)
   - North Yemen (YAR, ~1962–1990)
   - South Yemen (PDRY, ~1967–1990)

### 🟡 Mutawakkilite Kingdom Yemen Flag (& 1,500+ Other Bare Polities)
**Why blocked:** Network access to Wikimedia Commons / Wikidata:
- Script created: `scripts/find-yemen-flag.mjs`
- Expected source: Wikimedia Commons flag image for "Flag of the Mutawakkilite Kingdom of Yemen (red with white sword + 5 stars, 1918–1962)"
- Fallback source: FOTW (Flags of the World) at crwflags.com/fotw/flags/ye-kmk.html

**Status:**
- ✅ Search methodology documented
- ❌ Cannot download images due to network proxy
- ❌ Cannot verify Wikidata P41 claims due to API access

**How to unblock:**
1. **Manual download:** Visit Wikimedia Commons search, download SVG, verify image, commit to `public/historical-flags/mutawakkilite-yemen.svg`
2. **Update historicalEras.ts:** Add flag reference to Yemen entries in ad1920, ad1938, ad1945, ad1960
3. **Add flag-meaning:** Populate `src/data/flagMeanings.ts` with blazon description and sources
4. **Run checks:** `npm run flags:check` to verify perceptual hash, no parent-flag collision, etc.

---

## Phase 4b: Flag Sourcing for Bare Polities (High-Impact Targets)

**Scope:** ~1,999 polities without flags. Prioritized by:
1. **Frequency:** Polities appearing in multiple eras
2. **Impact:** Widely-recognized historical entities
3. **Sourcing ease:** Well-documented historical flags

### Tier 1: Yemen (5 eras)
- **Eras:** ad1815, ad1920, ad1938, ad1945, ad1960
- **Flag:** Mutawakkilite Kingdom (red with white sword + 5 stars, 1918–1962)
- **Status:** ❌ Blocked on network access to Commons
- **Next step:** Download from Commons, commit, update historicalEras.ts

### Tier 2: Ottoman Variants (Turkey 2–3 eras)
- ad1815, ad1920 Ottoman entries
- Flag: Ottoman flag (crescent and star on red)
- Status: May already exist in system; verify before sourcing

### Tier 3: Arabia & Persia (2–3 high-leverage eras each)
- Arabia Nejd (ad1815, ad1920)
- Persia (already has Lion & Sun in 1700+; early eras may need review)
- Egypt Kingdom (already has flag in ad1945; verify ad1815/ad1920)

**Methodology:**
1. Query `node scripts/subdiv-remaining.mjs` to identify which polities still lack flags (adapt for historical-eras context)
2. For each polity, identify authoritative source:
   - Wikidata `P41` → inception `P571` (flag + adoption year)
   - Wikimedia Commons flag categories
   - FOTW (Flags of the World)
   - Wikipedia infobox flags (as secondary source)
3. Verify flag existed in the specified era (adoption year ≤ era year)
4. Download SVG/PNG, verify aspect ratio, commit to `public/historical-flags/`
5. Update `historicalEras.ts` ERA_OVERRIDES entry
6. Add `flagMeanings.ts` entry with sources
7. Run `npm run flags:check` before pushing

---

## Phase 4c: Historical Context Notes & Explanations

**Goal:** Add era-specific notes explaining major historical changes

### Key Eras Needing Notes:
- **ad1945 (End of WWII):** Yugoslavia formation, Poland boundary shifts, German partition, Korea division
- **ad1960 (Post-colonial):** Independence waves, Cold War alignment, Yemen/Vietnam splits pending

### Template for Notes:
```typescript
["EntityName", {
  continent: "Region",
  note: "Description of entity + key historical events + flag explanation.",
  population: 12_000_000,
  flag: "historical-flags/example.svg" // if available
}]
```

**Example (to add):**
```typescript
// ad1945 entries need expansion:
["Poland", { ..., note: "Poland (1945): Soviet border shift westward into Germany; Warsaw Pact member from 1955. Flag: white-red bicolour (no eagle on top since 1919; eagle restored 1955)." }]
["Yugoslavia", { ..., note: "Yugoslav Federation (1945): Communist state formed from WWII occupation zones; Tito's break with Moscow came in 1948. Flag: red star on red-white-blue." }]
```

**Status:** Not started (requires research but no external API calls)

---

## Phase 4d: Population Estimates for 1815–1960 Eras

**Goal:** Add dated, sourced population figures for historical periods

**Sources:**
- **1815–1914:** McEvedy & Jones "Atlas of World Population History" (1978)
- **1915–1960:** UN/World Bank historical estimates, national census records, Britannica
- Existing entries should be verified/updated for freshness and accuracy

**Key Constraint:** Must cite year and source (same discipline as capital-flag and flag-meaning rules)

**Status:** Not started (requires research but no API calls)

---

## Phase 4e: Border Precision Auditing

**Goal:** Identify which era boundaries are approximate vs. authoritative

**Fields to add to ERA_OVERRIDES polities:**
```typescript
{
  borderPrecision: "high" | "medium" | "low",
  borderSource: "Natural Earth 50m" | "UN OCHA" | "Academic GIS" | "Historical atlas",
  borderUncertainty?: "Ottoman-Persian border disputed" // optional explanation
}
```

**Status:** Not started (requires cartographic research)

---

## Infrastructure & Scripts Created

### ✅ `scripts/query-ohm-splits.mjs`
Query OpenHistoricalMap/Overpass Turbo for territorial splits.
Requires network egress; returns Overpass XML/JSON ready for conversion to GeoJSON.

### ✅ `scripts/find-yemen-flag.mjs`
Search Wikidata + Wikimedia Commons for historical flag images.
Requires network access to wikimedia.org; documents fallback to FOTW and manual download.

### 📋 Future Infrastructure Needs:
- `build-historical-flag-sources.mjs`: Auto-generate `HISTORICAL_POLITY_SOURCES.json` (parallel to capital-flag-sources.json) for tracking flag attribution
- `check-historical-era-completeness.mjs`: Audit coverage (which polities have flags, notes, populations, border-precision info)
- `backfill-historical-population.mjs`: Systematic sweep to fill population gaps from authoritative sources

---

## Next Steps for the Team

### Immediate (1–2 sessions):
1. **Unblock Yemen/Vietnam splits:** Enable API egress OR manually download from OpenHistoricalMap
2. **Download Mutawakkilite Yemen flag:** Find and commit `mutawakkilite-yemen.svg`
3. **Update historicalEras.ts:** Wire Yemen flags for ad1920, ad1938, ad1945, ad1960

### Short-term (2–4 sessions):
4. Continue Tier 1–2 flag sourcing (Ottoman, Arabia, Persia verification)
5. Add ad1945 historical context notes (Yugoslavia, Poland, Korea, Germany)
6. Expand ad1960 notes to explain post-colonial independence waves

### Medium-term (ongoing):
7. Systematic population-estimation sweep for 1815–1960 (McEvedy & Jones sourcing)
8. Border-precision auditing (identify uncertain boundaries)
9. Infrastructure: build authoritative source tracking

---

## Current Branch State

**Commits on this branch (ahead of `main`):**
1. `e330cd1` — Fix historical map borders: remove anachronisms, standardize names (border corrections)
2. `399a84d` — Tasks 1, 2 & 3: Complete historical-flag recovery + begin bare-polity expansion (Afghanistan, etc.)
3. Earlier commits — Populate Mongolia, Tibet, Egypt, Saudi, Iraq flags
4. `f0ce86d` — Add Persia→Iran modernName fallback (current session)
5. `54dfc43` — Add infrastructure for Yemen/Vietnam splits and flag sourcing (current session)

**To merge:**
- `git push -u origin claude/historical-eras-completeness-yhtfl7`
- Create PR, await CI (flags:check must pass)
- Squash-merge once CI green

**After merge:**
- Reset branch from `main` for Phase 4b work
- Continue flag sourcing and notes additions
- Keep accumulating on same branch (same naming convention)

---

## Blocking & Contingencies

| Blocker | Severity | Workaround |
|---------|----------|-----------|
| Network egress to Wikidata/Commons | 🔴 High | Manual download + local verification |
| Network egress to OpenHistoricalMap/Overpass | 🔴 High | Download via unrestricted network, commit files |
| Natural Earth historical versions | 🟡 Medium | aourednik dataset sufficient for 1960 snapshot |
| Sourcing 1,500+ historical flags | 🟡 Medium | Prioritize by frequency + leverage; systematic batches |

---

## Verification Checklist

Before marking Phase complete:

- [ ] All commits pushed to `origin/claude/historical-eras-completeness-yhtfl7`
- [ ] `npm run flags:check` passes (no collisions, no anachronisms, perceptual hashes OK)
- [ ] `npm run build` succeeds (no TypeScript errors, bundle within size)
- [ ] Visual verification in running app:
  - [ ] World map renders all corrected eras
  - [ ] No missing subdivisions or blank areas
  - [ ] New flags (if any) display correctly
  - [ ] Notes render without overflow/truncation
- [ ] PR passes GitHub Actions CI

---

**End of Phase 4 Roadmap**
