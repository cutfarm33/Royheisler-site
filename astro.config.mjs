// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Static by default so content-collection pages keep prerendering via
  // getStaticPaths(). The API routes opt out with `export const prerender = false`.
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  site: 'https://royheisler.com',
  // The work grid moved to the homepage; keep the old URL working. Project
  // pages still live at /work/<slug>, so only the index redirects.
  redirects: {
    '/work': '/',
    // The galleries moved out of the projects collection to their own pages.
    '/work/photography': '/photography',
    '/work/graphics': '/graphics',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
