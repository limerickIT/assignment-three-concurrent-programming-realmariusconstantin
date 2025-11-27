import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './EditProduct.css';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    featureImage: '',
    categoryId: '',
    size: '',
    colour: '',
    material: '',
    discountedPrice: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/products/${id}`);
        const product = response.data;
        setFormData({
          productName: product.productName || '',
          description: product.description || '',
          price: product.price || '',
          featureImage: product.featureImage || '',
          categoryId: product.categoryId?.categoryId || '',
          size: product.size || '',
          colour: product.colour || '',
          material: product.material || '',
          discountedPrice: product.discountedPrice || ''
        });
        // Set existing image as preview
        if (product.featureImage) {
          // Ensure full URL if it's a relative path
          let imageUrl = product.featureImage;
          if (!imageUrl.startsWith('http')) {
            imageUrl = `http://localhost:8080${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
          }
          setImagePreview(imageUrl);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);
      uploadFormData.append('productId', id);
      
      const response = await axiosClient.post('/upload/image', uploadFormData, {
        headers: {
          'Content-Type': undefined
        },
        withCredentials: true
      });
      
      return response.data.url;
    } catch (err) {
      console.error('Image upload failed:', err);
      setError(err.response?.data?.error || 'Failed to upload image');
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, featureImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = formData.featureImage;
      
      // Upload image if a new one was selected
      if (imageFile) {
        imageUrl = await handleImageUpload();
      }

      const payload = {
        productName: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        featureImage: imageUrl,
        categoryId: {
          categoryId: parseInt(formData.categoryId)
        },
        size: formData.size || null,
        colour: formData.colour || null,
        material: formData.material || null,
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null
      };

      await axiosClient.put(`/products/${id}`, payload);
      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-container"><p>Loading product...</p></div>;
  if (error && !formData.productName) return <div className="admin-container"><p className="error">{error}</p></div>;

  return (
    <div className="edit-product">
      <div className="form-container">
        <div className="form-header">
          <h1>Edit Product</h1>
          <button onClick={() => navigate('/admin/products')} className="btn-back">
            Back to Products
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountedPrice">Discounted Price</label>
              <input
                type="number"
                id="discountedPrice"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00 (optional)"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category *</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Enter size"
              />
            </div>

            <div className="form-group">
              <label htmlFor="colour">Colour</label>
              <input
                type="text"
                id="colour"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                placeholder="Enter colour"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="material">Material</label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Enter material"
            />
          </div>

          <div className="form-group image-upload-group">
            <label>Product Image</label>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Product preview" />
                  <button type="button" className="clear-image" onClick={clearImage}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>Click to upload image</span>
                  <span className="upload-hint">PNG, JPG up to 5MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="file-input"
              />
            </div>
            {uploading && <p className="uploading-text">Uploading image...</p>}
          </div>

          <div className="form-group">
            <label htmlFor="featureImage">Or Enter Image URL</label>
            <input
              type="url"
              id="featureImage"
              name="featureImage"
              value={formData.featureImage}
              onChange={handleChange}
              placeholder="Enter image URL (optional if uploading)"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/products')} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn-submit">
              {saving ? 'Updating...' : uploading ? 'Uploading Image...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
