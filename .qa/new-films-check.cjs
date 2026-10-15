const { chromium } = require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const wechat of [false, true]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce', userAgent: `Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36${wechat ? ' MicroMessenger/8.0.56' : ''}` });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
      await page.locator('[data-reel-player]').scrollIntoViewIfNeeded();
      for (const id of ['clothing-creative', 'live-action-fight', 'watch-strap-ad']) {
        await page.locator(`[data-video-id="${id}"]`).click();
        await page.waitForFunction(() => { const v = document.querySelector('[data-reel-player]'); return v.currentTime > 0 && !v.paused; });
        const state = await page.evaluate(() => {
          const v = document.querySelector('[data-reel-player]');
          return { src: v.currentSrc, width: v.videoWidth, height: v.videoHeight, duration: v.duration, portrait: v.closest('.reel-screen').classList.contains('is-portrait'), overflow: document.documentElement.scrollWidth > innerWidth };
        });
        if (!state.src.includes(`/${wechat ? 'wechat' : 'ai'}/${id}.mp4`) || state.portrait !== (id === 'watch-strap-ad') || state.overflow) throw new Error(JSON.stringify(state));
        await page.evaluate(() => { const v = document.querySelector('[data-reel-player]'); v.pause(); v.currentTime = 8; });
        await page.waitForFunction(() => { const v = document.querySelector('[data-reel-player]'); return !v.seeking && Math.abs(v.currentTime - 8) < 0.5; });
        console.log(JSON.stringify({ wechat, id, ...state }));
      }
      if (errors.length) throw new Error(errors.join('; '));
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
