import { Stack } from "expo-router";

export default function ServiceCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="service-creation" />
      <Stack.Screen name="verify-details" />
    </Stack>
  )
}