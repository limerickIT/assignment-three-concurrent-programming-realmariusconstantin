import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../useAuth";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  const getProductImageUrl = (productId, imageName, type = 'large') => {
    if (!imageName || imageName === 'no-image.png') {
      return type === 'thumb' 
        ? 'https://via.placeholder.com/80x80?text=No+Image' 
        : 'https://via.placeholder.com/400x400?text=No+Image';
    }
    
    // Determine folder based on product ID range
    let folder;
    if (productId >= 1 && productId <= 10) {
      folder = '1-10_LARGE';
    } else if (productId >= 11 && productId <= 30) {
      folder = '11-30_LARGE';
    } else if (productId >= 31 && productId <= 58) {
      folder = '31-58_LARGE';
    } else {
      return 'https://via.placeholder.com/400x400?text=No+Image';
    }
    
    // Use large folder for all images (thumbs folder doesn't have actual images)
    return `http://localhost:8080/product-images/${folder}/${productId}/${imageName}`;
  };

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

  if (loading) return <div className="product-details"><p>Loading...</p></div>;
  if (error) return <div className="product-details"><p className="error">{error}</p></div>;
  if (!product) return <div className="product-details"><p>Product not found</p></div>;

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!user) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(parseInt(id), 1);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={getProductImageUrl(parseInt(id), selectedImage, 'large')} 
              alt={product.productName}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
              }}
            />
          </div>
          
          <div className="thumbnail-gallery">
            <div 
              className="thumbnail"
              onClick={() => setSelectedImage(product.featureImage)}
            >
              <img 
                src={getProductImageUrl(parseInt(id), product.featureImage, 'thumb')} 
                alt="Product thumbnail"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="product-info">
          <h1>{product.productName}</h1>
          
          <p className="description">{product.description}</p>
          
          <div className="product-meta">
            <p><strong>Price:</strong> <span className="price">${product.price}</span></p>
            {product.discountedPrice && (
              <p><strong>Discounted Price:</strong> <span className="discounted">${product.discountedPrice}</span></p>
            )}
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Colour:</strong> {product.colour}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p><strong>Sustainability Rating:</strong> {product.sustainabilityRating}/5</p>
            <p><strong>Release Date:</strong> {product.releaseDate}</p>
          </div>
          
          <div className="product-actions">
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button className="btn-add-to-wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
