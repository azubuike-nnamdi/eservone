import TextInput from '@/components/common/text-input';
import { formatCurrency } from '@/lib/helper';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

// Helper to format currency (replace with a more robust library if needed)


export default function Step2Pricing() {
  const store = useServiceCreationStore();

  const minFee = store.minFee ?? 0;
  const maxFee = store.maxFee ?? 0;
  const averageFee = (minFee + maxFee) / 2;
  const serviceFeePercentage = 0.10; // 10%
  const estimatedServiceFee = averageFee * serviceFeePercentage;
  const estimatedReceived = averageFee - estimatedServiceFee;

  const handleFeeChange = (field: 'minFee' | 'maxFee', text: string) => {
    const numericValue = text ? parseFloat(text) : null;
    if (!isNaN(numericValue!) || text === '' || text === null) {
      store.setField(field, numericValue);
    }
  };

  return (
    <View className='py-4'>
      <Text className='text-lg font-rubikMedium text-gray-800 mb-1'>
        Set your service rate
      </Text>
      <Text className='text-sm text-gray-500 mb-6'>
        Clients will see this rate on your profile once you publish this service. You can adjust the rate at anytime.
      </Text>

      <View className='flex-row space-x-4 gap-4 mb-6'>
        <View className='flex-1'>
          <TextInput
            label="Min fee:"
            placeholder="0.00"
            value={store.minFee !== null ? String(store.minFee) : ''}
            onChangeText={(text) => handleFeeChange('minFee', text)}
            keyboardType="numeric"
          // Add validation error if needed (e.g., min <= max)
          />
        </View>
        <View className='flex-1'>
          <TextInput
            label="Max fee:"
            placeholder="0.00"
            value={store.maxFee !== null ? String(store.maxFee) : ''}
            onChangeText={(text) => handleFeeChange('maxFee', text)}
            keyboardType="numeric"
          // Add validation error if needed (e.g., max >= min)
          />
        </View>
      </View>

      <View className='space-y-4'>
        <Text className='text-sm  my-2 font-rubikMedium text-gray-700'>
          Estimated EserveOne service fee:
        </Text>
        <Text className='text-sm my-2 text-gray-500'>
          EserveOne&apos;s service fee is 10% of your total transaction fee with the client.
        </Text>
        <Text className='text-lg font-rubikBold text-red-600'>
          - {formatCurrency(estimatedServiceFee)}
        </Text>
      </View>

      <View className='border-b border-gray-200 my-6' />

      <View className='space-y-2'>
        <Text className='text-sm font-rubikMedium text-gray-700'>
          Estimated amount you&apos;ll receive after service fee:
        </Text>
        <Text className='text-2xl font-rubikBold text-green-600'>
          {formatCurrency(estimatedReceived)}
        </Text>
      </View>

    </View>
  )
} 