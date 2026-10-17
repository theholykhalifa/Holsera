/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export: all images are served as-is, no image optimizer server.
    unoptimized: true,
  },
};

export default nextConfig;
