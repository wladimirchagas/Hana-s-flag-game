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
    console.log('=== TESTING SINGLE-CLICK FIX ===\n');

    console.log('1. Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Find the select element for Show
    const label = page.locator('label.flag-grid__group-select').first();
    const select = label.locator('select').first();
    const selectExists = await select.count() > 0;
    console.log(`\n2. Select element found: ${selectExists}`);

    if (selectExists) {
      // First, select a country (Australia)
      console.log('\n3. Selecting Australia...');
      const australiaFlag = page.locator('svg[data-code="AU"]').first();
      const australiaExists = await australiaFlag.count() > 0;
      console.log(`   Australia flag found: ${australiaExists}`);

      if (australiaExists) {
        await australiaFlag.click();
        await page.waitForTimeout(1000);

        // Now switch to Airlines view
        console.log('\n4. Switching to Airlines view...');
        await select.selectOption('airline');
        await page.waitForTimeout(1500);

        // Verify we're in airline mode and can see airline cards
        const airlineCards = page.locator('[data-airline-id]');
        const airlineCount = await airlineCards.count();
        console.log(`   Airline cards visible: ${airlineCount}`);

        if (airlineCount > 0) {
          // Get the first airline
          const firstAirline = airlineCards.first();
          const airlineId = await firstAirline.getAttribute('data-airline-id');
          const airlineName = await firstAirline.textContent();

          console.log(`\n5. FIRST CLICK TEST`);
          console.log(`   Airline: ${airlineName?.trim()} (ID: ${airlineId})`);

          // Check panel before click
          const panel = page.locator('text=Aircraft types:').first();
          const panelBefore = await panel.isVisible({ timeout: 300 }).catch(() => false);
          console.log(`   Panel visible BEFORE click: ${panelBefore}`);

          console.log(`   >>> PERFORMING FIRST CLICK <<<`);

          // FIRST CLICK
          await firstAirline.click();
          await page.waitForTimeout(800);

          // Check panel after click
          const panelAfter = await panel.isVisible({ timeout: 500 }).catch(() => false);
          console.log(`   Panel visible AFTER first click: ${panelAfter}`);

          if (panelAfter) {
            const text = await panel.textContent();
            console.log(`   ✓ SUCCESS - Panel showing: ${text?.substring(0, 50)}`);
            console.log(`\n   THE SINGLE-CLICK FIX WORKS!`);
          } else {
            console.log('   ✗ FAILED - Panel not visible after first click');

            // Try second click to confirm it was a real double-click bug
            console.log(`\n6. SECOND CLICK TEST (confirming if still double-click bug)`);
            await firstAirline.click();
            await page.waitForTimeout(800);

            const panelAfter2 = await panel.isVisible({ timeout: 500 }).catch(() => false);
            console.log(`   Panel visible AFTER second click: ${panelAfter2}`);

            if (panelAfter2) {
              console.log(`   ✗ DOUBLE-CLICK BUG STILL EXISTS`);
            }
          }
        } else {
          console.log('   ✗ No airline cards found for Australia');
        }
      }
    }

    console.log('\n=== CONSOLE LOGS ===');
    if (logs.length > 0) {
      logs.forEach(log => console.log(log));
    } else {
      console.log('(No click-related logs captured)');
    }

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
