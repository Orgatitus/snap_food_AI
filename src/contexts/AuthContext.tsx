import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, HealthCondition } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateHealthCondition: (condition: HealthCondition) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAdmin: boolean;
  isClinician: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const stored = localStorage.getItem('snapfood_user');
      const token = localStorage.getItem('snapfood_token');
      
      if (stored && token) {
        const userData = JSON.parse(stored);
        // In production, validate token with backend
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('snapfood_user');
      localStorage.removeItem('snapfood_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo users with realistic data
      let userData: User;
      const now = new Date().toISOString();
      
      if (email === 'admin@snapfood.com') {
        userData = {
          id: '1',
          email,
          name: 'Dr. Amina Kano',
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?w=150',
          healthCondition: 'normal',
          createdAt: '2024-01-15T10:00:00Z',
          lastLogin: now
        };
      } else if (email === 'clinician@snapfood.com') {
        userData = {
          id: '2',
          email,
          name: 'Dr. Chidi Okafor',
          role: 'clinician',
          avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?w=150',
          healthCondition: 'normal',
          createdAt: '2024-02-01T09:30:00Z',
          lastLogin: now
        };
      } else {
        userData = {
          id: '3',
          email,
          name: 'Fatima Ibrahim',
          role: 'user',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
          healthCondition: 'diabetic',
          createdAt: '2024-03-10T14:20:00Z',
          lastLogin: now
        };
      }
      
      const token = `mock_jwt_token_${userData.id}_${Date.now()}`;
      
      localStorage.setItem('snapfood_user', JSON.stringify(userData));
      localStorage.setItem('snapfood_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'user',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
        healthCondition: 'normal',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      const token = `google_jwt_token_${userData.id}`;
      
      localStorage.setItem('snapfood_user', JSON.stringify(userData));
      localStorage.setItem('snapfood_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const userData: User = {
        id: 'user_' + Date.now(),
        email,
        name,
        role: 'user',
        healthCondition: 'normal',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      const token = `jwt_token_${userData.id}`;
      
      localStorage.setItem('snapfood_user', JSON.stringify(userData));
      localStorage.setItem('snapfood_token', token);
      setUser(userData);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('snapfood_user');
    localStorage.removeItem('snapfood_token');
    setUser(null);
  };

  const updateHealthCondition = async (condition: HealthCondition) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, healthCondition: condition };
      localStorage.setItem('snapfood_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to update health condition');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('snapfood_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateHealthCondition,
    updateProfile,
    isAdmin: user?.role === 'admin',
    isClinician: user?.role === 'clinician' || user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}