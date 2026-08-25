// Progress tracker for the subdivision flag-meaning sweep.
// Universe = subdivisions the game ACTUALLY DISPLAYS with a flag, i.e. the codes that are
// BOTH in SUBDIVISION_META (src/lib/subdivisionMeta.ts — what the flag grid/map shows) AND
// in FLAG_CODES (src/lib/subdivisionFlagIndex.ts — which of those have a bundled flag),
// minus SUPPRESSED_SUBDIVISION_FLAGS. This matters because FLAG_CODES (the raw CDN index)
// uses a different ISO scheme than SUBDIVISION_META for some countries (e.g. the game shows
// Czech regions as CZ-JM and Polish voivodeships as PL-SL, and shows Italian/Spanish
// PROVINCES, not regions) — so a FLAG_CODES-only universe includes codes the game never
// displays (UK counties, region-numeric CZ-64/PL-24, etc.). Only the intersection renders.
// remaining = universe − (has FLAG_MEANINGS entry ∪ investigated-and-omitted).
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
const flagged = codesFrom(idx, "const FLAG_CODES");
// codes the game actually DISPLAYS (every `code: "CC-XXX"` in SUBDIVISION_META)
const meta = read("src/lib/subdivisionMeta.ts");
const shown = new Set([...meta.matchAll(/code:\s*"([A-Z]{2}-[A-Z0-9~]+)"/g)].map(m=>m[1]));
// universe = displayed ∩ flagged  (the subdivisions that appear in the flag grid with a flag)
const universe = new Set([...shown].filter(c=>flagged.has(c)));
const subs = read("src/api/subdivisions.ts");
const suppressed = codesFrom(subs, "const SUPPRESSED_SUBDIVISION_FLAGS");
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
