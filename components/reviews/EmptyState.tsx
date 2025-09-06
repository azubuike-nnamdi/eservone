import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyState: React.FC = () => {
  return (
    <View className="items-center justify-center py-16 px-8 bg-white mx-4 rounded-2xl" style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    }}>
      <View className="bg-gray-100 p-5 rounded-full mb-4">
        <Ionicons name="chatbubbles-outline" size={42} color="#9CA3AF" />
      </View>
      <Text className="text-gray-700 text-lg font-semibold mt-4 text-center">
        No reviews yet
      </Text>
      <Text className="text-gray-500 text-center mt-2 px-4">
        Your reviews will appear here once customers start rating your services.
      </Text>
    </View>
  );
};

export default EmptyState;
