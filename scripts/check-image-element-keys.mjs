// Guard: EVERY <img> the app renders must carry a `key` derived from its own
// `src`, so that changing what an image slot shows MOUNTS A FRESH ELEMENT
// instead of re-pointing a live one.
//
// WHY THIS EXISTS:
// Reported by the owner with a screenshot (2026-08-22): the Learn-map grid's
// "Show" dropdown read "National flags" and the section header read "Flags of
// this era (195)" — the 195 UN members, so React had re-rendered the right
// list — yet almost every TILE still showed the football-association crest from
// the view the user had just left. Only the one card that had been tapped
// showed its national flag. The DOM `src` attributes were all correct; what was
// wrong was the ELEMENT: React had reused each live <img> and simply re-pointed
// it, and a reused <img> keeps two kinds of stale state:
//
//   1. THE PREVIOUS PICTURE. A browser goes on painting the last decoded frame
//      until the new src loads, and WebKit (the reporter was on an iPad) will
//      not re-run the lazy-load for an `<img loading="lazy">` that already
//      loaded once and is off-screen when its src changes — so the old symbol
//      can stay on screen indefinitely.
//   2. IMPERATIVE ERROR STATE. Our own onError handlers mutate the DOM node
//      (`img.hidden = true`, `style.display = "none"`, `dataset.localRetry` /
//      `dataset.fellBack`, revealing the "—" placeholder sibling). React does
//      not manage or reset those, so ONE failed image permanently blanks that
//      slot — including for every DIFFERENT image shown there afterwards. That
//      half is deterministic and was reproduced in a browser: a tile whose
//      crest failed to load stayed blank after switching back to National
//      flags, i.e. a flag not shown despite being selected.
//
// Keying the element by its src makes the invariant STRUCTURAL: a different
// image is a different element, with no inherited bitmap and no inherited
// hidden flag. It costs nothing when the src is unchanged (the key is
// unchanged, so React reuses the element exactly as before).
//
// THE SECOND HALF, reported two days later on the same device: with the fresh
// element in place, the Passports view showed NOTHING — every tile an empty
// box, no image, no "—" placeholder, and no `error` event. An <img> that
// occupies its box, paints nothing and never errors is one whose request was
// never made: WebKit had deferred 195 freshly-inserted `loading="lazy"` images
// and never started any of them. Native lazy loading in WebKit mis-handles
// images whose loads are set up dynamically (inserted in a batch, or
// re-pointed) while the page is scrolled — which is also what left the stale
// crests above. So the grids do NOT hand WebKit a `loading="lazy"` attribute at
// all: `src/components/GridImage.tsx` defers the load itself with an
// IntersectionObserver, whose guaranteed initial callback is exactly the step
// the native implementation gets wrong. This script forbids the attribute
// coming back, and forbids GridImage losing its observer.
//
// Run: node scripts/check-image-element-keys.mjs   (part of `npm run flags:check`)

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SRC = join(root, "src");

function tsxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...tsxFiles(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** End index of the JSX opening tag starting at `start`, brace-aware so a `>`
 *  inside a `{…}` expression (an arrow handler) doesn't end it early. */
function tagEnd(s, start) {
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return i;
  }
  return -1;
}

/** The full `{…}` expression of attribute `name` in a tag, or null. */
function attrExpr(tag, name) {
  const m = new RegExp(`\\b${name}=\\{`).exec(tag);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = start; i < tag.length; i++) {
    if (tag[i] === "{") depth++;
    else if (tag[i] === "}") {
      depth--;
      if (depth === 0) return tag.slice(start, i + 1);
    }
  }
  return null;
}

/** Collapse whitespace so a key split across lines still matches its src. */
const norm = (e) => e.replace(/\s+/g, " ").trim();

/** The src/key expression with a `?? fallback` tail dropped, so
 *  key={url ?? "no-image"} counts as derived from src={url ?? undefined}. */
const base = (e) =>
  norm(e).replace(/\s*\?\?\s*(?:undefined|null|"[^"]*"|'[^']*'|`[^`]*`)/g, "");

/** Blank out comment lines so an <img> WRITTEN ABOUT in a comment is not
 *  scanned as one. Only whole comment lines are blanked, so a "//" inside a
 *  string literal (a URL) is untouched. */
function stripCommentLines(s) {
  return s
    .split("\n")
    .map((l) => (/^\s*(\/\/|\/\*|\*)/.test(l) ? "" : l))
    .join("\n");
}

const failures = [];
let checked = 0;

for (const file of tsxFiles(SRC)) {
  const s = stripCommentLines(readFileSync(file, "utf8"));
  const rel = relative(root, file);
  let idx = 0;
  for (;;) {
    const at = s.indexOf("<img", idx);
    if (at === -1) break;
    // Skip an identifier that merely starts with "img" (<imgFoo …>).
    if (/[A-Za-z0-9_]/.test(s[at + 4] ?? "")) {
      idx = at + 4;
      continue;
    }
    const end = tagEnd(s, at);
    if (end === -1) break;
    const tag = s.slice(at, end + 1);
    const line = s.slice(0, at).split("\n").length;
    const src = attrExpr(tag, "src");
    const key = attrExpr(tag, "key");
    checked++;
    if (!src) {
      failures.push(
        `${rel}:${line} — <img> has no dynamic src={…}; give it one, or the ` +
          `key rule cannot be applied (a literal-src image belongs in CSS).`,
      );
    } else if (!key) {
      failures.push(
        `${rel}:${line} — <img> has no key. Add key=${norm(src)} so a changed ` +
          `image mounts a fresh element.`,
      );
    } else if (base(key) !== base(src)) {
      failures.push(
        `${rel}:${line} — <img> key ${norm(key)} does not match its src ` +
          `${norm(src)}; the key MUST be the src expression.`,
      );
    }
    idx = end + 1;
  }
}

// Native lazy loading is banned outright: WebKit leaves such an image
// permanently unloaded when it is inserted dynamically (the blank-Passports
// bug). Deferral belongs to GridImage's IntersectionObserver instead.
for (const file of tsxFiles(SRC)) {
  const s = stripCommentLines(readFileSync(file, "utf8"));
  const rel = relative(root, file);
  const at = s.indexOf('loading="lazy"');
  if (at !== -1) {
    const line = s.slice(0, at).split("\n").length;
    failures.push(
      `${rel}:${line} — native loading="lazy" is banned; WebKit can leave such ` +
        `an image permanently unloaded. Render it through <GridImage>, which ` +
        `defers the load with an IntersectionObserver instead.`,
    );
  }
}

// GridImage is the mechanism the ban above relies on. If it stops deferring by
// observer — or starts emitting a native lazy attribute — every grid silently
// goes back to trusting WebKit.
const gridImage = readFileSync(join(SRC, "components", "GridImage.tsx"), "utf8");
if (!/new IntersectionObserver\(/.test(gridImage)) {
  failures.push(
    "src/components/GridImage.tsx — the IntersectionObserver is gone. Every " +
      "grid thumbnail depends on it to load at all in WebKit.",
  );
}
if (!/typeof IntersectionObserver === "undefined"/.test(gridImage)) {
  failures.push(
    "src/components/GridImage.tsx — the no-IntersectionObserver fallback is " +
      "gone. Where the observer does not exist the image must load immediately, " +
      "never never.",
  );
}

// The Learn grid's thumbnail keys the whole fragment (image + "—" placeholder)
// so the placeholder's imperatively-revealed state resets too. Guard that the
// fragment key is still there — the <img> key alone would leave a stale "—".
const grid = readFileSync(join(SRC, "components", "FlagGrid.tsx"), "utf8");
if (!/<Fragment key=\{url\}>/.test(grid)) {
  failures.push(
    "src/components/FlagGrid.tsx — the thumbnail's <Fragment key={url}> is gone. " +
      "The image AND its '—' placeholder must remount together when the shown " +
      "symbol changes, or a tile blanked by one failed image stays blank.",
  );
}

if (failures.length > 0) {
  console.error(
    `\n✗ ${failures.length} <img> element(s) can show a stale image:\n`,
  );
  for (const f of failures) console.error("  " + f);
  console.error(
    "\nSee CLAUDE.md — \"A swappable image must be a NEW element\". Never " +
      "silence this by deleting the check; add the key.\n",
  );
  process.exit(1);
}

console.log(
  `✓ image elements: all ${checked} <img> keyed by their src; no native lazy loading`,
);
