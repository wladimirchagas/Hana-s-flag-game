# Country Personas — how Experian builds Mosaic, and a playbook for clustering our 195 countries

**Status:** research and design only. No classification has been built or shipped.
**Date:** 2026-09-24 · **Pilot code:** [`docs/country-personas/`](country-personas/) (Appendix A)
**Working name:** "Country Personas". *Mosaic* is Experian's registered trademark, so it must
not appear in any user-facing text. In this document "Mosaic" always means Experian's product.

---

## Contents

1. [Summary](#1-summary)
2. [Part A — How Experian builds Mosaic](#part-a--how-experian-builds-mosaic)
3. [Part B — From households to countries: what changes](#part-b--from-households-to-countries-what-changes)
4. [Part C — What this repo already holds (measured)](#part-c--what-this-repo-already-holds-measured-2026-09-24)
5. [Part D — The playbook, step by step](#part-d--the-playbook-step-by-step)
6. [Part E — Recommended v1 specification](#part-e--recommended-v1-specification)
7. [Part F — Risks, ethics and neutrality](#part-f--risks-ethics-and-neutrality)
8. [Appendix A — Pilot diagnostics](#appendix-a--pilot-diagnostics-method-and-full-results) · [B — Glossary](#appendix-b--glossary) · [C — Sources](#appendix-c--sources)

---

## 1. Summary

**What Mosaic is.** Mosaic sorts every household (and postcode) in a country into a two-level
hierarchy of *types* and *groups*. Each type has a name, a short descriptive line, a "pen
portrait", and a profile of hundreds of indexed variables. The current UK edition (Mosaic 8,
2025) has **18 groups and 68 types**, built from **more than 388 variables** about 52 million
people and 29 million households. Mosaic USA has 19 groups and 70 types. Mosaic Global maps
households in 26–29 countries (the count varies by edition) onto **10 groups that recur in every
country**.

**The recipe, as Experian and its designer Richard Webber have documented it.**

1. Start from what the classification is for and which social trends it must capture.
2. **Audit data.** Keep only sources that are near-universal (Experian's rule was coverage
   of **85% or more**), consistent, and sustainable.
3. **Screen variables** for how well they discriminate, how robust they are, and how much
   they duplicate other variables.
4. **Standardise and weight by domain.** Each variable is a z-score times a weight *k*.
   Weights are "balanced on the basis of the number of variables available in different
   domains and the importance of each domain" (Farr & Webber, 2001).
5. **Cluster bottom-up.** Run iterative relocation (the k-means family) to get many fine
   types. Inspect them, split or merge, re-run until stable, then aggregate types into groups.
6. **Profile with "trailer" data** that was not used to build the clusters (market-research
   surveys). Summarise it in a **Grand Index**: group mean ÷ national mean × 100. The six
   highest-ranking characteristics become each type's "key features".
7. **Name and describe.** Give each type a letter-and-number code, a memorable name, a plain
   descriptive line and a pen portrait. The public-sector edition uses deliberately neutral,
   descriptive names.
8. **Maintain.** Re-score as data refreshes (twice a year for Mosaic Public Sector). Rebuild
   from scratch every few years (2004, 2009, 2014, 2025).

**What transfers to countries:** almost all of the recipe, notably the domain weighting,
bottom-up types and groups, trailer-data profiling, the Grand Index, and neutral naming.

**What does not transfer:**

- **Scale.** We have 195 units, not 29 million. Every choice becomes visible, and stability
  must be proven.
- **Missing data is systematic, not random.** It concentrates in microstates.
- **Our strongest variables are near-duplicates.** Three democracy indices correlate at
  ρ = 0.94–0.96.
- **We have no demographic or urban/rural data.** Those are the two axes Mosaic is built on.

**Three findings from our own data** (pilot in Appendix A):

1. **The world is a continuum, not natural clusters.** Two axes, "development and
   governance" (50% of variance) and "scale and global reach" (22%), explain 72% of variance.
   Average silhouettes are 0.30–0.38, which is the "weak structure" band. Personas will be
   useful partitions of a gradient. They must carry a per-country confidence score.
2. **Naive imputation invents a "microstate persona".** One pilot cluster held 18 countries,
   every one of them under ~1 million people. On average 41% of its members' inputs were
   imputed, and it put Luxembourg and Monaco beside Nauru and the Marshall Islands. The
   cause was missing data, not shared character.
3. **Weighting is a substantive decision, not a detail.** Balancing domains changed the
   8-cluster partition to an adjusted Rand index of 0.59 against the unweighted one.

**Recommended v1** (details in Part E):

- **Structure:** 6–8 groups and about 18–24 types, with at least 4 countries per type.
- **Inputs:** built on 4–5 near-universal domain scores today, plus a Phase-0 fetch of
  World Bank demography, urbanisation, connectivity and economic-structure indicators.
- **Survey data:** World Values Survey answers (88 countries) are used only to describe
  personas, never to build them. That is exactly the lesson Experian drew from lifestyle
  surveys.
- **Method:** Ward-seeded k-means with thousands of restarts, bootstrap and imputation
  consensus, a Grand Index profile, neutral names reviewed against a checklist.
- **Delivery:** a frozen model spec, a deterministic Node generator, and a check script
  wired into CI, like every other dataset here.

---

## Part A — How Experian builds Mosaic

### A1. What Mosaic is, edition by edition

Mosaic is a *geodemographic* classification. Its founding premise is that "people who live
in the same neighborhood are more likely to have similar characteristics than are two people
chosen at random", and that neighbourhoods can be categorised by the population they contain
([Wikipedia: Geodemographic segmentation](https://en.wikipedia.org/wiki/Geodemographic_segmentation)).
Modern editions classify **households**, and the same codes are then applied to people and
postcodes. It is used for targeting, store location, public-service planning, and even
longevity pricing.

| Edition | Year | Structure | Inputs (as stated by Experian) | Source |
|---|---|---|---|---|
| MOSAIC (original, postcode level) | 1985–86 | area classification at postcode level, partly from census data | census **plus** non-census items: company directors, electoral-roll change rates | Farr & Webber 2001 |
| Mosaic UK (in 2001) | ~2001 | 52 types | — | Farr & Webber 2001 |
| Mosaic UK | 2004 | 11 groups / 61 types | — | Wikipedia; Experian Aperture data guide ("11 Groups and 61 Types" for Public Sector Mosaic) |
| Mosaic UK | 2009 | 15 groups / 67 types | — | Wikipedia |
| Mosaic Public Sector | 2010 | **146 person types → 69 household types → 15 groups** | **440 data elements**; 62% from Experian's Consumer Dynamics database, 38% from census current-year estimates | Experian 2010 |
| Mosaic UK | 2014 | 15 groups / 66 types | "over 850 million pieces of information across 450 different data points" | Experian 2014 brochure and press release |
| Mosaic UK 7 (update) | 2021 | 15 groups / 66 types; 49M individuals, 26M households | "more than 450 data variables" | Experian Aperture data guide |
| **Mosaic UK 8** | **2025** | **18 groups / 68 types**; 52M individuals, 29M households | "**more than 388 data variables** from … proprietary, public, and trusted third-party sources"; "AI learning techniques" | Experian 2025 press release; data guide |
| Mosaic USA | 2014 | 19 groups / 71 segments | "more than 300 data factors"; ConsumerView database of 116M households (126M by 2016) | Experian 2014 brochure; 2016 product guide |
| Mosaic USA (current) | 2026 | 19 groups / 70 types | "400+ Experian data attributes"; "nearly 1,000 descriptors per Group and Type" | experian.com |
| Mosaic Global | 2000s–2014 | **10 groups**, consistent across countries | built from each country's national Mosaic; 26–29 countries depending on edition | Experian 2014; Geo Strategies |

Every edition has kept roughly **4–5 types per group**: 61/11, 67/15, 66/15 and 68/18 in the
UK, 71/19 in the USA. The group sizes in Mosaic USA 2014 ranged from 2.46%
to 9.85% of households, and types from 0.28% to 4.65%. The design keeps every cell usable and
none dominant.

### A2. Lineage — where the method comes from

Farr & Webber (2001) is the primary historical account and was written from inside Experian:

- **1970s — public-sector origins.** "Much of the early methodological work was developed
  during the Inner Area Study for Liverpool funded by the Department of the Environment." The
  Office of Population Censuses and Surveys (OPCS) then funded national classifications: first
  of local-authority districts (Webber & Craig, 1978), then of constituencies and wards, then
  of census enumeration districts.
- **1978–79 — the commercial "escape".** The British Market Research Bureau appended the ward
  classification to its Target Group Index survey. "In many instances neighbourhood was as
  predictive a discriminator as social class."
- **1979 — ACORN at CACI.** Webber moved to CACI. Matching postcodes to enumeration districts
  let a classification be attached to any address, which created the industry.
- **1985 — MOSAIC at CCN** ("as Experian then was"). It added non-census items, so that
  "different postcodes within the same census enumeration district" could get different codes.
  Codes could also change year to year as the electoral roll updated.
- **2001 — person-level segmentation.** Financial Strategy Segments (FIZZ) were the first
  person-level segmentation. Their build is documented in detail in A3 and is the best public
  description of Experian's clustering engine.
- **2014 onwards.** Household-level builds (74% of inputs at household level), then Mosaic 8
  (2025) with "a complete rebuild of segmentation groups incorporating more household-level
  data".

### A3. The build pipeline, stage by stage, with the evidence

Experian describes its approach as four stages: "A detailed analysis of the latest societal
trends … Acquisition and development of the most appropriate data sources … A sophisticated
proprietary approach to cluster analysis … Analysis of market research and public sector data
sources to assist in the validation and interpretation" (Mosaic Public Sector, 2010). Below,
those stages are unpacked into ten steps using every public source found.

#### Stage 1 — Objectives and societal trends

Each rebuild starts from the social changes the new edition must be able to see. For 2014
these were:

- the "boomerang generation" of adult children at home;
- private renting;
- mid-life singles;
- a new baby boom driven partly by professionals starting families in their thirties;
- changing retirement lifestyles.

For 2025 they were rural diversity, new-build estates and student housing. The previous edition
had put "two-thirds of rural population" into "just two Mosaic groups and seven segment types";
Mosaic 8 uses "four groups and 12 segment types". **Lesson:** decide up front which distinctions
the classification must be able to express. Variable selection follows from that list.

#### Stage 2 — Data audit and acquisition (the 85% rule)

Farr & Webber describe the audit criteria explicitly. A source qualifies when:

- "the data are available for 85 per cent or more of the people to which it applies (is
  universal)";
- "data protection regulations do not prohibit the use of the data (they are freely usable)";
- "they are not subject to control by private interests (they are in the public domain)".

Mosaic Public Sector's 440 elements were chosen "on the basis of their volume, quality,
consistency and sustainability". They "must also monitor change over time". Mosaic 8 added
"Consumer Dynamics" mobility and spending data.

**Lesson:** coverage is a gate, not a nice-to-have. And the classification must be buildable
again next time, so the sources must be sustainable.

#### Stage 3 — Variable screening

"All of the variables input to the classification go through a selection process during which
they are tested for **discrimination, robustness and their correlation to other variables**"
(Experian, 2010). The open-method builders make the correlation screen explicit. The Output Area
Classification (OAC) bands |r| into weak (0–0.4), moderate (0.41–0.65), strong (0.66–0.8) and
very strong (0.81–1), and avoids strong and very strong pairs. That took 188 candidate variables
down to 60 (Wyszomierski et al., 2023).

#### Stage 4 — Standardise and weight by domain

This is the most specific public statement of Mosaic's engine (Farr & Webber, 2001, on FIZZ):

> "Equal weights for each variable have not been used but the weights have been balanced on
> the basis of the number of variables available in different 'domains' and the importance of
> each domain. The standard equation for this is … x′ᵢ = k(xᵢ − x̄)/sₓ … where k is the
> weighting factor."

So each variable is **z-scored, then multiplied by a domain weight**. The weight corrects for
domains that happen to have many variables (which would otherwise dominate Euclidean distance)
and encodes judged importance. Mosaic Public Sector adds that weights reflect "how well they
discriminate at differing levels of geography". Experian calls this a "bottom-up" approach
that "maximise[s] the effectiveness of each input variable depending on its relative
importance to the classification, and its ability to discriminate".

#### Stage 5 — Cluster: iterative relocation, bottom-up, with human inspection

Again from the FIZZ build (Farr & Webber, 2001):

- "This clustering process is an **iterative relocation algorithm** with seed centroids selected
  with probabilities based on the population of each cell". This is k-means with
  population-weighted random seeding: a precursor of k-means++.
- "The clustering algorithm was set to generate 30 clusters. On inspection of the results it was
  decided to split one cluster into two and to reiterate until a new stable solution resulted.
  The resulting 31 clusters were then profiled." The algorithm proposes and the analyst decides.
  The analyst also re-runs after intervening.
- Scale: 324,480 cells (52 Mosaic types × 6,240 "pixel" combinations of 7 person-level
  variables) clustered on 60 lifestyle propensities.

Commercial classifications are built **bottom-up**: "the initial step is to create a typology with
many clusters, which forms the 'bottom' level", which is then aggregated upward. Public open
classifications such as OAC work **top-down**: split into supergroups, then re-cluster inside each
(Spielman & Singleton, 2015; ONS, 2011).

Mosaic 8 is described only as using "AI learning techniques" and "deep learning [that] rebuilds
clusters from scratch". Experian publishes no algorithmic detail for it (see A4).

#### Stage 6 — Hierarchy and the "family tree"

Mosaic Public Sector 2010 is three-tier: "146 Mosaic person types aggregate into 69 household
types and 15 groups". Its **family tree** diagram lays the groups out along the dominant
*polarities*: "Service independent ↔ Service reliant", "Tax contributors ↔ Benefit recipients",
"High ↔ Low consumption", "High ↔ Low local engagement", "Solitary ↔ Social". Mosaic Global
places its 10 groups on **two dimensions: affluence and geographic location (urban ↔ rural)**.

**Lesson:** a 2-D map of the few dominant axes is how users understand the whole system at a
glance.

#### Stage 7 — Profile with trailer data: the Grand Index and key features

Clusters are described with far more data than they are built from:

- Mosaic Public Sector 2010 lists its descriptive sources: "ONS' annual Expenditure and Family
  Survey" (as the document names it),
  the British Household Panel Survey, a 350,000-person online panel, YouGov (66,000), GfK NOP
  (60,000), the Target Group Index (25,000 adults), Hitwise (8 million internet users), the
  British Crime Survey, Hospital Episode Statistics, the Index of Multiple Deprivation, and
  HESA.
- In the FIZZ build, 40 MORI variables were used "to help with the evaluation of the … clusters,
  **not to build them**". These are *trailer* variables: held out from the build and used for
  description and validation.
- Mosaic USA's **Grand Index** indexes "more than 600 variables" across "over 60 data topics".
  "For each variable, the mean value for each group/type is divided by the National Means value,
  and then multiplied by 100". For example, type A01 indexes 298 for homes worth
  $500,000–$749,000. Index > 100 means over-represented. Each type's **key features** are its
  "six top ranked characteristics".

#### Stage 8 — Naming and pen portraits

Mosaic codes are a group letter plus a two-digit type number running across the whole system
(A01…R68). Each carries a short evocative name ("Mansion Millionaires", "Student Pods") and a
one-line description ("Students renting in purpose built developments …"). The **public-sector
edition used descriptive, neutral names instead**, for example "Families and singles living in
developments built since 2001". Wikipedia notes that the public-sector edition revised segment
names in response to concerns about their sensitivity. In the open OAC, "cluster names and
descriptions were subjected to an additional review by ONS to ensure impartiality and
appropriateness", and pen portraits were written by comparing cluster means with the parent
level's mean.

#### Stage 9 — Assignment, refresh and rebuild

Mosaic Public Sector's inputs are "continuously updated. This enables Experian to verify and
update the classification twice a year". Experian's own sales material warns: "If cluster
descriptions are more than a couple years old, they are obsolete". The structure itself is
rebuilt roughly every five to eleven years (2004 → 2009 → 2014 → 2025). Units the system cannot
meaningfully classify are left unclassified rather than forced into a type: non-residential
postcodes carry no Mosaic code (Health & Place study of Mosaic groups, Appendix C).

#### Stage 10 — Across countries: Mosaic Global

This is the part closest to our problem. Mosaic Global is "based on the simple proposition that
the world's cities share common patterns of residential segregation". Its 10 groups "are
consistent across countries". The method, as reported: "for each Mosaic type in each country,
the Index value for each of these variables (or close matching proxies) were extracted from the
database that was used to create the national Mosaic classification system. The Index shows how
the variable compares with all the other types in that country – not in the world".

Global groups are therefore formed from **within-country relative profiles on a common variable
set**, and every group is expected to occur in every country. The groups are:

- Sophisticated Singles
- Bourgeois Prosperity
- Career and Family
- Comfortable Retirement
- Routine Service Workers
- Hard-working Blue-collar
- Metropolitan Strugglers
- Low-income Elders
- Post-industrial Survivors
- Rural Inheritance

### A4. What is *not* public

Experian does not publish:

- the variable list;
- the domain weights;
- how *k* is chosen;
- the validation statistics;
- what the Mosaic 8 "AI learning techniques" are.

Everything above is what Experian and Webber chose to disclose, plus the fully documented open
methods that follow the same tradition. **We should not claim to replicate Mosaic.** We replicate
the documented *method*: domain-weighted relocation clustering, a bottom-up hierarchy, trailer
profiling, a Grand Index, reviewed names, and scheduled refresh.

### A5. The open equivalents (fully documented) — what they add

| Step | 2001 OAC (Vickers & Rees 2007) | 2011 OAC (Gale et al. 2016) | 2021 OAC (Wyszomierski et al. 2023) | 2011 ONS classification of **local authorities** (≈400 units — our closest analogue) |
|---|---|---|---|---|
| Variables | 41 | 60 | 60 of 188 candidates | 59 of 167 |
| Transform | not reviewed here | inverse hyperbolic sine (IHS) | IHS | tested log, Box-Cox, IHS; chose **IHS** |
| Standardise | not reviewed here | range | range | tested range and inter-decile range; chose **inter-decile range** |
| Algorithm | k-means | k-means, best of **10,000** runs | k-means, best of 10,000 runs | k-means |
| Hierarchy | top-down | top-down: 8 / 26 / 76 | top-down: 8 supergroups; **clustergrams** to choose k | top-down: 8 / 16 / 24, from a "preferred range of five to nine clusters" at the top |
| Choosing k | — | elbow, judgement | clustergram + elbow (no clear elbow) + maps + cluster sizes | "qualitative and quantitative assessments, and subjective judgement" |
| Quality rules | — | — | parsimony, cluster size range | reject datasets with skewness beyond ±1, "very small clusters", or clusters "not sufficiently distinguishable" |
| Small units | — | — | Northern Ireland and Scotland to be assigned to the existing centroids | health areas assigned to the nearest subgroup centroid; subgroups holding only 1–2 health areas merged into their parent group |
| Naming | — | pen portraits | expert panel; ONS impartiality review | — |

Two points are worth copying verbatim:

- **The ONS local-authority build is a near-twin of our problem.** It clustered a few hundred
  whole administrative units, top-down, into 8 groups, and merged subgroups that held only one
  or two units.
- **The 2021 OAC builders stated the honest limit.** Variable choice "is informed by correlation
  analysis, but ultimately is subjective in that other variable specifications, cluster
  solutions or clustering methods might identify other latent structures." A classification is
  one defensible view, not a discovered truth.

### A6. Documented critiques and failure modes

| Failure mode | Evidence | What it means for us |
|---|---|---|
| **Clusters from behavioural/survey data discriminate poorly** | Farr & Webber: classifications built on lifestyle-survey behaviour "discriminate poorly on the input variables due to low correlations … and to the apparent lack of natural clusters"; coverage "unlikely to be more than a quarter" of the population; "no obvious manner in which classification codes can be interpolated for non-respondents" | The World Values Survey (88 of 195 countries) is a **descriptor**, not a build input |
| **Uncertainty is hidden** | Spielman & Singleton (2015) show input error propagates into cluster assignments; a hard label hides that | Publish a per-country confidence score and a second-best persona |
| **One-dimensional clusters** | FIZZ clusters "appear somewhat one-dimensional, notwithstanding the range of data used" | Key features must span several domains; watch for a single dominant axis |
| **Names that stereotype** | Mosaic Public Sector renamed segments over sensitivity; ONS reviewed names for impartiality | Names describe data, never people's worth; a reviewed banned-terms list |
| **Staleness** | "If cluster descriptions are more than a couple years old, they are obsolete" (Experian) | Re-score annually, rebuild on triggers |
| **Ecological fallacy** | Classifications describe areas, not every resident (standard geodemographics critique; Webber & Burrows 2018; Burrows & Gane 2006) | A persona describes national aggregates, not every citizen. Say so in the UI |

---

## Part B — From households to countries: what changes

| Aspect | Mosaic | Country Personas | Consequence |
|---|---|---|---|
| Unit | household / postcode | sovereign state (UN member or observer) | Each unit is individually famous: every assignment will be scrutinised |
| n | ~29 million households | **195** | Stability must be demonstrated; clusters of 1–3 are noise; a few outliers can move centroids |
| Inputs | 388–450 variables | ~15–35 usable after screening | Fewer, stronger variables; domain balance matters more |
| Coverage | ≥85% by design | **systematic gaps in microstates** (Part C) | Missing data is informative (missing not at random); naive imputation creates artefacts |
| Redundancy | screened | several indices are near-copies (ρ ≈ 0.95) | Collapse into domain scores before clustering |
| Trailer data | Target Group Index, YouGov, BHPS… | World Values Survey (88), sport, media, memberships, flags | Profile richly, build narrowly |
| Weighting of units | seeds drawn by population | one country, one vote | Report each persona's world-population share as a profile statistic, not a weight |
| Geography | types are defined by location *type* (urban ↔ rural), not by region | continent must not be an input | Otherwise the answer is the map; test that groups cut across continents |
| Hierarchy | ~4 types per group | ~3 types per group | 6–8 groups × ~3 = 18–24 types, ≥4 countries each |
| Politics | neutral commercial product | the app's neutrality and disputed-territory rules apply | Universe = the app's 195; special entities handled by explicit policy |

---

## Part C — What this repo already holds (measured 2026-09-24)

Measured over the app's universe of **195** states (`UN_MEMBER_CODES`: 193 members plus the
two observers). Reproduce with Appendix A.

### C1. Inventory

**Roles:**

- **Core:** a build input. Near-universal, public, sustainable.
- **Desc:** descriptor or trailer. It profiles the personas but never builds them.
- **Out:** not used.

| Domain | Field (file) | Coverage /195 | Vintage | Proposed role |
|---|---|---|---|---|
| Prosperity | GDP per capita, USD (`countryFacts.ts`, World Bank) | 193 | latest of 2021–2024 | **Core** (log) |
| Prosperity | Human Development Index (UNDP) | 192 | 2023 | **Core** |
| Freedom | Freedom House total score | 193 | 2026 | **Core** |
| Freedom | V-Dem Liberal Democracy Index | 173 | 2026 | **Core** |
| Freedom | Economist Democracy Index | 165 | 2025 | **Core** |
| Freedom | RSF Press Freedom score | 175 | 2026 | **Core** |
| Integrity | Corruption Perceptions Index | 179 | 2025 | **Core** |
| Integrity | World Justice Project Rule of Law | 141 | 2025 | **Core** (domain member; domain coverage 181) |
| Peace | Global Peace Index | 160 | 2026 | Desc in v1 (domain coverage 161 fails the 85% gate) |
| Peace | Global Terrorism Index | 161 | 2026 | Desc in v1 |
| Ecology | Ecological Threat Report score | 170 | 2024 | Desc in v1 (misses 25 small states) |
| Scale and reach | population (`NATIONAL_REFERENCE_POPULATION`, Wikidata, dated) | 191 (misses KI, MC, TV, VA) | per-country dated | **Core** (log) |
| Scale and reach | Soft Power Index | 193 | 2026 | **Core** |
| Scale and reach | annual visitors (`tourismLogos.ts`) | 185 | per-country dated; `metric` varies | **Core** (log), after metric harmonisation (C4) |
| Scale and reach | commercial airlines, count | 195 | 2026 curation | Desc (a curation count, not a statistic) |
| Wellbeing | World Happiness (Cantril ladder) | 144 | 2026 | Desc |
| Gender | Gender Gap Index | 145 | 2026 | Desc; promote if a near-universal gender measure is added |
| Perception | Democracy Perception Index | 96 | 2026 | Desc |
| Diplomacy | Lowy Global Diplomacy Index | 64 | 2024 | Desc |
| Competitiveness | IMD score | 66 | 2025 | Desc |
| Media trust | Reuters Digital News, % trusting news | 46 | 2026 | Desc |
| Values | World Values Survey wave 7 (+ joint EVS; South Africa wave 6) | **88** (93 societies, 307 questions) | 2017–2022 (South Africa 2013) | **Desc**; basis of an optional "values" vertical (E6) |
| Alliances | membership in 31 organisations (`countryBlocks.ts`) | 195 (178 in ≥1) | dated notes | Desc (regional bodies encode continent) |
| Sport | Summer/Winter Olympics participations and medals | 194 | 2026 | Desc |
| Sport | men's/women's World Cup appearances and titles | 188 | 2026 | Desc |
| Politics | parties with seats (`politicalParties.ts`) → effective number of parties | 100 | 2026 audit | Desc (coverage) |
| Politics | government type (`governmentTypes.ts`) | 67 | curated | Out (coverage) |
| History | independence year (`NATIONAL_INDEPENDENCE`) | 158 | sourced | Desc |
| Symbols | flag adoption year, colours (195), shapes (191), families (53), passport colour (195) | — | — | Desc; basis of an optional "flag" vertical (E6) |
| Urbanity | largest-city population (`cities.ts`, Natural Earth) ÷ population = urban primacy | 190 | Natural Earth (undated agglomeration) | Candidate core, derivable now |
| Geography | continent/subregion, capital latitude | 195/194 | — | **Out as input**; used to test cross-continent spread |

### C2. Diagnostics — what the numbers say

**1. Redundancy (Spearman ρ, pairwise complete):**

| Pair | ρ |
|---|---|
| Freedom House ↔ V-Dem | 0.96 |
| Freedom House ↔ Economist | 0.96 |
| V-Dem ↔ Economist | 0.94 |
| CPI ↔ WJP | 0.94 |
| HDI ↔ log GDP per capita | 0.96 |
| Happiness ↔ log GDP per capita | 0.85 |
| RSF ↔ Freedom House | 0.84 |

Entered raw, the three democracy indices would triple one signal's weight in every distance.
**They must become one domain score.**

**2. Missingness is structural, not random.** Where an index is missing, the country is tiny:

| Index | Median population where missing | Where present |
|---|---|---|
| CPI | 0.06M | 10.3M |
| V-Dem | 0.10M | 10.6M |
| RSF | 0.10M | 10.6M |
| ETR | 0.10M | 10.8M |
| Economist | 0.12M | 10.9M |
| GTI | 0.18M | 11.0M |
| GPI | 0.20M | 11.4M |
| Happiness | 0.56M | 11.9M |

All differences are significant (Mann-Whitney p < 10⁻⁷). World Values Survey coverage is
likewise size-biased (17M vs 5M). Only **106 of 195** countries are complete on a 20-variable
core. **28** countries would have ≥30% of inputs imputed, and **10** would have ≥50% (the
Vatican: 85%).

**3. Domain-level coverage** (countries with at least one indicator in the domain):

| Domain | Coverage |
|---|---|
| Prosperity | 194 |
| Freedom | 194 |
| Integrity | 181 |
| Scale | 195 |
| Ecology | 170 |
| Peace | 161 |

The 34 countries without a peace score are all small states, mostly islands. **25 countries
observe 4 or fewer of these 6 domains; the Vatican observes 1.**

**4. Dimensionality.** PCA on the 20-variable core has eigenvalues 10.0, 4.5 and 1.4, then
< 1. The first three components explain 50%, 22% and 7% of variance.

- **PC1 — development and governance.** Every freedom, integrity and prosperity index loads
  0.23–0.30 on it.
- **PC2 — scale and global reach.** Population 0.42, visitors 0.36, soft power 0.34, Olympic
  medals 0.33, airlines 0.31.
- **PC3 — freedom relative to wealth.** Freedom House, V-Dem and RSF load +0.30 to +0.34;
  GDP, HDI and happiness load −0.27 to −0.33. PC3 separates wealthy countries with limited
  political freedom from poorer democracies.

These are the axes of our "family tree" (Part D, step 14).

**5. Cluster strength.** Average silhouette is **0.30–0.38 for k = 3–12** (k-means). On
Kaufman & Rousseeuw's scale that is "weak structure, could be artificial". Ward and k-means
agree only partially (ARI 0.43–0.78). There is no elbow.

**Implication:** personas are a *useful partition of a continuum* (as are Mosaic's and OAC's
types). They must be sold as such, with confidence scores, never as natural kinds.

**6. Stability.** Mean bootstrap Jaccard per cluster:

| k | Range | Clusters ≥ 0.75 (Hennig's "stable" line) |
|---|---|---|
| 6 | 0.57–0.74 | none |
| 8 | 0.60–0.84 | 2 of 8 |
| 10 | 0.46–0.85 | 2; one "dissolves" below 0.5 |

Stability has to be engineered: better inputs, domain scores, consensus.

**7. The microstate artefact.** At k = 8, one cluster held 18 countries: Andorra,
Antigua and Barbuda, Barbados, Bahamas, Dominica, Grenada, Saint Kitts and Nevis, Saint Lucia,
Liechtenstein, Luxembourg, Monaco, the Marshall Islands, Malta, Nauru, Palau, Seychelles,
San Marino, and Saint Vincent and the Grenadines. Every member is a state of under ~1 million
people, and on average 41% of their inputs were imputed (every other cluster: ≤16%). It
grouped Luxembourg and Monaco with Nauru and the Marshall Islands.

That is **missing-data geometry, not shared character**. Steps 5–7 of Part D exist to prevent
it. A genuine small-state persona may still emerge, but it must be earned by observed
variables.

**8. Weighting sensitivity.** Balancing the pilot's 8 domains (each variable divided by √(domain
size)) changed the k = 8 partition to ARI **0.59** against the unweighted one. Weights must be
explicit, justified and stress-tested.

### C3. The gap versus Mosaic: no demography, no urbanity

Mosaic is built on **lifestage** (age and household composition), **affluence**, and **housing
and location type**. Mosaic Global's two axes are affluence and urban↔rural. We have affluence,
but **nothing on age structure, urbanisation, connectivity or economic structure**. The most
Mosaic-like improvement is therefore a **Phase-0 data acquisition** through the same World Bank
API `scripts/build-country-facts.mjs` already uses. The World Bank's World Development
Indicators (WDI) are open (CC BY 4.0) and near-universal, including small states.

| Candidate indicator | WDI code | Mosaic domain it mirrors |
|---|---|---|
| Urban population, % of total | `SP.URB.TOTL.IN.ZS` | location type (urban ↔ rural) |
| Population ages 0–14, % | `SP.POP.0014.TO.ZS` | lifestage |
| Population ages 65+, % | `SP.POP.65UP.TO.ZS` | lifestage |
| Fertility rate, births per woman | `SP.DYN.TFRT.IN` | household composition |
| Life expectancy at birth | `SP.DYN.LE00.IN` | health / lifestage |
| Individuals using the Internet, % | `IT.NET.USER.ZS` | connectivity ("digital" segments) |
| Agriculture, value added, % of GDP | `NV.AGR.TOTL.ZS` | occupation / rurality |
| Industry, value added, % of GDP | `NV.IND.TOTL.ZS` | "blue-collar" economy |
| Trade, % of GDP | `NE.TRD.GNFS.ZS` | openness |
| International migrant stock, % | `SM.POP.TOTL.ZS` | mobility / diversity |
| Population density | `EN.POP.DNST` | settlement pattern |
| Intentional homicides per 100k | `VC.IHR.PSRC.P5` | a near-universal security measure (could replace GPI/GTI as core) |
| Female labour-force participation (ILO modelled) | `SL.TLF.CACT.FE.ZS` | a near-universal gender measure |

Every code's coverage must be **measured at fetch time**. The 85% gate decides, not this table.
Each figure is stored with its year, exactly as `countryFacts.ts` does.

### C4. Data-quality issues found while doing this

- **Namibia's code `NA` is read as "missing"** by pandas (`read_csv`) and R by default. Any
  analysis pipeline must disable default missing-value tokens for the code column. The pilot
  does.
- **Three Olympic-committee "NOC founded" values** in `src/data/nationalFlags.ts` hold raw
  wiki template text (`{{start date and age`) instead of a year, for example the United Arab
  Emirates. This is a descriptor only and irrelevant to the pilot. But it renders in the Learn
  panel's stats rows and should be fixed at its generator.
- **Annual visitors are not one measure.** `tourismLogos.ts` records a `metric` per country
  because figures are not always "international tourist arrivals". Before use as a core input,
  restrict to one metric (or switch to WDI `ST.INT.ARVL`) so like is compared with like.
- **Index vintages differ** (HDI 2023 … Freedom House 2026). Record them in the model spec.
  Never mix editions of one index within a build.

---

## Part D — The playbook, step by step

Each step says **what to do**, **why** (Mosaic or open-method precedent), and **the pass
condition**.

### Step 0 — Ground rules (this repo's hard rules, applied here)

- **Sourced inputs only.** Every input value comes from a dated, cited source already bundled,
  or fetched by a generator. Never from memory, never hand-typed. This is the repo's
  "never fabricate a population" discipline.
- **Imputed values are internal only.** They exist to compute distances and are never shown to
  a user as data. "A missing figure beats a wrong one."
- **Generated files are never hand-edited.** The persona dataset is produced by a script from
  a frozen model spec.
- **Every check that gates it runs in CI.** It sits in `npm run flags:check` **and** in a
  `run:` step of the `flag-integrity` workflow, on a Node 22.18+ job if it imports `.ts`.
  This is the "a check that does not run in CI is not a gate" rule.
- **Visual verification** in the running app before every push, and "merged" is not "live".
- **User-facing copy is learner copy:** no ISO codes, no Wikidata ids, no pipeline jargon.
- **Neutrality:** no persona or name may take a political side (Part F).

### Step 1 — Purpose, unit, universe

- **Purpose** (write it down, as Mosaic's Stage 1 does). Help learners see which countries
  resemble each other across development, governance, scale and way of life, and why.
  **Explicitly not:** ranking, judging, or predicting anything about individuals.
- **Unit:** the country as a whole (national aggregates).
- **Universe:** the app's 195. Special entities (Taiwan, Kosovo, Hong Kong, …) are **out of
  the build**. If the owner later wants them shown, assign them post hoc to the nearest
  centroid with a visible "assigned, not part of the build" flag, applied identically to all
  such entities (the ONS "assign to nearest centroid" precedent). Antarctica is never a unit.
- **Distinctions the classification must be able to express** (write the list before choosing
  variables). For example:
  - large vs small;
  - rich with limited political freedom vs poorer democracies (our PC3);
  - young and fast-growing vs old and shrinking (needs Phase 0);
  - urban vs rural (needs Phase 0).

### Step 2 — Acquire and snapshot the inputs

- One generator (`scripts/build-country-persona-inputs.mjs`) reads the bundled datasets and
  fetches any Phase-0 WDI series. It writes a **snapshot** with value, year, source URL and
  fetch date per cell: `scripts/data/country-persona-inputs.json`.
- The snapshot is the only thing the build reads, so a build is reproducible from the
  repository alone.

### Step 3 — Audit and select variables

**Roles.** Every variable gets exactly one:

- **Core:** a build input.
- **Descriptor/trailer:** profiles the personas and validates them.
- **Excluded.**

**Core gates** (all must hold):

1. **Coverage ≥ 85% of 195 (≥ 166)** at the *domain* level. This is Experian's universality
   rule.
2. **Public and sustainable:** the source will publish again, and the licence allows reuse.
3. **Conceptual fit** with the Step 1 list.
4. **No |ρ| ≥ 0.81 with another core variable *across* domains.** Inside a domain, high
   correlation is desirable, because it is what makes a domain score reliable (step 5).
5. **|skewness| ≤ 1 after transformation** (ONS rule).

**Descriptor-only rules.**

- Survey attitudes (the World Values Survey), curation counts (airlines, newspapers), sport,
  symbols and memberships are descriptors. This is the Farr & Webber lesson.
- **Continent/subregion are never inputs.**

### Step 4 — Transform, align and standardise

| Variable kind | Transform | Why |
|---|---|---|
| Sizes and money (population, GDP per capita, visitors) | natural log | multiplicative scales |
| Counts with zeros (medals, appearances) | inverse hyperbolic sine, `asinh(x)` | log-like and defined at 0 (OAC's choice) |
| Bounded scores (0–1, 0–10, 0–100) | none; Yeo-Johnson only if \|skew\| > 1 | already interval-scaled |
| Shares (%) | as is, or `asinh` if heavily skewed (OAC converts to %, then `asinh`) | — |
| **Ranks** | **never use** | a rank depends on how many countries an index covers (50th of 140 ≠ 50th of 180) |

- **Sign-align within a domain** so that higher means "more of the named concept" (for
  example, negate GPI so higher = more peaceful). Record each sign in the spec.
- **Standardise robustly:** (x − median) / inter-decile range (the ONS choice), or z-scores
  after winsorising at the 1st and 99th percentiles. With 195 units, Qatar's income or China's
  and India's populations would otherwise set the scale.
- Store every centring and scaling constant in the spec, so re-scoring reuses them.

### Step 5 — Collapse each domain into a score (redundancy becomes robustness)

- **Domain score** = mean of the *available* standardised, sign-aligned indicators in that
  domain, then rescaled to unit variance.
  - Because indicators inside a domain agree (ρ ≈ 0.95), the mean of whichever are present is
    a good estimate of the domain. This quietly solves most item-level missingness without
    modelling. For example, a country with Freedom House but no V-Dem still gets a freedom
    score.
  - This is the OECD/JRC composite-indicator practice for reflective indicators.
- **Check unidimensionality** before accepting a domain: first-component share ≥ 70% or
  Cronbach's α ≥ 0.8. If it fails, split the domain or keep a second component.
- Keep the domain count modest, roughly **5–9**. Each domain is one axis a learner can name.

### Step 6 — Handle whole-domain missingness honestly

What remains after step 5 is whole domains missing, concentrated in small states.

**1. Build set.** A country enters the build only if it observes **≥ 75% of the total domain
weight**. Others are *scored afterwards* (point 3), so they can never distort centroids. That
is the direct fix for the microstate artefact (C2.7).

**2. Inside the build set**, fill residual gaps by **multiple imputation**:

- MICE with predictive mean matching;
- m = 20 imputations;
- auxiliaries: all domain scores, log population, and descriptors correlated with the missing
  domain.

Run the clustering on every imputed dataset and combine by **consensus** (step 9).
Alternatively, use k-POD (k-means for missing data; Chi et al., 2016) and compare the results.

**3. Countries outside the build set** are assigned by **partial distance** to the frozen
centroids: Euclidean distance over observed domains only, rescaled by weight observed. This is
the ONS nearest-centroid precedent. They are marked **provisional**.

**4. Unclassified.** A country observing < 50% of domain weight is **Unclassified: not enough
comparable data**. Mosaic likewise leaves units it cannot meaningfully classify unclassified.
On current data that is the Vatican, and the label must be written in learner-friendly
language.

**5. Record the imputed share** per country in the output. Never display imputed values.

### Step 7 — Weight the domains

- Apply Farr & Webber's rule, **x′ = k·(x − x̄)/s**, at the domain level. **Default k = 1 for
  every domain**; step 5 has already equalised the number of variables per domain.
- Deviations must be **written down with a reason**. The pilot shows why: the scale-and-reach
  domain is the second axis of variation and can dominate (C2.4), so test k between 0.5 and 1.
- **Sensitivity analysis** (OECD/JRC):
  - perturb each k by ±50% one at a time;
  - draw 500 random weight vectors from a Dirichlet distribution centred on the defaults;
  - rebuild each time.

  Report the median ARI against the baseline, and each country's modal persona frequency.
  **Pass: median ARI ≥ 0.7.**
- Do not tune weights on the same trailer variables used to validate (step 13). Split them
  in half first.

### Step 8 — Cluster: types bottom-up, then groups

**Types (the bottom level), following Mosaic's bottom-up approach:**

- **Algorithm:** k-means (Lloyd) on the weighted domain scores.
  - Start from a Ward solution, plus **≥ 10,000 random k-means++ restarts** (OAC's 10,000 runs;
    at n = 195 this takes seconds). Keep the lowest within-cluster sum of squares.
  - This two-stage Ward → k-means design is the classic recommendation for marketing
    segmentation (Punj & Stewart, 1983).
- Cross-check with **PAM (k-medoids)**. Its medoids are real countries: natural "typical
  members".
- **Candidate k for types: 15–27.**
- **Size rules** (ONS merged 1–2-unit subgroups; FIZZ split and re-iterated):
  - every type has **≥ 4 countries**;
  - merge a smaller type into its nearest neighbour and **re-iterate to convergence**.

**Groups (the top level):**

- **Ward's hierarchical clustering on type centroids, weighted by type size.** Cut at
  **6–8 groups**. The hierarchy is strictly nested.
- **Check direction-independence.** Also build top-down (OAC style: k-means into groups, then
  k-means within each group). **Pass: ARI ≥ 0.6** between the bottom-up and top-down group
  partitions. Otherwise the hierarchy is an artefact of the procedure.

**Choosing k.** No single index decides. Use a panel:

- average silhouette (Rousseeuw);
- Calinski-Harabasz;
- the gap statistic (Tibshirani et al., 2001; B = 500);
- the within-cluster sum of squares curve;
- a **clustergram** (Fleischmann, 2023; used for the 2021 OAC);
- bootstrap Jaccard (step 9);
- the size rules;
- interpretability of the Grand Index (step 11).

Record the decision and its reasons in a ledger. ONS says outright that the choice combines
"qualitative and quantitative assessments, and subjective judgement".

### Step 9 — Prove stability; build by consensus

- **Consensus clustering** (Monti et al., 2003) across the 20 imputations × 200 bootstrap
  resamples. Build the co-assignment matrix, then take the final partition from Ward on
  (1 − consensus). Countries that switch between runs are exactly the borderline ones.
- **Per-cluster bootstrap Jaccard** (Hennig, 2007). **Groups ≥ 0.75** (stable). **≥ 80% of
  types ≥ 0.60**. No type ≤ 0.50 ("dissolved").
- **Leave-one-variable-out.** Rebuild without each core variable. **Pass: ARI ≥ 0.8**, so no
  single index drives the system.
- **Temporal.** Re-score with the previous edition of each index where one exists. Report the
  share of countries that change group; it should be small, and each change explicable.

### Step 10 — Assignment confidence and second choice

For every country:

- the distance to its own centroid, d₁, and to the nearest other centroid, d₂;
- **confidence = 1 − d₁/d₂** (0 = on the boundary);
- its individual silhouette;
- its **second-best persona**;
- its consensus frequency.

A country with confidence below 0.1 is **borderline**. The UI can honestly say it "sits between
A and B". This answers Spielman & Singleton's uncertainty critique, and matters more for us
because C2.5 found only weak structure.

### Step 11 — Profile everything: the Grand Index

Profile each group and type on **every** variable, core and descriptor, using **observed values
only** and showing *n* observed.

- **Ratio-scale, non-negative variables** (GDP per capita, population, visitors, % answering
  X): **index = 100 × persona mean ÷ world mean**. This is Mosaic's formula. "World mean" is
  the *unweighted* mean across countries, because the unit is the country. Also show the
  population-weighted figure where it tells a different story.
- **Interval and bounded scores** (Freedom House 0–100, HDI): report the persona mean and the
  **standardised difference z = (persona mean − world mean) / world SD**. A ratio index on an
  arbitrary-zero scale misleads.
- **Categorical descriptors** (Freedom House status, V-Dem regime type, EU membership,
  continent, red in the flag): **penetration index = 100 × share in persona ÷ share in world**.
  This is how Mosaic indexes categories.
- **Key features** are the top **six** by |z| or index distance from 100 (Mosaic's "six top
  ranked characteristics"). They must be observed for ≥ 60% of members, n ≥ 5, and **drawn
  from ≥ 3 domains** (the anti-"one-dimensional" rule from FIZZ).
- **World Values Survey features** appear only for personas with ≥ 5 surveyed members, always
  with "n of N countries surveyed".
- Also compute each persona's share of countries and of world population, its continent mix,
  and **3–5 typical members** (the countries nearest the centroid, or PAM medoids).

### Step 12 — Name, describe, review

**Codes.**

- Groups get letters A–H; types get two-digit numbers running across the system (A01, A02,
  B03 …), as Mosaic does.
- Order groups along the family-tree layout (step 14). State in the UI that **a letter is a
  label, not a rank**.

**Names.** Two to four words, describing what the Grand Index shows. Each name comes with a
**plain descriptive line**, the Mosaic Public Sector style.

- Names **must not** include:
  - any country, region or continent name;
  - any religion, ethnicity or language;
  - any moral or developmental judgement ("failed", "backward", "poor", "developing", "third
    world", "rogue", "elite");
  - pejorative adjectives.
- Where a sensitive domain is a key feature, the **descriptive line** cites the index by name
  and year ("low scores on the Freedom House 2026 index"). It never uses an unattributed
  adjective.
- Keep a banned-terms list in the check script (step 15).

**Pen portrait** (every sentence traceable to a Grand Index row):

1. descriptive line;
2. ≤ 120-word paragraph;
3. six key features with their values;
4. typical members;
5. where it is found (continent mix);
6. share of countries and of world population;
7. how each type differs from its group, and each group from the world. This is OAC's
   "compare to the parent mean" convention.

**Review.** The owner reviews every name and portrait against the checklist before shipping, as
ONS reviewed OAC names for impartiality. Also list "surprising members" with the key features
that explain them. Surprises that cannot be explained are a signal to revisit steps 3–8.

### Step 13 — Validate externally

- **Discrimination on held-out trailers** (Mosaic's core claim is discriminatory power). Compute
  η² (one-way ANOVA effect size) of persona membership for each trailer variable. Candidates:
  - the World Values Survey Inglehart–Welzel items;
  - happiness;
  - the gender gap;
  - Olympic medals per capita;
  - the effective number of parties;
  - media and sport counts;
  - flag adoption year.

  Compare against:

  - (a) UN M49 subregions;
  - (b) World Bank income groups;
  - (c) **1,000 random partitions with the same sizes** (a permutation null).

  **Pass:** personas beat the null on nearly every trailer. They should be competitive with
  income groups on economic trailers and better on multi-domain ones.
- **Benchmark agreement** (ARI or normalised mutual information) against:
  - UN regions;
  - income groups;
  - Freedom House status;
  - the Inglehart–Welzel cultural zones (88 countries);
  - the GLOBE societal clusters (62 societies; House et al., 2004).

  **Moderate is the goal.** ARI ≈ 1 with regions means we have redrawn the map. ARI ≈ 0 with
  everything means noise.
- **Cross-continent spread** (Mosaic Global's premise that types recur everywhere). Report each
  group's continent entropy. A group drawn entirely from one continent is flagged for review:
  is it real, or has geography leaked in through a variable?
- **Face validity** is the owner review in step 12.

### Step 14 — Visualise: the family tree

Draw a 2-D map of the system, as in Mosaic Public Sector's family tree and Mosaic Global's
affluence × urban/rural plane:

- countries as dots on the first two axes of the domain scores (C2.4: development-governance ×
  scale-reach; with Phase 0, likely development × demography/urbanity);
- groups as coloured regions and types as labelled centroids;
- axis ends labelled in plain words.

This single picture explains the whole system. Build it with the app's chart conventions and
colour-distinctness rules (step 15).

### Step 15 — Freeze, generate, check, ship

**Build and score are separate** (heavy build rarely, light scoring often, as Mosaic does):

| File | Role |
|---|---|
| `scripts/country-personas/build.py` (pinned `requirements.txt`, fixed seeds) | Research build: steps 3–13. Writes the frozen spec and a build report |
| `scripts/data/country-personas-model.json` | **Frozen model**: variable list with sources and vintages, transforms, signs, centring and scaling constants, domain weights, centroids, hierarchy, codes, names |
| `scripts/data/country-persona-portraits.json` | Curated names, descriptive lines and pen portraits, each claim keyed to a Grand Index row |
| `scripts/build-country-personas.mjs` | Deterministic Node scorer with no numeric dependencies. Applies the spec to the snapshot and writes the generated file |
| `src/data/countryPersonas.ts` (AUTO-GENERATED) | Per country: group, type, confidence, second choice, provisional/unclassified flag, imputed share. Plus the Grand Index key features |
| `scripts/check-country-personas.mjs` | The gate (below) |
| `docs/COUNTRY_PERSONAS_LEDGER.md` | Decisions, k choices, weight rationale, review outcomes, re-score diffs |

**`check-country-personas.mjs` fails the build when any of these holds:**

- the generated file is not what the spec plus snapshot produce (drift);
- a UN member has no persona and no provisional/unclassified flag;
- the size rules are broken, or the hierarchy is not nested;
- a name or portrait contains a banned term, an ISO code, a Q-id or a URL;
- a portrait claim cites a Grand Index row that does not exist or does not support it
  (direction check);
- an imputed value appears anywhere in `src/`.

Wire it into `npm run flags:check` **and** a `run:` step of `flag-integrity` (Node 22.18+).
`check-ci-coverage.mjs` enforces this.

**UI surfaces** (each follows an existing hard rule):

- **Flag grid "Group by: Country persona".** Groups in code order, with an honest
  "Unclassified" heading if needed. The "Other" ban applies: every country has a place.
- **Map colour mode.** Personas are **categorical, not ordered**, so they must *not* use the
  index green→red palette. Use a palette with guaranteed distinct colours, the same guarantee
  as the hierarchy type-colour rule.
- **Country fact-sheet row "Persona"**, with a tooltip on hover *and* tap/focus (like the
  membership badges). It shows the name, descriptive line, confidence ("sits between …" when
  borderline) and a link to the portrait. Adding a row is allowed; the fact-sheet rows must
  never be reduced.
- **The family-tree chart.**
- **Quiz modes** ("which persona?", "odd one out") must satisfy the one-correct-answer rule.
  **Exclude borderline countries from quiz decks.**
- **Mandatory visual verification** in the running app, then `npm run live:check` after merge.

### Step 16 — Maintain: re-score often, rebuild rarely

**Re-score** (apply the frozen spec to refreshed inputs) whenever a core index publishes a new
edition, at least **annually**. Mosaic Public Sector re-verifies twice a year. Each re-score
produces a diff: which countries changed persona, and which domain moved them. The diff goes
into the ledger.

**Rebuild** (new spec and a new edition name, for example "Country Personas 2026" → "2029")
when any of these happens:

- the core variable set changes;
- **more than 10% of countries change group** on a re-score;
- median confidence falls by more than 20%;
- **3 years** have passed. Experian: descriptions "more than a couple years old … are
  obsolete".

---

## Part E — Recommended v1 specification

### E1. Domains (Core) and descriptors

| # | Domain | Indicators (sign-aligned so higher = more of the concept) | Coverage today | Default *k* |
|---|---|---|---|---|
| 1 | Prosperity and human development | log GDP per capita; HDI | 194 | 1 |
| 2 | Political freedom | Freedom House; V-Dem LDI; Economist; RSF | 194 | 1 |
| 3 | Institutional integrity | CPI; WJP | 181 | 1 |
| 4 | Scale and global reach | log population; Soft Power; log visitors (one metric) | 195 | 0.5–1 (test) |
| 5 | Settlement *(derivable now)* | urban primacy = largest city ÷ population | 190 | 0.5 (test) |
| 6 | Demography and lifestage *(Phase 0)* | % aged 0–14; % aged 65+; fertility; life expectancy | fetch | 1 |
| 7 | Urbanisation and connectivity *(Phase 0)* | % urban; % using the internet; density | fetch | 1 |
| 8 | Economic structure *(Phase 0)* | agriculture % GDP; industry % GDP; trade % GDP | fetch | 1 |
| (9) | Peace and security *(if a universal measure is added)* | homicide rate (WDI), with GPI/GTI as within-domain members | fetch | 1 |

Notes:

- **Domain 5 is new work.** Its first-component/α check has not been run, so it is marked
  "test".
- **Domains 6–9 require Phase 0** and must pass the 85% gate at fetch.
- **If Phase 0 is deferred**, a v1 on domains 1–5 is buildable today. It will be a
  "development × governance × scale" classification, thinner than Mosaic, and its portraits
  must not imply lifestyle content it does not measure.
- **Descriptors (never inputs):** World Values Survey (all 307 questions), happiness, gender
  gap, GPI/GTI/ETR (until domain 9), Democracy Perception Index, Global Diplomacy Index, IMD,
  Digital News, the 31 memberships, Olympics and World Cups, media counts, effective number of
  parties, independence year, flag and passport attributes, continent/subregion.

### E2. Target structure

- **Groups:** 6–8; each 10–45 countries (≤ 23% of the 195).
- **Types:** 18–24, nested; each ≥ 4 countries; about 3 per group.
- **Special codes:** "provisional" (scored, not built) and "Unclassified" (under 50% of domain
  weight observed). The target is ≤ 1 unclassified country.

### E3. Acceptance criteria (the build report must show each)

| Criterion | Pass |
|---|---|
| Every one of the 195 has a type, or is provisional or unclassified | 100% |
| Provisional (outside the build set) | reported; expected ≈ 20–25 small states |
| Group size | 10–45 countries |
| Type size | ≥ 4 countries |
| Group bootstrap Jaccard | every group ≥ 0.75 |
| Type bootstrap Jaccard | ≥ 80% of types ≥ 0.60; none ≤ 0.50 |
| Agreement across the 20 imputations (modal type) | ≥ 90% of countries |
| Weight sensitivity (median ARI vs baseline) | ≥ 0.70 |
| Leave-one-variable-out ARI | ≥ 0.80 for every variable |
| Bottom-up vs top-down group ARI | ≥ 0.60 |
| Discrimination vs same-size random partitions | beats the permutation null (p < 0.01) on ≥ 90% of trailers |
| Average silhouette | **reported, not gated**. Expect about 0.25–0.40; this is a continuum |
| Key features | 6 per persona, from ≥ 3 domains, each observed for ≥ 60% of members |
| Names and portraits | pass the banned-terms and user-facing-copy checks, plus owner review |

### E4. Build order (suggested PR sequence)

1. **Phase 0 data.** Add the WDI series to the snapshot generator, with coverage measured,
   dated and sourced. Fix the C4 data-quality items.
2. **Research build.** `build.py`, the build report, the ledger. Nothing in `src/` yet.
3. **Owner review** of names and portraits, then the frozen model and portraits files.
4. **Generator, check and CI wiring**, then `countryPersonas.ts`.
5. **UI:** Group by, map colour mode, fact-sheet row, family-tree chart. Visual verification.
6. **Later:** quiz modes, and the verticals in E6.

### E5. What a persona row could look like (illustrative schema only; no real values)

```ts
export type CountryPersona = {
  group: string;            // "C"
  type: string;             // "C07"
  status: "built" | "provisional" | "unclassified";
  confidence: number;       // 1 − d1/d2, 0..1
  secondType?: string;      // nearest other type
  imputedShare: number;     // share of domain weight imputed (never the imputed values)
};
```

### E6. Optional verticals (Mosaic's precedent: Financial Strategy Segments, Mosaic Public Sector)

Experian builds sector-specific classifications with the same engine. FIZZ "correlate[s] with
but do[es] not map exactly onto MOSAIC". Two natural verticals here:

- **Values personas** (88 countries; World Values Survey). Cluster on the ten
  Inglehart–Welzel items. The repo holds all ten (Q164, Q8/Q14/Q15/Q17 autonomy, Q184, Q254,
  Q45, Q46, Q182, Q209, Q57, Q154/155). Map them on the traditional↔secular-rational and
  survival↔self-expression axes, and compare to the published cultural zones. Coverage is the
  88 surveyed countries only. Note: the official map uses individual-level data; ours
  aggregates country answer shares, so treat it as an approximation.
- **Flag personas** (195). Cluster flag *designs* on colours, shapes, aspect ratio, layout
  family and adoption year: a playful, educational companion to Country Personas. It uses no
  socio-economic data at all, so it carries none of the sensitivities in Part F.

---

## Part F — Risks, ethics and neutrality

- **Ecological fallacy.** A country persona describes national aggregates, not citizens. Every
  portrait page says so in one plain sentence.
- **Stereotyping and judgement.**
  - Names and portraits describe *measured* characteristics, attributed to their publishers
    and years.
  - Letters are labels, not ranks.
  - The banned-terms list and owner review (step 12) are mandatory.
  - Governance indices are themselves contested and partly perception-based. Attribute them
    ("Freedom House 2026 rates …"); never adopt their verdict in our own voice.
- **Neutrality and disputed territory.** The universe is the app's 195 states. No persona may
  imply a position on a dispute. If special entities are ever assigned, it is post hoc, flagged,
  and the same for all of them (Step 1). Antarctica is never a unit.
- **Uncertainty.** With silhouettes around 0.3, a hard label overstates precision. Publish
  confidence and a second choice, and keep borderline countries out of quizzes.
- **Source bias.** Several indices share Western publishers or perception surveys. Prefer
  domain scores that average several sources, and statistical indicators (WDI) where possible.
- **Staleness.** Re-score annually, rebuild on triggers, show the edition year in the UI.
- **Trademark.** Never call the feature "Mosaic" in the app.

---

## Appendix A — Pilot diagnostics: method and full results

**Purpose.** A feasibility probe, **not** the classification. Its cluster memberships are
quoted in C2.7 only to show an artefact, and must never be shipped.

**Reproduce:**

```bash
node docs/country-personas/pilot-export.mjs /tmp/country-personas-pilot.csv
python3 -m venv /tmp/cm && /tmp/cm/bin/pip install numpy scipy pandas scikit-learn
/tmp/cm/bin/python docs/country-personas/pilot-diagnostics.py /tmp/country-personas-pilot.csv
```

**Method.**

- **Data:** 20 pilot core variables (log GDP per capita, log population, HDI, Freedom House,
  V-Dem, Economist, CPI, RSF, WJP, GPI, GTI, ETR, Gender Gap, Happiness, Soft Power, log
  visitors, log(1+medals), World Cup appearances, number of memberships, log(1+airlines)).
- **Imputation:** single chained-equations imputation (scikit-learn `IterativeImputer`,
  Bayesian ridge, 25 iterations). The playbook requires m = 20 multiple imputation instead.
- **Model:** z-scores, then PCA (Kaiser: 3 components kept). Ward and k-means (200 restarts)
  for k = 3–12. Bootstrap Jaccard with 100 resamples.
- **Weighting test:** a domain-balanced variant divides each variable by √(domain size).

**Results.**

| k | Silhouette (k-means) | Silhouette (Ward) | ARI (Ward vs k-means) | Cluster sizes (k-means) |
|---|---|---|---|---|
| 3 | 0.377 | 0.322 | 0.71 | 97, 56, 42 |
| 4 | 0.364 | 0.344 | 0.78 | 64, 54, 42, 35 |
| 5 | 0.324 | 0.286 | 0.47 | 54, 44, 40, 32, 25 |
| 6 | 0.307 | 0.269 | 0.43 | 49, 35, 33, 28, 26, 24 |
| 7 | 0.309 | 0.282 | 0.54 | 35, 32, 29, 26, 25, 24, 24 |
| 8 | 0.309 | 0.269 | 0.67 | 35, 32, 30, 24, 24, 22, 18, 10 |
| 9 | 0.309 | 0.253 | 0.55 | 34, 30, 27, 26, 21, 16, 16, 14, 11 |
| 10 | 0.303 | 0.267 | 0.52 | 29, 28, 22, 22, 20, 19, 16, 15, 15, 9 |
| 11 | 0.313 | 0.273 | 0.65 | 27, 26, 22, 20, 18, 17, 16, 14, 13, 12, 10 |
| 12 | 0.310 | 0.288 | 0.60 | 28, 22, 22, 19, 17, 16, 16, 14, 13, 12, 10, 6 |

- **PCA:** eigenvalues 10.02, 4.51, 1.40, 0.75, 0.61, 0.49. Cumulative variance 49.8%, 72.3%,
  79.2%, 82.9%.
- **Bootstrap Jaccard** (mean per cluster, sorted):
  - k = 6: 0.74 0.66 0.66 0.64 0.59 0.57;
  - k = 8: 0.84 0.82 0.74 0.69 0.67 0.64 0.63 0.60;
  - k = 10: 0.85 0.85 0.74 0.68 0.65 0.62 0.62 0.58 0.54 0.46.
- **k = 8 artefact check:**

  | | Members | Share with population under 1M | Mean imputed share of inputs |
  |---|---|---|---|
  | Microstate cluster | 18 | 17 of 18 (the 18th, Monaco, has no bundled population) | 0.41 |
  | The other seven clusters | — | 0–0.44 | 0.01–0.16 |

- **Domain-balanced k = 8:** silhouette 0.189; ARI vs unweighted k = 8 is 0.59.

---

## Appendix B — Glossary

| Term | Meaning |
|---|---|
| **Type / group** | Bottom and top levels of the hierarchy (Mosaic's terms; OAC says subgroup/group/supergroup) |
| **Domain** | A theme of related variables (freedom, prosperity …) collapsed into one score and weighted as a unit |
| **Trailer variable** | Data held out of the build and used only to describe and validate (Farr & Webber's term, for the MORI variables) |
| **Grand Index** | Table of persona-vs-world indices for every variable; index = 100 × persona mean ÷ world mean |
| **Key features** | The six most distinctive Grand Index rows of a persona |
| **Pen portrait** | Short prose description of a persona, every claim backed by the Grand Index |
| **Family tree** | 2-D map of the dominant axes with personas placed on it |
| **Silhouette** | −1…1 measure of how much closer a unit is to its own cluster than to the next; mean > 0.5 is reasonable structure, 0.26–0.5 weak |
| **Jaccard (bootstrap)** | Overlap between a cluster and its best match in resampled data; ≥ 0.75 stable, ≤ 0.5 dissolved (Hennig 2007) |
| **ARI** | Adjusted Rand index: agreement between two partitions, 0 = chance, 1 = identical |
| **IHS** | Inverse hyperbolic sine, `asinh(x)`: log-like transform defined at zero |
| **MICE / PMM** | Multiple imputation by chained equations / predictive mean matching |
| **Provisional** | Scored against frozen centroids but not part of the build (too little observed data) |

---

## Appendix C — Sources

**Experian and Mosaic (primary)**

- Experian (2010). *Mosaic Public Sector* (methodology, data components, family tree). UK Data Service:
  https://sp.ukdataservice.ac.uk/doc/5738/mrdoc/pdf/5738_mosaicpublicsector_info_2010.pdf
- Farr, M. & Webber, R. (2001). MOSAIC: From an area classification system to individual classification.
  *Journal of Targeting, Measurement and Analysis for Marketing* 10(1), 55–65.
  https://link.springer.com/article/10.1057/palgrave.jt.5740033
- Experian (2014). *Mosaic: The consumer classification solution for consistent cross-channel marketing* (UK brochure):
  https://www.selectabase.co.uk/downloads/Brochure_Mosaic%20%E2%80%93%20Single%20Pages.pdf
- Experian (2014-04-17). Experian reveals the changing face of the UK consumer with the launch of new Mosaic:
  https://www.experianplc.com/newsroom/press-releases/2014/17-04-2014
- Experian (2025). Experian maps UK's changing living patterns (Mosaic 8):
  https://www.experianplc.com/newsroom/press-releases/2025/experian-maps-uk-s-changing-living-patterns--
- Experian UK. Mosaic segmentation groups (Mosaic 8, 18 groups / 68 types):
  https://www.experian.co.uk/business/platforms/mosaic/segmentation-groups
- Experian UK. Mosaic data methodology and build:
  https://www.experian.co.uk/assets/marketing-services/presentations/mosaic-data-methodology-and-build.pdf
- Experian Aperture. United Kingdom data guide (Mosaic 7 and 8, Public Sector Mosaic specifications):
  https://docs.experianaperture.io/data-resources/global-datasets/asset/dg_gbr.pdf
- Experian Marketing Services (2014). *Mosaic USA* brochure (includes Mosaic Global):
  https://goodtimesweb.org/industrial-policy/2015/mosaic-brochure-october-2014.pdf
- Experian (2016/2019). *Product Guide: Mosaic USA* (Grand Index):
  https://assets.cengage.com/gale/help/dnow/Mosaic/AboutMosaic2016.pdf
- Experian US. Mosaic consumer lifestyle segmentation: https://www.experian.com/marketing/consumer-view/data/mosaic
- Geo Strategies. Mosaic Global: https://geo-strategies.com/consumer-data-insights/segmentations/mosaic-global/
- Health & Place. Assessing the potential utility of commercial 'big data' for health research: enhancing
  small-area deprivation measures with Experian Mosaic groups:
  https://www.sciencedirect.com/science/article/pii/S1353829218311328
- Wikipedia. Mosaic (geodemography): https://en.wikipedia.org/wiki/Mosaic_(geodemography) ·
  Geodemographic segmentation: https://en.wikipedia.org/wiki/Geodemographic_segmentation

**Open geodemographic methods**

- Office for National Statistics (2015). 2011 Area Classifications: methodology and variables:
  https://www.ons.gov.uk/methodology/geography/geographicalproducts/areaclassifications/2011areaclassifications/methodologyandvariables
- Gale, C., Singleton, A., Bates, A. & Longley, P. (2016). Creating the 2011 area classification for output areas
  (2011 OAC). *Journal of Spatial Information Science* 12, 1–27. https://josis.org/index.php/josis/article/view/66
- Wyszomierski, J., Longley, P., Singleton, A., Gale, C. & O'Brien, O. (2023). A neighbourhood Output Area
  Classification from the 2021 and 2022 UK censuses. *The Geographical Journal*. https://doi.org/10.1111/geoj.12550
- Vickers, D. & Rees, P. (2007). Creating the UK National Statistics 2001 output area classification.
  *JRSS A* 170(2), 379–403.
- Spielman, S. & Singleton, A. (2015). Studying neighborhoods using uncertain data from the American Community
  Survey: a contextual approach. *Annals of the AAG* 105(5), 1003–1025. https://doi.org/10.1080/00045608.2015.1052335
- Harris, R., Sleight, P. & Webber, R. (2005). *Geodemographics, GIS and Neighbourhood Targeting*. Wiley.
- Webber, R. & Burrows, R. (2018). *The Predictive Postcode: The Geodemographic Classification of British Society*. SAGE.
- Webber, R. & Craig, J. (1978). *Socio-economic Classification of Local Authority Areas*. OPCS Studies on
  Medical and Population Subjects No. 35. HMSO.
- Burrows, R. & Gane, N. (2006). Geodemographics, software and class. *Sociology* 40(5), 793–812.

**Statistical methods**

- Ward, J. H. (1963). Hierarchical grouping to optimize an objective function. *JASA* 58(301), 236–244.
- Arthur, D. & Vassilvitskii, S. (2007). k-means++: the advantages of careful seeding. *Proc. SODA*.
- Punj, G. & Stewart, D. (1983). Cluster analysis in marketing research: review and suggestions for application.
  *Journal of Marketing Research* 20(2), 134–148.
- Milligan, G. & Cooper, M. (1985). An examination of procedures for determining the number of clusters.
  *Psychometrika* 50(2), 159–179.
- Steinley, D. (2006). K-means clustering: a half-century synthesis. *BJMSP* 59(1), 1–34.
- Rousseeuw, P. (1987). Silhouettes. *J. Computational and Applied Mathematics* 20, 53–65; Kaufman, L. &
  Rousseeuw, P. (1990). *Finding Groups in Data*. Wiley.
- Caliński, T. & Harabasz, J. (1974). A dendrite method for cluster analysis. *Communications in Statistics* 3(1), 1–27.
- Tibshirani, R., Walther, G. & Hastie, T. (2001). Estimating the number of clusters via the gap statistic.
  *JRSS B* 63(2), 411–423.
- Hennig, C. (2007). Cluster-wise assessment of cluster stability. *Computational Statistics & Data Analysis* 52(1), 258–271.
- Monti, S., Tamayo, P., Mesirov, J. & Golub, T. (2003). Consensus clustering. *Machine Learning* 52, 91–118.
- Hubert, L. & Arabie, P. (1985). Comparing partitions. *Journal of Classification* 2, 193–218.
- Fleischmann, M. (2023). Clustergram: visualization and diagnostics for cluster analysis. *JOSS* 8(89), 5240.
- Chi, J., Chi, E. & Baraniuk, R. (2016). k-POD: a method for k-means clustering of missing data.
  *The American Statistician* 70(1), 91–99.
- van Buuren, S. & Groothuis-Oudshoorn, K. (2011). mice: multivariate imputation by chained equations in R. *JSS* 45(3).
- OECD & JRC (2008). *Handbook on Constructing Composite Indicators: Methodology and User Guide*. OECD Publishing.

**Country-level typologies (for benchmarking)**

- Inglehart, R. & Welzel, C. (2005). *Modernization, Cultural Change, and Democracy*. CUP; World Values Survey,
  Inglehart–Welzel cultural map: https://www.worldvaluessurvey.org/WVSContents.jsp
- House, R. et al. (2004). *Culture, Leadership, and Organizations: The GLOBE Study of 62 Societies*. SAGE.
- World Bank. World Development Indicators and income classifications: https://datatopics.worldbank.org/world-development-indicators/
