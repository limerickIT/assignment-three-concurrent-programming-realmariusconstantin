/**
 * Fuzzy search utility using Levenshtein distance and string similarity
 */

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - The edit distance between strings
 */
export function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  
  // Create a 2D array to store distances
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Calculate string similarity score (0 to 1)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score between 0 (completely different) and 1 (identical)
 */
export function stringSimilarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  
  return 1 - (distance / maxLength);
}

/**
 * Check if a word starts with or contains a query (for partial matches)
 * @param {string} word - The word to check
 * @param {string} query - The search query
 * @returns {number} - Score based on match type
 */
export function partialMatch(word, query) {
  const w = word.toLowerCase();
  const q = query.toLowerCase();
  
  if (w === q) return 1;
  if (w.startsWith(q)) return 0.9;
  if (w.includes(q)) return 0.7;
  
  // Check for word boundary matches
  const words = w.split(/[\s-_]+/);
  for (const part of words) {
    if (part.startsWith(q)) return 0.8;
  }
  
  return 0;
}

/**
 * Calculate fuzzy match score combining multiple strategies
 * @param {string} text - Text to search in
 * @param {string} query - Search query
 * @returns {number} - Combined match score
 */
export function fuzzyMatchScore(text, query) {
  if (!text || !query) return 0;
  
  const t = text.toLowerCase().trim();
  const q = query.toLowerCase().trim();
  
  if (t === q) return 1;
  
  // Exact substring match
  if (t.includes(q)) return 0.9;
  
  // Calculate scores using different methods
  const partialScore = partialMatch(t, q);
  const similarityScore = stringSimilarity(t, q);
  
  // Check individual words
  const textWords = t.split(/[\s-_.,]+/).filter(w => w.length > 0);
  const queryWords = q.split(/[\s-_.,]+/).filter(w => w.length > 0);
  
  let wordMatchScore = 0;
  for (const qw of queryWords) {
    let bestWordMatch = 0;
    for (const tw of textWords) {
      const similarity = stringSimilarity(tw, qw);
      const partial = partialMatch(tw, qw);
      bestWordMatch = Math.max(bestWordMatch, similarity, partial);
    }
    wordMatchScore += bestWordMatch;
  }
  wordMatchScore = queryWords.length > 0 ? wordMatchScore / queryWords.length : 0;
  
  // Combine scores with weights
  return Math.max(partialScore, similarityScore * 0.8, wordMatchScore * 0.9);
}

/**
 * Filter and sort items by fuzzy match
 * @param {Array} items - Array of items to search
 * @param {string} query - Search query
 * @param {Function|string[]} getSearchableText - Function to get searchable text from item, or array of property names
 * @param {number} threshold - Minimum score threshold (default 0.3)
 * @returns {Array} - Sorted array of matching items with scores
 */
export function fuzzySearch(items, query, getSearchableText, threshold = 0.3) {
  if (!query || !query.trim() || !items || items.length === 0) {
    return items || [];
  }
  
  const q = query.trim().toLowerCase();
  
  const scored = items.map(item => {
    let searchTexts;
    
    if (typeof getSearchableText === 'function') {
      searchTexts = [getSearchableText(item)];
    } else if (Array.isArray(getSearchableText)) {
      searchTexts = getSearchableText.map(prop => {
        const value = item[prop];
        return value ? String(value) : '';
      }).filter(t => t);
    } else {
      // Default: search all string properties
      searchTexts = Object.values(item)
        .filter(v => typeof v === 'string')
        .map(String);
    }
    
    // Get the best score across all searchable fields
    let bestScore = 0;
    for (const text of searchTexts) {
      const score = fuzzyMatchScore(text, q);
      bestScore = Math.max(bestScore, score);
    }
    
    return { item, score: bestScore };
  });
  
  // Filter by threshold and sort by score descending
  return scored
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/**
 * Highlight matching parts of text
 * @param {string} text - Text to highlight
 * @param {string} query - Search query
 * @returns {Array} - Array of { text, highlight } objects
 */
export function highlightMatches(text, query) {
  if (!text || !query) return [{ text: text || '', highlight: false }];
  
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  const result = [];
  
  let lastIndex = 0;
  let index = t.indexOf(q);
  
  while (index !== -1) {
    // Add non-matching part
    if (index > lastIndex) {
      result.push({ text: text.slice(lastIndex, index), highlight: false });
    }
    // Add matching part
    result.push({ text: text.slice(index, index + q.length), highlight: true });
    lastIndex = index + q.length;
    index = t.indexOf(q, lastIndex);
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }
  
  return result.length > 0 ? result : [{ text, highlight: false }];
}

export default {
  levenshteinDistance,
  stringSimilarity,
  partialMatch,
  fuzzyMatchScore,
  fuzzySearch,
  highlightMatches
};
