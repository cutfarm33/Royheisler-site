// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  site: 'https://royheisler.com',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
