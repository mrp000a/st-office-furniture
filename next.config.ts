import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-3ffd71d49f384cf89192874301ab7e7c.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-dd7943ad26864258b196b72bac8dadab.r2.dev",
      },
    ],
  },
};

export default nextConfig;
