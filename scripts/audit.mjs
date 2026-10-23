import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT = path.resolve('out');
const PORT = 4327;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(OUT, p);
  if (!file.startsWith(OUT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });

const pages = ['/', '/platform/', '/how-it-works/', '/demo/', '/solutions/', '/solutions/marketplaces/', '/solutions/b2b-commerce/', '/solutions/service-gig/', '/solutions/fintech-builders/', '/security-trust/', '/about/', '/founder/', '/faq/', '/press/', '/privacy/', '/terms/', '/contact/', '/architecture/', '/developers/', '/early-access/'];
const vp = { width: 390, height: 844 }; // iPhone 14

const overflow = [];
const a11y = [];
for (const url of pages) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  // horizontal overflow check
  const res = await page.evaluate(() => {
    const de = document.documentElement;
    const scrollW = Math.max(de.scrollWidth, document.body.scrollWidth);
    const clientW = de.clientWidth;
    let worst = null, worstOv = 0;
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      const ov = r.right - clientW;
      if (ov > 2 && ov > worstOv) { worstOv = ov; worst = el.tagName + '.' + (el.className && typeof el.className === 'string' ? el.className.split(' ')[0] : ''); }
    }
    return { scrollW, clientW, worst, worstOv: Math.round(worstOv) };
  });
  if (res.scrollW > res.clientW + 2) overflow.push({ url, ...res });

  // a11y quick audit
  const a = await page.evaluate(() => {
    const issues = [];
    // images without alt
    document.querySelectorAll('img').forEach((im) => { if (!im.hasAttribute('alt')) issues.push('img missing alt: ' + im.src); });
    // buttons/links without accessible name
    document.querySelectorAll('button, a').forEach((b) => {
      const txt = (b.textContent || '').trim();
      const aria = b.getAttribute('aria-label');
      if (!txt && !aria) issues.push((b.tagName) + ' without accessible name');
    });
    // inputs without label/aria
    document.querySelectorAll('input, select, textarea').forEach((inp) => {
      const id = inp.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      if (!hasLabel && !inp.getAttribute('aria-label') && !inp.getAttribute('aria-labelledby')) issues.push('input without label: #' + (id || inp.name || inp.type));
    });
    // h1 count
    const h1 = document.querySelectorAll('h1').length;
    if (h1 !== 1) issues.push('h1 count = ' + h1);
    return issues;
  });
  if (a.length) a11y.push({ url, issues: a });
  await page.close();
}

console.log('=== HORIZONTAL OVERFLOW (mobile 390px) ===');
console.log(overflow.length ? JSON.stringify(overflow, null, 2) : 'none');
console.log('=== A11Y QUICK AUDIT ===');
console.log(a11y.length ? JSON.stringify(a11y, null, 2) : 'none');

// ---- Deep checks: contrast, tap targets, heading order, reduced-motion ----
const deep = [];
const b2 = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
for (const url of ['/', '/platform/', '/demo/', '/solutions/marketplaces/', '/early-access/', '/founder/']) {
  const page = await b2.newPage();
  await page.setViewport(vp);
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  const r = await page.evaluate(() => {
    const out = { contrast: [], smallTap: [], headingJumps: [] };
    const lum = (c) => { const s = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]; };
    const parse = (str) => { const m = str.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const bgOf = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.5) return c; e = e.parentElement; } return { r: 255, g: 255, b: 255, a: 1 }; };
    const ratio = (f, b) => { const L1 = lum([f.r, f.g, f.b]), L2 = lum([b.r, b.g, b.b]); const a = Math.max(L1, L2), c = Math.min(L1, L2); return (a + 0.05) / (c + 0.05); };
    document.querySelectorAll('p, span, li, a, h1, h2, h3, h4, button, td, th').forEach((el) => {
      if (!el.textContent.trim()) return;
      if (el.querySelector('p, span, li, a, h1, h2, h3, button')) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return;
      const fg = parse(cs.color); if (!fg) return;
      const bg = bgOf(el);
      const cr = ratio(fg, bg);
      const size = parseFloat(cs.fontSize); const bold = parseInt(cs.fontWeight) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const need = large ? 3 : 4.5;
      if (cr < need) out.contrast.push({ sel: el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : ''), cr: +cr.toFixed(2), need, txt: el.textContent.trim().slice(0, 40) });
    });
    // tap targets
    document.querySelectorAll('a, button, input[type=checkbox]').forEach((el) => {
      const r2 = el.getBoundingClientRect();
      if (r2.width === 0 || r2.height === 0) return;
      if (r2.height < 24 || r2.width < 24) out.smallTap.push({ sel: el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : ''), w: Math.round(r2.width), h: Math.round(r2.height) });
    });
    // heading order
    let prev = 0;
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
      const lvl = +h.tagName[1];
      if (prev && lvl > prev + 1) out.headingJumps.push({ from: prev, to: lvl, txt: h.textContent.trim().slice(0, 30) });
      prev = lvl;
    });
    return out;
  });
  // reduced-motion: verify figures/animations rest
  const p3 = await b2.newPage();
  await p3.setViewport(vp);
  await p3.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p3.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  const motion = await p3.evaluate(() => {
    // any element with a running infinite animation under reduce?
    let anim = 0;
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.animationIterationCount === 'infinite' && cs.animationPlayState !== 'paused') anim++;
    });
    const reveals = [...document.querySelectorAll('.reveal, [data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length;
    return { infiniteAnimations: anim, hiddenReveals: reveals };
  });
  await p3.close();
  deep.push({ url, contrast: r.contrast.slice(0, 6), contrastCount: r.contrast.length, smallTap: r.smallTap.slice(0, 6), smallTapCount: r.smallTap.length, headingJumps: r.headingJumps, motion });
  await page.close();
}
console.log('=== DEEP CHECKS ===');
console.log(JSON.stringify(deep, null, 2));
await b2.close();
await browser.close();
server.close();
process.exit(0);
