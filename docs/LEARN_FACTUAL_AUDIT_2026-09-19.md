# Learn factual audit — 19 September 2026 continuation

Status: evidence compilation in progress. This file supplements, and does not erase, `LEARN_FACTUAL_AUDIT_2026-09-13.md`. Findings F01–F39 retain their original definitions. No application data or hard rules have been edited by this audit.

## Revision and scope

Original baseline: `8b2167aef864e61aaa2051ed714ce391f2ff1023`. Current reviewed revision: `158801ce713fd0f8cd5fe08c36064d11fb5ca337`. The published Learn footer was observed showing `158801c` on 19 September 2026. Comparison covers 207 commits and the entire recursive file trees, not GitHub's truncated comparison list: 1,915 changed files, comprising 1,882 additions, 32 modifications and one deletion. The deleted file is `public/party-logos/pk/sic.png`.

Inventory is not factual certification. There are 2,044 national-symbol records (207 new Olympic committee records; all 1,837 previous records unchanged); 842 political-party records in 100 groups; 288 airlines in 196 groups; 204 broadcasters in 195 groups; 790 newspapers in 195 groups; 188 news agencies in 139 groups; and 195 tourism entries. Empty country arrays are included in group counts. New economic fields contain 193 USD GDP observations and 190 local-currency observations without their observation dates.

## Reconciliation of earlier findings

F34: Sierra Leone currency changed from SLL to SLE in the bundle. Closed for the observed data field; retain a regression check in the generator.

All other pre-existing country-fact values are unchanged, verified field by field. National flag, passport, coat-of-arms and historical-symbol records from the old registry are unchanged, verified record by record. Subdivision/historical geometry and era metadata did not change in the full tree comparison. The earlier political-party findings about Germany remain: no SSW record; SPD leader only Lars Klingbeil. Party data changes affect LK, TJ, TM, TR, PK and PS. Historical dates, population provenance, official-language distinctions and symbol-description defects therefore still require remediation; a new deployment alone does not close them.

## Confirmed continuation findings

### F40 — Ethiopia uses a superseded administrative model (P1)

The unchanged subdivision metadata includes Southern Nations, Nationalities and Peoples while lacking the current regional-state configuration. The Ethiopian Statistical Service and Ministry of Planning's December 2023 **Ethiopian Statistical Development Program EFY 2016–2018 (2023/24–2025/26)** explicitly describes **12 regional states and two autonomous city administrations**, paragraph 7, printed p.3 (PDF page 6). The downloaded PDF page was rendered and visually read. This is not merely a disagreement over English spellings. Replace the taxonomy and geometry together, with effective dates and a crosswalk for split regions.

Source: https://ess.gov.et/wp-content/uploads/2024/08/ESDP-3-1-2_compressed-1.pdf

### F41 — Additional constitutional-language errors (P1)

`src/data/countryFacts.ts` still omits **Nambya** from Zimbabwe's 16 constitutionally officially recognised languages (section 6); calls Austria's language **Austro-Bavarian German** instead of the constitutional **German** (article 8); and presents Namibia's nine-language list under a contract describing official languages, although article 3 designates English, while allowing other language use in specified circumstances. These are designation/scope errors, not statements that the other languages are absent from those countries. A single flat list cannot distinguish national, official, regional, recognised and widely spoken languages.

Constitution texts consulted: https://www.constituteproject.org/constitution/Zimbabwe_2013 ; https://www.constituteproject.org/constitution/Austria_2013 ; https://www.constituteproject.org/constitution/Namibia_2014 . These are editions of primary legal texts hosted by a scholarly project; the Austrian 2013 edition is not described here as a complete 2026 consolidation.

### F42 — Cuba's withdrawn convertible peso remains a current currency (P1)

The unchanged current bundle lists CUC and CUP. Decree-Law 37/2021, article 2, ended acceptance of CUC in the specified commercial transactions on 1 July 2021; exchange arrangements were a separate transitional question. Do not display it as an undated current currency. The gazette instrument later became repealed, so this evidence establishes the historical withdrawal event, not that this particular instrument remains in force today.

Primary gazette reproduction: Gaceta Oficial 51 Extraordinaria, 21 June 2021, printed p.598 / PDF p.3: https://www.cibercuba.com/s/gacetaoficial/pdf/goc-2021-ex51.pdf . Official index: https://www.gacetaoficial.gob.cu/es/tasa-de-cambio .

### F43 — “Today” misstates UN membership (P1)

`src/lib/historicalEras.ts` describes 195 UN member states. The application set combines **193 members** and **two non-member observer states** (Holy See and State of Palestine). UN membership is also not a universal country-recognition decision. Correct the summary and internal names to distinguish these categories.

UN references: https://research.un.org/en/unmembers/currentmembers and https://research.un.org/en/unmembers/observers . Specific indexed UN excerpts were retrieved; some direct UN page requests were access-limited.

### F44 — Further historical-era anachronisms (P1)

In `src/lib/historicalEras.ts`, the 600 CE summary names Tang China, although its own polity override correctly says Sui in 600 and Tang from 618. The 1500 summary says the Mughal era begins, while the Met dates the dynasty from 1526. The 1920 summary treats the Ottoman Empire as already gone: distinguish defeat/partition after 1918 from the abolition of the sultanate on 1 November 1922. The 2000 BCE override for New Kingdom Egypt is about a polity beginning around 1550 BCE; its Shang material is similarly too early for the c.1600 BCE chronology. Some raw-map entities do not reach the UI because of property-name problems already documented; repository misinformation and live exposure are separate claims.

Sources: https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-five/chapter-four/introduction ; https://kurtulussavasimuzesi.tbmm.gov.tr/meclisacilis ; https://www.metmuseum.org/essays/egypt-in-the-new-kingdom-ca-1550-1070-b-c ; https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china . Tang finding additionally has an explicit internal contradiction.

### F45 — Hejaz flag description contradicts its bundled design (P1)

The 1920 Hejaz override describes a green flag with a gold star and crescent; `public/historical-flags/hejaz-1920.svg` contains black, white and green horizontal bands and a red hoist triangle, with no crescent or star. A similar description exists in the 1938 override; its applicability must be checked against that era's actual geometry. Correct the prose to the authenticated period variant, not merely to any image that happens to load.

### F46 — Freedom House values do not match their stated edition (P1)

`scripts/data/democracyData.mjs` and generated country facts label these scores 2024: United States **84**, Norway **99**, India **63**, Russia **12**. Freedom House's own 2024 country reports give **83, 98, 66, 13** respectively. The country reports' statuses in these four examples match the bundle; this finding establishes numerical errors, not that all colour classifications are wrong. The UI displays ranks rather than scores; ranks derived from this wrong score set also need rebuilding, not cosmetic year changes.

Sources: https://freedomhouse.org/country/united-states/freedom-world/2024 ; https://freedomhouse.org/country/norway/freedom-world/2024 ; https://freedomhouse.org/country/india/freedom-world/2024 ; https://freedomhouse.org/country/russia/freedom-world/2024 .

### F47 — GDP provenance and observation years are discarded (P1)

`scripts/build-country-facts.mjs` retrieves four indicators independently over 2021–2024, keeps each latest non-null value, then drops all four date fields when emitting the bundle. Five hard-coded fallback country estimates (CU, ER, KP, SS, YE) are called verified without a source, date or method. `EntitySummary.tsx` selects the first current currency for local-currency formatting, which cannot establish the historical unit of a World Bank observation. Store year, unit, source, series code and estimate method with each observation; do not imply a common date or convert units by changing their label.

### F48 — Nauru newspaper chronology and ownership are wrong (P1)

`nr-central-star-news` says founded 2015; the University of Canterbury's holdings identify Central Star News, 1991–1992, with later title Nauru Chronicle. `nr-nauru-chronicle` says founded 2005, while the library identifies the title from 1993 and a 1995 issue. `nr-mwinen-ko` assigns ownership to a Nauru Community Media Association / civic non-profit; Nauru's official bulletin identifies Mwinen Ko as Nauru Media's print publication. Current publication status and any relaunch must be sourced separately; historical holdings alone do not prove current operation or its absence. All three entries were observed in the current Learn UI.

Sources: https://libcat.canterbury.ac.nz/Record/2595228 ; https://canterbury.libguides.com/pacific/newspapers ; https://www.nauru.gov.nr/media/58467/nauru_20bulletin_20_02_7feb2017_20_28150_29.pdf . Catalogue/guide evidence was retrieved as specific indexed excerpts; direct requests were limited. The government PDF was readable.

### F49 — A generator manufactures factual defaults and citation titles (P1)

`scripts/build-and-add-block8.mjs` substitutes founding year **2000**, headquarters **National Capital**, and language **English** when parsing fails. It mechanically labels readership evidence `${name} Audience Review 2024` without retrieving such a publication, and defaults every entry to daily newspaper / broadsheet / subscriptions / print sales / advertising. A citation-looking string generated from a name is not evidence. This is confirmed fabrication-by-code in the generator; whether each generated value remains in current records must be recorded separately. Replace defaults with explicit missing data and fail closed on parser failures.

### F50 — Australian broadcaster funding-cycle description is obsolete (P2)

`au-abc` describes a triennial funding envelope for FY2023–24. The Australian government's review says five-year terms commenced on **1 July 2023**. Correct the term and distinguish appropriations from actual revenue. Other quotas and audience figures require independent checks; do not infer their correctness from a working annual-report link.

Primary source: https://www.infrastructure.gov.au/have-your-say/review-options-support-national-broadcasters-independence .

## Open evidence checks preserved from earlier work

Nepal's coat of arms needs a dated comparison with the constitutional 2020 Schedule 3 amendment, especially the map outline; the English Refworld constitution omits that amendment whereas its Nepali edition includes it. Do not close this from an English-only comparison. Additional old administrative models in CD, CI, GH, KE, BD, TZ, NA and others require dated primary-law/statistics crosschecks; apparent count differences are not automatically errors. Local-language and official/working-language leads for RW, MD, ML, BF, NE, IN, CD and CG remain leads unless separately evidenced below.

