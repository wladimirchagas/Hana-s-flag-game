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

  // New Zealand
  NZ: [
    {
      id: "nz-air-new-zealand",
      countryCode: "NZ",
      name: "Air New Zealand",
      iata: "NZ",
      icao: "ANZ",
      founded: 1940,
      alliance: "Star Alliance",
      hubs: ["Auckland Airport (AKL)", "Wellington Airport (WLG)", "Christchurch Airport (CHC)"],
      fleet: {
        total: 107,
        summary: "107 aircraft (Airbus A320-200, A320neo, A321neo; Boeing 777-367ER, 787-9; ATR 72-600; De Havilland Canada DHC-8-300 Dash 8)",
      },
      logo: "/airline-logos/nz/air-new-zealand.svg",
      logoExplainer:
        "Features the iconic Mangōpare (hammerhead shark) rendered as a traditional Māori Koru (unfolding silver fern frond). Designed originally for the DC-10 fleet introduction in 1973, the emblem embodies new life, spiritual growth, perseverance, strength, and proud Aotearoa New Zealand cultural heritage.",
      sources: [
        "https://www.airnewzealand.co.nz/our-story",
        "https://en.wikipedia.org/wiki/Air_New_Zealand",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Singapore
  SG: [
    {
      id: "sg-singapore-airlines",
      countryCode: "SG",
      name: "Singapore Airlines",
      iata: "SQ",
      icao: "SIA",
      founded: 1947,
      alliance: "Star Alliance",
      hubs: ["Singapore Changi Airport (SIN)"],
      fleet: {
        total: 160,
        summary: "160 aircraft (Airbus A350-900, A380-800; Boeing 737-8, 737-800, 777-300ER, 777-9, 787-10)",
      },
      logo: "/airline-logos/sg/singapore-airlines.svg",
      logoExplainer:
        "The renowned 'Silver Kris' emblem features a stylized golden bird in graceful flight, inspired by the traditional Southeast Asian ceremonial kris dagger and keris hilt carving. Retained and polished continuously since Singapore Airlines began independent operations in 1972, the emblem symbolizes poise, exquisite service standards, and soaring Asian prestige.",
      sources: [
        "https://www.singaporeair.com/en_UK/sg/flying-withus/our-story/",
        "https://en.wikipedia.org/wiki/Singapore_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sg-scoot",
      countryCode: "SG",
      name: "Scoot",
      iata: "TR",
      icao: "TCO",
      founded: 2011,
      alliance: "Value Alliance",
      hubs: ["Singapore Changi Airport (SIN)"],
      fleet: {
        total: 55,
        summary: "55 aircraft (Airbus A320-200, A320neo, A321neo; Boeing 787-8, 787-9 Dreamliner; Embraer E190-E2)",
      },
      logo: "/airline-logos/sg/scoot.svg",
      logoExplainer:
        "A vibrant sunshine-yellow circle tilted playfully with bold, off-center lowercase black typography. The jaunty angle and warm yellow hue reflect 'Scootitude'—a company philosophy centered on spontaneous, fun-loving, unpretentious, and accessible air travel across Asia-Pacific.",
      sources: [
        "https://www.flyscoot.com/en/about-scoot",
        "https://en.wikipedia.org/wiki/Scoot",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Thailand
  TH: [
    {
      id: "th-thai-airways",
      countryCode: "TH",
      name: "Thai Airways",
      iata: "TG",
      icao: "THA",
      founded: 1960,
      alliance: "Star Alliance",
      hubs: ["Suvarnabhumi Airport (BKK - Bangkok)", "Phuket International Airport (HKT)"],
      fleet: {
        total: 77,
        summary: "77 aircraft (Airbus A320-200, A330-300, A350-900; Boeing 777-200ER, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/th/thai-airways.svg",
      logoExplainer:
        "Known as the 'Jumpee' (Champaka flower blossom), this design created by Walter Landor in 1975 integrates royal Thai purple (reflecting exotic Thai orchids and royal heritage), rich magenta (representing luxurious Thai silk fabrics), and shimmering gold (honoring Buddhist temples and the Golden Kingdom).",
      sources: [
        "https://www.thaiairways.com/en_TH/about_thai/company_profile/history.page",
        "https://en.wikipedia.org/wiki/Thai_Airways_International",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "th-bangkok-airways",
      countryCode: "TH",
      name: "Bangkok Airways",
      iata: "PG",
      icao: "BKP",
      founded: 1968,
      alliance: "None",
      hubs: ["Suvarnabhumi Airport (BKK - Bangkok)", "Samui Airport (USM)", "Chiang Mai International Airport (CNX)"],
      fleet: {
        total: 28,
        summary: "28 aircraft (Airbus A319-100, A320-200; ATR 72-600)",
      },
      logo: "/airline-logos/th/bangkok-airways.svg",
      logoExplainer:
        "Branded as 'Asia's Boutique Airline', the logo features an aerodynamic forward-surging bird motif rendered in dynamic marine blue and turquoise waves. The flowing ribbons evoke sea breezes, tropical waters, and friendly coastal hospitality.",
      sources: [
        "https://www.bangkokair.com/about-us",
        "https://en.wikipedia.org/wiki/Bangkok_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "th-thai-airasia",
      countryCode: "TH",
      name: "Thai AirAsia",
      iata: "FD",
      icao: "AIQ",
      founded: 2003,
      alliance: "None",
      hubs: ["Don Mueang International Airport (DMK - Bangkok)", "Suvarnabhumi Airport (BKK)", "Chiang Mai (CNX)", "Phuket (HKT)"],
      fleet: {
        total: 60,
        summary: "60 aircraft (Airbus A320-200, A320neo, A321neo)",
      },
      logo: "/airline-logos/th/thai-airasia.svg",
      logoExplainer:
        "Distinctive handwritten crimson-and-white signature script of the AirAsia group, symbolizing warmth, youthful simplicity, and the company's famous mission statement: 'Now Everyone Can Fly'.",
      sources: [
        "https://www.airasia.com/th/en/about-us.html",
        "https://en.wikipedia.org/wiki/Thai_AirAsia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Vietnam
  VN: [
    {
      id: "vn-vietnam-airlines",
      countryCode: "VN",
      name: "Vietnam Airlines",
      iata: "VN",
      icao: "HVN",
      founded: 1956,
      alliance: "SkyTeam",
      hubs: ["Noi Bai International Airport (HAN - Hanoi)", "Tan Son Nhat International Airport (SGN - Ho Chi Minh City)"],
      fleet: {
        total: 98,
        summary: "98 aircraft (Airbus A321-200, A321neo, A350-900; Boeing 787-9, 787-10 Dreamliner)",
      },
      logo: "/airline-logos/vn/vietnam-airlines.svg",
      logoExplainer:
        "The 'Golden Lotus' (Bông Sen Vàng), introduced in 2002 to replace the old winged stork, depicts Vietnam's cherished national flower in radiant gold against a deep cerulean blue. In Vietnamese culture, the lotus rises spotless and fragrant from mud, symbolizing nobility, purity, spiritual resilience, and timeless enlightenment.",
      sources: [
        "https://www.vietnamairlines.com/vn/en/about-us/our-story/our-brand",
        "https://en.wikipedia.org/wiki/Vietnam_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "vn-vietjet-air",
      countryCode: "VN",
      name: "VietJet Air",
      iata: "VJ",
      icao: "VJC",
      founded: 2007,
      alliance: "None",
      hubs: ["Tan Son Nhat International Airport (SGN)", "Noi Bai International Airport (HAN)", "Da Nang International Airport (DAD)"],
      fleet: {
        total: 86,
        summary: "86 aircraft (Airbus A320-200, A321-200, A321neo, A330-300)",
      },
      logo: "/airline-logos/vn/vietjet-air.svg",
      logoExplainer:
        "Features bright fiery red and warm yellow colors matching the Vietnamese national flag, set in dynamic, forward-slanted cursive lettering. The energetic color scheme conveys optimism, high velocity, and welcoming affordability for modern Vietnamese travelers.",
      sources: [
        "https://www.vietjetair.com/en/pages/about-us-1578385202970",
        "https://en.wikipedia.org/wiki/VietJet_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "vn-bamboo-airways",
      countryCode: "VN",
      name: "Bamboo Airways",
      iata: "QH",
      icao: "BAV",
      founded: 2017,
      alliance: "None",
      hubs: ["Noi Bai International Airport (HAN - Hanoi)", "Tan Son Nhat International Airport (SGN - Ho Chi Minh City)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Airbus A320-200, A320neo, A321-200; Embraer E190)",
      },
      logo: "/airline-logos/vn/bamboo-airways.svg",
      logoExplainer:
        "Depicts a tailfin composed of stylized bamboo leaves in fresh foliage green and sky blue. In Vietnamese heritage, the bamboo tree (cây tre) is an emblem of humble uprightness, flexibility, endurance in storms, and deep community roots.",
      sources: [
        "https://www.bambooairways.com/en/about-us",
        "https://en.wikipedia.org/wiki/Bamboo_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Philippines
  PH: [
    {
      id: "ph-philippine-airlines",
      countryCode: "PH",
      name: "Philippine Airlines",
      iata: "PR",
      icao: "PAL",
      founded: 1941,
      alliance: "None",
      hubs: ["Ninoy Aquino International Airport (MNL - Manila)", "Mactan–Cebu International Airport (CEB)", "Clark International Airport (CRK)"],
      fleet: {
        total: 78,
        summary: "78 aircraft (Airbus A321-200, A321neo, A330-300, A350-900; Boeing 777-300ER; De Havilland Canada DHC-8-400 Dash 8)",
      },
      logo: "/airline-logos/ph/philippine-airlines.svg",
      logoExplainer:
        "As Asia's oldest commercial airline operating under its original name, PAL's emblem incorporates the blue and red geometric triangular sails of the Philippine national flag accompanied by the eight-rayed golden sun. The design evokes ancient seafaring proas, boundless sky, and patriotic national sovereignty.",
      sources: [
        "https://www.philippineairlines.com/en/about-us/our-history",
        "https://en.wikipedia.org/wiki/Philippine_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ph-cebu-pacific",
      countryCode: "PH",
      name: "Cebu Pacific",
      iata: "5J",
      icao: "CEB",
      founded: 1988,
      alliance: "Value Alliance",
      hubs: ["Ninoy Aquino International Airport (MNL - Manila)", "Mactan–Cebu International Airport (CEB)", "Clark (CRK)", "Francisco Bangoy (DVO - Davao)"],
      fleet: {
        total: 87,
        summary: "87 aircraft (Airbus A320-200, A320neo, A321-200, A321neo, A330-900neo; ATR 72-600)",
      },
      logo: "/airline-logos/ph/cebu-pacific.svg",
      logoExplainer:
        "The emblem showcases the iconic Philippine Eagle feather pattern, rendered in sky blue and tropical green with bright sunshine accents. Introduced in 2015, the clean design pays tribute to the majestic national bird (Pithecophaga jefferyi) while reflecting the vivid islands, skies, and seas of the archipelago.",
      sources: [
        "https://www.cebupacificair.com/en-PH/pages/about-us",
        "https://en.wikipedia.org/wiki/Cebu_Pacific",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Brunei
  BN: [
    {
      id: "bn-royal-brunei",
      countryCode: "BN",
      name: "Royal Brunei Airlines",
      iata: "BI",
      icao: "RBA",
      founded: 1974,
      alliance: "None",
      hubs: ["Brunei International Airport (BWN - Bandar Seri Begawan)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (Airbus A320neo; Boeing 787-8 Dreamliner)",
      },
      logo: "/airline-logos/bn/royal-brunei.svg",
      logoExplainer:
        "Features the royal yellow sash diagonal and the official royal crest of the Sultanate of Brunei. Royal yellow signifies sovereign majesty and Islamic heritage, while the stylized wings represent graceful airborne service and peaceful international connection.",
      sources: [
        "https://www.flyroyalbrunei.com/en/about-us/",
        "https://en.wikipedia.org/wiki/Royal_Brunei_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cambodia
  KH: [
    {
      id: "kh-cambodia-angkor-air",
      countryCode: "KH",
      name: "Air Cambodia",
      iata: "K6",
      icao: "KHV",
      founded: 2009,
      alliance: "None",
      hubs: ["Phnom Penh International Airport (PNH)", "Siem Reap–Angkor International Airport (SAI)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200, A321-200; ATR 72-500)",
      },
      logo: "/airline-logos/kh/cambodia-angkor-air.png",
      logoExplainer:
        "National flag carrier of Cambodia (rebranded from Cambodia Angkor Air in 2025). The emblem features the sacred towers of Angkor Wat crowned with the divine wings of Garuda in radiant royal gold and purple, symbolizing ancient Khmer civilization and triumphant flight.",
      sources: [
        "https://www.aircambodia.com/about-us",
        "https://en.wikipedia.org/wiki/Air_Cambodia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Laos
  LA: [
    {
      id: "la-lao-airlines",
      countryCode: "LA",
      name: "Lao Airlines",
      iata: "QV",
      icao: "LAO",
      founded: 1976,
      alliance: "None",
      hubs: ["Wattay International Airport (VTE - Vientiane)", "Luang Prabang International Airport (LPQ)"],
      fleet: {
        total: 11,
        summary: "11 aircraft (Airbus A320-200; ATR 72-500, ATR 72-600)",
      },
      logo: "/airline-logos/la/lao-airlines.svg",
      logoExplainer:
        "Features the beloved Dok Champa (Frangipani / Plumeria alba), the national flower of Laos, rendered in golden yellow and white with flowing green and red ribbons. The Dok Champa represents sincerity, joy in hospitality, and the gentle beauty of Lao culture.",
      sources: [
        "https://www.laoairlines.com/about-us",
        "https://en.wikipedia.org/wiki/Lao_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Myanmar
  MM: [
    {
      id: "mm-myanmar-national-airlines",
      countryCode: "MM",
      name: "Myanmar National Airlines",
      iata: "UB",
      icao: "UBA",
      founded: 1948,
      alliance: "None",
      hubs: ["Yangon International Airport (RGN)", "Mandalay International Airport (MDL)"],
      fleet: {
        total: 11,
        summary: "11 aircraft (Boeing 737-800; Embraer E190; ATR 72-600)",
      },
      logo: "/airline-logos/mm/myanmar-national-airlines.svg",
      logoExplainer:
        "Established in 1948 as Union of Burma Airways, the state flag carrier's insignia portrays the sacred Pyinsarupa (mythical chimera combining five creatures: lion, elephant, carp, peacock, and buffalo) alongside a golden lotus flower, symbolizing national harmony and majestic protection.",
      sources: [
        "https://www.flymna.com/about-mna",
        "https://en.wikipedia.org/wiki/Myanmar_National_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "mm-myanmar-airways-international",
      countryCode: "MM",
      name: "Myanmar Airways International",
      iata: "8M",
      icao: "MMA",
      founded: 1993,
      alliance: "None",
      hubs: ["Yangon International Airport (RGN)", "Mandalay International Airport (MDL)"],
      fleet: {
        total: 13,
        summary: "13 aircraft (Airbus A319-100, A320-200; Embraer E190)",
      },
      logo: "/airline-logos/mm/myanmar-airways-international.svg",
      logoExplainer:
        "Features the Pyinsarupa creature leaping dynamically through a radiant golden disc against deep sky blue, signifying mythical speed, ancient Burmese folklore, and dependable international aviation.",
      sources: [
        "https://maiair.com/about-us",
        "https://en.wikipedia.org/wiki/Myanmar_Airways_International",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Timor-Leste
  TL: [
    {
      id: "tl-aero-dili",
      countryCode: "TL",
      name: "Aero Dili",
      iata: "8G",
      icao: "DTL",
      founded: 2018,
      alliance: "None",
      hubs: ["Presidente Nicolau Lobato International Airport (DIL - Dili)"],
      fleet: {
        total: 3,
        summary: "3 aircraft (Airbus A320-200; Cessna 207 Skywagon)",
      },
      logo: "/airline-logos/tl/aero-dili.png",
      logoExplainer:
        "The national flag carrier of Timor-Leste, founded in 2018 and operating the first Timor-Leste registered commercial jetliner. The emblem integrates the red, yellow, and black colors of the Timorese national flag with stylized soaring wings, representing national sovereignty, emerging development, and regional air connectivity.",
      sources: [
        "https://www.aerodili.com/about-us",
        "https://en.wikipedia.org/wiki/Aero_Dili",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // China
  CN: [
    {
      id: "cn-air-china",
      countryCode: "CN",
      name: "Air China",
      iata: "CA",
      icao: "CCA",
      founded: 1988,
      alliance: "Star Alliance",
      hubs: ["Beijing Capital International Airport (PEK)", "Beijing Daxing (PKX)", "Chengdu Tianfu (TFU)", "Shanghai Pudong (PVG)"],
      fleet: {
        total: 537,
        summary: "537 aircraft (Airbus A319, A320, A321, A330-200/300, A350-900; Boeing 737-700/800/MAX 8, 747-400/8, 777-300ER, 787-9; Comac ARJ21, C919)",
      },
      logo: "/airline-logos/cn/air-china.svg",
      logoExplainer:
        "Features a stylized artistic crimson Phoenix (Fenghuang), the mythical bird of Chinese legend signifying auspicious peace, good fortune, and rebirth. In a clever typographic touch, the flowing contours of the phoenix wings deftly spell out the letters 'VIP' (Very Important Person), symbolizing premier hospitality, accompanied by calligraphy penned by Deng Xiaoping.",
      sources: [
        "https://www.airchina.com.cn/en/about_us/airchina_story.shtml",
        "https://en.wikipedia.org/wiki/Air_China",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "cn-china-eastern",
      countryCode: "CN",
      name: "China Eastern Airlines",
      iata: "MU",
      icao: "CES",
      founded: 1988,
      alliance: "SkyTeam",
      hubs: ["Shanghai Pudong International Airport (PVG)", "Shanghai Hongqiao (SHA)", "Kunming Changshui (KMG)", "Xi'an Xianyang (XIY)"],
      fleet: {
        total: 680,
        summary: "680 aircraft (Airbus A320, A321, A330-200/300, A350-900; Boeing 737-700/800/MAX 8, 777-300ER, 787-9; Comac ARJ21, C919)",
      },
      logo: "/airline-logos/cn/china-eastern.svg",
      logoExplainer:
        "Depicts a sleek white swallow soaring upwards across a circular sun motif composed of crimson and royal blue hemispheres. The swallow heralds the arrival of spring and happy journeys in Chinese folklore, while the round red and blue sphere echoes traditional Yin-Yang harmony and round-the-world civil aviation.",
      sources: [
        "https://www.ceair.com/about/company-profile.html",
        "https://en.wikipedia.org/wiki/China_Eastern_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "cn-china-southern",
      countryCode: "CN",
      name: "China Southern Airlines",
      iata: "CZ",
      icao: "CSN",
      founded: 1988,
      alliance: "None",
      hubs: ["Guangzhou Baiyun International Airport (CAN)", "Beijing Daxing International Airport (PKX)", "Shenzhen Bao'an (SZX)"],
      fleet: {
        total: 708,
        summary: "708 aircraft (Airbus A320, A321, A330-300, A350-900; Boeing 737-700/800/MAX 8, 777-300ER, 787-8/9; Comac ARJ21, C919)",
      },
      logo: "/airline-logos/cn/china-southern.svg",
      logoExplainer:
        "Showcases the bright red flower of the Kapok tree (Bombax ceiba), the official floral emblem of Guangzhou and southern China, set against a tranquil azure tailfin. The red kapok flower represents warm Lingnan hospitality, natural vitality, and vibrant southern prosperity.",
      sources: [
        "https://www.csair.com/en/about/investor/profile/",
        "https://en.wikipedia.org/wiki/China_Southern_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Taiwan
  TW: [
    {
      id: "tw-china-airlines",
      countryCode: "TW",
      name: "China Airlines",
      iata: "CI",
      icao: "CAL",
      founded: 1959,
      alliance: "SkyTeam",
      hubs: ["Taoyuan International Airport (TPE - Taipei)", "Kaohsiung International Airport (KHH)"],
      fleet: {
        total: 85,
        summary: "85 aircraft (Airbus A321neo, A330-300, A350-900; Boeing 777-300ER, 777F, 747-400F)",
      },
      logo: "/airline-logos/tw/china-airlines.svg",
      logoExplainer:
        "The delicate pink Plum Blossom (Meihua / Prunus mume), adopted in 1995. As the national flower of the Republic of China, the resilient plum blossom blooms bravely in harsh winter frost, symbolizing moral fortitude, quiet elegance, and Chinese cultural perseverance.",
      sources: [
        "https://www.china-airlines.com/us/en/about-us/corporate-profile",
        "https://en.wikipedia.org/wiki/China_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "tw-eva-air",
      countryCode: "TW",
      name: "EVA Air",
      iata: "BR",
      icao: "EVA",
      founded: 1989,
      alliance: "Star Alliance",
      hubs: ["Taoyuan International Airport (TPE - Taipei)", "Kaohsiung International Airport (KHH)"],
      fleet: {
        total: 88,
        summary: "88 aircraft (Airbus A321-200, A330-300; Boeing 777-300ER, 777F, 787-9, 787-10 Dreamliner)",
      },
      logo: "/airline-logos/tw/eva-air.svg",
      logoExplainer:
        "Inherited from the Evergreen Group, the emblem features an orange compass rose navigating on a deep green sphere. Green represents environmental harmony and safety, orange signifies energetic innovation, and the navigational compass recalls maritime exploration traditions.",
      sources: [
        "https://www.evaair.com/en-global/about-eva-air/about-us/company-profile/",
        "https://en.wikipedia.org/wiki/EVA_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // South Korea
  KR: [
    {
      id: "kr-korean-air",
      countryCode: "KR",
      name: "Korean Air",
      iata: "KE",
      icao: "KAL",
      founded: 1962,
      alliance: "SkyTeam",
      hubs: ["Incheon International Airport (ICN - Seoul)", "Gimpo International Airport (GMP - Seoul)"],
      fleet: {
        total: 169,
        summary: "169 aircraft (Airbus A220-300, A321neo, A330-200/300, A380-800; Boeing 737-800/900/MAX 8, 747-8I, 777-200ER/300ER, 787-9/10)",
      },
      logo: "/airline-logos/kr/korean-air.svg",
      logoExplainer:
        "Designed in 1984, the Taegeuk emblem embodies cosmic balance, featuring the traditional Korean red and blue Yin-Yang dynamic whorl separated by a white aircraft propeller blade in motion, set beside Korean Air's signature sky-blue aircraft livery.",
      sources: [
        "https://www.koreanair.com/global/en/about-korean-air/company-info",
        "https://en.wikipedia.org/wiki/Korean_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "kr-asiana-airlines",
      countryCode: "KR",
      name: "Asiana Airlines",
      iata: "OZ",
      icao: "AAR",
      founded: 1988,
      alliance: "Star Alliance",
      hubs: ["Incheon International Airport (ICN - Seoul)", "Gimpo International Airport (GMP - Seoul)"],
      fleet: {
        total: 67,
        summary: "67 aircraft (Airbus A321-200, A321neo, A330-300, A350-900, A380-800; Boeing 777-200ER)",
      },
      logo: "/airline-logos/kr/asiana-airlines.svg",
      logoExplainer:
        "Clean, elegant slate-grey logotype introduced in late 2024 following corporate restructuring, reflecting sleek modern sophistication, calm reliability, and premium East Asian passenger service.",
      sources: [
        "https://flyasiana.com/C/US/EN/contents/overview-of-asiana-airlines",
        "https://en.wikipedia.org/wiki/Asiana_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // North Korea
  KP: [
    {
      id: "kp-air-koryo",
      countryCode: "KP",
      name: "Air Koryo",
      iata: "JS",
      icao: "KOR",
      founded: 1955,
      alliance: "None",
      hubs: ["Pyongyang Sunan International Airport (FNJ)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (Antonov An-24, An-148; Ilyushin Il-18, Il-62M, Il-76; Tupolev Tu-134, Tu-154, Tu-204)",
      },
      logo: "/airline-logos/kp/air-koryo.svg",
      logoExplainer:
        "Features a stylized winged crane in soaring flight, derived from historical Korean folklore where the red-crowned crane represents longevity, dignity, and celestial flight. Named after the ancient Koryo Dynasty that gave Korea its international name.",
      sources: [
        "http://www.airkoryo.com.kp/",
        "https://en.wikipedia.org/wiki/Air_Koryo",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mongolia
  MN: [
    {
      id: "mn-miat-mongolian",
      countryCode: "MN",
      name: "MIAT Mongolian Airlines",
      iata: "OM",
      icao: "MGL",
      founded: 1956,
      alliance: "None",
      hubs: ["Chinggis Khaan International Airport (UBN - Ulaanbaatar)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Boeing 737-800, 737 MAX 8, 767-300ER, 787-9 Dreamliner; Bombardier CRJ-200)",
      },
      logo: "/airline-logos/mn/miat-mongolian.svg",
      logoExplainer:
        "Features a winged horse (Hiimori / Wind Horse) leaping majestically within an elliptical disc alongside Mongolian blue script. In nomadic Mongolian tradition, the Wind Horse embodies human spiritual energy, soul, and soaring nomadic freedom across the vast open steppes.",
      sources: [
        "https://www.miat.com/about-us/",
        "https://en.wikipedia.org/wiki/MIAT_Mongolian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Argentina
  AR: [
    {
      id: "ar-aerolineas-argentinas",
      countryCode: "AR",
      name: "Aerolíneas Argentinas",
      iata: "AR",
      icao: "ARG",
      founded: 1950,
      alliance: "SkyTeam",
      hubs: ["Aeroparque Jorge Newbery (AEP - Buenos Aires)", "Ministro Pistarini International Airport (EZE - Ezeiza/Buenos Aires)"],
      fleet: {
        total: 84,
        summary: "84 aircraft (Airbus A330-200; Boeing 737-700, 737-800, 737 MAX 8; Embraer E190AR)",
      },
      logo: "/airline-logos/ar/aerolineas-argentinas.svg",
      logoExplainer:
        "The iconic stylized condor emblem ('El Cóndor') portrays the Andean condor, the majestic national bird of Argentina, soaring effortlessly across the Andes. The sky-blue (celeste) and white palette honors the Argentine national flag.",
      sources: [
        "https://www.aerolineas.com.ar/",
        "https://en.wikipedia.org/wiki/Aerol%C3%ADneas_Argentinas",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ar-flybondi",
      countryCode: "AR",
      name: "Flybondi",
      iata: "FO",
      icao: "FBZ",
      founded: 2016,
      alliance: "None",
      hubs: ["Aeroparque Jorge Newbery (AEP - Buenos Aires)", "Ministro Pistarini International Airport (EZE - Buenos Aires)"],
      fleet: {
        total: 15,
        summary: "15 aircraft (Boeing 737-800)",
      },
      logo: "/airline-logos/ar/flybondi.svg",
      logoExplainer:
        "Features a modern, vibrant golden-yellow wordmark. The name merges 'fly' with 'bondi' (the affectionate Argentine Lunfardo slang for city bus), embodying its mission to provide accessible, ultra-low-cost collective air transport for all Argentines.",
      sources: [
        "https://flybondi.com/",
        "https://en.wikipedia.org/wiki/Flybondi",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Colombia
  CO: [
    {
      id: "co-avianca",
      countryCode: "CO",
      name: "Avianca",
      iata: "AV",
      icao: "AVA",
      founded: 1919,
      alliance: "Star Alliance",
      hubs: ["El Dorado International Airport (BOG - Bogotá)", "José María Córdova International Airport (MDE - Medellín)"],
      fleet: {
        total: 140,
        summary: "140 aircraft (Airbus A319-100, A320-200, A320neo; Boeing 787-8 Dreamliner)",
      },
      logo: "/airline-logos/co/avianca.svg",
      logoExplainer:
        "Originally founded in 1919 as SCADTA, making it the world's second-oldest continuously operating airline. The modern emblem features a sleek lowercase wordmark with a sweeping crimson condor wing motif, symbolizing South American vitality, aerodynamic momentum, and Colombian national pride.",
      sources: [
        "https://www.avianca.com/",
        "https://en.wikipedia.org/wiki/Avianca",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "co-clic-air",
      countryCode: "CO",
      name: "Clic Air",
      iata: "VE",
      icao: "EFY",
      founded: 2006,
      alliance: "None",
      hubs: ["El Dorado International Airport (BOG - Bogotá)", "Olaya Herrera Airport (EOH - Medellín)", "Palonegro International Airport (BGA - Bucaramanga)"],
      fleet: {
        total: 20,
        summary: "20 aircraft (ATR 42-500, ATR 42-600, ATR 72-600)",
      },
      logo: "/airline-logos/co/clic-air.svg",
      logoExplainer:
        "Rebranded from EasyFly in 2023, the Clic logo features vibrant, multicolored overlapping geometric facets and triangular wings forming the letter 'C', representing connectivity, diversity, and rapid regional travel across Colombia's complex mountainous geography.",
      sources: [
        "https://clicair.co/",
        "https://en.wikipedia.org/wiki/Clic_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Chile
  CL: [
    {
      id: "cl-latam-chile",
      countryCode: "CL",
      name: "LATAM Airlines Chile",
      iata: "LA",
      icao: "LAN",
      founded: 1929,
      alliance: "None",
      hubs: ["Arturo Merino Benítez International Airport (SCL - Santiago)"],
      fleet: {
        total: 155,
        summary: "155 aircraft (Airbus A320-200, A320neo, A321-200, A321neo; Boeing 767-300ER, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/cl/latam-chile.svg",
      logoExplainer:
        "The LATAM ribbon insignia, created following the unification of LAN and TAM, depicts an artistic stylized outline of the South American continent in indigo (symbolizing elegance and high altitude skies) and coral red (symbolizing the warmth and passion of Latin America).",
      sources: [
        "https://www.latamairlines.com/",
        "https://en.wikipedia.org/wiki/LATAM_Chile",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "cl-sky-airline",
      countryCode: "CL",
      name: "Sky Airline",
      iata: "H2",
      icao: "SKU",
      founded: 2001,
      alliance: "None",
      hubs: ["Arturo Merino Benítez International Airport (SCL - Santiago)"],
      fleet: {
        total: 32,
        summary: "32 aircraft (Airbus A320neo, A321neo)",
      },
      logo: "/airline-logos/cl/sky-airline.svg",
      logoExplainer:
        "Features a modern wordmark with a distinctive mirrored 'K' ('SꓘY') rendered in bright neon green and deep violet. The mirrored letter creates an arrow pointing forward and upward, symbolizing innovative thinking, environmental efficiency, and dynamic growth.",
      sources: [
        "https://www.skyairline.com/",
        "https://en.wikipedia.org/wiki/Sky_Airline",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bolivia
  BO: [
    {
      id: "bo-boliviana-de-aviacion",
      countryCode: "BO",
      name: "Boliviana de Aviación (BoA)",
      iata: "OB",
      icao: "BOV",
      founded: 2007,
      alliance: "None",
      hubs: [
        "Jorge Wilstermann International Airport (CBB - Cochabamba)",
        "Viru Viru International Airport (VVI - Santa Cruz de la Sierra)",
        "El Alto International Airport (LPB - La Paz)",
      ],
      fleet: {
        total: 22,
        summary: "22 aircraft (Airbus A330-200; Boeing 737-700, 737-800, 767-300ER; Bombardier CRJ-200)",
      },
      logo: "/airline-logos/bo/boliviana-de-aviacion.svg",
      logoExplainer:
        "Features graceful curving aerodynamic swooshes in Bolivia's national tricolor colors—red (valour of heroes), yellow (mineral resources), and green (rich flora and biodiversity)—swirling forward across a stylized globe.",
      sources: [
        "https://www.boa.bo/",
        "https://en.wikipedia.org/wiki/Boliviana_de_Aviaci%C3%B3n",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Peru
  PE: [
    {
      id: "pe-latam-peru",
      countryCode: "PE",
      name: "LATAM Airlines Perú",
      iata: "LP",
      icao: "LPE",
      founded: 1998,
      alliance: "None",
      hubs: ["Jorge Chávez International Airport (LIM - Lima)", "Alejandro Velasco Astete International Airport (CUZ - Cusco)"],
      fleet: {
        total: 60,
        summary: "60 aircraft (Airbus A319-100, A320-200, A320neo)",
      },
      logo: "/airline-logos/pe/latam-peru.svg",
      logoExplainer:
        "Carries the unified LATAM indigo and coral ribbon motif portraying the silhouette of South America, representing continental integration, warmth, and modern aeronautical leadership across the Andes and Pacific coast.",
      sources: [
        "https://www.latamairlines.com/pe/es",
        "https://en.wikipedia.org/wiki/LATAM_Per%C3%BA",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "pe-star-peru",
      countryCode: "PE",
      name: "Star Perú",
      iata: "2I",
      icao: "SRU",
      founded: 1997,
      alliance: "None",
      hubs: ["Jorge Chávez International Airport (LIM - Lima)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Boeing 737-300, 737-700)",
      },
      logo: "/airline-logos/pe/star-peru.svg",
      logoExplainer:
        "Features an energetic crimson star emblem accompanied by sweeping white motion trails and bold typography, symbolizing a guiding North Star connecting Lima with remote Peruvian provincial capitals and the Amazon basin.",
      sources: [
        "https://www.starperu.com/",
        "https://en.wikipedia.org/wiki/Star_Per%C3%BA",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ecuador
  EC: [
    {
      id: "ec-aeroregional",
      countryCode: "EC",
      name: "Aeroregional",
      iata: "RER",
      icao: "RER",
      founded: 2018,
      alliance: "None",
      hubs: ["Mariscal Sucre International Airport (UIO - Quito)", "José Joaquín de Olmedo International Airport (GYE - Guayaquil)"],
      fleet: {
        total: 4,
        summary: "4 aircraft (Boeing 737-400, 737-500)",
      },
      logo: "/airline-logos/ec/aeroregional.png",
      logoExplainer:
        "Features a modern typographic wordmark with a distinctive red-orange accent curved above the letter 'g', representing high-altitude flight trails crossing Ecuador's Andean cordilleras and connecting regional communities.",
      sources: [
        "https://aeroregional.net/",
        "https://en.wikipedia.org/wiki/Aeroregional",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ec-latam-ecuador",
      countryCode: "EC",
      name: "LATAM Airlines Ecuador",
      iata: "XL",
      icao: "LNE",
      founded: 2003,
      alliance: "None",
      hubs: ["Mariscal Sucre International Airport (UIO - Quito)", "José Joaquín de Olmedo International Airport (GYE - Guayaquil)"],
      fleet: {
        total: 4,
        summary: "4 aircraft (Airbus A319-100, A320-200)",
      },
      logo: "/airline-logos/ec/latam-ecuador.svg",
      logoExplainer:
        "Carries the unified LATAM indigo and coral ribbon motif outlining the South American continent, symbolizing connection across the Andes, the Galápagos Islands, and the Pacific coastline.",
      sources: [
        "https://www.latamairlines.com/ec/es",
        "https://en.wikipedia.org/wiki/LATAM_Ecuador",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Paraguay
  PY: [
    {
      id: "py-paranair",
      countryCode: "PY",
      name: "Paranair",
      iata: "ZP",
      icao: "AZP",
      founded: 2015,
      alliance: "None",
      hubs: ["Silvio Pettirossi International Airport (ASU - Asunción)"],
      fleet: {
        total: 3,
        summary: "3 aircraft (Bombardier CRJ-200ER)",
      },
      logo: "/airline-logos/py/paranair.svg",
      logoExplainer:
        "Features a stylized flight chevron in red and deep navy blue. The red and navy colors reflect the Paraguayan national flag, while the name honors the mighty Paraná River that forms Paraguay's natural border and vital economic artery.",
      sources: [
        "https://www.paranair.com/",
        "https://en.wikipedia.org/wiki/Paranair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "py-latam-paraguay",
      countryCode: "PY",
      name: "LATAM Airlines Paraguay",
      iata: "PZ",
      icao: "LAP",
      founded: 1962,
      alliance: "None",
      hubs: ["Silvio Pettirossi International Airport (ASU - Asunción)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200 operated via LATAM Group)",
      },
      logo: "/airline-logos/py/latam-paraguay.svg",
      logoExplainer:
        "Carries the unified LATAM ribbon insignia outlining the South American continent, representing the airline's historic lineage from LAP (Líneas Aéreas Paraguayas) and its role connecting landlocked Paraguay with regional and intercontinental destinations.",
      sources: [
        "https://www.latamairlines.com/py/es",
        "https://en.wikipedia.org/wiki/LATAM_Paraguay",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Venezuela
  VE: [
    {
      id: "ve-conviasa",
      countryCode: "VE",
      name: "Conviasa",
      iata: "V0",
      icao: "VCV",
      founded: 2004,
      alliance: "None",
      hubs: [
        "Simón Bolívar International Airport (CCS - Maiquetía/Caracas)",
        "General José Antonio Anzoátegui International Airport (BLA - Barcelona)",
      ],
      fleet: {
        total: 16,
        summary: "16 aircraft (Airbus A340-200, A340-300, A340-600; Embraer E190; Cessna 208 Caravan; ATR 42-400)",
      },
      logo: "/airline-logos/ve/conviasa.svg",
      logoExplainer:
        "Features a bold orange-and-blue aerodynamic design with a stylized wing in supersonic flight. Warm orange reflects Venezuelan sunshine, tropical warmth, and vitality, while deep blue represents the expansive Caribbean skies.",
      sources: [
        "https://www.conviasa.aero/",
        "https://en.wikipedia.org/wiki/Conviasa",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ve-laser-airlines",
      countryCode: "VE",
      name: "Laser Airlines",
      iata: "QL",
      icao: "LER",
      founded: 1993,
      alliance: "None",
      hubs: ["Simón Bolívar International Airport (CCS - Caracas)"],
      fleet: {
        total: 11,
        summary: "11 aircraft (McDonnell Douglas MD-82, MD-83; Airbus A320-200)",
      },
      logo: "/airline-logos/ve/laser-airlines.svg",
      logoExplainer:
        "Features a green and yellow emblem depicting stylized aerodynamic wings emerging outward from a central circular focus, symbolizing punctuality, executive precision, and warmth in Venezuelan commercial aviation.",
      sources: [
        "https://www.laserairlines.com/",
        "https://en.wikipedia.org/wiki/Laser_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Guyana
  GY: [
    {
      id: "gy-trans-guyana-airways",
      countryCode: "GY",
      name: "Trans Guyana Airways",
      iata: "TGY",
      icao: "TGY",
      founded: 1956,
      alliance: "None",
      hubs: ["Eugene F. Correia International Airport (OGL - Ogle / Georgetown)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Beechcraft 1900D, Cessna 208B Grand Caravan, Britten-Norman BN-2 Islander)",
      },
      logo: "/airline-logos/gy/trans-guyana-airways.png",
      logoExplainer:
        "Features the letters TGA set inside a bold winged shield insignia with green and golden stripes, echoing the national colors of Guyana's 'Golden Arrowhead' flag and symbolizing aerial connectivity between coastal Georgetown and interior rainforests.",
      sources: [
        "https://transguyana.net/",
        "https://en.wikipedia.org/wiki/Trans_Guyana_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Suriname
  SR: [
    {
      id: "sr-surinam-airways",
      countryCode: "SR",
      name: "Surinam Airways (SLM)",
      iata: "PY",
      icao: "SLM",
      founded: 1953,
      alliance: "None",
      hubs: ["Johan Adolf Pengel International Airport (PBM - Paramaribo/Zanderij)"],
      fleet: {
        total: 3,
        summary: "3 aircraft (Boeing 737-800, Airbus A340-300)",
      },
      logo: "/airline-logos/sr/surinam-airways.png",
      logoExplainer:
        "Features a soaring red Sabaku bird (little blue heron native to Suriname's coastal wetlands) cresting above royal blue water waves, symbolizing grace, resilience, and Surinamese national pride connecting South America with Europe.",
      sources: [
        "https://www.flyslm.com/",
        "https://en.wikipedia.org/wiki/Surinam_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sr-gum-air",
      countryCode: "SR",
      name: "Gum Air",
      iata: "GUM",
      icao: "GUM",
      founded: 1964,
      alliance: "None",
      hubs: ["Zorg en Hoop Airport (ORG - Paramaribo)"],
      fleet: {
        total: 11,
        summary: "11 aircraft (Cessna 208 Grand Caravan, de Havilland Canada DHC-6 Twin Otter, Cessna 206)",
      },
      logo: "/airline-logos/sr/gum-air.svg",
      logoExplainer:
        "Features a bold green and golden wordmark with a winged motif above the typography, reflecting the lush Amazonian rainforest canopy of Suriname and the Gummels family's pioneering aviation legacy linking remote interior airstrips.",
      sources: [
        "https://en.wikipedia.org/wiki/Gum_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Uruguay
  UY: [
    {
      id: "uy-pluna",
      countryCode: "UY",
      name: "PLUNA",
      iata: "PU",
      icao: "PUA",
      founded: 1936,
      alliance: "None",
      hubs: ["Carrasco International Airport (MVD - Montevideo)"],
      fleet: {
        total: 13,
        summary: "13 aircraft at peak operations (Bombardier CRJ900 NextGen; historically Boeing 737-200/300, Boeing 767-300ER)",
      },
      logo: "/airline-logos/uy/pluna.svg",
      logoExplainer:
        "Founded in 1936 as Primeras Líneas Uruguayas de Navegación Aérea, PLUNA served as Uruguay's national flag carrier for 76 years until 2012. The distinctive emblem depicts a stylized azure bird in soaring flight, symbolizing Uruguayan national identity across the Río de la Plata and the South Atlantic.",
      sources: [
        "https://en.wikipedia.org/wiki/PLUNA",
        "https://aviation-safety.net/database/operator/airline.php?var=5682",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Denmark
  DK: [
    {
      id: "dk-sas",
      countryCode: "DK",
      name: "Scandinavian Airlines (SAS)",
      iata: "SK",
      icao: "SAS",
      founded: 1946,
      alliance: "SkyTeam",
      hubs: ["Copenhagen Airport (CPH - Kastrup)", "Stockholm Arlanda Airport (ARN)", "Oslo Airport, Gardermoen (OSL)"],
      fleet: {
        total: 134,
        summary: "134 aircraft (Airbus A319-100, A320-200, A320neo, A321LR, A330-300, A350-900; ATR 72-600; Embraer E195)",
      },
      logo: "/airline-logos/dk/sas.svg",
      logoExplainer:
        "Originally established in 1946 as the multi-national flag carrier of Denmark, Norway, and Sweden, SAS uses an iconic royal blue logotype featuring the italicized lower-case serif 'sas'. Designed to symbolize shared Scandinavian unity, royal patronage, and clean modernist functionalism.",
      sources: [
        "https://www.flysas.com/",
        "https://en.wikipedia.org/wiki/Scandinavian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "dk-sunclass-airlines",
      countryCode: "DK",
      name: "Sunclass Airlines",
      iata: "DK",
      icao: "VKG",
      founded: 1994,
      alliance: "None",
      hubs: ["Copenhagen Airport (CPH)", "Billund Airport (BLL)", "Stockholm Arlanda Airport (ARN)", "Oslo Airport (OSL)"],
      fleet: {
        total: 11,
        summary: "11 aircraft (Airbus A321-200, A321neo, A330-300, A330-900neo)",
      },
      logo: "/airline-logos/dk/sunclass-airlines.svg",
      logoExplainer:
        "Features a modern Nordic typographic wordmark alongside a radiant golden-yellow stylized sunburst emblem, reflecting warmth, Scandinavian vacation leisure travel, and sun holiday hospitality across the Mediterranean, Caribbean, and Canary Islands.",
      sources: [
        "https://www.sunclassairlines.dk/",
        "https://en.wikipedia.org/wiki/Sunclass_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Norway
  NO: [
    {
      id: "no-norwegian-air-shuttle",
      countryCode: "NO",
      name: "Norwegian Air Shuttle",
      iata: "DY",
      icao: "NAX",
      founded: 1993,
      alliance: "None",
      hubs: ["Oslo Airport, Gardermoen (OSL)", "Bergen Airport, Flesland (BGO)", "Trondheim Airport (TRD)", "Stavanger Airport (SVG)"],
      fleet: {
        total: 87,
        summary: "87 aircraft (Boeing 737-800, Boeing 737 MAX 8)",
      },
      logo: "/airline-logos/no/norwegian-air-shuttle.svg",
      logoExplainer:
        "Features a modern crimson wordmark with a distinctive dynamic red aircraft nosecone motif. Norwegian is internationally celebrated for its 'Tail Fin Heroes' tradition, honoring prominent Nordic pioneers, scientists, artists, and explorers on its vertical stabilizers.",
      sources: [
        "https://www.norwegian.com/",
        "https://en.wikipedia.org/wiki/Norwegian_Air_Shuttle",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "no-wideroe",
      countryCode: "NO",
      name: "Widerøe",
      iata: "WF",
      icao: "WIF",
      founded: 1934,
      alliance: "None",
      hubs: ["Bergen Airport, Flesland (BGO)", "Bodø Airport (BOO)", "Oslo Airport, Gardermoen (OSL)", "Tromsø Airport (TOS)"],
      fleet: {
        total: 49,
        summary: "49 aircraft (De Havilland Canada Dash 8-100, Dash 8-200, Dash 8-300, Dash 8-Q400; Embraer E190-E2)",
      },
      logo: "/airline-logos/no/wideroe.svg",
      logoExplainer:
        "Features a vibrant emerald-green bird wing emblem, symbolizing Widerøe's indispensable role as Norway's coastal and regional lifeline, serving over 40 short-field mountain and Arctic runway communities since 1934.",
      sources: [
        "https://www.wideroe.no/",
        "https://en.wikipedia.org/wiki/Wider%C3%B8e",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Sweden
  SE: [
    {
      id: "se-sas",
      countryCode: "SE",
      name: "Scandinavian Airlines (SAS)",
      iata: "SK",
      icao: "SAS",
      founded: 1946,
      alliance: "SkyTeam",
      hubs: ["Stockholm Arlanda Airport (ARN)", "Copenhagen Airport (CPH)", "Oslo Airport, Gardermoen (OSL)"],
      fleet: {
        total: 134,
        summary: "134 aircraft (Airbus A319-100, A320-200, A320neo, A321LR, A330-300, A350-900; ATR 72-600; Embraer E195)",
      },
      logo: "/airline-logos/se/sas.svg",
      logoExplainer:
        "Tri-national flag carrier representing Sweden, Denmark, and Norway, headquartered in Solna (Stockholm). The refined royal blue 'sas' wordmark embodies clean Scandinavian functionalism, technical excellence, and regional unity.",
      sources: [
        "https://www.flysas.com/",
        "https://en.wikipedia.org/wiki/Scandinavian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "se-braathens-regional-airlines",
      countryCode: "SE",
      name: "Braathens Regional Airlines (BRA)",
      iata: "TF",
      icao: "BRX",
      founded: 2016,
      alliance: "None",
      hubs: ["Stockholm Bromma Airport (BMA)", "Stockholm Arlanda Airport (ARN)", "Gothenburg Landvetter Airport (GOT)"],
      fleet: {
        total: 17,
        summary: "17 aircraft (ATR 72-600, Airbus A319-100, Airbus A320-200)",
      },
      logo: "/airline-logos/se/braathens-regional-airlines.svg",
      logoExplainer:
        "Features a clean geometric monogram with Swedish golden-yellow and deep navy accents, representing Swedish domestic business connectivity, sustainable regional aviation, and biofuel pioneering.",
      sources: [
        "https://www.flygbra.se/",
        "https://en.wikipedia.org/wiki/Braathens_Regional_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Finland
  FI: [
    {
      id: "fi-finnair",
      countryCode: "FI",
      name: "Finnair",
      iata: "AY",
      icao: "FIN",
      founded: 1923,
      alliance: "oneworld",
      hubs: ["Helsinki Airport (HEL - Vantaa)"],
      fleet: {
        total: 80,
        summary: "80 aircraft (Airbus A319-100, A320-200, A321-200, A330-300, A350-900; ATR 72-500; Embraer E190)",
      },
      logo: "/airline-logos/fi/finnair.svg",
      logoExplainer:
        "Features an ultramarine blue stylized forward-surging letter 'F' formed as an aerodynamic aircraft wing. The design reflects classic Finnish minimalism, clarity, and Helsinki's strategic geographic position as the shortest great-circle northern bridge between Europe and Asia.",
      sources: [
        "https://www.finnair.com/",
        "https://en.wikipedia.org/wiki/Finnair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fi-norra",
      countryCode: "FI",
      name: "Norra (Nordic Regional Airlines)",
      iata: "N7",
      icao: "WBA",
      founded: 2011,
      alliance: "None",
      hubs: ["Helsinki Airport (HEL - Vantaa)"],
      fleet: {
        total: 24,
        summary: "24 aircraft (ATR 72-500, Embraer E190 operated in partnership with Finnair)",
      },
      logo: "/airline-logos/fi/norra.svg",
      logoExplainer:
        "Features a modern Nordic wordmark in deep midnight blue typography with circular geometric accents, expressing reliability, northern punctuality, and domestic connectivity across Finnish Lapland and the Baltic rim.",
      sources: [
        "https://flynorra.com/",
        "https://en.wikipedia.org/wiki/Nordic_Regional_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Iceland
  IS: [
    {
      id: "is-icelandair",
      countryCode: "IS",
      name: "Icelandair",
      iata: "FI",
      icao: "ICE",
      founded: 1937,
      alliance: "None",
      hubs: ["Keflavík International Airport (KEF - Reykjavík)", "Reykjavík Airport (RVK)"],
      fleet: {
        total: 45,
        summary: "45 aircraft (Boeing 737 MAX 8, 737 MAX 9, 757-200, 757-300, 767-300ER; De Havilland Canada Dash 8)",
      },
      logo: "/airline-logos/is/icelandair.svg",
      logoExplainer:
        "Features a modern navy blue crest with an aerodynamic wing insignia composed of vibrant golden-yellow (representing geothermal heat and volcanic magma) and bright sky blue (representing glacial ice and northern skies), embodying Iceland's land of fire and ice.",
      sources: [
        "https://www.icelandair.com/",
        "https://en.wikipedia.org/wiki/Icelandair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "is-play",
      countryCode: "IS",
      name: "Play",
      iata: "OG",
      icao: "FPY",
      founded: 2019,
      alliance: "None",
      hubs: ["Keflavík International Airport (KEF - Reykjavík)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Airbus A320neo, Airbus A321neo)",
      },
      logo: "/airline-logos/is/play.svg",
      logoExplainer:
        "Features a bold and playful scarlet-red wordmark ('PLAY') in rounded geometric typography, symbolizing high energy, accessible transatlantic travel, and joyful adventure connecting North America with Europe via Iceland.",
      sources: [
        "https://www.flyplay.com/",
        "https://en.wikipedia.org/wiki/Play_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ireland
  IE: [
    {
      id: "ie-aer-lingus",
      countryCode: "IE",
      name: "Aer Lingus",
      iata: "EI",
      icao: "EIN",
      founded: 1936,
      alliance: "None",
      hubs: ["Dublin Airport (DUB)", "Cork Airport (ORK)"],
      fleet: {
        total: 58,
        summary: "58 aircraft (Airbus A320-200, A320neo, A321LR, A321XLR, A330-200, A330-300)",
      },
      logo: "/airline-logos/ie/aer-lingus.svg",
      logoExplainer:
        "Features the legendary Irish shamrock (*seamróg*) rendered in vibrant shades of Irish green. The shamrock has adorned Aer Lingus aircraft since its 1936 inaugural flight, symbolizing Celtic heritage, good fortune, and world-renowned Irish hospitality.",
      sources: [
        "https://www.aerlingus.com/",
        "https://en.wikipedia.org/wiki/Aer_Lingus",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ie-ryanair",
      countryCode: "IE",
      name: "Ryanair",
      iata: "FR",
      icao: "RYR",
      founded: 1984,
      alliance: "None",
      hubs: ["Dublin Airport (DUB)", "London Stansted Airport (STN)"],
      fleet: {
        total: 590,
        summary: "590+ aircraft (Boeing 737-800, Boeing 737 MAX 8-200, Boeing 737-700; Airbus A320-200 via Lauda Europe)",
      },
      logo: "/airline-logos/ie/ryanair.svg",
      logoExplainer:
        "Features a golden winged harp—Ireland's historic heraldic symbol—sweeping dynamically forward inside an aerodynamic motif on a deep royal blue background, representing the pioneer that revolutionized low-cost air travel across Europe.",
      sources: [
        "https://www.ryanair.com/",
        "https://en.wikipedia.org/wiki/Ryanair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Latvia
  LV: [
    {
      id: "lv-airbaltic",
      countryCode: "LV",
      name: "airBaltic",
      iata: "BT",
      icao: "BTI",
      founded: 1995,
      alliance: "None",
      hubs: ["Riga International Airport (RIX)"],
      fleet: {
        total: 48,
        summary: "48 aircraft (Airbus A220-300 exclusive single-type fleet)",
      },
      logo: "/airline-logos/lv/airbaltic.svg",
      logoExplainer:
        "Features modern lowercase dark navy typography complemented by the airline's trademark electric lime-green vertical tail livery, reflecting ecological efficiency, Baltic pine forests, and modern aeronautical innovation with an all-Airbus A220 fleet.",
      sources: [
        "https://www.airbaltic.com/",
        "https://en.wikipedia.org/wiki/AirBaltic",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Estonia
  EE: [
    {
      id: "ee-airbaltic",
      countryCode: "EE",
      name: "airBaltic Estonia",
      iata: "BT",
      icao: "BTI",
      founded: 1995,
      alliance: "None",
      hubs: ["Lennart Meri Tallinn Airport (TLL)"],
      fleet: {
        total: 48,
        summary: "48 aircraft (Airbus A220-300, including dedicated aircraft in special blue-black-white Estonian flag livery)",
      },
      logo: "/airline-logos/ee/airbaltic.svg",
      logoExplainer:
        "As the principal carrier connecting Estonia, airBaltic operates a key primary base in Tallinn, flying designated Airbus A220-300 aircraft painted in the Estonian national blue-black-white tricolor alongside its signature lime-green tail design.",
      sources: [
        "https://www.airbaltic.com/",
        "https://en.wikipedia.org/wiki/AirBaltic",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ee-nyxair",
      countryCode: "EE",
      name: "NyxAir",
      iata: "OJ",
      icao: "NYX",
      founded: 2017,
      alliance: "None",
      hubs: ["Lennart Meri Tallinn Airport (TLL)", "Kuressaare Airport (URE)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (ATR 42-500, Saab 340, Saab 2000)",
      },
      logo: "/airline-logos/ee/nyxair.png",
      logoExplainer:
        "Features an orange aerodynamic wing and speed chevron integrated into dark navy typography, representing vital regional domestic air connectivity between Tallinn, Kuressaare on Saaremaa island, and Kärdla on Hiiumaa island.",
      sources: [
        "https://nyx.ee/",
        "https://en.wikipedia.org/wiki/NyxAir",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Lithuania
  LT: [
    {
      id: "lt-airbaltic",
      countryCode: "LT",
      name: "airBaltic Lithuania",
      iata: "BT",
      icao: "BTI",
      founded: 1995,
      alliance: "None",
      hubs: ["Vilnius International Airport (VNO)"],
      fleet: {
        total: 48,
        summary: "48 aircraft (Airbus A220-300, including dedicated aircraft in special yellow-green-red Lithuanian flag livery)",
      },
      logo: "/airline-logos/lt/airbaltic.svg",
      logoExplainer:
        "airBaltic operates a designated primary base at Vilnius International Airport, connecting Lithuania across Europe with an Airbus A220-300 fleet featuring a special custom aircraft proudly bearing the Lithuanian yellow-green-red national flag livery.",
      sources: [
        "https://www.airbaltic.com/",
        "https://en.wikipedia.org/wiki/AirBaltic",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "lt-getjet-airlines",
      countryCode: "LT",
      name: "GetJet Airlines",
      iata: "GW",
      icao: "GJT",
      founded: 2016,
      alliance: "None",
      hubs: ["Vilnius International Airport (VNO)"],
      fleet: {
        total: 16,
        summary: "16 aircraft (Airbus A320-200, Airbus A321-200; Boeing 737-800)",
      },
      logo: "/airline-logos/lt/getjet-airlines.png",
      logoExplainer:
        "Features a modern charcoal-and-orange typographic wordmark paired with a forward-pointing aerodynamic delta chevron, symbolizing rapid operational deployment, charter excellence, and global ACMI passenger service.",
      sources: [
        "https://getjet.aero/",
        "https://en.wikipedia.org/wiki/GetJet_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Germany
  DE: [
    {
      id: "de-lufthansa",
      countryCode: "DE",
      name: "Lufthansa",
      iata: "LH",
      icao: "DLH",
      founded: 1953,
      alliance: "Star Alliance",
      hubs: ["Frankfurt Airport (FRA)", "Munich Airport (MUC)"],
      fleet: {
        total: 330,
        summary: "330 aircraft (Airbus A319, A320, A320neo, A321, A330-300, A340-300, A340-600, A350-900, A380-800; Boeing 747-400, 747-8, 777, 787-9)",
      },
      logo: "/airline-logos/de/lufthansa.svg",
      logoExplainer:
        "The legendary encircled crane in flight (*der Kranich*) was originally created by graphic designer Otto Firle in 1918 and refined by Bauhaus luminary Otl Aicher in 1962. It represents graceful aerodynamic soaring, premium engineering reliability, and German aeronautical tradition.",
      sources: [
        "https://www.lufthansa.com/",
        "https://en.wikipedia.org/wiki/Lufthansa",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "de-condor",
      countryCode: "DE",
      name: "Condor",
      iata: "DE",
      icao: "CFG",
      founded: 1955,
      alliance: "None",
      hubs: ["Frankfurt Airport (FRA)", "Düsseldorf Airport (DUS)"],
      fleet: {
        total: 55,
        summary: "55 aircraft (Airbus A320-200, A320neo, A321-200, A321neo, A330-900neo)",
      },
      logo: "/airline-logos/de/condor.svg",
      logoExplainer:
        "Features a modern lowercase wordmark with an iconic condensed signet. Condor's globally acclaimed brand identity, inspired by holiday parasols, beach towels, and ice cream stalls, celebrates joyful vacation freedom across sunny worldwide destinations.",
      sources: [
        "https://www.condor.com/",
        "https://en.wikipedia.org/wiki/Condor_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "de-eurowings",
      countryCode: "DE",
      name: "Eurowings",
      iata: "EW",
      icao: "EWG",
      founded: 1993,
      alliance: "None",
      hubs: [
        "Düsseldorf Airport (DUS)",
        "Cologne Bonn Airport (CGN)",
        "Hamburg Airport (HAM)",
        "Stuttgart Airport (STR)",
        "Berlin Brandenburg Airport (BER)",
      ],
      fleet: {
        total: 100,
        summary: "100 aircraft (Airbus A319-100, A320-200, A320neo, A321-200, A321neo)",
      },
      logo: "/airline-logos/de/eurowings.svg",
      logoExplainer:
        "Features a distinctive burgundy-magenta and cyan-blue aerodynamic forward-slanted 'E' wing mark, conveying speed, youthful vitality, and value-focused pan-European short- and medium-haul travel.",
      sources: [
        "https://www.eurowings.com/",
        "https://en.wikipedia.org/wiki/Eurowings",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Netherlands
  NL: [
    {
      id: "nl-klm",
      countryCode: "NL",
      name: "KLM Royal Dutch Airlines",
      iata: "KL",
      icao: "KLM",
      founded: 1919,
      alliance: "SkyTeam",
      hubs: ["Amsterdam Airport Schiphol (AMS)"],
      fleet: {
        total: 110,
        summary: "110 aircraft (Boeing 737-700/800/900, 777-200ER/300ER, 787-9/10; Airbus A321neo, A330-200/300)",
      },
      logo: "/airline-logos/nl/klm.svg",
      logoExplainer:
        "Created by British design master F.H.K. Henrion in 1961, the iconic Dutch royal crown consists of four crisp circular dots, a central cross, and the bold letters KLM in royal Delft blue. Granted the 'Royal' (Koninklijke) predicate by Queen Wilhelmina in 1919, it symbolizes Dutch national pride and global pioneering leadership.",
      sources: [
        "https://www.klm.com/",
        "https://en.wikipedia.org/wiki/KLM",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "nl-transavia",
      countryCode: "NL",
      name: "Transavia",
      iata: "HV",
      icao: "TRA",
      founded: 1965,
      alliance: "None",
      hubs: ["Amsterdam Airport Schiphol (AMS)", "Rotterdam The Hague Airport (RTM)", "Eindhoven Airport (EIN)"],
      fleet: {
        total: 46,
        summary: "46 aircraft (Boeing 737-800; Airbus A321neo)",
      },
      logo: "/airline-logos/nl/transavia.svg",
      logoExplainer:
        "Features a vibrant green and sky-blue wordmark with an iconic letter 't' embedded in playful graphic badges, reflecting friendly hospitality, approachable warmth, and accessible European vacation holidays.",
      sources: [
        "https://www.transavia.com/",
        "https://en.wikipedia.org/wiki/Transavia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Belgium
  BE: [
    {
      id: "be-brussels-airlines",
      countryCode: "BE",
      name: "Brussels Airlines",
      iata: "SN",
      icao: "BEL",
      founded: 2006,
      alliance: "Star Alliance",
      hubs: ["Brussels Airport (BRU - Zaventem)"],
      fleet: {
        total: 44,
        summary: "44 aircraft (Airbus A319-100, A320-200, A320neo, A330-300)",
      },
      logo: "/airline-logos/be/brussels-airlines.svg",
      logoExplainer:
        "Features nine vibrant red dots of varied sizes arranged into a dynamic, forward-stepping lowercase letter 'b', symbolizing Belgian creativity, hospitality, and its pivotal crossroads hub uniting Europe and sub-Saharan Africa.",
      sources: [
        "https://www.brusselsairlines.com/",
        "https://en.wikipedia.org/wiki/Brussels_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "be-tui-fly-belgium",
      countryCode: "BE",
      name: "TUI fly Belgium",
      iata: "TB",
      icao: "JAF",
      founded: 2003,
      alliance: "None",
      hubs: [
        "Brussels Airport (BRU)",
        "Brussels South Charleroi Airport (CRL)",
        "Liège Airport (LGG)",
        "Ostend-Bruges Airport (OST)",
      ],
      fleet: {
        total: 27,
        summary: "27 aircraft (Boeing 737-800, 737 MAX 8; Embraer E195-E2; Boeing 787-8 Dreamliner)",
      },
      logo: "/airline-logos/be/tui-fly-belgium.svg",
      logoExplainer:
        "Features the universally recognized scarlet-red 'TUI Smile' emblem against a deep cyan-blue background, representing holiday happiness, leisure travel sunshine, and welcoming European hospitality.",
      sources: [
        "https://www.tuifly.be/",
        "https://en.wikipedia.org/wiki/TUI_fly_Belgium",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Austria
  AT: [
    {
      id: "at-austrian-airlines",
      countryCode: "AT",
      name: "Austrian Airlines",
      iata: "OS",
      icao: "AUA",
      founded: 1957,
      alliance: "Star Alliance",
      hubs: ["Vienna International Airport (VIE - Schwechat)"],
      fleet: {
        total: 68,
        summary: "68 aircraft (Airbus A320-200, A320neo, A321-100/200; Boeing 767-300ER, 777-200ER, 787-9 Dreamliner)",
      },
      logo: "/airline-logos/at/austrian-airlines.svg",
      logoExplainer:
        "Features the iconic aerodynamic red arrow known as the 'Austrian Arrow', honoring Austria's red-white-red national colors while symbolizing precision, forward thrust, and Vienna's historic role as Europe's central gateway.",
      sources: [
        "https://www.austrian.com/",
        "https://en.wikipedia.org/wiki/Austrian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Switzerland
  CH: [
    {
      id: "ch-swiss",
      countryCode: "CH",
      name: "SWISS (Swiss International Air Lines)",
      iata: "LX",
      icao: "SWR",
      founded: 2002,
      alliance: "Star Alliance",
      hubs: ["Zurich Airport (ZRH - Kloten)", "Geneva Airport (GVA)"],
      fleet: {
        total: 90,
        summary: "90 aircraft (Airbus A220-100, A220-300, A320-200, A320neo, A321-100/200, A330-300, A340-300, A350-900; Boeing 777-300ER)",
      },
      logo: "/airline-logos/ch/swiss.svg",
      logoExplainer:
        "Features a red aircraft tailfin bearing the iconic white Swiss Cross, representing Switzerland's timeless national hallmarks of precision engineering, neutrality, discretion, and world-class hospitality.",
      sources: [
        "https://www.swiss.com/",
        "https://en.wikipedia.org/wiki/Swiss_International_Air_Lines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ch-edelweiss-air",
      countryCode: "CH",
      name: "Edelweiss Air",
      iata: "WK",
      icao: "EDW",
      founded: 1995,
      alliance: "None",
      hubs: ["Zurich Airport (ZRH - Kloten)"],
      fleet: {
        total: 19,
        summary: "19 aircraft (Airbus A320-200, A340-300, A350-900)",
      },
      logo: "/airline-logos/ch/edelweiss-air.svg",
      logoExplainer:
        "Features the magnificent Alpine Edelweiss flower (*Leontopodium nivale*) emblazoned on a scarlet tailfin with a radiant golden center, symbolizing the untouched beauty of the Swiss Alps and premium leisure voyages.",
      sources: [
        "https://www.flyedelweiss.com/",
        "https://en.wikipedia.org/wiki/Edelweiss_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Luxembourg
  LU: [
    {
      id: "lu-luxair",
      countryCode: "LU",
      name: "Luxair",
      iata: "LG",
      icao: "LUX",
      founded: 1961,
      alliance: "None",
      hubs: ["Luxembourg Findel Airport (LUX)"],
      fleet: {
        total: 21,
        summary: "21 aircraft (Boeing 737-700, 737-800, 737 MAX 8; De Havilland Canada Dash 8-Q400)",
      },
      logo: "/airline-logos/lu/luxair.svg",
      logoExplainer:
        "Features a modern cyan-blue and dark navy typographic wordmark accented with a forward-sweeping aerodynamic wing streak, expressing Luxembourg's strategic role as an international European financial and cultural crossroads.",
      sources: [
        "https://www.luxair.lu/",
        "https://en.wikipedia.org/wiki/Luxair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Spain
  ES: [
    {
      id: "es-iberia",
      countryCode: "ES",
      name: "Iberia",
      iata: "IB",
      icao: "IBE",
      founded: 1927,
      alliance: "oneworld",
      hubs: ["Adolfo Suárez Madrid-Barajas Airport (MAD)", "Josep Tarradellas Barcelona-El Prat Airport (BCN)"],
      fleet: {
        total: 90,
        summary: "90 aircraft (Airbus A319-100, A320-200, A320neo, A321-200, A321neo, A321XLR, A330-200, A330-300, A350-900)",
      },
      logo: "/airline-logos/es/iberia.svg",
      logoExplainer:
        "Designed by Interbrand, the iconic red and golden-yellow dynamic tailfin emblem embodies the Spanish national flag (*la Rojigualda*). The sweeping curve evokes the warmth, vitality, and passion of Spanish culture while honoring its historical leadership bridging Europe and Latin America.",
      sources: [
        "https://www.iberia.com/",
        "https://en.wikipedia.org/wiki/Iberia_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "es-vueling",
      countryCode: "ES",
      name: "Vueling",
      iata: "VY",
      icao: "VLG",
      founded: 2004,
      alliance: "None",
      hubs: [
        "Josep Tarradellas Barcelona-El Prat Airport (BCN)",
        "Rome Fiumicino Airport (FCO)",
        "Paris Orly Airport (ORY)",
      ],
      fleet: {
        total: 125,
        summary: "125 aircraft (Airbus A319-100, A320-200, A320neo, A321-200, A321neo)",
      },
      logo: "/airline-logos/es/vueling.svg",
      logoExplainer:
        "Features friendly graphite-grey lowercase typography accented by a sunny golden-yellow dot over the 'i' and matching icon, derived from the Spanish word *vuelo* (flight) and embodying approachable, accessible Mediterranean travel.",
      sources: [
        "https://www.vueling.com/",
        "https://en.wikipedia.org/wiki/Vueling",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "es-air-europa",
      countryCode: "ES",
      name: "Air Europa",
      iata: "UX",
      icao: "AEA",
      founded: 1986,
      alliance: "SkyTeam",
      hubs: ["Adolfo Suárez Madrid-Barajas Airport (MAD)"],
      fleet: {
        total: 54,
        summary: "54 aircraft (Boeing 737-800; Boeing 787-8, 787-9 Dreamliner)",
      },
      logo: "/airline-logos/es/air-europa.svg",
      logoExplainer:
        "Features an azure blue circular emblem containing a stylized white soaring bird in flight, signifying smooth transatlantic voyages connecting Madrid with the Caribbean and the Americas.",
      sources: [
        "https://www.aireuropa.com/",
        "https://en.wikipedia.org/wiki/Air_Europa",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Portugal
  PT: [
    {
      id: "pt-tap-air-portugal",
      countryCode: "PT",
      name: "TAP Air Portugal",
      iata: "TP",
      icao: "TAP",
      founded: 1945,
      alliance: "Star Alliance",
      hubs: ["Humberto Delgado Airport (LIS - Lisbon)", "Francisco Sá Carneiro Airport (OPO - Porto)"],
      fleet: {
        total: 80,
        summary: "80 aircraft (Airbus A319-100, A320-200, A320neo, A321-200, A321neo, A321LR, A330-200, A330-900neo)",
      },
      logo: "/airline-logos/pt/tap-air-portugal.svg",
      logoExplainer:
        "Features overlapping geometric typography in Portugal's national green and red colors. The design symbolizes Portugal's historic seafaring age of discovery, welcoming Portuguese warmth, and modern transatlantic routes bridging Europe, Africa, and South America.",
      sources: [
        "https://www.flytap.com/",
        "https://en.wikipedia.org/wiki/TAP_Air_Portugal",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "pt-portugalia-airlines",
      countryCode: "PT",
      name: "Portugália Airlines (TAP Express)",
      iata: "NI",
      icao: "PGA",
      founded: 1988,
      alliance: "Star Alliance",
      hubs: ["Humberto Delgado Airport (LIS - Lisbon)", "Francisco Sá Carneiro Airport (OPO - Porto)"],
      fleet: {
        total: 19,
        summary: "19 aircraft (Embraer E190, Embraer E195)",
      },
      logo: "/airline-logos/pt/portugalia-airlines.svg",
      logoExplainer:
        "Features a stylized swallow in flight rendered in deep Portuguese oceanic blue and red. In Portuguese lore, the swallow (*andorinha*) represents loyalty, home, and safe return across the seas.",
      sources: [
        "https://www.flytap.com/",
        "https://en.wikipedia.org/wiki/Portug%C3%A1lia_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Italy
  IT: [
    {
      id: "it-ita-airways",
      countryCode: "IT",
      name: "ITA Airways",
      iata: "AZ",
      icao: "ITY",
      founded: 2020,
      alliance: "SkyTeam",
      hubs: ["Rome Fiumicino Airport (FCO - Leonardo da Vinci)", "Milan Linate Airport (LIN)"],
      fleet: {
        total: 100,
        summary: "100 aircraft (Airbus A220-100, A220-300, A320-200, A320neo, A321neo, A330-200, A330-900neo, A350-900)",
      },
      logo: "/airline-logos/it/ita-airways.svg",
      logoExplainer:
        "Features dark navy typography with the stem of the letter 'A' dynamically painted with the green, white, and red Italian tricolor (*il Tricolore*). The emblem pairs with the airline's shimmering Savoy blue (*azzurro*) aircraft fuselages, paying tribute to Italy's cultural, artistic, and athletic heritage.",
      sources: [
        "https://www.ita-airways.com/",
        "https://en.wikipedia.org/wiki/ITA_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "it-neos",
      countryCode: "IT",
      name: "Neos",
      iata: "NO",
      icao: "NOS",
      founded: 2001,
      alliance: "None",
      hubs: [
        "Milan Malpensa Airport (MXP)",
        "Rome Fiumicino Airport (FCO)",
        "Verona Villafranca Airport (VRN)",
      ],
      fleet: {
        total: 16,
        summary: "16 aircraft (Boeing 737-800, Boeing 737 MAX 8; Boeing 787-9 Dreamliner)",
      },
      logo: "/airline-logos/it/neos.svg",
      logoExplainer:
        "Features a graceful italic wordmark adorned with a sweeping turquoise and Mediterranean blue wave motif, evoking the refreshing sea breezes, Mediterranean warmth, and carefree leisure voyages.",
      sources: [
        "https://www.neosair.it/",
        "https://en.wikipedia.org/wiki/Neos_(airline)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Greece
  GR: [
    {
      id: "gr-aegean-airlines",
      countryCode: "GR",
      name: "Aegean Airlines",
      iata: "A3",
      icao: "AEE",
      founded: 1999,
      alliance: "Star Alliance",
      hubs: [
        "Athens International Airport (ATH - Eleftherios Venizelos)",
        "Thessaloniki Airport (SKG - Makedonia)",
      ],
      fleet: {
        total: 62,
        summary: "62 aircraft (Airbus A320-200, A320neo, A321-200, A321neo)",
      },
      logo: "/airline-logos/gr/aegean-airlines.svg",
      logoExplainer:
        "Features an elegant gull-wing symbol depicting two seagulls merged in harmonious upward flight. Rendered in Aegean blue and Aegean silver, the design draws inspiration from classic Greek symmetry, the azure waters of the Aegean Sea, and Mediterranean clarity.",
      sources: [
        "https://en.aegeanair.com/",
        "https://en.wikipedia.org/wiki/Aegean_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "gr-sky-express",
      countryCode: "GR",
      name: "SKY express",
      iata: "GQ",
      icao: "SEH",
      founded: 2005,
      alliance: "None",
      hubs: ["Athens International Airport (ATH)", "Heraklion International Airport (HER - Nikos Kazantzakis)"],
      fleet: {
        total: 27,
        summary: "27 aircraft (Airbus A320neo, A321neo; ATR 42-500, ATR 72-600)",
      },
      logo: "/airline-logos/gr/sky-express.svg",
      logoExplainer:
        "Features a clean Aegean blue and bright sunshine-orange lowercase logotype accented by two dynamic circular focal points, symbolizing joyful island hopping across Greece's Cyclades, Dodecanese, and Ionian archipelagos.",
      sources: [
        "https://www.skyexpress.gr/",
        "https://en.wikipedia.org/wiki/Sky_Express_(Greece)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Poland
  PL: [
    {
      id: "pl-lot-polish-airlines",
      countryCode: "PL",
      name: "LOT Polish Airlines",
      iata: "LO",
      icao: "LOT",
      founded: 1928,
      alliance: "Star Alliance",
      hubs: ["Warsaw Chopin Airport (WAW)"],
      fleet: {
        total: 75,
        summary: "75 aircraft (Boeing 737-800, 737 MAX 8, 787-8, 787-9 Dreamliner; Embraer E170, E175, E190, E195, E195-E2)",
      },
      logo: "/airline-logos/pl/lot-polish-airlines.svg",
      logoExplainer:
        "The iconic encircled soaring crane (*żuraw*) was designed by prominent visual artist Tadeusz Gronowski in 1929 after winning an international design competition. It has flown unchanged for nearly a century as a symbol of Polish technical excellence, endurance, and soaring freedom.",
      sources: [
        "https://www.lot.com/",
        "https://en.wikipedia.org/wiki/LOT_Polish_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "pl-enter-air",
      countryCode: "PL",
      name: "Enter Air",
      iata: "E4",
      icao: "ENT",
      founded: 2009,
      alliance: "None",
      hubs: ["Warsaw Chopin Airport (WAW)", "Katowice Airport (KTW)", "Poznań-Ławica Airport (POZ)"],
      fleet: {
        total: 28,
        summary: "28 aircraft (Boeing 737-800, Boeing 737 MAX 8)",
      },
      logo: "/airline-logos/pl/enter-air.svg",
      logoExplainer:
        "Features a modern orange and navy wordmark with a forward-facing speed chevron, reflecting Enter Air's standing as Poland's largest charter carrier connecting Polish travelers with Mediterranean and global holiday destinations.",
      sources: [
        "https://www.enterair.pl/",
        "https://en.wikipedia.org/wiki/Enter_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Czech Republic
  CZ: [
    {
      id: "cz-smartwings",
      countryCode: "CZ",
      name: "Smartwings",
      iata: "QS",
      icao: "TVS",
      founded: 1997,
      alliance: "None",
      hubs: ["Václav Havel Airport Prague (PRG)", "Brno-Tuřany Airport (BRQ)", "Leoš Janáček Airport Ostrava (OSR)"],
      fleet: {
        total: 35,
        summary: "35 aircraft (Boeing 737-700, 737-800, 737-900ER, 737 MAX 8)",
      },
      logo: "/airline-logos/cz/smartwings.svg",
      logoExplainer:
        "Features a vibrant orange and sky-blue disc containing a stylized soaring wing and compass pointer, expressing holiday cheer, European leisure connectivity, and navigational precision.",
      sources: [
        "https://www.smartwings.com/",
        "https://en.wikipedia.org/wiki/Smartwings",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "cz-czech-airlines",
      countryCode: "CZ",
      name: "Czech Airlines (ČSA)",
      iata: "OK",
      icao: "CSA",
      founded: 1923,
      alliance: "None",
      hubs: ["Václav Havel Airport Prague (PRG)"],
      fleet: {
        total: 6,
        summary: "6 aircraft (Airbus A220-300, Airbus A320-200)",
      },
      logo: "/airline-logos/cz/czech-airlines.svg",
      logoExplainer:
        "Features aerodynamic tricolor red and blue delta wings flanking the typography, reflecting the red, blue, and white of the Czech national flag and over 100 years of storied Czech aviation history.",
      sources: [
        "https://www.csa.cz/",
        "https://en.wikipedia.org/wiki/Czech_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Hungary
  HU: [
    {
      id: "hu-wizz-air",
      countryCode: "HU",
      name: "Wizz Air",
      iata: "W6",
      icao: "WZZ",
      founded: 2003,
      alliance: "None",
      hubs: [
        "Budapest Ferenc Liszt International Airport (BUD)",
        "Debrecen International Airport (DEB)",
        "London Luton Airport (LTN)",
        "Rome Fiumicino Airport (FCO)",
      ],
      fleet: {
        total: 220,
        summary: "220+ aircraft (Airbus A320-200, A320neo, A321-200, A321neo, A321XLR)",
      },
      logo: "/airline-logos/hu/wizz-air.svg",
      logoExplainer:
        "Features a signature vibrant electric magenta and violet typographic logotype with a stylized forward-surging letter 'W', symbolizing high-frequency, affordable, and accessible air travel across Europe, North Africa, and the Middle East.",
      sources: [
        "https://wizzair.com/",
        "https://en.wikipedia.org/wiki/Wizz_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Romania
  RO: [
    {
      id: "ro-tarom",
      countryCode: "RO",
      name: "TAROM",
      iata: "RO",
      icao: "ROT",
      founded: 1954,
      alliance: "SkyTeam",
      hubs: ["Henri Coandă International Airport (OTP - Otopeni / Bucharest)"],
      fleet: {
        total: 18,
        summary: "18 aircraft (Airbus A318-100; Boeing 737-700, 737-800, 737 MAX 8; ATR 72-500, ATR 72-600)",
      },
      logo: "/airline-logos/ro/tarom.svg",
      logoExplainer:
        "Features a golden-yellow stylized swallow (*rândunica*) in soaring flight set within a dark navy tailfin emblem. In Romanian culture, the swallow heralds springtime, hope, and swift safe navigation across distant skies.",
      sources: [
        "https://www.tarom.ro/",
        "https://en.wikipedia.org/wiki/TAROM",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ro-hisky",
      countryCode: "RO",
      name: "HiSky",
      iata: "H4",
      icao: "HYS",
      founded: 2020,
      alliance: "None",
      hubs: [
        "Henri Coandă International Airport (OTP - Bucharest)",
        "Cluj-Napoca International Airport (CLJ)",
        "Chișinău International Airport (RMO)",
      ],
      fleet: {
        total: 8,
        summary: "8 aircraft (Airbus A319-100, A320-200, A321neo LR, A330-200)",
      },
      logo: "/airline-logos/ro/hisky.svg",
      logoExplainer:
        "Features a bold navy blue aerodynamic flight arc and sleek modern typography, symbolizing rapid commercial growth, passenger comfort, and transatlantic direct services connecting Romania with the United States.",
      sources: [
        "https://hisky.aero/",
        "https://en.wikipedia.org/wiki/HiSky",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bulgaria
  BG: [
    {
      id: "bg-bulgaria-air",
      countryCode: "BG",
      name: "Bulgaria Air",
      iata: "FB",
      icao: "LZB",
      founded: 2002,
      alliance: "None",
      hubs: ["Sofia Airport (SOF)", "Varna Airport (VAR)"],
      fleet: {
        total: 15,
        summary: "15 aircraft (Airbus A220-100, A220-300, A319-100, A320-200; Embraer E190)",
      },
      logo: "/airline-logos/bg/bulgaria-air.svg",
      logoExplainer:
        "Features a stylized white soaring bird crest flanked by green and red wings, honoring the Bulgarian national tricolor (white, green, and red) and symbolizing Bulgarian sovereignty connecting the Balkan crossroads with Europe.",
      sources: [
        "https://www.air.bg/",
        "https://en.wikipedia.org/wiki/Bulgaria_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "bg-european-air-charter",
      countryCode: "BG",
      name: "European Air Charter",
      iata: "H4",
      icao: "BUC",
      founded: 2000,
      alliance: "None",
      hubs: ["Sofia Airport (SOF)", "Varna Airport (VAR)", "Burgas Airport (BOJ)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/bg/european-air-charter.png",
      logoExplainer:
        "Features a dynamic aerodynamic ribbon in European blue and Bulgarian national colors, representing holiday charter flights linking the Black Sea coast of Bulgaria with major cities across Germany, Austria, and Scandinavia.",
      sources: [
        "https://euaircharter.com/",
        "https://en.wikipedia.org/wiki/European_Air_Charter_(Bulgaria)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Croatia
  HR: [
    {
      id: "hr-croatia-airlines",
      countryCode: "HR",
      name: "Croatia Airlines",
      iata: "OU",
      icao: "CTN",
      founded: 1989,
      alliance: "Star Alliance",
      hubs: ["Zagreb Franjo Tuđman Airport (ZAG)", "Split Airport (SPU)", "Dubrovnik Airport (DBV)"],
      fleet: {
        total: 13,
        summary: "13 aircraft (Airbus A220-300, A319-100, A320-200; De Havilland Canada Dash 8-Q400)",
      },
      logo: "/airline-logos/hr/croatia-airlines.svg",
      logoExplainer:
        "Features the stylized Croatian national red-and-white checkerboard (šahovnica) reimagined in crisp geometric quadrilateral squares with sky-blue accents, symbolizing Adriatic maritime heritage and Croatia's sovereign aviation link to Europe and the Star Alliance network.",
      sources: [
        "https://www.croatiaairlines.com/",
        "https://en.wikipedia.org/wiki/Croatia_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "hr-trade-air",
      countryCode: "HR",
      name: "Trade Air",
      iata: "C3",
      icao: "TDR",
      founded: 1994,
      alliance: "None",
      hubs: ["Zagreb Franjo Tuđman Airport (ZAG)", "Osijek Airport (OSI)", "Rijeka Airport (RJK)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200, A319-100; Saab 340)",
      },
      logo: "/airline-logos/hr/trade-air.png",
      logoExplainer:
        "Features deep blue and crimson red aerodynamic typography accompanied by high-speed flight curves, reflecting Trade Air's role providing crucial domestic public service obligation (PSO) connectivity across Croatian regions and international ACMI charter services.",
      sources: [
        "https://www.trade-air.com/",
        "https://en.wikipedia.org/wiki/Trade_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Serbia
  RS: [
    {
      id: "rs-air-serbia",
      countryCode: "RS",
      name: "Air Serbia",
      iata: "JU",
      icao: "ASL",
      founded: 1927,
      alliance: "None",
      hubs: ["Belgrade Nikola Tesla Airport (BEG)", "Niš Constantine the Great Airport (INI)"],
      fleet: {
        total: 26,
        summary: "26 aircraft (Airbus A330-200, A320-200, A319-100; ATR 72-600; Embraer E195)",
      },
      logo: "/airline-logos/rs/air-serbia.svg",
      logoExplainer:
        "Designed by Serbian graphic designer Tamara Maksimović in 2013, the emblem features a modern stylized double-headed white eagle motif inspired by medieval Serbian heraldry and the national coat of arms, rendered with dynamic aerodynamic feathers in national red and deep blue.",
      sources: [
        "https://www.airserbia.com/",
        "https://en.wikipedia.org/wiki/Air_Serbia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Malta
  MT: [
    {
      id: "mt-km-malta-airlines",
      countryCode: "MT",
      name: "KM Malta Airlines",
      iata: "KM",
      icao: "KMM",
      founded: 2024,
      alliance: "None",
      hubs: ["Malta International Airport (MLA)"],
      fleet: {
        total: 8,
        summary: "8 aircraft (Airbus A320neo)",
      },
      logo: "/airline-logos/mt/km-malta-airlines.svg",
      logoExplainer:
        "Features the iconic eight-pointed Maltese Cross in vibrant Maltese red and pure white alongside modern charcoal typography, preserving the storied national heritage of the Knights Hospitaller while heralding a modern, sustainable new era for Malta's flag carrier.",
      sources: [
        "https://kmmaltairlines.com/",
        "https://en.wikipedia.org/wiki/KM_Malta_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Albania
  AL: [
    {
      id: "al-air-albania",
      countryCode: "AL",
      name: "Air Albania",
      iata: "ZB",
      icao: "ABN",
      founded: 2018,
      alliance: "None",
      hubs: ["Tirana International Airport Nënë Tereza (TIA)"],
      fleet: {
        total: 3,
        summary: "3 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/al/air-albania.svg",
      logoExplainer:
        "Features a stylized black double-headed eagle in swift aerodynamic flight set within a crimson circular roundel, directly invoking Albania's national flag and hero Gjergj Kastrioti Skanderbeg, symbolizing national pride and Adriatic connectivity.",
      sources: [
        "https://www.airalbania.com.al/",
        "https://en.wikipedia.org/wiki/Air_Albania",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cyprus
  CY: [
    {
      id: "cy-cyprus-airways",
      countryCode: "CY",
      name: "Cyprus Airways",
      iata: "CY",
      icao: "CYP",
      founded: 2016,
      alliance: "None",
      hubs: ["Larnaca International Airport (LCA)"],
      fleet: {
        total: 4,
        summary: "4 aircraft (Airbus A220-300, A320-200)",
      },
      logo: "/airline-logos/cy/cyprus-airways.svg",
      logoExplainer:
        "Features the graceful olive branch motif and deep Mediterranean olive green typography, evoking the ancient symbols of peace and Cypriot botanical heritage found on the national flag of Cyprus, paired with an elegant mouflon-inspired horn flight curve.",
      sources: [
        "https://www.cyprusairways.com/",
        "https://en.wikipedia.org/wiki/Cyprus_Airways_(2017)",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Turkey
  TR: [
    {
      id: "tr-turkish-airlines",
      countryCode: "TR",
      name: "Turkish Airlines",
      iata: "TK",
      icao: "THY",
      founded: 1933,
      alliance: "Star Alliance",
      hubs: ["Istanbul Airport (IST)", "Ankara Esenboğa Airport (ESB)"],
      fleet: {
        total: 456,
        summary: "456 aircraft (Airbus A319, A320, A320neo, A321, A321neo, A330-200/300, A350-900; Boeing 737-800, 737-900ER, 737 MAX 8/9, 777-300ER, 787-9)",
      },
      logo: "/airline-logos/tr/turkish-airlines.svg",
      logoExplainer:
        "Features the iconic wild goose emblem designed by Mesut Manioğlu in 1959, rendered in a crisp red circular roundel. The goose represents endurance, long-distance intercontinental flight, and the ability to fly at exceptionally high altitudes, symbolizing Turkish Airlines' global reach across more countries than any other airline.",
      sources: [
        "https://www.turkishairlines.com/",
        "https://en.wikipedia.org/wiki/Turkish_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "tr-pegasus-airlines",
      countryCode: "TR",
      name: "Pegasus Airlines",
      iata: "PC",
      icao: "PGT",
      founded: 1990,
      alliance: "None",
      hubs: ["Istanbul Sabiha Gökçen Airport (SAW)", "Antalya Airport (AYT)", "İzmir Adnan Menderes Airport (ADB)"],
      fleet: {
        total: 110,
        summary: "110 aircraft (Airbus A320-200, A320neo, A321neo; Boeing 737-800)",
      },
      logo: "/airline-logos/tr/pegasus-airlines.svg",
      logoExplainer:
        "Features a stylized winged horse Pegasus leaping forwards in vibrant red and warm yellow lettering, drawn from classical mythology to represent affordable, swift, and unrestricted flight across Europe, Anatolia, and the Middle East.",
      sources: [
        "https://www.flypgs.com/",
        "https://en.wikipedia.org/wiki/Pegasus_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "tr-sunexpress",
      countryCode: "TR",
      name: "SunExpress",
      iata: "XQ",
      icao: "SXS",
      founded: 1989,
      alliance: "None",
      hubs: ["Antalya Airport (AYT)", "İzmir Adnan Menderes Airport (ADB)"],
      fleet: {
        total: 77,
        summary: "77 aircraft (Boeing 737-800, 737 MAX 8)",
      },
      logo: "/airline-logos/tr/sunexpress.svg",
      logoExplainer:
        "Features a bright golden-yellow sunburst icon paired with deep Mediterranean navy typography, reflecting its heritage as a joint venture between Turkish Airlines and Lufthansa connecting European holidaymakers with the sunny Turkish Riviera.",
      sources: [
        "https://www.sunexpress.com/",
        "https://en.wikipedia.org/wiki/SunExpress",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ukraine
  UA: [
    {
      id: "ua-skyup-airlines",
      countryCode: "UA",
      name: "SkyUp Airlines",
      iata: "PQ",
      icao: "SQP",
      founded: 2016,
      alliance: "None",
      hubs: ["Boryspil International Airport (KBP - base; currently operating international ACMI & European charter routes)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Boeing 737-700, 737-800)",
      },
      logo: "/airline-logos/ua/skyup-airlines.svg",
      logoExplainer:
        "Features bold contemporary orange and dark-grey typography with an upward-angled aerodynamic slash, symbolizing energetic dynamism, youthfulness, and soaring above challenges.",
      sources: [
        "https://skyup.aero/",
        "https://en.wikipedia.org/wiki/SkyUp",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ua-ukraine-international-airlines",
      countryCode: "UA",
      name: "Ukraine International Airlines",
      iata: "PS",
      icao: "AUI",
      founded: 1992,
      alliance: "None",
      hubs: ["Boryspil International Airport (KBP)"],
      fleet: {
        total: 12,
        summary: "12 aircraft (Boeing 737-800, 737-900ER, 767-300ER, 777-200ER; Embraer E190/E195)",
      },
      logo: "/airline-logos/ua/ukraine-international-airlines.svg",
      logoExplainer:
        "Features a soaring falcon in yellow and blue encircling a globe, honoring the Ukrainian national colors (blue and yellow) and representing Ukraine's historic flagship commercial link connecting Eastern Europe with global destinations.",
      sources: [
        "https://www.flyuia.com/",
        "https://en.wikipedia.org/wiki/Ukraine_International_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Moldova
  MD: [
    {
      id: "md-flyone",
      countryCode: "MD",
      name: "FlyOne",
      iata: "5F",
      icao: "FIA",
      founded: 2015,
      alliance: "None",
      hubs: ["Chișinău International Airport (KIV)"],
      fleet: {
        total: 6,
        summary: "6 aircraft (Airbus A320-200, A321-200)",
      },
      logo: "/airline-logos/md/flyone.svg",
      logoExplainer:
        "Features bright blue and cyan geometric speed wings shaped into the numeral '1', symbolizing Moldova's premier private low-cost carrier connecting the Moldovan diaspora across Western Europe and the Mediterranean.",
      sources: [
        "https://flyone.eu/",
        "https://en.wikipedia.org/wiki/FlyOne",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Russia
  RU: [
    {
      id: "ru-aeroflot",
      countryCode: "RU",
      name: "Aeroflot",
      iata: "SU",
      icao: "AFL",
      founded: 1923,
      alliance: "None",
      hubs: ["Sheremetyevo International Airport (SVO)"],
      fleet: {
        total: 171,
        summary: "171 aircraft (Airbus A320-200, A320neo, A321-200, A321neo, A330-300, A350-900; Boeing 737-800, 777-300ER)",
      },
      logo: "/airline-logos/ru/aeroflot.svg",
      logoExplainer:
        "Retains the historic Soviet winged hammer and sickle insignia originally designed in the 1920s, recognized worldwide as one of commercial aviation's oldest continuous emblems, paired with the modern Russian tricolor flag ribbon.",
      sources: [
        "https://www.aeroflot.ru/",
        "https://en.wikipedia.org/wiki/Aeroflot",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ru-s7-airlines",
      countryCode: "RU",
      name: "S7 Airlines",
      iata: "S7",
      icao: "SBI",
      founded: 1957,
      alliance: "None",
      hubs: ["Moscow Domodedovo Airport (DME)", "Novosibirsk Tolmachevo Airport (OVB)", "Irkutsk Airport (IKT)"],
      fleet: {
        total: 100,
        summary: "100 aircraft (Airbus A320-200, A320neo, A321-200, A321neo; Boeing 737-800; Embraer E170)",
      },
      logo: "/airline-logos/ru/s7-airlines.svg",
      logoExplainer:
        "Designed by Landor Associates in 2005, the bright signature lime-green brand and white circular 'S7' emblem broke away from traditional airline blues, symbolizing individuality, friendliness, and optimism across domestic Russian routes.",
      sources: [
        "https://www.s7.ru/",
        "https://en.wikipedia.org/wiki/S7_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Belarus
  BY: [
    {
      id: "by-belavia",
      countryCode: "BY",
      name: "Belavia",
      iata: "B2",
      icao: "BRU",
      founded: 1996,
      alliance: "None",
      hubs: ["Minsk National Airport (MSQ)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (Boeing 737-800, 737 MAX 8; Embraer E175, E195)",
      },
      logo: "/airline-logos/by/belavia.svg",
      logoExplainer:
        "Designed in 2016, the logo features the blue cornflower (valoshka) stylized into an aerodynamic flower turbine, celebrating the traditional national flower of Belarus and symbolizing warmth, hospitality, and serene flight.",
      sources: [
        "https://en.belavia.by/",
        "https://en.wikipedia.org/wiki/Belavia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Canada
  CA: [
    {
      id: "ca-air-canada",
      countryCode: "CA",
      name: "Air Canada",
      iata: "AC",
      icao: "ACA",
      founded: 1937,
      alliance: "Star Alliance",
      hubs: ["Toronto Pearson Airport (YYZ)", "Montréal–Trudeau Airport (YUL)", "Vancouver International Airport (YVR)", "Calgary International Airport (YYC)"],
      fleet: {
        total: 193,
        summary: "193 aircraft (Airbus A220-300, A319, A320, A321, A330-300; Boeing 737 MAX 8, 777-200LR, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/ca/air-canada.svg",
      logoExplainer:
        "Features the iconic Canadian red maple leaf (the Rondelle) enclosed within a black circular roundel designed originally by Stewart & Morrison in 1964 and refreshed in 2017. The stylized eleven-pointed leaf symbolizes Canadian sovereignty, unity from coast to coast, and proud global aviation leadership.",
      sources: [
        "https://www.aircanada.com/",
        "https://en.wikipedia.org/wiki/Air_Canada",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ca-westjet",
      countryCode: "CA",
      name: "WestJet",
      iata: "WS",
      icao: "WJA",
      founded: 1996,
      alliance: "None",
      hubs: ["Calgary International Airport (YYC)", "Edmonton International Airport (YEG)", "Vancouver International Airport (YVR)", "Toronto Pearson Airport (YYZ)"],
      fleet: {
        total: 132,
        summary: "132 aircraft (Boeing 737-700, 737-800, 737 MAX 8; Boeing 787-9 Dreamliner)",
      },
      logo: "/airline-logos/ca/westjet.svg",
      logoExplainer:
        "Features a geometric stylized maple leaf in Canadian sky teal and deep navy blue alongside bold modern typography, reflecting Western Canada's entrepreneurial spirit, warm hospitality, and transatlantic network growth.",
      sources: [
        "https://www.westjet.com/",
        "https://en.wikipedia.org/wiki/WestJet",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mexico
  MX: [
    {
      id: "mx-aeromexico",
      countryCode: "MX",
      name: "Aeroméxico",
      iata: "AM",
      icao: "AMX",
      founded: 1934,
      alliance: "SkyTeam",
      hubs: ["Mexico City International Airport (MEX)", "Guadalajara International Airport (GDL)", "Monterrey International Airport (MTY)"],
      fleet: {
        total: 110,
        summary: "110 aircraft (Boeing 737-800, 737 MAX 8, 737 MAX 9; Boeing 787-8, 787-9 Dreamliner)",
      },
      logo: "/airline-logos/mx/aeromexico.svg",
      logoExplainer:
        "Features the revered Aztec Eagle Knight (Caballero Águila) profile in deep navy and silver, honoring pre-Columbian Mexica warrior nobility and embodying supreme courage, visionary focus, and graceful flight above the clouds.",
      sources: [
        "https://aeromexico.com/",
        "https://en.wikipedia.org/wiki/Aerom%C3%A9xico",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "mx-volaris",
      countryCode: "MX",
      name: "Volaris",
      iata: "Y4",
      icao: "VOI",
      founded: 2005,
      alliance: "None",
      hubs: ["Guadalajara International Airport (GDL)", "Mexico City International Airport (MEX)", "Tijuana International Airport (TIJ)", "Cancún International Airport (CUN)"],
      fleet: {
        total: 135,
        summary: "135 aircraft (Airbus A319-100, A320-200, A320neo, A321-200, A321neo)",
      },
      logo: "/airline-logos/mx/volaris.svg",
      logoExplainer:
        "Features an energetic multi-colored pixelated star matrix representing the Polaris north star, symbolizing reliable celestial guidance, ultra-low-cost innovation, and modern digital connectivity for Mexican travelers.",
      sources: [
        "https://www.volaris.com/",
        "https://en.wikipedia.org/wiki/Volaris",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Panama
  PA: [
    {
      id: "pa-copa-airlines",
      countryCode: "PA",
      name: "Copa Airlines",
      iata: "CM",
      icao: "CMP",
      founded: 1947,
      alliance: "Star Alliance",
      hubs: ["Tocumen International Airport (PTY)"],
      fleet: {
        total: 104,
        summary: "104 aircraft (Boeing 737-700, 737-800, 737 MAX 8, 737 MAX 9)",
      },
      logo: "/airline-logos/pa/copa-airlines.svg",
      logoExplainer:
        "Features a gold and blue globe insignia echoing the historic Continental Airlines alliance globe, representing Tocumen Airport as the 'Hub of the Americas' seamlessly uniting North, Central, and South America.",
      sources: [
        "https://www.copaair.com/",
        "https://en.wikipedia.org/wiki/Copa_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Costa Rica
  CR: [
    {
      id: "cr-sansa-airlines",
      countryCode: "CR",
      name: "SANSA Airlines",
      iata: "RZ",
      icao: "LRS",
      founded: 1978,
      alliance: "None",
      hubs: ["Juan Santamaría International Airport (SJO)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Cessna 208B Grand Caravan EX)",
      },
      logo: "/airline-logos/cr/sansa-airlines.png",
      logoExplainer:
        "Features vibrant Costa Rican red and oceanic blue wings soaring above green coastal typography, representing the national domestic carrier providing lifelines to remote rainforest, Pacific surf, and Caribbean eco-tourism airstrips.",
      sources: [
        "https://www.flysansa.com/",
        "https://en.wikipedia.org/wiki/SANSA_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cuba
  CU: [
    {
      id: "cu-cubana",
      countryCode: "CU",
      name: "Cubana de Aviación",
      iata: "CU",
      icao: "CUB",
      founded: 1929,
      alliance: "None",
      hubs: ["José Martí International Airport (HAV)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (Ilyushin Il-96-300, Tupolev Tu-204, ATR 42, ATR 72)",
      },
      logo: "/airline-logos/cu/cubana.svg",
      logoExplainer:
        "Features the Cuban national flag colors with a soaring red, white, and blue chevron wing, celebrating Cubana as one of the world's earliest commercial airlines (founded in 1929) and a founding member of IATA.",
      sources: [
        "https://www.cubana.cu/",
        "https://en.wikipedia.org/wiki/Cubana_de_Aviaci%C3%B3n",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Trinidad and Tobago
  TT: [
    {
      id: "tt-caribbean-airlines",
      countryCode: "TT",
      name: "Caribbean Airlines",
      iata: "BW",
      icao: "BWA",
      founded: 2006,
      alliance: "None",
      hubs: ["Piarco International Airport (POS)", "Norman Manley International Airport (KIN)"],
      fleet: {
        total: 19,
        summary: "19 aircraft (Boeing 737 MAX 8; ATR 72-600)",
      },
      logo: "/airline-logos/tt/caribbean-airlines.png",
      logoExplainer:
        "Features the iconic emerald-green hummingbird (the national symbol of Trinidad and Tobago, 'The Land of the Hummingbird') in dynamic flight alongside vivid magenta and Caribbean teal accents, embodying Caribbean warmth and natural beauty.",
      sources: [
        "https://www.caribbean-airlines.com/",
        "https://en.wikipedia.org/wiki/Caribbean_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bahamas
  BS: [
    {
      id: "bs-bahamasair",
      countryCode: "BS",
      name: "Bahamasair",
      iata: "UP",
      icao: "BHA",
      founded: 1973,
      alliance: "None",
      hubs: ["Lynden Pindling International Airport (NAS)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Boeing 737-700; ATR 42-600, ATR 72-600)",
      },
      logo: "/airline-logos/bs/bahamasair.svg",
      logoExplainer:
        "Features Bahamas aquamarine and vibrant sunny yellow flight ribbons flanking clean navy typography, representing the Bahamian national flag colors and the sparkling turquoise shallows of the archipelago.",
      sources: [
        "https://www.bahamasair.com/",
        "https://en.wikipedia.org/wiki/Bahamasair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Dominican Republic
  DO: [
    {
      id: "do-arajet",
      countryCode: "DO",
      name: "Arajet",
      iata: "DM",
      icao: "DWI",
      founded: 2014,
      alliance: "None",
      hubs: ["Las Américas International Airport (SDQ)"],
      fleet: {
        total: 10,
        summary: "10 aircraft (Boeing 737 MAX 8)",
      },
      logo: "/airline-logos/do/arajet.png",
      logoExplainer:
        "Features a stylized Macao macaw (Ara) soaring upwards in vibrant Caribbean purple and tropical orange, symbolizing the airline's mission as the premier low-fare carrier turning Santo Domingo into a continental mega-hub connecting the Americas.",
      sources: [
        "https://www.arajet.com/",
        "https://en.wikipedia.org/wiki/Arajet",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Guatemala
  GT: [
    {
      id: "gt-tag-airlines",
      countryCode: "GT",
      name: "TAG Airlines",
      iata: "5U",
      icao: "TGU",
      founded: 1961,
      alliance: "None",
      hubs: ["La Aurora International Airport (GUA)", "Mundo Maya International Airport (FRS)"],
      fleet: {
        total: 8,
        summary: "8 aircraft (ATR 72-500; Saab 340A/B; Embraer 110)",
      },
      logo: "/airline-logos/gt/tag-airlines.png",
      logoExplainer:
        "Features bold navy blue typography with stylized quetzal-inspired green and sky-blue flight arcs, reflecting Transportes Aéreos Guatemaltecos' heritage as Guatemala's flag carrier connecting the Maya Mundo with Central America and southern Mexico.",
      sources: [
        "https://tag.com.gt/",
        "https://en.wikipedia.org/wiki/Transportes_A%C3%A9reos_Guatemaltecos",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Belize
  BZ: [
    {
      id: "bz-tropic-air",
      countryCode: "BZ",
      name: "Tropic Air",
      iata: "PM",
      icao: "TOS",
      founded: 1979,
      alliance: "None",
      hubs: ["Philip S. W. Goldson International Airport (BZE)", "San Pedro Airport (SPR)"],
      fleet: {
        total: 17,
        summary: "17 aircraft (Cessna 208B Grand Caravan; Beechcraft 1900D)",
      },
      logo: "/airline-logos/bz/tropic-air.png",
      logoExplainer:
        "Features a playful tropical gecko resting on a bright yellow sun circle alongside Caribbean sky-blue typography, representing Belize's principal airline delivering essential connectivity across the barrier reef cayes and mainland districts.",
      sources: [
        "https://www.tropicair.com/",
        "https://en.wikipedia.org/wiki/Tropic_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // India
  IN: [
    {
      id: "in-air-india",
      countryCode: "IN",
      name: "Air India",
      iata: "AI",
      icao: "AIC",
      founded: 1932,
      alliance: "Star Alliance",
      hubs: ["Indira Gandhi International Airport (DEL)", "Chhatrapati Shivaji Maharaj International Airport (BOM)"],
      fleet: {
        total: 147,
        summary: "147 aircraft (Airbus A320neo, A321neo, A350-900; Boeing 777-200LR, 777-300ER, 787-8, 787-9)",
      },
      logo: "/airline-logos/in/air-india.svg",
      logoExplainer:
        "Unveiled in August 2023 under Tata Sons ownership, 'The Vista' brand emblem is inspired by the peak of the iconic Indian golden decorative window frame (jharokha), rendered in deep red, aubergine, and radiant gold. It symbolizes limitless possibilities, boundless progress, and a bold, confident new era for Indian aviation.",
      sources: [
        "https://www.airindia.com/",
        "https://en.wikipedia.org/wiki/Air_India",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "in-indigo",
      countryCode: "IN",
      name: "IndiGo",
      iata: "6E",
      icao: "IGO",
      founded: 2006,
      alliance: "None",
      hubs: ["Indira Gandhi International Airport (DEL)", "Chhatrapati Shivaji Maharaj International Airport (BOM)", "Bengaluru Kempegowda Airport (BLR)", "Hyderabad Rajiv Gandhi Airport (HYD)"],
      fleet: {
        total: 380,
        summary: "380 aircraft (Airbus A320-200, A320neo, A321neo; ATR 72-600; Boeing 777-300ER leased)",
      },
      logo: "/airline-logos/in/indigo.svg",
      logoExplainer:
        "Features deep indigo-blue typography with a distinctive chevron pattern resembling an aircraft climbing toward the right, symbolizing reliable punctuality, streamlined efficiency, and low-cost accessibility across India and Eurasia.",
      sources: [
        "https://www.goindigo.in/",
        "https://en.wikipedia.org/wiki/IndiGo",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bangladesh
  BD: [
    {
      id: "bd-biman-bangladesh",
      countryCode: "BD",
      name: "Biman Bangladesh Airlines",
      iata: "BG",
      icao: "BBC",
      founded: 1972,
      alliance: "None",
      hubs: ["Hazrat Shahjalal International Airport (DAC)", "Shah Amanat International Airport (CGP)", "Osmani International Airport (ZYL)"],
      fleet: {
        total: 21,
        summary: "21 aircraft (Boeing 737-800, 777-300ER, 787-8, 787-9 Dreamliner; De Havilland Canada Dash 8-Q400)",
      },
      logo: "/airline-logos/bd/biman-bangladesh-airlines.svg",
      logoExplainer:
        "Designed by painter Quamrul Hassan in 1972, the emblem features the stylized silhouette of a soaring white balaka (white stork) set within a vibrant red sun disc framed in forest green, directly evoking the sovereign colors and spirit of Bangladesh's independence.",
      sources: [
        "https://www.biman-airlines.com/",
        "https://en.wikipedia.org/wiki/Biman_Bangladesh_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Sri Lanka
  LK: [
    {
      id: "lk-srilankan-airlines",
      countryCode: "LK",
      name: "SriLankan Airlines",
      iata: "UL",
      icao: "ALK",
      founded: 1979,
      alliance: "oneworld",
      hubs: ["Bandaranaike International Airport (CMB)"],
      fleet: {
        total: 24,
        summary: "24 aircraft (Airbus A320-200, A320neo, A321-200, A321neo, A330-200, A330-300)",
      },
      logo: "/airline-logos/lk/srilankan-airlines.svg",
      logoExplainer:
        "Features a stylized iridescent peacock (monara) with flowing aerodynamic tail plumage in brilliant crimson red, turquoise green, and saffron orange, symbolizing classical Sinhala art, tropical island hospitality, and grace in flight.",
      sources: [
        "https://www.srilankan.com/",
        "https://en.wikipedia.org/wiki/SriLankan_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Pakistan
  PK: [
    {
      id: "pk-pia",
      countryCode: "PK",
      name: "Pakistan International Airlines",
      iata: "PK",
      icao: "PIA",
      founded: 1946,
      alliance: "None",
      hubs: ["Jinnah International Airport (KHI)", "Islamabad International Airport (ISB)", "Allama Iqbal International Airport (LHE)"],
      fleet: {
        total: 34,
        summary: "34 aircraft (Airbus A320-200; Boeing 777-200ER, 777-200LR, 777-300ER; ATR 42-500)",
      },
      logo: "/airline-logos/pk/pakistan-international-airlines.svg",
      logoExplainer:
        "Features the classic Urdu calligraphy signature 'PIA' accompanied by dynamic flowing golden speed stripes and Pakistani national green accents, symbolizing national pride, historic intercontinental pioneering flight, and transatlantic routes.",
      sources: [
        "https://www.piac.com.pk/",
        "https://en.wikipedia.org/wiki/Pakistan_International_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Nepal
  NP: [
    {
      id: "np-nepal-airlines",
      countryCode: "NP",
      name: "Nepal Airlines",
      iata: "RA",
      icao: "RNA",
      founded: 1958,
      alliance: "None",
      hubs: ["Tribhuvan International Airport (KTM)"],
      fleet: {
        total: 7,
        summary: "7 aircraft (Airbus A320-200, A330-200; DHC-6 Twin Otter)",
      },
      logo: "/airline-logos/np/nepal-airlines.svg",
      logoExplainer:
        "Features the sacred mythical bird Garuda in radiant red and gold within a Himalayan circular ring, reflecting Nepal's rich spiritual culture and the airline's historic role as Royal Nepal Airlines connecting the roof of the world.",
      sources: [
        "https://nepalairlines.com.np/",
        "https://en.wikipedia.org/wiki/Nepal_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Saudi Arabia
  SA: [
    {
      id: "sa-saudia",
      countryCode: "SA",
      name: "Saudia",
      iata: "SV",
      icao: "SVA",
      founded: 1945,
      alliance: "SkyTeam",
      hubs: ["King Abdulaziz International Airport (JED)", "King Khalid International Airport (RUH)", "King Fahd International Airport (DMM)"],
      fleet: {
        total: 153,
        summary: "153 aircraft (Airbus A320-200, A321-200, A321neo, A330-300; Boeing 777-300ER, 787-9, 787-10)",
      },
      logo: "/airline-logos/sa/saudia.svg",
      logoExplainer:
        "Reintroduced in 2023, the retro-modern brand identity revives Saudia's historic 1970s and 80s emblem featuring dual crossed green aerodynamic chevrons framing the date palm, honoring Saudi cultural hospitality, national heritage, and Vision 2030 modernization.",
      sources: [
        "https://www.saudia.com/",
        "https://en.wikipedia.org/wiki/Saudia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sa-flynas",
      countryCode: "SA",
      name: "Flynas",
      iata: "XY",
      icao: "KNE",
      founded: 2007,
      alliance: "None",
      hubs: ["King Abdulaziz International Airport (JED)", "King Khalid International Airport (RUH)", "King Fahd International Airport (DMM)", "Prince Mohammad bin Abdulaziz Airport (MED)"],
      fleet: {
        total: 64,
        summary: "64 aircraft (Airbus A320neo, A321XLR, A330-300)",
      },
      logo: "/airline-logos/sa/flynas.svg",
      logoExplainer:
        "Features bright turquoise teal and warm violet curves converging in aerodynamic harmony, symbolizing modern leisure accessibility, friendly low-fare travel, and rapid regional expansion across the Middle East.",
      sources: [
        "https://www.flynas.com/",
        "https://en.wikipedia.org/wiki/Flynas",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Oman
  OM: [
    {
      id: "om-oman-air",
      countryCode: "OM",
      name: "Oman Air",
      iata: "WY",
      icao: "OMA",
      founded: 1993,
      alliance: "oneworld",
      hubs: ["Muscat International Airport (MCT)"],
      fleet: {
        total: 44,
        summary: "44 aircraft (Boeing 737-800, 737-900ER, 737 MAX 8, 787-9; Airbus A330-200, A330-300)",
      },
      logo: "/airline-logos/om/oman-air.svg",
      logoExplainer:
        "Features an elegant gold and turquoise vortex swirl evoking an ascending swirl of fragrant frankincense smoke and ocean sea spray from the Arabian Sea, reflecting Omani seafaring history, maritime trade routes, and gracious Arabian hospitality.",
      sources: [
        "https://www.omanair.com/",
        "https://en.wikipedia.org/wiki/Oman_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bahrain
  BH: [
    {
      id: "bh-gulf-air",
      countryCode: "BH",
      name: "Gulf Air",
      iata: "GF",
      icao: "GFA",
      founded: 1950,
      alliance: "None",
      hubs: ["Bahrain International Airport (BAH)"],
      fleet: {
        total: 41,
        summary: "41 aircraft (Airbus A320neo, A321neo, A321LR; Boeing 787-9 Dreamliner)",
      },
      logo: "/airline-logos/bh/gulf-air.svg",
      logoExplainer:
        "Features the majestic Golden Falcon in soaring flight, an enduring symbol of Gulf pride, traditional Bedouin falconry, and sovereign aerial leadership as one of the Middle East's earliest commercial carriers (established 1950).",
      sources: [
        "https://www.gulfair.com/",
        "https://en.wikipedia.org/wiki/Gulf_Air",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kuwait
  KW: [
    {
      id: "kw-kuwait-airways",
      countryCode: "KW",
      name: "Kuwait Airways",
      iata: "KU",
      icao: "KAC",
      founded: 1954,
      alliance: "None",
      hubs: ["Kuwait International Airport (KWI)"],
      fleet: {
        total: 33,
        summary: "33 aircraft (Airbus A320neo, A330-200, A330-800neo, A330-900neo; Boeing 777-300ER)",
      },
      logo: "/airline-logos/kw/kuwait-airways.svg",
      logoExplainer:
        "Features two soaring stylized blue bird wings uniting into an aerodynamic crest, symbolizing Kuwait's historic maritime maritime heritage, pearl diving culture, and modern intercontinental aviation gateway.",
      sources: [
        "https://www.kuwaitairways.com/",
        "https://en.wikipedia.org/wiki/Kuwait_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Jordan
  JO: [
    {
      id: "jo-royal-jordanian",
      countryCode: "JO",
      name: "Royal Jordanian",
      iata: "RJ",
      icao: "RJA",
      founded: 1963,
      alliance: "oneworld",
      hubs: ["Queen Alia International Airport (AMM)"],
      fleet: {
        total: 28,
        summary: "28 aircraft (Airbus A320-200, A321-200, A320neo; Boeing 787-8; Embraer E190-E2, E195-E2)",
      },
      logo: "/airline-logos/jo/royal-jordanian.svg",
      logoExplainer:
        "Features the royal Hashemite crown in golden yellow flanked by stylized royal falcon wings in crimson and gold, honoring Jordan's monarchy and symbolizing Queen Alia Airport's role as a primary bridge across the Levant.",
      sources: [
        "https://rj.com/",
        "https://en.wikipedia.org/wiki/Royal_Jordanian",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kazakhstan
  KZ: [
    {
      id: "kz-air-astana",
      countryCode: "KZ",
      name: "Air Astana",
      iata: "KC",
      icao: "KZR",
      founded: 2001,
      alliance: "None",
      hubs: ["Almaty International Airport (ALA)", "Nursultan Nazarbayev International Airport (NQZ)"],
      fleet: {
        total: 56,
        summary: "56 aircraft (Airbus A320neo, A321-200, A321neo, A321LR; Boeing 767-300ER, 787-9; Embraer E190-E2)",
      },
      logo: "/airline-logos/kz/air-astana.svg",
      logoExplainer:
        "Features a radiant gold aerodynamic solar emblem inspired by the golden steppe eagle and sun on Kazakhstan's national flag, paired with sophisticated deep blue typography symbolizing Eurasian crossroads connectivity.",
      sources: [
        "https://airastana.com/",
        "https://en.wikipedia.org/wiki/Air_Astana",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Uzbekistan
  UZ: [
    {
      id: "uz-uzbekistan-airways",
      countryCode: "UZ",
      name: "Uzbekistan Airways",
      iata: "HY",
      icao: "UZB",
      founded: 1992,
      alliance: "None",
      hubs: ["Islam Karimov Tashkent International Airport (TAS)"],
      fleet: {
        total: 39,
        summary: "39 aircraft (Airbus A320-200, A320neo, A321neo; Boeing 767-300ER, 787-8 Dreamliner; LET L-410)",
      },
      logo: "/airline-logos/uz/uzbekistan-airways.svg",
      logoExplainer:
        "Features the mythical bird Semurg (Humo) in turquoise green, white, and golden flight, echoing the state emblem of Uzbekistan and symbolizing peace, happiness, and revival along the historic Silk Road skies.",
      sources: [
        "https://www.uzairways.com/",
        "https://en.wikipedia.org/wiki/Uzbekistan_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Azerbaijan
  AZ: [
    {
      id: "az-azerbaijan-airlines",
      countryCode: "AZ",
      name: "Azerbaijan Airlines",
      iata: "J2",
      icao: "AHY",
      founded: 1992,
      alliance: "None",
      hubs: ["Heydar Aliyev International Airport (GYD)"],
      fleet: {
        total: 31,
        summary: "31 aircraft (Airbus A319, A320-200, A320neo, A340-500, A340-600; Boeing 757-200, 767-300ER, 787-8)",
      },
      logo: "/airline-logos/az/azerbaijan-airlines.svg",
      logoExplainer:
        "Features Caspian cyan and navy blue wings stylized into an aerodynamic bird in ascent, symbolizing Azerbaijan's national pride, Caspian petroleum heritage, and strategic position connecting East and West.",
      sources: [
        "https://www.azal.az/",
        "https://en.wikipedia.org/wiki/Azerbaijan_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Georgia
  GE: [
    {
      id: "ge-georgian-airways",
      countryCode: "GE",
      name: "Georgian Airways",
      iata: "A9",
      icao: "TGZ",
      founded: 1993,
      alliance: "None",
      hubs: ["Tbilisi Shota Rustaveli International Airport (TBS)"],
      fleet: {
        total: 8,
        summary: "8 aircraft (Boeing 737-700, 737-800, 767-300ER)",
      },
      logo: "/airline-logos/ge/georgian-airways.svg",
      logoExplainer:
        "Features a soaring Caucasian eagle in crimson and white, honoring Georgia's five-cross national flag colors and symbolizing steadfast mountain resilience, ancient Caucasian hospitality, and European links.",
      sources: [
        "https://georgian-airways.com/",
        "https://en.wikipedia.org/wiki/Georgian_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Armenia
  AM: [
    {
      id: "am-flyone-armenia",
      countryCode: "AM",
      name: "FLYONE Armenia",
      iata: "3F",
      icao: "FIE",
      founded: 2021,
      alliance: "None",
      hubs: ["Zvartnots International Airport (EVN)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200, A321-200)",
      },
      logo: "/airline-logos/am/flyone-armenia.png",
      logoExplainer:
        "Features bright blue and cyan speed ribbons forming an aerodynamic numeral '1' alongside clean typography, representing Armenia's largest passenger airline connecting Yerevan with the worldwide Armenian diaspora.",
      sources: [
        "https://flyone.am/",
        "https://en.wikipedia.org/wiki/FlyOne_Armenia",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Egypt
  EG: [
    {
      id: "eg-egyptair",
      countryCode: "EG",
      name: "EgyptAir",
      iata: "MS",
      icao: "MSR",
      founded: 1932,
      alliance: "Star Alliance",
      hubs: ["Cairo International Airport (CAI)"],
      fleet: {
        total: 71,
        summary: "71 aircraft (Airbus A320neo, A321neo, A330-200, A330-300; Boeing 737-800, 777-300ER, 787-9 Dreamliner)",
      },
      logo: "/airline-logos/eg/egyptair.svg",
      logoExplainer:
        "Features the ancient Egyptian solar deity Horus, the winged sky falcon and protector of the Pharaohs, rendered in deep royal blue and gold. Established in 1932 as Misr Airwork, EgyptAir is the pioneer flag carrier of Africa and the Middle East, bearing Horus as a timeless symbol of celestial flight.",
      sources: [
        "https://www.egyptair.com/",
        "https://en.wikipedia.org/wiki/Egyptair",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ethiopia
  ET: [
    {
      id: "et-ethiopian-airlines",
      countryCode: "ET",
      name: "Ethiopian Airlines",
      iata: "ET",
      icao: "ETH",
      founded: 1945,
      alliance: "Star Alliance",
      hubs: ["Addis Ababa Bole International Airport (ADD)"],
      fleet: {
        total: 145,
        summary: "145 aircraft (Airbus A350-900, A350-1000; Boeing 737-700/800, 737 MAX 8, 777-200LR, 777-300ER, 787-8, 787-9; De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/et/ethiopian-airlines.svg",
      logoExplainer:
        "Features stylized Pan-African tricolor wings in green, yellow, and red carrying the Amharic wordmark (የኢትዮጵያ) and English name. As Africa's largest and most profitable airline group, the emblem represents Pan-African unity, sovereign pride, and bridging Africa with five continents.",
      sources: [
        "https://www.ethiopianairlines.com/",
        "https://en.wikipedia.org/wiki/Ethiopian_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // South Africa
  ZA: [
    {
      id: "za-south-african-airways",
      countryCode: "ZA",
      name: "South African Airways",
      iata: "SA",
      icao: "SAA",
      founded: 1934,
      alliance: "Star Alliance",
      hubs: ["O. R. Tambo International Airport (JNB)", "Cape Town International Airport (CPT)"],
      fleet: {
        total: 16,
        summary: "16 aircraft (Airbus A320-200, A330-300, A340-300)",
      },
      logo: "/airline-logos/za/south-african-airways.svg",
      logoExplainer:
        "Features the dynamic post-apartheid South African rainbow national flag stylized into an aerodynamic tail fin chevron with solar gold, navy blue, green, and red strokes, celebrating the diversity and optimism of the 'Rainbow Nation'.",
      sources: [
        "https://www.flysaa.com/",
        "https://en.wikipedia.org/wiki/South_African_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Morocco
  MA: [
    {
      id: "ma-royal-air-maroc",
      countryCode: "MA",
      name: "Royal Air Maroc",
      iata: "AT",
      icao: "RAM",
      founded: 1957,
      alliance: "oneworld",
      hubs: ["Mohammed V International Airport (CMN)"],
      fleet: {
        total: 52,
        summary: "52 aircraft (Boeing 737-800, 737 MAX 8, 787-8, 787-9 Dreamliner; Embraer E190; ATR 72-600)",
      },
      logo: "/airline-logos/ma/royal-air-maroc.svg",
      logoExplainer:
        "Features the royal red Moroccan pentagram star (Seal of Solomon from the national flag) flanked by royal red and Moroccan emerald-green wings, honoring the Cherifian Kingdom and serving as the premier bridge between Africa and Europe.",
      sources: [
        "https://www.royalairmaroc.com/",
        "https://en.wikipedia.org/wiki/Royal_Air_Maroc",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kenya
  KE: [
    {
      id: "ke-kenya-airways",
      countryCode: "KE",
      name: "Kenya Airways",
      iata: "KQ",
      icao: "KQA",
      founded: 1977,
      alliance: "SkyTeam",
      hubs: ["Jomo Kenyatta International Airport (NBO)"],
      fleet: {
        total: 34,
        summary: "34 aircraft (Boeing 737-800, 787-8 Dreamliner; Embraer E190)",
      },
      logo: "/airline-logos/ke/kenya-airways.svg",
      logoExplainer:
        "Features the iconic 'Pride of Africa' emblem with a stylized red feather quill curving into a dynamic 'K' in red and black, reflecting the Maasai warrior shield motifs of the Kenyan flag and symbolizing hospitable East African aviation.",
      sources: [
        "https://www.kenya-airways.com/",
        "https://en.wikipedia.org/wiki/Kenya_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Rwanda
  RW: [
    {
      id: "rw-rwandair",
      countryCode: "RW",
      name: "RwandAir",
      iata: "WB",
      icao: "RWD",
      founded: 2002,
      alliance: "None",
      hubs: ["Kigali International Airport (KGL)"],
      fleet: {
        total: 14,
        summary: "14 aircraft (Airbus A330-200, A330-300; Boeing 737-700, 737-800; Bombardier CRJ900; De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/rw/rwandair.svg",
      logoExplainer:
        "Features a stylized golden-yellow sunburst rising above sky-blue and emerald-green wings, reflecting the radiant sun of the Rwandan national flag and symbolizing peace, unity, and rapid modernization from the heart of Africa.",
      sources: [
        "https://www.rwandair.com/",
        "https://en.wikipedia.org/wiki/RwandAir",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mauritius
  MU: [
    {
      id: "mu-air-mauritius",
      countryCode: "MU",
      name: "Air Mauritius",
      iata: "MK",
      icao: "MAU",
      founded: 1967,
      alliance: "None",
      hubs: ["Sir Seewoosagur Ramgoolam International Airport (MRU)"],
      fleet: {
        total: 12,
        summary: "12 aircraft (Airbus A350-900, A330-900neo; ATR 72-500/600)",
      },
      logo: "/airline-logos/mu/air-mauritius.svg",
      logoExplainer:
        "Features the iconic crimson Red Paille-en-Queue (tropicbird) in graceful soaring flight, an indigenous seabird celebrated in Mauritian folklore representing maritime island freedom and warm Indian Ocean hospitality.",
      sources: [
        "https://www.airmauritius.com/",
        "https://en.wikipedia.org/wiki/Air_Mauritius",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Seychelles
  SC: [
    {
      id: "sc-air-seychelles",
      countryCode: "SC",
      name: "Air Seychelles",
      iata: "HM",
      icao: "SEY",
      founded: 1977,
      alliance: "None",
      hubs: ["Seychelles International Airport (SEZ)"],
      fleet: {
        total: 7,
        summary: "7 aircraft (Airbus A320neo; DHC-6 Twin Otter)",
      },
      logo: "/airline-logos/sc/air-seychelles.svg",
      logoExplainer:
        "Features two stylized tropical fairy terns in brilliant turquoise and tropical red, symbolizing lifelong fidelity, Indian Ocean nature conservation, and island hopping across the granitic Seychelles archipelago.",
      sources: [
        "https://www.airseychelles.com/",
        "https://en.wikipedia.org/wiki/Air_Seychelles",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Senegal
  SN: [
    {
      id: "sn-air-senegal",
      countryCode: "SN",
      name: "Air Senegal",
      iata: "HC",
      icao: "SZN",
      founded: 2016,
      alliance: "None",
      hubs: ["Blaise Diagne International Airport (DSS)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (Airbus A330-900neo, A321-200, A319-100; ATR 72-600)",
      },
      logo: "/airline-logos/sn/air-senegal.svg",
      logoExplainer:
        "Features the majestic baobab tree silhouette set against the Senegalese national tricolor (green, yellow, and red) and a golden five-pointed star, representing terrestrial strength, African roots, and legendary Teranga (Senegalese hospitality).",
      sources: [
        "https://flyairsenegal.com/",
        "https://en.wikipedia.org/wiki/Air_Senegal",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Nigeria
  NG: [
    {
      id: "ng-air-peace",
      countryCode: "NG",
      name: "Air Peace",
      iata: "P4",
      icao: "APK",
      founded: 2013,
      alliance: "None",
      hubs: ["Murtala Muhammed International Airport (LOS)", "Nnamdi Azikiwe International Airport (ABV)"],
      fleet: {
        total: 31,
        summary: "31 aircraft (Boeing 777-200ER, 777-300; Boeing 737-300/500/700/800; Embraer E195-E2; Dornier 328)",
      },
      logo: "/airline-logos/ng/air-peace.png",
      logoExplainer:
        "Features a blue dove in ascent carrying an olive branch motif paired with crimson and royal blue curves, reflecting founder Allen Onyema's philosophy of using commercial aviation as an engine for national peace, economic empowerment, and West African unity.",
      sources: [
        "https://flyairpeace.com/",
        "https://en.wikipedia.org/wiki/Air_Peace",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Fiji
  FJ: [
    {
      id: "fj-fiji-airways",
      countryCode: "FJ",
      name: "Fiji Airways",
      iata: "FJ",
      icao: "FJI",
      founded: 1951,
      alliance: "oneworld",
      hubs: ["Nadi International Airport (NAN)", "Nausori International Airport (SUV)"],
      fleet: {
        total: 15,
        summary: "15 aircraft (Airbus A350-900, A330-200, A330-300; Boeing 737 MAX 8; ATR 72-600)",
      },
      logo: "/airline-logos/fj/fiji-airways.svg",
      logoExplainer:
        "Designed by renowned Fijian Masi artist Makereta Matemosi, the logo features the traditional 'Teteva' masi motif, a sacred indigenous Fijian symbol honoring community unity, spiritual protection, and Pacific navigation.",
      sources: [
        "https://www.fijiairways.com/",
        "https://en.wikipedia.org/wiki/Fiji_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Papua New Guinea
  PG: [
    {
      id: "pg-air-niugini",
      countryCode: "PG",
      name: "Air Niugini",
      iata: "PX",
      icao: "ANG",
      founded: 1973,
      alliance: "None",
      hubs: ["Jacksons International Airport (POM)"],
      fleet: {
        total: 20,
        summary: "20 aircraft (Boeing 767-300ER, 737-800; Fokker 100, Fokker 70; De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/pg/air-niugini.svg",
      logoExplainer:
        "Features the iconic Raggiana bird-of-paradise (kumul) in vivid scarlet red and golden yellow plumage in soaring flight, directly reflecting Papua New Guinea's national emblem and celebrated cultural heritage.",
      sources: [
        "https://www.airniugini.com.pg/",
        "https://en.wikipedia.org/wiki/Air_Niugini",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Vanuatu
  VU: [
    {
      id: "vu-air-vanuatu",
      countryCode: "VU",
      name: "Air Vanuatu",
      iata: "NF",
      icao: "AVN",
      founded: 1981,
      alliance: "None",
      hubs: ["Bauerfield International Airport (VLI)"],
      fleet: {
        total: 4,
        summary: "4 aircraft (Boeing 737-800; ATR 72-600)",
      },
      logo: "/airline-logos/vu/air-vanuatu.svg",
      logoExplainer:
        "Features an artistic soaring tropical bird in red, yellow, and deep oceanic blue, honoring Vanuatu's Melanesian island traditions, coral sea navigation, and essential inter-island air bridge.",
      sources: [
        "https://www.airvanuatu.com/",
        "https://en.wikipedia.org/wiki/Air_Vanuatu",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Solomon Islands
  SB: [
    {
      id: "sb-solomon-airlines",
      countryCode: "SB",
      name: "Solomon Airlines",
      iata: "IE",
      icao: "SOL",
      founded: 1962,
      alliance: "None",
      hubs: ["Honiara International Airport (HIR)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200; De Havilland Dash 8-100; DHC-6 Twin Otter)",
      },
      logo: "/airline-logos/sb/solomon-airlines.svg",
      logoExplainer:
        "Features a stylized Pacific frigatebird in radiant gold soaring above Melanesian blue and green speed bands, symbolizing maritime freedom, island voyages, and national unity across the Solomon archipelago.",
      sources: [
        "https://www.flysolomons.com/",
        "https://en.wikipedia.org/wiki/Solomon_Airlines",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Samoa
  WS: [
    {
      id: "ws-samoa-airways",
      countryCode: "WS",
      name: "Samoa Airways",
      iata: "OL",
      icao: "PAO",
      founded: 1959,
      alliance: "None",
      hubs: ["Faleolo International Airport (APW)"],
      fleet: {
        total: 3,
        summary: "3 aircraft (DHC-6 Twin Otter)",
      },
      logo: "/airline-logos/ws/samoa-airways.svg",
      logoExplainer:
        "Features the delicate tropical red teuila flower (the national flower of Samoa) stylized into an aerodynamic crest, celebrating Fa'a Samoa (the Samoan way of life), island warmth, and Polynesian cultural pride.",
      sources: [
        "https://samoaairways.com/",
        "https://en.wikipedia.org/wiki/Samoa_Airways",
      ],
      licenceNote: "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  JM: [
    {
      id: "jm-air-jamaica",
      countryCode: "JM",
      name: "Air Jamaica",
      iata: "JM",
      icao: "AJM",
      founded: 1968,
      alliance: "None",
      hubs: [
        "Norman Manley International Airport (KIN)",
        "Sangster International Airport (MBJ)",
      ],
      fleet: {
        total: 10,
        summary:
          "Historic operations operated Airbus A340-300, A321-200, and A320-200; operations merged into Caribbean Airlines serving Jamaica's international routes with Boeing 737 MAX 8 and ATR 72-600",
      },
      logo: "/airline-logos/jm/air-jamaica.svg",
      logoExplainer:
        "Features the iconic doctor bird (streamertail hummingbird, the national bird of Jamaica) in dynamic flight rendered with vivid green, golden-yellow, and black plumage reflecting the Jamaican national colors, accompanied by the classic cursive 'air Jamaica' wordmark.",
      sources: [
        "https://en.wikipedia.org/wiki/Air_Jamaica",
        "https://www.caribbean-airlines.com/",
      ],
      licenceNote:
        "Commercial airline trademark and historic logo bundled for educational reference in Learn mode.",
    },
  ],
  HT: [
    {
      id: "ht-sunrise-airways",
      countryCode: "HT",
      name: "Sunrise Airways",
      iata: "S6",
      icao: "KSZ",
      founded: 2010,
      alliance: "None",
      hubs: [
        "Toussaint Louverture International Airport (PAP)",
        "Cap-Haïtien International Airport (CAP)",
      ],
      fleet: {
        total: 7,
        summary:
          "7 aircraft (Airbus A320-200 leased, Embraer EMB 120 Brasilia, British Aerospace Jetstream 32, Cessna 208B Grand Caravan)",
      },
      logo: "/airline-logos/ht/sunrise-airways.svg",
      logoExplainer:
        "Features a stylized rising sun with radiant orange, golden-yellow, and sky-blue geometric rays rising above the bold 'SUNRISE AIRWAYS' wordmark, symbolizing a bright dawn, regional renewal, and resilience for Haitian commercial aviation.",
      sources: [
        "https://sunriseairways.net/",
        "https://en.wikipedia.org/wiki/Sunrise_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  HN: [
    {
      id: "hn-aerolineas-sosa",
      countryCode: "HN",
      name: "Aerolíneas Sosa",
      iata: "SO",
      icao: "NSO",
      founded: 1976,
      alliance: "None",
      hubs: [
        "Golosón International Airport (LCE)",
        "Ramón Villeda Morales International Airport (SAP)",
        "Toncontín International Airport (TGU)",
      ],
      fleet: {
        total: 5,
        summary:
          "5 aircraft (Saab 340B, Bombardier CRJ100ER, British Aerospace Jetstream 31/32)",
      },
      logo: "/airline-logos/hn/aerolineas-sosa.png",
      logoExplainer:
        "Features an energetic script in deep navy reading 'Aerolíneas SOSA', underscored by dynamic red and royal blue aerodynamic swooshes symbolizing flight speed, dependable connectivity, and decades of vital passenger service across Honduras and the Bay Islands.",
      sources: [
        "https://es.wikipedia.org/wiki/Aerol%C3%ADneas_Sosa",
        "https://en.wikipedia.org/wiki/Aerol%C3%ADneas_Sosa",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  NI: [
    {
      id: "ni-la-costena",
      countryCode: "NI",
      name: "La Costeña",
      iata: "LC",
      icao: "NIS",
      founded: 1991,
      alliance: "None",
      hubs: ["Augusto C. Sandino International Airport (MGA)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (ATR 42-300, Cessna 208B Grand Caravan)",
      },
      logo: "/airline-logos/ni/la-costena.png",
      logoExplainer:
        "Displays the forward-leaning cursive wordmark 'La Costeña' in Pacific blue underscored by dynamic speed bands, representing continuous lifeline connections between Managua and the Atlantic coast, the Corn Islands, and rural Nicaraguan communities.",
      sources: [
        "https://www.lacostena.online/",
        "https://en.wikipedia.org/wiki/La_Coste%C3%B1a_(airline)",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SV: [
    {
      id: "sv-avianca-el-salvador",
      countryCode: "SV",
      name: "Avianca El Salvador (TACA)",
      iata: "TA",
      icao: "TAI",
      founded: 1931,
      alliance: "Star Alliance",
      hubs: [
        "El Salvador International Airport San Óscar Arnulfo Romero y Galdámez (SAL)",
      ],
      fleet: {
        total: 16,
        summary:
          "16 aircraft (Airbus A320-200, Airbus A320neo, Airbus A319-100)",
      },
      logo: "/airline-logos/sv/taca.png",
      logoExplainer:
        "Features the storied insignia of TACA (Transportes Aéreos del Continente Americano), displaying five golden stylized scarlet macaws (guacamayas) flying in close formation. The five birds historically symbolized the solidarity of the five Central American republics, representing shared heritage and pioneering aviation across the Americas.",
      sources: [
        "https://www.avianca.com/",
        "https://en.wikipedia.org/wiki/Avianca_El_Salvador",
        "https://en.wikipedia.org/wiki/TACA_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and historical brand logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sv-volaris-el-salvador",
      countryCode: "SV",
      name: "Volaris El Salvador",
      iata: "N3",
      icao: "VOS",
      founded: 2019,
      alliance: "None",
      hubs: [
        "El Salvador International Airport San Óscar Arnulfo Romero y Galdámez (SAL)",
      ],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320neo)",
      },
      logo: "/airline-logos/sv/volaris.svg",
      logoExplainer:
        "Showcases a distinctive pointillist constellation star composed of vibrant magenta, cyan, and white geometric pixels alongside the clean lowercase 'volaris' wordmark, symbolizing digital-first agility, affordable travel, and modern air connectivity across Central America.",
      sources: [
        "https://www.volaris.com/",
        "https://en.wikipedia.org/wiki/Volaris_El_Salvador",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  IL: [
    {
      id: "il-el-al",
      countryCode: "IL",
      name: "El Al",
      iata: "LY",
      icao: "ELY",
      founded: 1948,
      alliance: "None",
      hubs: ["Ben Gurion Airport (TLV)"],
      fleet: {
        total: 47,
        summary:
          "47 aircraft (Boeing 787-8, Boeing 787-9 Dreamliner, Boeing 777-200ER, Boeing 737-800, Boeing 737-900ER)",
      },
      logo: "/airline-logos/il/el-al.svg",
      logoExplainer:
        "Features a dynamic typographic wordmark in English and Hebrew (אל על, meaning 'To the Skies'). The stylized lettering, originally refined by graphic designer Dan Reisinger, evokes forward aerodynamic propulsion and Israel's sovereign air connection to the global diaspora.",
      sources: [
        "https://www.elal.com/",
        "https://en.wikipedia.org/wiki/El_Al",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "il-arkia",
      countryCode: "IL",
      name: "Arkia",
      iata: "IZ",
      icao: "AIZ",
      founded: 1949,
      alliance: "None",
      hubs: ["Ben Gurion Airport (TLV)", "Ramon Airport (ETM)"],
      fleet: {
        total: 7,
        summary: "7 aircraft (Airbus A321LR, Embraer E195-E1, Embraer E190)",
      },
      logo: "/airline-logos/il/arkia.svg",
      logoExplainer:
        "Features vibrant multicolored swooshes forming a stylized soaring bird and a cheerful cursive lowercase 'arkia' wordmark, representing warm Mediterranean leisure travel, holiday escapes, and domestic connectivity between Tel Aviv and the Red Sea port of Eilat.",
      sources: [
        "https://www.arkia.co.il/",
        "https://en.wikipedia.org/wiki/Arkia",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  IR: [
    {
      id: "ir-iran-air",
      countryCode: "IR",
      name: "Iran Air",
      iata: "IR",
      icao: "IRA",
      founded: 1944,
      alliance: "None",
      hubs: [
        "Tehran Imam Khomeini International Airport (IKA)",
        "Tehran Mehrabad International Airport (THR)",
      ],
      fleet: {
        total: 32,
        summary:
          "32 aircraft (Airbus A300-600R, A310-300, A320-200, A321-200, A330-200, ATR 72-600, Fokker 100)",
      },
      logo: "/airline-logos/ir/iran-air.svg",
      logoExplainer:
        "The legendary 'Homa' emblem was designed in 1961 by Iranian designer Edward Zohrabian, inspired by the ancient Achaemenid griffin and Homa bird capitals atop the ceremonial columns of Persepolis. Portraying the mythical bird of good fortune and compassion, it was voted one of the finest airline insignias in aviation history by an international panel of graphic designers.",
      sources: [
        "https://www.iranair.com/",
        "https://en.wikipedia.org/wiki/Iran_Air",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  IQ: [
    {
      id: "iq-iraqi-airways",
      countryCode: "IQ",
      name: "Iraqi Airways",
      iata: "IA",
      icao: "IAW",
      founded: 1945,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: ["Baghdad International Airport (BGW)"],
      fleet: {
        total: 34,
        summary:
          "34 aircraft (Boeing 787-8 Dreamliner, Boeing 737 MAX 8, Boeing 737-800, Boeing 777-200LR, Airbus A220-300, Airbus A330-200)",
      },
      logo: "/airline-logos/iq/iraqi-airways.svg",
      logoExplainer:
        "Features an emerald green circular emblem bearing a stylized golden winged falcon in swift soaring flight, flanked by graceful Arabic calligraphic flourishes representing Mesopotamian legacy, soaring national pride, and modern aviation renewal.",
      sources: [
        "https://www.iraqiairways.iq/",
        "https://en.wikipedia.org/wiki/Iraqi_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  LB: [
    {
      id: "lb-middle-east-airlines",
      countryCode: "LB",
      name: "Middle East Airlines (MEA)",
      iata: "ME",
      icao: "MEA",
      founded: 1945,
      alliance: "SkyTeam",
      hubs: ["Beirut–Rafic Hariri International Airport (BEY)"],
      fleet: {
        total: 22,
        summary:
          "22 aircraft (Airbus A321neo, Airbus A330-200, Airbus A321XLR on order)",
      },
      logo: "/airline-logos/lb/middle-east-airlines.svg",
      logoExplainer:
        "Features a proud red silhouette of the iconic Cedar of Lebanon (Cedrus libani)—the sacred national emblem symbolizing resilience, peace, and immortality—embraced by sweeping aerodynamic wing ribbons in blue and white representing the Levant's historic maritime and aerial gateway.",
      sources: [
        "https://www.mea.com.lb/",
        "https://en.wikipedia.org/wiki/Middle_East_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SY: [
    {
      id: "sy-syrian-air",
      countryCode: "SY",
      name: "Syrian Air",
      iata: "RB",
      icao: "SYR",
      founded: 1946,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Damascus International Airport (DAM)",
        "Aleppo International Airport (ALP)",
      ],
      fleet: {
        total: 10,
        summary: "10 aircraft (Airbus A320-200, Ilyushin Il-76, ATR 72)",
      },
      logo: "/airline-logos/sy/syrian-air.svg",
      logoExplainer:
        "Displays a stylized azure blue bird with swept-back wings encircled within a sky-blue ring, accompanied by clean bilingual Arabic and English typography, symbolizing flight across ancient trade crossroads and peaceful horizons.",
      sources: [
        "https://www.syriaair.com/",
        "https://en.wikipedia.org/wiki/Syrian_Air",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sy-cham-wings",
      countryCode: "SY",
      name: "Cham Wings Airlines",
      iata: "6Q",
      icao: "SAW",
      founded: 2007,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: ["Damascus International Airport (DAM)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/sy/cham-wings.svg",
      logoExplainer:
        "Features stylized aerodynamic wings forming an ascending golden monogram and crest above bold Arabic calligraphy, symbolizing the historic Bilad al-Sham region and commercial air bridges linking Damascus to the wider Middle East.",
      sources: [
        "https://www.chamwings.com/",
        "https://en.wikipedia.org/wiki/Cham_Wings_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  AF: [
    {
      id: "af-ariana-afghan-airlines",
      countryCode: "AF",
      name: "Ariana Afghan Airlines",
      iata: "FG",
      icao: "AFG",
      founded: 1955,
      alliance: "None",
      hubs: ["Kabul International Airport (KBL)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Boeing 737-400, Boeing 737-500, Airbus A310-300)",
      },
      logo: "/airline-logos/af/ariana.svg",
      logoExplainer:
        "Features an encircled soaring blue eagle with outstretched wings poised above a stylized globe meridian line, symbolizing ancient Bactrian and Ariana heritage, freedom of the skies, and sovereign Afghan air connectivity.",
      sources: [
        "https://www.flyariana.com/",
        "https://en.wikipedia.org/wiki/Ariana_Afghan_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  YE: [
    {
      id: "ye-yemenia",
      countryCode: "YE",
      name: "Yemenia",
      iata: "IY",
      icao: "IYE",
      founded: 1962,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Aden International Airport (ADE)",
        "Sanaa International Airport (SAH)",
        "Seiyun Airport (GXF)",
      ],
      fleet: {
        total: 7,
        summary: "7 aircraft (Airbus A330-200, Airbus A320-200)",
      },
      logo: "/airline-logos/ye/yemenia.svg",
      logoExplainer:
        "Features a dynamic tripartite swoosh emblem in vibrant red, white, and midnight blue reflecting the colors of the Yemeni national flag, joined by a stylized winged aircraft arrowhead conveying forward momentum across the Arabian peninsula.",
      sources: [
        "https://www.yemenia.com/",
        "https://en.wikipedia.org/wiki/Yemenia",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  MV: [
    {
      id: "mv-maldivian",
      countryCode: "MV",
      name: "Maldivian",
      iata: "Q2",
      icao: "DQA",
      founded: 2000,
      alliance: "None",
      hubs: ["Velana International Airport (MLE)"],
      fleet: {
        total: 25,
        summary:
          "25 aircraft (Airbus A320-200, Airbus A330-200, ATR 72-600, ATR 42-600, De Havilland Canada Dash 8-300, DHC-6 Twin Otter seaplanes)",
      },
      logo: "/airline-logos/mv/maldivian.svg",
      logoExplainer:
        "Features a gracefully soaring oceanic white tern (dhivehi kanbili) rendered in turquoise and deep sea-blue, evoking the pristine atolls, crystalline waters, and island-hopping aviation identity of the Maldivian archipelago.",
      sources: [
        "https://maldivian.aero/",
        "https://en.wikipedia.org/wiki/Maldivian_(airline)",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "mv-villa-air",
      countryCode: "MV",
      name: "Villa Air (Flyme)",
      iata: "VP",
      icao: "VQI",
      founded: 2011,
      alliance: "None",
      hubs: [
        "Villa Airport Maamigili (VAM)",
        "Velana International Airport (MLE)",
      ],
      fleet: {
        total: 4,
        summary: "4 aircraft (ATR 72-500, ATR 72-600, ATR 42-500)",
      },
      logo: "/airline-logos/mv/villa-air.svg",
      logoExplainer:
        "Features a modern stylized wave-wing in marine cyan and ocean blue forming a buoyant dynamic crest, expressing comfortable island transit to luxury resort atolls across South Ari.",
      sources: [
        "https://flyme.mv/",
        "https://en.wikipedia.org/wiki/Flyme_(Maldives)",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  BT: [
    {
      id: "bt-drukair",
      countryCode: "BT",
      name: "Drukair – Royal Bhutan Airlines",
      iata: "KB",
      icao: "DRK",
      founded: 1981,
      alliance: "None",
      hubs: ["Paro International Airport (PBH)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A320neo, Airbus A319-100, ATR 42-600)",
      },
      logo: "/airline-logos/bt/drukair.svg",
      logoExplainer:
        "Features the sacred Druk (the mythical Thunder Dragon of Bhutanese mythology) in intricate gold and orange soaring with jewel-bearing claws, honoring the Dragon King (Druk Gyalpo) and Bhutan's Himalayan Buddhist heritage against the dramatic mountain approaches of Paro valley.",
      sources: [
        "https://www.drukair.com.bt/",
        "https://en.wikipedia.org/wiki/Drukair",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "bt-bhutan-airlines",
      countryCode: "BT",
      name: "Bhutan Airlines (Tashi Air)",
      iata: "B3",
      icao: "BTN",
      founded: 2011,
      alliance: "None",
      hubs: ["Paro International Airport (PBH)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (Airbus A319-100)",
      },
      logo: "/airline-logos/bt/bhutan-airlines.png",
      logoExplainer:
        "Features the auspicious Tashi tag-gye motif and a stylized golden winged falcon crest in Tibetan gold and crimson, representing blessing, prosperity, and private aviation innovation in the Kingdom of Bhutan.",
      sources: [
        "https://www.bhutanairlines.bt/",
        "https://en.wikipedia.org/wiki/Bhutan_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TM: [
    {
      id: "tm-turkmenistan-airlines",
      countryCode: "TM",
      name: "Turkmenistan Airlines",
      iata: "T5",
      icao: "TUA",
      founded: 1992,
      alliance: "None",
      hubs: ["Ashgabat International Airport (ASB)"],
      fleet: {
        total: 25,
        summary:
          "25 aircraft (Boeing 777-300ER, Boeing 777-200LR, Boeing 737-800, Boeing 737-700, Airbus A330-200P2F cargo)",
      },
      logo: "/airline-logos/tm/turkmenistan-airlines.svg",
      logoExplainer:
        "Features a proud, stylized silver and turquoise falcon (Lachin) in graceful flight encircled within a radiant emerald green crest, reflecting the national bird and traditional falconry heritage of Turkmenistan along the historic Silk Road.",
      sources: [
        "https://turkmenistanairlines.tm/",
        "https://en.wikipedia.org/wiki/Turkmenistan_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  KG: [
    {
      id: "kg-avia-traffic",
      countryCode: "KG",
      name: "Avia Traffic Company",
      iata: "YK",
      icao: "AVJ",
      founded: 2001,
      alliance: "None",
      hubs: [
        "Manas International Airport (FRU)",
        "Osh International Airport (OSS)",
      ],
      fleet: {
        total: 7,
        summary: "7 aircraft (Boeing 737-300, Airbus A320-200)",
      },
      logo: "/airline-logos/kg/avia-traffic.png",
      logoExplainer:
        "Features dynamic winged arrowheads in burgundy and sky-blue paired with bold bilingual Cyrillic and Latin typography, symbolizing dependable air transport connecting Bishkek and Osh across the Tien Shan mountains to Central Asia and Russia.",
      sources: [
        "https://www.aero.kg/",
        "https://en.wikipedia.org/wiki/Avia_Traffic_Company",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "kg-aero-nomad",
      countryCode: "KG",
      name: "Aero Nomad Airlines",
      iata: "KA",
      icao: "ANK",
      founded: 2021,
      alliance: "None",
      hubs: [
        "Manas International Airport (FRU)",
        "Osh International Airport (OSS)",
      ],
      fleet: {
        total: 4,
        summary: "4 aircraft (Airbus A320-200)",
      },
      logo: "/airline-logos/kg/aero-nomad.png",
      logoExplainer:
        "Features an aerodynamic nomad eagle-feather wing in vibrant crimson and gold, inspired by nomadic Kyrgyz falconry traditions and modern international low-cost connectivity.",
      sources: [
        "https://www.aeronomad.kg/",
        "https://en.wikipedia.org/wiki/Aero_Nomad_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TJ: [
    {
      id: "tj-somon-air",
      countryCode: "TJ",
      name: "Somon Air",
      iata: "SZ",
      icao: "SMR",
      founded: 2008,
      alliance: "None",
      hubs: [
        "Dushanbe International Airport (DYU)",
        "Khujand Airport (LBD)",
      ],
      fleet: {
        total: 8,
        summary: "8 aircraft (Boeing 737-800, Boeing 737-900ER)",
      },
      logo: "/airline-logos/tj/somon-air.png",
      logoExplainer:
        "Features a magnificent stylized golden crown and soaring sunburst crest, honoring the Samanid dynasty founder Ismail Somoni and Tajik sovereignty, combined with the deep royal blue 'SOMON AIR' wordmark.",
      sources: [
        "https://www.somonair.com/",
        "https://en.wikipedia.org/wiki/Somon_Air",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  DZ: [
    {
      id: "dz-air-algerie",
      countryCode: "DZ",
      name: "Air Algérie",
      iata: "AH",
      icao: "DAH",
      founded: 1947,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Houari Boumediene Airport (ALG)",
        "Ahmed Ben Bella Airport (ORN)",
        "Mohamed Boudiaf International Airport (CZL)",
      ],
      fleet: {
        total: 56,
        summary:
          "56 aircraft (Airbus A330-200, Boeing 737-800, Boeing 737-700C, Boeing 737-600, ATR 72-500, ATR 72-600; A330-900neo and A350-1000 on order)",
      },
      logo: "/airline-logos/dz/air-algerie.svg",
      logoExplainer:
        "Features the graceful, stylized silhouette of a soaring hirondelle (desert swallow) in scarlet red encircled in white, representing freedom, reliable navigation, and Algerian air connectivity across the Sahara, the Mediterranean, and worldwide.",
      sources: [
        "https://airalgerie.dz/",
        "https://en.wikipedia.org/wiki/Air_Alg%C3%A9rie",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TN: [
    {
      id: "tn-tunisair",
      countryCode: "TN",
      name: "Tunisair",
      iata: "TU",
      icao: "TAR",
      founded: 1948,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Tunis–Carthage International Airport (TUN)",
        "Monastir Habib Bourguiba International Airport (MIR)",
        "Djerba–Zarzis International Airport (DJE)",
      ],
      fleet: {
        total: 28,
        summary:
          "28 aircraft (Airbus A330-200, Airbus A320neo, Airbus A320-200)",
      },
      logo: "/airline-logos/tn/tunisair.svg",
      logoExplainer:
        "Features the legendary scarlet Dorcas gazelle (la gazelle de Tunisair), a historic emblem adopted in 1948 symbolizing Mediterranean grace, agility, and swift flight across North Africa and Europe.",
      sources: [
        "https://www.tunisair.com/",
        "https://en.wikipedia.org/wiki/Tunisair",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "tn-nouvelair",
      countryCode: "TN",
      name: "Nouvelair",
      iata: "BJ",
      icao: "LBT",
      founded: 1989,
      alliance: "None",
      hubs: [
        "Monastir Habib Bourguiba International Airport (MIR)",
        "Tunis–Carthage International Airport (TUN)",
      ],
      fleet: {
        total: 15,
        summary: "15 aircraft (Airbus A320-200, Airbus A320neo)",
      },
      logo: "/airline-logos/tn/nouvelair.svg",
      logoExplainer:
        "Features clean azure and navy wings forming an aerodynamic letterform with a radiant golden compass star, expressing welcoming holiday flights and modern private aviation in Tunisia.",
      sources: [
        "https://www.nouvelair.com/",
        "https://en.wikipedia.org/wiki/Nouvelair",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  LY: [
    {
      id: "ly-libyan-airlines",
      countryCode: "LY",
      name: "Libyan Airlines",
      iata: "LN",
      icao: "LAA",
      founded: 1964,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Mitiga International Airport (MJI)",
        "Benina International Airport (BEN)",
        "Misrata Airport (MRA)",
      ],
      fleet: {
        total: 7,
        summary:
          "7 aircraft (Airbus A330-200, Airbus A320-200, Bombardier CRJ900)",
      },
      logo: "/airline-logos/ly/libyan-airlines.png",
      logoExplainer:
        "Displays a stylized golden winged falcon emblem soaring upwards within a green crescent garland, symbolizing historical resilience, Libyan sovereignty, and civil aviation renewal.",
      sources: [
        "https://en.wikipedia.org/wiki/Libyan_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "ly-afriqiyah-airways",
      countryCode: "LY",
      name: "Afriqiyah Airways",
      iata: "8U",
      icao: "AAW",
      founded: 2001,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Mitiga International Airport (MJI)",
        "Benina International Airport (BEN)",
        "Misrata Airport (MRA)",
      ],
      fleet: {
        total: 5,
        summary: "5 aircraft (Airbus A330-300, Airbus A320-200)",
      },
      logo: "/airline-logos/ly/afriqiyah-airways.svg",
      logoExplainer:
        "Features the historic '9.9.99' emblem rendered in vibrant red, green, and gold dots arranged like a joyful smiling face, commemorating the Sirte Declaration of 9 September 1999 establishing the African Union and continental unity.",
      sources: [
        "https://en.wikipedia.org/wiki/Afriqiyah_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  AO: [
    {
      id: "ao-taag",
      countryCode: "AO",
      name: "TAAG Angola Airlines",
      iata: "DT",
      icao: "DTA",
      founded: 1938,
      alliance: "None",
      hubs: [
        "Dr. António Agostinho Neto International Airport (NBJ)",
        "Quatro de Fevereiro Airport (LAD)",
      ],
      fleet: {
        total: 28,
        summary:
          "28 aircraft (Boeing 777-300ER, Boeing 777-200ER, Boeing 737-700, De Havilland Dash 8-Q400; Boeing 787-9 and Airbus A220-300 entering service)",
      },
      logo: "/airline-logos/ao/taag.png",
      logoExplainer:
        "Features the legendary Palanca Negra Gigante (giant sable antelope, Angola's revered national animal found only in Malanje Province), with its majestic curved horns sweeping back above stylized speed wings and the bold terracotta-red and black TAAG wordmark, embodying Angolan endurance, grace, and national sovereignty.",
      sources: [
        "https://www.taag.com/",
        "https://en.wikipedia.org/wiki/TAAG_Angola_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  CI: [
    {
      id: "ci-air-cote-divoire",
      countryCode: "CI",
      name: "Air Côte d'Ivoire",
      iata: "HF",
      icao: "VRE",
      founded: 2012,
      alliance: "None",
      hubs: ["Félix-Houphouët-Boigny International Airport (ABJ)"],
      fleet: {
        total: 10,
        summary:
          "10 aircraft (Airbus A320neo, Airbus A320-200, Airbus A319-100, De Havilland Dash 8-Q400; Airbus A330-900neo on order)",
      },
      logo: "/airline-logos/ci/air-cote-divoire.svg",
      logoExplainer:
        "Features dynamic sweeping wings in the national colors of Côte d'Ivoire—vibrant orange, white, and savannah green—forming a forward-thrusting aerodynamic monogram that represents West African unity, regional hub connectivity from Abidjan, and the warmth of the Ivorian nation.",
      sources: [
        "https://www.aircotedivoire.com/",
        "https://en.wikipedia.org/wiki/Air_C%C3%B4te_d%27Ivoire",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  GH: [
    {
      id: "gh-africa-world-airlines",
      countryCode: "GH",
      name: "Africa World Airlines (AWA)",
      iata: "2A",
      icao: "AFW",
      founded: 2010,
      alliance: "None",
      hubs: ["Kotoka International Airport (ACC)"],
      fleet: {
        total: 8,
        summary: "8 aircraft (Embraer ERJ 145)",
      },
      logo: "/airline-logos/gh/africa-world-airlines.png",
      logoExplainer:
        "Features a bold red and blue globe meridian emblem encircled by dynamic aircraft speed wings, accompanied by clean modern typography in navy blue, symbolizing dependable inter-city connectivity across Ghana and West African regional hubs.",
      sources: [
        "https://www.flyafricaworld.com/",
        "https://en.wikipedia.org/wiki/Africa_World_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  CM: [
    {
      id: "cm-camair-co",
      countryCode: "CM",
      name: "Camair-Co",
      iata: "QC",
      icao: "CRC",
      founded: 2006,
      alliance: "None",
      hubs: [
        "Douala International Airport (DLA)",
        "Yaoundé Nsimalen International Airport (NSI)",
      ],
      fleet: {
        total: 6,
        summary:
          "6 aircraft (Boeing 767-300ER, Boeing 737-700, De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/cm/camair-co.png",
      logoExplainer:
        "Features the iconic golden five-pointed Star of Cameroon (L'Étoile d'Unité) soaring across dynamic green, red, and yellow arcs mirroring the Cameroon national tricolor, symbolizing unity, vitality, and dependable aerial bridges across Central Africa.",
      sources: [
        "https://www.camair-co.cm/",
        "https://en.wikipedia.org/wiki/Camair-Co",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TZ: [
    {
      id: "tz-air-tanzania",
      countryCode: "TZ",
      name: "Air Tanzania ('The Wings of Kilimanjaro')",
      iata: "TC",
      icao: "ATC",
      founded: 1977,
      alliance: "None",
      hubs: ["Julius Nyerere International Airport (DAR)"],
      fleet: {
        total: 15,
        summary:
          "15 aircraft (Boeing 787-8 Dreamliner, Boeing 767-300F cargo, Boeing 737 MAX 9, Airbus A220-300, De Havilland Dash 8-Q400, Dash 8-Q300)",
      },
      logo: "/airline-logos/tz/air-tanzania.svg",
      logoExplainer:
        "Features the graceful Twiga (the Maasai giraffe, Tanzania's national animal and symbol of peaceful far-sighted vision) rendered on the tailfin in gleaming yellow against deep African blue, accompanied by the proud motto 'The Wings of Kilimanjaro' connecting Dar es Salaam across Africa, the Middle East, and Asia.",
      sources: [
        "https://www.airtanzania.co.tz/",
        "https://en.wikipedia.org/wiki/Air_Tanzania",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "tz-precision-air",
      countryCode: "TZ",
      name: "Precision Air",
      iata: "PW",
      icao: "PRF",
      founded: 1993,
      alliance: "None",
      hubs: ["Julius Nyerere International Airport (DAR)"],
      fleet: {
        total: 9,
        summary: "9 aircraft (ATR 72-500, ATR 42-500, ATR 42-600)",
      },
      logo: "/airline-logos/tz/precision-air.svg",
      logoExplainer:
        "Features a bold red and blue aerodynamic crest depicting an aircraft ascending past a stylized Mount Kilimanjaro summit, representing premier safari tourism access and regional aviation excellence across East Africa.",
      sources: [
        "https://www.precisionairtz.com/",
        "https://en.wikipedia.org/wiki/Precision_Air",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  UG: [
    {
      id: "ug-uganda-airlines",
      countryCode: "UG",
      name: "Uganda Airlines",
      iata: "UR",
      icao: "UGD",
      founded: 2018,
      alliance: "None",
      hubs: ["Entebbe International Airport (EBB)"],
      fleet: {
        total: 6,
        summary:
          "6 aircraft (Airbus A330-800neo, Bombardier CRJ900 Atmosphere)",
      },
      logo: "/airline-logos/ug/uganda-airlines.svg",
      logoExplainer:
        "Features the regal Grey Crowned Crane (Uganda's national bird, Balearica regulorum gibbericeps) soaring gracefully, rendered in the national tricolor of black, vibrant yellow, and crimson red, symbolizing resilience, East African warmth, and international prestige as the Pearl of Africa.",
      sources: [
        "https://www.ugandairlines.com/",
        "https://en.wikipedia.org/wiki/Uganda_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  MG: [
    {
      id: "mg-madagascar-airlines",
      countryCode: "MG",
      name: "Madagascar Airlines",
      iata: "MD",
      icao: "MGY",
      founded: 1947,
      alliance: "None",
      hubs: ["Ivato International Airport (TNR)"],
      fleet: {
        total: 9,
        summary:
          "9 aircraft (ATR 72-500, ATR 72-600, De Havilland Canada DHC-6 Twin Otter; Boeing 787 on order)",
      },
      logo: "/airline-logos/mg/madagascar-airlines.svg",
      logoExplainer:
        "Features the stylized, iconic Ravinala tree (the traveller's palm, Ravenala madagascariensis, Madagascar's national botanical symbol) forming an aerodynamic fan of green fronds with a blossoming crest, evoking island shelter, biodiversity, and Indian Ocean hospitality.",
      sources: [
        "https://madagascarairlines.com/",
        "https://en.wikipedia.org/wiki/Madagascar_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  MZ: [
    {
      id: "mz-lam-mozambique",
      countryCode: "MZ",
      name: "LAM Mozambique Airlines",
      iata: "TM",
      icao: "LAM",
      founded: 1936,
      alliance: "None",
      hubs: ["Maputo International Airport (MPM)"],
      fleet: {
        total: 7,
        summary:
          "7 aircraft (Boeing 737-700, Bombardier CRJ900, De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/mz/lam-mozambique.svg",
      logoExplainer:
        "Features dynamic sweeping waves in turquoise, teal, and charcoal forming an aerodynamic bird-in-flight motif, symbolizing maritime breezes off the Indian Ocean, coastal connectivity, and continuous links between Maputo, Beira, and Nampula.",
      sources: [
        "https://www.lam.co.mz/",
        "https://en.wikipedia.org/wiki/LAM_Mozambique_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  NA: [
    {
      id: "na-air-namibia",
      countryCode: "NA",
      name: "Air Namibia",
      iata: "SW",
      icao: "NMB",
      founded: 1946,
      alliance: "None",
      hubs: [
        "Hosea Kutako International Airport (WDH)",
        "Eros Airport (ERS)",
      ],
      fleet: {
        total: 10,
        summary:
          "Historic operations operated Airbus A330-200, Airbus A319-100, and Embraer ERJ 135 across Southern Africa and Europe",
      },
      logo: "/airline-logos/na/air-namibia.svg",
      logoExplainer:
        "Features dynamic desert-and-sky speed chevrons in sun-gold, deep navy, and ocean blue reflecting the Namib Desert dunes, the South Atlantic coastline, and the radiant southern sun of Namibia.",
      sources: [
        "https://en.wikipedia.org/wiki/Air_Namibia",
      ],
      licenceNote:
        "Commercial airline trademark and historical brand logo bundled for educational reference in Learn mode.",
    },
  ],
  BW: [
    {
      id: "bw-air-botswana",
      countryCode: "BW",
      name: "Air Botswana ('Going Your Way')",
      iata: "BP",
      icao: "BOT",
      founded: 1972,
      alliance: "None",
      hubs: ["Sir Seretse Khama International Airport (GBE)"],
      fleet: {
        total: 5,
        summary: "5 aircraft (Embraer E175, ATR 72-600)",
      },
      logo: "/airline-logos/bw/air-botswana.svg",
      logoExplainer:
        "Features sweeping wings and curved speed bands in sky-blue and jet-black drawn from the national flag of Botswana, celebrating the precious gift of Pula (rain and life), welcoming Southern African hospitality, and effortless travel to the Okavango Delta and Chobe.",
      sources: [
        "https://airbotswana.co.bw/",
        "https://en.wikipedia.org/wiki/Air_Botswana",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ZW: [
    {
      id: "zw-air-zimbabwe",
      countryCode: "ZW",
      name: "Air Zimbabwe",
      iata: "UM",
      icao: "AZW",
      founded: 1967,
      alliance: "None",
      hubs: [
        "Robert Gabriel Mugabe International Airport (HRE)",
        "Joshua Mqabuko Nkomo International Airport (BUQ)",
      ],
      fleet: {
        total: 2,
        summary:
          "2 aircraft (Boeing 767-200ER, Boeing 737-200, Embraer ERJ 145)",
      },
      logo: "/airline-logos/zw/air-zimbabwe.svg",
      logoExplainer:
        "Features the sacred Zimbabwe Bird (a carved soapstone raptor from the ancient city of Great Zimbabwe, the national emblem), crowned by the socialist red star within an aerodynamic multi-striped disc in the national colors (green, gold, red, and black), representing national sovereignty, ancient heritage, and African skies.",
      sources: [
        "https://www.airzimbabwe.aero/",
        "https://en.wikipedia.org/wiki/Air_Zimbabwe",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "zw-fastjet",
      countryCode: "ZW",
      name: "Fastjet Zimbabwe",
      iata: "FN",
      icao: "FJW",
      founded: 2015,
      alliance: "None",
      hubs: [
        "Robert Gabriel Mugabe International Airport (HRE)",
        "Victoria Falls Airport (VFA)",
      ],
      fleet: {
        total: 7,
        summary:
          "7 aircraft (Embraer ERJ 145, Embraer EMB 120 Brasilia)",
      },
      logo: "/airline-logos/zw/fastjet.png",
      logoExplainer:
        "Features the friendly African Grey Parrot mascot in cheerful sunburst yellow and charcoal grey, symbolizing affordable, punctual low-cost air travel connecting Harare, Bulawayo, and the magnificent Victoria Falls.",
      sources: [
        "https://www.fastjet.com/",
        "https://en.wikipedia.org/wiki/Fastjet_Zimbabwe",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ZM: [
    {
      id: "zm-proflight-zambia",
      countryCode: "ZM",
      name: "Proflight Zambia",
      iata: "P0",
      icao: "PFZ",
      founded: 1991,
      alliance: "None",
      hubs: ["Kenneth Kaunda International Airport (LUN)"],
      fleet: {
        total: 10,
        summary:
          "10 aircraft (Bombardier CRJ200, Bombardier CRJ100, British Aerospace Jetstream 41)",
      },
      logo: "/airline-logos/zm/proflight-zambia.png",
      logoExplainer:
        "Displays a stylized golden African fish eagle (Zambia's national bird, Haliaeetus vocifer) in swift ascending flight, paired with dark navy lettering, representing reliable scheduled wings linking Lusaka with Livingstone (Victoria Falls), Ndola, Solwezi, and South Luangwa National Park.",
      sources: [
        "https://www.proflight-zambia.com/",
        "https://en.wikipedia.org/wiki/Proflight_Zambia",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SD: [
    {
      id: "sd-sudan-airways",
      countryCode: "SD",
      name: "Sudan Airways",
      iata: "SD",
      icao: "SUD",
      founded: 1946,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Khartoum International Airport (KRT)",
        "Port Sudan New International Airport (PZU)",
      ],
      fleet: {
        total: 2,
        summary: "2 aircraft (Airbus A320-200, Boeing 737)",
      },
      logo: "/airline-logos/sd/sudan-airways.svg",
      logoExplainer:
        "Features a stylized white secretary bird (Sagittarius serpentarius, Sudan's national bird emblem) soaring dynamically against an emerald green disc, reflecting centuries of Nile valley culture and seven decades of pioneering African air routes.",
      sources: [
        "https://sudanair.com/",
        "https://en.wikipedia.org/wiki/Sudan_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "sd-badr-airlines",
      countryCode: "SD",
      name: "Badr Airlines",
      iata: "J4",
      icao: "BDR",
      founded: 2004,
      alliance: "Arab Air Carriers' Organization (AACO)",
      hubs: [
        "Port Sudan New International Airport (PZU)",
        "Khartoum International Airport (KRT)",
      ],
      fleet: {
        total: 7,
        summary: "7 aircraft (Boeing 737-800, Boeing 737-500)",
      },
      logo: "/airline-logos/sd/badr-airlines.png",
      logoExplainer:
        "Features a radiant golden full moon and soaring bird crescent emblem, evoking the historic Battle of Badr and celestial guidance, paired with bold Arabic and English typography.",
      sources: [
        "https://badrairlines.com/",
        "https://en.wikipedia.org/wiki/Badr_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  CV: [
    {
      id: "cv-cabo-verde-airlines",
      countryCode: "CV",
      name: "Cabo Verde Airlines",
      iata: "VR",
      icao: "TCV",
      founded: 1958,
      alliance: "None",
      hubs: [
        "Amílcar Cabral International Airport (SID)",
        "Nelson Mandela International Airport (RAI)",
      ],
      fleet: {
        total: 2,
        summary: "2 aircraft (Boeing 737 MAX 8, Boeing 737-700)",
      },
      logo: "/airline-logos/cv/cabo-verde-airlines.svg",
      logoExplainer:
        "Displays dynamic ocean-blue, magenta, and coral ribbons forming the stylized letters 'C' and 'V' alongside soaring seabird wings, celebrating the Atlantic trade winds, vibrant Creole culture, and island-hopping between the Barlavento and Sotavento archipelagos.",
      sources: [
        "https://www.caboverdeairlines.com/",
        "https://en.wikipedia.org/wiki/Cabo_Verde_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  GA: [
    {
      id: "ga-fly-gabon",
      countryCode: "GA",
      name: "FlyGabon (AfriJet)",
      iata: "J7",
      icao: "ABS",
      founded: 2024,
      alliance: "None",
      hubs: [
        "Léon-Mba International Airport (LBV)",
        "Port-Gentil International Airport (POG)",
      ],
      fleet: {
        total: 8,
        summary: "8 aircraft (ATR 72-600, Airbus A320-200)",
      },
      logo: "/airline-logos/ga/fly-gabon.png",
      logoExplainer:
        "Features a bold, stylized soaring hornbill wing in deep emerald green, sunny gold, and marine blue mirroring the Gabonese national flag, symbolizing national renewal, equatorial rainforest biodiversity, and sovereign air connectivity across Central Africa.",
      sources: [
        "https://www.flygabon.com/",
        "https://en.wikipedia.org/wiki/FlyGabon",
        "https://en.wikipedia.org/wiki/AfriJet",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  CD: [
    {
      id: "cd-congo-airways",
      countryCode: "CD",
      name: "Congo Airways",
      iata: "8Z",
      icao: "CGA",
      founded: 2014,
      alliance: "None",
      hubs: [
        "N'djili Airport (FIH)",
        "Lubumbashi International Airport (FBM)",
      ],
      fleet: {
        total: 3,
        summary: "3 aircraft (Airbus A320-200, De Havilland Dash 8-Q400)",
      },
      logo: "/airline-logos/cd/congo-airways.png",
      logoExplainer:
        "Features the bold silhouette of a soaring leopard (the national animal of the DRC, symbolizing strength, dignity, and agility) poised within a radiant golden and crimson circle with sweeping wings, reflecting Congolese unity and trans-continental connection across the Congo River basin.",
      sources: [
        "https://www.congoairways.com/",
        "https://en.wikipedia.org/wiki/Congo_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  CG: [
    {
      id: "cg-trans-air-congo",
      countryCode: "CG",
      name: "Trans Air Congo (TAC)",
      iata: "Q8",
      icao: "TSG",
      founded: 1994,
      alliance: "None",
      hubs: [
        "Pointe Noire Airport (PNR)",
        "Maya-Maya Airport (BZV)",
      ],
      fleet: {
        total: 5,
        summary: "5 aircraft (Boeing 737-300, Boeing 737-200)",
      },
      logo: "/airline-logos/cg/trans-air-congo.png",
      logoExplainer:
        "Features an aerodynamic navy blue and forest green winged letterform with modern italic typography, symbolizing dependable scheduled passenger bridges between Brazzaville, the Atlantic port city of Pointe-Noire, and neighboring Central African capitals.",
      sources: [
        "https://www.flytransaircongo.com/",
        "https://en.wikipedia.org/wiki/Trans_Air_Congo",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  DJ: [
    {
      id: "dj-air-djibouti",
      countryCode: "DJ",
      name: "Air Djibouti ('Red Sea Airlines')",
      iata: "DJ",
      icao: "DJI",
      founded: 1963,
      alliance: "None",
      hubs: ["Djibouti–Ambouli International Airport (JIB)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (Boeing 737-500, Boeing 737-400, BAe 146)",
      },
      logo: "/airline-logos/dj/air-djibouti.svg",
      logoExplainer:
        "Features the red five-pointed star of Djibouti and dynamic speed ribbons in sky-blue and emerald green evoking the national flag, representing Djibouti's strategic position as the vibrant maritime and aerial crossroads of the Red Sea and the Horn of Africa.",
      sources: [
        "https://air-djibouti.com/",
        "https://en.wikipedia.org/wiki/Air_Djibouti",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ER: [
    {
      id: "er-eritrean-airlines",
      countryCode: "ER",
      name: "Eritrean Airlines",
      iata: "B8",
      icao: "ERT",
      founded: 1991,
      alliance: "None",
      hubs: ["Asmara International Airport (ASM)"],
      fleet: {
        total: 1,
        summary: "1 aircraft (Boeing 737)",
      },
      logo: "/airline-logos/er/eritrean-airlines.png",
      logoExplainer:
        "Features an upright golden olive branch wreath—the national emblem of Eritrea symbolizing peace, freedom, and triumph—encircling a dynamic ascending aircraft arrow, reflecting national independence and air links connecting Asmara to the Red Sea, the Gulf, and Africa.",
      sources: [
        "https://en.wikipedia.org/wiki/Eritrean_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SO: [
    {
      id: "so-daallo-airlines",
      countryCode: "SO",
      name: "Daallo Airlines",
      iata: "D3",
      icao: "DAO",
      founded: 1991,
      alliance: "None",
      hubs: [
        "Aden Adde International Airport (MGQ)",
        "Hargeisa Egal International Airport (HGA)",
        "Djibouti–Ambouli International Airport (JIB)",
      ],
      fleet: {
        total: 2,
        summary: "2 aircraft (Boeing 737-300, Boeing 737-400)",
      },
      logo: "/airline-logos/so/daallo-airlines.png",
      logoExplainer:
        "Displays the soaring gazelle in mid-leap across radiant desert-gold and sky-blue aerodynamic arcs, symbolizing speed, resilience, and lifeline air connectivity across the Somali peninsula, the Horn of Africa, and the Arabian Gulf.",
      sources: [
        "https://daallo.com/",
        "https://en.wikipedia.org/wiki/Daallo_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  MR: [
    {
      id: "mr-mauritania-airlines",
      countryCode: "MR",
      name: "Mauritania Airlines",
      iata: "L6",
      icao: "MAI",
      founded: 2010,
      alliance: "None",
      hubs: ["Nouakchott–Oumtounsy International Airport (NKC)"],
      fleet: {
        total: 6,
        summary:
          "6 aircraft (Boeing 737 MAX 8, Boeing 737-800, Boeing 737-700, Embraer ERJ 145, Embraer E175)",
      },
      logo: "/airline-logos/mr/mauritania-airlines.png",
      logoExplainer:
        "Features an aerodynamic emblem in Islamic green and radiant desert gold depicting a stylized crescent and soaring aircraft wings, accompanied by Arabic calligraphic script, symbolizing Mauritania's identity as a bridge between the Maghreb and Sub-Saharan West Africa.",
      sources: [
        "https://www.mauritaniaairlines.mr/",
        "https://en.wikipedia.org/wiki/Mauritania_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ML: [
    {
      id: "ml-sky-mali",
      countryCode: "ML",
      name: "Sky Mali",
      iata: "ML3",
      icao: "FMY",
      founded: 2020,
      alliance: "None",
      hubs: ["Modibo Keita International Airport (BKO)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (Boeing 737-500, Xian MA60)",
      },
      logo: "/airline-logos/ml/sky-mali.png",
      logoExplainer:
        "Features dynamic sweeping wings in Mali's national tricolor—vibrant green, gold, and red—circling a sky-blue globe, symbolizing modern domestic aviation linking Bamako with historic Niger River cities including Kayes, Mopti, Gao, and Timbuktu.",
      sources: [
        "https://flyskymali.com/",
        "https://en.wikipedia.org/wiki/Sky_Mali",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  BF: [
    {
      id: "bf-air-burkina",
      countryCode: "BF",
      name: "Air Burkina ('Les ailes de l'Afrique')",
      iata: "2J",
      icao: "VBW",
      founded: 1967,
      alliance: "None",
      hubs: [
        "Thomas Sankara International Airport Ouagadougou (OUA)",
      ],
      fleet: {
        total: 2,
        summary: "2 aircraft (Embraer E195, Embraer E175)",
      },
      logo: "/airline-logos/bf/air-burkina.svg",
      logoExplainer:
        "Features the golden five-pointed star of Burkina Faso superimposed on an aerodynamic horse crest and soaring wings in pan-African red and green, reflecting the 'Land of Incorruptible People' and pioneering commercial aviation across West Africa.",
      sources: [
        "https://air-burkina.com/",
        "https://en.wikipedia.org/wiki/Air_Burkina",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  NE: [
    {
      id: "ne-niger-airlines",
      countryCode: "NE",
      name: "Niger Airlines",
      iata: "6N",
      icao: "NIN",
      founded: 2012,
      alliance: "None",
      hubs: ["Diori Hamani International Airport (NIM)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (ATR 72-500, ATR 72-200)",
      },
      logo: "/airline-logos/ne/niger-airlines.png",
      logoExplainer:
        "Displays a stylized sunburst and curved flight bands in Sahara orange and white, symbolizing reliable lifeline passenger flights connecting Niamey across the Sahelian interior to Agadez, Maradi, and Zinder.",
      sources: [
        "https://www.nigerairlines.net/",
        "https://en.wikipedia.org/wiki/Niger_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TD: [
    {
      id: "td-tchadia-airlines",
      countryCode: "TD",
      name: "Tchadia Airlines",
      iata: "OT",
      icao: "CDO",
      founded: 2018,
      alliance: "None",
      hubs: ["N'Djamena International Airport (NDJ)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (Bombardier Dash 8-Q400)",
      },
      logo: "/airline-logos/td/tchadia-airlines.svg",
      logoExplainer:
        "Features sweeping wings and curved speed bands in the Chadian national tricolor of indigo blue, sun gold, and crimson red, symbolizing modern commercial revival and vital air connectivity linking N'Djamena to Abéché, Moundou, and Sarh.",
      sources: [
        "https://en.wikipedia.org/wiki/Tchadia_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  TG: [
    {
      id: "tg-asky-airlines",
      countryCode: "TG",
      name: "ASKY Airlines",
      iata: "KP",
      icao: "SKK",
      founded: 2008,
      alliance: "None",
      hubs: ["Gnassingbé Eyadéma International Airport (LFW)"],
      fleet: {
        total: 15,
        summary:
          "15 aircraft (Boeing 737 MAX 8, Boeing 737-800, Boeing 737-700)",
      },
      logo: "/airline-logos/tg/asky-airlines.png",
      logoExplainer:
        "Features an aerodynamic chocolate-brown and sun-gold soaring bird with broad wings, symbolizing pan-African connectivity, commercial integration, and premier passenger links between Lomé and over 26 destinations across West and Central Africa.",
      sources: [
        "https://www.flyasky.com/",
        "https://en.wikipedia.org/wiki/Asky_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  GQ: [
    {
      id: "gq-ceiba-intercontinental",
      countryCode: "GQ",
      name: "CEIBA Intercontinental",
      iata: "C2",
      icao: "CEL",
      founded: 2007,
      alliance: "None",
      hubs: [
        "Malabo International Airport (SSG)",
        "Bata Airport (BSG)",
      ],
      fleet: {
        total: 7,
        summary:
          "7 aircraft (Boeing 777-200LR, Boeing 737-800, ATR 72-500, ATR 42-500)",
      },
      logo: "/airline-logos/gq/ceiba-intercontinental.svg",
      logoExplainer:
        "Features the majestic sacred Ceiba tree (silk-cotton tree, the national tree of Equatorial Guinea featured on the national coat of arms) stylized into dynamic azure and emerald aerodynamic wings, representing strength, natural abundance, and sovereign air travel connecting Bioko Island with the mainland and Europe.",
      sources: [
        "https://www.ceiba-intercontinental.com/",
        "https://en.wikipedia.org/wiki/CEIBA_Intercontinental",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  MW: [
    {
      id: "mw-malawi-airlines",
      countryCode: "MW",
      name: "Malawi Airlines",
      iata: "3W",
      icao: "MWI",
      founded: 2013,
      alliance: "None",
      hubs: [
        "Kamuzu International Airport (LLW)",
        "Chileka International Airport (BLZ)",
      ],
      fleet: {
        total: 2,
        summary:
          "2 aircraft (Boeing 737-700, Bombardier Dash 8-Q400)",
      },
      logo: "/airline-logos/mw/malawi-airlines.png",
      logoExplainer:
        "Displays the rising sun motif of Malawi in radiant dawn red and amber rays cresting over azure flight ribbons, symbolizing the dawn of hope and freedom as the 'Warm Heart of Africa' connecting Lilongwe and Blantyre to Southern and East Africa.",
      sources: [
        "https://www.malawian-airlines.com/",
        "https://en.wikipedia.org/wiki/Malawi_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SZ: [
    {
      id: "sz-eswatini-air",
      countryCode: "SZ",
      name: "Eswatini Air",
      iata: "RN",
      icao: "SZL",
      founded: 2021,
      alliance: "None",
      hubs: ["King Mswati III International Airport (SHO)"],
      fleet: {
        total: 2,
        summary: "2 aircraft (Embraer ERJ 145)",
      },
      logo: "/airline-logos/sz/eswatini-air.png",
      logoExplainer:
        "Features the regal ceremonial shield (Emasotsha/Lijobo) and feathers of the Kingdom of Eswatini in vibrant crimson, royal blue, and gold, symbolizing ancient Swazi monarchical traditions and sovereign modern air transport connecting Sikhuphe with Johannesburg, Durban, Cape Town, and Harare.",
      sources: [
        "https://eswatiniair.co.sz/",
        "https://en.wikipedia.org/wiki/Eswatini_Air",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ST: [
    {
      id: "st-stp-airways",
      countryCode: "ST",
      name: "STP Airways",
      iata: "8F",
      icao: "STP",
      founded: 2008,
      alliance: "None",
      hubs: ["São Tomé International Airport (TMS)"],
      fleet: {
        total: 2,
        summary:
          "2 aircraft (Boeing 767-300ER, Boeing 737 operated via EuroAtlantic Airways)",
      },
      logo: "/airline-logos/st/stp-airways.svg",
      logoExplainer:
        "Features an aerodynamic emblem in the national tricolor of São Tomé and Príncipe—vibrant red, warm golden yellow, and emerald green—with two black stars honoring the two equatorial volcanic islands and dependable inter-island and international air transport.",
      sources: [
        "https://www.stpairways.st/",
        "https://en.wikipedia.org/wiki/STP_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  ME: [
    {
      id: "me-air-montenegro",
      countryCode: "ME",
      name: "Air Montenegro (To Montenegro)",
      iata: "4O",
      icao: "MNE",
      founded: 2021,
      alliance: "None",
      hubs: [
        "Podgorica Airport (TGD)",
        "Tivat Airport (TIV)",
      ],
      fleet: {
        total: 4,
        summary: "4 aircraft (Embraer E195, Airbus A320-200)",
      },
      logo: "/airline-logos/me/air-montenegro.svg",
      logoExplainer:
        "Features an aerodynamic emblem derived from the double-headed Montenegrin eagle, stylized with sleek royal blue wings and modern typography, symbolizing independence, coastal Mediterranean tourism, and European air connectivity.",
      sources: [
        "https://airmontenegro.com/",
        "https://en.wikipedia.org/wiki/Air_Montenegro",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SK: [
    {
      id: "sk-airexplore",
      countryCode: "SK",
      name: "AirExplore",
      iata: "ED",
      icao: "AXE",
      founded: 2010,
      alliance: "None",
      hubs: ["Bratislava Airport (BTS)"],
      fleet: {
        total: 12,
        summary:
          "12 aircraft (Boeing 737-800, Boeing 737-800BCF cargo)",
      },
      logo: "/airline-logos/sk/airexplore.svg",
      logoExplainer:
        "Features a dynamic geometric crest composed of golden-yellow and sapphire blue triangular faceted aircraft wings, conveying precision aeronautical engineering, charter agility, and ACMI leasing reliability across Europe and worldwide.",
      sources: [
        "https://airexplore.sk/",
        "https://en.wikipedia.org/wiki/AirExplore",
      ],
      licenceNote:
        "Commercial airline trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  SI: [
    {
      id: "si-adria-airways",
      countryCode: "SI",
      name: "Adria Airways",
      iata: "JP",
      icao: "ADR",
      founded: 1961,
      alliance: "Star Alliance",
      hubs: ["Ljubljana Jože Pučnik Airport (LJU)"],
      fleet: {
        total: 20,
        summary:
          "Historic operations operated Airbus A319-100, Bombardier CRJ900, Bombardier CRJ700, and Saab 2000 across Europe",
      },
      logo: "/airline-logos/si/adria-airways.svg",
      logoExplainer:
        "Features the bold, modern 'ADRIA' typography flanked by the iconic Star Alliance member emblem and aerodynamic tail ribbons, celebrating nearly six decades as Slovenia's sovereign aviation ambassador to Europe and the Balkans.",
      sources: [
        "https://en.wikipedia.org/wiki/Adria_Airways",
      ],
      licenceNote:
        "Commercial airline trademark and historic brand logo bundled for educational reference in Learn mode.",
    },
  ],
  BA: [
    {
      id: "ba-bh-airlines",
      countryCode: "BA",
      name: "B&H Airlines",
      iata: "JA",
      icao: "BON",
      founded: 1994,
      alliance: "None",
      hubs: ["Sarajevo International Airport (SJJ)"],
      fleet: {
        total: 3,
        summary:
          "Historic operations operated ATR 72-212, Boeing 737-400, and Airbus A319 connecting Bosnia to European capitals",
      },
      logo: "/airline-logos/ba/bh-airlines.png",
      logoExplainer:
        "Features dynamic sweeping flight bands and stylized wing chevrons in Aegean blue and warm golden-yellow echoing the national colors of Bosnia and Herzegovina, representing reliable air bridges connecting Sarajevo to Zurich, Frankfurt, Istanbul, and Vienna.",
      sources: [
        "https://en.wikipedia.org/wiki/B%26H_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and historic logo bundled for educational reference in Learn mode.",
    },
  ],
  MK: [
    {
      id: "mk-mat-macedonian",
      countryCode: "MK",
      name: "MAT Macedonian Airlines",
      iata: "IN",
      icao: "MAK",
      founded: 1994,
      alliance: "None",
      hubs: [
        "Skopje International Airport (SKP)",
        "Ohrid St. Paul the Apostle Airport (OHD)",
      ],
      fleet: {
        total: 5,
        summary:
          "Historic operations operated Boeing 737-300, Boeing 737-500, and McDonnell Douglas DC-9",
      },
      logo: "/airline-logos/mk/mat-macedonian.png",
      logoExplainer:
        "Displays the stylized acronym 'MAT' accompanied by dynamic aerodynamic speed arcs in royal red and golden yellow reflecting the Macedonian sun and national flag, symbolizing fifteen years of sovereign scheduled passenger service across Europe.",
      sources: [
        "https://en.wikipedia.org/wiki/MAT_Macedonian_Airlines",
      ],
      licenceNote:
        "Commercial airline trademark and historic logo bundled for educational reference in Learn mode.",
    },
  ],
};



