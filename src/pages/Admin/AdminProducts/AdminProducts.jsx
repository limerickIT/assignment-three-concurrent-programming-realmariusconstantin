import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './AdminProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/categories');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      setDeleting(true);
      await axiosClient.delete(`/products/${productToDelete.productId}`);
      setProducts(products.filter(p => p.productId !== productToDelete.productId));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.categoryId?.categoryId === parseInt(selectedCategory);
    const matchesSearch = !searchTerm || 
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Get display price (handle inverted prices)
  const getDisplayPrice = (product) => {
    const price = parseFloat(product.price) || 0;
    const discounted = parseFloat(product.discountedPrice) || 0;
    // If discounted is higher than price, they're inverted
    if (discounted > 0 && discounted < price) {
      return `$${discounted.toFixed(2)}`;
    }
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="admin-products admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-products admin-page">
        <div className="error-container">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchProducts}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-left">
            <Link to="/admin" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Back to Dashboard
            </Link>
            <h1>Products Management</h1>
            <p className="admin-subtitle">Manage your product catalog</p>
          </div>
          <Link to="/admin/create-product" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="filters-container">
          <div className="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <div className="admin-info">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products</p>
        </div>

        {/* Products Table */}
        {paginatedProducts.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
            </svg>
            <h3>No products found</h3>
            <p>{searchTerm || selectedCategory ? 'Try different filters' : 'Create your first product to get started'}</p>
          </div>
        ) : (
          <table className="data-table products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.productId}>
                  <td className="cell-id">{product.productId}</td>
                  <td className="cell-name">
                    <div className="product-name-cell">
                      <span className="product-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                        </svg>
                      </span>
                      {product.productName}
                    </div>
                  </td>
                  <td>{product.categoryId?.categoryName || 'N/A'}</td>
                  <td className="cell-price">{getDisplayPrice(product)}</td>
                  <td className="cell-actions">
                    <Link 
                      to={`/admin/edit-product/${product.productId}`} 
                      className="btn-action btn-edit"
                      title="Edit product"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(product)} 
                      className="btn-action btn-delete"
                      title="Delete product"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>

            {getPageNumbers().map((page, idx) => (
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              )
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay" onClick={handleCancelDelete}>
            <div className="modal delete-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Delete Product</h2>
                <button className="modal-close" onClick={handleCancelDelete}>×</button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <p>Are you sure you want to delete <strong>"{productToDelete?.productName}"</strong>?</p>
                  <p className="warning-note">This action cannot be undone.</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCancelDelete}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Product'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
