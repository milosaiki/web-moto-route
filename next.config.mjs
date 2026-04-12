// @ts-check
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // Prefix _next/static JS & CSS bundles with the CDN origin in production
    assetPrefix: isDev ? undefined : process.env.NEXT_PUBLIC_CDN_URL,

    images: {
      loader: "custom",
      loaderFile: "./src/lib/cloudflare-image-loader.js",
    },
  };

  return nextConfig;
};
