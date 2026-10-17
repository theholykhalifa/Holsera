/**
 * Prefixes public-folder asset paths with the deployment base path.
 *
 * GitHub Pages project sites are served from /<repo>/ (e.g.
 * /Holsera/), so `basePath` is set via NEXT_PUBLIC_BASE_PATH at CI
 * build time. `next/link` gets the prefix automatically; raw <img>
 * src attributes must go through this helper.
 * With no env set (local dev), paths stay exactly as before.
 */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
