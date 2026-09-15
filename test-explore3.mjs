import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating...');
    await page.goto('http://localhost:5173/learn', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Look at HTML structure around "Show"
    const htmlContent = await page.evaluate(() => {
      const showSpan = Array.from(document.querySelectorAll('*')).find(el =>
        el.textContent.includes('Show') && el.textContent.length < 100
      );
      if (!showSpan) return 'No Show element found';

      // Get parent hierarchy
      let el = showSpan;
      let hierarchy = [];
      for (let i = 0; i < 5; i++) {
        if (!el) break;
        hierarchy.push({
          tag: el.tagName,
          class: el.className,
          onclick: !!el.onclick,
          ariaLabel: el.getAttribute('aria-label'),
          text: el.textContent?.substring(0, 50)
        });
        el = el.parentElement;
      }
      return hierarchy;
    });

    console.log('HTML hierarchy around Show:');
    console.log(JSON.stringify(htmlContent, null, 2));

    // Try finding it with different selectors
    console.log('\n=== TRYING DIFFERENT SELECTORS ===\n');

    const selectors = [
      'text=Show',
      ':text("Show")',
      'button:has-text("Show")',
      '[role="button"]:has-text("Show")',
      'div:has-text("Show")',
    ];

    for (const selector of selectors) {
      try {
        const count = await page.locator(selector).count();
        if (count > 0) {
          const first = page.locator(selector).first();
          const visible = await first.isVisible();
          const html = await first.evaluate(el => el.outerHTML?.substring(0, 100));
          console.log(`✓ "${selector}": ${count} element(s), visible: ${visible}`);
          console.log(`  HTML: ${html}`);
        }
      } catch (e) {
        console.log(`✗ "${selector}": error - ${e.message?.substring(0, 50)}`);
      }
    }

  } finally {
    await browser.close();
  }
})();
