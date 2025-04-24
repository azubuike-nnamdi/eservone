import useGetAllServices from '@/hooks/query/useGetAllServices';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define the type for a service item
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  imageUrl: string;
  verified: boolean;
}

// Dummy Data for Services
const DUMMY_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Wig installation',
    description: 'Sample service description that is loooooong and spans to the second line.',
    priceRange: '$9.99 - $19.99',
    imageUrl: 'https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    verified: true,
  },
  {
    id: '2',
    title: 'Paint work',
    description: 'Sample service description that is loooooong and spans to the second line.',
    priceRange: '$9.99 - $19.99',
    imageUrl: 'https://images.pexels.com/photos/1906153/pexels-photo-1906153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    verified: false,
  },
];

// --- Service Card Component ---
const ServiceCard = ({ item }: { item: ServiceItem }) => {
  const router = useRouter();

  const handleManageService = () => {
    console.log(`Manage service clicked for: ${item.title} (ID: ${item.id})`);
    router.push(`/profile/edit-service/${item.id}`);
  };

  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
      <Image source={{ uri: item.imageUrl }} className="w-full h-48" resizeMode="cover" />
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-1">
          <View className="flex-row items-center flex-1 mr-2">
            <Text className="text-lg font-rubikMedium text-gray-800 mr-1" numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            {item.verified && (
              <MaterialCommunityIcons name="check-decagram" size={18} color="#4CAF50" />
            )}
          </View>
          <Text className="text-base font-rubikRegular text-gray-600">{item.priceRange}</Text>
        </View>
        <Text className="text-sm text-gray-500 font-rubikRegular mb-4" numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <TouchableOpacity onPress={handleManageService} className="flex-row items-center self-start">
          <Ionicons name="pencil-outline" size={18} color="#4338CA" />
          <Text className="text-primary-600 ml-1 font-rubikMedium text-sm">Manage service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Empty State Component ---
const EmptyState = ({ onAddPress }: { onAddPress: () => void }) => (
  <View className="flex-1 justify-center items-center px-10">
    <Ionicons name="briefcase-outline" size={60} color="#D1D5DB" />
    <Text className="text-xl font-rubikMedium text-gray-600 mt-4 text-center">No Services Yet</Text>
    <Text className="text-base text-gray-400 font-rubikRegular mt-2 text-center mb-6">
      Add your first service to start offering it to customers.
    </Text>
    <TouchableOpacity
      onPress={onAddPress}
      className="bg-primary-500 py-3 px-6 rounded-lg flex-row items-center"
    >
      <Ionicons name="add-circle-outline" size={20} color="white" />
      <Text className="text-white font-rubikMedium text-base ml-2">Add New Service</Text>
    </TouchableOpacity>
  </View>
);

export default function ManageServicesDashboard() {
  const [services, setServices] = useState<ServiceItem[]>(DUMMY_SERVICES);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data, isPending } = useGetAllServices()

  console.log('services', data?.data)

  const handleAddNewService = () => {
    console.log('Navigating to create service screen...');
    router.push('/service-creation/create-service');
  };

  const renderItem = ({ item }: { item: ServiceItem }) => <ServiceCard item={item} />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 relative">
        {services.length === 0 ? (
          <EmptyState onAddPress={handleAddNewService} />
        ) : (
          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerClassName="p-4 pt-6 pb-24"
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Action Button - Must be INSIDE the relative View */}
        <TouchableOpacity
          onPress={handleAddNewService}
          className="absolute rounded-full bg-primary-600 p-4 shadow-lg"
          style={{
            position: 'absolute',
            bottom: insets.bottom + (Platform.OS === 'ios' ? 32 : 24),
            right: insets.right + 24,
            elevation: 10,
            zIndex: 50,
          }}
        >
          <Ionicons name="add-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}