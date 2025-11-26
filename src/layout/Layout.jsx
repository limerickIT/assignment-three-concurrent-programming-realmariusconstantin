import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}
