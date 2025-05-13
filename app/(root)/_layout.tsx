import { SIGN_IN } from '@/constants/routes';
import { useAuthStore } from '@/store/auth-store';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
  const { accessToken, isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Auth State:', { accessToken, isAuthenticated, hasUser: !!user });

        // If we have no token, no user, or not authenticated, redirect to sign in
        if (!accessToken || !user || !isAuthenticated) {
          console.log('Redirecting to sign in - Auth check failed');
          router.replace(SIGN_IN);
          return;
        }

        console.log('Auth check passed - staying on authenticated page');
      } catch (error) {
        console.log('Error checking auth state:', error);
        router.replace(SIGN_IN);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initializeAuth();
  }, [accessToken, isAuthenticated, user, router]);

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