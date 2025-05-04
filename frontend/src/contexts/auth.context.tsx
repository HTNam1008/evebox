import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useSession } from 'next-auth/react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/ErrorResponse';
import createApiClient from '@/services/apiClient';

interface JwtPayload {
  accessToken: string;
  id: string;
  email: string;
  role: string;
  refreshToken: string;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.accessToken) {
      const decoded = jwtDecode<JwtPayload>(session.user.accessToken);
      setUser({ ...decoded, accessToken: session.user.accessToken });
      setIsAuthenticated(true);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedUser = jwtDecode<JwtPayload>(token);
          setUser({ ...decodedUser, accessToken: token });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Invalid token');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    }
  }, [session, status]);  

  const login = (token: string, refresh_token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh-token', refresh_token);

    try {
      const decodedUser = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);
      setUser({ ...decodedUser, accessToken: token });
    } catch {
      console.error('Invalid token');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const getUserInfo = async (): Promise<UserInfo | null> => {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
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

export const useAuth = () => {
  return useContext(AuthContext);
};