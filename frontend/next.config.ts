import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["images.tkbcdn.com", "salt.tkbcdn.com", "res.cloudinary.com"], // Add all external domains here
  },
};

export default nextConfig;