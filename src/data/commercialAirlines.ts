import type { CommercialAirline } from "../types/airline";

/**
 * Curated and sourced dataset of commercial airlines for Learn mode.
 *
 * Rules:
 * - Every fact (name, IATA, founded, alliance, hubs, fleet composition, logo symbolism)
 *   is verified from reputable and official sources.
 * - Sourced logo explainer details the design, symbolism, and evolution.
 * - Logos are bundled locally under `public/airline-logos/{countryCode}/`.
 */

export const COMMERCIAL_AIRLINES: Record<string, readonly CommercialAirline[]> = {
  // Australia
  AU: [
    {
      id: "au-qantas",
      countryCode: "AU",
      name: "Qantas",
      iata: "QF",
      icao: "QFA",
      founded: 1920,
      alliance: "oneworld",
      hubs: ["Sydney Airport (SYD)", "Melbourne Airport (MEL)", "Brisbane Airport (BNE)"],
      fleet: {
        total: 133,
        summary: "133 aircraft (Airbus A220-300, A321XLR, A330-200, A330-300, A380-800; Boeing 737-800, 787-9)",
      },
      logo: "/airline-logos/au/qantas.svg",
      logoExplainer:
        "The iconic 'Flying Kangaroo' was originally designed in 1944 by Gert Sellheim, adapted from the Australian one-penny coin. Modernised across several design generations (including Massimo Vignelli in 1984 and Houston Group in 2016), the stylized red-and-white kangaroo on the aircraft empennage represents Australian identity, pride, and dynamic forward momentum in flight.",
      sources: [
        "https://www.qantas.com/au/en/about-us/our-company/our-history.html",
        "https://en.wikipedia.org/wiki/Qantas",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "au-jetstar",
      countryCode: "AU",
      name: "Jetstar",
      iata: "JQ",
      icao: "JST",
      founded: 2003,
      alliance: "None",
      hubs: ["Melbourne Airport (MEL)", "Sydney Airport (SYD)", "Brisbane Airport (BNE)", "Gold Coast Airport (OOL)"],
      fleet: {
        total: 83,
        summary: "83 aircraft (Airbus A320-200, A321-200, A321neo / A321LR; Boeing 787-8)",
      },
      logo: "/airline-logos/au/jetstar.svg",
      logoExplainer:
        "Features bold dark-grey typography accompanied by a distinctive bright orange five-pointed star. The orange star symbolizes youthful energy, great value, and the warmth of the Australian sun, echoing the celestial navigation of the Southern Cross.",
      sources: [
        "https://www.jetstar.com/au/en/about-us",
        "https://en.wikipedia.org/wiki/Jetstar",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "au-virgin-australia",
      countryCode: "AU",
      name: "Virgin Australia",
      iata: "VA",
      icao: "VOZ",
      founded: 1999,
      alliance: "None",
      hubs: ["Brisbane Airport (BNE)", "Sydney Airport (SYD)", "Melbourne Airport (MEL)"],
      fleet: {
        total: 96,
        summary: "96 aircraft (Boeing 737-700, 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/au/virgin-australia.svg",
      logoExplainer:
        "Features the internationally recognised red cursive Virgin signature script alongside crisp grey 'Australia' lettering. The fluid handwriting motif reflects Richard Branson's hallmark non-conformist flair, paired with modern Australian warmth and service flair.",
      sources: [
        "https://www.virginaustralia.com/au/en/about-us/",
        "https://en.wikipedia.org/wiki/Virgin_Australia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "au-rex",
      countryCode: "AU",
      name: "Rex Airlines",
      iata: "ZL",
      icao: "RXA",
      founded: 2002,
      alliance: "None",
      hubs: ["Sydney Airport (SYD)", "Melbourne Airport (MEL)", "Brisbane Airport (BNE)", "Adelaide Airport (ADL)"],
      fleet: {
        total: 65,
        summary: "65 aircraft (Saab 340B, Boeing 737-800)",
      },
      logo: "/airline-logos/au/rex.svg",
      logoExplainer:
        "Features vibrant blue, warm yellow, and red diagonal speed ribbons streaming behind the bold navy 'Rex' wordmark (short for Regional Express), symbolizing vital transport lifelines connecting regional and outback communities with Australia's capital cities.",
      sources: [
        "https://www.rex.com.au/AboutRex/OurCompany/Default.aspx",
        "https://en.wikipedia.org/wiki/Rex_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Malaysia
  MY: [
    {
      id: "my-malaysia-airlines",
      countryCode: "MY",
      name: "Malaysia Airlines",
      iata: "MH",
      icao: "MAS",
      founded: 1947,
      alliance: "oneworld",
      hubs: ["Kuala Lumpur International Airport (KUL)", "Kota Kinabalu International Airport (BKI)", "Kuching International Airport (KCH)"],
      fleet: {
        total: 80,
        summary: "80 aircraft (Airbus A330-200, A330-300, A330-900neo, A350-900; Boeing 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/my/malaysia-airlines.svg",
      logoExplainer:
        "Depicts the traditional Malaysian 'Wau Bulan' (moon kite), a moon-shaped kite hailing from the state of Kelantan. Adopted in 1971 and refined into sweeping red and blue aerodynamic ribbons, the Wau Bulan embodies graceful, soaring flight, balance, and deep-rooted Malaysian cultural heritage.",
      sources: [
        "https://www.malaysiaairlines.com/my/en/about-us.html",
        "https://en.wikipedia.org/wiki/Malaysia_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "my-airasia",
      countryCode: "MY",
      name: "AirAsia",
      iata: "AK",
      icao: "AXM",
      founded: 1993,
      alliance: "None",
      hubs: ["Kuala Lumpur International Airport (Terminal 2 - KUL)", "Kota Kinabalu (BKI)", "Penang (PEN)", "Kuching (KCH)"],
      fleet: {
        total: 105,
        summary: "105 aircraft (Airbus A320-200, A320neo, A321neo)",
      },
      logo: "/airline-logos/my/airasia.svg",
      logoExplainer:
        "The bright crimson disc with bold, unpretentious white cursive script forms one of the most recognisable emblems in Southeast Asia. Designed to reflect warmth, passion, and accessibility, it anchors the airline's revolutionary ethos 'Now Everyone Can Fly'.",
      sources: [
        "https://www.airasia.com/aboutus/en/gb/index.html",
        "https://en.wikipedia.org/wiki/AirAsia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "my-batik-air-malaysia",
      countryCode: "MY",
      name: "Batik Air Malaysia",
      iata: "OD",
      icao: "MXD",
      founded: 2012,
      alliance: "None",
      hubs: ["Kuala Lumpur International Airport (KUL)", "Sultan Abdul Aziz Shah Airport (SZB - Subang)"],
      fleet: {
        total: 38,
        summary: "38 aircraft (Boeing 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/my/batik-air-malaysia.svg",
      logoExplainer:
        "Features intricate Malay and Indonesian wax-resist Batik textile motifs in royal crimson, golden yellow, and white. The geometric motif celebrates the shared traditional textile art of the Nusantara archipelago.",
      sources: [
        "https://www.malindoair.com/about-us",
        "https://en.wikipedia.org/wiki/Batik_Air_Malaysia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "my-firefly",
      countryCode: "MY",
      name: "Firefly",
      iata: "FY",
      icao: "FFM",
      founded: 2007,
      alliance: "None",
      hubs: ["Sultan Abdul Aziz Shah Airport (SZB - Subang)", "Penang International Airport (PEN)", "Kota Kinabalu (BKI)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (ATR 72-500, Boeing 737-800)",
      },
      logo: "/airline-logos/my/firefly.svg",
      logoExplainer:
        "Displays an abstract orange insect wing radiating friendly, luminous yellow and orange light, evoking the warmth and community-oriented nature of short-hop regional travel in Peninsular Malaysia.",
      sources: [
        "https://www.fireflyz.com.my/about-us",
        "https://en.wikipedia.org/wiki/Firefly_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Brazil
  BR: [
    {
      id: "br-latam-brasil",
      countryCode: "BR",
      name: "LATAM Brasil",
      iata: "LA",
      icao: "TAM",
      founded: 1961,
      alliance: "None",
      hubs: ["São Paulo/Guarulhos (GRU)", "Brasília (BSB)", "São Paulo/Congonhas (CGH)", "Rio de Janeiro/Galeão (GIG)"],
      fleet: {
        total: 150,
        summary: "150 aircraft (Airbus A319, A320, A320neo, A321, A321neo; Boeing 767-300ER, 777-300ER, 787-9)",
      },
      logo: "/airline-logos/br/latam-brasil.svg",
      logoExplainer:
        "Represents a stylized ribbon contour tracing the geographical silhouette of the South American continent. Rendered in deep indigo and coral red, it symbolizes the united strength of Latin America linking with global destinations.",
      sources: [
        "https://www.latamairlines.com/br/pt/conheca-nos",
        "https://en.wikipedia.org/wiki/LATAM_Brasil",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "br-gol",
      countryCode: "BR",
      name: "Gol Linhas Aéreas",
      iata: "G3",
      icao: "GLO",
      founded: 2000,
      alliance: "None",
      hubs: ["São Paulo/Guarulhos (GRU)", "Brasília (BSB)", "Rio de Janeiro/Galeão (GIG)", "Salvador (SSA)"],
      fleet: {
        total: 140,
        summary: "140 aircraft (Boeing 737-700, 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/br/gol.svg",
      logoExplainer:
        "Consists of two interlocking, infinity-like orange rings forming the letter 'O' in the bold typography 'GOL'. The warm orange hue symbolizes Brazilian passion, energy, and connectivity, playing on the triumphant soccer cheer 'Gol!'.",
      sources: [
        "https://www.voegol.com.br/sobre-a-gol/nossa-historia",
        "https://en.wikipedia.org/wiki/Gol_Transportes_A%C3%A9reos",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "br-azul",
      countryCode: "BR",
      name: "Azul Brazilian Airlines",
      iata: "AD",
      icao: "AZU",
      founded: 2008,
      alliance: "None",
      hubs: ["Campinas/Viracopos (VCP)", "Belo Horizonte/Confins (CNF)", "Recife (REC)"],
      fleet: {
        total: 170,
        summary: "170 aircraft (Airbus A320neo, A321neo, A330-200, A330-900neo; Embraer E195, E195-E2; ATR 72-600)",
      },
      logo: "/airline-logos/br/azul.svg",
      logoExplainer:
        "Features a distinctive mosaic map of Brazil formed by multi-coloured geometric squares in varying tones of blue, yellow, and green, celebrating Brazil's immense geographical diversity, regional pride, and vibrant culture.",
      sources: [
        "https://www.voeazul.com.br/br/pt/sobre-a-azul/nossa-historia",
        "https://en.wikipedia.org/wiki/Azul_Brazilian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "br-voepass",
      countryCode: "BR",
      name: "Voepass Linhas Aéreas",
      iata: "2Z",
      icao: "PTB",
      founded: 1995,
      alliance: "None",
      hubs: ["Ribeirão Preto (RAO)", "São Paulo/Congonhas (CGH)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (ATR 42, ATR 72-500, ATR 72-600)",
      },
      logo: "/airline-logos/br/voepass.png",
      logoExplainer:
        "A gradient yellow-and-green wing swoosh symbolizing the bird in flight (passaredo), reflecting regional connectivity throughout the agricultural and industrial interior of Brazil.",
      sources: [
        "https://www.voepass.com.br",
        "https://en.wikipedia.org/wiki/Voepass_Linhas_A%C3%A9reas",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Indonesia
  ID: [
    {
      id: "id-garuda-indonesia",
      countryCode: "ID",
      name: "Garuda Indonesia",
      iata: "GA",
      icao: "GIA",
      founded: 1949,
      alliance: "SkyTeam",
      hubs: ["Soekarno–Hatta International Airport (CGK - Jakarta)", "I Gusti Ngurah Rai International Airport (DPS - Bali)", "Sultan Hasanuddin International Airport (UPG - Makassar)", "Kualanamu International Airport (KNO - Medan)"],
      fleet: {
        total: 75,
        summary: "75 aircraft (Airbus A330-200, A330-300, A330-900neo; Boeing 737-800, 777-300ER)",
      },
      logo: "/airline-logos/id/garuda-indonesia.svg",
      logoExplainer:
        "The mythical eagle Garuda, the national emblem of Indonesia, is stylized into five ascending wing feathers in rich cyan, turquoise, and navy blue. Designed by Landor Associates in 1985 and refined in 2009, the feathers symbolize the five foundational principles of the Indonesian state (Pancasila) and boundless trans-oceanic flight.",
      sources: [
        "https://www.garuda-indonesia.com/id/en/corporate-partners/our-history",
        "https://en.wikipedia.org/wiki/Garuda_Indonesia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "id-lion-air",
      countryCode: "ID",
      name: "Lion Air",
      iata: "JT",
      icao: "LNI",
      founded: 1999,
      alliance: "None",
      hubs: ["Soekarno–Hatta (CGK)", "Surabaya/Juanda (SUB)", "Makassar (UPG)", "Medan (KNO)"],
      fleet: {
        total: 110,
        summary: "110 aircraft (Boeing 737-800, 737-900ER; Airbus A330-300, A330-900neo)",
      },
      logo: "/airline-logos/id/lion-air.svg",
      logoExplainer:
        "A winged red lion head enclosed in a gold-and-red wing wreath, symbolizing courage, swift power, and the mission to connect Indonesia's thousands of islands under the banner 'We Make People Fly'.",
      sources: [
        "https://www.lionair.co.id",
        "https://en.wikipedia.org/wiki/Lion_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "id-batik-air",
      countryCode: "ID",
      name: "Batik Air",
      iata: "ID",
      icao: "BTK",
      founded: 2013,
      alliance: "None",
      hubs: ["Soekarno–Hatta (CGK)", "Halim Perdanakusuma (HLP)", "Makassar (UPG)"],
      fleet: {
        total: 70,
        summary: "70 aircraft (Airbus A320-200, A320neo; Boeing 737-800)",
      },
      logo: "/airline-logos/id/batik-air.svg",
      logoExplainer:
        "Combines traditional Indonesian batik wax-resist patterns in warm red, crimson, and gold, honoring centuries of Indonesian UNESCO intangible cultural heritage and artisanal mastery.",
      sources: [
        "https://www.batikair.com",
        "https://en.wikipedia.org/wiki/Batik_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "id-citilink",
      countryCode: "ID",
      name: "Citilink",
      iata: "QG",
      icao: "CTV",
      founded: 2001,
      alliance: "None",
      hubs: ["Soekarno–Hatta (CGK)", "Surabaya/Juanda (SUB)", "Halim Perdanakusuma (HLP)"],
      fleet: {
        total: 55,
        summary: "55 aircraft (Airbus A320-200, A320neo; ATR 72-600)",
      },
      logo: "/airline-logos/id/citilink.svg",
      logoExplainer:
        "A bright lime-green and forest-green swoosh evoking bird plumage and fresh vitality, representing accessible, youthful, and punctual low-cost air travel across the Indonesian archipelago.",
      sources: [
        "https://www.citilink.co.id/en/about-citilink",
        "https://en.wikipedia.org/wiki/Citilink",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "id-super-air-jet",
      countryCode: "ID",
      name: "Super Air Jet",
      iata: "IU",
      icao: "SJV",
      founded: 2021,
      alliance: "None",
      hubs: ["Soekarno–Hatta International Airport (CGK)"],
      fleet: {
        total: 60,
        summary: "60 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/id/super-air-jet.svg",
      logoExplainer:
        "Modern gold, khaki, and red wings paired with minimalist typography, tailored to resonate with next-generation millennial and Gen Z travelers seeking streamlined modern air travel.",
      sources: [
        "https://www.superairjet.com",
        "https://en.wikipedia.org/wiki/Super_Air_Jet",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "id-indonesia-airasia",
      countryCode: "ID",
      name: "Indonesia AirAsia",
      iata: "QZ",
      icao: "AWQ",
      founded: 1999,
      alliance: "None",
      hubs: ["Soekarno–Hatta (CGK)", "I Gusti Ngurah Rai (DPS - Bali)", "Surabaya (SUB)", "Medan (KNO)"],
      fleet: {
        total: 32,
        summary: "32 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/id/indonesia-airasia.svg",
      logoExplainer:
        "The signature bright red circular badge with white script lettering, providing cohesive regional branding for AirAsia's Indonesian operations connecting domestic and ASEAN destinations.",
      sources: [
        "https://www.airasia.com",
        "https://en.wikipedia.org/wiki/Indonesia_AirAsia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Japan
  JP: [
    {
      id: "jp-ana",
      countryCode: "JP",
      name: "All Nippon Airways (ANA)",
      iata: "NH",
      icao: "ANA",
      founded: 1952,
      alliance: "Star Alliance",
      hubs: ["Tokyo Haneda Airport (HND)", "Tokyo Narita Airport (NRT)", "Osaka Kansai (KIX)", "Osaka Itami (ITM)"],
      fleet: {
        total: 215,
        summary: "215 aircraft (Boeing 737-800, 767-300ER, 777-200, 777-300ER, 787-8, 787-9, 787-10; Airbus A320neo, A321neo, A380-800)",
      },
      logo: "/airline-logos/jp/ana.svg",
      logoExplainer:
        "The 'Inspiration of Japan' emblem features bold navy blue ANA lettering alongside dual diagonal stripes in navy and light blue ('Triton blue' and 'Mohican blue'). The stripes symbolize the blue sky, the open sea, and the forward-looking precision of Japanese aviation.",
      sources: [
        "https://www.ana.co.jp/group/en/about-us/",
        "https://en.wikipedia.org/wiki/All_Nippon_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "jp-jal",
      countryCode: "JP",
      name: "Japan Airlines (JAL)",
      iata: "JL",
      icao: "JAL",
      founded: 1951,
      alliance: "oneworld",
      hubs: ["Tokyo Haneda Airport (HND)", "Tokyo Narita Airport (NRT)", "Osaka Kansai (KIX)", "Osaka Itami (ITM)"],
      fleet: {
        total: 150,
        summary: "150 aircraft (Airbus A350-900, A350-1000; Boeing 737-800, 767-300ER, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/jp/jal.svg",
      logoExplainer:
        "The legendary 'Tsurumaru' (crane circle) depicts a red Japanese crane (tancho) with wings arched into a perfect circle. Originally created in 1959 by Jerry Huff and reinstated in 2011, the crane embodies longevity, noble grace, devotion, and hospitality in classical Japanese culture.",
      sources: [
        "https://www.jal.com/en/outline/history.html",
        "https://en.wikipedia.org/wiki/Japan_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "jp-peach",
      countryCode: "JP",
      name: "Peach Aviation",
      iata: "MM",
      icao: "APJ",
      founded: 2011,
      alliance: "None",
      hubs: ["Osaka Kansai (KIX)", "Tokyo Narita (NRT)", "Naha/Okinawa (OKA)", "Fukuoka (FUK)"],
      fleet: {
        total: 36,
        summary: "36 aircraft (Airbus A320-200, A320neo, A321LR)",
      },
      logo: "/airline-logos/jp/peach.svg",
      logoExplainer:
        "Vibrant fuchsia, magenta, and white styling with rounded lettering, reflecting playful cheerfulness, youthful approachability, and the delicious sweet fruit associated with good fortune and vitality in East Asia.",
      sources: [
        "https://www.flypeach.com/en/corporate",
        "https://en.wikipedia.org/wiki/Peach_Aviation",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "jp-skymark",
      countryCode: "JP",
      name: "Skymark Airlines",
      iata: "BC",
      icao: "SKY",
      founded: 1996,
      alliance: "None",
      hubs: ["Tokyo Haneda (HND)", "Kobe Airport (UKB)"],
      fleet: {
        total: 29,
        summary: "29 aircraft (Boeing 737-800)",
      },
      logo: "/airline-logos/jp/skymark.svg",
      logoExplainer:
        "A crisp, bright yellow star set upon a dark navy field alongside clean modern serif typography, evoking celestial starlight guiding voyagers safely across the night sky.",
      sources: [
        "https://www.skymark.co.jp/en/company/",
        "https://en.wikipedia.org/wiki/Skymark_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United States
  US: [
    {
      id: "us-delta",
      countryCode: "US",
      name: "Delta Air Lines",
      iata: "DL",
      icao: "DAL",
      founded: 1925,
      alliance: "SkyTeam",
      hubs: ["Atlanta (ATL)", "Detroit (DTW)", "Minneapolis/St. Paul (MSP)", "Salt Lake City (SLC)", "New York (JFK/LGA)", "Los Angeles (LAX)", "Seattle (SEA)", "Boston (BOS)"],
      fleet: {
        total: 980,
        summary: "980 aircraft (Airbus A220, A321, A330, A350; Boeing 717, 737, 757, 767)",
      },
      logo: "/airline-logos/us/delta.svg",
      logoExplainer:
        "The iconic red geometric 'Widget' emblem, created in 1959 by Robert Bragg of Burke Dowling Adams, mirrors the swept-wing configuration of early jetliner wings and the Greek letter Delta (Δ), paying homage to the airline's historic roots in the Mississippi Delta.",
      sources: [
        "https://news.delta.com/bio/history",
        "https://en.wikipedia.org/wiki/Delta_Air_Lines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-american",
      countryCode: "US",
      name: "American Airlines",
      iata: "AA",
      icao: "AAL",
      founded: 1926,
      alliance: "oneworld",
      hubs: ["Dallas/Fort Worth (DFW)", "Charlotte (CLT)", "Miami (MIA)", "Chicago O'Hare (ORD)", "Philadelphia (PHL)", "Phoenix (PHX)", "Washington National (DCA)", "New York (JFK/LGA)", "Los Angeles (LAX)"],
      fleet: {
        total: 970,
        summary: "970 aircraft (Airbus A319, A320, A321; Boeing 737-800, 737 MAX 8, 777-200ER, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/us/american.svg",
      logoExplainer:
        "The 'Flight Symbol', unveiled in January 2013 and designed by FutureBrand, modernises the airline's historic soaring eagle emblem into an abstract diagonal wing and tail fin rendered in the patriotic red, white, and blue of the American flag.",
      sources: [
        "https://www.aa.com/i18n/customer-service/about-us/history-of-american-airlines.jsp",
        "https://en.wikipedia.org/wiki/American_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-united",
      countryCode: "US",
      name: "United Airlines",
      iata: "UA",
      icao: "UAL",
      founded: 1926,
      alliance: "Star Alliance",
      hubs: ["Chicago O'Hare (ORD)", "Denver (DEN)", "Houston (IAH)", "Newark (EWR)", "San Francisco (SFO)", "Washington Dulles (IAD)", "Los Angeles (LAX)", "Guam (GUM)"],
      fleet: {
        total: 960,
        summary: "960 aircraft (Airbus A319, A320, A321neo; Boeing 737, 757, 767, 777, 787)",
      },
      logo: "/airline-logos/us/united.svg",
      logoExplainer:
        "Features the classic blue wireframe globe logo originally designed for Continental Airlines by Lippincott in 1991, adopted by United in the 2010 merger. It symbolizes comprehensive global reach, seamless international transit, and worldwide unity.",
      sources: [
        "https://www.united.com/en/us/fly/company/history.html",
        "https://en.wikipedia.org/wiki/United_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-southwest",
      countryCode: "US",
      name: "Southwest Airlines",
      iata: "WN",
      icao: "SWA",
      founded: 1967,
      alliance: "None",
      hubs: ["Dallas Love Field (DAL)", "Chicago Midway (MDW)", "Denver (DEN)", "Las Vegas (LAS)", "Baltimore (BWI)", "Phoenix (PHX)", "Orlando (MCO)", "Houston Hobby (HOU)"],
      fleet: {
        total: 820,
        summary: "820 aircraft (Boeing 737-700, 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/us/southwest.svg",
      logoExplainer:
        "The 'Southwest Heart' emblem, introduced in 2014 by Lippincott, displays three colorful diagonal stripes—Bold Blue, Warm Red, and Sunrise Yellow—forming a heart symbol. It honors the company's customer-centric spirit and home base at Dallas Love Field.",
      sources: [
        "https://www.southwest.com/about-southwest/",
        "https://en.wikipedia.org/wiki/Southwest_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-alaska",
      countryCode: "US",
      name: "Alaska Airlines",
      iata: "AS",
      icao: "ASA",
      founded: 1932,
      alliance: "oneworld",
      hubs: ["Seattle–Tacoma (SEA)", "Anchorage (ANC)", "Portland (PDX)", "San Francisco (SFO)", "Los Angeles (LAX)"],
      fleet: {
        total: 315,
        summary: "315 aircraft (Boeing 737-700, 737-800, 737-900ER, 737 MAX 8, 737 MAX 9; Embraer E175)",
      },
      logo: "/airline-logos/us/alaska.svg",
      logoExplainer:
        "Features the beloved portrait of an Inupiat Eskimo elder (Chester Seveck) wearing a traditional ruff parka on the aircraft tailfin, combined with sweeping script in ice-blue and navy shades reflecting the rugged majesty of the Last Frontier.",
      sources: [
        "https://www.alaskaair.com/content/about-us/history",
        "https://en.wikipedia.org/wiki/Alaska_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-jetblue",
      countryCode: "US",
      name: "JetBlue",
      iata: "B6",
      icao: "JBU",
      founded: 1998,
      alliance: "None",
      hubs: ["New York (JFK)", "Boston (BOS)", "Fort Lauderdale (FLL)", "Orlando (MCO)", "San Juan (SJU)"],
      fleet: {
        total: 300,
        summary: "300 aircraft (Airbus A220-300, A320-200, A321-200, A321neo, A321LR)",
      },
      logo: "/airline-logos/us/jetblue.svg",
      logoExplainer:
        "Sleek and contemporary navy blue and cyan typography complemented by unique geometric tail patterns (such as Mosaic, Harlequin, and Spotlight), highlighting customer individuality, comfort, and stylish modern air travel.",
      sources: [
        "https://www.jetblue.com/about-us",
        "https://en.wikipedia.org/wiki/JetBlue",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // France
  FR: [
    {
      id: "fr-air-france",
      countryCode: "FR",
      name: "Air France",
      iata: "AF",
      icao: "AFR",
      founded: 1933,
      alliance: "SkyTeam",
      hubs: ["Paris Charles de Gaulle Airport (CDG)", "Paris Orly Airport (ORY)"],
      fleet: {
        total: 220,
        summary: "220 aircraft (Airbus A220-300, A318, A319, A320, A321, A330-200, A350-900; Boeing 777-200ER, 777-300ER, 787-9)",
      },
      logo: "/airline-logos/fr/air-france.svg",
      logoExplainer:
        "Features crisp navy typography punctuated by the dynamic 'accent rouge' (red ribbon accent) at the end, evocative of the French Tricolour. The historical symbol of the airline is the 'hippocampe ailé' (winged seahorse, affectionately known as 'la crevette'), representing mastery over sea and sky since 1933.",
      sources: [
        "https://corporate.airfrance.com/en/history",
        "https://en.wikipedia.org/wiki/Air_France",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fr-transavia-france",
      countryCode: "FR",
      name: "Transavia France",
      iata: "TO",
      icao: "TVF",
      founded: 2006,
      alliance: "None",
      hubs: ["Paris Orly (ORY)", "Lyon–Saint-Exupéry (LYS)", "Nantes Atlantique (NTE)", "Marseille (MRS)"],
      fleet: {
        total: 75,
        summary: "75 aircraft (Boeing 737-800, Airbus A320neo)",
      },
      logo: "/airline-logos/fr/transavia-france.svg",
      logoExplainer:
        "The bright green and white 't' symbol incorporates stylized directional arrows within playful circular and rounded geometry, reflecting accessible, cheerful leisure flight destinations across Europe and the Mediterranean basin.",
      sources: [
        "https://www.transavia.com/en-EU/about-transavia/",
        "https://en.wikipedia.org/wiki/Transavia_France",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fr-french-bee",
      countryCode: "FR",
      name: "French Bee",
      iata: "BF",
      icao: "FBU",
      founded: 2016,
      alliance: "None",
      hubs: ["Paris Orly Airport (ORY)"],
      fleet: {
        total: 6,
        summary: "6 aircraft (Airbus A350-900, A350-1000)",
      },
      logo: "/airline-logos/fr/french-bee.svg",
      logoExplainer:
        "A cheerful sky-blue and yellow bee silhouette whose wings form an aircraft tail fin, evoking lighthearted leisure escapes to warm overseas island destinations such as Réunion and Tahiti.",
      sources: [
        "https://www.frenchbee.com/en/about-us",
        "https://en.wikipedia.org/wiki/French_Bee",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fr-corsair",
      countryCode: "FR",
      name: "Corsair International",
      iata: "SS",
      icao: "CRL",
      founded: 1981,
      alliance: "None",
      hubs: ["Paris Orly Airport (ORY)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Airbus A330-300, A330-900neo)",
      },
      logo: "/airline-logos/fr/corsair.png",
      logoExplainer:
        "Sweeping marine-blue stylized sails forming the initial 'C', honoring the airline's Mediterranean Corsican origin and long history bridging metropolitan France with overseas French departments in the Caribbean and Indian Ocean.",
      sources: [
        "https://www.flycorsair.com/en/our-company",
        "https://en.wikipedia.org/wiki/Corsair_International",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United Kingdom
  GB: [
    {
      id: "gb-british-airways",
      countryCode: "GB",
      name: "British Airways",
      iata: "BA",
      icao: "BAW",
      founded: 1974,
      alliance: "oneworld",
      hubs: ["London Heathrow Airport (LHR)", "London Gatwick Airport (LGW)"],
      fleet: {
        total: 260,
        summary: "260 aircraft (Airbus A319, A320, A321, A350-1000, A380-800; Boeing 777-200ER, 777-300ER, 787-8, 787-9, 787-10)",
      },
      logo: "/airline-logos/gb/british-airways.svg",
      logoExplainer:
        "The renowned 'Speedmarque' ribbon was designed in 1997 by Newell & Sorrell as an aerodynamic modernisation of the classic Imperial Airways / BOAC 'Speedbird' emblem. Rendered in patriotic Union Flag red and blue, it radiates aerodynamic speed, British prestige, and global excellence.",
      sources: [
        "https://www.britishairways.com/content/information/about-ba/history-and-heritage",
        "https://en.wikipedia.org/wiki/British_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "gb-easyjet",
      countryCode: "GB",
      name: "easyJet",
      iata: "U2",
      icao: "EZY",
      founded: 1995,
      alliance: "None",
      hubs: ["London Gatwick (LGW)", "London Luton (LTN)", "Manchester (MAN)", "Bristol (BRS)", "Milan Malpensa (MXP)"],
      fleet: {
        total: 340,
        summary: "340 aircraft (Airbus A319-100, A320-200, A320neo, A321neo)",
      },
      logo: "/airline-logos/gb/easyjet.svg",
      logoExplainer:
        "Bold, friendly Cooper Black lowercase lettering in vibrant Pantone 021C orange, symbolizing no-frills simplicity, direct transparency, and the pioneering spirit of accessible European low-cost travel.",
      sources: [
        "https://corporate.easyjet.com/about/who-we-are",
        "https://en.wikipedia.org/wiki/EasyJet",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "gb-virgin-atlantic",
      countryCode: "GB",
      name: "Virgin Atlantic",
      iata: "VS",
      icao: "VIR",
      founded: 1984,
      alliance: "SkyTeam",
      hubs: ["London Heathrow Airport (LHR)", "Manchester Airport (MAN)"],
      fleet: {
        total: 45,
        summary: "45 aircraft (Airbus A330-300, A330-900neo, A350-1000; Boeing 787-9)",
      },
      logo: "/airline-logos/gb/virgin-atlantic.svg",
      logoExplainer:
        "The flowing red Virgin signature script is famously paired with the 'Flying Lady' figurehead on the aircraft nose—inspired by Alberto Vargas 1940s pin-up art holding the Union Flag—celebrating pioneering British glamour, wit, and rock-and-roll spirit.",
      sources: [
        "https://www.virginatlantic.com/gb/en/about-virgin-atlantic.html",
        "https://en.wikipedia.org/wiki/Virgin_Atlantic",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "gb-jet2",
      countryCode: "GB",
      name: "Jet2.com",
      iata: "LS",
      icao: "EXS",
      founded: 2002,
      alliance: "None",
      hubs: ["Leeds Bradford (LBA)", "Manchester (MAN)", "Birmingham (BHX)", "London Stansted (STN)"],
      fleet: {
        total: 130,
        summary: "130 aircraft (Boeing 737-800; Airbus A321-200, A321neo)",
      },
      logo: "/airline-logos/gb/jet2.svg",
      logoExplainer:
        "Features a red circular medallion displaying a stylized climbing aircraft silhouette alongside 'Jet2.com', capturing the excitement and ease of British leisure getaways to Mediterranean beaches and ski slopes.",
      sources: [
        "https://www.jet2.com/about-us",
        "https://en.wikipedia.org/wiki/Jet2.com",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United Arab Emirates
  AE: [
    {
      id: "ae-emirates",
      countryCode: "AE",
      name: "Emirates",
      iata: "EK",
      icao: "UAE",
      founded: 1985,
      alliance: "None",
      hubs: ["Dubai International Airport (DXB)"],
      fleet: {
        total: 260,
        summary: "260 aircraft (Airbus A350-900, A380-800; Boeing 777-200LR, 777-300ER, 777-9)",
      },
      logo: "/airline-logos/ae/emirates.svg",
      logoExplainer:
        "Masterful traditional Arabic calligraphy rendered in striking deep red, spelling out 'Al-Emarat' (The Emirates). Originally penned in 1985 by British branding studio Negus & Negus, it fuses Arab cultural calligraphic artistry with majestic luxury on a global stage.",
      sources: [
        "https://www.emirates.com/english/about-us/our-history/",
        "https://en.wikipedia.org/wiki/Emirates_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ae-etihad",
      countryCode: "AE",
      name: "Etihad Airways",
      iata: "EY",
      icao: "ETD",
      founded: 2003,
      alliance: "None",
      hubs: ["Zayed International Airport (AUH - Abu Dhabi)"],
      fleet: {
        total: 95,
        summary: "95 aircraft (Airbus A320, A321, A350-1000, A380-800; Boeing 777-300ER, 787-9, 787-10)",
      },
      logo: "/airline-logos/ae/etihad.svg",
      logoExplainer:
        "Features flowing Arabic calligraphy for 'Al-Ittihad' (The Union) and the 'Facets of Abu Dhabi' motif created by Landor Associates. The faceted geometry draws inspiration from traditional Islamic architecture and the dramatic rolling dunes of the Liwa desert.",
      sources: [
        "https://www.etihad.com/en-ae/about-us",
        "https://en.wikipedia.org/wiki/Etihad_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ae-flydubai",
      countryCode: "AE",
      name: "flydubai",
      iata: "FZ",
      icao: "FDB",
      founded: 2008,
      alliance: "None",
      hubs: ["Dubai International Airport (DXB)"],
      fleet: {
        total: 88,
        summary: "88 aircraft (Boeing 737-800, 737 MAX 8, 737 MAX 9)",
      },
      logo: "/airline-logos/ae/flydubai.svg",
      logoExplainer:
        "Fluid blue and orange interlocking curves depicting the word 'dubai' in both Arabic and Latin scripts, symbolizing the blue sky, warm desert sands, and energetic cosmopolitan spirit of Dubai.",
      sources: [
        "https://www.flydubai.com/en/information/about-flydubai",
        "https://en.wikipedia.org/wiki/Flydubai",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ae-air-arabia",
      countryCode: "AE",
      name: "Air Arabia",
      iata: "G9",
      icao: "ABY",
      founded: 2003,
      alliance: "Arabesk",
      hubs: ["Sharjah International Airport (SHJ)", "Ras Al Khaimah (RKT)", "Zayed International Airport (AUH)"],
      fleet: {
        total: 45,
        summary: "45 aircraft (Airbus A320-200, A321neo LR)",
      },
      logo: "/airline-logos/ae/air-arabia.svg",
      logoExplainer:
        "A stylized red seagull soaring upwards against a white field, chosen to symbolize freedom, pioneering agility, and the breakthrough introduction of budget air travel in the Middle East and North Africa.",
      sources: [
        "https://www.airarabia.com/en/about-us",
        "https://en.wikipedia.org/wiki/Air_Arabia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Qatar
  QA: [
    {
      id: "qa-qatar-airways",
      countryCode: "QA",
      name: "Qatar Airways",
      iata: "QR",
      icao: "QTR",
      founded: 1993,
      alliance: "oneworld",
      hubs: ["Hamad International Airport (DOH - Doha)"],
      fleet: {
        total: 255,
        summary: "255 aircraft (Airbus A320, A330, A350-900, A350-1000, A380-800; Boeing 737 MAX 8, 777-200LR, 777-300ER, 777-9, 787-8, 787-9)",
      },
      logo: "/airline-logos/qa/qatar-airways.svg",
      logoExplainer:
        "Features the regal head and long curved horns of the Arabian Oryx (the national animal of the State of Qatar) rendered in rich burgundy ('Qatar maroon') against grey calligraphy. The oryx symbolizes endurance, resilience, noble desert heritage, and high five-star standards of Arabian hospitality.",
      sources: [
        "https://www.qatarairways.com/en/about-qatar-airways.html",
        "https://en.wikipedia.org/wiki/Qatar_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
};
