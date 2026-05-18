import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

// In GitHub Actions we set VITE_BASE_PATH to "/<repo-name>/" so assets resolve
// under the project page URL. Locally and on root-domain hosts it defaults to "/".
const base = process.env.VITE_BASE_PATH ?? '/'

// Snapshot the build metadata once at config time so it's baked into the
// bundle. Surfaced in the UI via the BuildFooter component so users can
// tell at a glance which commit / when the deploy they're looking at was
// built. CI sets GITHUB_SHA; locally we read git directly.
function buildCommitSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
}
const BUILD_COMMIT = buildCommitSha()
const BUILD_ISO = new Date().toISOString()

// After build, copy index.html → 404.html so GitHub Pages can serve client-side
// routes (e.g. /game) on direct visits / refresh.
function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      try {
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
      } catch {
        // ignore — only runs after a successful build
      }
    },
  }
}

export default defineConfig({
  base,
  // Compile-time constants — replaced literally in the bundle by Vite.
  define: {
    __BUILD_COMMIT__: JSON.stringify(BUILD_COMMIT),
    __BUILD_ISO__: JSON.stringify(BUILD_ISO),
  },
  plugins: [react(), spaFallback()],
})
