// Guards the Learn-mode historical eras against ANACHRONISTIC flags.
//
// The eras let a polity borrow a modern country's flag. Before the era gate existed,
// 99 polities in 1914, 140 in 1945 and 115 in 1960 borrowed today's flag regardless of
// when it was adopted — South Africa's 1994 flag flew over the 1914 map, Uganda's 1962
// flag over 1960, and the 1945 map showed Bangladesh (1971). `flagExistedInEra()`
// (src/lib/historicalEras.ts) now refuses any flag younger than the era's date.
//
// This check protects the three ways that gate can silently stop working:
//
//   A. the gate is no longer called where flags are resolved (LearnPage), or
//      historicalEras.ts stops consulting FLAG_ADOPTION_YEAR;
//   B. the adoption table loses entries or gains implausible years;
//   C. an era override / registry entry points `modernName` at a country with NO
//      adoption year — the borrow is then blocked silently and the author's intended
//      flag never appears (a coverage bug rather than a correctness one, but just as
//      invisible).
//
// Run: node scripts/check-historical-flag-anachronism.mjs   (part of npm run flags:check)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const { ERAS, polityInfo, polityModernName, eraYear, flagExistedInEra } = await import(
  R("../src/lib/historicalEras.ts")
);
const { FLAG_ADOPTION_YEAR } = await import(R("../src/data/flagAdoptionYears.ts"));

const failures = [];
const warnings = [];

// A. the gate must still be wired up.
const learnPage = readFileSync(R("../src/pages/LearnPage.tsx"), "utf8");
if (!learnPage.includes("flagExistedInEra")) {
  failures.push(
    "src/pages/LearnPage.tsx no longer calls flagExistedInEra() — the historical eras " +
      "would hand today's flags to polities that never flew them",
  );
}
const erasSrc = readFileSync(R("../src/lib/historicalEras.ts"), "utf8");
if (!erasSrc.includes("FLAG_ADOPTION_YEAR")) {
  failures.push("src/lib/historicalEras.ts no longer consults FLAG_ADOPTION_YEAR");
}

// B. the adoption table must be complete and plausible.
const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const knownCodes = new Map(
  [...selectionSrc.matchAll(/code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);
const thisYear = new Date().getFullYear();
for (const [code, year] of Object.entries(FLAG_ADOPTION_YEAR)) {
  if (!knownCodes.has(code)) {
    failures.push(`FLAG_ADOPTION_YEAR has "${code}", which is not a country the app knows`);
  }
  if (!Number.isInteger(year) || year < 1000 || year > thisYear) {
    failures.push(`FLAG_ADOPTION_YEAR["${code}"] = ${year} is not a plausible adoption year`);
  }
}
const missing = [...knownCodes.keys()].filter((c) => FLAG_ADOPTION_YEAR[c] == null);
if (missing.length > 0) {
  failures.push(
    `${missing.length} countries have no flag-adoption year, so every historical era ` +
      `silently refuses their flag: ${missing.join(" ")} — re-run ` +
      `node scripts/build-flag-adoption-years.mjs`,
  );
}

// C. a curated modernName pointing at a country with no adoption year.
const codeByName = new Map([...knownCodes].map(([code, name]) => [name.toLowerCase(), code]));
for (const era of ERAS) {
  if (!era.dataUrl) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));
  const names = new Set(geo.features.map((f) => f.properties?.NAME).filter(Boolean));
  for (const name of names) {
    const info = polityInfo(name, era.id);
    if (info.flag || info.noFlag) continue;
    const modernName = polityModernName(name, era.id);
    if (!modernName) continue;
    if (polityInfo(modernName, era.id).flag) continue;
    const code = codeByName.get(modernName.toLowerCase());
    if (!code) continue;
    if (FLAG_ADOPTION_YEAR[code] == null) {
      failures.push(
        `${era.id}: "${name}" is curated to borrow ${modernName}'s flag, but ${code} has ` +
          `no adoption year — the borrow is refused and the polity renders flagless`,
      );
    } else if (!flagExistedInEra(code, era.id)) {
      // Not a failure: this is the gate doing its job. Report it so the curation stays
      // honest — the entry's note should explain what actually flew.
      warnings.push(
        `${era.id} (${eraYear(era.id)}): "${name}" → ${modernName} refused, flag adopted ` +
          `${FLAG_ADOPTION_YEAR[code]}`,
      );
    }
  }
}

if (warnings.length > 0) {
  console.log(`  ${warnings.length} curated borrow(s) correctly refused as anachronistic:`);
  for (const w of warnings.slice(0, 12)) console.log(`    · ${w}`);
  if (warnings.length > 12) console.log(`    · …and ${warnings.length - 12} more`);
}

if (failures.length > 0) {
  console.error(`\n✗ historical flag-anachronism check found ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `\n✓ flag-anachronism check passed — ${Object.keys(FLAG_ADOPTION_YEAR).length} adoption years, ` +
    `gate wired into LearnPage.`,
);
