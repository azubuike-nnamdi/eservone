import React from 'react';
import { Text, View } from 'react-native';

interface StatItemProps {
  label: string;
  value: string;
}

/**
 * Component for rendering individual stat items in the dashboard
 */
const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <View className="bg-gray-100 rounded-lg p-4 w-[48%] mb-2">
      <Text className="text-gray-600 text-xs mb-1">
        {label}
      </Text>
      <Text className="text-lg font-bold text-blue-800">
        {value}
      </Text>
    </View>
  );
};

export default StatItem;
