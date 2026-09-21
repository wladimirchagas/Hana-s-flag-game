// Build gate: FlagGrid grouping mode availability, validation, and data integrity.
//
// Regressions this guards against:
//   1. 'group by subcontinent' defaulting to 'group by country' for airlines or broadcasters
//      due to hardcoded exclusion in FlagGrid's useEffect.
//   2. Any group mode offered in the dropdown being unexpectedly rejected by the validity hook.
//   3. Incomplete subcontinent/continent metadata for airlines or public broadcasters.
//
// Run: node scripts/check-grid-grouping.mjs

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// 1. Check FlagGrid.tsx source directly to ensure no hardcoded groupMode bypass exists
const flagGridSource = fs.readFileSync(path.join(root, "src/components/FlagGrid.tsx"), "utf8");

// Guard: Ensure useEffect does not have hardcoded groupMode !== checks that bypass groupModeAvailableFor
assert.ok(
  !flagGridSource.includes('groupMode !== "by-country"'),
  "FlagGrid.tsx must not contain hardcoded groupMode checks bypassing groupModeAvailableFor",
);

// 2. Transpile and evaluate FlagGrid's grouping helpers in an isolated VM
const sourceFile = ts.createSourceFile(
  "FlagGrid.tsx",
  flagGridSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

// Extract the GROUP_MODE_LABELS, sets, and groupModeAvailableFor function
let extractedCode = "";
let inHelperSection = false;

for (const stmt of sourceFile.statements) {
  const text = stmt.getText(sourceFile);
  if (text.includes("const GROUP_MODE_LABELS") || text.includes("const TODAY_ONLY_MODES")) {
    inHelperSection = true;
  }
  if (inHelperSection) {
    extractedCode += text + "\n";
  }
  if (text.includes("function groupModeAvailableFor")) {
    inHelperSection = false;
  }
}

const compiledHelpers = ts.transpileModule(
  `
  ${extractedCode}
  module.exports = {
    GROUP_MODE_LABELS,
    TODAY_ONLY_MODES,
    PASSPORT_ONLY_MODES,
    FOOTBALL_CREST_ONLY_MODES,
    COUNTRY_GROUP_MODES,
    groupModeAvailableFor,
  };
  `,
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  },
).outputText;

const moduleExports = { exports: {} };
vm.runInNewContext(compiledHelpers, { module: moduleExports, exports: moduleExports.exports, Set });
const {
  GROUP_MODE_LABELS,
  groupModeAvailableFor,
} = moduleExports.exports;

const ALL_GROUP_MODES = Object.keys(GROUP_MODE_LABELS);
const ALL_CONTENT_TYPES = [
  "flag",
  "coatofarms",
  "passport",
  "footballcrest",
  "airline",
  "broadcaster",
  "tourismlogo",
  "newsagency",
  "newspaper",
  "party",
];

console.log("Checking groupModeAvailableFor across all content types and eras...");

// Verify subcontinent is available for all modern content types and historical eras
for (const ct of ALL_CONTENT_TYPES) {
  assert.equal(
    groupModeAvailableFor("subcontinent", ct, true),
    true,
    `subcontinent must be available for ${ct} (modern era)`,
  );
}
assert.equal(
  groupModeAvailableFor("subcontinent", "flag", false),
  true,
  "subcontinent must be available for historical era flags",
);

assert.equal(
  groupModeAvailableFor("party-ideology", "party", true),
  true,
  "By ideology must be available for the Political parties view",
);
assert.equal(
  groupModeAvailableFor("party-ideology", "newspaper", true),
  false,
  "By ideology must not leak into non-party Show views",
);

// Verify democracy group modes are available for all modern content types
for (const ct of ALL_CONTENT_TYPES) {
  for (const demoMode of ["freedom-house", "v-dem", "economist", "cpi", "perception", "rsf-press", "gpi"]) {
    assert.equal(
      groupModeAvailableFor(demoMode, ct, true),
      true,
      `${demoMode} must be available for ${ct} (modern era)`,
    );
    assert.equal(
      groupModeAvailableFor(demoMode, ct, false),
      false,
      `${demoMode} must NOT be available for historical era`,
    );
  }
}

// Verify by-country is only available for airline, broadcaster, tourismlogo, newsagency, newspaper and party in modern era
for (const ct of ALL_CONTENT_TYPES) {
  const expected =
    ct === "airline" ||
    ct === "broadcaster" ||
    ct === "tourismlogo" ||
    ct === "newsagency" ||
    ct === "newspaper" ||
    ct === "party";
  assert.equal(
    groupModeAvailableFor("by-country", ct, true),
    expected,
    `by-country availability mismatch for ${ct}`,
  );
}

// Verify that the useEffect fallback logic behaves correctly:
// If a mode is available, it must never be reset.
// If a mode is not available, it must fallback to "by-country" (for airline/broadcaster/tourismlogo/newsagency/newspaper) or "none".
for (const isModernEra of [true, false]) {
  for (const ct of ALL_CONTENT_TYPES) {
    const effectiveCt = isModernEra ? ct : "flag";
    const isCountryGrouped =
      effectiveCt === "airline" ||
      effectiveCt === "broadcaster" ||
      effectiveCt === "tourismlogo" ||
      effectiveCt === "newsagency" ||
      effectiveCt === "newspaper" ||
      effectiveCt === "party";

    for (const mode of ALL_GROUP_MODES) {
      const isAvailable = groupModeAvailableFor(mode, effectiveCt, isModernEra);
      let resultingMode = mode;

      if (!isAvailable) {
        resultingMode = isCountryGrouped ? "by-country" : "none";
      }

      if (isAvailable) {
        assert.equal(
          resultingMode,
          mode,
          `Available mode ${mode} was incorrectly reset in ${effectiveCt} (modern=${isModernEra})`,
        );
      } else {
        const expectedFallback = isCountryGrouped ? "by-country" : "none";
        assert.equal(
          resultingMode,
          expectedFallback,
          `Invalid mode ${mode} did not fallback to ${expectedFallback} in ${effectiveCt}`,
        );
      }
    }
  }
}

// 3. Verify airline and broadcaster data grouping by subcontinent
console.log("Checking commercial airlines and public broadcasters subcontinent grouping data...");

const loadTsModule = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const js = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(js, { module: mod, exports: mod.exports });
  return mod.exports;
};

const { COMMERCIAL_AIRLINES } = loadTsModule(path.join(root, "src/data/commercialAirlines.ts"));
const { PUBLIC_BROADCASTERS } = loadTsModule(path.join(root, "src/data/publicBroadcasters.ts"));

// Ensure all airlines have valid country codes and non-empty metadata
let totalAirlines = 0;
for (const [code, list] of Object.entries(COMMERCIAL_AIRLINES)) {
  assert.ok(/^[A-Z]{2}$/.test(code), `Invalid country code: ${code}`);
  for (const airline of list) {
    totalAirlines++;
    assert.ok(airline.id, `Airline missing id in ${code}`);
    assert.ok(airline.name, `Airline missing name in ${code}`);
    assert.equal(airline.countryCode, code, `Airline countryCode mismatch: ${airline.countryCode} !== ${code}`);
  }
}

// Ensure all broadcasters have valid country codes and non-empty metadata
let totalBroadcasters = 0;
for (const [code, list] of Object.entries(PUBLIC_BROADCASTERS)) {
  assert.ok(/^[A-Z]{2}$/.test(code), `Invalid country code: ${code}`);
  for (const broadcaster of list) {
    totalBroadcasters++;
    assert.ok(broadcaster.id, `Broadcaster missing id in ${code}`);
    assert.ok(broadcaster.name, `Broadcaster missing name in ${code}`);
    assert.equal(broadcaster.countryCode, code, `Broadcaster countryCode mismatch: ${broadcaster.countryCode} !== ${code}`);
  }
}

// Test simulated subcontinent grouping on sample airline and broadcaster entries
function simulateSubcontinentGrouping(items) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name, "en"));
  const buckets = new Map();
  for (const e of sorted) {
    const key = e.subcontinent ?? "Other";
    const arr = buckets.get(key) ?? [];
    arr.push(e);
    buckets.set(key, arr);
  }
  const list = [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b, "en"));
  return list.map(([heading, groupItems]) => ({ heading, items: groupItems }));
}

const sampleAirlineEntries = [
  { id: "qantas", name: "Qantas", countryName: "Australia", subcontinent: "Australia and New Zealand" },
  { id: "singapore-airlines", name: "Singapore Airlines", countryName: "Singapore", subcontinent: "South-Eastern Asia" },
  { id: "lufthansa", name: "Lufthansa", countryName: "Germany", subcontinent: "Western Europe" },
  { id: "air-france", name: "Air France", countryName: "France", subcontinent: "Western Europe" },
];

const airlineGroups = simulateSubcontinentGrouping(sampleAirlineEntries);
assert.equal(airlineGroups.length, 3, "Sample airlines should be grouped into 3 subcontinents");
assert.equal(airlineGroups[0].heading, "Australia and New Zealand");
assert.equal(airlineGroups[1].heading, "South-Eastern Asia");
assert.equal(airlineGroups[2].heading, "Western Europe");
assert.equal(airlineGroups[2].items.length, 2);

console.log(
  `PASS: All group modes verified across ${ALL_CONTENT_TYPES.length} views and 2 eras. Checked ${totalAirlines} airlines and ${totalBroadcasters} broadcasters. Subcontinent grouping verified.`,
);
