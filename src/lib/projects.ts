import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getAllProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

/**
 * Brief Section 5: "Enforce — exactly one project may be featured: true at a
 * time. Throw a build error otherwise." This helper is called from the
 * homepage, so the error surfaces at build.
 */
export async function getFeaturedProject(): Promise<Project> {
  const featured = (await getCollection('projects')).filter((p) => p.data.featured);
  if (featured.length !== 1) {
    const names = featured.map((p) => p.id).join(', ') || '(none)';
    throw new Error(
      `Content error: expected exactly one project with featured: true, found ${featured.length} — ${names}`,
    );
  }
  return featured[0];
}

const filmDisciplines = new Set(['directed', 'dp', 'edited']);

export function disciplineLabel(d: Project['data']['disciplines'][number]): string {
  const map: Record<string, string> = {
    directed: 'Directed',
    dp: 'DP',
    edited: 'Edited',
    portrait: 'Portraits',
    'product-photo': 'Product photography',
    editorial: 'Editorial',
    'architecture-photo': 'Architecture photography',
    code: 'Code',
  };
  return map[d] ?? d;
}

export function primaryDisciplineLabel(p: Project['data']['primaryDiscipline']): string {
  return p === 'film' ? 'FILM' : p === 'photo' ? 'PHOTO' : 'CODE';
}

export function isFilmDiscipline(d: Project['data']['disciplines'][number]): boolean {
  return filmDisciplines.has(d);
}
