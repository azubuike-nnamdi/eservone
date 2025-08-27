import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ProviderReviewItemProps {
  review: any;
  index: number;
}

export default function ProviderReviewItem({ review, index }: ProviderReviewItemProps) {
  return (
    <View className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
      <Text className="font-bold text-black text-base mb-2">
        {review.reviewerName || 'No reviewer name available'}
      </Text>
      <Text className="text-gray-700 leading-5 mb-3">
        {review.reviewText || 'No review text available'}
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name="work" size={16} color="#666" />
          <Text className="text-gray-600 text-sm ml-2">
            {review.serviceName || 'Service'}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text className="text-gray-600 text-sm ml-1">
            {review.rating || 0}
          </Text>
        </View>
      </View>
    </View>
  );
}
