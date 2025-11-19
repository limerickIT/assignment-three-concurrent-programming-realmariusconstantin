import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, loading, error } = useCart();
  const [updating, setUpdating] = useState({});
  
  if (loading) {
    return <div className="cart-page"><p>Loading cart...</p></div>;
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/" className="btn-continue-shopping">Continue Shopping</Link>
      </div>
    );
  }
  
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    setUpdating(prev => ({ ...prev, [cartItemId]: true }));
    try {
      await updateQuantity(cartItemId, newQuantity);
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };
  
  const handleRemove = async (cartItemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        await removeFromCart(cartItemId);
      } catch (err) {
        console.error('Failed to remove item:', err);
      }
    }
  };
  
  const cartTotal = getCartTotal();
  
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.cartItemId} className="cart-item-row">
                    <td className="item-product">
                      <div className="product-info">
                        <h3>{item.productId?.productName || 'Product'}</h3>
                        <p>{item.productId?.description?.substring(0, 50)}...</p>
                      </div>
                    </td>
                    <td className="item-price">
                      ${parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="item-quantity">
                      <div className="quantity-selector">
                        <button 
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                          disabled={updating[item.cartItemId] || item.quantity <= 1}
                        >
                          −
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.cartItemId, parseInt(e.target.value))}
                          min="1"
                          disabled={updating[item.cartItemId]}
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                          disabled={updating[item.cartItemId]}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="item-subtotal">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="item-action">
                      <button 
                        className="btn-remove"
                        onClick={() => handleRemove(item.cartItemId)}
                        disabled={updating[item.cartItemId]}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="cart-summary">
            <div className="summary-box">
              <h2>Order Summary</h2>
              
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-item">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-item">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">${cartTotal.toFixed(2)}</span>
              </div>
              
              <button className="btn-checkout">
                Proceed to Checkout
              </button>
              
              <Link to="/" className="btn-continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
