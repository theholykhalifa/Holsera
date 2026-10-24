/**
 * Behaviour probe for the LIVE Cal.com booking link (real account: holsera/30min).
 * Loads /contact/, hovers + clicks "Open the scheduler", and waits properly for
 * Cal.com's modal — which lazily fetches extra chunks after the click. Logs any
 * console errors. Read-only: nothing is booked.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT = path.resolve('out');
const PORT = 4348;
const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edge = EDGE_PATHS.find((p) => fs.existsSync(p));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(OUT, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({ executablePath: edge, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 950 });

const calReqs = [];
page.on('request', (r) => { if (r.url().includes('cal.com')) calReqs.push(r.url()); });
const errs = [];
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
page.on('pageerror', (e) => errs.push('PAGEERROR: ' + String(e)));

await page.goto(`http://localhost:${PORT}/contact/`, { waitUntil: 'networkidle0' });
console.log('cal.com requests at LOAD:', calReqs.length);

const link = await page.$('a[href*="cal.com"]');
await link.hover();
await page.waitForFunction(() => window.Cal && window.Cal.ns, { timeout: 20000 }).catch((e) => console.log('waitFor Cal.ns:', String(e).slice(0, 60)));
console.log('window.Cal after hover =', await page.evaluate(() => typeof window.Cal), '| has ns =', await page.evaluate(() => Boolean(window.Cal && window.Cal.ns)));
console.log('cal.com requests after hover:', calReqs.length);

// Disarm navigation so the anchor's fallback can't leave the page, then click.
await page.evaluate(() => { document.querySelector('a[href*="cal.com"]').addEventListener('click', (e) => e.preventDefault(), { capture: true }); });
await link.click();

// Wait properly for the modal: Cal injects an iframe once it boots.
const gotFrame = await page.waitForFunction(() => [...document.querySelectorAll('iframe')].some((f) => f.src.includes('cal.com')), { timeout: 30000 }).then(() => true).catch(() => false);
console.log('modal iframe appeared =', gotFrame);

const info = await page.evaluate(() => {
  const f = [...document.querySelectorAll('iframe')].find((x) => x.src.includes('cal.com'));
  const overlay = document.querySelector('[data-cal-embed], .cal-embed, [id*="cal"], [class*="cal"]');
  return {
    frameSrc: f ? f.src : null,
    anyCalContainer: Boolean(overlay),
    bodyChildTags: [...document.body.children].map((c) => c.tagName + (c.id ? '#' + c.id : '')).slice(-6),
  };
});
console.log('modal ->', JSON.stringify(info, null, 1));
console.log('cal.com requests after click:', calReqs.length);
console.log('console errors:', errs.length ? errs.slice(0, 6) : 'none');

await page.screenshot({ path: path.resolve('scripts/screenshots/cal-modal-live.png') });
console.log('shot: cal-modal-live.png');

await browser.close();
server.close();
console.log('done');
