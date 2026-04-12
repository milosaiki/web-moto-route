/**
 * Returns the CDN-prefixed URL for a public asset.
 *
 * In development (or when NEXT_PUBLIC_CDN_URL is unset) paths are returned
 * unchanged so everything keeps working locally.
 *
 * Usage:
 *   cdn("/hero-video.mp4")   → "https://cdn.motoroute.com/hero-video.mp4"
 *   cdn("/logo.png")         → "https://cdn.motoroute.com/logo.png"
 */
export function cdn(path: string): string {
  const base = process.env.NEXT_PUBLIC_CDN_URL;
  if (!base) return path;
  // Avoid double slashes if the base already ends with /
  return `${base.replace(/\/+$/, "")}${path}`;
}
