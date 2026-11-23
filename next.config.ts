import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Отдельная папка сборки, чтобы production-build не мешал запущенному dev-серверу
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
