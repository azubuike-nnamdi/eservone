import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'jwt_token';

type AuthContextType = {
  token: string | null;
  saveToken: (token: string | null) => Promise<void>;
  isLoading: boolean;
  clearToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      setToken(storedToken);
    } catch (error) {
      console.error('Error loading token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToken = async (newToken: string | null) => {
    try {
      if (newToken) {
        await SecureStore.setItemAsync(TOKEN_KEY, newToken);
        setToken(newToken);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  };

  const clearToken = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      saveToken(null);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, isLoading, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 