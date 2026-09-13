# Touch selection stability

The owner supplied an iPhone recording of build `353a842` showing Australia's
details appearing briefly and disappearing, with the map moving between states.
The Learn panel displays a hover preview while no selection is committed.
Map paths used mouse-enter/leave events, which touch browsers can synthesize
before click; opening that preview changes layout before the tap commits.

World, historical and subdivision map paths now use pointer-enter/leave events
and only preview for a mouse pointer. The subdivision small-area markers follow
the same rule. Touch and pen use the existing click selection; mouse previews,
territory-parent resolution, game confirmation, overlays and data stay intact.

The shared zoom hook also left a click-suppression listener after cancelled
drags or drags for which the browser produced no click. A cancelled gesture now
installs no listener, and starting the next gesture clears any pending listener.
A completed drag still suppresses its own accidental click.

Validation:

- `node scripts/check-map-pointer-selection.mjs`: actual map JSX handlers checked
  for mouse preview, no touch/pen preview, one selection per click, and no clearing
  on touch leave; actual zoom-hook handlers checked for cancelled drags, completed
  drags and the next deliberate tap. All passed.
- Production build passed; running dev server transformed all four modules.
- Full `npm run flags:check` passed without altering data or checks.
- Visual verification remains unavailable: supported browser returned
  `net::ERR_BLOCKED_BY_CLIENT` for the test site. The Chromium download had also
  failed in this environment. Tests above do not simulate Safari layout.
  Follow the repository's unavailable-browser exception and verify the deployed
  build; the owner's iPhone is still needed to confirm the observed interaction.
