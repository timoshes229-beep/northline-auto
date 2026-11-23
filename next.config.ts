import type { NextConfig } from "next";

/**
 * PAGES=1 — статическая сборка для GitHub Pages (scripts/build-pages.sh):
 * сайт отдаётся по адресу /northline-auto/, без сервера и оптимизатора изображений.
 * Без PAGES — обычный Next.js (dev, Vercel, свой сервер) с API заявок.
 */
const isPages = process.env.PAGES === "1";
const basePath = isPages ? "/northline-auto" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Отдельная папка сборки, чтобы production-build не мешал запущенному dev-серверу
  distDir: process.env.NEXT_DIST_DIR || ".next",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC: isPages ? "1" : "",
  },
  ...(isPages
    ? { output: "export" as const, basePath, trailingSlash: true, images: { unoptimized: true } }
    : { images: { formats: ["image/avif" as const, "image/webp" as const] } }),
};

export default nextConfig;
