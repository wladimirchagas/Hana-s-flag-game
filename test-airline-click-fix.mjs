import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    if (msg.text().includes('handleGridSelect') || msg.text().includes('activeAirline')) {
      logs.push(text);
      console.log(text);
    }
  });

  try {
    console.log('=== TESTING SINGLE-CLICK FIX FOR AIRLINES ===\n');

    console.log('1. Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Find the select element for Show
    const label = page.locator('label.flag-grid__group-select').first();
    const select = label.locator('select').first();
    const selectExists = await select.count() > 0;
    console.log(`\n2. Select dropdown found: ${selectExists}`);

    if (selectExists) {
      // Find and click the first country card in the flag grid
      console.log('\n3. Finding flag grid countries...');
      const countryCards = page.locator('.flag-grid__card-wrapper [role="button"], .flag-grid__card [role="button"]').first();
      const countryCardWrapper = page.locator('[class*="flag-grid"] [class*="card"]').first();

      // Look for clickable elements in the grid
      const gridItems = page.locator('.flag-grid__card');
      const gridItemCount = await gridItems.count();
      console.log(`   Grid items found: ${gridItemCount}`);

      if (gridItemCount > 0) {
        console.log('\n4. Switching to Airlines view...');
        await select.selectOption('airline');
        await page.waitForTimeout(1500);

        // Check for airline cards
        const airlineCards = page.locator('[data-airline-id]');
        const airlineCount = await airlineCards.count();
        console.log(`   Airline cards after switching to Airlines view: ${airlineCount}`);

        if (airlineCount > 0) {
          // Test single-click on first airline
          const firstAirline = airlineCards.first();
          const airlineId = await firstAirline.getAttribute('data-airline-id');
          const airlineName = await firstAirline.textContent();

          console.log(`\n5. Testing first airline card`);
          console.log(`   Airline: ${airlineName?.trim()} (ID: ${airlineId})`);

          // Check if panel shows before click
          const airlinePanel = page.locator('text=Aircraft types:').first();
          const panelVisibleBefore = await airlinePanel.isVisible({ timeout: 300 }).catch(() => false);
          console.log(`   Panel visible BEFORE click: ${panelVisibleBefore}`);

          console.log(`\n   >>> PERFORMING FIRST CLICK <<<`);

          // FIRST CLICK
          await firstAirline.click();
          await page.waitForTimeout(1000);

          // Check if panel shows after first click
          const panelVisibleAfter = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
          console.log(`   Panel visible AFTER first click: ${panelVisibleAfter}`);

          if (panelVisibleAfter) {
            const panelText = await airlinePanel.textContent();
            console.log(`   ✓ SUCCESS - Panel showing: ${panelText?.substring(0, 60)}`);
            console.log(`\n   ✓ THE SINGLE-CLICK FIX WORKS!`);
          } else {
            console.log('   ✗ FAILED - Panel not visible after first click');

            console.log(`\n6. Testing second click...`);
            await firstAirline.click();
            await page.waitForTimeout(1000);

            const panelVisibleAfter2 = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
            console.log(`   Panel visible AFTER second click: ${panelVisibleAfter2}`);

            if (panelVisibleAfter2) {
              console.log(`   ✗ DOUBLE-CLICK BUG STILL EXISTS`);
            } else {
              console.log(`   ✗ Panel still not visible`);
            }
          }
        } else {
          console.log('   INFO: No airline cards found in grid');
          console.log('   This might be expected - airlines may only show when a country is selected');
        }
      }
    }

    console.log('\n=== CAPTURED LOGS ===');
    if (logs.length > 0) {
      logs.forEach(log => console.log(log));
    } else {
      console.log('(No handleGridSelect or activeAirline logs)');
    }

  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  } finally {
    await browser.close();
  }
})();
