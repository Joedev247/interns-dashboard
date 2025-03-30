// src/components/home/CategoriesSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shirt, 
  Watch, 
  Smartphone, 
  Laptop, 
  Home, 
  Gift, 
  Camera, 
  Car,
  ChevronRight,
  Sparkles,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Category } from '../../types/interfaces';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const categoryIcons: { [key: string]: React.ElementType } = {
    'fashion': Shirt,
    'watches': Watch,
    'smartphones': Smartphone,
    'laptops': Laptop,
    'home-decoration': Home,
    'gifts': Gift,
    'cameras': Camera,
    'automotive': Car,
  };

  const featuredCategories = [
    {
      name: 'Fashion & Style',
      description: 'Discover the latest trends',
      bgGradient: 'bg-gradient-to-br from-rose-100 to-pink-100',
      textColor: 'text-rose-900',
      iconColor: 'text-rose-500',
      borderColor: 'border-rose-200',
      icon: Shirt,
      items: '2.5k+ Products'
    },
    {
      name: 'Electronics',
      description: 'Latest gadgets and devices',
      bgGradient: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-200',
      icon: Smartphone,
      items: '1.8k+ Products'
    },
    {
      name: 'Home & Living',
      description: 'Make your space beautiful',
      bgGradient: 'bg-gradient-to-br from-emerald-100 to-green-100',
      textColor: 'text-emerald-900',
      iconColor: 'text-emerald-500',
      borderColor: 'border-emerald-200',
      icon: Home,
      items: '3k+ Products'
    },
    {
      name: 'Accessories',
      description: 'Complete your look',
      bgGradient: 'bg-gradient-to-br from-violet-100 to-purple-100',
      textColor: 'text-violet-900',
      iconColor: 'text-violet-500',
      borderColor: 'border-violet-200',
      icon: Watch,
      items: '1.2k+ Products'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
            Our Categories
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for.
            From fashion to electronics, we've got everything covered.
          </p>
        </div>

        {/* Featured Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredCategories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name.toLowerCase()}`}
              className={`group relative overflow-hidden rounded-3xl border ${category.borderColor} ${category.bgGradient} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-2xl ${category.bgGradient} mb-6`}>
                  <category.icon 
                    className={`w-8 h-8 ${category.iconColor}`}
                  />
                </div>
                <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>
                  {category.name}
                </h3>
                <p className={`${category.textColor} opacity-75 text-sm mb-4`}>
                  {category.description}
                </p>
                <span className={`text-sm font-medium ${category.textColor} opacity-90`}>
                  {category.items}
                </span>
                <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight className={`w-5 h-5 ${category.iconColor}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Categories Grid */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              All Categories
            </h3>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.slug.toLowerCase()] || Gift;
              return (
                <Link
                  key={index}
                  to={category.url}
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200`}>
                    <Icon className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-gray-900 font-medium group-hover:text-blue-600">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 1000) + 500} items
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          {[
            {
              icon: Sparkles,
              title: "Curated Collections",
              description: "Handpicked items from each category to ensure quality and style.",
              color: "blue"
            },
            {
              icon: Zap,
              title: "Easy Navigation",
              description: "Find what you need quickly with our organized category structure.",
              color: "green"
            },
            {
              icon: RefreshCw,
              title: "Regular Updates",
              description: "New items added regularly to keep up with the latest trends.",
              color: "purple"
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className={`bg-${benefit.color}-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-10 h-10 text-${benefit.color}-600`} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
