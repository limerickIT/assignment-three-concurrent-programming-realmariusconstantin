import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import './Collection.css';

// Import collection background images
import womensCollectionBg from '../../assets/images/womens_collection.jpg';
import mensCollectionBg from '../../assets/images/mens_collection.jpg';

// Define category IDs by gender (based on actual SQL database)
// Categories from zelora.sql:
// 1: Men's Clothing (men only)
// 2: Women's Clothing (women only)
// 3: Shoes (unisex - show for both)
// 4: Accessories (unisex - show for both)
// 5: T-Shirts (unisex - show for both)
// 6: Jeans (unisex - show for both)
// 7: Dresses (women only)
// 8: Jackets (unisex - show for both)
// 9: Sneakers (unisex - show for both)
// 10: Hats (unisex - show for both)

// Men's categories: Men's Clothing + all unisex (exclude Women's Clothing and Dresses)
const MENS_CATEGORY_IDS = [1, 3, 4, 5, 6, 8, 9, 10];
// Women's categories: Women's Clothing + Dresses + all unisex (exclude Men's Clothing)
const WOMENS_CATEGORY_IDS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

// Keywords for gender-based category filtering
const WOMEN_ONLY_KEYWORDS = ['women', 'woman', 'ladies', 'female', 'dress', 'dresses', 'heels', 'skirt', 'skirts', 'blouse', 'blouses', 'handbag', 'purse', 'swimwear', 'lingerie', 'leggings'];
const MEN_ONLY_KEYWORDS = ['men\'s clothing', 'men clothing', 'gentleman', 'suit', 'suits', 'tie', 'ties', 'trouser', 'trousers', 'blazer', 'polo', 'chinos'];

/**
 * Collection Page Component
 * 
 * Shows categories for a specific gender collection (men/women)
 * Features:
 * - Category cards/pills for drill-down navigation
 * - Links to category product pages with filters
 * - Responsive grid layout
 */
const Collection = () => {
  const { gender } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine collection type
  const isWomens = gender?.toLowerCase() === 'women';
  const collectionTitle = isWomens ? "Women's Collection" : "Men's Collection";
  const collectionSubtitle = isWomens 
    ? "Discover elegant styles curated for the modern woman"
    : "Premium menswear for every occasion";

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosClient.get('/categories');
      const allCategories = Array.isArray(response.data) ? response.data : [];
      
      // Filter categories based on gender using explicit ID ranges first
      const filteredCategories = allCategories.filter(cat => {
        const categoryId = cat.categoryId;
        const name = cat.categoryName?.toLowerCase() || '';
        const hasGender = cat.gender?.toLowerCase();
        
        // Primary filter: Use category ID ranges
        if (categoryId) {
          if (isWomens) {
            // Women's categories are IDs 30-58
            if (WOMENS_CATEGORY_IDS.includes(categoryId)) return true;
            if (MENS_CATEGORY_IDS.includes(categoryId)) return false;
          } else {
            // Men's categories are IDs 1-29
            if (MENS_CATEGORY_IDS.includes(categoryId)) return true;
            if (WOMENS_CATEGORY_IDS.includes(categoryId)) return false;
          }
        }
        
        // Secondary filter: If category has explicit gender field, use it
        if (hasGender) {
          if (isWomens) {
            return hasGender === 'women' || hasGender === 'female';
          } else {
            return hasGender === 'men' || hasGender === 'male';
          }
        }
        
        // Tertiary filter: keyword matching
        if (isWomens) {
          const hasWomenKeyword = WOMEN_ONLY_KEYWORDS.some(kw => name.includes(kw));
          const hasMenKeyword = MEN_ONLY_KEYWORDS.some(kw => name.includes(kw));
          return hasWomenKeyword || !hasMenKeyword;
        } else {
          const hasWomenKeyword = WOMEN_ONLY_KEYWORDS.some(kw => name.includes(kw));
          const hasMenKeyword = MEN_ONLY_KEYWORDS.some(kw => name.includes(kw));
          return !hasWomenKeyword || hasMenKeyword;
        }
      });

      setCategories(filteredCategories);
      
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isWomens]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Predefined category list for each gender (matching actual SQL database)
  // SQL categories: 1=Men's Clothing, 2=Women's Clothing, 3=Shoes, 4=Accessories, 
  // 5=T-Shirts, 6=Jeans, 7=Dresses, 8=Jackets, 9=Sneakers, 10=Hats
  const predefinedCategories = isWomens ? [
    { id: 2, name: "Women's Clothing", iconType: 'dress' },
    { id: 7, name: 'Dresses', iconType: 'dress' },
    { id: 5, name: 'T-Shirts', iconType: 'tshirt' },
    { id: 6, name: 'Jeans', iconType: 'jeans' },
    { id: 8, name: 'Jackets', iconType: 'jacket' },
    { id: 3, name: 'Shoes', iconType: 'heels' },
    { id: 9, name: 'Sneakers', iconType: 'sneakers' },
    { id: 4, name: 'Accessories', iconType: 'bag' },
    { id: 10, name: 'Hats', iconType: 'watch' },
  ] : [
    { id: 1, name: "Men's Clothing", iconType: 'shirt' },
    { id: 5, name: 'T-Shirts', iconType: 'tshirt' },
    { id: 6, name: 'Jeans', iconType: 'jeans' },
    { id: 8, name: 'Jackets', iconType: 'jacket' },
    { id: 3, name: 'Shoes', iconType: 'sneakers' },
    { id: 9, name: 'Sneakers', iconType: 'sneakers' },
    { id: 4, name: 'Accessories', iconType: 'watch' },
    { id: 10, name: 'Hats', iconType: 'watch' },
  ];

  return (
    <div className={`collection-page ${isWomens ? 'womens' : 'mens'}`}>
      {/* Hero Header with Background Image */}
      <section 
        className="collection-hero" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${isWomens ? womensCollectionBg : mensCollectionBg})` 
        }}
      >
        <div className="container-wide">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <div className="hero-content">
            <h1 className="collection-title">{collectionTitle}</h1>
            <p className="collection-subtitle">{collectionSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <div className="container-wide">
          <h2 className="section-title">Shop by Category</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span className="loading-text">Loading categories...</span>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="btn btn-primary" onClick={fetchCategories}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="categories-grid">
              {/* Use API categories if available, otherwise predefined */}
              {(categories.length > 0 ? categories : predefinedCategories).map((category, index) => {
                const categoryId = category.categoryId || category.id;
                const categoryName = category.categoryName || category.name;
                // Use thumbs folder images - pattern: /thumbs/{categoryId}/{categoryId}_1.png
                const thumbUrl = `http://localhost:8080/images/thumbs/${categoryId}/${categoryId}_1.png`;
                
                return (
                  <Link 
                    key={categoryId || index}
                    to={`/category/${categoryId}?gender=${gender}`}
                    className="category-card"
                    style={{ backgroundImage: `url(${thumbUrl})` }}
                  >
                    <div className="category-overlay"></div>
                    <div className="category-content">
                      <h3 className="category-name">{categoryName}</h3>
                      <span className="category-cta">
                        Shop Now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <div className="container-wide">
          <div className="quick-links">
            <Link to={`/search?q=${isWomens ? 'women' : 'men'}&sort=newest`} className="quick-link">
              <span>New Arrivals</span>
            </Link>
            <Link to={`/search?q=${isWomens ? 'women' : 'men'}&sale=true`} className="quick-link">
              <span>On Sale</span>
            </Link>
            <Link to={`/search?q=${isWomens ? 'women' : 'men'}&sort=popular`} className="quick-link">
              <span>Best Sellers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
