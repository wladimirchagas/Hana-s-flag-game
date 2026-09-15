import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`));

  try {
    // Navigate directly to the learn page with airlines already shown
    console.log('Navigating to learn page...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });

    // Wait for initial load
    await page.waitForTimeout(2000);

    // Open the dropdown to select "Airlines" view
    console.log('Looking for Show dropdown...');
    const showButton = page.locator('button:has-text("Show")').first();
    if (await showButton.isVisible()) {
      console.log('Clicking Show dropdown...');
      await showButton.click();
      await page.waitForTimeout(500);

      // Click Airlines option
      const airlinesOption = page.locator('text=Airlines').first();
      if (await airlinesOption.isVisible()) {
        console.log('Clicking Airlines option...');
        await airlinesOption.click();
        await page.waitForTimeout(1000);
      } else {
        console.log('Airlines option not visible');
      }
    } else {
      console.log('Show dropdown not visible');
    }

    // Select a country first
    console.log('Clicking on a country flag...');
    const usFlag = page.locator('svg[data-code="US"]').first();
    if (await usFlag.isVisible()) {
      await usFlag.click();
      console.log('Selected United States');
      await page.waitForTimeout(1000);
    }

    // Look for airline cards
    console.log('Looking for airline cards...');
    const airlineCards = page.locator('[data-airline-id]');
    const count = await airlineCards.count();
    console.log(`Found ${count} airline cards`);

    if (count > 0) {
      // Get the first airline card
      const firstAirline = airlineCards.first();
      const airlineId = await firstAirline.getAttribute('data-airline-id');
      const airlineName = await firstAirline.textContent();
      console.log(`First airline: ${airlineName} (ID: ${airlineId})`);

      // Check if AirlineDetails panel is visible before click
      const airlinePanel = page.locator('text=Aircraft types:').first();
      const beforeClick = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
      console.log(`AirlineDetails panel visible before click: ${beforeClick}`);

      // FIRST CLICK
      console.log('Performing FIRST click on airline card...');
      await firstAirline.click();
      await page.waitForTimeout(500);

      // Check if panel is visible after first click
      const afterFirstClick = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
      const panelTextAfterFirstClick = afterFirstClick
        ? (await airlinePanel.textContent()).substring(0, 100)
        : "NOT VISIBLE";
      console.log(`After 1st click - Panel visible: ${afterFirstClick}, Text: ${panelTextAfterFirstClick}`);

      // If not visible, do a second click
      if (!afterFirstClick) {
        console.log('Panel not visible after first click, performing SECOND click...');
        await firstAirline.click();
        await page.waitForTimeout(500);

        const afterSecondClick = await airlinePanel.isVisible({ timeout: 500 }).catch(() => false);
        const panelTextAfterSecondClick = afterSecondClick
          ? (await airlinePanel.textContent()).substring(0, 100)
          : "NOT VISIBLE";
        console.log(`After 2nd click - Panel visible: ${afterSecondClick}, Text: ${panelTextAfterSecondClick}`);
      }

      // Check what's in the page DOM to debug
      const gridAirlineIdElements = page.locator('[data-airline-id]');
      const activeElement = page.locator('[data-airline-id][data-active="true"]');
      const activeCount = await activeElement.count();
      console.log(`Active airline elements: ${activeCount}`);
    }
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
