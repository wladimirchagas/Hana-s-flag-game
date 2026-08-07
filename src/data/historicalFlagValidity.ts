/**
 * Sourced validity windows for every CURATED flag image the historical era maps show.
 *
 * WHY THIS EXISTS
 * ---------------
 * `flagExistedInEra()` (historicalEras.ts) gates the four flag-resolution layers that
 * borrow a MODERN country's flag, so South Africa's 1994 flag can no longer fly over
 * the 1914 map. Layer 1 — a curated `PolityInfo.flag` image — was never gated at all:
 * the registry is era-agnostic, so ONE image was shown in EVERY era whose GeoJSON
 * happens to carry that polity's NAME. Measured 2026-08, that shipped:
 *
 *   • the 1889 Qing yellow dragon banner on the 1700 map (China had no national flag
 *     until the 1862 triangular banner);
 *   • the 1816 arms of the United Kingdom of Portugal, Brazil and the Algarves on
 *     Angola in 1900, 1914, 1920, 1960 AND 1994;
 *   • Brunei's pre-1906 plain yellow flag from 1500 all the way to 1994;
 *   • the 1855 Siamese white-elephant flag in 1815 (plain red then) and in 1920
 *     (the trirong replaced it in 1917);
 *   • the double-headed imperial eagle in 1200 (adopted c. 1430);
 *   • St George's Cross over England in 1000 AD (in use from c. 1277);
 *   • the 1785 Spanish ensign on the 1994 map;
 *   • the 1830–1910 Portuguese monarchy flag over Mozambique in 1914, 1920 and 1960;
 *   • ten Malay state flags — Johor 1871, Kedah 1912, Kelantan 1923, Negeri Sembilan
 *     1895, Pahang 1903, Perak 1879, Perlis 1870, Selangor 1965, Terengganu 1953 — all
 *     on the 1815 map, on the reasoning (written into the download script) that a modern
 *     state flag "directly descends from the historical sultanate standard". That is
 *     exactly the reasoning this repo rejects everywhere else.
 *
 * A curated historical flag is not safer than a modern one just because its file lives
 * under public/historical-flags/. It is an image with a date, and it must be gated by
 * that date.
 *
 * CURATION RULES — same discipline as FLAG_ADOPTION_YEAR and POLITY_EXISTENCE
 * --------------------------------------------------------------------------
 * 1. Every entry carries a `source`. Never date a flag from memory.
 * 2. A flag path with NO entry here is BLOCKED in every era, exactly as a country with
 *    no adoption year is blocked. A missing flag is honest; a flag centuries out of
 *    period is not.
 * 3. `from`/`to` bound the period the DESIGN IN THIS FILE was flown by the polity it is
 *    shown for. Where a design was readopted after a gap (the Bourbon white flag,
 *    1590–1790 and 1814–1830), the window spans the whole range and `design` states the
 *    gap — no era date falls inside one, and widening a window to cover an era is
 *    forbidden.
 * 4. Prefer the LATER start and the EARLIER end when a date is disputed. Over-blocking
 *    loses a flag and says why; under-blocking ships a wrong one silently.
 * 5. A reconstruction (the Roman vexilloid) is dated by the polity's own span and says
 *    in `design` that it is a reconstruction, never presented as a surviving flag.
 */

export type FlagValidity = {
  /** First year this design was flown. */
  readonly from: number;
  /** Last year it was flown (9999 = still in use). */
  readonly to: number;
  /** What the image is, and any gap inside the window. */
  readonly design: string;
  /** Authoritative source for the dates. */
  readonly source: string;
};

/**
 * Keyed by the flag path exactly as it appears in `PolityInfo.flag` — relative to
 * BASE_URL, e.g. "historical-flags/ottoman-empire.png".
 */
export const HISTORICAL_FLAG_VALIDITY: ReadonlyMap<string, FlagValidity> = new Map([
  /* ---------------------------------------------------------------- ancient */
  ["historical-flags/roman-empire.png", { from: -509, to: 476, design: "Modern reconstruction of the Roman military vexilloid (SPQR) — a standard carried by the legions, not a national flag; dated here to the Republic and Empire.", source: "https://en.wikipedia.org/wiki/Vexillum" }],
  ["historical-flags/parthian-empire.png", { from: -247, to: 224, design: "Reconstructed Arsacid standard (Derafsh) of the Parthian Empire.", source: "https://en.wikipedia.org/wiki/Parthian_Empire" }],

  /* --------------------------------------------------------------- medieval */
  // The tetragrammatic cross is the Palaiologan dynasty's flag: the dynasty ruled from
  // the recovery of Constantinople in 1261 to the fall of the city in 1453.
  ["historical-flags/byzantine-empire.png", { from: 1261, to: 1453, design: "Palaiologos tetragrammatic cross — gold cross with four gold betas on red.", source: "https://en.wikipedia.org/wiki/Palaiologos" }],
  // Records of pennons "of the arms of Saint George" for English royal foot soldiers
  // date from 1277; nothing earlier is documented as England's flag.
  ["historical-flags/england-stgeorge.png", { from: 1277, to: 9999, design: "St George's Cross — red cross on white.", source: "https://en.wikipedia.org/wiki/Flag_of_England" }],
  // The Republic of Venice ran 697–1797; the winged Lion of St Mark gonfalone is
  // documented from the 13th century, so the window starts there, not at 697.
  ["historical-flags/venice.png", { from: 1200, to: 1797, design: "Gonfalone of the Most Serene Republic — winged Lion of Saint Mark on crimson.", source: "https://en.wikipedia.org/wiki/Republic_of_Venice" }],
  // Single-headed imperial eagle from the late 13th century; the DOUBLE-headed eagle
  // in this file was adopted c. 1430 and flew until the empire's dissolution in 1806.
  ["historical-flags/holy-roman-empire.png", { from: 1430, to: 1806, design: "Banner of the Holy Roman Emperor — double-headed black eagle, haloed, on gold. The single-headed eagle preceded it from the late 13th century.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Holy_Roman_Empire" }],
  ["historical-flags/mughal-empire.png", { from: 1526, to: 1857, design: "Alam — the Mughal triangular battle standard.", source: "https://en.wikipedia.org/wiki/Mughal_Empire" }],
  ["historical-flags/poland-lithuania.png", { from: 1569, to: 1795, design: "Banner of the Polish–Lithuanian Commonwealth, from the Union of Lublin to the third partition.", source: "https://en.wikipedia.org/wiki/Polish%E2%80%93Lithuanian_Commonwealth" }],
  ["historical-flags/spain-burgundy.png", { from: 1506, to: 1785, design: "Cross of Burgundy — the Spanish Habsburg and early Bourbon ensign, replaced by the red-yellow-red ensign in 1785.", source: "https://en.wikipedia.org/wiki/Cross_of_Burgundy" }],
  // Plain red is attested as the Ayutthaya/Thonburi flag only from about 1680; the
  // kingdom itself fell in 1767.
  ["historical-flags/ayutthaya.png", { from: 1680, to: 1767, design: "Plain red flag of the late Ayutthaya kingdom.", source: "https://en.wikipedia.org/wiki/Flag_of_Thailand" }],
  ["historical-flags/dutch-republic.png", { from: 1630, to: 1795, design: "Statenvlag — the red-white-blue Dutch tricolour of the Republic.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Netherlands" }],
  // Bourbon white royal flag: 1590–1790 and again through the Restoration, 1814–1830.
  // No era date falls in the 1790–1814 republican/imperial gap.
  ["historical-flags/france-bourbon.png", { from: 1590, to: 1830, design: "White Bourbon royal flag semé of gold fleurs-de-lis. Not flown 1790–1814 (Revolution and First Empire).", source: "https://en.wikipedia.org/wiki/Flag_of_France" }],
  ["historical-flags/japan-shogunate.png", { from: 1603, to: 1868, design: "Naka-guro — the Tokugawa shogunate's white ensign with a broad black central stripe.", source: "https://en.wikipedia.org/wiki/Tokugawa_shogunate" }],
  // Peter I's tricolour: naval use from 1693, civil ensign 1705, permitted ashore 1883,
  // national flag 1896, banned 1917. The 1858–1896 STATE flag was black-yellow-white.
  ["historical-flags/russian-empire.png", { from: 1693, to: 1917, design: "White-blue-red tricolour — naval from 1693, civil ensign from 1705, national flag 1896–1917. The state flag 1858–1896 was black-yellow-white.", source: "https://en.wikipedia.org/wiki/Flag_of_Russia" }],

  // Documented in a seal of 30 November 1230 and associated with the COUNTRY rather than
  // the dynasty — unlike the black-and-yellow Habsburg flag, which was the Austrian
  // Empire's national flag 1804–1867. So the bicolour is period-legal well before 1804;
  // it is the NAME "Austrian Empire" that is anachronistic in 1700, not this flag.
  ["historical-flags/austrian-empire.png", { from: 1230, to: 9999, design: "Red-white-red — Austria's own colours, documented from 1230 and still the national flag.", source: "https://en.wikipedia.org/wiki/Flag_of_Austria" }],
  // France moderne: Charles V reduced the fleur-de-lis semé to three in 1376; the royal
  // arms then stood until the monarchy fell in 1792.
  ["historical-flags/france-royal-banner.svg", { from: 1376, to: 1792, design: "Royal banner of France — azure with three gold fleurs-de-lis (\"France moderne\"), from Charles V's reduction of the semé in 1376.", source: "https://en.wikipedia.org/wiki/Coat_of_arms_of_France" }],

  /* ------------------------------------------------- 18th–19th century */
  ["historical-flags/portugal-1750.svg", { from: 1750, to: 1816, design: "Kingdom of Portugal — white with the crowned arms, flown until the United Kingdom of Portugal, Brazil and the Algarves adopted its own arms in 1816.", source: "https://en.wikipedia.org/wiki/Flag_of_Portugal" }],
  ["historical-flags/siam-1782.svg", { from: 1782, to: 1817, design: "Early Rattanakosin state flag — red with a white chakra.", source: "https://en.wikipedia.org/wiki/Flag_of_Thailand" }],
  ["historical-flags/siam-1855.svg", { from: 1855, to: 1917, design: "Siam — white elephant on red, decreed by Mongkut (Rama IV) in 1855 and replaced by the trirong on 28 September 1917.", source: "https://en.wikipedia.org/wiki/Flag_of_Thailand" }],
  ["historical-flags/russia-1858.svg", { from: 1858, to: 1896, design: "Black-yellow-white — the Russian Empire's STATE flag from Alexander II's 1858 decree until 1896, when the white-blue-red tricolour replaced it.", source: "https://en.wikipedia.org/wiki/Flag_of_Russia" }],
  ["historical-flags/persia-1886.svg", { from: 1886, to: 1907, design: "Qajar Persia — green-white-red with the Lion and Sun, 1886 pattern.", source: "https://en.wikipedia.org/wiki/Flag_of_Iran" }],
  ["historical-flags/brunei-1906.svg", { from: 1906, to: 1959, design: "Brunei — yellow with white and black diagonal stripes, added on becoming a British protectorate in 1906; the crest followed in 1959.", source: "https://en.wikipedia.org/wiki/Flag_of_Brunei" }],
  ["historical-flags/yemen-1918.svg", { from: 1918, to: 1927, design: "Kingdom of Yemen — red with the white inscription, flown from the imamate's independence in 1918 until the 1927 sword-and-stars flag.", source: "https://en.wikipedia.org/wiki/Flag_of_Yemen" }],
  ["historical-flags/rsfsr-1918.svg", { from: 1918, to: 1925, design: "Russian SFSR — red with the gold РСФСР cypher.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Russian_Soviet_Federative_Socialist_Republic" }],
  ["historical-flags/mongolia-1924.svg", { from: 1924, to: 1940, design: "Mongolian People's Republic — red with the golden soyombo, from the 1924 constitution.", source: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" }],
  ["historical-flags/persia-1933.svg", { from: 1933, to: 1964, design: "Iran — the 1933 standardisation of the Lion and Sun tricolour.", source: "https://en.wikipedia.org/wiki/Flag_of_Iran" }],
  ["historical-flags/spain-1945.svg", { from: 1945, to: 1977, design: "Francoist Spain — red-yellow-red with the Eagle of Saint John in its 1945 arrangement.", source: "https://en.wikipedia.org/wiki/Flag_of_Spain" }],
  ["historical-flags/malaya-1950.svg", { from: 1950, to: 1963, design: "Federation of Malaya — eleven stripes and an eleven-pointed star, first raised 26 May 1950 and superseded when Malaysia formed on 16 September 1963.", source: "https://en.wikipedia.org/wiki/Flag_of_Malaysia" }],
  ["historical-flags/uar-1958.svg", { from: 1958, to: 1971, design: "United Arab Republic — red-white-black with two green stars.", source: "https://en.wikipedia.org/wiki/United_Arab_Republic" }],
  ["historical-flags/iraq-1959.svg", { from: 1959, to: 1963, design: "Republic of Iraq — black-white-green vertical bands with the Kurdish sun, 1 January 1959 to 31 July 1963.", source: "https://en.wikipedia.org/wiki/Flag_of_Iraq" }],

  ["historical-flags/spain-1785.png", { from: 1785, to: 1931, design: "Red-yellow-red ensign of 28 May 1785 with the royal arms; national flag 1785–1873 and 1874–1931.", source: "https://en.wikipedia.org/wiki/Flag_of_Spain" }],
  ["historical-flags/us-15star.png", { from: 1795, to: 1818, design: "Fifteen stars and fifteen stripes — the Star-Spangled Banner.", source: "https://en.wikipedia.org/wiki/Flag_of_the_United_States" }],
  ["historical-flags/penang.png", { from: 1801, to: 1858, design: "British East India Company ensign — red and white stripes with the 1801 Union Flag in the canton.", source: "https://en.wikipedia.org/wiki/Flag_of_the_East_India_Company" }],
  ["historical-flags/ukpba.png", { from: 1816, to: 1826, design: "Arms of the United Kingdom of Portugal, Brazil and the Algarves.", source: "https://en.wikipedia.org/wiki/United_Kingdom_of_Portugal,_Brazil_and_the_Algarves" }],
  ["historical-flags/siam.png", { from: 1817, to: 1855, design: "Red flag with a white elephant inside the chakra (Rama II). Plain red preceded it; a chakra-less white elephant followed in 1855.", source: "https://en.wikipedia.org/wiki/Flag_of_Thailand" }],
  ["historical-flags/empire-of-brazil.png", { from: 1822, to: 1889, design: "Imperial Brazil — green with the crowned imperial arms on a yellow lozenge.", source: "https://en.wikipedia.org/wiki/Flag_of_Brazil" }],
  ["historical-flags/portugal-1830.png", { from: 1830, to: 1910, design: "Blue-and-white constitutional monarchy flag with the crowned arms.", source: "https://en.wikipedia.org/wiki/Flag_of_Portugal" }],
  ["historical-flags/ottoman-empire.png", { from: 1844, to: 1922, design: "Red with white crescent and five-pointed star, fixed by the 1844 Tanzimat regulation.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Ottoman_Empire" }],
  ["flags/sub/US/US-HI.svg", { from: 1845, to: 9999, design: "Flag of Hawaii — Union Flag canton with eight stripes; standardised 1845 and unchanged as the state flag.", source: "https://en.wikipedia.org/wiki/Flag_of_Hawaii" }],
  ["historical-flags/italy-kingdom.svg", { from: 1861, to: 1946, design: "Kingdom of Italy — tricolour with the Savoy arms.", source: "https://en.wikipedia.org/wiki/Flag_of_Italy" }],
  ["historical-flags/austria-hungary.png", { from: 1869, to: 1918, design: "Common ensign of Austria-Hungary — the Austrian and Hungarian arms side by side.", source: "https://en.wikipedia.org/wiki/Flag_of_Austria-Hungary" }],
  ["historical-flags/japan-1870.svg", { from: 1870, to: 1999, design: "Meiji Hinomaru — Proclamation 57 of 1870: 7:10, disc offset toward the hoist. The 1999 law centred the disc at 2:3.", source: "https://en.wikipedia.org/wiki/Flag_of_Japan" }],
  ["historical-flags/german-empire.png", { from: 1871, to: 1918, design: "Black-white-red tricolour of the German Empire.", source: "https://en.wikipedia.org/wiki/Flag_of_the_German_Empire" }],
  ["historical-flags/us-38star.svg", { from: 1877, to: 1890, design: "Thirty-eight stars — Colorado's admission to the 43-star flag.", source: "https://en.wikipedia.org/wiki/Flag_of_the_United_States" }],
  ["historical-flags/egypt-khedive.png", { from: 1882, to: 1922, design: "Red with three white crescents each with a star — Khedivate and then Sultanate of Egypt.", source: "https://en.wikipedia.org/wiki/Flag_of_Egypt" }],
  ["historical-flags/qing-dynasty.png", { from: 1889, to: 1912, design: "Rectangular yellow dragon banner, the Qing national flag from 1889. The triangular version dates from 1862; before that China had no national flag.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Qing_dynasty" }],
  ["historical-flags/us-45star.svg", { from: 1896, to: 1908, design: "Forty-five stars — Utah's admission.", source: "https://en.wikipedia.org/wiki/Flag_of_the_United_States" }],
  ["historical-flags/abyssinia.png", { from: 1897, to: 1974, design: "Ethiopian Empire — green-yellow-red with the Lion of Judah.", source: "https://en.wikipedia.org/wiki/Flag_of_Ethiopia" }],

  ["historical-flags/montenegro-1860.svg", { from: 1860, to: 1905, design: "Principality of Montenegro — red with the crowned double-headed eagle.", source: "https://en.wikipedia.org/wiki/Flag_of_Montenegro" }],
  ["historical-flags/serbia-1882.svg", { from: 1882, to: 1918, design: "Kingdom of Serbia — red-blue-white with the royal arms.", source: "https://en.wikipedia.org/wiki/Flag_of_Serbia" }],
  ["historical-flags/brazil-1889.svg", { from: 1889, to: 1960, design: "Republican Brazil with 21 stars — the field was redrawn as states joined, reaching today's 27 in 1992.", source: "https://en.wikipedia.org/wiki/Flag_of_Brazil" }],
  ["historical-flags/panama-1903.svg", { from: 1903, to: 1925, design: "Panama's first flag, 1903; the design was standardised in 1925.", source: "https://en.wikipedia.org/wiki/Flag_of_Panama" }],
  ["historical-flags/montenegro-1905.png", { from: 1905, to: 1918, design: "Kingdom of Montenegro — the royal flag, 1905–1918.", source: "https://en.wikipedia.org/wiki/Flag_of_Montenegro" }],
  ["historical-flags/mongolia-1911.svg", { from: 1911, to: 1921, design: "Bogd Khanate of Mongolia — yellow with the soyombo, from the 1911 declaration of independence.", source: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" }],
  ["historical-flags/albania-1914.svg", { from: 1914, to: 1920, design: "Principality of Albania — red with the black double-headed eagle under a star.", source: "https://en.wikipedia.org/wiki/Flag_of_Albania" }],
  ["historical-flags/iceland-1915.png", { from: 1915, to: 1944, design: "Iceland's blue-white-red cross, adopted 1915 while a sovereign kingdom in personal union with Denmark.", source: "https://en.wikipedia.org/wiki/Flag_of_Iceland" }],
  ["historical-flags/eritrea-1952.svg", { from: 1952, to: 1961, design: "Eritrea federated with Ethiopia — light blue with a green olive wreath.", source: "https://en.wikipedia.org/wiki/Flag_of_Eritrea" }],
  ["historical-flags/sudan-1956.svg", { from: 1956, to: 1970, design: "Republic of the Sudan — blue-yellow-green, flown from independence in 1956.", source: "https://en.wikipedia.org/wiki/Flag_of_Sudan" }],
  ["historical-flags/mali-1959.svg", { from: 1959, to: 1961, design: "Mali — green-yellow-red with the black kanaga figure, removed in 1961.", source: "https://en.wikipedia.org/wiki/Flag_of_Mali" }],
  ["historical-flags/upper-volta-1959.svg", { from: 1959, to: 1984, design: "Republic of Upper Volta — black-white-red, flown until the country became Burkina Faso in 1984.", source: "https://en.wikipedia.org/wiki/Flag_of_Burkina_Faso" }],
  ["historical-flags/brazil-1960.svg", { from: 1960, to: 1968, design: "Republican Brazil with 22 stars — Guanabara's admission.", source: "https://en.wikipedia.org/wiki/Flag_of_Brazil" }],
  ["historical-flags/congo-leopoldville-1960.svg", { from: 1960, to: 1963, design: "Republic of the Congo (Léopoldville) — blue with a large star and six small ones, from independence on 30 June 1960.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Democratic_Republic_of_the_Congo" }],
  /* ---------------------------------------------------- 20th century */
  ["historical-flags/afghanistan-1901.svg", { from: 1901, to: 1919, design: "Black flag of the Emirate of Afghanistan under Habibullah Khan.", source: "https://en.wikipedia.org/wiki/Flag_of_Afghanistan" }],
  ["historical-flags/persia-1907.svg", { from: 1907, to: 1933, design: "Green-white-red with the Lion and Sun, fixed by the constitutional regulation of 1907.", source: "https://en.wikipedia.org/wiki/Flag_of_Iran" }],
  ["historical-flags/us-48star.svg", { from: 1912, to: 1959, design: "Forty-eight stars — Arizona and New Mexico to Alaska's admission.", source: "https://en.wikipedia.org/wiki/Flag_of_the_United_States" }],
  ["historical-flags/roc-1912.png", { from: 1912, to: 1928, design: "Five-coloured flag of the Republic of China, from the 1912 founding to the Nationalist standardisation of 1928.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China" }],
  ["historical-flags/tibet.svg", { from: 1916, to: 1951, design: "Snow-lion flag introduced by the 13th Dalai Lama; flown until the 1951 annexation.", source: "https://en.wikipedia.org/wiki/Flag_of_Tibet" }],
  ["historical-flags/hejaz-1917.svg", { from: 1917, to: 1920, design: "Kingdom of Hejaz — Arab Revolt flag with a red triangle at the hoist.", source: "https://en.wikipedia.org/wiki/Flag_of_Hejaz" }],
  ["historical-flags/afghanistan-1919.svg", { from: 1919, to: 1928, design: "Black flag with the emblem, adopted at independence in 1919.", source: "https://en.wikipedia.org/wiki/Flag_of_Afghanistan" }],
  ["historical-flags/czechoslovakia.png", { from: 1920, to: 1992, design: "White-red with the blue hoist triangle, adopted 30 March 1920.", source: "https://en.wikipedia.org/wiki/Flag_of_Czechoslovakia" }],
  ["historical-flags/hejaz-1920.svg", { from: 1920, to: 1926, design: "Kingdom of Hejaz, 1920 variant.", source: "https://en.wikipedia.org/wiki/Flag_of_Hejaz" }],
  ["historical-flags/iraq-1921.svg", { from: 1921, to: 1924, design: "First flag of the Kingdom of Iraq.", source: "https://en.wikipedia.org/wiki/Flag_of_Iraq" }],
  ["historical-flags/mongolia-1921.svg", { from: 1921, to: 1924, design: "Flag of the Mongolian revolutionary provisional government.", source: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" }],
  ["historical-flags/ussr.png", { from: 1922, to: 1991, design: "Red flag with gold hammer, sickle and star.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Soviet_Union" }],
  ["historical-flags/egypt-kingdom.svg", { from: 1922, to: 1953, design: "Green with a white crescent and three stars — Kingdom of Egypt.", source: "https://en.wikipedia.org/wiki/Flag_of_Egypt" }],
  ["historical-flags/iraq-1924.svg", { from: 1924, to: 1959, design: "Kingdom of Iraq — black-white-green with a red hoist trapezoid and two stars, 10 July 1924 to 1 January 1959.", source: "https://en.wikipedia.org/wiki/Flag_of_Iraq" }],
  ["historical-flags/mutawakkilite-yemen.svg", { from: 1927, to: 1962, design: "Mutawakkilite Kingdom of Yemen — red with a white sword and five stars.", source: "https://en.wikipedia.org/wiki/Flag_of_Yemen" }],
  ["historical-flags/roc.png", { from: 1928, to: 9999, design: "Blue Sky with a White Sun and a Wholly Red Earth, adopted nationally in 1928.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China" }],
  ["historical-flags/afghanistan-1929.svg", { from: 1929, to: 1973, design: "Black-red-green with the mosque-and-sheaves emblem, from Nadir Shah's accession.", source: "https://en.wikipedia.org/wiki/Flag_of_Afghanistan" }],
  ["historical-flags/saudi-arabia-1938.svg", { from: 1938, to: 1973, design: "Green with the shahada and sword, 1938 specification.", source: "https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia" }],
  ["historical-flags/yugoslavia.png", { from: 1945, to: 1992, design: "Blue-white-red with the central red star, from the Democratic Federal Yugoslavia of 1945.", source: "https://en.wikipedia.org/wiki/Flag_of_Yugoslavia" }],
  ["historical-flags/mongolia-1945.svg", { from: 1945, to: 1992, design: "Red-blue-red with the golden Soyombo, 1945 specification.", source: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" }],
  ["historical-flags/burma-1948.png", { from: 1948, to: 1974, design: "Union of Burma — red with a blue canton, one large and five small stars.", source: "https://en.wikipedia.org/wiki/Flag_of_Myanmar" }],
  ["historical-flags/ceylon.png", { from: 1951, to: 1972, design: "Dominion of Ceylon — the lion flag with saffron and green bands, 1951 revision.", source: "https://en.wikipedia.org/wiki/Flag_of_Sri_Lanka" }],
  ["historical-flags/zaire.png", { from: 1971, to: 1997, design: "Green with a yellow disc bearing an arm and torch — Mobutu's Zaire.", source: "https://en.wikipedia.org/wiki/Flag_of_the_Democratic_Republic_of_the_Congo" }],

  ["historical-flags/nepal-1743.svg", { from: 1743, to: 1962, design: "Nepal's double-pennon, in the form flown before the 1962 constitutional standardisation.", source: "https://en.wikipedia.org/wiki/Flag_of_Nepal" }],
  ["historical-flags/muscat-oman.svg", { from: 1820, to: 1970, design: "Sultanate of Muscat and Oman — a plain red flag, until Sultan Qaboos added the national emblem in 1970.", source: "https://en.wikipedia.org/wiki/Flag_of_Oman" }],
  ["historical-flags/qatar-1936.svg", { from: 1936, to: 1949, design: "Qatar — maroon and white with the serrated edge and Arabic inscription.", source: "https://en.wikipedia.org/wiki/Flag_of_Qatar" }],
  ["historical-flags/bhutan-1956.svg", { from: 1956, to: 1969, design: "Bhutan — the white dragon on a diagonally divided orange and red field, 1956 version.", source: "https://en.wikipedia.org/wiki/Flag_of_Bhutan" }],
  ["historical-flags/cameroon-1957.svg", { from: 1957, to: 1961, design: "Cameroun — green-red-yellow vertical bands, before the stars were added.", source: "https://en.wikipedia.org/wiki/Flag_of_Cameroon" }],
  ["historical-flags/mauritania-1959.svg", { from: 1959, to: 2017, design: "Mauritania — green with a gold crescent and star; the red bands were added in 2017.", source: "https://en.wikipedia.org/wiki/Flag_of_Mauritania" }],
  /* -------------------------------------- Malay states and Brunei -------
   * Every one of these is a LATE design that the download script bundled for the
   * 1815 map on the reasoning that a modern state flag "descends from" the historical
   * sultanate standard. The dates below are why that reasoning is refused.
   */
  ["historical-flags/perlis.png", { from: 1870, to: 9999, design: "Perlis — yellow over blue.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/johor.png", { from: 1871, to: 9999, design: "Johor — dark blue with a red canton bearing a white crescent and star.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/perak.png", { from: 1879, to: 9999, design: "Perak — white, yellow and black bands.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/brunei-1888.png", { from: 1888, to: 1906, design: "Plain yellow. Before 1888 Brunei's sultans used personal standards and the state had no flag; white and black stripes were added in 1906 and the crest in 1959.", source: "https://en.wikipedia.org/wiki/Flag_of_Brunei" }],
  ["historical-flags/negeri-sembilan.png", { from: 1895, to: 9999, design: "Negeri Sembilan — yellow with a black-and-red canton.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/pahang.png", { from: 1903, to: 9999, design: "Pahang — white over black.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/kedah.png", { from: 1912, to: 9999, design: "Kedah — red with a yellow shield and wreath.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/kelantan.png", { from: 1923, to: 9999, design: "Kelantan — red with a white crescent, star and kris devices.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/terengganu.png", { from: 1953, to: 9999, design: "Terengganu — black with a white crescent and star on a white border.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
  ["historical-flags/selangor.png", { from: 1965, to: 9999, design: "Selangor — red and yellow quarters with a white crescent and star.", source: "https://en.wikipedia.org/wiki/List_of_Malaysian_flags" }],
]);

/** The era-validity verdict for a curated flag: why it was refused, when it was. */
export type CuratedFlagVerdict =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: "no-window" }
  | { readonly ok: false; readonly reason: "out-of-period"; readonly window: FlagValidity };

/**
 * May this curated flag image be shown for an era at `year`?
 *
 * A path with no window is refused — the same asymmetry as `flagExistedInEra()`, and
 * for the same reason: an ungated image is how every anachronism above shipped.
 */
export function curatedFlagVerdict(flagPath: string, year: number): CuratedFlagVerdict {
  const window = HISTORICAL_FLAG_VALIDITY.get(flagPath);
  if (!window) return { ok: false, reason: "no-window" };
  if (year < window.from || year > window.to) return { ok: false, reason: "out-of-period", window };
  return { ok: true };
}
