import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductImage from '../../components/ProductImage/ProductImage';
import { useCart } from '../../hooks/useCart';
import './CategoryProducts.css';

// Price range options
const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

// Rating options
const RATING_OPTIONS = [4, 3, 2, 1];

// Sort options
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function CategoryProducts() {
  const { categoryId, gender } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const fetchCategoryAndProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch all categories for sidebar
      const categoriesResponse = await productService.getCategories();
      const categoriesList = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : [];
      setAllCategories(categoriesList);
      
      // Fetch category details
      const categoryResponse = await productService.getCategoryById(categoryId);
      setCategory(categoryResponse.data);
      
      // Fetch products by category from backend
      const productsResponse = await productService.getProductsByCategory(categoryId);
      const productsList = Array.isArray(productsResponse.data) ? productsResponse.data : [];
      
      setProducts(productsList);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategoryAndProducts();
    // Reset filters when category changes
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSortBy('featured');
  }, [fetchCategoryAndProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Apply price filter
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }
    
    // Apply rating filter (mock - products don't have ratings yet)
    if (selectedRating !== null) {
      // For now, just show all products since we don't have real rating data
      // In a real app: result = result.filter(p => p.rating >= selectedRating);
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
      case 'newest':
        result.sort((a, b) => b.productId - a.productId);
        break;
      default:
        // featured - keep original order
        break;
    }
    
    return result;
  }, [products, selectedPriceRange, selectedRating, sortBy]);

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSortBy('featured');
  };

  const handleAddToCart = (product) => {
    addToCart(product.productId, 1);
  };

  // Generate star rating display with SVG icons
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

  // Filter categories by gender if applicable
  const sidebarCategories = useMemo(() => {
    if (gender) {
      return allCategories.filter(cat => 
        cat.categoryName.toLowerCase().includes(gender.toLowerCase()) ||
        cat.gender?.toLowerCase() === gender.toLowerCase()
      );
    }
    return allCategories;
  }, [allCategories, gender]);

  const hasActiveFilters = selectedPriceRange !== null || selectedRating !== null || sortBy !== 'featured';

  if (loading) {
    return (
      <div className="category-products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-products-page">
        <div className="error-container">
          <span className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchCategoryAndProducts}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-products-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        {gender && (
          <>
            <Link to={`/collection/${gender}`}>{gender.charAt(0).toUpperCase() + gender.slice(1)}'s</Link>
            <span className="separator">/</span>
          </>
        )}
        <span className="current">{category?.categoryName || 'Products'}</span>
      </nav>

      {/* Page Header */}
      <div className="category-header">
        <h1>{category?.categoryName || 'Products'}</h1>
        <p className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          {hasActiveFilters && <button className="clear-filters" onClick={clearFilters}>Clear all filters</button>}
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

      <div className="category-content">
        {/* Filter Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
          </div>

          {/* Categories */}
          {sidebarCategories.length > 0 && (
            <div className="filter-section">
              <h4>Categories</h4>
              <ul className="category-list">
                {sidebarCategories.map(cat => (
                  <li key={cat.categoryId}>
                    <Link 
                      to={gender ? `/collection/${gender}/category/${cat.categoryId}` : `/category/${cat.categoryId}`}
                      className={cat.categoryId === parseInt(categoryId) ? 'active' : ''}
                    >
                      {cat.categoryName}
                    </Link>
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
                      onChange={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                    />
                    <span className="checkmark"></span>
                    {range.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Rating */}
          <div className="filter-section">
            <h4>Customer Rating</h4>
            <ul className="filter-list">
              {RATING_OPTIONS.map(rating => (
                <li key={rating}>
                  <label className="filter-checkbox">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    />
                    <span className="checkmark"></span>
                    <span className="rating-stars">
                      {renderStars(rating)} & Up
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Section */}
        <main className="products-main">
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

          {/* Products List - Vertical Layout */}
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <span className="no-products-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse other categories.</p>
              {hasActiveFilters && (
                <button className="btn btn-outline" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="products-list">
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
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                          <span className="discount-badge">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
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
    </div>
  );
}
