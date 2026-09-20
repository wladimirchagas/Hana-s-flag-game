# Learn claim and artwork verification — 20 September 2026

**Universal verification is not complete.** This report records completed full-dataset comparisons and new image/metadata findings. It does not certify all 4,638 records in the seven large registries at `db3ba05`, every sentence, every historical date, every boundary or all artwork as correct. Unchecked and unresolved claims remain explicitly unverified; an image decoding successfully or matching a third-party download does not establish authenticity.

This supplements [the original audit](LEARN_FACTUAL_AUDIT_2026-09-13.md) and [the continuation findings F40–F59](LEARN_FACTUAL_AUDIT_2026-09-19.md). No application data was changed. The evidence ledgers below are intended to preserve both positive verification and failures for subsequent work.

## Latest reconciliation — application revision db3ba05

The audit now includes application changes through **`db3ba0559016b20bfd0243ef13b1d16413979b33`**. Audit-document commits after this hash are separate from application changes. The sections below that describe `43cfd13` retain their historical denominators.

Two further deltas were inspected: `43cfd13` → `d130b10` (409 additional images, two new newspaper-selection scripts, installer changes and registry changes), and `d130b10` → `db3ba05` (74 additional images, agency-category cleanup, grid rendering/CSS and checker changes). All **483** additional image blobs were fetched at their pinned hashes and decoded; every image was visually screened. The corresponding **503 record references** (428 + 75) were read. This is complete screening of these deltas, not certification that all depicted identities are correct.

At `db3ba05`, newspapers contain **937 records, 612 with images**; agencies contain **128 records, 113 with images**. **340 no-image records** remain across these two registries. The latest cleanup removes 60 agency entries and adds ten newspaper entries. Removal closes that entry’s agency-category problem, but does not verify the migrated facts or image. All five earlier F60 wrong-entity logos and all 25 further F64 wrong-entity logos remain referenced, unchanged.

The subsequent live UI check displayed build **`26a2f2d`**, an audit-document commit after `db3ba05`. On the live Klix.ba detail card, the masthead visibly reads **TELUS Digital**, with image URL `/newspaper-logos/ba/klix.jpg`; the card labels the outlet both a digital news portal and a daily newspaper. Bosnia and Herzegovina's national panel displays population **3.16 million** without an observation year. These are direct public-UI observations, not deployment inferred solely from repository content. No application data or artwork was changed by this audit.

A newer application head, **`7dda29d2444d237c6dde9dc3aabbec08408bd03b`**, was subsequently detected. Its delta is being reconciled separately; findings above are pinned to `db3ba05` until explicitly rechecked. The informal progress estimate requested by the user is approximately **10% complete / 90% remaining** against universal independent verification. This is a rough workload estimate, not a measured percentage of an exhaustively enumerated claim denominator.

## Earlier reconciliation — revision 43cfd13

Previous audited application revision: `63adaf34cbe32bc20c4362fe2636a1cd7bc5371b`. This pass also reconciles the three subsequent application commits through **`43cfd13b2194cdf57a5f32a7c910d4dd7ab04d67`**, after the earlier audit-save commits. The new delta contains **231 paths: 227 added newspaper/agency images, two added scripts, and two modified registries**. Every downloaded file matched its pinned Git blob hash. All 227 images decoded and were visually read, together with all 227 accompanying descriptions.

The registry changes affect **181 newspaper and 46 agency records**. Only `logo`, `logoExplainer`, `licenceNote`, and `noImageReason` changed. Ownership, founding dates, audience claims, frequency, category, headquarters and other factual fields were not corrected by these commits. Newspapers now have 231 images and 488 no-image records; agencies have 52 images and 136 no-image records. Thus F58's earlier count of 851 no-image claims is historical: **624 remain** in these two registries at this revision. This does not mean each retained statement about searches performed is true.

The most recent deployed UI previously inspected showed `63adaf3`. **This pass does not establish that `43cfd13` is deployed.** New findings below describe the pinned repository assets and the text the registries provide to Learn mode.

## Complete comparisons performed in this pass

| Claim group | Denominator | Result | Exact limits |
|---|---:|---|---|
| GDP and GDP per person, USD/local currency | 766 values | 758 match World Bank series values; eight unsupported fallbacks | Numeric/source agreement, not complete verification of currency presentation or economic methodology |
| Freedom House 2024 scores | 193 | 99 agree; **94 disagree** | Every bundled score checked against the stated edition |
| Freedom House 2024 status labels | 193 | 186 agree; **seven disagree** | Every bundled status checked; ranks and rank changes remain separate claims |
| Newly added media images | 227 | All exact blobs decoded and visually screened; five wrong entities and one additional conflict with current publisher branding identified | Visual screening is not primary-source certification of all remaining identities |
| New media image descriptions | 227 | Ten direct visual-description conflicts; five variant/rendering caveats recorded | No-conflict observations do not verify the prose's institutional or historical claims |
| Exact Commons artwork references in new media records | 85 | All requested; metadata recovered for 79; six unresolved | Commons records are evidence about the cited artwork, not blanket authority for official brand status |
| V-Dem v16 bundled entries | 173 | All scores and regime labels agree; all ranks/rank changes consistent with same-version tied-rank ranges | 2026 release, 2025 observations; PS is West Bank only; report-table differences are not treated as factual errors |
| GICG passport image provenance | 188 | **188/188 live source hashes match the manifest** | Third-party source consistency only; official issuance series/currentness not established |

The GDP and Freedom House counts are individual field comparisons, not merely file counts or sampled countries. The media ledger identifies the extent of each individual review.

## F46 expanded — widespread mismatch with the labelled Freedom House edition (P1)

The complete comparison confirms **94/193 score mismatches**, beyond the four examples in the earlier report. `src/data/countryFacts.ts` and `scripts/data/democracyData.mjs` label these records 2024. Do not describe this as merely using an older accurate edition: many values do not match the edition actually labelled.

| Country | Bundled score | Published 2024 score |
|---|---:|---:|
| Bangladesh | 45 | 40 |
| Bhutan | 68 | 63 |
| Germany | 95 | 93 |
| India | 63 | 66 |
| Kuwait | 31 | 38 |
| Sudan | 2 | 6 |
| Syria | 5 | 1 |
| Tunisia | 44 | 51 |
| United States | 84 | 83 |

The seven incorrect status labels are:

| Country | Bundled | Published 2024 |
|---|---|---|
| Bhutan | Free | Partly Free |
| Jordan | Partly Free | Not Free |
| Kuwait | Not Free | Partly Free |
| Niger | Not Free | Partly Free |
| Senegal | Free | Partly Free |
| Thailand | Not Free | Partly Free |
| Tanzania | Not Free | Partly Free |

Source method: 185 individual 2024 report headers were read directly, Belgium and Bolivia were resolved from the primary pages' search extracts, and six remaining scores/statuses were established from the explicitly labelled previous-year figures in their 2025 reports: Austria, Bosnia and Herzegovina, Burundi, Benin, Bahamas and Central African Republic. The evidence URL and method are preserved per row. This is not substituting 2025's current score for 2024's score.

Examples: [Bhutan 2024](https://freedomhouse.org/country/bhutan/freedom-world/2024), [Kuwait 2024](https://freedomhouse.org/country/kuwait/freedom-world/2024), [US 2024](https://freedomhouse.org/country/united-states/freedom-world/2024), [Bahamas 2025 with previous-year figure](https://freedomhouse.org/country/bahamas/freedom-world/2025).

**Required change:** regenerate score, status and edition together from a reproducible publisher dataset. Identify app-derived rankings as such, document the country universe and tie rule, and calculate rank changes from two real editions. All bundled Freedom House `rankChange` values are zero; their factual validity has not been established. Re-ranking this same 193-country set by the verified scores using competition ranking would change 147 bundled rank numbers; that is an audit calculation, not an official Freedom House ranking.

## F47 expanded — all GDP values compared, provenance/freshness still defective (P1)

All 766 numeric fields were compared with the primary World Bank API's `NY.GDP.MKTP.CD`, `NY.GDP.MKTP.CN`, `NY.GDP.PCAP.CD`, and `NY.GDP.PCAP.CN` series for 2021–2025. The downloaded response metadata reported `lastupdated: 2026-07-13`. Comparison tolerance was 0.011 to accommodate the bundle's two-decimal rounding.

**758 match**: 750 observations from 2024, four from 2023 and four from 2022. Among matching values, **724 have a newer 2025 observation available** in the retrieved series. Old-but-accurate observations must not be called fabricated; omission of their year and an unsupported implication of currentness are the relevant defects.

The eight unmatched values are the USD GDP and USD GDP-per-person fallbacks for Eritrea (2.1 billion / 600), North Korea (24.5 billion / 960), South Sudan (7 billion / 590), and Yemen (21 billion / 650). The retrieved primary series does not substantiate them in 2021–2025. This establishes unsupported fallbacks, **not proof that the numbers were invented or can never be supported by another source**.

Source example: [World Bank GDP series](https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2021:2025&per_page=20000). Each ledger row includes its indicator, country-specific API URL, matching year(s), latest available year/value and source update date.

**Required change:** retain source, observation year, series identifier, currency/unit, retrieval date and estimate/revision status alongside every value. Unsupported fallbacks should be omitted or explicitly labelled with their actual independent source and year. Do not equate a metadata fetch date with the observation year.

## F60 — new logo backfills still substitute other countries' publications (P1)

| Registry ID and file | Actual identity evidenced by its cited artwork | Evidence |
|---|---|---|
| `bg-trud`, `public/newspaper-logos/bg/trud.png` | Soviet trade-union newspaper Trud; not Sofia's Trud | [Exact cited file](https://commons.wikimedia.org/wiki/File:LogoTrud.svg) identifies the Soviet publication. [Bulgarian publisher artwork](https://trud.bg/frontend/images/logo-2023.svg) was downloaded and visually compared. |
| `hu-blikk`, `public/newspaper-logos/hu/blikk.svg` | Norwegian Blikk magazine; not the Hungarian tabloid | [Exact cited file](https://commons.wikimedia.org/wiki/File:Blikk_logo.svg) points to blikk.no. Both publishers' official logos were downloaded and viewed: [Norway](https://www.blikk.no/view-resources/dachser2/public/blikk/blikk_logo-black.svg) and [Hungary](https://www.blikk.hu/). |
| `mx-el-universal`, `public/newspaper-logos/mx/el-universal.svg` | El Universal of Cartagena, Colombia; not Mexico City's newspaper | [Exact cited file](https://commons.wikimedia.org/wiki/File:Logo_El_Universal_2021.svg) explicitly identifies Cartagena and supplies the [Colombian publisher's artwork](https://portales.eluniversal.com.co/externos/logo-eu-rediseno-2021.svg), which was downloaded and visually compared. |
| `tn-assabah`, `public/newspaper-logos/tn/assabah.jpg` | Moroccan Assabah; not the Tunisian publication | [Exact cited file](https://commons.wikimedia.org/wiki/File:Assabah-logo.jpg) names assabah.ma as source and identifies Moroccan usage. [The publisher](https://assabah.ma/) describes itself as a Moroccan daily. |
| `pe-la-republica`, `public/newspaper-logos/pe/la-republica.jpg` | Colombian La República; not the Lima daily | [Exact cited file](https://commons.wikimedia.org/wiki/File:La_República_logo.jpg) identifies [Q735264, the Colombian newspaper](https://www.wikidata.org/wiki/Q735264). The bundled red speech-bubble LR artwork is the cited image. This identity determination uses the artwork's explicit metadata; current official-brand status is a separate question. |

Additional conflict: `es-el-mundo` uses an oversized red M. The [Spanish publisher's current homepage](https://www.elmundo.es/) supplies a different inline masthead, with a blue globe between EL and MUNDO; it was extracted and visually compared. The [cited Commons file](https://commons.wikimedia.org/wiki/File:Periodico_El_Mundo.svg) is categorised under Medellín. Treat the Spanish assignment as unsupported/conflicting with current publisher branding; do not assert the exact alternate publication without further primary evidence.

These results contradict the latest commits' broad assurance of visually verified, collision-guarded mastheads. Exact title matching is insufficient where different entities share a name. Replace or temporarily omit the affected artwork. Bind source selection to **entity identity, country and official domain**, then verify the actual selected image and its variant.

## F61 — new explanatory metadata contradicts bundled pixels (P2)

All 227 new explainers were read alongside the images. The following are direct, reproducible discrepancies; they do not require speculation about historical brand adoption:

| ID | Description says | Bundled image shows |
|---|---|---|
| `in-dainik-jagran` | Devanagari masthead | Latin `Jagran` below a sun |
| `kr-donga-ilbo` | Hangul | Hanja `東亞日報` |
| `kr-joongang-ilbo` | Hangul | Latin `The JoongAng` |
| `jp-japan-times` | Red dotted j | Monochrome wordmark |
| `nz-1news` | Red wordmark | Red circular 1 and black news |
| `it-il-sole-24-ore` | White 24 ORE block | Black lettering with grey shadow |
| `ph-rappler` | Wordmark | Orange R emblem without the name |
| `ua-ukrainska-pravda` | Full wordmark | УП monogram |
| `se-dagens-nyheter` | Full masthead | DN. monogram |
| `sk-hospodarske-noviny` | Full masthead | HN ONLINE.SK lockup |

The monogram cases may still depict the correct organisation; their error is the explanation of the selected variant. Correct `logoExplainer` against the exact bytes used, rather than a remembered or different logo.

Also record actual variants: Página/12 carries a commemorative strap; La Jornada carries a 40-year anniversary device; Nhân Dân uses a Russian-edition lockup; El Observador includes a follow-us callout. These are not automatically fabricated images, but the metadata omits what was selected. Lithuania's Delfi SVG uses CSS animation; its overlapped static rasterisation must **not** be reported as a proven browser defect without a browser check.

## F62 — artwork provenance is not sufficiently preserved or identity-checked (P1)

Of the 227 backfills, 85 cite a specific Commons filename in `licenceNote`; the other 142 generically claim publisher-site brand assets. The cited Commons pages were all requested and source metadata obtained for 79. Six remained unresolved: Dnevnik, Ilta-Sanomat, Al-Joumhouria, Nhân Dân, Notimex and Hufvudstadsbladet. A retrieval failure does not establish a nonexistent source.

The new installer reads temporary harvest files, writes image/explainer/licence text, and prints a shortened hash. The harvester writes its detailed report under `tmp/logo-harvest/harvest-report.json`; that report is not among these committed additions. A generic publisher homepage or educational-use statement does not preserve the exact downloaded asset, author, modification history or declared licence.

Several cited Commons files have explicit Creative Commons terms, while `licenceNote` records only a generic trademark/educational-reference sentence. Preserve the actual file-page licence, author and applicable attribution separately from trademark status. This is a metadata finding, not a legal determination that every use is unauthorised.

**Required change:** commit a provenance manifest with exact source page, exact asset URL, stable entity ID, publisher country/domain, source revision, original/bundled hashes, transformations, licence/author, variant, applicable period, and specific verification results. Neither complexity thresholds nor a human-sounding verification sentence should qualify an asset as authentic. The four earlier publisher/agency consistency checks did not test these identity claims.

## F63 — Japan tourism record is accurate rounding but not the latest annual total (P2)

Japan's 36.9 million for 2024 is a reasonable rounding of the definitive **36,870,148** count. However, JNTO's Japanese-language annual table already gives **42,683,301 for 2025** and identifies 1964–2025 figures as definitive. The 2019 comparison baseline is 31,882,049. The problem is freshness under the dataset's latest-annual contract, not fabrication of the rounded 2024 number.

Primary source: [JNTO annual table](https://www.jnto.go.jp/statistics/data/_files/20260819_1615-8.pdf), reached from the [Japanese statistics index](https://www.jnto.go.jp/statistics/data/visitors-statistics/). The PDF was downloaded, rendered and visually read. Store the tourism measure precisely: visitor arrivals are not interchangeable with unique tourists, overnight stays or domestic trips.

## Passport evidence: origin verified, official series still unresolved

The source manifest identifies 188 passport images as drawn cover renderings obtained from GICG. Each live source image was fetched and SHA-256 compared: **all 188 match the recorded manifest hashes** after retrying 17 timed-out requests. No changed source bytes were found. This does not independently validate GICG's depiction or the official passport series. It also does not prove the corresponding repository bytes match the manifest unless that separate check has been performed; this ledger specifically tests manifest-to-source consistency.

Do not collapse first-issued date, last-issued date and expiry/validity into a single current/historical label. [PRADO's Irish ordinary-passport record IRL-AO-06001](https://www.consilium.europa.eu/prado/en/IRL-AO-06001/index.html) gives first issue on **26 June 2026** and identifies a burgundy cover. Japan's [Ministry of Foreign Affairs](https://www.mofa.go.jp/mofaj/toko/passport/pagew_000001_01253.html) explains issuance of its 2025 passport from **24 March 2025** and continued validity of earlier passports until expiry. These establish the need for series-level metadata; they do not establish that every older cover is invalid or that the bundled Irish image depicts the new series.

F02's Japanese cover-symbol error and F14's missing version/period information remain open. No passport has been newly certified as a current official design solely because its source hash matches.

## F64 — 25 further wrong-entity logos in the newer media batches (P1)

Each item below is an actual bundled image, not a hypothetical name collision. The cited artwork metadata, readable image and/or publisher HTML identifies a different entity. These are **in addition to F60’s five**. All 25 remain in the current pinned application revision. Country and domain identity must be checked before a matching acronym or publication name is accepted.

| Record | What the bundled image actually represents | Evidence |
|---|---|---|
| `al-panorama` | German NDR/Das Erste Panorama television programme, not the Albanian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:Panorama-Logo.svg) |
| `ba-klix` | TELUS Digital advertiser logo, not Klix.ba. Exact bundled bytes match the advertiser asset on Klix.ba; its img alt identifies TELUS Digital. | [Source](https://www.klix.ba) |
| `bo-la-razon` | Spanish La Razón (larazon.es), not the Bolivian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:La_Raz%C3%B3n_logo.svg) |
| `bs-tribune` | Indian The Tribune (tribuneindia.com), not The Tribune of the Bahamas. | [Source](https://commons.wikimedia.org/wiki/File:The_Tribune_logo.jpg) |
| `cm-le-messager` | French Le Messager (lemessager.fr), not the Cameroonian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:Logo_Le_Messager.svg) |
| `cv-a-semana` | Colombian Semana 35th-anniversary artwork, not Cape Verde’s A Semana. | [Source](https://commons.wikimedia.org/wiki/File:Logo-semana.svg) |
| `fi-aamulehti` | Visible HELSINGIN SANOMAT masthead, not Aamulehti. | [Source](https://www.aamulehti.fi) |
| `gm-daily-observer-gambia` | Bangladeshi Daily Observer (observerbd.com), not the Gambian publication. | [Source](https://commons.wikimedia.org/wiki/File:The_Daily_Observer.jpg) |
| `hn-diario-tiempo` | Argentine Diario El Tiempo (diarioeltiempo.com.ar), not Honduras’s Diario Tiempo. | [Source](https://commons.wikimedia.org/wiki/File:Logo_Diario_El_Tiempo.png) |
| `hn-la-tribuna` | Historical Paraguayan La Tribuna photograph; cited file use identifies Paraguay and visible nameplate names director Carlos Ruiz Apezteguia. Not a current Honduran masthead. | [Source](https://commons.wikimedia.org/wiki/File:Logo_La_Tribuna.jpg) |
| `jo-al-ghad` | AlGhad TV logo (alghad.tv), not the Jordanian newspaper Al Ghad. | [Source](https://commons.wikimedia.org/wiki/File:AlGhad_TV.svg) |
| `mu-l-express` | French L’Express magazine artwork; cited source issue numbers and file use concern the French publication, not Mauritius’s daily. | [Source](https://commons.wikimedia.org/wiki/File:Logo_L%27Express.svg) |
| `mv-avas` | Association of Voluntary Actions for Society (AVAS), not the Maldivian news website. | [Source](https://commons.wikimedia.org/wiki/File:Logo_of_AVAS.jpg) |
| `na-new-era` | New Era headwear brand mark, not Namibia’s New Era newspaper. Official manufacturer and newspaper sites corroborate different identities. | [Source](https://commons.wikimedia.org/wiki/File:New-Era-Logo.jpg) |
| `ng-the-punch` | Nigeria Police emblem, not The Punch masthead. The publisher page identifies the police image as an article thumbnail. | [Source](https://punchng.com) |
| `ng-thisday` | Federal Roads Maintenance Agency (FERMA) logo, not THISDAY. Exact bytes match the publisher’s FERMA article thumbnail. | [Source](https://www.thisdaylive.com) |
| `nz-the-post` | The Post film title artwork; Japanese file description and movie-logo category identify the film, not New Zealand’s newspaper. | [Source](https://commons.wikimedia.org/wiki/File:The_post_logo.png) |
| `pg-loop-png` | Loops.video social-video software logo, not Loop PNG news. | [Source](https://commons.wikimedia.org/wiki/File:Loops_logo.png) |
| `pt-expresso` | EXPRESSO German industrial equipment company logo, not Portugal’s Expresso weekly; primary expresso.de brand corroborates it. | [Source](https://commons.wikimedia.org/wiki/File:EXPRESSO_Logo.svg) |
| `py-abc-color` | American Broadcasting Company’s historical colour-TV logo, not Paraguay’s ABC Color. | [Source](https://commons.wikimedia.org/wiki/File:ABC_color_logo.jpg) |
| `by-belta` | Japanese BonBelta retail brand, not the Belarusian news agency BelTA. | [Source](https://commons.wikimedia.org/wiki/File:BonBelta.svg) |
| `bw-bopa` | Danish resistance group BOPA, not Botswana Press Agency. | [Source](https://commons.wikimedia.org/wiki/File:BOPA_logo.svg) |
| `ci-aip` | American Institute of Physics, not Agence Ivoirienne de Presse. | [Source](https://commons.wikimedia.org/wiki/File:AIP_Logo.png) |
| `ke-kna` | German Katholische Nachrichten-Agentur, spelled out in the asset, not Kenya News Agency. | [Source](https://commons.wikimedia.org/wiki/File:KNA-Logo.svg) |
| `ng-nan` | All Progressives Congress political-party logo, not News Agency of Nigeria. NAN homepage uses an APC article thumbnail as well as a separate NAN logo. | [Source](https://nannews.ng) |

The Klix image is byte-for-byte identical to `https://static.klix.ba/logos/logo_1759913845.png`, whose publisher HTML identifies TELUS Digital. THISDAY’s bundled image exactly matches its FERMA article thumbnail. These cases demonstrate that downloading from the correct publisher domain does not establish that the selected asset is that publisher’s logo. The new prose’s claim of official identity is false for these records; 155 of the 428 new references additionally say “visually verified,” which is not reliable evidence of a successful identity check.

**Required change:** quarantine these assets from the relevant Learn cards until the intended entity is verified. Reject article images, adverts, unrelated footer brands and acronym/name matches without an entity match. Store exact source asset URLs and observed roles; retain an explicit no-image state when identity cannot be established.

## F65 — asset role, edition and period are still misrepresented (P1/P2)

The following ten records have a wrong or unspecified artwork role. A related corporate mark is not automatically the named publication’s masthead.

| Record | Observed artwork / limitation |
|---|---|
| `ar-perfil` | PERIODISMO PURO slogan/programme artwork; the PERFIL masthead is absent. Record exact intended variant before claiming a newspaper masthead. |
| `at-salzburger-nachrichten` | Publisher-branded Die gefragte Frau feature/podcast artwork, not the general newspaper masthead. |
| `co-el-tiempo` | Bag-shaped utility/shop icon, not a visible EL TIEMPO masthead; precise source role unresolved. |
| `dk-kristeligt-dagblad` | LÆSEKREDS reading-club mark, not the newspaper masthead. |
| `gq-ahora-eg` | Malabo 2019 Annual Meetings graphic dated 11–14 June, not AhoraEG masthead. |
| `id-kompas` | Kompas Gramedia corporate-group logo, not the Kompas newspaper masthead. |
| `nl-algemeen-dagblad` | DPG Media corporate-group logo, not Algemeen Dagblad masthead. |
| `nl-trouw` | DPG Media corporate-group logo, not Trouw masthead. |
| `sg-the-new-paper` | SPH Media corporate-group logo, not The New Paper masthead. |
| `sl-slena` | Sierra Leone Ministry of Information and Civic Education mark, not a SLENA-specific agency mark. |

Other assets need explicit variant metadata: anniversary artwork for ABI, Fana, Kyunghyang, Zakon, Virakesari, The Analyst, Hoy (Paraguay), and Slovenske novice; portal/network variants for Guangming, Al-Ahram, Yedioth Ahronoth/ynet and Ma’an. A commemorative numeral is not necessarily fabricated, but cannot silently stand for an undated standard masthead. El Universo’s SVG clips its name in the static renderer; a browser defect is **not** asserted without a browser comparison.

The 428-reference ledger attempts all **77 exact Commons references (75 distinct file pages)** and retrieves **74/75 pages**. The cited `APS Sénégal logo.png` page is unresolved (HTTP 404); this alone does not prove the depicted APS logo false. The other **351 references lack an exact Commons file citation** and commonly provide only a publisher homepage/generic source assertion. Licence terms, authors and transformation history remain distinct from trademark ownership and educational purpose.

## F66 — new newspaper-selection code repeats unsupported defaults (P1)

The `d130b10` selection batches add **250 records** and remove 42. Among the additions, **192** have `frequency: "Daily newspaper"`; **83** of those simultaneously have `format: "Digital news portal"`. **176** receive the same generic advertising/subscription/print-sales revenue formula. These counts are not proof that every individual value is false; the problem is that the helper supplies factual defaults without field-level evidence.

Concrete counterexamples are `am-azatutyun`, `kg-azattyk`, and `kz-azattyq`, all labelled daily newspapers. RFE/RL identifies them as radio/multimedia services on its [Armenian](https://about.rferl.org/service/armenian-service/), [Kyrgyz](https://about.rferl.org/service/kyrgyz-service/), and [Kazakh](https://about.rferl.org/service/kazakh-service/) pages. The Armenian record also says founded **1950**, while the service’s own history gives **1953**. The Kyrgyz and Kazakh 1953 values agree with their service histories; do not replace correct values merely because a neighbouring field is wrong.

The helper also manufactures a narrative that official sites and Commons were searched whenever no image is supplied. This repeats F58: absence of an image cannot establish that a search occurred. Store `unverified`/`not sourced`, not an invented work history. Likewise, “leading” or “highest traffic” claims need a defined metric, population, comparison set, date and source; a homepage URL does not substantiate a ranking.

**Required change:** make media type, publication frequency, revenue sources and launch date separately sourced, nullable fields. Permit a multimedia news outlet where that is the intended scope, and label it accurately in the UI. Do not require five entries at the expense of factual confidence. Preserve print founding, digital launch, brand rename and relaunch dates separately.

## V-Dem complete dataset comparison and F67 scope metadata (P2)

All **173 bundled entries** were compared with the publisher-recommended `vdemdata` v16 dataset, pinned to source commit `f4dd26922e658442524dfd954bf14f7ebe622d5d`; the downloaded RData also matches Git blob `5a472621427337cebf032a9c4e397e0bedd57aea`. **173/173 scores** agree within two-decimal rounding and **173/173 regime labels** agree with `v2x_regime`. Every rank is inside its tied-rank interval across all 179 source units, and every rank change is compatible with 2024 → 2025 ranks within the same dataset version.

Table A2 in the 2026 PDF differs from the app in seven rounded scores and 15 ordinal ranks. The underlying dataset supports the app values, so these differences are **not counted as seven/15 app errors**. The ledger preserves both comparisons. A tied-rank interval establishes consistency, not the exact unpublished tie-breaking algorithm used by the app.

F67 concerns presentation: `year: 2026` is the **release year**, whereas these are **2025 observations**. The `PS` entry maps specifically to **Palestine/West Bank**, while V-Dem separately codes Gaza. A country-wide Palestine label without this scope note is imprecise. Store `releaseYear`, `observationYear`, `datasetVersion`, `sourceUnit` and rank methodology separately. Do not compare absolute scores from different V-Dem versions.

Sources: [publisher dataset page](https://www.v-dem.net/data/the-v-dem-dataset/), [v16 codebook §5.1.1](https://www.v-dem.net/documents/70/codebook_v16.pdf), [pinned dataset](https://github.com/vdeminstitute/vdemdata/blob/f4dd26922e658442524dfd954bf14f7ebe622d5d/data/vdem.RData), [2026 report Table A2](https://www.v-dem.net/documents/75/V-Dem_Institute_Democracy_Report_2026_lowres.pdf). Dataset attribution: Coppedge et al. (2026), V-Dem Country-Year Dataset v16, DOI `10.23696/vdemds26`; source data licence CC BY-SA 4.0.

## F05 expanded and F68 — population dates and incorrectly labelled census methods (P1/P2)

At the `db3ba05` snapshot, the national population request explicitly selects 2024. The World Bank `SP.POP.TOTL` response contains both 2024 and 2025 observations for **194 of the 195 bundled countries**; Vatican City is absent and its fallback remains unverified. Thus every country covered by this API has a newer 2025 observation available. The live Bosnia and Herzegovina panel's 3.16 million is consistent with the 2024 observation of 3,164,253, whereas the source's 2025 observation is 3,140,095. This is a vintage/presentation defect, not proof the 2024 observation was fabricated. [World Bank series](https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2021:2025&per_page=20000).

All **5,281 subdivision rows** and **201 national reference denominators** have now been inventoried in the population ledger. Primary-source comparisons completed so far are:

| Set | Rows compared | Numerical result | Method/year result |
|---|---:|---|---|
| Brazil: all 26 states and Federal District | 27 | All exactly match IBGE 2022 | All 27 incorrectly say `estimate`; these are census results |
| Mainland China: all 31 provincial units | 31 | All exactly match NBS 2020 table | All 31 incorrectly say `estimate`; these are preliminary census results |
| Mexico: all 32 federal entities plus the legacy Mexico City alias | 33 | All exactly match INEGI 2020 | Census/year labels agree; the alias is not a 33rd entity |
| US: 49 states, DC, Puerto Rico, Guam, US Virgin Islands, American Samoa | 54 | All exactly match Census Bureau 2020 | Census/year labels agree |

Sources: [IBGE values](https://servicodados.ibge.gov.br/api/v3/agregados/4714/periodos/2022/variaveis/93?localidades=N3[all]) and [survey metadata](https://servicodados.ibge.gov.br/api/v3/agregados/4714/metadados); [NBS communiqué, table 3-1](https://www.stats.gov.cn/english/PressRelease/202105/t20210510_1817188.html); [INEGI report, PDF page 5](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2021/EstSociodemo/ResultCenso2020_Nal.pdf); [US resident-population table](https://www2.census.gov/programs-surveys/decennial/2020/data/apportionment/apportionment-2020-table02.pdf), with separate official island-area releases linked per row.

The China table excludes Hong Kong, Macao and Taiwan and lists servicemen separately; its numerical agreement does not resolve any territorial-status question. Maryland has a 2021 estimate in the app, so it was not wrongly compared as a 2020-census claim. Northern Mariana Islands and US Minor Outlying Islands also remain unverified here. The other **5,136 subdivision rows remain unverified against primary demographic sources in this ledger**. Historical census accuracy does not establish freshness relative to subsequent official estimates.

F68 supplies concrete, whole-set counterexamples to F06's generator defect: **58 accurate census counts receive false method labels**. Preserve `census`, `estimate`, `projection`, `register` and `unknown` separately, with full reference dates and source identifiers. Do not infer `estimate` merely because a Wikidata method qualifier is absent. Every national reference denominator also lacks an observation date and method; numerical matches to World Bank observations alone cannot repair that missing metadata.

## F69 — latest image caption count mismatch (P2)

At `db3ba05`, `ee-eesti-paevaleht` describes three red dots. The inspected artwork has **one dark dot and two red dots**. Correct the caption to the actual selected variant and record its date. This is a direct description/image mismatch; it does not establish that the publisher identity itself is wrong. The per-record observation is preserved in the DB3 image ledger.

## Evidence files and remaining work

- [Population claim ledger](audit/POPULATION_CLAIM_VERIFICATION_2026-09-20.json): national API coverage/freshness for 195 countries, all 201 undated reference denominators, 145 primary census comparisons and an explicit list of the other 5,136 subdivision records as unverified.
- [Latest media ledger through db3](audit/MEDIA_DB3_CLAIM_VERIFICATION_2026-09-20.json): 74 image assets, 75 record references, individual caption/source outcomes and agency cleanup.

- [V-Dem claim ledger](audit/VDEM_CLAIM_VERIFICATION_2026-09-20.json): all 173 entries, report/dataset comparisons, ranks and scope.
- [World Bank source snapshot](audit/WORLD_BANK_SOURCE_SNAPSHOT_2026-09-20.json): dated source observations behind the GDP comparisons.
- [Additional media ledger through d130](audit/MEDIA_D130_CLAIM_VERIFICATION_2026-09-20.json): 409 images, 428 record references and individual verdicts.
- [GDP claim ledger](audit/GDP_CLAIM_VERIFICATION_2026-09-20.json): all 766 values, source URLs and outcomes.
- [Freedom House claim ledger](audit/FREEDOM_HOUSE_CLAIM_VERIFICATION_2026-09-20.json): all 193 scores/statuses, source methods and separate rank status.
- [Media image ledger](audit/MEDIA_IMAGE_VERIFICATION_2026-09-20.json): all 227 new assets, hashes, exact review scope, source-page observations and individual findings.
- [Passport origin ledger](audit/PASSPORT_ORIGIN_VERIFICATION_2026-09-20.json): all 188 source-hash comparisons and explicit limits.
- [Revision delta](audit/REVISION_43CFD13_DELTA_2026-09-20.json): all 231 changed paths and pinned blob identifiers.

Still **not universally verified**: all prose and metadata in the seven registries; official identity/currentness for the remaining images; each flag's legal adoption and symbolic interpretation; all arms blazons; passport variants; party leadership/seats/ideology and logos; airline/broadcaster ownership and brands; all population estimates and methods; EIU values and V-Dem presentation/scope metadata; complete tourism/media claims; every historical territorial assignment and polygon boundary. The earlier structural map checks and visual samples cannot be relabelled as claim-level verification. Prior findings F01–F59 remain applicable except where a specific closure was recorded.

For completion, every factual field and distinct prose assertion needs its own verdict with evidence and an applicable date; every image needs both file provenance and identity/variant verification. An unresolved claim is an audit outcome, but it must not be counted as a verified claim. **This report therefore leaves the universal-verification request open.**
