import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "test.local",
      },
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};
export default nextConfig;
