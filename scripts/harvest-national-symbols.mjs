// STEP 1 OF DEEPENING A COUNTRY'S "National symbols" TAB.
//
// Harvest CANDIDATE national-symbol entries for a country from its
// "List of <Adjective> flags" article, verbatim: every row's Commons file, its
// dates and the source's own description. Nothing is invented — rows with no
// date are emitted with no date, and no `meaning` is ever produced (explainers
// stay hand-sourced).
//
//   node scripts/harvest-national-symbols.mjs "List of Canadian flags" CA
//
// It writes h-<CC>.json: one row per flag the article's tables show, carrying the
// Commons filename, the years the row states, and the row's own text. That file is
// a WORKSHEET, not data — a human reads it, decides which rows are national symbols
// (not sub-national, not rank or command flags, not sporting or party flags), picks
// the category, and writes the manifest entry. Nothing here reaches
// scripts/data/national-flag-sources.json without that pass.
//
// WHY THE WORKSHEET STEP EXISTS. Everything this script emits is verbatim from the
// cited article, so it cannot invent a date or a description — but it also cannot
// tell a national flag from a provincial one, a service flag from a rank flag, or a
// colonial flag from the country's own, and those distinctions are exactly what the
// hard rules in CLAUDE.md turn on. It deliberately produces NO `meaning`: explainers
// are sourced and written by hand, never machine-assembled.
import { writeFileSync } from "node:fs";
const page = process.argv[2], cc = process.argv[3];
const url = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(page.replace(/ /g,"_"))}&action=raw`;
let wt=null;
for (let i=0;i<4;i++){const r=await fetch(url,{headers:{"User-Agent":"HanaFlagGame/1.0"}});
 if(r.status===429||r.status===503){await new Promise(s=>setTimeout(s,2500*(i+1)));continue;}
 if(!r.ok){console.log(JSON.stringify({cc,error:`HTTP ${r.status}`}));process.exit(0);}
 wt=await r.text();break;}
if(wt==null){console.log(JSON.stringify({cc,error:"rate limited"}));process.exit(0);}
if(/^#REDIRECT/i.test(wt)){console.log(JSON.stringify({cc,redirect:wt.match(/\[\[([^\]]+)\]\]/)?.[1]}));process.exit(0);}
wt=wt.replace(/<ref[^>]*\/>/g,"").replace(/<ref[\s\S]*?<\/ref>/g,"").replace(/\{\{cite[\s\S]*?\}\}/gi,"");
const clean=(s)=>s.replace(/\{\{[^{}]*\}\}/g," ").replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g,"$1")
  .replace(/\[\[([^\]]*)\]\]/g,"$1").replace(/'''?/g,"").replace(/<[^>]+>/g," ")
  .replace(/\|?\s*\d+\s*x?\d*px/g,"").replace(/\b(border|frameless|thumb|scope="row"|alt=|rowspan="\d+"|colspan="\d+"|center|link=)\b/g," ")
  .replace(/\s*\|\s*/g," ¦ ").replace(/\s+/g," ").replace(/^[¦\s]+|[¦\s]+$/g,"").trim();
const files=(s)=>{const o=[];
  for(const m of s.matchAll(/File:([^|\]}]+?\.(?:svg|png|jpe?g))/gi)) o.push(m[1].trim());
  for(const m of s.matchAll(/\{\{\s*(?:ListFlag|FlagImage)\s*\|\s*([^|}]+?\.(?:svg|png|jpe?g))/gi)) o.push(m[1].trim());
  return [...new Set(o)];};
const rows=[]; let section=""; let buf=[];
const flush=()=>{ if(!buf.length) return; const row=buf.join(" | "); const f=files(row);
  if(f.length===1){ let t=row; for(const x of f) t=t.replaceAll(x," ");
    const txt=clean(t);
    const years=[...txt.matchAll(/\b(1[0-9]{3}|20[0-2][0-9])\b/g)].map(m=>+m[1]);
    rows.push({section,file:f[0],text:txt.slice(0,240),years:years.slice(0,2),
      present:/present|onwards?|–\s*$|current/i.test(txt)});}
  buf=[];};
for(const raw of wt.split("\n")){const line=raw.trimEnd();
  if(/^=+.*=+$/.test(line.trim())){flush();section=line.replace(/=/g,"").trim();continue;}
  if(/^\|-/.test(line)||/^\|\}/.test(line)){flush();continue;}
  if(/^(\||!)/.test(line)||/File:|ListFlag/i.test(line)) buf.push(line.replace(/^[|!]+\s*/,""));}
flush();
writeFileSync(`h-${cc}.json`, JSON.stringify({cc,page,rows},null,1));
console.log(`${cc}: ${rows.length} rows, sections: ${[...new Set(rows.map(r=>r.section))].slice(0,12).join(" / ")}`);
