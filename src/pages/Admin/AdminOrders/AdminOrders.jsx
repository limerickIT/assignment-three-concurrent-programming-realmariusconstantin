import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './AdminOrders.css';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // Status update state
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/orders');
      setOrders(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      await axiosClient.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  // Filter orders
  const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesSearch = !searchTerm || 
      order.orderId?.toString().includes(searchTerm) ||
      order.shippingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingCity?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }) : [];

  // Sort by date descending (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.orderDate) - new Date(a.orderDate)
  );

  // Paginate
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

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

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="admin-orders admin-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders admin-page">
        <div className="error-container">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchOrders}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders admin-page">
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
            <h1>Orders Management</h1>
            <p className="admin-subtitle">View and manage customer orders</p>
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
              placeholder="Search by order ID, customer name, email, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Results Info */}
        <div className="admin-info">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders</p>
        </div>

        {/* Orders List */}
        {paginatedOrders.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <h3>No orders found</h3>
            <p>{searchTerm || statusFilter ? 'Try different filters' : 'No orders have been placed yet'}</p>
          </div>
        ) : (
          <div className="orders-list">
            {paginatedOrders.map(order => (
              <div key={order.orderId} className={`order-card ${expandedOrderId === order.orderId ? 'expanded' : ''}`}>
                <div className="order-header" onClick={() => toggleOrderExpand(order.orderId)}>
                  <div className="order-main-info">
                    <span className="order-id">#{order.orderId}</span>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-summary">
                    <span className="customer-name">{order.shippingName || 'Unknown'}</span>
                    <span className="order-date">{formatDate(order.orderDate)}</span>
                    <span className="order-total">${(order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                  <button className="expand-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points={expandedOrderId === order.orderId ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </button>
                </div>

                {expandedOrderId === order.orderId && (
                  <div className="order-details">
                    <div className="details-grid">
                      {/* Shipping Info */}
                      <div className="detail-section">
                        <h4>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          Shipping Address
                        </h4>
                        <p>{order.shippingName}</p>
                        <p>{order.shippingAddress}</p>
                        <p>{order.shippingCity}, {order.shippingZip}</p>
                        <p>{order.phone}</p>
                        <p>{order.email}</p>
                      </div>

                      {/* Order Info */}
                      <div className="detail-section">
                        <h4>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                          </svg>
                          Order Details
                        </h4>
                        <div className="detail-row">
                          <span>Payment:</span>
                          <span>{order.paymentPreference || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                          <span>Size Pref:</span>
                          <span>{order.sizePreference || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                          <span>Contact:</span>
                          <span>{order.communicationPreference || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div className="detail-section status-section">
                        <h4>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                          </svg>
                          Update Status
                        </h4>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          disabled={updatingStatus === order.orderId}
                          className="status-select"
                        >
                          {ORDER_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    {order.orderItems && order.orderItems.length > 0 && (
                      <div className="order-items-section">
                        <h4>Order Items ({order.orderItems.length})</h4>
                        <table className="order-items-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orderItems.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item.productName || `Product #${item.productId}`}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price || 0).toFixed(2)}</td>
                                <td>${((item.price || 0) * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Order Totals */}
                    <div className="order-totals">
                      <div className="total-row">
                        <span>Subtotal</span>
                        <span>${(order.totalAmount || 0).toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Tax</span>
                        <span>${(order.tax || 0).toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Shipping</span>
                        <span>{order.shippingCost > 0 ? `$${order.shippingCost.toFixed(2)}` : 'Free'}</span>
                      </div>
                      <div className="total-row grand-total">
                        <span>Total</span>
                        <span>${((order.totalAmount || 0) + (order.tax || 0) + (order.shippingCost || 0)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
      </div>
    </div>
  );
}
