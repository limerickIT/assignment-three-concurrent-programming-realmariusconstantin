import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <h1>Zelora</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
