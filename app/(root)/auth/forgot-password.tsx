import AuthHeader from "@/components/common/auth-header";
import Button from "@/components/common/button";
import { SIGN_UP } from "@/constants/routes";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(true); // Reset validation on change
  };

  const handleCreateAccount = () => {
    router.push(SIGN_UP)
  }

  const handleForgetPassword = () => {
    if (email) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Signing in with:", email)
        setIsLoading(false)
        // Navigate to home or dashboard after successful login
      }, 2000)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center">
          <AuthHeader title="Forgot Password" />

          {/* Form */}
          <View className="w-full px-6">
            {/* Email Field */}
            <Text className="text-base mb-2 text-black text-center">
              Your email address
            </Text>
            <TextInput
              className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black mb-4"
              placeholder="example@gmail.com"
              placeholderTextColor="#CCCCCC"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="left"
            />

            <Text className="text-gray-400 text-sm mt-2 text-center">
              Please provide a valid email address.{'\n'}
              We'll send you a message
            </Text>
          </View>

          {/* Sign In Button */}
          <View className="w-full px-6 mt-8">
            <Button
              type="submit"
              disabled={isLoading || !email}
              loading={isLoading}
              loadingText="Submitting..."
              onPress={handleForgetPassword}
            >
              Continue
            </Button>
          </View>

          {/* Create Account Link */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600 text-sm">
              New to eServe?
            </Text>
            <TouchableOpacity className="ml-1" onPress={handleCreateAccount}>
              <Text className="text-primary-300 text-sm font-medium">
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}