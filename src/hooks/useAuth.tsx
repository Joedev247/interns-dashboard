// src/hooks/useAuth.ts
import { useState } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export const useAuth = () => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login(username, password);
      auth.login(response.user);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return {
    ...auth,
    login,
    loading,
    error,
  };
};
