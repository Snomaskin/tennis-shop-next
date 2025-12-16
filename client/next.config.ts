import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'test.local',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default nextConfig;
