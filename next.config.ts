import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // NOTE: outputFileTracingRoot is now top-level in Next.js 15+
  // @ts-ignore – missing in current type definitions
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
