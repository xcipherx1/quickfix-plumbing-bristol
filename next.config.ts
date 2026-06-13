import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  distDir: "/mnt/agents/output/app/dist",
};

export default nextConfig;
