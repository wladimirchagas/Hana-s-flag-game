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
  /** Scholarly peak/representative population estimate (people) for this
   *  polity. Optional and intentionally rough — most ancient populations
   *  are debated within ±30%. Shown in the panel summary as e.g. "pop.
   *  ~70 M at peak". Only added for entities with well-documented
   *  estimates; many small city-states are deliberately left undefined. */
  population?: number;
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
  ["Egypt", { continent: "North Africa", note: "Ancient kingdom along the Nile.", modernName: "Egypt", population: 3_000_000 }],
  ["Sumer", { continent: "Mesopotamia", note: "City-states of the southern Tigris-Euphrates.", population: 1_000_000 }],
  ["Indus valley civilization", { continent: "South Asia", note: "Bronze-Age cities of Harappa and Mohenjo-Daro.", population: 5_000_000 }],
  ["Minoan", { continent: "Mediterranean", note: "Bronze-Age civilisation of Crete.", population: 250_000 }],
  ["Hittites", { continent: "Anatolia", note: "Bronze-Age empire of Anatolia; rivals of Egypt.", population: 1_500_000 }],
  ["Elam", { continent: "Western Asia", note: "Ancient civilisation of south-west Iran.", population: 1_000_000 }],
  ["Ur", { continent: "Mesopotamia", note: "Sumerian city of Ur, ziggurat of Ur-Nammu.", population: 65_000 }],
  ["Canaan", { continent: "Levant", note: "Ancient Levantine peoples, ancestors of the Phoenicians.", population: 500_000 }],
  ["Xia", { continent: "East Asia", note: "Legendary first Chinese dynasty (Bronze Age).", population: 1_000_000 }],
  ["Kerma", { continent: "Northeast Africa", note: "Bronze-Age Nubian kingdom in modern Sudan.", population: 100_000 }],
  ["Achaemenid Empire", { continent: "Western Asia", note: "Persian Empire founded by Cyrus the Great.", population: 50_000_000 }],
  ["Greek city-states", { continent: "Mediterranean", note: "Independent poleis: Athens, Sparta, and many more.", population: 3_000_000 }],
  ["Carthaginian Empire", { continent: "Mediterranean", note: "Phoenician maritime empire centred on Carthage.", population: 4_000_000 }],
  ["Etrurians", { continent: "Mediterranean", note: "Pre-Roman civilisation of central Italy.", population: 1_000_000 }],
  ["Magadha", { continent: "South Asia", note: "Powerful kingdom of north-east India.", population: 5_000_000 }],
  ["Rome", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Roman Republic — by 500 BC still a city-state, soon to dominate Italy.", population: 100_000 }],
  ["Roman Empire", { flag: "historical-flags/roman-empire.png", continent: "Mediterranean", note: "Ruled the entire Mediterranean basin. Capital: Rome.", population: 70_000_000 }],
  ["Han", { continent: "East Asia", note: "Han dynasty — China's classical age, contemporary with Rome.", population: 57_000_000 }],
  ["Parthian Empire", { flag: "historical-flags/parthian-empire.png", continent: "Western Asia", note: "Rome's eastern rival; Arsacid dynasty.", population: 5_000_000 }],
  ["Kushan Empire", { continent: "Central / South Asia", note: "Buddhist trading empire of the Silk Road.", population: 13_000_000 }],
  ["Axum", { continent: "East Africa", note: "Aksumite Kingdom — major trading power on the Red Sea.", population: 3_000_000 }],
  ["Meroe", { continent: "Northeast Africa", note: "Kingdom of Kush, successor to Nubia, in modern Sudan.", population: 250_000 }],
  ["Maya chiefdoms and states", { continent: "Mesoamerica", note: "Network of Maya city-states across modern Guatemala / Belize / S. Mexico.", population: 3_000_000 }],
  ["Teotihuacán", { continent: "Mesoamerica", note: "Massive city-state in the Valley of Mexico.", population: 200_000 }],
  ["Moche", { continent: "South America", note: "Andean civilisation of coastal Peru.", population: 500_000 }],
  ["Nazca", { continent: "South America", note: "Andean civilisation famous for the desert geoglyphs.", population: 50_000 }],
  ["Himyarite Kingdom", { continent: "Arabia", note: "Incense kingdom of southern Arabia.", population: 1_000_000 }],
  ["Nabatean Kingdom", { continent: "Arabia", note: "Trading kingdom whose capital was Petra.", population: 200_000 }],
  ["Armenia", { continent: "Western Asia", note: "Ancient Armenian kingdom, often caught between Rome and Parthia.", modernName: "Armenia", population: 2_000_000 }],
  ["Koguryo", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the north.", population: 3_000_000 }],
  ["Paekche", { continent: "East Asia", note: "Korean Three-Kingdoms-era state in the south-west.", population: 1_500_000 }],
  ["Silla", { continent: "East Asia", note: "Korean Three-Kingdoms-era state, eventual unifier of Korea.", population: 1_000_000 }],
  ["Yayoi", { continent: "East Asia", note: "Pre-state cultures of early Japan.", population: 1_500_000 }],
  ["Scythians", { continent: "Eurasian Steppe", note: "Nomadic peoples of the Pontic-Caspian steppe.", population: 1_000_000 }],
  ["Sarmatians", { continent: "Eurasian Steppe", note: "Nomadic Iranian peoples; later allies + rivals of Rome.", population: 500_000 }],
  ["Dacia", { continent: "Eastern Europe", note: "Iron-Age kingdom in modern Romania; conquered by Rome in 106 AD.", population: 1_000_000 }],

  // Medieval (600 AD – 1300 AD) --------------------------------------------
  // 600 AD uses "Eastern Roman Empire" and "Sasanian Empire"; from 800 onwards
  // the dataset says "Byzantine Empire" and there's no Sassanid Persia.
  ["Eastern Roman Empire", { continent: "Eastern Mediterranean", note: "Byzantine Empire; capital Constantinople.", population: 26_000_000 }],
  ["Byzantine Empire", { continent: "Eastern Mediterranean", note: "Eastern Roman Empire; capital Constantinople.", population: 12_000_000 }],
  ["Sasanian Empire", { continent: "Western Asia", note: "Last pre-Islamic Persian empire.", population: 22_000_000 }],
  ["Tang", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age.", population: 80_000_000 }],
  ["Abbasid Caliphate", { continent: "Middle East", note: "Islamic caliphate; capital Baghdad.", population: 50_000_000 }],
  ["Umayyad Caliphate", { continent: "Middle East", note: "Earlier Islamic caliphate; capital Damascus.", population: 33_000_000 }],
  ["Carolingian Empire", { continent: "Western Europe", note: "Charlemagne's Frankish empire.", population: 15_000_000 }],
  ["Frankish Kingdom", { continent: "Western Europe", note: "Merovingian / early Frankish kingdom; ancestor of France + Germany.", population: 6_000_000 }],
  ["Holy Roman Empire", { continent: "Central Europe", note: "Successor to the Carolingian Empire in Central Europe.", population: 26_000_000 }],
  ["Mongol Empire", { continent: "Eurasia", note: "The largest contiguous land empire in human history.", population: 110_000_000 }],
  ["Great Khanate", { continent: "East Asia", note: "Yuan dynasty — Kublai Khan's Mongol-ruled China.", population: 85_000_000 }],
  ["Khanate of the Golden Horde", { continent: "Eurasian Steppe", note: "Western successor of the Mongol Empire over Russia + Kazakhstan.", population: 10_000_000 }],
  ["Chagatai Khanate", { continent: "Central Asia", note: "Central-Asian successor of the Mongol Empire.", population: 5_000_000 }],
  ["Ilkhanate", { continent: "Western Asia", note: "Persian successor of the Mongol Empire.", population: 15_000_000 }],
  ["Yuan", { continent: "East Asia", note: "Mongol-ruled dynasty of China.", population: 85_000_000 }],
  ["Song", { continent: "East Asia", note: "Song dynasty — Chinese economic + technological boom.", population: 100_000_000 }],
  ["Khmer Empire", { continent: "Southeast Asia", note: "Builders of Angkor Wat.", population: 1_500_000 }],
  ["Srivijaya", { continent: "Southeast Asia", note: "Maritime empire of Sumatra.", population: 2_500_000 }],
  ["Mali Empire", { continent: "West Africa", note: "Wealthy West African empire of Mansa Musa.", population: 50_000_000 }],
  ["Mali", { continent: "West Africa", note: "Medieval Mali Empire of Mansa Musa.", population: 50_000_000 }],
  ["Ghana Empire", { continent: "West Africa", note: "Earlier West African trans-Saharan trading power.", population: 4_000_000 }],
  ["Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade.", population: 4_000_000 }],
  ["Empire of Ghana", { continent: "West Africa", note: "Medieval Ghana Empire — trans-Saharan gold trade.", population: 4_000_000 }],
  ["Great Zimbabwe", { continent: "Southern Africa", note: "Iron-Age trading state and stone-walled capital.", population: 150_000 }],
  ["Visigothic Kingdom", { continent: "Iberia", note: "Germanic kingdom in Iberia after Rome's fall.", population: 6_000_000 }],
  ["Lombard principalities", { continent: "Italy", note: "Germanic kingdoms that ruled post-Roman Italy.", population: 3_000_000 }],
  ["Lombard duchies", { continent: "Italy", note: "Lombard polities of central + southern Italy.", population: 2_000_000 }],
  ["Avars", { continent: "Eastern Europe", note: "Nomadic confederation; rivals of the Byzantines.", population: 500_000 }],
  ["Bulgars", { continent: "Eastern Europe", note: "First Bulgarian Empire of the Balkans.", population: 5_000_000 }],

  // Early modern (1500 – 1815) ----------------------------------------------
  ["Aztec Empire", { continent: "Mesoamerica", note: "Triple-alliance empire centred on Tenochtitlan.", population: 5_000_000 }],
  ["Inca Empire", { continent: "South America", note: "Andean empire stretching from Ecuador to Chile.", population: 12_000_000 }],
  ["Ming", { continent: "East Asia", note: "Ming dynasty — Great Wall, Forbidden City, voyages of Zheng He.", population: 160_000_000 }],
  ["Qing", { continent: "East Asia", note: "Last imperial Chinese dynasty.", population: 432_000_000 }],
  ["Manchu Empire", { continent: "East Asia", note: "Qing dynasty — China's last imperial dynasty. Used the yellow dragon banner, not the modern Chinese flag.", population: 432_000_000 }],
  ["Mughal Empire", { continent: "South Asia", note: "Persianate Muslim empire that built the Taj Mahal.", population: 150_000_000 }],
  ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Sultanate ruling Anatolia, the Balkans, and the Middle East.", population: 35_000_000 }],
  ["Spanish Empire", { continent: "Global", note: "First truly global empire; covered the Americas, Philippines, and parts of Africa.", population: 70_000_000 }],
  ["Portuguese Empire", { continent: "Global", note: "Maritime empire — Brazil, Africa, India, Macau, Timor.", population: 22_000_000 }],
  ["French Empire", { continent: "Global", note: "Napoleonic France at its peak.", population: 44_000_000 }],
  ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg empire (1804–1867), before Austria-Hungary. Flew the gold-and-black Habsburg colours.", population: 30_000_000 }],
  ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Vast Eurasian empire under the Romanovs.", population: 178_000_000 }],
  ["Tokugawa Shogunate", { continent: "East Asia", note: "Edo-period Japan.", population: 32_000_000 }],
  ["Safavid Empire", { continent: "Western Asia", note: "Iranian Shia empire; rival of the Ottomans.", population: 10_000_000 }],
  ["Prussia", { continent: "Central Europe", note: "German kingdom that unified Germany in 1871.", population: 11_000_000 }],
  ["Maratha Confederacy", { continent: "South Asia", note: "Hindu confederation that broke Mughal power in 18th-century India.", population: 80_000_000 }],
  ["Viceroyalty of Brazil", { flag: "historical-flags/ukpba.png", continent: "South America", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825) — Brazil was part of a joint kingdom with Portugal, not yet independent." }],

  // === Hausa Bakwai (Hausa-State city-states, 1500/1700) ====================
  // The 7 "true" Hausa city-states plus a couple of "Banza Bakwai". Each
  // had its own king (sarki) and walled capital. None had modern-style
  // national flags, so all are flag-less by design.
  ["Kano",    { continent: "West Africa", note: "Largest and richest Hausa city-state; major trans-Saharan trade hub.", population: 250_000 }],
  ["Katsina", { continent: "West Africa", note: "Northern Hausa city-state; great Islamic learning centre.", population: 150_000 }],
  ["Daura",   { continent: "West Africa", note: "Considered the oldest of the Hausa Bakwai by tradition.", population: 50_000 }],
  ["Zazzau",  { continent: "West Africa", note: "Southernmost Hausa city-state (modern Zaria); ruled by the famed Queen Amina in the late 16th c.", population: 100_000 }],
  ["Gobir",   { continent: "West Africa", note: "Northern Hausa city-state; would later resist the Sokoto Caliphate's jihad in the early 19th c.", population: 80_000 }],
  ["Rano",    { continent: "West Africa", note: "Smaller Hausa state, ally of Kano.", population: 40_000 }],
  ["Biram",   { continent: "West Africa", note: "Founder-state of the Hausa Bakwai by tradition, centred on Hadejia.", population: 30_000 }],
  ["Kebbi",   { continent: "West Africa", note: "Banza Bakwai (\"bastard seven\") Hausa state — Kebbi Sultanate.", population: 80_000 }],

  // === Mossi kingdoms (Burkina Faso, 1500–1815) =============================
  // Three / four independent Mossi naam (chiefdoms) of the Volta basin,
  // founded c. 11th–15th c. They resisted both Mali and Songhai for
  // centuries. No flags survive from the period.
  ["Kingdom of Wagadugu",     { continent: "West Africa", note: "Most prominent Mossi kingdom; its capital became modern Ouagadougou.", population: 500_000 }],
  ["Kingdom of Yatenga",      { continent: "West Africa", note: "Northern Mossi kingdom centred on Ouahigouya.", population: 250_000 }],
  ["Kingdom of Tenkodogo",    { continent: "West Africa", note: "Considered the oldest Mossi kingdom by tradition.", population: 150_000 }],
  ["Kingdom of Fada N'Gourma", { continent: "West Africa", note: "Easternmost Mossi kingdom.", population: 150_000 }],

  // === Burmese kingdoms (1500) ==============================================
  // After Ava's collapse the Burmese world fragmented into competing
  // kingdoms. The unified Toungoo dynasty would re-emerge in the mid-16th c.
  ["Ava",                  { continent: "Southeast Asia", note: "Upper-Burmese kingdom on the Irrawaddy; successor to Pagan.", population: 2_000_000 }],
  ["Pegu (Hanthawaddy)",   { continent: "Southeast Asia", note: "Mon kingdom of southern Burma; rivals of Ava.", population: 1_000_000 }],
  ["Mrauk U",              { continent: "Southeast Asia", note: "Coastal Arakanese kingdom on the Bay of Bengal.", population: 500_000 }],
  ["Shan principalities",  { continent: "Southeast Asia", note: "Patchwork of Tai/Shan principalities in the eastern hills, often vassals of Ava or China.", population: 500_000 }],

  // === Aymara kingdoms (1300) — Lake Titicaca altiplano =====================
  // Network of small Aymara-speaking kingdoms after the fall of Tiwanaku
  // and before the Inca conquest (c. 1450). All flag-less.
  ["Lupaca",   { continent: "South America", note: "Western lake-shore Aymara kingdom; later allies of the Inca.", population: 150_000 }],
  ["Colla",    { continent: "South America", note: "Northern lake-shore Aymara kingdom; resisted Inca expansion.", population: 200_000 }],
  ["Pacajes",  { continent: "South America", note: "Southern Aymara kingdom of the altiplano.", population: 100_000 }],
  ["Carangas", { continent: "South America", note: "Western altiplano Aymara kingdom (modern Oruro region).", population: 80_000 }],
  ["Charcas",  { continent: "South America", note: "South-eastern Aymara confederation in modern southern Bolivia.", population: 100_000 }],

  // === Indian patchworks (500 BC – 800 AD) =================================
  // Modern Indian admin-1 boundaries used to subdivide the dataset's
  // "Hindu kingdoms" / "Hindu states" lumped polygon into the dominant
  // polities of each era. Borders are heavily approximate — ancient
  // kingdoms didn't follow modern state lines — but the labels track the
  // era's history. All flag-less by design (none had a national flag).
  ["Anarta region", { continent: "South Asia", note: "North-western coast — the Mahabharata's land of Krishna's Dwaraka.", population: 1_000_000 }],
  ["Avanti Mahajanapada", { continent: "South Asia", note: "Powerful central-Indian realm with capital Ujjayini.", population: 3_000_000 }],
  ["Bengal kingdoms", { continent: "South Asia", note: "Vanga and Pundra kingdoms of the Ganges delta.", population: 4_000_000 }],
  ["Chalukya of Vatapi", { continent: "South Asia", note: "Powerful Deccan dynasty, soon to fight the Pallavas.", population: 10_000_000 }],
  ["Chera Kingdom", { continent: "South Asia", note: "Westernmost of the three classical Tamil kingdoms.", population: 2_000_000 }],
  ["Chera Kingdoms", { continent: "South Asia", note: "Smaller Chera principalities of the west coast.", population: 2_500_000 }],
  ["Chola / Pandya kingdoms", { continent: "South Asia", note: "Two of the three classical Tamil kingdoms — Chola in the centre, Pandya in the south.", population: 5_000_000 }],
  ["Eastern Ganga dynasty", { continent: "South Asia", note: "Builders of the Konark Sun Temple, in later centuries.", population: 5_000_000 }],
  ["Gauda Kingdom", { continent: "South Asia", note: "Shashanka's kingdom of Bengal.", population: 4_000_000 }],
  ["Gurjara dynasty", { continent: "South Asia", note: "Predecessors of the Pratiharas.", population: 3_000_000 }],
  ["Gurjara-Pratihara", { continent: "South Asia", note: "Northern Indian dynasty; held off Arab incursions across the Sindh.", population: 50_000_000 }],
  ["Kuru Mahajanapada", { continent: "South Asia", note: "One of the great Vedic-age realms, north-west of the Ganges.", population: 1_500_000 }],
  ["Late Gupta successors", { continent: "South Asia", note: "Petty kingdoms of the late-Gupta collapse.", population: 5_000_000 }],
  ["Late Pallava / early Chola", { continent: "South Asia", note: "End of Pallava power; the Cholas would soon rise to imperial heights.", population: 8_000_000 }],
  ["Later Gupta dynasty", { continent: "South Asia", note: "Smaller successor of the imperial Guptas.", population: 8_000_000 }],
  ["Maitraka Kingdom", { continent: "South Asia", note: "Western kingdom centred on Valabhi.", population: 2_000_000 }],
  ["Matsya Mahajanapada", { continent: "South Asia", note: "Centred on Viratanagara in modern Rajasthan.", population: 1_000_000 }],
  ["Maukhari Kingdom", { continent: "South Asia", note: "Centred on Kanyakubja (Kannauj); soon to fall to Harsha.", population: 8_000_000 }],
  ["Maukharis / small kingdoms", { continent: "South Asia", note: "Post-Mauryan principalities of the Ganges plain.", population: 10_000_000 }],
  ["Pala Empire", { continent: "South Asia", note: "Buddhist dynasty of Bengal and Bihar; sponsors of Nalanda.", population: 30_000_000 }],
  ["Pallava Kingdom", { continent: "South Asia", note: "Builders of Mahabalipuram; centred on Kanchipuram.", population: 7_000_000 }],
  ["Pancala / Kosala", { continent: "South Asia", note: "Twin great realms of the Ganges plain — Pancala in the west, Kosala in the east around Ayodhya.", population: 3_000_000 }],
  ["Rashtrakuta Empire", { continent: "South Asia", note: "Deccan empire of the 8th–10th centuries — the era's true superpower.", population: 40_000_000 }],
  ["Satavahana Empire", { continent: "South Asia", note: "Deccan empire bridging north and south India.", population: 15_000_000 }],
  ["Vakataka successors", { continent: "South Asia", note: "Local powers in the post-Vakataka Deccan.", population: 6_000_000 }],
  ["Western Satraps / Saka", { continent: "South Asia", note: "Indo-Scythian satrapies of the north-west.", population: 3_000_000 }],
  ["Yaudheya Confederation", { continent: "South Asia", note: "Republican confederation of warriors in the north-western plains.", population: 1_500_000 }],

  // === Maya world (100 AD – 1500) ===========================================
  // The dataset uses several closely-related lumped NAMEs for the Maya
  // (chiefdoms and states / states / city-states) across eras. Splitting
  // by modern Mexican / Guatemalan / Belizean / Honduran admin-1 gives
  // one feature per major Maya polity per era. None had flags.
  ["Belize Maya city-states", { continent: "Mesoamerica", note: "Caracol and other Belizean Maya polities.", population: 200_000 }],
  ["Calakmul", { continent: "Mesoamerica", note: "Tikal's great rival, the 'Kingdom of the Snake'.", population: 200_000 }],
  ["Caracol", { continent: "Mesoamerica", note: "Major Belizean Maya city-state, defeated Tikal in 562 AD.", population: 140_000 }],
  ["Caribbean Maya", { continent: "Mesoamerica", note: "Coastal Maya polities along the Caribbean.", population: 100_000 }],
  ["Cerros", { continent: "Mesoamerica", note: "Preclassic-Classic Belize Maya site.", population: 5_000 }],
  ["Champotón", { continent: "Mesoamerica", note: "Postclassic Maya port-state.", population: 25_000 }],
  ["Chontal Maya", { continent: "Mesoamerica", note: "Maritime trader Maya of the Gulf coast.", population: 80_000 }],
  ["Cobá", { continent: "Mesoamerica", note: "Late-Classic Maya city-state of the Caribbean coast.", population: 50_000 }],
  ["Copán", { continent: "Mesoamerica", note: "Southernmost major Maya city, famous for its stelae and hieroglyphic stairway.", population: 25_000 }],
  ["Ekab + Cocom", { continent: "Mesoamerica", note: "Eastern Yucatec city-states.", population: 60_000 }],
  ["Highland Maya", { continent: "Mesoamerica", note: "Highland Maya polities of the Verapaz.", population: 400_000 }],
  ["Itzá", { continent: "Mesoamerica", note: "Last independent Maya kingdom (Nojpetén) — held out until 1697.", population: 60_000 }],
  ["K'iche'", { continent: "Mesoamerica", note: "Highland Maya kingdom; would resist Pedro de Alvarado in 1524.", population: 200_000 }],
  ["Lacandon Maya", { continent: "Mesoamerica", note: "Forest-dwelling Maya who resisted the Spanish for centuries.", population: 30_000 }],
  ["Lamanai", { continent: "Mesoamerica", note: "Belize Maya city; one of the longest-occupied Maya sites.", population: 20_000 }],
  ["Lubaantun", { continent: "Mesoamerica", note: "Late-Classic Belizean Maya site.", population: 5_000 }],
  ["Mam", { continent: "Mesoamerica", note: "Highland Maya people of north-western Guatemala.", population: 150_000 }],
  ["Maya city-states (Belize)", { continent: "Mesoamerica", population: 100_000 }],
  ["Mayapán", { continent: "Mesoamerica", note: "Dominant Postclassic Yucatec capital, the last Maya 'state'.", population: 17_000 }],
  ["Mayapán successors", { continent: "Mesoamerica", note: "After Mayapán's 1441 fall, Yucatec split into ~16 chiefdoms.", population: 200_000 }],
  ["Northern Maya", { continent: "Mesoamerica", note: "Northern lowland city-states (Dzibilchaltun, Cobá).", population: 250_000 }],
  ["Palenque", { continent: "Mesoamerica", note: "Classic Maya city-state famed for its temple architecture and inscriptions.", population: 8_000 }],
  ["Preclassic Maya (Belize)", { continent: "Mesoamerica", note: "Early Cerros, Cuello, and Lamanai.", population: 30_000 }],
  ["Preclassic Maya (Calakmul region)", { continent: "Mesoamerica", note: "Early settlements of what would become Calakmul + El Mirador.", population: 250_000 }],
  ["Preclassic Maya (Caribbean coast)", { continent: "Mesoamerica", note: "Eastern Maya coastal settlements.", population: 40_000 }],
  ["Preclassic Maya (Chiapas)", { continent: "Mesoamerica", note: "Late-Preclassic Maya cities of the western Maya world (Izapa, early Palenque).", population: 80_000 }],
  ["Preclassic Maya (Copán region)", { continent: "Mesoamerica", note: "Southern Maya periphery — early settlements of Copán.", population: 20_000 }],
  ["Preclassic Maya (Petén)", { continent: "Mesoamerica", note: "Heart of the Maya jungle — early Tikal and El Mirador region.", population: 150_000 }],
  ["Preclassic Maya (Tabasco)", { continent: "Mesoamerica", note: "Western Maya lowlands — Comalcalco area.", population: 30_000 }],
  ["Preclassic Maya (Yucatán)", { continent: "Mesoamerica", note: "Earliest Yucatec Maya settlements.", population: 50_000 }],
  ["Preclassic Maya (highland)", { continent: "Mesoamerica", note: "Highland Maya of north Guatemala.", population: 100_000 }],
  ["Q'eqchi' Maya", { continent: "Mesoamerica", population: 200_000 }],
  ["Tikal", { continent: "Mesoamerica", note: "Major lowland Maya city-state in modern Guatemala.", population: 90_000 }],
  ["Tulum / Cobá", { continent: "Mesoamerica", note: "Postclassic Yucatec city-states of the Caribbean coast.", population: 40_000 }],
  ["Uxmal", { continent: "Mesoamerica", note: "Late-Classic Puuc-style city of northern Yucatán.", population: 25_000 }],

  // === Andean states & chiefdoms (1300) =====================================
  // Pre-Inca Andean polities of modern Peru and Ecuador, split by
  // department. The Chimú Empire is drawn separately by the dataset.
  ["Cajamarca Kingdom", { continent: "South America", note: "Northern highland kingdom — soon a key Inca tributary.", population: 80_000 }],
  ["Cañari Kingdom", { continent: "South America", note: "Southern Ecuadorian kingdom of the Andes.", population: 200_000 }],
  ["Chachapoya", { continent: "South America", note: "'Cloud forest people' of the eastern Andes.", population: 300_000 }],
  ["Chanka", { continent: "South America", note: "Highland confederation; defeated by Pachacuti Inca.", population: 70_000 }],
  ["Chincha", { continent: "South America", note: "Wealthy coastal kingdom famed for long-distance trade.", population: 100_000 }],
  ["Coastal chiefdoms (Arequipa)", { continent: "South America", note: "Southern coastal polities.", population: 50_000 }],
  ["Highland chiefdoms (Ancash)", { continent: "South America", note: "Pre-Inca highland polities — heirs of Chavín and Recuay.", population: 200_000 }],
  ["Huancavilca", { continent: "South America", note: "Coastal Huancavilca polities of southern Ecuador.", population: 150_000 }],
  ["Ichma", { continent: "South America", note: "Coastal kingdom around Pachacamac, the famed Andean oracle.", population: 50_000 }],
  ["Kingdom of Cuzco", { continent: "South America", note: "Highland kingdom that would soon become the heart of the Inca Empire (1438+).", population: 150_000 }],
  ["Manteño", { continent: "South America", note: "Coastal Manteño culture, famed for their long-distance balsa-raft trade.", population: 100_000 }],
  ["Palta", { continent: "South America", note: "Southernmost Ecuadorian Andean chiefdoms.", population: 50_000 }],
  ["Quitu / Caranqui", { continent: "South America", note: "Northern Andean chiefdoms of modern Ecuador.", population: 200_000 }],
  ["Wanka", { continent: "South America", note: "Central-highland Wanka confederation.", population: 200_000 }],

  // === Greek city-states (500 BC) ===========================================
  // The dataset draws three separate "Greek city-states" features —
  // Aegean, Magna Graecia in Italy, and a small Iberian polygon for the
  // Phocaean colonies. We split by modern Greek / Italian / Spanish
  // admin-1 to surface the most-famous poleis of each. None had a flag.
  ["Aegean islands", { continent: "Mediterranean", note: "Hundreds of small poleis — Naxos, Paros, Melos, Lesbos, Chios, Samos…", population: 600_000 }],
  ["Athens", { continent: "Mediterranean", note: "Democracy + naval power; emblem of the owl of Athena.", population: 300_000 }],
  ["Cretan poleis", { continent: "Mediterranean", note: "Knossos, Gortyn — Doric-speaking Cretan city-states.", population: 250_000 }],
  ["Emporion", { continent: "Mediterranean", note: "Phocaean Greek colony in modern Catalonia — a key trading post.", population: 5_000 }],
  ["Epirote tribes", { continent: "Mediterranean", note: "Tribal Greek kingdoms on the Adriatic coast.", population: 200_000 }],
  ["Greek trading colonies (Iberia)", { continent: "Mediterranean", note: "Hemeroskopeion and other small Phocaean outposts on the Iberian coast.", population: 10_000 }],
  ["Macedon + Thracian cities", { continent: "Mediterranean", note: "Macedon would soon absorb the rest under Philip II + Alexander.", population: 500_000 }],
  ["Magna Graecia (Sicily)", { continent: "Mediterranean", note: "Syracuse, Akragas, Selinunte, Gela — the great Dorian colonies of Sicily.", population: 600_000 }],
  ["Magna Graecia (mainland)", { continent: "Mediterranean", note: "Greek colonies in southern Italy — Sybaris, Croton, Taras (Tarentum), Cumae.", population: 400_000 }],
  ["Sparta + Corinth", { continent: "Mediterranean", note: "Sparta dominated the Peloponnese; Corinth held the isthmus.", population: 300_000 }],
  ["Thebes", { continent: "Mediterranean", note: "Boeotian polis; rival of both Athens and Sparta.", population: 150_000 }],

  // === Swahili-coast city-states (1300 + 1500) =============================
  // The dataset's "Islamic city-states" polygon is actually the East
  // African coast — Mogadishu, Pate, Mombasa, Malindi, Kilwa, Sofala —
  // not the post-Abbasid Middle East as the NAME might suggest. We split
  // by modern Somalia / Kenya / Tanzania / Mozambique coastal admin-1
  // boundaries.
  ["Ajuran Sultanate", { continent: "East Africa", note: "Rising Somali power that resisted the Portuguese.", population: 600_000 }],
  ["Bagamoyo / Kaole sultanates", { continent: "East Africa", note: "Mainland-coast Swahili settlements opposite Zanzibar.", population: 30_000 }],
  ["Kilwa Sultanate", { continent: "East Africa", note: "Greatest of the Swahili sultanates — its 14th-century gold trade made it fabulously rich.", population: 30_000 }],
  ["Malindi", { continent: "East Africa", note: "Famous medieval Swahili city — visited by Zheng He's treasure fleet (1418).", population: 15_000 }],
  ["Mogadishu Sultanate", { continent: "East Africa", note: "Wealthiest Swahili-coast city; commanded the Indian-Ocean gold trade.", population: 30_000 }],
  ["Mombasa Sultanate", { continent: "East Africa", note: "Rival of Malindi and Kilwa; key Indian-Ocean port.", population: 20_000 }],
  ["Mozambique Island sultanate", { continent: "East Africa", note: "Northernmost Mozambican Swahili port.", population: 10_000 }],
  ["Northern Tanzanian Swahili cities", { continent: "East Africa", note: "Small coastal sultanates between Mombasa and Zanzibar.", population: 20_000 }],
  ["Pate Sultanate", { continent: "East Africa", note: "City-state of the Lamu archipelago; Indian-Ocean trading hub.", population: 15_000 }],
  ["Sofala Sultanate", { continent: "East Africa", note: "Gold-trade emporium serving Great Zimbabwe's mines.", population: 10_000 }],
  ["Somali coastal sultanates", { continent: "East Africa", note: "Patchwork of Hawiye / Ajuran emerging powers.", population: 200_000 }],
  ["Zanzibar Sultanates", { continent: "East Africa", note: "Stone Town and the Zanzibar archipelago.", population: 30_000 }],

  // === Malaysian Islamic sultanates (1500) =================================
  // Maritime Southeast Asia in 1500 was a patchwork of Muslim sultanates
  // (Pasai, Demak, Banten, Ternate, Tidore, Brunei, Sulu…) plus the
  // still-Hindu Bali. The dataset shows them all under one "Malaysian
  // Islamic states" polygon — we split by modern Indonesian /
  // Malaysian / Bruneian / Philippine admin-1 boundaries.
  ["Bangka tin sultanates", { continent: "Maritime SE Asia", population: 20_000 }],
  ["Banjar Sultanate", { continent: "Maritime SE Asia", note: "Major Kalimantan Muslim sultanate centred on Banjarmasin.", population: 300_000 }],
  ["Banten / Cirebon", { continent: "Maritime SE Asia", note: "West-Java Muslim sultanates — Banten and Cirebon.", population: 600_000 }],
  ["Banten Sultanate", { continent: "Maritime SE Asia", note: "Rising west-Java sultanate; would soon control the Sunda Strait pepper trade.", population: 200_000 }],
  ["Bengkulu chiefdoms", { continent: "Maritime SE Asia", population: 50_000 }],
  ["Bima Sultanate", { continent: "Maritime SE Asia", note: "Eastern Indonesian Muslim sultanate on Sumbawa.", population: 80_000 }],
  ["Brunei satellites", { continent: "Maritime SE Asia", note: "Northern Kalimantan, under Brunei's expanding influence.", population: 100_000 }],
  ["Buton Sultanate", { continent: "Maritime SE Asia", note: "Small Muslim sultanate of south-east Sulawesi.", population: 100_000 }],
  ["Demak Sultanate", { continent: "Maritime SE Asia", note: "First major Muslim sultanate on Java (founded c. 1475); soon to topple Majapahit.", population: 1_000_000 }],
  ["Gowa-Tallo Sultanate", { continent: "Maritime SE Asia", note: "Rising Bugis-Makassar twin sultanate of southern Sulawesi.", population: 400_000 }],
  ["Hindu Bali (Gelgel)", { continent: "Maritime SE Asia", note: "Bali remained Hindu — last hold-out of pre-Islamic Java.", population: 250_000 }],
  ["Jambi Sultanate", { continent: "Maritime SE Asia", note: "Sumatran Malay sultanate on the Batang Hari river.", population: 60_000 }],
  ["Kutai Sultanate", { continent: "Maritime SE Asia", note: "East Kalimantan Muslim sultanate.", population: 30_000 }],
  ["Lampung principalities", { continent: "Maritime SE Asia", note: "Patchwork of small Muslim chiefdoms in southern Sumatra.", population: 80_000 }],
  ["Mandar chiefdoms", { continent: "Maritime SE Asia", note: "Mandar coastal chiefdoms.", population: 50_000 }],
  ["Minahasa / Gorontalo", { continent: "Maritime SE Asia", note: "Northern Sulawesi chiefdoms.", population: 80_000 }],
  ["Minangkabau realm", { continent: "Maritime SE Asia", note: "Highland matrilineal Muslim society of central Sumatra.", population: 400_000 }],
  ["Palembang Sultanate", { continent: "Maritime SE Asia", note: "Late-Srivijaya successor; gradually Islamising in the 15th–16th c.", population: 150_000 }],
  ["Papuan coastal chiefdoms", { continent: "Maritime SE Asia", note: "Bird's-head Papua under loose Ternate / Tidore tribute.", population: 100_000 }],
  ["Pasai Sultanate", { continent: "Maritime SE Asia", note: "Earliest Indonesian Muslim sultanate (founded c. 1297) — the gateway of Islam to the archipelago.", population: 150_000 }],
  ["Riau-Lingga sultanates", { continent: "Maritime SE Asia", note: "Strait-of-Malacca Muslim trading polities.", population: 80_000 }],
  ["Sambas / Sukadana sultanates", { continent: "Maritime SE Asia", note: "Western Kalimantan Muslim sultanates.", population: 50_000 }],
  ["Solor / Larantuka", { continent: "Maritime SE Asia", note: "Mixed Muslim and Catholic chiefdoms after Portuguese arrival.", population: 30_000 }],
  ["Sulawesi chiefdoms", { continent: "Maritime SE Asia", note: "Mostly still pre-Islamic in 1500; would Islamise in the 17th c.", population: 200_000 }],
  ["Sulu Sultanate", { continent: "Maritime SE Asia", note: "Muslim sultanate of the Sulu archipelago; Brunei's southern rival.", population: 100_000 }],
  ["Ternate / Tidore Sultanates", { continent: "Maritime SE Asia", note: "Rival Spice-Islands sultanates that controlled the world clove trade.", population: 150_000 }],

  // === Indian Muslim sultanates (1500) =====================================
  // Three separate "Islamic states" dataset polygons — Sindh, Gujarat,
  // and the Deccan. The Deccan polygon splits into the five Bahmani
  // successor sultanates that broke off c. 1490.
  ["Ahmadnagar Sultanate", { continent: "South Asia", note: "Nizam Shahi dynasty, declared independent from Bahmani in 1490.", population: 3_000_000 }],
  ["Baluch tribal confederations", { continent: "South Asia", note: "Tribal Baluch and Makran polities.", population: 500_000 }],
  ["Bidar Sultanate", { continent: "South Asia", note: "Barid Shahi dynasty centred on Bidar's massive fort.", population: 1_500_000 }],
  ["Bijapur Sultanate", { continent: "South Asia", note: "Adil Shahi dynasty — would build the Gol Gumbaz and rule Karnataka for two centuries.", population: 4_000_000 }],
  ["Golkonda Sultanate", { continent: "South Asia", note: "Qutb Shahi dynasty famed for its diamond mines — Hyderabad's founders.", population: 3_500_000 }],
  ["Gujarat Sultanate (Muzaffarid)", { continent: "South Asia", note: "Wealthy maritime Muslim sultanate — its capital Ahmedabad was one of India's largest cities.", population: 6_000_000 }],
  ["Punjab marches (Delhi Sultanate frontier)", { continent: "South Asia", note: "Western frontier of the Lodi Delhi Sultanate.", population: 4_000_000 }],
  ["Samma dynasty (Sindh Sultanate)", { continent: "South Asia", note: "Muslim Sindhi dynasty centred on Thatta; would soon fall to the Arghuns.", population: 2_000_000 }],

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
  ["Rattanakosin Kingdom", { continent: "Southeast Asia", note: "Modern Kingdom of Thailand, founded 1782 — capital Bangkok.", population: 5_000_000 }],
  // Qajar Persia used the Lion-and-Sun banner, not the modern Iran flag —
  // intentionally no modernName so the panel shows "no flag image".
  ["Persia", { continent: "Western Asia", note: "Qajar-era Persia (forerunner of modern Iran). Used the Lion-and-Sun banner — different from the modern flag.", population: 10_000_000 }],
  ["Sweden–Norway", { continent: "Northern Europe", note: "Personal union of Sweden and Norway, 1814–1905. Sweden's tricross banner was very close to today's Swedish flag.", modernName: "Sweden", population: 4_500_000 }],
  // These were independent states in 1815, decades before Italy unified
  // (1861). No modernName — modern Italian tricolour is anachronistic.
  ["Kingdom of Sardinia", { continent: "Italy", note: "Piedmont-Sardinia — would later lead Italian unification, but used the Savoy flag in 1815.", population: 4_000_000 }],
  ["Kingdom of the Two Sicilies", { continent: "Italy", note: "Bourbon kingdom of southern Italy and Sicily — its own flag, not the Italian tricolour.", population: 7_400_000 }],
  // 1914 "Kingdom of Italy" (dataset typo "Kingfom"). By 1914 unified Italy
  // flew the green-white-red tricolour with the Savoy arms — close enough
  // to today's flag for kid-level recognition.
  ["Kingfom of Italy", { continent: "Italy", note: "Kingdom of Italy, 1861–1946 (dataset has a typo of \"Kingdom\").", modernName: "Italy", population: 36_000_000 }],

  // Modern (1914 – today) --------------------------------------------------
  ["Austro-Hungarian Empire", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Dual monarchy of the Habsburgs.", population: 51_000_000 }],
  ["German Empire", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "Kaiserreich under Wilhelm II.", population: 67_000_000 }],
  ["Soviet Union", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991.", population: 293_000_000 }],
  ["USSR", { flag: "historical-flags/ussr.png", continent: "Eastern Europe / North Asia", note: "Union of Soviet Socialist Republics, 1922–1991.", population: 293_000_000 }],
  ["Yugoslavia", { flag: "historical-flags/yugoslavia.png", continent: "SE Europe", note: "Socialist Federal Republic of Yugoslavia, 1945–1992.", population: 23_000_000 }],
  ["Czechoslovakia", { flag: "historical-flags/czechoslovakia.png", continent: "Central Europe", note: "Federal Republic of Czechs and Slovaks, 1918–1992.", population: 15_000_000 }],
  ["British Empire", { continent: "Global", note: "Largest empire in history at its 1922 peak.", population: 458_000_000 }],
  ["British Raj", { continent: "South Asia", note: "British rule of India, 1858–1947.", population: 390_000_000 }],
  ["British East India Company", { continent: "South Asia", note: "Company rule of India before the 1858 Raj.", population: 200_000_000 }],
  ["Belgian Congo", { continent: "Central Africa", note: "Colonial Belgian rule of modern DRC.", population: 13_000_000 }],
  ["French Indochina", { continent: "Southeast Asia", note: "French colonial rule of Vietnam / Laos / Cambodia.", population: 22_000_000 }],
  ["Dutch East Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia.", population: 60_000_000 }],
  ["Netherlands Indies", { continent: "Southeast Asia", note: "Dutch colonial rule of modern Indonesia.", population: 60_000_000 }],
  ["Abyssinia", { continent: "East Africa", note: "Historical name for Ethiopia, never colonised by Europe.", modernName: "Ethiopia", population: 11_000_000 }],
  ["Empire of Japan", { continent: "East Asia", note: "Imperial Japan, 1868–1947.", modernName: "Japan", population: 105_000_000 }],
  ["Burma", { continent: "Southeast Asia", note: "Pre-1989 name for Myanmar.", modernName: "Myanmar", population: 17_000_000 }],
  ["Ceylon", { continent: "South Asia", note: "Pre-1972 name for Sri Lanka.", modernName: "Sri Lanka", population: 10_000_000 }],
  ["Siam", { continent: "Southeast Asia", note: "Pre-1939 name for Thailand.", modernName: "Thailand", population: 15_000_000 }],
  ["Zaire", { continent: "Central Africa", note: "Name of the DRC under Mobutu, 1971–1997.", modernName: "DR Congo", population: 30_000_000 }],
  ["United Kingdom of Great Britain and Ireland", { continent: "Northern Europe", note: "Pre-1922 UK including all of Ireland.", modernName: "United Kingdom", population: 46_000_000 }],
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
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Kingdom of France under the Valois — the white Bourbon-style royal banner with fleur-de-lis was used in this period.", population: 16_000_000 }],
  ])],
  ["ad1700", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon France under Louis XIV. White royal banner with fleur-de-lis — the tricolour wasn't adopted until 1790.", population: 21_500_000 }],
  ])],
  ["ad1815", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon Restoration (1814–1830) — France flew the white royal banner with fleur-de-lis. The tricolour wasn't readopted until 1830.", population: 30_500_000 }],
    ["United States", { flag: "historical-flags/us-15star.png", continent: "North America", note: "The Star-Spangled Banner, 1795–1818: 15 stars and 15 stripes. A star+stripe pair was added for every new state until 1818.", population: 8_400_000 }],
    ["Portugal", { flag: "historical-flags/ukpba.png", continent: "Iberia", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825). The familiar red-and-green Portuguese flag wasn't adopted until 1911.", population: 3_100_000 }],
    ["Portuguese East Africa", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese Mozambique, ruled from Lisbon under the UKPBA banner.", population: 2_000_000 }],
    ["Portuguese Guinea", { flag: "historical-flags/ukpba.png", continent: "West Africa", note: "Portuguese colony in modern Guinea-Bissau.", population: 200_000 }],
    ["Delagoa Bay", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese trading post in modern Mozambique.", population: 5_000 }],
    ["Goa", { flag: "historical-flags/ukpba.png", continent: "South Asia", note: "Portuguese India — held until 1961.", population: 250_000 }],
    // === Malay peninsula + Borneo (1815) =====================================
    // The dataset's lumped "Malaya" feature is split into the actual
    // contemporary polities by /scripts/split-malaya.py — see the
    // resulting feature NAMEs below. Each sultanate's modern Malaysian
    // state flag is used as a faithful descendant of the sultanate's
    // historic banner (the dynasties continue today as constitutional
    // rulers and the flags trace directly to them).
    ["Johor Sultanate", { flag: "historical-flags/johor.png", continent: "Southeast Asia", note: "Independent Malay sultanate of the southern peninsula and Singapore, founded 1528 by the heirs of Malacca.", population: 150_000 }],
    ["Kedah Sultanate", { flag: "historical-flags/kedah.png", continent: "Southeast Asia", note: "Oldest sultanate on the peninsula (founded c. 1136); paid tribute to Siam.", population: 100_000 }],
    ["Perak Sultanate", { flag: "historical-flags/perak.png", continent: "Southeast Asia", note: "Sultanate of the silver-rich Perak River valley.", population: 80_000 }],
    ["Selangor Sultanate", { flag: "historical-flags/selangor.png", continent: "Southeast Asia", note: "Sultanate founded by Bugis migrants in the 18th century — covered the whole west coast around modern KL.", population: 60_000 }],
    ["Pahang Sultanate", { flag: "historical-flags/pahang.png", continent: "Southeast Asia", note: "Largest east-coast sultanate by land area.", population: 60_000 }],
    ["Terengganu Sultanate", { flag: "historical-flags/terengganu.png", continent: "Southeast Asia", note: "East-coast sultanate famed for its songket weaving.", population: 70_000 }],
    ["Kelantan Sultanate", { flag: "historical-flags/kelantan.png", continent: "Southeast Asia", note: "North-east sultanate, long under Siamese influence.", population: 90_000 }],
    ["Negeri Sembilan", { flag: "historical-flags/negeri-sembilan.png", continent: "Southeast Asia", note: "Confederation of nine Minangkabau-descended chieftaincies — a federation of small states rather than a single sultanate.", population: 30_000 }],
    ["Perlis", { flag: "historical-flags/perlis.png", continent: "Southeast Asia", note: "Small northern principality; vassal of Kedah and Siam in 1815.", population: 15_000 }],
    // European holdings on the peninsula — use the metropole's then-current flag.
    ["Dutch Malacca", { continent: "Southeast Asia", note: "Former Malay sultanate; held by the Dutch 1641–1825 before being ceded to Britain.", modernName: "Netherlands", population: 25_000 }],
    ["British Penang", { continent: "Southeast Asia", note: "Ceded to the British East India Company in 1786 — the first British holding on the peninsula. Flew the Union Jack (1801 design).", modernName: "United Kingdom", population: 25_000 }],
    // Northern Borneo in 1815 was the Brunei Sultanate's territory, not
    // British. Before 1906 Brunei flew a plain yellow flag — same colour
    // as today's, without the modern emblems and stripes.
    ["Brunei Sultanate", { flag: "historical-flags/brunei-1815.png", continent: "Southeast Asia", note: "In 1815 Brunei still controlled most of northern Borneo; James Brooke and the British North Borneo Co. wouldn't carve out Sarawak and Sabah until 1841 and 1881.", population: 600_000 }],
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
export function polityModernName(name: string, eraId?: Era["id"]): string | null {
  if (eraId) {
    const eraEntry = ERA_OVERRIDES.get(eraId)?.get(name);
    if (eraEntry?.modernName) return eraEntry.modernName;
  }
  const info = POLITY_REGISTRY.get(name);
  if (info?.modernName) return info.modernName;
  const alias = MODERN_NAME_ALIASES.get(name);
  if (alias) return alias;
  return null;
}
