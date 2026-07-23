import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@materia/shared", "@materia/design-tokens"],
};

export default nextConfig;
