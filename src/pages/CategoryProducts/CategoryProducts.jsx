import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductImage from '../../components/ProductImage/ProductImage';
import { useCart } from '../../hooks/useCart';
import { useCompare } from '../../context/CompareContext';
import compareIcon from '../../assets/images/compareIcon.svg';
import './CategoryProducts.css';

const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function CategoryProducts() {
  const { categoryId, gender } = useParams();
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch categories
      const categoriesResponse = await productService.getCategories();
      const categoriesList = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : [];
      setAllCategories(categoriesList);

      // Fetch category details
      const categoryResponse = await productService.getCategoryById(categoryId);
      setCategory(categoryResponse.data);

      // Fetch products by category
      const productsResponse = await productService.getProductsByCategory(categoryId);
      const productsList = Array.isArray(productsResponse.data) ? productsResponse.data : [];
      setAllProducts(productsList);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products. Please try again.');
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSortBy('featured');
    setShowFilters(false);
  }, [fetchData]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }

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
        break;
    }

    return result;
  }, [allProducts, selectedPriceRange, sortBy]);

  const sidebarCategories = useMemo(() => {
    if (!gender) return allCategories;

    const WOMENS_CATEGORY_IDS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const MENS_CATEGORY_IDS = [1, 3, 4, 5, 6, 8, 9, 10];

    const genderLower = gender.toLowerCase();
    const allowedIds = genderLower === 'women' ? WOMENS_CATEGORY_IDS : MENS_CATEGORY_IDS;

    return allCategories.filter(cat => allowedIds.includes(cat.categoryId));
  }, [allCategories, gender]);

  const hasActiveFilters = selectedPriceRange !== null || sortBy !== 'featured';

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSortBy('featured');
  };

  const handleAddToCart = (product) => {
    addToCart(product.productId, 1);
  };

  const renderStars = (rating = 4) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchData}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Header */}
      <div className="category-header-section">
        <h1>{category?.categoryName || 'Products'}</h1>
        <p className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
        </p>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        ☰ Filters
      </button>

      {/* Main Content */}
      <div className="category-main">
        {/* Sidebar */}
        <aside className={`category-sidebar ${showFilters ? 'open' : ''}`}>
          <h3>Filters</h3>

          {/* Categories Filter */}
          {sidebarCategories.length > 0 && (
            <div className="filter-group">
              <h4>Categories</h4>
              <ul className="filter-list">
                {sidebarCategories.map(cat => (
                  <li key={cat.categoryId}>
                    <Link 
                      to={gender ? `/collection/${gender}/category/${cat.categoryId}` : `/category/${cat.categoryId}`}
                      className={cat.categoryId === parseInt(categoryId) ? 'active' : ''}
                      onClick={() => setShowFilters(false)}
                    >
                      {cat.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Price</h4>
            <ul className="filter-list">
              {PRICE_RANGES.map((range, idx) => (
                <li key={idx}>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === idx}
                      onChange={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                    />
                    <span className="checkbox-custom"></span>
                    {range.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Close button for mobile */}
          <button 
            className="close-sidebar-btn"
            onClick={() => setShowFilters(false)}
          >
            ✕ Close
          </button>
        </aside>

        {/* Products Area */}
        <div className="products-area">
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

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.productId} className="product-card">
                  <Link to={`/product/${product.productId}`} className="product-image-wrapper">
                    <ProductImage
                      productId={product.productId}
                      featureImage={product.featureImage}
                      alt={product.productName}
                      size="large"
                    />
                  </Link>

                  <div className="product-card-body">
                    <Link to={`/product/${product.productId}`} className="product-title">
                      {product.productName}
                    </Link>

                    <div className="product-rating">
                      {renderStars(Math.round(product.averageRating || 4))}
                    </div>

                    <p className="product-desc">
                      {product.description?.substring(0, 100)}...
                    </p>

                    <div className="product-price-section">
                      <span className="price">${product.price?.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="product-actions">
                      <button 
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <Link 
                        to={`/product/${product.productId}`} 
                        className="btn-details"
                      >
                        Details
                      </Link>
                      <button
                        className={`btn-compare ${isInCompare(product.productId) ? 'active' : ''}`}
                        onClick={() => {
                          if (isInCompare(product.productId)) {
                            removeFromCompare(product.productId);
                          } else {
                            addToCompare(product);
                          }
                        }}
                      >
                        <img src={compareIcon} alt="" />
                        Compare
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
