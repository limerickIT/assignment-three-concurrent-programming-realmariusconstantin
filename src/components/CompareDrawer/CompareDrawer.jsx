import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare, MAX_COMPARE_ITEMS } from '../../context/CompareContext';
import ProductImage from '../ProductImage/ProductImage';
import compareIcon from '../../assets/images/compareIcon.svg';
import './CompareDrawer.css';

export default function CompareDrawer() {
  const { 
    compareItems, 
    error, 
    isDrawerOpen, 
    removeFromCompare, 
    clearCompare, 
    toggleDrawer,
    closeDrawer,
    clearError,
    canCompare 
  } = useCompare();

  const [isComparing, setIsComparing] = useState(false);

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Reset comparison mode when drawer closes
  useEffect(() => {
    if (!isDrawerOpen) {
      setIsComparing(false);
    }
  }, [isDrawerOpen]);

  // Don't render if no items
  if (compareItems.length === 0 && !error) {
    return null;
  }

  return (
    <>
      {/* Error Toast */}
      {error && (
        <CompareErrorToast error={error} onClose={clearError} />
      )}

      {/* Floating Compare Button (when drawer is closed) */}
      {compareItems.length > 0 && !isDrawerOpen && (
        <CompareFloatingButton onClick={toggleDrawer} count={compareItems.length} />
      )}

      {/* Compare Drawer */}
      <div className={`compare-drawer ${isDrawerOpen ? 'open' : ''} ${isComparing ? 'comparing' : ''}`}>
        <CompareDrawerHeader 
          isComparing={isComparing}
          itemCount={compareItems.length}
          onBack={() => setIsComparing(false)}
          onClose={closeDrawer}
        />

        <div className="compare-drawer-content">
          {isComparing ? (
            <ComparisonTable products={compareItems} />
          ) : compareItems.length === 0 ? (
            <CompareEmptyState />
          ) : (
            <CompareItemsList 
              items={compareItems}
              onRemove={removeFromCompare}
            />
          )}
        </div>

        {!isComparing && compareItems.length > 0 && (
          <CompareDrawerFooter
            itemCount={compareItems.length}
            canCompare={canCompare}
            onClearAll={clearCompare}
            onCompareNow={() => setIsComparing(true)}
          />
        )}
      </div>

      {/* Overlay when drawer is open on mobile */}
      {isDrawerOpen && (
        <div className="compare-drawer-overlay" onClick={closeDrawer}></div>
      )}
    </>
  );
}

/**
 * Error toast notification
 */
function CompareErrorToast({ error, onClose }) {
  return (
    <div className="compare-error-toast">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <span>{error}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
}

/**
 * Floating compare button (FAB)
 */
function CompareFloatingButton({ onClick, count }) {
  return (
    <button className="compare-fab" onClick={onClick} title="Open Compare Drawer">
      <img src={compareIcon} alt="Compare" />
      {count > 0 && <span className="compare-fab-badge">{count}</span>}
    </button>
  );
}

/**
 * Drawer header with back button or close button
 */
function CompareDrawerHeader({ isComparing, itemCount, onBack, onClose }) {
  return (
    <div className="compare-drawer-header">
      {isComparing ? (
        <>
          <button className="compare-back-btn" onClick={onBack} title="Back to selection">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <h3 className="compare-header-title">
            <img src={compareIcon} alt="" />
            Comparison
          </h3>
        </>
      ) : (
        <>
          <h3 className="compare-header-title">
            <img src={compareIcon} alt="" />
            Compare Products
            <span className="compare-count">({itemCount}/{MAX_COMPARE_ITEMS})</span>
          </h3>
          <button className="compare-drawer-close" onClick={onClose} title="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

/**
 * Empty state when no items in drawer
 */
function CompareEmptyState() {
  return (
    <div className="compare-empty">
      <img src={compareIcon} alt="" style={{ width: 56, height: 56, opacity: 0.4 }} />
      <p>Add products to compare</p>
    </div>
  );
}

/**
 * List of comparison items in selection mode
 */
function CompareItemsList({ items, onRemove }) {
  return (
    <div className="compare-items">
      {items.map(product => (
        <CompareItemCard 
          key={product.productId}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

/**
 * Single product card in comparison list
 */
function CompareItemCard({ product, onRemove }) {
  return (
    <div className="compare-item">
      <button 
        className="compare-item-remove" 
        onClick={() => onRemove(product.productId)}
        title="Remove from compare"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <Link to={`/product/${product.productId}`} className="compare-item-image">
        <ProductImage
          productId={product.productId}
          featureImage={product.featureImage}
          alt={product.productName}
          size="thumb"
        />
      </Link>
      <div className="compare-item-info">
        <Link to={`/product/${product.productId}`} className="compare-item-name">
          {product.productName}
        </Link>
        <span className="compare-item-price">${product.price?.toFixed(2)}</span>
      </div>
    </div>
  );
}

/**
 * Drawer footer with action buttons
 */
function CompareDrawerFooter({ itemCount, canCompare, onClearAll, onCompareNow }) {
  return (
    <div className="compare-drawer-footer">
      {canCompare && (
        <div className="compare-summary-box">
          <div className="summary-header">
            <img src={compareIcon} alt="" />
            <span className="summary-title">Ready to Compare</span>
          </div>
          <p className="summary-count">{itemCount} items selected</p>
          <button 
            className="compare-now-btn"
            onClick={onCompareNow}
          >
            Compare Now
          </button>
        </div>
      )}
      <button className="compare-clear-btn" onClick={onClearAll}>
        Clear All
      </button>
      {!canCompare && itemCount > 0 && (
        <p className="compare-hint">Add at least 2 products to compare</p>
      )}
    </div>
  );
}

/**
 * Comparison table in comparison mode
 */
function ComparisonTable({ products }) {
  const attributes = [
    { key: 'image', label: 'Image' },
    { key: 'productName', label: 'Title' },
    { key: 'price', label: 'Price' },
    { key: 'discountedPrice', label: 'Discount' },
    { key: 'categoryId', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'colour', label: 'Color' },
    { key: 'size', label: 'Size' },
    { key: 'material', label: 'Material' },
    { key: 'manufacturer', label: 'Brand' },
  ];

  const renderAttributeValue = (product, attribute) => {
    const value = product[attribute.key];

    if (attribute.key === 'image') {
      return (
        <ProductImage
          productId={product.productId}
          featureImage={product.featureImage}
          alt={product.productName}
          size="thumb"
        />
      );
    }

    if (attribute.key === 'price' || attribute.key === 'discountedPrice') {
      return value ? `$${value.toFixed(2)}` : 'N/A';
    }

    if (attribute.key === 'description') {
      return value ? value.substring(0, 80) + (value.length > 80 ? '...' : '') : 'N/A';
    }

    if (attribute.key === 'categoryId') {
      if (typeof value === 'object' && value && value.categoryName) {
        return value.categoryName;
      }
      return value ? value.toString() : 'N/A';
    }

    return value || 'N/A';
  };

  return (
    <div className="comparison-table-container">
      <table className="comparison-table">
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.key} className="comparison-row">
              <td className="comparison-attr-label">{attribute.label}</td>
              {products.map((product) => (
                <td key={product.productId} className="comparison-attr-value">
                  {attribute.key === 'image' ? (
                    <div className="comparison-image-cell">
                      {renderAttributeValue(product, attribute)}
                    </div>
                  ) : (
                    <span>{renderAttributeValue(product, attribute)}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

