# Learn factual audit — evidence and remediation register

Last updated: 2026-09-14. **Finalized evidence report for the baseline below; not a certification of universal or 100% accuracy.** Confirmed defects below are actionable; unverified leads are explicitly separated. No application data, artwork, or hard rules have been changed by this audit.

## Scope, baseline and reproducibility

Repository: `wladimirchagas/Hana-s-flag-game`. Baseline commit: [`8b2167aef864e61aaa2051ed714ce391f2ff1023`](https://github.com/wladimirchagas/Hana-s-flag-game/tree/8b2167aef864e61aaa2051ed714ce391f2ff1023). Published experience: [Learn](https://wladimirchagas.github.io/Hana-s-flag-game/learn). Live footer inspected during the audit reported `8b2167a`, built `2026-09-13T14:01:44.365Z`. Later deployments require a new comparison.

Inventory: 7,656 Git tree entries; source, generators, existing audit documents, Learn components and data pipelines examined. Parsed national-symbol registry: 230 country/territory groups and 1,837 entries; 211 passport entries. Political-party registry: 97 groups and 792 entries. Subdivision metadata: 204 groups and 4,182 division rows. These are inventory counts, **not counts of independently verified facts**. Country/territory groups must not be equated with sovereign-state counts.

Live observations included country selection/details, passport display, anthem embed and Vietnam subdivision navigation. All 195 current national flag SVGs were rendered and visually screened, with targeted enlarged comparisons. All 251 subdivision GeoJSON files and all 21 historical GeoJSON files were parsed. Individual authoritative comparison of every symbol and boundary has not been completed; precise coverage and limitations are recorded at the end and in the companion ledger.

All repository paths below refer to the fixed baseline, not whichever revision happens to be on main when this report is read. Quoted strings are searchable anchors; line numbers can move. External sources were consulted on 2026-09-13 and 2026-09-14. Government material is authoritative for that government's law, issuance and claims; it does not by itself adjudicate contested sovereignty. Scholarly reconstruction, legal designation, actual control and international recognition require separate treatment.

## Findings at a glance

Priority P1 means misleading core learning content or a systemic data defect. P2 means significant precision, coverage or evidence weakness. “Confirmed” means the specific claim has supporting repository/live evidence and, where required, external evidence. It does not certify neighbouring claims.

| ID | Priority | Status | Finding |
|---|---|---|---|
| F01 | P1 | Confirmed; live | Equatorial Guinea is still presented with Malabo as its unqualified current capital despite the 2026 Ciudad de la Paz designation. |
| F02 | P1 | Confirmed; live | Japanese passport caption and explanatory prose incorrectly identify a paulownia crest. |
| F03 | P1 | Confirmed | Vietnam's current subdivision data and geometry retain 63 units instead of the post-2025 34. |
| F04 | P1 | Confirmed | Angola retains 18 provincial records and map features; current INE census portal uses 21 provinces. |
| F05 | P1 | Confirmed implementation | “Most-current” population retrieval is hard-coded to 2024 and discards observation dates. |
| F06 | P1 | Confirmed implementation | Population generator turns missing/non-census method into “estimate” and compares dates only by year. |
| F07 | P2 | Confirmed implementation | Subdivision population shares can mix differently dated populations without exposing denominator vintage. |
| F08 | P1 | Confirmed; live metadata | Equatorial Guinea anthem routes to a video labelled as Guinea's Liberté. |
| F09 | P1 | Confirmed | 2000 BCE summary places Egypt in the Old Kingdom. |
| F10 | P1 | Confirmed chronology | 500 BCE summary includes “early Maurya”, roughly 178 years before the dynasty's conventional beginning. |
| F11 | P1 | Confirmed | Germany's party list omits the SSW despite Bundestag representation. |
| F12 | P2 | Confirmed | SPD leadership omits co-chair Bärbel Bas. |
| F13 | P2 | Confirmed coverage defect | 721 of 792 party records have source arrays containing only Wikipedia URLs; no record has an `asOf` field. |
| F14 | P2 | Confirmed model limitation | All 211 passport entries lack a `from` date; first-image selection is not proof of current issuance. |
| F15 | P2 | Confirmed precision defect | Sri Lanka's single “Colombo” capital field omits the administrative-capital distinction. |
| F16 | P1 | Confirmed omission | Zimbabwe's currency list omits ZiG. |
| F17 | P2 | Confirmed evidence gap | Historical population values lack record-level date, method, uncertainty and source fields. |
| F18 | P2 | Confirmed taxonomy risk | Administrative metadata mixes obsolete units, geographical regions and unlike administrative levels. |
| F19 | P2 | Confirmed repository error; live reachability unproven | The 2000 BCE override registry includes Hammurabi-era Babylon centuries too early. |
| F20 | P2 | Confirmed internal inconsistency | Iraq's 1960 record points to a 1959 flag asset but describes the displayed flag as the old royal flag. |
| F21 | P1 | Confirmed image/code | Kyrgyzstan current asset still has pre-revision wavy sun rays. |
| F22 | P1 | Confirmed | Burundi retains the old provincial system. |
| F23 | P1 | Confirmed | Indonesia retains 33 provinces instead of 38. |
| F24 | P1 | Confirmed | Nepal presents former zones as the current subdivision layer. |
| F25 | P1 | Confirmed | Norway current layer contains obsolete counties. |
| F26 | P1 | Confirmed | Kazakhstan omits current first-level units. |
| F27 | P1 | Confirmed reform | Burkina Faso province layer predates the 2025 reorganization. |
| F28 | P1 | Confirmed | Mali retains the old regional configuration. |
| F29 | P2 | Confirmed | South Africa omits SASL. |
| F30 | P2 | Confirmed | Algeria omits Tamazight. |
| F31 | P2 | Confirmed precision defect | Azerbaijan mixes Russian into its official-language field. |
| F32 | P2 | Confirmed precision defect | Switzerland substitutes Swiss German for German. |
| F33 | P2 | Confirmed omission | Bolivia stores only four of its constitutionally official languages. |
| F34 | P2 | Confirmed omission | Sierra Leone omits SLE and retains old-code-only currency data. |
| F35 | P2 | Confirmed image/prose conflict | Socialist Bosnia canton colours are reversed in prose. |
| F36 | P2 | Confirmed internal contradiction | Cuban arms chronology conflicts between records. |
| F37 | P1 | Confirmed registry collision | Mali/Somalia select the identical anthem segment; Oman/Romania also collide. |
| F38 | P2 | Confirmed source coverage | Explanation source arrays frequently lack primary support; Grokipedia/Fandom cited. |
| F39 | P1 | Confirmed implementation/documentation | Authoritative-bundle rules and API precedence undermine factual corrections. |

## Detailed evidence and recommended corrections

### F01 — Equatorial Guinea capital and transition

`src/data/countryFacts.ts`, GQ, sets `capital: "Malabo"`. `src/data/nationalCapitalLocations.ts` keys `GQ|Malabo`; `src/data/cities.ts` also uses Malabo in the national capitals array. The live grid and country details reproduce Malabo without a transition explanation.

The government's Spanish [Decreto Ley Núm. 1/2026, dated 2 January 2026](https://www.guineaecuatorialpress.com/noticias/decreto_ley_por_el_que_se_declara_la_ciudad_de_la_paz_djibloho_capital_de_la_republica_de_guinea_ecuatorial) designates Ciudad de la Paz, Djibloho, as capital and allows one year for specified state institutions and public enterprises to relocate. The final clause ties entry into force to promulgation and gazette publication. This audit has not separately inspected the gazette publication date or verified completion of every relocation.

Correct the current designation, retain Malabo's historical role, and explain the transition. Audit the capital marker, hierarchy, coordinates and national-capital population together. Do not relabel Malabo's coordinates or population as Ciudad de la Paz. Malabo's continued status as a provincial capital is a separate fact and must not be deleted by global replacement.

### F02 — Japanese passport emblem: false description repeated in prose

`src/data/nationalFlags.ts`, `jp-passport`, says the dark red cover bears the “paulownia Government Seal”. The later explanatory description repeats that claim and explicitly contrasts it with the chrysanthemum. A nearby coat-of-arms description says the chrysanthemum appears on passports, so the file also contradicts itself. The live passport image visibly displays a chrysanthemum.

Japan's Ministry of Foreign Affairs [passport Q&A, Q30, in Japanese](https://www.mofa.go.jp/mofaj/toko/passport/pass_4.html) identifies the passport emblem as a single chrysanthemum and distinguishes it from the Imperial House's double chrysanthemum. Therefore replacing “paulownia” with an unqualified “exact Imperial Seal” would introduce another imprecision. Use a precise passport-specific description. [Osaka Prefecture's passport guide](https://www.pref.osaka.lg.jp/o070140/passport/top/kihon.html) also distinguishes blue five-year and red ten-year covers; issuance eligibility must be dated because it changed in 2026.

This is a demonstrably false explanation, not proof that its author deliberately fabricated it. Audit both the short design string and expanded educational prose; correcting only one leaves the contradiction visible elsewhere.

### F03 — Vietnam: obsolete administrative map and misleading labels

`src/lib/subdivisionMeta.ts` contains 63 Vietnamese divisions; `public/subdivisions/VN.json` also contains 63 features. The Vietnamese government [lists 34 provincial-level units from 12 June 2025](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm): 28 provinces and six centrally governed cities. Its [Decision 19/2025 code-list explanation](https://xaydungchinhsach.chinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-cac-don-vi-hanh-chinh-cap-xa-moi-11925070418263625.htm) supplies the later operative coding context.

The old metadata also includes geographical-region labels such as `VN-39` Đông Nam Bộ, `VN-53` Northeast Vietnam and `VN-66` Red River Delta, while Hanoi is typed as a province. Those are not an adequate current first-level administrative register. Updating the visible count alone cannot repair the map.

Replace the current unit register, geometry, code aliases, capitals and population geography as one dated migration. Preserve the 63-unit dataset only as an explicitly historical layer. Do not manufacture flags for newly merged entities or assume predecessor flags remain official.

### F04 — Angola: pre-reform geography

The Angola metadata and `public/subdivisions/AO.json` each contain 18 divisions/features. The Portuguese-language [official INE census portal](https://censo2024.ine.gov.ao/) presents 21 provinces. The repository retains the former provincial configuration, including Cuando Cubango and the older Moxico extent.

Refresh from the current legal register and official boundary data; record legal establishment and operational dates separately. The INE portal confirms the current count but is not by itself a source for every boundary vertex or symbol. Province names, capitals, population totals and successor relationships all require coordinated revision.

### F05 — National population: frozen retrieval presented as current

`src/api/countries.ts` describes population retrieval as most-current/annually updated but requests `?format=json&date=2024&per_page=400`. It parses a response containing an observation date and returns only a `Map<string, number>`. The user-facing country population is undated in the live panels inspected.

This is not evidence that every 2024 value is numerically false. It is evidence that freshness cannot follow the described policy and that users cannot assess vintage. Keep value, observation date, release/revision date, statistical basis, source and territorial coverage together. Select the latest suitable non-null observation per entity, retain its date, and label fallbacks. A current build date is not a population reference date.

### F06 — Population method and same-year selection

`scripts/build-subdivision-population.mjs`, `pickLatest`, assigns `basis: isCensus ? "census" : "estimate"`. A missing method therefore becomes a positive estimate claim. It also retains the first same-year result because replacement requires `year > prev.year`; full dates are ignored for ordering.

Preserve unknown method as unknown. Distinguish census, official estimate, projection, register and survey where supported. Compare complete reference dates and apply an explicit source/rank/revision policy for ties. Add targeted regression cases for an unknown method and two observations in the same year. Do not infer that all non-census observations share one methodology.

### F07 — Population shares can imply false comparability

`src/components/SubdivisionPopulation.tsx` divides a dated subdivision value by either a live country population or a bare-number `NATIONAL_REFERENCE_POPULATION` fallback. Its “same-vintage” comment is not enforced by the data model. `src/data/subdivisionPopulation.ts` stores years/basis for subdivisions but reference country totals lack equivalent metadata.

Show both reference years and align territorial definitions. Suppress or clearly qualify shares when incompatible; do not suggest mathematical precision establishes statistical comparability. Existing freshness checks limited to particular countries are useful regressions, not a global demographic certification.

### F08 — Equatorial Guinea anthem media mismatch

`src/data/nationalAnthems.ts` gives GN and GQ the same YouTube ID, `PoYgPJUZXlQ`, with different start offsets (2.3 and 37.2 seconds). In the live GQ anthem dialog, the app presents Caminemos Pisando la Senda and Spanish lyrics while the embedded video title identifies Guinea's Liberté with French lyrics. [Linked video](https://www.youtube.com/watch?v=PoYgPJUZXlQ).

Confirmed scope: wrong-country video metadata/routing. This audit did not independently listen to and authenticate the entire recording. Replace only after verifying the actual audio, title, attribution and start/end segment. Run a duplicate-ID review across the registry; shared anthems and intentional compilations are legitimate exceptions that need explicit annotations.

### F09–F10 — Historical period summaries contain anachronisms

`src/lib/historicalEras.ts` describes `bc2000` using Egypt's Old Kingdom. The Met's curator-authored [Middle Kingdom chronology](https://www.metmuseum.org/essays/egypt-in-the-middle-kingdom-2030-1640-b-c) places approximately 2000 BCE in the Middle Kingdom. Correct the period summary and check its linked polity descriptions and boundaries separately.

The same file describes `bc500` as including “early Maurya in India”. Scholarly [Smarthistory discussion of the Didarganj Yakshi](https://smarthistory.org/didarganj-yakshi/) dates the Mauryan dynasty from approximately 322 BCE. That is an anachronism of about 178 years. Search retrieved the scholarly chronology; a subsequent direct page opening failed, so preserve that retrieval limitation when reproducing the citation. The associated “Warring States” wording also needs a chosen, cited periodization; Chinese chronological conventions should not be silently treated as exact universally agreed boundaries.

Do not fix these solely by editing summaries: verify whether the selected map year, polity registry, capital, flags and population belong to the same temporal snapshot. A later emblem used retrospectively requires an explicit reconstruction label.

### F11–F12 — German political-party coverage and leadership

`src/data/politicalParties.ts`, DE, contains CDU, AfD, SPD, Greens, Die Linke and CSU; it omits SSW. The Bundestag's [current Stefan Seidler biography](https://www.bundestag.de/abgeordnete/biografien/S/seidler_stefan-1047378), current to 12 September 2026 when consulted, and the [SSW's own parliamentary page](https://www.ssw.de/stefan-seidler) establish representation. A non-attached member is not necessarily partyless. A completeness rule limited to parliamentary groups will omit represented small/minority parties.

The SPD row lists Lars Klingbeil alone. The party's [27 June 2025 leadership announcement](https://www.spd.de/service/pressemitteilungen/detail/news/baerbel-bas-und-lars-klingbeil-als-spd-vorsitzende-gewaehlt/27/06/2025) and [current leadership page](https://www.spd.de/ueber-uns) identify Bärbel Bas and Lars Klingbeil as co-chairs. Use plural office-holder records and distinguish party chair, parliamentary leader, government head and electoral lead. Other German co-leadership rows merit the same check but are not certified here merely by analogy.

### F13 — Political-party sourcing does not support “authoritatively verified” coverage

Programmatic examination of all 792 party `sources` arrays found 721 containing exclusively Wikipedia-hosted URLs. The calculation is specifically about the `sources` arrays, not separate logo URLs or every embedded textual comment. No party record has an `asOf` property; dates in prose do not provide a consistent snapshot contract.

This is a source-quality and reproducibility finding, not a finding that 721 parties are fictitious. Add claim-level official parliamentary membership evidence, election dates/results, leadership evidence and attributed ideological assessments. Party self-description is useful evidence of self-description, not independent validation of ideology. Seats, parliamentary group membership and party membership must be separate. A single “progressive to conservative” order should be presented as an attributed simplification, not a universal objective scale.

### F14 — Passports need issuance/version metadata

All 211 `category: "passport"` entries in `src/data/nationalFlags.ts` lack `from`. `src/lib/nationalSymbolImages.ts` selects the first suitable category/image entry; that does not establish current ordinary-passport status. Dominant image-pixel colour cannot establish an issuing authority's official colour specification, and one cover may not represent all concurrently valid ordinary passports.

Add document class, series/version, first issuance, last issuance if known, validity/age variant, issuing authority, specimen source and retrieval date. Distinguish a current series from an older passport still valid for travel. Do not force an adoption year where unknown. Retain original aspect ratio and a documented image transformation history.

### F15 — Sri Lankan capital needs roles

`src/data/countryFacts.ts` collapses the capital to Colombo. The [Sri Jayawardenepura Kotte Municipal Council's city description](https://www.kotte.mc.gov.lk/index.php?Itemid=175&id=25&lang=en&option=com_content&view=article) identifies Kotte as administrative capital and Colombo as commercial capital. A single unqualified string loses this distinction. Model multiple capital functions; verify the exact constitutional, parliamentary, executive and judicial roles before assigning each. Avoid a global rule that every state has exactly one capital.

### F16 — Zimbabwe's currency list omits ZiG

`src/data/countryFacts.ts`, ZW, includes “Zimbabwean bonds” (`ZWB`) and foreign currencies but no ZiG. The Reserve Bank's [April 2024 Monthly Economic Review](https://www.rbz.co.zw/documents/monthly_review/2024/Monthly_Economic_Review_April_2024_1.pdf) describes the introduction of ZiG on 5 April 2024 and conversion of Zimbabwe-dollar balances. The omission is confirmed; this audit does not conclude that every foreign currency listed is invalid.

Model legal tender, domestic unit, circulating instruments and historical units separately, with effective dates. Refresh from monetary authorities and currency-code maintenance sources, not an undated aggregator list alone.

### F17 — Historical populations are not reproducible estimates

The historical polity registry contains population point values, including rounded values for ancient states, without corresponding record-level observation year, geographic extent, source or method fields. A general comment suggesting scholarly estimates and a broad percentage uncertainty does not substantiate each number.

Distinguish a peak population from the selected map year's population. Attach a scholarly citation and the estimate's date/extent; use ranges only if supported. Otherwise display “estimate not verified” or withhold the number. Do not apply a universal uncertainty percentage to evidence of very different quality. This finding does not establish that any particular rounded number was deliberately invented.

### F18 — Administrative taxonomy and geometry require a dated register

Direct file counts: VN 63, AO 18, BI 17, ID 33, NP 14, NO 21 GeoJSON features. The Nepal sample feature is explicitly a former “Administrative Zone”; Norway metadata has 22 rows, which is already different from its 21 map features, and includes categories that cannot all be counted as current counties. Counts alone do not resolve geometry correctness or legal status.

Use a typed entity register: sovereign state, dependency, administrative division, autonomous entity, statistical region, disputed area, traditional region and historical unit. Give each legal/operational validity intervals and parent relationships. An ISO-like code is an identifier, not proof of current boundaries or official status. Resolve code/name/geometry mismatches before attaching a flag or demographic value to an entity.

## Residual evidence gaps — not verified corrections

Earlier leads for Burundi, Indonesia, Nepal, Norway, Kazakhstan, Burkina Faso, Mali and five language records were resolved into F22–F33. Their exact replacement geometry and some legal commencement/version details remain implementation research requirements, as stated in those findings.

| Area | Remaining evidence needed |
|---|---|
| Ethiopia | The registry retains Southern Nations; authenticate current regional/federal-city register, reform instruments and successor geometry. A statistical planning PDF was located but the relevant scanned passage was not visually verified. An official embassy overview found during research itself retained an older count, so an official domain alone is insufficient. |
| Chad, Philippines | Obtain dated current administrative registers and reform instruments; reconcile province versus independent-city levels, including the Maguindanao successors. |
| Cuba currency | CUC remains in the bundle. Verify the central bank's monetary-unification and withdrawal/exchange timeline before assigning exact end dates. |
| Austria, Zimbabwe languages | Austrian bundle uses Austro-Bavarian German; Zimbabwe's 15-item list omits Nambya. Obtain/read the exact current constitutional provisions before treating the proposed corrections and full list as certified. The Austrian RIS article opening repeatedly failed. |
| Afghanistan | Reconcile republic official-name string and de facto flag under an explicit recognition/control and time framework. Do not equate display choice with recognition. |
| Nepal emblem | Compare exact artwork against the 2008 and 2020 legal versions before assigning its design date. |
| Honduras flag shade | Do not automatically flag dark blue using remembered 2022 guidance: search surfaced reports of changed government usage in 2026. Current legal specification, institutional usage and digital colour reference require reconciliation; no confirmed defect is assigned. |
| Other party leadership | Source current plural leadership and parliamentary membership individually; no extrapolation from the German findings. |
| Historical coverage | Every era's polity identities, dates, capitals, legal/de facto status, symbols and boundaries still need claim-level source comparison. Investigate Hejaz 1925, Vietnam 1954, remaining bc2000 overrides and the Amorite language assertion. The Iraq 1938 raw-source false positive is explained below. |
| Anthem recordings | Authenticate every recording and relevant segment; metadata and duplicate IDs alone do not identify the actual sung content. |

Positive control: “Naoero” must not be reflexively changed back to “Nauru” from memory. Current [Australian DFAT country information](https://www.dfat.gov.au/geo/naoero/naoero-country-brief) and the [UN member-state entry](https://www.un.org/en/about-us/member-states/naoero) provide a current-name verification path. This illustrates why a 2026 audit cannot rely on older general knowledge.

## Recommended hard-rule and implementation changes

1. **Replace blanket accuracy language with evidence states.** Use verified-to-source, disputed, provisional, unsourced and not reviewed. A passing test or a previous audit title does not mean a country is fully verified.
2. **Require claim-level provenance.** Every substantive design/symbolism, legal-status, date, population and leadership claim needs a source that actually supports that claim. An image URL does not substantiate a paragraph about colour symbolism. Aggregators and Wikimedia are useful delivery/discovery sources, not automatically authoritative origin evidence.
3. **Make time part of identity.** Separate legal adoption, first use, first issuance, effective administration, source observation and last verification. Use explicit date precision and uncertain bounds. Preserve former subdivisions as historical entities instead of overwriting their names onto new geometry.
4. **Separate unknown from nonexistent.** No located flag source means “not verified/available”, not “has no flag”. A withheld historical symbol needs a display-policy explanation, not a historical nonexistence claim.
5. **Validate artwork provenance, not merely hashes.** A checksum confirms bytes against an expected checksum; a checksum calculated after downloading cannot prove the image matches an official exemplar. Keep original URL, retrieved bytes/hash, source date, licence, transformations and visual comparison result. Approved format conversion or resizing is not fabrication.
6. **Version cartography.** Store upstream release, original entity identifiers, boundary date, resolution and transformations. Preserve asserted borders, actual control and recognition as distinct concepts. Document union/clipping and generalization. Do not claim Natural Earth precision equals surveyed legal boundaries; do not use historical “as they were” language without an uncertainty explanation.
7. **Audit dependent records as a unit.** A reform should trigger checks of names, geometry, capital coordinates, flags, coats of arms, population geography and navigation. A count-only fix is insufficient.
8. **Use domain-specific statistical and political contracts.** Population needs date, basis and extent; parties need chamber, term, seats as-of, party versus group membership and plural office-holders. Prefer unknown to invented defaults.
9. **Add focused factual regression checks.** Cover the documented defects: missing population method, same-year observations, GQ capital transition, Vietnam dated unit count, SPD co-chairs and SSW coverage. Avoid tests that merely repeat an unverified hard-coded answer as their own authority.
10. **Make uncertainty readable in Learn.** Show dates next to populations and political membership; label historical reconstruction and passport series. Offer source access near the relevant claim without forcing readers through implementation details.

## Companion evidence records

- [Country-by-country coverage ledger](LEARN_AUDIT_COVERAGE_2026-09-14.md): 235 registry-union codes with inventory counts, screening scope and finding IDs.
- [Machine-readable integrity results](LEARN_AUDIT_INTEGRITY_2026-09-14.json): category counts, provenance domains and affected IDs, anthem collisions, geometry/metadata differences, per-file geometry hashes/counts and coverage rows.

These records preserve the difference between structural checks and primary-source factual verification. The final coverage statement below supersedes earlier checkpoint summaries.

## Historical-map inventory and renderer safeguards

All 21 historical GeoJSON files were retrieved by baseline blob SHA and parsed successfully: 5,917 features in total. A feature is not equivalent to a state: disconnected polygons, unnamed land and cultural territories affect these counts. Unnamed features are not automatically missing countries.

| File | Features | Unnamed features | Precision codes present |
|---|---:|---:|---|
| world_100.geojson | 248 | 149 | 1 |
| world_1000.geojson | 218 | 89 | 1 |
| world_1200.geojson | 228 | 99 | 1 |
| world_1300.geojson | 221 | 80 | 1 |
| world_1500.geojson | 288 | 91 | 1 |
| world_1600.geojson | 836 | 199 | 1, 3 |
| world_1700.geojson | 781 | 189 | 3, 1 |
| world_1815.geojson | 435 | 107 | 3, 1 |
| world_1880.geojson | 232 | 63 | 3, 2 |
| world_1900.geojson | 213 | 48 | 3 |
| world_1914.geojson | 175 | 33 | 3 |
| world_1920.geojson | 203 | 40 | 3 |
| world_1938.geojson | 248 | 79 | 3 |
| world_1945.geojson | 225 | 42 | 3 |
| world_1960.geojson | 194 | 37 | 3 |
| world_1994.geojson | 236 | 43 | 3 |
| world_600.geojson | 208 | 108 | 1 |
| world_800.geojson | 237 | 101 | 1 |
| world_bc2000.geojson | 145 | 100 | 1 |
| world_bc323.geojson | 144 | 73 | 1 |
| world_bc500.geojson | 202 | 111 | 1 |

The renderer in `src/components/HistoricalMap.tsx` already reads `BORDERPRECISION` and displays an approximation caveat when more than half of known features have precision at most 1. It also marks some derived boundaries. Preserve these safeguards. Improvement: a low-precision selected feature should disclose its uncertainty even when the whole-map threshold is not met. The highest upstream precision code still does not imply cadastral or treaty-level accuracy.

**Avoid a false positive:** the raw 1938 Iraq feature still carries `PARTOF: Mesopotamia (GB)` and a British `SUBJECTO`. However, `FALSE_SUBJECTO` explicitly rejects that ruler for `ad1938|Iraq`, and an era override describes independent Iraq. Therefore the raw stale field must not be reported as proof that the current panel calls Iraq a British subject. Normalize or annotate the source artifact to prevent future consumers bypassing that correction; validate rendered behaviour separately.

### F19 — Incorrect historical overrides can survive outside the active map

The `bc2000` override block in `src/lib/historicalEras.ts` includes a Babylonian Empire note explicitly describing Hammurabi. [The Met's Isin-Larsa and Old Babylonian chronology](https://www.metmuseum.org/essays/the-isin-larsa-and-old-babylonian-periods-2004-1595-b-c) dates Hammurabi's reign to approximately 1792–1750 BCE, so it does not belong to a 2000 BCE snapshot. Other entries in this block, including New Kingdom Egypt and Shang Dynasty, require chronology checks as a group.

The baseline raw 2000 BCE GeoJSON does not have a `NAME: Babylonian Empire` feature. Consequently this is confirmed incorrect repository content, with live reachability unproven, rather than a claim that a user currently sees Hammurabi on that map. Remove or correctly relocate unreachable misinformation as well as fixing active entries; a later alias/import could activate it. The nearby claim that Amorite peoples were Indo-European is an additional linguistic lead requiring a precise scholarly citation before replacement.

### F20 — Iraq 1960 image/prose disagreement

The `ad1960` Iraq override in `src/lib/historicalEras.ts` selects `historical-flags/iraq-1959.svg` but its note ends by describing the old royal flag as representing the kingdom that had just ended. This is an internal inconsistency between the designated asset/version and explanation. The designated asset was subsequently rendered and visually inspected: it has vertical black-white-green bands with the red/yellow central motif, confirming the asset/prose disagreement. Replace the stale sentence after completing the design-source comparison. Do not change the asset back to a royal flag simply to make it agree with incorrect prose.

## Additional confirmed findings from the expanded review

### F21 — Kyrgyzstan's current flag asset still has wavy rays (P1)

`public/flags/kg.svg`, baseline blob `8487dc9e0c9a37f441be1478809bf09e56d23295`, was rendered and visually inspected. It has the former wavy sun rays. Both `kg-official-national` in `src/data/nationalFlags.ts` and `FLAG_MEANINGS.KG` acknowledge the 2023 straightening, but the current national entry still points at this older image. `src/api/countries.ts` also uses that local asset for the main country flag, including on the successful REST response path.

The Kyrgyz national news agency's [23 December 2023 report of the signed law](https://en.archive.kabar.kg/news/sadyr-zhaparov-signs-law-on-changing-flag-of-kyrgyzstan/) explicitly confirms wavy-to-straight rays. Its [8 January 2024 report](https://en.archive.kabar.kg/news/new-flag-raised-on-main-square-of-kyrgyzstan/) records the new flag's raising. These are direct state-agency reports; this audit did not separately inspect the promulgated law's annex or publication-effective-date clause.

Replace the current asset using an authenticated current exemplar and preserve the old design as a dated historical version. Keep original 1992 adoption distinct from the 2023 design revision. Old documents remaining valid does not make the former artwork the current national design.

### F22 — Burundi retains the old provincial system (P1)

`src/lib/subdivisionMeta.ts` and `public/subdivisions/BI.json` each contain 17 old provincial records/features. The Senate's French [3 July 2025 approval of provincial governors](https://senat.bi/approbation-des-candidats-aux-postes-de-gouverneur-de-province/) names the five provinces Buhumuza, Bujumbura, Burunga, Butanyerera and Gitega. This is operational institutional evidence, beyond merely announcing a future reform. The Senate page was retrieved during research; a later repeat opening timed out.

Migrate the current register and boundaries to the five-province framework, using the underlying organic law and official geometry for exact limits. This finding establishes the old system is unsuitable as the current layer; it does not certify every boundary or the precise commencement clause. The older dataset also merits a separate historical completeness check, including Rumonge.

### F23 — Indonesia's province registry predates multiple divisions (P1)

Metadata and `public/subdivisions/ID.json` each contain 33 provinces/features. [ANTARA's 9 December 2022 report](https://en.antaranews.com/news/264759/southwest-papua-officially-becomes-indonesias-38th-province) directly reports the home affairs minister inaugurating Southwest Papua as the 38th province under Law 29/2022. [Statistics Indonesia's provincial export publication](https://www.bps.go.id/en/publication/2025/10/07/023454770c0181db62641ec4/export-of-indonesia-by-province-of-origin-of-goods-2024.html) corroborates coverage of 38 provinces.

Update the omitted provinces and their predecessor extents, codes, capitals and population geography together. Do not treat Jakarta's capital/special-region transition as resolved by the count; its legal and operational status requires a separate dated check.

### F24 — Nepal presents former zones as current subdivisions (P1)

The metadata explicitly calls the layer `Administrative Zones`, with 14 rows, and `public/subdivisions/NP.json` has 14 features. Some row types are also inconsistent, such as Seti Zone typed as District. [Nepal's 2015 Constitution, Article 56 and Schedule 4](https://www.constituteproject.org/constitution/Nepal_2015), establishes the federal structure and seven provinces. The consulted text is a scholarly-hosted translation of the constitutional primary text, not an authenticated current consolidated Nepali gazette.

Provide provinces as the current first-level layer and retain zones only as historical geography. Source current province names, capitals and boundaries separately; the numbered 2015 schedule alone cannot substantiate later province names or later constitutional map revisions.

### F25 — Norway combines obsolete counties with dependencies (P1)

The 22 metadata rows and 21 map features include former counties Nord-Trøndelag, Sør-Trøndelag and Hedmark. The Norwegian government's [county division from 2024](https://www.regjeringen.no/no/tema/kommuner-og-regioner/kommunestruktur/fylkesinndelingen-fra-2024/id2922222/) lists 15 counties from 1 January 2024, including Trøndelag, Innlandet, Vestland and Agder.

This is not simply an assertion that every difference from 15 is an error: the repository deliberately includes dependencies. The confirmed problem is obsolete county identities in the current county layer. Separate dependencies by type and reconcile the actual county register and geometry with the dated official list.

### F26 — Kazakhstan omits current regions and a republican city (P1)

The metadata has 16 rows in an older configuration. The Bureau of National Statistics' [register as of 1 July 2026](https://stat.gov.kz/en/industries/social-statistics/demography/publications/513321/) records 17 regions and three cities of republican significance. It expressly includes Abay, Zhetysu and Ulytau, and lists Astana, Almaty and Shymkent separately.

Update the typed first-level register and affected geometry, rather than treating all 20 as identically constituted regions. The statistical register is not a complete treatment of Baikonur's special treaty arrangements; do not infer its legal status merely from a row count.

### F27 — Burkina Faso's province layer misses the 2025 reform (P1)

The metadata retains 45 provinces. The Presidency's French [Council of Ministers communiqué of 2 July 2025](https://www.presidencedufaso.bf/conseil-des-ministres-du-2-juillet-2025/) states the reorganization to 17 regions and 47 provinces, names the two new provinces Dyamongou and Karo-Peli, and records a six-month implementation transition. It also reports renamings, including Sanmatenga to Sandbondtenga and Oubritenga to Bassitenga.

Obtain the implementing instruments and official geometry, then migrate names, hierarchy and boundaries together. The communiqué supports the reform and transition; this audit did not separately verify every gazette commencement date or operational boundary.

### F28 — Mali retains an obsolete regional configuration (P1)

The metadata contains nine rows, including the `ML-3` label Wassoulou in the position requiring reconciliation with Sikasso. The Presidency's French [19 May 2023 presentation of the new administrative maps](https://koulouba.ml/reorganisation-administrative-et-territoriale-remise-de-la-nouvelle-carte-administrative-du-mali-celles-des-19-regions-et-celle-du-district-de-bamako-au-chef-de-letat/) explicitly describes 19 regions and the District of Bamako and refers to instruments promulgated on 13 March 2023.

Replace the present-time register and map with the dated legal configuration. Actual government control and conflict geography are separate layers; an official administrative division does not establish effective control throughout its territory.

### F29 — South Africa omits its twelfth official language (P2)

`src/data/countryFacts.ts`, ZA, lists eleven languages and omits South African Sign Language. The constitutional CRL Rights Commission's [20 July 2023 statement](https://www.crlcommission.org.za/the-recognition-of-the-south-african-sign-language-as-the-countrys-12th-official-language/) confirms the amendment was signed into law. Add SASL and date the language status; a pre-signing announcement would not alone have established enactment.

### F30 — Algeria omits Tamazight's official status (P2)

`COUNTRY_FACTS.DZ.languages` contains only Arabic. The official gazette's French [constitutional text](https://www.joradp.dz/TRV/FConsti.pdf), Article 4, printed page 7 (PDF page index 3), recognizes Tamazight as both national and official. Add the missing language. Older government translations that describe only national status must not override the later constitutional text.

### F31 — Azerbaijan's official-language field includes Russian (P2)

`COUNTRY_FACTS.AZ.languages` contains Azerbaijani and Russian. The file header defines this as official languages. [Article 21 of the Constitution on the Presidency's website](https://president.az/en/pages/view/azerbaijan/constitution) designates Azerbaijani as the state language and separately protects other languages. Russian's use by residents does not give it the same constitutional designation.

Keep spoken-language information if wanted, but assign its correct status. The live label merely saying “Languages” does not repair the ambiguity of the underlying official-language contract.

### F32 — Switzerland substitutes a dialect umbrella for German (P2)

`COUNTRY_FACTS.CH.languages` lists Swiss German alongside French, Italian and Romansh. The Federal Department of Foreign Affairs' German [language overview](https://www.aboutswitzerland.eda.admin.ch/de/sprachen) names German among the four national languages and explicitly distinguishes Schweizerdeutsch from Hochdeutsch.

Use German for the national-language identity and explain Swiss German dialects separately. Model national versus federal/regional official status rather than assuming every listed language has identical official use. The precise federal Romansh qualification should be sourced to the applicable constitutional provision before implementing that richer model; the general overview alone is not that legal analysis.

### F33 — Bolivia's official-language list is severely incomplete (P2)

`COUNTRY_FACTS.BO.languages` contains Aymara, Guaraní, Quechua and Spanish. [Article 5 of the 2009 Constitution](https://www.constituteproject.org/constitution/Bolivia_2009) lists Spanish and 36 indigenous languages as official. The consulted edition is a scholarly-hosted constitutional translation.

Provide the complete legal list with source spelling, while distinguishing legal recognition from population prevalence and actual government-language requirements. A short UI preview is acceptable if it is explicitly a preview of complete data; silently storing four as the entire official list is not.

### F34 — Sierra Leone's currency record omits the redenominated leone (P2)

`COUNTRY_FACTS.SL.currencies` contains only SLL. The ISO 4217 maintenance agency's [Amendment 175, 31 March 2023](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/amendments/dl-currency-iso-amendment-175.pdf), identifies the redenominated leone as SLE/925 and transmits the Bank of Sierra Leone's notice.

Add SLE with the correct denomination/version relationship and retire the unqualified old-code-only current display. This citation establishes the omitted unit/code; the audit has not separately established the entire old-note withdrawal and exchange timeline from the embedded notice. Do not infer that code replacement and loss of exchangeability happen on the same date.

### F35 — Socialist Bosnia's flag explanation reverses canton colours (P2)

`NATIONAL_FLAG_MEANINGS["ba-sr"]`, in `src/data/nationalFlags.ts`, describes a Yugoslav red-white-blue canton. The linked `public/national-flags/ba/bosnia-sr.svg` was rendered and inspected: its canton is blue-white-red. This is a directly established image/prose contradiction. Correct the stripe order and independently review the accompanying absolute assertion that socialist Bosnia never adopted symbols of its own. The cited Fandom page is not adequate authority for that broad historical interpretation.

### F36 — Cuba's arms chronology contradicts itself (P2)

`NATIONAL_FLAG_MEANINGS["cu-president"]` says the arms in that form were adopted after the 1959 revolution, while `cu-arms` in the same file dates the current arms to 1906. The presidential explanation cites only Grokipedia. These incompatible historical claims require correction and an authenticated version history.

The confirmed finding is the internal chronological conflict and unsupported attribution, not a certification that the repository's 1906 date proves every detail in the current drawing existed unchanged in 1906. Consult the original symbol instruments and distinguish original adoption, subsequent regulation and artistic redraw. Do not repair the contradiction by arbitrarily making both dates match.

### F37 — More anthem records collide on the same playback segment (P1)

The complete `NATIONAL_ANTHEMS` duplicate-ID scan found Mali and Somalia both use `kmPAA6zJl80` at exactly 4.2 seconds despite different anthem identities. The same recording segment cannot be an independently correct rendering of both distinct anthems. Oman and Romania also share `3RCp9Y14ktg`, at 10.3 and 11.3 seconds, warranting direct playback authentication. These are registry findings; this audit did not listen to and identify every track.

Cyprus and Greece also share an ID and offset, but shared-anthem identity makes duplication legitimate there; do not automatically reject every duplicate. Require an explicit shared-anthem or compilation-segment explanation and verify audio, not only video titles. F08 separately documents the live Guinea/Equatorial Guinea routing problem.

### F38 — Explanatory sourcing falls short of the repository's verification language (P2)

All explanation source arrays were screened. Wikipedia-only arrays occur in 1,130 of 1,416 `FLAG_MEANINGS` entries, 1,061 of 1,602 `NATIONAL_FLAG_MEANINGS` entries, and 503 of 1,012 `CITY_FLAG_MEANINGS` entries. The national-symbol explanation registry has eight rows citing Grokipedia and four citing Fandom; `FLAG_MEANINGS` has twelve Fandom-citing rows. These are source-array counts, not counts of false explanations.

The exact Grokipedia-citing IDs are `cu-president`, `de-navy`, `es-1938`, `ma-royal`, `mx-1893`, `no-war-flag`, `us-army` and `ve-president`. The national-symbol Fandom IDs are `ba-sr`, `kh-royal-standard`, `my-agong` and `np-1856`. All affected IDs and URLs are preserved in the companion integrity JSON.

Do not treat an encyclopedia, generated encyclopedia, fan wiki or a valid URL as proof of an authoritative claim. Prioritize legal design specifications, issuing authorities, archives and attributed specialist research. Wikipedia/FOTW can remain useful discovery or attributed secondary evidence, but each claim needs an evidence state. Lack of primary evidence should not be repaired by inventing symbolism or treating silence as proof of nonexistence.

### F39 — The “authoritative bundle” rule can preserve and reintroduce errors (P1, implementation/documentation)

`src/data/countryFacts.ts` calls the mledoze/countries-derived bundle authoritative. `CLAUDE.md` instructs capital reconciliation to prefer `COUNTRY_FACTS.capital`. Yet F01, F15 and F29–F34 establish defects or inadequacies in that very bundle. Meanwhile `src/api/countries.ts` prefers nonempty REST language/currency/name values over the bundled fields when the API succeeds. Editing a fallback file alone therefore does not reliably fix user-visible information.

Treat the aggregator as an upstream dataset, not the ultimate factual authority. Introduce source-backed, dated field overrides applied consistently after both successful API normalization and offline fallback. Regeneration must preserve them. Revise documentation so completeness does not forbid replacing a known false value with a qualified or unknown value. Preserve offline availability while making accuracy and provenance explicit.

## Final coverage, audit opinion and remediation order

**Audit opinion: the reviewed baseline is not reliable enough to support a blanket “100% accurate” Learn claim.** This report contains 39 numbered findings: specific factual errors, internal contradictions, stale records and systemic evidence/model defects. They are not 39 invented countries, 39 independently measured failure rates, or proof of deliberate fabrication. A confirmed error in one field does not invalidate every field for that country.

Completed coverage comprises a full repository tree inventory; structural/provenance screening of the national-symbol, party and administrative registries; parsing of all 251 subdivision GeoJSON files (4,365 features); parsing of all 21 historical GeoJSON files (5,917 features); visual identity screening of all 195 current national flag SVGs; targeted enlarged image comparisons; population/API/generator and relevant hard-rule review; and targeted interaction with the published Learn experience. Primary-source comparisons resolved the specific countries and claims identified above, using sources in Spanish, Portuguese, Vietnamese, French, Norwegian and German as well as English official reports and constitutional translations.

The 1,837 national-symbol entries include 239 official, 222 coat-of-arms, 211 passport, 212 football-crest, 526 historical, 166 military, 113 maritime, 126 standard, 16 civil/state and 6 indigenous entries. The category counts exceed the number of countries because multiple versions and uses exist. No duplicate symbol IDs, missing referenced local symbol paths, or reversed numeric `from`/`to` intervals were found. Those checks establish structural consistency, not historical or artistic authenticity.

All subdivision geometry files passed the implemented coordinate-range and ring-closure checks. This is **not** a topology, self-intersection, overlap, legal-border or upstream-transformation certification. Raw metadata/geometry code sets differ for 40 countries/groups; the companion JSON records each difference. Deliberate dependency merges, disputed-area handling and runtime aliases can explain differences, so the 40 are review targets, not 40 confirmed broken maps.

All 195 national flag SVGs were rendered into labelled contact sheets and visually screened for coarse identity/design. Kyrgyzstan was enlarged to confirm the ray mismatch. This screening does not certify tiny heraldic details, exact legal colours, star counts, precise construction sheets or every permitted usage variant. The 222 coat-of-arms entries, 211 passports, 526 historical national-symbol entries and all subnational/city images did **not** each receive a complete authoritative visual comparison. The report does not imply otherwise.

No later-than-2026 subdivision population year was found. Six zero-population records require contextual interpretation (including uninhabited or evacuated territories); zero was not automatically reported as an error. The 5,281 population records have not each been matched to their original census or estimate publication. All 792 party source arrays were screened, but current membership and leadership were not individually authenticated in every one of the 97 groups.

The country coverage ledger covers 235 codes in the union of the facts, national-symbol, subdivision-metadata and party registries. It is not a list of 235 sovereign states. Every row records actual screening scope and targeted findings. Additional geometry-only files remain covered by the separate 251-file inventory. No country is labelled fully factually certified merely because it has no finding.

Published interaction confirmed the GQ/Japan problems and the obsolete Vietnam subdivision experience. The later inspected deployment footer reported `b337fc5`, build `2026-09-13T23:51:13.160Z`; the intervening known commits only changed this audit document. The code findings remain tied to baseline `8b2167aef864e61aaa2051ed714ce391f2ff1023`. Live API values and third-party media can subsequently change; targeted observations are not an exhaustive replay of all country/era/device combinations.

**Recommended order:** first correct the current flag, false passport explanation, stale administrative layers, capital/currency errors and anthem routing; then implement dated provenance and consistent override application; then authenticate the remaining artwork, historical reconstructions and political/demographic claims using the ledger. Keep factual corrections in reviewable migrations with their citations and dependent-record updates. This audit changes only documentation and evidence artifacts.

The audit deliverable is finalized for the stated baseline and evidence obtained. **The user's requested universal, claim-by-claim 100% verification has not been achieved.** The explicit limitations and unresolved items are part of the result, not a claim that unexamined content passed. A complete certification would require individual source comparisons for the remaining claims, images and boundaries recorded in the ledger.
