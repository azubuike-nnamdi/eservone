import { SIGN_IN } from '@/constants/routes';
import { useAuth } from '@/context/auth-context'
import { ActivityIndicator } from 'react-native';
import { Redirect, Slot } from 'expo-router'
import { View } from 'react-native';

export default function AppLayout() {
  const { token, isLoading } = useAuth()

  console.log('Root layout - Token state:', { token: token ? 'Token exists' : 'No token', isLoading });

  // Show loading state while we're determining the auth state
  if (isLoading) {
    return <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }

  // Only redirect if we're certain there's no token
  if (!token) {
    console.log('Redirecting to sign in - no token found');
    return <Redirect href={SIGN_IN} />
  }

  // For authenticated users, render the slot which will show the appropriate child route
  return <Slot />
}
