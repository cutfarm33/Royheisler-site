// One-off utility: generate solid-color JPG placeholders for Step 3 projects.
// Delete this folder once real images land.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const palettes = {
  nightshift:        { base: [10, 14, 24],  accent: [48, 66, 110] },
  'patagonia-spring':{ base: [14, 28, 22],  accent: [52, 102, 84] },
  'converse-sidecar':{ base: [28, 12, 12],  accent: [120, 46, 40] },
  'hopkins-library': { base: [28, 22, 14],  accent: [130, 104, 58] },
  mealmap:           { base: [12, 18, 28],  accent: [56, 94, 142] },
  about:             { base: [22, 20, 16],  accent: [110, 92, 60] },
};

const manifest = {
  nightshift: [
    'thumbnail', 'hero-poster',
    'mood-01', 'mood-02', 'mood-03', 'mood-04', 'mood-05', 'mood-06', 'mood-07', 'mood-08',
    'storyboard-01',
    'bts-01', 'bts-02', 'bts-03', 'bts-04', 'bts-05', 'bts-06',
  ],
  'patagonia-spring': ['thumbnail', 'hero-poster'],
  'converse-sidecar': ['thumbnail', 'hero-poster'],
  'hopkins-library': ['thumbnail', 'hero', 'gallery-01', 'gallery-02', 'gallery-03', 'gallery-04'],
  mealmap: ['thumbnail', 'hero'],
  about: ['reel-poster', 'still-01', 'still-02', 'still-03', 'still-04', 'still-05', 'still-06'],
};

const mix = (a, b, t) => Math.round(a + (b - a) * t);

for (const [slug, files] of Object.entries(manifest)) {
  const dir =
    slug === 'about'
      ? path.join('src', 'content', 'about')
      : path.join('src', 'content', 'projects', slug);
  await mkdir(dir, { recursive: true });
  const { base, accent } = palettes[slug];

  for (let i = 0; i < files.length; i++) {
    const name = files[i];
    const t = files.length === 1 ? 0 : (i / (files.length - 1)) * 0.7;
    const r = mix(base[0], accent[0], t);
    const g = mix(base[1], accent[1], t);
    const b = mix(base[2], accent[2], t);

    const buffer = await sharp({
      create: {
        width: 1200,
        height: 750,
        channels: 3,
        background: { r, g, b },
      },
    })
      .jpeg({ quality: 78 })
      .toBuffer();

    await writeFile(path.join(dir, `${name}.jpg`), buffer);
  }
  console.log(`✓ ${slug} (${files.length} images)`);
}

console.log('Done.');
