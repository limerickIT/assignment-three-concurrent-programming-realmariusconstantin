import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import "./Navbar.css";

/**
 * Navbar Component
 *
 * Premium navigation bar with:
 * - Zelora logo with leafy wreath icon
 * - Search bar (Enter key and button click supported)
 * - User greeting, Orders, Cart, Admin (if admin), Logout
 * - Responsive design with mobile menu
 */
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const cartCount = cartItems?.length || 0;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">ZELORA</span>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search for products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search products"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </form>

          {/* Navigation Actions */}
          <div
            className={`navbar-actions ${
              isMobileMenuOpen ? "mobile-open" : ""
            }`}
          >
            {user ? (
              <>
                <div className="nav-greeting">
                  Hello, <strong>{user.firstName}</strong>
                </div>

                <Link
                  to="/wishlist"
                  className="nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="wishlist-icon"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                  <span>Wishlist</span>
                </Link>

                <Link
                  to="/orders"
                  className="nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" />
                    <path d="M9 12h6M9 16h6" />
                  </svg>
                  <span>Orders</span>
                </Link>

                <Link
                  to="/cart"
                  className="nav-item nav-cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="nav-item nav-admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}

                <button onClick={handleLogout} className="nav-item nav-logout">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="nav-item nav-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="nav-signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
