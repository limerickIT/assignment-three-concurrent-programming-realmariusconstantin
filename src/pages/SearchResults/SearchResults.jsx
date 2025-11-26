import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductImage from '../../components/ProductImage/ProductImage';
import { useCart } from '../../hooks/useCart';
import { searchProducts, getSimilarProducts } from '../../utils/fuseSearch';
import './SearchResults.css';

// Price range options
const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

// Sort options
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctedQuery, setCorrectedQuery] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all products once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories()
        ]);
        setAllProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  // Search when query or allProducts change
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setProducts([]);
        setSuggestedProducts([]);
        setCorrectedQuery(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Use Fuse.js fuzzy search
        const searchResult = searchProducts(allProducts, query, { threshold: 0.5 });
        
        setProducts(searchResult.results);
        setCorrectedQuery(searchResult.correctedQuery);
        
        // Always show similar products if results are few
        if (searchResult.results.length < 4) {
          const similar = getSimilarProducts(allProducts, query, 8);
          // Filter out products already in results
          const filteredSimilar = similar.filter(
            s => !searchResult.results.some(r => r.productId === s.productId)
          );
          setSuggestedProducts(filteredSimilar);
        } else {
          setSuggestedProducts([]);
        }
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to search products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (allProducts.length > 0) {
      performSearch();
    }
    
    // Reset filters when search query changes
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSortBy('relevance');
  }, [query, allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== null) {
      result = result.filter(p => p.categoryId === selectedCategory);
    }
    
    // Apply price filter
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'name-desc':
        result.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        // relevance - keep original order (already sorted by match quality)
        break;
    }
    
    return result;
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  // Get unique categories from search results
  const resultCategories = useMemo(() => {
    const categoryIds = [...new Set(products.map(p => p.categoryId))];
    return categories.filter(cat => categoryIds.includes(cat.categoryId));
  }, [products, categories]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSortBy('relevance');
  };

  const handleAddToCart = (product) => {
    addToCart(product.productId, 1);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={i <= rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>
      );
    }
    return stars;
  };

  const hasActiveFilters = selectedCategory !== null || selectedPriceRange !== null || sortBy !== 'relevance';

  if (!query.trim()) {
    return (
      <div className="search-results-page">
        <div className="empty-search">
          <span className="search-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <h2>Start Your Search</h2>
          <p>Enter a search term to find products.</p>
          <Link to="/" className="btn btn-primary">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="error-container">
          <span className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          <h2>Search Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      {/* Search Header */}
      <div className="search-header">
        <h1>
          Search Results for <span className="search-query">"{query}"</span>
        </h1>
        <p className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <button className="mobile-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Filters
        {hasActiveFilters && <span className="filter-badge"></span>}
      </button>

      {products.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </span>
          <h2>No Exact Results Found</h2>
          <p>We couldn't find exact matches for "{query}".</p>
          
          {/* Spelling Correction Suggestion */}
          {correctedQuery && (
            <div className="spelling-suggestion">
              <span>Did you mean: </span>
              <Link to={`/search?q=${encodeURIComponent(correctedQuery)}`} className="corrected-link">
                {correctedQuery}
              </Link>
              <span>?</span>
            </div>
          )}
          
          <div className="suggestions">
            <h3>Search Tips:</h3>
            <ul>
              <li>Check your spelling or try similar words</li>
              <li>Use broader terms like "shirt" instead of "blue shirt"</li>
              <li>Browse our categories below</li>
            </ul>
          </div>
          
          {/* Always show Suggested Products */}
          {suggestedProducts.length > 0 && (
            <div className="suggested-products">
              <h3>You Might Like</h3>
              <div className="suggested-products-grid">
                {suggestedProducts.map(product => (
                  <Link 
                    key={product.productId} 
                    to={`/product/${product.productId}`} 
                    className="suggested-product-card"
                  >
                    <ProductImage
                      productId={product.productId}
                      featureImage={product.featureImage}
                      alt={product.productName}
                      className="suggested-product-image"
                      size="thumb"
                    />
                    <div className="suggested-product-info">
                      <h4>{product.productName}</h4>
                      <span className="suggested-product-price">${product.price?.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <Link to="/products" className="btn btn-primary">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="search-content">
          {/* Filter Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
            </div>

            {/* Categories from Results */}
            {resultCategories.length > 0 && (
              <div className="filter-section">
                <h4>Category</h4>
                <ul className="filter-list">
                  {resultCategories.map(cat => (
                    <li key={cat.categoryId}>
                      <label className="filter-checkbox">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.categoryId}
                          onChange={() => setSelectedCategory(
                            selectedCategory === cat.categoryId ? null : cat.categoryId
                          )}
                        />
                        <span className="checkmark"></span>
                        {cat.categoryName}
                        <span className="count">
                          ({products.filter(p => p.categoryId === cat.categoryId).length})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Range */}
            <div className="filter-section">
              <h4>Price</h4>
              <ul className="filter-list">
                {PRICE_RANGES.map((range, idx) => (
                  <li key={idx}>
                    <label className="filter-checkbox">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === idx}
                        onChange={() => setSelectedPriceRange(
                          selectedPriceRange === idx ? null : idx
                        )}
                      />
                      <span className="checkmark"></span>
                      {range.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Results Section */}
          <main className="results-main">
            {/* Sort Bar */}
            <div className="sort-bar">
              <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Results List */}
            {filteredProducts.length === 0 ? (
              <div className="no-filtered-results">
                <span className="icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <h3>No products match your filters</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button className="btn btn-outline" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="results-list">
                {filteredProducts.map(product => (
                  <article key={product.productId} className="product-card-horizontal">
                    <Link to={`/product/${product.productId}`} className="product-image-link">
                      <ProductImage
                        productId={product.productId}
                        featureImage={product.featureImage}
                        alt={product.productName}
                        className="product-image"
                        size="large"
                      />
                    </Link>
                    
                    <div className="product-info">
                      <Link to={`/product/${product.productId}`} className="product-name">
                        {product.productName}
                      </Link>
                      
                      <div className="product-rating">
                        {renderStars(4)}
                        <span className="rating-count">(128)</span>
                      </div>
                      
                      <p className="product-description">
                        {product.description?.length > 200 
                          ? product.description.substring(0, 200) + '...' 
                          : product.description}
                      </p>
                      
                      <div className="product-price">
                        <span className="current-price">${product.price?.toFixed(2)}</span>
                      </div>
                      
                      <div className="product-actions">
                        <button 
                          className="btn btn-primary add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                        <Link to={`/product/${product.productId}`} className="btn btn-outline view-details-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
