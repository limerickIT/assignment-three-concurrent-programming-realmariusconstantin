import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import axiosClient from '../../api/axiosClient';
import ProductImage from '../../components/ProductImage/ProductImage';
import stripeIcon from '../../assets/images/payments/stripe.svg';
import creditCardIcon from '../../assets/images/payments/creditCard.svg';
import paypalIcon from '../../assets/images/payments/paypal.svg';
import googleIcon from '../../assets/images/payments/google.svg';
import appleIcon from '../../assets/images/payments/apple.svg';
import revolutIcon from '../../assets/images/payments/revolut.svg';
import './Cart.css';

// Payment options with SVG icons
const PAYMENT_OPTIONS = [
  { id: 'stripe', name: 'Stripe', icon: stripeIcon },
  { id: 'creditcard', name: 'Credit Card', icon: creditCardIcon },
  { id: 'paypal', name: 'PayPal', icon: paypalIcon },
  { id: 'google', name: 'Google Pay', icon: googleIcon },
  { id: 'apple', name: 'Apple Pay', icon: appleIcon },
  { id: 'revolut', name: 'Revolut', icon: revolutIcon },
];

// Size options
const SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'XL'];

// Communication preferences
const COMM_OPTIONS = ['SMS', 'Email'];

// Payment Image Component
const PaymentImage = ({ payment, selected }) => {
  return (
    <img 
      src={payment.icon} 
      alt={payment.name}
      className="payment-img"
    />
  );
};

// Communication Icons SVG Component
const CommIcon = ({ type }) => {
  const icons = {
    SMS: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    Email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  };
  return icons[type] || icons.Email;
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, loading, error } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState({});
  const [removeError, setRemoveError] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  
  // Form state - Step 1: Shipping
  const [shippingForm, setShippingForm] = useState({
    full_name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
    email: user?.email || '',
    phone_number: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zip_code: user?.zipCode || '',
  });
  
  // Form state - Step 2: Preferences
  const [paymentPreference, setPaymentPreference] = useState('card');
  const [sizePreference, setSizePreference] = useState('Medium');
  const [communicationPreference, setCommunicationPreference] = useState('Email');
  
  const toggleItemDetails = (cartItemId) => {
    setExpandedItem(expandedItem === cartItemId ? null : cartItemId);
  };

  if (!user) {
    return (
      <div className="cart-page empty-state">
        <div className="empty-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
          <h2>Sign In Required</h2>
          <p>Please sign in to view your cart.</p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="cart-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page empty-state">
        <div className="empty-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items yet. Start shopping to fill your cart!</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(prev => ({ ...prev, [cartItemId]: true }));
    try {
      await updateQuantity(cartItemId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };
  
  const handleRemove = async (cartItemId) => {
    setRemoveError(null);
    setUpdating(prev => ({ ...prev, [cartItemId]: true }));
    try {
      await removeFromCart(cartItemId);
    } catch (err) {
      console.error('Failed to remove item:', err);
      setRemoveError(`Failed to remove item. Please try again.`);
    } finally {
      setUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };
  
  const handleCheckout = () => {
    setShowCheckoutModal(true);
    setCheckoutStep(1);
    setOrderPlaced(false);
    setRemoveError(null);
  };
  
  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    if (orderPlaced) {
      navigate('/orders');
    }
  };
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };
  
  const validateShipping = () => {
    const { full_name, email, phone_number, address, city, zip_code } = shippingForm;
    return full_name && email && phone_number && address && city && zip_code;
  };
  
  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      
      const orderData = {
        customerId: user.customerId,
        orderDate: new Date().toISOString(),
        status: 'Pending',
        totalAmount: getCartTotal(),
        tax: 0,
        shippingCost: 0,
        shippingName: shippingForm.full_name,
        shippingAddress: shippingForm.address,
        shippingCity: shippingForm.city,
        shippingZip: shippingForm.zip_code,
        phone: shippingForm.phone_number,
        email: shippingForm.email,
        paymentPreference: paymentPreference,
        sizePreference: sizePreference,
        communicationPreference: communicationPreference,
        orderItems: cartItems.map(item => ({
          productId: item.productId?.productId || item.productId,
          productName: item.productName || item.productId?.productName,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      try {
        const response = await axiosClient.post('/orders', orderData);
        setOrderNumber(response.data?.orderId || `ZEL${Date.now().toString().slice(-8)}`);
      } catch (apiErr) {
        console.warn('Order API failed, using local order number:', apiErr);
        setOrderNumber(`ZEL${Date.now().toString().slice(-8)}`);
      }
      
      try {
        await axiosClient.put(`/customers/${user.customerId}`, {
          ...user,
          address: shippingForm.address,
          city: shippingForm.city,
          zipCode: shippingForm.zip_code,
          phone: shippingForm.phone_number,
          sizePreference: sizePreference,
          communicationPreference: communicationPreference
        });
      } catch (updateErr) {
        console.warn('Customer update failed:', updateErr);
      }
      
      await clearCart();
      
      setOrderPlaced(true);
      setCheckoutStep(4);
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };
  
  const cartTotal = getCartTotal();
  
  const getProductName = (item) => item.productName || item.productId?.productName || 'Product';
  const getProductDescription = (item) => item.description || item.productId?.description || '';
  const getProductId = (item) => item.productId?.productId || item.productId || item.cartItemId;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header - Matching Orders page */}
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Continue Shopping
          </Link>
          <h1>Shopping Cart</h1>
          <p className="cart-subtitle">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {removeError && <div className="error-message">{removeError}</div>}

        <div className="cart-content">
          {/* Cart Items List - Card layout like Orders */}
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div 
                key={item.cartItemId} 
                className={`cart-item-card ${expandedItem === item.cartItemId ? 'expanded' : ''} ${updating[item.cartItemId] ? 'updating' : ''}`}
              >
                <div className="item-header" onClick={() => toggleItemDetails(item.cartItemId)}>
                  <div className="item-main-info">
                    <div className="item-image">
                      <ProductImage
                        productId={getProductId(item)}
                        featureImage={item.featureImage || item.productId?.featureImage}
                        alt={getProductName(item)}
                        size="thumb"
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-name-row">
                        <span className="label">Product</span>
                        <Link to={`/product/${getProductId(item)}`} className="item-name" onClick={e => e.stopPropagation()}>
                          {getProductName(item)}
                        </Link>
                      </div>
                      <div className="item-price-row">
                        <span className="label">Price</span>
                        <span className="item-price">${parseFloat(item.price || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="item-summary">
                    <div className="quantity-badge">
                      Qty: {item.quantity}
                    </div>
                    <span className="item-subtotal">${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                  <button className="expand-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                </div>

                {expandedItem === item.cartItemId && (
                  <div className="item-expanded-details">
                    {/* Product Details Section */}
                    <div className="details-section">
                      <h4>Product Details</h4>
                      <div className="details-content">
                        <p className="product-description">
                          {getProductDescription(item) || 'No description available'}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Control Section */}
                    <div className="details-section">
                      <h4>Quantity</h4>
                      <div className="quantity-controls">
                        <div className="quantity-selector">
                          <button 
                            className="qty-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.cartItemId, item.quantity - 1);
                            }}
                            disabled={updating[item.cartItemId] || item.quantity <= 1}
                          >
                            −
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val >= 1) {
                                handleQuantityChange(item.cartItemId, val);
                              }
                            }}
                            onClick={e => e.stopPropagation()}
                            min="1"
                            disabled={updating[item.cartItemId]}
                          />
                          <button 
                            className="qty-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item.cartItemId, item.quantity + 1);
                            }}
                            disabled={updating[item.cartItemId]}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Totals Section */}
                    <div className="details-section totals-section">
                      <div className="total-row">
                        <span>Unit Price</span>
                        <span>${parseFloat(item.price || 0).toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Quantity</span>
                        <span>× {item.quantity}</span>
                      </div>
                      <div className="total-row grand-total">
                        <span>Subtotal</span>
                        <span>${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="item-actions">
                      <Link 
                        to={`/product/${getProductId(item)}`} 
                        className="btn btn-outline btn-sm"
                        onClick={e => e.stopPropagation()}
                      >
                        View Product
                      </Link>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item.cartItemId);
                        }}
                        disabled={updating[item.cartItemId]}
                      >
                        {updating[item.cartItemId] ? 'Removing...' : 'Remove Item'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cart Summary - Side panel */}
          <div className="cart-summary-panel">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.cartItemId} className="summary-item">
                    <span className="summary-item-name">{getProductName(item)} × {item.quantity}</span>
                    <span className="summary-item-price">${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free">Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn-checkout" onClick={handleCheckout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Proceed to Checkout
              </button>

              <Link to="/products" className="continue-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="checkout-modal-overlay" onClick={handleCloseModal}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            {/* Progress Steps */}
            {!orderPlaced && (
              <div className="checkout-progress">
                <div className={`progress-step ${checkoutStep >= 1 ? 'active' : ''} ${checkoutStep > 1 ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {checkoutStep > 1 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : '1'}
                  </div>
                  <span className="step-label">Shipping</span>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${checkoutStep >= 2 ? 'active' : ''} ${checkoutStep > 2 ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {checkoutStep > 2 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : '2'}
                  </div>
                  <span className="step-label">Preferences</span>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${checkoutStep >= 3 ? 'active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">Review</span>
                </div>
              </div>
            )}
            
            {/* Step 1: Shipping */}
            {checkoutStep === 1 && (
              <div className="checkout-step-content">
                <h2>Shipping Information</h2>
                <p className="step-description">Where should we send your order?</p>
                
                <div className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="full_name">Full Name</label>
                      <input 
                        type="text" 
                        id="full_name"
                        name="full_name" 
                        value={shippingForm.full_name} 
                        onChange={handleShippingChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={shippingForm.email} 
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone_number">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone_number"
                        name="phone_number" 
                        value={shippingForm.phone_number} 
                        onChange={handleShippingChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zip_code">ZIP / Postal Code</label>
                      <input 
                        type="text" 
                        id="zip_code"
                        name="zip_code" 
                        value={shippingForm.zip_code} 
                        onChange={handleShippingChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">Street Address</label>
                    <input 
                      type="text" 
                      id="address"
                      name="address" 
                      value={shippingForm.address} 
                      onChange={handleShippingChange}
                      placeholder="123 Main Street, Apt 4"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="city">City</label>
                    <input 
                      type="text" 
                      id="city"
                      name="city" 
                      value={shippingForm.city} 
                      onChange={handleShippingChange}
                      placeholder="New York"
                    />
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                  <button 
                    className="btn-primary" 
                    onClick={() => setCheckoutStep(2)}
                    disabled={!validateShipping()}
                  >
                    Continue
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Preferences */}
            {checkoutStep === 2 && (
              <div className="checkout-step-content">
                <h2>Payment & Preferences</h2>
                <p className="step-description">Select your payment method and preferences</p>
                
                <div className="preference-section">
                  <h3>Payment Method</h3>
                  <div className="payment-options">
                    {PAYMENT_OPTIONS.map(option => (
                      <button
                        key={option.id}
                        className={`payment-option ${paymentPreference === option.id ? 'selected' : ''}`}
                        onClick={() => setPaymentPreference(option.id)}
                        title={option.name}
                      >
                        <PaymentImage payment={option} selected={paymentPreference === option.id} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="preference-section">
                  <h3>Size Preference</h3>
                  <div className="size-options">
                    {SIZE_OPTIONS.map(size => (
                      <button
                        key={size}
                        className={`size-option ${sizePreference === size ? 'selected' : ''}`}
                        onClick={() => setSizePreference(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="preference-section">
                  <h3>Communication Preference</h3>
                  <div className="comm-options">
                    {COMM_OPTIONS.map(comm => (
                      <button
                        key={comm}
                        className={`comm-option ${communicationPreference === comm ? 'selected' : ''}`}
                        onClick={() => setCommunicationPreference(comm)}
                      >
                        <span className="option-icon"><CommIcon type={comm} /></span>
                        <span className="option-name">{comm}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button className="btn-secondary" onClick={() => setCheckoutStep(1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back
                  </button>
                  <button className="btn-primary" onClick={() => setCheckoutStep(3)}>
                    Review Order
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review */}
            {checkoutStep === 3 && (
              <div className="checkout-step-content review-step">
                <h2>Review Your Order</h2>
                <p className="step-description">Please confirm your order details</p>
                
                <div className="review-grid">
                  <div className="review-card">
                    <div className="review-card-header">
                      <h4>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Shipping To
                      </h4>
                      <button className="edit-btn" onClick={() => setCheckoutStep(1)}>Edit</button>
                    </div>
                    <div className="review-card-content">
                      <p className="primary">{shippingForm.full_name}</p>
                      <p>{shippingForm.address}</p>
                      <p>{shippingForm.city}, {shippingForm.zip_code}</p>
                      <p>{shippingForm.email}</p>
                      <p>{shippingForm.phone_number}</p>
                    </div>
                  </div>
                  
                  <div className="review-card">
                    <div className="review-card-header">
                      <h4>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                        </svg>
                        Preferences
                      </h4>
                      <button className="edit-btn" onClick={() => setCheckoutStep(2)}>Edit</button>
                    </div>
                    <div className="review-card-content">
                      <div className="preference-row">
                        <span className="label">Payment:</span>
                        <span className="value">{PAYMENT_OPTIONS.find(p => p.id === paymentPreference)?.name}</span>
                      </div>
                      <div className="preference-row">
                        <span className="label">Size:</span>
                        <span className="value">{sizePreference}</span>
                      </div>
                      <div className="preference-row">
                        <span className="label">Communication:</span>
                        <span className="value">{communicationPreference}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="review-items-section">
                  <h4>Order Items ({cartItems.length})</h4>
                  <div className="review-items-list">
                    {cartItems.map(item => (
                      <div key={item.cartItemId} className="review-item">
                        <div className="item-details">
                          <span className="item-name">{getProductName(item)}</span>
                          <span className="item-qty">Qty: {item.quantity}</span>
                        </div>
                        <span className="item-price">${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="review-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span className="free">Free</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button className="btn-secondary" onClick={() => setCheckoutStep(2)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back
                  </button>
                  <button 
                    className="btn-primary btn-place-order" 
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                  >
                    {placingOrder ? (
                      <>
                        <span className="btn-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Success */}
            {checkoutStep === 4 && orderPlaced && (
              <div className="checkout-step-content order-success">
                <div className="success-animation">
                  <div className="success-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p className="order-number">Order #{orderNumber}</p>
                <p className="confirmation-text">
                  Thank you for your purchase, {shippingForm.full_name}!
                </p>
                <p className="confirmation-subtext">
                  A confirmation email has been sent to {shippingForm.email}
                </p>
                
                <div className="success-details">
                  <div className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                </div>
                
                <div className="checkout-actions success-actions">
                  <Link to="/orders" className="btn-secondary">
                    View My Orders
                  </Link>
                  <button className="btn-primary" onClick={handleCloseModal}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
