import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductImage from '../../components/ProductImage/ProductImage';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import './Products.css';

// Heart icon component
const HeartIcon = ({ filled }) => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill={filled ? 'currentColor' : 'none'} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

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
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
];

export default function Products() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState({});
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories()
        ]);
        
        const allProducts = Array.isArray(productsRes.data) ? productsRes.data : [];
        const allCategories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
        
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        result.sort((a, b) => (a.productName || '').localeCompare(b.productName || ''));
        break;
      case 'name-desc':
        result.sort((a, b) => (b.productName || '').localeCompare(a.productName || ''));
        break;
      case 'newest':
        result.sort((a, b) => (b.productId || 0) - (a.productId || 0));
        break;
      default:
        // featured - keep original order
        break;
    }
    
    return result;
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSortBy('featured');
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.productId, 1);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleWishlistToggle = async (productId) => {
    if (!user) {
      // Could redirect to login or show message
      return;
    }
    
    setWishlistLoading(prev => ({ ...prev, [productId]: true }));
    try {
      await toggleWishlist(productId);
    } catch (err) {
      console.error('Wishlist error:', err);
    } finally {
      setWishlistLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const r = rating || 4;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= r ? 'filled' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={i <= r ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>
      );
    }
    return stars;
  };

  const hasActiveFilters = selectedCategory !== null || selectedPriceRange !== null || sortBy !== 'featured';

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error-container">
          <span className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          <h2>Error Loading Products</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="products-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          <h1>All Products</h1>
          <p className="products-subtitle">Discover our complete collection of premium fashion</p>
        </div>
      </div>

      {/* Results Bar */}
      <div className="results-bar">
        <p className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </p>
        
        <div className="results-actions">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button className="mobile-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Filters
        {hasActiveFilters && <span className="filter-badge"></span>}
      </button>

      <div className="products-content">
        {/* Filter Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
          </div>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="filter-section">
              <h4>Category</h4>
              <ul className="filter-list">
                {categories.slice(0, 15).map(cat => (
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

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4>Price Range</h4>
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

          {hasActiveFilters && (
            <button className="btn-clear-all" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="products-main">
          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </span>
              <h2>No Products Found</h2>
              <p>Try adjusting your filters to find what you're looking for.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.productId} className="product-card">
                  <Link to={`/product/${product.productId}`} className="product-link">
                    <div className="product-image">
                      <ProductImage 
                        productId={product.productId} 
                        productName={product.productName}
                        size="large"
                      />
                      {/* Wishlist Heart Button */}
                      <button 
                        className={`wishlist-btn ${isInWishlist(product.productId) ? 'wishlisted' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleWishlistToggle(product.productId);
                        }}
                        disabled={wishlistLoading[product.productId]}
                        aria-label={isInWishlist(product.productId) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <HeartIcon filled={isInWishlist(product.productId)} />
                      </button>
                    </div>
                  </Link>
                  <div className="product-info">
                    <Link to={`/product/${product.productId}`}>
                      <h3 className="product-name">{product.productName}</h3>
                    </Link>
                    {product.manufacturer && (
                      <p className="product-brand">{product.manufacturer}</p>
                    )}
                    <div className="product-rating">
                      {renderStars(product.rating)}
                    </div>
                    <div className="product-footer">
                      <span className="product-price">${parseFloat(product.price || 0).toFixed(2)}</span>
                      <button 
                        className="btn-add-cart"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        title="Add to Cart"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
