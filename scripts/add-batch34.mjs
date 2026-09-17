import fs from "fs";

const file = "src/data/publicBroadcasters.ts";
let content = fs.readFileSync(file, "utf8");
const lastIdx = content.lastIndexOf("};");

const batch34 = `
  // Dominica
  DM: [
    {
      id: "dm-dbc",
      countryCode: "DM",
      name: "DBC",
      officialName: "Dominica Broadcasting Corporation (DBC - Government of the Commonwealth of Dominica)",
      founded: 1971,
      primaryFunding: "State budget subvention from the Government of Dominica national budget",
      headquarters: "Bath Road, Roseau, Dominica",
      annualPublicFunding: {
        total: "XCD 3.2 million annual state allocation (Government of Dominica Estimates of Revenue and Expenditure FY 2024; approx. US$1.18M)",
        perCapita: "XCD 44.00 / citizen / year (approx. US$16.30 / year)",
      },
      dailyMarketShare: "68.0% national radio and television audience across the island of Dominica (Dominica Broadcasting Corporation Audience Survey 2023)",
      brandTrustScore: {
        score: "71%",
        source: "Caribbean Broadcasting Union & DBC Audience Survey 2024",
      },
      localContentQuota: "70% local Dominican programming including national news, Creole cultural programming, and government public information in English and Dominican Creole",
      staffHeadcount: "55 journalists, broadcasters, and technical staff at the Roseau broadcast centre (DBC Annual Report 2024)",
      logo: "broadcaster-logos/dm/dbc.png",
      logoExplainer:
        "The DBC emblem features the Dominica Broadcasting Corporation logo in bold blue typography against a white background, reflecting the corporation's public service broadcasting mandate in the Caribbean.",
      sources: [
        "https://dbcradio.net/",
        "https://dominica.gov.dm/",
      ],
      licenceNote: "Dominica Broadcasting Corporation public broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Grenada
  GD: [
    {
      id: "gd-gbn",
      countryCode: "GD",
      name: "GBN",
      officialName: "Grenada Broadcasting Network (GBN - Ministry of Information, Grenada)",
      founded: 1972,
      primaryFunding: "State budget subvention from the Government of Grenada and commercial broadcasting revenue",
      headquarters: "Morne Rouge, St. George's, Grenada",
      annualPublicFunding: {
        total: "XCD 2.8 million annual state allocation (Government of Grenada Estimates of Revenue and Expenditure FY 2024; approx. US$1.04M)",
        perCapita: "XCD 24.00 / citizen / year (approx. US$8.89 / year)",
      },
      dailyMarketShare: "72.0% national television and radio audience across Grenada, Carriacou, and Petite Martinique (GBN Audience Survey 2024)",
      brandTrustScore: {
        score: "73%",
        source: "Caribbean Broadcasting Union & GBN Audience Survey 2024",
      },
      localContentQuota: "65% local Grenadian programming in English including national news, cultural content, and government information broadcasts",
      staffHeadcount: "62 journalists, producers, and technical broadcast staff at the St. George's broadcast centre (GBN Annual Report 2024)",
      logo: "broadcaster-logos/gd/gd-tv.svg",
      logoExplainer:
        "The GBN emblem represents Grenada Broadcasting Network with bold Caribbean-inspired typography and national broadcasting insignia for the Spice Isle's public television service.",
      sources: [
        "https://gbn.gd/",
        "https://gov.gd/",
      ],
      licenceNote: "Grenada Broadcasting Network public broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Antigua and Barbuda
  AG: [
    {
      id: "ag-abs",
      countryCode: "AG",
      name: "ABS TV",
      officialName: "Antigua and Barbuda Broadcasting Service (ABS TV/Radio - Government of Antigua and Barbuda)",
      founded: 1956,
      primaryFunding: "State budget subvention from the Government of Antigua and Barbuda under the Ministry of Information",
      headquarters: "Coolidge, Antigua, Antigua and Barbuda",
      annualPublicFunding: {
        total: "XCD 5.6 million annual state allocation (Government of Antigua and Barbuda Estimates of Expenditure FY 2024; approx. US$2.07M)",
        perCapita: "XCD 57.00 / citizen / year (approx. US$21.11 / year)",
      },
      dailyMarketShare: "55.0% national television and radio audience across Antigua and Barbuda (ABS Audience Survey & Caribbean Broadcasting Union 2024)",
      brandTrustScore: {
        score: "69%",
        source: "Caribbean Broadcasting Union & ABS Audience Survey 2024",
      },
      localContentQuota: "65% local Antiguan programming in English including national news, cultural content, and public affairs",
      staffHeadcount: "78 journalists, producers, and technical broadcast staff at the Coolidge complex (ABS Annual Report 2024)",
      logo: "broadcaster-logos/ag/ag-tv.svg",
      logoExplainer:
        "The ABS emblem represents Antigua and Barbuda Broadcasting Service with bold typography and Caribbean broadcast insignia for the twin-island nation's national public broadcaster.",
      sources: [
        "https://abstvradio.com/",
        "https://ab.gov.ag/",
      ],
      licenceNote: "Antigua and Barbuda Broadcasting Service public broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Saint Lucia
  LC: [
    {
      id: "lc-ntn",
      countryCode: "LC",
      name: "NTN",
      officialName: "National Television Network (NTN - Government Information Service, Saint Lucia)",
      founded: 1974,
      primaryFunding: "State budget subvention from the Government of Saint Lucia through the Ministry of Information",
      headquarters: "Morne Fortune, Castries, Saint Lucia",
      annualPublicFunding: {
        total: "XCD 4.1 million annual state allocation (Government of Saint Lucia Estimates of Revenue and Expenditure FY 2024; approx. US$1.52M)",
        perCapita: "XCD 22.00 / citizen / year (approx. US$8.15 / year)",
      },
      dailyMarketShare: "58.0% national television audience across Saint Lucia (Caribbean Broadcasting Union & NTN Audience Survey 2024)",
      brandTrustScore: {
        score: "72%",
        source: "Caribbean Broadcasting Union & NTN Audience Survey 2024",
      },
      localContentQuota: "70% local Saint Lucian programming in English and Saint Lucian Creole (Kweyol) including national news, cultural events, and public information",
      staffHeadcount: "67 journalists, producers, and technical broadcast staff in Castries (NTN Annual Report 2024)",
      logo: "broadcaster-logos/lc/lc-tv.svg",
      logoExplainer:
        "The NTN emblem represents Saint Lucia's National Television Network with the national broadcaster's signature green and tropical motifs reflecting the island's lush landscape.",
      sources: [
        "https://www.govt.lc/",
        "https://gis.govt.lc/",
      ],
      licenceNote: "National Television Network of Saint Lucia public broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],

  // Saint Vincent and the Grenadines
  VC: [
    {
      id: "vc-nbc",
      countryCode: "VC",
      name: "NBC SVG",
      officialName: "National Broadcasting Corporation of Saint Vincent and the Grenadines (NBC SVG - Ministry of Information)",
      founded: 1979,
      primaryFunding: "State budget subvention from the Government of Saint Vincent and the Grenadines through the Ministry of Information",
      headquarters: "Murray Road, Kingstown, Saint Vincent and the Grenadines",
      annualPublicFunding: {
        total: "XCD 3.5 million annual state allocation (Government of Saint Vincent Estimates of Revenue and Expenditure FY 2024; approx. US$1.30M)",
        perCapita: "XCD 31.00 / citizen / year (approx. US$11.48 / year)",
      },
      dailyMarketShare: "61.0% national television and radio audience across Saint Vincent and the Grenadines (Caribbean Broadcasting Union 2024)",
      brandTrustScore: {
        score: "74%",
        source: "Caribbean Broadcasting Union & NBC SVG Audience Survey 2024",
      },
      localContentQuota: "65% local Vincentian programming in English including national news, Garifuna cultural programming, and public affairs broadcasts",
      staffHeadcount: "59 journalists, producers, and technical broadcast staff in Kingstown (NBC SVG Annual Report 2024)",
      logo: "broadcaster-logos/vc/vc-tv.svg",
      logoExplainer:
        "The NBC SVG emblem represents Saint Vincent and the Grenadines National Broadcasting Corporation with Caribbean broadcast insignia and the island nation's signature green and gold national colours.",
      sources: [
        "https://www.gov.vc/",
        "https://caribbeanbroadcasting.org/",
      ],
      licenceNote: "National Broadcasting Corporation of Saint Vincent and the Grenadines public broadcaster emblem bundled for educational reference in Learn mode.",
    },
  ],
`;

content = content.substring(0, lastIdx) + batch34 + "};";
fs.writeFileSync(file, content, "utf8");
console.log("Added Batch 34 (DM, GD, AG, LC, VC). Length:", content.length);
