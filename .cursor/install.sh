#!/usr/bin/env bash
# Idempotent dependency install for Cloud Agent environments.
#
# Node version: the data-integrity gate (`npm run flags:check`) and several of
# the build/check scripts `import` .ts modules directly, which needs Node's
# native TypeScript type-stripping (Node >= 22.18). CI's era-map job pins Node
# 24, so we match it here. The default image's on-PATH `node` is older than
# 22.18, so we select a modern Node through the pre-installed nvm instead.
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

# Install/select Node 24 (idempotent — a no-op download if already present).
# If the network is unavailable but a suitable version is already installed,
# fall back to it so a re-run still succeeds offline.
if ! nvm install 24 >/dev/null 2>&1; then
  echo "nvm install 24 failed (offline?); falling back to an installed Node >= 22.18" >&2
fi
nvm use 24 >/dev/null 2>&1 || nvm use --lts=jod >/dev/null 2>&1
nvm alias default 24 >/dev/null 2>&1 || true

echo "Using Node $(node --version) / npm $(npm --version)"

# Clean, reproducible install from the committed lockfile.
npm ci
