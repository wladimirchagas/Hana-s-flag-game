import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
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

// After build: copy index.html → 404.html (SPA fallback for GitHub Pages) and
// keep the ogv.js audio-decoder files in sync from node_modules.
const OGV_FILES = [
  'ogv.js', 'ogv-support.js', 'ogv-worker-audio.js',
  'ogv-decoder-audio-vorbis-wasm.js', 'ogv-decoder-audio-vorbis-wasm.wasm',
  'ogv-demuxer-ogg-wasm.js', 'ogv-demuxer-ogg-wasm.wasm',
]

function spaFallback() {
  return {
    name: 'spa-fallback',
    buildStart() {
      // Keep public/ogv/ in sync with node_modules/ogv/dist/ at build time
      const src = resolve(__dirname, 'node_modules/ogv/dist')
      const dest = resolve(__dirname, 'public/ogv')
      try {
        mkdirSync(dest, { recursive: true })
        for (const f of OGV_FILES) copyFileSync(resolve(src, f), resolve(dest, f))
      } catch {
        // non-fatal — public/ogv/ files may already be present
      }
    },
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
  server: {
    host: true,
    port: 5173,
  },
  // Compile-time constants — replaced literally in the bundle by Vite.
  define: {
    __BUILD_COMMIT__: JSON.stringify(BUILD_COMMIT),
    __BUILD_ISO__: JSON.stringify(BUILD_ISO),
  },
  plugins: [react(), spaFallback()],
})
