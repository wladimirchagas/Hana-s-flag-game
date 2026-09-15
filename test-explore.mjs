import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));

  try {
    console.log('Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    console.log('\n=== EXPLORING PAGE ELEMENTS ===\n');

    // Find all buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons`);

    for (let i = 0; i < Math.min(20, buttonCount); i++) {
      const text = await buttons.nth(i).textContent();
      const isVisible = await buttons.nth(i).isVisible();
      console.log(`  Button ${i}: "${text?.trim()}" (visible: ${isVisible})`);
    }

    // Look for any Show-related element
    console.log('\n=== LOOKING FOR "Show" ELEMENTS ===');
    const showElements = page.locator('text=Show');
    const showCount = await showElements.count();
    console.log(`Found ${showCount} elements with text "Show"`);

    for (let i = 0; i < Math.min(5, showCount); i++) {
      const element = showElements.nth(i);
      const tagName = await element.evaluate(el => el.tagName);
      const isVisible = await element.isVisible();
      console.log(`  Show element ${i}: <${tagName}> (visible: ${isVisible})`);
    }

    // Check current URL and page content
    console.log('\n=== PAGE STATE ===');
    console.log('Current URL:', page.url());

    // Look for the grid container
    const grid = page.locator('[data-test="flag-grid"]');
    const gridExists = await grid.count() > 0;
    console.log('Flag grid exists:', gridExists);

    // Look for airline grid
    const airlineGrid = page.locator('[data-airline-id]');
    const airlineCount = await airlineGrid.count();
    console.log('Airline cards visible:', airlineCount);

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
