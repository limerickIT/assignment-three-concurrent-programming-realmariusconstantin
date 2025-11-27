import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import ProductCard from '../../components/ProductCard/ProductCard';
import womensCollectionImg from '../../assets/images/womens_collection.jpg';
import mensCollectionImg from '../../assets/images/mens_collection.jpg';
// Feature card icons
import securePaymentIcon from '../../assets/images/featureCards/SecurePayment.svg';
import deliveryIcon from '../../assets/images/featureCards/delivery.svg';
import returnIcon from '../../assets/images/featureCards/return.svg';
import supportIcon from '../../assets/images/featureCards/support.svg';
import './Home.css';

/**
 * Home Page Component
 * 
 * Features:
 * - Large hero section with two main collection cards (Women's & Men's)
 * - Featured products section
 * - Features/benefits grid
 * - VIP Club section REMOVED as per requirements
 */
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productsRes = await axiosClient.get('/products');
      
      // Get first 8 products as featured, handle errors gracefully
      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      setFeaturedProducts(products.slice(0, 8));
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Two Large Collection Cards */}
      <section className="hero-collections">
        <div className="collections-grid">
          {/* Women's Collection Card */}
          <Link 
            to="/collection/women" 
            className="collection-card womens-card"
            style={{ '--bg-image': `url(${womensCollectionImg})` }}
          >
            <div className="collection-overlay"></div>
            <div className="collection-content">
              <span className="collection-tag">New Season</span>
              <h2 className="collection-title">Women's Collection</h2>
              <p className="collection-subtitle">
                Discover elegant styles, from casual wear to evening dresses. 
                Curated for the modern woman.
              </p>
              <span className="collection-cta">
                Explore Collection
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* Men's Collection Card */}
          <Link 
            to="/collection/men" 
            className="collection-card mens-card"
            style={{ '--bg-image': `url(${mensCollectionImg})` }}
          >
            <div className="collection-overlay"></div>
            <div className="collection-content">
              <span className="collection-tag">New Season</span>
              <h2 className="collection-title">Men's Collection</h2>
              <p className="collection-subtitle">
                Premium menswear for every occasion. From smart casual 
                to sophisticated formal wear.
              </p>
              <span className="collection-cta">
                Explore Collection
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Hand-picked selections from our latest arrivals</p>
            </div>
            <Link to="/products" className="section-link">
              View All Products
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span className="loading-text">Loading products...</span>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="btn btn-primary" onClick={fetchData}>
                Try Again
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products available at the moment.</p>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="features-section">
        <div className="container-wide">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={securePaymentIcon} alt="Secure Payment" />
              </div>
              <h4>Secure Payment</h4>
              <p>100% secure transactions with encrypted payment processing</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={deliveryIcon} alt="Fast Shipping" />
              </div>
              <h4>Fast Shipping</h4>
              <p>Free delivery on orders over $50 with express options available</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={returnIcon} alt="Easy Returns" />
              </div>
              <h4>Easy Returns</h4>
              <p>30-day hassle-free return policy for your peace of mind</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src={supportIcon} alt="24/7 Support" />
              </div>
              <h4>24/7 Support</h4>
              <p>Dedicated customer service team ready to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
