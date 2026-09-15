import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Look for button with "Show" or view options
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const text = await buttons.nth(i).textContent();
      if (text.includes('National flags') || text.includes('Commercial airlines') || text.includes('Show')) {
        console.log(`Found view button at index ${i}: "${text}"`);
        await buttons.nth(i).click();
        console.log('Clicked view button');
        await page.waitForTimeout(500);
        break;
      }
    }

    // Check what's displayed now
    const options = page.locator('[role="option"]');
    const optionCount = await options.count();
    console.log(`Options available: ${optionCount}`);
    for (let i = 0; i < Math.min(optionCount, 8); i++) {
      const text = await options.nth(i).textContent();
      console.log(`  - ${text.trim()}`);
    }

    // Click on Commercial airlines
    const airlinesOpt = page.locator('[role="option"]:has-text("Commercial airlines")').first();
    if (await airlinesOpt.isVisible()) {
      await airlinesOpt.click();
      console.log('Selected Commercial airlines');
      await page.waitForTimeout(1000);
    } else {
      console.log('Commercial airlines not found');
    }

    // Select country
    const countryBtn = page.locator('button:has-text("Tap to pick")').first();
    if (await countryBtn.isVisible()) {
      await countryBtn.click();
      console.log('Opened country picker');
      await page.waitForTimeout(500);

      const inp = page.locator('input').first();
      await inp.fill('Australia');
      await page.waitForTimeout(500);

      const ausOpt = page.locator('[role="option"]:has-text("Australia")').first();
      if (await ausOpt.isVisible()) {
        await ausOpt.click();
        console.log('Selected Australia');
        await page.waitForTimeout(1500);
      }
    }

    // Now test airline selection
    const airlineCards = page.locator('[data-airline-id]');
    const cardCount = await airlineCards.count();
    console.log(`\nAirline cards found: ${cardCount}`);

    if (cardCount > 0) {
      const card = airlineCards.first();
      const id = await card.getAttribute('data-airline-id');
      const name = await card.textContent();
      console.log(`First airline: ${name.substring(0, 50).trim()} (${id})`);

      const panel = page.locator('[data-test="airline-details"]');
      console.log(`\n--- Testing single-click ---`);
      console.log(`Panel visible before click: ${await panel.isVisible({timeout: 500}).catch(() => false)}`);

      await card.click();
      console.log('Clicked airline');
      await page.waitForTimeout(800);

      console.log(`Panel visible after click: ${await panel.isVisible({timeout: 500}).catch(() => false)}`);
      
      if (!(await panel.isVisible({timeout: 500}).catch(() => false))) {
        console.log('❌ Panel NOT visible after first click');
        await card.click();
        await page.waitForTimeout(800);
        console.log(`Panel visible after 2nd click: ${await panel.isVisible({timeout: 500}).catch(() => false)}`);
      }
    }

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
