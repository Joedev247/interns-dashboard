import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/interfaces';

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  isLoading,
  error
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'haircare', name: 'Haircare' },
    { id: 'makeup', name: 'Makeup' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeCategory);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-2">
          OUR COLLECTION
        </h3>
        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover our handpicked selection of premium products
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium
              ${activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="relative">
          <button
            onClick={() => scrollContainer('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full
                     hover:bg-blue-600 hover:text-white transition-all duration-300 -ml-6 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollContainer('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full
                     hover:bg-blue-600 hover:text-white transition-all duration-300 -mr-6 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            id="products-container"
            className="flex overflow-x-auto gap-8 pb-6 scroll-smooth hide-scrollbar"
          >
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[280px] max-w-[280px]"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
                              transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-[320px] group">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                    />
                    
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center
                                  transition-opacity duration-300
                                  ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="flex gap-3">
                        {['quick-view', 'wishlist', 'share'].map((action, index) => (
                          <button
                            key={action}
                            className="bg-white/90 p-3 rounded-full hover:bg-blue-600 hover:text-white
                                     transition-all duration-300 transform hover:scale-110"
                          >
                            {index === 0 && <Eye className="w-5 h-5" />}
                            {index === 1 && <Heart className="w-5 h-5" />}
                            {index === 2 && <Share2 className="w-5 h-5" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        In Stock
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg truncate">
                      {product.title}
                    </h3>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="bg-blue-600 text-white px-5 py-2.5 
                                     hover:bg-blue-700 transition-all duration-300
                                     flex items-center gap-2 font-medium">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(filteredProducts.length / 4) }).map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-300
                          ${idx === 0 ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-blue-400'}`}
                onClick={() => {
                  const container = document.getElementById('products-container');
                  if (container) {
                    container.scrollTo({
                      left: container.offsetWidth * idx,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
