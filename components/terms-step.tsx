import images from "@/constants/images";
import { PRIVACY_POLICY_URL, TERMS_URL, USER_AGREEMENT_URL } from "@/constants/routes";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import Button from "./common/button";

export const TermsStep = ({
  onSubmit,
  isPending
}: {
  onSubmit: (accepted: boolean) => void
  isPending: boolean
}) => {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async () => {
    if (!accepted) return;
    await onSubmit(true);
  };


  return (
    <View className="items-center">
      {/* Terms Icon */}
      <View className="bg-primary-100 rounded-full p-4 w-52 h-52 items-center justify-center mb-8">
        <Image source={images.Terms} className="w-20 h-20" />
      </View>

      <Text className="text-black text-center mb-6">
        Before creating your account you are required to read, understand and agree to the Eserve
      </Text>

      {/* Terms Links */}
      <View className="w-full items-center gap-2 mb-8">
        <TouchableOpacity onPress={() => Linking.openURL(TERMS_URL)}>
          <Text className="text-primary-300">Terms of service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(USER_AGREEMENT_URL)}>
          <Text className="text-primary-300">User agreement</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
          <Text className="text-primary-300">Privacy policy</Text>
        </TouchableOpacity>
      </View>

      {/* Checkbox */}
      <TouchableOpacity
        className="flex-row items-center mb-8"
        onPress={() => setAccepted(!accepted)}
        activeOpacity={0.7}
      >
        <View className={`w-6 h-6 rounded border ${accepted ? 'bg-primary-300 border-primary-300' : 'border-gray-300'} mr-2 items-center justify-center`}>
          {accepted && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        <Text className="text-black">
          Yes, I agree to the "Policies" and "Agreements"
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <View className="w-full">
        <Button
          onPress={handleSubmit}
          disabled={!accepted || isPending}
          loading={isPending}
          loadingText="Creating account..."
        >
          Create account
        </Button>
      </View>
    </View>
  );
}; 