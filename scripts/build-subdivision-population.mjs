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

  // Papua New Guinea, National Statistical Office 2011 Census (via citypopulation.de aggregation)
  "PG-CPM": { population: 269756, year: 2011, basis: "census" }, // Central
  "PG-CPK": { population: 376473, year: 2011, basis: "census" }, // Chimbu (Simbu)
  "PG-EBR": { population: 328369, year: 2011, basis: "census" }, // East New Britain
  "PG-ESW": { population: 450530, year: 2011, basis: "census" }, // East Sepik
  "PG-EHG": { population: 579825, year: 2011, basis: "census" }, // Eastern Highlands
  "PG-EPW": { population: 432045, year: 2011, basis: "census" }, // Enga
  "PG-GPK": { population: 158197, year: 2011, basis: "census" }, // Gulf
  "PG-MPM": { population: 493906, year: 2011, basis: "census" }, // Madang
  "PG-MRL": { population: 60485, year: 2011, basis: "census" }, // Manus
  "PG-MBA": { population: 276512, year: 2011, basis: "census" }, // Milne Bay
  "PG-MPL": { population: 674810, year: 2011, basis: "census" }, // Morobe
  "PG-NIK": { population: 194067, year: 2011, basis: "census" }, // New Ireland
  "PG-NPP": { population: 186309, year: 2011, basis: "census" }, // Oro (Northern)
  "PG-NSB": { population: 249358, year: 2011, basis: "census" }, // Bougainville
  "PG-SAN": { population: 248411, year: 2011, basis: "census" }, // Sandaun (West Sepik)
  "PG-SHM": { population: 510245, year: 2011, basis: "census" }, // Southern Highlands
  "PG-WBK": { population: 264264, year: 2011, basis: "census" }, // West New Britain

  // Solomon Islands, National Statistics Office (SINSO) 2019 Census
  "SB-CE": { population: 30318, year: 2019, basis: "census" }, // Central
  "SB-CH": { population: 30775, year: 2019, basis: "census" }, // Choiseul
  "SB-GU": { population: 154022, year: 2019, basis: "census" }, // Guadalcanal
  "SB-CT": { population: 129569, year: 2019, basis: "census" }, // Honiara
  "SB-IS": { population: 31420, year: 2019, basis: "census" }, // Isabel
  "SB-MK": { population: 51587, year: 2019, basis: "census" }, // Makira-Ulawa
  "SB-ML": { population: 172740, year: 2019, basis: "census" }, // Malaita
  "SB-RB": { population: 4100, year: 2019, basis: "census" }, // Rennell and Bellona
  "SB-TE": { population: 22319, year: 2019, basis: "census" }, // Temotu
  "SB-WE": { population: 94106, year: 2019, basis: "census" }, // Western

  // Vanuatu, National Statistics Office 2020 Census. Sanma and Shefa omitted —
  // two independent queries against the same secondary source returned
  // conflicting figures that could not be reconciled against the primary PDF.
  "VU-MAP": { population: 42499, year: 2020, basis: "census" }, // Malampa
  "VU-PAM": { population: 35607, year: 2020, basis: "census" }, // Penama
  "VU-TAE": { population: 45714, year: 2020, basis: "census" }, // Tafea
  "VU-TOB": { population: 11330, year: 2020, basis: "census" }, // Torba

  // Samoa, Samoa Bureau of Statistics 2021 Census
  "WS-AA": { population: 24563, year: 2021, basis: "census" }, // A'ana
  "WS-AL": { population: 5000, year: 2021, basis: "census" }, // Aiga-i-le-Tai
  "WS-AT": { population: 23926, year: 2021, basis: "census" }, // Atua
  "WS-FA": { population: 14831, year: 2021, basis: "census" }, // Fa'asaleleaga
  "WS-GE": { population: 5548, year: 2021, basis: "census" }, // Gaga'emauga
  "WS-GI": { population: 4797, year: 2021, basis: "census" }, // Gaga'ifomauga
  "WS-PA": { population: 9251, year: 2021, basis: "census" }, // Palauli
  "WS-SA": { population: 5403, year: 2021, basis: "census" }, // Satupa'itea
  "WS-TU": { population: 103801, year: 2021, basis: "census" }, // Tuamasaga
  "WS-VF": { population: 1680, year: 2021, basis: "census" }, // Va'a-o-Fonoti
  "WS-VS": { population: 6757, year: 2021, basis: "census" }, // Vaisigano

  // Tonga, Statistics Department 2021 Census
  "TO-02": { population: 5665, year: 2021, basis: "census" }, // Ha'apai
  "TO-03": { population: 1148, year: 2021, basis: "census" }, // Niuas
  "TO-04": { population: 74320, year: 2021, basis: "census" }, // Tongatapu
  "TO-05": { population: 14182, year: 2021, basis: "census" }, // Vava'u
  "TO-01": { population: 4864, year: 2021, basis: "census" }, // 'Eua

  // Bermuda, Dept of Statistics 2016 Census Parish Profiles (gov.bm). BM-SG
  // omitted — two conflicting figures (1,298 vs 1,527) both attributed to the
  // 2016 census, neither resolvable against a single confirmed source PDF.
  "BM-DEV": { population: 8127, year: 2016, basis: "census" }, // Devonshire
  "BM-HAM": { population: 4131, year: 2016, basis: "census" }, // Hamilton Parish
  "BM-HA": { population: 854, year: 2016, basis: "census" }, // City of Hamilton
  "BM-PAG": { population: 4708, year: 2016, basis: "census" }, // Paget
  "BM-PEM": { population: 10118, year: 2016, basis: "census" }, // Pembroke
  "BM-SAN": { population: 8593, year: 2016, basis: "census" }, // Sandys
  "BM-SGE": { population: 4549, year: 2016, basis: "census" }, // St. George's Parish
  "BM-SMI": { population: 4773, year: 2016, basis: "census" }, // Smith's
  "BM-SOU": { population: 5816, year: 2016, basis: "census" }, // Southampton
  "BM-WAR": { population: 8077, year: 2016, basis: "census" }, // Warwick

  // Trinidad and Tobago, CSO 2011 Population & Housing Census Community
  // Register (official xlsx, cso.gov.tt), subtotal rows
  "TT-POS": { population: 37074, year: 2011, basis: "census" }, // Port of Spain
  "TT-SFO": { population: 55419, year: 2011, basis: "census" }, // San Fernando
  "TT-ARI": { population: 33606, year: 2011, basis: "census" }, // Arima
  "TT-CHA": { population: 83516, year: 2011, basis: "census" }, // Chaguanas
  "TT-PTF": { population: 20083, year: 2011, basis: "census" }, // Point Fortin
  "TT-DMN": { population: 105910, year: 2011, basis: "census" }, // Diego Martin
  "TT-SJL": { population: 156792, year: 2011, basis: "census" }, // San Juan-Laventille
  "TT-TUP": { population: 212170, year: 2011, basis: "census" }, // Tunapuna-Piarco
  "TT-CTT": { population: 80049, year: 2011, basis: "census" }, // Couva-Tabaquite-Talparo
  "TT-RCM": { population: 33486, year: 2011, basis: "census" }, // Mayaro-Rio Claro
  "TT-PRT": { population: 72175, year: 2011, basis: "census" }, // Princes Town
  "TT-SGE": { population: 87866, year: 2011, basis: "census" }, // Sangre Grande
  "TT-SIP": { population: 152217, year: 2011, basis: "census" }, // Siparia
  "TT-PED": { population: 55708, year: 2011, basis: "census" }, // Penal-Debe

  // Saint Vincent and the Grenadines, Statistical Office 2012 Census
  // Preliminary Report. Only the Grenadines split maps cleanly to an ISO
  // parish; the 13 census divisions don't align 1:1 with the other 5 parishes.
  "VC-06": { population: 10234, year: 2012, basis: "census" }, // Grenadines (Northern 6,184 + Southern 4,050)

  // Grenada, Central Statistical Office 2011 National Population & Housing
  // Census Report (Table 1.3.1/1.3.2) — supersedes the conflicting
  // "Population Estimates by Parish 2011-2019" secondary series; all 7
  // figures sum exactly to the document's stated total of 106,669.
  "GD-01": { population: 26501, year: 2011, basis: "census" }, // Saint Andrew
  "GD-02": { population: 12877, year: 2011, basis: "census" }, // Saint David
  "GD-03": { population: 38249, year: 2011, basis: "census" }, // Saint George
  "GD-04": { population: 8469, year: 2011, basis: "census" }, // Saint John
  "GD-05": { population: 4408, year: 2011, basis: "census" }, // Saint Mark
  "GD-06": { population: 10504, year: 2011, basis: "census" }, // Saint Patrick
  "GD-10": { population: 5661, year: 2011, basis: "census" }, // Carriacou and Petite Martinique

  // Haiti, IHSI/DSDS "Estimations Désagrégées de la Population Haïtienne en
  // 2024" (July 2024) — all 10 figures sum exactly to the document's stated
  // national total of 11,867,032.
  "HT-OU": { population: 4038816, year: 2024, basis: "estimate" }, // Ouest
  "HT-SE": { population: 749803, year: 2024, basis: "estimate" }, // Sud-Est
  "HT-ND": { population: 1172476, year: 2024, basis: "estimate" }, // Nord
  "HT-NE": { population: 430925, year: 2024, basis: "estimate" }, // Nord-Est
  "HT-AR": { population: 1896380, year: 2024, basis: "estimate" }, // Artibonite
  "HT-CE": { population: 852280, year: 2024, basis: "estimate" }, // Centre
  "HT-SD": { population: 955607, year: 2024, basis: "estimate" }, // Sud
  "HT-GA": { population: 570687, year: 2024, basis: "estimate" }, // Grand'Anse
  "HT-NO": { population: 797013, year: 2024, basis: "estimate" }, // Nord-Ouest
  "HT-NI": { population: 403045, year: 2024, basis: "estimate" }, // Nippes

  // Zambia, Zambia Statistics Agency 2022 Census of Population and Housing
  // (checksum-verified against the national total)
  "ZM-01": { population: 1043159, year: 2022, basis: "census" }, // Western
  "ZM-02": { population: 2204426, year: 2022, basis: "census" }, // Central
  "ZM-03": { population: 2191047, year: 2022, basis: "census" }, // Eastern
  "ZM-04": { population: 1156629, year: 2022, basis: "census" }, // Luapula
  "ZM-05": { population: 1747177, year: 2022, basis: "census" }, // Northern
  "ZM-06": { population: 961385, year: 2022, basis: "census" }, // North-Western
  "ZM-07": { population: 1855426, year: 2022, basis: "census" }, // Southern
  "ZM-08": { population: 2706609, year: 2022, basis: "census" }, // Copperbelt
  "ZM-09": { population: 3360918, year: 2022, basis: "census" }, // Lusaka
  "ZM-10": { population: 1042841, year: 2022, basis: "census" }, // Muchinga

  // Benin, INSAE RGPH-4 2013 census (instad.bj)
  "BJ-AL": { population: 861166, year: 2013, basis: "census" }, // Alibori
  "BJ-AK": { population: 769337, year: 2013, basis: "census" }, // Atakora
  "BJ-AQ": { population: 1396671, year: 2013, basis: "census" }, // Atlantique
  "BJ-BO": { population: 1212646, year: 2013, basis: "census" }, // Borgou
  "BJ-CO": { population: 717763, year: 2013, basis: "census" }, // Collines
  "BJ-KO": { population: 741895, year: 2013, basis: "census" }, // Kouffo
  "BJ-LI": { population: 678874, year: 2013, basis: "census" }, // Littoral (Cotonou)
  "BJ-DO": { population: 543130, year: 2013, basis: "census" }, // Donga
  "BJ-MO": { population: 495307, year: 2013, basis: "census" }, // Mono
  "BJ-OU": { population: 1100404, year: 2013, basis: "census" }, // Ouémé
  "BJ-PL": { population: 622372, year: 2013, basis: "census" }, // Plateau
  "BJ-ZO": { population: 851580, year: 2013, basis: "census" }, // Zou

  // Republic of the Congo, INS-Congo RGPH-5 2023 census (checksum-verified
  // against press-cited totals)
  "CG-BZV": { population: 2295127, year: 2023, basis: "census" }, // Brazzaville
  "CG-16": { population: 1268706, year: 2023, basis: "census" }, // Pointe-Noire
  "CG-11": { population: 275531, year: 2023, basis: "census" }, // Bouenza
  "CG-8": { population: 269408, year: 2023, basis: "census" }, // Cuvette
  "CG-15": { population: 94254, year: 2023, basis: "census" }, // Cuvette-Ouest
  "CG-7": { population: 145378, year: 2023, basis: "census" }, // Likouala
  "CG-2": { population: 104728, year: 2023, basis: "census" }, // Lékoumou
  "CG-9": { population: 259884, year: 2023, basis: "census" }, // Niari
  "CG-14": { population: 261636, year: 2023, basis: "census" }, // Plateaux
  "CG-12": { population: 308162, year: 2023, basis: "census" }, // Pool
  "CG-13": { population: 104645, year: 2023, basis: "census" }, // Sangha
  "CG-5": { population: 149375, year: 2023, basis: "census" }, // Kouilou

  // Comoros, INSEED RGPH 2017 census
  "KM-G": { population: 361308, year: 2017, basis: "census" }, // Andjazîdja (Grande Comore)
  "KM-A": { population: 327382, year: 2017, basis: "census" }, // Anjouan
  "KM-M": { population: 40310, year: 2017, basis: "census" }, // Mohéli

  // Ghana, Ghana Statistical Service 2021 PHC. The codebase carries the
  // pre-2018 10-region boundaries; the 2021 census reports only the 16 new
  // regions directly, so figures are reconstituted by summing each old
  // region's known successor regions per GSS's own documented split lineage.
  // Checksum exact against the published national total (30,792,608).
  "GH-WP": { population: 2938080, year: 2021, basis: "census" }, // Western (Western + Western North)
  "GH-CP": { population: 2859821, year: 2021, basis: "census" }, // Central
  "GH-AA": { population: 5446237, year: 2021, basis: "census" }, // Greater Accra
  "GH-TV": { population: 2396750, year: 2021, basis: "census" }, // Volta (Volta + Oti)
  "GH-EP": { population: 2917039, year: 2021, basis: "census" }, // Eastern
  "GH-AH": { population: 5432485, year: 2021, basis: "census" }, // Ashanti
  "GH-BA": { population: 2976807, year: 2021, basis: "census" }, // Brong-Ahafo (Bono + Bono East + Ahafo)
  "GH-NP": { population: 3619473, year: 2021, basis: "census" }, // Northern (Northern + Savannah + North East)
  "GH-UE": { population: 1301221, year: 2021, basis: "census" }, // Upper East
  "GH-UW": { population: 904695, year: 2021, basis: "census" }, // Upper West

  // Somalia, UNFPA Population Estimation Survey 2014 — pre-war 18-region
  // basis; no government census has been held since 1975, so basis is
  // "estimate" throughout.
  "SO-NU": { population: 392698, year: 2014, basis: "estimate" }, // Nugal
  "SO-MU": { population: 717863, year: 2014, basis: "estimate" }, // Mudug
  "SO-GA": { population: 569434, year: 2014, basis: "estimate" }, // Galguduud
  "SO-HI": { population: 520685, year: 2014, basis: "estimate" }, // Hiran
  "SO-BK": { population: 367226, year: 2014, basis: "estimate" }, // Bakool
  "SO-GE": { population: 508405, year: 2014, basis: "estimate" }, // Gedo
  "SO-BR": { population: 719512, year: 2014, basis: "estimate" }, // Bari
  "SO-JH": { population: 489307, year: 2014, basis: "estimate" }, // Lower Juba
  "SO-JD": { population: 362921, year: 2014, basis: "estimate" }, // Middle Juba
  "SO-SH": { population: 1202219, year: 2014, basis: "estimate" }, // Lower Shebelle
  "SO-BN": { population: 1650227, year: 2014, basis: "estimate" }, // Banaadir
  "SO-SD": { population: 516036, year: 2014, basis: "estimate" }, // Middle Shebelle
  "SO-BY": { population: 792182, year: 2014, basis: "estimate" }, // Bay

  // Sudan, 2008 Fifth Population Census (CBS Sudan). SD-DE (East Darfur) and
  // SD-DC (Central Darfur) omitted — both states were created in 2012 from
  // South/West Darfur and did not exist as separate units in 2008; SD-GK
  // (West Kordofan) and SD-DS (South Darfur) below are 2008-era figures
  // retrofitted onto states later split, per the source's own documentation.
  "SD-KH": { population: 5274321, year: 2008, basis: "census" }, // Khartoum
  "SD-GZ": { population: 3575280, year: 2008, basis: "census" }, // Al Jazirah
  "SD-NW": { population: 1480015, year: 2008, basis: "census" }, // White Nile
  "SD-NR": { population: 1130412, year: 2008, basis: "census" }, // River Nile
  "SD-NO": { population: 706055, year: 2008, basis: "census" }, // Northern
  "SD-RS": { population: 1396097, year: 2008, basis: "census" }, // Red Sea
  "SD-KA": { population: 1781999, year: 2008, basis: "census" }, // Kassala
  "SD-GD": { population: 1448591, year: 2008, basis: "census" }, // Al Qadarif
  "SD-SI": { population: 1285717, year: 2008, basis: "census" }, // Sennar
  "SD-NB": { population: 832112, year: 2008, basis: "census" }, // Blue Nile
  "SD-KN": { population: 2920992, year: 2008, basis: "census" }, // North Kordofan
  "SD-KS": { population: 1406404, year: 2008, basis: "census" }, // South Kordofan
  "SD-GK": { population: 1665725, year: 2008, basis: "census" }, // West Kordofan
  "SD-DN": { population: 2113626, year: 2008, basis: "census" }, // North Darfur
  "SD-DW": { population: 1264043, year: 2008, basis: "census" }, // West Soudan (West Darfur)
  "SD-DS": { population: 4093594, year: 2008, basis: "census" }, // South Darfur

  // Mauritania, ANSADE recensement 2023-12-25 (checksum exact: sum 4,927,530
  // against published national total 4,927,532)
  "MR-01": { population: 625643, year: 2023, basis: "census" }, // Hodh Ech Chargui
  "MR-02": { population: 403089, year: 2023, basis: "census" }, // Hodh El Gharbi
  "MR-03": { population: 451804, year: 2023, basis: "census" }, // Assaba
  "MR-04": { population: 442490, year: 2023, basis: "census" }, // Gorgol
  "MR-05": { population: 391310, year: 2023, basis: "census" }, // Brakna
  "MR-06": { population: 323903, year: 2023, basis: "census" }, // Trarza
  "MR-07": { population: 71623, year: 2023, basis: "census" }, // Adrar
  "MR-08": { population: 184459, year: 2023, basis: "census" }, // Dakhlet Nouadhibou
  "MR-09": { population: 114760, year: 2023, basis: "census" }, // Tagant
  "MR-10": { population: 363075, year: 2023, basis: "census" }, // Guidimaka
  "MR-11": { population: 79129, year: 2023, basis: "census" }, // Tiris Zemmour
  "MR-12": { population: 29484, year: 2023, basis: "census" }, // Inchiri
  "MR-NKC": { population: 1446761, year: 2023, basis: "census" }, // Nouakchott

  // Gambia, Gambia Bureau of Statistics 2013 Population and Housing Census
  // (checksum exact against the national total 1,857,181)
  "GM-B": { population: 31054, year: 2013, basis: "census" }, // Banjul
  "GM-W": { population: 688744, year: 2013, basis: "census" }, // West Coast
  "GM-L": { population: 81042, year: 2013, basis: "census" }, // Lower River
  "GM-N": { population: 220080, year: 2013, basis: "census" }, // North Bank
  "GM-M": { population: 221907, year: 2013, basis: "census" }, // Central River (Kuntaur + Janjanbureh LGAs)
  "GM-U": { population: 237220, year: 2013, basis: "census" }, // Upper River

  // Mauritius, Statistics Mauritius / Central Statistical Office, 2022 census.
  // The 9 mainland districts sum to 1,189,493 vs. the official island total
  // of 1,191,280 — a small (~0.15%) unreconciled gap; Rodrigues and Agalega
  // are taken directly from the official press release. The 4 city codes
  // (MU-BR/QB/VP/CU) are not broken out in any source found and are omitted.
  "MU-PL": { population: 106332, year: 2022, basis: "census" }, // Port Louis
  "MU-PA": { population: 140856, year: 2022, basis: "census" }, // Pamplemousses
  "MU-RR": { population: 111195, year: 2022, basis: "census" }, // Rivière du Rempart
  "MU-FL": { population: 138529, year: 2022, basis: "census" }, // Flacq
  "MU-GP": { population: 110783, year: 2022, basis: "census" }, // Grand Port
  "MU-SA": { population: 67779, year: 2022, basis: "census" }, // Savanne
  "MU-PW": { population: 340780, year: 2022, basis: "census" }, // Plaines Wilhems
  "MU-MO": { population: 85538, year: 2022, basis: "census" }, // Moka
  "MU-BL": { population: 87701, year: 2022, basis: "census" }, // Rivière Noire
  "MU-RO": { population: 43650, year: 2022, basis: "census" }, // Rodrigues
  "MU-AG": { population: 330, year: 2022, basis: "census" }, // Agaléga

  // Botswana, Statistics Botswana 2022 PHC Preliminary Results. 6 of these 15
  // are sums of official census-district components per Statistics
  // Botswana's own reconciliation notes (Appendix 3); total under-counts the
  // true national figure (2,346,179) by ~16,500 — gap not resolved.
  "BW-GA": { population: 244107, year: 2022, basis: "census" }, // Gaborone
  "BW-FR": { population: 102444, year: 2022, basis: "census" }, // Francistown
  "BW-LO": { population: 29457, year: 2022, basis: "census" }, // Lobatse
  "BW-SP": { population: 41839, year: 2022, basis: "census" }, // Selebi-Phikwe
  "BW-JW": { population: 18576, year: 2022, basis: "census" }, // Jwaneng
  "BW-ST": { population: 2901, year: 2022, basis: "census" }, // Sowa
  "BW-SO": { population: 221968, year: 2022, basis: "census" }, // Southern (Ngwaketse + Barolong + Ngwaketse West)
  "BW-SE": { population: 111474, year: 2022, basis: "census" }, // South-East
  "BW-KW": { population: 387703, year: 2022, basis: "census" }, // Kweneng (East + West)
  "BW-KL": { population: 121411, year: 2022, basis: "census" }, // Kgatleng
  "BW-CE": { population: 668854, year: 2022, basis: "census" }, // Central
  "BW-NE": { population: 68910, year: 2022, basis: "census" }, // North-East
  "BW-NW": { population: 196224, year: 2022, basis: "census" }, // North-West (Ngamiland East + West)
  "BW-GH": { population: 55884, year: 2022, basis: "census" }, // Ghanzi (Ghanzi + CKGR)
  "BW-KG": { population: 58375, year: 2022, basis: "census" }, // Kgalagadi (South + North)

  // Zimbabwe, ZIMSTAT 2022 PHC Preliminary Report, Table 1.2 (checksum exact
  // against the national total 15,178,979)
  "ZW-BU": { population: 665940, year: 2022, basis: "census" }, // Bulawayo
  "ZW-MA": { population: 2037762, year: 2022, basis: "census" }, // Manicaland
  "ZW-MC": { population: 1384891, year: 2022, basis: "census" }, // Mashonaland Central
  "ZW-ME": { population: 1731181, year: 2022, basis: "census" }, // Mashonaland East
  "ZW-MW": { population: 1893578, year: 2022, basis: "census" }, // Mashonaland West
  "ZW-MN": { population: 827626, year: 2022, basis: "census" }, // Matabeleland North
  "ZW-MS": { population: 760345, year: 2022, basis: "census" }, // Matabeleland South
  "ZW-MI": { population: 1811908, year: 2022, basis: "census" }, // Midlands
  "ZW-MV": { population: 1638539, year: 2022, basis: "census" }, // Masvingo
  "ZW-HA": { population: 2427209, year: 2022, basis: "census" }, // Harare

  // Djibouti, INSTAD RGPH-3 2024-05-20 (checksum exact against the national
  // total 1,066,809)
  "DJ-DJ": { population: 767250, year: 2024, basis: "census" }, // Djibouti (city/region)
  "DJ-AS": { population: 76414, year: 2024, basis: "census" }, // Ali Sabieh
  "DJ-AR": { population: 48922, year: 2024, basis: "census" }, // Arta
  "DJ-DI": { population: 66196, year: 2024, basis: "census" }, // Dikhil
  "DJ-TA": { population: 60645, year: 2024, basis: "census" }, // Tadjourah
  "DJ-OB": { population: 47382, year: 2024, basis: "census" }, // Obock

  // Azerbaijan, State Statistical Committee 2019 census. AZ-CAB (Jabrayil)
  // omitted — the district was occupied/depopulated until liberated Nov 2020
  // and has no official published population figure during resettlement.
  "AZ-TAR": { population: 73627, year: 2019, basis: "census" }, // Tartar
  "AZ-BAR": { population: 182633, year: 2019, basis: "census" }, // Barda
  "AZ-KUR": { population: 111483, year: 2019, basis: "census" }, // Kurdamir
  "AZ-AGS": { population: 103267, year: 2019, basis: "census" }, // Agdash
  "AZ-CAL": { population: 207565, year: 2019, basis: "census" }, // Jalilabad
  "AZ-IMI": { population: 129259, year: 2019, basis: "census" }, // Imishli
  "AZ-FUZ": { population: 63582, year: 2019, basis: "census" }, // Fuzuli
  "AZ-SIY": { population: 40896, year: 2019, basis: "census" }, // Siyazan
  "AZ-DAS": { population: 33797, year: 2019, basis: "census" }, // Dashkasan
  "AZ-KAN": { population: 32621, year: 2019, basis: "census" }, // Kangarli
  "AZ-AGU": { population: 77712, year: 2019, basis: "census" }, // Agsu
  "AZ-TOV": { population: 164119, year: 2019, basis: "census" }, // Tovuz

  // Kuwait, Central Statistical Office 2021 census (registered population, 30 June 2021)
  "KW-JA": { population: 566861, year: 2021, basis: "census" }, // Al Jahra
  "KW-MU": { population: 279666, year: 2021, basis: "census" }, // Mubarak Al-Kabeer
  "KW-HA": { population: 926170, year: 2021, basis: "census" }, // Hawally
  "KW-KU": { population: 574839, year: 2021, basis: "census" }, // Capital
  "KW-FA": { population: 1110560, year: 2021, basis: "census" }, // Al Farwaniyah

  // Jordan, Department of Statistics, General Population and Housing Census
  // 2015 (census date 30 Nov 2015)
  "JO-IR": { population: 1770158, year: 2015, basis: "census" }, // Irbid
  "JO-AT": { population: 96291, year: 2015, basis: "census" }, // Tafilah
  "JO-AQ": { population: 188160, year: 2015, basis: "census" }, // Aqaba
  "JO-AZ": { population: 1364878, year: 2015, basis: "census" }, // Zarqa

  // Lebanon, Ministry of Public Health / UNHCR / Lebanese Palestinian
  // Dialogue Committee 2017 composite estimate — same source pattern already
  // used for the other bundled Lebanon entries (CAS has not run a full census since 1932)
  "LB-AS": { population: 790951, year: 2017, basis: "estimate" }, // North
  "LB-BA": { population: 433249, year: 2017, basis: "estimate" }, // Beirut

  // Malaysia, Department of Statistics Malaysia, Census 2020 (MyCensus 2020)
  "MY-08": { population: 2611600, year: 2020, basis: "census" }, // Perak
  "MY-06": { population: 1750100, year: 2020, basis: "census" }, // Pahang

  // Philippines, Philippine Statistics Authority 2024 Census of Population (POPCEN)
  "PH-BCD": { population: 624787, year: 2024, basis: "census" }, // Bacolod
  "PH-MDE": { population: 364482, year: 2024, basis: "census" }, // Mandaue
  "PH-LAP": { population: 497813, year: 2024, basis: "census" }, // Lapu-Lapu
  "PH-MNL": { population: 14001751, year: 2024, basis: "census" }, // Metro Manila (as of 1 July 2024)

  // Uzbekistan, State Statistics Committee (Stat.uz), permanent population as of 1 January 2024
  "UZ-SI": { population: 914000, year: 2024, basis: "estimate" }, // Sirdaryo
  "UZ-SU": { population: 2877100, year: 2024, basis: "estimate" }, // Surxondaryo

  // North Macedonia, State Statistical Office
  "MK-29": { population: 44844, year: 2021, basis: "census" }, // Gjorče Petrov
  "MK-15": { population: 1322, year: 2002, basis: "census" }, // Vraneštica (dissolved into Kičevo Municipality in 2013; no later count exists)
  "MK-20": { population: 3233, year: 2021, basis: "census" }, // Gradsko

  // Portugal, Instituto Nacional de Estatística, Census 2021 (21 March 2021)
  "PT-02": { population: 144401, year: 2021, basis: "census" }, // Beja
  "PT-11": { population: 2275385, year: 2021, basis: "census" }, // Lisbon
  "PT-13": { population: 1785405, year: 2021, basis: "census" }, // Porto

  // Saint Helena, Ascension and Tristan da Cunha, St Helena Government
  // Statistics Office 2021 census
  "SH-HL": { population: 4439, year: 2021, basis: "census" }, // Saint Helena (7 Feb 2021)
  "SH-AC": { population: 1023, year: 2021, basis: "census" }, // Ascension (March 2021)
  "SH-TA": { population: 260, year: 2021, basis: "census" }, // Tristan da Cunha (March 2021)

  // Statistics Faroe Islands (Hagstova Føroya), population register, 1 July 2025
  "DK-FO": { population: 55042, year: 2025, basis: "estimate" }, // Faroe Islands
  // Statistics Norway (SSB), Population Register of Svalbard, 1 Jan 2026.
  // Norwegian-administered settlements only (Longyearbyen + Ny-Ålesund) — per project
  // rule, a subdivision's population follows its parent country's own administrative
  // count, not a total that includes the Russian-administered Barentsburg/Pyramiden.
  "NO-21": { population: 2512, year: 2026, basis: "estimate" }, // Svalbard
  // Central Statistics Office (CSO) Ireland, Census of Population 2022 (3 Apr 2022)
  "IE-DL": { population: 167084, year: 2022, basis: "census" }, // Donegal
  // Statistical Office in Katowice / GUS (Statistics Poland), end-2024 estimate.
  // PL-SL is the pre-2018 ISO 3166-2 code for the same entity as PL-24 (Śląskie).
  "PL-SL": { population: 4291400, year: 2024, basis: "estimate" }, // Śląskie
  // State Statistical Office of North Macedonia, Census 2021 (5 Sep 2021)
  "MK-50": { population: 5042, year: 2021, basis: "census" }, // Mavrovo and Rostuša
  // TRNC Statistical Institute, 2011 census (4 Dec 2011), via citypopulation.de.
  // Northern Cyprus is administered by the unrecognised Turkish Republic of
  // Northern Cyprus; no Republic-of-Cyprus or UN-recognised figure exists for the
  // territory as actually administered. CY-06~ is the Kyrenia/Girne district
  // specifically (Cyprus's own district-level view); TR-NC~ is the standalone
  // disputed entity for the whole TRNC territory shown under Turkey, so it takes
  // the territory-wide total, not the Kyrenia district figure.
  "CY-06~": { population: 69163, year: 2011, basis: "census" }, // Kyrenia/Girne district (Northern Cyprus)
  "TR-NC~": { population: 286257, year: 2011, basis: "census" }, // Turkish Republic of Northern Cyprus (whole territory)
  // State Statistics Service of Pridnestrovie (PMR), 2015 census, via citypopulation.de.
  // Transnistria is an unrecognised breakaway region of Moldova; no Moldovan
  // government figure exists for these districts as actually administered.
  "MD-CAM": { population: 20542, year: 2015, basis: "census" }, // Camenca (Transnistria)
  "MD-GRI": { population: 39795, year: 2015, basis: "census" }, // Grigoriopol (Transnistria)

  // Uninhabited — no permanent population (US Fish & Wildlife Service refuges)
  "UM-67": { population: 0, year: 2005, basis: "estimate" }, // Johnston Atoll (uninhabited since 2005; personnel withdrew May 2005)
  "UM-86": { population: 0, year: 2024, basis: "estimate" }, // Jarvis Island (never permanently inhabited)
  "UM-95": { population: 0, year: 2024, basis: "estimate" }, // Palmyra Atoll (never permanently inhabited)
  // Nauru Bureau of Statistics / PRISM, 2021 census (30 Oct 2021), via citypopulation.de
  "NR-01": { population: 1258, year: 2021, basis: "census" }, // Aiwo
  "NR-02": { population: 565, year: 2021, basis: "census" }, // Anabar
  "NR-03": { population: 795, year: 2021, basis: "census" }, // Anetan
  "NR-04": { population: 373, year: 2021, basis: "census" }, // Anibare
  "NR-05": { population: 523, year: 2021, basis: "census" }, // Baiti
  "NR-06": { population: 845, year: 2021, basis: "census" }, // Boe
  "NR-07": { population: 969, year: 2021, basis: "census" }, // Buada
  "NR-08": { population: 1874, year: 2021, basis: "census" }, // Denigomodu
  "NR-09": { population: 537, year: 2021, basis: "census" }, // Ewa
  "NR-10": { population: 276, year: 2021, basis: "census" }, // Ijuw
  "NR-11": { population: 1797, year: 2021, basis: "census" }, // Meneng
  "NR-12": { population: 724, year: 2021, basis: "census" }, // Nibok
  "NR-13": { population: 341, year: 2021, basis: "census" }, // Uaboe
  "NR-14": { population: 803, year: 2021, basis: "census" }, // Yaren
  // Palau Bureau of Budget & Planning / Office of Planning & Statistics, 2020 census,
  // via citypopulation.de
  "PW-002": { population: 363, year: 2020, basis: "census" }, // Aimeliik
  "PW-004": { population: 2529, year: 2020, basis: "census" }, // Airai
  "PW-010": { population: 114, year: 2020, basis: "census" }, // Angaur
  "PW-050": { population: 39, year: 2020, basis: "census" }, // Hatohobei
  "PW-100": { population: 41, year: 2020, basis: "census" }, // Kayangel
  "PW-150": { population: 11199, year: 2020, basis: "census" }, // Koror
  "PW-212": { population: 318, year: 2020, basis: "census" }, // Melekeok
  "PW-214": { population: 396, year: 2020, basis: "census" }, // Ngaraard
  "PW-218": { population: 384, year: 2020, basis: "census" }, // Ngarchelong
  "PW-222": { population: 238, year: 2020, basis: "census" }, // Ngardmau
  "PW-224": { population: 289, year: 2020, basis: "census" }, // Ngatpang
  "PW-226": { population: 319, year: 2020, basis: "census" }, // Ngchesar
  "PW-227": { population: 349, year: 2020, basis: "census" }, // Ngeremlengui
  "PW-228": { population: 312, year: 2020, basis: "census" }, // Ngiwal
  "PW-350": { population: 470, year: 2020, basis: "census" }, // Peleliu
  "PW-370": { population: 53, year: 2020, basis: "census" }, // Sonsorol
  // Papua New Guinea National Statistical Office, 2011 census. Hela and Jiwaka did
  // not yet exist as separate provinces (created 17 May 2012 from Southern Highlands
  // and Western Highlands respectively); figures are the territory's 2011 count.
  "PG-HLA": { population: 249449, year: 2011, basis: "census" }, // Hela
  "PG-JWK": { population: 343987, year: 2011, basis: "census" }, // Jiwaka
  "PG-WHM": { population: 362850, year: 2011, basis: "census" }, // Western Highlands (pre-Jiwaka-split boundary)
  // Fiji Bureau of Statistics, 2017 Population and Housing Census, Release 1
  "FJ-C": { population: 378148, year: 2017, basis: "census" }, // Central Division
  "FJ-N": { population: 131918, year: 2017, basis: "census" }, // Northern Division
  "FJ-W": { population: 337071, year: 2017, basis: "census" }, // Western Division
  "FJ-R": { population: 1594, year: 2017, basis: "census" }, // Rotuma (on-island population only)

  // National Statistics and Information Authority (NSIA) of Afghanistan, ~2021
  // population estimate, via UNFPA Afghanistan and IOM PLACES factsheets (Afghanistan
  // has held no full census since 1979; NSIA figures are projections)
  "AF-NIM": { population: 186963, year: 2021, basis: "estimate" }, // Nimroz
  // Oman National Centre for Statistics and Information (NCSI), 2010 census.
  // Ash Sharqiyah split into North/South governorates on 28 Oct 2011; this is the
  // sum of the two successor governorates' 2010 figures (162,482 + 188,032), the
  // last year a figure for the unified pre-split boundary can be derived.
  "OM-SH": { population: 350514, year: 2010, basis: "census" }, // Ash Sharqiyah (pre-2011-split boundary)

  // Institut National de la Statistique (INS) / BTPR Côte d'Ivoire, RGPH-98 census
  // (Tableau 1.7), for regions abolished in the 2011/2015 district reorganisation.
  // Dix-Huit Montagnes (CI-06) is deliberately omitted: the only figure circulating
  // (936,510) covers the smaller post-2000-split remainder territory, not the
  // region as it existed at the 1998 census, and would misrepresent it.
  "CI-03": { population: 929673, year: 1998, basis: "census" }, // Savanes
  "CI-05": { population: 394761, year: 1998, basis: "census" }, // Moyen-Comoé
  "CI-07": { population: 476235, year: 1998, basis: "census" }, // Lacs
  "CI-10": { population: 222446, year: 1998, basis: "census" }, // Denguélé
  "CI-15": { population: 682021, year: 1998, basis: "census" }, // Sud-Bandama
  "CI-18": { population: 542992, year: 1998, basis: "census" }, // Fromager
  "CI-19": { population: 508733, year: 1998, basis: "census" }, // Moyen-Cavally
  // Instituto Nacional de Estatística de Cabo Verde (INE-CV), RGPH-2021, Tabela 21
  "CV-CA": { population: 37982, year: 2021, basis: "census" }, // Santa Catarina
  "CV-CF": { population: 4743, year: 2021, basis: "census" }, // Santa Catarina do Fogo
  "CV-CR": { population: 25152, year: 2021, basis: "census" }, // Santa Cruz
  "CV-MO": { population: 8084, year: 2021, basis: "census" }, // Mosteiros
  "CV-PR": { population: 145378, year: 2021, basis: "census" }, // Praia
  "CV-RS": { population: 7757, year: 2021, basis: "census" }, // Ribeira Grande de Santiago
  "CV-SD": { population: 14051, year: 2021, basis: "census" }, // São Domingos
  "CV-SM": { population: 12966, year: 2021, basis: "census" }, // São Miguel
  "CV-SO": { population: 6328, year: 2021, basis: "census" }, // São Lourenço dos Órgãos
  "CV-SS": { population: 7482, year: 2021, basis: "census" }, // São Salvador do Mundo
  "CV-TA": { population: 16892, year: 2021, basis: "census" }, // Tarrafal
  // INSTAT-Mali, RGPH-2009 regional result sheets
  "ML-1": { population: 1996812, year: 2009, basis: "census" }, // Kayes
  "ML-2": { population: 2418305, year: 2009, basis: "census" }, // Koulikoro
  // Instituto Nacional de Estadística de Guinea Ecuatorial (INEGE), "Guinea en
  // Cifras 2016", IV Censo General de Población y Viviendas 2015
  "GQ-BS": { population: 34627, year: 2015, basis: "census" }, // Bioko Sur
  "GQ-CS": { population: 141903, year: 2015, basis: "census" }, // Centro Sur
  "GQ-KN": { population: 183331, year: 2015, basis: "census" }, // Kié-Ntem
  "GQ-WN": { population: 191383, year: 2015, basis: "census" }, // Wele-Nzas

  // Libya General Census, 1995-08-25, via statoids.com — legacy municipalities
  // abolished in the 2007/2010 reorganisation into 22 current codes
  "LY-AJ": { population: 108139, year: 1995, basis: "census" }, // Ajdabiya
  "LY-GD": { population: 15280, year: 1995, basis: "census" }, // Ghadamis
  "LY-MZ": { population: 29580, year: 1995, basis: "census" }, // Mizdah
  "LY-NQ": { population: 166067, year: 1995, basis: "census" }, // An Nuqat al Khams
  "LY-QB": { population: 58810, year: 1995, basis: "census" }, // Al Qubbah
  // Haut-Commissariat au Plan (HCP), "La Région en Chiffres", Guelmim regional
  // office, legal population 2014 (pre-Sept-2015 16-region boundary)
  "MA-14": { population: 501921, year: 2014, basis: "census" }, // Guelmim-Es Semara
  // Sudan Central Bureau of Statistics, 2008 census, district figures summed to the
  // state boundary (per citypopulation.de methodology note) — Central and East
  // Darfur states were both created in 2012, after the 2008 census
  "SD-DC": { population: 553515, year: 2008, basis: "census" }, // Central Darfur
  "SD-DE": { population: 1213784, year: 2008, basis: "census" }, // East Darfur
  // National Statistics and Evaluation Office, Eritrea, 2005 regional estimate
  "ER-MA": { population: 675700, year: 2005, basis: "estimate" }, // Maekel
  "ER-DU": { population: 952100, year: 2005, basis: "estimate" }, // Debub
  "ER-AN": { population: 549000, year: 2005, basis: "estimate" }, // Anseba
  // Ethiopian Statistics Service, 2022 projection, via citypopulation.de. Sidama
  // Region was created 18 June 2020 by splitting from SNNPR.
  "ET-SI": { population: 4623162, year: 2022, basis: "estimate" }, // Sidama

  // Instituto Nacional de Estadística de Venezuela (INE), XIV Censo Nacional de
  // Población y Vivienda, 2011
  "VE-A": { population: 1943901, year: 2011, basis: "census" }, // Distrito Capital
  "VE-E": { population: 816264, year: 2011, basis: "census" }, // Barinas
  "VE-L": { population: 828592, year: 2011, basis: "census" }, // Mérida
  "VE-M": { population: 2675165, year: 2011, basis: "census" }, // Miranda
  "VE-P": { population: 876496, year: 2011, basis: "census" }, // Portuguesa
  "VE-S": { population: 1168908, year: 2011, basis: "census" }, // Táchira
  "VE-T": { population: 686367, year: 2011, basis: "census" }, // Trujillo
  "VE-V": { population: 3704404, year: 2011, basis: "census" }, // Zulia
  "VE-X": { population: 352920, year: 2011, basis: "census" }, // Vargas/La Guaira
  // Algemeen Bureau voor de Statistiek (Suriname), Achtste Volks- en Woningtelling,
  // reference date 13 August 2012
  "SR-BR": { population: 15909, year: 2012, basis: "census" }, // Brokopondo
  "SR-CM": { population: 31420, year: 2012, basis: "census" }, // Commewijne
  "SR-CR": { population: 3391, year: 2012, basis: "census" }, // Coronie
  "SR-NI": { population: 34233, year: 2012, basis: "census" }, // Nickerie
  "SR-PR": { population: 24700, year: 2012, basis: "census" }, // Para
  "SR-SA": { population: 17480, year: 2012, basis: "census" }, // Saramacca
  // MX-DIF is the pre-2016 ISO 3166-2 code for the same entity as MX-CMX (Mexico
  // City, then named "Distrito Federal"); aliases MX-CMX's INEGI 2020 census figure
  "MX-DIF": { population: 9209944, year: 2020, basis: "census" }, // Mexico City (legacy code)

  // Bermuda Government, 2016 Census Parish Profile (20 May 2016)
  "BM-SG": { population: 5659, year: 2016, basis: "census" }, // Saint George's Parish
  // Bahamas Department of Statistics, 2010 census, via citypopulation.de
  "BS-BP": { population: 414, year: 2010, basis: "census" }, // Black Point
  "BS-MC": { population: 892, year: 2010, basis: "census" }, // Mangrove Cay
  "BS-CE": { population: 2363, year: 2010, basis: "census" }, // Central Eleuthera
  "BS-MI": { population: 593, year: 2010, basis: "census" }, // Moore's Island
  "BS-CO": { population: 9196, year: 2010, basis: "census" }, // Central Abaco
  // Uninhabited — no permanent population (Redonda Annexation Act; abandoned
  // mining camp, last occupied ~1930. Saint Anthony and Saint Georges parishes lie
  // entirely within Montserrat's volcanic exclusion zone, evacuated since 1995-97)
  "AG-11": { population: 0, year: 2011, basis: "estimate" }, // Redonda
  "MS-A": { population: 0, year: 2011, basis: "estimate" }, // Saint Anthony
  "MS-G": { population: 0, year: 2011, basis: "estimate" }, // Saint Georges
  // Montserrat Statistics Department, 2011 Population & Housing Census. The census
  // tabulates 22 enumeration districts and the island's entire surveyed population
  // (4,922) by geographic region, all of which lie within Saint Peter parish — the
  // other two parishes (Saint Anthony, Saint Georges) are uninhabited exclusion zone.
  "MS-P": { population: 4922, year: 2011, basis: "census" }, // Saint Peter
  // Trinidad and Tobago Central Statistical Office (CSO), 2011 Population and
  // Housing Census Community Register — sum of Saint Andrew, Saint David and Saint
  // Patrick parishes. TT-WTO was deleted from ISO 3166-2 in 2015 (replaced by the
  // single ward TT-TOB) but the figure remains a real, sourced 2011 count.
  "TT-WTO": { population: 41829, year: 2011, basis: "census" }, // Western Tobago (legacy code)
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
