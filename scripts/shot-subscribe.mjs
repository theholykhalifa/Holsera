/**
 * Targeted visual QA for the mailing-list / booking wiring.
 *   node scripts/shot-subscribe.mjs <tag>
 * Screenshots the four affected pages; output suffix = <tag> so demo-mode
 * and live-mode captures can be compared side by side.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const TAG = process.argv[2] ?? 'demo';
const OUT = path.resolve('out');
const DIR = path.resolve('scripts/screenshots');
const PORT = 4327;

const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edge = EDGE_PATHS.find((p) => fs.existsSync(p));
if (!edge) throw new Error('Edge not found');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let p = decodeURIComponent(url.pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(OUT, p);
    if (!file.startsWith(OUT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});
await new Promise((r) => server.listen(PORT, r));
fs.mkdirSync(DIR, { recursive: true });

const pages = [
  ['home-signup', '/'],
  ['developers', '/developers/'],
  ['early-access', '/early-access/'],
  ['contact', '/contact/'],
];

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

for (const [name, url] of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' },
  ]);
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  // Force all reveals visible so full-page shots aren't blank below the fold.
  await page.evaluate(async () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  });
  await new Promise((r) => setTimeout(r, 900));
  const file = path.join(DIR, `${name}-${TAG}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log('shot:', path.basename(file));

  // Dump the subscribe/booking DOM facts for honest-mode verification.
  const facts = await page.evaluate(() => ({
    forms: [...document.querySelectorAll('form')].map((f) => ({
      action: f.getAttribute('action'),
      target: f.getAttribute('target'),
      email: Boolean(f.querySelector('input[name="email"]')),
      tag: f.querySelector('input[name="tag"]')?.getAttribute('value') ?? null,
      honeypot: Boolean(f.querySelector('input[name="website"]')),
    })),
    iframes: document.querySelectorAll('iframe').length,
    bookingCard: Boolean(document.querySelector('.booking-card')),
    calLinks: [...document.querySelectorAll('a[href^="https://cal.com"]')].length,
    notes: [...document.querySelectorAll('.form-note')].map((n) => n.textContent.trim().slice(0, 90)),
  }));
  console.log(JSON.stringify(facts, null, 1));
  await page.close();
}

await browser.close();
server.close();
console.log('done:', TAG);
