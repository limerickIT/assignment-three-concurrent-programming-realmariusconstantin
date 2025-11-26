import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, customersRes, categoriesRes, ordersRes] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/customers'),
          axiosClient.get('/categories'),
          axiosClient.get('/orders').catch(() => ({ data: [] }))
        ]);
        
        setStats({
          products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
          customers: Array.isArray(customersRes.data) ? customersRes.data.length : 0,
          categories: Array.isArray(categoriesRes.data) ? categoriesRes.data.length : 0,
          orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your store inventory, customers, and orders</p>
        </div>
        
        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon products-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 01-8 0"></path>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '...' : stats.products}</span>
              <span className="stat-label">Products</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon customers-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                <path d="M16 3.13a4 4 0 010 7.75"></path>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '...' : stats.customers}</span>
              <span className="stat-label">Customers</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon categories-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '...' : stats.categories}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon orders-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1"></rect>
                <path d="M9 12h6M9 16h6"></path>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '...' : stats.orders}</span>
              <span className="stat-label">Orders</span>
            </div>
          </div>
        </div>
        
        {/* Management Cards */}
        <h2 className="section-title">Quick Actions</h2>
        <div className="admin-cards">
          <Link to="/admin/products" className="admin-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 01-8 0"></path>
              </svg>
            </div>
            <h2>Products</h2>
            <p>View, add, edit, and delete products from your catalog</p>
            <span className="card-link">Manage Products →</span>
          </Link>

          <Link to="/admin/categories" className="admin-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <h2>Categories</h2>
            <p>Manage product categories and organize your catalog</p>
            <span className="card-link">Manage Categories →</span>
          </Link>

          <Link to="/admin/customers" className="admin-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                <path d="M16 3.13a4 4 0 010 7.75"></path>
              </svg>
            </div>
            <h2>Customers</h2>
            <p>View and manage customer accounts and information</p>
            <span className="card-link">Manage Customers →</span>
          </Link>

          <Link to="/admin/orders" className="admin-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1"></rect>
                <path d="M9 12h6M9 16h6"></path>
              </svg>
            </div>
            <h2>Orders</h2>
            <p>View and manage customer orders and shipments</p>
            <span className="card-link">Manage Orders →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
