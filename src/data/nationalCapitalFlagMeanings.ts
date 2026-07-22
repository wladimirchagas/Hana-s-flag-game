import type { FlagMeaning } from "./flagMeanings";

/**
 * "What this flag means" explainers for the municipal flags shown in the
 * hierarchy's "National capital" panel (capitals that head no subdivision, so
 * they have no subdivision-keyed `CITY_FLAG_MEANINGS` entry). Keyed by
 * `"<ISO 3166-1 alpha-2>|<normalizeForSearch(capital name)>"` — the SAME key as
 * `NATIONAL_CAPITAL_FLAGS` — and rendered through the shared `FlagMeaning`
 * component, identical look/behaviour to the national/subnational explainer.
 *
 * Same hard rule as every flag-meaning dataset (see CLAUDE.md): every entry is
 * fetched-then-written from an authoritative source with a real `http(s)` URL,
 * folk-etymology/disputed claims go in `myths` (claim + sourced reality), and
 * nothing is fabricated. A capital whose symbolism cannot be sourced is simply
 * absent here — Belmopan (BZ) is omitted: FOTW carries no Belmopan city page,
 * and en.wikipedia documents only the city's motto ("City of Promise") and
 * nickname ("Garden City"), with no per-element symbolism for the green/yellow
 * civic flag or its seal — a missing explainer beats an invented one.
 */
export const NATIONAL_CAPITAL_FLAG_MEANINGS: Record<string, FlagMeaning> = {
  "NL|amsterdam": {
    description:
      "Amsterdam's flag is a red–black–red horizontal triband bearing three white St Andrew's " +
      "crosses (saltires) on the central black band, taken from the city's coat of arms (in use " +
      "since the 13th century). The three crosses are the city's best-known emblem; one documented " +
      "reading treats the black band as the river Amstel with the crosses marking fordable " +
      "crossings, echoing the water symbolism of neighbouring city arms. The flag was formally " +
      "adopted on 5 February 1975.",
    myths: [
      {
        claim:
          "The three crosses commemorate Amsterdam surviving the three great threats of fire, " +
          "floods and the Black Death (plague).",
        reality:
          "This is a popular later legend, not the origin: noble families in the area already " +
          "used three St Andrew's crosses before the Black Death reached Europe, so the crosses " +
          "cannot commemorate surviving the plague.",
      },
    ],
    sources: [
      { title: "Flag of Amsterdam — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Amsterdam" },
    ],
  },
  "CA|ottawa": {
    description:
      "Ottawa's flag, adopted on 24 January 2001 for the newly amalgamated city, places a stylised " +
      "white “O” where a blue field (left) meets a green field (right). Blue represents the region's " +
      "waterways, green its green spaces, and the white “O” the vibrancy and forward movement of the " +
      "new city; the point where the colours meet stands for unity toward a common goal. The “O” " +
      "also abstractly suggests a maple leaf and the Parliament Buildings in Ottawa.",
    sources: [
      { title: "Flag of Ottawa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ottawa" },
    ],
  },
  "DK|kobenhavn": {
    description:
      "Copenhagen's civic flag carries the city's arms: three towers above water. The towers have " +
      "appeared in Copenhagen's seal since at least 1296 — the outer two represent the castle of " +
      "Bishop Absalon, the city's founder, while the central gate-tower once depicted a church " +
      "within it. The wavy water refers to the city's original name Havn (“harbour”). The fuller " +
      "arms, granted in 1661 after the citizens' defence during the Swedish siege of 1658–59, add a " +
      "knight with a raised sword and King Frederik III's “F3” cypher over the gate.",
    sources: [
      {
        title: "Coat of arms of Copenhagen — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Copenhagen",
      },
    ],
  },
  "VE|caracas": {
    description:
      "The flag of Caracas / the Capital District, adopted 13 April 2022, shows the city's mountain " +
      "Waraira Repano (El Ávila) in the green, white and blue of the Caracas landscape, set against " +
      "a red field with a white star. The white star stands for light, rebellion and glow; the red " +
      "for passion and the patriots' blood shed for independence; and the mountain for the natural " +
      "setting that defines the city. It was designed by Víctor Hernán Rodríguez Durán and Carolina " +
      "Jiménez Jiménez and approved by the Municipal Council.",
    sources: [
      {
        title: "Caracas, Capital District (Venezuela) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ve-a.html",
      },
    ],
  },
  "ZA|pretoria": {
    description:
      "Pretoria's flag is a horizontal bicolour in the city's colours, red and yellow (gold), taken " +
      "from the municipal coat of arms adopted in 1989. Those arms are a pun on the city's name: a " +
      "golden inescutcheon bears a seated Roman praetor (a play on “Pretoria”), on a red field with " +
      "a mimosa tree ringed by an orle of eight golden bees, supported by an eland and a kudu " +
      "beneath a triple-towered castle crest, under the motto “Praestantia praevaleat Pretoria” " +
      "(“May Pretoria be pre-eminent in excellence”). The flag is no longer official — Pretoria is " +
      "now part of the Tshwane Metropolitan Municipality, whose symbols superseded the city's.",
    sources: [
      { title: "Pretoria (South Africa) — Flags of the World", url: "https://www.crwflags.com/fotw/Flags/za-preto.html" },
    ],
  },
  "KZ|astana": {
    description:
      "Astana's flag, adopted on 18 November 2022 alongside a new city coat of arms, is a blue field " +
      "(1:2) bearing the city's arms at the centre with golden sun-rays radiating outward. The arms are " +
      "in the blue and gold of Kazakhstan's national flag and are crowned by a shanyrak — the wooden " +
      "roof-ring at the top of a yurt — which in Kazakh tradition (and on the national emblem) stands " +
      "for family, home and the common homeland shared by all who live in the country. Beneath the " +
      "shanyrak is a stylised Baiterek, the Tree-of-Life monument that is Astana's signature landmark, " +
      "and a kuskanaty (a stylised bird / wing motif); a red border carries the city's name. The flag " +
      "was designed by Kazakhstan's first president, Nursultan Nazarbayev.",
    sources: [
      { title: "Flag of Astana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Astana" },
      { title: "Coat of arms of Astana — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Astana" },
    ],
  },
  "MG|antananarivo": {
    description:
      "Antananarivo's flag bears the city's arms (created in 1950): a shield quartered gold and blue, " +
      "with a black zebu head in the two gold quarters and a gold fleur-de-lis in the two blue quarters, " +
      "beneath a mural crown of seven towers. The seven towers stand for the seven main cities of " +
      "Madagascar. The city's motto — “Tsy maty manota ny arivo” / “A thousand shall not die in one " +
      "day” — plays on the name Antananarivo (“City of the Thousand”), which commemorates the roughly " +
      "one thousand soldiers a Merina king garrisoned on the hill of Analamanga to hold it.",
    sources: [
      {
        title: "Antananarivo city (Madagascar) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/mg-antan.html",
      },
    ],
  },
  "LR|monrovia": {
    description:
      "Monrovia's flag is a white field bearing the arms of the Monrovia City Corporation. The shield is " +
      "quartered black and white: a silver key, a palm tree rising from an earthy mound, a second tree, " +
      "and a trumpeting elephant; across the top (a blue chief) a red sun haloed in silver sets over the " +
      "sea beside a faceted star. A scroll below names “The City Government of Monrovia / The Monrovia " +
      "City Corporation.” The city, founded in 1822 by the American Colonization Society as a settlement " +
      "for freed and free-born African Americans, is named after U.S. president James Monroe.",
    sources: [
      {
        title: "Liberian sub-national flags (Monrovia city) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/lr-.html",
      },
    ],
  },
};
