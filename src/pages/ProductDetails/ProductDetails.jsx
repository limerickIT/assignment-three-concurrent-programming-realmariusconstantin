import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productService from "../../services/productService";
import ProductImage from "../../components/ProductImage/ProductImage";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./ProductDetails.css";

// Mock reviews data - in production this would come from an API
const MOCK_REVIEWS = [
  { id: 1, author: 'Sarah M.', rating: 5, date: '2024-01-15', title: 'Absolutely love it!', content: 'The quality exceeded my expectations. Perfect fit and beautiful color. Will definitely buy again!' },
  { id: 2, author: 'James K.', rating: 4, date: '2024-01-10', title: 'Great product, minor issue', content: 'Really nice quality and fast shipping. Took off one star because the color was slightly different from the photos, but still very happy with my purchase.' },
  { id: 3, author: 'Emily R.', rating: 5, date: '2024-01-08', title: 'Best purchase this year', content: 'I\'ve been looking for something like this for months. The material is so comfortable and the design is elegant. Highly recommend!' },
  { id: 4, author: 'Michael T.', rating: 4, date: '2024-01-05', title: 'Good value for money', content: 'Nice quality for the price. Fits true to size. Would recommend to friends and family.' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  // Review form state
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', content: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProduct(response.data);
        setSelectedImage(response.data.featureImage);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(parseInt(id), quantity);
      // Show success feedback
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    setSubmittingReview(true);
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        author: user?.name || 'Anonymous',
        rating: reviewForm.rating,
        date: new Date().toISOString().split('T')[0],
        title: reviewForm.title,
        content: reviewForm.content
      };
      setReviews([newReview, ...reviews]);
      setReviewForm({ rating: 5, title: '', content: '' });
      setSubmittingReview(false);
    }, 1000);
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onChange(i) : undefined}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>
      );
    }
    return stars;
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-page">
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
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="error-container">
          <span className="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to={`/category/${product.categoryId}`}>Category</Link>
        <span className="separator">/</span>
        <span className="current">{product.productName}</span>
      </nav>

      {/* Main Product Section */}
      <div className="product-main">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <ProductImage
              productId={parseInt(id)}
              featureImage={selectedImage || product.featureImage}
              alt={product.productName}
              className="main-image"
              size="large"
            />
          </div>
          
          {/* Thumbnail strip - would show multiple images if available */}
          <div className="thumbnail-strip">
            <div 
              className={`thumbnail ${selectedImage === product.featureImage ? 'active' : ''}`}
              onClick={() => setSelectedImage(product.featureImage)}
            >
              <ProductImage
                productId={parseInt(id)}
                featureImage={product.featureImage}
                alt="Thumbnail"
                size="thumb"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.productName}</h1>
          
          {/* Rating Summary */}
          <div className="rating-summary">
            <div className="stars">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="rating-value">{averageRating.toFixed(1)}</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>

          {/* Price */}
          <div className="product-pricing">
            {product.discountedPrice && product.discountedPrice < product.price ? (
              <>
                <span className="current-price">${product.discountedPrice?.toFixed(2)}</span>
                <span className="original-price">${product.price?.toFixed(2)}</span>
                <span className="discount-badge">
                  {Math.round((1 - product.discountedPrice / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="current-price">${product.price?.toFixed(2)}</span>
            )}
          </div>

          {/* Short Description */}
          <p className="product-short-desc">
            {product.description?.substring(0, 200)}
            {product.description?.length > 200 ? '...' : ''}
          </p>

          {/* Product Attributes */}
          <div className="product-attributes">
            {product.colour && (
              <div className="attribute">
                <span className="label">Color:</span>
                <span className="value">{product.colour}</span>
              </div>
            )}
            {product.size && (
              <div className="attribute">
                <span className="label">Size:</span>
                <span className="value">{product.size}</span>
              </div>
            )}
            {product.material && (
              <div className="attribute">
                <span className="label">Material:</span>
                <span className="value">{product.material}</span>
              </div>
            )}
            {product.manufacturer && (
              <div className="attribute">
                <span className="label">Brand:</span>
                <span className="value">{product.manufacturer}</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-controls">
              <button 
                className="qty-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <button 
              className="btn btn-primary btn-large add-to-cart"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <>
                  <span className="btn-spinner"></span>
                  Adding...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="m1 1 4 4h16l-2.68 13.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5 5"></path>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <button className="btn btn-outline wishlist-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Add to Wishlist
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Product Details
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="tabs-content">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="tab-panel description-panel">
              <p>{product.description}</p>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="tab-panel details-panel">
              <table className="details-table">
                <tbody>
                  {product.colour && (
                    <tr><th>Color</th><td>{product.colour}</td></tr>
                  )}
                  {product.size && (
                    <tr><th>Size</th><td>{product.size}</td></tr>
                  )}
                  {product.material && (
                    <tr><th>Material</th><td>{product.material}</td></tr>
                  )}
                  {product.manufacturer && (
                    <tr><th>Manufacturer</th><td>{product.manufacturer}</td></tr>
                  )}
                  {product.sustainabilityRating && (
                    <tr><th>Sustainability Rating</th><td>{product.sustainabilityRating}/5</td></tr>
                  )}
                  {product.releaseDate && (
                    <tr><th>Release Date</th><td>{product.releaseDate}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="tab-panel reviews-panel">
              <div className="reviews-container">
                {/* Reviews Summary */}
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <span className="big-rating">{averageRating.toFixed(1)}</span>
                    <div className="stars-large">{renderStars(Math.round(averageRating))}</div>
                    <span className="total-reviews">{reviews.length} reviews</span>
                  </div>
                  
                  <div className="rating-breakdown">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                      <div key={rating} className="rating-bar">
                        <span className="rating-label">{rating} stars</span>
                        <div className="bar-container">
                          <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="rating-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write Review Form */}
                <div className="write-review">
                  <h3>Write a Review</h3>
                  {isAuthenticated ? (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                      <div className="form-group">
                        <label>Your Rating</label>
                        <div className="rating-input">
                          {renderStars(reviewForm.rating, true, (rating) => 
                            setReviewForm(prev => ({ ...prev, rating }))
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Review Title</label>
                        <input
                          type="text"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Sum up your review in a few words"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Your Review</label>
                        <textarea
                          value={reviewForm.content}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="What did you like or dislike about this product?"
                          rows="4"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  ) : (
                    <div className="login-prompt">
                      <p>Please <Link to="/login">log in</Link> to write a review.</p>
                    </div>
                  )}
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                  <h3>Customer Reviews</h3>
                  {reviews.map(review => (
                    <article key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.author}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <h4 className="review-title">{review.title}</h4>
                      <p className="review-content">{review.content}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
