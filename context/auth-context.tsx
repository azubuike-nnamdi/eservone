import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

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
      console.log('Loaded token from storage:', storedToken ? 'Token exists' : 'No token');

      if (!storedToken || storedToken === 'null' || storedToken === 'undefined') {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
      } else {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading token:', error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToken = async (newToken: string | null) => {
    try {
      // Clear any existing token first
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      if (newToken && newToken !== 'null' && newToken !== 'undefined') {
        // Save the new token
        await SecureStore.setItemAsync(TOKEN_KEY, newToken);
        // console.log('New token saved successfully');
        setToken(newToken);
      } else {
        // console.log('Token cleared successfully');
        setToken(null);
      }
    } catch (error) {
      console.error('Error setting token:', error);
      setToken(null);
    }
  };

  const clearToken = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, isLoading, clearToken }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
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