import { readFileSync } from "fs";
import path from "path";

const content = readFileSync(path.resolve("src/data/nationalNewsAgencies.ts"), "utf8");
const start = content.indexOf("export const NATIONAL_NEWS_AGENCIES");
const eq = content.indexOf("= {", start);
const open = content.indexOf("{", eq);
let depth = 0, i = open, inStr = null;
for (; i < content.length; i++) {
  const c = content[i];
  if (inStr) {
    if (c === "\\") { i++; continue; }
    if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
  if (c === "/" && content[i + 1] === "/") { i = content.indexOf("\n", i); if (i < 0) break; continue; }
  if (c === "{") depth++;
  else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
}
const literal = content.slice(open, i);
const data = Function('"use strict"; return (' + literal + ");")();
const under5 = [];
const allCounts = {};
for (const [code, list] of Object.entries(data)) {
  allCounts[code] = list.length;
  if (list.length < 5) {
    under5.push({ code, count: list.length, names: list.map(x => x.name) });
  }
}
console.log("Total countries:", Object.keys(data).length);
console.log("Countries with < 5 outlets:", JSON.stringify(under5, null, 2));
