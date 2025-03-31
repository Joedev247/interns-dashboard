import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-violet-600 font-bold">${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8">
            <div className="text-xl font-bold">
              Total: ${getCartTotal().toFixed(2)}
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
