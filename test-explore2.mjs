import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));

  try {
    console.log('Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Find Show span and its parent
    const showSpan = page.locator('text=Show').first();
    const showVisible = await showSpan.isVisible();
    console.log('\nShow span visible:', showVisible);

    if (showVisible) {
      // Find parent button
      const parentButton = showSpan.locator('xpath=ancestor::button').first();
      const parentExists = await parentButton.count() > 0;
      console.log('Parent button exists:', parentExists);

      if (parentExists) {
        const parentText = await parentButton.textContent();
        console.log('Parent button text:', parentText);

        // Try clicking it
        console.log('\nClicking Show button...');
        await parentButton.click();
        await page.waitForTimeout(1000);

        // Look for dropdown options
        console.log('\nLooking for dropdown options...');
        const options = page.locator('[role="option"]');
        const optionCount = await options.count();
        console.log(`Found ${optionCount} dropdown options`);

        for (let i = 0; i < optionCount; i++) {
          const text = await options.nth(i).textContent();
          console.log(`  Option ${i}: "${text}"`);
        }

        // Try to find and click Airlines
        const airlinesOption = page.locator('[role="option"]', { hasText: 'Airlines' }).first();
        const airlinesExists = await airlinesOption.count() > 0;
        console.log('\nAirlines option exists:', airlinesExists);

        if (airlinesExists) {
          console.log('Clicking Airlines...');
          await airlinesOption.click();
          await page.waitForTimeout(1500);

          // Check if airlines view is now active
          const airlineCards = page.locator('[data-airline-id]');
          const airlineCount = await airlineCards.count();
          console.log(`Airline cards visible after selection: ${airlineCount}`);

          if (airlineCount > 0) {
            console.log('\n=== AIRLINES VIEW LOADED ===');

            // Select USA
            console.log('\nLooking for USA country...');
            const usFlag = page.locator('svg[data-code="US"]').first();
            const usExists = await usFlag.count() > 0;
            console.log('USA flag found:', usExists);

            if (usExists) {
              console.log('Clicking USA...');
              await usFlag.click();
              await page.waitForTimeout(1000);

              // Re-count airline cards
              const updatedAirlineCount = await airlineCards.count();
              console.log(`Airline cards for USA: ${updatedAirlineCount}`);

              if (updatedAirlineCount > 0) {
                console.log('\n=== TESTING FIRST CLICK ===');
                const firstAirline = airlineCards.first();
                const airlineId = await firstAirline.getAttribute('data-airline-id');
                const airlineName = await firstAirline.textContent();

                console.log(`First airline: ${airlineName?.trim()} (ID: ${airlineId})`);

                // Check panel before
                const panelBefore = page.locator('text=Aircraft types:').first();
                const panelBeforeVisible = await panelBefore.isVisible({ timeout: 300 }).catch(() => false);
                console.log(`Panel visible before click: ${panelBeforeVisible}`);

                // First click
                console.log('Performing FIRST click...');
                await firstAirline.click();
                await page.waitForTimeout(500);

                // Check panel after
                const panelAfter = page.locator('text=Aircraft types:').first();
                const panelAfterVisible = await panelAfter.isVisible({ timeout: 500 }).catch(() => false);
                console.log(`Panel visible after 1st click: ${panelAfterVisible}`);

                if (!panelAfterVisible) {
                  console.log('\nPanel not visible - trying SECOND click...');
                  await firstAirline.click();
                  await page.waitForTimeout(500);

                  const panelAfter2 = page.locator('text=Aircraft types:').first();
                  const panelAfter2Visible = await panelAfter2.isVisible({ timeout: 500 }).catch(() => false);
                  console.log(`Panel visible after 2nd click: ${panelAfter2Visible}`);
                }
              }
            }
          }
        }
      }
    }

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
