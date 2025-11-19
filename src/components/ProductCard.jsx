import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ id, name, description, price, featureImage }) {
  // Determine folder based on product ID range
  const getImageUrl = (productId, imageName) => {
    if (!imageName || imageName === 'no-image.png') 
      return 'https://via.placeholder.com/200x200?text=No+Image';
    
    let folder;
    if (productId >= 1 && productId <= 10) {
      folder = '1-10_LARGE';
    } else if (productId >= 11 && productId <= 30) {
      folder = '11-30_LARGE';
    } else if (productId >= 31 && productId <= 58) {
      folder = '31-58_LARGE';
    } else {
      return 'https://via.placeholder.com/200x200?text=No+Image';
    }
    
    return `http://localhost:8080/product-images/${folder}/${productId}/${imageName}`;
  };

  const imageUrl = getImageUrl(id, featureImage);
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={name} onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }} />
      </div>
      <div className="product-card-content">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <Link to={`/product/${id}`} className="btn-details">
          View Details
        </Link>
      </div>
    </div>
  );
}
