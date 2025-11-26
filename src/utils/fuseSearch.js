/**
 * Advanced Fuzzy Search Utility using Fuse.js
 * Provides intelligent search with typo tolerance and ranking
 */

import Fuse from 'fuse.js';

// Default search configuration
const DEFAULT_FUSE_OPTIONS = {
  // Include score in results for ranking
  includeScore: true,
  // Include matches for highlighting
  includeMatches: true,
  // Minimum characters before search starts
  minMatchCharLength: 2,
  // Lower threshold = more strict matching (0.0 = exact, 1.0 = match everything)
  threshold: 0.4,
  // Gives more weight to matches at the beginning
  location: 0,
  // Maximum distance from location for fuzzy match
  distance: 100,
  // Use extended search operators
  useExtendedSearch: false,
  // Ignore case
  ignoreLocation: false,
  // Field-specific weights
  ignoreFieldNorm: false,
  // Keys to search (with weights)
  keys: [
    { name: 'productName', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'categoryName', weight: 0.15 },
    { name: 'tags', weight: 0.1 },
    { name: 'manufacturer', weight: 0.08 },
    { name: 'colour', weight: 0.05 },
    { name: 'material', weight: 0.02 }
  ]
};

// Common misspelling corrections
const COMMON_CORRECTIONS = {
  // Shirts
  'shalrt': 'shirt',
  'shurt': 'shirt',
  'shurts': 'shirt',
  'shirtz': 'shirt',
  'schirt': 'shirt',
  'shrit': 'shirt',
  'shirst': 'shirt',
  // Pants
  'pnats': 'pants',
  'patns': 'pants',
  'pents': 'pants',
  'pantz': 'pants',
  // Dress
  'dres': 'dress',
  'dresse': 'dress',
  'drss': 'dress',
  // Jacket
  'jackt': 'jacket',
  'jaket': 'jacket',
  'jakcet': 'jacket',
  // Shoes
  'sheos': 'shoes',
  'shoez': 'shoes',
  'shose': 'shoes',
  // Jeans
  'jeens': 'jeans',
  'jenas': 'jeans',
  'jeanz': 'jeans',
  // Sneakers
  'sneekers': 'sneakers',
  'snakers': 'sneakers',
  'sneeker': 'sneaker',
  // T-shirt
  'tshirt': 't-shirt',
  'teeshirt': 't-shirt',
  'tee shirt': 't-shirt',
  // Accessories
  'accesories': 'accessories',
  'acessories': 'accessories',
  'accessoris': 'accessories',
  // Common clothing terms
  'cloths': 'clothes',
  'clothig': 'clothing',
  'cloting': 'clothing',
  'sweter': 'sweater',
  'sweater': 'sweater',
  'hoddie': 'hoodie',
  'hoody': 'hoodie',
  'blaser': 'blazer',
  'trousrs': 'trousers',
  'trosers': 'trousers',
};

/**
 * Correct common misspellings in search query
 * @param {string} query - The search query
 * @returns {string} - Corrected query
 */
export function correctSpelling(query) {
  if (!query) return query;
  
  const words = query.toLowerCase().split(/\s+/);
  const correctedWords = words.map(word => {
    // Check for exact correction match
    if (COMMON_CORRECTIONS[word]) {
      return COMMON_CORRECTIONS[word];
    }
    // Check for similar corrections (within 2 edit distance)
    for (const [misspelling, correction] of Object.entries(COMMON_CORRECTIONS)) {
      if (levenshteinDistance(word, misspelling) <= 1) {
        return correction;
      }
    }
    return word;
  });
  
  return correctedWords.join(' ');
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * Create a Fuse instance for searching products
 * @param {Array} products - Array of products to search
 * @param {Object} options - Custom Fuse options
 * @returns {Fuse} - Fuse instance
 */
export function createProductSearcher(products, options = {}) {
  const fuseOptions = { ...DEFAULT_FUSE_OPTIONS, ...options };
  return new Fuse(products, fuseOptions);
}

/**
 * Perform fuzzy search on products
 * @param {Array} products - Array of products
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Object} - Search results with products and metadata
 */
export function searchProducts(products, query, options = {}) {
  if (!query || !query.trim()) {
    return {
      results: products,
      query: query,
      correctedQuery: null,
      totalResults: products.length,
      hasResults: true
    };
  }

  if (!products || products.length === 0) {
    return {
      results: [],
      query: query,
      correctedQuery: null,
      totalResults: 0,
      hasResults: false
    };
  }

  const trimmedQuery = query.trim().toLowerCase();
  
  // Try to correct spelling first
  const correctedQuery = correctSpelling(trimmedQuery);
  const queryToUse = correctedQuery !== trimmedQuery ? correctedQuery : trimmedQuery;
  
  // Prepare products with additional searchable fields
  const preparedProducts = products.map(product => ({
    ...product,
    categoryName: product.categoryId?.categoryName || product.categoryName || '',
    tags: product.tags || `${product.manufacturer || ''} ${product.colour || ''} ${product.material || ''}`
  }));

  // Create Fuse instance
  const fuseOptions = {
    ...DEFAULT_FUSE_OPTIONS,
    threshold: options.threshold ?? 0.4,
    ...options
  };
  
  const fuse = new Fuse(preparedProducts, fuseOptions);
  
  // Perform search
  let fuseResults = fuse.search(queryToUse);
  
  // If no results with corrected query, try original
  if (fuseResults.length === 0 && correctedQuery !== trimmedQuery) {
    fuseResults = fuse.search(trimmedQuery);
  }
  
  // If still no results, try with higher threshold (more lenient)
  if (fuseResults.length === 0) {
    const lenientFuse = new Fuse(preparedProducts, {
      ...fuseOptions,
      threshold: 0.6,
      ignoreLocation: true
    });
    fuseResults = lenientFuse.search(queryToUse);
  }
  
  // Extract products from results, sorted by score (best match first)
  const results = fuseResults.map(result => ({
    ...result.item,
    _score: result.score,
    _matches: result.matches
  }));

  return {
    results,
    query: trimmedQuery,
    correctedQuery: correctedQuery !== trimmedQuery ? correctedQuery : null,
    totalResults: results.length,
    hasResults: results.length > 0
  };
}

/**
 * Get search suggestions based on partial query
 * @param {Array} products - Array of products
 * @param {string} query - Partial search query
 * @param {number} limit - Maximum suggestions
 * @returns {Array} - Array of suggestions
 */
export function getSearchSuggestions(products, query, limit = 6) {
  if (!query || query.length < 2) return [];
  
  const { results } = searchProducts(products, query, {
    threshold: 0.5,
    limit: limit
  });
  
  return results.slice(0, limit);
}

/**
 * Get similar/fallback products when no exact matches found
 * @param {Array} products - All products
 * @param {string} query - Original query
 * @param {number} limit - Number of suggestions
 * @returns {Array} - Similar products
 */
export function getSimilarProducts(products, query, limit = 8) {
  if (!products || products.length === 0) return [];
  
  // If no query, return random products
  if (!query || !query.trim()) {
    return shuffleArray([...products]).slice(0, limit);
  }
  
  // Try to find related products with very lenient matching
  const { results } = searchProducts(products, query, {
    threshold: 0.8,
    ignoreLocation: true
  });
  
  if (results.length > 0) {
    return results.slice(0, limit);
  }
  
  // Get products from same category if query mentions a category
  const categoryKeywords = ['men', 'women', 'shirt', 'pants', 'dress', 'shoe', 'jacket', 'accessory'];
  const queryLower = query.toLowerCase();
  
  const matchedCategory = categoryKeywords.find(keyword => 
    queryLower.includes(keyword) || levenshteinDistance(queryLower, keyword) <= 2
  );
  
  if (matchedCategory) {
    const categoryProducts = products.filter(p => 
      (p.categoryId?.categoryName || '').toLowerCase().includes(matchedCategory) ||
      (p.productName || '').toLowerCase().includes(matchedCategory)
    );
    
    if (categoryProducts.length > 0) {
      return shuffleArray(categoryProducts).slice(0, limit);
    }
  }
  
  // Return random products as fallback
  return shuffleArray([...products]).slice(0, limit);
}

/**
 * Shuffle array randomly
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Highlight matching parts of text
 * @param {string} text - Text to highlight
 * @param {Array} matches - Fuse.js match indices
 * @returns {Array} - Array of {text, highlight} objects
 */
export function highlightMatches(text, matches) {
  if (!text) return [{ text: '', highlight: false }];
  if (!matches || matches.length === 0) return [{ text, highlight: false }];
  
  const result = [];
  let lastIndex = 0;
  
  // Flatten all indices from matches
  const indices = [];
  matches.forEach(match => {
    if (match.indices) {
      match.indices.forEach(([start, end]) => {
        indices.push({ start, end: end + 1 });
      });
    }
  });
  
  // Sort and merge overlapping indices
  indices.sort((a, b) => a.start - b.start);
  const mergedIndices = [];
  indices.forEach(idx => {
    if (mergedIndices.length === 0 || idx.start > mergedIndices[mergedIndices.length - 1].end) {
      mergedIndices.push(idx);
    } else {
      mergedIndices[mergedIndices.length - 1].end = Math.max(
        mergedIndices[mergedIndices.length - 1].end,
        idx.end
      );
    }
  });
  
  // Build result
  mergedIndices.forEach(({ start, end }) => {
    if (start > lastIndex) {
      result.push({ text: text.slice(lastIndex, start), highlight: false });
    }
    result.push({ text: text.slice(start, end), highlight: true });
    lastIndex = end;
  });
  
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }
  
  return result.length > 0 ? result : [{ text, highlight: false }];
}

/**
 * Simple highlight for exact substring matches
 * @param {string} text - Text to search in
 * @param {string} query - Query to highlight
 * @returns {Array} - Array of {text, highlight} objects
 */
export function highlightText(text, query) {
  if (!text || !query) return [{ text: text || '', highlight: false }];
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const result = [];
  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery);
  
  while (index !== -1) {
    if (index > lastIndex) {
      result.push({ text: text.slice(lastIndex, index), highlight: false });
    }
    result.push({ text: text.slice(index, index + query.length), highlight: true });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }
  
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }
  
  return result.length > 0 ? result : [{ text, highlight: false }];
}

export default {
  searchProducts,
  getSearchSuggestions,
  getSimilarProducts,
  highlightMatches,
  highlightText,
  correctSpelling,
  createProductSearcher
};
