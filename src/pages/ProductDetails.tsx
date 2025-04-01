import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import {
  ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart,
  Star, Plus, Minus, Send, Facebook, Twitter, Instagram,
  Check, ShoppingBag
} from 'lucide-react';

interface ProductDetailsProps {
  productId: number;
  onBack: () => void;
}

interface Comment {
  id: number;
  user: string;
  rating: number;
  content: string;
  date: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack }) => {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ rating: 5, content: '' });
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.thumbnail
    });
    setAddedToCart(true);
    toast.success('Added to cart!');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleCheckout = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.thumbnail
    });
    navigate('/checkout');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleAddComment = () => {
    if (newComment.content.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: 'Current User',
        rating: newComment.rating,
        content: newComment.content,
        date: new Date().toISOString().split('T')[0],
      };
      setComments([comment, ...comments]);
      setNewComment({ rating: 5, content: '' });
      toast.success('Review added successfully!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  return (
    <div className=" container mx-auto px-4 bg-white rounded-xl shadow-sm p-6">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-violet-600 hover:text-violet-700"
      >
        <ChevronLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-xl"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all
                  ${currentImageIndex === index 
                    ? 'ring-2 ring-violet-600 opacity-100' 
                    : 'hover:opacity-75'
                  }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                  className={`p-2 rounded-full transition-colors
                    ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Share2 size={20} />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
                          <Facebook size={20} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
                          <Twitter size={20} className="text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                          <Instagram size={20} className="text-pink-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-violet-600">${product.price}</div>
              <div className="text-green-600 bg-green-100 px-2 py-1 rounded">
                {product.discountPercentage}% OFF
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={index < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                  }
                />
              ))}
              <span className="text-gray-600">({product.rating})</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-gray-600">
                {product.stock} units available
              </span>
            </div>

            <div className="flex space-x-4">
  {addedToCart ? (
    <button
      onClick={handleViewCart}
      className="flex-1 bg-green-100 text-green-600 py-3 rounded-lg font-semibold 
        transition-colors flex items-center justify-center space-x-2"
    >
      <Check size={20} />
      <span>View Cart</span>
    </button>
  ) : (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-violet-100 text-violet-600 py-3 rounded-lg font-semibold 
        hover:bg-violet-200 transition-colors flex items-center justify-center space-x-2"
    >
      <ShoppingCart size={20} />
      <span>Add to Cart</span>
    </button>
  )}
  <button
    onClick={handleCheckout}
    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold 
      hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
  >
    <ShoppingBag size={20} />
    <span>Buy Now</span>
  </button>
</div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-600">Your Rating:</span>
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setNewComment({ ...newComment, rating: index + 1 })}
                className="focus:outline-none transition-colors"
              >
                <Star
                  size={24}
                  className={
                    index < newComment.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 hover:text-yellow-200'
                  }
                />
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              placeholder="Write your review..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 
                focus:ring-violet-600 transition-all"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                transition-colors flex items-center space-x-2"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold">{comment.user}</span>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < comment.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{comment.date}</span>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
