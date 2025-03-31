import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-xl shadow-sm">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-600">
                      ${item.price} × {item.quantity}
                    </div>
                    <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center"
            >
              Proceed to Payment <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
