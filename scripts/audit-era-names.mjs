// GOAL 2, STEP ONE: is every polity shown under the name it actually bore at that date?
//
// The three era goals must be worked 1 → 2 → 3, and within goal 2 the NAME comes first: it is
// the identity that decides whose borders you are checking and which flag is even a candidate
// (see "What the historical eras are FOR" in CLAUDE.md). This script is the worksheet for that
// step — it reports what the panel SHOWS for every polity, and flags the names that need a
// human decision, ranked by how much of the map they cover.
//
// It flags, per era:
//   CORRUPT   the shown name still carries mojibake or a replacement character
//   TYPO      the shown name looks misspelled (doubled letters, known bad spellings)
//   RAW-TAG   the shown name still carries a dataset tag: "(Belgium)", "(UK Lybia)", "(IT)"
//   MODERN    the shown name is a present-day country name in a pre-1880 era, where a bare
//             name match is as likely to be a different polity that merely shares it
//   EXONYM    the shown name is a dated or non-standard exonym for a polity with an accepted
//             modern historiographical name ("Manchu Empire" → the Qing dynasty)
//   CASE      inconsistent capitalisation of the same polity across eras
//
// Nothing here is authoritative — every flag is a prompt to go and check a source. Clean rows
// are printed too (with --all), because "this name was confirmed" is the point of the exercise.
//
// Usage:
//   node scripts/audit-era-names.mjs                → flagged names, all eras, worst first
//   node scripts/audit-era-names.mjs ad1600         → one era
//   node scripts/audit-era-names.mjs ad1600 --all   → every polity in that era
//   node scripts/audit-era-names.mjs --summary      → count of flagged names per era

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const { ERAS, eraYear, polityDisplayName, polityInfo } = await import(R("../src/lib/historicalEras.ts"));
const { POLITY_EXISTENCE, ERA_EXTENT_CAVEATS } = await import(R("../src/data/polityExistence.ts"));

const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const MODERN_NAMES = new Set(
  [...selectionSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()),
);

/** Dated or non-standard exonyms, and what the literature calls the polity now. Curated:
 *  each is a name the panel shows that a reader would not find in a modern history. */
const EXONYMS = new Map([
  ["manchu empire", "the Qing dynasty / Qing Empire"],
  ["turan", "not a polity name — a Persian literary term for the lands beyond the Oxus"],
  ["empire of alexander", "the Macedonian Empire"],
  ["tsardom of muscovy", "the Tsardom of Russia (Muscovy is the older English exonym)"],
  ["kingfom of italy", "the Kingdom of Italy"],
  ["poland-llituania", "the Polish–Lithuanian Commonwealth"],
]);

/** Spellings the dataset gets wrong that the display map may not yet correct. */
const BAD_SPELLINGS = new Map([
  ["kingfom", "Kingdom"], ["scottland", "Scotland"], ["llituania", "Lithuania"],
  ["khoiasan", "Khoisan"], ["egyption", "Egyptian"], ["lybia", "Libya"],
  ["cyraneica", "Cyrenaica"], ["tripolitana", "Tripolitania"], ["kongldom", "Kingdom"],
  ["ottomon", "Ottoman"], ["afganistan", "Afghanistan"], ["moroco", "Morocco"],
]);


/**
 * NAMES CONFIRMED PERIOD-CORRECT — the ledger, not an exemption list.
 *
 * The MODERN heuristic flags any shown name that is also a present-day country name in a
 * pre-1880 era, because that is where a bare name match is as likely to be a DIFFERENT
 * polity that merely shares the name (the Mali Empire vs the 1960 republic). But many are
 * genuinely right: Denmark in 1200 was Denmark. Each entry below was checked against a
 * source and found correct for that date, with the polity it refers to named — so the next
 * pass inherits the verification instead of redoing it.
 *
 * Keyed `eraId|shown name`. Adding a row means "I checked this and it is right", never
 * "silence this". Anything genuinely uncertain stays flagged.
 */
const NAME_CONFIRMED = new Map([
  // Kingdoms that held the name continuously from the medieval period onward.
  ["ad800|Japan", "the Nara/early Heian imperial state; the name Nihon dates from the 7th century"],
  ["ad1000|Poland", "the Piast kingdom, crowned 1025"],
  ["ad1000|Sweden", "the unified Swedish kingdom of Olof Skötkonung"],
  ["ad1000|Serbia", "the Serbian principality of Duklja/Raška"],
  ["ad1000|Croatia", "the Croatian kingdom of Krešimir III"],
  ["ad1000|Georgia", "the Bagrationi kingdom, united 1008"],
  ["ad1000|Yemen", "the Yemeni highland imamates and Ziyadid/Sulayhid states"],
  ["ad1200|Norway", "the Norwegian kingdom under Sverre's heirs"],
  ["ad1200|Hungary", "the Árpád kingdom"],
  ["ad1200|Poland", "the fragmented Piast duchies, still the Kingdom of Poland"],
  ["ad1200|Sweden", "the Swedish kingdom"],
  ["ad1200|Denmark", "the Valdemarian kingdom at its Baltic height"],
  ["ad1200|Portugal", "the kingdom, independent since 1139"],
  ["ad1200|Georgia", "the Bagrationi kingdom at its peak under Tamar"],
  ["ad1200|Croatia", "the kingdom, in personal union with Hungary since 1102"],
  ["ad1200|Cyprus", "the Lusignan Kingdom of Cyprus, founded 1192"],
  ["ad1200|Yemen", "the Ayyubid and Rasulid states of Yemen"],
  ["ad1300|Norway", "the Norwegian kingdom"],
  ["ad1300|Hungary", "the kingdom, under the Angevins from 1308"],
  ["ad1300|France", "the Capetian kingdom of Philip IV"],
  ["ad1300|Ethiopia", "the Solomonic Ethiopian Empire, restored 1270"],
  ["ad1300|Morocco", "the Marinid sultanate"],
  ["ad1300|Sweden", "the Swedish kingdom"],
  ["ad1300|Lithuania", "the Grand Duchy of Lithuania"],
  ["ad1300|Poland", "the kingdom, reunified under Władysław I"],
  ["ad1300|Portugal", "the kingdom"],
  ["ad1300|Denmark", "the Danish kingdom"],
  ["ad1300|Georgia", "the Bagrationi kingdom under Mongol suzerainty"],
  ["ad1300|Cyprus", "the Lusignan kingdom"],
  ["ad1300|Yemen", "the Rasulid sultanate"],
  ["ad1500|Ethiopia", "the Solomonic empire before the Adal war"],
  ["ad1500|France", "the Valois kingdom of Louis XII"],
  ["ad1500|Japan", "Sengoku-period Japan — fragmented, but the imperial state's name"],
  ["ad1500|Cambodia", "post-Angkor Cambodia, the Middle Period kingdom"],
  ["ad1500|Portugal", "the kingdom, at the height of its discoveries"],
  ["ad1500|Georgia", "the Georgian kingdoms of Kartli, Kakheti and Imereti"],
  ["ad1500|Cyprus", "the Venetian-ruled Kingdom of Cyprus"],
  ["ad1500|Yemen", "the Tahirid sultanate and Zaydi imamate"],
  ["ad1600|Sweden", "the Swedish kingdom of Charles IX"],
  ["ad1600|Ethiopia", "the Solomonic empire of Susenyos"],
  ["ad1600|France", "the Bourbon kingdom of Henri IV"],
  ["ad1600|Senegal", "the Senegal river states and French trading posts"],
  ["ad1600|Cambodia", "the Cambodian kingdom at Longvek/Oudong"],
  ["ad1600|Cuba", "the Spanish captaincy-general of Cuba"],
  ["ad1600|Oman", "the Ya'rubid imamate of Oman"],
  ["ad1700|Morocco", "the Alaouite sultanate of Moulay Ismail"],
  ["ad1700|Sweden", "the Swedish empire of Charles XII"],
  ["ad1700|Spain", "the Spanish monarchy at the War of the Spanish Succession"],
  ["ad1700|France", "Bourbon France under Louis XIV"],
  ["ad1700|Ethiopia", "the Gondarine Ethiopian Empire"],
  ["ad1700|Philippines", "the Spanish captaincy-general, named for Philip II in 1543"],
  ["ad1700|Cambodia", "the Cambodian kingdom, a Siamese and Vietnamese tributary"],
  ["ad1700|Cuba", "the Spanish captaincy-general of Cuba"],
  ["ad1700|Portugal", "the kingdom under John V"],
  ["ad1700|Luxembourg", "the duchy, then part of the Spanish/Austrian Netherlands"],
  ["ad1700|Bhutan", "the Bhutanese state unified by Ngawang Namgyal, 1616–34"],
  ["ad1700|Oman", "the Ya'rubid imamate"],
  ["ad1700|Ethiopia", "the Gondarine empire"],
  // 1815 — checked one by one against the Congress of Vienna settlement.
  ["ad1815|United States", "the United States, independent since 1783"],
  ["ad1815|Denmark", "the Danish kingdom, having just lost Norway at Kiel"],
  ["ad1815|Spain", "the restored Bourbon monarchy of Ferdinand VII"],
  ["ad1815|France", "the restored Bourbon kingdom"],
  ["ad1815|Morocco", "the Alaouite sultanate"],
  ["ad1815|Japan", "Tokugawa-period Japan"],
  ["ad1815|Paraguay", "independent of Spain since 1811"],
  ["ad1815|Philippines", "the Spanish captaincy-general"],
  ["ad1815|Ethiopia", "the Ethiopian Empire in the Zemene Mesafint"],
  ["ad1815|Cambodia", "the Cambodian kingdom under Siamese and Vietnamese pressure"],
  ["ad1815|Nepal", "the Gorkhali kingdom, unified 1768–69"],
  ["ad1815|Portugal", "the kingdom, its court newly returned from Brazil"],
  ["ad1815|Oman", "the Sultanate of Muscat and Oman under Said bin Sultan"],
  ["ad1815|Angola", "Portuguese Angola"],
  ["ad1815|Yemen", "the Zaydi imamate and Ottoman coastal garrisons"],
  ["ad1815|United Kingdom", "the United Kingdom of Great Britain and Ireland, 1801"],
  ["ad1815|Switzerland", "the restored Swiss Confederation of the 1815 Federal Treaty"],
  ["ad1815|Bhutan", "the Bhutanese state"],
  ["ad1815|Sierra Leone", "the British Crown Colony, 1808"],
  ["ad1815|Haiti", "independent since 1804"],
  ["ad1815|Senegal", "the French posts at Saint-Louis and Gorée"],
  ["ad1815|Brunei", "the Brunei sultanate"],
  ["ad1815|Luxembourg", "the Grand Duchy, created in 1815"],
  ["ad1815|Dominica", "the British colony"],
  ["ad1815|Saint Lucia", "the British colony, ceded by France in 1814"],
  ["ad1815|Barbados", "the British colony"],
  ["ad1815|Grenada", "the British colony"],
  ["ad1815|San Marino", "the republic, independent since the 4th century by tradition"],
  ["ad1700|Senegal", "the French posts on the Senegal river and Gorée"],
  ["bc2000|Egypt", "the Egyptian Middle Kingdom — Egypt is the conventional English name for the ancient state"],
  ["ad1700|Brunei", "the Brunei sultanate"],
  // Not a redundant ruler tag: Libya's three provinces were under three separate military
  // administrations in 1945, and the parenthetical is how all three are labelled.
  ["ad1945|Fezzan (French Libya)", "the Fezzan under French military administration, 1943–51"],
  ["ad1945|Cyrenaica (British Libya)", "Cyrenaica under British military administration"],
  ["ad1945|Tripolitania (British Libya)", "Tripolitania under British military administration"],
]);

const args = process.argv.slice(2);
const onlyEra = args.find((a) => !a.startsWith("--"));
const showAll = args.includes("--all");
const summary = args.includes("--summary");

/** Every issue this script can raise for one shown name. */
function classify(shown, raw, eraId) {
  const issues = [];
  const lower = shown.toLowerCase();
  if (/[�?]/.test(shown) || /Ã.|â€|Å./.test(shown)) issues.push("CORRUPT");
  for (const [bad, good] of BAD_SPELLINGS) {
    if (lower.includes(bad)) issues.push(`TYPO(→${good})`);
  }
  if (
    /\((?:UK|IT|FR|RU|Belgium|Germany|France|Spain|Portugal|Egypt|USA|US)[^)]*\)/i.test(shown) &&
    !NAME_CONFIRMED.has(`${eraId}|${shown}`)
  ) {
    issues.push("RAW-TAG");
  }
  if (EXONYMS.has(lower)) issues.push(`EXONYM(${EXONYMS.get(lower)})`);
  if (MODERN_NAMES.has(lower) && eraYear(eraId) < 1880 && !NAME_CONFIRMED.has(`${eraId}|${shown}`)) {
    issues.push("MODERN");
  }
  return issues;
}

const perEra = [];
const nameCase = new Map(); // lowercase → set of shown spellings, to catch CASE drift

for (const era of ERAS) {
  if (!era.dataUrl) continue;
  if (onlyEra && era.id !== onlyEra) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));
  const byName = new Map();
  let unnamed = 0;
  for (const f of geo.features) {
    const raw = f.properties?.NAME;
    let area = 0;
    try { area = geoArea(f); } catch { area = 0; }
    if (!raw || !raw.trim()) { unnamed += area; continue; }
    byName.set(raw, (byName.get(raw) ?? 0) + area);
  }
  const total = [...byName.values()].reduce((s, v) => s + v, 0) + unnamed;

  const rows = [];
  for (const [raw, area] of byName) {
    const shown = polityDisplayName(raw, era.id);
    const set = nameCase.get(shown.toLowerCase()) ?? new Set();
    set.add(shown);
    nameCase.set(shown.toLowerCase(), set);
    const issues = classify(shown, raw, era.id);
    const checked = POLITY_EXISTENCE.has(shown);
    const disclosed = ERA_EXTENT_CAVEATS.has(`${era.id}|${raw}`);
    rows.push({ pct: total ? (100 * area) / total : 0, raw, shown, issues, checked, disclosed });
  }
  rows.sort((a, b) => b.pct - a.pct);
  perEra.push({ era, rows });
}

// CASE drift can only be seen across the whole run
for (const { rows } of perEra) {
  for (const r of rows) {
    const variants = nameCase.get(r.shown.toLowerCase());
    if (variants && variants.size > 1) r.issues.push(`CASE(${[...variants].join(" / ")})`);
  }
}

if (summary) {
  console.table(
    perEra.map(({ era, rows }) => ({
      era: era.id,
      year: eraYear(era.id),
      polities: rows.length,
      flagged: rows.filter((r) => r.issues.length).length,
      "flagged area %": `${rows.filter((r) => r.issues.length).reduce((s, r) => s + r.pct, 0).toFixed(1)}%`,
      "name-checked": rows.filter((r) => r.checked).length,
    })),
  );
  process.exit(0);
}

let flaggedTotal = 0;
for (const { era, rows } of perEra) {
  const show = showAll ? rows : rows.filter((r) => r.issues.length);
  flaggedTotal += rows.filter((r) => r.issues.length).length;
  if (show.length === 0) continue;
  console.log(`\n=== ${era.id} (${eraYear(era.id)}) — ${show.length}${showAll ? "" : " flagged"} of ${rows.length} polities ===`);
  for (const r of show) {
    const nm = r.shown === r.raw ? r.shown : `${r.shown} ⟵ "${r.raw}"`;
    const marks = [
      ...r.issues,
      r.checked ? "existence-window ✓" : "",
      r.disclosed ? "disclosed ✓" : "",
    ].filter(Boolean).join("  ");
    console.log(`  ${r.pct.toFixed(2).padStart(5)}%  ${nm.padEnd(52)} ${marks}`);
  }
}
console.log(
  `\n${flaggedTotal} name(s) flagged for review across ${perEra.length} era(s); ` +
    `${NAME_CONFIRMED.size} pre-1880 name(s) previously checked and confirmed period-correct.`,
);
