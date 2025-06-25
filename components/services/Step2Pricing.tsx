import TextInput from '@/components/common/text-input';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

export default function Step2Pricing() {
  const store = useServiceCreationStore();


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
          />
        </View>
        <View className='flex-1'>
          <TextInput
            label="Max fee:"
            placeholder="0.00"
            value={store.maxFee !== null ? String(store.maxFee) : ''}
            onChangeText={(text) => handleFeeChange('maxFee', text)}
            keyboardType="numeric"
          />
        </View>
      </View>

    </View>
  )
} 