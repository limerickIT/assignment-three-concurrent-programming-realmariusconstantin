import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import Layout from './layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CompareDrawer from './components/CompareDrawer/CompareDrawer';

import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CategoryProducts from './pages/CategoryProducts/CategoryProducts';
import Collection from './pages/Collection/Collection';
import SearchResults from './pages/SearchResults/SearchResults';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Register/Register';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts/AdminProducts';
import AdminCategories from './pages/Admin/AdminCategories/AdminCategories';
import CreateProduct from './pages/Admin/CreateProduct/CreateProduct';
import EditProduct from './pages/Admin/EditProduct/EditProduct';
import AdminCustomers from './pages/Admin/AdminCustomers/AdminCustomers';
import AdminOrders from './pages/Admin/AdminOrders/AdminOrders';
import EditCustomer from './pages/Admin/EditCustomer/EditCustomer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CompareProvider>
            <Layout>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:categoryId" element={<CategoryProducts />} />
              {/* Collection routes for gender-specific browsing */}
              <Route path="/collection/:gender" element={<Collection />} />
              <Route path="/collection/:gender/category/:categoryId" element={<CategoryProducts />} />
              {/* Search results */}
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminCategories />
                </ProtectedRoute>
              } />
              <Route path="/admin/create-product" element={
                <ProtectedRoute adminOnly={true}>
                  <CreateProduct />
                </ProtectedRoute>
              } />
              <Route path="/admin/edit-product/:id" element={
                <ProtectedRoute adminOnly={true}>
                  <EditProduct />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminCustomers />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/edit-customer/:id" element={
                <ProtectedRoute adminOnly={true}>
                  <EditCustomer />
                </ProtectedRoute>
              } />
            </Routes>
            <CompareDrawer />
          </Layout>
          </CompareProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
