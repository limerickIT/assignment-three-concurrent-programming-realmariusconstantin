import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axiosClient from '../../api/axiosClient';
import './Orders.css';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.customerId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Fetch orders for the current user
        const response = await axiosClient.get(`/orders/customer/${user.customerId}`);
        const ordersData = Array.isArray(response.data) ? response.data : [];
        // Sort by date descending
        ordersData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        // If 404, just set empty orders (no orders yet)
        if (err.response?.status === 404) {
          setOrders([]);
        } else {
          setError('Failed to load orders. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  if (!user) {
    return (
      <div className="orders-page empty-state">
        <div className="empty-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1"></rect>
            <path d="M9 12h6M9 16h6"></path>
          </svg>
          <h2>Sign In Required</h2>
          <p>Please sign in to view your orders.</p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2>Error Loading Orders</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        {/* Header */}
        <div className="orders-header">
          <Link to="/" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Shopping
          </Link>
          <h1>My Orders</h1>
          <p className="orders-subtitle">Track and manage your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1"></rect>
                <path d="M12 11v6M9 14h6"></path>
              </svg>
            </div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.orderId} className={`order-card ${expandedOrder === order.orderId ? 'expanded' : ''}`}>
                <div className="order-header" onClick={() => toggleOrderDetails(order.orderId)}>
                  <div className="order-info">
                    <div className="order-id">
                      <span className="label">Order</span>
                      <span className="value">#{order.orderId || 'N/A'}</span>
                    </div>
                    <div className="order-date">
                      <span className="label">Placed on</span>
                      <span className="value">{formatDate(order.orderDate)}</span>
                    </div>
                  </div>
                  <div className="order-summary">
                    <span className={`order-status ${getStatusColor(order.orderStatus || order.status)}`}>
                      {order.orderStatus || order.status || 'Pending'}
                    </span>
                    <span className="order-total">${parseFloat(order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                  <button className="expand-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                </div>

                {expandedOrder === order.orderId && (
                  <div className="order-details">
                    {/* Order Items */}
                    <div className="details-section">
                      <h4>Order Items</h4>
                      <div className="order-items">
                        {order.orderitemList?.length > 0 ? order.orderitemList.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <div className="item-info">
                              <span className="item-name">{item.productName || `Product #${item.productId}`}</span>
                              <span className="item-qty">Qty: {item.quantity}</span>
                            </div>
                            <span className="item-price">${parseFloat(item.itemPrice || item.subtotal || 0).toFixed(2)}</span>
                          </div>
                        )) : (
                          <p className="no-items">Order items not available</p>
                        )}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="details-section">
                      <h4>Shipping Information</h4>
                      <div className="shipping-info">
                        <p><strong>Name:</strong> {order.customerName || user?.firstName + ' ' + user?.lastName}</p>
                        <p><strong>Email:</strong> {order.customerEmail || user?.email || 'Not specified'}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod || 'Not specified'}</p>
                        <p><strong>Shipping Method:</strong> {order.shippingMethod || 'Standard'}</p>
                      </div>
                    </div>

                    {/* Order Totals */}
                    <div className="details-section totals-section">
                      <div className="total-row">
                        <span>Subtotal</span>
                        <span>${parseFloat(order.totalAmount || 0).toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="total-row grand-total">
                        <span>Total</span>
                        <span>${parseFloat(order.totalAmount || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
