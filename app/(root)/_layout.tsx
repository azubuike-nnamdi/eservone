import { SIGN_IN } from '@/constants/routes';
import { useAuthStore } from '@/store/auth-store';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const { accessToken, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // If we have a token but not authenticated, stay on authenticated page
        if (accessToken && !isAuthenticated) {
          return;
        }

        // No token or not authenticated, redirect to sign in
        if (!accessToken || !isAuthenticated) {
          router.replace(SIGN_IN);
        }
      } catch (error) {
        console.log('Error checking auth state:', error);
        router.replace(SIGN_IN);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initializeAuth();
  }, [accessToken, isAuthenticated, router]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render authenticated layout when authenticated
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}