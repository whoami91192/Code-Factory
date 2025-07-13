import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export type User = {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  active: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  address?: string;
  phone?: string;
  postalCode?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount if token exists
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          
          const userObj = {
            ...res.data,
            avatarUrl: res.data.avatarUrl || '',
            address: res.data.address || '',
            phone: res.data.phone || '',
            postalCode: res.data.postalCode || '',
          };
          
          setUser(userObj);
        } catch (err) {
          // Clear invalid token
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      } else {
        // Also clear any stale user data
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    };
    fetchCurrentUser();
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await api.post('/auth/login', { username, password });
    const { accessToken, refreshToken } = res.data;
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Always fetch the current user from backend to get the latest info (role, etc)
    const userRes = await api.get('/auth/me');
    const userObj: User = {
      ...userRes.data,
      avatarUrl: userRes.data.avatarUrl || '',
      address: userRes.data.address || '',
      phone: userRes.data.phone || '',
      postalCode: userRes.data.postalCode || '',
    };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await api.post('/auth/signup', { username, email, password });
    const { accessToken, userId, username: userUsername, email: userEmail, role, avatarUrl, address, phone, postalCode } = res.data;
    
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    
    // Create user object from response
    const userObj: User = {
      id: userId,
      username: userUsername,
      email: userEmail,
      role,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatarUrl: avatarUrl || '',
      address: address || '',
      phone: phone || '',
      postalCode: postalCode || '',
    };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAuthenticated, isAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 