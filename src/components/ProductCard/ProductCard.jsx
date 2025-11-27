import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import ProductImage from '../ProductImage/ProductImage';
import './ProductCard.css';

// Heart icon component
const HeartIcon = ({ filled }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? 'currentColor' : 'none'} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Stock indicator component
const StockIndicator = ({ quantity }) => {
  if (quantity === undefined || quantity === null) {
    return null;
  }
  
  let status, className;
  if (quantity <= 0) {
    status = 'Out of Stock';
    className = 'stock-out';
  } else if (quantity <= 5) {
    status = `Only ${quantity} left`;
    className = 'stock-low';
  } else if (quantity <= 15) {
    status = 'Limited Stock';
    className = 'stock-limited';
  } else {
    status = 'In Stock';
    className = 'stock-available';
  }
  
  return (
    <span className={`stock-indicator ${className}`}>
      <span className="stock-dot"></span>
      {status}
    </span>
  );
};

const ProductCard = ({ product, onWishlistToggle, isInWishlist }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check stock before adding
    if (product.stockQuantity !== undefined && product.stockQuantity <= 0) {
      alert('This product is currently out of stock');
      return;
    }
    
    try {
      await addToCart(product.productId, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (onWishlistToggle && !wishlistLoading) {
      setWishlistLoading(true);
      try {
        await onWishlistToggle(product.productId);
      } catch (err) {
        console.error('Wishlist error:', err);
      } finally {
        setWishlistLoading(false);
      }
    }
  };

  // Generate star rating
  const renderStars = (rating = 4) => {
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

  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <Link to={`/product/${product.productId}`} className="product-card-link">
        <div className="product-image-wrapper">
          <ProductImage
            productId={product.productId}
            featureImage={product.featureImage}
            alt={product.productName}
            className="product-img"
            size="large"
          />
          {product.discountedPrice && product.discountedPrice < product.price && (
            <span className="product-badge sale-badge">Sale</span>
          )}
          {isOutOfStock && (
            <span className="product-badge sold-out-badge">Sold Out</span>
          )}
          
          {/* Wishlist Button */}
          {onWishlistToggle && (
            <button 
              className={`wishlist-btn ${isInWishlist ? 'wishlisted' : ''}`}
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <HeartIcon filled={isInWishlist} />
            </button>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.productName}</h3>
          
          <div className="product-rating">
            {renderStars(Math.round(product.averageRating || 4))}
          </div>

          {/* Stock Indicator */}
          <StockIndicator quantity={product.stockQuantity} />

          <div className="product-pricing">
            {product.discountedPrice && product.discountedPrice < product.price ? (
              <>
                <span className="product-price-sale">${product.discountedPrice?.toFixed(2)}</span>
                <span className="product-price-original">${product.price?.toFixed(2)}</span>
              </>
            ) : (
              <span className="product-price">${product.price?.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <button 
        className={`product-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
            Out of Stock
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4h16l-2.68 13.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5 5"></path>
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
