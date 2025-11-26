import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-column">
              <h4>About Zelora</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press Center</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
              </ul>
            </div>

            {/* Shop */}
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/category/men">Men's Fashion</Link></li>
                <li><Link to="/category/women">Women's Fashion</Link></li>
                <li><Link to="/deals">Deals</Link></li>
                <li><Link to="/new-arrivals">New Arrivals</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="footer-column">
              <h4>Connect With Us</h4>
              <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Zelora. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
