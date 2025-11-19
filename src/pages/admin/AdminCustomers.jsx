import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import './AdminCustomers.css';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/customers');
      console.log('Customers response:', response.data);
      const data = response.data;
      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error('Expected array but got:', typeof data, data);
        setCustomers([]);
        setError('Invalid data format received from server');
      } else {
        setCustomers(data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      console.error('Error details:', err.response?.data);
      setError(`Failed to load customers: ${err.message}`);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete customer "${name}"?`)) {
      return;
    }

    try {
      await axiosClient.delete(`/customers/${id}`);
      setCustomers(customers.filter(customer => customer.customerId !== id));
      alert('Customer deleted successfully');
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert('Failed to delete customer');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesRole = !roleFilter || customer.role === roleFilter;
    const matchesSearch = !searchTerm || 
      customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <div className="admin-container"><p>Loading customers...</p></div>;
  if (error) return <div className="admin-container"><p className="error">{error}</p></div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Customer Management</h1>
        <div className="header-actions">
          <Link to="/admin" className="btn-back">Back to Dashboard</Link>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="roleFilter">Role:</label>
          <select 
            id="roleFilter"
            value={roleFilter} 
            onChange={handleRoleChange}
            className="filter-select"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="searchFilter">Search:</label>
          <input
            type="text"
            id="searchFilter"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or city..."
            className="filter-input"
          />
        </div>

        <div className="filter-results">
          Showing {currentCustomers.length} of {filteredCustomers.length} customers
        </div>
      </div>

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>City</th>
              <th>VIP</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentCustomers) && currentCustomers.map(customer => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.firstName} {customer.lastName}</td>
                <td>{customer.email}</td>
                <td>
                  <span className={`role-badge ${customer.role?.toLowerCase()}`}>
                    {customer.role || 'USER'}
                  </span>
                </td>
                <td>{customer.phoneNumber || 'N/A'}</td>
                <td>{customer.city || 'N/A'}</td>
                <td>
                  <span className={`vip-badge ${customer.vipStatus === 'Yes' || customer.vipStatus === 'yes' ? 'yes' : 'no'}`}>
                    {customer.vipStatus || 'No'}
                  </span>
                </td>
                <td>{formatDate(customer.dateJoined)}</td>
                <td className="actions">
                  <Link to={`/admin/customers/edit/${customer.customerId}`} className="btn-edit">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(customer.customerId, `${customer.firstName} ${customer.lastName}`)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <p className="no-customers">
          {customers.length === 0 ? 'No customers found.' : 'No customers match your filters.'}
        </p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return <span key={pageNum} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
