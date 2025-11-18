import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProduct(response.data);
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

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="product-detail-container">
        <div className="product-image">
          <p>Image: {product.featureImage || 'No image'}</p>
        </div>
        
        <div className="product-info">
          <h1>{product.productName}</h1>
          
          <p className="description">{product.description}</p>
          
          <div className="product-meta">
            <p><strong>Price:</strong> ${product.price}</p>
            {product.discountedPrice && (
              <p><strong>Discounted Price:</strong> ${product.discountedPrice}</p>
            )}
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Colour:</strong> {product.colour}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            <p><strong>Sustainability Rating:</strong> {product.sustainabilityRating}/5</p>
            <p><strong>Release Date:</strong> {product.releaseDate}</p>
          </div>
          
          <div className="product-actions">
            <button className="btn-add-to-cart">Add to Cart</button>
            <button className="btn-add-to-wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
