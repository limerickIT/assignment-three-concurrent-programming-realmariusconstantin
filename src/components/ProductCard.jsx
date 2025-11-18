import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ id, name, description, price }) {
  return (
    <div className="product-card">
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
