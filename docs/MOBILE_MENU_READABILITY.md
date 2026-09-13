# Mobile menu containment and contrast

The owner's iPhone screenshot showed the Period menu extending past the screen's
right edge and a pale caption on the yellow selected row. The menu's absolute
`left: 0` anchor assumed space to the right of its trigger, which is untrue in the
wrapped mobile map toolbar. The selected caption inherited the dark theme's pale
secondary text while the selected background remained yellow.

EraPicker and MapViewControl now share measured viewport bounds. Panels clamp
their width and horizontal position to the visible viewport, choose available
space above/below the trigger, stop above the fixed bottom navigation and scroll
internally. Position updates on scrolling, resizing and visual-viewport changes.
DOM nesting stays intact, preserving outside-click, Escape and nested overflow
menu behaviour. Every era, caption, preset, slider and checkbox remains.

The era menu uses atlas selection colours and an explicit caption colour, with
theme-specific text on the NOW badge. Other mobile menus reviewed: the toolbar
overflow is already right-aligned with a bounded width; country/subdivision and
profile pickers use screen overlays; map confirmation popovers clamp their
positions. The unbounded era menu and map-view popover receive the shared fix.

Validation:

- `npm run test:ui` is now part of `npm run build`, so the existing CI/deployment
  build runs both UI regression suites automatically.
- 1,008 geometry cases cover both menu widths, 160–1024px viewports, portrait,
  landscape, zoom offsets and triggers near every screen edge.
- Actual menu colour declarations and theme values pass 4.5:1 text contrast for
  normal captions, selected labels/captions and the NOW badge in both themes.
- Existing map pointer-selection regression suite passes.
- Production build, full `flags:check`, changed-module dev-server transforms and
  `git diff --check` pass. No data or selection logic changed.

Rendered-browser gap: the supported browser still returns
`net::ERR_BLOCKED_BY_CLIENT` for the supervised test site; Chromium installation
previously failed. Geometry/contrast tests are not a claim of visual Safari QA.
Apply CLAUDE.md's unavailable-browser exception and verify the deployed build.
