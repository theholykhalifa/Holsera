import type { MetadataRoute } from 'next';
import { allPages } from '@/lib/nav';
import { industrySolutions } from '@/lib/content';
import { site } from '@/lib/site.config';

// Required for `output: 'export'` — metadata routes are emitted as static files.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    ...allPages,
    ...industrySolutions.map((s) => ({
      href: `/solutions/${s.slug}/`,
      label: s.title,
    })),
  ];
  return pages.map((page) => ({
    url: `${site.url}${page.href}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: page.href === '/' ? 1 : 0.7,
  }));
}
