import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["images.tkbcdn.com", "salt.tkbcdn.com"], // Add all external domains here
  },
};

export default nextConfig;
