/**
 * Generate src/data/subdivisionPopulation.ts from Wikidata.
 * Run: node scripts/build-subdivision-population.mjs
 *
 * WHY WIKIDATA: it is the only reachable source that carries an authoritative
 * population (P1082) *with a point-in-time qualifier* (P585) and a
 * determination-method qualifier (P459, census vs estimate), keyed to the
 * ISO 3166-2 code (P300) we already use. That gives, for essentially every
 * subdivision the app shows, a population, the year of the figure, and whether
 * it is a census or an estimate — exactly what the Learn-mode panel needs.
 *
 * Requires network egress to query.wikidata.org. The query is run once per
 * country (filtered by the ISO 3166-2 prefix) so each request stays small and
 * never times out. For every code we keep the population statement with the
 * most recent point-in-time; statements with no point-in-time are ignored, so
 * every emitted entry can state its year (no undated figures are shipped).
 *
 * National reference totals (the share denominator's offline fallback) come
 * from the country item's own latest dated P1082.
 *
 * The generator only re-formats authoritative source data — it never invents a
 * figure. A subdivision with no dated Wikidata population is simply omitted,
 * exactly like the country fact-sheet rows that render only when present.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const OUTPUT = join(projectRoot, "src", "data", "subdivisionPopulation.ts");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-subdiv-pop/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";
const CENSUS_QID = "Q39825"; // "census" (determination method)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sparql(query, attempt = 0) {
  const url = `${ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/sparql-results+json" },
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.results.bindings;
  } catch (e) {
    if (attempt < 4) {
      const wait = 2000 * 2 ** attempt;
      console.warn(`  retry in ${wait}ms (${e.message})`);
      await sleep(wait);
      return sparql(query, attempt + 1);
    }
    throw e;
  }
}

/** Country codes the app actually shows subdivisions for. */
function countryCodes() {
  const t = readFileSync(META, "utf8");
  return [...t.matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
}

const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : null);

/**
 * Wikidata's P300 sometimes carries a subdivision's *current* ISO 3166-2 code
 * while this app's subdivisionMeta.ts still uses an older code for the same
 * subdivision (ISO reassigned France's overseas departments from letter codes
 * to numeric ones, and Finland's regions to numeric ones, after our meta was
 * built). Remap the Wikidata code to the app's code so the figure isn't
 * silently orphaned under a key the app never looks up. Confirmed by querying
 * Wikidata directly and checking the item's English label matches.
 */
const CODE_ALIASES = {
  "FR-971": "FR-GP", // Guadeloupe
  "FR-972": "FR-MQ", // Martinique
  "FR-973": "FR-GF", // French Guiana
  "FR-974": "FR-RE", // Réunion
  "FR-976": "FR-YT", // Mayotte
  "FI-01": "FI-AX", // Åland Islands
  // CI
  "CI-ZZ": "CI-08", // Zanzan
  // CZ
  "CZ-31": "CZ-JC", // South Bohemian
  "CZ-80": "CZ-MO", // Moravian-Silesian
  "CZ-64": "CZ-JM", // South Moravian
  "CZ-63": "CZ-VY", // Vysočina
  "CZ-20": "CZ-ST", // Central Bohemian
  "CZ-42": "CZ-US", // Ústí nad Labem Region
  "CZ-51": "CZ-LI", // Liberec Region
  "CZ-41": "CZ-KA", // Karlovy Vary Region
  "CZ-32": "CZ-PL", // Plzeň Region
  "CZ-52": "CZ-KR", // Hradec Králové Region
  "CZ-71": "CZ-OL", // Olomouc Region
  "CZ-53": "CZ-PA", // Pardubice Region
  "CZ-72": "CZ-ZL", // Zlín Region
  "CZ-10": "CZ-PR", // Prague
  // EE
  "EE-68": "EE-67", // Pärnu
  "EE-81": "EE-82", // Valga
  "EE-87": "EE-86", // Võru
  "EE-45": "EE-44", // Ida-Viru
  "EE-64": "EE-65", // Põlva
  "EE-79": "EE-78", // Tartu
  "EE-50": "EE-49", // Jõgeva
  "EE-56": "EE-57", // Lääne
  "EE-60": "EE-59", // Lääne-Viru
  "EE-71": "EE-70", // Rapla
  "EE-52": "EE-51", // Järva
  // ES
  "ES-NC": "ES-NA", // Navarre
  "ES-MC": "ES-MU", // Murcia
  "ES-CB": "ES-S", // Cantabria
  "ES-RI": "ES-LO", // La Rioja
  "ES-MD": "ES-M", // Community of Madrid
  // FR
  "FR-75C": "FR-75", // Paris
  // GN
  "GN-D": "GN-KD", // Kindia
  "GN-B": "GN-BK", // Boké
  // GR
  "GR-I": "GR-A1", // Attica
  // GT
  "GT-22": "GT-JU", // Jutiapa
  "GT-20": "GT-CQ", // Chiquimula
  "GT-17": "GT-PE", // Petén
  "GT-12": "GT-SM", // San Marcos
  "GT-13": "GT-HU", // Huehuetenango
  "GT-14": "GT-QC", // Quiché
  "GT-16": "GT-AV", // Alta Verapaz
  "GT-18": "GT-IZ", // Izabal
  "GT-19": "GT-ZA", // Zacapa
  "GT-11": "GT-RE", // Retalhuleu
  "GT-10": "GT-SU", // Suchitepéquez
  "GT-05": "GT-ES", // Escuintla
  "GT-06": "GT-SR", // Santa Rosa
  "GT-04": "GT-CM", // Chimaltenango
  "GT-03": "GT-SA", // Sacatepéquez
  "GT-01": "GT-GU", // Guatemala
  "GT-21": "GT-JA", // Jalapa
  "GT-02": "GT-PR", // El Progreso
  "GT-07": "GT-SO", // Sololá
  "GT-09": "GT-QZ", // Quetzaltenango
  "GT-15": "GT-BV", // Baja Verapaz
  "GT-08": "GT-TO", // Totonicapán
  // HU
  "HU-ER": "HU-ED", // Érd
  // IN
  "IN-UK": "IN-UT", // Uttarakhand
  "IN-OD": "IN-OR", // Odisha
  "IN-CG": "IN-CT", // Chhattisgarh
  "IN-TS": "IN-TG", // Telangana
  // IQ
  "IQ-KI": "IQ-TS", // Kirkuk
  // IR
  "IR-28": "IR-31", // North Khorasan
  // KZ
  "KZ-63": "KZ-VOS", // East Kazakhstan
  "KZ-31": "KZ-ZHA", // Jambyl
  "KZ-61": "KZ-YUZ", // Turkistan
  "KZ-47": "KZ-MAN", // Mangystau
  "KZ-43": "KZ-KZY", // Kyzylorda
  "KZ-15": "KZ-AKT", // Aktobe
  "KZ-59": "KZ-SEV", // North Kazakhstan
  "KZ-39": "KZ-KUS", // Kostanay
  "KZ-55": "KZ-PAV", // Pavlodar
  "KZ-27": "KZ-ZAP", // West Kazakhstan
  "KZ-23": "KZ-ATY", // Atyrau
  "KZ-11": "KZ-AKM", // Akmola
  "KZ-35": "KZ-KAR", // Karaganda
  "KZ-75": "KZ-ALA", // Almaty City
  "KZ-19": "KZ-ALM", // Almaty Region
  // MA
  "MA-OUD": "MA-16", // Oued Ed-Dahab
  // MK
  "MK-312": "MK-72", // Struga
  "MK-313": "MK-78", // Centar Župa
  "MK-303": "MK-21", // Debar
  "MK-604": "MK-19", // Gostivar
  "MK-301": "MK-12", // Vevčani
  "MK-310": "MK-58", // Ohrid
  "MK-304": "MK-22", // Debarca
  "MK-509": "MK-66", // Resen
  "MK-408": "MK-56", // Novo Selo
  "MK-406": "MK-26", // Dojran
  "MK-403": "MK-10", // Valandovo
  "MK-410": "MK-73", // Strumica
  "MK-401": "MK-05", // Bogdanci
  "MK-405": "MK-18", // Gevgelija
  "MK-104": "MK-36", // Kavadarci
  "MK-507": "MK-55", // Novaci
  "MK-508": "MK-62", // Prilep
  "MK-501": "MK-04", // Bitola
  "MK-704": "MK-48", // Lipkovo
  "MK-816": "MK-82", // Čučer-Sandevo
  "MK-811": "MK-68", // Saraj
  "MK-606": "MK-35", // Jegunovce
  "MK-608": "MK-75", // Tearce
  "MK-609": "MK-76", // Tetovo
  "MK-601": "MK-06", // Bogovinje
  "MK-603": "MK-16", // Vrapčište
  "MK-702": "MK-44", // Kriva Palanka
  "MK-705": "MK-65", // Rankovce
  "MK-706": "MK-71", // Staro Nagoričane
  "MK-203": "MK-23", // Delčevo
  "MK-207": "MK-51", // Makedonska Kamenica
  "MK-201": "MK-03", // Berovo
  "MK-208": "MK-60", // Pehčevo
  "MK-605": "MK-30", // Želino
  "MK-602": "MK-08", // Brvenica
  "MK-308": "MK-52", // Makedonski Brod
  "MK-812": "MK-70", // Sopište
  "MK-808": "MK-38", // Karpoš
  "MK-817": "MK-84", // Šuto Orizari
  "MK-803": "MK-09", // Butel
  "MK-815": "MK-79", // Čair
  "MK-814": "MK-77", // Centar
  "MK-503": "MK-27", // Dolneni
  "MK-504": "MK-45", // Krivogaštani
  "MK-506": "MK-53", // Mogila
  "MK-109": "MK-80", // Čaška
  "MK-107": "MK-67", // Rosoman
  "MK-106": "MK-54", // Negotino
  "MK-804": "MK-17", // Gazi Baba
  "MK-505": "MK-46", // Kruševo
  "MK-502": "MK-25", // Demir Hisar
  "MK-801": "MK-01", // Aerodrom
  "MK-813": "MK-74", // Studeničani
  "MK-809": "MK-39", // Kisela Voda
  "MK-209": "MK-63", // Probištip
  "MK-210": "MK-81", // Češinovo-Obleševo
  "MK-802": "MK-02", // Aračinovo
  "MK-806": "MK-32", // Zelenikovo
  "MK-307": "MK-40", // Kičevo
  "MK-311": "MK-61", // Plasnica
  "MK-105": "MK-49", // Lozovo
  "MK-108": "MK-69", // Sveti Nikole
  "MK-701": "MK-43", // Kratovo
  "MK-807": "MK-34", // Ilinden
  "MK-205": "MK-37", // Karbinci
  "MK-211": "MK-83", // Štip
  "MK-206": "MK-42", // Kočani
  "MK-204": "MK-33", // Zrnovci
  "MK-101": "MK-13", // Veles
  "MK-103": "MK-24", // Demir Kapija
  "MK-202": "MK-14", // Vinica
  "MK-402": "MK-07", // Bosilovo
  "MK-409": "MK-64", // Radoviš
  "MK-404": "MK-11", // Vasilevo
  "MK-407": "MK-41", // Konče
  // NO
  "NO-55": "NO-19", // Troms
  "NO-32": "NO-02", // Akershus
  "NO-31": "NO-01", // Østfold
  "NO-56": "NO-20", // Finnmark
  "NO-33": "NO-06", // Buskerud
  "NO-39": "NO-07", // Vestfold
  "NO-40": "NO-08", // Telemark
  // PL
  "PL-12": "PL-MA", // Lesser Poland Voivodeship
  "PL-18": "PL-PK", // Podkarpackie Voivodeship
  "PL-02": "PL-DS", // Lower Silesian Voivodeship
  "PL-16": "PL-OP", // Opole Voivodeship
  "PL-20": "PL-PD", // Podlaskie Voivodeship
  "PL-28": "PL-WN", // Warmian-Masurian Voivodeship
  "PL-08": "PL-LB", // Lubusz Voivodeship
  "PL-32": "PL-ZP", // West Pomeranian Voivodeship
  "PL-06": "PL-LU", // Lublin Voivodeship
  "PL-22": "PL-PM", // Pomeranian Voivodeship
  "PL-14": "PL-MZ", // Masovian Voivodeship
  "PL-10": "PL-LD", // Łódź Voivodeship
  "PL-04": "PL-KP", // Kuyavian-Pomeranian Voivodeship
  "PL-30": "PL-WP", // Greater Poland Voivodeship
  "PL-26": "PL-SK", // Świętokrzyskie Voivodeship
  // SI
  "SI-142": "SI-05", // Zagorje ob Savi
  // TW
  "TW-NWT": "TW-TPQ", // New Taipei
  // ZA
  "ZA-KZN": "ZA-NL", // KwaZulu-Natal
  "ZA-GP": "ZA-GT", // Gauteng
};

/**
 * Subdivisions whose Wikidata item carries a dated P1082 population but NO
 * P300 (ISO 3166-2 code) property at all, so the P300-filtered queries above
 * can never find them even via CODE_ALIASES (there is no Wikidata code to
 * alias from). New Zealand's two states in free association, plus its
 * external territory, are not modelled as ISO-coded subdivisions in
 * Wikidata's data model. Fetched directly by QID below; each QID was
 * confirmed by checking the item's label/description against the country it
 * belongs to before use.
 */
const NO_ISO_CODE_QIDS = {
  "NZ-CK": "Q26988", // Cook Islands — self-governing state in free association with NZ
  "NZ-NU": "Q34020", // Niue — self-governing state in free association with NZ
  "NZ-TK": "Q36823", // Tokelau — NZ external territory
};

/**
 * Subdivisions with no P300 link AND no usable code-bearing item at all —
 * found instead by an exact (or administrative-suffix-variant) name match
 * against the subdivision's own name in subdivisionMeta.ts, scoped to the
 * correct country via P17, then independently verified by checking the
 * matched item's Wikidata description/P31 classes to rule out a same-name
 * collision (a different place that merely shares the name) before being
 * trusted — exactly the verification this project's "never trust a
 * bulk-imported subdivision flag as correct by default" rule requires for
 * any unsupervised match, applied here to population data. Each entry below
 * was individually confirmed this way; many other same-name candidates found
 * by the same search were REJECTED for failing this check (e.g. it would
 * have matched Madagascar's MG-T "Antananarivo" to the city of Antananarivo
 * rather than the autonomous province; Mexico's MX-DIF to the country of
 * Mexico itself; Venezuela's VE-M "Miranda" state to an unrelated Miranda
 * Municipality in Anzoátegui State; Italy's province codes to their
 * same-named capital comune, which is a much smaller population) — those are
 * deliberately left absent rather than shipped, per the "never invent or
 * guess" rule.
 */
const VERIFIED_NAME_MATCH_QIDS = {
  "AZ-NA": "Q152825", // Naftalan — city in Azerbaijan; AZ-NA is itself a city-level Municipality
  "BS-AK": "Q341919", // Acklins — district-island of the Bahamas
  "CV-BR": "Q492528", // Brava — island of Cape Verde, coterminous with the Brava concelho
  "CV-BV": "Q110440", // Boa Vista — island of Cape Verde, coterminous with the Boa Vista concelho
  "CV-SL": "Q111989", // Sal — island of Cape Verde, coterminous with the Sal concelho
  "CV-MA": "Q492551", // Maio — island of Cape Verde, coterminous with the Maio concelho
  "GB-GS": "Q35086", // South Georgia and the South Sandwich Islands — British Overseas Territory
  "GB-IO": "Q43448", // British Indian Ocean Territory
  "IN-CH": "Q5071071", // Chandigarh district — matches the Chandigarh Union Territory
  "KN-14": "Q376738", // Trinity Palmetto Point Parish
  "MD-SN": "Q907112", // Transnistria — the Stînga Nistrului territory MD-SN represents
  "NP-KO": "Q2284812", // Bhojpur District, Koshi Province
  "NZ-CIT": "Q86771569", // Chatham Islands Territory — NZ Special Island Authority
  "PS-WBK": "Q36678", // West Bank
  "PS-GZZ": "Q39760", // Gaza Strip
  "PW-350": "Q14752295", // Peleliu — island of Palau, coterminous with Peleliu State
  "RS-KM~": "Q1255", // Kosovo and Metohija — Serbia's autonomous province (disputed territory)
  "SO-SL~": "Q34754", // Somaliland — de facto state (disputed territory, claimed by Somalia)
  "TO-01": "Q423528", // ʻEua — island of Tonga, coterminous with the ʻEua division
  "TO-04": "Q620452", // Tongatapu — main island of Tonga, coterminous with the Tongatapu division
  "TT-ETO": "Q185111", // Tobago — island of Trinidad and Tobago
};

/**
 * Subdivisions with NO Wikidata coverage at all (no P300 code, no QID with a
 * dated P1082, no name-matchable item) — population, year and basis sourced
 * directly from each subdivision's own national statistics authority and
 * independently verified, never copied from an unverified (including
 * LLM-generated) table. Every figure below was cross-checked against the
 * primary publication before being trusted; entries that could not be pinned
 * to an exact, sourced figure are deliberately left out rather than
 * approximated, per the "never invent or guess" rule.
 */
const MANUAL_VERIFIED_POPULATION = {
  // 2011 Population and Housing Census, Antigua and Barbuda Statistics Division
  "AG-04": { population: 51737, year: 2011, basis: "census" }, // Saint John
  // 2002 census, State Statistical Office of the Republic of North Macedonia
  "MK-31": { population: 11605, year: 2002, basis: "census" }, // Zajas
  "MK-28": { population: 3249, year: 2002, basis: "census" }, // Drugovo
  // 2005 regional estimate, Eritrean Ministry of Local Government (no census has been held)
  "ER-DK": { population: 83500, year: 2005, basis: "estimate" }, // Southern Red Sea
  "ER-SK": { population: 653300, year: 2005, basis: "estimate" }, // Northern Red Sea
  "ER-GB": { population: 708800, year: 2005, basis: "estimate" }, // Gash-Barka
  // 2020 census, Planning and Statistics Authority, Qatar
  "QA-RA": { population: 826786, year: 2020, basis: "census" }, // Al Rayyan
  "QA-MS": { population: 16730, year: 2020, basis: "census" }, // Madinat ash Shamal
  "QA-US": { population: 149701, year: 2020, basis: "census" }, // Umm Salal
  // 2013 census, Gambia Bureau of Statistics
  "GM-M": { population: 226018, year: 2013, basis: "census" }, // Central River
  "GM-L": { population: 82361, year: 2013, basis: "census" }, // Lower River
  "GM-W": { population: 699704, year: 2013, basis: "census" }, // West Coast
  // 2015 census, Statistics Sierra Leone — district figures summed to the province
  // (Kailahun 526,379 + Kenema 609,891 + Kono 506,100; Western Area Rural 444,270 +
  // Western Area Urban 1,055,964)
  "SL-E": { population: 1642370, year: 2015, basis: "census" }, // Eastern Province
  "SL-W": { population: 1500234, year: 2015, basis: "census" }, // Western Area
  // 2022 Census of Gibraltar, HM Government of Gibraltar
  "ES-GIB~": { population: 37936, year: 2022, basis: "census" }, // Gibraltar (claimed by Spain)
  // 2012 census, Algemeen Bureau voor de Statistiek, Suriname
  "SR-WA": { population: 118222, year: 2012, basis: "census" }, // Wanica
  // 2023 census (7th Population and Housing Census), Pakistan Bureau of Statistics
  "PK-SD": { population: 55696147, year: 2023, basis: "census" }, // Sindh
  "PK-IS": { population: 2363863, year: 2023, basis: "census" }, // Islamabad Capital Territory

  // Population estimates "al 01/01/2026" (tuttitalia.it, sourced from ISTAT)
  "IT-AO": { population: 122554, year: 2026, basis: "estimate" }, // Aosta
  "IT-RN": { population: 341244, year: 2026, basis: "estimate" }, // Rimini
  "IT-PU": { population: 349556, year: 2026, basis: "estimate" }, // Pesaro and Urbino
  "IT-TS": { population: 227840, year: 2026, basis: "estimate" }, // Trieste
  "IT-PD": { population: 934540, year: 2026, basis: "estimate" }, // Padua
  "IT-RO": { population: 227183, year: 2026, basis: "estimate" }, // Rovigo
  "IT-FE": { population: 340482, year: 2026, basis: "estimate" }, // Ferrara
  "IT-FC": { population: 394337, year: 2026, basis: "estimate" }, // Forlì-Cesena
  "IT-AN": { population: 461613, year: 2026, basis: "estimate" }, // Ancona
  "IT-MC": { population: 301689, year: 2026, basis: "estimate" }, // Macerata
  "IT-FM": { population: 166772, year: 2026, basis: "estimate" }, // Fermo
  "IT-AP": { population: 200202, year: 2026, basis: "estimate" }, // Ascoli Piceno
  "IT-CB": { population: 207723, year: 2026, basis: "estimate" }, // Campobasso
  "IT-BA": { population: 1218073, year: 2026, basis: "estimate" }, // Bari
  "IT-MT": { population: 187754, year: 2026, basis: "estimate" }, // Matera
  "IT-TP": { population: 410602, year: 2026, basis: "estimate" }, // Trapani
  "IT-ME": { population: 594074, year: 2026, basis: "estimate" }, // Messina
  "IT-PA": { population: 1195307, year: 2026, basis: "estimate" }, // Palermo
  "IT-AG": { population: 407041, year: 2026, basis: "estimate" }, // Agrigento
  "IT-CL": { population: 243501, year: 2026, basis: "estimate" }, // Caltanissetta
  "IT-RG": { population: 323144, year: 2026, basis: "estimate" }, // Ragusa
  "IT-SR": { population: 382450, year: 2026, basis: "estimate" }, // Syracuse
  "IT-SS": { population: 311128, year: 2026, basis: "estimate" }, // Sassari
  "IT-EN": { population: 151525, year: 2026, basis: "estimate" }, // Enna
  "IT-AT": { population: 207059, year: 2026, basis: "estimate" }, // Asti
  "IT-NO": { population: 365930, year: 2026, basis: "estimate" }, // Novara
  "IT-VI": { population: 855212, year: 2026, basis: "estimate" }, // Vicenza
  "IT-VR": { population: 930842, year: 2026, basis: "estimate" }, // Verona
  "IT-TV": { population: 878341, year: 2026, basis: "estimate" }, // Treviso
  "IT-PC": { population: 287745, year: 2026, basis: "estimate" }, // Piacenza
  "IT-PR": { population: 457509, year: 2026, basis: "estimate" }, // Parma
  "IT-MO": { population: 711502, year: 2026, basis: "estimate" }, // Modena
  "IT-BO": { population: 1024290, year: 2026, basis: "estimate" }, // Bologna
  "IT-PN": { population: 311114, year: 2026, basis: "estimate" }, // Pordenone
  "IT-IS": { population: 78217, year: 2026, basis: "estimate" }, // Isernia
  // Last available estimate before the province was abolished in 2016 (tuttitalia.it/ISTAT)
  "IT-CI": { population: 126324, year: 2016, basis: "estimate" }, // Carbonia-Iglesias

  // 2019 RGPH census, Institut National de la Statistique et de la Démographie, Burkina Faso (citypopulation.de)
  "BF-KMP": { population: 117682, year: 2019, basis: "census" }, // Kompienga
  "BF-LER": { population: 179423, year: 2019, basis: "census" }, // Léraba
  "BF-COM": { population: 633043, year: 2019, basis: "census" }, // Comoé
  "BF-PON": { population: 356918, year: 2019, basis: "census" }, // Poni
  "BF-NOU": { population: 98915, year: 2019, basis: "census" }, // Noumbiel
  "BF-SOM": { population: 363661, year: 2019, basis: "census" }, // Soum
  "BF-SOR": { population: 285011, year: 2019, basis: "census" }, // Sourou
  "BF-KOS": { population: 357089, year: 2019, basis: "census" }, // Kossi
  "BF-HOU": { population: 1510638, year: 2019, basis: "census" }, // Houet
  "BF-KEN": { population: 399949, year: 2019, basis: "census" }, // Kénédougou
  "BF-SEN": { population: 404716, year: 2019, basis: "census" }, // Séno
  "BF-YAG": { population: 171594, year: 2019, basis: "census" }, // Yagha
  "BF-KMD": { population: 105604, year: 2019, basis: "census" }, // Komondjari
  "BF-KOP": { population: 362644, year: 2019, basis: "census" }, // Koulpélogo
  "BF-BLG": { population: 737843, year: 2019, basis: "census" }, // Boulgou
  "BF-NAO": { population: 195816, year: 2019, basis: "census" }, // Nahouri
  "BF-SIS": { population: 337078, year: 2019, basis: "census" }, // Sissili
  "BF-IOB": { population: 265956, year: 2019, basis: "census" }, // Ioba
  "BF-BAL": { population: 297468, year: 2019, basis: "census" }, // Balé
  "BF-SNG": { population: 391617, year: 2019, basis: "census" }, // Sanguié
  "BF-TUI": { population: 329253, year: 2019, basis: "census" }, // Tuy
  "BF-BGR": { population: 153653, year: 2019, basis: "census" }, // Bougouriba
  "BF-KOT": { population: 480021, year: 2019, basis: "census" }, // Kouritenga
  "BF-GAN": { population: 482763, year: 2019, basis: "census" }, // Ganzourgou
  "BF-ZOU": { population: 312045, year: 2019, basis: "census" }, // Zoundwéogo
  "BF-ZIR": { population: 241731, year: 2019, basis: "census" }, // Ziro
  "BF-BLK": { population: 689709, year: 2019, basis: "census" }, // Boulkiemdé
  "BF-OUB": { population: 314609, year: 2019, basis: "census" }, // Oubritenga
  "BF-GOU": { population: 437310, year: 2019, basis: "census" }, // Gourma
  "BF-GNA": { population: 676476, year: 2019, basis: "census" }, // Gnagna
  "BF-BAZ": { population: 280870, year: 2019, basis: "census" }, // Bazèga
  "BF-KOW": { population: 181242, year: 2019, basis: "census" }, // Kourwéogo
  "BF-NAY": { population: 223151, year: 2019, basis: "census" }, // Nayala
  "BF-PAS": { population: 457930, year: 2019, basis: "census" }, // Passoré
  "BF-ZON": { population: 240018, year: 2019, basis: "census" }, // Zondoma
  "BF-SMT": { population: 884819, year: 2019, basis: "census" }, // Sanmatenga

  // 2018 Malawi Population and Housing Census Main Report (via Wikipedia)
  "MW-CT": { population: 234927, year: 2018, basis: "census" }, // Chitipa
  "MW-RU": { population: 229161, year: 2018, basis: "census" }, // Rumphi
  "MW-NB": { population: 284681, year: 2018, basis: "census" }, // Nkhata Bay
  "MW-LK": { population: 14527, year: 2018, basis: "census" }, // Likoma
  "MW-MZ": { population: 1161456, year: 2018, basis: "census" }, // Mzimba
  "MW-KS": { population: 842953, year: 2018, basis: "census" }, // Kasungu
  "MW-MC": { population: 602305, year: 2018, basis: "census" }, // Mchinji
  "MW-NK": { population: 393077, year: 2018, basis: "census" }, // Nkhotakota
  "MW-SA": { population: 478346, year: 2018, basis: "census" }, // Salima
  "MW-MG": { population: 1148611, year: 2018, basis: "census" }, // Mangochi
  "MW-MH": { population: 735438, year: 2018, basis: "census" }, // Machinga
  "MW-DE": { population: 830512, year: 2018, basis: "census" }, // Dedza
  "MW-LI": { population: 2626901, year: 2018, basis: "census" }, // Lilongwe
  "MW-NS": { population: 299168, year: 2018, basis: "census" }, // Nsanje
  "MW-CK": { population: 564684, year: 2018, basis: "census" }, // Chikwawa
  "MW-MW": { population: 130949, year: 2018, basis: "census" }, // Mwanza
  "MW-NE": { population: 138291, year: 2018, basis: "census" }, // Neno
  "MW-NU": { population: 659608, year: 2018, basis: "census" }, // Ntcheu
  "MW-ZO": { population: 851737, year: 2018, basis: "census" }, // Zomba
  "MW-PH": { population: 429450, year: 2018, basis: "census" }, // Phalombe
  "MW-MU": { population: 684107, year: 2018, basis: "census" }, // Mulanje
  "MW-TH": { population: 721456, year: 2018, basis: "census" }, // Thyolo
  "MW-DO": { population: 772569, year: 2018, basis: "census" }, // Dowa
  "MW-BA": { population: 438379, year: 2018, basis: "census" }, // Balaka
  "MW-CR": { population: 356875, year: 2018, basis: "census" }, // Chiradzulu
  "MW-BL": { population: 1251484, year: 2018, basis: "census" }, // Blantyre
  "MW-NI": { population: 317069, year: 2018, basis: "census" }, // Ntchisi

  // 2014 RGPH3 census, Institut National de la Statistique, Guinea (via Wikipedia)
  "GN-FA": { population: 280511, year: 2014, basis: "census" }, // Faranah
  "GN-MM": { population: 318738, year: 2014, basis: "census" }, // Mamou Prefecture
  "GN-FO": { population: 244649, year: 2014, basis: "census" }, // Forécariah Prefecture
  "GN-GU": { population: 291823, year: 2014, basis: "census" }, // Guéckédou Prefecture
  "GN-BE": { population: 325482, year: 2014, basis: "census" }, // Beyla Prefecture
  "GN-LO": { population: 175213, year: 2014, basis: "census" }, // Lola Prefecture
  "GN-KN": { population: 130205, year: 2014, basis: "census" }, // Koundara Prefecture
  "GN-ML": { population: 290320, year: 2014, basis: "census" }, // Mali Prefecture
  "GN-MC": { population: 298282, year: 2014, basis: "census" }, // Macenta Prefecture
  "GN-YO": { population: 176664, year: 2014, basis: "census" }, // Yomou Prefecture
  "GN-NZ": { population: 396118, year: 2014, basis: "census" }, // Nzérékoré Prefecture
  "GN-GA": { population: 194245, year: 2014, basis: "census" }, // Gaoual Prefecture
  "GN-SI": { population: 695449, year: 2014, basis: "census" }, // Siguiri Prefecture
  "GN-KB": { population: 101171, year: 2014, basis: "census" }, // Koubia Prefecture
  "GN-TO": { population: 122959, year: 2014, basis: "census" }, // Tougué Prefecture
  "GN-DI": { population: 195662, year: 2014, basis: "census" }, // Dinguiraye Prefecture
  "GN-BF": { population: 211063, year: 2014, basis: "census" }, // Boffa Prefecture
  "GN-DU": { population: 328418, year: 2014, basis: "census" }, // Dubréka Prefecture
  "GN-CO": { population: 264164, year: 2014, basis: "census" }, // Coyah Prefecture
  "GN-KS": { population: 283609, year: 2014, basis: "census" }, // Kissidougou Prefecture
  "GN-TE": { population: 283639, year: 2014, basis: "census" }, // Télimélé Prefecture
  "GN-DL": { population: 136320, year: 2014, basis: "census" }, // Dalaba Prefecture
  "GN-LA": { population: 318633, year: 2014, basis: "census" }, // Labé Prefecture
  "GN-PI": { population: 277059, year: 2014, basis: "census" }, // Pita Prefecture
  "GN-KO": { population: 268224, year: 2014, basis: "census" }, // Kouroussa Prefecture
  "GN-FR": { population: 96527, year: 2014, basis: "census" }, // Fria Prefecture

  // 2012 Census of Sri Lanka, Department of Census and Statistics (via Wikipedia)
  "LK-53": { population: 379541, year: 2012, basis: "census" }, // Trincomalee
  "LK-45": { population: 92238, year: 2012, basis: "census" }, // Mullaitivu
  "LK-41": { population: 583882, year: 2012, basis: "census" }, // Jaffna
  "LK-42": { population: 113510, year: 2012, basis: "census" }, // Kilinochchi
  "LK-43": { population: 99570, year: 2012, basis: "census" }, // Mannar
  "LK-12": { population: 2304833, year: 2012, basis: "census" }, // Gampaha
  "LK-11": { population: 2324349, year: 2012, basis: "census" }, // Colombo
  "LK-13": { population: 1221948, year: 2012, basis: "census" }, // Kalutara
  "LK-32": { population: 814048, year: 2012, basis: "census" }, // Matara
  "LK-33": { population: 599903, year: 2012, basis: "census" }, // Hambantota
  "LK-52": { population: 649402, year: 2012, basis: "census" }, // Ampara
  "LK-51": { population: 526567, year: 2012, basis: "census" }, // Batticaloa
  "LK-91": { population: 1088007, year: 2012, basis: "census" }, // Ratnapura
  "LK-82": { population: 451058, year: 2012, basis: "census" }, // Monaragala
  "LK-92": { population: 840648, year: 2012, basis: "census" }, // Kegalle
  "LK-81": { population: 815405, year: 2012, basis: "census" }, // Badulla
  "LK-22": { population: 484531, year: 2012, basis: "census" }, // Matale
  "LK-72": { population: 406088, year: 2012, basis: "census" }, // Polonnaruwa
  "LK-61": { population: 1618465, year: 2012, basis: "census" }, // Kurunegala
  "LK-23": { population: 711644, year: 2012, basis: "census" }, // Nuwara Eliya
  "LK-44": { population: 172115, year: 2012, basis: "census" }, // Vavuniya
  "LK-21": { population: 1375382, year: 2012, basis: "census" }, // Kandy

  // 2022 census, National Statistics Bureau, Seychelles (citypopulation.de)
  // SC-13 and SC-14 are both mislabelled "Grand'Anse Praslin" in subdivisionMeta.ts; the ISO
  // 3166-2:SC standard defines SC-13 = Grand'Anse Mahé and SC-14 = Grand'Anse Praslin, and the
  // figures below are assigned per the correct ISO code identity, not the existing (buggy) label.
  "SC-15": { population: 3934, year: 2022, basis: "census" }, // La Digue
  "SC-13": { population: 4140, year: 2022, basis: "census" }, // Grand'Anse Mahé
  "SC-06": { population: 4795, year: 2022, basis: "census" }, // Baie Lazare
  "SC-23": { population: 3871, year: 2022, basis: "census" }, // Takamaka
  "SC-05": { population: 5046, year: 2022, basis: "census" }, // Anse Royale
  "SC-04": { population: 5974, year: 2022, basis: "census" }, // Au Cap
  "SC-20": { population: 3750, year: 2022, basis: "census" }, // Pointe La Rue
  "SC-11": { population: 7263, year: 2022, basis: "census" }, // Cascade
  "SC-25": { population: 3828, year: 2022, basis: "census" }, // Roche Caiman
  "SC-19": { population: 4622, year: 2022, basis: "census" }, // Plaisance
  "SC-18": { population: 4055, year: 2022, basis: "census" }, // Mont Fleuri
  "SC-09": { population: 3129, year: 2022, basis: "census" }, // Bel Air
  "SC-16": { population: 4236, year: 2022, basis: "census" }, // La Rivière Anglaise (English River)
  "SC-03": { population: 6555, year: 2022, basis: "census" }, // Anse Etoile
  "SC-12": { population: 4496, year: 2022, basis: "census" }, // Glacis
  "SC-08": { population: 5603, year: 2022, basis: "census" }, // Beau Vallon
  "SC-10": { population: 4829, year: 2022, basis: "census" }, // Bel Ombre
  "SC-21": { population: 3243, year: 2022, basis: "census" }, // Port Glaud
  "SC-07": { population: 5063, year: 2022, basis: "census" }, // Baie Sainte Anne
  "SC-14": { population: 4344, year: 2022, basis: "census" }, // Grand'Anse Praslin
  "SC-17": { population: 3383, year: 2022, basis: "census" }, // Mont Buxton
  "SC-22": { population: 3692, year: 2022, basis: "census" }, // Saint Louis
  "SC-24": { population: 2719, year: 2022, basis: "census" }, // Les Mamelles

  // 2022 census, Maldives Bureau of Statistics (Table P2: Resident population by place of
  // enumeration and administrative division and intercensal growth rate, 2014 & 2022)
  "MV-29": { population: 9166, year: 2022, basis: "census" }, // Gnaviyani Atoll
  "MV-28": { population: 12775, year: 2022, basis: "census" }, // Gaafu Dhaalu Atoll
  "MV-27": { population: 9174, year: 2022, basis: "census" }, // Gaafu Alif Atoll
  "MV-00": { population: 10532, year: 2022, basis: "census" }, // Alif Dhaal Atoll
  "MV-26": { population: 17714, year: 2022, basis: "census" }, // Kaafu Atoll
  "MV-02": { population: 7997, year: 2022, basis: "census" }, // Alif Alif Atoll
  "MV-20": { population: 10655, year: 2022, basis: "census" }, // Baa Atoll
  "MV-03": { population: 8969, year: 2022, basis: "census" }, // Lhaviyani Atoll
  "MV-13": { population: 17565, year: 2022, basis: "census" }, // Raa Atoll
  "MV-24": { population: 13686, year: 2022, basis: "census" }, // Shaviyani Atoll
  "MV-05": { population: 14642, year: 2022, basis: "census" }, // Laamu Atoll
  "MV-08": { population: 10249, year: 2022, basis: "census" }, // Thaa Atoll
  "MV-17": { population: 6628, year: 2022, basis: "census" }, // Dhaalu Atoll
  "MV-12": { population: 5471, year: 2022, basis: "census" }, // Meemu Atoll
  "MV-14": { population: 4858, year: 2022, basis: "census" }, // Faafu Atoll
  "MV-04": { population: 1995, year: 2022, basis: "census" }, // Vaavu Atoll
  "MV-25": { population: 12481, year: 2022, basis: "census" }, // Noonu Atoll
  "MV-23": { population: 22534, year: 2022, basis: "census" }, // Haa Dhaalu Atoll
  "MV-07": { population: 14603, year: 2022, basis: "census" }, // Haa Alif Atoll

  // 2022 census, Bahamas Department of Statistics (geo-ref.net "Census Bahamas 2022"). Black
  // Point, Mangrove Cay, Central Eleuthera, Moore's Island and Central Abaco are deliberately
  // left unfilled: they do not appear as standalone rows in the primary source's district table.
  "BS-IN": { population: 831, year: 2022, basis: "census" }, // Inagua
  "BS-MG": { population: 203, year: 2022, basis: "census" }, // Mayaguana
  "BS-CK": { population: 293, year: 2022, basis: "census" }, // Crooked Island
  "BS-LI": { population: 2718, year: 2022, basis: "census" }, // Long Island
  "BS-SS": { population: 819, year: 2022, basis: "census" }, // San Salvador Island
  "BS-SA": { population: 3666, year: 2022, basis: "census" }, // South Andros
  "BS-NS": { population: 4029, year: 2022, basis: "census" }, // North Andros
  "BS-NE": { population: 3893, year: 2022, basis: "census" }, // North Eleuthera
  "BS-SE": { population: 5211, year: 2022, basis: "census" }, // South Eleuthera
  "BS-WG": { population: 5884, year: 2022, basis: "census" }, // West Grand Bahama
  "BS-EG": { population: 11194, year: 2022, basis: "census" }, // East Grand Bahama
  "BS-SO": { population: 6523, year: 2022, basis: "census" }, // South Abaco
  "BS-NO": { population: 10172, year: 2022, basis: "census" }, // North Abaco
  "BS-HI": { population: 1843, year: 2022, basis: "census" }, // Harbour Island

  // 2006 census, Libyan General Information Authority (via Wikipedia's 22-district table).
  // Ghadames, Nuqat al Khams, Ajdabiya, Al Qubbah and Mizdah are deliberately left unfilled:
  // they appear only in the older, uncited 32-district (2001-2007) table.
  "LY-MQ": { population: 78621, year: 2006, basis: "census" }, // Murzuq
  "LY-BU": { population: 159536, year: 2006, basis: "census" }, // Butnan
  "LY-WS": { population: 78532, year: 2006, basis: "census" }, // Ash Shati (Wadi al Shatii)
  "LY-GT": { population: 23518, year: 2006, basis: "census" }, // Ghat
  "LY-MI": { population: 550938, year: 2006, basis: "census" }, // Misrata
  "LY-MB": { population: 432202, year: 2006, basis: "census" }, // Murqub
  "LY-TN": { population: 1065405, year: 2006, basis: "census" }, // Tripoli District
  "LY-ZA": { population: 290993, year: 2006, basis: "census" }, // Zawiya
  "LY-JA": { population: 203156, year: 2006, basis: "census" }, // Jabal al Akhdar
  "LY-MJ": { population: 185848, year: 2006, basis: "census" }, // Marj
  "LY-JI": { population: 453198, year: 2006, basis: "census" }, // Jafara
  "LY-JU": { population: 52342, year: 2006, basis: "census" }, // Jufra
  "LY-SB": { population: 134162, year: 2006, basis: "census" }, // Sabha
  "LY-WD": { population: 76858, year: 2006, basis: "census" }, // Wadi al Hayaa (Wadi al Hayat)
};

async function fetchByQid(code, qid) {
  const q = `SELECT ?pop ?date ?method WHERE {
    wd:${qid} p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  const rows = (await sparql(q)).map((r) => ({ ...r, code: { value: code } }));
  return pickLatest(rows, "code").get(code) ?? null;
}

/** Keep, per code, the row with the most recent point-in-time. */
function pickLatest(rows, codeKey, popKey = "pop", dateKey = "date", methodKey = "method") {
  const best = new Map();
  for (const r of rows) {
    const code = CODE_ALIASES[r[codeKey]?.value] ?? r[codeKey]?.value;
    const date = r[dateKey]?.value;
    const pop = Number(r[popKey]?.value);
    if (!code || !date || !Number.isFinite(pop) || pop <= 0) continue; // dated only
    const year = yearOf(date);
    const isCensus = r[methodKey]?.value?.endsWith(CENSUS_QID) ?? false;
    const prev = best.get(code);
    if (!prev || year > prev.year) {
      best.set(code, { population: Math.round(pop), year, basis: isCensus ? "census" : "estimate" });
    }
  }
  return best;
}

async function fetchSubdivisions(cc) {
  const q = `SELECT ?code ?pop ?date ?method WHERE {
    ?item wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?item p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  return pickLatest(await sparql(q), "code");
}

async function fetchNational(cc) {
  const q = `SELECT ?c ?pop ?date ?method WHERE {
    ?c wdt:P297 "${cc}" .
    ?c p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  const best = pickLatest(await sparql(q), "c");
  // there is at most one country item; return its figure
  return [...best.values()][0] ?? null;
}

/**
 * Some subdivisions (mostly external territories / crown dependencies, e.g.
 * Norfolk Island, the Cayman Islands, the US Virgin Islands) have a dated
 * Wikidata population statement but no P300 (ISO 3166-2 code) property, so
 * the P300-filtered queries above can never find them — not a missing
 * figure, just a missing link in Wikidata. Loading the *previous* run's
 * output as a baseline and only ever adding to it (never dropping a code the
 * new fetch didn't return) means a refresh can't silently regress coverage,
 * matching this project's "never reduce bundled information" rule.
 */
function loadExisting(path, sectionRe, entryRe) {
  const map = new Map();
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return map;
  }
  const section = text.match(sectionRe);
  if (!section) return map;
  for (const m of section[1].matchAll(entryRe)) map.set(m[1], m.slice(2));
  return map;
}

function loadExistingSubdivisions() {
  const raw = loadExisting(
    OUTPUT,
    /SUBDIVISION_POPULATION:[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*\{\s*population:\s*(\d+),\s*year:\s*(\d+),\s*basis:\s*"(\w+)"\s*\}/g,
  );
  const out = new Map();
  for (const [code, [pop, year, basis]] of raw) {
    out.set(code, { population: Number(pop), year: Number(year), basis });
  }
  return out;
}

function loadExistingNational() {
  const raw = loadExisting(
    OUTPUT,
    /NATIONAL_REFERENCE_POPULATION[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*(\d+)/g,
  );
  const out = new Map();
  for (const [cc, [pop]] of raw) out.set(cc, Number(pop));
  return out;
}

async function main() {
  const codes = countryCodes();
  const subdivisions = new Map(); // code -> {population, year, basis}
  const national = new Map(); // CC -> population

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const subs = await fetchSubdivisions(cc);
      for (const [k, v] of subs) subdivisions.set(k, v);
      const nat = await fetchNational(cc);
      if (nat) national.set(cc, nat.population);
      console.log(`→ ${subs.size} subdivisions`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200); // be polite
  }

  console.log("\nFetching subdivisions with no Wikidata P300 code (by QID)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_QIDS)) {
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        subdivisions.set(code, v);
        console.log(`  ${code} (${qid}) → ${v.population} (${v.year}, ${v.basis})`);
      } else {
        console.log(`  ${code} (${qid}) → no dated population found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1500);
  }

  console.log("\nFetching verified name-matched subdivisions (by QID)...");
  for (const [code, qid] of Object.entries(VERIFIED_NAME_MATCH_QIDS)) {
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        subdivisions.set(code, v);
        console.log(`  ${code} (${qid}) → ${v.population} (${v.year}, ${v.basis})`);
      } else {
        console.log(`  ${code} (${qid}) → no dated population found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1500);
  }

  console.log("\nApplying manually verified population figures...");
  for (const [code, v] of Object.entries(MANUAL_VERIFIED_POPULATION)) {
    subdivisions.set(code, v);
    console.log(`  ${code} → ${v.population} (${v.year}, ${v.basis})`);
  }

  // Never let a refresh drop a code the new fetch didn't return — preserve
  // any previously-known figure (e.g. territories Wikidata doesn't tag with
  // P300) instead of silently losing coverage.
  let preserved = 0;
  for (const [code, v] of loadExistingSubdivisions()) {
    if (!subdivisions.has(code)) {
      subdivisions.set(code, v);
      preserved++;
    }
  }
  let preservedNational = 0;
  for (const [cc, pop] of loadExistingNational()) {
    if (!national.has(cc)) {
      national.set(cc, pop);
      preservedNational++;
    }
  }
  if (preserved > 0 || preservedNational > 0) {
    console.log(
      `\nPreserved ${preserved} subdivision(s) and ${preservedNational} national total(s) ` +
        `from the previous run that the new fetch didn't return.`,
    );
  }

  writeOutput(subdivisions, national);
}

function writeOutput(subdivisions, national) {
  // group subdivision codes by country prefix, sorted
  const byCountry = new Map();
  for (const [code, v] of subdivisions) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    const rows = byCountry.get(cc).sort((a, b) => b[1].population - a[1].population);
    for (const [code, v] of rows) {
      body += `  ${JSON.stringify(code)}: { population: ${v.population}, year: ${v.year}, basis: ${JSON.stringify(v.basis)} },\n`;
    }
  }

  let natBody = "";
  for (const cc of [...national.keys()].sort()) {
    natBody += `  ${JSON.stringify(cc)}: ${national.get(cc)},\n`;
  }

  const ts = `// Auto-generated by scripts/build-subdivision-population.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata (population P1082 + point-in-time P585 + determination method P459,
// keyed by ISO 3166-2 code P300). Each figure is the most recent *dated* population
// statement for that subdivision, so the Learn-mode panel can always state the year.
//
// To refresh: node scripts/build-subdivision-population.mjs (needs egress to
// query.wikidata.org). The generator only re-formats authoritative source data — it
// never invents a figure; a subdivision with no dated Wikidata population is omitted.

export type SubdivisionPopulation = {
  /** Total resident population of the whole subdivision. */
  population: number;
  /** Reference year of the figure (point-in-time of the Wikidata statement). */
  year: number;
  /** How the figure was produced — shown after the year ("2021 census"). */
  basis: "census" | "estimate";
};

// National totals (latest dated country-level P1082), used purely as the
// denominator when computing a subdivision's share of the national population
// if the live national figure is unavailable. Never shown as "the national
// population" — the country widget owns that, live.
export const NATIONAL_REFERENCE_POPULATION: Record<string, number> = {
${natBody}};

export const SUBDIVISION_POPULATION: Record<string, SubdivisionPopulation> = {
${body}};
`;

  writeFileSync(OUTPUT, ts);
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${subdivisions.size} subdivisions across ${countries.length} countries`);
  console.log(`  ${national.size} national reference totals`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
