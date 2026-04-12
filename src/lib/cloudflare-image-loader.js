"use client";

/**
 * Custom image loader for Cloudflare CDN.
 *
 * When NEXT_PUBLIC_CDN_URL is set, images served via next/image are loaded
 * from the CDN origin. In development the path is returned unchanged.
 *
 * @see https://developers.cloudflare.com/images/transform-images
 */
export default function cloudflareLoader({ src, width, quality }) {
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL;

  // During development or when no CDN is configured, serve locally
  if (!cdnBase) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  const base = cdnBase.replace(/\/+$/, "");
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return `${base}/cdn-cgi/image/${params.join(",")}${src}`;
}
