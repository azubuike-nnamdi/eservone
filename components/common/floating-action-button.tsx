import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  className?: string;
}

export default function FloatingActionButton({
  onPress,
  icon = "+",
  className = ""
}: FloatingActionButtonProps) {
  return (
    <View className="absolute bottom-6 right-6 z-50">
      <TouchableOpacity
        onPress={onPress}
        className={`w-14 h-14 bg-primary-300 rounded-full items-center justify-center shadow-lg ${className}`}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}
      >
        <Text className="text-white text-2xl font-bold font-rubikMedium">
          {icon}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
