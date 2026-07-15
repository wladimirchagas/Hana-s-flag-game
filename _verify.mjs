import { chromium } from "playwright";
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome"});
async function run(code,needle){
  for(let t=0;t<3;t++){
    const p=await b.newPage({viewport:{width:900,height:2400}});
    try{
      await p.goto(`http://localhost:5173/learn?country=HU&subdivisions=1&sub=${code}`,{waitUntil:"load",timeout:30000});
      let ok=false;
      for(let i=0;i<40;i++){ ok=await p.evaluate(()=>/CAPITAL OF/i.test(document.body.innerText)).catch(()=>false); if(ok)break; await p.waitForTimeout(500);}
      if(!ok){ await p.close(); continue; }
      await p.waitForTimeout(800);
      await p.evaluate(()=>{[...document.querySelectorAll("button")].filter(x=>/What this flag means/i.test(x.textContent||"")).forEach(x=>x.click());});
      await p.waitForTimeout(700);
      const body=(await p.evaluate(()=>document.body.innerText)).toLowerCase();
      console.log(`${code}: needle[${needle}]=${body.includes(needle)}`);
      await p.close(); return;
    }catch(e){ await p.close(); }
  }
  console.log(`${code}: FAILED`);
}
for(const [cd,nd] of [["HU-HB","phoenix"],["HU-HE","dobó"],["HU-CS","city of sunshine"],["HU-BK","kecske"]]) await run(cd,nd);
await b.close();
