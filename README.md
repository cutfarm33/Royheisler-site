# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🧠 Editor feature

The project now includes an `/editor` page that lets users upload or paste a draft, then uses Claude to rewrite it and export a polished PDF.

To enable it locally, set `CLAUDE_API_KEY` in your environment before running the project.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

1. Connect this repository to Vercel.
2. Add `CLAUDE_API_KEY` to Vercel Environment Variables.
3. Deploy.

The built-in server route at `/api/editor` will run on Vercel and call Claude directly.

### 2. DreamHost with Node

If your DreamHost plan supports Node.js apps:

1. Build the site: `npm run build`
2. Upload your `dist/` folder to DreamHost’s web root for `royheisler.com`
3. Configure DreamHost to run `node dist/server/entry.mjs`
4. Set `CLAUDE_API_KEY` in the DreamHost environment config

### 3. DreamHost Static + Vercel Backend

1. Build the frontend: `npm run build`
2. Upload `dist/` to DreamHost
3. Deploy the Astro app to Vercel (see option 1 above)
4. Set `PUBLIC_EDITOR_API_URL=https://your-vercel-app.vercel.app/api/editor` when building for DreamHost

### 4. DreamHost Static + Supabase Backend

1. Build the frontend: `npm run build`
2. Upload `dist/` to DreamHost
3. Deploy `supabase/functions/editor/index.ts` to Supabase
4. Add `CLAUDE_API_KEY` as a Supabase secret
5. Set `PUBLIC_EDITOR_API_URL=https://<project>.functions.supabase.co/editor` when building for DreamHost

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
