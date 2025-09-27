import ImageUpload from '@/components/common/image-upload';
import { useServiceCreationStore } from '@/store/service-creation-store';
import React from 'react';
import { Text, View } from 'react-native';

export default function Step3Media() {
  const store = useServiceCreationStore();

  return (
    <View className='py-4'>
      <Text className='text-lg font-rubikMedium text-gray-800 mb-1'>
        Media
      </Text>
      <Text className='text-sm text-gray-500 mb-6'>
        Add images to properly convey your service. You can upload a maximum of 4 images (JPG/PNG only, 1MB each, 4MB total).
      </Text>

      <ImageUpload
        images={store.images}
        onAddImage={store.addImage}
        onRemoveImage={store.removeImage}
        maxImages={4}
      />
      {/* Add validation error if needed (e.g., at least one image required) */}
      {store.images.length === 0 && (
        <Text className="text-red-500 text-sm mt-2">
          Please upload at least one image to proceed.
        </Text>
      )}
    </View>
  )
} 