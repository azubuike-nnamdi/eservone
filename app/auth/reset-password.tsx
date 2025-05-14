import AuthHeader from "@/components/common/auth-header";
import Button from "@/components/common/button";
import useResetPassword from "@/hooks/mutation/useResetPassword";
import { validatePassword } from "@/lib/helper";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ResetPassword() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { handleResetPassword: resetPassword, isPending } = useResetPassword()
  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('forgot_password_email');
        setEmail(storedEmail);
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };

    getEmail();
  }, []);


  const handleResetPassword = async () => {
    setError("");

    if (!validatePassword(password)) {
      setError("Password must meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    resetPassword({
      newPassword: password,
    })
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          <AuthHeader title="Reset your password" />

          {/* Email Display */}
          {email && (
            <Text className="text-gray-400 text-lg text-center mb-8">
              {email}
            </Text>
          )}

          {/* New Password Field */}
          <View className="w-full mb-4">
            <Text className="text-base mb-2 text-black">
              New password
            </Text>
            <View className="relative w-full">
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
                placeholder="Enter new password"
                placeholderTextColor="#CCCCCC"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#CCCCCC"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View className="w-full mb-4">
            <Text className="text-base mb-2 text-black">
              Confirm password
            </Text>
            <View className="relative w-full">
              <TextInput
                className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
                placeholder="Confirm new password"
                placeholderTextColor="#CCCCCC"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#CCCCCC"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View className="w-full mb-8">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle-outline" size={20} color="#CCCCCC" />
              <Text className="text-gray-400 text-sm ml-2">
                Your password must be at least 8 character long, with a mix of letters, numbers, and symbols.
              </Text>
            </View>
            {error ? (
              <Text className="text-danger text-sm mt-2">
                {error}
              </Text>
            ) : null}
          </View>

          {/* Reset Button */}
          <View className="w-full">
            <Button
              type="submit"
              disabled={isPending || !password || !confirmPassword}
              loading={isPending}
              loadingText="Resetting password..."
              onPress={handleResetPassword}
            >
              Reset password
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}