import { SIGN_IN } from "@/constants/routes";
import TanstackProvider from "@/context/tanstack-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import './global.css';
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Check if user has completed onboarding
        const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
        if (onboardedStatus === 'true') {
          setShouldRedirect(true);
        }
        setIsReady(true);
        // Hide splash screen after everything is set up
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady && shouldRedirect) {
      // Add a small delay to ensure the component is mounted
      const timer = setTimeout(() => {
        router.replace(SIGN_IN);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady, shouldRedirect]);

  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <TanstackProvider>
      <StatusBar barStyle={'dark-content'} />
      <Slot />
    </TanstackProvider>
  );
}
