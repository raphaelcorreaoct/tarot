import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/npm/tarot-card-img@0.1.0/**",
      },
    ],
  },
};

export default nextConfig;
