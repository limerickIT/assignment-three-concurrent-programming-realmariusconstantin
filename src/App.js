import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './layout/Layout';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryProducts from './pages/CategoryProducts';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
