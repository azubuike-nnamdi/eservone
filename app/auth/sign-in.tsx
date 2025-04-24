import AuthHeader from '@/components/common/auth-header'
import Button from '@/components/common/button'
import { FORGOT_PASSWORD, SIGN_UP } from '@/constants/routes'
import { SignInPayload } from '@/constants/types'
import useSignInMutate from '@/hooks/mutation/useSignInMutate'
import { validateEmail } from '@/lib/helper'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from "expo-device"
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EMAIL_STORAGE_KEY = '@user_email'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { handleSignIn: handleUserLogin, isPending } = useSignInMutate()

  // Load saved email on component mount
  useEffect(() => {
    loadSavedEmail()
  }, [])

  const loadSavedEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem(EMAIL_STORAGE_KEY)
      if (savedEmail) {
        setEmail(savedEmail)
      }
    } catch (error) {
      console.log('Error loading saved email:', error)
    }
  }

  const handleEmailChange = async (text: string) => {
    setEmail(text);
    setIsValidEmail(true);
    setErrorMessage("");
    // Update stored email whenever it changes
    await AsyncStorage.setItem(EMAIL_STORAGE_KEY, text)
  };

  const handleSignIn = async () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);

    if (!isValid) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (email && password) {
      // Save email to AsyncStorage when signing in
      await AsyncStorage.setItem(EMAIL_STORAGE_KEY, email)


      const payload: SignInPayload = {
        emailAddress: email,
        password: password,
        deviceId: Device.modelName
      }
      handleUserLogin(payload)
    }
  }

  const handleCreateAccount = () => {
    router.push(SIGN_UP)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleForgotPassword = () => {
    router.push(FORGOT_PASSWORD)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center">
          <AuthHeader title="Sign in" />

          {/* Form */}
          <View className="w-full px-6">
            {/* Email Field */}
            <Text className="text-base mb-2 text-black">
              Your email address
            </Text>
            <TextInput
              className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black mb-4"
              placeholder="example@gmail.com"
              placeholderTextColor="#CCCCCC"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="left"
            />

            {!isValidEmail && (
              <Text className="text-danger text-sm mb-2 text-center">
                {errorMessage}
              </Text>
            )}
            {/* Password Field */}
            <Text className="text-base mb-2 text-black">
              Password
            </Text>
            <View className="relative w-full">
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
                placeholder="********"
                placeholderTextColor="#CCCCCC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textAlign="left"
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#CCCCCC"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="mt-2 self-start" onPress={handleForgotPassword}>
              <Text className="text-primary-300 text-sm font-medium">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <View className="w-full px-6 mt-8">
            <Button
              type="submit"
              disabled={isPending || !email || !password}
              loading={isPending}
              loadingText="Signing in..."
              onPress={handleSignIn}
            >
              Sign in
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