import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Users as UsersIcon,
  ShoppingCart,
  ChevronLeft,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { cn } from '../../lib/utils';
import Dashboard from '../../pages/Dashboard';
import  Products  from '../../pages/Products';
import Posts from '../../pages/Posts';
import SettingsPage from '../../pages/Settings';
import UsersPage from '../../pages/user';
import Comments from '../../pages/Comments';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import ProductDetails from '../../pages/ProductDetails';
import Checkout from '../../pages/Checkout';

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}



const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { logout } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const handleProductSelect = (id: number) => {
    setSelectedProductId(id);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };


  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      component: <Dashboard />
    },
    {
      id: 'products',
      title: 'Products',
      icon: <Package size={20} />,
      component: selectedProductId ? (
        <ProductDetails productId={selectedProductId} onBack={handleBackToProducts} />
      ) : (
        <Products onProductSelect={handleProductSelect} />
      )
    },
    {
      id: 'posts',
      title: 'Posts',
      icon: <FileText size={20} />,
      component: <Posts />
    },
    {
      id: 'comments',
      title: 'Comments',
      icon: <MessageSquare size={20} />,
      component: <Comments />
    },
    {
      id: 'users',
      title: 'Users',
      icon: <UsersIcon size={20} />,
      component: <UsersPage />
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <SettingsIcon size={20} />,
      component: <SettingsPage />
    },
    // {
    //   id: 'checkout',
    //   title: 'Checkout',
    //   icon: <ShoppingCart size={20} />,
    //   component: <Checkout />
    // },
  ];

  const [activeItem, setActiveItem] = useState(navItems[0].id);
  const currentItem = navItems.find(item => item.id === activeItem) || navItems[0];

  return (
    <ProtectedRoute>
      <div className="h-screen flex relative bg-gray-50">
        <button
          className="lg:hidden fixed mt-3 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div
          className={cn(
            "fixed lg:static lg:block h-full z-40 transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <Sidebar
            collapsed={collapsed}
            className={cn(
              "h-full bg-white border-r border-gray-200 transition-all duration-300",
              collapsed ? "w-20" : "w-64"
            )}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b">
              {!collapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:block hidden"
                aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {collapsed ? <MenuIcon size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Menu>
                {navItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    active={activeItem === item.id}
                    icon={item.icon}
                    onClick={() => {
                      setActiveItem(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "hover:bg-violet-50 transition-colors",
                      activeItem === item.id && "bg-violet-50 text-violet-600"
                    )}
                  >
                    <span className="text-sm">{item.title}</span>
                    {item.id === 'checkout' && cartCount > 0 && (
                      <span className="ml-2 bg-violet-100 text-violet-600 px-2 py-1 rounded-full text-xs">
                        {cartCount}
                      </span>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <div className="border-t">
              <Menu>
                <MenuItem
                  icon={<LogOut size={20} />}
                  className="text-red-600 hover:bg-red-50 transition-colors"
                  onClick={logout}
                >
                  <span className="text-sm">Logout</span>
                </MenuItem>
              </Menu>
            </div>
          </Sidebar>
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="px-4 sm:px-6 lg:px-8 py-8 pt-16 lg:pt-8 w-full max-w-7xl mx-auto">
              {currentItem.component}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
