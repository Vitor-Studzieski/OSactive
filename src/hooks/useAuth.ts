import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timeout = setTimeout(() => {
      setUser(mockUsers[1]); // Default to supervisor user
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};