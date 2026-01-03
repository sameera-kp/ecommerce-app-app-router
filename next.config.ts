import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Just provide an array of allowed origins
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.1.167:3000", // your LAN IP
  ],

  output: "standalone",
};

export default nextConfig;

