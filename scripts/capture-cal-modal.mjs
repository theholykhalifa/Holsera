/**
 * Captures the Cal.com booking modal fully loaded on /contact/ against the
 * REAL account (holsera/30min), in both themes. Read-only — the calendar is
 * never interacted with, so nothing is booked.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const ROOT = 'C:/Users/holys/holsera';
const OUT = path.join(ROOT, 'out');
const SHOTS = path.join(ROOT, 'scripts', 'screenshots');
const PORT = 4373;

// Console output must survive a hard kill: fs.writeSync bypasses the async
// pipe buffer that process.exit() would truncate on Windows. Mirrored to a
// log file because this harness's stdout capture is unreliable on kill.
const logFile = path.join(ROOT, 'scripts', 'capture-cal-modal.log');
fs.writeFileSync(logFile, '');
const log = (...a) => {
  const line = a.join(' ') + '\n';
  fs.writeSync(1, line);
  fs.appendFileSync(logFile, line);
};

// Watchdog: never let this script hang a shell session silently.
const watchdog = setTimeout(() => {
  fs.writeSync(2, 'WATCHDOG: timed out after 150s\n');
  try { fs.appendFileSync(logFile, 'WATCHDOG: timed out after 150s\n'); } catch {}
  process.exit(2);
}, 150000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const server = http.createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(OUT, urlPath);
  if (!filePath.startsWith(OUT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] ?? 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});
// NB: use the listen CALLBACK — on this Node build the 'listen' event is not
// emitted (await once(server, 'listen') hangs forever).
await new Promise((r) => server.listen(PORT, r));
log(`serving out/ on http://localhost:${PORT}`);

const puppeteer = await import('puppeteer-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const browser = await puppeteer.launch({
  executablePath: fs.existsSync(EDGE) ? EDGE : 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

async function shoot(theme) {
  log(`[${theme}] opening /contact/`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  // Set the theme BEFORE the page's scripts run — evaluateOnNewDocument runs
  // on every navigation, so the site boots straight into the right mode and
  // CalLink passes the correct ui.color-scheme to the embed.
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.setItem('holsera-theme', t); } catch {}
  }, theme);
  // domcontentloaded + explicit waits — networkidle* can hang on pages with
  // long-lived connections, and this page is static so there is nothing to
  // wait for beyond the DOM.
  await page.goto(`http://localhost:${PORT}/contact/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 800));

  // Only a booking link on this page should be able to reach a third party.
  const thirdPartyAtLoad = await page.evaluate(() =>
    performance.getEntriesByType('resource').filter((r) => /cal\.com/.test(r.name)).length
  );

  const link = await page.waitForSelector('a[href*="cal.com"]', { visible: true, timeout: 15000 });
  await link.hover(); // warms the loader — injects embed.js, opens nothing

  // Wait for embed.js to take over the namespace queue (readiness signal is
  // the drained queue, so poll for it) before clicking, otherwise the click
  // falls through to plain navigation instead of opening the modal.
  await page.waitForFunction(
    () => window.Cal && window.Cal.ns && window.Cal.ns.holsera &&
          window.Cal.ns.holsera.q && window.Cal.ns.holsera.q.length === 0,
    { timeout: 20000 }
  ).catch(() => log(`[${theme}] warn: namespace not drained in 20s`));
  await new Promise((r) => setTimeout(r, 500));

  // Block anchor navigation during the click so a not-yet-ready embed can't
  // navigate the page away (in the real product that navigation IS the
  // fallback; here we are only screenshotting the modal path).
  await page.evaluate(() => {
    document.querySelector('a[href*="cal.com"]').addEventListener(
      'click', (e) => e.preventDefault(), { capture: true }
    );
  });
  await link.click();

  const frame = await page.waitForSelector('cal-modal-box iframe.cal-embed', { visible: true, timeout: 30000 });
  // Wait for the real scheduler (not the skeleton) to paint inside the frame.
  const frameContent = await frame.contentFrame();
  await frameContent.waitForFunction(
    () => document.body && document.body.innerText.trim().length > 40,
    { timeout: 30000 }
  ).catch(() => log(`[${theme}] warn: frame text never appeared`));
  await new Promise((r) => setTimeout(r, 3500));

  const src = await frame.evaluate((f) => f.getAttribute('src'));
  const out = path.join(SHOTS, `contact-cal-modal-${theme}.png`);
  await page.screenshot({ path: out });

  log(`[${theme}] modal src  = ${src}`);
  log(`[${theme}] cal.com requests at page load (must be 0) = ${thirdPartyAtLoad}`);
  log(`[${theme}] screenshot -> ${path.relative(ROOT, out)}`);
  log(`[${theme}] console errors = ${errors.length ? JSON.stringify(errors.slice(0, 5)) : 'none'}`);
  await page.close();
}

for (const theme of ['dark', 'light']) {
  await shoot(theme);
}

clearTimeout(watchdog);
await browser.close();
server.close();
log('done');
