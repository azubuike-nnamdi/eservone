import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Button from "./common/button";
import { useState } from "react";
import { FormData } from "@/constants/types";
import { Ionicons } from '@expo/vector-icons';

export const SecurityStep = ({
  data,
  onNext
}: {
  data: FormData['security'],
  onNext: (security: FormData['security']) => void
}) => {
  const [password, setPassword] = useState(data.password);
  const [confirmPassword, setConfirmPassword] = useState(data.confirmPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (pass: string) => {
    const hasMinLength = pass.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return hasMinLength && hasLetter && hasNumber && hasSymbol;
  };

  const handleNext = () => {
    if (!validatePassword(password)) {
      setError("Password must meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    onNext({ password, confirmPassword });
  };

  return (
    <View>
      {/* Password Field */}
      <View className="mb-4">
        <Text className="text-base mb-2 text-black">Password</Text>
        <View className="relative">
          <TextInput
            className="w-full h-14 border border-gray-200 rounded-md px-4 pr-12"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry={!showPassword}
            placeholder="*********"
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
      <View className="mb-4">
        <Text className="text-base mb-2 text-black">Confirm password</Text>
        <View className="relative">
          <TextInput
            className="w-full h-14 border border-gray-200 rounded-md px-4 pr-12"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError("");
            }}
            secureTextEntry={!showConfirmPassword}
            placeholder="*********"
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
      <View className="mb-6">
        <View className="flex-row items-center">
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

      <Button
        onPress={handleNext}
        disabled={!password || !confirmPassword}
      >
        Continue
      </Button>
    </View>
  );
}; 