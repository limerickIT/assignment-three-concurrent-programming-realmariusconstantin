import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import ProductImage from '../../components/ProductImage/ProductImage';
import './Wishlist.css';

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

export default function Wishlist() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlistItems, loading, error, removeFromWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  // Not logged in
  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="empty-icon">
            <HeartIcon filled={false} />
          </div>
          <h2>Sign In to View Your Wishlist</h2>
          <p>Please sign in to see your saved items and access your wishlist.</p>
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="error-container">
          <span className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p className="wishlist-count">0 items</p>
        </div>
        <div className="wishlist-empty">
          <div className="empty-icon">
            <HeartIcon filled={false} />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save items you love to your wishlist and they'll appear here.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (product) => {
    const productId = product.productId?.productId || product.productId;
    setAddingToCartId(productId);
    try {
      await addToCart(productId, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleMoveToCart = async (product) => {
    const productId = product.productId?.productId || product.productId;
    setAddingToCartId(productId);
    try {
      await addToCart(productId, 1);
      await removeFromWishlist(productId);
    } catch (err) {
      console.error('Error moving to cart:', err);
    } finally {
      setAddingToCartId(null);
    }
  };

  // Extract product data from wishlist item
  const getProductData = (item) => {
    // Handle nested structure: item.productId is the actual product object
    const product = item.productId || item;
    return {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      discountedPrice: product.discountedPrice,
      featureImage: product.featureImage,
      description: product.description,
      stockQuantity: product.stockQuantity,
      categoryName: product.categoryName
    };
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item, index) => {
          const product = getProductData(item);
          const isRemoving = removingId === product.productId;
          const isAddingToCart = addingToCartId === product.productId;
          const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0;
          const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

          return (
            <div 
              key={product.productId || index} 
              className={`wishlist-item ${isRemoving ? 'removing' : ''}`}
            >
              <div className="wishlist-item-image">
                <Link to={`/product/${product.productId}`}>
                  <ProductImage
                    productId={product.productId}
                    featureImage={product.featureImage}
                    alt={product.productName}
                    className="product-img"
                    size="large"
                  />
                </Link>
                {isOutOfStock && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
                {hasDiscount && !isOutOfStock && (
                  <span className="discount-badge">
                    {Math.round((1 - product.discountedPrice / product.price) * 100)}% OFF
                  </span>
                )}
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(product.productId)}
                  disabled={isRemoving}
                  aria-label="Remove from wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="wishlist-item-info">
                <Link to={`/product/${product.productId}`} className="product-name">
                  {product.productName}
                </Link>
                
                {product.categoryName && (
                  <span className="product-category">{product.categoryName}</span>
                )}
                
                <div className="product-price">
                  {hasDiscount ? (
                    <>
                      <span className="sale-price">${product.discountedPrice?.toFixed(2)}</span>
                      <span className="original-price">${product.price?.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="regular-price">${product.price?.toFixed(2)}</span>
                  )}
                </div>

                <div className="wishlist-item-actions">
                  <button 
                    className="btn btn-primary move-to-cart-btn"
                    onClick={() => handleMoveToCart(product)}
                    disabled={isAddingToCart || isOutOfStock}
                    title="Add to cart and remove from wishlist"
                  >
                    {isAddingToCart ? (
                      'Adding...'
                    ) : isOutOfStock ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Move to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="wishlist-footer">
        <Link to="/products" className="btn btn-outline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
