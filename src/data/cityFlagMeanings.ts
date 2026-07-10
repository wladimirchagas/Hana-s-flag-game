/**
 * Sourced city-flag-meaning explanations for the Learn-mode capital-city widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` (the SAME progressive-disclosure
 * "What this flag means" component the national/subnational flags use, so the
 * look, font, spacing and behaviour are identical) below the capital city's flag
 * in `src/components/CapitalDetails.tsx`.
 *
 * Keyed by the ISO 3166-2 subdivision code whose CAPITAL city the flag belongs
 * to — the same key `CAPITAL_FLAGS` / `CAPITAL_DETAILS` use — because the widget
 * shows a subdivision's capital-city flag. City flags are a distinct category
 * from national/subnational flags (exactly like the capital-flag files), so they
 * live in their own dataset rather than in `flagMeanings.ts`.
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * An entry MUST only describe the flag the widget actually shows for that code
 * (the bundled `public/capital-flags/*` file); never describe a variant the app
 * does not display.
 *
 * `scripts/check-city-flag-meanings.mjs` (run by `npm run flags:check` + CI)
 * fails the build if an entry has no description, no source, a source without a
 * valid http(s) URL, or a malformed myth. The check is a safety net, not a
 * substitute for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set — a capital whose code has no
 * entry simply renders no disclosure.
 */

import type { FlagMeaning as FlagMeaningData } from "./flagMeanings";

export const CITY_FLAG_MEANINGS: Record<string, FlagMeaningData> = {
  // ── Lisbon — capital of Portugal and of the Lisbon region ───────────────────
  "PT-11": {
    description:
      "A field divided into eight alternating black and white triangles (gyronny), bearing in the " +
      "centre the coat of arms of the city of Lisbon: a golden ship (nau) sailing on green-and-white " +
      "waves, flanked by two black ravens, beneath a golden mural crown, on a scroll reading “Muito " +
      "Nobre e Sempre Leal Cidade de Lisboa” (“Most Noble and Ever Loyal City of Lisbon”). The ship " +
      "and the two ravens commemorate Saint Vincent of Saragossa, the city’s patron: in 1173 King " +
      "Afonso I had the saint’s relics carried by ship to Lisbon Cathedral, and by legend ravens had " +
      "guarded his body since his martyrdom and accompanied the vessel — so the arms depict the ship " +
      "that brought the relics, with a raven at prow and stern.",
    sources: [
      {
        title: "Saint Vincent of Saragossa — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Saint_Vincent_of_Saragossa",
      },
      {
        title: "Lisbon — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lisbon",
      },
    ],
  },

  // ── Madrid — capital of the Community of Madrid and of Spain ─────────────────
  "ES-M": {
    description:
      "A crimson (carmesí) field bearing the coat of arms of the city of Madrid: a black bear standing " +
      "on its hind legs to eat from a green strawberry tree (madroño), on a silver field within a blue " +
      "border charged with seven silver stars, the whole ensigned with an open royal crown. The bear " +
      "and the tree descend from a medieval dispute (around 1222) between the town council and the " +
      "clergy over rights to Madrid’s woodland and pasture: the council took the bear reaching up the " +
      "tree, associating itself with the trees and the timber. The seven stars represent the stars of " +
      "the constellation Ursa Major (the Great Bear / Big Dipper) and appear in the earliest designs; " +
      "the crown was added after 1544, when Charles I (Emperor Charles V) granted Madrid the titles " +
      "“Imperial and Crowned”. The crimson of the flag is the traditional colour of the old Crown of " +
      "Castile.",
    sources: [
      {
        title: "Coat of arms of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Madrid",
      },
      {
        title: "Flag of the City of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Madrid",
      },
    ],
  },

  // ── Rome — capital of Italy and of the Lazio region ─────────────────────────
  "IT-RM": {
    description:
      "A vertical bicolour of dark red (a Tyrian-purple/amaranth shade) at the hoist and golden " +
      "yellow at the fly — the two civic colours of Rome. They continue the city’s medieval heraldic " +
      "tradition: Rome’s coat of arms (officially adopted 1884) is a dark-red shield bearing a golden " +
      "Greek cross and the golden letters SPQR set diagonally. “SPQR” stands for Senatus Populusque " +
      "Romanus (“the Senate and People of Rome”), the formula of the ancient Roman state and, since " +
      "1927, the city’s official motto. The vertical-stripe flag was introduced in 1870, when Rome " +
      "became part of the Kingdom of Italy.",
    sources: [
      { title: "Flag of Rome — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rome" },
    ],
  },

  // ── Barcelona — capital of the Barcelona province and of Catalonia ───────────
  "ES-B": {
    description:
      "A flag quartered from the arms of the city of Barcelona: the first and fourth quarters bear the " +
      "cross of Saint George (a red cross on white), and the second and third bear the four red pallets " +
      "on gold of the Crown of Aragon and the Counts of Barcelona. Saint George (Sant Jordi) is the " +
      "city’s and Catalonia’s patron — the cross was formally established as the city’s badge by 1395 — " +
      "while the red-and-gold bars descend from the House of Barcelona and the Crown of Aragon. The " +
      "citizens’ own emblem, the cross, is placed in the more honourable first and fourth quarters. The " +
      "quartered arms are first documented in 1329.",
    sources: [
      {
        title: "Coat of arms of Barcelona — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Barcelona",
      },
    ],
  },

  // ── Warsaw — capital of Poland and of the Masovian Voivodeship ──────────────
  "PL-MZ": {
    description:
      "A horizontal bicolour of yellow over red — the civic colours of Warsaw. They derive from the " +
      "city’s coat of arms, the Syrenka (the Warsaw Mermaid): a mermaid brandishing a raised sword and " +
      "a round shield on a red field, the city’s guardian and defender of legend. Warsaw’s arms have " +
      "been rendered as a sword-and-shield mermaid since 1622 (an earlier 1390 seal showed a dragon-like " +
      "creature); the present design was fixed in 1938 and restored in 1990.",
    sources: [
      {
        title: "Coat of arms of Warsaw — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Warsaw",
      },
    ],
  },

  // ── Bern — capital of Switzerland and of the canton of Bern ─────────────────
  "CH-BE": {
    description:
      "A red field crossed by a golden (yellow) diagonal band on which a black bear climbs upward — the " +
      "arms shared by the city and canton of Bern. The bear is canting arms: by tradition Duke " +
      "Berthold V of Zähringen vowed to name his new city after the first animal taken on a hunt in the " +
      "surrounding forest, and the first was a bear (German Bär), giving “Bern”. The bear appears on the " +
      "city’s seals from about 1224; live bears have been kept by the city (today at the Bärenpark) for " +
      "centuries.",
    sources: [
      {
        title: "Coat of arms of Bern — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Bern",
      },
    ],
  },

  // ── Munich — capital of the German state of Bavaria ─────────────────────────
  "DE-BY": {
    description:
      "A horizontal bicolour of black over gold — the civic colours of Munich. They come from the " +
      "city’s coat of arms, the Münchner Kindl (“Munich Child”): a young monk in a black cowl trimmed " +
      "with gold, holding a red oath-book. The monk is canting arms — München derives from an Old High " +
      "German phrase meaning “by the monks” (Mönche), referring to the monastic community at the city’s " +
      "origin — so the figure literally depicts the city’s name. Over the centuries the monk was " +
      "increasingly drawn as a child, giving the emblem its name; the current form was standardised in " +
      "1957.",
    sources: [
      {
        title: "Coat of arms of Munich — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Munich",
      },
    ],
  },

  // ── Athens — capital of Greece and of the Attica region ─────────────────────
  "GR-A1": {
    description:
      "A blue field within a gold-and-red border (modelled on the flag of Attica), charged with a white " +
      "cross bearing at its centre a blue disc that shows the head of the goddess Athena in white and " +
      "gold, framed by golden olive branches. Athena is the city’s patron and namesake, and the olive " +
      "her sacred tree — by myth her gift of the olive won her the patronage of the city over Poseidon. " +
      "The municipal flag was adopted in 1995.",
    sources: [
      {
        title: "Athens (Municipality, Greece) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/gr-at-at.html",
      },
    ],
  },

  // ── Edinburgh — capital of Scotland ─────────────────────────────────────────
  "GB-SCT": {
    description:
      "A white field bearing a black triple-towered castle on a rock — Edinburgh Castle, the arms of the " +
      "City of Edinburgh (registered with the Lord Lyon in 1732). The full achievement’s supporters are " +
      "a richly-attired maiden — recalling the castle’s old name Castellum Puellarum, the “Castle of the " +
      "Maidens” — and a doe, for the city’s patron Saint Giles, who by legend lived as a hermit with " +
      "only a doe for company; the crest is an anchor, marking the Lord Provost’s title of Admiral of " +
      "the Firth of Forth. The motto is “Nisi Dominus Frustra” (“Except the Lord [build the house, they " +
      "labour] in vain”), from Psalm 127.",
    sources: [
      {
        title: "Coat of arms of Edinburgh — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Edinburgh",
      },
    ],
  },

  // ── Cardiff — capital of Wales ──────────────────────────────────────────────
  "GB-WLS": {
    description:
      "A white field with a green mount on which a red dragon rears up — the arms of the City of Cardiff, " +
      "granted in 1906. The red dragon is the national emblem of Wales; beside it grows a leek, the " +
      "Welsh floral emblem; and the dragon upholds a red banner charged with three silver chevrons, the " +
      "reputed ensign of Iestyn ap Gwrgant, the last Welsh prince of Glamorgan (11th century). The motto " +
      "is “Y Ddraig Goch Ddyry Gychwyn” (“The Red Dragon Leads the Way”).",
    sources: [
      {
        title: "Cardiff, City of (Glamorganshire) — public-arms reference (DrawShield)",
        url: "https://drawshield.net/reference/public-arms/c/cardiff.html",
      },
      {
        title: "National symbols of Wales — Wikipedia",
        url: "https://en.wikipedia.org/wiki/National_symbols_of_Wales",
      },
    ],
  },

  // ── Belfast — capital of Northern Ireland ───────────────────────────────────
  "GB-NIR": {
    description:
      "A white field bearing a ship in full sail beneath a pile of vair (a heraldic fur), with a bell in " +
      "a canton at the upper hoist — the arms of the City of Belfast (granted 1890, in use from a 1640 " +
      "seal). The ship reflects Belfast’s maritime and shipbuilding heritage; the bell is canting arms, " +
      "punning on the first syllable of “Bel-fast”; and the vair is drawn from the arms of Sir Arthur " +
      "Chichester, founder of modern Belfast. The supporters (a chained wolf and a seahorse) repeat " +
      "these themes — the wolf from the Chichester arms, the seahorse a sea emblem. The motto is “Pro " +
      "Tanto Quid Retribuamus” (“In return for so much, what shall we give back?”), from Psalm 116. " +
      "(This is the flag of the city of Belfast, not the Ulster Banner of Northern Ireland.)",
    sources: [
      {
        title: "Coat of arms of Belfast — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Belfast",
      },
    ],
  },

  // ── Stockholm — capital of Sweden ───────────────────────────────────────────
  "SE-AB": {
    description:
      "A blue field bearing the golden, crowned head of Saint Erik — the arms of Stockholm. Erik IX, a " +
      "12th-century king of Sweden, is the patron saint of both the kingdom and its capital; his crowned " +
      "head has identified the city on its seals since the Middle Ages. Blue and gold are also the " +
      "national colours of Sweden.",
    sources: [
      {
        title: "Coat of arms of Stockholm — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Stockholm",
      },
    ],
  },

  // ── Sydney — capital of the Australian state of New South Wales ─────────────
  "AU-NSW": {
    description:
      "The flag of the City of Sydney, a banner of the city arms granted in 1908. On a gold-and-blue " +
      "field a three-masted sailing ship recalls the maritime founding of Sydney; the crest is an anchor " +
      "within a mural crown surmounted by a star. As originally granted the supporters were an " +
      "18th-century British seaman and an Aboriginal Australian, and the motto was “I take but I " +
      "surrender” — read as the colony’s claim of the land and its later surrender to the emerging " +
      "Australian nation. (A redesigned version of the arms followed in 1996.)",
    sources: [
      {
        title: "Coat of arms of Sydney — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sydney",
      },
    ],
  },

  // ── Graz — capital of the Austrian state of Styria ──────────────────────────
  "AT-6": {
    description:
      "A green field bearing a white (silver) panther with red horns, claws and tongue, breathing red " +
      "fire — the Grazer Panther. Graz has borne the panther of Styria since it was the medieval capital " +
      "of the duchy (the Styrian panther appears from the seal of Margrave Ottokar III in 1160); the " +
      "city’s version differs from the state arms in that its panther is crowned. In European heraldry " +
      "the panther is a symbol of strength; the fire-breathing beast is the emblem of Styria and its " +
      "capital.",
    sources: [
      {
        title: "Coat of arms of Styria — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Styria",
      },
      { title: "Graz — Wikipedia", url: "https://en.wikipedia.org/wiki/Graz" },
    ],
  },

  // ── Innsbruck — capital of the Austrian state of Tyrol ──────────────────────
  "AT-7": {
    description:
      "A red field bearing a white bird’s-eye view of the bridge over the river Inn. These are canting " +
      "arms — Innsbruck means “bridge over the Inn” (the river Inn + German Brücke, “bridge”) — so the " +
      "flag literally depicts the city’s name and the crossing that gave the town its importance on the " +
      "trade route. The bridge design has been used since 1267.",
    sources: [
      { title: "Innsbruck — Wikipedia", url: "https://en.wikipedia.org/wiki/Innsbruck" },
    ],
  },

  // ── Salzburg — capital of the Austrian state of Salzburg ────────────────────
  "AT-5": {
    description:
      "A horizontal bicolour of red over white — the traditional colours of Salzburg, taken from the " +
      "arms of the former Prince-Archbishopric of Salzburg. Those arms are parted per pale: a black lion " +
      "on gold and a silver bar on red; the official version of the flag adds them at the centre beneath " +
      "the crown of a Prince of the Holy Roman Empire (added after Salzburg passed to Habsburg rule in " +
      "1816).",
    sources: [
      {
        title: "Salzburg (Austria) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/at-sa.html",
      },
    ],
  },

  // ── Tirana — capital of Albania ─────────────────────────────────────────────
  "AL-11": {
    description:
      "A light-blue field bearing the arms of Tirana: a shield parted per pale red and blue showing, on " +
      "the hoist side, the white Tirana Clock Tower (built 1822, a landmark of the city) and, on the fly " +
      "side, a silver rampant lion, with a golden fleur-de-lis in chief; above the shield rises Tirana " +
      "Castle (the Fortress of Justinian). The lion and fleur-de-lis are the emblem of the medieval " +
      "Skuraj family that ruled central Albania. The arms were adopted by the city council in 2000.",
    sources: [
      {
        title: "Symbols of Tirana — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Symbols_of_Tirana",
      },
      { title: "Flag of Tirana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tirana" },
    ],
  },

  // ── Abu Dhabi — capital of the United Arab Emirates ─────────────────────────
  "AE-AZ": {
    description:
      "A red field with a white rectangle in the upper hoist (canton) — the flag of the Emirate of Abu " +
      "Dhabi. Red was the traditional banner colour of the Trucial emirates; under the 1820 General " +
      "Maritime Treaty with Britain the emirates added white to their plain red flags as a sign of " +
      "peace at sea, and Abu Dhabi carries the white as a canton to distinguish its flag from those of " +
      "the neighbouring emirates.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Dubai — capital of the Emirate of Dubai (UAE) ───────────────────────────
  "AE-DU": {
    description:
      "A red field with a white vertical stripe along the hoist — the flag of the Emirate of Dubai. Red " +
      "was the traditional colour of the Trucial emirates; the white was added under the 1820 General " +
      "Maritime Treaty with Britain as a sign of peaceful intent at sea.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Sharjah — capital of the Emirate of Sharjah (UAE) ───────────────────────
  "AE-SH": {
    description:
      "A red rectangle within a broad white border — the “white-pierced-red” flag of the Emirate of " +
      "Sharjah. This white-bordered red design was the pattern set for the Trucial States under the 1820 " +
      "General Maritime Treaty with Britain (the white signalling peace at sea) and is associated with " +
      "the Al Qawasim, Sharjah’s ruling house.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Ajman — capital of the Emirate of Ajman (UAE) ───────────────────────────
  "AE-AJ": {
    description:
      "A red field with a white vertical stripe along the hoist — the flag of the Emirate of Ajman. As " +
      "with the other Trucial emirates, the red is the traditional field colour and the white was added " +
      "under the 1820 General Maritime Treaty with Britain as a mark of peace at sea.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Umm Al Quwain — capital of the Emirate of Umm Al Quwain (UAE) ────────────
  "AE-UQ": {
    description:
      "A red field with a white vertical stripe along the hoist and a white star and crescent in the red " +
      "— the flag of the Emirate of Umm Al Quwain. The red and white follow the Trucial pattern set by " +
      "the 1820 General Maritime Treaty with Britain (red field, white for peace at sea); the star and " +
      "crescent are a symbol of Islam.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Luanda — capital of Angola ──────────────────────────────────────────────
  "AO-LUA": {
    description:
      "A Portuguese-style municipal flag: the arms of Luanda on a gyronny of eight (eight triangles " +
      "radiating from the centre) in purple and yellow, ensigned with a golden mural crown. In the " +
      "Portuguese municipal-heraldry tradition Angola inherited, the gyronny of eight marks the rank of " +
      "a city (as opposed to a town or village) and the golden five-towered mural crown denotes a city " +
      "municipality.",
    sources: [
      {
        title: "Luanda (Angola) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ao-lu.html",
      },
    ],
  },

  // ── Gyumri — capital of the Shirak Province, Armenia ────────────────────────
  "AM-SH": {
    description:
      "A white field within a golden frame, bearing a red cross and the golden panther of the Bagratid " +
      "dynasty. The red cross stands for the endurance of the people and their Christian faith; the " +
      "golden panther, taken from the arms of the Bagratids, symbolises Armenian independence and " +
      "statehood. The city arms were adopted in 2001 and the flag in 2011.",
    sources: [
      {
        title: "Symbols of Gyumri — City of Gyumri (official)",
        url: "https://www.gyumricity.am/en/gyumri/symbols-of-gyumri",
      },
      {
        title: "Gyumri (Municipality, Armenia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/am-gyumr.html",
      },
    ],
  },

  // ── Kabul — capital of Afghanistan ──────────────────────────────────────────
  "AF-KAB": {
    description:
      "A dark-blue field bearing the white seal of the Kabul municipality: an eagle holding a key above " +
      "the national emblem of Afghanistan, encircled by the municipality’s name, with the dates 1298 " +
      "(1919, the year of Afghan independence from Britain) and 1389 (2010). The dark-blue field sets " +
      "the city flag apart from Afghanistan’s national colours.",
    sources: [
      {
        title: "Kabul (Afghanistan) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/af-kabul.html",
      },
    ],
  },

  // ── Norfolk Island (capital Kingston) — Australian external territory ────────
  "AU-NF": {
    description:
      "A green–white–green vertical triband bearing a green Norfolk Island pine in the central white " +
      "band. The Norfolk Island pine is native to the island and its official tree; the green stands " +
      "for the island’s abundant vegetation and fertile land, and the white for peace and harmony " +
      "between the people and the natural world. The flag was set by the Norfolk Island Flag and Public " +
      "Seal Act 1979 and has flown since 1980.",
    sources: [
      {
        title: "Flag of Norfolk Island — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Norfolk_Island",
      },
    ],
  },

  // ── Darwin — capital of the Northern Territory, Australia ───────────────────
  "AU-NT": {
    description:
      "A green–yellow–red vertical tricolour with the arms of the City of Darwin (granted 1959) on the " +
      "yellow. The shield’s ship marks Darwin’s natural harbour and its founding as a port; the fort " +
      "recalls its origin as a military base defending the British claim to the north; the supporters " +
      "are an Aboriginal man, for the area’s first inhabitants, and a European miner, for the mining " +
      "industry that grew the town; and the encircled star is taken from the arms of Charles Darwin, " +
      "the city’s namesake. The crest’s compass, north highlighted, marks Darwin as Australia’s " +
      "northern city.",
    sources: [
      {
        title: "Coat of arms of Darwin — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Darwin",
      },
    ],
  },

  // ── Brisbane — capital of Queensland, Australia ─────────────────────────────
  "AU-QLD": {
    description:
      "The flag of the City of Brisbane, blue and gold with the city arms. The three caducei (the staff " +
      "of Hermes) stand for commerce — Hermes being the Greek god and protector of trade — reflecting " +
      "Brisbane’s role as a trading port; the stars (mullets) recall the astronomer Sir Thomas Brisbane, " +
      "after whom the city is named, and the Stafford knot his old regiment. Blue represents the sea and " +
      "the Brisbane River, gold the sun and the city’s warm climate.",
    sources: [
      {
        title: "Coat of arms of Brisbane — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Brisbane",
      },
    ],
  },

  // ── Adelaide — capital of South Australia ───────────────────────────────────
  "AU-SA": {
    description:
      "A blue field divided into four quarters by a gold cross surmounted by a red cross, ensigned with " +
      "a golden mural crown (the mark of a municipality) — the arms of the City of Adelaide, granted " +
      "1929. The quarters show a three-masted ship (commerce and the sea link to Britain), a golden " +
      "fleece (the wool trade), a bull’s head (the cattle industry) and a wheatsheaf (agriculture) — the " +
      "foundations of the early city’s economy.",
    sources: [
      {
        title: "Coat of arms of Adelaide — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Adelaide",
      },
    ],
  },

  // ── Melbourne — capital of Victoria, Australia ──────────────────────────────
  "AU-VIC": {
    description:
      "A white (silver) field bearing the red cross of Saint George with a royal crown at its centre, " +
      "and in the four corners a golden fleece, a black bull, a spouting whale and a three-masted ship " +
      "— the arms of the City of Melbourne (approved for the city seal in 1843; granted by letters " +
      "patent in 1940). The fleece, bull, whale and ship stand for wool, tallow and oil — the young " +
      "city’s chief exports — and their transport by sea from Port Phillip; the cross and crown denote " +
      "loyalty to the Crown and Britain.",
    sources: [
      {
        title: "Coat of arms of Melbourne — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Melbourne",
      },
    ],
  },

  // ── Perth — capital of Western Australia ────────────────────────────────────
  "AU-WA": {
    description:
      "The flag of the City of Perth: the red cross of Saint George bearing the city arms at its centre. " +
      "The arms (granted 1926, amended 1949) show black swans — long common on the Swan River, whose " +
      "estuary gave the Swan River Colony that became Perth its name — while a quarter is taken from the " +
      "arms of Perth in Scotland, the city Perth was named after. The gold mural crown marks it as a " +
      "municipality.",
    sources: [
      {
        title: "Coat of arms of Perth — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Perth",
      },
    ],
  },

  // ── Brest — capital of the Brest Region, Belarus ────────────────────────────
  "BY-BR": {
    description:
      "A sky-blue field bearing a silver arrow pointing upward and a silver bow — the arms of Brest, " +
      "adopted in this form on 26 January 1991 and derived from the city’s historic seal. In Belarusian " +
      "civic heraldry silver stands for nobility and valour, and blue for loyalty.",
    sources: [
      { title: "Brest, Belarus — Wikipedia", url: "https://en.wikipedia.org/wiki/Brest,_Belarus" },
    ],
  },

  // ── Gomel (Homyel) — capital of the Gomel Region, Belarus ───────────────────
  "BY-HO": {
    description:
      "A blue field bearing a reclining golden lynx — the arms of Gomel, based on the historic city " +
      "arms of 1855. The lynx, an animal of the region’s forests, is the city’s long-standing emblem.",
    sources: [
      { title: "Gomel — Wikipedia", url: "https://en.wikipedia.org/wiki/Gomel" },
    ],
  },

  // ── Hrodna (Grodno) — capital of the Grodno Region, Belarus ─────────────────
  "BY-HR": {
    description:
      "A blue field bearing the deer of Saint Hubert — a stag with a golden cross rising between its " +
      "antlers — leaping over a silver fence. The emblem refers to the legend of Saint Hubert, patron " +
      "of hunters, who was converted by the vision of a crucifix between a stag’s antlers; it has been " +
      "Grodno’s arms since the city was granted them under Magdeburg rights.",
    sources: [
      { title: "Grodno — Wikipedia", url: "https://en.wikipedia.org/wiki/Grodno" },
    ],
  },

  // ── Mahilyow (Mogilev) — capital of the Mogilev Region, Belarus ─────────────
  "BY-MA": {
    description:
      "A blue field bearing the arms of Mogilev: three silver towers on a green base, with an armoured " +
      "knight standing in the open gate, sword raised, and above the gate the Pahonia (the “Pursuit,” a " +
      "silver mounted knight — the historic emblem of the Grand Duchy of Lithuania). The three towers " +
      "recall the three hills on which the city was founded; the knight in the gate signifies a city " +
      "open to friends but ready to repel any enemy.",
    sources: [
      { title: "Mogilev — Wikipedia", url: "https://en.wikipedia.org/wiki/Mogilev" },
      {
        title: "Mogilyov City (Belarus) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/by-ma-mo.html",
      },
    ],
  },

  // ── Minsk — capital of Belarus ──────────────────────────────────────────────
  "BY-MI": {
    description:
      "A blue field bearing the historic arms of Minsk: the Assumption of the Virgin Mary, flanked by " +
      "two angels and two cherubs. The arms were granted to Minsk in 1591 by King Sigismund III Vasa " +
      "under Magdeburg rights; through every later revision the figure of the Mother of God has always " +
      "remained the heart of the city’s emblem.",
    sources: [
      { title: "Minsk — Wikipedia", url: "https://en.wikipedia.org/wiki/Minsk" },
    ],
  },

  // ── Vitebsk (Viciebsk) — capital of the Vitebsk Region, Belarus ─────────────
  "BY-VI": {
    description:
      "A light-blue field bearing the arms of Vitebsk: the image of the Saviour (Christ) in profile " +
      "above a bare red sword, supported by angels. The Saviour reflects the city’s deep Orthodox " +
      "Christian tradition, and the red sword its defence; the design descends from Vitebsk’s historic " +
      "seal.",
    sources: [
      { title: "Vitebsk — Wikipedia", url: "https://en.wikipedia.org/wiki/Vitebsk" },
    ],
  },

  // ── Brussels — capital of Belgium ───────────────────────────────────────────
  "BE-BRU": {
    description:
      "A horizontally divided green-and-red flag bearing a large golden silhouette of the Archangel " +
      "Michael slaying the Devil with a cross-shaped spear — the flag of the City of Brussels. Saint " +
      "Michael is the city’s patron (its cathedral is dedicated to Saints Michael and Gudula), and the " +
      "archangel defeating the dragon, a symbol of the triumph of good over evil, has appeared on the " +
      "city’s seal since the 13th century.",
    sources: [
      {
        title: "Symbols of Brussels — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Symbols_of_Brussels",
      },
      {
        title: "Brussels (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-bxlbr.html",
      },
    ],
  },

  // ── Antwerp — capital of the Antwerp Province, Belgium ──────────────────────
  "BE-VAN": {
    description:
      "A red-white-red horizontal triband — the flag of the City of Antwerp, its colours taken from the " +
      "city arms (a red castle flanked by two white hands). The hands are canting arms tied to the folk " +
      "etymology of the name: the legend of Silvius Brabo, who slew the giant Antigoon and threw his " +
      "severed hand into the river Scheldt — “hand werpen” (“hand-throwing”), giving “Antwerpen”. The " +
      "castle stands for the city itself.",
    sources: [
      {
        title: "Antwerp (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-vanan.html",
      },
    ],
  },

  // ── Leuven — capital of the Flemish Brabant Province, Belgium ───────────────
  "BE-VBR": {
    description:
      "A red-white-red horizontal triband — the civic colours of Leuven, taken from the city arms. By " +
      "legend the red and white recall the blood-stained banks of the river Dyle after the Battle of " +
      "Leuven in 891, in which the East Frankish king Arnulf defeated a Viking army (a legend of the " +
      "same kind told of the flags of Austria and Latvia).",
    sources: [
      { title: "Leuven — Wikipedia", url: "https://en.wikipedia.org/wiki/Leuven" },
    ],
  },

  // ── Hasselt — capital of the Limburg Province, Belgium ──────────────────────
  "BE-VLI": {
    description:
      "A flag of alternating white and green stripes (white-green-white-green-white) — the colours of " +
      "the arms of Hasselt. Those arms halve the golden-and-red bars of the medieval County of Loon " +
      "with a green hazel tree on silver; the hazel tree is canting arms, punning on the city’s name " +
      "(Dutch hazel → Hasselt). The green-and-white stripes derive from that hazel-tree half of the " +
      "shield.",
    sources: [
      {
        title: "Hasselt (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-vlihs.html",
      },
    ],
  },

  // ── Wavre — capital of the Walloon Brabant Province, Belgium ────────────────
  "BE-WBR": {
    description:
      "A white field bearing three green water-lily leaves arranged two-and-one — the flag of Wavre. " +
      "The water-lily leaves are drawn from the city arms and evoke Wavre’s setting in the marshy valley " +
      "of the river Dyle.",
    sources: [
      {
        title: "Wavre (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wbrwv.html",
      },
    ],
  },

  // ── Mons — capital of the Hainaut Province, Belgium ─────────────────────────
  "BE-WHT": {
    description:
      "A red-white-red vertical triband — the flag of the City of Mons, in the traditional red and white " +
      "heraldic colours long associated with the town (an earlier version arranged the same colours as " +
      "horizontal stripes).",
    sources: [
      {
        title: "Mons (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-whtms.html",
      },
    ],
  },

  // ── Liège — capital of the Liège Province, Belgium ──────────────────────────
  "BE-WLG": {
    description:
      "A vertical bicolour of red and yellow — the traditional colours of the city of Liège, seat of the " +
      "former Prince-Bishopric of Liège. The city’s own emblem is the perron: a stone column topped by " +
      "a cross-bearing orb that stood in the market place and came to symbolise Liège’s ancient civic " +
      "liberties and self-government.",
    sources: [
      {
        title: "Perron of Liège — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Perron_of_Li%C3%A8ge",
      },
      {
        title: "Liège (Belgium) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wlg.html",
      },
    ],
  },

  // ── Arlon — capital of the Luxembourg Province, Belgium ─────────────────────
  "BE-WLX": {
    description:
      "A white-and-light-blue flag — a simplification of the arms of Arlon, blazoned “barruly of ten " +
      "argent and azure, a lion gules” (alternating silver and blue bars with a red lion). The oldest " +
      "known seal of Arlon, from 1311, already shows a lion.",
    sources: [
      {
        title: "Arlon (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wlxar.html",
      },
    ],
  },

  // ── Namur — capital of the Namur Province and of Wallonia, Belgium ──────────
  "BE-WNA": {
    description:
      "A bicolour of black and yellow — the colours the city of Namur adopted in 1909, long historically " +
      "associated with the town and the County of Namur (as distinct from the black-and-red the province " +
      "later took). The county’s arms are a black lion with a red bend on gold.",
    sources: [
      {
        title: "Namur (Belgium) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wna.html",
      },
    ],
  },

  // ── Sofia — capital of Bulgaria (Sofia city) ────────────────────────────────
  "BG-22": {
    description:
      "A light-blue field bearing the quartered arms of Sofia (created 1900). The quarters show the " +
      "ancient city-goddess Ulpia Serdica (from a Roman coin), the church of St Sofia that gave the city " +
      "its name, a statue of Apollo Medicus for the mineral springs, and Mount Vitosha at whose foot the " +
      "city lies; the small central shield bears a rampant lion — the Bulgarian national emblem — placed " +
      "there to symbolise the continuity between the old capital, Veliko Tarnovo, and the new one. The " +
      "motto reads “Расте, но не старее” (“Ever growing, never aging”).",
    sources: [
      {
        title: "Coat of arms of Sofia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sofia",
      },
    ],
  },

  // ── Sofia — capital of the Sofia Province, Bulgaria ─────────────────────────
  "BG-23": {
    description:
      "A light-blue field bearing the quartered arms of the city of Sofia (created 1900). The quarters " +
      "show the ancient city-goddess Ulpia Serdica (from a Roman coin), the church of St Sofia that gave " +
      "the city its name, a statue of Apollo Medicus for the mineral springs, and Mount Vitosha at whose " +
      "foot the city lies; the central shield bears the Bulgarian rampant lion, marking the continuity " +
      "between the old capital Veliko Tarnovo and the new one. The motto reads “Расте, но не старее” " +
      "(“Ever growing, never aging”).",
    sources: [
      {
        title: "Coat of arms of Sofia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sofia",
      },
    ],
  },

  // ── Plovdiv — capital of the Plovdiv Province, Bulgaria ─────────────────────
  "BG-16": {
    description:
      "A light-blue field bearing the arms of Plovdiv: two lions supporting a crown over a shield that " +
      "shows a tower on seven small hillocks and a wavy stripe. The seven hillocks are Plovdiv’s seven " +
      "syenite hills — the city is known as “the City of the Seven Hills” — and the wavy stripe is the " +
      "river Maritsa that flows through it. The ribbon reads “Древен и вечен” (“Ancient and eternal”). " +
      "The arms were adopted in 1997.",
    sources: [
      { title: "Plovdiv — Wikipedia", url: "https://en.wikipedia.org/wiki/Plovdiv" },
    ],
  },

  // ── Ruse — capital of the Ruse Province, Bulgaria ───────────────────────────
  "BG-18": {
    description:
      "A white field bearing the blue arms of Ruse: the city’s Monument of Liberty (a female figure " +
      "holding a sword and pointing north-west toward the free peoples of Europe) above waves for the " +
      "river Danube, beneath a fortress wall that marks the city’s antiquity. The monument, sculpted by " +
      "Arnoldo Zocchi in the early 20th century, became the city’s emblem.",
    sources: [
      {
        title: "Coat of arms and flag — Ruse Municipality",
        url: "https://obshtinaruse.bg/en/coat-of-arms-and-flag",
      },
      {
        title: "Monument of Liberty, Ruse — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Monument_of_Liberty,_Ruse",
      },
    ],
  },

  // ── Stara Zagora — capital of the Stara Zagora Province, Bulgaria ────────────
  "BG-24": {
    description:
      "A green field bearing the arms of Stara Zagora (created 1979): on a red shield topped by a " +
      "fortress wall, a golden lioness with her cub, and below, on green, golden furrows converging " +
      "toward the centre. The lioness and cub are taken from an 11th–12th-century stone relief found in " +
      "the city and stand for the maternal instinct and the city’s continual rebirth; the fortress wall " +
      "marks its ancient standing (drawn from a fortress on Roman Augusta Traiana coins); the furrows " +
      "represent the fertile Stara Zagora plain.",
    sources: [
      {
        title: "City symbols — Stara Zagora Municipality",
        url: "https://www.starazagora.bg/en/city-symbols",
      },
    ],
  },

  // ── Veliko Tarnovo — capital of the Veliko Tarnovo Province, Bulgaria ────────
  "BG-04": {
    description:
      "A purple field bearing the golden arms of Veliko Tarnovo — a crowned lion above the Tsarevets " +
      "fortress. Veliko Tarnovo was the capital of the Second Bulgarian Empire (1185–1393), and Tsarevets " +
      "was its royal and patriarchal citadel and the empire’s strongest fortress; the crowned lion is the " +
      "Bulgarian royal emblem and purple the imperial colour, together marking the city’s standing as the " +
      "medieval capital.",
    sources: [
      {
        title: "Tsarevets (fortress) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Tsarevets_(fortress)",
      },
    ],
  },
};
