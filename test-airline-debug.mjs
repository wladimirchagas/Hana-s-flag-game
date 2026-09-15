import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    console.log(text);
    consoleLogs.push(text);
  });

  try {
    console.log('=== STARTING AIRLINE SINGLE-CLICK TEST ===\n');

    // Navigate to learn page
    console.log('1. Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Try to find and click the Show dropdown
    console.log('\n2. Looking for Show dropdown...');
    const showButton = page.locator('button:has-text("Show")').first();
    const isShowVisible = await showButton.isVisible({ timeout: 5000 }).catch(() => false);
    console.log(`   Show button visible: ${isShowVisible}`);

    if (isShowVisible) {
      console.log('   Clicking Show dropdown...');
      await showButton.click();
      await page.waitForTimeout(500);

      // Click Airlines option
      console.log('\n3. Looking for Airlines option...');
      const airlinesOption = page.locator('text=Airlines').first();
      const isAirlinesVisible = await airlinesOption.isVisible({ timeout: 3000 }).catch(() => false);
      console.log(`   Airlines option visible: ${isAirlinesVisible}`);

      if (isAirlinesVisible) {
        console.log('   Clicking Airlines option...');
        await airlinesOption.click();
        await page.waitForTimeout(1500);

        // Select a country first
        console.log('\n4. Selecting country (US)...');
        const usFlag = page.locator('svg[data-code="US"]').first();
        const isUSVisible = await usFlag.isVisible({ timeout: 3000 }).catch(() => false);
        console.log(`   US flag visible: ${isUSVisible}`);

        if (isUSVisible) {
          await usFlag.click();
          await page.waitForTimeout(1500);

          // Now look for airline cards
          console.log('\n5. Looking for airline cards in the grid...');
          const airlineCards = page.locator('[data-airline-id]');
          const count = await airlineCards.count();
          console.log(`   Found ${count} airline cards`);

          if (count > 0) {
            const firstAirline = airlineCards.first();
            const airlineId = await firstAirline.getAttribute('data-airline-id');
            const airlineName = await firstAirline.textContent();
            console.log(`   First airline: ${airlineName?.trim()} (ID: ${airlineId})`);

            // Check panel state BEFORE click
            console.log('\n6. Checking panel BEFORE first click...');
            const airlinePanel = page.locator('text=Aircraft types:').first();
            const panelVisibleBefore = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
            console.log(`   Panel visible before click: ${panelVisibleBefore}`);

            // FIRST CLICK
            console.log('\n7. PERFORMING FIRST CLICK ON AIRLINE CARD...');
            console.log(`   Clicking: ${airlineName?.trim()}`);
            await firstAirline.click();

            // Wait briefly then check state
            await page.waitForTimeout(300);

            console.log('\n8. Checking panel AFTER first click (300ms wait)...');
            const panelVisibleAfter1 = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
            console.log(`   Panel visible after 1st click: ${panelVisibleAfter1}`);

            if (panelVisibleAfter1) {
              const panelText = await airlinePanel.textContent();
              console.log(`   Panel shows: ${panelText?.substring(0, 80)}`);
            } else {
              console.log('   Panel is NOT visible - testing if second click works...');

              // SECOND CLICK
              console.log('\n9. PERFORMING SECOND CLICK ON AIRLINE CARD...');
              await firstAirline.click();
              await page.waitForTimeout(300);

              console.log('\n10. Checking panel AFTER second click...');
              const panelVisibleAfter2 = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
              console.log(`   Panel visible after 2nd click: ${panelVisibleAfter2}`);

              if (panelVisibleAfter2) {
                const panelText = await airlinePanel.textContent();
                console.log(`   Panel shows: ${panelText?.substring(0, 80)}`);
              }
            }
          }
        } else {
          console.log('   US flag not visible - skipping country selection');
        }
      } else {
        console.log('   Airlines option not visible');
      }
    } else {
      console.log('   Show button not visible');
    }

    console.log('\n=== TEST COMPLETE ===');
    console.log(`\nTotal console logs captured: ${consoleLogs.length}`);

  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
