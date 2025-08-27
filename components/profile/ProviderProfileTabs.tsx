import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProviderProfileTabsProps {
  activeTab: 'services' | 'reviews';
  onTabPress: (tab: 'services' | 'reviews') => void;
  servicesCount: number;
  reviewsCount: number;
}

export default function ProviderProfileTabs({
  activeTab,
  onTabPress,
  servicesCount,
  reviewsCount
}: ProviderProfileTabsProps) {
  return (
    <View className="flex-row border-b border-gray-200 mb-6">
      <TouchableOpacity
        className={`flex-1 py-3 ${activeTab === 'services' ? 'border-b-2 border-primary-300' : ''}`}
        onPress={() => onTabPress('services')}
      >
        <Text className={`text-center font-medium ${activeTab === 'services' ? 'text-primary-300' : 'text-gray-600'}`}>
          Services ({servicesCount})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 py-3 ${activeTab === 'reviews' ? 'border-b-2 border-primary-300' : ''}`}
        onPress={() => onTabPress('reviews')}
      >
        <Text className={`text-center font-medium ${activeTab === 'reviews' ? 'text-primary-300' : 'text-gray-600'}`}>
          Reviews ({reviewsCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
