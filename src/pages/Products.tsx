// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Category {
  name: string;
  icon: string;
  itemCount: number;
}

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Skincare', icon: '🌟', itemCount: 20 },
    { name: 'Haircare', icon: '💇', itemCount: 85 },
    { name: 'Makeup', icon: '💄', itemCount: 150 },
    { name: 'Tools', icon: '🛠️', itemCount: 45 },
    { name: 'Fragrance', icon: '🌸', itemCount: 50 },
    { name: 'Body Care', icon: '🧴', itemCount: 65 },
    { name: 'Natural', icon: '🌿', itemCount: 55 },
    { name: 'Organic', icon: '🌱', itemCount: 40 },
    { name: 'Vegan', icon: '🌾', itemCount: 35 },
    { name: 'Luxury', icon: '✨', itemCount: 25 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail
    });
  };

  const filteredProducts = products
    .filter((product: any) => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <p className="text-sm text-gray-500 mb-6">Refine your search</p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedCategory(category.name.toLowerCase())}
                >
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{category.itemCount} items</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedCategory('all')}
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              className="w-full p-3 border rounded-lg bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart size={20} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <ShoppingCart size={20} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleProductDetails(product.id)}
                      className="p-2 bg-blue-600 rounded-full shadow-md"
                    >
                      <Eye size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)} - {product.brand}
                  </div>
                  <h3 className="font-medium mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
