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
};

/** True when a sourced flag-meaning explanation exists for the given code. */
export function hasFlagMeaning(code: string | null | undefined): boolean {
  return !!code && code in FLAG_MEANINGS;
}
