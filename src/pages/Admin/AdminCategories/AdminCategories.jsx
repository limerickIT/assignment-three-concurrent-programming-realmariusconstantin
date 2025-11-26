import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './AdminCategories.css';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: ''
  });
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/categories');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({ categoryName: '', categoryDescription: '' });
    setFormError(null);
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (category) => {
    setModalMode('edit');
    setFormData({
      categoryName: category.categoryName || '',
      categoryDescription: category.categoryDescription || ''
    });
    setFormError(null);
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setFormError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.categoryName.trim()) {
      setFormError('Category name is required');
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      if (modalMode === 'create') {
        await axiosClient.post('/categories', {
          categoryName: formData.categoryName.trim(),
          categoryDescription: formData.categoryDescription.trim()
        });
      } else {
        await axiosClient.put(`/categories/${selectedCategory.categoryId}`, {
          categoryName: formData.categoryName.trim(),
          categoryDescription: formData.categoryDescription.trim()
        });
      }

      handleCloseModal();
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
      setFormError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setDeleting(true);
      await axiosClient.delete(`/categories/${categoryToDelete.categoryId}`);
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category. It may have associated products.');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter(category =>
    category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.categoryDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

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

  if (loading) {
    return (
      <div className="admin-categories">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-categories">
        <div className="error-container">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchCategories}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-categories">
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
            <h1>Categories Management</h1>
            <p className="admin-subtitle">Manage your product categories</p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Category
          </button>
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
              placeholder="Search categories by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="admin-info">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories</p>
        </div>

        {/* Categories Table */}
        {paginatedCategories.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <h3>No categories found</h3>
            <p>{searchTerm ? 'Try a different search term' : 'Create your first category to get started'}</p>
          </div>
        ) : (
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map(category => (
                <tr key={category.categoryId}>
                  <td className="cell-id">{category.categoryId}</td>
                  <td className="cell-name">
                    <div className="category-name-cell">
                      <span className="category-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                      </span>
                      {category.categoryName}
                    </div>
                  </td>
                  <td className="cell-description">
                    {category.categoryDescription || <span className="no-description">No description</span>}
                  </td>
                  <td className="cell-actions">
                    <button 
                      className="btn-small btn-edit" 
                      onClick={() => handleOpenEditModal(category)}
                      title="Edit category"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      className="btn-small btn-delete" 
                      onClick={() => handleDeleteClick(category)}
                      title="Delete category"
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

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{modalMode === 'create' ? 'Create Category' : 'Edit Category'}</h2>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {formError && <div className="form-error">{formError}</div>}
                  
                  <div className="form-group">
                    <label htmlFor="categoryName">Category Name *</label>
                    <input
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                      autoFocus
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="categoryDescription">Description</label>
                    <textarea
                      id="categoryDescription"
                      name="categoryDescription"
                      value={formData.categoryDescription}
                      onChange={handleInputChange}
                      placeholder="Enter category description (optional)"
                      rows="3"
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : (modalMode === 'create' ? 'Create Category' : 'Save Changes')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay" onClick={handleCancelDelete}>
            <div className="modal delete-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Delete Category</h2>
                <button className="modal-close" onClick={handleCancelDelete}>×</button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <p>Are you sure you want to delete <strong>"{categoryToDelete?.categoryName}"</strong>?</p>
                  <p className="warning-note">This action cannot be undone. Products in this category may be affected.</p>
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
                  {deleting ? 'Deleting...' : 'Delete Category'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
