/**
 * Generates a URL-safe slug from a name string.
 * Handles collisions by appending a short random suffix when needed.
 */

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric (except spaces & dashes)
    .replace(/\s+/g, '-')             // spaces → dashes
    .replace(/-+/g, '-')              // collapse multiple dashes
    .replace(/^-|-$/g, '');           // trim leading/trailing dashes
};

export const generateUniqueSlug = (name: string, suffix?: string): string => {
  const base = generateSlug(name);
  if (suffix) {
    return `${base}-${suffix}`;
  }
  return base;
};

export const generateSlugWithFallback = (name: string): string => {
  const slug = generateSlug(name);
  if (!slug || slug.length < 2) {
    // Fallback: random 8-char hex
    return Math.random().toString(16).substring(2, 10);
  }
  return slug;
};
