import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage();
async function check(name){
  await page.goto('http://localhost:4173/learn',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(900);
  await page.click('input.dropdown-input--desktop');
  await page.fill('input.dropdown-input--desktop', name);
  await page.waitForTimeout(450);
  await page.click('button.dropdown-option');
  await page.waitForTimeout(1200);
  const ex=await page.$('button:has-text("Explore more flags")'); if(ex){await ex.click();await page.waitForTimeout(900);}
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}});
  await page.waitForTimeout(1400);
  const r=await page.evaluate(()=>{
    const badges=[...new Set([...document.querySelectorAll('.flag-grid__sovereign-badge')].map(x=>x.textContent.trim()))];
    const i=[...document.querySelectorAll('.flag-grid__card img')].find(x=>(x.getAttribute('src')||'').includes('russian-empire'));
    return {rusEmpire:i?(i.naturalWidth+'x'+i.naturalHeight):'MISS', badges};
  });
  console.log(name+': '+JSON.stringify(r));
}
for(const n of ['Ukraine','Kazakhstan','Finland','Georgia','Moldova']) await check(n);
await b.close();
