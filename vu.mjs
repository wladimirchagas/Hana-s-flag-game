import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage();
async function check(name){
  await page.goto('http://localhost:4173/learn',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1000);
  await page.click('input.dropdown-input--desktop');
  await page.fill('input.dropdown-input--desktop', name);
  await page.waitForTimeout(500);
  await page.click('button.dropdown-option');
  await page.waitForTimeout(1300);
  const ex = await page.$('button:has-text("Explore more flags")');
  if(ex){await ex.click();await page.waitForTimeout(1000);}
  const badges=await page.$$eval('.flag-grid__sovereign-badge',e=>e.map(x=>x.textContent.trim()));
  const broken=await page.$$eval('.flag-grid__card img',imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).length);
  const groups=await page.$$eval('.flag-grid__group-name',e=>e.map(x=>x.textContent.trim()));
  console.log(`${name}: broken=${broken} badges=${JSON.stringify(badges)} groups=${JSON.stringify(groups)}`);
}
for(const n of ['Uzbekistan','Pakistan','Iraq','Moldova','United Arab Emirates']) await check(n);
await b.close();
