import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
