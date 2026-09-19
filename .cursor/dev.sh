#!/usr/bin/env bash
# Launches the Vite dev server for the flag game.
#
# Self-contained so it runs the right Node regardless of the shell's default
# PATH: it selects the same nvm-managed Node the install script set up.
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"
nvm use 24 >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"

# vite.config.ts sets server.host=true, so this listens on 0.0.0.0:5173.
exec npm run dev
