/**
 * Era catalogue for the Learn-mode time slider.
 *
 * Historical eras load hand-curated GeoJSON files from the
 * aourednik/historical-basemaps dataset (mirrored in /public/historical-maps).
 * Each file is a FeatureCollection whose features represent actual
 * historical polities of that era (Roman Empire, Mongol Empire, etc.) with
 * their borders as they were — NOT modern country outlines.
 *
 * Each polity's display name comes from the GeoJSON's `NAME` property. The
 * POLITY_REGISTRY below maps a subset of those names to flag images and
 * editorial notes. Polities not in the registry still appear on the map
 * and get a sensible fallback in the detail panel (name only, no flag).
 *
 * "Today" is the one exception — it keeps the modern world-atlas TopoJSON
 * + flagcdn flags so the page still answers "what does the world look like
 * right now?" without any historical-data caveats.
 */

export type Era = {
  /** Stable id (used as React key + URL slug). */
  id: string;
  /** Short label shown on the pill (e.g., "117 AD"). */
  label: string;
  /** Short kid-friendly caption combined with the label on the pill. */
  caption: string;
  /** Year display string (used in the summary line). */
  year: string;
  /** Longer educational summary shown below the slider. */
  summary: string;
  /**
   * Path to the era's GeoJSON file (relative to BASE_URL). Undefined for
   * "Today" — that one falls back to the modern world-atlas behaviour.
   */
  dataUrl?: string;
};

export type PolityInfo = {
  /** Image path relative to BASE_URL. Optional — some entities (cultures,
   *  hunter-gatherer peoples) had no flags in the modern sense. */
  flag?: string;
  /** Display continent / region in the detail panel. */
  continent?: string;
  /** One-line note about the entity, shown below the name in the panel. */
  note?: string;
  /** If set, the polity's flag falls back to the modern country with this
   *  exact `Country.name` (loaded from REST Countries) — useful for the
   *  many post-1815 features whose NAME is just the modern country name
   *  (Brazil, France, etc.) or a close historical variant (Burma → Myanmar,
   *  Ceylon → Sri Lanka, Persia → Iran). Lets us cover hundreds of polities
   *  without curating a flag image for each one. */
  modernName?: string;
};

/* --------------------------------------------------------------------------
 * Era list, oldest → newest. Default = "Today" (rightmost).
 *
 * Each label combines the period with a kid-friendly caption, per the
 * design feedback: "117 AD · Roman peak", "1300 · Mongols", etc.
 * --------------------------------------------------------------------- */

const MAP = (file: string) => `historical-maps/${file}.geojson`;

export const ERAS: readonly Era[] = [
  {
    id: "bc2000",
    label: "2000 BC",
    caption: "Bronze Age",
    year: "2000 BC",
    summary: "Bronze Age — Egypt's Old Kingdom, Sumerian city-states, Indus Valley civilisation.",
    dataUrl: MAP("world_bc2000"),
  },
  {
    id: "bc500",
    label: "500 BC",
    caption: "Classical antiquity",
    year: "500 BC",
    summary: "Achaemenid Persia at its peak, Greek city-states, the Warring States in China, early Maurya in India.",
    dataUrl: MAP("world_bc500"),
  },
  {
    id: "ad100",
    label: "100 AD",
    caption: "Roman peak",
    year: "100 AD",
    summary: "The Roman Empire under Trajan, Han China, Parthian Empire, Kushans on the Silk Road.",
    dataUrl: MAP("world_100"),
  },
  {
    id: "ad600",
    label: "600 AD",
    caption: "Pre-Islamic",
    year: "600 AD",
    summary: "Byzantine and Sassanid superpowers, Tang China, Maya classic — the Islamic conquests are about to begin.",
    dataUrl: MAP("world_600"),
  },
  {
    id: "ad800",
    label: "800 AD",
    caption: "Carolingian & Abbasid",
    year: "800 AD",
    summary: "Charlemagne crowned in the West, the Abbasid Caliphate at its peak in Baghdad, Tang China.",
    dataUrl: MAP("world_800"),
  },
  {
    id: "ad1300",
    label: "1300",
    caption: "Mongol Empire",
    year: "1300 AD",
    summary: "The Mongol Empire — the largest contiguous land empire in history — spans from Korea to the Black Sea.",
    dataUrl: MAP("world_1300"),
  },
  {
    id: "ad1500",
    label: "1500",
    caption: "Age of Discovery",
    year: "1500 AD",
    summary: "Ottoman expansion, Ming China, Aztec and Inca empires, the Mughal era begins, European explorers reach the Americas.",
    dataUrl: MAP("world_1500"),
  },
  {
    id: "ad1700",
    label: "1700",
    caption: "Early modern empires",
    year: "1700 AD",
    summary: "Mughal India at its zenith, Qing China, declining Ottoman, rising French / Spanish / British colonial powers.",
    dataUrl: MAP("world_1700"),
  },
  {
    id: "ad1815",
    label: "1815",
    caption: "Post-Napoleonic",
    year: "1815",
    summary: "Congress of Vienna redraws Europe, Latin American independence wars, Qing China at its largest extent.",
    dataUrl: MAP("world_1815"),
  },
  {
    id: "ad1914",
    label: "1914",
    caption: "WWI eve",
    year: "1914",
    summary: "Europe on the brink of WWI — Austria-Hungary, Ottoman, German and Russian empires still intact.",
    dataUrl: MAP("world_1914"),
  },
  {
    id: "ad1945",
    label: "1945",
    caption: "End of WWII",
    year: "1945",
    summary: "USSR, divided Germany, the British and French colonial empires on the verge of decolonisation.",
    dataUrl: MAP("world_1945"),
  },
  {
    id: "ad1960",
    label: "1960",
    caption: "Cold War",
    year: "1960",
    summary: "Cold War — USSR, Yugoslavia, Czechoslovakia still intact; African decolonisation begins.",
    dataUrl: MAP("world_1960"),
  },
  {
    id: "today",
    label: "Today",
    caption: "Modern world",
    year: "",
    summary: "The modern world: 195 UN member states.",
    // No dataUrl → falls back to world-atlas modern map.
  },
];

export const DEFAULT_ERA_ID: Era["id"] = "today";

/**
 * Whether a given era is "close enough to modern" that we can fall back to
 * a modern country's flag when a polity NAME happens to match a modern
 * country name (e.g., "Brazil" → flagcdn br.svg).
 *
 * Most national flags only stabilised in their current form during the
 * 19th–20th centuries (US: 50-star 1960; France tricolour 1830; Brazil
 * republican 1889; Italy 1861; Germany 1949; PRC 1949). So for any era
 * before ~1900, that loose match produces flat-out wrong flags — the
 * Bourbon white flag, the Star-Spangled Banner with 15 stars, the
 * Habsburg yellow-black, the Qing dragon banner.
 *
 * For pre-1900 eras we require an explicit registry entry or alias to
 * resolve a flag — anything unmapped renders as "no flag image", which
 * is more honest than rendering a 21st-century flag in the 1500s.
 */
export function eraAllowsModernFlagFallback(eraId: Era["id"]): boolean {
  return eraId === "ad1914" || eraId === "ad1945" || eraId === "ad1960" || eraId === "today";
}

export function getEra(id: string): Era {
  return ERAS.find((e) => e.id === id) ?? ERAS[ERAS.length - 1]!;
}

/**
 * Polity registry — display info for major historical entities.
 *
 * Keys MUST match the `NAME` property exactly as it appears in the
 * historical-basemaps GeoJSON files. Many entities are missing here on
 * purpose (cultures, tribal confederations, hunter-gatherer peoples) —
 * those render on the map but have a name-only panel in the UI.
 */
export const POLITY_REGISTRY: ReadonlyMap<string, PolityInfo> = new Map([
  // Ancient (2000 BC – 100 AD) ---------------------------------------------
  // NOTE: keys must match dataset NAME values exactly — including British
  // spelling vs American, dataset typos, and punctuation. The historical-
  // basemaps GeoJSONs are mostly American-English ("civilization") and use
  // "Sumer" / "Minoan" / "Indus valley civilization" (lowercase v).
  ["Egypt", { continent: "North Africa", note: "Ancient kingdom along the Nile.", modernName: "Egypt" }],
  ["Sumer", { continent: "Mesopotamia", note: "City-states of the southern Tigris-Euphrates." }],
  ["Indus valley civilization", { continent: "South Asia", note: "Bronze-Age cities of Harappa and Mohenjo-Daro." }],
  ["Minoan", { continent: "Mediterranean", note: "Bronze-Age civilisation of Crete." }],
  ["Hittites", { continent: "Anatolia", note: "Bronze-Age empire of Anatolia; rivals of Egypt." }],
  ["Elam", { continent: "Western Asia", note: "Ancient civilisation of south-west Iran." }],
  ["Ur", { continent: "Mesopotamia", note: "Sumerian city of Ur, ziggurat of Ur-Nammu." }],
  ["Canaan", { continent: "Levant", note: "Ancient Levantine peoples, ancestors of the Phoenicians." }],
  ["Xia", { continent: "East Asia", note: "Legendary first Chinese dynasty (Bronze Age)." }],
  ["Kerma", { continent: "Northeast Africa", note: "Bronze-Age Nubian kingdom in modern Sudan." }],
  ["Achaemenid Empire", { continent: "Western Asia", note: "Persian Empire founded by Cyrus the Great." }],
  ["Greek city-states", { continent: "Mediterranean", note: "Independent poleis: Athens, Sparta, and many more." }],
  ["Carthaginian Empire", { continent: "Mediterranean", note: "Phoenician maritime empire centred on Carthage." }],
  ["Etrurians", { continent: "Mediterranean", note: "Pre-Roman civilisation of central Italy." }],
  ["Magadha", { continent: "South Asia", note: "Powerful kingdom of north-east India." }],
  ["Rome", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Roman Republic — by 500 BC still a city-state, soon to dominate Italy." }],
  ["Roman Empire", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Ruled the entire Mediterranean basin. Capital: Rome." }],
  ["Han", { continent: "East Asia", note: "Han dynasty — China's classical age, contemporary with Rome." }],
  ["Parthian Empire", { flag: "historical-flags/parthian-empire.png", continent: "Western Asia", note: "Rome's eastern rival; Arsacid dynasty." }],
  ["Kushan Empire", { continent: "Central / South Asia", note: "Buddhist trading empire of the Silk Road." }],
  ["Axum", { continent: "East Africa", note: "Aksumite Kingdom — major trading power on the Red Sea." }],
  ["Meroe", { continent: "Northeast Africa", note: "Kingdom of Kush, successor to Nubia, in modern Sudan." }],
  ["Maya chiefdoms and states", { continent: "Mesoamerica", note: "Network of Maya city-states across modern Guatemala / Belize / S. Mexico." }],
  ["Teotihuacán", { continent: "Mesoamerica", note: "Massive city-state in the Valley of Mexico." }],
  ["Moche", { continent: "South America", note: "Andean civilisation of coastal Peru." }],
  ["Nazca", { continent: "South America", note: "Andean civilisation famous for the desert geoglyphs." }],
  ["Himyarite Kingdom", { continent: "Arabia", note: "Incense kingdom of southern Arabia." }],
  ["Nabatean Kingdom", { continent: "Arabia", note: "Trading kingdom whose capital was Petra." }],
  ["Armenia", { continent: "Western Asia", note: "Ancient Armenian kingdom, often caught between Rome and Parthia.", modernName: "Armenia" }],
  ["Koguryo", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the north." }],
  ["Paekche", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the south-west." }],
  ["Silla", { continent: "East Asia", note: "Korean Three-Kingdoms-era state, eventual unifier of Korea." }],
  ["Yayoi", { continent: "East Asia", note: "Pre-state cultures of early Japan." }],
  ["Scythians", { continent: "Eurasian Steppe", note: "Nomadic peoples of the Pontic-Caspian steppe." }],
  ["Sarmatians", { continent: "Eurasian Steppe", note: "Nomadic Iranian peoples; later allies + rivals of Rome." }],
  ["Dacia", { continent: "Eastern Europe", note: "Iron-Age kingdom in modern Romania; conquered by Rome in 106 AD." }],

  // Medieval (600 AD – 1300 AD) --------------------------------------------
  // 600 AD uses "Eastern Roman Empire" and "Sasanian Empire"; from 800 onwards
  // the dataset says "Byzantine Empire" and there's no Sassanid Persia.
  ["Eastern Roman Empire", { continent: "Eastern Mediterranean", note: "Byzantine Empire; capital Constantinople." }],
  ["Byzantine Empire", { continent: "Eastern Mediterranean", note: "Eastern Roman Empire; capital Constantinople." }],
  ["Sasanian Empire", { continent: "Western Asia", note: "Last pre-Islamic Persian empire." }],
  ["Tang", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age." }],
  ["Abbasid Caliphate", { continent: "Middle East", note: "Islamic caliphate; capital Baghdad." }],
  ["Umayyad Caliphate", { continent: "Middle East", note: "Earlier Islamic caliphate; capital Damascus." }],
  ["Carolingian Empire", { continent: "Western Europe", note: "Charlemagne's Frankish empire." }],
  ["Frankish Kingdom", { continent: "Western Europe", note: "Merovingian / early Frankish kingdom; ancestor of France + Germany." }],
  ["Holy Roman Empire", { continent: "Central Europe", note: "Successor to the Carolingian Empire in Central Europe." }],
  ["Mongol Empire", { continent: "Eurasia", note: "The largest contiguous land empire in human history." }],
  ["Great Khanate", { continent: "East Asia", note: "Yuan dynasty — Kublai Khan's Mongol-ruled China." }],
  ["Khanate of the Golden Horde", { continent: "Eurasian Steppe", note: "Western successor of the Mongol Empire over Russia + Kazakhstan." }],
  ["Chagatai Khanate", { continent: "Central Asia", note: "Central-Asian successor of the Mongol Empire." }],
  ["Ilkhanate", { continent: "Western Asia", note: "Persian successor of the Mongol Empire." }],
  ["Yuan", { continent: "East Asia", note: "Mongol-ruled dynasty of China." }],
  ["Song", { continent: "East Asia", note: "Song dynasty — Chinese economic + technological boom." }],
  ["Khmer Empire", { continent: "Southeast Asia", note: "Builders of Angkor Wat." }],
  ["Srivijaya", { continent: "Southeast Asia", note: "Maritime empire of Sumatra." }],
  ["Mali Empire", { continent: "West Africa", note: "Wealthy West African empire of Mansa Musa." }],
  ["Mali", { continent: "West Africa", note: "Medieval Mali Empire of Mansa Musa." }],
  ["Ghana Empire", { continent: "West Africa", note: "Earlier West African trans-Saharan trading power." }],
  ["Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade." }],
  ["Empire of Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade." }],
  ["Great Zimbabwe", { continent: "Southern Africa", note: "Iron-Age trading state and stone-walled capital." }],
  ["Visigothic Kingdom", { continent: "Iberia", note: "Germanic kingdom in Iberia after Rome's fall." }],
  ["Lombard principalities", { continent: "Italy", note: "Germanic kingdoms that ruled post-Roman Italy." }],
  ["Lombard duchies", { continent: "Italy", note: "Lombard polities of central + southern Italy." }],
  ["Avars", { continent: "Eastern Europe", note: "Nomadic confederation; rivals of the Byzantines." }],
  ["Bulgars", { continent: "Eastern Europe", note: "First Bulgarian Empire of the Balkans." }],

  // Early modern (1500 – 1815) ----------------------------------------------
  ["Aztec Empire", { continent: "Mesoamerica", note: "Triple-alliance empire centred on Tenochtitlan." }],
  ["Inca Empire", { continent: "South America", note: "Andean empire stretching from Ecuador to Chile." }],
  ["Ming", { continent: "East Asia", note: "Ming dynasty — Great Wall, Forbidden City, voyages of Zheng He." }],
  ["Qing", { continent: "East Asia", note: "Last imperial Chinese dynasty." }],
  ["Manchu Empire", { continent: "East Asia", note: "Qing dynasty — China's last imperial dynasty. Used the yellow dragon banner, not the modern Chinese flag." }],
  ["Mughal Empire", { continent: "South Asia", note: "Persianate Muslim empire that built the Taj Mahal." }],
  ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Sultanate ruling Anatolia, the Balkans, and the Middle East." }],
  ["Spanish Empire", { continent: "Global", note: "First truly global empire; covered the Americas, Philippines, and parts of Africa." }],
  ["Portuguese Empire", { continent: "Global", note: "Maritime empire — Brazil, Africa, India, Macau, Timor." }],
  ["French Empire", { continent: "Global", note: "Napoleonic France at its peak." }],
  ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg empire (1804–1867), before Austria-Hungary. Flew the gold-and-black Habsburg colours." }],
  ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Vast Eurasian empire under the Romanovs." }],
  ["Tokugawa Shogunate", { continent: "East Asia", note: "Edo-period Japan." }],
  ["Safavid Empire", { continent: "Western Asia", note: "Iranian Shia empire; rival of the Ottomans." }],
  ["Prussia", { continent: "Central Europe", note: "German kingdom that unified Germany in 1871." }],
  ["Maratha Confederacy", { continent: "South Asia", note: "Hindu confederation that broke Mughal power in 18th-century India." }],
  ["Viceroyalty of Brazil", { flag: "historical-flags/ukpba.png", continent: "South America", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825) — Brazil was part of a joint kingdom with Portugal, not yet independent." }],

  // === Era-agnostic entries that happen to fit 1815 well too =================
  // These polities used essentially the same flag well before 1815 AND today,
  // so they're safe to keep in the global registry without an era-override.
  ["Spain", { flag: "historical-flags/spain-1785.png", continent: "Iberia", note: "Spain's red-yellow-red flag, adopted by Charles III in 1785 — essentially the same design as today's." }],
  ["United Kingdom", { continent: "Northern Europe", note: "The Union Jack as we know it today was adopted in 1801 when the UK was formed.", modernName: "United Kingdom" }],
  ["Netherlands", { continent: "Western Europe", note: "The Dutch tricolour has been used (in the same colours) since the 1570s.", modernName: "Netherlands" }],
  ["Denmark", { continent: "Northern Europe", note: "The Dannebrog is one of the oldest national flags in continuous use — documented since the 14th century.", modernName: "Denmark" }],
  ["Sweden", { continent: "Northern Europe", note: "The Swedish flag has flown in roughly its current form since the 16th century.", modernName: "Sweden" }],
  ["Switzerland", { continent: "Central Europe", note: "The Swiss white-cross-on-red banner dates to the 14th century, though the modern square form was formalised in 1841.", modernName: "Switzerland" }],
  // Spanish viceroyalties only appear in the 1815 dataset, so this entry
  // is era-safe — Spain in 1815 already flew the 1785 flag.
  ["Vice-Royalty of New Spain", { flag: "historical-flags/spain-1785.png", continent: "Mesoamerica", note: "Viceroyalty of New Spain (modern Mexico + Central America), Spanish colony." }],
  ["Vice-Royalty of New Granada", { flag: "historical-flags/spain-1785.png", continent: "South America", note: "Viceroyalty of New Granada (modern Colombia, Venezuela, Ecuador, Panama), Spanish colony." }],
  ["Vice-Royalty of Peru", { flag: "historical-flags/spain-1785.png", continent: "South America", note: "Viceroyalty of Peru, Spanish colony in the Andes." }],
  ["Rattanakosin Kingdom", { continent: "Southeast Asia", note: "Modern Kingdom of Thailand, founded 1782 — capital Bangkok." }],
  // Qajar Persia used the Lion-and-Sun banner, not the modern Iran flag —
  // intentionally no modernName so the panel shows "no flag image".
  ["Persia", { continent: "Western Asia", note: "Qajar-era Persia (forerunner of modern Iran). Used the Lion-and-Sun banner — different from the modern flag." }],
  ["Sweden–Norway", { continent: "Northern Europe", note: "Personal union of Sweden and Norway, 1814–1905. Sweden's tricross banner was very close to today's Swedish flag.", modernName: "Sweden" }],
  // These were independent states in 1815, decades before Italy unified
  // (1861). No modernName — modern Italian tricolour is anachronistic.
  ["Kingdom of Sardinia", { continent: "Italy", note: "Piedmont-Sardinia — would later lead Italian unification, but used the Savoy flag in 1815." }],
  ["Kingdom of the Two Sicilies", { continent: "Italy", note: "Bourbon kingdom of southern Italy and Sicily — its own flag, not the Italian tricolour." }],
  // 1914 "Kingdom of Italy" (dataset typo "Kingfom"). By 1914 unified Italy
  // flew the green-white-red tricolour with the Savoy arms — close enough
  // to today's flag for kid-level recognition.
  ["Kingfom of Italy", { continent: "Italy", note: "Kingdom of Italy, 1861–1946 (dataset has a typo of \"Kingdom\").", modernName: "Italy" }],

  // Modern (1914 – today) --------------------------------------------------
  ["Austro-Hungarian Empire", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Dual monarchy of the Habsburgs." }],
  ["German Empire", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "Kaiserreich under Wilhelm II." }],
  ["Soviet Union", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991." }],
  ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991." }],
  ["Yugoslavia", { flag: "historical-flags/yugoslavia.png", continent: "SE Europe", note: "Socialist Federal Republic of Yugoslavia, 1945–1992." }],
  ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Federal Republic of Czechs and Slovaks, 1918–1992." }],
  ["British Empire", { continent: "Global", note: "Largest empire in history at its 1922 peak." }],
  ["British Raj", { continent: "South Asia", note: "British rule of India, 1858–1947." }],
  ["British East India Company", { continent: "South Asia", note: "Company rule of India before the 1858 Raj." }],
  ["Belgian Congo", { continent: "Central Africa", note: "Colonial Belgian rule of modern DRC." }],
  ["French Indochina", { continent: "Southeast Asia", note: "French colonial rule of Vietnam / Laos / Cambodia." }],
  ["Dutch East Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia." }],
  ["Netherlands Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia." }],
  ["Abyssinia", { continent: "East Africa", note: "Historical name for Ethiopia, never colonised by Europe.", modernName: "Ethiopia" }],
  ["Empire of Japan", { continent: "East Asia", note: "Imperial Japan, 1868–1947.", modernName: "Japan" }],
  ["Burma", { continent: "Southeast Asia", note: "Pre-1989 name for Myanmar.", modernName: "Myanmar" }],
  ["Ceylon", { continent: "South Asia", note: "Pre-1972 name for Sri Lanka.", modernName: "Sri Lanka" }],
  ["Siam", { continent: "Southeast Asia", note: "Pre-1939 name for Thailand.", modernName: "Thailand" }],
  ["Zaire", { continent: "Central Africa", note: "Name of the DRC under Mobutu, 1971–1997.", modernName: "DR Congo" }],
  ["United Kingdom of Great Britain and Ireland", { continent: "Northern Europe", note: "Pre-1922 UK including all of Ireland.", modernName: "United Kingdom" }],
  ["Gambia, The", { continent: "West Africa", modernName: "Gambia" }],
  ["Tanzania, United Republic of", { continent: "East Africa", modernName: "Tanzania" }],
  ["Korea, Democratic People's Republic of", { continent: "East Asia", modernName: "North Korea" }],
  ["Korea, Republic of", { continent: "East Asia", modernName: "South Korea" }],
]);

/**
 * Lightweight alias table: dataset NAME → modern country name.
 *
 * For polities whose only useful info is "this is what kids would today call
 * country X" — no need for a curated note. Many post-1815 colonial labels
 * and dataset typos land here. Falls back to the modern flagcdn flag via
 * the loaded Country list.
 *
 * Keys must match dataset NAME values verbatim, including any typos.
 */
export const MODERN_NAME_ALIASES: ReadonlyMap<string, string> = new Map([
  // 1914 colonial labels
  ["Anglo-Egyption Sudan", "Sudan"],
  ["British East Africa", "Kenya"],
  ["British Somaliland", "Somalia"],
  ["German E. Africa (Tanganyika)", "Tanzania"],
  ["German South-West Africa", "Namibia"],
  ["Italian Somaliland", "Somalia"],
  ["Spanish Morocco", "Morocco"],
  ["Spanish Sahara", "Western Sahara"],
  ["Rio De Oro", "Western Sahara"],
  ["Madagascar (France)", "Madagascar"],
  ["French Equatorial Africa", "Central African Republic"],
  ["French West Africa", "Senegal"],
  ["Gold Coast", "Ghana"],
  ["Togoland", "Togo"],
  ["Kamerun", "Cameroon"],
  ["Rhodesia", "Zimbabwe"],
  ["Northern Rhodesia", "Zambia"],
  ["Nyasaland", "Malawi"],
  ["Arabia (Nejd)", "Saudi Arabia"],
  ["Nejd", "Saudi Arabia"],
  ["Sakhalin (RU)", "Russia"],
  // 1945 occupation / colonial labels
  ["Angola (Portugal)", "Angola"],
  ["Guinea-Bissau (Portugal)", "Guinea-Bissau"],
  ["Mozambique (Portugal)", "Mozambique"],
  ["Cyraneica (UK Lybia)", "Libya"],
  ["Tripolitana (UK Lybia)", "Libya"],
  ["Fezzan (Frech Lybia)", "Libya"],
  ["Germany (France)", "Germany"],
  ["Germany (Soviet)", "Germany"],
  ["Germany (UK)", "Germany"],
  ["Germany (USA)", "Germany"],
  ["East Germany", "Germany"],
  ["West Germany", "Germany"],
  ["Jamaica (UK)", "Jamaica"],
  ["Japan (USA)", "Japan"],
  ["Korea (USA)", "South Korea"],
  ["Korea (USSR)", "North Korea"],
  ["Martinique (France)", "France"],
  ["Dutch Guinea", "Suriname"],
  ["Cochin China", "Vietnam"],
  ["Tonkin", "Vietnam"],
  ["Annam", "Vietnam"],
  ["Manchuria", "China"],
  ["Saar Protectorate", "Germany"],
  ["Southern Cameroon", "Cameroon"],
  // 1815 — only map names that are genuinely the same polity as a modern
  // country (just renamed/translated). Anything that was a colony, vassal,
  // or independent pre-modern state is OMITTED on purpose so the panel
  // shows a "no flag image" placeholder rather than an anachronistic flag.
  // We DO route colonies to the colonising power's modern flag where that
  // is historically accurate (it really WAS their flag).
  // 1815 Ottoman regencies — flag was the Ottoman flag, NOT modern
  // Algeria/Tunisia/Libya. Best handled as no-flag rather than wrong-flag.
  // (Removed: Algiers/Tunis/Tripolitania/Cyrenaica aliases.)
  // British colonies in 1815 → Union Jack (correct):
  ["Cape Colony", "United Kingdom"],
  ["British East India Company", "United Kingdom"],
  // Portuguese colonies in 1815 → in this app we route to the UKPBA flag
  // via registry entries, because mainland Portugal didn't fly the modern
  // red-green flag until 1911. See POLITY_REGISTRY for these.
  // Viceroyalty of Brazil — handled by an explicit registry entry below
  // because in 1815 the flag was the United Kingdom of Portugal, Brazil
  // and the Algarves banner (a blue armillary sphere on white), NOT the
  // modern red/green Portuguese flag. See POLITY_REGISTRY.
  ["Vice-Royalty of New Granada", "Spain"],
  ["Vice-Royalty of New Spain", "Spain"],
  ["Vice-Royalty of Peru", "Spain"],
  // Independent African / Asian / Indian polities in 1815 — these had their
  // own kingdoms / cultures and DID NOT use the modern country flag. Better
  // to show no flag than the wrong one. Intentionally omitted:
  //   Asante, Oyo, Bornu-Kanem, Mossi States, Buganda, Bunyoro, Zanzibar,
  //   Lozi, Lunda, Xhosa, Zulu, Sotho, Hong Kong (Qing China then),
  //   Kingdom of Hawaii, Republic of Kraków, Indian princely states,
  //   Arakan, Malaya, United Provinces of La Plata (mid-revolution).
  // German and Italian pre-unification states (1815): intentionally NOT
  // aliased. Each had its own flag — modern Germany / Italy are anachronistic
  // (those countries didn't exist yet, 1871 and 1861 respectively). Showing
  // no flag is more honest. Same reasoning excludes Papal States, Kingdom
  // of Sardinia, Kingdom of the Two Sicilies, etc.
  // 1500/1700 European names — DELIBERATELY SPARSE.
  // Pre-modern kingdoms had their own heraldry that bears no resemblance
  // to modern flags. England (1500) flew the Cross of St George, not the
  // Union Jack; Castile a castle banner; Denmark-Norway the Dannebrog —
  // OK that one is fine. Most intentionally omitted to avoid showing the
  // modern flag for the wrong era.
  ["Denmark-Norway", "Denmark"], // Dannebrog has been Denmark's flag since the 14th c.
  ["Mongolia", "Mongolia"],
  ["Japan", "Japan"], // 1700 Tokugawa used various banners but the Hinomaru is older than most
  // Misc — only modern names or near-equivalents that genuinely match today.
  ["Hainan", "China"], // never independent in this dataset
  ["Hejaz", "Saudi Arabia"], // absorbed into modern Saudi Arabia
  ["Yemen", "Yemen"],
]);

/**
 * Era-specific overrides — checked BEFORE the global POLITY_REGISTRY.
 *
 * Use when the same polity NAME means different flags across eras. The
 * canonical case is "France": Bourbon white flag in 1500/1700/1815, the
 * tricolour from 1830 onwards. Without an override the global registry
 * would have to pick one, which is wrong for the others.
 *
 * Era keys must match Era["id"] values. Only the ENTRY's eraId triggers
 * the override; the registry fallback still runs for every other era.
 */
const ERA_OVERRIDES: ReadonlyMap<Era["id"], ReadonlyMap<string, PolityInfo>> = new Map([
  ["ad1500", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Kingdom of France under the Valois — the white Bourbon-style royal banner with fleur-de-lis was used in this period." }],
  ])],
  ["ad1700", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon France under Louis XIV. White royal banner with fleur-de-lis — the tricolour wasn't adopted until 1790." }],
  ])],
  ["ad1815", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon Restoration (1814–1830) — France flew the white royal banner with fleur-de-lis. The tricolour wasn't readopted until 1830." }],
    ["United States", { flag: "historical-flags/us-15star.png", continent: "North America", note: "The Star-Spangled Banner, 1795–1818: 15 stars and 15 stripes. A star+stripe pair was added for every new state until 1818." }],
    ["Portugal", { flag: "historical-flags/ukpba.png", continent: "Iberia", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825). The familiar red-and-green Portuguese flag wasn't adopted until 1911." }],
    ["Portuguese East Africa", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese Mozambique, ruled from Lisbon under the UKPBA banner." }],
    ["Portuguese Guinea", { flag: "historical-flags/ukpba.png", continent: "West Africa", note: "Portuguese colony in modern Guinea-Bissau." }],
    ["Delagoa Bay", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese trading post in modern Mozambique." }],
    ["Goa", { flag: "historical-flags/ukpba.png", continent: "South Asia", note: "Portuguese India — held until 1961." }],
  ])],
]);

/**
 * Look up a polity by NAME, optionally biased by era.
 *
 * Era-specific overrides win over global registry entries; falls back to
 * an empty object so callers can compose with the alias / modern-country
 * lookup paths.
 */
export function polityInfo(name: string, eraId?: Era["id"]): PolityInfo {
  if (eraId) {
    const eraEntry = ERA_OVERRIDES.get(eraId)?.get(name);
    if (eraEntry) return eraEntry;
  }
  return POLITY_REGISTRY.get(name) ?? {};
}

/**
 * Best-effort modern-country-name lookup for a dataset polity NAME.
 *
 * Falls through three layers:
 *   1. POLITY_REGISTRY entry's `modernName` field
 *   2. MODERN_NAME_ALIASES exact match
 *   3. The NAME itself if it matches a real country name (handled by the caller)
 *
 * Returns null when no mapping exists — the caller should then leave the
 * polity flag-less, since most pre-1815 entities have no real flag anyway.
 */
export function polityModernName(name: string): string | null {
  const info = POLITY_REGISTRY.get(name);
  if (info?.modernName) return info.modernName;
  const alias = MODERN_NAME_ALIASES.get(name);
  if (alias) return alias;
  return null;
}
