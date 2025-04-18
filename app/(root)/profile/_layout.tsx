import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account-preference" />
      <Stack.Screen name="account-security" />
      <Stack.Screen name="business-profile" />
      <Stack.Screen name="certificates" />
      <Stack.Screen name="upload-certificate" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="manage-services" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="profile-information" />
      <Stack.Screen name="support" />
      <Stack.Screen name="terms-of-services" />
    </Stack>
  )
}