# Country Personas — decision ledger

The record the playbook requires (step 15): every choice made while building Country Personas,
with the evidence behind it and the alternatives rejected, so a later reviewer can challenge it.

- **Method:** [`docs/COUNTRY_PERSONAS_PLAYBOOK.md`](COUNTRY_PERSONAS_PLAYBOOK.md).
- **Diagnostics:** [`docs/country-personas/BUILD_REPORT.md`](country-personas/BUILD_REPORT.md), auto-generated on every
  build.

Newest entries first.

---

## 2026-09-24 — Edition 2026, version 2: frozen and shipped

### D15. Results of the v2 build

- **30 personas, one level, zero members outside the boundary.** The rule fixed in advance
  (D14) asked for the most granular K with no boundary exceptions and reproducible personas: a
  median persona Jaccard of at least 0.60, with none at 0.50 or below. **No K from 10 to 30 met
  that bar.** Quick-stability medians ranged 0.43–0.63, and every K had a persona at 0.29 or
  below. So the pre-registered fallback applied: the most reproducible K among those with the
  fewest violators. That was **K = 30** (quick median 0.63).
- **Full stability (40 perturbed rebuilds):**
  - median persona Jaccard **0.59**;
  - median ARI **0.57**;
  - persona range: from **0.27** (15, a mixed persona of Cyprus, Georgia, Greece, Israel,
    Malaysia, Malta and Mauritius) to **0.90** (24).
  - The owner can ask for fewer, coarser personas. K = 17 had the best worst case (0.62 median,
    0.37 minimum) but lower homogeneity.
- **Homogeneity, the owner's complaint measured.** This is the share of measured variables on
  which **every** member sits within 1 world SD of its persona's median: **v1 types 37% → v2
  personas 65%**.
- **Benchmarks (ARI).** Continent 0.16, sub-region 0.27, World Bank income group 0.09, World
  Bank region 0.19, v1 groups 0.14. The personas are neither the map nor income bands redrawn.
- **Coverage.**
  - 194 placed. Of those, **10 are provisional**, placed on under 60% of the similarity weight:
    Antigua and Barbuda, Dominica, Saint Kitts and Nevis, Liechtenstein, Monaco, Marshall
    Islands, Nauru, Palau, San Marino and Tuvalu.
  - Vatican City is unclassified.
  - 88 are surveyed by the World Values Survey.

| Code | Persona | Countries | Stability |
|---|---|---:|---:|
| 01 | Tiny, Very Wealthy Democracies | 5 | 0.72 |
| 02 | High-Trust Secular Democracies | 8 | 0.55 |
| 03 | Prosperous Rule-of-Law Democracies | 10 | 0.46 |
| 04 | Small, Ageing High-Income Economies | 8 | 0.44 |
| 05 | Ageing Democracies, Sporting Heavyweights | 7 | 0.45 |
| 06 | Urban Liberal Democracies, Wide Income Gaps | 3 | 0.50 |
| 07 | Small Resource-Rich States | 3 | 0.42 |
| 08 | Fast-Growing Resource-Rich States | 4 | 0.71 |
| 09 | Small Democracies with Little Industry | 11 | 0.72 |
| 10 | Small Remittance-Reliant Democracies | 3 | 0.75 |
| 11 | Democracies with a Relatively Free Press | 4 | 0.61 |
| 12 | Small Resource-Rich Democracies | 3 | 0.70 |
| 13 | Small English-Speaking Service Democracies | 10 | 0.83 |
| 14 | Low-Inequality Societies, Mid-Ranking Democracy Scores | 9 | 0.54 |
| 15 | Very High Human-Development, Mid-Ranking Governance | 7 | 0.27 |
| 16 | Electoral Democracies, Stable Populations | 3 | 0.59 |
| 17 | Industry-Heavy Economies, Few Immigrants | 5 | 0.67 |
| 18 | Long-Independent States, Low Rule-of-Law Scores | 7 | 0.65 |
| 19 | Urbanised Spanish- and Portuguese-Speaking Societies | 10 | 0.59 |
| 20 | Low-Birth-Rate States, Below-Median Democracy Scores | 6 | 0.55 |
| 21 | Young Resource Economies, Low Freedom Scores | 5 | 0.76 |
| 22 | Traditional-Values Middle-Income Societies | 7 | 0.49 |
| 23 | Traditional-Values States, Low Freedom Scores | 11 | 0.68 |
| 24 | Conflict-Affected Low-Income States | 5 | 0.90 |
| 25 | Young Economies, Shorter Life Expectancy | 11 | 0.59 |
| 26 | Young Agrarian Economies | 8 | 0.67 |
| 27 | Very Young, Very Low-Income States | 4 | 0.40 |
| 28 | Very Young Rural States | 5 | 0.58 |
| 29 | Young, Steadily Growing States | 7 | 0.59 |
| 30 | Sparsely Populated Young Economies | 5 | 0.53 |

The owner's two examples, now:
- **Brazil** is in 19. Its description quotes fertility of **1.4–2.4 children per woman**, a
  range that contains Brazil's 1.6. There is no average.
- **Malaysia** is in 15. No population figure is quoted for 15, because its members' populations
  are too far apart to be quotable.

### D16. Frozen and shipped; how the copy was checked

- **Approval basis, recorded honestly.** The owner set the brief (D9) and has a standing
  instruction to merge without waiting for confirmation. The names and descriptions were drafted
  by Claude against that brief and have **not** been individually approved by the owner. The
  owner can revise any of them. That is a copy revision: the partition is untouched. The frozen
  files record this in `approval.basis`.
  - model frozen from `country-personas-model.draft.json`, sha256 `06746df7…`;
  - copy frozen from `country-persona-portraits.draft.json`, sha256 `54487a3e…`.
- **Every plain-text claim now carries a checking token.** When the first drafts were rendered
  under the new checks, they caught **17 problems**. Each was rewritten, never forced:
  - "Low-income" for 28 and 29: Comoros, Benin, Côte d'Ivoire, Guinea and Senegal are lower-middle
    income.
  - "Middle-income" for 11, 14 and 19: Seychelles, Romania and Panama are high income.
  - "Lower-middle-income" for 22: Indonesia and the Philippines are upper-middle.
  - "Lower-income" for 25: not a World Bank group, so it cannot be checked.
  - Eight figures that some members lack; each sentence now says "where reported" or "where
    surveyed".
- **Checking world positions caught four more:**
  - "Resource-dependent" for 25: Eswatini, Rwanda, Malawi and Lesotho have 3–4% resource rents.
    Renamed "Young Economies, Shorter Life Expectancy".
  - "Trade-heavy" for 17: Laos sits at the world's 45th percentile. Renamed "Industry-Heavy
    Economies, Few Immigrants".
  - "Low crime" for 14: one member is above the world median.
  - "Low liberal-democracy" for 20: Ukraine sits at the 46th percentile. Now "below the world
    median".
- **Language claims checked against current reality, not only the data.**
  - Dropped "French is an official language" for 28. Mali (2023), Burkina Faso (2023) and Niger
    (2025) made French a working language only.
  - Dropped "Russian is an official language" for 21. It is not official in Turkmenistan or
    Uzbekistan, although the bundled language data lists it.
- **Religion.** Religion is not quoted anywhere:
  - no Pew share appears in any description;
  - "Devout" names became the World Values Survey's own term, "Traditional-Values", used at both
    ends of that scale (02 "Secular", 22/23 "Traditional-Values").
  - Three descriptions quote the survey's importance-of-God score as one attitude among others.
- **Colours.**
  - 30 categorical colours with a minimum pairwise ΔE2000 of 13.4.
  - Assigned by `assign-colors.mjs` so that personas sharing a land border, or neighbouring on the
    persona map, differ by at least ΔE2000 21.3 (309 land borders).
- **Borderline.**
  - "Also close to …" shows below a confidence of 0.05: 51 of 194 countries.
  - v1 used 0.1; at 30 personas that flagged 85 (44%), too many to be informative.
- **UI.**
  - One Group-by mode, "By country persona". A stored v1 two-level choice migrates to it.
  - The map legend is a compact grid of 30 personas.
  - The fact-sheet badge's tooltip lists the four key ranges under "Every member country falls
    within these ranges (they are not averages)".
  - The v1 family tree is replaced by the persona map. Hover fades other personas; the legend
    highlights a persona's dots.

---

## 2026-09-24 — Build v2 (research)

### D9. The owner's feedback on v1

The owner did not accept the v1 personas and asked for a rebuild. Their points, in order:

1. **Averages that misdescribe members.** Malaysia's v1 group (C09) claimed its countries
   "average 180m people" (China and India skewed the mean; Malaysia has 34m). Brazil's group
   (A04) claimed fertility of 1.21 (Brazil's is 1.6). The fix they asked for: *"stricter
   boundaries (e.g., no more than 1 standard deviation from the median)"*.
2. **Use more of the indices and the World Values Survey** so that countries with similar
   attitudes and scores are closer, in addition to the factual statistics v1 prioritised.
3. **Blend in culture and heritage:** religion, official languages, regional organisations.
4. **One level of personas.** First "20–30", then clarified: 30 is a ceiling, 10 a floor.
5. **Religion must be "one of many variables"**; do not over-index on it.

### D10. New inputs (PR #1699)

- **Religion.** 2020 shares from Pew Research Center, *How the Global Religious Landscape
  Changed From 2010 to 2020* (June 2025), bundled verbatim and checked by sha256. Coverage is
  183 of 195; the 12 microstates Pew does not cover stay missing.
- **Official languages.** Seven flags from the bundled `COUNTRY_FACTS`: English, French, Arabic,
  Spanish, Portuguese, Russian and German (each official in 5 or more states).

### D11. Attitudes are compared only where surveyed — never imputed

The World Values Survey covers 88 of the 195 states. I tested whether the attitudes of the
other 107 could be estimated from everything else (10-fold cross-validated ridge regression on
all other indicators):

| Inglehart–Welzel dimension | CV R² | Median abs. error | 90th percentile error |
|---|---:|---:|---:|
| Traditional → secular-rational | 0.67 | 0.43 SD | 0.95 SD |
| Survival → self-expression | 0.63 | 0.38 SD | 0.97 SD |

An error of up to a full standard deviation is as large as the owner's whole tolerance. So
v2 imputes nothing. Two countries are compared on the indicators **both** have (a partial,
Gower-style distance), and attitudes count only between surveyed countries.

### D12. A 1-SD boundary on every dimension needs about 50 personas — so the boundary sits on four core dimensions

**Measured on the snapshot.**

- **Plain clustering does not meet the rule.** Ordinary clustering into 25 personas leaves
  **73 of 195 countries (37%)** more than 1 SD from their persona's median on at least one of
  12 dimensions. That is the owner's complaint, measured.
- **The rule on all 11 candidate dimensions is too strict for a persona count of 30 or fewer.**
  Those dimensions were development, demography, democracy, integrity, peace, the two attitude
  dimensions, and four religion shares. An exact set-partition solver over about 5,000 feasible
  candidates needed:
  - at 1 SD: **50 personas, 18 of them single countries**;
  - at 1.5 SD: 37 personas, 12 of them single countries.

  A one-country persona describes a country, not a persona.
- **With a fixed 20 personas** (at least 3 countries each), the countries left outside the rule
  numbered:
  - 31 with all 11 dimensions;
  - 15 with 8;
  - 2 with 5.

  The blocking dimensions were mostly the religion shares and peace.

**Decision.** The hard boundary covers four **core** dimensions, one headline axis per pillar
that has one:

- development;
- demography;
- governance (democracy and integrity together);
- values (the two attitude dimensions together, surveyed countries only).

Every other variable is governed by the **quotable** rule instead (D14).

### D13. Religion is out of the boundary, and weights are calibrated so no domain dominates

- **Religion took up 40% of the first boundary.** An intermediate design put the Christian and
  Muslim shares in the boundary: 2 of its 5 dimensions. The owner then asked not to over-index
  on religion, so it was removed from the boundary entirely.
- **Religion also dominated the similarity itself.** I measured each domain's influence as the
  change in the similarity when that domain is left out, as a share of the total. The shares
  under equal pillar weights:

| Domain | Nominal weight | Influence share |
|---|---:|---:|
| Size (population) | 5.0% | **16.0%** |
| Religion | 8.3% | **15.2%** |
| Global reputation (soft power) | 5.0% | 10.4% |
| Official languages | 8.3% | 9.4% |
| Regional organisations | 8.3% | 7.8% |
| … | … | … |
| Each attitude dimension | 12.5% | 3.1% |

Religion and size separate countries in a sharp, near-categorical way that no other domain
duplicates. So a small nominal weight still bought an outsized say.

**Decision: calibrate.** Weights start equal by pillar. Any domain whose influence share
exceeds 1/15 (6.7%) is then damped and the weights renormalised, repeating until none does.
It converged in 7 iterations, with every domain at 6.9% or less:

- religion: 8.3% → **5.0%**;
- size: 5.0% → 2.5%;
- soft power: 5.0% → 3.2%;
- each attitude dimension: 12.5% → 16.9%.

**Resulting pillar weights.** The owner's emphasis on scores and attitudes is kept:

| Pillar | Weight |
|---|---:|
| Facts | 23% |
| Index scores | 25% |
| Attitudes | 34% |
| Heritage | 18% |

The calibrated similarity correlates 0.986 with the uncalibrated one: a correction, not a
different model.

### D14. Search, persona count and descriptions

- **Search.** Constrained iterated local search on the calibrated similarity, for every K from
  10 to 30. The objective, in order:
  - first, members outside the boundary, at a weight of 20 distance units each;
  - second, the sum of distances to each persona's medoid.

  Every persona has at least 3 countries. Each K starts from average-linkage, Ward and k-medoids
  solutions and keeps the best.
- **Sweep result.** Every K from 10 to 30 reaches **zero** members outside the boundary except
  K = 12 (one). Silhouettes are low everywhere (0.10–0.14): countries form a continuum, not
  islands.
- **Choosing K.** The rule was fixed before the results were seen: the most granular K with no
  boundary exceptions whose personas are reproducible. "Reproducible" follows Hennig (2007): a
  median persona Jaccard of at least 0.60 across perturbed rebuilds, and no persona at 0.50 or
  below ("dissolved"). The perturbations re-weight domains, leave one domain out, or resample
  indicators.
- **Descriptions.** Figures are template tokens rendered from the data
  (`scripts/lib/personaText.mjs`), as medians and member ranges and never means. A figure is
  **quotable** only if every member lies within 1 world SD of the persona's median on it. So a
  description can no longer quote a figure that misdescribes a member, which was the owner's
  complaint.

---

## 2026-09-24 — UI surfaces shipped (edition 2026)

The four approved surfaces are built. Every one reads `src/data/countryPersonas.ts`, which
`scripts/build-country-personas.mjs` re-scores from the frozen model. If the re-score differs
from any frozen assignment, the build fails.

- **Flag grid, Group by:** "By country persona" (5 group headings) and "By persona type"
  (12 type headings). These modes appear on today's map only. Each heading has an ⓘ tooltip.
  Vatican City, the one unclassified state, gets its own "Not classified" heading.
- **Map colour mode:** "Country personas, 2026" sits in the index menu under its own
  "Country personas" heading, separate from the indexes.
  - Colours use the Okabe–Ito categorical palette, because personas are unordered and must not
    borrow the index green→red scale.
  - The legend says "Letters are labels, not ranks", and every legend entry carries the group
    tooltip.
  - The hover tooltip names the group and, when the group has several types, the type.
- **Fact-sheet row:** a "Country persona" row sits after Region. It shows the group badge, plus
  a type badge when the group has more than one type.
  - A country with confidence below 0.1 (D7) also says which group it borders.
  - Vatican City reads "Not classified", and its tooltip explains why.
- **Family tree:** a "See country personas map" accordion under the index chart.
  - It plots 194 countries on the first two principal components (42% and 26% of the
    variation), coloured by group.
  - Each type's centre is labelled.
  - Hovering a dot previews the country in the panel; clicking or tapping selects it.
  - Legends underneath carry every group and type tooltip.
- **Tooltips:** they open on hover and on focus or tap, using CSS `:hover` / `:focus-within`,
  like the membership badges.
  - Every tooltip ends with the averages note: a persona describes national averages, not people.
  - A small layout-only nudge keeps a tooltip inside the screen. Without it, a badge near the
    right edge of a 390px phone pushed the page into horizontal scroll (measured 469px wide
    before the fix, 390px after).

---

## 2026-09-24 — Owner approval; edition 2026 frozen

The owner reviewed `docs/country-personas/PERSONAS_DRAFT.md` and approved four points:

- **Structure:** 5 groups and 12 types, with the three failing acceptance criteria recorded (D7).
- **Names and portraits:** approved as drafted.
- **E12's name:** keep the score-based name, "Agrarian Countries, Lowest Freedom Scores". It
  describes the published index scores and names Freedom House 2026 in its line.
- **Where personas appear:** all four surfaces, each with tooltips explaining every group and
  type:
  - the flag grid's Group by;
  - the map colour mode;
  - a fact-sheet row;
  - a family-tree chart.

**Freezing.** The approved drafts were promoted to frozen files; each records the sha256 of the
draft it came from.

- `scripts/data/country-personas-model.draft.json` → `scripts/data/country-personas-model.json`
- `scripts/data/country-persona-portraits.draft.json` → `scripts/data/country-persona-portraits.json`

**What happens to the drafts.** From here on, `build.py` still writes to the `.draft.json` files.
A rebuild never touches the frozen model: a new edition needs a new owner review and promotion
(playbook step 16).

---

## 2026-09-24 — Build v1 (draft, awaiting owner review)

### D1. Inputs: a single dated snapshot, with World Bank indicators added (Phase 0)

`scripts/build-country-persona-inputs.mjs` → `scripts/data/country-persona-inputs.json`. It holds
195 countries × 123 variables, each value with its year and each variable with its source.

- **Where the data comes from.**
  - It adds 29 World Bank World Development Indicators series, keeping each country's latest
    value from 2015 onwards. The Phase-0 gap the playbook identified (C3: no age structure, no
    urbanisation) is closed: 187–194 of 195 countries are covered.
  - The Vatican is absent from the World Bank's data.
- **Three series fail as build inputs.**

  | Series | Coverage | Problem |
  |---|---|---|
  | Homicides | 151 | below the 85% coverage gate |
  | Largest-city share | 150 | below the 85% coverage gate |
  | Tourist arrivals | 180 | mostly 2020, a COVID year that is not representative |

  All three stay as descriptors.

### D2. The first design (nine domains) failed the acceptance criteria — rejected

The first build used nine domains:

- prosperity and connectivity;
- political freedom;
- institutional integrity;
- age structure relative to prosperity;
- urban and service-based economy;
- natural-resource dependence;
- international migrants;
- scale and global reach;
- women in the workforce.

It produced 6 groups and 16 types.

**Results against the playbook's acceptance criteria (E3):**

| Criterion | Result |
|---|---|
| Group bootstrap Jaccard | 0.54–0.74 (target ≥ 0.75) |
| Types with Jaccard ≥ 0.60 | 31% (target ≥ 80%) |
| Weight sensitivity (Dirichlet), groups ARI | 0.46 (target ≥ 0.70) |
| Leave-one-variable-out, groups ARI | down to 0.44 (target ≥ 0.80) |
| Group sizes | 8–51 (target 10–45) |
| Average silhouette | 0.22 (groups), 0.17 (types) |

The comparison baseline was high: plain k-means against the final model agreed at ARI 0.94 for
groups. So the instability is real, not an artifact of the measurement method.

**Diagnosis.** Several domains were almost uncorrelated with every other domain:

- age structure, once residualised on prosperity (|r| ≤ 0.25 with the rest);
- women in the workforce (≤ 0.27);
- scale (≤ 0.26).

With about seven near-independent dimensions for 195 countries, the data is a continuous cloud.
Any 16-way partition of it is partly arbitrary: small reweightings move many borders. This is
the playbook's own warning from the pilot (C2.5), made worse by adding dimensions.

### D3. Seven alternative designs were compared on the same stability measures

Measures: mean bootstrap Jaccard (50 resamples), median ARI under reweighting (Dirichlet, weight
CV ≈ 27%), and silhouette, for k = 4–12 groups.

| Design | Best k | Min Jaccard | Groups ≥ 0.75 | Reweighting ARI | Silhouette |
|---|---|---|---|---|---|
| Nine domains (baseline) | 6 | 0.57 | 2 of 6 | 0.67 | 0.24 |
| Eight (drop women in work) | 5 | 0.62 | 3 of 5 | 0.73 | 0.24 |
| Seven (merge freedom + integrity; drop women in work) | 5 | 0.65 | 3 of 5 | 0.63 | 0.24 |
| Six (also merge prosperity + urban/services) | 5 | 0.61 | 3 of 5 | 0.61 | 0.23 |
| Five (as six, drop migrants) | 5 | 0.70 | 4 of 5 | 0.55 | 0.26 |
| **Four: development, governance, age structure, scale** | **5** | **0.79** | **5 of 5** | 0.59 (0.84 at weight CV ≈ 14%) | **0.29** |
| Five without scale | 6 | 0.62 | 3 of 6 | 0.54 | 0.25 |

**No design gave stable types at 10–27 clusters.** At country level the data supports about five
stable groups, not the 6–8 groups and 18–24 types the playbook targeted (E2).

### D4. Chosen: four core domains, top-down

| Domain | Indicators | Why |
|---|---|---|
| Development | log GDP per capita (PPP, current-US$ fallback), HDI, % internet users, % urban, agriculture share of GDP (−), services share of GDP (+) | Prosperity and urban/service economy correlate 0.80: one latent axis, the Mosaic Global "affluence" and "urban↔rural" axes combined |
| Governance | Freedom House, V-Dem, Economist, RSF, CPI, WJP | Freedom and integrity correlate 0.79: one axis |
| Age structure relative to development | % aged 65+, % aged 0–14 (−), fertility (−), life expectancy, population growth (−), taken as a residual on development | Raw age structure correlates 0.87 with development (above the 0.81 gate). The residual keeps the real exceptions, such as wealthy but young Gulf states and middle-income but old Eastern Europe |
| Scale and global reach | log population, log Soft Power | An independent axis, and the one that separates small states |

Weights are 1 for all four. Scale at 0.5 was tested, as the playbook asks (E1). It made things
worse: the minimum group Jaccard fell to 0.62, two groups fell below 0.75, and Liechtenstein and
Monaco-type states split away from the other small states. So scale stays at weight 1.

**Dropped from the build, kept as descriptors:**

- natural-resource dependence;
- international migrants;
- women in the workforce.

They appear in the Grand Index key features. For example, the Gulf states' very high migrant
share is still reported; it just does not define the group.

**Hierarchy is top-down** (the ONS/OAC method), not Mosaic's bottom-up. Bottom-up types were
never stable, so they cannot be the foundation. Groups come first. A group is split into 2–4
types only when every resulting type reaches a within-group bootstrap Jaccard ≥ 0.60 with at
least 4 members, otherwise it stays a single type. This is the clustergram-style per-group
splitting that the 2021 OAC used.

**Scoring is hierarchical nearest-centroid:** nearest group centroid, then the nearest type
centroid inside that group. The build checks that this rule reproduces every built country's
assignment exactly, so the Node scorer that ships later can apply the frozen model and get the
same answer.

### D5. The "small states" group is real, not a missing-data artefact

The pilot (playbook C2.7) produced a microstate cluster whose members had, on average, 41% of
their inputs imputed. It was an artefact. The same-looking group in this build is different:

- **It is earned from observed data.** Population and Soft Power are observed for every member.
  No built country has any domain imputed: within-domain averaging covers every item-level gap.
  Only the Vatican lacks whole domains; it observes a single domain and is **Unclassified**.
- **Imputation doesn't move it.** Every one of the 20 imputations gives the same modal type
  (imputation agreement 100%).
- **It matches an established category.** "Small states" is used by the World Bank and the
  Commonwealth.

### D6. Key features exclude geography-in-disguise and the app's own catalogue counts

The first profiles featured "Member of CARICOM" and "Member of the African Union" (geography
under another name) and "Public broadcasters listed" (a count of the app's own curation, not a
fact about the country). The playbook bars geography from key features and treats curation
counts as descriptors only.

- **The rule.** An organisation is a *geographic label* when at least 80% of its members are on
  one continent. That is measured from `countryBlocks.ts`, not decided by hand. `count_*`
  variables are never featured.
- **What it removes.** It excludes the EU, ASEAN, Mercosur, the Gulf Cooperation Council, the
  African Union, CARICOM and NATO.
- **What it keeps.** Cross-continental clubs stay eligible: the OECD, OPEC, BRICS, the G20 and
  the Commonwealth.
- **Nothing is lost.** Every excluded row stays in the full Grand Index profile.

### D7. Results of the chosen design (build v1)

- **Who is placed.** 194 countries are built, none is provisional, and 1 is unclassified (the
  Vatican).
- **Structure.** 5 groups hold 35–42 countries each. The 12 types break down as:

  | Group | Types | How the split was decided |
  |---|---|---|
  | A | 4 | split was stable |
  | B | 3 | split was stable |
  | C | 2 | split was stable |
  | D | 1 | no stable split, so it stays whole |
  | E | 2 | split was stable |

| Criterion (playbook E3) | Result |
|---|---|
| Group sizes 10–45 | PASS (35–42) |
| Type size ≥ 4 | PASS (min 6) |
| Every group Jaccard ≥ 0.75 | PASS (0.76–0.87) |
| Types Jaccard ≥ 0.60 | PASS (100%; min 0.64) |
| Imputation agreement ≥ 90% | PASS (100%) |
| Scoring reproduces every assignment | PASS (0 mismatches) |
| Consensus vs direct k-means ARI ≥ 0.60 | PASS (0.91) |
| Reweighting ARI ≥ 0.70 at weight CV ≈ 27% | **FAIL (0.60)**; 0.83 at CV ≈ 14% |
| Leave-one-variable-out ARI ≥ 0.80 | **FAIL (min 0.73: % urban; 0.76: population)** |
| Beats the permutation null on ≥ 90% of trailers | **FAIL (84% of 49)** |
| Silhouette (not gated) | groups 0.29, types 0.18 |

**The three failures, read honestly:**

- **Validation.** On the variables held out of the build, persona groups explain more variance
  than either continent or World Bank income group: median η² 0.30 for the groups, 0.21 for
  continent, 0.17 for income group. The 8 trailers they do not beat the null on are largely
  unrelated to national character:
  - newspapers listed;
  - population density;
  - military spending;
  - the terrorism index;
  - the happiness share from the World Values Survey;
  - the effective number of parties;
  - the diplomacy index, with 64 countries;
  - women in the workforce.
- **Leave-one-variable-out.** It misses narrowly, and on the two variables that carry the most
  weight within their domains.
- **Reweighting.** See D8.

**Agreement with existing typologies (ARI)** is moderate, which is the intended outcome: the
personas are neither the map nor income bands redrawn.

| Typology | ARI |
|---|---|
| Continent | 0.19 |
| Sub-region | 0.12 |
| World Bank income group | 0.26 |
| Freedom House status | 0.25 |

### D8. Known limits, carried to the owner review

- **Reweighting sensitivity at ±27% fails the playbook's 0.70 target.** At ±14% the groups
  hold (ARI about 0.8). Borders between groups depend on how much weight each axis gets, as
  expected for a continuum. Per-country confidence and a second-choice group are stored for
  exactly this reason.
- **The structure is coarser than the playbook planned:** 5 groups and about 13 types, not
  6–8 and 18–24. This is the evidence-based answer, not a shortcut. The playbook's targets
  were written before the data was measured.
- **Names and pen portraits are not written.** They follow the Grand Index and the owner's
  review (step 12). Nothing in `src/` reads this build yet.
