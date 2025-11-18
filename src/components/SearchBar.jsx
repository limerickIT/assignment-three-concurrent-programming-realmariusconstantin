import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axiosClient.get('/products/search', { params: { query } });
        setSuggestions((Array.isArray(res.data) ? res.data : []).slice(0, 5));
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
      />
      {show && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((p) => (
            <div key={p.productId} className="suggestion-item" onClick={() => {
              navigate(`/product/${p.productId}`);
              setQuery('');
              setSuggestions([]);
            }}>
              <div className="suggestion-info">
                <h4>{p.productName}</h4>
                <p className="suggestion-price">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
