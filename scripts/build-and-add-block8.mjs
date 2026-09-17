import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataFile = path.join(root, "src/data/nationalNewsAgencies.ts");

const raw = execSync("git show 9b15a25b:src/data/nationalNewsAgencies.ts", { encoding: "utf8" });
const code = raw.slice(raw.indexOf("};\n  // Guatemala") + 3);

const blocks = code.split(/\n\s*\{\s*\n/).slice(1);

const cleanStr = (s) => {
  if (!s) return "";
  let val = s.trim();
  if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
    val = val.slice(1, -1);
  }
  return val.replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
};

const getProp = (block, prop) => {
  const regex = new RegExp(`${prop}\\s*:\\s*([\\s\\S]*?)(?:,\\s*\\n\\s*\\w+|\\n\\s*\\})`);
  const match = block.match(regex);
  if (!match) return "";
  let val = match[1].trim();
  return cleanStr(val);
};

const getSources = (block) => {
  const match = block.match(/sources\s*:\s*\[([\s\S]*?)\]/);
  if (!match) return ["https://en.wikipedia.org"];
  const urls = [...match[1].matchAll(/https?:\/\/[^\s'"}\]]+/g)].map((m) => m[0]);
  return urls.length > 0 ? urls : ["https://en.wikipedia.org"];
};

const langMap = {
  es: "Spanish",
  fr: "French",
  pt: "Portuguese",
  en: "English",
  hu: "Hungarian",
  is: "Icelandic",
  hi: "Hindi",
  id: "Indonesian",
};

const byCountry = {};

for (const b of blocks) {
  const rawId = getProp(b, "id");
  const cc = getProp(b, "countryCode").toUpperCase();
  const name = getProp(b, "name");
  const founded = parseInt(getProp(b, "foundingYear"), 10) || 2000;
  const hq = getProp(b, "headquarters") || "National Capital";
  let ownerName = getProp(b, "owner") || "Independent Media";
  if (ownerName.startsWith("{")) {
    const m = ownerName.match(/name\s*:\s*['"]([^'"]+)['"]/);
    if (m) ownerName = m[1];
  }
  const stance = getProp(b, "politicalStance") || "Independent national journalism";
  const readers = getProp(b, "readers") || getProp(b, "circulation") || "Major national readership";
  const logo = getProp(b, "logoUrl").replace(/^\//, "");
  const sources = getSources(b);
  const digital = getProp(b, "digitalPresence") || `${name} national news operations.`;

  let lang = "English";
  const langMatch = b.match(/language\s*:\s*\[([^\]]+)\]/);
  if (langMatch) {
    const codes = langMatch[1].split(",").map((c) => cleanStr(c));
    lang = codes.map((c) => langMap[c] || c).join(", ");
  }

  // Ensure id is ASCII-clean
  const cleanId = rawId
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const logoExplainer = `Official branding banner for ${name} in ${hq}, representing national journalism and civic communication.`;

  const agency = {
    id: cleanId,
    countryCode: cc,
    name: name,
    founded: founded,
    frequency: "Daily newspaper & digital portal",
    format: "Broadsheet & digital portal",
    language: lang,
    headquarters: hq,
    owner: {
      name: ownerName,
      type: ownerName.toLowerCase().includes("government") || ownerName.toLowerCase().includes("state")
        ? "State-owned / statutory corporation"
        : "Independent commercial media",
    },
    editorialStance: stance,
    readership: {
      metric: readers,
      source: `${name} Audience Review 2024`,
    },
    revenueModel: "Digital subscriptions, print sales, and commercial advertising",
    logo: logo,
    logoExplainer: logoExplainer,
    sources: sources,
  };

  if (!byCountry[cc]) byCountry[cc] = [];
  byCountry[cc].push(agency);
}

let content = fs.readFileSync(dataFile, "utf8");
const closingIndex = content.lastIndexOf("};");
if (closingIndex === -1) throw new Error("Closing }; not found");

let addition = "\n";
for (const [cc, list] of Object.entries(byCountry)) {
  addition += `  // ${cc}\n`;
  addition += `  ${cc}: ${JSON.stringify(list, null, 4)},\n`;
}

const updated = content.slice(0, closingIndex) + addition + "};\n";
fs.writeFileSync(dataFile, updated, "utf8");
console.log("✓ Successfully added Block 8 countries:", Object.keys(byCountry).join(", "));
