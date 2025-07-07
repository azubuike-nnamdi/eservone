import AuthHeader from '@/components/common/auth-header'
import Button from '@/components/common/button'
import { SIGN_IN } from '@/constants/routes'
import InitializeEmail from '@/hooks/mutation/initializeEmail'
import { validateEmail } from '@/lib/helper'
import { useOnboardingStore } from '@/store/onboarding-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  const { data, setEmail } = useOnboardingStore();
  const [emailInput, setEmailInput] = useState(data.email);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleInitializeEmail, isPending } = InitializeEmail();

  // Update local state when store data changes
  useEffect(() => {
    setEmailInput(data.email);
  }, [data.email]);

  const handleEmailChange = (text: string) => {
    setEmailInput(text);
    setIsValidEmail(true);
    setErrorMessage("");
  };

  const handleContinue = async () => {
    const isValid = validateEmail(emailInput);
    setIsValidEmail(isValid);

    if (!isValid) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      // Store the email in onboarding store
      setEmail(emailInput);

      // Store the email before making the API call
      await AsyncStorage.setItem('verify_email', emailInput);
      await AsyncStorage.setItem('flow_type', 'signup');

      handleInitializeEmail(emailInput);
    } catch (error: any) {
      console.log('Sign-up error:', error);
      setIsValidEmail(false);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSignIn = async () => {
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
              className={`w-full h-14 border ${isValidEmail ? 'border-gray-200' : 'border-danger'} rounded-md px-4 text-base text-black`}
              placeholder="sample@gmail.com"
              placeholderTextColor="#CCCCCC"
              value={emailInput}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="center"
            />

            {!isValidEmail && (
              <Text className="text-danger text-sm mb-2 text-center">
                {errorMessage}
              </Text>
            )}
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Please provide a valid email address.{'\n'}
              We'll send you a verification code
            </Text>
          </View>

          {/* Continue Button */}
          <View className="w-full px-6 mt-24">
            <Button
              type="submit"
              disabled={isPending || !emailInput}
              loading={isPending}
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
