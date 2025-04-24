import Button from '@/components/common/button'; // Assuming you have a Button component
import ProfileHeader from '@/components/common/profile-header'; // Assuming you have a ProfileHeader
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

// --- Reusing Dummy Data (Ideally, fetch this based on ID) ---
// NOTE: In a real app, you'd fetch this data using the ID, possibly using a hook.
// For now, we'll import or redefine the dummy data and type.
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceRange: string; // We'll need to parse min/max from this or change the data structure
  imageUrl: string; // Assuming only one image for now based on data
  verified: boolean;
}

// Example: If you have a central place for dummy data or types, import it.
// Otherwise, redefine it here for demonstration.
const DUMMY_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Wig installation',
    description: 'Sample service description that is loooooong and spans to the second line.',
    priceRange: '$9.99 - $19.99', // Example format
    imageUrl: 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    verified: true,
  },
  {
    id: '2',
    title: 'Paint work',
    description: 'Sample service description that is loooooong and spans to the second line.',
    priceRange: '$15.00 - $25.50', // Example format
    imageUrl: 'https://images.pexels.com/photos/1906153/pexels-photo-1906153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    verified: false,
  },
];
// --- End Dummy Data ---

// Helper to parse price range
const parsePriceRange = (range: string): { min: string; max: string } => {
  const parts = range.replace(/\\$|\s/g, '').split('-');
  return {
    min: parts[0] || '0.00',
    max: parts[1] || parts[0] || '0.00', // Handle single price or range
  };
};

export default function ManageServicePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [service, setService] = useState<ServiceItem | null>(null);

  // State for editable fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');
  const [images, setImages] = useState<string[]>([]); // Store image URLs or identifiers

  const [isLoading, setIsLoading] = useState(true); // Or use mutation pending state
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching service data
    const foundService = DUMMY_SERVICES.find((s) => s.id === id);
    if (foundService) {
      setService(foundService);
      setTitle(foundService.title);
      setDescription(foundService.description);
      const { min, max } = parsePriceRange(foundService.priceRange);
      setMinFee(min);
      setMaxFee(max);
      // For now, just use the single imageUrl. Expand later for multiple images.
      setImages(foundService.imageUrl ? [foundService.imageUrl] : []);
    } else {
      // Handle service not found (e.g., show error, navigate back)
      Alert.alert('Error', 'Service not found.', [{ text: 'OK', onPress: () => router.back() }]);
    }
    setIsLoading(false);
  }, [id, router]);

  const handleEditPress = (field: 'title' | 'description') => {
    // In a real app, this might open a modal or navigate to a dedicated edit screen
    Alert.alert('Edit', `Editing ${field} is not implemented yet.`);
  };

  const handleImageDelete = (index: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setImages((prevImages) => prevImages.filter((_, i) => i !== index));
          // Add API call to delete image here
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
    console.log('Saving changes:', { id, title, description, minFee, maxFee, images });
    // Add API call to update service details here
    setTimeout(() => { // Simulate API call
      setIsSaving(false);
      Alert.alert('Success', 'Changes saved (simulated).', [{ text: 'OK', onPress: () => router.back() }]);
    }, 1500);
  };

  // Calculate estimated earnings (example logic)
  const calculateEstimatedEarnings = () => {
    const min = parseFloat(minFee) || 0;
    // const max = parseFloat(maxFee) || 0;
    const serviceFeeRate = 0.1; // Example 10% service fee
    const estimated = min * (1 - serviceFeeRate);
    return estimated.toFixed(2);
  };

  if (isLoading || !service) {
    // Optional: Show a loading indicator
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
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
          contentContainerClassName="pb-32 px-5 pt-4" // Add padding
        >
          {/* Service Name */}
          <View className="mb-5">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-sm text-gray-500 font-rubikRegular">Service name</Text>
              <TouchableOpacity onPress={() => handleEditPress('title')} className="flex-row items-center p-1">
                <Ionicons name="pencil-outline" size={16} color="#4338CA" />
                <Text className="text-primary-600 ml-1 text-sm font-rubikMedium">Edit</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-base font-rubikMedium text-gray-800">{title}</Text>
          </View>

          {/* Service Description */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-sm text-gray-500 font-rubikRegular">Service description</Text>
              <TouchableOpacity onPress={() => handleEditPress('description')} className="flex-row items-center p-1">
                <Ionicons name="pencil-outline" size={16} color="#4338CA" />
                <Text className="text-primary-600 ml-1 text-sm font-rubikMedium">Edit</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-base font-rubikRegular text-gray-800 leading-6">{description}</Text>
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
              {/* Placeholder for adding more images */}
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
              {/* Fill remaining slots if needed, up to MAX_IMAGES */}
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

        {/* Save Button - outside ScrollView to stick */}
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