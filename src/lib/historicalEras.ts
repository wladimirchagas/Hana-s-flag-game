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
  ["Egypt", { continent: "North Africa", note: "Ancient kingdom along the Nile." }],
  ["Sumer", { continent: "Mesopotamia", note: "City-states of the southern Tigris-Euphrates." }],
  ["Indus Valley civilisation", { continent: "South Asia", note: "Bronze-Age cities of Harappa and Mohenjo-Daro." }],
  ["Minoans", { continent: "Mediterranean", note: "Bronze-Age civilisation of Crete." }],
  ["Achaemenid Empire", { continent: "Western Asia", note: "Persian Empire founded by Cyrus the Great." }],
  ["Greek city-states", { continent: "Mediterranean", note: "Independent poleis: Athens, Sparta, and many more." }],
  ["Carthaginian Empire", { continent: "Mediterranean", note: "Phoenician maritime empire centred on Carthage." }],
  ["Etrurians", { continent: "Mediterranean", note: "Pre-Roman civilisation of central Italy." }],
  ["Magadha", { continent: "South Asia", note: "Powerful kingdom of north-east India." }],
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
  ["Koguryo", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the north." }],
  ["Paekche", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the south-west." }],
  ["Silla", { continent: "East Asia", note: "Korean Three-Kingdoms-era state, eventual unifier of Korea." }],
  ["Yayoi", { continent: "East Asia", note: "Pre-state cultures of early Japan." }],
  ["Scythians", { continent: "Eurasian Steppe", note: "Nomadic peoples of the Pontic-Caspian steppe." }],
  ["Sarmatians", { continent: "Eurasian Steppe", note: "Nomadic Iranian peoples; later allies + rivals of Rome." }],

  // Medieval (600 AD – 1300 AD) --------------------------------------------
  ["Byzantine Empire", { continent: "Eastern Mediterranean", note: "Eastern Roman Empire; capital Constantinople." }],
  ["Sassanid Empire", { continent: "Western Asia", note: "Last pre-Islamic Persian empire." }],
  ["Tang", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age." }],
  ["Abbasid Caliphate", { continent: "Middle East", note: "Islamic caliphate; capital Baghdad." }],
  ["Umayyad Caliphate", { continent: "Middle East", note: "Earlier Islamic caliphate; capital Damascus." }],
  ["Carolingian Empire", { continent: "Western Europe", note: "Charlemagne's Frankish empire." }],
  ["Holy Roman Empire", { continent: "Central Europe", note: "Successor to the Carolingian Empire in Central Europe." }],
  ["Mongol Empire", { continent: "Eurasia", note: "The largest contiguous land empire in human history." }],
  ["Yuan", { continent: "East Asia", note: "Mongol-ruled dynasty of China." }],
  ["Song", { continent: "East Asia", note: "Song dynasty — Chinese economic + technological boom." }],
  ["Khmer Empire", { continent: "Southeast Asia", note: "Builders of Angkor Wat." }],
  ["Srivijaya", { continent: "Southeast Asia", note: "Maritime empire of Sumatra." }],
  ["Mali Empire", { continent: "West Africa", note: "Wealthy West African empire of Mansa Musa." }],
  ["Ghana Empire", { continent: "West Africa", note: "Earlier West African trans-Saharan trading power." }],

  // Early modern (1500 – 1815) ----------------------------------------------
  ["Aztec Empire", { continent: "Mesoamerica", note: "Triple-alliance empire centred on Tenochtitlan." }],
  ["Inca Empire", { continent: "South America", note: "Andean empire stretching from Ecuador to Chile." }],
  ["Ming", { continent: "East Asia", note: "Ming dynasty — Great Wall, Forbidden City, voyages of Zheng He." }],
  ["Qing", { continent: "East Asia", note: "Last imperial Chinese dynasty." }],
  ["Mughal Empire", { continent: "South Asia", note: "Persianate Muslim empire that built the Taj Mahal." }],
  ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Sultanate ruling Anatolia, the Balkans, and the Middle East." }],
  ["Spanish Empire", { continent: "Global", note: "First truly global empire; covered the Americas, Philippines, and parts of Africa." }],
  ["Portuguese Empire", { continent: "Global", note: "Maritime empire — Brazil, Africa, India, Macau, Timor." }],
  ["French Empire", { continent: "Global", note: "Napoleonic France at its peak." }],
  ["Austrian Empire", { continent: "Central Europe", note: "Habsburg empire before Austria-Hungary." }],
  ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Vast Eurasian empire under the Romanovs." }],
  ["Tokugawa Shogunate", { continent: "East Asia", note: "Edo-period Japan." }],
  ["Safavid Empire", { continent: "Western Asia", note: "Iranian Shia empire; rival of the Ottomans." }],

  // Modern (1914 – today) --------------------------------------------------
  ["Austro-Hungarian Empire", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Dual monarchy of the Habsburgs." }],
  ["German Empire", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "Kaiserreich under Wilhelm II." }],
  ["Soviet Union", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991." }],
  ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991." }],
  ["Yugoslavia", { flag: "historical-flags/yugoslavia.png", continent: "SE Europe", note: "Socialist Federal Republic of Yugoslavia, 1945–1992." }],
  ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Federal Republic of Czechs and Slovaks, 1918–1992." }],
  ["British Empire", { continent: "Global", note: "Largest empire in history at its 1922 peak." }],
  ["British Raj", { continent: "South Asia", note: "British rule of India, 1858–1947." }],
  ["Belgian Congo", { continent: "Central Africa", note: "Colonial Belgian rule of modern DRC." }],
  ["French Indochina", { continent: "Southeast Asia", note: "French colonial rule of Vietnam / Laos / Cambodia." }],
  ["Dutch East Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia." }],
  ["Abyssinia", { continent: "East Africa", note: "Historical name for Ethiopia, never colonised by Europe." }],
]);

export function polityInfo(name: string): PolityInfo {
  return POLITY_REGISTRY.get(name) ?? {};
}
