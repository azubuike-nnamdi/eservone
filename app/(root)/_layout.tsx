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
    const checkAuth = async () => {
      try {
        // Wait a bit to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));

        // console.log('Auth State:', {
        //   hasToken: !!accessToken,
        //   isAuthenticated,
        //   hasUser: !!user,
        //   userDetails: user
        // });

        if (!accessToken || !user || !isAuthenticated) {
          console.log('Auth check failed - redirecting to sign in');
          useAuthStore.getState().clearAuth();
          router.replace(SIGN_IN);
          return;
        }

        // console.log('Auth check passed');
      } catch (error) {
        console.log('Error checking auth:', error);
        useAuthStore.getState().clearAuth();
        router.replace(SIGN_IN);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [accessToken, isAuthenticated, user, router]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Don't render anything if not authenticated
  if (!accessToken || !user || !isAuthenticated) {
    return null;
  }

  // Render authenticated layout when authenticated
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}