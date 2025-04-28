import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SeekerServiceCardProps {
  title: string;
  studio: string;
  priceRange: string;
  rating?: number;
  isVerified?: boolean;
  lastActive?: string;
  distance?: string;
  onPress?: () => void;
}

const SeekerServiceCard: React.FC<SeekerServiceCardProps> = ({
  title,
  studio,
  priceRange,
  rating = 4.5,
  isVerified = false,
  lastActive = "Active 4 days ago",
  distance = "32km",
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    className="bg-white rounded-xl border border-gray-200 p-4 mb-3 mx-1 shadow-xs"
  >
    <View className="flex-row justify-between items-center mb-1">
      <View className="flex-row items-center">
        <MaterialIcons name="star" size={16} color="#888" />
        <Text className="ml-1 text-xs text-gray-500">{rating}</Text>
      </View>
      <MaterialIcons name="more-vert" size={18} color="#888" />
    </View>
    <Text className="font-bold text-base text-gray-900 mb-1">{title}</Text>
    <View className="flex-row items-center mb-1">
      <Text className="text-sm text-gray-500">{studio}</Text>
      {isVerified && (
        <MaterialCommunityIcons name="check-decagram" size={14} color="#4338CA" style={{ marginLeft: 4 }} />
      )}
      <Text className="text-sm text-gray-500 ml-2">{priceRange}</Text>
    </View>
    <View className="flex-row items-center mt-1">
      <Text className="text-xs text-gray-400">{lastActive}</Text>
      <MaterialCommunityIcons name="swap-horizontal" size={14} color="#888" style={{ marginLeft: 12 }} />
      <Text className="text-xs text-gray-400 ml-1">{distance}</Text>
    </View>
  </TouchableOpacity>
);

export default SeekerServiceCard;
