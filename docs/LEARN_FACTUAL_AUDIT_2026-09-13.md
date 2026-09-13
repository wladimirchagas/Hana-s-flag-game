# Learn factual audit — evidence and remediation register

Last updated: 2026-09-13. **Open audit; this is not a certification of complete or 100% accuracy.** Confirmed defects below are actionable; unverified leads are explicitly separated. No application data, artwork, or hard rules have been changed by this audit.

## Scope, baseline and reproducibility

Repository: `wladimirchagas/Hana-s-flag-game`. Baseline commit: [`8b2167aef864e61aaa2051ed714ce391f2ff1023`](https://github.com/wladimirchagas/Hana-s-flag-game/tree/8b2167aef864e61aaa2051ed714ce391f2ff1023). Published experience: [Learn](https://wladimirchagas.github.io/Hana-s-flag-game/learn). Live footer inspected during the audit reported `8b2167a`, built `2026-09-13T14:01:44.365Z`. Later deployments require a new comparison.

Inventory: 7,656 Git tree entries; source, generators, existing audit documents, Learn components and data pipelines examined. Parsed national-symbol registry: 230 country/territory groups and 1,837 entries; 211 passport entries. Political-party registry: 97 groups and 792 entries. Subdivision metadata: 204 groups and 4,182 division rows. These are inventory counts, **not counts of independently verified facts**. Country/territory groups must not be equated with sovereign-state counts.

Live observations recorded: country selector/grid, country details, passport display, and anthem embed. Equatorial Guinea and Japan were specifically inspected. Most images have not yet been individually visually compared against original authoritative exemplars. Six subdivision GeoJSON files were parsed directly (VN, AO, BI, ID, NP, NO); their feature counts are recorded below. Historical geometry has not yet received a polygon-by-polygon source comparison.

All repository paths below refer to the fixed baseline, not whichever revision happens to be on main when this report is read. Quoted strings are searchable anchors; line numbers can move. External sources were consulted on 2026-09-13. Government material is authoritative for that government's law, issuance and claims; it does not by itself adjudicate contested sovereignty. Scholarly reconstruction, legal designation, actual control and international recognition require separate treatment.

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

`src/data/subdivisionMeta.ts` contains 63 Vietnamese divisions; `public/subdivisions/VN.json` also contains 63 features. The Vietnamese government [lists 34 provincial-level units from 12 June 2025](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm): 28 provinces and six centrally governed cities. Its [Decision 19/2025 code-list explanation](https://xaydungchinhsach.chinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-cac-don-vi-hanh-chinh-cap-xa-moi-11925070418263625.htm) supplies the later operative coding context.

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

## Unresolved leads — do not present as verified corrections yet

These are recorded to prevent loss across sessions. Repository observations are real; proposed present-day replacements still require exact primary citations and temporal checks.

| Area | Repository observation | Required next evidence |
|---|---|---|
| Burundi | 17 metadata rows/features, older provincial system | Obtain the exact 2023 organic law and operational transition evidence for the five-province system; reconcile former Rumonge omission. |
| Indonesia | 33 province rows/features | Official 38-province register and laws/geometry for North Kalimantan and Papua successors; check Jakarta's legal/operational status separately. |
| Nepal | 14 former zones, including questionable name mapping | Constitution Schedule 4, current seven-province names/capitals and official geometry; preserve zones only historically. |
| Norway | Old county names and external territories mixed; 22 metadata rows vs 21 features | Current 15-county official register and 2024 reforms; reconcile county vs territory categories. |
| Ethiopia | Older configuration retaining SNNPR | Official instruments for Southwest, Central and South Ethiopia and current federal-city treatment. |
| Kazakhstan | Older configuration and Nur-Sultan naming | Official 2022 regional reforms, current Astana designation and cities of republican significance. |
| Burkina Faso, Mali, Chad | Older administrative configurations | Exact reform laws, effective/operational dates, names, hierarchy and official boundaries; do not assume remembered counts. |
| Philippines | Mixed province/city rows; old Maguindanao configuration | PSA PSGC edition and implementation dates; distinguish provinces and independent/highly urbanized cities. |
| Cuba | CUC retained alongside CUP | Banco Central monetary-unification instruments and historical end dates. |
| South Africa | Eleven-language list excludes SASL | Exact constitutional amendment and current official-language list. |
| Austria, Switzerland, Azerbaijan, Bolivia, Algeria | Language labels/counts may confuse official language, dialect and widely spoken language | Constitutions and implementing laws in original language; distinguish national, official, regional and working status. |
| Afghanistan | Republic official-name string combined with de facto flag override | Explicit legal-recognition/control framework, current source dates and separate former-state identity. |
| Nepal emblem | Date range begins 2008 although an image could embody the 2020 map revision | Inspect exact asset and manifest; establish the specific version and legal adoption date before declaring a mismatch. |
| Other party leadership | Single-name fields may omit co-chairs | Official leadership pages for each row; never infer from a neighbouring party. |
| Historical borders documentation | Statements about Iraq 1938, Hejaz 1925 and Vietnam 1954 require checking | Treaty/independence and conquest chronologies; distinguish a documentation error from an actual rendered boundary error. |

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

## Coverage and continuation ledger

| Stream | Completed in this checkpoint | Still open |
|---|---|---|
| Repository inventory | Fixed baseline, full Git tree, source/generator/document review, registry counts | Complete per-asset byte/source inventory |
| National facts | Targeted current capital/currency precision checks | Every country's names, languages, capital functions, monetary status |
| National/subnational symbols | Japan live image/prose comparison; passport schema review | Individual authoritative visual/design/date review of all entries, including city and subdivision flags |
| Administrative geography | All metadata inventoried; six GeoJSON feature counts; VN/AO primary comparison | Every country's dated official register and polygon/source comparison |
| Population | National/subdivision pipeline and method/date defects traced | Individual census/estimate validation, city extents and historical estimates |
| Political parties | All 792 source arrays screened; Germany targeted primary checks | Remaining countries' current membership/leadership/ideology/logo review |
| Historical content | Two dated-summary errors and population evidence model reviewed | Every era's entities, borders, capitals, flags, status and demographic citations |
| Published Learn | Baseline matched; targeted country/passport/anthem observations | Full device/navigation coverage and all country/era combinations |

Resume from this ledger, not from an assumption that unlisted countries passed. Country-by-country verification, each historical snapshot and each image remain open. The report establishes substantial confirmed defects and a reproducible remediation path, but **does not satisfy a claim that every country, document, image and boundary has been fully verified**.
