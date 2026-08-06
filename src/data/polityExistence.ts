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
  ["Rhodesia", { from: 1965, to: 1979, note: "The name of the unilaterally-independent state, 1965–1979. Southern Rhodesia is the earlier colony.", source: "https://en.wikipedia.org/wiki/Rhodesia" }],
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
