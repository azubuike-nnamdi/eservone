import { SIGN_IN } from '@/constants/routes';
import { useAuth } from '@/context/auth-context';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const { token, isLoading, saveToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isLoading) return; // Wait until auth context is ready

      // Check for persisted token if no token exists
      if (!token) {
        try {
          const persistedToken = await SecureStore.getItemAsync('jwt_token');
          if (persistedToken) {
            await saveToken(persistedToken);
            return; // Token found and saved, stay on authenticated page
          }
          // No token found, redirect to sign in
          router.replace(SIGN_IN);
        } catch (error) {
          console.log('Error checking persisted token:', error);
          router.replace(SIGN_IN); // On error, safely redirect to sign in
        }
      }
    };

    initializeAuth();
  }, [token, isLoading, router, saveToken]);

  // Show loading state while checking auth
  if (isLoading) {
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