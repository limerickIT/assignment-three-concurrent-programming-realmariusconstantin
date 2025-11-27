import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { searchProducts, highlightText } from '../utils/fuseSearch';
import ProductImage from './ProductImage/ProductImage';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [correctedQuery, setCorrectedQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all products once for client-side search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get('/products');
        setAllProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setCorrectedQuery(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      
      // Use Fuse.js for fuzzy search
      const { results, correctedQuery: corrected } = searchProducts(
        allProducts,
        query,
        { threshold: 0.4 }
      );
      
      setSuggestions(results.slice(0, 6));
      setCorrectedQuery(corrected);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSuggestions([]);
      setShow(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setSuggestions([]);
    setShow(false);
  };

  const handleSearchCorrected = () => {
    if (correctedQuery) {
      navigate(`/search?q=${encodeURIComponent(correctedQuery)}`);
      setQuery('');
      setSuggestions([]);
      setShow(false);
    }
  };

  const renderHighlightedName = (name) => {
    const parts = highlightText(name, query);
    return parts.map((part, i) => (
      part.highlight ? 
        <mark key={i} className="highlight">{part.text}</mark> : 
        <span key={i}>{part.text}</span>
    ));
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search products... (e.g., shirt, dress, jeans)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShow(true)}
          autoComplete="off"
        />
        {query && (
          <button 
            type="button" 
            className="search-clear"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        <button type="submit" className="search-submit" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {show && query.trim() && (
        <div className="suggestions-dropdown" ref={dropdownRef}>
          {/* Spelling correction suggestion */}
          {correctedQuery && (
            <div className="spelling-correction" onClick={handleSearchCorrected}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <span>
                Did you mean: <strong>{correctedQuery}</strong>?
              </span>
            </div>
          )}

          {loading ? (
            <div className="suggestion-item loading">
              <div className="suggestion-spinner"></div>
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              {suggestions.map((product) => (
                <div 
                  key={product.productId} 
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(product.productId)}
                >
                  <div className="suggestion-image">
                    <ProductImage
                      productId={product.productId}
                      featureImage={product.featureImage}
                      alt={product.productName}
                      size="thumb"
                    />
                  </div>
                  <div className="suggestion-info">
                    <h4>{renderHighlightedName(product.productName)}</h4>
                    <div className="suggestion-meta">
                      {product.categoryId && typeof product.categoryId === 'object' && product.categoryId.categoryName && (
                        <span className="suggestion-category">
                          {product.categoryId.categoryName}
                        </span>
                      )}
                      <span className="suggestion-price">
                        ${parseFloat(product.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {product._score !== undefined && product._score < 0.2 && (
                    <span className="exact-match-badge">Best Match</span>
                  )}
                </div>
              ))}
              <div className="suggestion-footer" onClick={handleSubmit}>
                <span>See all results for "{query}"</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </>
          ) : (
            <div className="suggestion-item no-results">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
                <line x1="8" y1="8" x2="14" y2="14"></line>
              </svg>
              <div className="no-results-text">
                <span>No products found for "{query}"</span>
                <small>Try checking your spelling or using different keywords</small>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
