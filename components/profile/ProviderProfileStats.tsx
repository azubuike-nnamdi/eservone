import React from 'react';
import { Text, View } from 'react-native';

interface ProviderProfileStatsProps {
  providerName: string;
  ratingCount: number;
  reviewCount: number;
}

export default function ProviderProfileStats({
  providerName,
  ratingCount,
  reviewCount
}: ProviderProfileStatsProps) {
  return (
    <View className="flex-row justify-between items-start mt-6 mb-6">
      <View className="flex-1">
        <Text className="text-gray-600 text-sm">Business owner:</Text>
        <Text className="text-black font-bold text-base">
          {providerName}
        </Text>
      </View>
      <View className="flex-1 items-end">
        <Text className="text-gray-600 text-sm">Average rating:</Text>
        <Text className="text-blue-600 font-bold text-base">
          {ratingCount || 0}
        </Text>
        <Text className="text-gray-600 text-xs">
          (from {reviewCount || 0} reviews)
        </Text>
      </View>
    </View>
  );
}
