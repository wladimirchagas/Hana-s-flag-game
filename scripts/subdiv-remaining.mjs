// Progress tracker for the subdivision flag-meaning sweep.
// remaining = bundled sub flag codes − (codes with a FLAG_MEANINGS entry ∪ codes
// in subdiv-meaning-omitted.txt investigated and found to have no documented meaning).
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
const fm = readFileSync("src/data/flagMeanings.ts","utf8");
const have = new Set([...fm.matchAll(/^  "?([A-Z]{2}-[A-Z0-9~]+)"?: \{/gm)].map(m=>m[1]));
const omitted = existsSync("scripts/data/subdiv-meaning-omitted.txt")
  ? new Set(readFileSync("scripts/data/subdiv-meaning-omitted.txt","utf8").split(/\s+/).filter(Boolean))
  : new Set();
const files = execSync("find public/flags/sub -type f").toString().trim().split("\n");
const codes = new Set();
for (const f of files){ const m=f.match(/sub\/[A-Z]+\/([A-Za-z0-9-]+)\.[a-z]+$/); if(m) codes.add(m[1]); }
const byCountry = {};
for (const c of codes){ if(have.has(c)||omitted.has(c)) continue; const cc=c.split("-")[0]; (byCountry[cc]??=[]).push(c); }
const entries = Object.entries(byCountry).sort((a,b)=>b[1].length-a[1].length);
let total=0; for(const [,v] of entries) total+=v.length;
console.log(`bundled:${codes.size} have:${[...codes].filter(c=>have.has(c)).length} omitted:${[...codes].filter(c=>omitted.has(c)).length} remaining:${total} across ${entries.length} countries`);
if (process.argv[2]) { const cc=process.argv[2]; console.log(`${cc} remaining:`, (byCountry[cc]||[]).join(" ")); }
else console.log(entries.map(([k,v])=>`${k}:${v.length}`).join(" "));
