import { Stack } from "expo-router";

export default function ServiceCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      {/* <Stack.Screen name="service-creation" /> */}
      <Stack.Screen name="verify-identity" />
      <Stack.Screen name="create-service" />
      <Stack.Screen name="identification-confirmation" />
      <Stack.Screen name="service-published" />
    </Stack>
  )
}