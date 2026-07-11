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

  // ── Johor Bahru — capital of the state of Johor, Malaysia ───────────────────
  "MY-01": {
    description:
      "A dark-blue field with a red panel bearing a white crescent and a white five-pointed star — the " +
      "flag of the state of Johor, whose capital is Johor Bahru. The crescent denotes Islam and the star " +
      "the state’s sovereign ruler (the Sultan); the red stands for the bravery of the warriors and " +
      "followers who opened and built the state, and the dark blue for the sea.",
    sources: [
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
};
