import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, LogIn, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import TopBar from './TopBar';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/Products' },
  ];

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <nav
          className={`bg-white w-full transition-all duration-300 ${
            isScrolled ? 'shadow-md' : ''
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <ShoppingBag className="h-7 w-7 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  StyleStore
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative group text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                        location.pathname === item.path ? 'scale-x-100' : ''
                      }`}
                    ></span>
                  </Link>
                ))}

                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
                
                <Link to="/cart" className="relative group">
                  <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                  </div>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>

            <div
              className={`md:hidden transition-all duration-300 overflow-hidden ${
                isMenuOpen ? 'max-h-64' : 'max-h-0'
              }`}
            >
              <div className="py-4 space-y-1 border-t">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
