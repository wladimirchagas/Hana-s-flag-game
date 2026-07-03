/**
 * Sourced flag-meaning explanations for the Learn-mode flag widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` as a progressive-disclosure
 * ("What this flag means") expander below the flag image, for BOTH national
 * flags (keyed by ISO 3166-1 alpha-2, e.g. "BR") and subnational flags (keyed
 * by ISO 3166-2 subdivision code, e.g. "GB-SCT").
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * `scripts/check-flag-meanings.mjs` (run by `npm run flags:check` + CI) fails
 * the build if an entry has no description, no source, a source without a valid
 * http(s) URL, or a malformed myth. The check is a safety net, not a substitute
 * for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set (same philosophy as the city
 * overlay's test set) — a flag with no entry simply renders no disclosure.
 */

export interface FlagMeaningSource {
  /** Human-readable citation title, e.g. "Flag of Brazil — Wikipedia". */
  title: string;
  /** Authoritative URL. Must be a real http(s) link. */
  url: string;
  /** Optional publisher, e.g. "Government of South Africa". */
  publisher?: string;
}

export interface FlagMyth {
  /** The widely-believed but false, unproven, or retro-fitted claim. */
  claim: string;
  /** What the cited record actually says. */
  reality: string;
}

export interface FlagMeaning {
  /** Factual description of the design and its documented symbolism. */
  description: string;
  /** Myth-vs-fact notes. Optional, but where a well-known myth exists it MUST live here. */
  myths?: FlagMyth[];
  /** At least one authoritative citation (enforced non-empty). */
  sources: FlagMeaningSource[];
}

export const FLAG_MEANINGS: Record<string, FlagMeaning> = {
  // ── National flags ──────────────────────────────────────────────────────
  BR: {
    description:
      "A blue disc depicting a starry sky (which includes the Southern Cross) spanned by a " +
      "curved white band bearing the national motto “Ordem e Progresso” (“Order and " +
      "Progress”), set within a yellow rhombus on a green field. When the republic was " +
      "proclaimed in 1889 the green field and yellow rhombus were kept from the previous imperial " +
      "flag (slightly modified in hue and shape); a blue circle of white five-pointed stars " +
      "replaced the arms of the Empire. The star pattern reflects the sky over Rio de Janeiro on " +
      "the morning of 15 November 1889, each star stands for a Brazilian federal unit, and each is " +
      "sized by the apparent magnitude of the real star it represents. The motto derives from " +
      "Auguste Comte’s positivist maxim, “L’amour pour principe et l’ordre pour " +
      "base; le progrès pour but” (“Love as a principle and order as the basis; " +
      "progress as the goal”).",
    myths: [
      {
        claim: "The green stands for Brazil’s forests and the yellow for its gold.",
        reality:
          "A nationalist reinterpretation deliberately popularised in 1889 to erase the flag’s " +
          "monarchical origin. The colours were inherited from the imperial flag, where the green " +
          "represented the House of Braganza of Emperor Pedro I and the yellow the House of Habsburg " +
          "of his wife, Empress Maria Leopoldina.",
      },
    ],
    sources: [
      { title: "Flag of Brazil — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brazil" },
    ],
  },

  JP: {
    description:
      "The Nisshōki (“sun-mark flag”), popularly called the Hinomaru (“circle of " +
      "the sun”): a white field bearing a single crimson-red disc in the centre. The disc " +
      "represents the sun, echoing Japan’s name Nihon/Nippon, “origin of the sun” or " +
      "“Land of the Rising Sun,” and its long association with the sun goddess Amaterasu. " +
      "The design has been used on banners for centuries and was designated the national merchant " +
      "flag in 1870; it was given statutory status as the national flag in 1999.",
    sources: [
      { title: "Flag of Japan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Japan" },
    ],
  },

  FR: {
    description:
      "A vertical tricolour of blue, white and red. Blue and red are the traditional colours of " +
      "Paris; white was the colour of the House of Bourbon and the king. The flag arose from the " +
      "revolutionary cockade of 1789, which combined the blue and red of the Paris militia with the " +
      "royal white, and was fixed in its modern vertical form during the French Revolution.",
    myths: [
      {
        claim:
          "The three colours stand for the revolutionary ideals liberté (blue), égalité " +
          "(white) and fraternité (red).",
        reality:
          "A popular later association, not the flag’s documented origin: the colours come from " +
          "the Paris cockade (blue and red) combined with the royal/Bourbon white.",
      },
    ],
    sources: [
      { title: "Flag of France — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_France" },
    ],
  },

  US: {
    description:
      "Thirteen horizontal red-and-white stripes for the thirteen original colonies, and a blue " +
      "canton (the “union”) bearing fifty white five-pointed stars, one for each state. As " +
      "states were admitted the number of stars grew, while the stripe count returned to thirteen in " +
      "1818 to honour the founding colonies.",
    myths: [
      {
        claim:
          "The red officially means valour, the white purity, and the blue vigilance/justice on the " +
          "flag.",
        reality:
          "Those meanings were assigned by Charles Thomson to the colours of the Great Seal in 1782, " +
          "not to the flag. No symbolic meaning for the flag’s colours was recorded when it was " +
          "adopted in 1777.",
      },
    ],
    sources: [
      {
        title: "Flag of the United States — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_States",
      },
    ],
  },

  CA: {
    description:
      "The Maple Leaf flag: a red field with a white square (a “Canadian pale”) at its " +
      "centre bearing a single red eleven-pointed maple leaf. Red and white had been proclaimed " +
      "Canada’s official colours by King George V in 1921, and the maple leaf is a long-standing " +
      "national emblem. The flag was adopted in 1965.",
    myths: [
      {
        claim: "The maple leaf’s eleven points stand for provinces, territories, or other entities.",
        reality:
          "The number of points has no symbolic meaning. An eleven-point leaf was chosen because it " +
          "stayed clearest and least blurred in wind-tunnel tests of the design.",
      },
    ],
    sources: [
      { title: "Flag of Canada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Canada" },
    ],
  },

  IN: {
    description:
      "The Tiranga (“tricolour”): horizontal bands of saffron (top), white (middle) and " +
      "India green (bottom), with a navy-blue 24-spoke Ashoka Chakra (wheel of dharma) at the " +
      "centre. In the interpretation given to the Constituent Assembly by S. Radhakrishnan, the " +
      "saffron denotes courage and sacrifice, the white peace and truth, and the green faith and " +
      "growth, while the chakra represents law, righteousness and ceaseless motion.",
    myths: [
      {
        claim: "The saffron band represents Hindus and the green band represents Muslims.",
        reality:
          "The Constituent Assembly explicitly rejected any communal or religious reading of the " +
          "colours, stressing that the flag has no such meaning.",
      },
    ],
    sources: [
      { title: "Flag of India — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_India" },
    ],
  },

  ZA: {
    description:
      "A horizontal bicolour of red (top) and blue (bottom) separated by a central green " +
      "horizontal Y (a “pall”) bordered in white, with a black triangle bordered in gold " +
      "at the hoist. Adopted in 1994, its converging Y-shape is officially described as symbolising " +
      "the coming together of the country’s diverse peoples and their shared road ahead.",
    myths: [
      {
        claim: "Each colour of the South African flag has a specific official meaning.",
        reality:
          "The South African government states that no universal symbolism is attached to the " +
          "individual colours; only the converging design carries an official meaning.",
      },
    ],
    sources: [
      {
        title: "National flag — Government of South Africa",
        url: "https://www.gov.za/about-sa/national-symbols/national-flag",
        publisher: "Government of South Africa",
      },
      { title: "Flag of South Africa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Africa" },
    ],
  },

  IE: {
    description:
      "A vertical tricolour of green, white and orange. In the flag’s official symbolism the " +
      "green represents the Gaelic and Roman Catholic tradition of Ireland, the orange represents " +
      "the followers of William of Orange (Irish Protestants and unionists), and the white between " +
      "them signifies a lasting peace and truce between the two traditions. It was introduced by " +
      "Thomas Francis Meagher in 1848.",
    sources: [
      { title: "Flag of Ireland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ireland" },
    ],
  },

  DE: {
    description:
      "A horizontal tricolour of black, red and gold. Germany’s constitution (Basic Law) simply " +
      "states that the federal flag is black, red and gold and assigns no official meaning to the " +
      "individual colours. The colours are commonly traced to the black uniforms, red facings and " +
      "gold buttons of the Lützow Free Corps volunteers of the Napoleonic Wars, and were carried by " +
      "the liberal-nationalist movement of the 19th century.",
    myths: [
      {
        claim:
          "The colours officially mean the “blackness of servitude, through bloody battles, to the " +
          "golden light of freedom,” or derive definitively from the Lützow Free Corps.",
        reality:
          "These are popular interpretations, not official doctrine — no meaning is assigned in law — " +
          "and historians treat the Lützow-uniform origin as one plausible theory among several rather " +
          "than a settled fact.",
      },
    ],
    sources: [
      { title: "Flag of Germany — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Germany" },
    ],
  },

  IT: {
    description:
      "A vertical tricolour of green, white and red, first adopted by the Cispadane Republic in 1797. " +
      "Italian Jacobins are documented as choosing green (in place of the French blue) to represent " +
      "nature and, by extension, natural rights, equality and freedom. The colours became emblematic " +
      "of Italian identity through the Napoleonic era and the Risorgimento.",
    myths: [
      {
        claim:
          "The colours depict the landscape: green for the plains/hills, white for the Alpine snow, " +
          "and red for the blood of war.",
        reality:
          "A popular interpretation with no official endorsement. The documented rationale for the " +
          "colours is philosophical (nature, natural rights, equality, freedom), not geographic.",
      },
    ],
    sources: [
      { title: "Flag of Italy — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Italy" },
    ],
  },

  AR: {
    description:
      "Three horizontal bands of light blue, white and light blue, with the golden Sun of May (a " +
      "face surrounded by 32 alternating straight and wavy rays) on the central white band of the " +
      "official flag. General Manuel Belgrano raised it in 1812; the colours came from the national " +
      "cockade, and the Sun of May (added 1818) reproduces the emblem on Argentina’s first coin of 1813.",
    myths: [
      {
        claim: "The light blue and white represent the sky, the clouds and the sun.",
        reality:
          "A popular reading — reinforced by patriotic songs — that historians generally reject. The " +
          "colours are attributed to the national cockade, and scholarly explanations link them to " +
          "Bourbon loyalty (the ribbon of the Order of Charles III) or the arms of Buenos Aires.",
      },
    ],
    sources: [
      { title: "Flag of Argentina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Argentina" },
    ],
  },

  ES: {
    description:
      "Three horizontal stripes of red, yellow and red, the yellow being twice the height of each red " +
      "stripe (giving the nickname la Rojigualda). The coat of arms sits on the yellow band. The " +
      "colours derive from the heraldic traditions of the medieval kingdoms that formed Spain — the " +
      "yellow from the Crown of Aragon, the red from Castile. The design was chosen by Charles III as " +
      "a naval ensign by royal decree in 1785 and extended to all the armed forces in 1843.",
    myths: [
      {
        claim: "The red stripes stand for blood and the yellow for the sand of the bullring.",
        reality:
          "A popular saying with no historical basis. The colours trace to the heraldry of the " +
          "kingdoms of Aragon and Castile.",
      },
    ],
    sources: [
      { title: "Flag of Spain — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Spain" },
    ],
  },

  PT: {
    description:
      "A field of green (hoist) and red (fly) with the national coat of arms — a white shield on a " +
      "yellow armillary sphere — over the boundary. In the official symbolism the red represents " +
      "sacrifice and the blood of those who defended the nation, and the green represents hope (also " +
      "chosen to distinguish the flag from the old royal standard). The armillary sphere recalls the " +
      "Age of Discoveries; the five small blue shields are traditionally associated with the Five " +
      "Wounds of Christ. Adopted in 1911 after the republican revolution, using the red and green of " +
      "the Portuguese Republican Party.",
    myths: [
      {
        claim:
          "The five blue shields commemorate five Moorish kings defeated by Afonso I at the Battle of " +
          "Ourique in 1139.",
        reality:
          "Regarded as a pure legend: the number of bezants on each shield varied over long periods, " +
          "and the story is first recorded only in the 15th century.",
      },
    ],
    sources: [
      { title: "Flag of Portugal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Portugal" },
    ],
  },

  NL: {
    description:
      "A horizontal tricolour of red, white and blue. In heraldic tradition the red is associated with " +
      "bravery and strength, the white with peace and honesty, and the blue with vigilance, loyalty " +
      "and justice. The flag descends from the late-16th-century Prince’s Flag of orange-white-blue " +
      "(after the livery of William of Orange); red gradually replaced orange over the 17th century as " +
      "the Republic distanced itself from the House of Orange, and red-white-blue was reaffirmed by " +
      "royal decree in 1937.",
    myths: [
      {
        claim: "The Dutch flag has always been red, white and blue.",
        reality:
          "The original flag was orange-white-blue; the top stripe became red during the 17th century.",
      },
    ],
    sources: [
      { title: "Flag of the Netherlands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Netherlands" },
    ],
  },

  BE: {
    description:
      "A vertical tricolour of black, yellow and red (with unusual proportions close to 13:15). The " +
      "colours are taken from the arms of the Duchy of Brabant — a red-tongued, red-clawed gold lion " +
      "on a black field. The horizontal tricolour of the 1830 Belgian Revolution was changed to " +
      "vertical stripes by the National Congress in 1831 and written into the Constitution.",
    sources: [
      { title: "Flag of Belgium — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belgium" },
    ],
  },

  SE: {
    description:
      "A blue field bearing a yellow Nordic (off-centre) cross, which traditionally represents " +
      "Christianity. The blue and gold are drawn from the Swedish royal coat of arms, recorded from " +
      "the late 13th century. A blue cloth with a yellow cross is documented from the early 16th " +
      "century and first described in law in 1562; the modern design was fixed by the Flag Law of 1906.",
    myths: [
      {
        claim: "King Eric IX adopted the flag after seeing a golden cross in the sky in 1157.",
        reality:
          "A piece of folklore with no historical documentation; the flag’s recorded origin lies in " +
          "the royal arms, not a vision.",
      },
    ],
    sources: [
      { title: "Flag of Sweden — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sweden" },
    ],
  },

  DK: {
    description:
      "The Dannebrog: a white Nordic cross on a red field. A banner with a white-on-red cross is " +
      "documented in use by the kings of Denmark from the 14th century, and it holds the Guinness " +
      "record as the oldest continuously used national flag.",
    myths: [
      {
        claim:
          "The flag fell from the sky during the Battle of Lyndanisse (Lindanise) in Estonia in 1219, " +
          "granting victory to King Valdemar II.",
        reality:
          "A legend first recorded in 16th-century writings, echoing a wider Christian tradition of " +
          "miraculous crosses — not a documented historical event.",
      },
    ],
    sources: [
      { title: "Flag of Denmark — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Denmark" },
    ],
  },

  GR: {
    description:
      "Nine equal horizontal stripes alternating blue and white, with a white cross on a blue canton; " +
      "the cross represents the Greek Orthodox Christian faith. The blue-and-white cross design was " +
      "adopted by the First National Assembly in 1822; the striped form was standardised in its " +
      "current proportions in 1978. Greek law has never fixed an exact shade of blue.",
    myths: [
      {
        claim:
          "The nine stripes stand for the nine syllables of the motto “Eleftheria i Thanatos” " +
          "(“Freedom or Death”).",
        reality:
          "A popular but unconfirmed interpretation; others link the nine stripes to Greece’s regions " +
          "or to the sky and sea. No official meaning is recorded.",
      },
    ],
    sources: [
      { title: "Flag of Greece — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Greece" },
    ],
  },

  CH: {
    description:
      "A white cross on a square red field, the cross arms one-sixth longer than they are wide. The " +
      "white cross began as a field mark to identify Confederate soldiers, documented from the Battle " +
      "of Laupen (1339), and was formally adopted by the Swiss Diet by 1540. It received a legal " +
      "definition in 1889 and precise proportions in 2017.",
    myths: [
      {
        claim: "The cross was always a religious (Christian) symbol.",
        reality:
          "It originated as practical military identification; the Christian reading was applied " +
          "retrospectively (notably in the Federal Council’s 1889 description), and the competing " +
          "origin legends have no definitive historical support.",
      },
    ],
    sources: [
      { title: "Flag of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Switzerland" },
    ],
  },

  MX: {
    description:
      "A vertical tricolour of green, white and red with the national coat of arms — a golden eagle " +
      "on a nopal cactus devouring a serpent — on the white stripe. The emblem depicts the Aztec " +
      "legend of the founding of Tenochtitlan, the sign marking where the Mexica were to build their " +
      "capital. The tricolour dates from independence (1821); the current design was fixed in 1968.",
    myths: [
      {
        claim: "The colours have fixed official meanings (e.g. green = hope, white = unity, red = blood).",
        reality:
          "The meanings ascribed to the colours have changed over time, and current Mexican flag law " +
          "assigns them no official symbolism.",
      },
    ],
    sources: [
      { title: "Flag of Mexico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mexico" },
    ],
  },

  PL: {
    description:
      "Two equal horizontal bands, white over red. The colours are heraldic: they come from the White " +
      "Eagle of Poland (and the white knight, the Pahonia, of Lithuania) set on a red shield in the " +
      "arms of the Polish-Lithuanian Commonwealth. White and red were declared national colours in " +
      "1831 and the flag was officially adopted in 1919.",
    sources: [
      { title: "Flag of Poland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Poland" },
    ],
  },

  TR: {
    description:
      "A red field bearing a white crescent and star, set slightly left of centre. The star-and-" +
      "crescent is an Ottoman and Turkic emblem — it appeared on Ottoman flags from the late 18th or " +
      "early 19th century and the white crescent-and-star was standardised in 1844. The Republic of " +
      "Türkiye kept the Ottoman design in 1923, and it was fixed by the Turkish Flag Law of 1936.",
    myths: [
      {
        claim:
          "The design shows the reflection of the moon and a star in a pool of blood of soldiers " +
          "fallen in battle.",
        reality:
          "A romantic origin story that is not historically documented. The star-and-crescent is an " +
          "inherited Ottoman/Turkic emblem and — contrary to common belief — predates its association " +
          "with Islam.",
      },
    ],
    sources: [
      { title: "Flag of Turkey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Turkey" },
    ],
  },

  RU: {
    description:
      "A horizontal tricolour of white, blue and red, introduced by Peter the Great in the 1690s and " +
      "later a source of the Pan-Slavic colours. Under Alexander III the colours were officially read " +
      "as white for nobility and frankness, blue for faithfulness and honesty, and red for courage " +
      "and love.",
    myths: [
      {
        claim:
          "The three stripes stand for the three “Russias”: White (Belarus), Little (Ukraine) and " +
          "Great Russia.",
        reality:
          "A common unofficial interpretation with no historical verification; it is not the flag’s " +
          "documented origin.",
      },
    ],
    sources: [
      { title: "Flag of Russia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Russia" },
    ],
  },

  CN: {
    description:
      "A red field with five golden stars in the canton — one large star with four smaller stars " +
      "arced toward it. The red symbolises the communist revolution; the large star represents the " +
      "Chinese Communist Party and the four smaller stars the unity of the Chinese people under its " +
      "leadership (originally the four social classes of Mao’s “New Democracy”). Designed by Zeng " +
      "Liansong and first raised on 1 October 1949.",
    myths: [
      {
        claim: "The five stars represent China’s five largest ethnic groups.",
        reality:
          "A misconception that confuses this flag with the earlier “Five Races Under One Union” flag " +
          "of the Beiyang government (1912–1928). The stars stand for the Party and the people it leads.",
      },
    ],
    sources: [
      { title: "Flag of China — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_China" },
    ],
  },

  KR: {
    description:
      "The Taegeukgi: a white field bearing a central red-and-blue taegeuk (yin-yang) circle, with " +
      "four black trigrams from the I Ching in the corners. The white field stands for peace and " +
      "purity; the taegeuk represents the balance of yin (blue) and yang (red); and the four trigrams " +
      "represent heaven, earth, water and fire, together expressing harmony and movement. Adopted in " +
      "1883 under the Joseon dynasty.",
    sources: [
      { title: "Flag of South Korea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Korea" },
    ],
  },

  GB: {
    description:
      "The Union Flag (Union Jack): the red cross of Saint George (England) over the white saltire of " +
      "Saint Andrew (Scotland) and the red saltire of Saint Patrick (Ireland), combined on a blue " +
      "field. James I first united the English and Scottish crosses in 1606; the Irish saltire was " +
      "added in 1801. Wales is not represented because it had already been incorporated into the " +
      "Kingdom of England before the first Union Flag was created.",
    myths: [
      {
        claim: "The flag may only be called the “Union Jack” when flown at sea.",
        reality:
          "Although “jack” has a maritime origin, official bodies including the Flag Institute accept " +
          "both “Union Jack” and “Union Flag” for the flag in any context.",
      },
    ],
    sources: [
      { title: "Union Jack — Wikipedia", url: "https://en.wikipedia.org/wiki/Union_Jack" },
    ],
  },

  AU: {
    description:
      "A blue field with the Union Jack in the canton, a large white seven-pointed Commonwealth " +
      "(Federation) Star below it, and the five stars of the Southern Cross in the fly. The " +
      "Commonwealth Star’s points stand for the six federating colonies plus a seventh (added 1908) " +
      "for the territories; the Southern Cross is the constellation that marks the southern sky. The " +
      "design came from a 1901 public competition after federation.",
    myths: [
      {
        claim:
          "The four main stars of the Southern Cross officially stand for the moral virtues justice, " +
          "prudence, temperance and fortitude.",
        reality:
          "That association was the personal intent of one of the winning designers, Ivor Evans — it " +
          "is not part of the flag’s official symbolism.",
      },
    ],
    sources: [
      { title: "Flag of Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Australia" },
    ],
  },

  VN: {
    description:
      "A red field with a large gold five-pointed star at the centre. The red represents revolution " +
      "and the blood of the struggle; the gold star stands for the nation, its five points " +
      "traditionally taken to represent the workers, peasants, soldiers, intellectuals and traders " +
      "united under the Communist Party. First raised in 1940 and adopted in 1945; the star’s points " +
      "were straightened in 1955.",
    myths: [
      {
        claim: "The flag was definitively designed by the revolutionary Nguyễn Hữu Tiến.",
        reality:
          "Authorship is disputed; Vietnam’s Ministry of Culture reported in 2001 that there is no " +
          "documentation confirming Tiến as the designer.",
      },
    ],
    sources: [
      { title: "Flag of Vietnam — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vietnam" },
    ],
  },

  ID: {
    description:
      "Two equal horizontal bands, red over white, called Sang Saka Merah-Putih. The red represents " +
      "courage (and the body) and the white purity (and the spirit); the red-and-white pairing goes " +
      "back to banners of the 13th-century Majapahit empire. Adopted at the declaration of " +
      "independence in 1945.",
    myths: [
      {
        claim: "Indonesia copied its flag from Monaco (which is near-identical).",
        reality:
          "The two flags resemble each other by coincidence (they differ slightly in shade and " +
          "proportion). Indonesia’s red-and-white derives from its own Majapahit-era heritage, " +
          "long predating the modern comparison.",
      },
    ],
    sources: [
      { title: "Flag of Indonesia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Indonesia" },
    ],
  },

  TH: {
    description:
      "The Trairong (“tricolour”): five horizontal stripes of red, white, blue, white, red, the " +
      "central blue stripe double width. The colours follow the “Nation–Religion–King” theme — red " +
      "for the nation and people, white for religion (Buddhism), and blue for the monarchy (also the " +
      "auspicious colour of King Vajiravudh, Rama VI, who introduced it in 1917).",
    myths: [
      {
        claim:
          "King Vajiravudh created the symmetric design after seeing the old elephant flag flown " +
          "upside-down.",
        reality:
          "A popular legend rather than documented fact; what is recorded is the 1917 adoption and " +
          "the king’s role in the design.",
      },
    ],
    sources: [
      { title: "Flag of Thailand — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Thailand" },
    ],
  },

  PH: {
    description:
      "A horizontal bicolour of royal blue over red, with a white equilateral triangle at the hoist " +
      "bearing a golden eight-rayed sun and three five-pointed stars. The eight rays represent the " +
      "eight provinces that first rose in the 1896 revolution; the three stars stand for the island " +
      "groups of Luzon, the Visayas and Mindanao; the white triangle represents the Katipunan and " +
      "the ideals of liberty, equality and fraternity. Uniquely, the flag is inverted — red above " +
      "blue — to signify a state of war. First flown in 1898.",
    sources: [
      { title: "Flag of the Philippines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Philippines" },
    ],
  },

  PK: {
    description:
      "A dark green field with a white crescent and five-pointed star, and a white vertical stripe at " +
      "the hoist (one-quarter of the flag). The green represents Pakistan’s Muslim majority and the " +
      "white stripe its religious minorities; the crescent represents progress and the star light " +
      "and knowledge. Based on the All-India Muslim League flag and adopted in 1947, days before " +
      "independence.",
    sources: [
      { title: "Flag of Pakistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pakistan" },
    ],
  },

  EG: {
    description:
      "Three horizontal bands of red, white and black with the golden Eagle of Saladin on the white " +
      "band. In the symbolism of the 1952 revolution the red recalls the struggle and blood shed " +
      "against colonial rule, the white the bright/peaceful future, and the black the end of a dark " +
      "period of oppression. The current design was adopted in 1984.",
    myths: [
      {
        claim: "The red-white-black tricolour is uniquely Egyptian.",
        reality:
          "It is the Arab Liberation Flag that spread from Egypt’s 1952 revolution; Iraq, Sudan, " +
          "Syria and Yemen use closely related red-white-black designs.",
      },
    ],
    sources: [
      { title: "Flag of Egypt — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Egypt" },
    ],
  },

  NG: {
    description:
      "A vertical triband of green, white, green. The green bands represent Nigeria’s agriculture and " +
      "natural wealth and the white band peace and unity. The design won a 1959 national competition " +
      "by Taiwo Akinkunmi and was adopted at independence in 1960; the committee removed a red sun " +
      "from his original entry.",
    sources: [
      { title: "Flag of Nigeria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nigeria" },
    ],
  },

  KE: {
    description:
      "Horizontal bands of black, red and green separated by thin white fimbriations, with a red, " +
      "white and black Maasai shield over two crossed white spears at the centre. The black " +
      "represents the people, the red the blood shed in the struggle for independence, the green the " +
      "land, and the white peace; the shield and spears stand for the defence of freedom. Adopted at " +
      "independence in 1963.",
    sources: [
      { title: "Flag of Kenya — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kenya" },
    ],
  },

  ET: {
    description:
      "A horizontal tricolour of green, yellow and red with a blue disc bearing a golden pentagram " +
      "and rays at the centre. The green stands for labour and development, the yellow for hope and " +
      "justice, and the red for sacrifice; the blue disc represents peace and the star the unity of " +
      "Ethiopia’s peoples. The current emblem dates from 1996 (modified 2009).",
    myths: [
      {
        claim: "Ethiopia’s green-yellow-red are “Pan-African” colours borrowed from elsewhere.",
        reality:
          "The reverse is true: Ethiopia is the source of the Pan-African colours. After it kept its " +
          "independence (notably at Adwa in 1896), newly independent African states adopted green, " +
          "yellow and red in homage to it.",
      },
    ],
    sources: [
      { title: "Flag of Ethiopia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ethiopia" },
    ],
  },

  KW: {
    description:
      "A horizontal triband of green, white and red with a black trapezium at the hoist. The colours " +
      "come from a classical poem by Safi al-Din al-Hilli, in which white stands for the Arabs’ " +
      "deeds, green for their lands, red for their swords and black for their battles. Adopted in " +
      "1961; it is the only national flag whose charge is an acute trapezium.",
    sources: [
      { title: "Flag of Kuwait — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kuwait" },
    ],
  },

  SA: {
    description:
      "A green field bearing, in white, the Islamic declaration of faith (the Shahada) in Thuluth " +
      "script above a horizontal sword. The green is associated with Islam and the sword with " +
      "justice and strength. Because the Shahada is sacred, the flag is never lowered to half-mast " +
      "and is woven with two mirrored sides so the text reads correctly from both. Standardised in 1973.",
    myths: [
      {
        claim: "The flag was designed by Hafiz Wahba.",
        reality:
          "A common misattribution; the King Abdulaziz Foundation records that the design was " +
          "finalised by the Shura Council, not a single individual.",
      },
    ],
    sources: [
      { title: "Flag of Saudi Arabia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia" },
    ],
  },

  CO: {
    description:
      "Three horizontal bands of yellow (the top half), blue and red. In the official reading the " +
      "yellow stands for the nation’s riches, sovereignty and the sun, the blue for the sky and the " +
      "seas and rivers, and the red for the blood shed for independence. The colour scheme was " +
      "created by Francisco de Miranda and adopted by Colombia in 1861.",
    myths: [
      {
        claim:
          "Miranda chose the colours after a 1785 conversation with Goethe about warm/cool colours " +
          "and light.",
        reality:
          "A romantic anecdote attributed to Miranda; he also cited more concrete inspirations, such " +
          "as a similarly-coloured flag in a Genoa fresco and the standard of Hamburg’s civic guard.",
      },
    ],
    sources: [
      { title: "Flag of Colombia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Colombia" },
    ],
  },

  CL: {
    description:
      "Two horizontal bands, white over red, with a blue square canton bearing a single white " +
      "five-pointed star (La Estrella Solitaria). Officially the blue represents the sky and the " +
      "Pacific, the white the snow of the Andes, and the red the blood shed for independence; the " +
      "star is a guide to progress and honour, linked to Venus in Mapuche tradition. Adopted in 1817.",
    myths: [
      {
        claim: "The Chilean flag was voted the “most beautiful flag in the world” in Belgium in 1907.",
        reality:
          "A popular legend with internal errors (it misdescribes Belgium’s geography) and no " +
          "reliable evidence; it is not a documented event.",
      },
    ],
    sources: [
      { title: "Flag of Chile — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Chile" },
    ],
  },

  PE: {
    description:
      "A vertical triband of red, white, red. Officially the red represents the blood of those who " +
      "fell for independence and the white represents purity and peace. First decreed by José de San " +
      "Martín in 1820; the current vertical form was standardised in 1825.",
    myths: [
      {
        claim:
          "San Martín chose red and white after seeing (or dreaming of) red-and-white parihuana " +
          "flamingos.",
        reality:
          "A popular story; the real reasons for the colours are not documented. One scholarly " +
          "suggestion is that he combined the colours of his Chilean and Argentine allies.",
      },
    ],
    sources: [
      { title: "Flag of Peru — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Peru" },
    ],
  },

  CU: {
    description:
      "Five horizontal stripes (three blue, two white) with a red equilateral triangle at the hoist " +
      "bearing a white five-pointed star. The three blue stripes stand for the three divisions into " +
      "which Cuba was then split, the white for the purity of the patriotic cause, and the red " +
      "triangle — with Masonic influence — for strength and the ideals of liberty, equality and " +
      "fraternity; the star represents the independent nation. Designed in 1849 and adopted in 1902.",
    sources: [
      { title: "Flag of Cuba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cuba" },
    ],
  },

  IL: {
    description:
      "A white field with two horizontal blue stripes and a blue Star of David (Magen David) at the " +
      "centre. The design is based on the tallit, the Jewish prayer shawl, and the Star of David is a " +
      "long-standing Jewish symbol. Adopted by the Zionist movement in 1897 and as the national flag " +
      "in 1948.",
    myths: [
      {
        claim:
          "The two blue stripes represent the Nile and the Euphrates, signalling a plan to expand " +
          "between those rivers.",
        reality:
          "A documented misconception, refuted by scholars: the stripes reproduce the bands of the " +
          "prayer shawl, not rivers.",
      },
    ],
    sources: [
      { title: "Flag of Israel — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Israel" },
    ],
  },

  IR: {
    description:
      "A horizontal tricolour of green, white and red with the red national emblem — a stylised form " +
      "of the word “Allah” made of four crescents and a sword — at the centre, and the Takbir " +
      "(“God is greatest”) written 22 times in white Kufic script along the inner edges of the green " +
      "and red bands, recalling 22 Bahman, the date of the 1979 revolution. Green, white and red are " +
      "traditional Iranian colours. Adopted in 1980, replacing the earlier Lion and Sun flag.",
    sources: [
      { title: "Flag of Iran — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iran" },
    ],
  },

  UA: {
    description:
      "Two equal horizontal bands, blue over yellow. Blue and yellow have been associated with " +
      "Ukrainian heraldry since at least the 15th century; the bicolour was adopted by the Supreme " +
      "Ruthenian Council in Lviv in 1848, used by the independence movements of 1917–1921, banned " +
      "under Soviet rule, and officially restored in 1992.",
    myths: [
      {
        claim: "Officially, the blue represents the sky and the yellow a field of wheat.",
        reality:
          "A widespread and evocative interpretation, but not an official one — the colours’ " +
          "documented origin is heraldic, not a depiction of sky and wheat.",
      },
    ],
    sources: [
      { title: "Flag of Ukraine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ukraine" },
    ],
  },

  NO: {
    description:
      "A red field with a white-bordered blue Nordic (off-centre) cross. Designed by Fredrik Meltzer " +
      "in 1821, it combined red, white and blue as “colours of freedom” (echoing the French, Dutch " +
      "and American flags): the red recalled Norway’s union with Denmark and the blue the new Swedish " +
      "dynasty, while the cross follows Nordic and Christian tradition.",
    sources: [
      { title: "Flag of Norway — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Norway" },
    ],
  },

  FI: {
    description:
      "A white field with a blue Nordic cross. The blue is said to represent Finland’s thousands of " +
      "lakes and its sky, and the white the snow that covers the land in winter. The design was " +
      "chosen by competition after independence and adopted in 1918.",
    myths: [
      {
        claim: "The blue-cross flag is an ancient, medieval Finnish design.",
        reality:
          "It was standardised only in the early 20th century, emerging from a modern 1918 design " +
          "competition (with a ~1860 concept by the poet Zachris Topelius as an inspiration).",
      },
    ],
    sources: [
      { title: "Flag of Finland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Finland" },
    ],
  },

  IS: {
    description:
      "A blue field with a white-bordered red Nordic cross. The colours are read as Iceland’s " +
      "landscape: blue for the mountains and the surrounding ocean, white for ice and snow, and red " +
      "for volcanic fire. A blue-and-white flag appeared in the 1890s; the red cross was added in " +
      "1915, and the design became official when Iceland became a republic in 1944.",
    sources: [
      { title: "Flag of Iceland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iceland" },
    ],
  },

  AT: {
    description:
      "A horizontal triband of red, white, red — among the oldest national symbols still in use. It " +
      "derives from the arms of the Babenberg dynasty (a silver band on a red field), first recorded " +
      "on a seal of 1230.",
    myths: [
      {
        claim:
          "The flag comes from Duke Leopold V’s surcoat, soaked red with blood in battle except for " +
          "a white band left by his belt.",
        reality:
          "A colourful legend (recorded from about 1260), separate from — and later than — the " +
          "documented 1230 heraldic origin.",
      },
    ],
    sources: [
      { title: "Flag of Austria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Austria" },
    ],
  },

  RO: {
    description:
      "A vertical tricolour of blue, yellow and red, read as liberty (blue), justice (yellow) and " +
      "fraternity (red). The colours crystallised in the uprisings of 1821 and the 1848 revolution " +
      "and were standardised by the 1866 constitution. The flag is almost identical to Chad’s, which " +
      "developed independently.",
    myths: [
      {
        claim: "Romania simply borrowed the French tricolour.",
        reality:
          "The individual colours have independent roots in Romanian heraldry dating back centuries " +
          "before their combination as a national flag.",
      },
    ],
    sources: [
      { title: "Flag of Romania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Romania" },
    ],
  },

  HU: {
    description:
      "A horizontal tricolour of red, white and green. In the interpretation set out in the 2012 " +
      "constitution the red stands for strength, the white for fidelity and the green for hope. The " +
      "colours come from the medieval Hungarian coat of arms (they appear on seal cords from at least " +
      "the 15th century); the tricolour itself dates from the revolution of 1848.",
    myths: [
      {
        claim:
          "The colours mean the blood shed for the homeland (red), freedom (white) and the country’s " +
          "pastures (green).",
        reality:
          "A romantic-era folk interpretation. The documented origin is heraldic — the colours of the " +
          "coat of arms — with the official meanings (strength, fidelity, hope) set only later.",
      },
    ],
    sources: [
      { title: "Flag of Hungary — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hungary" },
    ],
  },

  CZ: {
    description:
      "Two horizontal bands, white over red, with a blue isosceles triangle at the hoist. The white " +
      "is associated with Bohemia, the red with Moravia and the blue with sovereignty (originally " +
      "with Slovakia). Designed by Jaroslav Kursa and adopted in 1920 — the blue triangle was added " +
      "to distinguish the plain white-over-red from Poland’s flag. It is the former Czechoslovak " +
      "flag, kept by the Czech Republic when Czechoslovakia split in 1993.",
    sources: [
      { title: "Flag of the Czech Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Czech_Republic" },
    ],
  },

  HR: {
    description:
      "Three horizontal bands of red, white and blue (the Pan-Slavic colours) with the national coat " +
      "of arms at the centre: the red-and-white checkerboard shield, the šahovnica, topped by a crown " +
      "of five smaller shields for the historical regions of Croatia, Dubrovnik, Dalmatia, Istria and " +
      "Slavonia. The tricolour dates from 1848; the current design was adopted in 1990, replacing the " +
      "communist-era red star.",
    sources: [
      { title: "Flag of Croatia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Croatia" },
    ],
  },

  RS: {
    description:
      "A horizontal tricolour of red, blue and white — the Pan-Slavic colours — with the coat of arms " +
      "toward the hoist on the state flag. The tricolour has represented Serbia since 1835.",
    myths: [
      {
        claim:
          "Serbs created their flag by flying the Russian flag upside-down at a celebration.",
        reality:
          "The colours were adopted through official channels — set out in Serbia’s 1835 constitution " +
          "and permitted by an Ottoman decree — not by inverting another country’s flag.",
      },
    ],
    sources: [
      { title: "Flag of Serbia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Serbia" },
    ],
  },

  BG: {
    description:
      "A horizontal tricolour of white, green and red. It was first adopted in 1879 after Bulgaria’s " +
      "liberation in the Russo-Turkish War, and the same colours have been used ever since (a state " +
      "emblem was added in the hoist during the communist era and removed in 1990).",
    sources: [
      { title: "Flag of Bulgaria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bulgaria" },
    ],
  },

  LV: {
    description:
      "A dark carmine-red field crossed by a narrow white stripe (the red bands each twice the height " +
      "of the white). It is among the oldest flags in the world: a red banner with a white stripe " +
      "carried by warriors from Cēsis is recorded in the Rhymed Chronicle of Livonia describing a " +
      "battle of 1279.",
    myths: [
      {
        claim:
          "The flag comes from a mortally wounded Latgalian chief wrapped in a white sheet, its edges " +
          "stained red with his blood while the centre stayed white.",
        reality:
          "A folk legend, unverified. What is documented is the flag’s 13th-century use in the Rhymed " +
          "Chronicle; the actual origin of the design is unknown.",
      },
    ],
    sources: [
      { title: "Flag of Latvia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Latvia" },
    ],
  },

  LT: {
    description:
      "A horizontal tricolour of yellow, green and red. Officially the yellow symbolises the sun and " +
      "prosperity, the green the forests, countryside, freedom and hope, and the red the blood and " +
      "bravery of those who died for Lithuania. The colours were drawn from traditional folk weaving " +
      "and dress, and the design was settled by a commission in 1918.",
    myths: [
      {
        claim: "The flag was created by a single designer.",
        reality:
          "It was the work of a commission — Jonas Basanavičius, Antanas Žmuidzinavičius and Tadas " +
          "Daugirdas — who finalised the yellow-green-red tricolour in 1918.",
      },
    ],
    sources: [
      { title: "Flag of Lithuania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lithuania" },
    ],
  },

  EE: {
    description:
      "A horizontal tricolour of blue, black and white (sinimustvalge). In the popular interpretation " +
      "the blue is the sky, the black the soil and the homeland, and the white purity and hard work. " +
      "The colours began with a Tartu university students’ society, whose first flag was consecrated " +
      "in 1884, decades before Estonian independence in 1918.",
    myths: [
      {
        claim: "The colours carry an official symbolic meaning.",
        reality:
          "Estonia’s Flag Act specifies only the technical colours; the sky/soil/purity reading is a " +
          "cultural interpretation that developed after the flag was adopted.",
      },
    ],
    sources: [
      { title: "Flag of Estonia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Estonia" },
    ],
  },

  BY: {
    description:
      "An unequal bicolour of red (upper two-thirds) over green (lower third), with a red-on-white " +
      "decorative pattern taken from traditional Belarusian textiles running vertically at the hoist. " +
      "In the official reading the red represents freedom and the sacrifice of the nation’s " +
      "forefathers and the green represents life. It is adapted from the 1951 Soviet-era republican " +
      "flag (with the hammer, sickle and star removed), approved by a 1995 referendum and revised in " +
      "2012. A historical white-red-white flag is also used, notably by the opposition.",
    sources: [
      { title: "Flag of Belarus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belarus" },
    ],
  },

  SK: {
    description:
      "A horizontal tricolour of white, blue and red (the Pan-Slavic colours) with the national coat " +
      "of arms toward the hoist: a white double cross on three blue hills, within a narrow white " +
      "border. The double cross is a Christian symbol, and the modern arms (adopted with the flag in " +
      "1992) are based on a 14th-century coat of arms.",
    sources: [
      { title: "Flag of Slovakia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Slovakia" },
    ],
  },

  AL: {
    description:
      "A red field with a black double-headed eagle at the centre. The red is associated with " +
      "bravery, strength and bloodshed, and the black double-headed eagle represents the Albanian " +
      "people; it derives from the Byzantine imperial eagle adopted by the national hero Skanderbeg " +
      "in the 15th century. Established as the national flag at independence in 1912 (a communist-era " +
      "star above the eagle was removed in 1992).",
    sources: [
      { title: "Flag of Albania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Albania" },
    ],
  },

  MK: {
    description:
      "A red field with a stylised golden-yellow sun of eight broadening rays reaching the edges. The " +
      "sun stands for the “new sun of Liberty” of the national anthem. The current design (by " +
      "Miroslav Grčev) was adopted in 1995, replacing the 1992 flag that bore the ancient Vergina " +
      "Sun — a change made to settle a dispute with Greece over that symbol.",
    sources: [
      { title: "Flag of North Macedonia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Macedonia" },
    ],
  },

  MT: {
    description:
      "A vertical bicolour of white (hoist) and red, with the George Cross — edged in red — in the " +
      "upper hoist corner of the white band. King George VI awarded the George Cross to Malta in 1942 " +
      "for its people’s bravery in the Second World War, and it was added to the flag in 1943.",
    myths: [
      {
        claim:
          "The white and red come from Count Roger of Sicily, who in 1091 tore his red-and-white " +
          "banner to give the Maltese their colours.",
        reality:
          "This story has been debunked as a 19th-century myth; the colours more likely derive from " +
          "the white-cross-on-red flag of the Knights of Malta.",
      },
    ],
    sources: [
      { title: "Flag of Malta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malta" },
    ],
  },

  CY: {
    description:
      "A white field bearing a copper-coloured silhouette of the island of Cyprus above two green " +
      "olive branches. The copper colour refers to the island’s copper deposits (from which its name " +
      "derives) and the olive branches to peace between its Greek and Turkish communities. It was " +
      "designed to be deliberately neutral — avoiding the blue and red of the Greek and Turkish flags " +
      "— and was adopted at independence in 1960.",
    sources: [
      { title: "Flag of Cyprus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cyprus" },
    ],
  },

  SI: {
    description:
      "A horizontal tricolour of white, blue and red with the national coat of arms in the upper " +
      "hoist: Mount Triglav (Slovenia’s highest peak) in white, two wavy blue lines for the sea and " +
      "rivers, and three golden stars taken from the arms of the medieval Counts of Celje. Adopted " +
      "for independent Slovenia in 1991.",
    myths: [
      {
        claim: "The white, blue and red are simply the Pan-Slavic colours.",
        reality:
          "Although commonly linked to the Pan-Slavic palette, the colours actually derive from the " +
          "medieval arms of the Duchy of Carniola.",
      },
    ],
    sources: [
      { title: "Flag of Slovenia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Slovenia" },
    ],
  },

  LU: {
    description:
      "A horizontal tricolour of red, white and light blue, taken from the arms of the House of " +
      "Luxembourg (a red lion on a white-and-blue striped field). Standardised in 1848 and defined in " +
      "law in 1993.",
    myths: [
      {
        claim: "Luxembourg’s flag is identical to that of the Netherlands.",
        reality:
          "They differ: Luxembourg’s blue is a lighter shade and its flag is longer in proportion. " +
          "The 1993 law fixed the brighter blue specifically to avoid confusion.",
      },
    ],
    sources: [
      { title: "Flag of Luxembourg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Luxembourg" },
    ],
  },

  MD: {
    description:
      "A vertical tricolour of blue, yellow and red — echoing Romania’s colours in a reflection of " +
      "the two countries’ shared heritage — with the national coat of arms on the yellow band: a " +
      "golden eagle holding an Orthodox cross in its beak and a shield bearing an aurochs’ head with a " +
      "star, a rose and a crescent. Adopted in 1990. Until 2010 it was one of the few flags whose " +
      "reverse differed from its front (the coat of arms showed only on one side); the reverse is now " +
      "a mirror image.",
    sources: [
      { title: "Flag of Moldova — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Moldova" },
    ],
  },

  BA: {
    description:
      "A blue field with a yellow right-angled triangle and a row of white stars along its " +
      "hypotenuse. The triangle’s three points stand for the country’s three main peoples — Bosniaks, " +
      "Croats and Serbs — and its shape echoes the map of the country; the stars represent Europe and " +
      "are meant to be infinite, so they are cut off top and bottom. The blue and yellow are neutral, " +
      "European colours. The flag was imposed in 1998 by the international High Representative after " +
      "parliament could not agree, and it deliberately avoids references to earlier Bosnian symbols.",
    sources: [
      { title: "Flag of Bosnia and Herzegovina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bosnia_and_Herzegovina" },
    ],
  },

  MC: {
    description:
      "Two equal horizontal bands, red over white, from the heraldic colours of the ruling House of " +
      "Grimaldi (documented from at least 1339). The current flag was adopted in 1881. It is nearly " +
      "identical to Indonesia’s flag, differing mainly in proportion.",
    sources: [
      { title: "Flag of Monaco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Monaco" },
    ],
  },

  LI: {
    description:
      "Two horizontal bands, blue over red, with a gold crown in the upper hoist. The blue represents " +
      "the sky and the red the evening fires lit in the country’s houses; the crown represents the " +
      "principality and the unity of the people and ruling house. The crown was added in 1937 after " +
      "the 1936 Berlin Olympics revealed that Liechtenstein’s flag was identical to Haiti’s.",
    sources: [
      { title: "Flag of Liechtenstein — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Liechtenstein" },
    ],
  },

  AD: {
    description:
      "A vertical tricolour of blue, yellow and red (the yellow band slightly wider) with the national " +
      "coat of arms at the centre. The colours combine those of France (blue and red) with those of " +
      "Catalonia and the County of Foix (red and yellow), reflecting Andorra’s status as a " +
      "co-principality. The arms’ four quarters stand for the Bishop of Urgell, the Count of Foix, " +
      "Catalonia and Béarn, under the motto Virtus Unita Fortior (“united virtue is stronger”). The " +
      "tricolour dates from 1866.",
    myths: [
      {
        claim: "The flag was designed by Napoleon III.",
        reality:
          "Often credited to him, but it may actually be the work of Guillem d’Areny-Plandolit, whose " +
          "1866 reforms coincided with its adoption.",
      },
    ],
    sources: [
      { title: "Flag of Andorra — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Andorra" },
    ],
  },

  GH: {
    description:
      "Horizontal bands of red, gold and green with a black five-pointed star in the centre. The red " +
      "represents the blood of those who died in the struggle for independence, the gold the " +
      "country’s mineral wealth, and the green its forests and natural riches. The black star is a " +
      "symbol of African emancipation, taken from Marcus Garvey’s Black Star Line. Designed by " +
      "Theodosia Okoh and adopted at independence in 1957.",
    sources: [
      { title: "Flag of Ghana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ghana" },
    ],
  },

  SN: {
    description:
      "A vertical tricolour of green, yellow and red — the Pan-African colours of continental unity — " +
      "with a green five-pointed star on the central band. The green carries religious meaning (in " +
      "Islam, the colour of the Prophet) as well as hope and fertility; the yellow stands for wealth " +
      "and for the arts and knowledge; and the red for the blood and sacrifice of the nation. The " +
      "star recalls the ideogram of the former Mali Federation flag. Adopted in 1960.",
    sources: [
      { title: "Flag of Senegal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Senegal" },
    ],
  },

  DZ: {
    description:
      "Two equal vertical halves, green (hoist) and white, with a red star and crescent over the " +
      "centre line. The green represents Islam and the white purity; the red star and crescent are " +
      "Islamic symbols. Adopted at independence in 1962.",
    myths: [
      {
        claim: "The design first appeared spontaneously during the independence war.",
        reality:
          "It has earlier precedents: the same green-and-white flag with a red star and crescent was " +
          "displayed at May Day parades in 1919–1920, and Émilie Busquant is credited with sewing a " +
          "version in 1934.",
      },
    ],
    sources: [
      { title: "Flag of Algeria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Algeria" },
    ],
  },

  MA: {
    description:
      "A red field with a green five-pointed interlaced star (the pentagram, or Seal of Solomon) at " +
      "the centre. The red is the historic colour of the ruling Alaouite dynasty, which claims " +
      "descent from the Prophet Muhammad, and the green star is associated with the five pillars of " +
      "Islam. Morocco’s flag had been plain red until Sultan Yusef added the green pentagram by " +
      "decree in 1915 to make it distinctive, especially at sea.",
    sources: [
      { title: "Flag of Morocco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Morocco" },
    ],
  },

  TN: {
    description:
      "A red field with a central white disc bearing a red crescent and five-pointed star. The red is " +
      "associated with the blood of martyrs, and the crescent and star with the unity of Muslims and " +
      "the Five Pillars of Islam. The design dates from the reign of Bey Hussein II and was adopted " +
      "in 1831.",
    myths: [
      {
        claim: "The crescent and star are purely Islamic symbols.",
        reality:
          "The crescent may descend from ancient Carthage — it appears on Punic artefacts from the " +
          "region — so it predates its later Islamic association.",
      },
    ],
    sources: [
      { title: "Flag of Tunisia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tunisia" },
    ],
  },

  LY: {
    description:
      "A horizontal triband of red, black (double height) and green, with a white crescent and star " +
      "on the black band. Its designer, Omar Faiek Shennib, described the red as the blood shed for " +
      "freedom, the black as the dark years of Italian occupation and the green as the nation’s " +
      "agricultural wealth. Adopted for the Kingdom of Libya in 1951, it was restored in 2011 after " +
      "the fall of Gaddafi, whose plain all-green flag (1977–2011) had been the world’s only " +
      "single-colour national flag.",
    sources: [
      { title: "Flag of Libya — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Libya" },
    ],
  },

  SD: {
    description:
      "A horizontal red-white-black tricolour with a green triangle at the hoist — the Arab Liberation " +
      "colours. The red stands for struggle and sacrifice, the white for peace and the anti-colonial " +
      "White Flag League, the black for Sudan itself (whose name means “land of the black people”), " +
      "and the green for Islam and agriculture. Adopted in 1970.",
    myths: [
      {
        claim: "This flag has been Sudan’s since independence in 1956.",
        reality:
          "Sudan’s first flag (1956–1970) was a blue-yellow-green tricolour for the Nile, the desert " +
          "and the farmland; the current Arab Liberation design replaced it only in 1970.",
      },
    ],
    sources: [
      { title: "Flag of Sudan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sudan" },
    ],
  },

  RW: {
    description:
      "A horizontal tricolour of blue, yellow and green with a golden sun in the upper fly. The blue " +
      "represents happiness and peace, the yellow economic development and the green hope of " +
      "prosperity, while the sun stands for unity and enlightenment. Adopted in 2001 to replace the " +
      "earlier red-yellow-green flag, which had become associated with the 1994 genocide.",
    sources: [
      { title: "Flag of Rwanda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rwanda" },
    ],
  },

  UG: {
    description:
      "Six horizontal bands alternating black, yellow and red, with a white disc at the centre bearing " +
      "a grey crowned crane. The black stands for the people, the yellow for Africa’s sunshine and the " +
      "red for brotherhood; the crowned crane — a former military badge, shown with one leg raised — " +
      "symbolises the country moving forward. Adopted at independence in 1962.",
    sources: [
      { title: "Flag of Uganda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uganda" },
    ],
  },

  TZ: {
    description:
      "A green upper triangle and a blue lower triangle divided by a black, gold-edged diagonal band. " +
      "The green represents the land and agriculture, the black the Swahili people, the blue the " +
      "Indian Ocean and the country’s lakes and rivers, and the gold edging its mineral wealth. " +
      "Adopted in 1964, when Tanganyika and Zanzibar united, combining elements of their two flags.",
    sources: [
      { title: "Flag of Tanzania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tanzania" },
    ],
  },

  ZW: {
    description:
      "Seven horizontal stripes (green, yellow, red and black, mirrored) with a white triangle at the " +
      "hoist bearing a red star and the golden Zimbabwe Bird. The green stands for agriculture, the " +
      "yellow for mineral wealth, the red for the blood of the liberation struggle and the black for " +
      "the Black majority; the white triangle is peace, the red star national aspirations, and the " +
      "Zimbabwe Bird is the soapstone emblem of the ruins of Great Zimbabwe. Adopted in 1980.",
    sources: [
      { title: "Flag of Zimbabwe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Zimbabwe" },
    ],
  },

  MZ: {
    description:
      "Horizontal green, black and yellow bands with white fimbriations and a red triangle at the " +
      "hoist bearing a yellow star on which sit an open book, a hoe and an AK-47 rifle. The red is " +
      "anti-colonial resistance, the green the land, the black Africa, the yellow mineral wealth and " +
      "the white peace; the star is internationalism, and the book, hoe and rifle stand for education, " +
      "production and defence. Adopted in 1983, it is the only national flag depicting a modern firearm.",
    sources: [
      { title: "Flag of Mozambique — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mozambique" },
    ],
  },

  AO: {
    description:
      "A horizontal bicolour of red over black with a yellow emblem — a half cogwheel, a machete and a " +
      "star. The red recalls the blood shed under colonial rule and in war, and the black stands for " +
      "Africa; the cogwheel represents industrial workers, the machete the peasantry and agriculture, " +
      "and the star internationalism. Adopted at independence in 1975, based on the flag of the MPLA " +
      "movement.",
    sources: [
      { title: "Flag of Angola — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Angola" },
    ],
  },

  ML: {
    description:
      "A vertical tricolour of green, yellow and red — the Pan-African colours — read as fertility, " +
      "mineral wealth and independence. Adopted in 1961; the earlier 1959 flag carried a black human " +
      "figure (a kanaga) on the yellow band, which was removed after opposition in the mostly Muslim " +
      "country. It is the mirror image of Guinea’s flag.",
    sources: [
      { title: "Flag of Mali — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mali" },
    ],
  },

  BF: {
    description:
      "A horizontal bicolour of red over green with a yellow five-pointed star at the centre — the " +
      "Pan-African colours. The red stands for the revolution, the green for agricultural wealth and " +
      "hope, and the yellow star for the guiding light of the revolution. Adopted in 1984 when Thomas " +
      "Sankara renamed the country from Upper Volta to Burkina Faso, replacing the old black-white-red " +
      "tricolour.",
    sources: [
      { title: "Flag of Burkina Faso — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Burkina_Faso" },
    ],
  },

  CM: {
    description:
      "A vertical tricolour of green, red and yellow — the Pan-African colours — with a gold star on " +
      "the red band. The green stands for the southern forests, the yellow for the sun and the " +
      "savannas of the north, and the red for unity, of which the central star is the emblem. Adopted " +
      "in 1975, replacing the federal flag that bore two stars for East and West Cameroon.",
    sources: [
      { title: "Flag of Cameroon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cameroon" },
    ],
  },

  ZM: {
    description:
      "A green field with an orange African fish eagle in flight over a block of three vertical " +
      "stripes — red, black and orange — at the fly. The green stands for agriculture and natural " +
      "resources, the red for the struggle for freedom, the black for the Zambian people and the " +
      "orange for mineral wealth (copper); the eagle represents freedom and rising above the nation’s " +
      "problems. Adopted at independence in 1964.",
    sources: [
      { title: "Flag of Zambia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Zambia" },
    ],
  },

  CI: {
    description:
      "A vertical tricolour of orange, white and green. In the 1959 explanation the orange stands for " +
      "the land and the blood of a young people, the white for peace and the green for hope in the " +
      "future. Adopted at independence in 1960.",
    myths: [
      {
        claim: "It is the same as the flag of Ireland.",
        reality:
          "Ireland’s flag carries the same three colours in the reverse order (green–white–orange) " +
          "and a different proportion; the two are distinct flags often confused for one another.",
      },
    ],
    sources: [
      { title: "Flag of Ivory Coast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ivory_Coast" },
    ],
  },

  SO: {
    description:
      "A light blue field with a single white five-pointed star. The blue was chosen in tribute to " +
      "the United Nations, which oversaw Somalia’s path to independence; the star’s five points stand " +
      "for the regions where Somalis form the majority — Somalia, Somaliland, Djibouti, the Somali " +
      "region of Ethiopia and north-eastern Kenya. Designed by Mohammed Awale Liban and adopted in 1954.",
    sources: [
      { title: "Flag of Somalia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Somalia" },
    ],
  },

  MR: {
    description:
      "A green field with a gold star and crescent, bordered by a red stripe at top and bottom. The " +
      "green and the gold star and crescent stand for Islam; the red stripes, added in 2017, " +
      "commemorate the blood shed by those who fought for independence from France. The original " +
      "flag dates from 1959.",
    sources: [
      { title: "Flag of Mauritania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mauritania" },
    ],
  },

  TD: {
    description:
      "A vertical tricolour of indigo blue, yellow and red — combining the French tricolour form with " +
      "the Pan-African colours. The blue evokes the sky, hope and Lake Chad, the yellow the sun and " +
      "the Sahara, and the red progress and the blood shed for independence. Adopted in 1959.",
    myths: [
      {
        claim: "Chad copied its flag from Romania (the two are almost identical).",
        reality:
          "The designs arose independently. Romania’s tricolour is much older, but for years it " +
          "carried a communist emblem; once that was removed in 1989 the two became nearly " +
          "indistinguishable. Chad raised the matter at the UN in 2004 and neither country changed.",
      },
    ],
    sources: [
      { title: "Flag of Chad — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Chad" },
    ],
  },

  ER: {
    description:
      "A red isosceles triangle pointing from the hoist to the fly, with a green triangle above and a " +
      "blue triangle below, and a gold olive wreath on the red near the hoist. The green stands for " +
      "agriculture, the blue for the sea and its wealth, and the red for the blood of the " +
      "independence struggle; the olive wreath is taken from Eritrea’s 1952 flag. Adopted in 1995.",
    sources: [
      { title: "Flag of Eritrea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Eritrea" },
    ],
  },

  SS: {
    description:
      "A horizontal black, red and green tricolour with white fimbriations and a blue triangle at the " +
      "hoist bearing a gold star. The black stands for the people, the red for the blood shed for " +
      "freedom, the green for the land and its wealth, the white for peace, the blue for the waters of " +
      "the Nile and the gold star for the unity of the states. Adopted in 2005 and kept at " +
      "independence in 2011.",
    sources: [
      { title: "Flag of South Sudan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Sudan" },
    ],
  },

  MG: {
    description:
      "A white vertical band at the hoist with two horizontal bands, red over green, in the fly. On " +
      "adoption the colours were declared to mean purity (white), sovereignty (red) and hope (green); " +
      "the red and white also recall the historical Merina monarchy. Adopted in 1958.",
    sources: [
      { title: "Flag of Madagascar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Madagascar" },
    ],
  },

  BW: {
    description:
      "A light blue field crossed by a black horizontal stripe edged in white. The blue stands for " +
      "water and rain — precious in a dry country, and the source of the national motto Pula (“rain”) " +
      "— while the black-and-white stripe stands for racial harmony and echoes the zebra, the national " +
      "animal. It was deliberately designed without Pan-African colours to contrast with " +
      "apartheid-era South Africa. Adopted at independence in 1966.",
    sources: [
      { title: "Flag of Botswana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Botswana" },
    ],
  },

  NE: {
    description:
      "A horizontal tricolour of orange, white and green with an orange disc at the centre. The " +
      "colours are commonly read as the Sahara in the north (orange), purity and the River Niger " +
      "(white) and the fertile south (green), with the disc as the sun, though these meanings are " +
      "not officially confirmed. Adopted in 1959.",
    myths: [
      {
        claim: "The colours have fixed, officially-defined meanings.",
        reality:
          "Official sources have never confirmed the symbolism; the sun/Sahara/river readings are " +
          "widespread interpretations rather than documented fact.",
      },
    ],
    sources: [
      { title: "Flag of Niger — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Niger" },
    ],
  },

  LR: {
    description:
      "Eleven horizontal red and white stripes with a blue square canton bearing a single white " +
      "five-pointed star. The eleven stripes stand for the signatories of Liberia’s 1847 Declaration " +
      "of Independence; the red is courage and the white moral excellence; the lone star marks " +
      "Africa’s first independent republic on the blue of the continent. Its resemblance to the flag " +
      "of the United States is deliberate — Liberia was founded by freed African Americans. Adopted " +
      "in 1847.",
    sources: [
      { title: "Flag of Liberia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Liberia" },
    ],
  },

  GA: {
    description:
      "Three equal horizontal bands of green, yellow and blue. The green stands for the country’s " +
      "forests and natural resources, the yellow for the Equator that crosses Gabon and for the sun, " +
      "and the blue for the Atlantic Ocean. Adopted in 1960, replacing a version that had carried the " +
      "French tricolour in the canton.",
    sources: [
      { title: "Flag of Gabon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Gabon" },
    ],
  },

  CF: {
    description:
      "Four horizontal bands — blue, white, green and yellow — crossed by a vertical red band, with a " +
      "gold star in the upper hoist. Its designer, Barthélemy Boganda, combined the blue and white of " +
      "France with the green and yellow of Africa, bound together by the central red band, which he " +
      "called the symbol of the blood shared by all. Adopted in 1958.",
    sources: [
      { title: "Flag of the Central African Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Central_African_Republic" },
    ],
  },

  GN: {
    description:
      "A vertical tricolour of red, yellow and green — the Pan-African colours, aligned with the " +
      "national motto “Work, Justice, Solidarity.” In President Sékou Touré’s explanation the red is " +
      "the blood of martyrs and the labour of the people, the yellow the country’s gold and the sun, " +
      "and the green its vegetation. Adopted in 1958; it is the mirror image of Mali’s flag.",
    sources: [
      { title: "Flag of Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guinea" },
    ],
  },

  TG: {
    description:
      "Five alternating horizontal stripes of green and yellow with a red canton bearing a white " +
      "five-pointed star. In the Pan-African scheme the green stands for agriculture and hope, the " +
      "yellow for mineral wealth, the red for the blood of independence and the white star for peace " +
      "and purity. Designed by the artist Paul Ahyi and adopted in 1960.",
    myths: [
      {
        claim: "The flag’s proportions were laid out using the golden ratio.",
        reality:
          "Unverified — vexillologists disagree on its exact ratio (estimates range from 3:5 to 2:3), " +
          "so the golden-ratio claim is not established fact.",
      },
    ],
    sources: [
      { title: "Flag of Togo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Togo" },
    ],
  },

  BJ: {
    description:
      "A green vertical band at the hoist with two horizontal bands, yellow over red, in the fly — the " +
      "Pan-African colours, echoing Ethiopia. The green represents hope and renewal, the red the " +
      "courage of the ancestors and the yellow the nation’s treasures. Adopted in 1959 and restored " +
      "in 1990 after the Marxist period’s green flag with a red star.",
    sources: [
      { title: "Flag of Benin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Benin" },
    ],
  },

  SL: {
    description:
      "Three horizontal bands of green, white and blue. The green stands for agriculture and the " +
      "country’s mountains and natural resources, the white for unity and justice, and the blue for " +
      "the natural harbour of Freetown and a hope of contributing to world peace. Adopted at " +
      "independence in 1961.",
    sources: [
      { title: "Flag of Sierra Leone — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sierra_Leone" },
    ],
  },

  GM: {
    description:
      "Three horizontal bands of red, blue and green separated by thin white stripes. The blue stands " +
      "for the River Gambia running through the country, the red for the sun and the savannah, the " +
      "green for the forests and farmland, and the white stripes for unity and peace. Designed by " +
      "Louis Thomasi and adopted at independence in 1965; it is deliberately free of any political " +
      "party’s colours.",
    sources: [
      { title: "Flag of The Gambia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Gambia" },
    ],
  },

  NA: {
    description:
      "A white-edged red diagonal band running from the lower hoist to the upper fly, dividing a blue " +
      "triangle (with a twelve-rayed golden sun) from a green triangle. The red stands for the people " +
      "and their determination, the white for peace and unity, the green for vegetation and the blue " +
      "for the sky and the Atlantic; the sun’s twelve rays represent the country’s main ethnic groups. " +
      "Adopted at independence in 1990.",
    sources: [
      { title: "Flag of Namibia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Namibia" },
    ],
  },

  LS: {
    description:
      "A horizontal tricolour of blue, white and green with a black mokorotlo — a Basotho straw hat — " +
      "at the centre. The blue stands for rain and the sky, the white for peace and the green for " +
      "prosperity, and the hat represents the Basotho nation. Adopted in 2006, replacing a " +
      "military-themed flag to emphasise peace.",
    sources: [
      { title: "Flag of Lesotho — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lesotho" },
    ],
  },

  SZ: {
    description:
      "Horizontal bands of blue, yellow and red (the red widest) with a black-and-white Nguni shield, " +
      "two spears and a fighting staff across the centre. The red stands for past battles, the blue " +
      "for peace and stability and the yellow for the country’s resources; the shield’s black and " +
      "white represent people of different colours living in peace. Adopted in 1968, based on a " +
      "military flag of King Sobhuza II from 1941.",
    sources: [
      { title: "Flag of Eswatini — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Eswatini" },
    ],
  },

  MW: {
    description:
      "Horizontal bands of black, red and green with a red rising sun on the black band. The black " +
      "represents the people of Africa, the red the blood of the struggle for freedom and the green " +
      "the land, while the rising sun stands for the dawn of hope and freedom. Adopted in 1964; a " +
      "2010 redesign (a full white sun) was widely rejected and the original was restored in 2012.",
    sources: [
      { title: "Flag of Malawi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malawi" },
    ],
  },

  KM: {
    description:
      "Four horizontal stripes — yellow, white, red and blue — with a green triangle at the hoist " +
      "bearing a white crescent and four white stars. The four stripes and four stars each stand for " +
      "the islands of the archipelago (Grande Comore, Mohéli, Anjouan and Mayotte, the last " +
      "administered by France but claimed by the Comoros); the crescent and green reflect the " +
      "country’s Islamic faith. Adopted in 2001.",
    sources: [
      { title: "Flag of the Comoros — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Comoros" },
    ],
  },

  CD: {
    description:
      "A sky-blue field with a yellow five-pointed star in the upper hoist and a red diagonal band " +
      "edged in yellow. The blue stands for peace, the red for the blood of the country’s martyrs, " +
      "the yellow for its wealth and the star for a bright future. Adopted in 2006, reviving the " +
      "design used just after independence (1966–1971).",
    sources: [
      { title: "Flag of the Democratic Republic of the Congo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Democratic_Republic_of_the_Congo" },
    ],
  },

  CG: {
    description:
      "A diagonal Pan-African design: a green upper triangle and red lower triangle divided by a " +
      "yellow band running from the lower hoist to the upper fly. The green stands for the country’s " +
      "agriculture and forests and the yellow for the friendship and nobility of its people. Adopted " +
      "in 1959, dropped under the Marxist republic, and restored in 1991; it is the only Pan-African " +
      "flag with a diagonal layout.",
    sources: [
      { title: "Flag of the Republic of the Congo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_the_Congo" },
    ],
  },

  DJ: {
    description:
      "A horizontal bicolour of light blue over light green with a white triangle at the hoist bearing " +
      "a red star. The blue stands for the sky and sea and for the Issa (Somali) people, the green for " +
      "the earth and for the Afar people, the white for peace, and the red star for unity and the " +
      "sacrifices of independence. Adopted at independence in 1977.",
    sources: [
      { title: "Flag of Djibouti — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Djibouti" },
    ],
  },

  BI: {
    description:
      "A white saltire dividing the field into red panels (top and bottom) and green panels (sides), " +
      "with a white disc at the centre bearing three red, green-outlined six-pointed stars. The white " +
      "stands for peace, the green for hope and development and the red for the struggle for freedom; " +
      "the three stars stand for the motto “Unity, Work, Progress” and for the country’s three " +
      "peoples — the Hutu, the Twa and the Tutsi. Adopted in 1967.",
    sources: [
      { title: "Flag of Burundi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Burundi" },
    ],
  },

  CV: {
    description:
      "A blue field with a horizontal band of white-red-white below the centre and a ring of ten " +
      "yellow stars near the hoist. The blue stands for the sky and sea, the white and red for the " +
      "people’s desire for peace and their nation-building effort, and the ten stars — arranged in a " +
      "circle for unity — for the ten islands of the archipelago. Adopted in 1992, replacing the " +
      "earlier flag that resembled Guinea-Bissau’s.",
    sources: [
      { title: "Flag of Cape Verde — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cape_Verde" },
    ],
  },

  GQ: {
    description:
      "A horizontal tricolour of green, white and red with a blue triangle at the hoist and the coat " +
      "of arms (a silk-cotton tree and six stars) on the white band. The green stands for natural " +
      "resources and agriculture, the blue for the sea linking the mainland and the islands, the " +
      "white for peace and the red for the fighters for independence. Dating from independence in " +
      "1968 and restored in 1979.",
    sources: [
      { title: "Flag of Equatorial Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Equatorial_Guinea" },
    ],
  },

  ST: {
    description:
      "A horizontal green-yellow-green triband with a red triangle at the hoist and two black stars on " +
      "the yellow band. The green, yellow and red are the Pan-African colours of the independence " +
      "movement; the triangle stands for equality and the two black stars for the country’s two " +
      "islands, São Tomé and Príncipe. Adopted at independence in 1975.",
    sources: [
      { title: "Flag of São Tomé and Príncipe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe" },
    ],
  },

  GW: {
    description:
      "A red vertical band at the hoist bearing a black star, with horizontal yellow and green bands " +
      "in the fly — the Pan-African colours popularised by Ghana and Ethiopia. The black star stands " +
      "for African unity, the yellow for the savannas, the green for the forests and the red for the " +
      "blood of the independence struggle. Based on the flag of the PAIGC and adopted in 1973.",
    sources: [
      { title: "Flag of Guinea-Bissau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guinea-Bissau" },
    ],
  },

  SC: {
    description:
      "Five oblique bands — blue, yellow, red, white and green — radiating from the lower hoist " +
      "corner. The blue stands for the sky and sea, the yellow for the sun, the red for the people " +
      "and their unity, the white for social justice and harmony, and the green for the land. Adopted " +
      "in 1996; the colours combine those of the country’s two main political parties.",
    sources: [
      { title: "Flag of Seychelles — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Seychelles" },
    ],
  },

  MU: {
    description:
      "Four equal horizontal bands of red, blue, yellow and green. The red stands for the struggle for " +
      "freedom, the blue for the Indian Ocean around the island, the yellow for the light of " +
      "independence and the green for the island’s year-round vegetation. Adopted at independence in " +
      "1968; the four colours were also chosen to represent the country’s main communities and " +
      "parties, to help unite the nation.",
    sources: [
      { title: "Flag of Mauritius — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mauritius" },
    ],
  },

  NP: {
    description:
      "The world’s only non-rectangular national flag: two stacked crimson pennants with a blue " +
      "border, the upper bearing a white crescent moon and the lower a white twelve-rayed sun. The " +
      "crimson is the colour of bravery and of the national flower, and the blue stands for peace; " +
      "the moon and sun express the hope that Nepal will endure as long as they do, and are also " +
      "linked to the country’s Hindu and Buddhist traditions. Standardised in 1962, when the faces " +
      "were removed from the sun and moon.",
    sources: [
      { title: "Flag of Nepal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nepal" },
    ],
  },

  LK: {
    description:
      "A golden lion holding a kastane sword on a dark red field, with a gold bo (bodhi) leaf in each " +
      "corner and two vertical stripes — orange and green — at the hoist, all within a gold border. " +
      "The lion stands for the Sinhalese people and courage; the four bo leaves for Buddhism and the " +
      "virtues of loving-kindness, compassion, sympathetic joy and equanimity; the orange stripe for " +
      "the Tamils and the green for the Muslim Moors. Adopted in 1948, with the bo leaves added in 1972.",
    sources: [
      { title: "Flag of Sri Lanka — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sri_Lanka" },
    ],
  },

  BD: {
    description:
      "A dark green field with a red disc set slightly toward the hoist, so that it appears centred " +
      "when the flag is flying. The green stands for the land and its vitality, and the red disc for " +
      "the sun rising over Bengal and the blood shed in the 1971 Liberation War. Adopted in 1972; the " +
      "wartime version had also shown a yellow map of the country inside the disc, which was then " +
      "removed.",
    sources: [
      { title: "Flag of Bangladesh — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bangladesh" },
    ],
  },

  KH: {
    description:
      "Blue and red horizontal bands (the red double width) with a white image of Angkor Wat, outlined " +
      "in black, at the centre. The blue stands for royalty, the red for the nation and the white " +
      "temple for religion and the country’s heritage. Cambodia is one of the very few nations whose " +
      "flag depicts a building. First adopted in 1948 and restored in 1993 with the monarchy.",
    sources: [
      { title: "Flag of Cambodia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cambodia" },
    ],
  },

  MY: {
    description:
      "Fourteen alternating red and white stripes with a blue canton bearing a yellow crescent and a " +
      "fourteen-pointed star. The fourteen stripes and fourteen points stand for the thirteen states " +
      "and the federal government; the crescent is Islam, the yellow the sovereignty of the Malay " +
      "rulers, the blue the unity of the people, the red bravery and the white purity. Adopted in 1963.",
    sources: [
      { title: "Flag of Malaysia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malaysia" },
    ],
  },

  SG: {
    description:
      "A horizontal bicolour of red over white with a white crescent and a ring of five white stars in " +
      "the upper hoist. The red stands for universal brotherhood and equality and the white for " +
      "purity and virtue; the crescent represents a young nation on the rise, and the five stars the " +
      "ideals of democracy, peace, progress, justice and equality. Adopted in 1959.",
    myths: [
      {
        claim: "The crescent and stars make it an Islamic flag.",
        reality:
          "The design is deliberately multicultural: the crescent answered the wish of the " +
          "Malay-Muslim community and the stars that of the Chinese majority, so the symbol is " +
          "intentionally inclusive rather than tied to one group.",
      },
    ],
    sources: [
      { title: "Flag of Singapore — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Singapore" },
    ],
  },

  MN: {
    description:
      "A vertical triband of red, blue and red with the golden Soyombo symbol on the hoist band. The " +
      "blue stands for the eternal blue sky and the red for progress and prosperity; the Soyombo is a " +
      "composite emblem of fire, sun, moon, earth, water and a yin-yang of two fish. Adopted in 1992, " +
      "when the communist star above the Soyombo was removed.",
    sources: [
      { title: "Flag of Mongolia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" },
    ],
  },

  MM: {
    description:
      "A horizontal tricolour of yellow, green and red with a large white five-pointed star in the " +
      "centre. The yellow stands for unity and wisdom, the green for peace and fertility and the red " +
      "for courage and decisiveness, while the white star represents the union of the country. Adopted " +
      "in 2010, echoing earlier nationalist tricolours.",
    sources: [
      { title: "Flag of Myanmar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Myanmar" },
    ],
  },

  JO: {
    description:
      "Horizontal black, white and green bands joined by a red chevron at the hoist bearing a white " +
      "seven-pointed star, based on the flag of the 1916 Arab Revolt. The black, white and green " +
      "recall the Abbasid, Umayyad and Fatimid/Rashidun caliphates; the red chevron stands for the " +
      "Hashemite dynasty and Arab freedom; and the star’s seven points for the seven verses of the " +
      "opening chapter of the Qur’an. Adopted in 1928.",
    sources: [
      { title: "Flag of Jordan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jordan" },
    ],
  },

  LB: {
    description:
      "A horizontal red-white-red triband (the white band double height) with a green cedar tree in " +
      "the centre touching both red stripes. The red stands for the blood shed for independence, the " +
      "white for peace and the snow of the mountains, and the cedar for immortality, resilience and " +
      "holiness. Adopted in 1943.",
    sources: [
      { title: "Flag of Lebanon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lebanon" },
    ],
  },

  AE: {
    description:
      "A red vertical band at the hoist with three horizontal bands of green, white and black — the " +
      "Pan-Arab colours. The red stands for sacrifice and energy, the green for growth and " +
      "prosperity, the white for peace and the black for dignity and strength. Designed by Abdullah " +
      "Al Maainah and adopted at the federation’s formation in 1971.",
    sources: [
      { title: "Flag of the United Arab Emirates — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates" },
    ],
  },

  QA: {
    description:
      "A maroon field with a white serrated band of nine points at the hoist; it is the only national " +
      "flag more than twice as wide as it is tall. The white stands for peace (from the 19th-century " +
      "treaties) and the nine points for Qatar as the ninth of the “reconciled emirates” under the " +
      "1916 treaty with Britain. Adopted in 1971.",
    myths: [
      {
        claim: "The maroon is simply red dye that faded to purple in the desert sun.",
        reality:
          "Qatar deliberately kept the deep maroon: while a faded-dye story is often told, the colour " +
          "was retained to reflect the region’s historic purple-dye heritage.",
      },
    ],
    sources: [
      { title: "Flag of Qatar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Qatar" },
    ],
  },

  BH: {
    description:
      "A white band at the hoist separated from a red field by five white triangles forming a " +
      "serrated line. The red is the traditional colour of the Gulf states and the white recalls the " +
      "19th-century peace treaties; the five points stand for the five pillars of Islam. The " +
      "five-point design was adopted in 2002 (reduced from an earlier eight).",
    sources: [
      { title: "Flag of Bahrain — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bahrain" },
    ],
  },

  OM: {
    description:
      "White and green horizontal bands with a red band running along the hoist and across the top " +
      "(forming a “T”), and the national emblem — a khanjar dagger over two crossed swords — in the " +
      "upper hoist. The white stands for peace and the Imams, the green for the fertile Jabal Akhdar " +
      "mountains and the red for the battles against foreign invaders. Adopted in 1970.",
    sources: [
      { title: "Flag of Oman — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oman" },
    ],
  },

  IQ: {
    description:
      "A horizontal red-white-black tricolour — the Pan-Arab colours of al-Hilli’s verse — with the " +
      "Takbir (“God is greatest”) in green Kufic script across the white band. Adopted in 2008, when " +
      "the three green stars of the earlier flag were removed.",
    myths: [
      {
        claim: "The 2008 flag broke completely with Saddam Hussein–era symbolism.",
        reality:
          "The Takbir it keeps was itself added under Saddam in 1991; the 2008 change removed the " +
          "three stars but retained that inscription.",
      },
    ],
    sources: [
      { title: "Flag of Iraq — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iraq" },
    ],
  },

  YE: {
    description:
      "A horizontal red-white-black tricolour — the Arab Liberation colours. The red stands for unity " +
      "and the blood of martyrs, the white for a bright future and the black for the dark past. " +
      "Adopted in 1990 at the unification of North and South Yemen, dropping the distinct emblems the " +
      "two states had used.",
    sources: [
      { title: "Flag of Yemen — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Yemen" },
    ],
  },

  KZ: {
    description:
      "A turquoise field with a golden sun above a soaring golden steppe eagle, and a vertical golden " +
      "“koshkar-muiz” (ram’s-horns) ornament along the hoist. The blue stands for unity and the wide " +
      "sky, the sun and its rays for prosperity and life, the eagle for freedom and the nation’s " +
      "aspirations, and the ornament for the art and culture of the Kazakh people. Adopted in 1992.",
    sources: [
      { title: "Flag of Kazakhstan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kazakhstan" },
    ],
  },

  UZ: {
    description:
      "Horizontal bands of azure, white and green separated by thin red stripes, with a white crescent " +
      "and small white stars in the upper hoist. The azure is commonly linked to the sky and to " +
      "Turkic heritage, the white to peace, the green to nature and the red stripes to the life-force; " +
      "the crescent marks the new republic. Adopted in 1991. The government has not fixed a single " +
      "official meaning for the elements.",
    sources: [
      { title: "Flag of Uzbekistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uzbekistan" },
    ],
  },

  KG: {
    description:
      "A red field with a yellow sun of forty rays, and at its centre a red tündük — the crown of a " +
      "yurt seen from below. The forty rays stand for the forty clans united in legend by the hero " +
      "Manas, and the tündük for the family home and the unity of the people. Adopted in 1992; in " +
      "2023 the sun’s wavy rays were straightened.",
    sources: [
      { title: "Flag of Kyrgyzstan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kyrgyzstan" },
    ],
  },

  AZ: {
    description:
      "A horizontal tricolour of blue, red and green with a white crescent and eight-pointed star on " +
      "the red band. The blue stands for the country’s Turkic heritage, the red for progress and the " +
      "building of a modern state, and the green for Islam; the crescent and star are Islamic symbols. " +
      "First adopted in 1918 and restored in 1991.",
    sources: [
      { title: "Flag of Azerbaijan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Azerbaijan" },
    ],
  },

  GE: {
    description:
      "The Five Cross Flag: a white field with a large central red cross reaching all four edges and a " +
      "small red Bolnisi cross in each quarter. The crosses reflect Georgia’s Christian heritage and " +
      "are variously read as the Five Holy Wounds or as Christ and the Four Evangelists. A medieval " +
      "banner of the Kingdom of Georgia, it was readopted as the national flag in 2004.",
    sources: [
      { title: "Flag of Georgia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Georgia_(country)" },
    ],
  },

  AM: {
    description:
      "A horizontal tricolour of red, blue and orange. By the 2006 law the red stands for the Armenian " +
      "Highland and the people’s struggle for survival, the blue for the peaceful sky, and the orange " +
      "for the creative talent and hard work of the Armenian people. First adopted in 1918 and " +
      "restored in 1990.",
    myths: [
      {
        claim: "The three colours were given these meanings by the flag’s designer.",
        reality:
          "Its designer offered no official symbolism; the meanings were interpreted later (and " +
          "codified in 2006). A popular rainbow/Mount Ararat reading is likewise a later gloss.",
      },
    ],
    sources: [
      { title: "Flag of Armenia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Armenia" },
    ],
  },

  TM: {
    description:
      "A green field with a red-carpet vertical stripe near the hoist bearing five carpet guls above " +
      "two crossed olive branches, and a white crescent with five stars alongside. The five guls " +
      "stand for the five major Turkmen tribes and the five stars for the five provinces; the crescent " +
      "and green field evoke the clear sky, Islam and prosperity, and the olive branches Turkmenistan’s " +
      "neutrality. One of the most intricate national flags; adopted in 1992, with the current form " +
      "from 2001.",
    sources: [
      { title: "Flag of Turkmenistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Turkmenistan" },
    ],
  },

  TJ: {
    description:
      "A horizontal red, white and green tricolour (the white band widest) with a gold crown beneath " +
      "an arc of seven stars at the centre. The red stands for unity and sacrifice, the white for " +
      "purity and the country’s cotton, and the green for nature and Islam; the crown recalls the " +
      "Samanid dynasty (and the word tâj, “crown”) and the seven stars stand for perfection and " +
      "happiness. Adopted in 1992.",
    sources: [
      { title: "Flag of Tajikistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tajikistan" },
    ],
  },

  BT: {
    description:
      "A flag divided diagonally from the lower hoist to the upper fly — yellow above, orange below — " +
      "with a white Druk (thunder dragon) holding jewels along the divide. The yellow stands for the " +
      "king and secular authority, the orange for Buddhism, and the white dragon for the country " +
      "itself (Druk Yul, the “Land of the Thunder Dragon”) and purity; the jewels represent wealth. " +
      "The current design dates from 1969.",
    sources: [
      { title: "Flag of Bhutan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bhutan" },
    ],
  },

  MV: {
    description:
      "A red field with a green rectangle bearing a white crescent. The red stands for the blood and " +
      "sacrifice of the nation’s heroes, the green for peace and prosperity, and the crescent for " +
      "Islam, the state religion. Adopted at independence in 1965.",
    sources: [
      { title: "Flag of the Maldives — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Maldives" },
    ],
  },

  BN: {
    description:
      "A yellow field crossed by black and white diagonal stripes with the red national crest at the " +
      "centre. The yellow stands for the Sultan, the white and black stripes for his two chief " +
      "ministers, and the crest — whose upraised hands signify unity — for the protection of the " +
      "state. Adopted in 1959.",
    sources: [
      { title: "Flag of Brunei — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brunei" },
    ],
  },

  TL: {
    description:
      "A red field with a black triangle at the hoist bearing a white five-pointed star, over a larger " +
      "yellow triangle. In the constitution the black stands for the obscurantism to be overcome, the " +
      "yellow for the country’s wealth, the red for the struggle for liberation and the white star — " +
      "“the light that guides” — for peace. Adopted at the restoration of independence in 2002.",
    sources: [
      { title: "Flag of East Timor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_East_Timor" },
    ],
  },

  KP: {
    description:
      "A broad central red band edged with thin white stripes between blue bands top and bottom, with " +
      "a red five-pointed star in a white disc near the hoist. In the official reading the red stands " +
      "for revolutionary spirit, the white for purity and the blue for sovereignty and peace, while " +
      "the red star stands for socialism. Adopted in 1948.",
    sources: [
      { title: "Flag of North Korea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Korea" },
    ],
  },

  AF: {
    description:
      "A white field bearing the Shahada — the Islamic declaration of faith — in black. The white is " +
      "said to stand for the purity of faith and government and the black text for the creed itself. " +
      "This flag of the Islamic Emirate was adopted in 2021; the former Islamic Republic’s " +
      "black-red-green tricolour is still used internationally and by the opposition, so the flag’s " +
      "status is disputed.",
    sources: [
      { title: "Flag of Afghanistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Afghanistan" },
    ],
  },

  SY: {
    description:
      "A horizontal tricolour of green, white and black with three red stars on the white band. The " +
      "green, white and black recall the Rashidun, Umayyad and Abbasid periods, and the three stars " +
      "were originally taken to stand for regions of the country. This is Syria’s 1930s independence " +
      "flag, revived during the civil war and restored as the national flag in 2025 after the fall of " +
      "the Assad government.",
    sources: [
      { title: "Flag of Syria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Syria" },
    ],
  },

  VE: {
    description:
      "A horizontal tricolour of yellow, blue and red with an arc of eight white stars on the blue " +
      "band. The yellow stands for the wealth of the land, the blue for the Caribbean Sea separating " +
      "Venezuela from Spain, and the red for the blood of independence. The eight stars stand for the " +
      "seven provinces that signed the 1811 declaration plus Guayana, added by Bolívar’s decree of " +
      "1817. The tricolour is Francisco de Miranda’s.",
    sources: [
      { title: "Flag of Venezuela — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Venezuela" },
    ],
  },

  EC: {
    description:
      "A horizontal tricolour of yellow (double height), blue and red — the colours of Gran Colombia, " +
      "from Miranda’s flag — with the coat of arms at the centre showing Mount Chimborazo, the Guayas " +
      "river with a steamship and a condor. The yellow stands for the country’s riches, the blue for " +
      "the sky, sea and rivers, and the red for the blood of its heroes. Adopted in 1860.",
    sources: [
      { title: "Flag of Ecuador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ecuador" },
    ],
  },

  BO: {
    description:
      "A horizontal tricolour of red, yellow and green, with the coat of arms on the state flag. The " +
      "red stands for the blood shed by the country’s heroes, the yellow for its mineral wealth and " +
      "the green for fertility and hope. Adopted in 1851. Since 2009 the indigenous Wiphala — a square " +
      "rainbow-chequered banner of the Andean peoples — is a co-official national flag flown beside it.",
    sources: [
      { title: "Flag of Bolivia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bolivia" },
    ],
  },

  UY: {
    description:
      "Nine alternating white and blue horizontal stripes with a golden Sun of May in the upper hoist " +
      "canton. The nine stripes stand for the nine original departments of Uruguay and the sun for " +
      "the May Revolution of 1810. Adopted in 1830; an earlier version had nineteen stripes, reduced " +
      "to nine for clarity at a distance.",
    sources: [
      { title: "Flag of Uruguay — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uruguay" },
    ],
  },

  PY: {
    description:
      "A horizontal red-white-blue triband whose colours were inspired by the French tricolour and " +
      "the ideals of liberty. It is the only national flag in the world with a different emblem on " +
      "each side: the national coat of arms on the front and the treasury seal on the back. Adopted " +
      "in 1842.",
    sources: [
      { title: "Flag of Paraguay — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Paraguay" },
    ],
  },

  GY: {
    description:
      "The Golden Arrowhead: a green field with a long gold triangle (edged white) and a shorter red " +
      "triangle (edged black) pointing toward the fly. The green stands for agriculture and forests, " +
      "the gold for mineral wealth, the red for zeal and nation-building, the black for endurance and " +
      "the white for the country’s rivers. Designed by the vexillologist Whitney Smith and adopted at " +
      "independence in 1966.",
    sources: [
      { title: "Flag of Guyana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guyana" },
    ],
  },

  SR: {
    description:
      "Horizontal bands of green, white, red, white and green (the red the widest) with a gold star " +
      "at the centre. The green stands for the fertility of the land, the white for freedom and " +
      "justice and the red for progress; the gold star stands for unity and a golden future. Adopted " +
      "at independence in 1975.",
    sources: [
      { title: "Flag of Suriname — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Suriname" },
    ],
  },

  PA: {
    description:
      "A flag quartered into a white canton with a blue star, a red upper-fly, a blue lower-hoist and " +
      "a white lower-fly with a red star. The blue and red were meant to represent the country’s two " +
      "historic political parties and the white the peace between them; the blue star stands for " +
      "honesty and purity and the red star for authority and law. Designed by María de la Ossa de " +
      "Amador in 1903.",
    sources: [
      { title: "Flag of Panama — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Panama" },
    ],
  },

  GT: {
    description:
      "Sky-blue and white vertical bands (blue at the sides) with the coat of arms at the centre: a " +
      "resplendent quetzal, a scroll dated 15 September 1821, crossed rifles and swords and a laurel " +
      "wreath. The blue stands for justice and loyalty (and the two oceans) and the white for purity " +
      "and peace; the quetzal is liberty, the scroll independence, the rifles defence, the swords " +
      "honour and the laurel victory. The blue and white come from the Federal Republic of Central " +
      "America. Adopted in 1871.",
    sources: [
      { title: "Flag of Guatemala — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guatemala" },
    ],
  },

  BZ: {
    description:
      "A blue field with a red band top and bottom and a white disc bearing the coat of arms, in which " +
      "two woodcutters — one of Mestizo and one of African descent — flank a mahogany tree with " +
      "logging tools, above the motto Sub Umbra Floreo (“In the shade I flourish”). It is the only " +
      "national flag with people as a central element. The blue honours one main party and the red " +
      "borders the other. Adopted at independence in 1981.",
    sources: [
      { title: "Flag of Belize — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belize" },
    ],
  },

  HN: {
    description:
      "A horizontal blue-white-blue triband with five blue stars arranged in an X on the white band. " +
      "The blue stands for the Pacific and the Caribbean and the sky, and the white for the land and " +
      "peace; the five stars represent the five states of the former Federal Republic of Central " +
      "America and the hope that they might one day reunite. Adopted in 1866.",
    sources: [
      { title: "Flag of Honduras — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Honduras" },
    ],
  },

  NI: {
    description:
      "A horizontal blue-white-blue triband with the coat of arms at the centre: a triangle enclosing " +
      "five volcanoes, a rising sun, a cap of liberty and a rainbow. The blue stands for the two " +
      "oceans and the sky and the white for peace; the five volcanoes represent the five Central " +
      "American states. Adopted in 1908, it is one of the few national flags to include the colour " +
      "purple (in the rainbow).",
    sources: [
      { title: "Flag of Nicaragua — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nicaragua" },
    ],
  },

  SV: {
    description:
      "A horizontal blue-white-blue triband with the national coat of arms in the centre. The blue " +
      "stands for the sky and the oceans on either side of Central America and the white for peace. " +
      "Its design descends from the flag of the Federal Republic of Central America; adopted in 1912.",
    sources: [
      { title: "Flag of El Salvador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_El_Salvador" },
    ],
  },

  CR: {
    description:
      "Five horizontal stripes — blue, white, red, white, blue, with the red band double width — and " +
      "the coat of arms on the state flag. The colours echo the ideals of the French Revolution: the " +
      "blue for the sky and opportunity, the white for peace and wisdom, and the red for the warmth " +
      "and blood of the people. The red stripe was added in 1848 at the suggestion of Pacífica " +
      "Fernández.",
    sources: [
      { title: "Flag of Costa Rica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Costa_Rica" },
    ],
  },

  HT: {
    description:
      "Two horizontal bands, blue over red, with the coat of arms on a white panel (on the state " +
      "flag). The blue and red stand for the union of Haiti’s Black and mixed-race citizens; the arms " +
      "show a royal palm crowned with a cap of liberty over weapons, beneath the motto L’Union fait " +
      "la Force (“Unity makes strength”). First adopted in 1806 and restored in 1986.",
    myths: [
      {
        claim:
          "Dessalines made the flag in 1803 by tearing the white out of the French tricolour, which " +
          "Catherine Flon then sewed together.",
        reality:
          "A cherished national story; the design in fact evolved over time, and the coat of arms was " +
          "not added until 1937 (partly to distinguish it from Liechtenstein’s similar blue-red flag).",
      },
    ],
    sources: [
      { title: "Flag of Haiti — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Haiti" },
    ],
  },

  DO: {
    description:
      "A white cross that divides the flag into four rectangles — blue and red above, red and blue " +
      "below — with the coat of arms at the centre. The blue stands for liberty, the white cross for " +
      "salvation and the red for the blood of the heroes. The arms uniquely include an open Bible, " +
      "making it the only national flag to depict one. First hoisted in 1844.",
    sources: [
      { title: "Flag of the Dominican Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Dominican_Republic" },
    ],
  },

  JM: {
    description:
      "A gold saltire dividing the flag into two green triangles (top and bottom) and two black " +
      "triangles (at the hoist and fly). The black stands for the strength and creativity of the " +
      "people, the gold for sunshine and natural wealth and the green for the land and hope. Since " +
      "Mauritania changed its flag in 2017, Jamaica’s has been the only national flag with no red, " +
      "white or blue. Adopted in 1962.",
    sources: [
      { title: "Flag of Jamaica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jamaica" },
    ],
  },

  TT: {
    description:
      "A red field with a white-edged black diagonal band running from the upper hoist to the lower " +
      "fly. The red stands for the warmth and energy of the people and the sun, the black for their " +
      "strength and dedication and the wealth of the land, and the white for the sea, purity and " +
      "equality. Adopted at independence in 1962.",
    sources: [
      { title: "Flag of Trinidad and Tobago — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Trinidad_and_Tobago" },
    ],
  },

  BS: {
    description:
      "Aquamarine and gold horizontal bands with a black triangle at the hoist. The aquamarine stands " +
      "for the surrounding sea, the gold for the sun and the land, and the black triangle for the " +
      "vigour, unity and enterprise of the Bahamian people. Adopted at independence in 1973.",
    sources: [
      { title: "Flag of the Bahamas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Bahamas" },
    ],
  },

  BB: {
    description:
      "A vertical triband of blue, gold and blue with a black broken trident head on the gold band. " +
      "The blue stands for the sea and sky and the gold for the sand; the trident is that of the " +
      "colonial-era emblem, and breaking off its shaft symbolises Barbados’s break from colonial " +
      "rule. Adopted at independence in 1966.",
    sources: [
      { title: "Flag of Barbados — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Barbados" },
    ],
  },

  GD: {
    description:
      "A red border with six yellow stars, green and yellow triangles meeting at the centre, a " +
      "seventh star on a red disc, and a nutmeg at the hoist. The seven stars stand for the country’s " +
      "seven parishes and the nutmeg for its famous spice crop; the green is for vegetation, the " +
      "yellow for sunshine and wisdom and the red for courage and unity. Adopted in 1974.",
    sources: [
      { title: "Flag of Grenada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Grenada" },
    ],
  },

  LC: {
    description:
      "A cerulean-blue field with a gold triangle set in front of a white-edged black triangle. The " +
      "blue stands for the sky and the sea and the triangles for the Pitons, Saint Lucia’s twin " +
      "volcanic peaks; the gold is for sunshine and prosperity and the black and white for the " +
      "harmony of the island’s peoples. Adopted in 1967.",
    sources: [
      { title: "Flag of Saint Lucia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Lucia" },
    ],
  },

  VC: {
    description:
      "Three vertical bands of blue, gold (the widest) and green, with three green diamonds arranged " +
      "in a V on the gold. The diamonds stand for the islands as the “Gems of the Antilles” and their " +
      "V for Saint Vincent; the blue is the sky and sea, the gold the warmth and the sand, and the " +
      "green the vegetation. Adopted in 1985.",
    sources: [
      { title: "Flag of Saint Vincent and the Grenadines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Vincent_and_the_Grenadines" },
    ],
  },

  DM: {
    description:
      "A green field with a cross of yellow, black and white stripes and a central red disc bearing a " +
      "Sisserou parrot ringed by ten green stars. The green is the island’s vegetation and the cross " +
      "the Christian faith, its three colours standing for the indigenous people, the fertile soil " +
      "and the pure water; the ten stars are the ten parishes and the parrot is the national bird. " +
      "Adopted in 1978, it is one of the few national flags to contain purple.",
    sources: [
      { title: "Flag of Dominica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Dominica" },
    ],
  },

  AG: {
    description:
      "A red field with an inverted V of black, blue and white bands and a golden rising sun on the " +
      "black. The rising sun stands for the dawn of a new era; the black for African heritage, the " +
      "blue for hope and the Caribbean Sea and the red for the energy of the people; the yellow, blue " +
      "and white together stand for the sun, sea and sand, and the V for victory. Adopted in 1967.",
    sources: [
      { title: "Flag of Antigua and Barbuda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Antigua_and_Barbuda" },
    ],
  },

  KN: {
    description:
      "A green upper triangle and red lower triangle divided by a yellow-edged black diagonal band " +
      "bearing two white stars. The green stands for the fertile land, the red for the fight against " +
      "slavery and colonialism, the black for African heritage and the yellow for year-round " +
      "sunshine; the two stars stand for hope and liberty and for the two islands. Adopted at " +
      "independence in 1983.",
    sources: [
      { title: "Flag of Saint Kitts and Nevis — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Kitts_and_Nevis" },
    ],
  },

  NZ: {
    description:
      "A blue ensign with the Union Jack in the canton and the four red, white-edged stars of the " +
      "Southern Cross in the fly. The blue evokes the sea and sky, the Southern Cross New Zealand’s " +
      "place in the South Pacific, and the Union Jack its historical ties to Britain. Given statutory " +
      "status in 1902; referendums in 2015–2016 considered a silver-fern design but voters chose to " +
      "keep this flag.",
    sources: [
      { title: "Flag of New Zealand — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Zealand" },
    ],
  },

  FJ: {
    description:
      "A light-blue ensign with the Union Jack in the canton and the shield of Fiji’s coat of arms in " +
      "the fly. The light blue stands for the Pacific Ocean, so central to island life; the shield " +
      "shows a British lion with a cocoa pod above panels of sugar cane, a coconut palm, a dove of " +
      "peace and bananas. Adopted in 1970 and kept after Fiji became a republic; a proposed redesign " +
      "was abandoned in 2016.",
    sources: [
      { title: "Flag of Fiji — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Fiji" },
    ],
  },

  PG: {
    description:
      "A flag split diagonally: a red upper triangle with a golden Raggiana bird-of-paradise in flight " +
      "and a black lower triangle with the five white stars of the Southern Cross. Red, black and " +
      "gold are traditional colours of Papua New Guinea; the bird stands for the country’s tribal " +
      "culture and emergence into nationhood and the constellation for its place in the southern " +
      "hemisphere. Designed by the schoolgirl Susan Karike and adopted in 1971.",
    sources: [
      { title: "Flag of Papua New Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Papua_New_Guinea" },
    ],
  },

  WS: {
    description:
      "A red field with a blue canton bearing the five white stars of the Southern Cross. The red is " +
      "commonly read as courage, the white as purity and the blue as freedom, while the Southern " +
      "Cross marks Samoa’s place in the South Pacific. The design dates from 1948–49 and was kept at " +
      "independence in 1962.",
    sources: [
      { title: "Flag of Samoa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Samoa" },
    ],
  },

  TO: {
    description:
      "A red field with a white canton bearing a red couped cross. The cross and the red stand for " +
      "Christianity and the blood of Christ shed at the crucifixion, and the white for purity. Adopted " +
      "in 1875 and protected by the constitution so that it can never be changed; the red field was " +
      "added because an earlier white flag with a red cross was too like the Red Cross emblem.",
    sources: [
      { title: "Flag of Tonga — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tonga" },
    ],
  },

  VU: {
    description:
      "Red and green horizontal bands with a black, gold-edged Y-shape (pall) at the hoist, on which a " +
      "gold boar’s tusk encloses two crossed namele fern fronds. The red stands for the blood that " +
      "unites people, the green for the richness of the islands and the black for the Melanesian " +
      "ni-Vanuatu people; the Y traces the layout of the islands, the boar’s tusk stands for " +
      "prosperity and tradition and the fern fronds for peace. Adopted at independence in 1980.",
    sources: [
      { title: "Flag of Vanuatu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vanuatu" },
    ],
  },

  SB: {
    description:
      "A yellow diagonal stripe dividing a blue upper triangle from a green lower triangle, with five " +
      "white stars in the blue. The blue stands for the water — rivers, rain and the ocean — the " +
      "green for the land and the yellow for the sun; the five stars stood for the five original " +
      "provinces. Adopted in 1977; the number of stars has been kept even as more provinces were added.",
    sources: [
      { title: "Flag of the Solomon Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Solomon_Islands" },
    ],
  },

  KI: {
    description:
      "A red upper half with a gold frigatebird flying over a rising sun, and a blue lower half with " +
      "three white wavy stripes. The frigatebird stands for power, freedom and the command of the sea, " +
      "the rising sun for Kiribati’s position on the Equator (its seventeen rays for the sixteen " +
      "Gilbert Islands plus Banaba), and the three waves for the three island groups. Adopted in 1979.",
    sources: [
      { title: "Flag of Kiribati — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kiribati" },
    ],
  },

  TV: {
    description:
      "A light-blue ensign with the Union Jack in the canton and nine yellow stars laid out like the " +
      "map of the country’s nine islands. The blue stands for the Pacific Ocean. Adopted in 1978; a " +
      "1996 redesign that reduced the flag to eight stars was reversed after public protest, restoring " +
      "the nine stars in 1997.",
    sources: [
      { title: "Flag of Tuvalu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tuvalu" },
    ],
  },

  NR: {
    description:
      "A blue field with a narrow gold stripe across the centre and a white twelve-pointed star just " +
      "below it near the hoist. The blue is the Pacific Ocean, the gold stripe the Equator and the " +
      "star Nauru itself, lying just south of the line; the star’s twelve points stand for the " +
      "island’s twelve original tribes. Adopted at independence in 1968.",
    sources: [
      { title: "Flag of Nauru — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nauru" },
    ],
  },

  MH: {
    description:
      "A blue field crossed by orange and white stripes that widen from the lower hoist to the upper " +
      "fly, with a white 24-pointed star in the canton. The blue is the ocean and the rising stripes " +
      "the Equator; the white stands for the Ratak (sunrise) chain and peace and the orange for the " +
      "Ralik (sunset) chain and courage. The star’s 24 points are the electoral districts, its four " +
      "longer rays the main cultural centres — the most points on any national flag’s star. Adopted " +
      "in 1979.",
    sources: [
      { title: "Flag of the Marshall Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Marshall_Islands" },
    ],
  },

  FM: {
    description:
      "A light-blue field with four white five-pointed stars in a diamond. The blue stands for the " +
      "Pacific Ocean and the four stars for the federation’s four states — Yap, Chuuk, Pohnpei and " +
      "Kosrae. Adopted in 1978, developed from the earlier Trust Territory flag.",
    sources: [
      { title: "Flag of the Federated States of Micronesia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Federated_States_of_Micronesia" },
    ],
  },

  PW: {
    description:
      "A light-blue field with a golden-yellow disc set slightly toward the hoist. The blue stands for " +
      "the ocean and the move to self-government, and the disc for the full moon, regarded in Palauan " +
      "culture as the best time for fishing, harvesting and celebration; it is placed off-centre so it " +
      "looks centred when the flag flies. Adopted in 1981.",
    myths: [
      {
        claim: "The disc is a tribute to Japan’s Rising Sun flag.",
        reality:
          "The designer denied any link: the disc is the moon, not the sun, and its off-centre " +
          "placement and lunar meaning set it apart from the Japanese design.",
      },
    ],
    sources: [
      { title: "Flag of Palau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Palau" },
    ],
  },

  VA: {
    description:
      "Two vertical bands of yellow and white, the white charged with the crossed gold and silver keys " +
      "of Saint Peter beneath the papal tiara. The yellow and white are the papal colours; the keys " +
      "are the keys of heaven given to Saint Peter and the tiara the authority of the papacy. Adopted " +
      "in 1929 with the founding of Vatican City, modelled on the earlier Papal States flag.",
    myths: [
      {
        claim: "The papal tiara on the flag is lined in red.",
        reality:
          "The lining is white; a red-lined version circulated widely online for years but is an " +
          "error, not the official flag.",
      },
    ],
    sources: [
      { title: "Flag of Vatican City — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vatican_City" },
    ],
  },

  PS: {
    description:
      "A horizontal black-white-green tricolour with a red triangle at the hoist — the Pan-Arab " +
      "colours of the 1916 Arab Revolt flag. The black, white and green recall the Abbasid, Umayyad " +
      "and Fatimid periods and the red the Hashemites and Arab unity. Adopted as the flag of the " +
      "Palestinian people by the PLO in 1964.",
    myths: [
      {
        claim: "The flag’s designer and precise origin are firmly established.",
        reality:
          "They are disputed: competing accounts credit a 1909 Istanbul literary society, the 1911 " +
          "Young Arab Society and the British official Mark Sykes, and the record is a matter of " +
          "dispute and mythology.",
      },
    ],
    sources: [
      { title: "Flag of Palestine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Palestine" },
    ],
  },

  LA: {
    description:
      "A horizontal red-blue-red triband (the blue band double height) with a white disc at the " +
      "centre. In the designer’s explanation the red stands for the blood shed by the Lao people in " +
      "their struggle, the blue for the Mekong River and the nation’s prosperity, and the white disc " +
      "for the full moon over the Mekong and the unity of the people. Created in 1945 and readopted " +
      "in 1975.",
    sources: [
      { title: "Flag of Laos — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Laos" },
    ],
  },

  ME: {
    description:
      "A red field within a gold border, with the national coat of arms — a golden double-headed " +
      "eagle bearing a lion — at the centre. Drawn from Montenegro’s historical royal banners, it was " +
      "adopted in 2004 as the country asserted a distinct identity before its 2006 independence.",
    sources: [
      { title: "Flag of Montenegro — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montenegro" },
    ],
  },

  SM: {
    description:
      "Two horizontal bands, white over light blue, with the coat of arms at the centre: three towers " +
      "on Monte Titano within oak and laurel wreaths, beneath a crown and the motto Libertas " +
      "(“Liberty”). The white stands for peace (and the snow of the mountain) and the blue for " +
      "liberty and the sky; the three towers are the fortifications of Monte Titano. The arms were " +
      "standardised in 1862.",
    sources: [
      { title: "Flag of San Marino — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_San_Marino" },
    ],
  },

  // ── Subnational flags (keyed by ISO 3166-2 code) ────────────────────────
  "GB-SCT": {
    description:
      "The Saltire, or Saint Andrew’s Cross: a white diagonal cross on a blue field. Saint " +
      "Andrew, Scotland’s patron saint, is traditionally said to have been martyred on an " +
      "X-shaped cross, which the flag depicts. It is one of the oldest national flags still in use.",
    myths: [
      {
        claim:
          "The flag originates from a white saltire appearing in the sky before the Battle of " +
          "Athelstaneford in 832.",
        reality:
          "This is a founding legend, not verified history: King Óengus is said to have seen " +
          "white saltire-shaped clouds against the blue sky and taken them as Saint Andrew’s " +
          "blessing before victory. The story is recorded only in much later sources.",
      },
    ],
    sources: [
      { title: "Flag of Scotland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Scotland" },
    ],
  },

  "GB-WLS": {
    description:
      "Y Ddraig Goch (“the Red Dragon”): a red dragon passant on a field divided white " +
      "over green. The red dragon is an ancient emblem of Wales, linked in medieval legend to the " +
      "tale of the fighting red and white dragons and to the kings of Gwynedd; the white-and-green " +
      "field are the livery colours of the Tudor dynasty. It was granted official status in 1959.",
    sources: [
      { title: "Flag of Wales — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wales" },
    ],
  },

  "US-TX": {
    description:
      "The Lone Star Flag: a blue vertical band at the hoist bearing a single white five-pointed " +
      "star, beside two horizontal bars, white over red. The single star gives Texas its nickname, " +
      "the “Lone Star State.” The design was adopted by the Republic of Texas in 1839.",
    myths: [
      {
        claim: "The colours officially mean loyalty (blue), purity (white) and bravery (red).",
        reality:
          "This interpretation is popular but was not part of the 1839 law that adopted the flag; " +
          "the statute assigned no meaning to the colours. The meanings were attached later by " +
          "custom.",
      },
    ],
    sources: [
      { title: "Flag of Texas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Texas" },
    ],
  },

  "US-AK": {
    description:
      "Eight gold stars on a dark blue field: the seven stars of the Big Dipper plus a larger North " +
      "Star. The blue stands for the sky, the sea and Alaska’s forget-me-not flower, the Big Dipper " +
      "for strength (it forms part of Ursa Major, the Great Bear) and the North Star for Alaska’s " +
      "far-northern position. It was designed in 1927 by a schoolboy, Benny Benson, in a territorial " +
      "contest.",
    myths: [
      {
        claim: "Benny Benson was 13 years old when he designed the flag.",
        reality: "He was in fact 14 at the time; the “13-year-old” version is a common retelling.",
      },
    ],
    sources: [
      { title: "Flag of Alaska — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alaska" },
    ],
  },

  "US-HI": {
    description:
      "Eight horizontal white, red and blue stripes for Hawaii’s eight main islands, with the British " +
      "Union Jack in the canton — the only U.S. state flag to contain another country’s flag. The " +
      "Union Jack reflects close ties with Britain in the early 19th century; the flag dates from the " +
      "Kingdom of Hawaii and was standardised in 1845.",
    myths: [
      {
        claim: "King Kamehameha I deliberately combined the British and American flags to please both powers.",
        reality:
          "A frequently-repeated but unverified account; what is documented is the strong British " +
          "naval influence on the design, not a specific diplomatic intention.",
      },
    ],
    sources: [
      { title: "Flag of Hawaii — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hawaii" },
    ],
  },

  "US-NM": {
    description:
      "A red Zia sun symbol on a yellow field, in the red and yellow of old Spain. The Zia sun’s four " +
      "groups of rays stand for the four directions, the four seasons, the four times of day and the " +
      "four stages of life. Adopted in 1925.",
    myths: [
      {
        claim: "The sacred Zia symbol was freely given for use on the flag.",
        reality:
          "It was adopted without the consent of the Zia Pueblo, who later objected; a 2012 state " +
          "memorial acknowledged the appropriation.",
      },
    ],
    sources: [
      { title: "Flag of New Mexico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Mexico" },
    ],
  },

  "US-MD": {
    description:
      "The quartered arms of the Calvert family (gold and black) and the Crossland family (red and " +
      "white, with a bottony cross) — the personal heraldry of the Barons Baltimore, Maryland’s " +
      "founders. It is the only U.S. state flag based on genuine English heraldry. Adopted in 1904.",
    myths: [
      {
        claim: "The two halves were simply an aesthetic choice.",
        reality:
          "During the Civil War the Calvert colours were linked to Unionists and the Crossland cross " +
          "to Confederate sympathisers; combining them is read as a gesture of reconciliation.",
      },
    ],
    sources: [
      { title: "Flag of Maryland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maryland" },
    ],
  },

  "US-SC": {
    description:
      "A blue field with a white palmetto tree and a white crescent. The palmetto commemorates the " +
      "palmetto-log fort on Sullivan’s Island that withstood British cannon fire in 1776; the blue " +
      "and the crescent come from the uniforms and cap badges of the Revolutionary militia.",
    myths: [
      {
        claim: "The crescent is a moon.",
        reality:
          "It is not a lunar symbol but a gorget-shaped emblem taken from the silver crescent badge " +
          "on the militia’s caps.",
      },
    ],
    sources: [
      { title: "Flag of South Carolina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Carolina" },
    ],
  },

  "US-OH": {
    description:
      "The Ohio Burgee — the only non-rectangular U.S. state flag, a swallowtail pennant of red and " +
      "white stripes with a blue triangle bearing 17 stars around a red-and-white disc. The stripes " +
      "stand for roads and waterways, the triangle for hills and valleys, the 17 stars for Ohio as " +
      "the 17th state and the “O” for its name and the buckeye. Adopted in 1902.",
    myths: [
      {
        claim: "The design copied the Cuban, Filipino or Japanese flags it was compared to.",
        reality:
          "Its designer drew on Civil War cavalry guidons; the foreign-flag comparisons were made by " +
          "the press after the fact.",
      },
    ],
    sources: [
      { title: "Flag of Ohio — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ohio" },
    ],
  },

  "US-AZ": {
    description:
      "Thirteen red and gold rays of a setting sun over a blue lower half, with a copper-coloured " +
      "star at the centre. The thirteen rays stand for the original colonies, the red and gold recall " +
      "Spanish colonial banners, the blue matches the U.S. flag and the copper star marks Arizona as " +
      "the country’s leading copper producer. Adopted in 1917.",
    myths: [
      {
        claim: "An earlier sun design was changed so the flag would not resemble Japan’s.",
        reality:
          "A popular story with no support in the record; the state credits Spanish colonial " +
          "influence for the rayed-sun design.",
      },
    ],
    sources: [
      { title: "Flag of Arizona — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Arizona" },
    ],
  },

  "US-CO": {
    description:
      "Blue, white and blue horizontal stripes with a red “C” filled by a gold disc. The blue is the " +
      "sky, the gold the sunshine, the white the snow-capped Rockies and the red the state’s ruddy " +
      "earth; the C stands at once for Colorado (Spanish for “ruddy/red”), for its centennial " +
      "statehood and for the columbine flower. Adopted in 1911.",
    sources: [
      { title: "Flag of Colorado — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Colorado" },
    ],
  },

  "US-TN": {
    description:
      "A red field with a blue vertical bar at the fly and a blue disc bearing three white stars. The " +
      "three stars stand for Tennessee’s three Grand Divisions — East, Middle and West — and the " +
      "circle for their unity. Designed by LeRoy Reeves and adopted in 1905.",
    myths: [
      {
        claim: "The three stars mean Tennessee was the third state to join the Union.",
        reality:
          "That claim (from a 1917 magazine article) is incorrect; the designer stated the stars " +
          "represent the three Grand Divisions.",
      },
    ],
    sources: [
      { title: "Flag of Tennessee — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tennessee" },
    ],
  },

  "US-RI": {
    description:
      "A white field with a gold anchor encircled by thirteen gold stars and a blue ribbon bearing " +
      "the state motto, “Hope.” The anchor and motto — long used on the colony’s seal — echo a " +
      "biblical image of hope, and the thirteen stars stand for the original colonies (Rhode Island " +
      "being the 13th to ratify the Constitution). Adopted in 1897.",
    sources: [
      { title: "Flag of Rhode Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rhode_Island" },
    ],
  },

  "US-PR": {
    description:
      "Five red and white stripes with a blue triangle at the hoist bearing a single white star. It " +
      "was created in 1895 by exiles in New York as a mirror of the Cuban flag, in solidarity between " +
      "the two independence movements; the star is the island, the triangle the three branches of " +
      "government, the red stripes the blood that sustains them and the white the rights of the people.",
    myths: [
      {
        claim: "The shade of blue is fixed and meaningless.",
        reality:
          "The original left the blue unspecified, and the shade has become political — light blue is " +
          "associated with independence, dark blue (used since 1952) with statehood — so the colour " +
          "chosen can signal a viewpoint.",
      },
    ],
    sources: [
      { title: "Flag of Puerto Rico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Puerto_Rico" },
    ],
  },

  "US-MN": {
    description:
      "A dark-blue field shaped like the state at the hoist bearing a white eight-pointed star, beside " +
      "a light-blue fly. The dark blue stands for the shape of Minnesota and the night sky, the star " +
      "for the state motto L’Étoile du Nord (“the Star of the North”) and the light blue for the " +
      "state’s abundant waters. Adopted in 2024, replacing the former seal flag.",
    myths: [
      {
        claim: "The new flag was made to resemble Somalia’s flag.",
        reality:
          "State officials call the resemblance coincidental, noting that several U.S. state flags " +
          "happen to echo foreign ones (Iowa and France, Texas and Chile).",
      },
    ],
    sources: [
      { title: "Flag of Minnesota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Minnesota" },
    ],
  },

  "US-UT": {
    description:
      "A gold beehive inside a hexagon on a white band, between a blue sky above and red canyon-rock " +
      "below, with a white star. The beehive is Utah’s emblem of industry and the hexagon its " +
      "honeycomb of collective effort; the blue is the sky, the red the desert rock and the star the " +
      "state’s tribal nations. Adopted in 2024 as the new state flag.",
    myths: [
      {
        claim: "The star stands for Utah being the 45th state.",
        reality:
          "The five-pointed star specifically honours Utah’s five original tribal nations (Navajo, " +
          "Shoshone, Goshute, Paiute and Ute), though it also alludes to statehood.",
      },
    ],
    sources: [
      { title: "Flag of Utah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Utah" },
    ],
  },

  "US-MS": {
    description:
      "The “New Magnolia” flag: a white magnolia blossom ringed by twenty white stars and one gold " +
      "star on a navy field between gold and red bands, with the motto “In God We Trust.” The magnolia " +
      "is the state flower and a symbol of hospitality and rebirth, the twenty stars mark Mississippi " +
      "as the 20th state and the gold star honours its Native American peoples. Adopted in 2021 to " +
      "replace the flag that had carried a Confederate battle emblem.",
    sources: [
      { title: "Flag of Mississippi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mississippi" },
    ],
  },

  "US-DC": {
    description:
      "Three red stars over two red bars on white — an armorial banner of the coat of arms of George " +
      "Washington’s family. Adopted in 1938 for the District named after the first president.",
    myths: [
      {
        claim: "The bars and stars stand for Congress and the commissioners ruling the District.",
        reality:
          "That reading arose from residents’ frustration at having no vote; the design is simply the " +
          "Washington family heraldry.",
      },
    ],
    sources: [
      { title: "Flag of Washington, D.C. — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Washington,_D.C." },
    ],
  },

  "US-IN": {
    description:
      "A gold torch with rays, ringed by nineteen stars, on a blue field. The torch stands for liberty " +
      "and enlightenment and its rays for their far-reaching influence; the nineteen stars mark " +
      "Indiana as the 19th state, with the large star above the torch standing for Indiana itself. " +
      "Designed by Paul Hadley for the state’s 1916 centennial and adopted in 1917.",
    sources: [
      { title: "Flag of Indiana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Indiana" },
    ],
  },

  "US-AL": {
    description:
      "A crimson St Andrew’s cross (saltire) on a white field. Adopted in 1895.",
    myths: [
      {
        claim: "The flag was definitively created to honour the Confederate battle flag.",
        reality:
          "This is disputed: the adopting legislation records no such intent, and historians disagree " +
          "on whether the saltire was meant to evoke the battle flag or was simply a new design for a " +
          "planned exposition.",
      },
    ],
    sources: [
      { title: "Flag of Alabama — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alabama" },
    ],
  },

  "US-AR": {
    description:
      "A red field with a large white diamond bordered in blue and 25 stars, the word “ARKANSAS” " +
      "within, and four larger stars. The diamond marks Arkansas as the only U.S. state that has " +
      "produced diamonds and the 25 border stars its place as the 25th state; of the four inner " +
      "stars, the three below stand for the nations that once held the land (France, Spain and the " +
      "United States) and the 1803 Louisiana Purchase. Adopted in 1913.",
    myths: [
      {
        claim: "The star above the state’s name has no particular meaning.",
        reality:
          "It was added in 1923–24 specifically to represent the Confederacy, a documented feature of " +
          "the design.",
      },
    ],
    sources: [
      { title: "Flag of Arkansas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Arkansas" },
    ],
  },

  "US-AS": {
    description:
      "A red-edged white triangle pointing to the hoist on a blue field, bearing a bald eagle that " +
      "holds a uatogi (war club) and a fue (fly-whisk staff). The eagle stands for the United States " +
      "and the two Samoan emblems for traditional chiefly authority. Adopted in 1960, on the " +
      "60th anniversary of U.S. sovereignty over the territory.",
    sources: [
      { title: "Flag of American Samoa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_American_Samoa" },
    ],
  },

  "US-GA": {
    description:
      "Red, white and red bands with a blue canton bearing the state coat of arms in a ring of " +
      "thirteen stars and the motto “In God We Trust.” The thirteen stars mark Georgia as one of the " +
      "original colonies and the arms’ arch and pillars its constitution and three branches of " +
      "government; the design is modelled on the first national flag of the Confederacy, the “Stars " +
      "and Bars.” Adopted in 2003.",
    sources: [
      { title: "Flag of Georgia (U.S. state) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Georgia_(U.S._state)" },
    ],
  },

  "US-GU": {
    description:
      "A blue field with a red border and a central almond-shaped seal — its shape recalling ancient " +
      "Chamorro sling stones — showing a flying proa in Hagåtña Bay, a coconut palm and the word " +
      "“GUAM.” The red border was added in 1948 to commemorate the suffering of the Japanese " +
      "occupation during the Second World War.",
    sources: [
      { title: "Flag of Guam — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guam" },
    ],
  },

  "US-VI": {
    description:
      "A white field with a simplified U.S. eagle between the letters V and I, holding a laurel sprig " +
      "in one talon and three blue arrows in the other. The eagle stands for the United States, the " +
      "laurel for victory and — unlike the thirteen arrows of the national arms — the three arrows for " +
      "the territory’s three main islands, Saint Croix, Saint Thomas and Saint John. Adopted in 1921.",
    sources: [
      { title: "Flag of the U.S. Virgin Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_United_States_Virgin_Islands" },
    ],
  },

  "US-NC": {
    description:
      "A blue union with a white star between gold letters N and C, two gold scrolls dated “May 20th " +
      "1775” and “April 12th 1776,” and red-over-white bars. The dates commemorate the Halifax " +
      "Resolves of 1776 and the Mecklenburg Declaration said to have been made in 1775. Adopted in 1885.",
    myths: [
      {
        claim: "The Mecklenburg Declaration of 20 May 1775 is firmly established history.",
        reality:
          "Its existence is doubted by most historians — no original text survives and the account " +
          "appeared decades later — yet the date remains on the flag.",
      },
    ],
    sources: [
      { title: "Flag of North Carolina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Carolina" },
    ],
  },

  "CA-QC": {
    description:
      "The Fleurdelisé: a white cross on a blue field with a white fleur-de-lis in each quarter. The " +
      "blue stands for heaven and the fleurs-de-lis for Québec’s French and Catholic heritage — they " +
      "derive from banners honouring the Virgin Mary carried by French-Canadian militia in the 18th " +
      "century. Adopted in 1948, the first provincial flag in Canada.",
    sources: [
      { title: "Flag of Quebec — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Quebec" },
    ],
  },

  "CA-BC": {
    description:
      "The Union Jack topped by a gold crown, above a golden setting sun over wavy blue and white " +
      "stripes. The Union Jack marks British Columbia’s colonial origins and the crown its status as " +
      "a Crown colony; the setting sun reflects the province’s place as Canada’s westernmost, and the " +
      "wavy stripes its position between the Pacific Ocean and the mountains. Adopted in 1960.",
    sources: [
      { title: "Flag of British Columbia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_British_Columbia" },
    ],
  },

  "CA-NL": {
    description:
      "An abstract design in blue, white, red and gold by the artist Christopher Pratt. The blue " +
      "stands for the sea, the white for snow and ice, the red for human effort and the gold for " +
      "confidence in the future; the two red triangles represent mainland Labrador and the island of " +
      "Newfoundland, and the gold arrow points to a brighter future. Adopted in 1980.",
    sources: [
      { title: "Flag of Newfoundland and Labrador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Newfoundland_and_Labrador" },
    ],
  },

  "CA-NS": {
    description:
      "A blue Saint Andrew’s saltire on white — the reverse of Scotland’s colours — charged with the " +
      "royal arms of Scotland, a red lion on gold. It reflects the province’s name and heritage as " +
      "“New Scotland,” and is the oldest provincial flag in Canada (in use from 1858 and granted by " +
      "royal warrant in 1929).",
    sources: [
      { title: "Flag of Nova Scotia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nova_Scotia" },
    ],
  },

  "CA-ON": {
    description:
      "A Red Ensign with the Union Jack in the canton and the Ontario shield in the fly — a red Saint " +
      "George’s Cross above three gold maple leaves on green. Adopted in 1965 to preserve the Red " +
      "Ensign after Canada replaced it nationally with the Maple Leaf flag.",
    sources: [
      { title: "Flag of Ontario — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ontario" },
    ],
  },

  "CA-NU": {
    description:
      "Gold and white fields divided by a red inuksuk, with a blue star in the upper fly. The inuksuk " +
      "is the traditional Inuit stone marker used for guidance, and the blue star is Niqirtsuituq, the " +
      "North Star, standing for the guidance of the sky and the wisdom of elders; the gold, white and " +
      "blue evoke the riches of land, snow and sky. Adopted when Nunavut was created in 1999.",
    sources: [
      { title: "Flag of Nunavut — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nunavut" },
    ],
  },

  "CA-MB": {
    description:
      "A Red Ensign with the Union Jack in the canton and the Manitoba shield — a bison standing on a " +
      "rock beneath a Saint George’s Cross. Adopted in 1966 to keep the Red Ensign after it was " +
      "dropped nationally.",
    myths: [
      {
        claim: "The flag was chosen through a public design competition.",
        reality:
          "It was not: after the bruising national flag debate there was no public contest — " +
          "provincial officials simply adopted the Red Ensign format.",
      },
    ],
    sources: [
      { title: "Flag of Manitoba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Manitoba" },
    ],
  },

  "CA-AB": {
    description:
      "An ultramarine-blue field bearing the provincial shield: a Saint George’s Cross above a " +
      "landscape of the Rocky Mountains, foothills, prairie and wheat. The shield comes from a 1907 " +
      "royal warrant; the flag was adopted in 1968.",
    sources: [
      { title: "Flag of Alberta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alberta" },
    ],
  },

  "CA-SK": {
    description:
      "A green upper half and gold lower half with the provincial shield (a red lion above three " +
      "wheat sheaves) and a western red lily in the fly. The green stands for the forested north, the " +
      "gold for the grain fields of the south and the lily for the provincial flower. Adopted in 1969.",
    sources: [
      { title: "Flag of Saskatchewan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saskatchewan" },
    ],
  },

  "CA-NB": {
    description:
      "An armorial banner of New Brunswick’s arms: a gold lion on a red band above a gold galley " +
      "(lymphad) on blue and white waves. The lion reflects ties to England and to Brunswick, and the " +
      "ship the province’s shipbuilding heritage and the vessels of the Loyalists. Adopted in 1965.",
    sources: [
      { title: "Flag of New Brunswick — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Brunswick" },
    ],
  },

  "CA-NT": {
    description:
      "Blue-white-blue vertical bands with the territorial shield on the white: a white fox for the " +
      "fur trade, gold bars for minerals, a wavy blue line for the Arctic Ocean and Northwest Passage " +
      "and a diagonal tree line dividing green forest from red tundra. The white stands for snow and " +
      "ice and the blue for the territory’s waters. Adopted in 1969.",
    sources: [
      { title: "Flag of the Northwest Territories — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northwest_Territories" },
    ],
  },

  "CA-YT": {
    description:
      "Green, white and blue vertical panels with the territorial coat of arms above a wreath of " +
      "fireweed on the white. The green stands for the forests, the white for snow and the blue for " +
      "the lakes and rivers; the fireweed is Yukon’s floral emblem. Adopted in 1967.",
    sources: [
      { title: "Flag of Yukon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Yukon" },
    ],
  },

  "AU-NSW": {
    description:
      "A British Blue Ensign defaced with the state badge: a white disc bearing a red Saint George’s " +
      "Cross with a golden lion at the centre and a gold eight-pointed star on each arm. The lion " +
      "reflects the colony’s English origins. Adopted in 1876, replacing a design thought too like " +
      "Victoria’s.",
    sources: [
      { title: "Flag of New South Wales — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_South_Wales" },
    ],
  },

  "AU-QLD": {
    description:
      "A British Blue Ensign defaced with the state badge — a light-blue Maltese cross with a royal " +
      "crown at its centre, on a white disc. Adopted in 1876, it replaced an earlier badge showing " +
      "Queen Victoria’s head that was too hard to reproduce on bunting.",
    myths: [
      {
        claim: "The crown on the badge changed automatically when King Charles III acceded in 2022.",
        reality:
          "It did not: Queensland has chosen to keep the St Edward’s Crown of the 1963 design rather " +
          "than switch to the Tudor Crown.",
      },
    ],
    sources: [
      { title: "Flag of Queensland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Queensland" },
    ],
  },

  "AU-SA": {
    description:
      "A British Blue Ensign defaced with the state badge: a piping shrike with outstretched wings on " +
      "a gold disc representing the sun. Adopted in 1904, replacing an earlier badge that resembled " +
      "other colonies’ designs.",
    myths: [
      {
        claim: "The bird on the badge is a distinct species called the “piping shrike.”",
        reality:
          "“Piping shrike” is a traditional South Australian name; the bird is more commonly known as " +
          "the white-backed magpie.",
      },
    ],
    sources: [
      { title: "Flag of South Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Australia" },
    ],
  },

  "AU-WA": {
    description:
      "A British Blue Ensign defaced with the state badge — a native black swan on a gold disc, facing " +
      "the hoist. The swan stands for Western Australia, recalling the Swan River Colony. The badge " +
      "dates from 1870; the swan was turned to face the hoist in 1953 to follow flag convention.",
    sources: [
      { title: "Flag of Western Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Western_Australia" },
    ],
  },

  "AU-VIC": {
    description:
      "A British Blue Ensign defaced with the state badge: the five stars of the Southern Cross " +
      "beneath a St Edward’s Crown. Adopted in 1877, it was the first Australian colonial flag to use " +
      "the Southern Cross.",
    sources: [
      { title: "Flag of Victoria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Victoria_(state)" },
    ],
  },

  "AU-TAS": {
    description:
      "A British Blue Ensign defaced with the state badge — a red lion passant on a white disc. " +
      "Adopted in 1876; there is no official record of how the lion came to be chosen.",
    sources: [
      { title: "Flag of Tasmania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tasmania" },
    ],
  },

  "AU-NT": {
    description:
      "A black panel at the hoist bearing the white Southern Cross, beside an ochre panel with a " +
      "stylised white Sturt’s desert rose. It uses the Territory’s official colours of black, white " +
      "and ochre — the only Australian state or territory flag without blue — and the desert rose’s " +
      "seven petals stand for the six states plus the Northern Territory. Designed by Robert Ingpen " +
      "for self-government in 1978.",
    sources: [
      { title: "Flag of the Northern Territory — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northern_Territory" },
    ],
  },

  "AU-ACT": {
    description:
      "Vertical blue and gold panels — Canberra’s colours — the blue bearing the white Southern Cross " +
      "and the gold the city’s coat of arms. Adopted in 1993, drawn from a community design competition.",
    sources: [
      { title: "Flag of the Australian Capital Territory — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Australian_Capital_Territory" },
    ],
  },

  "CH-ZH": {
    description:
      "A blue and white flag divided diagonally, in use since the 1220s. The diagonal split (and its " +
      "former red Schwenkel pennant) is one of the oldest of the Swiss cantonal arms.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BE": {
    description:
      "A black bear climbing a diagonal yellow band on a red field. The bear is canting arms for Bern " +
      "(Bär), the city’s emblem since the Middle Ages (recorded from 1289).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-LU": {
    description:
      "A field divided blue and white — set vertically in the coat of arms but horizontally on the " +
      "flag, a difference that comes from the canton’s medieval gonfalon banner. Documented from 1386.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-UR": {
    description:
      "A black bull’s head on a gold field — canting arms for Uri (from Latin urus, the aurochs). It " +
      "was carried into medieval battles including Morgarten in 1315.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SZ": {
    description:
      "A plain red field with a small white cross in the upper hoist. Schwyz gave both its name and " +
      "its red colour to the Swiss Confederation; in 1480 Pope Sixtus IV linked the red to the " +
      "Passion of Christ.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-OW": {
    description:
      "A field divided red and white with a single key. The single (rather than double) key was fixed " +
      "in 1816 to distinguish Obwalden from Nidwalden.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-NW": {
    description:
      "A red field with a double key — the keys of Saint Peter — derived from 15th-century seals.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GL": {
    description:
      "A red field bearing Saint Fridolin, the pilgrim who brought Christianity to the region, in use " +
      "since 1388; the current design dates from 1959.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-ZG": {
    description:
      "A white field crossed by a single blue horizontal stripe — one of the earliest documented " +
      "cantonal designs, recorded in 1319.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-FR": {
    description:
      "A field divided black over white (per fess), first recorded in 1478 as Fribourg gained its " +
      "independence from Savoy.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SO": {
    description:
      "A field divided red over white, documented from 1443.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BS": {
    description:
      "A white field with a black bishop’s crozier, the Baselstab, adopted as a heraldic emblem in " +
      "1385 from earlier civic seals.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BL": {
    description:
      "A white field with a red crozier bearing seven crockets, adopted in 1834; the staff is turned " +
      "to face the opposite way from Basel-Stadt’s to mark the two half-cantons’ separation.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SH": {
    description:
      "A gold field with a black ram — canting arms for Schaffhausen (Schaf, “sheep/ram”), documented " +
      "from 1218; the ram was given a crown in 1512.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-AR": {
    description:
      "A white field with a black rampant bear flanked by the letters V and R (for Ussere Rhoden, the " +
      "“outer districts”). The bear comes from the Abbey of Saint Gall; the design dates from after " +
      "the Reformation-era split of the Appenzell districts.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SG": {
    description:
      "A green field with a silver fasces (a bundle of rods). It was created in 1803, when the canton " +
      "was assembled from previously separate territories under the Helvetic Republic.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GR": {
    description:
      "Three historical arms combined in one shield, adopted in 1933, standing for the Three Leagues " +
      "that united to form the canton of Graubünden (the Grisons).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-TG": {
    description:
      "A field divided diagonally white and green with two gold lions, created in 1803 from the arms " +
      "of the House of Kyburg (the gold-on-white being an intentional break with the usual heraldic " +
      "colour rule).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-TI": {
    description:
      "A field divided red and blue, designed in 1803. Neither its designer nor its intended " +
      "symbolism was recorded.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-VD": {
    description:
      "A green and white flag bearing the motto “Liberté et Patrie” (“Liberty and Homeland”) in gold. " +
      "Adopted in 1803, it derives from the flag of the Vaudois uprising against Bernese rule.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-VS": {
    description:
      "A field divided vertically white and red with thirteen stars, formalised in 1815. The stars " +
      "stand for the districts (dizains) of the canton; the thirteenth was added when Valais joined " +
      "the restored Swiss Confederation in 1815.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-NE": {
    description:
      "A green, white and red flag with a small white Swiss cross in the canton, adopted in 1857 from " +
      "the flag of the 1848 republican revolution that ended Neuchâtel’s status as a Prussian " +
      "principality.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GE": {
    description:
      "A shield divided per pale: half a gold imperial eagle and half a gold key of Saint Peter, " +
      "representing Geneva’s medieval status as both a free imperial city and an episcopal seat. " +
      "Documented from the 15th century.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-JU": {
    description:
      "A shield divided per pale: a red bishop’s crozier on white, and red-and-white stripes whose " +
      "seven bands stand for the historic districts of the Bernese Jura. Designed in 1943 and adopted " +
      "when the canton was created in 1979.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },












  "BR-SP": {
    description:
      "Thirteen black and white horizontal stripes with a red canton bearing a white disc, the blue " +
      "map of Brazil and four stars. The stripes stand for the days and nights the bandeirante " +
      "pioneers fought, the red for their blood and the disc for the strength they brought. Designed " +
      "in 1888 and made official in 1946.",
    sources: [
      { title: "Flag of São Paulo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_S%C3%A3o_Paulo_(state)" },
    ],
  },

  "BR-MG": {
    description:
      "A white field with a red triangle and the Latin motto “Libertas Quæ Sera Tamen” (“Liberty, " +
      "even if delayed,” from Virgil). It recalls the Inconfidência Mineira of 1789; the triangle is " +
      "read as the Holy Trinity and the red as revolution. Adopted in 1963.",
    sources: [
      { title: "Flag of Minas Gerais — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Minas_Gerais" },
    ],
  },

  "BR-BA": {
    description:
      "Four white and red horizontal stripes with a blue canton bearing a white triangle. The triangle " +
      "recalls the Inconfidência and Freemasonry, and the red, white and blue echo the 1798 Revolt of " +
      "the Tailors. Adopted in 1960.",
    sources: [
      { title: "Flag of Bahia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bahia" },
    ],
  },

  "BR-PE": {
    description:
      "A blue band over a white one bearing a rainbow, a sun with a star and a red cross. It " +
      "commemorates the Pernambucan Revolt of 1817: the blue is the sky, the white peace, the rainbow " +
      "union, the sun strength and the cross faith in justice. Adopted in 1917.",
    sources: [
      { title: "Flag of Pernambuco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pernambuco" },
    ],
  },

  "BR-PR": {
    description:
      "A green field crossed by a white diagonal band for the Tropic of Capricorn, with a blue circle " +
      "showing the Southern Cross framed by branches of Paraná pine and yerba mate. The design " +
      "expresses the state’s geography and natural heritage.",
    sources: [
      { title: "Flag of Paraná — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Paran%C3%A1_(state)" },
    ],
  },

  "BR-PA": {
    description:
      "A red field with a white diagonal band and a blue star. The band stands for the Equator and the " +
      "Amazon River, the star (Spica) for Pará on the national flag, and the red for the blood of the " +
      "Cabanagem revolt. Adopted in 1890.",
    sources: [
      { title: "Flag of Pará — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Par%C3%A1" },
    ],
  },

  "BR-ES": {
    description:
      "A tricolour of blue, white and pink with the motto “Trabalha e Confia” (“Work and Trust,” from " +
      "Saint Ignatius of Loyola). The colours come from the mantle of Our Lady of Victory, the " +
      "capital’s patron: blue for harmony, white for peace and pink for happiness.",
    sources: [
      { title: "Flag of Espírito Santo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Esp%C3%ADrito_Santo" },
    ],
  },

  "BR-SC": {
    description:
      "A red and white field with a green lozenge and the state arms at the centre. The green lozenge " +
      "stands for Saint Catherine of Alexandria, the state’s patron; there is no official meaning for " +
      "the red and white. Adopted in 1953.",
    sources: [
      { title: "Flag of Santa Catarina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Catarina" },
    ],
  },

  "BR-CE": {
    description:
      "A green field with a yellow rhombus and a white disc bearing the state arms, adapted from " +
      "Brazil’s national flag. The arms carry a fort and lighthouse, seven stars for the state’s " +
      "regions and the four classical elements; the dove and jangada boat recall the Jangadeiros’ " +
      "strike, which helped Ceará abolish slavery early.",
    sources: [
      { title: "Flag of Ceará — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cear%C3%A1" },
    ],
  },

  "BR-MT": {
    description:
      "A blue field with a white rhombus enclosing a green sphere and a yellow star. The blue recalls " +
      "the Rio de Janeiro sky the night the republic was proclaimed, the rhombus positivism and " +
      "purity, the sphere hope and nature, and the star (Sirius) wealth and the bandeirantes.",
    sources: [
      { title: "Flag of Mato Grosso — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mato_Grosso" },
    ],
  },

  "BR-MS": {
    description:
      "A green upper and blue lower triangle split by a white diagonal band, with a yellow star. It " +
      "won a 1979 design contest; the government changed the students’ original ochre field — meant " +
      "for the state’s red Terra Roxa soil — to blue to match the national colours.",
    sources: [
      { title: "Flag of Mato Grosso do Sul — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mato_Grosso_do_Sul" },
    ],
  },

  "BR-GO": {
    description:
      "Four green and four yellow stripes with a blue canton bearing the five stars of the Southern " +
      "Cross. The green stands for the House of Braganza and the yellow for the House of Habsburg — " +
      "the dynasties of Brazil’s imperial family. Adopted in 1919.",
    sources: [
      { title: "Flag of Goiás — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Goi%C3%A1s" },
    ],
  },

  "BR-MA": {
    description:
      "Nine white, red and black stripes with a blue canton bearing a white star. The three stripe " +
      "colours stand for the state’s Indigenous, Afro-Brazilian and white peoples, and the star " +
      "(Beta Scorpii) for Maranhão on the national flag. Adopted in 1889.",
    sources: [
      { title: "Flag of Maranhão — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maranh%C3%A3o" },
    ],
  },

  "BR-AM": {
    description:
      "White and red bands with a blue canton bearing a large star and twenty-five smaller ones. The " +
      "twenty-five stars stand for the municipalities existing in 1897 and the large star for the " +
      "capital, Manaus; white is hope, blue the sky and red the overcoming of hardship.",
    sources: [
      { title: "Flag of Amazonas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Amazonas_(Brazilian_state)" },
    ],
  },

  "BR-SE": {
    description:
      "Green and yellow stripes with a blue canton bearing five white stars. The five stars stand for " +
      "the state’s main rivers — the Sergipe, São Francisco, Real, Vaza-Barris and Japaratuba — and " +
      "the green and gold for integration with Brazil.",
    sources: [
      { title: "Flag of Sergipe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sergipe" },
    ],
  },

  "BR-AC": {
    description:
      "A field split diagonally, yellow above with a red star and green below. The red “Altaneira” " +
      "star stands for the blood of those who fought to annex Acre to Brazil, the yellow for the " +
      "land’s riches and the green for hope.",
    sources: [
      { title: "Flag of Acre — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Acre" },
    ],
  },

  "BR-RN": {
    description:
      "A green and white field with the state coat of arms, designed by the folklorist Luís da Câmara " +
      "Cascudo. The arms depict the state’s economy and geography — coconut and carnauba palms, " +
      "sugarcane and cotton, jangada fishing boats and salt pans.",
    sources: [
      { title: "Flag of Rio Grande do Norte — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_Grande_do_Norte" },
    ],
  },

  "BR-PB": {
    description:
      "A red field over black bearing the word “Nego” (“I refuse”). It was adopted in 1930 to honour " +
      "the assassinated governor João Pessoa — whose “no” rejected the era’s power-sharing politics; " +
      "the red stands for his blood and the black for the people’s mourning and struggle.",
    sources: [
      { title: "Flag of Paraíba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Para%C3%ADba" },
    ],
  },

  "BR-PI": {
    description:
      "Thirteen green and yellow stripes with a blue canton bearing a white star and the date " +
      "“13 de Março de 1823.” The yellow is mineral wealth and the green hope; the star (Antares) " +
      "stands for Piauí on the national flag, and the date marks the Battle of Jenipapo.",
    sources: [
      { title: "Flag of Piauí — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Piau%C3%AD" },
    ],
  },

  "BR-TO": {
    description:
      "A blue upper and yellow lower triangle split by a white diagonal band bearing a gold sun. The " +
      "sun stands for a land where dawn comes for all, the white for peace, the blue for its waters " +
      "and the gold for mineral wealth.",
    sources: [
      { title: "Flag of Tocantins — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tocantins" },
    ],
  },

  "BR-RO": {
    description:
      "A blue upper half with a white star over a green band, with yellow at the sides. It presents " +
      "Rondônia as “the newest star in the sky of the Union” (the star Muliphein); the blue is the " +
      "sky, the green the roads that opened the state to settlement, and the yellow its resources.",
    sources: [
      { title: "Flag of Rondônia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rond%C3%B4nia" },
    ],
  },

  "BR-AP": {
    description:
      "Horizontal blue, green and yellow bands with a green triangle at the hoist showing the fortress " +
      "of São José de Macapá. Green stands for the rainforest and hope, yellow for the union and the " +
      "soil, blue for justice and the sky, white for peace, and the black line for those who died for " +
      "the region.",
    sources: [
      { title: "Flag of Amapá — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Amap%C3%A1" },
    ],
  },

  "BR-RR": {
    description:
      "Diagonal blue, white and green bands with a narrow red band and a gold star. The green stands " +
      "for the forests, the gold star for mineral wealth (the star Wezen, for Roraima on the national " +
      "flag), the white for peace and the blue for the sky; the red band marks the Equator.",
    sources: [
      { title: "Flag of Roraima — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Roraima" },
    ],
  },

  "BR-DF": {
    description:
      "A white field with a green-and-gold “Cross of Brasília” of four arrows pointing to the cardinal " +
      "directions. The white stands for peace and the vastness of Brazil; the converging arrows " +
      "evoke Indigenous heritage, the central seat of power at Brasília and the Southern Cross.",
    sources: [
      { title: "Flag of the Federal District (Brazil) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_District_(Brazil)" },
    ],
  },

  "AR-A": {
    description:
      "A burgundy field bearing the provincial arms — a light-blue shield with a Sun of May and a " +
      "six-pointed star, ringed by 23 gold gaucho spurs for the province’s departments. The burgundy " +
      "and black recall the Salta poncho of Güemes’s “Infernales” cavalry in the war of independence. " +
      "Adopted in 1997.",
    sources: [
      { title: "Flag of Salta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Salta_Province" },
    ],
  },

  "AR-B": {
    description:
      "Blue over green, split by a thin red line, with half a sun and sunflower and a half cogwheel. " +
      "The green stands for the farmland, the blue for the rivers, the red for federalism, the " +
      "sunflower for agriculture and the cogwheel for industry. It won a 1997 contest among the " +
      "province’s schoolchildren.",
    sources: [
      { title: "Flag of Buenos Aires Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Province_of_Buenos_Aires" },
    ],
  },

  "AR-E": {
    description:
      "A blue-white-blue field with a red diagonal, based on José Artigas’s flag of the League of the " +
      "Free Peoples. Artigas added the red — the colour of federalism — to Belgrano’s blue and white " +
      "to distinguish his forces during the war of independence.",
    sources: [
      { title: "Flag of Entre Ríos Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Entre_R%C3%ADos_Province" },
    ],
  },

  "AR-F": {
    description:
      "A white field with the city’s coat of arms: a black crowned eagle holding a Calatrava cross, " +
      "with four eaglets at its feet. Established by the city’s founder Juan de Garay in 1580, the " +
      "eagle and crown stand for the Spanish monarchy, the cross for the Order of Calatrava and " +
      "evangelism, and the eaglets for cities founded in the same period.",
    sources: [
      { title: "Flag of Buenos Aires — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Autonomous_City_of_Buenos_Aires" },
    ],
  },

  "AR-G": {
    description:
      "Five vertical light-blue and white stripes with a red central square bearing a golden sun and " +
      "the red Cross of Saint James. The blue and white are the national colours, the red stands for " +
      "the Federalist Party that won the province its autonomy, and the cross for its Spanish and " +
      "Catholic heritage.",
    sources: [
      { title: "Flag of Santiago del Estero Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santiago_del_Estero_Province" },
    ],
  },

  "AR-J": {
    description:
      "A light-blue, white, light-blue triband that uniquely shows different faces: the coat of arms " +
      "on the front and the Sun of May on the back. It was painted by the people of San Juan in 1816 " +
      "as a gift to the Army of the Andes as it formed for the crossing to Chile.",
    sources: [
      { title: "Flag of San Juan Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_San_Juan_Province,_Argentina" },
    ],
  },

  "AR-N": {
    description:
      "A red, blue and white horizontal tricolour in the tradition of Artigas: the red for the blood " +
      "shed for freedom, the blue for the resolve toward a republic and the white for greatness. It " +
      "descends from Andrés Guacurarí’s 1815 adaptation of the League of the Free Peoples flag and " +
      "was restored in 1992.",
    sources: [
      { title: "Flag of Misiones Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Misiones_Province" },
    ],
  },

  "AR-P": {
    description:
      "Light-blue, white and gold horizontal stripes with nine stars and a garland of bay leaves " +
      "marking the Tropic of Capricorn, which crosses the province. It won a provincial competition " +
      "and was adopted in 1991.",
    sources: [
      { title: "Flag of Formosa Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Formosa_Province" },
    ],
  },

  "AR-Q": {
    description:
      "A light-blue, white, light-blue triband (the national colours) with the provincial emblem on " +
      "the white: a monkey-puzzle tree, the Lanín volcano, a poinsettia and sixteen stars for the " +
      "departments, within a laurel wreath. Adopted in 1989.",
    sources: [
      { title: "Flag of Neuquén Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Neuqu%C3%A9n_Province" },
    ],
  },

  "AR-R": {
    description:
      "Blue, white and green horizontal stripes with a black canton of thirteen stars for the " +
      "province’s departments. The blue stands for justice and its water, the black canton for the " +
      "Río Negro (“Black River”) that gives the province its name, the white for unity and the green " +
      "for hope and fertile land.",
    sources: [
      { title: "Flag of Río Negro Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_R%C3%ADo_Negro_Province" },
    ],
  },

  "AR-S": {
    description:
      "A red, white and blue vertical triband with the provincial arms (crossed arrows, a spear and a " +
      "half-sun). The white and blue are the national colours and the red is Artigas’s colour of " +
      "federalism; the design was fixed by Governor Estanislao López in 1822.",
    sources: [
      { title: "Flag of Santa Fe Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Fe_Province" },
    ],
  },

  "AR-T": {
    description:
      "A light-blue stripe between two white ones — a “negative” of the Argentine flag. It reproduces " +
      "a war-of-independence flag of Belgrano, hidden in a church after the 1813 Battle of Ayohuma and " +
      "rediscovered in 1883; the province adopted it in 2010.",
    sources: [
      { title: "Flag of Tucumán — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tucum%C3%A1n" },
    ],
  },

  "AR-W": {
    description:
      "A light-blue, white, light-blue triband with a blue triangle at the hoist, the provincial motto " +
      "and coat of arms. Adopted in 1986, it combines an earlier flag bearing the 1821 arms with " +
      "another carrying an 1823 hoist triangle.",
    sources: [
      { title: "Flag of Corrientes Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Corrientes_Province" },
    ],
  },

  "AR-X": {
    description:
      "A red, white and light-blue triband with a golden Sun of May of 32 rays. The white and blue are " +
      "the national colours and the sun refers both to the Sol de Mayo and to the Jesuit emblem, " +
      "standing for the province’s autonomy and its ties to the League of the Free Peoples.",
    sources: [
      { title: "Flag of Córdoba Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_C%C3%B3rdoba_Province,_Argentina" },
    ],
  },

  "AR-Y": {
    description:
      "A white field with the coat of arms of the Assembly of the Year XIII. This is the very flag " +
      "General Belgrano donated to the city of Jujuy in 1813 to honour its people’s courage at the " +
      "Battles of Tucumán and Salta; it became the provincial flag in 1994.",
    sources: [
      { title: "Flag of Jujuy Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jujuy_Province" },
    ],
  },

  "AR-Z": {
    description:
      "A flag showing a Sun of May, the peak of Mount Fitz Roy (Cerro Chaltén, sacred to the Aónikenk " +
      "people), waves of the Atlantic and the Southern Cross. It was chosen from 149 entries in a " +
      "competition and adopted in 2000.",
    sources: [
      { title: "Flag of Santa Cruz Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Cruz_Province,_Argentina" },
    ],
  },

  "CO-ANT": {
    description:
      "A white band over a green one. The white stands for purity, integrity and triumph and the " +
      "green for the department’s mountains, hope and wealth. The design originated at the University " +
      "of Antioquia and became official in 1962.",
    sources: [
      { title: "Flag of Antioquia Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Antioquia_Department" },
    ],
  },

  "CO-BOL": {
    description:
      "A horizontal tricolour of yellow, green and red. The yellow stands for wealth and abundance, " +
      "the green for hope for the future and the red for valour and the blood of patriots; the flag’s " +
      "precise origin has been lost.",
    sources: [
      { title: "Flag of Bolívar Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bol%C3%ADvar_Department" },
    ],
  },

  "CO-BOY": {
    description:
      "Green, white and red horizontal stripes with the wide red band at the centre. The green stands " +
      "for faith, service and the fertile countryside, the white for love of the homeland and unity, " +
      "and the central red for those who died in the wars of independence — above all at the Battle of " +
      "Boyacá. Adopted 1967–68.",
    sources: [
      { title: "Flag of Boyacá Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Boyac%C3%A1_Department" },
    ],
  },

  "CO-SAN": {
    description:
      "A red stripe at the hoist bearing eight stars, alongside green, gold and black bands. The red " +
      "stands for nobility and bravery, the green for loyalty and hope, and the gold and black for the " +
      "region’s natural resources — gold, coal and petroleum.",
    sources: [
      { title: "Flag of Santander Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santander_Department" },
    ],
  },

  "CO-MAG": {
    description:
      "Six alternating red and blue bands with a large star formed of thirty small white stars, " +
      "standing for the department’s twenty-nine municipalities and its one district.",
    sources: [
      { title: "Flag of Magdalena Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Magdalena_Department" },
    ],
  },

  "CO-CES": {
    description:
      "A white band between two green bands. The green stands for the department’s fertile vegetation " +
      "and the white for the hope of peace.",
    sources: [
      { title: "Flag of Cesar Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cesar_Department" },
    ],
  },

  "BR-RJ": {
    description:
      "A blue and white field bearing the state coat of arms, whose emblems include an eagle and " +
      "mountains. Adopted in 1965, it was kept unchanged after the state merged with Guanabara in 1975.",
    sources: [
      { title: "Flag of Rio de Janeiro — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_de_Janeiro_(state)" },
    ],
  },

  "BR-RS": {
    description:
      "Green, red and yellow horizontal stripes with the state arms at the centre. The green and " +
      "yellow stand for Brazil and the red for the revolution and courage of the province; the design " +
      "comes from the flag of the Riograndense Republic of the 1836–45 Farroupilha revolt and was " +
      "re-established in 1966.",
    sources: [
      { title: "Flag of Rio Grande do Sul — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_Grande_do_Sul" },
    ],
  },

  "BR-AL": {
    description:
      "A vertical tricolour of red, white and blue — echoing the French flag and the ideals of the " +
      "Revolution — with the state arms at the centre. The arms show three shells for three historic " +
      "towns, three fish for the main lagoons and the fishing industry, sugarcane and cotton, and a " +
      "silver star.",
    sources: [
      { title: "Flag of Alagoas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alagoas" },
    ],
  },

  "MY-01": {
    description:
      "A navy-blue field with a red canton bearing a white crescent and five-pointed star. The blue " +
      "stands for the state, the red for the warriors who defend Johor, and the crescent and star for " +
      "Islam and the ruler.",
    sources: [
      { title: "Flag of Johor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Johor" },
    ],
  },

  "MY-02": {
    description:
      "A red field with the state arms at the hoist: a yellow shield for the ruler’s authority, a " +
      "green crescent for Islam and a wreath of rice stalks for the state’s agriculture. Adopted in " +
      "1912.",
    sources: [
      { title: "Flag of Kedah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kedah" },
    ],
  },

  "MY-03": {
    description:
      "A red field with a white emblem of a crescent and star between two kris and spears. The red " +
      "stands for the honesty of the people and ruler and the white for the sanctity of the Sultan; " +
      "the crescent and star are Islam. Adopted in 1924.",
    sources: [
      { title: "Flag of Kelantan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kelantan" },
    ],
  },

  "MY-04": {
    description:
      "Red and white bands with a blue canton bearing a yellow crescent and star — the national " +
      "colours, with the crescent and star for Islam. Adopted in 1957, before Malayan independence.",
    sources: [
      { title: "Flag of Malacca — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malacca" },
    ],
  },

  "MY-05": {
    description:
      "A yellow field with a canton split diagonally, red over black. The yellow stands for the ruler " +
      "(Yang di-Pertuan Besar), the red for the people and the black for the four traditional " +
      "chiefs (undang), reflecting the state’s Minangkabau heritage. Adopted in 1895.",
    sources: [
      { title: "Flag of Negeri Sembilan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Negeri_Sembilan" },
    ],
  },

  "MY-06": {
    description:
      "Two horizontal bands, white over black. The white stands for the Sultan and the black for the " +
      "bendahara (chief minister) and the people. Adopted in 1903.",
    sources: [
      { title: "Flag of Pahang — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pahang" },
    ],
  },

  "MY-07": {
    description:
      "Light-blue, white and yellow vertical bands with an areca-nut palm on the white. The blue " +
      "stands for the sea around the island, the white for peace and the yellow for prosperity.",
    sources: [
      { title: "Flag of Penang — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Penang" },
    ],
  },

  "MY-08": {
    description:
      "Three horizontal bands of white, yellow and black for the royal hierarchy: white for the " +
      "Sultan, yellow for the crown prince (Raja Muda) and black for the next heir (Raja Di Hilir). " +
      "Adopted in 1879.",
    sources: [
      { title: "Flag of Perak — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Perak" },
    ],
  },

  "MY-09": {
    description:
      "A yellow band over a dark-blue one. The yellow stands for the Raja of Perlis and the blue for " +
      "the people; the yellow set above the blue signifies the close bond between ruler and people.",
    sources: [
      { title: "Flag of Perlis — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Perlis" },
    ],
  },

  "MY-10": {
    description:
      "A field quartered red and yellow with a white crescent and star in the canton. The red stands " +
      "for bravery and the yellow for royalty; the crescent and star are Islam. In its current form " +
      "since 1965.",
    sources: [
      { title: "Flag of Selangor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Selangor" },
    ],
  },

  "MY-11": {
    description:
      "A black field within a thick white border, with a white crescent and star at the centre. The " +
      "white stands for the Sultan and the black for the people; the white border represents the " +
      "Sultan’s duty to protect his subjects, and the crescent and star are Islam. Adopted in 1953.",
    sources: [
      { title: "Flag of Terengganu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Terengganu" },
    ],
  },

  "MY-12": {
    description:
      "Horizontal blue, white and red bands with a dark-blue silhouette of Mount Kinabalu on a " +
      "light-blue canton. The blues stand for peace, unity and strength, the white for purity and " +
      "justice and the red for courage; Mount Kinabalu represents the state. Adopted in 1988.",
    sources: [
      { title: "Flag of Sabah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sabah" },
    ],
  },

  "MY-13": {
    description:
      "Called Ibu Pertiwi (“Motherland”): a yellow field crossed by black and red diagonal bars with " +
      "a yellow nine-pointed star. The yellow stands for the rule of law and unity, the red for " +
      "courage and the black for natural resources; the nine points recall Sarawak’s original nine " +
      "divisions. Adopted in 1988.",
    sources: [
      { title: "Flag of Sarawak — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sarawak" },
    ],
  },

  "MY-14": {
    description:
      "A blue field with red and white stripes and a yellow crescent and fourteen-pointed star — a " +
      "variant of the national flag for the federal capital. The red stands for courage, the blue for " +
      "the unity of its people, the yellow for sovereignty and the white for cleanliness. Adopted in " +
      "1990.",
    sources: [
      { title: "Flag of Kuala Lumpur — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kuala_Lumpur" },
    ],
  },

  "DE-BW": {
    description:
      "A black band over a gold one. The colours were drawn in 1952 from the flags of the states that " +
      "merged to form Baden-Württemberg — Baden’s yellow-and-red and Württemberg’s black-and-red.",
    sources: [
      { title: "Flag of Baden-Württemberg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Baden-W%C3%BCrttemberg" },
    ],
  },

  "DE-BY": {
    description:
      "White and blue, shown either as horizontal bands or as a field of lozenges. Both are the " +
      "colours of the Wittelsbach dynasty, which ruled Bavaria from 1180 to 1918; the lozenge " +
      "pattern’s exact origin is disputed.",
    sources: [
      { title: "Flag of Bavaria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bavaria" },
    ],
  },

  "DE-BE": {
    description:
      "A white field with red stripes at top and bottom and a black bear striding across it. The bear " +
      "is a canting emblem for Berlin, used on the city’s seals and coins since the late 12th century.",
    sources: [
      { title: "Flag of Berlin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Berlin" },
    ],
  },

  "DE-BB": {
    description:
      "A red band over a white one, with the red eagle (the Märkischer Adler) on the state flag. The " +
      "red and white are the historic colours of the Margraviate of Brandenburg, restored when the " +
      "state was re-established in 1990.",
    sources: [
      { title: "Flag of Brandenburg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brandenburg" },
    ],
  },

  "DE-HB": {
    description:
      "The Speckflagge (“bacon flag”): at least eight alternating red and white horizontal stripes, " +
      "checked at the hoist. The red and white are Bremen’s Hanseatic colours; the origin of the " +
      "colours themselves is not documented.",
    sources: [
      { title: "Flag of Bremen — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bremen" },
    ],
  },

  "DE-HH": {
    description:
      "A red field with a white three-towered castle, the arms of the Hanseatic city of Hamburg. The " +
      "castle appears on the city’s seals from as early as 1241 and became the flag design in 1751.",
    sources: [
      { title: "Flag of Hamburg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hamburg" },
    ],
  },

  "DE-HE": {
    description:
      "A red band over a white one, from the red-and-white barry lion of the Ludowingian dynasty, " +
      "which passed to the House of Hesse in 1247.",
    sources: [
      { title: "Flag of Hesse — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hesse" },
    ],
  },

  "DE-MV": {
    description:
      "Five horizontal stripes — blue, white, yellow, white and red — designed in 1991 to combine the " +
      "blue-and-white of Western Pomerania with the blue-yellow-red of Mecklenburg, the two regions " +
      "that make up the state.",
    sources: [
      { title: "Flag of Mecklenburg-Vorpommern — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mecklenburg-Vorpommern" },
    ],
  },

  "DE-NI": {
    description:
      "The German black-red-gold with the state arms — a white Saxon steed on red — toward the hoist. " +
      "Adopted in 1951 as a neutral flag for a state assembled from the formerly separate lands of " +
      "Hanover, Brunswick, Oldenburg and Schaumburg-Lippe.",
    sources: [
      { title: "Flag of Lower Saxony — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lower_Saxony" },
    ],
  },

  "DE-NW": {
    description:
      "A horizontal tricolour of green, white and red, combining the colours of the former Prussian " +
      "provinces the state was built from — the Rhineland and Westphalia. The state arms show the " +
      "Rhine, the Westphalian horse and the rose of Lippe.",
    sources: [
      { title: "Flag of North Rhine-Westphalia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Rhine-Westphalia" },
    ],
  },

  "DE-RP": {
    description:
      "The German black-red-gold tricolour with the state coat of arms in the upper hoist. Adopted in " +
      "1948.",
    sources: [
      { title: "Flag of Rhineland-Palatinate — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rhineland-Palatinate" },
    ],
  },

  "DE-SL": {
    description:
      "The German black-red-gold tricolour bearing the arms of Saarland, whose quarters stand for the " +
      "four historic territories of the region — Nassau-Saarbrücken, the Archbishopric of Trier, the " +
      "Duchy of Lorraine and Palatinate-Zweibrücken.",
    sources: [
      { title: "Flag of Saarland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saarland" },
    ],
  },

  "DE-SN": {
    description:
      "A white band over a green one — the colours established for the Kingdom of Saxony in 1815. No " +
      "deeper symbolism is documented beyond their long use as the state colours.",
    sources: [
      { title: "Flag of Saxony — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saxony" },
    ],
  },

  "DE-ST": {
    description:
      "A yellow band over a black one, from the black-and-yellow of the former Prussian Province of " +
      "Saxony; the order was reversed in 1991 to avoid confusion with Baden-Württemberg.",
    sources: [
      { title: "Flag of Saxony-Anhalt — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saxony-Anhalt" },
    ],
  },

  "DE-SH": {
    description:
      "A horizontal tricolour of blue, white and red, combining the colours of Schleswig (blue, with " +
      "two lions) and Holstein (red and white, with a nettle leaf), the two duchies that make up the " +
      "state.",
    sources: [
      { title: "Flag of Schleswig-Holstein — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Schleswig-Holstein" },
    ],
  },

  "DE-TH": {
    description:
      "A white band over a red one, from the heraldic colours of the Ludowingian rulers of the " +
      "medieval Landgraviate of Thuringia.",
    sources: [
      { title: "Flag of Thuringia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Thuringia" },
    ],
  },

  "US-CA": {
    description:
      "The Bear Flag: a California grizzly walking on a patch of grass, with a red star, a red bottom " +
      "stripe and the words “California Republic” on a white field. It descends from the banner of the " +
      "1846 Bear Flag Revolt; the red star echoes an earlier 1836 “Lone Star” independence flag.",
    sources: [
      { title: "Flag of California — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_California" },
    ],
  },

  "US-WA": {
    description:
      "A green field with the state seal bearing a portrait of George Washington — the only U.S. state " +
      "flag with a green field and the only one depicting a president. The green stands for the " +
      "forests of western Washington and the gold seal for the wheat country of the east. Adopted 1923.",
    sources: [
      { title: "Flag of Washington — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Washington_(state)" },
    ],
  },

  "US-OR": {
    description:
      "A navy-blue flag with the state seal and 33 stars (Oregon being the 33rd state) on the front " +
      "and a gold beaver, the state animal, on the back — the last U.S. state flag with a different " +
      "design on each side.",
    sources: [
      { title: "Flag of Oregon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oregon" },
    ],
  },

  "US-NJ": {
    description:
      "A buff (tan) field with the state arms — the goddesses Liberty and Ceres flanking a shield of " +
      "three ploughs, beneath a horse’s head. The buff colour comes from the facings George Washington " +
      "ordered in 1779 for the uniforms of the New Jersey Continental Line.",
    sources: [
      { title: "Flag of New Jersey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Jersey" },
    ],
  },

  "US-WY": {
    description:
      "A blue field with white and red borders and a white bison branded with the state seal. The " +
      "bison is the “monarch of the plains,” the red border honours Native Americans and the pioneers, " +
      "and the blue stands for fidelity and justice. Adopted 1917.",
    sources: [
      { title: "Flag of Wyoming — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wyoming" },
    ],
  },

  "US-NY": {
    description:
      "A dark-blue field with the state arms: Liberty (treading on a crown) and Justice flanking a " +
      "Hudson River landscape, beneath the motto “Excelsior” (“ever upward”).",
    sources: [
      { title: "Flag of New York — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_York_(state)" },
    ],
  },

  "US-VT": {
    description:
      "A blue field with the state arms — a pine tree, a red cow and sheaves of wheat, the Green " +
      "Mountains and a deer’s head — standing for the state’s forests, farming and wildlife. Adopted " +
      "1923.",
    sources: [
      { title: "Flag of Vermont — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vermont" },
    ],
  },

  "US-FL": {
    description:
      "A white field with a red saltire and the state seal (a Seminole woman scattering flowers, a " +
      "steamboat, a sabal palm and sun rays). The red bars were added by amendment in 1900; no single " +
      "reason for them was ever documented.",
    sources: [
      { title: "Flag of Florida — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Florida" },
    ],
  },

  "US-KS": {
    description:
      "A blue field with the state seal — a sunflower above a scene of a rising sun, a steamboat, " +
      "wagon trains and bison — beneath 34 stars for Kansas as the 34th state and the motto “Ad astra " +
      "per aspera” (“to the stars through difficulties”).",
    sources: [
      { title: "Flag of Kansas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kansas" },
    ],
  },

  "US-LA": {
    description:
      "A blue field with a white pelican tearing its breast to feed its young (with three drops of " +
      "blood) and the motto “Union, Justice, Confidence.” The “pelican in her piety” is an old " +
      "symbol of self-sacrifice and devotion.",
    sources: [
      { title: "Flag of Louisiana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Louisiana" },
    ],
  },

  "US-MA": {
    description:
      "A white field bearing the state arms — an Algonquian figure holding a bow with a downward " +
      "(peaceful) arrow and a single star for statehood. A public redesign process was under way as " +
      "of 2024.",
    sources: [
      { title: "Flag of Massachusetts — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Massachusetts" },
    ],
  },

  "US-PA": {
    description:
      "A blue field with the state arms: a ship for commerce, a plough for agriculture and three wheat " +
      "sheaves for prosperity, flanked by two horses and topped by an eagle, with the motto “Virtue, " +
      "Liberty and Independence.”",
    sources: [
      { title: "Flag of Pennsylvania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pennsylvania" },
    ],
  },

  "US-MI": {
    description:
      "A blue field with the state arms — an elk and a moose flanking a shield of a sunrise over a " +
      "peninsula, a bald eagle above — with the mottos “Tuebor” (“I will defend”) and “Si quaeris " +
      "peninsulam amoenam circumspice” (“If you seek a pleasant peninsula, look about you”).",
    sources: [
      { title: "Flag of Michigan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Michigan" },
    ],
  },

  "US-ME": {
    description:
      "A blue field with the state arms — a farmer and a sailor beside a shield showing a moose " +
      "resting under a pine tree — with the North Star and the motto “Dirigo” (“I lead”).",
    sources: [
      { title: "Flag of Maine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maine" },
    ],
  },

  "US-CT": {
    description:
      "A blue field with a white shield of three grapevines and the motto “Qui transtulit sustinet” " +
      "(“He who transplanted sustains”), recalling the colony’s founding settlers.",
    sources: [
      { title: "Flag of Connecticut — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Connecticut" },
    ],
  },

  "US-IL": {
    description:
      "A white field with the Great Seal of Illinois — a bald eagle on a boulder holding a shield of " +
      "stars and stripes, with the dates 1818 and 1868 and the motto “State Sovereignty, National " +
      "Union.”",
    sources: [
      { title: "Flag of Illinois — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Illinois" },
    ],
  },

  "US-VA": {
    description:
      "A blue field with the state seal — Virtus, personifying virtue, standing over a defeated tyrant " +
      "— beneath the motto “Sic Semper Tyrannis” (“Thus always to tyrants”).",
    sources: [
      { title: "Flag of Virginia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Virginia" },
    ],
  },

  "US-MO": {
    description:
      "Red, white and blue horizontal stripes with the state arms in a blue band of 24 stars, for " +
      "Missouri as the 24th state. Red stands for valour, white for purity and blue for vigilance and " +
      "justice; the tricolour also recalls the state’s French Louisiana heritage.",
    sources: [
      { title: "Flag of Missouri — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Missouri" },
    ],
  },

  "US-DE": {
    description:
      "A colonial-blue field with a buff diamond bearing the state arms (a ship, an ox, wheat, a " +
      "farmer and a soldier) and the date December 7, 1787 — the day Delaware became the first state " +
      "to ratify the Constitution. The colours recall Washington’s uniform.",
    sources: [
      { title: "Flag of Delaware — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Delaware" },
    ],
  },

  "US-WI": {
    description:
      "A blue field with the state arms — a sailor and a yeoman flanking a shield of a plough, tools " +
      "and an anchor for farming, mining, manufacturing and navigation — with the motto “Forward” and " +
      "a badger crest.",
    sources: [
      { title: "Flag of Wisconsin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wisconsin" },
    ],
  },

  "US-OK": {
    description:
      "A sky-blue field with an Osage buffalo-skin war shield hung with seven eagle feathers, crossed " +
      "by a peace pipe and an olive branch. The shield covered by symbols of peace expresses a united " +
      "people’s love of peace.",
    sources: [
      { title: "Flag of Oklahoma — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oklahoma" },
    ],
  },

  "US-NV": {
    description:
      "A cobalt-blue field with a silver star, sprays of sagebrush and a gold scroll reading “Battle " +
      "Born.” The motto recalls Nevada’s admission during the Civil War (1864) and the silver star its " +
      "nickname, the Silver State.",
    sources: [
      { title: "Flag of Nevada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nevada" },
    ],
  },

  "US-SD": {
    description:
      "A sky-blue field with the state seal ringed by golden sun-rays and the words “South Dakota — " +
      "The Mount Rushmore State.” The sun stands for the state’s plentiful sunshine and the seal for " +
      "its farming, mining and river trade.",
    sources: [
      { title: "Flag of South Dakota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Dakota" },
    ],
  },

  "US-MT": {
    description:
      "A blue field with the Great Seal — mountains and the Great Falls of the Missouri, with a " +
      "plough, pick and shovel for agriculture and mining — beneath the motto “Oro y Plata” (“Gold " +
      "and Silver”).",
    sources: [
      { title: "Flag of Montana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montana" },
    ],
  },

  "US-ID": {
    description:
      "A blue field with the state seal — the only U.S. state seal designed by a woman, Emma Edwards " +
      "Green — showing a miner and a woman for equality, liberty and justice, an elk’s head, and the " +
      "motto “Esto Perpetua” (“Let it be perpetual”).",
    sources: [
      { title: "Flag of Idaho — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Idaho" },
    ],
  },

  "US-ND": {
    description:
      "A blue field with a bald eagle holding an olive branch and a sheaf of seven arrows, copied from " +
      "the regimental banner carried by North Dakota troops in the Spanish-American and " +
      "Philippine-American Wars.",
    sources: [
      { title: "Flag of North Dakota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Dakota" },
    ],
  },

  "US-NE": {
    description:
      "A blue field with the state seal — a blacksmith, a steamboat on the Missouri, sheaves of wheat " +
      "and a railroad running toward the Rocky Mountains — beneath the motto “Equality Before the " +
      "Law.”",
    sources: [
      { title: "Flag of Nebraska — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nebraska" },
    ],
  },

  "US-WV": {
    description:
      "A white field with a blue border and the state arms: a farmer and a miner beside a boulder " +
      "dated June 20, 1863 (statehood), with crossed rifles and a liberty cap, wreathed in " +
      "rhododendron and the motto “Montani Semper Liberi” (“Mountaineers Are Always Free”).",
    sources: [
      { title: "Flag of West Virginia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_West_Virginia" },
    ],
  },

  "US-KY": {
    description:
      "A blue field with the state seal — two men embracing beneath the motto “United We Stand, " +
      "Divided We Fall,” with sprigs of goldenrod. The figures stand for the unity of frontiersmen " +
      "and statesmen (popularly, though not officially, Daniel Boone and Henry Clay).",
    sources: [
      { title: "Flag of Kentucky — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kentucky" },
    ],
  },

  "US-IA": {
    description:
      "A blue, white and red vertical tricolour recalling the French flag and Iowa’s French colonial " +
      "heritage, with an eagle bearing the motto “Our Liberties We Prize and Our Rights We Will " +
      "Maintain.” Blue stands for loyalty and justice, white for purity and red for courage.",
    sources: [
      { title: "Flag of Iowa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iowa" },
    ],
  },

  "US-NH": {
    description:
      "A blue field with the state seal — the frigate Raleigh under construction at Portsmouth beside " +
      "a granite boulder — ringed by a laurel wreath and nine stars for New Hampshire as the ninth " +
      "state to ratify the Constitution.",
    sources: [
      { title: "Flag of New Hampshire — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Hampshire" },
    ],
  },

  "US-MP": {
    description:
      "A dark-blue field, for the Pacific Ocean, with a white star for the United States over a grey " +
      "latte stone representing the Chamorro people, all encircled by a mwarmwar flower garland for " +
      "the Carolinian people. Adopted in 1985.",
    sources: [
      { title: "Flag of the Northern Mariana Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northern_Mariana_Islands" },
    ],
  },

  "JP-13": {
    description:
      "An Edo-purple field bearing the white Tokyo Metropolitan crest — a six-rayed sun with a dot at " +
      "the centre, marking Tokyo as the metaphorical heart of Japan and its rays as development in all " +
      "directions. Adopted in 1964.",
    sources: [
      { title: "Flag of Tokyo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tokyo" },
    ],
  },

  "JP-01": {
    description:
      "A navy-blue field with a red seven-pointed star. The star, a modern reworking of the historic " +
      "seven-pointed “North Star,” stands for Hokkaido’s pioneering spirit; the blue represents the " +
      "northern seas and sky and the white the region’s snow. Adopted in 1967.",
    sources: [
      { title: "Flag of Hokkaido — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hokkaido" },
    ],
  },

  "JP-34": {
    description:
      "A crimson field with a white stylised katakana “ヒ” (hi, for Hiroshima); the emblem’s " +
      "overlapping circles express the prefecture’s growth and development.",
    sources: [
      { title: "Flag of Hiroshima Prefecture — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hiroshima_Prefecture" },
    ],
  },

  "JP-47": {
    description:
      "A white field with three stacked circles, red around white around red. The emblem stands for " +
      "the ocean, peace and development, with the central white circle forming the letter “O” for " +
      "Okinawa.",
    sources: [
      { title: "Flag of Okinawa Prefecture — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Okinawa_Prefecture" },
    ],
  },


  "JP-11": {
    description:
      "A white field bearing a red disc formed of 16 comma-shaped magatama jewels arranged in a ring. " +
      "The magatama allude to the “saki-mitama” (fortunate spirit) from which the name Saitama derives, " +
      "and the emblem as a whole stands for the sun, development, passion and strength. Adopted 1964.",
    sources: [
      { title: "埼玉県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%9F%BC%E7%8E%89%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-16": {
    description:
      "A white field with a green emblem: the hiragana “と” (to) set within the outline of Mount " +
      "Tateyama, expressing the prefecture’s leap toward the great sky. The emblem was designated 1957; " +
      "the current white-ground version has been used since 1989.",
    sources: [
      { title: "富山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AF%8C%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-19": {
    description:
      "A purple field — for the prefecture’s grapes — with a white trapezoid evoking the silhouette of " +
      "Mount Fuji, standing for purity and honest nature. Within it, three “人” (person) characters form " +
      "the kanji “山” (mountain), and curved lines express flow and endless advancement. Adopted 1966.",
    sources: [
      { title: "山梨県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E6%A2%A8%E7%9C%8C%E6%97%97" },
    ],
  },


  "JP-22": {
    description:
      "A blue field — for the sky and the Pacific — bearing a stylised map of the prefecture: Mount " +
      "Fuji, the Izu Peninsula, Suruga Bay and Cape Omaezaki. The orange stands for bright sunlight and " +
      "the passion and unity of the people. Chosen from 6,915 public entries; adopted 1968.",
    sources: [
      { title: "静岡県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%9D%99%E5%B2%A1%E7%9C%8C%E6%97%97" },
    ],
  },




  "JP-29": {
    description:
      "A white field with a dark-red emblem based on the kana “ナ” (na): the outer ring stands for the " +
      "nature of “Mahoroba” Yamato and the inner ring for the spirit of harmony (“wa”) from Prince " +
      "Shōtoku’s Seventeen-Article Constitution; the horizontal axis expresses ceaseless progress in " +
      "government. Adopted 1968.",
    sources: [
      { title: "奈良県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A5%88%E8%89%AF%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-32": {
    description:
      "A brown field with a gold emblem: four kana “マ” (ma) combined to read “Shima” (island) and form " +
      "a cloud-shaped ring, standing for the unity of the people and the prefecture’s harmonious " +
      "development. Adopted 1968.",
    sources: [
      { title: "島根県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B3%B6%E6%A0%B9%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-36": {
    description:
      "An indigo field — for Tokushima’s famous indigo dyeing — with a yellow emblem based on the kana " +
      "“とく” (toku) in an Asuka-period style, standing for the prefecture’s harmony, unity, soaring " +
      "spirit and development. Adopted 1966.",
    sources: [
      { title: "徳島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%BE%B3%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-39": {
    description:
      "A maroon field with a white circular emblem combining the “土” of the old province name Tosa, the " +
      "kana for “tosa,” and the “こ” of Kōchi; a sword-point rising from the circle signifies progress " +
      "while the ring stands for peace and cooperation. Adopted 1953.",
    sources: [
      { title: "高知県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%AB%98%E7%9F%A5%E7%9C%8C%E6%97%97" },
    ],
  },




  "JP-43": {
    description:
      "An eggplant-brown field with a white emblem: the kana “ク” (ku) shaped like the island of Kyūshū, " +
      "with an inner circle marking Kumamoto’s position at its centre. Adopted 1966.",
    sources: [
      { title: "熊本県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%86%8A%E6%9C%AC%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-46": {
    description:
      "A white field with a red-and-black emblem: the Satsuma and Ōsumi peninsulas stylised into a " +
      "circle with an indentation for Shibushi Bay, and a red disc at the centre for the volcano " +
      "Sakurajima. Adopted 1967.",
    sources: [
      { title: "鹿児島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%B9%BF%E5%85%90%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-27": {
    description:
      "A blue field with a white emblem based on the letter “O,” derived from Toyotomi Hideyoshi’s " +
      "gourd-shaped battle standard; its branching form expresses hope, prosperity and harmony. " +
      "Adopted in 1968 (blue field from 1984).",
    sources: [
      { title: "大阪府旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A4%A7%E9%98%AA%E5%BA%9C%E6%97%97" },
    ],
  },

  "JP-26": {
    description:
      "A reddish-purple field with a stylised character “京” (Kyō) formed as a human figure among six " +
      "petals, representing the unity and strength of the prefecture’s people. Adopted in 1976.",
    sources: [
      { title: "京都府旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E9%83%BD%E5%BA%9C%E6%97%97" },
    ],
  },

  "JP-23": {
    description:
      "A crimson field with a white emblem stylising the kana あ・い・ち (a-i-chi) as rising, sun-lit " +
      "wave crests, expressing the Pacific-facing prefecture’s drive toward international development. " +
      "Adopted in 1950.",
    sources: [
      { title: "愛知県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E7%9F%A5%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-14": {
    description:
      "A red-and-white flag whose white central emblem is the kanji “神” (kami) of Kanagawa rendered " +
      "in a symmetrical, stylised form. Adopted in 1948.",
    sources: [
      { title: "神奈川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-20": {
    description:
      "An orange field with a white emblem — the katakana “ナ” (na) drawn as a bird flying over a " +
      "mountain lake. The orange stands for sunlight on the land and the white for the snow of “the " +
      "roof of Japan” and the honest character of its people. Adopted in 1967.",
    sources: [
      { title: "長野県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%95%B7%E9%87%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-02": {
    description:
      "A white field with a deep-green emblem shaped like the outline of the prefecture. The white " +
      "stands for an infinitely expanding universe and the green for ceaseless hope and progress. " +
      "Adopted in 1961.",
    sources: [
      { title: "青森県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%9D%92%E6%A3%AE%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-03": {
    description:
      "A greenish-grey field with a white stylised kanji “岩” (iwa, “rock”), expressing the " +
      "prefecture’s progress toward a prosperous, comfortable homeland. Adopted in 1965.",
    sources: [
      { title: "岩手県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%A9%E6%89%8B%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-04": {
    description:
      "A blue-green field with a white emblem stylising the kana “み” (mi) from the leaf of the " +
      "Japanese bush clover, the prefectural flower; its three leaves stand for eternal development, " +
      "the people’s harmony and love of homeland. Adopted in 1966.",
    sources: [
      { title: "宮城県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AE%AE%E5%9F%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-05": {
    description:
      "A white field with a reddish-brown katakana “ア” (a), its dynamic form expressing the " +
      "prefecture’s leap forward and development. Adopted in 1959.",
    sources: [
      { title: "秋田県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A7%8B%E7%94%B0%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-06": {
    description:
      "A blue field with a white emblem of three peaks, standing for the kanji “山” (mountain) and the " +
      "Mogami River; the white evokes the snow and frost-flowers of Mount Zao and the honest " +
      "character of residents. Adopted in 1971.",
    sources: [
      { title: "山形県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E5%BD%A2%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-07": {
    description:
      "An orange-red field with a white circular emblem stylising the kana “ふ” (fu), representing " +
      "civic harmony and unity and the prefecture’s progress (its shape also evoking a peach). " +
      "Adopted in 1968.",
    sources: [
      { title: "福島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-08": {
    description:
      "A blue field with a white spiral emblem stylising a rosebud, the prefectural flower, expressing " +
      "advancement, creativity, dynamism and development. Adopted in 1991.",
    sources: [
      { title: "茨城県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E8%8C%A8%E5%9F%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-09": {
    description:
      "A yellow-green field with a white emblem stylising the kanji “栃” with an archaic “木” (tree) " +
      "radical, expressing dynamic, energetic advancement. Adopted in 1964.",
    sources: [
      { title: "栃木県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%A0%83%E6%9C%A8%E7%9C%8C%E6%97%97" },
    ],
  },






















  "RU-AL": {
    description:
      "Horizontal bands of white and blue separated by narrow white and blue stripes. Blue stands for " +
      "the purity of Altai’s sky, mountains, rivers and lakes; white for eternity, the striving for " +
      "rebirth, and the love and accord of the peoples of the Altai Republic. First adopted 1992.",
    sources: [
      { title: "Флаг Республики Алтай — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8_%D0%90%D0%BB%D1%82%D0%B0%D0%B9" },
    ],
  },



  "RU-ARK": {
    description:
      "A white field crossed diagonally by an azure saltire, with the region’s coat of arms at the " +
      "centre. Adopted 2009 — though critics note the blue saltire echoes the naval St Andrew’s cross " +
      "rather than the Archangel Michael for whom the region is named, and it has not received federal " +
      "heraldic registration.",
    sources: [
      { title: "Флаг Архангельской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-BEL": {
    description:
      "A blue cross divides the field into four quarters — white, red, green and black — with the " +
      "region’s coat of arms in the white quarter. White stands for the chalk deposits and dairy and " +
      "sugar production; red for the blood shed by defenders of the frontier from the 16th–20th " +
      "centuries; green for the fertility of the land; black for the rich chernozem soil and minerals. " +
      "Adopted 2000.",
    sources: [
      { title: "Флаг Белгородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D0%B5%D0%BB%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-BRY": {
    description:
      "A burgundy field bearing the region’s coat of arms. The burgundy recalls the colour of the " +
      "banners under which the army and partisans fought to liberate the Bryansk region during the " +
      "Second World War. Adopted 1998.",
    sources: [
      { title: "Флаг Брянской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D1%80%D1%8F%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-CHE": {
    description:
      "A red field with a narrow yellow stripe low across it, bearing a white camel laden with yellow " +
      "packs. The camel — an enduring, noble beast — stands for wisdom, patience and fidelity; red for " +
      "life, courage and the region’s metallurgy; the yellow stripe for the Ural Mountains and their " +
      "mineral wealth; white for nobility and justice. Adopted 2001.",
    sources: [
      { title: "Флаг Челябинской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-DA": {
    description:
      "Three equal horizontal bands of green, blue and red. Green stands for the fertility of the land " +
      "and for Islam; blue for the Caspian Sea and the greatness of the Dagestani people; red for " +
      "democracy, reason and the courage of the people of this mountain country. Adopted 2003.",
    sources: [
      { title: "Флаг Дагестана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%94%D0%B0%D0%B3%D0%B5%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },




  "RU-KAM": {
    description:
      "A white-over-blue field with an emblem in the hoist: three black volcanoes with silver, flaming " +
      "peaks and, behind them, a red-and-silver rising sun ringed by an indigenous ornament of red and " +
      "blue triangles. The volcanoes and rising sun evoke Kamchatka’s active volcanic landscape and its " +
      "peoples. Adopted 2010.",
    sources: [
      { title: "Флаг Камчатского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },



  "RU-KDA": {
    description:
      "Three horizontal bands of blue, crimson and green with the krai’s gold coat of arms at the " +
      "centre. The colours repeat those of the flag of the Kuban People’s Republic, regarded as the " +
      "national flag of the Kuban Cossacks. Adopted 1995.",
    sources: [
      { title: "Флаг Краснодарского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-AD": {
    description:
      "A green field charged with twelve gold stars and three crossed gold arrows; nine stars form a " +
      "bow-like arc and three sit in a row. Green stands for life, nature and Islam; gold for a bright " +
      "peaceful future and an abundant grain harvest. The twelve stars are the twelve historical " +
      "provinces of Circassia and the three arrows their unity and martial spirit. Based on a historic " +
      "Circassian flag; adopted 1992.",
    sources: [
      { title: "Флаг Адыгеи — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%B4%D1%8B%D0%B3%D0%B5%D0%B8" },
    ],
  },

  "RU-ALT": {
    description:
      "A red field with a blue vertical band at the hoist bearing a stylised yellow ear of wheat, and " +
      "the krai’s coat of arms at the centre. The wheat ear stands for agriculture, the region’s " +
      "leading economic sector; the layout derives from the 1954 RSFSR flag. Adopted 2000.",
    sources: [
      { title: "Флаг Алтайского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%BB%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-AMU": {
    description:
      "A broad red band over a white wavy stripe and a blue band. Red stands for the rich history of " +
      "the Amur region and the martial and labour feats of its people; the blue band, with its four " +
      "waves, for the waters and the might of the great Amur River along the region’s southern border. " +
      "Adopted 1999 (present form 2008).",
    sources: [
      { title: "Флаг Амурской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%BC%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-AST": {
    description:
      "A light-blue field bearing a gold royal crown — an arch of three leaf-shaped points over a gold " +
      "mitre topped by an orb and cross — above a silver eastern sabre with a gold hilt, point to the " +
      "fly. These are the historic charges of Astrakhan’s arms. Adopted 2001; the law gives the " +
      "heraldic description without assigning a separate meaning to each element.",
    sources: [
      { title: "Флаг Астраханской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-BA": {
    description:
      "Three horizontal bands of blue, white and green with a gold ring at the centre enclosing a " +
      "seven-petalled kurai flower. Blue stands for clarity, virtue and purity of thought; white for " +
      "peace, openness and readiness to cooperate; green for freedom and the eternity of life. The " +
      "kurai is a symbol of friendship, its seven petals the seven clans that founded the unity of the " +
      "peoples of Bashkortostan. Adopted 1992.",
    sources: [
      { title: "Флаг Башкортостана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D0%B0%D1%88%D0%BA%D0%BE%D1%80%D1%82%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },

  "RU-BU": {
    description:
      "Horizontal bands of blue, white and yellow, with a gold Soyombo — crescent, sun and three " +
      "flames — in the hoist. Blue is the national colour of the Buryats and the Eternal Blue Sky " +
      "(Khukhe Munkhe Tengri), standing for fidelity; white for high morals, happiness, peace and " +
      "unity; gold for the spiritual principle and Tibetan Buddhism. The three flames mean past, " +
      "present and future generations. Adopted 1992.",
    sources: [
      { title: "Флаг Бурятии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D1%83%D1%80%D1%8F%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-CE": {
    description:
      "Horizontal bands of green, white and red with a white vertical band of Chechen national " +
      "ornament at the hoist, the whole edged in gold fringe. The design was modelled on the flag of " +
      "Tatarstan; the article gives the layout but no official per-colour meaning. Adopted 2004.",
    sources: [
      { title: "Флаг Чечни — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D0%B5%D1%87%D0%BD%D0%B8" },
    ],
  },

  "RU-CHU": {
    description:
      "A blue field with a white triangle based on the hoist enclosing a yellow ring around the Russian " +
      "national colours. The triangle is the Chukotka Peninsula, Russia’s far north-eastern extremity; " +
      "white the Arctic snows and clean fragile land; blue the two oceans — Arctic and Pacific — that " +
      "wash it; the yellow ring the sun that rises first over Russia here, an indigenous drum (yarar), " +
      "and the region’s gold mining. Adopted 1997.",
    sources: [
      { title: "Флаг Чукотского автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D1%83%D0%BA%D0%BE%D1%82%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-CU": {
    description:
      "A field of yellow over a narrow dark-red band along the foot, charged with the dark-red “Tree of " +
      "Life” and, above it, “Three Suns.” Yellow is the sun-filled space of the Chuvash people (and in " +
      "heraldry wealth, justice and strength); dark red the Chuvash land. The Tree of Life expresses the " +
      "people’s striving for spiritual harmony and the unity of peoples; the three eight-pointed suns " +
      "mean “Were, Are, Will Be.” Adopted 1992.",
    sources: [
      { title: "Флаг Чувашии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D1%83%D0%B2%D0%B0%D1%88%D0%B8%D0%B8" },
    ],
  },

  "RU-IN": {
    description:
      "A white field with a green stripe along the top and bottom edges and a red solar sign of three " +
      "curved rays at the centre. White stands for the purity of the people’s thoughts and deeds; green " +
      "for the awakening of nature, the land’s fertility and Islam; red for their centuries-long " +
      "struggle to survive on their ancestral land in peace. The sun’s three rays turn with the Earth, " +
      "meaning eternal motion, creation and prosperity. Designed 1993, adopted 1999.",
    sources: [
      { title: "Флаг Ингушетии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D0%BD%D0%B3%D1%83%D1%88%D0%B5%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-IRK": {
    description:
      "Vertical bands of blue, white and blue, the white one bearing a black babr (a legendary Siberian " +
      "tiger) running toward the hoist with a red sable in its jaws within an open green cedar wreath. " +
      "Blue stands for the region’s waters — Lake Baikal and the Angara; white for purity, modesty and " +
      "Siberian snows; the green cedar for hope and the region’s forest wealth; the red sable for " +
      "courage and valour. Adopted 1997.",
    sources: [
      { title: "Флаг Иркутской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-IVA": {
    description:
      "A field split vertically red (hoist) and blue (fly), crossed low by three narrow silver stripes, " +
      "with the region’s coat of arms above them. The colours and metal repeat those of the arms’ " +
      "heraldic field, and the design is said to express the unity and interaction of the region’s " +
      "people. Adopted 1998.",
    sources: [
      { title: "Флаг Ивановской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KB": {
    description:
      "Three equal bands of blue-grey, white and green, with a central roundel — divided blue-grey and " +
      "green — bearing a white Mount Elbrus. Blue-grey stands for the boundless pure sky and waters (a " +
      "colour honoured among Turkic peoples); white for peace, purity and Islam; green for fertility " +
      "and natural beauty, also honoured in Islam and by the Kabardians. Adopted 1994.",
    sources: [
      { title: "Флаг Кабардино-Балкарии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%B1%D0%B0%D1%80%D0%B4%D0%B8%D0%BD%D0%BE-%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D1%80%D0%B8%D0%B8" },
    ],
  },

  "RU-KC": {
    description:
      "Three equal bands of light blue, green and red, the green one bearing a pale roundel with a sun " +
      "rising behind mountains. Officially light blue stands for peace and good intentions; green for " +
      "nature, fertility, youth and wisdom; red for the warmth and closeness between peoples. An " +
      "unofficial reading ties the three colours to the region’s Turkic, Adyghe and Slavic peoples. " +
      "Adopted 1994.",
    sources: [
      { title: "Флаг Карачаево-Черкесии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D1%80%D0%B0%D1%87%D0%B0%D0%B5%D0%B2%D0%BE-%D0%A7%D0%B5%D1%80%D0%BA%D0%B5%D1%81%D0%B8%D0%B8" },
    ],
  },

  "RU-KGD": {
    description:
      "Three horizontal bands of red, yellow and blue, with a white crenellated castle and the gold " +
      "monogram of Empress Elizabeth Petrovna in the upper hoist. The castle is drawn from the region’s " +
      "coat of arms and recalls Elizabeth’s historical tie to the territory; the law gives no separate " +
      "meaning for each colour band. Adopted 2006.",
    sources: [
      { title: "Флаг Калининградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KGN": {
    description:
      "White over emerald-green over white, the green band bearing two silver mounds (kurgans) one " +
      "behind the other, taken from the region’s arms. The mounds refer to the region’s name (kurgan " +
      "means “burial mound”) and its geography and history. Adopted 1997.",
    sources: [
      { title: "Флаг Курганской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%83%D1%80%D0%B3%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KHA": {
    description:
      "White over blue with a green isosceles triangle at the hoist. White stands for purity, modesty " +
      "and a peaceful sky; blue for beauty, grandeur and the region’s vast waters; green for hope, " +
      "abundance, the unique flora and fauna and the boundless taiga. Adopted 1994.",
    sources: [
      { title: "Флаг Хабаровского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-KHM": {
    description:
      "A blue-cyan band over a green band, with a white vertical stripe at the hoist bearing a white " +
      "“Siberian crown” of stylised deer antlers from the region’s arms. Blue stands for the region’s " +
      "water; green for the taiga; white for the snow that lies seven months a year, the antlers " +
      "recalling the reindeer-herding Khanty and Mansi peoples. Adopted 1995.",
    sources: [
      { title: "Флаг Ханты-Мансийского автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%BD%D1%82%D1%8B-%D0%9C%D0%B0%D0%BD%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-KIR": {
    description:
      "A broad white band over narrow green and blue bands, with the region’s red-outlined heraldic " +
      "shield at the centre. White stands for purity of moral principles, goodness and snowy winters; " +
      "green for hope, health, and the fertility and forest wealth of the land; blue for loyalty and " +
      "honesty and for the Vyatka River that united the region’s people. Adopted 2003.",
    sources: [
      { title: "Флаг Кировской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KK": {
    description:
      "Blue, white and red horizontal bands — echoing the Russian tricolour — with a green vertical " +
      "band at the hoist bearing a gold solar (solstice) sign. Green is the traditional colour of " +
      "Siberia, standing for the eternity of life, revival and the friendship of Khakassia’s peoples; " +
      "the solar sign honours the ancient peoples who carved it on stone monuments found only in " +
      "Khakassia. Adopted 2003.",
    sources: [
      { title: "Флаг Хакасии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%BA%D0%B0%D1%81%D0%B8%D0%B8" },
    ],
  },

  "RU-KL": {
    description:
      "A golden-yellow field with a blue disc at the centre enclosing a white nine-petalled lotus. The " +
      "five upper petals stand for the five continents and the four lower petals for the four cardinal " +
      "directions, expressing the Kalmyk people’s wish for friendship and cooperation with all peoples " +
      "of the world. Adopted 1993.",
    sources: [
      { title: "Флаг Калмыкии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D0%BC%D1%8B%D0%BA%D0%B8%D0%B8" },
    ],
  },

  "RU-KLU": {
    description:
      "A red band over a green band separated by a narrow silver stripe, with a gold imperial crown on " +
      "the red. Red stands for love of the homeland, courage and blood shed against invaders; the " +
      "silver stripe for pure noble thoughts, the Oka River and the girdle of the Virgin; green — the " +
      "arms’ main colour — for peace, nature, youth and eternal life; the crown for imperial authority. " +
      "Adopted 2004.",
    sources: [
      { title: "Флаг Калужской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D1%83%D0%B6%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KO": {
    description:
      "Three equal horizontal bands of blue, green and white. Blue stands for the celestial principle " +
      "and the boundless expanse of the northern spaces; green for the vast taiga (the “parma”) that is " +
      "the Komi people’s chief wealth and traditional environment; white for the whiteness of snow, the " +
      "severe beauty of nature and the region’s far-northern position. Adopted 1991 (confirmed 1997).",
    sources: [
      { title: "Флаг Коми — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%BE%D0%BC%D0%B8" },
    ],
  },

  "RU-KEM": {
    description:
      "A red field with a blue vertical band at the hoist bearing the region’s coat of arms. The arms " +
      "carry a pick and hammer for one of Russia’s major coal- and metal-mining regions and, on a red " +
      "Order-of-Lenin ribbon, the year 1943 of the oblast’s founding. Adopted 2002; present form 2020, " +
      "after the region was renamed Kemerovo Oblast–Kuzbass.",
    sources: [
      { title: "Flag of Kemerovo Oblast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kemerovo_Oblast" },
    ],
  },

  "RU-KOS": {
    description:
      "Two red vertical bands at the edges and a blue band at the centre bearing a gold ship — the main " +
      "charge of the region’s coat of arms, recalling Empress Catherine II’s river voyage to Kostroma. " +
      "Adopted 2006.",
    sources: [
      { title: "Флаг Костромской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KR": {
    description:
      "Three equal horizontal bands of red, light blue and green. Red stands for the strength and " +
      "courage of the people and their red-on-white embroidery; light blue for the republic’s lakes " +
      "and rivers, its greatness and beauty; green for nature and the hope and faith in happiness. " +
      "Adopted 1993.",
    sources: [
      { title: "Флаг Карелии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D1%80%D0%B5%D0%BB%D0%B8%D0%B8" },
    ],
  },

  "RU-KRS": {
    description:
      "Five horizontal stripes — red, silver, gold, black, red — with the region’s coat of arms at the " +
      "centre. The red stands for the bravery and blood of the inhabitants in severe trials; black for " +
      "the fertile chernozem soil; gold for the grain fields; silver for the historic Kursk shield and " +
      "the purity of the people’s thoughts. The palette draws on the 1858–83 imperial banner. Adopted " +
      "1996.",
    sources: [
      { title: "Флаг Курской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KYA": {
    description:
      "A red field bearing the krai’s coat of arms at the centre — a golden lion holding a spade and a " +
      "sickle, for the region’s mining and agriculture. The law specifies the design without assigning " +
      "a separate meaning to the red field. Adopted 2000.",
    sources: [
      { title: "Флаг Красноярского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-LEN": {
    description:
      "A white field with the region’s coat of arms and, along the foot, wavy stripes of red, light " +
      "blue and white. The main colours repeat the Russian tricolour to show the region’s unity with " +
      "the country; the waves stand for its position on the Gulf of Finland and its 1,800 lakes and " +
      "25,000 rivers. The arms carry a fortress wall, a silver anchor and a gold key. Adopted 1997.",
    sources: [
      { title: "Флаг Ленинградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-LIP": {
    description:
      "A red field with a golden linden tree standing on five green hills. This is a “canting” flag — " +
      "the linden (lipa) names Lipetsk — and stands for cordiality and life; the five green hills are " +
      "the region and the four neighbours from whose lands it was formed in 1954, and the fertile " +
      "chernozem soil; red is the labour of its metallurgists and machine-builders. Adopted 2003.",
    sources: [
      { title: "Флаг Липецкой области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9B%D0%B8%D0%BF%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-MAG": {
    description:
      "A scarlet field with the region’s coat of arms in the upper hoist over a blue V-shaped stripe " +
      "with two white wavy bands. The arms show gold and silver ingots with a geologist’s hammer and " +
      "pick (mining), a dam and aircraft (energy and transport) and three fish (fishing) — the region’s " +
      "chief industries. Adopted 2001.",
    sources: [
      { title: "Флаг Магаданской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D0%B3%D0%B0%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ME": {
    description:
      "A white (silver) field with a red vertical band of Mari ornament at the hoist and the state coat " +
      "of arms at the centre. White is an ancient Mari symbol of purity, goodness and good intent; the " +
      "arms bear a rearing red bear — protector of the forest — with sword and hammer, a shield with " +
      "the Mari cross of fertility, and a crown stylising the letter “M.” Adopted 2011.",
    sources: [
      { title: "Флаг Марий Эл — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D1%80%D0%B8%D0%B9_%D0%AD%D0%BB" },
    ],
  },

  "RU-MO": {
    description:
      "Three horizontal bands of dark red, white and dark blue, the white one bearing a dark-red " +
      "eight-pointed solar rosette — a symbol of the sun in Mordovian folk ornament. Adopted 1995. The " +
      "law specifies the sun sign but gives no separate meaning for each colour band.",
    sources: [
      { title: "Флаг Мордовии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%BE%D1%80%D0%B4%D0%BE%D0%B2%D0%B8%D0%B8" },
    ],
  },

  "RU-MUR": {
    description:
      "A broad blue band over a narrow red one, the blue bearing a golden aurora borealis of rays " +
      "spreading upward from a triple arc. The northern lights are the characteristic natural " +
      "phenomenon of this Arctic region. Adopted 2004.",
    sources: [
      { title: "Флаг Мурманской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D1%83%D1%80%D0%BC%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NEN": {
    description:
      "Horizontal bands of white, blue and green, the blue one edged with a traditional Northern " +
      "ornament of white and blue rafters — the “khor lambei” (reindeer antlers) of the Nenets. Silver " +
      "stands for nobility, purity and truthfulness; azure for magnanimity, fidelity and the sky; green " +
      "for hope, abundance, freedom and the meadow grass. Adopted 2003.",
    sources: [
      { title: "Флаг Ненецкого автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%B5%D0%BD%D0%B5%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-NGR": {
    description:
      "Vertical bands of blue, white and red — recalling the flag of France — with the region’s " +
      "heraldic shield on the white. The shield shows a gold throne bearing a candelabrum and cross " +
      "sceptre and archbishop’s staff, flanked by two black bears, over two white fish — the historic " +
      "arms of Veliky Novgorod. Adopted 2007.",
    sources: [
      { title: "Флаг Новгородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NIZ": {
    description:
      "A white field bearing the region’s coat of arms — a crowned red deer walking toward the hoist, " +
      "with black hooves and antlers, the historic emblem of Nizhny Novgorod, set on ermine ornament. " +
      "Adopted 2005.",
    sources: [
      { title: "Флаг Нижегородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%B8%D0%B6%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NVS": {
    description:
      "Five vertical bands of red, white, blue, white and green, with two black sables holding a gold " +
      "loaf and salt across the centre. White stands for purity, faith and the harsh Siberian winter; " +
      "green for hope, abundance and the region’s natural wealth; red for courage and the heroism of " +
      "its defenders; blue for the Ob River and the many lakes covering nearly a third of the region. " +
      "Adopted 2003.",
    sources: [
      { title: "Флаг Новосибирской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-OMS": {
    description:
      "Two red vertical bands at the edges and a white band at the centre carrying a wavy blue stripe. " +
      "Red stands for valour, fearlessness, life, mercy and love; white for nobility, purity and " +
      "justice and the Siberian climate; the wavy blue stripe for the Irtysh, the region’s main river, " +
      "and for beauty and grandeur. Adopted 2003.",
    sources: [
      { title: "Флаг Омской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9E%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ORE": {
    description:
      "A red field bearing the full coat of arms of Orenburg Oblast at the centre. Adopted 1997; the " +
      "law specifies the design without assigning a separate meaning to the red field.",
    sources: [
      { title: "Флаг Оренбургской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-PER": {
    description:
      "A white cross divides the field into four quarters — red and blue above, blue and red below — " +
      "with the krai’s coat of arms at the centre. White stands for purity, goodness and the peaceful, " +
      "clean thoughts of the people; blue for the warmth of human relations and the waters of the Kama " +
      "and the region’s many rivers and lakes; red for the bravery of the inhabitants. Adopted 2007.",
    sources: [
      { title: "Флаг Пермского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D0%B5%D1%80%D0%BC%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-PNZ": {
    description:
      "Bands of green and yellow bearing the region’s coat of arms — three gold wheat sheaves bound " +
      "with crimson ribbons. Green stands for nature, forests, fertility and health; yellow for the " +
      "fields, wisdom, light and an abundant harvest. Adopted 2022, replacing a 2002 flag that showed " +
      "the Saviour-Not-Made-by-Hands.",
    sources: [
      { title: "Флаг Пензенской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D0%B5%D0%BD%D0%B7%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-PRI": {
    description:
      "A field divided diagonally by a white stripe into a red upper triangle at the hoist and a blue " +
      "lower one, with a gold walking Amur tiger in the upper hoist. Red stands for the courage, " +
      "valour and sacrifice of the region’s people; blue for honesty, loyalty and the beauty of the " +
      "sea; the white stripe for purity and the unity of the region with Russia. The Amur tiger is the " +
      "region’s heraldic emblem. Adopted 1995.",
    sources: [
      { title: "Флаг Приморского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-PSK": {
    description:
      "A light-blue field bearing the charges of the Pskov arms — a gold leopard (bars) beneath a hand " +
      "issuing from a cloud — with a white vertical band of the traditional Pskov “begunets” brick " +
      "ornament at the hoist. Adopted 2018; the law gives the design without a separate meaning for " +
      "each element.",
    sources: [
      { title: "Флаг Псковской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ROS": {
    description:
      "Horizontal bands of blue, yellow and red with a white vertical stripe at the hoist. The three " +
      "bands come from the 1918 Don Cossack flag, where they stood for the union of the region’s three " +
      "peoples — the Don Cossacks (blue), the Kalmyks (yellow) and the Russians (red); the white stripe, " +
      "added in 1996, stands for the region’s unity with Russia. Adopted 1996.",
    sources: [
      { title: "Флаг Ростовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-RYA": {
    description:
      "Horizontal bands of white, yellow and red, the yellow one bearing the standing prince from the " +
      "region’s arms. Gold stands for wealth, justice and, in Orthodox tradition, eternity and " +
      "holiness; red for courage and strength; white for purity and spirituality. The prince recalls " +
      "St Oleg of Ryazan, builder and protector of the land. Adopted 2000.",
    sources: [
      { title: "Флаг Рязанской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D1%8F%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SA": {
    description:
      "A broad blue field with a central white disc, over narrow bands of white, red and green. The " +
      "white disc on blue is the Arctic sun at its zenith and the continuity of generations — the Sakha " +
      "considered themselves “children of the white sun”; blue is honour and loyalty; white the beauty " +
      "and severity of the North; red loyalty to the homeland; green the brief Yakut summer and the " +
      "taiga. Adopted 1992.",
    sources: [
      { title: "Флаг Якутии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D0%BA%D1%83%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-SAK": {
    description:
      "A sea-wave blue field (blue with an emerald tint) bearing the white outlines of Sakhalin Island " +
      "and the Kuril Islands set diagonally — the territory that forms the united Sakhalin Oblast. One " +
      "of the few flags to depict a map of its territory. Adopted 1995.",
    sources: [
      { title: "Флаг Сахалинской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D1%85%D0%B0%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SAM": {
    description:
      "Three horizontal bands of red, white and blue with the region’s coat of arms at the centre. " +
      "White stands for nobility and candour; blue for loyalty, honesty and virtue; red for courage, " +
      "boldness and love. The colours echo the historic Samara Banner carried in the Slavic peoples’ " +
      "struggle against Ottoman rule. Adopted 1998.",
    sources: [
      { title: "Флаг Самарской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SAR": {
    description:
      "A white band over a red band (2:1), with the region’s coat of arms — three silver sturgeons — " +
      "within a wreath of oak, laurel and wheat on the white. Adopted 2001; the law specifies the " +
      "design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Флаг Саратовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D1%80%D0%B0%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SE": {
    description:
      "Three equal horizontal bands of white, red and gold. White stands for moral and spiritual " +
      "purity; red for courage, strength and honour; gold for abundance, well-being and prosperity. The " +
      "three correspond to the three-part structure of ancient society reflected in the Ossetian Nart " +
      "epic. Adopted 1994.",
    sources: [
      { title: "Флаг Северной Осетии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%9E%D1%81%D0%B5%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-SMO": {
    description:
      "A red field with two yellow stripes low across it and the region’s abbreviated coat of arms " +
      "(shield and crown) in the upper hoist. Red is the field of battle — Smolensk land being a great " +
      "historical battlefield; the yellow is the colour of the birds Gamayun and the Phoenix, for a " +
      "city that twice rose from the ashes (1812 and 1941–45), and forms a scheme of the Order of " +
      "Lenin. Adopted 1998.",
    sources: [
      { title: "Флаг Смоленской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SPE": {
    description:
      "A red field bearing the historic arms of the city: two crossed silver anchors — one sea, one " +
      "river, for the maritime and river port — behind a gold sceptre topped by the double-headed " +
      "eagle. Adopted 1992; it was the first territorial flag entered in Russia’s State Heraldic " +
      "Register.",
    sources: [
      { title: "Флаг Санкт-Петербурга — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B0" },
    ],
  },

  "RU-STA": {
    description:
      "A gold field with a white cross and the region’s coat of arms at its centre. Gold marks a sunny " +
      "southern land of golden grain and golden fleece, standing for richness and fertility; the white " +
      "cross recalls the name Stavropol (Greek for “city of the cross”), the region’s Orthodox role in " +
      "the North Caucasus, and its crossroads position. Adopted 1997.",
    sources: [
      { title: "Флаг Ставропольского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-SVE": {
    description:
      "A broad white band over a blue band, with a narrow white stripe above a green band along the " +
      "foot. White stands for purity; blue for sincerity and honour; green for freedom and the wealth " +
      "of Ural nature. The white and blue also echo the Russian flag. Adopted 2005.",
    sources: [
      { title: "Флаг Свердловской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B2%D0%B5%D1%80%D0%B4%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TA": {
    description:
      "Green over red, separated by a thin white stripe. Green stands for the greenery of spring and " +
      "rebirth; white for purity; red for the maturity, energy, strength and life of the peoples of " +
      "Tatarstan. Adopted 1991.",
    sources: [
      { title: "Флаг Татарстана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B0%D1%82%D0%B0%D1%80%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },

  "RU-TAM": {
    description:
      "Two equal vertical bands of red and blue with the region’s coat of arms at the centre. Red " +
      "stands for the courage, resilience and solidarity of the inhabitants and recalls historic " +
      "Russian banners; blue for the grandeur, natural beauty and purity of the Tambov land and for " +
      "loyalty to tradition. Adopted 2005.",
    sources: [
      { title: "Флаг Тамбовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B0%D0%BC%D0%B1%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TOM": {
    description:
      "A white field bearing the region’s coat of arms at the centre. The white and green of the arms " +
      "and flag are traditional Siberian colours — green for the forest, white for the snow. Adopted " +
      "1997.",
    sources: [
      { title: "Флаг Томской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%BE%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TUL": {
    description:
      "A red field bearing the charges of the region’s arms: a horizontal white sword blade over two " +
      "crossed sword blades, accompanied above and below by gold hammers — emblems of Tula’s historic " +
      "arms and armaments industry. Adopted 2005.",
    sources: [
      { title: "Флаг Тульской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TVE": {
    description:
      "A red central panel bearing the region’s emblem, flanked by two gold vertical bands. The emblem " +
      "is a throne with a high back bearing the Cap of Monomakh on a green cushion — the historic arms " +
      "of the Principality of Tver, approved by Catherine II in 1780. Adopted 1996.",
    sources: [
      { title: "Флаг Тверской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TY": {
    description:
      "A blue field with a yellow wedge at the hoist from which white diagonal stripes run to meet in a " +
      "central white band. Blue stands for the pure boundless sky and the valour and harmony of the " +
      "Tuvans; white for purity, nobility and the milk-tea offered to guests; gold for wealth, justice " +
      "and the region’s Buddhist and shamanist faiths. The diagonal stripes are the Biy-Khem and " +
      "Kaa-Khem rivers meeting to form the Yenisei at Kyzyl. Adopted 1992.",
    sources: [
      { title: "Флаг Тывы — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%8B%D0%B2%D1%8B" },
    ],
  },

  "RU-TYU": {
    description:
      "Three horizontal bands of white, blue and green with a red triangle at the hoist and three " +
      "yellow crowns shaped as deer antlers on the blue band. The antler-crowns are a traditional " +
      "ornament of the region’s northern peoples, the first taken from the region’s coat of arms. " +
      "Adopted 1995 (present form 2008).",
    sources: [
      { title: "Флаг Тюменской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-UD": {
    description:
      "Three equal vertical bands of black, white and red, the white one bearing a red eight-pointed " +
      "solar “cross-arrow.” Black stands for earth and stability; white for the cosmos and purity of " +
      "moral principles; red for the sun and life. The solar sign is a traditional amulet believed to " +
      "guard its bearer from misfortune. Adopted 1993.",
    sources: [
      { title: "Флаг Удмуртии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A3%D0%B4%D0%BC%D1%83%D1%80%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-ULY": {
    description:
      "A blue field with a white column on a pedestal, topped by the Imperial Crown with blue ribbons " +
      "to the sides — the historic emblem of Simbirsk (now Ulyanovsk), a symbol of statehood and " +
      "steadfastness. Adopted 2013.",
    sources: [
      { title: "Флаг Ульяновской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A3%D0%BB%D1%8C%D1%8F%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VGG": {
    description:
      "A red field bearing a white image of the Motherland Calls statue of Mamayev Kurgan, with two " +
      "blue vertical stripes at the hoist. Red recalls the historic Tsaritsyn regiments and the courage " +
      "and sacrifice of the region’s defenders; the statue embodies the heroism of the Battle of " +
      "Stalingrad; the two blue stripes are the Volga and the Don. Adopted 2000.",
    sources: [
      { title: "Флаг Волгоградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BE%D0%BB%D0%B3%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VLA": {
    description:
      "A red field bearing the gold coat of arms of Vladimir — a crowned lion rampant — with a " +
      "light-blue band at the hoist carrying a gold hammer and sickle. Based on the RSFSR flag, it " +
      "unusually combines Soviet emblems with the region’s historic crowned lion. Adopted 1999.",
    sources: [
      { title: "Флаг Владимирской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VOR": {
    description:
      "A red field with a gold mountain of stones issuing from the hoist, on whose slope a white " +
      "overturned pitcher pours white water. The pitcher and water stand for the fertility of the land " +
      "and the Voronezh River and the diligence of the people; the gold mountain for the steep right " +
      "bank of Voronezh and for abundance. Drawn from the city’s 1781 arms. Adopted 2005.",
    sources: [
      { title: "Флаг Воронежской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VLG": {
    description:
      "A white field with a red vertical band at the fly and, in the upper hoist, the region’s red seal " +
      "charge — a hand emerging from a cloud holding an orb and a sword, with a crown above. Adopted " +
      "1997.",
    sources: [
      { title: "Flag of Vologda Oblast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vologda_Oblast" },
    ],
  },

  "RU-YAN": {
    description:
      "A bright blue-cyan field with a white “Deer Horns” ornament, framed by red and blue bands, along " +
      "the foot. Blue stands for the sea, sky and Yamal’s natural gas; white for purity, independence " +
      "and the long severe winters; the reindeer-antler ornament for the herding life of the region’s " +
      "indigenous peoples on the white snows. Adopted 1996.",
    sources: [
      { title: "Флаг Ямало-Ненецкого автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D0%BC%D0%B0%D0%BB%D0%BE-%D0%9D%D0%B5%D0%BD%D0%B5%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-YAR": {
    description:
      "A yellow field bearing a black bear standing on its hind legs and holding a white axe on its " +
      "shoulder — the historic emblem of Yaroslavl, matching the figure on the region’s coat of arms. " +
      "Adopted 2001.",
    sources: [
      { title: "Флаг Ярославской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-YEV": {
    description:
      "A white field with a horizontal rainbow of seven narrow bands across the centre. White stands " +
      "for purity; the rainbow is a biblical symbol of peace, happiness and good, and its seven stripes " +
      "recall the seven candles of the menorah and the seven days of creation — a nod to the region’s " +
      "Jewish heritage. Adopted 1996.",
    sources: [
      { title: "Флаг Еврейской автономной области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%95%D0%B2%D1%80%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ZAB": {
    description:
      "Green over red bands with a yellow triangle at the hoist. Yellow stands for the boundless " +
      "steppe; green for the taiga and its rich wildlife; red for the region’s energy and mineral " +
      "resources. The layout derives from a palisade element on the 1859 arms of Zabaykalsky Oblast. " +
      "Adopted 2009.",
    sources: [
      { title: "Флаг Забайкальского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%97%D0%B0%D0%B1%D0%B0%D0%B9%D0%BA%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "JP-10": {
    description:
      "A purple field with a white emblem: the old form of the kanji “群” (gun, “group”) drawn as a " +
      "circle for the harmony of the people, framed by three white crescents for the Jōmō Three " +
      "Mountains (Akagi, Haruna and Myōgi) expressing an advancing Gunma. Purple recalls the refined " +
      "culture of the ancient Kōzuke province. Adopted 1968 for the Meiji centennial.",
    sources: [
      { title: "群馬県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%BE%A4%E9%A6%AC%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-12": {
    description:
      "A sky-blue field — for hope and development — bearing the prefectural emblem in white edged with " +
      "a thin yellow border evoking the rapeseed blossom (nanohana), the prefectural flower. The emblem, " +
      "dating to 1909, combines the kana “チ” and “ハ” (chi-ha). Flag adopted 1963.",
    sources: [
      { title: "千葉県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%8D%83%E8%91%89%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-15": {
    description:
      "A red field with a gold emblem: a stylised kanji “新” (shin, “new”) above a circle flanked by the " +
      "kana “ガ” and “タ” (ga-ta) set like a necklace, expressing harmony, hope and the prefecture’s " +
      "smooth development. Adopted 1963.",
    sources: [
      { title: "新潟県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%96%B0%E6%BD%9F%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-17": {
    description:
      "A blue field with a white emblem: the kanji “石川” (Ishikawa) stylised into the shape of the Noto " +
      "Peninsula. The blue stands for the Sea of Japan and the prefecture’s greenery, clean water and " +
      "clear air. Ishikawa sets no separate emblem, so this flag design also serves as its emblem. " +
      "Adopted 1972.",
    sources: [
      { title: "石川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%9F%B3%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-18": {
    description:
      "A navy-blue field with a white emblem combining the kana “フ,” “ク” and “イ” (fu-ku-i) into a " +
      "circle said to resemble young leaves sprouting between two leaves, carrying the wish for the " +
      "prefecture’s development. One of the oldest prefectural emblems. Adopted 1952.",
    sources: [
      { title: "福井県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E4%BA%95%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-21": {
    description:
      "A white field with a green emblem: an abbreviated kanji “岐” (gi) enclosed in a circle, the green " +
      "standing for the beauty of the prefecture’s nature. The emblem was designated 1932; the flag " +
      "arose as a de-facto standard through use.",
    sources: [
      { title: "岐阜県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%90%E9%98%9C%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-24": {
    description:
      "A blue-green field — combining the green of the mountains with the blue of the roughly " +
      "1,000-km coastline — with a white emblem: the hiragana “み” (mi) shaped as an upward arrow for " +
      "the prefecture’s advancement, and a circle at lower left for the world-renowned pearl " +
      "cultivation of Ago Bay. Adopted 1964.",
    sources: [
      { title: "三重県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%B8%89%E9%87%8D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-25": {
    description:
      "A light-blue field for the surface of Lake Biwa, with a white emblem combining the kana “シ” and " +
      "“ガ” (shi-ga) in a circle for harmony; the inner circle is Lake Biwa and the wings the " +
      "prefecture’s leap forward. Emblem designated 1957; flag adopted 1968.",
    sources: [
      { title: "滋賀県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%BB%8B%E8%B3%80%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-28": {
    description:
      "A cerulean-blue field with a white kanji “兵” (hyō) drawn as waves, representing a prefecture " +
      "that faces both the Sea of Japan and the Seto Inland Sea. Cerulean stands for youth, white for " +
      "brightness and sincerity. Adopted 1964.",
    sources: [
      { title: "兵庫県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%85%B5%E5%BA%AB%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-30": {
    description:
      "A white field with a dark navy-blue emblem: the kana “ワ” (wa) drawn as a fan, standing for the " +
      "limitless development of the Kishū region toward tomorrow and the progressive spirit of the " +
      "people. Adopted 1969.",
    sources: [
      { title: "和歌山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%92%8C%E6%AD%8C%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-31": {
    description:
      "A navy-blue field with a white emblem: a flying bird formed from the hiragana “と” (to), standing " +
      "for freedom, peace and the prefecture’s progress toward the future. Adopted 1968 for the Meiji " +
      "centennial.",
    sources: [
      { title: "鳥取県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%B3%A5%E5%8F%96%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-33": {
    description:
      "An eggplant-navy field with a gold emblem: the kanji “岡” (oka, “hill”) drawn as a circle, " +
      "standing for the unity of the people and the prefecture’s development and advancement. Adopted " +
      "1967.",
    sources: [
      { title: "岡山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%A1%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-35": {
    description:
      "A deep reddish-brown (ebicha) and white flag whose emblem combines the kanji “山” and “口” " +
      "(Yamaguchi) into a circle for the unity and advancement of the people, with a bird flying toward " +
      "the sun. Adopted 1962 for the prefecture’s 90th anniversary.",
    sources: [
      { title: "山口県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E5%8F%A3%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-37": {
    description:
      "An olive-green field with a white emblem based on the kana “カ” (ka) combined with the " +
      "prefecture’s mountain ranges and olive leaves — a symbol of peace — expressing its blessed " +
      "nature and development. Adopted 1977.",
    sources: [
      { title: "香川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%A6%99%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-38": {
    description:
      "A flag bearing the blossom of the mikan (mandarin orange), the prefectural flower, on a green " +
      "and yellow field: the white petals stand for simplicity and purity, green for peace and hope, " +
      "and yellow for happiness. Adopted 1952.",
    sources: [
      { title: "愛媛県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-40": {
    description:
      "A blue field with a white emblem combining the kana “ふ” and “く” (fu-ku) drawn as plum blossoms, " +
      "the prefectural flower, standing for peace, the prefecture’s development, and the harmony and " +
      "progress of its people. Adopted 1966.",
    sources: [
      { title: "福岡県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B2%A1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-41": {
    description:
      "A deep-green field bearing a stylised camphor-tree (kusu) flower, the prefectural flower: white " +
      "petals for public integrity and purity, crimson stamens and pistils for sincerity and passion, " +
      "the six petals expressing harmony and vigorous development. Adopted 1968.",
    sources: [
      { title: "佐賀県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%BD%90%E8%B3%80%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-42": {
    description:
      "A water-blue field with a white emblem based on the letter “N,” deformed into a dove for peace " +
      "with a sphere for the bright sea, sky and earth, expressing the prefecture’s international " +
      "character. Adopted 1991, replacing an earlier crane mark used from 1925.",
    sources: [
      { title: "長崎県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%95%B7%E5%B4%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-44": {
    description:
      "A white field with a red emblem of three kanji “大” (dai) joined into a ring like a rising sun. " +
      "The three characters stand for integrity, diligence and friendship; the ring for harmony, peace " +
      "and cooperation. Red is the sincerity of the people, white peace and equality. Adopted 1956.",
    sources: [
      { title: "大分県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A4%A7%E5%88%86%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-45": {
    description:
      "A green field — for the fertile land — with three yellow diamonds set diagonally, forming the " +
      "kana “ミ” (mi) and depicting sunlight pouring down on the prefecture’s soil. Adopted 1964.",
    sources: [
      { title: "宮崎県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AE%AE%E5%B4%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "UA-05": {
    description:
      "A blue field with a red stripe along the top and bottom edges, bearing at the centre a golden sun " +
      "(the emblem of Podilia) and a silver cross with a blue shield holding a silver crescent (the " +
      "emblem of eastern Podilia/Bratslav). Blue is the historic colour of the Podilian land; the red " +
      "stripes recall the Bratslav Voivodeship; the two blue edges also stand for the Dniester and " +
      "Southern Bug rivers. Adopted 1997.",
    sources: [
      { title: "Прапор Вінницької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-07": {
    description:
      "A red field — the colour of ripe cherries — with a white cross reaching to the edges, and a " +
      "historic 15th–18th-century cross emblem in the upper hoist. Developed from the historical " +
      "traditions of the Volyn region. Adopted 1997.",
    sources: [
      { title: "Прапор Волинської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%92%D0%BE%D0%BB%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-12": {
    description:
      "A field divided by a diagonal band into blue (upper hoist) and white (lower fly), reproducing " +
      "graphic elements of the oblast’s lesser coat of arms. Adopted 2002.",
    sources: [
      { title: "Прапор Дніпропетровської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%94%D0%BD%D1%96%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-14": {
    description:
      "A flag split into an upper blue half with a golden 12-rayed rising sun and a lower black half " +
      "with five vertical golden ovals. The upper field stands for the east of Ukraine; the lower for " +
      "coal, the earth and the night-time Sea of Azov with golden reflections. Adopted 1999.",
    sources: [
      { title: "Прапор Донецької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%94%D0%BE%D0%BD%D0%B5%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-09": {
    description:
      "A cobalt-blue field with a circular emblem in the upper hoist: a ring of stars — 17 gold and 14 " +
      "white for the oblast’s 17 districts and 14 cities — around a small shield bearing the oblast’s " +
      "coat of arms. Adopted 1998.",
    sources: [
      { title: "Прапор Луганської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9B%D1%83%D0%B3%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-18": {
    description:
      "A red field with a yellow cross reaching the edges and the coat of arms of the city of Zhytomyr " +
      "at the centre. Adopted 2003.",
    sources: [
      { title: "Прапор Житомирської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-21": {
    description:
      "Blue over yellow with the oblast’s quartered coat of arms in the hoist — three gold bars on blue " +
      "and a red bear on silver. The blue and yellow have long regional roots (recorded from 1709 and " +
      "used by Carpathian Ukraine in 1919); the bear derives from the 1920 arms of Subcarpathian " +
      "Ruthenia. Adopted 2009.",
    sources: [
      { title: "Прапор Закарпатської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%97%D0%B0%D0%BA%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-23": {
    description:
      "A crimson field bearing the oblast’s full coat of arms — a Cossack with sabre and musket, with " +
      "the mace, bunchuk and other Cossack symbols of authority. Crimson was the main colour of the " +
      "Zaporozhian Cossack banners and today symbolises Cossackdom itself. Adopted 2001.",
    sources: [
      { title: "Прапор Запорізької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B7%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-26": {
    description:
      "A white field with a black crowned jackdaw (kavka) facing the hoist — the region’s historic " +
      "emblem — flanked by red-black bands at the hoist and blue-yellow bands at the fly. The striped " +
      "bands embody the region’s traditions of struggle for Ukrainian independence. Adopted 2001.",
    sources: [
      { title: "Прапор Івано-Франківської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%86%D0%B2%D0%B0%D0%BD%D0%BE-%D0%A4%D1%80%D0%B0%D0%BD%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-30": {
    description:
      "A blue field bearing the figure of the Archangel Michael — the city’s patron saint — with a " +
      "flaming sword and shield, framed by a gold fringed band. Adopted 1995, restoring the city’s " +
      "historic heraldic emblem.",
    sources: [
      { title: "Прапор Києва — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D0%B8%D1%94%D0%B2%D0%B0" },
    ],
  },

  "UA-32": {
    description:
      "Three vertical bands of blue, yellow and blue, the yellow one bearing St George slaying the " +
      "dragon — the figure from the oblast’s coat of arms. Adopted 1999.",
    sources: [
      { title: "Прапор Київської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-35": {
    description:
      "Two vertical bands of crimson and yellow, the crimson one bearing a yellow eagle. The eagle " +
      "stands for courage, insight and strength and for the native land inherited from ancestors; gold " +
      "for wealth and justice; crimson for dignity and might. Adopted 1998.",
    sources: [
      { title: "Прапор Кіровоградської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D1%96%D1%80%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-40": {
    description:
      "A red field bearing the coat of arms of the city of Sevastopol at the centre. Adopted 2000.",
    sources: [
      { title: "Прапор Севастополя — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A1%D0%B5%D0%B2%D0%B0%D1%81%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D1%8F" },
    ],
  },

  "UA-43": {
    description:
      "Three horizontal bands — a narrow blue at the top, a broad white in the middle and a narrow red " +
      "at the foot. Adopted 1992 as the flag of the Autonomous Republic of Crimea within Ukraine; the " +
      "law states the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Прапор Автономної Республіки Крим — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%90%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D1%97_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D1%96%D0%BA%D0%B8_%D0%9A%D1%80%D0%B8%D0%BC" },
    ],
  },

  "UA-46": {
    description:
      "A blue field bearing the oblast’s coat of arms — a golden crowned lion. Adopted 2001.",
    sources: [
      { title: "Прапор Львівської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-48": {
    description:
      "A white band over yellow and blue bands, the lower blue one with a wavy upper edge, and the " +
      "oblast’s small coat of arms at the centre. White stands for purity and the region’s shipbuilding " +
      "and maritime traditions; yellow for the fertile steppe soil; blue for water, stability and " +
      "loyalty, the wave for the Black Sea and the Southern Bug and Inhul rivers. Adopted 2026.",
    sources: [
      { title: "Прапор Миколаївської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-51": {
    description:
      "Three vertical bands of yellow, blue and white, the blue one bearing the oblast’s coat of arms " +
      "(without crown). Adopted 2002.",
    sources: [
      { title: "Прапор Одеської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9E%D0%B4%D0%B5%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-53": {
    description:
      "A blue field with a yellow Cossack cross, modelled on the banner of the Poltava Regiment of the " +
      "Zaporozhian Host. Adopted 2000.",
    sources: [
      { title: "Прапор Полтавської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9F%D0%BE%D0%BB%D1%82%D0%B0%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-56": {
    description:
      "Five horizontal stripes — white, yellow, light blue, yellow, white — with the oblast’s coat of " +
      "arms in a yellow cartouche at the centre. White is the colour of the cloth; the light blue and " +
      "yellow are the colours of Ukraine’s national flag. Adopted 2005.",
    sources: [
      { title: "Прапор Рівненської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-59": {
    description:
      "A blue field bearing the oblast’s coat of arms at the centre. Adopted 2000.",
    sources: [
      { title: "Прапор Сумської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A1%D1%83%D0%BC%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-61": {
    description:
      "A blue field with a crossed yellow sword and key beneath three white towers — the charges of the " +
      "oblast’s arms. Adopted 2003.",
    sources: [
      { title: "Прапор Тернопільської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A2%D0%B5%D1%80%D0%BD%D0%BE%D0%BF%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-63": {
    description:
      "A crimson field bearing the oblast’s coat of arms at the centre, representing the history and " +
      "traditions of the region. Adopted 1999.",
    sources: [
      { title: "Прапор Харківської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%B0%D1%80%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-65": {
    description:
      "Three horizontal bands of blue, white and blue (the white twice as wide), with the oblast’s coat " +
      "of arms on the white band near the hoist. Adopted 2001.",
    sources: [
      { title: "Прапор Херсонської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-68": {
    description:
      "Two vertical bands, blue at the hoist and red at the fly, with the oblast’s coat of arms at the " +
      "centre: a gold sun and two wheat stalks over a blue-and-red shield. The sun is the traditional " +
      "symbol of Podilia; the red comes from the arms of Volyn; the wheat stalks stand for the region’s " +
      "farming and form the letter “Kh” of its name. Adopted 2002.",
    sources: [
      { title: "Прапор Хмельницької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-71": {
    description:
      "A blue field with the oblast’s coat of arms at the centre and a yellow fringe on three sides. " +
      "Blue symbolises celestial height and dignity. Adopted 2000.",
    sources: [
      { title: "Прапор Черкаської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BA%D0%B0%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-74": {
    description:
      "A green field with a white horizontal band across the centre and the oblast’s coat of arms in " +
      "the upper hoist. Green stands for the Polissia and forest-steppe; the white band for the Desna " +
      "River. The arms bear the black double-headed eagle of the historic Chernihiv principality. " +
      "Adopted 2000.",
    sources: [
      { title: "Прапор Чернігівської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-77": {
    description:
      "A green field with a white falcon at the centre and blue and yellow stripes along the top and " +
      "bottom edges. The falcon is the protective symbol of Bukovina — beauty, courage and wisdom — " +
      "drawn from a heraldic find at Zamchysche; green is the green Bukovina and rebirth; the blue and " +
      "yellow bands are Ukraine’s colours and the Prut and Dniester rivers and the grain fields. " +
      "Adopted 2001.",
    sources: [
      { title: "Прапор Чернівецької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },















  "HR-01": {
    description:
      "Five horizontal stripes alternating green and white, with a central emblem showing the " +
      "Manduševac spring (the historic well of Zagreb’s main square) together with the Croatian " +
      "chequy shield, the marten of Slavonia and the leopard of Dalmatia; green and white lines at the " +
      "lower hoist stand for the Sava and Kupa rivers.",
    sources: [
      { title: "Zastava Zagrebačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Zagreba%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-17": {
    description:
      "A golden band at the hoist (one third) and a blue field (two thirds), with the county’s coat of " +
      "arms — the golden crown of King Zvonimir on blue — set in the gold. The crown is drawn from a " +
      "relief in the baptistery of the Cathedral of St Domnius in Split and recalls medieval Croatian " +
      "kingship.",
    sources: [
      { title: "Zastava Splitsko-dalmatinske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Splitsko-dalmatinske_%C5%BEupanije" },
    ],
  },

  "HR-18": {
    description:
      "A blue-green field bearing the county’s coat of arms: a golden goat facing the hoist with red " +
      "hooves and horns on a blue shield — the historic emblem of the Istrian peninsula.",
    sources: [
      { title: "Zastava Istarske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Istarske_%C5%BEupanije" },
    ],
  },

  "HR-05": {
    description:
      "Five horizontal stripes alternating red and white, with the county’s coat of arms on the hoist " +
      "half. The arms combine a crowned red eagle, gold stars over wavy silver-and-blue bands, a walled " +
      "tower, and a central shield with a green hill, wheel and deer. The county’s historic arms were " +
      "granted by Empress Maria Theresa in 1763.",
    sources: [
      { title: "Zastava Varaždinske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Vara%C5%BEdinske_%C5%BEupanije" },
    ],
  },

  "HR-19": {
    description:
      "A horizontal bicolour of red over white with the county’s gold-bordered coat of arms at the " +
      "centre, its own red-and-white division aligned to the flag’s. Adopted 1996.",
    sources: [
      { title: "Zastava Dubrovačko-neretvanske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Dubrova%C4%8Dko-neretvanske_%C5%BEupanije" },
    ],
  },

  "HR-02": {
    description:
      "A horizontal bicolour of dark red over golden yellow, edged top and bottom with narrow gold " +
      "stripes, and the county’s gold-bordered coat of arms at the centre. The article gives the design " +
      "without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Krapinsko-zagorske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Krapinsko-zagorske_%C5%BEupanije" },
    ],
  },

  "HR-03": {
    description:
      "A blue field with a thin red-and-white stripe along the top edge and the county’s coat of arms " +
      "at the centre: a stork — for the Lonjsko Polje wetlands famed for its storks — and a downward " +
      "sword standing for the people’s defensive resolve and readiness for peace.",
    sources: [
      { title: "Zastava Sisačko-moslavačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Sisa%C4%8Dko-moslava%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-04": {
    description:
      "A horizontal bicolour of dark red over golden yellow with the county’s coat of arms at the " +
      "centre. The article gives the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Karlovačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Karlova%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-06": {
    description:
      "A red-and-blue flag bearing the county’s quartered coat of arms, edged in gold. The quarters " +
      "represent its constituent regions: a rooster for Podravina and Đurđevac, a trefoil for Prigorje, " +
      "a double cross for Križevci, and a double lily from the arms of Koprivnica.",
    sources: [
      { title: "Zastava Koprivničko-križevačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Koprivni%C4%8Dko-kri%C5%BEeva%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-08": {
    description:
      "A blue field with a narrow white stripe near the top and bottom edges and the county’s coat of " +
      "arms at the centre. The arms combine twenty alternating red and silver squares, a fortified " +
      "coastal town below green mountains, and a sailing ship flying the Croatian flag with a golden " +
      "Frankopan star — evoking the county’s coast (Primorje) and highlands (Gorski Kotar).",
    sources: [
      { title: "Zastava Primorsko-goranske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Primorsko-goranske_%C5%BEupanije" },
    ],
  },

  "HR-09": {
    description:
      "A white field with a blue stripe above and below the centre, bearing the county’s coat of arms: " +
      "a golden Velebit degenia — a rare alpine flower endemic to the region — on a blue heart-shaped " +
      "shield, standing for the area’s natural heritage.",
    sources: [
      { title: "Zastava Ličko-senjske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Li%C4%8Dko-senjske_%C5%BEupanije" },
    ],
  },

  "HR-10": {
    description:
      "A blue-white-blue horizontal field with the county’s gold-bordered coat of arms at the centre: " +
      "a marten running between two silver bands, a gold six-pointed star above and a gold anchor " +
      "below, on red. The marten is the historic emblem of the Croatian lands; the anchor recalls the " +
      "region’s riverine (Drava) heritage.",
    sources: [
      { title: "Zastava Virovitičko-podravske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Viroviti%C4%8Dko-podravske_%C5%BEupanije" },
    ],
  },

  "HR-11": {
    description:
      "A horizontal field with green at the top and bottom quarters and yellow in the middle half, " +
      "bearing the county’s coat of arms on the yellow. The article gives the design without assigning " +
      "a separate meaning to each colour.",
    sources: [
      { title: "Zastava Požeško-slavonske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Po%C5%BEe%C5%A1ko-slavonske_%C5%BEupanije" },
    ],
  },

  "HR-12": {
    description:
      "A blue-white-blue field crossed by a diagonal red-and-silver band for the River Sava, with the " +
      "county’s coat of arms at the centre. The silver band is the Sava, a symbol of fertility and " +
      "wealth; the running marten ties the region to Slavonia and Croatia; the five gold stars are " +
      "historic Croatian symbols.",
    sources: [
      { title: "Zastava Brodsko-posavske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Brodsko-posavske_%C5%BEupanije" },
    ],
  },

  "HR-13": {
    description:
      "A field divided by a wavy line, white above and blue below, with the county’s gold-bordered " +
      "coat of arms at the centre: a green olive branch with gold fruit above (the region’s agriculture) " +
      "and the white Church of the Holy Cross below (its historic and religious heritage).",
    sources: [
      { title: "Zastava Zadarske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Zadarske_%C5%BEupanije" },
    ],
  },

  "HR-14": {
    description:
      "A white field with two blue bands running its length and the county’s coat of arms at the " +
      "centre. The arms show two silver bands (the Drava and Danube rivers) on blue, a silver " +
      "three-arched bridge with a tower, a gold cross, star and anchor, and a gold marten on red.",
    sources: [
      { title: "Zastava Osječko-baranjske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Osje%C4%8Dko-baranjske_%C5%BEupanije" },
    ],
  },

  "HR-15": {
    description:
      "A blue field — for the sea — with two silver stripes along the edges for the River Krka, and the " +
      "county’s coat of arms at the centre: a gold medieval Croatian royal crown and an Old-Croatian " +
      "sword on a red shield.",
    sources: [
      { title: "Zastava Šibensko-kninske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_%C5%A0ibensko-kninske_%C5%BEupanije" },
    ],
  },

  "HR-16": {
    description:
      "Longitudinal stripes of gold and white with a scalloped (dentilated) lower edge, and the " +
      "county’s coat of arms at the centre: three silver bands for the Danube, Bosut and Sava rivers on " +
      "blue, and a resting deer with a golden collar beside a Slavonian oak — the natural wealth of the " +
      "region.",
    sources: [
      { title: "Zastava Vukovarsko-srijemske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Vukovarsko-srijemske_%C5%BEupanije" },
    ],
  },

  "HR-20": {
    description:
      "A horizontal tricolour of red, white and blue with a gold six-pointed star centred on the blue " +
      "band. The article gives the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Međimurske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Me%C4%91imurske_%C5%BEupanije" },
    ],
  },

















  "NL-DR": {
    description:
      "A white field with two red horizontal stripes, and between them a black castle tower flanked by " +
      "six red five-pointed stars (three on each side). Red and white are the traditional Saxon colours and those " +
      "of the Archbishopric of Utrecht, which once ruled Drenthe; the six stars are the six historic " +
      "dingspelen (judicial districts) and allude to the Star of Bethlehem in the province’s arms; the " +
      "tower is Coevorden Castle, seat of the bishop’s law. Adopted 1947 — the first official Dutch " +
      "provincial flag.",
    sources: [
      { title: "Vlag van Drenthe — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Drenthe" },
    ],
  },

  "NL-FR": {
    description:
      "Seven diagonal bands, alternating cobalt-blue and white, the white bands bearing seven red " +
      "“pompeblêden” (water-lily leaves) arranged 2-3-2. The seven leaves stand for the Seven Frisian " +
      "Sea Lands (and “seven” connotes “many”); the white diagonal bands are Friesland’s streams and " +
      "lakes and the blue the waters themselves. Adopted 1957.",
    sources: [
      { title: "Vlag van Friesland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Friesland" },
    ],
  },

  "NL-ZE": {
    description:
      "A blue field with three white wavy bands and the crowned coat of arms of Zeeland — a lion rising " +
      "from the waves — at the centre. The wavy bands are read either as the sea and the province’s " +
      "constant struggle against the water or as its resistance to Spanish forces; the arms have been " +
      "used since 1440. Adopted 1949.",
    sources: [
      { title: "Vlag van Zeeland (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Zeeland_(provincie)" },
    ],
  },

  "NL-GE": {
    description:
      "A horizontal tricolour of blue, yellow and black. The colours come from the province’s arms: " +
      "blue for the field of the golden lion of the Duchy of Gelre, and gold and black for the lion of " +
      "the Duchy of Jülich, joined to Gelre’s arms in the 14th century. Adopted 1953.",
    sources: [
      { title: "Vlag van Gelderland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Gelderland" },
    ],
  },

  "NL-GR": {
    description:
      "A white cross bordered green over a field quartered red and blue. The white-and-green cross is " +
      "for the city of Groningen and its central role; the red and blue quarters come from the flag of " +
      "the Ommelanden (whose blue bands were the districts Hunsingo, Fivelingo and Westerkwartier); the " +
      "cross form alludes to Scandinavian trade ties. Adopted 1950.",
    sources: [
      { title: "Vlag van Groningen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Groningen_(provincie)" },
    ],
  },

  "NL-FL": {
    description:
      "A dark-blue band over a light-green band separated by a narrow wavy yellow stripe, with a white " +
      "fleur-de-lis in the upper hoist. Blue is the water from which the province was reclaimed; green " +
      "the flat meadow landscape; yellow the ripening grain and rapeseed; the fleur-de-lis comes from " +
      "the arms of engineer Cornelis Lely, initiator of the Zuiderzee works. Adopted 1989.",
    sources: [
      { title: "Vlag van Flevoland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Flevoland" },
    ],
  },

  "NL-NB": {
    description:
      "A chequerboard of 24 red and white squares in four rows of six — the “Brabants Bont” pattern. " +
      "The red and white are the medieval colours of the Duchy of Brabant. In use since the Middle " +
      "Ages, revived and officially adopted 1959.",
    sources: [
      { title: "Vlag van Noord-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Noord-Brabant" },
    ],
  },

  "NL-NH": {
    description:
      "A horizontal tricolour of yellow, red and blue, taken from the province’s arms, which combine " +
      "Holland (yellow and red) with West-Friesland (yellow and blue); yellow sits on top because it " +
      "appears in both. Adopted 1958.",
    sources: [
      { title: "Vlag van Noord-Holland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Noord-Holland" },
    ],
  },

  "NL-OV": {
    description:
      "Five horizontal stripes — red, yellow, blue, yellow, red — the blue one drawn as three waves. " +
      "The yellow and red are the colours of Holland, marking the historic tie to it; the wavy blue " +
      "stripe is the river IJssel. Adopted 1948.",
    sources: [
      { title: "Vlag van Overijssel — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Overijssel" },
    ],
  },

  "NL-UT": {
    description:
      "A white band over a red band with a red canton at the hoist bearing a white cross. It combines " +
      "two historic flags — the white-red bicolour of the Archdiocese of Utrecht and the white cross on " +
      "red of the Sticht of Utrecht. Adopted 1952.",
    sources: [
      { title: "Vlag van Utrecht (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Utrecht_(provincie)" },
    ],
  },

  "NL-ZH": {
    description:
      "A yellow field bearing a red lion with a black outline — the banner of the arms of South " +
      "Holland. Yellow and red are the historic colours of Holland, the lion the emblem of the Counts " +
      "of Holland since the Crusades. Adopted 1986, replacing a 1948 yellow-red-yellow tricolour.",
    sources: [
      { title: "Vlag van Zuid-Holland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Zuid-Holland" },
    ],
  },

  "NL-AW": {
    description:
      "A light-blue field with a red four-pointed star fimbriated white in the upper hoist and two " +
      "yellow stripes across the lower half. Blue is the surrounding sea; yellow abundance and " +
      "solidarity (and the island’s gold and aloe); the four-pointed star the four points of the " +
      "compass and the diverse origins of Arubans; the white border peace and the beaches. Adopted 1976.",
    sources: [
      { title: "Flag of Aruba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Aruba" },
    ],
  },

  "NL-CW": {
    description:
      "A blue field with a yellow horizontal stripe below the middle and two white five-pointed stars " +
      "in the canton. The upper and lower blue are sky and sea, divided by the yellow of the bright " +
      "sun; the two stars are Curaçao and Klein Curaçao, their five points the five continents its " +
      "people descend from. Adopted 1984.",
    sources: [
      { title: "Flag of Curaçao — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cura%C3%A7ao" },
    ],
  },

  "NL-SX": {
    description:
      "A white triangle at the hoist bearing the country’s coat of arms, with horizontal bands of red " +
      "and blue. Blue is the sea and sky, red the blood of Sint Maarteners; the arms carry the yellow " +
      "sage flower, the courthouse of Philipsburg, the Dutch-French border monument and a pelican over " +
      "a sun, with the motto “Semper progrediens.” Adopted 1985.",
    sources: [
      { title: "Flag of Sint Maarten — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sint_Maarten" },
    ],
  },

  "NL-BQ1": {
    description:
      "A yellow band in the upper hoist and a dark-blue band in the lower fly, divided by a white " +
      "diagonal bearing a black ship’s compass and a red six-pointed star. Blue is the sea, yellow the " +
      "sun, white the sky; the compass is Bonaire’s seafaring people and the four cardinal directions; " +
      "the star’s six points are the island’s six original villages. Adopted 1981.",
    sources: [
      { title: "Flag of Bonaire — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bonaire" },
    ],
  },

  "NL-BQ2": {
    description:
      "Two red triangles at top and two blue triangles at bottom around a central white diamond bearing " +
      "a yellow star. The star is the island of Saba; red, white and blue mark the link with the " +
      "Netherlands — red for courage, unity and strength, white for peace, blue for the sea. Adopted " +
      "1985.",
    sources: [
      { title: "Flag of Saba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saba_(island)" },
    ],
  },

  "NL-BQ3": {
    description:
      "Four red-edged blue polygons around a white diamond that holds the green silhouette of the " +
      "island, topped by a gold star. The star is unity; the blue the surrounding ocean; the green the " +
      "volcano “the Quill”; the red the flamboyant tree tied to Emancipation Day; the white diamond a " +
      "former waterfall named in the anthem “Golden Rock.” Adopted 2004.",
    sources: [
      { title: "Flag of Sint Eustatius — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sint_Eustatius" },
    ],
  },



  "BE-BRU": {
    description:
      "A blue field with a stylised yellow iris (Iris pseudacorus). The yellow iris symbolises Brussels: " +
      "it grew in the marshes on which the city was founded, is said to have guided the Dukes of Brabant " +
      "across flooded ground, and featured on the scepter of the Carolingian founders of the city. " +
      "First adopted 1991; present stylised version 2015.",
    sources: [
      { title: "Flag of the Brussels-Capital Region — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Brussels-Capital_Region" },
    ],
  },

  "BE-VAN": {
    description:
      "A field of 24 squares (red, white, yellow and blue) set diagonally. The colours are those of the " +
      "province’s three main cities — Antwerp (red and white), Mechelen (yellow and red) and Turnhout " +
      "(white and blue) — with Antwerp’s colours emphasised in the centre rows. Adopted 1996.",
    sources: [
      { title: "Vlag van Antwerpen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Antwerpen_(provincie)" },
    ],
  },

  "BE-VBR": {
    description:
      "A black field with a yellow lion with red tongue and claws and a central heart-shield of red " +
      "with a white bar. The lion is the historic lion of the Duchy of Brabant, standing for strength, " +
      "courage and royal dignity; the heart-shield carries the colours of the capital, Leuven. Adopted " +
      "1995.",
    sources: [
      { title: "Vlag van Vlaams-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Vlaams-Brabant" },
    ],
  },

  "BE-VOV": {
    description:
      "A green field with four white horizontal stripes and a black lion with red tongue and claws. The " +
      "green stands for the province’s environmental character; the four white stripes are its four " +
      "major rivers (Scheldt, Leie, Dender and Durme); the black lion is the historic lion of the " +
      "County of Flanders. Adopted 1998.",
    sources: [
      { title: "Vlag van Oost-Vlaanderen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Oost-Vlaanderen" },
    ],
  },

  "BE-VLI": {
    description:
      "A white field with a red double-tailed crowned lion holding a shield of ten yellow-and-red bars. " +
      "The red lion is that of the medieval Duchy of Limburg (the second tail added by Walram III in " +
      "1221 for his two territories); the barred shield is the historic County of Loon, which covered " +
      "much of the province. Adopted 1996.",
    sources: [
      { title: "Vlag van Limburg (Belgische provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Limburg_(Belgische_provincie)" },
    ],
  },

  "BE-VWV": {
    description:
      "A field quartered blue and yellow in twelve pieces with a red heart-shield across the centre. " +
      "The colours derive from the province’s historic arms. Adopted 1997.",
    sources: [
      { title: "Vlag van West-Vlaanderen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_West-Vlaanderen" },
    ],
  },

  "BE-WBR": {
    description:
      "A black field with a gold Brabant lion with red tongue and claws facing the hoist, wearing a " +
      "gold cap bearing two facing red Walloon roosters. The lion is the historic Duchy of Brabant and " +
      "the former united province of Brabant; the two roosters mark the Walloon Region in which the " +
      "province lies. Adopted 1995 at the split of Brabant.",
    sources: [
      { title: "Vlag van Waals-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Waals-Brabant" },
    ],
  },

  "BE-WHT": {
    description:
      "A yellow field quartered with lions: black in the upper hoist and lower fly, red in the upper " +
      "fly and lower hoist. Drawn from the province’s arms, it combines the black lion of the County of " +
      "Hainaut with the red lion of the County of Holland, whose rulers were once shared. Used since " +
      "1815 as the province’s de-facto flag (never formally adopted).",
    sources: [
      { title: "Vlag van Henegouwen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Henegouwen" },
    ],
  },

  "BE-WLG": {
    description:
      "A banner of the province’s arms in five parts: the gold perron of Liège on red (the medieval " +
      "symbol of justice of the Prince-Bishopric), the red-white-red of Bouillon, the red-and-yellow " +
      "bars of Loon, three green lions for Verviers, and three horns for the County of Horn. Used as the " +
      "province’s de-facto flag.",
    sources: [
      { title: "Vlag van Luik (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Luik_(provincie)" },
    ],
  },

  "BE-WLX": {
    description:
      "Three equal horizontal stripes of red, white and light blue with the provincial coat of arms at " +
      "the centre. The colours are taken from the flag of the Grand Duchy of Luxembourg, from which the " +
      "province was separated in 1839. Adopted 1955.",
    sources: [
      { title: "Vlag van Luxemburg (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Luxemburg_(provincie)" },
    ],
  },

  "BE-WNA": {
    description:
      "Two vertical bands of black and red, taken from the province’s arms: black for the Namur lion " +
      "and red for the diagonal bar across its shield. Adopted 1953.",
    sources: [
      { title: "Vlag van Namen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Namen_(provincie)" },
    ],
  },

  "PT-20": {
    description:
      "A blue band at the hoist and a white field, over which nine gold stars arch above a gold " +
      "goshawk (açor) with outspread wings; the Portuguese shield sits in the canton. Blue and white " +
      "are the traditional Portuguese colours of the constitutional monarchy; the nine stars are the " +
      "archipelago’s nine islands; the goshawk gives the Azores their name; the shield marks Azorean " +
      "Portuguese patriotism. Adopted 1979.",
    sources: [
      { title: "Flag of the Azores — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Azores" },
    ],
  },

  "PT-30": {
    description:
      "A vertical triband of blue, gold and blue with the red Cross of the Order of Christ on the gold. " +
      "Blue stands for the sea and for nobility and serenity; gold for the mild climate and for wealth, " +
      "faith and constancy; the cross recalls that Madeira was discovered by knights of Henry the " +
      "Navigator, Grand Master of the Order of Christ, which owned and settled the islands. Adopted 1978.",
    sources: [
      { title: "Flag of Madeira — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Madeira" },
    ],
  },

  "MX-BCS": {
    description:
      "A white field bearing the state coat of arms at the centre. Adopted 2017 as the state’s first " +
      "official flag; the law specifies the white field and the arms without assigning a separate " +
      "colour symbolism.",
    sources: [
      { title: "Bandera de Baja California Sur — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Baja_California_Sur" },
    ],
  },

  "MX-DUR": {
    description:
      "A white field bearing the coat of arms of Durango at the centre. Adopted 2014; the law specifies " +
      "the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Durango — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Durango" },
    ],
  },

  "MX-GUA": {
    description:
      "A white field with a gold border bearing the coat of arms of Guanajuato — Saint Faith with " +
      "chalice and cross over a scallop shell and laurel, under the royal crown of Castile. White " +
      "stands for freedom, peace and harmony; gold for the region’s mining wealth. Adopted 2023 for the " +
      "state’s bicentenary.",
    sources: [
      { title: "Bandera de Guanajuato — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guanajuato" },
    ],
  },

  "MX-GRO": {
    description:
      "A white field bearing the coat of arms of Guerrero at the centre. Adopted 2019; the law " +
      "specifies the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Guerrero — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guerrero" },
    ],
  },

  "MX-JAL": {
    description:
      "Two equal vertical bands of blue and gold with the state coat of arms — two lions and a golden " +
      "pine on blue — between them. Gold stands for doing good to the poor, blue for serving the rulers " +
      "and fostering agriculture; the colours derive from the Kingdom of Galicia and Guadalajara’s " +
      "original arms. Adopted 2011 (first officialised 2008, the first Mexican state flag).",
    sources: [
      { title: "Bandera de Jalisco — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Jalisco" },
    ],
  },

  "MX-QUE": {
    description:
      "A white field bearing the coat of arms of Querétaro at the centre. Adopted 2015; the law " +
      "specifies the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Querétaro — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Quer%C3%A9taro" },
    ],
  },

  "MX-ROO": {
    description:
      "A white field bearing the coat of arms of Quintana Roo at the centre. Adopted 2013 as the " +
      "state’s first official flag; the law specifies the white field and the arms without a separate " +
      "colour symbolism.",
    sources: [
      { title: "Bandera de Quintana Roo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Quintana_Roo" },
    ],
  },

  "MX-TLA": {
    description:
      "A field divided diagonally, red at the hoist and white, with the state coat of arms at the " +
      "centre. The red and white are the colours that have identified the Tlaxcaltecs since " +
      "pre-Hispanic times — associated with the war-god Camaxtli and the Teochichimeca — and echo the " +
      "arms of Castile and León. Adopted 2016, the second Mexican state flag with a distinctive design.",
    sources: [
      { title: "Bandera de Tlaxcala — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Tlaxcala" },
    ],
  },

  "MX-YUC": {
    description:
      "A green field with five white stars at the hoist and, at the fly, three horizontal stripes of " +
      "red, white and red. Green stands for the Maya people (from “ya’ax,” green, and the sacred ceiba " +
      "tree); the five stars were the five departments of independent Yucatán and now mean freedom, " +
      "equality, identity, peace and progress; the red and white stripes mark three historical eras. " +
      "Based on the 1841 Republic of Yucatán flag; officialised as the state flag in 2024.",
    sources: [
      { title: "Bandera de Yucatán — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Yucat%C3%A1n" },
    ],
  },




  "ES-O": {
    description:
      "A blue field with a yellow Victory Cross (Cruz de la Victoria) toward the hoist, the Greek " +
      "letters Alpha and Omega hanging from its arms. The cross is the one tradition says King Pelagius " +
      "carried at Covadonga (722), regarded as the start of the Reconquista, later gilded by Alfonso " +
      "III in 908 and kept in Oviedo Cathedral. Adopted 1990.",
    sources: [
      { title: "Flag of Asturias — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Asturias" },
    ],
  },


  "ES-S": {
    description:
      "Two equal horizontal stripes, white over red, with the region’s coat of arms at the centre. The " +
      "bicolour derives from the 1845 ship-registration flag of the maritime province of Santander (the " +
      "province coextensive with Cantabria). The arms were made official in 1981.",
    sources: [
      { title: "Flag of Cantabria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cantabria" },
    ],
  },


  "ES-NA": {
    description:
      "A red field bearing the coat of arms of Navarre — gold chains around a central emerald on red, " +
      "beneath a royal crown. Red comes from the field of the arms; the chains symbolise the historic " +
      "Kingdom of Navarre. Design created 1910, adopted 1982.",
    sources: [
      { title: "Flag of Navarre — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Navarre" },
    ],
  },


  "ES-LO": {
    description:
      "Four horizontal bands of red, white, green and yellow with the coat of arms at the centre — the " +
      "flag of La Rioja (the province of Logroño). Red is the wine, white the rivers and sky, green the " +
      "fields and forests, yellow the land and monuments. Adopted 1982.",
    sources: [
      { title: "Flag of La Rioja (Spain) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_La_Rioja_(Spain)" },
    ],
  },

  "ES-M": {
    description:
      "A crimson field with seven white five-pointed stars set four-and-three. Crimson is the colour of " +
      "Castile, to which Madrid has always belonged; the seven stars stand for the historic districts " +
      "of the province and echo the constellation of the Bear (Ursa Major/Minor) from the city’s arms. " +
      "Adopted 1983.",
    sources: [
      { title: "Flag of the Community of Madrid — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Community_of_Madrid" },
    ],
  },

  "ES-MU": {
    description:
      "A crimson field with four gold castles in the upper hoist and seven royal crowns in the lower " +
      "fly. The castles recall the region’s history as a contested frontier and the four lordships it " +
      "was first divided into; the seven crowns were granted by successive kings (five by Alfonso X in " +
      "1281, and one each in 1361 and 1709) for Murcia’s loyalty. Adopted 1983.",
    sources: [
      { title: "Flag of the Region of Murcia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Region_of_Murcia" },
    ],
  },

  "ES-CE": {
    description:
      "A black-and-white gyronny (radiating triangles) with the city’s coat of arms on a central " +
      "shield. The gyronny copies the flag of Lisbon, commemorating Portugal’s 1415 conquest of Ceuta; " +
      "the arms carry Portuguese castles and escutcheons from the city’s time under Portugal until it " +
      "chose to remain Spanish in 1640. Adopted 1995.",
    sources: [
      { title: "Flag of Ceuta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ceuta" },
    ],
  },

  "ES-ML": {
    description:
      "A pale-blue field bearing the coat of arms of Melilla. The arms are those of the Ducal House of " +
      "Medina Sidonia, which funded the 1497 capture of the city, with the Pillars of Hercules as " +
      "supporters and the motto “Non Plus Ultra.” Adopted 1995.",
    sources: [
      { title: "Flag of Melilla — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Melilla" },
    ],
  },

  "ES-B": {
    description:
      "A banner of the province’s arms: the red St George’s cross of the city of Barcelona combined " +
      "with the four red bars of Aragon on gold, rendered as horizontal stripes. Established by royal " +
      "ordinance in 1871 and approved by the provincial council in 1874.",
    sources: [
      { title: "Flag of the Province of Barcelona — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Province_of_Barcelona" },
    ],
  },

  "ES-PM": {
    description:
      "Four red bars on gold (the Senyera of the Crown of Aragon) with a purple canton at the hoist " +
      "bearing a white five-towered castle. The four bars mark the historic tie to the Crown of Aragon; " +
      "the castle on purple derives from the flag of the medieval Kingdom of Mallorca. Adopted 1983.",
    sources: [
      { title: "Flag of the Balearic Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Balearic_Islands" },
    ],
  },

  "VE-V": {
    description:
      "Two equal horizontal bands, blue over black, with a yellow sun crossed by a white diagonal " +
      "lightning bolt at the centre. Blue is the waters of Lake Maracaibo; black the state’s petroleum " +
      "wealth; the yellow sun marks Maracaibo as the “beloved city of the sun”; the white bolt is the " +
      "Catatumbo Lightning. Adopted 1991.",
    sources: [
      { title: "Bandera del estado Zulia — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Zulia" },
    ],
  },

  "VE-L": {
    description:
      "Three triangles — emerald green at the hoist, white in the centre and sky-blue at the fly — with " +
      "a red five-pointed star on the white. Green is the beauty of the mountains, valleys and " +
      "agriculture; white the purity and the snows of the Sierra de Mérida (Pico Bolívar); blue the sky " +
      "and the route to Lake Maracaibo; the red star marks Mérida as a founding province of independent " +
      "Venezuela and the patriots’ blood. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Mérida — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_M%C3%A9rida" },
    ],
  },

  "VE-G": {
    description:
      "A wine-red (vinotinto) field with a thin green stripe low across it, interrupted by a yellow sun " +
      "around the Arch of Carabobo. Vinotinto is the blood shed by patriots on the field of Carabobo; " +
      "blue tones its maritime outlet at Puerto Cabello; the sun the light that overcomes darkness; the " +
      "green stripe its farming and ecology; the arch commemorates the decisive 1821 Battle of Carabobo.",
    sources: [
      { title: "Bandera del estado Carabobo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Carabobo" },
    ],
  },

  "VE-B": {
    description:
      "Three equal horizontal bands of blue, yellow and green with the black-outlined silhouette of the " +
      "state at the centre. Blue is the seas, rivers and skies; yellow the warmth of the state and its " +
      "people; green its natural wealth; the black outline its petroleum. Adopted 1999.",
    sources: [
      { title: "Bandera del estado Anzoátegui — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Anzo%C3%A1tegui" },
    ],
  },

  "VE-D": {
    description:
      "Four triangles — red at top and bottom, yellow at the sides — with the state coat of arms at the " +
      "centre. Yellow stands for the tropical climate and for nobility and charity; red for strength, " +
      "valour and fidelity and the blood of the independence heroes. Adopted 1993.",
    sources: [
      { title: "Bandera del estado Aragua — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Aragua" },
    ],
  },

  "VE-E": {
    description:
      "Three horizontal bands of green, white and blue with a red square, and a central emblem of a " +
      "seven-rayed sun, a path/pyramid and a palm. Green is the savanna, white its vastness, blue the " +
      "sky, red the warrior past and independence sacrifice; the seven-rayed sun is the seven provinces " +
      "of the old Captaincy General, and the sun-path-palm express the essence of “Barinidad.” Adopted " +
      "1997.",
    sources: [
      { title: "Bandera del estado Barinas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Barinas" },
    ],
  },

  "VE-C": {
    description:
      "Three horizontal bands of yellow, blue and green with a white triangle at the hoist bearing the " +
      "state arms, and seven white stars on the blue band. Yellow is the sun; blue the Apure River that " +
      "names the state; green the plains (llanos); the white triangle integrity; the seven stars the " +
      "state’s seven municipalities. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Apure — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Apure" },
    ],
  },

  "VE-F": {
    description:
      "A yellow field with a green circle and three blue horizontal stripes bearing eight white stars, " +
      "with the state arms in the upper hoist. Yellow is the state’s mineral wealth; the green circle " +
      "its vegetation; the blue stripes its rivers; seven stars are the seven provinces that declared " +
      "independence and the eighth is Guayana Province, added by Bolívar to the national flag in 1817. " +
      "Adopted 2000.",
    sources: [
      { title: "Bandera del estado Bolívar — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Bol%C3%ADvar" },
    ],
  },

  "VE-I": {
    description:
      "A blue field for sky and sea with a red band across the top bearing the motto “Muera la tiranía " +
      "y viva la libertad,” a radiant sun in the upper hoist and a white moon in the lower fly. It is " +
      "based on Francisco de Miranda’s 1806 flag; the rising sun is American liberty dawning and the " +
      "waning moon Spain’s declining power. Adopted 2006.",
    sources: [
      { title: "Bandera del estado Falcón — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Falc%C3%B3n" },
    ],
  },

  "VE-H": {
    description:
      "Three horizontal bands — a broad orange, a black and a blue — with a gold sun. Orange stands for " +
      "the wealth of the soil and the people’s faith, constancy and courage; black for iron, science " +
      "and industry; blue for the firmament and the state’s waters; the gold sun commemorates the 1813 " +
      "Battle of Taguanes, its rays the lances of the independence fighters. Adopted 1997.",
    sources: [
      { title: "Bandera del estado Cojedes — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Cojedes" },
    ],
  },

  "VE-J": {
    description:
      "Four horizontal bands of blue, white, yellow and green with a central emblem of the state map, " +
      "Los Morros de San Juan, a bull’s head and rice and sorghum branches. Blue is the sky; white the " +
      "purity of the llanero soul; yellow the farming and cattle wealth; green the land in the rainy " +
      "season; the fifteen stars the state’s municipalities. Adopted 1995.",
    sources: [
      { title: "Bandera del estado Guárico — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Gu%C3%A1rico" },
    ],
  },

  "VE-M": {
    description:
      "Three horizontal bands of black, red and yellow, based on Francisco de Miranda’s 1800 flag. The " +
      "three colours stand for the three peoples who fought with Miranda — black for Africans, red for " +
      "the mixed “pardos,” yellow for the indigenous; the black band bears a rising sun with cacao " +
      "branches and “Libertad o Muerte,” and six white stars mark the state’s subregions. Adopted 2006.",
    sources: [
      { title: "Bandera del estado Miranda — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Miranda" },
    ],
  },

  "VE-K": {
    description:
      "A red field divided by a setting sun rising from a horizontal line two-thirds down, its rays " +
      "formed of yellow and silver stripes. Adopted 2000; the decree gives the heraldic design without " +
      "assigning a separate meaning to each element.",
    sources: [
      { title: "Bandera del estado Lara — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Lara" },
    ],
  },

  "VE-O": {
    description:
      "Three horizontal bands — yellow with a white semicircle, green with three white stars, and dark " +
      "blue. Yellow is the tropical sky and Caribbean wealth; the white semicircle unity and purity; " +
      "green the vegetation and life; blue the Caribbean Sea; the three stars the state’s three islands " +
      "— Margarita, Coche and Cubagua. Adopted 1998.",
    sources: [
      { title: "Bandera del estado Nueva Esparta — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Nueva_Esparta" },
    ],
  },

  "VE-P": {
    description:
      "Three horizontal bands of blue, white and green with a yellow sun on the blue. Blue is the " +
      "firmament and the plainsman’s spirit; white pristine purity and the union of the material and " +
      "spiritual; green the state’s natural and agricultural wealth; the yellow sun — inspired by " +
      "aboriginal geometric art — power, riches and creative energy. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Portuguesa — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Portuguesa" },
    ],
  },

  "VE-S": {
    description:
      "Three equal horizontal bands of yellow, black and red. Yellow is the wealth of the land, law and " +
      "the wisdom of the people; black the hardships overcome and the state’s oil and coal, bearing " +
      "four stars for the cantons of 1864 (San Cristóbal, Lobatera, San Antonio and La Grita) and " +
      "coffee branches; red the bravery and the blood of the independence heroes. Adopted 1997.",
    sources: [
      { title: "Bandera del estado Táchira — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_T%C3%A1chira" },
    ],
  },

  "VE-T": {
    description:
      "A red band over a white band with a green triangle at the hoist enclosing a white star and a " +
      "dove. Red is the blood shed for the nation and the 1813 “War to the Death” decree; white the " +
      "humanising peace treaties signed at Trujillo in 1820 and a call to friendship; the green " +
      "triangle the verdant Andean land and its farming. Adopted 1994.",
    sources: [
      { title: "Bandera del estado Trujillo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Trujillo" },
    ],
  },

  "VE-R": {
    description:
      "A field of white and light blue with the state coat of arms above and fifteen stars below. " +
      "White symbolises the loyalty and purity of the Grand Marshal of Ayacucho, Antonio José de Sucre; " +
      "light blue the salt waters around the state and its fishing; the fifteen stars its municipalities. " +
      "Adopted 1965.",
    sources: [
      { title: "Bandera del estado Sucre — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Sucre" },
    ],
  },

  "VE-U": {
    description:
      "Three diagonal stripes of red, blue and white with a central roundel of yellow, blue and green. " +
      "Red is the indomitable spirit of the indigenous peoples who resisted the conquest and fought for " +
      "the province’s autonomy; the blue and yellow honour the national flag and the state’s waters; in " +
      "the roundel yellow is the sun and the soil’s wealth, blue the sky and green the earth.",
    sources: [
      { title: "Bandera del estado Yaracuy — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Yaracuy" },
    ],
  },

  "VE-Y": {
    description:
      "Light blue over a narrow green over dark blue, with a dark-blue triangle at the hoist holding a " +
      "green map of the state and four white stars on the upper band. Light blue is the sky and the " +
      "people’s hopes, the four stars the state’s four municipalities; green the forests and ecosystem; " +
      "dark blue the many arms of the Orinoco; the triangle is the river delta and the Greek letter " +
      "delta that names the state. Adopted 2004.",
    sources: [
      { title: "Bandera del estado Delta Amacuro — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Delta_Amacuro" },
    ],
  },

  "VE-N": {
    description:
      "A light-blue field with three superimposed horizontal bands of blue, green and black and a " +
      "yellow sun on the green, charged with the black silhouette of the independence heroine Juana " +
      "Ramírez under an arc of thirteen white stars. Adopted 2002.",
    sources: [
      { title: "Flag of Monagas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Monagas" },
    ],
  },

  "VE-X": {
    description:
      "A white field over a blue stripe, with four vertical stripes of yellow, red, white and blue at " +
      "the hoist; a sun on the white and four blue stars. The design is the 1797 flag of Gual and " +
      "España: the sun is the Homeland; the four stars the four provinces of the old Captaincy General " +
      "(Cumaná, Guayana, Maracaibo and Caracas); the four vertical stripes the peoples of Venezuela — " +
      "whites, pardos, blacks and indigenous. Adopted 2012 (state renamed La Guaira in 2019).",
    sources: [
      { title: "Bandera del estado Vargas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Vargas" },
    ],
  },

  "VE-Z": {
    description:
      "A multicolour flag bearing the Autana tepui, seven stars, a Yanomami face and the state map. " +
      "Blue is nobility and the Amazonian rivers; white purity and freedom; green the vast forests and " +
      "biodiversity; red the indigenous heritage; yellow light, wealth and life; brown the mineral-rich " +
      "land. The seven stars mark the state’s seven municipalities and the Yanomami face its aboriginal " +
      "peoples. Adopted 2002.",
    sources: [
      { title: "Bandera del estado Amazonas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Amazonas" },
    ],
  },

  "BO-S": {
    description:
      "Three horizontal stripes, green-white-green. The green stripes stand for the department’s " +
      "vegetation and forests; the white stripe for the nobility of its people. Created 1864.",
    sources: [
      { title: "Bandera de Santa Cruz (Bolivia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Santa_Cruz_(Bolivia)" },
    ],
  },

  "CO-QUI": {
    description:
      "Three equal vertical stripes of green, yellow and purple. Green stands for the department’s " +
      "abundant vegetation and agriculture; yellow for the gold of the Quimbaya culture and its " +
      "economy; purple for the coffee cherry at ripe harvest, the region’s chief product. Adopted 1972.",
    sources: [
      { title: "Bandera del Quindío — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Quind%C3%ADo" },
    ],
  },

  "CO-LAG": {
    description:
      "Two equal horizontal stripes, green over white. Green symbolises the hope of the farmers in " +
      "sowing and raising their crops; white the purity of the indigenous population and the " +
      "department’s sea salt and pearls. Adopted 1966.",
    sources: [
      { title: "Bandera de La Guajira — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_La_Guajira" },
    ],
  },

  "CO-RIS": {
    description:
      "An emerald-green field with fourteen silver stars in an arc. The fourteen stars are the " +
      "department’s fourteen municipalities; the green stands for the fertility of its land and its " +
      "agricultural vocation. Adopted 1969.",
    sources: [
      { title: "Bandera de Risaralda — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Risaralda" },
    ],
  },

  "CO-ARA": {
    description:
      "Two equal horizontal stripes, red over green. Red stands for the blood shed by those who fought " +
      "for freedom; green for the vast plains (llanos). Adopted 1979.",
    sources: [
      { title: "Bandera de Arauca (departamento) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Arauca_(departamento)" },
    ],
  },

  "CO-CAS": {
    description:
      "A field divided diagonally, red above and green below, with a yellow eight-pointed sun at the " +
      "centre. Red is the blood of the independence heroes; green the department’s plains and natural " +
      "resources; the sun the warmth and fertility of the llanos, its eight points one for each letter " +
      "of “Casanare.”",
    sources: [
      { title: "Bandera de Casanare — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Casanare" },
    ],
  },

  "CO-SUC": {
    description:
      "Two equal horizontal stripes, green over white. Green symbolises prosperity, white peace. " +
      "Adopted 1974.",
    sources: [
      { title: "Bandera de Sucre (Colombia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Sucre_(Colombia)" },
    ],
  },

  "CO-CAQ": {
    description:
      "Seven horizontal stripes alternating white and green, with sixteen stars for the department’s " +
      "municipalities. Green stands for the forest wealth and the people’s hope for the future; white " +
      "for the clarity of morning and peace. Adopted 1974.",
    sources: [
      { title: "Bandera de Caquetá — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Caquet%C3%A1" },
    ],
  },

  "CO-PUT": {
    description:
      "Three horizontal stripes of black, green and white. Black is the department’s petroleum (its " +
      "“black gold”); green the hope and the virgin forests that cover almost all of it; white the " +
      "peaceful character of its people.",
    sources: [
      { title: "Bandera de Putumayo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Putumayo" },
    ],
  },

  "CO-VID": {
    description:
      "Two equal horizontal stripes, yellow over green. Yellow represents the wealth of the territory; " +
      "green the plains and the forested part of the department.",
    sources: [
      { title: "Bandera de Vichada — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Vichada" },
    ],
  },

  "CO-DC": {
    description:
      "Two horizontal stripes, yellow over red, with the city’s coat of arms at the centre. Yellow " +
      "stands for justice, clemency, virtue and benignity; red for liberty, health and charity. The " +
      "colours derive from a historic revolutionary armband worn in the city. Adopted 1952.",
    sources: [
      { title: "Bandera de Bogotá — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Bogot%C3%A1" },
    ],
  },

  "CO-AMA": {
    description:
      "Three horizontal stripes — green, mustard-yellow and white, edged in black — bearing black " +
      "figures of an indigenous warrior drawing a bow and a leaping jaguar on the green, and a " +
      "five-pointed star for the capital Leticia on the yellow. Adopted 1974.",
    sources: [
      { title: "Bandera del Amazonas (Colombia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Amazonas_(Colombia)" },
    ],
  },

  "CO-GUA": {
    description:
      "Three equal horizontal stripes of yellow, blue and green. Yellow stands for the department’s " +
      "mineral wealth (gold, diamonds, amethysts and more); blue for its waters — “Guainía” means " +
      "“land of many waters” — and its many rivers and lakes; green for the biodiversity of its forests " +
      "and savannas.",
    sources: [
      { title: "Bandera de Guainía — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guain%C3%ADa" },
    ],
  },

  "CO-GUV": {
    description:
      "Three equal horizontal stripes of green, white and blue with the departmental coat of arms at " +
      "the centre. Green stands for the wealth and effort of the settlers; white for peace and honest " +
      "work; blue for the Guayabero and Ariari rivers that join to form the Guaviare.",
    sources: [
      { title: "Bandera del Guaviare — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Guaviare" },
    ],
  },

  "CO-VAU": {
    description:
      "Two equal horizontal stripes, white over green, with a rubber-tree leaf at the centre. White " +
      "stands for the purity of the indigenous peoples; green for the jungle and natural resources; the " +
      "rubber leaf for the rubber whose exploitation shaped the department’s history. Adopted 1984.",
    sources: [
      { title: "Bandera de Vaupés — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Vaup%C3%A9s" },
    ],
  },

  "UY-CA": {
    description:
      "A white field crossed by nine light-blue stripes and one red stripe. The nine blue stripes " +
      "recall Uruguay’s 1828–1830 second national flag, whose nine stripes stood for the nine " +
      "departments of the time (Canelones among them); the red stripe echoes the red band of the flag " +
      "of Artigas, honouring his ideals. Adopted 2010.",
    sources: [
      { title: "Bandera de Canelones — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Canelones" },
    ],
  },

  "AR-C": {
    description:
      "A white field bearing the historic coat of arms of the city drawn by Juan de Garay: a crowned " +
      "black eagle with four smaller mixed eagles (hawks) and a red cross. The great eagle represents " +
      "the Spanish conquest, the crown the Spanish monarchy, the red cross the evangelisation, and the " +
      "four small eagles the four cities founded in the era — Santa Fe, Buenos Aires, Corrientes and " +
      "Concepción del Bermejo. Adopted 1995.",
    sources: [
      { title: "Bandera de la Ciudad Autónoma de Buenos Aires — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_Ciudad_Aut%C3%B3noma_de_Buenos_Aires" },
    ],
  },

  "AR-D": {
    description:
      "A white field bearing the provincial coat of arms at the centre. Adopted 1988; the law specifies " +
      "a white flag with the provincial shield and does not assign a separate meaning to the field.",
    sources: [
      { title: "Bandera de la provincia de San Luis — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_de_San_Luis" },
    ],
  },

  "AR-M": {
    description:
      "A white-and-light-blue (celeste) flag reproducing the flag of the Army of the Andes, which " +
      "General José de San Martín created in Mendoza for the campaigns that liberated Chile and Peru. " +
      "Adopted 1992.",
    sources: [
      { title: "Bandera de la provincia de Mendoza — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_de_Mendoza" },
    ],
  },









































  "GB-ENG": {
    description:
      "A red cross on a white field — the Cross of St George. Red crosses marked English soldiers from " +
      "the late 13th century, and Edward III made St George England’s special patron around 1348; by " +
      "1552 the St George’s flag was the only saint’s banner permitted in public. It has become the " +
      "popular flag of England, especially at sporting events.",
    sources: [
      { title: "Flag of England — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_England" },
    ],
  },







  "BA-SRP": {
    description:
      "A horizontal tricolour of red, blue and white. The colours are those associated with Serbian " +
      "heritage but are also read as the pan-Slavic colours — the basis on which the constitutional " +
      "court upheld the flag. It differs from Serbia’s civil flag mainly in its 1:2 proportion. Adopted " +
      "1992.",
    sources: [
      { title: "Flag of Republika Srpska — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Republika_Srpska" },
    ],
  },

  "FR-73": {
    description:
      "A white cross reaching the edges on a red field — the arms of the Counts and Dukes of Savoy " +
      "(“de gueules à la croix d’argent”). The cross is first documented on a 1143 seal of Count " +
      "Amédée III and became the permanent Savoyard emblem under Amédée V in the 14th century. It has " +
      "no official standardisation.",
    sources: [
      { title: "Drapeau de la Savoie — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Savoie" },
    ],
  },

  "FR-2A": {
    description:
      "A black Moor’s head in profile wearing a white headband, on a white field — the flag of Corsica, " +
      "used for both Corsican departments. The Moor’s head appears on a 1281 seal of Peter III of " +
      "Aragon and was taken up by Pasquale Paoli as a symbol of Corsican resistance; the headband was " +
      "raised from the eyes to the brow in 1755. Adopted as the regional flag in 1980.",
    sources: [
      { title: "Drapeau de la Corse — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse" },
    ],
  },

  "FR-2B": {
    description:
      "A black Moor’s head in profile wearing a white headband, on a white field — the flag of Corsica, " +
      "used for both Corsican departments. The emblem appears on a 1281 Aragonese seal and became a " +
      "symbol of Corsican resistance under Pasquale Paoli, who in 1755 moved the headband up to the " +
      "brow. Adopted as the regional flag in 1980.",
    sources: [
      { title: "Drapeau de la Corse — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse" },
    ],
  },

  "TH-13": {
    description:
      "A navy-blue and white flag bearing the provincial seal: a pink lotus with two rice stalks " +
      "bending over it, standing for the fertility of the province. The lotus also gives the province " +
      "its name — after citizens presented King Rama II with lotus flowers on his 1815 visit, he " +
      "renamed the town Pathum Thani, “lotus-flower town.”",
    sources: [
      { title: "Pathum Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Pathum_Thani_province" },
    ],
  },

  "TH-14": {
    description:
      "A navy-blue flag with a light-blue central band bearing the provincial seal: a pavilion " +
      "enshrining a conch shell on a pedestal tray, with the provincial tree behind. By tradition King " +
      "Ramathibodi I found a beautiful conch buried at the spot and chose it for his capital, building " +
      "a pavilion over the shell.",
    sources: [
      { title: "Phra Nakhon Si Ayutthaya province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phra_Nakhon_Si_Ayutthaya_province" },
    ],
  },

  "TH-50": {
    description:
      "A light-blue flag bearing the provincial seal: a white elephant in a glass pavilion. The white " +
      "elephant commemorates the one offered by Thammalangka, a ruler of Chiang Mai, to his overlord " +
      "King Rama II; the glass pavilion alludes to the Buddhist flourishing of the region, recalling " +
      "the 1477 review of the Tripitaka.",
    sources: [
      { title: "Chiang Mai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Mai_province" },
    ],
  },

  "TH-20": {
    description:
      "A flag bearing the provincial seal, which shows the hill Khao Sam Muk with a sala (open " +
      "pavilion) holding a statue of the goddess Chao Mae Sam Muk, the local deity who by tradition " +
      "protects the seafarers and people of the coast.",
    sources: [
      { title: "Chonburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chonburi_province" },
    ],
  },

  "TH-40": {
    description:
      "A flag bearing the provincial seal, which shows the stupa of Phra That Kham Kaen — believed to " +
      "hold relics of the Buddha — flanked by a banyan tree and a golden-shower tree, the latter’s Thai " +
      "name meaning “providing support and preventing decline.”",
    sources: [
      { title: "Khon Kaen province — Wikipedia", url: "https://en.wikipedia.org/wiki/Khon_Kaen_province" },
    ],
  },

  "TH-80": {
    description:
      "A flag bearing the provincial seal, which shows the Phra Boromathat chedi of Wat Phra Mahathat " +
      "encircled by the twelve animals of the zodiac. Each animal stood for one of the tributary " +
      "city-states of the historical Nakhon Si Thammarat kingdom, whose sway once ran from Chumphon " +
      "south to Pahang.",
    sources: [
      { title: "Nakhon Si Thammarat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Si_Thammarat_province" },
    ],
  },

  "TH-57": {
    description:
      "A flag bearing the provincial seal, which shows a white elephant — the royal symbol. It recalls " +
      "the legend that King Mangrai founded Chiang Rai on the spot because his elephant favoured the " +
      "place.",
    sources: [
      { title: "Chiang Rai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Rai_province" },
    ],
  },

  "TH-11": {
    description:
      "A flag bearing the provincial seal, which shows Phra Samut Chedi — a pagoda raised on an island " +
      "in the Chao Phraya in King Rama II’s reign and the province’s most important Buddhist site. The " +
      "name Samut Prakan means “sea fortress,” recalling its role as a fortified river port.",
    sources: [
      { title: "Samut Prakan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Prakan_province" },
    ],
  },

  "TH-12": {
    description:
      "A flag bearing the provincial seal, which depicts earthenware — the traditional pottery for " +
      "which Nonthaburi has long been known, representing the province’s craft heritage.",
    sources: [
      { title: "Nonthaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nonthaburi_province" },
    ],
  },

  "TH-83": {
    description:
      "A flag bearing the provincial seal, which shows the Two Heroines Monument within a Thai kranok " +
      "border. The monument honours Thao Thep Krasattri and Thao Si Sunthon, the sisters who rallied " +
      "Phuket’s defence against a Burmese invasion in 1785. In use since 1985.",
    sources: [
      { title: "Phuket province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phuket_province" },
    ],
  },

  "TH-21": {
    description:
      "A flag bearing the provincial seal, which depicts the island of Ko Samet off the Rayong coast — " +
      "the island celebrated, together with the poet Sunthon Phu, in the province’s motto.",
    sources: [
      { title: "Rayong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Rayong_province" },
    ],
  },

  "TH-22": {
    description:
      "A flag bearing the provincial seal, which shows a rabbit within a haloed moon. The moon canting " +
      "the province’s name — “Chantha” means moon, so Chanthaburi is “city of the moon” — and the " +
      "rabbit (the shape Thai folklore sees in the moon) conveys the peace and tranquillity of the " +
      "province.",
    sources: [
      { title: "Chanthaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chanthaburi_province" },
    ],
  },

  "TH-84": {
    description:
      "A flag bearing the provincial seal, which shows the pagoda of Wat Phra Borommathat Chaiya, a " +
      "historic Srivijaya-era stupa some 1,200 years old and the province’s foremost religious " +
      "monument.",
    sources: [
      { title: "Surat Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Surat_Thani_province" },
    ],
  },

  "TH-51": {
    description:
      "A flag bearing the provincial seal, which shows the gold-covered chedi of Wat Phra That " +
      "Hariphunchai, the city’s principal temple since Mon times, said to enshrine a relic of the " +
      "Buddha.",
    sources: [
      { title: "Lamphun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lamphun_province" },
    ],
  },

  "TH-52": {
    description:
      "A flag bearing the provincial seal, which shows a white rooster in the gateway of Wat Phra That " +
      "Lampang Luang. By legend, when the Buddha visited, the god Indra turned himself into a white " +
      "rooster to wake the people so they would pay their respects.",
    sources: [
      { title: "Lampang province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lampang_province" },
    ],
  },

  "TH-90": {
    description:
      "A flag bearing the provincial seal, which shows a conch shell on a phan (offering tray) with " +
      "glass decorations. By the most accepted account the emblem derives from a decoration on the " +
      "jacket of the Prince of Songkhla.",
    sources: [
      { title: "Songkhla province — Wikipedia", url: "https://en.wikipedia.org/wiki/Songkhla_province" },
    ],
  },

  "TH-31": {
    description:
      "A flag bearing the provincial seal, which shows the Phanom Rung sanctuary, a Khmer-style Hindu " +
      "temple to Shiva built between the 9th and 12th centuries when the Khmer Empire held the region.",
    sources: [
      { title: "Buriram province — Wikipedia", url: "https://en.wikipedia.org/wiki/Buriram_province" },
    ],
  },

  "TH-32": {
    description:
      "A flag bearing the provincial seal, which shows the god Indra on his white three-headed elephant " +
      "Airavata, based on a carving at a famous Khmer temple in the province — apt for a province known " +
      "for both its Khmer temples and its elephants.",
    sources: [
      { title: "Surin province — Wikipedia", url: "https://en.wikipedia.org/wiki/Surin_province" },
    ],
  },

  "TH-34": {
    description:
      "A flag bearing the provincial seal, which shows a lotus flower in a pond — alluding to the " +
      "province’s name, which means “royal city of the lotus.”",
    sources: [
      { title: "Ubon Ratchathani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ubon_Ratchathani_province" },
    ],
  },

  "TH-16": {
    description:
      "A flag bearing the provincial seal, which shows the god Vishnu before Phra Prang Sam Yot, the " +
      "Khmer “Sanctuary of the Three Towers.” It recalls King Narai, who in 1664 fortified Lopburi as " +
      "an alternative capital when Ayutthaya was threatened by a Dutch blockade.",
    sources: [
      { title: "Lopburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lopburi_province" },
    ],
  },

  "TH-19": {
    description:
      "A flag bearing the provincial seal, which shows the temple of Wat Phra Phutthabat. A 17th-century " +
      "hunter found a footprint-shaped pool taken to be the Buddha’s footprint (Phra Phutthabat), and a " +
      "temple was built over the spot.",
    sources: [
      { title: "Saraburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Saraburi_province" },
    ],
  },

  "TH-33": {
    description:
      "A flag bearing the provincial seal, which shows Prasat Hin Ban Samo, a Khmer temple about a " +
      "thousand years old in the Prang Ku area of the province.",
    sources: [
      { title: "Sisaket province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sisaket_province" },
    ],
  },

  "TH-15": {
    description:
      "A flag bearing the provincial seal, which shows golden ears of rice in a bowl of water, " +
      "standing for the fertility of Ang Thong as one of the country’s major rice-producing provinces.",
    sources: [
      { title: "Ang Thong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ang_Thong_province" },
    ],
  },

  "TH-24": {
    description:
      "A flag bearing the provincial seal, which shows the hall of Wat Sothonwararam enshrining " +
      "Luangpho Phutthasothon, the province’s most revered Buddha image.",
    sources: [
      { title: "Chachoengsao province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chachoengsao_province" },
    ],
  },

  "TH-26": {
    description:
      "A flag bearing the provincial seal, which shows an elephant holding an ear of rice in its trunk, " +
      "with straw, trees and clouds. It stands for the province’s fertile rice fields and forests and " +
      "its natural beauty.",
    sources: [
      { title: "Nakhon Nayok province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Nayok_province" },
    ],
  },

  "TH-18": {
    description:
      "A flag bearing the provincial seal, which shows a dharma wheel (dhammachakka) with a mountain " +
      "behind it, referring to the Dhammachak Buddha image at Wat Thammamun, built on a mountainside.",
    sources: [
      { title: "Chai Nat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chai_Nat_province" },
    ],
  },

  "TH-23": {
    description:
      "A flag bearing the provincial seal, which shows the sea with the Khao Banthat mountain range " +
      "behind — Trat being a coastal province known as “the city of half a hundred islands.”",
    sources: [
      { title: "Trat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Trat_province" },
    ],
  },

  "TH-25": {
    description:
      "A red-and-yellow flag bearing the provincial seal, which shows the Bodhi tree — for the first " +
      "Bodhi tree planted about 2,000 years ago at Wat Si Maha Phot. Red stands for the land and yellow " +
      "for Buddhism.",
    sources: [
      { title: "Prachinburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Prachinburi_province" },
    ],
  },

  "TH-27": {
    description:
      "A flag bearing the provincial seal, which shows the sun rising over the Khmer ruins of Prasat " +
      "Khao Noi Si Chomphu — the rising sun marking the province’s eastern position — with a Buddha " +
      "image in a lotus pond below, alluding to the sacred ponds that give Sa Kaeo its name.",
    sources: [
      { title: "Sa Kaeo province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sa_Kaeo_province" },
    ],
  },

  "TH-35": {
    description:
      "A flag bearing the provincial seal, which shows two mythical lions (singha) facing the chedi " +
      "Phra That Anon at Wat Maha That, over a lotus flower. The lions recall the founding legend that " +
      "a lion emerged from the forest when the site was chosen, giving the old name Ban Singha Tha.",
    sources: [
      { title: "Yasothon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Yasothon_province" },
    ],
  },

  "TH-36": {
    description:
      "A flag bearing the provincial seal, which shows a triangular banner — a symbol of victory in " +
      "war.",
    sources: [
      { title: "Chaiyaphum province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chaiyaphum_province" },
    ],
  },

  "TH-41": {
    description:
      "A flag bearing the provincial seal, which shows Vaiśravaṇa (Thao Wessuwan), the Heavenly King of " +
      "the North — fitting for a province whose name means “northern city.”",
    sources: [
      { title: "Udon Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Udon_Thani_province" },
    ],
  },

  "TH-42": {
    description:
      "A flag bearing the provincial seal, which shows the stupa of Phra That Si Song Rak, built in " +
      "1560 by King Maha Chakkraphat of Ayutthaya and King Sai Setthathirath of Lan Xang as a symbol of " +
      "friendship between the two kingdoms.",
    sources: [
      { title: "Loei province — Wikipedia", url: "https://en.wikipedia.org/wiki/Loei_province" },
    ],
  },

  "TH-43": {
    description:
      "A flag bearing the provincial seal, which shows a pond with a clump of bamboo beside it; the " +
      "bamboo stands for the stability, glory and continuity of this peaceful and fertile land.",
    sources: [
      { title: "Nong Khai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nong_Khai_province" },
    ],
  },

  "TH-45": {
    description:
      "A flag bearing the provincial seal, which shows the shrine of the city pillar standing in the " +
      "artificial lake Bueng Phlan Chai; its guardian spirit, Mahesak, is revered by local people.",
    sources: [
      { title: "Roi Et province — Wikipedia", url: "https://en.wikipedia.org/wiki/Roi_Et_province" },
    ],
  },

  "TH-46": {
    description:
      "A flag bearing the provincial seal, which shows a pond of black water before the Phu Phan " +
      "mountains — the black water canting the name Kalasin (“black water”), and the pond and clouds " +
      "standing for the province’s fertility.",
    sources: [
      { title: "Kalasin province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kalasin_province" },
    ],
  },

  "TH-47": {
    description:
      "A flag bearing the provincial seal, which shows Phra That Choeng Chum, a Lao-style chedi raised " +
      "in the Ayutthaya period over an older Khmer prang — reflecting the region’s layered Khmer and " +
      "Lao heritage.",
    sources: [
      { title: "Sakon Nakhon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sakon_Nakhon_province" },
    ],
  },

  "TH-48": {
    description:
      "A flag bearing the provincial seal, which shows the pagoda of Phra That Phanom — a revered " +
      "stupa, Khmer in origin and rebuilt in Lao style after it collapsed in 1675.",
    sources: [
      { title: "Nakhon Phanom province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Phanom_province" },
    ],
  },

  "TH-49": {
    description:
      "A flag bearing the provincial seal, which shows the Prasat Song Nang Sathit palace with a " +
      "moonstone on a tray inside it — the moonstone alluding to the province’s name, Mukdahan.",
    sources: [
      { title: "Mukdahan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Mukdahan_province" },
    ],
  },

  "TH-44": {
    description:
      "A flag bearing the provincial seal, which shows a tree before rice fields, symbolising the " +
      "richness of the province’s natural resources.",
    sources: [
      { title: "Maha Sarakham province — Wikipedia", url: "https://en.wikipedia.org/wiki/Maha_Sarakham_province" },
    ],
  },

  "TH-55": {
    description:
      "A flag bearing the provincial seal, which shows a sacred Usupharat bull carrying the stupa of " +
      "Phra That Chae Haeng. The bull recalls the legend that the ruler of Nan came to mark the border " +
      "with neighbouring Phrae riding a bovine.",
    sources: [
      { title: "Nan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nan_province" },
    ],
  },

  "TH-65": {
    description:
      "A flag bearing the provincial seal, which shows Phra Phuttha Chinnarat, one of the most revered " +
      "and beautiful Buddha images in Thailand, enshrined at Wat Phra Si Rattana Mahathat.",
    sources: [
      { title: "Phitsanulok province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phitsanulok_province" },
    ],
  },

  "TH-64": {
    description:
      "A flag bearing the provincial seal, which shows King Ramkhamhaeng the Great seated on the " +
      "Manangkhasila throne — the Sukhothai king who created the Thai script and made Theravada " +
      "Buddhism the state religion.",
    sources: [
      { title: "Sukhothai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sukhothai_province" },
    ],
  },

  "TH-73": {
    description:
      "A flag bearing the provincial seal, which shows Phra Pathommachedi, a great stupa and Buddhist " +
      "centre since the 6th century, topped by a royal crown for King Mongkut, who rebuilt it in 1860.",
    sources: [
      { title: "Nakhon Pathom province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Pathom_province" },
    ],
  },

  "TH-70": {
    description:
      "A flag bearing the provincial seal, which shows the royal sword above royal sandals on a phan " +
      "(tray). It reflects the name Ratchaburi, “city of the king,” linked to the birthplace of King " +
      "Rama I.",
    sources: [
      { title: "Ratchaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ratchaburi_province" },
    ],
  },

  "TH-71": {
    description:
      "A flag bearing the provincial seal, which shows the three stupas on Bantadthong Mountain that " +
      "give their name to the Three Pagodas Pass, the mountain route to Myanmar.",
    sources: [
      { title: "Kanchanaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kanchanaburi_province" },
    ],
  },

  "TH-72": {
    description:
      "A flag bearing the provincial seal, which shows the 1592 elephant duel fought in Suphan Buri " +
      "between King Naresuan the Great and the Burmese crown prince.",
    sources: [
      { title: "Suphan Buri province — Wikipedia", url: "https://en.wikipedia.org/wiki/Suphan_Buri_province" },
    ],
  },

  "TH-76": {
    description:
      "A flag bearing the provincial seal, which shows the Khao Wang palace behind rice fields flanked " +
      "by two coconut palms, standing for the province’s main crops.",
    sources: [
      { title: "Phetchaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phetchaburi_province" },
    ],
  },

  "TH-77": {
    description:
      "A flag bearing the provincial seal, which shows the Kuha Karuhas pavilion, built for King " +
      "Chulalongkorn’s visit to the Phraya Nakhon Cave, with the island of Ko Lak in Prachuap Bay " +
      "behind it.",
    sources: [
      { title: "Prachuap Khiri Khan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Prachuap_Khiri_Khan_province" },
    ],
  },

  "TH-92": {
    description:
      "A flag bearing the provincial seal, which shows a lighthouse over sea waves, marking Trang as a " +
      "historic seaport trading with foreign countries; the waves also echo the province’s undulating " +
      "hill-and-plain landscape.",
    sources: [
      { title: "Trang province — Wikipedia", url: "https://en.wikipedia.org/wiki/Trang_province" },
    ],
  },

  "TH-93": {
    description:
      "A flag bearing the provincial seal, which shows the 177-metre Khao Ok Thalu mountain — the " +
      "pierced peak that is the emblem of the province.",
    sources: [
      { title: "Phatthalung province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phatthalung_province" },
    ],
  },

  "TH-94": {
    description:
      "A flag bearing the provincial seal, which shows the cannon Phraya Tani (Sri Pattani in Malay), " +
      "cast in Pattani and taken to Bangkok in 1785, where it now stands before the Ministry of " +
      "Defence.",
    sources: [
      { title: "Pattani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Pattani_province" },
    ],
  },

  "TH-95": {
    description:
      "A flag bearing the provincial seal, which shows a miner with simple tools — hoes, crowbars and " +
      "baskets — recalling Yala’s origins as a tin- and tungsten-mining town.",
    sources: [
      { title: "Yala province — Wikipedia", url: "https://en.wikipedia.org/wiki/Yala_province" },
    ],
  },

  "TH-96": {
    description:
      "A flag bearing the provincial seal, which shows a sailing boat with a white elephant on its " +
      "sail. The white elephant — a royal symbol — commemorates Phra Sri Nararat Rajakarini, an " +
      "elephant caught here and presented to the king.",
    sources: [
      { title: "Narathiwat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Narathiwat_province" },
    ],
  },

  "TH-81": {
    description:
      "A flag bearing the provincial seal, which shows two ancient crossed swords (krabi) before the " +
      "Andaman Sea and Khao Phanom Bencha, the province’s highest mountain. The sword (krabi) gives the " +
      "province its name.",
    sources: [
      { title: "Krabi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Krabi_province" },
    ],
  },

  "TH-54": {
    description:
      "A flag bearing the provincial seal, which shows a horse together with the stupa of Phra That Cho " +
      "Hae. The horse recalls the legend that the ruler of Phrae came riding a horse (while Nan’s came " +
      "on a buffalo) to divide their lands; the stupa was added to the design in 1940.",
    sources: [
      { title: "Phrae province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phrae_province" },
    ],
  },

  "TH-56": {
    description:
      "A flag bearing the provincial seal, which shows the revered Buddha image Phra Chao Ton Luang of " +
      "Wat Si Khom Kham, backed by seven flames for the glory of the Buddha, with an alms bowl and two " +
      "ears of rice before it.",
    sources: [
      { title: "Phayao province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phayao_province" },
    ],
  },

  "TH-53": {
    description:
      "A flag bearing the provincial seal, which shows the mondop of Wat Phra Thaen Sila At, built over " +
      "a laterite block said to have been used by the Buddha in seeking enlightenment.",
    sources: [
      { title: "Uttaradit province — Wikipedia", url: "https://en.wikipedia.org/wiki/Uttaradit_province" },
    ],
  },

  "TH-60": {
    description:
      "A flag bearing the provincial seal, which shows a wiman — a mythological heavenly castle — " +
      "alluding to the province’s name, Nakhon Sawan, “heavenly city.”",
    sources: [
      { title: "Nakhon Sawan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Sawan_province" },
    ],
  },

  "TH-67": {
    description:
      "A flag bearing the provincial seal, which shows a diamond on a mountain — diamonds being found " +
      "in the province — above tobacco plants, one of its crops.",
    sources: [
      { title: "Phetchabun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phetchabun_province" },
    ],
  },

  "TH-66": {
    description:
      "A flag bearing the provincial seal, which shows a pond — recalling Phichit’s old name Mueang Sa " +
      "Luang, “city of the royal pond” — with a banyan tree for Wat Pho Prathap Chang, built in the " +
      "1660s by King Luang Sorasak, born between a banyan and a sacred fig.",
    sources: [
      { title: "Phichit province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phichit_province" },
    ],
  },

  "TH-63": {
    description:
      "A flag bearing the provincial seal, which shows King Naresuan on a royal elephant pouring " +
      "consecrated water on the ground to declare independence — commemorating Tak as the first border " +
      "town freed from Burmese control in the 1584 war.",
    sources: [
      { title: "Tak province — Wikipedia", url: "https://en.wikipedia.org/wiki/Tak_province" },
    ],
  },

  "TH-62": {
    description:
      "A flag bearing the provincial seal, which shows city walls topped by diamonds — the name " +
      "Kamphaeng Phet means “diamond wall,” after the strong ramparts that once guarded the Ayutthaya " +
      "kingdom’s frontier with Burma.",
    sources: [
      { title: "Kamphaeng Phet province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kamphaeng_Phet_province" },
    ],
  },

  "TH-61": {
    description:
      "A flag bearing the provincial seal, which shows the pavilion atop Khao Sakae Krang at Wat Sangkat " +
      "Rattana Khiri, housing a statue of Thongdi (father of King Rama I) and a Buddha footprint.",
    sources: [
      { title: "Uthai Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Uthai_Thani_province" },
    ],
  },

  "TH-58": {
    description:
      "A flag bearing the provincial seal, which shows an elephant in water, recalling the province’s " +
      "origins as an elephant-training centre — set up in the 1820s–40s when Lord Kaeo was sent to " +
      "catch elephants for the ruler of Chiang Mai.",
    sources: [
      { title: "Mae Hong Son province — Wikipedia", url: "https://en.wikipedia.org/wiki/Mae_Hong_Son_province" },
    ],
  },

  "TH-86": {
    description:
      "A flag bearing the provincial seal, which shows a fortune-bringing thewada on a lotus pedestal " +
      "between two fig trees, with a fort and two watchtowers behind — a reference to the camp where " +
      "the province’s warriors mustered before battle.",
    sources: [
      { title: "Chumphon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chumphon_province" },
    ],
  },

  "TH-85": {
    description:
      "A flag bearing the provincial seal, which shows a castle on a hill — Ratana Rangsan Palace on " +
      "Niwetkhiri Hill, where King Chulalongkorn (Rama V) stayed on his 1890 visit to Ranong.",
    sources: [
      { title: "Ranong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ranong_province" },
    ],
  },

  "TH-10": {
    description:
      "A flag bearing the seal of Bangkok, which shows the Hindu god Indra riding through the clouds on " +
      "Airavata (Erawan), the divine white elephant, holding his vajra. Based on a painting by Prince " +
      "Naris, it echoes the city’s ceremonial name as a “city of angels” erected at Indra’s behest.",
    sources: [
      { title: "Bangkok — Wikipedia", url: "https://en.wikipedia.org/wiki/Bangkok" },
    ],
  },

  "TH-17": {
    description:
      "A flag bearing the provincial seal, which commemorates the Bang Rachan stand: when the Burmese " +
      "marched on Ayutthaya in 1765, eleven leaders and the villagers of Bang Rachan held them off for " +
      "five months. The current seal (2004) depicts the eleven heroes.",
    sources: [
      { title: "Sing Buri province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sing_Buri_province" },
    ],
  },

  "TH-37": {
    description:
      "A flag bearing the provincial seal, which shows Phra Mongkhon Ming Muang (Phra Yai, the “Big " +
      "Buddha”), a 20-metre statue among the most sacred images in Amnat Charoen.",
    sources: [
      { title: "Amnat Charoen province — Wikipedia", url: "https://en.wikipedia.org/wiki/Amnat_Charoen_province" },
    ],
  },

  "TH-38": {
    description:
      "A flag bearing the provincial seal, which shows Phu Thok, a mountain in Si Wilai district whose " +
      "Isan-language name means “lonely mountain.”",
    sources: [
      { title: "Bueng Kan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Bueng_Kan_province" },
    ],
  },

  "TH-39": {
    description:
      "A flag bearing the provincial seal, which shows King Naresuan in a shrine — commemorating his " +
      "1574 visit to gather troops against Burma — with a lotus pond behind (the water lily being the " +
      "provincial flower).",
    sources: [
      { title: "Nong Bua Lamphu province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nong_Bua_Lamphu_province" },
    ],
  },

  "TH-82": {
    description:
      "A flag bearing the provincial seal, which shows the Phu Khao Chang mountains behind the city " +
      "hall, with a tin dredge for the province’s historic tin-mining industry.",
    sources: [
      { title: "Phang Nga province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phang_Nga_province" },
    ],
  },

  "TH-74": {
    description:
      "A flag bearing the provincial seal, which shows a Chinese junk off the coast with a factory and " +
      "smoking chimney behind — together standing for the province’s old trading tradition and its " +
      "local industries.",
    sources: [
      { title: "Samut Sakhon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Sakhon_province" },
    ],
  },

  "TH-75": {
    description:
      "A flag bearing the provincial seal, which shows a drum over a river between coconut palms. The " +
      "Thai word for drum, klong, alludes to the Mae Klong River and the province’s former name Mae " +
      "Klong; the palms stand for its coconut farming.",
    sources: [
      { title: "Samut Songkhram province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Songkhram_province" },
    ],
  },

  "TH-91": {
    description:
      "A flag bearing the provincial seal, which shows the sea deity Phra Samut Thewa seated on his " +
      "rock in the sea against a sunset — the setting sun standing for the Andaman Sea to the west of " +
      "the province.",
    sources: [
      { title: "Satun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Satun_province" },
    ],
  },

  "ID-AC": {
    description:
      "A green flag bearing the province’s Pancacita (“Five Ideals”) emblem in a pentagon shaped like a " +
      "traditional kopiah. Its five symbols are the scales (justice), rencong daggers (heroism), rice, " +
      "cotton and factory chimneys (welfare), a mosque dome (harmony) and a book and pen (prosperity), " +
      "together expressing Aceh’s Islamic faith and learning. White is purity, yellow and green " +
      "prosperity. Adopted 2007; the choice of a distinct flag remains politically contested.",
    sources: [
      { title: "Flag of Aceh — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Aceh" },
    ],
  },

  "ID-JB": {
    description:
      "A green flag bearing the West Java emblem: a kujang (Sundanese blade) whose five holes are the " +
      "Pancasila, flanked by 17 rice stalks and 8 cotton blossoms (for 17 August, independence day), " +
      "over mountains, rivers, paddy grids and the Jatiluhur dam. Green is fertility, yellow nobility, " +
      "blue peace, red courage, black steadfastness, white purity; the motto reads “Gemah Ripah Repeh " +
      "Rapih.”",
    sources: [
      { title: "Lambang Jawa Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Barat" },
    ],
  },

  "ID-BA": {
    description:
      "A flag bearing the Bali emblem, a dark-blue pentagon holding a gold five-pointed star (belief in " +
      "God), the Margarana heroes’ temple and a split candi bentar gate, a red padma lotus (the throne " +
      "of Shiva), rice and cotton for prosperity, a chain for unity and fans for Balinese arts. Blue is " +
      "tolerance, gold nobility, red heroism, white purity; the motto is “Bali Dwipa Jaya.”",
    sources: [
      { title: "Lambang Bali — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Bali" },
    ],
  },

  "ID-JT": {
    description:
      "A flag bearing the Central Java emblem, shaped like a kendi (water vessel) on a pentagonal base " +
      "(Pancasila). It holds the silhouette of Borobudur (the region’s cultural identity), twin " +
      "mountains and waters (unity of people and government, and life), a five-pointed star " +
      "(divinity), and rice and cotton (prosperity), with red-and-white ornament for the national " +
      "spirit. Motto: “Prasetya Ulah Sakti Bhakti Praja.”",
    sources: [
      { title: "Lambang Jawa Tengah — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Tengah" },
    ],
  },

  "ID-JI": {
    description:
      "A flag bearing the East Java emblem: a star (divinity), the Tugu Pahlawan heroes’ monument " +
      "(heroism in the independence war), a volcano (striving for a just society), a temple gate (the " +
      "ideals of struggle), rice and cotton (food and clothing), rivers and fields (prosperity) and a " +
      "gear and chain (strength and development). Motto: “Jer Basuki Mawa Beya” — success requires " +
      "sacrifice. In use since 1966.",
    sources: [
      { title: "Lambang Jawa Timur — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Timur" },
    ],
  },

  "ID-JK": {
    description:
      "A flag bearing the Jakarta emblem, a five-pointed shield (Pancasila) holding a gate and the " +
      "National Monument (Monas) — for the capital’s grandeur and its role as the nation’s gateway — " +
      "with rice and cotton (welfare), sea waves (its port and coast) and a gold binding (unity). Gold " +
      "is nobility, red heroism, white purity, blue the open sky. Motto: “Jaya Raya.”",
    sources: [
      { title: "Lambang DKI Jakarta — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Daerah_Khusus_Ibukota_Jakarta" },
    ],
  },

  "ID-SU": {
    description:
      "A flag bearing the heart-shaped North Sumatra emblem: a woman planting rice among palm, rubber " +
      "and tobacco with fish, below the five peaks of the Bukit Barisan (noble society and mutual " +
      "cooperation) and a gold star, held by a fist on a chain. The 17 cotton bolls, 8 web-angles and " +
      "45 rice grains mark 17 August 1945.",
    sources: [
      { title: "Lambang Sumatera Utara — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Utara" },
    ],
  },

  "ID-SB": {
    description:
      "A flag bearing the West Sumatra emblem: the silhouette of a Minangkabau rumah gadang with its " +
      "horn-shaped gonjong roof and a tiered mosque roof, a star for belief in God, and three white " +
      "waves for social dynamism — together standing for a people firm in religion and adat. Motto: " +
      "“Tuah Sakato.”",
    sources: [
      { title: "Lambang Sumatera Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Barat" },
    ],
  },

  "ID-SS": {
    description:
      "A flag bearing the South Sumatra emblem: a five-petalled lotus (courage and justice, and the " +
      "sacred flower of the old Srivijaya kingdom), nine rivers (the “Batang Hari Sembilan” that name " +
      "the province), the Ampera Bridge, and a mountain, under a traditional roof whose 17 peaks, 8 " +
      "rows and 45 tiles mark independence in 1945. Motto: “Bersatu Teguh.”",
    sources: [
      { title: "Lambang Sumatera Selatan — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Selatan" },
    ],
  },

  "ID-RI": {
    description:
      "A flag bearing the Riau emblem: a yellow lancang sailing boat with white sails riding a " +
      "five-layered wave (the five principles of Pancasila), a keris dagger tipped with a serindit " +
      "bird for wisdom and heroism, and framing rice and cotton for prosperity. A chain of 45 links " +
      "marks 1945, the year of Indonesian independence.",
    sources: [
      { title: "Lambang Riau — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Riau" },
    ],
  },

  "ID-JA": {
    description:
      "A flag bearing the pentagonal Jambi emblem (the pentagon for Pancasila): a mosque for faith, " +
      "the Keris Siginjai recalling the struggle against colonial rule, and a gong for democratic " +
      "consensus, with a betel cerana for sincerity. Its motto “Sepucuk Jambi Sembilan Lurah” — one " +
      "Jambi, nine districts — stands for the unity of the province’s nine river regions.",
    sources: [
      { title: "Lambang Jambi — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jambi" },
    ],
  },

  "ID-LA": {
    description:
      "A flag bearing the Lampung emblem: a golden siger (the traditional bridal crown) for cultural " +
      "dignity above a shield with a tiered parasol sheltering the people, flanked by 45 rice stalks " +
      "and 17 pepper leaves for the province’s harvests. Its motto “Sang Bumi Ruwa Jurai” means one " +
      "land of two traditions — the Saibatin and Pepadun peoples.",
    sources: [
      { title: "Lambang Lampung — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Lampung" },
    ],
  },
};

/** True when a sourced flag-meaning explanation exists for the given code. */
export function hasFlagMeaning(code: string | null | undefined): boolean {
  return !!code && code in FLAG_MEANINGS;
}
