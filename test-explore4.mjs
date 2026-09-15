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
    console.log('=== AIRLINE SINGLE-CLICK TEST ===\n');
    console.log('1. Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Find the label and its select element
    const label = page.locator('label.flag-grid__group-select').first();
    const select = label.locator('select').first();
    const selectExists = await select.count() > 0;
    console.log(`\n2. Label with select found: ${selectExists}`);

    if (selectExists) {
      // Get current value
      const currentValue = await select.inputValue();
      console.log(`   Current selection: ${currentValue}`);

      // Get available options
      const options = select.locator('option');
      const optionCount = await options.count();
      console.log(`   Available options: ${optionCount}`);

      for (let i = 0; i < optionCount; i++) {
        const text = await options.nth(i).textContent();
        const value = await options.nth(i).getAttribute('value');
        console.log(`     - "${text}" (value: "${value}")`);
      }

      // Select Airlines
      console.log('\n3. Selecting "Airlines"...');
      await select.selectOption('airline');
      await page.waitForTimeout(1500);

      // Verify we're in airline mode
      const airlineCards = page.locator('[data-airline-id]');
      const airlineCount = await airlineCards.count();
      console.log(`   Airline cards visible: ${airlineCount}`);

      if (airlineCount > 0) {
        // Select USA
        console.log('\n4. Selecting USA country...');
        const usFlag = page.locator('svg[data-code="US"]').first();
        if (await usFlag.count() > 0) {
          await usFlag.click();
          await page.waitForTimeout(1000);

          // Verify airline cards for USA
          const updatedCount = await airlineCards.count();
          console.log(`   Airline cards for USA: ${updatedCount}`);

          if (updatedCount > 0) {
            console.log('\n5. FIRST CLICK TEST');
            const firstAirline = airlineCards.first();
            const airlineId = await firstAirline.getAttribute('data-airline-id');
            const airlineName = await firstAirline.textContent();
            console.log(`   Clicking: ${airlineName?.trim()} (ID: ${airlineId})`);

            // Check panel before
            const panel = page.locator('text=Aircraft types:').first();
            const panelBefore = await panel.isVisible({ timeout: 300 }).catch(() => false);
            console.log(`   Panel visible BEFORE click: ${panelBefore}`);

            // FIRST CLICK
            console.log('\n   >>> PERFORMING FIRST CLICK <<<');
            await firstAirline.click();
            await page.waitForTimeout(600);

            // Check panel after
            const panelAfter1 = await panel.isVisible({ timeout: 500 }).catch(() => false);
            console.log(`   Panel visible AFTER first click: ${panelAfter1}`);

            if (panelAfter1) {
              const text = await panel.textContent();
              console.log(`   ✓ SUCCESS - Panel showing: ${text?.substring(0, 50)}`);
            } else {
              console.log('   ✗ FAILED - Panel not visible');

              // Try second click
              console.log('\n6. SECOND CLICK TEST');
              console.log('   >>> PERFORMING SECOND CLICK <<<');
              await firstAirline.click();
              await page.waitForTimeout(600);

              const panelAfter2 = await panel.isVisible({ timeout: 500 }).catch(() => false);
              console.log(`   Panel visible AFTER second click: ${panelAfter2}`);

              if (panelAfter2) {
                const text = await panel.textContent();
                console.log(`   ✓ WORKAROUND - Panel showing after 2nd click: ${text?.substring(0, 50)}`);
              }
            }
          }
        }
      }
    }

    console.log('\n=== CONSOLE LOGS RELATED TO CLICK ===');
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
