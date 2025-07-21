import Checkbox from '@/components/common/check-box';

import Select from '@/components/common/select';
import TextInput from '@/components/common/text-input';
import useGetServiceCategory from '@/hooks/query/useGetServiceCategory';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

// Interface for fetched category data (adjust based on actual API response)
interface ApiCategory {
  id: number;
  serviceType: string;
  // Add other properties if they exist
}

export default function Step1Details() {
  const store = useServiceCreationStore();
  const { data: serviceCategoryApiResponse } = useGetServiceCategory();

  // Memoize the formatted options to prevent re-calculation on every render
  const formattedServiceCategoryOptions = useMemo(() => {
    // Assuming the actual data is in serviceCategoryApiResponse.data.data
    // Adjust the path based on your actual API response structure
    const categories: ApiCategory[] = serviceCategoryApiResponse?.data || [];



    return categories.map(category => ({
      label: category.serviceType, // Use the name for the label
      value: category.id,   // Use the id for the value
    }));
  }, [serviceCategoryApiResponse]); // Dependency array ensures recalculation only when API response changes

  return (
    <View className='py-4'>
      <Text className='text-lg font-rubikMedium text-gray-800 mb-1'>
        What is the main service you offer?
      </Text>
      <Text className='text-sm text-gray-500 mb-6'>
        Choose the category that best describes your service so the right clients can see you.
      </Text>

      <TextInput
        label="Service name"
        placeholder="e.g., Professional Barbering Services"
        value={store.serviceName}
        onChangeText={(text) => store.setField('serviceName', text)}
      />

      <TextInput
        label="Address"
        placeholder="e.g., 123 Main St, Anytown, USA"
        value={store.serviceAddress}
        onChangeText={(text) => store.setField('serviceAddress', text)}
      />

      <Select
        label="Service category"
        placeholder="Select service category"
        options={formattedServiceCategoryOptions}
        value={store.serviceCategory}
        onSelect={(value) => store.setField('serviceCategory', value)}
      // Add validation error if needed
      />

      <TextInput
        label="Describe your service"
        placeholder="Start typing... Tell clients what makes your service unique."
        value={store.serviceDescription}
        onChangeText={(text) => store.setField('serviceDescription', text)}
        multiline
        numberOfLines={4}
        inputClassName="h-24 items-start pt-3" // Adjust styling for multiline
        textAlignVertical="top" // Ensure text starts at the top
      // Add validation error if needed
      />

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
        <Checkbox
          label="Virtual service"
          checked={store.deliveryType.virtualService}
          onChange={() => {
            store.setDeliveryType('walkIn', false);
            store.setDeliveryType('homeService', false);
            store.setDeliveryType('virtualService', true);
          }}
        />
        {/* Add validation error if needed (e.g., at least one must be selected) */}
      </View>

    </View>
  )
} 