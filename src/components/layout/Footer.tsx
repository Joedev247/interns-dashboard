import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  CreditCard,
  Lock,
  Truck,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // const footerLinks = {
  //   company: [
  //     { name: 'About Us', href: '/' },
  //     { name: 'Careers', href: '/' },
  //     { name: 'Store Locations', href: '/' },
  //     { name: 'Our Blog', href: '/' },
  //     { name: 'Press & Media', href: '/' }
  //   ],
  //   customerService: [
  //     { name: 'Contact Us', href: '/' },
  //     { name: 'Shipping & Returns', href: '/' },
  //     { name: 'FAQ', href: '/' },
  //     { name: 'Size Guide', href: '/' },
  //     { name: 'Track Order', href: '/' }
  //   ],
  //   quickLinks: [
  //     { name: 'New Arrivals', href: '/' },
  //     { name: 'Best Sellers', href: '/' },
  //     { name: 'Sale', href: '/' },
  //     { name: 'Gift Cards', href: '/' },
  //     { name: 'Rewards Program', href: '/' }
  //   ]
  // };

  // const socialLinks = [
  //   { Icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
  //   { Icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
  //   { Icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
  //   { Icon: Youtube, href: '#', label: 'Youtube', color: '#FF0000' }
  // ];

  const features = [
    { Icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
    { Icon: Lock, title: 'Secure Payment', description: '100% secure payment' },
    { Icon: Clock, title: '24/7 Support', description: 'Dedicated support' },
    { Icon: CreditCard, title: 'Easy Returns', description: '30-day returns' }
  ];

  // const contactInfo = [
  //   { Icon: Phone, text: '(+237) 6 54-58-34-54', href: 'tel:(+237) 658543454' },
  //   { Icon: Mail, text: 'support@stylestore.com', href: 'mailto:support@stylestore.com' },
  //   { Icon: MapPin, text: '237 Fashion Street, Douala', href: 'https://maps.google.com' }
  // ];

  return (
    <footer>
      <div className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ Icon, title, description }) => (
              <div key={title} className="flex items-center space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">{title}</h4>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;