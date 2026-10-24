/**
 * Probe which cal.com URLs resolve, using a real browser UA.
 * Read-only: no clicks, no form submits.
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const edge = EDGE_PATHS.find((p) => fs.existsSync(p));

const urls = [
  'https://cal.com/privacy',
  'https://cal.com/privacy-policy',
];

const browser = await puppeteer.launch({ executablePath: edge, headless: true, args: ['--no-sandbox'] });
for (const url of urls) {
  const page = await browser.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 2500));
    const title = await page.title();
    const body = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ').slice(0, 160);
    console.log(`\n${url}\n  status=${resp?.status()} title="${title}"\n  body: ${body}`);
  } catch (e) {
    console.log(`\n${url}\n  ERROR: ${String(e).slice(0, 120)}`);
  }
  await page.close();
}
await browser.close();
