import Button from '@/components/common/button';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import ProfileHeader from '@/components/common/profile-header';
import useGetServiceById from '@/hooks/query/useGetServiceById';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function ManageServicePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: serviceData, isPending } = useGetServiceById(id as string);
  const service = serviceData?.data;

  // State for editable fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minFee, setMinFee] = useState(service?.minimumPrice.toString() || '');
  const [maxFee, setMaxFee] = useState(service?.maximumPrice.toString() || '');
  const [images, setImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Prefill state when service data is loaded
  useEffect(() => {
    if (service) {
      setTitle(service.serviceName || '');
      setDescription(service.serviceDescription || '');
      setImages([FALLBACK_IMAGE]); // Replace with service image if available
    }
  }, [service]);

  const handleImageDelete = (index: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const handleAddImage = () => {
    // Integrate with ImagePicker or DocumentPicker
    Alert.alert('Add Image', 'Image adding functionality not implemented yet.');
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    // Add API call to update service details here
    setTimeout(() => { // Simulate API call
      setIsSaving(false);
      Alert.alert('Success', 'Changes saved', [{ text: 'OK', onPress: () => router.back() }]);
    }, 1500);
  };

  // Calculate estimated earnings (example logic)
  const calculateEstimatedEarnings = () => {
    const min = parseFloat(minFee) || 0;
    const serviceFeeRate = 0.1;
    const estimated = min * (1 - serviceFeeRate);
    return estimated.toFixed(2);
  };

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title='Manage service' showNotification={false} showBackArrow={true} />
        <View className="p-5">
          <LoadingSkeleton count={3} />
        </View>
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView className="flex-1  bg-white">
        <ProfileHeader title='Manage service' showNotification={false} showBackArrow={true} />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 font-rubikRegular text-center">Service not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const MAX_IMAGES = 4;

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Manage service' showNotification={false} showBackArrow={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 px-5 pt-4"
        >
          {/* Service Name */}
          <View className="mb-5">
            <Text className="text-sm text-gray-500 font-rubikRegular mb-1">Service name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white text-base"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter service name"
            />
          </View>

          {/* Service Description */}
          <View className="mb-6">
            <Text className="text-sm text-gray-500 font-rubikRegular mb-1">Service description</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white text-base h-32 text-align-top"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter service description"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Service Images */}
          <View className="mb-6">
            <Text className="text-sm text-gray-500 font-rubikRegular mb-2">Service images</Text>
            <View className="flex-row flex-wrap justify-start -m-1">
              {images.map((imageUrl, index) => (
                <View key={index} className="w-1/2 p-1">
                  <View className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
                    <TouchableOpacity
                      onPress={() => handleImageDelete(index)}
                      className="absolute top-1 right-1 bg-red-500/80 rounded-full p-1.5"
                    >
                      <Ionicons name="trash-bin-outline" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              {images.length < MAX_IMAGES && (
                <View className="w-1/2 p-1">
                  <TouchableOpacity
                    onPress={handleAddImage}
                    className="aspect-square bg-gray-100 rounded-lg justify-center items-center border-2 border-dashed border-gray-300"
                  >
                    <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              )}
              {Array.from({ length: Math.max(0, MAX_IMAGES - images.length - 1) }).map((_, index) => (
                <View key={`placeholder-${index}`} className="w-1/2 p-1">
                  <View className="aspect-square bg-gray-100 rounded-lg justify-center items-center">
                    <Ionicons name="image-outline" size={32} color="#E5E7EB" />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Min/Max Fee */}
          <View className="flex-row justify-between mb-6 -m-2">
            <View className="w-1/2 p-2">
              <Text className="text-sm text-gray-500 font-rubikRegular mb-1">Min fee:</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white text-base"
                placeholder="0.00"
                value={minFee}
                onChangeText={setMinFee}
                keyboardType="numeric"
              />
            </View>
            <View className="w-1/2 p-2">
              <Text className="text-sm text-gray-500 font-rubikRegular mb-1">Max fee:</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white text-base"
                placeholder="0.00"
                value={maxFee}
                onChangeText={setMaxFee}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Estimated Earnings */}
          <View className="mb-8">
            <Text className="text-sm text-gray-500 font-rubikRegular mb-1">Estimated amount you'll receive after service fee:</Text>
            <Text className="text-xl font-rubikMedium text-primary-700">${calculateEstimatedEarnings()}</Text>
          </View>

        </ScrollView>

        {/* Save Button */}
        <View className="px-5 py-4 border-t border-gray-200 bg-white">
          <Button
            onPress={handleSaveChanges}
            variant='primary'
            loading={isSaving}
            disabled={isSaving}
            loadingText='Saving...'
          >
            Save changes
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 