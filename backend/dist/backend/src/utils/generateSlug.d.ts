/**
 * Generates a URL-safe slug from a name string.
 * Handles collisions by appending a short random suffix when needed.
 */
export declare const generateSlug: (name: string) => string;
export declare const generateUniqueSlug: (name: string, suffix?: string) => string;
export declare const generateSlugWithFallback: (name: string) => string;
//# sourceMappingURL=generateSlug.d.ts.map