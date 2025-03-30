// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { CartProvider } from './contexts/CartContext';
// import DashboardLayout from './components/layouts/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <CartProvider>

        <App />
        </CartProvider>

      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
