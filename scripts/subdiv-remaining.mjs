// Progress tracker for the subdivision flag-meaning sweep.
// Universe = FLAG_CODES (the authoritative index of every subdivision code that has
// a flag in the game, CDN + local, from src/lib/subdivisionFlagIndex.ts) minus
// SUPPRESSED_SUBDIVISION_FLAGS. remaining = universe − (has FLAG_MEANINGS entry ∪
// investigated-and-omitted in subdiv-meaning-omitted.txt).
import { readFileSync, existsSync } from "node:fs";
const read = (p) => readFileSync(p, "utf8");
const codesFrom = (src, marker) => {
  const start = src.indexOf(marker); const open = src.indexOf("[", start);
  let depth=0,i=open,inStr=null,buf="";
  for(;i<src.length;i++){const c=src[i];
    if(inStr){ if(c==="\\"){buf+=c+src[++i];continue;} if(c===inStr)inStr=null; buf+=c; continue;}
    if(c==='"'||c==="'"||c==="`"){inStr=c;buf+=c;continue;}
    if(c==="["){depth++; if(depth===1)continue;} if(c==="]"){depth--; if(depth===0){break;}}
    buf+=c;}
  return new Set([...buf.matchAll(/["'`]([A-Z]{2}-[A-Z0-9~]+)["'`]/g)].map(m=>m[1]));
};
const idx = read("src/lib/subdivisionFlagIndex.ts");
const universe = codesFrom(idx, "const FLAG_CODES");
const subs = read("src/api/subdivisions.ts");
const suppressed = codesFrom(subs, "SUPPRESSED_SUBDIVISION_FLAGS");
for (const s of suppressed) universe.delete(s);
const fm = read("src/data/flagMeanings.ts");
const have = new Set([...fm.matchAll(/^  "?([A-Z]{2}-[A-Z0-9~]+)"?: \{/gm)].map(m=>m[1]));
const omitted = existsSync("scripts/data/subdiv-meaning-omitted.txt")
  ? new Set(read("scripts/data/subdiv-meaning-omitted.txt").split(/\s+/).filter(Boolean)) : new Set();
const byCountry = {};
for (const c of universe){ if(have.has(c)||omitted.has(c)) continue; const cc=c.split("-")[0]; (byCountry[cc]??=[]).push(c); }
const entries = Object.entries(byCountry).sort((a,b)=>b[1].length-a[1].length);
let total=0; for(const [,v] of entries) total+=v.length;
console.log(`universe:${universe.size} have:${[...universe].filter(c=>have.has(c)).length} omitted:${[...universe].filter(c=>omitted.has(c)).length} remaining:${total} across ${entries.length} countries`);
if (process.argv[2]) console.log(`${process.argv[2]}:`, (byCountry[process.argv[2]]||[]).sort().join(" "));
else console.log(entries.map(([k,v])=>`${k}:${v.length}`).join(" "));
