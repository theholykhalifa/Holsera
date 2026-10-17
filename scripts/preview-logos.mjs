/* One-off: visual QA sheet for processed logos. Safe to delete. */
import fs from 'node:fs';
import sharp from 'sharp';

const dir = 'public/brand';
const read = (n) => fs.readFileSync(`${dir}/${n}`);

const darkLock = read('logo-horizontal-dark.png');
const lightLock = read('logo-horizontal.png');
const mark = read('logo-mark.png');
const d3 = read('logo-3d.png');

const imgs = await Promise.all(
  [darkLock, lightLock, mark, d3].map((b) => sharp(b).metadata())
);

const W = 1300;
const ROW = 220;
const canvas = await sharp({
  create: { width: W, height: ROW * 4 + 40, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
}).png().toBuffer();

async function place(buf, meta, top, left, maxH) {
  const scale = Math.min(560 / meta.width, maxH / meta.height);
  return {
    input: buf,
    left,
    top,
    resize: { width: Math.round(meta.width * scale), height: Math.round(meta.height * scale) },
  };
}

const composites = [
  // row 1 (dark): horizontal lockup, dark variant
  await place(darkLock, imgs[0], 30, 60, ROW - 60),
  // row 2 (dark): mark + 3d
  await place(mark, imgs[2], ROW + 30, 60, ROW - 60),
  await place(d3, imgs[3], ROW + 30, 700, ROW - 60),
  // row 3 (light): horizontal lockup, original
  await place(lightLock, imgs[1], ROW * 2 + 30, 60, ROW - 60),
  // row 4 (light): mark + 3d
  await place(mark, imgs[2], ROW * 3 + 30, 60, ROW - 60),
  await place(d3, imgs[3], ROW * 3 + 30, 700, ROW - 60),
];

const withBands = await sharp(canvas)
  .composite([
    { input: Buffer.from(`<svg width="${W}" height="${ROW * 2}"><rect width="${W}" height="${ROW * 2}" fill="#050E1D"/><rect y="${ROW}" width="${W}" height="${ROW}" fill="#081729"/></svg>`), top: 0, left: 0 },
    { input: Buffer.from(`<svg width="${W}" height="${ROW * 2}"><rect width="${W}" height="${ROW}" fill="#FFFFFF"/><rect y="${ROW}" width="${W}" height="${ROW}" fill="#F3F6FA"/></svg>`), top: ROW * 2, left: 0 },
    ...composites,
  ])
  .png()
  .toBuffer();

fs.writeFileSync('scripts/logo-preview.png', withBands);
console.log('wrote scripts/logo-preview.png');
