import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';
import HomePage from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import DashboardLayout from './components/layout/DashboardLayout';
import NotFound from './components/NotFound';
import { CartProvider } from './contexts/CartContext';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products onProductSelect={function (id: number): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails productId={0} onBack={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
