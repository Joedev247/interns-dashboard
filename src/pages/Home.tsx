// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Products from '../components/home/CategoriesSection';
import Footer from '../components/layout/Footer';
import { Product, Category, ApiResponse } from '../types/interfaces';
import CategoriesSection from '../components/home/CategoriesSection';
import TestimonialAndFAQ from '../components/home/TestimonialSection';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get<ApiResponse>('https://dummyjson.com/products?limit=8'),
          axios.get<Category[]>('https://dummyjson.com/products/categories')
        ]);

        if (productsRes.data && Array.isArray(productsRes.data.products)) {
          setFeaturedProducts(productsRes.data.products);
        }

        if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturedProducts
        products={featuredProducts}
        isLoading={isLoading}
        error={error}
      />
      <CategoriesSection categories={[]} />
      <TestimonialAndFAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
