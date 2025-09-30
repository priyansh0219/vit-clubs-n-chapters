/**
 * Utility functions for generating and handling URL slugs for clubs and chapters
 */

/**
 * Converts a club/chapter name to a URL-friendly slug
 * @param name - The club or chapter name
 * @returns A URL-friendly slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Finds a club by its slug from the club data
 * @param clubs - Array of club data
 * @param slug - The slug to search for
 * @returns The matching club or undefined
 */
export function findClubBySlug<T extends { name: string }>(
  clubs: T[],
  slug: string
): T | undefined {
  return clubs.find((club) => generateSlug(club.name) === slug);
}

/**
 * Generates all possible slugs from club data (for static generation)
 * @param clubs - Array of club data
 * @returns Array of slug objects for Next.js generateStaticParams
 */
export function generateAllSlugs<T extends { name: string }>(
  clubs: T[]
): { slug: string }[] {
  return clubs.map((club) => ({
    slug: generateSlug(club.name),
  }));
}
