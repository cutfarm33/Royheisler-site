import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getAllProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

/**
 * Order for the /work grid: projects with an explicit `order` come first, in
 * that order; everything else follows newest-first. Kept separate from
 * getAllProjects() so the homepage news feed stays strictly chronological —
 * it prints a date next to each row, so a manual order would read as wrong.
 */
/** Disciplines that have their own nav section rather than a tile on /work. */
const ownSection = new Set(['photo', 'graphics']);

export async function getProjectsForIndex(): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => !ownSection.has(p.data.primaryDiscipline))
    .sort((a, b) => {
    const ao = a.data.order;
    const bo = b.data.order;
    if (ao != null && bo != null) return ao - bo;
    if (ao != null) return -1;
    if (bo != null) return 1;
    return b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  });
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
    graphics: 'Motion graphics',
    code: 'Code',
  };
  return map[d] ?? d;
}

export function primaryDisciplineLabel(p: Project['data']['primaryDiscipline']): string {
  const map = { film: 'FILM', photo: 'PHOTO', graphics: 'GRAPHICS', code: 'CODE' } as const;
  return map[p];
}

export function isFilmDiscipline(d: Project['data']['disciplines'][number]): boolean {
  return filmDisciplines.has(d);
}
