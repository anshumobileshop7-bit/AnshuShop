import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('anshu_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('anshu_admin_token');
      const storedUser = localStorage.getItem('anshu_admin_user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setAdmin(JSON.parse(storedUser));
          // Optionally verify with /api/admin/me
          const res = await api.get('/admin/me');
          if (res.data?.data) {
            setAdmin(res.data.data);
            localStorage.setItem('anshu_admin_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/admin/login', { email, password });
    if (res.data?.success) {
      const { token: jwtToken, ...userData } = res.data.data;
      setToken(jwtToken);
      setAdmin(userData);
      localStorage.setItem('anshu_admin_token', jwtToken);
      localStorage.setItem('anshu_admin_user', JSON.stringify(userData));
      return res.data;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('anshu_admin_token');
    localStorage.removeItem('anshu_admin_user');
  };

  const updateProfile = (updatedData) => {
    setAdmin((prev) => ({ ...prev, ...updatedData }));
    localStorage.setItem('anshu_admin_user', JSON.stringify({ ...admin, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
