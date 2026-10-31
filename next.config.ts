import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ['192.168.0.4', '192.168.0.4:3000', 'localhost', 'localhost:3000', 'localhost:3005'],
};

export default nextConfig;
