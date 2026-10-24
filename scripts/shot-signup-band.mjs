/**
 * Close-up capture of the live signup band (home page) for visual QA.
 * Read-only: no form submission.
 */
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const ROOT = 'C:/Users/holys/holsera';
const OUT = path.join(ROOT, 'out');
const SHOTS = path.join(ROOT, 'scripts', 'screenshots');
const PORT = 4379;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

const server = http.createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.join(OUT, urlPath);
  if (!filePath.startsWith(OUT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404); res.end('nf'); return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(filePath)] ?? 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const puppeteer = await import('puppeteer-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await puppeteer.launch({
  executablePath: fs.existsSync(EDGE) ? EDGE : 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

for (const theme of ['dark', 'light']) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  // The site's reveal animations are reduced-motion safe, so emulating
  // reduced motion renders every section instantly — no scroll-triggered
  // opacity races, and the fixed header can't overlap the element clip.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.setItem('holsera-theme', t); } catch {}
  }, theme);
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 600));

  // The signup band contains the live form.
  const band = await page.waitForSelector('.signup', { visible: true, timeout: 15000 });
  await band.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await new Promise((r) => setTimeout(r, 500));
  const out = path.join(SHOTS, `signup-band-${theme}.png`);
  await page.screenshot({ path: out });
  process.stdout.write(`shot: signup-band-${theme}.png\n`);
  await page.close();
}

await browser.close();
server.close();
process.stdout.write('done\n');
