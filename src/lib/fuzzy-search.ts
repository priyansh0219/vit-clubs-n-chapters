/**
 * Fuzzy search utilities for finding closest matches
 */

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculate fuzzy match score for a string against a query
 * Returns a score between 0 and 1, where 1 is a perfect match
 */
function fuzzyScore(text: string, query: string): number {
  if (!query.trim()) return 1; // Empty query matches everything

  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match gets highest score
  if (textLower === queryLower) return 1;

  // Split text into words for better matching
  const textWords = textLower.split(/\s+/).filter((word) => word.length > 0);
  const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 0);

  let maxScore = 0;

  // Check each query word against text words
  for (const queryWord of queryWords) {
    let bestWordScore = 0;

    for (const textWord of textWords) {
      let score = 0;

      // Exact word match
      if (textWord === queryWord) {
        score = 1;
      }
      // Starts with
      else if (textWord.startsWith(queryWord)) {
        score = 0.9;
      }
      // Contains
      else if (textWord.includes(queryWord)) {
        score = 0.8;
      }
      // Acronym match (e.g., "ACM" matches "Association for Computing Machinery")
      else if (
        queryWord.length <= 5 &&
        textWord.startsWith(queryWord.charAt(0))
      ) {
        score = 0.7;
      }
      // Levenshtein distance based scoring
      else {
        const distance = levenshteinDistance(textWord, queryWord);
        const maxLength = Math.max(textWord.length, queryWord.length);
        if (maxLength > 0) {
          const similarity = 1 - distance / maxLength;
          if (similarity > 0.5) {
            score = similarity * 0.6;
          }
        }
      }

      bestWordScore = Math.max(bestWordScore, score);
    }

    // Also check if query word is contained in the full text
    if (textLower.includes(queryWord)) {
      bestWordScore = Math.max(bestWordScore, 0.7);
    }

    maxScore = Math.max(maxScore, bestWordScore);
  }

  // Check for subsequence match across the entire text
  let queryIndex = 0;
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }

  if (queryIndex === queryLower.length) {
    // All query characters found in order
    const subsequenceScore = 0.5 * (queryLower.length / textLower.length);
    maxScore = Math.max(maxScore, subsequenceScore);
  }

  return maxScore;
}

/**
 * Search items with fuzzy matching and return sorted results
 */
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
  threshold = 0.1
): T[] {
  if (!query.trim()) {
    return items;
  }

  const scoredItems = items
    .map((item) => ({
      item,
      score: fuzzyScore(getSearchText(item), query),
    }))
    .filter(({ score }) => score > threshold)
    .sort((a, b) => b.score - a.score);

  return scoredItems.map(({ item }) => item);
}

/**
 * Check if an item matches the search query with fuzzy matching
 */
export function fuzzyMatch(
  text: string,
  query: string,
  threshold = 0.1
): boolean {
  return fuzzyScore(text, query) > threshold;
}
