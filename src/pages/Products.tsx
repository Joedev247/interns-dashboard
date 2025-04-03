import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast, Toaster } from 'react-hot-toast';

interface ProductsProps {
  onProductSelect: (id: number) => void;
}

export const Products: React.FC<ProductsProps> = ({ onProductSelect }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

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

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Added to wishlist!');
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Our Products</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products, brands, and categories..."
            className="w-full p-4 border rounded-lg bg-white shadow-sm focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            Press Enter to search
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product: any) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl shadow-md overflow-hidden 
              transform transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => handleProductDetails(product.id)}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transform transition-transform duration-500 
                  group-hover:scale-110"
              />

              <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center 
                justify-center gap-4 transition-opacity duration-300 
                ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={(e) => handleWishlist(e)}
                  className="p-3 bg-white rounded-full transform transition-transform duration-300 
                    hover:scale-110 hover:bg-gray-100"
                >
                  <Heart size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="p-3 bg-white rounded-full transform transition-transform duration-300 
                    hover:scale-110 hover:bg-gray-100"
                >
                  <ShoppingCart size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductDetails(product.id);
                  }}
                  className="p-3 bg-blue-600 rounded-full transform transition-transform duration-300 
                    hover:scale-110 hover:bg-blue-700"
                >
                  <Eye size={20} className="text-white" />
                </button>
              </div>

              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md 
                  text-sm font-medium">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1 capitalize">
                {product.category} - {product.brand}
              </div>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      ${Math.round(product.price * (1 + product.discountPercentage / 100))}
                    </span>
                  )}
                </div>
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm ml-1 font-medium">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={handlePrevPage}
            className={`px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 
              transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded transition-colors duration-200 
                ${currentPage === page
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
              transition-colors duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

function useState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const state = React.useState(initialValue);
  return state;
}

export default Products;

// Removed duplicate useEffect implementation
// Removed duplicate useEffect implementation

