import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

interface ValidationSummaryProps {
  showErrors: boolean;
}

export default function ValidationSummary({ showErrors }: ValidationSummaryProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  if (!showErrors || validation.isValid) {
    return null;
  }

  return (
    <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
      <Text className="text-red-700 text-sm font-rubikMedium mb-1">
        Please complete the following required fields:
      </Text>
      {validation.errors.map((error, index) => (
        <Text key={index} className="text-red-600 text-sm">
          • {error}
        </Text>
      ))}
    </View>
  );
}
