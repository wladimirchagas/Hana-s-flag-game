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
  /** Explicit "show no flag" marker. Suppresses both the curated-flag
   *  path and the modern-country-name auto-fallback even in eras where
   *  the auto-fallback would otherwise apply (1914+). Use for ancient
   *  entities whose NAME happens to match a modern country (Egypt,
   *  Armenia) and for occupied / between-states polities (Korea 1945,
   *  Saar Protectorate, Yemen pre-1990) where no national flag applies. */
  noFlag?: true;
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
  // 1880 replaces the former "1850" era. There is no upstream world_1850 map;
  // the file this app shipped was world_1815.geojson with 12 labels rewritten by
  // a local script, so the "1850" era drew 1815 borders (no Texas, Oregon or the
  // Mexican Cession; no independent Greece or Belgium). 1880 is a real dated
  // upstream map — see docs/historical-eras-improvement-plan.md §5.1. Never
  // re-create an era by relabelling a neighbouring year's map.
  {
    id: "ad1880",
    label: "1880",
    caption: "Scramble for Africa",
    year: "1880",
    summary: "Africa on the eve of partition — Sokoto, Asante, Zululand and the Wassoulou Empire still independent; the Qing, Ottoman and Russian empires intact; Germany and Italy newly unified.",
    dataUrl: MAP("world_1880"),
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
    caption: `${new Date().getFullYear()} · Present day`,
    year: String(new Date().getFullYear()),
    summary: `The modern world in ${new Date().getFullYear()}: 195 UN member states recognised by the United Nations.`,
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
  // No modernName / noFlag on the registry entry for ancient Egypt —
  // ancient Egypt is what's left of the 2000 BC entry; modern-era Egypts
  // (1914 Khedivate, 1945 Kingdom, 1960 UAR, today) are handled via
  // ERA_OVERRIDES below.
  ["Egypt", { continent: "North Africa", note: "Ancient kingdom along the Nile.", population: 3_000_000, noFlag: true }],
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
  // The 600 AD file spells the same city with a grave accent ("Teotihuacàn").
  // Registry keys must match the dataset NAME verbatim, so both spellings are
  // listed — otherwise the era that uses the variant renders a bare name.
  ["Teotihuacàn", { continent: "Mesoamerica", note: "Massive city-state in the Valley of Mexico.", population: 200_000 }],
  ["Moche", { continent: "South America", note: "Andean civilisation of coastal Peru.", population: 500_000 }],
  ["Nazca", { continent: "South America", note: "Andean civilisation famous for the desert geoglyphs.", population: 50_000 }],
  ["Himyarite Kingdom", { continent: "Arabia", note: "Incense kingdom of southern Arabia.", population: 1_000_000 }],
  ["Nabatean Kingdom", { continent: "Arabia", note: "Trading kingdom whose capital was Petra.", population: 200_000 }],
  // Modern Armenian tricolour adopted 1990 — wrong for ancient Armenia.
  // Modern Armenia in 1914 was inside the Russian Empire / Ottoman, no
  // independent flag — see ERA_OVERRIDES below for 1914.
  ["Armenia", { continent: "Western Asia", note: "Ancient Armenian kingdom, often caught between Rome and Parthia.", population: 2_000_000, noFlag: true }],
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
  ["Eastern Roman Empire", { flag: "historical-flags/byzantine-empire.png", continent: "Eastern Mediterranean", note: "Byzantine Empire; capital Constantinople.", population: 26_000_000 }],
  ["Byzantine Empire", { flag: "historical-flags/byzantine-empire.png", continent: "Eastern Mediterranean", note: "Eastern Roman Empire; capital Constantinople.", population: 12_000_000 }],
  ["Sasanian Empire", { continent: "Western Asia", note: "Last pre-Islamic Persian empire.", population: 22_000_000 }],
  ["Tang", { continent: "East Asia", note: "Tang dynasty — China's cosmopolitan golden age.", population: 80_000_000 }],
  ["Abbasid Caliphate", { continent: "Middle East", note: "Islamic caliphate; capital Baghdad.", population: 50_000_000 }],
  ["Umayyad Caliphate", { continent: "Middle East", note: "Earlier Islamic caliphate; capital Damascus.", population: 33_000_000 }],
  ["Carolingian Empire", { continent: "Western Europe", note: "Charlemagne's Frankish empire.", population: 15_000_000 }],
  ["Frankish Kingdom", { continent: "Western Europe", note: "Merovingian / early Frankish kingdom; ancestor of France + Germany.", population: 6_000_000 }],
  ["Holy Roman Empire", { flag: "historical-flags/holy-roman-empire.png", continent: "Central Europe", note: "Successor to the Carolingian Empire in Central Europe.", population: 26_000_000 }],
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
  ["Qing", { flag: "historical-flags/qing-dynasty.png", continent: "East Asia", note: "Last imperial Chinese dynasty. The yellow dragon banner was China's national flag from 1889 until the 1912 revolution.", population: 432_000_000 }],
  ["Manchu Empire", { flag: "historical-flags/qing-dynasty.png", continent: "East Asia", note: "Qing dynasty — China's last imperial dynasty. The yellow dragon banner was the national flag from 1889 until the 1912 revolution.", population: 432_000_000 }],
  ["Mughal Empire", { flag: "historical-flags/mughal-empire.png", continent: "South Asia", note: "Persianate Muslim empire that built the Taj Mahal.", population: 150_000_000 }],
  ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Sultanate ruling Anatolia, the Balkans, and the Middle East.", population: 35_000_000 }],
  ["Spanish Empire", { continent: "Global", note: "First truly global empire; covered the Americas, Philippines, and parts of Africa.", population: 70_000_000 }],
  ["Portuguese Empire", { continent: "Global", note: "Maritime empire — Brazil, Africa, India, Macau, Timor.", population: 22_000_000 }],
  ["French Empire", { continent: "Global", note: "Napoleonic France at its peak.", population: 44_000_000 }],
  ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg empire (1804–1867), before Austria-Hungary. The red-white-red civil ensign is one of Europe's oldest national symbols, in use since the 13th century.", population: 30_000_000 }],
  ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Vast Eurasian empire under the Romanovs.", population: 178_000_000 }],
  ["Tokugawa Shogunate", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Edo-period Japan.", population: 32_000_000 }],
  ["Safavid Empire", { continent: "Western Asia", note: "Iranian Shia empire; rival of the Ottomans.", population: 10_000_000 }],
  ["Prussia", { continent: "Central Europe", note: "Kingdom of Prussia — the dominant German state that unified Germany in 1871. Flew the black eagle on white; the German tricolour didn't exist until 1848.", noFlag: true, population: 11_000_000 }],
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
  // The 800 AD file carries BOTH the hyphenated and the space-separated
  // spelling as separate features; keep both keys so neither renders bare.
  ["Gurjara Pratihara", { continent: "South Asia", note: "Northern Indian dynasty; held off Arab incursions across the Sindh.", population: 50_000_000 }],
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
  // Rattanakosin Siam (1782–1932) used the red-with-white-elephant flag
  // until the modern Thai tricolour was adopted in 1917.
  ["Rattanakosin Kingdom", { flag: "historical-flags/siam.png", continent: "Southeast Asia", note: "Rattanakosin Kingdom — modern Thailand's predecessor (founded 1782, capital Bangkok). Red field with white elephant was used until the tricolour came in 1917.", population: 5_000_000 }],
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

  // === 1815 / 1850 independent states ======================================
  // These polities had established national identities and flags (or clear
  // colonial-power flags) well before 1850. Added explicitly because the
  // modern-flag auto-fallback only applies to 1914+ eras.

  // Latin American republics — all adopted national flags at independence
  // (1810s–1820s) that are essentially the same as today's.
  ["Haiti", { continent: "Caribbean", note: "Republic of Haiti — the world's first Black republic, independent since 1804. The blue-and-red bicolour with coat of arms has been in use since 1820.", modernName: "Haiti", population: 700_000 }],
  ["United Provinces of La Plata", { continent: "South America", note: "United Provinces of the Río de la Plata — the revolutionary predecessor of Argentina (1810–1831). The sky-blue and white flag with the Sun of May was adopted in 1818.", modernName: "Argentina", population: 500_000 }],
  ["Paraguay", { continent: "South America", note: "Republic of Paraguay, independent since 1811. The distinctive tricolour with different emblems on each face has been in use since 1842.", modernName: "Paraguay", population: 600_000 }],

  // Asian monarchies with long-established flags or symbols
  ["Nepal", { continent: "South Asia", note: "Kingdom of Nepal — the unique double-pennant crimson flag is one of the world's oldest national symbols, formalised in 1962 but in use for centuries.", modernName: "Nepal", population: 3_000_000 }],
  ["Bhutan", { continent: "South Asia", note: "Kingdom of Bhutan — the Druk (Thunder Dragon) flag has been in use since at least the 18th century.", modernName: "Bhutan", population: 300_000 }],
  // Modern Oman flag adopted 1970 — wrong for 1815/1850 (they flew a plain red flag).
  ["Oman", { continent: "Arabia", note: "Sultanate of Oman — the Al Said dynasty has flown a red flag since 1744; the modern design with white stripe and emblem was formalised in 1970.", noFlag: true, population: 700_000 }],

  // Joseon Korea — no modern-style national flag until the Taegukgi (1882)
  ["Korea", { continent: "East Asia", note: "Joseon (Yi) dynasty of Korea. No standardised national flag until the Taegukgi was introduced in 1882.", noFlag: true, population: 7_000_000 }],

  // Malay peninsula & Borneo sultanates — the same dynasties whose
  // modern Malaysian state flags descend directly from them. Safe to use
  // as both 1815 and 1850 representations.
  ["Johor Sultanate", { flag: "historical-flags/johor.png", continent: "Southeast Asia", note: "Independent Malay sultanate of the southern peninsula and Singapore, founded 1528 by the heirs of Malacca.", population: 150_000 }],
  ["Kedah Sultanate", { flag: "historical-flags/kedah.png", continent: "Southeast Asia", note: "Oldest sultanate on the peninsula (founded c. 1136); paid tribute to Siam.", population: 100_000 }],
  ["Perak Sultanate", { flag: "historical-flags/perak.png", continent: "Southeast Asia", note: "Sultanate of the silver-rich Perak River valley.", population: 80_000 }],
  ["Selangor Sultanate", { flag: "historical-flags/selangor.png", continent: "Southeast Asia", note: "Sultanate founded by Bugis migrants in the 18th century.", population: 60_000 }],
  ["Pahang Sultanate", { flag: "historical-flags/pahang.png", continent: "Southeast Asia", note: "Largest east-coast sultanate by land area.", population: 60_000 }],
  ["Terengganu Sultanate", { flag: "historical-flags/terengganu.png", continent: "Southeast Asia", note: "East-coast sultanate famed for its songket weaving.", population: 70_000 }],
  ["Kelantan Sultanate", { flag: "historical-flags/kelantan.png", continent: "Southeast Asia", note: "North-east sultanate, long under Siamese influence.", population: 90_000 }],
  ["Negeri Sembilan", { flag: "historical-flags/negeri-sembilan.png", continent: "Southeast Asia", note: "Confederation of nine Minangkabau-descended chieftaincies.", population: 30_000 }],
  ["Perlis", { flag: "historical-flags/perlis.png", continent: "Southeast Asia", note: "Small northern principality; vassal of Kedah and Siam.", population: 15_000 }],
  ["Brunei", { flag: "historical-flags/brunei-1815.png", continent: "Southeast Asia", note: "Brunei Sultanate — in this era Brunei controlled most of northern Borneo and flew a plain yellow flag (the modern design with stripes dates from 1906).", population: 500_000 }],
  ["Brunei Sultanate", { flag: "historical-flags/brunei-1815.png", continent: "Southeast Asia", note: "Brunei Sultanate — in 1815/1850 Brunei still controlled most of northern Borneo; the plain yellow flag was used until 1906 when the modern design was formalised.", population: 600_000 }],
  ["British Penang", { flag: "historical-flags/penang.png", continent: "Southeast Asia", note: "Penang — ceded to the British East India Company in 1786, the first British foothold on the Malay Peninsula.", population: 25_000 }],
  ["British Malacca", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Malacca — part of the Straits Settlements with Penang and Singapore from 1826, flying the Union Jack.", population: 30_000 }],

  // === 1815 / 1850 European minor states ====================================
  ["San Marino", { continent: "Italy", note: "Most Serene Republic of San Marino — one of the world's oldest republics; the blue-and-white flag has been in use since at least the 19th century.", modernName: "San Marino", population: 20_000 }],
  ["Papal States", { continent: "Italy", note: "The Pope's temporal domains in central Italy — yellow-and-white flag. The papacy lost these territories to united Italy in 1870.", noFlag: true, population: 3_000_000 }],
  ["Luxembourg", { continent: "Western Europe", note: "Grand Duchy of Luxembourg — the tricolour (red-white-light blue) has been in use since 1845.", modernName: "Luxembourg", population: 300_000 }],

  // === Caribbean colonial territories ======================================
  // British West Indies — Union Jack flew over these territories in 1815/1850
  ["Anguilla", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 3_000 }],
  ["Antigua and Barbuda", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 37_000 }],
  ["Barbados", { modernName: "United Kingdom", continent: "Caribbean", note: "British crown colony since 1625 — the Union Jack flew until independence in 1966.", population: 100_000 }],
  ["Dominica", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 22_000 }],
  ["Grenada", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Montserrat", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 10_000 }],
  ["Saint Kitts and Nevis", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Saint Lucia", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Saint Vincent and the Grenadines", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony — the Union Jack was the official flag.", population: 30_000 }],
  ["Trinidad", { modernName: "United Kingdom", continent: "Caribbean", note: "British colony from 1797 — the Union Jack flew until independence in 1962.", population: 90_000 }],
  // French West Indies — the French tricolour flew over these territories
  ["Guadeloupe", { modernName: "France", continent: "Caribbean", note: "French colony — the tricolour was the official flag.", population: 120_000 }],
  ["Martinique", { modernName: "France", continent: "Caribbean", note: "French colony — the tricolour was the official flag.", population: 100_000 }],
  ["Saint Barthelemy", { modernName: "France", continent: "Caribbean", note: "French colony (briefly Swedish 1784–1878) — the French tricolour was the official flag in 1815.", population: 3_000 }],
  ["Saint Martin", { modernName: "France", continent: "Caribbean", note: "Northern half French, southern half Dutch — the French tricolour flew on the French side.", population: 5_000 }],
  ["Guiana", { modernName: "France", continent: "South America", note: "French Guiana — French colony on the South American mainland; the tricolour was the official flag.", population: 20_000 }],
  // Dutch Caribbean
  ["Netherlands Antilles", { modernName: "Netherlands", continent: "Caribbean", note: "Dutch Caribbean colonies — the Dutch tricolour was the official flag.", population: 50_000 }],

  // === African kingdoms (1815 / 1850) =======================================
  // These were powerful pre-colonial African polities with their own
  // royal symbols, but no standardised modern-style national flags.
  ["Asante", { continent: "West Africa", note: "Asante Empire (Ashanti) — one of West Africa's most powerful kingdoms, in modern Ghana. Famous for Kente cloth and the Golden Stool.", noFlag: true, population: 3_000_000 }],
  ["Sokoto Caliphate", { continent: "West Africa", note: "Sokoto Caliphate (Fulani Empire) — founded 1804 by Usman dan Fodio; the largest state in 19th-century sub-Saharan Africa, covering most of northern Nigeria.", noFlag: true, population: 10_000_000 }],
  ["Fulani Empire", { continent: "West Africa", note: "The Fulani Empire is another name for the Sokoto Caliphate — see Sokoto Caliphate.", noFlag: true, population: 10_000_000 }],
  ["Bornu-Kanem", { continent: "West Africa", note: "Kanem-Bornu Empire — one of the longest-lasting states in African history (around Lake Chad, in modern Nigeria and Chad).", noFlag: true, population: 5_000_000 }],
  ["Fante", { continent: "West Africa", note: "Fante Confederation — a loose alliance of Akan peoples of coastal Ghana, rivals of the Asante.", noFlag: true, population: 800_000 }],
  ["Kaarta", { continent: "West Africa", note: "Kingdom of Kaarta — a Bambara state in modern western Mali, sibling rival of the Ségou empire.", noFlag: true, population: 300_000 }],
  ["Buganda", { continent: "East Africa", note: "Kingdom of Buganda — the largest of the Great Lakes kingdoms, in modern Uganda.", noFlag: true, population: 1_500_000 }],
  ["Bunyoro", { continent: "East Africa", note: "Kingdom of Bunyoro-Kitara — ancient rival of Buganda, in modern Uganda.", noFlag: true, population: 800_000 }],
  ["Nkore", { continent: "East Africa", note: "Kingdom of Nkore (Ankole) — one of the inter-lacustrine Great Lakes kingdoms, in modern Uganda.", noFlag: true, population: 600_000 }],
  ["Rwanda", { continent: "East Africa", note: "Kingdom of Rwanda — pre-colonial Great Lakes monarchy; the modern nation's flag dates from 2001.", noFlag: true, population: 1_000_000 }],
  ["Burundi", { continent: "East Africa", note: "Kingdom of Burundi (Urundi) — pre-colonial Great Lakes monarchy; the modern flag dates from 1966.", noFlag: true, population: 1_200_000 }],
  ["Lozi", { continent: "Southern Africa", note: "Lozi Kingdom (Barotseland) — in modern western Zambia.", noFlag: true, population: 500_000 }],
  ["Lunda", { continent: "Central Africa", note: "Lunda Empire — a major Central African trading state straddling modern Angola/DRC/Zambia.", noFlag: true, population: 1_000_000 }],
  ["Kazembe", { continent: "Central Africa", note: "Kingdom of Kazembe — eastern branch of the Lunda Empire, in modern Zambia.", noFlag: true, population: 500_000 }],
  ["Imbangala", { continent: "Central Africa", note: "Imbangala (Jaga) polities of modern Angola — warrior states in the Angolan interior.", noFlag: true, population: 300_000 }],
  ["Zanzibar", { continent: "East Africa", note: "Sultanate of Zanzibar — governed by the Omani Busaidi dynasty from the 1690s. Flew a plain red flag (same as Omani Muscat); the modern Oman flag was only adopted in 1970.", noFlag: true, population: 200_000 }],
  ["Somalia", { continent: "East Africa", note: "Patchwork of Somali sultanates (Majeerteen, Geledi, etc.) — no unified Somali state or flag until 1960.", noFlag: true, population: 2_000_000 }],
  ["Zulu", { continent: "Southern Africa", note: "Zulu Kingdom under Shaka and his successors — the most powerful state in 19th-century southern Africa.", noFlag: true, population: 600_000 }],
  ["Xhosa", { continent: "Southern Africa", note: "Xhosa-speaking chiefdoms of the Eastern Cape — no standardised national flag.", noFlag: true, population: 500_000 }],
  ["Sotho", { continent: "Southern Africa", note: "Basotho Kingdom founded by Moshoeshoe I (c. 1820) — precursor to modern Lesotho.", noFlag: true, population: 300_000 }],
  ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo (or successor Loango / Kakongo states) — pre-colonial Central African kingdom in modern Angola / DRC / Congo-Brazzaville.", noFlag: true, population: 2_000_000 }],

  // === South and Southeast Asian states =====================================
  ["Travancore", { continent: "South Asia", note: "Kingdom of Travancore — Indian princely state on the Malabar coast; under British paramountcy after 1795.", noFlag: true, population: 3_000_000 }],
  ["Oudh", { continent: "South Asia", note: "Kingdom of Oudh (Awadh) — Indian princely state in the Ganges plain, annexed by the British in 1856.", noFlag: true, population: 11_000_000 }],
  ["Mysore (Indian princely state)", { continent: "South Asia", note: "Kingdom of Mysore — reduced to a British-protected princely state after Tipu Sultan's defeat in 1799.", noFlag: true, population: 6_000_000 }],
  ["Sikkim (Indian princely state)", { continent: "South Asia", note: "Kingdom of Sikkim — small Himalayan Buddhist monarchy, became a British protectorate in 1890.", noFlag: true, population: 100_000 }],
  ["Assam", { continent: "South Asia", note: "Ahom Kingdom of Assam — Southeast Asian dynasty that ruled Assam for 600 years; annexed by Britain in 1826.", noFlag: true, population: 3_000_000 }],
  ["Arakan", { continent: "Southeast Asia", note: "Kingdom of Arakan (Mrauk-U) — coastal kingdom in modern Rakhine State, Myanmar; annexed by the Konbaung Burmese in 1785.", noFlag: true, population: 1_000_000 }],
  ["Cambodia", { continent: "Southeast Asia", note: "Khmer kingdom under Vietnamese and Siamese pressure. No standardised national flag before the French colonial period (1863).", noFlag: true, population: 1_000_000 }],
  ["Afghanistan", { continent: "Central Asia", note: "Durrani/Barakzai emirate. The Black-Red-Green tricolour wasn't formalised until 1928; no standardised national flag in this era.", noFlag: true, population: 4_000_000 }],
  ["Philippines", { flag: "historical-flags/spain-1785.png", continent: "Southeast Asia", note: "Spanish colonial Philippines — the Crown of Castile's red-yellow-red flag flew over the islands from 1785 onwards. The modern Philippine flag wasn't adopted until the 1898 revolution.", population: 4_000_000 }],
  ["Arakan (Indian princely state)", { continent: "Southeast Asia", note: "Arakan under British-Indian administration.", noFlag: true, population: 800_000 }],
  ["Laos", { continent: "Southeast Asia", note: "Various Lao kingdoms (Lane Xang, Vientiane, Luang Prabang, Champasak) — no unified Laotian state or standardised flag.", noFlag: true, population: 1_000_000 }],

  // === British Crown Colonies / territories =================================
  ["Canada", { modernName: "United Kingdom", continent: "North America", note: "British North America — the Union Jack flew over the colonial territories that would unite as Canada in 1867.", population: 400_000 }],
  ["Hong Kong", { modernName: "United Kingdom", continent: "East Asia", note: "British Crown Colony of Hong Kong — ceded from Qing China in 1842; the Union Jack flew until 1997.", population: 100_000 }],
  ["Sierra Leone", { modernName: "United Kingdom", continent: "West Africa", note: "British Crown Colony of Sierra Leone — established 1808; the Union Jack was the official flag.", population: 500_000 }],
  ["Senegal", { modernName: "France", continent: "West Africa", note: "French colonial Senegal (Saint-Louis, Gorée) — the tricolour was the official flag.", population: 700_000 }],
  ["Angola", { flag: "historical-flags/ukpba.png", continent: "Central Africa", note: "Portuguese Angola — colonial territory of Portugal, which in 1815 flew the United Kingdom of Portugal, Brazil and the Algarves banner.", population: 1_500_000 }],

  // === Oceania / Pacific ===================================================
  ["Kongldom of Hawaii", { continent: "Pacific", note: "Kingdom of Hawaiʻi — an independent Polynesian monarchy from 1810 until the US-backed overthrow of Queen Liliuokalani in 1893. The kingdom's flag combined the Union Jack with horizontal stripes.", noFlag: true, population: 130_000 }],
  ["Tuʻi Tonga Empire", { continent: "Pacific", note: "Tuʻi Tonga Empire — a maritime Polynesian empire centred on Tonga that influenced much of the Pacific.", noFlag: true, population: 30_000 }],
  ["Expansionist Kingdom of Merina", { continent: "East Africa", note: "Kingdom of Merina — the dominant Malagasy kingdom that was unifying Madagascar in the early 19th century.", noFlag: true, population: 1_000_000 }],

  // === European minor states (1815 / 1850) ==================================
  // The German Confederation had ~39 member states; the larger ones shown
  // here all had their own dynastic flags but the modern German flag is
  // entirely anachronistic (Germany didn't unify until 1871). Better to
  // show no flag than the wrong one.
  ["Bavaria", { continent: "Central Europe", note: "Kingdom of Bavaria — major German state in the pre-unification era.", noFlag: true, population: 4_200_000 }],
  ["Saxony", { continent: "Central Europe", note: "Kingdom of Saxony — German state in the pre-unification era.", noFlag: true, population: 1_900_000 }],
  ["Hanover", { continent: "Central Europe", note: "Kingdom of Hanover — German state in the pre-unification era; the British monarch was also King of Hanover until 1837.", noFlag: true, population: 1_800_000 }],
  ["Württemberg", { continent: "Central Europe", note: "Kingdom of Württemberg — German state in the pre-unification era.", noFlag: true, population: 1_600_000 }],
  ["Baden", { continent: "Central Europe", note: "Grand Duchy of Baden — German state in the pre-unification era.", noFlag: true, population: 1_000_000 }],
  ["Lombardy", { continent: "Italy", note: "Lombardy-Venetia — Austrian crownland in northern Italy until the 1859 Italian wars of independence.", noFlag: true, population: 2_500_000 }],
  ["Venetia", { continent: "Italy", note: "The Venetia (former Republic of Venice) — Austrian crownland until 1866.", noFlag: true, population: 2_300_000 }],
  ["Tuscany", { continent: "Italy", note: "Grand Duchy of Tuscany — Habsburg-Lorraine dynasty; Italian unification ended it in 1859.", noFlag: true, population: 1_100_000 }],
  ["Republic of Kraków", { continent: "Central Europe", note: "Free City of Kraków — a nominally independent republic 1815–1846, then annexed by Austria.", noFlag: true, population: 80_000 }],
  ["Tripolitania", { continent: "North Africa", note: "Ottoman Vilayet of Tripolitania (western Libya) — the Ottoman flag flew over it until Italian conquest in 1912.", noFlag: true, population: 500_000 }],
  ["Cyrenaica", { continent: "North Africa", note: "Ottoman Vilayet of Cyrenaica (eastern Libya) — the Ottoman flag flew over it until Italian conquest in 1912.", noFlag: true, population: 200_000 }],
  ["Tunis", { continent: "North Africa", note: "Beylik of Tunis — autonomous Ottoman regency; had its own red flag with crescent and star (forerunner of modern Tunisia's flag).", noFlag: true, population: 1_000_000 }],
  ["Algiers", { continent: "North Africa", note: "Regency of Algiers — autonomous Ottoman state until France invaded in 1830. No standardised national flag.", noFlag: true, population: 3_000_000 }],
  ["central Asian khanates", { continent: "Central Asia", note: "Khanates of the Central Asian steppe (Khiva, Bukhara, Kokand) — independent Islamic successor states of the Mongol era.", noFlag: true, population: 5_000_000 }],
  ["Kuril Islands", { continent: "East Asia", note: "Kuril Islands — disputed between Russia and Japan; the 1825 Simoda Treaty began clarifying boundaries.", noFlag: true, population: 5_000 }],

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
  ["Zaire", { flag: "historical-flags/zaire.png", continent: "Central Africa", note: "Name of the DRC under Mobutu, 1971–1997. The Zairian flag (green with yellow torch and arm) is very different from today's DRC flag.", population: 30_000_000 }],
  ["United Kingdom of Great Britain and Ireland", { continent: "Northern Europe", note: "Pre-1922 UK including all of Ireland.", modernName: "United Kingdom", population: 46_000_000 }],
  ["Gambia, The", { continent: "West Africa", modernName: "Gambia" }],
  ["Tanzania, United Republic of", { continent: "East Africa", modernName: "Tanzania" }],
  ["Korea, Democratic People's Republic of", { continent: "East Asia", modernName: "North Korea" }],
  ["Korea, Republic of", { continent: "East Asia", modernName: "South Korea" }],

  // === Medieval European kingdoms (1300–1700) ================================
  // Added to provide info panels for eras without specific ERA_OVERRIDES.
  // All flag-less here (medieval heraldry ≠ national flags); ERA_OVERRIDES
  // for ad1500/ad1700 add flag images where appropriate.
  ["France", { continent: "Western Europe", note: "Medieval Kingdom of France — Capetian and Valois rulers. Fleur-de-lis heraldry predates the Bourbon white royal banner.", noFlag: true, population: 18_000_000 }],
  ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal — the Quinas (five blue shields) banner dates from the 12th century but no standard national flag existed in the modern sense.", noFlag: true, population: 1_500_000 }],
  ["England", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Kingdom of England — flew the Cross of St George (white field, red cross) from the medieval era.", population: 4_000_000 }],
  ["English territory", { continent: "Northern Europe", note: "English-controlled territory — the Cross of St George was the English national emblem.", noFlag: true, population: 3_500_000 }],
  ["Castile", { continent: "Iberia", note: "Crown of Castile — the castle banner; would merge with Aragón to form Spain.", noFlag: true, population: 5_000_000 }],
  ["Castille", { continent: "Iberia", note: "Crown of Castile — the castle banner; would later unite with Aragón to form Spain.", noFlag: true, population: 5_200_000 }],
  ["Aragón", { continent: "Iberia", note: "Crown of Aragón — a Mediterranean power controlling Sicily and Sardinia in the later Middle Ages.", noFlag: true, population: 3_000_000 }],
  ["Navarre", { continent: "Iberia", note: "Kingdom of Navarre — small but strategically placed kingdom between France and Spain.", noFlag: true, population: 200_000 }],
  ["Hungary", { continent: "Central Europe", note: "Kingdom of Hungary — major power in Central Europe; the Apostolic Double Cross banner.", noFlag: true, population: 3_500_000 }],
  ["Imperial Hungary", { continent: "Central Europe", note: "Habsburg-ruled Hungary — contested between the Habsburgs, local nobles, and the Ottomans.", noFlag: true, population: 3_000_000 }],
  ["Poland", { continent: "Eastern Europe", note: "Kingdom of Poland — later merged with Lithuania into the Polish-Lithuanian Commonwealth.", noFlag: true, population: 2_500_000 }],
  ["Lithuania", { continent: "Eastern Europe", note: "Grand Duchy of Lithuania — one of the largest states in 14th-century Europe.", noFlag: true, population: 2_000_000 }],
  ["Poland-Lithuania", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth — a major European power from 1569 to 1795.", population: 11_000_000 }],
  ["Polish–Lithuanian Commonwealth", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth (Rzeczpospolita) — a vast noble republic stretching from the Baltic to the Black Sea.", population: 11_000_000 }],
  ["Novgorod", { continent: "Eastern Europe", note: "Novgorod Republic — a wealthy trading republic of north-western Russia; member of the Hanseatic League.", noFlag: true, population: 400_000 }],
  ["Georgia", { continent: "Western Asia", note: "Kingdom of Georgia — a medieval Christian kingdom at its peak in the 12th–13th centuries before the Mongol invasion.", noFlag: true, population: 2_000_000 }],
  ["Venice", { flag: "historical-flags/venice.png", continent: "Italy", note: "Most Serene Republic of Venice — a maritime trading empire; the golden Lion of St Mark on red was its emblem.", population: 800_000 }],
  ["Scotland", { continent: "Northern Europe", note: "Kingdom of Scotland — the Cross of St Andrew (Saltire), white diagonal cross on blue, is one of Europe's oldest national symbols.", noFlag: true, population: 1_000_000 }],
  ["Scottland", { continent: "Northern Europe", note: "Kingdom of Scotland (dataset spelling variant) — Saltire, white diagonal cross on blue.", noFlag: true, population: 1_000_000 }],
  ["Teutonic Knights", { continent: "Central Europe", note: "Teutonic Order state — crusading military-religious order that colonised Prussia and the Baltic.", noFlag: true, population: 700_000 }],
  ["Kalmar Union", { continent: "Northern Europe", note: "Kalmar Union (1397–1523) — personal union of Denmark, Sweden and Norway under one Scandinavian monarch.", noFlag: true, population: 3_000_000 }],
  ["Raška", { continent: "SE Europe", note: "Raška (medieval Serbia) — the Nemanjić dynasty's kingdom; ancestor of the Serbian state.", noFlag: true, population: 1_000_000 }],
  ["Trebizond", { continent: "Eastern Mediterranean", note: "Empire of Trebizond — last surviving remnant of the Byzantine Empire, on the Black Sea coast.", noFlag: true, population: 200_000 }],
  ["Norway", { continent: "Northern Europe", note: "Kingdom of Norway — the red-field-with-golden-lion banner (before the Dannebrog-influenced modern flag).", noFlag: true, population: 500_000 }],
  ["Genoa", { continent: "Italy", note: "Republic of Genoa — rival of Venice; the red cross on white (St George Cross) was its banner.", noFlag: true, population: 400_000 }],
  ["Florence", { continent: "Italy", note: "Republic of Florence — the great centre of the Italian Renaissance.", noFlag: true, population: 600_000 }],
  ["Milan", { continent: "Italy", note: "Duchy of Milan — wealthy northern Italian state; Visconti and later Sforza rulers.", noFlag: true, population: 800_000 }],
  ["Naples", { continent: "Italy", note: "Kingdom of Naples — southern Italy under Angevin and later Aragonese rule.", noFlag: true, population: 2_000_000 }],
  ["Sardinia", { continent: "Italy", note: "Kingdom of Sardinia (medieval) — contested between Aragon and Genoa.", noFlag: true, population: 200_000 }],
  ["Cyprus", { continent: "Mediterranean", note: "Kingdom of Cyprus — Lusignan dynasty crusader kingdom; later Venetian.", noFlag: true, population: 150_000 }],
  ["Corsica", { continent: "Mediterranean", note: "Medieval Corsica — nominally Genoese after 1346.", noFlag: true, population: 50_000 }],
  ["Granada", { continent: "Iberia", note: "Emirate of Granada — last Muslim kingdom of Iberia; fell to Castile and Aragón in 1492.", noFlag: true, population: 500_000 }],
  ["Morocco", { continent: "North Africa", note: "Medieval Morocco — Marinid/Wattasid sultantes. No standardised national flag in this era.", noFlag: true, population: 3_000_000 }],
  ["Ethiopia", { continent: "East Africa", note: "Ethiopian highlands in this era — Solomon dynasty rule of the Zagwe successors. No national flag.", noFlag: true, population: 3_000_000 }],
  ["Benin", { continent: "West Africa", note: "Kingdom of Benin — the Benin Empire of modern southern Nigeria, famous for its bronze plaques.", noFlag: true, population: 1_000_000 }],
  ["Oyo", { continent: "West Africa", note: "Oyo Empire — Yoruba empire of modern south-western Nigeria; one of the largest West African states in the 17th–18th centuries.", noFlag: true, population: 2_000_000 }],
  // === Medieval/early-modern Asian kingdoms (1300–1700) ======================
  ["Shogun Japan (Kamakura)", { continent: "East Asia", note: "Kamakura Shogunate Japan (1185–1333) — samurai government that coexisted with the emperor.", modernName: "Japan", population: 8_000_000 }],
  ["Sukhothai", { continent: "Southeast Asia", note: "Sukhothai Kingdom — the first Thai kingdom; developed the Thai script; preceded the Ayutthaya Kingdom.", noFlag: true, population: 500_000 }],
  ["Ayutthaya", { flag: "historical-flags/ayutthaya.png", continent: "Southeast Asia", note: "Ayutthaya Kingdom (1351–1767) — the predecessor to the Bangkok-based Rattanakosin Kingdom; a major trading state.", population: 3_000_000 }],
  ["Sultanate of Delhi", { continent: "South Asia", note: "Delhi Sultanate — the first major Islamic sultanate of northern India; five successive dynasties.", noFlag: true, population: 20_000_000 }],
  ["Vijayanagara", { continent: "South Asia", note: "Vijayanagara Empire — the last great Hindu empire of South India; centre of art, architecture and learning.", noFlag: true, population: 25_000_000 }],
  ["Songhai", { continent: "West Africa", note: "Songhai Empire — the largest empire in West African history at its peak (15th–16th c.); controlled Timbuktu and the trans-Saharan gold trade.", noFlag: true, population: 4_000_000 }],
  ["Tibet", { continent: "Central Asia", note: "Phagmodrupa dynasty's Tibet — nominally subject to the Yuan and Ming Chinese empires but practically independent.", noFlag: true, population: 2_000_000 }],
  ["Malacca", { continent: "Southeast Asia", note: "Sultanate of Malacca — dominant maritime trading state of the Malay world; fell to the Portuguese in 1511.", noFlag: true, population: 300_000 }],
  ["Grand Duchy of Moscow", { continent: "Eastern Europe", note: "Grand Duchy of Moscow — the rising principality that would unify Russia and become the Tsardom of Muscovy.", noFlag: true, population: 3_000_000 }],
  ["Tsardom of Muscovy", { continent: "Eastern Europe", note: "Tsardom of Muscovy — Ivan the Terrible's centralised Russian state (1547–1721); precursor to the Russian Empire.", noFlag: true, population: 6_000_000 }],
  ["Ming Chinese Empire", { continent: "East Asia", note: "Ming dynasty China (dataset label 'Ming Chinese Empire') — the Great Wall, the Forbidden City, and Zheng He's treasure voyages.", population: 160_000_000, modernName: "China", noFlag: true }],
  ["Đại Việt", { continent: "Southeast Asia", note: "Đại Việt — medieval Vietnamese kingdom, centred on the Red River delta; long period of independence from China.", noFlag: true, population: 5_000_000 }],
  ["Orissa", { continent: "South Asia", note: "Gajapati Kingdom of Orissa — a major Hindu dynasty of eastern India (14th–16th c.).", noFlag: true, population: 3_000_000 }],
  ["Hafsid Caliphate", { continent: "North Africa", note: "Hafsid Caliphate — Arab Berber rulers of Ifriqiya (modern Tunisia and Libya); nominal successors of the Abbasids.", noFlag: true, population: 2_000_000 }],
  ["Mamluke Sultanate", { continent: "Middle East", note: "Mamluk Sultanate of Egypt and Syria — slave-soldier dynasty that defeated the Mongols at Ain Jalut (1260).", noFlag: true, population: 5_000_000 }],
  ["Seljuk Caliphate", { continent: "Western Asia", note: "Rum Sultanate (Seljuks of Anatolia) — the Turkic successor in Anatolia after the main Seljuk empire fragmented.", noFlag: true, population: 2_500_000 }],
  ["Timurid Emirates", { continent: "Central Asia", note: "Timurid Empire — Timur (Tamerlane)'s successors ruled Persia and Central Asia; great patrons of the arts.", noFlag: true, population: 8_000_000 }],
  ["White Horde", { continent: "Eurasian Steppe", note: "White Horde — eastern division of the Golden Horde; the Ural and Caspian steppes.", noFlag: true, population: 1_000_000 }],
  ["Crimean Khanate", { continent: "Eastern Europe", note: "Crimean Khanate — Mongol successor state; a major slavers and raiders of the Black Sea steppe until 1783.", noFlag: true, population: 500_000 }],
  ["Khanate of Sibir", { continent: "Central Asia", note: "Khanate of Siberia — Mongol successor state in western Siberia; conquered by Yermak for Russia in the 1580s.", noFlag: true, population: 300_000 }],
  ["Wattasid Caliphate", { continent: "North Africa", note: "Wattasid Sultanate of Morocco (1472–1554) — Berber dynasty; contemporaries of the Ottoman expansion.", noFlag: true, population: 1_500_000 }],
  ["Zayyanid Caliphate", { continent: "North Africa", note: "Zayyanid Kingdom of Tlemcen (1235–1556) — Berber dynasty of western Algeria; rivals of the Hafsids and Marinids.", noFlag: true, population: 700_000 }],
  // === 1700-era specific entries =============================================
  ["Dutch Republic", { flag: "historical-flags/dutch-republic.png", continent: "Western Europe", note: "Dutch Republic (Republic of the Seven United Netherlands) — a global maritime and trading empire; the Dutch tricolour was introduced by the Prince of Orange in the 1570s.", population: 2_000_000 }],
  ["England and Ireland", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "England and Ireland under a personal union (pre-1707). Did not yet fly the Union Jack — the Cross of St George (England) flew as the national flag.", population: 7_500_000 }],
  ["New France", { continent: "North America", note: "New France — French colonial territory in Canada; the Bourbon royal banner and later the French tricolour flew over it.", noFlag: true, population: 20_000 }],
  ["New Amsterdam", { continent: "North America", note: "New Amsterdam (the Dutch colony on Manhattan Island) — became British New York in 1664. Dutch tricolour in the earlier period.", modernName: "Netherlands", population: 9_000 }],
  ["Portuguese Brazil", { continent: "South America", note: "Colonial Brazil — Portuguese Crown colony before 1815; royal Portuguese banner flew (not the modern red-green flag).", noFlag: true, population: 2_000_000 }],
  ["Vice Royalty of Peru", { flag: "historical-flags/spain-1785.png", continent: "South America", note: "Spanish Viceroyalty of Peru — 1700 spelling variant in the dataset. The Crown of Castile's red-yellow-red flag flew.", population: 2_000_000 }],
  ["Middag Kingdom", { continent: "East Asia", note: "Middag Kingdom — one of several Taiwanese aboriginal chiefdoms in the 17th-century central plains.", noFlag: true, population: 50_000 }],
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
  // 1914 colonial labels — route to the COLONIAL POWER (whose flag
  // actually flew over the territory at the time), not to the
  // post-independence successor state whose flag is anachronistic.
  ["Anglo-Egyption Sudan", "United Kingdom"],
  ["British East Africa", "United Kingdom"],
  ["British Somaliland", "United Kingdom"],
  ["German E. Africa (Tanganyika)", "German Empire"],
  ["German South-West Africa", "German Empire"],
  ["Italian Somaliland", "Italy"],
  ["Spanish Morocco", "Spain"],
  ["Spanish Sahara", "Spain"],
  ["Rio De Oro", "Spain"],
  ["Madagascar (France)", "France"],
  ["French Equatorial Africa", "France"],
  ["French West Africa", "France"],
  ["Gold Coast", "United Kingdom"],
  ["Togoland", "German Empire"], // 1914 still German (lost 1916, then UK/France mandates)
  ["Kamerun", "German Empire"], // 1914 still German
  ["Rhodesia", "United Kingdom"],
  ["Northern Rhodesia", "United Kingdom"],
  ["Nyasaland", "United Kingdom"],
  ["Arabia (Nejd)", "Saudi Arabia"], // emerging Saudi state — modern flag close enough by ~1932
  ["Nejd", "Saudi Arabia"],
  ["Sakhalin (RU)", "Russian Empire"], // 1914 Russian Empire flag, not modern Russia
  // 1945 occupation / colonial labels — route to the actual occupying /
  // colonial power as of 1945, not the eventual successor.
  ["Angola (Portugal)", "Portugal"],
  ["Guinea-Bissau (Portugal)", "Portugal"],
  ["Mozambique (Portugal)", "Portugal"],
  ["Cyraneica (UK Lybia)", "United Kingdom"], // UK military administration
  ["Tripolitana (UK Lybia)", "United Kingdom"],
  ["Fezzan (Frech Lybia)", "France"], // French military administration
  ["Germany (France)", "Germany"], // French zone — modern German flag is approximately the post-1949 West German one
  ["Germany (Soviet)", "Germany"],
  ["Germany (UK)", "Germany"],
  ["Germany (USA)", "Germany"],
  ["East Germany", "Germany"], // GDR flag had the coat of arms; modern flag is approximation
  ["West Germany", "Germany"],
  ["Jamaica (UK)", "United Kingdom"], // British colony in 1945
  ["Japan (USA)", "Japan"], // occupied Japan still flew the Hinomaru
  ["Martinique (France)", "France"],
  // Cochin China / Tonkin / Annam in 1945 represent the French-Indochinese
  // portions just before / during the Viet Minh independence declaration.
  // For accuracy in 1945, route to France (the de jure power was still
  // French Indochina until Sep 1945).
  ["Cochin China", "France"],
  ["Tonkin", "France"],
  ["Annam", "France"],
  ["Southern Cameroon", "United Kingdom"], // British Cameroons mandate
  // Korea (USA)/(USSR), Saar Protectorate, Manchuria 1945 — handled via
  // ERA_OVERRIDES below (need flag-less treatment or curated ROC flag).
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
  // Hainan in pre-modern eras was Qing/Ming Chinese — no flag in modern
  // sense. For 1914+ era it appears subsumed into China. Drop alias.
  // Hejaz was Ottoman vassal until 1916; the modern Saudi flag is post-1932
  // and visually distinct from the Hashemite/Sharifian/Ottoman banners.
  // Drop alias — leave flag-less for the relevant eras.
  // Yemen — modern flag adopted 1990 (post-unification); pre-1990 was the
  // YAR + PDRY split. For 1300/1500/1815/1945 the modern flag is wrong.
  // Drop alias — leave flag-less; 1960 YAR/PDRY handled separately if needed.

  // 1700-era colonial territories → route to the colonial power that actually
  // flew its national flag over these territories.
  ["Cuba (Spain)", "Spain"],
  ["Hispaniola (Spain)", "Spain"],
  ["Florida", "Spain"],       // Spanish Florida (1700)
  ["Virginia", "United Kingdom"],
  ["South Carolina", "United Kingdom"],
  ["Massachusetts Bay", "United Kingdom"],
  ["Dutch East Indies", "Netherlands"],
  ["Surinam", "Netherlands"],
  ["Essequibo", "Netherlands"],
  ["Cayenne", "France"],
  ["Portuguese East Africa", "Portugal"],
  ["Portuguese Guinea", "Portugal"],
  // Delagoa Bay was a Portuguese trading post — flag: UKPBA entry in 1815 registry
  // handles this already for 1815+. For 1700 fall through to noFlag.
  // "Dutch Formosa" and "Dutch Brazil" were historical (ended before 1700)
  // so they are dataset anachronisms; route to Netherlands as closest.
  ["Dutch Formosa", "Netherlands"],
  ["Dutch Brazil", "Netherlands"],
  // Lan Na — northern Thai kingdom, essentially absorbed by Ayutthaya.
  // No standardised flag; leave flag-less via missing-entry behaviour.
  // Laotian states — multiple Lao principalities in 1700; no unified flag.
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
  // === 600 AD overrides =====================================================
  // The Palaiologos dynasty flag (1261–1453) is the global Byzantine entry,
  // but in 600 AD the Byzantine Empire was the Justinian/Heraclian dynasty —
  // 661 years before Palaiologos. No surviving standardised flag for this era.
  ["ad600", new Map<string, PolityInfo>([
    ["Eastern Roman Empire", { continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire in 600 AD — Heraclian dynasty, capital Constantinople. No standardised flag; the Palaiologos double-eagle (our only Byzantine PNG) is 661 years too late.", population: 26_000_000 }],
  ])],

  // === 800 AD overrides =====================================================
  // "Byzantine Empire" name used from 800 onwards in the dataset.
  // The Palaiologos dynasty (1261–1453) is the global entry; in 800 AD the
  // Macedonian dynasty was ruling — 461 years before Palaiologos.
  // Holy Roman Empire: the post-1400 imperial banner is the global entry;
  // in 800 AD the Carolingian Empire was just forming (HRE formally 962 AD).
  ["ad800", new Map<string, PolityInfo>([
    ["Byzantine Empire", { continent: "Eastern Mediterranean", noFlag: true, note: "Byzantine Empire in 800 AD — Macedonian dynasty era. No standardised flag; the Palaiologos double-eagle (our only Byzantine PNG) is 461 years too late.", population: 20_000_000 }],
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire — Carolingian/Ottonian era, 800–962 AD. The post-1400 imperial banner (our only HRE PNG) is 400+ years too late for this dynasty.", population: 20_000_000 }],
  ])],

  // === 1300 (High/Late Medieval) overrides ==================================
  // The 1300 era uses the same polity NAMEs as the global POLITY_REGISTRY but
  // some need era-specific notes (the registry's generic entry may describe the
  // wrong century). In particular, we suppress any flag fallback for states
  // whose modern-sounding names exist in MODERN_NAME_ALIASES but whose 1300
  // situation was very different (e.g. Morocco was Marinid, not modern).
  ["ad1300", new Map<string, PolityInfo>([
    // France (Capetian/Valois): the fleur-de-lis banner ≠ Bourbon white flag
    ["France", { continent: "Western Europe", note: "Kingdom of France — Capetian dynasty in 1300; the Valois would follow in 1328. The fleur-de-lis azure banner predates the Bourbon white standard.", noFlag: true, population: 14_000_000 }],
    // Portugal: medieval Quinas banner — no modern-style flag
    ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal — the Quinas (five blue shields) banner was used, but no standardised flag in the modern sense.", noFlag: true, population: 1_200_000 }],
    // English territory (Plantagenet England in 1300)
    ["English territory", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Plantagenet England — the Cross of St George (white field, red cross) was the English emblem.", population: 5_000_000 }],
    // Morocco (Marinid Sultanate in 1300): not the modern flag
    ["Morocco", { continent: "North Africa", note: "Marinid Sultanate of Morocco — the Marinids had their own banner; the modern red flag with green pentagram didn't exist.", noFlag: true, population: 3_000_000 }],
    // Yemen (Rasulid Sultanate in 1300)
    ["Yemen", { continent: "Arabia", note: "Rasulid Sultanate — based in Aden and Zabid; the modern Yemeni flag is 20th-century.", noFlag: true, population: 1_500_000 }],
    // Ethiopia (Solomonic dynasty in 1300)
    ["Ethiopia", { continent: "East Africa", note: "Solomonic dynasty of Ethiopia (restored 1270) — the Lion of Judah emblem pre-dates the modern flag by centuries.", noFlag: true, population: 3_000_000 }],
    // Japan (Kamakura Shogunate → shortly after, the Muromachi)
    ["Shogun Japan (Kamakura)", { continent: "East Asia", note: "Kamakura Shogunate Japan — samurai government alongside the emperor. The Hinomaru dates to medieval Japan.", modernName: "Japan", population: 7_000_000 }],
    // Thailand (Sukhothai Kingdom in 1300)
    ["Sukhothai", { continent: "Southeast Asia", note: "Sukhothai Kingdom — earliest Thai state; developed the Thai script.", noFlag: true, population: 500_000 }],
    // Khmer (Angkor period ending)
    ["Khmer Empire", { continent: "Southeast Asia", note: "Khmer Empire at the end of the classical Angkor period — the great temple city of Angkor Wat was built here.", noFlag: true, population: 1_000_000 }],
    // Delhi Sultanate (Khalji dynasty in 1300)
    ["Sultanate of Delhi", { continent: "South Asia", note: "Khalji dynasty Delhi Sultanate — at its 1300 peak it briefly reached southern India. No national flag.", noFlag: true, population: 15_000_000 }],
    // Trebizond in 1300 — Byzantine splinter state
    ["Trebizond", { continent: "Eastern Mediterranean", note: "Empire of Trebizond — Komnenian dynasty clinging to the Black Sea coast after the Latin sack of Constantinople.", noFlag: true, population: 150_000 }],
    // Georgia (weakened after Mongol invasions)
    ["Georgia", { continent: "Western Asia", note: "Kingdom of Georgia — weakened by repeated Mongol invasions; its golden age (12th–13th c.) was over.", noFlag: true, population: 1_500_000 }],
    // Ottoman Empire in 1300: the 1844–1922 crescent-and-star flag is 544
    // years too late. Pre-Ottoman Seljuk / early Anatolian beyliks — no
    // standardised Ottoman flag yet (Ottomans only founded c.1299).
    ["Ottoman Empire", { continent: "SE Europe / Western Asia", noFlag: true, note: "Ottoman Sultanate in 1300 — newly founded (c.1299) under Osman I; no standardised flag. The familiar crescent-and-star wasn't formalised until 1844.", population: 2_000_000 }],
    // Holy Roman Empire in 1300: the post-1400 imperial banner is the global
    // entry, but in 1300 the double-headed eagle was only beginning to emerge.
    ["Holy Roman Empire", { continent: "Central Europe", noFlag: true, note: "Holy Roman Empire in 1300 — late Hohenstaufen / early Habsburg era. The post-1400 imperial banner (our only HRE PNG) had not yet been formalised.", population: 12_000_000 }],
  ])],

  ["ad1500", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Kingdom of France under the Valois — the white Bourbon-style royal banner with fleur-de-lis was used in this period.", population: 16_000_000 }],
    // Spain flew the Cross of Burgundy (a red ragged saltire on white)
    // from the Habsburg union (1506) until 1701 — Bourbon ascension
    // changed the design. The familiar red-yellow-red flag is from 1785.
    ["Spain", { flag: "historical-flags/spain-burgundy.png", continent: "Iberia", note: "Habsburg Spain under the Cross of Burgundy — the red-yellow-red flag we know today wasn't adopted until 1785.", population: 7_500_000 }],
    // England 1500 = Plantagenet/Tudor monarchy. Cross of St George.
    ["England", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Tudor England — Henry VII/VIII's era. The Cross of St George (white with red cross) was England's national emblem; the Union Jack wasn't designed until 1606.", population: 2_500_000 }],
    // Portugal 1500 = Age of Discoveries. Quinas banner.
    ["Portugal", { continent: "Iberia", note: "Age-of-Discoveries Portugal — Vasco da Gama reached India (1498), Cabral claimed Brazil (1500). Flew the Quinas banner (white with blue shields).", noFlag: true, population: 1_400_000 }],
    // Scottland (dataset typo for Scotland)
    ["Scottland", { continent: "Northern Europe", note: "Kingdom of Scotland — the Saltire (white diagonal cross on blue) is one of the world's oldest national symbols. The Union with England wasn't until 1707.", noFlag: true, population: 700_000 }],
    // Ming Chinese Empire (different dataset name from "Ming")
    ["Ming Chinese Empire", { continent: "East Asia", note: "Ming dynasty China at the height of the Yongle era — the Great Wall expanded, Zheng He's treasure fleets, the Forbidden City built.", noFlag: true, population: 100_000_000 }],
    // Vijayanagara — the last great Hindu empire of South India
    ["Vijayanagara", { continent: "South Asia", note: "Vijayanagara Empire — at its 1500s peak the largest state in the subcontinent south of the Deccan. No standardised national flag.", noFlag: true, population: 25_000_000 }],
    // Songhai — largest empire in West African history
    ["Songhai", { continent: "West Africa", note: "Songhai Empire under Askia Muhammad — the largest empire in West African history; Timbuktu was its intellectual capital.", noFlag: true, population: 4_000_000 }],
    // Ayutthaya 1500 = mature trading kingdom
    ["Ayutthaya", { flag: "historical-flags/ayutthaya.png", continent: "Southeast Asia", note: "Ayutthaya Kingdom — the dominant state of mainland Southeast Asia, trading with China, India, and Europe.", population: 3_000_000 }],
    // Japan 1500 = Sengoku (Warring States)
    ["Japan", { modernName: "Japan", continent: "East Asia", note: "Sengoku (Warring States) Japan — a century of civil war between rival warlords (daimyo). The Hinomaru pre-dates this era.", population: 15_000_000 }],
    // Korea 1500 = Joseon dynasty
    ["Korea", { continent: "East Asia", note: "Joseon dynasty Korea — classical period; Hangul script and the great King Sejong. No national flag until the Taegukgi in 1882.", noFlag: true, population: 8_000_000 }],
    // Tibet 1500 = Phagmodrupa/Rinpungpa
    ["Tibet", { continent: "Central Asia", note: "Tibet in 1500 was under the Rinpungpa Tibetan warlords; nominally under the Ming but practically independent.", noFlag: true, population: 2_000_000 }],
    // Malacca 1500 = about to fall to Portugal (fell 1511)
    ["Malacca", { continent: "Southeast Asia", note: "Sultanate of Malacca — the greatest Malay maritime power; conquered by Portugal in 1511, just after this snapshot.", noFlag: true, population: 300_000 }],
    // Grand Duchy of Moscow 1500 = Ivan III expanding
    ["Grand Duchy of Moscow", { continent: "Eastern Europe", note: "Grand Duchy of Moscow under Ivan III — the 'Gatherer of Russian Lands'; just conquered Novgorod and expelled the Tatars.", noFlag: true, population: 5_000_000 }],
    // Teutonic Knights (still independent in 1500, secularised 1525)
    ["Teutonic Knights", { continent: "Central Europe", note: "Teutonic Order state — still controlling Prussia and Livonia in 1500; the Grand Master would secularise it as the Duchy of Prussia in 1525.", noFlag: true, population: 700_000 }],
    // Poland-Lithuania (Commonwealth created 1569 — not yet in 1500)
    ["Poland-Lithuania", { noFlag: true, continent: "Eastern Europe", note: "Jagiellonian Poland-Lithuania (1385–1569) — the precursor to the Polish-Lithuanian Commonwealth, which was only founded in 1569. The Commonwealth flag is anachronistic here.", population: 7_500_000 }],
    // Ottoman Empire 1500: the 1844–1922 crescent-and-star flag is 344 years
    // too late. The Ottomans used various red-crescent banners before 1844.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire under Suleiman the Magnificent's predecessors. The familiar crescent-and-star flag wasn't formalised until 1844 — 344 years after this era.", population: 12_000_000 }],
    // Morocco 1500 = Wattasid (Marinid successor)
    ["Morocco", { continent: "North Africa", note: "Wattasid Sultanate of Morocco in 1500 — a weakened Marinid successor facing the rise of the Saadian dynasty and Portuguese coastal raids.", noFlag: true, population: 2_000_000 }],
    // Ethiopia 1500 = Solomonic dynasty
    ["Ethiopia", { continent: "East Africa", note: "Solomonic-dynasty Ethiopia in 1500 — prospering until the devastating Adal jihad (1527–1543).", noFlag: true, population: 4_000_000 }],
    // Benin 1500 = golden age
    ["Benin", { continent: "West Africa", note: "Kingdom of Benin at its golden age — the famous bronze plaques, sophisticated court culture, and expanding trade with the Portuguese.", noFlag: true, population: 1_500_000 }],
    // Congo 1500 = Kongo Kingdom
    ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo — the dominant Central African kingdom; just beginning to trade with and convert to Christianity via Portugal.", noFlag: true, population: 3_000_000 }],
    // Oyo 1500 = early Oyo kingdom
    ["Oyo", { continent: "West Africa", note: "Early Oyo Kingdom — the Yoruba empire was still in its formative stage in 1500, before its great expansion in the 17th–18th centuries.", noFlag: true, population: 500_000 }],
    // Venice 1500 = still the major Mediterranean trading power
    ["Venice", { flag: "historical-flags/venice.png", continent: "Italy", note: "Most Serene Republic of Venice — still a major Mediterranean power in 1500, though the Portuguese rerouting of the spice trade was beginning to undermine it.", population: 800_000 }],
    // Kalmar Union (dissolved 1523)
    ["Kalmar Union", { continent: "Northern Europe", note: "Kalmar Union — the Scandinavian personal union was unravelling; Sweden would break free under Gustav Vasa in 1521.", noFlag: true, population: 2_000_000 }],
    // Cambodia (Khmer, declining in 1500)
    ["Cambodia", { continent: "Southeast Asia", note: "Post-Angkor Khmer Kingdom — the empire had declined and abandoned Angkor in 1431; Phnom Penh became the new capital.", noFlag: true, population: 800_000 }],
    // Novgorod — annexed by Moscow in 1478, no longer independent
    ["Novgorod-Seversky", { continent: "Eastern Europe", note: "Principality of Novgorod-Seversky — a small Russian principality that resisted Muscovite unification.", noFlag: true, population: 100_000 }],
  ])],
  ["ad1700", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon France under Louis XIV. White royal banner with fleur-de-lis — the tricolour wasn't adopted until 1790.", population: 21_500_000 }],
    ["Spain", { flag: "historical-flags/spain-burgundy.png", continent: "Iberia", note: "Spain at the start of the War of Spanish Succession — still flying the Cross of Burgundy as it had since 1506. The Bourbon white royal flag would come in 1701, the modern red-yellow-red in 1785.", population: 8_000_000 }],
    // Dutch Republic 1700 = still independent; the familiar Dutch tricolour
    ["Dutch Republic", { flag: "historical-flags/dutch-republic.png", continent: "Western Europe", note: "Dutch Republic — still at the height of its global trading empire; the VOC dominated Asian trade. The Prince's Flag (tricolour) was in use.", population: 2_000_000 }],
    // Polish-Lithuanian Commonwealth 1700 = in decline
    ["Polish–Lithuanian Commonwealth", { flag: "historical-flags/poland-lithuania.png", continent: "Eastern Europe", note: "Polish-Lithuanian Commonwealth — entering its period of decline; the 'liberum veto' paralysed its parliament. A unique noble republic.", population: 11_000_000 }],
    // Tsardom of Muscovy → just before Peter the Great's reforms; the Russian tricolour was introduced ~1699
    ["Tsardom of Muscovy", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe", note: "Tsardom of Muscovy under Peter the Great — on the cusp of becoming the Russian Empire (formally 1721). Peter adopted the Russian tricolour around 1699.", population: 14_000_000 }],
    // Austria 1700 = Habsburg Monarchy (not yet 'Austrian Empire', created 1804)
    ["Austrian Empire", { flag: "historical-flags/austrian-empire.png", continent: "Central Europe", note: "Habsburg Monarchy — in 1700 not yet officially called the 'Austrian Empire' (created 1804). Flew the red-white-red civil ensign, one of Europe's oldest national symbols. Fighting the War of Spanish Succession.", population: 8_000_000 }],
    // England and Ireland (pre-Union Jack, 1707 union hadn't happened)
    ["England and Ireland", { flag: "historical-flags/england-stgeorge.png", continent: "Northern Europe", note: "Kingdom of England and Kingdom of Ireland — a personal union before the Act of Union (1707) that created Great Britain. The Cross of St George was England's flag.", population: 6_500_000 }],
    // Japan 1700 = Tokugawa Shogunate (covered by "Tokugawa Shogunate" entry but dataset says "Japan")
    ["Japan", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Tokugawa Shogunate Japan — the Edo period (1603–1868); peace and isolation policy (sakoku). The Tokugawa mon (three hollyhock leaves) was the shogunate's emblem.", population: 28_000_000 }],
    // Korea 1700 = Joseon dynasty
    ["Korea", { continent: "East Asia", note: "Joseon dynasty Korea in 1700 — a sophisticated Confucian kingdom; no national flag until the Taegukgi in 1882.", noFlag: true, population: 7_000_000 }],
    // Morocco 1700 = Alaouite dynasty
    ["Morocco", { continent: "North Africa", note: "Alaouite Sultanate of Morocco — the same dynasty that rules today, established in 1631. Flew a plain red flag; the green pentagram was added in 1915.", noFlag: true, population: 2_500_000 }],
    // Portuguese Brazil 1700 = major colony. No accurate historical flag available
    // for colonial Portugal in 1700 (the UKPBA flag is 1815-era; the 1830 flag is too modern).
    ["Portuguese Brazil", { noFlag: true, continent: "South America", note: "Colonial Brazil — Portuguese Crown colony. Portugal in 1700 flew a blue-and-white royal standard; no matching historical flag available.", population: 1_500_000 }],
    // Portugal 1700 = Blue-and-white royal standard (not the 1911 red-green flag)
    ["Portugal", { continent: "Iberia", note: "Kingdom of Portugal in 1700 — a major colonial power (Brazil, Africa, India). Flew a blue-and-white royal standard; the modern red-and-green wasn't adopted until 1911.", noFlag: true, population: 2_000_000 }],
    // New France 1700 = major French colonial territory in Canada
    ["New France", { flag: "historical-flags/france-bourbon.png", continent: "North America", note: "New France — French colonial territory in Canada and the Mississippi valley, under the Bourbon royal banner.", population: 15_000 }],
    // Vietnamese states in 1700
    ["Đại Việt", { continent: "Southeast Asia", note: "Đại Việt in 1700 — divided between the Trịnh lords in the north and Nguyễn lords in the south; nominally one Lê dynasty kingdom.", noFlag: true, population: 4_000_000 }],
    // Ayutthaya 1700 = still a major trading kingdom
    ["Ayutthaya", { flag: "historical-flags/ayutthaya.png", continent: "Southeast Asia", note: "Ayutthaya Kingdom in 1700 — at its peak as a major trading hub. Destroyed by Burma in 1767.", population: 3_000_000 }],
    // Kan Na (northern Thai kingdom under Burmese suzerainty in 1700)
    ["Lan Na", { continent: "Southeast Asia", note: "Lan Na Kingdom (Chiang Mai) — northern Thailand; under Burmese suzerainty from the late 16th century.", noFlag: true, population: 400_000 }],
    // Cambodia 1700 = post-Angkor Khmer under Vietnamese / Siamese pressure
    ["Cambodia", { continent: "Southeast Asia", note: "Post-Angkor Khmer Kingdom — reduced to the Phnom Penh-centred rump, squeezed between Vietnam and Siam.", noFlag: true, population: 700_000 }],
    // Ethiopia 1700 = Zemene Mesafint (Era of Princes) approaching
    ["Ethiopia", { continent: "East Africa", note: "Ethiopian Empire in 1700 — the centralised Solomonic state was beginning to fragment into the Zemene Mesafint (Era of Princes) period.", noFlag: true, population: 4_000_000 }],
    // Tibet 1700 = Dzungar Mongol invasion approaching
    ["Tibet", { continent: "Central Asia", note: "Tibet in 1700 — the Dalai Lama's temporal rule; the 5th Dalai Lama had recently died and the Dzungar Mongols would soon invade (1717).", noFlag: true, population: 2_000_000 }],
    // Oyo 1700 = peak of the Oyo Empire
    ["Oyo", { continent: "West Africa", note: "Oyo Empire at or near its peak — the Yoruba empire dominated the West African savanna and was a major force in the Atlantic slave trade.", noFlag: true, population: 3_000_000 }],
    // Congo 1700 = Kingdom of Kongo in decline after civil wars
    ["Congo", { continent: "Central Africa", note: "Kingdom of Kongo in 1700 — torn by decades of civil wars (the Mwissikongo succession crises) and Portuguese interference.", noFlag: true, population: 2_000_000 }],
    // Benin 1700 = still a powerful state
    ["Benin", { continent: "West Africa", note: "Benin Kingdom (Edo) in 1700 — still a sophisticated and powerful state despite increasing contact with European slavers.", noFlag: true, population: 1_200_000 }],
    // Ottoman Empire 1700: 1844 flag is 144 years too late.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire in 1700 — still a major power under the Köprülü viziers. The crescent-and-star flag wasn't standardised until 1844.", population: 30_000_000 }],
  ])],
  ["ad1815", new Map<string, PolityInfo>([
    ["France", { flag: "historical-flags/france-bourbon.png", continent: "Western Europe", note: "Bourbon Restoration (1814–1830) — France flew the white royal banner with fleur-de-lis. The tricolour wasn't readopted until 1830.", population: 30_500_000 }],
    ["United States", { flag: "historical-flags/us-15star.png", continent: "North America", note: "The Star-Spangled Banner, 1795–1818: 15 stars and 15 stripes. A star+stripe pair was added for every new state until 1818.", population: 8_400_000 }],
    ["Portugal", { flag: "historical-flags/ukpba.png", continent: "Iberia", note: "United Kingdom of Portugal, Brazil and the Algarves (1815–1825). The familiar red-and-green Portuguese flag wasn't adopted until 1911.", population: 3_100_000 }],
    ["Portuguese East Africa", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese Mozambique, ruled from Lisbon under the UKPBA banner.", population: 2_000_000 }],
    ["Portuguese Guinea", { flag: "historical-flags/ukpba.png", continent: "West Africa", note: "Portuguese colony in modern Guinea-Bissau.", population: 200_000 }],
    ["Delagoa Bay", { flag: "historical-flags/ukpba.png", continent: "East Africa", note: "Portuguese trading post in modern Mozambique.", population: 5_000 }],
    ["Goa", { flag: "historical-flags/ukpba.png", continent: "South Asia", note: "Portuguese India — held until 1961.", population: 250_000 }],
    // Dutch Malacca — held by the Dutch until 1825 cession to Britain.
    ["Dutch Malacca", { modernName: "Netherlands", continent: "Southeast Asia", note: "Former Malay sultanate; held by the Dutch 1641–1825 before being ceded to Britain. Flew the Dutch tricolour.", population: 25_000 }],
    // Note: Johor, Kedah, Perak, Selangor, Pahang, Terengganu, Kelantan,
    // Negeri Sembilan, Perlis, Brunei Sultanate, British Penang are all in
    // the global POLITY_REGISTRY and don't need era-specific overrides here.
    // Burma in 1815 = Konbaung dynasty. Used golden-peacock royal banners
    // but had no standardised national flag.
    ["Burma", { continent: "Southeast Asia", note: "Konbaung dynasty of Burma, 1752–1885. Royal banners used the green peacock; no standardised national flag.", population: 3_500_000, noFlag: true }],
    ["Ceylon", { modernName: "United Kingdom", continent: "South Asia", note: "Ceded by the Dutch to the British in 1796; in 1815 the British annexed the Kandyan Kingdom. Ceylon became a Crown Colony flying the Union Jack.", population: 1_500_000 }],
    ["Egypt", { continent: "North Africa", note: "Ottoman Egypt under Muhammad Ali — autonomous viceroyalty. The Khedive's 3-star crescent flag was adopted later under Ismail; in 1815 the Ottoman banner flew.", population: 4_500_000, noFlag: true }],
    ["Yemen", { continent: "Arabia", note: "Zaydi Imamate of Yemen plus Ottoman garrisons on the coast — no national flag.", population: 2_000_000, noFlag: true }],
    ["Annam", { continent: "Southeast Asia", note: "Annam in 1815 was part of Nguyen-dynasty Vietnam (Đại Nam) under Emperor Gia Long. Royal banners used yellow with red imperial characters.", population: 6_500_000, noFlag: true }],
    ["Cochin China", { continent: "Southeast Asia", note: "Cochinchina under the Nguyen dynasty — southern Vietnam. Same Nguyen royal yellow banner as Annam.", population: 3_000_000, noFlag: true }],
    ["Morocco", { continent: "North Africa", note: "Alawi Sultanate of Morocco — flew a plain red flag in 1815; the green pentagram wasn't added until 1915.", population: 3_500_000, noFlag: true }],
    ["Ethiopia", { continent: "East Africa", note: "Era of the Princes (Zemene Mesafint) — emperors in Gondar held only nominal authority; no national flag.", population: 4_000_000, noFlag: true }],
    // Haiti — independent republic since 1804; the blue-and-red bicolour
    // adopted in 1820 is essentially the same as today's.
    ["Haiti", { modernName: "Haiti", continent: "Caribbean", note: "Republic of Haiti — the world's first Black republic, independent since 1804. The blue-and-red bicolour has been in use since 1820.", population: 700_000 }],
    // United Provinces of La Plata — precursor to Argentina (1810–1831).
    ["United Provinces of La Plata", { modernName: "Argentina", continent: "South America", note: "United Provinces of the Río de la Plata — precursor to Argentina. The sky-blue and white flag with the Sun of May was adopted in 1818.", population: 500_000 }],
    // Japan in 1815 = Tokugawa Shogunate. Use the Tokugawa shogunate banner.
    ["Japan", { flag: "historical-flags/japan-shogunate.png", continent: "East Asia", note: "Tokugawa Shogunate Japan — late Edo period. The Tokugawa mon (three hollyhock leaves) was the shogunate's emblem; the Hinomaru became the official national flag only in 1870.", population: 30_000_000 }],
    // Korea in 1815 = Joseon (Yi) dynasty, no national flag.
    ["Korea", { continent: "East Asia", note: "Joseon (Yi) dynasty of Korea — no standardised national flag until the Taegukgi in 1882.", noFlag: true, population: 7_000_000 }],
    // Afghanistan — no standardised flag.
    ["Afghanistan", { continent: "Central Asia", note: "Durrani/Barakzai emirate — no standardised national flag in this era.", noFlag: true, population: 4_000_000 }],
    // Cambodia — no flag before French colonisation.
    ["Cambodia", { continent: "Southeast Asia", note: "Khmer kingdom under Vietnamese and Siamese pressure — no standardised flag before the French colonial period.", noFlag: true, population: 1_000_000 }],
    // Hong Kong in 1815 was still Qing China — British sovereignty began 1842.
    ["Hong Kong", { continent: "East Asia", note: "In 1815 Hong Kong Island was Qing Chinese territory — Britain didn't acquire it until the Treaty of Nanking (1842).", noFlag: true, population: 5_000 }],
    // Philippines in 1815 = Spanish colony
    ["Philippines", { flag: "historical-flags/spain-1785.png", continent: "Southeast Asia", note: "Spanish colonial Philippines — the red-yellow-red Crown of Castile flag flew until the 1898 revolution.", population: 2_500_000 }],
    // New South Wales in 1815 = British Crown Colony (est. 1788).
    ["New South Wales", { modernName: "United Kingdom", continent: "Oceania", note: "British Crown Colony of New South Wales — established as a penal colony in 1788. The Union Jack flew over the colony until Australian federation in 1901.", population: 30_000 }],
    // Luxembourg tricolour adopted 1845 — wrong for 1815 (part of German Confederation).
    ["Luxembourg", { noFlag: true, continent: "Western Europe", note: "Grand Duchy of Luxembourg in 1815 — member of the German Confederation after the Congress of Vienna. The red-white-blue tricolour wasn't adopted until 1845.", population: 300_000 }],
    // Siam (Rattanakosin) used the red elephant flag — different from the 1917 tricolour.
    ["Siam", { flag: "historical-flags/siam.png", continent: "Southeast Asia", note: "Kingdom of Siam (Rattanakosin) — Chakri dynasty, capital Bangkok. The red-field white elephant flag was in use; the modern Thai tricolour wasn't adopted until 1917.", population: 4_000_000 }],
    // Ottoman Empire in 1815: the 1844 crescent-and-star was 29 years away.
    // Red crescent banners were used informally but not standardised yet.
    ["Ottoman Empire", { noFlag: true, continent: "SE Europe / Western Asia", note: "Ottoman Empire in 1815 — under Mahmud II. The crescent-and-star flag wasn't standardised until 1844, 29 years after this era.", population: 25_000_000 }],
  ])],

  // === 1880 (Scramble for Africa) overrides =================================
  // Replaces the former 1850 block, which was written against a fabricated map
  // (see the era list above). Every entry below is keyed to a NAME that actually
  // occurs in world_1880.geojson and states 1880's flag situation, not 1850's.
  // Pre-1900 eras never auto-borrow a modern flag, so `modernName` is used ONLY
  // where the flag flown in 1880 is the same design the country flies today.
  ["ad1880", new Map<string, PolityInfo>([
    // --- Great powers -------------------------------------------------------
    // 38-star flag, in use 4 Jul 1877 - 3 Jul 1890 (Colorado's admission).
    ["United States of America", { flag: "historical-flags/us-38star.svg", continent: "North America", note: "The United States in 1880 flew the 38-star flag (1877-1890) - Colorado had just been admitted. Twelve more stars were added before the 50-star flag of 1960.", population: 50_200_000 }],
    // Qing in 1880 used the TRIANGULAR yellow dragon banner (1862-1889); the
    // rectangular version we have bundled was only promulgated in 1888/89, so
    // showing it here would be the wrong flag rather than no flag.
    ["Manchu Empire", { noFlag: true, continent: "East Asia", note: "Qing China under the Guangxu Emperor. The Yellow Dragon banner of 1880 was TRIANGULAR (1862-1889, naval and government use); the familiar rectangular dragon flag was not adopted until 1889.", population: 380_000_000 }],
    ["Germany", { flag: "historical-flags/german-empire.png", continent: "Central Europe", note: "German Empire - unified in 1871 under Wilhelm I and Bismarck. The black-white-red tricolour flew until 1918; today's black-red-gold dates from 1949.", population: 45_200_000 }],
    ["Austria Hungary", { flag: "historical-flags/austria-hungary.png", continent: "Central Europe", note: "Austria-Hungary - the Habsburg dual monarchy created by the 1867 Compromise.", population: 37_800_000 }],
    ["France", { modernName: "France", continent: "Western Europe", note: "French Third Republic (1870-1940), founded after defeat in the Franco-Prussian War. The tricolour of 1880 is the flag France flies today.", population: 37_700_000 }],
    ["Italy", { modernName: "Italy", continent: "Italy", note: "Kingdom of Italy - unified in 1861, with Rome its capital since 1871. The green-white-red tricolour carried the Savoy arms until 1946.", population: 28_400_000 }],
    ["Russian Empire", { flag: "historical-flags/russian-empire.png", continent: "Eastern Europe / North Asia", note: "Russian Empire under Alexander II, in the last year of his reign.", population: 97_700_000 }],
    ["Ottoman Empire", { flag: "historical-flags/ottoman-empire.png", continent: "SE Europe / Western Asia", note: "Ottoman Empire after the 1877-78 Russo-Turkish War, which cost it most of its Balkan territory. The crescent-and-star flag was standardised in 1844.", population: 20_000_000 }],
    ["Imperial Japan", { modernName: "Japan", continent: "East Asia", note: "Meiji Japan - rapidly industrialising after the 1868 Restoration. The Hinomaru became the national flag in 1870 and is unchanged today.", population: 36_600_000 }],
    ["Portugal", { flag: "historical-flags/portugal-1500.png", continent: "Iberia", note: "Kingdom of Portugal - the blue-and-white constitutional monarchy flag flew from 1830 to 1910; the modern green-and-red was adopted in 1911.", population: 4_600_000 }],
    // --- Colonies and dependencies (they flew the ruling power's flag) ------
    ["Algeria (FR)", { modernName: "France", continent: "North Africa", note: "French Algeria - administered as departments of France since 1848.", population: 3_300_000 }],
    ["Senegal (FR)", { modernName: "France", continent: "West Africa", note: "French Senegal - Saint-Louis and Goree, the base for France's West African expansion.", population: 800_000 }],
    ["French Indochina", { modernName: "France", continent: "Southeast Asia", note: "French Cochinchina and the Cambodian protectorate; Annam and Tonkin followed in 1883-85.", population: 10_000_000 }],
    ["Annam", { noFlag: true, continent: "Southeast Asia", note: "Nguyen-dynasty Vietnam under mounting French pressure - the French protectorate came in 1883. Royal yellow banners were used; there was no modern-style national flag.", population: 8_000_000 }],
    ["Angola (Portugal)", { flag: "historical-flags/portugal-1500.png", continent: "Central Africa", note: "Portuguese Angola - coastal control only; the interior was conquered after the 1884-85 Berlin Conference.", population: 2_000_000 }],
    ["Mozambique", { flag: "historical-flags/portugal-1500.png", continent: "East Africa", note: "Portuguese Mozambique - a chain of coastal stations rather than the later colony.", population: 2_500_000 }],
    ["Portuguese Guinea", { flag: "historical-flags/portugal-1500.png", continent: "West Africa", note: "Portuguese Guinea, in modern Guinea-Bissau.", population: 300_000 }],
    ["Philippines", { flag: "historical-flags/spain-1785.png", continent: "Southeast Asia", note: "Spanish colonial Philippines - the red-yellow-red flag flew until the 1898 revolution.", population: 5_500_000 }],
    ["British Raj", { modernName: "United Kingdom", continent: "South Asia", note: "British India - Victoria had been proclaimed Empress of India in 1876. The Union Jack and the Star of India flew over it.", population: 250_000_000 }],
    ["Ceylon", { modernName: "United Kingdom", continent: "South Asia", note: "British Crown Colony of Ceylon - the Union Jack flew until independence in 1948.", population: 2_800_000 }],
    ["Hong Kong", { modernName: "United Kingdom", continent: "East Asia", note: "British Crown Colony of Hong Kong, ceded by Qing China in 1842.", population: 160_000 }],
    ["Malaya", { modernName: "United Kingdom", continent: "Southeast Asia", note: "The Straits Settlements and the Malay states drawn into British protection from 1874.", population: 1_000_000 }],
    ["Canada", { modernName: "United Kingdom", continent: "North America", note: "Dominion of Canada - self-governing since 1867 but flying British flags; the Maple Leaf is from 1965.", population: 4_300_000 }],
    ["Cape Colony", { modernName: "United Kingdom", continent: "Southern Africa", note: "British Cape Colony, self-governing since 1872.", population: 720_000 }],
    ["Natal", { modernName: "United Kingdom", continent: "Southern Africa", note: "British Colony of Natal, annexed in 1843.", population: 400_000 }],
    ["Basutoland", { modernName: "United Kingdom", continent: "Southern Africa", note: "Basutoland (modern Lesotho) - a British protectorate from 1868; the Gun War against disarmament broke out in 1880.", population: 130_000 }],
    ["Gold Coast (GB)", { modernName: "United Kingdom", continent: "West Africa", note: "British Gold Coast, a crown colony since 1874 after the Anglo-Asante wars.", population: 500_000 }],
    ["New South Wales (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of New South Wales - the Australian colonies did not federate until 1901.", population: 750_000 }],
    ["Victoria (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Victoria, enriched by the 1850s gold rushes.", population: 860_000 }],
    ["Queensland (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Queensland, separated from New South Wales in 1859.", population: 210_000 }],
    ["South Australia (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of South Australia, founded 1836.", population: 270_000 }],
    ["Western Australia (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "British colony of Western Australia.", population: 30_000 }],
    ["Northern Territory (UK)", { modernName: "United Kingdom", continent: "Oceania", note: "The Northern Territory, administered by South Australia from 1863.", population: 5_000 }],
    ["British Guiana", { modernName: "United Kingdom", continent: "South America", note: "British Guiana (modern Guyana) - the modern flag dates from independence in 1966.", population: 250_000 }],
    ["Dutch Guiana", { modernName: "Netherlands", continent: "South America", note: "Dutch Guiana (modern Suriname) - Dutch until independence in 1975.", population: 60_000 }],
    ["Netherlands Indies", { modernName: "Netherlands", continent: "Southeast Asia", note: "Netherlands East Indies - the Aceh War was in its eighth year.", population: 28_000_000 }],
    // --- Independent states whose 1880 flag is the flag they fly today -----
    ["Mexico", { modernName: "Mexico", continent: "Mesoamerica", note: "Mexico under Porfirio Diaz. The green-white-red tricolour dates from independence in 1821.", population: 9_400_000 }],
    ["Argentina", { modernName: "Argentina", continent: "South America", note: "Argentina - Buenos Aires had just been federalised as the national capital (1880). The Sun of May flag dates from 1818.", population: 2_500_000 }],
    ["Kingdom of Brazil", { flag: "historical-flags/empire-of-brazil.png", continent: "South America", note: "Empire of Brazil under Pedro II. The green flag with the golden lozenge and imperial arms was replaced when Brazil became a republic in 1889.", population: 11_700_000 }],
    ["Chile", { modernName: "Chile", continent: "South America", note: "Chile, at war with Peru and Bolivia in the War of the Pacific (1879-1884). The lone-star flag dates from 1817.", population: 2_200_000 }],
    ["Peru", { modernName: "Peru", continent: "South America", note: "Peru, fighting the War of the Pacific. The red-white-red tricolour dates from 1825.", population: 2_700_000 }],
    ["Bolivia", { modernName: "Bolivia", continent: "South America", note: "Bolivia, which lost its coastline in the War of the Pacific. The red-yellow-green tricolour dates from 1851.", population: 1_200_000 }],
    ["Colombia", { modernName: "Colombia", continent: "South America", note: "The United States of Colombia - the yellow-blue-red tricolour descends from Gran Colombia (1819).", population: 3_000_000 }],
    ["Venezuela", { modernName: "Venezuela", continent: "South America", note: "Venezuela under Antonio Guzman Blanco; the tricolour descends from Gran Colombia.", population: 2_100_000 }],
    ["Ecuador", { modernName: "Ecuador", continent: "South America", note: "Ecuador - the yellow-blue-red flag with the coat of arms was adopted in 1860.", population: 1_100_000 }],
    ["Uruguay", { modernName: "Uruguay", continent: "South America", note: "Uruguay - the Sun of May flag dates from 1830.", population: 440_000 }],
    ["Paraguay", { modernName: "Paraguay", continent: "South America", note: "Paraguay, recovering from the catastrophic War of the Triple Alliance (1864-70).", population: 340_000 }],
    ["Haiti", { modernName: "Haiti", continent: "Caribbean", note: "Republic of Haiti - the blue-and-red bicolour with the arms has been used since 1820.", population: 1_000_000 }],
    ["Dominican Republic", { modernName: "Dominican Republic", continent: "Caribbean", note: "Dominican Republic - the flag dates from independence from Haiti in 1844.", population: 400_000 }],
    ["Liberia", { modernName: "Liberia", continent: "West Africa", note: "Republic of Liberia - independent since 1847; the Lone Star flag is unchanged.", population: 700_000 }],
    ["Tonga", { modernName: "Tonga", continent: "Pacific", note: "Kingdom of Tonga - the red flag with its canton cross was fixed in the 1875 constitution and is unchanged today.", population: 25_000 }],
    ["Sweden\u2013Norway", { modernName: "Sweden", continent: "Northern Europe", note: "The union of Sweden and Norway (1814\u20131905); Sweden's blue-and-gold cross is essentially today's flag.", population: 6_400_000 }],
    // --- Independent states whose 1880 flag is NOT today's flag -------------
    ["Egypt", { flag: "historical-flags/egypt-khedive.png", continent: "North Africa", note: "Khedivate of Egypt - nominally Ottoman, deep in the debt crisis that brought British occupation in 1882. Red with a white crescent and three stars.", population: 6_800_000 }],
    ["Ethiopia", { noFlag: true, continent: "East Africa", note: "Ethiopian Empire under Yohannes IV. The green-yellow-red tricolour with the Lion of Judah was not adopted until 1897.", population: 9_000_000 }],
    ["Morocco", { noFlag: true, continent: "North Africa", note: "Alawi Sultanate of Morocco - still independent, flying a plain red flag; the green pentagram was added in 1915.", population: 5_000_000 }],
    ["Persia", { noFlag: true, continent: "Western Asia", note: "Qajar Persia under Naser al-Din Shah - the Lion and Sun banner, quite unlike the flag of modern Iran.", population: 7_500_000 }],
    ["Korea", { noFlag: true, continent: "East Asia", note: "Joseon Korea, forced open by Japan's 1876 Treaty of Ganghwa. The Taegukgi was not adopted until 1882.", population: 10_000_000 }],
    ["Greece", { noFlag: true, continent: "SE Europe", note: "Kingdom of Greece - its 1880 flag was the blue-and-white cross beneath a royal crown; the plain nine-stripe flag became the sole national flag in 1978.", population: 1_700_000 }],
    ["Kingdom of Hawaii", { noFlag: true, continent: "Pacific", note: "Kingdom of Hawaii under Kalakaua - independent until the US-backed overthrow of 1893. Its flag combined the Union Jack with eight stripes.", population: 58_000 }],
    ["Taiwan", { noFlag: true, continent: "East Asia", note: "Taiwan was a prefecture of Qing Fujian in 1880; Japan annexed it in 1895.", population: 2_500_000 }],
    // --- African states independent on the eve of partition ----------------
    ["Sokoto Caliphate", { noFlag: true, continent: "West Africa", note: "Sokoto Caliphate - still the largest state in sub-Saharan Africa, and independent until the British conquest of 1903.", population: 10_000_000 }],
    ["Asante", { noFlag: true, continent: "West Africa", note: "Asante Empire - defeated by Britain in 1874 but still independent inland; annexed in 1902.", population: 3_000_000 }],
    ["Zululand", { noFlag: true, continent: "Southern Africa", note: "Zululand, broken up by Britain after the 1879 Anglo-Zulu War and the defeat of Cetshwayo.", population: 300_000 }],
    ["Transvaal", { noFlag: true, continent: "Southern Africa", note: "South African Republic (Transvaal) - Boer republic that rose against British annexation in December 1880. It flew the Vierkleur, not a modern national flag.", population: 120_000 }],
    ["Orange Free State", { noFlag: true, continent: "Southern Africa", note: "Orange Free State - independent Boer republic (1854-1902) with its own orange-and-white flag.", population: 130_000 }],
    ["Wassoulou Empire", { noFlag: true, continent: "West Africa", note: "Wassoulou Empire - Samori Toure's state, which resisted French conquest until 1898.", population: 1_000_000 }],
    ["Tukular Caliphate", { noFlag: true, continent: "West Africa", note: "Toucouleur Empire - El Hadj Umar Tall's jihad state on the upper Niger, conquered by France in 1890-93.", population: 2_000_000 }],
    ["Dahomey", { noFlag: true, continent: "West Africa", note: "Kingdom of Dahomey - famed for its women's regiments; annexed by France in 1894.", population: 500_000 }],
    ["Imerina", { noFlag: true, continent: "East Africa", note: "Kingdom of Imerina (Madagascar) under Ranavalona II - independent until the French protectorate of 1895.", population: 2_500_000 }],
    ["Sultinate of Zanzibar", { noFlag: true, continent: "East Africa", note: "Sultanate of Zanzibar - the Busaidi dynasty's clove and ivory empire, flying a plain red flag.", population: 200_000 }],
  ])],

  // === 1914 (eve of WWI) overrides ==========================================
  // Modern country names in 1914 that were under colonial rule, plus a
  // few cases that need their period-correct national flag (Egypt under
  // the Khedivate, Ethiopia under Menelik II, China still as the early
  // Republic of China after the 1912 revolution, etc.).
  ["ad1914", new Map<string, PolityInfo>([
    // Manchu Empire in 1914 = Republic of China (ROC). The Qing dynasty was
    // overthrown in January 1912 and the ROC was proclaimed. In 1914 the ROC
    // was using the Five-Colored Flag (五色旗) — five horizontal stripes of
    // red, yellow, blue, white, and black representing the five main peoples.
    // The blue-sky/white-sun flag wasn't standardised until 1928.
    ["Manchu Empire", { flag: "historical-flags/roc-1912.png", continent: "East Asia", note: "Republic of China (ROC) — the Qing dynasty was overthrown in January 1912. In 1914 the ROC flew the Five-Colored Flag (五色旗): five horizontal stripes of red, yellow, blue, white, and black representing the Han, Manchu, Mongol, Hui, and Tibetan peoples. The current blue-sky flag wasn't adopted until 1928.", population: 430_000_000 }],
    // Egypt 1914 — nominally Ottoman until Dec 1914, then British
    // protectorate as the Sultanate of Egypt. Both periods flew the
    // red+white-crescent+3-stars Khedive flag.
    ["Egypt", { flag: "historical-flags/egypt-khedive.png", continent: "North Africa", note: "Khedivate of Egypt (autonomous Ottoman territory until Dec 1914, then British protectorate as the Sultanate of Egypt). Red with white crescent and 3 stars.", population: 11_300_000 }],
    // Abyssinia 1914 — Menelik II's flag (green-yellow-red with the Lion
    // of Judah) adopted 1897, used until 1936 + 1941–1974. The modern
    // Ethiopian flag with the central blue star is from 1996.
    ["Abyssinia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia under Menelik II's successors. Green-yellow-red with the Lion of Judah — the star-emblem flag came in 1996.", population: 11_000_000 }],
    // Modern country names that were colonies in 1914 — route to the
    // colonial power's contemporaneous flag.
    ["Algeria", { continent: "North Africa", note: "French Algeria — integrated as French départements since 1848. The French tricolour flew.", modernName: "France", population: 5_500_000 }],
    ["Tunisia", { continent: "North Africa", note: "French protectorate of Tunisia (1881–1956). The French tricolour was used alongside the bey's flag.", modernName: "France", population: 2_000_000 }],
    ["Morocco", { continent: "North Africa", note: "Just established as a French (and partly Spanish) protectorate in 1912. The Alawi red flag added the green pentagram in 1915.", modernName: "France", population: 5_000_000 }],
    ["Libya", { continent: "North Africa", note: "Newly Italian (annexed from the Ottomans in 1911–12). Flew the Italian tricolour with the Savoy arms.", modernName: "Italy", population: 1_000_000 }],
    // Armenia in 1914 — split between the Russian Empire and the Ottoman
    // Empire. No independent Armenian state. The modern Armenian flag
    // (1990) is wildly anachronistic.
    ["Armenia", { continent: "Western Asia", note: "Armenian-populated lands of Transcaucasia were divided between the Russian and Ottoman empires; no independent Armenian state existed in 1914.", population: 1_700_000, noFlag: true }],
    // Ceylon in 1914 — Crown Colony, Union Jack.
    ["Ceylon", { continent: "South Asia", note: "British Ceylon — Crown Colony from 1815 to 1948. Flew the Union Jack.", modernName: "United Kingdom", population: 4_200_000 }],
    // Yemen in 1914 — Ottoman, no national flag.
    ["Yemen", { continent: "Arabia", note: "Ottoman Vilayet of Yemen — under Ottoman rule (with the Zaydi Imam in interior revolt). No Yemeni national flag yet.", population: 3_500_000, noFlag: true }],
    // Ethiopia (1914 dataset spells it Abyssinia — handled above; if it
    // appears as 'Ethiopia' separately, mirror the Menelik flag).
    ["Ethiopia", { flag: "historical-flags/abyssinia.png", continent: "East Africa", note: "Empire of Ethiopia — same Menelik II flag (1897–1936).", population: 11_000_000 }],
    // Burma in 1914 = British Burma (part of British India since 1886). Union Jack.
    ["Burma", { modernName: "United Kingdom", continent: "Southeast Asia", note: "British Burma — under British colonial rule as part of British India from 1886. The Union Jack flew over the territory.", population: 10_000_000 }],
    // Siam in 1914 = Rattanakosin Kingdom, still using the red elephant flag.
    // The modern Thai tricolour wasn't adopted until 1917.
    ["Siam", { flag: "historical-flags/siam.png", continent: "Southeast Asia", note: "Kingdom of Siam — the red-field white elephant flag was in use in 1914; the modern Thai tricolour was adopted in 1917.", population: 8_000_000 }],
  ])],

  // === 1945 (end of WWII) overrides =========================================
  ["ad1945", new Map<string, PolityInfo>([
    // China in 1945 — Republic of China (KMT) flag, blue-sky/white-sun
    // on red. The PRC (modern flag) wouldn't be founded until Oct 1949.
    ["China", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Republic of China under the Nationalists (Chiang Kai-shek). Blue-sky / white-sun on red — adopted 1928. The PRC and its 5-star red flag came in October 1949.", population: 540_000_000 }],
    // Manchuria 1945 — Manchukuo (Japanese puppet state) until Aug 1945,
    // then handed to ROC. Use ROC flag for end-of-1945 representation.
    ["Manchuria", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Manchukuo (Japanese puppet state) until August 1945, then occupied by Soviet then Nationalist (ROC) forces.", population: 50_000_000 }],
    // Burma 1945 — under British military administration (SEAC) after
    // Japanese withdrawal. Independence and the 1948 flag both came in 1948.
    // Showing the 1948 flag for 1945 is a 3-year anachronism; use UK flag.
    ["Burma", { modernName: "United Kingdom", continent: "Southeast Asia", note: "Burma in 1945 — just liberated from Japanese occupation, under British South East Asia Command (SEAC) military administration. Independence and the Union of Burma flag came in 1948.", population: 17_500_000 }],
    // Egypt 1945 — Kingdom of Egypt (1922–1953). Green field with white
    // crescent + 3 stars (a colour-swap of the Khedive flag). We don't
    // have a curated PNG; show no flag rather than the wrong modern one.
    ["Egypt", { continent: "North Africa", note: "Kingdom of Egypt under King Farouk. Green field with white crescent and 3 stars — the modern red-white-black flag came after the 1952 revolution.", population: 19_000_000, noFlag: true }],
    // Yemen 1945 — Mutawakkilite Kingdom (1918–1962). Flag was red with
    // white sword + 5 stars (similar to Saudi but distinct). No curated
    // PNG — show no flag.
    ["Yemen", { continent: "Arabia", note: "Mutawakkilite Kingdom of Yemen — red with white sword and 5 stars; not the modern Yemeni flag.", population: 4_700_000, noFlag: true }],
    // Korea 1945 — Allied occupation zones. No national flag yet (the
    // Taegukgi for the South was formalised in 1948; the DPRK flag also
    // in 1948).
    ["Korea (USA)", { continent: "East Asia", note: "United States Army Military Government in Korea (1945–1948). No Korean national flag flew officially — the Taegukgi was formalised by the new ROK in 1948.", population: 16_000_000, noFlag: true }],
    ["Korea (USSR)", { continent: "East Asia", note: "Soviet Civil Administration in northern Korea (1945–1948). No national flag — the DPRK flag was adopted in 1948.", population: 9_000_000, noFlag: true }],
    // Saar Protectorate — French zone, then French protectorate
    // 1947–1956 with its own blue-and-red cross flag. No curated PNG.
    ["Saar Protectorate", { continent: "Western Europe", note: "Initial French occupation zone then French protectorate 1947–1956. Used its own flag with a Scandinavian-style cross — joined West Germany in 1957.", population: 850_000, noFlag: true }],
    // Zaire is the dataset's anachronistic 1945 label for the Belgian
    // Congo (the name 'Zaire' only existed from 1971 under Mobutu).
    ["Zaire", { continent: "Central Africa", note: "Belgian Congo — the name \"Zaire\" wouldn't be coined until 1971 under Mobutu. In 1945 the Belgian tricolour flew over the colony.", modernName: "Belgium", population: 12_000_000 }],
    // Dutch Guinea — actually Dutch label for Suriname / NL West Indies;
    // dataset uses this for Suriname under Dutch rule.
    ["Dutch Guinea", { continent: "South America", note: "Dutch Guiana (Suriname) — Dutch colony until 1975 independence. The Dutch tricolour flew over it.", modernName: "Netherlands", population: 200_000 }],
    // Cyrenaica, Tripolitania, Fezzan 1945 — UK and French military
    // administrations over former Italian Libya. Already aliased.
    // Modern country names that were still under colonial rule in 1945:
    ["Algeria", { continent: "North Africa", note: "Still legally French — three Algerian départements of metropolitan France. The independence war wouldn't start until 1954.", modernName: "France", population: 8_500_000 }],
    ["Tunisia", { continent: "North Africa", note: "French protectorate (1881–1956). The French tricolour flew alongside the bey's flag.", modernName: "France", population: 3_200_000 }],
    ["Morocco", { continent: "North Africa", note: "French and Spanish protectorate (1912–1956). The French tricolour was the dominant flag.", modernName: "France", population: 10_000_000 }],
    // Sri Lanka in 1945 = British Crown Colony of Ceylon (until 1948).
    // The Ceylon dominion flag was adopted in 1948; the 1951 version (our PNG)
    // came even later. Show Union Jack — the correct flag for 1945.
    ["Sri Lanka", { modernName: "United Kingdom", continent: "South Asia", note: "British Crown Colony of Ceylon in 1945 — independence came in 1948. The Dominion's lion flag (and our ceylon.png) weren't adopted until 1948/1951.", population: 6_500_000 }],
    // Taiwan in 1945 = surrendered to the Republic of China (KMT) after
    // Japan's defeat. Use the ROC flag.
    ["Taiwan", { flag: "historical-flags/roc.png", continent: "East Asia", note: "Taiwan (Formosa) reverted to Republic of China (ROC) control in October 1945 after Japan's surrender — the ROC's blue-sky/white-sun flag flew.", population: 6_000_000 }],
    // French Indochina in 1945: Annam, Tonkin still referenced as French;
    // Cochin China alias already routes to France. No extra overrides needed.
  ])],

  // === 1960 (Cold War snapshot) overrides ==================================
  ["ad1960", new Map<string, PolityInfo>([
    // Burma in 1960 was the Union of Burma — still on the 1948 flag.
    ["Burma", { flag: "historical-flags/burma-1948.png", continent: "Southeast Asia", note: "Union of Burma — the 1948 flag (red with blue canton + 1 large + 5 small stars) flew from 1948 until 1974.", population: 22_000_000 }],
    // China in 1960 = People's Republic of China. The modern PRC flag
    // adopted in 1949 is the correct one — auto-fallback gives this.
    // No override needed.
    // Egypt in 1960 = United Arab Republic (Egypt + Syria, 1958–1971).
    // Red-white-black with 2 green stars. Visually similar to today's
    // flag but with different central emblem. Without curated PNG, no flag.
    ["Egypt", { continent: "North Africa", note: "United Arab Republic — Nasser's union of Egypt + Syria (1958–1971). Red-white-black with 2 green stars, not today's eagle.", population: 27_000_000, noFlag: true }],
    // Algeria in 1960 still French (independence 1962).
    ["Algeria", { continent: "North Africa", note: "Still legally part of France — bitter independence war (1954–1962) was raging. The French tricolour was the official flag.", modernName: "France", population: 11_000_000 }],
    // Yemen in 1960 — Mutawakkilite Kingdom (North) + Aden Protectorate
    // (South). Modern unified Yemen flag (1990) is anachronistic.
    ["Yemen", { continent: "Arabia", note: "Mutawakkilite Kingdom in the north (until 1962 revolution); the south was under British rule as the Aden Protectorate. No unified Yemeni flag.", population: 5_300_000, noFlag: true }],
    // Zaire is again the dataset's anachronistic label — in 1960 was
    // the Belgian Congo (independent in June 1960 as the Republic of
    // the Congo, then Congo-Léopoldville). Used a blue+yellow flag
    // until 1971 when it became Zaire. Modern DRC flag is from 2006.
    ["Zaire", { continent: "Central Africa", note: "Belgian Congo until June 1960 independence, then Republic of the Congo / Congo-Léopoldville. The name \"Zaire\" wasn't adopted until 1971.", modernName: "Belgium", population: 16_000_000 }],
    // Ceylon — Dominion of Ceylon (1948–1972). Distinct lion-on-yellow
    // flag with green/orange panels (added 1951). Use the Dominion flag.
    ["Ceylon", { flag: "historical-flags/ceylon.png", continent: "South Asia", note: "Dominion of Ceylon (1948–1972). The lion + bo-leaves flag was adopted in 1951; minor changes in 1972 became the modern Sri Lankan flag.", population: 10_000_000 }],
    // Libya 1960 — Kingdom of Libya (1951–1969) under King Idris. Black
    // field with red+green stripes + white crescent and star. The modern
    // flag (1977-2011 green, 2011 reverted to Idris). The modern Libyan
    // flag IS visually equivalent to the Idris flag. OK to use modern.
    // Vietnam in 1960 was split into North and South. The dataset labels it
    // "Vietnam" — the modern flag (red with yellow star) represents the
    // victorious North / reunified Vietnam (1976). Use modernName for
    // North Vietnam since the flag is essentially the same from 1955.
    ["Vietnam", { modernName: "Vietnam", continent: "Southeast Asia", note: "Vietnam in 1960 was divided: the Democratic Republic of Vietnam (North, communist) and the Republic of Vietnam (South, US-backed). The modern red-star flag represents the North/reunified Vietnam.", population: 30_000_000 }],
    // Sri Lanka in 1960 = Dominion of Ceylon. Use the Ceylon flag.
    ["Sri Lanka", { flag: "historical-flags/ceylon.png", continent: "South Asia", note: "The island was the Dominion of Ceylon in 1960 (it became the Republic of Sri Lanka only in 1972). The Dominion's lion flag flew from 1948 to 1972.", population: 9_500_000 }],
  ])],
]);

/**
 * Display-name corrections for misspelled / mis-encoded dataset NAMEs.
 *
 * The historical-basemaps GeoJSONs are the app's only source of polity names, and
 * they are shown to the user verbatim — so upstream's typos ship as UI text:
 * "Kingfom of Italy", "Anglo-Egyption Sudan", "Scottland", "Fezzan (Frech Lybia)".
 * This table maps the dataset key to what should be RENDERED. It never changes the
 * key: every lookup (registry, aliases, era overrides, selection matching, the
 * per-era name set from the GeoJSON) still uses the verbatim NAME, so a correction
 * here can never break resolution — see `polityDisplayName`.
 *
 * Only obvious misspellings, mis-encodings and expansions of an abbreviation the
 * dataset itself uses are corrected. A name that is merely an older or foreign
 * form of a modern name (Persia, Siam, Abyssinia, Ceylon) is period-correct and
 * must be left alone — this is a spell-check, not a renaming layer.
 */
export const DISPLAY_NAME_FIXES: ReadonlyMap<string, string> = new Map([
  // Straight misspellings
  ["Kingfom of Italy", "Kingdom of Italy"],
  ["Anglo-Egyption Sudan", "Anglo-Egyptian Sudan"],
  ["Kongldom of Hawaii", "Kingdom of Hawaii"],
  ["Scottland", "Scotland"],
  ["Castille", "Castile"],
  ["Khoiasan", "Khoisan"],
  ["Eastern North Amercian hunter-gatherers", "Eastern North American hunter-gatherers"],
  ["Sultinate of Zanzibar", "Sultanate of Zanzibar"],
  ["Silia", "Silla"],
  // Mis-encoded characters (the source file lost the diacritic)
  ["M?ori", "Māori"],
  ["Teotihuacàn", "Teotihuacán"],
  // Dutch Guiana is modern Suriname; "Guinea" is a different place entirely.
  ["Dutch Guinea", "Dutch Guiana"],
  // Libya's three provinces under British / French military administration.
  ["Cyraneica (UK Lybia)", "Cyrenaica (British Libya)"],
  ["Tripolitana (UK Lybia)", "Tripolitania (British Libya)"],
  ["Fezzan (Frech Lybia)", "Fezzan (French Libya)"],
  // Transliteration variants of the same names used elsewhere in the dataset.
  ["Quazaq Khanate", "Kazakh Khanate"],
  ["Bantou", "Bantu"],
  ["Papou", "Papuan peoples"],
  ["Gurjara Pratihara", "Gurjara-Pratihara"],
  ["Austria Hungary", "Austria-Hungary"],
]);

/**
 * The name to SHOW for a dataset polity — corrected where upstream misspelled it.
 *
 * Always render through this; never use it as a lookup key. Callers that match a
 * selection, read the registry or compare against the era's GeoJSON name set must
 * keep using the raw dataset NAME.
 */
export function polityDisplayName(name: string): string {
  return DISPLAY_NAME_FIXES.get(name) ?? name;
}

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
