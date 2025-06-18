// next.config.js or next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
  // Other config options
};

export default nextConfig;
