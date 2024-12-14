import { createContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/errorResponse';
import apiClient from '../services/apiClient';
import { object } from 'yup';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  // ... các trường khác tùy thuộc vào token của bạn
}

interface UserInfo {
  id: string;
  name: string; 
  email: string;
  role: number;
  phone: string; 
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (token: string, refresh_token: string) => void;
  logout: () => void;
  getUserInfo: () => Promise<UserInfo | null>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  getUserInfo: async () => null,
});

// src/contexts/AuthContext.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();


  useEffect(() =>  {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode<JwtPayload>(token);
        setIsAuthenticated(true);
        setUser(decodedUser);
      } catch (err){
        if (axios.isAxiosError(err)) {
          const error = err as AxiosError<ErrorResponse>;
          console.error(error.response?.data?.message);
        } else {
          console.error('Invalid token');
        }
        console.error('Invalid token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const login = (token: string, refresh_token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh-token', refresh_token);

    try {
      const decodedUser = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);
      setUser(decodedUser);
    } catch {
      console.error('Invalid token');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
      const response = await apiClient.get('/api/user/me');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getUserInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

