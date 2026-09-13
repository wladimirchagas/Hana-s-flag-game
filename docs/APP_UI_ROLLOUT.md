# Approved atlas design — app-wide rollout

13 September 2026: owner approved the Learn redesign and authorized replacing
the current public website with the same visual direction across the app.

## Implementation and preservation

`AppAtlas.css` extends the approved typography, neutral surfaces, thin borders,
green interaction accent and light/dark themes across navigation, home, game
setup, gameplay, results, profiles, leaderboards, install help and dialogs.
Learn now defaults to the approved atlas variant. The former review URL remains
available. The calibration utility inherits the app font.

No features, data, assets, flag sizing, map geometry, geographic hierarchy,
selection handlers, quiz mechanics, scoring, feedback, audio, profile operations,
storage keys, Firebase configuration or deployment workflow are removed/changed.
Semantic correct/wrong, warning, dispute and type colours are retained.
All existing copy, carousel imagery and modes remain available. Modal stacking,
scrolling and input-blur behaviour are unchanged.

## Checks

- TypeScript/Vite/PWA production build: passed.
- Full `npm run flags:check` suite: passed, including CI gate coverage.
- Source-preservation check: every non-style JSX attribute (event handlers,
  values, accessibility and image keys) and all visible JSX text in changed
  components match the base. All data, assets, APIs, hooks, context, dependency
  files and deployment workflows are unchanged. `git diff --check` passes.
- The supervised development server starts successfully. Browser QA remains
  unavailable: the supported browser returns `net::ERR_BLOCKED_BY_CLIENT` for
  the preview; installing local Chromium also fails after download timeouts.
  No screenshot, mobile interaction or visual pass is claimed. Under the
  repository's documented unavailable-browser exception, complete non-visual
  checks and deploy with this caveat rather than withholding the approved work.
- After merging, run the mandatory live-build check. A merged commit alone is
  not proof of deployment. Record the result in the rollout PR and user handoff.
