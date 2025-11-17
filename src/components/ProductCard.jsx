import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ productId, productName, price }) {
  return (
    <div className="product-card">
      <h3>{productName}</h3>
      <p>Price: ${price}</p>
      <Link to={`/products/${productId}`}>View Details</Link>
    </div>
  );
}
