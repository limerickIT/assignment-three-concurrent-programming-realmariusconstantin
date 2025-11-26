import React, { useState } from 'react';

/**
 * ProductImage Component
 * 
 * A reusable image component with built-in fallback handling.
 * Automatically displays a placeholder image when:
 * - The image URL is null, empty, or invalid
 * - The image filename is 'no-image.png'
 * - The image fails to load (404, network error, etc.)
 * 
 * @param {string} src - The image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} className - Optional CSS class names
 * @param {object} style - Optional inline styles
 * @param {string} size - Size variant: 'thumb' | 'medium' | 'large' | 'full'
 */

const FALLBACK_IMAGE = '/assets/no-image.svg';

/**
 * Check if an image URL is valid and should attempt to load
 */
const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.trim() === '') return false;
  if (url.toLowerCase().includes('no-image.png')) return false;
  return true;
};

/**
 * Get the product image URL based on product ID and image name
 * Handles the specific folder structure of the Zelora backend
 */
export const getProductImageUrl = (productId, imageName, type = 'large') => {
  if (!isValidImageUrl(imageName)) {
    return FALLBACK_IMAGE;
  }
  
  // Determine folder based on product ID range
  let folder;
  const id = parseInt(productId);
  
  if (id >= 1 && id <= 10) {
    folder = '1-10_LARGE';
  } else if (id >= 11 && id <= 30) {
    folder = '11-30_LARGE';
  } else if (id >= 31 && id <= 58) {
    folder = '31-58_LARGE';
  } else {
    return FALLBACK_IMAGE;
  }
  
  return `http://localhost:8080/product-images/${folder}/${productId}/${imageName}`;
};

const ProductImage = ({ 
  src, 
  alt = 'Product image', 
  className = '', 
  style = {},
  productId = null,
  featureImage = null,
  size = 'medium'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine the actual image URL
  let imageUrl;
  if (productId && featureImage) {
    imageUrl = getProductImageUrl(productId, featureImage);
  } else if (isValidImageUrl(src)) {
    imageUrl = src;
  } else {
    imageUrl = FALLBACK_IMAGE;
  }

  // If there was an error loading, use fallback
  if (hasError) {
    imageUrl = FALLBACK_IMAGE;
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Size-based dimensions
  const sizeStyles = {
    thumb: { width: '80px', height: '80px' },
    small: { width: '120px', height: '120px' },
    medium: { width: '200px', height: '200px' },
    large: { width: '400px', height: '400px' },
    full: { width: '100%', height: 'auto' },
    card: { width: '100%', height: '100%', objectFit: 'cover' }
  };

  const combinedStyle = {
    ...sizeStyles[size],
    objectFit: 'cover',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: 'var(--radius-md)',
    transition: 'opacity var(--transition-base)',
    opacity: isLoading ? 0.5 : 1,
    ...style
  };

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`product-image ${className}`}
      style={combinedStyle}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
    />
  );
};

export default ProductImage;
