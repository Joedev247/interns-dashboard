import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the auth context
jest.mock('./contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('App Component', () => {
  test('redirects to login when not authenticated', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});