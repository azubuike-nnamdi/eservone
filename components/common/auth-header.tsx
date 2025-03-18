import React from "react";
import { View, Image, Text } from "react-native";
import images from "@/constants/images";
import { AuthHeaderProps } from "@/constants/types";

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="items-center py-6 w-full">
      {/* Logo */}
      <Image
        source={images.logo}
        className="w-52 h-24"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-xl font-bold text-center text-black mb-2">{title}</Text>

      {/* Optional Subtitle */}
      {subtitle && <Text className="text-sm text-center text-gray-600">{subtitle}</Text>}
    </View>
  );
};

export default AuthHeader;