import React from 'react';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section with Search */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Zelora</h1>
          <p className="subtitle">Find anything instantly.</p>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />
    </div>
  );
}
