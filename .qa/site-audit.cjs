const { chromium } = require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { mkdirSync } = require('node:fs');
const path = require('node:path');
(async () => {
  mkdirSync('.qa', { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  for (const width of [1440, 868, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', isMobile: width === 390, hasTouch: width === 390 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    for (const selector of ['#about', '[data-visual-studies]', '#accounts']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      if (width === 868 && selector === '#about') await page.screenshot({ path: '.qa/about-fixed.jpg', type: 'jpeg', quality: 65 });
    }
    console.log(JSON.stringify({width,errors,layout:await page.evaluate(() => ({overflow:document.documentElement.scrollWidth > innerWidth,asides:[...document.querySelectorAll('.about-aside ul,.about-aside .signature')].map(e=>({width:e.getBoundingClientRect().width,text:e.textContent.trim()})),videos:document.querySelectorAll('[data-video-id]').length,stills:document.querySelectorAll('[data-visual-studies] figure').length}))}));
    await context.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
