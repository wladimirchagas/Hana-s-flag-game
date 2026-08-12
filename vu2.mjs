import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage();
async function check(name, ids){
  await page.goto('http://localhost:4173/learn',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1000);
  await page.click('input.dropdown-input--desktop');
  await page.fill('input.dropdown-input--desktop', name);
  await page.waitForTimeout(500);
  await page.click('button.dropdown-option');
  await page.waitForTimeout(1300);
  const ex = await page.$('button:has-text("Explore more flags")');
  if(ex){await ex.click();await page.waitForTimeout(1000);}
  // scroll through to force decode
  await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));} });
  await page.waitForTimeout(2500);
  const res = await page.evaluate((ids)=>{
    const out={};
    for(const id of ids){
      const img=[...document.querySelectorAll('.flag-grid__card img')].find(i=>(i.getAttribute('src')||'').includes(id));
      out[id]= img ? (img.naturalWidth+'x'+img.naturalHeight) : 'MISSING';
    }
    return out;
  }, ids);
  console.log(name+': '+JSON.stringify(res));
}
await check('Uzbekistan',['uz-ssr']);
await check('Pakistan',['pk-uk']);
await check('Moldova',['md-ssr']);
await check('United Arab Emirates',['ae-uk']);
await check('Tonga',['to-uk']);
await b.close();
