import type { MetadataRoute } from 'next';
import { allPages } from '@/lib/nav';
import { site } from '@/lib/site.config';

// Required for `output: 'export'` — metadata routes are emitted as static files.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allPages.map((page) => ({
    url: `${site.url}${page.href}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: page.href === '/' ? 1 : 0.7,
  }));
}
