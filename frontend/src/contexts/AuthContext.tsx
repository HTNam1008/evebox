import { createContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/router';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  // ... các trường khác tùy thuộc vào token của bạn
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// src/contexts/AuthContext.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode<JwtPayload>(token);
        setIsAuthenticated(true);
        setUser(decodedUser);
      } catch {
        console.error('Invalid token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
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

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

