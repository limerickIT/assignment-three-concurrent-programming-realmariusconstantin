import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Log when products state changes
  useEffect(() => {
    console.log('Products state updated:', products);
    console.log('Products state length:', products.length);
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      console.log('Full response:', response);
      console.log('Response.data:', response.data);
      console.log('Data type:', typeof response.data);
      console.log('Is array:', Array.isArray(response.data));
      
      // Handle different response formats
      let productsData = [];
      
      if (Array.isArray(response.data)) {
        console.log('Data is already an array');
        productsData = response.data;
      } else if (response.data && response.data.content) {
        console.log('Data has .content property');
        productsData = response.data.content;
      } else if (response.data && response.data._embedded && response.data._embedded.products) {
        console.log('Data is HAL format');
        productsData = response.data._embedded.products;
      } else {
        console.log('Data structure not recognized, trying to convert');
        productsData = [];
      }
      
      console.log('Final products data:', productsData);
      console.log('Length:', productsData.length);
      console.log('First product:', productsData[0]);
      
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
      console.error('Error response:', err.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="products"><p className="loading">Loading products...</p></div>;
  if (error) return <div className="products"><p className="error">{error}</p></div>;

  return (
    <div className="products">
      <h1>Products</h1>
      {products.length === 0 ? (
        <p className="no-products">No products found</p>
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

