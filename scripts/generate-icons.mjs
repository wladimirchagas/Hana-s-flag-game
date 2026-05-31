// One-time icon generator. Run with: node scripts/generate-icons.mjs
// Reads public/app-icon.svg and writes the PNG variants required by the
// Web App Manifest and iOS apple-touch-icon. The PNGs are checked in so
// the build doesn't need sharp installed in CI.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svg = readFileSync(resolve(root, 'public/app-icon.svg'))
const outDir = resolve(root, 'public/icons')
mkdirSync(outDir, { recursive: true })

const variants = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  // Maskable variant: same artwork but padded so platforms that crop into
  // a circle/squircle don't shave off the mascot's head.
  { name: 'icon-maskable-512.png', size: 512, padding: 0.12 },
  // iOS uses apple-touch-icon at 180x180 — anything else gets stretched.
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const v of variants) {
  let pipeline = sharp(svg, { density: 384 })
  if (v.padding) {
    const inner = Math.round(v.size * (1 - v.padding * 2))
    pipeline = sharp({
      create: {
        width: v.size,
        height: v.size,
        channels: 4,
        background: { r: 255, g: 200, b: 87, alpha: 1 },
      },
    }).composite([
      {
        input: await sharp(svg, { density: 384 }).resize(inner, inner).png().toBuffer(),
        gravity: 'center',
      },
    ])
  } else {
    pipeline = pipeline.resize(v.size, v.size)
  }
  await pipeline.png().toFile(resolve(outDir, v.name))
  console.log(`wrote ${v.name}`)
}
