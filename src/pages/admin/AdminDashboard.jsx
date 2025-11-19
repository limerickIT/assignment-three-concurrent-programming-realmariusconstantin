import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p className="dashboard-subtitle">Manage your store</p>
      
      <div className="dashboard-cards">
        <Link to="/admin/products" className="dashboard-card">
          <h2>Products</h2>
          <p>Manage product inventory, add new products, and update existing ones</p>
        </Link>

        <Link to="/admin/customers" className="dashboard-card">
          <h2>Customers</h2>
          <p>View and manage customer accounts and information</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
