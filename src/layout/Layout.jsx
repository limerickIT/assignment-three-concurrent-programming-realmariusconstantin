import React from 'react';
import Navbar from '../components/Navbar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Zelora Pet Supplies. All rights reserved.</p>
      </footer>
    </div>
  );
}
