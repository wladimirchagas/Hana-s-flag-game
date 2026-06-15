#!/bin/bash
# SessionStart hook for Claude Code on the web.
#
# Installs the JS dependencies and a headless Chromium so that the repo's
# mandatory in-app visual verification (see CLAUDE.md) can actually be
# performed in remote sessions — where the container is cloned fresh and
# nothing is installed by default.
#
# Synchronous mode: the session waits until this finishes, guaranteeing deps
# are ready before the agent runs tests/linters or drives the app. Switch to
# async (echo '{"async": true, "asyncTimeout": 300000}' as the first line) if
# faster startup is preferred over that guarantee.
set -euo pipefail

# Only run in remote (Claude Code on the web) sessions. Locally, developers
# manage their own environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Install JS dependencies. `npm install` (not `ci`) so the resolved
# node_modules is reused from the cached container state on later sessions.
# Install logs go to stderr so they don't pollute the hook's stdout, which
# SessionStart injects into the session as context.
echo "session-start: installing npm dependencies..." >&2
npm install 1>&2

# Install the Chromium browser binary used by Playwright for visual checks.
# The download CDN must be reachable under the environment's network policy.
# If it isn't, warn and continue so the session still starts with deps ready
# (the agent will fall back to non-visual verification and note the gap).
echo "session-start: installing Playwright Chromium..." >&2
if npx --no-install playwright install chromium 1>&2; then
  echo "session-start: Chromium ready — visual verification available." >&2
else
  echo "WARN: Playwright Chromium install failed (network policy may block the download CDN, or playwright is not installed). In-app visual verification will be unavailable; document the gap in PRs." >&2
fi
