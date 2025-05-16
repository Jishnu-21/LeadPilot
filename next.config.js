/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure consistent CSS processing
  experimental: {
    // Prevent CSS variable optimization that can cause inconsistencies
    cssModules: true,
  },
  // Ensure consistent font loading
  optimizeFonts: true,
  // Ensure consistent image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

module.exports = nextConfig;
