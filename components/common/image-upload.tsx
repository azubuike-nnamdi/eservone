import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'

interface ImageUploadProps {
  images: string[]
  onAddImage: (base64: string) => void
  onRemoveImage: (base64: string) => void
  maxImages?: number
}

// Helper to convert file URI to base64
const convertImageToBase64 = async (fileUri: string) => {
  try {
    const base64Data = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

export default function ImageUpload({
  images,
  onAddImage,
  onRemoveImage,
  maxImages = 4,
}: ImageUploadProps) {

  const pickImage = async () => {
    if (images.length >= maxImages) {
      Alert.alert('Maximum Images Reached', `You can only upload up to ${maxImages} images.`);
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true, // Get base64 string
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      // Only allow jpeg/jpg/png
      // (File type check can be re-enabled if needed)
      let base64 = asset.base64;
      if (!base64) {
        base64 = await convertImageToBase64(asset.uri);
        if (!base64) {
          Alert.alert('Error', 'Could not convert image to base64.');
          return;
        }
      }
      onAddImage(base64);
    }
  };

  return (
    <View>
      {/* Upload Area */}
      <TouchableOpacity
        onPress={pickImage}
        disabled={images.length >= maxImages}
        className={cn(
          'w-full h-36 border-2 border-dashed border-primary-300 rounded-lg justify-center items-center bg-primary-50 mb-4',
          images.length >= maxImages && 'opacity-50 border-gray-300 bg-gray-100'
        )}
      >
        <View className='items-center'>
          <Ionicons name="images-outline" size={40} color={images.length >= maxImages ? '#9CA3AF' : '#4338CA'} />
          <Text className={cn(
            'font-rubikMedium mt-2',
            images.length >= maxImages ? 'text-gray-500' : 'text-primary-500'
          )}>
            Click to upload images
          </Text>
          <Text className={cn(
            'text-xs mt-1',
            images.length >= maxImages ? 'text-gray-400' : 'text-gray-500'
          )}>
            (max {maxImages})
          </Text>
        </View>
      </TouchableOpacity>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <View className='mb-4'>
          <Text className='text-sm font-rubikMedium text-gray-700 mb-2'>Uploaded images:</Text>
          <View className='flex-row flex-wrap -mx-1'>
            {images.map((base64, index) => (
              <View key={index} className='w-1/2 p-1'>
                <View className='relative aspect-square bg-gray-100 rounded-lg overflow-hidden'>
                  {/* Show as data uri */}
                  <Image source={{ uri: `data:image/jpeg;base64,${base64}` }} className='w-full h-full' resizeMode='cover' />
                  <TouchableOpacity
                    onPress={() => onRemoveImage(base64)}
                    className='absolute top-1 right-1 bg-black/50 rounded-full p-1'
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {/* Placeholder boxes if needed */}
            {[...Array(Math.max(0, maxImages - images.length))].map((_, index) => (
              images.length > 0 && index < 2 ? null : // Adjust logic if you want placeholders differently
                <View key={`placeholder-${index}`} className='w-1/2 p-1'>
                  <View className='aspect-square bg-gray-100 rounded-lg justify-center items-center'>
                    <Ionicons name='image-outline' size={30} color='#D1D5DB' />
                  </View>
                </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
} 