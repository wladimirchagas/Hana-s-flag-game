/**
 * Sourced existence windows for polities shown on the Learn-mode historical era maps.
 *
 * WHY THIS EXISTS
 * ---------------
 * Everything else guarding the era maps guarantees FIDELITY TO THE IMPORT — that the
 * geometry we ship is the geometry upstream published. Nothing checked whether the
 * import itself is right for its date, and it is not always: the upstream dataset
 * labels the 1945 subcontinent "India", "Pakistan" and "Bangladesh" even though
 * partition was 1947 and Bangladesh 1971, and shows a single "Vietnam" in 1960 though
 * the country was divided at the 17th parallel from 1954 to 1976.
 *
 * A plausible-but-wrong date is the temporal twin of a plausible-but-wrong flag. This
 * table is the authority the anachronism check measures the maps against.
 *
 * WHAT THIS IS NOT
 * ----------------
 * It is NOT a licence to redraw a border. Where a polity's NAME is wrong for the date
 * but its territory is roughly right, the fix is a display-name remap in
 * `POLITY_NAME_FOR_ERA` (historicalEras.ts) — a labelling change that never touches
 * geometry. Where the EXTENT is also wrong, we do not invent the correct borders: the
 * entry goes in `ERA_EXTENT_CAVEATS` and the panel says so out loud, exactly as the
 * "Borders: approximate" row already does. An honest caveat beats a silent falsehood.
 *
 * CURATION RULES
 * --------------
 * 1. Every entry carries a `source` — an authoritative article for THAT polity. Never
 *    add a date from memory without one, and never guess to make the check pass.
 * 2. Coverage is a curated, incrementally-growing set, not a claim to completeness.
 *    A polity absent from this table is simply unchecked — never assumed wrong.
 * 3. `from`/`to` bound the period the polity existed UNDER THIS NAME AND FORM. A place
 *    name that outlived a state ("Yemen", "Congo", "Ghana") gets the window of the
 *    NAMED ENTITY the map means at that date, which is why several names appear as
 *    era-specific caveats rather than a single global window.
 * 4. When a date is genuinely disputed among historians, prefer the later start and the
 *    earlier end — over-flagging surfaces a question, under-flagging ships an error.
 */

export type PolityExistence = {
  /** First year the polity existed under this name and form. */
  readonly from: number;
  /** Last year it existed (9999 = still exists). */
  readonly to: number;
  /** What the dates mark. */
  readonly note: string;
  /** Authoritative source for the dates. */
  readonly source: string;
};

/**
 * Keyed by the raw dataset NAME (never the display name — the check reads the GeoJSON).
 * Only modern-era states are listed: their names are unambiguous and an error is glaring
 * to any user. Ancient polities have fuzzy, contested dates and obscure names that a
 * name-keyed table cannot resolve safely, so they are deliberately left unchecked.
 */
export const POLITY_EXISTENCE: ReadonlyMap<string, PolityExistence> = new Map([
  ["Bangladesh", { from: 1971, to: 9999, note: "Independent from Pakistan, 1971; the territory was British India until 1947 and East Pakistan until 1971.", source: "https://en.wikipedia.org/wiki/Bangladesh_Liberation_War" }],
  ["Pakistan", { from: 1947, to: 9999, note: "Created by the partition of British India, 14 August 1947.", source: "https://en.wikipedia.org/wiki/Partition_of_India" }],
  ["India", { from: 1947, to: 9999, note: "The Republic of India dates from the 1947 partition; before that the territory was British India.", source: "https://en.wikipedia.org/wiki/Partition_of_India" }],
  ["Israel", { from: 1948, to: 9999, note: "Declared 14 May 1948; the territory was Mandatory Palestine from 1920.", source: "https://en.wikipedia.org/wiki/Israeli_Declaration_of_Independence" }],
  ["Sri Lanka", { from: 1972, to: 9999, note: "Ceylon was renamed Sri Lanka on becoming a republic in 1972.", source: "https://en.wikipedia.org/wiki/Sri_Lanka" }],
  ["Zaire", { from: 1971, to: 1997, note: "The Democratic Republic of the Congo was named Zaire only between 1971 and 1997.", source: "https://en.wikipedia.org/wiki/Zaire" }],
  ["Malaysia", { from: 1963, to: 9999, note: "Formed 16 September 1963 from Malaya, Singapore, Sabah and Sarawak.", source: "https://en.wikipedia.org/wiki/Malaysia_Agreement" }],
  ["Zimbabwe", { from: 1980, to: 9999, note: "Southern Rhodesia became Zimbabwe at independence in 1980.", source: "https://en.wikipedia.org/wiki/Zimbabwe" }],
  ["Namibia", { from: 1990, to: 9999, note: "South West Africa became Namibia at independence in 1990.", source: "https://en.wikipedia.org/wiki/Namibia" }],
  ["Myanmar", { from: 1989, to: 9999, note: "Burma was renamed Myanmar in 1989.", source: "https://en.wikipedia.org/wiki/Names_of_Myanmar" }],
  ["USSR", { from: 1922, to: 1991, note: "Founded 30 December 1922; dissolved 26 December 1991.", source: "https://en.wikipedia.org/wiki/Soviet_Union" }],
  ["Soviet Union", { from: 1922, to: 1991, note: "Founded 30 December 1922; dissolved 26 December 1991.", source: "https://en.wikipedia.org/wiki/Soviet_Union" }],
  ["Yugoslavia", { from: 1918, to: 1992, note: "Kingdom of Serbs, Croats and Slovenes from 1918; the federation dissolved in 1992.", source: "https://en.wikipedia.org/wiki/Yugoslavia" }],
  ["Czechoslovakia", { from: 1918, to: 1992, note: "Founded 1918; dissolved into Czechia and Slovakia on 1 January 1993.", source: "https://en.wikipedia.org/wiki/Czechoslovakia" }],
  ["Manchukuo", { from: 1932, to: 1945, note: "Japanese client state, 1932–1945.", source: "https://en.wikipedia.org/wiki/Manchukuo" }],
  ["Austria-Hungary", { from: 1867, to: 1918, note: "The Ausgleich of 1867 to the empire's dissolution in 1918.", source: "https://en.wikipedia.org/wiki/Austria-Hungary" }],
  ["German Empire", { from: 1871, to: 1918, note: "Proclaimed 1871; ended with the abdication of Wilhelm II in 1918.", source: "https://en.wikipedia.org/wiki/German_Empire" }],
  ["Ottoman Empire", { from: 1299, to: 1922, note: "Abolished with the sultanate in 1922; the Republic of Turkey followed in 1923.", source: "https://en.wikipedia.org/wiki/Ottoman_Empire" }],
  ["Turkey", { from: 1923, to: 9999, note: "The Republic of Turkey was proclaimed 29 October 1923.", source: "https://en.wikipedia.org/wiki/Turkey" }],
  ["Iran", { from: 1935, to: 9999, note: "Persia asked to be called Iran internationally in 1935.", source: "https://en.wikipedia.org/wiki/Name_of_Iran" }],
  ["Thailand", { from: 1939, to: 9999, note: "Siam was renamed Thailand in 1939.", source: "https://en.wikipedia.org/wiki/Names_of_Thailand" }],
  ["Ghana", { from: 1957, to: 9999, note: "The Gold Coast became Ghana at independence, 6 March 1957. (The medieval Ghana Empire is a different polity and is not covered by this entry — see the era caveats.)", source: "https://en.wikipedia.org/wiki/Ghana" }],
  ["Indonesia", { from: 1945, to: 9999, note: "Independence declared 17 August 1945; recognised 1949.", source: "https://en.wikipedia.org/wiki/Proclamation_of_Indonesian_Independence" }],
  ["Eritrea", { from: 1993, to: 9999, note: "Independent from Ethiopia in 1993. Italian Eritrea (1890–1947) is a different polity.", source: "https://en.wikipedia.org/wiki/Eritrea" }],
  ["Vietnam", { from: 1976, to: 9999, note: "A single Vietnamese state dates from reunification on 2 July 1976; from 1954 the country was divided at the 17th parallel.", source: "https://en.wikipedia.org/wiki/Reunification_Day" }],
  /* ------------------------------------------------------------------------
   * AUDIT 2026-08 — states the era maps showed BEFORE they existed.
   *
   * Every one of these was found by cross-checking each era's polity NAMEs
   * against the modern country list: the map labelled a territory with the name
   * of a state that had not yet been founded at that date. The three Caucasus
   * republics are the worst of them — in 1914 all three were Russian provinces,
   * and the map named them as though the 1918 republics already existed.
   * --------------------------------------------------------------------- */
  ["Armenia", { from: 1918, to: 9999, note: "The First Republic of Armenia was declared 28 May 1918; in 1914 the territory was the Russian Empire's Erivan Governorate. (Ancient and medieval Armenian kingdoms are a different polity and are shown under their own names.)", source: "https://en.wikipedia.org/wiki/First_Republic_of_Armenia" }],
  ["Azerbaijan", { from: 1918, to: 9999, note: "The Azerbaijan Democratic Republic was declared 28 May 1918; in 1914 the territory was the Russian Empire's Baku and Elisabethpol Governorates.", source: "https://en.wikipedia.org/wiki/Azerbaijan_Democratic_Republic" }],
  ["Iraq", { from: 1921, to: 9999, note: "The Kingdom of Iraq was founded 23 August 1921; in 1920 the territory was British-occupied Mesopotamia, becoming a League of Nations mandate that April.", source: "https://en.wikipedia.org/wiki/Mandatory_Iraq" }],
  ["Jordan", { from: 1949, to: 9999, note: "The Emirate of Transjordan (1921–1946) became the Hashemite Kingdom of Transjordan in 1946 and was renamed Jordan only in 1949.", source: "https://en.wikipedia.org/wiki/Emirate_of_Transjordan" }],
  ["Rwanda", { from: 1962, to: 9999, note: "Ruanda-Urundi was a Belgian mandate and then UN trust territory from 1922; Rwanda became a separate independent state on 1 July 1962.", source: "https://en.wikipedia.org/wiki/Ruanda-Urundi" }],
  ["Burundi", { from: 1962, to: 9999, note: "Ruanda-Urundi was a Belgian mandate and then UN trust territory from 1922; Burundi became a separate independent kingdom on 1 July 1962.", source: "https://en.wikipedia.org/wiki/Ruanda-Urundi" }],
  ["Antigua and Barbuda", { from: 1981, to: 9999, note: "Independent 1 November 1981; before that the islands were the British colony of Antigua, part of the Leeward Islands.", source: "https://en.wikipedia.org/wiki/Antigua_and_Barbuda" }],
  ["Saint Kitts and Nevis", { from: 1983, to: 9999, note: "Independent 19 September 1983; the colony of Saint Christopher-Nevis-Anguilla ran from 1882 to 1983.", source: "https://en.wikipedia.org/wiki/Saint_Christopher-Nevis-Anguilla" }],
  ["Saint Vincent and the Grenadines", { from: 1979, to: 9999, note: "Independent 27 October 1979; before that the British colony of Saint Vincent.", source: "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines" }],
  ["Austrian Empire", { from: 1804, to: 1867, note: "Proclaimed by Francis II on 11 August 1804 and replaced by Austria-Hungary in 1867; in 1700 the Habsburg lands were the Habsburg Monarchy, within the Holy Roman Empire.", source: "https://en.wikipedia.org/wiki/Austrian_Empire" }],
  ["Kingdom of Hawaii", { from: 1795, to: 1893, note: "Overthrown in January 1893; the Republic of Hawaii followed in 1894, annexation by the United States in 1898 and the Territory of Hawaii on 30 April 1900.", source: "https://en.wikipedia.org/wiki/Territory_of_Hawaii" }],
  ["Hail", { from: 1836, to: 1921, note: "The Emirate of Jabal Shammar, ruled from Ha'il by the Rashidi dynasty; it surrendered to Ibn Saud on 2 November 1921 and was absorbed into the Sultanate of Nejd.", source: "https://en.wikipedia.org/wiki/Emirate_of_Jabal_Shammar" }],
  ["Rhodesia", { from: 1965, to: 1979, note: "The name of the unilaterally-independent state, 1965–1979. Southern Rhodesia is the earlier colony.", source: "https://en.wikipedia.org/wiki/Rhodesia" }],

  /* --------------------------------------------------------------------------
   * States that changed NAME rather than form.
   *
   * Nothing checked these, so the era maps were labelling colonies and
   * protectorates with names coined decades later: "Burkina Faso" and "Benin"
   * on the 1945 and 1960 maps (Upper Volta until 1984, Dahomey until 1975),
   * "Türkiye" on 1945 and 1960 (the English name dates from 2022), "Tanzania"
   * from 1920, "Botswana"/"Lesotho"/"Malawi"/"Guyana"/"Belize" through six
   * eras apiece. Each is fixed by a POLITY_NAME_FOR_ERA display remap; these
   * windows are what stops the next one shipping unnoticed.
   *
   * A name is listed here only when it belongs to ONE polity across the whole
   * era set. Names two different polities have borne (Mali the medieval empire
   * and the modern republic; Belize the 1700 logwood settlement and the modern
   * state; Samoa the 19th-century kingdom and the 1997 rename) are deliberately
   * absent — a name-keyed window cannot tell them apart, and rule 4 above says
   * a place name that outlived a state is not automatically an error.
   * ----------------------------------------------------------------------- */
  ["Türkiye", { from: 2022, to: 9999, note: "Turkey asked the UN to use the Turkish spelling \"Türkiye\" in English in June 2022; before that the English name was Turkey.", source: "https://en.wikipedia.org/wiki/Name_of_Turkey" }],
  ["Burkina Faso", { from: 1984, to: 9999, note: "Upper Volta was renamed Burkina Faso by Thomas Sankara on 4 August 1984.", source: "https://en.wikipedia.org/wiki/Burkina_Faso" }],
  ["Benin", { from: 1975, to: 9999, note: "The Republic of Dahomey was renamed Benin on 30 November 1975. (The medieval Kingdom of Benin, in modern southern Nigeria, is a different polity and is shown under that name.)", source: "https://en.wikipedia.org/wiki/Benin" }],
  ["Botswana", { from: 1966, to: 9999, note: "The Bechuanaland Protectorate became Botswana at independence on 30 September 1966.", source: "https://en.wikipedia.org/wiki/Bechuanaland_Protectorate" }],
  ["Lesotho", { from: 1966, to: 9999, note: "Basutoland became Lesotho at independence on 4 October 1966.", source: "https://en.wikipedia.org/wiki/Basutoland" }],
  ["Malawi", { from: 1964, to: 9999, note: "Nyasaland became Malawi at independence on 6 July 1964.", source: "https://en.wikipedia.org/wiki/Nyasaland" }],
  ["Zambia", { from: 1964, to: 9999, note: "Northern Rhodesia became Zambia at independence on 24 October 1964.", source: "https://en.wikipedia.org/wiki/Northern_Rhodesia" }],
  ["Tanzania, United Republic of", { from: 1964, to: 9999, note: "Tanganyika and Zanzibar united in April 1964 and took the name Tanzania that October; before that the mainland was Tanganyika.", source: "https://en.wikipedia.org/wiki/Tanganyika_(territory)" }],
  ["Guyana", { from: 1966, to: 9999, note: "British Guiana became Guyana at independence on 26 May 1966.", source: "https://en.wikipedia.org/wiki/British_Guiana" }],
  ["Equatorial Guinea", { from: 1968, to: 9999, note: "Spanish Guinea became Equatorial Guinea at independence on 12 October 1968.", source: "https://en.wikipedia.org/wiki/Spanish_Guinea" }],
  ["Guinea-Bissau", { from: 1973, to: 9999, note: "Portuguese Guinea declared independence as Guinea-Bissau on 24 September 1973; Portugal recognised it in 1974.", source: "https://en.wikipedia.org/wiki/Portuguese_Guinea" }],
  ["Djibouti", { from: 1977, to: 9999, note: "French Somaliland became the French Territory of the Afars and the Issas in 1967 and independent Djibouti on 27 June 1977.", source: "https://en.wikipedia.org/wiki/French_Somaliland" }],
  ["Central African Republic", { from: 1958, to: 9999, note: "Ubangi-Shari was renamed the Central African Republic on 1 December 1958.", source: "https://en.wikipedia.org/wiki/Ubangi-Shari" }],
  ["United Arab Emirates", { from: 1971, to: 9999, note: "Six of the Trucial States federated as the United Arab Emirates on 2 December 1971; Ras al-Khaimah joined in 1972.", source: "https://en.wikipedia.org/wiki/Trucial_States" }],
  ["Western Sahara", { from: 1975, to: 9999, note: "The territory was the Spanish colony of Spanish Sahara until Spain withdrew in 1975; its status has been disputed since.", source: "https://en.wikipedia.org/wiki/Spanish_Sahara" }],
  ["Papua New Guinea", { from: 1975, to: 9999, note: "Independent on 16 September 1975. The eastern half of the island was British and German New Guinea before 1914, and the Australian Territory of Papua and New Guinea from 1949.", source: "https://en.wikipedia.org/wiki/Territory_of_Papua_and_New_Guinea" }],
]);

/**
 * Era/polity pairs whose NAME is period-correct (or corrected for display) but whose
 * EXTENT the upstream dataset draws for the wrong date. We do not redraw these — the
 * borders would have to be invented — so the panel discloses them instead.
 *
 * Keyed `"<eraId>|<raw dataset NAME>"`.
 */
export type ExtentCaveat = {
  /** What the map draws that is wrong for the date. */
  readonly issue: string;
  /** What was actually there. */
  readonly actual: string;
  readonly source: string;
};

export const ERA_EXTENT_CAVEATS: ReadonlyMap<string, ExtentCaveat> = new Map([
  // The upstream 1938 file still draws the Rashidi emirate of Ha'il, seventeen years after
  // Ibn Saud took it. Its territory was Saudi by then; we disclose rather than redraw.
  ["ad1938|Hail", { issue: "The 1938 map still draws the Rashidi emirate of Ha'il as a separate polity.", actual: "Ha'il had been Saudi for seventeen years by 1938 — the emirate surrendered to Ibn Saud on 2 November 1921, and the Kingdom of Saudi Arabia was proclaimed in 1932.", source: "https://en.wikipedia.org/wiki/Emirate_of_Jabal_Shammar" }],
  ["ad1945|India", {
    issue: "This map draws the post-1947 partition border, which did not exist in 1945.",
    actual: "In 1945 the whole subcontinent was British India; partition came on 14 August 1947.",
    source: "https://en.wikipedia.org/wiki/Partition_of_India",
  }],
  ["ad1945|Pakistan", {
    issue: "This map draws the post-1947 partition border, which did not exist in 1945.",
    actual: "In 1945 this territory was part of British India; Pakistan was created on 14 August 1947.",
    source: "https://en.wikipedia.org/wiki/Partition_of_India",
  }],
  ["ad1945|Bangladesh", {
    issue: "This map draws a border that did not exist until 1971.",
    actual: "In 1945 this territory was the Bengal Presidency of British India; it became East Pakistan in 1947 and Bangladesh in 1971.",
    source: "https://en.wikipedia.org/wiki/Bangladesh_Liberation_War",
  }],
  ["ad1960|Vietnam", {
    issue: "This map draws Vietnam as one state, without the 17th-parallel division.",
    actual: "From 1954 to 1976 Vietnam was divided into North Vietnam and South Vietnam at the 17th parallel.",
    source: "https://en.wikipedia.org/wiki/1954_Geneva_Conference",
  }],
  ["ad1815|Austrian Empire", {
    issue: "This map draws the Austrian Empire still holding the Austrian Netherlands (modern Belgium), which it had lost twenty years earlier.",
    actual: "Austria ceded the Austrian Netherlands to France in 1795; the Congress of Vienna assigned the territory to the United Kingdom of the Netherlands in 1815.",
    source: "https://en.wikipedia.org/wiki/Austrian_Netherlands",
  }],
  ["ad1920|USSR", {
    issue: "The Soviet Union had not been founded in 1920, and the borders shown are later ones.",
    actual: "In 1920 the territory was the Russian SFSR and allied Soviet republics; the USSR was founded on 30 December 1922.",
    source: "https://en.wikipedia.org/wiki/Soviet_Union",
  }],
]);
