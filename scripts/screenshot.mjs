/**
 * Visual QA: serves the static export and screenshots every page in
 * both themes using the locally installed Edge (no download needed).
 *   node scripts/screenshot.mjs
 * Output: scripts/screenshots/*.png — safe to delete.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT = path.resolve('out');
const DIR = path.resolve('scripts/screenshots');
const PORT = 4319;

const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/microsoft-edge',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
];
const edge = EDGE_PATHS.find((p) => fs.existsSync(p));
if (!edge) throw new Error('Edge/Chromium not found for screenshots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
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
  ['home', '/'],
  ['platform', '/platform/'],
  ['how-it-works', '/how-it-works/'],
  ['demo', '/demo/'],
  ['solutions', '/solutions/'],
  ['security-trust', '/security-trust/'],
  ['about', '/about/'],
  ['founder', '/founder/'],
  ['architecture', '/architecture/'],
  ['developers', '/developers/'],
  ['early-access', '/early-access/'],
  ['industry-marketplaces', '/solutions/marketplaces/'],
  ['industry-b2b', '/solutions/b2b-commerce/'],
  ['industry-service-gig', '/solutions/service-gig/'],
  ['industry-fintech', '/solutions/fintech-builders/'],
  ['faq', '/faq/'],
  ['press', '/press/'],
  ['privacy', '/privacy/'],
  ['terms', '/terms/'],
  ['contact', '/contact/'],
];

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

const settle = async (page) => {
  // Trigger every scroll-reveal, then let transitions finish.
  // Force instant scrolling: the site's CSS uses scroll-behavior: smooth,
  // which would otherwise swallow these programmatic jumps.
  await page.evaluate(async () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  });
  await new Promise((r) => setTimeout(r, 1200));
};

const shoot = async (name, url, theme, viewport, suffix = '') => {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // QA must reflect the animated experience: headless Chrome can report
  // prefers-reduced-motion: reduce, which silences every animation.
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' },
  ]);
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  await page.evaluate((t) => localStorage.setItem('holsera-theme', t), theme);
  await page.reload({ waitUntil: 'networkidle0' });
  await settle(page);
  const file = path.join(DIR, `${name}-${theme}${suffix}.png`);
  await page.screenshot({ path: file, fullPage: suffix === '' });
  await page.close();
  console.log('shot:', path.basename(file));
};

const desktop = { width: 1440, height: 950 };

for (const [name, url] of pages) {
  await shoot(name, url, 'dark', desktop);
}
await shoot('home', '/', 'light', desktop);
await shoot('contact', '/contact/', 'light', desktop);
await shoot('home', '/', 'dark', { width: 390, height: 844 }, '-mobile');

// Console error check on the homepage
const probe = await browser.newPage();
const errors = [];
probe.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
probe.on('pageerror', (e) => errors.push(String(e)));
await probe.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await probe.evaluate(() => localStorage.setItem('holsera-theme', 'light'));
await probe.reload({ waitUntil: 'networkidle0' });
console.log('console errors:', errors.length ? errors : 'none');
await browser.close();
server.close();
console.log('done');
