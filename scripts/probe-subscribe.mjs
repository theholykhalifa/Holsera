/**
 * Behaviour probe for the live-mode subscribe form.
 * Fills + submits the home signup form against the (nonexistent) QA
 * username and prints the resulting status text — verifies the fetch
 * path runs and the UI reports the real outcome.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT = path.resolve('out');
const PORT = 4337;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
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

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 950 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

// --- empty submit ---
await page.click('.signup__form button[type="submit"]');
await new Promise((r) => setTimeout(r, 200));
console.log('empty  ->', await page.evaluate(() => document.querySelector('.signup__error')?.textContent ?? '(none)'));

// --- real submit against nonexistent username ---
await page.type('.signup__form input[name="email"]', 'qa-probe@example.com');
await page.click('.signup__form button[type="submit"]');
await page.waitForFunction(
  () => document.querySelector('.form-status') || document.querySelector('.signup__error'),
  { timeout: 20000 }
);
console.log('submit ->', await page.evaluate(() => {
  const s = document.querySelector('.form-status');
  if (s) return 'STATUS: ' + s.textContent.trim().slice(0, 220);
  return 'ERROR: ' + document.querySelector('.signup__error')?.textContent;
}));

// --- honeypot silently swallows ---
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  const hp = document.querySelector('.subscribe__hp');
  hp.value = 'bot-filled';
});
await page.type('.signup__form input[name="email"]', 'bot@example.com');
await page.click('.signup__form button[type="submit"]');
await new Promise((r) => setTimeout(r, 500));
console.log('bot    ->', await page.evaluate(() => document.querySelector('.form-status')?.textContent.trim().slice(0, 80) ?? '(no status — BAD)'));

await browser.close();
server.close();
console.log('done');
