import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Package, ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const ProductForm = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const response = await axios.get(`https://dummyjson.com/products/${id}`);
                    setProduct(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`https://dummyjson.com/products/${id}`, product);
            } else {
                await axios.post('https://dummyjson.com/products/add', product);
            }
            navigate('/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="mb-8 flex justify-between items-center">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
                    onClick={() => navigate('/products')}
                >
                    <ChevronLeft size={18} className="mr-2" /> Back to Products
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={product.title}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="price" className="block text-gray-600 font-medium mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="discountPercentage" className="block text-gray-600 font-medium mb-2">
                                Discount Percentage
                            </label>
                            <input
                                type="number"
                                id="discountPercentage"
                                name="discountPercentage"
                                value={product.discountPercentage}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">
                                Brand
                            </label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={product.brand}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-gray-600 font-medium mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="thumbnail" className="block text-gray-600 font-medium mb-2">
                                Thumbnail
                            </label>
                            <input
                                type="text"
                                id="thumbnail"
                                name="thumbnail"
                                value={product.thumbnail}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-lg px-4 py-2 focus:border-violet-600 focus:ring-violet-600"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
                            >
                                {id ? 'Update Product' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductForm;
