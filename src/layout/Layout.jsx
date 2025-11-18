import React from 'react';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">Zelora</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/categories">Categories</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart</a>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Zelora Pet Supplies. All rights reserved.</p>
      </footer>
    </div>
  );
}
