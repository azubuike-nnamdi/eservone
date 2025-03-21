import { router, Slot, SplashScreen, Stack } from "expo-router";
import './global.css'
import TanstackProvider from "@/context/tanstack-provider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_IN } from "@/constants/routes";

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
      router.replace(SIGN_IN);
    }
  }, [isReady, shouldRedirect]);

  if (!isReady) {
    return null;
  }

  return (
    <TanstackProvider>
      <Slot />
    </TanstackProvider>
  );
}
