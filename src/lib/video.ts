export type VideoHost = 'vimeo' | 'youtube' | 'unknown';

export interface ParsedVideo {
  host: VideoHost;
  id: string | null;
}

export function parseVideoUrl(u: string): ParsedVideo {
  try {
    const url = new URL(u);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const parts = url.pathname.split('/').filter(Boolean);
      // vimeo.com/{id} or player.vimeo.com/video/{id}
      const id = parts[parts.length - 1] ?? null;
      return { host: 'vimeo', id: /^\d+$/.test(id ?? '') ? id : null };
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
    if (mode === 'loop-muted') {
      return `https://player.vimeo.com/video/${parsed.id}?autoplay=1&loop=1&muted=1&background=1&playsinline=1`;
    }
    return `https://player.vimeo.com/video/${parsed.id}?playsinline=1&title=0&byline=0&portrait=0`;
  }
  if (parsed.host === 'youtube') {
    if (mode === 'loop-muted') {
      return `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&mute=1&loop=1&playlist=${parsed.id}&controls=0&modestbranding=1&playsinline=1&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed/${parsed.id}?playsinline=1&modestbranding=1&rel=0`;
  }
  return null;
}
