import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './src/content/projects',
    // Each project lives in its own folder as <slug>/index.mdx; use the folder as the id.
    generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      agency: z.string().optional(),
      year: z.number(),
      publishedAt: z.date(),
      disciplines: z.array(
        z.enum([
          'directed',
          'dp',
          'edited',
          'portrait',
          'product-photo',
          'editorial',
          'architecture-photo',
          'graphics',
          'code',
        ]),
      ),
      primaryDiscipline: z.enum(['film', 'photo', 'graphics', 'code']),
      /** Filter grouping on the Video index. */
      category: z.enum(['story', 'commercial', 'motion']).optional(),
      type: z.enum(['case-study', 'standard']),
      summary: z.string().max(140),
      heroVideo: z
        .object({
          url: z.string(),
          duration: z.string().optional(),
          poster: image().optional(),
        })
        .optional(),
      heroImage: image().optional(),
      thumbnail: image(),
      credits: z.array(
        z.object({
          role: z.string(),
          name: z.string(),
          isMe: z.boolean().default(false),
        }),
      ),
      shootDetails: z
        .object({
          days: z.number().optional(),
          locations: z.number().optional(),
          city: z.string().optional(),
          format: z.string().optional(),
        })
        .optional(),
      featured: z.boolean().default(false),
      /** Manual position on /work (lower first). Unset projects follow, newest
          first. Does not affect the homepage news feed, which stays dated. */
      order: z.number().optional(),
      press: z
        .array(
          z.object({
            outlet: z.string(),
            url: z.string().url(),
          }),
        )
        .optional(),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.{md,mdx}', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      headline: z.string(),
      /** Photo of Roy, shown beside the bio. */
      portrait: image().optional(),
      reel: z.object({
        url: z.string(),
        poster: image().optional(),
        bio: z.string(),
      }),
      services: z.array(z.string()),
      clients: z.array(z.string()).default([]),
      press: z
        .array(
          z.object({
            outlet: z.string(),
            url: z.string().url(),
          }),
        )
        .default([]),
      representation: z.string().optional(),
      stills: z.array(image()).default([]),
    }),
});

export const collections = { projects, about };
