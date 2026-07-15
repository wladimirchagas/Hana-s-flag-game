import { chromium } from "playwright";
const OUT="/tmp/claude-0/-home-user-Hana-s-flag-game/d3a533d6-58c8-59f5-9562-4f5b84d6225f/scratchpad";
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome"});
async function run(code,needle){
  for(let t=0;t<3;t++){
    const p=await b.newPage({viewport:{width:900,height:2400}});
    try{
      await p.goto(`http://localhost:5173/learn?country=FR&subdivisions=1&sub=${code}`,{waitUntil:"load",timeout:30000});
      let ok=false;
      for(let i=0;i<40;i++){ ok=await p.evaluate(()=>/CAPITAL OF/i.test(document.body.innerText)).catch(()=>false); if(ok)break; await p.waitForTimeout(500);}
      if(!ok){ await p.close(); continue; }
      await p.waitForTimeout(800);
      const clicked=await p.evaluate(()=>{const bs=[...document.querySelectorAll("button")].filter(x=>/What this flag means/i.test(x.textContent||""));bs.forEach(x=>x.click());return bs.length;});
      await p.waitForTimeout(700);
      const body=(await p.evaluate(()=>document.body.innerText)).toLowerCase();
      console.log(`${code}: meaningBtns=${clicked} needle[${needle}]=${body.includes(needle)}`);
      await p.screenshot({path:`${OUT}/v-${code}.png`,fullPage:true});
      await p.close(); return;
    }catch(e){ await p.close(); }
  }
  console.log(`${code}: FAILED`);
}
for(const [cd,nd] of [["FR-13","crusading age"],["FR-06","red crowned eagle"],["FR-09","counts of barcelona"],["FR-18","king of bourges"]]) await run(cd,nd);
await b.close();
