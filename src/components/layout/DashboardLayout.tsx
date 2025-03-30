// src/components/layouts/DashboardLayout.tsx
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  Settings as Set,
  LogOut,
  Users as User,
  ShoppingCart,
  ChevronLeft,
  Menu as MenuIcon
} from 'lucide-react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { cn } from '../../lib/utils';
import Dashboard from '../../pages/Dashboard';
import Products from '../../pages/Products';
import Posts from '../../pages/Posts';
import Settings from '../../pages/Settings';
import Users from '../../pages/users';
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
  selectedId?: number; // Add this
}




const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Placeholder components for each section
  const DashboardContent = () => <Dashboard />;
  const PostsContent = () => <Posts />;
  const CommentsContent = () => <Comments />;
  const UsersContent = () => <Users />;
  const SettingsContent = () => <Settings />;

  const handleProductSelect = (id: number) => {
    setSelectedProductId(id);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} />, component: <DashboardContent /> },
    {
      id: 'products', title: 'Products', icon: <Package size={20} />, component: selectedProductId ? (
        <ProductDetails productId={selectedProductId} onBack={handleBackToProducts} />
      ) : (
        <Products />
      )
    },
    { id: 'posts', title: 'Posts', icon: <FileText size={20} />, component: <PostsContent /> },
    { id: 'comments', title: 'Comments', icon: <MessageSquare size={20} />, component: <CommentsContent /> },
    { id: 'users', title: 'Users', icon: <User size={20} />, component: <UsersContent /> },
    { id: 'settings', title: 'Settings', icon: <Set size={20} />, component: <SettingsContent /> },
    { id: 'checkout', title: 'Checkout', icon: <ShoppingCart size={20} />, component: <Checkout /> },
  ];  const [activeItem, setActiveItem] = useState(navItems[0].id);

  const currentItem = navItems.find(item => item.id === activeItem) || navItems[0];

  return (
    <ProtectedRoute>

      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          className={cn(
            "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20",
            collapsed ? "w-20" : "w-64"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b">
              {!collapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {collapsed ? <MenuIcon size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1">
              <Menu>
                {navItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    active={activeItem === item.id}
                    icon={item.icon}
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      "hover:bg-blue-50 cursor-pointer",
                      activeItem === item.id && "bg-blue-50 text-blue-600"
                    )}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            {/* Logout Button */}
            <div className="border-t">
              <Menu>
                <MenuItem
                  icon={<LogOut size={20} />}
                  className="text-red-600 hover:bg-red-50 cursor-pointer"
                  onClick={() => {
                    // Add logout logic here
                    logout();
                    console.log('Logout clicked');
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Fixed Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          {currentItem.title}
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            onClick={() => setActiveItem('checkout')}
          >
            <ShoppingCart size={20} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-medium">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
              {currentItem.component}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>

  );
};

export default DashboardLayout;
