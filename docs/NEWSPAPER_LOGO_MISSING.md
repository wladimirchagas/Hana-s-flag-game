# Newspaper & agency logos still missing

**Status:** standing backlog, paused 2026-09-21 (owner direction: stop the harvest for now).  
**Counts at pause:** 36 newspapers + 1 news agency still have `noImageReason` and no bundled logo (901 of 937 newspapers already have a logo).

Each entry below is already listed in Learn mode with an honest empty tile (`noImageReason`). Do **not** invent or approximate a masthead. Resume only with a reputable, visually verified source (publisher site / Wayback / Commons / official PDF), montage-scanned light/dark, one batch per PR.

## Known traps from this sweep (do not re-ship)

| Temptation | Why it was rejected |
|------------|---------------------|
| `nation.sc` logo for **Le Seychellois** | Wrong brand — that is *Seychelles Nation* |
| `libertas.sm` logo for **La Serenissima** | Wrong brand — that is *Libertas* |
| `palauwave.com` logo for **Palau Wave Weekly** | Japanese surf-tour site, not the paper |
| `vanuatutimes.com` | Hostao SEO content farm |
| `PINA` / association marks for individual papers | Association logo ≠ newspaper masthead |
| `MOI` seal for **Myanmar News Agency (MNA)** | Ministry seal ≠ MNA agency emblem |
| `rysgalbank.com.tm` mark for **Rysgal** | Bank logo ≠ newspaper masthead |
| Pure Grenada tourism nutmeg mark for **Pure Grenada News** | Already shipped as tourism brand (`gd-pure-grenada`); not a news masthead |
| Mwinen Ko Facebook supermarket photo crop | Real paper, but asset too blurry/incomplete to ship |
| Cabo Verde **Jornal i** vs Portugal *Jornal i* | Name collision — only trust Cabo Verde–specific sources |

## Newspapers (36)

| ID | Country | Title | Notes / last known lead |
|----|---------|-------|-------------------------|
| `ag-antigua-times` | Antigua and Barbuda | Antigua Times | No live publisher site found; Wikipedia media stub only |
| `cf-le-democrate` | Central African Republic | Le Démocrate | Domain parks at OVH; Wayback has no real masthead |
| `cf-l-expansion` | Central African Republic | L'Expansion | No reachable publisher masthead |
| `cv-jornal-i` | Cabo Verde | Jornal i | Facebook-only lead; guard against Portugal *Jornal i* collision |
| `dj-djib-post` | Djibouti | Djib-Post | Live/Wayback site is a bare GoDaddy template; no usable brand mark |
| `er-haddas-eritrea` | Eritrea | Haddas Eritrea | Shabait category pages; Cloudflare/egress blocked harvest |
| `er-eritrea-profile` | Eritrea | Eritrea Profile | Same Shabait path |
| `er-eritrean-digest` | Eritrea | Eritrean Digest | Domain unreachable during harvest |
| `ga-infogabon` | Gabon | Info Gabon | Domain unreachable during harvest |
| `gd-the-grenada-guardian` | Grenada | The Grenada Guardian | Historical (Gairy-era); no digitised masthead found |
| `gd-pure-grenada-news` | Grenada | Pure Grenada News | Site is tourism portal; nutmeg logo is tourism brand, not news |
| `gw-n-pinti` | Guinea-Bissau | N'Pinti | No clean publisher mark found |
| `gw-guinendade` | Guinea-Bissau | Guinendade | Domain dead / thin Wayback |
| `gw-bissau-weekly` | Guinea-Bissau | Bissau Weekly | Domain unreachable |
| `ki-te-uai` | Kiribati | Te Uekera | BPA / island media; no clean bundled mark yet |
| `ki-kiribati-independent` | Kiribati | Kiribati Independent | PMC/PINA references only |
| `ki-te-mauriai` | Kiribati | Te Mauriai | Wikipedia media stub only |
| `ki-te-kaekae` | Kiribati | Te Kaekae | PINA references; no paper-owned mark |
| `km-mwali-info` | Comoros | Mwali Info | No publisher site with a masthead |
| `ls-informative` | Lesotho | Informative | Sourced via Lena Reporter; site unreachable |
| `mc-monacolive` | Monaco | Monaco Live | Domain unreachable / Cloudflare during harvest |
| `nr-mwinen-ko` | Nauru | Mwinen Ko | Design known (wordmark + bird seal) but no clean digital asset; FB crop rejected |
| `nr-nauru-chronicle` | Nauru | The Nauru Chronicle | PINA/wiki only |
| `nr-central-star-news` | Nauru | Central Star News | No clean mark found |
| `pw-belau-national-gazette` | Palau | Belau National Gazette | Museum site thin; no gazette masthead extracted |
| `pw-island-times-digital` | Palau | Palau Wave Weekly | Do not use palauwave.com (surf brand) |
| `sc-le-seychellois` | Seychelles | Le Seychellois | Historic title; do not use *Nation* logo |
| `sm-la-serenissima` | San Marino | La Serenissima | Do not use *Libertas* logo |
| `tm-rysgal` | Turkmenistan | Rysgal | Do not use Rysgal Bank logo |
| `tm-turkmenistan-gazeti` | Turkmenistan | Turkmenistan Gazeti | `turkmenmetbugat.gov.tm` returned 403 |
| `tv-tuvalu-media-dept` | Tuvalu | Tuvalu Media Department (TMD) | Sibling *Fenui News* logo shipped; TMD itself still blank |
| `tv-tuvalu-echoes` | Tuvalu | Tuvalu Echoes | Wikidata item exists; no P154 / Commons file |
| `tv-tuvalu-paradise` | Tuvalu | Tuvalu Paradise News | Wiki/PINA only |
| `tv-tuvalu-national-portal` | Tuvalu | Tuvalu News Portal | gov.tv; no distinct news masthead |
| `vu-daily-buzz` | Vanuatu | Daily Buzz Vanuatu | No reputable mark found |
| `vu-vanuatu-times` | Vanuatu | Vanuatu Times | Do not use vanuatutimes.com content-farm site |

## News agencies (1)

| ID | Country | Title | Notes / last known lead |
|----|---------|-------|-------------------------|
| `mm-mna` | Myanmar | Myanmar News Agency (MNA) | Do not use MOI ministry seal; need MNA’s own emblem |

## How to resume later

1. Pick one ID from the tables above.
2. Source a publisher-owned masthead (or Commons / dated Wayback / official PDF page image).
3. Montage-scan light and dark; reject wrong brands and letterboxed photos.
4. Install via `scripts/install-harvested-logos.mjs`, one batch per PR, then `npm run flags:check:newspapers`.
5. Update this file in the same change (strike through or remove rows that ship).

O Globo UI readability is tracked separately (official azul blue-bar PNG), not as a “missing” row.
