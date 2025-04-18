import { SIGN_IN } from '@/constants/routes';
import { useAuth } from '@/context/auth-context';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const { token, isLoading, saveToken } = useAuth();
  const router = useRouter();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Always check for persisted token on mount
        const persistedToken = await SecureStore.getItemAsync('jwt_token');

        if (persistedToken) {
          // If we have a persisted token but no token in context, restore it
          if (!token) {
            await saveToken(persistedToken);
          }
          // Stay on authenticated page
          return;
        }

        // No token found, redirect to sign in
        if (!token) {
          router.replace(SIGN_IN);
        }
      } catch (error) {
        console.log('Error checking persisted token:', error);
        if (!token) {
          router.replace(SIGN_IN);
        }
      } finally {
        setIsCheckingToken(false);
      }
    };

    initializeAuth();
  }, [token, router, saveToken]);


  // Show loading state while checking auth
  if (isLoading || isCheckingToken) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render authenticated layout when token exists
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}