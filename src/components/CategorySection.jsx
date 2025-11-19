import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import './CategorySection.css';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/categories');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <section className="categories-section"><p>Loading...</p></section>;
  if (!Array.isArray(categories) || categories.length === 0) return <section className="categories-section"><p>No categories</p></section>;

  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div 
            key={cat.categoryId} 
            className="category-card" 
            onClick={() => navigate(`/category/${cat.categoryId}`)}
          >
            <div className="category-image">
              <img 
                src={`http://localhost:8080/product-images/category/${cat.categoryImage}`}
                alt={cat.categoryName}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(cat.categoryName);
                }}
              />
            </div>
            <h3>{cat.categoryName}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
