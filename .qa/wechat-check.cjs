const { chromium } = require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const wechat of [false, true]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, userAgent: `Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36${wechat ? ' MicroMessenger/8.0.56' : ''}`, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const mediaRequests = [];
      page.on('request', request => { if(request.url().includes('.mp4')) mediaRequests.push(request.url()); });
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
      await page.locator('[data-reel-player]').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => !!document.querySelector('[data-reel-player]').getAttribute('src'));
      const before = await page.evaluate(() => ({light:document.body.classList.contains('wechat-mode'),source:document.querySelector('[data-reel-player]').getAttribute('src'),bar:document.querySelector('.shoot-edit-player source').getAttribute('src'),hero:document.querySelector('.hero-video').paused,overflow:document.documentElement.scrollWidth > innerWidth}));
      before.mediaRequestCount = mediaRequests.length;
      await page.locator('[data-video-id="anime-fight"]').click();
      await page.waitForFunction(() => document.querySelector('[data-reel-player]').currentTime > 0);
      await page.evaluate(() => {const v=document.querySelector('[data-reel-player]');v.pause();v.currentTime=8;});
      await page.waitForFunction(() => !document.querySelector('[data-reel-player]').seeking);
      const after = await page.evaluate(() => ({time:document.querySelector('[data-reel-player]').currentTime,status:document.querySelector('[data-video-id="anime-fight"]').dataset.playbackStatus,source:document.querySelector('[data-reel-player]').getAttribute('src')}));
      console.log(JSON.stringify({wechat,before,after,errors}));
      if(errors.length || before.light !== wechat || !before.source.includes(wechat ? '/wechat/' : '/ai/') || Math.abs(after.time-8) > .5) throw new Error('Playback check failed');
      await context.close();
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
