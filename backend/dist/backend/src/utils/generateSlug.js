"use strict";
/**
 * Generates a URL-safe slug from a name string.
 * Handles collisions by appending a short random suffix when needed.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlugWithFallback = exports.generateUniqueSlug = exports.generateSlug = void 0;
const generateSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric (except spaces & dashes)
        .replace(/\s+/g, '-') // spaces → dashes
        .replace(/-+/g, '-') // collapse multiple dashes
        .replace(/^-|-$/g, ''); // trim leading/trailing dashes
};
exports.generateSlug = generateSlug;
const generateUniqueSlug = (name, suffix) => {
    const base = (0, exports.generateSlug)(name);
    if (suffix) {
        return `${base}-${suffix}`;
    }
    return base;
};
exports.generateUniqueSlug = generateUniqueSlug;
const generateSlugWithFallback = (name) => {
    const slug = (0, exports.generateSlug)(name);
    if (!slug || slug.length < 2) {
        // Fallback: random 8-char hex
        return Math.random().toString(16).substring(2, 10);
    }
    return slug;
};
exports.generateSlugWithFallback = generateSlugWithFallback;
//# sourceMappingURL=generateSlug.js.map