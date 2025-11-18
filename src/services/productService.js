import axiosClient from '../api/axiosClient';

const productService = {
  // Get all products
  getAllProducts: () => axiosClient.get('/products'),
  
  // Search products by query
  searchProducts: (query) => axiosClient.get(`/products/search?query=${query}`),
  
  // Get product by ID
  getProductById: (id) => axiosClient.get(`/products/${id}`),
  
  // Get all categories
  getAllCategories: () => axiosClient.get('/categories'),
  
  // Get category by ID
  getCategoryById: (categoryId) => axiosClient.get(`/categories/${categoryId}`),
  
  // Get products by category
  getProductsByCategory: (categoryId) => axiosClient.get(`/products/category/${categoryId}`),
  
  // Get all orders
  getAllOrders: () => axiosClient.get('/orders'),
  
  // Create new order
  createOrder: (orderData) => axiosClient.post('/orders', orderData),
  
  // Get wishlist
  getWishlist: () => axiosClient.get('/wishlist'),
  
  // Add to wishlist
  addToWishlist: (wishlistData) => axiosClient.post('/wishlist', wishlistData),
  
  // Remove from wishlist
  removeFromWishlist: (id) => axiosClient.delete(`/wishlist/${id}`),
  
  // Get reviews for product
  getReviews: (productId) => axiosClient.get(`/reviews?productId=${productId}`),
  
  // Create review
  createReview: (reviewData) => axiosClient.post('/reviews', reviewData),
};

export default productService;