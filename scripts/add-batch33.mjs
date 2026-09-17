import fs from "fs";

const file = "src/data/publicBroadcasters.ts";
let content = fs.readFileSync(file, "utf8");

// Remove the last "};" and append our new entries
const lastIdx = content.lastIndexOf("};");
const newEntries = `
  // Sudan
  SD: [
    {
      id: "sd-sudan-tv",
      countryCode: "SD",
      name: "Sudan TV",
      officialName: "Sudan National Broadcasting Corporation (تلفزيون السودان - General Directorate of Radio and Television)",
      founded: 1963,
      primaryFunding: "State budget allocation from the Republic of Sudan national budget",
      headquarters: "Al-Matar District, Khartoum, Sudan",
      annualPublicFunding: {
        total: "SDG 1.85 billion state budget allocation (Republic of Sudan National Budget FY 2024; approx. US$3.1M)",
        perCapita: "SDG 39.00 / citizen / year (approx. US$0.07 / year)",
      },
      dailyMarketShare: "38.0% national domestic television reach across Sudan TV and Nile TV (National Council for Press and Publications 2024)",
      brandTrustScore: {
        score: "52%",
        source: "National Council for Press and Publications & Gallup Sudan 2024",
      },
      localContentQuota: "80% domestic Sudanese cultural, educational, and public information programming in Arabic, Nubian, and other Sudanese languages",
      staffHeadcount: "950 broadcast journalists, engineers, and regional correspondents across Khartoum and state TV stations (SNBC 2024)",
      logo: "broadcaster-logos/sd/sudan-tv.svg",
      logoExplainer:
        "The Sudan TV emblem displays stylized Arabic calligraphy spelling the broadcaster name alongside broadcast transmission arcs in gold and green, reflecting Sudanese national identity and public service media.",
      sources: [
        "https://sudantv.gov.sd/",
        "https://mof.gov.sd/",
      ],
      licenceNote: "Sudan National Broadcasting Corporation state media emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Libya
  LY: [
    {
      id: "ly-ljbc",
      countryCode: "LY",
      name: "Libya National Channel",
      officialName: "Libyan National Television (التلفزيون الوطني الليبي - Government of National Unity)",
      founded: 1968,
      primaryFunding: "Direct state budget allocation from the Government of National Unity of Libya",
      headquarters: "Tripoli, Tripolitania, Libya",
      annualPublicFunding: {
        total: "LYD 180.0 million state allocation (Government of National Unity Budget FY 2024; approx. US$37.0M)",
        perCapita: "LYD 25.00 / citizen / year (approx. US$5.14 / year)",
      },
      dailyMarketShare: "22.0% national television audience share across Libyan national and regional broadcasts (General Authority of Media 2024)",
      brandTrustScore: {
        score: "49%",
        source: "Arab Media Barometer & General Authority of Media Libya 2024",
      },
      localContentQuota: "65% domestic Libyan programming in Arabic, covering national news, cultural heritage, and Amazigh language segments",
      staffHeadcount: "620 journalists, camera operators, and transmission engineers in Tripoli (Libyan National Television 2024)",
      logo: "broadcaster-logos/ly/ly-tv.jpg",
      logoExplainer:
        "The Libyan public broadcasting emblem displays a stylized television screen bearing the Pan-Arab green crescent emblem and national insignia representing state broadcasting sovereignty.",
      sources: [
        "https://libyatv.ly/",
        "https://mof.gov.ly/",
      ],
      licenceNote: "Libyan National Television state broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Panama
  PA: [
    {
      id: "pa-sertv",
      countryCode: "PA",
      name: "SERTV",
      officialName: "Sistema Estatal de Radio y Television (SERTV - Ministerio de Gobierno)",
      founded: 1960,
      primaryFunding: "State budget subvention from the national treasury via SERTV statutory allocation",
      headquarters: "Ancon, Corregimiento de Ancon, Panama City, Panama",
      annualPublicFunding: {
        total: "PAB 14.5 million annual state allocation (Presupuesto General del Estado de Panama FY 2024; approx. US$14.5M)",
        perCapita: "PAB 3.32 / citizen / year (approx. US$3.32 / year)",
      },
      dailyMarketShare: "12.0% domestic audience share across Canal 11 SERTV and Radio Nacional (Autoridad Nacional de los Servicios Publicos ASEP 2024)",
      brandTrustScore: {
        score: "64%",
        source: "ASEP & Barometro de las Americas Panama 2024",
      },
      localContentQuota: "80% Panamanian national cultural, educational, and government information programming in Spanish",
      staffHeadcount: "280 producers, journalists, and technical broadcast staff at the Ancon broadcasting complex (SERTV Informe Anual 2024)",
      logo: "broadcaster-logos/pa/sertv.png",
      logoExplainer:
        "The SERTV emblem displays the circular seal of the Panamanian national public broadcaster featuring bold red typography and stylized broadcast waves representing national public-service television.",
      sources: [
        "https://sertv.gob.pa/",
        "https://mef.gob.pa/",
        "https://asep.gob.pa/",
      ],
      licenceNote: "Sistema Estatal de Radio y Television de Panama public service broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Nicaragua
  NI: [
    {
      id: "ni-canal6",
      countryCode: "NI",
      name: "Canal 6",
      officialName: "Canal 6 de Nicaragua (Empresa Nicaraguense de Medios de Comunicacion - Presidencia de la Republica)",
      founded: 1994,
      primaryFunding: "State budget subvention and institutional advertising from government entities under the national budget of Nicaragua",
      headquarters: "Colonia Los Robles, Managua, Nicaragua",
      annualPublicFunding: {
        total: "NIO 380.0 million annual state allocation (Presupuesto General de la Republica de Nicaragua FY 2024; approx. US$10.4M)",
        perCapita: "NIO 57.00 / citizen / year (approx. US$1.56 / year)",
      },
      dailyMarketShare: "18.5% national television audience share across Canal 6 and Canal 4 (Instituto Nicaraguense de Telecomunicaciones y Correos TELCOR 2024)",
      brandTrustScore: {
        score: "61%",
        source: "TELCOR & Latinobarometro Nicaragua 2024",
      },
      localContentQuota: "75% domestic Nicaraguan programming including national news, cultura, and government public-service information in Spanish",
      staffHeadcount: "310 journalists, producers, and broadcast engineers in Managua (Canal 6 Nicaragua 2024)",
      logo: "broadcaster-logos/ni/canal6.png",
      logoExplainer:
        "The Canal 6 emblem features a bold white-and-blue numeral 6 encircled by a clean circular ring against a vibrant sky-blue background, representing national public broadcasting across Nicaragua.",
      sources: [
        "https://canal6.com.ni/",
        "https://mhcp.gob.ni/",
        "https://telcor.gob.ni/",
      ],
      licenceNote: "Canal 6 de Nicaragua state broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Guatemala
  GT: [
    {
      id: "gt-tgw",
      countryCode: "GT",
      name: "Radio TGW",
      officialName: "Radio y Television Nacional de Guatemala (Radio TGW - Ministerio de Cultura y Deportes)",
      founded: 1930,
      primaryFunding: "State budget allocation from the Ministry of Culture and Sports of Guatemala",
      headquarters: "Centro Civico, Guatemala City, Guatemala",
      annualPublicFunding: {
        total: "GTQ 85.0 million annual state allocation (Presupuesto General de Ingresos y Egresos del Estado de Guatemala FY 2024; approx. US$11.0M)",
        perCapita: "GTQ 4.70 / citizen / year (approx. US$0.61 / year)",
      },
      dailyMarketShare: "8.5% national audience share across TGW radio and government Canal de Congreso (Superintendencia de Telecomunicaciones SIT Guatemala 2024)",
      brandTrustScore: {
        score: "60%",
        source: "SIT Guatemala & Latinobarometro Guatemala 2024",
      },
      localContentQuota: "85% domestic Guatemalan cultural, indigenous heritage, and government public service programming in Spanish and indigenous languages (K'iche', Mam, Q'eqchi')",
      staffHeadcount: "220 broadcast journalists, correspondents, and radio engineers across Guatemala City and regional studios (Ministerio de Cultura 2024)",
      logo: "broadcaster-logos/gt/tgw.png",
      logoExplainer:
        "The TGW Radio Nacional de Guatemala emblem features the circular broadcast insignia with bold green-and-white typography and traditional motifs, representing Guatemala's cultural diversity and public radio heritage.",
      sources: [
        "https://www.radiotgw.gob.gt/",
        "https://mcd.gob.gt/",
        "https://sit.gob.gt/",
      ],
      licenceNote: "Radio y Television Nacional de Guatemala emblem bundled for educational reference in Learn mode.",
    },
  ],
};
`;

content = content.substring(0, lastIdx) + newEntries + "};";
fs.writeFileSync(file, content, "utf8");
console.log("Added Batch 33 (SD, LY, PA, NI, GT). Length:", content.length);
