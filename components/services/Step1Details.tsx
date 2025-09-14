import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';
import KeyboardAwareScrollView from '../common/keyboard-aware-scroll-view';
import DeliveryTypeSelection from './DeliveryTypeSelection';
import ServiceAddressInput from './ServiceAddressInput';
import ServiceCategorySelect from './ServiceCategorySelect';
import ServiceDescriptionInput from './ServiceDescriptionInput';
import ServiceNameInput from './ServiceNameInput';
import ValidationSummary from './ValidationSummary';

export default function Step1Details() {
  const store = useServiceCreationStore();
  const showErrors = store.showStep1Errors;

  return (
    <KeyboardAwareScrollView className="flex-1">
      <View className='py-4'>
        <Text className='text-lg font-rubikMedium text-gray-800 mb-1'>
          What is the main service you offer?
        </Text>
        <Text className='text-sm text-gray-500 mb-6'>
          Choose the category that best describes your service so the right clients can see you.
        </Text>

        <ValidationSummary showErrors={showErrors} />

        <ServiceNameInput showErrors={showErrors} />

        <ServiceAddressInput showErrors={showErrors} />

        <ServiceCategorySelect showErrors={showErrors} />

        <ServiceDescriptionInput showErrors={showErrors} />

        <DeliveryTypeSelection showErrors={showErrors} />

      </View>
    </KeyboardAwareScrollView>
  )
} 