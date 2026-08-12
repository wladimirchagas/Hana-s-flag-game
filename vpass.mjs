import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage();
async function check(name) {
  await page.goto('http://localhost:4173/learn', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.click('input.dropdown-input--desktop');
  await page.fill('input.dropdown-input--desktop', name);
  await page.waitForTimeout(500);
  await page.click('button.dropdown-option');
  await page.waitForTimeout(1300);
  const ex = await page.$('button:has-text("Explore more flags")');
  if (ex) { await ex.click(); await page.waitForTimeout(1000); }
  const card = await page.$('.flag-grid__group-name:has-text("Passport")');
  if (card) await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const groups = [...document.querySelectorAll('.flag-grid__group-name')].map(x=>x.textContent.trim());
    const imgs = [...document.querySelectorAll('.flag-grid__card img')];
    const p = imgs.find(i => (i.getAttribute('src')||'').includes('-passport'));
    return { hasPassport: groups.some(g=>g.toLowerCase().includes('passport')), pDim: p ? (p.naturalWidth+'x'+p.naturalHeight) : 'none' };
  });
  console.log(name + ': ' + JSON.stringify(info));
}
for (const n of ['Germany','Japan','Kenya','Vietnam']) await check(n);
await b.close();
