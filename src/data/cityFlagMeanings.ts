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

  // ── San Luis — capital of San Luis Province, Argentina ──────────────────────
  "AR-D": {
    description:
      "A modern minimalist flag divided by a diagonal: the upper celeste (sky-blue) field stands for the " +
      "sky — liberty, loyalty and truth — while the lower green field stands for the sierras that ring the " +
      "city and their vegetation. At the centre a clock tower recalls the city’s landmark tower, and the " +
      "clock’s hands are drawn as a bird in flight, reinforcing the theme of the open sky.",
    sources: [
      {
        title: "La Capital Department, San Luis (Argentina) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ar-d-ca.html",
      },
    ],
  },

  // ── Paraná — capital of Entre Ríos Province, Argentina ──────────────────────
  "AR-E": {
    description:
      "A white field bearing the municipal coat of arms (adopted 1877; the flag was made official in 1994). " +
      "The oval shield is split: the upper half carries the star of Entre Ríos on purple and the clasped " +
      "hands of fraternity on blue, for the province the city belongs to; the lower half shows the city " +
      "itself — the characteristic barranca of La Bajada, the Paraná river at its foot and islands beyond. " +
      "The shield is framed by a sheaf of wheat, a log, an anchor and a piece of local shell-limestone, and " +
      "topped by the Phrygian cap of liberty lit by the Sun of May for the Argentine Republic.",
    sources: [
      {
        title: "Símbolos — Municipalidad de Paraná",
        url: "https://www.parana.gob.ar/gobierno/simbolos.php",
      },
      {
        title: "Bandera de Paraná — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_Paran%C3%A1",
      },
    ],
  },

  // ── Santiago del Estero — capital of Santiago del Estero Province, Argentina ─
  "AR-G": {
    description:
      "A white field — for purity, peace and “parliament” — enclosed by a golden rectangular border that " +
      "stands for straightness on all four sides and for the sun, the first dignity of Argentine heraldry. " +
      "At the centre is the city’s coat of arms, granted by King Felipe II in 1577: a golden castle of three " +
      "towers (wealth, strength and faith) with blue doors and windows (nobility), the waters of the Dulce " +
      "river, and three silver scallop shells for the city’s patron Santiago (St James). A light-blue ribbon " +
      "reads “Muy Noble Ciudad” and the tie bears “Madre de Ciudades” (Mother of Cities), Santiago del Estero " +
      "being the oldest continuously-inhabited city in Argentina.",
    sources: [
      {
        title: "Capital Department, Santiago del Estero (Argentina) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ar-g-cp.html",
      },
    ],
  },

  // ── Resistencia — capital of Chaco Province, Argentina ──────────────────────
  "AR-H": {
    description:
      "Adopted in 2019 from a public competition. Its colours echo the Chaco provincial flag: forest green " +
      "for the territory’s nature, sky-blue for the national flag and for the waters the first Friulian " +
      "immigrants arrived by, and golden yellow from the sun of the national flag. The white square set on " +
      "point in the centre reflects a real feature of the city — its street grid is turned 45° from north, " +
      "so the block corners point to the four cardinal directions, making the plan a compass. Within it the " +
      "“Sol de Resistencia”, a Sun of May rendered as a sculptural form, alludes to Resistencia’s identity as " +
      "“the City of Sculptures”.",
    sources: [
      {
        title: "Bandera de Resistencia — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_Resistencia",
      },
    ],
  },

  // ── San Fernando del Valle de Catamarca — capital of Catamarca, Argentina ───
  "AR-K": {
    description:
      "Adopted in 2005 from an open competition (winning design by Fabián Martinena). The whole flag evokes " +
      "the Catamarcan poncho, the region’s signature weaving: on a white field two blood-red stripes stand " +
      "for the ochre earth and two green guard-bands for the sap that nourishes it, while the central figure " +
      "of eight rectangles imitates the patterns the weavers (teleras) work into a poncho’s borders. The " +
      "dark-brown motif represents the sacred spirit of the mountains, and the cross within it is the Cross " +
      "of America — standing for water and joining the indigenous and Hispanic-Christian strands of the " +
      "province’s culture.",
    sources: [
      {
        title: "Simbología — Municipalidad de San Fernando del Valle de Catamarca",
        url: "https://www.catamarcaciudad.gob.ar/simbologia/",
      },
      {
        title: "Bandera de San Fernando del Valle de Catamarca — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_San_Fernando_del_Valle_de_Catamarca",
      },
    ],
  },

  // ── Formosa — capital of Formosa Province, Argentina ────────────────────────
  "AR-P": {
    description:
      "The flag of the city of Formosa, chosen by public vote in the “Mi Ciudad es Bandera” competition " +
      "(winning design by Matilde E. Cañete and José M. Lezcano). Its centre is the municipal seat — the " +
      "building where the city first took shape and where formoseños still gather — set with the railway " +
      "station and the streets that stand for the city’s growth, the lapacho flower as the emblematic bloom " +
      "of the region, and a sun for rebirth and hope.",
    sources: [
      {
        title: "La Ciudad de Formosa ya tiene su bandera oficial — Diario Exprés",
        url: "https://www.expresdiario.com.ar/la-ciudad-de-formosa-ya-tiene-su-bandera-oficial-un-simbolo-de-identidad-y-pertenencia/",
      },
    ],
  },

  // ── Neuquén — capital of Neuquén Province, Argentina ────────────────────────
  "AR-Q": {
    description:
      "Titled “Confluencia” and first raised in 2010 (designed by Carlos Alberto Juárez), the flag has a " +
      "sky-blue field crossed by two white wavy ribbons that picture the confluence of the Neuquén and Limay " +
      "rivers — the meeting of waters that gives the city its site and its name.",
    sources: [
      {
        title: "Neuquén (ciudad) — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Neuqu%C3%A9n_(ciudad)",
      },
    ],
  },

  // ── Santa Fe — capital of Santa Fe Province, Argentina ──────────────────────
  "AR-S": {
    description:
      "The first official flag of the city of Santa Fe, chosen by public competition. Its celeste and white " +
      "recall Belgrano’s national flag, the sky-blue also standing for the city’s waters — the Paraná and " +
      "Salado rivers and the Setúbal lagoon. It bears the Puente Colgante (hanging bridge) as a symbol of " +
      "union, laurels for the achievements of its people, and a book for the national and provincial " +
      "constitutions — Santa Fe being the “Cradle of the Constitution”, placed at the flag’s centre for that " +
      "reason.",
    sources: [
      {
        title: "Qué significan los símbolos de la bandera de la ciudad de Santa Fe — Aire de Santa Fe",
        url: "https://www.airedesantafe.com.ar/santa-fe/que-significan-los-simbolos-la-bandera-la-ciudad-santa-fe-explicados-un-experto-n636405",
      },
    ],
  },

  // ── Corrientes — capital of Corrientes Province, Argentina ──────────────────
  "AR-W": {
    description:
      "Established by municipal ordinance in 2014. Sky-blue side bands (the colour Belgrano chose for the " +
      "national and provincial flags) frame thin red stripes for federalism and a central white band for God " +
      "and peace. On the white band a setting sun — the sunset seen from the city’s riverfront Costanera — " +
      "carries at its centre the founding Cross of Miracles (Cruz de los Milagros), and seven spear-points " +
      "rise from the base for the “Siete Corrientes”, the seven river points in the city’s old name San Juan " +
      "de Vera de las Siete Corrientes.",
    sources: [
      {
        title: "Bandera de la Ciudad de Corrientes — Municipalidad de Corrientes",
        url: "https://ciudaddecorrientes.gov.ar/informaci-n/bandera-de-la-ciudad-de-corrientes",
      },
      {
        title: "Bandera de la Ciudad de Corrientes — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_la_Ciudad_de_Corrientes",
      },
    ],
  },

  // ── Córdoba — capital of Córdoba Province, Argentina ────────────────────────
  "AR-X": {
    description:
      "Adopted in 2023, the flag of the city of Córdoba has three equal horizontal stripes — red, white and " +
      "yellow — with a golden Jesuit sun on the white centre. Red stands for the courage, strength and " +
      "potential of the cordobés people; white for living together in harmony and for the city’s place as a " +
      "geographic and strategic hub; yellow for joy, energy and liveliness. The golden Jesuit sun recalls " +
      "Córdoba’s historic and cultural legacy and the presence of the Society of Jesus (whose Jesuit Block is " +
      "a UNESCO World Heritage Site).",
    sources: [
      {
        title: "La bandera oficial de la ciudad ya flamea en el cielo cordobés — Municipalidad de Córdoba",
        url: "https://cordoba.gob.ar/la-bandera-oficial-de-la-ciudad-ya-flamea-en-el-cielo-cordobes/",
      },
      {
        title: "Bandera de Córdoba (Argentina) — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_C%C3%B3rdoba_(Argentina)",
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

  // ── Canberra — capital of the Australian Capital Territory and of Australia ──
  "AU-ACT": {
    description:
      "The flag of the Australian Capital Territory, adopted on 25 March 1993 after a public design " +
      "competition. The hoist is a blue panel bearing the five white stars of the Southern Cross; the " +
      "fly is a gold (yellow) panel bearing the coat of arms of the City of Canberra. The blue stands " +
      "for the Canberra sky and the gold for the land. On the Canberra arms the blue and white swans " +
      "represent Aboriginal Australians and European Australians; the castle alludes to Canberra as the " +
      "national capital and the royal crown to the role of the Sovereign; and the shield’s sword of " +
      "justice, parliamentary mace and white rose of York recall the Duke of York (later King George VI) " +
      "opening the first Parliament House in Canberra in 1927. Because Canberra is coextensive with the " +
      "Territory, this flag serves as the capital city’s own flag.",
    sources: [
      {
        title: "Flag of the Australian Capital Territory — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Australian_Capital_Territory",
      },
      {
        title: "Symbols of the Australian Capital Territory — Department of the Prime Minister and Cabinet",
        url: "https://www.pmc.gov.au/resources/australian-symbols-booklet/state-and-territory-symbols/symbols-australian-capital-territory",
      },
    ],
  },

  // ── Hobart — capital of Tasmania ────────────────────────────────────────────
  "AU-TAS": {
    description:
      "The flag of the City of Hobart, bearing the city’s coat of arms (designed by the architect " +
      "I. G. Anderson in 1951 and first flown in 1953). On the shield a red lion — taken from the flag " +
      "of Tasmania, and placed in the chief (top) to signify Hobart’s standing as the state capital — " +
      "stands above a gold six-pointed star with wavy rays on blue, drawn from the arms of Robert Hobart, " +
      "4th Earl of Buckinghamshire, the Secretary of State for War and the Colonies after whom the city " +
      "was named in 1804. The city’s Latin motto is “Sic Fortis Hobartia Crevit” — “Thus in strength did " +
      "Hobart grow”.",
    sources: [
      {
        title: "Coat of arms of Hobart — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Hobart",
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

  // ── Belize City — capital of the Belize District, Belize ────────────────────
  "BZ-BZ": {
    description:
      "A white field with red and blue waves along the base — Belize’s national colours — carrying the " +
      "Belize City Council emblem and the motto “Government at your service”. In the emblem a house " +
      "cradled by a pair of hands stands for community development supported by the city government, set " +
      "beneath a ring of stars. The red, white and blue tie the city to the national flag.",
    sources: [
      {
        title: "Belize City — Vexillology Wiki",
        url: "https://vexillology.miraheze.org/wiki/Belize_City",
      },
      {
        title: "Belize City (Belize) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bz-bz-bz.html",
      },
    ],
  },

  // ── Dangriga — capital of the Stann Creek District, Belize ──────────────────
  "BZ-SC": {
    description:
      "A black-white-yellow horizontal tricolour bearing the Dangriga Town Council seal. The three " +
      "colours are those of the Garifuna flag — Dangriga is the cultural capital of the Garifuna (Garinagu) " +
      "people: black for their African ancestry and the hardships they overcame, yellow for their " +
      "Amerindian (Yellow Carib) ancestry and for hope and prosperity (the colour of the grated cassava " +
      "used to make ereba), and white for the Europeans of their history and for the peace they sought.",
    sources: [
      {
        title: "The Garifuna (Belize and Honduras) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/xh-garif.html",
      },
      {
        title: "The Garifuna Flag — Warasa Garifuna Drum School",
        url: "https://www.warasadrumschool.com/garifuna-culture/the-garifuna-flag/",
      },
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

  // ── Burgas — capital of the Burgas Province, Bulgaria ───────────────────────
  "BG-02": {
    description:
      "A white field with a blue band along the base, bearing the arms of Burgas: a crowned sea-lion (a " +
      "lion with a fish’s tail) beneath a naval crown. The sea-lion and the naval crown reflect the " +
      "city’s identity as Bulgaria’s principal Black Sea port and the centre of its fishing and " +
      "fish-processing industry.",
    sources: [
      { title: "Burgas — Wikipedia", url: "https://en.wikipedia.org/wiki/Burgas" },
    ],
  },

  // ── Dobrich — capital of the Dobrich Province, Bulgaria ─────────────────────
  "BG-08": {
    description:
      "A flag bearing the arms of Dobrich: on a purple shield topped by a kobilitsa (a yoke-shaped " +
      "ornament popular in the Bulgarian National Revival), a golden sheaf of wheat, with the town’s " +
      "name above in old Bulgarian script. The wheat sheaf stands for the unity and glory of the " +
      "Bulgarian people and for the fecundity of the surrounding Dobrudzha plains; purple is the colour " +
      "of Bulgarian royal glory and sovereignty, and gold the welfare of the townspeople.",
    sources: [
      {
        title: "Coat of Arms — Municipality of Dobrich",
        url: "https://www.dobrich.bg/en/coat-of-arms",
      },
    ],
  },

  // ── Pleven — capital of the Pleven Province, Bulgaria ───────────────────────
  "BG-15": {
    description:
      "A white field bearing the arms of Pleven, centred on the domed St George the Conqueror " +
      "Chapel-Mausoleum. It commemorates the five-month Siege of Pleven (Plevna) in the Russo-Turkish " +
      "War of 1877–78 — a battle decisive for the Liberation of Bulgaria — and the mausoleum holds the " +
      "remains of the Bulgarian, Russian and Romanian soldiers who fell there.",
    sources: [
      {
        title: "Pleven Panorama — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Pleven_Panorama",
      },
      { title: "Siege of Plevna — Wikipedia", url: "https://en.wikipedia.org/wiki/Siege_of_Plevna" },
    ],
  },

  // ── Sliven — capital of the Sliven Province, Bulgaria ───────────────────────
  "BG-20": {
    description:
      "A flag bearing the arms of Sliven, which since 1995 feature the Old Elm of Sliven — a field elm " +
      "over 1,100 years old that still stands in the city centre beside the town hall. The best-known " +
      "landmark of Sliven, the ancient tree stands for endurance, rootedness and the city’s long " +
      "history.",
    sources: [
      { title: "The Old Elm — Wikipedia", url: "https://en.wikipedia.org/wiki/The_Old_Elm" },
      {
        title: "Symbols of Sliven — Sliven Regional Library",
        url: "http://reglibsliven.iradeum.com/sliven/sliven_symbols_en.htm",
      },
    ],
  },

  // ── Shumen — capital of the Shumen Province, Bulgaria ───────────────────────
  "BG-27": {
    description:
      "A green field bearing the golden arms of Shumen, an allegory of the Madara Rider — the early-8th " +
      "century rock relief carved on the cliff near Shumen showing a mounted horseman spearing a lion, " +
      "a dog running behind. Dated to the reign of the Bulgar Khan Tervel and a UNESCO World Heritage " +
      "Site, the Rider is a symbol of victory and of the founding of the Bulgarian state; the speared " +
      "lion represents enemies and chaos subdued.",
    sources: [
      { title: "Madara Rider — Wikipedia", url: "https://en.wikipedia.org/wiki/Madara_Rider" },
    ],
  },

  // ── Vratsa — capital of the Vratsa Province, Bulgaria ───────────────────────
  "BG-06": {
    description:
      "A green field bearing the golden arms of Vratsa, centred on the city’s fortress gate — the narrow " +
      "rock passage that the Romans called Valve (“door of a fortress”) and that gave the town its name " +
      "(from the Slavic vrata, “gate”, with the diminutive -itsa). The gateway, the entrance to the " +
      "Vratsata gorge, is the enduring emblem of the city.",
    sources: [
      { title: "Vratsa — Wikipedia", url: "https://en.wikipedia.org/wiki/Vratsa" },
    ],
  },

  // ── La Paz — administrative capital of Bolivia; capital of the La Paz Dept ───
  "BO-L": {
    description:
      "A horizontal bicolour of carmine over emerald green — the flag of the La Paz department, whose " +
      "capital is the city of La Paz. Created during the La Paz independence uprising of 1809, it is the " +
      "direct predecessor of Bolivia’s national flag: the carmine stands for the blood shed in the war " +
      "of independence and the green for wealth, glory and unity.",
    sources: [
      { title: "Flag of La Paz — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_La_Paz" },
      {
        title: "La Paz department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-l.html",
      },
    ],
  },

  // ── Santa Cruz de la Sierra — capital of the Santa Cruz Department, Bolivia ──
  "BO-S": {
    description:
      "A green-white-green horizontal triband — the flag of the Santa Cruz department, whose capital is " +
      "Santa Cruz de la Sierra. The green stripes stand for the department’s forests and plant wealth, " +
      "and the white stripe for the nobility of its people.",
    sources: [
      {
        title: "Santa Cruz department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-s.html",
      },
    ],
  },

  // ── Cochabamba — capital of the Cochabamba Department, Bolivia ───────────────
  "BO-C": {
    description:
      "A plain celeste (sky-blue) field — the flag of the Cochabamba department, whose capital is " +
      "Cochabamba. The sky-blue is said to symbolise liberty.",
    sources: [
      {
        title: "Cochabamba department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-c.html",
      },
    ],
  },

  // ── Oruro — capital of the Oruro Department, Bolivia ────────────────────────
  "BO-O": {
    description:
      "A plain red field — the flag of the Oruro department, whose capital is Oruro. The red stands for " +
      "courage and bravery.",
    sources: [
      {
        title: "Oruro department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-o.html",
      },
    ],
  },

  // ── Sucre — constitutional capital of Bolivia; capital of Chuquisaca Dept ────
  "BO-H": {
    description:
      "A white field bearing a red ragged saltire — the Cross of Burgundy — ensigned with a crown; the " +
      "flag of the Chuquisaca department, whose capital is Sucre (Bolivia’s constitutional capital). It " +
      "is taken from the banner of the colonial Audiencia de Charcas, which used the Spanish military " +
      "Cross of Burgundy; today the white is read as peace, purity and faith and the red as the blood of " +
      "the fallen.",
    sources: [
      {
        title: "Chuquisaca department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-h.html",
      },
    ],
  },

  // ── Potosí — capital of the Potosí Department, Bolivia ──────────────────────
  "BO-P": {
    description:
      "A flag quartered white and red bearing golden castles and red lions — the arms of Castile and " +
      "León — around a central medallion showing the Cerro Rico, the great silver mountain of Potosí. " +
      "The design descends from the pennant of the Vicuñas, a faction in the 17th-century civil strife " +
      "between Basque and other settlers over the silver of Potosí.",
    sources: [
      {
        title: "Potosí department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-p.html",
      },
    ],
  },

  // ── Trinidad — capital of the Beni Department, Bolivia ──────────────────────
  "BO-B": {
    description:
      "A green field with a red canton bearing a golden cross — the flag of the Beni department, whose " +
      "capital is Trinidad. Since 2007 the flag also carries eight golden five-pointed stars in a ring " +
      "at the centre, one for each of Beni’s eight provinces; the green evokes the forests and plains of " +
      "the Bolivian Amazon lowlands.",
    sources: [
      {
        title: "Beni department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-b.html",
      },
    ],
  },

  // ── Cobija — capital of the Pando Department, Bolivia ───────────────────────
  "BO-N": {
    description:
      "A flag with a green triangle at the hoist bearing a golden star, and a field of white over red — " +
      "the flag of the Pando department, whose capital is Cobija. The white stands for the purity and " +
      "loyalty of the Pando people to the nation and the green for the forest wealth of the north-western " +
      "Bolivian Amazon.",
    sources: [
      {
        title: "List of Bolivian flags — Wikipedia",
        url: "https://en.wikipedia.org/wiki/List_of_Bolivian_flags",
      },
    ],
  },

  // ── Tarija — capital of the Tarija Department, Bolivia ──────────────────────
  "BO-T": {
    description:
      "A horizontal bicolour of red over white — the flag of the Tarija department, whose capital is " +
      "Tarija; it is one of the oldest of Bolivia’s departmental flags, its red-and-white recalling the " +
      "colours under which the region fought in the wars of independence.",
    sources: [
      {
        title: "Tarija Department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-t.html",
      },
    ],
  },

  // ── Brasília — capital of Brazil (Federal District) ─────────────────────────
  "BR-DF": {
    description:
      "A green field bearing the golden “Cross of Brasília” — four diverging arrows radiating from the " +
      "centre to the four cardinal points. Designed by the poet and heraldist Guilherme de Almeida and " +
      "adopted in 1969, the arrows evoke Brazil’s indigenous heritage (the arrow being their oldest " +
      "emblem) and the strength that spreads outward from the new capital; they also recall the crossing " +
      "of Brasília’s Monumental and Road Axes. White stands for peace and green for the region’s forests, " +
      "while the green and gold are Brazil’s national colours.",
    sources: [
      {
        title: "Flag of the Federal District (Brazil) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_District_(Brazil)",
      },
    ],
  },

  // ── São Paulo — capital of the São Paulo State, Brazil ──────────────────────
  "BR-SP": {
    description:
      "A white field bearing the red Cross of the Order of Christ, with the city arms on a white " +
      "roundel at the centre. Adopted in 1987, the flag’s cross recalls the city’s founding beside the " +
      "Jesuit college and the Portuguese colonisation of Brazil; white stands for peace and the mixing " +
      "of peoples, red for courage and honour. The arms — an armoured arm holding a banner — represent " +
      "the Bandeirantes who set out from São Paulo to push Brazil’s frontiers inland, under the motto " +
      "“Non Ducor, Duco” (“I am not led, I lead”).",
    sources: [
      {
        title: "Bandeira da cidade de São Paulo — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_da_cidade_de_S%C3%A3o_Paulo",
      },
    ],
  },

  // ── Rio de Janeiro — capital of the Rio de Janeiro State, Brazil ────────────
  "BR-RJ": {
    description:
      "A white field with two blue diagonal stripes forming the cross of Saint Andrew, and the city arms " +
      "at the crossing. Blue and white are the traditional colours of the Portuguese monarchy, marking " +
      "the city’s Portuguese origin. The arms centre on a Manueline armillary sphere (a symbol of the " +
      "universe and of the age of discoveries) pierced by three arrows — the arrows that martyred Saint " +
      "Sebastian, the city’s patron (Rio’s full name is São Sebastião do Rio de Janeiro) — topped by a " +
      "Phrygian cap for the Republic, with silver dolphins for the maritime city. The design dates to " +
      "1908.",
    sources: [
      {
        title: "Bandeira da cidade do Rio de Janeiro — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_da_cidade_do_Rio_de_Janeiro",
      },
    ],
  },

  // ── Salvador — capital of the Bahia State, Brazil ───────────────────────────
  "BR-BA": {
    description:
      "A royal-blue field bearing a white dove with open wings, an olive branch of three green leaves in " +
      "its beak. The dove and olive branch — devised by the city’s founder Tomé de Sousa — allude to the " +
      "biblical dove Noah released, which returned with an olive branch on finding dry land, casting " +
      "Salvador as the firm ground on which the Portuguese could settle; the blue symbolises the hope " +
      "won through the city’s many struggles. The motto reads “Sic illa ad arcam reversa est” (“thus it " +
      "returned to the ark”).",
    sources: [
      {
        title: "Bandeira de Salvador — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Salvador",
      },
    ],
  },

  // ── Recife — capital of the Pernambuco State, Brazil ────────────────────────
  "BR-PE": {
    description:
      "A flag of three vertical columns — blue, white, blue (echoing the Pernambuco state flag; blue for " +
      "the sky and peace). The left column bears a star for the Republic, which Pernambucans trace to " +
      "their 1817 revolution; the central white column carries a crowned Dutch lion (the “Lion of the " +
      "North”, from the arms of Johan Maurits of Nassau and the nickname earned by Pernambuco for its " +
      "history of struggle), a cross for the Portuguese colonisation and the coming of Christianity, and " +
      "the motto “Virtus et Fides” (“Courage and Faith”); the right column bears a sun for the strong " +
      "sunshine of the city.",
    sources: [
      { title: "Bandeira de Recife — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Recife" },
    ],
  },

  // ── Curitiba — capital of the Paraná State, Brazil ──────────────────────────
  "BR-PR": {
    description:
      "A green field with red-and-white bands radiating from a white central rectangle in eight " +
      "directions (an “oitavada” design), the city arms set on the central rectangle. The central " +
      "rectangle represents the city itself and the arms the municipal government; the radiating bands " +
      "stand for municipal authority reaching to every quarter of the territory, and the eight " +
      "trapezoidal figures they form for the rural properties of the municipality. The arms show a " +
      "silver Paraná pine (araucária) on red, with the city’s 1693 foundation date on the scroll.",
    sources: [
      { title: "Bandeira de Curitiba — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Curitiba" },
    ],
  },

  // ── Fortaleza — capital of the Ceará State, Brazil ──────────────────────────
  "BR-CE": {
    description:
      "A white field overlaid with a blue cross of Saint Andrew, the city arms at the centre. The arms " +
      "are canting: on a blue (Portuguese) field a golden castle stands over natural waves — a “fortress” " +
      "for Fortaleza, whose name means fortress (after the Dutch-built Fort Schoonenborch that grew into " +
      "the city) — beneath a golden mural crown, flanked by branches of tobacco and cotton. The motto is " +
      "“Fortitudine” (Latin for strength / fortitude).",
    sources: [
      { title: "Bandeira de Fortaleza — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Fortaleza" },
    ],
  },

  // ── Porto Alegre — capital of the Rio Grande do Sul State, Brazil ───────────
  "BR-RS": {
    description:
      "An all-white field — symbolising peace — bearing the city arms upright at the centre. The arms " +
      "carry the Cross of Christ, for the Portuguese and Christian origin of the people, and a colonial " +
      "gateway (built 1773) shown open, to signify a city open to all, beneath a mural crown marking a " +
      "great city. The motto, “Leal e Valorosa Cidade de Porto Alegre” (“Loyal and Valorous City of " +
      "Porto Alegre”), is the title granted by Emperor Pedro II in 1841 for the city’s loyalty during " +
      "the Ragamuffin War.",
    sources: [
      {
        title: "Bandeira de Porto Alegre — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Porto_Alegre",
      },
    ],
  },

  // ── Belo Horizonte — capital of the Minas Gerais State, Brazil ──────────────
  "BR-MG": {
    description:
      "A white field bearing the city arms at the centre. On a round Portuguese shield (for Brazil’s " +
      "Portuguese origin) a golden rising sun climbs over the green Serra do Curral — the mountain range " +
      "that frames the city and gave it its name (“beautiful horizon”) — on a blue field; a golden chief " +
      "carries a red equilateral triangle, the emblem of the Inconfidência Mineira, the Minas Gerais " +
      "independence conspiracy of 1789. The five-towered golden mural crown marks a state capital.",
    sources: [
      {
        title: "Brasão de Belo Horizonte — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Belo_Horizonte",
      },
    ],
  },

  // ── Manaus — capital of the Amazonas State, Brazil ──────────────────────────
  "BR-AM": {
    description:
      "A beige field — the muddy colour of the Amazon river — bearing the elaborate arms of Manaus, " +
      "designed by Thaumaturgo Vaz in 1906. Crowned by a sun bearing the date 21 November 1889 (when the " +
      "city joined the proclamation of the Republic), the arms depict phases of the city’s history: the " +
      "Meeting of the Waters where the Rio Negro joins the Solimões, a fortress with the Portuguese flag " +
      "for the era of Portuguese rule, and a rubber tree (seringueira) for the rubber boom that made " +
      "Manaus rich.",
    sources: [
      {
        title: "Brasão de Manaus — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Manaus",
      },
    ],
  },

  // ── Belém — capital of the Pará State, Brazil ───────────────────────────────
  "BR-PA": {
    description:
      "A blue field bearing the arms of Belém, created in 1626. Two arms hold baskets of flowers and " +
      "fruit, for the fertility of the surrounding land; an ox and a mule graze with heads raised toward " +
      "a star — evoking the Nativity at Bethlehem (Belém in Portuguese), after which the city is named; " +
      "and a castle alludes to the strength of Portuguese arms and to the founding fort on Guajará Bay.",
    sources: [
      {
        title: "Brasão de Belém (Pará) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Bel%C3%A9m_(Par%C3%A1)",
      },
    ],
  },

  // ── Florianópolis — capital of the Santa Catarina State, Brazil ─────────────
  "BR-SC": {
    description:
      "A white field crossed by two red stripes — the colours of Santa Catarina state — with the city " +
      "arms at the centre. On a Portuguese shield a golden rising sun sits on blue above three silver " +
      "wavy lines for the sea; a central golden escutcheon bordered red bears the Cross of the Order of " +
      "Christ, standing for the island of Santa Catarina on which the city sits. The eight-towered " +
      "golden mural crown marks a state capital.",
    sources: [
      {
        title: "Bandeira de Florianópolis — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Florian%C3%B3polis",
      },
      {
        title: "Brasão de Florianópolis — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Florian%C3%B3polis",
      },
    ],
  },

  // ── Natal — capital of the Rio Grande do Norte State, Brazil ────────────────
  "BR-RN": {
    description:
      "A flag of two horizontal bands, green over white, with the city arms at the centre. The arms " +
      "centre on a golden tailed star (estrela caudada) — the emblem of Natal, alluding to the " +
      "comet-like Star of the Nativity, since “Natal” is Portuguese for Christmas (the city was founded " +
      "on 25 December 1599) — on a blue shield above a scroll reading NATAL. Green stands for hope and " +
      "white for peace.",
    sources: [
      {
        title: "Bandeira de Natal (Rio Grande do Norte) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Natal_(Rio_Grande_do_Norte)",
      },
    ],
  },

  // ── Vitória — capital of the Espírito Santo State, Brazil ───────────────────
  "BR-ES": {
    description:
      "A white field bearing the arms of Vitória. An Iberian shield — of the kind used in Portugal at " +
      "the time of Brazil’s discovery, honouring the first colonisers — rests on two crossed golden " +
      "arrows that stand for the origins of the capixaba people; above it a silver mural crown, its gates " +
      "open, proclaims the hospitality of the people and marks the city’s political standing as a " +
      "capital.",
    sources: [
      {
        title: "Bandeira de Vitória (Espírito Santo) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Vit%C3%B3ria_(Esp%C3%ADrito_Santo)",
      },
    ],
  },

  // ── João Pessoa — capital of the Paraíba State, Brazil ──────────────────────
  "BR-PB": {
    description:
      "A flag of seven horizontal stripes (four white, three red, alternating) crossed by a vertical " +
      "black band bearing three silver mural-crown towers. The red stripes recall the Silveira and " +
      "Leitão families, heroes of the conquest of the Paraíba captaincy; the three crowns stand for the " +
      "city’s three successive historical names — Filipeia, Frederica (Frederikstadt) and Parahyba; and " +
      "the red, black and white honour João Pessoa Cavalcanti de Albuquerque, after whom the city is " +
      "named.",
    sources: [
      {
        title: "Bandeira de João Pessoa — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Jo%C3%A3o_Pessoa",
      },
    ],
  },

  // ── Campo Grande — capital of the Mato Grosso do Sul State, Brazil ──────────
  "BR-MS": {
    description:
      "A blue field with golden and red rays radiating from a central rectangle that bears the city " +
      "arms — designed by the heraldist Arcinoé Antônio Peixoto de Faria and adopted in 1967. The " +
      "rectangle stands for the city and the rays for municipal authority reaching every quarter; the " +
      "arms show an eagle — for power, prosperity and altruism — grasping a berrante (a cattle-herder’s " +
      "horn) that recalls the region’s cattle-ranching economy, beneath a mural crown.",
    sources: [
      {
        title: "Bandeira de Campo Grande (Mato Grosso do Sul) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Campo_Grande_(Mato_Grosso_do_Sul)",
      },
    ],
  },

  // ── São Luís — capital of the Maranhão State, Brazil ────────────────────────
  "BR-MA": {
    description:
      "A yellow field bearing the city arms: on a blue shield, silver stars arranged as the Pleiades — " +
      "the brightest star cluster visible to the naked eye — which cast São Luís as the “Brazilian " +
      "Athens” and honour the Maranhão literary circle (Gonçalves Dias and others). A golden " +
      "eight-towered mural crown marks a state capital, with laurel branches for the people’s virtue.",
    sources: [
      {
        title: "Brasão de São Luís (Maranhão) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_S%C3%A3o_Lu%C3%ADs_(Maranh%C3%A3o)",
      },
    ],
  },

  // ── Cuiabá — capital of the Mato Grosso State, Brazil ───────────────────────
  "BR-MT": {
    description:
      "A flag divided vertically green (at the hoist) and white, with a golden roundel on the dividing " +
      "line bearing the monument that marks the geodesic centre of South America (which lies at Cuiabá). " +
      "Green stands for the palms that are the city’s chief emblem, white for the purity of the cuiabano " +
      "soul, and the gold for Cuiabá’s gold — the mineral wealth on which the city was founded, the " +
      "triangulated base reading as a mound of gold.",
    sources: [
      { title: "Bandeira de Cuiabá — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Cuiab%C3%A1" },
    ],
  },

  // ── Aracaju — capital of the Sergipe State, Brazil ──────────────────────────
  "BR-SE": {
    description:
      "Four horizontal stripes alternating green and gold, with a white canton at the upper hoist " +
      "bearing the city arms. The arms gather the city’s identity: a cross for faith, a weathervane for " +
      "the salt industry, a coconut palm for the coconut harvest, a cogwheel for labour, a seahorse for " +
      "the coast, and a mural crown for the capital, under the motto “Pax et Labor” (“Peace and Work”).",
    sources: [
      { title: "Bandeira de Aracaju — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Aracaju" },
    ],
  },

  // ── Palmas — capital of the Tocantins State, Brazil ─────────────────────────
  "BR-TO": {
    description:
      "A white field — for peace — bearing a golden sun above two narrow parallel blue stripes. The blue " +
      "stripes stand for the rivers Tocantins and Araguaia, vital to the state’s development, and the sun " +
      "for Palmas as the seat of state power. Palmas is Brazil’s youngest state capital, a planned city " +
      "founded in 1989.",
    sources: [
      {
        title: "Lei nº 1.972 — Cria a Bandeira de Palmas (Câmara Municipal de Palmas)",
        url: "https://legislativo.palmas.to.gov.br/media/leis/lei-ordinaria-1972-2013-05-23-20-3-2017-15-14-12.pdf",
      },
    ],
  },

  // ── Teresina — capital of the Piauí State, Brazil ───────────────────────────
  "BR-PI": {
    description:
      "A flag gyronny-in-saltire of white and blue with the city arms at the centre. The arms carry " +
      "black anchors corded in red, for the navigability of the rivers Parnaíba and Poti on which the " +
      "city was founded (when the population moved from the old Vila Velha do Poti); the river Parnaíba " +
      "runs along the base, and the scroll reads “TERESINA” with the foundation date 16 August 1852.",
    sources: [
      { title: "Bandeira de Teresina — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Teresina" },
      { title: "Brasão de Teresina — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Teresina" },
    ],
  },

  // ── Rio Branco — capital of the Acre State, Brazil ──────────────────────────
  "BR-AC": {
    description:
      "A white field bearing the arms of the Baron of Rio Branco — José Maria da Silva Paranhos Júnior, " +
      "the diplomat who secured Acre for Brazil through the 1903 Treaty of Petrópolis, and after whom the " +
      "city is named. The arms carry a crown for nobility, a globe crossed by a red band, and a river, " +
      "with the Baron’s motto “Ubique Patria Memor” (“everywhere mindful of the fatherland”).",
    sources: [
      {
        title: "Brasão de Rio Branco (Acre) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Rio_Branco_(Acre)",
      },
    ],
  },

  // ── Maceió — capital of the Alagoas State, Brazil ───────────────────────────
  "BR-AL": {
    description:
      "Three horizontal bands — green, white and blue — with the city arms at the centre and a red wavy " +
      "line running across. The white band represents the white-sand restinga of Maceió’s shoreline and " +
      "the red wave the Riacho Salgadinho stream that crosses the city; the arms, created by the " +
      "folklorist Théo Brandão in 1957, show a silver sailing jangada and canoe on the water.",
    sources: [
      { title: "Bandeira de Maceió — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Macei%C3%B3" },
    ],
  },

  // ── Porto Velho — capital of the Rondônia State, Brazil ─────────────────────
  "BR-RO": {
    description:
      "A flag divided vertically — a narrow gold band at the hoist, a larger blue field beyond — bearing " +
      "three superimposed black cylindrical water towers. Gold stands for the region’s mineral wealth and " +
      "blue for its sky; the Três Caixas d’Água (Three Water Towers) were built for the Madeira–Mamoré " +
      "Railway, around whose works the city of Porto Velho grew.",
    sources: [
      {
        title: "Bandeira de Porto Velho — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Porto_Velho",
      },
    ],
  },

  // ── Goiânia — capital of the Goiás State, Brazil ────────────────────────────
  "BR-GO": {
    description:
      "A green field with a red-and-white cross radiating from a central white panel that bears the city " +
      "arms. On the arms, a blue shield carries a golden cross — for faith and leadership — beneath a " +
      "silver mural crown that marks a state capital, encircled by eight golden sparks for the eight " +
      "original districts of the municipality (Goiânia is a planned city, founded in 1933 to replace the " +
      "old capital as the seat of Goiás).",
    sources: [
      {
        title: "Brasão e Bandeira da Cidade de Goiânia (GO) — Simbolopédia (MBI)",
        url: "https://www.mbi.com.br/mbi/biblioteca/simbolopedia/municipio-goiania-go-br/",
      },
    ],
  },

  // ── Macapá — capital of Amapá, Brazil ───────────────────────────────────────
  "BR-AP": {
    description:
      "A green–yellow–green horizontal field separated by thin white stripes, with the silver " +
      "silhouette of a fortress tower in the centre. The central figure is the Fortaleza de São José " +
      "de Macapá, the 18th-century Portuguese fort around which the city grew, so the flag anchors " +
      "Macapá to its colonial origin; the green and yellow repeat Brazil's national colours.",
    sources: [
      {
        title: "Macapá (Amapá, Brazil) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/br-ap-ma.html",
      },
    ],
  },

  // ── Boa Vista — capital of Roraima, Brazil ──────────────────────────────────
  "BR-RR": {
    description:
      "A green (upper) and yellow (lower) horizontal bicolour with a large white star in the upper " +
      "hoist and a thin white stripe just above the centre line. The green and yellow are Brazil's " +
      "national colours, while the white star and stripe are taken from the flag of Roraima state, " +
      "marking Boa Vista as the state capital.",
    sources: [
      {
        title: "Boa Vista (Roraima, Brazil) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/br-rr-bv.html",
      },
    ],
  },

  // ── Toronto — capital of Ontario, Canada ────────────────────────────────────
  "CA-ON": {
    description:
      "A blue field bearing a white abstract outline of Toronto City Hall — its two curved towers — with " +
      "a red maple leaf between them at the base standing for the domed Council Chamber. The negative " +
      "space above and between the towers forms the letter “T” for Toronto, and the maple leaf links the " +
      "city to Canada. The flag was designed by the 21-year-old student Renato De Santis and adopted in " +
      "1974.",
    sources: [
      { title: "Flag of Toronto — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Toronto" },
    ],
  },

  // ── Quebec City — capital of Quebec, Canada ─────────────────────────────────
  "CA-QC": {
    description:
      "A deep-blue field bearing a golden ship within a crenellated white border. The ship is the " +
      "Don-de-Dieu, the vessel of the city’s founder Samuel de Champlain, marking Quebec as a great " +
      "seaport; the crenellated border recalls the city walls — Quebec is the only walled city in North " +
      "America north of Mexico — and also the fortified town of Brouage in France from which Champlain " +
      "came.",
    sources: [
      { title: "Flag of Quebec City — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Quebec_City" },
    ],
  },

  // ── Winnipeg — capital of Manitoba, Canada ──────────────────────────────────
  "CA-MB": {
    description:
      "A field divided diagonally, light blue at the upper hoist and gold at the lower fly, with the " +
      "city arms on a white disc at the centre. Blue stands for Winnipeg’s clear prairie sky and gold " +
      "for the wheat that was the city’s original economic mainstay. The arms include a gatehouse of " +
      "Fort Garry — the Hudson’s Bay Company post at the confluence of the Red and Assiniboine rivers, " +
      "where the city grew — and the prairie crocus, Manitoba’s floral emblem.",
    sources: [
      { title: "Flag of Winnipeg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Winnipeg" },
      {
        title: "Coat of arms of Winnipeg — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Winnipeg",
      },
    ],
  },

  // ── Halifax — capital of Nova Scotia, Canada ────────────────────────────────
  "CA-NS": {
    description:
      "A blue field bearing a golden saltire (the cross of Saint Andrew), for the Scottish heritage of " +
      "the region and its standing as the capital of Nova Scotia. At the centre a kingfisher — a symbol " +
      "of industry and the oldest civic emblem in the region (1860) — stands for Halifax, flanked by two " +
      "18th-century sailing ships for the neighbouring former city of Dartmouth and the area’s naval " +
      "tradition; the blue is for the harbour, the sea and the lakes.",
    sources: [
      {
        title: "Coat of arms of the Halifax Regional Municipality — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Halifax_Regional_Municipality",
      },
      {
        title: "Halifax Regional Municipality — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ca-ns-hf.html",
      },
    ],
  },

  // ── Iqaluit — capital of Nunavut, Canada ────────────────────────────────────
  "CA-NU": {
    description:
      "A Canadian pale of blue, white and blue bearing the city’s emblem: a stylised two-peaked mountain " +
      "(the Everett Mountains above Frobisher Bay) over stylised fish, with the city’s name in Latin and " +
      "Inuktitut script. “Iqaluit” means “place of many fish” in Inuktitut, and fishing has sustained " +
      "the people of the area for centuries.",
    sources: [
      {
        title: "Iqaluit, Nunavut — Canadian Vexillology",
        url: "https://www.canadianvexillology.com/blog/iqaluitnunavut",
      },
    ],
  },

  // ── Whitehorse — capital of Yukon, Canada ───────────────────────────────────
  "CA-YT": {
    description:
      "A blue field bearing the seal of the City of Whitehorse, which depicts the city’s surroundings — " +
      "mountains and the Yukon River — evoking its setting and its history in river transportation and " +
      "the Klondike Gold Rush (Whitehorse grew as the head of navigation on the Yukon River during the " +
      "1898 gold rush).",
    sources: [
      {
        title: "Coat of arms of Whitehorse, Yukon — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Whitehorse,_Yukon",
      },
    ],
  },

  // ── Edmonton — capital of Alberta, Canada ───────────────────────────────────
  "CA-AB": {
    description:
      "A light-blue field with a white Canadian pale bearing the city arms; white stands for peace and " +
      "blue for the North Saskatchewan River. On the arms, a double-winged wheel marks Edmonton as a " +
      "centre of aviation and the “Gateway to the North” (the southern end of the wartime Alaska " +
      "Highway); an explorer recalls its origin as a fur-trading post, and Athena, goddess of wisdom, " +
      "its universities. Gold evokes the marigold — the city flower — sunny Alberta, and the Klondike " +
      "Gold Rush.",
    sources: [
      { title: "Flag of Edmonton — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Edmonton" },
    ],
  },

  // ── Victoria — capital of British Columbia, Canada ──────────────────────────
  "CA-BC": {
    description:
      "A light-blue field with the city arms at the centre. On the arms a golden “V” for Victoria opens " +
      "upward to suggest the city’s growth; a red inverted triangle above it is the peninsula on which " +
      "Victoria sits, the blue the surrounding sea and a white stripe the surf of the coast. A royal " +
      "crown honours Queen Victoria, the city’s namesake; angel supporters personify “Colonization” and " +
      "“Civilization”, with laurel for those who have served the city.",
    sources: [
      {
        title: "Flag of Victoria, British Columbia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Victoria,_British_Columbia",
      },
    ],
  },

  // ── St. John's — capital of Newfoundland and Labrador, Canada ───────────────
  "CA-NL": {
    description:
      "A white field bearing the city arms, with the motto “Avancez” (French for “Advance”). The shield " +
      "shows the Agnus Dei (the Lamb of God) with Saint George’s banner, for Saint John the Baptist, the " +
      "city’s patron, and the ship Matthew for John Cabot’s voyage. The two mariner supporters bear the " +
      "dates 1497 (Cabot’s landfall) and 1583 (Sir Humphrey Gilbert’s claim of Newfoundland as England’s " +
      "first overseas colony).",
    sources: [
      {
        title: "Coat of arms of St. John's, Newfoundland and Labrador — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_St._John's,_Newfoundland_and_Labrador",
      },
    ],
  },

  // ── Regina — capital of Saskatchewan, Canada ────────────────────────────────
  "CA-SK": {
    description:
      "A horizontal bicolour of blue over gold with a royal crown at the upper hoist. Blue stands for " +
      "the wide prairie sky and gold for the wheat fields central to the region’s economy; the crown " +
      "marks Regina as the provincial capital and puns on its name — Regina is Latin for “queen” (the " +
      "city was named in honour of Queen Victoria).",
    sources: [
      { title: "Flag of Regina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Regina" },
    ],
  },

  // ── Charlottetown — capital of Prince Edward Island, Canada ─────────────────
  "CA-PE": {
    description:
      "A banner of the city arms — a green-and-white shield charged with the coronation crown of Queen " +
      "Charlotte, after whom the city is named — bordered on three sides with alternating green and " +
      "white rectangles.",
    sources: [
      { title: "Flag of Charlottetown — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Charlottetown" },
    ],
  },

  // ── Yellowknife — capital of the Northwest Territories, Canada ──────────────
  "CA-NT": {
    description:
      "A flag bearing the city arms: a mine headframe flanked by a miner’s pick and shovel, with the " +
      "northern lights above. The pick and shovel (and the gold colour) recall the gold-mining boom of " +
      "the 1930s that built the town; the city’s name comes from the Yellowknives Dene, who were named " +
      "for the copper-bladed knives they carried.",
    sources: [
      {
        title: "Coat of arms of Yellowknife — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Yellowknife",
      },
    ],
  },

  // ── Zürich — capital of the canton of Zürich, Switzerland ───────────────────
  "CH-ZH": {
    description:
      "A flag divided diagonally (per bend) into blue and white — the arms of the canton and city of " +
      "Zürich. Popularly the blue is read as the lake and the white as the snow-capped mountains, and " +
      "the diagonal division is taken to represent justice. The blue-and-white is attested from the " +
      "1220s, the diagonal from 1389.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Geneva — capital of the canton of Geneva, Switzerland ───────────────────
  "CH-GE": {
    description:
      "A flag divided vertically: at the hoist a golden half-eagle on black, at the fly a golden key on " +
      "red — the arms of Geneva, adopted in 1387. The half-eagle (from the double eagle of the Holy " +
      "Roman Empire) stands for temporal authority and protection, and the golden key (the Key of Saint " +
      "Peter, patron of the cathedral) for spiritual, ecclesiastical rule; together they symbolise the " +
      "union of secular and religious power.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Basel — capital of the canton of Basel-Stadt, Switzerland ───────────────
  "CH-BS": {
    description:
      "A white field bearing a black Baselstab — the staff (crozier) of the Bishops of Basel, curving to " +
      "the hoist. Used on the city’s coins from the 11th century, it was adopted as the city arms in " +
      "1385, when black came to represent the city (and the same staff in red the bishop).",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Schwyz — capital of the canton of Schwyz, Switzerland ───────────────────
  "CH-SZ": {
    description:
      "A red field with a small white couped cross in the upper hoist. The plain red banner marked Schwyz " +
      "as an imperial free territory with the sovereign power to administer justice; the white cross " +
      "(which soldiers are said to have sewn on at the Battle of Laupen in 1339) became, on a red square, " +
      "the national flag of Switzerland — the country itself taking its name from Schwyz.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Altdorf — capital of the canton of Uri, Switzerland ─────────────────────
  "CH-UR": {
    description:
      "A yellow field bearing the black head of an aurochs — the Uristier — with a red nose-ring, the " +
      "arms of the canton of Uri, here combined with the red and white of the town of Altdorf, the " +
      "cantonal capital. The aurochs is canting arms: the name “Uri” was linked to ûr, the aurochs (the " +
      "wild ox once common in the valley), so the beast’s head puns on the canton’s name.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Zug — capital of the canton of Zug, Switzerland ─────────────────────────
  "CH-ZG": {
    description:
      "A horizontal triband of white, blue and white — the arms of the canton and city of Zug. The " +
      "design descends from the arms of the Habsburgs (a silver fess on red) and of the counts of " +
      "Lenzburg, the town’s medieval lords.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Solothurn — capital of the canton of Solothurn, Switzerland ─────────────
  "CH-SO": {
    description:
      "A flag divided red over white — the colours of Saint Ursus, the patron of Solothurn, by tradition " +
      "a soldier of the Theban Legion. The red-and-white has appeared on the city’s seal since at least " +
      "1394.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Appenzell — capital of the canton of Appenzell Innerrhoden, Switzerland ──
  "CH-AI": {
    description:
      "A white field bearing an upright black bear with red claws and tongue — the arms of Appenzell. " +
      "The bear comes from the legend of the Irish missionary Saint Gallus: rather than fight a bear he " +
      "met in the forest, he shared his bread, and the grateful bear brought him wood to build his " +
      "hermitage, around which the Abbey of St Gallen grew; the bear became the emblem of both St Gallen " +
      "and Appenzell.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Schaffhausen — capital of the canton of Schaffhausen, Switzerland ────────
  "CH-SH": {
    description:
      "A yellow field bearing a black ram leaping from a tower — canting arms for Schaffhausen: the ram " +
      "for German Schaf (“ram/sheep”) and the tower for Haus (“house”). The gold-horned, crowned ram is " +
      "an old emblem of strength and vigour.",
    sources: [
      { title: "Schaffhausen — Wikipedia", url: "https://en.wikipedia.org/wiki/Schaffhausen" },
    ],
  },

  // ── Delémont — capital of the canton of Jura, Switzerland ───────────────────
  "CH-JU": {
    description:
      "A red field bearing a white bishop’s crozier — the emblem of the Prince-Bishopric of Basel, which " +
      "ruled Delémont and the Jura from the 14th century until 1815 (Delémont was a summer residence of " +
      "the prince-bishops). The same crozier appears on the flag of the canton of Jura.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Glarus — capital of the canton of Glarus, Switzerland ───────────────────
  "CH-GL": {
    description:
      "A red field bearing Saint Fridolin — the pilgrim-monk who by tradition christianised the Glarus " +
      "valley — shown walking with his staff and Bible, in black robes with a golden halo. He is the " +
      "only saint depicted on a Swiss cantonal flag.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Aarau — capital of the canton of Aargau, Switzerland ────────────────────
  "CH-AG": {
    description:
      "A black eagle with a red beak and red claws, on gold, beneath a red bar — the arms of the city of " +
      "Aarau (distinct from the Aargau cantonal flag). The eagle is thought to be a canting device: it " +
      "arose from a folk-etymological reading of the city’s name as the “Au (meadow) of the Aar (eagle)”. " +
      "The eagle has been Aarau’s emblem since the Middle Ages, the town having received its charter from " +
      "King Rudolf I of Habsburg in 1283.",
    sources: [
      { title: "Aarau — Geographie.ch", url: "https://geographie.ch/index.php/Aarau" },
      { title: "Datei:Wappen Aarau.svg — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Datei:Wappen_Aarau.svg" },
    ],
  },

  // ── Chur — capital of the canton of Graubünden, Switzerland ─────────────────
  "CH-GR": {
    description:
      "In silver, a three-merloned red city gate, and within the gateway an upright black ibex with red " +
      "horns, hooves and tongue — the arms of the city of Chur. The ibex is the emblem of the Gotteshausbund " +
      "(League of the House of God), originally the arms of the Bishops of Chur, first seen on episcopal " +
      "seals in the 14th century. The red city gate and the ibex’s red arming emphasise the city’s own " +
      "authority.",
    sources: [
      { title: "Das Wappen von Chur — Stadt Chur", url: "https://www.chur.ch/geschichte/5330" },
    ],
  },

  // ── Fribourg — capital of the canton of Fribourg, Switzerland ───────────────
  "CH-FR": {
    description:
      "On blue, a silver crenellated tower with a crenellated forewall to its left descending in two steps, " +
      "and a silver half-ring rising from the base — the arms of the city of Fribourg. The tower, forewall " +
      "and ring have appeared on the city’s seals since the 13th century. The city took the white-castle-on-" +
      "blue flag when city and canton were separated in 1803 (the canton keeps the black-and-white of the " +
      "Zähringen founders).",
    sources: [
      {
        title: "Drapeau et armoiries du canton de Fribourg — Wikipédia",
        url: "https://fr.wikipedia.org/wiki/Drapeau_et_armoiries_du_canton_de_Fribourg",
      },
      { title: "Fribourg (Switzerland) — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Fribourg_(Switzerland)" },
    ],
  },

  // ── Neuchâtel — capital of the canton of Neuchâtel, Switzerland ─────────────
  "CH-NE": {
    description:
      "On gold, a black eagle armed, beaked and tongued red, bearing on its breast a gold shield with a red " +
      "pale charged with three silver chevrons — the arms of the city of Neuchâtel. The eagle is the " +
      "primitive arms of the elder House of Neuchâtel (appearing in 1214); the chevron-pale is the family " +
      "banner defined by Count Louis of Neuchâtel around the mid-14th century, its chevrons evoking the " +
      "gable of the castle shown on the old city seal.",
    sources: [
      {
        title: "Les armoiries de la Ville de Neuchâtel — Société d’histoire et d’archéologie",
        url: "https://imagesdupatrimoine.ch/notices/les-armoiries-de-la-ville-de-neuchatel/",
      },
    ],
  },

  // ── Stans — capital of the canton of Nidwalden, Switzerland ─────────────────
  "CH-NW": {
    description:
      "On red, a rearing ibex divided per fess black over gold — the arms of Stans (its municipal colours " +
      "are black, gold and red). Stans adopted the design in 1901, taking the old Dinghof (manorial-court) " +
      "arms and banner recorded in the Propst’s land-register of 1499 so that, as a cantonal capital, it " +
      "would have its own emblem among the larger Swiss towns.",
    sources: [
      {
        title: "Wappen und Fahnen der Gemeinden des Kantons Nidwalden — Wikipedia (de)",
        url: "https://de.wikipedia.org/wiki/Wappen_und_Fahnen_der_Gemeinden_des_Kantons_Nidwalden",
      },
    ],
  },

  // ── Sarnen — capital of the canton of Obwalden, Switzerland ─────────────────
  "CH-OW": {
    description:
      "On red, a white pair of deer’s antlers with the skull-piece (Grind), enclosing a six-pointed white " +
      "star — the arms of Sarnen, the capital of Obwalden.",
    sources: [
      { title: "Gemeindewappen: Sarnen — Kanton Obwalden", url: "https://www.ow.ch/gemeindewappen/270" },
    ],
  },

  // ── Frauenfeld — capital of the canton of Thurgau, Switzerland ──────────────
  "CH-TG": {
    description:
      "On white, a rearing red lion led on a chain by a woman in a headscarf, also in red — the arms of " +
      "Frauenfeld. The lion stands for the Habsburgs, who held the bailiwick over the town as successors of " +
      "the Kyburgs when the arms first appeared on the seal; the woman is read as the Virgin Mary, patroness " +
      "of Reichenau Abbey, the medieval overlord, whose red-and-white are the shield’s colours. (The name " +
      "Frauenfeld — “women’s field” — makes the woman a canting figure too.)",
    sources: [
      {
        title: "Name und Wappen der Stadt — Stadt Frauenfeld",
        url: "https://www.frauenfeld.ch/portraet/geschichte/name-und-wappen.html/102",
      },
    ],
  },

  // ── Bellinzona — capital of the canton of Ticino, Switzerland ───────────────
  "CH-TI": {
    description:
      "The city flag of Bellinzona bears the biscione — a serpent swallowing a child — the emblem of the " +
      "Visconti Dukes of Milan. It recalls Bellinzona’s medieval history under the Duchy of Milan, whose " +
      "dukes built and held the town’s three castles; the ducal serpent has marked the city’s banner for " +
      "centuries.",
    sources: [
      { title: "Bellinzona — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Bellinzona" },
      { title: "Biscione (araldica) — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Biscione_(araldica)" },
    ],
  },

  // ── Lausanne — capital of the canton of Vaud, Switzerland ───────────────────
  "CH-VD": {
    description:
      "A white-over-red flag — the colours of the city of Lausanne (its shield is blazoned “gules a chief " +
      "argent”, red with a white chief, and is often shown as an equal white-and-red division). The white " +
      "and red recall the arms of the Bishop of Lausanne, the city’s medieval lord; two lions were later " +
      "added as supporters as symbols of power.",
    sources: [
      {
        title: "Les armoiries et les couleurs de Lausanne (1913) — e-periodica",
        url: "https://www.e-periodica.ch/cntmng?pid=cov-001%3A1913%3A51%3A%3A553",
      },
    ],
  },

  // ── Sion — capital of the canton of Valais, Switzerland ─────────────────────
  "CH-VS": {
    description:
      "Party per pale white and red, with two counterchanged six-pointed stars — the arms of Sion. The white " +
      "and red are the colours of the Prince-Bishopric of Sion, borne on the bishops’ banner since the early " +
      "13th century, and the six-pointed stars are the mullets of the Valais arms (whose stars stand for the " +
      "cantonal dizains/districts).",
    sources: [
      {
        title: "Drapeau et armoiries du canton du Valais — Wikipédia",
        url: "https://fr.wikipedia.org/wiki/Drapeau_et_armoiries_du_canton_du_Valais",
      },
    ],
  },

  // ── Santiago — capital of the Región Metropolitana, Chile ───────────────────
  "CL-RM": {
    description:
      "Two vertical bands, blue and gold, charged with the arms of Santiago. The shield — granted by " +
      "Emperor Charles I in 1552 — shows a lion rampant holding a drawn sword on silver, within a blue " +
      "bordure of eight gold scallop shells. The lion honours the courage with which the settlers defended " +
      "the city, and the scallop shells are the emblem of Saint James (Santiago), the city’s patron: it was " +
      "founded in 1541 as Santiago de la Nueva Extremadura, named for the apostle said to have appeared in " +
      "battle on the settlers’ side.",
    sources: [
      { title: "Santiago de Chile — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Santiago_de_Chile" },
      { title: "¿Qué significa el Escudo de Santiago? — Hispanismo Chile", url: "https://hispanismo.cl/patrimonio/que-significa-el-escudo-de-santiago/" },
    ],
  },

  // ── Valparaíso — capital of the Valparaíso Region, Chile ────── (see omitted) ─

  // ── Concepción — capital of the Biobío Region, Chile ────────────────────────
  "CL-BI": {
    description:
      "A gold-and-blue flag bearing the arms of Concepción, granted by royal decree on 5 April 1552: a black " +
      "eagle on gold with a gold sun radiating over its head, a silver crescent at its feet, four gold stars " +
      "to the sides and two branches of flowering lilies on blue. The eagle and sun stand for Emperor " +
      "Charles V — Concepción being an imperial city “on which the sun never set”.",
    sources: [
      { title: "Concepción (Chile) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Concepci%C3%B3n_(Chile)" },
      {
        title: "El poco conocido origen e historia del escudo de armas de Concepción — Diario Concepción",
        url: "https://www.diarioconcepcion.cl/ciudad/2018/10/16/el-poco-conocido-origen-e-historia-del-escudo-de-armas-de-concepcion.html",
      },
    ],
  },

  // ── La Serena — capital of the Coquimbo Region, Chile ───────────────────────
  "CL-CO": {
    description:
      "A red flag bearing the arms of La Serena: a silver field with, in chief, a four-towered castle whose " +
      "battlements spout flames, a bordure with four letters “F” and bundles of inverted arrows at the " +
      "corners, and two griffins as supporters holding a chain. The four F’s are read as the initial of " +
      "Felipe II (under whom the arms were granted) or of the city’s founder Francisco de Aguirre — the " +
      "sources differ.",
    sources: [
      { title: "La Serena — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/La_Serena" },
      { title: "Escudo de La Serena — Del Faro al Puerto", url: "https://delfaroalpuerto.cl/2020/03/19/escudo-de-la-serena/" },
    ],
  },

  // ── Rancagua — capital of the O’Higgins Region, Chile ───────────────────────
  "CL-LI": {
    description:
      "A white flag bearing the city seal of Rancagua. On a red field a golden eagle rises as a phoenix from " +
      "flames, grasping the tree of liberty, flanked by two laurel branches. The arms were granted by " +
      "Bernardo O’Higgins on 27 May 1818 to honour the town after the 1814 Battle of Rancagua: the phoenix " +
      "reborn from its ashes is Rancagua rebuilt, and the red field is the blood its heroes shed for the " +
      "fatherland.",
    sources: [
      {
        title: "El escudo de armas que O’Higgins entregó a la “Heroica ciudad de Rancagua” — El Cachapoal",
        url: "https://elcachapoal.cl/2014/10/01/el-escudo-de-armas-que-ohiggins-entrego-a-la-muy-heroica-ciudad-de-rancagua/",
      },
    ],
  },

  // ── Valdivia — capital of the Los Ríos Region, Chile ────────────────────────
  "CL-LR": {
    description:
      "A white flag charged with a red saltire — a simplified Cross of Burgundy (the ragged red St Andrew’s " +
      "cross of the Spanish Empire). Valdivia, chartered by Emperor Charles V in 1554 as the “very noble and " +
      "very loyal” city, remained a royalist stronghold through the wars of independence, and the cross " +
      "recalls that Hispanic loyalty.",
    sources: [
      { title: "Bandera de Valdivia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Valdivia" },
      { title: "Valdivia commune (Chile) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/cl-vld.html" },
    ],
  },

  // ── Arica — capital of the Arica y Parinacota Region, Chile ─────────────────
  "CL-AP": {
    description:
      "A dark-blue flag bearing the arms of Arica. The colonial shield — protocolised in 1657, after " +
      "Philip II gave Arica the title of “noble, loyal and illustrious City of San Marcos de Arica” in 1570 " +
      "— shows two crowned rampant lions guarding a central charge, a third lion below, and two towers that " +
      "signified the town’s role in the military custody of the Spanish crown.",
    sources: [
      {
        title: "El escudo de armas de la ciudad San Marcos de Arica — El Morrocotudo",
        url: "https://www.elmorrocotudo.cl/noticia/politica/el-escudo-de-armas-de-la-ciudad-san-marcos-de-arica-analisis-del-documento-original",
      },
    ],
  },

  // ── Taipei — capital of Taiwan ──────────────────────────────────────────────
  "CN-TW": {
    description:
      "The flag/emblem of Taipei is built from a brushstroke of the Chinese character 北 (běi, “north”), " +
      "with the characters for Taipei (臺北) forming arrows that point both up and down for eternal " +
      "prosperity; the lines crossing under the arrow stand for the modern city’s criss-crossing bridges and " +
      "its cultural diversity. Its four colours each carry a meaning: red for enthusiasm and lively " +
      "creativity, yellow for warmth and friendliness, green for peace, hope and care for the environment, " +
      "and blue for reason and freedom — a modern, innovative city.",
    sources: [
      { title: "About the Taipei Brand Logo — Taipei Travel (official)", url: "https://www.travel.taipei/en/news/details/18830" },
      { title: "Taipei City — Vexillology Wiki", url: "https://vexillology.miraheze.org/wiki/Taipei_City" },
    ],
  },

  // ── Bogotá — capital of Colombia (and of Cundinamarca) ──────────────────────
  "CO-CUN": {
    description:
      "Yellow over red, with the city arms at the centre — the flag the patriots flew on 20 July 1810. " +
      "Yellow stands for justice, clemency and virtue; red for liberty, health and charity. The arms, " +
      "granted to Santa Fe by Emperor Charles V in 1548, show a crowned black eagle on gold holding a red " +
      "pomegranate (granada) in each talon: the eagle for firmness, the pomegranates for valour.",
    sources: [
      {
        title: "Símbolos de Bogotá — Alcaldía Mayor de Bogotá",
        url: "https://bogota.gov.co/mi-ciudad/simbolos-de-bogota-la-bandera-el-escudo-la-flor-y-el-arbol-de-bogot",
      },
      { title: "Bandera de Bogotá — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Bogot%C3%A1" },
    ],
  },

  // ── Medellín — capital of Antioquia, Colombia ───────────────────────────────
  "CO-ANT": {
    description:
      "White and green horizontal stripes bearing the city arms. White stands for purity and integrity, " +
      "green for hope, abundance and faith. The arms — granted by King Charles II of Spain in 1678 — show, " +
      "on blue, a golden tower between two turrets with the image of Our Lady of Candelaria, the city’s " +
      "patroness, above.",
    sources: [
      { title: "Historia y Símbolos de Medellín — Alcaldía de Medellín", url: "https://www.medellin.gov.co/es/historia-y-simbolos-de-medellin/" },
      { title: "Escudo de Medellín — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Medell%C3%ADn" },
    ],
  },

  // ── Barranquilla — capital of Atlántico, Colombia ───────────────────────────
  "CO-ATL": {
    description:
      "A “cuadrilonga” of three nested rectangles — red (outer), yellow and green (centre) — with a silver " +
      "eight-pointed star at its heart. Red is the blood of the patriots, yellow the sun of liberty, green " +
      "the hope of a worthy homeland; the star, resembling an eight-point compass rose, evokes Barranquilla’s " +
      "seafaring spirit (and the eight confederated provinces). The city council adopted it in 1910, " +
      "honouring the Cartagena flag its patriots first raised.",
    sources: [
      {
        title: "Cumpleaños Barranquilla: significado de la bandera y el escudo — Semana",
        url: "https://www.semana.com/nacion/barranquilla/articulo/cumpleanos-barranquilla-este-es-el-significado-de-la-bandera-y-el-escudo-de-la-ciudad/202254/",
      },
    ],
  },

  // ── Bucaramanga — capital of Santander, Colombia ────────────────────────────
  "CO-SAN": {
    description:
      "Three horizontal stripes — green, yellow, green — with a blue disc edged in red bearing a white " +
      "four-pointed star at the centre. The green stands for hope, the yellow for the wealth and progress " +
      "of the people, the red ring for the blood the people of Santander shed for independence, and the " +
      "four-pointed star for the city open to the four horizons of the fatherland. Adopted in 1958.",
    sources: [
      { title: "Símbolos — Alcaldía de Bucaramanga", url: "https://www.bucaramanga.gov.co/bucaramanga-nuestra-ciudad/simbolos/" },
    ],
  },

  // ── Cali — capital of Valle del Cauca, Colombia ─────────────────────────────
  "CO-VAC": {
    description:
      "Five horizontal stripes — blue, red, white, red, green — with the two red bands narrow. Blue is the " +
      "sky and the seas, red the love for Cali and the blood its patriots shed for liberty on 3 July 1810, " +
      "white the purity of its people and the river that crosses the city, and green the meadows and fields " +
      "around it. Created in 1928 and made official in 1954.",
    sources: [
      { title: "Símbolos — Alcaldía de Santiago de Cali", url: "https://www.cali.gov.co/gobierno/publicaciones/226/simbolos/" },
      { title: "Bandera de Cali — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Cali" },
    ],
  },

  // ── Popayán — capital of Cauca, Colombia ────────────────────────────────────
  "CO-CAU": {
    description:
      "Two yellow (gualdo) bands divided by a blue (azur) stripe, each yellow band charged with four " +
      "Jerusalem crosses. Drawn from the city arms, the flag reads in heraldic terms as “the glory of high " +
      "deeds and noble ideals, adorned by the cross of sacrifice”: yellow for glory, blue for ideals, and the " +
      "Jerusalem crosses for sacrifice in the struggles of faith. Popayán is known as “the White City”.",
    sources: [
      { title: "Símbolos — Alcaldía de Popayán", url: "https://www.popayan.gov.co/MiMunicipio/Paginas/Simbolos.aspx" },
      { title: "Escudo de Popayán — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Popay%C3%A1n" },
    ],
  },

  // ── Cúcuta — capital of Norte de Santander, Colombia ────────────────────────
  "CO-NSA": {
    description:
      "Two equal horizontal bands, black over red (with the city arms added at the centre for official use). " +
      "Black stands for the wealth hidden in the region’s soil and the latent wealth of its people; red for " +
      "heroism and the blood of the patriots. First flown in 1928 and made the city’s official ensign in 1988.",
    sources: [
      { title: "Bandera de Cúcuta — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_C%C3%BAcuta" },
    ],
  },

  // ── Manizales — capital of Caldas, Colombia ─────────────────────────────────
  "CO-CAL": {
    description:
      "Three plain horizontal stripes — white, green and red — standing for the coffee on which the region " +
      "lives: white for the coffee flower, green for the foliage of the plantations, and red for the ripe " +
      "coffee bean. Adopted in 1996.",
    sources: [
      { title: "Manizales (Caldas, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-cal-m.html" },
      { title: "Símbolos — Sociedad de Mejoras Públicas de Manizales", url: "http://www.somepumanizales.org/p/institucional.html" },
    ],
  },

  // ── Pereira — capital of Risaralda, Colombia ────────────────────────────────
  "CO-RIS": {
    description:
      "A central deep-yellow triangle between scarlet side triangles, with the Phrygian Cap of Liberty on " +
      "the yellow. Taken together the flag is read as “with the red blood of the sons of Pereira, liberty " +
      "rises upon the wealth of its soil” — the yellow for liberty and the wealth of the land, the scarlet " +
      "for the blood of its people. Adopted in 1923.",
    sources: [
      { title: "Escudo y Bandera — Concejo de Pereira", url: "https://www.concejopereira.gov.co/es/escudo-y-bandera-PG61" },
      { title: "Pereira (Risaralda, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-ris-p.html" },
    ],
  },

  // ── Armenia — capital of Quindío, Colombia ──────────────────────────────────
  "CO-QUI": {
    description:
      "Three equal horizontal stripes — green, white and yellow. Green stands for the natural wealth and " +
      "vegetation of the department, white for peace, and yellow for its coffee culture. The design dates to " +
      "1927 (by the teacher Rosana Londoño Álzate) and was adopted officially in 2010.",
    sources: [
      { title: "Símbolos de Armenia (Quindío) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/S%C3%ADmbolos_de_Armenia_(Quind%C3%ADo)" },
    ],
  },

  // ── Tunja — capital of Boyacá, Colombia ─────────────────────────────────────
  "CO-BOY": {
    description:
      "Three horizontal stripes — green, white, green. Green stands for the honour, friendship and courtesy " +
      "of the city’s people and for hope and devotion to its progress; white for cleanliness and integrity " +
      "and for greatness and culture. Created in 1939 for the fourth centenary of the city’s Hispanic " +
      "founding.",
    sources: [
      { title: "Bandera — Alcaldía de Tunja", url: "https://www.tunja-boyaca.gov.co/municipio/bandera" },
    ],
  },

  // ── Neiva — capital of Huila, Colombia ──────────────────────────────────────
  "CO-HUI": {
    description:
      "Three horizontal stripes — red, green, yellow — crossed by an indigenous arrow set at 45° pointing to " +
      "the upper hoist. Red is the courage and love of liberty of the huilense people, green a homage to " +
      "work and to the land’s arts and culture (and hope), and yellow the nobility and the mineral wealth of " +
      "the region. The three stripes recall the city’s three foundings (1539, 1551, 1612). Adopted in 1967.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Neiva", url: "https://www.alcaldianeiva.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Pasto — capital of Nariño, Colombia ─────────────────────────────────────
  "CO-NAR": {
    description:
      "A central ultramarine-blue band between two vermilion-red bands, with a gold triangle at the hoist. " +
      "The red stands for highness and strength, the blue for justice, beauty, serenity and loyalty, and the " +
      "gold triangle for the light, power, constancy and nobility of the pastuso people. Designed by " +
      "Ignacio Rodríguez Guerrero.",
    sources: [
      { title: "Bandera de Pasto — Alcaldía de Pasto", url: "https://www.pasto.gov.co/index.php/nuestros-simbolos/bandera-de-pasto" },
    ],
  },

  // ── Santa Marta — capital of Magdalena, Colombia ────────────────────────────
  "CO-MAG": {
    description:
      "A white-and-blue flag. White stands for peace — all united without rancour for this land — and blue " +
      "for the sky, the sea and the silvery horizon of the Sierra Nevada that rises behind the city.",
    sources: [
      { title: "Símbolos — Alcaldía Distrital de Santa Marta", url: "https://www.santamarta.gov.co/vive-en-santa-marta/simbolos" },
    ],
  },

  // ── Villavicencio — capital of Meta, Colombia ───────────────────────────────
  "CO-MET": {
    description:
      "Three horizontal stripes — blue, green, red. Blue stands for the immense sky and the region’s rich " +
      "waters, green for the fertile plains of the Llanos Orientales, and red for the people’s struggle in " +
      "the campaign of liberation. Adopted in 1970.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Villavicencio", url: "https://villavicencio.gov.co/municipio/nuestros-simbolos/" },
    ],
  },

  // ── Ibagué — capital of Tolima, Colombia ────────────────────────────────────
  "CO-TOL": {
    description:
      "Three horizontal stripes — yellow, green, red — echoing the flag of the United Provinces of New " +
      "Granada. Yellow stands for the municipality’s mineral wealth, green for its vegetation and its coffee " +
      "plantations, and red for the blood shed by Ibagué’s heroes in the wars of independence.",
    sources: [
      { title: "Escudo de Ibagué — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Ibagu%C3%A9" },
    ],
  },

  // ── Valledupar — capital of Cesar, Colombia ─────────────────────────────────
  "CO-CES": {
    description:
      "Three horizontal stripes — dark blue, white, red. Blue stands for the sky and the rivers that bathe " +
      "the city, white for the perpetual snows of the Sierra Nevada that watches over it, and red for the " +
      "blood the region’s native peoples shed in its defence.",
    sources: [
      { title: "Símbolos — Concejo de Valledupar", url: "https://concejodevalledupar.gov.co/simbolos/" },
    ],
  },

  // ── Montería — capital of Córdoba, Colombia ─────────────────────────────────
  "CO-COR": {
    description:
      "Quartered red, white, white and blue, with a golden five-pointed star at the centre. The red quarter " +
      "stands for vigour and heroism, the two white quarters for peace, and the blue quarter for the sky and " +
      "space; the gold star is the gold of the great Sinú river. Adopted in 1960.",
    sources: [
      { title: "Símbolos — Alcaldía de Montería", url: "https://www.monteria.gov.co/publicaciones/143/simbolos/" },
    ],
  },

  // ── Riohacha — capital of La Guajira, Colombia ──────────────────────────────
  "CO-LAG": {
    description:
      "A flag in two blues — sky-blue and royal blue — bearing a golden rising sun. The sun rises each " +
      "morning bringing opportunity and a new day; among its rays, seven tall rays honour the Creator and " +
      "the lesser rays stand for humankind under that guidance. Adopted in the 2002 redesign of the city’s " +
      "emblems.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Riohacha", url: "https://www.riohacha-laguajira.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Florencia — capital of Caquetá, Colombia ────────────────────────────────
  "CO-CAQ": {
    description:
      "Three horizontal stripes — green, white, red. Green fills the upper half for the forest wealth of " +
      "Caquetá and the hope of a bright future, white for the morning light and the peace with which the " +
      "land is blessed, and red for the ardent, striving spirit of the caqueteño. Made official in 1964.",
    sources: [
      { title: "Bandera de Florencia (Caquetá) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Florencia_(Caquet%C3%A1)" },
      { title: "Florencia (Caqueta, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-caqfl.html" },
    ],
  },

  // ── Leticia — capital of Amazonas, Colombia ─────────────────────────────────
  "CO-AMA": {
    description:
      "A green field over blue, with a golden sun. Green stands for the semi-virgin jungle and its " +
      "biodiversity, blue for the waters of the Amazon on whose bank the city sits, and the sun for Leticia, " +
      "known as the “City of Light”.",
    sources: [
      { title: "Leticia (Colombia) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Leticia_(Colombia)" },
      { title: "Leticia (Amazonas, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-amalt.html" },
    ],
  },

  // ── Arauca — capital of Arauca, Colombia ────────────────────────────────────
  "CO-ARA": {
    description:
      "Two equal horizontal stripes, green over red. Green stands for the department’s wide plains (llanos), " +
      "red for the blood shed by those who fought for freedom.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Arauca", url: "https://www.arauca-arauca.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
      { title: "Bandera de Arauca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Arauca" },
    ],
  },

  // ── Yopal — capital of Casanare, Colombia ───────────────────────────────────
  "CO-CAS": {
    description:
      "Three horizontal stripes — red, yellow, green — with the city arms across them. Red stands for the " +
      "blood the brave llaneros shed for freedom, yellow for the wealth of Yopal and the llano, and green " +
      "for the region’s green savannas.",
    sources: [
      { title: "Nuestro municipio — Alcaldía de Yopal", url: "https://www.yopal-casanare.gov.co/municipio/nuestro-municipio" },
    ],
  },

  // ── Quibdó — capital of Chocó, Colombia ─────────────────────────────────────
  "CO-CHO": {
    description:
      "Green (half), red and brown (a quarter each). Green stands for the rainforest surrounding the city — a " +
      "lung of humanity — red for the blood the ancestors shed in the struggle for freedom, and brown in " +
      "homage to the city’s patron, Saint Francis of Assisi. Presented in 1995.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Quibdó", url: "https://www.quibdo-choco.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Inírida — capital of Guainía, Colombia ──────────────────────────────────
  "CO-GUA": {
    description:
      "A green field crossed by blue diagonal bands and charged with a radiant sun. Green stands for the " +
      "region’s nature and growth, the blue bands for its rivers — the “fluvial star” where the Guaviare, " +
      "Atabapo and Inírida meet — and the sun for wealth, strength and human warmth. (Inírida means “Little " +
      "Mirror of the Sun”.)",
    sources: [
      { title: "Inírida — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/In%C3%ADrida" },
    ],
  },

  // ── San José del Guaviare — capital of Guaviare, Colombia ───────────────────
  "CO-GUV": {
    description:
      "Sky-blue and green fields joined by a golden wavy band, with white at the hoist. The blue is the sky " +
      "of the plains giving way to the green of the jungle (and hope); the yellow band is the Guayabero and " +
      "Ariari rivers that unite to form the Guaviare, gold for the wealth they carry; and the white is the " +
      "peace hoped for all Colombia.",
    sources: [
      {
        title: "Nuestros símbolos — Alcaldía de San José del Guaviare",
        url: "https://www.sanjosedelguaviare-guaviare.gov.co/publicaciones/44/nuestros-simbolos/",
      },
    ],
  },

  // ── Mocoa — capital of Putumayo, Colombia ───────────────────────────────────
  "CO-PUT": {
    description:
      "Blue, white and green horizontal stripes within a yellow border, a radiant sun on the white. Blue is " +
      "the sky and rivers and the calm, reflective spirit; white is the peaceful character of the mocoanos, " +
      "the sun standing for the tropical climate and for light and transparency; green is the mountains and " +
      "forests and hope; and the yellow border is the riches around the town — the rivers’ alluvial gold and " +
      "its people’s spirit of work.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Mocoa", url: "https://www.mocoa-putumayo.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Sincelejo — capital of Sucre, Colombia ──────────────────────────────────
  "CO-SUC": {
    description:
      "Three equal stripes — white, old-glory red and green. White stands for purity, red for passion and " +
      "strength, and green for the richness of nature.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Sincelejo", url: "https://www.alcaldiadesincelejo.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── San José — capital of Costa Rica ────────────────────────────────────────
  "CR-SJ": {
    description:
      "Blue, white and green bands with a row of eleven white stars. Blue is the sky, green is hope and white " +
      "is transparency; the eleven stars stand for the eleven districts of the canton of San José.",
    sources: [
      { title: "Bandera del cantón — Municipalidad de San José", url: "https://www.msj.go.cr/MSJ/Capital/SitePages/bandera_canton.aspx" },
      { title: "Cantón de San José — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Cant%C3%B3n_de_San_Jos%C3%A9" },
    ],
  },

  // ── Alajuela — capital of Alajuela province, Costa Rica ─────────────────────
  "CR-A": {
    description:
      "A white flag bearing the canton’s coat of arms (approved 1908). The shield is split: on the gold half " +
      "a flaming black torch commemorates Juan Santamaría, the Alajuela drummer-boy who died for the country " +
      "at Rivas in 1856; the other half carries the five stripes of the national flag, and a Phrygian cap of " +
      "liberty on a lance crowns the shield. The motto reads “Pro Patria Nostra Sanguis Noster” (For our " +
      "fatherland, our blood).",
    sources: [
      { title: "Escudo de la Ciudad de Alajuela — Escuela Nicolás Aguilar", url: "http://www.escnicol1905.ed.cr/sitionew/index.php/component/content/article/26-alajuela-historica/124-escudo-de-la-ciudad-de-alajuela" },
    ],
  },

  // ── Cartago — capital of Cartago province, Costa Rica ──────────────────────
  "CR-C": {
    description:
      "Red over blue, with the canton arms at the centre. Red stands for the courage and strength of the " +
      "people of Cartago and the sacrifices made in defence of liberty; blue for the sky, peace, faith and " +
      "hope. The arms carry a rampant lion (from the conqueror Juan Vázquez de Coronado’s family) and a " +
      "golden castle, under the motto “Fide et Pace” (By Faith and Peace).",
    sources: [
      { title: "Símbolos — Municipalidad de Cartago", url: "https://patrimoniovirtual.muni-carta.go.cr/Simbolos.aspx" },
    ],
  },

  // ── Heredia — capital of Heredia province, Costa Rica ──────────────────────
  "CR-H": {
    description:
      "Three vertical stripes — yellow (hoist), white and red — with the canton arms on the white. The yellow " +
      "and white are the colours of the Vatican, marking the city’s deep Catholic tradition (yellow and red " +
      "are also the heredianos’ traditional colours). The arms show a silver fort — like the one Fadrique " +
      "Gutiérrez built — on red within blue, with the mottoes “Libertad, Paz, Progreso” and “Heredia”.",
    sources: [
      { title: "Símbolos — Municipalidad de Heredia", url: "https://www.heredia.go.cr/es/el-canton/simbolos" },
    ],
  },

  // ── Puntarenas — capital of Puntarenas province, Costa Rica ────────────────
  "CR-P": {
    description:
      "Diagonal bands of red, white, blue and green with a large orange sun dated “1848”. The red, white and " +
      "blue are the national colours (adopted in 1848) and green stands for the region’s nature; the sun’s " +
      "eleven rays represent the eleven cantons of Puntarenas province. The flag was created in the early " +
      "1990s.",
    sources: [
      { title: "Bandera de la Provincia de Puntarenas — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Archivo:Bandera_de_la_Provincia_de_Puntarenas.svg" },
      { title: "La heráldica de Puntarenas", url: "https://heraldica.website/heraldica/descubre-la-historia-detras-de-la-heraldica-de-puntarenas/" },
    ],
  },

  // ── Havana — capital of Cuba ────────────────────────────────────────────────
  "CU-03": {
    description:
      "A blue field with a yellow border, bearing the city arms. The shield, granted by royal decree in " +
      "1665, shows three silver castles — the fortresses that guarded the port (La Fuerza, El Morro and La " +
      "Punta) — and a golden key on blue, for Havana as the “Key to the Gulf of Mexico”.",
    sources: [
      { title: "Bandera de La Habana — EcuRed", url: "https://www.ecured.cu/Bandera_de_La_Habana" },
      { title: "Escudo de La Habana — EcuRed", url: "https://www.ecured.cu/Escudo_de_La_Habana" },
    ],
  },

  // ── Santa Clara — capital of Villa Clara, Cuba ─────────────────────────────
  "CU-05": {
    description:
      "Three horizontal stripes — blue, white and red — with the city arms at the centre. The shield, under " +
      "a mural crown, shows in its upper half a hill and cay (where the families from Remedios came to found " +
      "the town) with the city key, and in its lower half a bohío (a traditional hut) and a tamarind tree; " +
      "its motto reads “Patria, Prosperidad, Familia”.",
    sources: [
      { title: "Símbolos municipales — Portal del Ciudadano Mi Santa Clara", url: "https://www.misantaclara.gob.cu/nuestra-region/region-cizq/simbolos-municipales" },
    ],
  },

  // ── Cienfuegos — capital of Cienfuegos province, Cuba ──────────────────────
  "CU-06": {
    description:
      "Three vertical stripes — blue, white, red — recalling the French flag and the French origin of the " +
      "founders of the colony of Fernandina de Jagua. A white cross on the blue stripe stands for " +
      "Christianity and the city’s patroness, the Immaculate Conception; the white stripe carries the city " +
      "arms with the motto “Fe, Trabajo y Unión” (Faith, Work and Union); and a white five-pointed star sits " +
      "on the red.",
    sources: [
      { title: "Símbolos locales: La bandera de Cienfuegos — 5 de Septiembre", url: "https://www.5septiembre.cu/simbolos-locales-la-bandera-de-cienfuegos/" },
      { title: "Atributos locales de Cienfuegos — EcuRed", url: "https://www.ecured.cu/Atributos_locales_de_Cienfuegos" },
    ],
  },

  // ── Ostrava — capital of the Moravian-Silesian Region, Czechia ─────────────
  "CZ-MO": {
    description:
      "A blue flag bearing a leaping white (silver) horse with a red saddle-cloth under a gold saddle, and a " +
      "gold rose. The horse is often linked to Ostrava’s position on the old Amber Road trade route (or " +
      "taken from the arms of the town’s first reeve); the gold rose was added under the Olomouc bishop " +
      "Stanislav Thurzo (1497–1560). Blue and white are the city’s colours.",
    sources: [
      { title: "Znak města Ostravy — Statutární město Ostrava", url: "https://ostrava.cz/cs/o-meste/znak-mesta-ostravy" },
      { title: "Vlajka Ostravy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_Ostravy" },
    ],
  },

  // ── Olomouc — capital of the Olomouc Region, Czechia ───────────────────────
  "CZ-OL": {
    description:
      "A blue flag bearing the crowned red-and-silver chequered eagle of Moravia and the gold letters " +
      "S · P · Q · O. Olomouc was the historic Moravian capital, so it carries the Moravian eagle; the " +
      "letters stand for Senatus Populusque Olomucensis (“the Senate and People of Olomouc”), added to the " +
      "arms by Maria Theresa in 1758 to honour the citizens’ resistance during the Prussian sieges.",
    sources: [
      { title: "Znak a vlajka — Statutární město Olomouc / Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_a_vlajka_Olomouce" },
    ],
  },

  // ── Pardubice — capital of the Pardubice Region, Czechia ───────────────────
  "CZ-PA": {
    description:
      "A red flag bearing the front half of a leaping silver horse with a gold bridle — the arms of the " +
      "Lords of Pardubice, used since the 16th century. By the old heraldic legend, Ješek of Pardubice had " +
      "his horse severed in half by a portcullis during a 1158 night assault on Milan and carried the half " +
      "away, earning the half-horse arms for his bravery; the horse stands for strength and endurance and " +
      "the white horse for victorious peace.",
    sources: [
      { title: "Znak města — Parpedie / Statutární město Pardubice", url: "http://www.parpedie.cz/cti-zaznam.php?id=Znak_mesta" },
    ],
  },

  // ── Jihlava — capital of the Vysočina Region, Czechia ──────────────────────
  "CZ-VY": {
    description:
      "A flag divided per bend, white with a red hedgehog above and red with the crowned Bohemian lion " +
      "below. As the oldest royal mining town, Jihlava bears the royal lion; the hedgehog is a canting " +
      "device — the town’s German name Iglau was read from Igel, “hedgehog” — and the hedgehog has become " +
      "the city’s emblem.",
    sources: [
      { title: "Znak a symbol města Jihlavy — Statutární město Jihlava", url: "https://www.jihlava.cz/znak-a-symbol-mesta-jihlavy/d-517486" },
    ],
  },

  // ── Zlín — capital of the Zlín Region, Czechia ─────────────────────────────
  "CZ-ZL": {
    description:
      "Five horizontal stripes — blue, yellow, blue, yellow, blue — with a yellow eight-pointed star on the " +
      "wider central blue stripe. The star is taken from the city arms, which show a golden timber tower with " +
      "an open gate on a green lawn beneath a golden eight-pointed star, on blue.",
    sources: [
      { title: "Symboly a ocenění města — Statutární město Zlín", url: "https://www.zlin.eu/symboly-a-oceneni-mesta" },
    ],
  },

  // ── Liberec — capital of the Liberec Region, Czechia ───────────────────────
  "CZ-LI": {
    description:
      "Two horizontal stripes, red over white, taken from the city arms: a silver shield with a red town " +
      "wall of two towers, an open gate and a portcullis, and above the gate the Redern family shield and a " +
      "lion. Red and white have been Liberec’s colours since the early 19th century.",
    sources: [
      { title: "O vlajce města Liberce — Muzeum Libea", url: "https://www.muzeum-libea.cz/vlajky-a-prapory/o-vlajce-mesta-liberce/" },
    ],
  },

  // ── Prague — capital of Czechia (and seat of the Central Bohemian Region) ──
  "CZ-ST": {
    description:
      "Two horizontal stripes, gold over red, taken from the city arms. The arms show, on red, a golden town " +
      "wall with an open gate and raised portcullis and three golden towers, with a silver armoured arm " +
      "holding a sword emerging from the gate. Emperor Frederick III changed the Old Town’s silver walls to " +
      "gold as a reward for loyalty, and the sword-arm was added by Ferdinand III in 1649 for the city’s " +
      "heroic defence against the Swedish siege.",
    sources: [
      { title: "Vlajka hlavního města Prahy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_hlavn%C3%ADho_m%C4%9Bsta_Prahy" },
      { title: "Znak hlavního města Prahy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_hlavn%C3%ADho_m%C4%9Bsta_Prahy" },
    ],
  },

  // ── Brno — capital of the South Moravian Region, Czechia ───────────────────
  "CZ-JM": {
    description:
      "Four horizontal stripes — white, red, white, red (the top white stripe half-width) — from the city " +
      "arms, one of the oldest municipal arms in Czechia (on a seal from 1315). By one reading the stripes " +
      "picture the confluence of the Svitava and Svratka rivers south of the city, the narrower Svitava " +
      "shown as the half-width stripe.",
    sources: [
      { title: "Znak města Brna — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_m%C4%9Bsta_Brna" },
    ],
  },

  // ── České Budějovice — capital of the South Bohemian Region, Czechia ───────
  "CZ-JC": {
    description:
      "Two horizontal stripes, gold over red — one of the oldest documented flags in Bohemia (first " +
      "mentioned in 1401). The colours are taken from the city arms: a red shield with a silver crenellated " +
      "wall and three silver towers with golden roofs, and on the middle tower a red shield with the silver " +
      "Bohemian lion.",
    sources: [
      { title: "Symboly města — Statutární město České Budějovice", url: "https://www.c-budejovice.cz/symboly-mesta" },
      { title: "Vlajka Českých Budějovic — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_%C4%8Cesk%C3%BDch_Bud%C4%9Bjovic" },
    ],
  },

  // ── Hradec Králové — capital of the Hradec Králové Region, Czechia ─────────
  "CZ-KR": {
    description:
      "The flag’s colours come from the city arms — a red shield with a silver crowned double-tailed lion " +
      "holding a golden letter G. The lion is the Bohemian lion; the G (from the German Grätz / Hradec) has " +
      "marked the city since the Middle Ages; and “Králové” (“of the Queen”) recalls that Hradec Králové was " +
      "one of the dower towns of the Bohemian queens.",
    sources: [
      { title: "Znak města — Statutární město Hradec Králové", url: "https://www.hradeckralove.org/znak-mesta/d-54292" },
    ],
  },

  // ── Karlovy Vary — capital of the Karlovy Vary Region, Czechia ─────────────
  "CZ-KA": {
    description:
      "White over red, bearing the city arms: a silver crowned double-tailed Bohemian lion rising from three " +
      "silver wavy bars that stand for the town’s thermal springs. The spa was founded by and named after " +
      "Emperor Charles IV (“Charles’ Baths”), who by legend found the hot springs during a hunt — hence the " +
      "royal lion above the waters.",
    sources: [
      { title: "Symbolika Karlovarského kraje — Karlovarský kraj", url: "https://www.kr-karlovarsky.cz/karlovarsky-kraj/symboly-zastity/symbolika-karlovarskeho-kraje" },
    ],
  },

  // ── Ústí nad Labem — capital of the Ústí nad Labem Region, Czechia ─────────
  "CZ-US": {
    description:
      "Red, white, red, from the city arms — a red shield with a silver lion adorned with two golden knots. " +
      "King Vladislav II confirmed the arms in 1476, upgrading the earlier green shield to red (a higher " +
      "heraldic rank); the flag itself dates from 1990.",
    sources: [
      { title: "Symboly Ústeckého kraje — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Symboly_%C3%9Asteck%C3%A9ho_kraje" },
    ],
  },

  // ── Stuttgart — capital of Baden-Württemberg, Germany ──────────────────────
  "DE-BW": {
    description:
      "Black over gold, bearing the city arms — a rearing black horse on gold, the “Stuttgarter Rössle”. " +
      "The horse is a canting device: Stuttgart grew from a stud farm and its name comes from “Stutengarten” " +
      "(mare-garden). Black and gold are the city’s colours (the gold from the Württemberg house).",
    sources: [
      { title: "Flagge und Wappen von Stuttgart — Fahnenmast.com", url: "https://www.fahnenmast.com/blog/flagge-und-wappen-von-stuttgart" },
    ],
  },

  // ── Bremen — city-state, Germany ───────────────────────────────────────────
  "DE-HB": {
    description:
      "The “Speckflagge” (bacon flag): at least eight red-and-white stripes with a chequered field at the " +
      "hoist, nicknamed for the streaky-bacon look of the stripes. The colours are those of the medieval " +
      "imperial banner and the Hanseatic League; the Bremen key that appears with the arms is the key of " +
      "Saint Peter, patron of Bremen Cathedral, taken from the city seal of 1366.",
    sources: [
      { title: "Bremer Landessymbole — Landesportal Bremen", url: "https://landesportal.bremen.de/bremer-landessymbole" },
      { title: "Flagge Bremens — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Flagge_Bremens" },
    ],
  },

  // ── Wiesbaden — capital of Hesse, Germany ──────────────────────────────────
  "DE-HE": {
    description:
      "A blue flag with three golden lilies (two above, one below). The lilies were taken as symbols of " +
      "Charlemagne, whom Wiesbaden’s citizens around 1500 believed had founded the city; gold on blue are " +
      "also the colours of the Counts of Nassau. The arms were fixed in 1905.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Wiesbaden", url: "https://www.wiesbaden.de/en/stadtlexikon/stadtlexikon-a-z/stadtwappen" },
    ],
  },

  // ── Mainz — capital of Rhineland-Palatinate, Germany ───────────────────────
  "DE-RP": {
    description:
      "A red flag bearing the Wheel of Mainz — two six-spoked silver wheels joined by a cross. It is the " +
      "emblem of the Archbishopric and Electorate of Mainz, seen on coins from the 1230s. Its origin is " +
      "uncertain; it is most often linked to Saint Martin, the patron of the city and its cathedral, who is " +
      "shown with the two wheels on the council seal of 1300.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Mainz", url: "https://www.mainz.de/kultur-und-wissenschaft/stadtgeschichte/stadtwappen.php" },
      { title: "Mainzer Rad — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Mainzer_Rad" },
    ],
  },

  // ── Dresden — capital of Saxony, Germany ───────────────────────────────────
  "DE-SN": {
    description:
      "Black over gold, bearing the city arms — a shield split lengthwise with the black Meissen lion on the " +
      "left and two black bars (the Landsberg pales) on the right. Both were dominion symbols of the Wettins, " +
      "the margraves of Meissen who resided in Dresden; the pales are coloured black (rather than the blue of " +
      "Leipzig’s) to tell the two cities apart. The arms have been used since the early 14th century.",
    sources: [
      { title: "Dresdner Stadtwappen — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Dresdner_Stadtwappen" },
    ],
  },

  // ── Magdeburg — capital of Saxony-Anhalt, Germany ──────────────────────────
  "DE-ST": {
    description:
      "Green over red, bearing the canting city arms of the “Maid and castle” (Magd + Burg) that voice the " +
      "city’s name. On silver a red twin-towered castle with an open golden gate; between the towers a " +
      "green-clad maiden holds a green wreath aloft, her loose hair and cloths marking her as a maiden and " +
      "the wreath standing for purity. The maiden and towers give Magdeburg its colours, green and red.",
    sources: [
      { title: "Das Stadtwappen — Landeshauptstadt Magdeburg", url: "https://www.magdeburg.de/B%C3%BCrger-Stadt/Stadt/Stadtwappen/" },
    ],
  },

  // ── Erfurt — capital of Thuringia, Germany ─────────────────────────────────
  "DE-TH": {
    description:
      "A red flag with a silver six-spoked wheel — the “Erfurt Wheel”, taken from the Wheel of Mainz because " +
      "Erfurt belonged to the Archbishopric of Mainz for over a thousand years (755–1802). By legend the " +
      "humble-born archbishop Willegis, mocked with wheels chalked on his house, answered by having white " +
      "wheels on red painted through all his rooms.",
    sources: [
      { title: "Warum Erfurt ein Wagenrad im Wappen trägt — Erfurt.de", url: "https://www.erfurt.de/ef/de/service/aktuelles/pm/2014/118042.html" },
    ],
  },

  // ── Potsdam — capital of Brandenburg, Germany ──────────────────────────────
  "DE-BB": {
    description:
      "On gold, the red Brandenburg eagle (the “Märkischer Adler”) beneath a red mural crown. The eagle was " +
      "first used as a seal by the Ascanian margrave Otto I in 1170; Potsdam was allowed the gold background " +
      "from 1660, when it became a royal residence, to mark its special standing, and the mural crown denotes " +
      "a city.",
    sources: [
      { title: "Wappen der Stadt Potsdam — Service Brandenburg", url: "https://service.brandenburg.de/service/de/adressen/kommunalverzeichnis/wappen/~wappen-der-stadt-potsdam-336901" },
    ],
  },

  // ── Schwerin — capital of Mecklenburg-Vorpommern, Germany ──────────────────
  "DE-MV": {
    description:
      "Yellow-blue-yellow, bearing the city arms: on blue, a golden armoured horseman — Henry the Lion — " +
      "riding with a lance and three-pointed pennon and a shield charged with a golden lion. Henry the Lion " +
      "founded Schwerin in 1160, and the arms honour the founder (from a seal first attested in 1255).",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Schwerin", url: "https://www.schwerin.de/politik-verwaltung/stadtverwaltung/pressestelle/stadtwappen-00001/" },
    ],
  },

  // ── Hanover — capital of Lower Saxony, Germany ─────────────────────────────
  "DE-NI": {
    description:
      "Red over white — the city colours — bearing the arms: on red, a silver wall with two towers, a golden " +
      "lion between them and, in the open gate, a golden shield with a green cloverleaf (or Marian flower). " +
      "The lion is that of the Welfs, the dynasty that ruled here and long held the British crown; the open " +
      "gate stands for the trade on which the city lived. The arms are known from a seal of 1266.",
    sources: [
      { title: "Flagge und Wappen von Hannover — Fahnenmast.com", url: "https://www.fahnenmast.com/blog/flagge-und-wappen-von-hannover" },
    ],
  },

  // ── Düsseldorf — capital of North Rhine-Westphalia, Germany ────────────────
  "DE-NW": {
    description:
      "Red over white, bearing the city arms — on silver, the red Bergisch lion (double-tailed, blue-crowned) " +
      "holding a blue anchor. The anchor is the city’s oldest emblem, for the citizens’ ties to Rhine " +
      "shipping; the lion is that of the Duchy of Berg, added when Düsseldorf became the duchy’s capital in " +
      "the 16th century.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Düsseldorf", url: "https://www.duesseldorf.de/stadtarchiv/stadtgeschichte/aufsaetze/aufsaetze/stadtwappen" },
    ],
  },

  // ── Kiel — capital of Schleswig-Holstein, Germany ──────────────────────────
  "DE-SH": {
    description:
      "A red flag bearing the city arms: a silver nettle-leaf (Nesselblatt) on red with a black boat on it. " +
      "The nettle-leaf on red comes from the Schauenburg counts of Holstein, and each Holstein town added its " +
      "own mark — Kiel chose the boat, which stands for the city’s harbour (and, walled, for its town rights). " +
      "Red and white were chosen as imperial colours over a lion that could read as Danish.",
    sources: [
      { title: "Wappen der Landeshauptstadt Kiel — Landeshauptstadt Kiel", url: "https://www.kiel.de/de/kultur_freizeit/stadtgeschichte/wappen.php" },
      { title: "Kieler Wappen — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Kieler_Wappen" },
    ],
  },

  // ── Saarbrücken — capital of Saarland, Germany ─────────────────────────────
  "DE-SL": {
    description:
      "The city arms, formed in 1909 when Saarbrücken united three towns, combine an emblem from each: the " +
      "red “St. Johann rose” from St. Johann, a crossed black hammer and mallet (mining) from " +
      "Malstatt-Burbach, and the silver lion on blue of the Counts of Saarbrücken.",
    sources: [
      { title: "Das Wappen Saarbrückens — regionalgeschichte.net", url: "https://www.regionalgeschichte.net/saarland/saarbruecken/einzelaspekte/wappen.html" },
    ],
  },

  // ── Nuuk — capital of Greenland ─────────────────────────────────────────────
  "DK-GL": {
    description:
      "A blue-and-white shield with, in the foreground, the red teachers’ college (the “red siminar”) with " +
      "gold windows and a weathercock, and a yellow kayak paddle on the water before it; Mt Sermitsiaq rises " +
      "behind. The red college stands for education and culture; the paddle for the Greenlanders’ hunting " +
      "way of life and for Nuuk as the seat of Greenland; the three white waves are sea ice and the three " +
      "blue waves the fjord; and the mountain stands for the people of Nuuk.",
    sources: [
      { title: "Coat of arms of Nuuk — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Nuuk" },
    ],
  },

  // ── San Francisco de Macorís — capital of Duarte province, Dominican Rep. ──
  "DO-06": {
    description:
      "The city arms, first presented at a 1907 exhibition where each province was given arms for its main " +
      "industry. Its defining charge is the cacao pod: San Francisco de Macorís, capital of Duarte province, " +
      "is the country’s great cacao producer — the “Land of Cacao”. The design also shows the local mountain " +
      "Loma Quita Espuela with a rising sun, and three white lilies.",
    sources: [
      { title: "Historia del Escudo de San Francisco de Macorís — El Jaya", url: "https://www.eljaya.com/40568/historia-del-escudo-de-san-francisco-de-macoris/" },
    ],
  },

  // ── Santiago de los Caballeros — capital of Santiago province, Dominican Rep. ─
  "DO-25": {
    description:
      "A red shield strewn with silver scallop shells (veneras) beneath a crown. The scallop is the emblem " +
      "of Saint James the Greater (Santiago): the city, founded in 1495 as “Santiago de los Treinta " +
      "Caballeros”, was named for the apostle and for the thirty knights of the Order of Santiago who " +
      "settled it, and King Ferdinand granted it these arms in 1508.",
    sources: [
      { title: "Santiago (República Dominicana) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Santiago_(Rep%C3%BAblica_Dominicana)" },
    ],
  },

  // ── Algiers — capital of Algeria ────────────────────────────────────────────
  "DZ-16": {
    description:
      "The arms of Algiers show a fortress for the Casbah, the old citadel above the city, and a ship for " +
      "the Algerian fleet on which the port’s life depends, flanked by two lions taken from the city’s " +
      "historic gates. A crescent stands for Islam, the state religion, above symbols of the nation’s work — " +
      "a sheaf of corn for agriculture and a cogwheel for industry.",
    sources: [
      { title: "Coat of arms of Algiers — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Algiers" },
    ],
  },

  // ── Quito — capital of Ecuador (and of Pichincha) ──────────────────────────
  "EC-P": {
    description:
      "Three vertical stripes — blue, red, blue — with the city arms at the centre. Blue is the sky of " +
      "Quito, red the blood of its people. The arms show a silver castle with three towers for the city’s " +
      "strength, nobility and loyalty, and the golden cord of Saint Francis hangs from the staff. Made " +
      "official in 1944.",
    sources: [
      { title: "Bandera de Quito — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Quito" },
    ],
  },

  // ── Guayaquil — capital of Guayas, Ecuador ─────────────────────────────────
  "EC-G": {
    description:
      "Five horizontal stripes — three light-blue alternating with two white — and three white stars on the " +
      "central blue stripe. Adopted after the independence of 9 October 1820, the light blue stands for the " +
      "sky and the Guayas river and the white for the peace sought; the three stars are read as the " +
      "provinces of the old Audiencia de Quito (Guayaquil, Cuenca and Quito). The design is attributed to " +
      "José Joaquín de Olmedo.",
    sources: [
      { title: "Bandera de Guayaquil — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Guayaquil" },
    ],
  },

  // ── Cuenca — capital of Azuay, Ecuador ─────────────────────────────────────
  "EC-A": {
    description:
      "Red over golden yellow. The colours echo the flag of Spain, reflecting the city’s Spanish founding; " +
      "Cuenca first carried its own banner in 1590, for the feast of Saint James the Apostle.",
    sources: [
      { title: "Bandera de Cuenca (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Cuenca_(Ecuador)" },
    ],
  },

  // ── Ambato — capital of Tungurahua, Ecuador ────────────────────────────────
  "EC-T": {
    description:
      "Three horizontal stripes — red, green, red. The red bands stand for the rebellious spirit of the " +
      "ambateños, the green for the countryside, its vegetation and the city’s cheer. Adopted in 1954.",
    sources: [
      { title: "Bandera de Ambato — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ambato" },
    ],
  },

  // ── Loja — capital of Loja province, Ecuador ───────────────────────────────
  "EC-L": {
    description:
      "Five horizontal stripes alternating red, blue and yellow, with the city arms at the centre — the " +
      "colours of the arms granted to the “very noble and very loyal” city by Philip II in 1571. Red is the " +
      "loyalty and sacrifice of the lojanos in the colonial expeditions toward the Amazon, yellow the “city " +
      "of gold” and the land’s riches, and silvery blue the Zamora and Malacatos rivers that flow to the " +
      "Amazon.",
    sources: [
      { title: "Símbolos patrios — Municipio de Loja", url: "https://www.loja.gob.ec/contenido/simbolos-patrios" },
      { title: "Bandera de Loja (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Loja_(Ecuador)" },
    ],
  },

  // ── Riobamba — capital of Chimborazo, Ecuador ──────────────────────────────
  "EC-H": {
    description:
      "Divided along the diagonal — red above, blue below. Red stands for the greatness of the riobambeño " +
      "people, ready to shed their blood; blue for the Ecuadorian sky and the ideal of liberty. Defined in " +
      "1958.",
    sources: [
      { title: "Bandera de Riobamba — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Riobamba" },
    ],
  },

  // ── Ibarra — capital of Imbabura, Ecuador ──────────────────────────────────
  "EC-I": {
    description:
      "Red over white, with the city arms at the centre. The colours come from the royal standard of the " +
      "city’s founder Miguel de Ibarra and the House of Austria, and stand for valour and purity. The design " +
      "dates to 1607 and was made official in 1951.",
    sources: [
      { title: "La bandera y el escudo atesoran el origen de Ibarra — La Hora", url: "https://www.lahora.com.ec/imbabura-carchi/bandera-escudo-ibarra-significado/" },
    ],
  },

  // ── Machala — capital of El Oro, Ecuador ───────────────────────────────────
  "EC-O": {
    description:
      "Three horizontal bands: light blue on top, white in the middle, and the lower band split green (hoist) " +
      "and red (fly). Light blue is the sky and sea, white the purity and peace of the machaleños, green the " +
      "greenness of the fields and their hope, and red the blood of the city’s people. Adopted in 1949.",
    sources: [
      { title: "Bandera de Machala — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Machala" },
    ],
  },

  // ── Portoviejo — capital of Manabí, Ecuador ────────────────────────────────
  "EC-M": {
    description:
      "A flag quartered into four panels. The upper hoist repeats the light-blue-and-white of Guayaquil’s " +
      "flag (without its stars), honouring Guayaquil’s lead in the 1820 independence that Portoviejo joined; " +
      "the upper fly is green for the valley’s exuberance; the lower hoist is red for the blood of local and " +
      "national heroes; and the lower fly is white for the nobility and purity of the city’s people. Created " +
      "in 1968.",
    sources: [
      { title: "Bandera de Portoviejo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Portoviejo" },
    ],
  },

  // ── Esmeraldas — capital of Esmeraldas province, Ecuador ───────────────────
  "EC-E": {
    description:
      "White over emerald green. White is the whiteness of the clouds that play in the wide sky, and the " +
      "emerald green the fresh colour of the region’s rich, fertile fields and pastures.",
    sources: [
      { title: "Bandera de Esmeraldas (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Esmeraldas_(Ecuador)" },
    ],
  },

  // ── Babahoyo — capital of Los Ríos, Ecuador ────────────────────────────────
  "EC-R": {
    description:
      "A green field with a white diamond bearing the city arms. Green stands for the canton’s crops, " +
      "vegetation and land; the white diamond for the peace and harmony of the city. Adopted in 1948.",
    sources: [
      { title: "Bandera de Babahoyo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Babahoyo" },
    ],
  },

  // ── Latacunga — capital of Cotopaxi, Ecuador ───────────────────────────────
  "EC-X": {
    description:
      "Yellow over light blue, with the city arms. Taken from Ecuador’s national colours, they are read as " +
      "Peace and Wealth, Spirituality and Beauty. Approved in 1972.",
    sources: [
      { title: "Ordenanza — Bandera de la ciudad de Latacunga (GAD Latacunga)", url: "https://latacunga.gob.ec/images/pdf/Ordenanzas/1_4_ordenanza_bandera_de_la_ciudad.pdf" },
    ],
  },

  // ── Tulcán — capital of Carchi, Ecuador ────────────────────────────────────
  "EC-C": {
    description:
      "Blue over red, with the national emblem in the upper hoist. Blue is the clear Ecuadorian sky, as wide " +
      "as the ideal of liberty Tulcán has always upheld; red is the greatness of a proud people who shed " +
      "their blood for independence and democracy. Adopted in 1949.",
    sources: [
      { title: "Bandera de Tulcán — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Tulc%C3%A1n" },
    ],
  },

  // ── Santo Domingo — capital of Santo Domingo de los Tsáchilas, Ecuador ─────
  "EC-SD": {
    description:
      "Red and green fields divided by a black-and-white diagonal cross, bearing the city arms. The colours " +
      "are those of the traditional Tsáchila “manpe tsanpá” body-painting: red for fire, the blood of the " +
      "ancestors and the achiote dye, and green for the lush region, nature’s renewal and hope. Defined in " +
      "1969.",
    sources: [
      { title: "Bandera de Santo Domingo (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Santo_Domingo_(Ecuador)" },
      { title: "Símbolos — Prefectura de Santo Domingo de los Tsáchilas", url: "https://gptsachila.gob.ec/simbolos/" },
    ],
  },

  // ── Guaranda — capital of Bolívar province, Ecuador ────────────────────────
  "EC-B": {
    description:
      "Three horizontal stripes — red, white, blue. Red is strength and the valiant character of the people " +
      "and the sacrifice of their heroes; white is dignity, honesty, justice and peace; blue is the wide " +
      "horizon and the sky of noble hopes, reflected in the rivers that water the Bolívar countryside. Made " +
      "official in 1984.",
    sources: [
      { title: "Símbolos Cívicos del cantón Guaranda — GAD Guaranda", url: "https://www.guaranda.gob.ec/newsiteCMT/simbolos-civicos-del-canton-guaranda/" },
    ],
  },

  // ── Azogues — capital of Cañar, Ecuador ────────────────────────────────────
  "EC-F": {
    description:
      "Three horizontal stripes — red, white, green — with the city arms. Red stands for valour, white for " +
      "integrity and purity, and green for hope and service. Adopted in 1948.",
    sources: [
      { title: "Bandera de Azogues — GAD Municipal de Azogues", url: "https://www.azogues.gob.ec/portal/index.php/azogues/s%C3%ADmbolos-cantonales/26-bandera-de-azogues" },
    ],
  },

  // ── Puerto Francisco de Orellana (Coca) — capital of Orellana, Ecuador ─────
  "EC-D": {
    description:
      "A yellow triangle at the hoist with green (upper) and black (lower) bands. Yellow stands for the " +
      "richness of the canton’s soil, black for the oil wealth of the Amazonian subsoil, and green for the " +
      "great plant biodiversity and forest and farm richness of the Amazon — and the hope of better days.",
    sources: [
      { title: "Historia y Símbolos — GAD Municipal de Francisco de Orellana", url: "https://orellana.gob.ec/historia_simbolos/" },
    ],
  },

  // ── Tena — capital of Napo, Ecuador ────────────────────────────────────────
  "EC-N": {
    description:
      "Gold over green, with the city arms. Gold stands for the region’s gold wealth, green for the " +
      "abundant, rich flora of the canton.",
    sources: [
      { title: "Símbolos del Cantón — GAD Municipal de Tena", url: "https://tena.gob.ec/index.php/tena/simbolos-del-canton" },
    ],
  },

  // ── Macas — capital of Morona Santiago, Ecuador ────────────────────────────
  "EC-S": {
    description:
      "A green band over a white band, with a white canton at the hoist bearing a gold star. Green stands " +
      "for the vegetal wealth and greenness of the Upano Valley, the gold star for the Virgen Purísima de " +
      "Macas (the city’s patroness), and white for the purity, serenity and peace of the people of Morona.",
    sources: [
      { title: "Símbolos del Cantón Morona — Cultura Macabea", url: "http://culturamacabea.blogspot.com/2010/12/simbolos-del-canton-morona.html" },
    ],
  },

  // ── Nueva Loja (Lago Agrio) — capital of Sucumbíos, Ecuador ────────────────
  "EC-U": {
    description:
      "Three horizontal stripes — light blue, white and green. The light blue stands for the canton’s " +
      "rivers, the white (with seven black stars for the canton’s parishes) for the community, and the green " +
      "for the exuberant Amazon jungle.",
    sources: [
      { title: "Bandera de Lago Agrio — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Lago_Agrio" },
    ],
  },

  // ── Puyo — capital of Pastaza, Ecuador ─────────────────────────────────────
  "EC-Y": {
    description:
      "A flag of four colours — green, white, blue and yellow. Green is the exuberant Amazon vegetation, " +
      "white the mist that wraps the city, blue (in curves) the river that bathes it, and yellow the wealth " +
      "of the land.",
    sources: [
      { title: "Bandera — Municipio de Pastaza (Puyo)", url: "https://puyo.gob.ec/articulo-tag/bandera/" },
    ],
  },

  // ── Tallinn — capital of Estonia ────────────────────────────────────────────
  "EE-37": {
    description:
      "Three blue and three white equal horizontal stripes. The blue stripes derive from the three blue " +
      "lions of Tallinn’s (and Estonia’s) medieval arms and stand for strength and bravery; the white " +
      "stripes stand for peace, freedom and integrity. The design served as the standard of the city’s " +
      "medieval merchant fleet.",
    sources: [
      { title: "Flag of Tallinn — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tallinn" },
    ],
  },

  // ── Tartu — capital of Tartu County, Estonia ───────────────────────────────
  "EE-78": {
    description:
      "White over red, with the city arms — granted by the Polish king Stephen Báthory in 1584. The arms " +
      "show a silver city wall with a gate and two towers on red; in the gateway a silver star above a " +
      "chain, and over the wall crossed silver keys and a sword. The keys and sword are the attributes of " +
      "Tartu’s patron saints Peter and Paul, and the open gate marks it as a Hanseatic trading town.",
    sources: [
      { title: "The Flag and the Coat of Arms of Tartu — Tartu linn", url: "https://tartu.ee/en/flag-and-coat-of-arms-of-tartu" },
    ],
  },

  // ── Pärnu — capital of Pärnu County, Estonia ───────────────────────────────
  "EE-67": {
    description:
      "A white Nordic (offset) cross on blue. The flag (approved 1934) takes the cross from the city arms, " +
      "which descend from Pärnu’s oldest seal of 1361 showing God’s hand holding a cross and a key — the " +
      "cross a relic said to have survived the Dome Church fire, the key the symbol of the town’s bylaws.",
    sources: [
      { title: "Symbols — Pärnu linn", url: "https://parnu.ee/en/home/symbols-of-parnu" },
    ],
  },

  // ── Viljandi — capital of Viljandi County, Estonia ─────────────────────────
  "EE-84": {
    description:
      "Light blue over white — the colours of the city arms, which show a white-and-gold rose on a blue " +
      "field.",
    sources: [
      { title: "Viljandi, City of (Estonia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-vilja.html" },
    ],
  },

  // ── Võru — capital of Võru County, Estonia ─────────────────────────────────
  "EE-86": {
    description:
      "Yellow, green, yellow — the colours of the city arms, a green spruce on gold. Empress Catherine II " +
      "confirmed the arms for the new county town in 1788, the spruce standing for the tree that grows " +
      "abundantly around Võru.",
    sources: [
      { title: "Sümboolika — Võru linn", url: "https://www.voru.ee/sumboolika" },
      { title: "Võru vapp — Vikipeedia (et)", url: "https://et.wikipedia.org/wiki/V%C3%B5ru_vapp" },
    ],
  },

  // ── Cairo — capital of Egypt ────────────────────────────────────────────────
  "EG-C": {
    description:
      "The governorate emblem shows a mosque with the city’s name in Kufic script, set in a ring within a " +
      "stylised city gate. The mosque stands for Cairo’s wealth of historic Islamic architecture — the " +
      "Citadel and its great mosques among them.",
    sources: [
      { title: "Cairo (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-cai.html" },
    ],
  },

  // ── Alexandria — capital of Alexandria Governorate, Egypt ──────────────────
  "EG-ALX": {
    description:
      "The flag bears a stylised image of the Lighthouse of Alexandria — the Pharos, one of the Seven " +
      "Wonders of the Ancient World, built under Ptolemy II in the 3rd century BC. It is the civic emblem of " +
      "Alexandria and stands for the city’s maritime heritage and its old renown as a great centre of trade " +
      "and learning.",
    sources: [
      { title: "Lighthouse of Alexandria — Wikipedia", url: "https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria" },
      { title: "Alexandria (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-alx.html" },
    ],
  },

  // ── Giza — capital of Giza Governorate, Egypt ──────────────────────────────
  "EG-GZ": {
    description:
      "The governorate emblem shows the three Pyramids of Giza framed by papyrus, with a minaretted mosque — " +
      "Giza being the home of the Pyramids and the Great Sphinx.",
    sources: [
      { title: "al-Jizah (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-jiz.html" },
    ],
  },

  // ── Aswan — capital of Aswan Governorate, Egypt ────────────────────────────
  "EG-ASN": {
    description:
      "On light blue, a golden emblem of a wheel with zig-zag waves and power pylons drawn from it — a " +
      "reference to the hydro-electricity generated by the Aswan Dam, the governorate’s defining work.",
    sources: [
      { title: "Aswan (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-asw.html" },
    ],
  },

  // ── Luxor — capital of Luxor Governorate, Egypt ────────────────────────────
  "EG-LX": {
    description:
      "The flag shows the temple of Karnak with its avenue of sphinxes, and above it the golden funerary " +
      "mask of Tutankhamun, found intact in the Valley of the Kings — Luxor being the site of ancient " +
      "Thebes.",
    sources: [
      { title: "Luxor (Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-lux.html" },
    ],
  },

  // ── Suez — capital of Suez Governorate, Egypt ──────────────────────────────
  "EG-SUZ": {
    description:
      "A red flame within a cogwheel: the cogwheel for the governorate’s strong industry and the flame for " +
      "its oil and gas — Suez being a major centre of Egypt’s petroleum industry.",
    sources: [
      { title: "Suez (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-sue.html" },
    ],
  },

  // ── Benha — capital of Qalyubia Governorate, Egypt ─────────────────────────
  "EG-KB": {
    description:
      "On green, an emblem of a mosque set within a half-cogwheel above and a half-wreath of grain below — " +
      "for the governorate’s industry (the cogwheel), the agriculture of its Nile-Delta land (the grain), " +
      "and its religious life (the mosque).",
    sources: [
      { title: "al-Qalyubiyah (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-qal.html" },
    ],
  },

  // ── Kafr el-Sheikh — capital of Kafr el-Sheikh Governorate, Egypt ──────────
  "EG-KFS": {
    description:
      "On turquoise — for the governorate’s Mediterranean coast — an emblem of a Pharaonic-style sailing " +
      "ship above three wavy lines, flanked by two ears of grain. The three waves are the governorate’s " +
      "waters (the Mediterranean, Lake Burullus and the Nile), the grain its agriculture, and the ship " +
      "recalls the 1956 naval Battle of Burullus.",
    sources: [
      { title: "Flag of Kafr El Sheikh Governorate — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kafr_El_Sheikh_Governorate" },
      { title: "Kafr el-Sheikh (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-kaf.html" },
    ],
  },

  // ── Sohag — capital of Sohag Governorate, Egypt ────────────────────────────
  "EG-SHG": {
    description:
      "On dark green, the head of a pharaoh wearing the Pschent — the double crown of Upper and Lower " +
      "Egypt — for this Upper-Egyptian governorate on the Nile.",
    sources: [
      { title: "Sawhaj (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-saw.html" },
      { title: "Sohag Governorate — Wikipedia", url: "https://en.wikipedia.org/wiki/Sohag_Governorate" },
    ],
  },

  // ── Albacete — capital of Albacete province, Spain ─────────────────────────
  "ES-AB": {
    description:
      "A crimson field with the city arms — three silver towers set in a triangle, surmounted by a bat, " +
      "beneath a marquis’ crown. The bat evolved from an eagle shown on the town’s 16th-century arms (the " +
      "eagle appears by 1568); the reason for the beast is itself lost to history. Adopted 1992.",
    sources: [
      { title: "Bandera de Albacete — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Albacete" },
    ],
  },

  // ── Cádiz — capital of Cádiz province, Spain ───────────────────────────────
  "ES-CA": {
    description:
      "A crimson field with the city arms: Hercules in a lion skin between two lions, flanked by the two " +
      "Pillars of Hercules inscribed PLUS and ULTRA, with the motto “Hercules Fundator Gadium " +
      "Dominatorque”. By legend Hercules founded Cádiz and split the pillars to form the Strait of Gibraltar.",
    sources: [
      { title: "Escudo de Cádiz — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_C%C3%A1diz" },
    ],
  },

  // ── Cáceres — capital of Cáceres province, Spain ───────────────────────────
  "ES-CC": {
    description:
      "A party shield: on red a golden three-towered castle, and on silver a crowned rampant lion. Queen " +
      "Isabella the Catholic ordered in 1477 that Cáceres unite the two into a single seal — the castle of " +
      "Castile and the lion of León.",
    sources: [
      { title: "Escudo de Cáceres — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_C%C3%A1ceres" },
    ],
  },

  // ── Córdoba — capital of Córdoba province, Spain ───────────────────────────
  "ES-CO": {
    description:
      "A crimson field — from the “Purple Banner of Castile” whose colour the city adopted — bearing the " +
      "city seal, a view of Córdoba from across the Guadalquivir showing the Roman bridge, the Mosque‑" +
      "Cathedral and the Albolafia water-wheel.",
    sources: [
      { title: "Símbolos de Córdoba — Ayuntamiento de Córdoba", url: "https://sites.google.com/site/simbolosdecordoba/comarca-de-cordoba/cordoba" },
    ],
  },

  // ── Granada — capital of Granada province, Spain ───────────────────────────
  "ES-GR": {
    description:
      "Two vertical stripes, crimson at the mast and green, with the city arms at the centre. The red and " +
      "green recall the Nasrid dynasty that ruled Granada; the arms show the Catholic Monarchs, Ferdinand " +
      "and Isabella, enthroned — for the city they took in 1492. The flag was restored in 1980.",
    sources: [
      { title: "Bandera de Granada (España) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Granada_(Espa%C3%B1a)" },
    ],
  },

  // ── Alicante — capital of Alicante province, Spain ─────────────────────────
  "ES-A": {
    description:
      "Divided vertically, white at the mast and blue at the fly, with the city arms in the centre. It began " +
      "as an 1845 naval signal flag and was adopted by the city in 1893; blue stands for justice and " +
      "loyalty, white for purity. The arms show the golden castle of Santa Bárbara on Mount Benacantil, the " +
      "white rock (Greek “Akra Leuka”) beaten by the blue sea.",
    sources: [
      { title: "La bandera de Alicante — Ayuntamiento de Alicante", url: "https://www.alicante.es/es/contenidos/bandera-alicante" },
    ],
  },

  // ── Almería — capital of Almería province, Spain ───────────────────────────
  "ES-AL": {
    description:
      "A white field with the red cross of Saint George and the city arms. The cross comes from the Genoese " +
      "banner — Genoa’s fleet helped Alfonso VII take Almería in 1147 — and the city kept it after the " +
      "Catholic Monarchs’ reconquest in 1489; the arms’ quarters honour the kingdoms that shared in the " +
      "conquest (Castile, León, Aragón, Navarre and Granada).",
    sources: [
      { title: "Bandera de Almería — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Almer%C3%ADa" },
    ],
  },

  // ── Ávila — capital of Ávila province, Spain ───────────────────────────────
  "ES-AV": {
    description:
      "A crimson field with the city arms — a golden castle from which the young King Alfonso VII looks out, " +
      "with the motto “Ávila del Rey” recalling the city’s loyalty to that king in his minority. The arms " +
      "were granted around 1130–1135; the crimson stands for the blood of the city’s defenders.",
    sources: [
      { title: "Escudo de Ávila — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_%C3%81vila" },
    ],
  },

  // ── Badajoz — capital of Badajoz province, Spain ───────────────────────────
  "ES-BA": {
    description:
      "A crimson field — the colour of the Kingdom of León, into which Badajoz was incorporated in 1230 — " +
      "with the city arms: a golden lion (the emblem of León, granted by Alfonso IX), a silver column " +
      "bearing “PLUS ULTRA” (for the frontier city, granted under Charles I), and three silver waves for the " +
      "Guadiana river.",
    sources: [
      { title: "Bandera de la Ciudad de Badajoz — Ayuntamiento de Badajoz", url: "https://www.aytobadajoz.es/es/ayto/bandera" },
    ],
  },

  // ── Bilbao — capital of Biscay, Spain ──────────────────────────────────────
  "ES-BI": {
    description:
      "A white flag with a red square in the upper hoist. It is an old distinguishing flag of Bilbao’s " +
      "merchant ships, taken up by the town and its council in 1845.",
    sources: [
      { title: "La bandera de Bilbao — Periódico Bilbao", url: "https://periodicobilbao.com/bandera-bilbao/" },
    ],
  },

  // ── Burgos — capital of Burgos province, Spain ─────────────────────────────
  "ES-BU": {
    description:
      "Two horizontal stripes, red over brown, with the city arms in the centre. The arms show, on green, " +
      "the crowned bust of King Ferdinand III in a purple mantle charged with three golden castles, flanked " +
      "by two shields of gold castles above a gate between two towers.",
    sources: [
      { title: "Escudo — Ayuntamiento de Burgos", url: "https://www.aytoburgos.es/escudo-e-himno/-/asset_publisher/5USVljaB20f0/content/id/477891" },
    ],
  },

  // ── Cuenca — capital of Cuenca province, Spain ─────────────────────────────
  "ES-CU": {
    description:
      "A red field with a golden chalice and an eight-pointed white star beneath a royal crown. The arms " +
      "recall the reconquest of Cuenca by Alfonso VIII in 1177: the star for the start of the siege on 6 " +
      "January (Epiphany), and the chalice of Saint Matthew for the city’s fall on 21 September, the saint’s " +
      "feast day.",
    sources: [
      { title: "Escudo de Cuenca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Cuenca" },
    ],
  },

  // ── Castellón de la Plana — capital of Castellón, Spain ────────────────────
  "ES-CS": {
    description:
      "The yellow-and-red bars of the Senyera with a green band at the mast and the city arms beside it. The " +
      "arms — the Aragonese bars beneath a silver castle — are a canting device: “Castelló” means “little " +
      "castle”. The flag was fixed for the city’s 700th anniversary in 1952.",
    sources: [
      { title: "Bandera de Castellón de la Plana — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Castell%C3%B3n_de_la_Plana" },
    ],
  },

  // ── Girona — capital of Girona province, Spain ─────────────────────────────
  "ES-GI": {
    description:
      "The gold-and-red bars of the Senyera — the arms of the Crown of Aragón, which Girona has borne since " +
      "the 13th century — with a small shield of wavy red-and-silver bars said to stand for the four rivers " +
      "(Ter, Onyar, Güell and Galligants) that meet at the city.",
    sources: [
      { title: "Escudo de Gerona — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Gerona" },
    ],
  },

  // ── Jaén — capital of Jaén province, Spain ─────────────────────────────────
  "ES-J": {
    description:
      "An indigo field with the city arms — the quartered castle-and-lion of Castile and León that Ferdinand " +
      "III granted after taking the city. He also gave Jaén a crimson pennant of Castile with the title " +
      "“guardian and defence of the kingdoms of Castile”; over time that crimson darkened to today’s indigo.",
    sources: [
      { title: "Bandera de Jaén — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ja%C3%A9n" },
    ],
  },

  // ── Lleida — capital of Lleida province, Spain ─────────────────────────────
  "ES-L": {
    description:
      "A crimson field with the city arms: on gold the four red bars of the Crown of Aragón, over all a " +
      "green stalk bearing three silver fleurs-de-lis. The lilies are canting — the old name “Lerita” was " +
      "linked to “liri”, the Catalan for fleur-de-lis — and the Aragón bars were added when the city came " +
      "under royal rule.",
    sources: [
      { title: "Escudo de Lérida — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_L%C3%A9rida" },
    ],
  },

  // ── León — capital of León province, Spain ─────────────────────────────────
  "ES-LE": {
    description:
      "A crimson field bearing the city arms — on silver, the purple lion of León, one of the oldest " +
      "heraldic devices in Europe (the purple tint is documented in 13th-century armorials).",
    sources: [
      { title: "Símbolos de León — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/S%C3%ADmbolos_de_Le%C3%B3n" },
    ],
  },

  // ── Lugo — capital of Lugo province, Spain ─────────────────────────────────
  "ES-LU": {
    description:
      "A white flag with the city arms held by two golden lions: a silver tower on blue, surmounted by a " +
      "golden chalice with a radiant host between two praying angels, and a border with the motto “Hoc hic " +
      "mysterium fidei firmiter profitemur” — “here we firmly profess this mystery of faith”, for the " +
      "perpetual exposition of the Blessed Sacrament in Lugo’s cathedral.",
    sources: [
      { title: "Bandera de Lugo (ciudad) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Lugo_(ciudad)" },
    ],
  },

  // ── Málaga — capital of Málaga province, Spain ─────────────────────────────
  "ES-MA": {
    description:
      "Divided vertically, purple at the mast and green, with the city arms. The Catholic Monarchs granted " +
      "the arms after taking Málaga in 1487: on red, the city and the hilltop fortress of Gibralfaro with " +
      "the walled enclosure where Christian captives were held.",
    sources: [
      { title: "Escudo y bandera de la ciudad — Ayuntamiento de Málaga", url: "https://www.malaga.eu/identidad/escudo-y-bandera-de-la-ciudad/" },
    ],
  },

  // ── Pamplona — capital of Navarre, Spain ───────────────────────────────────
  "ES-NA": {
    description:
      "A green field with the city arms: on blue a silver lion beneath a royal crown, bordered by the golden " +
      "chains of Navarre. King Charles III the Noble granted the arms and flag in the 1423 “Privilege of the " +
      "Union” that joined Pamplona’s three rival boroughs into one city.",
    sources: [
      { title: "El Escudo de Pamplona — Ayuntamiento de Pamplona", url: "https://www.pamplona.es/ayuntamiento/varios/el-escudo-de-pamplona" },
    ],
  },

  "ES-SE": {
    description:
      "A crimson field bearing the city’s golden “NO·DO” device — the letters NO and DO flanking a skein of " +
      "wool (a madeja). Read as “No madeja do”, it puns on “No me ha dejado” (“It has not forsaken me”), the " +
      "motto tradition credits King Alfonso X the Wise, who kept Seville loyal during his son’s revolt. The " +
      "crimson recalls the Pendón de San Fernando, the banner of Ferdinand III who took the city in 1248.",
    sources: [
      { title: "Bandera de Sevilla — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Sevilla" },
      { title: "NO8DO — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/NO8DO" },
    ],
  },

  "ES-V": {
    description:
      "The Reial Senyera: four red bars on gold — the arms of the Crown of Aragon — with, at the hoist, a blue " +
      "strip topped by a crown. Valencia’s flag adds this crowned blue band to the bare Aragonese bars as a " +
      "royal distinction granted to the city, said to date from its conquest by King Jaume I in 1238.",
    sources: [
      { title: "Señera de Valencia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Se%C3%B1era_valenciana" },
    ],
  },

  "ES-Z": {
    description:
      "A crimson field bearing the city arms — a golden lion rampant, crowned. The lion is that of the kings of " +
      "León and Castile: Alfonso VII, who held Zaragoza in the 1130s, is traditionally cited as the source of " +
      "the charge, which stands for strength and nobility.",
    sources: [
      { title: "Escudo de Zaragoza — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Zaragoza" },
    ],
  },

  "ES-TO": {
    description:
      "A crimson (carmesí) field bearing the black double-headed Imperial eagle behind the quartered city arms " +
      "of castles and lions, ensigned with a crown and encircled by the collar of the Order of the Golden " +
      "Fleece. The double-headed eagle marks Toledo as the imperial capital of Charles V, granted for the " +
      "city’s loyalty to the Habsburg crown.",
    sources: [
      { title: "Escudo de Toledo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Toledo" },
    ],
  },

  "ES-VA": {
    description:
      "A crimson field bearing the city arms: five golden flames encircled by eight castles, ensigned with a " +
      "crown and ringed by the cross of the Order of San Fernando. The eight castles mark Valladolid’s bond to " +
      "the Crown of Castile; the five flames are read by some authors as recalling the great fire that ravaged " +
      "the city in 1561.",
    sources: [
      { title: "Bandera de Valladolid — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Valladolid" },
    ],
  },

  "ES-SA": {
    description:
      "A red field bearing the quartered city arms: a stone bridge over the river Tormes crossed by a black " +
      "bull, with a fig tree — the emblems of Salamanca’s Roman bridge and its territory — quartered with the " +
      "red-and-gold bars of the Crown, ensigned with the royal crown.",
    sources: [
      { title: "Salamanca (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Salamanca" },
    ],
  },

  "ES-S": {
    description:
      "A white-over-blue horizontal bicolour bearing the city arms: the Torre del Oro of Seville and the ship " +
      "of Admiral Ramón de Bonifaz breaking the chains that barred the Guadalquivir at the conquest of Seville " +
      "in 1248, with the two crowned heads of Santander’s patron saints, Emeterio and Celedonio.",
    sources: [
      { title: "Escudo de Santander — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Santander" },
    ],
  },

  "ES-SG": {
    description:
      "A sky-blue field bearing the city arms — the silver two-tier Roman aqueduct, Segovia’s defining monument, " +
      "surmounted by a human head set on rocks (marking the frontier land the city led in repopulating during " +
      "the Reconquista), ensigned with the royal crown. The flag’s field was changed from purple to sky blue in " +
      "the 1980s and fixed by the 2011 protocol regulation.",
    sources: [
      { title: "Bandera de Segovia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Segovia" },
      { title: "Escudo de Segovia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Segovia" },
    ],
  },

  "ES-T": {
    description:
      "A golden field charged with four wavy red bars — a variant of the Senyal Reial of the Crown of Aragon, " +
      "attested in the city’s council records since the 14th century. The bars are rendered wavy at Tarragona " +
      "as an allusion to the sea on which the port city stands.",
    sources: [
      { title: "Escudo de Tarragona — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Tarragona" },
    ],
  },

  "ES-VI": {
    description:
      "A white field crossed by a red saltire (St Andrew’s cross), bearing the city arms — a castle topped by " +
      "watchful ravens above a green mount, the fortress that names Gasteiz. The saltire design was adopted in " +
      "1922; the arms carry the motto “Haec est victoria quae vincit” (“This is the victory that conquers”), a " +
      "play on the name Vitoria given the town by King Sancho VI in 1181.",
    sources: [
      { title: "Vitoria (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Vitoria" },
    ],
  },

  "ES-CE": {
    description:
      "A gyronny of black and white — the ancient flag of Saint Vincent, better known as the flag of Lisbon, in " +
      "the colours of the Dominican Order — charged with the city arms: the five blue Portuguese escutcheons " +
      "(the quinas) within a red border of golden castles. The design records that Ceuta was Portuguese from " +
      "1415 until it passed to the Spanish crown in 1640, keeping Lisbon’s banner as its own.",
    sources: [
      { title: "Bandera de Ceuta — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ceuta" },
    ],
  },

  "ES-GC": {
    description:
      "A field bearing the city arms granted by Queen Joanna in 1506: a castle and lion for the direct rule of " +
      "the Crown of Castile, a tower recalling the town’s fortifications, waves for the surrounding ocean, and " +
      "palm trees flanked by dogs — the palms alluding to the victories over Drake (1595) and van der Does " +
      "(1599) and, with the dogs, to the name of the Canary (“Dog”) Islands.",
    sources: [
      { title: "Las Palmas de Gran Canaria — Símbolos de Canarias", url: "https://simbolosdecanarias.proel.net/index.php/esp/islas/gran-canaria/las-palmas-de-gran-canaria" },
      { title: "Las Palmas de Gran Canaria — Flags of the World", url: "https://www.crwflags.com/fotw/flags/es-gc-lp.html" },
    ],
  },

  "ES-GU": {
    description:
      "A purple (morado) field — the colour of Castile’s medieval banners — bearing the city arms: a walled " +
      "medieval town with church towers and a castle beneath a night sky of moon and stars, and before it, on a " +
      "green meadow, an armed knight leading a host of foot soldiers. The rider is the town’s “juez” (judge), " +
      "the people’s magistrate who carried the city standard at the head of civic processions.",
    sources: [
      { title: "Escudo de Guadalajara (España) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Guadalajara_(Espa%C3%B1a)" },
      { title: "El escudo de Guadalajara — Herrera Casado", url: "https://www.herreracasado.com/1980/09/20/el-escudo-de-guadalajara/" },
    ],
  },

  "ES-H": {
    description:
      "A light-blue field bearing the city arms on silver: a green olive tree flanked by a golden castle and a " +
      "black anchor, encircled by the motto “Portus maris et terrae custodia” (“Port of the sea and sentinel of " +
      "the land”). The castle stands for the city’s fortifications and the anchor for its maritime life as an " +
      "Atlantic port.",
    sources: [
      { title: "Escudo de Huelva — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Huelva" },
    ],
  },

  "ES-OR": {
    description:
      "A blue field bearing the city arms on silver: a five-arched golden bridge over blue-and-silver waves — " +
      "the great bridge over the river Miño — flanked by a golden castle and a golden lion holding a sword, the " +
      "emblems of Castile and León, ensigned with the royal crown.",
    sources: [
      { title: "Escudo de Orense — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Orense" },
    ],
  },

  "ES-P": {
    description:
      "A crimson field bearing the quartered city arms: on blue, a golden fleur-de-lis “Cross of Victory” — " +
      "granted by King Alfonso VIII to Bishop Tello Téllez de Meneses for Palencia’s part in the 1212 victory " +
      "at Las Navas de Tolosa — quartered with a golden three-towered castle on red for the Kingdom of Castile, " +
      "ensigned with the royal crown.",
    sources: [
      { title: "Escudo de Palencia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Palencia" },
    ],
  },

  "ES-SO": {
    description:
      "A white field bearing the city arms: on red, a silver castle from whose keep rises the crowned bust of a " +
      "king — Alfonso VIII of Castile, sheltered by Soria’s nobles in his childhood — with the silver border " +
      "carrying the motto “Soria pura, cabeza de Extremadura”. The red field stands for the blood shed by the " +
      "city’s knights, and “cabeza de Extremadura” marks Soria as the chief frontier town of the Reconquista.",
    sources: [
      { title: "Escudo de Soria — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Soria" },
    ],
  },

  "ES-SS": {
    description:
      "A white field with a France-blue square at the upper hoist — the maritime ensign a royal order gave the " +
      "port of San Sebastián in the early 19th century, which the city later adopted as its flag (officialised " +
      "1999). The blue stands for the sea and the white for the peace and unity of the city’s people.",
    sources: [
      { title: "Bandera de Donostia/San Sebastián — Ayto. (via Comprarbanderas)", url: "https://www.comprarbanderas.es/bandera-san-sebastian-id328.html" },
      { title: "Escudo de San Sebastián — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_San_Sebasti%C3%A1n" },
    ],
  },

  "ES-ZA": {
    description:
      "The Seña Bermeja: nine horizontal bands ending in points — eight red and one green. The eight red bands " +
      "are said to stand for the eight victories of the Lusitanian leader Viriato over Rome; the green band was " +
      "added by King Ferdinand the Catholic to reward Zamora’s loyalty at the Battle of Toro (1476).",
    sources: [
      { title: "Bandera de Zamora — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Zamora" },
    ],
  },

  "ET-HA": {
    description:
      "The flag of the Harari Region — of which Harar is the capital and only city — a white field crossed by red " +
      "and green bands bearing the regional seal. White stands for peace, equality and justice; red for the " +
      "Harari people’s struggle and sacrifice for their rights and freedom; green for agricultural development. " +
      "In the seal a pigeon marks peace and democracy, a scale justice and equality, the Jugol (the walled " +
      "city’s traditional architecture) Harari history and culture, and a plough, wheat and coffee branch the " +
      "region’s farming, food self-sufficiency and coffee economy.",
    sources: [
      { title: "Description of the Harari Regional Flag (Hareri National League) — Wikimedia file page", url: "https://en.wikipedia.org/wiki/File:Harari_Flag.svg" },
    ],
  },

  "FI-07": {
    description:
      "A gold field bearing Kokkola’s emblem: a black tar barrel with red flames rising from both ends and the " +
      "bung. Granted when King Gustavus II Adolphus chartered the town in 1620, it records the tar-burning and " +
      "tar trade that made Kokkola one of Finland’s wealthiest export ports into the 19th century.",
    sources: [
      { title: "Kokkola — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Kokkola" },
    ],
  },

  "FI-10": {
    description:
      "A green field bearing Rovaniemi’s arms: a silver pall (a Y-shaped fork) with a golden flame in the upper " +
      "corner. The pall stands for the meeting of the two rivers — the Kemijoki and the Ounasjoki — at " +
      "Rovaniemi; the flame is a torch of enlightenment and of the city’s rebuilding after its wartime " +
      "destruction. Adopted 1956.",
    sources: [
      { title: "Rovaniemi — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Rovaniemi" },
    ],
  },

  "FI-11": {
    description:
      "A red field bearing Tampere’s arms, all in gold: a wavy bar for the Tammerkoski rapids that run through " +
      "the city and once powered its mills, above it a hammer (in the form of a T) for its industry, and below " +
      "a caduceus for commerce. Designed by Olof Eriksson, 1960.",
    sources: [
      { title: "Tampere — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Tampere" },
    ],
  },

  "FI-12": {
    description:
      "A red field bearing the golden Vasa emblem — a sheaf or bundle (Swedish “vase”), the badge of the royal " +
      "House of Vasa — which the town took when it was renamed Vaasa by royal charter in 1611. Below it hangs " +
      "the Cross of Liberty with swords and laurel, an augmentation granted for Vaasa’s role as the “white” " +
      "capital during the 1918 civil war.",
    sources: [
      { title: "Vaasan vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Vaasan_vaakuna" },
    ],
  },

  "FI-13": {
    description:
      "Joensuu’s banner of arms, divided into red, white and black by two lines: an embattled (castle-wall) line " +
      "above, for the city’s position near Finland’s eastern border, and a wavy line below, for the Pielisjoki " +
      "river on which it stands. The red-and-black colouring is that of Karelian heraldry. Adopted 1957.",
    sources: [
      { title: "Joensuun vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Joensuun_vaakuna" },
    ],
  },

  "FI-14": {
    description:
      "A red field bearing Oulu’s arms: a golden four-towered castle with blue gates above a salmon on the water. " +
      "The castle recalls Oulu Castle, built in 1590 at the town’s founding site on the Oulujoki, and the salmon " +
      "the river’s great salmon fishery, long the city’s economic mainstay. Adopted 1954.",
    sources: [
      { title: "Oulun vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Oulun_vaakuna" },
    ],
  },

  "FI-17": {
    description:
      "A gold field bearing a crowned black bear’s head — Pori’s emblem since a 17th-century seal, a canting " +
      "reference to the city’s Swedish name Björneborg (“Bear Fortress”). The city is still nicknamed “Bear " +
      "City”; the arms of its founder, Duke John, carried the motto “Deus protector noster”.",
    sources: [
      { title: "Pori — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Pori" },
    ],
  },

  "FI-18": {
    description:
      "A blue field bearing Helsinki’s arms: a golden boat riding silver waves, with a golden crown above it. " +
      "The vessel recalls the arrival of Swedish settlers to found the town by sea in 1550 and its long life as " +
      "a Baltic port; the crown is a mark of honour. Present design by A. W. Rancken, 1951.",
    sources: [
      { title: "Helsingin vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Helsingin_vaakuna" },
    ],
  },

  "FI-19": {
    description:
      "A blue banner of arms bearing a golden letter “A” — a monogram of the Virgin Mary, the city’s patroness — " +
      "flanked and surmounted by four silver fleurs-de-lis. Turku, the oldest city in Finland and its medieval " +
      "capital, has borne this Marian device (from its Swedish name Åbo) since the Middle Ages.",
    sources: [
      { title: "Turku (Finland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/fi-ls853.html" },
    ],
  },

  "FI-AX": {
    description:
      "Mariehamn’s arms: a blue field with a golden anchor, beneath a gold chief bearing three green linden " +
      "leaves. The anchor stands for the town’s seafaring and its great age of sail (Mariehamn was long home to " +
      "one of the world’s last commercial sailing fleets); the linden leaves for the lime-tree-lined esplanades " +
      "that distinguish the town. Confirmed 1951.",
    sources: [
      { title: "Mariehamn — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Mariehamn" },
    ],
  },

  "GB-GI": {
    description:
      "The flag of Gibraltar — a banner of the city’s arms: a white field above a red band, charged with a " +
      "three-towered red castle from whose gate hangs a golden key. Granted by a royal warrant of Queen " +
      "Isabella I of Castile in 1502, the castle stands for the fortress of Gibraltar and the key for its command " +
      "of the strait — “the key to the Mediterranean”. It is the only British Overseas Territory flag that bears " +
      "no Union Jack.",
    sources: [
      { title: "Flag of Gibraltar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Gibraltar" },
    ],
  },

  "GR-B": {
    description:
      "The flag of Thessaloniki: divided vertically white and blue, with a golden disc at the centre bearing the " +
      "likeness of Alexander the Great taken from an ancient coin, and the top edge of the white part drawn as " +
      "battlements for the city’s walls. Alexander’s image ties the city to the Macedonian world into which it " +
      "was founded (c. 315 BC); the present design was adopted in 2006.",
    sources: [
      { title: "Salonica (Municipality, Greece) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gr-mh-tl.html" },
    ],
  },

  "FR-01": {
    description:
      "Bourg-en-Bresse’s banner of arms: party per pale of green and black, with a silver budded cross over all. " +
      "The green and black were granted in 1382 by Amadeus VI of Savoy (the “Green Count”); the silver cross of " +
      "the Order of Saint Maurice was added in the 16th century to mark Bresse’s return to Savoy.",
    sources: [
      { title: "Armoiries de Bourg-en-Bresse — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=1692" },
    ],
  },

  "FR-04": {
    description:
      "Digne-les-Bains’ arms: on blue a golden fleur-de-lis, with a small red cross above, two facing silver " +
      "letters “L” at the sides and a golden “D” below. The fleur-de-lis recalls the counts of Provence of the " +
      "House of Anjou, the cross the town’s bishopric, the “D” stands for Digne and the two “L”s were added under " +
      "King Louis XIV.",
    sources: [
      { title: "Armoiries de Digne-les-Bains — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=2150" },
    ],
  },

  "FR-05": {
    description:
      "A blue-and-yellow vertical bicolour taken from the arms of Gap. The arms — granted by the king in the 17th " +
      "century when the town was walled — show four turrets standing for the shared rule of the city: the two " +
      "roofed towers for the bishop’s (ecclesiastical) power and the two open ones for the civil power.",
    sources: [
      { title: "Drapeaux et armoiries de Gap — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1795:drapeaux-de-gap" },
    ],
  },

  "FR-06": {
    description:
      "Nice’s arms on a white field: a red crowned eagle with lowered wings, perched on a green three-peaked " +
      "mount rising from a silver-and-blue sea. The eagle marks Nice’s allegiance to the House of Savoy (red for " +
      "Amadeus VII, the “Red Count”, under whose protection the city placed itself in 1388); the three hills " +
      "stand for stability, and the sea for Nice’s Mediterranean port. The blazon dates from 1502.",
    sources: [
      { title: "Armoiries de Nice — Provence 7", url: "https://www.provence7.com/portails/identites/armoiries-de-nice/" },
    ],
  },

  "FR-08": {
    description:
      "A blue-yellow-red vertical tricolour of the colours in which Charleville-Mézières was built — blue slate, " +
      "ochre ashlar and red brick — also drawn from the city arms. Those arms join the older arms of Charleville " +
      "(with the sun of the Gonzaga dukes who founded the town) and of Mézières, the two towns having merged in " +
      "1966.",
    sources: [
      { title: "Drapeau de Charleville-Mézières — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1054:drapeau-de-charleville-mezieres" },
    ],
  },

  "FR-09": {
    description:
      "The arms of the Counts of Foix: gold with three red pallets. They are a cadency of the four red pallets of " +
      "the counts of Barcelona and kings of Aragon — the Foix line claimed descent from Barcelona as a junior " +
      "branch, and so bore three pallets instead of four. The arms are attested from the 12th century, among the " +
      "oldest in France.",
    sources: [
      { title: "Comté de Foix — Héraldique européenne", url: "http://www.heraldique.org/2011/07/provinces-de-france-comte-de-foix.html" },
    ],
  },

  "FR-13": {
    description:
      "The flag of Marseille: a silver (white) field bearing an azure cross — “d’argent à la croix d’azur”, " +
      "attested since the 13th century. Tradition traces the blue cross to the banner flown over Marseille’s " +
      "harbour in the crusading age to mark it a safe haven for pilgrims bound for the Holy Land; the blue is " +
      "that of the House of Anjou, which then ruled Provence.",
    sources: [
      { title: "Armoiries de Marseille — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Marseille" },
    ],
  },

  "FR-18": {
    description:
      "A green-and-red flag in the livery colours of King Charles VII, who made Bourges his capital during the " +
      "Hundred Years’ War (the “King of Bourges”). His livery was green, white and red, and he granted two of " +
      "those colours to his loyal city. The city arms proper show three silver rams — for the Berry wool and " +
      "cloth trade — beneath a blue chief of three golden fleurs-de-lis marking Berry as a royal apanage.",
    sources: [
      { title: "Drapeaux de Bourges — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=98" },
      { title: "Bourges — Armes et devise (Ville de Bourges)", url: "https://www.ville-bourges.fr/site/la-ville_armes-devise" },
    ],
  },

  "FR-21": {
    description:
      "Dijon’s arms: a plain red field — the city’s oldest arms — beneath a divided chief granted by Duke Philip " +
      "the Bold in 1391 for the city’s loyalty. The chief joins modern Burgundy (blue strewn with golden " +
      "fleurs-de-lis, for the Valois dukes close to the French crown) and ancient Burgundy (bendy gold and blue, " +
      "for the earlier Capetian ducal house that made Dijon its seat).",
    sources: [
      { title: "Dijon — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=4034" },
    ],
  },

  "FR-22": {
    description:
      "Saint-Brieuc’s arms: on blue a golden griffin, armed, beaked and tongued red. The griffin — joining the " +
      "lion’s courage to the eagle’s vigilance — stands for the union of the houses of Penthièvre and Montfort " +
      "in Breton history; the arms were formally granted to the city in 1698.",
    sources: [
      { title: "Saint-Brieuc — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=4196" },
    ],
  },

  "FR-25": {
    description:
      "Besançon’s arms: a black eagle on gold, clutching two red columns across its wings. The eagle marks the " +
      "city as a free imperial city of the Holy Roman Empire (adopted in the late 13th century); the two columns " +
      "recall the ancient columns that once stood on the hill of the citadel and evoke the Pillars of Hercules, " +
      "the personal emblem of Emperor Charles V, who granted the present arms in 1537.",
    sources: [
      { title: "Armoiries de Besançon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Besan%C3%A7on" },
    ],
  },

  "FR-26": {
    description:
      "Valence’s arms: on red a silver cross charged at its centre with a blue tower, with two griffin supporters. " +
      "The cross stands for the city’s ancient bishopric and the tower for comital power — the bishop of Valence " +
      "was also its count — while the griffins carry the motto “Unguibus et rostro” (“with claws and beak”), for " +
      "the city’s tenacious defence.",
    sources: [
      { title: "Valence — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=5236" },
    ],
  },

  "FR-2A": {
    description:
      "A blue-and-white flag in the colours of Ajaccio’s arms: on blue, a silver column crowned, between two " +
      "lions. The column is that of the Colonna family, whose name the device puns on; the Genoese Senate " +
      "granted the arms in 1575, and the original greyhounds were later changed to lions as a mark of the city’s " +
      "growing independence from Genoa.",
    sources: [
      { title: "Drapeaux d’Ajaccio — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1161:drapeaux-dajaccio" },
    ],
  },

  "FR-31": {
    description:
      "A red field bearing the golden Occitan cross of Toulouse — a cross cléchée (its arms pierced like a key’s " +
      "bit), voided, and tipped with twelve “pommettes” (little discs). It is the cross of the Counts of " +
      "Toulouse, appearing on the seal of Raymond VI in 1211 and thereafter the arms of the city and of " +
      "Languedoc; the twelve discs are popularly linked to the twelve months or the twelve Apostles.",
    sources: [
      { title: "Croix occitane — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Croix_occitane" },
    ],
  },

  "FR-33": {
    description:
      "Bordeaux’s arms: a silver castle (the old Grosse-Cloche gate) above a silver crescent on the waves of the " +
      "Garonne, with the leopard of England, beneath a blue chief of golden fleurs-de-lis. The crescent is the " +
      "river’s bend that gives Bordeaux its nickname “Port de la Lune”; the leopard recalls three centuries of " +
      "English rule, and the fleurs-de-lis its return to France in 1453. The motto “Lilia sola regunt lunam, " +
      "undas, castra, leonem” reads the shield — the lilies alone rule the moon, the waves, the fort and the lion.",
    sources: [
      { title: "Blason de Bordeaux — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Bordeaux" },
    ],
  },

  "FR-34": {
    description:
      "Montpellier’s arms: on blue, Our Lady enthroned holding the Christ Child, with the silver letters “A” and " +
      "“M” (Ave Maria) above and, below, a silver shield charged with a red roundel. The Virgin and the blue " +
      "field proclaim the city’s Marian patronage (from 1204); the red roundel is the emblem of the Guilhem " +
      "lords who ruled Montpellier until then.",
    sources: [
      { title: "Montpellier — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=12019" },
    ],
  },

  "FR-35": {
    description:
      "Rennes’ arms: a field paly of silver and black, beneath a silver chief strewn with five black ermine " +
      "spots. The ermine is the emblem of Brittany, marking the city as its historic capital; the black-and-white " +
      "pales are said to recall the wooden palisades that defended Rennes through its many sieges. The design " +
      "dates from 1580, when Rennes became the seat of the Breton parliament.",
    sources: [
      { title: "Rennes — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=13838" },
    ],
  },

  "FR-37": {
    description:
      "Tours’ canting arms: three silver towers (for the name Tours) with red roofs and weathervanes, beneath a " +
      "blue chief of three golden fleurs-de-lis. The fleurs-de-lis mark Tours as a loyal “good town” of the " +
      "French crown; the motto “Sustentant lilia turres” (“the towers uphold the lilies”) expresses that " +
      "fidelity. The towers echo those of the basilica of Saint-Martin.",
    sources: [
      { title: "Tours — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=14324" },
    ],
  },

  "FR-38": {
    description:
      "A red-and-yellow flag in the colours of Grenoble’s arms — gold with three red roses. The three roses " +
      "stand for the three powers that governed the medieval city: the bishop, the Dauphin of Viennois, and the " +
      "municipal consuls. The arms were registered in the Armorial général de France in 1698.",
    sources: [
      { title: "Armoiries de Grenoble — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Grenoble" },
    ],
  },

  "FR-39": {
    description:
      "A red-and-gold flag in the colours of Lons-le-Saunier’s arms, which unite the gold-and-red arms of the " +
      "Chalon-Orange princes — to whom the town belonged — with a silver half recalling the salt springs that " +
      "gave the town its name (a “saunier” is a salt-worker), the source of its medieval wealth.",
    sources: [
      { title: "Lons-le-Saunier — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=Lons-le-Saunier" },
    ],
  },

  "FR-42": {
    description:
      "Saint-Étienne’s arms: on blue, two golden palms crossed in saltire with a royal crown above and three " +
      "silver crosses. The palms and crosses recall Saint Stephen (Saint Étienne), the first Christian martyr, " +
      "stoned around AD 36 — the palm being the emblem of martyrdom; the crown marks the townspeople’s wish to " +
      "answer directly to the king, and the blue their attachment to the French crown.",
    sources: [
      { title: "Armoiries — Archives municipales de Saint-Étienne", url: "https://archives.saint-etienne.fr/histoires-stephanoises-1/tranches-dhistoire/histoire-de-la-ville-et-de-son-administration/armoiries" },
    ],
  },

  "FR-43": {
    description:
      "A yellow-and-blue flag in the colours of Le Puy-en-Velay’s arms — blue strewn with golden fleurs-de-lis, " +
      "charged with a silver eagle. The eagle is a canting emblem for Le Puy (from the Latin podium, a raised " +
      "place), said to have been granted by Hugh Capet in 992; the fleurs-de-lis were added by King Louis IX " +
      "(Saint Louis) in 1254.",
    sources: [
      { title: "Armoiries du Puy-en-Velay — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&id=1003:armoiries-du-puy-en-velay" },
    ],
  },

  "FR-44": {
    description:
      "Nantes’ arms: on red, a golden ship dressed with ermine, sailing a green sea of silver waves, beneath an " +
      "ermine chief. The ship stands for the city’s Atlantic and Loire trade; the ermine for the Duchy of " +
      "Brittany, whose capital Nantes was; and the green sea for the Loire. The golden nef took this form after " +
      "the funeral of Anne of Brittany in 1514.",
    sources: [
      { title: "Nantes — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=13894" },
    ],
  },

  "FR-45": {
    description:
      "A yellow-and-red flag in the colours of Orléans’ arms — red with three silver “lily-hearts” beneath a " +
      "blue chief of three golden fleurs-de-lis. The lily-hearts and the royal “chief of France” tie the city to " +
      "the crown; their symbolism is linked to Joan of Arc’s deliverance of Orléans in 1429, and the motto “Hoc " +
      "vernant lilia corde” (“by this heart the lilies flower”) was granted by Louis XII.",
    sources: [
      { title: "Orléans — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=9784" },
    ],
  },

  "FR-47": {
    description:
      "Agen’s arms, party per pale on red: a silver eagle holding a scroll lettered “AGEN”, and a golden " +
      "three-towered castle. The eagle — an imperial emblem — is traditionally linked to the memory of " +
      "Charlemagne, who favoured the Agenais; the castle stands for the town’s fortifications. The arms are " +
      "attested from the 13th century.",
    sources: [
      { title: "Armoiries d’Agen — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=948:armoiries-dagen" },
    ],
  },

  "FR-49": {
    description:
      "Angers’ arms: on red a silver key set upright, beneath a blue chief of two golden fleurs-de-lis. The key " +
      "marks Angers as the chief stronghold of Anjou, guarding the frontier against then-independent Brittany; " +
      "the fleurs-de-lis mark it as a royal apanage. The arms are among the oldest in France, attested in the " +
      "13th century.",
    sources: [
      { title: "Armoiries — Archives patrimoniales de la ville d’Angers", url: "https://archives.angers.fr/aide-memoire/angers-en-dates/emblemes-et-devises/armoiries/index.html" },
    ],
  },

  "FR-56": {
    description:
      "Vannes’ arms: on red a silver ermine passant, collared and leashed. The red recalls the ancient kingdom " +
      "of Bro-Waroch of which Vannes was the capital; the ermine is the emblem of Brittany, popularised by Duke " +
      "John IV, who founded the chivalric Order of the Ermine at Vannes in 1381 with the motto “À ma vie”.",
    sources: [
      { title: "Blason de Vannes — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Vannes" },
    ],
  },

  "FR-57": {
    description:
      "Metz’s flag: party per pale of white and black — the “baucent”, the black-and-white banner the burghers " +
      "raised against the noble families and flew as the arms of the Republic of Metz when the city freed itself " +
      "from its bishop in the 13th century. A Messine couplet reads the colours as white for the life granted to " +
      "the good and black for the death dealt to the wicked.",
    sources: [
      { title: "Le blason de Metz — Sapiens", url: "https://sapiens-france.fr/blogs/blasons-des-villes-de-france/le-blason-de-metz-signification-et-histoire" },
    ],
  },

  "FR-63": {
    description:
      "Clermont-Ferrand’s arms: on blue, a red cross bordered gold with a golden fleur-de-lis in each quarter. " +
      "The cross and fleurs-de-lis were the arms of the city’s bishop, its lord until the 16th century; the cross " +
      "is often linked to the First Crusade, preached at Clermont by Pope Urban II in 1095, and the fleurs-de-lis " +
      "to the bishopric’s ties to the kings of France.",
    sources: [
      { title: "Clermont-Ferrand — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=6166" },
    ],
  },

  "FR-67": {
    description:
      "Strasbourg’s flag: silver with a red bend. It reverses the bishop’s arms (“de gueules à la bande " +
      "d’argent”) after the burghers’ victory at Hausbergen in 1262, marking the city’s emancipation from its " +
      "bishop and its rise as a free imperial city; the silver field also echoes the town’s Roman name, " +
      "Argentoratum.",
    sources: [
      { title: "Blason de Strasbourg — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Strasbourg" },
    ],
  },

  "FR-68": {
    description:
      "Colmar’s arms: party per pale red and green, with a golden mace set diagonally across the division. The " +
      "mace stands for municipal justice and authority, and puns on the city’s name — Kolben (mace in Alemannic) " +
      "against Columbaria, Colmar’s Latin name; a local legend has Hercules leave his club behind here. Red and " +
      "green have been the city’s civic colours since the late Middle Ages.",
    sources: [
      { title: "L’histoire du blason de Colmar — Ville de Colmar", url: "https://www.colmar.fr/blason" },
    ],
  },

  "FR-69": {
    description:
      "Lyon’s arms: on red a silver lion, beneath a blue chief of three golden fleurs-de-lis. The lion comes from " +
      "the medieval counts of Lyon; the blue “chief of France” with its lilies was granted after Lyon joined the " +
      "kingdom of France (1312), and the arms have stood essentially unchanged for five centuries.",
    sources: [
      { title: "Armoiries de Lyon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Lyon" },
    ],
  },

  "FR-71": {
    description:
      "Mâcon’s arms: on red three silver annulets (rings), beneath a blue chief of three golden fleurs-de-lis. " +
      "The blue chief strewn with royal lilies is the “chief of France”, a mark of honour tying the city to the " +
      "French crown.",
    sources: [
      { title: "Armoiries de Mâcon — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1145:armoiries-de-macon" },
    ],
  },

  "FR-73": {
    description:
      "Chambéry’s arms: on red a silver cross — the cross of Savoy — with a golden star in the upper hoist. As " +
      "the historic capital of the Duchy of Savoy, Chambéry bears the dukes’ own arms (the Savoy cross, taken " +
      "from the Order of Saint John under Amadeus V in 1315), “differenced” by the addition of the golden star.",
    sources: [
      { title: "Chambéry — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=5437" },
    ],
  },

  "FR-74": {
    description:
      "A red flag quartered by the white cross of Savoy — the region Annecy belongs to — charged with the silver " +
      "trout that is the town’s own emblem. The trout evokes Lake Annecy and the river Thiou, and the fishing " +
      "that was central to the medieval town’s economy.",
    sources: [
      { title: "Blason d’Annecy : la truite d’argent — Ville d’Annecy", url: "https://www.annecy-ville.fr/2022/12/truite-argent-histoire-armoiries-annecy/" },
    ],
  },

  "FR-83": {
    description:
      "Toulon’s arms: a gold cross on blue. The blue evokes the Mediterranean sky and sea of this great naval " +
      "port; the gold cross is a Christian and crusading emblem, echoing the arms of neighbouring Provençal " +
      "ports such as Marseille and Fréjus. The motto is “Concordia parva crescunt” (“by concord small things " +
      "grow”); the arms are attested from 1494.",
    sources: [
      { title: "Blason de Toulon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Toulon" },
    ],
  },

  "GE-AJ": {
    description:
      "Batumi’s flag: a blue field with three white stripes, bearing the city arms — a shield divided by a wavy " +
      "line, with three golden bezants (coins) on red above a silver base. The bezants stand for trade and the " +
      "wavy line and crossed anchors for Batumi’s life as Georgia’s chief Black Sea port on the coast of Adjara.",
    sources: [
      { title: "Batumi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-batu.html" },
    ],
  },

  "GE-IM": {
    description:
      "Kutaisi’s flag: quartered green and blue, with a large golden Georgian cross patty in the centre and a " +
      "small one in each quarter. Gold stands for nobility, green for freedom and hope, blue for greatness; the " +
      "colours come from Vakhushti Bagrationi’s 18th-century arms for Imereti, and the blue also recalls the sea " +
      "by which the Argonauts reached ancient Colchis, whose capital Aia is identified with Kutaisi. Adopted 2009.",
    sources: [
      { title: "Kutaisi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-kuta.html" },
    ],
  },

  "GE-KA": {
    description:
      "Telavi’s flag: divided red over blue with a white winged horse across it. The horse is Merani, the " +
      "mythical steed of the Romantic poet Nikoloz Baratashvili’s poem — a Georgian Pegasus symbolising freedom " +
      "and the soaring spirit. Telavi is the heart of Kakheti, Georgia’s “Wine Land”, whose vineyards its arms " +
      "also celebrate. Adopted 2011.",
    sources: [
      { title: "Telavi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-tela.html" },
    ],
  },

  "GE-MM": {
    description:
      "Mtskheta’s flag reverses the national five-cross flag — a red field with a white Georgian cross patty " +
      "touching the edges and a smaller white cross in each canton. The Christian crosses befit Mtskheta, the " +
      "ancient royal and spiritual capital of Georgia where Saint Nino brought Christianity and the country was " +
      "baptised in the 4th century.",
    sources: [
      { title: "Mtskheta (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-mtsk.html" },
    ],
  },

  "GE-RL": {
    description:
      "Ambrolauri’s flag: purple over white with a white Georgian cross. The purple stands for the red " +
      "Khvanchkara wine that made this Racha town famous — pressed from the local Aleksandrouli and Mujuretuli " +
      "grapes — and the city arms add the 17th-century Machabeli watchtower of its old centre.",
    sources: [
      { title: "Ambrolauri (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-ambr.html" },
    ],
  },

  "GE-SZ": {
    description:
      "Zugdidi’s flag: quartered blue and purple by a golden cross, with a purple shield at its centre bearing " +
      "the golden Robe of the Most Holy Mother of God over a wavy silver base. The Robe is the venerated relic " +
      "kept at Zugdidi and borne each 2 July to the cathedral; the city was the seat of the Dadiani princes of " +
      "Samegrelo.",
    sources: [
      { title: "Zugdidi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-zugd.html" },
    ],
  },

  "GQ-BN": {
    description:
      "Malabo’s flag bears the colonial-era arms of the city (then Santa Isabel): the Pico de Santa Isabel — the " +
      "great volcanic peak of Bioko above the sea — with the crowned cipher of Queen Isabella II and the city’s " +
      "port, within a border of the castles of Castile and lions of León. The arms were drawn up by the Spanish " +
      "Real Academia de la Historia.",
    sources: [
      { title: "Las armas de la ciudad de Santa Isabel — Doce Linajes de Soria (Ceballos-Escalera)", url: "https://docelinajes.es/2016/05/de-la-heraldica-colonial-las-armas-de-la-ciudad-de-santa-isabel-en-la-guinea-espanola-por-el-dr-d-alfonso-de-ceballos-escalera-y-gila-vizconde-de-ayala/" },
    ],
  },

  "GW-GA": {
    description:
      "Gabú’s arms (under its colonial name Nova Lamego): on red, a silver antique sword with a gold hilt " +
      "flanked by two Fula swords, within a silver border of four Portuguese shields alternating with four red " +
      "crescents. The swords mark the region’s martial tradition and the crescents its Fula, largely Muslim, " +
      "population; the shields the Portuguese administration. Granted 1968.",
    sources: [
      { title: "Concelho de Gabú — Heráldica Cívica", url: "https://www.heraldicacivica.pt/gui-gabu.html" },
    ],
  },

  "GW-OI": {
    description:
      "Farim’s arms: on gold, three black heads each with a red ribbon about the hair, beneath a silver mural " +
      "crown of four towers. The gold field stands for wealth and the three heads for the town’s people; the " +
      "arms were granted in 1968 under Portuguese municipal heraldry.",
    sources: [
      { title: "Concelho de Farim — Heráldica Cívica", url: "https://www.heraldicacivica.pt/gui-farim.html" },
    ],
  },

  "GT-CQ": {
    description:
      "Chiquimula’s flag: white and green, with the departmental arms on the white. White stands for the " +
      "indigenous peoples and the Spanish settlers who shaped its traditions; green for the fertile soils, hills " +
      "and mineral wealth. The arms show the Volcán Ipala with an open book above it — the inhabitants’ openness " +
      "to learning.",
    sources: [
      { title: "Banderas y escudos del oriente — Aprende Guatemala", url: "https://aprende.guatemala.com/cultura-guatemalteca/banderas-de-los-departamentos-del-oriente-de-guatemala/" },
    ],
  },

  "GT-ES": {
    description:
      "Escuintla’s flag: green and white, bearing the city arms. Green stands for the department’s nature — its " +
      "rivers, beaches and wildlife — and white for its people. The arms show a palm tree (Escuintla is “the city " +
      "of palms”), a sixteen-rayed sun for its hot climate, and the Nahuatl name “Izcuintlán” on a green ribbon.",
    sources: [
      { title: "Bandera y escudo de Escuintla — Mundo Chapín", url: "https://mundochapin.com/2018/04/bandera-y-escudo-del-departamento-de-escuintla/66522/" },
    ],
  },

  "GT-GU": {
    description:
      "Guatemala City bears the arms of Santiago de los Caballeros de Guatemala, granted by Queen Joanna in 1532: " +
      "above, Saint James (Santiago) on horseback — the city’s patron — and below, the three volcanoes Agua, " +
      "Fuego (erupting) and Acatenango, with crosses for the country’s evangelisation; the border carries eight " +
      "gold scallop shells, the badge of Saint James’s pilgrims.",
    sources: [
      { title: "Escudo de la ciudad de Guatemala — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_la_ciudad_de_Guatemala" },
    ],
  },

  "GT-HU": {
    description:
      "Huehuetenango’s flag: alternating red and yellow stripes with a stepped pyramid at the centre. The red and " +
      "yellow recall the Guatemalan national flags of 1851–71; the pyramid is the ruins of Zaculeu, the shrine " +
      "and capital of the pre-Columbian Mam Maya kingdom that stood here.",
    sources: [
      { title: "Huehuetenango Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-hu.html" },
    ],
  },

  "GT-IZ": {
    description:
      "Izabal’s flag (its capital is Puerto Barrios): green, white and blue, with the arms on the white. Green is " +
      "for the fertile, mineral-rich land, white for peace, and blue for the department’s waters — Lake Izabal " +
      "and its rivers. The arms are shaped like a ship’s wheel for the region’s ports, enclosing a ship, an " +
      "aeroplane, a lorry and the interoceanic railway that linked Puerto Barrios to the Pacific.",
    sources: [
      { title: "Bandera y escudo de Izabal — Mundo Chapín", url: "https://mundochapin.com/2018/06/bandera-y-escudo-del-departamento-de-izabal/75658/" },
    ],
  },

  "GT-JA": {
    description:
      "Jalapa’s flag: red, yellow and green, with the arms at the centre. Red recalls the Santa Marta earthquake, " +
      "yellow the department’s volcanoes, green its forests. The arms show a green mountain (the volcanoes), a " +
      "ploughed field for its farming, a hoe with laurel for triumph and olive branches for peace, and seven " +
      "golden stars for the seven municipalities.",
    sources: [
      { title: "Bandera y escudo de Jalapa — Mundo Chapín", url: "https://mundochapin.com/2019/01/bandera-y-escudo-del-departamento-de-jalapa/88983/" },
    ],
  },

  "GT-JU": {
    description:
      "Jutiapa’s flag: a white field with the arms at the centre. White stands for the department’s history and " +
      "its Maya, Garífuna and Xinca peoples. The arms show the Cerro de la Cruz above a green valley of crops for " +
      "its fertile fields, with books and a horn of plenty and a rising sun for its steady development, ringed by " +
      "laurel for triumph.",
    sources: [
      { title: "Bandera y escudo de Jutiapa — Mundo Chapín", url: "https://mundochapin.com/2019/04/bandera-y-escudo-de-jutiapa/88989/" },
    ],
  },

  "GT-PE": {
    description:
      "Petén’s flag (its capital, Flores, sits on an island in Lake Petén Itzá): green, white and sky-blue. Green " +
      "is hope and the forest, white purity and peace, sky-blue the lakes, justice and loyalty. The arms show a " +
      "Maya pyramid for the ruins of Tikal and El Mirador, Lake Petén Itzá, and coffee and palm plants for the " +
      "land’s fertility. Adopted 1998.",
    sources: [
      { title: "Símbolos Patrios de Petén — simbolospatrios.org", url: "https://simbolospatrios.org/guatemala/peten/" },
    ],
  },

  "GT-QZ": {
    description:
      "Quetzaltenango’s flag: blue, white and red. Blue stands for the department’s springs, lagoons and rivers " +
      "and for freedom; white for its K’iche’ and Mam peoples and for peace; red for valour. The flag recalls the " +
      "short-lived State of Los Altos, of which Quetzaltenango was the capital until 1840; its arms bear the " +
      "Quetzal and the Santa María volcano.",
    sources: [
      { title: "Bandera y escudo de Quetzaltenango — Mundo Chapín", url: "https://mundochapin.com/2019/03/bandera-y-escudo-de-quetzaltenango/88995/" },
    ],
  },

  "GT-SA": {
    description:
      "Antigua Guatemala bears the arms of Santiago de los Caballeros — the same granted by Queen Joanna in 1532 " +
      "and shared with the modern capital, since Antigua was the country’s capital until an earthquake destroyed " +
      "it in 1773. Saint James rides above the three volcanoes Agua, Fuego and Acatenango, within a border of the " +
      "gold scallop shells of Saint James’s pilgrims.",
    sources: [
      { title: "Escudo de armas de la Ciudad de Guatemala y Antigua Guatemala — Aprende Guatemala", url: "https://aprende.guatemala.com/cultura-guatemalteca/general/escudo-de-armas-de-la-ciudad-de-guatemala-antigua-guatemala/" },
    ],
  },

  "GT-SM": {
    description:
      "San Marcos’s flag: green, yellow and red, with the arms on the yellow. Green stands for its ecosystems and " +
      "the volcanoes Tajumulco and Tacaná, yellow for its mineral soils, tropical coast and beaches, and red for " +
      "the labour of the ancestors who founded its settlements. The arms show a green volcano on a sky-blue field " +
      "for those two peaks.",
    sources: [
      { title: "Bandera y escudo de San Marcos — Mundo Chapín", url: "https://mundochapin.com/2019/02/bandera-y-escudo-de-san-marcos/89012/" },
    ],
  },

  "GT-SO": {
    description:
      "Sololá’s flag: green and yellow, with the arms on the yellow. Green stands for the department’s diverse " +
      "nature and yellow for its riches and its indigenous traditions. The arms picture Lake Atitlán with its " +
      "volcanoes (Tolimán, Atitlán and San Pedro), a green valley, a village and a figure of its people, ringed " +
      "with the words “Sololá, tierra del paisaje” (“Sololá, land of the landscape”).",
    sources: [
      { title: "Símbolos Patrios de Sololá — simbolospatrios.org", url: "https://simbolospatrios.org/guatemala/solola/" },
    ],
  },

  "HN-CM": {
    description:
      "A yellow flag bearing Comayagua’s colonial arms, centred on the black double-headed eagle of the " +
      "Habsburgs. Comayagua — founded as Nueva Valladolid — was the first capital of Honduras and received its " +
      "arms under the Spanish crown; the imperial eagle marks that Habsburg heritage of the colonial city.",
    sources: [
      { title: "Escudos españoles de ciudades hispanoamericanas — La América Española", url: "https://laamericaespanyola.com/2025/05/29/escudos-espanoles-de-ciudades-hispanoamericanas/" },
    ],
  },

  "HN-CR": {
    description:
      "San Pedro Sula’s flag bears interlocking gears and a thrush (zorzal). The gears stand for the union of the " +
      "city’s energies driving its development — San Pedro Sula is Honduras’s industrial capital — and the " +
      "thrush for the cheerful, warm spirit of its people.",
    sources: [
      { title: "Significado del Escudo de San Pedro Sula", url: "http://patronatodelbarrio-riodepiedras.blogspot.com/2008/01/escudo-de-san-pedro-sula-honduras.html" },
    ],
  },

  "HN-FM": {
    description:
      "Tegucigalpa’s flag (also used by the department of Francisco Morazán): blue over yellow with two white " +
      "stars. The arms — designed in 1935 by the Spanish herald Vicente de Cadenas y Vicent — show a silver mine " +
      "and a mill wheel for the city’s colonial silver-mining origins (Tegucigalpa means “silver hill”), with a " +
      "lion for strength and nobility.",
    sources: [
      { title: "Heráldica de Tegucigalpa — heraldica.website", url: "https://heraldica.website/heraldica/heraldica-de-tegucigalpa-simbolos-e-historia-de-la-capital-hondurena/" },
    ],
  },

  "HR-01": {
    description:
      "Zagreb’s flag bears the city arms: on blue, a white three-towered fortress with an open golden gate on a " +
      "green hill, a golden six-pointed star at upper right and a silver crescent at upper left. The hill is " +
      "Gradec, the medieval town; the open gate signifies the hospitality and protectiveness of Zagreb’s people; " +
      "the star and crescent are ancient Slavic symbols (of the deities Lada and Lelj). Adopted in its modern " +
      "form in 1896.",
    sources: [
      { title: "Coat of arms of Zagreb — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Zagreb" },
    ],
  },

  "HR-04": {
    description:
      "Karlovac’s flag bears the city arms, which recall its origin as a star-shaped fortress. The town was built " +
      "from nothing in 1579 by Archduke Charles II of Inner Austria — hence “Karlovac”, Charles’s town — as a " +
      "six-pointed star fort guarding the Habsburg lands against the Ottomans, a geometric plan still legible in " +
      "the old town today.",
    sources: [
      { title: "Karlovac — Wikipedia", url: "https://en.wikipedia.org/wiki/Karlovac" },
    ],
  },

  "HR-08": {
    description:
      "Rijeka’s flag bears the city arms: a black double-headed eagle standing on a rock, holding a jug from " +
      "which water pours endlessly into the sea. “Rijeka” means “river”, and the flowing water is the Rječina on " +
      "which the city stands, under the motto “Indeficienter” (“inexhaustibly”); the imperial eagle and arms were " +
      "granted by Emperor Leopold I in 1659.",
    sources: [
      { title: "Rijeka’s two-headed eagle — Rijeka 2020", url: "https://rijeka2020.eu/en/rijekas-two-headed-eagle/" },
    ],
  },

  // ── Johor Bahru — capital of the state of Johor, Malaysia ───────────────────
  "MY-01": {
    description:
      "The flag of the Johor Bahru City Council (Majlis Bandaraya Johor Bahru): a horizontal tricolour " +
      "of red over white over blue, with a yellow crescent and five-pointed star centred on the white " +
      "band. The crescent and star are the emblem of Islam, the state religion of Johor, whose capital " +
      "the city is.",
    sources: [
      {
        title: "Johor Bahru City Council (Johore, Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-j-jbc.html",
      },
      {
        title: "Flag and coat of arms of Johor — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Johor",
      },
    ],
  },

  // ── George Town — capital of the state of Penang, Malaysia ──────────────────
  "MY-07": {
    description:
      "A white field bearing the arms of the Penang Island City Council. The areca-nut palm on the crest " +
      "refers to the origin of the island’s name — Pulau Pinang, “areca-nut palm island”; the wavy " +
      "blue-and-white lines are the seas around the island, five of each for the five principles of " +
      "Malaysia’s national philosophy (the Rukun Negara) and Penang’s five administrative districts; two " +
      "dolphins support the shield, under the motto “Memimpin Sambil Berkhidmat” (“Leading We Serve”).",
    sources: [
      {
        title: "Coat of arms of Penang — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Penang",
      },
    ],
  },

  // ── Ipoh — capital of the state of Perak, Malaysia ──────────────────────────
  "MY-08": {
    description:
      "A flag bearing the arms of the Ipoh City Council. The two tree trunks are the ipoh tree that gave " +
      "the city its name; two tigers, from Malaysia’s federal coat of arms, flank the shield. Within it a " +
      "fortress recalls Kota Dato’ Laksamana, whose builder is held to have founded the first settlement " +
      "at Ipoh; a blue wavy line is the Kinta River that divides Ipoh’s Old and New Towns; a yellow band " +
      "is the limestone hills around the city; a crescent marks Islam as the official religion; and three " +
      "vertical stripes at the base are taken from the flag of Perak, Ipoh’s state.",
    sources: [
      {
        title: "Logo MBI — Ipoh City Council (official)",
        url: "https://www.mbi.gov.my/en/korporat/logo-mbi",
      },
    ],
  },

  // ── Shah Alam — capital of the state of Selangor, Malaysia ──────────────────
  "MY-10": {
    description:
      "A blue field bearing the arms of the Shah Alam City Council (Majlis Bandaraya Shah Alam) at the " +
      "hoist, with a blue-and-white arabesque geometric pattern toward the fly. On the emblem a tiger — " +
      "each animal armed with a spear — stands for the council’s role as the city’s enforcement " +
      "authority, and a deer for loyalty to the Ruler and the nation and readiness to defend Malay " +
      "sovereignty and the Constitution; the orchid is Shah Alam’s official flower, chosen for its " +
      "“Garden City” concept. A crescent and five-pointed star mark Islam as the official religion and " +
      "the sovereignty of the Ruler and nation, the five points recalling the Pillars of Islam, and the " +
      "geometric pattern the council’s core development objectives. Red and yellow are the state colours " +
      "of Selangor; white stands for cleanliness and purity in the council’s service, and blue for calm " +
      "and peace — efficient, precise and friendly service.",
    sources: [
      {
        title: "Logo Rasmi MBSA — Shah Alam City Council (official)",
        url: "https://www.mbsa.gov.my/ms-my/mbsa/kenalimbsa/profil/Halaman/logo_rasmi.aspx",
      },
      {
        title: "Selangor (Shah Alam City Council) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-selan.html",
      },
    ],
  },

  // ── Kuala Terengganu — capital of the state of Terengganu, Malaysia ─────────
  "MY-11": {
    description:
      "A yellow field — the royal colour of Terengganu — with a black canton bearing a white crescent " +
      "and star within a white border. The crescent and star denote Islam, the state religion; the " +
      "black-and-white canton follows the Terengganu state flag, on which white stands for the Sultan " +
      "and black for the subjects he protects.",
    sources: [
      {
        title: "Bendera Terengganu — Wikipedia Bahasa Melayu",
        url: "https://ms.wikipedia.org/wiki/Bendera_Terengganu",
      },
    ],
  },

  // ── Kota Kinabalu — capital of the state of Sabah, Malaysia ─────────────────
  "MY-12": {
    description:
      "A flag bearing Mount Kinabalu — the emblem of the Sabah state government — as a dark-blue " +
      "silhouette on a light-blue canton, above horizontal bands of red, white, yellow and green. In " +
      "Sabah’s flag tradition the red stands for courage and the readiness to sacrifice for the state, " +
      "the white for purity, the yellow for the state’s wealth, and the green for its young land and " +
      "forests.",
    sources: [
      { title: "Flag of Sabah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sabah" },
      { title: "Bendera Sabah — Wikipedia Bahasa Melayu", url: "https://ms.wikipedia.org/wiki/Bendera_Sabah" },
    ],
  },

  // ── Kuala Lumpur — capital of the Federal Territory of Kuala Lumpur and of Malaysia ──
  "MY-14": {
    description:
      "A white field crossed by a broad blue horizontal band through the centre, with three red stripes " +
      "on the white above the band and three on the white below it; in the blue band at the hoist sit a " +
      "yellow crescent and a yellow fourteen-pointed star. Adopted on 14 May 1990 to mark the centenary " +
      "of Kuala Lumpur City Hall (DBKL) as the city’s local authority, it was designed by DBKL architect " +
      "Azmi Ahmad Termizi as a distinct variant of Malaysia’s national flag, the Jalur Gemilang. " +
      "According to the Malaysian Ministry of Information the colours stand for: red — the city’s courage " +
      "and strength; blue — the unity of its multiracial citizens; yellow — sovereignty; and white — " +
      "cleanliness and beauty. The crescent and the fourteen-pointed star are carried over from the " +
      "national flag, where they represent Islam and the unity of the thirteen states with the federal " +
      "government.",
    sources: [
      {
        title: "Flag and coat of arms of Kuala Lumpur — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Kuala_Lumpur",
      },
    ],
  },

  // ── Putrajaya — capital of the Federal Territory of Putrajaya (federal administrative capital) ──
  "MY-16": {
    description:
      "Three vertical bands — blue, a double-width yellow centre, and blue — bearing the coat of arms of " +
      "Malaysia in the yellow band. The blue-and-yellow scheme is that of Malaysia’s Federal Territories, " +
      "in which blue stands for unity, sincerity and harmony and yellow for respect, sovereignty and " +
      "honour (yellow being the royal colour of the Malay rulers). Placing the federal arms — a shield " +
      "upheld by two tigers, ensigned with a yellow crescent and fourteen-pointed federal star above a " +
      "banner reading “Bersekutu Bertambah Mutu” (“Unity is Strength”) — at the flag’s centre marks " +
      "Putrajaya as the nation’s federal administrative capital; the crescent and star again represent " +
      "Islam and the Malay monarchy.",
    sources: [
      {
        title: "Flag of the Federal Territories — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_Territories",
      },
      {
        title: "Coat of arms of Malaysia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Malaysia",
      },
    ],
  },
};
