/**
 * Brand asset preparation — run once after adding logo files:
 *   node scripts/brand-prep.mjs
 *
 * For each PNG in public/brand/ it:
 *   1. backs up the untouched original to public/brand/originals/
 *   2. removes the flat WHITE background with proper alpha matting
 *      (unmix-from-white), which recovers true colors on anti-aliased
 *      edges instead of leaving the white-blended fringe the old
 *      threshold approach kept ("white cuts" on dark backgrounds)
 *   3. trims whitespace down to the artwork bounding box
 *   4. for logo-horizontal.png, also writes logo-horizontal-dark.png
 *      (white wordmark for dark backgrounds, per the official
 *       "Dark Background" logo variant in the brand guidelines)
 *   5. crops logo-3d.png down to the glass H only (drops the glow
 *      and the wordmark underneath, so it works on any background)
 *      and de-fringes its edges (edge-only unmix, so interior glass
 *      highlights are preserved)
 *   6. writes src/app/icon.png (favicon file route) and
 *      public/brand/opengraph-image.png (referenced by absolute URL
 *      in layout metadata — NOT a file route, because file routes get
 *      basePath applied twice on GitHub Pages)
 *
 * Idempotent: originals are backed up once; every run restarts from
 * the untouched originals so results never degrade across runs.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BRAND_DIR = path.resolve('public/brand');
const ORIGINALS_DIR = path.join(BRAND_DIR, 'originals');
const APP_DIR = path.resolve('src/app');

fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
fs.mkdirSync(APP_DIR, { recursive: true });

async function loadRaw(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Unmix-from-white alpha matting.
 *
 * Every pixel of the source is a blend of the artwork with the flat
 * white background:  observed = a * C + (1 - a) * 255.
 * The whitest channel tells us the coverage (a = 1 - min(r,g,b)/255,
 * exact for artwork whose darkest channel is ~0 — true for Holsera's
 * saturated blues and navy), and the true color recovers as
 *  C = (observed - (1 - a) * 255) / a.
 *
 * This yields clean, saturated anti-aliased edges with zero white
 * halo on any background — the defect the old threshold method had.
 *
 * edgeOnly: only decontaminate pixels touching transparency (used for
 * the 3D glass mark, where interior highlights must stay untouched).
 */
function unmixWhite(data, width, height, { edgeOnly = false } = {}) {
  const alpha = new Float32Array(width * height);
  for (let p = 0; p < width * height; p++) {
    const i = p * 4;
    const mn = Math.min(data[i], data[i + 1], data[i + 2]);
    alpha[p] = 1 - mn / 255;
  }
  const nearTransparent = (p) =>
    alpha[p] < 0.09 ||
    (p % width > 0 && alpha[p - 1] < 0.09) ||
    (p % width < width - 1 && alpha[p + 1] < 0.09) ||
    (p >= width && alpha[p - width] < 0.09) ||
    (p < width * height - width && alpha[p + width] < 0.09);

  for (let p = 0; p < width * height; p++) {
    const a = alpha[p];
    const i = p * 4;
    if (edgeOnly && !nearTransparent(p)) continue; // interior: keep as rendered
    if (a < 0.09) {
      // Below ~9% coverage the pixel is background noise, not artwork.
      // Zero the RGB too so no processor can bleed white through it.
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
      continue;
    }
    if (a >= 0.92) {
      data[i + 3] = 255;
      continue; // effectively solid artwork — leave colors untouched
    }
    const inv = 1 - a;
    for (let c = 0; c < 3; c++) {
      const v = (data[i + c] - inv * 255) / a;
      data[i + c] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
    }
    data[i + 3] = Math.round(a * 255);
  }
}

/**
 * Two-pass flood-fill background removal for the 3D mark: pass 1
 * removes the flat background but preserves interior glass
 * highlights; pass 2 continues into the soft glow under the H with a
 * relaxed predicate. (Edge de-fringing is applied afterwards via
 * unmixWhite in edge-only mode.)
 */
function removeBackgroundFlood(data, width, height) {
  const test = (x, y, relaxed) => {
    const i = (y * width + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mn = Math.min(r, g, b);
    const spread = Math.max(r, g, b) - mn;
    return relaxed ? mn >= 168 && spread <= 42 : mn >= 200 && spread < 24;
  };

  const visited = new Uint8Array(width * height);
  const flood = (relaxed) => {
    const stack = [];
    if (relaxed) {
      // Seed from already-removed pixels by pushing their NEIGHBOURS
      // (seeds themselves are visited and would be skipped).
      for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) continue;
        const x = i % width;
        const y = Math.floor(i / width);
        stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
      }
    } else {
      for (let x = 0; x < width; x++) stack.push(x, 0, x, height - 1);
      for (let y = 0; y < height; y++) stack.push(0, y, width - 1, y);
    }
    while (stack.length) {
      const y = stack.pop(), x = stack.pop();
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const idx = y * width + x;
      if (visited[idx] || !test(x, y, relaxed)) continue;
      visited[idx] = 1;
      stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
    }
  };

  flood(false);
  flood(true);

  for (let i = 0; i < visited.length; i++) {
    if (visited[i]) {
      const j = i * 4;
      data[j] = 0;
      data[j + 1] = 0;
      data[j + 2] = 0;
      data[j + 3] = 0;
    }
  }
}

/** Bounding box of pixels with alpha > 10, plus padding. */
function contentBox(data, width, height, pad = 6) {
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * Find where the dark wordmark under the 3D H begins (first row with
 * enough dark, low-saturation text pixels) and return a cropped view
 * of the buffer keeping only what is above it.
 */
function cropBelowWordmark(data, width, height) {
  for (let y = 0; y < height; y++) {
    let navy = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 40) continue;
      const bri = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const spread = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
      if (bri < 95 && spread < 80) navy++;
    }
    if (navy >= 12) {
      const newH = Math.max(1, y - 8);
      console.log(`  wordmark starts at row ${y}, cropping to ${newH}px tall`);
      return { data: data.subarray(0, width * newH * 4), width, height: newH };
    }
  }
  console.log('  no wordmark rows found, keeping full height');
  return { data, width, height };
}

/**
 * Dark-background variant of the horizontal lockup: everything right of
 * the H mark (wordmark + tagline) becomes white, matching the official
 * "Dark Background" usage panel in the brand guidelines.
 * MUTATES a copy — never the buffer used for the light variant.
 */
function whitenText(data, width, height) {
  const vividCol = new Uint8Array(width);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 128) continue;
      const spread = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
      if (spread > 110) {
        vividCol[x] = 1;
        break;
      }
    }
  }
  let runEnd = -1, gap = 0;
  const GAP_TOLERANCE = 20;
  for (let x = 0; x < width; x++) {
    if (vividCol[x]) {
      runEnd = x;
      gap = 0;
    } else if (runEnd > 0) {
      gap++;
      if (gap > GAP_TOLERANCE) break;
    }
  }
  if (runEnd <= 0) {
    console.warn('  ! could not locate the H mark; falling back to midpoint split');
    runEnd = Math.floor(width / 2);
  }

  let recolored = 0;
  for (let y = 0; y < height; y++) {
    for (let x = runEnd + GAP_TOLERANCE; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] === 0) continue;
      const bri = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (bri < 210) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        recolored++;
      }
    }
  }
  console.log(`  dark variant: mark ends at x=${runEnd}, ${recolored} px whitened`);
}

async function process(name, { mode = 'unmix', darkVariant = false, cropText = false } = {}) {
  const file = path.join(BRAND_DIR, name);
  if (!fs.existsSync(file)) {
    console.log(`- ${name}: not present, skipped`);
    return;
  }

  const backup = path.join(ORIGINALS_DIR, name);
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
  fs.copyFileSync(backup, file); // always start from the untouched original

  let { data, width, height } = await loadRaw(file);
  if (mode === 'flood') {
    removeBackgroundFlood(data, width, height);
    unmixWhite(data, width, height, { edgeOnly: true }); // de-fringe edges only
  } else {
    unmixWhite(data, width, height);
  }

  if (cropText) ({ data, width, height } = cropBelowWordmark(data, width, height));

  const box = contentBox(data, width, height);
  if (!box) {
    console.log(`- ${name}: no content detected after background removal?!`);
    return;
  }

  // Primary variant (light backgrounds) — written first, from pristine data.
  await sharp(data, { raw: { width, height, channels: 4 } })
    .extract(box)
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(`- ${name}: ${box.width}x${box.height} (from ${width}x${height}), background removed, trimmed`);

  if (darkVariant) {
    const darkData = Buffer.from(data); // copy BEFORE whitening
    whitenText(darkData, width, height);
    await sharp(darkData, { raw: { width, height, channels: 4 } })
      .extract(box)
      .png({ compressionLevel: 9 })
      .toFile(path.join(BRAND_DIR, 'logo-horizontal-dark.png'));
    console.log(`- logo-horizontal-dark.png: written`);
  }
}

async function makeIcon() {
  const mark = path.join(BRAND_DIR, 'logo-mark.png');
  if (!fs.existsSync(mark)) return;
  const meta = await sharp(mark).metadata();
  const size = Math.max(meta.width, meta.height);
  const pad = Math.round(size * 0.06);
  await sharp(mark)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(512, 512)
    .png()
    .toFile(path.join(APP_DIR, 'icon.png'));
  console.log(`- src/app/icon.png: 512x512 from mark`);
}

async function makeOgImage() {
  const lockup = path.join(BRAND_DIR, 'logo-horizontal-dark.png');
  if (!fs.existsSync(lockup)) return;
  const b64 = fs.readFileSync(lockup).toString('base64');
  const meta = await sharp(lockup).metadata();
  const w = 900;
  const h = Math.round((meta.height / meta.width) * w);
  const x = Math.round((1200 - w) / 2);
  const y = Math.round((630 - h) / 2);

  // Palette matches the site's deep CTA band (navy -> brand blue).
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071E3D"/>
      <stop offset="60%" stop-color="#0A2C7F"/>
      <stop offset="130%" stop-color="#0A47E7"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.75">
      <stop offset="0%" stop-color="#1A6DF4" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1A6DF4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#1A6DF4" stroke-opacity="0.08" stroke-width="1">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="630"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 64}" x2="1200" y2="${i * 64}"/>`).join('')}
  </g>
  <rect x="0" y="0" width="1200" height="6" fill="#0A47E7"/>
  <image href="data:image/png;base64,${b64}" x="${x}" y="${y}" width="${w}" height="${h}"/>
</svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(BRAND_DIR, 'opengraph-image.png'));
  console.log(`- public/brand/opengraph-image.png: 1200x630`);
}

console.log('Brand prep:');
await process('logo-mark.png', { mode: 'unmix' });
await process('logo-horizontal.png', { mode: 'unmix', darkVariant: true });
await process('logo-3d.png', { mode: 'flood', cropText: true });
await makeIcon();
await makeOgImage();
console.log('Done.');
