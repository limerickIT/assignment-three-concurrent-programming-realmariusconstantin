import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Zelora
        </Link>
        
        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
          <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
          
          {user ? (
            <>
              <li className="welcome-message">Welcome, {user.firstName}!</li>
              {user.role === 'ADMIN' && (
                <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>
              )}
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
              <li><Link to="/signup" onClick={closeMenu}>Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
