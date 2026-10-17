/**
 * NEXT_PUBLIC_BASE_PATH is set by CI when deploying to GitHub Pages
 * (project sites live under /<repo>/, e.g. /Holsera/). Local builds
 * and dev are unaffected when it is unset.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: {
    // Static export: all images are served as-is, no image optimizer server.
    unoptimized: true,
  },
};

export default nextConfig;
