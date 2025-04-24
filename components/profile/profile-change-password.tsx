import Button from "@/components/common/button";
import useChangePassword from "@/hooks/mutation/useChangePassword";
import { validatePassword } from "@/lib/helper";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { handleChangePassword: changePassword, isPending, isSuccess } = useChangePassword()

  const handleUpdatePassword = () => {
    // Reset error
    setError("");

    // Check if current password is provided
    if (!currentPassword) {
      setError("Please enter your current password");
      return;
    }

    // Use the imported validatePassword function
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long with a mix of letters, numbers, and symbols");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // call change password api

    const payload = {
      newPassword: password,
      oldPassword: currentPassword,
    }
    changePassword(payload)

    if (isSuccess) {
      setCurrentPassword("")
      setPassword("")
      setConfirmPassword("")
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1">
      <View className="mt-10 bg-white">
        {/* Current Password Field */}
        <Text className="text-lg font-bold mb-2 text-black">Current password</Text>
        <View className="relative mb-6">
          <TextInput
            className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            secureTextEntry={!showCurrentPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Ionicons
              name={showCurrentPassword ? "eye-off" : "eye"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold mb-2 text-black">New password</Text>
        <View className="relative mb-6">
          <TextInput
            className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold mb-2 text-black">Confirm password</Text>
        <View className="relative mb-6">
          <TextInput
            className="w-full h-14 border border-gray-200 rounded-md px-4 text-base text-black pr-12"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
            className="absolute right-4 top-4"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-start mb-6">
          <Ionicons name="information-circle-outline" size={24} color="#999" />
          <Text className="ml-2 text-gray-400 flex-1 text-sm">
            Your password must be at least 8 character long, with a mix of letters, numbers, and symbols.
          </Text>
        </View>

        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        {/* submit button */}
        <Button
          type="submit"
          disabled={isPending || !currentPassword || !password || !confirmPassword}
          loading={isPending}
          loadingText="Changing password..."
          onPress={handleUpdatePassword}
        >
          Change Password
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}