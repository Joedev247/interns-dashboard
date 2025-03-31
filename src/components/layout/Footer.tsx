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

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/' },
      { name: 'Careers', href: '/' },
      { name: 'Store Locations', href: '/' },
      { name: 'Our Blog', href: '/' },
      { name: 'Press & Media', href: '/' }
    ],
    customerService: [
      { name: 'Contact Us', href: '/' },
      { name: 'Shipping & Returns', href: '/' },
      { name: 'FAQ', href: '/' },
      { name: 'Size Guide', href: '/' },
      { name: 'Track Order', href: '/' }
    ],
    quickLinks: [
      { name: 'New Arrivals', href: '/' },
      { name: 'Best Sellers', href: '/' },
      { name: 'Sale', href: '/' },
      { name: 'Gift Cards', href: '/' },
      { name: 'Rewards Program', href: '/' }
    ]
  };

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { Icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { Icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { Icon: Youtube, href: '#', label: 'Youtube', color: '#FF0000' }
  ];

  const features = [
    { Icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
    { Icon: Lock, title: 'Secure Payment', description: '100% secure payment' },
    { Icon: Clock, title: '24/7 Support', description: 'Dedicated support' },
    { Icon: CreditCard, title: 'Easy Returns', description: '30-day returns' }
  ];

  const contactInfo = [
    { Icon: Phone, text: '(+237) 6 54-58-34-54', href: 'tel:(+237) 658543454' },
    { Icon: Mail, text: 'support@stylestore.com', href: 'mailto:support@stylestore.com' },
    { Icon: MapPin, text: '237 Fashion Street, Douala', href: 'https://maps.google.com' }
  ];

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

      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">StyleStore</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Your premier destination for fashion and lifestyle products. 
                We bring you the latest trends with uncompromising quality.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    aria-label={label}
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Customer Service</h4>
              <ul className="space-y-4">
                {footerLinks.customerService.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
              <ul className="space-y-6">
                {contactInfo.map(({ Icon, text, href }) => (
                  <li key={text} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm">
                  © {currentYear} StyleStore. All rights reserved.
                </p>
                <span className="text-gray-600">•</span>
                <p className="text-gray-400 text-sm">
                  Made with ❤️ in by Joedev
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;