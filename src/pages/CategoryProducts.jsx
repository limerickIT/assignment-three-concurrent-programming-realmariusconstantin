import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import './CategoryProducts.css';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategoryAndProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch category details
      const categoryResponse = await productService.getCategoryById(categoryId);
      setCategory(categoryResponse.data);
      
      // Fetch products by category from backend
      const productsResponse = await productService.getProductsByCategory(categoryId);
      const productsList = Array.isArray(productsResponse.data) ? productsResponse.data : [];
      
      setProducts(productsList);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [fetchCategoryAndProducts]);

  if (loading) return <div className="category-products"><p>Loading...</p></div>;
  if (error) return <div className="category-products"><p className="error">{error}</p></div>;

  return (
    <div className="category-products">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
      
      <h1>{category?.categoryName || 'Products'}</h1>
      
      {products.length === 0 ? (
        <p className="no-products">No products in this category</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              id={product.productId}
              name={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
