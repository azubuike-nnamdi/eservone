// This component is no longer needed as currency is now based on user's country selection during onboarding
// The currency is automatically set based on the user's selected country and cannot be changed

import { useCurrency } from '@/context/currency-context';
import React from 'react';
import { Text, View } from 'react-native';

export default function CurrencySelector() {
  const { currency } = useCurrency();

  if (!currency) {
    return null;
  }

  return (
    <View className="px-3 py-2 bg-gray-100 rounded-md">
      <Text className="text-sm font-medium text-gray-700">
        {currency}
      </Text>
    </View>
  );
} 