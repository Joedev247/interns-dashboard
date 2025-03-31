import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types/interfaces';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors">
          <Heart size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.title}</h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
