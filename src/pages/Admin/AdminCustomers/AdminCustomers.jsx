import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './AdminCustomers.css';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/customers');
      setCustomers(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;
    
    try {
      setDeleting(true);
      await axiosClient.delete(`/customers/${customerToDelete.customerId}`);
      setCustomers(customers.filter(c => c.customerId !== customerToDelete.customerId));
      setShowDeleteConfirm(false);
      setCustomerToDelete(null);
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert('Failed to delete customer. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setCustomerToDelete(null);
  };

  // Filter customers
  const filteredCustomers = Array.isArray(customers) ? customers.filter(customer => {
    const matchesRole = !roleFilter || customer.role === roleFilter;
    const matchesSearch = !searchTerm || 
      customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  }) : [];

  // Paginate
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="admin-customers admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-customers admin-page">
        <div className="error-container">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchCustomers}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-customers admin-page">
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
            <h1>Customers Management</h1>
            <p className="admin-subtitle">Manage your customer accounts</p>
          </div>
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
              placeholder="Search customers by name, email, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Results Info */}
        <div className="admin-info">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers</p>
        </div>

        {/* Customers Table */}
        {paginatedCustomers.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h3>No customers found</h3>
            <p>{searchTerm || roleFilter ? 'Try different filters' : 'No customers registered yet'}</p>
          </div>
        ) : (
          <table className="data-table customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(customer => (
                <tr key={customer.customerId}>
                  <td className="cell-id">{customer.customerId}</td>
                  <td className="cell-name">
                    <div className="customer-name-cell">
                      <span className="customer-avatar">
                        {customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}
                      </span>
                      {customer.firstName} {customer.lastName}
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.city || 'N/A'}</td>
                  <td>
                    <span className={`role-badge role-${customer.role?.toLowerCase()}`}>
                      {customer.role}
                    </span>
                  </td>
                  <td className="cell-actions">
                    <Link 
                      to={`/admin/edit-customer/${customer.customerId}`} 
                      className="btn-action btn-edit"
                      title="Edit customer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(customer)} 
                      className="btn-action btn-delete"
                      title="Delete customer"
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
                <h2>Delete Customer</h2>
                <button className="modal-close" onClick={handleCancelDelete}>×</button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <p>Are you sure you want to delete <strong>"{customerToDelete?.firstName} {customerToDelete?.lastName}"</strong>?</p>
                  <p className="warning-note">This action cannot be undone. All customer data will be permanently removed.</p>
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
                  {deleting ? 'Deleting...' : 'Delete Customer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
