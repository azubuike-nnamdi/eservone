import AuthHeader from '@/components/common/auth-header'
import Button from '@/components/common/button'
import { SIGN_IN, VERIFY_EMAIL } from '@/constants/routes'
import { validateEmail } from '@/lib/helpler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(true); // Reset validation on change
    setErrorMessage("");
  };

  const handleContinue = async () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);

    if (!isValid) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      // Store email in AsyncStorage
      await AsyncStorage.setItem('forgot_password_email', email);

      //STORE FLOW TYPE
      await AsyncStorage.setItem('flow_type', 'signup');

      // Simulate API call
      setTimeout(() => {
        console.log("Processing sign up for:", email);
        setIsLoading(false);
        router.push(VERIFY_EMAIL);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSignIn = () => {
    router.push(SIGN_IN);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 items-center justify-center">
          <AuthHeader title="Create your free account" />

          {/* Form */}
          <View className="w-full px-6">
            <Text className="text-base mb-2 text-black text-center">
              Your email address
            </Text>
            <TextInput
              className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black"
              placeholder="sample@gmail.com"
              placeholderTextColor="#CCCCCC"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="center"
            />

            <Text className="text-gray-400 text-sm mt-2 text-center">
              Please provide a valid email address.{'\n'}
              We'll send you a message
            </Text>
          </View>

          {/* Continue Button */}
          <View className="w-full px-6 mt-24">
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loadingText="Verifying email..."
              onPress={handleContinue}
            >
              Continue
            </Button>
          </View>

          {/* Sign In Link */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600 text-sm">
              Already have an account?
            </Text>
            <TouchableOpacity className="ml-1" onPress={handleSignIn}>
              <Text className="text-primary-300 text-sm font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
