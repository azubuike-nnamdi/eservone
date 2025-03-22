import AuthHeader from "@/components/common/auth-header";
import Button from "@/components/common/button";
import { VERIFY_EMAIL, SIGN_UP } from "@/constants/routes";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "@/lib/helpler";
import useForgotPassword from "@/hooks/mutation/useForgotPassword";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleForgotPassword, isPending } = useForgotPassword()



  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(true);
    setErrorMessage("");
  };

  const handleCreateAccount = () => {
    router.push(SIGN_UP)
  }

  const handleForgetPassword = async () => {
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
      await AsyncStorage.setItem('flow_type', 'forgot_password');

      handleForgotPassword({ email })
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  const handleDeleteStorage = () => {
    AsyncStorage.clear()
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
              className={`w-full h-14 border ${isValidEmail ? 'border-gray-200' : 'border-danger'} rounded-md px-4 text-base text-black mb-4`}
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

            <Text className="text-gray-400 text-sm mt-2 text-center">
              Please provide a valid email address.{'\n'}
              We'll send you a message
            </Text>
          </View>

          <TouchableOpacity onPress={handleDeleteStorage}>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              delete
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <View className="w-full px-6 mt-8">
            <Button
              type="submit"
              disabled={isPending || !email || !isValidEmail}
              loading={isPending}
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