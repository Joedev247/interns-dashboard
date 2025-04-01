import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6">
                <ShoppingBag size={48} className="mx-auto text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-600 mb-4">Your cart is empty</p>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items yet</p>
              <button 
                onClick={() => navigate('/products')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition-all transform hover:scale-105 duration-200 shadow-md"
              >
                Continue Shopping
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start border-b pb-6 bg-white p-4 rounded-lg shadow-sm
                    hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  <div className="flex-grow ml-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Size: default</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 
                          rounded-full hover:bg-red-50"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded-md shadow-sm bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-800
                            transition-colors rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-800
                            transition-colors rounded-r-md"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-medium text-lg text-blue-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Including VAT</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white py-4 rounded-lg mt-6 
                  hover:bg-blue-700 transition-all transform hover:scale-105 
                  duration-200 flex items-center justify-center space-x-2
                  shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={() => navigate('/products')}
                className="w-full mt-4 text-blue-600 py-3 rounded-lg border border-blue-600
                  hover:bg-blue-50 transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
