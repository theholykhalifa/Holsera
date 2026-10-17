import fs from 'node:fs';
import path from 'node:path';
import { asset } from '@/lib/asset';
import { site } from '@/lib/site.config';
import { LogoMark } from './LogoMark';

/** Resolve a file inside public/brand/ at build time (null when absent). */
export function brandFile(name: string): string | null {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', 'brand', name))
      ? asset(`/brand/${name}`)
      : null;
  } catch {
    return null;
  }
}

/**
 * Full horizontal lockup (mark + wordmark + tagline) for hero/footer
 * showcases. Swaps between the official light and dark background
 * variants based on the active theme. Falls back to mark + typeset
 * wordmark when the PNG files are not present.
 *
 * Server-only usage (reads the filesystem at build time).
 */
export function LogoLockup({ width = 460 }: { width?: number }) {
  const light = brandFile('logo-horizontal.png');
  const dark = brandFile('logo-horizontal-dark.png') ?? light;
  const alt = `${site.name} — ${site.tagline}`;

  if (light && dark) {
    const height = Math.round((212 / 738) * width);
    return (
      <span className="lockup" style={{ maxWidth: width }}>
        <img
          src={dark}
          alt={alt}
          width={width}
          height={height}
          className="lockup__img lockup__img--on-dark"
          decoding="async"
        />
        <img
          src={light}
          alt={alt}
          width={width}
          height={height}
          className="lockup__img lockup__img--on-light"
          decoding="async"
        />
      </span>
    );
  }

  // Fallback: mark + typeset wordmark (Montserrat, per brand guidelines).
  return (
    <span className="lockup lockup--fallback">
      <LogoMark height={64} />
      <span className="lockup__stack">
        <span className="brand__name brand__name--lg">{site.name}</span>
        <span className="brand__tag">{site.tagline}</span>
      </span>
    </span>
  );
}
