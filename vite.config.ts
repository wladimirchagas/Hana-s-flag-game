import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// In GitHub Actions we set VITE_BASE_PATH to "/<repo-name>/" so assets resolve
// under the project page URL. Locally and on root-domain hosts it defaults to "/".
const base = process.env.VITE_BASE_PATH ?? '/'

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
  plugins: [react(), spaFallback()],
})
