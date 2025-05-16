import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/webprojectmate',
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
