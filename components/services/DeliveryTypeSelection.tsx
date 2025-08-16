import Checkbox from '@/components/common/check-box';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

interface DeliveryTypeSelectionProps {
  showErrors: boolean;
}

export default function DeliveryTypeSelection({ showErrors }: DeliveryTypeSelectionProps) {
  const store = useServiceCreationStore();
  const validation = store.validateStep1();

  return (
    <View className='mt-4'>
      <Text className='text-sm font-rubikMedium text-gray-700 mb-2'>
        Service delivery type <Text className='text-gray-400 font-rubikRegular'>(Select all that apply):</Text>
      </Text>

      <Checkbox
        label="Walk-in service"
        checked={store.deliveryType.walkIn}
        onChange={() => {
          store.setDeliveryType('walkIn', true);
          store.setDeliveryType('homeService', false);
          store.setDeliveryType('virtualService', false);
        }}
      />

      <Checkbox
        label="Home service"
        checked={store.deliveryType.homeService}
        onChange={() => {
          store.setDeliveryType('walkIn', false);
          store.setDeliveryType('homeService', true);
          store.setDeliveryType('virtualService', false);
        }}
      />

      {/* Validation error for delivery type */}
      {showErrors && !store.deliveryType.walkIn && !store.deliveryType.homeService && validation.errors.includes("At least one delivery type must be selected") && (
        <Text className="text-red-500 text-sm mt-2">
          At least one delivery type must be selected
        </Text>
      )}
    </View>
  );
}
