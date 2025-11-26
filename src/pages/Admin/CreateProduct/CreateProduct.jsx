import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './CreateProduct.css';

export default function CreateProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    categoryId: '',
    featureImage: '',
    size: '',
    colour: '',
    material: '',
    discountedPrice: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      setError('');
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const response = await axiosClient.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.url;
    } catch (err) {
      console.error('Image upload failed:', err);
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.featureImage;
      
      // Upload image if one was selected
      if (imageFile) {
        imageUrl = await handleImageUpload();
      }

      const payload = {
        ...formData,
        featureImage: imageUrl,
        price: parseFloat(formData.price),
        categoryId: { categoryId: parseInt(formData.categoryId) },
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null
      };

      await axiosClient.post('/products', payload);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product">
      <div className="form-container">
        <h1>Create New Product</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
              rows="4"
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
                placeholder="Enter price"
                step="0.01"
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
                placeholder="Enter discounted price"
                step="0.01"
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
              {categories.map(cat => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
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
                  <img src={imagePreview} alt="Preview" />
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
              disabled={!!imageFile}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
