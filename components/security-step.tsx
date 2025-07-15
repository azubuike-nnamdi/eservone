import { passwordStrength, validatePassword } from "@/lib/helper";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "./common/button";
import PasswordRequirements from "./common/PasswordRequirements";

export const SecurityStep = ({
  onNext
}: {
  onNext: (security: { password: string; confirmPassword: string; }) => void
}) => {
  const { data, setSecurity } = useOnboardingStore();
  const [password, setPassword] = useState(data.security.password);
  const [confirmPassword, setConfirmPassword] = useState(data.security.confirmPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Update local state when store data changes
  useEffect(() => {
    setPassword(data.security.password);
    setConfirmPassword(data.security.confirmPassword);
  }, [data.security]);

  const handleNext = () => {
    if (!validatePassword(password)) {
      setError("Password must contain at least one lowercase, one uppercase, one special character, one digit and a length of at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSecurity({ password, confirmPassword });
    onNext({ password, confirmPassword });
  };

  const strength = passwordStrength(password);

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
        {/* Password Strength Indicator */}
        <View className="mt-2 mb-1 flex-row items-center">
          <View className={`h-2 rounded w-1/4 mr-1 ${strength.score >= 1 ? 'bg-red-400' : 'bg-gray-200'}`} />
          <View className={`h-2 rounded w-1/4 mr-1 ${strength.score >= 2 ? 'bg-orange-400' : 'bg-gray-200'}`} />
          <View className={`h-2 rounded w-1/4 mr-1 ${strength.score >= 3 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
          <View className={`h-2 rounded w-1/4 ${strength.score >= 4 ? 'bg-green-400' : 'bg-gray-200'}`} />
        </View>
        <Text className={`text-xs font-medium mb-1 ${strength.score >= 4 ? 'text-green-600' : strength.score === 3 ? 'text-yellow-600' : strength.score === 2 ? 'text-orange-600' : 'text-red-600'}`}>{strength.label}</Text>
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
      <PasswordRequirements password={password} />
      {error ? (
        <Text className="text-danger text-sm mt-2">
          {error}
        </Text>
      ) : null}

      <Button
        onPress={handleNext}
        disabled={!password || !confirmPassword}
      >
        Continue
      </Button>
    </View>
  );
}; 