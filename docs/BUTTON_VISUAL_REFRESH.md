# Approved utility-button refresh

This presentation-only change extends the approved atlas design with a shared
20px outline SVG icon component. Utility emoji are replaced in navigation,
theme/sound/share controls, map tools, capitals and flag layers, settings,
list actions, audio playback, enlargement and dialog dismissal. Actual flags,
party logos, mascot artwork, celebration artwork and learned-flag badges remain.

`ButtonControls.css` loads after both atlas stylesheets. Buttons have a 44px
minimum height; utility icons have 44px targets, consistent borders, focus,
pressed and selected states. The mobile header can wrap its game clock; map
controls retain their existing overflow menu and wrapping. No controls are removed.

Validation against base `4b3d368`:

- Production TypeScript/Vite build passed.
- Full `npm run flags:check` passed without changing any gates or data.
- Running Vite dev server transformed all 37 changed modules/styles.
- AST comparison across 34 existing components confirmed 176 buttons and 946
  checked event, accessibility, state, navigation and image properties unchanged.
- `git diff --check` passed.

Visual verification gap: the supported cloud browser cannot open the supervised
test site (`net::ERR_BLOCKED_BY_CLIENT`). Chromium installation also failed after
download timeouts. Desktop/mobile rendered appearance and interaction could not
be visually confirmed in this environment. Per CLAUDE.md's unavailable-browser
exception, complete the nonvisual checks, disclose this gap in the PR, merge the
owner-approved work, and verify the actual live build after deployment.
