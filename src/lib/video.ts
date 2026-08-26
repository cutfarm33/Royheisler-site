export type VideoHost = 'vimeo' | 'youtube' | 'unknown';

export interface ParsedVideo {
  host: VideoHost;
  id: string | null;
  /** Vimeo privacy hash for unlisted videos (the `/{id}/{hash}` URL form). */
  hash?: string | null;
}

export function parseVideoUrl(u: string): ParsedVideo {
  try {
    const url = new URL(u);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const parts = url.pathname.split('/').filter(Boolean);
      // Forms: vimeo.com/{id}, vimeo.com/{id}/{hash} (unlisted),
      // player.vimeo.com/video/{id}[?h={hash}]. Take the last numeric segment as
      // the id, the trailing segment on an unlisted URL is the privacy hash.
      const idIndex = parts.findLastIndex((p) => /^\d+$/.test(p));
      if (idIndex === -1) return { host: 'vimeo', id: null, hash: null };
      const next = parts[idIndex + 1];
      const hash = /^[0-9a-f]+$/i.test(next ?? '')
        ? next
        : url.searchParams.get('h');
      return { host: 'vimeo', id: parts[idIndex], hash: hash ?? null };
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (url.pathname === '/watch') {
        return { host: 'youtube', id: url.searchParams.get('v') };
      }
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'v') {
        return { host: 'youtube', id: parts[1] ?? null };
      }
    }

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return { host: 'youtube', id: id ?? null };
    }
  } catch {
    // fall through
  }
  return { host: 'unknown', id: null };
}

export function buildEmbedSrc(
  parsed: ParsedVideo,
  mode: 'loop-muted' | 'interactive',
): string | null {
  if (!parsed.id) return null;
  if (parsed.host === 'vimeo') {
    // Unlisted videos only play from an embed when the privacy hash rides along.
    const h = parsed.hash ? `h=${parsed.hash}&` : '';
    if (mode === 'loop-muted') {
      return `https://player.vimeo.com/video/${parsed.id}?${h}autoplay=1&loop=1&muted=1&background=1&playsinline=1`;
    }
    return `https://player.vimeo.com/video/${parsed.id}?${h}playsinline=1&title=0&byline=0&portrait=0`;
  }
  if (parsed.host === 'youtube') {
    if (mode === 'loop-muted') {
      return `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&mute=1&loop=1&playlist=${parsed.id}&controls=0&modestbranding=1&playsinline=1&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed/${parsed.id}?playsinline=1&modestbranding=1&rel=0`;
  }
  return null;
}
