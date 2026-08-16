#!/usr/bin/env node
/**
 * Build gate for the Learn-mode "National flags" tab.
 *
 * The tab shows a country's OWN flags — historical national flags (newest first,
 * the current one included), additional officially recognised flags, military
 * service flags, maritime ensigns/jacks, head-of-state standards, civil/state
 * variants and indigenous flags. Every one of them is an image with a DATE and a
 * SOURCE, so the same discipline that guards the era flags guards these:
 *
 *   1. Every entry carries a name, a from/to window, a design line and an
 *      authoritative http(s) source. Nothing is written from memory.
 *   2. Every image is BUNDLED — a reused file (the country's own flag, or an era
 *      flag under public/historical-flags/) must exist, and a fetched file must
 *      match the sha256 the manifest recorded. No runtime URLs, ever.
 *   3. THE LINK TO THE HISTORICAL ERAS. A flag reused from public/historical-flags/
 *      must carry the SAME window as src/data/historicalFlagValidity.ts gives it.
 *      That is what makes the two views structurally incapable of disagreeing about
 *      what a country flew at a given date: one file, one sourced window, two
 *      consumers. Drift fails the build here.
 *   4. No standardised viewBox (640×480 / 512×512) — the flag-aspect-ratio hard
 *      rule applies to these files exactly as it does to public/flags/.
 *   5. The historical section lists ONLY older, superseded flags — never the
 *      current one (owner request, 2026-08). The flag in force lives in the
 *      official section; the timeline is past flags only, and a country with no
 *      sourced past flag simply has no historical section.
 *   6. src/data/nationalFlags.ts is in sync with the manifest — the generated file
 *      is never hand-edited.
 *   7. Meanings are structurally sound (description + real source URLs + well-formed
 *      myths), the same floor check-flag-meanings.mjs applies. Like that check it
 *      cannot tell a sourced fact from a plausible fabrication: it is a safety net,
 *      not a substitute for verifying each claim against its cited source.
 *
 * Usage:
 *   node scripts/check-national-flags.mjs     # exits 1 on failure
 *   npm run flags:check:national
 */

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const MANIFEST = R("data/national-flag-sources.json");
const GENERATED = R("../src/data/nationalFlags.ts");
const PUBLIC = R("../public");

const CATEGORIES = new Set([
  "official",
  "historical",
  "military",
  "maritime",
  "standard",
  "civilstate",
  "indigenous",
  "coatofarms",
  "passport",
  "footballcrest",
]);
const FORBIDDEN_VIEWBOXES = new Set(["0 0 640 480", "0 0 512 512"]);

const errors = [];
const fail = (msg) => errors.push(msg);

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const { HISTORICAL_FLAG_VALIDITY } = await import("../src/data/historicalFlagValidity.ts");

const seenIds = new Set();
let reusedEraFlags = 0;
let flagTotal = 0;

for (const [cc, country] of Object.entries(manifest.countries)) {
  if (!/^[A-Z]{2}$/.test(cc)) fail(`${cc}: not an ISO 3166-1 alpha-2 code.`);
  const flags = country.flags ?? [];
  if (flags.length === 0) fail(`${cc}: listed with no flags — remove the country instead.`);

  for (const e of flags) {
    flagTotal++;
    const where = `${cc} ${e.id ?? "(no id)"}`;

    if (!e.id) fail(`${where}: no id.`);
    else if (seenIds.has(e.id)) fail(`${where}: duplicate id — ids must be unique across the file.`);
    else seenIds.add(e.id);

    if (!CATEGORIES.has(e.category)) fail(`${where}: unknown category "${e.category}".`);
    if (!e.name?.trim()) fail(`${where}: no name.`);
    if (!e.design?.trim()) fail(`${where}: no design line.`);
    if (!/^https?:\/\//.test(e.source ?? "")) fail(`${where}: source must be an http(s) URL.`);
    // Years are REQUIRED on a historical flag (the section exists to date them) and
    // optional elsewhere: an undated service flag is listed with no years rather
    // than an invented adoption date.
    const dated = e.from != null || e.to != null;
    if (e.category === "historical" && !dated) {
      fail(`${where}: a historical flag must carry the year(s) it was flown.`);
    }
    if (dated) {
      if (!Number.isInteger(e.from) || !Number.isInteger(e.to)) {
        fail(`${where}: from/to must both be years (to: 9999 = still current).`);
      } else if (e.from > e.to) {
        fail(`${where}: from ${e.from} is after to ${e.to}.`);
      }
    }

    // ---- the image must be bundled, or its absence explained -----------------
    const path = e.reuse ?? (e.file ? `national-flags/${e.file}` : null);
    if (!path) {
      // An entry with no free image is LISTED, not dropped — see the Torres Strait
      // Islander Flag. What it must never be is unexplained: the reason is what the
      // card shows in place of the picture.
      if ((e.noImageReason ?? "").trim().length < 40) {
        fail(
          `${where}: has no image and no usable "noImageReason". Either bundle the file, or say why ` +
            `no freely-licensed one exists — a symbol dropped in silence makes an incomplete set look complete.`,
        );
      }
      // A flag with OFFICIAL national status must be SHOWN, not described. This is
      // the Torres Strait Islander Flag rule: it went missing because no free file
      // existed, then reappeared as a "no image" card, and neither is acceptable for
      // one of a country's proclaimed national flags. If no free image exists, source
      // a drawn one and record its licence position (see `licenceNote`) — this check
      // fires until the flag can actually be seen.
      if (e.category === "official") {
        fail(
          `${where}: an OFFICIAL national flag must be shown, not merely described. ` +
            `Source a drawn image and record its copyright position in "licenceNote" — a country's ` +
            `proclaimed flags are exactly the ones a reader comes to see.`,
        );
      }
      continue;
    }
    if (e.noImageReason) {
      fail(`${where}: has both an image and a "noImageReason" — one or the other.`);
    }
    if (e.reuse && e.commons) fail(`${where}: has both "reuse" and "commons" — pick one.`);
    if (/^https?:\/\//.test(path)) {
      fail(`${where}: "${path}" is a runtime URL. Every flag file must be bundled in the repo.`);
      continue;
    }
    const abs = resolve(PUBLIC, path);
    if (!existsSync(abs)) {
      fail(`${where}: ${path} is not bundled.`);
      continue;
    }
    const bytes = readFileSync(abs);

    if (!e.reuse) {
      if (!e.commons && !e.url) {
        fail(`${where}: fetched files must record the Commons filename or the URL they came from.`);
      }
      // An image taken from outside Wikimedia has no licence template to lean on, so
      // the manifest must state the position explicitly rather than leave a reader
      // to assume it is free. Owner-directed inclusions are recorded, not hidden.
      if (e.url && (e.licenceNote ?? "").trim().length < 40) {
        fail(
          `${where}: images fetched from outside Wikimedia Commons must carry a "licenceNote" stating ` +
            `the copyright position — there is no licence template on the source to rely on.`,
        );
      }
      if (e.drawnRaster && (e.drawnRaster ?? "").trim().length < 30) {
        fail(`${where}: "drawnRaster" must say why the raster is a drawing rather than a photograph.`);
      }
      if (!e.sha256) {
        fail(`${where}: no sha256 recorded — re-run node scripts/download-national-flags.mjs.`);
      } else {
        const digest = createHash("sha256").update(bytes).digest("hex");
        if (digest !== e.sha256) {
          fail(`${where}: ${path} does not match the recorded sha256 (the file was changed after it was fetched).`);
        }
      }
    }

    // ---- aspect ratio ---------------------------------------------------------
    if (path.endsWith(".svg")) {
      const head = bytes.slice(0, 512).toString("utf8");
      const m = head.match(/viewBox=["']([^"']+)["']/);
      if (m && FORBIDDEN_VIEWBOXES.has(m[1].trim())) {
        fail(`${where}: ${path} has the standardised viewBox "${m[1].trim()}" — source a flag that keeps its real proportions.`);
      }
    }

    // ---- the link to the historical eras --------------------------------------
    if (e.reuse?.startsWith("historical-flags/")) {
      reusedEraFlags++;
      const window = HISTORICAL_FLAG_VALIDITY.get(e.reuse);
      if (!window) {
        fail(
          `${where}: reuses the era flag ${e.reuse}, which has NO window in src/data/historicalFlagValidity.ts. ` +
            `An era flag with no sourced window is blocked in every era — it must not be shown here either.`,
        );
      } else if (e.from < window.from || e.to > window.to) {
        // CONTAINMENT, not equality: the era table dates the DESIGN, and a colonial
        // usage is legitimately narrower (Spain's Cross of Burgundy dates from 1506,
        // but flew over Bolivia only from the conquest). Reaching OUTSIDE the era
        // window is the anachronism, and that is what fails here — so the tab can
        // never show a shared flag at a date the era maps say it did not exist.
        fail(
          `${where}: window ${e.from}–${e.to} reaches outside historicalFlagValidity.ts's ${window.from}–${window.to} ` +
            `for the SAME file ${e.reuse}. The era maps and this tab must never date a shared flag differently.`,
        );
      }
    }
  }

  // ---- a passport cover is a DRAWING, never a photograph -------------------
  // A photo of a booklet carries its own lighting, perspective and wear, and reads
  // as someone's document rather than as the country's design (owner report,
  // 2026-08: Brazil's photographed cover next to Malaysia's drawn one). Vector only;
  // where no free vector exists the type is listed with a noImageReason instead.
  for (const f of flags) {
    if (f.category !== "passport") continue;
    const p = f.reuse ?? (f.file ? `national-flags/${f.file}` : null);
    if (p && !p.endsWith(".svg") && !f.drawnRaster) {
      fail(
        `${cc} ${f.id}: passport covers must be drawn images, not photographs of the booklet — ` +
          `"${p}" is a raster with no "drawnRaster" statement. Use a vector cover, list the type with a ` +
          `noImageReason, or record in "drawnRaster" why this raster is a DRAWING rather than a photo.`,
      );
    }
  }

  // ---- the official section must carry the flag the country actually flies --
  // The section that answers "what is this country's flag?" must contain it. This
  // shipped wrong: Bolivia's official section listed only the Wiphala, so the
  // tricolour appeared nowhere in the first section a user reads.
  //
  // Special-status ENTITIES (Hong Kong, Macau, Taiwan — shown grouped under their
  // parent country's tab, never as standalone countries) are exempt: their current
  // flag is a subdivision/territory file (flags/sub/CN/CN-HK.svg, flags/tw.svg),
  // not flags/{cc}.svg, and it is deliberately NOT the `primary` flag because the
  // fact-sheet above shows the PARENT country's flag, not the entity's. The check
  // below is keyed on flags/{cc}.svg, which an entity never reuses.
  const ownFlag = `flags/${cc.toLowerCase()}.svg`;
  const officialPrimary = flags.filter((f) => f.category === "official" && f.reuse === ownFlag);
  if (country.entity) {
    // no primary requirement — see above
  } else if (officialPrimary.length === 0) {
    fail(
      `${cc}: the "official" section does not include the country's current national flag (${ownFlag}). ` +
        `Every country's official section leads with the flag it actually flies.`,
    );
  } else if (officialPrimary.length > 1) {
    fail(`${cc}: ${officialPrimary.length} official entries reuse ${ownFlag} — there is only one current flag.`);
  }

  // ---- a coat of arms must EXPLAIN itself ----------------------------------
  // Arms are a stack of charges that each mean something, and every national one is
  // documented. A description of what is drawn, with no account of WHY, is exactly
  // the "descriptive but not explanatory" gap the owner called out.
  for (const f of flags) {
    if (f.category === "coatofarms" && !f.meaning) {
      fail(
        `${cc} ${f.id}: a coat of arms must carry a sourced "meaning" explaining what its charges stand for, ` +
          `not just a description of what is drawn.`,
      );
    }
  }

  // ---- pre-independence flags must declare who held sovereignty -------------
  // The tab lists a country's colonial-era flags (owner request), which is exactly
  // where a user could mistake another power's flag — or a colony's flag — for a
  // flag of the independent state. The guard: any historical flag whose window ENDS
  // at or before independence must name the sovereign power, which the UI badges.
  const independence = country.independence;
  const sovereignEntries = flags.filter((f) => f.sovereign);
  if (sovereignEntries.length > 0 && !independence) {
    fail(
      `${cc}: has pre-independence flags (${sovereignEntries.map((f) => f.id).join(", ")}) but no sourced ` +
        `"independence" record — the UI needs the year to caption them.`,
    );
  }
  if (independence) {
    if (!Number.isInteger(independence.year)) fail(`${cc}: independence.year must be a year.`);
    if (!independence.event?.trim()) fail(`${cc}: independence needs the event it refers to.`);
    if (!/^https?:\/\//.test(independence.source ?? "")) {
      fail(`${cc}: independence must cite an http(s) source.`);
    }
    for (const f of flags) {
      if (f.category !== "historical" || f.to == null) continue;
      // Strictly BEFORE, not "at or before": the independence year itself is the
      // transition, and a flag flown within it can belong to either side of the line
      // (Brazil's Kingdom-of-Brazil flag flew in 1822, after the September
      // declaration). Those are a curator's call; everything wholly earlier is not.
      if (f.to < independence.year && !f.sovereign && !f.priorPolity) {
        fail(
          `${cc} ${f.id}: flew entirely before independence (${f.from}–${f.to}, independent ${independence.year}) ` +
            `but names neither a sovereign power nor an earlier polity. A pre-modern flag shown without that ` +
            `attribution reads as a flag of the country as it is today — set "sovereign" when a foreign power ` +
            `ruled the territory, or "priorPolity" when an earlier polity flew it under nobody.`,
        );
      }
      if (f.sovereign && f.from != null && f.from >= independence.year) {
        fail(
          `${cc} ${f.id}: names a sovereign power but flew from ${f.from}, at or after independence in ` +
            `${independence.year}. Only a pre-independence flag carries "sovereign" — a flag imposed by a ` +
            `power that took the country AFTER independence carries "occupier" instead.`,
        );
      }
      // The mirror of the rule above: an occupation happens to an independent
      // country, so its flag cannot predate independence.
      if (f.occupier && f.to != null && f.to <= independence.year) {
        fail(
          `${cc} ${f.id}: names an occupying power but flew until ${f.to}, at or before independence in ` +
            `${independence.year}. A flag from before independence carries "sovereign", not "occupier".`,
        );
      }
    }
  }
  // An occupation is a fact about an INDEPENDENT country, so the year is what the
  // caption turns on ("…was already independent when this flag was imposed").
  const occupierEntries = flags.filter((f) => f.occupier);
  if (occupierEntries.length > 0 && !independence) {
    fail(
      `${cc}: has occupation flags (${occupierEntries.map((f) => f.id).join(", ")}) but no sourced ` +
        `"independence" record — the UI needs the year to say the country was already independent.`,
    );
  }
  for (const f of flags) {
    // All three are mutually exclusive: a flag was flown under a ruling power
    // BEFORE independence, or by an earlier polity under nobody, or imposed by an
    // occupier AFTER independence — never two of those at once.
    const attribution = ["sovereign", "priorPolity", "occupier"].filter((k) => f[k]);
    if (attribution.length > 1) {
      fail(
        `${cc} ${f.id}: carries ${attribution.join(" and ")} — a flag was flown under a ruling power, ` +
          `by an earlier polity, or under an occupier, but never more than one of those.`,
      );
    }
    if (f.priorPolity && f.category !== "historical") {
      fail(`${cc} ${f.id}: only a historical flag can carry "priorPolity" (it is in "${f.category}").`);
    }
    if (f.occupier && f.category !== "historical") {
      fail(`${cc} ${f.id}: only a historical flag can carry "occupier" (it is in "${f.category}").`);
    }
  }
  for (const f of sovereignEntries) {
    if (f.category !== "historical") {
      fail(`${cc} ${f.id}: only a historical flag can carry "sovereign" (it is in "${f.category}").`);
    }
  }

  // ---- a documented omission needs a real reason ---------------------------
  for (const o of country.omitted ?? []) {
    if (!o.name?.trim()) fail(`${cc}: an omitted flag has no name.`);
    if ((o.reason ?? "").trim().length < 40) {
      fail(`${cc}: the omission of "${o.name}" needs a reason saying WHY no flag is shown (missing is honest, unexplained is not).`);
    }
  }

  // ---- the current flag must be present -----------------------------------
  // The historical section holds ONLY older, superseded flags — never the current
  // one (owner request, 2026-08). The flag the country flies lives in the official
  // section (and the fact-sheet above); duplicating it into the timeline was noise,
  // and for the 48 countries whose only historical entry WAS the current flag it
  // meant a one-card "Historical flags" section that just repeated the official one.
  const historical = flags.filter((f) => f.category === "historical");
  const stillCurrent = historical.filter((f) => (f.to ?? 0) >= 9999);
  if (stillCurrent.length > 0) {
    fail(
      `${cc}: the historical section lists the CURRENT flag (${stillCurrent.map((f) => f.id).join(", ")}, to: 9999). ` +
        `Historical flags are only older, superseded flags — the current flag belongs in the official section, not the timeline.`,
    );
  }
}

// ---- meanings ---------------------------------------------------------------
for (const [cc, country] of Object.entries(manifest.countries)) {
  for (const e of country.flags ?? []) {
    if (!e.meaning) continue;
    const where = `${cc} ${e.id}`;
    const m = e.meaning;
    if (!m.description?.trim()) fail(`${where}: meaning has no description.`);
    if (!Array.isArray(m.sources) || m.sources.length === 0) {
      fail(`${where}: meaning has no sources — every explainer must cite an authoritative source.`);
    } else {
      for (const s of m.sources) {
        if (!s.title?.trim()) fail(`${where}: a meaning source has no title.`);
        if (!/^https?:\/\//.test(s.url ?? "")) fail(`${where}: a meaning source has no http(s) URL.`);
      }
    }
    for (const myth of m.myths ?? []) {
      if (!myth.claim?.trim() || !myth.reality?.trim()) {
        fail(`${where}: a myth needs both a claim and a sourced reality.`);
      }
    }
  }
}

// ---- the UI must actually SHOW the attribution ------------------------------
// Data alone does not prevent the anachronism; the badge does. These are the two
// components that render a national flag, and both must read `sovereign`.
for (const [file, what] of [
  ["../src/components/NationalFlagGrid.tsx", "the grid card's badge"],
  ["../src/components/NationalFlagDetails.tsx", "the selected flag's widget"],
]) {
  const abs2 = R(file);
  const src2 = existsSync(abs2) ? readFileSync(abs2, "utf8") : "";
  if (existsSync(abs2) && !src2.includes("priorPolity")) {
    fail(
      `${file} no longer references \`priorPolity\`, so a flag flown by an earlier polity would be shown ` +
        `with nothing distinguishing it from the modern country's own.`,
    );
  }
  if (existsSync(abs2) && !src2.includes("occupier")) {
    fail(
      `${file} no longer references \`occupier\`, so a flag an occupying power imposed on an already- ` +
        `independent country would be shown as one of that country's own flags — the Estonian and Latvian ` +
        `SSR flags are exactly that case.`,
    );
  }
  if (existsSync(abs2) && !src2.includes("primary")) {
    fail(
      `${file} no longer references \`primary\`, so the country's current flag would be listed in the ` +
        `official and historical sections with nothing marking it as the flag in force.`,
    );
  }
  if (existsSync(abs2) && !src2.includes("noImageReason")) {
    fail(
      `${file} no longer references \`noImageReason\`, so a symbol with no freely-licensed image ` +
        `would vanish from the UI instead of showing why it cannot be pictured.`,
    );
  }
}
for (const [file, what] of [
  ["../src/components/NationalFlagGrid.tsx", "the grid card's badge"],
  ["../src/components/NationalFlagDetails.tsx", "the selected flag's widget"],
]) {
  const abs = R(file);
  if (!existsSync(abs)) {
    fail(`${file} is missing — ${what} is what stops a colonial flag reading as the country's own.`);
    continue;
  }
  if (!readFileSync(abs, "utf8").includes("sovereign")) {
    fail(
      `${file} no longer references \`sovereign\`, so ${what} cannot show which power held the territory. ` +
        `Pre-independence flags would then be indistinguishable from the country's own.`,
    );
  }
}

// ---- the generated file must match the manifest -----------------------------
if (!existsSync(GENERATED)) {
  fail("src/data/nationalFlags.ts is missing — run node scripts/build-national-flags.mjs.");
} else {
  const before = readFileSync(GENERATED, "utf8");
  execFileSync(process.execPath, [R("build-national-flags.mjs")], { stdio: "pipe" });
  const after = readFileSync(GENERATED, "utf8");
  if (before !== after) {
    fail(
      "src/data/nationalFlags.ts is out of date with scripts/data/national-flag-sources.json " +
        "(it has been regenerated — commit the change). Never hand-edit the generated file.",
    );
  }
}

const countries = Object.keys(manifest.countries).length;
if (errors.length > 0) {
  console.error("✗ national-flag check failed:\n");
  for (const e of errors) console.error(`  ${e}`);
  console.error(
    `\n${errors.length} problem(s). Fix the flag or its sourcing — never weaken this check.`,
  );
  process.exit(1);
}

console.log(
  `✓ national flags: ${flagTotal} flags across ${countries} countries, ` +
    `${reusedEraFlags} shared with the historical era maps (windows agree).`,
);
