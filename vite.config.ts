import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
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
  plugins: [
    react(),
    // PWA support — generates a web manifest + service worker so the site
    // is installable as a home-screen / desktop shortcut. Used by the
    // InstallAppButton on the landing page.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['app-icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Guess the Country Flag',
        short_name: 'Flag Game',
        description: 'Guess the Country Flag — quick rounds, world flags, and streaks.',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#fff8ee',
        theme_color: '#ffc857',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the immutable, content-hashed build assets (JS/CSS/icons/
        // fonts/data) so the app loads offline from the home-screen shortcut.
        // The HTML shell is deliberately NOT precached: a precached shell is
        // served cache-first, which left returning visitors a whole build behind
        // after every deploy — the stale shell points at the previous JS bundle,
        // so newly shipped features (e.g. shareable-link routes) silently fail to
        // appear until a second reload, and on iOS the stale shell can stick for
        // days. The shell is served network-first below instead.
        globPatterns: ['**/*.{js,css,svg,png,woff2,json}'],
        // Disable vite-plugin-pwa's default cache-first navigation fallback (it
        // defaults navigateFallback to "index.html"). That route is registered
        // before our runtimeCaching rule and would otherwise win, re-introducing
        // the stale-shell problem. With it off, the network-first rule governs
        // navigations.
        navigateFallback: undefined,
        // App shell (full-page navigations + *.html): network-first so an online
        // visitor always boots the latest deploy, falling back to the cached copy
        // only when offline. SPA client-side route changes don't hit the service
        // worker, so this only governs cold loads, reloads, and shared deep links.
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              request.mode === 'navigate' || url.pathname.endsWith('.html'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-shell',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 16 },
            },
          },
          {
            // Map data (world topology + per-country subdivision GeoJSON) is
            // deliberately kept OUT of the precache above (globIgnores) to keep
            // the install small — but it must still survive a flaky network. A
            // returning visitor whose `countries-50m.json` request dropped saw a
            // permanently BLANK map. StaleWhileRevalidate serves the cached copy
            // instantly (offline included) and refreshes it in the background, so
            // the map renders on every load once it has succeeded once.
            urlPattern: ({ sameOrigin, url }) =>
              sameOrigin &&
              (url.pathname.endsWith('/countries-50m.json') ||
                url.pathname.includes('/subdivisions/')),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'map-data',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
        // Purge precaches from earlier builds when a new service worker activates.
        cleanupOutdatedCaches: true,
        // Public dir contains a couple of large data blobs (countries-50m.json,
        // historical maps, large subdivision GeoJSON) — exclude from precache
        // so the install footprint stays small.
        // Subdivision flags (public/flags/sub/**) are ~1800 files only used in
        // sub-national mode; load them on demand rather than bloating the
        // install. National + territory flags (public/flags/*.svg) stay
        // precached — they're small and on the main flag grid.
        globIgnores: ['**/countries-50m.json', '**/historical-flags/**', '**/historical-maps/**', '**/ogv/**', '**/subdivisions/**', '**/flags/sub/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: {
        // Keep the install button working in `npm run dev` so we can test
        // the flow without a production build.
        enabled: true,
      },
    }),
    spaFallback(),
  ],
})
