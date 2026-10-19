/** One-off page close-up for visual QA: node scripts/hero-shot.mjs [path] [outfile] */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const SHOT_PATH = process.argv[2] ?? '/';
const OUT_FILE = process.argv[3] ?? 'scripts/screenshots/hero-closeup.png';
const VIEW_H = Number(process.argv[4] ?? 900);

const OUT = path.resolve('out');
const PORT = 4321;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(OUT, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const edge = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({ executablePath: edge, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: VIEW_H, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
await page.goto(`http://localhost:${PORT}${SHOT_PATH}`, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: OUT_FILE });
await browser.close();
server.close();
console.log('done');
