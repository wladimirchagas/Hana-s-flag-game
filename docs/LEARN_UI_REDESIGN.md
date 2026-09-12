# Learn UI review — 12 September 2026

Owner request: a complete visual refresh of Learn, national and subnational,
with no loss of features, data or functionality. Final approval is required
before merging. Branch: `design/learn-atlas-review`.

## Scope and coordination

This branch changes presentation only through `src/pages/LearnAtlas.css` and
its import in LearnPage. `.openai/hosting.json` registers the isolated review
deployment; production GitHub Pages configuration is unchanged. Other agents can continue data audits independently.
Do not merge this branch before the owner approves the visual review.
No data, map geometry, source assets, business rules, handlers, navigation,
storage keys, feature gates or dependencies are changed.

Direction: a restrained atlas/reference interface, system typography, neutral
surfaces, fine dividers, green interaction accent, clear selected/focus states.
Both light and dark themes apply only while Learn is mounted. Semantic map,
dispute, party and subdivision-type colours remain distinct.

## Preservation inventory

- National map, historical eras, zoom/pan, globe/view settings, flags/capitals.
- Search, country/subdivision selection, share links and breadcrumbs.
- All country facts, flag images and proportions, zoom, sourced meanings,
  myth distinctions, anthems/lyrics and list membership.
- National symbols, subnational and city grids, hierarchy table/chart,
  political parties and every conditional badge/attribution/detail panel.
- Existing filters, grouping, ordering, counts and persistent preferences.
- Overseas/disputed geography, all-subdivision initial map extent,
  decorative non-interactive city overlays and whole-word AutoFitName labels.
- Home, profile, refresh/build footer, mute and theme controls.

## Verification

- Production build: passed (TypeScript + Vite + PWA); final build includes the
  same public Firebase client configuration already shipped in production.
- `npm run flags:check`: passed, including national symbols, political parties,
  image keys, hierarchy colours, geometry, proportions and CI coverage.
- Source preservation: LearnPage is byte-identical to the base after removing
  the new stylesheet import. All data, APIs, hooks, libraries and public assets
  are unchanged. `git diff --check` passes.
- Visual QA BLOCKED: supervised preview starts, but the supported cloud browser
  rejects its address with `net::ERR_BLOCKED_BY_CLIENT`. Local Chromium download
  also fails. No desktop/mobile screenshots or interaction pass is claimed.
  The repository's documented unavailable-browser exception permits a review
  push with this caveat. The owner's explicit review-first request prevents merge.
- Before approval: check national and subnational views at phone/tablet/desktop
  widths in both themes; search/picker overlays, all facts, map layer toggles,
  long names, all five drilldown tabs, anthem and flag zoom dialogs, list/profile
  operations and sharing. This visual/interaction validation remains outstanding.

## Review deployment

Separate private Sites deployment, with complete bundled assets and the same
public Firebase client identifiers. The original GitHub Pages site is untouched.
A separate origin has separate browser-local preferences/profile selection;
existing stored data has not been migrated or deleted. Cross-origin profile
connectivity still needs interactive validation. No production merge is authorized
until the owner approves. Do not call this visually verified or fully accepted.


## Deployment blocker — handoff

The separate review source was pushed successfully. Its validated archive contains
all 6,397 build files (about 363 MiB compressed), with none missing. Two native
Sites `save_site_version` attempts failed with `failed to serialize JavaScript
value: expected value at line 1 column 1`. Version reconciliation after each failure
returned an empty list: no saved version, no deployment, and no working review URL.
Do not claim the private site is published. The failure cause is not established;
there is no evidence that removing assets would solve it, and that would violate
the preservation requirement. Continue from draft PR #1373 and the same registered
review project if hosting recovers; do not create a duplicate site. Alternatively,
confirm the repository's intended branch-preview hosting path with the owner.
